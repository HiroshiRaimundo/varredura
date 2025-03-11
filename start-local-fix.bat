@echo off
echo ===================================================
echo Solucionador de Problemas - Ambiente Local
echo ===================================================

echo.
echo [1/6] Verificando Node.js...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js em https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [OK] Node.js encontrado!
)

echo.
echo [2/6] Limpando cache do npm...
call npm cache clean --force
echo [OK] Cache do npm limpo!

echo.
echo [3/6] Removendo node_modules (se existir)...
if exist node_modules (
    rmdir /s /q node_modules
    echo [OK] node_modules removido!
) else (
    echo [OK] node_modules nao existe, pulando...
)

echo.
echo [4/6] Instalando dependencias (pode demorar alguns minutos)...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [AVISO] Ocorreu um erro na instalacao das dependencias.
    echo Tentando novamente com configuracoes alternativas...
    call npm install --legacy-peer-deps --no-optional
)

echo.
echo [5/6] Verificando porta 5173...
netstat -ano | findstr :5173 > nul
if %errorlevel% equ 0 (
    echo [AVISO] A porta 5173 ja esta em uso!
    echo Tentando encerrar o processo...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
        taskkill /f /pid %%a
        echo Processo encerrado: %%a
    )
)

echo.
echo [6/6] Iniciando o servidor de desenvolvimento...
echo.
echo Se o navegador nao abrir automaticamente, acesse:
echo http://localhost:5173
echo.
echo Para encerrar o servidor, pressione Ctrl+C
echo.
echo Iniciando...
start "" http://localhost:5173
call npm run dev

echo.
echo Se o servidor nao iniciar, tente executar manualmente:
echo npm run dev:host
