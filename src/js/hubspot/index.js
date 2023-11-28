import axios from "axios";
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