# Helpers by Terra

These functions play a crucial role in project development, establishing identity, streamlining processes, and expediting progress. Whether it's preloading assets, integrating reCAPTCHA, or incorporating HubSpot interactions, these simple functions facilitate rapid development, contributing to the sustainable growth of our projects.

```javascript
npm i @terrahq/helpers
```

## Preload

---

#### Images

Under the hood it uses [ImagesLoaded](https://imagesloaded.desandro.com/), **This is an async await operation**

```javascript
import { preloadImages } from "@terrahq/helpers/preload";
```

```javascript
await preloadImages("img");
```

#### Fonts

Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/webfontloader) , **This is an async await operation**

```javascript
import { preloadFonts } from "@terrahq/helpers/preload";
```

For Google fonts

```javascript
await preloadFonts({
    provider: "google",
    families: ["DMSans", "Domine"], // Replace with your desired Google font families
});
```

For custom fonts

```javascript
await preloadFonts({
    provider: "custom",
    families: ["MyCustomFont"], // Replace with your custom font family names
    urls: ["https://example.com/path/to/mycustomfont.css"], // Replace with the URLs to your custom font CSS files
});
```

#### Lottie

Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/lottie-web) , **This is an async await operation**

```javascript
import { preloadLotties } from "@terrahq/helpers/preload";
```

```javascript
preloadLotties();
```

It is understood that each lottie must be formed in the following way

```html
<div class="js--lottie-data" data-src="filename.json" data-autoplay="true" data-name="myLottie"></div>
```

You can play/pause/etc via javascript, as all loties will live under window.windowLotties['data-name']

```javascript
window.windowLotties["myLottie"].play();
window.windowLotties["myLottie"].pause();
window.windowLotties["myLottie"].stop();
```

#### Vue

**This is an async await operation**

```javascript
import { preloadVue } from "@terrahq/helpers/preload";
```

```javascript
await preloadVue({
    element: document.querySelector(".js--vue"),
});
```

In the context of Vue.js development, it is recommended to initialize the loading state within the mounted lifecycle hook of a Vue page by setting window['vueLoaded'] to false. As data is successfully loaded, often achieved through tools like Axios, the loading state is then gracefully transitioned to true by updating the value of window['vueLoaded']. This practice elegantly manages the loading dynamics of the Vue page in harmony with the asynchronous data retrieval process.

##### MyVueApp.vue

```javascript
mounted() {
    window['vueLoaded'] = false
},
asyncData(){
    await axios.get("XXXX")
    window['vueLoaded'] = true
}
```

It is customary for each page to include the tag js--resources-vue. This serves as a visual cue, indicating that the enclosed Vue code should be scrutinized to ensure the proper loading and functioning of Vue components.

##### Mypage.astro

```html
<div class="js--vue">
    <MyVueApp></MyVueApp>
</div>
```

## Hubspot

Helper to submit directly to Hubspot.

-   This endpoint has a rate limit of 50 requests per 10 seconds.
-   When using this endpoint to integrate custom forms with HubSpot, keep in mind that the available endpoints do not log any API calls. Users will need to store their own logs.
-   In addition to accepting server-side HTTP requests, this endpoint will accept cross-origin AJAX (CORS) requests, allowing you to submit form data directly to HubSpot client-side using JavaScript.
-   This endpoint does not support reCAPTCHA. If reCAPTCHA has been enabled on the form, submissions will not be accepted.

```javascript
import { submitToHubspot } from "@terrahq/helpers/hubspot";
```

```javascript
// option 1
async function handleFormSubmit(formInputs) {
    const { message, success, statusCode } = await useHubSpot(portalId.value, formId.value, formInputs.concat(stepsResults.value));
}
// option 2
const handleFormSubmit = async (formInputs) => {
    const { message, success, statusCode } = await useHubSpot(portalId.value, formId.value, formInputs.concat(stepsResults.value));
};
```

-   **Message (String):** Returns a message indicating the status of the submission. If successful, it will be "Thanks for submitting." If there is an error, the message will contain details about the API error.

-   **Success (Boolean):** Returns true if the submission is successful, and false if there is an error.

-   **StatusCode (Integer):** Returns the HTTP status code indicating the result of the API request. A status code of 200 indicates success, while other codes such as 400, 300, or 500 correspond to different API errors.

## Recaptcha

Helper to add recaptcha v3 to our custom forms. It has several functions.
1 st Asynchronously loads the reCAPTCHA script from Google with the specified API key.

```javascript
import { GET_RECAPTCHA_SCRIPT_FROM_GOOGLE } from "@terrahq/helpers/recaptcha";
```

```javascript
var publicKey = "XXXXXXX";
var loadRecaptchaScript = await GET_RECAPTCHA_SCRIPT_FROM_GOOGLE({
    API_KEY: publicKey,
});
```

2nd Asynchronously retrieves a reCAPTCHA client token by executing the reCAPTCHA challenge.

```javascript
import { GET_RECAPTCHA_CLIENT_TOKEN } from "@terrahq/helpers/recaptcha";
```

```javascript
var google_access_token = await GET_RECAPTCHA_CLIENT_TOKEN({
    API_KEY: publicKey,
    action: "submit",
});
```

3rd Validates a Google reCAPTCHA token on the server-side using either PHP or Node.js.

```javascript
import { VALIDATE_RECAPTCHA_SERVER } from "@terrahq/helpers/recaptcha";
```

```javascript
var response_from_server = await VALIDATE_RECAPTCHA_SERVER({
    type: "node",
    postUrl: "yoursite.com/api/validate_recaptcha",
    action: "recaptcha_validate",
    google_access_token: google_access_token,
});
```

###### Note : you could use these reference as a draft, this is not production ready, samples for [Node](https://gist.github.com/andresclua/02c8cc73c3a4f7ac1f78468b9e1c6b93) or [PHP](https://gist.github.com/andresclua/66b320e64857e0a3349411fbbefad4b4)

---

## Swup / Scroll to Top

Helper to make pages scroll to top when page transition is fired.

```javascript
import { forceScrollToTop } from "./swup/index.js";
```

```javascript
await forceScrollToTop();
```

---

## Dig Element

Helper function designed to inspect a specified HTML element for mutations in its styles, classes, data attributes, or the structure of its children.

The function returns a Promise resolving in true or rejecting with error message.

```javascript
import { digElement } from "@terrahq/helpers/digElement";
```

### 4 different ways of implementing it:

---

1- Check if the element has new styles properties.

element: (HTMLElement) -> the element to check

search.type: (String) -> 'style'

search.lookFor: (Array) -> Array of styles properties

intervalFrequency: (Number) -> interval frequency in seconds

timer: (Number) -> the interval will be finished once this number in seconds is reached

callback: (Function) -> a callback function to execute once the promise is resolved

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
            callback: () => console.log("COMPLETED!"),
        });
    })
)
    .then(() => {
        console.log("READY");
    })
    .catch((error) => console.log(error.message));
```

---

2- Check if the element has new classes.

element: (HTMLElement) -> the element to check

search.type: (String) -> 'class'

search.lookFor: (Array) -> Array of classes

intervalFrequency: (Number) -> interval frequency in seconds

timer: (Number) -> the interval will be finished once this number in seconds is reached

callback: (Function) -> a callback function to execute once the promise is resolved

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
            callback: () => console.log("COMPLETED!"),
        });
    })
)
    .then(() => {
        console.log("READY");
    })
    .catch((error) => console.log(error.message));
```

---

3- Check if the element has a data-attribute set as a desired value.

element: (HTMLElement) -> the element to check

search.type: (String) -> 'class'

search.attribute: (String) -> Data Attribute

search.lookFor: (Array) -> Array of possible values

intervalFrequency: (Number) -> interval frequency in seconds

timer: (Number) -> the interval will be finished once this number in seconds is reached

callback: (Function) -> a callback function to execute once the promise is resolved

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
            callback: () => console.log("COMPLETED!"),
        });
    })
)
    .then(() => {
        console.log("READY");
    })
    .catch((error) => console.log(error.message));
```

---

4- Check if the element has children.

element: (HTMLElement) -> the element to check

search.type: (String) -> 'hasChildren'

intervalFrequency: (Number) -> interval frequency in seconds

timer: (Number) -> the interval will be finished once this number in seconds is reached

callback: (Function) -> a callback function to execute once the promise is resolved

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
            callback: () => console.log("COMPLETED!"),
        });
    })
)
    .then(() => {
        console.log("READY");
    })
    .catch((error) => console.log(error.message));
```
