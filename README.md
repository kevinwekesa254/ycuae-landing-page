# Handoff: youcloud SMB UAE Landing Page

> **Redesign, 16 Oct 2026 — visual language now follows youcloud.ae.** The copy, sections, forms and behaviour below are unchanged. The *visual* spec in this document (Bricolage/Inter/JetBrains Mono, cream background, italic headline half, mono eyebrow pills, the SVG mark) is superseded by:
>
> - **Tokens** — `colors_and_type.css`: coral `#f96067` (hover `#e8464f`), navy `#0a1c3a`, page `#fbfbf8`, body text `#4b5671`, lines `#e3e6ee` / `#c9cedb`, product-shot pink `#dcc3c9`, green `#22c55e`. Poppins (display, 400 for H1, 500 for numbers), Calibri → Carlito (body; labels are bold uppercase body, no mono), Noto Kufi Arabic for RTL.
> - **Components** — `site.css`, class-based (no inline styles in `Shell.jsx` / `Sections.jsx`): 56px buttons with 8px radius, segmented EN/عربي toggle, coral trust band under the hero, navy system card, photo merchant cards with youcloud.ae product shots, split closing CTA, navy footer. Sections fade in on scroll; `prefers-reduced-motion` turns this off.
> - **Logo** — `assets/logo.png` / `assets/logo-white.png`, the wordmark artwork from youcloud.ae (replaces the traced SVG mark).
> - **Images** — from youcloud.ae: `hero-cashier.jpg`, `retail-store.webp`, `fnb-owner.webp`, `hw-y1000/4000/5000/7000.webp`, `dubai-night.jpg`. From Unsplash (free Unsplash License): `sell-online.jpg` — Vitaly Gariev, unsplash.com/photos/e7DxwVzL0hk; `campaigns.jpg` — Austin Distel, unsplash.com/photos/TluMvvrZ57g.
> - The older assets (`hero-uae.jpg`, `portrait-merchant.jpg`, `fb-restaurant.jpg`, `y*.png`, `youcloud-mark.svg`) are no longer referenced.
>
> **Content aligned with youcloud.ae, 22 Oct 2026.** Supersedes the sections below where they differ:
> - **Enquiry form** no longer has a "demo mode". It emails every enquiry via FormSubmit to `sales@youcloud.ae` with `arun@youcloudpay.com` on CC (same route as the main site); `ENQUIRY_WEBHOOK_URL` is now an optional extra. If sending fails, the form offers a pre-filled email instead.
> - **No phone numbers** are shown: the footer phone row is replaced by `support@youcloud.ae`, and the WhatsApp sheet no longer prints the number (the `wa.me` link still uses the placeholder `WHATSAPP_NUMBER`).
> - **Languages** are English and Arabic only (Hindi/Tagalog removed, Devanagari font dropped). The Arabic headline line under the hero shows only on the Arabic page.
> - **Amounts** use the UAE Dirham symbol (`assets/dirham.svg`, `.dh` in `site.css`) via `money()` in `Shell.jsx`. Device names are lowercase (`y1000`, `y5000`…). In Arabic, `T+2` is wrapped in Unicode isolates so it stays left-to-right.

## Overview

A bilingual (English / Arabic) marketing landing page for **youcloud** — a UAE commerce platform selling POS hardware plus a built-in business app to small and medium businesses: groceries, cafés, restaurants, salons and people who want to start selling online.

The page has one job: get a UAE shop or restaurant owner to submit an enquiry or start a WhatsApp conversation. It does that by leading with a hard price (AED 19/month), showing the two device pairings for retail and F&B, proving that bookkeeping/VAT/payroll are built in rather than bolted on, and adding two SMB-specific pitches — selling online from existing shelf stock, and AI-written WhatsApp/Instagram/Facebook campaigns.

The page is a **single scrolling page** with a sticky header and a floating WhatsApp button. There is no second page.

---

## About the Design Files

**The files in this bundle are design references created in HTML.** They are prototypes showing the intended look, layout and behaviour — they are **not production code to copy directly**.

The prototype is deliberately built the simplest possible way: a single HTML file that pulls in React 18 and Babel Standalone from a CDN, with four `.jsx` files loaded as `<script type="text/babel">`. Babel compiles JSX in the browser at runtime. **Do not ship this.** It is slow to first paint and the Babel warning appears in the console.

**The task is to recreate these designs in the target codebase's existing environment** (React, Vue, Next.js, Astro, SwiftUI, Flutter, etc.) using its established patterns, component library and build tooling — or, if no environment exists yet, to pick the most appropriate framework for the project and implement the designs there. For a marketing landing page with one route, Next.js (App Router) or Astro is the natural choice; either gives you real i18n routing and image optimisation.

Concretely, the developer should:

1. Port each section in `Sections.jsx` into a real component in the target framework.
2. Move the two language dictionaries out of `i18n.jsx` into the framework's i18n solution (e.g. `next-intl`, `react-i18next`, or Astro's i18n routes) rather than the flat object used here.
3. Replace the CSS custom properties in `colors_and_type.css` with the design tokens already in the codebase, if one exists. If not, adopt that file's variables as-is.
4. Replace the inline `style={{}}` objects with the codebase's styling approach (CSS Modules, Tailwind, styled-components). The inline styles are used purely to keep the prototype in one file.
5. Serve the images through the framework's image pipeline rather than as flat files.

---

## Fidelity

**High-fidelity (hifi).** These are pixel-accurate mockups with final colours, typography, spacing, radii, shadows, copy and interaction states. Recreate the UI pixel-perfectly using the codebase's existing libraries and patterns.

Everything needed is documented below. Where a value is stated as a hex code, a px value or a token name, it is final and was measured from the running prototype, not estimated.

**Two things are deliberately incomplete** and must not be treated as final:

- **The WhatsApp number** is the placeholder `+971500000000`. Replace it with the real UAE sales number.
- **The enquiry webhook URL** is empty, so the form runs in "demo mode". See *State Management → Form submission*.

---

## Screens / Views

The page is one view. Sections appear in this order.

---

### 1. Sticky Header (`Nav`)

**Purpose:** persistent brand, section navigation and the primary conversion button.

**Layout:** full-width, sticky to the top (`position: sticky; top: 0; z-index: 60`). Inner content is a flex row with `justify-content: space-between`, `align-items: center`, `gap: 20px`, constrained to `max-width: 1240px` and centred, with `padding: 14px var(--gutter)`.

**Styling:** background `rgba(255, 248, 242, 0.85)`, `backdrop-filter: saturate(180%) blur(14px)`, bottom border `1px solid rgba(11,29,58,0.06)`.

**Contents, left to right:**

- **Logo lockup** — the mark followed by the wordmark. See *Assets → Logo*.
  - Mark: inline SVG, `viewBox="0 0 227 151"`, height `29.7px` (width `44.6px`, i.e. `size × 1.35` where `size = 22`). Two paths: **pill `fill: var(--brand)` #F96167**, **pearl `fill: var(--ink)` #0B1D3A**.
  - Wordmark: Nunito 700, `22px`, `letter-spacing: -0.005em`. "you" in `var(--ink)`, "cloud" in `var(--brand)`. Gap between mark and wordmark `8.8px`. Wrapped in `dir="ltr"` so it never mirrors in Arabic.
- **Nav links** (hidden below 960px) — five links, each `padding: 8px 14px`, `border-radius: 999px`, `font-size: 14.5px`, `font-weight: 500`, colour `var(--ink-2)` #1A2C4D. Hover: background `rgba(11,29,58,0.05)`. Anchor targets, in order: `#how-it-works`, `#retail`, `#fnb`, `#sell-online`, `#campaigns`.
- **Language toggle** — a `<button>` showing the *other* language. `padding: 8px 12px`, `border-radius: 999px`, `border: 1px solid rgba(11,29,58,0.15)`, `font-size: 13.5px`, `font-weight: 600`. Label is "عربي" in English mode and "EN" in Arabic mode.
- **"Sign in"** text link (hidden below 960px) — `font-size: 14px`, `color: var(--muted)`.
- **"Get started" button** — primary. `padding: 10px 18px`, `border-radius: 10px`, `font-size: 14px`, `font-weight: 600`, `background: var(--brand)` #F96167, `color: #fff`. Hover: `background: var(--brand-ink)` #C63840. Active: `transform: translateY(1px)`. Opens the enquiry modal.

---

### 2. Hero (`Hero`)

**Purpose:** state the product, the price and the two calls to action above the fold.

**Layout:** two-column CSS grid, `grid-template-columns: 1.1fr 1fr`, `gap: clamp(32px, 5vw, 64px)`, `align-items: center`. Section padding `clamp(32px, 4.5vw, 64px) 0 clamp(56px, 7vw, 96px)`.

**Left column, top to bottom:**

- **Eyebrow pill** — "Made for UAE shops & restaurants". `display: inline-flex`, `gap: 8px`, `padding: 6px 12px`, `border-radius: 999px`, background `var(--brand-soft)` #FDD2D4, colour `var(--brand-ink)` #C63840. Font: JetBrains Mono 600, `12px`, `letter-spacing: 0.1em`, uppercase. Preceded by a `6px` round dot in `currentColor`.
- **H1** — two lines. Line 1 "One app for all your" in Bricolage Grotesque 600, `var(--ink)`. Line 2 "business headache." in **Bricolage Grotesque italic 500, `var(--brand)` #F96167** — the brand's signature two-part headline. Size `clamp(44px, 6.6vw, 88px)`, `line-height: 0.98`, `letter-spacing: -0.028em`. Margin-top `22px`.
- **Alternate-language headline** — the same headline in the other language, rendered under the H1 in `var(--brand-ink)`, `font-weight: 600`, `font-size: clamp(20px, 2vw, 28px)`, with `dir` set to the opposite direction and `text-align` following it. In English mode this shows the Arabic "تطبيق واحد لكل هموم أعمالك." in Noto Kufi Arabic; in Arabic mode it shows the English line in Bricolage Grotesque.
- **Sub-paragraph** — "Sell, get paid, track stock, pay staff and file VAT — from one app, on one monthly bill. Whether you run one till or ten branches." `font-size: clamp(16px, 1.3vw, 19px)`, `color: var(--muted)` #4A5878, `max-width: 540px`, `line-height: 1.6`. Margin-top `22px`.
- **CTA row** — `display: flex`, `gap: 12px`, `flex-wrap: wrap`, margin-top `32px`.
  - Primary: "Get started →" — `padding: 14px 22px`, `border-radius: 10px`, `font-size: 15px`, `font-weight: 600`, `background: var(--brand)`, `color: #fff`. Opens the enquiry modal.
  - Ghost: "See how it works" — same metrics, `background: transparent`, `border: 1.5px solid rgba(11,29,58,0.15)`, `color: var(--ink)`. Anchors to `#how-it-works`.
- **Price card** — margin-top `28px`. `display: inline-flex`, `align-items: baseline`, `gap: 8px`, `padding: 12px 18px`, `background: #fff`, `border: 1px solid var(--line)` #E8EEF9, `border-radius: 14px`, `box-shadow: var(--shadow-sm)`. Three spans: **"Starting at AED 19"** in Bricolage Grotesque 600 at `clamp(22px, 2.2vw, 28px)`, `letter-spacing: -0.025em`; **"/ month"** in `var(--muted)` at `15px`/600; **"· per branch · no setup fee"** in JetBrains Mono at `13px`, colour `var(--muted-2)` #6B7A99.
- **Trust badges** — margin-top `24px`, flex row, `gap: 10px`, `flex-wrap: wrap`. Four pills: "T+2 to any UAE IBAN", "FTA e-invoicing", "PCI DSS", "24/7 · English · العربية · हिंदी · Tagalog". Each `padding: 5px 12px`, `border-radius: 999px`, `background: var(--bg-2)` #F5F7FC, JetBrains Mono 600 `11px`, `letter-spacing: 0.04em`, colour `var(--ink-2)`.

**Right column — hero visual:**

A relative-positioned box with `aspect-ratio: 4/5`. It contains:

1. **Photo layer** — absolutely positioned `inset: 0`, `border-radius: var(--r-xl)` 28px, `overflow: hidden`, `box-shadow: 0 40px 80px -30px rgba(11,29,58,0.25), 0 10px 30px -10px rgba(11,29,58,0.1)`. Background is the placeholder gradient `linear-gradient(150deg, #FFF3EC 0%, #FDE9EA 45%, #EEF3FF 100%)`. The `<img>` is `hero-uae.jpg`, `object-fit: cover`, `object-position: 35% 50%`, with `width="900" height="506" fetchpriority="high"`.
2. **Payment float card** — absolutely positioned, `inset-inline-start: 16px`, `top: 16px`, `max-width: calc(100% - 32px)`, `background: #fff`, `border-radius: 14px`, `padding: 14px 16px`, `box-shadow: 0 20px 40px -8px rgba(11,29,58,0.25)`. Flex row, `gap: 12px`. A `40×40` tile with `border-radius: 10px`, `background: var(--c-hr-soft)` #D1FAE5, `color: var(--c-hr)` #10B981, containing a `✓` glyph. Text block: "Payment received" (600, `13.5px`) and "AED 182.40 · Al Barsha · settles T+2" (`var(--muted)`, `12px`, JetBrains Mono).
3. **Y1000 device** — absolutely positioned, `inset-inline-end: -5%`, `bottom: -4%`, `width: 30%`. Contains `y1000.png` with `filter: drop-shadow(0 24px 30px rgba(11,29,58,0.4))` and, beneath it, a dark pill label "Y1000 · TAP · CHIP · QR" (`background: var(--ink)`, `color: #fff`, `border-radius: 999px`, `padding: 5px 12px`, JetBrains Mono 700 `10.5px`, `letter-spacing: 0.08em`). It deliberately overhangs the photo's bottom edge — the wrapper must **not** be `overflow: hidden`; the clipping happens on the inner photo layer only.

---

### 3. Certification strip (`CertStrip`)

**Purpose:** reassure the buyer that the card reader is certified by the schemes they know.

**Layout:** section with `padding-bottom: clamp(28px, 3.5vw, 48px)` and no top padding, so it sits flush under the hero. One row: `display: flex`, `align-items: center`, `gap: 16px`, `flex-wrap: wrap`, `padding: 18px 22px`, `background: var(--bg)` #fff, `border: 1px solid var(--line)`, `border-radius: var(--r-lg)` 20px.

**Contents:** label "Card reader certified to accept" (JetBrains Mono 700, `10.5px`, `letter-spacing: 0.1em`, uppercase, `var(--muted)`); then three scheme words **Visa**, **Mastercard**, **UnionPay** — each Bricolage Grotesque 700 at `clamp(17px, 1.7vw, 22px)`, `letter-spacing: -0.02em`, `padding: 6px 16px`, `background: #fff`, `border: 1px solid var(--line)`, `border-radius: 8px`; then, pushed right with `margin-inline-start: auto`, the note "EMV L1 + L2 · PCI PTS 5.x SRED · tap, chip, swipe and QR" (JetBrains Mono `12.5px`, `var(--muted-2)`).

---

### 4. How it works (`HowItWorks`)

**Purpose:** show that everything is one built-in system, then prove it with two concrete events.

**Layout:** section padding `clamp(56px, 7vw, 96px) 0`. Centred `SectionHead` (max-width `820px`, `margin: 0 auto 56px`).

**SectionHead contents:** eyebrow "How it works"; H2 "One connected system. *One shared ledger.*" with the second half in Bricolage italic `var(--brand)`; sub-copy "Everything is built in — no extra apps to buy, connect or reconcile." (`17px`, `var(--muted)`, margin-top `18px`).

**System diagram (`SystemDiagram`)** — a single ink card, `background: var(--ink)` #0B1D3A, `border-radius: var(--r-xl)` 28px, `padding: clamp(20px, 3vw, 36px)`, `box-shadow: var(--shadow-lg)`.

Inside is a two-column grid: `grid-template-columns: 130px 1fr`, `gap: 18px 20px`, `align-items: center`. Four rows, each a label in the left column and content on the right. **Every label** is JetBrains Mono 700, `13px`, `letter-spacing: 0.14em`, uppercase, `#fff`, preceded by a `12×12` circle with `border: 2px solid var(--brand)` and `border-radius: 50%`.

| Row | Label | Right-hand content |
|---|---|---|
| 1 | SELL | Eight chips: Counter POS, Handheld, Tablet, Self-order kiosk, QR & SoundBox, WebShop, Talabat · Deliveroo · Careem, WhatsApp. Each `padding: 7px 14px`, `border-radius: 999px`, `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.12)`, `color: #fff`, `font-size: 14px`, `font-weight: 600`, `white-space: nowrap`. |
| 2 | RUN | An 8-item grid, `grid-template-columns: repeat(4, 1fr)`, `gap: 8px`. Each cell `padding: 11px 14px`, `border-radius: 8px`, `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-top: 3px solid <accent>`, `color: #fff`, `font-weight: 600`, `font-size: 14.5px`. Items and their top-border accents, in order: Retail POS → `var(--c-retail)` #E8873A; Payments → `var(--brand-soft-2)` #FBB4B8; Bookkeeping → `var(--c-book)` #14B8A6; HR & payroll → `var(--c-hr)` #10B981; Marketing → `var(--c-marketing)` #F96167; Service → `var(--c-service)` #3B82F6; AI Insights → `var(--c-insights)` #6366F1; AI Workflows → `var(--c-workflow)` #8B5CF6. |
| 3 | RECORD | One full-width coral bar. `background: var(--brand)` #F96167, `border-radius: 10px`, `padding: 14px 20px`, `box-shadow: var(--shadow-brand)`, flex row with `justify-content: space-between`, `gap: 16px`, `flex-wrap: wrap`. Left: "One shared ledger" in Bricolage Grotesque 600 at `clamp(18px, 2vw, 24px)`, `letter-spacing: -0.02em`, `#fff`. Right: "Every branch · every dirham · every bill" in JetBrains Mono 600, `12px`, `letter-spacing: 0.12em`, uppercase, `#fff` at `opacity: 0.92`. |
| 4 | KNOW | Six green pills: Profit & loss, live · VAT you owe · Stock on hand · Cash & T+2 payouts · Payroll cost · Best & slow sellers. Each `padding: 7px 14px`, `border-radius: 999px`, `background: rgba(16,185,129,0.12)`, `border: 1px solid rgba(16,185,129,0.35)`, `color: #D1FAE5`, `font-size: 14px`, `font-weight: 600`, `white-space: nowrap`, with a `6px` round `var(--c-hr)` dot carrying `box-shadow: 0 0 0 3px rgba(16,185,129,0.2)`. |

**There is deliberately no CONNECT row and no SAP / Oracle NetSuite / MS Dynamics / Tally / Zoho reference.** The SMB page claims everything is built in; only the enterprise version of this page names external ERPs. Do not reintroduce them.

**Explanation block** — margin-top `28px`, two-column grid `1fr 1.4fr`, `gap: 28px`, `align-items: center`.

- Left: H3 "One bill in. *Your whole business, updated.*" (`clamp(26px, 2.8vw, 36px)`, `line-height: 1.08`, `letter-spacing: -0.025em`, italic half in `var(--brand)`); then the paragraph "Ring up one bill — or run this month's salaries — and youcloud instantly updates your profit & loss, the VAT you owe, your stock and your cash. The same live picture whether you have one till or twenty, one shop or five branches." (`16.5px`, `var(--muted)`, `line-height: 1.65`); then the bolded takeaway **"No spreadsheets. No chasing the accountant."** (`16.5px`, `var(--ink)`, weight 600).
- Right: two `EventCard`s in a 2-column grid, `gap: 14px`.
  - **EventCard 1 — "1 bill raised"**, subtitle "Till 2 · Al Barsha", amount `182.40` with a muted `AED` prefix, four rows: Profit & loss `+AED 61.20 margin`; VAT owed `+AED 8.69`; Stock `−3 items · reorder flagged`; Cash `AED 182.40 → IBAN · T+2`. Footer "✓ Updated".
  - **EventCard 2 — "Monthly salaries run"**, subtitle "9 staff · 2 branches", amount `24,600`, four rows: Profit & loss `−AED 24,600 payroll`; WPS file `Sent to bank`; Cost per branch `Al Barsha 58% · JLT 42%`; Cash forecast `Updated for month-end`. Footer "✓ Updated".

  Each card: `background: #fff`, `border: 1px solid var(--line)`, `border-radius: var(--r-lg)` 20px, `padding: 22px`, `box-shadow: var(--shadow-sm)`. Header row has the mono label on the left and a `LivePip` on the right. The amount is Bricolage Grotesque 600 at `32px`, `letter-spacing: -0.025em`, wrapped in `dir="ltr"`. Data rows are separated by `1px solid var(--line)` top borders, `padding: 11px 0`, `font-size: 13.5px`, label in `var(--muted)` and value in `var(--ink)` at weight 600, `text-align: end`.

---

### 5. Merchants (`Merchants`) — Retail and F&B

**Purpose:** the core proof. Two merchant types, each with the exact two devices they would buy.

**Layout:** section `padding: clamp(56px, 7vw, 96px) 0` with `background: var(--bg)` #fff and `1px solid var(--line)` top and bottom borders. `SectionHead` then a 2-column grid, `gap: 24px`.

**SectionHead:** eyebrow "Two merchants · one app"; H2 "A shop in Al Barsha. A café in JLT. *Same app.*"; sub-copy "Pick the devices that fit your floor. Everything else is the same app, the same ledger and the same T+2 payout."

**Each `MerchantCard`** — `background: #fff`, `border: 1px solid var(--line)`, `border-radius: var(--r-xl)` 28px, `overflow: hidden`, flex column.

- **Photo header** — `aspect-ratio: 16/10`, `overflow: hidden`, with a placeholder gradient layer behind the image. The image is `object-fit: cover`, `object-position: 50% 35%`, `loading="lazy"`.
  - **Type badge** — top-left, `inset-inline-start: 16px`, `background: rgba(255,255,255,0.95)`, `padding: 6px 12px`, `border-radius: 999px`, JetBrains Mono 700 `11px`, `letter-spacing: 0.06em`, uppercase, with a `6px` dot in the module accent (retail → `var(--c-retail)`; F&B → `var(--c-marketing)`).
  - **Live card** — bottom-right, `inset-inline-end: 16px`, `bottom: 16px`, `max-width: calc(100% - 32px)`, `background: #fff`, `border-radius: 14px`, `padding: 12px 14px`, `box-shadow: 0 20px 40px -8px rgba(11,29,58,0.25)`. Contains the mono day label, a `LivePip`, an amount in Bricolage 600 `22px` with a muted `AED` prefix, and "✓ Settles T+2" in `var(--c-hr)`.
- **Body** — `padding: clamp(20px, 2.6vw, 30px)`, flex column, `gap: 16px`.
  - Merchant name line, mono `11px`, `letter-spacing: 0.1em`, uppercase, `var(--muted)`.
  - H3, `clamp(22px, 2.3vw, 30px)`, `line-height: 1.1`, `letter-spacing: -0.025em`, with the italic coral half.
  - Paragraph (`15.5px`, `var(--muted)`, `line-height: 1.6`) ending in a bolded takeaway.
  - **Device panel** — `background: var(--bg-cream)` #FFF8F2, `border-radius: 18px`, `padding: 12px`, 2-column grid, `gap: 10px`, holding two `DeviceTile`s.
  - **Three KV stats** — 3-column grid, `gap: 12px`, `padding-top: 16px`, `border-top: 1px solid var(--line)`, pushed to the bottom with `margin-top: auto`. Label is mono `10px` uppercase `var(--muted)`; value is Bricolage 600 at `21px`, `letter-spacing: -0.02em`, with the unit in `var(--muted)` at `14px`.

**`DeviceTile`** — `background: #fff`, `border: 1px solid var(--line)`, `border-radius: 14px`, `padding: 14px`, flex column, `align-items: center`, `text-align: center`, `gap: 6px`.
- Image well: **exactly `height: 150px`**, `display: flex`, `align-items: center`, `justify-content: center`, `overflow: hidden`. **The image itself must also be constrained** — `height: 150px; width: 100%; object-fit: contain`. A percentage `max-height` does not resolve inside a flex/grid well and the image will overflow over its own label. This was a real bug in the prototype.
- Then, in order: role label (mono `10px`, uppercase, `var(--brand-ink)`); model name in Bricolage 600 `20px` with `dir="ltr"`; description (`12.5px`, `var(--muted)`, `line-height: 1.4`).

**Card 1 — Retail (anchor `#retail`):**
- Photo `portrait-merchant.jpg`; accent `var(--c-retail)`; badge "Retail".
- Name: "Al Noor Grocery · Al Barsha, Dubai"
- H3: "Scan, bill and get paid — *on one counter.*"
- Body: "The Y5000 dual-screen counter runs the till: barcode scan, prices, offers and VAT receipts, with stock updating as you sell. When the queue builds, pick up the Y1000 and bill customers in the aisle." + bold **"Two devices. One stock count."**
- Devices: **Y5000** (role "Counter POS", "Dual-screen till · scan, bill, VAT receipt") and **Y1000** (role "Payment acceptance", "Handheld · tap, chip & QR in the aisle").
- Stats: Go-live `60 min` · Settlement `T+2` · Receipts `FTA`.
- Live card: "Today · Al Barsha", `AED 8,940`.

**Card 2 — F&B (anchor `#fnb`):**
- Photo `fb-restaurant.jpg`; accent `var(--c-marketing)`; badge "F&B".
- Name: "Zaatar & Co. Café · JLT, Dubai"
- H3: "Order at the table — *straight to the kitchen.*"
- Body: "Servers take orders on the Y4000 tablet and send them to the right kitchen station in a second. Guests in a hurry order and pay themselves at the Y7000 kiosk. Talabat, Deliveroo and Careem orders land on the same screen." + bold **"Split bills, tips and T+2 settlement — built in."**
- Devices: **Y4000** (role "Tableside POS", "Tablet · order, split bill, pay at table") and **Y7000** (role "Self-order kiosk", "Order & pay · card, Apple Pay, QR").
- Stats: Aggregators `1 screen` · Recipe cost `Per dish` · Tips `→ payroll`.
- Live card: "Tonight · JLT", `AED 6,215`.

> **Placeholder data:** the merchant names, the AED 8,940 / 6,215 totals, and every stat on these two cards were invented for the mockup. Replace with real customer data before launch.

---

### 6. Sell online (`SellOnline`) — anchor `#sell-online`

**Purpose:** a dedicated pitch for shops and freelancers who have never sold online and don't know how.

**Layout:** section `padding: clamp(56px, 7vw, 96px) 0`. `SectionHead` (eyebrow "Sell online · for shops & freelancers"; H2 "Pick any item off your shelf. *Sell it online and get paid.*"; sub "If you have never sold online, start here — you do not need a website, a developer or a second stock list."). Then a 2-column grid `1fr 1fr`, `gap: clamp(24px, 4vw, 56px)`, `align-items: center`.

**Left column:**

- Paragraph: "Choose a product from the stock you already have, set a price, and share the link on WhatsApp, Instagram or your youcloud WebShop. The buyer pays online by card or QR, and the same item comes off the same stock — so you never oversell." (`16.5px`, `var(--muted)`, `line-height: 1.65`).
- Bold takeaway **"One shelf. Every channel."** (`17px`, `var(--ink)`, 600).
- **Three numbered steps**, margin-top `26px`, flex column, `gap: 10px`. Each: `background: #fff`, `border: 1px solid var(--line)`, `border-radius: 14px`, `padding: 14px 16px`, flex row, `gap: 14px`. A `32×32` `border-radius: 10px` tile in `var(--brand-soft)` / `var(--brand-ink)` holding the zero-padded number (`01`, `02`, `03`) in JetBrains Mono 700 `13px`. Then the step title in Nunito 700 `14.5px` and the description at `13px` / `var(--muted)` / `line-height: 1.5`.
  1. **"Pick from your stock"** — "Choose any item you already sell in the shop. Photo, price, done — no new catalogue to build."
  2. **"Share anywhere"** — "One link for WhatsApp, Instagram bio, Facebook or your own WebShop. Take orders by chat or online payment."
  3. **"Paid and counted"** — "The sale posts to the same ledger and comes off the same stock. Collect it in store or ship it."

**Right column — the sales screen.** This is the colourful element and the most intricate piece on the page.

- **Gradient frame:** an outer div with `padding: 1.5px`, `border-radius: var(--r-xl)` 28px, and `background: linear-gradient(135deg, var(--brand) 0%, var(--c-retail) 38%, var(--c-insights) 72%, var(--c-hr) 100%)` — coral → orange → indigo → green — plus `box-shadow: 0 24px 48px -20px rgba(249,97,103,0.35)`. This produces a 1.5px gradient hairline around the card.
- **Inner card:** `background: #fff`, `border-radius: calc(var(--r-xl) - 1px)`, `padding: clamp(16px, 2.2vw, 24px)`.
- Header row: mono label "From your stock · Al Barsha" on the left, `LivePip` on the right.
- **Product tile** — `padding: 14px`, `border-radius: 16px`, `background: linear-gradient(135deg, #FFF3EC 0%, #FDE9EA 55%, #EEF3FF 100%)`, `border: 1px solid var(--line)`. Contains a `62×62` `border-radius: 14px` icon well filled with `linear-gradient(140deg, var(--brand) 0%, var(--c-retail) 100%)`, a white stroke bag icon, and `box-shadow: 0 10px 20px -8px rgba(249,97,103,0.6)`. Text: "Labneh 500g · 42 in stock" (`600`, `15px`) and the price "AED 12.50" in Bricolage 600 `24px`, `letter-spacing: -0.025em`, `color: var(--brand-ink)`. On the right, an "IN STOCK" pill in `var(--c-hr-soft)` / `var(--c-hr)`, mono 700 `10px`.
- **Share row** — mono label "Share to", then a 2-column grid, `gap: 8px`, of four channel chips: WhatsApp, Instagram, Facebook, WebShop. Each `padding: 10px 13px`, `border-radius: 12px`, `font-size: 13.5px`, `font-weight: 600`, with a `7px` round dot in `currentColor`. Accents cycle by index: `hr` (green), `marketing` (coral), `service` (blue), `insights` (indigo) — each using its `-soft` background and solid foreground.
- **Paid and ledger rows** — two rows, `padding: 11px 14px`, `border-radius: 12px`, `background: rgba(16,185,129,0.08)`, `border: 1px solid rgba(16,185,129,0.28)`, `font-size: 13.5px`. Label on the left in `var(--ink-2)`, a green `✓` on the right. Texts: "Paid online · AED 12.50" and "Stock 41 · posted to ledger".
- **Payment method chips** — "CARD", "APPLE PAY", "QR" in `var(--bg-2)`, `border-radius: 8px`, JetBrains Mono 700 `10.5px`, `letter-spacing: 0.06em`, wrapped in `dir="ltr"`.

> **Design-system note for the developer:** the module accent colours (`--c-retail`, `--c-insights`, `--c-hr`) are normally reserved for colour-coding the eight product modules and are not used on buttons, text or CTAs. Here they are used decoratively to give this section the colour the client asked for. This is a deliberate, client-requested stretch of the system — keep it contained to this section.

---

### 7. Campaigns (`Campaigns`) — anchor `#campaigns`

**Purpose:** show that WhatsApp, Instagram and Facebook campaigns are written by the app from the shop's own data.

**Layout:** section `padding: clamp(56px, 7vw, 96px) 0`, `background: var(--bg)` #fff, `1px solid var(--line)` top and bottom borders. `SectionHead` (eyebrow "Marketing that runs itself"; H2 "WhatsApp, Instagram and Facebook campaigns *from what the app already knows.*"; sub "youcloud reads your own sales, stock and expiry dates — then writes the campaign and picks the audience for you."). Then a 2-column grid, `gap: clamp(24px, 4vw, 56px)`, `align-items: center`.

**Left column:** paragraph "Approve the draft and it goes out on WhatsApp, Instagram or Facebook. Expiring stock, seasonal moments, slow sellers and lapsed regulars each trigger their own campaign, and every redemption posts back to the same ledger."; bold takeaway **"Approve it. It sends itself."**; a row of four trigger pills — "Nearing expiry", "Seasonal", "Slow-moving", "Lapsed regulars" — each `padding: 9px 15px`, `border-radius: 999px`, `background: var(--c-insights-soft)` #E0E4FE, `color: var(--c-insights)` #6366F1, `font-size: 13.5px`, `font-weight: 600`; and a row of three platform chips — WhatsApp, Instagram, Facebook — each `padding: 9px 15px`, `border-radius: 10px`, `background: #fff`, `border: 1px solid var(--line)`, `font-size: 13.5px`, `font-weight: 600`.

**Right column:** two stacked cards, `gap: 12px`.
- **AI card** — `background: var(--ink)`, `color: #fff`, `border-radius: var(--r-lg)` 20px, `padding: 18px 20px`, `box-shadow: var(--shadow-lg)`. Header row: a `30×30` `border-radius: 8px` well with `background: rgba(255,255,255,0.1)` and `border: 1px solid rgba(255,255,255,0.15)` containing "AI" in JetBrains Mono 700 `11px`; then the label "AI Insights · this morning" in JetBrains Mono 700 `9.5px`, uppercase, `rgba(255,255,255,0.55)`. Body: "Labneh 500g expires in 6 days — 42 tubs at Al Barsha. 380 customers bought it in the last 90 days." (`14.5px`, `line-height: 1.55`). Action row: three pills, `padding: 7px 13px`, `border-radius: 999px`, `font-size: 12.5px`, `font-weight: 600` — the first ("Draft WhatsApp") on `var(--brand)`, the other two ("Post to Instagram", "Skip") on `rgba(255,255,255,0.1)`.
- **Result card** — `background: #fff`, `border: 1px solid var(--line)`, `border-radius: var(--r-lg)`, `padding: 16px 18px`, `box-shadow: var(--shadow-sm)`. Line: "Last campaign: 148 sent · 61 redeemed · AED 762 sales" (`14px`, `var(--muted)`), then "✓ Redemptions posted to the ledger" in JetBrains Mono 700 `10.5px`, `var(--c-hr)`.

---

### 8. Stats band (`StatBand`)

**Purpose:** four hard numbers as a rhythm break before the closing CTA.

**Layout:** `background: var(--ink)` #0B1D3A, `color: #fff`, `padding: clamp(48px, 6vw, 80px) 0 clamp(28px, 3.5vw, 44px)`. The reduced bottom padding merges it visually with the CTA section below, which has a matching small top padding — they read as one dark block. Inner grid: `repeat(4, 1fr)`, `gap: 36px`.

**Each stat:** a number in Bricolage Grotesque 600 at `clamp(42px, 5vw, 66px)`, `line-height: 1`, `letter-spacing: -0.03em`, `text-align: start`, wrapped in `dir="ltr"`, with the unit in `var(--brand-soft-2)` #FBB4B8 at `0.5em`. Below it, the caption at `14.5px`, `rgba(255,255,255,0.65)`.

| Number | Unit | Caption |
|---|---|---|
| 60 | min | from box to first sale |
| T | +2 | settlement to any UAE IBAN |
| 24/7 | — | support in English · العربية · हिंदी · Tagalog |
| 5 | % | VAT & FTA e-invoicing, built in |

---

### 9. Closing CTA (`FinalCTA`) — anchor `#cta`

**Purpose:** the final conversion push.

**Layout:** `background: var(--ink)`, `color: #fff`, `padding: clamp(20px, 2.5vw, 32px) 0 clamp(56px, 7vw, 96px)`, `position: relative`, `overflow: hidden`. Centred text.

**Glow:** an absolutely positioned overlay, `inset: 0`, `pointer-events: none`, `background: radial-gradient(50% 60% at 85% 100%, rgba(249,97,103,0.35) 0%, transparent 55%), radial-gradient(40% 50% at 10% 20%, rgba(249,97,103,0.12) 0%, transparent 55%)`. This is the only place radial gradients appear in the brand.

**Contents:** eyebrow pill in the light variant (`color: var(--brand-soft)`, `background: rgba(249,97,103,0.15)`), "Get started"; H2 "One app. One bill." then "*Every branch covered.*" in Bricolage italic `var(--brand)`, at `clamp(40px, 6vw, 80px)`, `line-height: 1`, `letter-spacing: -0.035em`, `color: #fff`; sub-copy "Box to first settled sale before lunch. Book a demo at your shop, or chat with us on WhatsApp." (`18px`, `rgba(255,255,255,0.7)`, `max-width: 58ch`, centred); and a CTA row, `gap: 12px`, `justify-content: center`, `margin-top: 36px`, holding a primary "Get started →" button (opens the enquiry modal) and a dark ghost "Chat on WhatsApp" button (opens the WhatsApp sheet) with `border: 1.5px solid rgba(255,255,255,0.25)`.

---

### 10. Footer (`Footer`)

**Purpose:** brand close, real navigation and real contact routes.

**Layout:** `background: #050B18`, `color: rgba(255,255,255,0.6)`, `padding: 64px 0 28px`, `font-size: 14px`. Inner grid: `1.6fr repeat(2, 1fr)`, `gap: 40px`.

**Column 1 — brand:** the logo lockup in dark mode (white pill, coral pearl), size 24, then the paragraph "One app for your shop or restaurant — sell, get paid, run your books and pay your team. Made in the UAE." (`max-width: 36ch`, `line-height: 1.6`).

**Column 2 — "On this page":** five anchor links matching the nav — How it works, Retail, Restaurants, Sell online, Campaigns. Each `display: block`, `margin: 10px 0`. Column heading style is shared: `#fff`, `11px`, `700`, `letter-spacing: 0.1em`, uppercase, JetBrains Mono, `margin-bottom: 18px`.

**Column 3 — "Talk to us":** four rows, each `margin: 10px 0`:
- **WhatsApp** — a `<button>` that opens the WhatsApp sheet.
- **sales@youcloud.ae** — a real `mailto:` anchor.
- **+971 4 000 0000** — plain text, `dir="ltr"`.
- **youcloud.ae** — a real anchor to `https://youcloud.ae`, `dir="ltr"`, opening in a new tab.

**Bottom bar:** `margin-top: 48px`, `padding-top: 22px`, `border-top: 1px solid rgba(255,255,255,0.08)`, containing only "© 2026 youcloud · Dubai, UAE" in JetBrains Mono `12px`, `rgba(255,255,255,0.4)`, `letter-spacing: 0.04em`.

> The footer deliberately lists **only** links that resolve to real content. Earlier drafts had Platform / Industries / Company columns full of dead links; they were removed.

---

### 11. Floating WhatsApp button (`WhatsAppFab`)

**Purpose:** an always-available second conversion path.

**Layout:** `position: fixed`, `inset-inline-end: 20px`, `bottom: 20px`, `z-index: 150`. An inline-flex button, `gap: 10px`, `padding: 13px 18px`, `border-radius: 999px`, `background: var(--c-hr)` #10B981, `color: #fff`, `font-size: 14.5px`, `font-weight: 700`, `box-shadow: 0 16px 32px -8px rgba(11,29,58,0.35)`. Contains a stroke speech-bubble SVG (`20×20`, `stroke-width: 2`) and the label "Chat with us" / "تحدث معنا". Hover: `filter: brightness(0.95)`. Below 560px the label is hidden and only the icon shows.

> The button uses the HR module green, which in this system otherwise appears only as the tiny live-data dot. It is the one green surface on the page. If the brand wants to keep green strictly for live indicators, switch this to `var(--brand)` or `var(--ink)`.

---

## Interactions & Behavior

### Language toggle

- A single button in the header flips between `en` and `ar`.
- On change: set `document.documentElement.lang` to the language code and `document.documentElement.dir` to `ltr` or `rtl`; persist the choice to `localStorage` under the key **`yc-smb-lang`**; and on load read that key, defaulting to `en`.
- Every string on the page comes from the dictionary, so no component holds literal copy. Two dictionaries exist with identical keys — see `i18n.jsx`.
- The hero deliberately shows the headline in **both** languages: the primary language as the H1, and the other as a secondary line beneath with its own `dir` and `text-align`.

### Right-to-left behaviour

The page uses CSS logical properties throughout so RTL mirrors without layout rules: `inset-inline-start` / `inset-inline-end` for absolutely positioned elements, `margin-inline-start: auto` for the right-aligned note, `text-align: end` for right-aligned values. **Do not use `left`/`right` in the recreation.**

In Arabic mode the font stack switches to Noto Kufi Arabic for body and headings, `letter-spacing` is forced to 0, italic is suppressed (`font-style: normal`) because Arabic has no italic in this face, and heading sizes step down (`clamp(36px, 5.2vw, 70px)` for H1, `clamp(28px, 3.6vw, 50px)` for H2). Latin-only strings — the wordmark, model names, prices, URLs — are wrapped in `dir="ltr"` so they never mirror.

### Modals

Two overlays, both built on a shared `Sheet` component.

**`Sheet`** — a fixed full-screen scrim, `background: rgba(11,29,58,0.55)`, `backdrop-filter: blur(3px)`, `display: flex`, centred, `padding: 16px`, `z-index: 200`. Clicking the scrim closes. The panel stops propagation, is `background: #fff`, `border-radius: var(--r-lg)` 20px, `max-width: 720px` for the enquiry form and `440px` for the WhatsApp sheet, `max-height: 90vh`, `overflow-y: auto`, `box-shadow: var(--shadow-lg)`.

### Enquiry form

- Opened by: the header "Get started", the hero "Get started →", the closing CTA "Get started →", and the footer WhatsApp row is *not* part of this form.
- **Fields:** Full name (text, required, placeholder "e.g. Ahmed Al Mansoori"); Business name (text, "e.g. Al Noor Grocery"); Mobile number (text, required, placeholder "+971 50 000 0000", `dir="ltr"`); Email (text, "you@business.ae", `dir="ltr"`); Emirate (select — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain); Business type (select, required — Grocery / supermarket, Café / restaurant, Fashion / electronics, Salon / services, Selling online / social, Other); Branches / tills (select — 1, 2–5, 6–20, 20+); Preferred contact (select — Call me, WhatsApp, Email); Devices of interest (multi-select chips — Y5000 Counter POS, Y1000 Handheld, Y4000 Tablet, Y7000 Self-order kiosk, Y10 QR SoundBox, Not sure yet); Anything else (textarea).
- Field styling: `width: 100%`, `padding: 12px 14px`, `border-radius: 10px`, `border: 1px solid var(--line)`, `background: #fff`, `font-size: 15px`. Focus: `border-color: var(--ink)`. Labels: JetBrains Mono 700 `10.5px`, `letter-spacing: 0.08em`, uppercase, `var(--muted)`, `margin-bottom: 6px`.
- Two-column grid for the fields, `gap: 16px`, collapsing to one column below 560px.
- **Validation:** on submit, if name, mobile or business type is empty, show "Please fill in your name, mobile number and business type." in a `var(--brand-soft)` / `var(--brand-ink)` banner and do not submit. Required fields are marked with `*` in the label.
- **Submitting state:** the button is disabled, `opacity: 0.7`, and reads "Sending…".
- **Success state:** replaces the form with a centred confirmation — a `52×52` `border-radius: 14px` green `✓` well, "Thanks — we have your enquiry.", the callback promise, a reference code in the format `YC-XXXXX` (5 chars, `Math.random().toString(36).slice(2,7).toUpperCase()`), and two buttons: "Or chat on WhatsApp now" (switches to the WhatsApp sheet) and "Close".
- **Demo mode:** if the webhook URL is empty, the success screen additionally shows an amber `var(--brand-soft)` note reading "Demo mode — your webhook is not connected yet, so this enquiry was not delivered." This exists so a test submission is never mistaken for a delivered one. Remove this once the webhook is live.

### WhatsApp sheet

- Opened by: the floating button, the closing CTA "Chat on WhatsApp", the footer WhatsApp row, and the "Or chat on WhatsApp now" button on the enquiry success screen.
- Header: a `42×42` `border-radius: 12px` green well with a stroke speech-bubble icon, the title "Chat with youcloud", and a `LivePip` reading "ONLINE NOW".
- Fields: an optional name input, then five topic buttons — "I want a demo", "Pricing for my shop", "Which device do I need?", "Help with selling online", "Something else". The selected topic gets a `var(--brand)` border and `var(--brand-soft)` background.
- A preview box shows the composed message.
- The "Open WhatsApp" button is an `<a>` with `target="_blank"` and `rel="noreferrer"` pointing at `https://wa.me/<number>?text=<url-encoded message>`. The message is `"Marhaba youcloud. " + topic + (" — my name is " + name if provided)`, or the Arabic equivalent `"مرحباً youcloud. " + topic + " — اسمي " + name`.
- Below the button, the number is printed in JetBrains Mono `11.5px`, `var(--muted-2)`, centred.

### Hover, active and focus states

- **Primary button** (`class="yc-btn-primary"`): `background: var(--brand)` → `var(--brand-ink)` on hover.
- **Ghost button:** `border-color: rgba(11,29,58,0.15)` → `var(--ink)`, plus `background: rgba(11,29,58,0.04)` on hover.
- **Dark ghost button:** `border-color: rgba(255,255,255,0.25)` → `#fff` on hover.
- **All buttons:** `transition: background .15s ease, border-color .15s ease`; `transform: translateY(1px)` on `:active`.
- **Nav links:** background `rgba(11,29,58,0.05)` on hover.
- **Inputs:** `border-color: var(--ink)` on focus.
- **Floating WhatsApp button:** `filter: brightness(0.95)` on hover.
- Cards on this page do **not** lift on hover. The design system's 4px lift with `cubic-bezier(0.16, 1, 0.3, 1)` applies to the product/cloud cards on the enterprise page, not here.

### Transitions

There are no entrance animations, no scroll-driven effects and no parallax. The only motion is the hover transitions listed above. This matches the brand's restrained motion guidance.

### Responsive behaviour

| Breakpoint | Change |
|---|---|
| ≤ 1080px | `.yc-run` (the RUN row in the diagram) → 2 columns; the explanation block → 1 column. |
| ≤ 960px | Hero → 1 column, and the hero visual changes to `aspect-ratio: 4/3`. Merchant cards → 1 column. Stats → 2 columns. Footer → 2 columns. Nav links and the "Sign in" link are hidden. The hero Y1000 device is pulled in to `inset-inline-end: 8px`, `bottom: -3%`, `width: 24%`. |
| ≤ 680px | The system diagram label column collapses (`.yc-sys` → 1 column, `gap: 10px`); the two EventCards → 1 column. |
| ≤ 560px | Footer → 1 column; the enquiry form's field grid → 1 column; the floating WhatsApp label is hidden, leaving the icon. |

---

## State Management

All state is local to the page; there is no router and no data fetching on load.

| State | Where | Type | Purpose |
|---|---|---|---|
| `lang` | App root | `'en' \| 'ar'` | Current language. Initialised from `localStorage.getItem('yc-smb-lang') \|\| 'en'`; written back on change; drives `document.documentElement.lang` and `.dir`. |
| `form` | App root | `null \| 'enquiry' \| 'whatsapp'` | Which modal is open. `null` renders neither. |
| `f` | EnquiryForm | object | All ten form field values. `devices` is an array of strings. |
| `state` | EnquiryForm | `'idle' \| 'sending' \| 'done'` | Drives the button label and the success screen. |
| `ref` | EnquiryForm | string | The generated reference code. |
| `err` | EnquiryForm | string | Validation or send-failure message. |
| `demo` | EnquiryForm | boolean | True when the submission was not actually delivered. |
| `name`, `topic` | WhatsAppSheet | string | Composed into the `wa.me` message. |

### Form submission

Two constants at the top of `Forms.jsx`:

```js
const WHATSAPP_NUMBER = '971500000000';  // PLACEHOLDER — replace with the real UAE sales number
const ENQUIRY_WEBHOOK_URL = '';          // PLACEHOLDER — paste the endpoint that receives enquiries
```

**Webhook payload.** When `ENQUIRY_WEBHOOK_URL` is set, the form does:

```js
fetch(ENQUIRY_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
```

with this exact payload shape:

```json
{
  "source": "youcloud-smb-landing",
  "lang": "en",
  "submittedAt": "2026-10-11T09:14:22.000Z",
  "page": "https://youcloud.ae/",
  "name": "Ahmed Al Mansoori",
  "business": "Al Noor Grocery",
  "mobile": "+971500000000",
  "email": "ahmed@example.ae",
  "emirate": "Dubai",
  "businessType": "Grocery / supermarket",
  "branches": "2–5",
  "devices": ["Y5000 Counter POS", "Y1000 Handheld"],
  "preferredContact": "WhatsApp",
  "notes": ""
}
```

**Behaviour on response:** `res.ok` → show the success screen. Non-`ok` → show "We could not send that. Please try again, or message us on WhatsApp." plus the status code, keep the entered values, and return the button to idle. Network error → the same message without a status code, and return to idle. **No path may leave the form stuck in the "Sending…" state.**

**Important for the developer:** a JSON POST triggers a CORS preflight. The endpoint must return permissive CORS headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Headers: Content-Type`), or the browser blocks the request before it leaves. Zapier, Make and n8n webhooks handle this automatically. A custom endpoint may need a small server-side proxy — if you proxy it, do the POST from your own backend and keep the browser request same-origin.

---

## Design Tokens

All tokens live in `colors_and_type.css`. The section below is the complete set used by this page.

### Colour

| Token | Hex | Use on this page |
|---|---|---|
| `--ink` | `#0B1D3A` | Body text, dark sections (stats, CTA, footer is `#050B18`), the logo pearl |
| `--ink-2` | `#1A2C4D` | Secondary text, nav links |
| `--ink-3` | `#2A3562` | Strong text |
| `--muted` | `#4A5878` | Body copy on light |
| `--muted-2` | `#6B7A99` | Meta text, mono notes |
| `--bg` | `#FFFFFF` | White sections (merchants, campaigns), cards |
| `--bg-cream` | `#FFF8F2` | Page background |
| `--bg-2` | `#F5F7FC` | Neutral chips and rails |
| `--line` | `#E8EEF9` | Hairline borders |
| `--line-2` | `#EEF3FB` | Softer hairline |
| `--brand` | `#F96167` | Primary buttons, italic headline half, logo pill, RECORD bar |
| `--brand-ink` | `#C63840` | Button hover, eyebrow text, prices |
| `--brand-soft` | `#FDD2D4` | Eyebrow and step-number backgrounds |
| `--brand-soft-2` | `#FBB4B8` | Stat units |
| `--c-retail` | `#E8873A` | Retail badge dot, RUN row accent, gradient stop |
| `--c-marketing` | `#F96167` | F&B badge dot, RUN row accent |
| `--c-service` | `#3B82F6` | RUN row accent |
| `--c-hr` | `#10B981` | Live pips, success ticks, floating WhatsApp button |
| `--c-book` | `#14B8A6` | RUN row accent |
| `--c-insights` | `#6366F1` | Campaign trigger pills, gradient stop |
| `--c-workflow` | `#8B5CF6` | RUN row accent |
| `--c-payment` | `#0B1D3A` | RUN row accent |
| `--c-*-soft` | see CSS | Icon wells and tinted chips (`#D1FAE5`, `#DBEAFE`, `#E0E4FE`, `#FCE8D4`, …) |

The footer uses a distinct near-black, `#050B18`, not `--ink`.

### Typography

Four families, each with one job. All are Google Fonts.

| Token | Family | Use |
|---|---|---|
| `--f-display` | Bricolage Grotesque | H1–H4, stat numbers, prices, the italic headline half |
| `--f-body` | Inter | Body copy, buttons, small UI |
| `--f-mono` | JetBrains Mono | Eyebrows, labels, badges, KPI labels, all uppercase mono strings |
| `--f-logo` | Nunito | The `youcloud` wordmark only |

Weights: Bricolage 600 regular / 500 italic. Inter 400 / 500 / 600 / 700. JetBrains Mono 400 / 500 / 600. Nunito 700.

**Arabic:** Noto Kufi Arabic 400–700 replaces body and display in RTL mode.
**Devanagari:** Noto Sans Devanagari 400–700 must be appended to the `--f-body`, `--f-mono` and `--f-display` stacks. **Inter and JetBrains Mono contain no Devanagari glyphs** — without this the हिंदी in the trust badges falls back to a serif face. This was a real bug in the prototype.

| Element | Size | Line-height | Letter-spacing |
|---|---|---|---|
| H1 | `clamp(44px, 6.6vw, 88px)` | 0.98 | -0.028em |
| H2 | `clamp(32px, 4.4vw, 60px)` | 1.02 | -0.026em |
| H3 (merchant) | `clamp(22px, 2.3vw, 30px)` | 1.1 | -0.025em |
| H3 (explanation) | `clamp(26px, 2.8vw, 36px)` | 1.08 | -0.025em |
| Body | 16px base, `clamp(16px, 1.3vw, 19px)` in hero | 1.55–1.65 | normal |
| Mono label | 10–12px | — | 0.06–0.14em, uppercase |
| Stat number | `clamp(42px, 5vw, 66px)` | 1 | -0.03em |

In Arabic: H1 `clamp(36px, 5.2vw, 70px)`, H2 `clamp(28px, 3.6vw, 50px)`, `letter-spacing: 0`, `font-style: normal`, `line-height: 1.3`.

### Spacing

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 20 · `--s-6` 24 · `--s-8` 32 · `--s-10` 40 · `--s-12` 48 · `--s-16` 64 · `--s-20` 80 · `--s-24` 96 (all px).

**Section rhythm.** Every light section uses one shared value so the gap is identical down the page:

```js
const SEC = { padding: 'clamp(56px, 7vw, 96px) 0' };
```

At a 1265px viewport this resolves to 89.6px top and bottom for How it works, Merchants, Sell online and Campaigns. The hero is the exception (`clamp(32px, 4.5vw, 64px) 0 clamp(56px, 7vw, 96px)`), and the stats band and CTA are a deliberately tight pair (see sections 8 and 9).

**Layout:** `--max: 1240px` content width, `--gutter: clamp(20px, 3.5vw, 40px)`.

### Radii

`--r-xs` 6px · `--r-sm` 10px (buttons) · `--r-md` 14px (mockup cards, float cards, step rows) · `--r-lg` 20px (product cards, event cards) · `--r-xl` 28px (hero visual, merchant cards, the diagram, the sales screen frame) · `--r-pill` 999px (eyebrows, badges, chips).

### Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(11,29,58,0.06)` | Cards at rest |
| `--shadow-md` | `0 6px 16px rgba(11,29,58,0.08), 0 1px 3px rgba(11,29,58,0.04)` | Floating menus |
| `--shadow-lg` | `0 24px 48px -16px rgba(11,29,58,0.14), 0 8px 20px -8px rgba(11,29,58,0.06)` | The diagram, the AI card, the modal |
| `--shadow-brand` | `0 20px 40px -12px rgba(249,97,103,0.35)` | The RECORD bar |

One-off shadows used on this page, worth keeping exactly: the hero visual `0 40px 80px -30px rgba(11,29,58,0.25), 0 10px 30px -10px rgba(11,29,58,0.1)`; the float cards `0 20px 40px -8px rgba(11,29,58,0.25)`; the sales screen frame `0 24px 48px -20px rgba(249,97,103,0.35)`; the gradient icon well `0 10px 20px -8px rgba(249,97,103,0.6)`; the floating WhatsApp button `0 16px 32px -8px rgba(11,29,58,0.35)`.

Shadows are always tinted with the ink navy rather than pure black.

---

## Assets

All assets live in `assets/`. They have already been optimised for the web — the originals were far too heavy and caused a ~29 second image load in testing. **Keep these sizes.**

| File | Dimensions | Size | Where it came from | Used for |
|---|---|---|---|---|
| `hero-uae.jpg` | 900×506 | 39 KB | Supplied by the client (slide 1 of the youcloud UAE Sales Playbook PDF) | Hero photo, top-right |
| `portrait-merchant.jpg` | 860×1068 | 141 KB | Design system photography | Retail merchant card header |
| `fb-restaurant.jpg` | 900×672 | 88 KB | Design system photography | F&B merchant card header |
| `y5000.png` | 409×340 | 100 KB | Extracted from the client PDF, page 17 | Y5000 tile in the retail card |
| `y1000.png` | 250×339 | 57 KB | Extracted from the client PDF, page 17 | Hero device, and the Y1000 tile in the retail card |
| `y4000.png` | 324×340 | 74 KB | Extracted from the client PDF, page 17 | Y4000 tile in the F&B card |
| `y7000.png` | 193×340 | 43 KB | Extracted from the client PDF, page 17 | Y7000 tile in the F&B card |
| `youcloud-mark.svg` | `viewBox 0 0 227 151` | 1 KB | **Traced from the client PDF** (the original logo was only available as a raster) | Reference for the logo mark |

### Logo

The mark is **not** a raster and should not be inlined as a PNG. It is two vector paths, and the developer should implement it as an SVG component with two independently colourable paths:

- **Pill** (the rounded diagonal bar) — `fill: var(--brand)` #F96167 on light, `#fff` on dark.
- **Pearl** (the teardrop) — `fill: var(--ink)` #0B1D3A on light, `var(--brand)` on dark.

The path data is in `Shell.jsx` as the constants `YC_MARK_D` (both paths concatenated) and the derived `YC_PILL_D` / `YC_PEARL_D` (split on the `ZM` subpath boundary). The `viewBox` is `0 0 227 151`.

> **This is the highest-risk item in the handoff.** The mark was recovered by tracing a raster from a PDF and then redrawing it as two paths. Ask the client for the original vector logo file (SVG or AI). If they provide one, replace this and re-check that the two parts still colour independently.

The wordmark is live text, not an image: Nunito 700, "you" in ink and "cloud" in coral. If the client has the real brand typeface, swap it.

### Icons

All icons are **inline stroke SVGs** — `fill="none"`, `stroke="currentColor"`, `stroke-width: 2`, `stroke-linecap: round`, `stroke-linejoin: round`, sized 20–28px. There is no icon font and no icon library in this bundle. The set is: shopping bag, speech bubble (used twice), and `✓` as a text glyph.

For any additional icon, use **Lucide** — its 2px stroke weight matches this set exactly. Do not use emoji, Material Icons or Font Awesome.

### Placeholders to replace before launch

- The **WhatsApp number** `971500000000`.
- The **webhook URL**.
- **Merchant names** (Al Noor Grocery, Zaatar & Co. Café) and every AED figure on the merchant cards and event cards — all invented.
- The **Arabic copy** — it is a machine-assisted translation and has not been reviewed by a native speaker.
- **`+971 4 000 0000`** in the footer.

---

## Files

```
design_handoff_smb_uae_landing/
├── README.md              ← this document
├── index.html             ← the page shell: tokens override, responsive rules, App root, state
├── i18n.jsx               ← the two dictionaries (en, ar) — all copy lives here
├── Shell.jsx              ← logo mark path data, YcLogo, Eyebrow, Btn, LivePip, SectionHead, SEC, Nav, Footer
├── Sections.jsx           ← Hero, CertStrip, SystemDiagram, EventCard, HowItWorks,
│                             DeviceTile, MerchantCard, Merchants, SellOnline, Campaigns,
│                             StatBand, FinalCTA
├── Forms.jsx              ← Sheet, EnquiryForm, WhatsAppSheet, WhatsAppFab, the two constants
├── colors_and_type.css    ← design tokens + base element styles
└── assets/                ← 7 optimised images + the logo SVG reference
```

**Where to look for what:**

| I need… | Look in |
|---|---|
| A colour, font, radius or shadow value | `colors_and_type.css`, or *Design Tokens* above |
| Exact copy in either language | `i18n.jsx` |
| The logo path data | `Shell.jsx` — `YC_MARK_D`, `YC_PILL_D`, `YC_PEARL_D` |
| A section's layout and styles | `Sections.jsx` — one function per section, in page order |
| Form fields, validation, webhook payload | `Forms.jsx` |
| Breakpoints and RTL rules | `index.html`, the `<style>` block at the top |
| Page composition and state | `index.html`, the `App` function at the bottom |

**To run the reference:** open `index.html` in a browser. It loads React and Babel from a CDN, so it needs a network connection. Nothing is built or bundled.

**Known limitation of the reference:** because Babel compiles JSX in the browser, first paint is slower than a compiled app, and a Babel warning appears in the console. This is expected and is not present once the design is rebuilt in a real framework.
