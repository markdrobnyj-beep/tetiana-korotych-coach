export function shouldRedirectFirstEntry({ pathname, referrer, origin }) {
  if (pathname === "/") return false;
  try {
    return new URL(referrer).origin !== origin;
  } catch {
    return true;
  }
}
