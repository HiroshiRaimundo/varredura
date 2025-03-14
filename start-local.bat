@echo off
echo ===================================================
echo Iniciando Ambiente de Desenvolvimento Local
echo ===================================================

echo.
echo [1/4] Verificando Node.js...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js em https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [OK] Node.js encontrado!
)

echo.
echo [2/4] Instalando dependencias (pode demorar alguns minutos)...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [AVISO] Ocorreu um erro na instalacao das dependencias.
    echo Tentando novamente com configuracoes alternativas...
    call npm install --legacy-peer-deps --no-optional
)

echo.
echo [3/4] Configurando modo offline...
echo Usando dados mockados para desenvolvimento local...

echo.
echo [4/4] Iniciando o servidor de desenvolvimento...
echo.
echo Se o navegador nao abrir automaticamente, acesse:
echo http://localhost:5173
echo.
echo Para encerrar o servidor, pressione Ctrl+C
echo.
echo Iniciando...
start "" http://localhost:5173
call npm run dev
