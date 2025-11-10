// helpers/preloadLotties.js
import lottie from "lottie-web";

/**
 * Initializes a single Lottie animation on the provided HTMLElement (per-element only).
 *
 * This utility is intentionally strict — it accepts only a single HTMLElement.
 * If you need to initialize multiple Lotties, loop through them manually using `for...of` or `Promise.all`.
 *
 * The initialized animation is stored globally under `window.WL[data-name]`.
 * If a Lottie with the same name already exists, an error is thrown to prevent duplicates.
 *
 * @param {Object} payload - Configuration object.
 * @param {HTMLElement} payload.selector - The Lottie container element (required).
 * @param {Function} [payload.callback] - Optional callback called with the created AnimationItem.
 * @param {boolean}  [payload.debug=false] - Enables console logging for debugging.
 * @returns {Promise<import('lottie-web').AnimationItem>} The created Lottie AnimationItem.
 *
 * @example
 * 1️⃣ Single element
 * const el = document.querySelector(".js--lottie-element");
 * await preloadLotties({
 *   selector: el,
 *   debug: true,
 *   callback: (anim) => anim.play(),
 * });
 *
 * @example
 * 2️⃣ Multiple (iterate manually — same pattern as preloadImages)
 * const items = document.querySelectorAll(".js--lottie-element");
 * for (const el of items) {
 *   await preloadLotties({ selector: el, debug: true });
 * }
 */
export const preloadLotties = async (payload = {}) => {
  const { selector, callback = () => {}, debug = false } = payload;

  // 🚫 Strict API: only HTMLElement is accepted
  if (!(selector instanceof HTMLElement)) {
    throw new Error("preloadLotties: `selector` must be an HTMLElement (use document.querySelector)");
  }

  // Define global namespace for referencing by name
  if (!window.WL) window.WL = {};

  const el = selector;

  // Extract attributes
  const dataName = el.getAttribute("data-name") || "lottie";
  const path = el.getAttribute("data-path") || "https://placeholder.terrahq.com/lotties/terraform-1.json"; // fallback path if missing
  const renderer = el.getAttribute("data-animType") || "svg"; // 'svg' | 'canvas' | 'html'
  const loop = el.getAttribute("data-loop") !== "false";
  const autoplay = el.getAttribute("data-autoplay") !== "false";

  // ❗Prevent duplicate Lottie names in global WL object
  if (window.WL[dataName]) {
    throw new Error(`preloadLotties: A Lottie named "${dataName}" already exists in window.WL. Use a unique data-name.`);
  }

  // ▶️ Create animation instance
  const animItem = lottie.loadAnimation({
    container: el,
    renderer,
    loop,
    path,
    autoplay,
  });

  if (debug) {
    console.log(
      `Lottie initialized → name:${dataName}, renderer:${renderer}, loop:${loop}, autoplay:${autoplay}, path:${path}`
    );
  }

  // Save instance globally for external control
  window.WL[dataName] = animItem;

  // Safe callback execution
  try {
    callback(animItem);
  } catch (err) {
    if (debug) console.warn("preloadLotties callback error:", err);
  }

  return animItem;
};
