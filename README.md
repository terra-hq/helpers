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

## Preload Utilities

### Images

Preloads images asynchronously using [ImagesLoaded](https://imagesloaded.desandro.com/). This is an async/await operation that resolves when all images are loaded.

**Parameters:**
- `selector` (string|NodeList): CSS selector or NodeList of images to preload. Default: `'img'`
- `callback` (function, optional): Function called after images are preloaded
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { preloadImages } from "@terrahq/helpers/preloadImages";

// Basic usage
await preloadImages({
  selector: "img",
  callback: () => {
    console.log("All images loaded");
  },
  debug: false,
});

// With NodeList
await preloadImages({
  selector: document.querySelectorAll(".js--image"),
  callback: () => {
    console.log("All images loaded");
  },
  debug: true,
});
```

### Videos

Preloads video elements asynchronously using the [canplaythrough](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event) event. This is an async/await operation.

**Parameters:**
- `selector` (NodeList): NodeList of video elements to preload
- `maxTime` (number): Maximum time in milliseconds to wait for videos to load
- `callback` (function, optional): Function called after videos are preloaded or timeout
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { preloadVideos } from "@terrahq/helpers/preloadVideos";

await preloadVideos({
  selector: document.querySelectorAll(".js--video"),
  maxTime: 1300,
  callback: (payload) => {
    console.log("All videos are loaded");
  },
  debug: true,
});
```

### Lottie Animations

Preloads Lottie animations asynchronously using [lottie-web](https://www.npmjs.com/package/lottie-web). This is an async/await operation.

**Parameters:**
- `selector` (NodeList): NodeList of Lottie elements to preload
- `callback` (function, optional): Function called after all Lottie animations are loaded
- `debug` (boolean, optional): Enable debug logging. Default: `false`

```javascript
import { preloadLotties } from "@terrahq/helpers/preloadLotties";

await preloadLotties({
  debug: true,
  selector: document.querySelectorAll(".js--lottie-element"),
  callback: (payload) => {
    console.log("All lotties loaded", payload);
  },
});
```

**Expected HTML structure:**

```html
<div
  class="js--lottie-element"
  data-path="filename.json"
  data-animType="svg"
  data-loop="true"
  data-autoplay="false"
  data-name="myLottie"
></div>
```

**Controlling animations:**

```javascript
window.WL["myLottie"].play();   // Play animation
window.WL["myLottie"].pause();  // Pause animation
window.WL["myLottie"].stop();   // Stop animation
```

---

## Marketing Integrations

### HubSpot

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

### Google reCAPTCHA

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

### Google Scripts Detection

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

## Accessibility

### Accessible Tab Navigation

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

## DOM Utilities

### Element Viewport Detection

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

### Element Modification

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

### Element Inspector

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

## Scroll Utilities

### Scroll Manipulation

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

### Scroll Position Detection

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

## WordPress Utilities

### Get ID by Slug

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

### Get ID by Title

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

## Development Tools

### Terra Debugger

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

### Breakpoints

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

## General Utilities

### Query Parameter Detection

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

### Ordered List Start

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
