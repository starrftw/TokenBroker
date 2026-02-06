'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, Loader2 } from 'lucide-react'

export function ConnectButton() {
    const { address, isConnected, isConnecting } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected && address) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 font-bold rounded-full transition-all"
                >
                    <Wallet className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => disconnect()}
                    className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 rounded-full transition-all"
                    title="Disconnect"
                >
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            {connectors.map((connector) => (
                <Button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    disabled={isConnecting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                    {isConnecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wallet className="w-4 h-4 mr-2" />}
                    {connector.name === 'Injected' ? 'Connect Wallet' : connector.name}
                </Button>
            ))}
        </div>
    )
}
