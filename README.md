# hatepres

_hypermedia as the engine of presentation_

This library aims to **make it easier for HTML-capable authors to craft a slide deck** as visual aid for a spoken presentation. The whole industry is moving toward everything-as-code and I think presentation visual aids should too.

In addition to the opinionated core functionality and design, the full power of HTML, JS and CSS is at the author's fingertips.

Have a look at (and inspect) this page to see hatepres in action: https://antonstihl.github.io/hatepres

## Getting started

### Step 0

First of all, create an HTML file for your presentation `📄 foo-bar.html`, in whatever way you like.

### Installation

Add the below script and stylesheet to the HTML `<head>`.

```html
<script src="https://unpkg.com/hatepres/script.js"></script>
<link rel="stylesheet" href="https://unpkg.com/hatepres/styles.css" />
```

Alternatively, if you fancy managing packages, instead use `npm install hatepres` and reference the files in node_modules.

### Author your content

1. In the HTML body, add at least two sections, with some child elements.
   - One `<section></section>` is one slide and will take up the full viewport.

Try navigating the sections by Up/Down arrow keys (or N/B or J/K). For most cases _this is quite enough_. Your presentation should now look decent, partly depending on your browser default styles and what content you put in 🙂

Let's add something very useful for the audience: **focus**.

2. For each element you want to be a separate focusable, add a `hs-f` attribute. The f means "focusable" and this will accomplish three things:
   - Initially hide the element
   - Reveal + highlight the element on focus
   - Un-highlight when focus moves on

```html
<section>
  <h1>My presentation</h1>
  <p hs-f>It's beautiful, is it not?</p>
  <p hs-f>And how about this one?</p>
</section>
```

You can now use the Right/Left arrow keys (or N/B or L/H) to steer the audience's focus through your focusables. Less noise, more focus on your message.

Pretty sweet, yes? No more clickapalooza in the sidebar hell that is PowerPoint/Google Slides/Keynote, just to accomplish rudimentary animations.

3. (_Optional_) Apply more additional styling and layout.

Remember: YOU are the presentation - this is just your visual aid. Good luck!

## Reference

🚧 To be implemented. See demo for key usage examples: https://antonstihl.github.io/hatepres

hatepres uses the DOM as its state - no persistent JavaScript state exists. This makes extension, styling etc super available.
