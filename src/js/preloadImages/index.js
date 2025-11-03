import imagesLoaded from "imagesloaded";

/**
 * Preloads images asynchronously and resolves when all are fully loaded.
 *
 * Works with a string selector, a single HTMLElement, or a NodeList.
 * - If a string is provided, it uses `document.querySelector` and loads all <img> elements inside that container.
 * - If an HTMLElement is provided, it loads all <img> inside that element.
 * - If a NodeList is provided, it loads all elements in that list at once.
 *
 * @param {Object} payload - Configuration options.
 * @param {string|HTMLElement|NodeList} [payload.selector="img"] - CSS selector, DOM element, or NodeList.
 * @param {Function} [payload.callback] - Optional callback executed when all images finish loading.
 * @param {boolean} [payload.debug=false] - Optional flag to log debug information.
 * @returns {Promise<void>} - Resolves when all images are loaded successfully.
 *
 * @example
 * // 1️⃣ Load all images on the page
 * await preloadImages({ selector: "body" });
 * console.log("All images in <body> loaded");
 *
 * @example
 * // 2️⃣ Load all images inside a specific container
 * const gallery = document.querySelector(".gallery");
 * await preloadImages({ selector: gallery, debug: true });
 * console.log("Gallery images loaded");
 *
 * @example
 * // 3️⃣ Load multiple elements sequentially (one after another)
 * const sections = document.querySelectorAll(".js--lazy-image");
 * for (const section of sections) {
 *   await preloadImages({ selector: section });
 *   console.log("Loaded section:", section);
 * }
 *
 * @example
 * // 4️⃣ Load multiple elements in parallel
 * const blocks = document.querySelectorAll(".js--lazy-image");
 * await Promise.all([...blocks].map((el) => preloadImages({ selector: el })));
 * console.log("All sections loaded in parallel");
 */
const preloadImages = (payload = {}) => {
  const {
    selector = "img",
    callback,
    debug = false
  } = payload;

  return new Promise((resolve, reject) => {
    let elements;
    let selectorName = "";

    try {
      if (typeof selector === "string") {
        const el = document.querySelector(selector);
        if (!el) throw new Error(`No element found for selector "${selector}".`);
        elements = el.querySelectorAll("img");
        selectorName = selector;
      } else if (selector instanceof HTMLElement) {
        elements = selector.querySelectorAll("img");
        selectorName = selector.className || selector.tagName;
      } else if (selector instanceof NodeList) {
        elements = selector;
        selectorName = selector[0]?.className || "NodeList";
      } else {
        throw new Error("Invalid selector. Must be string, HTMLElement, or NodeList.");
      }

      if (debug) {
        console.log(`Debug: Found ${elements.length} image(s) inside "${selectorName}".`);
      }

      imagesLoaded(elements, { background: true }, () => {
        if (debug) console.log(`Debug: All images loaded for "${selectorName}".`);
        if (typeof callback === "function") callback();
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export { preloadImages };
