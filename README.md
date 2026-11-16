# SHRISHTI storefront

A complete responsive React + TypeScript + Vite storefront concept for jewellery and Indian ethnic wear. This is a frontend-only demo: **no real orders, payments, authentication, subscriptions, or delivery services**.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. On Windows PowerShell with disabled script execution, use `npm.cmd` instead of `npm`.

```sh
npm run typecheck
npm run lint
npm run build
npm test
```

The production output is `dist/`. Deploy to a static host with an SPA fallback to `index.html` for React Router routes. Browser tests use installed Chrome or Edge on Windows; elsewhere install Playwright Chromium with `npx playwright install chromium`.

The automated suite covers full shopping flows, mobile variants and cart sizing, focus return, reduced motion, corrupted storage, image fallback, and all main pages at 360, 375, 390, 430, 768, 1024, and 1440 pixels. Representative screenshots are saved to `tests/screenshots/`.

## Included

- Home with editorial hero, eight category links, four curated collections, new arrivals, clothing feature, explicitly fictional stories, newsletter acknowledgement, and information dialogs.
- Shop, jewellery, clothing, category, collections, product details, cart, wishlist, demo checkout, and 404 routes.
- URL-backed category/type/price/search filters, sorting, product counts, and empty states.
- Debounced global search, responsive navigation and filter drawers, keyboard focus containment, Escape/backdrop closing, and reduced motion support.
- Product gallery thumbnails, swipe and arrow navigation; clothing size and colour selection; quantity controls and stock state.
- Variant-aware cart line merging, live totals, drawer and full cart page. Cart and wishlist persist in localStorage with invalid-data recovery and guarded writes.
- Two-stage simulated checkout. Finishing clears the demo bag and explicitly confirms that no order or payment occurred.

## Replace demo content

Edit `src/data/products.ts` for merchandise, prices, stock, sizes, colours, categories, tags, and materials. Photos are illustrative and do not represent the client's merchandise. Replace files in `public/assets/` with licensed client photography and update image paths. The gallery's second image is a close-cropped view of the same sample photo; replace it with a true second product shot when available. All INR formatting uses `Intl.NumberFormat`.

Edit `src/pages/Home.tsx` for editorial sections and collection destinations; `src/components/Layout.tsx` for navigation, footer information, demo policies, and newsletter acknowledgement. Global design tokens and responsive layouts are in `src/styles.css`.

The supplied spec was read completely. `shrishti_jewels_e_commerce_redesign.png` was not present, so the implementation follows the written white, ivory, gold, serif editorial design system.

## Sample imagery

Bundled sample photographs were downloaded from Unsplash (https://unsplash.com/license). No client website images were copied. Editorial saree portraits by Abhay Sachan and other Unsplash contributors; necklace displays by Zayed Ahmed Zadu. Exact image sources are recorded in `public/assets/CREDITS.md`. The kurta and bangle illustrations and image-error fallback are original SVG placeholders. DM Sans and Cormorant Garamond fonts are bundled locally with their SIL Open Font License notices and system fallbacks.

Do not treat sample descriptions, size guides, availability, prices, stories, or policies as final store claims. LocalStorage can be cleared in browser site data. No personal information is transmitted by the application.
