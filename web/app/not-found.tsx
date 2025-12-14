import { Home, Info } from "lucide-react";
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

export default function NotfoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="border-none outline-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-6 w-6" />
            <span>Page not found. Check the URL and try again.</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Game />
        </CardContent>
        <CardFooter className="flex justify-center">
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
