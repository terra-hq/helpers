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
import {preloadImages} from "@terrahq/helpers/preload";
```
```javascript
await preloadImages("img")
```


#### Fonts

Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/webfontloader) , **This is an async await operation** 
```javascript
import {preloadFonts} from "@terrahq/helpers/preload";
```
```javascript
await preloadFonts([
    'DMSans',
    'Domine',
]),
```

#### Lottie 
Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/lottie-web) , **This is an async await operation** 
```javascript
import {preloadLotties} from "@terrahq/helpers/preload";
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
window.windowLotties['myLottie'].play()
window.windowLotties['myLottie'].pause()
window.windowLotties['myLottie'].stop()
```

#### Vue 
**This is an async await operation** 
```javascript
import {preloadVue} from "@terrahq/helpers/preload";
```
```javascript
await preloadVue({
    element : document.querySelector(".js--vue")
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

- This endpoint has a rate limit of 50 requests per 10 seconds.
- When using this endpoint to integrate custom forms with HubSpot, keep in mind that the available endpoints do not log any API calls. Users will need to store their own logs. 
- In addition to accepting server-side HTTP requests, this endpoint will accept cross-origin AJAX (CORS) requests, allowing you to submit form data directly to HubSpot client-side using JavaScript.
- This endpoint does not support reCAPTCHA. If reCAPTCHA has been enabled on the form, submissions will not be accepted. 
```javascript
import {submitToHubspot} from "@terrahq/helpers/hubspot";
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
message (String): Returns a message indicating the status of the submission. If successful, it will be "Thanks for submitting." If there is an error, the message will contain details about the API error.

success (Boolean): Returns true if the submission is successful, and false if there is an error.

statusCode (Integer): Returns the HTTP status code indicating the result of the API request. A status code of 200 indicates success, while other codes such as 400, 300, or 500 correspond to different API errors.

## Recaptcha
Helper to add recaptcha v3 to our custom forms. This resturns a token.
```javascript
import {recaptcha_v3} from "@terrahq/helpers/recaptcha";
```
```javascript
var GoogleAccesToken = await recaptcha_v3({
    API_KEY : "XXXXXX",
});
```

## Swup / Scroll to Top
Helper to make pages scroll to top when page transition is fired.
```javascript
import {forceScrollToTop} from './swup/index.js';
```
```javascript
await forceScrollToTop()
```