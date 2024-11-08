import axios from "axios";

/**
 * Submits form data to the HubSpot API using the specified portal ID and form ID.
 * Optionally, a debug option can be enabled to log detailed information during the submission process,
 * and a callback function can be provided to handle the response after the submission is completed.
 *
 * @param {Object} payload - The payload object containing different arguments.
 * @param {string} payload.portalId - The HubSpot portal ID where the form is hosted.
 * @param {string} payload.formId - The ID of the form in the specified HubSpot portal.
 * @param {Object} payload.formInputs - An object containing the form field values to be submitted.
 * @param {Function} [payload.callback] - Optional callback function to be called after the form submission. The callback receives the result object.
 * @param {boolean} [payload.debug=false] - Optional debug flag to log detailed information. Default is false.
 * @returns {Object} - An object containing the submission result.
 * @throws {Error} - Throws an error if the submission fails.
 *
 * @example
 * const payload = {
 *   portalId: 'YOUR_PORTAL_ID',
 *   formId: 'YOUR_FORM_ID',
 *   formInputs: {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     email: 'john.doe@example.com',
 *   },
 *   callback: (result) => {
 *     console.log('Callback result:', result);
 *     if (result.success) {
 *       // Handle successful submission
 *     } else {
 *       // Handle submission error
 *     }
 *   },
 *   debug: true
 * };
 *
 * try {
 *   const submissionResult = await submitToHubspot(payload);
 *   console.log(submissionResult.message);
 * } catch (error) {
 *   // Handle unexpected errors during submission
 *   console.error('Submission error:', error.message);
 * }
 */

const submitToHubspot = async (payload = {}) => {
  const {
    portalId,
    formId,
    formInputs,
    context,
    callback = () => {},
    debug = false,
  } = payload;

  let success = false;
  let statusCode = 200;
  let responseMessage = "Thank you for submitting!";

  const bodyData = {
    fields: Object.entries(formInputs).map(([name, value]) => ({ name, value })),
  };
  // mostly used to submit the cookie hubspotutk
  if(context){
    bodyData.context = context;
  }

  if (debug) {
    console.log("Debug: Submitting to HubSpot with the following data:", bodyData);
  }

  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      bodyData
    );

    success = true;
    if (debug) {
      console.log("Debug: Submission successful with response:", response.data);
    }
  } catch (error) {
    statusCode = error.response?.status || 500;
    responseMessage = error.response?.data?.errors?.[0]?.message || "An error occurred during submission.";

    if (debug) {
      console.error("Debug: Submission failed with error:", error.message);
      console.error("Debug: Detailed error response:", error.response?.data);
    }
  }

  const result = {
    message: responseMessage,
    success,
    statusCode,
  };

  callback(result);

  return result;
};

export { submitToHubspot };