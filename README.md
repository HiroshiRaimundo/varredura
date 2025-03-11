# Sistema de Monitoramento - Koga

## Visão Geral

Sistema de monitoramento para análise de dados e geração de relatórios. O projeto utiliza React, TypeScript e ShadCN UI para criar uma interface moderna e responsiva.

## Executando o Projeto Localmente

### Método Simples (Recomendado)

Para iniciar o projeto localmente de forma rápida e fácil, execute o arquivo batch incluído:

```sh
# No Windows, basta clicar duas vezes no arquivo ou executar:
start-local.bat
```

Este script irá:
1. Instalar todas as dependências necessárias
2. Iniciar o servidor de desenvolvimento
3. Abrir automaticamente o navegador com o projeto

### Método Manual

Se preferir executar os comandos manualmente:

```sh
# Instalar dependências (use --legacy-peer-deps para evitar conflitos)
npm install --legacy-peer-deps

# Iniciar o servidor de desenvolvimento
npm run dev

# OU para acessar de outros dispositivos na mesma rede
npm run dev:host
```

O projeto estará disponível em:
- Local: http://localhost:5173
- Rede (se usar dev:host): http://seu-ip:5173

## Acesso à Área Administrativa

Para acessar a área administrativa, use:

- **Email**: admin@koga.com
- **Senha**: admin123

## Estrutura do Projeto

- `/src/components` - Componentes reutilizáveis
- `/src/pages` - Páginas da aplicação
- `/src/contexts` - Contextos para gerenciamento de estado
- `/src/hooks` - Hooks personalizados

## Configurações Importantes

- O sistema de monitoramento utiliza o MonitoringContext para gerenciar o estado global
- O localhost é configurado como fonte fixa do sistema
- Os componentes de monitoramento estão localizados em `/src/components/admin/monitoring`

## Solução de Problemas

Se encontrar problemas ao executar o projeto:

1. Verifique se todas as dependências foram instaladas corretamente
2. Tente limpar o cache do npm: `npm cache clean --force`
3. Remova a pasta node_modules e reinstale: `rm -rf node_modules && npm install --legacy-peer-deps`
4. Verifique se está usando a versão correta do Node.js (recomendado: v18+)
