import assert from "node:assert/strict";
import test from "node:test";

import { deliverContactEmail } from "../app/lib/contact-delivery.mjs";

const lead = { name: "Олена", email: "olena@example.com", phone: "", subject: "Коучинг", message: "Вітаю" };

test("falls back to the keyless provider when the configured provider rejects the message", async () => {
  const calls = [];
  const fetcher = async (url) => {
    calls.push(url);
    return calls.length === 1
      ? new Response("{}", { status: 403 })
      : Response.json({ success: "true", message: "Email sent" });
  };
  await deliverContactEmail(lead, { RESEND_API_KEY: "bad-key" }, fetcher);
  assert.deepEqual(calls, ["https://api.resend.com/emails", "https://formsubmit.co/ajax/korotanya@yahoo.com"]);
});

test("throws when every email provider rejects the message", async () => {
  const fetcher = async () => new Response("{}", { status: 503 });
  await assert.rejects(() => deliverContactEmail(lead, {}, fetcher), /Не вдалося доставити/);
});

test("rejects a 200 response when the provider says the form is not activated", async () => {
  const fetcher = async () => Response.json({ success: "false", message: "This form needs Activation." });
  await assert.rejects(() => deliverContactEmail(lead, {}, fetcher), /активац/i);
});

test("accepts delivery only when the provider confirms success", async () => {
  const fetcher = async () => Response.json({ success: "true", message: "Email sent" });
  await deliverContactEmail(lead, {}, fetcher);
});
