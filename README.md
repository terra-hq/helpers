# Helpers by Terra

These functions play a crucial role in project development, establishing identity, streamlining processes, and expediting progress. Whether it's preloading assets, integrating reCAPTCHA, or incorporating HubSpot interactions, these simple functions facilitate rapid development, contributing to the sustainable growth of our projects.

```javascript
npm i @terrahq/helpers
```

<br><br>

## Preload

### Images

Under the hood it uses [ImagesLoaded](https://imagesloaded.desandro.com/), **This is an async await operation**

Preloads images asynchronously and resolves the Promise when all images are loaded.
Optionally, a callback function can be provided, which will be called after the images have preloaded.
A debug option can be enabled to log information about the images that match the selector.
The selector can be a class or selector: 'img' for all images. If no selector is provided, preloadImages will look for img tags by default.

```javascript
import { preloadImages } from "@terrahq/helpers/preloadImages";

await preloadImages({
  selector: "img",
  callback: () => {
    console.log("All images loaded");
  },
  debug: false,
});
```

```javascript
import { preloadImages } from "@terrahq/helpers/preloadImages";

await preloadImages({
  selector: document.querySelectorAll(".js--image"),
  callback: () => {
    console.log("All images loaded");
  },
  debug: true,
});
```

<br>

### Videos

Under the hood it uses [canplaythrough](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event), **This is an async await operation**

Preloads video elements asynchronously and resolves the Promise when either all videos can play through, or the maximum time limit is reached.
Optionally, a callback function can be provided, which will be called after the videos have preloaded or the time limit is reached.
A debug option can be enabled to log information about the video elements that match the selector.

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

<br>

### Lottie

Under the hood it uses [lottie-web](https://www.npmjs.com/package/lottie-web) , **This is an async await operation**

Preloads Lottie animations asynchronously and resolves the Promise when all animations are loaded. Optionally, a callback function can be provided, which will be called after all Lottie animations are loaded. A debug option can be enabled to log information about the Lottie elements being processed.

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

Expected HTML structure for each Lottie element

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

Controlling Lottie animations via JavaScript

```javascript
window.WL["myLottie"].play(); // Play the Lottie animation
window.WL["myLottie"].pause(); // Pause the Lottie animation
window.WL["myLottie"].stop(); // Stop the Lottie animation
```

<br><br>

## Marketing

### Hubspot

Helper to submit directly to Hubspot. Using axios.
Submits form data to the HubSpot API using the specified portal ID and form ID. Optionally, a debug option can be enabled to log detailed information during the submission process, and a callback function can be provided to handle the response after the submission is completed.

- This endpoint has a rate limit of 50 requests per 10 seconds.
- When using this endpoint to integrate custom forms with HubSpot, keep in mind that the available endpoints do not log any API calls. Users will need to store their own logs.
- In addition to accepting server-side HTTP requests, this endpoint will accept cross-origin AJAX (CORS) requests, allowing you to submit form data directly to HubSpot client-side using JavaScript.
- This endpoint does not support reCAPTCHA. If reCAPTCHA has been enabled on the form, submissions will not be accepted.

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
  debug: true, // Enable debug mode
};

try {
  const submissionResult = await submitToHubspot(payload);
  console.log(submissionResult.message);
} catch (error) {
  // Handle unexpected errors during submission
  console.error("Submission error:", error.message);
}
```

## Miscellaneous

### Breakpoints

Helper function that returns all breakpoints for Terra

```javascript
import { breakpoints } from "@terrahq/helpers/breakpoints";
let bk = breakpoints.reduce(
  (target, inner) => Object.assign(target, inner),
  {}
);
console.log(bk.mobile);
```

### TerraDebugger

Helper function to develop better testing for Developers + UX/ui, it returns breakpoint name and clickup space.

```javascript
import { terraDebugger } from "@terrahq/helpers/terraDebugger";

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param); // returns true if the parameter is present, otherwise false
}

var terraDebug = getQueryParam("debug");

if (terraDebug) {
  terraDebugger({ submitQA: "your_QA_app" });
}
```

### Ordered List Start

This helper function is designed to change the `start` attribute on `<ol>` lists and convert it to inline styles, avoiding overwritten styling issues with the WordPress WYSIWYG editor.

```javascript
import { orderedListStart } from "@terrahq/helpers/orderedListStart";
```

### Dig Element

Helper function designed to inspect a specified HTML element for mutations in its styles, classes, data attributes, or the structure of its children.

The function returns a Promise resolving in true or rejecting with error message.

```javascript
import { digElement } from "@terrahq/helpers/digElement";
```

### 4 different ways of implementing it:

### 1 - Style Search

```javascript
Promise.all(
  elements.map(async (element) => {
    await digElement({
      element: element,
      search: {
        type: "style",
        lookFor: ["max-height"],
      },
      intervalFrequency: 1500,
      timer: 5000,
      debug: true,
      callback: () => console.log("COMPLETED!"),
    });
  })
)
  .then(() => {
    console.log("READY");
  })
  .catch((error) => console.log(error.message));
```

| #   | Parameter         | Type        | Description                                                       |
| --- | ----------------- | ----------- | ----------------------------------------------------------------- |
| 1   | element           | HTMLElement | The element to check                                              |
| 2   | search.type       | String      | The type of search, in this case 'style'                          |
| 3   | search.lookFor    | Array       | Array of styles properties to look for                            |
| 4   | intervalFrequency | Number      | Interval frequency in seconds                                     |
| 5   | timer             | Number      | The duration in seconds after which the interval will be finished |
| 6   | callback          | Function    | A callback function to execute once the promise is resolved       |

<br/><br/>

### Class Search

```javascript
Promise.all(
  elements.map(async (element) => {
    await digElement({
      element: element,
      search: {
        type: "class",
        lookFor: ["test-class"],
      },
      intervalFrequency: 1500,
      timer: 5000,
      debug: true,
      callback: () => console.log("COMPLETED!"),
    });
  })
)
  .then(() => {
    console.log("READY");
  })
  .catch((error) => console.log(error.message));
```

| #   | Parameter         | Type        | Description                                                       |
| --- | ----------------- | ----------- | ----------------------------------------------------------------- |
| 1   | element           | HTMLElement | The element to check                                              |
| 2   | search.type       | String      | The type of search, in this case 'class'                          |
| 3   | search.lookFor    | Array       | Array of classes to look for                                      |
| 4   | intervalFrequency | Number      | Interval frequency in seconds                                     |
| 5   | timer             | Number      | The duration in seconds after which the interval will be finished |
| 6   | callback          | Function    | A callback function to execute once the promise is resolved       |

<br><br>

### Attribute Search and look for a specific value

```javascript
Promise.all(
  elements.map(async (element) => {
    await digElement({
      element: element,
      search: {
        type: "class",
        attribute: "data-test",
        lookFor: ["value"],
      },
      intervalFrequency: 1500,
      timer: 5000,
      debug: true,
      callback: () => console.log("COMPLETED!"),
    });
  })
)
  .then(() => {
    console.log("READY");
  })
  .catch((error) => console.log(error.message));
```

Here's the information you provided in table format:

| #   | Parameter         | Type        | Description                                                       |
| --- | ----------------- | ----------- | ----------------------------------------------------------------- |
| 1   | element           | HTMLElement | The element to check                                              |
| 2   | search.type       | String      | The type of search, in this case 'class'                          |
| 3   | search.attribute  | String      | The data attribute to check                                       |
| 4   | search.lookFor    | Array       | Array of possible values for the data attribute                   |
| 5   | intervalFrequency | Number      | Interval frequency in seconds                                     |
| 6   | timer             | Number      | The duration in seconds after which the interval will be finished |
| 7   | callback          | Function    | A callback function to execute once the promise is resolved       |

<br><br>

### Search for children inside element

```javascript
Promise.all(
  elements.map(async (element) => {
    await digElement({
      element: element,
      search: {
        type: "hasChildren",
      },
      intervalFrequency: 1500,
      timer: 5000,
      debug: true,
      callback: () => console.log("COMPLETED!"),
    });
  })
)
  .then(() => {
    console.log("READY");
  })
  .catch((error) => console.log(error.message));
```

Here's the information in table format:

| #   | Parameter         | Type        | Description                                                       |
| --- | ----------------- | ----------- | ----------------------------------------------------------------- |
| 1   | element           | HTMLElement | The element to check                                              |
| 2   | search.type       | String      | The type of search, in this case 'hasChildren'                    |
| 3   | intervalFrequency | Number      | Interval frequency in seconds                                     |
| 4   | timer             | Number      | The duration in seconds after which the interval will be finished |
| 5   | callback          | Function    | A callback function to execute once the promise is resolved       |

---

### Manipulate Scroll

Helper function designed to enable/disable scrolling in your website.

```javascript
import { manipulateScroll } from "@terrahq/helpers/manipulateScroll";
```

```javascript
manipulateScroll("block");
manipulateScroll("scroll");
```

---

### Get ID by Slug

Helper function designed to get the ID/s of the specified pages/post types looking by slug (it works only for WordPress projects).

```javascript
import { getIDbySlug } from "@terrahq/helpers/getIDbySlug";
```

```javascript
const payload = {
  slug: "my-page-slug",
  type: ["pages", "posts"],
  callback: () => {
    console.log("This is a callback!");
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

---

### Get ID by Title

Helper function designed to get the ID/s of the specified pages/post types looking by title (it works only for WordPress projects).

```javascript
import { getIDbyTitle } from "@terrahq/helpers/getIDbyTitle";
```

```javascript
const payload = {
  title: "my-page-title",
  type: ["pages", "posts"],
  callback: () => {
    console.log("This is a callback!");
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

### hasQueryParameter

This function checks if a specific query parameter is present in the URL of the current window location and retrieves its value if it exists. It is particularly useful for accessing and manipulating URL parameters dynamically in client-side applications.

```javascript
import { hasQueryParameter } from "@terrahq/helpers/hasQueryParameter";

let result = hasQueryParameter({ name: "user" });
if (result) {
  console.log(`Query parameter 'user' has the value: ${result}`);
} else {
  console.log("Query parameter 'user' is not present in the URL.");
}
```

---

### scrollYis

This function checks if the current vertical scroll position (window.scrollY) of the window is equal to a specified distance. It is typically used in scenarios where you need to verify if the window has been scrolled to a particular vertical position.

```javascript
import { scrollYis } from "@terrahq/helpers/scrollYis";

if (scrollYis({ distance: 30 })) {
  console.log("The scroll position is exactly 30 pixels or more from the top.");
} else {
  console.log("The scroll position is below 30 pixels.");
}
```

---

## Google Scripts Detection

This utility function, `hasGoogleScripts`, is designed to asynchronously check for the presence of Google Analytics and Google Tag Manager scripts on a webpage. It returns a promise that resolves with a boolean value indicating whether the specified Google scripts are detected within a given timeframe.

```javascript
import { hasGoogleScripts } from "@terrahq/helpers/hasGoogleScripts";
```

### Function Signature

`async hasGoogleScripts(options = { detect: ['analytics', 'gtm'], maxTime: 5000, debug: false })`

- `options`: Optional configuration object.
  - `detect`: Array specifying which Google scripts to detect. Default is `['analytics', 'gtm']`. You can also detect Google Ads by adding a 'ads' to the array.
  - `maxTime`: Maximum time in milliseconds to wait for script detection. Default is `5000`.
  - `debug`: Default false, you can show the console logs with `debug: true`.

### Usage

The function can be used with `await` inside an async function, or with `.then()` for promise handling. Here's an example using `.then()` for handling the detection result:

```javascript
await hasGoogleScripts().then((detected) => {
  if (detected) {
    // Code to execute if the specified Google scripts are detected, e.g., load GTM
    this.loadGTM();
  } else {
    // Code to execute if the scripts are not detected within the specified time
    console.log("Google Scripts not detected");
  }
});
```

---

### Recaptcha

Helper to add recaptcha v3 to forms. It has several functions.
1st Asynchronously loads the reCAPTCHA script from Google with the specified API key.

```javascript
import { GET_RECAPTCHA_SCRIPT_FROM_GOOGLE } from "@terrahq/helpers/recaptcha";

var publicKey = "XXXXXXX";
var loadRecaptchaScript = await GET_RECAPTCHA_SCRIPT_FROM_GOOGLE({
  API_KEY: publicKey,
});
```

2nd Asynchronously retrieves a reCAPTCHA client token by executing the reCAPTCHA challenge.

```javascript
import { GET_RECAPTCHA_CLIENT_TOKEN } from "@terrahq/helpers/recaptcha";

var google_access_token = await GET_RECAPTCHA_CLIENT_TOKEN({
  API_KEY: publicKey,
  action: "submit",
});
```

3rd Validates a Google reCAPTCHA token on the server-side using either PHP or Node.js.

```javascript
import { VALIDATE_RECAPTCHA_SERVER } from "@terrahq/helpers/recaptcha";

var response_from_server = await VALIDATE_RECAPTCHA_SERVER({
  type: "node",
  postUrl: "yoursite.com/api/validate_recaptcha",
  action: "recaptcha_validate",
  google_access_token: google_access_token,
});
```

###### Note : you could use these reference as a draft, this is not production ready, samples for [Node](https://gist.github.com/andresclua/02c8cc73c3a4f7ac1f78468b9e1c6b93) or [PHP](https://gist.github.com/andresclua/66b320e64857e0a3349411fbbefad4b4)



## Accessible Tab Nav

It handles focus on 'skip to main content' and/or anchor to section enter keydown.



| #   | Parameter         | Type          | Description                                                                                 |
| --- | ----------------- | ------------- | ------------------------------------------------------------------------------------------- |
| 1   | focusableElements | Array<String> | It specifies which types of elements will be included as focusables within the focus target |

```javascript
import { accessibleTabNav } from "@terrahq/helpers/accessibleTabNav";
````

Trigger elements must include:

- class: 'js--trigger-focus'
- data-focus-target='${focusTargetID}'



Target elements must include:

- id: '${focusTargetID}'

---

HTML - Example 1:

```html
//header.php

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

HTML - Example 2:

```html
//card-a.php

<a href="test" class="c--card-a js--trigger-focus" data-focus-target="3">
  <div class="c--card-a__ft-items">
    <h2 class="c--card-a__ft-items__title">Title</h2>
    <p class="c--card-a__ft-items__subtitle">Subtitle</p>
    <div class="c--card-a__ft-items__btn">Link</div>
  </div>
</a>

//random-module.php

<span
  id="3"
  class="js--invisible-span"
  style="position: relative; display:block;"
></span>
<section class="">
  <div class="f--container">Content</div>
</section>
```

JavaScript:

```javascript
accessibleTabNav();

accessibleTabNav({
  focusableElements: ["a", "button"],
});
```

## isElementInViewport

This function checks if a DOM element is in the viewport. Optionally, it can log debug information about the element's position, viewport dimensions, and whether the element is currently visible within the viewport. It is useful for scenarios where you want to determine if an element is in view as the user scrolls through a page.

### Usage

```javascript
import { isElementInViewport } from "@terrahq/helpers/isElementInViewport";

// Example 1: Check if an element is in the viewport without debug logging
const isInViewport = isElementInViewport({
  el: document.querySelector("#myElement"),
});
if (isInViewport) {
  console.log("The element is in the viewport.");
} else {
  console.log("The element is not in the viewport.");
}

// Example 2: Check if an element is in the viewport with debug logging
const isInViewportDebug = isElementInViewport({
  el: document.querySelector("#myElement"),
  debug: true,
});
```

## modifyTag

This function modifies the attributes of a DOM element with an optional debug flag. It allows you to update an element’s attributes dynamically and includes an option to log detailed information for debugging.

### Usage

```javascript
import { modifyTag } from "@terrahq/helpers/modifyTag";

// Example 1: Modify an element's attributes without debug logging
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

// Example 2: Modify an element's attributes with debug logging
modifyTag({
  selector: "#myElement",
  attributes: { "data-swup-ignore-script": "" },
  debug: true,
})
  .then((element) => {
    console.log("Element modified:", element);
  })
  .catch((error) => {
    console.error(error);
  });
```
