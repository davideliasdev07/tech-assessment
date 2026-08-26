import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const serverProcess = spawn('npm', ['run', 'server'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'inherit',
    windowsHide: true,
    detached: false,
    shell: process.platform === 'win32'
})

process.on('SIGINT', () => {
    serverProcess.kill()
    process.exit()
})

process.on('SIGTERM', () => {
    serverProcess.kill()
    process.exit()
})
