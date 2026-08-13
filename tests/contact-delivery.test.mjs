import assert from "node:assert/strict";
import test from "node:test";

import { deliverContactEmail } from "../app/lib/contact-delivery.mjs";

const lead = { name: "Олена", email: "olena@example.com", phone: "", subject: "Коучинг", message: "Вітаю" };

test("falls back to the keyless provider when the configured provider rejects the message", async () => {
  const calls = [];
  const fetcher = async (url) => {
    calls.push(url);
    return new Response("{}", { status: calls.length === 1 ? 403 : 200 });
  };
  await deliverContactEmail(lead, { RESEND_API_KEY: "bad-key" }, fetcher);
  assert.deepEqual(calls, ["https://api.resend.com/emails", "https://formsubmit.co/ajax/korotanya@yahoo.com"]);
});

test("throws when every email provider rejects the message", async () => {
  const fetcher = async () => new Response("{}", { status: 503 });
  await assert.rejects(() => deliverContactEmail(lead, {}, fetcher), /Не вдалося доставити/);
});
