import * as Phaser from 'phaser'
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import generateTypedAuth from "../../../commons/auth.mjs"
import { BTN_GREY, CONNECT_SCENE, SIGNER, UPHEAVAL } from "../utils/keys"

const connectWallet = async () => {
    console.log('[Wallet] Starting wallet connection...')

    try {
        // Check if MetaMask is installed
        const hasMetaMask = typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined'
        console.log('[Wallet] MetaMask available:', hasMetaMask)

        const providerOptions: any = {}

        // Add MetaMask if available
        if (hasMetaMask) {
            providerOptions.injected = {
                display: {
                    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAA",
                    name: "MetaMask",
                    description: "Connect with MetaMask browser extension"
                }
            }
        }

        // Add WalletConnect
        providerOptions.walletconnect = {
            package: WalletConnectProvider,
            options: {
                infuraId: "0e7fcc143f894d179aa51dbdc44d8ac5"
            }
        }

        console.log('[Wallet] Provider options configured:', Object.keys(providerOptions))

        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions,
            theme: "dark"
        })

        console.log('[Wallet] Web3Modal created, showing provider selection...')
        web3Modal.clearCachedProvider()

        // Connect to provider
        const instance = await web3Modal.connect()
        console.log('[Wallet] Provider connected:', instance.constructor.name)

        // Create ethers provider
        const provider = new ethers.providers.Web3Provider(instance)
        console.log('[Wallet] ethers provider created')

        // Get signer
        const signer = provider.getSigner()
        console.log('[Wallet] Signer obtained')

        // Get address to verify connection
        const address = await signer.getAddress()
        console.log('[Wallet] Connected wallet address:', address)

        return signer
    } catch (error: any) {
        console.error('[Wallet] Connection error:', error.message || error)
        throw error
    }
}

export class StartScene extends Phaser.Scene {
    button?: Phaser.GameObjects.RenderTexture
    text?: Phaser.GameObjects.BitmapText
    statusText?: Phaser.GameObjects.BitmapText
    container?: Phaser.GameObjects.Container
    signer?: ethers.providers.JsonRpcSigner
    isConnecting = false

    constructor() {
        super({
            key: 'start-scene'
        })
    }

    preload() {
        this.load.bitmapFont(UPHEAVAL, '/fonts/upheaval.png', '/fonts/upheaval.xml')
        this.load.image(BTN_GREY, '/ui/btn-grey.png')
    }

    create() {
        console.log('[Scene] StartScene created')

        //remove loading message
        const loading = document.getElementById('loading')
        if (loading) loading.style.display = 'none'

        //set bg color
        this.cameras.main.setBackgroundColor('0x171717')

        //get screen height and width
        const { width, height } = this.scale

        //add button components
        this.button = this.add.nineslice(0, 0, 100, 18, BTN_GREY, 3, 3, 3, 3)
            .setOrigin(0.5, 0.5)
            .setScale(3, 3)
            .setInteractive()

        this.text = this.add.bitmapText(0, 0, UPHEAVAL, 'connect wallet', 32)
            .setOrigin(0.5, 0.5)

        //add status text below button
        this.statusText = this.add.bitmapText(0, 80, UPHEAVAL, '', 16)
            .setOrigin(0.5, 0.5)
            .setTint(0x44fff9)

        this.container = this.add.container(width * 0.5, height * 0.5, [this.button, this.text, this.statusText])

        //add event listeners
        this.scale.on('resize', () => this.resize())

        this.button.on('pointerover', () => {
            if (!this.isConnecting) {
                this.button?.setTint(0x44fff9)
            }
        })

        this.button.on('pointerout', () => {
            if (!this.isConnecting) {
                this.button?.clearTint()
            }
        })

        this.button.on('pointerdown', () => {
            if (!this.isConnecting) {
                this.button?.setTint(0x2aa19d)
            }
        })

        this.button.on('pointerup', async () => {
            this.button?.clearTint()
            await this.handleButtonClick()
        })

        console.log('[Scene] StartScene ready')
    }

    async handleButtonClick() {
        if (this.isConnecting) return

        this.isConnecting = true
        this.button?.disableInteractive()
        this.statusText?.setText('connecting...')

        console.log('[Button] Connect button clicked')

        if (!this.signer) {
            try {
                console.log('[Button] No signer yet, starting wallet connection...')
                this.signer = await connectWallet()

                if (this.signer) {
                    console.log('[Button] Signer obtained successfully')
                    this.registry.set(SIGNER, this.signer)
                    this.text?.setText('login')
                    this.statusText?.setText('wallet connected')

                    // Auto-proceed to login after short delay
                    this.time.delayedCall(500, () => {
                        this.authenticate()
                    })
                } else {
                    throw new Error('No provider returned from Web3Modal')
                }
            } catch (error: any) {
                console.error('[Button] Wallet connection failed:', error)
                this.statusText?.setText('connection failed')
                this.statusText?.setTint(0xff6b6b)
                this.isConnecting = false
                this.button?.setInteractive()

                // Show error in alert
                const errorMsg = error?.message || 'Failed to connect wallet'
                alert(`Wallet Connection Error:\n\n${errorMsg}\n\nMake sure you have MetaMask or another Web3 wallet installed.`)
            }
        } else {
            // Already have signer, proceed to authenticate
            console.log('[Button] Signer exists, proceeding to authenticate')
            this.statusText?.setText('authenticating...')
            try {
                await this.authenticate()
            } catch (error) {
                console.error('[Button] Authentication failed:', error)
                this.statusText?.setText('authentication failed')
                this.statusText?.setTint(0xff6b6b)
                this.isConnecting = false
                this.button?.setInteractive()
            }
        }
    }

    resize() {
        //recenter on resize
        const { width, height } = this.scale
        this.container?.setPosition(width * 0.5, height * 0.5)
    }

    async authenticate() {
        try {
            console.log('[Auth] Starting authentication...')

            const address = await this.signer?.getAddress()
            console.log('[Auth] Got address:', address)

            const host = import.meta.env.VITE_HOST ? import.meta.env.VITE_HOST : "http://localhost:9208"
            console.log('[Auth] Server host:', host)

            //get challenge from server
            console.log('[Auth] Fetching challenge from server...')
            const res = await fetch(host + "/challenge", {
                method: "POST",
                body: address,
            })

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`)
            }

            const challenge = await res.text()
            console.log('[Auth] Got challenge from server')

            const { domain, types, value } = generateTypedAuth(challenge)
            console.log('[Auth] Generated typed data')

            //generate signature
            console.log('[Auth] Requesting signature from wallet...')
            const sig = await this.signer?._signTypedData(domain, types, value)
            console.log('[Auth] Signature obtained')

            console.log('[Auth] Authentication successful, switching to CONNECT_SCENE')
            this.scene.start(CONNECT_SCENE, { sig, address })
        } catch (error: any) {
            console.error('[Auth] Authentication error:', error)
            throw error
        }
    }
}