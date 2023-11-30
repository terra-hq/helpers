import axios from "axios";

/**
 * Submits form data to the HubSpot API using the specified portal ID and form ID.
 *
 * @param {string} portalId - The HubSpot portal ID where the form is hosted.
 * @param {string} formId - The ID of the form in the specified HubSpot portal.
 * @param {Object} formInputs - An object containing the form field values to be submitted.
 * @returns {Object} - An object containing the submission result.
 * @throws {Error} - Throws an error if the submission fails.
 *
 * @example
 * const portalId = 'YOUR_PORTAL_ID';
 * const formId = 'YOUR_FORM_ID';
 * const formInputs = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 * };
 *
 * try {
 *   const submissionResult = await submitToHubspot(portalId, formId, formInputs);
 *   console.log(submissionResult.message);
 *   if (submissionResult.success) {
 *     // Handle successful submission
 *   } else {
 *     // Handle submission error
 *   }
 * } catch (error) {
 *   // Handle unexpected errors during submission
 *   console.error('Submission error:', error.message);
 * }
 */

const submitToHubspot = async (portalId, formId, formInputs) => {
    let success = false;
    let statusCode = 200;
    let responseMessage = "";
    const bodyData = {
        fields: formInputs,
    };
    try {
        var response = await axios.post(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, bodyData);
        success = true;
    } catch (error) {
        statusCode = error.response.status;
        responseMessage = error.response.data.errors[0].message;
    }
    return {
        message: success ? "Thank you for submitting!" : responseMessage,
        success,
        statusCode,
    };
};
export  {submitToHubspot};