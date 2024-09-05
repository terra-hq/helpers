/**
 * Checks if the vertical scroll position of the window is greater than or equal to a specified distance.
 *
 * This function determines whether the current vertical scroll position (`window.scrollY`) is at least
 * as far down the page as the given `distance`. It can be used to trigger actions based on the user's scroll position,
 * such as loading more content or changing the appearance of a navigation bar.
 *
 * @param {Object} payload - The payload object containing different arguments.
 * @param {number} payload.distance - The distance in pixels to check against the vertical scroll position.
 * @returns {boolean} - Returns `true` if the vertical scroll position is greater than or equal to the specified `distance`, otherwise `false`.
 *a
 * @example
 * // Example usage:
 * if (scrollYis({ distance: 300 })) {
 *     console.log('User has scrolled at least 300 pixels down the page.');
 * } else {
 *     console.log('User has not yet scrolled 300 pixels.');
 * }
 */
export function scrollYis({ distance }) {
    return window.scrollY >= distance;
}
