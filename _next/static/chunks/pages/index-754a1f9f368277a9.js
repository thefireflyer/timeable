(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3678)}])},3678:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var i=n(5893),o=n(9008),s=n(7294),c=n(6440),r=n.n(c);function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=a(e);if(t){var o=a(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return u(this,n)}}var p,h="timeable.data",_=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(a,e);var t,n,s,c=f(a);function a(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=c.call(this,e)).state={timeSegments:[]};for(var n=1;n<=24;n++)t.state.timeSegments.push({title:"",desc:"",activity:null,hour:n});return t}return t=a,(n=[{key:"componentDidMount",value:function(){var e=this;window.setInterval((function(t){new Date,document.getElementById(r().offlineIcon).style.display=navigator.onLine?"none":"block",e.forceUpdate()}),1e4,this.state),Notification.requestPermission().then((function(e){console.log(e)})),document.body.addEventListener("mouseup",j),this.forceUpdate()}},{key:"render",value:function(){var e=this;return(0,i.jsxs)("div",{id:r().container,children:[(0,i.jsxs)(o.default,{children:[(0,i.jsx)("title",{children:"Timeable"}),(0,i.jsx)("meta",{name:"description",content:"Free open source time management app"}),(0,i.jsx)("link",{rel:"icon",href:"icon.png"}),(0,i.jsx)("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",rel:"stylesheet"}),(0,i.jsx)("link",{rel:"manifest",href:"/timeable/manifest.json"}),(0,i.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"true"}),(0,i.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap",rel:"stylesheet"})]}),(0,i.jsxs)("main",{id:r().main,children:[(0,i.jsxs)("div",{className:r().app,children:[(0,i.jsx)("div",{className:r().activities}),(0,i.jsx)("div",{className:r().timesheet,children:this.state.timeSegments.map((function(e){return(0,i.jsx)("div",{className:r().timeSegment,onTouchStart:y,onMouseDown:y,children:(0,i.jsx)("h3",{children:e.title})},e.hour)}))}),(0,i.jsx)("div",{className:r().menubar})]}),(0,i.jsx)("a",{onClick:function(){screen.width>600?document.getElementById(r().container).style.left="-20vw":document.getElementById(r().container).style.left="-85vw",document.getElementById(r().closeSettings).style.display="block"},id:r().openSettings,children:(0,i.jsx)("span",{className:"material-icons-outlined "+r().pin,children:"settings"})}),(0,i.jsx)("a",{onClick:g,id:r().closeSettings}),(0,i.jsxs)("div",{id:r().bottomPins,children:[(0,i.jsx)("span",{id:r().offlineIcon,className:"material-icons-outlined "+r().pin,children:"offline_pin"}),(0,i.jsx)("span",{className:"material-icons-outlined "+r().pin,onClick:function(){window.location.href="https://github.com/theflyingfire/timeable"},children:"code"})]}),(0,i.jsx)("div",{id:r().timeSegmentOptions})]}),(0,i.jsx)("div",{id:r().settings,children:(0,i.jsxs)("center",{id:r().settingsPanel,children:[(0,i.jsx)("h1",{children:"Settings"}),(0,i.jsx)("h2",{children:"general"}),(0,i.jsx)("input",{type:"checkbox",id:"clock-mode"}),(0,i.jsx)("span",{children:"12 hour clock"}),(0,i.jsx)("br",{}),(0,i.jsx)("input",{type:"checkbox",id:"bookmarks-visible"}),(0,i.jsx)("span",{children:"bookmarks"}),(0,i.jsx)("br",{}),(0,i.jsx)("input",{id:"background-url",type:"url",placeholder:"url"}),(0,i.jsx)("br",{}),(0,i.jsx)("span",{children:"background image url"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{onClick:function(){var t;t=e.state,localStorage.setItem(h,JSON.stringify(t)),e.forceUpdate(),g()},children:(0,i.jsx)("h2",{children:"Update and save"})})]})})]})}}])&&l(t.prototype,n),s&&l(t,s),a}(s.Component);function g(){document.getElementById(r().container).style.left="0",document.getElementById(r().closeSettings).style.display="none",document.getElementById(r().timeSegmentOptions).style.top="100vh"}function y(){document.addEventListener(document.onmouseup,j),document.addEventListener(document.ontouchend,j),document.addEventListener(document.ontouchcancel,j),p=window.setTimeout(b,500)}function j(){p&&window.clearTimeout(p)}function b(){document.getElementById(r().timeSegmentOptions).style.top="30vh",document.getElementById(r().closeSettings).style.display="block"}},6440:function(e){e.exports={container:"Home_container__97eC3",main:"Home_main__OVLM4",grid:"Home_grid__npx0i",openSettings:"Home_openSettings__5bp_w",settings:"Home_settings__G0Zfp",settingsPanel:"Home_settingsPanel__dZUoF",closeSettings:"Home_closeSettings__ESeew",bottomPins:"Home_bottomPins__aewl9",pin:"Home_pin__lleej",offlineIcon:"Home_offlineIcon__3EauL",app:"Home_app__GbKKX",section:"Home_section__EaDnq",timesheet:"Home_timesheet__NkTkH",timeSegment:"Home_timeSegment__t6lh_",timeSegmentOptions:"Home_timeSegmentOptions__8WA_M"}},9008:function(e,t,n){e.exports=n(5443)}},function(e){e.O(0,[774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);