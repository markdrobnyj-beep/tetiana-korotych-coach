import { DEFAULT_CONTENT } from "../lib/site-content.mjs";

export function SiteFooter() {
  const { settings } = DEFAULT_CONTENT;
  return (
    <footer className="site-footer">
      <div><strong>Тетяна Коротич</strong><p>Професійний сертифікований коуч PCC ICF</p></div>
      <div className="footer-links">
        <a href={`mailto:${settings.email}`}>{settings.email}</a>
        <a href={settings.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href={settings.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>
        <a href={settings.telegram} target="_blank" rel="noreferrer">Telegram ↗</a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Tetiana Korotych</span><a href="/admin">Керування сайтом</a></div>
    </footer>
  );
}
