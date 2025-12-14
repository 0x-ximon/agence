"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";

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
    <AspectRatio ratio={16 / 9}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline={playsInline}
        muted={muted}
        className="w-full h-full rounded-2xl"
      />

      {/* {!stream && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <Text variant="muted">
            {isLocal ? "Waiting for camera..." : "Waiting for stream..."}
          </Text>
        </div>
      )} */}
    </AspectRatio>
  );
}
