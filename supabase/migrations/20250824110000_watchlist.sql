-- Create watchlist table
create table if not exists public.watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id text not null,
  title text not null,
  poster_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists watchlist_user_movie_unique on public.watchlist(user_id, movie_id);

-- Updated at trigger
create trigger watchlist_set_updated_at
before update on public.watchlist
for each row execute function public.update_updated_at_column();

-- RLS
alter table public.watchlist enable row level security;

create policy if not exists "Users can view their watchlist"
on public.watchlist for select
to authenticated
using (auth.uid() = user_id);

create policy if not exists "Users can add to their watchlist"
on public.watchlist for insert
to authenticated
with check (auth.uid() = user_id);

create policy if not exists "Users can remove from their watchlist"
on public.watchlist for delete
to authenticated
using (auth.uid() = user_id);


