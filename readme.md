# technical-assessment
A trust-minimised implementation of a multiplayer online game on-chain.

## Motivation
Video games are supposed to be **fun** and **challenging**, not mindless, boring staking disguised as _"gameplay"_.

Here, I aim to design a _trust-minimized_ crypto game implementation that can support both single and live multiplayer gameplay. It utilises the blockchain to build the player progression/rewards system and act as the game's decentralised, immutable database layer.

## Requirements

- **Node.js**: v20.0.0 or higher (tested with v20, v24, and v26+)
- **npm**: v10.0.0 or higher (v11+ recommended for Node 26)
- **Git**: For cloning the repository

## Installation & Running

### Step 1: Clone and Install (ONE-STEP)
```bash
git clone https://github.com/davideliasdev05/technical-assessment.git
cd technical-assessment
npm install
```

This command automatically:
- Installs root dependencies
- Installs server dependencies (including devDependencies)
- Installs client dependencies

### Step 2: Start the Game (Open 2 terminals)

**Terminal 1** - Start multiplayer game server (port 9208)
```bash
npm run server
```

**Terminal 2** - Start client development server (port 3000)
```bash
npm run client
```

### Access the Game
Open your browser and navigate to: **http://localhost:3000**

### Note: Smart Contracts
This project uses smart contracts for reward distribution. You can either:
- Use pre-deployed contracts on a testnet or mainnet
- Deploy your own contracts separately using Solidity tools like Foundry or Hardhat

### Troubleshooting

**"nodemon: not found" error**
- This is usually fixed by reinstalling server dependencies:
```bash
npm run install-server
```

**Port already in use (e.g., port 9208)**
- Kill existing Node processes:
  - Windows: `Get-Process node | Stop-Process`
  - Mac/Linux: `killall node`

**Canvas compilation issues on Node 24**
- Canvas is optional. If it fails to install, you can safely ignore it - the server will still work.
## Technology Stack

This implementation is targeted for the web and was built entirely using HTML and javascript (and solidity for smart contracts). However, it can be easily ported for mobile and desktop using [Capacitor](https://capacitorjs.com) and [Electron](https://electronjs.org).

### Core Frameworks & Libraries
- **[PhaserJS](https://phaser.io)** (v4.2.1) - 2D Javascript game engine for client
- **[Geckos.io](https://geckos.github.io)** (v3.1.0) - Real-time client/server communication using WebRTC and NodeJS
- **[Express.js](https://expressjs.com)** (v4.19.2) - Web server framework for backend
- **[Ethers.js](https://docs.ethers.org/)** (v6.13.0) - Ethereum blockchain interaction library
- **[Trustus](https://github.com/ZeframLou/trustus)** - Trust-minimized way to access offchain data onchain

### Development Tools
- **[Nodemon](https://nodemon.io)** (v3.1.14) - Auto-reload server during development
- **[Vite](https://vitejs.dev)** - Fast frontend build tool and dev server

### Node.js Compatibility
✅ **Node.js 20+** (tested and verified with Node v20 and v24)

## Implementation
In this specific example, the goal is to collect the coin at the end of the room. However, this can be anything you want, e.g, collecting resources, beating a dungeon, or even defeating another player in PvP. Upon achieving the goal, the player will be able to call a smart contract and claim their rewards. Sounds simple enough? not really.

### Challenges and Solutions
How do you prevent players from cheating/hacking? Solution: we run the entire gameplay logic/engine on an authoritative server. This means that the client's role is to only send inputs to it. The server then processes those inputs through the game engine and sends back the client's updated state in return for the client to render. This guarantees the impossibility of cheating/hacking.

![authoritative server](readme/authoritative%20server.png)

Running an authoritative server presents another challenge: latency. Processing everything on the server means deteriorated player experience as there will be some latency between the client and the server. Fortunately, [Geckos.io](https://geckos.github.io) provides a very neat package to solve our problem using something called snapshot interpolation. The author [Yannick](https://github.com/yandeu) explains it in an easy to understand video [here](https://www.youtube.com/watch?v=-9ix6JxpqGo)

Next, what's stopping the players to just call the smart contract and claim the rewards? This is where [Trustus](https://github.com/ZeframLou/trustus) comes in. Using an authoritative server enables us to control players' reward distribution based on trigger events. In this case, collecting the coin.

Once the server determines that the player has successfully collected the coin, an event will be triggered. During this event, the server will sign a message and send it to the player. The player can then use that message as input to call the game's smart contract. The smart contract can then verify that the message came from the server and process the payload to accordingly increase the player's progression on-chain or reward them with tokens/NFTs.

## Final thoughts

Although this approach may not seem to be the most trustless, decentralised solution to building crypto games since we rely on a centralised game server to handle the game engine, in my opinion, I think that's rarely an issue. Not everything needs to be on-chain. Having your players' progression and items stored there is more than enough. This even provides you an advantage in the form of flexibility, upgradability, control and most importantly, being able to build fun and engaging games for your players. Thank you for reading <3