const RECIPIENT = "korotanya@yahoo.com";

export async function deliverContactEmail(input, runtime, fetcher = fetch) {
  const subject = `Нова заявка: ${input.subject || "коучинг"}`;
  if (runtime.RESEND_API_KEY) {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${runtime.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: runtime.RESEND_FROM || "Tetiana Korotych <onboarding@resend.dev>",
        to: [RECIPIENT],
        reply_to: input.email,
        subject,
        text: `${input.name}\n${input.email}\n${input.phone || ""}\n\n${input.message}`,
      }),
    });
    if (response.ok) return;
  }

  const response = await fetcher(`https://formsubmit.co/ajax/${RECIPIENT}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone || "",
      message: input.message,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _url: "https://tetianakorotych.coach/kontakty",
    }),
  });
  if (!response.ok) throw new Error("Не вдалося доставити повідомлення електронною поштою.");
  const result = await response.json().catch(() => null);
  if (String(result?.success).toLowerCase() !== "true") {
    const activationNeeded = /activation/i.test(String(result?.message || ""));
    throw new Error(activationNeeded
      ? "Поштова форма очікує активації власницею сайту."
      : "Поштовий сервіс не підтвердив доставку повідомлення.");
  }
}
