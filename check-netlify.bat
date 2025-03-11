@echo off
echo ===================================================
echo Verificacao de Status do Netlify
echo ===================================================

echo.
echo Verificando se o CLI do Netlify esta instalado...
netlify --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [AVISO] CLI do Netlify nao encontrado.
    echo Para instalar, execute: npm install netlify-cli -g
    echo.
    echo Continuando com verificacoes alternativas...
) else (
    echo [OK] CLI do Netlify encontrado!
    echo.
    echo Obtendo status dos sites...
    netlify sites:list
    echo.
)

echo.
echo Verificando arquivos de configuracao...
echo.

if exist netlify.toml (
    echo [OK] netlify.toml encontrado
) else (
    echo [ERRO] netlify.toml nao encontrado!
)

if exist _redirects (
    echo [OK] _redirects encontrado
) else (
    echo [ERRO] _redirects nao encontrado!
)

if exist _headers (
    echo [OK] _headers encontrado
) else (
    echo [ERRO] _headers nao encontrado!
)

echo.
echo Verificando configuracoes de build...
echo.

if exist package.json (
    echo [OK] package.json encontrado
    echo Verificando scripts de build...
    findstr "build" package.json
    echo.
) else (
    echo [ERRO] package.json nao encontrado!
)

echo.
echo ===================================================
echo Recomendacoes para resolver problemas de deploy:
echo ===================================================
echo.
echo 1. Certifique-se de que os arquivos netlify.toml, _redirects e _headers
echo    estao configurados corretamente.
echo.
echo 2. Verifique se o script de build no package.json esta correto.
echo.
echo 3. Tente fazer um deploy manual usando o CLI do Netlify:
echo    netlify deploy --prod
echo.
echo 4. Verifique os logs de build no painel do Netlify para identificar erros.
echo.
echo 5. Execute o script netlify-rebuild.bat para reconstruir o projeto.
echo.
echo 6. Limpe o cache do navegador ao testar o site apos o deploy.
echo.
pause
