import type { Metadata } from "next";
import { LiveChat } from "@/components/live-chat";
import Stream from "@/components/stream";

export const metadata: Metadata = {
  title: "Host Stream",
};

export default function HostStreamPage() {
  return (
    <div className="w-full h-screen p-4 grid lg:grid-cols-4 gap-4">
      <div className="grid lg:col-span-3">
        <Stream isHost={true} />
      </div>

      <div className="grid lg:grid-rows-3 gap-4">
        <div className="grid lg:row-span-2">
          <LiveChat />
        </div>
      </div>
    </div>
  );
}
