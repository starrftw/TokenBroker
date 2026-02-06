import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Terminal, Bot, Rocket, ShieldCheck, Zap, Handshake, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-widest font-bold">
          Agentic Skillset v1.0
        </Badge>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          TokenBroker
        </h1>
        <p className="text-xl text-slate-200 max-w-2xl mb-10 leading-relaxed font-medium">
          The ultimate agentic toolkit for <span className="text-emerald-400 font-bold underline decoration-emerald-500/50 underline-offset-8">nad.fun</span>.
          Scan projects, generate assets, and launch tokens on Monad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 px-10 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.2)] rounded-full">
            <Link href="https://github.com/starrftw/tokenbroker" className="flex items-center gap-2">
              Get Started <Bot className="w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 text-slate-200 h-14 px-10 rounded-full transition-all">
            <Link href="/profile" className="flex items-center gap-2">
              Builder Profile <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Terminal className="w-8 h-8 text-emerald-400" />}
            title="Project Scanning"
            desc="Deep codebase analysis to extract identity, tech stack, and brand voice for your token identity."
          />
          <FeatureCard
            icon={<Bot className="w-8 h-8 text-cyan-400" />}
            title="AI Metadata Gen"
            desc="Generate names, symbols, and descriptions that resonate with your project's unique soul."
          />
          <FeatureCard
            icon={<Rocket className="w-8 h-8 text-purple-400" />}
            title="One-Click Launch"
            desc="Automated orchestration on nad.fun with vanity address mining and IPFS metadata pinning."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-yellow-500" />}
            title="Trading Skill"
            desc="Enable agents to buy, sell, and track graduation progress of their own tokens autonomously."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
            title="Reputation System"
            desc="Real-time trust scoring and builder metrics to verify legitimacy and track long-term success."
          />
          <FeatureCard
            icon={<Handshake className="w-8 h-8 text-pink-500" />}
            title="A2A Coordination"
            desc="Standardized protocols for agent-to-agent collaboration and automated ecosystem interaction."
          />
        </div>
      </section>

      {/* Installation UI */}
      <section id="install" className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">First Steps</h2>
          <p className="text-slate-300 text-lg">Set up your agent environment and start launching.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="h-1 bg-emerald-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Terminal className="w-6 h-6 text-emerald-400" /> Agent CLI Setup
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">Initialize the skillset via terminal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-1000 rounded-xl border border-white/5 shadow-inner">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Install via Git</p>
                <code className="block text-emerald-400 font-mono text-sm leading-relaxed">
                  cd your-project<br />
                  git clone https://github.com/starrftw/tokenbroker .tokenbroker
                </code>
              </div>
              <ul className="text-sm space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Verify source code manually for safety</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  <span>Fully compatible with the OpenClaw framework</span>
                </li>
                <li className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                  <Link href="https://code.claude.com/docs/en/skills" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-2">
                    Learn how Skills work <Zap className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="h-1 bg-cyan-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Bot className="w-6 h-6 text-cyan-400" /> First Interaction
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">Guide your agent to find opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-1000 rounded-xl border border-white/5 shadow-inner">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Starting Prompts</p>
                <code className="block text-cyan-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  "Analyze my current project and suggest if it is a good fit for a nad.fun launch."
                </code>
              </div>
              <ul className="text-sm space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-cyan-500">✓</span>
                  <span>Identify creative hook for new tokens</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500">✓</span>
                  <span>Draft suggestions to your human builder</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500">✓</span>
                  <span>Plan an automated launch schedule</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 font-black text-2xl text-white tracking-tighter">
              <span className="bg-emerald-500 p-2 rounded-xl scale-110">🦞</span> TOKENBROKER
            </div>
            <p className="text-slate-500 text-sm font-medium">Empowering agents, launching the future.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-semibold text-slate-300">
            <Link href="/tb_skill/SKILL.md" className="hover:text-emerald-400 transition-colors">Documentation</Link>
            <Link href="https://github.com/starrftw/tokenbroker" className="hover:text-emerald-400 transition-colors">GitHub</Link>
            <Link href="https://code.claude.com/docs/en/skills" className="hover:text-emerald-400 transition-colors">Skills Framework</Link>
          </div>
          <div className="text-xs text-slate-600 font-medium">
            &copy; 2026 TokenBroker. MIT License.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Card className="bg-slate-900/30 border-slate-800/50 hover:border-emerald-500/30 transition-all hover:bg-slate-900/50 group">
      <CardHeader>
        <div className="mb-4 bg-slate-950 inline-block p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/50">{icon}</div>
        <CardTitle className="text-xl tracking-wide">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}
