# hatepres

_hypermedia as the engine of presentation_

Use HTML to build an amazing slideshow. The whole software industry is moving toward everything-as-code - so should presentation tooling!

In addition to the opinionated core functionality (script) and stylesheet, the full power of HTML, JS and CSS is at the author's fingertips.

Here is a demo presentation with a hatepres presentation in action: https://antonstihl.github.io/hatepres

## Getting started

### Installation

Add the below script and stylesheet to the HTML `<head>`.

```html
<head>
  ...
  <script src="https://unpkg.com/hatepres@latest/script.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/hatepres@latest/styles.css" />
</head>
```

If you fancy managing packages there is also `npm install hatepres`, with which you instead reference the node_modules files.

### Core utilities

The basic building blocks - the bread and butter - of hatepres are:

1. `<section>` element

One section corresponds to one slide.

2. `hp-f` attribute

The `hp-f` attribute denotes a `f`ocusable element. By default, focusable elements are revealed one by one, to direct the audience's attention.

With hatepres, the `section` element and the `hp-f` are all you need to build a very pretty presentation.

### Example slideshow

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/hatepres/script.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/hatepres/styles.css" />
</head>
<body>
  <section>
    <h1>My presentation about stuff</h1>
    <p hp-f>Why are we here?</p>
    <p hp-f>How do I make you listen?</p>
  </section>
  <section>
    <p>Let's get to it...</p>
  </section>
  <section>
    <h2>Tooling</h2>
    <ul>
      <li hp-f>Tool A</li>
      <li hp-f>Tool B</li>
      <li hp-f>Tool c</li>
    </ul>
    <p hp-f>I guess now I have your attention!</p>
  </section>
</body>
</html>
```

### What's going on?

hatepres will start by showing the first section. When focusing next (arrow right / `n` key), the first focusable will receive focus and be revealed. As focus traverses the elements in the section, the default hatepres stylesheet helps the audience focus on one thing at a time.

When there are no more focusables in a section, the arrow down key (or `n` key) will reveal the next section into view.

That's the core concept. Try out the demo [here](https://antonstihl.github.io/hatepres).

### Reminder

Keep in mind that YOU are the presentation. The slideshow is just your visual aid. Good luck!

## Keyboard controls

| Key              | Action                       | Comment                                           |
| ---------------- | ---------------------------- | ------------------------------------------------- |
| Arrow right/left | Next/previous focus          |                                                   |
| `l` / `h`        | Next/previous focus          | VIM-style                                         |
| Arrow down/up    | Next/previous slide          |                                                   |
| `j` / `k`        | Next/previous slide          | VIM-style                                         |
| `n` / `b`        | Next/previous focus or slide | Next focus if any left on slide, else next slide. |
| `c`              | Toggle cursor on/off         |                                                   |

NB: The omission of mouse-click controls is intentional. Navigating a browser is typically clicky by nature, so hatepres tries to not jump the gun on your presentation progress. If you do want click controls, however, feel free to extend the functionality with JavaScript. For example, the global `hatepres.next()` function should behave like a default mouse left-click in PowerPoint.

## Reference

### Implementation philosophy

hatepres uses the DOM as its state - no persistent JavaScript state exists. Current section, current focus etc are _only_ persisted as classes on the elements. This is the reason for the name "Hypermedia As The Engine of Presentation". The hypermedia encodes the state and available actions.

A significant benefit is that extension, styling etc are very accessible to everyone.

### JavaScript API

🚧 To be documented. See and inspect demo for some live examples: https://antonstihl.github.io/hatepres
