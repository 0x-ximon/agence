"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  label,
  isLocal = false,
}: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
    <div
      className={cn(
        "relative bg-slate-900 rounded-lg overflow-hidden",
        className,
      )}
    >
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline={playsInline}
        muted={muted}
        className="w-full h-full object-cover"
      />
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-white text-sm font-medium">{label}</p>
        </div>
      )}
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <div className="text-center">
            <div className="text-4xl mb-2">📹</div>
            <p className="text-slate-400 text-sm">
              {isLocal ? "Waiting for camera..." : "Waiting for stream..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
