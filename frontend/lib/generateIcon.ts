import { readFile } from 'fs/promises';
import path from 'path';
import { getInfosCabinet } from './strapi';

// Icon generation runs server-side only, so it reaches Strapi over the Docker
// network directly (never through the browser-facing public URL).
const STRAPI_SERVER_URL =
  process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function renderIcon(): Promise<Response> {
  const infos = await getInfosCabinet();
  const relativeUrl = infos?.logo?.url;

  if (relativeUrl) {
    try {
      const res = await fetch(`${STRAPI_SERVER_URL}${relativeUrl}`);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        return new Response(new Uint8Array(buffer), {
          headers: { 'Content-Type': res.headers.get('content-type') ?? 'image/png' },
        });
      }
    } catch {
      // Fall through to the static fallback below.
    }
  }

  const fallback = await readFile(path.join(process.cwd(), 'public', 'icon-512.png'));
  return new Response(new Uint8Array(fallback), {
    headers: { 'Content-Type': 'image/png' },
  });
}
