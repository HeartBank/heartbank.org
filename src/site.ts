// The only script this site ships besides the estate beacon. Four small jobs, none of which stores
// anything about a person: the language choice, the theme choice, the share button, and the
// first-visit language suggestion. Every storage call is wrapped, because storage can be blocked and
// the page must read the same without it.

const get = (k: string): string | null => {
    try { return localStorage.getItem(k); } catch { return null; }
};
const put = (k: string, v: string) => {
    try { localStorage.setItem(k, v); } catch { /* blocked: the page still works */ }
};
const del = (k: string) => {
    try { localStorage.removeItem(k); } catch { /* blocked */ }
};

// ---- language: stored choice → the browser's language → timezone as the last tiebreak only. ----
// Only the ROOT redirects, so a crawler (English, no storage) always sees both pages as written, and a
// visit to /km/ or / by link is never overridden once the reader has chosen with the toggle.
document.querySelectorAll<HTMLAnchorElement>("a[data-lang]").forEach((a) =>
    a.addEventListener("click", () => put("hb-lang", a.dataset.lang ?? "en"))
);
if (location.pathname === "/") {
    const stored = get("hb-lang");
    const lang = (navigator.language || "").toLowerCase();
    let tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { /* unknown */ }
    const wantsKhmer =
        stored === "km" ||
        (!stored && lang.startsWith("km")) ||
        // a Khmer reader in Long Beach has a Pacific timezone, so timezone only breaks a tie
        (!stored && (lang === "" || lang.startsWith("en")) && tz === "Asia/Phnom_Penh");
    if (wantsKhmer) location.replace("/km/" + location.search + location.hash);
}

// ---- theme: system by default; the footer toggle is an override that can be cleared. ----
const root = document.documentElement;
const paint = (choice: string) => {
    if (choice === "light" || choice === "dark") root.setAttribute("data-theme", choice);
    else root.removeAttribute("data-theme");
    document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.themeChoice === choice))
    );
};
const saved = get("hb-theme");
paint(saved === "light" || saved === "dark" ? saved : "auto");
document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]").forEach((b) =>
    b.addEventListener("click", () => {
        const choice = b.dataset.themeChoice ?? "auto";
        if (choice === "auto") del("hb-theme"); else put("hb-theme", choice);
        paint(choice);
    })
);

// ---- share: the native sheet where there is one, a copied link where there is not. No counts. ----
const toast = document.getElementById("toast");
const say = () => {
    if (!toast) return;
    toast.hidden = false;
    window.setTimeout(() => { toast.hidden = true; }, 2200);
};
document.getElementById("share")?.addEventListener("click", async () => {
    const url = location.href;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";
    try {
        if (navigator.share) {
            await navigator.share({ title: document.title, text: description, url });
            return;
        }
    } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return; // the reader closed the sheet
    }
    try {
        await navigator.clipboard.writeText(url);
        say();
    } catch {
        window.prompt("", url);
    }
});
