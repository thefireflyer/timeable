(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3678)}])},3678:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var i=n(5893),o=n(9008),s=n(7294),r=n(6440),c=n.n(r);function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return u(this,n)}}var p="timeable.data";function h(){return(0,i.jsx)("div",{style:{marginBottom:"16vh"}})}var g,v=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(l,e);var t,n,s,r=d(l);function l(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=r.call(this,e)).state={timeSegments:[]};for(var n=0;n<=24;n++)t.state.timeSegments.push({title:"",desc:"",activity:null,hour:n});return t}return t=l,(n=[{key:"componentDidMount",value:function(){var e=this,t=(window.setInterval((function(t){var n=new Date;document.getElementById(c().offlineIcon).style.display=navigator.onLine?"none":"block",e.forceUpdate();var i=e.state.timeSegments[n.getHours()];i&&navigator.serviceWorker.getRegistration().then((function(e){var t={body:i.title+" now starting.\n        \n"+i.desc,icon:"/timeable/icon.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1},actions:[{action:"test",title:"Test",icon:"images/icon.png"},{action:"close",title:"Close notification",icon:"images/icon.png"}]};e.showNotification("Timeable - activity reminder",t)}))}),1e4,this.state),localStorage.getItem(p));null==t&&this.saveData();try{this.setState(JSON.parse(t))}catch(n){console.log(n),this.saveData()}this.forceUpdate(),Notification.requestPermission().then((function(e){console.log(e)})),document.body.addEventListener("mouseup",y),this.forceUpdate()}},{key:"updateData",value:function(){if(this.state.currentSegment){var e=document.getElementById(c().timeSegmentOptions);this.state.currentSegment().title=e.querySelector("#title").value,this.state.currentSegment().desc=e.querySelector("#description").value,this.forceUpdate()}}},{key:"saveData",value:function(){localStorage.setItem(p,JSON.stringify(this.state))}},{key:"closeAll",value:function(){this.updateData(),document.getElementById(c().container).style.left="0",document.getElementById(c().closeSettings).style.display="none",document.getElementById(c().timeSegmentOptions).style.top="100vh",this.state.currentSegment=null,this.state.mouseTimer=null,this.state.eventInfo=null,this.saveData()}},{key:"mouseDown",value:function(e){var t=this;this.state.eventInfo=e,this.state.mouseTimer=window.setTimeout((function(){return t.execMouseDown()}),500)}},{key:"mouseUp",value:function(){this.state.mouseTimer&&window.clearTimeout(this.state.mouseTimer),this.state.eventInfo=null}},{key:"execMouseDown",value:function(){var e,t=this,n=(null===(e=this.state.eventInfo.touches)||void 0===e?void 0:e.item("0").target)||this.state.eventInfo.target;console.log(n),console.log(n.attributes.segment.value),this.state.currentSegment=function(){return t.state.timeSegments[n.attributes.segment.value]};var i=document.getElementById(c().timeSegmentOptions);i.querySelector("#title").value=this.state.currentSegment().title,i.querySelector("#description").value=this.state.currentSegment().desc,document.getElementById(c().timeSegmentOptions).style.top="30vh",document.getElementById(c().closeSettings).style.display="block"}},{key:"render",value:function(){var e=this;return(0,i.jsxs)("div",{id:c().container,children:[(0,i.jsxs)(o.default,{children:[(0,i.jsx)("title",{children:"Timeable"}),(0,i.jsx)("meta",{name:"description",content:"Free open source time management app"}),(0,i.jsx)("link",{rel:"icon",href:"icon.png"}),(0,i.jsx)("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",rel:"stylesheet"}),(0,i.jsx)("link",{rel:"manifest",href:"/timeable/manifest.json"}),(0,i.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"true"}),(0,i.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap",rel:"stylesheet"})]}),(0,i.jsxs)("main",{id:c().main,children:[(0,i.jsxs)("div",{className:c().app,children:[(0,i.jsx)("div",{className:c().activities}),(0,i.jsxs)("div",{className:c().timesheet,children:[this.state.timeSegments.map((function(t){var n,o=e;return(0,i.jsxs)("div",{className:c().timeSegment,onTouchStart:function(e){return o.mouseDown(e)},onMouseDown:function(e){return o.mouseDown(e)},onTouchEnd:function(){return o.mouseUp()},onTouchCancel:function(){return o.mouseUp()},onMouseUp:function(){return o.mouseUp()},style:{borderColor:(null===(n=t.activity)||void 0===n?void 0:n.color)||"#333"},segment:t.hour,children:[(0,i.jsx)("h3",{children:t.hour+":00"}),(0,i.jsx)("h2",{children:t.title}),(0,i.jsx)("h4",{children:t.desc})]},t.hour)})),(0,i.jsx)(h,{})]}),(0,i.jsx)("div",{className:c().menubar})]}),(0,i.jsx)("div",{className:c().dropOff}),(0,i.jsx)("a",{onClick:function(){screen.width>600?document.getElementById(c().container).style.left="-20vw":document.getElementById(c().container).style.left="-85vw",document.getElementById(c().closeSettings).style.display="block"},id:c().openSettings,children:(0,i.jsx)("span",{className:"material-icons-outlined "+c().pin,children:"settings"})}),(0,i.jsx)("a",{onClick:function(){return e.closeAll()},id:c().closeSettings}),(0,i.jsxs)("div",{id:c().bottomPins,children:[(0,i.jsx)("span",{id:c().offlineIcon,className:"material-icons-outlined "+c().pin,children:"offline_pin"}),(0,i.jsx)("span",{className:"material-icons-outlined "+c().pin,onClick:function(){window.location.href="https://github.com/theflyingfire/timeable"},children:"code"})]}),(0,i.jsxs)("div",{id:c().timeSegmentOptions,children:[(0,i.jsx)("input",{type:"text",placeholder:"title",id:"title"}),(0,i.jsx)("input",{type:"text",placeholder:"description",id:"description"}),(0,i.jsx)(h,{})]})]}),(0,i.jsx)("div",{id:c().settings,children:(0,i.jsxs)("center",{id:c().settingsPanel,children:[(0,i.jsx)("h1",{children:"Settings"}),(0,i.jsx)("br",{})]})})]})}}])&&a(t.prototype,n),s&&a(t,s),l}(s.Component);function y(){g&&window.clearTimeout(g),null}},6440:function(e){e.exports={container:"Home_container__97eC3",main:"Home_main__OVLM4",grid:"Home_grid__npx0i",openSettings:"Home_openSettings__5bp_w",settings:"Home_settings__G0Zfp",settingsPanel:"Home_settingsPanel__dZUoF",closeSettings:"Home_closeSettings__ESeew",bottomPins:"Home_bottomPins__aewl9",pin:"Home_pin__lleej",offlineIcon:"Home_offlineIcon__3EauL",app:"Home_app__GbKKX",section:"Home_section__EaDnq",timesheet:"Home_timesheet__NkTkH",timeSegment:"Home_timeSegment__t6lh_",timeSegmentOptions:"Home_timeSegmentOptions__8WA_M",dropOff:"Home_dropOff__iGdGr"}},9008:function(e,t,n){e.exports=n(5443)}},function(e){e.O(0,[774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);