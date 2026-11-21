# plain-site

A minimal styleless design for websites. View the examples and museum: [https://zaffer.github.io/plain-site/](https://zaffer.github.io/plain-site/)

**Read:** [MANIFESTO.md](MANIFESTO.md) (the principles) ・ this README (why, and the guide) ・
[docs/vocabulary.md](docs/vocabulary.md) (everything HTML can draw without CSS)

Sister project: [plainpanel](https://github.com/Zaffer/plainpanel), for the interactive
control panels on research screens. plain-site is for everything else, and goes further: it
uses no CSS at all.

## Why

These are opinions, not laws. Use the ones that help you.

**CSS is too complex.** It is a second language on top of HTML, with a cascade, specificity,
inheritance, stacking contexts, and hundreds of properties that interact. A change in one
rule can break a different part of the page. Each framework that controls CSS adds one more
layer. Complexity causes chaos and bugs. We remove the layer.

**The browser has a stylesheet.** Each browser has a default stylesheet. Almost every web page
uses it, and it is stable. Headings are large, links are blue with an underline, lists have an
indent, tables align, and forms operate. The page is legible, accessible and fast before you
add style. We start there.

**Plain HTML is robust.** A page made only of HTML opens in each current browser and on each
screen size. You can print it, hear it from a screen reader, or read its source. A build
step, a dependency, a framework and a CDN are not necessary. The oldest pages on the web
still open. Many pages from 2016 do not.

**Form follows function.** Each element on the page does a job. Decoration also gives
information. The appearance comes from the structure, and the structure comes from the
content. Less code is better.

**90s practicality, Japanese simplicity.** The early web put content first. Many Japanese
sites still do. They use dense text, dated update logs, link lists, and a table where a table
helps. They use typographic glyphs (■ ※ 【】 ▲) as an alternative to icons. These pages load
quickly and still open.

**Human work is a positive signal.** Most generated websites have the same appearance: a hero
banner, a gradient, three feature cards, a sans-serif font, and a call to action. A language
model does not usually make a page with Times New Roman, blue links, `<font>` tags, a
bordered table. A plain page shows that didn't just go the AI slop route.

**A start, not a uniform.** If all plain sites have the same appearance, they become one more
template. Use the ideas that are applicable to your project. Ignore the others. Add your own
colours, glyphs and voice.

## The guide (draft)
\[ defer to MANIFESTO.md for ultimate opinion \]

This is how we build pages. It is a guide, not a checklist. Where your judgment differs,
follow your judgment.

### 1. No CSS

This is the one firm line of the project. Everything after it is a suggestion.

- No `<style>` element, no `style=""` attribute, no `.css` file, no `<link rel="stylesheet">`.
- No CSS from script: no `element.style`, no `classList` used for looks, no CSSOM, no
  `adoptedStyleSheets`, no CSS-in-JS.
- No `class` attributes for appearance. (There is nothing to select them.)
- HTML attributes that the HTML spec defines are fine, including the obsolete presentational
  ones (`bgcolor`, `align`, `<font>`). They are HTML. The browser turns them into style
  internally (the spec calls them *presentational hints*). That is the browser's code, not
  ours.

### 2. Start with the browser's defaults

A good order to try things in. Stop when the page works:

1. **Plain structure.** Headings, paragraphs, lists, `<hr>`, one column in source order.
2. **Meaningful elements** that already look different: `<mark>`, `<kbd>`, `<code>`,
   `<small>`, `<blockquote>`, `<dl>`, `<table>`, `<fieldset>`, `<details>`, `<meter>`.
3. **Presentational attributes**, obsolete for authors, but the spec still requires browsers
   to render them: `bgcolor`, `<font color size>`, `<center>`, `align`, `cellpadding`,
   `hr color`. The ones in the *living* list in [vocabulary.md](docs/vocabulary.md) work. The
   *dead* ones do nothing.
4. **JavaScript**, for behaviour that HTML cannot express (see 7).

### 3. One column, source order

The default flow is a layout, and it is already responsive. To limit line length, try the
**measure table** (`width="100%"` table, empty cell, `width="720"` cell, empty cell): a
max-width that shrinks on a phone. A two-column layout table works best when the narrow column
is truly narrow. Mark a layout table `role="presentation"`, so that screen readers do not
announce it as data, and try not to nest them.

### 4. Colour is information

A site stays consistent more easily with one of two palettes:

- **System palette:** `<meta name="color-scheme" content="light dark">`, no colour attributes.
  Dark mode for free. Colour comes only from links, `<mark>`, `<meter>` and form controls.
- **Fixed palette:** `bgcolor` / `text` / `link` on `<body>`, `<font color>` for accents, and
  no color-scheme meta, because fixed colours do not adapt. One accent colour plus the link
  colours is often enough. Check the contrast (4.5:1).

The colours themselves are yours to choose.

### 5. Text can be ornament

Typographic glyphs, box-drawing in `<pre>`, and `<hr>` can do the work of decoration. A glyph
works best next to a word, not in place of it. An image works best when the image is the
content. Your own set of glyphs is an easy way to give a site its own character.

### 6. Every page is a document

A good page has a title, a date of last update, and a way back to the top. It makes sense
printed, read aloud, and with images off. A person can read its source and understand it.

### 7. JavaScript when it earns its place

- Try native behaviour first: `<details>`, `<dialog>` + `commandfor`, `popover`, form
  validation, `<details name>` accordions, `hidden="until-found"`.
- When state is needed, we like signals ([alien-signals](https://github.com/stackblitz/alien-signals)):
  one store, the DOM is a projection, attributes hold paths, not expressions.
- Script writes HTML attributes and content: `hidden`, `disabled`, `textContent`, `bgcolor`.
  It does not write style (see 1).
- ES modules are good. A build step and a framework are usually not necessary. Try to keep
  the page useful with script off.

### 8. Weight

A page that fits in the first network round trip feels instant. That is about **14 KB** of
HTML. It is a target, not a limit.

### 9. Write like a person

Short declarative sentences. Real dates, real numbers, real names. Say what the thing is and
what it does. We avoid marketing words ("empower", "seamless", "unlock", "leverage",
"cutting-edge", "solutions") and marketing furniture (hero, cards, testimonials, call to
action). Simplified Technical English is a good baseline. The voice is yours.

### 10. Validate, knowingly

The W3C validator flags obsolete features as errors. We accept those errors when the feature
is on the living list, and we fix the others.

## What is here

```
index.html             the root page: start here
MANIFESTO.md           the principles, in one list
README.md              this file: the why and the guide
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
