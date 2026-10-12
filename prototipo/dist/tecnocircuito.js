(()=>{var Fo=globalThis,Ho=Fo.ShadowRoot&&(Fo.ShadyCSS===void 0||Fo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$a=Symbol(),hs=new WeakMap,ro=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==$a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ho&&e===void 0){let i=o!==void 0&&o.length===1;i&&(e=hs.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&hs.set(o,e))}return e}toString(){return this.cssText}},us=t=>new ro(typeof t=="string"?t:t+"",void 0,$a),Tt=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((i,s,c)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[c+1],t[0]);return new ro(o,t,$a)},ms=(t,e)=>{if(Ho)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let i=document.createElement("style"),s=Fo.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}},_a=Ho?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let i of e.cssRules)o+=i.cssText;return us(o)})(t):t;var{is:Rn,defineProperty:En,getOwnPropertyDescriptor:Pn,getOwnPropertyNames:Tn,getOwnPropertySymbols:In,getPrototypeOf:Mn}=Object,qo=globalThis,xs=qo.trustedTypes,Dn=xs?xs.emptyScript:"",On=qo.reactiveElementPolyfillSupport,no=(t,e)=>t,co={toAttribute(t,e){switch(e){case Boolean:t=t?Dn:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Xo=(t,e)=>!Rn(t,e),gs={attribute:!0,type:String,converter:co,reflect:!1,useDefault:!1,hasChanged:Xo};Symbol.metadata??=Symbol("metadata"),qo.litPropertyMetadata??=new WeakMap;var qt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=gs){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,o);s!==void 0&&En(this.prototype,e,s)}}static getPropertyDescriptor(e,o,i){let{get:s,set:c}=Pn(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:s,set(n){let d=s?.call(this);c?.call(this,n),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??gs}static _$Ei(){if(this.hasOwnProperty(no("elementProperties")))return;let e=Mn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(no("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(no("properties"))){let o=this.properties,i=[...Tn(o),...In(o)];for(let s of i)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[i,s]of o)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let s=this._$Eu(o,i);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)o.unshift(_a(s))}else e!==void 0&&o.push(_a(e));return o}static _$Eu(e,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ms(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let c=(i.converter?.toAttribute!==void 0?i.converter:co).toAttribute(o,i.type);this._$Em=e,c==null?this.removeAttribute(s):this.setAttribute(s,c),this._$Em=null}}_$AK(e,o){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let c=i.getPropertyOptions(s),n=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:co;this._$Em=s;let d=n.fromAttribute(o,c.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,o,i,s=!1,c){if(e!==void 0){let n=this.constructor;if(s===!1&&(c=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??Xo)(c,o)||i.useDefault&&i.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:s,wrapped:c},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),c!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,c]of this._$Ep)this[s]=c;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,c]of i){let{wrapped:n}=c,d=this[s];n!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,c,d)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};qt.elementStyles=[],qt.shadowRootOptions={mode:"open"},qt[no("elementProperties")]=new Map,qt[no("finalized")]=new Map,On?.({ReactiveElement:qt}),(qo.reactiveElementVersions??=[]).push("2.1.2");var Ma=globalThis,bs=t=>t,Ko=Ma.trustedTypes,ys=Ko?Ko.createPolicy("lit-html",{createHTML:t=>t}):void 0,_s="$lit$",oe=`lit$${Math.random().toFixed(9).slice(2)}$`,ws="?"+oe,kn=`<${ws}>`,be=document,po=()=>be.createComment(""),fo=t=>t===null||typeof t!="object"&&typeof t!="function",Da=Array.isArray,Nn=t=>Da(t)||typeof t?.[Symbol.iterator]=="function",wa=`[ 	
\f\r]`,lo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Ss=/>/g,xe=RegExp(`>|${wa}(?:([^\\s"'>=/]+)(${wa}*=${wa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vs=/'/g,As=/"/g,Rs=/^(?:script|style|textarea|title)$/i,Oa=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),yt=Oa(1),Kt=Oa(2),el=Oa(3),Xt=Symbol.for("lit-noChange"),ot=Symbol.for("lit-nothing"),$s=new WeakMap,ge=be.createTreeWalker(be,129);function Es(t,e){if(!Da(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ys!==void 0?ys.createHTML(e):e}var Vn=(t,e)=>{let o=t.length-1,i=[],s,c=e===2?"<svg>":e===3?"<math>":"",n=lo;for(let d=0;d<o;d++){let l=t[d],u,b,y=-1,$=0;for(;$<l.length&&(n.lastIndex=$,b=n.exec(l),b!==null);)$=n.lastIndex,n===lo?b[1]==="!--"?n=Cs:b[1]!==void 0?n=Ss:b[2]!==void 0?(Rs.test(b[2])&&(s=RegExp("</"+b[2],"g")),n=xe):b[3]!==void 0&&(n=xe):n===xe?b[0]===">"?(n=s??lo,y=-1):b[1]===void 0?y=-2:(y=n.lastIndex-b[2].length,u=b[1],n=b[3]===void 0?xe:b[3]==='"'?As:vs):n===As||n===vs?n=xe:n===Cs||n===Ss?n=lo:(n=xe,s=void 0);let I=n===xe&&t[d+1].startsWith("/>")?" ":"";c+=n===lo?l+kn:y>=0?(i.push(u),l.slice(0,y)+_s+l.slice(y)+oe+I):l+oe+(y===-2?d:I)}return[Es(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ho=class t{constructor({strings:e,_$litType$:o},i){let s;this.parts=[];let c=0,n=0,d=e.length-1,l=this.parts,[u,b]=Vn(e,o);if(this.el=t.createElement(u,i),ge.currentNode=this.el.content,o===2||o===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(s=ge.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let y of s.getAttributeNames())if(y.endsWith(_s)){let $=b[n++],I=s.getAttribute(y).split(oe),v=/([.?@])?(.*)/.exec($);l.push({type:1,index:c,name:v[2],strings:I,ctor:v[1]==="."?Ea:v[1]==="?"?Pa:v[1]==="@"?Ta:Ne}),s.removeAttribute(y)}else y.startsWith(oe)&&(l.push({type:6,index:c}),s.removeAttribute(y));if(Rs.test(s.tagName)){let y=s.textContent.split(oe),$=y.length-1;if($>0){s.textContent=Ko?Ko.emptyScript:"";for(let I=0;I<$;I++)s.append(y[I],po()),ge.nextNode(),l.push({type:2,index:++c});s.append(y[$],po())}}}else if(s.nodeType===8)if(s.data===ws)l.push({type:2,index:c});else{let y=-1;for(;(y=s.data.indexOf(oe,y+1))!==-1;)l.push({type:7,index:c}),y+=oe.length-1}c++}}static createElement(e,o){let i=be.createElement("template");return i.innerHTML=e,i}};function ke(t,e,o=t,i){if(e===Xt)return e;let s=i!==void 0?o._$Co?.[i]:o._$Cl,c=fo(e)?void 0:e._$litDirective$;return s?.constructor!==c&&(s?._$AO?.(!1),c===void 0?s=void 0:(s=new c(t),s._$AT(t,o,i)),i!==void 0?(o._$Co??=[])[i]=s:o._$Cl=s),s!==void 0&&(e=ke(t,s._$AS(t,e.values),s,i)),e}var Ra=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:i}=this._$AD,s=(e?.creationScope??be).importNode(o,!0);ge.currentNode=s;let c=ge.nextNode(),n=0,d=0,l=i[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new uo(c,c.nextSibling,this,e):l.type===1?u=new l.ctor(c,l.name,l.strings,this,e):l.type===6&&(u=new Ia(c,this,e)),this._$AV.push(u),l=i[++d]}n!==l?.index&&(c=ge.nextNode(),n++)}return ge.currentNode=be,s}p(e){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}},uo=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,s){this.type=2,this._$AH=ot,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=ke(this,e,o),fo(e)?e===ot||e==null||e===""?(this._$AH!==ot&&this._$AR(),this._$AH=ot):e!==this._$AH&&e!==Xt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ot&&fo(this._$AH)?this._$AA.nextSibling.data=e:this.T(be.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ho.createElement(Es(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(o);else{let c=new Ra(s,this),n=c.u(this.options);c.p(o),this.T(n),this._$AH=c}}_$AC(e){let o=$s.get(e.strings);return o===void 0&&$s.set(e.strings,o=new ho(e)),o}k(e){Da(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,s=0;for(let c of e)s===o.length?o.push(i=new t(this.O(po()),this.O(po()),this,this.options)):i=o[s],i._$AI(c),s++;s<o.length&&(this._$AR(i&&i._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let i=bs(e).nextSibling;bs(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ne=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,s,c){this.type=1,this._$AH=ot,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=c,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ot}_$AI(e,o=this,i,s){let c=this.strings,n=!1;if(c===void 0)e=ke(this,e,o,0),n=!fo(e)||e!==this._$AH&&e!==Xt,n&&(this._$AH=e);else{let d=e,l,u;for(e=c[0],l=0;l<c.length-1;l++)u=ke(this,d[i+l],o,l),u===Xt&&(u=this._$AH[l]),n||=!fo(u)||u!==this._$AH[l],u===ot?e=ot:e!==ot&&(e+=(u??"")+c[l+1]),this._$AH[l]=u}n&&!s&&this.j(e)}j(e){e===ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ea=class extends Ne{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ot?void 0:e}},Pa=class extends Ne{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ot)}},Ta=class extends Ne{constructor(e,o,i,s,c){super(e,o,i,s,c),this.type=5}_$AI(e,o=this){if((e=ke(this,e,o,0)??ot)===Xt)return;let i=this._$AH,s=e===ot&&i!==ot||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,c=e!==ot&&(i===ot||s);s&&this.element.removeEventListener(this.name,this,i),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ia=class{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ke(this,e)}};var Un=Ma.litHtmlPolyfillSupport;Un?.(ho,uo),(Ma.litHtmlVersions??=[]).push("3.3.3");var Ps=(t,e,o)=>{let i=o?.renderBefore??e,s=i._$litPart$;if(s===void 0){let c=o?.renderBefore??null;i._$litPart$=s=new uo(e.insertBefore(po(),c),c,void 0,o??{})}return s._$AI(t),s};var ka=globalThis,ct=class extends qt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ps(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Xt}};ct._$litElement$=!0,ct.finalized=!0,ka.litElementHydrateSupport?.({LitElement:ct});var Bn=ka.litElementPolyfillSupport;Bn?.({LitElement:ct});(ka.litElementVersions??=[]).push("4.2.2");var Ut=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var jn={attribute:!0,type:String,converter:co,reflect:!1,hasChanged:Xo},Ln=(t=jn,e,o)=>{let{kind:i,metadata:s}=o,c=globalThis.litPropertyMetadata.get(s);if(c===void 0&&globalThis.litPropertyMetadata.set(s,c=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),i==="accessor"){let{name:n}=o;return{set(d){let l=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,l,t,!0,d)},init(d){return d!==void 0&&this.C(n,void 0,t,d),d}}}if(i==="setter"){let{name:n}=o;return function(d){let l=this[n];e.call(this,d),this.requestUpdate(n,l,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function L(t){return(e,o)=>typeof o=="object"?Ln(t,e,o):((i,s,c)=>{let n=s.hasOwnProperty(c);return s.constructor.createProperty(c,i),n?Object.getOwnPropertyDescriptor(s,c):void 0})(t,e,o)}var ye=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function Ts(t,e){return(o,i,s)=>{let c=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:d}=typeof i=="object"?o:s??(()=>{let l=Symbol();return{get(){return this[l]},set(u){this[l]=u}}})();return ye(o,i,{get(){let l=n.call(this);return l===void 0&&(l=c(this),(l!==null||this.hasUpdated)&&d.call(this,l)),l}})}return ye(o,i,{get(){return c(this)}})}}var Is=Kt`
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
`;var It=t=>({type:"analog",channel:t}),mo=(t,e=0)=>({type:"i2c",signal:t,bus:e}),xo=(t,e=0)=>({type:"spi",signal:t,bus:e}),Na=(t,e=0)=>({type:"usart",signal:t,bus:e});var Ve=[" ","Spacebar"];function Gn(){return typeof navigator=="object"?navigator.userAgent:""}function zn(){return Gn().indexOf("Macintosh")>=0}function Ms(t){return zn()?t.metaKey:t.ctrlKey}var Ce=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(c=(s<3?n(c):s>3?n(e,o,c):n(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},ae=class extends ct{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[It(5),mo("SCL")]},{name:"A4.2",x:97,y:9,signals:[It(4),mo("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[xo("SCK")]},{name:"12",x:134.5,y:9,signals:[xo("MISO")]},{name:"11",x:144,y:9,signals:[xo("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[xo("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[Na("TX")]},{name:"0",x:255.5,y:9,signals:[Na("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[It(0)]},{name:"A1",x:217.5,y:191.5,signals:[It(1)]},{name:"A2",x:227,y:191.5,signals:[It(2)]},{name:"A3",x:236.5,y:191.5,signals:[It(3)]},{name:"A4",x:246,y:191.5,signals:[It(4),mo("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[It(5),mo("SCL")]}]}static get styles(){return Tt`
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
    `}render(){let{ledPower:e,led13:o,ledRX:i,ledTX:s}=this;return yt`
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

        ${Is}

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
          @keydown=${c=>Ve.includes(c.key)&&this.down()}
          @keyup=${c=>Ve.includes(c.key)&&this.up()}
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
          ${e&&Kt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&Kt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${s&&Kt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${i&&Kt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};Ce([L()],ae.prototype,"led13",void 0);Ce([L()],ae.prototype,"ledRX",void 0);Ce([L()],ae.prototype,"ledTX",void 0);Ce([L()],ae.prototype,"ledPower",void 0);Ce([L()],ae.prototype,"resetPressed",void 0);Ce([Ts("#reset-button")],ae.prototype,"resetButton",void 0);ae=Ce([Ut("wokwi-arduino-uno")],ae);var Ds=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(c=(s<3?n(c):s>3?n(e,o,c):n(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Va={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},Ua=class extends ct{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return Tt`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,i=Math.round(e/10**o);return e===0?[0,0]:[Math.round(i%100),o]}render(){let{value:e}=this,o=parseFloat(e),[i,s]=this.breakValue(o),c=Va[Math.floor(i/10)],n=Va[i%10],d=Va[s];return yt`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${n}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${d}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};Ds([L()],Ua.prototype,"value",void 0);Ua=Ds([Ut("wokwi-resistor")],Ua);var Se=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(c=(s<3?n(c):s>3?n(e,o,c):n(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Wn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},ie=class extends ct{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return Tt`
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
    `}update(e){e.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(e)}renderSVG(){let{color:e,lightColor:o,flip:i}=this,s=o||Wn[e?.toLowerCase()]||e,c=this.brightness?.3+this.brightness*.7:0,n=this.value&&this.brightness>Number.EPSILON;return yt`<svg
      width="40"
      height="50"
      transform="scale(${i?-1:1} 1)"
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
        fill="${e}"
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
      <g class="light" style="display: ${n?"":"none"}">
        <ellipse
          cx="8"
          cy="10"
          rx="10"
          ry="10"
          fill="${s}"
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
    </svg> `}render(){return yt`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};Se([L()],ie.prototype,"value",void 0);Se([L()],ie.prototype,"brightness",void 0);Se([L()],ie.prototype,"color",void 0);Se([L()],ie.prototype,"lightColor",void 0);Se([L()],ie.prototype,"label",void 0);Se([L({type:Boolean})],ie.prototype,"flip",void 0);ie=Se([Ut("wokwi-led")],ie);var Os={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ks=t=>(...e)=>({_$litDirective$:t,values:e}),Jo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,i){this._$Ct=e,this._$AM=o,this._$Ci=i}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var Ns="important",Fn=" !"+Ns,Vs=ks(class extends Jo{constructor(t){if(super(t),t.type!==Os.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let i=t[o];return i==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?o.removeProperty(i):o[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let c=typeof s=="string"&&s.endsWith(Fn);i.includes("-")||c?o.setProperty(i,c?s.slice(0,-11):s,c?Ns:""):o[i]=s}}return Xt}});var Yo=(t,e,o)=>{let i=Math.min(o,e);return Math.max(i,t)};function Us(t,e){let o=e.transformPoint({x:t.left,y:t.top}),i=e.transformPoint({x:t.right,y:t.top}),s=e.transformPoint({x:t.left,y:t.bottom}),c=e.transformPoint({x:t.right,y:t.bottom}),n=Math.min(o.x,i.x,s.x,c.x),d=Math.min(o.y,i.y,s.y,c.y),l=Math.max(o.x,i.x,s.x,c.x),u=Math.max(o.y,i.y,s.y,c.y);return new DOMRect(n,d,l-n,u-d)}function Bs(t,e,o){let{userAgent:i}=navigator;if(i.indexOf("Epiphany")>=0||i.indexOf("Safari")>=0){let c=t.getCTM(),n=e?.getCTM(),d=e?.getBoundingClientRect(),l=e?.ownerSVGElement?.getBoundingClientRect();if(!d||!l||!n||!c)return null;let u=l.x+l.width/2,b=l.y+l.height/2,y=u-(d.x+d.width/2),$=b-(d.y+d.height/2),I=Math.atan2($,y)/Math.PI*180,v=new DOMMatrix().rotate(I),D=Us(o,v),k=D.width/d.width,B=D.height/d.height,Rt=n.inverse().multiply(c);return v.inverse().translate(D.left,D.top).multiply(Rt.inverse()).scale(k,B).translate(-d.left,-d.top)}else return t.getScreenCTM()?.inverse()||null}var ve=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(c=(s<3?n(c):s>3?n(e,o,c):n(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Zo={x:9.91,y:8.18},se=class extends ct{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[It(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return Tt`
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
    `}mapToMinMax(e,o,i){return e*(i-o)+o}percentFromMinMax(e,o,i){return(e-o)/(i-o)}renderSVG(){let e=Yo(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return yt`<svg
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
      style=${Vs({"--knob-angle":o+"deg"})}
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
        cx=${Zo.x}
        cy=${Zo.y}
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
    </svg>`}render(){return yt`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?Bs(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",i=o?e.touches[0].pageX:e.pageX,s=o?e.touches[0].pageY:e.pageY,c=new DOMPointReadOnly(i,s).matrixTransform(this.pageToKnobMatrix),n=Zo.x-c.x,d=Zo.y-c.y,l=Math.round(Math.atan2(d,n)*180/Math.PI);l<0&&(l+=360),l-=90,n>0&&d<=0&&l>0&&(l-=360),l=Yo(this.startDegree,this.endDegree,l);let u=this.percentFromMinMax(l,this.startDegree,this.endDegree),b=this.mapToMinMax(u,this.min,this.max);this.updateValue(b)}updateValue(e){let o=Yo(this.min,this.max,e),i=Math.round(o/this.step)*this.step;this.value=Math.round(i*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};ve([L({type:Number})],se.prototype,"min",void 0);ve([L({type:Number})],se.prototype,"max",void 0);ve([L()],se.prototype,"value",void 0);ve([L()],se.prototype,"step",void 0);ve([L()],se.prototype,"startDegree",void 0);ve([L()],se.prototype,"endDegree",void 0);se=ve([Ut("wokwi-potentiometer")],se);var go=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(n=t[d])&&(c=(s<3?n(c):s>3?n(e,o,c):n(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Ba,Ue=class extends ct{static{Ba=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Ba.pushbuttonCounter++}static get styles(){return Tt`
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
    `}renderSVG(){let{color:e,uniqueId:o,xray:i}=this,s=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return yt`<svg
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
          <stop stop-color="${e}" offset="0.3" />
          <stop stop-color="${e}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="grad-down-${o}" x1="1" x2="0" y1="1" y2="0">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${e}" offset="0.3" />
          <stop stop-color="${e}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="12" height="12" rx=".44" ry=".44" fill="#464646" />
      <rect x=".75" y=".75" width="10.5" height="10.5" rx=".211" ry=".211" fill="#eaeaea" />
      ${i?Kt`
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
        <circle cx="6" cy="6" r="3.822" fill="${s}" />
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
          fill="${e}"
          stroke="#2f2f2f"
          stroke-opacity=".47"
          stroke-width=".08"
        />
      </g>
    </svg>`}render(){let{color:e,label:o}=this;return yt`
      <button
        aria-label="${o} ${e} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${i=>Ve.includes(i.key)&&this.down()}
        @keyup=${i=>Ve.includes(i.key)&&this.up(i)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(Ms(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};go([L()],Ue.prototype,"color",void 0);go([L()],Ue.prototype,"pressed",void 0);go([L()],Ue.prototype,"label",void 0);go([L({type:Boolean,attribute:"xray"})],Ue.prototype,"xray",void 0);Ue=Ba=go([Ut("wokwi-pushbutton")],Ue);var js=`:host {
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
/* Biblioteca de piezas (\xAB+ Agregar\xBB): un panel a la izquierda, debajo de la barra, con buscador y categor\xEDas. */
.tc-biblioteca {
  position: absolute;
  z-index: 10;
  top: 58px;
  left: 6px;
  bottom: 6px;
  width: min(290px, calc(100% - 12px));
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: var(--barra);
  border: 1px solid var(--borde);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.tc-biblioteca[hidden],
.tc-ficha[hidden],
.tc-ficha-cuerpo[hidden],
.tc-bib-cat[hidden],
.tc .tc-pieza[hidden],
.tc-bib-vacio[hidden] {
  display: none;
}

.tc-bib-cabeza {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}

.tc .tc-cerrar {
  min-height: 28px;
  padding: 0 9px;
  font-size: 18px;
  line-height: 1;
}

.tc .tc-buscar {
  font: inherit;
  color: var(--texto);
  background: var(--fondo);
  border: 1px solid var(--borde);
  border-radius: 8px;
  padding: 7px 10px;
  width: 100%;
  -webkit-user-select: text;
  user-select: text;
}

.tc-bib-lista {
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  margin: 0 -4px;
  padding: 0 4px;
}

.tc-bib-titulo {
  font-size: 12px;
  font-weight: 600;
  color: var(--suave);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 8px 2px 4px;
}

.tc .tc-pieza {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  padding: 6px;
  cursor: grab;
  touch-action: none;
}

.tc .tc-pieza:hover,
.tc .tc-pieza:focus-visible {
  background: var(--boton-hover);
  border-color: var(--borde);
}

.tc .tc-pieza[disabled] {
  cursor: default;
  opacity: 0.5;
  background: transparent;
}

.tc-arrastrando .tc-pieza {
  cursor: grabbing;
}

.tc-mini {
  flex: none;
  display: grid;
  place-items: center;
  width: 64px;
  height: 46px;
  border-radius: 6px;
  background: var(--fondo);
  overflow: hidden;
  pointer-events: none;
}

.tc-mini > svg {
  width: 58px;
  height: 42px;
}

.tc-pieza-texto {
  display: grid;
  gap: 1px;
  min-width: 0;
}

.tc-pieza-texto small {
  color: var(--suave);
  font-size: 12px;
  line-height: 1.3;
}

.tc-bib-vacio,
.tc-bib-ayuda {
  margin: 0;
  font-size: 12px;
  color: var(--suave);
}

.tc-fantasma {
  position: absolute;
  z-index: 20;
  width: 80px;
  height: 58px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.85;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
}

.tc-fantasma > svg {
  width: 100%;
  height: 100%;
}

/* Ficha de la pieza elegida: arriba a la derecha, sobre el lienzo. Se puede plegar. */
.tc-ficha {
  position: absolute;
  z-index: 5;
  top: 62px;
  right: 8px;
  width: min(290px, calc(100% - 16px));
  max-height: calc(100% - 110px);
  overflow-y: auto;
  scrollbar-width: thin;
  background: var(--barra);
  border: 1px solid var(--borde);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
  font-size: 13px;
  transition: opacity 0.15s;
}

.tc-ficha.tc-ficha-izq {
  right: auto;
  left: 8px;
}

.tc-ficha.tc-ficha-quieta {
  opacity: 0.2;
  pointer-events: none;
}

.tc .tc-ficha-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0;
  border-radius: 12px;
  background: transparent;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
}

.tc-ficha-flecha {
  font-weight: 400;
  font-size: 12px;
  color: var(--suave);
}

.tc-ficha-info[hidden] {
  display: none;
}

.tc-ficha-titulo small {
  font-weight: 400;
  color: var(--suave);
}

.tc-ficha-cuerpo {
  display: grid;
  gap: 8px;
  padding: 0 12px 12px;
}

.tc-ficha p {
  margin: 0;
}

.tc-ficha-desc {
  color: var(--suave);
}

.tc-ficha-props {
  display: grid;
  gap: 6px;
  padding: 8px;
  border-radius: 8px;
  background: var(--fondo);
}

.tc-ficha-props .tc-campo {
  display: grid;
  gap: 3px;
  font-size: 12px;
  color: var(--suave);
}

.tc-ficha-props select,
.tc-ficha-props input[type="range"] {
  width: 100%;
}

.tc-ficha dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3px 10px;
  margin: 0;
}

.tc-ficha dt {
  color: var(--suave);
}

.tc-ficha dd {
  margin: 0;
}

.tc-ficha-val {
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid var(--borde);
}

.tc-ficha-val b {
  display: block;
}

.tc-validado {
  color: #1d6b31;
  background: #e8f5ec;
  border-color: #b7dfc2;
}

.tc-por-validar {
  color: #8a4b00;
  background: #fff4e0;
  border-color: #f2d19b;
}

.tc.tc-oscuro .tc-validado {
  color: #8fe0a4;
  background: #16301e;
  border-color: #275c36;
}

.tc.tc-oscuro .tc-por-validar {
  color: #ffc773;
  background: #3a2a10;
  border-color: #6b4a14;
}

@media (prefers-color-scheme: dark) {
  .tc:not(.tc-claro) .tc-validado {
    color: #8fe0a4;
    background: #16301e;
    border-color: #275c36;
  }

  .tc:not(.tc-claro) .tc-por-validar {
    color: #ffc773;
    background: #3a2a10;
    border-color: #6b4a14;
  }
}
`;var Bt={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var z=9.6/2.54,Y=57.6,Qo=14.4,Ls={x:Qo,ancho:32.2*z},Mt={x:Qo+(32.2-22.2)/2*z,ancho:22.2*z,alto:11.8*z},Be={x:Mt.x+5.9*z,y:Y},ja=13.5*z,je=182.4,ea={ancho:201.6,alto:86.4},ta={GND:{x:je,y:Y-9.6,color:"#7a4a24"},VCC:{x:je,y:Y,color:"#d7263d"},SIG:{x:je,y:Y+9.6,color:"#f28c28"}},M=t=>Math.round(t*100)/100,La=t=>`rotate(${M(-t)} ${M(Be.x)} ${M(Be.y)})`;function Ga(t="sg90",e=90){let o=Bt[t]||Bt.sg90,{ancho:i,alto:s}=ea,c=Y-Mt.alto/2,n=M(Be.x),d=Mt.x+Mt.ancho,l=t==="sg90",u=Object.values(ta).map(($,I)=>{let v=Y-4+I*4;return`<path d="M${M(d)} ${M(v)} C ${M(d+26)} ${M(v)}, ${M(je-34)} ${M($.y)}, ${M(je-9)} ${M($.y)}" fill="none" stroke="${$.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),b=Object.values(ta).map($=>`<rect x="${M($.x-2.2)}" y="${M($.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),y=l?`<circle cx="${M(Mt.x+15*z)}" cy="${Y}" r="${M(3.6*z)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${M(Mt.x+9.5*z)}" cy="${M(Y+2.2*z)}" r="${M(2.2*z)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${s}" viewBox="0 0 ${i} ${s}"><title>Servo ${o.nombre}</title>`+u+`<rect x="${M(je-9)}" y="${M(Y-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+b+`<rect x="${M(Ls.x)}" y="${M(c+1.5)}" width="${M(Ls.ancho)}" height="${M(Mt.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${l?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${M(Qo+2.4*z)}" cy="${Y}" r="${M(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${M(Qo+(32.2-2.4)*z)}" cy="${Y}" r="${M(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${M(Mt.x)}" y="${M(c)}" width="${M(Mt.ancho)}" height="${M(Mt.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${l?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+y+`<text x="${M(Mt.x+15.5*z)}" y="${M(Y+4.1*z)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${n}" cy="${Y}" r="${M(5.2*z)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${La(e)}"><path d="M${n} ${M(Y-3.2*z/2-1)} L${M(Be.x+ja)} ${M(Y-1.1*z)} A ${M(1.1*z)} ${M(1.1*z)} 0 0 1 ${M(Be.x+ja)} ${M(Y+1.1*z)} L${n} ${M(Y+3.2*z/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${n}" cy="${Y}" r="${M(3.4*z)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map($=>`<circle cx="${M(Be.x+ja*$)}" cy="${Y}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${n}" cy="${Y}" r="${M(1.3*z)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var at=3.779527559055118,bo={ancho:72.58*at,alto:53.34*at},Le=4*at,pt=5*at,qn=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],Yt=Le+4.6*at,Zt=bo.ancho-.5-4.6*at,Jt=60,jt=(t,e)=>({x:t,y:Jt+e*pt}),re={M1A:jt(Yt,0),M1B:jt(Yt,1),GND_IZQ:jt(Yt,2),M2A:jt(Yt,3),M2B:jt(Yt,4),M4A:jt(Zt,0),M4B:jt(Zt,1),GND_DER:jt(Zt,2),M3A:jt(Zt,3),M3B:jt(Zt,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+pt,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},zs={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},Fa={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},Ws=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],P=t=>Math.round(t*100)/100,Z=(t,e,o,{tam:i=6.2,ancla:s="middle",peso:c="bold",color:n="#ffffff",giro:d=0}={})=>`<text x="${P(t)}" y="${P(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="${s}" fill="${n}"${d?` transform="rotate(${d} ${P(t)} ${P(e)})"`:""}>${o}</text>`;function za(t,e,o,i){let s=19.3*at,c=6.4*at,n=t-s/2,d=e-c/2,l="";for(let u=0;u<8;u++){let b=t-8.89*at+u*2.54*at;l+=`<rect x="${P(b-1.6)}" y="${P(d-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,l+=`<rect x="${P(b-1.6)}" y="${P(d+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${P(t)} ${P(e)})">`+l+`<rect x="${P(n)}" y="${P(d)}" width="${P(s)}" height="${P(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${P(n)} ${P(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+Z(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+Z(t,e-s/2-3,i,{tam:5.2})}function Wa(t,e,o,i=!0){let s=i?5.6*at:o*pt+.6*at,c=i?o*pt+.6*at:5.6*at,n=i?t-s/2:t-pt/2-.3*at,d=i?e-pt/2-.3*at:e-c/2,l="";for(let u=0;u<o;u++){let b=i?t:t+u*pt,y=i?e+u*pt:e;l+=`<circle cx="${P(b)}" cy="${P(y)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,l+=`<line x1="${P(b-4.2)}" y1="${P(y)}" x2="${P(b+4.2)}" y2="${P(y)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${P(n)}" y="${P(d)}" width="${P(s)}" height="${P(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+l}var Gs=(t,e,o)=>`<circle cx="${P(t)}" cy="${P(e)}" r="${P(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${P(t)} ${P(e-o/2)} a ${P(o/2)} ${P(o/2)} 0 0 1 0 ${P(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${P(t)}" cy="${P(e)}" r="${P(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Ha(t=!0){let{ancho:e,alto:o}=bo,i=qn.map(({y:d,xs:l})=>{let u=l[0]-4.6,b=l[l.length-1]+4.6;return`<rect x="${P(u)}" y="${P(d-4.6)}" width="${P(b-u)}" height="9.2" fill="#151515"/>`+l.map(y=>`<rect x="${P(y-1.6)}" y="${P(d-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),s=["S2","S1"].map(d=>["SIG","POS","GND"].map(l=>{let u=re[`${d}_${l}`];return`<rect x="${P(u.x-4.4)}" y="${P(u.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${P(u.x-1.4)}" y="${P(u.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,n=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${P(e)}" height="${P(o)}" viewBox="0 0 ${P(e)} ${P(o)}"><title>Shield de motores L293D</title><rect x="${P(Le)}" y="0.5" width="${P(e-Le-.5)}" height="${P(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+i+za(82,86,"L293D","U1")+za(145,86,"74HC595","U3")+za(205,86,"L293D","U2")+Gs(118,140,6.3*at)+Gs(205,140,6.3*at)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${n}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+Wa(Yt,Jt,5)+Wa(Zt,Jt,5)+Wa(re.EXT_POS.x,re.EXT_POS.y,2,!1)+s+`<rect x="${c-9}" y="${n-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${c-9.6}" y="${n-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${P(Le+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${P(Le+15)}" cy="169" r="5" fill="#2b2b2b"/>`+Z(Yt+13,Jt+pt/2+3,"M1",{tam:7})+Z(Yt+13,Jt+3.5*pt+3,"M2",{tam:7})+Z(Yt+12,Jt+2*pt+2.5,"GND",{tam:5})+Z(Zt-13,Jt+pt/2+3,"M4",{tam:7})+Z(Zt-13,Jt+3.5*pt+3,"M3",{tam:7})+Z(Zt-12,Jt+2*pt+2.5,"GND",{tam:5})+Z(re.EXT_POS.x+pt/2,193,"EXT_PWR",{tam:5.6})+Z(re.EXT_POS.x,165,"+M",{tam:5})+Z(re.EXT_GND.x,165,"GND",{tam:5})+Z(c,n-8,"PWR",{tam:5.6})+Z(52,16,"SERVO_2",{tam:5,ancla:"start"})+Z(52,26,"SERVO_1",{tam:5,ancla:"start"})+Z(26,7.4,"S",{tam:4.6})+Z(35.6,7.4,"+",{tam:5})+Z(45.2,7.4,"\u2212",{tam:5})+Z(Le+15,156,"RESET",{tam:4.6})+Z(196,162,"Motor Shield L293D",{tam:6.4})+Z(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var G=3.779527559055118,ft={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Hs=ft.voltiosRef/(ft.mABloqueado/1e3),qs=ft.rpmSinCarga*ft.reduccion*2*Math.PI/60,Xs=ft.mASinCarga/1e3,Ka=(ft.voltiosRef-Xs*Hs)/qs,D0=Ka*Xs/qs,O0=ft.tauMecanicoMs/1e3*Ka*Ka/Hs;var Ja=64.2*G,Ae=22.5*G,qa=40*G,Ya=11.2*G,At=ft.ruedaMM*G/2,Xn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Ya,y0:132-Ae/2}},yo=t=>Xn[t&&t.vista==="rueda"?"rueda":"eje"],Ks=t=>{let e=t.y0+Ae/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function Js(t){let e=yo(t),o=Ks(e);if(t&&t.lado==="derecho")for(let i of["A","B"])o[i]={...o[i],x:e.ancho-o[i].x};return o}var A=t=>Math.round(t*100)/100,Xa=(t,e,o,{tam:i=11,color:s="#1f2328",peso:c="bold",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${A(t)}" y="${A(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="middle" fill="${s}">${o}</text>`;function Kn(t,e){let o=e+Ae/2;return`<rect x="${A(t+qa-2)}" y="${A(o-9.5*G)}" width="${A(Ja-qa+2)}" height="${A(19*G)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${A(t+Ja-6*G)}" y="${A(o-8*G)}" width="${A(6*G)}" height="${A(16*G)}" rx="4" fill="#2b2b2b"/><rect x="${A(t)}" y="${A(e)}" width="${A(qa)}" height="${A(Ae)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${A(t+31.8*G-8.75*G)}" cy="${A(o)}" r="${A(1.5*G)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${A(t+31.8*G+8.75*G-6)}" cy="${A(o)}" r="${A(1.5*G)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function Jn(t){let e=Ks(t),o=t.x0+Ja,i=t.y0+Ae/2;return["A","B"].map((s,c)=>{let n=i+(c?3:-3);return`<path d="M${A(o)} ${A(n)} C ${A(o+20)} ${A(n)}, ${A(e[s].x-22)} ${A(e[s].y)}, ${A(e[s].x-6)} ${A(e[s].y)}" fill="none" stroke="${e[s].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${A(e[s].x-4.2)}" y="${A(e[s].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function Yn(t,e){let o=2.7*G;return`<circle cx="${A(t)}" cy="${A(e)}" r="${A(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${A(t)} ${A(e)})"><path d="M${A(t-o)} ${A(e-1.8*G)} H${A(t+o)} V${A(e+1.8*G)} H${A(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${A(t)}" cy="${A(e)}" r="${A(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function Zn(t,e){let o=[0,72,144,216,288].map(s=>`<rect x="${A(t-12)}" y="${A(e-At*.72)}" width="24" height="${A(At*.72)}" rx="6" fill="#f2c318" transform="rotate(${s} ${A(t)} ${A(e)})"/>`).join(""),i=Array.from({length:24},(s,c)=>`<rect x="${A(t-3)}" y="${A(e-At-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${A(t)} ${A(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${A(t)} ${A(e)})"><circle cx="${A(t)}" cy="${A(e)}" r="${A(At*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${A(At*.24)}"/>`+i+`<circle cx="${A(t)}" cy="${A(e)}" r="${A(At*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${A(t)}" cy="${A(e)}" r="${A(7*G)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${A(t-2.7*G)}" y="${A(e-1.8*G)}" width="${A(5.4*G)}" height="${A(3.6*G)}" fill="#7a5d00"/></g>`}function Ys(t={}){let e=yo(t),o=t.lado==="derecho",i=e.x0+Ya,s=e.y0+Ae/2,c=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",n=o?e.ancho-i:i,d=Kn(e.x0,e.y0)+Jn(e),l=o?e.ancho-(e.x0+26*G):e.x0+26*G,u=Xa(l,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(d+=Zn(i,s),u+=`<line x1="${A(n-At-10)}" y1="${A(s+At+2)}" x2="${A(n+At+10)}" y2="${A(s+At+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${A(n)} ${A(s+At+20)})"></g>`+Xa(n,s+At+46,"quieto",{tam:13,marca:"data-velocidad"})):(d+=Yn(i,s),u+=Xa(n,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${d}</g>${u}</svg>`}var Fs=new WeakMap;function Zs(t,e,o){let i=yo(e),s=i.x0+Ya,c=i.y0+Ae/2,n=o||{rpm:0,giro:0,velocidad:0},d=t.querySelector("[data-eje],[data-rueda]");d&&d.setAttribute("transform",`rotate(${A(-n.giro)} ${A(s)} ${A(c)})`);let l=t.querySelector("[data-rpm]"),u=Fs.get(t)||{},b=n.rpm>0!=(e.lado==="derecho");if(l){let I=Math.abs(n.rpm)<1?"0 RPM":`${Math.round(Math.abs(n.rpm))} RPM ${b?"\u27F2":"\u27F3"}`;I!==u.rpm&&(l.textContent=u.rpm=I)}let y=t.querySelector("[data-velocidad]"),$=t.querySelector("[data-flecha]");if(y&&$){let I=Math.sign(n.velocidad)*(e.lado==="derecho"?-1:1),v=Math.abs(n.velocidad),D=v<.5,k=D?"quieto":`${I>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(v)} cm/s`;k!==u.vel&&(y.textContent=u.vel=k);let B=D?0:b?-1:1,Rt=`${B}|${I}`;Rt!==u.flecha&&(u.flecha=Rt,$.innerHTML=D?"":`<path d="M${-40*B} -5 H${22*B} V-12 L${40*B} 0 L${22*B} 12 V5 H${-40*B} Z" fill="${I>0?"#2e9e44":"#d7263d"}"/>`)}Fs.set(t,u)}var Qs=3.779527559055118,_t={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},We={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var vo=360,Za=150,ne=10,$t=10,ce=72*Qs,Co=34*Qs,Qa={ancho:vo,alto:Za},le=ne+ce+58,ze=$t+Co-34,So={POS:{x:vo-12,y:$t+30,color:"#d7263d"},NEG:{x:vo-12,y:$t+39.6,color:"#2b2b2b"},BAL0:{x:le,y:ze,color:"#2b2b2b"},BAL1:{x:le,y:ze+9.6,color:"#e05a5a"},BAL2:{x:le,y:ze+19.2,color:"#d7263d"}},j=t=>Math.round(t*100)/100,Ge=(t,e,o,{tam:i=11,color:s="#ffffff",peso:c="bold",ancla:n="middle",marca:d=""}={})=>`<text${d?` ${d}="1"`:""} x="${j(t)}" y="${j(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="${n}" fill="${s}">${o}</text>`;function ti(t="nominal"){let e=_t[t]||_t.nominal,o=ne+ce,i=["POS","NEG"].map((c,n)=>{let d=So[c],l=$t+24+n*10;return`<path d="M${j(o)} ${j(l)} C ${j(o+26)} ${j(l)}, ${j(d.x-26)} ${j(d.y)}, ${j(d.x-6)} ${j(d.y)}" fill="none" stroke="${d.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${j(d.x-4.4)}" y="${j(d.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),s=["BAL0","BAL1","BAL2"].map((c,n)=>{let d=So[c],l=$t+Co-40+n*4;return`<path d="M${j(o)} ${j(l)} C ${j(o+18)} ${j(l)}, ${j(d.x-30)} ${j(d.y)}, ${j(d.x-7)} ${j(d.y)}" fill="none" stroke="${d.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${j(le-7)}" y="${j(ze-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(c=>`<rect x="${j(le-2.4)}" y="${j(So[c].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+Ge(le-14,ze+2.5,"\u2212",{tam:8,color:"#5a6673"})+Ge(le-14,ze+21.7,"+",{tam:8,color:"#5a6673"})+Ge(le,$t+Co+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${vo}" height="${Za}" viewBox="0 0 ${vo} ${Za}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+i+s+`<rect x="${ne}" y="${$t}" width="${j(ce)}" height="${j(Co)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${ne+14}" y="${$t+12}" width="${j(ce-28)}" height="${j(Co-24)}" rx="4" fill="#3f4752"/>`+Ge(ne+ce/2,$t+36,"LiPo 2S \xB7 7,4 V",{tam:15})+Ge(ne+ce/2,$t+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${j(ne+ce/2-33+c*23)}" y="${$t+66}" width="20" height="12" rx="2" fill="${c<e.barras?e.color:"#5a6370"}"/>`).join("")+Ge(ne+ce/2,$t+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function tr(t,e,o){let i=t.querySelector("[data-voltios]");if(!i)return;let s=_t[e]||_t.nominal,c=o&&typeof o.voltios=="number"?o.voltios:s.voltios;i.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${s.nombre}`}var pe={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},de=210,oi=140,ii={ancho:de,alto:oi},sr=9.6,rr=82,Qn=132,si=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:rr+e*sr,y:Qn}])),lt=t=>Math.round(t*100)/100,ei=(t,e,o,{tam:i=7,color:s="#5a6673",peso:c="bold",marca:n=""}={})=>`<text${n} x="${lt(t)}" y="${lt(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="middle" fill="${s}">${o}</text>`,ai={ancho:24,alto:46,grueso:5},tc=[76,112,148],er=34,or="#ff3b30",oa="#3a1414";function ec(t,e){let{ancho:o,alto:i,grueso:s}=ai,c=i/2,n=(d,l,u,b)=>({x:t+d,y:e+l,w:u,h:b});return{a:n(s/2,0,o-s,s),b:n(o-s,s/2,s,c-s),c:n(o-s,c+s/2,s,c-s),d:n(s/2,i-s,o-s,s),e:n(0,c+s/2,s,c-s),f:n(0,s/2,s,c-s),g:n(s/2,c-s/2,o-s,s)}}var oc={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function nr(t=pe.umbralV){let e=tc.map((s,c)=>{let n=ec(s,er);return Object.entries(n).map(([d,l])=>`<rect data-seg="${c}${d}" x="${lt(l.x)}" y="${lt(l.y)}" width="${lt(l.w)}" height="${lt(l.h)}" rx="2" fill="${oa}"/>`).join("")+`<circle data-seg="${c}p" cx="${lt(s+ai.ancho+5)}" cy="${lt(er+ai.alto-2)}" r="2.8" fill="${oa}"/>`}).join(""),o=Object.entries(si).map(([s,c],n)=>`<rect x="${lt(c.x-1.2)}" y="122" width="2.4" height="${lt(c.y-120)}" fill="#c9ccd1"/>`+ei(c.x,108,n===0?"\u2212":String(n),{tam:n===0?8:6.5})).join(""),i=[0,1].map(s=>{let c=38+s*44;return`<path d="M${lt(8)} ${lt(c-10)} q -6 10 0 20 M${lt(3)} ${lt(c-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${de}" height="${oi}" viewBox="0 0 ${de} ${oi}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${de-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${de-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(s=>`<circle cx="38" cy="${s}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${s}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${i}</g><rect x="66" y="22" width="${de-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${lt(rr-6)}" y="114" width="${lt(8*sr+12)}" height="9" fill="#151515"/>`+o+ei(de/2+30,18,"1-8S",{tam:6.5})+ei(de/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function ar(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,i]=e.split(".");return(o+i).slice(0,3).split("").map((c,n)=>({c,punto:n===o.length-1}))}var ir=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function ac(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[ar(t.total),ir(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((i,s)=>o.push(ir(`-${s+1}-`),ar(i))),o[Math.floor(e/pe.pasoMs)%o.length]}function ri(t,e,o){let i=t.querySelector("[data-umbral]"),s=e&&typeof e.umbral=="number"?e.umbral:pe.umbralV;if(i){let b=`alarma ${s?String(s).replace(".",",")+" V":"apagada"}`;i.textContent!==b&&(i.textContent=b)}let c=o&&o.ms||0,d=o&&o.alarma&&Math.floor(c/125)%2===1?null:ac(o,c);for(let b=0;b<3;b++){let y=d?d[b]:null,$=y&&oc[y.c]||"";for(let D of"abcdefg"){let k=t.querySelector(`[data-seg="${b}${D}"]`),B=$.includes(D)?or:oa;k&&k.getAttribute("fill")!==B&&k.setAttribute("fill",B)}let I=t.querySelector(`[data-seg="${b}p"]`),v=y&&y.punto?or:oa;I&&I.getAttribute("fill")!==v&&I.setAttribute("fill",v)}let l=t.querySelector("[data-pitido]"),u=o&&o.alarma&&Math.floor(c/250)%2===0?"visible":"hidden";l&&l.getAttribute("visibility")!==u&&l.setAttribute("visibility",u)}var He=3.779527559055118,aa=9.6,Qt={ancho:58*He,alto:54*He},X={x:(Qt.ancho-45*He)/2,y:(Qt.alto-18*He)/2,ancho:45*He,alto:18*He},ic=(Qt.ancho-14*aa)/2,cr=(Qt.alto-6*aa)/2,sc=cr+6*aa,lr=[{y:cr,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:sc,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],ni=Object.fromEntries(lr.flatMap(({y:t,nombres:e})=>e.map((o,i)=>[o,{x:ic+i*aa,y:t}]))),T=t=>Math.round(t*100)/100,Fe=(t,e,o,i=5,s="#f5f9ff")=>`<text x="${T(t)}" y="${T(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" text-anchor="middle" fill="${s}">${o}</text>`,dr={PWR:{apagado:"#19472b",encendido:"#45e76e"},L:{apagado:"#65501d",encendido:"#ffcf40"},RX:{apagado:"#644022",encendido:"#ff9e39"},TX:{apagado:"#644022",encendido:"#ff9e39"}};function rc(t,e,o){let i="";for(let s=0;s<8;s++){let c=2.5+s*(o-5)/7;i+=`<rect x="${T(t+c-.65)}" y="${T(e-2.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${T(t+c-.65)}" y="${T(e+o-.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${T(t-2.2)}" y="${T(e+c-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`,i+=`<rect x="${T(t+o-.2)}" y="${T(e+c-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`}return i+`<rect x="${T(t)}" y="${T(e)}" width="${T(o)}" height="${T(o)}" rx="1.2" fill="#25282c" stroke="#101214" stroke-width="0.6"/><circle cx="${T(t+2.8)}" cy="${T(e+2.8)}" r="1" fill="#7e848a"/>`}function pr(t={}){let{ancho:e,alto:o}=Qt,i=o/2,s=["PWR","L","RX","TX"].map((n,d)=>{let l=X.x+37+d*10.6;return`<rect data-led="${n}" x="${T(l-2.4)}" y="${T(i+10)}" width="4.8" height="3.2" rx="0.6" fill="${dr[n].apagado}" stroke="#20252b" stroke-width="0.4"/>`+Fe(l,i+19,n,4.2)}).join(""),c=lr.map(({y:n,nombres:d},l)=>d.map(u=>{let{x:b}=ni[u],y=u.startsWith("GND")?"GND":u.startsWith("RESET")?"RST":u;return`<circle cx="${T(b)}" cy="${T(n)}" r="2.7" fill="#d7b763" stroke="#8a6f37" stroke-width="0.5"/><rect x="${T(b-1.05)}" y="${T(n-1.05)}" width="2.1" height="2.1" fill="#55504a"/>`+Fe(b,n+(l?-5.2:9),y,y.length>3?3.5:4)}).join("")).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${T(e)}" height="${T(o)}" viewBox="0 0 ${T(e)} ${T(o)}"><title>Nano cl\xE1sico \xB7 m\xF3dulo ATmega328P</title><desc>M\xF3dulo con treinta terminales f\xEDsicos. A6 y A7 solo admiten entrada anal\xF3gica. Dibujo y medidas nominales pendientes de comparaci\xF3n con el kit.</desc><rect x="${T(X.x)}" y="${T(X.y)}" width="${T(X.ancho)}" height="${T(X.alto)}" rx="3.3" fill="#14628e" stroke="#0a3f60" stroke-width="0.9"/><path d="M${T(X.x+35)} ${T(i-9)} H${T(X.x+64)} V${T(i-16)} H${T(X.x+94)} M${T(X.x+91)} ${T(i+9)} H${T(X.x+125)} V${T(i+22)}" fill="none" stroke="#277ba6" stroke-width="1.1"/><rect x="${T(X.x-5.5)}" y="${T(i-12.5)}" width="25.5" height="25" rx="2" fill="#cbd0d6" stroke="#6c747d" stroke-width="0.8"/><rect x="${T(X.x-5.5)}" y="${T(i-8.5)}" width="6.2" height="17" rx="0.8" fill="#525b65"/><rect x="${T(X.x-4.2)}" y="${T(i-5.5)}" width="2.5" height="11" fill="#1d252d"/>`+rc(X.x+90,i-14,26)+Fe(X.x+103,i-1,"328P",4.5,"#b9bec4")+`<rect x="${T(X.x+127)}" y="${T(i-14)}" width="12" height="6.5" rx="2" fill="#c5c9cd" stroke="#737b84" stroke-width="0.5"/><line x1="${T(X.x+130)}" y1="${T(i-12)}" x2="${T(X.x+136)}" y2="${T(i-12)}" stroke="#727b83" stroke-width="0.5"/><rect x="${T(X.x+144)}" y="${T(i-6)}" width="10" height="11" rx="1.2" fill="#b9c0c7" stroke="#69737f" stroke-width="0.5"/><circle cx="${T(X.x+149)}" cy="${T(i-.5)}" r="3" fill="#343a41"/>`+Fe(X.x+149,i+12,"RESET",4.3)+s+c+Fe(X.x+53,i-13,"NANO CL\xC1SICO",6.2)+Fe(X.x+103,i+17,"A6 / A7: solo anal\xF3gico",4.5)+"</svg>"}function fr(t,e={}){let o={PWR:"ledPower",L:"led13",RX:"ledRX",TX:"ledTX"};for(let[i,s]of Object.entries(dr)){let n=(e?.leds?.[i]??e?.[i.toLowerCase()]??e?.[o[i]]??0)>0?s.encendido:s.apagado,d=t.querySelector(`[data-led="${i}"]`);d&&d.getAttribute("fill")!==n&&d.setAttribute("fill",n)}}var ci={...Qt},$e=9.6,li=Array.from({length:14},(t,e)=>`D${13-e}`),di=Array.from({length:8},(t,e)=>`A${e}`),ia=[...li,...di],mr=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","SPI_MISO","SPI_MOSI","SPI_SCK","SPI_SS","SPI_V","SPI_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_3V3","GND_OUT","JACK_POS","JACK_GND"],j0=[...ia.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...mr],xr=[...ia.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"]],gr=Object.fromEntries([...ia.flatMap(t=>[[`${t}_S`,`${t} \xB7 se\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \xB7 V: alimentaci\xF3n de 5V (+)`],[`${t}_G`,`${t} \xB7 G: tierra (\u2212)`]]),["I2C_SDA","I2C \xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \xB7 alimentaci\xF3n de 5V (+)"],["I2C_G","I2C \xB7 tierra (\u2212)"],["SPI_MISO","SPI \xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \xB7 SCK: reloj (D13)"],["SPI_SS","SPI \xB7 SS: selecci\xF3n (D10)"],["SPI_V","SPI \xB7 alimentaci\xF3n de 5V (+)"],["SPI_G","SPI \xB7 tierra (\u2212)"],["UART_TX","UART \xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \xB7 alimentaci\xF3n de 5V (+)"],["UART_G","UART \xB7 tierra (\u2212)"],["OUT_5V","5V \xB7 salida de alimentaci\xF3n de la expansi\xF3n (+)"],["OUT_3V3","3,3V \xB7 salida regulada de la expansi\xF3n (+), separada del 3V3 del Nano"],["GND_OUT","GND \xB7 tierra de las salidas (\u2212)"],["JACK_POS","Jack + \xB7 entrada de la expansi\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]),br=t=>t.variante==="azul"?"azul":"roja";function pi(t={}){let e=br(t)==="azul",o={},i=e?4.8:3.2,s=e?46.2:48.6;li.forEach((d,l)=>{let u=(l>=3?1:0)+(l>=7?1:0)+(l>=11?1:0),b=s+l*$e+u*i;for(let[y,$]of[["G",29.2],["V",38.8],["S",48.4]])o[`${d}_${y}`]={x:b,y:$}}),di.forEach((d,l)=>{let u=(e?53.4:55.8)+l*$e+(l>=4?i:0);for(let[b,y]of[["S",160.6],["V",170.2],["G",179.8]])o[`${d}_${b}`]={x:u,y}});let c=e?13.8:12.8;["I2C_SDA","I2C_SCL","I2C_V","I2C_G"].forEach((d,l)=>{o[d]={x:c,y:25+l*$e}});let n=e?207.2:205.6;return["UART_TX","UART_RX","UART_V","UART_G"].forEach((d,l)=>{o[d]={x:n,y:77.6+l*$e}}),["SPI_MISO","SPI_MOSI","SPI_SCK","SPI_SS","SPI_V","SPI_G"].forEach((d,l)=>{o[d]={x:(e?149.6:148)+l%3*$e,y:166+Math.floor(l/3)*$e}}),["OUT_5V","OUT_3V3","GND_OUT"].forEach((d,l)=>{o[d]={x:n,y:160+l*$e}}),o.JACK_POS={x:12.4,y:170},o.JACK_GND={x:27.6,y:170},o}var J=t=>Math.round(t*100)/100,Q=(t,e,o,{tam:i=5,ancla:s="middle",color:c="#ffffff",peso:n="normal"}={})=>`<text x="${J(t)}" y="${J(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${n}" text-anchor="${s}" fill="${c}">${o}</text>`;function hr(t,e,o){let{x:i,y:s}=e;return`<g data-contacto="${t}"><rect x="${J(i-4.3)}" y="${J(s-4.3)}" width="8.6" height="8.6" rx="0.7" fill="${o}" stroke="#111820" stroke-width="0.45"/><rect x="${J(i-1.8)}" y="${J(s-1.8)}" width="3.6" height="3.6" fill="#e1bc5c" stroke="#8e6c28" stroke-width="0.35"/><rect x="${J(i-.8)}" y="${J(s-.8)}" width="1.6" height="1.6" fill="#3e3526"/></g>`}function ur(t,e,o){return`<rect x="${t}" y="${e}" width="8.5" height="7" rx="0.6" fill="#292d33" stroke="#14171b" stroke-width="0.5"/><rect x="${t+2.1}" y="${e-1.8}" width="4.3" height="2" fill="#bac1c8"/>`+[0,1,2].map(i=>`<rect x="${t+1+i*2.6}" y="${e+6.8}" width="1.3" height="2.1" fill="#bac1c8"/>`).join("")+Q(t+4.25,e+14,o,{tam:4.3})}function yr(t={}){let e=br(t),o=e==="azul",i=pi(t),{ancho:s,alto:c}=ci,n=o?"#185ca5":"#bc2731",d=o?"#103c70":"#801a24",l=o?"#2c75bc":"#d2454e",u=o?{S:"#e6c52f",V:"#e6c52f",G:"#e6c52f"}:{S:"#2475c7",V:"#cf3537",G:"#292b30"},b=ia.flatMap(v=>["G","V","S"].map(D=>hr(`${v}_${D}`,i[`${v}_${D}`],u[D]))).join(""),y=mr.filter(v=>!v.startsWith("JACK")).map(v=>hr(v,i[v],o?"#e6c52f":v.startsWith("UART")||v.startsWith("I2C")?"#e8e4da":"#292b30")).join(""),$=["usb","jack","apagada"].includes(t.alimentacion)?t.alimentacion:"usb",I=$==="jack"?"ALIM.: JACK":$==="apagada"?"SIN ALIMENTACI\xD3N":"ALIM.: USB";return`<svg xmlns="http://www.w3.org/2000/svg" width="${J(s)}" height="${J(c)}" viewBox="0 0 ${J(s)} ${J(c)}"><title>Expansi\xF3n E/S ${e} para Nano cl\xE1sico</title><desc>Modelo de referencia pendiente de validar f\xEDsicamente. S es se\xF1al, V es 5V y G es tierra. El jack y la salida externa de 3,3V tienen nodos propios.</desc><path d="M7 0.5 H${J(s-7)} Q${J(s-.5)} 0.5 ${J(s-.5)} 7 V${J(c-10)} L${J(s-10)} ${J(c-.5)} H10 L0.5 ${J(c-10)} V7 Q0.5 0.5 7 0.5 Z M18.2 64 H195.8 V140.1 H18.2 Z" fill="${n}" fill-rule="evenodd" stroke="${d}" stroke-width="1"/><path d="M42 57 H80 V60 H102 M137 60 H180 V57 M40 148 H71 M138 150 H179" fill="none" stroke="${l}" stroke-width="1.4"/>`+[[8,8],[s-8,8],[8,c-8],[s-8,c-8]].map(([v,D])=>`<circle cx="${J(v)}" cy="${J(D)}" r="4.4" fill="#f5f6f7" stroke="${d}" stroke-width="1"/>`).join("")+b+y+ur(91,53.2,"5V")+ur(118,53.2,"3,3V")+'<circle cx="77" cy="59" r="4.2" fill="#bcc3ca" stroke="#4d5864" stroke-width="0.7"/><path d="M74.6 59 H79.4 M77 56.6 V61.4" stroke="#707983" stroke-width="0.6"/><rect x="136" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="145" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="5.2" y="145.4" width="30.4" height="29.5" rx="2" fill="#24282e" stroke="#10151a" stroke-width="0.8"/><rect x="1" y="149" width="8" height="18" rx="1" fill="#424952" stroke="#171b20" stroke-width="0.7"/><rect x="1.8" y="152" width="3" height="12" rx="1.4" fill="#11161c"/>'+["JACK_POS","JACK_GND"].map(v=>{let{x:D,y:k}=i[v];return`<circle data-contacto="${v}" cx="${D}" cy="${k}" r="2.8" fill="#d8b361" stroke="#775d2e" stroke-width="0.6"/>`}).join("")+li.map(v=>Q(i[`${v}_S`].x,20.8,v,{tam:4.5,peso:"bold"})).join("")+di.map(v=>Q(i[`${v}_S`].x,152.8,v,{tam:4.8,peso:"bold"})).join("")+["G","V","S"].map(v=>Q(37.6,i[`D13_${v}`].y+1.8,v,{tam:5.3,peso:"bold"})).join("")+["S","V","G"].map(v=>Q(44,i[`A0_${v}`].y+1.8,v,{tam:5.3,peso:"bold"})).join("")+Q(13,17,"I2C",{tam:5,peso:"bold"})+[["I2C_SDA","SDA"],["I2C_SCL","SCL"],["I2C_V","5V"],["I2C_G","GND"]].map(([v,D])=>Q(i[v].x+5.3,i[v].y+1.7,D,{tam:4.2,ancla:"start"})).join("")+Q(i.UART_TX.x-.8,61.9,"UART",{tam:4.7,peso:"bold"})+[["UART_TX","TX"],["UART_RX","RX"],["UART_V","5V"],["UART_G","GND"]].map(([v,D])=>Q(i[v].x-5.7,i[v].y+1.7,D,{tam:4.2,ancla:"end"})).join("")+[["SPI_MISO","MISO"],["SPI_MOSI","MOSI"],["SPI_SCK","SCK"]].map(([v,D])=>Q(i[v].x,159.5,D,{tam:3.4})).join("")+[["SPI_SS","SS"],["SPI_V","5V"],["SPI_G","GND"]].map(([v,D])=>Q(i[v].x,184.5,D,{tam:3.8})).join("")+Q(i.SPI_MOSI.x,195.2,"SPI",{tam:5.2,peso:"bold"})+[["OUT_5V","5V"],["OUT_3V3","3,3V"],["GND_OUT","GND"]].map(([v,D])=>Q(i[v].x-6.1,i[v].y+1.8,D,{tam:4.2,ancla:"end"})).join("")+Q(i.OUT_5V.x-4,151.8,"SALIDAS",{tam:4.2})+Q(12.4,183,"+",{tam:6})+Q(27.6,183,"GND",{tam:4.2})+Q(20.4,139.1,"JACK",{tam:4.8})+Q(84,191,"REGULACI\xD3N 5V / 3,3V",{tam:4.6})+Q(84,199,I,{tam:4.4})+Q(s/2,10.8,"EXPANSI\xD3N E/S",{tam:6.3,peso:"bold"})+"</svg>"}var nc=t=>/^A[67]$/.test(t)?`${t} \xB7 solo entrada anal\xF3gica (sin salida digital)`:/^A[0-5]$/.test(t)?`${t} \xB7 entrada anal\xF3gica y digital`:/^D\d+$/.test(t)?`Pin ${t.slice(1)}${["D3","D5","D6","D9","D10","D11"].includes(t)?" \xB7 PWM ~":""}${t==="D0"?" \xB7 RX":t==="D1"?" \xB7 TX":""}`:t.startsWith("GND")?"GND \xB7 tierra (\u2212)":t.startsWith("RESET")?"RESET \xB7 reinicia el Nano":{"5V":"5V \xB7 alimentaci\xF3n del Nano","3V3":"3,3V \xB7 salida del m\xF3dulo Nano",VIN:"VIN \xB7 entrada del m\xF3dulo Nano",AREF:"AREF \xB7 referencia anal\xF3gica",SDA:"SDA \xB7 el mismo A4",SCL:"SCL \xB7 el mismo A5",MOSI:"MOSI \xB7 el mismo D11",MISO:"MISO \xB7 el mismo D12",SCK:"SCK \xB7 el mismo D13",SS:"SS \xB7 el mismo D10"}[t]||t,Cr=t=>({nombre:t,dibujo:{...Qt,pines:ni,svg:pr},rotulo:nc,mostrar:fr}),qe={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},fi=Object.keys(qe),Sr={marron:"marr\xF3n",morado:"violeta"};function hi(t,e){let o=[t,e];return o.some(i=>/^placa\.GND/.test(i)||/^protoboard\.[si]-/.test(i))?"negro":o.some(i=>/^placa\.(5V|3V3|VIN)$/.test(i)||/^protoboard\.[si]\+/.test(i))?"rojo":"verde"}var cc=["3","5","6","9","10","11"],wt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(cc.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}},nano:Cr("Arduino Nano"),nano_old:Cr("Arduino Nano (bootloader antiguo)")},q={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",prefijo:"exp",montada:!0,placas:["nano","nano_old"],props:{variante:"roja",alimentacion:"usb",voltajeJack:9},dibujo:{marco:t=>({...ci,pines:pi(t)}),svg:yr},rotulo:t=>gr[t]||t,campos:[{prop:"variante",etiqueta:"Tarjeta",opciones:[["roja","Roja"],["azul","Azul"]]},{prop:"alimentacion",etiqueta:"Alimentaci\xF3n",opciones:[["usb","USB del Nano"],["jack","Jack de la expansi\xF3n"],["apagada","Desconectada"]]},{prop:"voltajeJack",etiqueta:"Fuente en el jack",opciones:[[0,"0 V"],[5,"5 V"],[7,"7 V"],[9,"9 V"],[12,"12 V"]]}]},resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:ea.ancho,alto:ea.alto,pines:ta,svg:t=>Ga(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Bt).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(Ga(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",La(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,placas:["uno"],props:{puentePWR:!0},dibujo:{ancho:bo.ancho,alto:bo.alto,pines:re,svg:t=>Ha(t.puentePWR!==!1)},rotulo:t=>zs[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(Ha(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),i=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==i&&o.setAttribute("fill",i)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...yo(t),pines:Js(t)}),svg:t=>Ys(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){Zs(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:Qa.ancho,alto:Qa.alto,pines:So,svg:t=>ti(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(_t).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(ti(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e,o){tr(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:pe.umbralV},dibujo:{ancho:ii.ancho,alto:ii.alto,pines:si,svg:t=>nr(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:pe.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){ri(t,e,null)},mostrar(t,e,o){ri(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var sa=["a","b","c","d","e"],vr=["f","g","h","i","j"],ht={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Ar=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],Lt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Ao=t=>14.4+(t-1)*9.6,lc=t=>t>=2&&(t-1)%6!==0,ui=new Map;function Xe(t="media"){if(ui.has(t))return ui.get(t);let e=Lt[t]||Lt.media,o=[];ui.set(t,o);for(let i=1;i<=e.columnas;i++){for(let s of sa)o.push({nombre:s+i,x:Ao(i),y:ht[s],tira:"arriba"+i});for(let s of vr)o.push({nombre:s+i,x:Ao(i),y:ht[s],tira:"abajo"+i});for(let[s]of Ar)lc(i)&&o.push({nombre:s+i,x:Ao(i),y:ht[s],tira:s})}return o}var mi=new Map;function $r(t="media"){if(mi.has(t))return mi.get(t);let e=new Map;mi.set(t,e);for(let o of Xe(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function xi(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(sa.includes(o[1])?"arriba":"abajo")+o[2]:null}function _r(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let c=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[i,s]=sa.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${i}${o[2]}\u2013${s}${o[2]}`}function gi(t="media"){let e=Lt[t]||Lt.media,{ancho:o,alto:i,columnas:s}=e,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${i}" viewBox="0 0 ${o} ${i}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${i-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(ht.e+ht.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let n=(l,u)=>c.push(`<line x1="${14.4-6}" y1="${l}" x2="${o-14.4+6}" y2="${l}" stroke="${u}" stroke-width="1.2"/>`);n(ht["s+"]-5.5,"#d7263d"),n(ht["s-"]+5.5,"#2f6fde"),n(ht["i-"]-5.5,"#2f6fde"),n(ht["i+"]+5.5,"#d7263d");let d=(l,u,b,y="#8a867a",$=5.5)=>c.push(`<text x="${l}" y="${u}" font-family="sans-serif" font-size="${$}" font-weight="700" fill="${y}" text-anchor="middle">${b}</text>`);for(let[l,,u]of Ar){let b=u==="+"?"#d7263d":"#2f6fde";d(5.2,ht[l]+2.2,u,b,7),d(o-5.2,ht[l]+2.2,u,b,7)}for(let l=1;l<=s;l++)(l===1||l%5===0)&&(d(Ao(l),ht.a-6.2,l),d(Ao(l),ht.j+10.4,l));for(let l of[...sa,...vr])d(5.2,ht[l]+2,l),d(o-5.2,ht[l]+2,l);for(let l of Xe(t))c.push(`<rect x="${(l.x-1.7).toFixed(2)}" y="${(l.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function wr(t,{tipo:e="media",ocupados:o=new Set,tolerancia:i=3.5}={}){if(!t.length)return null;let s=Xe(e),c=(y,$)=>{let I=null,v=1/0;for(let D of s){let k=Math.hypot(D.x-y,D.y-$);k<v&&(v=k,I=D)}return{hueco:I,distancia:v}},n=c(t[0].x,t[0].y);if(n.distancia>9.6)return null;let d=n.hueco.x-t[0].x,l=n.hueco.y-t[0].y,u={},b=new Set;for(let y of t){let{hueco:$,distancia:I}=c(y.x+d,y.y+l);if(I>i||o.has($.nombre)||b.has($.nombre))return null;u[y.nombre]=$.nombre,b.add($.nombre)}return{dx:d,dy:l,en:u}}var ra=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),Er=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),dc=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),pc=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),fc=Object.freeze([...Er,Object.freeze(["A6"]),Object.freeze(["A7"])]),Rr=Object.freeze([...ra,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),hc=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:ra,analogicos:Er,puentes:dc,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...ra,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","SDA","SCL"])}),uc=Object.freeze({nombre:"Arduino Nano cl\xE1sico",pinesDigitales:ra,analogicos:fc,puentes:pc,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:Rr,pines:Object.freeze([...Rr,"SDA","SCL","MISO","MOSI","SCK","SS"])}),Gt=t=>t==="nano"||t==="nano_old",Ke=t=>Gt(t)?uc:hc;function na(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:i=!0}={}){let s=new Map,c=d=>{for(s.has(d)||s.set(d,d);s.get(d)!==d;)s.set(d,s.get(s.get(d))),d=s.get(d);return d},n=(d,l)=>s.set(c(d),c(l));for(let d of Ke(t.placa).puentes)d.forEach(l=>n("placa."+d[0],"placa."+l));for(let d of t.cables)n(d.de,d.a);if(t.protoboard){for(let d of $r(t.protoboard.tipo).values())d.forEach(l=>n("protoboard."+d[0],"protoboard."+l));for(let d of t.componentes)if(d.en)for(let[l,u]of Object.entries(d.en))n(d.id+"."+l,u)}for(let d of t.componentes)if(d.tipo==="shield_nano_io"&&Gt(t.placa))for(let[l,u]of xr)n(d.id+"."+l,u);else if(d.tipo==="shield_l293d"){for(let[l,u]of Ws)n(d.id+"."+l,u);(!d.props||d.props.puentePWR!==!1)&&n(d.id+".EXT_POS","placa.VIN")}else d.tipo==="bateria_lipo"&&i?(n(d.id+".BAL0",d.id+".NEG"),n(d.id+".BAL2",d.id+".POS")):d.tipo==="pulsador"?(n(d.id+".1i",d.id+".1d"),n(d.id+".2i",d.id+".2d"),e.has(d.id)&&n(d.id+".1i",d.id+".2i")):o&&d.tipo==="resistencia"?n(d.id+".1",d.id+".2"):o&&d.tipo==="potenciometro"&&(n(d.id+".GND",d.id+".SIG"),n(d.id+".SIG",d.id+".VCC"));return c}var Ai=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],bi=Object.fromEntries(Ai.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),mc={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},yi={ref:"U",lib:"MCU_Module",parte:"Arduino_Nano_v3.x",huella:"Module:Arduino_Nano",valor:"Arduino Nano cl\xE1sico",pines:{D1:"1",D0:"2",RESET:"3",GND1:"4",D2:"5",D3:"6",D4:"7",D5:"8",D6:"9",D7:"10",D8:"11",D9:"12",D10:"13",D11:"14",D12:"15",D13:"16","3V3":"17",AREF:"18",A0:"19",A1:"20",A2:"21",A3:"22",A4:"23",A5:"24",A6:"25",A7:"26","5V":"27",RESET2:"28",GND2:"29",VIN:"30"}},xc=["GND","+5V","+3V3","VIN"],Pr=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Ci={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>Pr(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(Bt[t.modelo]||Bt.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>Pr(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},zt="placa:GND1",Je="placa:5V",$o="pieza:EXT_POS",Tr=[15,1,2,3,4,5,6,7];function Ir(t,e){let o=Fa.pwm;return{1:"placa:"+o[t],2:`IN_M${t}A`,3:`pieza:M${t}A`,6:`pieza:M${t}B`,7:`IN_M${t}B`,9:"placa:"+o[e],10:`IN_M${e}A`,11:`pieza:M${e}A`,14:`pieza:M${e}B`,15:`IN_M${e}B`,4:zt,5:zt,12:zt,13:zt,8:$o,16:Je}}function gc(){let t=Fa,e={8:zt,16:Je,10:Je,11:"placa:"+t.reloj,12:"placa:"+t.cierre,13:"placa:"+t.habilita,14:"placa:"+t.datos};for(let[o,{A:i,B:s}]of Object.entries(t.bits))e[Tr[i]]=`IN_M${o}A`,e[Tr[s]]=`IN_M${o}B`;return e}var Mr="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm",$i="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm",Dr="Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",Si="Package_DIP:DIP-16_W7.62mm",_o={ref:"C",lib:"Device",parte:"C",huella:"Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm",valor:"100nF"},bc=[{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Si,valor:"L293D",nota:"M1 y M2",pads:Ir(1,2)},{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Si,valor:"L293D",nota:"M3 y M4",pads:Ir(3,4)},{ref:"U",lib:"74xx",parte:"74HC595",huella:Si,valor:"74HC595",nota:"sentido de los motores",pads:gc()},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Mr,valor:"M1 GND M2",externo:!0,pads:{1:"pieza:M1A",2:"pieza:M1B",3:"pieza:GND_IZQ",4:"pieza:M2A",5:"pieza:M2B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Mr,valor:"M4 GND M3",externo:!0,pads:{1:"pieza:M4A",2:"pieza:M4B",3:"pieza:GND_DER",4:"pieza:M3A",5:"pieza:M3B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x02",huella:$i,valor:"EXT_PWR",externo:!0,pads:{1:$o,2:"pieza:EXT_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Dr,valor:"SERVO_1",externo:!0,pads:{1:"pieza:S1_SIG",2:"pieza:S1_POS",3:"pieza:S1_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Dr,valor:"SERVO_2",externo:!0,pads:{1:"pieza:S2_SIG",2:"pieza:S2_POS",3:"pieza:S2_GND"}},{ref:"JP",lib:"Jumper",parte:"Jumper_2_Open",huella:"Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical",valor:"PWR",pads:{1:$o,2:"placa:VIN"}},{..._o,nota:"junto a U1",pads:{1:Je,2:zt}},{..._o,nota:"junto a U2",pads:{1:Je,2:zt}},{..._o,nota:"junto a U3",pads:{1:Je,2:zt}},{ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"100uF 25V",nota:"voltaje de motores",pads:{1:$o,2:zt}},{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:"1k",nota:"LED PWR",pads:{1:$o,2:"LED_PWR"}},{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D3.0mm",valor:"LED verde",nota:"PWR",pads:{1:zt,2:"LED_PWR"}}],yc={EXT_POS:"VMOT",M1A:"M1_A",M1B:"M1_B",M2A:"M2_A",M2B:"M2_B",M3A:"M3_A",M3B:"M3_B",M4A:"M4_A",M4B:"M4_B"},_e="Circuito de referencia por validar: componentes, polaridad, orden de conectores, aislamiento USB/jack y montaje de ambas variantes pendientes",vi={ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"10uF 25V",nota:_e},Or={ref:"U",lib:"Regulator_Linear",huella:"Package_TO_SOT_SMD:SOT-223-3_TabPin2",nota:_e},Cc=[{...Or,clave:"REG_5V",parte:"LD1117S50TR_SOT223",valor:"LD1117S50TR 5V (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_5V",3:"pieza:JACK_POS"}},{...Or,clave:"REG_3V3",parte:"LD1117S33TR_SOT223",valor:"LD1117S33TR 3V3 (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_3V3",3:"pieza:OUT_5V"}},{...vi,clave:"FILTRO_JACK",pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{...vi,clave:"FILTRO_5V",pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{...vi,clave:"FILTRO_3V3",pads:{1:"pieza:OUT_3V3",2:"pieza:JACK_GND"}},{..._o,clave:"DESACOPLE_JACK",nota:_e,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{..._o,clave:"DESACOPLE_5V",nota:_e,pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector",parte:"Barrel_Jack_Switch",huella:"Connector_BarrelJack:BarrelJack_CUI_PJ-102AH_Horizontal",clave:"JACK",valor:"PJ-102AH centro + (referencia por validar)",nota:_e,externo:!0,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x04",huella:"Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical",clave:"I2C",valor:"I2C SDA SCL 5V GND (referencia por validar)",nota:_e,externo:!0,pads:{1:"pieza:I2C_SDA",2:"pieza:I2C_SCL",3:"pieza:I2C_V",4:"pieza:I2C_G"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x06",huella:"Connector_PinHeader_2.54mm:PinHeader_1x06_P2.54mm_Vertical",clave:"SPI",valor:"SPI MISO MOSI SCK SS 5V GND (referencia por validar)",nota:_e,externo:!0,pads:{1:"pieza:SPI_MISO",2:"pieza:SPI_MOSI",3:"pieza:SPI_SCK",4:"pieza:SPI_SS",5:"pieza:SPI_V",6:"pieza:SPI_G"}}],Sc={JACK_POS:"JACK_VIN",OUT_3V3:"REG_3V3"},vc={motor_tt:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:$i,valor:()=>"Motor TT",pines:{A:"1",B:"2"}}],bateria_lipo:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:$i,valor:()=>"LiPo 2S",pines:{POS:"1",NEG:"2"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:"Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical",valor:()=>"Balance LiPo",sufijo:"/balance",pines:{BAL0:"1",BAL1:"2",BAL2:"3"}}],probador_lipo:[{ref:"J",lib:"Connector_Generic",parte:"Conn_01x09",huella:"Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical",valor:()=>"Probador de celdas",pines:{NEG:"1",C1:"2",C2:"3",C3:"4",C4:"5",C5:"6",C6:"7",C7:"8",C8:"9"}}]},Ac=new Set(["servo"]),dt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function $c(t){let o=[2166136261,16777619,2654435769,2246822507].map(i=>{let s=i>>>0;for(let c=0;c<t.length;c++)s=Math.imul(s^t.charCodeAt(c),16777619)>>>0;return s.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function kr(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:i="TecnoCircuito"}={}){let s=Gt(t.placa);if(s&&t.componentes.filter(m=>m.tipo==="shield_nano_io").length>1)throw new Error("Solo puedes exportar una expansi\xF3n E/S por Nano. Quita la expansi\xF3n adicional.");let c={...t,componentes:t.componentes.map(m=>m.tipo==="shield_l293d"?{...m,props:{...m.props,puentePWR:!1}}:m)},n=na(c),d=c.componentes.find(m=>m.tipo==="shield_l293d")||null,l=m=>{let[x,S]=m.split(":");return S===void 0?"#"+m:n((x==="placa"?"placa":d.id)+"."+S)},u=d?bc.map(m=>({...m,id:`${d.id}/${m.valor}${m.nota?" "+m.nota:""}`,enShield:!0})):[],b=s?c.componentes.filter(m=>m.tipo==="shield_nano_io").flatMap(m=>Cc.map(x=>({...x,id:`${m.id}/${x.clave}`,expansion:m.id}))):[],y=(m,x,S=n)=>{let[R,rt]=x.split(":");return S((R==="placa"?"placa":m.expansion)+"."+rt)},$=new Set(t.cables.flatMap(m=>[m.de,m.a])),I=new Set(u.flatMap(m=>Object.values(m.pads).map(l))),v=s?Object.keys(yi.pines):Object.keys(bi).filter(m=>$.has("placa."+m)||I.has(n("placa."+m))),D=c.componentes.filter(m=>Ci[m.tipo]),k=na(c,{balanceInterno:!1}),B=m=>{let[x,S]=m.split(":");return S===void 0?"#"+m:k((x==="placa"?"placa":d.id)+"."+S)},Rt=new Set([...v.map(m=>k("placa."+m)),...u.flatMap(m=>Object.values(m.pads).map(B)),...b.flatMap(m=>Object.values(m.pads).map(x=>y(m,x,k))),...D.flatMap(m=>Object.keys(Ci[m.tipo].pads).map(x=>k(m.id+"."+x)))]),U=new Set([...u.filter(m=>m.externo).flatMap(m=>Object.values(m.pads).map(B)),...b.filter(m=>m.externo).flatMap(m=>Object.values(m.pads).map(x=>y(m,x,k)))]),Ft=(m,x)=>x.filter(S=>Rt.has(k(m+"."+S))),gt=(m,x)=>Ft(m,x).some(S=>!U.has(k(m+"."+S))),Ot=(m,x)=>{let S=Ft(m,x);return S.length>0&&S.every(R=>U.has(k(m+"."+R)))},E=[];s&&E.push({...yi,id:"placa",pads:v.map(m=>[yi.pines[m],n("placa."+m),null,m])});for(let m of D){let x=Ci[m.tipo];Ac.has(m.tipo)&&Ot(m.id,Object.keys(x.pads))||E.push({...x,id:m.id,valor:x.valor(m.props||{}),pads:Object.entries(x.pads).map(([S,R])=>[R,n(m.id+"."+S)])})}for(let m of u)E.push({...m,pads:Object.entries(m.pads).map(([x,S])=>[x,l(S),S.startsWith("pieza:")?yc[S.slice(6)]:null])});for(let m of b)E.push({...m,pads:Object.entries(m.pads).map(([x,S])=>[x,y(m,S),Sc[S.slice(6)]||null])});for(let m of c.componentes)for(let x of vc[m.tipo]||[])gt(m.id,Object.keys(x.pines))&&E.push({...x,id:m.id+(x.sufijo||""),valor:x.valor(m.props||{}),pads:Object.entries(x.pines).map(([S,R])=>[R,n(m.id+"."+S)])});let et={J:s?0:Ai.length};for(let m of E)et[m.ref]=(et[m.ref]||0)+1,m.ref=m.ref+et[m.ref];let st=new Map,fe=(m,x,S,R,rt)=>{st.has(m)||st.set(m,{pads:new Map,uno:new Set,shield:new Set,propia:m.startsWith("#")?m.slice(1):null});let Ht=st.get(m);Ht.pads.set(x+" "+S,{ref:x,pad:S,pinUno:R}),R&&Ht.uno.add(mc[R]||R),rt&&Ht.shield.add(rt)};if(!s)for(let m of v)fe(n("placa."+m),bi[m].ref,bi[m].pad,m,null);for(let m of E)for(let[x,S,R,rt]of m.pads)fe(S,m.ref,String(x),rt==="RESET2"?"RESET":rt,R);let St=(m,x)=>m.localeCompare(x,"en",{numeric:!0}),Et=[...st.values()].filter(m=>m.pads.size>=2).map(m=>{let x=[...m.pads.values()].sort((R,rt)=>St(R.ref,rt.ref)||St(R.pad,rt.pad));return{nombre:xc.find(R=>m.uno.has(R))||[...m.uno].sort(St)[0]||[...m.shield].sort(St)[0]||m.propia||`Net-(${x[0].ref}-Pad${x[0].pad})`,pads:x}}).sort((m,x)=>St(m.nombre,x.nombre)),O=[],V=(m,x,S,R,rt,Ht,To,Me)=>O.push("		(comp",`			(ref ${dt(m)})`,`			(value ${dt(x)})`,`			(footprint ${dt(S)})`,`			(libsource (lib ${dt(R)}) (part ${dt(rt)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${dt(Ht)}))`,...Me?[`			(property (name "TecnoCircuito_validacion") (value ${dt(Me)}))`]:[],'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${dt(To)})`,"		)");if(O.push("(export",'	(version "E")',"	(design",`		(source ${dt(e)})`,`		(date ${dt(o)})`,`		(tool ${dt(i)})`,"	)"),O.push("	(components"),!s)for(let m of Ai)V(m.ref,m.valor,m.huella,"Connector_Generic",m.parte,"placa",m.uuid);for(let m of E)V(m.ref,m.valor,m.huella,m.lib,m.parte,m.id,$c(e+"/"+m.id),m.expansion?m.nota:null);return O.push("	)","	(nets"),Et.forEach((m,x)=>{O.push("		(net",`			(code ${dt(x+1)})`,`			(name ${dt(m.nombre)})`,'			(class "Default")');for(let S of m.pads){let R=S.pinUno?` (pinfunction ${dt(S.pinUno)})`:"";O.push(`			(node (ref ${dt(S.ref)}) (pin ${dt(S.pad)})${R} (pintype "passive"))`)}O.push("		)")}),O.push("	)",")"),O.join(`
`)+`
`}var we;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(we||(we={}));var ut;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(ut||(ut={}));var Nr={0:{type:ut.SingleEnded,channel:0},1:{type:ut.SingleEnded,channel:1},2:{type:ut.SingleEnded,channel:2},3:{type:ut.SingleEnded,channel:3},4:{type:ut.SingleEnded,channel:4},5:{type:ut.SingleEnded,channel:5},6:{type:ut.SingleEnded,channel:6},7:{type:ut.SingleEnded,channel:7},8:{type:ut.Temperature},14:{type:ut.Constant,voltage:1.1},15:{type:ut.Constant,voltage:0}},hd={type:ut.Constant,voltage:0},wc={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Nr,adcReferences:[we.AREF,we.AVCC,we.Reserved,we.Internal1V1]};var Rc=2,Ec=4,Pc=8,Tc=16,Ic=32,xd=Rc|Ec|Pc|Tc|Ic;var Ur={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Br={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},jr={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var Lr={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var wo={PIN:35,DDR:36,PORT:37,pinChange:jr,externalInterrupts:[]};var Re={PIN:41,DDR:42,PORT:43,pinChange:Lr,externalInterrupts:[null,null,Ur,Br]};var ca;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(ca||(ca={}));var la;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(la||(la={}));var Vr;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Vr||(Vr={}));var Wr={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Gr;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Gr||(Gr={}));var Ei={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Mc=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Wr,compPortA:Re.PORT,compPinA:6,compPortB:Re.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:Re.PORT,externalClockPin:4},Ei),Dc=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Wr,compPortA:wo.PORT,compPinA:1,compPortB:wo.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:Re.PORT,externalClockPin:5},Ei),Oc=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:wo.PORT,compPinA:3,compPortB:Re.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Ei),_i;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(_i||(_i={}));var W;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(W||(W={}));var F;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(F||(F={}));var Te=1,da=2,Ye=1,{Normal:Fr,PWMPhaseCorrect:Ee,CTC:wi,FastPWM:Pe,Reserved:Ri,PWMPhaseFrequencyCorrect:zr}=_i,Sd=[[Fr,255,F.Immediate,W.Max,0],[Ee,255,F.Top,W.Bottom,0],[wi,Te,F.Immediate,W.Max,0],[Pe,255,F.Bottom,W.Max,0],[Ri,255,F.Immediate,W.Max,0],[Ee,Te,F.Top,W.Bottom,Ye],[Ri,255,F.Immediate,W.Max,0],[Pe,Te,F.Bottom,W.Top,Ye]],vd=[[Fr,65535,F.Immediate,W.Max,0],[Ee,255,F.Top,W.Bottom,0],[Ee,511,F.Top,W.Bottom,0],[Ee,1023,F.Top,W.Bottom,0],[wi,Te,F.Immediate,W.Max,0],[Pe,255,F.Bottom,W.Top,0],[Pe,511,F.Bottom,W.Top,0],[Pe,1023,F.Bottom,W.Top,0],[zr,da,F.Bottom,W.Bottom,0],[zr,Te,F.Bottom,W.Bottom,Ye],[Ee,da,F.Top,W.Bottom,0],[Ee,Te,F.Top,W.Bottom,Ye],[wi,da,F.Immediate,W.Max,0],[Ri,65535,F.Immediate,W.Max,0],[Pe,da,F.Bottom,W.Top,Ye],[Pe,Te,F.Bottom,W.Top,Ye]];var kc=16,Nc=8,Vc=4;var Rd=Vc|kc|Nc;var te={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var Ct=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),Hr=t=>t>=1e3?Ct(t/1e3)+" k\u03A9":t+" \u03A9",Ro=t=>({estado:"validado",texto:t}),Ie=t=>({estado:"por_validar",texto:t}),Pi=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","shield_nano_io","bateria_lipo","probador_lipo"]}],Eo={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",descripcion:"El Nano va montado en esta tarjeta. Cada grupo re\xFAne se\xF1al, 5V y tierra para conectar sensores o servos. El jack alimenta la regulaci\xF3n de la expansi\xF3n; A6 y A7 solo leen se\xF1ales anal\xF3gicas.",palabras:["nano","expansion","shield","sensores","servo","roja","azul","i2c","spi","jack"],pines:"S: se\xF1al del pin indicado; V: 5V; G: tierra. I2C: SDA/A4 y SCL/A5. SPI: MISO/D12, MOSI/D11, SCK/D13 y SS/D10. OUT_3V3 es la salida de la expansi\xF3n, separada de la del m\xF3dulo Nano",datos:t=>[["Tarjeta",t.variante==="azul"?"Azul":"Roja"],["Placa","Nano cl\xE1sico ATmega328P \xB7 16 MHz"],["Entradas anal\xF3gicas","A0 a A7; A6 y A7 solo anal\xF3gicas"],["Alimentaci\xF3n",t.alimentacion==="jack"?`Jack: ${Number(t.voltajeJack??9)} V (o la bater\xEDa conectada)`:t.alimentacion==="apagada"?"Desconectada":"USB del Nano"],["Regulaci\xF3n","Modelo de referencia 5V y 3,3V; salida externa 3,3V separada del m\xF3dulo"],["KiCad","M\xF3dulo Nano + regulaci\xF3n/filtrado de referencia, jack, I2C y SPI"]],validacion:()=>Ie("Dibujo basado en las referencias roja y azul. Circuito de alimentaci\xF3n de referencia: falta confirmar reguladores, puentes, polaridad, capacidad y medidas de cada tarjeta real. Los conectores I2C/SPI son conexiones; los dispositivos de esos buses se incorporan por separado.")},protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",Hr(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>Ro("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${Ct(te.vf[t.color]||te.vf.rojo,2)} V a ${te.normalmA} mA`],["Corriente",`de 5 a ${te.normalmA} mA; se quema desde ${te.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(te.vf[t.color]||te.vf.rojo))/(te.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:t=>!t.color||t.color==="rojo"?Ro("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 11 de 12 dentro del criterio; la que queda en el l\xEDmite cumple con la incertidumbre del mult\xEDmetro)."):Ie(`Voltaje de la hoja de datos: se midi\xF3 solo el LED rojo (7 oct 2026); falta medir el ${t.color}.`)},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>Ro("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",Hr(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>Ro("Lectura anal\xF3gica revisada el 7 oct 2026. El ruido del ADC (unos 0,1 pasos) es una estimaci\xF3n del 9 oct: falta repetirlo con el programa corregido.")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=Bt[t.modelo]||Bt.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${Ct(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?Ie("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):Ro("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (quieto menos de 10 mA, lo m\xEDnimo que muestra el mult\xEDmetro; ~100 mA movi\xE9ndose; 590 mA bloqueado). Los 6 mA quieto son de la hoja de datos.")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${ft.voltiosRef} V`],["Sin carga a 6 V",`${ft.rpmSinCarga} RPM y ${ft.mASinCarga} mA`],["Bloqueado",`${Ct(ft.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${ft.reduccion} \xB7 rueda de ${ft.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>Ie("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"],["En KiCad","sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, puente PWR, C1 a C4 y el LED"]],validacion:()=>Ie("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=_t[t.carga]||_t.nominal;return[["Carga",`${e.nombre}: ${Ct(e.voltios)} V`],["Celdas",e.celdas.map((o,i)=>`${i+1}: ${Ct(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${Ct(_t.llena.voltios)} / ${Ct(_t.nominal.voltios)} / ${Ct(_t.descargada.voltios)} V`],["M\xEDnimo",`${Ct(We.minimoCeldaV)} V por celda (${Ct(We.minimoCeldaV*We.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>Ie("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${Ct(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${Ct(pe.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>Ie("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},qr=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function Xr(t){let e=qr(t).split(/\s+/).filter(Boolean),o=Pi.flatMap(i=>i.piezas.map(s=>({tipo:s,categoria:i.nombre})));return e.length?o.filter(({tipo:i,categoria:s})=>{let c=Eo[i],n=qr([c.nombre,s,c.descripcion,...c.palabras].join(" "));return e.every(d=>n.includes(d))}):o}var Kr="http://www.w3.org/2000/svg",Uc="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Bc=280,Jr=5e3,Yr=4,Zr=8,jc=9.6,Qr=.4,Lc=5,Wt=t=>JSON.parse(JSON.stringify(t)),it=t=>Math.round(t*100)/100,Po=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),Ti=t=>qe[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:qe.verde);function an(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||e.circuito?.placa||"uno";if(!wt[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let i=!!e.soloLectura,s=typeof e.alEvento=="function"?e.alEvento:null,c=[],n=Gc(e.circuito,o),d=document.createElement("div");d.className="tecnocircuito",t.appendChild(d);let l=d.attachShadow({mode:"open"});l.innerHTML=`<style>${js}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Jr} ${Jr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
      <div class="tc-capa-pines"></div>
    </div>
    <div class="tc-tip" hidden></div>
    <div class="tc-ayuda" aria-live="polite"></div>
  </div>
  <div class="tc-menu tc-biblioteca" role="dialog" aria-label="Piezas" hidden>
    <div class="tc-bib-cabeza">
      <b>Piezas</b>
      <button type="button" class="tc-cerrar" data-accion="cerrar" aria-label="Cerrar las piezas" title="Cerrar (Esc)">\xD7</button>
    </div>
    <input type="search" class="tc-buscar" placeholder="Buscar: motor, luz, pila\u2026" aria-label="Buscar una pieza" autocomplete="off">
    <div class="tc-bib-lista"></div>
    <p class="tc-bib-vacio" hidden></p>
    <p class="tc-bib-ayuda">Clic: la pieza aparece en el centro \xB7 Arr\xE1strala para ponerla donde quieras</p>
  </div>
  <div class="tc-ficha" hidden></div>
</div>`;let u=a=>l.querySelector(a),b=u(".tc"),y=u(".tc-barra"),$=u(".tc-biblioteca"),I=u(".tc-buscar"),v=u(".tc-bib-lista"),D=u(".tc-bib-vacio"),k=u(".tc-ficha"),B=y.querySelector('[data-accion="menu"]'),Rt=u(".tc-sel"),U=u(".tc-area"),Ft=u(".tc-mundo"),gt=u(".tc-capa-comp"),Ot=u(".tc-capa-pines"),E=u(".tc-cables"),et=u(".tc-asas"),[st,fe]=u(".tc-previa").children,St=u(".tc-ayuda"),Et=u(".tc-tip"),O={px:0,py:0,escala:1.5},V=new Map,m=new Map,x=null,S=null,R=null,rt=null,Ht=null,To=!1,Me=!1,Qe=!1,Io=null,pa=!1,nt={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},fa=new Set,Oi=[],ki=[],ha="",K=a=>n.componentes.find(r=>r.id===a),Mo=a=>a==="protoboard"?n.protoboard:K(a),De=a=>!!(a&&q[a.tipo]&&q[a.tipo].montada),Do=a=>a==="placa"||De(K(a))?{x:0,y:0,rot:0}:Mo(a);function Oo(a,r,p){let f=a==="placa"?wt[o]:q[r],h=document.createElement("div");h.className="tc-comp"+(a==="placa"?" tc-placa":""),h.dataset.id=a,r&&(h.dataset.tipo=r);let g;if(f&&f.dibujo){let w=document.createElement("template");w.innerHTML=f.dibujo.svg(p),g=w.content.firstElementChild}else f?(g=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(g,p),f.perilla&&g.addEventListener("input",()=>ns(a,Number(g.value)/100))):(g=document.createElement("div"),g.className="tc-desconocido",g.textContent=`\xBF${r}?`,g.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(g);let C=V.get("placa");f&&f.montada&&C?gt.insertBefore(h,C.div.nextSibling):gt.appendChild(h);let _={id:a,def:f,div:h,el:g,w:64,h:40,pines:new Map,lista:!1};return V.set(a,_),Promise.resolve(g.updateComplete).then(()=>{if(V.get(a)===_){if(f&&f.dibujo){let w=f.dibujo.marco?f.dibujo.marco(p):f.dibujo;Object.assign(_,{w:w.ancho,h:w.alto});for(let[N,H]of Object.entries(w.pines)){let tt=document.createElement("div");tt.className="tc-pin",tt.dataset.ref=`${a}.${N}`,Ot.appendChild(tt),_.pines.set(N,{px:H.x,py:H.y,div:tt})}}else if(f){Object.assign(_,zi(g));for(let w of g.pinInfo||[]){let N=f.nombrePin(w.name);if(!N)continue;let H=document.createElement("div");H.className="tc-pin",H.dataset.ref=`${a}.${N}`,Ot.appendChild(H),_.pines.set(N,{px:w.x,py:w.y,div:H})}}_.lista=!0,he(_),Gi(_)}})}function Ni(){let a=n.protoboard.tipo,r=Lt[a]||Lt.media,p=document.createElement("div");p.className="tc-comp tc-protoboard",p.dataset.id="protoboard",p.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=gi(a);let h=f.content.firstElementChild;p.appendChild(h);let g=V.get("placa");gt.insertBefore(p,g?g.div.nextSibling:gt.firstChild);let C={id:"protoboard",def:{protoboard:!0},div:p,el:h,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let _ of Xe(a)){let w=document.createElement("div");w.className="tc-pin tc-hueco",w.dataset.ref="protoboard."+_.nombre,w.style.left=_.x+"px",w.style.top=_.y+"px",p.appendChild(w),C.pines.set(_.nombre,{px:_.x,py:_.y,div:w})}return V.set("protoboard",C),he(C),No(),Promise.resolve()}function Vi(a=null){if(n.protoboard)return;let r=Aa(),p=Lt.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-p.ancho/2),y:Math.round(a.y-p.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},Ni(),ko(),bt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),Pt({tipo:"comp",id:"protoboard"}),!Qe&&!a&&so(),mt()}function ko(){let a=$.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,p]of Object.entries(q)){if(!p.montada)continue;let f=$.querySelector(`[data-tipo="${r}"]`),h=n.componentes.some(C=>C.tipo===r),g=p.placas&&!p.placas.includes(o);f&&Object.assign(f,{disabled:h||g,title:g?`${p.nombre} se monta en ${p.placas.map(C=>wt[C].nombre).join(" o ")}`:h?`Ya hay una ${p.nombre}`:""})}}}function pn(a){let r=V.get(a.id),p=n.protoboard;return!r||!r.lista||!p||!r.pines.size?null:[...r.pines].map(([f,h])=>{let g=ma(r,a,h);return{nombre:f,x:g.x-p.x,y:g.y-p.y}})}function Ui(a){let r=new Set;for(let p of n.componentes)if(p!==a&&p.en)for(let f of Object.values(p.en))r.add(f.slice(11));return r}function Bi(a){let r=pn(a);return r?wr(r,{tipo:n.protoboard.tipo,ocupados:Ui(a)}):null}function ua(a){if(De(a))return!1;let r=Bi(a);return r?(a.x=it(a.x+r.dx),a.y=it(a.y+r.dy),a.en=Object.fromEntries(Object.entries(r.en).map(([p,f])=>[p,"protoboard."+f]))):delete a.en,he(V.get(a.id)),No(),kt(),!!r}let to=[];function fn(a){ji();let r=n.protoboard&&Bi(a),p=V.get("protoboard");!r||!p||(to=Object.values(r.en).map(f=>p.pines.get(f).div),to.forEach(f=>f.classList.add("tc-destino")))}function ji(){to.forEach(a=>a.classList.remove("tc-destino")),to=[]}function No(){let a=V.get("protoboard");if(!a)return;let r=Ui(null);for(let[p,f]of a.pines)f.div.classList.toggle("tc-ocupado",r.has(p))}let Vo=[];function Li(a){Vo.forEach(C=>C.classList.remove("tc-tira")),Vo=[];let r=V.get("protoboard");if(!a||!r)return;let[p,f]=Uo(a),h=p==="protoboard"?f:null;if(!h){let C=K(p);C&&C.en&&C.en[f]&&(h=C.en[f].slice(11))}if(!h)return;let g=xi(h);for(let[C,_]of r.pines)xi(C)===g&&(_.div.classList.add("tc-tira"),Vo.push(_.div))}function Gi(a){if(a.id==="placa")if(a.def.mostrar)a.def.mostrar(a.el,nt.simulando?nt.placa:null);else for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!nt.placa[r];else if(a.def===q.led){let r=Number(nt.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",nt.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=nt.simulando&&(nt.piezas[a.id]||nt.servos[a.id])||null;a.def.mostrar(a.el,r,(K(a.id)||{}).props)}}function zi(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),p=r&&en(r.getAttribute("width")),f=r&&en(r.getAttribute("height"));return p&&f?{w:p,h:f}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function he(a){if(!a)return;let r=Do(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let p of a.pines.values()){let f=ma(a,r,p);p.div.style.left=f.x+"px",p.div.style.top=f.y+"px"}}function ma(a,r,p){let f=((r.rot||0)%360+360)%360;if(!f)return{x:r.x+p.px,y:r.y+p.py};let h=f*Math.PI/180,g=Math.round(Math.cos(h)*1e9)/1e9,C=Math.round(Math.sin(h)*1e9)/1e9,_=a.w/2,w=a.h/2,N=p.px-_,H=p.py-w;return{x:it(r.x+_+N*g-H*C),y:it(r.y+w+N*C+H*g)}}function Uo(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function ee(a){let[r,p]=Uo(a),f=V.get(r);if(!f||!f.lista)return null;let h=Do(r),g=Wi(a);return g?ma(f,h,g):f.def?null:{x:h.x+f.w/2,y:h.y+f.h/2}}function Wi(a){let[r,p]=Uo(a),f=V.get(r);if(!f)return null;if(f.pines.has(p))return f.pines.get(p);let h=r==="placa"&&Gt(o)?(Ke(o).puentes.find(g=>g.includes(p))||[p])[0]:p;return f.pines.get(h)}function Bo(a){let r=ee(a.de),p=ee(a.a);return!r||!p?null:[r,...(a.puntos||[]).map(([f,h])=>({x:f,y:h})),p]}function ue(a,r,p){let f=document.createElementNS(Kr,a);for(let h in r)f.setAttribute(h,r[h]);return p.appendChild(f),f}function kt(){for(let[a,r]of m)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(p=>p.remove()),m.delete(a));n.cables.forEach((a,r)=>{let p=m.get(a);if(!p){let w=ue("g",{class:"tc-cable"},E);p={g:w,borde:ue("path",{class:"tc-cable-borde"},w),linea:ue("path",{class:"tc-cable-linea"},w),p0:ue("circle",{class:"tc-punta",r:2.4},w),p1:ue("circle",{class:"tc-punta",r:2.4},w),toque:ue("path",{class:"tc-cable-toque"},w),asas:[]},m.set(a,p)}let f=Bo(a);if(p.g.style.display=f?"":"none",!f)return;let h=Ii(f),g=Ti(a.color);for(let w of[p.borde,p.linea,p.toque])w.setAttribute("d",h);p.linea.setAttribute("stroke",g),p.toque.dataset.i=r,Fi(p.p0,f[0],g),Fi(p.p1,f[f.length-1],g);let C=!!(x&&x.tipo==="cable"&&x.cable===a);p.g.classList.toggle("tc-seleccionado",C),C&&E.lastChild!==p.g&&E.appendChild(p.g);let _=C?(a.puntos||[]).length:0;for(;p.asas.length>_;)p.asas.pop().remove();for(;p.asas.length<_;)p.asas.push(ue("circle",{class:"tc-asa",r:3.6},et));p.asas.forEach((w,N)=>{w.setAttribute("cx",a.puntos[N][0]),w.setAttribute("cy",a.puntos[N][1]),w.dataset.i=r,w.dataset.p=N})})}function Fi(a,r,p){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",p)}function Oe(){let a=S&&ee(S.de);if(!a){st.setAttribute("d",""),fe.setAttribute("d","");return}let r=S.puntos.map(C=>({...C})),p=r.length?r[r.length-1]:a,f=S.cursor?jo(S.cursor,p):p,h=S.destino&&ee(S.destino);h&&(f=h,qi(r,a,h));let g=Ii([a,...r,f]);st.setAttribute("d",g),fe.setAttribute("d",g),fe.setAttribute("stroke",Ti(Hi()))}function Hi(){return S.color||hi(S.de,S.destino||"")}function jo(a,r){let p=Zr/O.escala;return{x:it(Math.abs(a.x-r.x)<p?r.x:a.x),y:it(Math.abs(a.y-r.y)<p?r.y:a.y)}}function qi(a,r,p){if(!a.length)return;let f=Zr/O.escala,h=a[a.length-1],g=a.length>1?a[a.length-2]:r;Math.abs(h.y-p.y)<f&&h.y!==g.y&&(h.y=p.y),Math.abs(h.x-p.x)<f&&h.x!==g.x&&(h.x=p.x)}function hn(a){Pt(null),S={de:a,puntos:[],cursor:null,destino:null,color:null},b.classList.add("tc-dibujando"),Ji(a,!0),Oe(),Lo(),Vt()}function xa(){S&&(Ji(S.de,!1),S=null,b.classList.remove("tc-dibujando"),Oe(),Lo(),Vt())}function Xi(a){if(qe[a]){if(S)S.color=a,Oe();else if(x&&x.tipo==="cable"){if(x.cable.color===a)return;x.cable.color=a,kt(),mt()}else return;Lo()}}function Ki(a){let r=S;if(!r)return;if(a===r.de)return xa();let p=ee(r.de),f=ee(a);if(p&&f&&qi(r.puntos,p,f),xa(),n.cables.some(g=>g.de===r.de&&g.a===a||g.de===a&&g.a===r.de)){$n("Esos dos pines ya est\xE1n unidos.");return}let h={de:r.de,a,color:r.color||hi(r.de,a)};r.puntos.length&&(h.puntos=r.puntos.map(g=>[it(g.x),it(g.y)])),n.cables.push(h),bt("cable_agregado",{de:h.de,a:h.a}),Pt({tipo:"cable",cable:h}),mt()}function un(a){let r=S.puntos.length?S.puntos[S.puntos.length-1]:ee(S.de);S.puntos.push(r?jo(a,r):a),Oe(),Vt()}function mn(){!S||!S.puntos.length||(S.puntos.pop(),Oe(),Vt())}function Ji(a,r){let p=Wi(a);p&&p.div.classList.toggle("tc-activo",r)}function ga(a){n.cables=n.cables.filter(r=>r!==a),bt("cable_quitado",{de:a.de,a:a.a})}function Pt(a){x=a;for(let r of V.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);kt(),Lo(),Vt()}function Lo(){if(ba(),Rt.textContent="",i||!x&&!S)return;let a=p=>Rt.insertAdjacentHTML("beforeend",p),r=p=>fi.forEach((f,h)=>{let g=qe[f],C=Sr[f]||f;a(`<button type="button" class="tc-muestra${p===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${h} \xB7 ${C}" aria-label="Cable ${C} (tecla ${h})" style="background:${g};color:${Fc(g)}">${h}</button>`)});if(S){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(Hi());return}if(x.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r(x.cable.color);else if(x.id==="protoboard")a(`<span class="tc-etiqueta">${(Lt[n.protoboard.tipo]||Lt.media).nombre}</span>`);else{let p=K(x.id),f=q[p.tipo],h=V.get(p.id);a(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),De(p)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let eo=null,Nt=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function ba(){let a=x&&x.tipo==="comp"&&!S?x.id==="protoboard"?"protoboard":(K(x.id)||{}).tipo:null,r=a&&Eo[a];if(k.hidden=!r||!$.hidden,!r)return k.textContent="";eo===null&&U.clientWidth&&(eo=U.clientWidth>=900);let p=eo!==!1,f=x.id==="protoboard"?null:K(x.id),h=f&&q[f.tipo],g=f&&V.get(f.id),C="";if(f&&h&&!i){for(let _ of h.campos||(h.campo?[h.campo]:[])){let w=String(f.props[_.prop]),N=_.opciones.map(([H,tt])=>`<option value="${H}"${w===String(H)?" selected":""}>${tt}</option>`).join("");C+=`<label class="tc-campo">${_.etiqueta} <select data-prop="${_.prop}">${N}</select></label>`}if(h.perilla){let _=Math.round((Number(f.props[h.perilla.prop])||0)*100);C+=`<label class="tc-campo">${h.perilla.etiqueta} <input type="range" min="0" max="100" value="${_}" data-perilla aria-label="${h.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let _=g&&g.el.value?" checked":"";C+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${_}> Ver encendido</label>`}}k.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${p}" aria-label="Ficha de ${Nt(r.nombre)}: ${p?"ocultar los detalles":"ver los detalles"}"><span>${Nt(r.nombre)}${f?` <small>${Nt(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${p?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${p||C?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${p?"":" hidden"}>${Nt(r.descripcion)}</p>`+(C?`<div class="tc-ficha-props">${C}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${p?"":" hidden"}></div></div>`,ya(),Yi()}function Yi(){if(k.hidden||!x)return;let a=V.get(x.id),r=x.id==="protoboard"?n.protoboard:K(x.id),p=!1;a&&r&&(p=O.px+(r.x+a.w/2)*O.escala>U.clientWidth/2),k.classList.toggle("tc-ficha-izq",p)}function ya(){let a=k.querySelector(".tc-ficha-datos");if(!a||!x)return;let r=x.id==="protoboard"?"protoboard":(K(x.id)||{}).tipo,p=Eo[r];if(!p)return;let f=x.id==="protoboard"?{}:K(x.id).props||{},h=p.validacion(f);a.innerHTML=`<dl>${p.datos(f).map(([g,C])=>`<dt>${Nt(g)}</dt><dd>${Nt(C)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${Nt(p.pines)}</p>`+(h?`<p class="tc-ficha-val ${h.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${h.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${Nt(h.texto)}</p>`:"")}k.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(eo=eo===!1,ba(),k.querySelector(".tc-ficha-titulo").focus())});let Zi=!1;function Qi(){if(!Zi){Zi=!0;for(let a of Pi){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let p of a.piezas){let f=Eo[p],h=document.createElement("button");h.type="button",h.className="tc-pieza",h.dataset.accion=p==="protoboard"?"protoboard":"agregar",p!=="protoboard"&&(h.dataset.tipo=p),h.dataset.pieza=p,h.setAttribute("aria-label",f.nombre),h.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${Nt(f.nombre)}</b><small>${Nt(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,h.querySelector(".tc-mini").append(xn(p)),r.append(h)}v.append(r)}}}function xn(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=gi("media"),r.content.firstElementChild;let p=q[a];if(p.dibujo)return r.innerHTML=p.dibujo.svg(a==="motor_tt"?{...p.props,vista:"rueda"}:p.props),r.content.firstElementChild;let f=document.createElement(p.etiqueta);return p.aplicar&&p.aplicar(f,Wt(p.props)),Promise.resolve(f.updateComplete).then(()=>{let h=zi(f);f.style.zoom=String(Math.min(1,58/h.w,42/h.h))}),f.inert=!0,f}function ts(){let a=new Set(Xr(I.value).filter(r=>!q[r.tipo]?.placas||q[r.tipo].placas.includes(o)).map(r=>r.tipo));for(let r of v.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of v.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");D.hidden=a.size>0,D.textContent=a.size?"":`No hay piezas con \xAB${I.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}I.addEventListener("input",ts),I.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=v.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let vt=null,Ca=!1;$.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||i||a.button!==0||(vt={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),$.addEventListener("pointermove",a=>{if(!vt)return;if(!vt.fantasma){if(Math.hypot(a.clientX-vt.x0,a.clientY-vt.y0)<Yr)return;let p=document.createElement("div");p.className="tc-fantasma",p.append(vt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),b.append(p),vt.fantasma=p,$.classList.add("tc-arrastrando")}let r=b.getBoundingClientRect();vt.fantasma.style.left=a.clientX-r.left+"px",vt.fantasma.style.top=a.clientY-r.top+"px"});function es(a,r){if(!vt)return;let{b:p,fantasma:f}=vt;if(vt=null,$.classList.remove("tc-arrastrando"),!f||(f.remove(),Ca=!0,setTimeout(()=>Ca=!1,0),r))return;let h=U.getBoundingClientRect(),g=$.getBoundingClientRect(),C=_=>a.clientX>=_.left&&a.clientX<=_.right&&a.clientY>=_.top&&a.clientY<=_.bottom;!C(h)||C(g)||(oo(!1),p.dataset.accion==="protoboard"?Vi(io(a)):os(p.dataset.tipo,io(a)))}$.addEventListener("pointerup",a=>es(a,!1)),$.addEventListener("pointercancel",a=>es(a,!0));function os(a,r=null){let p=q[a];if(!p||p.placas&&!p.placas.includes(o)||p.montada&&n.componentes.some(N=>N.tipo===a))return;let f=1;for(;K(p.prefijo+f);)f++;let h=p.prefijo+f,g=(U.clientWidth/2-O.px)/O.escala,C=(U.clientHeight/2-O.py)/O.escala,_=n.componentes.length%4*14,w={id:h,tipo:a,x:p.montada?0:Math.round(g-20+_),y:p.montada?0:Math.round(C-20+_),rot:0,props:Wt(p.props)};n.componentes.push(w),Oo(h,a,w.props).then(()=>{let N=V.get(h);r&&N&&!p.montada&&K(h)===w&&(w.x=Math.round(r.x-N.w/2),w.y=Math.round(r.y-N.h/2),he(N),kt(),mt()),n.protoboard&&K(h)===w&&ua(w)&&(bt("componente_cambiado",{id:h,x:w.x,y:w.y,en:Wt(w.en)}),mt())}),bt("componente_agregado",{id:h,tipo:a}),Pt({tipo:"comp",id:h}),mt()}function gn(a){let r=V.get(a.id);if(r){r.div.remove();for(let p of r.pines.values())p.div.remove();V.delete(a.id)}Oo(a.id,a.tipo,a.props).then(()=>{kt(),x&&x.id===a.id&&Pt({tipo:"comp",id:a.id})})}function as(){if(!x||x.tipo!=="comp"||x.id==="protoboard")return;let a=K(x.id);De(a)||(a.rot=((a.rot||0)+90)%360,he(V.get(a.id)),n.protoboard&&ua(a),kt(),bt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Wt(a.en):null}),mt())}function is(){if(x){if(x.tipo==="cable")ga(x.cable);else if(x.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>ga(r));for(let r of n.componentes)delete r.en;n.protoboard=null;let a=V.get("protoboard");a&&(a.div.remove(),V.delete("protoboard")),Vo=[],to=[],ko(),bt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=K(x.id),r=V.get(x.id);if(n.cables.filter(p=>p.de.startsWith(a.id+".")||p.a.startsWith(a.id+".")).forEach(p=>ga(p)),n.componentes=n.componentes.filter(p=>p!==a),r){r.div.remove();for(let p of r.pines.values())p.div.remove();V.delete(a.id)}bt("componente_quitado",{id:a.id,tipo:a.tipo}),No()}Wo(),Pt(null),mt()}}function oo(a){$.hidden=!a,ba(),B.setAttribute("aria-expanded",String(a)),a&&(Qi(),ko(),ts(),I.focus({preventScroll:!0}))}$.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||Ca)){if(oo(!1),r.dataset.accion==="cerrar")return B.focus();ss(r)}}),$.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),oo(!1),B.focus())}),l.addEventListener("pointerdown",a=>{!$.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==B&&oo(!1)}),y.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return oo($.hidden);ss(r)}});function ss(a){let r=a.dataset.accion;if(r==="acercar")return va(1.25);if(r==="alejar")return va(.8);if(r==="encuadrar")return Qe=!1,so();i||(r==="agregar"?os(a.dataset.tipo):r==="protoboard"?Vi():r==="girar"?as():r==="borrar"?is():r==="color"&&(Xi(a.dataset.color),U.focus({preventScroll:!0})))}function bn(a){if(i||!x||x.tipo!=="comp")return;let r=K(x.id),p=V.get(x.id),f=q[r.tipo];if(a.target.dataset.accion==="encender"){p.el.value=a.target.checked;return}let h=a.target.dataset.prop;if(!h||!f)return;let g=typeof f.props[h],C=g==="number"?Number(a.target.value):g==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[h]:C},f.dibujo&&f.dibujo.marco?gn(r):f.aplicar(p.el,r.props),ya(),bt("componente_cambiado",{id:r.id,props:Wt(r.props)}),mt()}function yn(a){if(i||!x||x.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=V.get(x.id);ns(x.id,Number(a.target.value)/100),r&&q.potenciometro.aplicar(r.el,K(x.id).props)}for(let a of[y,k])a.addEventListener("change",bn),a.addEventListener("input",yn);function ao(a,r,p){let f=V.get(a);if(f&&(f.el.pressed=r),r)fa.add(a);else if(!fa.delete(a))return;for(let h of Oi)try{h(a,r)}catch(g){console.error(g)}!r&&p!==void 0&&bt("boton_pulsado",{id:a,ms:Math.round(p)})}let rs=new Map;function ns(a,r){let p=K(a),f=V.get(a);if(!p)return;let h=q[p.tipo];if(i)return f&&h.aplicar(f.el,p.props);let g=Math.max(0,Math.min(1,Math.round(r*100)/100));if(g===p.props[h.perilla.prop])return;p.props={...p.props,[h.perilla.prop]:g};let C=x&&x.tipo==="comp"&&x.id===a&&k.querySelector("[data-perilla]");C&&Number(C.value)!==Math.round(g*100)&&(C.value=Math.round(g*100)),x&&x.id===a&&ya(),mt(),clearTimeout(rs.get(a)),rs.set(a,setTimeout(()=>bt("componente_cambiado",{id:a,props:Wt(p.props)}),400))}function io(a){let r=U.getBoundingClientRect();return{x:(a.clientX-r.left-O.px)/O.escala,y:(a.clientY-r.top-O.py)/O.escala}}function Sa(a){try{U.setPointerCapture(a.pointerId)}catch{}}function Go(a,r={}){R={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:O.px,py0:O.py,movido:!1,...r},Sa(a)}U.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;U.focus({preventScroll:!0}),Wo();let r=a.target,p=io(a);if(i)return Go(a);let f=r.closest(".tc-pin");if(f){if(a.preventDefault(),S)return Ki(f.dataset.ref);hn(f.dataset.ref),R={tipo:"pin",ref:f.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(S)return Go(a,{punto:p});let h=r.closest(".tc-asa");if(h)return R={tipo:"asa",cable:n.cables[+h.dataset.i],k:+h.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},Sa(a);let g=r.closest(".tc-cable-toque");if(g)return Pt({tipo:"cable",cable:n.cables[+g.dataset.i]});let C=r.closest(".tc-comp");if(C&&C.dataset.id!=="placa"){let _=C.dataset.id,w=Mo(_);if(w.tipo==="pulsador"&&(a.preventDefault(),nt.simulando)){ao(_,!0),R={tipo:"pulsar",id:_,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}return Pt({tipo:"comp",id:_}),De(w)?Go(a):q[w.tipo]&&q[w.tipo].perilla&&a.composedPath().some(qc)?void 0:(R={tipo:"mover",id:_,dx:p.x-w.x,dy:p.y-w.y,x0:a.clientX,y0:a.clientY,movido:!1},Sa(a))}Pt(null),Go(a)}),U.addEventListener("pointermove",a=>{let r=io(a);if(R&&R.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${R.id}"]`))){let p=R;R=null,ao(p.id,!1,performance.now()-p.desde)}if(R){if(!R.movido&&Math.hypot(a.clientX-R.x0,a.clientY-R.y0)>Yr&&(R.movido=!0,k.classList.add("tc-ficha-quieta")),R.movido&&R.tipo==="mover"){let p=Mo(R.id),f=Math.round(r.x-R.dx),h=Math.round(r.y-R.dy);if(R.id==="protoboard")for(let g of n.componentes)g.en&&(g.x=it(g.x+f-p.x),g.y=it(g.y+h-p.y),he(V.get(g.id)));p.x=f,p.y=h,he(V.get(R.id)),R.id!=="protoboard"&&n.protoboard&&fn(p),kt()}else if(R.movido&&R.tipo==="paneo")Qe=!0,O.px=R.px0+a.clientX-R.x0,O.py=R.py0+a.clientY-R.y0,U.classList.add("tc-paneando"),zo();else if(R.movido&&R.tipo==="asa"){let p=Bo(R.cable),f=jo(r,p[R.k]);f=jo(f,p[R.k+2]),R.cable.puntos[R.k]=[f.x,f.y],kt()}}if(S){let p=a.target.closest&&a.target.closest(".tc-pin");S.cursor=r,S.destino=p&&p.dataset.ref!==S.de?p.dataset.ref:null,Oe()}(!R||R.tipo==="pin")&&An(a.target.closest&&a.target.closest(".tc-pin")),nt.simulando&&cs(a.target)});function cs(a){let r=[],p=a&&a.closest&&a.closest(".tc-pin"),f=a&&a.closest&&a.closest(".tc-cable-toque");p?r=[p.dataset.ref]:f&&n.cables[+f.dataset.i]&&(r=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let h=r.join("|");if(h!==ha){ha=h;for(let g of ki)g(r)}}function ls(a){let r=R;if(R=null,U.classList.remove("tc-paneando"),k.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&Yi(),!!r){if(r.tipo==="pulsar")return ao(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let p=Mo(r.id);r.id==="protoboard"?bt("componente_cambiado",{id:"protoboard",x:p.x,y:p.y}):(ji(),(n.protoboard||p.en)&&ua(p),bt("componente_cambiado",{id:r.id,x:p.x,y:p.y,en:p.en?Wt(p.en):null})),mt()}else if(r.tipo==="asa"&&r.movido)mt();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&S)un(r.punto);else if(r.tipo==="pin"&&r.movido&&S&&a.type==="pointerup"){let p=l.elementFromPoint(a.clientX,a.clientY),f=p&&p.closest(".tc-pin");f&&f.dataset.ref!==r.ref&&Ki(f.dataset.ref)}}}U.addEventListener("pointerup",ls),U.addEventListener("pointercancel",ls),U.addEventListener("pointerleave",()=>{if(Wo(),ha&&cs(null),R&&R.tipo==="pulsar"){let a=R;R=null,ao(a.id,!1,performance.now()-a.desde)}}),U.addEventListener("dblclick",a=>{if(i||S)return;let r=l.elementFromPoint(a.clientX,a.clientY)||a.target,p=r.closest(".tc-asa"),f=r.closest(".tc-cable-toque");if(p){let h=n.cables[+p.dataset.i];h.puntos.splice(+p.dataset.p,1),h.puntos.length||delete h.puntos,kt(),Vt(),mt()}else if(f){let h=n.cables[+f.dataset.i],g=Bo(h),C=io(a),_=0,w=C,N=1/0;for(let H=0;H<g.length-1;H++){let tt=Hc(C,g[H],g[H+1]);Po(C,tt)<N&&(N=Po(C,tt),_=H,w=tt)}(h.puntos=h.puntos||[]).splice(_,0,[it(w.x),it(w.y)]),Pt({tipo:"cable",cable:h}),mt()}}),U.addEventListener("wheel",a=>{a.preventDefault();let r=U.getBoundingClientRect(),p=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));va(p,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),b.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,p=!0;a.key==="Escape"?S?xa():Pt(null):i?p=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),S?mn():is()):(a.key==="r"||a.key==="R")&&r?as():/^[0-9]$/.test(a.key)&&r&&(S||x&&x.tipo==="cable")?Xi(fi[Number(a.key)]):p=!1,p&&a.stopPropagation()});function zo(){Ft.style.transform=`translate(${O.px}px, ${O.py}px) scale(${O.escala})`;let a=jc*O.escala;U.style.backgroundSize=`${a}px ${a}px`,U.style.backgroundPosition=`${O.px}px ${O.py}px`,Wo()}function va(a,r,p){Qe=!0,r===void 0&&(r=U.clientWidth/2,p=U.clientHeight/2);let f=Math.min(Lc,Math.max(Qr,O.escala*a)),h=(r-O.px)/O.escala,g=(p-O.py)/O.escala;Object.assign(O,{escala:f,px:r-h*f,py:p-g*f}),zo()}function Aa(){let a=1/0,r=1/0,p=-1/0,f=-1/0,h=(g,C)=>{a=Math.min(a,g),r=Math.min(r,C),p=Math.max(p,g),f=Math.max(f,C)};for(let g of V.values()){let C=Do(g.id);if(!C)continue;let _=(C.rot||0)%180!==0,w=(_?g.h:g.w)/2,N=(_?g.w:g.h)/2;h(C.x+g.w/2-w,C.y+g.h/2-N),h(C.x+g.w/2+w,C.y+g.h/2+N)}for(let g of n.cables)for(let[C,_]of g.puntos||[])h(C,_);return isFinite(a)?{x0:a,y0:r,x1:p,y1:f}:null}function so(){let a=U.clientWidth,r=U.clientHeight;if(!a||!r)return!1;let p=Aa();if(!p)return!1;let{x0:f,y0:h,x1:g,y1:C}=p,_=48,w=Math.min((a-2*_)/(g-f||1),(r-2*_)/(C-h||1)),N=Math.min(2.4,Math.max(Qr,w));return Object.assign(O,{escala:N,px:a/2-(f+g)/2*N,py:r/2-(h+C)/2*N}),Io={ancho:a,alto:r},zo(),!0}function Cn(){let a=Aa()||{x0:0,y0:0,x1:100,y1:100},r=12,p=16,f=Math.max(Bc,Math.ceil(a.x1-a.x0+2*r)),h=Math.ceil(a.y1-a.y0+2*r)+p,g=[`<svg xmlns="${Kr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${h}" viewBox="0 0 ${f} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${it(r-a.x0)} ${it(r-a.y0)})">`];for(let C of gt.children){let _=V.get(C.dataset.id);_&&_.lista&&g.push(Sn(_))}for(let C of n.cables){let _=Bo(C);if(!_)continue;let w=Ii(_),N=Ti(C.color),H=tt=>`<circle cx="${tt.x}" cy="${tt.y}" r="2.4" fill="${N}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;g.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${w}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${w}" stroke="${N}" stroke-width="3"/>${H(_[0])}${H(_[_.length-1])}</g>`)}return g.push("</g>",`<text x="${f-r}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${tn(Uc)}</text>`,"</svg>"),g.join(`
`)}function Sn(a){let r=Do(a.id);if(!r)return"";let p=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let me=tn((K(a.id)||{}).tipo||"");return`<g transform="${p}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${me}?</text></g>`}let f=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!f)return"";let h=f.cloneNode(!0),g=[],C=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;C.nextNode();)g.push(C.currentNode);g.forEach(me=>me.remove());let _=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),w=h.querySelector("#rotating");_&&w&&w.setAttribute("transform",`rotate(${_[1]} 10 8)`),h.setAttribute("width",it(a.w)),h.setAttribute("height",it(a.h)),h.removeAttribute("id");let N="tc-"+a.id,H=[...new Set([...h.querySelectorAll("[id]")].map(me=>me.id))],tt=new XMLSerializer().serializeToString(h);for(let me of H)tt=zc(tt,me,N);tt=tt.replace(/^<svg\b/,`<svg id="${N}"`);let fs=a.el.shadowRoot?Wc(a.el,N,H):"";return`<g transform="${p}">${fs?`<style><![CDATA[
${fs}
]]></style>`:""}${tt}</g>`}function vn(a){let[r,p]=Uo(a);if(r==="placa")return wt[o].rotulo(p);if(r==="protoboard")return _r(p);let f=K(r),h=f&&q[f.tipo],g=f&&f.en&&f.en[p]?` \xB7 en el hueco ${f.en[p].slice(11)}`:"";return h?`${h.nombre}: ${h.rotulo(p)}${g}`:p}function An(a){let r=a?a.dataset.ref:null;if(r===rt)return;rt=r,Li(r);let p=r&&ee(r);if(!p){Et.hidden=!0;return}let f=O.py+p.y*O.escala,h=nt.voltajes[r],g=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;Et.textContent=vn(r)+g,Et.style.left=O.px+p.x*O.escala+"px",Et.style.top=f+"px",Et.classList.toggle("tc-abajo",f<44),Et.hidden=!1}function Wo(){rt=null,Et.hidden=!0,Li(null)}function Vt(){clearTimeout(Ht),St.classList.remove("tc-aviso");let a=x&&x.tipo==="cable"&&x.cable.puntos&&x.cable.puntos.length;St.textContent=i?"Solo lectura: puedes mover la vista y hacer zoom.":S?S.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":x&&x.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":x&&De(K(x.id))?`Va montada sobre ${wt[o].nombre}: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla`:x&&x.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":x&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":x?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":nt.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function $n(a){Vt(),St.textContent=a,St.classList.add("tc-aviso"),Ht=setTimeout(Vt,2500)}function bt(a,r){if(s)try{s({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(p){console.error(p)}}function mt(){let a=Wt(n);for(let r of c)try{r(a)}catch(p){console.error(p)}}function ds(a){b.classList.toggle("tc-oscuro",a==="oscuro"),b.classList.toggle("tc-claro",a==="claro")}let _n={circuito:()=>Wt(n),alCambiar(a){typeof a=="function"&&c.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:ds,exportarSVG:Cn,exportarNetlist:a=>kr(n,a),_alPulsar(a){typeof a=="function"&&Oi.push(a)},_alAcercar(a){typeof a=="function"&&ki.push(a)},_mostrar(a){let r=nt.simulando;nt={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==nt.simulando&&(b.classList.toggle("tc-simulando",nt.simulando),nt.simulando||[...fa].forEach(p=>ao(p,!1)),Vt()),rt=null;for(let p of V.values())p.lista&&Gi(p)},destruir(){pa=!0,ps.disconnect(),clearTimeout(Ht),c.length=0,V.clear(),m.clear(),d.remove()}};e.tema&&ds(e.tema),i&&b.classList.add("tc-solo-lectura"),zo(),Vt();let ps=new ResizeObserver(()=>{if(!To||pa)return;if(!Me){Me=so();return}if(Qe||!Io)return;let a=(r,p)=>Math.abs(r-p)/Math.max(1,p);(a(U.clientWidth,Io.ancho)>.1||a(U.clientHeight,Io.alto)>.1)&&so()});ps.observe(U);let wn=Oo("placa");return i||Qi(),ko(),Promise.all([wn,...n.protoboard?[Ni()]:[],...n.componentes.map(a=>Oo(a.id,a.tipo,a.props))]).then(()=>{pa||(To=!0,No(),kt(),Me=so())}),_n}function Gc(t,e){let o=t&&typeof t=="object"?Wt(t):{};o.formato=o.formato||1,o.placa=e;let i=new Set;if(o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(s=>s&&typeof s.id=="string"&&s.id&&s.id!=="placa"&&!s.id.includes(".")&&!i.has(s.id)&&i.add(s.id)),!t&&Gt(e)&&o.componentes.push({id:"exp1",tipo:"shield_nano_io",x:0,y:0,rot:0,props:{}}),o.componentes.filter(s=>s.tipo==="shield_nano_io").length>1)throw new Error("El Nano admite una sola expansi\xF3n E/S.");for(let s of o.componentes){s.x=Number(s.x)||0,s.y=Number(s.y)||0,s.rot=Number(s.rot)||0;let c=q[s.tipo]?q[s.tipo].props:{};if(q[s.tipo]?.placas&&!q[s.tipo].placas.includes(e))throw new Error(`${q[s.tipo].nombre} no se monta en ${wt[e].nombre}.`);if(s.props={...c,...s.props&&typeof s.props=="object"?s.props:{}},q[s.tipo]?.montada){if("en"in s)throw new Error(`${q[s.tipo].nombre} va montada sobre la placa; no se encaja en la protoboard.`);s.x=0,s.y=0,s.rot=0}}if(o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(s=>s&&typeof s.de=="string"&&typeof s.a=="string"),Gt(e)){let s=Ke(e).pines;for(let c of o.cables)for(let n of[c.de,c.a])if(n.startsWith("placa.")&&!s.includes(n.slice(6)))throw new Error(`${wt[e].nombre} no tiene el pin \xAB${n.slice(6)}\xBB. Revisa el cable antes de cambiar de placa.`)}for(let s of o.cables){let c=Array.isArray(s.puntos)&&s.puntos.every(n=>Array.isArray(n)&&n.length===2&&n.every(Number.isFinite));"puntos"in s&&!c&&delete s.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let s of o.componentes){let c=o.protoboard&&s.en&&typeof s.en=="object"&&Object.values(s.en).every(n=>typeof n=="string"&&n.startsWith("protoboard."));"en"in s&&!c&&delete s.en}return o}var sn=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),tn=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function zc(t,e,o){let i=sn(e),s=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${i}"`,"g"),(c,n)=>`${n}id="${s}"`).replace(new RegExp(`url\\(#${i}\\)`,"g"),()=>`url(#${s})`).replace(new RegExp(`href="#${i}"`,"g"),()=>`href="#${s}"`)}function Wc(t,e,o){let i=t.shadowRoot,s=[...i.adoptedStyleSheets||[]];i.querySelectorAll("style").forEach(n=>n.sheet&&s.push(n.sheet));let c=[];for(let n of s){let d;try{d=n.cssRules}catch{continue}for(let l of d){if(!l.selectorText||!l.style)continue;let u=l.selectorText.split(",").map(y=>y.trim()).filter(y=>!/:host|\binput\b|:focus|\.hide-input/.test(y));if(!u.length)continue;let b=u.map(y=>{let $=y;for(let I of o)$=$.replace(new RegExp(`#${sn(I)}(?![\\w-])`,"g"),()=>`#${e}-${I}`);return/^svg\b/.test($)?$.replace(/^svg\b/,`#${e}`):`#${e} ${$}`});c.push(`${b.join(", ")} { ${l.style.cssText} }`)}}return c.join(`
`)}function Fc(t){let[e,o,i]=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)/255);return .2126*e+.7152*o+.0722*i>.55?"#1d2733":"#ffffff"}function en(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function Ii(t){let e=i=>`${it(i.x)} ${it(i.y)}`,o=`M${e(t[0])}`;for(let i=1;i<t.length-1;i++){let s=t[i-1],c=t[i],n=t[i+1],d=Math.min(5,Po(s,c)/2,Po(c,n)/2);o+=` L${e(on(c,s,d))} Q${e(c)} ${e(on(c,n,d))}`}return`${o} L${e(t[t.length-1])}`}function on(t,e,o){let i=Po(t,e);return i?{x:t.x+(e.x-t.x)*o/i,y:t.y+(e.y-t.y)*o/i}:t}function Hc(t,e,o){let i=o.x-e.x,s=o.y-e.y,c=i*i+s*s,n=c?Math.max(0,Math.min(1,((t.x-e.x)*i+(t.y-e.y)*s)/c)):0;return{x:e.x+n*i,y:e.y+n*s}}function qc(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}var Mi={0:null,1:0,2:2,3:4,4:2,5:4};function rn(t){let e=new Uint8Array(32768),o=0,i=!1;for(let[s,c]of String(t).split(/\r?\n/).entries()){let n=c.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${s+1}).`);let d=n.slice(1).match(/../g).map(I=>parseInt(I,16));if(d.reduce((I,v)=>I+v,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let[l,u,b,y]=d;if(d.length!==l+5||!(y in Mi)||Mi[y]!==null&&l!==Mi[y])throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let $=d.slice(4,4+l);if(y===0){let I=o+(u<<8|b);if(I+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set($,I)}else if(y===1){i=!0;break}else y===2?o=($[0]<<8|$[1])<<4:y===4&&(o=($[0]<<8|$[1])<<16)}if(!i)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var Xc=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],Di='(()=>{function He(t,e){let o=t.dataView.getUint16(93,!0);t.data[o]=t.pc&255,t.data[o-1]=t.pc>>8&255,t.pc22Bits&&(t.data[o-2]=t.pc>>16&255),t.dataView.setUint16(93,o-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var aa=256,ia=128,pe=class{constructor(e,o=8192){this.progMem=e,this.sramBytes=o,this.data=new Uint8Array(this.sramBytes+aa),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(ia),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,o,s=255){let a=this.writeHooks[e];a&&a(o,this.data[e],e,s)||(this.data[e]=o)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:o,flagMask:s,enableRegister:a,enableMask:i}=e;e.inverseFlag?this.data[o]&=~s:this.data[o]|=s,this.data[a]&i&&this.queueInterrupt(e)}updateInterruptEnable(e,o){let{enableMask:s,flagRegister:a,flagMask:i,inverseFlag:n}=e;if(o&s){let r=this.data[a]&i;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:o}=e;this.pendingInterrupts[o]=e,(this.nextInterrupt===-1||this.nextInterrupt>o)&&(this.nextInterrupt=o),o>this.maxInterrupt&&(this.maxInterrupt=o)}clearInterrupt({address:e,flagRegister:o,flagMask:s},a=!0){a&&(this.data[o]&=~s);let{pendingInterrupts:i,maxInterrupt:n}=this;if(i[e]&&(i[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(i[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,o){let{flagRegister:s,flagMask:a}=e;o&a&&(this.data[s]&=~a,this.clearInterrupt(e))}addClockEvent(e,o){let{clockEventPool:s}=this;o=this.cycles+Math.max(1,o);let a=s.pop(),i=a??{cycles:o,callback:e,next:null};i.cycles=o,i.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<o;)r=n,n=n.next;return r?(r.next=i,i.next=n):(this.nextClockEvent=i,i.next=n),e}updateClockEvent(e,o){return this.clearClockEvent(e)?(this.addClockEvent(e,o),!0):!1}clearClockEvent(e){let{nextClockEvent:o}=this;if(!o)return!1;let{clockEventPool:s}=this,a=null;for(;o;){if(o.callback===e)return a?a.next=o.next:this.nextClockEvent=o.next,s.length<10&&s.push(o),!0;a=o,o=o.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:o}=this;if(this.interruptsEnabled&&o>=0){let s=this.pendingInterrupts[o];He(this,s.address),s.constant||this.clearInterrupt(s)}}};function ue(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Ke(t){let e=t.progMem[t.pc];if((e&64512)===7168){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s+(t.data[95]&1),i=a&255;t.data[(e&496)>>4]=i;let n=t.data[95]&192;n|=i?0:2,n|=128&i?4:0,n|=(i^s)&(o^i)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a&256?1:0,n|=1&(o&s|s&~i|~i&o)?32:0,t.data[95]=n}else if((e&64512)===3072){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s&255;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(a^s)&(a^o)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=o+s&256?1:0,i|=1&(o&s|s&~a|~a&o)?32:0,t.data[95]=i}else if((e&65280)===38400){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=s+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(o,a,!0);let i=t.data[95]&224;i|=a?0:2,i|=32768&a?4:0,i|=~s&a&32768?8:0,i|=i>>2&1^i>>3&1?16:0,i|=~a&s&32768?1:0,t.data[95]=i,t.cycles++}else if((e&64512)===8192){let o=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===28672){let o=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65039)===37893){let o=t.data[(e&496)>>4],s=o>>>1|128&o;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let o=e&7,s=(e&496)>>4;t.data[s]=~(1<<o)&t.data[s]|(t.data[95]>>6&1)<<o}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let o=t.data[(e&496)>>4],s=e&7;t.data[95]=t.data[95]&191|(o>>s&1?64:0)}else if((e&65038)===37902){let o=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,s=t.pc+2,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc=o-1,t.cycles+=i?4:3}else if((e&65280)===38912){let o=e&248,s=e&7,a=t.readData((o>>3)+32),i=1<<s;t.writeData((o>>3)+32,a&~i,i)}else if((e&65039)===37888){let o=(e&496)>>4,s=255-t.data[o];t.data[o]=s;let a=t.data[95]&225|1;a|=s?0:2,a|=128&s?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===5120){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=((o^s)&(o^a)&128)!==0?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===1024){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===12288){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.pc+=s,t.cycles+=s}}else if((e&65039)===37898){let o=t.data[(e&496)>>4],s=o-1;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===128?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(e===38169){let o=t.pc+1,s=t.dataView.getUint16(93,!0),a=t.data[92];t.data[s]=o&255,t.data[s-1]=o>>8&255,t.data[s-2]=o>>16&255,t.dataView.setUint16(93,s-3,!0),t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let o=t.data[92];t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let o=t.data[91];t.data[0]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let o=t.data[91];t.data[(e&496)>>4]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let o=t.data[91],s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o<<16|s],t.dataView.setUint16(30,s+1,!0),s===65535&&(t.data[91]=(o+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let o=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65416)===776){let o=t.data[((e&112)>>4)+16],s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setUint16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===896){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.dataView.getInt8((e&7)+16),a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===904){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?2:0)|(o*s&32768?1:0),t.cycles++}else if(e===38153){let o=t.pc+1,s=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[s]=o&255,t.data[s-1]=o>>8&255,a&&(t.data[s-2]=o>>16&255),t.dataView.setUint16(93,s-(a?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=a?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let o=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=o}else if((e&65039)===37891){let o=t.data[(e&496)>>4],s=o+1&255;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===127?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a&255-s),t.data[o]=a}else if((e&65039)===37381){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a|s),t.data[o]=a}else if((e&65039)===37383){let o=t.data[(e&496)>>4],s=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o^s),t.data[(e&496)>>4]=s}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let o=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=o,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let o=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(26,o+1,!0)}else if((e&65039)===36878){let o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let o=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(28,o+1,!0)}else if((e&65039)===36874){let o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let o=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(30,o+1,!0)}else if((e&65039)===36866){let o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o],t.dataView.setUint16(30,o+1,!0),t.cycles+=2}else if((e&65039)===37894){let o=t.data[(e&496)>>4],s=o>>>1;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let o=2*(e&15),s=2*((e&240)>>4);t.data[s]=t.data[o],t.data[s+1]=t.data[o+1]}else if((e&64512)===39936){let o=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65280)===512){let o=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65416)===768){let o=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65039)===37889){let o=(e&496)>>4,s=t.data[o],a=0-s;t.data[o]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=a===128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=a?1:0,i|=1&(a|s)?32:0,t.data[95]=i}else if(e!==0){if((e&64512)===10240){let o=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===24576){let o=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let o=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,o,!0),t.data[(e&496)>>4]=t.data[o],t.cycles++}else if((e&65039)===37391){let o=t.dataView.getUint16(93,!0);t.data[o]=t.data[(e&496)>>4],t.dataView.setUint16(93,o-1,!0),t.cycles++}else if((e&61440)===53248){let o=(e&2047)-(e&2048?2048:0),s=t.pc+1,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc+=o,t.cycles+=i?3:2}else if(e===38152){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3}else if(e===38168){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let o=t.data[(e&496)>>4],s=o>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=1&o?1:0,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===2048){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);t.data[(e&496)>>4]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===16384){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=t.data[95],i=o-s-(a&1);t.data[((e&240)>>4)+16]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&65280)===39424){let o=((e&248)>>3)+32,s=1<<(e&7);t.writeData(o,t.readData(o)|s,s),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===38656){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=e&15|(e&192)>>2,i=s-a;t.dataView.setUint16(o,i,!0);let n=t.data[95]&192;n|=i?0:2,n|=32768&i?4:0,n|=s&~i&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a>s?1:0,n|=1&(~s&a|a&i|i&~s)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let o=t.data[(e&496)>>4],s=t.progMem[t.pc+1];t.writeData(s,o),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let o=t.dataView.getUint16(26,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(26,o+1,!0),t.cycles++}else if((e&65039)===37390){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.writeData(s,o),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0);t.writeData(s,o),t.dataView.setUint16(28,s+1,!0),t.cycles++}else if((e&65039)===37386){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let o=t.dataView.getUint16(30,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(30,o+1,!0),t.cycles++}else if((e&65039)===37378){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&61440)===20480){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s;t.data[((e&240)>>4)+16]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&65039)===37890){let o=(e&496)>>4,s=t.data[o];t.data[o]=(15&s)<<4|(240&s)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let o=(e&496)>>4,s=t.data[o],a=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=s,t.data[o]=a}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var Rt;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(Rt||(Rt={}));var Z;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(Z||(Z={}));var Oo={0:{type:Z.SingleEnded,channel:0},1:{type:Z.SingleEnded,channel:1},2:{type:Z.SingleEnded,channel:2},3:{type:Z.SingleEnded,channel:3},4:{type:Z.SingleEnded,channel:4},5:{type:Z.SingleEnded,channel:5},6:{type:Z.SingleEnded,channel:6},7:{type:Z.SingleEnded,channel:7},8:{type:Z.Temperature},14:{type:Z.Constant,voltage:1.1},15:{type:Z.Constant,voltage:0}},na={type:Z.Constant,voltage:0},ze={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Oo,adcReferences:[Rt.AREF,Rt.AVCC,Rt.Reserved,Rt.Internal1V1]},ra=7,ca=8,la=16,Vo=64,Xe=128,fa=31,da=32,ha=8,xa=8,pa=3,ua=6,me=class{constructor(e,o){this.cpu=e,this.config=o,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=s=>{var a;let i=0;switch(s.type){case Z.Constant:i=s.voltage;break;case Z.SingleEnded:i=(a=this.channelValues[s.channel])!==null&&a!==void 0?a:0;break;case Z.Differential:i=s.gain*((this.channelValues[s.positiveChannel]||0)-(this.channelValues[s.negativeChannel]||0));break;case Z.Temperature:i=.378125;break}let n=i/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:la,enableRegister:this.config.ADCSRA,enableMask:ca},e.writeHooks[o.ADCSRA]=(s,a)=>{var i;if(s&Xe&&!(a&Xe)&&(this.conversionCycles=25),e.data[o.ADCSRA]=s,e.updateInterruptEnable(this.ADC,s),!this.converting&&s&Vo){if(!(s&Xe))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&fa;e.data[o.ADCSRB]&ha&&(n|=32),n&=o.muxInputMask;let r=(i=o.muxChannels[n])!==null&&i!==void 0?i:na;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:o,ADCH:s,ADMUX:a,ADCSRA:i}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[a]&da?(this.cpu.data[o]=e<<6&255,this.cpu.data[s]=e>>2):(this.cpu.data[o]=e&255,this.cpu.data[s]=e>>8&3),this.cpu.data[i]&=~Vo,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&ra){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:o,adcReferences:s}=this.config,a=this.cpu.data[o]>>ua&pa;return s.length>4&&this.cpu.data[o]&xa&&(a|=4),(e=s[a])!==null&&e!==void 0?e:Rt.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case Rt.AVCC:return this.avcc;case Rt.AREF:return this.aref;case Rt.Internal1V1:return 1.1;case Rt.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var ma=2,ga=4,Ca=8,Sa=16,Aa=32,Gi=ma|ga|Ca|Sa|Aa;var ko={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Uo={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},No={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Bo={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},jo={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var zt={PIN:35,DDR:36,PORT:37,pinChange:No,externalInterrupts:[]},qe={PIN:38,DDR:39,PORT:40,pinChange:Bo,externalInterrupts:[]},Ot={PIN:41,DDR:42,PORT:43,pinChange:jo,externalInterrupts:[null,null,ko,Uo]};var nt;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(nt||(nt={}));var K;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(K||(K={}));var Xt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Xt||(Xt={}));var ge=class{constructor(e,o){var s,a,i,n;this.cpu=e,this.portConfig=o,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[o.PORT]=this,e.writeHooks[o.DDR]=m=>{let $=e.data[o.PORT];return e.data[o.DDR]=m,this.writeGpio($,m),this.updatePinRegister(m),!0},e.writeHooks[o.PORT]=m=>{let $=e.data[o.DDR];return e.data[o.PORT]=m,this.writeGpio(m,$),this.updatePinRegister($),!0},e.writeHooks[o.PIN]=(m,$,P,g)=>{let M=e.data[o.PORT],A=e.data[o.DDR],_=M^m&g;return e.data[o.PORT]=_,this.writeGpio(_,A),this.updatePinRegister(A),!0};let{externalInterrupts:r}=o;this.externalInts=r.map(m=>m?{address:m.interrupt,flagRegister:m.EIFR,flagMask:1<<m.index,enableRegister:m.EIMSK,enableMask:1<<m.index}:null);let c=new Set(r.map(m=>m?.EICR));for(let m of c)this.attachInterruptHook(m||0);let C=(a=(s=r.find(m=>m&&m.EIMSK))===null||s===void 0?void 0:s.EIMSK)!==null&&a!==void 0?a:0;this.attachInterruptHook(C,"mask");let p=(n=(i=r.find(m=>m&&m.EIFR))===null||i===void 0?void 0:i.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(p,"flag");let{pinChange:b}=o;if(this.PCINT=b?{address:b.pinChangeInterrupt,flagRegister:b.PCIFR,flagMask:1<<b.PCIE,enableRegister:b.PCICR,enableMask:1<<b.PCIE}:null,b){let{PCIFR:m,PCMSK:$}=b;e.writeHooks[m]=P=>{for(let g of this.cpu.gpioPorts){let{PCINT:M}=g;M&&e.clearInterruptByFlag(M,P)}return!0},e.writeHooks[$]=P=>{e.data[$]=P;for(let g of this.cpu.gpioPorts){let{PCINT:M}=g;M&&e.updateInterruptEnable(M,P)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(o=>o!==e)}pinState(e){let o=this.cpu.data[this.portConfig.DDR],s=this.cpu.data[this.portConfig.PORT],a=1<<e,i=s&a?nt.InputPullUp:nt.Input,n=this.openCollector&a?i:nt.High;return o&a?this.lastValue&a?n:nt.Low:i}setPin(e,o){let s=1<<e;this.pinValue&=~s,o&&(this.pinValue|=s),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,o){let{cpu:s,portConfig:a}=this,i=1<<e;if(o===K.None)this.overrideMask|=i,this.overrideValue&=~i;else switch(this.overrideMask&=~i,o){case K.Enable:this.overrideValue&=~i,this.overrideValue|=s.data[a.PORT]&i;break;case K.Set:this.overrideValue|=i;break;case K.Clear:this.overrideValue&=~i;break;case K.Toggle:this.overrideValue^=i;break}let n=s.data[a.DDR];this.writeGpio(s.data[a.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var o,s;let a=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=a,this.lastPin!==a){for(let i=0;i<8;i++)if((a&1<<i)!==(this.lastPin&1<<i)){let n=!!(a&1<<i);this.toggleInterrupt(i,n),(s=(o=this.externalClockListeners)[i])===null||s===void 0||s.call(o,n)}this.lastPin=a}}toggleInterrupt(e,o){let{cpu:s,portConfig:a,externalInts:i,PCINT:n}=this,{externalInterrupts:r,pinChange:c}=a,C=r[e],p=i[e];if(p&&C){let{EIMSK:b,index:m,EICR:$,iscOffset:P}=C;if(s.data[b]&1<<m){let g=s.data[$]>>P&3,M=!1;switch(p.constant=!1,g){case Xt.LowLevel:M=!o,p.constant=!0;break;case Xt.Change:M=!0;break;case Xt.FallingEdge:M=!o;break;case Xt.RisingEdge:M=o;break}M?s.setInterruptFlag(p):p.constant&&s.clearInterrupt(p,!0)}}if(c&&n&&c.mask&1<<e){let{PCMSK:b}=c;s.data[b]&1<<e+c.offset&&s.setInterruptFlag(n)}}attachInterruptHook(e,o="other"){if(!e)return;let{cpu:s}=this;s.writeHooks[e]=a=>{o!=="flag"&&(s.data[e]=a);for(let i of s.gpioPorts){for(let n of i.externalInts)n&&o==="mask"&&s.updateInterruptEnable(n,a),n&&!n.constant&&o==="flag"&&s.clearInterruptByFlag(n,a);i.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:o}=this.portConfig;for(let s=0;s<8;s++){let a=o[s];if(!a)continue;let i=!!(this.lastPin&1<<s),{EIFR:n,EIMSK:r,index:c,EICR:C,iscOffset:p,interrupt:b}=a;if(!(e.data[r]&1<<c)||i)continue;(e.data[C]>>p&3)===Xt.LowLevel&&e.queueInterrupt({address:b,flagRegister:n,flagMask:1<<c,enableRegister:r,enableMask:1<<c,constant:!0})}}writeGpio(e,o){let s=(e&this.overrideMask|this.overrideValue)&o|e&~o,a=this.lastValue;if(s!==a||o!==this.lastDdr){this.lastValue=s,this.lastDdr=o;for(let i of this.listeners)i(s,a)}}};var Lo={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Ce;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Ce||(Ce={}));var Ze={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Ye=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Lo,compPortA:Ot.PORT,compPinA:6,compPortB:Ot.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:4},Ze),Qe=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Lo,compPortA:zt.PORT,compPinA:1,compPortB:zt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:5},Ze),to=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:zt.PORT,compPinA:3,compPortB:Ot.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Ze),oe;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(oe||(oe={}));var X;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(X||(X={}));var B;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(B||(B={}));var kt=1,ee=2,qt=1,{Normal:eo,PWMPhaseCorrect:_t,CTC:ve,FastPWM:Pt,Reserved:Je,PWMPhaseFrequencyCorrect:Se}=oe,Ra=[[eo,255,B.Immediate,X.Max,0],[_t,255,B.Top,X.Bottom,0],[ve,kt,B.Immediate,X.Max,0],[Pt,255,B.Bottom,X.Max,0],[Je,255,B.Immediate,X.Max,0],[_t,kt,B.Top,X.Bottom,qt],[Je,255,B.Immediate,X.Max,0],[Pt,kt,B.Bottom,X.Top,qt]],ba=[[eo,65535,B.Immediate,X.Max,0],[_t,255,B.Top,X.Bottom,0],[_t,511,B.Top,X.Bottom,0],[_t,1023,B.Top,X.Bottom,0],[ve,kt,B.Immediate,X.Max,0],[Pt,255,B.Bottom,X.Top,0],[Pt,511,B.Bottom,X.Top,0],[Pt,1023,B.Bottom,X.Top,0],[Se,ee,B.Bottom,X.Bottom,0],[Se,kt,B.Bottom,X.Bottom,qt],[_t,ee,B.Top,X.Bottom,0],[_t,kt,B.Top,X.Bottom,qt],[ve,ee,B.Immediate,X.Max,0],[Je,65535,B.Immediate,X.Max,0],[Pt,ee,B.Bottom,X.Top,qt],[Pt,kt,B.Bottom,X.Top,qt]];function Ia(t){switch(t){case 1:return K.Toggle;case 2:return K.Clear;case 3:return K.Set;default:return K.Enable}}var Fo=128,Wo=64,Ma=32,Ae=class{constructor(e,o){if(this.cpu=e,this.config=o,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=B.Immediate,this.tovUpdateMode=X.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(s=!0,a=!1)=>{let{divider:i,lastCycle:n,cpu:r}=this,{cycles:c}=r,C=c-n;if(i&&C>=i||a){let p=a?1:Math.floor(C/i);this.lastCycle+=p*i;let b=this.tcnt,{timerMode:m,TOP:$}=this,P=m===_t||m===Se,g=P?this.phasePwmCount(b,p):(b+p)%($+1),M=b+p>$;if(this.tcntUpdated||(this.tcnt=g,P||this.timerUpdated(g,b)),!P){if(m===Pt&&M){let{compA:A,compB:_}=this;A&&this.updateCompPin(A,"A",!0),_&&this.updateCompPin(_,"B",!0)}this.ocrUpdateMode==B.Bottom&&M&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),M&&(this.tovUpdateMode==X.Top||$===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===B.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===B.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:p}=this,{externalClockPin:b}=this.config,m=this.config.dividers[p];this.lastCycle=m?this.cpu.cycles:0,this.updateDivider=!1,this.divider=m,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[b]=null),m?r.addClockEvent(this.count,this.lastCycle+m-r.cycles):this.externalClockPort&&(p===Ce.FallingEdge||p===Ce.RisingEdge)&&(this.externalClockPort.externalClockListeners[b]=this.externalClockCallback,this.externalClockRisingEdge=p===Ce.RisingEdge);return}s&&i&&r.addClockEvent(this.count,this.lastCycle+i-r.cycles)},this.externalClockCallback=s=>{s===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[o.TCNT]=s=>(this.count(!1),this.config.bits===16&&(this.cpu.data[s+1]=this.tcnt>>8),this.cpu.data[s]=this.tcnt&255),this.cpu.writeHooks[o.TCNT]=s=>{this.tcntNext=this.highByteTemp<<8|s,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[o.OCRA]=s=>{this.nextOcrA=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[o.OCRB]=s=>{this.nextOcrB=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[o.OCRC]=s=>{this.nextOcrC=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[o.ICR]=i=>{this.icr=this.highByteTemp<<8|i};let s=i=>{this.highByteTemp=i},a=(i,n,r)=>(this.highByteTemp=i&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[o.TCNT+1]=s,this.cpu.writeHooks[o.OCRA+1]=a,this.cpu.writeHooks[o.OCRB+1]=a,this.hasOCRC&&(this.cpu.writeHooks[o.OCRC+1]=a),this.cpu.writeHooks[o.ICR+1]=s}e.writeHooks[o.TCCRA]=s=>(this.cpu.data[o.TCCRA]=s,this.updateWGMConfig(),!0),e.writeHooks[o.TCCRB]=s=>(o.TCCRC||(this.checkForceCompare(s),s&=~(Fo|Wo)),this.cpu.data[o.TCCRB]=s,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),o.TCCRC&&(e.writeHooks[o.TCCRC]=s=>{this.checkForceCompare(s)}),e.writeHooks[o.TIFR]=s=>(this.cpu.data[o.TIFR]=s,this.cpu.clearInterruptByFlag(this.OVF,s),this.cpu.clearInterruptByFlag(this.OCFA,s),this.cpu.clearInterruptByFlag(this.OCFB,s),!0),e.writeHooks[o.TIMSK]=s=>{this.cpu.updateInterruptEnable(this.OVF,s),this.cpu.updateInterruptEnable(this.OCFA,s),this.cpu.updateInterruptEnable(this.OCFB,s)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case kt:return this.ocrA;case ee:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case kt:case ee:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:o}=this,s=e.bits===16?ba:Ra,a=this.cpu.data[e.TCCRA],[i,n,r,c,C]=s[o];this.timerMode=i,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=c;let p=i===Pt||i===_t||i===Se,b=this.compA;this.compA=a>>6&3,this.compA===1&&p&&!(C&qt)&&(this.compA=0),!!b!=!!this.compA&&this.updateCompA(this.compA?K.Enable:K.None);let m=this.compB;if(this.compB=a>>4&3,this.compB===1&&p&&(this.compB=0),!!m!=!!this.compB&&this.updateCompB(this.compB?K.Enable:K.None),this.hasOCRC){let $=this.compC;this.compC=a>>2&3,this.compC===1&&p&&(this.compC=0),!!$!=!!this.compC&&this.updateCompC(this.compC?K.Enable:K.None)}}phasePwmCount(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n,TOP:r,MAX:c,tcntUpdated:C}=this;for(!e&&!r&&(o=0,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));o>0;)this.countingUp?(e++,e===r&&!C&&(this.countingUp=!1,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!C&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===B.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),C||(e===s&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===a&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===i&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),o--;return e&c}timerUpdated(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n}=this,r=o>e;((o<s||r)&&e>=s||o<s&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((o<a||r)&&e>=a||o<a&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((o<i||r)&&e>=i||o<i&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==oe.FastPWM||this.timerMode==oe.PWMPhaseCorrect||this.timerMode==oe.PWMPhaseFrequencyCorrect||(e&Fo&&this.updateCompPin(this.compA,"A"),e&Wo&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ma&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,o,s=!1){let a=K.None,i=e===3,n=this.countingUp===i;switch(this.timerMode){case eo:case ve:a=Ia(e);break;case Pt:e===1?a=s?K.None:K.Toggle:a=i!==s?K.Set:K.Clear;break;case _t:case Se:e===1?a=K.Toggle:a=n?K.Set:K.Clear;break}a!==K.None&&(o==="A"?this.updateCompA(a):o==="B"?this.updateCompB(a):this.updateCompC(a))}updateCompA(e){let{compPortA:o,compPinA:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompB(e){let{compPortB:o,compPinB:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompC(e){let{compPortC:o,compPinC:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}};var so={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},Ta=128,wa=64,Go=32;var oo=2,ya=1,Ho=oo,$a=128,_a=64,Pa=32,Ve=16,Oe=8,qo=4;var Ko=qo|Ve|Oe;var Ea=32,Da=16,va=8,Xo=4,zo=2;var Va={5:31,6:63,7:127,8:255,9:255},Re=class{constructor(e,o,s){this.cpu=e,this.config=o,this.freqHz=s,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Ta,enableRegister:this.config.UCSRB,enableMask:$a,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Go,enableRegister:this.config.UCSRB,enableMask:Pa},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:wa,enableRegister:this.config.UCSRB,enableMask:_a},this.reset(),this.cpu.writeHooks[o.UCSRA]=(a,i)=>{var n;return e.data[o.UCSRA]=a&(ya|oo),e.clearInterruptByFlag(this.TXC,a),(a&Ho)!==(i&Ho)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRB]=(a,i)=>{var n;return e.updateInterruptEnable(this.RXC,a),e.updateInterruptEnable(this.UDRE,a),e.updateInterruptEnable(this.TXC,a),a&Ve&&i&Ve&&e.clearInterrupt(this.RXC),a&Oe&&!(i&Oe)&&e.setInterruptFlag(this.UDRE),e.data[o.UCSRB]=a,(a&Ko)!==(i&Ko)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRC]=a=>{var i;return e.data[o.UCSRC]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.readHooks[o.UDR]=()=>{var a;let i=(a=Va[this.bitsPerChar])!==null&&a!==void 0?a:255,n=this.rxByte&i;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[o.UDR]=a=>{if(this.onByteTransmit&&this.onByteTransmit(a),this.onLineTransmit){let i=String.fromCharCode(a);i===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=i}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[o.UBRRH]=a=>{var i;return this.cpu.data[o.UBRRH]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.writeHooks[o.UBRRL]=a=>{var i;return this.cpu.data[o.UBRRL]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Go,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Xo|zo,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,o=!1){var s;let{cpu:a}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(o)this.rxByte=e,a.setInterruptFlag(this.RXC),(s=this.onRxComplete)===null||s===void 0||s.call(this);else return this.rxBusyValue=!0,a.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:o}=this.config;return this.cpu.data[e]<<8|this.cpu.data[o]}get multiplier(){return this.cpu.data[this.config.UCSRA]&oo?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ve)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Oe)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Xo|zo))>>1|this.cpu.data[this.config.UCSRB]&qo){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&va?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Ea)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&Da)}};var ao={0:null,1:0,2:2,3:4,4:2,5:4};function Jo(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[a,i]of String(t).split(/\\r?\\n/).entries()){let n=i.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${a+1}).`);let r=n.slice(1).match(/../g).map($=>parseInt($,16));if(r.reduce(($,P)=>$+P,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let[c,C,p,b]=r;if(r.length!==c+5||!(b in ao)||ao[b]!==null&&c!==ao[b])throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let m=r.slice(4,4+c);if(b===0){let $=o+(C<<8|p);if($+c>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(m,$)}else if(b===1){s=!0;break}else b===2?o=(m[0]<<8|m[1])<<4:b===4&&(o=(m[0]<<8|m[1])<<16)}if(!s)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var Mt=16e6,Zo=Mt/1e3,Oa=Ke,ka=[[Ot,["D0","D1","D2","D3","D4","D5","D6","D7"]],[zt,["D8","D9","D10","D11","D12","D13"]],[qe,["A0","A1","A2","A3","A4","A5"]]],bt=Object.freeze({...nt});function Yo(t){let e=new pe(Jo(t));[Ye,Qe,to].forEach(g=>new Ae(e,g));let o=new Re(e,so,Mt),s=new me(e,ze),a=ka.map(([g,M])=>[new ge(e,g),M]),i={};for(let[g,M]of a)M.forEach((A,_)=>i[A]=[g,_]);let n=null;s.onADCRead=g=>{let M=0;if(g.type===Z.SingleEnded){let q=s.channelValues[g.channel]||0;M=n?n(g.channel,q):q}else g.type===Z.Constant?M=g.voltage:g.type===Z.Temperature&&(M=.378125);let A=Math.round(M*1e6)/1e6,_=Math.min(1023,Math.max(0,Math.floor(A/s.referenceVoltage*1024)));e.addClockEvent(()=>s.completeADCRead(_),s.sampleCycles)};let r=[],c=[],C=[],p=[],b=m();function m(){let g={};for(let[M,A]of a)A.forEach((_,q)=>g[_]=M.pinState(q));return g}for(let[g,M]of a)g.addListener(()=>{let A=null;for(let _=0;_<M.length;_++){let q=g.pinState(_);q!==b[M[_]]&&((A||(A={}))[M[_]]=q,b[M[_]]=q)}if(A)for(let _ of c)_(A,b)});o.onByteTransmit=g=>C.forEach(M=>M(g));let $=Zo;function P(g){let M=e.cycles+g;for(;e.cycles<M;){let A=Math.min(M,$);for(;e.cycles<A;)Oa(e),e.tick();if(e.cycles<$)break;$+=Zo,p.length&&!o.rxBusy&&(o.writeByte(p[0]),p.shift());for(let _ of r)_()}}return{correr:P,estados:m,get ciclos(){return e.cycles},alCambiarPines:g=>c.push(g),alByteSerial:g=>C.push(g),enviarSerial:g=>p.push(...new TextEncoder().encode(g)),ponerAnalogico:(g,M)=>s.channelValues[g]=Math.max(0,Math.min(5,M)),ponerVoltajeReferencia:g=>s.avcc=Math.max(.001,Number(g)||0),ponerLectorAnalogico:g=>n=g,ponerEntrada(g,M){let A=i[g];A&&A[0].setPin(A[1],!!M)},alCadaMs:g=>r.push(g)}}var Ua=["a","b","c","d","e"],Na=["f","g","h","i","j"],io={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Ba=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],Qo={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},no=t=>14.4+(t-1)*9.6,ja=t=>t>=2&&(t-1)%6!==0,ro=new Map;function lo(t="media"){if(ro.has(t))return ro.get(t);let e=Qo[t]||Qo.media,o=[];ro.set(t,o);for(let s=1;s<=e.columnas;s++){for(let a of Ua)o.push({nombre:a+s,x:no(s),y:io[a],tira:"arriba"+s});for(let a of Na)o.push({nombre:a+s,x:no(s),y:io[a],tira:"abajo"+s});for(let[a]of Ba)ja(s)&&o.push({nombre:a+s,x:no(s),y:io[a],tira:a})}return o}var co=new Map;function ts(t="media"){if(co.has(t))return co.get(t);let e=new Map;co.set(t,e);for(let o of lo(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}var se=3.779527559055118,Fa={ancho:72.58*se,alto:53.34*se},Wa=4*se,es=5*se;var be=Wa+4.6*se,Ie=Fa.ancho-.5-4.6*se,La=60,Et=(t,e)=>({x:t,y:La+e*es}),Ln={M1A:Et(be,0),M1B:Et(be,1),GND_IZQ:Et(be,2),M2A:Et(be,3),M2B:Et(be,4),M4A:Et(Ie,0),M4B:Et(Ie,1),GND_DER:Et(Ie,2),M3A:Et(Ie,3),M3B:Et(Ie,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+es,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var os={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},ss=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var ae=3.779527559055118,ke=9.6,ie={ancho:58*ae,alto:54*ae},Hn={x:(ie.ancho-45*ae)/2,y:(ie.alto-18*ae)/2,ancho:45*ae,alto:18*ae},Ga=(ie.ancho-14*ke)/2,as=(ie.alto-6*ke)/2,Ha=as+6*ke,Ka=[{y:as,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:Ha,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],Kn=Object.fromEntries(Ka.flatMap(({y:t,nombres:e})=>e.map((o,s)=>[o,{x:Ga+s*ke,y:t}])));var qn={...ie};var Xa=Array.from({length:14},(t,e)=>`D${13-e}`),za=Array.from({length:8},(t,e)=>`A${e}`),fo=[...Xa,...za],qa=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","SPI_MISO","SPI_MOSI","SPI_SCK","SPI_SS","SPI_V","SPI_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_3V3","GND_OUT","JACK_POS","JACK_GND"],Jn=[...fo.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...qa],is=[...fo.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"]],Zn=Object.fromEntries([...fo.flatMap(t=>[[`${t}_S`,`${t} \\xB7 se\\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \\xB7 V: alimentaci\\xF3n de 5V (+)`],[`${t}_G`,`${t} \\xB7 G: tierra (\\u2212)`]]),["I2C_SDA","I2C \\xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \\xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \\xB7 alimentaci\\xF3n de 5V (+)"],["I2C_G","I2C \\xB7 tierra (\\u2212)"],["SPI_MISO","SPI \\xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \\xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \\xB7 SCK: reloj (D13)"],["SPI_SS","SPI \\xB7 SS: selecci\\xF3n (D10)"],["SPI_V","SPI \\xB7 alimentaci\\xF3n de 5V (+)"],["SPI_G","SPI \\xB7 tierra (\\u2212)"],["UART_TX","UART \\xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \\xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \\xB7 alimentaci\\xF3n de 5V (+)"],["UART_G","UART \\xB7 tierra (\\u2212)"],["OUT_5V","5V \\xB7 salida de alimentaci\\xF3n de la expansi\\xF3n (+)"],["OUT_3V3","3,3V \\xB7 salida regulada de la expansi\\xF3n (+), separada del 3V3 del Nano"],["GND_OUT","GND \\xB7 tierra de las salidas (\\u2212)"],["JACK_POS","Jack + \\xB7 entrada de la expansi\\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \\xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]);var Ue=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),rs=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Ja=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Za=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),Ya=Object.freeze([...rs,Object.freeze(["A6"]),Object.freeze(["A7"])]),ns=Object.freeze([...Ue,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),Qa=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:Ue,analogicos:rs,puentes:Ja,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...Ue,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","SDA","SCL"])}),ti=Object.freeze({nombre:"Arduino Nano cl\\xE1sico",pinesDigitales:Ue,analogicos:Ya,puentes:Za,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:ns,pines:Object.freeze([...ns,"SDA","SCL","MISO","MOSI","SCK","SS"])}),Ut=t=>t==="nano"||t==="nano_old",Gt=t=>Ut(t)?ti:Qa;function Nt(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:s=!0}={}){let a=new Map,i=r=>{for(a.has(r)||a.set(r,r);a.get(r)!==r;)a.set(r,a.get(a.get(r))),r=a.get(r);return r},n=(r,c)=>a.set(i(r),i(c));for(let r of Gt(t.placa).puentes)r.forEach(c=>n("placa."+r[0],"placa."+c));for(let r of t.cables)n(r.de,r.a);if(t.protoboard){for(let r of ts(t.protoboard.tipo).values())r.forEach(c=>n("protoboard."+r[0],"protoboard."+c));for(let r of t.componentes)if(r.en)for(let[c,C]of Object.entries(r.en))n(r.id+"."+c,C)}for(let r of t.componentes)if(r.tipo==="shield_nano_io"&&Ut(t.placa))for(let[c,C]of is)n(r.id+"."+c,C);else if(r.tipo==="shield_l293d"){for(let[c,C]of ss)n(r.id+"."+c,C);(!r.props||r.props.puentePWR!==!1)&&n(r.id+".EXT_POS","placa.VIN")}else r.tipo==="bateria_lipo"&&s?(n(r.id+".BAL0",r.id+".NEG"),n(r.id+".BAL2",r.id+".POS")):r.tipo==="pulsador"?(n(r.id+".1i",r.id+".1d"),n(r.id+".2i",r.id+".2d"),e.has(r.id)&&n(r.id+".1i",r.id+".2i")):o&&r.tipo==="resistencia"?n(r.id+".1",r.id+".2"):o&&r.tipo==="potenciometro"&&(n(r.id+".GND",r.id+".SIG"),n(r.id+".SIG",r.id+".VCC"));return i}function xo(t,e,o,s){e>=0&&(t[e][e]+=s),o>=0&&(t[o][o]+=s),e>=0&&o>=0&&(t[e][o]-=s,t[o][e]-=s)}function ho(t,e,o){e>=0&&(t[e]+=o)}var Jt=(t,e)=>e>=0?t[e]:0;function Me(t,e,o){return{a:t,b:e,g:1/o,sellar(s){xo(s,this.a,this.b,this.g)},corriente(s){return(Jt(s,this.a)-Jt(s,this.b))*this.g}}}function cs(t){return{nodo:t,v:0,g:0,sellar(e,o){xo(e,this.nodo,-1,this.g),ho(o,this.nodo,this.v*this.g)},corriente(e){return(this.v-Jt(e,this.nodo))*this.g}}}function ls(t,e){return{nodo:t,v:e,fila:-1,sellar(o,s){o[this.nodo][this.fila]+=1,o[this.fila][this.nodo]+=1,s[this.fila]+=this.v},corriente(o){return-o[this.fila]}}}function fs(t,e,{Is:o,n:s}){let a=s*.025693,i=a*Math.log(a/(Math.SQRT2*o));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let c=Math.exp(this.vd/a),C=o*(c-1),p=o*c/a+1e-12,b=C-p*this.vd;xo(n,this.a,this.k,p),ho(r,this.a,-b),ho(r,this.k,b)},actualizar(n){let r=Jt(n,this.a)-Jt(n,this.k),c=Math.abs(r-this.vd);return this.vd=ei(r,this.vd,a,i),c},corriente(n){let r=Jt(n,this.a)-Jt(n,this.k);return o*Math.expm1(r/a)}}}function ei(t,e,o,s){if(t>s&&Math.abs(t-e)>2*o){if(e>0){let a=1+(t-e)/o;return a>0?e+o*Math.log(a):s}return o*Math.log(t/o)}return t}function ds(t,{maxIter:e=200,tolerancia:o=1e-9}={}){let s=t.nodos+t.fuentes,a=t.elementos.filter(n=>n.noLineal),i=new Float64Array(s);for(let n=1;n<=e;n++){let r=Array.from({length:s},()=>new Float64Array(s)),c=new Float64Array(s);for(let p of t.elementos)p.sellar(r,c);for(let p=0;p<t.nodos;p++)r[p][p]+=1e-12;if(i=oi(r,c),!a.length)return{x:i,iteraciones:n,convergio:!0};let C=0;for(let p of a)C=Math.max(C,p.actualizar(i));if(C<o)return{x:i,iteraciones:n,convergio:!0}}return{x:i,iteraciones:e,convergio:!1}}function oi(t,e){let o=e.length;for(let a=0;a<o;a++){let i=a;for(let n=a+1;n<o;n++)Math.abs(t[n][a])>Math.abs(t[i][a])&&(i=n);if(Math.abs(t[i][a])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[a],t[i]]=[t[i],t[a]],[e[a],e[i]]=[e[i],e[a]];for(let n=a+1;n<o;n++){let r=t[n][a]/t[a][a];if(r){for(let c=a;c<o;c++)t[n][c]-=r*t[a][c];e[n]-=r*e[a]}}}let s=new Float64Array(o);for(let a=o-1;a>=0;a--){let i=e[a];for(let n=a+1;n<o;n++)i-=t[a][n]*s[n];s[a]=i/t[a][a]}return s}var Ht={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40,chipMaxmA:200},ut={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},ai=.25,hs={minimo:1};function ii(t){let o=(ut.vf[t]||ut.vf.rojo)-ut.iRef*ut.rs;return{Is:ut.iRef/Math.expm1(o/(ut.n*.025693)),n:ut.n}}var xs={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function ps(t,{quemados:e=new Set,presionados:o=new Set,alimentacion:s={},fuentesExtra:a=[]}={}){let i=Gt(t.placa),n=Ut(t.placa),r=i.pinesDigitales,c=i.analogicos.map(h=>h[0]).filter(h=>!r.includes(h)),C=s["5V"]??Ht.voltios,p=Nt(t,{presionados:o}),b=Nt(t,{presionados:o,conduccion:!0}),m=p("placa.GND1"),$=new Map,P=0,g=h=>{let S=p(h);return S===m?-1:($.has(S)||$.set(S,P++),$.get(S))},M=h=>p(h)===m?-1:$.get(p(h)),A=[],_=[],q=[],ct=new Set(t.cables.flatMap(h=>[h.de,h.a])),Dt=new Set([...ct].map(p)),dt=h=>Dt.has(p("placa."+h)),ht=[...r,...c,"5V","3V3",...n?["VIN","GND1","GND2"]:[]].filter(h=>dt(h)||n&&["5V","3V3","VIN","GND1","GND2"].includes(h)).map(h=>"placa."+h);for(let h of c)dt(h)&&g("placa."+h);let mt=n?t.componentes.filter(h=>h.tipo==="shield_nano_io").flatMap(h=>["OUT_5V","OUT_3V3","GND_OUT","JACK_POS","JACK_GND"].map(S=>h.id+"."+S)):[];for(let h of mt)g(h);let D=[];if(t.protoboard){let h=new Set([...ct].map(p));for(let S of t.componentes)for(let d of Object.keys(S.en||{}))h.add(p(S.id+"."+d));for(let S of lo(t.protoboard.tipo)){let d="protoboard."+S.nombre;h.has(p(d))&&D.push(d)}}let W=new Map,N=[["5V",5,"placa.5V"],["3V3",3.3,"placa.3V3"],...n?[["VIN",0,"placa.VIN"]]:[],...a.map(({ref:h,voltios:S=0})=>[h,S,h])];for(let[h,S,d]of N){if(!dt(h)&&!n&&d.startsWith("placa."))continue;let y=s[h]??S,l=g(d),E=l===-1?"GND":W.get(l);if(E){q.push({tipo:"cortocircuito",componente:d,mensaje:`El pin ${h} est\\xE1 unido directo a ${E}: es un cortocircuito.`});continue}W.set(l,h);let G=ls(l,y);G.pin=h,G.ref=d,_.push(G),A.push(G)}let F={};for(let h of r)dt(h)&&(F[h]=cs(g("placa."+h)),A.push(F[h]));let I=[],O=[],V=[];for(let h of t.componentes)if(h.tipo==="resistencia"){let S=Me(g(h.id+".1"),g(h.id+".2"),Number(h.props.ohmios)||1);I.push({id:h.id,ohmios:Number(h.props.ohmios)||1,el:S}),S.a!==S.b&&A.push(S)}else if(h.tipo==="led"){let S=g(h.id+".anodo"),d=g(h.id+".catodo"),y={id:h.id,a:S,k:d,quemado:e.has(h.id)};if(!y.quemado&&S!==d){let l=P++;y.rs=Me(S,l,ut.rs),y.diodo=fs(l,d,ii(h.props.color)),A.push(y.rs,y.diodo)}O.push(y)}else if(h.tipo==="potenciometro"){let S=Number(h.props.ohmios)||1e4,d=Math.max(0,Math.min(1,Number(h.props.posicion))),y=g(h.id+".GND"),l=g(h.id+".SIG"),E=g(h.id+".VCC"),G=Me(y,l,Math.max(hs.minimo,S*d)),J=Me(l,E,Math.max(hs.minimo,S*(1-d)));for(let w of[G,J])w.a!==w.b&&A.push(w);V.push({id:h.id,ohmios:S,posicion:d,bajo:G,alto:J})}_.forEach((h,S)=>h.fila=P+S);function st(h){let S=new Set([b("placa.GND1")]);for(let d of["5V","3V3",...n?["VIN"]:[]])(dt(d)||n)&&S.add(b("placa."+d));for(let d of a)S.add(b(d.ref));for(let d of r){let y=h[d];(y===nt.High||y===nt.Low||y===nt.InputPullUp)&&S.add(b("placa."+d))}return S}let tt=new Set([...ct,...ht,...mt,...D]);for(let h of a)tt.add(h.ref);for(let h of t.componentes)for(let S of xs[h.tipo]||[])tt.add(h.id+"."+S);return{fallasFijas:q,flotantes(h){let S=st(h),d=new Set;for(let y of r)h[y]===nt.Input&&!S.has(b("placa."+y))&&d.add(y);for(let y of c)S.has(b("placa."+y))||d.add(y);return d},refsAlAire(h){let S=st(h),d=new Set;for(let y of tt)S.has(b(y))||d.add(y);return d},ponerAlimentacion(h){C=h["5V"]??C;for(let S of _)h[S.pin]!==void 0&&(S.v=h[S.pin])},ponerPines(h){for(let[S,d]of Object.entries(F)){let y=h[S];y===nt.High?Object.assign(d,{v:C,g:1/Ht.rAlto}):y===nt.Low?Object.assign(d,{v:0,g:1/Ht.rBajo}):y===nt.InputPullUp?Object.assign(d,{v:C,g:1/Ht.rPullUp}):Object.assign(d,{v:0,g:0})}},resolver(){let h=ds({nodos:P,fuentes:_.length,elementos:A}),S=l=>{let E=M(l);return E===void 0?null:E<0?0:h.x[E]},d={};for(let l of ct)d[l]=S(l);for(let l of ht)d[l]=S(l);for(let l of D)d[l]=S(l);for(let l of a)d[l.ref]=S(l.ref);for(let l of mt)d[l]=S(l);for(let l of t.componentes)for(let E of xs[l.tipo]||[])d[l.id+"."+E]=S(l.id+"."+E);let y=(l,E)=>l===null||E===null?null:l-E;return{convergio:h.convergio,iteraciones:h.iteraciones,voltajes:d,leds:O.map(l=>{let E=l.diodo?l.diodo.corriente(h.x):0;return{id:l.id,quemado:l.quemado,v:y(S(l.id+".anodo"),S(l.id+".catodo")),i:E,brillo:Math.max(0,Math.min(1,E*1e3/ut.plenomA))}}),resistencias:I.map(l=>{let E=l.el.a===l.el.b?0:l.el.corriente(h.x);return{id:l.id,ohmios:l.ohmios,v:y(S(l.id+".1"),S(l.id+".2")),i:E,w:E*E*l.ohmios}}),pines:Object.entries(F).filter(([,l])=>l.g>0).map(([l,E])=>({pin:l,v:S("placa."+l),i:E.corriente(h.x)})),fuentes:_.map(l=>({pin:l.pin,i:l.corriente(h.x)})),potenciometros:V.map(l=>({id:l.id,ohmios:l.ohmios,posicion:l.posicion,v:y(S(l.id+".SIG"),S(l.id+".GND")),i:Math.abs(l.bajo.a!==l.bajo.b?l.bajo.corriente(h.x):l.alto.a!==l.alto.b?l.alto.corriente(h.x):0)}))}}}}function us(t,e){let o=a=>(Math.abs(a)*1e3).toFixed(0),s=[];if(e.danoComponentes){for(let a of t.leds)!a.quemado&&a.i*1e3>ut.quemamA&&s.push({tipo:"led_quemado",componente:a.id,corriente_mA:+(a.i*1e3).toFixed(1),mensaje:`El LED ${a.id} se quem\\xF3: le pasaron ${o(a.i)} mA y aguanta unos ${ut.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let a of t.resistencias)a.w>ai&&s.push({tipo:"resistencia_caliente",componente:a.id,potencia_W:+a.w.toFixed(2),mensaje:`La resistencia ${a.id} se calienta: disipa ${a.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let n of t.pines)if(Math.abs(n.i)*1e3>Ht.maxmA){let r=n.pin.startsWith("D")?"pin "+n.pin.slice(1):"pin "+n.pin;s.push({tipo:"corriente_pin",componente:"placa."+n.pin,corriente_mA:+(Math.abs(n.i)*1e3).toFixed(1),mensaje:`El ${r} entrega ${o(n.i)} mA y aguanta ${Ht.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}let a=t.pines.reduce((n,r)=>n+Math.max(0,r.i),0),i=t.pines.reduce((n,r)=>n+Math.max(0,-r.i),0);for(let[n,r,c]of[[a,"VCC","entregan"],[i,"GND","reciben"]])n*1e3>Ht.chipMaxmA&&s.push({tipo:"corriente_chip",componente:"placa."+r,corriente_mA:+(n*1e3).toFixed(1),mensaje:`Entre todos, los pines ${c} ${o(n)} mA y el chip aguanta ${Ht.chipMaxmA} mA en total: en la placa real se puede da\\xF1ar. Usa resistencias m\\xE1s grandes o menos pines a la vez.`})}return s}var Yt={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Zt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function ni(t,e="sg90"){let o=(Yt[e]||Yt.sg90).angulos,s=t<=o.centroUs?90-(o.centroUs-t)/o.usPorGradoBajo:90+(t-o.centroUs)/o.usPorGradoAlto;return Math.max(0,Math.min(180,s))}function ms(t){let e=Yt[t]||Yt.sg90,o=90,s=90,a=null,i=0,n=!1,r=0,c=0;return{pulso(C){C<Zt.pulsoValidoMin||C>Zt.pulsoValidoMax||a!==null&&Math.abs(C-a)<Zt.bandaMuerta||(a=C,s=ni(C,t))},avanzar(C,p){if(!(p>0)){n=!1,i=0;return}let b=60/(e.seg60*1e3)*(p/Zt.voltiosRef),m=s-o,$=Math.abs(m)>.01;r=Math.min(1,Math.abs(m)/Zt.bandaGrados),$&&!n&&(i=Zt.arranqueMs,c=r),n=$,n&&(o+=Math.sign(m)*Math.min(Math.abs(m),b*C)),i=Math.max(0,i-C)},corriente(C){if(!(C>0))return 0;let{reposo:p,movimiento:b,arranque:m}=e.mA;return(i>0?p+(m-p)*c:n?p+(b-p)*r:p)/1e3*(C/Zt.voltiosRef)},estado:()=>({angulo:o,objetivo:s,pulso:a,moviendo:n,arrancando:i>0})}}var ne=9.6/2.54,Ne=57.6,gs=14.4,hr={x:gs,ancho:32.2*ne},ri={x:gs+(32.2-22.2)/2*ne,ancho:22.2*ne,alto:11.8*ne},xr={x:ri.x+5.9*ne,y:Ne},pr=13.5*ne,po=182.4;var ur={GND:{x:po,y:Ne-9.6,color:"#7a4a24"},VCC:{x:po,y:Ne,color:"#d7263d"},SIG:{x:po,y:Ne+9.6,color:"#f28c28"}};var lt={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function uo(){let{sostieneA:t,segundosA8A:e,enfriaS:o}=lt.fusible,s=(8**2-t**2)*e,a=0,i=!1;return{avanzar(n,r){let c=n/1e3;!i&&r>t?a+=(r**2-t**2)/s*c:a=Math.max(0,a-c/o),a>=1&&(i=!0),i&&a===0&&(i=!1)},get abierto(){return i},get calor(){return a},reiniciar(){a=0,i=!1}}}var Cs=(t,e=0)=>Math.max(0,(lt.voltios-lt.ohmios*t)/(1+lt.ohmios*e));var Te=3.779527559055118,Tt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Be=Tt.voltiosRef/(Tt.mABloqueado/1e3),Ss=Tt.rpmSinCarga*Tt.reduccion*2*Math.PI/60,As=Tt.mASinCarga/1e3,re=(Tt.voltiosRef-As*Be)/Ss,ci=re*As/Ss,li=Tt.tauMecanicoMs/1e3*re*re/Be;function Rs(){let t=0,e=0,o=0;return{avanzar(s,a,{conectado:i=!0,frena:n=!1}={}){let r=s/1e3;i?e=(a-re*t)/Be:e=n?-(re*t)/Be:0;let c=re*e-ci*t;t+=c/li*r,o=(o+t/Tt.reduccion*r*180/Math.PI)%360},estado(){let s=t*60/(2*Math.PI)/Tt.reduccion;return{rpm:s,i:e,giro:o,velocidad:s/60*Math.PI*(Tt.ruedaMM/10)}}}}var Cr=64.2*Te,fi=22.5*Te,Sr=40*Te,di=11.2*Te,Ar=Tt.ruedaMM*Te/2,Rr={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-di,y0:132-fi/2}};var Is=3.779527559055118,je={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Qt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},Fe=t=>(je[t]||je.nominal).voltios,Ms=t=>(je[t]||je.nominal).celdas,bs=360;var hi=10,Co=10,xi=72*Is,pi=34*Is;var mo=hi+xi+58,go=Co+pi-34,Ir={POS:{x:bs-12,y:Co+30,color:"#d7263d"},NEG:{x:bs-12,y:Co+39.6,color:"#2b2b2b"},BAL0:{x:mo,y:go,color:"#2b2b2b"},BAL1:{x:mo,y:go+9.6,color:"#e05a5a"},BAL2:{x:mo,y:go+19.2,color:"#d7263d"}};var Ts={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var ui=9.6,mi=82,gi=132,Tr=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:mi+e*ui,y:gi}]));var rt={...os,caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Ci=6.6,Si=.06,ys=4,ws=1-Math.exp(-1/ys),Ai=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],wt=(t,e=1)=>t.toFixed(e).replace(".",",");function $s({activas:t,avisar:e}){let o=null,s=new Map,a=new Map,i=new Map,n=0,r=0,c=!1,C={},p=0,b={},m=0,$=0,P=[],g=0,M=0;function A(){for(let D of Object.values(rt.pwm))C[D]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};p=0,b={}}A();function _(D,W,{fuentesMotor:N={},entradas:F=[]}={}){P=Object.entries(N);let I=(d,y)=>W(d)===W(y),O="placa.GND1",V=D.componentes.find(d=>d.tipo==="shield_l293d");o=V?{id:V.id,puente:!V.props||V.props.puentePWR!==!1}:null;let st=new Map;for(let d of D.componentes){if(d.tipo!=="bateria_lipo")continue;let y=d.props&&d.props.carga||"nominal",l=Fe(y),E=a.get(d.id),G=d.id+".POS",J=d.id+".NEG",w={carga:y,voc:l,celdas:Ms(y),v:E&&E.carga===y?E.v:l,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};y==="descargada"&&e({tipo:"bateria_baja",componente:d.id,mensaje:`La bater\\xEDa ${d.id} est\\xE1 descargada: ${wt(l)} V, ${wt(l/Qt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${wt(Qt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),y==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:d.id,mensaje:`Las celdas de la bater\\xEDa ${d.id} est\\xE1n desbalanceadas: ${w.celdas.map(L=>wt(L,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let T=L=>o&&I(L,o.id+".EXT_POS")||I(L,"placa.VIN")||I(L,"placa.5V")||F.some(U=>I(L,U));I(G,J)?e({tipo:"bateria_corto",componente:d.id,mensaje:`Los dos cables de la bater\\xEDa ${d.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):I(G,O)&&T(J)?e({tipo:"bateria_invertida",componente:d.id,mensaje:`La bater\\xEDa ${d.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):I(J,O)&&(w.valida=!0,I(G,"placa.5V")&&(w.valida=!1,e({tipo:"bateria_en_5v",componente:d.id,mensaje:`La bater\\xEDa ${d.id} est\\xE1 en el pin 5V: sus ${wt(l)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),w.motores=w.valida&&!!o&&I(G,o.id+".EXT_POS"),w.vin=w.valida&&I(G,"placa.VIN")),st.set(d.id,w)}a=st;let tt=new Map;for(let d of D.componentes){if(d.tipo!=="probador_lipo")continue;let y=d.props&&typeof d.props.umbral=="number"?d.props.umbral:Ts.umbralV,l=null;for(let G of a.keys())I(d.id+".NEG",G+".BAL0")&&(l=G);let E=["C1","C2","C3","C4","C5","C6","C7","C8"].map(G=>{if(!l)return null;for(let J of[0,1,2])if(I(`${d.id}.${G}`,`${l}.BAL${J}`))return J;return null});tt.set(d.id,{umbral:y,fuente:l,puntos:E})}i=tt;let h=d=>{if(o){for(let l of[1,2,3,4])for(let E of["A","B"])if(I(d,`${o.id}.M${l}${E}`))return{tipo:"shield",n:l,s:E}}if(I(d,O))return{tipo:"gnd"};if(I(d,"placa.5V"))return{tipo:"5v"};for(let[l,E]of P)if(I(d,E))return{tipo:"aux",fuente:l};for(let[l,E]of a)if(E.valida&&I(d,l+".POS"))return{tipo:"bateria",id:l};let y=Ai.find(l=>I(d,"placa."+l));return y?{tipo:"pin",pin:y}:null},S=new Map;for(let d of D.componentes){if(d.tipo!=="motor_tt")continue;let l=s.get(d.id)||{logico:Rs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};l.lado=d.props&&d.props.lado||"izquierdo",l.a=h(d.id+".A"),l.b=h(d.id+".B");let E=[l.a,l.b].filter(J=>J&&J.tipo==="shield");l.canal=E.length?"M"+E[0].n:null;let G=[l.a,l.b].find(J=>J&&J.tipo==="pin");G&&e({tipo:"motor_en_pin",componente:d.id,mensaje:`El motor ${d.id} est\\xE1 conectado al pin ${G.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),S.set(d.id,l)}s=S}function q(D,W,N){let F=I=>W[I]===bt.High;rt.reloj in D&&F(rt.reloj)&&(n=(n<<1|(F(rt.datos)?1:0))&255),rt.cierre in D&&F(rt.cierre)&&(r=n),rt.habilita in D&&(c=W[rt.habilita]===bt.Low);for(let I of Object.values(rt.pwm)){if(!(I in D))continue;let O=C[I],V=D[I]===bt.High;O.cambios=(O.cambios||0)+1,V&&!O.alto?Object.assign(O,{alto:!0,desde:N}):!V&&O.alto&&(O.acum+=N-O.desde,O.alto=!1)}}function ct(){c=!1,A()}function Dt(D,{v5:W,logica:N,cargasBateria:F={},consumoPorVinA:I=Si,habilitarVin:O=!0,voltajesMotor:V={}}){let st=D-p;for(let[w,T]of Object.entries(C)){T.alto&&(T.acum+=D-T.desde,T.desde=D);let L=st>0?Math.min(1,T.acum/st):0,U=b[w]||0;b[w]=(L===0||L===1)&&T.quieto>=ys?L:U+ws*(L-U),T.quieto=T.cambios?0:(T.quieto||0)+1,T.cambios=0,T.acum=0}p=D,m=0,$=0;for(let w of a.values())w.motores&&(m=Math.max(m,w.v)),w.vin&&($=Math.max($,w.v));let tt=O&&$>=Ci,h=N||tt,S=new Map,d=(w,T)=>S.set(w,(S.get(w)||0)+T),y=w=>{for(let[T,L]of a)if(L.motores)return d(T,w)},l=0,E={},G=w=>w?w.tipo==="shield"?!h||!c?null:{v:r>>rt.bits[w.n][w.s]&1?m:0,d:b[rt.pwm[w.n]]||0,shield:!0}:w.tipo==="gnd"?{v:0,d:1}:w.tipo==="5v"?{v:W,d:1,del5V:!0}:w.tipo==="aux"?{v:V[w.fuente]||0,d:1,fuenteAux:w.fuente}:w.tipo==="bateria"?{v:(a.get(w.id)||{v:0}).v,d:1,bateria:w.id}:null:null,J=!1;for(let[w,T]of s){let L=G(T.a),U=G(T.b),yt=L&&U?Math.min(L.d,U.d):0;if(!yt)T.vAhora=0,T.logico.avanzar(1,0,{conectado:!1});else{let z=L.v-U.v,jt=(L.shield?1:0)+(U.shield?1:0),Ft=0;if(Math.abs(z)>1e-9){let gt=t.caidaL293D&&jt?jt/2*(rt.caidaV+rt.caidaPorA*Math.abs(T.iAntes)):0;Ft=Math.sign(z)*Math.max(0,Math.abs(z)-gt)*yt}T.vAhora=Ft,T.logico.avanzar(1,Ft,{conectado:!0}),jt===2&&(r>>rt.bits[T.a.n][T.a.s]&1)!==(r>>rt.bits[T.b.n][T.b.s]&1)&&m<1&&(J=!0);let Wt=T.logico.estado().i,pt=z>=0?L:U,$t=Math.max(0,Wt*Math.sign(z||1))*yt;pt.shield?y($t):pt.del5V?l+=$t:pt.fuenteAux?E[pt.fuenteAux]=(E[pt.fuenteAux]||0)+$t:pt.bateria&&d(pt.bateria,$t)}let xt=T.logico.estado();T.iAntes=xt.i,T.sumaI+=Math.abs(xt.i),T.sumaV+=Math.abs(T.vAhora||0),T.ms++;let Pe=T.a&&T.a.tipo==="shield"||T.b&&T.b.tipo==="shield";T.sobreMs=Pe&&Math.abs(xt.i)>rt.maximoCanalA?T.sobreMs+1:0,T.sobreMs>rt.avisoCanalMs&&e({tipo:"l293d_corriente",componente:w,mensaje:`El motor ${w} pide ${wt(Math.abs(xt.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}J&&o&&e({tipo:"motores_sin_energia",componente:o.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[w,T]of a){if(!T.valida)continue;T.cargaExterna=Object.prototype.hasOwnProperty.call(F,w);let L=(S.get(w)||0)+(T.vin&&tt?I:0)+Math.max(0,F[w]||0);T.v=Math.max(0,T.voc-Qt.ohmios*L),T.iAntes=L,T.sumaI+=L,T.ms++;let U=Math.min(...dt(T));U<Qt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:w,mensaje:`La bater\\xEDa ${w} baj\\xF3 a ${wt(T.v,2)} V con los motores y una celda qued\\xF3 en ${wt(U,2)} V: menos de ${wt(Qt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return g+=m,M++,{i5V:l,porVin:tt,iFuentes:E}}function dt(D){let W=D.valida?D.iAntes:0;return D.celdas.map(N=>Math.max(0,N-Qt.ohmios/D.celdas.length*W))}function ht(D,W,N){let F=W.fuente&&a.get(W.fuente);if(!F)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:N};let I=dt(F),O=[0,I[0],I[0]+I[1]],V=[],st=0;for(let d of W.puntos){if(d===null)break;V.push(O[d]-st),st=O[d]}let tt=V.length>0&&st>=2.5,h=V.findIndex(d=>d<W.umbral),S=tt&&W.umbral>0&&h>=0;return S&&e({tipo:"probador_alarma",componente:D,mensaje:`El probador ${D} pita: la celda ${h+1} est\\xE1 en ${wt(Math.max(0,V[h]),2)} V, por debajo de ${wt(W.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:tt,celdas:V.map(d=>Math.max(0,d)),total:st,alarma:S,umbral:W.umbral,ms:N}}function mt(D=0){let W={},N={motores:[],baterias:[],shield:null,probadores:[]};for(let[F,I]of s){let O=I.logico.estado(),V={rpm:O.rpm,giro:O.giro,velocidad:O.velocidad,i:I.ms?I.sumaI/I.ms:Math.abs(O.i),voltios:I.ms?I.sumaV/I.ms:0};W[F]=V,N.motores.push({id:F,canal:I.canal,lado:I.lado,...V}),Object.assign(I,{sumaI:0,sumaV:0,ms:0})}for(let[F,I]of a){let O={voltios:I.valida?I.v:I.voc,celdas:dt(I),i:I.ms?I.sumaI/I.ms:0,carga:I.carga,conectada:I.motores||I.vin||!!I.cargaExterna};W[F]=O,N.baterias.push({id:F,...O}),Object.assign(I,{sumaI:0,ms:0})}if(o){let F=M?g/M:m;W[o.id]={motoresV:F},N.shield={id:o.id,motoresV:F,puente:o.puente,habilitada:c,salidas:r}}for(let[F,I]of i){let O=ht(F,I,D);W[F]=O,N.probadores.push({id:F,...O})}return g=0,M=0,{piezas:W,lista:N}}return{armar:_,pinesCambiaron:q,reiniciarChip:ct,cadaMs:Dt,foto:mt,voltajeBateria:D=>a.get(D)?.v??null,get hay(){return!!o||s.size>0||a.size>0||i.size>0}}}var ce=Object.freeze({usbV:5,salida5V:5,salida3V3:3.3,reposoA:.025,resistenciaFuenteOhm:.25,caidaJackV:1.2,caida3V3V:1.2,caidaNano3V3V:.3,resistencia3V3Ohm:.5,aviso3V3A:.1,minimoJackV:7,maximoJackV:12,avisoNano3V3A:.05,resetV:2.7,validacion:"Modelo de referencia; Nano y expansi\\xF3n pendientes de medici\\xF3n f\\xEDsica."}),_s=Object.freeze(["usb","jack","apagada"]);function We(t,e){let o=t.componentes.find(c=>c.tipo==="shield_nano_io"),s=o&&o.props||{},a=_s.includes(s.alimentacion)?s.alimentacion:"usb",i=o?o.id+".JACK_POS":"placa.VIN",n=Number.isFinite(Number(s.voltajeJack))?Math.max(0,Math.min(12,Number(s.voltajeJack))):9,r=null;for(let c of t.componentes)if(c.tipo==="bateria_lipo"){if(e(c.id+".POS")===e(i)){r=c.id,n=e(c.id+".NEG")===e("placa.GND1")&&e(i)!==e("placa.GND1")?Fe(c.props&&c.props.carga):0;break}if(e(c.id+".NEG")===e(i)){r=c.id,n=0;break}}return e(i)===e("placa.GND1")&&(n=0),!o&&r&&(a="jack"),{alimentacion:a,voltiosJack:n,bateria:r,expansion:o?o.id:null,entradaRef:i}}function we(t,{realista:e=!1,g5:o=0,g33:s=0,g33Expansion:a=0,fijo5:i=0}={}){let n=ce,r=t.alimentacion==="jack"||t.bateria?t.voltiosJack:0,c=t.expansion?0:r,p=t.alimentacion==="apagada"?0:t.alimentacion==="usb"?n.usbV:r<=0?0:e?Math.max(0,Math.min(n.salida5V,r-n.caidaJackV)):Math.min(n.salida5V,r),b=e?n.resistenciaFuenteOhm:0,m=e?n.resistencia3V3Ohm:0,$=p>0?n.reposoA:0,P=p,g=0,M=0;for(let ct=0;ct<12;ct++)g=Math.max(0,Math.min(n.salida3V3,P-(e?n.caidaNano3V3V:0)))/(1+m*Math.max(0,s)),M=t.expansion?Math.max(0,Math.min(n.salida3V3,P-(e?n.caida3V3V:0)))/(1+m*Math.max(0,a)):0,P=Math.max(0,(p-b*($+Math.max(0,i)+g*Math.max(0,s)+M*Math.max(0,a)))/(1+b*Math.max(0,o)));g=Math.max(0,Math.min(n.salida3V3,P-(e?n.caidaNano3V3V:0)))/(1+m*Math.max(0,s)),M=t.expansion?Math.max(0,Math.min(n.salida3V3,P-(e?n.caida3V3V:0)))/(1+m*Math.max(0,a)):0;let A=g*Math.max(0,s),_=M*Math.max(0,a),q=p>0?$+Math.max(0,i)+P*Math.max(0,o)+A+_:0;return{v5:P,v33:g,v33Expansion:M,vin:c,entradaV:r,amperios:q,i33:A,i33Expansion:_,apagada:P<n.resetV,fuente:t.alimentacion,referencia:!0}}var Ri=60,Ps=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],bi=3,Ii=1.5,Mi=1/1e4,Es=60,Ti=Math.cos(.35*Math.PI),wi=.1*5/1024,yi=.15,$i=100,Ds=50;function vs({hex:t,circuito:e,activas:o={},semilla:s=Math.floor(Math.random()*2**32)}){let a=Gt(e.placa),i=Ut(e.placa),n=a.analogicos,r=Ei(s),c=new Set,C=[],p={raiz:null,grupos:new Set},b=new Set,m=new Set,$=new Set,P={},g=new Map,M={},A=null,_=e,q=null,ct=new Map,Dt=new Map,dt={},ht=null,mt=new Map,D=new Map,W=[],N=0,F=0,I={inicio:0,clave:""},O=null,V=null,st=-1/0,tt={},h=0,S=0,d=[],y=new TextDecoder("utf-8"),l=new Set,E=new Set,G=[],J=[],w=new Map,T=0,L=uo(),U=!1,yt=0,xt=null,Pe=0,z=lt.idealV,jt=0,Ft=0,Wt=0,pt=0,$t=[],gt=$s({activas:o,avisar:f=>Ct(f)}),fe=0,te=!1,k=null,H=null,Ee=!1,Bs=Object.fromEntries(Bt.map(f=>[f,bt.Input])),vt=()=>(T+A.ciclos)/Mt*1e3,js=f=>Bt.reduce((x,R)=>x+f[R]*So[R],0);function de(){A=Yo(t),i&&A.ponerVoltajeReferencia(z);let f=A.estados();N=js(f),mt.set(N,f),F=0,D=new Map,W=[],I={inicio:0,clave:N},O=null,A.alCambiarPines((x,R)=>{Mo();let u=mt.get(N);for(let v in x)N+=(x[v]-u[v])*So[v];mt.has(N)||mt.set(N,{...R}),N===I.clave&&(O={tiempos:new Map(D),ciclo:A.ciclos}),st=A.ciclos;for(let v in x)tt[v]=A.ciclos;Vt(),w.size&&Gs(x),gt.pinesCambiaron(x,R,A.ciclos)}),A.alCadaMs(qs),A.alCadaMs(yo);for(let x of w.values())x.subida=null;gt.reiniciarChip(),st=-1/0,tt={},A.ponerLectorAnalogico(Js),dt={},ht=null,A.alByteSerial(x=>{d.push(x),S=vt()+Ri})}function Mo(){let f=A.ciclos;D.set(N,(D.get(N)||0)+(f-F)),F=f}function he(){a=Gt(_.placa),i=Ut(_.placa),n=a.analogicos,i&&(k=We(_,Nt(_)),H=we(k,{realista:!!o.limiteUSB}),z=H.v5,U=H.apagada,A.ponerVoltajeReferencia(z));let f=i&&k.expansion?[{ref:k.expansion+".OUT_3V3",voltios:H.v33Expansion},{ref:k.expansion+".JACK_POS",voltios:H.entradaV}]:[];q=ps(_,{quemados:l,presionados:c,...i?{alimentacion:Le(),fuentesExtra:f}:{}}),ct=new Map,Dt=new Map,Ls(),gt.armar(_,Nt(_),i?{fuentesMotor:{"3V3":"placa.3V3",...k.expansion?{[k.expansion+".OUT_3V3"]:k.expansion+".OUT_3V3"}:{}},entradas:[k.entradaRef]}:{}),To(),i&&Fs()}function Le(){return{"5V":H.v5,"3V3":H.v33,VIN:H.vin,...k.expansion?{[k.expansion+".OUT_3V3"]:H.v33Expansion,[k.expansion+".JACK_POS"]:H.entradaV}:{}}}function Fs(){let f=k.expansion||"placa";Ct({tipo:"nano_referencia",componente:f,mensaje:"La alimentaci\\xF3n del Nano y la expansi\\xF3n usa un modelo de referencia. Sus valores y conexiones est\\xE1n pendientes de comprobar en la placa real."}),k.alimentacion==="jack"&&k.voltiosJack<ce.minimoJackV&&Ct({tipo:"nano_alimentacion",componente:f,voltios:k.voltiosJack,mensaje:`El jack recibe ${k.voltiosJack.toFixed(1).replace(".",",")} V: la referencia recomienda 7 a 12 V. Con menos voltaje bajan las salidas y el Nano puede quedar en reinicio.`})}function To(){if(!C.length){p={raiz:null,grupos:new Set};return}let f=Nt(_,{presionados:c,conduccion:!0});p={raiz:f,grupos:new Set(C.map(f))}}let wo=f=>p.grupos.size>0&&p.grupos.has(p.raiz(f)),Ws=()=>Math.sin(2*Math.PI*Es*(vt()/1e3))>Ti;function Ls(){let f=Nt(_),x=(u,v)=>f(u)===f(v),R=new Map;for(let u of _.componentes){if(u.tipo!=="servo")continue;let v=Yt[u.props&&u.props.modelo]?u.props.modelo:"sg90",et=w.get(u.id),ft=et&&et.modelo===v?et:{modelo:v,logico:ms(v),subida:null,sumaA:0,picoA:0,msVentana:0};ft.senal=Bt.find(it=>x(u.id+".SIG","placa."+it))||null;let St=x(u.id+".GND","placa.GND1"),at=Bt.find(it=>x(u.id+".VCC","placa."+it)),Y=i&&k.expansion&&k.expansion+".OUT_3V3";ft.fuente=x(u.id+".VCC","placa.5V")?"5V":x(u.id+".VCC","placa.3V3")?"3V3":Y&&x(u.id+".VCC",Y)?Y:at||null,ft.conectado=St&&(ft.fuente==="5V"||ft.fuente==="3V3"||!!Y&&ft.fuente===Y),at&&St&&Ct({tipo:"servo_alimentacion",componente:u.id,mensaje:`El servo ${u.id} toma la corriente del pin ${at.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Yt[v].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),R.set(u.id,ft)}w=R}function Gs(f){for(let x of w.values())!x.senal||!(x.senal in f)||(f[x.senal]===bt.High?x.subida=A.ciclos:x.subida!==null&&(x.conectado&&!U&&x.logico.pulso((A.ciclos-x.subida)/Mt*1e6),x.subida=null))}let xe=f=>!f.conectado||U&&!i?0:f.fuente==="5V"?z:i?f.fuente==="3V3"?H.v33:H.v33Expansion:3.3;function yo(){if(i)return Hs();gt.hay&&({i5V:fe,porVin:te}=gt.cadaMs(A.ciclos,{v5:z,logica:!U&&z>lt.bodV}));for(let u of w.values())u.logico.avanzar(1,xe(u));let f=U?0:lt.placaA+Pe+fe,x=0;for(let u of w.values())u.conectado&&u.fuente==="5V"&&(x+=u.logico.corriente(1));z=U?0:te?lt.idealV:o.limiteUSB?Cs(f,x):lt.idealV;let R=f;for(let u of w.values()){let v=u.logico.corriente(xe(u));u.sumaA+=v,u.picoA=Math.max(u.picoA,v),u.msVentana++,(u.fuente==="5V"||u.fuente==="3V3")&&(R+=v)}te&&(R=0),o.limiteUSB&&(L.avanzar(1,R),!U&&!xt&&(z<lt.bodV?xt={motivo:"caida",amperios:R,voltios:z}:R>lt.limitePuertoA?xt={motivo:"puerto",amperios:R}:L.abierto&&(xt={motivo:"fusible",amperios:R}))),Ft+=R,Wt=Math.max(Wt,R),pt++}function Hs(){let f=U,x=De(N),R=j=>x?(x.fuentes.find(At=>At.pin===j)||{i:0}).i:0,u=Math.max(0,R(k.expansion?k.entradaRef:"VIN")),v={};if(gt.hay){let j=k.bateria?{[k.bateria]:(k.alimentacion==="jack"?H.amperios:0)+u}:{};({i5V:fe,iFuentes:v}=gt.cadaMs(A.ciclos,{v5:z,logica:!U,cargasBateria:j,consumoPorVinA:0,habilitarVin:!1,voltajesMotor:{"3V3":H.v33,...k.expansion?{[k.expansion+".OUT_3V3"]:H.v33Expansion}:{}}}));let At=k.bateria&&gt.voltajeBateria(k.bateria);typeof At=="number"&&k.voltiosJack>0&&(k.voltiosJack=At)}for(let j of w.values())j.logico.avanzar(1,xe(j));let et=z>0?(Math.max(0,R("5V"))+(x?x.pines.reduce((j,At)=>j+Math.max(0,At.i),0):0))/z:0,ft=H.v33>0?(Math.max(0,R("3V3"))+(v["3V3"]||0))/H.v33:0,St=H.v33Expansion>0&&k.expansion?(Math.max(0,R(k.expansion+".OUT_3V3"))+(v[k.expansion+".OUT_3V3"]||0))/H.v33Expansion:0;for(let j of w.values())j.conectado&&(j.fuente==="5V"?et+=j.logico.corriente(1):j.fuente==="3V3"?ft+=j.logico.corriente(1):St+=j.logico.corriente(1));let at=we(k,{realista:!!o.limiteUSB,g5:et,g33:ft,g33Expansion:St,fijo5:fe}),Y=["v5","v33","v33Expansion","vin","entradaV"].some(j=>Math.abs(at[j]-H[j])>1e-6);H=at,z=at.v5,U=at.apagada,te=k.alimentacion==="jack",!f&&U&&(Ee=!0),(Y||f!==U)&&(q.ponerAlimentacion(Le()),A.ponerVoltajeReferencia(z),ct.clear(),Dt.clear(),ht=null,Vt()),o.limiteUSB&&at.i33Expansion>ce.aviso3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:k.expansion+".OUT_3V3",corriente_mA:Math.round(at.i33Expansion*1e3),mensaje:"La salida 3,3 V supera 100 mA en el modelo de referencia y su voltaje baja. Reduce la carga; el l\\xEDmite de tu expansi\\xF3n real est\\xE1 pendiente de comprobar."}),o.limiteUSB&&at.i33>ce.avisoNano3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:"placa.3V3",corriente_mA:Math.round(at.i33*1e3),mensaje:"La salida 3,3 V del m\\xF3dulo Nano supera 50 mA, el m\\xE1ximo publicado para el Arduino Nano oficial. Reduce la carga; comprueba el l\\xEDmite de tu clon. Esta salida es distinta de la expansi\\xF3n."});for(let j of w.values()){let At=j.logico.corriente(xe(j));j.sumaA+=At,j.picoA=Math.max(j.picoA,At),j.msVentana++}let it=at.amperios+(k.alimentacion==="jack"?u:0);Ft+=it,Wt=Math.max(Wt,it),pt++}function $o(){Ee=!1,jt++,z>0&&Ct({tipo:"nano_bajo_voltaje",componente:"placa",voltios:z,mensaje:"La alimentaci\\xF3n del Nano baj\\xF3 del umbral de reinicio de referencia (2,7 V). El programa espera mientras vuelve la energ\\xEDa. Revisa la fuente y reduce la carga."}),T+=A.ciclos,de(),Vt()}function Ks(){let{motivo:f,amperios:x,voltios:R}=xt;xt=null,f==="caida"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),voltios:Math.round(R*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${R.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):f==="puerto"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${x.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(lt.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Ct({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(x*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),U=!0,yt=0),jt++,T+=A.ciclos,de(),Vt()}function Xs(f){let x=Mt/1e3,R=f;for(;R>0&&U;){let u=Math.min(R,x-yt);if(T+=u,R-=u,yt+=u,yt<x)break;yt=0,yo(),!i&&!L.abierto&&(U=!1)}R>0&&A.correr(R)}function _o(){let f=vt();$t=$t.filter(([R])=>f-R<1e3),$t.push([f,Wt]);let x={amperios:pt?Ft/pt:0,pico:Math.max(...$t.map(([,R])=>R)),voltios:z,fusible:Math.round(L.calor*100)/100,apagada:U,reinicios:jt};return i&&Object.assign(x,{fuente:H.fuente,voltios3V3:H.v33,voltios3V3Expansion:H.v33Expansion,voltiosJack:H.entradaV,referencia:!0,fusible:null,expansion:k.expansion}),Ft=0,Wt=0,pt=0,x}function Po(){let f={};for(let[x,R]of w){let u=R.logico.estado();f[x]={modelo:R.modelo,angulo:Math.round(u.angulo*10)/10,pulso:u.pulso===null?null:Math.round(u.pulso),senal:R.senal,fuente:R.fuente,moviendo:u.moviendo,i:R.msVentana?R.sumaA/R.msVentana:R.logico.corriente(xe(R)),pico:R.picoA},R.sumaA=0,R.picoA=0,R.msVentana=0}return f}function zs(f,x,R){let u=Dt.get(f);if(u)return u;let v=q.flotantes(x),et=new Set;n.forEach((Y,it)=>{v.has(Y[0])&&et.add(it)});let ft=new Set,St=[];for(let Y of Ps){let it=x[Y];if(it!==bt.Input&&it!==bt.InputPullUp)continue;if(v.has(Y)){ft.add(Y),St.push([Y,"aire"]);continue}let j=R?R.voltajes["placa."+Y]:null;typeof j=="number"?St.push([Y,j>=(i?.6*z:bi)?!0:j<=(i?.3*z:Ii)?!1:null]):St.push([Y,it===bt.InputPullUp])}let at=n.map(Y=>{for(let it of Y){let j=R?R.voltajes["placa."+it]:null;if(typeof j=="number")return j}return null});return u={canales:et,alAire:ft,entradas:St,analogicos:at,refsAlAire:q.refsAlAire(x)},R&&Dt.set(f,u),u}function Ge(f,x){dt[f]!==x&&(dt[f]=x,A.ponerEntrada(f,x))}function Vt(){if(!q||!A)return;let f=mt.get(N)||A.estados(),x=De(N),R=zs(N,f,x);b=R.alAire;for(let[u,v]of R.entradas){if(v==="aire"){u in P||(P[u]=r()<.5),Ge(u,o.entradaFlotante?P[u]:!1);continue}let et=v===null?!!M[u]:v;M[u]=et,Ge(u,et)}m=R.canales,x&&R.analogicos!==ht&&(R.analogicos.forEach((u,v)=>{u!==null&&(!ht||ht[v]!==u)&&A.ponerAnalogico(v,u)}),ht=R.analogicos),$=R.refsAlAire}function qs(){if(!(!o.entradaFlotante||!b.size))for(let f of b){let x=wo("placa."+f)?Ws():r()<Mi?!P[f]:P[f];x!==P[f]&&(P[f]=x,Ge(f,x))}}function Js(f,x){if(m.has(f)){if(!o.entradaFlotante)return 0;if(n[f]&&wo("placa."+n[f][0]))return 2.5+2.5*Math.sin(2*Math.PI*Es*(vt()/1e3));let R=g.has(f)?g.get(f):1+3*r(),u=Math.max(0,Math.min(5,R+Eo()*yi));return g.set(f,u),u}return o.ruidoADC?x+Eo()*wi:x}function Eo(){return Math.sqrt(-2*Math.log(1-r()))*Math.cos(2*Math.PI*r())}function Ct(f){let x=f.tipo+"|"+f.componente;return E.has(x)?!1:(E.add(x),G.push(f),J.push(f),!0)}function De(f){for(let x=0;x<4;x++){let R=ct.get(f);if(R)return R;q.ponerPines(i&&U?Bs:mt.get(f));let u=null;try{u=q.resolver()}catch{u=null}if(h++,!u||!u.convergio)return Ct({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;ct.set(f,u);let v=!1;for(let et of[...q.fallasFijas,...us(u,o)])Ct(et)&&et.tipo==="led_quemado"&&(l.add(et.componente),v=!0);if(!v)return u;he()}return ct.get(f)||null}function Zs(){if(U)return Ys();Mo();let f=D;if(O&&O.ciclo>I.inicio){f=O.tiempos;let Q=new Map;for(let[ot,Lt]of D){let vo=Lt-(O.tiempos.get(ot)||0);vo>0&&Q.set(ot,vo)}D=Q,I={inicio:O.ciclo,clave:I.clave}}else D=new Map,I={inicio:A.ciclos,clave:N};O=null;let x=[...f].filter(([,Q])=>Q>0);x.length||(x=W.length?W:[[N,1]]),W=x;let R=x.reduce((Q,[,ot])=>Q+ot,0),u=[];for(let[Q,ot]of x){let Lt=De(Q);if(!Lt){u.length=0;break}u.push([Lt,ot/R])}let v=u.length?Pi(u):null,et=new Set(Bt.filter(Q=>Q in tt&&A.ciclos-tt[Q]<Ds/1e3*Mt));v&&(v.pwm=_i(x,R,et)),ea(v),ht=null;let St=A.ciclos-st>Ds/1e3*Mt?1:1-Math.exp(-(R/Mt*1e3)/$i);V=v?Ao(v,V,St):null;let at=A.estados(),Y=d.length?y.decode(Uint8Array.from(d),{stream:!0}):"";d=[];let it=Po(),j=_o(),At=gt.foto(vt());if(Pe=V?V.fuentes.reduce((Q,ot)=>Q+Math.max(0,ot.i),0)+V.pines.reduce((Q,ot)=>Q+Math.max(0,ot.i),0):0,V){V.usb=j,V.servos=Object.entries(it).map(([ot,Lt])=>({id:ot,...Lt}));let Q=(V.fuentes.find(ot=>ot.pin==="5V")||{i:0}).i;V.consumo5V=Q+V.servos.filter(ot=>ot.fuente==="5V").reduce((ot,Lt)=>ot+Lt.i,0),Object.assign(V,At.lista,{porVin:te})}let sa=J;return J=[],{msSimulados:vt(),servos:it,piezas:At.piezas,evaluaciones:h,leds:Object.fromEntries((V?V.leds:[]).map(Q=>[Q.id,Q.brillo])),quemados:[...l],voltajes:Qs(),entradas:ta(),placa:{led13:at.D13===bt.High,ledTX:vt()<S,...i?{encendida:!0}:{}},serial:Y,fallas:sa,medicion:V,energia:j}}function Ys(){let f=i?De(N):null,x=J;return J=[],{msSimulados:vt(),evaluaciones:h,servos:Po(),piezas:gt.foto(vt()).piezas,energia:_o(),leds:{},quemados:[...l],voltajes:f?.voltajes||{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:x,medicion:null}}function Qs(){if(!V)return{};if(!$.size)return V.voltajes;let f={...V.voltajes};for(let x of $)x in f&&(f[x]=null);return f}function ta(){let f={};for(let x of Ps)b.has(x)?f[x]={alto:!!o.entradaFlotante&&!!P[x],alAire:!0}:x in M&&(f[x]={alto:M[x],alAire:!1});return f}function ea(f=V){f&&n.forEach((x,R)=>{for(let u of x){let v=f.voltajes["placa."+u];if(typeof v=="number")return A.ponerAnalogico(R,v)}})}function oa(){l.clear(),E.clear(),G.length=0,J=[],d=[],y=new TextDecoder("utf-8"),S=0,Do(),de(),he(),Vt()}function Do(){T=0,U=!1,yt=0,xt=null,$t=[],L.reiniciar(),z=lt.idealV,fe=0,te=!1,Ee=!1,i&&(k=We(_,Nt(_)),H=we(k,{realista:!!o.limiteUSB}),z=H.v5,U=H.apagada,q&&q.ponerAlimentacion(Le()),ct.clear(),Dt.clear(),ht=null)}return de(),he(),Vt(),{get ciclos(){return T+A.ciclos},avanzar(f){if(U)return Xs(f);A.correr(f),Ee&&$o(),xt&&Ks()},foto:Zs,ponerCircuito(f){let x=U;_=f,he(),i&&!x&&U&&$o(),Vt()},ponerMano(f){C=Array.isArray(f)?f.filter(x=>typeof x=="string"):[],To()},ponerPulsador(f,x){x?c.add(f):c.delete(f),he(),Vt()},enviarSerial:f=>A.enviarSerial(String(f)),reiniciarChip(){Do(),de(),Vt()},reiniciarTodo(){jt=0,oa()},fallas:()=>[...G]}}function _i(t,e,o=new Set){let s={},a=new Set;for(let[r,c]of t)for(let C=0;C<Bt.length;C++){let p=Math.floor(r/So[Bt[C]])%4===bt.High;s[C]=(s[C]||0)+(p?c:0),a.add(C)}let i=Bt,n={};for(let r of a){let c=s[r]/e;(c>0&&c<1||o.has(i[r]))&&(n[i[r]]=Math.round(c*1e3)/1e3)}return n}var Bt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],So=Object.fromEntries(Bt.map((t,e)=>[t,4**e]));function Pi(t){if(t.length===1)return t[0][0];let e=t[0][0],o=n=>n.reduce((r,[,c])=>r+c,0),s=n=>{let r=0;for(let[c,C]of t){let p=n(c);if(p==null)return null;r+=C*p}return r},a=(n,r,c)=>[...new Set(t.flatMap(([p])=>p[n].map(b=>b[r])))].map(p=>{let b={[r]:p},m=t.filter(([P])=>P[n].some(g=>g[r]===p)),$=o(m);for(let P of c)P==="i"?b.i=t.reduce((g,[M,A])=>g+A*((M[n].find(_=>_[r]===p)||{i:0}).i||0),0):b[P]=$?m.reduce((g,[M,A])=>g+A*(M[n].find(_=>_[r]===p)[P]||0),0)/$:null;return b}),i={};for(let n of Object.keys(e.voltajes))i[n]=s(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:i,leds:e.leds.map((n,r)=>{let c=s(C=>C.leds[r]?C.leds[r].i:0);return{id:n.id,quemado:t.some(([C])=>C.leds[r]&&C.leds[r].quemado),v:s(C=>C.leds[r]?C.leds[r].v:null),i:c,brillo:Math.max(0,Math.min(1,c*1e3/ut.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:s(c=>c.resistencias[r].v),i:s(c=>c.resistencias[r].i),w:s(c=>c.resistencias[r].w)})),pines:a("pines","pin",["v","i"]),fuentes:a("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:s(c=>c.potenciometros[r].v),i:s(c=>c.potenciometros[r].i)}))}}function Ao(t,e,o){if(typeof t=="number")return typeof e=="number"&&o<1?e+o*(t-e):t;if(Array.isArray(t)){let s=i=>i&&typeof i=="object"?i.id||i.pin:void 0,a=new Map((Array.isArray(e)?e:[]).map(i=>[s(i),i]));return t.map((i,n)=>Ao(i,s(i)!==void 0?a.get(s(i)):(e||[])[n],o))}if(t&&typeof t=="object"){let s={};for(let a of Object.keys(t))s[a]=Ao(t[a],e&&typeof e=="object"?e[a]:void 0,o);return s}return t}function Ei(t){let e=t>>>0;return()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}var Di=16,vi=8,Vi=50,Oi=500,ye=Mt/1e3,It=null,$e=!1,Vs=0,Kt=0,Ro=0,Os=0,Io=0,bo=!1,le=[],ks=new MessageChannel;ks.port1.onmessage=Us;function Us(){bo=!1,Ui()}function Ns(t){bo||(bo=!0,t>0?setTimeout(Us,t):ks.port2.postMessage(null))}function ki(t){for(;le.length&&t-le[0][0]>Oi;)le.shift();let e=0,o=0;for(let[,s,a]of le)e+=s,o+=a;return e>0?Math.min(1,o/(e*ye)):1}function _e(t=performance.now()){Os=t;let e=It.foto();self.postMessage({tipo:"foto",corrida:Vs,...e,velocidad:ki(t),msReales:Io})}function Ui(){if(!$e||!It)return;let t=performance.now(),e=Math.max(0,t-Ro);Ro=t,Io+=e,Kt=Math.min(Kt+e*ye,Vi*ye);let o=performance.now(),s=0;for(;Kt>=1&&performance.now()-o<vi;){let a=It.ciclos;It.avanzar(Math.min(Math.floor(Kt),ye));let i=It.ciclos-a;Kt-=i,s+=i}le.push([t,e,s]),t-Os>=Di&&_e(t),Ns(Kt>=ye?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(Vs=e.corrida),e.tipo){case"crear":It=vs({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(It.reiniciarTodo(),Io=0),$e=!0,Kt=0,Ro=performance.now(),le.length=0,_e(),Ns(0);break;case"pausar":$e=!1;break;case"reiniciar":It.reiniciarChip(),Kt=0,_e();break;case"detener":$e=!1;break;case"circuito":It.ponerCircuito(e.circuito),e.mostrar&&_e();break;case"serial":It.enviarSerial(e.texto);break;case"pulsador":It.ponerPulsador(e.id,e.presionado),$e||_e();break;case"mano":It.ponerMano(e.refs);break}}catch(o){self.postMessage({tipo:"error",mensaje:String(o&&o.message||o)})}};self.postMessage({tipo:"listo"});})();\n';function nn(t={}){let{lienzo:e,hex:o}=t,i=t.placa||e?.circuito?.()?.placa||"uno";if(!wt[i])throw new Error(`Este prototipo no simula la placa \xAB${i}\xBB.`);if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");if(e.circuito().placa!==i)throw new Error("El programa y el circuito deben usar la misma placa.");rn(o);let s=t.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(Xc.map(E=>[E,s==="realista"]));Object.assign(c,t.noIdealidades||{});let n=typeof t.alEvento=="function"?t.alEvento:null,d={serial:[],falla:[],estado:[]},l="detenido",u=!0,b=0,y=null,$=0,I={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},v=null,D=0,k=[],B=Kc(Rt);B.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:c});function Rt(E){if(!u)return;if(E.tipo==="error")return console.error("TecnoCircuito:",E.mensaje);if(E.tipo!=="foto"||E.corrida!==b||l==="detenido")return;Object.assign(I,{msSimulados:E.msSimulados,msReales:E.msReales,velocidad:E.velocidad,evaluaciones:E.evaluaciones}),v=E.medicion?{...E.medicion,voltajes:E.voltajes,entradas:E.entradas}:null;for(let st of E.fallas){k.push(st),d.falla.forEach(Et=>Ft(Et,{tipo:st.tipo,componente:st.componente,mensaje:st.mensaje}));let{mensaje:fe,...St}=st;gt("falla",St)}let et=E.energia?E.energia.reinicios:0;et>D&&gt("reinicio_placa",{motivo:E.energia.referencia?"energia_nano":"energia_usb",...E.energia.referencia?{fuente:E.energia.fuente}:{},nuevos:et-D,total:et}),D=et,E.serial&&d.serial.forEach(st=>Ft(st,E.serial)),y=E,$||($=requestAnimationFrame(U))}function U(){if($=0,l==="detenido"||!y)return e._mostrar({simulando:l!=="detenido"});e._mostrar({simulando:!0,leds:y.leds,quemados:y.quemados,voltajes:y.voltajes,servos:y.servos||{},piezas:y.piezas||{},placa:{ledPower:y.placa.encendida!==!1,led13:y.placa.led13,ledTX:y.placa.ledTX}})}function Ft(E,et){try{E(et)}catch(st){console.error(st)}}function gt(E,et){n&&Ft(n,{t:Date.now(),origen:"simulador",tipo:E,datos:et})}function Ot(E){l=E,d.estado.forEach(et=>Ft(et,E))}return typeof e._alAcercar=="function"&&e._alAcercar(E=>{u&&B.enviar({tipo:"mano",refs:E})}),typeof e._alPulsar=="function"&&e._alPulsar((E,et)=>{u&&B.enviar({tipo:"pulsador",id:E,presionado:et})}),e.alCambiar(E=>{u&&B.enviar({tipo:"circuito",circuito:E,mostrar:l!=="detenido",corrida:b})}),{iniciar(){if(!u||l==="corriendo")return;let E=l==="detenido";b++,E&&(k.length=0,v=null,y=null,D=0,Object.assign(I,{msSimulados:0,msReales:0,velocidad:1}),gt("simulacion_iniciada",{placa:i,modo:s})),Ot("corriendo"),B.enviar({tipo:"iniciar",nuevo:E,corrida:b})},pausar(){l==="corriendo"&&(b++,B.enviar({tipo:"pausar",corrida:b}),Ot("pausado"))},reiniciar(){!u||l==="detenido"||(b++,I.msSimulados=0,B.enviar({tipo:"reiniciar",corrida:b}),B.enviar({tipo:"iniciar",nuevo:!1,corrida:b}),D=0,gt("reinicio_placa",{motivo:"boton"}),Ot("reiniciado"),Ot("corriendo"))},detener(){l!=="detenido"&&(b++,B.enviar({tipo:"detener",corrida:b}),gt("simulacion_detenida",{ms_simulados:Math.round(I.msSimulados)}),Ot("detenido"),v=null,U())},serialEnviar(E){l!=="detenido"&&B.enviar({tipo:"serial",texto:String(E)})},alSerial:E=>typeof E=="function"&&d.serial.push(E),alFalla:E=>typeof E=="function"&&d.falla.push(E),alEstado:E=>typeof E=="function"&&d.estado.push(E),medidas:()=>({...I,estado:l,hilo:B.hilo()}),destruir(){u&&(this.detener(),u=!1,cancelAnimationFrame($),B.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>l==="detenido"||!v?null:{...v,fallas:[...k],modo:s,activas:c},_mediciones(){return this.mediciones()}}}function Kc(t){let e=null,o="worker",i=!1,s=[],c=d=>{if(d&&d.tipo==="listo"){i=!0,s.length=0;return}t(d)};function n(){o="pagina",e=Jc(c),s.splice(0).forEach(d=>e.postMessage(d))}try{if(!Di||typeof Worker!="function")throw new Error("sin Worker");let d=URL.createObjectURL(new Blob([Di],{type:"text/javascript"})),l=new Worker(d);l.onmessage=u=>{u.data&&u.data.tipo==="listo"&&URL.revokeObjectURL(d),c(u.data)},l.onerror=u=>{if(i)return console.error("TecnoCircuito:",u.message);u.preventDefault(),l.terminate(),n()},e=l}catch{n()}return{enviar(d){!i&&o==="worker"&&s.push(d),e.postMessage(d)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function Jc(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",Di)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var Ze=(t,e)=>t.toFixed(e).replace(".",","),xt=t=>t==null?"al aire":Ze(t,2)+" V",Dt=t=>Ze(t*1e3,Math.abs(t)<.01?2:1)+" mA",cn=(t,e)=>(t>=1e3?Ze(t/1e3,e)+" k":t+" ")+"\u03A9",ln=t=>"Pin "+t.replace(/^D/,"");function dn(t){if(!t||!t.leds)return[];let e=(l,u,b,y)=>({pieza:l,voltaje:u||"",corriente:b||"",detalle:y||""}),o=l=>{let u=t.entradas&&t.entradas[l];return u?u.alAire?`al aire: lee ${u.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:u.alto?"lee ALTO":"lee BAJO":""},i=new Set(t.pines.map(l=>l.pin)),s=t.servos||[],c=l=>s.find(u=>u.senal===l&&u.pulso),n=l=>{let u=c(l.pin);if(u)return`se\xF1al de servo: pulso de ${u.pulso} \xB5s`;let b=t.pwm&&t.pwm[l.pin];return b>.005&&b<.995?`PWM ${Math.round(b*100)} %`:o(l.pin)},d=t.usb;return[...t.pines.map(l=>e(ln(l.pin),xt(l.v),Dt(l.i),n(l))),...Object.keys(t.entradas||{}).filter(l=>!i.has(l)&&"placa."+l in t.voltajes).map(l=>e(ln(l)+" (entrada)",xt(t.voltajes["placa."+l]),"",o(l))),...(t.potenciometros||[]).map(l=>e(`${l.id} (${cn(l.ohmios,0)})`,xt(l.v),Dt(l.i),`perilla ${Math.round(l.posicion*100)} %`)),...t.resistencias.map(l=>e(`${l.id} (${cn(l.ohmios,1)})`,xt(l.v),Dt(l.i),Ze(l.w*1e3,1)+" mW")),...t.leds.map(l=>e(l.id,xt(l.v),Dt(l.i),l.quemado?"quemado":`brillo ${Math.round(l.brillo*100)} %`)),...s.map(l=>e(`${l.id} (${l.modelo.toUpperCase()})`,"",Dt(l.i),l.fuente?l.senal?`${Math.round(l.angulo)}\xB0${l.moviendo?", movi\xE9ndose":""}${l.pulso?` \xB7 pulso ${l.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,xt(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(l=>{let u=Math.abs(l.velocidad),b=Math.sign(l.velocidad)*(l.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${l.id} (${l.canal||"sin shield"})`,xt(l.voltios),Dt(l.i),Math.abs(l.rpm)<1?"quieto":`${Math.round(Math.abs(l.rpm))} RPM \xB7 ${b} ${Math.round(u)} cm/s`)}),...(t.baterias||[]).map(l=>{let u=l.celdas||[l.voltios/2,l.voltios/2];return e(`${l.id} (LiPo 2S)`,xt(l.voltios),l.conectada?Dt(l.i):"",`celdas ${u.map(b=>Ze(b,2)).join(" y ")} V${Math.min(...u)<We.avisoCeldaV?" \xB7 c\xE1rgala":""}${l.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(l=>e(`${l.id} (probador)`,l.encendido?xt(l.total):"","",l.encendido?`${l.celdas.length}S \xB7 ${l.celdas.map((u,b)=>`${b+1}: ${Ze(u,2)} V`).join(" \xB7 ")}${l.alarma?" \xB7 \xA1pita!":""}`:"apagado: con\xE9ctalo al cable de balance")),...s.length&&!d?.referencia?[e("5V de la placa (USB)","",Dt(t.consumo5V),"el USB da hasta 500 mA")]:[],...d?.referencia?[e("Nano \xB7 alimentaci\xF3n",xt(d.voltios),Dt(d.amperios),`${d.fuente==="jack"?"jack de la expansi\xF3n":d.fuente==="apagada"?"desconectada":"USB"} \xB7 modelo de referencia por validar${d.apagada?" \xB7 placa apagada":""}`),e("Nano \xB7 3,3V del m\xF3dulo",xt(d.voltios3V3),"","salida del m\xF3dulo"),...d.expansion?[e("Expansi\xF3n \xB7 3,3V",xt(d.voltios3V3Expansion),"","regulaci\xF3n externa \xB7 red separada del m\xF3dulo")]:[],...d.fuente==="jack"?[e(d.expansion?"Expansi\xF3n \xB7 jack":"Nano \xB7 VIN",xt(d.voltiosJack),"","entrada del regulador de referencia")]:[]]:[],...d&&!d.referencia&&(s.length||d.reinicios||d.pico>.2)?[e("USB (placa y circuito)",xt(d.voltios),Dt(d.amperios),`pico ${Dt(d.pico)} \xB7 fusible ${Math.round(d.fusible*100)} %${d.reinicios?` \xB7 ${d.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.1.0-dev",CONTRATO:1,PLACAS:Object.freeze(Object.keys(wt)),crearLienzo:an,crearSimulador:nn,filasDeMediciones:dn});})();
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
