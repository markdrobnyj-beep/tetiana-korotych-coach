export type Service = { id: string; title: string; description: string; prompts: string[] };
export type Testimonial = { id: string; name: string; role: string; image?: string; quote: string };
export type SiteContent = {
  settings: { email: string; city: string; instagram: string; facebook: string; telegram: string; heroTitle: string; heroSubtitle: string; heroIntro: string };
  images: { hero: string; about: string; speaker: string; gallery?: string[] };
  about: { title: string; lead: string; paragraphs: string[]; mission: string; strengths: string[] };
  services: Service[];
  testimonials: Testimonial[];
  questions: string[];
};
