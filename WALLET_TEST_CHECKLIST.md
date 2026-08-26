# Wallet Connection - Test Checklist ✅

## Before Testing

- [ ] MetaMask installed and enabled
  - Download from: https://metamask.io/
  - Or use another blockchain wallet (WalletConnect, etc.)

- [ ] Browser is Chrome, Firefox, Edge, or Safari
  - MetaMask works best with these browsers

- [ ] Server is running
  ```powershell
  cd server
  npm run server
  ```
  Look for: `listening on port 9208`

- [ ] Client is running
  ```powershell
  cd client
  npm run dev
  ```
  Look for: `ready in XXXms`

- [ ] Browser console is open
  ```
  F12 → Console tab
  ```

---

## Testing Steps

### Step 1: Verify Server is Accessible
In browser address bar, visit:
```
http://localhost:9208/signer
```

✅ Expected: You see an Ethereum address displayed
❌ If error: Server not running or port blocked

### Step 2: Open Technical Assessment
In browser address bar, visit:
```
http://localhost:3000
```

✅ Expected: Dark background with "CONNECT WALLET" button
❌ If blank: See SETUP_GUIDE.md troubleshooting

### Step 3: Open DevTools Console
Press: **F12**

Go to: **Console** tab

You should see these logs:
```
[Scene] StartScene created
[Scene] StartScene ready
```

✅ If you see these: Console is working
❌ If you don't: Try refreshing the page (Ctrl+R)

### Step 4: Click "CONNECT WALLET" Button

**Watch the Console**

You should see:
```
[Button] Connect button clicked
[Button] No signer yet, starting wallet connection...
[Wallet] Starting wallet connection...
[Wallet] MetaMask available: true
```

✅ If you see "MetaMask available: true": Good!
❌ If you see "MetaMask available: false": Install MetaMask extension

### Step 5: Web3Modal Should Appear

A dialog showing wallet options should popup:
- MetaMask
- WalletConnect
- Other wallets

✅ Click your wallet (e.g., MetaMask)
❌ If popup doesn't appear: Check browser blocked popups

### Step 6: Wallet Connection Window

MetaMask window will open asking to connect

✅ Click "Next" → "Connect"
❌ If blocked: Allow popups for localhost:3000

### Step 7: Watch Console for Success

You should see:
```
[Wallet] Provider connected: EIP1193Provider
[Wallet] ethers provider created
[Wallet] Signer obtained
[Wallet] Connected wallet address: 0x742d35Cc6634C0532925a3b844Bc0e7c1E5cEe6f
[Button] Signer obtained successfully
```

✅ Great! Wallet connected
❌ If error: Note the exact error message

### Step 8: Button Should Change to "login"

The button text changes from "connect wallet" to "login"

Status text shows: "wallet connected"

✅ Success!
❌ If not: Check console for errors (Step 7)

### Step 9: Click Button Again (Now Shows "login")

The scene will ask you to sign a message

MetaMask will show a signature request popup

✅ Click "Sign"
❌ Click "Cancel" if you want to retry

### Step 10: Watch Console for Authentication

You should see:
```
[Auth] Starting authentication...
[Auth] Got address: 0x742d35Cc6634C0532925a3b844Bc0e7c1E5cEe6f
[Auth] Server host: http://localhost:9208
[Auth] Fetching challenge from server...
[Auth] Got challenge from server
[Auth] Generated typed data
[Auth] Requesting signature from wallet...
[Auth] Signature obtained
[Auth] Authentication successful, switching to CONNECT_SCENE
```

✅ If you see this: **FULL SUCCESS** 🎉

### Step 11: Should Switch to Next Scene

After signing, the scene should change

You should see a "logging in to server..." message

This means authentication worked!

---

## ✅ Complete Success = All These Happen

1. ✅ Click "CONNECT WALLET"
2. ✅ Web3Modal popup appears
3. ✅ Select wallet (MetaMask)
4. ✅ Wallet connection approval
5. ✅ Button changes to "login"
6. ✅ Click "login"
7. ✅ Signature request appears in MetaMask
8. ✅ Sign the message
9. ✅ Scene switches to "logging in to server..."

---

## 🆘 If Something Fails

### At Step 3: Can't see button
**Check:** SETUP_GUIDE.md - Blank Page section

### At Step 4: "MetaMask available: false"
**Check:** MetaMask installed and enabled?
- Open browser extensions
- Make sure MetaMask is enabled
- Refresh page (Ctrl+R)

### At Step 5: Modal doesn't appear
**Check:** Browser popup settings
- Click address bar icon
- Allow popups for localhost:3000
- Try again

### At Step 7: Error in console
**Copy the error** and check against:
- WALLET_DEBUG.md troubleshooting section

### At Step 10: Server error 404
**Check:** Server is running
```powershell
# Terminal
cd server
npm run server

# Should show:
listening on port 9208
```

---

## 📊 Progress Tracking

Track your progress through the steps:

```
Step 1: Server accessible ......... [ ]
Step 2: Game loads ................ [ ]
Step 3: Console shows logs ........ [ ]
Step 4: Button click logged ........ [ ]
Step 5: Modal appears ............. [ ]
Step 6: Wallet popup appears ....... [ ]
Step 7: Console shows wallet addr .. [ ]
Step 8: Button changes to "login" .. [ ]
Step 9: Signature request ......... [ ]
Step 10: Auth logs appear ......... [ ]
Step 11: Scene switches ........... [ ]

ALL COMPLETE: FULL SUCCESS! 🎉
```

---

## 🎯 Key Logs to Watch For

| Log Message | Means |
|-------------|-------|
| `[Button] Connect button clicked` | Button was clicked ✅ |
| `[Wallet] MetaMask available: true` | MetaMask installed ✅ |
| `[Wallet] Connected wallet address:` | Wallet connected ✅ |
| `[Auth] Got challenge from server` | Server responding ✅ |
| `[Auth] Signature obtained` | User signed message ✅ |
| `[Auth] Authentication successful` | ALL DONE ✅ |

If you see all these = **COMPLETE SUCCESS** 🎉

---

## 🔄 If Test Fails

1. **Note the exact error message**
2. **Take a screenshot of console**
3. **Check WALLET_DEBUG.md** for that error
4. **Restart everything:**
   ```powershell
   # Terminal 1: Kill old server
   # (if running)
   
   # Terminal 1: Start fresh server
   cd server
   npm run server
   
   # Terminal 2: Start fresh client  
   cd client
   npm run dev
   
   # Browser: Refresh (Ctrl+R)
   # Try again from Step 1
   ```

---

## 💡 Pro Tips

- 🔍 **Bookmark the console logs** - Makes debugging easier
- 📝 **Note any error messages exactly** - Helps identify issues
- 🔄 **Refresh between attempts** - Clears old state
- 🌐 **Try different browsers** - Chrome works best
- 📱 **Use incognito mode** - If having issues

---

**Ready to test?** 🚀

Start with Step 1 above!
