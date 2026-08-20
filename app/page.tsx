import Image from "next/image";
import { CalendlyInline } from "./components/CalendlyInline";
import { ContactForm } from "./components/ContactForm";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import ShinyText from "./components/ShinyText/ShinyText";
import { UzhhorodMap } from "./components/UzhhorodMap";
import { getSiteContent } from "./lib/content-store";
import { DEFAULT_CONTENT, resolveHomeImages } from "./lib/site-content.mjs";

export default async function Home() {
  const content = await getSiteContent();
  const images = resolveHomeImages(content.images);
  const fallbackImages = resolveHomeImages(DEFAULT_CONTENT.images);
  const gallery: string[] = images.gallery?.length ? images.gallery : fallbackImages.gallery;
  return <>
    <section className="home-hero">
      <div className="hero-copy"><p className="eyebrow">PCC · ICF · Ужгород / Online</p><h1>Тетяна <em><ShinyText text="Коротич" speed={2} delay={0} color="#b5b5b5" shineColor="#ffffff" spread={120} direction="left" yoyo={false} pauseOnHover={false} /></em></h1><p className="hero-subtitle">{content.settings.heroSubtitle}</p><p className="hero-intro">{content.settings.heroIntro}</p><div className="hero-actions"><a href="/kontakty" className="button">Записатися на зустріч <span>↗</span></a><a href="/pro-mene" className="text-link">Познайомитися ближче</a></div></div>
      <div className="hero-visual"><Image src={images.hero} alt="Тетяна Коротич у синьому костюмі" fill sizes="(max-width: 900px) 100vw, 50vw" priority /><div className="portrait-note"><span>10+</span><p>років досвіду<br />в управлінні персоналом</p></div></div>
    </section>
    <section className="trust-ribbon" aria-label="Професійний досвід і формат роботи">
      <article><span>PCC · ICF</span><p>Міжнародна сертифікація</p></article>
      <article><span>10+ років</span><p>Досвіду в управлінні персоналом</p></article>
      <article><span>індивідуально та з командами</span><p>Ужгород та онлайн</p></article>
    </section>
    <section className="statement"><p>Коучинг — це не про готові відповіді.</p><ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10} rotationEnd="bottom 65%" wordAnimationEnd="bottom 65%">Це простір, де ви чуєте себе й знаходите власні рішення.</ScrollReveal></section>
    <section className="speaker-feature">
      <div className="speaker-photo"><Image src={content.images.speaker} alt="Тетяна Коротич під час виступу" fill sizes="(max-width: 900px) 100vw, 70vw" /></div>
      <div className="speaker-caption"><p className="eyebrow">Спікерка · Бізнес-тренерка</p><h2>Розвиток починається з живої розмови.</h2><p>Проводжу тренінги з лідерства та soft skills, створюючи простір для включеності, сміливих запитань і практичних змін.</p></div>
    </section>
    <section className="practice-gallery" aria-labelledby="gallery-title">
      <div className="section-heading"><p className="eyebrow">У роботі</p><h2 id="gallery-title">Коучинг, тренінги, стратегічні сесії.</h2></div>
      <div className="gallery-grid">
        {gallery.map((src) => <figure className="gallery-item" key={src}><Image src={src} alt="Тетяна Коротич під час тренінгу" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 66vw" style={{ objectFit: "contain" }} /></figure>)}
      </div>
    </section>
    <section className="services-preview"><div className="section-heading"><p className="eyebrow">Напрями роботи</p><h2>Від ясності — до дії</h2></div><div className="service-grid">{content.services.map((service) => <article className="service-card" key={service.id}><span className="service-card-mark" aria-hidden="true">✦</span><h3>{service.title}</h3><p>{service.description}</p><a href="/posluhy">Детальніше ↗</a></article>)}</div></section>
    <section className="contact-band"><div><p className="eyebrow">Зв’язатися</p><h2>Розкажіть, що зараз потребує змін.</h2><p>Відповім на лист і запропоную зручний час для знайомства.</p></div><ContactForm /><CalendlyInline /></section>
    <UzhhorodMap />
  </>;
}
