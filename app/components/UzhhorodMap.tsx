export function UzhhorodMap() {
  return (
    <section className="map-card" aria-labelledby="map-title">
      <div className="map-copy"><p className="eyebrow">Географія</p><h2 id="map-title">Ужгород, Україна</h2><p>Працюю онлайн з клієнтами з різних країн та офлайн в Ужгороді.</p><a href="https://www.openstreetmap.org/?mlat=48.6208&mlon=22.2879#map=13/48.6208/22.2879" target="_blank" rel="noreferrer">Відкрити карту ↗</a></div>
      <iframe title="Ужгород на карті" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=22.20%2C48.57%2C22.38%2C48.68&layer=mapnik&marker=48.6208%2C22.2879" />
    </section>
  );
}
