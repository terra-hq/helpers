# Helpers by Terra

A comprehensive collection of utility functions designed to streamline project development, establish identity, and expedite progress. These helpers facilitate rapid development across various domains including asset preloading, marketing integrations, accessibility features, and general utilities.

## Installation

```bash
npm i @terrahq/helpers
```

## Table of Contents

- [Preload Utilities](#preload-utilities)
  - [Images](#images)
  - [Videos](#videos)
  - [Lottie Animations](#lottie-animations)
- [Marketing Integrations](#marketing-integrations)
  - [HubSpot](#hubspot)
  - [Google reCAPTCHA](#google-recaptcha)
  - [Google Scripts Detection](#google-scripts-detection)
- [Accessibility](#accessibility)
  - [Accessible Tab Navigation](#accessible-tab-navigation)
- [DOM Utilities](#dom-utilities)
  - [Element Viewport Detection](#element-viewport-detection)
  - [Element Modification](#element-modification)
  - [Element Inspector](#element-inspector)
- [Scroll Utilities](#scroll-utilities)
  - [Scroll Manipulation](#scroll-manipulation)
  - [Scroll Position Detection](#scroll-position-detection)
- [WordPress Utilities](#wordpress-utilities)
  - [Get ID by Slug](#get-id-by-slug)
  - [Get ID by Title](#get-id-by-title)
- [Development Tools](#development-tools)
  - [Terra Debugger](#terra-debugger)
  - [Breakpoints](#breakpoints)
- [General Utilities](#general-utilities)
  - [Query Parameter Detection](#query-parameter-detection)
  - [Ordered List Start](#ordered-list-start)

---

# Preload Utilities

## Images

Preloads images asynchronously using [ImagesLoaded](https://imagesloaded.desandro.com/).  
This utility supports different selector types and resolves once all matching images have been fully loaded.

**Supports:**
- `string` — a CSS selector (uses `querySelector` to find a container and preload all images inside it).  
- `HTMLElement` — a specific element whose images should be preloaded.  
- `NodeList` — a list of elements or images to preload in batch.

**Parameters:**
- `selector` (`string` | `HTMLElement` | `NodeList`): CSS selector, element, or NodeList of images/containers to preload. Default: `'img'`  
- `callback` (`function`, optional): Function called after all images are preloaded.  
- `debug` (`boolean`, optional): Enables console logging for debugging. Default: `false`.

---

### 🧠 Notes
- If a string is provided, it will target that container and preload all `<img>` elements inside.  
- You can preload multiple containers sequentially or in parallel using `for...of` or `Promise.all`.  
- Returns a Promise that resolves when all images are loaded successfully.

---

### ⚖️ When to use each pattern


| Pattern | Best for | When to use |
|----------|-----------|-------------|
| **Single call (string / element)** | Global preload | When you need all images ready before transitions, page entry animations, or a global layout render. |
| **Sequential (`for...of`)** | Ordered preloading | When you want to trigger animations or class changes one section at a time, ensuring each block is fully loaded before continuing. |
| **Parallel (`Promise.all`)** | Fast, independent loading | When load order doesn’t matter and you want the quickest possible load across multiple containers (e.g., image grids, cards). |

---

### 💡 Examples

```javascript
import { preloadImages } from "@terrahq/helpers/preloadImages";

// 1️⃣ Single call
const gallery = document.querySelector(".gallery");
await preloadImages({
  selector: gallery,
  callback: () => console.log("Gallery ready"),
});

// 2️⃣ Sequential (for...of)
const sections = document.querySelectorAll(".js--image-block");
for (const section of sections) {
  await preloadImages({ selector: section });
  section.classList.add("is-loaded");
}

// 3️⃣ Parallel (Promise.all)
const blocks = document.querySelectorAll(".js--lazy-image");
await Promise.all([...blocks].map((el) => preloadImages({ selector: el })));
console.log("All sections loaded in parallel");
```


---



## Videos

Preloads video elements asynchronously using the [`canplaythrough`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event) event.  
This operation resolves once all videos can play through **or** the maximum time limit is reached.

**Supports:**
- `string` — a CSS selector for a container; preloads all `<video>` elements inside.
- `HTMLElement` — a specific element whose `<video>` elements should be preloaded.
- `NodeList` — a list of elements or videos to preload in batch.

**Parameters:**
- `selector` (`string` | `HTMLElement` | `NodeList`): Target container, element, or NodeList containing `<video>` elements.  
- `maxTime` (`number`, optional): Maximum time (in milliseconds) to wait for each video. Default: `5000`.  
- `callback` (`function`, optional): Function called when all videos are preloaded or the time limit is reached. Receives an array of all video elements.  
- `debug` (`boolean`, optional): Enable debug logging. Default: `false`.

**Returns:**  
`Promise<string>` — Resolves with `"All videos can play through"` or `"Time limit reached"`.

---

### 💡 Examples

```javascript
import { preloadVideos } from "@terrahq/helpers/preloadVideos";

// 1️⃣ Preload videos inside a container
await preloadVideos({
  selector: ".video-gallery",
  maxTime: 1200,
  debug: true,
  callback: (videos) => {
    console.log("Gallery videos loaded:", videos.length);
    // Example: autoplay muted videos after preload
    videos.forEach((video) => {
      video.muted = true;
      video.play().catch(() => console.warn("Autoplay blocked:", video));
    });
  },
});

// 2️⃣ Sequential preload for multiple sections
const sections = document.querySelectorAll(".js--video-block");

for (const section of sections) {
  await preloadVideos({
    selector: section,
    maxTime: 1000,
    debug: true,
  });
  console.log("Loaded:", section);
}


// 3️⃣ Parallel preload for all containers
const blocks = document.querySelectorAll(".js--video-block");

await Promise.all(
  [...blocks].map((el) => preloadVideos({ selector: el, maxTime: 1000 }))
);

console.log("✅ All videos are ready to play");
```


## Lottie Animations

Initializes Lottie animations using [lottie-web](https://www.npmjs.com/package/lottie-web).  
**Per-element only:** the helper accepts **one `HTMLElement`**. For multiple elements, iterate yourself.

**Supports:**
- `HTMLElement` — a single `.js--lottie-element` selected via `document.querySelector`.

**Parameters:**
- `selector` (`HTMLElement`): Lottie container element (required).
- `callback` (`function`, optional): Called with the created `AnimationItem`.
- `debug` (`boolean`, optional): Enables console debug logs. Default: `false`.

**Returns:**  
`Promise<AnimationItem>` — The created Lottie instance. The instance is also stored at `window.WL[data-name]`.

### 🧠 Notes
- If `data-path` is missing, the helper uses the fallback:  
  `https://placeholder.terrahq.com/lotties/terraform-1.json`.
- The instance is saved to `window.WL[data-name]`. If the same `data-name` already exists, the helper **throws an error** (prevents duplicates).
- Use `for...of` or `Promise.all` to handle multiple elements.
---

### ⚖️ When to use each pattern

| Pattern | Best for | When to use |
|---|---|---|
| **Single element** | One container | Initialize a single Lottie (e.g., hero animation). |
| **Sequential (`for...of`)** | Ordered setup | When you want to mark/animate each block after its Lottie is ready. |
| **Parallel (`Promise.all`)** | Fast, independent setup | When order doesn’t matter and you want the quickest overall init. |


### 💡 Examples

```javascript
import { preloadLotties } from "@terrahq/helpers/preloadLotties";

// 1️⃣ Single element
const el = document.querySelector(".js--lottie-item");
await preloadLotties({
  selector: el,
  debug: true,
  callback: (anim) => {
    console.log("Single lottie initialized");
    anim.play(); // optional
  },
});

// 2️⃣ Multiple — sequential (for...of)
const nodes = document.querySelectorAll(".js--lottie-element");
for (const el of nodes) {
  await preloadLotties({
    selector: el,
    debug: true,
    callback: (anim) => {
      el.classList.add("is-loaded");
    },
  });
}
console.log("All lotties initialized sequentially");

// 3️⃣ Multiple — parallel (Promise.all)
const nodes = document.querySelectorAll(".js--lottie-parallel");
await Promise.all(
  [...nodes].map((el) =>
    preloadLotties({
      selector: el,
      callback: (anim) => {
        // optional per-element control
        // anim.pause();
      },
    })
  )
);
console.log("All lotties initialized in parallel");



// 4️⃣ Handling duplicate names (example with try/catch)
const elA = document.querySelector("#lottieA");
const elB = document.querySelector("#lottieB"); // same data-name would cause an error
try {
  await preloadLotties({ selector: elA });
  await preloadLotties({ selector: elB }); // throws if elB has same data-name as elA
} catch (err) {
  console.error("Lottie init error:", err.message);
}
```

### Controlling animations
```js
// From anywhere after initialization:
window.WL["myLottie"].play();
window.WL["myLottie"].pause();
window.WL["myLottie"].stop();
```


---

# Marketing Integrations

#### HubSpot

Submit form data directly to HubSpot using their API. Uses axios for HTTP requests.

**Rate Limits:**
- 50 requests per 10 seconds
- Does not support reCAPTCHA
- Accepts CORS requests for client-side submissions

**Parameters:**
- `portalId` (string): Your HubSpot portal ID
- `formId` (string): Your HubSpot form ID
- `formInputs` (object): Form data to submit
- `callback` (function, optional): Function called after submission
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { submitToHubspot } from "@terrahq/helpers/hubspot";

const payload = {
  portalId: "YOUR_PORTAL_ID",
  formId: "YOUR_FORM_ID",
  formInputs: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  callback: (result) => {
    console.log("Callback result:", result);
    if (result.success) {
      // Handle successful submission
    } else {
      // Handle submission error
    }
  },
  debug: true,
};

try {
  const submissionResult = await submitToHubspot(payload);
  console.log(submissionResult.message);
} catch (error) {
  console.error("Submission error:", error.message);
}
```

#### Google reCAPTCHA

Helper functions for implementing Google reCAPTCHA v3 in forms.

#### Load reCAPTCHA Script

```javascript
import { GET_RECAPTCHA_SCRIPT_FROM_GOOGLE } from "@terrahq/helpers/recaptcha";

const publicKey = "YOUR_PUBLIC_KEY";
const loadRecaptchaScript = await GET_RECAPTCHA_SCRIPT_FROM_GOOGLE({
  API_KEY: publicKey,
});
```

#### Get Client Token

```javascript
import { GET_RECAPTCHA_CLIENT_TOKEN } from "@terrahq/helpers/recaptcha";

const google_access_token = await GET_RECAPTCHA_CLIENT_TOKEN({
  API_KEY: publicKey,
  action: "submit",
});
```

#### Server-side Validation

```javascript
import { VALIDATE_RECAPTCHA_SERVER } from "@terrahq/helpers/recaptcha";

const response_from_server = await VALIDATE_RECAPTCHA_SERVER({
  type: "node",
  postUrl: "yoursite.com/api/validate_recaptcha",
  action: "recaptcha_validate",
  google_access_token: google_access_token,
});
```

**Note:** Server-side implementation examples available for [Node.js](https://gist.github.com/andresclua/02c8cc73c3a4f7ac1f78468b9e1c6b93) and [PHP](https://gist.github.com/andresclua/66b320e64857e0a3349411fbbefad4b4).

#### Google Scripts Detection

Asynchronously detects the presence of Google Analytics, Google Tag Manager, and Google Ads scripts.

**Parameters:**
- `detect` (array, optional): Scripts to detect. Default: `['analytics', 'gtm']`. Options: `'analytics'`, `'gtm'`, `'ads'`
- `maxTime` (number, optional): Maximum wait time in milliseconds. Default: `5000`
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { hasGoogleScripts } from "@terrahq/helpers/hasGoogleScripts";

await hasGoogleScripts({
  detect: ['analytics', 'gtm', 'ads'],
  maxTime: 5000,
  debug: true
}).then((detected) => {
  if (detected) {
    // Scripts detected - execute your code
    this.loadGTM();
  } else {
    console.log("Google Scripts not detected");
  }
});
```

---

# Accessibility

#### Accessible Tab Navigation

Handles focus management for 'skip to main content' links and anchor navigation with keyboard support.

**Parameters:**
- `focusableElements` (array, optional): Element types to include as focusable. Default: `["a", "button", "input", "select", "textarea"]`

**HTML Requirements:**

Trigger elements must include:
- Class: `js--trigger-focus`
- Attribute: `data-focus-target='${focusTargetID}'`

Target elements must include:
- ID: `${focusTargetID}`

```javascript
import { accessibleTabNav } from "@terrahq/helpers/accessibleTabNav";

// Basic usage
accessibleTabNav();

// Custom focusable elements
accessibleTabNav({
  focusableElements: ["a", "button"],
});
```

**HTML Examples:**

```html
<!-- Skip to main content -->
<button
  class="js--trigger-focus"
  data-focus-target="main-content"
  tabindex="1"
>
  Skip to Main Content
</button>

<main id="swup">
  <div id="main-content">
    <!-- Main content -->
  </div>
</main>

<!-- Card with focus target -->
<a href="test" class="c--card-a" data-focus-target="section-3">
  <div class="c--card-a__ft-items">
    <h2>Title</h2>
    <p>Subtitle</p>
    <div>Link</div>
  </div>
</a>

<!-- Target section -->
<span id="section-3" class="js--invisible-span" style="position: relative; display:block;"></span>
<section>
  <div class="f--container">Content</div>
</section>
```

---

# DOM Utilities

#### Element Viewport Detection

Checks if a DOM element is currently visible in the viewport.

**Parameters:**
- `el` (HTMLElement): The element to check
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { isElementInViewport } from "@terrahq/helpers/isElementInViewport";

// Basic usage
const isInViewport = isElementInViewport({
  el: document.querySelector("#myElement"),
});

if (isInViewport) {
  console.log("Element is in viewport");
}

// With debug logging
const isInViewportDebug = isElementInViewport({
  el: document.querySelector("#myElement"),
  debug: true,
});
```

#### Element Modification

Modifies DOM element attributes with Promise-based error handling.

**Parameters:**
- `selector` (string): CSS selector for the target element
- `attributes` (object): Object containing attribute key-value pairs to set
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { modifyTag } from "@terrahq/helpers/modifyTag";

// Basic usage
modifyTag({
  selector: "#myElement",
  attributes: { "data-swup-ignore-script": "" },
})
.then((element) => {
  console.log("Element modified:", element);
})
.catch((error) => {
  console.error(error);
});

// With debug logging
modifyTag({
  selector: "#myElement",
  attributes: { 
    "data-swup-ignore-script": "",
    "class": "new-class"
  },
  debug: true,
});
```

#### Element Inspector

Monitors DOM elements for changes in styles, classes, attributes, or children structure.

**Parameters:**
- `element` (HTMLElement): The element to monitor
- `search` (object): Search configuration
  - `type` (string): Type of search - `'style'`, `'class'`, `'attribute'`, or `'hasChildren'`
  - `lookFor` (array): Array of values to look for (for style, class, or attribute searches)
  - `attribute` (string): Attribute name to monitor (for attribute searches)
- `intervalFrequency` (number): Check interval in milliseconds
- `timer` (number): Maximum monitoring duration in milliseconds
- `debug` (boolean, optional): Enable debug logging. Default: `false`
- `callback` (function, optional): Function called when search criteria is met

#### Style Search

```javascript
import { digElement } from "@terrahq/helpers/digElement";

await digElement({
  element: document.querySelector("#myElement"),
  search: {
    type: "style",
    lookFor: ["max-height"],
  },
  intervalFrequency: 1500,
  timer: 5000,
  debug: true,
  callback: () => console.log("Style found!"),
});
```

#### Class Search

```javascript
await digElement({
  element: document.querySelector("#myElement"),
  search: {
    type: "class",
    lookFor: ["test-class"],
  },
  intervalFrequency: 1500,
  timer: 5000,
  debug: true,
  callback: () => console.log("Class found!"),
});
```

#### Attribute Search

```javascript
await digElement({
  element: document.querySelector("#myElement"),
  search: {
    type: "attribute",
    attribute: "data-test",
    lookFor: ["value"],
  },
  intervalFrequency: 1500,
  timer: 5000,
  debug: true,
  callback: () => console.log("Attribute value found!"),
});
```

#### Children Detection

```javascript
await digElement({
  element: document.querySelector("#myElement"),
  search: {
    type: "hasChildren",
  },
  intervalFrequency: 1500,
  timer: 5000,
  debug: true,
  callback: () => console.log("Children detected!"),
});
```

---

# Scroll Utilities

#### Scroll Manipulation

Enable or disable page scrolling.

**Parameters:**
- `action` (string): `'block'` to disable scrolling, `'scroll'` to enable scrolling

```javascript
import { manipulateScroll } from "@terrahq/helpers/manipulateScroll";

// Disable scrolling
manipulateScroll("block");

// Enable scrolling
manipulateScroll("scroll");
```

#### Scroll Position Detection

Checks if the current vertical scroll position meets or exceeds a specified distance.

**Parameters:**
- `distance` (number): The scroll distance in pixels to check against

```javascript
import { scrollYis } from "@terrahq/helpers/scrollYis";

if (scrollYis({ distance: 30 })) {
  console.log("Scrolled 30 pixels or more from top");
} else {
  console.log("Scroll position is below 30 pixels");
}
```

---

# WordPress Utilities

#### Get ID by Slug

Retrieves WordPress post/page IDs by slug. Works only in WordPress environments.

**Parameters:**
- `slug` (string): The slug to search for
- `type` (array): Post types to search in (e.g., `['pages', 'posts']`)
- `callback` (function, optional): Function called after search completion
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { getIDbySlug } from "@terrahq/helpers/getIDbySlug";

const payload = {
  slug: "my-page-slug",
  type: ["pages", "posts"],
  callback: () => {
    console.log("Search completed!");
  },
  debug: true,
};

const postID = await getIDbySlug(payload);
if (postID) {
  console.log(`Found post with ID: ${postID}`);
} else {
  console.log("No post found with the specified slug.");
}
```

#### Get ID by Title

Retrieves WordPress post/page IDs by title. Works only in WordPress environments.

**Parameters:**
- `title` (string): The title to search for
- `type` (array): Post types to search in (e.g., `['pages', 'posts']`)
- `callback` (function, optional): Function called after search completion
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { getIDbyTitle } from "@terrahq/helpers/getIDbyTitle";

const payload = {
  title: "my-page-title",
  type: ["pages", "posts"],
  callback: () => {
    console.log("Search completed!");
  },
  debug: true,
};

const postID = await getIDbyTitle(payload);
if (postID) {
  console.log(`Found post with ID: ${postID}`);
} else {
  console.log("No post found with the specified title.");
}
```

---

# Development Tools

#### Terra Debugger

Development tool that displays current breakpoint information and provides quick access to QA dashboards.

**Parameters:**
- `submitQA` (string, optional): URL to QA dashboard (e.g., ClickUp space)

```javascript
import { terraDebugger } from "@terrahq/helpers/terraDebugger";

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param);
}

const terraDebug = getQueryParam("debug");

if (terraDebug) {
  terraDebugger({ 
    submitQA: "https://app.clickup.com/your-qa-space" 
  });
}
```

**Features:**
- Displays current breakpoint name
- Shows current window width
- Shows browser information
- Provides link to QA dashboard (if provided)
- Updates automatically on window resize

#### Breakpoints

Returns Terra's standard breakpoint configuration.

```javascript
import { breakpoints } from "@terrahq/helpers/breakpoints";

// Get all breakpoints as a single object
const bk = breakpoints.reduce(
  (target, inner) => Object.assign(target, inner),
  {}
);

console.log(bk.mobile);   // 580
console.log(bk.tablets);  // 810
console.log(bk.tabletm);  // 1024
console.log(bk.tabletl);  // 1300
console.log(bk.laptop);   // 1570
console.log(bk.desktop);  // 1700
```

**Available Breakpoints:**
- `mobile`: 580px
- `tablets`: 810px
- `tabletm`: 1024px
- `tabletl`: 1300px
- `laptop`: 1570px
- `desktop`: 1700px

---

# General Utilities

#### Query Parameter Detection

Checks for the presence of URL query parameters and retrieves their values.

**Parameters:**
- `name` (string): The query parameter name to check for

```javascript
import { hasQueryParameter } from "@terrahq/helpers/hasQueryParameter";

const result = hasQueryParameter({ name: "user" });
if (result) {
  console.log(`Query parameter 'user' has the value: ${result}`);
} else {
  console.log("Query parameter 'user' is not present in the URL.");
}
```

#### Ordered List Start

Converts the `start` attribute on `<ol>` elements to inline styles to prevent WordPress WYSIWYG editor conflicts.

```javascript
import { orderedListStart } from "@terrahq/helpers/orderedListStart";

// Automatically processes all <ol> elements with start attributes
orderedListStart();
```

---

## Contributing

When contributing to this library, please ensure:

1. All functions include proper JSDoc documentation
2. Examples are provided for each function
3. Error handling is implemented where appropriate
4. Debug options are available for development
5. Functions follow the established naming conventions

## License

This project is licensed under the MIT License.

## Changelog

### Version 0.87
- Updated Lottie, image, and video handling to work seamlessly with element-based structures.
### Version 0.86
- add window to terradebug
### Version 0.85
- Providing more options and insights for debugging and troubleshooting 
### Version 0.84
- Expanded debugger capabilities, providing more options and insights for debugging and troubleshooting.
