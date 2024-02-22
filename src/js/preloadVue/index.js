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

export { preloadVue };
