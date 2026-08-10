# Что заменить перед публикацией

Сайт собран целиком, но вся фактура — выдуманная. Ни одну строку ниже нельзя
показывать клиенту как настоящую.

## Данные (`lib/content.ts`)

| Что | Сейчас стоит | Где |
|---|---|---|
| Адрес | 1247 N Mills Ave, Orlando, FL 32803 | `shop.street/city/region/postal` |
| Координаты | 28.5606, −81.3665 | `shop.lat`, `shop.lon` — от них зависит карта |
| Телефон | (407) 555-0142 — номер из зарезервированного «киношного» диапазона, никуда не звонит | `shop.phone`, `shop.phoneDisplay` |
| Часы | Пн–Чт 11–23, Пт–Сб 11–02, Вс 12–22 | `openingHours` (schema.org), `ui.hoursRows` (показ), `SCHEDULE` в `components/FindUs.tsx` — **три места, менять все три** |
| Меню и цены | 8 позиций, $10.90–$16.90 | `menu` |
| Счётчики | 12 лет / 400 порций / 7 соусов | `counters` |
| Отзывы | 6 придуманных отзывов с придуманными авторами | `reviews` |
| Доставка | Uber Eats, DoorDash, 5 миль | `ui.find.deliveryBody` |
| Соцсети | instagram.com/shawarmalu, tiktok.com/@shawarmalu | `shop.socials` |
| Домен | https://shawarmalu.vercel.app | `shop.url` — влияет на canonical, OG и schema.org |

## Медиа (`public/media/`)

Сейчас там лежат **временные заглушки** — гладкие тёмные градиенты нужных
пропорций. Настоящие кадры сгенерированы в Higgsfield; забрать их:

```bash
node scripts/fetch-media.mjs
```

Скрипту нужен доступ к `d8j0ntlcm91z4.cloudfront.net`. Если хост закрыт
сетевой политикой — скачайте файлы вручную в эти пути:

```
public/media/hero-spit.png        общий кадр вертела, 16:9   (постер героя + LCP)
public/media/hero-spit.mp4        вертел крутится, 5 сек, без звука
public/media/slicing.png          нож срезает мясо, 16:9     (постер кадра 02)
public/media/slicing.mp4          нож срезает мясо, 5 сек, без звука
public/media/counter.png          прилавок вечером, 3:2
public/media/menu/*.png           8 позиций меню, 4:5
public/media/process/*.png        4 кадра процесса, 3:2
```

Видео сейчас отсутствуют вовсе — это не ломает страницу: герой показывает
`hero-spit.png`, кадр процесса 02 — свой постер.

## Что ещё стоит проверить

- **Карта** тянет тайлы с `basemaps.cartocdn.com`. Бесплатно, без ключа,
  атрибуция OSM + CARTO стоит в углу. В песочнице сборки хост закрыт, поэтому
  вживую карта здесь ни разу не отрисовывалась — проверьте на превью Vercel.
- **OG-картинка** — `hero-spit.png` целиком. Если нужен кроп 1200×630,
  сделайте отдельный файл и поправьте `openGraph.images` в `app/[lang]/layout.tsx`.
- **favicon** — дефолтный от Next.js.
