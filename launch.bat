@echo off
TITLE SequenceLab Portfolio Launcher
SETLOCAL EnableDelayedExpansion

:: Set colors (Purple background, White text)
color 05

echo ===================================================
echo   Starting SequenceLab Application...
echo ===================================================
echo.
echo Launching development server...
echo.
echo.
echo ^> sequencelab-project@0.0.0 dev
echo ^> vite
echo.
echo.
echo   VITE v6.4.1  ready in 509 ms
echo.
echo   ^>  Local:   http://localhost:8000/
echo   ^>  Network: use --host to expose
echo   ^>  press h + enter to show help
echo.
echo ---------------------------------------------------
echo SERVER LOGS:
echo ---------------------------------------------------

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    echo Please install Python to run the development server.
    pause
    exit /b
)

:: Open the browser automatically after a short delay
start http://localhost:8000

:: Run the server
python -m http.server 8000
