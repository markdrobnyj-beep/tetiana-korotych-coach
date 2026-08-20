import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components/PageHero";
import { getSiteContent } from "../lib/content-store";
import { getPublicTestimonials } from "../lib/site-content.mjs";

export const metadata: Metadata = { title: "Відгуки клієнтів" };

export default async function TestimonialsPage() {
  const content = await getSiteContent();
  const testimonials = getPublicTestimonials(content.testimonials);
  return <>
    <PageHero eyebrow="Досвід клієнтів" title="Відгуки клієнтів" text="Реальні зміни звучать переконливіше за будь-яку презентацію." />
    <section className="testimonial-grid">{testimonials.map((item) => <article className="testimonial-card" key={item.id}>
      <div className="testimonial-person">
        {item.image && <Image className="testimonial-avatar" src={item.image} width={120} height={120} alt={`Фото клієнта ${item.name}`} />}
        <div><strong>{item.name}</strong><span>{item.role}</span></div>
      </div>
      <blockquote className={item.id === "maryna-koval-2026" ? "testimonial-quote testimonial-quote-compact" : "testimonial-quote"}>{item.quote}</blockquote>
    </article>)}</section>
  </>;
}
