#!/usr/bin/env python3
"""Generate the site's HTML documents from the DRAWING.

The artboards in ../demo.heartbank.org are the design of record. Their generator (build-boards.py) holds the
copy for both languages and every illustration, so this script IMPORTS it rather than copying it: the page
cannot drift from the drawing because it is built from the drawing's own functions.

    python3 scripts/pages.py            write index.html, km/index.html, login/index.html, 404.html
    python3 scripts/pages.py --check    exit 1 if a committed page differs from what the drawing generates

The pages sit at the repository root and are COMMITTED, because the estate's shared workflows find a page's
source by that layout (the snapshot workflow maps /km to km/index.html). `--check` runs before every build,
so a committed page that disagrees with the drawing fails the build instead of shipping.

The sibling checkout is ../demo.heartbank.org (CI checks it out beside this repo; so does a laptop).
Khmer is OUR composition and is marked as a placeholder on the page until a native reader approves it.
"""
import importlib.util, io, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DEMO = os.path.join(os.path.dirname(ROOT), "demo.heartbank.org", "build-boards.py")

if not os.path.exists(DEMO):
    sys.exit("pages.py: the drawing is not beside this repo (%s). Check out HeartBank/demo.heartbank.org as a sibling." % DEMO)
spec = importlib.util.spec_from_file_location("boards", DEMO)
bb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bb)

ORIGIN = "https://heartbank.org"
APP = "https://thank.heartbank.org/"
ESSAY = "https://thonly.org/research/the-gift-of-gratitude"

# Strings the drawing does not carry because a drawing has no behavior.
X = {
    "en": {
        "title": "HeartBank® Treasury: say thank you with money, keep the thanks",
        "home": "/", "alt": "English", "share_aria": "Share this page", "toast": "Link copied",
        "theme_aria": "Colour theme", "lang_aria": "Language",
        "privacy": "This site counts visits without cookies.",
        "og": ORIGIN + "/assets/og-en.png",
        "og_alt": "HeartBank Treasury: say thank you with money, keep the thanks.",
        "poster_alt": "Two people and an elder in a ring: a coin and a heart pass between them while a shared card records the thanks.",
    },
    "km": {
        "title": "HeartBank® Treasury៖ និយាយអរគុណដោយប្រាក់ ហើយរក្សាទុកការអរគុណ",
        "home": "/km/", "alt": "ខ្មែរ", "share_aria": "ចែករំលែកទំព័រនេះ", "toast": "បានចម្លងតំណ",
        "theme_aria": "ផ្ទៃពណ៌", "lang_aria": "ភាសា",
        "privacy": "គេហទំព័រនេះរាប់ចំនួនអ្នកមកមើលដោយមិនប្រើខូគី។",
        "og": ORIGIN + "/assets/og-km.png",
        "og_alt": "HeartBank Treasury៖ និយាយអរគុណដោយប្រាក់ ហើយរក្សាទុកការអរគុណ។",
        "poster_alt": "មនុស្សបីនាក់ជារង្វង់៖ កាក់ និងបេះដូងឆ្លងកាត់ពួកគេ ហើយប័ណ្ណរួមកត់ត្រាការអរគុណ។",
    },
}

THEME_EARLY = ('<script>try{var t=localStorage.getItem("hb-theme");'
               'if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>')


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def smallmarks(html):
    """The SERVICE mark is set small in the body; the registered mark stays at its original size."""
    return html.replace("\u2120", '<span class="sm">\u2120</span>')


def head(lang, title, desc, canonical, noindex=False, og=None, og_alt="", alternates=True):
    x = X[lang]
    out = ['<meta charset="utf-8" />',
           '<meta name="viewport" content="width=device-width, initial-scale=1" />',
           '<meta name="color-scheme" content="light dark" />',
           THEME_EARLY,
           "<title>%s</title>" % esc(title),
           '<meta name="description" content="%s" />' % esc(desc),
           '<link rel="canonical" href="%s" />' % canonical]
    if alternates:
        out += ['<link rel="alternate" hreflang="en" href="%s/" />' % ORIGIN,
                '<link rel="alternate" hreflang="km" href="%s/km/" />' % ORIGIN,
                '<link rel="alternate" hreflang="x-default" href="%s/" />' % ORIGIN]
    if noindex:
        # Hidden from search BY NAME, never by a blanket robots meta (a link-preview crawler reads that too).
        out += ['<meta name="googlebot" content="noindex" />', '<meta name="bingbot" content="noindex" />']
    out += ['<meta property="og:type" content="website" />',
            '<meta property="og:site_name" content="HeartBank®" />',
            '<meta property="og:locale" content="%s" />' % ("km_KH" if lang == "km" else "en_US"),
            '<meta property="og:url" content="%s" />' % canonical,
            '<meta property="og:title" content="%s" />' % esc(title),
            '<meta property="og:description" content="%s" />' % esc(desc)]
    if og:
        out += ['<meta property="og:image" content="%s" />' % og,
                '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />',
                '<meta property="og:image:alt" content="%s" />' % esc(og_alt),
                '<meta name="twitter:card" content="summary_large_image" />',
                '<meta name="twitter:title" content="%s" />' % esc(title),
                '<meta name="twitter:description" content="%s" />' % esc(desc),
                '<meta name="twitter:image" content="%s" />' % og]
    out += ['<meta name="theme-color" content="#9a6f0b" />',
            '<link rel="manifest" href="/assets/site.webmanifest" />',
            '<link rel="icon" type="image/png" href="/assets/favicon-96x96.png" sizes="96x96" />',
            '<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />',
            '<link rel="shortcut icon" href="/assets/favicon.ico" />',
            '<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />',
            '<link rel="preconnect" href="https://fonts.googleapis.com" />',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+Khmer:wght@400;500;600&display=swap" />',
            '<link rel="stylesheet" href="/src/styles.css" />',
            '<script type="module" src="/src/site.ts"></script>',
            '<script src="/analytics.js" defer></script>']
    return "\n        ".join(out)


SHARE_ICON = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M12 3l-4 4M12 3l4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" '
              'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def header(lang):
    t, x = bb.T[lang], X[lang]
    km = " km" if lang == "km" else ""
    return ('<header class="top"><a class="wordmark" href="%s" aria-label="HeartBank®">%s</a>'
            '<div class="tools"><nav class="seg" aria-label="%s"><a href="/" hreflang="en" lang="en" data-lang="en"%s>EN</a>'
            '<a class="km" href="/km/" hreflang="km" lang="km" data-lang="km"%s>ខ្មែរ</a></nav>'
            '<button type="button" class="share" id="share" aria-label="%s">%s<span class="lbl%s">%s</span></button></div></header>'
            % (x["home"], bb.mark(), x["lang_aria"], ' aria-current="true"' if lang == "en" else "",
               ' aria-current="true"' if lang == "km" else "", x["share_aria"], SHARE_ICON, km, t["share"]))


def footer(lang):
    t, x = bb.T[lang], X[lang]
    km = " km" if lang == "km" else ""
    tl = ("Auto", "Light", "Dark") if lang == "en" else ("ស្វ័យប្រវត្តិ", "ភ្លឺ", "ងងឹត")
    theme = ('<div class="seg%s" role="group" aria-label="%s"><button type="button" data-theme-choice="auto">%s</button>'
             '<button type="button" data-theme-choice="light">%s</button><button type="button" data-theme-choice="dark">%s</button></div>'
             % (km, x["theme_aria"], tl[0], tl[1], tl[2]))
    note = ('<p class="note km">[ %s ]</p>' % t["ph"]) if lang == "km" else ""
    link = lambda href, text: '<a class="link" href="%s" rel="noopener">%s</a>' % (href, text)
    w1, w2 = bb.who_parts(t, link)
    return ('<footer><div class="foot-row"><p class="who%s">%s</p><p class="who%s">%s</p>%s</div><p class="disc%s">%s</p><p class="note%s">%s</p>%s</footer>'
            '<div class="toast" id="toast" role="status" aria-live="polite" hidden>%s</div>'
            % (km, w1, km, w2, theme, km, bb.disc_html(t), km, x["privacy"], note, x["toast"]))


def landing(lang):
    t, x = bb.T[lang], X[lang]
    km = " km" if lang == "km" else ""
    k = km.strip()
    steps = "".join('<li class="step%s">%s<b aria-hidden="true">%d</b><span>%s</span></li>' % (km, bb.flow_svg(i + 1), i + 1, s)
                    for i, s in enumerate(t["steps"]))
    why = "".join('<div class="card">%s<h3 class="%s">%s</h3><p class="%s">%s</p></div>' % (bb.spot(kd), k, n, k, d)
                  for kd, (n, d) in zip(("help", "shared", "child", "charge"), t["why"]))
    ben = "".join('<li class="%s">%s</li>' % (k, b) for b in t["ben"])
    things = "".join('<div class="card">%s<h3>%s</h3><p class="%s">%s</p></div>' % (bb.spot(kd), n, k, d)
                     for kd, (n, d) in zip(("jar", "account", "sprout"), t["things"]))
    hosts = {"heartbank.com": "https://heartbank.com/", "heartbank.net": "https://heartbank.net/", "heartbank.ceo": "https://heartbank.ceo/"}
    elsewhere = "".join('<a class="card" href="%s">%s<h3 class="%s">%s</h3><p class="%s">%s</p><p class="note">%s</p></a>'
                        % (hosts[h], bb.spot(kd), k, n, k, d, h)
                        for kd, (n, d, h) in zip(("pair", "book", "shop"), t["else"]))
    body = ('<main id="main"><section class="intro"><div><h1 class="%s">%s</h1><p class="lede%s">%s</p>'
            '<p class="cta"><a class="btn%s" href="%s">%s</a></p><p class="note%s">%s</p></div>'
            '<div class="art"><div class="poster">%s<p class="note%s">%s</p></div></div></section>'
            '<section><h2 class="%s">%s</h2><ol class="steps">%s</ol></section>'
            '<section><h2 class="%s">%s</h2><div class="cols cols4">%s</div></section>'
            '<section><h2 class="%s">%s</h2><ul class="ben">%s</ul></section>'
            '<section><h2 class="%s">%s</h2><div class="cols">%s</div></section>'
            '<section><h2 class="%s">%s</h2><p class="lede%s">%s</p><p class="paper"><a class="link%s" href="%s" rel="noopener">%s</a>'
            ' <span class="note">%s</span></p></section>'
            '<section><h2 class="%s">%s</h2><div class="cols">%s</div></section></main>'
            % (k, t["h1"], km, t["sub"], km, APP, t["cta"], km, t["cta_note"],
               bb.explainer_fragment(lang), km, t["sb_legend"],
               k, t["how_h"], steps, k, t["why_h"], why, k, t["ben_h"], ben, k, t["things_h"], things,
               k, t["is_h"], km, t["is_p"], km, ESSAY, t["is_link"], "thonly.org/research/the-gift-of-gratitude",
               k, t["else_h"], elsewhere))
    html = ('<!doctype html>\n<html lang="%s">\n    <head>\n        %s\n    </head>\n    <body>\n        <a class="skip" href="#main">%s</a>\n        %s\n        %s\n        %s\n    </body>\n</html>\n'
            % (lang, head(lang, x["title"], t["sub"], ORIGIN + x["home"], og=x["og"], og_alt=x["og_alt"]),
               "Skip to the page" if lang == "en" else "រំលងទៅមាតិកា", header(lang), body, footer(lang)))
    return smallmarks(html)


def stub(kind):
    """The /login signpost and the 404: both languages on one page, Khmer first, because that is who arrives."""
    blocks = []
    for lang in ("km", "en"):
        t = bb.T[lang]
        k = " km" if lang == "km" else ""
        if kind == "login":
            blocks.append('<section lang="%s"><h1 class="%s">%s</h1><p class="lede%s">%s</p><p class="cta"><a class="btn%s" href="%s">%s</a></p></section>'
                          % (lang, k.strip(), t["login_h"], k, t["login_p"], k, APP, t["login_btn"]))
        else:
            blocks.append('<section lang="%s"><h1 class="%s">%s</h1><p class="lede%s">%s</p><p class="cta"><a class="btn2%s" href="%s">%s</a>'
                          ' <a class="btn%s" href="%s">%s</a></p></section>'
                          % (lang, k.strip(), t["nf_h"], k, t["nf_p"], k, X[lang]["home"], t["nf_home"], k, APP, t["login_btn"]))
    title = "HeartBank® Treasury"
    desc = "thank.heartbank.org"
    canon = ORIGIN + ("/login/" if kind == "login" else "/")
    km = bb.T["km"]
    ph = '<p class="note km">[ %s ]</p>' % km["ph"]
    html = ('<!doctype html>\n<html lang="km">\n    <head>\n        %s\n    </head>\n    <body>\n        %s\n        <main id="main">%s</main>\n'
            '        <footer><p class="disc">%s</p>%s</footer>\n    </body>\n</html>\n'
            % (head("km", title, desc, canon, noindex=True, alternates=False), header("km"), "".join(blocks), bb.disc_html(bb.T["en"]), ph))
    return smallmarks(html)


PAGES = {"index.html": lambda: landing("en"), "km/index.html": lambda: landing("km"),
         "login/index.html": lambda: stub("login"), "404.html": lambda: stub("404")}


def main():
    check = "--check" in sys.argv
    bad = []
    for rel, fn in PAGES.items():
        want = fn()
        path = os.path.join(ROOT, rel)
        have = io.open(path, encoding="utf-8").read() if os.path.exists(path) else None
        if check:
            if have != want:
                bad.append(rel)
        else:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            io.open(path, "w", encoding="utf-8").write(want)
            print("wrote %s (%d bytes)" % (rel, len(want.encode("utf-8"))))
    if check:
        if bad:
            sys.exit("pages.py --check: %s differ from the drawing. Run `npm run pages` and commit." % ", ".join(bad))
        print("pages.py --check: %d pages match the drawing" % len(PAGES))


if __name__ == "__main__":
    main()
