# Shawarma Lu

Одностраничный лендинг заведения с шаурмой на углях. Тёмная сцена, кремовый
разворот меню посередине, один горячий акцент. Next.js App Router, TypeScript,
Tailwind v4, GSAP/ScrollTrigger, Framer Motion, Lenis.

Сайт на английском, **полностью статический**: `npm run build` выдаёт папку
`out/` с готовым HTML и картинками. Ни бэкенда, ни Node-процесса в рантайме.

**Фактура на странице выдумана.** Перед публикацией пройдите [REPLACE.md](REPLACE.md).

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # → out/
```

## Как устроено

```
app/layout.tsx           шрифты, метатеги, schema.org/Restaurant
app/page.tsx             порядок секций
app/globals.css          три цвета, две гарнитуры, материалы, motion
lib/content.ts           весь текст и все данные в одном месте
lib/imageLoader.ts       подставляет нужную ширину из готовой лестницы
components/              по компоненту на секцию
assets/media/            исходники кадров — не раздаются, только собираются
public/media/            два видео, они раздаются как есть
scripts/                 fetch → optimize → build-images
```

### Картинки без сервера

Обычно `next/image` режет исходник под экран на лету, но для этого нужен
работающий Node. В статическом экспорте его нет, поэтому:

1. `scripts/build-images.mjs` перед каждой сборкой нарезает каждый кадр из
   `assets/media` в шесть ширин (192 → 1920) и кладёт в `public/img`;
2. `lib/imageLoader.ts` подставляет ближайшую ширину в `srcset`.

Браузер по-прежнему выбирает размер под свой экран, просто выбор сделан на
этапе сборки. **Три места должны совпадать:** `WIDTHS` в скрипте, `WIDTHS` в
лоадере и `imageSizes`/`deviceSizes` в `next.config.ts`.

`public/img` генерируется и не коммитится. Исходники лежат в `assets/`, а не в
`public/`, чтобы двухкилопиксельные оригиналы не уезжали в `out/` мёртвым
грузом.

Восстановить медиа с нуля: `node scripts/fetch-media.mjs` (заберёт PNG с CDN
Higgsfield), затем `node scripts/optimize-media.mjs` (сожмёт в WebP и соберёт
`public/og.jpg`).

### Палитра

| Токен | Значение | Роль |
|---|---|---|
| `--color-coal` | `#0C0B0A` | фон, текст на бумаге |
| `--color-bone` | `#E9E0D2` | текст на угле, разворот меню |
| `--color-ember` | `#E4531B` | цифры, активный фильтр, курсор, маркер |

Жар на кости даёт всего 2.9:1 — поэтому на кремовых секциях им нельзя
набирать текст, только крупная графика и заливки. Кость на угле — 14.9:1,
жар на угле — 5.2:1.

### Движение

- Скролл ведёт Lenis, он же обновляет ScrollTrigger.
- «Как готовим» пришпилена и едет вбок только на `md+`; на телефоне — нативный
  scroll-snap, не урезанная версия десктопа.
- Курсор и магнитные кнопки живут только на `hover: hover` + `pointer: fine`.
- Всё содержимое видно по умолчанию: скрытое состояние ставит только JS, так
  что без JS и при `prefers-reduced-motion: reduce` страница просто статична.

### Производительность

- Герой: `next/image` с `preload` — это LCP. Видео лежит поверх и проявляется
  по `canplay`, на телефоне не монтируется вовсе.
- Все кадры — WebP. AVIF сознательно не берём: без сервера пришлось бы жёстко
  выбрать один формат, а AVIF не понимает Safari до 16-й версии.
- Leaflet и тайлы карты грузятся только когда секция подходит к вьюпорту.

Lighthouse на статике (desktop): performance 97, accessibility 100,
best practices 100, SEO 100. LCP 1.3 с, CLS 0.

## Деплой

Render, статический сайт. Блупринт лежит в [`render.yaml`](render.yaml) —
`New → Blueprint` и указать репозиторий. Руками это `New → Static Site`:

| Поле | Значение |
|---|---|
| Branch | `main` |
| Build Command | `npm ci --include=dev && npm run build` |
| Publish Directory | `out` |
| Env `NODE_VERSION` | `22.22.2` |

`--include=dev` обязателен: Render выставляет `NODE_ENV=production`, при
котором `npm ci` пропускает devDependencies и сборка падает на отсутствующих
TypeScript и Tailwind.
