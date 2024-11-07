/**
 * Dynamically injects reCAPTCHA and related scripts into the document head based on the provided payload.
 * This function includes debug logging and accepts a callback to be executed after the scripts are injected.
 *
 * @param {Object} options - Configuration options for the function.
 * @param {Object} options.payload - An object containing the script IDs and site key required for the injection.
 * @param {string} options.payload.siteKey - The Google reCAPTCHA site key.
 * @param {string} options.payload.recaptchaScript - The ID for the Google reCAPTCHA script.
 * @param {string} options.payload.polyfill - The ID for the wp-polyfill script.
 * @param {string} options.payload.recaptchaExtraScriptId - The ID for the reCAPTCHA extra configuration script.
 * @param {string} options.payload.wpcf7RecaptchaScriptId - The ID for the Contact Form 7 reCAPTCHA script.
 * @param {boolean} [options.debug=false] - Enable or disable debug mode for logging.
 * @param {Function} [options.callback] - A callback function to execute after the scripts have been injected.
 *
 * @example
 * // Example usage:
 * this.boostify.scroll({
 *   distance: 300,
 *   callback: async () => {
 *     wpcf7DelayRecaptcha({
 *       payload: {
 *         siteKey: 'your-recaptcha-site-key',
 *         recaptchaScript: 'google-recaptcha-js',
 *         polyfill: 'wp-polyfill-js',
 *         recaptchaExtraScriptId: 'wpcf7-recaptcha-js-extra',
 *         wpcf7RecaptchaScriptId: 'wpcf7-recaptcha-js'
 *       },
 *       debug: true,
 *       callback: () => {
 *         console.log("reCAPTCHA scripts have been successfully injected!");
 *       }
 *     });
 *   }
 * });
 */
export function wpcf7DelayRecaptcha({ payload, debug = false, callback }) {
  const logDebug = (message) => {
      if (debug) {
          console.log(`[DelayRecaptcha DEBUG]: ${message}`);
      }
  };

  const init = () => {
      logDebug("Initializing reCAPTCHA scripts injection...");

      const baseUrl = window.location.origin;

      if (!document.querySelector(`#${payload.recaptchaScript}`)) {
          const recaptchaScript = document.createElement('script');
          recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${payload.siteKey}`;
          recaptchaScript.type = 'text/javascript';
          recaptchaScript.id = payload.recaptchaScript;
          document.head.appendChild(recaptchaScript);
          logDebug(`Injected script with ID: ${payload.recaptchaScript}`);
      } else {
          logDebug(`Script with ID: ${payload.recaptchaScript} already exists.`);
      }

      if (!document.querySelector(`#${payload.polyfill}`)) {
          const wpPolyfillScript = document.createElement('script');
          wpPolyfillScript.src = `${baseUrl}/wp-includes/js/dist/vendor/wp-polyfill.min.js`;
          wpPolyfillScript.type = 'text/javascript';
          wpPolyfillScript.id = payload.polyfill;
          document.head.appendChild(wpPolyfillScript);
          logDebug(`Injected script with ID: ${payload.polyfill}`);
      } else {
          logDebug(`Script with ID: ${payload.polyfill} already exists.`);
      }

      if (!document.querySelector(`#${payload.recaptchaExtraScriptId}`)) {
          const recaptchaExtraScript = document.createElement('script');
          recaptchaExtraScript.type = 'text/javascript';
          recaptchaExtraScript.id = payload.recaptchaExtraScriptId;
          recaptchaExtraScript.innerHTML = `
              var wpcf7_recaptcha = {"sitekey":"${payload.siteKey}","actions":{"homepage":"homepage","contactform":"contactform"}};
          `;
          document.head.appendChild(recaptchaExtraScript);
          logDebug(`Injected script with ID: ${payload.recaptchaExtraScriptId}`);
      } else {
          logDebug(`Script with ID: ${payload.recaptchaExtraScriptId} already exists.`);
      }

      if (!document.querySelector(`#${payload.wpcf7RecaptchaScriptId}`)) {
          const wpcf7RecaptchaScript = document.createElement('script');
          wpcf7RecaptchaScript.src = `${baseUrl}/wp-content/plugins/contact-form-7/modules/recaptcha/index.js`;
          wpcf7RecaptchaScript.type = 'text/javascript';
          wpcf7RecaptchaScript.id = payload.wpcf7RecaptchaScriptId;
          document.head.appendChild(wpcf7RecaptchaScript);
          logDebug(`Injected script with ID: ${payload.wpcf7RecaptchaScriptId}`);
      } else {
          logDebug(`Script with ID: ${payload.wpcf7RecaptchaScriptId} already exists.`);
      }
  };

  init();

  if (typeof callback === 'function') {
      logDebug("Executing callback function.");
      callback();
  }
}