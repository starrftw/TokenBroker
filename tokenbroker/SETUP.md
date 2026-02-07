# SETUP.md - Installation and Configuration

**Setup guide for TokenBroker skill.**

## Quick Install

```bash
npx clawhub install tokenbroker
```

## Install Wizard Flow

### Step 1: Project Validation
- Scan current directory for project structure
- Validate essential files (package.json, .git, etc.)
- No external connections required at this stage

### Step 2: User Profile Setup (A2A Communication)
TokenBroker can auto-configure your builder profile via agent-to-agent communication:

```typescript
// Example: A2A profile sync
await invokeSkill("identity-service", {
  action: "register_builder",
  profile: {
    github_username: "...",
    preferred_token_symbol: "...",
    reputation_enabled: true
  }
});
```

This establishes your reputation track record across launches.

### Step 3: GitHub OAuth Integration

**Option A: Browser-based OAuth**
```bash
# The wizard opens your browser for GitHub authorization
npx clawhub install tokenbroker --github
```

**Option B: Device Code (CLI-only)**
```bash
npx clawhub install tokenbroker --github --device
```

**Option C: Personal Access Token**
```bash
export GITHUB_TOKEN=ghp_your_token_here
npx clawhub install tokenbroker
```

### Step 4: Environment Configuration

The wizard creates a `.env` file with:

```bash
# Network
NETWORK=testnet

# GitHub (set during OAuth)
GITHUB_TOKEN=ghp_...

# Builder Profile (A2A auto-config)
BUILDER_ID=...
REPUTATION_SCORE=...

# Optional: Nad.fun API key for higher rate limits
NAD_API_KEY=...
```

## Manual Setup

If you prefer manual configuration:

1. Create `.env` file:
```bash
NETWORK=testnet
GITHUB_TOKEN=ghp_your_token_here
```

2. Verify GitHub access:
```bash
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

3. Test project scanning:
```bash
npx tokenbroker scan ./my-project
```

## Requirements

- Node.js 18+ or Python 3.8+
- Git installed and configured
- GitHub account (for repository monitoring)
- Wallet with MON for testnet/mainnet operations

## Post-Setup

After installation, TokenBroker will:
1. Scan your project for launch readiness
2. Analyze codebase for token potential
3. Suggest metadata proposals
4. Wait for GitHub activity triggers
