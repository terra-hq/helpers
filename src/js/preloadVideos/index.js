// helpers/preloadVideos.js
/**
 * Preloads video elements and resolves when:
 *  - all videos can play through, or
 *  - the maximum time limit is reached (scaled by number of videos).
 *
 * Acepta string (selector), HTMLElement (contenedor) o NodeList.
 * - string: usa document.querySelector(selector) y busca <video> dentro del contenedor.
 * - HTMLElement: busca <video> dentro del elemento.
 * - NodeList: usa la lista directamente (de <video> o contenedores con <video>).
 *
 * @param {Object} payload
 * @param {string|HTMLElement|NodeList} payload.selector
 * @param {number} [payload.maxTime=5000] - Tiempo máximo en ms por video.
 * @param {Function} [payload.callback] - Se ejecuta al resolver; recibe Array<HTMLElement> de videos.
 * @param {boolean} [payload.debug=false]
 * @returns {Promise<string>} "All videos can play through" | "Time limit reached" | mensaje sin elementos
 *
 * @example
 * // 1️⃣ Preload videos inside a container
 * await preloadVideos({
 *   selector: ".js--video-block",
 *   maxTime: 400,
 *   callback: (videos) => {
 *     console.log("Videos ready:", videos.length);
 *   },
 *   debug: true,
 * });
 *
 * @example
 * // 2️⃣ Sequential preload for multiple sections
 * const sections = document.querySelectorAll(".js--video-block");
 * for (const section of sections) {
 *   await preloadVideos({ selector: section, maxTime: 300 });
 *   console.log("Loaded:", section);
 * }
 */
const preloadVideos = (payload = {}) => {
    const {
      selector,
      maxTime = 5000,
      callback = () => {},
      debug = false,
    } = payload;
  
    if (!selector) {
      if (debug) console.warn("Debug: selector missing");
      return Promise.resolve("No selector provided");
    }
  
    let elements;
    let selectorName = "";
  
    // Normaliza el selector
    if (typeof selector === "string") {
      const el = document.querySelector(selector);
      if (!el) return Promise.resolve(`No element found for selector "${selector}"`);
      elements = el.querySelectorAll("video");
      selectorName = selector;
    } else if (selector instanceof HTMLElement) {
      elements = selector.querySelectorAll("video");
      selectorName = selector.className || selector.tagName;
    } else if (selector instanceof NodeList) {
      elements = selector;
      selectorName = selector[0]?.className || "NodeList";
    } else {
      throw new Error("Invalid selector. Must be string, HTMLElement, or NodeList.");
    }
  
    if (debug) {
      console.log(`Debug: Found ${elements.length} video(s) inside "${selectorName}".`);
    }
    if (!elements.length) {
      return Promise.resolve(`No <video> elements found in "${selectorName}"`);
    }
  
    return new Promise((resolve) => {
      let isResolved = false;
      let loaded = 0;
  
      const allVideos = Array.from(elements);
  
      const handleResolve = (msg) => {
        if (isResolved) return;
        isResolved = true;
        try { callback(allVideos); } catch (_) {}
        resolve(msg);
      };
  
      allVideos.forEach((video) => {
        const onReady = () => {
          loaded++;
          if (debug) console.log(`Debug: ready (${loaded}/${allVideos.length}) →`, video.currentSrc || video.src);
          if (loaded === allVideos.length) handleResolve("All videos can play through");
        };
  
        if (video.readyState >= 4) {
          onReady();
        } else {
          video.addEventListener("canplaythrough", onReady, { once: true });
        }
      });
  
      setTimeout(() => handleResolve("Time limit reached"), maxTime * allVideos.length);
    });
  };
  
  export { preloadVideos };
  