# Instruções para assistentes de IA

Projeto: portfólio de Fabrício Zanzarine (Vite + React 19 + TypeScript + Tailwind v4 + Supabase).
Responda e escreva textos de interface em **português do Brasil**. Código e nomes de arquivos em inglês, exceto rotas públicas já em português (`/projetos`, `/contato`).

## Comandos

- `npm run dev` · `npm run build` · `npm run lint` · `npm run format` · `npm test`
- Antes de dar uma tarefa por concluída: `npm run lint && npm test && npm run build` precisam passar.

## Git

### Commits: Conventional Commits

`tipo(escopo opcional): descrição curta no imperativo, em português`

Tipos permitidos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `style`.
Exemplo: `feat: adiciona validação do formulário de contato`.
Um commit = uma mudança lógica. Nunca use `--no-verify`.

### Branches: GitHub Flow

- Nunca commitar direto na `main`.
- Uma branch por funcionalidade, criada a partir da `main`: `feature/<nome>`, `fix/<nome>`, `chore/<nome>`, `docs/<nome>`.
- Integrar à `main` via Pull Request (merge `--no-ff` quando local).

## Arquitetura

- `components/ui/`: peças visuais reutilizáveis e sem regra de negócio (Button, Card, Field, Skeleton...). Reuse-as; não crie variações ad hoc de botão/card.
- `components/<feature>/`: componentes de uma funcionalidade.
- `pages/`: um componente por rota, com `export default` (necessário para `React.lazy`).
- `hooks/`: lógica de dados e de formulário (TanStack Query, React Hook Form).
- `services/`: **único** lugar com `fetch`/Supabase. Componentes nunca chamam API diretamente.
- `lib/`: funções puras e clientes (Zod, formatação, supabase, queryClient).
- `context/`: apenas estado global real (tema, autenticação).
- Componentes pequenos: se passar de ~120 linhas ou misturar lógica com markup, extraia um hook ou subcomponente.

## Nomenclatura

- Componentes/páginas: `PascalCase.tsx`. Hooks: `useXxx.ts`. Serviços/utilitários: `camelCase.ts`.
- Tipos/interfaces: `PascalCase`, sem prefixo `I`. Constantes de módulo: `camelCase` (ou `UPPER_SNAKE` para chaves fixas).
- Testes ao lado do código: `Nome.test.tsx`.
- Imports com alias `@/` (nunca `../../..`).

## Regras de produto (não quebrar)

- Todo dado vindo de API precisa tratar **carregando** (skeleton/spinner), **erro** (com "Tentar novamente") e **vazio**.
- Botões de envio ficam desabilitados durante o envio (`<Button loading>`).
- Skeletons têm as mesmas dimensões do conteúdo final (sem salto de layout).
- Chamadas ao GitHub passam pelo TanStack Query (cache de 10 min). Não use `fetch` solto em `useEffect`.
- Dashboard e cena 3D continuam carregados com `lazy`. Nunca importe `three`/`@react-three/fiber` fora de `components/three/`.
- Rotas protegidas usam `ProtectedRoute`. Nunca confie só em esconder um botão: a segurança real está nas políticas RLS (`supabase/schema.sql`).
- Tema vem de `useTheme()` e variáveis CSS (`bg-bg`, `text-text`, `border-border`, `bg-accent`...). Não use cores fixas para fundo/texto.
- Imagens novas: WebP/AVIF, com `width`/`height` e `loading="lazy"`.
- Segredos: `.env` nunca é versionado; novas variáveis entram no `.env.example` e no README. Nunca usar a chave `service_role` no front.

## Qualidade

- TypeScript estrito: sem `any`, sem `// @ts-ignore`.
- Husky roda lint-staged (ESLint + Prettier) e commitlint em cada commit; corrija o erro em vez de contornar.
- Ao mexer em formulário, validação ou rota protegida, atualize/crie testes (Vitest + Testing Library).
