import axios from "axios";
const submitToHubspot = async (portalId, formId, formInputs) => {
    let success = false;
    let errorMessage = "";
    const bodyData = {
        fields: formInputs,
    };
    try {
        await axios.post(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, bodyData)
            .then(response => {
                success = true;
            })
            .catch(error => {
                console.error(error.message);
                errorMessage = error.message;
            });
    } catch (error) {
        console.error(error.message);
        errorMessage = error.message;
    }
    return {  
        message: (success) ? response.data : errorMessage,
        status: success, 
    };
};
export default submitToHubspot;