var m=Object.defineProperty;var f=(a,t,e)=>t in a?m(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var u=(a,t,e)=>(f(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=e(s);fetch(s.href,l)}})();class p{_getElements(t){return typeof t=="object"?[t]:document.querySelectorAll(t)}hide(t){this._hideElements(this._getElements(t))}_hideElements(t){var e,i=t.length;for(e=0;e<i;e++)this._hideElement(t[e])}_hideElement(t){this._styleElement(t,"display","none")}show(t,e){var i=this._getElements(t);e&&this._hideElements(i),this._showElements(i)}_showElements(t){var e,i=t.length;for(e=0;e<i;e++)this._showElement(t[e])}_showElement(t){this._styleElement(t,"display","block")}addStyle(t,e,i){this._styleElements(this._getElements(t),e,i)}_styleElements(t,e,i){var s,l=t.length;for(s=0;s<l;s++)this._styleElement(t[s],e,i)}_styleElement(t,e,i){t.style.setProperty(e,i)}toggleShow(t){var e,i=this._getElements(t),s=i.length;for(e=0;e<s;e++)i[e].style.display=="none"?this._styleElement(i[e],"display","block"):this._styleElement(i[e],"display","none")}addClass(t,e){this._addClassElements(this._getElements(t),e)}_addClassElements(t,e){var i,s=t.length;for(i=0;i<s;i++)this._addClassElement(t[i],e)}_addClassElement(t,e){var i,s,l;for(s=t.className.split(" "),l=e.split(" "),i=0;i<l.length;i++)s.indexOf(l[i])==-1&&(t.className+=" "+l[i])}removeClass(t,e){this._removeClassElements(this._getElements(t),e)}_removeClassElements(t,e){var i,s=t.length;for(i=0;i<s;i++)this._removeClassElement(t[i],e)}_removeClassElement(t,e){var i,s,l;for(s=t.className.split(" "),l=e.split(" "),i=0;i<l.length;i++)for(;s.indexOf(l[i])>-1;)s.splice(s.indexOf(l[i]),1);t.className=s.join(" ")}toggleClass(t,e,i){this._toggleClassElements(this._getElements(t),e,i)}_toggleClassElements(t,e,i){var s,l=t.length;for(s=0;s<l;s++)this._toggleClassElement(t[s],e,i)}_toggleClassElement(t,e,i){var s,l,n,r,o,c,h;if(s=e||"",l=i||"",n=s.split(" "),r=l.split(" "),c=t.className.split(" "),r.length==0){for(h=!0,o=0;o<n.length;o++)c.indexOf(n[o])==-1&&(h=!1);h?this._removeClassElement(t,s):this._addClassElement(t,s)}else{for(h=!0,o=0;o<n.length;o++)c.indexOf(n[o])==-1&&(h=!1);h?(this._removeClassElement(t,s),this._addClassElement(t,l)):(this._removeClassElement(t,l),this._addClassElement(t,s))}}filterHTML(t,e,i){var s,l,n,r,o,c,h;for(s=this._getElements(t),r=0;r<s.length;r++)for(l=s[r].querySelectorAll(e),o=0;o<l.length;o++){for(h=0,l[o].innerText.toUpperCase().indexOf(i.toUpperCase())>-1&&(h=1),n=l[o].getElementsByTagName("*"),c=0;c<n.length;c++)n[c].innerText.toUpperCase().indexOf(i.toUpperCase())>-1&&(h=1);h==1?this.addStyle(l[o],"display","block"):this.addStyle(l[o],"display","none")}}matches(t,e,i="class"){if(!t)return!1;if(Array.isArray(e))if(i==="class"){const s=t.classList;if(s){const l=Array.from(s);return e.some(n=>l.includes(n))}}else{const s=t.getAttribute(i);return e.some(l=>l===s)}else if(i==="class"){const s=t.classList;if(s){const l=Array.from(s).join(" "),n=new RegExp(`\\b${e}\\b`);return l.match(n)!==null}}else return t.getAttribute(i)===e;return!1}sortArray(t,e="alphabetical"){return e==="alphabetical"?t.sort((i,s)=>{const l=i.toLowerCase(),n=s.toLowerCase();return l<n?-1:l>n?1:0}):e==="number"?t.sort((i,s)=>i-s):(console.error("Invalid sorting type. Please choose 'alphabetical' or 'number'."),t)}stringToNumber(t){const e=parseFloat(t);if(isNaN(e))throw new Error("Invalid input. Cannot convert to a number.");return e}stringToBoolean(t){const e=t.toLowerCase();if(e==="true"||e==="1")return!0;if(e==="false"||e==="0")return!1;throw new Error('Invalid input. Only "true", "false", "1", or "0" are allowed.')}setAttr(t,e,i){t&&e&&t.setAttribute(e,i)}getAttr(t,e){return t&&e?t.getAttribute(e):null}isElementVisibleOnLoad(t){const{element:e,additionalPixels:i=20}=t;if(!e)return console.log("Element does not exist."),!0;const s=e.getBoundingClientRect(),n=(window.innerHeight||document.documentElement.clientHeight)+i;return!(s.bottom<-i||s.top>n)}}class d{constructor(t={}){u(this,"handleButtonClick",t=>{const e=this.jsui.getAttr(t.target,this.options.toggleButtonAttr);e&&(t.preventDefault(),this.toggleSlide(e,!0))});u(this,"handleSelectChange",t=>{const e=t.target.options[t.target.selectedIndex],i=this.jsui.getAttr(e,this.options.toggleSelectOptionsAttr);this.toggleSlide(i,!0)});u(this,"destroy",()=>{this.toggleButtonEls.forEach(t=>{this.jsui.getAttr(t,this.options.toggleButtonAttr)&&t.removeEventListener("click",this.handleButtonClick)}),this.options.toggleSelectElement&&this.options.toggleSelectElement.removeEventListener("change",this.handleSelectChange)});this.jsui=new p;const e=t&&"nameSpace"in t?t.nameSpace:"collapsify",i={nameSpace:t&&"nameSpace"in t?t.nameSpace:"collapsify",toggleButtonAttr:`data-${e}-control`,toggleContentAttr:`data-${e}-content`,toggleSelectOptionsAttr:t&&"dropdownElement"in t&&`data-${e}-dropdown-item`,toggleSelectElement:t&&"dropdownElement"in t&&t.dropdownElement,activeClass:"--is-active",isAnimation:t&&"isAnimation"in t?t.isAnimation:!0,closeOthers:t&&"closeOthers"in t?t.closeOthers:!0,animationSpeed:t&&"animationSpeed"in t?t.animationSpeed:400,cssEasing:t&&"cssEasing"in t?t.cssEasing:"ease-in-out",isTab:t&&"isTab"in t,onSlideStart:t&&"onSlideStart"in t&&t.onSlideStart,onSlideEnd:t&&"onSlideEnd"in t&&t.onSlideEnd};this.options={...i,...t},this.toggleContentEls=[].slice.call(document.querySelectorAll(`[${this.options.toggleContentAttr}]`)),this.toggleButtonEls=[].slice.call(document.querySelectorAll(`[${this.options.toggleButtonAttr}]`)),(this.toggleContentEls.length!==0||this.toggleButtonEls.length!==0)&&this.init()}init(){this.initContentsState(this.toggleContentEls),this.handleButtonsEvent(this.toggleButtonEls),this.options.toggleSelectElement&&this.handleDropdownSelectEvent(this.options.toggleSelectElement)}initContentsState(t){this.itemsState={},t.forEach(e=>{this.jsui.addStyle(e,"overflow","hidden"),this.jsui.addStyle(e,"max-height","none");const i=Array.from(e.classList).some(l=>l.includes(this.options.activeClass)),s=this.jsui.getAttr(e,this.options.toggleContentAttr);s&&(this.setItemState(s,i),i?this.open(s,!1,!1):this.close(s,!1,!1))})}handleButtonsEvent(t){t.forEach(e=>{this.jsui.getAttr(e,this.options.toggleButtonAttr)&&e.addEventListener("click",this.handleButtonClick)})}handleDropdownSelectEvent(t){this.toggleContentEls.forEach(e=>{if(Array.from(e.classList).some(i=>i.includes(this.options.activeClass))){let i=this.jsui.getAttr(e,this.options.toggleContentAttr),s=document.querySelector(`[${this.options.toggleSelectOptionsAttr} = ${i}]`);s.selected=!0}}),t.addEventListener("change",this.handleSelectChange)}setItemState(t,e){this.itemsState[t]={isOpen:e,isAnimating:!1}}toggleSlide(t,e=!0){var i,s,l;(i=this.itemsState[t])!=null&&i.isAnimating||this.options.isTab&&((s=this.itemsState[t])!=null&&s.isOpen)||((l=this.itemsState[t])!=null&&l.isOpen?this.close(t,e,this.options.isAnimation):this.open(t,e,this.options.isAnimation))}open(t,e=!0,i=!0){if(!t)return;Object.prototype.hasOwnProperty.call(this.itemsState,t)||this.setItemState(t,!1);const s=document.querySelector(`[${this.options.toggleContentAttr}='${t}']`);if(!s)return;this.itemsState[t].isAnimating=!0,this.options.closeOthers&&[].slice.call(this.toggleContentEls).forEach(r=>{const o=this.jsui.getAttr(r,this.options.toggleContentAttr);o&&o!==t&&this.close(o,!1,i)}),e!==!1&&this.options.onSlideStart&&this.options.onSlideStart(!0,t);const l=this.getTargetHeight(s);this.jsui.addStyle(s,"visibility","visible"),this.toggleActiveClass(s,!0);const n=document.querySelectorAll(`[${this.options.toggleButtonAttr}='${t}']`);n.length>0&&[].slice.call(n).forEach(r=>{this.toggleActiveClass(r,!0),this.toggleAriaAttribute(r,"aria-expanded",!0)}),i?(this.jsui.addStyle(s,"overflow","hidden"),this.jsui.addStyle(s,"transition",`${this.options.animationSpeed}ms ${this.options.cssEasing}`),this.jsui.addStyle(s,"max-height",(l||"1000")+"px"),setTimeout(()=>{e!==!1&&this.options.onSlideEnd&&this.options.onSlideEnd(!0,t),this.jsui.addStyle(s,"overflow",""),this.jsui.addStyle(s,"transition",""),this.jsui.addStyle(s,"max-height","none"),this.itemsState[t].isAnimating=!1},this.options.animationSpeed)):(this.jsui.addStyle(s,"max-height","none"),this.jsui.addStyle(s,"overflow",""),this.itemsState[t].isAnimating=!1),this.itemsState[t].isOpen=!0,this.toggleAriaAttribute(s,"aria-hidden",!0)}close(t,e=!0,i=!0){if(!t)return;Object.prototype.hasOwnProperty.call(this.itemsState,t)||this.setItemState(t,!1),this.itemsState[t].isAnimating=!0,e!==!1&&this.options.onSlideStart&&this.options.onSlideStart(!1,t);const s=document.querySelector(`[${this.options.toggleContentAttr}='${t}']`);this.jsui.addStyle(s,"overflow","hidden"),this.jsui.addStyle(s,"max-height",s.clientHeight+"px"),this.toggleActiveClass(s,!1),setTimeout(()=>{this.jsui.addStyle(s,"max-height","0px")},5);const l=document.querySelectorAll(`[${this.options.toggleButtonAttr}='${t}']`);l.length>0&&[].slice.call(l).forEach(n=>{this.toggleActiveClass(n,!1),this.toggleAriaAttribute(n,"aria-expanded",!1)}),i?(this.jsui.addStyle(s,"transition",`${this.options.animationSpeed}ms ${this.options.cssEasing}`),setTimeout(()=>{e!==!1&&this.options.onSlideEnd&&this.options.onSlideEnd(!1,t),this.jsui.addStyle(s,"transition",""),this.itemsState[t].isAnimating=!1,this.jsui.addStyle(s,"visibility","hidden")},this.options.animationSpeed)):(this.options.onSlideEnd&&this.options.onSlideEnd(!1,t),this.itemsState[t].isAnimating=!1,this.jsui.addStyle(s,"visibility","hidden")),Object.prototype.hasOwnProperty.call(this.itemsState,t)&&(this.itemsState[t].isOpen=!1),this.toggleAriaAttribute(s,"aria-hidden",!1)}toggleActiveClass(t,e){const i=!t.classList[0]||t.classList[0].startsWith("--is-active")?this.options.activeClass:t.classList[0]+this.options.activeClass;e?this.jsui.addClass(t,i):this.jsui.removeClass(t,i)}toggleAriaAttribute(t,e,i){this.jsui.getAttr(t,e)&&(e==="aria-expanded"?this.jsui.setAttr(t,e,i):this.jsui.setAttr(t,e,!i))}getTargetHeight(t){if(!t)return;const e=t.cloneNode(!0),i=t.parentNode;if(!i)return;const s=[].slice.call(e.querySelectorAll("input[name]"));if(s.length!==0){const n="-"+new Date().getTime();s.forEach(r=>{r.name+=n})}e.style.maxHeight="none",e.style.opacity="0",i.appendChild(e);const l=e.clientHeight;return i.removeChild(e),l}}new d;new d({nameSpace:"different"});new d({nameSpace:"accordion"});new d({nameSpace:"nested",closeOthers:!1});new d({nameSpace:"tab",closeOthers:!0,isTab:!0,dropdownElement:document.querySelector(".js--select-item-a")});new d({nameSpace:"tabTwo",closeOthers:!0,isTab:!0,dropdownElement:document.querySelector(".js--select-item-b")});var g={};new d({nameSpace:"tabThird",closeOthers:!0,isTab:!0,dropdownElement:document.querySelector(".js--select-item-c"),onSlideStart:(a,t)=>{const e=document.querySelector(`[data-tabThird-content='${t}']`);a&&(e!=null&&e.querySelector(".js--slider"))&&(g[t]=tns({container:e==null?void 0:e.querySelector(".js--slider"),autoplay:!0,loop:!0,mode:"gallery",items:1,gutter:0,slideBy:1,controls:!1,rewind:!1,swipeAngle:60,lazyload:!0,autoplayButtonOutput:!1,speed:500,autoplayTimeout:3e3,preventActionWhenRunning:!0,preventScrollOnTouch:"auto",touch:!1}),console.log("init",t))},onSlideEnd:(a,t)=>{[].slice.call(document.querySelectorAll("[data-tabThird-content]")).forEach(i=>{var l;var s=i.getAttribute("data-tabThird-content");s!=t&&i.querySelector(".js--slider")&&((l=g[s])!=null&&l.version)&&(g[s].destroy(),console.log("destroy",s))})}});
