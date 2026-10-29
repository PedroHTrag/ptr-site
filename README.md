# Portfólio de Pedro Tragante

Site de currículo e portfólio. O código-fonte da aplicação fica na pasta `site/`; os arquivos gerados na raiz são os que o GitHub Pages publica.

## Rodar localmente

Com Node.js 22 e pnpm 10 instalados:

```powershell
cd site
pnpm install --frozen-lockfile
pnpm dev
```

## Atualizar a versão publicada

Na pasta `site/`, instale as dependências e gere o site estático na raiz do repositório:

```powershell
pnpm install --frozen-lockfile
pnpm exec vite build --outDir .. --emptyOutDir=false
```

Revise as alterações e envie o commit para a branch `main`. O GitHub Pages publica a raiz dessa branch. O arquivo `CNAME` mantém `pedrotragante.online`; não é necessário alterar o DNS.
