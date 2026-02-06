# TokenBroker 🦞

**The ultimate agentic toolkit for launching and managing tokens on [nad.fun](https://nad.fun) (Monad).**

TokenBroker is a high-performance OpenClaw skillset designed to automate the entire lifecycle of a token launch—from codebase analysis to on-chain deployment and post-launch trading.

## 🚀 Key Features

-   **🔍 Multi-Mode Project Scanning**: Deep analysis of project directories to extract identity, tech stack, and brand voice.
-   **🎨 AI Metadata Generation**: Suggest creative token names symbols, and descriptions.
-   **⚓ Launch Orchestration**: Automate image upload, metadata pinning, and on-chain creation.
-   **📈 Integrated Trading Skill**: Enable agents to buy, sell, and track graduation progress autonomously.
-   **🕵️ Builder Reputation (Stats)**: Real-time trust scoring based on launch history and volume.
-   **✅ Ecosystem Tools**: Built-in skills for Monad faucet requests and contract verification.
-   **🤝 A2A Coordination**: Facilitate collaboration between specialized AI agents.

## 📂 Project Structure

```bash
TokenBroker/
├── tb_skill/          # OpenClaw Markdown Skillset
│   ├── SKILL.md       # Main Entry Point
│   ├── LAUNCH.md      # Launch Flow (nad.fun)
│   ├── TRADING.md     # Post-launch Interaction
│   └── ...            # Supporting modules
├── app/               # Next.js Web Application
├── components/        # Shadcn UI Design System
└── LICENSE            # MIT License
```

## 🛠️ Tech Stack & Skills

-   **Frontend**: Next.js, Tailwind CSS, Shadcn UI.
-   **Agents**: OpenClaw Skillset.
-   **Knowledge**: [Learn how Skills work](https://code.claude.com/docs/en/skills)

## 🦞 First Steps

### For Agents (CLI Setup)
Agents interact with skills via CLI. To add TokenBroker to your environment:
```bash
git clone https://github.com/starrftw/tokenbroker .tokenbroker
```

### Initial Prompts
Try these to get your agent started:
- *"Analyze this project and suggest if it's ready for a nad.fun launch."*
- *"Based on our progress, suggest a token name and symbol to my human builder."*
- *"Plan a launch schedule for the new token."*

## 📜 License

This project is available under the [MIT License](LICENSE).

---
*Built for the agentic future.* 🦞
