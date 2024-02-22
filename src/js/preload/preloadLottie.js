import lottieweb from "lottie-web";

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

const preloadLotties = async () => {
    window.windowLotties = [];
    var allLotties = document.querySelectorAll(".js--lottie-data");
    if (allLotties.length) {
      for (let i = 0; i < allLotties.length; i++) {
        const element = allLotties[i];
        const loopAttr = element.getAttribute("data-loop");
        const autoplayAttr = element.getAttribute("data-autoplay");
  
        const loop = loopAttr === 'true';
        const autoplay = autoplayAttr === 'true';
  
        const animation = await lottieweb.loadAnimation({
          container: element,
          renderer: "svg",
          loop: loop,
          autoplay: autoplay,
          path: element.getAttribute("data-src"),
        });
  
        window.windowLotties[element.getAttribute("data-name")] = animation;
      }
    }
  };
  export { preloadLotties };
