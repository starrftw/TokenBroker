# LAUNCH.md - Token Launch Orchestration

**The complete guide to launching a token on nad.fun.**

This skill orchestrates the 4-step process required to deploy a bonding curve token on Monad via nad.fun.

## Prerequisites

- **Wallet**: A `privateKey` with at least 10 MON (for deployment fees).
- **Network**: Monad Testnet or Mainnet (see **SKILL.md** for interaction details).
- **Assets**: A token image (buffer) and metadata (JSON).

## The 4-Step Flow

### Step 1: Upload Image via API

Upload the raw image buffer to receive an IPFS URI.

```typescript
// POST /agent/token/image
const imageRes = await fetch(`${CONFIG.apiUrl}/agent/token/image`, {
  method: "POST",
  headers: { "Content-Type": "image/png" },
  body: imageBuffer // Raw Buffer, NOT FormData
});
const { image_uri, is_nsfw } = await imageRes.json();
```

### Step 2: Upload Metadata via API

Combine the `image_uri` with other details to get the final `metadata_uri`.

```typescript
// POST /agent/token/metadata
const metaRes = await fetch(`${CONFIG.apiUrl}/agent/token/metadata`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "My Token",
    symbol: "MTK",
    description: "...",
    image_uri: image_uri,
    // ...social links
  })
});
const { metadata_uri } = await metaRes.json();
```

### Step 3: Mine Salt for Vanity Address

Generate a salt to determine the future contract address.

```typescript
// POST /agent/salt
const saltRes = await fetch(`${CONFIG.apiUrl}/agent/salt`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    creator: account.address,
    name: "My Token",
    symbol: "MTK",
    metadata_uri: metadata_uri
  })
});
const { salt, address } = await saltRes.json();
// 'address' is the PREDICTED address where the token will live.
```

### Step 4: Create On-Chain

Call the `BondingCurveRouter` contract to finalize deployment.

```typescript
import { bondingCurveRouterAbi } from './abis'; // See ABI.md

// 1. Get Fee
const feeConfig = await publicClient.readContract({
  address: CONFIG.CURVE,
  abi: curveAbi,
  functionName: "feeConfig"
});
const deployFee = feeConfig[0];

// 2. Prepare Args
// actionId is ALWAYS 1 for creation
const args = {
  name: "My Token",
  symbol: "MTK",
  tokenURI: metadata_uri,
  amountOut: 0n, // Initial buy amount (optional)
  salt: salt,
  actionId: 1 
};

// 3. Send Transaction
const hash = await walletClient.writeContract({
  address: CONFIG.BONDING_CURVE_ROUTER,
  abi: bondingCurveRouterAbi,
  functionName: "create",
  args: [args],
  value: deployFee, // + initial buy value if any
  gas: 5000000n // Recommended buffer
});
```

## Post-Launch

Once the transaction confirms:
1.  **Verify**: Check the predicted address on the explorer.
2.  **Promote**: Go to **PROMO.md** to generate marketing materials with the new CA (Contract Address).

## Troubleshooting

- **400 Bad Request**: Check if `name`/`symbol` in Step 3 match Step 2 exactly.
- **nsfw_detected**: Image was flagged. Try a different image.
- **execution reverted**: Usually insufficient MON for the deploy fee.
