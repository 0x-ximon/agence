import type { Metadata } from "next";
import { LiveChat } from "@/components/live-chat";
import Stream from "@/components/stream";

export const metadata: Metadata = {
  title: "Host Stream",
};

export default function HostStreamPage() {
  return (
    <div className="w-full h-screen p-8 space-y-8 grid lg:grid-cols-4 gap-8">
      <div className="grid lg:col-span-3 h-full">
        <Stream />
      </div>

      <div className="grid lg:grid-rows-2 gap-8">
        <LiveChat />
        <LiveChat />
      </div>
    </div>
  );
}
