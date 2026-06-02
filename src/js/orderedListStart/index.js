/**
 * ORDERED LIST START
 * Set the start value for an ordered list that has a `start` attribute.
 *
 * Ordered lists with a start attribute will have their counter-reset CSS property
 * set to the value of the start attribute, minus 1. This is because the counter
 * starts at 1, and the start attribute is 1-indexed.
 *
 * @example
 * <ol id="my-list" start="4">
 *     <li>Item 4</li>
 *     <li>Item 5</li>
 *     <li>Item 6</li>
 * </ol>
 *
 * The above code will be rendered as:
 * <ol id="my-list" start="4" style="counter-reset: item 3;">
 *     <li>4. Item 4</li>
 *     <li>5. Item 5</li>
 *     <li>6. Item 6</li>
 * </ol>
 */

class OrderedListStart {
    constructor(payload) {
        this.DOM = {
            element: payload.element,
        };

        this.debug = payload.debug;

        if (this.DOM.element) {
            this.init();
        }
    }

    init() {
        const startAttr = this.DOM.element.getAttribute("start");
        if (startAttr === null) return;

        const start = parseInt(startAttr, 10);
        if (isNaN(start)) return;

        this.DOM.element.style.counterReset = "item " + (start - 1);
    }

    destroy() {
        if (this.DOM.element) {
            this.DOM.element.style.counterReset = "";
        }
    }
}

export default OrderedListStart;
