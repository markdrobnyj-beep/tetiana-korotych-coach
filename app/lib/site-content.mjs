export const NAV_ITEMS = [
  { href: "/", label: "Головна" },
  { href: "/pro-mene", label: "Про мене" },
  { href: "/posluhy", label: "Послуги" },
  { href: "/vidhuky", label: "Відгуки" },
  { href: "/kontakty", label: "Контакти" },
];

export const DEFAULT_CONTENT = {
  settings: {
    email: "korotanya@yahoo.com",
    city: "Ужгород",
    instagram: "https://www.instagram.com/tanya.korotych_coach?igsh=cGZpdDlpdWMyM2p2&utm_source=qr",
    facebook: "https://www.facebook.com/coachtanita",
    telegram: "https://t.me/tanitakor",
    heroTitle: "Тетяна Коротич",
    heroSubtitle: "Професійний сертифікований коуч (PCC, ICF)",
    heroIntro: "Допомагаю знаходити ясність, приймати сильні рішення та рухатися до цілей без втрати себе.",
  },
  images: {
    hero: "/images/tetiana-blue-portrait-2026.jpg",
    about: "/images/tetiana-portrait-2026.jpg",
    speaker: "/images/tetiana-speaking.jpg",
    gallery: [
      "/images/tetiana-portrait-2026.jpg",
      "/images/tetiana-workshop-2026.jpg",
      "/images/tetiana-stage-2026.jpg",
      "/images/tetiana-speaking.jpg",
      "/images/tetiana-blue-portrait-2026.jpg",
    ],
  },
  about: {
    title: "Про мене",
    lead: "Бізнес- і лайф-коуч",
    paragraphs: [
      "Я — HR Manager із 10-річним досвідом, і моє покликання — розвиток людського потенціалу. Як сертифікований коуч (Professional Certified Coach у ICF), я допомагаю іншим досягати їхніх цілей, зберігаючи баланс між особистим та професійним життям.",
      "Також я є бізнес-тренером із розвитку лідерських якостей і м’яких навичок (soft skills). Мені подобається підтримувати людей у їхньому прагненні до постійного вдосконалення та виявляти приховані таланти, допомагаючи їм розкрити лідерський потенціал.",
    ],
    mission: "Моя місія — допомагати людям досягати своїх цілей і насолоджуватись життям.",
    strengths: [
      "Системний бізнес-підхід",
      "Сильні питання, які допомагають дійти до суті",
      "Партнерство з клієнтом",
      "Структурність",
      "Понад 10 років досвіду в управлінні персоналом",
    ],
  },
  services: [
    {
      id: "life",
      title: "Лайф-коучинг",
      description: "Простір для особистого розвитку, впевненості, мотивації, емоційного балансу та досягнення важливих цілей.",
      prompts: [
        "Мені не вистачає впевненості",
        "Мене не влаштовує поточна ситуація",
        "Не знаю, чого я хочу",
        "Хочу емоційного балансу",
        "Хочу усвідомити свої цінності",
        "Хочу подолати свій страх",
      ],
    },
    {
      id: "business",
      title: "Бізнес-коучинг",
      description: "Допомагаю менеджерам розвивати команду, приймати нестандартні рішення та перетворювати ідеї на чіткий план дій.",
      prompts: [
        "Маю багато творчих ідей, але складно їх втілити",
        "Робота не приносить мені задоволення",
        "Хочу професійно розвиватися, але не знаю, з чого почати",
        "Хочу розвивати свою команду, але не знаю, як",
        "Хочу скласти план дій для досягнення цілей",
        "Хочу згуртувати свою команду",
        "Прокрастиную з виконанням задач",
        "Не знаю, яке рішення прийняти",
      ],
    },
    {
      id: "strategy",
      title: "Стратегічні сесії",
      description: "Проводжу стратегічні сесії для команд і бізнесів: допомагаю синхронізувати бачення, визначити пріоритети та домовитися про конкретні наступні кроки.",
      prompts: ["Сформувати спільне бачення", "Визначити пріоритети", "Узгодити план дій"],
    },
  ],
  testimonials: [
    {
      id: "anastasiia",
      name: "Анастасія Котляр",
      role: "Team Lead у Moonfare GmbH",
      image: "/images/anastasiia.avif",
      quote: "Я ціную щирий інтерес і підтримку Тетяни. За 10 місяців спільної роботи в мене з’явилося більше впевненості в собі, я отримала підвищення й навчилася помічати свої переваги. Таня допомогла визначити власні та командні цінності.",
    },
    {
      id: "serhii",
      name: "Сергій Шульга",
      role: "Онлайн-підприємець",
      image: "/images/serhii.avif",
      quote: "Таня м’якою рукою провела шляхом дослідження і створила простір, у якому мозок сам генерує те, чого раніше ніяк не міг. Я отримав бачення, відчуття легкості, фокус і мотивацію діяти.",
    },
  ],
};

export function normalizeTestimonials(items) {
  return Array.isArray(items) ? items.filter((item) => item?.name && item?.quote) : [];
}

const PROVIDED_TESTIMONIAL = {
  id: "client-business-feedback-2026",
  name: "Олександр Гостєв",
  role: "Засновник компанії PILLAR",
  image: "/images/client-testimonial-2026.jpg",
  quote: `Цінність роботи з Тетяною:
• Чесний і прямий зворотний зв'язок щодо моїх дій та результатів.
• Вміння знайти та сформулювати правильні запитання, які допомагають побачити суть проблеми.
• Спільна розробка чітких планів дій для досягнення власних цілей.
• Можливість поглянути на себе та свою ситуацію збоку.
• Корисні, професійні поради щодо бізнес-кейсів, пов'язаних із командою та партнерами.
• Допомога побачити нові можливості там, де власний погляд уже "замилився".`,
};

export function getPublicTestimonials(items) {
  const normalized = normalizeTestimonials(items);
  return normalized.some((item) => item.id === PROVIDED_TESTIMONIAL.id)
    ? normalized
    : [...normalized, PROVIDED_TESTIMONIAL];
}

export function resolveAboutImage(src) {
  return src === "/images/tetiana-wide.avif" ? "/images/tetiana-portrait-2026.jpg" : src;
}

export function resolveHomeImages(images) {
  if (!images) return images;
  return {
    ...images,
    hero: images.hero === "/images/tetiana-wide.avif" ? "/images/tetiana-blue-portrait-2026.jpg" : images.hero,
    gallery: (images.gallery || []).filter((src) => ![
      "/images/tetiana-portrait-2026.jpg",
      "/images/tetiana-speaking.jpg",
      "/images/tetiana-wide.avif",
      "/images/tetiana-blue-portrait-2026.jpg",
    ].includes(src)),
  };
}

export function resolveInstagramUrl(src) {
  const legacyUrls = new Set([
    "https://www.instagram.com/tanya.korotich_coach",
    "https://www.instagram.com/tanya.korotych_coach",
  ]);
  return legacyUrls.has(src)
    ? "https://www.instagram.com/tanya.korotych_coach?igsh=cGZpdDlpdWMyM2p2&utm_source=qr"
    : src;
}

export function validateLead(input) {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(input?.email || "").trim());
  if (!String(input?.name || "").trim() || !emailOk || !String(input?.message || "").trim()) {
    return { ok: false, message: "Заповніть ім’я, коректний email і повідомлення." };
  }
  return { ok: true, message: "Дякую! Ваше повідомлення надіслано." };
}
