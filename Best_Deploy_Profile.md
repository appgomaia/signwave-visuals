# Best Deploy Profile - Configurações que Funcionaram

Este documento contém as configurações de deploy que foram testadas e aprovadas para projetos React + Vite + TypeScript.

## Dockerfile Otimizado

### Configurações Principais

```dockerfile
# Multi-stage build para React + Nginx
FROM node:20-slim AS builder

# Definir diretório de trabalho
WORKDIR /app

# Variáveis de ambiente para build
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false

# Copiar arquivos de pacote
COPY package*.json ./

# Limpar cache do npm e instalar dependências
RUN npm cache clean --force
RUN npm ci --include=dev --legacy-peer-deps

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção com Nginx
FROM nginx:1.25-alpine

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar aplicação buildada do estágio builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Adicionar healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
```

## Problemas Resolvidos

### 1. "vite: command not found"
- **Problema**: Vite não estava disponível no container
- **Solução**: Mudou `NODE_ENV=production` para `NODE_ENV=development` e adicionou `--include=dev` no npm ci

### 2. "Cannot find module @rollup/rollup-linux-x64-musl"
- **Problema**: Módulos nativos do Rollup não compatíveis com Alpine Linux
- **Solução**: Mudou de `node:20-alpine` para `node:20-slim` (Debian-based)

### 3. Cache Issues
- **Problema**: Problemas com cache corrompido do npm
- **Solução**: Adicionado `npm cache clean --force` antes da instalação

## Comandos NPM Recomendados

```bash
# Limpar cache
npm cache clean --force

# Instalar dependências (incluindo dev dependencies)
npm ci --include=dev --legacy-peer-deps
```

## .dockerignore Recomendado

```
# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
dist
build

# Environment files
.env*
!.env.example

# IDE files
.vscode
.idea
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Git
.git
.gitignore

# Documentation
README.md
CHANGELOG.md
LICENSE

# Test files
coverage
.nyc_output
*.test.js
*.spec.js
__tests__

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# ESLint cache
.eslintcache

# Parcel cache
.cache
.parcel-cache

# Next.js
.next

# Nuxt.js
.nuxt

# Temporary files
tmp
temp
```

## Nginx Configuration

A configuração do nginx inclui:
- Suporte para SPA (React Router)
- Gzip compression
- Security headers
- Cache otimizado para assets estáticos
- Health check endpoint

## Notas Importantes

1. **Base Image**: Use `node:20-slim` ao invés de `node:20-alpine` para evitar problemas com módulos nativos
2. **Dev Dependencies**: Sempre inclua dev dependencies durante o build (`--include=dev`)
3. **Cache**: Limpe o cache do npm antes da instalação em containers
4. **Legacy Peer Deps**: Use `--legacy-peer-deps` para compatibilidade
5. **Multi-stage Build**: Separe o estágio de build do estágio de produção para imagens menores

## Testado e Aprovado

✅ **Projeto**: FBRSigns  
✅ **Stack**: React + Vite + TypeScript + Tailwind CSS  
✅ **Data**: September 2025  
✅ **Status**: Deploy bem-sucedido