import disableScroll from "disable-scroll";

const forceScrollToTop = ()=>{
    // disableScroll.on();
    setTimeout(()=>{
        // disableScroll.off()
        window.scrollTo(0, 0)
    },1200)
}


export const scrollToTop = () =>
    new Promise((resolve) => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            // window["customScroll"].stopCustomScroll()
        }, 100)
        // block scroll on page transition
        setTimeout(() => {
            resolve()
        }, 500)
    })
    
export {forceScrollToTop}