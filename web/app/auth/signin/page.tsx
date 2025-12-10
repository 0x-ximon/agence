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
import SigninForm from "@/modules/auth/components/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <div className="w-full mx-auto">
      <Header />

      <main className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full sm:max-w-md">
          <CardHeader className="w-full">
            <CardTitle>
              <Text variant="h2" className="text-center font-medium">
                Sign in to your account
              </Text>
            </CardTitle>
            <CardDescription>
              <Text variant="muted" className="text-center font-bold">
                Or{" "}
                <Link href="/auth/signup" className="text-primary">
                  create a new account
                </Link>
              </Text>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SigninForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
