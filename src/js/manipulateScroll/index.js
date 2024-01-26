/**
 * Inspect a specified HTML element for mutations in its styles, classes, data attributes, or the structure of its children.
 * @param {String} type - 'block' if you want to disable scrolling; 'scroll' when you pretend enabling it.
 *
 * @example
 * // Example usage:
ManipulateScroll("block");

ManipulateScroll("scroll");
 */

const manipulateScroll = (type) => {
    let isScrollEnabled = true;

    function preventDefault(e) {
        if (!isScrollEnabled) {
            e.preventDefault();
        }
    }

    function preventDefaultForScrollKeys(e) {
        if (!isScrollEnabled) {
            var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }
    }

    function disableScroll() {
        isScrollEnabled = false;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
        isScrollEnabled = true;
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    if (type === "block") {
        disableScroll();
    } else if (type === "scroll") {
        enableScroll();
    }
};

export { manipulateScroll };
