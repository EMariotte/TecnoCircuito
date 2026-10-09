(()=>{var Ye=globalThis,Ke=Ye.ShadowRoot&&(Ye.ShadyCSS===void 0||Ye.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,So=Symbol(),Dr=new WeakMap,me=class{constructor(t,o,n){if(this._$cssResult$=!0,n!==So)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(Ke&&t===void 0){let n=o!==void 0&&o.length===1;n&&(t=Dr.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Dr.set(o,t))}return t}toString(){return this.cssText}},jr=e=>new me(typeof e=="string"?e:e+"",void 0,So),dt=(e,...t)=>{let o=e.length===1?e[0]:t.reduce((n,a,c)=>n+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[c+1],e[0]);return new me(o,e,So)},Nr=(e,t)=>{if(Ke)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let n=document.createElement("style"),a=Ye.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=o.cssText,e.appendChild(n)}},_o=Ke?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let n of t.cssRules)o+=n.cssText;return jr(o)})(e):e;var{is:da,defineProperty:pa,getOwnPropertyDescriptor:ua,getOwnPropertyNames:fa,getOwnPropertySymbols:ha,getPrototypeOf:ma}=Object,Je=globalThis,Lr=Je.trustedTypes,ga=Lr?Lr.emptyScript:"",xa=Je.reactiveElementPolyfillSupport,ge=(e,t)=>e,xe={toAttribute(e,t){switch(t){case Boolean:e=e?ga:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},Ze=(e,t)=>!da(e,t),Tr={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Ze};Symbol.metadata??=Symbol("metadata"),Je.litPropertyMetadata??=new WeakMap;var yt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Tr){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let n=Symbol(),a=this.getPropertyDescriptor(t,n,o);a!==void 0&&pa(this.prototype,t,a)}}static getPropertyDescriptor(t,o,n){let{get:a,set:c}=ua(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:a,set(i){let p=a?.call(this);c?.call(this,i),this.requestUpdate(t,p,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tr}static _$Ei(){if(this.hasOwnProperty(ge("elementProperties")))return;let t=ma(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ge("properties"))){let o=this.properties,n=[...fa(o),...ha(o)];for(let a of n)this.createProperty(a,o[a])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[n,a]of o)this.elementProperties.set(n,a)}this._$Eh=new Map;for(let[o,n]of this.elementProperties){let a=this._$Eu(o,n);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let a of n)o.unshift(_o(a))}else t!==void 0&&o.push(_o(t));return o}static _$Eu(t,o){let n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let n of o.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Nr(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,n){this._$AK(t,n)}_$ET(t,o){let n=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,n);if(a!==void 0&&n.reflect===!0){let c=(n.converter?.toAttribute!==void 0?n.converter:xe).toAttribute(o,n.type);this._$Em=t,c==null?this.removeAttribute(a):this.setAttribute(a,c),this._$Em=null}}_$AK(t,o){let n=this.constructor,a=n._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let c=n.getPropertyOptions(a),i=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:xe;this._$Em=a;let p=i.fromAttribute(o,c.type);this[a]=p??this._$Ej?.get(a)??p,this._$Em=null}}requestUpdate(t,o,n,a=!1,c){if(t!==void 0){let i=this.constructor;if(a===!1&&(c=this[t]),n??=i.getPropertyOptions(t),!((n.hasChanged??Ze)(c,o)||n.useDefault&&n.reflect&&c===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,n))))return;this.C(t,o,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:n,reflect:a,wrapped:c},i){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??o??this[t]),c!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(o=void 0),this._$AL.set(t,o)),a===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,c]of this._$Ep)this[a]=c;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[a,c]of n){let{wrapped:i}=c,p=this[a];i!==!0||this._$AL.has(a)||p===void 0||this.C(a,void 0,c,p)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(o)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};yt.elementStyles=[],yt.shadowRootOptions={mode:"open"},yt[ge("elementProperties")]=new Map,yt[ge("finalized")]=new Map,xa?.({ReactiveElement:yt}),(Je.reactiveElementVersions??=[]).push("2.1.2");var Oo=globalThis,Ir=e=>e,Qe=Oo.trustedTypes,Gr=Qe?Qe.createPolicy("lit-html",{createHTML:e=>e}):void 0,Hr="$lit$",Ot=`lit$${Math.random().toFixed(9).slice(2)}$`,Xr="?"+Ot,ba=`<${Xr}>`,qt=document,ye=()=>qt.createComment(""),$e=e=>e===null||typeof e!="object"&&typeof e!="function",Ro=Array.isArray,ya=e=>Ro(e)||typeof e?.[Symbol.iterator]=="function",Ao=`[ 	
\f\r]`,be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vr=/-->/g,zr=/>/g,Vt=RegExp(`>|${Ao}(?:([^\\s"'>=/]+)(${Ao}*=${Ao}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qr=/'/g,Br=/"/g,Fr=/^(?:script|style|textarea|title)$/i,Do=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),at=Do(1),vt=Do(2),si=Do(3),$t=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),Ur=new WeakMap,zt=qt.createTreeWalker(qt,129);function Wr(e,t){if(!Ro(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gr!==void 0?Gr.createHTML(t):t}var $a=(e,t)=>{let o=e.length-1,n=[],a,c=t===2?"<svg>":t===3?"<math>":"",i=be;for(let p=0;p<o;p++){let l=e[p],f,g,x=-1,v=0;for(;v<l.length&&(i.lastIndex=v,g=i.exec(l),g!==null);)v=i.lastIndex,i===be?g[1]==="!--"?i=Vr:g[1]!==void 0?i=zr:g[2]!==void 0?(Fr.test(g[2])&&(a=RegExp("</"+g[2],"g")),i=Vt):g[3]!==void 0&&(i=Vt):i===Vt?g[0]===">"?(i=a??be,x=-1):g[1]===void 0?x=-2:(x=i.lastIndex-g[2].length,f=g[1],i=g[3]===void 0?Vt:g[3]==='"'?Br:qr):i===Br||i===qr?i=Vt:i===Vr||i===zr?i=be:(i=Vt,a=void 0);let C=i===Vt&&e[p+1].startsWith("/>")?" ":"";c+=i===be?l+ba:x>=0?(n.push(f),l.slice(0,x)+Hr+l.slice(x)+Ot+C):l+Ot+(x===-2?p:C)}return[Wr(e,c+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},ve=class e{constructor({strings:t,_$litType$:o},n){let a;this.parts=[];let c=0,i=0,p=t.length-1,l=this.parts,[f,g]=$a(t,o);if(this.el=e.createElement(f,n),zt.currentNode=this.el.content,o===2||o===3){let x=this.el.content.firstChild;x.replaceWith(...x.childNodes)}for(;(a=zt.nextNode())!==null&&l.length<p;){if(a.nodeType===1){if(a.hasAttributes())for(let x of a.getAttributeNames())if(x.endsWith(Hr)){let v=g[i++],C=a.getAttribute(x).split(Ot),y=/([.?@])?(.*)/.exec(v);l.push({type:1,index:c,name:y[2],strings:C,ctor:y[1]==="."?Mo:y[1]==="?"?Co:y[1]==="@"?Po:ee}),a.removeAttribute(x)}else x.startsWith(Ot)&&(l.push({type:6,index:c}),a.removeAttribute(x));if(Fr.test(a.tagName)){let x=a.textContent.split(Ot),v=x.length-1;if(v>0){a.textContent=Qe?Qe.emptyScript:"";for(let C=0;C<v;C++)a.append(x[C],ye()),zt.nextNode(),l.push({type:2,index:++c});a.append(x[v],ye())}}}else if(a.nodeType===8)if(a.data===Xr)l.push({type:2,index:c});else{let x=-1;for(;(x=a.data.indexOf(Ot,x+1))!==-1;)l.push({type:7,index:c}),x+=Ot.length-1}c++}}static createElement(t,o){let n=qt.createElement("template");return n.innerHTML=t,n}};function te(e,t,o=e,n){if(t===$t)return t;let a=n!==void 0?o._$Co?.[n]:o._$Cl,c=$e(t)?void 0:t._$litDirective$;return a?.constructor!==c&&(a?._$AO?.(!1),c===void 0?a=void 0:(a=new c(e),a._$AT(e,o,n)),n!==void 0?(o._$Co??=[])[n]=a:o._$Cl=a),a!==void 0&&(t=te(e,a._$AS(e,t.values),a,n)),t}var Eo=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:n}=this._$AD,a=(t?.creationScope??qt).importNode(o,!0);zt.currentNode=a;let c=zt.nextNode(),i=0,p=0,l=n[0];for(;l!==void 0;){if(i===l.index){let f;l.type===2?f=new we(c,c.nextSibling,this,t):l.type===1?f=new l.ctor(c,l.name,l.strings,this,t):l.type===6&&(f=new ko(c,this,t)),this._$AV.push(f),l=n[++p]}i!==l?.index&&(c=zt.nextNode(),i++)}return zt.currentNode=qt,a}p(t){let o=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,o),o+=n.strings.length-2):n._$AI(t[o])),o++}},we=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,n,a){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=n,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=te(this,t,o),$e(t)?t===X||t==null||t===""?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ya(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&$e(this._$AH)?this._$AA.nextSibling.data=t:this.T(qt.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:n}=t,a=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=ve.createElement(Wr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===a)this._$AH.p(o);else{let c=new Eo(a,this),i=c.u(this.options);c.p(o),this.T(i),this._$AH=c}}_$AC(t){let o=Ur.get(t.strings);return o===void 0&&Ur.set(t.strings,o=new ve(t)),o}k(t){Ro(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,n,a=0;for(let c of t)a===o.length?o.push(n=new e(this.O(ye()),this.O(ye()),this,this.options)):n=o[a],n._$AI(c),a++;a<o.length&&(this._$AR(n&&n._$AB.nextSibling,a),o.length=a)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let n=Ir(t).nextSibling;Ir(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,n,a,c){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=o,this._$AM=a,this.options=c,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=X}_$AI(t,o=this,n,a){let c=this.strings,i=!1;if(c===void 0)t=te(this,t,o,0),i=!$e(t)||t!==this._$AH&&t!==$t,i&&(this._$AH=t);else{let p=t,l,f;for(t=c[0],l=0;l<c.length-1;l++)f=te(this,p[n+l],o,l),f===$t&&(f=this._$AH[l]),i||=!$e(f)||f!==this._$AH[l],f===X?t=X:t!==X&&(t+=(f??"")+c[l+1]),this._$AH[l]=f}i&&!a&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Mo=class extends ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}},Co=class extends ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}},Po=class extends ee{constructor(t,o,n,a,c){super(t,o,n,a,c),this.type=5}_$AI(t,o=this){if((t=te(this,t,o,0)??X)===$t)return;let n=this._$AH,a=t===X&&n!==X||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,c=t!==X&&(n===X||a);a&&this.element.removeEventListener(this.name,this,n),c&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ko=class{constructor(t,o,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}};var va=Oo.litHtmlPolyfillSupport;va?.(ve,we),(Oo.litHtmlVersions??=[]).push("3.3.3");var Yr=(e,t,o)=>{let n=o?.renderBefore??t,a=n._$litPart$;if(a===void 0){let c=o?.renderBefore??null;n._$litPart$=a=new we(t.insertBefore(ye(),c),c,void 0,o??{})}return a._$AI(e),a};var jo=globalThis,K=class extends yt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Yr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};K._$litElement$=!0,K.finalized=!0,jo.litElementHydrateSupport?.({LitElement:K});var wa=jo.litElementPolyfillSupport;wa?.({LitElement:K});(jo.litElementVersions??=[]).push("4.2.2");var ht=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var Sa={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Ze},_a=(e=Sa,t,o)=>{let{kind:n,metadata:a}=o,c=globalThis.litPropertyMetadata.get(a);if(c===void 0&&globalThis.litPropertyMetadata.set(a,c=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),c.set(o.name,e),n==="accessor"){let{name:i}=o;return{set(p){let l=t.get.call(this);t.set.call(this,p),this.requestUpdate(i,l,e,!0,p)},init(p){return p!==void 0&&this.C(i,void 0,e,p),p}}}if(n==="setter"){let{name:i}=o;return function(p){let l=this[i];t.call(this,p),this.requestUpdate(i,l,e,!0,p)}}throw Error("Unsupported decorator location: "+n)};function T(e){return(t,o)=>typeof o=="object"?_a(e,t,o):((n,a,c)=>{let i=a.hasOwnProperty(c);return a.constructor.createProperty(c,n),i?Object.getOwnPropertyDescriptor(a,c):void 0})(e,t,o)}var Bt=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function Kr(e,t){return(o,n,a)=>{let c=i=>i.renderRoot?.querySelector(e)??null;if(t){let{get:i,set:p}=typeof n=="object"?o:a??(()=>{let l=Symbol();return{get(){return this[l]},set(f){this[l]=f}}})();return Bt(o,n,{get(){let l=i.call(this);return l===void 0&&(l=c(this),(l!==null||this.hasUpdated)&&p.call(this,l)),l}})}return Bt(o,n,{get(){return c(this)}})}}var Jr=vt`
  <pattern id="pins-female" width="2.54" height="2.54" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="2.54" height="2.54" fill="#333"></rect>
    <rect x="1.079" y="0.896" width="0.762" height="0.762" style="fill: #191919"></rect>
    <path
      transform="translate(1.079, 1.658) rotate(180 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.25"
    ></path>
    <path
      transform="translate(1.841, 1.658) rotate(90 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.3; fill: #fff"
    ></path>
    <path
      transform="translate(1.841, 0.896)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.15; fill: #fff"
    ></path>
    <path
      transform="translate(1.079, 0.896) rotate(270 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.35"
    ></path>
  </pattern>
`;var pt=e=>({type:"analog",channel:e}),Se=(e,t=0)=>({type:"i2c",signal:e,bus:t}),_e=(e,t=0)=>({type:"spi",signal:e,bus:t}),No=(e,t=0)=>({type:"usart",signal:e,bus:t});var oe=[" ","Spacebar"];function Aa(){return typeof navigator=="object"?navigator.userAgent:""}function Ea(){return Aa().indexOf("Macintosh")>=0}function Zr(e){return Ea()?e.metaKey:e.ctrlKey}var Ut=function(e,t,o,n){var a=arguments.length,c=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,o,n);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(c=(a<3?i(c):a>3?i(t,o,c):i(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},Rt=class extends K{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[pt(5),Se("SCL")]},{name:"A4.2",x:97,y:9,signals:[pt(4),Se("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[_e("SCK")]},{name:"12",x:134.5,y:9,signals:[_e("MISO")]},{name:"11",x:144,y:9,signals:[_e("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[_e("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[No("TX")]},{name:"0",x:255.5,y:9,signals:[No("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[pt(0)]},{name:"A1",x:217.5,y:191.5,signals:[pt(1)]},{name:"A2",x:227,y:191.5,signals:[pt(2)]},{name:"A3",x:236.5,y:191.5,signals:[pt(3)]},{name:"A4",x:246,y:191.5,signals:[pt(4),Se("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[pt(5),Se("SCL")]}]}static get styles(){return dt`
      text {
        font-size: 2px;
        font-family: monospace;
        user-select: none;
      }

      circle[tabindex]:hover,
      circle[tabindex]:focus {
        stroke: white;
        outline: none;
      }
    `}render(){let{ledPower:t,led13:o,ledRX:n,ledTX:a}=this;return at`
      <svg
        width="72.58mm"
        height="53.34mm"
        version="1.1"
        viewBox="-4 0 72.58 53.34"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <g id="led-body" fill="#eee">
            <rect x="0" y="0" height="1.2" width="2.6" fill="#c6c6c6" />
            <rect x="0.6" y="-0.1" width="1.35" height="1.4" stroke="#aaa" stroke-width="0.05" />
          </g>
        </defs>

        <filter id="ledFilter" x="-0.8" y="-0.8" height="2.2" width="2.8">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        ${Jr}

        <pattern id="pin-male" width="2.54" height="4.80" patternUnits="userSpaceOnUse">
          <rect ry="0.3" rx="0.3" width="2.12" height="4.80" fill="#565656" />
          <ellipse cx="1" cy="1.13" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
          <ellipse cx="1" cy="3.67" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
        </pattern>

        <pattern id="mcu-leads" width="2.54" height="0.508" patternUnits="userSpaceOnUse">
          <path
            d="M 0.254,0 C 0.114,0 0,0.114 0,0.254 v 0 c 0,0.139 0,0.253 0,0.253 h 1.523 c 0,0 0,-0.114 0,-0.253 v 0 C 1.523,0.114 1.409,0 1.269,0 Z"
            fill="#ddd"
          />
        </pattern>

        <!-- PCB -->
        <path
          d="m0.999 0a1 1 0 0 0-0.999 0.999v51.34a1 1 0 0 0 0.999 0.999h64.04a1 1 0 0 0 0.999-0.999v-1.54l2.539-2.539v-32.766l-2.539-2.539v-11.43l-1.524-1.523zm14.078 0.835h0.325l0.212 0.041h0l0.105 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.180 0.270 0.017 0.042 0.097 0.234 0.01 0.023 0.050 0.252 0.013 0.066v0.325l-0.063 0.318-0.040 0.097-0.083 0.202-0 0.001-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.020-0.212 0.042h-0.325l-0.212-0.042-0.106-0.020-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0 -0.001-0.083-0.202-0.040-0.097-0.063-0.318v-0.325l0.013-0.066 0.050-0.252 0.01-0.023 0.097-0.234 0.017-0.042 0.180-0.270 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021zm50.799 15.239h0.325l0.212 0.042 0.105 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.180 0.270 0.014 0.035 0.110 0.264 0.01 0.051 0.053 0.267v0.325l-0.03 0.152-0.033 0.166-0.037 0.089-0.079 0.191-0 0.020-0.180 0.270-0.229 0.229-0.270 0.180-0.071 0.029-0.228 0.094-0.106 0.021-0.212 0.042h-0.325l-0.212-0.042-0.106-0.021-0.228-0.094-0.071-0.029-0.270-0.180-0.229-0.229-0.180-0.270-0 -0.020-0.079-0.191-0.036-0.089-0.033-0.166-0.030-0.152v-0.325l0.053-0.267 0.010-0.051 0.109-0.264 0.014-0.035 0.180-0.270 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021zm0 27.94h0.325l0.180 0.036 0.138 0.027 0.212 0.087 0.058 0.024 0.029 0.012 0.270 0.180 0.229 0.229 0.180 0.270 0.124 0.300 0.063 0.319v0.325l-0.063 0.318-0.124 0.300-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.021-0.212 0.042h-0.325l-0.212-0.042-0.105-0.021-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0.124-0.300-0.063-0.318v-0.325l0.063-0.319 0.124-0.300 0.180-0.270 0.229-0.229 0.270-0.180 0.029-0.012 0.058-0.024 0.212-0.087 0.137-0.027zm-52.07 5.080h0.325l0.212 0.041 0.106 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.121 0.182 0.058 0.087h0l0.114 0.275 0.01 0.023 0.063 0.318v0.325l-0.035 0.179-0.027 0.139-0.01 0.023-0.114 0.275h-0l-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.020-0.212 0.042h-0.325l-0.212-0.042-0.105-0.020-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0.114-0.275-0.01-0.023-0.027-0.139-0.036-0.179v-0.325l0.063-0.318 0.01-0.023 0.114-0.275 0.058-0.087 0.121-0.182 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021z"
          fill="#2b6b99"
        />

        <!-- reset button -->
        <rect x="3.816" y="1.4125" width="6.2151" height="6.0268" fill="#9b9b9b" />
        <g fill="#e6e6e6">
          <rect x="2.1368" y="1.954" width="1.695" height=".84994" />
          <rect x="2.121" y="3.8362" width="1.695" height=".84994" />
          <rect x="2.0974" y="5.8608" width="1.695" height=".84994" />
          <rect x="10.031" y="6.0256" width="1.695" height=".84994" />
          <rect x="10.008" y="1.9528" width="1.695" height=".84994" />
        </g>
        <circle
          id="reset-button"
          cx="6.9619"
          cy="4.5279"
          r="1.5405"
          fill="#960000"
          stroke="#777"
          stroke-width="0.15"
          tabindex="0"
          @mousedown=${()=>this.down()}
          @touchstart=${()=>this.down()}
          @mouseup=${()=>this.up()}
          @mouseleave=${()=>this.leave()}
          @touchend=${()=>this.leave()}
          @keydown=${c=>oe.includes(c.key)&&this.down()}
          @keyup=${c=>oe.includes(c.key)&&this.up()}
        />

        <!-- USB Connector -->
        <g style="fill:#b3b2b2;stroke:#b3b2b2;stroke-width:0.010">
          <ellipse cx="3.84" cy="9.56" rx="1.12" ry="1.03" />
          <ellipse cx="3.84" cy="21.04" rx="1.12" ry="1.03" />
          <g fill="#000">
            <rect width="11" height="11.93" x="-0.05" y="9.72" rx="0.2" ry="0.2" opacity="0.24" />
          </g>
          <rect x="-4" y="9.37" height="11.85" width="14.46" />
          <rect x="-4" y="9.61" height="11.37" width="14.05" fill="#706f6f" />
          <rect x="-4" y="9.71" height="11.17" width="13.95" fill="#9d9d9c" />
        </g>

        <!-- Power jack -->
        <g stroke-width=".254" fill="black">
          <path
            d="m-2.58 48.53v2.289c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-2.289z"
            fill="#252728"
            opacity=".3"
          />
          <path
            d="m11.334 42.946c0-0.558-0.509-1.016-1.132-1.016h-10.043v9.652h10.043c0.622 0 1.132-0.457 1.132-1.016z"
            opacity=".3"
          />
          <path
            d="m-2.072 40.914c-0.279 0-0.507 0.204-0.507 0.454v8.435c0 0.279 0.228 0.507 0.507 0.507h1.722c0.279 0 0.507-0.228 0.507-0.507v-8.435c0-0.249-0.228-0.454-0.507-0.454z"
          />
          <path
            d="m-2.58 48.784v1.019c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-1.019z"
            opacity=".3"
          />
          <path
            d="m11.334 43.327c0.139 0 0.254 0.114 0.254 0.254v4.064c0 0.139-0.114 0.254-0.254 0.254"
          />
          <path
            d="m11.334 42.438c0-0.558-0.457-1.016-1.016-1.016h-10.16v8.382h10.16c0.558 0 1.016-0.457 1.016-1.016z"
          />
          <path
            d="m10.064 49.804h-9.906v-8.382h1.880c-1.107 0-1.363 1.825-1.363 3.826 0 1.765 1.147 3.496 3.014 3.496h6.374z"
            opacity=".3"
          />
          <rect x="10.064" y="41.422" width=".254" height="8.382" fill="#ffffff" opacity=".2" />
          <path
            d="m10.318 48.744v1.059c0.558 0 1.016-0.457 1.016-1.016v-0.364c0 0.313-1.016 0.320-1.016 0.320z"
            opacity=".3"
          />
        </g>

        <!-- Pin Headers -->
        <g transform="translate(17.497 1.27)">
          <rect width="${.38+2.54*10}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(44.421 1.27)">
          <rect width="${.38+2.54*8}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(26.641 49.53)">
          <rect width="${.38+2.54*8}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(49.501 49.53)">
          <rect width="${.38+2.54*6}" height="2.54" fill="url(#pins-female)"></rect>
        </g>

        <!-- MCU -->
        <g>
          <path
            d="m64.932 41.627h-36.72c-0.209 0-0.379-0.170-0.379-0.379v-8.545c0-0.209 0.170-0.379 0.379-0.379h36.72c0.209 0 0.379 0.170 0.379 0.379v8.545c0 0.209-0.169 0.379-0.379 0.379z"
            fill="#292c2d"
          />
          <path
            d="m65.019 40.397c0 0.279-0.228 0.508-0.508 0.508h-35.879c-0.279 0-0.507 0.025-0.507-0.254v-6.338c0-0.279 0.228-0.508 0.507-0.508h35.879c0.279 0 0.508 0.228 0.508 0.508z"
            opacity=".3"
          />
          <path
            d="m65.019 40.016c0 0.279-0.228 0.508-0.508 0.508h-35.879c-0.279 0-0.507 0.448-0.507-0.508v-6.084c0-0.279 0.228-0.508 0.507-0.508h35.879c0.279 0 0.508 0.228 0.508 0.508z"
            fill="#3c4042"
          />
          <rect
            transform="translate(29.205, 32.778)"
            fill="url(#mcu-leads)"
            height="0.508"
            width="35.56"
          ></rect>
          <rect
            transform="translate(29.205, 41.159) scale(1 -1)"
            fill="url(#mcu-leads)"
            height="0.508"
            width="35.56"
          ></rect>
          <g fill="#252728">
            <circle cx="33.269" cy="36.847" r="1" />
            <circle cx="59.939" cy="36.847" r="1" />
            <path d="M65 38.05a1.13 1.13 0 010-2.26v2.27z" />
          </g>
        </g>

        <!-- Programming Headers -->
        <g transform="translate(14.1 4.4)">
          <rect width="7" height="4.80" fill="url(#pin-male)" />
        </g>

        <g transform="translate(63 27.2) rotate(270 0 0)">
          <rect width="7" height="4.80" fill="url(#pin-male)" />
        </g>

        <!-- LEDs -->
        <g transform="translate(57.3, 16.21)">
          <use xlink:href="#led-body" />
          ${t&&vt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&vt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${a&&vt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${n&&vt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff" style="text-anchor: end">
          <tspan x="26.5" y="13">L</tspan>
          <tspan x="26.5" y="17.5">TX</tspan>
          <tspan x="26.5" y="19.8">RX</tspan>
          <tspan x="26.5" y="20">&#160;</tspan>
        </text>

        <!-- Pin Labels -->
        <rect x="28.27" y="10.34" width="36.5" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="40.84" y="9.48">DIGITAL (PWM ~)</tspan>
        </text>
        <text
          transform="translate(22.6 4) rotate(270 0 0)"
          fill="#fff"
          style="font-size: 2px; text-anchor: end; font-family: monospace"
        >
          <tspan x="0" dy="2.54">AREF</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">13</tspan>
          <tspan x="0" dy="2.54">12</tspan>
          <tspan x="0" dy="2.54">~11</tspan>
          <tspan x="0" dy="2.54">~10</tspan>
          <tspan x="0" dy="2.54">~9</tspan>
          <tspan x="0" dy="2.54">8</tspan>
          <tspan x="0" dy="4.08">7</tspan>
          <tspan x="0" dy="2.54">~6</tspan>
          <tspan x="0" dy="2.54">~5</tspan>
          <tspan x="0" dy="2.54">4</tspan>
          <tspan x="0" dy="2.54">~3</tspan>
          <tspan x="0" dy="2.54">2</tspan>
          <tspan x="0" dy="2.54">TX→1</tspan>
          <tspan x="0" dy="2.54">RX←0</tspan>
          <tspan x="0" dy="2.54">&#160;</tspan>
        </text>

        <rect x="33.90" y="42.76" width="12.84" height="0.16" fill="#fff"></rect>
        <rect x="49.48" y="42.76" width="14.37" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="41" y="44.96">POWER</tspan>
          <tspan x="53.5" y="44.96">ANALOG IN</tspan>
        </text>
        <text transform="translate(29.19 49) rotate(270 0 0)" fill="#fff" style="font-weight: 700">
          <tspan x="0" dy="2.54">IOREF</tspan>
          <tspan x="0" dy="2.54">RESET</tspan>
          <tspan x="0" dy="2.54">3.3V</tspan>
          <tspan x="0" dy="2.54">5V</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">Vin</tspan>
          <tspan x="0" dy="4.54">A0</tspan>
          <tspan x="0" dy="2.54">A1</tspan>
          <tspan x="0" dy="2.54">A2</tspan>
          <tspan x="0" dy="2.54">A3</tspan>
          <tspan x="0" dy="2.54">A4</tspan>
          <tspan x="0" dy="2.54">A5</tspan>
        </text>

        <!-- Logo -->
        <path
          style="fill:none;stroke:#fff;stroke-width:1.03"
          d="m 34.21393,12.01079 c -1.66494,-0.13263 -3.06393,1.83547 -2.37559,3.36182 0.66469,1.65332 3.16984,2.10396 4.36378,0.77797 1.15382,-1.13053 1.59956,-2.86476 3.00399,-3.75901 1.43669,-0.9801 3.75169,-0.0547 4.02384,1.68886 0.27358,1.66961 -1.52477,3.29596 -3.15725,2.80101 -1.20337,-0.27199 -2.06928,-1.29866 -2.56193,-2.37788 -0.6046,-1.0328 -1.39499,-2.13327 -2.62797,-2.42367 -0.2191,-0.0497 -0.44434,-0.0693 -0.66887,-0.0691 z"
        />
        <path
          style="fill:none;stroke:#fff;stroke-width:0.56"
          d="m 39.67829,14.37519 h 1.75141 m -0.89321,-0.8757 v 1.7514 m -7.30334,-0.8757 h 2.10166"
        />
        <text x="31" y="20.2" style="font-size:2.8px;font-weight:bold;line-height:1.25;fill:#fff">
          ARDUINO
        </text>

        <rect
          style="fill:none;stroke:#fff;stroke-width:0.1;stroke-dasharray:0.1, 0.1"
          width="11"
          height="5.45"
          x="45.19"
          y="11.83"
          rx="1"
          ry="1"
        />

        <text x="46.5" y="16" style="font-size:5px; line-height:1.25" fill="#fff">UNO</text>
      </svg>
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};Ut([T()],Rt.prototype,"led13",void 0);Ut([T()],Rt.prototype,"ledRX",void 0);Ut([T()],Rt.prototype,"ledTX",void 0);Ut([T()],Rt.prototype,"ledPower",void 0);Ut([T()],Rt.prototype,"resetPressed",void 0);Ut([Kr("#reset-button")],Rt.prototype,"resetButton",void 0);Rt=Ut([ht("wokwi-arduino-uno")],Rt);var Qr=function(e,t,o,n){var a=arguments.length,c=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,o,n);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(c=(a<3?i(c):a>3?i(t,o,c):i(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},Lo={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},To=class extends K{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return dt`
      :host {
        display: flex;
      }
    `}breakValue(t){let o=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,n=Math.round(t/10**o);return t===0?[0,0]:[Math.round(n%100),o]}render(){let{value:t}=this,o=parseFloat(t),[n,a]=this.breakValue(o),c=Lo[Math.floor(n/10)],i=Lo[n%10],p=Lo[a];return at`
      <svg
        width="15.645mm"
        height="3mm"
        version="1.1"
        viewBox="0 0 15.645 3"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient
            id="a"
            x2="0"
            y1="22.332"
            y2="38.348"
            gradientTransform="matrix(.14479 0 0 .14479 -23.155 -4.0573)"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop stop-color="#323232" offset="0" />
            <stop stop-color="#fff" stop-opacity=".42268" offset="1" />
          </linearGradient>
        </defs>
        <rect y="1.1759" width="15.558" height=".63826" fill="#aaa" />
        <g stroke-width=".14479" fill="#d5b597">
          <path
            id="body"
            d="m4.6918 0c-1.0586 0-1.9185 0.67468-1.9185 1.5022 0 0.82756 0.85995 1.4978 1.9185 1.4978 0.4241 0 0.81356-0.11167 1.1312-0.29411h4.0949c0.31802 0.18313 0.71075 0.29411 1.1357 0.29411 1.0586 0 1.9185-0.67015 1.9185-1.4978 0-0.8276-0.85995-1.5022-1.9185-1.5022-0.42499 0-0.81773 0.11098-1.1357 0.29411h-4.0949c-0.31765-0.18244-0.7071-0.29411-1.1312-0.29411z"
          />
          <use xlink:href="#body" fill="url(#a)" opacity=".44886" />
          <rect x="4" y="0" width="1" height="3" fill="${c}" clip-path="url(#g)" />

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${i}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${p}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};Qr([T()],To.prototype,"value",void 0);To=Qr([ht("wokwi-resistor")],To);var Ht=function(e,t,o,n){var a=arguments.length,c=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,o,n);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(c=(a<3?i(c):a>3?i(t,o,c):i(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},Ma={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},Dt=class extends K{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return dt`
      :host {
        display: inline-block;
      }

      .led-container {
        display: flex;
        flex-direction: column;
        width: 40px;
      }

      .led-label {
        font-size: 10px;
        text-align: center;
        color: gray;
        position: relative;
        line-height: 1;
        top: -8px;
      }
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:o,flip:n}=this,a=o||Ma[t?.toLowerCase()]||t,c=this.brightness?.3+this.brightness*.7:0,i=this.value&&this.brightness>Number.EPSILON;return at`<svg
      width="40"
      height="50"
      transform="scale(${n?-1:1} 1)"
      version="1.2"
      viewBox="-10 -5 35.456 39.618"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="light1" x="-0.8" y="-0.8" height="2.2" width="2.8">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <filter id="light2" x="-0.8" y="-0.8" height="2.2" width="2.8">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <rect x="2.5099" y="20.382" width="2.1514" height="9.8273" fill="#8c8c8c" />
      <path
        d="m12.977 30.269c0-1.1736-0.86844-2.5132-1.8916-3.4024-0.41616-0.3672-1.1995-1.0015-1.1995-1.4249v-5.4706h-2.1614v5.7802c0 1.0584 0.94752 1.8785 1.9462 2.7482 0.44424 0.37584 1.3486 1.2496 1.3486 1.7694"
        fill="#8c8c8c"
      />

      <path
        d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
        opacity=".3"
      />
      <path
        d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
        fill="#e6e6e6"
        opacity=".5"
      />
      <path
        d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v4.6296c1.4738 1.6517 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586l-4e-5 -1.5235c-7e-4 -1.1419-0.4744-2.2032-1.283-3.1054z"
        fill="#d1d1d1"
        opacity=".9"
      />
      <g>
        <path
          d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v4.6296c1.4738 1.6517 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586l-4e-5 -1.5235c-7e-4 -1.1419-0.4744-2.2032-1.283-3.1054z"
          opacity=".7"
        />
        <path
          d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v3.1054c1.4738 1.6502 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586-7.4e-4 -1.1412-0.47444-2.2025-1.283-3.1047z"
          opacity=".25"
        />
        <ellipse cx="7.0877" cy="16.106" rx="7.087" ry="4.9608" opacity=".25" />
      </g>
      <polygon
        points="2.2032 16.107 3.1961 16.107 3.1961 13.095 6.0156 13.095 10.012 8.8049 3.407 8.8049 2.2032 9.648"
        fill="#666666"
      />
      <polygon
        points="11.215 9.0338 7.4117 13.095 11.06 13.095 11.06 16.107 11.974 16.107 11.974 8.5241 10.778 8.5241"
        fill="#666666"
      />
      <path
        d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
        fill="${t}"
        opacity=".65"
      />
      <g fill="#ffffff">
        <path
          d="m10.388 3.7541 1.4364-0.2736c-0.84168-1.1318-2.0822-1.9577-3.5417-2.2385l0.25416 1.0807c0.76388 0.27072 1.4068 0.78048 1.8511 1.4314z"
          opacity=".5"
        />
        <path
          d="m0.76824 19.926v1.5199c0.64872 0.5292 1.4335 0.97632 2.3076 1.3169v-1.525c-0.8784-0.33624-1.6567-0.78194-2.3076-1.3118z"
          opacity=".5"
        />
        <path
          d="m11.073 20.21c-0.2556 0.1224-0.52992 0.22968-0.80568 0.32976-0.05832 0.01944-0.11736 0.04032-0.17784 0.05832-0.56376 0.17928-1.1614 0.31896-1.795 0.39456-0.07488 0.0094-0.1512 0.01872-0.22464 0.01944-0.3204 0.03024-0.64368 0.05832-0.97056 0.05832-0.14832 0-0.30744-0.01512-0.4716-0.02376-1.2002-0.05688-2.3306-0.31464-3.2976-0.73944l-2e-5 -8.3895v-4.8254c0-1.471 0.84816-2.7295 2.0736-3.3494l-0.02232-0.05328-1.2478-1.512c-1.6697 1.003-2.79 2.8224-2.79 4.9118v11.905c-0.04968-0.04968-0.30816-0.30888-0.48024-0.52992l-0.30744 0.6876c1.4011 1.4818 3.8088 2.4617 6.5426 2.4617 1.6798 0 3.2371-0.37368 4.5115-1.0022l-0.52704-0.40896-0.01006 0.0072z"
          opacity=".5"
        />
      </g>
      <g class="light" style="display: ${i?"":"none"}">
        <ellipse
          cx="8"
          cy="10"
          rx="10"
          ry="10"
          fill="${a}"
          filter="url(#light2)"
          style="opacity: ${c}"
        ></ellipse>
        <ellipse cx="8" cy="10" rx="2" ry="2" fill="white" filter="url(#light1)"></ellipse>
        <ellipse
          cx="8"
          cy="10"
          rx="3"
          ry="3"
          fill="white"
          filter="url(#light1)"
          style="opacity: ${c}"
        ></ellipse>
      </g>
    </svg> `}render(){return at`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};Ht([T()],Dt.prototype,"value",void 0);Ht([T()],Dt.prototype,"brightness",void 0);Ht([T()],Dt.prototype,"color",void 0);Ht([T()],Dt.prototype,"lightColor",void 0);Ht([T()],Dt.prototype,"label",void 0);Ht([T({type:Boolean})],Dt.prototype,"flip",void 0);Dt=Ht([ht("wokwi-led")],Dt);var tn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},en=e=>(...t)=>({_$litDirective$:e,values:t}),to=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,n){this._$Ct=t,this._$AM=o,this._$Ci=n}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var on="important",Ca=" !"+on,rn=en(class extends to{constructor(e){if(super(e),e.type!==tn.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,o)=>{let n=e[o];return n==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?o.removeProperty(n):o[n]=null);for(let n in t){let a=t[n];if(a!=null){this.ft.add(n);let c=typeof a=="string"&&a.endsWith(Ca);n.includes("-")||c?o.setProperty(n,c?a.slice(0,-11):a,c?on:""):o[n]=a}}return $t}});var eo=(e,t,o)=>{let n=Math.min(o,t);return Math.max(n,e)};function nn(e,t){let o=t.transformPoint({x:e.left,y:e.top}),n=t.transformPoint({x:e.right,y:e.top}),a=t.transformPoint({x:e.left,y:e.bottom}),c=t.transformPoint({x:e.right,y:e.bottom}),i=Math.min(o.x,n.x,a.x,c.x),p=Math.min(o.y,n.y,a.y,c.y),l=Math.max(o.x,n.x,a.x,c.x),f=Math.max(o.y,n.y,a.y,c.y);return new DOMRect(i,p,l-i,f-p)}function an(e,t,o){let{userAgent:n}=navigator;if(n.indexOf("Epiphany")>=0||n.indexOf("Safari")>=0){let c=e.getCTM(),i=t?.getCTM(),p=t?.getBoundingClientRect(),l=t?.ownerSVGElement?.getBoundingClientRect();if(!p||!l||!i||!c)return null;let f=l.x+l.width/2,g=l.y+l.height/2,x=f-(p.x+p.width/2),v=g-(p.y+p.height/2),C=Math.atan2(v,x)/Math.PI*180,y=new DOMMatrix().rotate(C),$=nn(o,y),L=$.width/p.width,O=$.height/p.height,H=i.inverse().multiply(c);return y.inverse().translate($.left,$.top).multiply(H.inverse()).scale(L,O).translate(-p.left,-p.top)}else return e.getScreenCTM()?.inverse()||null}var Xt=function(e,t,o,n){var a=arguments.length,c=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,o,n);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(c=(a<3?i(c):a>3?i(t,o,c):i(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},oo={x:9.91,y:8.18},jt=class extends K{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[pt(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return dt`
      #rotating {
        transform-origin: 10px 8px;
        transform: rotate(var(--knob-angle, 0deg));
      }

      svg text {
        font-size: 1px;
        line-height: 1.25;
        letter-spacing: 0px;
        word-spacing: 0px;
        fill: #ffffff;
      }
      .hide-input {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
      }
      input:focus + svg #knob {
        stroke: #ccdae3;
        filter: url(#outline);
      }
    `}mapToMinMax(t,o,n){return t*(n-o)+o}percentFromMinMax(t,o,n){return(t-o)/(n-o)}renderSVG(){let t=eo(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*t+this.startDegree;return at`<svg
      role="slider"
      width="20mm"
      height="20mm"
      version="1.1"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      @click="${this.focusInput}"
      @mousedown=${this.down}
      @mousemove=${this.move}
      @mouseup=${this.up}
      @touchstart=${this.down}
      @touchmove=${this.move}
      @touchend=${this.up}
      style=${rn({"--knob-angle":o+"deg"})}
    >
      <defs>
        <filter id="outline">
          <feDropShadow id="glow" dx="0" dy="0" stdDeviation="0.5" flood-color="cyan" />
        </filter>
      </defs>
      <rect
        x=".15"
        y=".15"
        width="19.5"
        height="19.5"
        ry="1.23"
        fill="#045881"
        stroke="#045881"
        stroke-width=".30"
      />
      <rect x="5.4" y=".70" width="9.1" height="1.9" fill="#ccdae3" stroke-width=".15" />
      <ellipse
        id="knob"
        cx=${oo.x}
        cy=${oo.y}
        rx="7.27"
        ry="7.43"
        fill="#e4e8eb"
        stroke-width=".15"
      />
      <rect x="6" y="17" width="8" height="2" fill-opacity="0" stroke="#fff" stroke-width=".30" />
      <g stroke-width=".15">
        <text x="6.21" y="16.6">GND</text>
        <text x="9.2" y="16.63">SIG</text>
        <text x="11.5" y="16.59">VCC</text>
      </g>
      <g fill="#fff" stroke-width=".15">
        <ellipse cx="1.68" cy="1.81" rx=".99" ry=".96" />
        <ellipse cx="1.48" cy="18.37" rx=".99" ry=".96" />
        <ellipse cx="17.97" cy="18.47" rx=".99" ry=".96" />
        <ellipse cx="18.07" cy="1.91" rx=".99" ry=".96" />
      </g>
      <g fill="#b3b1b0" stroke-width=".15">
        <ellipse cx="7.68" cy="18" rx=".61" ry=".63" />
        <ellipse cx="10.22" cy="18" rx=".61" ry=".63" />
        <ellipse cx="12.76" cy="18" rx=".61" ry=".63" />
      </g>
      <ellipse cx="9.95" cy="8.06" rx="6.60" ry="6.58" fill="#c3c2c3" stroke-width=".15" />
      <rect id="rotating" x="10" y="2" width=".42" height="3.1" stroke-width=".15" />
      <rect x="0" y="9.5" width="1" height="1" fill="none" id="firefox-workaround" />
    </svg>`}render(){return at`
      <input
        tabindex="0"
        type="range"
        class="hide-input"
        max="${this.max}"
        min="${this.min}"
        value="${this.value}"
        step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuenow="${this.value}"
        @input="${this.onValueChange}"
      />
      ${this.renderSVG()}
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let o=t.target;this.updateValue(parseFloat(o.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:o}=this;o&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&o?an(t,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let o=t.type==="touchmove",n=o?t.touches[0].pageX:t.pageX,a=o?t.touches[0].pageY:t.pageY,c=new DOMPointReadOnly(n,a).matrixTransform(this.pageToKnobMatrix),i=oo.x-c.x,p=oo.y-c.y,l=Math.round(Math.atan2(p,i)*180/Math.PI);l<0&&(l+=360),l-=90,i>0&&p<=0&&l>0&&(l-=360),l=eo(this.startDegree,this.endDegree,l);let f=this.percentFromMinMax(l,this.startDegree,this.endDegree),g=this.mapToMinMax(f,this.min,this.max);this.updateValue(g)}updateValue(t){let o=eo(this.min,this.max,t),n=Math.round(o/this.step)*this.step;this.value=Math.round(n*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};Xt([T({type:Number})],jt.prototype,"min",void 0);Xt([T({type:Number})],jt.prototype,"max",void 0);Xt([T()],jt.prototype,"value",void 0);Xt([T()],jt.prototype,"step",void 0);Xt([T()],jt.prototype,"startDegree",void 0);Xt([T()],jt.prototype,"endDegree",void 0);jt=Xt([ht("wokwi-potentiometer")],jt);var Ae=function(e,t,o,n){var a=arguments.length,c=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,o,n);else for(var p=e.length-1;p>=0;p--)(i=e[p])&&(c=(a<3?i(c):a>3?i(t,o,c):i(t,o))||c);return a>3&&c&&Object.defineProperty(t,o,c),c},Io,re=class extends K{static{Io=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Io.pushbuttonCounter++}static get styles(){return dt`
      :host {
        display: inline-flex;
        flex-direction: column;
      }

      button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        text-decoration: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      .button-active-circle {
        opacity: 0;
      }

      button:active .button-active-circle {
        opacity: 1;
      }

      .clickable-element {
        cursor: pointer;
      }

      .label {
        width: 0;
        min-width: 100%;
        font-size: 12px;
        text-align: center;
        color: gray;
        position: relative;
        line-height: 1;
        top: -2px;
      }
    `}renderSVG(){let{color:t,uniqueId:o,xray:n}=this,a=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return at`<svg
      width="17.802mm"
      height="12mm"
      version="1.1"
      viewBox="-3 0 18 12"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="grad-up-${o}" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="grad-down-${o}" x1="1" x2="0" y1="1" y2="0">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="12" height="12" rx=".44" ry=".44" fill="#464646" />
      <rect x=".75" y=".75" width="10.5" height="10.5" rx=".211" ry=".211" fill="#eaeaea" />
      ${n?vt`
      <rect
        style="opacity:0.3;fill:#999999;stroke-width:0.563001;paint-order:stroke markers fill"
        id="rect17"
        width="12.087865"
        height="1.0371729"
        x="-0.00075517414"
        y="2.9106798"
      />
      <rect
        style="opacity:0.3;fill:#999999;stroke-width:0.534365;paint-order:stroke markers fill"
        id="rect17-3"
        width="12.087865"
        height="0.93434691"
        x="-0.071111664"
        y="8.0458994"
      />
    `:""}
      <g fill="#1b1b1">
        <circle cx="1.767" cy="1.7916" r=".37" />
        <circle cx="10.161" cy="1.7916" r=".37" />
        <circle cx="10.161" cy="10.197" r=".37" />
        <circle cx="1.767" cy="10.197" r=".37" />
      </g>
      <g fill="#999" stroke-width="1.0154">
        <path
          d="m12.365 2.426c0.06012 0 0.10849 0.0469 0.1085 0.10522v0.38698h2.2173c0.12023 0 0.217 0.0938 0.217 0.21045v0.50721c0 0.1166-0.09677 0.21045-0.217 0.21045h-2.2173v0.40101c0 0.0583-0.0484 0.10528-0.1085 0.10528h-0.36835v-1.9266z"
        />
        <path
          d="m12.365 7.5c0.06012 0 0.10849 0.0469 0.1085 0.10522v0.38698h2.2173c0.12023 0 0.217 0.0938 0.217 0.21045v0.50721c0 0.1166-0.09677 0.21045-0.217 0.21045h-2.2173v0.40101c0 0.0583-0.0484 0.10528-0.1085 0.10528h-0.36835v-1.9266z"
        />
        <path
          d="m-0.35085 4.3526c-0.06012 0-0.10849-0.0469-0.1085-0.10522v-0.38698h-2.2173c-0.12023 0-0.217-0.0938-0.217-0.21045v-0.50721c0-0.1166 0.09677-0.21045 0.217-0.21045h2.2173v-0.40101c0-0.0583 0.0484-0.10528 0.1085-0.10528h0.36835v1.9266z"
        />
        <path
          d="m-0.35085 9.4266c-0.06012 0-0.10849-0.0469-0.1085-0.10522v-0.38698h-2.2173c-0.12023 0-0.217-0.0938-0.217-0.21045v-0.50721c0-0.1166 0.09677-0.21045 0.217-0.21045h2.2173v-0.40101c0-0.0583 0.0484-0.10528 0.1085-0.10528h0.36835v1.9266z"
        />
      </g>
      <g class="clickable-element">
        <circle cx="6" cy="6" r="3.822" fill="${a}" />
        <circle
          class="button-active-circle"
          cx="6"
          cy="6"
          r="3.822"
          fill="url(#grad-down-${o})"
        />
        <circle
          cx="6"
          cy="6"
          r="2.9"
          fill="${t}"
          stroke="#2f2f2f"
          stroke-opacity=".47"
          stroke-width=".08"
        />
      </g>
    </svg>`}render(){let{color:t,label:o}=this;return at`
      <button
        aria-label="${o} ${t} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${n=>oe.includes(n.key)&&this.down()}
        @keyup=${n=>oe.includes(n.key)&&this.up(n)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(t){this.pressed&&(Zr(t)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(t){this.sticky||this.up(t)}};Ae([T()],re.prototype,"color",void 0);Ae([T()],re.prototype,"pressed",void 0);Ae([T()],re.prototype,"label",void 0);Ae([T({type:Boolean,attribute:"xray"})],re.prototype,"xray",void 0);re=Io=Ae([ht("wokwi-pushbutton")],re);var sn=`:host {
  all: initial;
  display: block;
  width: 100%;
  height: 100%;
}

.tc {
  --fondo: #f5f7f9;
  --punto: #c5ced7;
  --texto: #1d2733;
  --suave: #5a6673;
  --barra: #ffffff;
  --borde: #d3d9df;
  --boton: #f1f3f6;
  --boton-hover: #e4e8ed;
  --sel: #1f7ae0;
  --sel-suave: rgba(31, 122, 224, 0.22);
  --tip-fondo: #1d2733;
  --tip-texto: #ffffff;
  --aviso: #b54708;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 320px;
  font: 14px/1.35 system-ui, "Segoe UI", Roboto, sans-serif;
  color: var(--texto);
  background: var(--fondo);
  -webkit-user-select: none;
  user-select: none;
}

.tc.tc-oscuro {
  --fondo: #14181d;
  --punto: #2c353e;
  --texto: #e5e9ed;
  --suave: #9aa6b2;
  --barra: #1b2026;
  --borde: #2f3740;
  --boton: #252c34;
  --boton-hover: #2f3842;
  --sel: #4b9bff;
  --sel-suave: rgba(75, 155, 255, 0.25);
  --tip-fondo: #e5e9ed;
  --tip-texto: #14181d;
  --aviso: #f79009;
}

@media (prefers-color-scheme: dark) {
  .tc:not(.tc-claro) {
    --fondo: #14181d;
    --punto: #2c353e;
    --texto: #e5e9ed;
    --suave: #9aa6b2;
    --barra: #1b2026;
    --borde: #2f3740;
    --boton: #252c34;
    --boton-hover: #2f3842;
    --sel: #4b9bff;
    --sel-suave: rgba(75, 155, 255, 0.25);
    --tip-fondo: #e5e9ed;
    --tip-texto: #14181d;
    --aviso: #f79009;
  }
}

.tc *,
.tc *::before,
.tc *::after {
  box-sizing: border-box;
}

/* Barra */

/* Siempre en una l\xEDnea: si la barra creciera a dos l\xEDneas, el \xE1rea cambiar\xEDa de alto y la vista saltar\xEDa
   mientras el aprendiz cablea. Si no cabe, se desplaza de lado. */
.tc-barra {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  align-items: center;
  gap: 8px 12px;
  height: 54px; /* fija: si cambiara con lo elegido, la vista se correr\xEDa bajo el mouse */
  padding: 8px 10px;
  background: var(--barra);
  border-bottom: 1px solid var(--borde);
}

.tc-grupo,
.tc-sel {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tc-sel {
  flex: 1 1 auto;
  flex-wrap: nowrap;
  gap: 6px 8px;
  min-width: 0;
  overflow-x: auto; /* si las opciones de la pieza no caben, se desplazan aqu\xED sin tapar el zoom */
  overflow-y: hidden;
  scrollbar-width: thin;
  padding: 3px 2px; /* el anillo de la muestra elegida no se corta */
}

.tc-barra > .tc-grupo,
.tc-sel > * {
  flex: none;
}

.tc-etiqueta {
  font-weight: 600;
  margin-right: 2px;
}

.tc button,
.tc select {
  font: inherit;
  color: var(--texto);
  background: var(--boton);
  border: 1px solid var(--borde);
  border-radius: 8px;
  min-height: 32px;
  padding: 4px 11px;
  cursor: pointer;
}

.tc button:hover,
.tc select:hover {
  background: var(--boton-hover);
}

.tc button:focus-visible,
.tc select:focus-visible,
.tc input:focus-visible {
  outline: 2px solid var(--sel);
  outline-offset: 1px;
}

/* Muestra de color con su n\xFAmero del c\xF3digo de colores (la tecla que la elige) */
.tc .tc-muestra {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  min-height: 0;
  padding: 0;
  border-radius: 50%;
  border: 2px solid var(--borde);
  font: 700 11px/1 system-ui, "Segoe UI", sans-serif;
}

.tc .tc-muestra.tc-activa {
  box-shadow: 0 0 0 2px var(--barra), 0 0 0 4px var(--sel);
}

.tc-campo,
.tc-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

/* \xC1rea de trabajo */

.tc-area {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  outline: none;
  touch-action: none;
  background-color: var(--fondo);
  background-image: radial-gradient(circle, var(--punto) 1px, transparent 1.3px);
}

.tc-area.tc-paneando {
  cursor: grabbing;
}

.tc-dibujando .tc-area {
  cursor: crosshair;
}

.tc-mundo,
.tc-capa-comp,
.tc-capa-pines {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
}

.tc-mundo {
  transform-origin: 0 0;
}

.tc-comp {
  position: absolute;
  transform-origin: 50% 50%;
  cursor: grab;
}

/* flex y no block: con block, el SVG del dibujo queda en una l\xEDnea de texto y baja unos px */
.tc-comp > * {
  display: flex;
}

.tc-comp.tc-placa {
  cursor: default;
}

.tc-comp.tc-seleccionado {
  outline: 1.5px dashed var(--sel);
  outline-offset: 4px;
  border-radius: 2px;
}

/* LED quemado: gris y con un r\xF3tulo, hasta detener la simulaci\xF3n */
.tc-comp.tc-quemado > * {
  filter: grayscale(1) brightness(0.5);
}

.tc-comp.tc-quemado::after {
  content: "quemado";
  position: absolute;
  left: 50%;
  top: -11px;
  transform: translateX(-50%);
  padding: 0 4px;
  border-radius: 3px;
  font: 600 7px/11px system-ui, sans-serif;
  color: #ffffff;
  background: #b42318;
  white-space: nowrap;
  pointer-events: none;
}

.tc-desconocido {
  width: 64px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1.5px dashed var(--suave);
  border-radius: 6px;
  color: var(--suave);
  font-size: 10px;
}

/* Cables */

.tc-capa-cables {
  position: absolute;
  left: -5000px;
  top: -5000px;
  width: 10000px;
  height: 10000px;
  overflow: visible;
  pointer-events: none;
}

.tc-cable-borde {
  fill: none;
  stroke: rgba(0, 0, 0, 0.42);
  stroke-width: 4.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.tc-cable-linea {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.tc-punta {
  stroke: rgba(0, 0, 0, 0.55);
  stroke-width: 0.8;
}

.tc-cable-toque {
  fill: none;
  stroke: transparent;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: stroke;
  cursor: pointer;
}

.tc-cable:hover .tc-cable-borde {
  stroke: rgba(0, 0, 0, 0.7);
}

.tc-cable.tc-seleccionado .tc-cable-borde {
  stroke: var(--sel);
  stroke-width: 7;
}

.tc-asa {
  fill: #ffffff;
  stroke: var(--sel);
  stroke-width: 1.5;
  pointer-events: all;
  cursor: move;
}

.tc-previa {
  opacity: 0.85;
}

/* Pines */

.tc-pin {
  position: absolute;
  width: 9px;
  height: 9px;
  margin: -4.5px 0 0 -4.5px;
  border-radius: 2px;
  cursor: crosshair;
}

.tc-dibujando .tc-pin {
  box-shadow: 0 0 0 1px var(--sel-suave);
}

.tc .tc-pin:hover,
.tc .tc-pin.tc-activo {
  background: var(--sel-suave);
  box-shadow: 0 0 0 1.5px var(--sel);
}

/* Ayuda y r\xF3tulos */

.tc-ayuda {
  position: absolute;
  left: 10px;
  bottom: 8px;
  max-width: calc(100% - 20px);
  padding: 4px 9px;
  border-radius: 6px;
  font-size: 12.5px;
  color: var(--suave);
  background: var(--barra);
  border: 1px solid var(--borde);
  pointer-events: none;
}

.tc-ayuda.tc-aviso {
  color: var(--aviso);
  font-weight: 600;
}

.tc-tip {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, calc(-100% - 12px));
  padding: 4px 9px;
  border-radius: 6px;
  font-size: 12.5px;
  white-space: nowrap;
  color: var(--tip-texto);
  background: var(--tip-fondo);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

.tc-tip.tc-abajo {
  transform: translate(-50%, 14px);
}

.tc-tip[hidden] {
  display: none;
}

.tc-solo-lectura .tc-agregar,
.tc-solo-lectura .tc-pin {
  display: none;
}

/* Mientras corre la simulaci\xF3n, los botones se presionan con el mouse */
.tc.tc-simulando .tc-comp[data-tipo="pulsador"] {
  cursor: pointer;
}

/* Protoboard (prototipo 4) */
.tc-comp.tc-protoboard {
  cursor: grab;
}

.tc .tc-pin.tc-hueco {
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
}

.tc-dibujando .tc-pin.tc-hueco {
  box-shadow: none;
}

.tc .tc-pin.tc-ocupado {
  pointer-events: none;
}

/* La tira que est\xE1 unida por dentro con el hueco que se se\xF1ala */
.tc .tc-pin.tc-tira {
  background: rgba(46, 158, 68, 0.3);
  box-shadow: 0 0 0 1.3px #2e9e44;
}

/* Los huecos donde quedar\xEDa la pieza que se est\xE1 arrastrando */
.tc .tc-pin.tc-destino {
  background: rgba(46, 158, 68, 0.6);
  box-shadow: 0 0 0 1.8px #1f7a32;
}

/* Men\xFA \xAB+ Agregar\xBB */
.tc-menu {
  position: absolute;
  z-index: 10;
  display: grid;
  min-width: 160px;
  padding: 4px;
  background: var(--barra);
  border: 1px solid var(--borde);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}

.tc-menu[hidden] {
  display: none;
}

.tc .tc-menu button {
  border: 0;
  border-radius: 6px;
  background: transparent;
  text-align: left;
  padding: 6px 10px;
}

.tc .tc-menu button:hover,
.tc .tc-menu button:focus-visible {
  background: var(--boton-hover);
}

.tc .tc-menu button[disabled] {
  color: var(--suave);
  cursor: default;
  background: transparent;
}
`;var Ft={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var V=9.6/2.54,B=57.6,ro=14.4,cn={x:ro,ancho:32.2*V},ut={x:ro+(32.2-22.2)/2*V,ancho:22.2*V,alto:11.8*V},ne={x:ut.x+5.9*V,y:B},Go=13.5*V,ae=182.4,ao={ancho:201.6,alto:86.4},no={GND:{x:ae,y:B-9.6,color:"#7a4a24"},VCC:{x:ae,y:B,color:"#d7263d"},SIG:{x:ae,y:B+9.6,color:"#f28c28"}},P=e=>Math.round(e*100)/100,Vo=e=>`rotate(${P(-e)} ${P(ne.x)} ${P(ne.y)})`;function zo(e="sg90",t=90){let o=Ft[e]||Ft.sg90,{ancho:n,alto:a}=ao,c=B-ut.alto/2,i=P(ne.x),p=ut.x+ut.ancho,l=e==="sg90",f=Object.values(no).map((v,C)=>{let y=B-4+C*4;return`<path d="M${P(p)} ${P(y)} C ${P(p+26)} ${P(y)}, ${P(ae-34)} ${P(v.y)}, ${P(ae-9)} ${P(v.y)}" fill="none" stroke="${v.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),g=Object.values(no).map(v=>`<rect x="${P(v.x-2.2)}" y="${P(v.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),x=l?`<circle cx="${P(ut.x+15*V)}" cy="${B}" r="${P(3.6*V)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${P(ut.x+9.5*V)}" cy="${P(B+2.2*V)}" r="${P(2.2*V)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${a}" viewBox="0 0 ${n} ${a}"><title>Servo ${o.nombre}</title>`+f+`<rect x="${P(ae-9)}" y="${P(B-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+g+`<rect x="${P(cn.x)}" y="${P(c+1.5)}" width="${P(cn.ancho)}" height="${P(ut.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${l?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${P(ro+2.4*V)}" cy="${B}" r="${P(1*V)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${P(ro+(32.2-2.4)*V)}" cy="${B}" r="${P(1*V)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${P(ut.x)}" y="${P(c)}" width="${P(ut.ancho)}" height="${P(ut.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${l?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+x+`<text x="${P(ut.x+15.5*V)}" y="${P(B+4.1*V)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${i}" cy="${B}" r="${P(5.2*V)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${Vo(t)}"><path d="M${i} ${P(B-3.2*V/2-1)} L${P(ne.x+Go)} ${P(B-1.1*V)} A ${P(1.1*V)} ${P(1.1*V)} 0 0 1 ${P(ne.x+Go)} ${P(B+1.1*V)} L${i} ${P(B+3.2*V/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${i}" cy="${B}" r="${P(3.4*V)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(v=>`<circle cx="${P(ne.x+Go*v)}" cy="${B}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${i}" cy="${B}" r="${P(1.3*V)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var F=3.779527559055118,Ee={ancho:72.58*F,alto:53.34*F},ie=4*F,tt=5*F,ka=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],St=ie+4.6*F,_t=Ee.ancho-.5-4.6*F,wt=60,mt=(e,t)=>({x:e,y:wt+t*tt}),Nt={M1A:mt(St,0),M1B:mt(St,1),GND_IZQ:mt(St,2),M2A:mt(St,3),M2B:mt(St,4),M4A:mt(_t,0),M4B:mt(_t,1),GND_DER:mt(_t,2),M3A:mt(_t,3),M3B:mt(_t,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+tt,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},dn={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},pn=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],A=e=>Math.round(e*100)/100,U=(e,t,o,{tam:n=6.2,ancla:a="middle",peso:c="bold",color:i="#ffffff",giro:p=0}={})=>`<text x="${A(e)}" y="${A(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${n}" font-weight="${c}" text-anchor="${a}" fill="${i}"${p?` transform="rotate(${p} ${A(e)} ${A(t)})"`:""}>${o}</text>`;function qo(e,t,o,n){let a=19.3*F,c=6.4*F,i=e-a/2,p=t-c/2,l="";for(let f=0;f<8;f++){let g=e-8.89*F+f*2.54*F;l+=`<rect x="${A(g-1.6)}" y="${A(p-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,l+=`<rect x="${A(g-1.6)}" y="${A(p+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${A(e)} ${A(t)})">`+l+`<rect x="${A(i)}" y="${A(p)}" width="${A(a)}" height="${A(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${A(i)} ${A(t-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+U(e+1.5,t+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+U(e,t-a/2-3,n,{tam:5.2})}function Bo(e,t,o,n=!0){let a=n?5.6*F:o*tt+.6*F,c=n?o*tt+.6*F:5.6*F,i=n?e-a/2:e-tt/2-.3*F,p=n?t-tt/2-.3*F:t-c/2,l="";for(let f=0;f<o;f++){let g=n?e:e+f*tt,x=n?t+f*tt:t;l+=`<circle cx="${A(g)}" cy="${A(x)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,l+=`<line x1="${A(g-4.2)}" y1="${A(x)}" x2="${A(g+4.2)}" y2="${A(x)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${A(i)}" y="${A(p)}" width="${A(a)}" height="${A(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+l}var ln=(e,t,o)=>`<circle cx="${A(e)}" cy="${A(t)}" r="${A(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${A(e)} ${A(t-o/2)} a ${A(o/2)} ${A(o/2)} 0 0 1 0 ${A(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${A(e)}" cy="${A(t)}" r="${A(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Uo(e=!0){let{ancho:t,alto:o}=Ee,n=ka.map(({y:p,xs:l})=>{let f=l[0]-4.6,g=l[l.length-1]+4.6;return`<rect x="${A(f)}" y="${A(p-4.6)}" width="${A(g-f)}" height="9.2" fill="#151515"/>`+l.map(x=>`<rect x="${A(x-1.6)}" y="${A(p-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),a=["S2","S1"].map(p=>["SIG","POS","GND"].map(l=>{let f=Nt[`${p}_${l}`];return`<rect x="${A(f.x-4.4)}" y="${A(f.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${A(f.x-1.4)}" y="${A(f.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,i=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${A(t)}" height="${A(o)}" viewBox="0 0 ${A(t)} ${A(o)}"><title>Shield de motores L293D</title><rect x="${A(ie)}" y="0.5" width="${A(t-ie-.5)}" height="${A(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+n+qo(82,86,"L293D","U1")+qo(145,86,"74HC595","U3")+qo(205,86,"L293D","U2")+ln(118,140,6.3*F)+ln(205,140,6.3*F)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${i}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+Bo(St,wt,5)+Bo(_t,wt,5)+Bo(Nt.EXT_POS.x,Nt.EXT_POS.y,2,!1)+a+`<rect x="${c-9}" y="${i-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${i-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${i-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(e?`<rect data-puente="1" x="${c-9.6}" y="${i-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${A(ie+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${A(ie+15)}" cy="169" r="5" fill="#2b2b2b"/>`+U(St+13,wt+tt/2+3,"M1",{tam:7})+U(St+13,wt+3.5*tt+3,"M2",{tam:7})+U(St+12,wt+2*tt+2.5,"GND",{tam:5})+U(_t-13,wt+tt/2+3,"M4",{tam:7})+U(_t-13,wt+3.5*tt+3,"M3",{tam:7})+U(_t-12,wt+2*tt+2.5,"GND",{tam:5})+U(Nt.EXT_POS.x+tt/2,193,"EXT_PWR",{tam:5.6})+U(Nt.EXT_POS.x,165,"+M",{tam:5})+U(Nt.EXT_GND.x,165,"GND",{tam:5})+U(c,i-8,"PWR",{tam:5.6})+U(52,16,"SERVO_2",{tam:5,ancla:"start"})+U(52,26,"SERVO_1",{tam:5,ancla:"start"})+U(26,7.4,"S",{tam:4.6})+U(35.6,7.4,"+",{tam:5})+U(45.2,7.4,"\u2212",{tam:5})+U(ie+15,156,"RESET",{tam:4.6})+U(196,162,"Motor Shield L293D",{tam:6.4})+U(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var I=3.779527559055118,Lt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},fn=Lt.voltiosRef/(Lt.mABloqueado/1e3),hn=Lt.rpmSinCarga*Lt.reduccion*2*Math.PI/60,mn=Lt.mASinCarga/1e3,Fo=(Lt.voltiosRef-mn*fn)/hn,Gs=Fo*mn/hn,Vs=Lt.tauMecanicoMs/1e3*Fo*Fo/fn;var Wo=64.2*I,Wt=22.5*I,Ho=40*I,Yo=11.2*I,st=Lt.ruedaMM*I/2,Oa={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Yo,y0:132-Wt/2}},Me=e=>Oa[e&&e.vista==="rueda"?"rueda":"eje"],gn=e=>{let t=e.y0+Wt/2;return{A:{x:e.ancho-12,y:t-4.8,color:"#d7263d"},B:{x:e.ancho-12,y:t+4.8,color:"#2b2b2b"}}};function xn(e){let t=Me(e),o=gn(t);if(e&&e.lado==="derecho")for(let n of["A","B"])o[n]={...o[n],x:t.ancho-o[n].x};return o}var b=e=>Math.round(e*100)/100,Xo=(e,t,o,{tam:n=11,color:a="#1f2328",peso:c="bold",marca:i=""}={})=>`<text${i?` ${i}="1"`:""} x="${b(e)}" y="${b(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${n}" font-weight="${c}" text-anchor="middle" fill="${a}">${o}</text>`;function Ra(e,t){let o=t+Wt/2;return`<rect x="${b(e+Ho-2)}" y="${b(o-9.5*I)}" width="${b(Wo-Ho+2)}" height="${b(19*I)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${b(e+Wo-6*I)}" y="${b(o-8*I)}" width="${b(6*I)}" height="${b(16*I)}" rx="4" fill="#2b2b2b"/><rect x="${b(e)}" y="${b(t)}" width="${b(Ho)}" height="${b(Wt)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${b(e+31.8*I-8.75*I)}" cy="${b(o)}" r="${b(1.5*I)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${b(e+31.8*I+8.75*I-6)}" cy="${b(o)}" r="${b(1.5*I)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function Da(e){let t=gn(e),o=e.x0+Wo,n=e.y0+Wt/2;return["A","B"].map((a,c)=>{let i=n+(c?3:-3);return`<path d="M${b(o)} ${b(i)} C ${b(o+20)} ${b(i)}, ${b(t[a].x-22)} ${b(t[a].y)}, ${b(t[a].x-6)} ${b(t[a].y)}" fill="none" stroke="${t[a].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${b(t[a].x-4.2)}" y="${b(t[a].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function ja(e,t){let o=2.7*I;return`<circle cx="${b(e)}" cy="${b(t)}" r="${b(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${b(e)} ${b(t)})"><path d="M${b(e-o)} ${b(t-1.8*I)} H${b(e+o)} V${b(t+1.8*I)} H${b(e-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${b(e)}" cy="${b(t)}" r="${b(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function Na(e,t){let o=[0,72,144,216,288].map(a=>`<rect x="${b(e-12)}" y="${b(t-st*.72)}" width="24" height="${b(st*.72)}" rx="6" fill="#f2c318" transform="rotate(${a} ${b(e)} ${b(t)})"/>`).join(""),n=Array.from({length:24},(a,c)=>`<rect x="${b(e-3)}" y="${b(t-st-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${b(e)} ${b(t)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${b(e)} ${b(t)})"><circle cx="${b(e)}" cy="${b(t)}" r="${b(st*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${b(st*.24)}"/>`+n+`<circle cx="${b(e)}" cy="${b(t)}" r="${b(st*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${b(e)}" cy="${b(t)}" r="${b(7*I)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${b(e-2.7*I)}" y="${b(t-1.8*I)}" width="${b(5.4*I)}" height="${b(3.6*I)}" fill="#7a5d00"/></g>`}function bn(e={}){let t=Me(e),o=e.lado==="derecho",n=t.x0+Yo,a=t.y0+Wt/2,c=o?` transform="translate(${t.ancho} 0) scale(-1 1)"`:"",i=o?t.ancho-n:n,p=Ra(t.x0,t.y0)+Da(t),l=o?t.ancho-(t.x0+26*I):t.x0+26*I,f=Xo(l,t.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return e.vista==="rueda"?(p+=Na(n,a),f+=`<line x1="${b(i-st-10)}" y1="${b(a+st+2)}" x2="${b(i+st+10)}" y2="${b(a+st+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${b(i)} ${b(a+st+20)})"></g>`+Xo(i,a+st+46,"quieto",{tam:13,marca:"data-velocidad"})):(p+=ja(n,a),f+=Xo(i,t.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${t.ancho}" height="${t.alto}" viewBox="0 0 ${t.ancho} ${t.alto}"><title>Motor TT 6 V (${e.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${p}</g>${f}</svg>`}var un=new WeakMap;function yn(e,t,o){let n=Me(t),a=n.x0+Yo,c=n.y0+Wt/2,i=o||{rpm:0,giro:0,velocidad:0},p=e.querySelector("[data-eje],[data-rueda]");p&&p.setAttribute("transform",`rotate(${b(-i.giro)} ${b(a)} ${b(c)})`);let l=e.querySelector("[data-rpm]"),f=un.get(e)||{},g=i.rpm>0!=(t.lado==="derecho");if(l){let C=Math.abs(i.rpm)<1?"0 RPM":`${Math.round(Math.abs(i.rpm))} RPM ${g?"\u27F2":"\u27F3"}`;C!==f.rpm&&(l.textContent=f.rpm=C)}let x=e.querySelector("[data-velocidad]"),v=e.querySelector("[data-flecha]");if(x&&v){let C=Math.sign(i.velocidad)*(t.lado==="derecho"?-1:1),y=Math.abs(i.velocidad),$=y<.5,L=$?"quieto":`${C>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(y)} cm/s`;L!==f.vel&&(x.textContent=f.vel=L);let O=$?0:g?-1:1,H=`${O}|${C}`;H!==f.flecha&&(f.flecha=H,v.innerHTML=$?"":`<path d="M${-40*O} -5 H${22*O} V-12 L${40*O} 0 L${22*O} 12 V5 H${-40*O} Z" fill="${C>0?"#2e9e44":"#d7263d"}"/>`)}un.set(e,f)}var $n=3.779527559055118,ce={llena:{nombre:"llena",voltios:8.4,color:"#2e9e44"},nominal:{nombre:"nominal",voltios:7.4,color:"#e8a20c"},descargada:{nombre:"descargada",voltios:6.4,color:"#d7263d"}};var Ce=356,Ko=150,Yt=10,it=10,Kt=72*$n,se=34*$n,Jo={ancho:Ce,alto:Ko},Zo={POS:{x:Ce-12,y:it+30,color:"#d7263d"},NEG:{x:Ce-12,y:it+39.6,color:"#2b2b2b"}},G=e=>Math.round(e*100)/100,io=(e,t,o,{tam:n=11,color:a="#ffffff",peso:c="bold",ancla:i="middle",marca:p=""}={})=>`<text${p?` ${p}="1"`:""} x="${G(e)}" y="${G(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${n}" font-weight="${c}" text-anchor="${i}" fill="${a}">${o}</text>`;function Qo(e="nominal"){let t=ce[e]||ce.nominal,o=Yt+Kt,n=["POS","NEG"].map((c,i)=>{let p=Zo[c],l=it+24+i*10;return`<path d="M${G(o)} ${G(l)} C ${G(o+26)} ${G(l)}, ${G(p.x-26)} ${G(p.y)}, ${G(p.x-6)} ${G(p.y)}" fill="none" stroke="${p.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${G(p.x-4.4)}" y="${G(p.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),a=["#2b2b2b","#e05a5a","#d7263d"].map((c,i)=>{let p=it+se-40+i*4,l=it+se-30+i*6;return`<path d="M${G(o)} ${G(p)} C ${G(o+18)} ${G(p)}, ${G(o+28)} ${G(l)}, ${G(o+44)} ${G(l)}" fill="none" stroke="${c}" stroke-width="1.8"/>`}).join("")+`<rect x="${G(o+44)}" y="${G(it+se-36)}" width="14" height="20" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+io(o+51,it+se-4,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${Ce}" height="${Ko}" viewBox="0 0 ${Ce} ${Ko}"><title>Bater\xEDa LiPo 2S 7,4 V (${t.nombre})</title>`+n+a+`<rect x="${Yt}" y="${it}" width="${G(Kt)}" height="${G(se)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${Yt+14}" y="${it+12}" width="${G(Kt-28)}" height="${G(se-24)}" rx="4" fill="#3f4752"/>`+io(Yt+Kt/2,it+36,"LiPo 2S \xB7 7,4 V",{tam:15})+io(Yt+Kt/2,it+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${G(Yt+Kt/2-33+c*23)}" y="${it+66}" width="20" height="12" rx="2" fill="${c<{descargada:1,nominal:2,llena:3}[e]?t.color:"#5a6370"}"/>`).join("")+io(Yt+Kt/2,it+98,`${String(t.voltios).replace(".",",")} V \xB7 ${t.nombre}`,{tam:12,color:t.color==="#2e9e44"?"#7fd88f":t.color==="#e8a20c"?"#ffd166":"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function vn(e,t,o){let n=e.querySelector("[data-voltios]");if(!n)return;let a=ce[t]||ce.nominal,c=o&&typeof o.voltios=="number"?o.voltios:a.voltios;n.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${a.nombre}`}var le={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},tr=Object.keys(le),wn={marron:"marr\xF3n",morado:"violeta"};function er(e,t){let o=[e,t];return o.some(n=>/^placa\.GND/.test(n)||/^protoboard\.[si]-/.test(n))?"negro":o.some(n=>/^placa\.(5V|3V3|VIN)$/.test(n)||/^protoboard\.[si]\+/.test(n))?"rojo":"verde"}var La=["3","5","6","9","10","11"],de={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(e){return/^\d+$/.test(e)?"D"+e:e.startsWith("GND.")?"GND"+e.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[e]||e},rotulo(e){return e==="D0"?"Pin 0 \xB7 RX del monitor serial":e==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(e)?"Pin "+e.slice(1)+(La.includes(e.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(e)?e+" \xB7 entrada anal\xF3gica":e.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[e]||e}}},J={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:e=>({1:"1",2:"2"})[e],rotulo:e=>"pata "+e,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(e,t){e.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:e=>({A:"anodo",C:"catodo"})[e],rotulo:e=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[e]||e,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(e,t){e.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:e=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[e],rotulo:e=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[e]||e,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(e,t){e.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[t.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:ao.ancho,alto:ao.alto,pines:no,svg:e=>zo(e.modelo,90)},rotulo:e=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[e]||e,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Ft).map(([e,t])=>[e,`${t.nombre} (engranajes de ${t.engranajes})`])},aplicar(e,t){let o=new DOMParser().parseFromString(zo(t.modelo,90),"image/svg+xml").documentElement;e.replaceChildren(...[...o.childNodes].map(n=>e.ownerDocument.importNode(n,!0)))},mostrar(e,t){let o=e.querySelector("[data-brazo]");o&&o.setAttribute("transform",Vo(t&&typeof t.angulo=="number"?t.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,props:{puentePWR:!0},dibujo:{ancho:Ee.ancho,alto:Ee.alto,pines:Nt,svg:e=>Uo(e.puentePWR!==!1)},rotulo:e=>dn[e]||e,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(e,t){let o=new DOMParser().parseFromString(Uo(t.puentePWR!==!1),"image/svg+xml").documentElement;e.replaceChildren(...[...o.childNodes].map(n=>e.ownerDocument.importNode(n,!0)))},mostrar(e,t){let o=e.querySelector("[data-led-pwr]"),n=t&&t.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==n&&o.setAttribute("fill",n)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:e=>({...Me(e),pines:xn(e)}),svg:e=>bn(e)},rotulo:e=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[e]||e,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(e,t,o){yn(e,o||{},t)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:Jo.ancho,alto:Jo.alto,pines:Zo,svg:e=>Qo(e.carga)},rotulo:e=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia"})[e]||e,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(ce).map(([e,t])=>[e,`${t.nombre} (${String(t.voltios).replace(".",",")} V)`])}],aplicar(e,t){let o=new DOMParser().parseFromString(Qo(t.carga),"image/svg+xml").documentElement;e.replaceChildren(...[...o.childNodes].map(n=>e.ownerDocument.importNode(n,!0)))},mostrar(e,t,o){vn(e,(o||{}).carga,t)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:e=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[e],rotulo:e=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[e]||e,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(e,t){e.min=0,e.max=100,e.value=Math.round((Number(t.posicion)||0)*100)}}};var so=["a","b","c","d","e"],Sn=["f","g","h","i","j"],et={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},_n=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],At={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Pe=e=>14.4+(e-1)*9.6,Ta=e=>e>=2&&(e-1)%6!==0,or=new Map;function ke(e="media"){if(or.has(e))return or.get(e);let t=At[e]||At.media,o=[];or.set(e,o);for(let n=1;n<=t.columnas;n++){for(let a of so)o.push({nombre:a+n,x:Pe(n),y:et[a],tira:"arriba"+n});for(let a of Sn)o.push({nombre:a+n,x:Pe(n),y:et[a],tira:"abajo"+n});for(let[a]of _n)Ta(n)&&o.push({nombre:a+n,x:Pe(n),y:et[a],tira:a})}return o}var rr=new Map;function An(e="media"){if(rr.has(e))return rr.get(e);let t=new Map;rr.set(e,t);for(let o of ke(e))t.has(o.tira)||t.set(o.tira,[]),t.get(o.tira).push(o.nombre);return t}function nr(e){let t=/^([si][+-])\d+$/.exec(e);if(t)return t[1];let o=/^([a-j])(\d+)$/.exec(e);return o?(so.includes(o[1])?"arriba":"abajo")+o[2]:null}function En(e){let t=/^([si])([+-])(\d+)$/.exec(e);if(t){let c=t[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${t[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(e);if(!o)return"Protoboard";let[n,a]=so.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${n}${o[2]}\u2013${a}${o[2]}`}function Mn(e="media"){let t=At[e]||At.media,{ancho:o,alto:n,columnas:a}=t,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${n}" viewBox="0 0 ${o} ${n}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${n-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(et.e+et.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let i=(l,f)=>c.push(`<line x1="${14.4-6}" y1="${l}" x2="${o-14.4+6}" y2="${l}" stroke="${f}" stroke-width="1.2"/>`);i(et["s+"]-5.5,"#d7263d"),i(et["s-"]+5.5,"#2f6fde"),i(et["i-"]-5.5,"#2f6fde"),i(et["i+"]+5.5,"#d7263d");let p=(l,f,g,x="#8a867a",v=5.5)=>c.push(`<text x="${l}" y="${f}" font-family="sans-serif" font-size="${v}" font-weight="700" fill="${x}" text-anchor="middle">${g}</text>`);for(let[l,,f]of _n){let g=f==="+"?"#d7263d":"#2f6fde";p(5.2,et[l]+2.2,f,g,7),p(o-5.2,et[l]+2.2,f,g,7)}for(let l=1;l<=a;l++)(l===1||l%5===0)&&(p(Pe(l),et.a-6.2,l),p(Pe(l),et.j+10.4,l));for(let l of[...so,...Sn])p(5.2,et[l]+2,l),p(o-5.2,et[l]+2,l);for(let l of ke(e))c.push(`<rect x="${(l.x-1.7).toFixed(2)}" y="${(l.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function Cn(e,{tipo:t="media",ocupados:o=new Set,tolerancia:n=3.5}={}){if(!e.length)return null;let a=ke(t),c=(x,v)=>{let C=null,y=1/0;for(let $ of a){let L=Math.hypot($.x-x,$.y-v);L<y&&(y=L,C=$)}return{hueco:C,distancia:y}},i=c(e[0].x,e[0].y);if(i.distancia>9.6)return null;let p=i.hueco.x-e[0].x,l=i.hueco.y-e[0].y,f={},g=new Set;for(let x of e){let{hueco:v,distancia:C}=c(x.x+p,x.y+l);if(C>n||o.has(v.nombre)||g.has(v.nombre))return null;f[x.nombre]=v.nombre,g.add(v.nombre)}return{dx:p,dy:l,en:f}}var Ia=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Pn(e,{presionados:t=new Set,conduccion:o=!1}={}){let n=new Map,a=i=>{for(n.has(i)||n.set(i,i);n.get(i)!==i;)n.set(i,n.get(n.get(i))),i=n.get(i);return i},c=(i,p)=>n.set(a(i),a(p));for(let i of Ia)i.forEach(p=>c("placa."+i[0],"placa."+p));for(let i of e.cables)c(i.de,i.a);if(e.protoboard){for(let i of An(e.protoboard.tipo).values())i.forEach(p=>c("protoboard."+i[0],"protoboard."+p));for(let i of e.componentes)if(i.en)for(let[p,l]of Object.entries(i.en))c(i.id+"."+p,l)}for(let i of e.componentes)if(i.tipo==="shield_l293d"){for(let[p,l]of pn)c(i.id+"."+p,l);(!i.props||i.props.puentePWR!==!1)&&c(i.id+".EXT_POS","placa.VIN")}else i.tipo==="pulsador"?(c(i.id+".1i",i.id+".1d"),c(i.id+".2i",i.id+".2d"),t.has(i.id)&&c(i.id+".1i",i.id+".2i")):o&&i.tipo==="resistencia"?c(i.id+".1",i.id+".2"):o&&i.tipo==="potenciometro"&&(c(i.id+".GND",i.id+".SIG"),c(i.id+".SIG",i.id+".VCC"));return a}var On=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Ga=Object.fromEntries(On.flatMap(e=>Object.entries(e.pines).map(([t,o])=>[t,{ref:e.ref,pad:o}]))),Va={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},za=["GND","+5V","+3V3","VIN"],kn=e=>e>=1e3?+(e/1e3).toFixed(2)+"k":String(e),co={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:e=>kn(Number(e.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:e=>"LED "+(e.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:e=>"Servo "+(Ft[e.modelo]||Ft.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:e=>kn(Number(e.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},ot=e=>'"'+String(e).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function qa(e){let o=[2166136261,16777619,2654435769,2246822507].map(n=>{let a=n>>>0;for(let c=0;c<e.length;c++)a=Math.imul(a^e.charCodeAt(c),16777619)>>>0;return a.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Rn(e,{nombre:t="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:n="TecnoCircuito"}={}){let a=e.componentes.filter(y=>co[y.tipo]).map(y=>({...y})),c={};for(let y of a){let $=co[y.tipo];c[$.ref]=(c[$.ref]||0)+1,y.ref=$.ref+c[$.ref]}let i=Pn(e),p=new Map,l=(y,$,L,O)=>{let H=i(y);p.has(H)||p.set(H,{pads:new Map,uno:new Set});let ct=p.get(H);ct.pads.set($+" "+L,{ref:$,pad:L,pinUno:O}),O&&ct.uno.add(Va[O]||O)},f=new Set(e.cables.flatMap(y=>[y.de,y.a]));for(let[y,{ref:$,pad:L}]of Object.entries(Ga))f.has("placa."+y)&&l("placa."+y,$,L,y);for(let y of a)for(let[$,L]of Object.entries(co[y.tipo].pads))l(y.id+"."+$,y.ref,L,null);let g=(y,$)=>y.localeCompare($,"en",{numeric:!0}),x=[...p.values()].filter(y=>y.pads.size>=2).map(y=>{let $=[...y.pads.values()].sort((O,H)=>g(O.ref,H.ref)||g(O.pad,H.pad));return{nombre:za.find(O=>y.uno.has(O))||[...y.uno].sort(g)[0]||`Net-(${$[0].ref}-Pad${$[0].pad})`,pads:$}}).sort((y,$)=>g(y.nombre,$.nombre)),v=[],C=(y,$,L,O,H,ct,Ct)=>v.push("		(comp",`			(ref ${ot(y)})`,`			(value ${ot($)})`,`			(footprint ${ot(L)})`,`			(libsource (lib ${ot(O)}) (part ${ot(H)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${ot(ct)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${ot(Ct)})`,"		)");v.push("(export",'	(version "E")',"	(design",`		(source ${ot(t)})`,`		(date ${ot(o)})`,`		(tool ${ot(n)})`,"	)"),v.push("	(components");for(let y of On)C(y.ref,y.valor,y.huella,"Connector_Generic",y.parte,"placa",y.uuid);for(let y of a){let $=co[y.tipo];C(y.ref,$.valor(y.props||{}),$.huella,$.lib,$.parte,y.id,qa(t+"/"+y.id))}return v.push("	)","	(nets"),x.forEach((y,$)=>{v.push("		(net",`			(code ${ot($+1)})`,`			(name ${ot(y.nombre)})`,'			(class "Default")');for(let L of y.pads){let O=L.pinUno?` (pinfunction ${ot(L.pinUno)})`:"";v.push(`			(node (ref ${ot(L.ref)}) (pin ${ot(L.pad)})${O} (pintype "passive"))`)}v.push("		)")}),v.push("	)",")"),v.join(`
`)+`
`}var Dn="http://www.w3.org/2000/svg",Ba="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Ua=280,jn=5e3,Ha=4,Nn=8,Xa=9.6,Ln=.4,Fa=5,Et=e=>JSON.parse(JSON.stringify(e)),W=e=>Math.round(e*100)/100,Oe=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),ar=e=>le[e]||(/^#[0-9a-f]{3,8}$/i.test(e||"")?e:le.verde);function Vn(e,t={}){if(!(e instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=t.placa||"uno";if(!de[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let n=!!t.soloLectura,a=typeof t.alEvento=="function"?t.alEvento:null,c=[],i=Wa(t.circuito,o),p=document.createElement("div");p.className="tecnocircuito",e.appendChild(p);let l=p.attachShadow({mode:"open"});l.innerHTML=`<style>${sn}</style>
<div class="tc">
  <div class="tc-barra">
    <div class="tc-grupo tc-agregar">
      <button type="button" data-accion="menu" aria-haspopup="menu" aria-expanded="false">+ Agregar</button>
    </div>
    <div class="tc-sel"></div>
    <div class="tc-grupo">
      <button type="button" data-accion="alejar" title="Alejar" aria-label="Alejar">\u2212</button>
      <button type="button" data-accion="encuadrar" title="Ver todo el circuito">Ver todo</button>
      <button type="button" data-accion="acercar" title="Acercar" aria-label="Acercar">+</button>
    </div>
  </div>
  <div class="tc-area" tabindex="0">
    <div class="tc-mundo">
      <div class="tc-capa-comp"></div>
      <svg class="tc-capa-cables"><g transform="translate(${jn} ${jn})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
      <div class="tc-capa-pines"></div>
    </div>
    <div class="tc-tip" hidden></div>
    <div class="tc-ayuda" aria-live="polite"></div>
  </div>
  <div class="tc-menu" role="menu" aria-label="Agregar una pieza" hidden>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="led">LED</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="resistencia">Resistencia</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="potenciometro">Potenci\xF3metro</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="pulsador">Bot\xF3n</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="servo">Servo</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="motor_tt">Motor TT</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="shield_l293d">Shield L293D</button>
    <button type="button" role="menuitem" data-accion="agregar" data-tipo="bateria_lipo">Bater\xEDa LiPo 2S</button>
    <button type="button" role="menuitem" data-accion="protoboard">Protoboard</button>
  </div>
</div>`;let f=r=>l.querySelector(r),g=f(".tc"),x=f(".tc-barra"),v=f(".tc-menu"),C=x.querySelector('[data-accion="menu"]'),y=f(".tc-sel"),$=f(".tc-area"),L=f(".tc-mundo"),O=f(".tc-capa-comp"),H=f(".tc-capa-pines"),ct=f(".tc-cables"),Ct=f(".tc-asas"),[Pt,xt]=f(".tc-previa").children,M=f(".tc-ayuda"),q=f(".tc-tip"),R={px:0,py:0,escala:1.5},j=new Map,Tt=new Map,E=null,D=null,k=null,De=null,lo=null,cr=!1,po=!1,pe=!1,je=null,uo=!1,Z={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},fo=new Set,lr=[],dr=[],ho="",Q=r=>i.componentes.find(s=>s.id===r),Ne=r=>r==="protoboard"?i.protoboard:Q(r),Jt=r=>!!(r&&J[r.tipo]&&J[r.tipo].montada),Le=r=>r==="placa"||Jt(Q(r))?{x:0,y:0,rot:0}:Ne(r);function Te(r,s,d){let u=r==="placa"?de[o]:J[s],h=document.createElement("div");h.className="tc-comp"+(r==="placa"?" tc-placa":""),h.dataset.id=r,s&&(h.dataset.tipo=s);let m;if(u&&u.dibujo){let _=document.createElement("template");_.innerHTML=u.dibujo.svg(d),m=_.content.firstElementChild}else u?(m=document.createElement(u.etiqueta),u.aplicar&&u.aplicar(m,d),u.perilla&&m.addEventListener("input",()=>Mr(r,Number(m.value)/100))):(m=document.createElement("div"),m.className="tc-desconocido",m.textContent=`\xBF${s}?`,m.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(m);let w=j.get("placa");u&&u.montada&&w?O.insertBefore(h,w.div.nextSibling):O.appendChild(h);let S={id:r,def:u,div:h,el:m,w:64,h:40,pines:new Map,lista:!1};return j.set(r,S),Promise.resolve(m.updateComplete).then(()=>{if(j.get(r)===S){if(u&&u.dibujo){let _=u.dibujo.marco?u.dibujo.marco(d):u.dibujo;Object.assign(S,{w:_.ancho,h:_.alto});for(let[N,z]of Object.entries(_.pines)){let Y=document.createElement("div");Y.className="tc-pin",Y.dataset.ref=`${r}.${N}`,H.appendChild(Y),S.pines.set(N,{px:z.x,py:z.y,div:Y})}}else if(u){Object.assign(S,Kn(m));for(let _ of m.pinInfo||[]){let N=u.nombrePin(_.name);if(!N)continue;let z=document.createElement("div");z.className="tc-pin",z.dataset.ref=`${r}.${N}`,H.appendChild(z),S.pines.set(N,{px:_.x,py:_.y,div:z})}}S.lista=!0,Zt(S),gr(S)}})}function pr(){let r=i.protoboard.tipo,s=At[r]||At.media,d=document.createElement("div");d.className="tc-comp tc-protoboard",d.dataset.id="protoboard",d.dataset.tipo="protoboard";let u=document.createElement("template");u.innerHTML=Mn(r);let h=u.content.firstElementChild;d.appendChild(h);let m=j.get("placa");O.insertBefore(d,m?m.div.nextSibling:O.firstChild);let w={id:"protoboard",def:{protoboard:!0},div:d,el:h,w:s.ancho,h:s.alto,pines:new Map,lista:!0};for(let S of ke(r)){let _=document.createElement("div");_.className="tc-pin tc-hueco",_.dataset.ref="protoboard."+S.nombre,_.style.left=S.x+"px",_.style.top=S.y+"px",d.appendChild(_),w.pines.set(S.nombre,{px:S.x,py:S.y,div:_})}return j.set("protoboard",w),Zt(w),Ge(),Promise.resolve()}function Fn(){if(i.protoboard)return;let r=wo();i.protoboard={tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},pr(),Ie(),rt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),lt({tipo:"comp",id:"protoboard"}),pe||he(),nt()}function Ie(){let r=v.querySelector('[data-accion="protoboard"]');r.disabled=!!i.protoboard,r.title=i.protoboard?"Ya hay una protoboard":"";for(let[s,d]of Object.entries(J)){if(!d.montada)continue;let u=v.querySelector(`[data-tipo="${s}"]`),h=i.componentes.some(m=>m.tipo===s);u&&Object.assign(u,{disabled:h,title:h?`Ya hay una ${d.nombre}`:""})}}function Wn(r){let s=j.get(r.id),d=i.protoboard;return!s||!s.lista||!d||!s.pines.size?null:[...s.pines].map(([u,h])=>{let m=go(s,r,h);return{nombre:u,x:m.x-d.x,y:m.y-d.y}})}function ur(r){let s=new Set;for(let d of i.componentes)if(d!==r&&d.en)for(let u of Object.values(d.en))s.add(u.slice(11));return s}function fr(r){let s=Wn(r);return s?Cn(s,{tipo:i.protoboard.tipo,ocupados:ur(r)}):null}function mo(r){if(Jt(r))return!1;let s=fr(r);return s?(r.x=W(r.x+s.dx),r.y=W(r.y+s.dy),r.en=Object.fromEntries(Object.entries(s.en).map(([d,u])=>[d,"protoboard."+u]))):delete r.en,Zt(j.get(r.id)),Ge(),bt(),!!s}let ue=[];function Yn(r){hr();let s=i.protoboard&&fr(r),d=j.get("protoboard");!s||!d||(ue=Object.values(s.en).map(u=>d.pines.get(u).div),ue.forEach(u=>u.classList.add("tc-destino")))}function hr(){ue.forEach(r=>r.classList.remove("tc-destino")),ue=[]}function Ge(){let r=j.get("protoboard");if(!r)return;let s=ur(null);for(let[d,u]of r.pines)u.div.classList.toggle("tc-ocupado",s.has(d))}let Ve=[];function mr(r){Ve.forEach(w=>w.classList.remove("tc-tira")),Ve=[];let s=j.get("protoboard");if(!r||!s)return;let[d,u]=ze(r),h=d==="protoboard"?u:null;if(!h){let w=Q(d);w&&w.en&&w.en[u]&&(h=w.en[u].slice(11))}if(!h)return;let m=nr(h);for(let[w,S]of s.pines)nr(w)===m&&(S.div.classList.add("tc-tira"),Ve.push(S.div))}function gr(r){if(r.id==="placa")for(let s of["ledPower","led13","ledTX","ledRX"])r.el[s]=!!Z.placa[s];else if(r.def===J.led){let s=Number(Z.leds[r.id])||0;r.el.value=s>.005,r.el.brightness=s,r.div.classList.toggle("tc-quemado",Z.quemados.includes(r.id))}else if(r.def&&r.def.mostrar){let s=Z.simulando&&(Z.piezas[r.id]||Z.servos[r.id])||null;r.def.mostrar(r.el,s,(Q(r.id)||{}).props)}}function Kn(r){let s=r.shadowRoot&&r.shadowRoot.querySelector("svg"),d=s&&In(s.getAttribute("width")),u=s&&In(s.getAttribute("height"));return d&&u?{w:d,h:u}:{w:r.offsetWidth||64,h:r.offsetHeight||40}}function Zt(r){if(!r)return;let s=Le(r.id);if(s&&(Object.assign(r.div.style,{left:s.x+"px",top:s.y+"px",width:r.w+"px",height:r.h+"px",transform:s.rot?`rotate(${s.rot}deg)`:""}),r.id!=="protoboard"))for(let d of r.pines.values()){let u=go(r,s,d);d.div.style.left=u.x+"px",d.div.style.top=u.y+"px"}}function go(r,s,d){let u=((s.rot||0)%360+360)%360;if(!u)return{x:s.x+d.px,y:s.y+d.py};let h=u*Math.PI/180,m=Math.round(Math.cos(h)*1e9)/1e9,w=Math.round(Math.sin(h)*1e9)/1e9,S=r.w/2,_=r.h/2,N=d.px-S,z=d.py-_;return{x:W(s.x+S+N*m-z*w),y:W(s.y+_+N*w+z*m)}}function ze(r){let s=r.indexOf(".");return s>0?[r.slice(0,s),r.slice(s+1)]:[r,""]}function kt(r){let[s,d]=ze(r),u=j.get(s);if(!u||!u.lista)return null;let h=Le(s),m=u.pines.get(d);return m?go(u,h,m):u.def?null:{x:h.x+u.w/2,y:h.y+u.h/2}}function Jn(r){let[s,d]=ze(r),u=j.get(s);return u&&u.pines.get(d)}function qe(r){let s=kt(r.de),d=kt(r.a);return!s||!d?null:[s,...(r.puntos||[]).map(([u,h])=>({x:u,y:h})),d]}function It(r,s,d){let u=document.createElementNS(Dn,r);for(let h in s)u.setAttribute(h,s[h]);return d.appendChild(u),u}function bt(){for(let[r,s]of Tt)i.cables.includes(r)||(s.g.remove(),s.asas.forEach(d=>d.remove()),Tt.delete(r));i.cables.forEach((r,s)=>{let d=Tt.get(r);if(!d){let _=It("g",{class:"tc-cable"},ct);d={g:_,borde:It("path",{class:"tc-cable-borde"},_),linea:It("path",{class:"tc-cable-linea"},_),p0:It("circle",{class:"tc-punta",r:2.4},_),p1:It("circle",{class:"tc-punta",r:2.4},_),toque:It("path",{class:"tc-cable-toque"},_),asas:[]},Tt.set(r,d)}let u=qe(r);if(d.g.style.display=u?"":"none",!u)return;let h=ir(u),m=ar(r.color);for(let _ of[d.borde,d.linea,d.toque])_.setAttribute("d",h);d.linea.setAttribute("stroke",m),d.toque.dataset.i=s,xr(d.p0,u[0],m),xr(d.p1,u[u.length-1],m);let w=!!(E&&E.tipo==="cable"&&E.cable===r);d.g.classList.toggle("tc-seleccionado",w),w&&ct.lastChild!==d.g&&ct.appendChild(d.g);let S=w?(r.puntos||[]).length:0;for(;d.asas.length>S;)d.asas.pop().remove();for(;d.asas.length<S;)d.asas.push(It("circle",{class:"tc-asa",r:3.6},Ct));d.asas.forEach((_,N)=>{_.setAttribute("cx",r.puntos[N][0]),_.setAttribute("cy",r.puntos[N][1]),_.dataset.i=s,_.dataset.p=N})})}function xr(r,s,d){r.setAttribute("cx",s.x),r.setAttribute("cy",s.y),r.setAttribute("fill",d)}function Qt(){let r=D&&kt(D.de);if(!r){Pt.setAttribute("d",""),xt.setAttribute("d","");return}let s=D.puntos.map(w=>({...w})),d=s.length?s[s.length-1]:r,u=D.cursor?Be(D.cursor,d):d,h=D.destino&&kt(D.destino);h&&(u=h,yr(s,r,h));let m=ir([r,...s,u]);Pt.setAttribute("d",m),xt.setAttribute("d",m),xt.setAttribute("stroke",ar(br()))}function br(){return D.color||er(D.de,D.destino||"")}function Be(r,s){let d=Nn/R.escala;return{x:W(Math.abs(r.x-s.x)<d?s.x:r.x),y:W(Math.abs(r.y-s.y)<d?s.y:r.y)}}function yr(r,s,d){if(!r.length)return;let u=Nn/R.escala,h=r[r.length-1],m=r.length>1?r[r.length-2]:s;Math.abs(h.y-d.y)<u&&h.y!==m.y&&(h.y=d.y),Math.abs(h.x-d.x)<u&&h.x!==m.x&&(h.x=d.x)}function Zn(r){lt(null),D={de:r,puntos:[],cursor:null,destino:null,color:null},g.classList.add("tc-dibujando"),wr(r,!0),Qt(),Ue(),ft()}function xo(){D&&(wr(D.de,!1),D=null,g.classList.remove("tc-dibujando"),Qt(),Ue(),ft())}function $r(r){if(le[r]){if(D)D.color=r,Qt();else if(E&&E.tipo==="cable"){if(E.cable.color===r)return;E.cable.color=r,bt(),nt()}else return;Ue()}}function vr(r){let s=D;if(!s)return;if(r===s.de)return xo();let d=kt(s.de),u=kt(r);if(d&&u&&yr(s.puntos,d,u),xo(),i.cables.some(m=>m.de===s.de&&m.a===r||m.de===r&&m.a===s.de)){sa("Esos dos pines ya est\xE1n unidos.");return}let h={de:s.de,a:r,color:s.color||er(s.de,r)};s.puntos.length&&(h.puntos=s.puntos.map(m=>[W(m.x),W(m.y)])),i.cables.push(h),rt("cable_agregado",{de:h.de,a:h.a}),lt({tipo:"cable",cable:h}),nt()}function Qn(r){let s=D.puntos.length?D.puntos[D.puntos.length-1]:kt(D.de);D.puntos.push(s?Be(r,s):r),Qt(),ft()}function ta(){!D||!D.puntos.length||(D.puntos.pop(),Qt(),ft())}function wr(r,s){let d=Jn(r);d&&d.div.classList.toggle("tc-activo",s)}function bo(r){i.cables=i.cables.filter(s=>s!==r),rt("cable_quitado",{de:r.de,a:r.a})}function lt(r){E=r;for(let s of j.values())s.div.classList.toggle("tc-seleccionado",!!r&&r.tipo==="comp"&&r.id===s.id);bt(),Ue(),ft()}function Ue(){if(y.textContent="",n||!E&&!D)return;let r=d=>y.insertAdjacentHTML("beforeend",d),s=d=>tr.forEach((u,h)=>{let m=le[u],w=wn[u]||u;r(`<button type="button" class="tc-muestra${d===u?" tc-activa":""}" data-accion="color" data-color="${u}" title="${h} \xB7 ${w}" aria-label="Cable ${w} (tecla ${h})" style="background:${m};color:${Ja(m)}">${h}</button>`)});if(D){r('<span class="tc-etiqueta">Cable nuevo</span>'),s(br());return}if(E.tipo==="cable")r('<span class="tc-etiqueta">Cable</span>'),s(E.cable.color);else if(E.id==="protoboard")r(`<span class="tc-etiqueta">${(At[i.protoboard.tipo]||At.media).nombre}</span>`);else{let d=Q(E.id),u=J[d.tipo],h=j.get(d.id);r(`<span class="tc-etiqueta">${u?u.nombre:"Pieza desconocida"}</span>`);for(let m of u?u.campos||(u.campo?[u.campo]:[]):[]){let w=String(d.props[m.prop]),S=m.opciones.map(([_,N])=>`<option value="${_}"${w===String(_)?" selected":""}>${N}</option>`).join("");r(`<label class="tc-campo">${m.etiqueta} <select data-prop="${m.prop}">${S}</select></label>`)}if(u&&u.perilla){let m=Math.round((Number(d.props[u.perilla.prop])||0)*100);r(`<label class="tc-campo">${u.perilla.etiqueta} <input type="range" min="0" max="100" value="${m}" data-perilla aria-label="${u.perilla.etiqueta} del potenci\xF3metro"></label>`)}if(d.tipo==="led"){let m=h&&h.el.value?" checked":"";r(`<label class="tc-check"><input type="checkbox" data-accion="encender"${m}> Ver encendido</label>`)}Jt(d)||r('<button type="button" data-accion="girar">Girar</button>')}r('<button type="button" data-accion="borrar">Borrar</button>')}function ea(r){let s=J[r];if(!s)return;let d=1;for(;Q(s.prefijo+d);)d++;let u=s.prefijo+d,h=($.clientWidth/2-R.px)/R.escala,m=($.clientHeight/2-R.py)/R.escala,w=i.componentes.length%4*14,S={id:u,tipo:r,x:s.montada?0:Math.round(h-20+w),y:s.montada?0:Math.round(m-20+w),rot:0,props:Et(s.props)};i.componentes.push(S),Te(u,r,S.props).then(()=>{i.protoboard&&Q(u)===S&&mo(S)&&(rt("componente_cambiado",{id:u,x:S.x,y:S.y,en:Et(S.en)}),nt())}),rt("componente_agregado",{id:u,tipo:r}),lt({tipo:"comp",id:u}),nt()}function oa(r){let s=j.get(r.id);if(s){s.div.remove();for(let d of s.pines.values())d.div.remove();j.delete(r.id)}Te(r.id,r.tipo,r.props).then(()=>{bt(),E&&E.id===r.id&&lt({tipo:"comp",id:r.id})})}function Sr(){if(!E||E.tipo!=="comp"||E.id==="protoboard")return;let r=Q(E.id);Jt(r)||(r.rot=((r.rot||0)+90)%360,Zt(j.get(r.id)),i.protoboard&&mo(r),bt(),rt("componente_cambiado",{id:r.id,rot:r.rot,en:r.en?Et(r.en):null}),nt())}function _r(){if(E){if(E.tipo==="cable")bo(E.cable);else if(E.id==="protoboard"){i.cables.filter(s=>s.de.startsWith("protoboard.")||s.a.startsWith("protoboard.")).forEach(s=>bo(s));for(let s of i.componentes)delete s.en;i.protoboard=null;let r=j.get("protoboard");r&&(r.div.remove(),j.delete("protoboard")),Ve=[],ue=[],Ie(),rt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let r=Q(E.id),s=j.get(E.id);if(i.cables.filter(d=>d.de.startsWith(r.id+".")||d.a.startsWith(r.id+".")).forEach(d=>bo(d)),i.componentes=i.componentes.filter(d=>d!==r),s){s.div.remove();for(let d of s.pines.values())d.div.remove();j.delete(r.id)}rt("componente_quitado",{id:r.id,tipo:r.tipo}),Ge()}We(),lt(null),nt()}}function He(r){if(v.hidden=!r,C.setAttribute("aria-expanded",String(r)),!r)return;Ie();let s=C.getBoundingClientRect(),d=g.getBoundingClientRect();v.style.left=s.left-d.left+"px",v.style.top=s.bottom-d.top+4+"px",v.querySelector("button:not([disabled])").focus()}v.addEventListener("click",r=>{let s=r.target.closest("button[data-accion]");s&&(He(!1),Ar(s))}),v.addEventListener("keydown",r=>{r.key==="Escape"&&(r.stopPropagation(),He(!1),C.focus())}),l.addEventListener("pointerdown",r=>{!v.hidden&&!r.target.closest(".tc-menu")&&r.target!==C&&He(!1)}),x.addEventListener("click",r=>{let s=r.target.closest("button[data-accion]");if(s){if(s.dataset.accion==="menu")return He(v.hidden);Ar(s)}});function Ar(r){let s=r.dataset.accion;if(s==="acercar")return vo(1.25);if(s==="alejar")return vo(.8);if(s==="encuadrar")return pe=!1,he();n||(s==="agregar"?ea(r.dataset.tipo):s==="protoboard"?Fn():s==="girar"?Sr():s==="borrar"?_r():s==="color"&&($r(r.dataset.color),$.focus({preventScroll:!0})))}x.addEventListener("change",r=>{if(n||!E||E.tipo!=="comp")return;let s=Q(E.id),d=j.get(E.id),u=J[s.tipo];if(r.target.dataset.accion==="encender"){d.el.value=r.target.checked;return}let h=r.target.dataset.prop;if(!h||!u)return;let m=typeof u.props[h],w=m==="number"?Number(r.target.value):m==="boolean"?r.target.value==="true":r.target.value;s.props={...s.props,[h]:w},u.dibujo&&u.dibujo.marco?oa(s):u.aplicar(d.el,s.props),rt("componente_cambiado",{id:s.id,props:Et(s.props)}),nt()}),x.addEventListener("input",r=>{if(n||!E||E.tipo!=="comp"||!("perilla"in r.target.dataset))return;let s=j.get(E.id);Mr(E.id,Number(r.target.value)/100),s&&J.potenciometro.aplicar(s.el,Q(E.id).props)});function fe(r,s,d){let u=j.get(r);if(u&&(u.el.pressed=s),s)fo.add(r);else if(!fo.delete(r))return;for(let h of lr)try{h(r,s)}catch(m){console.error(m)}!s&&d!==void 0&&rt("boton_pulsado",{id:r,ms:Math.round(d)})}let Er=new Map;function Mr(r,s){let d=Q(r),u=j.get(r);if(!d)return;let h=J[d.tipo];if(n)return u&&h.aplicar(u.el,d.props);let m=Math.max(0,Math.min(1,Math.round(s*100)/100));if(m===d.props[h.perilla.prop])return;d.props={...d.props,[h.perilla.prop]:m};let w=E&&E.tipo==="comp"&&E.id===r&&y.querySelector("[data-perilla]");w&&Number(w.value)!==Math.round(m*100)&&(w.value=Math.round(m*100)),nt(),clearTimeout(Er.get(r)),Er.set(r,setTimeout(()=>rt("componente_cambiado",{id:r,props:Et(d.props)}),400))}function yo(r){let s=$.getBoundingClientRect();return{x:(r.clientX-s.left-R.px)/R.escala,y:(r.clientY-s.top-R.py)/R.escala}}function $o(r){try{$.setPointerCapture(r.pointerId)}catch{}}function Xe(r,s={}){k={tipo:"paneo",x0:r.clientX,y0:r.clientY,px0:R.px,py0:R.py,movido:!1,...s},$o(r)}$.addEventListener("pointerdown",r=>{if(r.pointerType==="mouse"&&r.button!==0)return;$.focus({preventScroll:!0}),We();let s=r.target,d=yo(r);if(n)return Xe(r);let u=s.closest(".tc-pin");if(u){if(r.preventDefault(),D)return vr(u.dataset.ref);Zn(u.dataset.ref),k={tipo:"pin",ref:u.dataset.ref,x0:r.clientX,y0:r.clientY,movido:!1};return}if(D)return Xe(r,{punto:d});let h=s.closest(".tc-asa");if(h)return k={tipo:"asa",cable:i.cables[+h.dataset.i],k:+h.dataset.p,x0:r.clientX,y0:r.clientY,movido:!1},$o(r);let m=s.closest(".tc-cable-toque");if(m)return lt({tipo:"cable",cable:i.cables[+m.dataset.i]});let w=s.closest(".tc-comp");if(w&&w.dataset.id!=="placa"){let S=w.dataset.id,_=Ne(S);if(_.tipo==="pulsador"&&(r.preventDefault(),Z.simulando)){fe(S,!0),k={tipo:"pulsar",id:S,x0:r.clientX,y0:r.clientY,movido:!1,desde:performance.now()};return}return lt({tipo:"comp",id:S}),Jt(_)?Xe(r):J[_.tipo]&&J[_.tipo].perilla&&r.composedPath().some(Qa)?void 0:(k={tipo:"mover",id:S,dx:d.x-_.x,dy:d.y-_.y,x0:r.clientX,y0:r.clientY,movido:!1},$o(r))}lt(null),Xe(r)}),$.addEventListener("pointermove",r=>{let s=yo(r);if(k&&k.tipo==="pulsar"&&!(r.target.closest&&r.target.closest(`.tc-comp[data-id="${k.id}"]`))){let d=k;k=null,fe(d.id,!1,performance.now()-d.desde)}if(k){if(!k.movido&&Math.hypot(r.clientX-k.x0,r.clientY-k.y0)>Ha&&(k.movido=!0),k.movido&&k.tipo==="mover"){let d=Ne(k.id),u=Math.round(s.x-k.dx),h=Math.round(s.y-k.dy);if(k.id==="protoboard")for(let m of i.componentes)m.en&&(m.x=W(m.x+u-d.x),m.y=W(m.y+h-d.y),Zt(j.get(m.id)));d.x=u,d.y=h,Zt(j.get(k.id)),k.id!=="protoboard"&&i.protoboard&&Yn(d),bt()}else if(k.movido&&k.tipo==="paneo")pe=!0,R.px=k.px0+r.clientX-k.x0,R.py=k.py0+r.clientY-k.y0,$.classList.add("tc-paneando"),Fe();else if(k.movido&&k.tipo==="asa"){let d=qe(k.cable),u=Be(s,d[k.k]);u=Be(u,d[k.k+2]),k.cable.puntos[k.k]=[u.x,u.y],bt()}}if(D){let d=r.target.closest&&r.target.closest(".tc-pin");D.cursor=s,D.destino=d&&d.dataset.ref!==D.de?d.dataset.ref:null,Qt()}(!k||k.tipo==="pin")&&ia(r.target.closest&&r.target.closest(".tc-pin")),Z.simulando&&Cr(r.target)});function Cr(r){let s=[],d=r&&r.closest&&r.closest(".tc-pin"),u=r&&r.closest&&r.closest(".tc-cable-toque");d?s=[d.dataset.ref]:u&&i.cables[+u.dataset.i]&&(s=[i.cables[+u.dataset.i].de,i.cables[+u.dataset.i].a]);let h=s.join("|");if(h!==ho){ho=h;for(let m of dr)m(s)}}function Pr(r){let s=k;if(k=null,$.classList.remove("tc-paneando"),!!s){if(s.tipo==="pulsar")return fe(s.id,!1,performance.now()-s.desde);if(s.tipo==="mover"&&s.movido){let d=Ne(s.id);s.id==="protoboard"?rt("componente_cambiado",{id:"protoboard",x:d.x,y:d.y}):(hr(),(i.protoboard||d.en)&&mo(d),rt("componente_cambiado",{id:s.id,x:d.x,y:d.y,en:d.en?Et(d.en):null})),nt()}else if(s.tipo==="asa"&&s.movido)nt();else if(s.tipo==="paneo"&&!s.movido&&s.punto&&D)Qn(s.punto);else if(s.tipo==="pin"&&s.movido&&D&&r.type==="pointerup"){let d=l.elementFromPoint(r.clientX,r.clientY),u=d&&d.closest(".tc-pin");u&&u.dataset.ref!==s.ref&&vr(u.dataset.ref)}}}$.addEventListener("pointerup",Pr),$.addEventListener("pointercancel",Pr),$.addEventListener("pointerleave",()=>{if(We(),ho&&Cr(null),k&&k.tipo==="pulsar"){let r=k;k=null,fe(r.id,!1,performance.now()-r.desde)}}),$.addEventListener("dblclick",r=>{if(n||D)return;let s=l.elementFromPoint(r.clientX,r.clientY)||r.target,d=s.closest(".tc-asa"),u=s.closest(".tc-cable-toque");if(d){let h=i.cables[+d.dataset.i];h.puntos.splice(+d.dataset.p,1),h.puntos.length||delete h.puntos,bt(),ft(),nt()}else if(u){let h=i.cables[+u.dataset.i],m=qe(h),w=yo(r),S=0,_=w,N=1/0;for(let z=0;z<m.length-1;z++){let Y=Za(w,m[z],m[z+1]);Oe(w,Y)<N&&(N=Oe(w,Y),S=z,_=Y)}(h.puntos=h.puntos||[]).splice(S,0,[W(_.x),W(_.y)]),lt({tipo:"cable",cable:h}),nt()}}),$.addEventListener("wheel",r=>{r.preventDefault();let s=$.getBoundingClientRect(),d=Math.min(1.5,Math.max(.66,Math.exp(-r.deltaY*.0015)));vo(d,r.clientX-s.left,r.clientY-s.top)},{passive:!1}),g.addEventListener("keydown",r=>{if(r.target.closest&&r.target.closest("select, input"))return;let s=!r.ctrlKey&&!r.metaKey&&!r.altKey,d=!0;r.key==="Escape"?D?xo():lt(null):n?d=!1:r.key==="Delete"||r.key==="Backspace"?(r.preventDefault(),D?ta():_r()):(r.key==="r"||r.key==="R")&&s?Sr():/^[0-9]$/.test(r.key)&&s&&(D||E&&E.tipo==="cable")?$r(tr[Number(r.key)]):d=!1,d&&r.stopPropagation()});function Fe(){L.style.transform=`translate(${R.px}px, ${R.py}px) scale(${R.escala})`;let r=Xa*R.escala;$.style.backgroundSize=`${r}px ${r}px`,$.style.backgroundPosition=`${R.px}px ${R.py}px`,We()}function vo(r,s,d){pe=!0,s===void 0&&(s=$.clientWidth/2,d=$.clientHeight/2);let u=Math.min(Fa,Math.max(Ln,R.escala*r)),h=(s-R.px)/R.escala,m=(d-R.py)/R.escala;Object.assign(R,{escala:u,px:s-h*u,py:d-m*u}),Fe()}function wo(){let r=1/0,s=1/0,d=-1/0,u=-1/0,h=(m,w)=>{r=Math.min(r,m),s=Math.min(s,w),d=Math.max(d,m),u=Math.max(u,w)};for(let m of j.values()){let w=Le(m.id);if(!w)continue;let S=(w.rot||0)%180!==0,_=(S?m.h:m.w)/2,N=(S?m.w:m.h)/2;h(w.x+m.w/2-_,w.y+m.h/2-N),h(w.x+m.w/2+_,w.y+m.h/2+N)}for(let m of i.cables)for(let[w,S]of m.puntos||[])h(w,S);return isFinite(r)?{x0:r,y0:s,x1:d,y1:u}:null}function he(){let r=$.clientWidth,s=$.clientHeight;if(!r||!s)return!1;let d=wo();if(!d)return!1;let{x0:u,y0:h,x1:m,y1:w}=d,S=48,_=Math.min((r-2*S)/(m-u||1),(s-2*S)/(w-h||1)),N=Math.min(2.4,Math.max(Ln,_));return Object.assign(R,{escala:N,px:r/2-(u+m)/2*N,py:s/2-(h+w)/2*N}),je={ancho:r,alto:s},Fe(),!0}function ra(){let r=wo()||{x0:0,y0:0,x1:100,y1:100},s=12,d=16,u=Math.max(Ua,Math.ceil(r.x1-r.x0+2*s)),h=Math.ceil(r.y1-r.y0+2*s)+d,m=[`<svg xmlns="${Dn}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${u}" height="${h}" viewBox="0 0 ${u} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${u}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${W(s-r.x0)} ${W(s-r.y0)})">`];for(let w of O.children){let S=j.get(w.dataset.id);S&&S.lista&&m.push(na(S))}for(let w of i.cables){let S=qe(w);if(!S)continue;let _=ir(S),N=ar(w.color),z=Y=>`<circle cx="${Y.x}" cy="${Y.y}" r="2.4" fill="${N}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;m.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${_}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${_}" stroke="${N}" stroke-width="3"/>${z(S[0])}${z(S[S.length-1])}</g>`)}return m.push("</g>",`<text x="${u-s}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${Tn(Ba)}</text>`,"</svg>"),m.join(`
`)}function na(r){let s=Le(r.id);if(!s)return"";let d=s.rot?`translate(${s.x+r.w/2} ${s.y+r.h/2}) rotate(${s.rot}) translate(${-r.w/2} ${-r.h/2})`:`translate(${s.x} ${s.y})`;if(!r.def){let Gt=Tn((Q(r.id)||{}).tipo||"");return`<g transform="${d}"><rect width="${r.w}" height="${r.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${r.w/2}" y="${r.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${Gt}?</text></g>`}let u=r.el.shadowRoot?r.el.shadowRoot.querySelector("svg"):r.el.tagName&&r.el.tagName.toLowerCase()==="svg"?r.el:null;if(!u)return"";let h=u.cloneNode(!0),m=[],w=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;w.nextNode();)m.push(w.currentNode);m.forEach(Gt=>Gt.remove());let S=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),_=h.querySelector("#rotating");S&&_&&_.setAttribute("transform",`rotate(${S[1]} 10 8)`),h.setAttribute("width",W(r.w)),h.setAttribute("height",W(r.h)),h.removeAttribute("id");let N="tc-"+r.id,z=[...new Set([...h.querySelectorAll("[id]")].map(Gt=>Gt.id))],Y=new XMLSerializer().serializeToString(h);for(let Gt of z)Y=Ya(Y,Gt,N);Y=Y.replace(/^<svg\b/,`<svg id="${N}"`);let Rr=r.el.shadowRoot?Ka(r.el,N,z):"";return`<g transform="${d}">${Rr?`<style><![CDATA[
${Rr}
]]></style>`:""}${Y}</g>`}function aa(r){let[s,d]=ze(r);if(s==="placa")return de[o].rotulo(d);if(s==="protoboard")return En(d);let u=Q(s),h=u&&J[u.tipo],m=u&&u.en&&u.en[d]?` \xB7 en el hueco ${u.en[d].slice(11)}`:"";return h?`${h.nombre}: ${h.rotulo(d)}${m}`:d}function ia(r){let s=r?r.dataset.ref:null;if(s===De)return;De=s,mr(s);let d=s&&kt(s);if(!d){q.hidden=!0;return}let u=R.py+d.y*R.escala,h=Z.voltajes[s],m=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;q.textContent=aa(s)+m,q.style.left=R.px+d.x*R.escala+"px",q.style.top=u+"px",q.classList.toggle("tc-abajo",u<44),q.hidden=!1}function We(){De=null,q.hidden=!0,mr(null)}function ft(){clearTimeout(lo),M.classList.remove("tc-aviso");let r=E&&E.tipo==="cable"&&E.cable.puntos&&E.cable.puntos.length;M.textContent=n?"Solo lectura: puedes mover la vista y hacer zoom.":D?D.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":r?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":E&&E.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":E&&Jt(Q(E.id))?"Va montada sobre el Uno: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla":E&&E.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":E&&i.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":E?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":Z.simulando&&i.componentes.some(s=>s.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function sa(r){ft(),M.textContent=r,M.classList.add("tc-aviso"),lo=setTimeout(ft,2500)}function rt(r,s){if(a)try{a({t:Date.now(),origen:"circuito",tipo:r,datos:s})}catch(d){console.error(d)}}function nt(){let r=Et(i);for(let s of c)try{s(r)}catch(d){console.error(d)}}function kr(r){g.classList.toggle("tc-oscuro",r==="oscuro"),g.classList.toggle("tc-claro",r==="claro")}let ca={circuito:()=>Et(i),alCambiar(r){typeof r=="function"&&c.push(r)},ponerPlaca(r){if(r!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:kr,exportarSVG:ra,exportarNetlist:r=>Rn(i,r),_alPulsar(r){typeof r=="function"&&lr.push(r)},_alAcercar(r){typeof r=="function"&&dr.push(r)},_mostrar(r){let s=Z.simulando;Z={simulando:!!r.simulando,leds:r.leds||{},quemados:r.quemados||[],voltajes:r.voltajes||{},placa:r.placa||{},servos:r.servos||{},piezas:r.piezas||{}},s!==Z.simulando&&(g.classList.toggle("tc-simulando",Z.simulando),Z.simulando||[...fo].forEach(d=>fe(d,!1)),ft()),De=null;for(let d of j.values())d.lista&&gr(d)},destruir(){uo=!0,Or.disconnect(),clearTimeout(lo),c.length=0,j.clear(),Tt.clear(),p.remove()}};t.tema&&kr(t.tema),n&&g.classList.add("tc-solo-lectura"),Fe(),ft();let Or=new ResizeObserver(()=>{if(!cr||uo)return;if(!po){po=he();return}if(pe||!je)return;let r=(s,d)=>Math.abs(s-d)/Math.max(1,d);(r($.clientWidth,je.ancho)>.1||r($.clientHeight,je.alto)>.1)&&he()});Or.observe($);let la=Te("placa");return Ie(),Promise.all([la,...i.protoboard?[pr()]:[],...i.componentes.map(r=>Te(r.id,r.tipo,r.props))]).then(()=>{uo||(cr=!0,Ge(),bt(),po=he())}),ca}function Wa(e,t){let o=e&&typeof e=="object"?Et(e):{};o.formato=o.formato||1,o.placa=t;let n=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(a=>a&&typeof a.id=="string"&&a.id&&a.id!=="placa"&&!a.id.includes(".")&&!n.has(a.id)&&n.add(a.id));for(let a of o.componentes){a.x=Number(a.x)||0,a.y=Number(a.y)||0,a.rot=Number(a.rot)||0;let c=J[a.tipo]?J[a.tipo].props:{};a.props={...c,...a.props&&typeof a.props=="object"?a.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(a=>a&&typeof a.de=="string"&&typeof a.a=="string");for(let a of o.cables){let c=Array.isArray(a.puntos)&&a.puntos.every(i=>Array.isArray(i)&&i.length===2&&i.every(Number.isFinite));"puntos"in a&&!c&&delete a.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let a of o.componentes){let c=o.protoboard&&a.en&&typeof a.en=="object"&&Object.values(a.en).every(i=>typeof i=="string"&&i.startsWith("protoboard."));"en"in a&&!c&&delete a.en}return o}var zn=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Tn=e=>String(e).replace(/[<>&"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[t]);function Ya(e,t,o){let n=zn(t),a=`${o}-${t}`;return e.replace(new RegExp(`(\\s)id="${n}"`,"g"),(c,i)=>`${i}id="${a}"`).replace(new RegExp(`url\\(#${n}\\)`,"g"),()=>`url(#${a})`).replace(new RegExp(`href="#${n}"`,"g"),()=>`href="#${a}"`)}function Ka(e,t,o){let n=e.shadowRoot,a=[...n.adoptedStyleSheets||[]];n.querySelectorAll("style").forEach(i=>i.sheet&&a.push(i.sheet));let c=[];for(let i of a){let p;try{p=i.cssRules}catch{continue}for(let l of p){if(!l.selectorText||!l.style)continue;let f=l.selectorText.split(",").map(x=>x.trim()).filter(x=>!/:host|\binput\b|:focus|\.hide-input/.test(x));if(!f.length)continue;let g=f.map(x=>{let v=x;for(let C of o)v=v.replace(new RegExp(`#${zn(C)}(?![\\w-])`,"g"),()=>`#${t}-${C}`);return/^svg\b/.test(v)?v.replace(/^svg\b/,`#${t}`):`#${t} ${v}`});c.push(`${g.join(", ")} { ${l.style.cssText} }`)}}return c.join(`
`)}function Ja(e){let[t,o,n]=[1,3,5].map(a=>parseInt(e.slice(a,a+2),16)/255);return .2126*t+.7152*o+.0722*n>.55?"#1d2733":"#ffffff"}function In(e){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(e||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function ir(e){let t=n=>`${W(n.x)} ${W(n.y)}`,o=`M${t(e[0])}`;for(let n=1;n<e.length-1;n++){let a=e[n-1],c=e[n],i=e[n+1],p=Math.min(5,Oe(a,c)/2,Oe(c,i)/2);o+=` L${t(Gn(c,a,p))} Q${t(c)} ${t(Gn(c,i,p))}`}return`${o} L${t(e[e.length-1])}`}function Gn(e,t,o){let n=Oe(e,t);return n?{x:e.x+(t.x-e.x)*o/n,y:e.y+(t.y-e.y)*o/n}:e}function Za(e,t,o){let n=o.x-t.x,a=o.y-t.y,c=n*n+a*a,i=c?Math.max(0,Math.min(1,((e.x-t.x)*n+(e.y-t.y)*a)/c)):0;return{x:t.x+i*n,y:t.y+i*a}}function Qa(e){return!e||!e.getAttribute?!1:e.id==="knob"||e.id==="rotating"?!0:e.tagName==="ellipse"&&Number(e.getAttribute("rx"))>5}function qn(e){let t=new Uint8Array(32768),o=0,n=!1;for(let[a,c]of String(e).split(/\r?\n/).entries()){let i=c.trim();if(!i)continue;if(!/^:([0-9a-f]{2})+$/i.test(i))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${a+1}).`);let p=i.slice(1).match(/../g).map(C=>parseInt(C,16));if(p.reduce((C,y)=>C+y,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${a+1}).`);let[l,f,g,x]=p,v=p.slice(4,4+l);if(x===0){let C=o+(f<<8|g);if(C+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set(v,C)}else if(x===1){n=!0;break}else x===2?o=(v[0]<<8|v[1])<<4:x===4&&(o=(v[0]<<8|v[1])<<16)}if(!n)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var ti=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],sr='(()=>{function be(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var wo=256,yo=128,Jt=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+wo),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(yo),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,o=255){let i=this.writeHooks[e];i&&i(s,this.data[e],e,o)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:o,enableRegister:i,enableMask:a}=e;e.inverseFlag?this.data[s]&=~o:this.data[s]|=o,this.data[i]&a&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:o,flagRegister:i,flagMask:a,inverseFlag:n}=e;if(s&o){let r=this.data[i]&a;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:o},i=!0){i&&(this.data[s]&=~o);let{pendingInterrupts:a,maxInterrupt:n}=this;if(a[e]&&(a[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(a[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:o,flagMask:i}=e;s&i&&(this.data[o]&=~i,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:o}=this;s=this.cycles+Math.max(1,s);let i=o.pop(),a=i??{cycles:s,callback:e,next:null};a.cycles=s,a.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<s;)r=n,n=n.next;return r?(r.next=a,a.next=n):(this.nextClockEvent=a,a.next=n),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:o}=this,i=null;for(;s;){if(s.callback===e)return i?i.next=s.next:this.nextClockEvent=s.next,o.length<10&&o.push(s),!0;i=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let o=this.pendingInterrupts[s];be(this,o.address),o.constant||this.clearInterrupt(o)}}};function Qt(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Me(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o+(t.data[95]&1),a=i&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^o)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i&256?1:0,n|=1&(s&o|o&~a|~a&s)?32:0,t.data[95]=n}else if((e&64512)===3072){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o&255;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(i^o)&(i^s)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=s+o&256?1:0,a|=1&(s&o|o&~i|~i&s)?32:0,t.data[95]=a}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=o+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,i,!0);let a=t.data[95]&224;a|=i?0:2,a|=32768&i?4:0,a|=~o&i&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=~i&o&32768?1:0,t.data[95]=a,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65039)===37893){let s=t.data[(e&496)>>4],o=s>>>1|128&s;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,o=(e&496)>>4;t.data[o]=~(1<<s)&t.data[o]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],o=e&7;t.data[95]=t.data[95]&191|(s>>o&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,o=t.pc+2,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=s-1,t.cycles+=a?4:3}else if((e&65280)===38912){let s=e&248,o=e&7,i=t.readData((s>>3)+32),a=1<<o;t.writeData((s>>3)+32,i&~a,a)}else if((e&65039)===37888){let s=(e&496)>>4,o=255-t.data[s];t.data[s]=o;let i=t.data[95]&225|1;i|=o?0:2,i|=128&o?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===5120){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=((s^o)&(s^i)&128)!==0?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===1024){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.pc+=o,t.cycles+=o}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],o=s-1;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===128?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(e===38169){let s=t.pc+1,o=t.dataView.getUint16(93,!0),i=t.data[92];t.data[o]=s&255,t.data[o-1]=s>>8&255,t.data[o-2]=s>>16&255,t.dataView.setUint16(93,o-3,!0),t.pc=(i<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|o],t.dataView.setUint16(30,o+1,!0),o===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setUint16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.dataView.getInt8((e&7)+16),i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?2:0)|(s*o&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[o]=s&255,t.data[o-1]=s>>8&255,i&&(t.data[o-2]=s>>16&255),t.dataView.setUint16(93,o-(i?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=i?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],o=s+1&255;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===127?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i&255-o),t.data[s]=i}else if((e&65039)===37381){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i|o),t.data[s]=i}else if((e&65039)===37383){let s=t.data[(e&496)>>4],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^o),t.data[(e&496)>>4]=o}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],o=s>>>1;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),o=2*((e&240)>>4);t.data[o]=t.data[s],t.data[o+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,o=t.data[s],i=0-o;t.data[s]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=i===128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i?1:0,a|=1&(i|o)?32:0,t.data[95]=a}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),o=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc+=s,t.cycles+=a?3:2}else if(e===38152){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],o=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=1&s?1:0,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===2048){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);t.data[(e&496)>>4]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=t.data[95],a=s-o-(i&1);t.data[((e&240)>>4)+16]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&65280)===39424){let s=((e&248)>>3)+32,o=1<<(e&7);t.writeData(s,t.readData(s)|o,o),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let o=t.progMem[t.pc+1],i=Qt(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let o=t.progMem[t.pc+1],i=Qt(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=e&15|(e&192)>>2,a=o-i;t.dataView.setUint16(s,a,!0);let n=t.data[95]&192;n|=a?0:2,n|=32768&a?4:0,n|=o&~a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>o?1:0,n|=1&(~o&i|i&a|a&~o)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.cycles+=o,t.pc+=o}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],o=t.progMem[t.pc+1];t.writeData(o,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.writeData(o,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0);t.writeData(o,s),t.dataView.setUint16(28,o+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o;t.data[((e&240)>>4)+16]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&65039)===37890){let s=(e&496)>>4,o=t.data[s];t.data[s]=(15&o)<<4|(240&o)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,o=t.data[s],i=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=o,t.data[s]=i}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var tt;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(tt||(tt={}));var F;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(F||(F={}));var fs={0:{type:F.SingleEnded,channel:0},1:{type:F.SingleEnded,channel:1},2:{type:F.SingleEnded,channel:2},3:{type:F.SingleEnded,channel:3},4:{type:F.SingleEnded,channel:4},5:{type:F.SingleEnded,channel:5},6:{type:F.SingleEnded,channel:6},7:{type:F.SingleEnded,channel:7},8:{type:F.Temperature},14:{type:F.Constant,voltage:1.1},15:{type:F.Constant,voltage:0}},Po={type:F.Constant,voltage:0},ye={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:fs,adcReferences:[tt.AREF,tt.AVCC,tt.Reserved,tt.Internal1V1]},Eo=7,Do=8,vo=16,ls=64,we=128,_o=31,$o=32,Uo=8,ko=8,Bo=3,Oo=6,Yt=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=o=>{var i;let a=0;switch(o.type){case F.Constant:a=o.voltage;break;case F.SingleEnded:a=(i=this.channelValues[o.channel])!==null&&i!==void 0?i:0;break;case F.Differential:a=o.gain*((this.channelValues[o.positiveChannel]||0)-(this.channelValues[o.negativeChannel]||0));break;case F.Temperature:a=.378125;break}let n=a/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:vo,enableRegister:this.config.ADCSRA,enableMask:Do},e.writeHooks[s.ADCSRA]=(o,i)=>{var a;if(o&we&&!(i&we)&&(this.conversionCycles=25),e.data[s.ADCSRA]=o,e.updateInterruptEnable(this.ADC,o),!this.converting&&o&ls){if(!(o&we))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&_o;e.data[s.ADCSRB]&Uo&&(n|=32),n&=s.muxInputMask;let r=(a=s.muxChannels[n])!==null&&a!==void 0?a:Po;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:o,ADMUX:i,ADCSRA:a}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[i]&$o?(this.cpu.data[s]=e<<6&255,this.cpu.data[o]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[o]=e>>8&3),this.cpu.data[a]&=~ls,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&Eo){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:o}=this.config,i=this.cpu.data[s]>>Oo&Bo;return o.length>4&&this.cpu.data[s]&ko&&(i|=4),(e=o[i])!==null&&e!==void 0?e:tt.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case tt.AVCC:return this.avcc;case tt.AREF:return this.aref;case tt.Internal1V1:return 1.1;case tt.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var Vo=2,Wo=4,Fo=8,No=16,Lo=32,Ji=Vo|Wo|Fo|No|Lo;var ds={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},hs={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},xs={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},us={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},ps={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var vt={PIN:35,DDR:36,PORT:37,pinChange:xs,externalInterrupts:[]},Pe={PIN:38,DDR:39,PORT:40,pinChange:us,externalInterrupts:[]},St={PIN:41,DDR:42,PORT:43,pinChange:ps,externalInterrupts:[null,null,ds,hs]};var K;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(K||(K={}));var B;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(B||(B={}));var Dt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Dt||(Dt={}));var te=class{constructor(e,s){var o,i,a,n;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=C=>{let w=e.data[s.PORT];return e.data[s.DDR]=C,this.writeGpio(w,C),this.updatePinRegister(C),!0},e.writeHooks[s.PORT]=C=>{let w=e.data[s.DDR];return e.data[s.PORT]=C,this.writeGpio(C,w),this.updatePinRegister(w),!0},e.writeHooks[s.PIN]=(C,w,l,b)=>{let M=e.data[s.PORT],v=e.data[s.DDR],V=M^C&b;return e.data[s.PORT]=V,this.writeGpio(V,v),this.updatePinRegister(v),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(C=>C?{address:C.interrupt,flagRegister:C.EIFR,flagMask:1<<C.index,enableRegister:C.EIMSK,enableMask:1<<C.index}:null);let f=new Set(r.map(C=>C?.EICR));for(let C of f)this.attachInterruptHook(C||0);let A=(i=(o=r.find(C=>C&&C.EIMSK))===null||o===void 0?void 0:o.EIMSK)!==null&&i!==void 0?i:0;this.attachInterruptHook(A,"mask");let m=(n=(a=r.find(C=>C&&C.EIFR))===null||a===void 0?void 0:a.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(m,"flag");let{pinChange:R}=s;if(this.PCINT=R?{address:R.pinChangeInterrupt,flagRegister:R.PCIFR,flagMask:1<<R.PCIE,enableRegister:R.PCICR,enableMask:1<<R.PCIE}:null,R){let{PCIFR:C,PCMSK:w}=R;e.writeHooks[C]=l=>{for(let b of this.cpu.gpioPorts){let{PCINT:M}=b;M&&e.clearInterruptByFlag(M,l)}return!0},e.writeHooks[w]=l=>{e.data[w]=l;for(let b of this.cpu.gpioPorts){let{PCINT:M}=b;M&&e.updateInterruptEnable(M,l)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],o=this.cpu.data[this.portConfig.PORT],i=1<<e,a=o&i?K.InputPullUp:K.Input,n=this.openCollector&i?a:K.High;return s&i?this.lastValue&i?n:K.Low:a}setPin(e,s){let o=1<<e;this.pinValue&=~o,s&&(this.pinValue|=o),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:o,portConfig:i}=this,a=1<<e;if(s===B.None)this.overrideMask|=a,this.overrideValue&=~a;else switch(this.overrideMask&=~a,s){case B.Enable:this.overrideValue&=~a,this.overrideValue|=o.data[i.PORT]&a;break;case B.Set:this.overrideValue|=a;break;case B.Clear:this.overrideValue&=~a;break;case B.Toggle:this.overrideValue^=a;break}let n=o.data[i.DDR];this.writeGpio(o.data[i.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var s,o;let i=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=i,this.lastPin!==i){for(let a=0;a<8;a++)if((i&1<<a)!==(this.lastPin&1<<a)){let n=!!(i&1<<a);this.toggleInterrupt(a,n),(o=(s=this.externalClockListeners)[a])===null||o===void 0||o.call(s,n)}this.lastPin=i}}toggleInterrupt(e,s){let{cpu:o,portConfig:i,externalInts:a,PCINT:n}=this,{externalInterrupts:r,pinChange:f}=i,A=r[e],m=a[e];if(m&&A){let{EIMSK:R,index:C,EICR:w,iscOffset:l}=A;if(o.data[R]&1<<C){let b=o.data[w]>>l&3,M=!1;switch(m.constant=!1,b){case Dt.LowLevel:M=!s,m.constant=!0;break;case Dt.Change:M=!0;break;case Dt.FallingEdge:M=!s;break;case Dt.RisingEdge:M=s;break}M?o.setInterruptFlag(m):m.constant&&o.clearInterrupt(m,!0)}}if(f&&n&&f.mask&1<<e){let{PCMSK:R}=f;o.data[R]&1<<e+f.offset&&o.setInterruptFlag(n)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:o}=this;o.writeHooks[e]=i=>{s!=="flag"&&(o.data[e]=i);for(let a of o.gpioPorts){for(let n of a.externalInts)n&&s==="mask"&&o.updateInterruptEnable(n,i),n&&!n.constant&&s==="flag"&&o.clearInterruptByFlag(n,i);a.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let o=0;o<8;o++){let i=s[o];if(!i)continue;let a=!!(this.lastPin&1<<o),{EIFR:n,EIMSK:r,index:f,EICR:A,iscOffset:m,interrupt:R}=i;if(!(e.data[r]&1<<f)||a)continue;(e.data[A]>>m&3)===Dt.LowLevel&&e.queueInterrupt({address:R,flagRegister:n,flagMask:1<<f,enableRegister:r,enableMask:1<<f,constant:!0})}}writeGpio(e,s){let o=(e&this.overrideMask|this.overrideValue)&s|e&~s,i=this.lastValue;if(o!==i||s!==this.lastDdr){this.lastValue=o,this.lastDdr=s;for(let a of this.listeners)a(o,i)}}};var Cs={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ee;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ee||(ee={}));var De={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},ve=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Cs,compPortA:St.PORT,compPinA:6,compPortB:St.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:St.PORT,externalClockPin:4},De),_e=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Cs,compPortA:vt.PORT,compPinA:1,compPortB:vt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:St.PORT,externalClockPin:5},De),$e=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:vt.PORT,compPinA:3,compPortB:St.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},De),Lt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Lt||(Lt={}));var O;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(O||(O={}));var _;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(_||(_={}));var Rt=1,Nt=2,_t=1,{Normal:Ue,PWMPhaseCorrect:xt,CTC:pe,FastPWM:ut,Reserved:Ee,PWMPhaseFrequencyCorrect:se}=Lt,jo=[[Ue,255,_.Immediate,O.Max,0],[xt,255,_.Top,O.Bottom,0],[pe,Rt,_.Immediate,O.Max,0],[ut,255,_.Bottom,O.Max,0],[Ee,255,_.Immediate,O.Max,0],[xt,Rt,_.Top,O.Bottom,_t],[Ee,255,_.Immediate,O.Max,0],[ut,Rt,_.Bottom,O.Top,_t]],Ho=[[Ue,65535,_.Immediate,O.Max,0],[xt,255,_.Top,O.Bottom,0],[xt,511,_.Top,O.Bottom,0],[xt,1023,_.Top,O.Bottom,0],[pe,Rt,_.Immediate,O.Max,0],[ut,255,_.Bottom,O.Top,0],[ut,511,_.Bottom,O.Top,0],[ut,1023,_.Bottom,O.Top,0],[se,Nt,_.Bottom,O.Bottom,0],[se,Rt,_.Bottom,O.Bottom,_t],[xt,Nt,_.Top,O.Bottom,0],[xt,Rt,_.Top,O.Bottom,_t],[pe,Nt,_.Immediate,O.Max,0],[Ee,65535,_.Immediate,O.Max,0],[ut,Nt,_.Bottom,O.Top,_t],[ut,Rt,_.Bottom,O.Top,_t]];function Go(t){switch(t){case 1:return B.Toggle;case 2:return B.Clear;case 3:return B.Set;default:return B.Enable}}var ms=128,gs=64,Ko=32,oe=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=_.Immediate,this.tovUpdateMode=O.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(o=!0,i=!1)=>{let{divider:a,lastCycle:n,cpu:r}=this,{cycles:f}=r,A=f-n;if(a&&A>=a||i){let m=i?1:Math.floor(A/a);this.lastCycle+=m*a;let R=this.tcnt,{timerMode:C,TOP:w}=this,l=C===xt||C===se,b=l?this.phasePwmCount(R,m):(R+m)%(w+1),M=R+m>w;if(this.tcntUpdated||(this.tcnt=b,l||this.timerUpdated(b,R)),!l){if(C===ut&&M){let{compA:v,compB:V}=this;v&&this.updateCompPin(v,"A",!0),V&&this.updateCompPin(V,"B",!0)}this.ocrUpdateMode==_.Bottom&&M&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),M&&(this.tovUpdateMode==O.Top||w===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===_.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===_.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:m}=this,{externalClockPin:R}=this.config,C=this.config.dividers[m];this.lastCycle=C?this.cpu.cycles:0,this.updateDivider=!1,this.divider=C,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[R]=null),C?r.addClockEvent(this.count,this.lastCycle+C-r.cycles):this.externalClockPort&&(m===ee.FallingEdge||m===ee.RisingEdge)&&(this.externalClockPort.externalClockListeners[R]=this.externalClockCallback,this.externalClockRisingEdge=m===ee.RisingEdge);return}o&&a&&r.addClockEvent(this.count,this.lastCycle+a-r.cycles)},this.externalClockCallback=o=>{o===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=o=>(this.count(!1),this.config.bits===16&&(this.cpu.data[o+1]=this.tcnt>>8),this.cpu.data[o]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=o=>{this.tcntNext=this.highByteTemp<<8|o,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=o=>{this.nextOcrA=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=o=>{this.nextOcrB=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=o=>{this.nextOcrC=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=a=>{this.icr=this.highByteTemp<<8|a};let o=a=>{this.highByteTemp=a},i=(a,n,r)=>(this.highByteTemp=a&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=o,this.cpu.writeHooks[s.OCRA+1]=i,this.cpu.writeHooks[s.OCRB+1]=i,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=i),this.cpu.writeHooks[s.ICR+1]=o}e.writeHooks[s.TCCRA]=o=>(this.cpu.data[s.TCCRA]=o,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=o=>(s.TCCRC||(this.checkForceCompare(o),o&=~(ms|gs)),this.cpu.data[s.TCCRB]=o,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=o=>{this.checkForceCompare(o)}),e.writeHooks[s.TIFR]=o=>(this.cpu.data[s.TIFR]=o,this.cpu.clearInterruptByFlag(this.OVF,o),this.cpu.clearInterruptByFlag(this.OCFA,o),this.cpu.clearInterruptByFlag(this.OCFB,o),!0),e.writeHooks[s.TIMSK]=o=>{this.cpu.updateInterruptEnable(this.OVF,o),this.cpu.updateInterruptEnable(this.OCFA,o),this.cpu.updateInterruptEnable(this.OCFB,o)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case Rt:return this.ocrA;case Nt:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case Rt:case Nt:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,o=e.bits===16?Ho:jo,i=this.cpu.data[e.TCCRA],[a,n,r,f,A]=o[s];this.timerMode=a,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=f;let m=a===ut||a===xt||a===se,R=this.compA;this.compA=i>>6&3,this.compA===1&&m&&!(A&_t)&&(this.compA=0),!!R!=!!this.compA&&this.updateCompA(this.compA?B.Enable:B.None);let C=this.compB;if(this.compB=i>>4&3,this.compB===1&&m&&(this.compB=0),!!C!=!!this.compB&&this.updateCompB(this.compB?B.Enable:B.None),this.hasOCRC){let w=this.compC;this.compC=i>>2&3,this.compC===1&&m&&(this.compC=0),!!w!=!!this.compC&&this.updateCompC(this.compC?B.Enable:B.None)}}phasePwmCount(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n,TOP:r,MAX:f,tcntUpdated:A}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===_.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!A&&(this.countingUp=!1,this.ocrUpdateMode===_.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!A&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===_.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),A||(e===o&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===i&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===a&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&f}timerUpdated(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n}=this,r=s>e;((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==Lt.FastPWM||this.timerMode==Lt.PWMPhaseCorrect||this.timerMode==Lt.PWMPhaseFrequencyCorrect||(e&ms&&this.updateCompPin(this.compA,"A"),e&gs&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ko&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,o=!1){let i=B.None,a=e===3,n=this.countingUp===a;switch(this.timerMode){case Ue:case pe:i=Go(e);break;case ut:e===1?i=o?B.None:B.Toggle:i=a!==o?B.Set:B.Clear;break;case xt:case se:e===1?i=B.Toggle:i=n?B.Set:B.Clear;break}i!==B.None&&(s==="A"?this.updateCompA(i):s==="B"?this.updateCompB(i):this.updateCompC(i))}updateCompA(e){let{compPortA:s,compPinA:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompB(e){let{compPortB:s,compPinB:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompC(e){let{compPortC:s,compPinC:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}};var Be={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},qo=128,zo=64,Ss=32;var ke=2,Xo=1,Rs=ke,Zo=128,Jo=64,Qo=32,me=16,ge=8,bs=4;var As=bs|me|ge;var Yo=32,ti=16,ei=8,Is=4,Ts=2;var si={5:31,6:63,7:127,8:255,9:255},ie=class{constructor(e,s,o){this.cpu=e,this.config=s,this.freqHz=o,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:qo,enableRegister:this.config.UCSRB,enableMask:Zo,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ss,enableRegister:this.config.UCSRB,enableMask:Qo},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:zo,enableRegister:this.config.UCSRB,enableMask:Jo},this.reset(),this.cpu.writeHooks[s.UCSRA]=(i,a)=>{var n;return e.data[s.UCSRA]=i&(Xo|ke),e.clearInterruptByFlag(this.TXC,i),(i&Rs)!==(a&Rs)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(i,a)=>{var n;return e.updateInterruptEnable(this.RXC,i),e.updateInterruptEnable(this.UDRE,i),e.updateInterruptEnable(this.TXC,i),i&me&&a&me&&e.clearInterrupt(this.RXC),i&ge&&!(a&ge)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=i,(i&As)!==(a&As)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=i=>{var a;return e.data[s.UCSRC]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var i;let a=(i=si[this.bitsPerChar])!==null&&i!==void 0?i:255,n=this.rxByte&a;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[s.UDR]=i=>{if(this.onByteTransmit&&this.onByteTransmit(i),this.onLineTransmit){let a=String.fromCharCode(i);a===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=a}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=i=>{var a;return this.cpu.data[s.UBRRH]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.writeHooks[s.UBRRL]=i=>{var a;return this.cpu.data[s.UBRRL]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ss,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Is|Ts,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var o;let{cpu:i}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,i.setInterruptFlag(this.RXC),(o=this.onRxComplete)===null||o===void 0||o.call(this);else return this.rxBusyValue=!0,i.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&ke?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&me)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&ge)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Is|Ts))>>1|this.cpu.data[this.config.UCSRB]&bs){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ei?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Yo)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&ti)}};function Ms(t){let e=new Uint8Array(32768),s=0,o=!1;for(let[i,a]of String(t).split(/\\r?\\n/).entries()){let n=a.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${i+1}).`);let r=n.slice(1).match(/../g).map(w=>parseInt(w,16));if(r.reduce((w,l)=>w+l,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${i+1}).`);let[f,A,m,R]=r,C=r.slice(4,4+f);if(R===0){let w=s+(A<<8|m);if(w+f>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(C,w)}else if(R===1){o=!0;break}else R===2?s=(C[0]<<8|C[1])<<4:R===4&&(s=(C[0]<<8|C[1])<<16)}if(!o)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var rt=16e6,oi=Me,ii=[[St,["D0","D1","D2","D3","D4","D5","D6","D7"]],[vt,["D8","D9","D10","D11","D12","D13"]],[Pe,["A0","A1","A2","A3","A4","A5"]]],ct=Object.freeze({...K});function ws(t){let e=new Jt(Ms(t));[ve,_e,$e].forEach(l=>new oe(e,l));let s=new ie(e,Be,rt),o=new Yt(e,ye),i=ii.map(([l,b])=>[new te(e,l),b]),a={};for(let[l,b]of i)b.forEach((M,v)=>a[M]=[l,v]);let n=null;o.onADCRead=l=>{let b=0;if(l.type===F.SingleEnded){let V=o.channelValues[l.channel]||0;b=n?n(l.channel,V):V}else l.type===F.Constant?b=l.voltage:l.type===F.Temperature&&(b=.378125);let M=Math.round(b*1e6)/1e6,v=Math.min(1023,Math.max(0,Math.floor(M/o.referenceVoltage*1024)));e.addClockEvent(()=>o.completeADCRead(v),o.sampleCycles)};let r=[],f=[],A=[],m=[],R=C();function C(){let l={};for(let[b,M]of i)M.forEach((v,V)=>l[v]=b.pinState(V));return l}for(let[l,b]of i)l.addListener(()=>{let M=null;for(let v=0;v<b.length;v++){let V=l.pinState(v);V!==R[b[v]]&&((M||(M={}))[b[v]]=V,R[b[v]]=V)}if(M)for(let v of f)v(M,R)});s.onByteTransmit=l=>A.forEach(b=>b(l));function w(l){let b=e.cycles+l;for(;e.cycles<b;){let M=Math.min(b,e.cycles+rt/1e3);for(;e.cycles<M;)oi(e),e.tick();m.length&&!s.rxBusy&&(s.writeByte(m[0]),m.shift());for(let v of r)v()}}return{correr:w,estados:C,get ciclos(){return e.cycles},alCambiarPines:l=>f.push(l),alByteSerial:l=>A.push(l),enviarSerial:l=>m.push(...new TextEncoder().encode(l)),ponerAnalogico:(l,b)=>o.channelValues[l]=Math.max(0,Math.min(5,b)),ponerLectorAnalogico:l=>n=l,ponerEntrada(l,b){let M=a[l];M&&M[0].setPin(M[1],!!b)},alCadaMs:l=>r.push(l)}}var ai=["a","b","c","d","e"],ni=["f","g","h","i","j"],Oe={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ri=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],ys={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Ve=t=>14.4+(t-1)*9.6,ci=t=>t>=2&&(t-1)%6!==0,We=new Map;function Ne(t="media"){if(We.has(t))return We.get(t);let e=ys[t]||ys.media,s=[];We.set(t,s);for(let o=1;o<=e.columnas;o++){for(let i of ai)s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:"arriba"+o});for(let i of ni)s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:"abajo"+o});for(let[i]of ri)ci(o)&&s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:i})}return s}var Fe=new Map;function Ps(t="media"){if(Fe.has(t))return Fe.get(t);let e=new Map;Fe.set(t,e);for(let s of Ne(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var jt=3.779527559055118,li={ancho:72.58*jt,alto:53.34*jt},fi=4*jt,Es=5*jt;var ae=fi+4.6*jt,ne=li.ancho-.5-4.6*jt,di=60,pt=(t,e)=>({x:t,y:di+e*Es}),Xa={M1A:pt(ae,0),M1B:pt(ae,1),GND_IZQ:pt(ae,2),M2A:pt(ae,3),M2B:pt(ae,4),M4A:pt(ne,0),M4B:pt(ne,1),GND_DER:pt(ne,2),M3A:pt(ne,3),M3B:pt(ne,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+Es,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var Ds=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var hi=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function $t(t,{presionados:e=new Set,conduccion:s=!1}={}){let o=new Map,i=n=>{for(o.has(n)||o.set(n,n);o.get(n)!==n;)o.set(n,o.get(o.get(n))),n=o.get(n);return n},a=(n,r)=>o.set(i(n),i(r));for(let n of hi)n.forEach(r=>a("placa."+n[0],"placa."+r));for(let n of t.cables)a(n.de,n.a);if(t.protoboard){for(let n of Ps(t.protoboard.tipo).values())n.forEach(r=>a("protoboard."+n[0],"protoboard."+r));for(let n of t.componentes)if(n.en)for(let[r,f]of Object.entries(n.en))a(n.id+"."+r,f)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[r,f]of Ds)a(n.id+"."+r,f);(!n.props||n.props.puentePWR!==!1)&&a(n.id+".EXT_POS","placa.VIN")}else n.tipo==="pulsador"?(a(n.id+".1i",n.id+".1d"),a(n.id+".2i",n.id+".2d"),e.has(n.id)&&a(n.id+".1i",n.id+".2i")):s&&n.tipo==="resistencia"?a(n.id+".1",n.id+".2"):s&&n.tipo==="potenciometro"&&(a(n.id+".GND",n.id+".SIG"),a(n.id+".SIG",n.id+".VCC"));return i}function je(t,e,s,o){e>=0&&(t[e][e]+=o),s>=0&&(t[s][s]+=o),e>=0&&s>=0&&(t[e][s]-=o,t[s][e]-=o)}function Le(t,e,s){e>=0&&(t[e]+=s)}var Ut=(t,e)=>e>=0?t[e]:0;function re(t,e,s){return{a:t,b:e,g:1/s,sellar(o){je(o,this.a,this.b,this.g)},corriente(o){return(Ut(o,this.a)-Ut(o,this.b))*this.g}}}function vs(t){return{nodo:t,v:0,g:0,sellar(e,s){je(e,this.nodo,-1,this.g),Le(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Ut(e,this.nodo))*this.g}}}function _s(t,e){return{nodo:t,v:e,fila:-1,sellar(s,o){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,o[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function $s(t,e,{Is:s,n:o}){let i=o*.025693,a=i*Math.log(i/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let f=Math.exp(this.vd/i),A=s*(f-1),m=s*f/i+1e-12,R=A-m*this.vd;je(n,this.a,this.k,m),Le(r,this.a,-R),Le(r,this.k,R)},actualizar(n){let r=Ut(n,this.a)-Ut(n,this.k),f=Math.abs(r-this.vd);return this.vd=xi(r,this.vd,i,a),f},corriente(n){let r=Ut(n,this.a)-Ut(n,this.k);return s*Math.expm1(r/i)}}}function xi(t,e,s,o){if(t>o&&Math.abs(t-e)>2*s){if(e>0){let i=1+(t-e)/s;return i>0?e+s*Math.log(i):o}return s*Math.log(t/s)}return t}function Us(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let o=t.nodos+t.fuentes,i=t.elementos.filter(n=>n.noLineal),a=new Float64Array(o);for(let n=1;n<=e;n++){let r=Array.from({length:o},()=>new Float64Array(o)),f=new Float64Array(o);for(let m of t.elementos)m.sellar(r,f);for(let m=0;m<t.nodos;m++)r[m][m]+=1e-12;if(a=ui(r,f),!i.length)return{x:a,iteraciones:n,convergio:!0};let A=0;for(let m of i)A=Math.max(A,m.actualizar(a));if(A<s)return{x:a,iteraciones:n,convergio:!0}}return{x:a,iteraciones:e,convergio:!1}}function ui(t,e){let s=e.length;for(let i=0;i<s;i++){let a=i;for(let n=i+1;n<s;n++)Math.abs(t[n][i])>Math.abs(t[a][i])&&(a=n);if(Math.abs(t[a][i])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[i],t[a]]=[t[a],t[i]],[e[i],e[a]]=[e[a],e[i]];for(let n=i+1;n<s;n++){let r=t[n][i]/t[i][i];if(r){for(let f=i;f<s;f++)t[n][f]-=r*t[i][f];e[n]-=r*e[i]}}}let o=new Float64Array(s);for(let i=s-1;i>=0;i--){let a=e[i];for(let n=i+1;n<s;n++)a-=t[i][n]*o[n];o[i]=a/t[i][i]}return o}var kt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},He=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],mi={A4:"SDA",A5:"SCL"},Q={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},gi=.25,ks={minimo:1};function Ci(t){let s=(Q.vf[t]||Q.vf.rojo)-Q.iRef*Q.rs;return{Is:Q.iRef/Math.expm1(s/(Q.n*.025693)),n:Q.n}}var Bs={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function Os(t,{quemados:e=new Set,presionados:s=new Set}={}){let o=$t(t,{presionados:s}),i=$t(t,{presionados:s,conduccion:!0}),a=o("placa.GND1"),n=new Map,r=0,f=h=>{let u=o(h);return u===a?-1:(n.has(u)||n.set(u,r++),n.get(u))},A=h=>o(h)===a?-1:n.get(o(h)),m=[],R=[],C=[],w=new Set(t.cables.flatMap(h=>[h.de,h.a])),l=[];if(t.protoboard){let h=new Set([...w].map(o));for(let u of t.componentes)for(let x of Object.keys(u.en||{}))h.add(o(u.id+"."+x));for(let u of Ne(t.protoboard.tipo)){let x="protoboard."+u.nombre;h.has(o(x))&&l.push(x)}}let b=new Map;for(let[h,u]of[["5V",5],["3V3",3.3]]){if(!w.has("placa."+h))continue;let x=f("placa."+h),T=x===-1?"GND":b.get(x);if(T){C.push({tipo:"cortocircuito",componente:"placa."+h,mensaje:`El pin ${h} est\\xE1 unido directo a ${T}: es un cortocircuito.`});continue}b.set(x,h);let p=_s(x,u);R.push(p),m.push(p)}let M={};for(let h of He)!w.has("placa."+h)&&!w.has("placa."+mi[h])||(M[h]=vs(f("placa."+h)),m.push(M[h]));let v=[],V=[],At=[];for(let h of t.componentes)if(h.tipo==="resistencia"){let u=re(f(h.id+".1"),f(h.id+".2"),Number(h.props.ohmios)||1);v.push({id:h.id,ohmios:Number(h.props.ohmios)||1,el:u}),u.a!==u.b&&m.push(u)}else if(h.tipo==="led"){let u=f(h.id+".anodo"),x=f(h.id+".catodo"),T={id:h.id,a:u,k:x,quemado:e.has(h.id)};if(!T.quemado&&u!==x){let p=r++;T.rs=re(u,p,Q.rs),T.diodo=$s(p,x,Ci(h.props.color)),m.push(T.rs,T.diodo)}V.push(T)}else if(h.tipo==="potenciometro"){let u=Number(h.props.ohmios)||1e4,x=Math.max(0,Math.min(1,Number(h.props.posicion))),T=f(h.id+".GND"),p=f(h.id+".SIG"),E=f(h.id+".VCC"),W=re(T,p,Math.max(ks.minimo,u*x)),P=re(p,E,Math.max(ks.minimo,u*(1-x)));for(let N of[W,P])N.a!==N.b&&m.push(N);At.push({id:h.id,ohmios:u,posicion:x,bajo:W,alto:P})}R.forEach((h,u)=>h.fila=r+u);function st(h){let u=new Set([i("placa.GND1")]);for(let x of["5V","3V3"])w.has("placa."+x)&&u.add(i("placa."+x));for(let x of He){let T=h[x];(T===K.High||T===K.Low||T===K.InputPullUp)&&u.add(i("placa."+x))}return u}let $=new Set([...w,...l]);for(let h of t.componentes)for(let u of Bs[h.tipo]||[])$.add(h.id+"."+u);return{fallasFijas:C,flotantes(h){let u=st(h),x=new Set;for(let T of He)h[T]===K.Input&&!u.has(i("placa."+T))&&x.add(T);return x},refsAlAire(h){let u=st(h),x=new Set;for(let T of $)u.has(i(T))||x.add(T);return x},ponerPines(h){for(let[u,x]of Object.entries(M)){let T=h[u];T===K.High?Object.assign(x,{v:kt.voltios,g:1/kt.rAlto}):T===K.Low?Object.assign(x,{v:0,g:1/kt.rBajo}):T===K.InputPullUp?Object.assign(x,{v:kt.voltios,g:1/kt.rPullUp}):Object.assign(x,{v:0,g:0})}},resolver(){let h=Us({nodos:r,fuentes:R.length,elementos:m}),u=p=>{let E=A(p);return E===void 0?null:E<0?0:h.x[E]},x={};for(let p of w)x[p]=u(p);for(let p of l)x[p]=u(p);for(let p of t.componentes)for(let E of Bs[p.tipo]||[])x[p.id+"."+E]=u(p.id+"."+E);let T=(p,E)=>p===null||E===null?null:p-E;return{convergio:h.convergio,iteraciones:h.iteraciones,voltajes:x,leds:V.map(p=>{let E=p.diodo?p.diodo.corriente(h.x):0;return{id:p.id,quemado:p.quemado,v:T(u(p.id+".anodo"),u(p.id+".catodo")),i:E,brillo:Math.max(0,Math.min(1,E*1e3/Q.plenomA))}}),resistencias:v.map(p=>{let E=p.el.a===p.el.b?0:p.el.corriente(h.x);return{id:p.id,ohmios:p.ohmios,v:T(u(p.id+".1"),u(p.id+".2")),i:E,w:E*E*p.ohmios}}),pines:Object.entries(M).filter(([,p])=>p.g>0).map(([p,E])=>({pin:p,v:u("placa."+p),i:E.corriente(h.x)})),fuentes:R.map(p=>({pin:p.v===5?"5V":"3V3",i:p.corriente(h.x)})),potenciometros:At.map(p=>({id:p.id,ohmios:p.ohmios,posicion:p.posicion,v:T(u(p.id+".SIG"),u(p.id+".GND")),i:Math.abs(p.bajo.a!==p.bajo.b?p.bajo.corriente(h.x):p.alto.a!==p.alto.b?p.alto.corriente(h.x):0)}))}}}}function Vs(t,e){let s=i=>(Math.abs(i)*1e3).toFixed(0),o=[];if(e.danoComponentes){for(let i of t.leds)!i.quemado&&i.i*1e3>Q.quemamA&&o.push({tipo:"led_quemado",componente:i.id,corriente_mA:+(i.i*1e3).toFixed(1),mensaje:`El LED ${i.id} se quem\\xF3: le pasaron ${s(i.i)} mA y aguanta unos ${Q.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let i of t.resistencias)i.w>gi&&o.push({tipo:"resistencia_caliente",componente:i.id,potencia_W:+i.w.toFixed(2),mensaje:`La resistencia ${i.id} se calienta: disipa ${i.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let i of t.pines)if(Math.abs(i.i)*1e3>kt.maxmA){let a=i.pin.startsWith("D")?"pin "+i.pin.slice(1):"pin "+i.pin;o.push({tipo:"corriente_pin",componente:"placa."+i.pin,corriente_mA:+(Math.abs(i.i)*1e3).toFixed(1),mensaje:`El ${a} entrega ${s(i.i)} mA y aguanta ${kt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return o}var Ot={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Bt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function Si(t,e="sg90"){let s=(Ot[e]||Ot.sg90).angulos,o=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,o))}function Ws(t){let e=Ot[t]||Ot.sg90,s=90,o=90,i=null,a=0,n=!1,r=0,f=0;return{pulso(A){A<Bt.pulsoValidoMin||A>Bt.pulsoValidoMax||i!==null&&Math.abs(A-i)<Bt.bandaMuerta||(i=A,o=Si(A,t))},avanzar(A,m){if(!(m>0)){n=!1,a=0;return}let R=60/(e.seg60*1e3)*(m/Bt.voltiosRef),C=o-s,w=Math.abs(C)>.01;r=Math.min(1,Math.abs(C)/Bt.bandaGrados),w&&!n&&(a=Bt.arranqueMs,f=r),n=w,n&&(s+=Math.sign(C)*Math.min(Math.abs(C),R*A)),a=Math.max(0,a-A)},corriente(A){if(!(A>0))return 0;let{reposo:m,movimiento:R,arranque:C}=e.mA;return(a>0?m+(C-m)*f:n?m+(R-m)*r:m)/1e3*(A/Bt.voltiosRef)},estado:()=>({angulo:s,objetivo:o,pulso:i,moviendo:n,arrancando:a>0})}}var Ht=9.6/2.54,Ce=57.6,Fs=14.4,rn={x:Fs,ancho:32.2*Ht},Ri={x:Fs+(32.2-22.2)/2*Ht,ancho:22.2*Ht,alto:11.8*Ht},cn={x:Ri.x+5.9*Ht,y:Ce},ln=13.5*Ht,Ge=182.4;var fn={GND:{x:Ge,y:Ce-9.6,color:"#7a4a24"},VCC:{x:Ge,y:Ce,color:"#d7263d"},SIG:{x:Ge,y:Ce+9.6,color:"#f28c28"}};var J={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function Ke(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=J.fusible,o=(8**2-t**2)*e,i=0,a=!1;return{avanzar(n,r){let f=n/1e3;!a&&r>t?i+=(r**2-t**2)/o*f:i=Math.max(0,i-f/s),i>=1&&(a=!0),a&&i===0&&(a=!1)},get abierto(){return a},get calor(){return i},reiniciar(){i=0,a=!1}}}var Ns=(t,e=0)=>Math.max(0,(J.voltios-J.ohmios*t)/(1+J.ohmios*e));var ce=3.779527559055118,lt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Se=lt.voltiosRef/(lt.mABloqueado/1e3),Ls=lt.rpmSinCarga*lt.reduccion*2*Math.PI/60,js=lt.mASinCarga/1e3,Gt=(lt.voltiosRef-js*Se)/Ls,Ai=Gt*js/Ls,Ii=lt.tauMecanicoMs/1e3*Gt*Gt/Se;function Hs(){let t=0,e=0,s=0;return{avanzar(o,i,{conectado:a=!0,frena:n=!1}={}){let r=o/1e3;a?e=(i-Gt*t)/Se:e=n?-(Gt*t)/Se:0;let f=Gt*e-Ai*t;t+=f/Ii*r,s=(s+t/lt.reduccion*r*180/Math.PI)%360},estado(){let o=t*60/(2*Math.PI)/lt.reduccion;return{rpm:o,i:e,giro:s,velocidad:o/60*Math.PI*(lt.ruedaMM/10)}}}}var xn=64.2*ce,Ti=22.5*ce,un=40*ce,bi=11.2*ce,pn=lt.ruedaMM*ce/2,mn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-bi,y0:132-Ti/2}};var zs=3.779527559055118,Gs={llena:{nombre:"llena",voltios:8.4,color:"#2e9e44"},nominal:{nombre:"nominal",voltios:7.4,color:"#e8a20c"},descargada:{nombre:"descargada",voltios:6.4,color:"#d7263d"}},Vt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},Xs=t=>(Gs[t]||Gs.nominal).voltios,Ks=356;var qs=10,Cn=72*zs,Sn=34*zs;var Rn={POS:{x:Ks-12,y:qs+30,color:"#d7263d"},NEG:{x:Ks-12,y:qs+39.6,color:"#2b2b2b"}};var q={pinDatos:"D8",pinReloj:"D4",pinCierre:"D12",pinHabilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}},caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Mi=6.6,wi=.06,Js=4,Zs=1-Math.exp(-1/Js),yi=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Wt=(t,e=1)=>t.toFixed(e).replace(".",",");function Qs({activas:t,avisar:e}){let s=null,o=new Map,i=new Map,a=0,n=0,r=!1,f={},A=0,m={},R=0,C=0,w=0,l=0;function b(){for(let $ of Object.values(q.pwm))f[$]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};A=0,m={}}b();function M($,h){let u=(P,N)=>h(P)===h(N),x="placa.GND1",T=$.componentes.find(P=>P.tipo==="shield_l293d");s=T?{id:T.id,puente:!T.props||T.props.puentePWR!==!1}:null;let p=new Map;for(let P of $.componentes){if(P.tipo!=="bateria_lipo")continue;let N=P.props&&P.props.carga||"nominal",k=Xs(N),L=i.get(P.id),y=P.id+".POS",I=P.id+".NEG",U={carga:N,voc:k,v:L&&L.carga===N?L.v:k,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};N==="descargada"&&e({tipo:"bateria_baja",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 descargada: ${Wt(k)} V, ${Wt(k/Vt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${Wt(Vt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`});let z=ot=>s&&u(ot,s.id+".EXT_POS")||u(ot,"placa.VIN")||u(ot,"placa.5V");u(y,I)?e({tipo:"bateria_corto",componente:P.id,mensaje:`Los dos cables de la bater\\xEDa ${P.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):u(y,x)&&z(I)?e({tipo:"bateria_invertida",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):u(I,x)&&(U.valida=!0,u(y,"placa.5V")&&(U.valida=!1,e({tipo:"bateria_en_5v",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 en el pin 5V: sus ${Wt(k)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),U.motores=U.valida&&!!s&&u(y,s.id+".EXT_POS"),U.vin=U.valida&&u(y,"placa.VIN")),p.set(P.id,U)}i=p;let E=P=>{if(s){for(let k of[1,2,3,4])for(let L of["A","B"])if(u(P,`${s.id}.M${k}${L}`))return{tipo:"shield",n:k,s:L}}if(u(P,x))return{tipo:"gnd"};if(u(P,"placa.5V"))return{tipo:"5v"};for(let[k,L]of i)if(L.valida&&u(P,k+".POS"))return{tipo:"bateria",id:k};let N=yi.find(k=>u(P,"placa."+k));return N?{tipo:"pin",pin:N}:null},W=new Map;for(let P of $.componentes){if(P.tipo!=="motor_tt")continue;let k=o.get(P.id)||{logico:Hs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};k.lado=P.props&&P.props.lado||"izquierdo",k.a=E(P.id+".A"),k.b=E(P.id+".B");let L=[k.a,k.b].filter(I=>I&&I.tipo==="shield");k.canal=L.length?"M"+L[0].n:null;let y=[k.a,k.b].find(I=>I&&I.tipo==="pin");y&&e({tipo:"motor_en_pin",componente:P.id,mensaje:`El motor ${P.id} est\\xE1 conectado al pin ${y.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),W.set(P.id,k)}o=W}function v($,h,u){if(!s)return;let x=T=>h[T]===ct.High;q.pinReloj in $&&x(q.pinReloj)&&(a=(a<<1|(x(q.pinDatos)?1:0))&255),q.pinCierre in $&&x(q.pinCierre)&&(n=a),q.pinHabilita in $&&(r=h[q.pinHabilita]===ct.Low);for(let T of Object.values(q.pwm)){if(!(T in $))continue;let p=f[T],E=$[T]===ct.High;p.cambios=(p.cambios||0)+1,E&&!p.alto?Object.assign(p,{alto:!0,desde:u}):!E&&p.alto&&(p.acum+=u-p.desde,p.alto=!1)}}function V(){r=!1,b()}function At($,{v5:h,logica:u}){let x=$-A;for(let[y,I]of Object.entries(f)){I.alto&&(I.acum+=$-I.desde,I.desde=$);let U=x>0?Math.min(1,I.acum/x):0,z=m[y]||0;m[y]=(U===0||U===1)&&I.quieto>=Js?U:z+Zs*(U-z),I.quieto=I.cambios?0:(I.quieto||0)+1,I.cambios=0,I.acum=0}A=$,R=0,C=0;for(let y of i.values())y.motores&&(R=Math.max(R,y.v)),y.vin&&(C=Math.max(C,y.v));let T=C>=Mi,p=u||T,E=new Map,W=(y,I)=>E.set(y,(E.get(y)||0)+I),P=y=>{for(let[I,U]of i)if(U.motores)return W(I,y)},N=0,k=y=>y?y.tipo==="shield"?!p||!r?null:{v:n>>q.bits[y.n][y.s]&1?R:0,d:m[q.pwm[y.n]]||0,shield:!0}:y.tipo==="gnd"?{v:0,d:1}:y.tipo==="5v"?{v:h,d:1,del5V:!0}:y.tipo==="bateria"?{v:(i.get(y.id)||{v:0}).v,d:1,bateria:y.id}:null:null,L=!1;for(let[y,I]of o){let U=k(I.a),z=k(I.b),ot=U&&z?Math.min(U.d,z.d):0;if(!ot)I.vAhora=0,I.logico.avanzar(1,0,{conectado:!1});else{let nt=U.v-z.v,mt=(U.shield?1:0)+(z.shield?1:0),H=0;if(Math.abs(nt)>1e-9){let qt=t.caidaL293D&&mt?mt/2*(q.caidaV+q.caidaPorA*Math.abs(I.iAntes)):0;H=Math.sign(nt)*Math.max(0,Math.abs(nt)-qt)*ot}I.vAhora=H,I.logico.avanzar(1,H,{conectado:!0}),mt===2&&(n>>q.bits[I.a.n][I.a.s]&1)!==(n>>q.bits[I.b.n][I.b.s]&1)&&R<1&&(L=!0);let ft=I.logico.estado().i,bt=nt>=0?U:z,Y=Math.max(0,ft*Math.sign(nt||1))*ot;bt.shield?P(Y):bt.del5V?N+=Y:bt.bateria&&W(bt.bateria,Y)}let it=I.logico.estado();I.iAntes=it.i,I.sumaI+=Math.abs(it.i),I.sumaV+=Math.abs(I.vAhora||0),I.ms++;let at=I.a&&I.a.tipo==="shield"||I.b&&I.b.tipo==="shield";I.sobreMs=at&&Math.abs(it.i)>q.maximoCanalA?I.sobreMs+1:0,I.sobreMs>q.avisoCanalMs&&e({tipo:"l293d_corriente",componente:y,mensaje:`El motor ${y} pide ${Wt(Math.abs(it.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}L&&s&&e({tipo:"motores_sin_energia",componente:s.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[y,I]of i){if(!I.valida)continue;let U=(E.get(y)||0)+(I.vin&&T?wi:0);I.v=Math.max(0,I.voc-Vt.ohmios*U),I.iAntes=U,I.sumaI+=U,I.ms++,I.v/Vt.celdas<Vt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:y,mensaje:`La bater\\xEDa ${y} baj\\xF3 a ${Wt(I.v,2)} V con los motores: menos de ${Wt(Vt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return w+=R,l++,{i5V:N,porVin:T}}function st(){let $={},h={motores:[],baterias:[],shield:null};for(let[u,x]of o){let T=x.logico.estado(),p={rpm:T.rpm,giro:T.giro,velocidad:T.velocidad,i:x.ms?x.sumaI/x.ms:Math.abs(T.i),voltios:x.ms?x.sumaV/x.ms:0};$[u]=p,h.motores.push({id:u,canal:x.canal,lado:x.lado,...p}),Object.assign(x,{sumaI:0,sumaV:0,ms:0})}for(let[u,x]of i){let T={voltios:x.valida?x.v:x.voc,i:x.ms?x.sumaI/x.ms:0,carga:x.carga,conectada:x.motores||x.vin};$[u]=T,h.baterias.push({id:u,...T}),Object.assign(x,{sumaI:0,ms:0})}if(s){let u=l?w/l:R;$[s.id]={motoresV:u},h.shield={id:s.id,motoresV:u,puente:s.puente,habilitada:r,salidas:n}}return w=0,l=0,{piezas:$,lista:h}}return{armar:M,pinesCambiaron:v,reiniciarChip:V,cadaMs:At,foto:st,get hay(){return!!s||o.size>0||i.size>0}}}var Pi=60,Re=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],Ys=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ei=3,Di=1.5,vi=1/1e4,to=60,_i=Math.cos(.35*Math.PI),$i=.1*5/1024,Ui=.15,ki=100,eo=50;function oo({hex:t,circuito:e,activas:s={},semilla:o=Math.floor(Math.random()*2**32)}){let i=Vi(o),a=new Set,n=[],r={raiz:null,grupos:new Set},f=new Set,A=new Set,m=new Set,R={},C=new Map,w={},l=null,b=e,M=null,v=new Map,V=new Map,At={},st=null,$=new Map,h=new Map,u=[],x=0,T=0,p={inicio:0,clave:""},E=null,W=null,P=-1/0,N={},k=0,L=0,y=[],I=new TextDecoder("utf-8"),U=new Set,z=new Set,ot=[],it=[],at=new Map,nt=0,mt=Ke(),H=!1,ft=null,bt=0,Y=J.idealV,qt=0,Ae=0,he=0,xe=0,zt=[],Mt=Qs({activas:s,avisar:c=>Pt(c)}),Ie=0,Xt=!1,wt=()=>(nt+l.ciclos)/rt*1e3,lo=c=>Ft.reduce((d,S)=>d+c[S]*so[S],0);function ue(){l=ws(t);let c=l.estados();x=lo(c),$.set(x,c),T=0,h=new Map,u=[],p={inicio:0,clave:x},E=null,l.alCambiarPines((d,S)=>{Je();let g=$.get(x);for(let D in d)x+=(d[D]-g[D])*so[D];$.has(x)||$.set(x,{...S}),x===p.clave&&(E={tiempos:new Map(h),ciclo:l.ciclos}),P=l.ciclos;for(let D in d)N[D]=l.ciclos;yt(),at.size&&xo(d),Mt.pinesCambiaron(d,S,l.ciclos)}),l.alCadaMs(go),l.alCadaMs(es);for(let d of at.values())d.subida=null;Mt.reiniciarChip(),P=-1/0,N={},l.ponerLectorAnalogico(Co),At={},st=null,l.alByteSerial(d=>{y.push(d),L=wt()+Pi})}function Je(){let c=l.ciclos;h.set(x,(h.get(x)||0)+(c-T)),T=c}function Zt(){M=Os(b,{quemados:U,presionados:a}),v=new Map,V=new Map,ho(),Mt.armar(b,$t(b)),Qe()}function Qe(){if(!n.length){r={raiz:null,grupos:new Set};return}let c=$t(b,{presionados:a,conduccion:!0});r={raiz:c,grupos:new Set(n.map(c))}}let Ye=c=>r.grupos.size>0&&r.grupos.has(r.raiz(c)),fo=()=>Math.sin(2*Math.PI*to*(wt()/1e3))>_i;function ho(){let c=$t(b),d=(g,D)=>c(g)===c(D),S=new Map;for(let g of b.componentes){if(g.tipo!=="servo")continue;let D=Ot[g.props&&g.props.modelo]?g.props.modelo:"sg90",Z=at.get(g.id),dt=Z&&Z.modelo===D?Z:{modelo:D,logico:Ws(D),subida:null,sumaA:0,picoA:0,msVentana:0};dt.senal=Ft.find(G=>d(g.id+".SIG","placa."+G))||null;let gt=d(g.id+".GND","placa.GND1"),Et=Ft.find(G=>d(g.id+".VCC","placa."+G));dt.fuente=d(g.id+".VCC","placa.5V")?"5V":d(g.id+".VCC","placa.3V3")?"3V3":Et||null,dt.conectado=gt&&(dt.fuente==="5V"||dt.fuente==="3V3"),Et&&gt&&Pt({tipo:"servo_alimentacion",componente:g.id,mensaje:`El servo ${g.id} toma la corriente del pin ${Et.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ot[D].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),S.set(g.id,dt)}at=S}function xo(c){for(let d of at.values())!d.senal||!(d.senal in c)||(c[d.senal]===ct.High?d.subida=l.ciclos:d.subida!==null&&(d.conectado&&!H&&d.logico.pulso((l.ciclos-d.subida)/rt*1e6),d.subida=null))}let ts=c=>!c.conectado||H?0:c.fuente==="5V"?Y:3.3;function es(){Mt.hay&&({i5V:Ie,porVin:Xt}=Mt.cadaMs(l.ciclos,{v5:Y,logica:!H&&Y>J.bodV}));for(let g of at.values())g.logico.avanzar(1,ts(g));let c=H?0:J.placaA+bt+Ie,d=0;for(let g of at.values())g.conectado&&g.fuente==="5V"&&(d+=g.logico.corriente(1));Y=H?0:Xt?J.idealV:s.limiteUSB?Ns(c,d):J.idealV;let S=c;for(let g of at.values()){let D=g.logico.corriente(ts(g));g.sumaA+=D,g.picoA=Math.max(g.picoA,D),g.msVentana++,(g.fuente==="5V"||g.fuente==="3V3")&&(S+=D)}Xt&&(S=0),s.limiteUSB&&(mt.avanzar(1,S),!H&&!ft&&(Y<J.bodV?ft={motivo:"caida",amperios:S,voltios:Y}:S>J.limitePuertoA?ft={motivo:"puerto",amperios:S}:mt.abierto&&(ft={motivo:"fusible",amperios:S}))),Ae+=S,he=Math.max(he,S),xe++}function uo(){let{motivo:c,amperios:d,voltios:S}=ft;ft=null,c==="caida"?Pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),voltios:Math.round(S*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${S.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):c==="puerto"?Pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${d.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(J.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Pt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(d*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),H=!0),qt++,nt+=l.ciclos,ue(),yt()}function po(c){let d=rt/1e3,S=c;for(;S>0&&H;){let g=Math.min(S,d);nt+=g,S-=g,es(),mt.abierto||(H=!1)}S>0&&l.correr(S)}function ss(){let c=wt();zt=zt.filter(([S])=>c-S<1e3),zt.push([c,he]);let d={amperios:xe?Ae/xe:0,pico:Math.max(...zt.map(([,S])=>S)),voltios:Y,fusible:Math.round(mt.calor*100)/100,apagada:H,reinicios:qt};return Ae=0,he=0,xe=0,d}function os(){let c={};for(let[d,S]of at){let g=S.logico.estado();c[d]={modelo:S.modelo,angulo:Math.round(g.angulo*10)/10,pulso:g.pulso===null?null:Math.round(g.pulso),senal:S.senal,fuente:S.fuente,moviendo:g.moviendo,i:S.msVentana?S.sumaA/S.msVentana:S.logico.corriente(S.voltios),pico:S.picoA},S.sumaA=0,S.picoA=0,S.msVentana=0}return c}function mo(c,d,S){let g=V.get(c);if(g)return g;let D=M.flotantes(d),Z=new Set;Re.forEach((G,ht)=>{D.has(G[0])&&Z.add(ht)});let dt=new Set,gt=[];for(let G of Ys){let ht=d[G];if(ht!==ct.Input&&ht!==ct.InputPullUp)continue;if(D.has(G)){dt.add(G),gt.push([G,"aire"]);continue}let Ct=S?S.voltajes["placa."+G]:null;typeof Ct=="number"?gt.push([G,Ct>=Ei?!0:Ct<=Di?!1:null]):gt.push([G,ht===ct.InputPullUp])}let Et=Re.map(G=>{for(let ht of G){let Ct=S?S.voltajes["placa."+ht]:null;if(typeof Ct=="number")return Ct}return null});return g={canales:Z,alAire:dt,entradas:gt,analogicos:Et,refsAlAire:M.refsAlAire(d)},V.set(c,g),g}function Te(c,d){At[c]!==d&&(At[c]=d,l.ponerEntrada(c,d))}function yt(){if(!M||!l)return;let c=$.get(x)||l.estados(),d=as(x),S=mo(x,c,d);f=S.alAire;for(let[g,D]of S.entradas){if(D==="aire"){g in R||(R[g]=i()<.5),Te(g,s.entradaFlotante?R[g]:!1);continue}let Z=D===null?!!w[g]:D;w[g]=Z,Te(g,Z)}A=S.canales,d&&S.analogicos!==st&&(S.analogicos.forEach((g,D)=>{g!==null&&(!st||st[D]!==g)&&l.ponerAnalogico(D,g)}),st=S.analogicos),m=S.refsAlAire}function go(){if(!(!s.entradaFlotante||!f.size))for(let c of f){let d=Ye("placa."+c)?fo():i()<vi?!R[c]:R[c];d!==R[c]&&(R[c]=d,Te(c,d))}}function Co(c,d){if(A.has(c)){if(!s.entradaFlotante)return 0;if(Ye("placa."+Re[c][0]))return 2.5+2.5*Math.sin(2*Math.PI*to*(wt()/1e3));let S=C.has(c)?C.get(c):1+3*i(),g=Math.max(0,Math.min(5,S+is()*Ui));return C.set(c,g),g}return s.ruidoADC?d+is()*$i:d}function is(){return Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i())}function Pt(c){let d=c.tipo+"|"+c.componente;return z.has(d)?!1:(z.add(d),ot.push(c),it.push(c),!0)}function as(c){for(let d=0;d<4;d++){let S=v.get(c);if(S)return S;M.ponerPines($.get(c));let g=null;try{g=M.resolver()}catch{g=null}if(k++,!g||!g.convergio)return Pt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;v.set(c,g);let D=!1;for(let Z of[...M.fallasFijas,...Vs(g,s)])Pt(Z)&&Z.tipo==="led_quemado"&&(U.add(Z.componente),D=!0);if(!D)return g;Zt()}return v.get(c)||null}function So(){if(H)return Ro();Je();let c=h;if(E&&E.ciclo>p.inicio){c=E.tiempos;let j=new Map;for(let[X,It]of h){let cs=It-(E.tiempos.get(X)||0);cs>0&&j.set(X,cs)}h=j,p={inicio:E.ciclo,clave:p.clave}}else h=new Map,p={inicio:l.ciclos,clave:x};E=null;let d=[...c].filter(([,j])=>j>0);d.length||(d=u.length?u:[[x,1]]),u=d;let S=d.reduce((j,[,X])=>j+X,0),g=[];for(let[j,X]of d){let It=as(j);if(!It){g.length=0;break}g.push([It,X/S])}let D=g.length?Oi(g):null,Z=new Set(Ft.filter(j=>j in N&&l.ciclos-N[j]<eo/1e3*rt));D&&(D.pwm=Bi(d,S,Z)),To(D),st=null;let gt=l.ciclos-P>eo/1e3*rt?1:1-Math.exp(-(S/rt*1e3)/ki);W=D?qe(D,W,gt):null;let Et=l.estados(),G=y.length?I.decode(Uint8Array.from(y),{stream:!0}):"";y=[];let ht=os(),Ct=ss(),rs=Mt.foto();if(bt=W?W.fuentes.reduce((j,X)=>j+Math.max(0,X.i),0):0,W){W.usb=Ct,W.servos=Object.entries(ht).map(([X,It])=>({id:X,...It}));let j=(W.fuentes.find(X=>X.pin==="5V")||{i:0}).i;W.consumo5V=j+W.servos.filter(X=>X.fuente==="5V").reduce((X,It)=>X+It.i,0),Object.assign(W,rs.lista,{porVin:Xt})}let Mo=it;return it=[],{msSimulados:wt(),servos:ht,piezas:rs.piezas,evaluaciones:k,leds:Object.fromEntries((W?W.leds:[]).map(j=>[j.id,j.brillo])),quemados:[...U],voltajes:Ao(),entradas:Io(),placa:{led13:Et.D13===ct.High,ledTX:wt()<L},serial:G,fallas:Mo,medicion:W,energia:Ct}}function Ro(){let c=it;return it=[],{msSimulados:wt(),evaluaciones:k,servos:os(),piezas:Mt.foto().piezas,energia:ss(),leds:{},quemados:[...U],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:c,medicion:null}}function Ao(){if(!W)return{};if(!m.size)return W.voltajes;let c={...W.voltajes};for(let d of m)d in c&&(c[d]=null);return c}function Io(){let c={};for(let d of Ys)f.has(d)?c[d]={alto:!!s.entradaFlotante&&!!R[d],alAire:!0}:d in w&&(c[d]={alto:w[d],alAire:!1});return c}function To(c=W){c&&Re.forEach((d,S)=>{for(let g of d){let D=c.voltajes["placa."+g];if(typeof D=="number")return l.ponerAnalogico(S,D)}})}function bo(){U.clear(),z.clear(),ot.length=0,it=[],y=[],I=new TextDecoder("utf-8"),L=0,ns(),ue(),Zt(),yt()}function ns(){nt=0,H=!1,ft=null,zt=[],mt.reiniciar(),Y=J.idealV,Ie=0,Xt=!1}return ue(),Zt(),yt(),{get ciclos(){return nt+l.ciclos},avanzar(c){if(H)return po(c);l.correr(c),ft&&uo()},foto:So,ponerCircuito(c){b=c,Zt(),yt()},ponerMano(c){n=Array.isArray(c)?c.filter(d=>typeof d=="string"):[],Qe()},ponerPulsador(c,d){d?a.add(c):a.delete(c),Zt(),yt()},enviarSerial:c=>l.enviarSerial(String(c)),reiniciarChip(){ns(),ue(),yt()},reiniciarTodo(){qt=0,bo()},fallas:()=>[...ot]}}function Bi(t,e,s=new Set){let o={},i=new Set;for(let[r,f]of t)for(let A=0;A<Ft.length;A++){let m=Math.floor(r/4**A)%4===ct.High;o[A]=(o[A]||0)+(m?f:0),i.add(A)}let a=Ft,n={};for(let r of i){let f=o[r]/e;(f>0&&f<1||s.has(a[r]))&&(n[a[r]]=Math.round(f*1e3)/1e3)}return n}var Ft=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],so=Object.fromEntries(Ft.map((t,e)=>[t,4**e]));function Oi(t){if(t.length===1)return t[0][0];let e=t[0][0],s=n=>n.reduce((r,[,f])=>r+f,0),o=n=>{let r=0;for(let[f,A]of t){let m=n(f);if(m==null)return null;r+=A*m}return r},i=(n,r,f)=>[...new Set(t.flatMap(([m])=>m[n].map(R=>R[r])))].map(m=>{let R={[r]:m},C=t.filter(([l])=>l[n].some(b=>b[r]===m)),w=s(C);for(let l of f)l==="i"?R.i=t.reduce((b,[M,v])=>b+v*((M[n].find(V=>V[r]===m)||{i:0}).i||0),0):R[l]=w?C.reduce((b,[M,v])=>b+v*(M[n].find(V=>V[r]===m)[l]||0),0)/w:null;return R}),a={};for(let n of Object.keys(e.voltajes))a[n]=o(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:a,leds:e.leds.map((n,r)=>{let f=o(A=>A.leds[r]?A.leds[r].i:0);return{id:n.id,quemado:t.some(([A])=>A.leds[r]&&A.leds[r].quemado),v:o(A=>A.leds[r]?A.leds[r].v:null),i:f,brillo:Math.max(0,Math.min(1,f*1e3/Q.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:o(f=>f.resistencias[r].v),i:o(f=>f.resistencias[r].i),w:o(f=>f.resistencias[r].w)})),pines:i("pines","pin",["v","i"]),fuentes:i("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:o(f=>f.potenciometros[r].v),i:o(f=>f.potenciometros[r].i)}))}}function qe(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let o=a=>a&&typeof a=="object"?a.id||a.pin:void 0,i=new Map((Array.isArray(e)?e:[]).map(a=>[o(a),a]));return t.map((a,n)=>qe(a,o(a)!==void 0?i.get(o(a)):(e||[])[n],s))}if(t&&typeof t=="object"){let o={};for(let i of Object.keys(t))o[i]=qe(t[i],e&&typeof e=="object"?e[i]:void 0,s);return o}return t}function Vi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Wi=16,Fi=8,Ni=50,Li=500,le=rt/1e3,et=null,fe=!1,io=0,Tt=0,ze=0,ao=0,Ze=0,Xe=!1,Kt=[],no=new MessageChannel;no.port1.onmessage=ro;function ro(){Xe=!1,Hi()}function co(t){Xe||(Xe=!0,t>0?setTimeout(ro,t):no.port2.postMessage(null))}function ji(t){for(;Kt.length&&t-Kt[0][0]>Li;)Kt.shift();let e=0,s=0;for(let[,o,i]of Kt)e+=o,s+=i;return e>0?Math.min(1,s/(e*le)):1}function de(t=performance.now()){ao=t;let e=et.foto();self.postMessage({tipo:"foto",corrida:io,...e,velocidad:ji(t),msReales:Ze})}function Hi(){if(!fe||!et)return;let t=performance.now(),e=Math.max(0,t-ze);ze=t,Ze+=e,Tt=Math.min(Tt+e*le,Ni*le);let s=performance.now(),o=0;for(;Tt>=1&&performance.now()-s<Fi;){let i=et.ciclos;et.avanzar(Math.min(Math.floor(Tt),le));let a=et.ciclos-i;Tt-=a,o+=a}Kt.push([t,e,o]),t-ao>=Wi&&de(t),co(Tt>=le?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(io=e.corrida),e.tipo){case"crear":et=oo({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(et.reiniciarTodo(),Ze=0),fe=!0,Tt=0,ze=performance.now(),Kt.length=0,de(),co(0);break;case"pausar":fe=!1;break;case"reiniciar":et.reiniciarChip(),Tt=0,de();break;case"detener":fe=!1;break;case"circuito":et.ponerCircuito(e.circuito),e.mostrar&&de();break;case"serial":et.enviarSerial(e.texto);break;case"pulsador":et.ponerPulsador(e.id,e.presionado),fe||de();break;case"mano":et.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function Bn(e={}){let{lienzo:t,hex:o}=e,n=e.placa||"uno";if(n!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");qn(o);let a=e.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(ti.map(M=>[M,a==="realista"]));Object.assign(c,e.noIdealidades||{});let i=typeof e.alEvento=="function"?e.alEvento:null,p={serial:[],falla:[],estado:[]},l="detenido",f=!0,g=0,x=null,v=0,C={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},y=null,$=0,L=[],O=ei(H);O.enviar({tipo:"crear",hex:o,circuito:t.circuito(),activas:c});function H(M){if(!f)return;if(M.tipo==="error")return console.error("TecnoCircuito:",M.mensaje);if(M.tipo!=="foto"||M.corrida!==g||l==="detenido")return;Object.assign(C,{msSimulados:M.msSimulados,msReales:M.msReales,velocidad:M.velocidad,evaluaciones:M.evaluaciones}),y=M.medicion?{...M.medicion,voltajes:M.voltajes,entradas:M.entradas}:null;for(let R of M.fallas){L.push(R),p.falla.forEach(E=>Ct(E,{tipo:R.tipo,componente:R.componente,mensaje:R.mensaje}));let{mensaje:j,...Tt}=R;Pt("falla",Tt)}let q=M.energia?M.energia.reinicios:0;q>$&&Pt("reinicio_placa",{motivo:"energia_usb",nuevos:q-$,total:q}),$=q,M.serial&&p.serial.forEach(R=>Ct(R,M.serial)),x=M,v||(v=requestAnimationFrame(ct))}function ct(){if(v=0,l==="detenido"||!x)return t._mostrar({simulando:l!=="detenido"});t._mostrar({simulando:!0,leds:x.leds,quemados:x.quemados,voltajes:x.voltajes,servos:x.servos||{},piezas:x.piezas||{},placa:{ledPower:x.placa.encendida!==!1,led13:x.placa.led13,ledTX:x.placa.ledTX}})}function Ct(M,q){try{M(q)}catch(R){console.error(R)}}function Pt(M,q){i&&Ct(i,{t:Date.now(),origen:"simulador",tipo:M,datos:q})}function xt(M){l=M,p.estado.forEach(q=>Ct(q,M))}return typeof t._alAcercar=="function"&&t._alAcercar(M=>{f&&O.enviar({tipo:"mano",refs:M})}),typeof t._alPulsar=="function"&&t._alPulsar((M,q)=>{f&&O.enviar({tipo:"pulsador",id:M,presionado:q})}),t.alCambiar(M=>{f&&O.enviar({tipo:"circuito",circuito:M,mostrar:l!=="detenido",corrida:g})}),{iniciar(){if(!f||l==="corriendo")return;let M=l==="detenido";g++,M&&(L.length=0,y=null,x=null,$=0,Object.assign(C,{msSimulados:0,msReales:0,velocidad:1}),Pt("simulacion_iniciada",{placa:n,modo:a})),xt("corriendo"),O.enviar({tipo:"iniciar",nuevo:M,corrida:g})},pausar(){l==="corriendo"&&(g++,O.enviar({tipo:"pausar",corrida:g}),xt("pausado"))},reiniciar(){!f||l==="detenido"||(g++,C.msSimulados=0,O.enviar({tipo:"reiniciar",corrida:g}),O.enviar({tipo:"iniciar",nuevo:!1,corrida:g}),$=0,Pt("reinicio_placa",{motivo:"boton"}),xt("reiniciado"),xt("corriendo"))},detener(){l!=="detenido"&&(g++,O.enviar({tipo:"detener",corrida:g}),Pt("simulacion_detenida",{ms_simulados:Math.round(C.msSimulados)}),xt("detenido"),y=null,ct())},serialEnviar(M){l!=="detenido"&&O.enviar({tipo:"serial",texto:String(M)})},alSerial:M=>typeof M=="function"&&p.serial.push(M),alFalla:M=>typeof M=="function"&&p.falla.push(M),alEstado:M=>typeof M=="function"&&p.estado.push(M),medidas:()=>({...C,estado:l,hilo:O.hilo()}),destruir(){f&&(this.detener(),f=!1,cancelAnimationFrame(v),O.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>l==="detenido"||!y?null:{...y,fallas:[...L],modo:a,activas:c},_mediciones(){return this.mediciones()}}}function ei(e){let t=null,o="worker",n=!1,a=[],c=p=>{if(p&&p.tipo==="listo"){n=!0,a.length=0;return}e(p)};function i(){o="pagina",t=oi(c),a.splice(0).forEach(p=>t.postMessage(p))}try{if(!sr||typeof Worker!="function")throw new Error("sin Worker");let p=URL.createObjectURL(new Blob([sr],{type:"text/javascript"})),l=new Worker(p);l.onmessage=f=>{f.data&&f.data.tipo==="listo"&&URL.revokeObjectURL(p),c(f.data)},l.onerror=f=>{if(n)return console.error("TecnoCircuito:",f.message);f.preventDefault(),l.terminate(),i()},t=l}catch{i()}return{enviar(p){!n&&o==="worker"&&a.push(p),t.postMessage(p)},terminar:()=>t&&t.terminate(),hilo:()=>o}}function oi(e){let t={onmessage:null,postMessage:o=>setTimeout(()=>e(o))};return new Function("self",sr)(t),{postMessage:o=>setTimeout(()=>t.onmessage&&t.onmessage({data:o})),terminate:()=>t.onmessage=null}}var Re=(e,t)=>e.toFixed(t).replace(".",","),Mt=e=>e==null?"al aire":Re(e,2)+" V",gt=e=>Re(e*1e3,Math.abs(e)<.01?2:1)+" mA",Un=(e,t)=>(e>=1e3?Re(e/1e3,t)+" k":e+" ")+"\u03A9",Hn=e=>"Pin "+e.replace(/^D/,"");function Xn(e){if(!e||!e.leds)return[];let t=(l,f,g,x)=>({pieza:l,voltaje:f||"",corriente:g||"",detalle:x||""}),o=l=>{let f=e.entradas&&e.entradas[l];return f?f.alAire?`al aire: lee ${f.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:f.alto?"lee ALTO":"lee BAJO":""},n=new Set(e.pines.map(l=>l.pin)),a=e.servos||[],c=l=>a.find(f=>f.senal===l&&f.pulso),i=l=>{let f=c(l.pin);if(f)return`se\xF1al de servo: pulso de ${f.pulso} \xB5s`;let g=e.pwm&&e.pwm[l.pin];return g>.005&&g<.995?`PWM ${Math.round(g*100)} %`:o(l.pin)},p=e.usb;return[...e.pines.map(l=>t(Hn(l.pin),Mt(l.v),gt(l.i),i(l))),...Object.keys(e.entradas||{}).filter(l=>!n.has(l)&&"placa."+l in e.voltajes).map(l=>t(Hn(l)+" (entrada)",Mt(e.voltajes["placa."+l]),"",o(l))),...(e.potenciometros||[]).map(l=>t(`${l.id} (${Un(l.ohmios,0)})`,Mt(l.v),gt(l.i),`perilla ${Math.round(l.posicion*100)} %`)),...e.resistencias.map(l=>t(`${l.id} (${Un(l.ohmios,1)})`,Mt(l.v),gt(l.i),Re(l.w*1e3,1)+" mW")),...e.leds.map(l=>t(l.id,Mt(l.v),gt(l.i),l.quemado?"quemado":`brillo ${Math.round(l.brillo*100)} %`)),...a.map(l=>t(`${l.id} (${l.modelo.toUpperCase()})`,"",gt(l.i),l.fuente?l.senal?`${Math.round(l.angulo)}\xB0${l.moviendo?", movi\xE9ndose":""}${l.pulso?` \xB7 pulso ${l.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...e.shield?[t(`${e.shield.id}: motores (EXT_PWR)`,Mt(e.shield.motoresV),"",e.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${e.shield.puente?"puesto":"quitado"}${e.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(e.motores||[]).map(l=>{let f=Math.abs(l.velocidad),g=Math.sign(l.velocidad)*(l.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return t(`${l.id} (${l.canal||"sin shield"})`,Mt(l.voltios),gt(l.i),Math.abs(l.rpm)<1?"quieto":`${Math.round(Math.abs(l.rpm))} RPM \xB7 ${g} ${Math.round(f)} cm/s`)}),...(e.baterias||[]).map(l=>t(`${l.id} (LiPo 2S)`,Mt(l.voltios),l.conectada?gt(l.i):"",`${Re(l.voltios/2,2)} V por celda${l.voltios/2<3.3?" \xB7 c\xE1rgala":""}${l.conectada?"":" \xB7 sin conectar"}`)),...a.length?[t("5V de la placa (USB)","",gt(e.consumo5V),"el USB da hasta 500 mA")]:[],...p&&(a.length||p.reinicios||p.pico>.2)?[t("USB (placa y circuito)",Mt(p.voltios),gt(p.amperios),`pico ${gt(p.pico)} \xB7 fusible ${Math.round(p.fusible*100)} %${p.reinicios?` \xB7 ${p.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(de)),crearLienzo:Vn,crearSimulador:Bn,filasDeMediciones:Xn});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
