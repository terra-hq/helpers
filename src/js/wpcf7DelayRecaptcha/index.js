/**
 * Dynamically injects reCAPTCHA and related scripts into the document head based on the provided scripts.
 * This function includes debug logging and accepts a callback to be executed after the scripts are injected.
 *
 * @param {Object} options - Configuration options for the function.
 * @param {Object} options.scripts - An object containing the script IDs and site key required for the injection.
 * @param {string} options.scripts.recaptchaScript - The ID for the Google reCAPTCHA script.
 * @param {string} options.scripts.polyfill - The ID for the wp-polyfill script.
 * @param {string} options.scripts.recaptchaExtraScriptId - The ID for the reCAPTCHA extra configuration script.
 * @param {string} options.scripts.wpcf7RecaptchaScriptId - The ID for the Contact Form 7 reCAPTCHA script.
 * @param {string} options.siteKey - The Google reCAPTCHA site key.
 * @param {boolean} [options.debug=false] - Enable or disable debug mode for logging.
 * @param {Function} [options.callback] - A callback function to execute after the scripts have been injected.
 *
 * @example
 * // Example usage:
 * this.boostify.scroll({
 *   distance: 300,
 *   callback: async () => {
 *     await wpcf7DelayRecaptcha({
 *       scripts: {
 *         recaptchaScript: 'google-recaptcha-js',
 *         polyfill: 'wp-polyfill-js',
 *         recaptchaExtraScriptId: 'wpcf7-recaptcha-js-extra',
 *         wpcf7RecaptchaScriptId: 'wpcf7-recaptcha-js'
 *       },
 *       siteKey: 'your-recaptcha-site-key',
 *       debug: true,
 *       callback: () => {
 *         console.log("reCAPTCHA scripts have been successfully injected!");
 *       }
 *     });
 *   }
 * });
 */
export function wpcf7DelayRecaptcha({ scripts, siteKey, debug = false, callback }) {
  const logDebug = (message) => {
      if (debug) {
          console.log(`[DelayRecaptcha DEBUG]: ${message}`);
      }
  };

  const init = () => {
      logDebug("Initializing reCAPTCHA scripts injection...");

      const baseUrl = base_wp_api.root_url;

      if (!document.querySelector(`#${scripts.recaptchaScript}`)) {
          const recaptchaScript = document.createElement('script');
          recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
          recaptchaScript.type = 'text/javascript';
          recaptchaScript.id = scripts.recaptchaScript;
          document.head.appendChild(recaptchaScript);
          logDebug(`Injected script with ID: ${scripts.recaptchaScript}`);
      } else {
          logDebug(`Script with ID: ${scripts.recaptchaScript} already exists.`);
      }

      if (!document.querySelector(`#${scripts.polyfill}`)) {
          const wpPolyfillScript = document.createElement('script');
          wpPolyfillScript.src = `${baseUrl}/wp-includes/js/dist/vendor/wp-polyfill.min.js`;
          wpPolyfillScript.type = 'text/javascript';
          wpPolyfillScript.id = scripts.polyfill;
          document.head.appendChild(wpPolyfillScript);
          logDebug(`Injected script with ID: ${scripts.polyfill}`);
      } else {
          logDebug(`Script with ID: ${scripts.polyfill} already exists.`);
      }

      if (!document.querySelector(`#${scripts.recaptchaExtraScriptId}`)) {
          const recaptchaExtraScript = document.createElement('script');
          recaptchaExtraScript.type = 'text/javascript';
          recaptchaExtraScript.id = scripts.recaptchaExtraScriptId;
          recaptchaExtraScript.innerHTML = `
              var wpcf7_recaptcha = {"sitekey":"${scripts.siteKey}","actions":{"homepage":"homepage","contactform":"contactform"}};
          `;
          document.head.appendChild(recaptchaExtraScript);
          logDebug(`Injected script with ID: ${scripts.recaptchaExtraScriptId}`);
      } else {
          logDebug(`Script with ID: ${scripts.recaptchaExtraScriptId} already exists.`);
      }

      if (!document.querySelector(`#${scripts.wpcf7RecaptchaScriptId}`)) {
          const wpcf7RecaptchaScript = document.createElement('script');
          wpcf7RecaptchaScript.src = `${baseUrl}/wp-content/plugins/contact-form-7/modules/recaptcha/index.js`;
          wpcf7RecaptchaScript.type = 'text/javascript';
          wpcf7RecaptchaScript.id = scripts.wpcf7RecaptchaScriptId;
          document.head.appendChild(wpcf7RecaptchaScript);
          logDebug(`Injected script with ID: ${scripts.wpcf7RecaptchaScriptId}`);
      } else {
          logDebug(`Script with ID: ${scripts.wpcf7RecaptchaScriptId} already exists.`);
      }
  };

  init();

  if (typeof callback === 'function') {
      logDebug("Executing callback function.");
      callback();
  }
}