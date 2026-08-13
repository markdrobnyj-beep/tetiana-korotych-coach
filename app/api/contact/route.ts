import { env } from "cloudflare:workers";
import { saveLead } from "../../lib/content-store";
import { deliverContactEmail } from "../../lib/contact-delivery.mjs";
import { validateLead } from "../../lib/site-content.mjs";

export async function POST(request: Request) {
  const input = await request.json() as Record<string, string>;
  if (input.website) return Response.json({ message: "Повідомлення не надіслано." }, { status: 400 });
  const result = validateLead(input);
  if (!result.ok) return Response.json(result, { status: 400 });
  await saveLead({ name: input.name, email: input.email, phone: input.phone, subject: input.subject, message: input.message });
  if (input.deliveryConfirmed === "formsubmit") return Response.json(result);
  try {
    await deliverContactEmail(input, env as unknown as { RESEND_API_KEY?: string; RESEND_FROM?: string });
  } catch (error) {
    console.error("Contact email delivery failed", error instanceof Error ? error.message : error);
    return Response.json({ message: "Заявку збережено, але email не доставлено. Спробуйте ще раз або напишіть напряму." }, { status: 502 });
  }
  return Response.json(result);
}
