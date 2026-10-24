-- Execute no SQL Editor do Supabase.
-- Depois: Authentication > Providers > Email > desative "Allow new users to sign up"
-- e crie manualmente o usuário do dono (Authentication > Users > Add user).

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.featured_projects (
  repo_name text primary key
);

alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

-- Visitantes (anon) só podem ENVIAR mensagens; nunca ler.
create policy "anon pode inserir mensagens" on public.messages
  for insert to anon, authenticated with check (answered = false);

-- Somente o dono autenticado lê e atualiza mensagens.
create policy "dono lê mensagens" on public.messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on public.messages
  for update to authenticated using (true) with check (true);

-- Destaques: leitura pública (a home usa), escrita só do dono.
create policy "todos leem destaques" on public.featured_projects
  for select to anon, authenticated using (true);
create policy "dono insere destaques" on public.featured_projects
  for insert to authenticated with check (true);
create policy "dono remove destaques" on public.featured_projects
  for delete to authenticated using (true);
