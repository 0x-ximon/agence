import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Text } from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "@/modules/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="w-full mx-auto">
      <Header />

      <main className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full sm:max-w-md">
          <CardHeader className="w-full">
            <CardTitle>
              <Text variant="h2" className="text-center font-medium">
                Create a new account
              </Text>
            </CardTitle>
            <CardDescription>
              <Text variant="muted" className="text-center font-bold">
                Or{" "}
                <Link href="/auth/signin" className="text-primary">
                  sign in to your existing account
                </Link>
              </Text>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
