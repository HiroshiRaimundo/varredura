@echo off
echo ===================================================
echo Reconstrucao Forcada para Netlify
echo ===================================================

echo.
echo [1/5] Limpando cache e arquivos temporarios...
call npm cache clean --force
if exist dist rmdir /s /q dist
echo [OK] Cache e arquivos temporarios limpos!

echo.
echo [2/5] Verificando dependencias...
call npm list rimraf || npm install rimraf --save-dev
echo [OK] Dependencias verificadas!

echo.
echo [3/5] Criando build otimizado...
call npm run build:fresh
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao criar build.
    pause
    exit /b 1
)
echo [OK] Build criado com sucesso!

echo.
echo [4/5] Copiando arquivos de configuracao para a pasta dist...
copy _redirects dist\_redirects
copy _headers dist\_headers
copy netlify.toml dist\netlify.toml
echo [OK] Configuracoes copiadas!

echo.
echo [5/5] Preparando para deploy...
echo.
echo Para fazer o deploy na Netlify, voce pode:
echo 1. Fazer commit e push das alteracoes para o GitHub
echo 2. Usar o CLI da Netlify com 'netlify deploy --prod'
echo.
echo [OK] Tudo pronto para o deploy!

echo.
echo ===================================================
echo Processo concluido com sucesso!
echo ===================================================
echo.
pause
