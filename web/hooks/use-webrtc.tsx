"use client";

import { useCallback, useRef, useState } from "react";

interface RTCConfig {
  iceServers?: RTCIceServer[];
  signalingServer?: string;
}

export function useWebRTC(config?: RTCConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  const createPeerConnection = useCallback(() => {
    const peerConfig: RTCConfiguration = {
      iceServers: config?.iceServers || [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    };

    const pc = new RTCPeerConnection(peerConfig);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("[v0] ICE candidate:", event.candidate);
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("[v0] Connection state:", pc.connectionState);
      setIsConnected(pc.connectionState === "connected");
    };

    peerConnectionRef.current = pc;
    return pc;
  }, [config]);

  const startLocalStream = useCallback(
    async (constraints?: MediaStreamConstraints) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          constraints || {
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true,
          },
        );
        localStreamRef.current = stream;
        return stream;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to access camera/microphone";
        setError(message);
        throw err;
      }
    },
    [],
  );

  const addTracksToPeerConnection = useCallback((stream: MediaStream) => {
    if (!peerConnectionRef.current) return;

    stream.getTracks().forEach((track) => {
      peerConnectionRef.current!.addTrack(track, stream);
    });
  }, []);

  const handleRemoteTrack = useCallback((event: RTCTrackEvent) => {
    if (!remoteStreamRef.current) {
      remoteStreamRef.current = new MediaStream();
    }
    remoteStreamRef.current.addTrack(event.track);
  }, []);

  const cleanup = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    peerConnectionRef.current?.close();

    localStreamRef.current = null;
    remoteStreamRef.current = null;
    peerConnectionRef.current = null;
    setIsConnected(false);
  }, []);

  return {
    peerConnectionRef,
    localStreamRef,
    remoteStreamRef,
    isConnected,
    error,
    createPeerConnection,
    startLocalStream,
    addTracksToPeerConnection,
    handleRemoteTrack,
    cleanup,
  };
}
