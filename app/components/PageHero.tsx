export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p className="page-intro">{text}</p>}</section>;
}
