@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo  Offline Code AI - Full Automated Setup
echo ========================================
echo.

echo Step 1: Installing Python dependencies...
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install npm dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo Step 3: Building Frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build frontend
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Starting all services...
echo.

REM Check if Ollama is running
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if errorlevel 1 (
    echo Launching Ollama in a new window...
    echo.
    start "Ollama Server" cmd /k "ollama run deepseek-coder"
    echo Waiting for Ollama to start...
    timeout /t 5 /nobreak
) else (
    echo Ollama is already running
)

echo.
echo Launching FastAPI server in a new window...
start "FastAPI Server" cmd /k "python -m uvicorn api.server:app --reload --host 0.0.0.0 --port 8000"

echo.
echo Waiting for server to start...
timeout /t 3 /nobreak

echo.
echo ========================================
echo  All services started!
echo ========================================
echo.
echo Opening UI in browser...
timeout /t 10 /nobreak
start http://localhost:8000

echo.
echo Application is ready at: http://localhost:8000
echo.
echo To stop everything:
echo   1. Close the Ollama window
echo   2. Close the FastAPI server window
echo.
pause