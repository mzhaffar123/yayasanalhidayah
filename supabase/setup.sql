create table if not exists public.cms_content (
  content_type text not null check (content_type in ('donations', 'news', 'classes', 'activities')),
  content_id text not null,
  content_data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (content_type, content_id)
);

alter table public.cms_content enable row level security;

grant select on public.cms_content to anon, authenticated;
grant insert, update, delete on public.cms_content to authenticated;

drop policy if exists "CMS content is readable by everyone" on public.cms_content;
create policy "CMS content is readable by everyone"
  on public.cms_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert CMS content" on public.cms_content;
create policy "Authenticated users can insert CMS content"
  on public.cms_content for insert
  to authenticated
  with check (auth.uid() is not null);

drop policy if exists "Authenticated users can update CMS content" on public.cms_content;
create policy "Authenticated users can update CMS content"
  on public.cms_content for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "Authenticated users can delete CMS content" on public.cms_content;
create policy "Authenticated users can delete CMS content"
  on public.cms_content for delete
  to authenticated
  using (auth.uid() is not null);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 12582912, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CMS images are publicly readable" on storage.objects;
create policy "CMS images are publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'cms-media');

drop policy if exists "Authenticated users can upload CMS images" on storage.objects;
create policy "Authenticated users can upload CMS images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cms-media' and auth.uid() is not null);

drop policy if exists "Authenticated users can update CMS images" on storage.objects;
create policy "Authenticated users can update CMS images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cms-media' and auth.uid() is not null)
  with check (bucket_id = 'cms-media' and auth.uid() is not null);

drop policy if exists "Authenticated users can delete CMS images" on storage.objects;
create policy "Authenticated users can delete CMS images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cms-media' and auth.uid() is not null);
