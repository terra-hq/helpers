/**
 * Checks if a specific query parameter is present in the current URL and returns its value.
 * If the parameter is not found, the function returns `false`.
 *
 * @param {Object} payload - The payload object containing different arguments.
 * @param {string} payload.name - The name of the query parameter to check in the URL.
 * @returns {string|boolean} - Returns the value of the query parameter if found; otherwise, returns `false`.
 *
 * @example
 * // Example usage:
 * // If the URL is: http://example.com/?user=JohnDoe
 * const result = hasQueryParameter({ name: 'user' });
 * 
 * if (result) {
 *   console.log(`Query parameter 'user' has the value: ${result}`);
 * } else {
 *   console.log("Query parameter 'user' is not present in the URL.");
 * }
 */
export function hasQueryParameter({ name }) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(name) ? urlParams.get(name) : false;
}
