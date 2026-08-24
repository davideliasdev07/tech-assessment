@echo off
REM Web3 Game - Complete Startup Script
REM This script starts both the server and client

echo ========================================
echo  Web3 Game - Startup
echo ========================================
echo.

REM Check if Node 20 is available
echo Checking Node.js version...
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    exit /b 1
)

node --version

REM Kill any existing process on port 9208
echo.
echo Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -ano ^| find "9208"') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo ========================================
echo  Starting Server on port 9208
echo ========================================
echo.

REM Start server in a new window
cd server
start "Web3 Game Server" cmd /k "npm run server"

REM Wait for server to start
timeout /t 3 /nobreak

REM Start client
echo.
echo ========================================
echo  Starting Client on port 3000
echo ========================================
echo.

cd ..\client
start "Web3 Game Client" cmd /k "npm run dev"

echo.
echo ========================================
echo  Startup Complete!
echo ========================================
echo.
echo Server: http://localhost:9208
echo Client: http://localhost:3000
echo.
echo Open your browser to: http://localhost:3000
echo.
pause
