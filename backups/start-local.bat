@echo off
echo ===================================================
echo Iniciando o ambiente de desenvolvimento local
echo ===================================================

echo.
echo 1. Instalando dependencias (pode demorar um pouco)...
call npm install --legacy-peer-deps

echo.
echo 2. Iniciando o servidor de desenvolvimento...
start "" http://localhost:5173
call npm run dev

echo.
echo Se o navegador nao abrir automaticamente, acesse:
echo http://localhost:5173
