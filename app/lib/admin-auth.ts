import { env } from "cloudflare:workers";
import { getCurrentUser } from "../current-user";

export async function getOwner() {
  const user = await getCurrentUser();
  if (!user) return null;
  const configured = (env as unknown as { ADMIN_EMAILS?: string }).ADMIN_EMAILS || "korotanya@yahoo.com";
  const allowed = configured.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(user.email.toLowerCase()) ? user : null;
}
