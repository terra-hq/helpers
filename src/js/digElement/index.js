import JSUTIL from "@andresclua/jsutil";

/**
 * Inspect a specified HTML element for mutations in its styles, classes, data attributes, or the structure of its children.
 * @param {Object} payload - The payload containing different arguments.
 * @param {HTMLElement} payload.element - The element to check.
 * @param {Object} payload.search - It includes some options.
 * @param {String} payload.search.type - Define if you are looking for style, class or children elements.
 * @param {Array} payload.search.lookFor - Array of style properties/classes/data-attribute values.
 * @param {String} payload.search.attribute - The data attribute you are looking for.
 * @returns {Promise<boolean>} A Promise that resolves to `true` when the requested values are matched.
 *
 * @example
 * // Example usage:
 * const intervalId = setInterval(() => {
    (async () => {
        const readyElement = await digElement({
            element: element,
            search: {
                type: "style",
                lookFor: ["max-height", "visibility"],
            },
        });

        if (readyElement) {
            clearInterval(intervalId);
        }
    })();
}, 1000);
 */

const digElement = async (payload) => {
    if (!payload.element) return Promise.resolve(false);

    return new Promise((resolve) => {
        if (payload.search?.type == "style") {
            resolve(payload.search.lookFor.some((property) => payload.element.style[property]));
        } else if (payload.search?.type == "class") {
            resolve(new JSUTIL().matches(payload.element, payload.search.lookFor, payload.search.attribute || payload.search.type));
        } else if (payload.search?.type == "hasChildren") {
            resolve(payload.element.children.length > 0);
        }
    });
};

export { digElement };
