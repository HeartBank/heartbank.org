# heartbank.org

The bilingual (English and Khmer) landing page for **HeartBank® Treasury**. A static site on GitHub Pages. The app itself is [thank.heartbank.org](https://thank.heartbank.org/).

- **The drawing is the source.** Every word and picture is generated from [`HeartBank/demo.heartbank.org`](https://github.com/HeartBank/demo.heartbank.org) by `scripts/pages.py`, and `npm run build` fails if a committed page differs from the drawing (`pages.py --check`) or the colors differ from its stylesheet (`check-tokens`).
- **The brand layer is vendored**, never edited here (`src/brand/`, hashed by `brand.lock`, checked before every build).
- **No payments, no accounts, no writes.** There is nothing on this site to add a database call to. Visits are counted without cookies.
- **Khmer is our own draft** and is marked as such on the Khmer page until a native reader approves it.
- Where this repo and the institution's memory files disagree, memory is canonical.

```
npm ci
npm run pages    # regenerate index.html, km/, login/, 404.html from the drawing (needs ../demo.heartbank.org)
npm run build    # guards, then vite build into dist/
python3 scripts/og.py   # re-render the two link-preview cards
```

CI checks out the drawing beside this repo, builds, and deploys `dist/` to GitHub Pages (`.github/workflows/pages-deploy.yml`).
