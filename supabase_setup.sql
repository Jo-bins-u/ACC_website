-- SQL script to create tables in Supabase for the ACC Website
-- Go to your Supabase Dashboard -> SQL Editor -> New Query, paste this script, and click "Run".

-- 1. Create Events Table
CREATE TABLE IF NOT EXISTS public.acc_events (
    id bigint PRIMARY KEY,
    title text NOT NULL,
    date text NOT NULL,
    category text NOT NULL,
    time text,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Team Table
CREATE TABLE IF NOT EXISTS public.acc_team (
    id text PRIMARY KEY,
    name text NOT NULL,
    role text NOT NULL,
    category text NOT NULL,
    image text,
    links jsonb DEFAULT '[]'::jsonb,
    sort_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Gallery Table
CREATE TABLE IF NOT EXISTS public.acc_gallery (
    domain text PRIMARY KEY,
    images jsonb DEFAULT '[]'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) but allow public access for read & write 
-- (Note: You can secure write operations later using Supabase Auth if needed)
ALTER TABLE public.acc_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acc_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.acc_events FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.acc_events FOR ALL USING (true);

CREATE POLICY "Allow public read access" ON public.acc_team FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.acc_team FOR ALL USING (true);

CREATE POLICY "Allow public read access" ON public.acc_gallery FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.acc_gallery FOR ALL USING (true);
