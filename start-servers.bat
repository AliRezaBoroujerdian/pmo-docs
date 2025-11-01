@echo off
echo ============================================================
echo     PMO Documentation System - Starting Servers
echo ============================================================
echo.

REM Start MkDocs Server in new window
echo [1/2] Starting MkDocs Server on port 9000...
start "MkDocs Server" cmd /k "cd /d %~dp0 && mkdocs serve -a 127.0.0.1:9000"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start Export Server in new window
echo [2/2] Starting Export Server on port 5000...
start "Export Server" cmd /k "cd /d %~dp0 && C:\Users\ALIREZA\AppData\Local\Programs\Python\Python313\python.exe export_server.py"

echo.
echo ============================================================
echo     Servers are starting...
echo ============================================================
echo.
echo MkDocs Server:  http://127.0.0.1:9000
echo Export Server:  http://127.0.0.1:5000
echo.
echo Two windows will open. Keep them running!
echo Close this window after servers start successfully.
echo.
pause
