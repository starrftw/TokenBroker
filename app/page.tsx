'use client'

import React from 'react';
import dynamic from "next/dynamic";
const ConnectButton = dynamic(
  () => import("@/components/features/wallet/connect-button").then((mod) => mod.ConnectButton),
  { ssr: false }
);
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Terminal, Bot, Rocket, ShieldCheck, Zap, Handshake, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-28 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-6 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold">
          The Launch Skill for Agents
        </Badge>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
          TokenBroker
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-normal">
          The ultimate agentic toolkit for <span className="text-emerald-400 font-bold underline decoration-emerald-500/50 underline-offset-8">nad.fun</span>.
          Your agent tracks your GitHub projects and launches them as devcoins on autopilot.
        </p>

        <div className="mb-12">
          <Link href="https://nad.fun/tokens/0xCE3d2E5C308669583c1fA7e585ce771cA9EA7777" target="_blank" className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/60 border border-emerald-500/20 rounded-2xl hover:bg-slate-900 transition-all group">
            <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Official Token</span>
            <span className="h-4 w-px bg-slate-800" />
            <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">0xCE3d...7777</span>
            <Rocket className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 mb-16 items-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-16 px-12 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.15)] rounded-full text-lg">
            <Link href="#install" className="flex items-center gap-2">
              Get Started <Rocket className="w-6 h-6" />
            </Link>
          </Button>
          <ConnectButton />
          <Link href="/profile" className="text-slate-400 hover:text-white transition-colors font-semibold text-sm">
            View Profile &rarr;
          </Link>
        </div>

        {/* Real-time stats or mini-dashboard feel could go here */}
      </section>

      {/* Feature Grid - Explaining the Depth */}
      <section className="container mx-auto px-4 py-24 bg-slate-1000/50 border-y border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Advanced Orchestration</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Beyond simple launching. We provide the full infrastructure for autonomous token management.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Terminal className="w-8 h-8 text-emerald-400" />}
            title="Semantic Scanning"
            desc="Our agent doesn't just list files. It analyzes brand voice, tech stack, and project mission to generate identity-aligned tokens that feel native to your project."
          />
          <FeatureCard
            icon={<Bot className="w-8 h-8 text-cyan-400" />}
            title="Intelligent Metadata"
            desc="Ditch the generic names. Generate symbols and descriptions that resonate with your project's unique soul, fully optimized for nad.fun bonding curves."
          />
          <FeatureCard
            icon={<Rocket className="w-8 h-8 text-purple-400" />}
            title="Vanity Orchestration"
            desc="Automated 4-step deployment sequence including IPFS metadata pinning and salt mining for predicted contract addresses. Professional grade infra."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-yellow-500" />}
            title="Autonomous Trading"
            desc="Enable your agents to interact with their own ecosystem. Buy, sell, and track graduation progress to Uniswap without human intervention."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
            title="On-Chain Reputation"
            desc="Every launch builds your trust score. Real-time metrics verify legitimacy and track volume, creating a verifiable record of builder success."
          />
          <FeatureCard
            icon={<Handshake className="w-8 h-8 text-pink-500" />}
            title="Agent Coordination"
            desc="Standardized A2A protocols. Let your marketing agent talk to your launch agent. Native coordination for complex on-chain operations."
          />
        </div>
      </section>

      {/* Project Structure - The "Blueprint" */}
      <section className="container mx-auto px-4 py-32 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-bold text-white tracking-tight">The Blueprint.</h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                TokenBroker is built as a modular <span className="text-white font-semibold italic">skillset</span>.
                Each file in the <code className="text-emerald-400">tb_skill/</code> directory is a specialized module your agent can read, interpret, and execute.
              </p>
              <p>
                This "Markdown-first" architecture ensures your agents have perfect context for every action, from scanning local files to executing on-chain trades.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bot className="w-32 h-32 text-emerald-500" />
            </div>
            <pre className="font-mono text-sm text-slate-400 leading-relaxed">
              <span className="text-emerald-500 font-bold">tb_skill/</span><br />
              ├── <span className="text-white">SKILL.md</span>        <span className="text-slate-600"># Entry point & index</span><br />
              ├── <span className="text-white">PROJECT-SCAN.md</span> <span className="text-slate-600"># AI Identity extraction</span><br />
              ├── <span className="text-white">LAUNCH.md</span>       <span className="text-slate-600"># 4-stage nad.fun flow</span><br />
              ├── <span className="text-white">TRADING.md</span>      <span className="text-slate-600"># Autonomous buy/sell</span><br />
              ├── <span className="text-white">PROMO.md</span>        <span className="text-slate-600"># Marketing & A2A sync</span><br />
              ├── <span className="text-white">STATS.md</span>        <span className="text-slate-600"># Reputation logic</span><br />
              └── <span className="text-white">ABI.md</span>          <span className="text-slate-600"># Contract interfaces</span>
            </pre>
          </div>
        </div>
      </section>

      {/* Installation UI */}
      <section id="install" className="container mx-auto px-4 py-32 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">On-The-Go Scaling</h2>
          <p className="text-slate-300 text-lg">Set up your agent environment and start launching in seconds.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="h-1 bg-emerald-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Terminal className="w-6 h-6 text-emerald-400" /> Professional Integration
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">Add to your existing project pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-1000 rounded-xl border border-white/5 shadow-inner">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">CLI Installation</p>
                <code className="block text-emerald-400 font-mono text-sm leading-relaxed">
                  cd your-project<br />
                  git clone https://github.com/starrftw/tokenbroker .tokenbroker
                </code>
              </div>
              <ul className="text-sm space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-emerald-500 text-lg">→</span>
                  <span>Perfect for automated CI/CD launch pipelines</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 text-lg">→</span>
                  <span>Integrated reputation building for every launch</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="h-1 bg-cyan-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Bot className="w-6 h-6 text-cyan-400" /> Agent-Ready Prompts
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">Commands your agent understands natively</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-1000 rounded-xl border border-white/5 shadow-inner">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Interactive Examples</p>
                <code className="block text-cyan-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  "Analyze my project architecture and suggest a token name that fits our brand voice."
                </code>
              </div>
              <ul className="text-sm space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <span className="text-cyan-500 text-lg">→</span>
                  <span>Automated launch schedule suggestions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500 text-lg">→</span>
                  <span>Proactive market sentiment analysis</span>
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
            <Link href="https://nad.fun/tokens/0xCE3d2E5C308669583c1fA7e585ce771cA9EA7777" className="hover:text-emerald-400 transition-colors">$TOKEN</Link>
            <Link href="https://github.com/starrftw/tokenbroker" className="hover:text-emerald-400 transition-colors">GitHub</Link>
            <Link href="https://x.com/starrftw/" className="hover:text-emerald-400 transition-colors">X / Twitter</Link>
            <Link href="https://tb.dbuilder.xyz/" className="hover:text-emerald-400 transition-colors">Platform</Link>
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
        <CardTitle className="text-xl tracking-wide text-white group-hover:text-emerald-400 transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}
