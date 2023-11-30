import disableScroll from "disable-scroll";
import JSUTIL from "@andresclua/jsutil"

const forceScrollToTop = ()=>{
    var jsUtil = new JSUTIL()
    return new Promise((resolve) => {
        disableScroll.on();
        jsUtil.addStyle(document.querySelector("body"), "height", "100vh")
        jsUtil.addStyle(document.querySelector("body"), "overflow", "hidden")
        setTimeout(() => {
            disableScroll.off()
            jsUtil.addStyle(document.querySelector("body"), 'height', 'auto')
            jsUtil.addStyle(document.querySelector("body"), 'overflow', 'initial')
        }, 100)
        // block scroll on page transition
        setTimeout(() => {
            resolve()
        }, 500)
    })
}

export {forceScrollToTop}