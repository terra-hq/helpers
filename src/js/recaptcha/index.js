import axios from 'axios';
import qs from 'qs';

/**
 * Asynchronously loads the reCAPTCHA script from Google with the specified API key.
 * @param {Object} payload - The payload containing the API key for reCAPTCHA.
 * @param {string} payload.API_KEY - The API key for reCAPTCHA from Google.
 * @returns {Promise<boolean>} A Promise that resolves to `true` when the reCAPTCHA script is successfully loaded.
 * @throws Will reject with an error if the script fails to load.
 *
 * @example
 * // Example usage:
 * try {
 *   const result = await GET_RECAPTCHA_SCRIPT_FROM_GOOGLE({ API_KEY: 'your-recaptcha-api-key' });
 *   console.log('reCAPTCHA script loaded successfully:', result);
 * } catch (error) {
 *   console.error('Error loading reCAPTCHA script:', error);
 * }
 */

export const GET_RECAPTCHA_SCRIPT_FROM_GOOGLE = async (payload) => {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        let r = false;
        s.type = 'text/javascript';
        s.src = `https://www.google.com/recaptcha/api.js?render=${payload.API_KEY}`;
        s.onerror = (err) => {
            console.log(`Debug: Failed to load reCAPTCHA script. Error: ${err.message}`);
        };
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                resolve(true);
            }
        };
        const t = document.getElementsByTagName('script')[0];
        t.parentElement.insertBefore(s, t);
    });
};

/**
 * Asynchronously retrieves a reCAPTCHA client token by executing the reCAPTCHA challenge.
 * @param {Object} payload - The payload containing the necessary information for reCAPTCHA.
 * @param {string} payload.API_KEY - The reCAPTCHA API key from Google.
 * @param {string} payload.action - The action to be performed for the reCAPTCHA challenge.
 * @returns {Promise<string>} A Promise that resolves to the reCAPTCHA client token upon successful execution.
 * @throws Will reject with an error if there is an issue with reCAPTCHA execution or token retrieval.
 *
 * @example
 * try {
 *   const token = await GET_RECAPTCHA_CLIENT_TOKEN({
 *     API_KEY: 'your-recaptcha-api-key',
 *     action: 'login' // Specify the action for the reCAPTCHA challenge
 *   });
 *   console.log('reCAPTCHA client token:', token);
 * } catch (error) {
 *   console.error('Error retrieving reCAPTCHA client token:', error);
 * }
 */

export const GET_RECAPTCHA_CLIENT_TOKEN= async (payload) => {
    // create real promise, because execute method does not return the real one
    return new Promise((resolve, reject) => {
        grecaptcha.ready( () =>
            grecaptcha.execute(payload.API_KEY, { action: payload.action })
                .then(token => {
                    resolve(token);
                },
            reject)
        );  
    })
}

/**
 * Validates a Google reCAPTCHA token on the server-side using either PHP or Node.js.
 *
 * @param {object} payload - An object containing the necessary data for validation.
 * @param {string} payload.type - The type of server-side environment to use ('php' or 'node').
 * @param {string} payload.postUrl - The URL where the validation request should be sent.
 * @param {string} [payload.google_access_token] - The Google reCAPTCHA access token (required for 'node' type).
 * @param {string} [payload.action] - The action string to validate (required for 'node' type).
 * @returns {Promise} - A Promise that resolves with the validation result or rejects with an error.
 */

export const VALIDATE_RECAPTCHA_SERVER = async (payload) => {
    if (payload.type === 'php') {
        let dataToSubmit = null;
        const settings = payload;
        try {
            dataToSubmit = await axios.post(payload.postUrl, qs.stringify(settings));
        } catch (error) {
            console.log('Debug: Error in PHP validation:', error);
        }
        return dataToSubmit;
    }

    if (payload.type === 'node') {
        const postData = {
            google_access_token: payload.google_access_token,
            action: payload.action
        };
        return axios.post(payload.postUrl, postData).then(response => {
            return response.data;
        }).catch(error => {
            console.log('Debug: Error in Node.js validation:', error);
        });
    }
}

