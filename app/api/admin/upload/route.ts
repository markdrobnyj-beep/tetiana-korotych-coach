import { env } from "cloudflare:workers";
import { getOwner } from "../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!await getOwner()) return Response.json({ message: "Немає доступу." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 8_000_000) return Response.json({ message: "Оберіть зображення до 8 МБ." }, { status: 400 });
  const bucket = (env as unknown as { MEDIA?: { put: (key: string, value: ArrayBuffer, options: unknown) => Promise<unknown> } }).MEDIA;
  if (!bucket) return Response.json({ message: "Сховище фото ще не підключено." }, { status: 503 });
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "jpg";
  const key = `${crypto.randomUUID()}.${extension}`;
  await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return Response.json({ message: "Фото завантажено.", url: `/api/media/${key}` });
}
