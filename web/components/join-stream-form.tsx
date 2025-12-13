"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { ensureError } from "@/lib/utils";

const formSchema = z.object({
  key: z.string().length(12, { error: "Stream Key must be 12 Characters" }),
  name: z.string().optional(),
  username: z.string().optional(),
  rememberMe: z.boolean(),
});

export default function JoinStreamForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { authenticated, login } = usePrivy();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { key, rememberMe } = data;

    try {
      setLoading(true);
      if (!authenticated) {
        login();
      }

      if (rememberMe) {
        // TODO: Persist User Details in Backend
        // const params: InitiateParams = {
        //   emailAddress: data.emailAddress,
        //   password: data.password,
        // };
        // const result = await signin(params);
        // if (!result.ok) {
        //   toast.error("Something went wrong", {
        //     description: result.error.message,
        //   });
        //   return;
        // }
      }

      // TODO: Validate that Stream with Session Exists and Has Started

      toast.success("Connected to Stream");
      router.push(`/streams/${key}`);
    } catch (e) {
      const err = ensureError(e);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="signin-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>What is your name?</FieldLabel>

              <Input
                {...field}
                id={field.name}
                name={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Vitalik Buterin"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>
                What would you like to be called?
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                name={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Vitalik"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="key"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>Enter the Stream Key</FieldLabel>

              <Input
                {...field}
                id={field.name}
                name={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="xxx xxxx xxx"
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
          {loading ? <Spinner /> : <span>Join Stream</span>}
        </Button>
      </FieldGroup>
    </form>
  );
}
