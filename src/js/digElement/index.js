import { u_matches } from "@andresclua/jsutil";

/**
 * Inspect a specified HTML element for mutations in its styles, classes, data attributes, or the structure of its children.
 * @param {Object} payload - The payload containing different arguments.
 * @param {HTMLElement} payload.element - The element to check.
 * @param {Object} payload.search - It includes some options.
 * @param {String} payload.search.type - Define if you are looking for style, class or children elements.
 * @param {Array} payload.search.lookFor - Array of style properties/classes/data-attribute values.
 * @param {String} payload.search.attribute - The data attribute you are looking for.
 * @param {Number} payload.intervalFrequency - The frequency set to the interval.
 * @param {Number} payload.timer - The interval will be finished once this number in seconds is reached.
 * @param {Function} payload.callback - A callback function to execute once the promise is resolved.
 * @returns {Promise<boolean>} A Promise that resolves to `true` when the requested values are matched.
 *
 * @example
 * // Example usage:
Promise.all(
    elements.map(async (element) => {
        await digElement({
            element: element,
            search: {
                type: "style",
                lookFor: ["max-height"],
            },
            intervalFrequency: 1500,
            timer: 5000,
            callback: () => console.log("COMPLETED!"),
        });
    })
)
.then(() => {
    console.log("READY");
})
.catch((error) => console.log(error.message));
 */

const digElement = async (payload) => {
    return new Promise((resolve, reject) => {
        if (!payload.element) {
            return reject(new Error("An element is required."));
        }

        const intervalId = setInterval(() => {
            if (payload.search?.type == "style") {
                if (payload.search.lookFor.some((property) => payload.element.style[property])) {
                    if (payload.callback) payload.callback();
                    resolve(true);
                    clearInterval(intervalId);
                }
            } else if (payload.search?.type == "class") {
                if (u_matches(payload.element, payload.search.lookFor, payload.search.attribute || payload.search.type)) {
                    if (payload.callback) payload.callback();
                    resolve(true);
                    clearInterval(intervalId);
                }
            } else if (payload.search?.type == "hasChildren") {
                if (payload.element.children.length > 0) {
                    if (payload.callback) payload.callback();
                    resolve(true);
                    clearInterval(intervalId);
                }
            }
        }, payload.intervalFrequency || 1000);

        setTimeout(() => {
            reject(new Error("Time is out."));
            clearInterval(intervalId);
        }, payload.timer || 5000);
    });
};

export { digElement };
