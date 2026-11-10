// play.js: makes every <form data-play> a live editor.
//
// The form holds a <textarea> (the source) and an <iframe> (the result).
// Typing re-renders the iframe from the textarea; the form's native reset
// button restores the original source. The iframe gets a whole document via
// srcdoc, so body-level attributes (bgcolor, link, background) and even
// <frameset> or <plaintext> work without leaking into this page.
//
// No styling happens here. The only things JS writes are the HTML attributes
// `rows` (textarea) and `height` (iframe) and the `srcdoc` property.

for (const form of document.querySelectorAll('form[data-play]')) {
  const source = form.querySelector('textarea');
  const result = form.querySelector('iframe');

  const fit = () => {
    source.rows = Math.max(4, source.value.split('\n').length + 1);
  };

  // Without a doctype the frame would render in quirks mode, which changes
  // table and font behaviour. Demos may leave it out; real pages never do.
  const render = () => {
    fit();
    const html = source.value;
    result.srcdoc = /^\s*<!doctype/i.test(html) ? html : '<!doctype html>\n' + html;
  };

  // Grow the frame to its content once the new document has loaded.
  // <iframe data-fixed> keeps its authored height (framesets have no scroll height).
  result.addEventListener('load', () => {
    if (result.hasAttribute('data-fixed')) return;
    const doc = result.contentDocument;
    if (!doc || !doc.documentElement) return;
    // The root box is as tall as the content (scrollHeight never drops below the
    // frame itself). +20 covers the body's collapsed 8px margins and the frame border.
    const h = Math.ceil(doc.documentElement.getBoundingClientRect().height) + 20;
    result.height = String(Math.min(Math.max(h, 60), 900));
  });

  source.addEventListener('input', render);

  // The reset event fires *before* the form restores its values, so wait one task.
  form.addEventListener('reset', () => setTimeout(render));

  render();
}
