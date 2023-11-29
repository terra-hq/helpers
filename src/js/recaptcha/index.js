import axios from "axios"
const get_file_on_demand = async (payload) => {
    return new Promise((resolve, reject) => {      
        const s = document.createElement('script');
        let r = false;
        s.type = 'text/javascript';
        s.src = `https://www.google.com/recaptcha/api.js?render=${payload.API_KEY}`;
        s.onerror = (err) =>{
            reject(err, s);
        };
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
              r = true;
              resolve(true);
            }
        };
        const t = document.getElementsByTagName('script')[0];
        t.parentElement.insertBefore(s, t);
    })
}

const POST_WP_TO_VALIDATE_RECAPTCHA_V3 = async (payload) => {
    const secretKey = '6LdJjR8pAAAAAJUK0ysqsLapCs3TfaP0N5LBR7FH';
    const userResponseToken = payload.TOKEN;
    const siteVerifyURL = 'https://www.google.com/recaptcha/api/siteverify';
    
    const postData = {
      secret: secretKey,
      response: userResponseToken
    };
    
    axios.post(siteVerifyURL, postData,  { withCredentials: true })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Response error:', error.response.data);
          console.error('Status code:', error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
        console.error('Config:', error.config);
      });
    
}


const getRecaptcha_v3 = async (payload) => {
    var loadScript = await get_file_on_demand({
        API_KEY: payload.API_KEY,
    });
    if(loadScript){
        // create real promise, because execute method does not return the real one
        var GoogleAccesToken = await new Promise((resolve, reject) => {
            grecaptcha.ready( () =>
                grecaptcha.execute(payload.API_KEY, { action: payload.action })
                    .then(token => {
                        resolve(token);
                    },
                reject)
            );  
        })
        if(GoogleAccesToken) {
            var response = POST_WP_TO_VALIDATE_RECAPTCHA_V3({
                TOKEN : GoogleAccesToken,
                SECRET_KEY : payload.SECRET_KEY
            })   
        }
     
    }
}

export { getRecaptcha_v3 };