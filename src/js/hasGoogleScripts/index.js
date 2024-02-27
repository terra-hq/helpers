export function hasGoogleScripts(options = { detect: ['analytics', 'gtm'], maxTime: 5000 }) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const detectOptions = options.detect || ['analytics', 'gtm'];

        function checkForUniversalAnalytics() {
            const hasGACookies = document.cookie.split(';').some(cookie => cookie.trim().startsWith('_ga'));
            return hasGACookies;
        }

        function isGTMInstalled() {
            return window.dataLayer && Array.isArray(window.dataLayer);
        }

        function checkScripts() {
            const currentTime = Date.now();
            const isAnalyticsDetected = detectOptions.includes('analytics') ? checkForUniversalAnalytics() : true;
            const isGTMDetected = detectOptions.includes('gtm') ? isGTMInstalled() : true;

            if (isAnalyticsDetected && isGTMDetected) {
                console.log('Specified Google scripts are detected.');
                resolve(true);
            } else if (currentTime - startTime > options.maxTime) {
                console.log('Maximum time exceeded. Resolving promise.');
                resolve(false);
            } else {
                console.log('Checking for specified Google scripts...');
                setTimeout(checkScripts, 1000);
            }
        }

        checkScripts();
    });
}