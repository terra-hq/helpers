import imagesLoaded from "imagesloaded";
import WebFont from 'webfontloader';
import lottieweb from "lottie-web";

const preloadImages =  (selector = "img") =>
    new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
 });



 const preloadFonts = (id) =>
  new Promise((resolve) => {
    WebFont.load({
      google: {
        families: id,
      },
      active: resolve,
    });
});

 const preloadLotties = (id) =>
  new Promise(async (resolve) => {
      window.windowLotties = []
      var allLotties = document.querySelectorAll(".js--lottie-data")
      if (allLotties) {
          for (let i = 0; i < allLotties.length; i++) {
              const element = allLotties[i]
              // Perform asynchronous operation here, e.g., API call, database query, etc.
              await lottieweb.loadAnimation({
                    container: element, // the dom element that will contain the animation
                    renderer: "svg",
                    loop: true,
                    name: element.getAttribute("data-name"),
                    autoplay: element.getAttribute("data-autoplay"),
                    path: element.getAttribute("data-src"), // the path to the animation json
                })
              window.windowLotties[`${element.getAttribute("data-name")}`] = element
          }
      }
      resolve()
  })
  

export { preloadImages, preloadFonts, preloadLotties};