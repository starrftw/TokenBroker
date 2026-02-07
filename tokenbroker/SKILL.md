---
name: tokenbroker
description: Meta-skill for GitHub project analysis and token launch orchestration. Scans repositories and delegates to nadfun for actual token deployment.
metadata:
  tags: monad, nadfun, token, launch, orchestration, github, autonomous
---

# SKILL.md - TokenBroker Skillset

**The meta-skill for AI agent token orchestration.** Analyze GitHub projects, generate metadata, and delegate token launches to specialized skills.

## What is TokenBroker?

TokenBroker is a **meta-skill** that orchestrates the end-to-end token launch workflow for AI agents. Instead of handling all operations directly, TokenBroker:

1. **Analyzes** GitHub projects to identify launch opportunities
2. **Generates** compelling token metadata (names, symbols, descriptions)
3. **Delegates** actual on-chain operations to the `nadfun` skill
4. **Promotes** launches with coordinated marketing campaigns

TokenBroker coordinates; `nadfun` and `monad-development` execute.

## When to Use This Skill

### TokenBroker Handles Locally
- GitHub repository monitoring and analysis
- Project metadata extraction
- Token naming and description generation
- Marketing content creation
- Builder reputation tracking
- Post-launch promotion

### Delegate to nadfun Skill
- Image upload to IPFS
- Metadata upload to IPFS
- Salt mining for vanity addresses
- On-chain token creation
- Trading operations (buy/sell)
- Bonding curve interactions

### Delegate to monad-development Skill
- Smart contract verification
- Contract ABIs and interfaces
- On-chain data queries (beyond nad.fun)
- Wallet management for deployment

## Core Concept

1. **Track**: Agent monitors GitHub repos for significant activity (commits, releases, tags).
2. **Analyze**: TokenBroker extracts project context and generates metadata proposals.
3. **Delegate**: When ready to launch, invoke `nadfun` skill for on-chain execution.
4. **Promote**: Generate marketing content and coordinate post-launch activities.

## Module Structure (tokenbroker/)
- `SKILL.md`: Root configuration and integration guide.
- `GITHUB.md`: Repository monitoring and launch trigger detection.
- `METADATA.md`: Token identity generation and proposal.
- `PROJECT-SCAN.md`: Codebase analysis for context extraction.
- `PROMO.md`: Marketing content generation for launches.
- `STATS.md`: Builder reputation and trust metrics.
- `SETUP.md`: Installation and configuration guide.

## Skill Dependencies

TokenBroker orchestrates but relies on these skills for on-chain execution:

| Skill | Purpose |
| ----- | ------- |
| [`nadfun`](https://nad.fun/skill.md) | Token creation, image/metadata upload, salt mining, bonding curve interactions |
| [`monad-development`](https://gist.github.com/moltilad/31707d0fc206b960f4cbb13ea11954c2) | Contract verification, ABIs, wallet management |

## Quick Start for Agents

1. Read `GITHUB.md` to begin monitoring repositories.
2. Use `PROJECT-SCAN.md` to extract project context.
3. Follow `METADATA.md` to propose token details.
4. **Delegate to nadfun** for actual token creation.
5. Use `PROMO.md` for post-launch marketing.

## Install Wizard Flow

```bash
npx clawhub install tokenbroker
```

The Install Wizard guides you through:

### Step 1: Project Validation
- Scan current directory for project structure
- Validate essential files and dependencies
- No GitHub connection required yet

### Step 2: User Profile Setup
- Auto-configure builder profile via A2A communication
- Set up reputation tracking preferences
- Connect to existing nad.fun identity

### Step 3: GitHub OAuth Integration
- OAuth 2.0 flow for repository monitoring
- Device code fallback for CLI environments
- Personal Access Token (PAT) support

### Step 4: Environment Configuration
- Generate `.env` with required secrets
- Configure network settings (testnet/mainnet)
- Set up nad.fun API credentials

## Configuration

```bash
# Network Settings
NETWORK=testnet # or mainnet

# GitHub Integration
GITHUB_TOKEN=ghp_...

# Builder Profile (auto-configured via A2A)
BUILDER_ID=...
REPUTATION_SCORE=...
```

## Network References

| Network | RPC | Chain ID | API |
|---------|-----|----------|-----|
| Testnet | https://testnet-rpc.monad.xyz | 10143 | https://dev-api.nad.fun |
| Mainnet | https://rpc.monad.xyz | 143 | https://api.nadapp.net |

---

*Built for the agentic future.* 🦞
