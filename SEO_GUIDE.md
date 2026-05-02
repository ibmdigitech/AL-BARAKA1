SEO & AIO Optimization Guide — Al Baraka Diyar

This file contains practical, actionable steps to improve SEO, accessibility (A11y), and Google ranking.

1) Technical SEO (quick wins)
- Ensure `title` and `meta description` are unique and include primary keywords (already present in `index.html`).
- Add `rel="canonical"` (already present) and `sitemap.xml` in the site root (already present).
- Preload key images and fonts (we added preloads for logo and hero image).
- Serve optimized images (run `npm run optimize-images` to create `/assets/images/normalized/` WebP files).
- Use descriptive `alt` attributes for all images (most images already have `alt`; update any that are generic).
- Add Breadcrumb structured data (added to `index.html`).

2) Accessibility (A11y) improvements
- Ensure all form fields have associated `<label>` elements (contact form is labeled but consider adding `for` + `id` consistency).
- Ensure color contrast meets WCAG AA (check `--accent-gold` vs background; adjust if needed).
- Add `lang="en"` to `<html>` (already present).
- Ensure interactive elements (buttons, nav links) are keyboard focusable.

3) On-page content and keyword strategy
- Use a primary keyword phrase in the H1 and title (e.g., "Industrial Equipment Rental UAE").
- Add localized pages or sections for UAE, Qatar, KSA with unique content per page to target region-specific search.
- Add case studies / projects pages with schema for `Article` or `HowTo` where applicable.

4) Structured Data & Social
- Organization and LocalBusiness schema already present — ensure `sameAs` includes corporate social profiles (LinkedIn, Facebook).
- Ensure `og:image` and `twitter:image` point to high-quality images (1200x630 preferred for OG). After optimizing images, replace OG image with optimized WebP/PNG URL.

5) Performance & Core Web Vitals
- Serve images as WebP (script creates optimized WebP files).
- Defer non-critical scripts; preload critical CSS/fonts.
- Use `link rel="preconnect"` for external resources (fonts already preconnected).

6) Indexing & Monitoring
- Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Add and verify property in Google Search Console; monitor Coverage and Performance.
- Use Google Analytics / GA4 for user metrics.

7) Backlink & Local SEO
- Create Google Business Profile for the company and keep NAP consistent across site and directories.
- Build authoritative backlinks via press releases, industry directories, and partnerships.

8) Automation scripts (what we added)
- `scripts/optimize-images.js` — converts and normalizes images into `assets/images/normalized/` (WebP, resized to 1200px width).
- `package.json` command: `npm run optimize-images`.

9) Next steps I can implement for you
- Run image optimizer and update HTML paths (`--rewrite-html` option).
- Generate optimized OG images (1200x630) and update meta tags.
- Add sitemap submission guidance and sample robots.txt rules.
- Add GA4 + Search Console verification snippets (requires your IDs).

If you want, I can run the optimizer now and then update the HTML to reference the new WebP images and OG images automatically. Which action should I take next?