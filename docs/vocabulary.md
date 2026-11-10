# Vocabulary: everything HTML can draw without CSS

This is the full toolkit. Every item is HTML: an element, an attribute, a meta tag, or a DOM
property. None of it is CSS.

**How it was checked.** Each feature was rendered in Chrome 155 (Blink) and its computed
result read back. [examples/probe.html](../examples/probe.html) repeats 47 of these checks
automatically: open it in Firefox and Safari to confirm them there. The *living* obsolete
features are not browser leftovers. The WHATWG HTML standard, §15 "Rendering", still
**requires** browsers to render them, attribute by attribute. That is why they work in every
engine, and why they will keep working: removing them would break millions of pages.

**Status words used below**

| Word | Meaning |
|---|---|
| conforming | Current HTML. The validator accepts it. |
| living | Obsolete for authors (the validator complains), but the spec requires browsers to render it. Safe to use. |
| trap | Works, but has a real cost. Read the note. |
| dead | Does nothing in current browsers. Never use. |

---

## 1. Page-level: `<body>` attributes (living)

| Attribute | Effect | Example |
|---|---|---|
| `bgcolor` | page background colour | `bgcolor="#fdf6e3"` |
| `text` | default text colour | `text="#333333"` |
| `link` | unvisited link colour | `link="#b22222"` |
| `vlink` | visited link colour | `vlink="#6b4c9a"` |
| `alink` | link colour while pressed | `alink="#ff8c00"` |
| `background` | tiled background image | `background="paper.gif"` |
| `marginwidth` / `marginheight` | page margins in px (Netscape) | `marginwidth="0"` |
| `leftmargin` / `topmargin` / `rightmargin` / `bottommargin` | page margins in px (Internet Explorer) | `topmargin="0"` |

The same five colours are live DOM properties: `document.bgColor`, `document.fgColor`,
`document.linkColor`, `document.vlinkColor`, `document.alinkColor`. Writing one sets the
`<body>` attribute (tested). That makes a theme switch a single
`Object.assign(document, palette)`.

## 2. Head-level: meta tags (conforming)

| Tag | Effect |
|---|---|
| `<meta name="viewport" content="width=device-width, initial-scale=1">` | Phones render at device width instead of a zoomed-out 980px. Required on every page. |
| `<meta name="color-scheme" content="light dark">` | Dark mode from the browser's own palette: background, text, links, form controls, scrollbars. Changing `content` from script takes effect immediately (tested). |
| `<meta name="theme-color" content="#1d1f21">` | Tints the browser toolbar on Android, Safari, installed apps. Takes a `media` attribute for per-scheme values. |
| `<link rel="icon" href="data:,">` | No favicon, and no wasted request for `/favicon.ico`. |

## 3. Text

### 3.1 Conforming elements with a default look

| Element | Default look | Element | Default look |
|---|---|---|---|
| `h1`-`h6` | 2em to 0.67em, bold | `small` | smaller |
| `b`, `strong` | bold | `mark` | yellow highlight, system colours (adapts to dark mode) |
| `i`, `em`, `cite`, `dfn`, `var`, `address` | italic | `sub`, `sup` | lowered, raised, smaller |
| `u`, `ins` | underline | `code`, `kbd`, `samp`, `pre` | monospace |
| `s`, `del` | strikethrough | `abbr[title]` | dotted underline, tooltip |
| `q` | quotation marks, following `lang` | `ruby` + `rt` | small annotation above (furigana) |
| `blockquote`, `dd` | indented 40px | `hr` | grooved rule |

Since 2025, browsers no longer shrink `<h1>` inside `<section>` / `<article>`: the level you
write is the size you get (tested: 32px in a section).

`lang` changes rendering: `lang="ja"` picks a Japanese font for kanji (otherwise browsers may
use Chinese glyph forms) and makes `<q>` use 「」. Always set `<html lang>`.

### 3.2 Living elements

| Element | Effect | Note |
|---|---|---|
| `<font color size face>` | colour; size `1`-`7` (3 = normal) or `+n` / `-n`; font list | `HTMLFontElement` still exists. Measured sizes: 1 → 10px, 3 → 16px, 7 → 48px, +2 → 24px. End `face` with a generic family (`serif`, `sans-serif`, `monospace`, `system-ui`). |
| `<center>` | centres text and child blocks, tables included | |
| `<big>` | larger (1.2em) | |
| `<tt>` | monospace | Prefer `<code>` / `<kbd>` / `<samp>`, which say what the text is. |
| `<strike>` | strikethrough | Prefer `<s>` or `<del>`. |
| `<nobr>` | no line breaks inside | For phone numbers, version strings. |
| `<acronym>` | like `<abbr>` | Use `<abbr>`. |
| `<xmp>` | preformatted, **raw text**: tags inside are shown, not parsed | The best way to show HTML source with no escaping. Cannot contain `</xmp>`. |
| `<listing>` | like `<pre>` | Parses tags. No reason to prefer it over `<pre>`. |
| `<pre wrap>` | preformatted, long lines wrap | |

## 4. Colour

| Where | How | Status |
|---|---|---|
| page | `<body bgcolor text link vlink alink>` | living |
| words | `<font color>` | living |
| highlight | `<mark>` | conforming; the only conforming background |
| region | `bgcolor` on `table`, `tr`, `td`, `th`, `tbody`, `thead`, `tfoot`, `col` | living |
| rule | `<hr color>` (sets the line colour; `noshade` makes it flat) | living |
| gauge | `<meter low high optimum value>`: green / yellow / red chosen by the browser | conforming |
| image | `background` on `body`, `table`, `tr`, `td`, `th` | living |
| ticker | `<marquee bgcolor>` | living, trap |

**The legacy colour parser.** All colour attributes use the spec's *rules for parsing a
legacy colour value*. It accepts CSS names (`crimson`, `rebeccapurple`), `#rgb`, `#rrggbb`,
hex **without** `#` (`ff6600`), and any other string: non-hex characters become `0`, the string
is split into three equal parts, and each part is cut to two digits. So every word is a colour.
Measured: `chucknorris` → rgb(192, 0, 0), `sick` → rgb(0, 192, 0), `crap` → rgb(192, 160, 0),
`ninja` → rgb(0, 0, 160). Fun, but always write `#rrggbb`.

## 5. Layout

### 5.1 Alignment (living)

| Attribute | On | Values |
|---|---|---|
| `align` | `p`, `div`, `h1`-`h6`, `caption`, `legend`, `td`, `th`, `tr`, `thead`, `tbody` | `left` `right` `center` `justify` (`caption`: `top` `bottom`) |
| `align` | `table` | `left` `right` (float) or `center` |
| `align` | `img`, `iframe`, `object` | `left` `right` (float, text wraps); `top` `middle` `bottom` `texttop` `absmiddle` (inline) |
| `valign` | `td`, `th`, `tr`, `tbody` | `top` `middle` `bottom` `baseline` |
| `clear` | `br` | `left` `right` `all`: drop below floated images |
| `hspace` / `vspace` | `img` | gap in px round a floated image |

`<div align="center">` and `<center>` both centre child tables as well as text.

### 5.2 Tables (living unless noted)

| Attribute | On | Effect |
|---|---|---|
| `border` | `table` | outer border width in px (bevelled); cells get a 1px border |
| `bordercolor` | `table` | one flat border colour (turns off the bevel) |
| `cellpadding` | `table` | padding inside every cell |
| `cellspacing` | `table` | gap between cells; `0` joins the borders |
| `width`, `height` | `table`, `td`, `th`, `col` | px or % |
| `nowrap` | `td`, `th` | no wrapping in the cell |
| `frame` | `table` | which outer edges: `void` `above` `below` `hsides` `vsides` `lhs` `rhs` `box` |
| `rules` | `table` | which inner lines: `none` `groups` `rows` `cols` `all` |
| `colspan`, `rowspan` | `td`, `th` | conforming |

### 5.3 The measure table: a max-width without CSS

```html
<table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr>
  <td></td>
  <td width="720"> …the whole page… </td>
  <td></td>
</tr></table>
```

On a wide window the middle cell is 720px, centred. On a narrow one the empty cells collapse to
nothing and the middle cell shrinks to fit, with no horizontal scroll. Measured in Chrome 155
with a 640 cell: 640px at a 1400px viewport, 484px at 500px, no overflow. A plain
`<table width="640">` overflows a phone. Leave out the first empty cell to align left.

### 5.4 Other layout tools

| Tool | Status | Note |
|---|---|---|
| lists, `blockquote`, `dl` | conforming | 40px indent per level. Nesting is the indent system. |
| `ol type="1 a A i I"`, `start`, `reversed`; `li value` | conforming | |
| `ul type="disc circle square"`, `li type` | living | |
| `hr size width align noshade` | living | thickness, length, alignment, flat |
| `<pre>` + box-drawing characters | conforming | diagrams and fixed-width tables. Use only glyphs from one font (`─ │ ┌ ┐ └ ┘ ├ ┤`); arrows and triangles (`▶ ▼`) often come from a fallback font with a different width and break the alignment. |
| `iframe frameborder="0" scrolling marginwidth` | living | |
| `<frameset>` / `<frame>` | living, trap | see §8 |

## 6. Native components (conforming)

| Element | What you get free |
|---|---|
| `<fieldset>` + `<legend>` | the only conforming bordered box, with a title in the edge (`legend align="right"` is living) |
| `<details>` + `<summary>` | disclosure triangle, open / close, keyboard, find-in-page opens it; `name` makes an accordion |
| `<dialog>` | modal box, dimmed backdrop, focus trap, Esc to close; `closedby="any"` closes on click outside |
| `commandfor` + `command` | open / close a dialog or popover from a button with no script (new in 2025-26) |
| `popover` + `popovertarget` | light-dismiss popup box |
| `<meter>` | coloured gauge (see §4) |
| `<progress>` | progress bar; no `value` gives an animated "working" bar |
| `<input type=date color range number email…>` | platform pickers and validation |
| `<datalist>` | suggestions for a text field |
| `<input type=checkbox switch>` | a switch in Safari, a checkbox elsewhere |
| `title` | hover tooltip |
| `accesskey` | keyboard shortcut (Alt in Chrome, Alt+Shift in Firefox, Ctrl+Option on Mac) |
| `hidden`, `hidden="until-found"` | hide; hide but let find-in-page reveal |

## 7. Ornament: glyphs

Text is free, scales, copies, and survives with styles off.

```
■ □ ◆ ◇ ● ○ ★ ☆     section marks, bullets
【 】 「 」 『 』      labels, titles
※                    note
→ ← ↑ ↓ ▲ ▼ ▶ ◀      direction; ▲ top
・ ｜ ― …            separators
✓ ✗ ⏻ ⏸ ⏹ ↺ ⓘ ☾ ☀    actions and states (glyph next to a word, never alone)
─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼   box-drawing in <pre>
```

## 8. Traps

| Feature | Works? | The cost |
|---|---|---|
| `<marquee>` | yes, all engines (`HTMLMarqueeElement`, `start()` / `stop()`) | Motion over 5 s needs a pause control (WCAG 2.2.2). Joke use only. |
| `<frameset>` | yes | The address bar shows the frameset, so bookmarks, shared links and the back button break. Poor on phones. |
| `<plaintext>` | yes | Everything after it, to the end of the file, becomes raw text. No closing tag. |
| `<image>` | yes | The parser rewrites it to `<img>`. Write `<img>`. |
| layout tables | yes | Screen readers announce them as data tables unless `role="presentation"`. Keep to one level. |
| `<font face="Named Font">` | where installed | Falls back silently. Always end with a generic family. |
| fixed colours + `color-scheme` meta | no | Fixed colours don't adapt. Choose one palette model per site. |
| legacy colour words | yes | Unreadable to the next person. |

## 9. Dead

Tested in Chrome 155: these do nothing. They parse as `HTMLUnknownElement` or are ignored.

| Element / attribute | Was |
|---|---|
| `<blink>` | Netscape. Removed from Firefox in 2013 (v23). |
| `<spacer>` | Netscape blank space. |
| `<basefont>` | default font for the page. Ignored. |
| `<multicol>` | Netscape columns. |
| `<layer>`, `<ilayer>` | Netscape 4 positioning. |
| `<bgsound>` | Internet Explorer background music. |
| `<isindex>`, `<keygen>`, `<applet>`, `<nextid>` | removed from the language. |
| `dl compact`, `ul compact` | no visible effect. |
| `body bgproperties="fixed"` | IE fixed wallpaper. |

## 10. Grey areas

- **SVG presentation attributes** (`fill="red"`) are attributes, like `bgcolor`. Inline SVG is
  allowed for images that are content (a diagram, a logo), never for page decoration.
- **Media queries in HTML** (`<meta name="theme-color" media="(prefers-color-scheme: dark)">`,
  `<source media>`) use CSS media-query syntax inside an HTML attribute. Allowed: they choose
  content, not style.
- **Reading computed style in tests** (as `probe.html` does) is fine. Pages never write it.
