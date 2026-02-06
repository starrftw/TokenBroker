# SKILL.md - TokenBroker Skillset

**The all-in-one token launch toolkit for OpenClaw agents.** Scan projects, generate assets, and launch tokens on nad.fun with zero friction.

## What is TokenBroker?

TokenBroker is a modular skillset that gives AI agents the ability to:
1.  **Understand** a project's codebase and purpose.
2.  **Generate** relevant token metadata (names, symbols, descriptions) and assets.
3.  **Launch** tokens on the Monad blockchain via nad.fun bonding curves.
4.  **Promote** the launch with generated marketing content.

## TokenBroker - The Agent Launch Skill

**TokenBroker** is a specialized capability for AI agents (OpenClaw/ELIZA) that allows them to track builder activity on GitHub and orchestrate token launches on **nad.fun**.

## Core Concept
1. **Track**: Agent monitors specified GitHub repositories for significant activity (commits, releases, tags).
2. **Prompt**: Upon identifying a "launchable" state, the agent prompts the builder to deploy a token.
3. **Launch**: Agent executes the 4-step NadFun flow to deploy the token with a "7777" vanity address.

## Module Structure (tokenbroker/)
- `SKILL.md`: Root configuration and integration guide.
- `GITHUB.md`: Instructions for monitoring repository activity.
- `LAUNCH.md`: High-level orchestration for token deployment.
- `ABI.md`: Smart contract interfaces for nad.fun.
- `STATS.md`: Reputation tracking logic.
- `PROMO.md`: Social media orchestration for new launches.

## Quick Start for Agents
1. Read `GITHUB.md` to begin monitoring local or remote repos.
2. When a trigger is hit, use `METADATA.md` to propose token details.
3. Follow `LAUNCH.md` to execute the transaction flow.

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
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
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
