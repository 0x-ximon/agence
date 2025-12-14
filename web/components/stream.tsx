"use client";

import {
  DollarSign,
  Eye,
  Timer,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoStream } from "@/components/video-stream";
import { useWebRTC } from "@/hooks/use-webrtc";
import { formatTime } from "@/lib/utils";

type Props = {
  isHost: boolean;
};

export default function Stream({ isHost = false }: Props) {
  const {
    localStreamRef,
    startLocalStream,
    cleanup,
    createPeerConnection,
    addTracksToPeerConnection,
  } = useWebRTC();
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [isCameraOn, setIsCameraOn] = React.useState(false);
  const [isMicOn, setIsMicOn] = React.useState(false);
  const [viewers, setViewers] = React.useState(0);
  const [streamDuration, setStreamDuration] = React.useState(0);
  const [totalEarnings, setTotalEarnings] = React.useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isStreaming) {
      timer = setInterval(() => {
        setStreamDuration((d) => d + 1);
        setTotalEarnings((prev) => prev + Math.random() * 0.5);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isStreaming]);

  const startStream = async () => {
    try {
      const stream = await startLocalStream();
      const pc = createPeerConnection();
      addTracksToPeerConnection(stream);

      setIsCameraOn(true);
      setIsMicOn(true);
      setIsStreaming(true);
      setStreamDuration(0);
      setTotalEarnings(0);
      setViewers(Math.floor(Math.random() * 50) + 1);
    } catch (err) {
      console.error("Failed to start stream:", err);
    }
  };

  const stopStream = () => {
    cleanup();
    setIsStreaming(false);
    setIsCameraOn(false);
    setIsMicOn(false);
    setViewers(0);
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  return (
    <Card className="p-4 gap-4">
      <div className="flex justify-between items-center">
        <Image src="/icon.png" alt="Agence" width={48} height={48} />

        <div className="flex items-center gap-8">
          <Text variant="large">
            <span className="flex items-center gap-2">
              <DollarSign /> {totalEarnings.toFixed(2)}
            </span>
          </Text>

          <Text variant="large">
            <span className="flex items-center gap-2">
              <Eye /> {viewers}
            </span>
          </Text>

          <Text variant="large">
            <span className="flex items-center gap-2">
              <Timer />
              {formatTime(streamDuration)}
            </span>
          </Text>
        </div>
      </div>

      <VideoStream
        stream={isStreaming ? localStreamRef.current : null}
        muted={true}
        label={isStreaming ? "Your Stream (Live)" : "Preview"}
        isLocal={true}
      />

      {isHost && (
        <div className="flex items-center justify-center gap-4">
          {isStreaming ? (
            <Button onClick={stopStream} variant="destructive" size="lg">
              Stop Stream
            </Button>
          ) : (
            <Button onClick={startStream} variant="default" size="lg">
              Start Stream
            </Button>
          )}

          <Button
            onClick={toggleCamera}
            variant={isCameraOn ? "default" : "secondary"}
            className="flex gap-2"
            size="lg"
          >
            {isCameraOn ? (
              <Video className="w-4 h-4" />
            ) : (
              <VideoOff className="w-4 h-4" />
            )}
          </Button>

          <Button
            onClick={toggleMic}
            variant={isMicOn ? "default" : "secondary"}
            className="flex gap-2"
            size="lg"
          >
            {isMicOn ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}
