import { requireCurrentUser } from "../current-user";
import { getOwner } from "../lib/admin-auth";
import { getLeads, getSiteContent } from "../lib/content-store";
import { getPublicTestimonials } from "../lib/site-content.mjs";
import { AdminEditor } from "./AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireCurrentUser();
  const owner = await getOwner();
  if (!owner) return <section className="access-card"><h1>Немає доступу</h1><p>Ця сторінка доступна лише власниці сайту.</p></section>;
  const [content, leads] = await Promise.all([getSiteContent(), getLeads()]);
  return <AdminEditor initialContent={{ ...content, testimonials: getPublicTestimonials(content.testimonials) }} initialLeads={leads} />;
}
