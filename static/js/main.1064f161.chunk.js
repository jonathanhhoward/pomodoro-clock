(window["webpackJsonppomodoro-clock"]=window["webpackJsonppomodoro-clock"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(2),c=n.n(s),o=(n(10),n(4)),i=n(3);function l(e){var t=e.data,n=t.h2,a=t.div,s=t.button1,c=t.button2;return r.a.createElement("div",{id:e.name,className:"ClockControl "+e.class},r.a.createElement("h2",{id:n.id,className:n.class},n.text),r.a.createElement("div",{id:a.id,className:a.class},a.text),r.a.createElement("button",{id:s.id,className:s.class,onClick:s.callback},s.text),r.a.createElement("button",{id:c.id,className:c.class,onClick:c.callback},c.text))}n(11);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(){var e={breakLength:5,sessionLength:25,timerLabel:"Session",timeLeft:1500,startStop:"START"},t=Object(a.useReducer)((function(e,t){switch(t.type){case"break-decrement":return b({},e,{breakLength:e.breakLength-1});case"break-increment":return b({},e,{breakLength:e.breakLength+1});case"update-break":return b({},e,{timeLeft:60*e.breakLength});case"session-decrement":return b({},e,{sessionLength:e.sessionLength-1});case"session-increment":return b({},e,{sessionLength:e.sessionLength+1});case"update-session":return b({},e,{timeLeft:60*e.sessionLength});case"toggle-startStop":return b({},e,{startStop:"START"===e.startStop?"STOP":"START"});case"countdown":return b({},e,{timeLeft:e.timeLeft-1});case"toggle-break":return b({},e,{timerLabel:"Break",timeLeft:60*e.breakLength});case"toggle-session":return b({},e,{timerLabel:"Session",timeLeft:60*e.sessionLength});case"reset":return t.payload;default:return e}}),e),n=Object(o.a)(t,2),s=n[0],c=n[1];Object(a.useEffect)((function(){var e=null;return"STOP"===s.startStop?e=setInterval((function(){c({type:"countdown"})}),1e3):clearInterval(e),function(){return clearInterval(e)}}),[s.startStop]),Object(a.useEffect)((function(){0===s.timeLeft&&("Session"===s.timerLabel?c({type:"toggle-break"}):c({type:"toggle-session"}),document.getElementById("beep").play())}),[s.timerLabel,s.timeLeft]);var i=function(e){if("STOP"!==s.startStop){var t=e.target.id,n=t.includes("decrement")?1:60;if(t.includes("break")){if(s.breakLength===n)return;c({type:t}),"Break"===s.timerLabel&&c({type:"update-break"})}else{if(s.sessionLength===n)return;c({type:t}),"Session"===s.timerLabel&&c({type:"update-session"})}}},u={h2:{id:"break-label",class:null,text:"Break Length"},div:{id:"break-length",class:"length",text:s.breakLength},button1:{id:"break-decrement",class:"circle",callback:i,text:"-"},button2:{id:"break-increment",class:"circle",callback:i,text:"+"}},d={h2:{id:"session-label",class:null,text:"Session Length"},div:{id:"session-length",class:"length",text:s.sessionLength},button1:{id:"session-decrement",class:"circle",callback:i,text:"-"},button2:{id:"session-increment",class:"circle",callback:i,text:"+"}},m={h2:{id:"timer-label",class:null,text:s.timerLabel},div:{id:"time-left",class:"time",text:function(){var e=Math.floor(s.timeLeft/60),t=s.timeLeft%60;return"".concat(e<10?"0"+e:e,":").concat(t<10?"0"+t:t)}()},button1:{id:"start_stop",class:"pill",callback:function(){c({type:"toggle-startStop"})},text:s.startStop},button2:{id:"reset",class:"pill",callback:function(){c({type:"reset",payload:e}),document.getElementById("beep").load()},text:"RESET"}};return r.a.createElement("div",{className:"clock"},r.a.createElement("h1",null,"Pomodoro Clock"),r.a.createElement("div",{className:"flexbox"},r.a.createElement(l,{data:u}),r.a.createElement(l,{data:d})),r.a.createElement(l,{data:m}),r.a.createElement("audio",{id:"beep",src:"beep.mp3",preload:"auto"}))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[5,1,2]]]);
//# sourceMappingURL=main.1064f161.chunk.js.map