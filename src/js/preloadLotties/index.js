/**
 * Preloads Lottie animations asynchronously and resolves the Promise when all animations are loaded.
 * Optionally, a callback function can be provided, which will be called after all Lottie animations are loaded.
 * A debug option can be enabled to log information about the Lottie elements being processed.
 *
 * @param {Object} payload - The payload containing different arguments.
 * @param {string | Element[] | NodeList} [payload.selector='.js--lottie-element'] - Optional CSS selector string or a NodeList/array of elements to initialize Lottie animations on. Default selects all elements with the class '.js--lottie-element'.
 * @param {Function} [payload.callback] - Optional callback function to be called when all Lottie animations are preloaded. The callback receives an array of all Lottie animations as its argument.
 * @param {Boolean} [payload.debug=false] - Optional debug flag to log information about matched Lottie elements. Default is false.
 * @returns {Promise} - A Promise that resolves when all Lottie animations are successfully loaded.
 *
 * @example
 * // Preload Lottie animations with default settings
 * preloadLotties()
 *   .then(() => {
 *     console.log('Lottie animations preloaded successfully');
 *     // Your code to handle when the animations are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Lottie animations preload error:', error.message);
 *     // Your error handling code
 *   });
 *
 * @example
 * // Preload Lottie animations with a specific selector and debug mode
 * preloadLotties({
 *   selector: '.custom-lottie-element',
 *   callback: (animations) => {
 *     console.log('All Lottie animations completed:', animations);
 *   },
 *   debug: true
 * })
 *   .then(() => {
 *     console.log('Lottie animations preloaded successfully with debug mode');
 *     // Your code to handle when the animations are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Lottie animations preload error:', error.message);
 *     // Your error handling code
 *   });
 */

export const preloadLotties = async (payload = {}) => {
    const {
      selector = '.js--lottie-element',
      callback = () => {},
      debug = false,
    } = payload;
  
    // Ensure window.WL is defined
    if (!window.WL) {
      window.WL = {};
    }
  
    // Determine whether the selector is a string or a NodeList/array of elements
    const elements =
      typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
  
    // Debugging: Check if no elements are found and log a message
    if (debug && (!elements || elements.length === 0)) {
      console.warn('Debug: No Lottie elements found to preload.');
      return Promise.resolve('No Lottie elements found to preload.');
    }
  
    // Import the lottie-web module
    const response = await import('lottie-web');
    const animations = []; // To store all Lottie animation instances
  
    for (let i = 0; i < elements.length; i++) {
      // Get the data attributes or use default values
      let loop = elements[i].getAttribute('data-loop') !== 'false';
      let animType = elements[i].getAttribute('data-animType') || 'svg';
      let path =
        elements[i].getAttribute('data-path') ||
        'https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json';
      let autoplay = elements[i].getAttribute('data-autoplay') !== 'false';
  
      let animItem = response.loadAnimation({
        container: elements[i],
        renderer: animType,
        loop: loop,
        path: path,
        autoplay: autoplay,
      });
  
      // Debugging: Log each Lottie animation instance
      if (debug) {
        console.log(
          `Debug: Lottie animation instance created for element ${i} with path: ${path}`
        );
      }
  
      // Store animation instance
      animations.push(animItem);
  
      // Get the data-name attribute or use a default value
      let dataName = elements[i].getAttribute('data-name') || `lottie-${i}`;
      window.WL[dataName] = animItem;
    }
  
    // Call the callback with all animations once they're all set up
    callback(animations);
  
    return Promise.resolve('All Lottie animations are successfully loaded.');
  };
  