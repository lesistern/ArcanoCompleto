-- Add book_id to feats
alter table public.feats add column if not exists book_id bigint references public.srd_books(id);
create index if not exists feats_book_id_idx on public.feats(book_id);

-- Add book_id to classes
alter table public.classes add column if not exists book_id bigint references public.srd_books(id);
create index if not exists classes_book_id_idx on public.classes(book_id);

-- Add book_id to spells
alter table public.spells add column if not exists book_id bigint references public.srd_books(id);
create index if not exists spells_book_id_idx on public.spells(book_id);

-- Add book_id to items
alter table public.items add column if not exists book_id bigint references public.srd_books(id);
create index if not exists items_book_id_idx on public.items(book_id);

-- Add book_id to monsters
alter table public.monsters add column if not exists book_id bigint references public.srd_books(id);
create index if not exists monsters_book_id_idx on public.monsters(book_id);
