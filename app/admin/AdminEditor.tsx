"use client";

import { useState } from "react";
import type { SiteContent, Service, Testimonial } from "../lib/site-types";
import { DEFAULT_CONTENT } from "../lib/site-content.mjs";

export function AdminEditor({ initialContent, initialLeads }: { initialContent: SiteContent; initialLeads: Array<Record<string, string>> }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");
  const patchSettings = (key: keyof SiteContent["settings"], value: string) => setContent({ ...content, settings: { ...content.settings, [key]: value } });
  const patchAbout = (key: keyof SiteContent["about"], value: string | string[]) => setContent({ ...content, about: { ...content.about, [key]: value } });
  const updateService = (index: number, patch: Partial<Service>) => setContent({ ...content, services: content.services.map((item, i) => i === index ? { ...item, ...patch } : item) });
  const updateTestimonial = (index: number, patch: Partial<Testimonial>) => setContent({ ...content, testimonials: content.testimonials.map((item, i) => i === index ? { ...item, ...patch } : item) });
  async function save() {
    setStatus("Зберігаю…");
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
    const result = await response.json() as { message: string };
    setStatus(result.message);
  }
  async function upload(target: "hero" | "about" | "speaker", file?: File) {
    if (!file) return;
    setStatus("Завантажую фото…");
    const data = new FormData(); data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json() as { url?: string; message: string };
    if (result.url) setContent({ ...content, images: { ...content.images, [target]: result.url } });
    setStatus(result.message);
  }
  async function uploadGallery(index: number, file?: File) {
    if (!file) return;
    setStatus("Завантажую фото…");
    const data = new FormData(); data.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json() as { url?: string; message: string };
    if (result.url) setContent((current) => {
      const gallery = [...(current.images.gallery?.length === 5 ? current.images.gallery : DEFAULT_CONTENT.images.gallery)];
      gallery[index] = result.url!;
      return { ...current, images: { ...current.images, gallery } };
    });
    setStatus(result.message);
  }
  return <div className="admin-editor">
    <div className="admin-toolbar"><div><p className="eyebrow">Адмінка</p><h1>Керування сайтом</h1></div><button className="button" onClick={save}>Зберегти зміни <span>↗</span></button></div>
    <p className="form-status" aria-live="polite">{status}</p>
    <section className="admin-panel"><h2>Головна та контакти</h2><div className="admin-grid"><label>Ім’я / заголовок<input value={content.settings.heroTitle} onChange={(e) => patchSettings("heroTitle", e.target.value)} /></label><label>Позиціонування<input value={content.settings.heroSubtitle} onChange={(e) => patchSettings("heroSubtitle", e.target.value)} /></label><label className="full">Вступ<textarea value={content.settings.heroIntro} onChange={(e) => patchSettings("heroIntro", e.target.value)} /></label><label>Email<input value={content.settings.email} onChange={(e) => patchSettings("email", e.target.value)} /></label><label>Місто<input value={content.settings.city} onChange={(e) => patchSettings("city", e.target.value)} /></label><label>Фото першого екрана<input type="file" accept="image/*" onChange={(e) => upload("hero", e.target.files?.[0])} /></label><label>Фото «Про мене»<input type="file" accept="image/*" onChange={(e) => upload("about", e.target.files?.[0])} /></label><label className="full">Фото з виступу<input type="file" accept="image/*" onChange={(e) => upload("speaker", e.target.files?.[0])} /></label>{[0, 1, 2, 3, 4].map((index) => <label key={index}>Фото галереї {index + 1}<input type="file" accept="image/*" onChange={(e) => uploadGallery(index, e.target.files?.[0])} /></label>)}</div></section>
    <section className="admin-panel"><h2>Про мене</h2><div className="admin-grid"><label className="full">Місія<textarea value={content.about.mission} onChange={(e) => patchAbout("mission", e.target.value)} /></label>{content.about.paragraphs.map((paragraph, index) => <label className="full" key={index}>Абзац {index + 1}<textarea value={paragraph} onChange={(e) => patchAbout("paragraphs", content.about.paragraphs.map((p, i) => i === index ? e.target.value : p))} /></label>)}</div></section>
    <section className="admin-panel"><div className="admin-section-title"><h2>Послуги</h2><button onClick={() => setContent({ ...content, services: [...content.services, { id: crypto.randomUUID(), title: "Нова послуга", description: "", prompts: [] }] })}>+ Додати</button></div>{content.services.map((service, index) => <div className="admin-item" key={service.id}><label>Назва<input value={service.title} onChange={(e) => updateService(index, { title: e.target.value })} /></label><label>Опис<textarea value={service.description} onChange={(e) => updateService(index, { description: e.target.value })} /></label><label>Запити, кожен з нового рядка<textarea value={service.prompts.join("\n")} onChange={(e) => updateService(index, { prompts: e.target.value.split("\n").filter(Boolean) })} /></label><button className="danger" onClick={() => setContent({ ...content, services: content.services.filter((_, i) => i !== index) })}>Видалити</button></div>)}</section>
    <section className="admin-panel"><div className="admin-section-title"><h2>Відгуки</h2><button onClick={() => setContent({ ...content, testimonials: [...content.testimonials, { id: crypto.randomUUID(), name: "Новий клієнт", role: "", quote: "", image: "" }] })}>+ Додати без обмежень</button></div>{content.testimonials.map((item, index) => <div className="admin-item" key={item.id}><label>Ім’я<input value={item.name} onChange={(e) => updateTestimonial(index, { name: e.target.value })} /></label><label>Посада<input value={item.role} onChange={(e) => updateTestimonial(index, { role: e.target.value })} /></label><label>Фото — URL<input value={item.image || ""} onChange={(e) => updateTestimonial(index, { image: e.target.value })} /></label><label>Текст<textarea value={item.quote} onChange={(e) => updateTestimonial(index, { quote: e.target.value })} /></label><button className="danger" onClick={() => setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== index) })}>Видалити</button></div>)}</section>
    <section className="admin-panel"><h2>Останні заявки</h2><div className="lead-list">{initialLeads.length ? initialLeads.map((lead) => <article key={lead.id}><strong>{lead.name}</strong><a href={`mailto:${lead.email}`}>{lead.email}</a><p>{lead.message}</p><small>{lead.created_at}</small></article>) : <p>Заявок ще немає.</p>}</div></section>
  </div>;
}
