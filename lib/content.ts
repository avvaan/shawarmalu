/**
 * All copy and data for the landing page.
 *
 * ⚠ PLACEHOLDER FACTS — address, phone, hours, prices, delivery partners,
 * social handles and reviews are invented and must be replaced before this
 * goes live. See REPLACE.md for the full list.
 */

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
  url: "https://shawarmalu.onrender.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/shawarmalu" },
    { label: "TikTok", href: "https://tiktok.com/@shawarmalu" },
    {
      label: "Google Maps",
      href: "https://maps.google.com/?q=1247+N+Mills+Ave+Orlando+FL",
    },
  ],
};

/** Machine-readable hours for schema.org, and the display rows below. */
export const openingHours = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "11:00",
    closes: "23:00",
  },
  { days: ["Friday", "Saturday"], opens: "11:00", closes: "02:00" },
  { days: ["Sunday"], opens: "12:00", closes: "22:00" },
];

export type MenuItem = {
  id: string;
  name: string;
  note: string;
  price: number;
  tags: ("meat" | "spicy" | "veg")[];
  image: string;
  width: number;
  height: number;
};

export const menu: MenuItem[] = [
  {
    id: "chicken-classic",
    name: "Chicken Classic",
    note: "Charcoal chicken, garlic sauce, pickles.",
    price: 11.5,
    tags: ["meat"],
    image: "/media/menu/chicken-classic.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "charcoal-beef",
    name: "Charcoal Beef",
    note: "Beef with crisp edges, onion, sumac.",
    price: 13.9,
    tags: ["meat"],
    image: "/media/menu/charcoal-beef.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "chili-lamb",
    name: "Chili-Cumin Lamb",
    note: "Lamb, cumin, chili. Burns the right way.",
    price: 14.5,
    tags: ["meat", "spicy"],
    image: "/media/menu/chili-lamb.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "lu-fire",
    name: "Lu Fire",
    note: "Chicken, harissa, pickled peppers. Our name is on it.",
    price: 12.9,
    tags: ["meat", "spicy"],
    image: "/media/menu/lu-fire.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "double-meat",
    name: "Double Meat",
    note: "Double fill. Two hands required.",
    price: 16.9,
    tags: ["meat"],
    image: "/media/menu/double-meat.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "bowl",
    name: "Shawarma Bowl",
    note: "Everything, minus the bread.",
    price: 13.5,
    tags: ["meat"],
    image: "/media/menu/bowl.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "falafel",
    name: "Falafel & Green Chili",
    note: "Falafel, green chili, tahini.",
    price: 10.9,
    tags: ["veg", "spicy"],
    image: "/media/menu/falafel.webp",
    width: 1856,
    height: 2304,
  },
  {
    id: "halloumi",
    name: "Halloumi & Aubergine",
    note: "Grilled halloumi, smoked aubergine.",
    price: 11.9,
    tags: ["veg"],
    image: "/media/menu/halloumi.webp",
    width: 1856,
    height: 2304,
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
  media: string;
  poster?: string;
  kind: "image" | "video";
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Marinade",
    body: "Spice, garlic, lemon. Overnight and cold, or the meat gives nothing back.",
    media: "/media/process/1-marinade.webp",
    kind: "image",
  },
  {
    n: "02",
    title: "The spit",
    body: "Layer on layer, eight hours over coals. Only the outer edge comes off.",
    media: "/media/slicing.mp4",
    // the clip opens on this exact frame — a different poster flashes on load
    poster: "/media/slicing.webp",
    kind: "video",
  },
  {
    n: "03",
    title: "Flatbread",
    body: "Rolled in the morning, baked to order. We buy none of it in.",
    media: "/media/process/3-flatbread.webp",
    kind: "image",
  },
  {
    n: "04",
    title: "The wrap",
    body: "Slice, sauce, one turn of the paper. Twenty seconds and it's in your hand.",
    media: "/media/process/4-assembly.webp",
    kind: "image",
  },
];

export const counters = [
  { value: 12, label: "years at the spit" },
  { value: 400, label: "wraps a day" },
  { value: 7, label: "house sauces" },
];

export const reviews = [
  {
    text: "Rolled up at 11:40pm and the spit was still turning. Respect.",
    author: "Artem K.",
    source: "Google",
  },
  {
    text: "The chili lamb ruined every other wrap in Orlando for me. It's this place now.",
    author: "Dana R.",
    source: "Yelp",
  },
  {
    text: "The flatbread is thin and doesn't fall apart on the third bite. Rare.",
    author: "Murad",
    source: "Google",
  },
  {
    text: "Ordered the bowl three days straight. No regrets, some shame.",
    author: "Chris T.",
    source: "Instagram",
  },
  {
    text: "That garlic sauce is the real thing. Asked for the recipe, got laughed at.",
    author: "Lena",
    source: "Google",
  },
  {
    text: "Fast, cheap, no nonsense. Exactly what a shawarma spot should be.",
    author: "Marco P.",
    source: "Yelp",
  },
];

/* ------------------------------------------------------------------ */
/* interface copy                                                      */
/* ------------------------------------------------------------------ */

export const ui = {
  nav: {
    menu: "Menu",
    process: "How",
    about: "About",
    find: "Find us",
    order: "Order",
    close: "Close",
    skip: "Skip to menu",
  },
  hero: {
    line: "Charcoal, a spit, our own flatbread. Nothing else.",
    cta: "See the menu",
    scroll: "Scroll",
    videoAlt: "A meat spit turning slowly in warm light",
  },
  menu: {
    heading: "Eight things",
    sub: "That's the whole menu. Same every day.",
    filters: { all: "All", meat: "Meat", spicy: "Spicy", veg: "Veg" },
    count: "items",
  },
  process: {
    heading: "How it's made",
    hint: "Scroll sideways",
  },
  about: {
    heading: "We just cook meat",
    body: [
      "Shawarma Lu started with one spit on Mills Avenue and a line that wouldn't fit inside.",
      "We marinate overnight. We roll the flatbread in the morning. We cook the sauces here — seven of them, none from a jar.",
      "We don't do forty things. We do eight, the same way, every day.",
    ],
    imageAlt:
      "The Shawarma Lu counter at night: black steel and one light over the pass",
  },
  reviews: { heading: "What people say" },
  find: {
    heading: "Find us",
    address: "Address",
    hours: "Hours",
    phone: "Phone",
    delivery: "Delivery",
    deliveryBody:
      "Pickup in 10 minutes. Delivery on Uber Eats and DoorDash, five miles out, usually 30 minutes.",
    directions: "Get directions",
    call: "Call",
    today: "today",
    openNow: "Open right now",
    closedNow: "Closed right now",
    mapAlt: "Map: Shawarma Lu on North Mills Avenue, Orlando",
  },
  footer: {
    top: "Back to top",
    rights: "All rights reserved",
  },
  hoursRows: [
    { days: "Mon — Thu", time: "11am — 11pm", index: [1, 2, 3, 4] },
    { days: "Fri — Sat", time: "11am — 2am", index: [5, 6] },
    { days: "Sun", time: "12pm — 10pm", index: [0] },
  ],
  meta: {
    title: "Shawarma Lu — charcoal shawarma in Orlando",
    description:
      "Eight things, our own flatbread and seven house sauces. Mills Avenue, Orlando. Open till 11pm, 2am on Fridays and Saturdays.",
  },
};

/** Words for the marquee between sections. */
export const marqueeWords = [
  "Chicken Classic",
  "Charcoal Beef",
  "Chili-Cumin Lamb",
  "Lu Fire",
  "Double Meat",
  "Shawarma Bowl",
  "Falafel",
  "Halloumi",
  "Open till 2am",
];

export const money = (v: number) => `$${v.toFixed(2).replace(/\.00$/, "")}`;
