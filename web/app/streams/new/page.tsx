"use client";

import { Clock, Eye, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LiveChat } from "@/components/live-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VideoStream } from "@/components/video-stream";
import { useWebRTC } from "@/hooks/use-webrtc";

interface ScheduledStream {
  id: string;
  title: string;
  description: string;
  scheduledTime: Date;
  streamKey: string;
}

export default function NewStreamPage() {
  const {
    localStreamRef,
    startLocalStream,
    cleanup,
    isConnected,
    createPeerConnection,
    addTracksToPeerConnection,
  } = useWebRTC();
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDuration, setStreamDuration] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [scheduledStreams, setScheduledStreams] = useState<ScheduledStream[]>([
    {
      id: "1",
      title: "Bitcoin Market Analysis",
      description: "Deep dive into BTC trends",
      scheduledTime: new Date(Date.now() + 3600000),
      streamKey: "stream_key_1",
    },
  ]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    description: "",
    scheduledTime: "",
  });

  useEffect(() => {
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

  const scheduleStream = () => {
    if (newSchedule.title && newSchedule.scheduledTime) {
      const scheduled: ScheduledStream = {
        id: Date.now().toString(),
        title: newSchedule.title,
        description: newSchedule.description,
        scheduledTime: new Date(newSchedule.scheduledTime),
        streamKey: `stream_key_${Date.now()}`,
      };
      setScheduledStreams((prev) => [...prev, scheduled]);
      setNewSchedule({ title: "", description: "", scheduledTime: "" });
      setShowScheduleModal(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold">📡</span>
            </div>
            <span className="text-lg font-bold text-white">
              StreamVault Host
            </span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Live Stream Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Video Preview */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <VideoStream
                stream={isStreaming ? localStreamRef.current : null}
                muted={true}
                label={isStreaming ? "Your Stream (Live)" : "Preview"}
                className="w-full aspect-video"
                isLocal={true}
              />
            </Card>

            {/* Stream Controls */}
            <div className="flex gap-3 flex-wrap">
              {!isStreaming ? (
                <Button
                  onClick={startStream}
                  className="bg-destructive hover:bg-destructive/90 text-white flex-1"
                  size="lg"
                >
                  Start Stream
                </Button>
              ) : (
                <>
                  <Button
                    onClick={stopStream}
                    variant="destructive"
                    className="flex-1"
                    size="lg"
                  >
                    Stop Stream
                  </Button>
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
                </>
              )}
            </div>

            {/* Stream Info */}
            {isStreaming && (
              <Card className="bg-slate-800 border-slate-700 p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Live Duration</p>
                    <p className="text-xl font-bold text-white">
                      {formatTime(streamDuration)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Current Viewers</p>
                    <p className="text-xl font-bold text-white flex items-center gap-2">
                      <Eye className="w-5 h-5" /> {viewers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Earnings</p>
                    <p className="text-xl font-bold text-primary">
                      ${totalEarnings.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Chat Sidebar */}
          <div>
            <LiveChat isHost={true} />
          </div>
        </div>

        {/* Stream Title Input */}
        <Card className="bg-slate-800 border-slate-700 p-6 mb-8">
          <label className="block text-sm font-medium text-slate-100 mb-2">
            Stream Title
          </label>
          <Input
            value={streamTitle}
            onChange={(e) => setStreamTitle(e.target.value)}
            placeholder="Enter your stream title..."
            className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
          />
        </Card>

        {/* Scheduled Streams */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Scheduled Streams
            </h2>
            <Button
              onClick={() => setShowScheduleModal(true)}
              className="bg-primary hover:bg-primary/90 text-slate-900"
            >
              Schedule Stream
            </Button>
          </div>

          {/* Schedule Modal */}
          {showScheduleModal && (
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Schedule New Stream
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-200 block mb-2">
                    Title
                  </label>
                  <Input
                    value={newSchedule.title}
                    onChange={(e) =>
                      setNewSchedule((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Stream title"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200 block mb-2">
                    Description
                  </label>
                  <Input
                    value={newSchedule.description}
                    onChange={(e) =>
                      setNewSchedule((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Stream description"
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-200 block mb-2">
                    Date & Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={newSchedule.scheduledTime}
                    onChange={(e) =>
                      setNewSchedule((p) => ({
                        ...p,
                        scheduledTime: e.target.value,
                      }))
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={scheduleStream}
                    className="bg-primary hover:bg-primary/90 text-slate-900 flex-1"
                  >
                    Schedule
                  </Button>
                  <Button
                    onClick={() => setShowScheduleModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-100 flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Scheduled Streams List */}
          <div className="grid gap-4">
            {scheduledStreams.map((stream) => (
              <Card
                key={stream.id}
                className="bg-slate-800 border-slate-700 p-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{stream.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {stream.description}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {stream.scheduledTime.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded font-mono">
                      {stream.streamKey}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
