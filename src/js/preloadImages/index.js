import imagesLoaded from "imagesloaded";

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

export { preloadImages };
