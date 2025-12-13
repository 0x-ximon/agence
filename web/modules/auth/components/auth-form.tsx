"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function AuthForm() {
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin();
  const router = useRouter();

  if (!ready) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {authenticated ? (
        <Button onClick={logout} type="submit" className="w-full">
          Log Out
        </Button>
      ) : (
        <Button onClick={login} type="submit" className="w-full">
          Log in
        </Button>
      )}

      <Button
        variant="secondary"
        disabled={!authenticated}
        onClick={() => router.push("/streams/join")}
        type="submit"
        className="w-full"
      >
        Join a stream
      </Button>
    </div>
  );
}
