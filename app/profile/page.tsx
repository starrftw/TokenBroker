import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Award, TrendingUp, Rocket } from "lucide-react";

export default function ProfilePage() {
    // Mock Data (in real app, this would fetch from STATS.md logic or indexer)
    const stats = {
        address: "0x71C...9B3a",
        trustScore: 85,
        launches: 12,
        graduated: 3,
        volume: "42,000 MON"
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
            <div className="container mx-auto max-w-2xl">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Builder Profile</h1>
                        <p className="text-slate-200 font-mono">{stats.address}</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-lg px-4 py-1">
                        Trust Score: {stats.trustScore}
                    </Badge>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    <StatCard
                        label="Total Launches"
                        value={stats.launches}
                        icon={<Rocket className="w-5 h-5 text-blue-400" />}
                    />
                    <StatCard
                        label="Graduations"
                        value={stats.graduated}
                        icon={<Award className="w-5 h-5 text-purple-400" />}
                    />
                    <StatCard
                        label="Total Volume"
                        value={stats.volume}
                        icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
                    />
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <ActivityItem action="Launched Token" item="$LOBSTER" time="2 hours ago" />
                            <ActivityItem action="Graduated" item="$PEPE" time="1 day ago" />
                            <ActivityItem action="Launched Token" item="$TEST" time="3 days ago" />
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <Card className="bg-slate-900 border-slate-800 text-center py-4">
            <CardContent className="p-0 flex flex-col items-center">
                <div className="mb-2 p-2 bg-slate-950 rounded-full">{icon}</div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-300 uppercase tracking-widest font-semibold">{label}</div>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ action, item, time }: { action: string, item: string, time: string }) {
    return (
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0 last:pb-0">
            <div>
                <span className="text-slate-300 font-medium">{action}</span>
                <span className="text-emerald-400 ml-2">{item}</span>
            </div>
            <span className="text-sm text-slate-300">{time}</span>
        </div>
    )
}
