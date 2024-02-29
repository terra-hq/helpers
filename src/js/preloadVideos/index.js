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
 * preloadVideos({ selector: '.js--video', maxTime: 300 })
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
 * preloadVideos({ selector: videoElements, maxTime: 300 })
 *   .then((message) => {
 *     console.log(message);
 *     // Your code to handle the resolved state
 *   })
 *   .catch((error) => {
 *     console.error('Video preload error:', error);
 *     // Your error handling code
 *   });
 */

const preloadVideos = (payload) => {
    let isResolved = false; // Flag to check if the promise has already been resolved

    return Promise.race([
        new Promise((resolve) => {
            let elements = payload.selector instanceof Element ? [payload.selector] : payload.selector;
            let loadedVideos = 0;

            Array.from(elements).forEach((video) => {
                video.addEventListener(
                    "canplaythrough",
                    () => {
                        if (isResolved) return; // Check if already resolved
                        loadedVideos++;
                        if (loadedVideos === elements.length) {
                            isResolved = true; // Set the flag to true
                            resolve("All videos can play through");
                        }
                    },
                    { once: true }
                );
            });
        }),

        new Promise((resolve) => {
            let videoCount = payload.selector instanceof NodeList ? payload.selector.length : 1;
            setTimeout(() => {
                if (isResolved) return; // Check if already resolved
                isResolved = true; // Set the flag to true
                resolve("Time limit reached");
            }, payload.maxTime * videoCount);
        }),
    ]);
};

export { preloadVideos };
