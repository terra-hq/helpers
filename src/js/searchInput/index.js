/**
 * Wires a custom clear button to an <input type="search">.
 *
 * Hiding the native clear "X" is the consumer's responsibility via CSS
 * (e.g. `input[type="search"]::-webkit-search-cancel-button { display: none; }`
 * and `::-ms-clear`, `::-ms-reveal` for legacy Edge/IE).
 *
 * Behavior:
 * - Clicking the clear button empties the input, dispatches an `input` event,
 *   returns focus to the input, and calls the optional `onClear` callback.
 * - The clear button visibility is toggled based on whether the input has a value
 *   by adding/removing the class defined in `visibleClass`.
 *
 * @param {Object} payload
 * @param {string|HTMLInputElement} payload.input - CSS selector or input element.
 * @param {string|HTMLElement} payload.clearButton - CSS selector or element for the custom clear button.
 * @param {string} [payload.visibleClass='clear-btn--is-active'] - Class toggled on the clear button when the input has value.
 * @param {Function} [payload.onClear] - Callback invoked after the input is cleared. Receives the input element.
 * @param {boolean} [payload.debug=false] - Enables console logging for debugging.
 * @returns {{ destroy: Function }} Handler with a `destroy` method to remove listeners.
 *
 * @example
 * import { searchInput } from "@terrahq/helpers/searchInput";
 *
 * searchInput({
 *   input: "#search",
 *   clearButton: ".js--search-clear",
 *   onClear: (el) => console.log("Cleared", el),
 * });
 */
const searchInput = ({ input, clearButton, visibleClass = "clear-btn--is-active", onClear, debug = false } = {}) => {
    const inputEl = typeof input === "string" ? document.querySelector(input) : input;
    const buttonEl = typeof clearButton === "string" ? document.querySelector(clearButton) : clearButton;

    if (!inputEl) {
        if (debug) console.warn("searchInput: input element not found", input);
        return { destroy: () => {} };
    }

    if (!buttonEl) {
        if (debug) console.warn("searchInput: clearButton element not found", clearButton);
        return { destroy: () => {} };
    }

    const syncVisibility = () => {
        if (inputEl.value.length > 0) {
            buttonEl.classList.add(visibleClass);
        } else {
            buttonEl.classList.remove(visibleClass);
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        inputEl.value = "";
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
        inputEl.focus();
        syncVisibility();
        if (typeof onClear === "function") onClear(inputEl);
        if (debug) console.log("searchInput: cleared", inputEl);
    };

    syncVisibility();
    inputEl.addEventListener("input", syncVisibility);
    buttonEl.addEventListener("click", handleClear);

    return {
        destroy: () => {
            inputEl.removeEventListener("input", syncVisibility);
            buttonEl.removeEventListener("click", handleClear);
        },
    };
};

export { searchInput };
