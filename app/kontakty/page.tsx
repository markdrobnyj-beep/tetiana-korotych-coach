import type { Metadata } from "next";
import { CalendlyInline } from "../components/CalendlyInline";
import { ContactForm } from "../components/ContactForm";
import { PageHero } from "../components/PageHero";
import { UzhhorodMap } from "../components/UzhhorodMap";
import { getSiteContent } from "../lib/content-store";
import { resolveInstagramUrl } from "../lib/site-content.mjs";

export const metadata: Metadata = { title: "Контакти" };

export default async function ContactsPage() {
  const { settings } = await getSiteContent();
  return <>
    <PageHero eyebrow="Контакти · Ужгород / Online" title="Почнімо з розмови" text="Опишіть ваш запит — я відповім і запропоную зручний час." />
    <section className="contact-page"><div className="contact-details"><div><span>Email</span><a href={`mailto:${settings.email}`}>{settings.email}</a></div><div><span>Локація</span><strong>{settings.city}, Україна</strong></div><div className="social-row"><a href={resolveInstagramUrl(settings.instagram)} target="_blank" rel="noreferrer">Instagram ↗</a><a href={settings.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><a href={settings.telegram} target="_blank" rel="noreferrer">Telegram ↗</a></div></div><ContactForm /><CalendlyInline /></section>
    <UzhhorodMap />
  </>;
}
