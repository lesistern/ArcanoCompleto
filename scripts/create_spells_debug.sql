
DROP TABLE IF EXISTS public.srd_spells CASCADE;

CREATE TABLE public.srd_spells (
  id              bigserial primary key,
  node_id         bigint, -- references public.srd_nodes(id), -- Removing FK for debug
  source_id       bigint, -- references public.srd_sources(id),
  system_slug     text not null default '3.5e',

  slug            text not null,
  name            text not null,

  school          text,
  subschool       text,
  descriptors     text[],

  level_by_class  jsonb,
  level           text,

  components      text,
  casting_time    text,
  range           text,
  target          text,
  duration        text,
  saving_throw    text,
  spell_resistance text,

  short_description text,
  full_description  text,
  description       text,

  is_psionic        boolean default false,
  power_points_section text,

  meta            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

CREATE UNIQUE INDEX srd_spells_slug_uniq ON public.srd_spells(slug);
