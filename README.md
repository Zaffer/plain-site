# plain-site

A minimal styleless design for websites. View the examples and museum: [https://zaffer.github.io/plain-site/](https://zaffer.github.io/plain-site/)

**Read:** [MANIFESTO.md](MANIFESTO.md) (the principles) ・ this README (why, and the guide) ・
[docs/vocabulary.md](docs/vocabulary.md) (everything HTML can draw without CSS)

Sister project: [plainpanel](https://github.com/Zaffer/plainpanel), for the interactive
control panels on research screens. plain-site is for everything else, and goes further: it
uses no CSS at all.

## Why

These are opinions, not laws. They are the reasons we build this way. Take the ones that help
you.

**We think CSS is where the web went wrong.** It is a second language on top of HTML, with its
own cascade, specificity, inheritance, stacking contexts, and a thousand properties that
interact. A rule in one place can break something far away. Each framework built to tame it
adds one more layer. For us, complexity invites chaos and bugs, so we remove the layer.

**The browser already has a stylesheet.** Every browser ships one, and it has had thirty years
of testing on almost every page ever written. Headings are big, links are blue and underlined,
lists are indented, tables line up, forms work. A page is legible, accessible and fast before
you write a line of style. We like to start there.

**Plain HTML lasts.** A page made of HTML alone opens in almost any browser, on any device. It
prints. It reads aloud. It needs no build step, no dependency, no framework upgrade and no
CDN. The oldest pages on the web still render. Many pages built in 2016 do not.

**Form follows function.** We like a page where each element does a job, and where decoration
also carries information. The look then comes from the structure, and the structure comes
from the content.

**90s practicality, Japanese simplicity.** Our models are the early web, and the Japanese web
that kept its habits. They put content first: dense, scannable text, dated update logs, link
lists, a table where a table helps, typographic glyphs (■ ※ 【】 ▲) in place of icons and
images. Pages built that way load at once and still work.

**AI slop all looks the same.** Generated websites have converged on one look: a hero banner,
a gradient, three feature cards with rounded corners and icons, an Inter or system sans,
"Empower your workflow", a testimonial carousel, a call to action. A language model is not
likely to produce a page in Times New Roman with blue underlined links, `<font>` tags, a
bordered table, and a dated changelog. For us, that is the point. A plain page shows that a
person chose each element on purpose.

**A start, not a uniform.** If every site built this way looked the same, that would be one
more template. Use the ideas that fit your project and leave the rest. Then add your own
taste: your colours, your glyphs, your voice.

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
