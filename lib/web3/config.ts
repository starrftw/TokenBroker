import { defineChain } from 'viem'
import { monadTestnet } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'

// Define Monad Mainnet
export const monadMainnet = defineChain({
    id: 143,
    name: 'Monad',
    nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.monad.xyz'] },
    },
    blockExplorers: {
        default: { name: 'MonadExplorer', url: 'https://explorer.monad.xyz' },
    },
})

// Define Monad Testnet explicitly to match agents.md
export const monadTestnetCustom = defineChain({
    id: 10143,
    name: 'Monad Testnet',
    nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.monad.xyz'] },
    },
    blockExplorers: {
        default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' },
    },
})

export const config = createConfig({
    chains: [monadMainnet, monadTestnetCustom],
    connectors: [injected()],
    ssr: true,
    transports: {
        [monadMainnet.id]: http(),
        [monadTestnetCustom.id]: http(),
    },
})
