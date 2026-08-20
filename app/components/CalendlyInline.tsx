"use client";

import { useEffect } from "react";
import Script from "next/script";

const calendlyUrl = "https://calendly.com/tanita-korotich/30min?background_color=0e3a30&text_color=ffffff&primary_color=ffffff";

export function CalendlyInline() {
  useEffect(() => {
    function resizeCalendlyWidget(e: MessageEvent) {
      if (e.data?.event && e.data.event === "calendly.page_height") {
        const widget = document.querySelector<HTMLElement>(".calendly-inline-widget");
        const height = e.data.payload?.height;
        if (widget && Number.isFinite(height) && height > 0) widget.style.height = e.data.payload.height + "px";
      }
    }
    window.addEventListener("message", resizeCalendlyWidget);
    return () => window.removeEventListener("message", resizeCalendlyWidget);
  }, []);

  return <section className="calendly-booking" aria-labelledby="calendly-heading">
    <div className="contact-divider" aria-hidden="true"><span>або</span></div>
    <div className="calendly-copy"><h3 id="calendly-heading">Оберіть зручний час</h3><p>Забронюйте коротку зустріч у календарі — підтвердження надійде на email.</p></div>
    <div className="calendly-inline-widget" data-url={calendlyUrl} data-resize="true" />
    <Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
  </section>;
}
