"use client";

import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import Game from "@/components/game";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(`Something went wrong: ${error.message}`);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="border-none outline-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <span>
              Sorry, but something went wrong. Please try again later.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Game />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
