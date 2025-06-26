## Accessible Tab Nav

It handles focus on 'skip to main content' and/or anchor to section enter keydown.

### Parameters

| #   | Parameter         | Type          | Required | Default | Description                                                                                 |
| --- | ----------------- | ------------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| 1   | focusableElements | Array<String> | No       | `["a", "button:not([type='hidden'])", "input:not([type='hidden'])"]` | It specifies which types of elements will be included as focusables within the focus target |

### Usage

```javascript
import { accessibleTabNav } from "@terrahq/helpers/accessibleTabNav";

// Basic usage
accessibleTabNav();

// With custom focusable elements
accessibleTabNav({ 
  focusableElements: ["a", "button", "input", "[tabindex]"] 
});
```

### Requirements

**Trigger elements must include:**
- class: `js--trigger-focus`
- data-focus-target: `${focusTargetID}`

**Target elements must include:**
- id: `${focusTargetID}`

### How it works

When the Enter key is pressed on a trigger element, the function moves focus to the first focusable element within the target section or in its next sibling element.

---

### HTML Examples

**Example 1: Skip to Main Content**

```html
<!-- header.php -->

<main id="swup">
  <button
    class="js--trigger-focus"
    data-focus-target="main-content"
    tabindex="1"
  >
    Skip to Main Content
  </button>
  <div id="main-content">...</div>
  ...
</main>
```

**Example 2: Card Navigation to Section**

```html
<!-- card-a.php -->

<a href="test" class="c--card-a js--trigger-focus" data-focus-target="3">
  <div class="c--card-a__ft-items">
    <h2 class="c--card-a__ft-items__title">Title</h2>
    <p class="c--card-a__ft-items__subtitle">Subtitle</p>
    <div class="c--card-a__ft-items__btn">Link</div>
  </div>
</a>

<!-- random-module.php -->

<span
  id="3"
  class="js--invisible-span"
  style="position: relative; display:block;"
></span>
<section class="">
  <div class="f--container">Content</div>
</section>
