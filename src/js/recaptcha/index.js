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

const getRecaptcha_v3 = async (payload) => {
    var loadScript = await get_file_on_demand({
        API_KEY: payload.API_KEY,
    });
    if(loadScript){
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
    
}
export { getRecaptcha_v3 };