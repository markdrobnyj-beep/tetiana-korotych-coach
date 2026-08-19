"use client";

import Script from "next/script";

const calendlyUrl = "https://calendly.com/tanita-korotich/30min?background_color=0e3a30&text_color=ffffff&primary_color=ffffff";

export function CalendlyInline() {
  return (
    <section className="calendly-booking" aria-labelledby="calendly-heading">
      <div className="contact-divider" aria-hidden="true"><span>або</span></div>
      <div className="calendly-copy">
        <h3 id="calendly-heading">Оберіть зручний час</h3>
        <p>Забронюйте коротку зустріч у календарі — підтвердження надійде на email.</p>
      </div>
      <div className="calendly-widget-shell">
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
      <Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </section>
  );
}
