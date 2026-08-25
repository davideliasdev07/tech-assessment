# Complete Game Flow Guide

## 📋 Game Overview

Based on the README and demo.gif, here's what the game should do:

### Game Goal
**Collect a coin at the end of a dungeon room to earn rewards**

### Complete Flow

```
1. Wallet Connection (StartScene)
   ↓
2. Server Authentication (ConnectScene)
   ↓
3. Dungeon Gameplay (MainScene)
   - Navigate the dungeon room
   - Move knight character with arrow keys or WASD
   - Reach and collect the coin
   ↓
4. Server Verification
   - Server signs reward packet
   ↓
5. Claim Rewards (ClaimScene)
   - Click "claim nft" button
   - Sign smart contract transaction
   - Receive NFT reward
   ↓
GAME COMPLETE! 🎉
```

---

## 🎮 What Each Scene Does

### Scene 1: StartScene (Wallet Connection)
**File:** `client/src/scenes/startScene.ts`

**What happens:**
- Shows "CONNECT WALLET" button
- User clicks to connect MetaMask or other wallet
- Web3Modal popup appears
- User selects wallet and approves connection
- Button changes to "login"
- User clicks "login" to authenticate

**Expected output:**
```
✅ Button shows "CONNECT WALLET"
✅ Clicking opens Web3Modal
✅ Can select MetaMask/wallet
✅ Button changes to "login"
✅ Can click "login"
```

### Scene 2: ConnectScene (Server Connection)
**File:** `client/src/scenes/connectScene.ts`

**What happens:**
- Shows "logging in to server..." message
- Connects to game server via WebRTC (geckos.io)
- Server verifies authentication signature
- Waits for "ready" signal from server
- Shows "connected!"
- Automatically switches to MainScene

**Expected output:**
```
✅ Message shows "logging in to server..."
✅ Console shows geckos connection logs
✅ After ~2 seconds, shows "connected!"
✅ Scene switches to MainScene
```

### Scene 3: MainScene (Gameplay)
**File:** `client/src/scenes/mainScene.ts`

**What happens:**
- Loads dungeon tilemap
- Spawns player character (knight) at starting position
- Spawns coin at end of dungeon
- Player can move with arrow keys or WASD
- Camera follows player
- Collecting coin triggers reward claim

**Controls:**
- **Arrow Keys** or **WASD** - Move character
- Move to the coin (at end of room)
- Coin will be collected automatically

**Expected output:**
```
✅ Dark background with dungeon tilemap
✅ Player character (knight) visible
✅ Coin spinning at end of room
✅ Can move with arrow keys/WASD
✅ Camera follows player
✅ Walls block player movement
✅ Reaching coin collects it
```

### Scene 4: ClaimScene (Claim Rewards)
**File:** `client/src/scenes/claimScene.ts`

**What happens:**
- Shows "claim nft" button (waiting for server signature)
- Server sends signed reward packet
- Button text changes to "claim nft"
- User clicks button to claim
- MetaMask signature request appears
- Transaction is sent to smart contract
- Player receives NFT reward
- Shows "claimed!"

**Expected output:**
```
✅ Shows "waiting for server..." initially
✅ Server sends signature
✅ Button text changes to "claim nft"
✅ Clicking shows MetaMask signature request
✅ After signing, shows "claimed!"
```

---

## 🚀 Complete Testing Walkthrough

### Prerequisites
- [ ] MetaMask installed and enabled
- [ ] Server running on port 9208
- [ ] Client running on port 3000
- [ ] DevTools console open (F12)

### Step-by-Step Test

#### Step 1: Start Services
**Terminal 1:**
```powershell
cd server
npm run server
```
Look for: `listening on port 9208`

**Terminal 2:**
```powershell
cd client
npm run dev
```
Look for: `ready in XXXms`

#### Step 2: Open Browser
```
http://localhost:3000
```

#### Step 3: Connect Wallet
1. **Click "CONNECT WALLET"**
   - Console shows: `[Button] Connect button clicked`
   - Blockchain Modal appears

2. **Click MetaMask** in Web3Modal
   - MetaMask extension opens

3. **Approve connection**
   - Click "Next"
   - Click "Connect"
   - Console shows: `[Wallet] Connected wallet address: 0x...`

4. **Button changes to "login"**
   - Status shows: "wallet connected"

5. **Click "login"**
   - MetaMask signature request appears
   - Console shows: `[Auth] Requesting signature...`

6. **Sign the message**
   - Click "Sign" in MetaMask
   - Console shows: `[Auth] Authentication successful`

#### Step 4: Play Dungeon
1. **ConnectScene displays**
   - Shows "logging in to server..."
   - ~2 seconds later shows "connected!"

2. **MainScene loads**
   - You see a dungeon with a knight character
   - A spinning coin is visible (end of dungeon)
   - Dark background

3. **Move character**
   - Press **UP arrow** or **W** - Move up
   - Press **DOWN arrow** or **S** - Move down
   - Press **LEFT arrow** or **A** - Move left
   - Press **RIGHT arrow** or **D** - Move right
   - Walls will block you

4. **Reach the coin**
   - Navigate through the dungeon
   - Approach the spinning coin
   - Character will automatically collect it when you touch it

5. **Coin collected!**
   - The game fades
   - ClaimScene appears semi-transparent behind

#### Step 5: Claim Reward
1. **ClaimScene shows**
   - Shows "waiting for server..." initially
   - Coin collection triggers server to sign reward

2. **Button changes to "claim nft"**
   - Server sends signature
   - Text changes from "waiting..." to "claim nft"

3. **Click "claim nft"**
   - MetaMask signature request appears
   - Shows claim transaction details

4. **Sign and send**
   - Click "Sign" in MetaMask
   - Transaction sends to smart contract
   - Console shows transaction hash

5. **Success!**
   - Button text changes to "claimed!"
   - You have earned an NFT reward! 🎉

---

## 📊 Console Logs to Watch

### StartScene → ConnectScene → MainScene
```
[Scene] StartScene created
[Scene] StartScene ready
[Button] Connect button clicked
[Wallet] MetaMask available: true
[Wallet] Connected wallet address: 0x742d35Cc...
[Auth] Signature obtained
[Auth] Authentication successful, switching to CONNECT_SCENE
```

### ConnectScene → MainScene
```
[geckos] connecting to localhost:9208
[geckos] connected
```

### MainScene (During gameplay)
```
(Player movement is being sent to server)
(Server sending position updates)
(Camera following player)
```

### MainScene → ClaimScene (After collecting coin)
```
[Coin collected!]
(Server signs reward packet)
[Signature received]
[ClaimScene launched]
```

### ClaimScene (Claiming reward)
```
[Button clicked - claiming...]
(MetaMask signature request)
[Transaction sent: 0x...]
[Transaction confirmed]
[Claimed!]
```

---

## ✅ Success Checklist

After completing the full flow, check these:

```
Wallet Connection
  ✅ Can connect MetaMask
  ✅ Can sign authentication message
  ✅ Button changes to "login"
  ✅ Can proceed to server connection

Server Connection
  ✅ Connects to game server
  ✅ Shows "connected!" message
  ✅ Switches to MainScene

Gameplay
  ✅ Can see dungeon tilemap
  ✅ Can see player character (knight)
  ✅ Can see coin at end
  ✅ Can move with arrow keys
  ✅ Can move with WASD
  ✅ Camera follows player
  ✅ Walls block movement
  ✅ Coin is at position (240, 70)
  ✅ Player starts at (240, 260)

Coin Collection
  ✅ Moving to coin collects it
  ✅ Scene fades when coin collected
  ✅ ClaimScene launches

Reward Claiming
  ✅ "Waiting for server..." shows initially
  ✅ Button text changes to "claim nft"
  ✅ Can click button
  ✅ MetaMask signature request appears
  ✅ Can sign transaction
  ✅ Shows "claimed!" when complete

TOTAL: FULL GAME WORKING ✅
```

---

## 🐛 Troubleshooting

### Problem: Can't see dungeon/character
**Check:**
- Assets are loading: Check browser Network tab (F12)
- Tilemap file exists: `/public/tilemap/tilemap.json`
- Spritesheet exists: `/public/spritesheets/knight.png`

**Solution:**
- Refresh page (Ctrl+R)
- Check server logs for errors
- Verify asset files exist

### Problem: Can't move character
**Check:**
- Keyboard is focused on browser window
- Arrow keys or WASD are being pressed

**Solution:**
- Click on game canvas first
- Try both arrow keys and WASD
- Check console for errors

### Problem: Coin doesn't collect
**Check:**
- Console shows no overlap detection errors
- Player is touching coin
- Coin coordinates match (240, 70)

**Solution:**
- Move slowly toward coin
- Make sure you're overlapping it completely
- Check server logs

### Problem: Can't claim reward
**Check:**
- Server signature was received
- Button text changed to "claim nft"
- MetaMask is connected to correct network

**Solution:**
- Wait a moment for server to send signature
- Ensure MetaMask is unlocked
- Check you haven't already claimed

---

## 🎯 Game Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Coin Position | (240, 70) | End of dungeon |
| Player Start | (240, 260) | Bottom of dungeon |
| Player Speed | 80 px/frame | Movement speed |
| Camera Zoom | 3x | Pixel-perfect appearance |
| Server Host | localhost | WebRTC host |
| Server Port | 9208 | WebRTC port |
| Network Update Rate | 30 fps (half of server) | Smooth sync |

---

## 🎓 Key Concepts

### Client Prediction
The client predicts movement immediately while waiting for server to verify

### Server Reconciliation
The server's truth is used to correct any deviations in client position

### Snapshot Interpolation
Smooth animation between server state updates using geckos.io library

### Authoritative Server
Server handles all game logic - client just sends inputs and renders results

### Signature-based Rewards
Server signs reward when player completes goal - prevents cheating

---

## 📞 If Full Game Doesn't Work

1. **Test wallet connection first** - See WALLET_TEST_CHECKLIST.md
2. **Test server connection** - Check server logs for errors
3. **Test gameplay separately** - Try moving without server
4. **Check asset loading** - Use DevTools Network tab
5. **Check console for errors** - F12 → Console tab

---

## 🚀 Ready to Play?

Run this and follow the walkthrough above:

```powershell
# Terminal 1
cd server
npm run server

# Terminal 2
cd client
npm run dev

# Browser
http://localhost:3000
```

Then enjoy your Blockchain game! 🎮🎉
