@echo off
echo Delta Tools Vue Website Setup
echo =============================
echo.

echo Installing frontend dependencies...
npm install

echo.
echo Installing backend dependencies...
cd backend
npm install
cd ..

echo.
echo Setup complete!
echo.
echo To start the website:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: npm run dev
echo.
echo Website will be available at: http://localhost:5173
echo Admin panel: http://localhost:5173/admin/login
echo.
pause 