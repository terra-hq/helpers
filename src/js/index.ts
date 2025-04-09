import "./../scss/index.scss";

import {preloadVideos} from "./preloadVideos/index.js";



(async () => {
    try {
        const message = await preloadVideos({
            selector: document.querySelectorAll(".js--video"),
            maxTime: 300,
        });
        console.log(message);
        // Tu código para manejar el estado resuelto
    } catch (error) {
        console.error('Error al precargar los videos:', error);
        // Tu código para manejar errores
    }
})();