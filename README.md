# Helpers by Terra

These functions play a crucial role in project development, establishing identity, streamlining processes, and expediting progress. Whether it's preloading assets, integrating reCAPTCHA, or incorporating HubSpot interactions, these simple functions facilitate rapid development, contributing to the sustainable growth of our projects.

```javascript
npm i @terrahq/helpers
```

## Preload
#### Images
Under the hood it uses [ImagesLoaded](https://imagesloaded.desandro.com/), **This is an async await operation** 
```javascript
import {preloadImages} from @terrahq/helpers/preload;
```
```javascript
preloadImages("img")
```


#### Fonts

Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/webfontloader) , **This is an async await operation** 
```javascript
import {preloadFonts} from @terrahq/helpers/preload;
```
```javascript
preloadFonts([
    'DMSans',
    'Domine',
]),
```


#### Lottie 
Under the hood it uses [WebFontLoad](https://www.npmjs.com/package/lottie-web) , **This is an async await operation** 
```javascript
import {preloadLotties} from @terrahq/helpers/preload;
```
```javascript
preloadLotties();
```
Se entiende que cada lottie se debe conformar de la siguiente manera
```html
<div class="js--lottie-data">

</div>
```

