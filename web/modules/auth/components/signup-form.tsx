"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { isAddress } from "viem";
import * as z from "zod";
import type { RegisterParams } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defineStepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Role } from "@/lib/types";
import { signup } from "../services/actions";

// BUG: Stepping from one step submits the form. Needs Urgent fix.
const { Stepper } = defineStepper(
  {
    id: "step-1",
    title: "Personal Information",
    description: "Please Enter Personal Details of Proprietor",
  },
  {
    id: "step-2",
    title: "Business Information",
    description: "Please Enter Business Details",
  },
  {
    id: "step-3",
    title: "Account Information",
    description: "Please Enter your Account Details",
  },
);

const formSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),

    businessName: z.string().nonempty("Business name is required"),
    role: z.enum([Role.Proprietor, Role.Professional], {
      error: "Role is required",
    }),
    cacNumber: z.string().nonempty("CAC number is required"),
    businessAddress: z.string().nonempty("Business address is required"),

    emailAddress: z.email("Not a valid email."),
    walletAddress: z.string().refine((val) => (val ? isAddress(val) : true), {
      message: "Not a valid wallet address",
    }),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export default function SigninForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",

      businessName: "",
      cacNumber: "",
      businessAddress: "",

      emailAddress: "",
      walletAddress: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.debug(data);

    const params: RegisterParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      walletAddress: data.walletAddress,
      password: data.password,
      role: data.role,
    };

    const result = await signup(params);
    if (!result.ok) {
      toast.error("Something went wrong", {
        description: result.error.message,
      });
      return;
    }

    toast.success("Account Registration Successful");
    console.log(`Account ID: ${result.data.id}`);
  };

  return (
    <Stepper.Provider>
      {({ methods }) => (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step
                key={step.id}
                of={step.id}
                onClick={() => methods.goTo(step.id)}
              />
            ))}
          </Stepper.Navigation>

          {methods.switch({
            "step-1": (step) => (
              <Stepper.Panel key="step-1" className="py-4 space-y-4">
                <div className="my-6">
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </div>

                <FieldGroup>
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          First Name <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="John"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Last Name <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Doe"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="phoneNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Phone Number <span className="text-red-500">*</span>
                        </FieldLabel>

                        <PhoneInput
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="role"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Role <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value={Role.Professional}>
                              Professional
                            </SelectItem>

                            <SelectItem value={Role.Proprietor}>
                              Sole Proprietor
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </Stepper.Panel>
            ),

            "step-2": (step) => (
              <Stepper.Panel key="step-2" className="py-4 space-y-4">
                <div className="my-6">
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </div>

                <FieldGroup>
                  <Controller
                    name="businessName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Business Name <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="My Business"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="cacNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          CAC Registration Number{" "}
                          <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="1234567890"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="businessAddress"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Business Address{" "}
                          <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="123 Main Street"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </Stepper.Panel>
            ),

            "step-3": (step) => (
              <Stepper.Panel key="step-3" className="py-4 space-y-4">
                <div className="my-6">
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </div>

                <FieldGroup>
                  <Controller
                    name="emailAddress"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Email Address <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="johndoe@mail.com"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="walletAddress"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Wallet Address <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="0x00"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Password <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Password"
                          type="password"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Password <span className="text-red-500">*</span>
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Confirm Password"
                          type="password"
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="flex justify-between items-center">
                    <Controller
                      name="acceptTerms"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Switch
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-invalid={fieldState.invalid}
                          />

                          <FieldContent>
                            <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                              I accept the terms and conditions.
                            </FieldLabel>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </Stepper.Panel>
            ),
          })}

          <Stepper.Controls>
            <div key="next-button" className="space-x-4">
              <Button
                variant="secondary"
                onClick={methods.prev}
                disabled={methods.isFirst}
              >
                Back
              </Button>

              {methods.isLast ? (
                <Button type="submit">Submit</Button>
              ) : (
                <Button onClick={methods.next}>Next</Button>
              )}
            </div>
          </Stepper.Controls>
        </form>
      )}
    </Stepper.Provider>
  );
}
