# heartbank.org

The bilingual (English and Khmer) landing page for **HeartBank® Treasury**. A static site on GitHub Pages. The app itself is [thank.heartbank.org](https://thank.heartbank.org/).

- **This repo is the source** (since 2026-11-11). The pages were first generated from the drawing, [`HeartBank/demo.heartbank.org`](https://github.com/HeartBank/demo.heartbank.org); the drawing is now a dated record, and words and pictures are edited HERE, in `index.html`, `km/`, `login/` and `404.html` (`pages.py --check`) or the colors differ from its stylesheet (`check-tokens`).
- **The brand layer is vendored**, never edited here (`src/brand/`, hashed by `brand.lock`, checked before every build).
- **No payments, no accounts, no writes.** There is nothing on this site to add a database call to. Visits are counted without cookies.
- **Khmer is our own draft** and is marked as such on the Khmer page until a native reader approves it.
- Where this repo and the institution's memory files disagree, memory is canonical.

```
npm ci
npm run build    # guards, then vite build into dist/
python3 scripts/og.py   # re-render the two link-preview cards
```

CI builds and deploys `dist/` to GitHub Pages (`.github/workflows/pages-deploy.yml`).
