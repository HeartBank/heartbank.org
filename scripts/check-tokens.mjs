#!/usr/bin/env node
// The drawing is the source of this site's colour, and this guard makes that a property, not a promise.
// It reads the token blocks of ../demo.heartbank.org/board.css (the design of record) and of src/styles.css
// and fails the build if a value differs. Node built-ins only; no network.
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const board = resolve(ROOT, "..", "demo.heartbank.org", "board.css");
if (!existsSync(board)) {
    console.error(`check-tokens: the drawing is not beside this repo (${board}). Check out HeartBank/demo.heartbank.org as a sibling.`);
    process.exit(1);
}
const strip = (s) => s.replace(/\s+/g, "");
const vars = (css, open) => {
    const i = css.indexOf(open);
    if (i < 0) return null;
    const body = css.slice(css.indexOf("{", i) + 1, css.indexOf("}", i));
    return Object.fromEntries([...body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((m) => [m[1], strip(m[2])]));
};
const drawing = readFileSync(board, "utf8");
const site = readFileSync(resolve(ROOT, "src/styles.css"), "utf8");
let bad = 0;
for (const [label, dOpen, sOpen] of [
    ["light", ":root{", ":root {"],
    ["dark", '[data-theme="dark"]{', ':root[data-theme="dark"] {']
]) {
    const d = vars(drawing, dOpen), s = vars(site, sOpen);
    if (!d || !s) { console.error(`check-tokens: could not find the ${label} token block`); bad++; continue; }
    for (const [name, value] of Object.entries(d)) {
        if (s[name] !== value) { console.error(`check-tokens: ${label} ${name} is ${s[name] ?? "missing"} here but ${value} in the drawing`); bad++; }
    }
}
if (bad) process.exit(1);
console.log("check-tokens: light and dark tokens match the drawing");
