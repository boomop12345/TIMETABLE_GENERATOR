@echo off
TITLE Timetable Scheduler - Setup & Run
CLS

echo ==========================================
echo    Timetable Scheduler Starter Script
echo ==========================================
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

:: Check for node_modules
if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    call npm install
) else (
    echo [INFO] Dependencies already installed.
)

echo.
echo [OPTIONAL] Would you like to seed the database with test users? (Y/N)
set /p seed="Selection: "
if /i "%seed%"=="Y" (
    echo [INFO] Creating test users...
    node createuser.js
)

echo.
echo [INFO] Starting the server...
echo [INFO] Once the server starts, visit: http://localhost:5000/
echo.
node server.js

pause
