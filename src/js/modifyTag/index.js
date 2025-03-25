/**
 * Modifies the attributes of a DOM element.
 * 
 * @param {Object} params - The parameters for modifying the element.
 * @param {string|null} params.selector - The CSS selector to identify the target element (optional if `element` is provided).
 * @param {HTMLElement|null} params.element - The target DOM element to modify (optional if `selector` is provided).
 * @param {Object} params.attributes - The attributes to be added to the target element (key-value pairs).
 * @returns {Promise<HTMLElement>} Resolves with the modified element or rejects if an error occurs.
 * 
 * @example
 * // Example 1: Modifying an element using a CSS selector with no delay
 * modifyTag({
 *   selector: '#myElement',
 *   attributes: {
 *     'data-swup-ignore-script': '',
 *   },
 * }).then((element) => {
 *   console.log('Element modified:', element);
 * }).catch((error) => {
 *   console.error(error);
 * });
 * 
 * @example
 * // Example 2: Modifying an already selected element
 * const myElement = document.querySelector('#myElement');
 * modifyTag({
 *   element: myElement,
 *   attributes: {
 *     'data-swup-ignore-script': '',
 *   },
 * }).then((element) => {
 *   console.log('Element modified:', element);
 * }).catch((error) => {
 *   console.error(error);
 * });
 */

export function modifyTag({ selector = null, element = null, attributes }) {
    return new Promise((resolve, reject) => {
        try {
            // Selecting the desired element either via selector or directly if an element is provided
            let targetElement = element || document.querySelector(selector);

            if (!targetElement) {
                return reject(new Error('Element not found.'));
            }

            // Adding the provided attributes to the target element
            Object.keys(attributes).forEach(key => {
                targetElement.setAttribute(key, attributes[key]);
            });

            // Resolving the promise with the modified element
            resolve(targetElement);
        } catch (error) {
            // Rejecting the promise if an error occurs
            reject('Error modifying the element: ' + error.message);
        }
    });
}
