/**
 * Checks if a DOM element is in the viewport.
 * Optionally logs debug information about the element's position, viewport dimensions, and whether it's in the viewport.
 * 
 * @param {Object} payload - The parameters for checking if the element is in the viewport.
 * @param {HTMLElement} payload.el - The DOM element to check for visibility in the viewport.
 * @param {boolean} [payload.debug=false] - Optional flag to log debugging information about the element's position.
 * @returns {boolean} Returns `true` if the element is in the viewport, otherwise `false`.
 * 
 * @example
 * // Example 1: Check if an element is in the viewport without debug logging
 * const isInViewport = isElementInViewport({ el: document.querySelector('#myElement') });
 * console.log(isInViewport);
 * 
 * // Example 2: Check if an element is in the viewport with debug logging
 * const isInViewportDebug = isElementInViewport({
 *   el: document.querySelector('#myElement'),
 *   debug: true,
 * });
 * console.log(isInViewportDebug);
 */

export const isElementInViewport = (payload) => {
    const { el, debug } = payload;

    // Check if the element is found
    if (!el) {
        console.log('Element not found.');
        return false;
    }

    const rect = el.getBoundingClientRect();

    // Check if the element is in the viewport
    const isInViewport = (
        rect.top >= 0 && rect.top <= window.innerHeight ||
        rect.top >= 0 && rect.top <= document.documentElement.clientHeight ||
        rect.top <= 0 && rect.bottom >= 0 
    );

    // If debug is true, log the element's position, viewport dimensions, and if it is in the viewport
    if (debug) {
        console.log(`Element #${el.id || el.tagName} - Position: top ${rect.top}, bottom ${rect.bottom}. Viewport: innerHeight ${window.innerHeight}, clientHeight ${document.documentElement.clientHeight}. Is in viewport: ${isInViewport}`);
    }

    return isInViewport;
}
