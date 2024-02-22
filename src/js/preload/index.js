import imagesLoaded from "imagesloaded";
import WebFont from "webfontloader";

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
 * Preloads video elements asynchronously and resolves the Promise when either all videos can play through, or the maximum time limit is reached.
 *
 * @param {Object} payload - The payload object containing the video selector and maximum time.
 * @param {string | NodeList} payload.selector - The CSS selector string or NodeList representing the video elements to preload.
 * @param {number} payload.maxTime - The maximum time in milliseconds to wait for each video to be ready to play.
 * @returns {Promise} - A Promise that resolves with a message indicating either the successful preloading of all videos or reaching the time limit.
 *
 * @example
 * // Preload videos using a CSS selector
 * preLoadVideos({ selector: '.js--video', maxTime: 300 })
 *   .then((message) => {
 *     console.log(message);
 *     // Your code to handle the resolved state
 *   })
 *   .catch((error) => {
 *     console.error('Video preload error:', error);
 *     // Your error handling code
 *   });
 *
 * @example
 * // Preload videos using a NodeList
 * const videoElements = document.querySelectorAll('.js--video');
 * preLoadVideos({ selector: videoElements, maxTime: 300 })
 *   .then((message) => {
 *     console.log(message);
 *     // Your code to handle the resolved state
 *   })
 *   .catch((error) => {
 *     console.error('Video preload error:', error);
 *     // Your error handling code
 *   });
 */


  const preLoadVideos = (payload) => {
    let isResolved = false; // Flag to check if the promise has already been resolved
  
    return Promise.race([
        new Promise((resolve) => {
            let elements = payload.selector instanceof Element ? [payload.selector] : payload.selector;
            let loadedVideos = 0;
  
            Array.from(elements).forEach(video => {
                video.addEventListener('canplaythrough', () => {
                    if (isResolved) return; // Check if already resolved
                    loadedVideos++;
                    if (loadedVideos === elements.length) {
                        isResolved = true; // Set the flag to true
                        resolve("All videos can play through");
                    }
                }, { once: true });
            });
        }),
  
        new Promise((resolve) => {
            let videoCount = payload.selector instanceof NodeList ? payload.selector.length : 1;
            setTimeout(() => {
                if (isResolved) return; // Check if already resolved
                isResolved = true; // Set the flag to true
                resolve("Time limit reached");
            }, payload.maxTime * videoCount);
        })
    ]);
  };
  

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
  //console.log("preload " + payload.provider);

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

export { preloadImages, preLoadVideos, preloadFonts, preloadVue };
