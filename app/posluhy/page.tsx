import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { getSiteContent } from "../lib/content-store";

export const metadata: Metadata = { title: "Послуги" };

export default async function ServicesPage() {
  const { services } = await getSiteContent();
  return <>
    <PageHero eyebrow="Лайф-коучинг · Бізнес-коучинг · Стратегічні сесії" title="Види запитів, з якими працюю" text="Від особистої опори до узгодженої стратегії команди." />
    <section className="services-page">{services.map((service) => <article className="service-detail" key={service.id}><div className="service-title"><span className="service-mark" aria-hidden="true">✦</span><h2>{service.title}</h2><p>{service.description}</p></div><div className="prompt-group"><p className="prompt-label">Приклади запитів</p><ul className="prompt-list">{service.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></div></article>)}</section>
    <section className="cta-card"><p className="eyebrow">Наступний крок</p><h2>Оберімо формат під ваш запит.</h2><a href="/kontakty" className="button button-light">Записатися на зустріч <span>↗</span></a></section>
  </>;
}
