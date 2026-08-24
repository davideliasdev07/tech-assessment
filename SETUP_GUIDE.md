# Web3 Game - Complete Setup & Startup Guide

## 📋 System Requirements

- **Node.js**: 20.x LTS (Required for canvas native module compatibility)
- **npm**: 10.8.0 or higher (Required for git dependency support)
- **Git**: For cloning repositories
- **Browser**: Modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)

---

## 🚀 Quick Start

### Option 1: Automatic Startup (Recommended)

**PowerShell:**
```powershell
# Navigate to project root and run:
.\START_PROJECT.ps1
```

**Command Prompt:**
```cmd
START_PROJECT.bat
```

This will automatically:
- Start the server on port 9208
- Start the client on port 3000
- Open both in separate terminal windows
- Clean up any old processes

### Option 2: Manual Startup

**Terminal 1 - Start Server:**
```powershell
cd server
npm run server
```

Expected output:
```
[nodemon] starting `node server.js`
trusted address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
listening on port 9208
```

**Terminal 2 - Start Client:**
```powershell
cd client
npm run dev
```

Expected output:
```
vite v2.9.18 dev server running at:
> Local: http://localhost:3000/
ready in 734ms.
```

Then open: **http://localhost:3000** in your browser

---

## 🔧 Initial Setup (One-time)

### 1. Install Node 20 LTS
Download from [nodejs.org](https://nodejs.org/)
- Choose the 20.x LTS version
- Install globally

### 2. Downgrade npm to 10.8.0
```powershell
npm install -g npm@10.8.0
```

### 3. Install Dependencies

**Server:**
```powershell
cd server
npm install
```

**Client:**
```powershell
cd client
npm install
```

### 4. Verify Setup
```powershell
node --version    # Should be v20.x.x
npm --version     # Should be 10.8.0+
```

---

## 📱 Using the Application

1. Open **http://localhost:3000** in your browser
2. You should see a "Connect Wallet" button on a dark background
3. Click "Connect Wallet" to authenticate
4. Select your Web3 wallet provider (MetaMask, WalletConnect, etc.)
5. Sign the authentication message
6. You'll be logged in and connected to the game server

---

## ✅ Fixes Applied

### Issue 1: Port 9208 Already in Use
**Solution**: Added process cleanup in startup scripts
```powershell
# Kill existing process:
netstat -ano | Select-String "9208"
Stop-Process -Id <PID> -Force
```

### Issue 2: Blank Client Dashboard
**Solutions**:
- Added error handling to main.ts with try-catch
- Added loading state message to index.html
- Updated HTML with proper styling and fallback display

### Issue 3: Incorrect Server URL
**Solutions**:
- Fixed StartScene to use `http://localhost:9208` instead of `http://localhost`
- Fixed ConnectScene to use port 9208 for geckos WebRTC connection
- Added environment variable support for custom server URL

### Issue 4: Phaser Import Errors
**Solutions**:
- Changed all Phaser imports from default to named imports:
  ```typescript
  // Before (incorrect):
  import Phaser from 'phaser'
  
  // After (correct):
  import * as Phaser from 'phaser'
  ```
- Applied to: main.ts, mainScene.ts, claimScene.ts, startScene.ts

### Issue 5: Node 24 Canvas Incompatibility
**Solution**: Use Node 20 LTS which has full canvas support
- Downloaded Node 20.14.0 pre-built binaries
- Rebuilt all native modules with Node 20
- Updated startup scripts to use Node 20 path

---

## 🌍 Environment Variables

Create a `.env` file in the `client` directory for custom configuration:

```env
VITE_HOST=localhost
VITE_SERVER_PORT=9208
```

Or set as environment variables before running:
```powershell
$env:VITE_HOST = "localhost"
$env:VITE_SERVER_PORT = "9208"
npm run dev
```

---

## 🔍 Troubleshooting

### Issue: "Port 9208 already in use"
```powershell
# Find and kill the process:
netstat -ano | Select-String "9208"
Stop-Process -Id <PID> -Force

# Or use the startup script which does this automatically
```

### Issue: "Cannot find module 'canvas'"
- Ensure you're using Node 20 LTS, not Node 24
- Run: `npm rebuild` in the server directory

### Issue: "Blank white page on localhost:3000"
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab to see if files are loading
4. Make sure server is running on port 9208

### Issue: "geckos connection failed"
- Verify server is running: `http://localhost:9208/signer`
- Check browser console for connection errors
- Ensure both client and server are on the same network (or localhost)

### Issue: "ethers or Web3Modal errors"
- Clear node_modules and reinstall:
  ```powershell
  rm -r node_modules -Force
  npm install
  ```

---

## 📂 Project Structure

```
web3-game/
├── server/                      # Game server (Node.js + Phaser)
│   ├── game/
│   │   ├── config.js           # Phaser game config
│   │   └── scenes/
│   │       └── dungeonScene.js # Server-side game scene
│   ├── package.json
│   └── server.js               # Express + WebSocket server
│
├── client/                      # Game client (React + Vite)
│   ├── src/
│   │   ├── scenes/            # Phaser scenes
│   │   │   ├── startScene.ts  # Wallet connection
│   │   │   ├── connectScene.ts # Server connection
│   │   │   ├── mainScene.ts   # Game UI
│   │   │   └── claimScene.ts  # Claim rewards
│   │   ├── main.ts            # Entry point
│   │   ├── style.css          # Global styles
│   │   └── utils/
│   ├── public/                # Static assets
│   │   ├── fonts/
│   │   ├── ui/
│   │   └── spritesheets/
│   ├── package.json
│   ├── vite.config.js         # Vite configuration
│   └── tsconfig.json
│
├── commons/                    # Shared code
│   ├── auth.mjs               # Authentication helpers
│   └── contracts.mjs          # Contract addresses
│
└── contracts/                 # Smart contracts (if applicable)
```

---

## 🔐 Security Notes

- The server uses a hardcoded test wallet in development mode
- Only use test networks (localhost, Goerli, Sepolia) for testing
- Never commit private keys or sensitive data
- The default test wallet: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

---

## 📚 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Server | Node.js | 20.x LTS |
| Server Framework | Express | Latest |
| Game Engine | Phaser | 3.x |
| Real-time Comms | geckos.io | 2.x |
| Client Framework | Vite | 2.x |
| Blockchain | ethers.js | 5.x |
| Wallet | Web3Modal | 1.x |
| Type Checking | TypeScript | 4.x |

---

## 💡 Development Tips

1. **Hot Module Reload**: Client changes auto-refresh in browser
2. **Server Auto-Restart**: Server restarts automatically on file changes (nodemon)
3. **Debug Mode**: Open DevTools in browser (F12) for client debugging
4. **Network Tab**: Monitor WebRTC connection and HTTP requests
5. **Console Logs**: Check both browser console and server terminal for logs

---

## 📞 Common Commands

```powershell
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check Node version
node --version

# Install specific npm version
npm install -g npm@10.8.0

# Clear npm cache
npm cache clean --force

# Rebuild native modules
npm rebuild
```

---

## ✨ Next Steps

After successful startup:
1. Connect your Web3 wallet
2. Authenticate with your wallet signature
3. Connect to the game server
4. Explore the game UI

Enjoy your Web3 game! 🎮
