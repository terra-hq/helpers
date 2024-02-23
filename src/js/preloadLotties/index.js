/**
 * Preloads Lottie animations asynchronously and resolves the Promise when all animations are loaded.
 *
 * @param {Object} payload - The payload containing different arguments.
 * @param {Boolean} payload.onScroll - It defines if the 'lottie-web' should be import on init or on window scroll.
 * @returns {Promise} - A Promise that resolves when all Lottie animations are successfully loaded.
 *
 * @example
 * // Preload Lottie animations with a specific identifier
 * preloadLotties()
 *   .then(() => {
 *     console.log('Lottie animations preloaded successfully');
 *     // Your code to handle when the animations are preloaded
 *   })
 *   .catch((error) => {
 *     console.error('Lottie animations preload error:', error.message);
 *     // Your error handling code
 *   });
 */

const executeDynamicImport = () => {
    import("lottie-web").then(async (x) => {
        for (let i = 0; i < document.querySelectorAll(".js--lottie-data").length; i++) {
            const element = document.querySelectorAll(".js--lottie-data")[i];
            const loopAttr = element.getAttribute("data-loop");
            const autoplayAttr = element.getAttribute("data-autoplay");

            const loop = loopAttr === "true";
            const autoplay = autoplayAttr === "true";

            const animation = await x.loadAnimation({
                container: element,
                renderer: "svg",
                loop: loop,
                autoplay: autoplay,
                path: element.getAttribute("data-src"),
            });

            window.windowLotties[element.getAttribute("data-name")] = animation;
        }
    });
    window.removeEventListener("scroll", executeDynamicImport);
};

const preloadLotties = (payload) => {
    window.windowLotties = [];
    if (document.querySelectorAll(".js--lottie-data").length) {
        if (payload?.onScroll) {
            window.addEventListener("scroll", executeDynamicImport);
        } else {
            executeDynamicImport();
        }
    }
};

export { preloadLotties };
