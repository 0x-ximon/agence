"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import type { InitiateParams } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { signin } from "../services/actions";

const formSchema = z.object({
  emailAddress: z.email("Not a valid email."),
  password: z.string().min(8, { message: "Must be at least 8 characters" }),
  rememberMe: z.boolean(),
});

export default function SigninForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const params: InitiateParams = {
      emailAddress: data.emailAddress,
      password: data.password,
    };

    const result = await signin(params);
    if (!result.ok) {
      toast.error("Something went wrong", {
        description: result.error.message,
      });
      return;
    }

    toast.success("OTP Sent to Email Address");
    console.log(`Account ID: ${result.data.id}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="emailAddress"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-between items-center">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Switch
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />

                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                    Remember Me
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
}
