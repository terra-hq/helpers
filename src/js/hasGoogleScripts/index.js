/**
 * Checks for the presence of specific Google scripts on the page, such as Google Analytics and Google Tag Manager.
 * The function uses a timeout mechanism to repeatedly check for these scripts and resolves a promise based on their detection.
 * 
 * @param {Object} [options] - Configuration options for the script detection.
 * @param {Array<string>} [options.detect=['analytics', 'gtm']] - Array of Google scripts to check for. Possible values are:
 *    - `'analytics'`: Checks for Google Analytics cookies.
 *    - `'gtm'`: Checks for the presence of Google Tag Manager's dataLayer object.
 * @param {number} [options.maxTime=5000] - Maximum time in milliseconds to wait for script detection before resolving the promise.
 * @param {boolean} [options.enableLogging=true] - Flag to enable or disable console logging for debugging purposes.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the specified Google scripts are detected, and `false` if not.
 *
 * @example
 * // Example usage:
 * hasGoogleScripts({
 *   detect: ['analytics', 'gtm'],
 *   maxTime: 5000,
 *   enableLogging: true
 * })
 * .then((detected) => {
 *   if (detected) {
 *     console.log('Google scripts detected.');
 *   } else {
 *     console.log('Google scripts not detected within the specified time.');
 *   }
 * })
 * .catch((error) => {
 *   console.error('Error checking Google scripts:', error);
 * });
 */

export function hasGoogleScripts(options = { detect: ['analytics', 'gtm'], maxTime: 5000, enableLogging: true }) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const detectOptions = options.detect || ['analytics', 'gtm'];
        const enableLogging = options.enableLogging !== undefined ? options.enableLogging : true;

        function checkForUniversalAnalytics() {
            const hasGACookies = document.cookie.split(';').some(cookie => cookie.trim().startsWith('_ga'));
            return hasGACookies;
        }

        function isGTMInstalled() {
            return window.dataLayer && Array.isArray(window.dataLayer);
        }

        function isGoogleAdsInstalled() {
            return window.google_tag_manager && window.google_tag_manager['AW'];
        }

        function checkScripts() {
            const currentTime = Date.now();
            const isAnalyticsDetected = detectOptions.includes('analytics') ? checkForUniversalAnalytics() : true;
            const isGTMDetected = detectOptions.includes('gtm') ? isGTMInstalled() : true;
            const isAdsDetected = detectOptions.includes('ads') ? isGoogleAdsInstalled() : true;

            if (isAnalyticsDetected && isGTMDetected && isAdsDetected) {
                if (enableLogging) {
                    console.log('Specified Google scripts are detected.');
                }
                resolve(true);
            } else if (currentTime - startTime > options.maxTime) {
                if (enableLogging) {
                    console.log('Maximum time exceeded. Resolving promise.');
                }
                resolve(false);
            } else {
                if (enableLogging) {
                    console.log('Checking for specified Google scripts...');
                }
                setTimeout(checkScripts, 1000);
            }
        }

        checkScripts();
    });
}
