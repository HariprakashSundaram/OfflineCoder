@echo off
REM Frontend build script for Windows

echo.
echo Building frontend...
call npm run build

echo.
echo Build complete!
echo Output: ..\api\static\
echo.
echo To start the server:
echo   python -m uvicorn api.server:app --reload
