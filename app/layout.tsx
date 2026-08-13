import type { Metadata } from "next";
import { Brygada_1918, Onest } from "next/font/google";
import { headers } from "next/headers";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { MotionController } from "./components/MotionController";
import "./globals.css";

const onest = Onest({ variable: "--font-onest", subsets: ["cyrillic", "latin"] });
const brygada = Brygada_1918({ variable: "--font-brygada", subsets: ["cyrillic", "latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "tetianakorotych.coach";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Тетяна Коротич — професійний коуч PCC ICF";
  const description = "Бізнес- і лайф-коучинг, розвиток команд та стратегічні сесії в Ужгороді й онлайн.";
  const image = `${origin}/og.png`;
  return {
    metadataBase: new URL(origin),
    title: { default: title, template: "%s — Тетяна Коротич" },
    description,
    alternates: { canonical: "https://tetianakorotych.coach" },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, images: [{ url: image, width: 1728, height: 910, alt: "Тетяна Коротич — професійний коуч PCC ICF" }], locale: "uk_UA", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${onest.variable} ${brygada.variable}`}>
        <MotionController />
        <a className="skip-link" href="#main">До основного вмісту</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
