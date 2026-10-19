import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type CmsContentType = 'donations' | 'news' | 'classes' | 'activities';

interface CmsRecord<T> {
  content_type: CmsContentType;
  content_id: string;
  content_data: T;
}

const migratedImages = new Map<string, string>();

function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase belum dikonfigurasi. Periksa VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

export async function getCmsItems<T extends { id: string }>(
  contentType: CmsContentType,
  initialItems: T[]
): Promise<T[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('cms_content')
    .select('content_id, content_data')
    .eq('content_type', contentType)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(`Gagal memuat ${contentType} dari Supabase: ${error.message}`);
  }

  const itemsById = new Map(initialItems.map(item => [item.id, item]));
  for (const row of data ?? []) {
    itemsById.set(row.content_id, row.content_data as T);
  }
  return Array.from(itemsById.values());
}

export async function saveCmsItem<T extends { id: string }>(
  contentType: CmsContentType,
  item: T
): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from('cms_content')
    .upsert({
      content_type: contentType,
      content_id: item.id,
      content_data: item
    }, { onConflict: 'content_type,content_id' });

  if (error) {
    throw new Error(`Gagal menyimpan ${contentType} ke Supabase: ${error.message}`);
  }
}

export async function uploadCmsImage(blob: Blob, fileName: string): Promise<string> {
  const client = requireSupabase();
  const extension = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
  const path = `${crypto.randomUUID()}-${safeName}.${extension}`;
  const { error } = await client.storage
    .from('cms-media')
    .upload(path, blob, { contentType: blob.type, cacheControl: '3600', upsert: false });

  if (error) {
    throw new Error(`Gagal mengunggah gambar ke Supabase Storage: ${error.message}`);
  }
  return client.storage.from('cms-media').getPublicUrl(path).data.publicUrl;
}

export async function migrateCmsItems<T extends { id: string; image?: string }>(
  contentType: CmsContentType,
  items: T[]
): Promise<void> {
  const client = requireSupabase();
  const { data: existingRows, error: readError } = await client
    .from('cms_content')
    .select('content_id')
    .eq('content_type', contentType);
  if (readError) {
    throw new Error(`Gagal memeriksa data ${contentType} di Supabase: ${readError.message}`);
  }
  const existingIds = new Set((existingRows ?? []).map(row => row.content_id));
  const migratedItems: CmsRecord<T>[] = [];

  for (const item of items) {
    if (existingIds.has(item.id)) continue;

    let migratedItem = item;
    if (item.image) {
      const imageUrl = new URL(item.image, window.location.origin);
      const isLocalImage = imageUrl.origin === window.location.origin;
      const cachedImage = migratedImages.get(item.image);
      if (cachedImage) {
        migratedItem = { ...item, image: cachedImage };
      } else if (item.image.startsWith('data:image/') || isLocalImage) {
        const response = await fetch(item.image);
        if (!response.ok) {
          throw new Error(`Gagal membaca gambar lokal untuk ${contentType}/${item.id}.`);
        }
        const uploadedImage = await uploadCmsImage(
          await response.blob(),
          `${contentType}-${item.id}`
        );
        migratedImages.set(item.image, uploadedImage);
        migratedItem = { ...item, image: uploadedImage };
      }
    }
    migratedItems.push({
      content_type: contentType,
      content_id: item.id,
      content_data: migratedItem
    });
  }

  if (migratedItems.length === 0) return;
  const { error } = await client
    .from('cms_content')
    .upsert(migratedItems, {
      onConflict: 'content_type,content_id',
      ignoreDuplicates: true
    });

  if (error) {
    throw new Error(`Gagal memindahkan data lokal ${contentType} ke Supabase: ${error.message}`);
  }
}
