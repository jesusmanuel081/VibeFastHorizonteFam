-- ============================================================
-- 008 · programas
-- ------------------------------------------------------------
-- Entidad principal de la plataforma: Programas.
-- Los programas que la Asociación Civil ofrece a familias
-- interesadas en adopción y acogimiento.
--
-- Acceso:
--   - El público (anon) solo lee programas con estado 'Publicado'.
--   - Cada usuario autenticado administra sus propios programas
--     (crear, editar, borrar) — mismo patrón que core_items.
--
-- Correr con: supabase db push (o supabase migration up).
-- ============================================================

create table if not exists public.programas (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users (id) on delete cascade,
  nombre                text not null,
  descripcion_corta     text not null default '',
  descripcion_completa  text not null default '',
  publico_objetivo      text not null default 'Todos',
  estado                text not null default 'Borrador',
  orden                 integer not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint programas_publico_objetivo_check
    check (publico_objetivo in ('Familias interesadas', 'Profesionales', 'Comunidad', 'Todos')),
  constraint programas_estado_check
    check (estado in ('Publicado', 'Borrador'))
);

comment on table public.programas is
  'Programas de la Asociación Civil: nombre, descripciones, público objetivo, estado y orden de visualización.';

create index if not exists programas_publicado_orden_idx
  on public.programas (estado, orden, created_at desc);

create index if not exists programas_user_id_idx
  on public.programas (user_id, created_at desc);

drop trigger if exists programas_set_updated_at on public.programas;
create trigger programas_set_updated_at
  before update on public.programas
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.programas enable row level security;

-- El público lee solo programas publicados.
drop policy if exists "programas_select_public" on public.programas;
create policy "programas_select_public"
  on public.programas for select
  to anon, authenticated
  using (estado = 'Publicado');

-- El dueño ve sus programas sin importar el estado.
drop policy if exists "programas_select_own" on public.programas;
create policy "programas_select_own"
  on public.programas for select
  using (auth.uid() = user_id);

drop policy if exists "programas_insert_own" on public.programas;
create policy "programas_insert_own"
  on public.programas for insert
  with check (auth.uid() = user_id);

drop policy if exists "programas_update_own" on public.programas;
create policy "programas_update_own"
  on public.programas for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "programas_delete_own" on public.programas;
create policy "programas_delete_own"
  on public.programas for delete
  using (auth.uid() = user_id);
