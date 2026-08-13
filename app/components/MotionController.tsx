"use client";

import { useEffect } from "react";
import { shouldRedirectFirstEntry } from "../lib/navigation-state.mjs";

const REVEAL_SELECTOR = [
  ".statement > *",
  ".trust-ribbon article",
  ".section-heading > *",
  ".speaker-feature > *",
  ".gallery-item",
  ".question-card",
  ".service-card",
  ".service-detail",
  ".about-layout > *",
  ".strength-list article",
  ".testimonial-card",
  ".contact-band > *",
  ".contact-page > *",
  ".map-card > *",
].join(",");

export function MotionController() {
  useEffect(() => {
    if (shouldRedirectFirstEntry({
      pathname: window.location.pathname,
      referrer: document.referrer,
      origin: window.location.origin,
    })) {
      window.location.replace("/");
      return;
    }

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const elements = [...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)];
    elements.forEach((element, index) => {
      element.dataset.reveal = "";
      element.style.setProperty("--reveal-order", String(index % 4));
    });

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: .08 });

    elements.forEach((element) => observer.observe(element));
    const resetScroll = () => window.scrollTo(0, 0);
    window.addEventListener("pageshow", resetScroll, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", resetScroll);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
