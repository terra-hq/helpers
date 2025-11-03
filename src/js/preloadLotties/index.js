import lottie from "lottie-web";

/**
 * Preloads/initializes Lottie animations and resolves when all are creadas.
 *
 * Acepta:
 * - string: selector de contenedor o del propio elemento lottie.
 * - HTMLElement: contenedor o elemento lottie individual.
 * - NodeList | Element[]: lista de elementos lottie.
 *
 * Si recibe un contenedor, buscara dentro elementos ".js--lottie-element".
 * Si recibe un elemento que parece lottie (tiene data-path o la clase), lo inicializa directo.
 *
 * @param {Object} payload
 * @param {string|HTMLElement|NodeList|Element[]} [payload.selector='.js--lottie-element']
 * @param {Function} [payload.callback] - Recibe Array<AnimationItem> con todas las instancias.
 * @param {Boolean} [payload.debug=false]
 * @returns {Promise<string>}
 *
 * @example
 * // 1) Contenedor: inicializa todos los .js--lottie-element dentro
 * await preloadLotties({ selector: ".gallery", debug: true });
 *
 * @example
 * // 2) Elemento individual
 * const el = document.querySelector(".js--lottie-element");
 * await preloadLotties({ selector: el });
 *
 * @example
 * // 3) Secuencial por bloques
 * const blocks = document.querySelectorAll(".js--lottie-block");
 * for (const b of blocks) await preloadLotties({ selector: b });
 *
 * @example
 * // 4) Paralelo por bloques
 * const blocks = document.querySelectorAll(".js--lottie-block");
 * await Promise.all([...blocks].map(b => preloadLotties({ selector: b })));
 */
export const preloadLotties = async (payload = {}) => {
  const {
    selector = ".js--lottie-element",
    callback = () => {},
    debug = false,
  } = payload;

  // namespace global opcional para referenciar por nombre
  if (!window.WL) window.WL = {};

  // --- Normalizacion de elementos destino
  const looksLikeLottieEl = (el) =>
    el &&
    (el.classList?.contains("js--lottie-element") ||
      el.hasAttribute?.("data-path") ||
      el.hasAttribute?.("data-animType"));

  let elements = [];

  if (typeof selector === "string") {
    const root = document.querySelector(selector);
    if (!root) {
      if (debug) console.warn(`Debug: No element found for selector "${selector}"`);
      return "No Lottie elements found to preload.";
    }
    // si el root parece ser un lottie, tomalo como unico elemento; si no, busca dentro
    elements = looksLikeLottieEl(root)
      ? [root]
      : Array.from(root.querySelectorAll(".js--lottie-element"));
  } else if (selector instanceof HTMLElement) {
    elements = looksLikeLottieEl(selector)
      ? [selector]
      : Array.from(selector.querySelectorAll(".js--lottie-element"));
  } else if (selector instanceof NodeList || Array.isArray(selector)) {
    elements = Array.from(selector);
  } else {
    throw new Error("Invalid selector. Must be string, HTMLElement, NodeList, or Element[].");
  }

  if (debug) {
    const where =
      typeof selector === "string"
        ? selector
        : selector instanceof HTMLElement
        ? selector.className || selector.tagName
        : "NodeList/Array";
    console.log(`Debug: Found ${elements.length} Lottie element(s) in "${where}".`);
  }

  if (!elements.length) return "No Lottie elements found to preload.";

  // --- Crear animaciones
  const animations = [];

  elements.forEach((el, i) => {
    const loop = el.getAttribute?.("data-loop") !== "false";
    const animType = el.getAttribute?.("data-animType") || "svg";
    const path =
      el.getAttribute?.("data-path") ||
      "https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json";
    const autoplay = el.getAttribute?.("data-autoplay") !== "false";

    const animItem = lottie.loadAnimation({
      container: el,
      renderer: animType, // 'svg' | 'canvas' | 'html'
      loop,
      path, // URL JSON
      autoplay,
    });

    if (debug) {
      console.log(
        `Debug: Lottie created #${i} → type:${animType}, loop:${loop}, autoplay:${autoplay}, path:${path}`
      );
    }

    // guardar referencia por data-name (o fallback)
    const dataName = el.getAttribute?.("data-name") || `lottie-${i}`;
    window.WL[dataName] = animItem;

    animations.push(animItem);
  });

  try {
    callback(animations);
  } catch (_) {}

  return "All Lottie animations are successfully loaded.";
};
