@echo off
setlocal
cd /d "%~dp0"
echo Starting Sanmarga Geleyara Balaga website...
start "Sanmarga website server" /b python -m http.server 5500
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:5500/index.html"
echo.
echo The website is running at http://127.0.0.1:5500/index.html
echo Keep this window open while viewing the site. Press Ctrl+C to stop it.
pause
