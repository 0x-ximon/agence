"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

interface VideoStreamProps {
  stream?: MediaStream | null;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  className?: string;
  label?: string;
  isLocal?: boolean;
}

export function VideoStream({
  stream,
  muted = false,
  autoPlay = true,
  playsInline = true,
  className,
  isLocal = false,
}: VideoStreamProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline={playsInline}
        muted={muted}
        className="w-full h-full object-cover"
      />

      {/* {!stream && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <Text variant="muted">
            {isLocal ? "Waiting for camera..." : "Waiting for stream..."}
          </Text>
        </div>
      )} */}
    </div>
  );
}
