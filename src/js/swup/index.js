import disableScroll from "disable-scroll";
import JSUTIL from "@andresclua/jsutil"

const forceScrollToTop = ()=>{
    var jsUtil = new JSUTIL()
    return new Promise((resolve) => {
        setTimeout(() => {
            disableScroll.on()
            window.scrollTo(0, 0)
            jsUtil.addStyle(document.querySelector("body"), 'height', 'auto')
            jsUtil.addStyle(document.querySelector("body"), 'overflow', 'initial')
            setTimeout(() => {
                disableScroll.off()
                jsUtil.addStyle(document.querySelector("body"), 'height', 'auto')
                jsUtil.addStyle(document.querySelector("body"), 'overflow', 'initial')
            }, 300)
            setTimeout(() => {
                resolve()
            }, 500)
        }, 10)
    })
}

export {forceScrollToTop}