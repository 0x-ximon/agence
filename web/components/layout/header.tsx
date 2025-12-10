import { UserIcon } from "lucide-react";
import Link from "next/link";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";

import type { User } from "@/lib/types";

type Props = {
  user?: User;
};
export default function Header({ user }: Props) {
  return (
    <header className="flex justify-between items-center px-8 py-8">
      <Link href="/" className="text-primary">
        <Text variant="h2" className="border-none">
          Mitter
        </Text>
      </Link>

      {user && (
        <Button variant="default" size="icon">
          {user.firstName.length > 0 ? (
            user.firstName.charAt(0).toUpperCase()
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </Button>
      )}
    </header>
  );
}
