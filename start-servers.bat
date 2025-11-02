@echo off
set "PYTHON=C:\Users\ALIREZA\AppData\Local\Programs\Python\Python313\python.exe"
cd /d "%~dp0"
start "MkDocs Server" cmd /k "%PYTHON% -m mkdocs serve -a 127.0.0.1:9000"
timeout /t 2 /nobreak >nul
start "Export Server" cmd /k "%PYTHON% export_server.py"
timeout /t 3 /nobreak >nul
start http://127.0.0.1:9000
