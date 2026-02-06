'use client'

import React from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Award, TrendingUp, Rocket, Loader2, Twitter, MessageSquare, Globe, Users, Wallet, ExternalLink, Activity } from "lucide-react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import nextDynamic from "next/dynamic";
const ConnectButton = nextDynamic(
    () => import("@/components/features/wallet/connect-button").then((mod) => mod.ConnectButton),
    { ssr: false }
);

export default function ProfilePage() {
    const { address, isConnected } = useAccount();
    const [networkFilter, setNetworkFilter] = React.useState<'all' | 'mainnet' | 'testnet'>('all');

    const { data: tokens, isLoading } = useQuery({
        queryKey: ['builder-tokens', address],
        queryFn: async () => {
            if (!address) return [];

            // Correct API endpoints from nad.fun documentation
            const mainnetApi = `https://api.nadapp.net/agent/token/created/${address}`;
            const testnetApi = `https://dev-api.nad.fun/agent/token/created/${address}`;

            try {
                const [mainnetRes, testnetRes] = await Promise.all([
                    fetch(mainnetApi).then(r => r.ok ? r.json() : { tokens: [] }),
                    fetch(testnetApi).then(r => r.ok ? r.json() : { tokens: [] })
                ]);

                // Map and flatten
                const mainnetTokens = (mainnetRes.tokens || []).map((t: any) => ({
                    ...t.token_info,
                    ...t.market_info,
                    network: 'mainnet'
                }));
                const testnetTokens = (testnetRes.tokens || []).map((t: any) => ({
                    ...t.token_info,
                    ...t.market_info,
                    network: 'testnet'
                }));

                return [...mainnetTokens, ...testnetTokens].sort((a, b) =>
                    (b.created_at || 0) - (a.created_at || 0)
                );
            } catch (error) {
                console.error("Error fetching tokens:", error);
                return [];
            }
        },
        enabled: !!address,
    });

    // Filter tokens based on state
    const filteredTokens = tokens?.filter((t: any) => {
        if (networkFilter === 'all') return true;
        return t.network === networkFilter;
    }) || [];

    // Derive stats from filtered data
    const launches = filteredTokens.length;
    const graduated = filteredTokens.filter((t: any) => t.is_graduated).length;
    const totalVolumeWei = filteredTokens.reduce((acc: bigint, t: any) => acc + BigInt(t.volume || 0), BigInt(0));
    const totalVolume = Number(totalVolumeWei) / 1e18;

    const stats = {
        address: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected",
        launches,
        graduated,
        volume: totalVolume.toFixed(2) + " MON"
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-8">
                <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">Builder Access</Badge>
                <h1 className="text-4xl font-bold mb-8 text-white">Connect to View Profile</h1>
                <ConnectButton />
                <Link href="/" className="mt-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                    </Link>
                    <ConnectButton />
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Builder Profile</h1>
                        <p className="text-slate-400 font-mono mt-2">{address}</p>
                    </div>
                </div>

                <div className="flex gap-2 mb-8">
                    {['all', 'mainnet', 'testnet'].map((net) => (
                        <Button
                            key={net}
                            variant={networkFilter === net ? 'default' : 'outline'}
                            onClick={() => setNetworkFilter(net as any)}
                            className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all ${networkFilter === net
                                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                : 'text-slate-400 hover:text-white border-slate-800'
                                }`}
                        >
                            {net}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        label="Total Launches"
                        value={stats.launches}
                        icon={<Rocket className="w-6 h-6 text-blue-400" />}
                    />
                    <StatCard
                        label="Graduations"
                        value={stats.graduated}
                        icon={<Award className="w-6 h-6 text-purple-400" />}
                    />
                    <StatCard
                        label="Total Volume"
                        value={stats.volume}
                        icon={<TrendingUp className="w-6 h-6 text-emerald-400" />}
                    />
                </div>

                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/2 py-8 px-10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl text-white font-black tracking-tight">Portfolio Activity</CardTitle>
                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-400">{filteredTokens.length} Tokens</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="p-12 flex flex-col items-center justify-center text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                                <p>Scanning blockchain for your tokens...</p>
                            </div>
                        ) : filteredTokens && filteredTokens.length > 0 ? (
                            <div className="">
                                {filteredTokens.map((token: any) => (
                                    <ActivityItem
                                        key={`${token.network}-${token.token_id || token.address}`}
                                        token={token}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center space-y-4">
                                <p className="text-slate-400 text-lg">No tokens found for this builder on {networkFilter}.</p>
                                <Button variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5">
                                    <Link href="/#install">Launch Your First Skill</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <Card className="bg-slate-900/40 border-slate-800 text-center py-8 rounded-3xl hover:border-emerald-500/20 transition-all group">
            <CardContent className="p-0 flex flex-col items-center">
                <div className="mb-4 p-4 bg-slate-950 rounded-2xl group-hover:scale-110 transition-transform shadow-xl">{icon}</div>
                <div className="text-4xl font-bold text-white mb-1 tracking-tighter">{value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">{label}</div>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ token }: { token: any }) {
    const marketCap = (parseFloat(token.price_usd) || 0) * (Number(BigInt(token.total_supply || 0)) / 1e18);
    const volume = Number(BigInt(token.volume || 0)) / 1e18;
    const holdings = Number(BigInt(token.balance || 0)) / 1e18;

    return (
        <div className="p-6 hover:bg-white/2 transition-all group border-b border-white/5 last:border-0">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Token Icon & Header info */}
                <div className="flex gap-4 flex-1">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                        {token.image_uri ? (
                            <img src={token.image_uri} alt={token.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-emerald-500/10">
                                <Rocket className="w-6 h-6 text-emerald-400" />
                            </div>
                        )}
                        <Badge className={`absolute bottom-0 right-0 rounded-none rounded-tl-lg text-[8px] uppercase font-bold border-none px-1.5 py-0.5 ${token.network === 'mainnet' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                            {token.network}
                        </Badge>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <h3 className="text-xl font-bold text-white truncate group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                                    {token.name} <span className="text-slate-500 text-sm font-medium ml-1">${token.symbol}</span>
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {token.is_graduated && (
                                        <Badge className="bg-purple-500/20 text-purple-400 border-none text-[10px] uppercase font-black tracking-wider">
                                            Graduated
                                        </Badge>
                                    )}
                                    <span className="text-xs text-slate-500 font-medium">Launched {new Date(token.created_at * 1000).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {token.twitter && (
                                    <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {token.telegram && (
                                    <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                        <MessageSquare className="w-4 h-4" />
                                    </a>
                                )}
                                {token.website && (
                                    <a href={token.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                        <Globe className="w-4 h-4" />
                                    </a>
                                )}
                                <a href={`https://nad.fun/tokens/${token.token_id || token.address}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 line-clamp-2 mt-2 font-medium leading-relaxed">
                            {token.description || "No description provided for this launch."}
                        </p>
                    </div>
                </div>

                {/* Market Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:w-1/2 shrink-0">
                    <div className="bg-white/2 rounded-2xl p-3 border border-white/5">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold mb-1">
                            <TrendingUp className="w-3 h-3" /> Market Cap
                        </div>
                        <div className="text-sm font-bold text-white">${marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="bg-white/2 rounded-2xl p-3 border border-white/5">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold mb-1">
                            <Users className="w-3 h-3" /> Holders
                        </div>
                        <div className="text-sm font-bold text-white">{token.holder_count || 0}</div>
                    </div>

                    <div className="bg-white/2 rounded-2xl p-3 border border-white/5">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold mb-1">
                            <Activity className="w-3 h-3" /> 24h Vol
                        </div>
                        <div className="text-sm font-bold text-emerald-400">{volume.toFixed(2)} MON</div>
                    </div>

                    <div className="bg-white/2 rounded-2xl p-3 border border-emerald-500/10 bg-emerald-500/5">
                        <div className="flex items-center gap-1.5 text-emerald-400/70 text-[10px] uppercase font-bold mb-1">
                            <Wallet className="w-3 h-3" /> Your Bag
                        </div>
                        <div className="text-sm font-black text-emerald-400">{holdings.toLocaleString(undefined, { maximumFractionDigits: 0 })} {token.symbol}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
