!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("StateMachine",[],n):"object"==typeof exports?exports.StateMachine=n():t.StateMachine=n()}(this,function(){return function(t){function n(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}var i={};return n.m=t,n.c=i,n.i=function(t){return t},n.d=function(t,i,e){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=5)}([function(t,n,i){"use strict";t.exports=function(t,n){var i,e,s;for(i=1;i<arguments.length;i++){e=arguments[i];for(s in e)e.hasOwnProperty(s)&&(t[s]=e[s])}return t}},function(t,n,i){"use strict";var e=i(0);t.exports={build:function(t,n){var i,s,r,o=n.plugins;for(i=0,s=o.length;i<s;i++)r=o[i],r.methods&&e(t,r.methods),r.properties&&Object.defineProperties(t,r.properties)},hook:function(t,n,i){var e,s,r,o,a=t.config.plugins,f=[t.context];for(i&&(f=f.concat(i)),e=0,s=a.length;e<s;e++)o=a[e],(r=a[e][n])&&r.apply(o,f)}}},function(t,n,i){"use strict";function e(t){if(0===t.length)return t;var n,i,e=t.split(/[_-]/);if(1===e.length&&e[0][0].toLowerCase()===e[0][0])return t;for(i=e[0].toLowerCase(),n=1;n<e.length;n++)i=i+e[n].charAt(0).toUpperCase()+e[n].substring(1).toLowerCase();return i}e.prepended=function(t,n){return n=e(n),t+n[0].toUpperCase()+n.substring(1)},t.exports=e},function(t,n,i){"use strict";function e(t,n){t=t||{},this.options=t,this.defaults=n.defaults,this.states=[],this.transitions=[],this.map={},this.lifecycle=this.configureLifecycle(),this.init=this.configureInitTransition(t.init),this.data=this.configureData(t.data),this.methods=this.configureMethods(t.methods),this.map[this.defaults.wildcard]={},this.configureTransitions(t.transitions||[]),this.plugins=this.configurePlugins(t.plugins,n.plugin)}var s=i(0),r=i(2);s(e.prototype,{addState:function(t){this.map[t]||(this.states.push(t),this.addStateLifecycleNames(t),this.map[t]={})},addStateLifecycleNames:function(t){this.lifecycle.onEnter[t]=r.prepended("onEnter",t),this.lifecycle.onLeave[t]=r.prepended("onLeave",t),this.lifecycle.on[t]=r.prepended("on",t)},addTransition:function(t){this.transitions.indexOf(t)<0&&(this.transitions.push(t),this.addTransitionLifecycleNames(t))},addTransitionLifecycleNames:function(t){this.lifecycle.onBefore[t]=r.prepended("onBefore",t),this.lifecycle.onAfter[t]=r.prepended("onAfter",t),this.lifecycle.on[t]=r.prepended("on",t)},mapTransition:function(t){var n=t.name,i=t.from,e=t.to;return this.addState(i),"function"!=typeof e&&this.addState(e),this.addTransition(n),this.map[i][n]=t,t},configureLifecycle:function(){return{onBefore:{transition:"onBeforeTransition"},onAfter:{transition:"onAfterTransition"},onEnter:{state:"onEnterState"},onLeave:{state:"onLeaveState"},on:{transition:"onTransition"}}},configureInitTransition:function(t){return"string"==typeof t?this.mapTransition(s({},this.defaults.init,{to:t,active:!0})):"object"==typeof t?this.mapTransition(s({},this.defaults.init,t,{active:!0})):(this.addState(this.defaults.init.from),this.defaults.init)},configureData:function(t){return"function"==typeof t?t:"object"==typeof t?function(){return t}:function(){return{}}},configureMethods:function(t){return t||{}},configurePlugins:function(t,n){t=t||[];var i,e,s;for(i=0,e=t.length;i<e;i++)s=t[i],"function"==typeof s&&(t[i]=s=s()),s.configure&&s.configure(this);return t},configureTransitions:function(t){var n,i,e,s,r,o=this.defaults.wildcard;for(i=0;i<t.length;i++)for(e=t[i],s=Array.isArray(e.from)?e.from:[e.from||o],r=e.to||o,n=0;n<s.length;n++)this.mapTransition({name:e.name,from:s[n],to:r})},transitionFor:function(t,n){var i=this.defaults.wildcard;return this.map[t][n]||this.map[i][n]},transitionsFor:function(t){var n=this.defaults.wildcard;return Object.keys(this.map[t]).concat(Object.keys(this.map[n]))},allStates:function(){return this.states},allTransitions:function(){return this.transitions}}),t.exports=e},function(t,n,i){function e(t,n){this.context=t,this.config=n,this.state=n.init.from,this.observers=[t]}var s=i(0),r=i(6),o=i(1),a=[null,[]];s(e.prototype,{init:function(t){if(s(this.context,this.config.data.apply(this.context,t)),o.hook(this,"init"),this.config.init.active)return this.fire(this.config.init.name,[])},is:function(t){return Array.isArray(t)?t.indexOf(this.state)>=0:this.state===t},isPending:function(){return this.pending},can:function(t){return!this.isPending()&&!!this.seek(t)},cannot:function(t){return!this.can(t)},allStates:function(){return this.config.allStates()},allTransitions:function(){return this.config.allTransitions()},transitions:function(){return this.config.transitionsFor(this.state)},seek:function(t,n){var i=this.config.defaults.wildcard,e=this.config.transitionFor(this.state,t),s=e&&e.to;return"function"==typeof s?s.apply(this.context,n):s===i?this.state:s},fire:function(t,n){return this.transit(t,this.state,this.seek(t,n),n)},transit:function(t,n,i,e){var s=this.config.lifecycle,r=this.config.options.observeUnchangedState||n!==i;return i?this.isPending()?this.context.onPendingTransition(t,n,i):(this.config.addState(i),this.beginTransit(),e.unshift({transition:t,from:n,to:i,fsm:this.context}),this.observeEvents([this.observersForEvent(s.onBefore.transition),this.observersForEvent(s.onBefore[t]),r?this.observersForEvent(s.onLeave.state):a,r?this.observersForEvent(s.onLeave[n]):a,this.observersForEvent(s.on.transition),r?["doTransit",[this]]:a,r?this.observersForEvent(s.onEnter.state):a,r?this.observersForEvent(s.onEnter[i]):a,r?this.observersForEvent(s.on[i]):a,this.observersForEvent(s.onAfter.transition),this.observersForEvent(s.onAfter[t]),this.observersForEvent(s.on[t])],e)):this.context.onInvalidTransition(t,n,i)},beginTransit:function(){this.pending=!0},endTransit:function(t){return this.pending=!1,t},failTransit:function(t){throw this.pending=!1,t},doTransit:function(t){this.state=t.to},observe:function(t){if(2===t.length){var n={};n[t[0]]=t[1],this.observers.push(n)}else this.observers.push(t[0])},observersForEvent:function(t){for(var n,i=0,e=this.observers.length,s=[];i<e;i++)n=this.observers[i],n[t]&&s.push(n);return[t,s,!0]},observeEvents:function(t,n,i,e){if(0===t.length)return this.endTransit(void 0===e||e);var s=t[0][0],r=t[0][1],a=t[0][2];if(n[0].event=s,s&&a&&s!==i&&o.hook(this,"lifecycle",n),0===r.length)return t.shift(),this.observeEvents(t,n,s,e);var f=r.shift(),c=f[s].apply(f,n);return c&&"function"==typeof c.then?c.then(this.observeEvents.bind(this,t,n,s)).catch(this.failTransit.bind(this)):!1===c?this.endTransit(!1):this.observeEvents(t,n,s,c)},onInvalidTransition:function(t,n,i){throw new r("transition is invalid in current state",t,n,i,this.state)},onPendingTransition:function(t,n,i){throw new r("transition is invalid while previous transition is still in progress",t,n,i,this.state)}}),t.exports=e},function(t,n,i){"use strict";function e(t){return r(this||{},t)}function s(){var t,n;"function"==typeof arguments[0]?(t=arguments[0],n=arguments[1]||{}):(t=function(){this._fsm.apply(this,arguments)},n=arguments[0]||{});var i=new u(n,e);return o(t.prototype,i),t.prototype._fsm.config=i,t}function r(t,n){return o(t,new u(n,e)),t._fsm(),t}function o(t,n){if("object"!=typeof t||Array.isArray(t))throw Error("StateMachine can only be applied to objects");c.build(t,n),Object.defineProperties(t,d),a(t,l),a(t,n.methods),n.allTransitions().forEach(function(n){t[f(n)]=function(){return this._fsm.fire(n,[].slice.call(arguments))}}),t._fsm=function(){this._fsm=new h(this,n),this._fsm.init(arguments)}}var a=i(0),f=i(2),c=i(1),u=i(3),h=i(4),l={is:function(t){return this._fsm.is(t)},can:function(t){return this._fsm.can(t)},cannot:function(t){return this._fsm.cannot(t)},observe:function(){return this._fsm.observe(arguments)},transitions:function(){return this._fsm.transitions()},allTransitions:function(){return this._fsm.allTransitions()},allStates:function(){return this._fsm.allStates()},onInvalidTransition:function(t,n,i){return this._fsm.onInvalidTransition(t,n,i)},onPendingTransition:function(t,n,i){return this._fsm.onPendingTransition(t,n,i)}},d={state:{configurable:!1,enumerable:!0,get:function(){return this._fsm.state},set:function(t){throw Error("use transitions to change state")}}};e.version="3.0.1",e.factory=s,e.apply=r,e.defaults={wildcard:"*",init:{name:"init",from:"none"}},t.exports=e},function(t,n,i){"use strict";t.exports=function(t,n,i,e,s){this.message=t,this.transition=n,this.from=i,this.to=e,this.current=s}}])});