# SHRISHTI — Responsive Jewellery & Ethnic-Wear Storefront
## Implementation specification for Codex (working UI prototype)

> **Primary instruction:** Build a polished, runnable, responsive e-commerce frontend in this working session. Do not stop at scaffolding, wireframes, static screenshots, or an implementation plan. Every advertised UI interaction must work with mock data. This is a **frontend-only client demo**, not a live store.

## 1. What you are building

Redesign **Shrishti Jewels** as a clean, modern, premium online store selling **jewellery and clothing / Indian ethnic wear**. The approved visual direction is **minimal white + warm ivory + golden yellow**, with refined editorial product imagery. The current website screenshots are inspiration for merchandise categories only; **do not reproduce the old site's cramped layout**.

**Visual reference:** `shrishti_jewels_e_commerce_redesign.png` (place alongside this spec if available). Follow the reference's *design language and desktop/mobile layouts*, but implement real responsive pages, not a screenshot recreation. Make it a little more polished where appropriate.

**Success condition:** A client can open the site on a desktop or a phone and successfully browse jewellery and clothing, search, filter, sort, view product details, add/remove products, change quantities, save wishlist items, and move through a clearly labeled demo checkout UI. No real orders or payments.

## 2. Development workflow — do the work now

1. Inspect the current repository before making changes. If an app exists, preserve its framework and dependencies where reasonable; do not overwrite unrelated client work.
2. If the folder is empty, create a **React + TypeScript + Vite** app. Use Tailwind CSS if it is already configured or helpful; clean CSS modules / standard CSS are equally acceptable. Use **React Router** or the project's existing router for pages. Use Lucide icons or a similar lightweight icon set.
3. Implement reusable components, mock data, navigation and fully functional demo interactions.
4. Run install, lint/typecheck, and production build. Launch locally and fix errors. If a browser test runner is available, test the main interactions and responsive views.
5. Complete the design and interaction testing within this session. Do not stop after writing TODOs or saying how to build it.
6. Report the exact local run command, completed features, and any genuinely untested or incomplete parts. **Do not claim payments or real checkout work.**

## 3. Visual design system

- **Background:** `#FFFFFF`; section alternate / warm ivory `#FFFBF3`; light surfaces `#FFF6E5`.
- **Primary brand yellow / gold:** `#D4A017` (buttons, active states, icon accents); hover `#B9860C`.
- **Secondary champagne:** `#F4E2C3`; borders `#EDE6D8`.
- **Text:** deep charcoal `#252525`; secondary text `#6B655D`.
- Use gold purposefully. **Do not fill the whole interface with yellow**; preserve whitespace and good contrast.
- Pair a sophisticated **serif for editorial headings** (e.g. Playfair Display, Cormorant Garamond, or a close system fallback) with a **clean sans-serif UI font** (e.g. Inter).
- Editorial typography, tasteful spacing, consistent `12–16px` corner radii for cards, subtle shadows, high-quality imagery.
- Layout width desktop: `max-width: 1200–1280px` with comfortable gutters; no stretched product photos.
- Product images should have consistent aspect ratio, `object-fit: cover`, good cropping, graceful image-error fallback, and lazy loading below the fold.
- Present it as an actual refined storefront, **not** as a Figma presentation board with annotations.

## 4. Responsive and mobile-first behavior (non-negotiable)

- Optimize thoroughly for **360px, 375px, 390px, 430px, 768px, 1024px, 1440px** and above.
- No horizontal overflow or clipped prices/buttons; no text smaller than is comfortably readable.
- Mobile header: logo, search access, wishlist, cart badge, and a clear menu button. Use an accessible slide-out navigation menu.
- Mobile homepage: **vertical, image-first hero**, readable headline, clearly visible **Shop Jewellery** and **Shop Clothing** CTAs; compact swipeable category strip; two-column product grid.
- Desktop homepage: prominent editorial hero, horizontal category row, curated collections grid, five-ish products per row where space permits.
- Product listing: 2 columns on phones, 3–4 on tablets, 4–5 on wide desktop. Filter UI becomes an accessible bottom sheet / drawer on mobile; sort remains visible.
- Product details: image gallery first on phones; desktop image gallery beside product information. **Sticky add-to-cart CTA on mobile** only where it improves usability; account for safe-area insets.
- Cart: fast right-side drawer on desktop; full-height bottom sheet or full-screen drawer on mobile. Never make it narrower than usable.
- Touch targets generally >=44 × 44px; hover-only actions must have a visible touch alternative.
- Respect reduced-motion accessibility preferences and keep layout shifts minimal.

## 5. Page structure and required sections

### A. Home (`/`)

Implement **all** of these sections with real-looking **placeholder content** rather than empty rectangles:

1. **Announcement strip** — one short demo message such as “Discover our festive edit” (do not invent guarantees about shipping/returns).
2. **Sticky / compact header** — SHRISHTI wordmark (text logo is acceptable), Jewellery, Bridal, Clothing, Collections, search, wishlist, account UI, cart badge.
3. **Editorial hero** — Indian festive/bridal fashion image, headline “Jewellery & Ethnic Wear for Every Celebration”, short supporting copy, **Shop Jewellery** and **Shop Clothing** buttons; optional subtle carousel with working arrows/dots.
4. **Shop by Category** — Jewellery, Bridal Sets, Earrings, Necklaces, Bangles, Sarees, Kurtas, Festive Wear. Every category opens a populated filtered catalogue.
5. **Curated Collections** — 3 or 4 visually rich cards: Bridal Edit, Temple Classics, Festive Looks, Sarees Edit. Cards navigate to appropriate product listings.
6. **New Arrivals** — populated product cards (mixed or featured), price in INR, photo, title, wishlist heart, optional demo sale badge, Quick Add or Add to Cart.
7. **Clothing / Ethnic-Wear feature** — a clean banner clearly selling sarees, kurtas and occasion wear, with working CTA. Clothing must not be an afterthought.
8. **Customer Stories** — 2–3 explicitly fictional/demo testimonials or neutral placeholders; do not present them as verified customer reviews.
9. **Footer** — Shop, Information, Contact placeholders, newsletter UI with local demo acknowledgement, and social icon placeholders. No dead `#` links; use working pages, modal placeholders, or visibly disabled controls.

### B. Catalogue (`/shop`, `/jewellery`, `/clothing`, `/category/:slug`)

- Product listing with **working category filters, product-type filters, price range or price brackets, search results, and sorting** (price low/high, newest, name).
- Show product count, active filters, clear-filters button, meaningful empty state.
- Every product card opens the correct product details page.
- Desktop sidebar filters or filter popover; mobile filter sheet.

### C. Product details (`/product/:slug`)

- Product image gallery with thumbnail selection and active indicator.
- Name, category, INR price, optional original-price comparison for demo products, short description, material/size details marked as demo, quantity stepper, stock/availability demo indicator.
- Working **Add to Cart**, **Buy Now (demo checkout)**, wishlist, and breadcrumb / back navigation.
- For clothing, show size choices (S/M/L/XL) and selectable colour if appropriate. Require a size before adding apparel to cart; jewellery needs no size unless specified.
- Show 3–4 related product cards with working navigation.

### D. Cart

- Working cart **drawer + dedicated `/cart` page** or equivalent.
- Show product image, title, unit price, selected variants, quantity controls (+/−), remove item, subtotal, item count and empty-cart state.
- Correctly recalculate all totals and badges after each action. Quantity minimum = 1; avoid duplicate lines for same product/variant.
- Keep cart state in `localStorage`, including reload persistence; validate stored data and recover gracefully from invalid/corrupted values.
- Provide Continue Shopping and **Proceed to Checkout** buttons.
- **Checkout is UI-only**: a clearly labeled demo screen/modal showing order summary and a simulated confirmation if appropriate. No payment gateway, no card detail collection, no real order submission.

### E. Wishlist (`/wishlist`)

- Add/remove products via hearts; persist locally; empty state; add-to-cart option; consistent heart state across all views.

### F. Search

- Header search field (desktop) and accessible mobile search overlay/page.
- Search works across names, categories and keywords. Show matching products and an empty-result state.
- Debounce text input appropriately; never require a backend.

## 6. Mock catalogue and assets

- Provide **at least 20–24 items** split meaningfully across jewellery and apparel; do not build a jewellery-only catalogue.
- Categories should include necklaces, earrings, bridal sets, bangles, sarees, kurtas and festive wear.
- Suggested demo product naming style: Ruby Palakka Necklace, Temple Jhumka Earrings, Coin Onam Necklace, Kemp Bangles, Festive Silk Saree, Embroidered Kurta Set, Cotton Blend Kurta, Bridal Kundan Set.
- Each product needs a stable ID/slug, title, category, type, current INR price, optional original price, description, tags, images, stock flag, and optional sizes/colors.
- Keep mock data in a dedicated typed file (`src/data/products.ts` or equivalent), not scattered through components.
- Use visually appropriate sample photographs with a stable, permissibly usable source and attribution if required. If suitable external photos aren't reliably available, include locally stored placeholder images or tasteful SVG/image placeholders. **No broken image links** and no misleading claim that sample photos are the client's actual merchandise.
- Do not scrape/copy the client's existing product images without explicit authorization. The owner will replace all mock photos/copy/prices later.
- All fictional delivery claims, discounts, ratings, testimonials or policies must be labeled as demo or left out.

## 7. Interaction and animation specifications

This must feel **snappy, premium, responsive**, not floaty or over-animated.

| Interaction | Target behavior |
|---|---|
| Buttons / taps | Immediate feedback, crisp press scale (~0.98), 100–160ms |
| Hover product card (desktop) | Small lift (`translateY(-3px)`), soft shadow, 150–220ms |
| Hero copy/image | One gentle fade + short translate on load, 300–450ms |
| Cart drawer | Smooth transform slide-in/out, approx. 200–260ms |
| Mobile menu / filter sheet | 180–250ms slide transition with scrim |
| Wishlist toggle | Immediate colour / icon feedback, subtle 120–180ms pop |
| Quick Add | Clear success state and updated cart badge; no full-page reload |
| Gallery / carousel | Swipe-friendly, discreet controls, no jarring jumps |
| Section entrance (optional) | Light reveal once on entering viewport, avoid animating everything |

- Prefer CSS transforms/opacity for GPU-friendly animation; use Framer Motion / Motion only if it materially helps and doesn't bloat dependencies.
- Avoid giant parallax effects, infinite hover animations, heavy scroll-jacking, autoplay videos, and overly slow transitions.
- Interaction must feel good on real mobile touch devices, not just mouse hover in desktop Chrome.
- Respect `prefers-reduced-motion: reduce`, keyboard focus, and visible click feedback.

## 8. Accessibility, quality and performance

- Semantic headings/landmarks, meaningful labels and alt text, visible keyboard focus.
- Dialog/drawer focus management, Escape-to-close, backdrop-close, and sensible return of focus.
- Contrast that meets WCAG AA where feasible; gold text on white must not be illegible.
- Format money with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
- Prevent stale cart totals, double adds, broken navigation, unresponsive buttons, or crashes on refresh.
- Mobile performance: optimize images, lazy-load below fold, keep initial JS lightweight, avoid layout thrash.
- Desktop and mobile navigation must be functional, not decorative.
- Keep UI state clean, components modular, and avoid unnecessary backend work.

## 9. Implementation organization (suggestion, adapt to repo)

- `src/components/layout/` — Header, MobileMenu, Footer, AnnouncementBar
- `src/components/store/` — ProductCard, CategoryCard, ProductGrid, Gallery, FilterSheet, CartDrawer, WishlistButton
- `src/pages/` — Home, Catalogue, ProductDetail, Cart, Wishlist, DemoCheckout, NotFound
- `src/data/products.ts` — all demo product data
- `src/state/` — cart/wishlist state using Context + reducer, Zustand, or existing project approach
- `src/styles/` — tokens, global styling, motion rules
- `public/assets/` — bundled sample images, if used
- `README.md` — installation, local run, production build, what is demo-only, replacement guide for content/images

**Avoid overengineering:** no backend, authentication, payment provider, CMS, database, order emails, or real inventory sync in this phase.

## 10. Acceptance test checklist — demonstrate or verify

- [ ] `npm install` (or current package manager) succeeds.
- [ ] Development server starts and site renders without errors.
- [ ] Production build succeeds.
- [ ] Home has every required section with meaningful content and both jewellery/clothing represented.
- [ ] Desktop navbar, mobile hamburger menu, hero CTAs and collection cards navigate correctly.
- [ ] Search and filters return sensible results; sorting changes ordering.
- [ ] Product details load for jewellery and apparel; size selection works for apparel.
- [ ] Add to Cart works on both catalogue and product pages.
- [ ] Cart drawer opens/closes, quantity +/- works, remove works, cart badge and subtotal match.
- [ ] Cart persists across refresh; wishlist persists and remains consistent across pages.
- [ ] Demo checkout clearly says **no real payment/order**.
- [ ] At 360/390/430px width, no overflow, cropped CTA, unusable drawer, or tiny tap targets.
- [ ] At 768px and 1440px, layout remains balanced and premium.
- [ ] Motion feels fast and reduced-motion preference is supported.
- [ ] All demo images load or show graceful local fallbacks.
- [ ] No critical console, TypeScript, or lint errors.

## 11. Deliverables and completion criteria

Before ending this session:

1. Deliver a **working storefront in the repository**, not just a mockup image or a design description.
2. Share exact commands to run and build locally.
3. Explain what's implemented, what uses placeholders, and where the client can replace product content later.
4. Explicitly label cart and checkout **demo-only**.
5. If a required tool or asset is unavailable, implement the best functional fallback, identify the limitation clearly, and continue with everything else that can be completed.

**Final quality bar:** It should look like a convincing, client-presentable jewellery + ethnic-wear store on **both phone and desktop**, with fast, meaningful interactions and an actually functioning **frontend-only cart**.
