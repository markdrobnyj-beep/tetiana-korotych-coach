import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type CurrentUser = { userId: string; displayName: string; email: string };

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  if (!userId || !email) return null;
  const encodedName = requestHeaders.get("oai-authenticated-user-full-name");
  let displayName = email;
  if (encodedName) {
    try { displayName = decodeURIComponent(encodedName); } catch { /* keep email fallback */ }
  }
  return { userId, email, displayName };
}

export async function requireCurrentUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  return user;
}
