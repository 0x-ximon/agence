"use client";

import {
  DynamicEmbeddedWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { Spinner } from "@/components/ui/spinner";

export default function AuthForm() {
  const { sdkHasLoaded } = useDynamicContext();

  return (
    <div className="flex items-center justify-center">
      {sdkHasLoaded ? <DynamicEmbeddedWidget background="none" /> : <Spinner />}
    </div>
  );
}
