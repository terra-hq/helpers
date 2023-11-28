import "./../scss/index.scss";


import {submitToHubspot} from './hubspot/index.js';
import { preloadVue } from './preload/index.js'

// VUE
await preloadVue({
    element : document.querySelector(".js--vue")
})