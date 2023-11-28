import "./../scss/index.scss";

import {getRecaptcha_v3} from './recaptcha/index.js';
var GoogleAccesToken = await getRecaptcha_v3({
    API_KEY : "6LdJjR8pAAAAAKqofmo08imm7lsnJ7XBYj1JbC8k",
});

console.log(GoogleAccesToken);
