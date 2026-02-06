'use client'

import React from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Award, TrendingUp, Rocket, Loader2 } from "lucide-react";
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
            <div className="container mx-auto max-w-4xl">
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

                <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md rounded-3xl overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/2 pb-6">
                        <CardTitle className="text-2xl text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="p-12 flex flex-col items-center justify-center text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
                                <p>Scanning blockchain for your tokens...</p>
                            </div>
                        ) : filteredTokens && filteredTokens.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {filteredTokens.map((token: any) => (
                                    <ActivityItem
                                        key={`${token.network}-${token.token_id || token.address}`}
                                        action="Launched Token"
                                        item={`$${token.symbol}`}
                                        time={new Date(token.created_at * 1000).toLocaleDateString()}
                                        isGraduated={token.is_graduated}
                                        network={token.network}
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

function ActivityItem({ action, item, time, isGraduated, network }: { action: string, item: string, time: string, isGraduated?: boolean, network: string }) {
    return (
        <div className="flex justify-between items-center p-6 hover:bg-white/2 transition-all">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${isGraduated ? 'bg-purple-500/10' : 'bg-emerald-500/10'}`}>
                    <Rocket className={`w-4 h-4 ${isGraduated ? 'text-purple-400' : 'text-emerald-400'}`} />
                </div>
                <div>
                    <span className="text-slate-300 font-semibold">{action}</span>
                    <span className={`ml-3 font-bold ${isGraduated ? 'text-purple-400' : 'text-emerald-400'}`}>{item}</span>
                    <Badge variant="outline" className={`ml-3 text-[10px] uppercase font-bold ${network === 'mainnet' ? 'border-emerald-500/30 text-emerald-400' : 'border-blue-500/30 text-blue-400'}`}>
                        {network}
                    </Badge>
                    {isGraduated && <Badge className="ml-3 bg-purple-500/20 text-purple-400 border-none text-[10px] uppercase font-black">Graduated</Badge>}
                </div>
            </div>
            <span className="text-sm font-medium text-slate-500">{time}</span>
        </div>
    )
}
