-- Create systems table
create table if not exists public.systems (
  key text primary key,
  name text not null,
  description text,
  is_active boolean default true
);

insert into public.systems (key, name, description) values
('dnd_35', 'D&D 3.5', 'Sistema clásico, gran profundidad.'),
('dnd_5e', 'D&D 5e', 'Moderno y simplificado.'),
('pathfinder', 'Pathfinder', 'Personalización extrema.'),
('starfinder', 'Starfinder', 'Ciencia ficción y fantasía.')
on conflict (key) do nothing;

-- Update profiles table
alter table public.profiles 
add column if not exists experience_level text default 'novato',
add column if not exists preferred_system text default 'dnd_35';

-- Add check constraints
alter table public.profiles 
drop constraint if exists profiles_experience_level_check;

alter table public.profiles 
add constraint profiles_experience_level_check 
check (experience_level in ('novato', 'intermedio', 'experto'));
