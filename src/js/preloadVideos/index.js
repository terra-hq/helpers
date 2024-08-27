/**
 * Preloads video elements asynchronously and resolves the Promise when either all videos can play through, or the maximum time limit is reached.
 * Optionally, a callback function can be provided, which will be called after the videos have preloaded or the time limit is reached.
 * A debug option can be enabled to log information about the video elements that match the selector.
 *
 * @param {Object} payload - The payload object containing the video selector, maximum time, optional callback, and debug flag.
 * @param {string | NodeList} payload.selector - The CSS selector string or NodeList representing the video elements to preload.
 * @param {number} payload.maxTime - The maximum time in milliseconds to wait for each video to be ready to play.
 * @param {Function} [payload.callback] - Optional callback function to be called when videos are preloaded or time limit is reached. Receives an array of all video elements as an argument.
 * @param {boolean} [payload.debug=false] - Optional debug flag to log information about matched video elements. Default is false.
 * @returns {Promise} - A Promise that resolves with a message indicating either the successful preloading of all videos or reaching the time limit.
 *
 * @example
 * // Preload videos using a CSS selector with Promise
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
 * // Preload videos using a NodeList with Promise
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
 *
 * @example
 * // Preload videos with a callback
 * preloadVideos({
 *   selector: document.querySelectorAll('.js--video'),
 *   maxTime: 300,
 *   callback: (videos) => {
 *     console.log('Callback: All videos preloaded or time limit reached', videos);
 *     // Your code to handle when videos are preloaded
 *   }
 * });
 */

const preloadVideos = (payload) => {
    // Destructure properties from payload with default values
    const { 
        selector, 
        maxTime, 
        callback = () => {}, 
        debug = false 
    } = payload;

    let isResolved = false; // Flag to check if the promise has already been resolved

    // Convert selector to NodeList if it's a string
    const elements = selector instanceof NodeList ? Array.from(selector) : document.querySelectorAll(selector);

    if (debug) {
        console.log(`Debug: Found ${elements.length} video element(s) matching selector "${selector instanceof NodeList ? 'NodeList' : selector}".`);
    }

    return Promise.race([
        new Promise((resolve) => {
            let loadedVideos = 0;

            elements.forEach((video) => {
                video.addEventListener(
                    "canplaythrough",
                    () => {
                        if (isResolved) return; // Check if already resolved
                        loadedVideos++;
                        if (loadedVideos === elements.length) {
                            isResolved = true; // Set the flag to true
                            resolve("All videos can play through");
                            callback(elements); // Pass all video elements to the callback
                        }
                    },
                    { once: true }
                );
            });
        }),

        new Promise((resolve) => {
            let videoCount = elements.length;
            setTimeout(() => {
                if (isResolved) return; // Check if already resolved
                isResolved = true; // Set the flag to true
                resolve("Time limit reached");
                callback(elements); // Pass all video elements to the callback
            }, maxTime * videoCount);
        }),
    ]);
};

export { preloadVideos };
