import imagesLoaded from "imagesloaded";
import WebFont from "webfontloader";
import lottieweb from "lottie-web";

/**
 * Preloads images asynchronously and resolves the Promise when all images are loaded.
 *
 * @param {string} [selector="img"] - Optional CSS selector for the images to preload. Default is "img".
 * @returns {Promise} - A Promise that resolves when all images are successfully loaded.
 *
 * @example
 *  Preload all images on the page
 * preloadImages()
 *   .then(() => {
 *     console.log('All images preloaded successfully');
 *     Your code to handle when images are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Image preload error:', error.message);
 *      Your error handling code
 *   });
 *
 * Preload specific images using a custom selector
 * preloadImages('.custom-images')
 *   .then(() => {
 *     console.log('Custom images preloaded successfully');
 *     Your code to handle when specific images are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Image preload error:', error.message);
 *     Your error handling code
 *   });
 */

const preloadImages = (selector = "img") =>
  new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });


/**
 * Preloads fonts asynchronously and resolves the Promise when the fonts are loaded.
 * It supports both Google Fonts and custom fonts.
 *
 * @param {Object} payload - An object containing information about the fonts to preload.
 *   - provider: A string indicating the font provider ('google' or 'custom').
 *   - families: An array of strings, specifying the font families to preload.
 *   - urls (optional for custom fonts): An array of strings, specifying the URLs for custom font CSS files.
 * @returns {Promise} - A Promise that resolves when the specified fonts are successfully loaded.
 *
 * @example
 * // Preload a single Google font family
 * preloadFonts({
 *   provider: 'google',
 *   families: ['Roboto']
 * }).then(() => {
 *   console.log('Roboto font preloaded successfully');
 * }).catch((error) => {
 *   console.error('Font preload error:', error.message);
 * });
 *
 * // Preload multiple Google font families
 * preloadFonts({
 *   provider: 'google',
 *   families: ['Montserrat', 'Open Sans']
 * }).then(() => {
 *   console.log('Montserrat and Open Sans fonts preloaded successfully');
 * }).catch((error) => {
 *   console.error('Font preload error:', error.message);
 * });
 *
 * // Preload custom fonts
 * preloadFonts({
 *   provider: 'custom',
 *   families: ['MyCustomFont'],
 *   urls: ['https://example.com/path/to/mycustomfont.css']
 * }).then(() => {
 *   console.log('Custom fonts preloaded successfully');
 * }).catch((error) => {
 *   console.error('Custom font preload error:', error.message);
 * });
 */


const preloadFonts = (payload) => {
  console.log("preload " + payload.provider);

  return new Promise((resolve, reject) => {
    if (payload.provider === 'google') {
      WebFont.load({
        google: {
          families: payload.families,
        },
        active: resolve,
        inactive: reject,
      });
    } else if (payload.provider === 'custom') {
      WebFont.load({
        custom: {
          families: payload.families,
          urls: payload.urls,
        },
        active: resolve,
        inactive: reject,
      });
    } else {
      reject(new Error('Unsupported font provider'));
    }
  });
};

/**
 * Preloads Lottie animations asynchronously and resolves the Promise when all animations are loaded.
 *
 * @param {string} id - The identifier for the Lottie animations to preload.
 * @returns {Promise} - A Promise that resolves when all Lottie animations are successfully loaded.
 *
 * @example
 * // Preload Lottie animations with a specific identifier
 * preloadLotties('my-animations')
 *   .then(() => {
 *     console.log('Lottie animations preloaded successfully');
 *     // Your code to handle when the animations are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Lottie animations preload error:', error.message);
 *     // Your error handling code
 *   });
 */

const preloadLotties = (id) =>
  new Promise(async (resolve) => {
    window.windowLotties = [];
    var allLotties = document.querySelectorAll(".js--lottie-data");
    if (allLotties) {
      for (let i = 0; i < allLotties.length; i++) {
        const element = allLotties[i];
        // Perform asynchronous operation here, e.g., API call, database query, etc.
        await lottieweb.loadAnimation({
          container: element, // the dom element that will contain the animation
          renderer: "svg",
          loop: true,
          name: element.getAttribute("data-name"),
          autoplay: element.getAttribute("data-autoplay"),
          path: element.getAttribute("data-src"), // the path to the animation json
        });
        window.windowLotties[`${element.getAttribute("data-name")}`] = element;
      }
    }
    resolve();
  });

/**
 * Preloads Vue.js asynchronously and resolves the Promise when Vue.js is loaded.
 *
 * @param {Object} payload - An object containing preload options.
 * @param {string} payload.element - The DOM element identifier associated with Vue.js.
 * @returns {Promise} - A Promise that resolves when Vue.js is successfully loaded.
 *
 * @example
 * 
 * preloadVue({ element: '#app' })
 *   .then(() => {
 *     console.log('Vue.js preloaded successfully');
 *     
 *   })
 *   .catch((error) => {
 *     console.error('Vue.js preload error:', error.message);
 * 
 *   });
 */

const preloadVue = (payload) =>
  new Promise((resolve) => {
    if (payload && payload.element) {
      const intervalIdVue = setInterval(() => {
        if (window["vueLoaded"]) {
          clearInterval(intervalIdVue); // Stop the interval
          resolve();
        }
      }, 100);
    } else {
      resolve();
    }
  });

export { preloadImages, preloadFonts, preloadLotties, preloadVue };
