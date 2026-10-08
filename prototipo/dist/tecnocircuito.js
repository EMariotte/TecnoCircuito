(()=>{var It=globalThis,qt=It.ShadowRoot&&(It.ShadyCSS===void 0||It.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),He=new WeakMap,_t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(qt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=He.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&He.set(e,t))}return t}toString(){return this.cssText}},Fe=s=>new _t(typeof s=="string"?s:s+"",void 0,ce),X=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,l)=>i+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[l+1],s[0]);return new _t(e,s,ce)},Xe=(s,t)=>{if(qt)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=It.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},pe=qt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Fe(e)})(s):s;var{is:Uo,defineProperty:Io,getOwnPropertyDescriptor:qo,getOwnPropertyNames:Vo,getOwnPropertySymbols:Bo,getPrototypeOf:Go}=Object,Vt=globalThis,We=Vt.trustedTypes,Ho=We?We.emptyScript:"",Fo=Vt.reactiveElementPolyfillSupport,Et=(s,t)=>s,Ct={toAttribute(s,t){switch(t){case Boolean:s=s?Ho:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Bt=(s,t)=>!Uo(s,t),Ye={attribute:!0,type:String,converter:Ct,reflect:!1,useDefault:!1,hasChanged:Bt};Symbol.metadata??=Symbol("metadata"),Vt.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ye){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Io(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:l}=qo(this.prototype,t)??{get(){return this[e]},set(c){this[e]=c}};return{get:r,set(c){let d=r?.call(this);l?.call(this,c),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ye}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;let t=Go(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){let e=this.properties,i=[...Vo(e),...Bo(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(pe(r))}else t!==void 0&&e.push(pe(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let l=(i.converter?.toAttribute!==void 0?i.converter:Ct).toAttribute(e,i.type);this._$Em=t,l==null?this.removeAttribute(r):this.setAttribute(r,l),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let l=i.getPropertyOptions(r),c=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:Ct;this._$Em=r;let d=c.fromAttribute(e,l.type);this[r]=d??this._$Ej?.get(r)??d,this._$Em=null}}requestUpdate(t,e,i,r=!1,l){if(t!==void 0){let c=this.constructor;if(r===!1&&(l=this[t]),i??=c.getPropertyOptions(t),!((i.hasChanged??Bt)(l,e)||i.useDefault&&i.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(c._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:l},c){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,c??e??this[t]),l!==!0||c!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,l]of i){let{wrapped:c}=l,d=this[r];c!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,l,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[Et("elementProperties")]=new Map,W[Et("finalized")]=new Map,Fo?.({ReactiveElement:W}),(Vt.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,Ke=s=>s,Gt=ye.trustedTypes,Je=Gt?Gt.createPolicy("lit-html",{createHTML:s=>s}):void 0,so="$lit$",Z=`lit$${Math.random().toFixed(9).slice(2)}$`,io="?"+Z,Xo=`<${io}>`,dt=document,Mt=()=>dt.createComment(""),Pt=s=>s===null||typeof s!="object"&&typeof s!="function",xe=Array.isArray,Wo=s=>xe(s)||typeof s?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,St=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Qe=/>/g,ct=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),to=/'/g,eo=/"/g,ro=/^(?:script|style|textarea|title)$/i,be=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),B=be(1),ut=be(2),xs=be(3),Y=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),oo=new WeakMap,pt=dt.createTreeWalker(dt,129);function no(s,t){if(!xe(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Je!==void 0?Je.createHTML(t):t}var Yo=(s,t)=>{let e=s.length-1,i=[],r,l=t===2?"<svg>":t===3?"<math>":"",c=St;for(let d=0;d<e;d++){let u=s[d],m,v,b=-1,S=0;for(;S<u.length&&(c.lastIndex=S,v=c.exec(u),v!==null);)S=c.lastIndex,c===St?v[1]==="!--"?c=Ze:v[1]!==void 0?c=Qe:v[2]!==void 0?(ro.test(v[2])&&(r=RegExp("</"+v[2],"g")),c=ct):v[3]!==void 0&&(c=ct):c===ct?v[0]===">"?(c=r??St,b=-1):v[1]===void 0?b=-2:(b=c.lastIndex-v[2].length,m=v[1],c=v[3]===void 0?ct:v[3]==='"'?eo:to):c===eo||c===to?c=ct:c===Ze||c===Qe?c=St:(c=ct,r=void 0);let g=c===ct&&s[d+1].startsWith("/>")?" ":"";l+=c===St?u+Xo:b>=0?(i.push(m),u.slice(0,b)+so+u.slice(b)+Z+g):u+Z+(b===-2?d:g)}return[no(s,l+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},kt=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let l=0,c=0,d=t.length-1,u=this.parts,[m,v]=Yo(t,e);if(this.el=s.createElement(m,i),pt.currentNode=this.el.content,e===2||e===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(r=pt.nextNode())!==null&&u.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(let b of r.getAttributeNames())if(b.endsWith(so)){let S=v[c++],g=r.getAttribute(b).split(Z),D=/([.?@])?(.*)/.exec(S);u.push({type:1,index:l,name:D[2],strings:g,ctor:D[1]==="."?he:D[1]==="?"?fe:D[1]==="@"?me:bt}),r.removeAttribute(b)}else b.startsWith(Z)&&(u.push({type:6,index:l}),r.removeAttribute(b));if(ro.test(r.tagName)){let b=r.textContent.split(Z),S=b.length-1;if(S>0){r.textContent=Gt?Gt.emptyScript:"";for(let g=0;g<S;g++)r.append(b[g],Mt()),pt.nextNode(),u.push({type:2,index:++l});r.append(b[S],Mt())}}}else if(r.nodeType===8)if(r.data===io)u.push({type:2,index:l});else{let b=-1;for(;(b=r.data.indexOf(Z,b+1))!==-1;)u.push({type:7,index:l}),b+=Z.length-1}l++}}static createElement(t,e){let i=dt.createElement("template");return i.innerHTML=t,i}};function xt(s,t,e=s,i){if(t===Y)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,l=Pt(t)?void 0:t._$litDirective$;return r?.constructor!==l&&(r?._$AO?.(!1),l===void 0?r=void 0:(r=new l(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=xt(s,r._$AS(s,t.values),r,i)),t}var ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??dt).importNode(e,!0);pt.currentNode=r;let l=pt.nextNode(),c=0,d=0,u=i[0];for(;u!==void 0;){if(c===u.index){let m;u.type===2?m=new Rt(l,l.nextSibling,this,t):u.type===1?m=new u.ctor(l,u.name,u.strings,this,t):u.type===6&&(m=new ge(l,this,t)),this._$AV.push(m),u=i[++d]}c!==u?.index&&(l=pt.nextNode(),c++)}return pt.currentNode=dt,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Rt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=xt(this,t,e),Pt(t)?t===O||t==null||t===""?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==O&&Pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(dt.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=kt.createElement(no(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let l=new ue(r,this),c=l.u(this.options);l.p(e),this.T(c),this._$AH=l}}_$AC(t){let e=oo.get(t.strings);return e===void 0&&oo.set(t.strings,e=new kt(t)),e}k(t){xe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let l of t)r===e.length?e.push(i=new s(this.O(Mt()),this.O(Mt()),this,this.options)):i=e[r],i._$AI(l),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ke(t).nextSibling;Ke(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},bt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,l){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=O}_$AI(t,e=this,i,r){let l=this.strings,c=!1;if(l===void 0)t=xt(this,t,e,0),c=!Pt(t)||t!==this._$AH&&t!==Y,c&&(this._$AH=t);else{let d=t,u,m;for(t=l[0],u=0;u<l.length-1;u++)m=xt(this,d[i+u],e,u),m===Y&&(m=this._$AH[u]),c||=!Pt(m)||m!==this._$AH[u],m===O?t=O:t!==O&&(t+=(m??"")+l[u+1]),this._$AH[u]=m}c&&!r&&this.j(t)}j(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},he=class extends bt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===O?void 0:t}},fe=class extends bt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==O)}},me=class extends bt{constructor(t,e,i,r,l){super(t,e,i,r,l),this.type=5}_$AI(t,e=this){if((t=xt(this,t,e,0)??O)===Y)return;let i=this._$AH,r=t===O&&i!==O||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,l=t!==O&&(i===O||r);r&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ge=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){xt(this,t)}};var Ko=ye.litHtmlPolyfillSupport;Ko?.(kt,Rt),(ye.litHtmlVersions??=[]).push("3.3.3");var ao=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let l=e?.renderBefore??null;i._$litPart$=r=new Rt(t.insertBefore(Mt(),l),l,void 0,e??{})}return r._$AI(s),r};var ve=globalThis,L=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ao(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};L._$litElement$=!0,L.finalized=!0,ve.litElementHydrateSupport?.({LitElement:L});var Jo=ve.litElementPolyfillSupport;Jo?.({LitElement:L});(ve.litElementVersions??=[]).push("4.2.2");var Q=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var Zo={attribute:!0,type:String,converter:Ct,reflect:!1,hasChanged:Bt},Qo=(s=Zo,t,e)=>{let{kind:i,metadata:r}=e,l=globalThis.litPropertyMetadata.get(r);if(l===void 0&&globalThis.litPropertyMetadata.set(r,l=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),l.set(e.name,s),i==="accessor"){let{name:c}=e;return{set(d){let u=t.get.call(this);t.set.call(this,d),this.requestUpdate(c,u,s,!0,d)},init(d){return d!==void 0&&this.C(c,void 0,s,d),d}}}if(i==="setter"){let{name:c}=e;return function(d){let u=this[c];t.call(this,d),this.requestUpdate(c,u,s,!0,d)}}throw Error("Unsupported decorator location: "+i)};function P(s){return(t,e)=>typeof e=="object"?Qo(s,t,e):((i,r,l)=>{let c=r.hasOwnProperty(l);return r.constructor.createProperty(l,i),c?Object.getOwnPropertyDescriptor(r,l):void 0})(s,t,e)}var ht=(s,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(s,t,e),e);function lo(s,t){return(e,i,r)=>{let l=c=>c.renderRoot?.querySelector(s)??null;if(t){let{get:c,set:d}=typeof i=="object"?e:r??(()=>{let u=Symbol();return{get(){return this[u]},set(m){this[u]=m}}})();return ht(e,i,{get(){let u=c.call(this);return u===void 0&&(u=l(this),(u!==null||this.hasUpdated)&&d.call(this,u)),u}})}return ht(e,i,{get(){return l(this)}})}}var co=ut`
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
`;var I=s=>({type:"analog",channel:s}),Ot=(s,t=0)=>({type:"i2c",signal:s,bus:t}),Dt=(s,t=0)=>({type:"spi",signal:s,bus:t}),we=(s,t=0)=>({type:"usart",signal:s,bus:t});var $e=[" ","Spacebar"];var ft=function(s,t,e,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(s,t,e,i);else for(var d=s.length-1;d>=0;d--)(c=s[d])&&(l=(r<3?c(l):r>3?c(t,e,l):c(t,e))||l);return r>3&&l&&Object.defineProperty(t,e,l),l},tt=class extends L{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[I(5),Ot("SCL")]},{name:"A4.2",x:97,y:9,signals:[I(4),Ot("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[Dt("SCK")]},{name:"12",x:134.5,y:9,signals:[Dt("MISO")]},{name:"11",x:144,y:9,signals:[Dt("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[Dt("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[we("TX")]},{name:"0",x:255.5,y:9,signals:[we("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[I(0)]},{name:"A1",x:217.5,y:191.5,signals:[I(1)]},{name:"A2",x:227,y:191.5,signals:[I(2)]},{name:"A3",x:236.5,y:191.5,signals:[I(3)]},{name:"A4",x:246,y:191.5,signals:[I(4),Ot("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[I(5),Ot("SCL")]}]}static get styles(){return X`
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
    `}render(){let{ledPower:t,led13:e,ledRX:i,ledTX:r}=this;return B`
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

        ${co}

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
          @keydown=${l=>$e.includes(l.key)&&this.down()}
          @keyup=${l=>$e.includes(l.key)&&this.up()}
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
          ${t&&ut`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${e&&ut`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${r&&ut`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${i&&ut`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};ft([P()],tt.prototype,"led13",void 0);ft([P()],tt.prototype,"ledRX",void 0);ft([P()],tt.prototype,"ledTX",void 0);ft([P()],tt.prototype,"ledPower",void 0);ft([P()],tt.prototype,"resetPressed",void 0);ft([lo("#reset-button")],tt.prototype,"resetButton",void 0);tt=ft([Q("wokwi-arduino-uno")],tt);var po=function(s,t,e,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(s,t,e,i);else for(var d=s.length-1;d>=0;d--)(c=s[d])&&(l=(r<3?c(l):r>3?c(t,e,l):c(t,e))||l);return r>3&&l&&Object.defineProperty(t,e,l),l},Ae={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},_e=class extends L{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return X`
      :host {
        display: flex;
      }
    `}breakValue(t){let e=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,i=Math.round(t/10**e);return t===0?[0,0]:[Math.round(i%100),e]}render(){let{value:t}=this,e=parseFloat(t),[i,r]=this.breakValue(e),l=Ae[Math.floor(i/10)],c=Ae[i%10],d=Ae[r];return B`
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
          <rect x="4" y="0" width="1" height="3" fill="${l}" clip-path="url(#g)" />

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${c}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${d}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};po([P()],_e.prototype,"value",void 0);_e=po([Q("wokwi-resistor")],_e);var mt=function(s,t,e,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(s,t,e,i);else for(var d=s.length-1;d>=0;d--)(c=s[d])&&(l=(r<3?c(l):r>3?c(t,e,l):c(t,e))||l);return r>3&&l&&Object.defineProperty(t,e,l),l},ts={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},et=class extends L{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,e=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:e,y:42,signals:[],description:"Cathode"}]}static get styles(){return X`
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
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:e,flip:i}=this,r=e||ts[t?.toLowerCase()]||t,l=this.brightness?.3+this.brightness*.7:0,c=this.value&&this.brightness>Number.EPSILON;return B`<svg
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
      <g class="light" style="display: ${c?"":"none"}">
        <ellipse
          cx="8"
          cy="10"
          rx="10"
          ry="10"
          fill="${r}"
          filter="url(#light2)"
          style="opacity: ${l}"
        ></ellipse>
        <ellipse cx="8" cy="10" rx="2" ry="2" fill="white" filter="url(#light1)"></ellipse>
        <ellipse
          cx="8"
          cy="10"
          rx="3"
          ry="3"
          fill="white"
          filter="url(#light1)"
          style="opacity: ${l}"
        ></ellipse>
      </g>
    </svg> `}render(){return B`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};mt([P()],et.prototype,"value",void 0);mt([P()],et.prototype,"brightness",void 0);mt([P()],et.prototype,"color",void 0);mt([P()],et.prototype,"lightColor",void 0);mt([P()],et.prototype,"label",void 0);mt([P({type:Boolean})],et.prototype,"flip",void 0);et=mt([Q("wokwi-led")],et);var uo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ho=s=>(...t)=>({_$litDirective$:s,values:t}),Ht=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var fo="important",es=" !"+fo,mo=ho(class extends Ht{constructor(s){if(super(s),s.type!==uo.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.ft.add(i);let l=typeof r=="string"&&r.endsWith(es);i.includes("-")||l?e.setProperty(i,l?r.slice(0,-11):r,l?fo:""):e[i]=r}}return Y}});var Ft=(s,t,e)=>{let i=Math.min(e,t);return Math.max(i,s)};function go(s,t){let e=t.transformPoint({x:s.left,y:s.top}),i=t.transformPoint({x:s.right,y:s.top}),r=t.transformPoint({x:s.left,y:s.bottom}),l=t.transformPoint({x:s.right,y:s.bottom}),c=Math.min(e.x,i.x,r.x,l.x),d=Math.min(e.y,i.y,r.y,l.y),u=Math.max(e.x,i.x,r.x,l.x),m=Math.max(e.y,i.y,r.y,l.y);return new DOMRect(c,d,u-c,m-d)}function yo(s,t,e){let{userAgent:i}=navigator;if(i.indexOf("Epiphany")>=0||i.indexOf("Safari")>=0){let l=s.getCTM(),c=t?.getCTM(),d=t?.getBoundingClientRect(),u=t?.ownerSVGElement?.getBoundingClientRect();if(!d||!u||!c||!l)return null;let m=u.x+u.width/2,v=u.y+u.height/2,b=m-(d.x+d.width/2),S=v-(d.y+d.height/2),g=Math.atan2(S,b)/Math.PI*180,D=new DOMMatrix().rotate(g),q=go(e,D),j=q.width/d.width,st=q.height/d.height,yt=c.inverse().multiply(l);return D.inverse().translate(q.left,q.top).multiply(yt.inverse()).scale(j,st).translate(-d.left,-d.top)}else return s.getScreenCTM()?.inverse()||null}var gt=function(s,t,e,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(s,t,e,i);else for(var d=s.length-1;d>=0;d--)(c=s[d])&&(l=(r<3?c(l):r>3?c(t,e,l):c(t,e))||l);return r>3&&l&&Object.defineProperty(t,e,l),l},Xt={x:9.91,y:8.18},ot=class extends L{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[I(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return X`
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
    `}mapToMinMax(t,e,i){return t*(i-e)+e}percentFromMinMax(t,e,i){return(t-e)/(i-e)}renderSVG(){let t=Ft(0,1,this.percentFromMinMax(this.value,this.min,this.max)),e=(this.endDegree-this.startDegree)*t+this.startDegree;return B`<svg
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
      style=${mo({"--knob-angle":e+"deg"})}
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
        cx=${Xt.x}
        cy=${Xt.y}
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
    </svg>`}render(){return B`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let e=t.target;this.updateValue(parseFloat(e.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:e}=this;e&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),e=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&e?yo(t,e,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let e=t.type==="touchmove",i=e?t.touches[0].pageX:t.pageX,r=e?t.touches[0].pageY:t.pageY,l=new DOMPointReadOnly(i,r).matrixTransform(this.pageToKnobMatrix),c=Xt.x-l.x,d=Xt.y-l.y,u=Math.round(Math.atan2(d,c)*180/Math.PI);u<0&&(u+=360),u-=90,c>0&&d<=0&&u>0&&(u-=360),u=Ft(this.startDegree,this.endDegree,u);let m=this.percentFromMinMax(u,this.startDegree,this.endDegree),v=this.mapToMinMax(m,this.min,this.max);this.updateValue(v)}updateValue(t){let e=Ft(this.min,this.max,t),i=Math.round(e/this.step)*this.step;this.value=Math.round(i*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};gt([P({type:Number})],ot.prototype,"min",void 0);gt([P({type:Number})],ot.prototype,"max",void 0);gt([P()],ot.prototype,"value",void 0);gt([P()],ot.prototype,"step",void 0);gt([P()],ot.prototype,"startDegree",void 0);gt([P()],ot.prototype,"endDegree",void 0);ot=gt([Q("wokwi-potentiometer")],ot);var xo=`:host {
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

.tc-barra {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  min-height: 50px;
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
  flex-wrap: wrap;
  gap: 6px 8px;
  min-width: 0;
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

.tc .tc-muestra {
  width: 24px;
  height: 24px;
  min-height: 0;
  padding: 0;
  border-radius: 50%;
  border: 2px solid var(--borde);
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
`;var Wt={verde:"#2e9e44",rojo:"#d7263d",negro:"#2b2b2b",azul:"#2f6fde",amarillo:"#e8c20c",naranja:"#f28c28",morado:"#8e44ad",blanco:"#f4f4f4"};function Ee(s,t){let e=[s,t];return e.some(i=>/^placa\.GND/.test(i))?"negro":e.some(i=>/^placa\.(5V|3V3|VIN)$/.test(i))?"rojo":"verde"}var ss=["3","5","6","9","10","11"],vt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(s){return/^\d+$/.test(s)?"D"+s:s.startsWith("GND.")?"GND"+s.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[s]||s},rotulo(s){return s==="D0"?"Pin 0 \xB7 RX del monitor serial":s==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(s)?"Pin "+s.slice(1)+(ss.includes(s.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(s)?s+" \xB7 entrada anal\xF3gica":s.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[s]||s}}},N={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:s=>({1:"1",2:"2"})[s],rotulo:s=>"pata "+s,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(s,t){s.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:s=>({A:"anodo",C:"catodo"})[s],rotulo:s=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[s]||s,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(s,t){s.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:s=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[s],rotulo:s=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[s]||s,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(s,t){s.min=0,s.max=100,s.value=Math.round((Number(t.posicion)||0)*100)}}};var is="http://www.w3.org/2000/svg",bo=5e3,rs=4,vo=8,ns=9.6,wo=.4,as=5,wt=s=>JSON.parse(JSON.stringify(s)),G=s=>Math.round(s*100)/100,Tt=(s,t)=>Math.hypot(s.x-t.x,s.y-t.y),$o=s=>Wt[s]||(/^#[0-9a-f]{3,8}$/i.test(s||"")?s:Wt.verde);function Co(s,t={}){if(!(s instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let e=t.placa||"uno";if(!vt[e])throw new Error(`Este prototipo no dibuja la placa \xAB${e}\xBB.`);let i=!!t.soloLectura,r=typeof t.alEvento=="function"?t.alEvento:null,l=[],c=ls(t.circuito,e),d=document.createElement("div");d.className="tecnocircuito",s.appendChild(d);let u=d.attachShadow({mode:"open"});u.innerHTML=`<style>${xo}</style>
<div class="tc">
  <div class="tc-barra">
    <div class="tc-grupo tc-agregar">
      <button type="button" data-accion="agregar" data-tipo="led">+ LED</button>
      <button type="button" data-accion="agregar" data-tipo="resistencia">+ Resistencia</button>
      <button type="button" data-accion="agregar" data-tipo="potenciometro">+ Potenci\xF3metro</button>
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
      <svg class="tc-capa-cables"><g transform="translate(${bo} ${bo})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
      <div class="tc-capa-pines"></div>
    </div>
    <div class="tc-tip" hidden></div>
    <div class="tc-ayuda" aria-live="polite"></div>
  </div>
</div>`;let m=o=>u.querySelector(o),v=m(".tc"),b=m(".tc-barra"),S=m(".tc-sel"),g=m(".tc-area"),D=m(".tc-mundo"),q=m(".tc-capa-comp"),j=m(".tc-capa-pines"),st=m(".tc-cables"),yt=m(".tc-asas"),[it,rt]=m(".tc-previa").children,V=m(".tc-ayuda"),y=m(".tc-tip"),x={px:0,py:0,escala:1.5},k=new Map,nt=new Map,w=null,A=null,_=null,jt=null,Yt=null,Se=!1,Kt=!1,Jt=!1,$t={leds:{},quemados:[],voltajes:{},placa:{}},z=o=>c.componentes.find(n=>n.id===o),Zt=o=>o==="placa"?{x:0,y:0,rot:0}:z(o);function Qt(o,n,a){let p=o==="placa"?vt[e]:N[n],h=document.createElement("div");h.className="tc-comp"+(o==="placa"?" tc-placa":""),h.dataset.id=o;let f;p?(f=document.createElement(p.etiqueta),p.aplicar&&p.aplicar(f,a),p.perilla&&f.addEventListener("input",()=>Ue(o,Number(f.value)/100))):(f=document.createElement("div"),f.className="tc-desconocido",f.textContent=`\xBF${n}?`,f.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito."),h.appendChild(f),q.appendChild(h);let $={id:o,def:p,div:h,el:f,w:64,h:40,pines:new Map,lista:!1};return k.set(o,$),Promise.resolve(f.updateComplete).then(()=>{if(k.get(o)===$){if(p){Object.assign($,Po(f));for(let E of f.pinInfo||[]){let C=p.nombrePin(E.name);if(!C)continue;let R=document.createElement("div");R.className="tc-pin",R.dataset.ref=`${o}.${C}`,j.appendChild(R),$.pines.set(C,{px:E.x,py:E.y,div:R})}}$.lista=!0,te($),Me($)}})}function Me(o){if(o.id==="placa")for(let n of["ledPower","led13","ledTX","ledRX"])o.el[n]=!!$t.placa[n];else if(o.def===N.led){let n=Number($t.leds[o.id])||0;o.el.value=n>.005,o.el.brightness=n,o.div.classList.toggle("tc-quemado",$t.quemados.includes(o.id))}}function Po(o){let n=o.shadowRoot&&o.shadowRoot.querySelector("svg"),a=n&&Ao(n.getAttribute("width")),p=n&&Ao(n.getAttribute("height"));return a&&p?{w:a,h:p}:{w:o.offsetWidth||64,h:o.offsetHeight||40}}function te(o){let n=Zt(o.id);if(n){Object.assign(o.div.style,{left:n.x+"px",top:n.y+"px",width:o.w+"px",height:o.h+"px",transform:n.rot?`rotate(${n.rot}deg)`:""});for(let a of o.pines.values()){let p=Pe(o,n,a);a.div.style.left=p.x+"px",a.div.style.top=p.y+"px"}}}function Pe(o,n,a){let p=((n.rot||0)%360+360)%360;if(!p)return{x:n.x+a.px,y:n.y+a.py};let h=p*Math.PI/180,f=Math.round(Math.cos(h)*1e9)/1e9,$=Math.round(Math.sin(h)*1e9)/1e9,E=o.w/2,C=o.h/2,R=a.px-E,M=a.py-C;return{x:G(n.x+E+R*f-M*$),y:G(n.y+C+R*$+M*f)}}function ee(o){let n=o.indexOf(".");return n>0?[o.slice(0,n),o.slice(n+1)]:[o,""]}function K(o){let[n,a]=ee(o),p=k.get(n);if(!p||!p.lista)return null;let h=Zt(n),f=p.pines.get(a);return f?Pe(p,h,f):p.def?null:{x:h.x+p.w/2,y:h.y+p.h/2}}function ko(o){let[n,a]=ee(o),p=k.get(n);return p&&p.pines.get(a)}function oe(o){let n=K(o.de),a=K(o.a);return!n||!a?null:[n,...(o.puntos||[]).map(([p,h])=>({x:p,y:h})),a]}function at(o,n,a){let p=document.createElementNS(is,o);for(let h in n)p.setAttribute(h,n[h]);return a.appendChild(p),p}function lt(){for(let[o,n]of nt)c.cables.includes(o)||(n.g.remove(),n.asas.forEach(a=>a.remove()),nt.delete(o));c.cables.forEach((o,n)=>{let a=nt.get(o);if(!a){let C=at("g",{class:"tc-cable"},st);a={g:C,borde:at("path",{class:"tc-cable-borde"},C),linea:at("path",{class:"tc-cable-linea"},C),p0:at("circle",{class:"tc-punta",r:2.4},C),p1:at("circle",{class:"tc-punta",r:2.4},C),toque:at("path",{class:"tc-cable-toque"},C),asas:[]},nt.set(o,a)}let p=oe(o);if(a.g.style.display=p?"":"none",!p)return;let h=_o(p),f=$o(o.color);for(let C of[a.borde,a.linea,a.toque])C.setAttribute("d",h);a.linea.setAttribute("stroke",f),a.toque.dataset.i=n,ke(a.p0,p[0],f),ke(a.p1,p[p.length-1],f);let $=!!(w&&w.tipo==="cable"&&w.cable===o);a.g.classList.toggle("tc-seleccionado",$),$&&st.lastChild!==a.g&&st.appendChild(a.g);let E=$?(o.puntos||[]).length:0;for(;a.asas.length>E;)a.asas.pop().remove();for(;a.asas.length<E;)a.asas.push(at("circle",{class:"tc-asa",r:3.6},yt));a.asas.forEach((C,R)=>{C.setAttribute("cx",o.puntos[R][0]),C.setAttribute("cy",o.puntos[R][1]),C.dataset.i=n,C.dataset.p=R})})}function ke(o,n,a){o.setAttribute("cx",n.x),o.setAttribute("cy",n.y),o.setAttribute("fill",a)}function At(){let o=A&&K(A.de);if(!o){it.setAttribute("d",""),rt.setAttribute("d","");return}let n=A.puntos.map($=>({...$})),a=n.length?n[n.length-1]:o,p=A.cursor?Lt(A.cursor,a):a,h=A.destino&&K(A.destino);h&&(p=h,Re(n,o,h));let f=_o([o,...n,p]);it.setAttribute("d",f),rt.setAttribute("d",f),rt.setAttribute("stroke",$o(Ee(A.de,A.destino||"")))}function Lt(o,n){let a=vo/x.escala;return{x:G(Math.abs(o.x-n.x)<a?n.x:o.x),y:G(Math.abs(o.y-n.y)<a?n.y:o.y)}}function Re(o,n,a){if(!o.length)return;let p=vo/x.escala,h=o[o.length-1],f=o.length>1?o[o.length-2]:n;Math.abs(h.y-a.y)<p&&h.y!==f.y&&(h.y=a.y),Math.abs(h.x-a.x)<p&&h.x!==f.x&&(h.x=a.x)}function Ro(o){H(null),A={de:o,puntos:[],cursor:null,destino:null},v.classList.add("tc-dibujando"),De(o,!0),At(),F()}function se(){A&&(De(A.de,!1),A=null,v.classList.remove("tc-dibujando"),At(),F())}function Oe(o){let n=A;if(!n)return;if(o===n.de)return se();let a=K(n.de),p=K(o);if(a&&p&&Re(n.puntos,a,p),se(),c.cables.some(f=>f.de===n.de&&f.a===o||f.de===o&&f.a===n.de)){No("Esos dos pines ya est\xE1n unidos.");return}let h={de:n.de,a:o,color:Ee(n.de,o)};n.puntos.length&&(h.puntos=n.puntos.map(f=>[G(f.x),G(f.y)])),c.cables.push(h),J("cable_agregado",{de:h.de,a:h.a}),H({tipo:"cable",cable:h}),U()}function Oo(o){let n=A.puntos.length?A.puntos[A.puntos.length-1]:K(A.de);A.puntos.push(n?Lt(o,n):o),At(),F()}function Do(){!A||!A.puntos.length||(A.puntos.pop(),At(),F())}function De(o,n){let a=ko(o);a&&a.div.classList.toggle("tc-activo",n)}function Te(o){c.cables=c.cables.filter(n=>n!==o),J("cable_quitado",{de:o.de,a:o.a})}function H(o){w=o;for(let n of k.values())n.div.classList.toggle("tc-seleccionado",!!o&&o.tipo==="comp"&&o.id===n.id);lt(),je(),F()}function je(){if(S.textContent="",!w||i)return;let o=n=>S.insertAdjacentHTML("beforeend",n);if(w.tipo==="cable"){o('<span class="tc-etiqueta">Cable</span>');for(let[n,a]of Object.entries(Wt)){let p=w.cable.color===n?" tc-activa":"";o(`<button type="button" class="tc-muestra${p}" data-accion="color" data-color="${n}" title="${n}" aria-label="Cable ${n}" style="background:${a}"></button>`)}}else{let n=z(w.id),a=N[n.tipo],p=k.get(n.id);if(o(`<span class="tc-etiqueta">${a?a.nombre:"Pieza desconocida"}</span>`),a&&a.campo){let h=String(n.props[a.campo.prop]),f=a.campo.opciones.map(([$,E])=>`<option value="${$}"${h===String($)?" selected":""}>${E}</option>`).join("");o(`<label class="tc-campo">${a.campo.etiqueta} <select data-prop="${a.campo.prop}">${f}</select></label>`)}if(a&&a.perilla){let h=Math.round((Number(n.props[a.perilla.prop])||0)*100);o(`<label class="tc-campo">${a.perilla.etiqueta} <input type="range" min="0" max="100" value="${h}" data-perilla aria-label="${a.perilla.etiqueta} del potenci\xF3metro"></label>`)}if(n.tipo==="led"){let h=p&&p.el.value?" checked":"";o(`<label class="tc-check"><input type="checkbox" data-accion="encender"${h}> Ver encendido</label>`)}o('<button type="button" data-accion="girar">Girar</button>')}o('<button type="button" data-accion="borrar">Borrar</button>')}function To(o){let n=N[o];if(!n)return;let a=1;for(;z(n.prefijo+a);)a++;let p=n.prefijo+a,h=(g.clientWidth/2-x.px)/x.escala,f=(g.clientHeight/2-x.py)/x.escala,$=c.componentes.length%4*14,E={id:p,tipo:o,x:Math.round(h-20+$),y:Math.round(f-20+$),rot:0,props:wt(n.props)};c.componentes.push(E),Qt(p,o,E.props),J("componente_agregado",{id:p,tipo:o}),H({tipo:"comp",id:p}),U()}function Le(){if(!w||w.tipo!=="comp")return;let o=z(w.id);o.rot=((o.rot||0)+90)%360,te(k.get(o.id)),lt(),J("componente_cambiado",{id:o.id,rot:o.rot}),U()}function Ne(){if(w){if(w.tipo==="cable")Te(w.cable);else{let o=z(w.id),n=k.get(w.id);if(c.cables.filter(a=>a.de.startsWith(o.id+".")||a.a.startsWith(o.id+".")).forEach(a=>Te(a)),c.componentes=c.componentes.filter(a=>a!==o),n){n.div.remove();for(let a of n.pines.values())a.div.remove();k.delete(o.id)}J("componente_quitado",{id:o.id,tipo:o.tipo})}zt(),H(null),U()}}b.addEventListener("click",o=>{let n=o.target.closest("button[data-accion]");if(!n)return;let a=n.dataset.accion;if(a==="acercar")return ae(1.25);if(a==="alejar")return ae(.8);if(a==="encuadrar")return le();i||(a==="agregar"?To(n.dataset.tipo):a==="girar"?Le():a==="borrar"?Ne():a==="color"&&w&&w.tipo==="cable"&&(w.cable.color=n.dataset.color,lt(),je(),U()))}),b.addEventListener("change",o=>{if(i||!w||w.tipo!=="comp")return;let n=z(w.id),a=k.get(w.id),p=N[n.tipo];if(o.target.dataset.accion==="encender"){a.el.value=o.target.checked;return}let h=o.target.dataset.prop;if(!h||!p)return;let f=typeof p.props[h]=="number"?Number(o.target.value):o.target.value;n.props={...n.props,[h]:f},p.aplicar(a.el,n.props),J("componente_cambiado",{id:n.id,props:wt(n.props)}),U()}),b.addEventListener("input",o=>{if(i||!w||w.tipo!=="comp"||!("perilla"in o.target.dataset))return;let n=k.get(w.id);Ue(w.id,Number(o.target.value)/100),n&&N.potenciometro.aplicar(n.el,z(w.id).props)});let ze=new Map;function Ue(o,n){let a=z(o),p=k.get(o);if(!a)return;let h=N[a.tipo];if(i)return p&&h.aplicar(p.el,a.props);let f=Math.max(0,Math.min(1,Math.round(n*100)/100));if(f===a.props[h.perilla.prop])return;a.props={...a.props,[h.perilla.prop]:f};let $=w&&w.tipo==="comp"&&w.id===o&&S.querySelector("[data-perilla]");$&&Number($.value)!==Math.round(f*100)&&($.value=Math.round(f*100)),U(),clearTimeout(ze.get(o)),ze.set(o,setTimeout(()=>J("componente_cambiado",{id:o,props:wt(a.props)}),400))}function ie(o){let n=g.getBoundingClientRect();return{x:(o.clientX-n.left-x.px)/x.escala,y:(o.clientY-n.top-x.py)/x.escala}}function re(o){try{g.setPointerCapture(o.pointerId)}catch{}}function ne(o,n={}){_={tipo:"paneo",x0:o.clientX,y0:o.clientY,px0:x.px,py0:x.py,movido:!1,...n},re(o)}g.addEventListener("pointerdown",o=>{if(o.pointerType==="mouse"&&o.button!==0)return;g.focus({preventScroll:!0}),zt();let n=o.target,a=ie(o);if(i)return ne(o);let p=n.closest(".tc-pin");if(p){if(o.preventDefault(),A)return Oe(p.dataset.ref);Ro(p.dataset.ref),_={tipo:"pin",ref:p.dataset.ref,x0:o.clientX,y0:o.clientY,movido:!1};return}if(A)return ne(o,{punto:a});let h=n.closest(".tc-asa");if(h)return _={tipo:"asa",cable:c.cables[+h.dataset.i],k:+h.dataset.p,x0:o.clientX,y0:o.clientY,movido:!1},re(o);let f=n.closest(".tc-cable-toque");if(f)return H({tipo:"cable",cable:c.cables[+f.dataset.i]});let $=n.closest(".tc-comp");if($&&$.dataset.id!=="placa"){let E=z($.dataset.id);return H({tipo:"comp",id:E.id}),N[E.tipo]&&N[E.tipo].perilla&&o.composedPath().some(ps)?void 0:(_={tipo:"mover",id:E.id,dx:a.x-E.x,dy:a.y-E.y,x0:o.clientX,y0:o.clientY,movido:!1},re(o))}H(null),ne(o)}),g.addEventListener("pointermove",o=>{let n=ie(o);if(_){if(!_.movido&&Math.hypot(o.clientX-_.x0,o.clientY-_.y0)>rs&&(_.movido=!0),_.movido&&_.tipo==="mover"){let a=z(_.id);a.x=Math.round(n.x-_.dx),a.y=Math.round(n.y-_.dy),te(k.get(a.id)),lt()}else if(_.movido&&_.tipo==="paneo")x.px=_.px0+o.clientX-_.x0,x.py=_.py0+o.clientY-_.y0,g.classList.add("tc-paneando"),Nt();else if(_.movido&&_.tipo==="asa"){let a=oe(_.cable),p=Lt(n,a[_.k]);p=Lt(p,a[_.k+2]),_.cable.puntos[_.k]=[p.x,p.y],lt()}}if(A){let a=o.target.closest&&o.target.closest(".tc-pin");A.cursor=n,A.destino=a&&a.dataset.ref!==A.de?a.dataset.ref:null,At()}(!_||_.tipo==="pin")&&Lo(o.target.closest&&o.target.closest(".tc-pin"))});function Ie(o){let n=_;if(_=null,g.classList.remove("tc-paneando"),!!n){if(n.tipo==="mover"&&n.movido){let a=z(n.id);J("componente_cambiado",{id:a.id,x:a.x,y:a.y}),U()}else if(n.tipo==="asa"&&n.movido)U();else if(n.tipo==="paneo"&&!n.movido&&n.punto&&A)Oo(n.punto);else if(n.tipo==="pin"&&n.movido&&A&&o.type==="pointerup"){let a=u.elementFromPoint(o.clientX,o.clientY),p=a&&a.closest(".tc-pin");p&&p.dataset.ref!==n.ref&&Oe(p.dataset.ref)}}}g.addEventListener("pointerup",Ie),g.addEventListener("pointercancel",Ie),g.addEventListener("pointerleave",()=>zt()),g.addEventListener("dblclick",o=>{if(i||A)return;let n=u.elementFromPoint(o.clientX,o.clientY)||o.target,a=n.closest(".tc-asa"),p=n.closest(".tc-cable-toque");if(a){let h=c.cables[+a.dataset.i];h.puntos.splice(+a.dataset.p,1),h.puntos.length||delete h.puntos,lt(),F(),U()}else if(p){let h=c.cables[+p.dataset.i],f=oe(h),$=ie(o),E=0,C=$,R=1/0;for(let M=0;M<f.length-1;M++){let T=cs($,f[M],f[M+1]);Tt($,T)<R&&(R=Tt($,T),E=M,C=T)}(h.puntos=h.puntos||[]).splice(E,0,[G(C.x),G(C.y)]),H({tipo:"cable",cable:h}),U()}}),g.addEventListener("wheel",o=>{o.preventDefault();let n=g.getBoundingClientRect(),a=Math.min(1.5,Math.max(.66,Math.exp(-o.deltaY*.0015)));ae(a,o.clientX-n.left,o.clientY-n.top)},{passive:!1}),v.addEventListener("keydown",o=>{if(!(o.target.closest&&o.target.closest("select, input")))if(o.key==="Escape")A?se():H(null);else{if(i)return;o.key==="Delete"||o.key==="Backspace"?(o.preventDefault(),A?Do():Ne()):(o.key==="r"||o.key==="R")&&!o.ctrlKey&&!o.metaKey&&!o.altKey&&Le()}});function Nt(){D.style.transform=`translate(${x.px}px, ${x.py}px) scale(${x.escala})`;let o=ns*x.escala;g.style.backgroundSize=`${o}px ${o}px`,g.style.backgroundPosition=`${x.px}px ${x.py}px`,zt()}function ae(o,n,a){n===void 0&&(n=g.clientWidth/2,a=g.clientHeight/2);let p=Math.min(as,Math.max(wo,x.escala*o)),h=(n-x.px)/x.escala,f=(a-x.py)/x.escala;Object.assign(x,{escala:p,px:n-h*p,py:a-f*p}),Nt()}function le(){let o=g.clientWidth,n=g.clientHeight;if(!o||!n)return!1;let a=1/0,p=1/0,h=-1/0,f=-1/0,$=(M,T)=>{a=Math.min(a,M),p=Math.min(p,T),h=Math.max(h,M),f=Math.max(f,T)};for(let M of k.values()){let T=Zt(M.id);if(!T)continue;let Ut=(T.rot||0)%180!==0,Be=(Ut?M.h:M.w)/2,Ge=(Ut?M.w:M.h)/2;$(T.x+M.w/2-Be,T.y+M.h/2-Ge),$(T.x+M.w/2+Be,T.y+M.h/2+Ge)}for(let M of c.cables)for(let[T,Ut]of M.puntos||[])$(T,Ut);if(!isFinite(a))return!1;let E=48,C=Math.min((o-2*E)/(h-a||1),(n-2*E)/(f-p||1)),R=Math.min(2.4,Math.max(wo,C));return Object.assign(x,{escala:R,px:o/2-(a+h)/2*R,py:n/2-(p+f)/2*R}),Nt(),!0}function jo(o){let[n,a]=ee(o);if(n==="placa")return vt[e].rotulo(a);let p=z(n),h=p&&N[p.tipo];return h?`${h.nombre}: ${h.rotulo(a)}`:a}function Lo(o){let n=o?o.dataset.ref:null;if(n===jt)return;jt=n;let a=n&&K(n);if(!a){y.hidden=!0;return}let p=x.py+a.y*x.escala,h=$t.voltajes[n],f=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;y.textContent=jo(n)+f,y.style.left=x.px+a.x*x.escala+"px",y.style.top=p+"px",y.classList.toggle("tc-abajo",p<44),y.hidden=!1}function zt(){jt=null,y.hidden=!0}function F(){clearTimeout(Yt),V.classList.remove("tc-aviso");let o=w&&w.tipo==="cable"&&w.cable.puntos&&w.cable.puntos.length;V.textContent=i?"Solo lectura: puedes mover la vista y hacer zoom.":A?A.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Esc: cancelar":o?"Arrastra los puntos blancos para acomodar el cable \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":w&&w.tipo==="cable"?"Elige el color arriba \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":w?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function No(o){F(),V.textContent=o,V.classList.add("tc-aviso"),Yt=setTimeout(F,2500)}function J(o,n){if(r)try{r({t:Date.now(),origen:"circuito",tipo:o,datos:n})}catch(a){console.error(a)}}function U(){let o=wt(c);for(let n of l)try{n(o)}catch(a){console.error(a)}}function qe(o){v.classList.toggle("tc-oscuro",o==="oscuro"),v.classList.toggle("tc-claro",o==="claro")}let zo={circuito:()=>wt(c),alCambiar(o){typeof o=="function"&&l.push(o)},ponerPlaca(o){if(o!==e)throw new Error(`Este prototipo solo dibuja la placa \xAB${e}\xBB.`)},ponerTema:qe,_mostrar(o){$t={leds:o.leds||{},quemados:o.quemados||[],voltajes:o.voltajes||{},placa:o.placa||{}},jt=null;for(let n of k.values())n.lista&&Me(n)},destruir(){Jt=!0,Ve.disconnect(),clearTimeout(Yt),l.length=0,k.clear(),nt.clear(),d.remove()}};t.tema&&qe(t.tema),i&&v.classList.add("tc-solo-lectura"),Nt(),F();let Ve=new ResizeObserver(()=>{Se&&!Kt&&!Jt&&(Kt=le())});return Ve.observe(g),Promise.all([Qt("placa"),...c.componentes.map(o=>Qt(o.id,o.tipo,o.props))]).then(()=>{Jt||(Se=!0,lt(),Kt=le())}),zo}function ls(s,t){let e=s&&typeof s=="object"?wt(s):{};e.formato=e.formato||1,e.placa=t;let i=new Set;e.componentes=(Array.isArray(e.componentes)?e.componentes:[]).filter(r=>r&&typeof r.id=="string"&&r.id&&r.id!=="placa"&&!r.id.includes(".")&&!i.has(r.id)&&i.add(r.id));for(let r of e.componentes){r.x=Number(r.x)||0,r.y=Number(r.y)||0,r.rot=Number(r.rot)||0;let l=N[r.tipo]?N[r.tipo].props:{};r.props={...l,...r.props&&typeof r.props=="object"?r.props:{}}}e.cables=(Array.isArray(e.cables)?e.cables:[]).filter(r=>r&&typeof r.de=="string"&&typeof r.a=="string");for(let r of e.cables){let l=Array.isArray(r.puntos)&&r.puntos.every(c=>Array.isArray(c)&&c.length===2&&c.every(Number.isFinite));"puntos"in r&&!l&&delete r.puntos}return"protoboard"in e||(e.protoboard=null),e}function Ao(s){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(s||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function _o(s){let t=i=>`${G(i.x)} ${G(i.y)}`,e=`M${t(s[0])}`;for(let i=1;i<s.length-1;i++){let r=s[i-1],l=s[i],c=s[i+1],d=Math.min(5,Tt(r,l)/2,Tt(l,c)/2);e+=` L${t(Eo(l,r,d))} Q${t(l)} ${t(Eo(l,c,d))}`}return`${e} L${t(s[s.length-1])}`}function Eo(s,t,e){let i=Tt(s,t);return i?{x:s.x+(t.x-s.x)*e/i,y:s.y+(t.y-s.y)*e/i}:s}function cs(s,t,e){let i=e.x-t.x,r=e.y-t.y,l=i*i+r*r,c=l?Math.max(0,Math.min(1,((s.x-t.x)*i+(s.y-t.y)*r)/l)):0;return{x:t.x+c*i,y:t.y+c*r}}function ps(s){return!s||!s.getAttribute?!1:s.id==="knob"||s.id==="rotating"?!0:s.tagName==="ellipse"&&Number(s.getAttribute("rx"))>5}function So(s){let t=new Uint8Array(32768),e=0,i=!1;for(let[r,l]of String(s).split(/\r?\n/).entries()){let c=l.trim();if(!c)continue;if(!/^:([0-9a-f]{2})+$/i.test(c))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${r+1}).`);let d=c.slice(1).match(/../g).map(g=>parseInt(g,16));if(d.reduce((g,D)=>g+D,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${r+1}).`);let[u,m,v,b]=d,S=d.slice(4,4+u);if(b===0){let g=e+(m<<8|v);if(g+u>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set(S,g)}else if(b===1){i=!0;break}else b===2?e=(S[0]<<8|S[1])<<4:b===4&&(e=(S[0]<<8|S[1])<<16)}if(!i)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var ds=["danoComponentes","limitePin"],Ce='(()=>{function ut(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var Ae=256,Pe=128,et=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+Ae),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(Pe),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,i=255){let a=this.writeHooks[e];a&&a(s,this.data[e],e,i)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:i,enableRegister:a,enableMask:n}=e;e.inverseFlag?this.data[s]&=~i:this.data[s]|=i,this.data[a]&n&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:i,flagRegister:a,flagMask:n,inverseFlag:o}=e;if(s&i){let r=this.data[a]&n;(o?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:i},a=!0){a&&(this.data[s]&=~i);let{pendingInterrupts:n,maxInterrupt:o}=this;if(n[e]&&(n[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=o;r++)if(n[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:i,flagMask:a}=e;s&a&&(this.data[i]&=~a,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:i}=this;s=this.cycles+Math.max(1,s);let a=i.pop(),n=a??{cycles:s,callback:e,next:null};n.cycles=s,n.callback=e;let{nextClockEvent:o}=this,r=null;for(;o&&o.cycles<s;)r=o,o=o.next;return r?(r.next=n,n.next=o):(this.nextClockEvent=n,n.next=o),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:i}=this,a=null;for(;s;){if(s.callback===e)return a?a.next=s.next:this.nextClockEvent=s.next,i.length<10&&i.push(s),!0;a=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let i=this.pendingInterrupts[s];ut(this,i.address),i.constant||this.clearInterrupt(i)}}};function st(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function St(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=s+i+(t.data[95]&1),n=a&255;t.data[(e&496)>>4]=n;let o=t.data[95]&192;o|=n?0:2,o|=128&n?4:0,o|=(n^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=a&256?1:0,o|=1&(s&i|i&~n|~n&s)?32:0,t.data[95]=o}else if((e&64512)===3072){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=s+i&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^i)&(a^s)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=s+i&256?1:0,n|=1&(s&i|i&~a|~a&s)?32:0,t.data[95]=n}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),a=i+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,a,!0);let n=t.data[95]&224;n|=a?0:2,n|=32768&a?4:0,n|=~i&a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=~a&i&32768?1:0,t.data[95]=n,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65039)===37893){let s=t.data[(e&496)>>4],i=s>>>1|128&s;t.data[(e&496)>>4]=i;let a=t.data[95]&224;a|=i?0:2,a|=128&i?4:0,a|=s&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,i=(e&496)>>4;t.data[i]=~(1<<s)&t.data[i]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],i=e&7;t.data[95]=t.data[95]&191|(s>>i&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,i=t.pc+2,a=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[a]=255&i,t.data[a-1]=i>>8&255,n&&(t.data[a-2]=i>>16&255),t.dataView.setUint16(93,a-(n?3:2),!0),t.pc=s-1,t.cycles+=n?4:3}else if((e&65280)===38912){let s=e&248,i=e&7,a=t.readData((s>>3)+32),n=1<<i;t.writeData((s>>3)+32,a&~n,n)}else if((e&65039)===37888){let s=(e&496)>>4,i=255-t.data[s];t.data[s]=i;let a=t.data[95]&225|1;a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===5120){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=s-i,n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=((s^i)&(s^a)&128)!==0?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=n}else if((e&64512)===1024){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=t.data[95],n=s-i-(a&1);a=a&192|(!n&&a>>1&1?2:0)|(i+(a&1)>s?1:0),a|=128&n?4:0,a|=(s^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=a}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,a=s-i,n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(s^i)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=n}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],i=st(s)?2:1;t.pc+=i,t.cycles+=i}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],i=s-1;t.data[(e&496)>>4]=i;let a=t.data[95]&225;a|=i?0:2,a|=128&i?4:0,a|=s===128?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(e===38169){let s=t.pc+1,i=t.dataView.getUint16(93,!0),a=t.data[92];t.data[i]=s&255,t.data[i-1]=s>>8&255,t.data[i-2]=s>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],i=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|i],t.dataView.setUint16(30,i+1,!0),i===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],i=t.data[(e&7)+16],a=s*i<<1;t.dataView.setUint16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.dataView.getInt8((e&7)+16),a=s*i<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.data[(e&7)+16],a=s*i<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?2:0)|(s*i&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=s&255,t.data[i-1]=s>>8&255,a&&(t.data[i-2]=s>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=a?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],i=s+1&255;t.data[(e&496)>>4]=i;let a=t.data[95]&225;a|=i?0:2,a|=128&i?4:0,a|=s===127?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,i=t.data[s],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a&255-i),t.data[s]=a}else if((e&65039)===37381){let s=(e&496)>>4,i=t.data[s],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a|i),t.data[s]=a}else if((e&65039)===37383){let s=t.data[(e&496)>>4],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^i),t.data[(e&496)>>4]=i}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],i=s>>>1;t.data[(e&496)>>4]=i;let a=t.data[95]&224;a|=i?0:2,a|=s&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),i=2*((e&240)>>4);t.data[i]=t.data[s],t.data[i+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,i=t.data[s],a=0-i;t.data[s]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=a===128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a?1:0,n|=1&(a|i)?32:0,t.data[95]=n}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),i=t.pc+1,a=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[a]=255&i,t.data[a-1]=i>>8&255,n&&(t.data[a-2]=i>>16&255),t.dataView.setUint16(93,a-(n?3:2),!0),t.pc+=s,t.cycles+=n?3:2}else if(e===38152){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],i=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=i;let a=t.data[95]&224;a|=i?0:2,a|=128&i?4:0,a|=1&s?1:0,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===2048){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=t.data[95],n=s-i-(a&1);t.data[(e&496)>>4]=n,a=a&192|(!n&&a>>1&1?2:0)|(i+(a&1)>s?1:0),a|=128&n?4:0,a|=(s^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=a}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,a=t.data[95],n=s-i-(a&1);t.data[((e&240)>>4)+16]=n,a=a&192|(!n&&a>>1&1?2:0)|(i+(a&1)>s?1:0),a|=128&n?4:0,a|=(s^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=a}else if((e&65280)===39424){let s=((e&248)>>3)+32,i=1<<(e&7);t.writeData(s,t.readData(s)|i,i),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let i=t.progMem[t.pc+1],a=st(i)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let i=t.progMem[t.pc+1],a=st(i)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),a=e&15|(e&192)>>2,n=i-a;t.dataView.setUint16(s,n,!0);let o=t.data[95]&192;o|=n?0:2,o|=32768&n?4:0,o|=i&~n&32768?8:0,o|=o>>2&1^o>>3&1?16:0,o|=a>i?1:0,o|=1&(~i&a|a&n|n&~i)?32:0,t.data[95]=o,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],i=st(s)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],i=st(s)?2:1;t.cycles+=i,t.pc+=i}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],i=t.progMem[t.pc+1];t.writeData(i,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.writeData(i,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0);t.writeData(i,s),t.dataView.setUint16(28,i+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],a=s-i;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(s^i)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=n}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,a=s-i;t.data[((e&240)>>4)+16]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(s^i)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=n}else if((e&65039)===37890){let s=(e&496)>>4,i=t.data[s];t.data[s]=(15&i)<<4|(240&i)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,i=t.data[s],a=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=i,t.data[s]=a}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var b;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(b||(b={}));var y;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(y||(y={}));var Ht={0:{type:y.SingleEnded,channel:0},1:{type:y.SingleEnded,channel:1},2:{type:y.SingleEnded,channel:2},3:{type:y.SingleEnded,channel:3},4:{type:y.SingleEnded,channel:4},5:{type:y.SingleEnded,channel:5},6:{type:y.SingleEnded,channel:6},7:{type:y.SingleEnded,channel:7},8:{type:y.Temperature},14:{type:y.Constant,voltage:1.1},15:{type:y.Constant,voltage:0}},we={type:y.Constant,voltage:0},It={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ht,adcReferences:[b.AREF,b.AVCC,b.Reserved,b.Internal1V1]},Ee=7,Ue=8,ye=16,Nt=64,Tt=128,De=31,ke=32,Be=8,Me=8,be=3,_e=6,it=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=i=>{var a;let n=0;switch(i.type){case y.Constant:n=i.voltage;break;case y.SingleEnded:n=(a=this.channelValues[i.channel])!==null&&a!==void 0?a:0;break;case y.Differential:n=i.gain*((this.channelValues[i.positiveChannel]||0)-(this.channelValues[i.negativeChannel]||0));break;case y.Temperature:n=.378125;break}let o=n/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(o),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:ye,enableRegister:this.config.ADCSRA,enableMask:Ue},e.writeHooks[s.ADCSRA]=(i,a)=>{var n;if(i&Tt&&!(a&Tt)&&(this.conversionCycles=25),e.data[s.ADCSRA]=i,e.updateInterruptEnable(this.ADC,i),!this.converting&&i&Nt){if(!(i&Tt))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let o=this.cpu.data[this.config.ADMUX]&De;e.data[s.ADCSRB]&Be&&(o|=32),o&=s.muxInputMask;let r=(n=s.muxChannels[o])!==null&&n!==void 0?n:we;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:i,ADMUX:a,ADCSRA:n}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[a]&ke?(this.cpu.data[s]=e<<6&255,this.cpu.data[i]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[i]=e>>8&3),this.cpu.data[n]&=~Nt,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&Ee){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:i}=this.config,a=this.cpu.data[s]>>_e&be;return i.length>4&&this.cpu.data[s]&Me&&(a|=4),(e=i[a])!==null&&e!==void 0?e:b.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case b.AVCC:return this.avcc;case b.AREF:return this.aref;case b.Internal1V1:return 1.1;case b.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var ve=2,Oe=4,We=8,Fe=16,Ve=32,Us=ve|Oe|We|Fe|Ve;var Lt={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Kt={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},qt={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Gt={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},jt={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var K={PIN:35,DDR:36,PORT:37,pinChange:qt,externalInterrupts:[]},At={PIN:38,DDR:39,PORT:40,pinChange:Gt,externalInterrupts:[]},F={PIN:41,DDR:42,PORT:43,pinChange:jt,externalInterrupts:[null,null,Lt,Kt]};var k;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(k||(k={}));var T;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(T||(T={}));var L;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(L||(L={}));var at=class{constructor(e,s){var i,a,n,o;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=c=>{let g=e.data[s.PORT];return e.data[s.DDR]=c,this.writeGpio(g,c),this.updatePinRegister(c),!0},e.writeHooks[s.PORT]=c=>{let g=e.data[s.DDR];return e.data[s.PORT]=c,this.writeGpio(c,g),this.updatePinRegister(g),!0},e.writeHooks[s.PIN]=(c,g,R,w)=>{let S=e.data[s.PORT],h=e.data[s.DDR],p=S^c&w;return e.data[s.PORT]=p,this.writeGpio(p,h),this.updatePinRegister(h),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(c=>c?{address:c.interrupt,flagRegister:c.EIFR,flagMask:1<<c.index,enableRegister:c.EIMSK,enableMask:1<<c.index}:null);let l=new Set(r.map(c=>c?.EICR));for(let c of l)this.attachInterruptHook(c||0);let C=(a=(i=r.find(c=>c&&c.EIMSK))===null||i===void 0?void 0:i.EIMSK)!==null&&a!==void 0?a:0;this.attachInterruptHook(C,"mask");let d=(o=(n=r.find(c=>c&&c.EIFR))===null||n===void 0?void 0:n.EIFR)!==null&&o!==void 0?o:0;this.attachInterruptHook(d,"flag");let{pinChange:f}=s;if(this.PCINT=f?{address:f.pinChangeInterrupt,flagRegister:f.PCIFR,flagMask:1<<f.PCIE,enableRegister:f.PCICR,enableMask:1<<f.PCIE}:null,f){let{PCIFR:c,PCMSK:g}=f;e.writeHooks[c]=R=>{for(let w of this.cpu.gpioPorts){let{PCINT:S}=w;S&&e.clearInterruptByFlag(S,R)}return!0},e.writeHooks[g]=R=>{e.data[g]=R;for(let w of this.cpu.gpioPorts){let{PCINT:S}=w;S&&e.updateInterruptEnable(S,R)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],a=1<<e,n=i&a?k.InputPullUp:k.Input,o=this.openCollector&a?n:k.High;return s&a?this.lastValue&a?o:k.Low:n}setPin(e,s){let i=1<<e;this.pinValue&=~i,s&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:i,portConfig:a}=this,n=1<<e;if(s===T.None)this.overrideMask|=n,this.overrideValue&=~n;else switch(this.overrideMask&=~n,s){case T.Enable:this.overrideValue&=~n,this.overrideValue|=i.data[a.PORT]&n;break;case T.Set:this.overrideValue|=n;break;case T.Clear:this.overrideValue&=~n;break;case T.Toggle:this.overrideValue^=n;break}let o=i.data[a.DDR];this.writeGpio(i.data[a.PORT],o),this.updatePinRegister(o)}updatePinRegister(e){var s,i;let a=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=a,this.lastPin!==a){for(let n=0;n<8;n++)if((a&1<<n)!==(this.lastPin&1<<n)){let o=!!(a&1<<n);this.toggleInterrupt(n,o),(i=(s=this.externalClockListeners)[n])===null||i===void 0||i.call(s,o)}this.lastPin=a}}toggleInterrupt(e,s){let{cpu:i,portConfig:a,externalInts:n,PCINT:o}=this,{externalInterrupts:r,pinChange:l}=a,C=r[e],d=n[e];if(d&&C){let{EIMSK:f,index:c,EICR:g,iscOffset:R}=C;if(i.data[f]&1<<c){let w=i.data[g]>>R&3,S=!1;switch(d.constant=!1,w){case L.LowLevel:S=!s,d.constant=!0;break;case L.Change:S=!0;break;case L.FallingEdge:S=!s;break;case L.RisingEdge:S=s;break}S?i.setInterruptFlag(d):d.constant&&i.clearInterrupt(d,!0)}}if(l&&o&&l.mask&1<<e){let{PCMSK:f}=l;i.data[f]&1<<e+l.offset&&i.setInterruptFlag(o)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:i}=this;i.writeHooks[e]=a=>{s!=="flag"&&(i.data[e]=a);for(let n of i.gpioPorts){for(let o of n.externalInts)o&&s==="mask"&&i.updateInterruptEnable(o,a),o&&!o.constant&&s==="flag"&&i.clearInterruptByFlag(o,a);n.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let i=0;i<8;i++){let a=s[i];if(!a)continue;let n=!!(this.lastPin&1<<i),{EIFR:o,EIMSK:r,index:l,EICR:C,iscOffset:d,interrupt:f}=a;if(!(e.data[r]&1<<l)||n)continue;(e.data[C]>>d&3)===L.LowLevel&&e.queueInterrupt({address:f,flagRegister:o,flagMask:1<<l,enableRegister:r,enableMask:1<<l,constant:!0})}}writeGpio(e,s){let i=(e&this.overrideMask|this.overrideValue)&s|e&~s,a=this.lastValue;if(i!==a||s!==this.lastDdr){this.lastValue=i,this.lastDdr=s;for(let n of this.listeners)n(i,a)}}};var $t={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},nt;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(nt||(nt={}));var wt={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Et=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:$t,compPortA:F.PORT,compPinA:6,compPortB:F.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:F.PORT,externalClockPin:4},wt),Ut=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:$t,compPortA:K.PORT,compPinA:1,compPortB:K.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:F.PORT,externalClockPin:5},wt),yt=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:K.PORT,compPinA:3,compPortB:F.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},wt),J;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(J||(J={}));var I;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(I||(I={}));var m;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(m||(m={}));var V=1,$=2,q=1,{Normal:Dt,PWMPhaseCorrect:v,CTC:Ct,FastPWM:O,Reserved:Pt,PWMPhaseFrequencyCorrect:ot}=J,Ne=[[Dt,255,m.Immediate,I.Max,0],[v,255,m.Top,I.Bottom,0],[Ct,V,m.Immediate,I.Max,0],[O,255,m.Bottom,I.Max,0],[Pt,255,m.Immediate,I.Max,0],[v,V,m.Top,I.Bottom,q],[Pt,255,m.Immediate,I.Max,0],[O,V,m.Bottom,I.Top,q]],He=[[Dt,65535,m.Immediate,I.Max,0],[v,255,m.Top,I.Bottom,0],[v,511,m.Top,I.Bottom,0],[v,1023,m.Top,I.Bottom,0],[Ct,V,m.Immediate,I.Max,0],[O,255,m.Bottom,I.Top,0],[O,511,m.Bottom,I.Top,0],[O,1023,m.Bottom,I.Top,0],[ot,$,m.Bottom,I.Bottom,0],[ot,V,m.Bottom,I.Bottom,q],[v,$,m.Top,I.Bottom,0],[v,V,m.Top,I.Bottom,q],[Ct,$,m.Immediate,I.Max,0],[Pt,65535,m.Immediate,I.Max,0],[O,$,m.Bottom,I.Top,q],[O,V,m.Bottom,I.Top,q]];function Le(t){switch(t){case 1:return T.Toggle;case 2:return T.Clear;case 3:return T.Set;default:return T.Enable}}var Xt=128,zt=64,Ke=32,rt=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=m.Immediate,this.tovUpdateMode=I.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(i=!0,a=!1)=>{let{divider:n,lastCycle:o,cpu:r}=this,{cycles:l}=r,C=l-o;if(n&&C>=n||a){let d=a?1:Math.floor(C/n);this.lastCycle+=d*n;let f=this.tcnt,{timerMode:c,TOP:g}=this,R=c===v||c===ot,w=R?this.phasePwmCount(f,d):(f+d)%(g+1),S=f+d>g;if(this.tcntUpdated||(this.tcnt=w,R||this.timerUpdated(w,f)),!R){if(c===O&&S){let{compA:h,compB:p}=this;h&&this.updateCompPin(h,"A",!0),p&&this.updateCompPin(p,"B",!0)}this.ocrUpdateMode==m.Bottom&&S&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),S&&(this.tovUpdateMode==I.Top||g===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===m.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===m.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:d}=this,{externalClockPin:f}=this.config,c=this.config.dividers[d];this.lastCycle=c?this.cpu.cycles:0,this.updateDivider=!1,this.divider=c,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[f]=null),c?r.addClockEvent(this.count,this.lastCycle+c-r.cycles):this.externalClockPort&&(d===nt.FallingEdge||d===nt.RisingEdge)&&(this.externalClockPort.externalClockListeners[f]=this.externalClockCallback,this.externalClockRisingEdge=d===nt.RisingEdge);return}i&&n&&r.addClockEvent(this.count,this.lastCycle+n-r.cycles)},this.externalClockCallback=i=>{i===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=i=>(this.count(!1),this.config.bits===16&&(this.cpu.data[i+1]=this.tcnt>>8),this.cpu.data[i]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=i=>{this.tcntNext=this.highByteTemp<<8|i,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=i=>{this.nextOcrA=this.highByteTemp<<8|i,this.ocrUpdateMode===m.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=i=>{this.nextOcrB=this.highByteTemp<<8|i,this.ocrUpdateMode===m.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=i=>{this.nextOcrC=this.highByteTemp<<8|i,this.ocrUpdateMode===m.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=n=>{this.icr=this.highByteTemp<<8|n};let i=n=>{this.highByteTemp=n},a=(n,o,r)=>(this.highByteTemp=n&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=i,this.cpu.writeHooks[s.OCRA+1]=a,this.cpu.writeHooks[s.OCRB+1]=a,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=a),this.cpu.writeHooks[s.ICR+1]=i}e.writeHooks[s.TCCRA]=i=>(this.cpu.data[s.TCCRA]=i,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=i=>(s.TCCRC||(this.checkForceCompare(i),i&=~(Xt|zt)),this.cpu.data[s.TCCRB]=i,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=i=>{this.checkForceCompare(i)}),e.writeHooks[s.TIFR]=i=>(this.cpu.data[s.TIFR]=i,this.cpu.clearInterruptByFlag(this.OVF,i),this.cpu.clearInterruptByFlag(this.OCFA,i),this.cpu.clearInterruptByFlag(this.OCFB,i),!0),e.writeHooks[s.TIMSK]=i=>{this.cpu.updateInterruptEnable(this.OVF,i),this.cpu.updateInterruptEnable(this.OCFA,i),this.cpu.updateInterruptEnable(this.OCFB,i)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case V:return this.ocrA;case $:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case V:case $:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,i=e.bits===16?He:Ne,a=this.cpu.data[e.TCCRA],[n,o,r,l,C]=i[s];this.timerMode=n,this.topValue=o,this.ocrUpdateMode=r,this.tovUpdateMode=l;let d=n===O||n===v||n===ot,f=this.compA;this.compA=a>>6&3,this.compA===1&&d&&!(C&q)&&(this.compA=0),!!f!=!!this.compA&&this.updateCompA(this.compA?T.Enable:T.None);let c=this.compB;if(this.compB=a>>4&3,this.compB===1&&d&&(this.compB=0),!!c!=!!this.compB&&this.updateCompB(this.compB?T.Enable:T.None),this.hasOCRC){let g=this.compC;this.compC=a>>2&3,this.compC===1&&d&&(this.compC=0),!!g!=!!this.compC&&this.updateCompC(this.compC?T.Enable:T.None)}}phasePwmCount(e,s){let{ocrA:i,ocrB:a,ocrC:n,hasOCRC:o,TOP:r,MAX:l,tcntUpdated:C}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===m.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!C&&(this.countingUp=!1,this.ocrUpdateMode===m.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!C&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===m.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),C||(e===i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===a&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),o&&e===n&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&l}timerUpdated(e,s){let{ocrA:i,ocrB:a,ocrC:n,hasOCRC:o}=this,r=s>e;((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),o&&((s<n||r)&&e>=n||s<n&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==J.FastPWM||this.timerMode==J.PWMPhaseCorrect||this.timerMode==J.PWMPhaseFrequencyCorrect||(e&Xt&&this.updateCompPin(this.compA,"A"),e&zt&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ke&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,i=!1){let a=T.None,n=e===3,o=this.countingUp===n;switch(this.timerMode){case Dt:case Ct:a=Le(e);break;case O:e===1?a=i?T.None:T.Toggle:a=n!==i?T.Set:T.Clear;break;case v:case ot:e===1?a=T.Toggle:a=o?T.Set:T.Clear;break}a!==T.None&&(s==="A"?this.updateCompA(a):s==="B"?this.updateCompB(a):this.updateCompC(a))}updateCompA(e){let{compPortA:s,compPinA:i}=this.config,a=this.cpu.gpioByPort[s];a?.timerOverridePin(i,e)}updateCompB(e){let{compPortB:s,compPinB:i}=this.config,a=this.cpu.gpioByPort[s];a?.timerOverridePin(i,e)}updateCompC(e){let{compPortC:s,compPinC:i}=this.config,a=this.cpu.gpioByPort[s];a?.timerOverridePin(i,e)}};var Bt={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},qe=128,Ge=64,Jt=32;var kt=2,je=1,Zt=kt,Xe=128,ze=64,$e=32,gt=16,pt=8,ee=4;var Qt=ee|gt|pt;var Je=32,Ze=16,Qe=8,Yt=4,te=2;var Ye={5:31,6:63,7:127,8:255,9:255},ct=class{constructor(e,s,i){this.cpu=e,this.config=s,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:qe,enableRegister:this.config.UCSRB,enableMask:Xe,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Jt,enableRegister:this.config.UCSRB,enableMask:$e},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Ge,enableRegister:this.config.UCSRB,enableMask:ze},this.reset(),this.cpu.writeHooks[s.UCSRA]=(a,n)=>{var o;return e.data[s.UCSRA]=a&(je|kt),e.clearInterruptByFlag(this.TXC,a),(a&Zt)!==(n&Zt)&&((o=this.onConfigurationChange)===null||o===void 0||o.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(a,n)=>{var o;return e.updateInterruptEnable(this.RXC,a),e.updateInterruptEnable(this.UDRE,a),e.updateInterruptEnable(this.TXC,a),a&gt&&n&gt&&e.clearInterrupt(this.RXC),a&pt&&!(n&pt)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=a,(a&Qt)!==(n&Qt)&&((o=this.onConfigurationChange)===null||o===void 0||o.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=a=>{var n;return e.data[s.UCSRC]=a,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var a;let n=(a=Ye[this.bitsPerChar])!==null&&a!==void 0?a:255,o=this.rxByte&n;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),o},this.cpu.writeHooks[s.UDR]=a=>{if(this.onByteTransmit&&this.onByteTransmit(a),this.onLineTransmit){let n=String.fromCharCode(a);n===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=n}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=a=>{var n;return this.cpu.data[s.UBRRH]=a,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.writeHooks[s.UBRRL]=a=>{var n;return this.cpu.data[s.UBRRL]=a,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Jt,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Yt|te,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var i;let{cpu:a}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,a.setInterruptFlag(this.RXC),(i=this.onRxComplete)===null||i===void 0||i.call(this);else return this.rxBusyValue=!0,a.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&kt?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&gt)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&pt)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Yt|te))>>1|this.cpu.data[this.config.UCSRB]&ee){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&Qe?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Je)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&Ze)}};function se(t){let e=new Uint8Array(32768),s=0,i=!1;for(let[a,n]of String(t).split(/\\r?\\n/).entries()){let o=n.trim();if(!o)continue;if(!/^:([0-9a-f]{2})+$/i.test(o))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${a+1}).`);let r=o.slice(1).match(/../g).map(g=>parseInt(g,16));if(r.reduce((g,R)=>g+R,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let[l,C,d,f]=r,c=r.slice(4,4+l);if(f===0){let g=s+(C<<8|d);if(g+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(c,g)}else if(f===1){i=!0;break}else f===2?s=(c[0]<<8|c[1])<<4:f===4&&(s=(c[0]<<8|c[1])<<16)}if(!i)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var Z=16e6,ts=[[F,["D0","D1","D2","D3","D4","D5","D6","D7"]],[K,["D8","D9","D10","D11","D12","D13"]],[At,["A0","A1","A2","A3","A4","A5"]]];function ie(t){let e=new et(se(t));[Et,Ut,yt].forEach(f=>new rt(e,f));let s=new ct(e,Bt,Z),i=new it(e,It),a=ts.map(([f,c])=>[new at(e,f),c]),n=[],o=[],r=[],l=C();function C(){let f={};for(let[c,g]of a)g.forEach((R,w)=>f[R]=c.pinState(w));return f}for(let[f]of a)f.addListener(()=>{let c=C(),g={};for(let R in c)c[R]!==l[R]&&(g[R]=c[R]);l=c,Object.keys(g).length&&n.forEach(R=>R(g,c))});s.onByteTransmit=f=>o.forEach(c=>c(f));function d(f){let c=e.cycles+f;for(;e.cycles<c;){let g=Math.min(c,e.cycles+Z/1e3);for(;e.cycles<g;)St(e),e.tick();r.length&&!s.rxBusy&&(s.writeByte(r[0]),r.shift())}}return{correr:d,estados:C,get ciclos(){return e.cycles},alCambiarPines:f=>n.push(f),alByteSerial:f=>o.push(f),enviarSerial:f=>r.push(...new TextEncoder().encode(f)),ponerAnalogico:(f,c)=>i.channelValues[f]=Math.max(0,Math.min(5,c))}}var es=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function ae(t){let e=new Map,s=a=>{for(e.has(a)||e.set(a,a);e.get(a)!==a;)e.set(a,e.get(e.get(a))),a=e.get(a);return a},i=(a,n)=>e.set(s(a),s(n));for(let a of es)a.forEach(n=>i("placa."+a[0],"placa."+n));for(let a of t.cables)i(a.de,a.a);return s}function bt(t,e,s,i){e>=0&&(t[e][e]+=i),s>=0&&(t[s][s]+=i),e>=0&&s>=0&&(t[e][s]-=i,t[s][e]-=i)}function Mt(t,e,s){e>=0&&(t[e]+=s)}var G=(t,e)=>e>=0?t[e]:0;function lt(t,e,s){return{a:t,b:e,g:1/s,sellar(i){bt(i,this.a,this.b,this.g)},corriente(i){return(G(i,this.a)-G(i,this.b))*this.g}}}function ne(t){return{nodo:t,v:0,g:0,sellar(e,s){bt(e,this.nodo,-1,this.g),Mt(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-G(e,this.nodo))*this.g}}}function oe(t,e){return{nodo:t,v:e,fila:-1,sellar(s,i){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,i[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function re(t,e,{Is:s,n:i}){let a=i*.025693,n=a*Math.log(a/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(o,r){let l=Math.exp(this.vd/a),C=s*(l-1),d=s*l/a+1e-12,f=C-d*this.vd;bt(o,this.a,this.k,d),Mt(r,this.a,-f),Mt(r,this.k,f)},actualizar(o){let r=G(o,this.a)-G(o,this.k),l=Math.abs(r-this.vd);return this.vd=ss(r,this.vd,a,n),l},corriente(o){let r=G(o,this.a)-G(o,this.k);return s*Math.expm1(r/a)}}}function ss(t,e,s,i){if(t>i&&Math.abs(t-e)>2*s){if(e>0){let a=1+(t-e)/s;return a>0?e+s*Math.log(a):i}return s*Math.log(t/s)}return t}function ce(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let i=t.nodos+t.fuentes,a=t.elementos.filter(o=>o.noLineal),n=new Float64Array(i);for(let o=1;o<=e;o++){let r=Array.from({length:i},()=>new Float64Array(i)),l=new Float64Array(i);for(let d of t.elementos)d.sellar(r,l);for(let d=0;d<t.nodos;d++)r[d][d]+=1e-12;if(n=is(r,l),!a.length)return{x:n,iteraciones:o,convergio:!0};let C=0;for(let d of a)C=Math.max(C,d.actualizar(n));if(C<s)return{x:n,iteraciones:o,convergio:!0}}return{x:n,iteraciones:e,convergio:!1}}function is(t,e){let s=e.length;for(let a=0;a<s;a++){let n=a;for(let o=a+1;o<s;o++)Math.abs(t[o][a])>Math.abs(t[n][a])&&(n=o);if(Math.abs(t[n][a])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[a],t[n]]=[t[n],t[a]],[e[a],e[n]]=[e[n],e[a]];for(let o=a+1;o<s;o++){let r=t[o][a]/t[a][a];if(r){for(let l=a;l<s;l++)t[o][l]-=r*t[a][l];e[o]-=r*e[a]}}}let i=new Float64Array(s);for(let a=s-1;a>=0;a--){let n=e[a];for(let o=a+1;o<s;o++)n-=t[a][o]*i[o];i[a]=n/t[a][a]}return i}var j={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},ns=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],os={A4:"SDA",A5:"SCL"},B={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},rs=.25,le={minimo:1};function cs(t){let s=(B.vf[t]||B.vf.rojo)-B.iRef*B.rs;return{Is:B.iRef/Math.expm1(s/(B.n*.025693)),n:B.n}}var ls={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"]};function he(t,{quemados:e=new Set}={}){let s=ae(t),i=s("placa.GND1"),a=new Map,n=0,o=h=>{let p=s(h);return p===i?-1:(a.has(p)||a.set(p,n++),a.get(p))},r=h=>s(h)===i?-1:a.get(s(h)),l=[],C=[],d=[],f=new Set(t.cables.flatMap(h=>[h.de,h.a])),c=new Map;for(let[h,p]of[["5V",5],["3V3",3.3]]){if(!f.has("placa."+h))continue;let A=o("placa."+h),E=A===-1?"GND":c.get(A);if(E){d.push({tipo:"cortocircuito",componente:"placa."+h,mensaje:`El pin ${h} est\\xE1 unido directo a ${E}: es un cortocircuito.`});continue}c.set(A,h);let x=oe(A,p);C.push(x),l.push(x)}let g={};for(let h of ns)!f.has("placa."+h)&&!f.has("placa."+os[h])||(g[h]=ne(o("placa."+h)),l.push(g[h]));let R=[],w=[],S=[];for(let h of t.componentes)if(h.tipo==="resistencia"){let p=lt(o(h.id+".1"),o(h.id+".2"),Number(h.props.ohmios)||1);R.push({id:h.id,ohmios:Number(h.props.ohmios)||1,el:p}),p.a!==p.b&&l.push(p)}else if(h.tipo==="led"){let p=o(h.id+".anodo"),A=o(h.id+".catodo"),E={id:h.id,a:p,k:A,quemado:e.has(h.id)};if(!E.quemado&&p!==A){let x=n++;E.rs=lt(p,x,B.rs),E.diodo=re(x,A,cs(h.props.color)),l.push(E.rs,E.diodo)}w.push(E)}else if(h.tipo==="potenciometro"){let p=Number(h.props.ohmios)||1e4,A=Math.max(0,Math.min(1,Number(h.props.posicion))),E=o(h.id+".GND"),x=o(h.id+".SIG"),P=o(h.id+".VCC"),X=lt(E,x,Math.max(le.minimo,p*A)),Y=lt(x,P,Math.max(le.minimo,p*(1-A)));for(let H of[X,Y])H.a!==H.b&&l.push(H);S.push({id:h.id,ohmios:p,posicion:A,bajo:X,alto:Y})}return C.forEach((h,p)=>h.fila=n+p),{fallasFijas:d,ponerPines(h){for(let[p,A]of Object.entries(g)){let E=h[p];E===k.High?Object.assign(A,{v:j.voltios,g:1/j.rAlto}):E===k.Low?Object.assign(A,{v:0,g:1/j.rBajo}):E===k.InputPullUp?Object.assign(A,{v:j.voltios,g:1/j.rPullUp}):Object.assign(A,{v:0,g:0})}},resolver(){let h=ce({nodos:n,fuentes:C.length,elementos:l}),p=x=>{let P=r(x);return P===void 0?null:P<0?0:h.x[P]},A={};for(let x of f)A[x]=p(x);for(let x of t.componentes)for(let P of ls[x.tipo]||[])A[x.id+"."+P]=p(x.id+"."+P);let E=(x,P)=>x===null||P===null?null:x-P;return{convergio:h.convergio,iteraciones:h.iteraciones,voltajes:A,leds:w.map(x=>{let P=x.diodo?x.diodo.corriente(h.x):0;return{id:x.id,quemado:x.quemado,v:E(p(x.id+".anodo"),p(x.id+".catodo")),i:P,brillo:Math.max(0,Math.min(1,P*1e3/B.plenomA))}}),resistencias:R.map(x=>{let P=x.el.a===x.el.b?0:x.el.corriente(h.x);return{id:x.id,ohmios:x.ohmios,v:E(p(x.id+".1"),p(x.id+".2")),i:P,w:P*P*x.ohmios}}),pines:Object.entries(g).filter(([,x])=>x.g>0).map(([x,P])=>({pin:x,v:p("placa."+x),i:P.corriente(h.x)})),fuentes:C.map(x=>({pin:x.v===5?"5V":"3V3",i:x.corriente(h.x)})),potenciometros:S.map(x=>({id:x.id,ohmios:x.ohmios,posicion:x.posicion,v:E(p(x.id+".SIG"),p(x.id+".GND")),i:Math.abs(x.bajo.a!==x.bajo.b?x.bajo.corriente(h.x):x.alto.a!==x.alto.b?x.alto.corriente(h.x):0)}))}}}}function fe(t,e){let s=a=>(Math.abs(a)*1e3).toFixed(0),i=[];if(e.danoComponentes){for(let a of t.leds)!a.quemado&&a.i*1e3>B.quemamA&&i.push({tipo:"led_quemado",componente:a.id,corriente_mA:+(a.i*1e3).toFixed(1),mensaje:`El LED ${a.id} se quem\\xF3: le pasaron ${s(a.i)} mA y aguanta unos ${B.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let a of t.resistencias)a.w>rs&&i.push({tipo:"resistencia_caliente",componente:a.id,potencia_W:+a.w.toFixed(2),mensaje:`La resistencia ${a.id} se calienta: disipa ${a.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let a of t.pines)if(Math.abs(a.i)*1e3>j.maxmA){let n=a.pin.startsWith("D")?"pin "+a.pin.slice(1):"pin "+a.pin;i.push({tipo:"corriente_pin",componente:"placa."+a.pin,corriente_mA:+(Math.abs(a.i)*1e3).toFixed(1),mensaje:`El ${n} entrega ${s(a.i)} mA y aguanta ${j.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return i}var hs=60,fs=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]];function de({hex:t,circuito:e,activas:s={}}){let i=null,a=e,n=null,o=new Map,r=new Map,l=new Map,C=[],d="",f=0,c={inicio:0,clave:""},g=null,R=null,w=0,S=0,h=[],p=new TextDecoder("utf-8"),A=new Set,E=new Set,x=[],P=[],X=()=>i.ciclos/Z*1e3,Y=u=>{let U="";for(let M in u)U+=u[M];return U};function H(){i=ie(t);let u=i.estados();d=Y(u),r.set(d,u),f=0,l=new Map,C=[],c={inicio:0,clave:d},g=null,i.alCambiarPines((U,M)=>{Wt(),d=Y(M),r.has(d)||r.set(d,M),d===c.clave&&(g={tiempos:new Map(l),ciclo:i.ciclos})}),i.alByteSerial(U=>{h.push(U),S=X()+hs})}function Wt(){let u=i.ciclos;l.set(d,(l.get(d)||0)+(u-f)),f=u}function ft(){n=he(a,{quemados:A}),o=new Map}function Ft(u){let U=u.tipo+"|"+u.componente;return E.has(U)?!1:(E.add(U),x.push(u),P.push(u),!0)}function me(u){for(let U=0;U<4;U++){let M=o.get(u);if(M)return M;n.ponerPines(r.get(u));let D=null;try{D=n.resolver()}catch{D=null}if(w++,!D||!D.convergio)return Ft({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;o.set(u,D);let dt=!1;for(let tt of[...n.fallasFijas,...fe(D,s)])Ft(tt)&&tt.tipo==="led_quemado"&&(A.add(tt.componente),dt=!0);if(!dt)return D;ft()}return o.get(u)||null}function ue(){Wt();let u=l;if(g&&g.ciclo>c.inicio){u=g.tiempos;let _=new Map;for(let[z,xt]of l){let Vt=xt-(g.tiempos.get(z)||0);Vt>0&&_.set(z,Vt)}l=_,c={inicio:g.ciclo,clave:c.clave}}else l=new Map,c={inicio:i.ciclos,clave:d};g=null;let U=[...u].filter(([,_])=>_>0);U.length||(U=C.length?C:[[d,1]]),C=U;let M=U.reduce((_,[,z])=>_+z,0),D=[];for(let[_,z]of U){let xt=me(_);if(!xt){D.length=0;break}D.push([xt,z/M])}R=D.length?Cs(D):null,R&&(R.pwm=ds(U,M)),Se();let dt=i.estados(),tt=h.length?p.decode(Uint8Array.from(h),{stream:!0}):"";h=[];let Ie=P;return P=[],{msSimulados:X(),evaluaciones:w,leds:Object.fromEntries((R?R.leds:[]).map(_=>[_.id,_.brillo])),quemados:[...A],voltajes:R?R.voltajes:{},placa:{led13:dt.D13===k.High,ledTX:X()<S},serial:tt,fallas:Ie,medicion:R}}function Se(){R&&fs.forEach((u,U)=>{for(let M of u){let D=R.voltajes["placa."+M];if(typeof D=="number")return i.ponerAnalogico(U,D)}})}function Te(){A.clear(),E.clear(),x.length=0,P=[],h=[],p=new TextDecoder("utf-8"),S=0,H(),ft()}return H(),ft(),{get ciclos(){return i.ciclos},avanzar:u=>i.correr(u),foto:ue,ponerCircuito(u){a=u,ft()},enviarSerial:u=>i.enviarSerial(String(u)),reiniciarChip:()=>H(),reiniciarTodo:Te,fallas:()=>[...x]}}function ds(t,e){if(t.length<2)return{};let s={},i=new Set;for(let[o,r]of t)for(let l=0;l<o.length;l++){let C=+o[l]===k.High;s[l]=(s[l]||0)+(C?r:0),i.add(l)}let a=xs,n={};for(let o of i){let r=s[o]/e;r>0&&r<1&&(n[a[o]]=Math.round(r*1e3)/1e3)}return n}var xs=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"];function Cs(t){if(t.length===1)return t[0][0];let e=t[0][0],s=o=>o.reduce((r,[,l])=>r+l,0),i=o=>{let r=0;for(let[l,C]of t){let d=o(l);if(d==null)return null;r+=C*d}return r},a=(o,r,l)=>[...new Set(t.flatMap(([d])=>d[o].map(f=>f[r])))].map(d=>{let f={[r]:d},c=t.filter(([R])=>R[o].some(w=>w[r]===d)),g=s(c);for(let R of l)R==="i"?f.i=t.reduce((w,[S,h])=>w+h*((S[o].find(p=>p[r]===d)||{i:0}).i||0),0):f[R]=g?c.reduce((w,[S,h])=>w+h*(S[o].find(p=>p[r]===d)[R]||0),0)/g:null;return f}),n={};for(let o of Object.keys(e.voltajes))n[o]=i(r=>r.voltajes[o]);return{convergio:t.every(([o])=>o.convergio),iteraciones:Math.max(...t.map(([o])=>o.iteraciones||0)),voltajes:n,leds:e.leds.map((o,r)=>{let l=i(C=>C.leds[r]?C.leds[r].i:0);return{id:o.id,quemado:t.some(([C])=>C.leds[r]&&C.leds[r].quemado),v:i(C=>C.leds[r]?C.leds[r].v:null),i:l,brillo:Math.max(0,Math.min(1,l*1e3/B.plenomA))}}),resistencias:e.resistencias.map((o,r)=>({id:o.id,ohmios:o.ohmios,v:i(l=>l.resistencias[r].v),i:i(l=>l.resistencias[r].i),w:i(l=>l.resistencias[r].w)})),pines:a("pines","pin",["v","i"]),fuentes:a("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((o,r)=>({id:o.id,ohmios:o.ohmios,posicion:o.posicion,v:i(l=>l.potenciometros[r].v),i:i(l=>l.potenciometros[r].i)}))}}var gs=16,ps=8,Rs=50,ms=500,ht=Z/1e3,W=null,Rt=!1,xe=0,N=0,_t=0,Ce=0,Ot=0,vt=!1,Q=[],ge=new MessageChannel;ge.port1.onmessage=pe;function pe(){vt=!1,Ss()}function Re(t){vt||(vt=!0,t>0?setTimeout(pe,t):ge.port2.postMessage(null))}function us(t){for(;Q.length&&t-Q[0][0]>ms;)Q.shift();let e=0,s=0;for(let[,i,a]of Q)e+=i,s+=a;return e>0?Math.min(1,s/(e*ht)):1}function mt(t=performance.now()){Ce=t;let e=W.foto();self.postMessage({tipo:"foto",corrida:xe,...e,velocidad:us(t),msReales:Ot})}function Ss(){if(!Rt||!W)return;let t=performance.now(),e=Math.max(0,t-_t);_t=t,Ot+=e,N=Math.min(N+e*ht,Rs*ht);let s=performance.now(),i=0;for(;N>=1&&performance.now()-s<ps;){let a=W.ciclos;W.avanzar(Math.min(Math.floor(N),ht));let n=W.ciclos-a;N-=n,i+=n}Q.push([t,e,i]),t-Ce>=gs&&mt(t),Re(N>=ht?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(xe=e.corrida),e.tipo){case"crear":W=de({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(W.reiniciarTodo(),Ot=0),Rt=!0,N=0,_t=performance.now(),Q.length=0,mt(),Re(0);break;case"pausar":Rt=!1;break;case"reiniciar":W.reiniciarChip(),N=0,mt();break;case"detener":Rt=!1;break;case"circuito":W.ponerCircuito(e.circuito),e.mostrar&&mt();break;case"serial":W.enviarSerial(e.texto);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function Mo(s={}){let{lienzo:t,hex:e}=s,i=s.placa||"uno";if(i!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof e!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");So(e);let r=s.modo==="ideal"?"ideal":"realista",l=Object.fromEntries(ds.map(y=>[y,r==="realista"]));Object.assign(l,s.noIdealidades||{});let c=typeof s.alEvento=="function"?s.alEvento:null,d={serial:[],falla:[],estado:[]},u="detenido",m=!0,v=0,b=null,S=0,g={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},D=null,q=[],j=us(st);j.enviar({tipo:"crear",hex:e,circuito:t.circuito(),activas:l});function st(y){if(m){if(y.tipo==="error")return console.error("TecnoCircuito:",y.mensaje);if(!(y.tipo!=="foto"||y.corrida!==v||u==="detenido")){Object.assign(g,{msSimulados:y.msSimulados,msReales:y.msReales,velocidad:y.velocidad,evaluaciones:y.evaluaciones}),D=y.medicion;for(let x of y.fallas){q.push(x),d.falla.forEach(w=>it(w,{tipo:x.tipo,componente:x.componente,mensaje:x.mensaje}));let{mensaje:k,...nt}=x;rt("falla",nt)}y.serial&&d.serial.forEach(x=>it(x,y.serial)),b=y,S||(S=requestAnimationFrame(yt))}}}function yt(){if(S=0,u==="detenido"||!b)return t._mostrar({});t._mostrar({leds:b.leds,quemados:b.quemados,voltajes:b.voltajes,placa:{ledPower:!0,led13:b.placa.led13,ledTX:b.placa.ledTX}})}function it(y,x){try{y(x)}catch(k){console.error(k)}}function rt(y,x){c&&it(c,{t:Date.now(),origen:"simulador",tipo:y,datos:x})}function V(y){u=y,d.estado.forEach(x=>it(x,y))}return t.alCambiar(y=>{m&&j.enviar({tipo:"circuito",circuito:y,mostrar:u!=="detenido",corrida:v})}),{iniciar(){if(!m||u==="corriendo")return;let y=u==="detenido";v++,y&&(q.length=0,D=null,b=null,Object.assign(g,{msSimulados:0,msReales:0,velocidad:1}),rt("simulacion_iniciada",{placa:i,modo:r})),V("corriendo"),j.enviar({tipo:"iniciar",nuevo:y,corrida:v})},pausar(){u==="corriendo"&&(v++,j.enviar({tipo:"pausar",corrida:v}),V("pausado"))},reiniciar(){!m||u==="detenido"||(v++,g.msSimulados=0,j.enviar({tipo:"reiniciar",corrida:v}),j.enviar({tipo:"iniciar",nuevo:!1,corrida:v}),V("reiniciado"),V("corriendo"))},detener(){u!=="detenido"&&(v++,j.enviar({tipo:"detener",corrida:v}),rt("simulacion_detenida",{ms_simulados:Math.round(g.msSimulados)}),V("detenido"),D=null,yt())},serialEnviar(y){u!=="detenido"&&j.enviar({tipo:"serial",texto:String(y)})},alSerial:y=>typeof y=="function"&&d.serial.push(y),alFalla:y=>typeof y=="function"&&d.falla.push(y),alEstado:y=>typeof y=="function"&&d.estado.push(y),_medidas:()=>({...g,estado:u,hilo:j.hilo()}),_mediciones:()=>u==="detenido"||!D?null:{...D,fallas:[...q],modo:r,activas:l},_destruir(){this.detener(),m=!1,j.terminar()}}}function us(s){let t=null,e="worker",i=!1,r=[],l=d=>{if(d&&d.tipo==="listo"){i=!0,r.length=0;return}s(d)};function c(){e="pagina",t=hs(l),r.splice(0).forEach(d=>t.postMessage(d))}try{if(!Ce||typeof Worker!="function")throw new Error("sin Worker");let d=URL.createObjectURL(new Blob([Ce],{type:"text/javascript"})),u=new Worker(d);u.onmessage=m=>{m.data&&m.data.tipo==="listo"&&URL.revokeObjectURL(d),l(m.data)},u.onerror=m=>{if(i)return console.error("TecnoCircuito:",m.message);m.preventDefault(),u.terminate(),c()},t=u}catch{c()}return{enviar(d){!i&&e==="worker"&&r.push(d),t.postMessage(d)},terminar:()=>t&&t.terminate(),hilo:()=>e}}function hs(s){let t={onmessage:null,postMessage:e=>setTimeout(()=>s(e))};return new Function("self",Ce)(t),{postMessage:e=>setTimeout(()=>t.onmessage&&t.onmessage({data:e})),terminate:()=>t.onmessage=null}}window.TecnoCircuito=Object.freeze({VERSION:"0.0.4-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(vt)),crearLienzo:Co,crearSimulador:Mo});})();
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
