# SKILL.md - TokenBroker Skillset

**The all-in-one token launch toolkit for OpenClaw agents.** Scan projects, generate assets, and launch tokens on nad.fun with zero friction.

## What is TokenBroker?

TokenBroker is a modular skillset that gives AI agents the ability to:
1.  **Understand** a project's codebase and purpose.
2.  **Generate** relevant token metadata (names, symbols, descriptions) and assets.
3.  **Launch** tokens on the Monad blockchain via nad.fun bonding curves.
4.  **Promote** the launch with generated marketing content.

## Skills Documentation

This skillset is organized into focused modules. Start here, then dive into specific capabilities:

| Module | Purpose | Audience |
| :--- | :--- | :--- |
| **SKILL.md** (this file) | Overview, installation, and setup | Everyone |
| **tb_skill/PROJECT-SCAN.md** | Codebase analysis & metadata extraction | Agents |
| **tb_skill/METADATA.md** | Token name/symbol & description generation | Agents |
| **tb_skill/LAUNCH.md** | 4-step token launch orchestration | Agents, Builders |
| **tb_skill/TRADING.md** | Buy/Sell logic & price discovery | Agents |
| **tb_skill/VERIFY.md** | Ecosystem verification & faucet | Agents |
| **tb_skill/PROMO.md** | Marketing asset generation (X, Reddit, TG) | Agents, Marketers |
| **tb_skill/STATS.md** | Builder reputation & trust metrics | Users, Investors |
| **tb_skill/ABI.md** | Contract ABIs for on-chain interactions | Developers |

## Quick Start for Agents

**"Scan this project and suggest a token."**
> 1. Read **PROJECT-SCAN.md** to analyze the directory.
> 2. Use **METADATA.md** to generate name/symbol suggestions.

**"Launch this token on nad.fun."**
> 1. Read **LAUNCH.md** for the 4-step flow.
> 2. Ensure `PRIVATE_KEY` is set in the environment.
> 3. Execute the launch sequence.

**"Create a launch post for Twitter."**
> 1. Read **PROMO.md** for templates.
> 2. Generate content using the token address and project info.

## Installation

```bash
# Clone into your project's skill directory
git clone https://github.com/starrftw/tokenbroker.git .tokenbroker
```

## Configuration

Ensure your environment is set up for Monad:

```bash
NETWORK=testnet # or mainnet
PRIVATE_KEY=0x... # Your wallet private key
# NAD_API_KEY=... # Optional: for higher rate limits
```

## Network Constants

### Testnet
- **RPC**: `https://monad-testnet.drpc.org`
- **Chain ID**: `10143`
- **API**: `https://dev-api.nad.fun`

### Mainnet
- **RPC**: `https://monad-mainnet.drpc.org`
- **Chain ID**: `143`
- **API**: `https://api.nadapp.net`

---
*Built for the agentic future.* 🦞
