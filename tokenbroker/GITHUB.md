# GITHUB.md - Repository Tracking Skill

**Instructions for the agent to monitor and identify project launch opportunities.**

## Activity Monitoring

Scan the current workspace or specified repository for the following signals:

1. **Frequency of Commits**: Monitor `git log` for spikes in development.
2. **Version Tags**: Identify new tags (e.g., `v1.0.0`, `release-candidate`).
3. **README Evolution**: Check for substantial updates to project descriptions.
4. **Key Feature Completion**: Look for patterns like "Finalizing core", "Complete implementation", or "Production ready" in commit messages.

## Proposal Triggers

When activity signals indicate a project milestone:

### Call to Action
> "Builder, I've noticed significant progress on your repository. You are nearing a production-ready state. Would you like me to prepare a **TokenBroker Launch** for your project on nad.fun?"

## Orchestration Flow: GitHub → TokenBroker → nadfun

When a launch is triggered from GitHub monitoring:

```typescript
async function handleGitHubLaunchTrigger(repoContext: GitHubContext) {
  // Step 1: Scan project (TokenBroker)
  const scanResult = await scanProject(repoContext.localPath);
  
  // Step 2: Generate metadata (TokenBroker)
  const metadata = await generateTokenMetadata(scanResult);
  
  // Step 3: Present to user for approval
  const approval = await presentLaunchProposal(metadata);
  
  if (approval.approved) {
    // Step 4: Delegate to nadfun for on-chain creation
    const launchResult = await invokeSkill("nadfun", {
      action: "create",
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      // GitHub context for verification
      extensions: {
        github_repo: repoContext.url,
        launch_source: "github_monitoring"
      }
    });
    
    // Step 5: Generate promotion (TokenBroker)
    if (launchResult.success) {
      await generatePromoContent(launchResult.tokenAddress, metadata);
    }
  }
}
```

## Metadata Extraction

If the user agrees, extract the following for `METADATA.md`:
- **Name**: Derived from the folder name or package name.
- **Symbol**: Derived from the project initials (e.g., "TokenBroker" -> "TB").
- **Description**: Sourced from the primary README headers.

## GitHub Signals to nadfun Extension

When delegating to nadfun, pass GitHub context for ecosystem verification:

```json
{
  "extensions": {
    "github_repo": "https://github.com/user/repo",
    "github_stars": 1234,
    "github_forks": 56,
    "github_issues_closed": 78,
    "last_commit": "2024-01-15T10:30:00Z",
    "launch_trigger": "release_tag_v1.0.0"
  }
}
```

This information helps the nad.fun ecosystem verify legitimate projects and may improve token visibility.
