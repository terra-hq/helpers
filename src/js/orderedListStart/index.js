/**
 * Set the start value for ordered lists that have a start attribute.
 *
 * Ordered lists with a start attribute will have their counter-reset CSS property
 * set to the value of the start attribute, minus 1. This is because the counter
 * starts at 1, and the start attribute is 1-indexed.
 *
 * @function orderedListStart
 * @param {Element|NodeList|HTMLCollection|Element[]} list - The ordered list element, or a collection of ordered list elements.
 * @example
 * <ol id="my-list" start="4">
 *     <li>Item 4</li>
 *     <li>Item 5</li>
 *     <li>Item 6</li>
 * </ol>
 *
 * The above code will be rendered as:
 * <ol id="my-list" start="4" style="counter-reset: list-item 3;">
 *     <li>4. Item 4</li>
 *     <li>5. Item 5</li>
 *     <li>6. Item 6</li>
 * </ol>
 */
export function orderedListStart(list) {
    if (!list) return;
    const startLists = list instanceof Element ? [list] : Array.from(list);

    startLists.forEach((ol) => {
        const startAttr = ol.getAttribute('start');
        if (startAttr !== null) {
            const start = parseInt(startAttr, 10);
            if (!isNaN(start)) {
                ol.style.counterReset = 'item ' + (start - 1);
            }
        }
    });
}