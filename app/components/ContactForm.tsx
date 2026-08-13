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
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json() as { message: string };
      setStatus(result.message);
      if (response.ok) form.reset();
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
