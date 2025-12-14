"use client";

import { Eye, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import React from "react";
import { LiveChat } from "@/components/live-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VideoStream } from "@/components/video-stream";
import { useWebRTC } from "@/hooks/use-webrtc";
import { formatTime } from "@/lib/utils";

export default function Stream() {
  const {
    localStreamRef,
    startLocalStream,
    cleanup,
    isConnected,
    createPeerConnection,
    addTracksToPeerConnection,
  } = useWebRTC();
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [isCameraOn, setIsCameraOn] = React.useState(false);
  const [isMicOn, setIsMicOn] = React.useState(false);
  const [viewers, setViewers] = React.useState(0);
  const [streamTitle, setStreamTitle] = React.useState("");
  const [streamDuration, setStreamDuration] = React.useState(0);
  const [totalEarnings, setTotalEarnings] = React.useState(0);

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
    <Card>
      <VideoStream
        stream={isStreaming ? localStreamRef.current : null}
        muted={true}
        label={isStreaming ? "Your Stream (Live)" : "Preview"}
        className="w-full aspect-video"
        isLocal={true}
      />

      {/* <div className="flex gap-3 flex-wrap">
        {!isStreaming ? (
          <Button onClick={startStream} variant="default" size="lg">
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
      </div> */}
    </Card>
  );
}

// return (
//   <div className="grid lg:grid-cols-3 gap-8">
//     <div className="lg:col-span-2 space-y-4">
//       <Card className="overflow-hidden min-h-80 min-w-80">
//         <VideoStream
//           stream={isStreaming ? localStreamRef.current : null}
//           muted={true}
//           label={isStreaming ? "Your Stream (Live)" : "Preview"}
//           className="w-full aspect-video"
//           isLocal={true}
//         />
//       </Card>

//       <div className="flex gap-3 flex-wrap">
//         {!isStreaming ? (
//           <Button
//             onClick={startStream}
//             variant="default"
//             size="lg"
//             className="w-full"
//           >
//             Start Stream
//           </Button>
//         ) : (
//           <>
//             <Button
//               onClick={stopStream}
//               variant="destructive"
//               className="flex-1"
//               size="lg"
//             >
//               Stop Stream
//             </Button>
//             <Button
//               onClick={toggleCamera}
//               variant={isCameraOn ? "default" : "secondary"}
//               className="flex gap-2"
//               size="lg"
//             >
//               {isCameraOn ? (
//                 <Video className="w-4 h-4" />
//               ) : (
//                 <VideoOff className="w-4 h-4" />
//               )}
//             </Button>
//             <Button
//               onClick={toggleMic}
//               variant={isMicOn ? "default" : "secondary"}
//               className="flex gap-2"
//               size="lg"
//             >
//               {isMicOn ? (
//                 <Volume2 className="w-4 h-4" />
//               ) : (
//                 <VolumeX className="w-4 h-4" />
//               )}
//             </Button>
//           </>
//         )}

//         {/* {isStreaming && (
//           <Card className="bg-slate-800 border-slate-700 p-4">
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <p className="text-sm text-slate-400">Live Duration</p>
//                 <p className="text-xl font-bold text-white">
//                   {formatTime(streamDuration)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-400">Current Viewers</p>
//                 <p className="text-xl font-bold text-white flex items-center gap-2">
//                   <Eye className="w-5 h-5" /> {viewers}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-400">Total Earnings</p>
//                 <p className="text-xl font-bold text-primary">
//                   ${totalEarnings.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         )} */}
//       </div>

//       {/* <div>
//         <LiveChat isHost={true} />
//       </div> */}
//     </div>
//   </div>
// );
