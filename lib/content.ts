/**
 * All copy and data for the landing page.
 *
 * ⚠ PLACEHOLDER FACTS — address, phone, hours, prices, delivery partners,
 * social handles and reviews are invented and must be replaced before this
 * goes live. See REPLACE.md for the full list.
 */

export const LANGS = ["ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

type L<T> = Record<Lang, T>;

/* ------------------------------------------------------------------ */
/* facts                                                               */
/* ------------------------------------------------------------------ */

export const shop = {
  name: "Shawarma Lu",
  street: "1247 N Mills Ave",
  city: "Orlando",
  region: "FL",
  postal: "32803",
  country: "US",
  phone: "+14075550142",
  phoneDisplay: "(407) 555-0142",
  lat: 28.5606,
  lon: -81.3665,
  priceRange: "$$",
  url: "https://shawarmalu.vercel.app",
  socials: [
    { label: "Instagram", href: "https://instagram.com/shawarmalu" },
    { label: "TikTok", href: "https://tiktok.com/@shawarmalu" },
    { label: "Google Maps", href: "https://maps.google.com/?q=1247+N+Mills+Ave+Orlando+FL" },
  ],
};

/** Machine-readable hours for schema.org, and the display rows below. */
export const openingHours = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "23:00" },
  { days: ["Friday", "Saturday"], opens: "11:00", closes: "02:00" },
  { days: ["Sunday"], opens: "12:00", closes: "22:00" },
];

export type MenuItem = {
  id: string;
  name: L<string>;
  note: L<string>;
  price: number;
  tags: ("meat" | "spicy" | "veg")[];
  image: string;
  width: number;
  height: number;
};

export const menu: MenuItem[] = [
  {
    id: "chicken-classic",
    name: { ru: "Классик с курицей", en: "Chicken Classic" },
    note: {
      ru: "Курица с углей, чесночный соус, соленья.",
      en: "Charcoal chicken, garlic sauce, pickles.",
    },
    price: 11.5,
    tags: ["meat"],
    image: "/media/menu/chicken-classic.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "charcoal-beef",
    name: { ru: "Говядина на углях", en: "Charcoal Beef" },
    note: {
      ru: "Говядина с хрустящим краем, лук, сумах.",
      en: "Beef with crisp edges, onion, sumac.",
    },
    price: 13.9,
    tags: ["meat"],
    image: "/media/menu/charcoal-beef.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "chili-lamb",
    name: { ru: "Баранина с чили и зирой", en: "Chili-Cumin Lamb" },
    note: {
      ru: "Баранина, зира, чили. Жжёт как надо.",
      en: "Lamb, cumin, chili. Burns the right way.",
    },
    price: 14.5,
    tags: ["meat", "spicy"],
    image: "/media/menu/chili-lamb.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "lu-fire",
    name: { ru: "Лу Файр", en: "Lu Fire" },
    note: {
      ru: "Курица, харисса, маринованный перец. Наше имя на кону.",
      en: "Chicken, harissa, pickled peppers. Our name is on it.",
    },
    price: 12.9,
    tags: ["meat", "spicy"],
    image: "/media/menu/lu-fire.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "double-meat",
    name: { ru: "Двойное мясо", en: "Double Meat" },
    note: {
      ru: "Двойная порция. Одной рукой не удержишь.",
      en: "Double fill. Two hands required.",
    },
    price: 16.9,
    tags: ["meat"],
    image: "/media/menu/double-meat.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "bowl",
    name: { ru: "Шаурма-боул", en: "Shawarma Bowl" },
    note: { ru: "Всё то же, без лепёшки.", en: "Everything, minus the bread." },
    price: 13.5,
    tags: ["meat"],
    image: "/media/menu/bowl.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "falafel",
    name: { ru: "Фалафель с зелёным чили", en: "Falafel & Green Chili" },
    note: {
      ru: "Фалафель, зелёный чили, тахини.",
      en: "Falafel, green chili, tahini.",
    },
    price: 10.9,
    tags: ["veg", "spicy"],
    image: "/media/menu/falafel.png",
    width: 1856,
    height: 2304,
  },
  {
    id: "halloumi",
    name: { ru: "Халуми и баклажан", en: "Halloumi & Aubergine" },
    note: {
      ru: "Халуми с решётки, копчёный баклажан.",
      en: "Grilled halloumi, smoked aubergine.",
    },
    price: 11.9,
    tags: ["veg"],
    image: "/media/menu/halloumi.png",
    width: 1856,
    height: 2304,
  },
];

export type Step = {
  n: string;
  title: L<string>;
  body: L<string>;
  media: string;
  poster?: string;
  kind: "image" | "video";
  width: number;
  height: number;
};

export const steps: Step[] = [
  {
    n: "01",
    title: { ru: "Маринад", en: "Marinade" },
    body: {
      ru: "Специи, чеснок, лимон. Ночь в холоде — иначе мясо не отдаёт.",
      en: "Spice, garlic, lemon. Overnight and cold, or the meat gives nothing back.",
    },
    media: "/media/process/1-marinade.png",
    kind: "image",
    width: 2528,
    height: 1696,
  },
  {
    n: "02",
    title: { ru: "Вертел", en: "The spit" },
    body: {
      ru: "Слой за слоем, восемь часов над углями. Срезаем только внешний край.",
      en: "Layer on layer, eight hours over coals. Only the outer edge comes off.",
    },
    media: "/media/slicing.mp4",
    // the clip opens on this exact frame — a different poster flashes on load
    poster: "/media/slicing.png",
    kind: "video",
    width: 2528,
    height: 1696,
  },
  {
    n: "03",
    title: { ru: "Лепёшка", en: "Flatbread" },
    body: {
      ru: "Раскатываем утром, печём под заказ. Покупных у нас нет.",
      en: "Rolled in the morning, baked to order. We buy none of it in.",
    },
    media: "/media/process/3-flatbread.png",
    kind: "image",
    width: 2528,
    height: 1696,
  },
  {
    n: "04",
    title: { ru: "Сборка", en: "The wrap" },
    body: {
      ru: "Срез, соус, поворот бумаги. Двадцать секунд — и она у вас в руках.",
      en: "Slice, sauce, one turn of the paper. Twenty seconds and it's in your hand.",
    },
    media: "/media/process/4-assembly.png",
    kind: "image",
    width: 2528,
    height: 1696,
  },
];

export const counters = [
  { value: 12, label: { ru: "лет у вертела", en: "years at the spit" } },
  { value: 400, label: { ru: "порций в день", en: "wraps a day" } },
  { value: 7, label: { ru: "своих соусов", en: "house sauces" } },
];

export const reviews: { text: L<string>; author: string; source: L<string> }[] = [
  {
    text: {
      ru: "Заехал в 23:40, вертел ещё крутился. Уважение.",
      en: "Rolled up at 11:40pm and the spit was still turning. Respect.",
    },
    author: "Артём К.",
    source: { ru: "Google", en: "Google" },
  },
  {
    text: {
      ru: "Баранина с чили испортила мне все остальные шаурмы в Орландо. Теперь только сюда.",
      en: "The chili lamb ruined every other wrap in Orlando for me. It's this place now.",
    },
    author: "Dana R.",
    source: { ru: "Yelp", en: "Yelp" },
  },
  {
    text: {
      ru: "Лепёшка тонкая и не разваливается на третьем укусе. Редкость.",
      en: "The flatbread is thin and doesn't fall apart on the third bite. Rare.",
    },
    author: "Мурад",
    source: { ru: "Google", en: "Google" },
  },
  {
    text: {
      ru: "Брал боул три дня подряд. Ни капли сожаления, немного стыда.",
      en: "Ordered the bowl three days straight. No regrets, some shame.",
    },
    author: "Chris T.",
    source: { ru: "Instagram", en: "Instagram" },
  },
  {
    text: {
      ru: "Чесночный соус — тот самый. Спросил рецепт, посмеялись.",
      en: "That garlic sauce is the real thing. Asked for the recipe, got laughed at.",
    },
    author: "Лена",
    source: { ru: "Google", en: "Google" },
  },
  {
    text: {
      ru: "Быстро, недорого, без выпендрёжа. Ровно то, чем шаурма и должна быть.",
      en: "Fast, cheap, no nonsense. Exactly what a shawarma spot should be.",
    },
    author: "Marco P.",
    source: { ru: "Yelp", en: "Yelp" },
  },
];

/* ------------------------------------------------------------------ */
/* interface copy                                                      */
/* ------------------------------------------------------------------ */

export const ui = {
  nav: {
    menu: { ru: "Меню", en: "Menu" },
    process: { ru: "Как готовим", en: "How" },
    about: { ru: "О нас", en: "About" },
    find: { ru: "Найти нас", en: "Find us" },
    order: { ru: "Заказать", en: "Order" },
  },
  hero: {
    line: {
      ru: "Уголь, вертел, своя лепёшка. Ничего лишнего.",
      en: "Charcoal, a spit, our own flatbread. Nothing else.",
    },
    cta: { ru: "Смотреть меню", en: "See the menu" },
    scroll: { ru: "Вниз", en: "Scroll" },
    videoAlt: {
      ru: "Вертел с мясом медленно вращается в тёплом свете",
      en: "A meat spit turning slowly in warm light",
    },
  },
  menu: {
    heading: { ru: "Восемь позиций", en: "Eight things" },
    sub: {
      ru: "Больше не нужно. Каждая — каждый день одинаково.",
      en: "That's the whole menu. Same every day.",
    },
    filters: {
      all: { ru: "Всё", en: "All" },
      meat: { ru: "Мясо", en: "Meat" },
      spicy: { ru: "Острое", en: "Spicy" },
      veg: { ru: "Вег", en: "Veg" },
    },
    empty: { ru: "Здесь пока пусто.", en: "Nothing here yet." },
    count: { ru: "позиций", en: "items" },
  },
  process: {
    heading: { ru: "Как это делается", en: "How it's made" },
    hint: { ru: "Листайте вбок", en: "Scroll sideways" },
  },
  about: {
    heading: { ru: "Мы просто жарим мясо", en: "We just cook meat" },
    body: {
      ru: [
        "Shawarma Lu начинался с одного вертела на Миллс-авеню и очереди, которая не помещалась внутрь.",
        "Мясо маринуем сами, с вечера. Лепёшку раскатываем утром. Соусы варим на месте — их семь, и ни один не из банки.",
        "Мы не делаем сорок позиций. Мы делаем восемь и делаем их каждый день одинаково хорошо.",
      ],
      en: [
        "Shawarma Lu started with one spit on Mills Avenue and a line that wouldn't fit inside.",
        "We marinate overnight. We roll the flatbread in the morning. We cook the sauces here — seven of them, none from a jar.",
        "We don't do forty things. We do eight, the same way, every day.",
      ],
    },
    imageAlt: {
      ru: "Прилавок Shawarma Lu вечером: чёрная сталь и свет над раздачей",
      en: "The Shawarma Lu counter at night: black steel and one light over the pass",
    },
  },
  reviews: {
    heading: { ru: "Что говорят", en: "What people say" },
  },
  find: {
    heading: { ru: "Найти нас", en: "Find us" },
    address: { ru: "Адрес", en: "Address" },
    hours: { ru: "Часы", en: "Hours" },
    phone: { ru: "Телефон", en: "Phone" },
    delivery: { ru: "Доставка", en: "Delivery" },
    deliveryBody: {
      ru: "Самовывоз — 10 минут. Доставка Uber Eats и DoorDash, пять миль вокруг, обычно 30 минут.",
      en: "Pickup in 10 minutes. Delivery on Uber Eats and DoorDash, five miles out, usually 30 minutes.",
    },
    directions: { ru: "Проложить маршрут", en: "Get directions" },
    call: { ru: "Позвонить", en: "Call" },
    today: { ru: "сегодня", en: "today" },
    openNow: { ru: "Сейчас открыто", en: "Open right now" },
    closedNow: { ru: "Сейчас закрыто", en: "Closed right now" },
    mapAlt: {
      ru: "Карта: Shawarma Lu на Норт-Миллс-авеню, Орландо",
      en: "Map: Shawarma Lu on North Mills Avenue, Orlando",
    },
  },
  footer: {
    top: { ru: "Наверх", en: "Back to top" },
    rights: { ru: "Все права защищены", en: "All rights reserved" },
    langLabel: { ru: "Язык", en: "Language" },
  },
  days: {
    ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  hoursRows: {
    ru: [
      { days: "Пн — Чт", time: "11:00 — 23:00", index: [1, 2, 3, 4] },
      { days: "Пт — Сб", time: "11:00 — 02:00", index: [5, 6] },
      { days: "Вс", time: "12:00 — 22:00", index: [0] },
    ],
    en: [
      { days: "Mon — Thu", time: "11am — 11pm", index: [1, 2, 3, 4] },
      { days: "Fri — Sat", time: "11am — 2am", index: [5, 6] },
      { days: "Sun", time: "12pm — 10pm", index: [0] },
    ],
  },
  meta: {
    title: {
      ru: "Shawarma Lu — шаурма на углях в Орландо",
      en: "Shawarma Lu — charcoal shawarma in Orlando",
    },
    description: {
      ru: "Восемь позиций, своя лепёшка и семь соусов. Миллс-авеню, Орландо. Открыто до 23:00, по пятницам и субботам до двух ночи.",
      en: "Eight things, our own flatbread and seven house sauces. Mills Avenue, Orlando. Open till 11pm, 2am on Fridays and Saturdays.",
    },
  },
};

/** Words for the marquee between sections. */
export const marqueeWords: L<string[]> = {
  ru: [
    "Классик с курицей",
    "Говядина на углях",
    "Баранина с чили",
    "Лу Файр",
    "Двойное мясо",
    "Шаурма-боул",
    "Фалафель",
    "Халуми",
    "Открыто до двух ночи",
  ],
  en: [
    "Chicken Classic",
    "Charcoal Beef",
    "Chili-Cumin Lamb",
    "Lu Fire",
    "Double Meat",
    "Shawarma Bowl",
    "Falafel",
    "Halloumi",
    "Open till 2am",
  ],
};

export const money = (v: number) =>
  `$${v.toFixed(2).replace(/\.00$/, "")}`;
