"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  emailAddress: z.email("Not a valid email."),
});

export default function AuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.debug(data);
    toast.success("OTP Sent to Email Address");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Button variant="secondary" className="w-full">
          Base App
        </Button>

        <Button variant="secondary" className="w-full">
          Metamask
        </Button>

        <Button variant="secondary" className="w-full">
          Phantom
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm font-medium text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="emailAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
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

          <Button type="submit" className="w-full">
            Sign In with Email
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
