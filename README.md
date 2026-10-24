# Portfólio · Fabrício Zanzarine

Site de portfólio em React que lista meus projetos direto da API do GitHub, recebe mensagens por um formulário de contato e tem um dashboard protegido para o dono do site.

## Tecnologias

| Área          | Escolha                                                  |
| ------------- | -------------------------------------------------------- |
| Base          | Vite, React 19, TypeScript                               |
| Rotas         | React Router (`createBrowserRouter`, rotas `lazy`)       |
| Dados / cache | TanStack Query (cache de 10 min, sem refetch ao navegar) |
| Formulários   | React Hook Form + Zod                                    |
| Backend       | Supabase (Auth, Postgres com RLS)                        |
| E-mail        | Formspree                                                |
| Estilo        | Tailwind CSS v4, tema por variáveis CSS                  |
| 3D            | React Three Fiber + Three.js (carregado sob demanda)     |
| Testes        | Vitest + Testing Library                                 |
| Qualidade     | ESLint, Prettier, Husky, lint-staged, commitlint         |

## Como rodar

```bash
git clone https://github.com/fa-zanzarine/CP6---WebDevelop
cd CP6---WebDevelop
npm install
cp .env.example .env     # preencha as variáveis (veja abaixo)
npm run dev              # http://localhost:5173
```

### Variáveis de ambiente

| Variável                  | Obrigatória | Para quê                                         |
| ------------------------- | ----------- | ------------------------------------------------ |
| `VITE_GITHUB_USER`        | não         | Usuário do GitHub (padrão: `fa-zanzarine`)       |
| `VITE_GITHUB_TOKEN`       | não         | Token sem escopos, só para subir o limite da API |
| `VITE_SUPABASE_URL`       | sim         | URL do projeto Supabase                          |
| `VITE_SUPABASE_ANON_KEY`  | sim         | Chave `anon` pública do Supabase                 |
| `VITE_FORMSPREE_ENDPOINT` | sim         | Endpoint do Formspree que envia o e-mail ao dono |

> O `.env` nunca é versionado. Variáveis `VITE_*` ficam visíveis no navegador: use só a chave `anon` do Supabase (a segurança vem das políticas RLS) e nunca a `service_role`.

### Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor (cria tabelas e políticas RLS).
3. Em **Authentication > Providers > Email**, desative _Allow new users to sign up_.
4. Em **Authentication > Users**, crie o usuário do dono. É com ele que se entra em `/login`.

### Configurando o e-mail

Crie um formulário em [formspree.io](https://formspree.io) com o e-mail do dono e cole o endpoint em `VITE_FORMSPREE_ENDPOINT`. Cada mensagem é salva no Supabase (aparece no dashboard) **e** enviada por e-mail. O envio só é considerado falho se os dois destinos falharem.

## Scripts

| Comando           | O que faz                             |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento           |
| `npm run build`   | Checa tipos e gera o build em `dist/` |
| `npm run preview` | Serve o build localmente              |
| `npm run lint`    | ESLint                                |
| `npm run format`  | Prettier                              |
| `npm test`        | Testes (Vitest)                       |

## Rotas

| Rota              | Descrição                                     |
| ----------------- | --------------------------------------------- |
| `/`               | Home com 3D interativo e projetos em destaque |
| `/projetos`       | Todos os repositórios                         |
| `/projetos/:nome` | Página individual de cada projeto             |
| `/contato`        | Formulário de contato                         |
| `/login`          | Login do dono                                 |
| `/dashboard`      | Mensagens e destaques (protegida)             |
| `*`               | Página 404                                    |

### Deploy e links diretos

Como é uma SPA, o servidor precisa devolver `index.html` para qualquer rota, para que links compartilhados e o F5 funcionem. Já estão incluídos: `public/_redirects` (Netlify/Cloudflare Pages), `vercel.json` (Vercel) e `public/.htaccess` (Apache).

## Decisões de performance

- Rotas com `React.lazy`: o dashboard e as páginas internas ficam fora do pacote inicial.
- A cena 3D (Three.js em chunk próprio) só baixa quando o bloco entra na tela e o navegador está ocioso; é pulada com `prefers-reduced-motion`. O contêiner tem altura fixa.
- Skeletons com as mesmas dimensões dos cards reais (sem salto de layout).
- TanStack Query com `staleTime` de 10 min: navegar entre páginas não repete chamadas ao GitHub.
- Tema aplicado por script inline antes do React, sem "flash" de tema errado.

Para medir: `npm run build && npm run preview` e rode o Lighthouse (modo mobile) em `http://localhost:4173`.

## Estrutura de pastas

```
src/
  components/
    ui/          # Button, Card, Field, Skeleton, Spinner, StateMessage (reutilizáveis)
    layout/      # Header, Footer, Layout, ThemeToggle
    projects/    # ProjectCard, ProjectGrid
    contact/     # ContactForm
    three/       # Hero3D (lazy) e HeroScene
  pages/         # uma por rota; pages/dashboard/ é carregado sob demanda
  hooks/         # lógica de dados e formulário (useProjects, useContactForm...)
  services/      # chamadas externas (GitHub, Supabase, Formspree)
  context/       # ThemeContext, AuthContext
  lib/           # utilitários puros (validação Zod, formatação, clientes)
  types/         # tipos compartilhados
  test/          # setup dos testes
supabase/        # schema.sql
```

Regra de ouro: **componentes só apresentam**. Chamadas de API ficam em `services/` e são consumidas por hooks.

## Convenções

### Nomenclatura

- Componentes e páginas: `PascalCase` (`ProjectCard.tsx`, `HomePage.tsx`).
- Hooks: `camelCase` começando com `use` (`useProjects.ts`).
- Serviços e utilitários: `camelCase` (`github.ts`, `format.ts`).
- Tipos e interfaces: `PascalCase`, sem prefixo `I`.
- Testes ao lado do arquivo testado: `*.test.ts(x)`.
- Imports usam o alias `@/` (= `src/`).

### Commits (Conventional Commits)

Formato: `tipo(escopo opcional): descrição no imperativo, em português`

| Tipo       | Uso                               |
| ---------- | --------------------------------- |
| `feat`     | nova funcionalidade               |
| `fix`      | correção de bug                   |
| `refactor` | mudança sem alterar comportamento |
| `test`     | testes                            |
| `docs`     | documentação                      |
| `chore`    | configuração, dependências        |
| `perf`     | melhoria de performance           |
| `style`    | formatação                        |

Exemplo: `feat: adiciona validação do formulário de contato`. O `commitlint` rejeita mensagens fora do padrão.

### Branches (GitHub Flow)

- `main` é sempre estável e só recebe código por Pull Request.
- Cada funcionalidade nasce de `main` em branch própria: `feature/<nome>`, `fix/<nome>`, `chore/<nome>`, `docs/<nome>`.
- Exemplos: `feature/dashboard`, `feature/contact-form`, `fix/theme-flash`.
- Recomendado: ativar proteção da `main` no GitHub (PR obrigatório e testes passando).

### Qualidade automática

Antes de cada commit o Husky roda o `lint-staged` (ESLint + Prettier nos arquivos alterados) e o `commitlint` valida a mensagem.

## Testes

`npm test` cobre, no mínimo:

- Validação do formulário (schema Zod e mensagens por campo, bloqueio do botão no envio, feedback de erro).
- Bloqueio do dashboard sem login (`ProtectedRoute` redireciona para `/login`).

## Trabalhando com IA

As mesmas regras de commits, branches, arquitetura e nomenclatura estão em [`CLAUDE.md`](CLAUDE.md), para que assistentes de código também as sigam.
