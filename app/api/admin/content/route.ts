import { getOwner } from "../../../lib/admin-auth";
import { getSiteContent, saveSiteContent } from "../../../lib/content-store";
import type { SiteContent } from "../../../lib/site-types";

export async function GET() {
  if (!await getOwner()) return Response.json({ message: "Немає доступу." }, { status: 403 });
  return Response.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!await getOwner()) return Response.json({ message: "Немає доступу." }, { status: 403 });
  const content = await request.json() as SiteContent;
  if (!content?.settings || !Array.isArray(content.services) || !Array.isArray(content.testimonials)) return Response.json({ message: "Некоректні дані." }, { status: 400 });
  await saveSiteContent(content);
  return Response.json({ message: "Зміни збережено." });
}
