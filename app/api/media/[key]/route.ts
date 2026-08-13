import { env } from "cloudflare:workers";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const bucket = (env as unknown as { MEDIA?: { get: (key: string) => Promise<{ body: BodyInit; httpMetadata?: { contentType?: string } } | null> } }).MEDIA;
  const object = await bucket?.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  return new Response(object.body, { headers: { "content-type": object.httpMetadata?.contentType || "application/octet-stream", "cache-control": "public, max-age=31536000, immutable" } });
}
