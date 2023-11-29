import "./../scss/index.scss";
// @ts-ignore
import {getRecaptcha_v3} from './recaptcha/index.js';
var GoogleAccesToken = await getRecaptcha_v3({
    API_KEY : "6LdJjR8pAAAAAKqofmo08imm7lsnJ7XBYj1JbC8k",
    SECRET_KEY : "6LdJjR8pAAAAAJUK0ysqsLapCs3TfaP0N5LBR7FH",
    action : "submit"
});

console.log(GoogleAccesToken);
