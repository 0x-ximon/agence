import type { Metadata } from "next";
import JoinStreamForm from "@/components/join-stream-form";
import Header from "@/components/layout/header";
import { Text } from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Join Stream",
};

export default function JoinStreamPage() {
  return (
    <div className="w-full mx-auto">
      <Header />

      <main className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full sm:max-w-md">
          <CardHeader className="w-full">
            <CardTitle>
              <Text variant="h2" className="text-center font-medium">
                Join a Stream
              </Text>
            </CardTitle>

            <CardDescription>
              <Text variant="muted" className="text-center font-bold">
                Connect to Live Stream
              </Text>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <JoinStreamForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
