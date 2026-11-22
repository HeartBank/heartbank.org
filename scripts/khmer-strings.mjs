#!/usr/bin/env node
// This site's words for the native readers' Khmer review (/khmer-review): every text the pages show, the English page paired
// with its Khmer page run by run (the login and not-found pages hold both languages in one file), written as the shared
// strings contract. The skill turns it into the review page on demo.heartbank.org.
//
//   npm run khmer-strings        → staging/khmer-strings.json   (staging/ is ignored by git; never in the site's build)
//   npm run khmer-apply <pulled.json> [--dry]   → the approved Khmer into km/index.html, login/ and 404.html
//   npm run khmer-capture        → the review's pictures (a local build of this site, in Khmer)
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = join(ROOT, "../../../.claude/skills/khmer-review");
const { strings, apply } = await import(join(SKILL, "html-site.mjs"));

export const cfg = {
  root: ROOT,
  surface: "heartbank.org",
  title: "heartbank.org",
  about: "The bilingual landing page for HeartBank® Treasury, the family app at thank.heartbank.org.",
  about_km: "ទំព័រដើមពីរភាសាសម្រាប់ HeartBank® Treasury ដែលជាកម្មវិធីគ្រួសារនៅ thank.heartbank.org។",
  accent: "#9a6f0b",
  pages: [
    { id: "home", name: "The front page", name_km: "ទំព័រដើម", en: "index.html", km: "km/index.html" },
    { id: "login", name: "Looking for the app (/login/)", name_km: "កំពុងរកកម្មវិធី (/login/)", en: "login/index.html", km: null },
    { id: "404", name: "A page that is not here", name_km: "ទំព័រដែលមិនមាន", en: "404.html", km: null },
  ],
};

const args = process.argv.slice(2);
if (args[0] === "apply") apply(cfg, JSON.parse(readFileSync(args[1], "utf8")), args.includes("--dry"));
else strings(cfg);
