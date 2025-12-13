"use client";

import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveChat } from "@/components/live-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoStream } from "@/components/video-stream";

interface PaymentStatus {
  isActive: boolean;
  timeRemaining: number;
  minutesWatched: number;
  costPerMinute: number;
  totalCost: number;
}

export default function StreamPage() {
  const searchParams = useSearchParams();
  const streamKey = searchParams.get("stream");
  const username = searchParams.get("user") || "Viewer";

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    isActive: true,
    timeRemaining: 60,
    minutesWatched: 0,
    costPerMinute: 0.5,
    totalCost: 0,
  });
  const [showPaymentWarning, setShowPaymentWarning] = useState(false);
  const [isStreamPaused, setIsStreamPaused] = useState(false);

  useEffect(() => {
    if (!paymentStatus.isActive) return;

    const timer = setInterval(() => {
      setPaymentStatus((prev) => {
        const newRemaining = prev.timeRemaining - 1;
        const newMinutes = prev.minutesWatched + 1;
        const newCost = prev.totalCost + prev.costPerMinute;

        if (newRemaining <= 30 && newRemaining > 0) {
          setShowPaymentWarning(true);
        }

        if (newRemaining <= 0) {
          setShowPaymentWarning(true);
          setIsStreamPaused(true);
          return prev;
        }

        return {
          ...prev,
          timeRemaining: newRemaining,
          minutesWatched: newMinutes,
          totalCost: newCost,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentStatus.isActive]);

  const handleRenewSession = () => {
    setPaymentStatus((prev) => ({
      ...prev,
      timeRemaining: 60,
      isActive: true,
    }));
    setShowPaymentWarning(false);
    setIsStreamPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <VideoStream
                  stream={null}
                  label={`${username}'s Stream`}
                  className="w-full aspect-video"
                />
              </Card>

              {/* Pause Overlay */}
              {isStreamPaused && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Session Expired
                    </h2>
                    <p className="text-slate-300 mb-6">
                      Your viewing session has expired. Renew to continue
                      watching.
                    </p>
                    <Button
                      onClick={handleRenewSession}
                      className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold"
                      size="lg"
                    >
                      Renew Session (${paymentStatus.costPerMinute.toFixed(2)}
                      /min)
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Warning */}
            {showPaymentWarning && !isStreamPaused && (
              <Card className="bg-amber-900/20 border-amber-600/50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-300">
                      Session Expiring Soon
                    </h3>
                    <p className="text-sm text-amber-200 mt-1">
                      You have {formatTime(paymentStatus.timeRemaining)} left in
                      your viewing session.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Stream Info */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Time Left</p>
                  <p className="text-lg font-bold text-white">
                    {formatTime(paymentStatus.timeRemaining)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Watched</p>
                  <p className="text-lg font-bold text-white">
                    {paymentStatus.minutesWatched}m
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Rate</p>
                  <p className="text-lg font-bold text-primary">
                    ${paymentStatus.costPerMinute.toFixed(2)}/m
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Total</p>
                  <p className="text-lg font-bold text-white">
                    ${paymentStatus.totalCost.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div>
            <LiveChat
              onSendMessage={() => {}}
              onEmojiReaction={() => {}}
              className="h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
