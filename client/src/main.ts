import './style.css'
import * as Phaser from 'phaser'
import { MainScene } from './scenes/mainScene'
import { StartScene } from './scenes/startScene'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import { ConnectScene } from './scenes/connectScene'
import ClaimScene from './scenes/claimScene'

try {
  new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    pixelArt: true,
    scene: [StartScene, ConnectScene, MainScene, ClaimScene],
    plugins: {
      global: [NineSlicePlugin.DefaultCfg]
    }
  })
} catch (error) {
  console.error('Failed to initialize game:', error)
  document.body.innerHTML = `<h1>Error Loading Game</h1><p>${error instanceof Error ? error.message : String(error)}</p>`
}