import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📡</span>
            </div>
            <span className="text-xl font-bold text-white">Agence</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-100 hover:bg-slate-700 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/streams/join">
              <Button className="bg-primary hover:bg-primary/90 text-slate-900">
                Join Stream
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-balance">
            Monetize Your Live Streams
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            Premium video conferencing with per-minute payments. Host streams
            and earn instantly with blockchain-secured transactions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/streams/host">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-slate-900 text-lg px-8"
              >
                Start Streaming
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-100 hover:bg-slate-700 text-lg px-8 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-slate-600 transition-colors">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-white mb-3">
              HD Video Streaming
            </h3>
            <p className="text-slate-300">
              Crystal clear WebRTC video with adaptive bitrate streaming for all
              connection speeds.
            </p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-slate-600 transition-colors">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-3">
              Instant Payments
            </h3>
            <p className="text-slate-300">
              Per-minute payment model via Coinbase using x402 protocol. Secure,
              transparent, and verifiable.
            </p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-slate-600 transition-colors">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-3">
              Live Interaction
            </h3>
            <p className="text-slate-300">
              Real-time chat, emoji reactions, and engagement tools to keep your
              audience connected.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
