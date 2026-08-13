"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setStatus("");
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form)) as Record<string, string>;
      if (payload.website) throw new Error("Spam rejected");
      const delivery = await fetch("https://formsubmit.co/ajax/korotanya@yahoo.com", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone || "",
          message: payload.message,
          _subject: `Нова заявка: ${payload.subject || "коучинг"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const deliveryResult = await delivery.json().catch(() => null) as { success?: string | boolean } | null;
      if (!delivery.ok || String(deliveryResult?.success).toLowerCase() !== "true") throw new Error("Email delivery rejected");

      await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, deliveryConfirmed: "formsubmit" }),
      }).catch(() => null);
      setStatus("Дякую! Ваше повідомлення надіслано.");
      form.reset();
    } catch {
      setStatus("Не вдалося надіслати повідомлення. Спробуйте ще раз або напишіть на email.");
    } finally {
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-pair"><label>Ім’я<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div>
      <div className="field-pair"><label>Телефон<input name="phone" type="tel" autoComplete="tel" /></label><label>Тема<input name="subject" /></label></div>
      <label>Повідомлення<textarea name="message" rows={5} required /></label>
      <label className="honeypot" aria-hidden="true">Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-light" disabled={sending}>{sending ? "Надсилаю…" : "Надіслати повідомлення"}<span>↗</span></button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
