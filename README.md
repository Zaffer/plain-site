# plain-site

A minimal styleless design for websites. View the examples and museum: [https://zaffer.github.io/plain-site/](https://zaffer.github.io/plain-site/)

**Read:** [MANIFESTO.md](MANIFESTO.md) (the principles) ・ this README (why, and the guides) ・
[docs/vocabulary.md](docs/vocabulary.md) (everything HTML can draw without CSS)

Sister project: [plainpanel](https://github.com/Zaffer/plainpanel), for the interactive
control panels on research screens. plain-site is for everything else, and goes further: it
allows no CSS at all.

## Why

**CSS is where web went wrong.** It is a second language, layered over HTML, with its own
cascade, specificity, inheritance, stacking contexts, and a thousand properties that interact.
Every rule is global and every change can break something far away. Each framework built to
tame it adds another layer. Complexity invites chaos and bugs, so we remove the layer.

**The browser already has a stylesheet.** Every browser ships one, it has been tested on
every page ever written, and it has been stable for thirty years. Headings are big, links are
blue and underlined, lists are indented, tables line up, forms work. It is legible, accessible
and fast before we write a single line. We rely on it.

**Plain HTML is the robust technology.** A page made of HTML alone opens in any browser, on
any device, in any decade. It prints. It reads aloud. It survives with no build step, no
dependency, no framework upgrade and no CDN. The oldest pages on the web still render. Most
pages built in 2016 do not.

**Form follows function.** Every element is on the page because it does something. There is
no decoration that is not also information. The look comes from the structure, and the
structure comes from the content.

**90s practicality, Japanese simplicity.** The early web, and the Japanese web that kept its
habits, put content first: dense, scannable text, dated update logs, link lists, a table where
a table helps, typographic glyphs (■ ※ 【】 ▲) instead of icons and images. Pages built that
way load at once and still work.

**AI slop all looks the same.** Generated websites have converged on one look: a hero banner,
a gradient, three feature cards with rounded corners and icons, an Inter or system sans,
"Empower your workflow", a testimonial carousel, a call to action. No language model would
produce a page in Times New Roman with blue underlined links, `<font>` tags, a bordered
table, and a dated changelog. That is the point. A plain-site page reads as made by a person
who chose every element on purpose, and it does not resemble anything else.

## The guide (draft)
\[ defer to MANIFESTO.md for ultimate opinion \]

### 1. No CSS.

- No `<style>` element, no `style=""` attribute, no `.css` file, no `<link rel="stylesheet">`.
- No CSS from script: no `element.style`, no `classList` used for looks, no CSSOM, no
  `adoptedStyleSheets`, no CSS-in-JS.
- No `class` attributes for appearance. (There is nothing to select them.)
- **Allowed:** HTML attributes that the HTML spec defines, including obsolete presentational
  ones (`bgcolor`, `align`, `<font>`). They are HTML. The browser turns them into style
  internally (the spec calls them *presentational hints*). That is the browser's code, not
  ours.

### 2. Use the browser's defaults first

Reach for things in this order, until it works for you:

1. **Plain structure.** Headings, paragraphs, lists, `<hr>`, one column in source order.
2. **Meaningful elements** that already look different: `<mark>`, `<kbd>`, `<code>`,
   `<small>`, `<blockquote>`, `<dl>`, `<table>`, `<fieldset>`, `<details>`, `<meter>`.
3. **Presentational attributes**, obsolete but required by the spec for browsers to render:
   `bgcolor`, `<font color size>`, `<center>`, `align`, `cellpadding`, `hr color`. Only those
   in the *living* list in [vocabulary.md](docs/vocabulary.md). Never the *dead* ones.
4. **JavaScript**, only for behaviour HTML cannot express (rule 7).

### 3. One column, source order

The default flow is the layout, and it is already responsive. If needed, constrain line length with the
**measure table** (`width="100%"` table, empty cell, `width="720"` cell, empty cell): a
max-width that shrinks on a phone. Use a two-column layout table only when the narrow column
is truly narrow, and mark it `role="presentation"`. Avoid nesting layout tables more than one deep.

### 4. Colour is information

Ideally pick one of two palettes per site and stay with it:

- **System palette:** `<meta name="color-scheme" content="light dark">`, no colour attributes.
  Dark mode for free. Colour comes only from links, `<mark>`, `<meter>` and form controls.
- **Fixed palette:** `bgcolor` / `text` / `link` on `<body>`, `<font color>` for accents, avoid
  color-scheme meta. Aim for one accent colour plus the link colours. Check contrast (4.5:1).

### 5. Text can be ornative

Use typographic glyphs, box-drawing in `<pre>`, and `<hr>` for decoration. Put a glyph next to
a word, not instead of it. Use images only when the image is the content.

### 6. Every page is a document

It has a title, a date it was last updated, and a way back to the top. It makes sense printed,
read aloud, and with images off. Its whole source can be easily read as source code and understood.

### 7. JavaScript when it earns its place

- First use native behaviour: `<details>`, `<dialog>` + `commandfor`, `popover`, form
  validation, `<details name>` accordions, `hidden="until-found"`.
- When state is needed, use signals ([alien-signals]([https://github.com/Zaffer/plainpanel](https://github.com/stackblitz/alien-signals))):
  one store, the DOM is a projection, attributes hold paths, not expressions.
- Script writes HTML attributes and content only: `hidden`, `disabled`, `textContent`,
  `bgcolor`. Never style.
- ES modules good, no build step if it can be avoided, no frameworks needed. The page must work with script off.

### 8. Weight

A page should fit in the first network round trip: **under 14 KB** of HTML.

### 9. Write like a person

Short declarative sentences. Real dates, real numbers, real names. No "empower", "seamless",
"unlock", "leverage", "cutting-edge", "solutions". No hero, no cards, no testimonials, no call
to action. Be direct about what the thing is and describe what it does. Use Standard Technical English as a baseline.

### 10. Validate, knowingly

The W3C validator flags obsolete features as errors. We accept those errors, and only those:
each obsolete feature used must be on the living list. Everything else validates clean.

## What is here

```
index.html             the root page: start here
MANIFESTO.md           the principles, in one list
README.md              this file: the why and the rules
docs/vocabulary.md     the reference: every zero-CSS styling tool, tested, with support notes
examples/              live specimens: edit the source in the page, see the result
  colour.html  type.html  layout.html  native.html  museum.html  night.html
  probe.html           47 automatic checks; open it in any browser
  frames/              a working <frameset>, for the museum
templates/
  home.html            home page for a small studio or company
.nojekyll              tells GitHub Pages to serve files as they are, with no Jekyll theme CSS
```

Open `index.html` straight from disk. Nothing to install.

## Publish on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, branch `main`,
folder `/ (root)`. The site appears at `https://<user>.github.io/<repo>/`. The `.nojekyll`
file matters: without it, GitHub runs Jekyll, which would render the Markdown files with a
theme stylesheet. With it, the `.md` files are served as plain text.
