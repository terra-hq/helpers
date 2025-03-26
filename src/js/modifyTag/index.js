/**
 * Modifies the attributes of a DOM element with an optional debug flag.
 * 
 * @param {Object} params - The parameters for modifying the element.
 * @param {string|null} params.selector - The CSS selector to identify the target element (optional if `element` is provided).
 * @param {HTMLElement|null} params.element - The target DOM element to modify (optional if `selector` is provided).
 * @param {Object} params.attributes - The attributes to be added to the target element (key-value pairs).
 * @param {boolean} [params.debug=false] - Optional debug flag to log information about the element modification.
 * @returns {Promise<HTMLElement>} Resolves with the modified element or rejects if an error occurs.
 * 
 * @example
 * modifyTag({
 *   selector: '#myElement',
 *   attributes: { 'data-swup-ignore-script': '' },
 *   debug: true,
 * }).then((element) => {
 *   console.log('Element modified:', element);
 * }).catch((error) => {
 *   console.error(error);
 * });
 */

export function modifyTag({ selector = null, element = null, attributes, debug = false }) {
    return new Promise((resolve, reject) => {
        try {
            // Selecting the desired element either via selector or directly if an element is provided
            let targetElement = element || document.querySelector(selector);

            if (!targetElement) {
                return reject(new Error('Element not found.'));
            }

            // Debugging: log the target element and attributes being added
            if (debug) {
                console.log('Modifying element:', targetElement);
                console.log('Adding attributes:', attributes);
            }

            // Adding the provided attributes to the target element
            Object.keys(attributes).forEach(key => {
                targetElement.setAttribute(key, attributes[key]);
            });

            // Debugging: log the final modified element
            if (debug) {
                console.log('Modified element:', targetElement);
            }

            // Resolving the promise with the modified element
            resolve(targetElement);
        } catch (error) {
            // Rejecting the promise if an error occurs
            reject('Error modifying the element: ' + error.message);
        }
    });
}