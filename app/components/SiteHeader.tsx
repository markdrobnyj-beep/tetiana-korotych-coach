import { NAV_ITEMS } from "../lib/site-content.mjs";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="/" className="brand" aria-label="Тетяна Коротич — головна">
        <img className="brand-logo" src="/images/tetiana-korotych-logo.jpg" alt="Тетяна Коротич" width={42} height={42} /><small>PCC · ICF</small>
      </a>
      <nav className="desktop-nav" aria-label="Основна навігація">
        {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Відкрити меню"><span>Меню</span><i /></summary>
        <nav aria-label="Мобільна навігація">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
      </details>
    </header>
  );
}
