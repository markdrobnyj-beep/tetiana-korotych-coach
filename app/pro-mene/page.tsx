import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components/PageHero";
import { getSiteContent } from "../lib/content-store";
import { resolveAboutImage } from "../lib/site-content.mjs";

export const metadata: Metadata = { title: "Про мене" };

export default async function AboutPage() {
  const { about, images } = await getSiteContent();
  const aboutImage = resolveAboutImage(images.about);
  return <>
    <PageHero eyebrow="Про мене" title="Людина поруч, коли потрібні ясність і рух." text={about.lead} />
    <section className="about-layout"><div className="about-photo"><Image src={aboutImage} alt="Тетяна Коротич" fill sizes="(max-width: 900px) 100vw, 45vw" /></div><div className="about-copy"><p className="eyebrow">Моя місія</p><p className="big-quote">«{about.mission}»</p>{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href="/kontakty" className="button">Поговорімо <span>↗</span></a></div></section>
    <section className="strengths"><div className="section-heading"><p className="eyebrow">Мій підхід</p><h2>Що відрізняє мою роботу</h2></div><div className="strength-list">{about.strengths.map((item) => <article key={item}><span className="strength-mark" aria-hidden="true">✦</span><p>{item}</p></article>)}</div></section>
  </>;
}
