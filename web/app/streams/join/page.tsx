"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function JoinStreamPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (username && streamKey) {
        router.push(`/viewer/watch?stream=${streamKey}&user=${username}`);
      } else {
        setError("Please enter your name and stream key");
      }
    } catch (err) {
      setError("Failed to join stream");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-900 font-bold text-lg">👁️</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Join a Stream</h1>
            <p className="text-slate-400 mt-2">
              Enter details to watch a premium stream
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            {error && (
              <div className="bg-destructive/20 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-200 block mb-2">
                Your Name
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200 block mb-2">
                Stream Key
              </label>
              <Input
                value={streamKey}
                onChange={(e) => setStreamKey(e.target.value)}
                placeholder="e.g., stream_key_123"
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-semibold"
            >
              {isLoading ? "Joining..." : "Join Stream"}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-200 text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
