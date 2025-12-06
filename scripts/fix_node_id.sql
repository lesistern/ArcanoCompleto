-- Temporarily make node_id nullable in srd_items to allow data population
ALTER TABLE public.srd_items ALTER COLUMN node_id DROP NOT NULL;
