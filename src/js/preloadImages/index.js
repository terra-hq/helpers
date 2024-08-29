import imagesLoaded from "imagesloaded";

/**
 * Preloads images asynchronously and resolves the Promise when all images are loaded.
 * Optionally, a callback function can be provided, which will be called after the images have preloaded.
 * A debug option can be enabled to log information about the images that match the selector.
 *
 * @param {Object} payload - An object containing configuration options.
 * @param {string} [payload.selector="img"] - Optional CSS selector for the images to preload. Default is "img".
 * @param {Function} [payload.callback] - Optional callback function to be called when images are preloaded.
 * @param {boolean} [payload.debug=false] - Optional debug flag to log information about matched images. Default is false.
 * @returns {Promise} - A Promise that resolves when all images are successfully loaded.
 *
 * @example
 * // Preload all images on the page using Promises
 * preloadImages({})
 *   .then(() => {
 *     console.log('All images preloaded successfully');
 *     // Your code to handle when images are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Image preload error:', error.message);
 *     // Your error handling code
 *   });
 *
 * @example
 * // Preload specific images using a custom selector
 * preloadImages({ selector: '.custom-images' })
 *   .then(() => {
 *     console.log('Custom images preloaded successfully');
 *     // Your code to handle when specific images are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Image preload error:', error.message);
 *     // Your error handling code
 *   });
 *
 * @example
 * // Preload images with a callback function
 * preloadImages({ selector: '.custom-images', callback: () => {
 *   console.log('Custom images preloaded successfully using callback');
 *   // Your code to handle when specific images are preloaded
 * }});
 *
 * @example
 * // Using async/await with a callback function
 * (async () => {
 *   try {
 *     await preloadImages({
 *       selector: '.custom-images', 
 *       callback: () => {
 *         console.log('Callback: Custom images preloaded successfully');
 *         // Your code to handle when specific images are preloaded
 *       },
 *       debug: true
 *     });
 *     console.log('Await: Custom images preloaded successfully');
 *     // Additional code after images are preloaded
 *   } catch (error) {
 *     console.error('Image preload error:', error.message);
 *     // Your error handling code
 *   }
 * })();
 */

const preloadImages = (payload = {}) => {
    // Destructure properties from payload with default values
    const { 
        selector = "img", // Default to 'img' if no selector is provided
        callback, 
        debug = false 
    } = payload;

    return new Promise((resolve) => {
        let images;
        let selectorName = "";

        // Check if the selector is a string or a NodeList
        if (typeof selector === 'string') {
            images = document.querySelectorAll(selector);
            selectorName = selector;
        } else if (selector instanceof NodeList) {
            images = selector;
            selectorName = selector[0]?.className || 'NodeList'; // Get class name or fallback to 'NodeList'
        } else {
            throw new Error("Invalid selector provided. Must be a string or NodeList.");
        }

        if (debug) {
            console.log(`Debug: Found ${images.length} image(s) matching selector "${selectorName}".`);
        }
        
        imagesLoaded(images, { background: true }, () => {
            resolve();
            if (typeof callback === "function") {
                callback();
            }
        });
    });
};

export { preloadImages };