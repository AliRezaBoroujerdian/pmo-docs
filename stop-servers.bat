@echo off
echo ============================================================
echo     PMO Documentation System - Stopping Servers
echo ============================================================
echo.

REM Find and kill process on port 5000 (Export Server)
echo [1/2] Stopping Export Server (port 5000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

REM Find and kill process on port 9000 (MkDocs Server)
echo [2/2] Stopping MkDocs Server (port 9000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9000 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ============================================================
echo     All servers stopped!
echo ============================================================
echo.
pause
