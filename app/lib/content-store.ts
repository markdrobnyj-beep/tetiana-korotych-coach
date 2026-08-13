import { env } from "cloudflare:workers";
import { DEFAULT_CONTENT } from "./site-content.mjs";
import type { SiteContent } from "./site-types";

type D1Result<T = unknown> = { results?: T[] };
type D1Statement = { bind: (...values: unknown[]) => D1Statement; run: () => Promise<unknown>; first: <T = unknown>() => Promise<T | null> };
type D1DatabaseLike = { prepare: (sql: string) => D1Statement; batch: (statements: D1Statement[]) => Promise<D1Result[]> };

function db(): D1DatabaseLike | null {
  return ((env as unknown as { DB?: D1DatabaseLike }).DB ?? null);
}

async function ensureSchema(database: D1DatabaseLike) {
  await database.batch([
    database.prepare("CREATE TABLE IF NOT EXISTS site_content (id INTEGER PRIMARY KEY CHECK (id = 1), payload TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    database.prepare("CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, subject TEXT, message TEXT NOT NULL, created_at TEXT NOT NULL)"),
    database.prepare("CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC)"),
  ]);
}

export async function getSiteContent(): Promise<SiteContent> {
  const database = db();
  if (!database) return DEFAULT_CONTENT;
  try {
    await ensureSchema(database);
    const row = await database.prepare("SELECT payload FROM site_content WHERE id = 1").first<{ payload: string }>();
    return row?.payload ? JSON.parse(row.payload) as SiteContent : DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const database = db();
  if (!database) throw new Error("Сховище даних тимчасово недоступне.");
  await ensureSchema(database);
  await database.prepare("INSERT INTO site_content (id, payload, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at")
    .bind(JSON.stringify(content), new Date().toISOString()).run();
}

export async function saveLead(input: { name: string; email: string; phone?: string; subject?: string; message: string }) {
  const database = db();
  if (!database) return;
  await ensureSchema(database);
  await database.prepare("INSERT INTO leads (id, name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), input.name, input.email, input.phone ?? "", input.subject ?? "", input.message, new Date().toISOString()).run();
}

export async function getLeads() {
  const database = db();
  if (!database) return [];
  await ensureSchema(database);
  const result = await database.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 200").run() as D1Result<Record<string, string>>;
  return result.results ?? [];
}
