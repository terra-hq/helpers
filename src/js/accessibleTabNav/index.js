/**
 * Handle focus on 'skip to main content' and/or anchor to section enter keydown.
 * @param {Object} payload - The payload containing different arguments.
 * @param {Array<String>} payload.focusableElements - An array that specifies which type of HTML elements should be included as focusables.
 *
 * @example
 * // Example usage:
accessibleTabNav();

accessibleTabNav({ focusableElements: ["a", "button"] });
 */

const accessibleTabNav = (payload) => {
    if (document.querySelectorAll(".js--trigger-focus").length) {
        document.querySelectorAll(".js--trigger-focus").forEach((trigger) => {
            if (trigger.dataset.focusTarget) {
                trigger.removeEventListener("keydown", handleKeydown);

                var handleKeydown = (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        const targetElement = document.getElementById(trigger.dataset.focusTarget);
                        const focusableElements = payload?.focusableElements || ["a", "button:not([type='hidden'])", "input:not([type='hidden'])"];
                        const nextFocusableElement = targetElement.querySelector(focusableElements.join(", ")) || targetElement?.nextElementSibling.querySelector(focusableElements.join(", "));
                        if (nextFocusableElement) {
                            nextFocusableElement.focus();
                        }
                    }
                };

                trigger.addEventListener("keydown", handleKeydown);
            }
        });
    }
};

export { accessibleTabNav };
