(()=>{var yo=globalThis,Co=yo.ShadowRoot&&(yo.ShadyCSS===void 0||yo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zo=Symbol(),wi=new WeakMap,Oe=class{constructor(t,s,i){if(this._$cssResult$=!0,i!==Zo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=s}get styleSheet(){let t=this.o,s=this.t;if(Co&&t===void 0){let i=s!==void 0&&s.length===1;i&&(t=wi.get(s)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&wi.set(s,t))}return t}toString(){return this.cssText}},Ri=e=>new Oe(typeof e=="string"?e:e+"",void 0,Zo),bt=(e,...t)=>{let s=e.length===1?e[0]:t.reduce((i,r,l)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[l+1],e[0]);return new Oe(s,e,Zo)},$i=(e,t)=>{if(Co)e.adoptedStyleSheets=t.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of t){let i=document.createElement("style"),r=yo.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=s.cssText,e.appendChild(i)}},Qo=Co?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let s="";for(let i of t.cssRules)s+=i.cssText;return Ri(s)})(e):e;var{is:fr,defineProperty:hr,getOwnPropertyDescriptor:pr,getOwnPropertyNames:ur,getOwnPropertySymbols:mr,getPrototypeOf:xr}=Object,vo=globalThis,Ai=vo.trustedTypes,gr=Ai?Ai.emptyScript:"",br=vo.reactiveElementPolyfillSupport,Ue=(e,t)=>e,Be={toAttribute(e,t){switch(t){case Boolean:e=e?gr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=e!==null;break;case Number:s=e===null?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch{s=null}}return s}},So=(e,t)=>!fr(e,t),Ei={attribute:!0,type:String,converter:Be,reflect:!1,useDefault:!1,hasChanged:So};Symbol.metadata??=Symbol("metadata"),vo.litPropertyMetadata??=new WeakMap;var It=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=Ei){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,s);r!==void 0&&hr(this.prototype,t,r)}}static getPropertyDescriptor(t,s,i){let{get:r,set:l}=pr(this.prototype,t)??{get(){return this[s]},set(n){this[s]=n}};return{get:r,set(n){let h=r?.call(this);l?.call(this,n),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ei}static _$Ei(){if(this.hasOwnProperty(Ue("elementProperties")))return;let t=xr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ue("properties"))){let s=this.properties,i=[...ur(s),...mr(s)];for(let r of i)this.createProperty(r,s[r])}let t=this[Symbol.metadata];if(t!==null){let s=litPropertyMetadata.get(t);if(s!==void 0)for(let[i,r]of s)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[s,i]of this.elementProperties){let r=this._$Eu(s,i);r!==void 0&&this._$Eh.set(r,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let s=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)s.unshift(Qo(r))}else t!==void 0&&s.push(Qo(t));return s}static _$Eu(t,s){let i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,s=this.constructor.elementProperties;for(let i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $i(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let l=(i.converter?.toAttribute!==void 0?i.converter:Be).toAttribute(s,i.type);this._$Em=t,l==null?this.removeAttribute(r):this.setAttribute(r,l),this._$Em=null}}_$AK(t,s){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let l=i.getPropertyOptions(r),n=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:Be;this._$Em=r;let h=n.fromAttribute(s,l.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,s,i,r=!1,l){if(t!==void 0){let n=this.constructor;if(r===!1&&(l=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??So)(l,s)||i.useDefault&&i.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:r,wrapped:l},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??s??this[t]),l!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,l]of i){let{wrapped:n}=l,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,l,h)}}let t=!1,s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(s)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(t){}firstUpdated(t){}};It.elementStyles=[],It.shadowRootOptions={mode:"open"},It[Ue("elementProperties")]=new Map,It[Ue("finalized")]=new Map,br?.({ReactiveElement:It}),(vo.reactiveElementVersions??=[]).push("2.1.2");var rs=globalThis,_i=e=>e,wo=rs.trustedTypes,Pi=wo?wo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Oi="$lit$",Ft=`lit$${Math.random().toFixed(9).slice(2)}$`,Ui="?"+Ft,yr=`<${Ui}>`,Qt=document,Ne=()=>Qt.createComment(""),Le=e=>e===null||typeof e!="object"&&typeof e!="function",ns=Array.isArray,Cr=e=>ns(e)||typeof e?.[Symbol.iterator]=="function",ts=`[ 	
\f\r]`,Ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ti=/-->/g,Mi=/>/g,Jt=RegExp(`>|${ts}(?:([^\\s"'>=/]+)(${ts}*=${ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ii=/'/g,ki=/"/g,Bi=/^(?:script|style|textarea|title)$/i,cs=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),dt=cs(1),Dt=cs(2),vn=cs(3),kt=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Di=new WeakMap,Zt=Qt.createTreeWalker(Qt,129);function Vi(e,t){if(!ns(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pi!==void 0?Pi.createHTML(t):t}var vr=(e,t)=>{let s=e.length-1,i=[],r,l=t===2?"<svg>":t===3?"<math>":"",n=Ve;for(let h=0;h<s;h++){let d=e[h],u,x,C=-1,v=0;for(;v<d.length&&(n.lastIndex=v,x=n.exec(d),x!==null);)v=n.lastIndex,n===Ve?x[1]==="!--"?n=Ti:x[1]!==void 0?n=Mi:x[2]!==void 0?(Bi.test(x[2])&&(r=RegExp("</"+x[2],"g")),n=Jt):x[3]!==void 0&&(n=Jt):n===Jt?x[0]===">"?(n=r??Ve,C=-1):x[1]===void 0?C=-2:(C=n.lastIndex-x[2].length,u=x[1],n=x[3]===void 0?Jt:x[3]==='"'?ki:Ii):n===ki||n===Ii?n=Jt:n===Ti||n===Mi?n=Ve:(n=Jt,r=void 0);let _=n===Jt&&e[h+1].startsWith("/>")?" ":"";l+=n===Ve?d+yr:C>=0?(i.push(u),d.slice(0,C)+Oi+d.slice(C)+Ft+_):d+Ft+(C===-2?h:_)}return[Vi(e,l+(e[s]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},je=class e{constructor({strings:t,_$litType$:s},i){let r;this.parts=[];let l=0,n=0,h=t.length-1,d=this.parts,[u,x]=vr(t,s);if(this.el=e.createElement(u,i),Zt.currentNode=this.el.content,s===2||s===3){let C=this.el.content.firstChild;C.replaceWith(...C.childNodes)}for(;(r=Zt.nextNode())!==null&&d.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let C of r.getAttributeNames())if(C.endsWith(Oi)){let v=x[n++],_=r.getAttribute(C).split(Ft),b=/([.?@])?(.*)/.exec(v);d.push({type:1,index:l,name:b[2],strings:_,ctor:b[1]==="."?os:b[1]==="?"?ss:b[1]==="@"?is:xe}),r.removeAttribute(C)}else C.startsWith(Ft)&&(d.push({type:6,index:l}),r.removeAttribute(C));if(Bi.test(r.tagName)){let C=r.textContent.split(Ft),v=C.length-1;if(v>0){r.textContent=wo?wo.emptyScript:"";for(let _=0;_<v;_++)r.append(C[_],Ne()),Zt.nextNode(),d.push({type:2,index:++l});r.append(C[v],Ne())}}}else if(r.nodeType===8)if(r.data===Ui)d.push({type:2,index:l});else{let C=-1;for(;(C=r.data.indexOf(Ft,C+1))!==-1;)d.push({type:7,index:l}),C+=Ft.length-1}l++}}static createElement(t,s){let i=Qt.createElement("template");return i.innerHTML=t,i}};function me(e,t,s=e,i){if(t===kt)return t;let r=i!==void 0?s._$Co?.[i]:s._$Cl,l=Le(t)?void 0:t._$litDirective$;return r?.constructor!==l&&(r?._$AO?.(!1),l===void 0?r=void 0:(r=new l(e),r._$AT(e,s,i)),i!==void 0?(s._$Co??=[])[i]=r:s._$Cl=r),r!==void 0&&(t=me(e,r._$AS(e,t.values),r,i)),t}var es=class{constructor(t,s){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:s},parts:i}=this._$AD,r=(t?.creationScope??Qt).importNode(s,!0);Zt.currentNode=r;let l=Zt.nextNode(),n=0,h=0,d=i[0];for(;d!==void 0;){if(n===d.index){let u;d.type===2?u=new We(l,l.nextSibling,this,t):d.type===1?u=new d.ctor(l,d.name,d.strings,this,t):d.type===6&&(u=new as(l,this,t)),this._$AV.push(u),d=i[++h]}n!==d?.index&&(l=Zt.nextNode(),n++)}return Zt.currentNode=Qt,r}p(t){let s=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,s),s+=i.strings.length-2):i._$AI(t[s])),s++}},We=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,s,i,r){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=s,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,s=this._$AM;return s!==void 0&&t?.nodeType===11&&(t=s.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,s=this){t=me(this,t,s),Le(t)?t===Y||t==null||t===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==kt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&Le(this._$AH)?this._$AA.nextSibling.data=t:this.T(Qt.createTextNode(t)),this._$AH=t}$(t){let{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=je.createElement(Vi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(s);else{let l=new es(r,this),n=l.u(this.options);l.p(s),this.T(n),this._$AH=l}}_$AC(t){let s=Di.get(t.strings);return s===void 0&&Di.set(t.strings,s=new je(t)),s}k(t){ns(this._$AH)||(this._$AH=[],this._$AR());let s=this._$AH,i,r=0;for(let l of t)r===s.length?s.push(i=new e(this.O(Ne()),this.O(Ne()),this,this.options)):i=s[r],i._$AI(l),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){let i=_i(t).nextSibling;_i(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},xe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,s,i,r,l){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=s,this._$AM=r,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,s=this,i,r){let l=this.strings,n=!1;if(l===void 0)t=me(this,t,s,0),n=!Le(t)||t!==this._$AH&&t!==kt,n&&(this._$AH=t);else{let h=t,d,u;for(t=l[0],d=0;d<l.length-1;d++)u=me(this,h[i+d],s,d),u===kt&&(u=this._$AH[d]),n||=!Le(u)||u!==this._$AH[d],u===Y?t=Y:t!==Y&&(t+=(u??"")+l[d+1]),this._$AH[d]=u}n&&!r&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends xe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}},ss=class extends xe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}},is=class extends xe{constructor(t,s,i,r,l){super(t,s,i,r,l),this.type=5}_$AI(t,s=this){if((t=me(this,t,s,0)??Y)===kt)return;let i=this._$AH,r=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,l=t!==Y&&(i===Y||r);r&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},as=class{constructor(t,s,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){me(this,t)}};var Sr=rs.litHtmlPolyfillSupport;Sr?.(je,We),(rs.litHtmlVersions??=[]).push("3.3.3");var Ni=(e,t,s)=>{let i=s?.renderBefore??t,r=i._$litPart$;if(r===void 0){let l=s?.renderBefore??null;i._$litPart$=r=new We(t.insertBefore(Ne(),l),l,void 0,s??{})}return r._$AI(e),r};var ls=globalThis,tt=class extends It{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ni(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return kt}};tt._$litElement$=!0,tt.finalized=!0,ls.litElementHydrateSupport?.({LitElement:tt});var wr=ls.litElementPolyfillSupport;wr?.({LitElement:tt});(ls.litElementVersions??=[]).push("4.2.2");var $t=e=>(t,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var Rr={attribute:!0,type:String,converter:Be,reflect:!1,hasChanged:So},$r=(e=Rr,t,s)=>{let{kind:i,metadata:r}=s,l=globalThis.litPropertyMetadata.get(r);if(l===void 0&&globalThis.litPropertyMetadata.set(r,l=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),l.set(s.name,e),i==="accessor"){let{name:n}=s;return{set(h){let d=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,d,e,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,e,h),h}}}if(i==="setter"){let{name:n}=s;return function(h){let d=this[n];t.call(this,h),this.requestUpdate(n,d,e,!0,h)}}throw Error("Unsupported decorator location: "+i)};function V(e){return(t,s)=>typeof s=="object"?$r(e,t,s):((i,r,l)=>{let n=r.hasOwnProperty(l);return r.constructor.createProperty(l,i),n?Object.getOwnPropertyDescriptor(r,l):void 0})(e,t,s)}var te=(e,t,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,s),s);function Li(e,t){return(s,i,r)=>{let l=n=>n.renderRoot?.querySelector(e)??null;if(t){let{get:n,set:h}=typeof i=="object"?s:r??(()=>{let d=Symbol();return{get(){return this[d]},set(u){this[d]=u}}})();return te(s,i,{get(){let d=n.call(this);return d===void 0&&(d=l(this),(d!==null||this.hasUpdated)&&h.call(this,d)),d}})}return te(s,i,{get(){return l(this)}})}}var ji=Dt`
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
`;var yt=e=>({type:"analog",channel:e}),Fe=(e,t=0)=>({type:"i2c",signal:e,bus:t}),ze=(e,t=0)=>({type:"spi",signal:e,bus:t}),ds=(e,t=0)=>({type:"usart",signal:e,bus:t});var ge=[" ","Spacebar"];function Ar(){return typeof navigator=="object"?navigator.userAgent:""}function Er(){return Ar().indexOf("Macintosh")>=0}function Wi(e){return Er()?e.metaKey:e.ctrlKey}var ee=function(e,t,s,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(e,t,s,i);else for(var h=e.length-1;h>=0;h--)(n=e[h])&&(l=(r<3?n(l):r>3?n(t,s,l):n(t,s))||l);return r>3&&l&&Object.defineProperty(t,s,l),l},zt=class extends tt{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[yt(5),Fe("SCL")]},{name:"A4.2",x:97,y:9,signals:[yt(4),Fe("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[ze("SCK")]},{name:"12",x:134.5,y:9,signals:[ze("MISO")]},{name:"11",x:144,y:9,signals:[ze("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[ze("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[ds("TX")]},{name:"0",x:255.5,y:9,signals:[ds("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[yt(0)]},{name:"A1",x:217.5,y:191.5,signals:[yt(1)]},{name:"A2",x:227,y:191.5,signals:[yt(2)]},{name:"A3",x:236.5,y:191.5,signals:[yt(3)]},{name:"A4",x:246,y:191.5,signals:[yt(4),Fe("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[yt(5),Fe("SCL")]}]}static get styles(){return bt`
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
    `}render(){let{ledPower:t,led13:s,ledRX:i,ledTX:r}=this;return dt`
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

        ${ji}

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
          @keydown=${l=>ge.includes(l.key)&&this.down()}
          @keyup=${l=>ge.includes(l.key)&&this.up()}
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
          ${t&&Dt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${s&&Dt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${r&&Dt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${i&&Dt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};ee([V()],zt.prototype,"led13",void 0);ee([V()],zt.prototype,"ledRX",void 0);ee([V()],zt.prototype,"ledTX",void 0);ee([V()],zt.prototype,"ledPower",void 0);ee([V()],zt.prototype,"resetPressed",void 0);ee([Li("#reset-button")],zt.prototype,"resetButton",void 0);zt=ee([$t("wokwi-arduino-uno")],zt);var Fi=function(e,t,s,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(e,t,s,i);else for(var h=e.length-1;h>=0;h--)(n=e[h])&&(l=(r<3?n(l):r>3?n(t,s,l):n(t,s))||l);return r>3&&l&&Object.defineProperty(t,s,l),l},fs={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},hs=class extends tt{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return bt`
      :host {
        display: flex;
      }
    `}breakValue(t){let s=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,i=Math.round(t/10**s);return t===0?[0,0]:[Math.round(i%100),s]}render(){let{value:t}=this,s=parseFloat(t),[i,r]=this.breakValue(s),l=fs[Math.floor(i/10)],n=fs[i%10],h=fs[r];return dt`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${n}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${h}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};Fi([V()],hs.prototype,"value",void 0);hs=Fi([$t("wokwi-resistor")],hs);var oe=function(e,t,s,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(e,t,s,i);else for(var h=e.length-1;h>=0;h--)(n=e[h])&&(l=(r<3?n(l):r>3?n(t,s,l):n(t,s))||l);return r>3&&l&&Object.defineProperty(t,s,l),l},_r={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},qt=class extends tt{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,s=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:s,y:42,signals:[],description:"Cathode"}]}static get styles(){return bt`
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
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:s,flip:i}=this,r=s||_r[t?.toLowerCase()]||t,l=this.brightness?.3+this.brightness*.7:0,n=this.value&&this.brightness>Number.EPSILON;return dt`<svg
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
      <g class="light" style="display: ${n?"":"none"}">
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
    </svg> `}render(){return dt`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};oe([V()],qt.prototype,"value",void 0);oe([V()],qt.prototype,"brightness",void 0);oe([V()],qt.prototype,"color",void 0);oe([V()],qt.prototype,"lightColor",void 0);oe([V()],qt.prototype,"label",void 0);oe([V({type:Boolean})],qt.prototype,"flip",void 0);qt=oe([$t("wokwi-led")],qt);var zi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qi=e=>(...t)=>({_$litDirective$:e,values:t}),Ro=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,i){this._$Ct=t,this._$AM=s,this._$Ci=i}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}};var Hi="important",Pr=" !"+Hi,Gi=qi(class extends Ro{constructor(e){if(super(e),e.type!==zi.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,s)=>{let i=e[s];return i==null?t:t+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(e,[t]){let{style:s}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?s.removeProperty(i):s[i]=null);for(let i in t){let r=t[i];if(r!=null){this.ft.add(i);let l=typeof r=="string"&&r.endsWith(Pr);i.includes("-")||l?s.setProperty(i,l?r.slice(0,-11):r,l?Hi:""):s[i]=r}}return kt}});var $o=(e,t,s)=>{let i=Math.min(s,t);return Math.max(i,e)};function Xi(e,t){let s=t.transformPoint({x:e.left,y:e.top}),i=t.transformPoint({x:e.right,y:e.top}),r=t.transformPoint({x:e.left,y:e.bottom}),l=t.transformPoint({x:e.right,y:e.bottom}),n=Math.min(s.x,i.x,r.x,l.x),h=Math.min(s.y,i.y,r.y,l.y),d=Math.max(s.x,i.x,r.x,l.x),u=Math.max(s.y,i.y,r.y,l.y);return new DOMRect(n,h,d-n,u-h)}function Ki(e,t,s){let{userAgent:i}=navigator;if(i.indexOf("Epiphany")>=0||i.indexOf("Safari")>=0){let l=e.getCTM(),n=t?.getCTM(),h=t?.getBoundingClientRect(),d=t?.ownerSVGElement?.getBoundingClientRect();if(!h||!d||!n||!l)return null;let u=d.x+d.width/2,x=d.y+d.height/2,C=u-(h.x+h.width/2),v=x-(h.y+h.height/2),_=Math.atan2(v,C)/Math.PI*180,b=new DOMMatrix().rotate(_),E=Xi(s,b),k=E.width/h.width,I=E.height/h.height,K=n.inverse().multiply(l);return b.inverse().translate(E.left,E.top).multiply(K.inverse()).scale(k,I).translate(-h.left,-h.top)}else return e.getScreenCTM()?.inverse()||null}var se=function(e,t,s,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(e,t,s,i);else for(var h=e.length-1;h>=0;h--)(n=e[h])&&(l=(r<3?n(l):r>3?n(t,s,l):n(t,s))||l);return r>3&&l&&Object.defineProperty(t,s,l),l},Ao={x:9.91,y:8.18},Ht=class extends tt{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[yt(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return bt`
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
    `}mapToMinMax(t,s,i){return t*(i-s)+s}percentFromMinMax(t,s,i){return(t-s)/(i-s)}renderSVG(){let t=$o(0,1,this.percentFromMinMax(this.value,this.min,this.max)),s=(this.endDegree-this.startDegree)*t+this.startDegree;return dt`<svg
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
      style=${Gi({"--knob-angle":s+"deg"})}
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
        cx=${Ao.x}
        cy=${Ao.y}
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
    </svg>`}render(){return dt`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let s=t.target;this.updateValue(parseFloat(s.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:s}=this;s&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),s=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&s?Ki(t,s,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let s=t.type==="touchmove",i=s?t.touches[0].pageX:t.pageX,r=s?t.touches[0].pageY:t.pageY,l=new DOMPointReadOnly(i,r).matrixTransform(this.pageToKnobMatrix),n=Ao.x-l.x,h=Ao.y-l.y,d=Math.round(Math.atan2(h,n)*180/Math.PI);d<0&&(d+=360),d-=90,n>0&&h<=0&&d>0&&(d-=360),d=$o(this.startDegree,this.endDegree,d);let u=this.percentFromMinMax(d,this.startDegree,this.endDegree),x=this.mapToMinMax(u,this.min,this.max);this.updateValue(x)}updateValue(t){let s=$o(this.min,this.max,t),i=Math.round(s/this.step)*this.step;this.value=Math.round(i*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};se([V({type:Number})],Ht.prototype,"min",void 0);se([V({type:Number})],Ht.prototype,"max",void 0);se([V()],Ht.prototype,"value",void 0);se([V()],Ht.prototype,"step",void 0);se([V()],Ht.prototype,"startDegree",void 0);se([V()],Ht.prototype,"endDegree",void 0);Ht=se([$t("wokwi-potentiometer")],Ht);var qe=function(e,t,s,i){var r=arguments.length,l=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(e,t,s,i);else for(var h=e.length-1;h>=0;h--)(n=e[h])&&(l=(r<3?n(l):r>3?n(t,s,l):n(t,s))||l);return r>3&&l&&Object.defineProperty(t,s,l),l},ps,be=class extends tt{static{ps=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+ps.pushbuttonCounter++}static get styles(){return bt`
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
    `}renderSVG(){let{color:t,uniqueId:s,xray:i}=this,r=this.pressed?`url(#grad-down-${s})`:`url(#grad-up-${s})`;return dt`<svg
      width="17.802mm"
      height="12mm"
      version="1.1"
      viewBox="-3 0 18 12"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="grad-up-${s}" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="grad-down-${s}" x1="1" x2="0" y1="1" y2="0">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="12" height="12" rx=".44" ry=".44" fill="#464646" />
      <rect x=".75" y=".75" width="10.5" height="10.5" rx=".211" ry=".211" fill="#eaeaea" />
      ${i?Dt`
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
        <circle cx="6" cy="6" r="3.822" fill="${r}" />
        <circle
          class="button-active-circle"
          cx="6"
          cy="6"
          r="3.822"
          fill="url(#grad-down-${s})"
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
    </svg>`}render(){let{color:t,label:s}=this;return dt`
      <button
        aria-label="${s} ${t} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${i=>ge.includes(i.key)&&this.down()}
        @keyup=${i=>ge.includes(i.key)&&this.up(i)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(t){this.pressed&&(Wi(t)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(t){this.sticky||this.up(t)}};qe([V()],be.prototype,"color",void 0);qe([V()],be.prototype,"pressed",void 0);qe([V()],be.prototype,"label",void 0);qe([V({type:Boolean,attribute:"xray"})],be.prototype,"xray",void 0);be=ps=qe([$t("wokwi-pushbutton")],be);var Yi=`:host {
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
.tc-pieza[hidden],
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
`;var At={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var j=9.6/2.54,H=57.6,Eo=14.4,Ji={x:Eo,ancho:32.2*j},Ct={x:Eo+(32.2-22.2)/2*j,ancho:22.2*j,alto:11.8*j},ye={x:Ct.x+5.9*j,y:H},us=13.5*j,Ce=182.4,Po={ancho:201.6,alto:86.4},_o={GND:{x:Ce,y:H-9.6,color:"#7a4a24"},VCC:{x:Ce,y:H,color:"#d7263d"},SIG:{x:Ce,y:H+9.6,color:"#f28c28"}},P=e=>Math.round(e*100)/100,ms=e=>`rotate(${P(-e)} ${P(ye.x)} ${P(ye.y)})`;function xs(e="sg90",t=90){let s=At[e]||At.sg90,{ancho:i,alto:r}=Po,l=H-Ct.alto/2,n=P(ye.x),h=Ct.x+Ct.ancho,d=e==="sg90",u=Object.values(_o).map((v,_)=>{let b=H-4+_*4;return`<path d="M${P(h)} ${P(b)} C ${P(h+26)} ${P(b)}, ${P(Ce-34)} ${P(v.y)}, ${P(Ce-9)} ${P(v.y)}" fill="none" stroke="${v.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),x=Object.values(_o).map(v=>`<rect x="${P(v.x-2.2)}" y="${P(v.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),C=d?`<circle cx="${P(Ct.x+15*j)}" cy="${H}" r="${P(3.6*j)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${P(Ct.x+9.5*j)}" cy="${P(H+2.2*j)}" r="${P(2.2*j)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${r}" viewBox="0 0 ${i} ${r}"><title>Servo ${s.nombre}</title>`+u+`<rect x="${P(Ce-9)}" y="${P(H-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+x+`<rect x="${P(Ji.x)}" y="${P(l+1.5)}" width="${P(Ji.ancho)}" height="${P(Ct.alto-3)}" rx="3" fill="${s.cuerpo}" fill-opacity="${d?.75:1}" stroke="${s.borde}" stroke-width="1"/><circle cx="${P(Eo+2.4*j)}" cy="${H}" r="${P(1*j)}" fill="#ffffff" stroke="${s.borde}" stroke-width="0.8"/><circle cx="${P(Eo+(32.2-2.4)*j)}" cy="${H}" r="${P(1*j)}" fill="#ffffff" stroke="${s.borde}" stroke-width="0.8"/><rect x="${P(Ct.x)}" y="${P(l)}" width="${P(Ct.ancho)}" height="${P(Ct.alto)}" rx="2.5" fill="${s.cuerpo}" fill-opacity="${d?.85:1}" stroke="${s.borde}" stroke-width="1.2"/>`+C+`<text x="${P(Ct.x+15.5*j)}" y="${P(H+4.1*j)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${s.nombre}</text><circle cx="${n}" cy="${H}" r="${P(5.2*j)}" fill="${s.cuerpo}" stroke="${s.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${ms(t)}"><path d="M${n} ${P(H-3.2*j/2-1)} L${P(ye.x+us)} ${P(H-1.1*j)} A ${P(1.1*j)} ${P(1.1*j)} 0 0 1 ${P(ye.x+us)} ${P(H+1.1*j)} L${n} ${P(H+3.2*j/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${n}" cy="${H}" r="${P(3.4*j)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(v=>`<circle cx="${P(ye.x+us*v)}" cy="${H}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${n}" cy="${H}" r="${P(1.3*j)}" fill="${s.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var J=3.779527559055118,He={ancho:72.58*J,alto:53.34*J},ve=4*J,ot=5*J,Mr=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],Ut=ve+4.6*J,Bt=He.ancho-.5-4.6*J,Ot=60,Et=(e,t)=>({x:e,y:Ot+t*ot}),Gt={M1A:Et(Ut,0),M1B:Et(Ut,1),GND_IZQ:Et(Ut,2),M2A:Et(Ut,3),M2B:Et(Ut,4),M4A:Et(Bt,0),M4B:Et(Bt,1),GND_DER:Et(Bt,2),M3A:Et(Bt,3),M3B:Et(Bt,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+ot,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},Qi={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},ta=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],$=e=>Math.round(e*100)/100,G=(e,t,s,{tam:i=6.2,ancla:r="middle",peso:l="bold",color:n="#ffffff",giro:h=0}={})=>`<text x="${$(e)}" y="${$(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="${r}" fill="${n}"${h?` transform="rotate(${h} ${$(e)} ${$(t)})"`:""}>${s}</text>`;function gs(e,t,s,i){let r=19.3*J,l=6.4*J,n=e-r/2,h=t-l/2,d="";for(let u=0;u<8;u++){let x=e-8.89*J+u*2.54*J;d+=`<rect x="${$(x-1.6)}" y="${$(h-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,d+=`<rect x="${$(x-1.6)}" y="${$(h+l-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${$(e)} ${$(t)})">`+d+`<rect x="${$(n)}" y="${$(h)}" width="${$(r)}" height="${$(l)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${$(n)} ${$(t-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+G(e+1.5,t+2.6,s,{tam:7.4,color:"#e8e8e8"})+"</g>"+G(e,t-r/2-3,i,{tam:5.2})}function bs(e,t,s,i=!0){let r=i?5.6*J:s*ot+.6*J,l=i?s*ot+.6*J:5.6*J,n=i?e-r/2:e-ot/2-.3*J,h=i?t-ot/2-.3*J:t-l/2,d="";for(let u=0;u<s;u++){let x=i?e:e+u*ot,C=i?t+u*ot:t;d+=`<circle cx="${$(x)}" cy="${$(C)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,d+=`<line x1="${$(x-4.2)}" y1="${$(C)}" x2="${$(x+4.2)}" y2="${$(C)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${$(n)}" y="${$(h)}" width="${$(r)}" height="${$(l)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+d}var Zi=(e,t,s)=>`<circle cx="${$(e)}" cy="${$(t)}" r="${$(s/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${$(e)} ${$(t-s/2)} a ${$(s/2)} ${$(s/2)} 0 0 1 0 ${$(s)}" fill="#8a8f96" opacity="0.55"/><circle cx="${$(e)}" cy="${$(t)}" r="${$(s/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function ys(e=!0){let{ancho:t,alto:s}=He,i=Mr.map(({y:h,xs:d})=>{let u=d[0]-4.6,x=d[d.length-1]+4.6;return`<rect x="${$(u)}" y="${$(h-4.6)}" width="${$(x-u)}" height="9.2" fill="#151515"/>`+d.map(C=>`<rect x="${$(C-1.6)}" y="${$(h-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),r=["S2","S1"].map(h=>["SIG","POS","GND"].map(d=>{let u=Gt[`${h}_${d}`];return`<rect x="${$(u.x-4.4)}" y="${$(u.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${$(u.x-1.4)}" y="${$(u.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),l=132,n=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${$(t)}" height="${$(s)}" viewBox="0 0 ${$(t)} ${$(s)}"><title>Shield de motores L293D</title><rect x="${$(ve)}" y="0.5" width="${$(t-ve-.5)}" height="${$(s-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+i+gs(82,86,"L293D","U1")+gs(145,86,"74HC595","U3")+gs(205,86,"L293D","U2")+Zi(118,140,6.3*J)+Zi(205,140,6.3*J)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${l+20}" cy="${n}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+bs(Ut,Ot,5)+bs(Bt,Ot,5)+bs(Gt.EXT_POS.x,Gt.EXT_POS.y,2,!1)+r+`<rect x="${l-9}" y="${n-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${l-6.4}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${l+3.6}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(e?`<rect data-puente="1" x="${l-9.6}" y="${n-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${$(ve+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${$(ve+15)}" cy="169" r="5" fill="#2b2b2b"/>`+G(Ut+13,Ot+ot/2+3,"M1",{tam:7})+G(Ut+13,Ot+3.5*ot+3,"M2",{tam:7})+G(Ut+12,Ot+2*ot+2.5,"GND",{tam:5})+G(Bt-13,Ot+ot/2+3,"M4",{tam:7})+G(Bt-13,Ot+3.5*ot+3,"M3",{tam:7})+G(Bt-12,Ot+2*ot+2.5,"GND",{tam:5})+G(Gt.EXT_POS.x+ot/2,193,"EXT_PWR",{tam:5.6})+G(Gt.EXT_POS.x,165,"+M",{tam:5})+G(Gt.EXT_GND.x,165,"GND",{tam:5})+G(l,n-8,"PWR",{tam:5.6})+G(52,16,"SERVO_2",{tam:5,ancla:"start"})+G(52,26,"SERVO_1",{tam:5,ancla:"start"})+G(26,7.4,"S",{tam:4.6})+G(35.6,7.4,"+",{tam:5})+G(45.2,7.4,"\u2212",{tam:5})+G(ve+15,156,"RESET",{tam:4.6})+G(196,162,"Motor Shield L293D",{tam:6.4})+G(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var N=3.779527559055118,st={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},oa=st.voltiosRef/(st.mABloqueado/1e3),sa=st.rpmSinCarga*st.reduccion*2*Math.PI/60,ia=st.mASinCarga/1e3,Ss=(st.voltiosRef-ia*oa)/sa,Qc=Ss*ia/sa,tl=st.tauMecanicoMs/1e3*Ss*Ss/oa;var ws=64.2*N,ie=22.5*N,Cs=40*N,Rs=11.2*N,ut=st.ruedaMM*N/2,Ir={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Rs,y0:132-ie/2}},Ge=e=>Ir[e&&e.vista==="rueda"?"rueda":"eje"],aa=e=>{let t=e.y0+ie/2;return{A:{x:e.ancho-12,y:t-4.8,color:"#d7263d"},B:{x:e.ancho-12,y:t+4.8,color:"#2b2b2b"}}};function ra(e){let t=Ge(e),s=aa(t);if(e&&e.lado==="derecho")for(let i of["A","B"])s[i]={...s[i],x:t.ancho-s[i].x};return s}var y=e=>Math.round(e*100)/100,vs=(e,t,s,{tam:i=11,color:r="#1f2328",peso:l="bold",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${y(e)}" y="${y(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="middle" fill="${r}">${s}</text>`;function kr(e,t){let s=t+ie/2;return`<rect x="${y(e+Cs-2)}" y="${y(s-9.5*N)}" width="${y(ws-Cs+2)}" height="${y(19*N)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${y(e+ws-6*N)}" y="${y(s-8*N)}" width="${y(6*N)}" height="${y(16*N)}" rx="4" fill="#2b2b2b"/><rect x="${y(e)}" y="${y(t)}" width="${y(Cs)}" height="${y(ie)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${y(e+31.8*N-8.75*N)}" cy="${y(s)}" r="${y(1.5*N)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${y(e+31.8*N+8.75*N-6)}" cy="${y(s)}" r="${y(1.5*N)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function Dr(e){let t=aa(e),s=e.x0+ws,i=e.y0+ie/2;return["A","B"].map((r,l)=>{let n=i+(l?3:-3);return`<path d="M${y(s)} ${y(n)} C ${y(s+20)} ${y(n)}, ${y(t[r].x-22)} ${y(t[r].y)}, ${y(t[r].x-6)} ${y(t[r].y)}" fill="none" stroke="${t[r].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${y(t[r].x-4.2)}" y="${y(t[r].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function Or(e,t){let s=2.7*N;return`<circle cx="${y(e)}" cy="${y(t)}" r="${y(s+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${y(e)} ${y(t)})"><path d="M${y(e-s)} ${y(t-1.8*N)} H${y(e+s)} V${y(t+1.8*N)} H${y(e-s)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${y(e)}" cy="${y(t)}" r="${y(s)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function Ur(e,t){let s=[0,72,144,216,288].map(r=>`<rect x="${y(e-12)}" y="${y(t-ut*.72)}" width="24" height="${y(ut*.72)}" rx="6" fill="#f2c318" transform="rotate(${r} ${y(e)} ${y(t)})"/>`).join(""),i=Array.from({length:24},(r,l)=>`<rect x="${y(e-3)}" y="${y(t-ut-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${l*15} ${y(e)} ${y(t)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${y(e)} ${y(t)})"><circle cx="${y(e)}" cy="${y(t)}" r="${y(ut*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${y(ut*.24)}"/>`+i+`<circle cx="${y(e)}" cy="${y(t)}" r="${y(ut*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+s+`<circle cx="${y(e)}" cy="${y(t)}" r="${y(7*N)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${y(e-2.7*N)}" y="${y(t-1.8*N)}" width="${y(5.4*N)}" height="${y(3.6*N)}" fill="#7a5d00"/></g>`}function na(e={}){let t=Ge(e),s=e.lado==="derecho",i=t.x0+Rs,r=t.y0+ie/2,l=s?` transform="translate(${t.ancho} 0) scale(-1 1)"`:"",n=s?t.ancho-i:i,h=kr(t.x0,t.y0)+Dr(t),d=s?t.ancho-(t.x0+26*N):t.x0+26*N,u=vs(d,t.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return e.vista==="rueda"?(h+=Ur(i,r),u+=`<line x1="${y(n-ut-10)}" y1="${y(r+ut+2)}" x2="${y(n+ut+10)}" y2="${y(r+ut+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${y(n)} ${y(r+ut+20)})"></g>`+vs(n,r+ut+46,"quieto",{tam:13,marca:"data-velocidad"})):(h+=Or(i,r),u+=vs(n,t.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${t.ancho}" height="${t.alto}" viewBox="0 0 ${t.ancho} ${t.alto}"><title>Motor TT 6 V (${e.vista==="rueda"?"con rueda":"eje"}, lado ${s?"derecho":"izquierdo"})</title><g${l}>${h}</g>${u}</svg>`}var ea=new WeakMap;function ca(e,t,s){let i=Ge(t),r=i.x0+Rs,l=i.y0+ie/2,n=s||{rpm:0,giro:0,velocidad:0},h=e.querySelector("[data-eje],[data-rueda]");h&&h.setAttribute("transform",`rotate(${y(-n.giro)} ${y(r)} ${y(l)})`);let d=e.querySelector("[data-rpm]"),u=ea.get(e)||{},x=n.rpm>0!=(t.lado==="derecho");if(d){let _=Math.abs(n.rpm)<1?"0 RPM":`${Math.round(Math.abs(n.rpm))} RPM ${x?"\u27F2":"\u27F3"}`;_!==u.rpm&&(d.textContent=u.rpm=_)}let C=e.querySelector("[data-velocidad]"),v=e.querySelector("[data-flecha]");if(C&&v){let _=Math.sign(n.velocidad)*(t.lado==="derecho"?-1:1),b=Math.abs(n.velocidad),E=b<.5,k=E?"quieto":`${_>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(b)} cm/s`;k!==u.vel&&(C.textContent=u.vel=k);let I=E?0:x?-1:1,K=`${I}|${_}`;K!==u.flecha&&(u.flecha=K,v.innerHTML=E?"":`<path d="M${-40*I} -5 H${22*I} V-12 L${40*I} 0 L${22*I} 12 V5 H${-40*I} Z" fill="${_>0?"#2e9e44":"#d7263d"}"/>`)}ea.set(e,u)}var la=3.779527559055118,mt={llena:{nombre:"llena",voltios:8.4,color:"#2e9e44"},nominal:{nombre:"nominal",voltios:7.4,color:"#e8a20c"},descargada:{nombre:"descargada",voltios:6.4,color:"#d7263d"}},Ke={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var Xe=356,$s=150,ae=10,ft=10,re=72*la,Se=34*la,As={ancho:Xe,alto:$s},Es={POS:{x:Xe-12,y:ft+30,color:"#d7263d"},NEG:{x:Xe-12,y:ft+39.6,color:"#2b2b2b"}},L=e=>Math.round(e*100)/100,To=(e,t,s,{tam:i=11,color:r="#ffffff",peso:l="bold",ancla:n="middle",marca:h=""}={})=>`<text${h?` ${h}="1"`:""} x="${L(e)}" y="${L(t)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="${n}" fill="${r}">${s}</text>`;function _s(e="nominal"){let t=mt[e]||mt.nominal,s=ae+re,i=["POS","NEG"].map((l,n)=>{let h=Es[l],d=ft+24+n*10;return`<path d="M${L(s)} ${L(d)} C ${L(s+26)} ${L(d)}, ${L(h.x-26)} ${L(h.y)}, ${L(h.x-6)} ${L(h.y)}" fill="none" stroke="${h.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${L(h.x-4.4)}" y="${L(h.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),r=["#2b2b2b","#e05a5a","#d7263d"].map((l,n)=>{let h=ft+Se-40+n*4,d=ft+Se-30+n*6;return`<path d="M${L(s)} ${L(h)} C ${L(s+18)} ${L(h)}, ${L(s+28)} ${L(d)}, ${L(s+44)} ${L(d)}" fill="none" stroke="${l}" stroke-width="1.8"/>`}).join("")+`<rect x="${L(s+44)}" y="${L(ft+Se-36)}" width="14" height="20" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+To(s+51,ft+Se-4,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${Xe}" height="${$s}" viewBox="0 0 ${Xe} ${$s}"><title>Bater\xEDa LiPo 2S 7,4 V (${t.nombre})</title>`+i+r+`<rect x="${ae}" y="${ft}" width="${L(re)}" height="${L(Se)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${ae+14}" y="${ft+12}" width="${L(re-28)}" height="${L(Se-24)}" rx="4" fill="#3f4752"/>`+To(ae+re/2,ft+36,"LiPo 2S \xB7 7,4 V",{tam:15})+To(ae+re/2,ft+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(l=>`<rect x="${L(ae+re/2-33+l*23)}" y="${ft+66}" width="20" height="12" rx="2" fill="${l<{descargada:1,nominal:2,llena:3}[e]?t.color:"#5a6370"}"/>`).join("")+To(ae+re/2,ft+98,`${String(t.voltios).replace(".",",")} V \xB7 ${t.nombre}`,{tam:12,color:t.color==="#2e9e44"?"#7fd88f":t.color==="#e8a20c"?"#ffd166":"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function da(e,t,s){let i=e.querySelector("[data-voltios]");if(!i)return;let r=mt[t]||mt.nominal,l=s&&typeof s.voltios=="number"?s.voltios:r.voltios;i.textContent=`${l.toFixed(2).replace(".",",")} V \xB7 ${r.nombre}`}var we={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},Ps=Object.keys(we),fa={marron:"marr\xF3n",morado:"violeta"};function Ts(e,t){let s=[e,t];return s.some(i=>/^placa\.GND/.test(i)||/^protoboard\.[si]-/.test(i))?"negro":s.some(i=>/^placa\.(5V|3V3|VIN)$/.test(i)||/^protoboard\.[si]\+/.test(i))?"rojo":"verde"}var Br=["3","5","6","9","10","11"],Re={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(e){return/^\d+$/.test(e)?"D"+e:e.startsWith("GND.")?"GND"+e.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[e]||e},rotulo(e){return e==="D0"?"Pin 0 \xB7 RX del monitor serial":e==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(e)?"Pin "+e.slice(1)+(Br.includes(e.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(e)?e+" \xB7 entrada anal\xF3gica":e.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[e]||e}}},Z={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:e=>({1:"1",2:"2"})[e],rotulo:e=>"pata "+e,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(e,t){e.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:e=>({A:"anodo",C:"catodo"})[e],rotulo:e=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[e]||e,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(e,t){e.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:e=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[e],rotulo:e=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[e]||e,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(e,t){e.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[t.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:Po.ancho,alto:Po.alto,pines:_o,svg:e=>xs(e.modelo,90)},rotulo:e=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[e]||e,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(At).map(([e,t])=>[e,`${t.nombre} (engranajes de ${t.engranajes})`])},aplicar(e,t){let s=new DOMParser().parseFromString(xs(t.modelo,90),"image/svg+xml").documentElement;e.replaceChildren(...[...s.childNodes].map(i=>e.ownerDocument.importNode(i,!0)))},mostrar(e,t){let s=e.querySelector("[data-brazo]");s&&s.setAttribute("transform",ms(t&&typeof t.angulo=="number"?t.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,props:{puentePWR:!0},dibujo:{ancho:He.ancho,alto:He.alto,pines:Gt,svg:e=>ys(e.puentePWR!==!1)},rotulo:e=>Qi[e]||e,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(e,t){let s=new DOMParser().parseFromString(ys(t.puentePWR!==!1),"image/svg+xml").documentElement;e.replaceChildren(...[...s.childNodes].map(i=>e.ownerDocument.importNode(i,!0)))},mostrar(e,t){let s=e.querySelector("[data-led-pwr]"),i=t&&t.motoresV>1?"#3ddc5a":"#1f5a2c";s&&s.getAttribute("fill")!==i&&s.setAttribute("fill",i)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:e=>({...Ge(e),pines:ra(e)}),svg:e=>na(e)},rotulo:e=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[e]||e,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(e,t,s){ca(e,s||{},t)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:As.ancho,alto:As.alto,pines:Es,svg:e=>_s(e.carga)},rotulo:e=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia"})[e]||e,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(mt).map(([e,t])=>[e,`${t.nombre} (${String(t.voltios).replace(".",",")} V)`])}],aplicar(e,t){let s=new DOMParser().parseFromString(_s(t.carga),"image/svg+xml").documentElement;e.replaceChildren(...[...s.childNodes].map(i=>e.ownerDocument.importNode(i,!0)))},mostrar(e,t,s){da(e,(s||{}).carga,t)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:e=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[e],rotulo:e=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[e]||e,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(e,t){e.min=0,e.max=100,e.value=Math.round((Number(t.posicion)||0)*100)}}};var Mo=["a","b","c","d","e"],ha=["f","g","h","i","j"],it={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},pa=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],_t={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Ye=e=>14.4+(e-1)*9.6,Vr=e=>e>=2&&(e-1)%6!==0,Ms=new Map;function $e(e="media"){if(Ms.has(e))return Ms.get(e);let t=_t[e]||_t.media,s=[];Ms.set(e,s);for(let i=1;i<=t.columnas;i++){for(let r of Mo)s.push({nombre:r+i,x:Ye(i),y:it[r],tira:"arriba"+i});for(let r of ha)s.push({nombre:r+i,x:Ye(i),y:it[r],tira:"abajo"+i});for(let[r]of pa)Vr(i)&&s.push({nombre:r+i,x:Ye(i),y:it[r],tira:r})}return s}var Is=new Map;function ua(e="media"){if(Is.has(e))return Is.get(e);let t=new Map;Is.set(e,t);for(let s of $e(e))t.has(s.tira)||t.set(s.tira,[]),t.get(s.tira).push(s.nombre);return t}function ks(e){let t=/^([si][+-])\d+$/.exec(e);if(t)return t[1];let s=/^([a-j])(\d+)$/.exec(e);return s?(Mo.includes(s[1])?"arriba":"abajo")+s[2]:null}function ma(e){let t=/^([si])([+-])(\d+)$/.exec(e);if(t){let l=t[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${t[2]==="+"?"+":"\u2212"} ${l} \xB7 todo el riel est\xE1 unido`}let s=/^([a-j])(\d+)$/.exec(e);if(!s)return"Protoboard";let[i,r]=Mo.includes(s[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${s[1]}${s[2]} \xB7 unido por dentro con ${i}${s[2]}\u2013${r}${s[2]}`}function Ds(e="media"){let t=_t[e]||_t.media,{ancho:s,alto:i,columnas:r}=t,l=[];l.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`),l.push(`<rect x="0.5" y="0.5" width="${s-1}" height="${i-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),l.push(`<rect x="2" y="${(it.e+it.f)/2-4}" width="${s-4}" height="8" fill="#e2dfd4"/>`);let n=(d,u)=>l.push(`<line x1="${14.4-6}" y1="${d}" x2="${s-14.4+6}" y2="${d}" stroke="${u}" stroke-width="1.2"/>`);n(it["s+"]-5.5,"#d7263d"),n(it["s-"]+5.5,"#2f6fde"),n(it["i-"]-5.5,"#2f6fde"),n(it["i+"]+5.5,"#d7263d");let h=(d,u,x,C="#8a867a",v=5.5)=>l.push(`<text x="${d}" y="${u}" font-family="sans-serif" font-size="${v}" font-weight="700" fill="${C}" text-anchor="middle">${x}</text>`);for(let[d,,u]of pa){let x=u==="+"?"#d7263d":"#2f6fde";h(5.2,it[d]+2.2,u,x,7),h(s-5.2,it[d]+2.2,u,x,7)}for(let d=1;d<=r;d++)(d===1||d%5===0)&&(h(Ye(d),it.a-6.2,d),h(Ye(d),it.j+10.4,d));for(let d of[...Mo,...ha])h(5.2,it[d]+2,d),h(s-5.2,it[d]+2,d);for(let d of $e(e))l.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return l.push("</svg>"),l.join("")}function xa(e,{tipo:t="media",ocupados:s=new Set,tolerancia:i=3.5}={}){if(!e.length)return null;let r=$e(t),l=(C,v)=>{let _=null,b=1/0;for(let E of r){let k=Math.hypot(E.x-C,E.y-v);k<b&&(b=k,_=E)}return{hueco:_,distancia:b}},n=l(e[0].x,e[0].y);if(n.distancia>9.6)return null;let h=n.hueco.x-e[0].x,d=n.hueco.y-e[0].y,u={},x=new Set;for(let C of e){let{hueco:v,distancia:_}=l(C.x+h,C.y+d);if(_>i||s.has(v.nombre)||x.has(v.nombre))return null;u[C.nombre]=v.nombre,x.add(v.nombre)}return{dx:h,dy:d,en:u}}var Nr=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Os(e,{presionados:t=new Set,conduccion:s=!1}={}){let i=new Map,r=n=>{for(i.has(n)||i.set(n,n);i.get(n)!==n;)i.set(n,i.get(i.get(n))),n=i.get(n);return n},l=(n,h)=>i.set(r(n),r(h));for(let n of Nr)n.forEach(h=>l("placa."+n[0],"placa."+h));for(let n of e.cables)l(n.de,n.a);if(e.protoboard){for(let n of ua(e.protoboard.tipo).values())n.forEach(h=>l("protoboard."+n[0],"protoboard."+h));for(let n of e.componentes)if(n.en)for(let[h,d]of Object.entries(n.en))l(n.id+"."+h,d)}for(let n of e.componentes)if(n.tipo==="shield_l293d"){for(let[h,d]of ta)l(n.id+"."+h,d);(!n.props||n.props.puentePWR!==!1)&&l(n.id+".EXT_POS","placa.VIN")}else n.tipo==="pulsador"?(l(n.id+".1i",n.id+".1d"),l(n.id+".2i",n.id+".2d"),t.has(n.id)&&l(n.id+".1i",n.id+".2i")):s&&n.tipo==="resistencia"?l(n.id+".1",n.id+".2"):s&&n.tipo==="potenciometro"&&(l(n.id+".GND",n.id+".SIG"),l(n.id+".SIG",n.id+".VCC"));return r}var ba=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Lr=Object.fromEntries(ba.flatMap(e=>Object.entries(e.pines).map(([t,s])=>[t,{ref:e.ref,pad:s}]))),jr={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},Wr=["GND","+5V","+3V3","VIN"],ga=e=>e>=1e3?+(e/1e3).toFixed(2)+"k":String(e),Io={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:e=>ga(Number(e.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:e=>"LED "+(e.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:e=>"Servo "+(At[e.modelo]||At.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:e=>ga(Number(e.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},at=e=>'"'+String(e).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function Fr(e){let s=[2166136261,16777619,2654435769,2246822507].map(i=>{let r=i>>>0;for(let l=0;l<e.length;l++)r=Math.imul(r^e.charCodeAt(l),16777619)>>>0;return r.toString(16).padStart(8,"0")}).join("");return`${s.slice(0,8)}-${s.slice(8,12)}-${s.slice(12,16)}-${s.slice(16,20)}-${s.slice(20,32)}`}function ya(e,{nombre:t="Circuito",fecha:s=new Date().toISOString().slice(0,19),herramienta:i="TecnoCircuito"}={}){let r=e.componentes.filter(b=>Io[b.tipo]).map(b=>({...b})),l={};for(let b of r){let E=Io[b.tipo];l[E.ref]=(l[E.ref]||0)+1,b.ref=E.ref+l[E.ref]}let n=Os(e),h=new Map,d=(b,E,k,I)=>{let K=n(b);h.has(K)||h.set(K,{pads:new Map,uno:new Set});let D=h.get(K);D.pads.set(E+" "+k,{ref:E,pad:k,pinUno:I}),I&&D.uno.add(jr[I]||I)},u=new Set(e.cables.flatMap(b=>[b.de,b.a]));for(let[b,{ref:E,pad:k}]of Object.entries(Lr))u.has("placa."+b)&&d("placa."+b,E,k,b);for(let b of r)for(let[E,k]of Object.entries(Io[b.tipo].pads))d(b.id+"."+E,b.ref,k,null);let x=(b,E)=>b.localeCompare(E,"en",{numeric:!0}),C=[...h.values()].filter(b=>b.pads.size>=2).map(b=>{let E=[...b.pads.values()].sort((I,K)=>x(I.ref,K.ref)||x(I.pad,K.pad));return{nombre:Wr.find(I=>b.uno.has(I))||[...b.uno].sort(x)[0]||`Net-(${E[0].ref}-Pad${E[0].pad})`,pads:E}}).sort((b,E)=>x(b.nombre,E.nombre)),v=[],_=(b,E,k,I,K,D,Lt)=>v.push("		(comp",`			(ref ${at(b)})`,`			(value ${at(E)})`,`			(footprint ${at(k)})`,`			(libsource (lib ${at(I)}) (part ${at(K)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${at(D)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${at(Lt)})`,"		)");v.push("(export",'	(version "E")',"	(design",`		(source ${at(t)})`,`		(date ${at(s)})`,`		(tool ${at(i)})`,"	)"),v.push("	(components");for(let b of ba)_(b.ref,b.valor,b.huella,"Connector_Generic",b.parte,"placa",b.uuid);for(let b of r){let E=Io[b.tipo];_(b.ref,E.valor(b.props||{}),E.huella,E.lib,E.parte,b.id,Fr(t+"/"+b.id))}return v.push("	)","	(nets"),C.forEach((b,E)=>{v.push("		(net",`			(code ${at(E+1)})`,`			(name ${at(b.nombre)})`,'			(class "Default")');for(let k of b.pads){let I=k.pinUno?` (pinfunction ${at(k.pinUno)})`:"";v.push(`			(node (ref ${at(k.ref)}) (pin ${at(k.pad)})${I} (pintype "passive"))`)}v.push("		)")}),v.push("	)",")"),v.join(`
`)+`
`}var ne;(function(e){e[e.AVCC=0]="AVCC",e[e.AREF=1]="AREF",e[e.Internal1V1=2]="Internal1V1",e[e.Internal2V56=3]="Internal2V56",e[e.Reserved=4]="Reserved"})(ne||(ne={}));var rt;(function(e){e[e.SingleEnded=0]="SingleEnded",e[e.Differential=1]="Differential",e[e.Constant=2]="Constant",e[e.Temperature=3]="Temperature"})(rt||(rt={}));var Ca={0:{type:rt.SingleEnded,channel:0},1:{type:rt.SingleEnded,channel:1},2:{type:rt.SingleEnded,channel:2},3:{type:rt.SingleEnded,channel:3},4:{type:rt.SingleEnded,channel:4},5:{type:rt.SingleEnded,channel:5},6:{type:rt.SingleEnded,channel:6},7:{type:rt.SingleEnded,channel:7},8:{type:rt.Temperature},14:{type:rt.Constant,voltage:1.1},15:{type:rt.Constant,voltage:0}},Cl={type:rt.Constant,voltage:0},qr={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ca,adcReferences:[ne.AREF,ne.AVCC,ne.Reserved,ne.Internal1V1]};var Hr=2,Gr=4,Xr=8,Kr=16,Yr=32,wl=Hr|Gr|Xr|Kr|Yr;var Sa={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},wa={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Ra={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var $a={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var Je={PIN:35,DDR:36,PORT:37,pinChange:Ra,externalInterrupts:[]};var ce={PIN:41,DDR:42,PORT:43,pinChange:$a,externalInterrupts:[null,null,Sa,wa]};var ko;(function(e){e[e.Low=0]="Low",e[e.High=1]="High",e[e.Input=2]="Input",e[e.InputPullUp=3]="InputPullUp"})(ko||(ko={}));var Do;(function(e){e[e.None=0]="None",e[e.Enable=1]="Enable",e[e.Set=2]="Set",e[e.Clear=3]="Clear",e[e.Toggle=4]="Toggle"})(Do||(Do={}));var va;(function(e){e[e.LowLevel=0]="LowLevel",e[e.Change=1]="Change",e[e.FallingEdge=2]="FallingEdge",e[e.RisingEdge=3]="RisingEdge"})(va||(va={}));var _a={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Aa;(function(e){e[e.FallingEdge=6]="FallingEdge",e[e.RisingEdge=7]="RisingEdge"})(Aa||(Aa={}));var Ns={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Jr=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:_a,compPortA:ce.PORT,compPinA:6,compPortB:ce.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:ce.PORT,externalClockPin:4},Ns),Zr=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:_a,compPortA:Je.PORT,compPinA:1,compPortB:Je.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:ce.PORT,externalClockPin:5},Ns),Qr=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:Je.PORT,compPinA:3,compPortB:ce.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Ns),Us;(function(e){e[e.Normal=0]="Normal",e[e.PWMPhaseCorrect=1]="PWMPhaseCorrect",e[e.CTC=2]="CTC",e[e.FastPWM=3]="FastPWM",e[e.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",e[e.Reserved=5]="Reserved"})(Us||(Us={}));var W;(function(e){e[e.Max=0]="Max",e[e.Top=1]="Top",e[e.Bottom=2]="Bottom"})(W||(W={}));var F;(function(e){e[e.Immediate=0]="Immediate",e[e.Top=1]="Top",e[e.Bottom=2]="Bottom"})(F||(F={}));var fe=1,Oo=2,Ae=1,{Normal:Pa,PWMPhaseCorrect:le,CTC:Bs,FastPWM:de,Reserved:Vs,PWMPhaseFrequencyCorrect:Ea}=Us,_l=[[Pa,255,F.Immediate,W.Max,0],[le,255,F.Top,W.Bottom,0],[Bs,fe,F.Immediate,W.Max,0],[de,255,F.Bottom,W.Max,0],[Vs,255,F.Immediate,W.Max,0],[le,fe,F.Top,W.Bottom,Ae],[Vs,255,F.Immediate,W.Max,0],[de,fe,F.Bottom,W.Top,Ae]],Pl=[[Pa,65535,F.Immediate,W.Max,0],[le,255,F.Top,W.Bottom,0],[le,511,F.Top,W.Bottom,0],[le,1023,F.Top,W.Bottom,0],[Bs,fe,F.Immediate,W.Max,0],[de,255,F.Bottom,W.Top,0],[de,511,F.Bottom,W.Top,0],[de,1023,F.Bottom,W.Top,0],[Ea,Oo,F.Bottom,W.Bottom,0],[Ea,fe,F.Bottom,W.Bottom,Ae],[le,Oo,F.Top,W.Bottom,0],[le,fe,F.Top,W.Bottom,Ae],[Bs,Oo,F.Immediate,W.Max,0],[Vs,65535,F.Immediate,W.Max,0],[de,Oo,F.Bottom,W.Top,Ae],[de,fe,F.Bottom,W.Top,Ae]];var tn=16,en=8,on=4;var Dl=on|tn|en;var V0=[...Array.from({length:14},(e,t)=>"D"+t),"A0","A1","A2","A3","A4","A5"];var Vt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var vt=(e,t=1)=>Number.isInteger(e)?String(e):e.toFixed(t).replace(".",","),Ta=e=>e>=1e3?vt(e/1e3)+" k\u03A9":e+" \u03A9",Ze=e=>({estado:"validado",texto:e}),Uo=e=>({estado:"por_validar",texto:e}),Ls=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","bateria_lipo"]}],Qe={protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:e=>[["Valor",Ta(Number(e.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>Ze("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:e=>[["Color",e.color||"rojo"],["Voltaje directo",`${vt(Vt.vf[e.color]||Vt.vf.rojo,2)} V a ${Vt.normalmA} mA`],["Corriente",`de 5 a ${Vt.normalmA} mA; se quema desde ${Vt.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(Vt.vf[e.color]||Vt.vf.rojo))/(Vt.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:()=>Ze("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 12 de 12 dentro del criterio).")},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:e=>[["Color",e.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>Ze("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:e=>[["Valor",Ta(Number(e.ohmios)||1e4)],["Perilla",`${Math.round((Number(e.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>Ze("Lectura anal\xF3gica revisada el 7 oct 2026 y ruido del ADC medido el 9 oct (0,1 pasos).")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:e=>{let t=At[e.modelo]||At.sg90;return[["Modelo",`${t.nombre} (engranajes de ${e.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${vt(t.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${t.mA.reposo} mA \xB7 movi\xE9ndose ~${e.modelo==="mg90s"?t.mA.movimiento:100} mA \xB7 bloqueado ${t.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:e=>e.modelo==="mg90s"?Uo("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):Ze("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (6, ~100 y 590 mA).")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:e=>[["Voltaje",`3 a ${st.voltiosRef} V`],["Sin carga a 6 V",`${st.rpmSinCarga} RPM y ${st.mASinCarga} mA`],["Bloqueado",`${vt(st.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${st.reduccion} \xB7 rueda de ${st.ruedaMM} mm`],["Vista y lado",`${e.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${e.lado||"izquierdo"}`]],validacion:()=>Uo("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:e=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",e.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"]],validacion:()=>Uo("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"POS (+, rojo) y NEG (\u2212, negro). El cable blanco de balance es para el cargador",datos:e=>{let t=mt[e.carga]||mt.nominal;return[["Carga",`${t.nombre}: ${vt(t.voltios)} V (${vt(t.voltios/Ke.celdas,2)} V por celda)`],["Llena / nominal / descargada",`${vt(mt.llena.voltios)} / ${vt(mt.nominal.voltios)} / ${vt(mt.descargada.voltios)} V`],["M\xEDnimo",`${vt(Ke.minimoCeldaV)} V por celda (${vt(Ke.minimoCeldaV*Ke.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>Uo("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")}},Ma=e=>String(e).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function Ia(e){let t=Ma(e).split(/\s+/).filter(Boolean),s=Ls.flatMap(i=>i.piezas.map(r=>({tipo:r,categoria:i.nombre})));return t.length?s.filter(({tipo:i,categoria:r})=>{let l=Qe[i],n=Ma([l.nombre,r,l.descripcion,...l.palabras].join(" "));return t.every(h=>n.includes(h))}):s}var ka="http://www.w3.org/2000/svg",sn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",an=280,Da=5e3,Oa=4,Ua=8,rn=9.6,Ba=.4,nn=5,Pt=e=>JSON.parse(JSON.stringify(e)),Q=e=>Math.round(e*100)/100,to=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),js=e=>we[e]||(/^#[0-9a-f]{3,8}$/i.test(e||"")?e:we.verde);function ja(e,t={}){if(!(e instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let s=t.placa||"uno";if(!Re[s])throw new Error(`Este prototipo no dibuja la placa \xAB${s}\xBB.`);let i=!!t.soloLectura,r=typeof t.alEvento=="function"?t.alEvento:null,l=[],n=cn(t.circuito,s),h=document.createElement("div");h.className="tecnocircuito",e.appendChild(h);let d=h.attachShadow({mode:"open"});d.innerHTML=`<style>${Yi}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Da} ${Da})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>
</div>`;let u=o=>d.querySelector(o),x=u(".tc"),C=u(".tc-barra"),v=u(".tc-biblioteca"),_=u(".tc-buscar"),b=u(".tc-bib-lista"),E=u(".tc-bib-vacio"),k=u(".tc-ficha"),I=C.querySelector('[data-accion="menu"]'),K=u(".tc-sel"),D=u(".tc-area"),Lt=u(".tc-mundo"),xt=u(".tc-capa-comp"),jt=u(".tc-capa-pines"),A=u(".tc-cables"),nt=u(".tc-asas"),[ht,oo]=u(".tc-previa").children,he=u(".tc-ayuda"),Mt=u(".tc-tip"),B={px:0,py:0,escala:1.5},U=new Map,Ee=new Map,R=null,M=null,T=null,so=null,Bo=null,zs=!1,Vo=!1,_e=!1,io=null,No=!1,et={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},Lo=new Set,qs=[],Hs=[],jo="",q=o=>n.componentes.find(a=>a.id===o),ao=o=>o==="protoboard"?n.protoboard:q(o),pe=o=>!!(o&&Z[o.tipo]&&Z[o.tipo].montada),ro=o=>o==="placa"||pe(q(o))?{x:0,y:0,rot:0}:ao(o);function no(o,a,c){let f=o==="placa"?Re[s]:Z[a],p=document.createElement("div");p.className="tc-comp"+(o==="placa"?" tc-placa":""),p.dataset.id=o,a&&(p.dataset.tipo=a);let m;if(f&&f.dibujo){let w=document.createElement("template");w.innerHTML=f.dibujo.svg(c),m=w.content.firstElementChild}else f?(m=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(m,c),f.perilla&&m.addEventListener("input",()=>gi(o,Number(m.value)/100))):(m=document.createElement("div"),m.className="tc-desconocido",m.textContent=`\xBF${a}?`,m.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");p.appendChild(m);let g=U.get("placa");f&&f.montada&&g?xt.insertBefore(p,g.div.nextSibling):xt.appendChild(p);let S={id:o,def:f,div:p,el:m,w:64,h:40,pines:new Map,lista:!1};return U.set(o,S),Promise.resolve(m.updateComplete).then(()=>{if(U.get(o)===S){if(f&&f.dibujo){let w=f.dibujo.marco?f.dibujo.marco(c):f.dibujo;Object.assign(S,{w:w.ancho,h:w.alto});for(let[O,z]of Object.entries(w.pines)){let X=document.createElement("div");X.className="tc-pin",X.dataset.ref=`${o}.${O}`,jt.appendChild(X),S.pines.set(O,{px:z.x,py:z.y,div:X})}}else if(f){Object.assign(S,ti(m));for(let w of m.pinInfo||[]){let O=f.nombrePin(w.name);if(!O)continue;let z=document.createElement("div");z.className="tc-pin",z.dataset.ref=`${o}.${O}`,jt.appendChild(z),S.pines.set(O,{px:w.x,py:w.y,div:z})}}S.lista=!0,Xt(S),Qs(S)}})}function Gs(){let o=n.protoboard.tipo,a=_t[o]||_t.media,c=document.createElement("div");c.className="tc-comp tc-protoboard",c.dataset.id="protoboard",c.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=Ds(o);let p=f.content.firstElementChild;c.appendChild(p);let m=U.get("placa");xt.insertBefore(c,m?m.div.nextSibling:xt.firstChild);let g={id:"protoboard",def:{protoboard:!0},div:c,el:p,w:a.ancho,h:a.alto,pines:new Map,lista:!0};for(let S of $e(o)){let w=document.createElement("div");w.className="tc-pin tc-hueco",w.dataset.ref="protoboard."+S.nombre,w.style.left=S.x+"px",w.style.top=S.y+"px",c.appendChild(w),g.pines.set(S.nombre,{px:S.x,py:S.y,div:w})}return U.set("protoboard",g),Xt(g),lo(),Promise.resolve()}function Xs(o=null){if(n.protoboard)return;let a=Jo(),c=_t.media;n.protoboard=o?{tipo:"media",x:Math.round(o.x-c.ancho/2),y:Math.round(o.y-c.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,a?a.x1+30:300)),y:30},Gs(),co(),lt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),gt({tipo:"comp",id:"protoboard"}),!_e&&!o&&De(),ct()}function co(){let o=v.querySelector('[data-accion="protoboard"]');if(o){o.disabled=!!n.protoboard,o.title=n.protoboard?"Ya hay una protoboard":"";for(let[a,c]of Object.entries(Z)){if(!c.montada)continue;let f=v.querySelector(`[data-tipo="${a}"]`),p=n.componentes.some(m=>m.tipo===a);f&&Object.assign(f,{disabled:p,title:p?`Ya hay una ${c.nombre}`:""})}}}function Xa(o){let a=U.get(o.id),c=n.protoboard;return!a||!a.lista||!c||!a.pines.size?null:[...a.pines].map(([f,p])=>{let m=Fo(a,o,p);return{nombre:f,x:m.x-c.x,y:m.y-c.y}})}function Ks(o){let a=new Set;for(let c of n.componentes)if(c!==o&&c.en)for(let f of Object.values(c.en))a.add(f.slice(11));return a}function Ys(o){let a=Xa(o);return a?xa(a,{tipo:n.protoboard.tipo,ocupados:Ks(o)}):null}function Wo(o){if(pe(o))return!1;let a=Ys(o);return a?(o.x=Q(o.x+a.dx),o.y=Q(o.y+a.dy),o.en=Object.fromEntries(Object.entries(a.en).map(([c,f])=>[c,"protoboard."+f]))):delete o.en,Xt(U.get(o.id)),lo(),St(),!!a}let Pe=[];function Ka(o){Js();let a=n.protoboard&&Ys(o),c=U.get("protoboard");!a||!c||(Pe=Object.values(a.en).map(f=>c.pines.get(f).div),Pe.forEach(f=>f.classList.add("tc-destino")))}function Js(){Pe.forEach(o=>o.classList.remove("tc-destino")),Pe=[]}function lo(){let o=U.get("protoboard");if(!o)return;let a=Ks(null);for(let[c,f]of o.pines)f.div.classList.toggle("tc-ocupado",a.has(c))}let fo=[];function Zs(o){fo.forEach(g=>g.classList.remove("tc-tira")),fo=[];let a=U.get("protoboard");if(!o||!a)return;let[c,f]=ho(o),p=c==="protoboard"?f:null;if(!p){let g=q(c);g&&g.en&&g.en[f]&&(p=g.en[f].slice(11))}if(!p)return;let m=ks(p);for(let[g,S]of a.pines)ks(g)===m&&(S.div.classList.add("tc-tira"),fo.push(S.div))}function Qs(o){if(o.id==="placa")for(let a of["ledPower","led13","ledTX","ledRX"])o.el[a]=!!et.placa[a];else if(o.def===Z.led){let a=Number(et.leds[o.id])||0;o.el.value=a>.005,o.el.brightness=a,o.div.classList.toggle("tc-quemado",et.quemados.includes(o.id))}else if(o.def&&o.def.mostrar){let a=et.simulando&&(et.piezas[o.id]||et.servos[o.id])||null;o.def.mostrar(o.el,a,(q(o.id)||{}).props)}}function ti(o){let a=o.shadowRoot&&o.shadowRoot.querySelector("svg"),c=a&&Na(a.getAttribute("width")),f=a&&Na(a.getAttribute("height"));return c&&f?{w:c,h:f}:{w:o.offsetWidth||64,h:o.offsetHeight||40}}function Xt(o){if(!o)return;let a=ro(o.id);if(a&&(Object.assign(o.div.style,{left:a.x+"px",top:a.y+"px",width:o.w+"px",height:o.h+"px",transform:a.rot?`rotate(${a.rot}deg)`:""}),o.id!=="protoboard"))for(let c of o.pines.values()){let f=Fo(o,a,c);c.div.style.left=f.x+"px",c.div.style.top=f.y+"px"}}function Fo(o,a,c){let f=((a.rot||0)%360+360)%360;if(!f)return{x:a.x+c.px,y:a.y+c.py};let p=f*Math.PI/180,m=Math.round(Math.cos(p)*1e9)/1e9,g=Math.round(Math.sin(p)*1e9)/1e9,S=o.w/2,w=o.h/2,O=c.px-S,z=c.py-w;return{x:Q(a.x+S+O*m-z*g),y:Q(a.y+w+O*g+z*m)}}function ho(o){let a=o.indexOf(".");return a>0?[o.slice(0,a),o.slice(a+1)]:[o,""]}function Wt(o){let[a,c]=ho(o),f=U.get(a);if(!f||!f.lista)return null;let p=ro(a),m=f.pines.get(c);return m?Fo(f,p,m):f.def?null:{x:p.x+f.w/2,y:p.y+f.h/2}}function Ya(o){let[a,c]=ho(o),f=U.get(a);return f&&f.pines.get(c)}function po(o){let a=Wt(o.de),c=Wt(o.a);return!a||!c?null:[a,...(o.puntos||[]).map(([f,p])=>({x:f,y:p})),c]}function Kt(o,a,c){let f=document.createElementNS(ka,o);for(let p in a)f.setAttribute(p,a[p]);return c.appendChild(f),f}function St(){for(let[o,a]of Ee)n.cables.includes(o)||(a.g.remove(),a.asas.forEach(c=>c.remove()),Ee.delete(o));n.cables.forEach((o,a)=>{let c=Ee.get(o);if(!c){let w=Kt("g",{class:"tc-cable"},A);c={g:w,borde:Kt("path",{class:"tc-cable-borde"},w),linea:Kt("path",{class:"tc-cable-linea"},w),p0:Kt("circle",{class:"tc-punta",r:2.4},w),p1:Kt("circle",{class:"tc-punta",r:2.4},w),toque:Kt("path",{class:"tc-cable-toque"},w),asas:[]},Ee.set(o,c)}let f=po(o);if(c.g.style.display=f?"":"none",!f)return;let p=Ws(f),m=js(o.color);for(let w of[c.borde,c.linea,c.toque])w.setAttribute("d",p);c.linea.setAttribute("stroke",m),c.toque.dataset.i=a,ei(c.p0,f[0],m),ei(c.p1,f[f.length-1],m);let g=!!(R&&R.tipo==="cable"&&R.cable===o);c.g.classList.toggle("tc-seleccionado",g),g&&A.lastChild!==c.g&&A.appendChild(c.g);let S=g?(o.puntos||[]).length:0;for(;c.asas.length>S;)c.asas.pop().remove();for(;c.asas.length<S;)c.asas.push(Kt("circle",{class:"tc-asa",r:3.6},nt));c.asas.forEach((w,O)=>{w.setAttribute("cx",o.puntos[O][0]),w.setAttribute("cy",o.puntos[O][1]),w.dataset.i=a,w.dataset.p=O})})}function ei(o,a,c){o.setAttribute("cx",a.x),o.setAttribute("cy",a.y),o.setAttribute("fill",c)}function ue(){let o=M&&Wt(M.de);if(!o){ht.setAttribute("d",""),oo.setAttribute("d","");return}let a=M.puntos.map(g=>({...g})),c=a.length?a[a.length-1]:o,f=M.cursor?uo(M.cursor,c):c,p=M.destino&&Wt(M.destino);p&&(f=p,si(a,o,p));let m=Ws([o,...a,f]);ht.setAttribute("d",m),oo.setAttribute("d",m),oo.setAttribute("stroke",js(oi()))}function oi(){return M.color||Ts(M.de,M.destino||"")}function uo(o,a){let c=Ua/B.escala;return{x:Q(Math.abs(o.x-a.x)<c?a.x:o.x),y:Q(Math.abs(o.y-a.y)<c?a.y:o.y)}}function si(o,a,c){if(!o.length)return;let f=Ua/B.escala,p=o[o.length-1],m=o.length>1?o[o.length-2]:a;Math.abs(p.y-c.y)<f&&p.y!==m.y&&(p.y=c.y),Math.abs(p.x-c.x)<f&&p.x!==m.x&&(p.x=c.x)}function Ja(o){gt(null),M={de:o,puntos:[],cursor:null,destino:null,color:null},x.classList.add("tc-dibujando"),ri(o,!0),ue(),mo(),Rt()}function zo(){M&&(ri(M.de,!1),M=null,x.classList.remove("tc-dibujando"),ue(),mo(),Rt())}function ii(o){if(we[o]){if(M)M.color=o,ue();else if(R&&R.tipo==="cable"){if(R.cable.color===o)return;R.cable.color=o,St(),ct()}else return;mo()}}function ai(o){let a=M;if(!a)return;if(o===a.de)return zo();let c=Wt(a.de),f=Wt(o);if(c&&f&&si(a.puntos,c,f),zo(),n.cables.some(m=>m.de===a.de&&m.a===o||m.de===o&&m.a===a.de)){cr("Esos dos pines ya est\xE1n unidos.");return}let p={de:a.de,a:o,color:a.color||Ts(a.de,o)};a.puntos.length&&(p.puntos=a.puntos.map(m=>[Q(m.x),Q(m.y)])),n.cables.push(p),lt("cable_agregado",{de:p.de,a:p.a}),gt({tipo:"cable",cable:p}),ct()}function Za(o){let a=M.puntos.length?M.puntos[M.puntos.length-1]:Wt(M.de);M.puntos.push(a?uo(o,a):o),ue(),Rt()}function Qa(){!M||!M.puntos.length||(M.puntos.pop(),ue(),Rt())}function ri(o,a){let c=Ya(o);c&&c.div.classList.toggle("tc-activo",a)}function qo(o){n.cables=n.cables.filter(a=>a!==o),lt("cable_quitado",{de:o.de,a:o.a})}function gt(o){R=o;for(let a of U.values())a.div.classList.toggle("tc-seleccionado",!!o&&o.tipo==="comp"&&o.id===a.id);St(),mo(),Rt()}function mo(){if(Ho(),K.textContent="",i||!R&&!M)return;let o=c=>K.insertAdjacentHTML("beforeend",c),a=c=>Ps.forEach((f,p)=>{let m=we[f],g=fa[f]||f;o(`<button type="button" class="tc-muestra${c===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${p} \xB7 ${g}" aria-label="Cable ${g} (tecla ${p})" style="background:${m};color:${fn(m)}">${p}</button>`)});if(M){o('<span class="tc-etiqueta">Cable nuevo</span>'),a(oi());return}if(R.tipo==="cable")o('<span class="tc-etiqueta">Cable</span>'),a(R.cable.color);else if(R.id==="protoboard")o(`<span class="tc-etiqueta">${(_t[n.protoboard.tipo]||_t.media).nombre}</span>`);else{let c=q(R.id),f=Z[c.tipo],p=U.get(c.id);o(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),pe(c)||o('<button type="button" data-accion="girar">Girar</button>')}o('<button type="button" data-accion="borrar">Borrar</button>')}let Te=null,wt=o=>String(o).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Ho(){let o=R&&R.tipo==="comp"&&!M?R.id==="protoboard"?"protoboard":(q(R.id)||{}).tipo:null,a=o&&Qe[o];if(k.hidden=!a||!v.hidden,!a)return k.textContent="";Te===null&&D.clientWidth&&(Te=D.clientWidth>=900);let c=Te!==!1,f=R.id==="protoboard"?null:q(R.id),p=f&&Z[f.tipo],m=f&&U.get(f.id),g="";if(f&&p&&!i){for(let S of p.campos||(p.campo?[p.campo]:[])){let w=String(f.props[S.prop]),O=S.opciones.map(([z,X])=>`<option value="${z}"${w===String(z)?" selected":""}>${X}</option>`).join("");g+=`<label class="tc-campo">${S.etiqueta} <select data-prop="${S.prop}">${O}</select></label>`}if(p.perilla){let S=Math.round((Number(f.props[p.perilla.prop])||0)*100);g+=`<label class="tc-campo">${p.perilla.etiqueta} <input type="range" min="0" max="100" value="${S}" data-perilla aria-label="${p.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let S=m&&m.el.value?" checked":"";g+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${S}> Ver encendido</label>`}}k.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${c}" aria-label="Ficha de ${wt(a.nombre)}: ${c?"ocultar los detalles":"ver los detalles"}"><span>${wt(a.nombre)}${f?` <small>${wt(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${c?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${c||g?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${c?"":" hidden"}>${wt(a.descripcion)}</p>`+(g?`<div class="tc-ficha-props">${g}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${c?"":" hidden"}></div></div>`,Go(),ni()}function ni(){if(k.hidden||!R)return;let o=U.get(R.id),a=R.id==="protoboard"?n.protoboard:q(R.id),c=!1;o&&a&&(c=B.px+(a.x+o.w/2)*B.escala>D.clientWidth/2),k.classList.toggle("tc-ficha-izq",c)}function Go(){let o=k.querySelector(".tc-ficha-datos");if(!o||!R)return;let a=R.id==="protoboard"?"protoboard":(q(R.id)||{}).tipo,c=Qe[a];if(!c)return;let f=R.id==="protoboard"?{}:q(R.id).props||{},p=c.validacion(f);o.innerHTML=`<dl>${c.datos(f).map(([m,g])=>`<dt>${wt(m)}</dt><dd>${wt(g)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${wt(c.pines)}</p>`+(p?`<p class="tc-ficha-val ${p.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${p.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${wt(p.texto)}</p>`:"")}k.addEventListener("click",o=>{o.target.closest('[data-accion="ficha"]')&&(Te=Te===!1,Ho(),k.querySelector(".tc-ficha-titulo").focus())});let ci=!1;function li(){if(!ci){ci=!0;for(let o of Ls){let a=document.createElement("div");a.className="tc-bib-cat",a.innerHTML=`<div class="tc-bib-titulo">${o.nombre}</div>`;for(let c of o.piezas){let f=Qe[c],p=document.createElement("button");p.type="button",p.className="tc-pieza",p.dataset.accion=c==="protoboard"?"protoboard":"agregar",c!=="protoboard"&&(p.dataset.tipo=c),p.dataset.pieza=c,p.setAttribute("aria-label",f.nombre),p.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${wt(f.nombre)}</b><small>${wt(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,p.querySelector(".tc-mini").append(tr(c)),a.append(p)}b.append(a)}}}function tr(o){let a=document.createElement("template");if(o==="protoboard")return a.innerHTML=Ds("media"),a.content.firstElementChild;let c=Z[o];if(c.dibujo)return a.innerHTML=c.dibujo.svg(o==="motor_tt"?{...c.props,vista:"rueda"}:c.props),a.content.firstElementChild;let f=document.createElement(c.etiqueta);return c.aplicar&&c.aplicar(f,Pt(c.props)),Promise.resolve(f.updateComplete).then(()=>{let p=ti(f);f.style.zoom=String(Math.min(1,58/p.w,42/p.h))}),f.inert=!0,f}function di(){let o=new Set(Ia(_.value).map(a=>a.tipo));for(let a of b.querySelectorAll(".tc-pieza"))a.hidden=!o.has(a.dataset.pieza);for(let a of b.querySelectorAll(".tc-bib-cat"))a.hidden=!a.querySelector(".tc-pieza:not([hidden])");E.hidden=o.size>0,E.textContent=o.size?"":`No hay piezas con \xAB${_.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}_.addEventListener("input",di),_.addEventListener("keydown",o=>{if(o.key!=="Enter")return;let a=b.querySelector(".tc-pieza:not([hidden]):not([disabled])");a&&a.click()});let pt=null,Xo=!1;v.addEventListener("pointerdown",o=>{let a=o.target.closest(".tc-pieza");!a||a.disabled||i||o.button!==0||(pt={b:a,x0:o.clientX,y0:o.clientY,fantasma:null},a.setPointerCapture(o.pointerId))}),v.addEventListener("pointermove",o=>{if(!pt)return;if(!pt.fantasma){if(Math.hypot(o.clientX-pt.x0,o.clientY-pt.y0)<Oa)return;let c=document.createElement("div");c.className="tc-fantasma",c.append(pt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),x.append(c),pt.fantasma=c,v.classList.add("tc-arrastrando")}let a=x.getBoundingClientRect();pt.fantasma.style.left=o.clientX-a.left+"px",pt.fantasma.style.top=o.clientY-a.top+"px"});function fi(o,a){if(!pt)return;let{b:c,fantasma:f}=pt;if(pt=null,v.classList.remove("tc-arrastrando"),!f||(f.remove(),Xo=!0,setTimeout(()=>Xo=!1,0),a))return;let p=D.getBoundingClientRect(),m=v.getBoundingClientRect(),g=S=>o.clientX>=S.left&&o.clientX<=S.right&&o.clientY>=S.top&&o.clientY<=S.bottom;!g(p)||g(m)||(Me(!1),c.dataset.accion==="protoboard"?Xs(ke(o)):hi(c.dataset.tipo,ke(o)))}v.addEventListener("pointerup",o=>fi(o,!1)),v.addEventListener("pointercancel",o=>fi(o,!0));function hi(o,a=null){let c=Z[o];if(!c)return;let f=1;for(;q(c.prefijo+f);)f++;let p=c.prefijo+f,m=(D.clientWidth/2-B.px)/B.escala,g=(D.clientHeight/2-B.py)/B.escala,S=n.componentes.length%4*14,w={id:p,tipo:o,x:c.montada?0:Math.round(m-20+S),y:c.montada?0:Math.round(g-20+S),rot:0,props:Pt(c.props)};n.componentes.push(w),no(p,o,w.props).then(()=>{let O=U.get(p);a&&O&&!c.montada&&q(p)===w&&(w.x=Math.round(a.x-O.w/2),w.y=Math.round(a.y-O.h/2),Xt(O),St(),ct()),n.protoboard&&q(p)===w&&Wo(w)&&(lt("componente_cambiado",{id:p,x:w.x,y:w.y,en:Pt(w.en)}),ct())}),lt("componente_agregado",{id:p,tipo:o}),gt({tipo:"comp",id:p}),ct()}function er(o){let a=U.get(o.id);if(a){a.div.remove();for(let c of a.pines.values())c.div.remove();U.delete(o.id)}no(o.id,o.tipo,o.props).then(()=>{St(),R&&R.id===o.id&&gt({tipo:"comp",id:o.id})})}function pi(){if(!R||R.tipo!=="comp"||R.id==="protoboard")return;let o=q(R.id);pe(o)||(o.rot=((o.rot||0)+90)%360,Xt(U.get(o.id)),n.protoboard&&Wo(o),St(),lt("componente_cambiado",{id:o.id,rot:o.rot,en:o.en?Pt(o.en):null}),ct())}function ui(){if(R){if(R.tipo==="cable")qo(R.cable);else if(R.id==="protoboard"){n.cables.filter(a=>a.de.startsWith("protoboard.")||a.a.startsWith("protoboard.")).forEach(a=>qo(a));for(let a of n.componentes)delete a.en;n.protoboard=null;let o=U.get("protoboard");o&&(o.div.remove(),U.delete("protoboard")),fo=[],Pe=[],co(),lt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let o=q(R.id),a=U.get(R.id);if(n.cables.filter(c=>c.de.startsWith(o.id+".")||c.a.startsWith(o.id+".")).forEach(c=>qo(c)),n.componentes=n.componentes.filter(c=>c!==o),a){a.div.remove();for(let c of a.pines.values())c.div.remove();U.delete(o.id)}lt("componente_quitado",{id:o.id,tipo:o.tipo}),lo()}bo(),gt(null),ct()}}function Me(o){v.hidden=!o,Ho(),I.setAttribute("aria-expanded",String(o)),o&&(li(),co(),di(),_.focus({preventScroll:!0}))}v.addEventListener("click",o=>{let a=o.target.closest("button[data-accion]");if(!(!a||Xo)){if(Me(!1),a.dataset.accion==="cerrar")return I.focus();mi(a)}}),v.addEventListener("keydown",o=>{o.key==="Escape"&&(o.stopPropagation(),Me(!1),I.focus())}),d.addEventListener("pointerdown",o=>{!v.hidden&&!o.target.closest(".tc-biblioteca")&&o.target!==I&&Me(!1)}),C.addEventListener("click",o=>{let a=o.target.closest("button[data-accion]");if(a){if(a.dataset.accion==="menu")return Me(v.hidden);mi(a)}});function mi(o){let a=o.dataset.accion;if(a==="acercar")return Yo(1.25);if(a==="alejar")return Yo(.8);if(a==="encuadrar")return _e=!1,De();i||(a==="agregar"?hi(o.dataset.tipo):a==="protoboard"?Xs():a==="girar"?pi():a==="borrar"?ui():a==="color"&&(ii(o.dataset.color),D.focus({preventScroll:!0})))}function or(o){if(i||!R||R.tipo!=="comp")return;let a=q(R.id),c=U.get(R.id),f=Z[a.tipo];if(o.target.dataset.accion==="encender"){c.el.value=o.target.checked;return}let p=o.target.dataset.prop;if(!p||!f)return;let m=typeof f.props[p],g=m==="number"?Number(o.target.value):m==="boolean"?o.target.value==="true":o.target.value;a.props={...a.props,[p]:g},f.dibujo&&f.dibujo.marco?er(a):f.aplicar(c.el,a.props),Go(),lt("componente_cambiado",{id:a.id,props:Pt(a.props)}),ct()}function sr(o){if(i||!R||R.tipo!=="comp"||!("perilla"in o.target.dataset))return;let a=U.get(R.id);gi(R.id,Number(o.target.value)/100),a&&Z.potenciometro.aplicar(a.el,q(R.id).props)}for(let o of[C,k])o.addEventListener("change",or),o.addEventListener("input",sr);function Ie(o,a,c){let f=U.get(o);if(f&&(f.el.pressed=a),a)Lo.add(o);else if(!Lo.delete(o))return;for(let p of qs)try{p(o,a)}catch(m){console.error(m)}!a&&c!==void 0&&lt("boton_pulsado",{id:o,ms:Math.round(c)})}let xi=new Map;function gi(o,a){let c=q(o),f=U.get(o);if(!c)return;let p=Z[c.tipo];if(i)return f&&p.aplicar(f.el,c.props);let m=Math.max(0,Math.min(1,Math.round(a*100)/100));if(m===c.props[p.perilla.prop])return;c.props={...c.props,[p.perilla.prop]:m};let g=R&&R.tipo==="comp"&&R.id===o&&k.querySelector("[data-perilla]");g&&Number(g.value)!==Math.round(m*100)&&(g.value=Math.round(m*100)),R&&R.id===o&&Go(),ct(),clearTimeout(xi.get(o)),xi.set(o,setTimeout(()=>lt("componente_cambiado",{id:o,props:Pt(c.props)}),400))}function ke(o){let a=D.getBoundingClientRect();return{x:(o.clientX-a.left-B.px)/B.escala,y:(o.clientY-a.top-B.py)/B.escala}}function Ko(o){try{D.setPointerCapture(o.pointerId)}catch{}}function xo(o,a={}){T={tipo:"paneo",x0:o.clientX,y0:o.clientY,px0:B.px,py0:B.py,movido:!1,...a},Ko(o)}D.addEventListener("pointerdown",o=>{if(o.pointerType==="mouse"&&o.button!==0)return;D.focus({preventScroll:!0}),bo();let a=o.target,c=ke(o);if(i)return xo(o);let f=a.closest(".tc-pin");if(f){if(o.preventDefault(),M)return ai(f.dataset.ref);Ja(f.dataset.ref),T={tipo:"pin",ref:f.dataset.ref,x0:o.clientX,y0:o.clientY,movido:!1};return}if(M)return xo(o,{punto:c});let p=a.closest(".tc-asa");if(p)return T={tipo:"asa",cable:n.cables[+p.dataset.i],k:+p.dataset.p,x0:o.clientX,y0:o.clientY,movido:!1},Ko(o);let m=a.closest(".tc-cable-toque");if(m)return gt({tipo:"cable",cable:n.cables[+m.dataset.i]});let g=a.closest(".tc-comp");if(g&&g.dataset.id!=="placa"){let S=g.dataset.id,w=ao(S);if(w.tipo==="pulsador"&&(o.preventDefault(),et.simulando)){Ie(S,!0),T={tipo:"pulsar",id:S,x0:o.clientX,y0:o.clientY,movido:!1,desde:performance.now()};return}return gt({tipo:"comp",id:S}),pe(w)?xo(o):Z[w.tipo]&&Z[w.tipo].perilla&&o.composedPath().some(pn)?void 0:(T={tipo:"mover",id:S,dx:c.x-w.x,dy:c.y-w.y,x0:o.clientX,y0:o.clientY,movido:!1},Ko(o))}gt(null),xo(o)}),D.addEventListener("pointermove",o=>{let a=ke(o);if(T&&T.tipo==="pulsar"&&!(o.target.closest&&o.target.closest(`.tc-comp[data-id="${T.id}"]`))){let c=T;T=null,Ie(c.id,!1,performance.now()-c.desde)}if(T){if(!T.movido&&Math.hypot(o.clientX-T.x0,o.clientY-T.y0)>Oa&&(T.movido=!0,k.classList.add("tc-ficha-quieta")),T.movido&&T.tipo==="mover"){let c=ao(T.id),f=Math.round(a.x-T.dx),p=Math.round(a.y-T.dy);if(T.id==="protoboard")for(let m of n.componentes)m.en&&(m.x=Q(m.x+f-c.x),m.y=Q(m.y+p-c.y),Xt(U.get(m.id)));c.x=f,c.y=p,Xt(U.get(T.id)),T.id!=="protoboard"&&n.protoboard&&Ka(c),St()}else if(T.movido&&T.tipo==="paneo")_e=!0,B.px=T.px0+o.clientX-T.x0,B.py=T.py0+o.clientY-T.y0,D.classList.add("tc-paneando"),go();else if(T.movido&&T.tipo==="asa"){let c=po(T.cable),f=uo(a,c[T.k]);f=uo(f,c[T.k+2]),T.cable.puntos[T.k]=[f.x,f.y],St()}}if(M){let c=o.target.closest&&o.target.closest(".tc-pin");M.cursor=a,M.destino=c&&c.dataset.ref!==M.de?c.dataset.ref:null,ue()}(!T||T.tipo==="pin")&&nr(o.target.closest&&o.target.closest(".tc-pin")),et.simulando&&bi(o.target)});function bi(o){let a=[],c=o&&o.closest&&o.closest(".tc-pin"),f=o&&o.closest&&o.closest(".tc-cable-toque");c?a=[c.dataset.ref]:f&&n.cables[+f.dataset.i]&&(a=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let p=a.join("|");if(p!==jo){jo=p;for(let m of Hs)m(a)}}function yi(o){let a=T;if(T=null,D.classList.remove("tc-paneando"),k.classList.remove("tc-ficha-quieta"),a&&a.movido&&a.tipo==="mover"&&ni(),!!a){if(a.tipo==="pulsar")return Ie(a.id,!1,performance.now()-a.desde);if(a.tipo==="mover"&&a.movido){let c=ao(a.id);a.id==="protoboard"?lt("componente_cambiado",{id:"protoboard",x:c.x,y:c.y}):(Js(),(n.protoboard||c.en)&&Wo(c),lt("componente_cambiado",{id:a.id,x:c.x,y:c.y,en:c.en?Pt(c.en):null})),ct()}else if(a.tipo==="asa"&&a.movido)ct();else if(a.tipo==="paneo"&&!a.movido&&a.punto&&M)Za(a.punto);else if(a.tipo==="pin"&&a.movido&&M&&o.type==="pointerup"){let c=d.elementFromPoint(o.clientX,o.clientY),f=c&&c.closest(".tc-pin");f&&f.dataset.ref!==a.ref&&ai(f.dataset.ref)}}}D.addEventListener("pointerup",yi),D.addEventListener("pointercancel",yi),D.addEventListener("pointerleave",()=>{if(bo(),jo&&bi(null),T&&T.tipo==="pulsar"){let o=T;T=null,Ie(o.id,!1,performance.now()-o.desde)}}),D.addEventListener("dblclick",o=>{if(i||M)return;let a=d.elementFromPoint(o.clientX,o.clientY)||o.target,c=a.closest(".tc-asa"),f=a.closest(".tc-cable-toque");if(c){let p=n.cables[+c.dataset.i];p.puntos.splice(+c.dataset.p,1),p.puntos.length||delete p.puntos,St(),Rt(),ct()}else if(f){let p=n.cables[+f.dataset.i],m=po(p),g=ke(o),S=0,w=g,O=1/0;for(let z=0;z<m.length-1;z++){let X=hn(g,m[z],m[z+1]);to(g,X)<O&&(O=to(g,X),S=z,w=X)}(p.puntos=p.puntos||[]).splice(S,0,[Q(w.x),Q(w.y)]),gt({tipo:"cable",cable:p}),ct()}}),D.addEventListener("wheel",o=>{o.preventDefault();let a=D.getBoundingClientRect(),c=Math.min(1.5,Math.max(.66,Math.exp(-o.deltaY*.0015)));Yo(c,o.clientX-a.left,o.clientY-a.top)},{passive:!1}),x.addEventListener("keydown",o=>{if(o.target.closest&&o.target.closest("select, input"))return;let a=!o.ctrlKey&&!o.metaKey&&!o.altKey,c=!0;o.key==="Escape"?M?zo():gt(null):i?c=!1:o.key==="Delete"||o.key==="Backspace"?(o.preventDefault(),M?Qa():ui()):(o.key==="r"||o.key==="R")&&a?pi():/^[0-9]$/.test(o.key)&&a&&(M||R&&R.tipo==="cable")?ii(Ps[Number(o.key)]):c=!1,c&&o.stopPropagation()});function go(){Lt.style.transform=`translate(${B.px}px, ${B.py}px) scale(${B.escala})`;let o=rn*B.escala;D.style.backgroundSize=`${o}px ${o}px`,D.style.backgroundPosition=`${B.px}px ${B.py}px`,bo()}function Yo(o,a,c){_e=!0,a===void 0&&(a=D.clientWidth/2,c=D.clientHeight/2);let f=Math.min(nn,Math.max(Ba,B.escala*o)),p=(a-B.px)/B.escala,m=(c-B.py)/B.escala;Object.assign(B,{escala:f,px:a-p*f,py:c-m*f}),go()}function Jo(){let o=1/0,a=1/0,c=-1/0,f=-1/0,p=(m,g)=>{o=Math.min(o,m),a=Math.min(a,g),c=Math.max(c,m),f=Math.max(f,g)};for(let m of U.values()){let g=ro(m.id);if(!g)continue;let S=(g.rot||0)%180!==0,w=(S?m.h:m.w)/2,O=(S?m.w:m.h)/2;p(g.x+m.w/2-w,g.y+m.h/2-O),p(g.x+m.w/2+w,g.y+m.h/2+O)}for(let m of n.cables)for(let[g,S]of m.puntos||[])p(g,S);return isFinite(o)?{x0:o,y0:a,x1:c,y1:f}:null}function De(){let o=D.clientWidth,a=D.clientHeight;if(!o||!a)return!1;let c=Jo();if(!c)return!1;let{x0:f,y0:p,x1:m,y1:g}=c,S=48,w=Math.min((o-2*S)/(m-f||1),(a-2*S)/(g-p||1)),O=Math.min(2.4,Math.max(Ba,w));return Object.assign(B,{escala:O,px:o/2-(f+m)/2*O,py:a/2-(p+g)/2*O}),io={ancho:o,alto:a},go(),!0}function ir(){let o=Jo()||{x0:0,y0:0,x1:100,y1:100},a=12,c=16,f=Math.max(an,Math.ceil(o.x1-o.x0+2*a)),p=Math.ceil(o.y1-o.y0+2*a)+c,m=[`<svg xmlns="${ka}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${p}" viewBox="0 0 ${f} ${p}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${p}" fill="#ffffff"/>`,`<g transform="translate(${Q(a-o.x0)} ${Q(a-o.y0)})">`];for(let g of xt.children){let S=U.get(g.dataset.id);S&&S.lista&&m.push(ar(S))}for(let g of n.cables){let S=po(g);if(!S)continue;let w=Ws(S),O=js(g.color),z=X=>`<circle cx="${X.x}" cy="${X.y}" r="2.4" fill="${O}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;m.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${w}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${w}" stroke="${O}" stroke-width="3"/>${z(S[0])}${z(S[S.length-1])}</g>`)}return m.push("</g>",`<text x="${f-a}" y="${p-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${Va(sn)}</text>`,"</svg>"),m.join(`
`)}function ar(o){let a=ro(o.id);if(!a)return"";let c=a.rot?`translate(${a.x+o.w/2} ${a.y+o.h/2}) rotate(${a.rot}) translate(${-o.w/2} ${-o.h/2})`:`translate(${a.x} ${a.y})`;if(!o.def){let Yt=Va((q(o.id)||{}).tipo||"");return`<g transform="${c}"><rect width="${o.w}" height="${o.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${o.w/2}" y="${o.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${Yt}?</text></g>`}let f=o.el.shadowRoot?o.el.shadowRoot.querySelector("svg"):o.el.tagName&&o.el.tagName.toLowerCase()==="svg"?o.el:null;if(!f)return"";let p=f.cloneNode(!0),m=[],g=document.createTreeWalker(p,NodeFilter.SHOW_COMMENT);for(;g.nextNode();)m.push(g.currentNode);m.forEach(Yt=>Yt.remove());let S=/--knob-angle:\s*(-?[\d.]+)deg/.exec(p.getAttribute("style")||""),w=p.querySelector("#rotating");S&&w&&w.setAttribute("transform",`rotate(${S[1]} 10 8)`),p.setAttribute("width",Q(o.w)),p.setAttribute("height",Q(o.h)),p.removeAttribute("id");let O="tc-"+o.id,z=[...new Set([...p.querySelectorAll("[id]")].map(Yt=>Yt.id))],X=new XMLSerializer().serializeToString(p);for(let Yt of z)X=ln(X,Yt,O);X=X.replace(/^<svg\b/,`<svg id="${O}"`);let Si=o.el.shadowRoot?dn(o.el,O,z):"";return`<g transform="${c}">${Si?`<style><![CDATA[
${Si}
]]></style>`:""}${X}</g>`}function rr(o){let[a,c]=ho(o);if(a==="placa")return Re[s].rotulo(c);if(a==="protoboard")return ma(c);let f=q(a),p=f&&Z[f.tipo],m=f&&f.en&&f.en[c]?` \xB7 en el hueco ${f.en[c].slice(11)}`:"";return p?`${p.nombre}: ${p.rotulo(c)}${m}`:c}function nr(o){let a=o?o.dataset.ref:null;if(a===so)return;so=a,Zs(a);let c=a&&Wt(a);if(!c){Mt.hidden=!0;return}let f=B.py+c.y*B.escala,p=et.voltajes[a],m=p===void 0?"":p===null?" \xB7 al aire":` \xB7 ${p.toFixed(2).replace(".",",")} V`;Mt.textContent=rr(a)+m,Mt.style.left=B.px+c.x*B.escala+"px",Mt.style.top=f+"px",Mt.classList.toggle("tc-abajo",f<44),Mt.hidden=!1}function bo(){so=null,Mt.hidden=!0,Zs(null)}function Rt(){clearTimeout(Bo),he.classList.remove("tc-aviso");let o=R&&R.tipo==="cable"&&R.cable.puntos&&R.cable.puntos.length;he.textContent=i?"Solo lectura: puedes mover la vista y hacer zoom.":M?M.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":o?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":R&&R.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":R&&pe(q(R.id))?"Va montada sobre el Uno: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla":R&&R.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":R&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":R?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":et.simulando&&n.componentes.some(a=>a.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function cr(o){Rt(),he.textContent=o,he.classList.add("tc-aviso"),Bo=setTimeout(Rt,2500)}function lt(o,a){if(r)try{r({t:Date.now(),origen:"circuito",tipo:o,datos:a})}catch(c){console.error(c)}}function ct(){let o=Pt(n);for(let a of l)try{a(o)}catch(c){console.error(c)}}function Ci(o){x.classList.toggle("tc-oscuro",o==="oscuro"),x.classList.toggle("tc-claro",o==="claro")}let lr={circuito:()=>Pt(n),alCambiar(o){typeof o=="function"&&l.push(o)},ponerPlaca(o){if(o!==s)throw new Error(`Este prototipo solo dibuja la placa \xAB${s}\xBB.`)},ponerTema:Ci,exportarSVG:ir,exportarNetlist:o=>ya(n,o),_alPulsar(o){typeof o=="function"&&qs.push(o)},_alAcercar(o){typeof o=="function"&&Hs.push(o)},_mostrar(o){let a=et.simulando;et={simulando:!!o.simulando,leds:o.leds||{},quemados:o.quemados||[],voltajes:o.voltajes||{},placa:o.placa||{},servos:o.servos||{},piezas:o.piezas||{}},a!==et.simulando&&(x.classList.toggle("tc-simulando",et.simulando),et.simulando||[...Lo].forEach(c=>Ie(c,!1)),Rt()),so=null;for(let c of U.values())c.lista&&Qs(c)},destruir(){No=!0,vi.disconnect(),clearTimeout(Bo),l.length=0,U.clear(),Ee.clear(),h.remove()}};t.tema&&Ci(t.tema),i&&x.classList.add("tc-solo-lectura"),go(),Rt();let vi=new ResizeObserver(()=>{if(!zs||No)return;if(!Vo){Vo=De();return}if(_e||!io)return;let o=(a,c)=>Math.abs(a-c)/Math.max(1,c);(o(D.clientWidth,io.ancho)>.1||o(D.clientHeight,io.alto)>.1)&&De()});vi.observe(D);let dr=no("placa");return i||li(),co(),Promise.all([dr,...n.protoboard?[Gs()]:[],...n.componentes.map(o=>no(o.id,o.tipo,o.props))]).then(()=>{No||(zs=!0,lo(),St(),Vo=De())}),lr}function cn(e,t){let s=e&&typeof e=="object"?Pt(e):{};s.formato=s.formato||1,s.placa=t;let i=new Set;s.componentes=(Array.isArray(s.componentes)?s.componentes:[]).filter(r=>r&&typeof r.id=="string"&&r.id&&r.id!=="placa"&&!r.id.includes(".")&&!i.has(r.id)&&i.add(r.id));for(let r of s.componentes){r.x=Number(r.x)||0,r.y=Number(r.y)||0,r.rot=Number(r.rot)||0;let l=Z[r.tipo]?Z[r.tipo].props:{};r.props={...l,...r.props&&typeof r.props=="object"?r.props:{}}}s.cables=(Array.isArray(s.cables)?s.cables:[]).filter(r=>r&&typeof r.de=="string"&&typeof r.a=="string");for(let r of s.cables){let l=Array.isArray(r.puntos)&&r.puntos.every(n=>Array.isArray(n)&&n.length===2&&n.every(Number.isFinite));"puntos"in r&&!l&&delete r.puntos}!s.protoboard||typeof s.protoboard!="object"?s.protoboard=null:(typeof s.protoboard.tipo!="string"&&(s.protoboard.tipo="media"),s.protoboard.x=Number(s.protoboard.x)||0,s.protoboard.y=Number(s.protoboard.y)||0);for(let r of s.componentes){let l=s.protoboard&&r.en&&typeof r.en=="object"&&Object.values(r.en).every(n=>typeof n=="string"&&n.startsWith("protoboard."));"en"in r&&!l&&delete r.en}return s}var Wa=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Va=e=>String(e).replace(/[<>&"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[t]);function ln(e,t,s){let i=Wa(t),r=`${s}-${t}`;return e.replace(new RegExp(`(\\s)id="${i}"`,"g"),(l,n)=>`${n}id="${r}"`).replace(new RegExp(`url\\(#${i}\\)`,"g"),()=>`url(#${r})`).replace(new RegExp(`href="#${i}"`,"g"),()=>`href="#${r}"`)}function dn(e,t,s){let i=e.shadowRoot,r=[...i.adoptedStyleSheets||[]];i.querySelectorAll("style").forEach(n=>n.sheet&&r.push(n.sheet));let l=[];for(let n of r){let h;try{h=n.cssRules}catch{continue}for(let d of h){if(!d.selectorText||!d.style)continue;let u=d.selectorText.split(",").map(C=>C.trim()).filter(C=>!/:host|\binput\b|:focus|\.hide-input/.test(C));if(!u.length)continue;let x=u.map(C=>{let v=C;for(let _ of s)v=v.replace(new RegExp(`#${Wa(_)}(?![\\w-])`,"g"),()=>`#${t}-${_}`);return/^svg\b/.test(v)?v.replace(/^svg\b/,`#${t}`):`#${t} ${v}`});l.push(`${x.join(", ")} { ${d.style.cssText} }`)}}return l.join(`
`)}function fn(e){let[t,s,i]=[1,3,5].map(r=>parseInt(e.slice(r,r+2),16)/255);return .2126*t+.7152*s+.0722*i>.55?"#1d2733":"#ffffff"}function Na(e){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(e||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function Ws(e){let t=i=>`${Q(i.x)} ${Q(i.y)}`,s=`M${t(e[0])}`;for(let i=1;i<e.length-1;i++){let r=e[i-1],l=e[i],n=e[i+1],h=Math.min(5,to(r,l)/2,to(l,n)/2);s+=` L${t(La(l,r,h))} Q${t(l)} ${t(La(l,n,h))}`}return`${s} L${t(e[e.length-1])}`}function La(e,t,s){let i=to(e,t);return i?{x:e.x+(t.x-e.x)*s/i,y:e.y+(t.y-e.y)*s/i}:e}function hn(e,t,s){let i=s.x-t.x,r=s.y-t.y,l=i*i+r*r,n=l?Math.max(0,Math.min(1,((e.x-t.x)*i+(e.y-t.y)*r)/l)):0;return{x:t.x+n*i,y:t.y+n*r}}function pn(e){return!e||!e.getAttribute?!1:e.id==="knob"||e.id==="rotating"?!0:e.tagName==="ellipse"&&Number(e.getAttribute("rx"))>5}function Fa(e){let t=new Uint8Array(32768),s=0,i=!1;for(let[r,l]of String(e).split(/\r?\n/).entries()){let n=l.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${r+1}).`);let h=n.slice(1).match(/../g).map(_=>parseInt(_,16));if(h.reduce((_,b)=>_+b,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${r+1}).`);let[d,u,x,C]=h,v=h.slice(4,4+d);if(C===0){let _=s+(u<<8|x);if(_+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set(v,_)}else if(C===1){i=!0;break}else C===2?s=(v[0]<<8|v[1])<<4:C===4&&(s=(v[0]<<8|v[1])<<16)}if(!i)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var un=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],Fs='(()=>{function be(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var wo=256,yo=128,Jt=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+wo),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(yo),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,o=255){let i=this.writeHooks[e];i&&i(s,this.data[e],e,o)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:o,enableRegister:i,enableMask:a}=e;e.inverseFlag?this.data[s]&=~o:this.data[s]|=o,this.data[i]&a&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:o,flagRegister:i,flagMask:a,inverseFlag:n}=e;if(s&o){let r=this.data[i]&a;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:o},i=!0){i&&(this.data[s]&=~o);let{pendingInterrupts:a,maxInterrupt:n}=this;if(a[e]&&(a[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(a[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:o,flagMask:i}=e;s&i&&(this.data[o]&=~i,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:o}=this;s=this.cycles+Math.max(1,s);let i=o.pop(),a=i??{cycles:s,callback:e,next:null};a.cycles=s,a.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<s;)r=n,n=n.next;return r?(r.next=a,a.next=n):(this.nextClockEvent=a,a.next=n),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:o}=this,i=null;for(;s;){if(s.callback===e)return i?i.next=s.next:this.nextClockEvent=s.next,o.length<10&&o.push(s),!0;i=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let o=this.pendingInterrupts[s];be(this,o.address),o.constant||this.clearInterrupt(o)}}};function Qt(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Me(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o+(t.data[95]&1),a=i&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^o)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i&256?1:0,n|=1&(s&o|o&~a|~a&s)?32:0,t.data[95]=n}else if((e&64512)===3072){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o&255;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(i^o)&(i^s)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=s+o&256?1:0,a|=1&(s&o|o&~i|~i&s)?32:0,t.data[95]=a}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=o+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,i,!0);let a=t.data[95]&224;a|=i?0:2,a|=32768&i?4:0,a|=~o&i&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=~i&o&32768?1:0,t.data[95]=a,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65039)===37893){let s=t.data[(e&496)>>4],o=s>>>1|128&s;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,o=(e&496)>>4;t.data[o]=~(1<<s)&t.data[o]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],o=e&7;t.data[95]=t.data[95]&191|(s>>o&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,o=t.pc+2,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=s-1,t.cycles+=a?4:3}else if((e&65280)===38912){let s=e&248,o=e&7,i=t.readData((s>>3)+32),a=1<<o;t.writeData((s>>3)+32,i&~a,a)}else if((e&65039)===37888){let s=(e&496)>>4,o=255-t.data[s];t.data[s]=o;let i=t.data[95]&225|1;i|=o?0:2,i|=128&o?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===5120){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=((s^o)&(s^i)&128)!==0?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===1024){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.pc+=o,t.cycles+=o}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],o=s-1;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===128?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(e===38169){let s=t.pc+1,o=t.dataView.getUint16(93,!0),i=t.data[92];t.data[o]=s&255,t.data[o-1]=s>>8&255,t.data[o-2]=s>>16&255,t.dataView.setUint16(93,o-3,!0),t.pc=(i<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|o],t.dataView.setUint16(30,o+1,!0),o===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setUint16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.dataView.getInt8((e&7)+16),i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?2:0)|(s*o&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[o]=s&255,t.data[o-1]=s>>8&255,i&&(t.data[o-2]=s>>16&255),t.dataView.setUint16(93,o-(i?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=i?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],o=s+1&255;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===127?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i&255-o),t.data[s]=i}else if((e&65039)===37381){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i|o),t.data[s]=i}else if((e&65039)===37383){let s=t.data[(e&496)>>4],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^o),t.data[(e&496)>>4]=o}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],o=s>>>1;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),o=2*((e&240)>>4);t.data[o]=t.data[s],t.data[o+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,o=t.data[s],i=0-o;t.data[s]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=i===128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i?1:0,a|=1&(i|o)?32:0,t.data[95]=a}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),o=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc+=s,t.cycles+=a?3:2}else if(e===38152){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],o=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=1&s?1:0,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===2048){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);t.data[(e&496)>>4]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=t.data[95],a=s-o-(i&1);t.data[((e&240)>>4)+16]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&65280)===39424){let s=((e&248)>>3)+32,o=1<<(e&7);t.writeData(s,t.readData(s)|o,o),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let o=t.progMem[t.pc+1],i=Qt(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let o=t.progMem[t.pc+1],i=Qt(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=e&15|(e&192)>>2,a=o-i;t.dataView.setUint16(s,a,!0);let n=t.data[95]&192;n|=a?0:2,n|=32768&a?4:0,n|=o&~a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>o?1:0,n|=1&(~o&i|i&a|a&~o)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],o=Qt(s)?2:1;t.cycles+=o,t.pc+=o}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],o=t.progMem[t.pc+1];t.writeData(o,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.writeData(o,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0);t.writeData(o,s),t.dataView.setUint16(28,o+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o;t.data[((e&240)>>4)+16]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&65039)===37890){let s=(e&496)>>4,o=t.data[s];t.data[s]=(15&o)<<4|(240&o)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,o=t.data[s],i=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=o,t.data[s]=i}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var tt;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(tt||(tt={}));var F;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(F||(F={}));var fs={0:{type:F.SingleEnded,channel:0},1:{type:F.SingleEnded,channel:1},2:{type:F.SingleEnded,channel:2},3:{type:F.SingleEnded,channel:3},4:{type:F.SingleEnded,channel:4},5:{type:F.SingleEnded,channel:5},6:{type:F.SingleEnded,channel:6},7:{type:F.SingleEnded,channel:7},8:{type:F.Temperature},14:{type:F.Constant,voltage:1.1},15:{type:F.Constant,voltage:0}},Po={type:F.Constant,voltage:0},ye={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:fs,adcReferences:[tt.AREF,tt.AVCC,tt.Reserved,tt.Internal1V1]},Eo=7,Do=8,vo=16,ls=64,we=128,_o=31,$o=32,Uo=8,ko=8,Bo=3,Oo=6,Yt=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=o=>{var i;let a=0;switch(o.type){case F.Constant:a=o.voltage;break;case F.SingleEnded:a=(i=this.channelValues[o.channel])!==null&&i!==void 0?i:0;break;case F.Differential:a=o.gain*((this.channelValues[o.positiveChannel]||0)-(this.channelValues[o.negativeChannel]||0));break;case F.Temperature:a=.378125;break}let n=a/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:vo,enableRegister:this.config.ADCSRA,enableMask:Do},e.writeHooks[s.ADCSRA]=(o,i)=>{var a;if(o&we&&!(i&we)&&(this.conversionCycles=25),e.data[s.ADCSRA]=o,e.updateInterruptEnable(this.ADC,o),!this.converting&&o&ls){if(!(o&we))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&_o;e.data[s.ADCSRB]&Uo&&(n|=32),n&=s.muxInputMask;let r=(a=s.muxChannels[n])!==null&&a!==void 0?a:Po;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:o,ADMUX:i,ADCSRA:a}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[i]&$o?(this.cpu.data[s]=e<<6&255,this.cpu.data[o]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[o]=e>>8&3),this.cpu.data[a]&=~ls,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&Eo){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:o}=this.config,i=this.cpu.data[s]>>Oo&Bo;return o.length>4&&this.cpu.data[s]&ko&&(i|=4),(e=o[i])!==null&&e!==void 0?e:tt.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case tt.AVCC:return this.avcc;case tt.AREF:return this.aref;case tt.Internal1V1:return 1.1;case tt.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var Vo=2,Wo=4,Fo=8,No=16,Lo=32,Ji=Vo|Wo|Fo|No|Lo;var ds={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},hs={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},xs={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},us={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},ps={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var vt={PIN:35,DDR:36,PORT:37,pinChange:xs,externalInterrupts:[]},Pe={PIN:38,DDR:39,PORT:40,pinChange:us,externalInterrupts:[]},St={PIN:41,DDR:42,PORT:43,pinChange:ps,externalInterrupts:[null,null,ds,hs]};var K;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(K||(K={}));var B;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(B||(B={}));var Dt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Dt||(Dt={}));var te=class{constructor(e,s){var o,i,a,n;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=C=>{let w=e.data[s.PORT];return e.data[s.DDR]=C,this.writeGpio(w,C),this.updatePinRegister(C),!0},e.writeHooks[s.PORT]=C=>{let w=e.data[s.DDR];return e.data[s.PORT]=C,this.writeGpio(C,w),this.updatePinRegister(w),!0},e.writeHooks[s.PIN]=(C,w,l,b)=>{let M=e.data[s.PORT],v=e.data[s.DDR],V=M^C&b;return e.data[s.PORT]=V,this.writeGpio(V,v),this.updatePinRegister(v),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(C=>C?{address:C.interrupt,flagRegister:C.EIFR,flagMask:1<<C.index,enableRegister:C.EIMSK,enableMask:1<<C.index}:null);let f=new Set(r.map(C=>C?.EICR));for(let C of f)this.attachInterruptHook(C||0);let A=(i=(o=r.find(C=>C&&C.EIMSK))===null||o===void 0?void 0:o.EIMSK)!==null&&i!==void 0?i:0;this.attachInterruptHook(A,"mask");let m=(n=(a=r.find(C=>C&&C.EIFR))===null||a===void 0?void 0:a.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(m,"flag");let{pinChange:R}=s;if(this.PCINT=R?{address:R.pinChangeInterrupt,flagRegister:R.PCIFR,flagMask:1<<R.PCIE,enableRegister:R.PCICR,enableMask:1<<R.PCIE}:null,R){let{PCIFR:C,PCMSK:w}=R;e.writeHooks[C]=l=>{for(let b of this.cpu.gpioPorts){let{PCINT:M}=b;M&&e.clearInterruptByFlag(M,l)}return!0},e.writeHooks[w]=l=>{e.data[w]=l;for(let b of this.cpu.gpioPorts){let{PCINT:M}=b;M&&e.updateInterruptEnable(M,l)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],o=this.cpu.data[this.portConfig.PORT],i=1<<e,a=o&i?K.InputPullUp:K.Input,n=this.openCollector&i?a:K.High;return s&i?this.lastValue&i?n:K.Low:a}setPin(e,s){let o=1<<e;this.pinValue&=~o,s&&(this.pinValue|=o),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:o,portConfig:i}=this,a=1<<e;if(s===B.None)this.overrideMask|=a,this.overrideValue&=~a;else switch(this.overrideMask&=~a,s){case B.Enable:this.overrideValue&=~a,this.overrideValue|=o.data[i.PORT]&a;break;case B.Set:this.overrideValue|=a;break;case B.Clear:this.overrideValue&=~a;break;case B.Toggle:this.overrideValue^=a;break}let n=o.data[i.DDR];this.writeGpio(o.data[i.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var s,o;let i=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=i,this.lastPin!==i){for(let a=0;a<8;a++)if((i&1<<a)!==(this.lastPin&1<<a)){let n=!!(i&1<<a);this.toggleInterrupt(a,n),(o=(s=this.externalClockListeners)[a])===null||o===void 0||o.call(s,n)}this.lastPin=i}}toggleInterrupt(e,s){let{cpu:o,portConfig:i,externalInts:a,PCINT:n}=this,{externalInterrupts:r,pinChange:f}=i,A=r[e],m=a[e];if(m&&A){let{EIMSK:R,index:C,EICR:w,iscOffset:l}=A;if(o.data[R]&1<<C){let b=o.data[w]>>l&3,M=!1;switch(m.constant=!1,b){case Dt.LowLevel:M=!s,m.constant=!0;break;case Dt.Change:M=!0;break;case Dt.FallingEdge:M=!s;break;case Dt.RisingEdge:M=s;break}M?o.setInterruptFlag(m):m.constant&&o.clearInterrupt(m,!0)}}if(f&&n&&f.mask&1<<e){let{PCMSK:R}=f;o.data[R]&1<<e+f.offset&&o.setInterruptFlag(n)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:o}=this;o.writeHooks[e]=i=>{s!=="flag"&&(o.data[e]=i);for(let a of o.gpioPorts){for(let n of a.externalInts)n&&s==="mask"&&o.updateInterruptEnable(n,i),n&&!n.constant&&s==="flag"&&o.clearInterruptByFlag(n,i);a.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let o=0;o<8;o++){let i=s[o];if(!i)continue;let a=!!(this.lastPin&1<<o),{EIFR:n,EIMSK:r,index:f,EICR:A,iscOffset:m,interrupt:R}=i;if(!(e.data[r]&1<<f)||a)continue;(e.data[A]>>m&3)===Dt.LowLevel&&e.queueInterrupt({address:R,flagRegister:n,flagMask:1<<f,enableRegister:r,enableMask:1<<f,constant:!0})}}writeGpio(e,s){let o=(e&this.overrideMask|this.overrideValue)&s|e&~s,i=this.lastValue;if(o!==i||s!==this.lastDdr){this.lastValue=o,this.lastDdr=s;for(let a of this.listeners)a(o,i)}}};var Cs={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ee;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ee||(ee={}));var De={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},ve=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Cs,compPortA:St.PORT,compPinA:6,compPortB:St.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:St.PORT,externalClockPin:4},De),_e=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Cs,compPortA:vt.PORT,compPinA:1,compPortB:vt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:St.PORT,externalClockPin:5},De),$e=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:vt.PORT,compPinA:3,compPortB:St.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},De),Lt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Lt||(Lt={}));var O;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(O||(O={}));var _;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(_||(_={}));var Rt=1,Nt=2,_t=1,{Normal:Ue,PWMPhaseCorrect:xt,CTC:pe,FastPWM:ut,Reserved:Ee,PWMPhaseFrequencyCorrect:se}=Lt,jo=[[Ue,255,_.Immediate,O.Max,0],[xt,255,_.Top,O.Bottom,0],[pe,Rt,_.Immediate,O.Max,0],[ut,255,_.Bottom,O.Max,0],[Ee,255,_.Immediate,O.Max,0],[xt,Rt,_.Top,O.Bottom,_t],[Ee,255,_.Immediate,O.Max,0],[ut,Rt,_.Bottom,O.Top,_t]],Ho=[[Ue,65535,_.Immediate,O.Max,0],[xt,255,_.Top,O.Bottom,0],[xt,511,_.Top,O.Bottom,0],[xt,1023,_.Top,O.Bottom,0],[pe,Rt,_.Immediate,O.Max,0],[ut,255,_.Bottom,O.Top,0],[ut,511,_.Bottom,O.Top,0],[ut,1023,_.Bottom,O.Top,0],[se,Nt,_.Bottom,O.Bottom,0],[se,Rt,_.Bottom,O.Bottom,_t],[xt,Nt,_.Top,O.Bottom,0],[xt,Rt,_.Top,O.Bottom,_t],[pe,Nt,_.Immediate,O.Max,0],[Ee,65535,_.Immediate,O.Max,0],[ut,Nt,_.Bottom,O.Top,_t],[ut,Rt,_.Bottom,O.Top,_t]];function Go(t){switch(t){case 1:return B.Toggle;case 2:return B.Clear;case 3:return B.Set;default:return B.Enable}}var ms=128,gs=64,Ko=32,oe=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=_.Immediate,this.tovUpdateMode=O.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(o=!0,i=!1)=>{let{divider:a,lastCycle:n,cpu:r}=this,{cycles:f}=r,A=f-n;if(a&&A>=a||i){let m=i?1:Math.floor(A/a);this.lastCycle+=m*a;let R=this.tcnt,{timerMode:C,TOP:w}=this,l=C===xt||C===se,b=l?this.phasePwmCount(R,m):(R+m)%(w+1),M=R+m>w;if(this.tcntUpdated||(this.tcnt=b,l||this.timerUpdated(b,R)),!l){if(C===ut&&M){let{compA:v,compB:V}=this;v&&this.updateCompPin(v,"A",!0),V&&this.updateCompPin(V,"B",!0)}this.ocrUpdateMode==_.Bottom&&M&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),M&&(this.tovUpdateMode==O.Top||w===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===_.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===_.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:m}=this,{externalClockPin:R}=this.config,C=this.config.dividers[m];this.lastCycle=C?this.cpu.cycles:0,this.updateDivider=!1,this.divider=C,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[R]=null),C?r.addClockEvent(this.count,this.lastCycle+C-r.cycles):this.externalClockPort&&(m===ee.FallingEdge||m===ee.RisingEdge)&&(this.externalClockPort.externalClockListeners[R]=this.externalClockCallback,this.externalClockRisingEdge=m===ee.RisingEdge);return}o&&a&&r.addClockEvent(this.count,this.lastCycle+a-r.cycles)},this.externalClockCallback=o=>{o===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=o=>(this.count(!1),this.config.bits===16&&(this.cpu.data[o+1]=this.tcnt>>8),this.cpu.data[o]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=o=>{this.tcntNext=this.highByteTemp<<8|o,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=o=>{this.nextOcrA=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=o=>{this.nextOcrB=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=o=>{this.nextOcrC=this.highByteTemp<<8|o,this.ocrUpdateMode===_.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=a=>{this.icr=this.highByteTemp<<8|a};let o=a=>{this.highByteTemp=a},i=(a,n,r)=>(this.highByteTemp=a&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=o,this.cpu.writeHooks[s.OCRA+1]=i,this.cpu.writeHooks[s.OCRB+1]=i,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=i),this.cpu.writeHooks[s.ICR+1]=o}e.writeHooks[s.TCCRA]=o=>(this.cpu.data[s.TCCRA]=o,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=o=>(s.TCCRC||(this.checkForceCompare(o),o&=~(ms|gs)),this.cpu.data[s.TCCRB]=o,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=o=>{this.checkForceCompare(o)}),e.writeHooks[s.TIFR]=o=>(this.cpu.data[s.TIFR]=o,this.cpu.clearInterruptByFlag(this.OVF,o),this.cpu.clearInterruptByFlag(this.OCFA,o),this.cpu.clearInterruptByFlag(this.OCFB,o),!0),e.writeHooks[s.TIMSK]=o=>{this.cpu.updateInterruptEnable(this.OVF,o),this.cpu.updateInterruptEnable(this.OCFA,o),this.cpu.updateInterruptEnable(this.OCFB,o)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case Rt:return this.ocrA;case Nt:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case Rt:case Nt:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,o=e.bits===16?Ho:jo,i=this.cpu.data[e.TCCRA],[a,n,r,f,A]=o[s];this.timerMode=a,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=f;let m=a===ut||a===xt||a===se,R=this.compA;this.compA=i>>6&3,this.compA===1&&m&&!(A&_t)&&(this.compA=0),!!R!=!!this.compA&&this.updateCompA(this.compA?B.Enable:B.None);let C=this.compB;if(this.compB=i>>4&3,this.compB===1&&m&&(this.compB=0),!!C!=!!this.compB&&this.updateCompB(this.compB?B.Enable:B.None),this.hasOCRC){let w=this.compC;this.compC=i>>2&3,this.compC===1&&m&&(this.compC=0),!!w!=!!this.compC&&this.updateCompC(this.compC?B.Enable:B.None)}}phasePwmCount(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n,TOP:r,MAX:f,tcntUpdated:A}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===_.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!A&&(this.countingUp=!1,this.ocrUpdateMode===_.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!A&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===_.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),A||(e===o&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===i&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===a&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&f}timerUpdated(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n}=this,r=s>e;((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==Lt.FastPWM||this.timerMode==Lt.PWMPhaseCorrect||this.timerMode==Lt.PWMPhaseFrequencyCorrect||(e&ms&&this.updateCompPin(this.compA,"A"),e&gs&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ko&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,o=!1){let i=B.None,a=e===3,n=this.countingUp===a;switch(this.timerMode){case Ue:case pe:i=Go(e);break;case ut:e===1?i=o?B.None:B.Toggle:i=a!==o?B.Set:B.Clear;break;case xt:case se:e===1?i=B.Toggle:i=n?B.Set:B.Clear;break}i!==B.None&&(s==="A"?this.updateCompA(i):s==="B"?this.updateCompB(i):this.updateCompC(i))}updateCompA(e){let{compPortA:s,compPinA:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompB(e){let{compPortB:s,compPinB:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompC(e){let{compPortC:s,compPinC:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}};var Be={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},qo=128,zo=64,Ss=32;var ke=2,Xo=1,Rs=ke,Zo=128,Jo=64,Qo=32,me=16,ge=8,bs=4;var As=bs|me|ge;var Yo=32,ti=16,ei=8,Is=4,Ts=2;var si={5:31,6:63,7:127,8:255,9:255},ie=class{constructor(e,s,o){this.cpu=e,this.config=s,this.freqHz=o,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:qo,enableRegister:this.config.UCSRB,enableMask:Zo,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ss,enableRegister:this.config.UCSRB,enableMask:Qo},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:zo,enableRegister:this.config.UCSRB,enableMask:Jo},this.reset(),this.cpu.writeHooks[s.UCSRA]=(i,a)=>{var n;return e.data[s.UCSRA]=i&(Xo|ke),e.clearInterruptByFlag(this.TXC,i),(i&Rs)!==(a&Rs)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(i,a)=>{var n;return e.updateInterruptEnable(this.RXC,i),e.updateInterruptEnable(this.UDRE,i),e.updateInterruptEnable(this.TXC,i),i&me&&a&me&&e.clearInterrupt(this.RXC),i&ge&&!(a&ge)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=i,(i&As)!==(a&As)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=i=>{var a;return e.data[s.UCSRC]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var i;let a=(i=si[this.bitsPerChar])!==null&&i!==void 0?i:255,n=this.rxByte&a;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[s.UDR]=i=>{if(this.onByteTransmit&&this.onByteTransmit(i),this.onLineTransmit){let a=String.fromCharCode(i);a===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=a}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=i=>{var a;return this.cpu.data[s.UBRRH]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.writeHooks[s.UBRRL]=i=>{var a;return this.cpu.data[s.UBRRL]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ss,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Is|Ts,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var o;let{cpu:i}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,i.setInterruptFlag(this.RXC),(o=this.onRxComplete)===null||o===void 0||o.call(this);else return this.rxBusyValue=!0,i.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&ke?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&me)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&ge)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Is|Ts))>>1|this.cpu.data[this.config.UCSRB]&bs){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ei?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Yo)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&ti)}};function Ms(t){let e=new Uint8Array(32768),s=0,o=!1;for(let[i,a]of String(t).split(/\\r?\\n/).entries()){let n=a.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${i+1}).`);let r=n.slice(1).match(/../g).map(w=>parseInt(w,16));if(r.reduce((w,l)=>w+l,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${i+1}).`);let[f,A,m,R]=r,C=r.slice(4,4+f);if(R===0){let w=s+(A<<8|m);if(w+f>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(C,w)}else if(R===1){o=!0;break}else R===2?s=(C[0]<<8|C[1])<<4:R===4&&(s=(C[0]<<8|C[1])<<16)}if(!o)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var rt=16e6,oi=Me,ii=[[St,["D0","D1","D2","D3","D4","D5","D6","D7"]],[vt,["D8","D9","D10","D11","D12","D13"]],[Pe,["A0","A1","A2","A3","A4","A5"]]],ct=Object.freeze({...K});function ws(t){let e=new Jt(Ms(t));[ve,_e,$e].forEach(l=>new oe(e,l));let s=new ie(e,Be,rt),o=new Yt(e,ye),i=ii.map(([l,b])=>[new te(e,l),b]),a={};for(let[l,b]of i)b.forEach((M,v)=>a[M]=[l,v]);let n=null;o.onADCRead=l=>{let b=0;if(l.type===F.SingleEnded){let V=o.channelValues[l.channel]||0;b=n?n(l.channel,V):V}else l.type===F.Constant?b=l.voltage:l.type===F.Temperature&&(b=.378125);let M=Math.round(b*1e6)/1e6,v=Math.min(1023,Math.max(0,Math.floor(M/o.referenceVoltage*1024)));e.addClockEvent(()=>o.completeADCRead(v),o.sampleCycles)};let r=[],f=[],A=[],m=[],R=C();function C(){let l={};for(let[b,M]of i)M.forEach((v,V)=>l[v]=b.pinState(V));return l}for(let[l,b]of i)l.addListener(()=>{let M=null;for(let v=0;v<b.length;v++){let V=l.pinState(v);V!==R[b[v]]&&((M||(M={}))[b[v]]=V,R[b[v]]=V)}if(M)for(let v of f)v(M,R)});s.onByteTransmit=l=>A.forEach(b=>b(l));function w(l){let b=e.cycles+l;for(;e.cycles<b;){let M=Math.min(b,e.cycles+rt/1e3);for(;e.cycles<M;)oi(e),e.tick();m.length&&!s.rxBusy&&(s.writeByte(m[0]),m.shift());for(let v of r)v()}}return{correr:w,estados:C,get ciclos(){return e.cycles},alCambiarPines:l=>f.push(l),alByteSerial:l=>A.push(l),enviarSerial:l=>m.push(...new TextEncoder().encode(l)),ponerAnalogico:(l,b)=>o.channelValues[l]=Math.max(0,Math.min(5,b)),ponerLectorAnalogico:l=>n=l,ponerEntrada(l,b){let M=a[l];M&&M[0].setPin(M[1],!!b)},alCadaMs:l=>r.push(l)}}var ai=["a","b","c","d","e"],ni=["f","g","h","i","j"],Oe={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ri=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],ys={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Ve=t=>14.4+(t-1)*9.6,ci=t=>t>=2&&(t-1)%6!==0,We=new Map;function Ne(t="media"){if(We.has(t))return We.get(t);let e=ys[t]||ys.media,s=[];We.set(t,s);for(let o=1;o<=e.columnas;o++){for(let i of ai)s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:"arriba"+o});for(let i of ni)s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:"abajo"+o});for(let[i]of ri)ci(o)&&s.push({nombre:i+o,x:Ve(o),y:Oe[i],tira:i})}return s}var Fe=new Map;function Ps(t="media"){if(Fe.has(t))return Fe.get(t);let e=new Map;Fe.set(t,e);for(let s of Ne(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var jt=3.779527559055118,li={ancho:72.58*jt,alto:53.34*jt},fi=4*jt,Es=5*jt;var ae=fi+4.6*jt,ne=li.ancho-.5-4.6*jt,di=60,pt=(t,e)=>({x:t,y:di+e*Es}),Xa={M1A:pt(ae,0),M1B:pt(ae,1),GND_IZQ:pt(ae,2),M2A:pt(ae,3),M2B:pt(ae,4),M4A:pt(ne,0),M4B:pt(ne,1),GND_DER:pt(ne,2),M3A:pt(ne,3),M3B:pt(ne,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+Es,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var Ds=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var hi=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function $t(t,{presionados:e=new Set,conduccion:s=!1}={}){let o=new Map,i=n=>{for(o.has(n)||o.set(n,n);o.get(n)!==n;)o.set(n,o.get(o.get(n))),n=o.get(n);return n},a=(n,r)=>o.set(i(n),i(r));for(let n of hi)n.forEach(r=>a("placa."+n[0],"placa."+r));for(let n of t.cables)a(n.de,n.a);if(t.protoboard){for(let n of Ps(t.protoboard.tipo).values())n.forEach(r=>a("protoboard."+n[0],"protoboard."+r));for(let n of t.componentes)if(n.en)for(let[r,f]of Object.entries(n.en))a(n.id+"."+r,f)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[r,f]of Ds)a(n.id+"."+r,f);(!n.props||n.props.puentePWR!==!1)&&a(n.id+".EXT_POS","placa.VIN")}else n.tipo==="pulsador"?(a(n.id+".1i",n.id+".1d"),a(n.id+".2i",n.id+".2d"),e.has(n.id)&&a(n.id+".1i",n.id+".2i")):s&&n.tipo==="resistencia"?a(n.id+".1",n.id+".2"):s&&n.tipo==="potenciometro"&&(a(n.id+".GND",n.id+".SIG"),a(n.id+".SIG",n.id+".VCC"));return i}function je(t,e,s,o){e>=0&&(t[e][e]+=o),s>=0&&(t[s][s]+=o),e>=0&&s>=0&&(t[e][s]-=o,t[s][e]-=o)}function Le(t,e,s){e>=0&&(t[e]+=s)}var Ut=(t,e)=>e>=0?t[e]:0;function re(t,e,s){return{a:t,b:e,g:1/s,sellar(o){je(o,this.a,this.b,this.g)},corriente(o){return(Ut(o,this.a)-Ut(o,this.b))*this.g}}}function vs(t){return{nodo:t,v:0,g:0,sellar(e,s){je(e,this.nodo,-1,this.g),Le(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Ut(e,this.nodo))*this.g}}}function _s(t,e){return{nodo:t,v:e,fila:-1,sellar(s,o){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,o[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function $s(t,e,{Is:s,n:o}){let i=o*.025693,a=i*Math.log(i/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let f=Math.exp(this.vd/i),A=s*(f-1),m=s*f/i+1e-12,R=A-m*this.vd;je(n,this.a,this.k,m),Le(r,this.a,-R),Le(r,this.k,R)},actualizar(n){let r=Ut(n,this.a)-Ut(n,this.k),f=Math.abs(r-this.vd);return this.vd=xi(r,this.vd,i,a),f},corriente(n){let r=Ut(n,this.a)-Ut(n,this.k);return s*Math.expm1(r/i)}}}function xi(t,e,s,o){if(t>o&&Math.abs(t-e)>2*s){if(e>0){let i=1+(t-e)/s;return i>0?e+s*Math.log(i):o}return s*Math.log(t/s)}return t}function Us(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let o=t.nodos+t.fuentes,i=t.elementos.filter(n=>n.noLineal),a=new Float64Array(o);for(let n=1;n<=e;n++){let r=Array.from({length:o},()=>new Float64Array(o)),f=new Float64Array(o);for(let m of t.elementos)m.sellar(r,f);for(let m=0;m<t.nodos;m++)r[m][m]+=1e-12;if(a=ui(r,f),!i.length)return{x:a,iteraciones:n,convergio:!0};let A=0;for(let m of i)A=Math.max(A,m.actualizar(a));if(A<s)return{x:a,iteraciones:n,convergio:!0}}return{x:a,iteraciones:e,convergio:!1}}function ui(t,e){let s=e.length;for(let i=0;i<s;i++){let a=i;for(let n=i+1;n<s;n++)Math.abs(t[n][i])>Math.abs(t[a][i])&&(a=n);if(Math.abs(t[a][i])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[i],t[a]]=[t[a],t[i]],[e[i],e[a]]=[e[a],e[i]];for(let n=i+1;n<s;n++){let r=t[n][i]/t[i][i];if(r){for(let f=i;f<s;f++)t[n][f]-=r*t[i][f];e[n]-=r*e[i]}}}let o=new Float64Array(s);for(let i=s-1;i>=0;i--){let a=e[i];for(let n=i+1;n<s;n++)a-=t[i][n]*o[n];o[i]=a/t[i][i]}return o}var kt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},He=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],mi={A4:"SDA",A5:"SCL"},Q={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},gi=.25,ks={minimo:1};function Ci(t){let s=(Q.vf[t]||Q.vf.rojo)-Q.iRef*Q.rs;return{Is:Q.iRef/Math.expm1(s/(Q.n*.025693)),n:Q.n}}var Bs={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function Os(t,{quemados:e=new Set,presionados:s=new Set}={}){let o=$t(t,{presionados:s}),i=$t(t,{presionados:s,conduccion:!0}),a=o("placa.GND1"),n=new Map,r=0,f=h=>{let u=o(h);return u===a?-1:(n.has(u)||n.set(u,r++),n.get(u))},A=h=>o(h)===a?-1:n.get(o(h)),m=[],R=[],C=[],w=new Set(t.cables.flatMap(h=>[h.de,h.a])),l=[];if(t.protoboard){let h=new Set([...w].map(o));for(let u of t.componentes)for(let x of Object.keys(u.en||{}))h.add(o(u.id+"."+x));for(let u of Ne(t.protoboard.tipo)){let x="protoboard."+u.nombre;h.has(o(x))&&l.push(x)}}let b=new Map;for(let[h,u]of[["5V",5],["3V3",3.3]]){if(!w.has("placa."+h))continue;let x=f("placa."+h),T=x===-1?"GND":b.get(x);if(T){C.push({tipo:"cortocircuito",componente:"placa."+h,mensaje:`El pin ${h} est\\xE1 unido directo a ${T}: es un cortocircuito.`});continue}b.set(x,h);let p=_s(x,u);R.push(p),m.push(p)}let M={};for(let h of He)!w.has("placa."+h)&&!w.has("placa."+mi[h])||(M[h]=vs(f("placa."+h)),m.push(M[h]));let v=[],V=[],At=[];for(let h of t.componentes)if(h.tipo==="resistencia"){let u=re(f(h.id+".1"),f(h.id+".2"),Number(h.props.ohmios)||1);v.push({id:h.id,ohmios:Number(h.props.ohmios)||1,el:u}),u.a!==u.b&&m.push(u)}else if(h.tipo==="led"){let u=f(h.id+".anodo"),x=f(h.id+".catodo"),T={id:h.id,a:u,k:x,quemado:e.has(h.id)};if(!T.quemado&&u!==x){let p=r++;T.rs=re(u,p,Q.rs),T.diodo=$s(p,x,Ci(h.props.color)),m.push(T.rs,T.diodo)}V.push(T)}else if(h.tipo==="potenciometro"){let u=Number(h.props.ohmios)||1e4,x=Math.max(0,Math.min(1,Number(h.props.posicion))),T=f(h.id+".GND"),p=f(h.id+".SIG"),E=f(h.id+".VCC"),W=re(T,p,Math.max(ks.minimo,u*x)),P=re(p,E,Math.max(ks.minimo,u*(1-x)));for(let N of[W,P])N.a!==N.b&&m.push(N);At.push({id:h.id,ohmios:u,posicion:x,bajo:W,alto:P})}R.forEach((h,u)=>h.fila=r+u);function st(h){let u=new Set([i("placa.GND1")]);for(let x of["5V","3V3"])w.has("placa."+x)&&u.add(i("placa."+x));for(let x of He){let T=h[x];(T===K.High||T===K.Low||T===K.InputPullUp)&&u.add(i("placa."+x))}return u}let $=new Set([...w,...l]);for(let h of t.componentes)for(let u of Bs[h.tipo]||[])$.add(h.id+"."+u);return{fallasFijas:C,flotantes(h){let u=st(h),x=new Set;for(let T of He)h[T]===K.Input&&!u.has(i("placa."+T))&&x.add(T);return x},refsAlAire(h){let u=st(h),x=new Set;for(let T of $)u.has(i(T))||x.add(T);return x},ponerPines(h){for(let[u,x]of Object.entries(M)){let T=h[u];T===K.High?Object.assign(x,{v:kt.voltios,g:1/kt.rAlto}):T===K.Low?Object.assign(x,{v:0,g:1/kt.rBajo}):T===K.InputPullUp?Object.assign(x,{v:kt.voltios,g:1/kt.rPullUp}):Object.assign(x,{v:0,g:0})}},resolver(){let h=Us({nodos:r,fuentes:R.length,elementos:m}),u=p=>{let E=A(p);return E===void 0?null:E<0?0:h.x[E]},x={};for(let p of w)x[p]=u(p);for(let p of l)x[p]=u(p);for(let p of t.componentes)for(let E of Bs[p.tipo]||[])x[p.id+"."+E]=u(p.id+"."+E);let T=(p,E)=>p===null||E===null?null:p-E;return{convergio:h.convergio,iteraciones:h.iteraciones,voltajes:x,leds:V.map(p=>{let E=p.diodo?p.diodo.corriente(h.x):0;return{id:p.id,quemado:p.quemado,v:T(u(p.id+".anodo"),u(p.id+".catodo")),i:E,brillo:Math.max(0,Math.min(1,E*1e3/Q.plenomA))}}),resistencias:v.map(p=>{let E=p.el.a===p.el.b?0:p.el.corriente(h.x);return{id:p.id,ohmios:p.ohmios,v:T(u(p.id+".1"),u(p.id+".2")),i:E,w:E*E*p.ohmios}}),pines:Object.entries(M).filter(([,p])=>p.g>0).map(([p,E])=>({pin:p,v:u("placa."+p),i:E.corriente(h.x)})),fuentes:R.map(p=>({pin:p.v===5?"5V":"3V3",i:p.corriente(h.x)})),potenciometros:At.map(p=>({id:p.id,ohmios:p.ohmios,posicion:p.posicion,v:T(u(p.id+".SIG"),u(p.id+".GND")),i:Math.abs(p.bajo.a!==p.bajo.b?p.bajo.corriente(h.x):p.alto.a!==p.alto.b?p.alto.corriente(h.x):0)}))}}}}function Vs(t,e){let s=i=>(Math.abs(i)*1e3).toFixed(0),o=[];if(e.danoComponentes){for(let i of t.leds)!i.quemado&&i.i*1e3>Q.quemamA&&o.push({tipo:"led_quemado",componente:i.id,corriente_mA:+(i.i*1e3).toFixed(1),mensaje:`El LED ${i.id} se quem\\xF3: le pasaron ${s(i.i)} mA y aguanta unos ${Q.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let i of t.resistencias)i.w>gi&&o.push({tipo:"resistencia_caliente",componente:i.id,potencia_W:+i.w.toFixed(2),mensaje:`La resistencia ${i.id} se calienta: disipa ${i.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let i of t.pines)if(Math.abs(i.i)*1e3>kt.maxmA){let a=i.pin.startsWith("D")?"pin "+i.pin.slice(1):"pin "+i.pin;o.push({tipo:"corriente_pin",componente:"placa."+i.pin,corriente_mA:+(Math.abs(i.i)*1e3).toFixed(1),mensaje:`El ${a} entrega ${s(i.i)} mA y aguanta ${kt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return o}var Ot={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Bt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function Si(t,e="sg90"){let s=(Ot[e]||Ot.sg90).angulos,o=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,o))}function Ws(t){let e=Ot[t]||Ot.sg90,s=90,o=90,i=null,a=0,n=!1,r=0,f=0;return{pulso(A){A<Bt.pulsoValidoMin||A>Bt.pulsoValidoMax||i!==null&&Math.abs(A-i)<Bt.bandaMuerta||(i=A,o=Si(A,t))},avanzar(A,m){if(!(m>0)){n=!1,a=0;return}let R=60/(e.seg60*1e3)*(m/Bt.voltiosRef),C=o-s,w=Math.abs(C)>.01;r=Math.min(1,Math.abs(C)/Bt.bandaGrados),w&&!n&&(a=Bt.arranqueMs,f=r),n=w,n&&(s+=Math.sign(C)*Math.min(Math.abs(C),R*A)),a=Math.max(0,a-A)},corriente(A){if(!(A>0))return 0;let{reposo:m,movimiento:R,arranque:C}=e.mA;return(a>0?m+(C-m)*f:n?m+(R-m)*r:m)/1e3*(A/Bt.voltiosRef)},estado:()=>({angulo:s,objetivo:o,pulso:i,moviendo:n,arrancando:a>0})}}var Ht=9.6/2.54,Ce=57.6,Fs=14.4,rn={x:Fs,ancho:32.2*Ht},Ri={x:Fs+(32.2-22.2)/2*Ht,ancho:22.2*Ht,alto:11.8*Ht},cn={x:Ri.x+5.9*Ht,y:Ce},ln=13.5*Ht,Ge=182.4;var fn={GND:{x:Ge,y:Ce-9.6,color:"#7a4a24"},VCC:{x:Ge,y:Ce,color:"#d7263d"},SIG:{x:Ge,y:Ce+9.6,color:"#f28c28"}};var J={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function Ke(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=J.fusible,o=(8**2-t**2)*e,i=0,a=!1;return{avanzar(n,r){let f=n/1e3;!a&&r>t?i+=(r**2-t**2)/o*f:i=Math.max(0,i-f/s),i>=1&&(a=!0),a&&i===0&&(a=!1)},get abierto(){return a},get calor(){return i},reiniciar(){i=0,a=!1}}}var Ns=(t,e=0)=>Math.max(0,(J.voltios-J.ohmios*t)/(1+J.ohmios*e));var ce=3.779527559055118,lt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Se=lt.voltiosRef/(lt.mABloqueado/1e3),Ls=lt.rpmSinCarga*lt.reduccion*2*Math.PI/60,js=lt.mASinCarga/1e3,Gt=(lt.voltiosRef-js*Se)/Ls,Ai=Gt*js/Ls,Ii=lt.tauMecanicoMs/1e3*Gt*Gt/Se;function Hs(){let t=0,e=0,s=0;return{avanzar(o,i,{conectado:a=!0,frena:n=!1}={}){let r=o/1e3;a?e=(i-Gt*t)/Se:e=n?-(Gt*t)/Se:0;let f=Gt*e-Ai*t;t+=f/Ii*r,s=(s+t/lt.reduccion*r*180/Math.PI)%360},estado(){let o=t*60/(2*Math.PI)/lt.reduccion;return{rpm:o,i:e,giro:s,velocidad:o/60*Math.PI*(lt.ruedaMM/10)}}}}var xn=64.2*ce,Ti=22.5*ce,un=40*ce,bi=11.2*ce,pn=lt.ruedaMM*ce/2,mn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-bi,y0:132-Ti/2}};var zs=3.779527559055118,Gs={llena:{nombre:"llena",voltios:8.4,color:"#2e9e44"},nominal:{nombre:"nominal",voltios:7.4,color:"#e8a20c"},descargada:{nombre:"descargada",voltios:6.4,color:"#d7263d"}},Vt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},Xs=t=>(Gs[t]||Gs.nominal).voltios,Ks=356;var qs=10,Cn=72*zs,Sn=34*zs;var Rn={POS:{x:Ks-12,y:qs+30,color:"#d7263d"},NEG:{x:Ks-12,y:qs+39.6,color:"#2b2b2b"}};var q={pinDatos:"D8",pinReloj:"D4",pinCierre:"D12",pinHabilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}},caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Mi=6.6,wi=.06,Js=4,Zs=1-Math.exp(-1/Js),yi=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Wt=(t,e=1)=>t.toFixed(e).replace(".",",");function Qs({activas:t,avisar:e}){let s=null,o=new Map,i=new Map,a=0,n=0,r=!1,f={},A=0,m={},R=0,C=0,w=0,l=0;function b(){for(let $ of Object.values(q.pwm))f[$]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};A=0,m={}}b();function M($,h){let u=(P,N)=>h(P)===h(N),x="placa.GND1",T=$.componentes.find(P=>P.tipo==="shield_l293d");s=T?{id:T.id,puente:!T.props||T.props.puentePWR!==!1}:null;let p=new Map;for(let P of $.componentes){if(P.tipo!=="bateria_lipo")continue;let N=P.props&&P.props.carga||"nominal",k=Xs(N),L=i.get(P.id),y=P.id+".POS",I=P.id+".NEG",U={carga:N,voc:k,v:L&&L.carga===N?L.v:k,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};N==="descargada"&&e({tipo:"bateria_baja",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 descargada: ${Wt(k)} V, ${Wt(k/Vt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${Wt(Vt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`});let z=ot=>s&&u(ot,s.id+".EXT_POS")||u(ot,"placa.VIN")||u(ot,"placa.5V");u(y,I)?e({tipo:"bateria_corto",componente:P.id,mensaje:`Los dos cables de la bater\\xEDa ${P.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):u(y,x)&&z(I)?e({tipo:"bateria_invertida",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):u(I,x)&&(U.valida=!0,u(y,"placa.5V")&&(U.valida=!1,e({tipo:"bateria_en_5v",componente:P.id,mensaje:`La bater\\xEDa ${P.id} est\\xE1 en el pin 5V: sus ${Wt(k)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),U.motores=U.valida&&!!s&&u(y,s.id+".EXT_POS"),U.vin=U.valida&&u(y,"placa.VIN")),p.set(P.id,U)}i=p;let E=P=>{if(s){for(let k of[1,2,3,4])for(let L of["A","B"])if(u(P,`${s.id}.M${k}${L}`))return{tipo:"shield",n:k,s:L}}if(u(P,x))return{tipo:"gnd"};if(u(P,"placa.5V"))return{tipo:"5v"};for(let[k,L]of i)if(L.valida&&u(P,k+".POS"))return{tipo:"bateria",id:k};let N=yi.find(k=>u(P,"placa."+k));return N?{tipo:"pin",pin:N}:null},W=new Map;for(let P of $.componentes){if(P.tipo!=="motor_tt")continue;let k=o.get(P.id)||{logico:Hs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};k.lado=P.props&&P.props.lado||"izquierdo",k.a=E(P.id+".A"),k.b=E(P.id+".B");let L=[k.a,k.b].filter(I=>I&&I.tipo==="shield");k.canal=L.length?"M"+L[0].n:null;let y=[k.a,k.b].find(I=>I&&I.tipo==="pin");y&&e({tipo:"motor_en_pin",componente:P.id,mensaje:`El motor ${P.id} est\\xE1 conectado al pin ${y.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),W.set(P.id,k)}o=W}function v($,h,u){if(!s)return;let x=T=>h[T]===ct.High;q.pinReloj in $&&x(q.pinReloj)&&(a=(a<<1|(x(q.pinDatos)?1:0))&255),q.pinCierre in $&&x(q.pinCierre)&&(n=a),q.pinHabilita in $&&(r=h[q.pinHabilita]===ct.Low);for(let T of Object.values(q.pwm)){if(!(T in $))continue;let p=f[T],E=$[T]===ct.High;p.cambios=(p.cambios||0)+1,E&&!p.alto?Object.assign(p,{alto:!0,desde:u}):!E&&p.alto&&(p.acum+=u-p.desde,p.alto=!1)}}function V(){r=!1,b()}function At($,{v5:h,logica:u}){let x=$-A;for(let[y,I]of Object.entries(f)){I.alto&&(I.acum+=$-I.desde,I.desde=$);let U=x>0?Math.min(1,I.acum/x):0,z=m[y]||0;m[y]=(U===0||U===1)&&I.quieto>=Js?U:z+Zs*(U-z),I.quieto=I.cambios?0:(I.quieto||0)+1,I.cambios=0,I.acum=0}A=$,R=0,C=0;for(let y of i.values())y.motores&&(R=Math.max(R,y.v)),y.vin&&(C=Math.max(C,y.v));let T=C>=Mi,p=u||T,E=new Map,W=(y,I)=>E.set(y,(E.get(y)||0)+I),P=y=>{for(let[I,U]of i)if(U.motores)return W(I,y)},N=0,k=y=>y?y.tipo==="shield"?!p||!r?null:{v:n>>q.bits[y.n][y.s]&1?R:0,d:m[q.pwm[y.n]]||0,shield:!0}:y.tipo==="gnd"?{v:0,d:1}:y.tipo==="5v"?{v:h,d:1,del5V:!0}:y.tipo==="bateria"?{v:(i.get(y.id)||{v:0}).v,d:1,bateria:y.id}:null:null,L=!1;for(let[y,I]of o){let U=k(I.a),z=k(I.b),ot=U&&z?Math.min(U.d,z.d):0;if(!ot)I.vAhora=0,I.logico.avanzar(1,0,{conectado:!1});else{let nt=U.v-z.v,mt=(U.shield?1:0)+(z.shield?1:0),H=0;if(Math.abs(nt)>1e-9){let qt=t.caidaL293D&&mt?mt/2*(q.caidaV+q.caidaPorA*Math.abs(I.iAntes)):0;H=Math.sign(nt)*Math.max(0,Math.abs(nt)-qt)*ot}I.vAhora=H,I.logico.avanzar(1,H,{conectado:!0}),mt===2&&(n>>q.bits[I.a.n][I.a.s]&1)!==(n>>q.bits[I.b.n][I.b.s]&1)&&R<1&&(L=!0);let ft=I.logico.estado().i,bt=nt>=0?U:z,Y=Math.max(0,ft*Math.sign(nt||1))*ot;bt.shield?P(Y):bt.del5V?N+=Y:bt.bateria&&W(bt.bateria,Y)}let it=I.logico.estado();I.iAntes=it.i,I.sumaI+=Math.abs(it.i),I.sumaV+=Math.abs(I.vAhora||0),I.ms++;let at=I.a&&I.a.tipo==="shield"||I.b&&I.b.tipo==="shield";I.sobreMs=at&&Math.abs(it.i)>q.maximoCanalA?I.sobreMs+1:0,I.sobreMs>q.avisoCanalMs&&e({tipo:"l293d_corriente",componente:y,mensaje:`El motor ${y} pide ${Wt(Math.abs(it.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}L&&s&&e({tipo:"motores_sin_energia",componente:s.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[y,I]of i){if(!I.valida)continue;let U=(E.get(y)||0)+(I.vin&&T?wi:0);I.v=Math.max(0,I.voc-Vt.ohmios*U),I.iAntes=U,I.sumaI+=U,I.ms++,I.v/Vt.celdas<Vt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:y,mensaje:`La bater\\xEDa ${y} baj\\xF3 a ${Wt(I.v,2)} V con los motores: menos de ${Wt(Vt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return w+=R,l++,{i5V:N,porVin:T}}function st(){let $={},h={motores:[],baterias:[],shield:null};for(let[u,x]of o){let T=x.logico.estado(),p={rpm:T.rpm,giro:T.giro,velocidad:T.velocidad,i:x.ms?x.sumaI/x.ms:Math.abs(T.i),voltios:x.ms?x.sumaV/x.ms:0};$[u]=p,h.motores.push({id:u,canal:x.canal,lado:x.lado,...p}),Object.assign(x,{sumaI:0,sumaV:0,ms:0})}for(let[u,x]of i){let T={voltios:x.valida?x.v:x.voc,i:x.ms?x.sumaI/x.ms:0,carga:x.carga,conectada:x.motores||x.vin};$[u]=T,h.baterias.push({id:u,...T}),Object.assign(x,{sumaI:0,ms:0})}if(s){let u=l?w/l:R;$[s.id]={motoresV:u},h.shield={id:s.id,motoresV:u,puente:s.puente,habilitada:r,salidas:n}}return w=0,l=0,{piezas:$,lista:h}}return{armar:M,pinesCambiaron:v,reiniciarChip:V,cadaMs:At,foto:st,get hay(){return!!s||o.size>0||i.size>0}}}var Pi=60,Re=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],Ys=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ei=3,Di=1.5,vi=1/1e4,to=60,_i=Math.cos(.35*Math.PI),$i=.1*5/1024,Ui=.15,ki=100,eo=50;function oo({hex:t,circuito:e,activas:s={},semilla:o=Math.floor(Math.random()*2**32)}){let i=Vi(o),a=new Set,n=[],r={raiz:null,grupos:new Set},f=new Set,A=new Set,m=new Set,R={},C=new Map,w={},l=null,b=e,M=null,v=new Map,V=new Map,At={},st=null,$=new Map,h=new Map,u=[],x=0,T=0,p={inicio:0,clave:""},E=null,W=null,P=-1/0,N={},k=0,L=0,y=[],I=new TextDecoder("utf-8"),U=new Set,z=new Set,ot=[],it=[],at=new Map,nt=0,mt=Ke(),H=!1,ft=null,bt=0,Y=J.idealV,qt=0,Ae=0,he=0,xe=0,zt=[],Mt=Qs({activas:s,avisar:c=>Pt(c)}),Ie=0,Xt=!1,wt=()=>(nt+l.ciclos)/rt*1e3,lo=c=>Ft.reduce((d,S)=>d+c[S]*so[S],0);function ue(){l=ws(t);let c=l.estados();x=lo(c),$.set(x,c),T=0,h=new Map,u=[],p={inicio:0,clave:x},E=null,l.alCambiarPines((d,S)=>{Je();let g=$.get(x);for(let D in d)x+=(d[D]-g[D])*so[D];$.has(x)||$.set(x,{...S}),x===p.clave&&(E={tiempos:new Map(h),ciclo:l.ciclos}),P=l.ciclos;for(let D in d)N[D]=l.ciclos;yt(),at.size&&xo(d),Mt.pinesCambiaron(d,S,l.ciclos)}),l.alCadaMs(go),l.alCadaMs(es);for(let d of at.values())d.subida=null;Mt.reiniciarChip(),P=-1/0,N={},l.ponerLectorAnalogico(Co),At={},st=null,l.alByteSerial(d=>{y.push(d),L=wt()+Pi})}function Je(){let c=l.ciclos;h.set(x,(h.get(x)||0)+(c-T)),T=c}function Zt(){M=Os(b,{quemados:U,presionados:a}),v=new Map,V=new Map,ho(),Mt.armar(b,$t(b)),Qe()}function Qe(){if(!n.length){r={raiz:null,grupos:new Set};return}let c=$t(b,{presionados:a,conduccion:!0});r={raiz:c,grupos:new Set(n.map(c))}}let Ye=c=>r.grupos.size>0&&r.grupos.has(r.raiz(c)),fo=()=>Math.sin(2*Math.PI*to*(wt()/1e3))>_i;function ho(){let c=$t(b),d=(g,D)=>c(g)===c(D),S=new Map;for(let g of b.componentes){if(g.tipo!=="servo")continue;let D=Ot[g.props&&g.props.modelo]?g.props.modelo:"sg90",Z=at.get(g.id),dt=Z&&Z.modelo===D?Z:{modelo:D,logico:Ws(D),subida:null,sumaA:0,picoA:0,msVentana:0};dt.senal=Ft.find(G=>d(g.id+".SIG","placa."+G))||null;let gt=d(g.id+".GND","placa.GND1"),Et=Ft.find(G=>d(g.id+".VCC","placa."+G));dt.fuente=d(g.id+".VCC","placa.5V")?"5V":d(g.id+".VCC","placa.3V3")?"3V3":Et||null,dt.conectado=gt&&(dt.fuente==="5V"||dt.fuente==="3V3"),Et&&gt&&Pt({tipo:"servo_alimentacion",componente:g.id,mensaje:`El servo ${g.id} toma la corriente del pin ${Et.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ot[D].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),S.set(g.id,dt)}at=S}function xo(c){for(let d of at.values())!d.senal||!(d.senal in c)||(c[d.senal]===ct.High?d.subida=l.ciclos:d.subida!==null&&(d.conectado&&!H&&d.logico.pulso((l.ciclos-d.subida)/rt*1e6),d.subida=null))}let ts=c=>!c.conectado||H?0:c.fuente==="5V"?Y:3.3;function es(){Mt.hay&&({i5V:Ie,porVin:Xt}=Mt.cadaMs(l.ciclos,{v5:Y,logica:!H&&Y>J.bodV}));for(let g of at.values())g.logico.avanzar(1,ts(g));let c=H?0:J.placaA+bt+Ie,d=0;for(let g of at.values())g.conectado&&g.fuente==="5V"&&(d+=g.logico.corriente(1));Y=H?0:Xt?J.idealV:s.limiteUSB?Ns(c,d):J.idealV;let S=c;for(let g of at.values()){let D=g.logico.corriente(ts(g));g.sumaA+=D,g.picoA=Math.max(g.picoA,D),g.msVentana++,(g.fuente==="5V"||g.fuente==="3V3")&&(S+=D)}Xt&&(S=0),s.limiteUSB&&(mt.avanzar(1,S),!H&&!ft&&(Y<J.bodV?ft={motivo:"caida",amperios:S,voltios:Y}:S>J.limitePuertoA?ft={motivo:"puerto",amperios:S}:mt.abierto&&(ft={motivo:"fusible",amperios:S}))),Ae+=S,he=Math.max(he,S),xe++}function uo(){let{motivo:c,amperios:d,voltios:S}=ft;ft=null,c==="caida"?Pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),voltios:Math.round(S*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${S.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):c==="puerto"?Pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${d.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(J.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Pt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(d*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),H=!0),qt++,nt+=l.ciclos,ue(),yt()}function po(c){let d=rt/1e3,S=c;for(;S>0&&H;){let g=Math.min(S,d);nt+=g,S-=g,es(),mt.abierto||(H=!1)}S>0&&l.correr(S)}function ss(){let c=wt();zt=zt.filter(([S])=>c-S<1e3),zt.push([c,he]);let d={amperios:xe?Ae/xe:0,pico:Math.max(...zt.map(([,S])=>S)),voltios:Y,fusible:Math.round(mt.calor*100)/100,apagada:H,reinicios:qt};return Ae=0,he=0,xe=0,d}function os(){let c={};for(let[d,S]of at){let g=S.logico.estado();c[d]={modelo:S.modelo,angulo:Math.round(g.angulo*10)/10,pulso:g.pulso===null?null:Math.round(g.pulso),senal:S.senal,fuente:S.fuente,moviendo:g.moviendo,i:S.msVentana?S.sumaA/S.msVentana:S.logico.corriente(S.voltios),pico:S.picoA},S.sumaA=0,S.picoA=0,S.msVentana=0}return c}function mo(c,d,S){let g=V.get(c);if(g)return g;let D=M.flotantes(d),Z=new Set;Re.forEach((G,ht)=>{D.has(G[0])&&Z.add(ht)});let dt=new Set,gt=[];for(let G of Ys){let ht=d[G];if(ht!==ct.Input&&ht!==ct.InputPullUp)continue;if(D.has(G)){dt.add(G),gt.push([G,"aire"]);continue}let Ct=S?S.voltajes["placa."+G]:null;typeof Ct=="number"?gt.push([G,Ct>=Ei?!0:Ct<=Di?!1:null]):gt.push([G,ht===ct.InputPullUp])}let Et=Re.map(G=>{for(let ht of G){let Ct=S?S.voltajes["placa."+ht]:null;if(typeof Ct=="number")return Ct}return null});return g={canales:Z,alAire:dt,entradas:gt,analogicos:Et,refsAlAire:M.refsAlAire(d)},V.set(c,g),g}function Te(c,d){At[c]!==d&&(At[c]=d,l.ponerEntrada(c,d))}function yt(){if(!M||!l)return;let c=$.get(x)||l.estados(),d=as(x),S=mo(x,c,d);f=S.alAire;for(let[g,D]of S.entradas){if(D==="aire"){g in R||(R[g]=i()<.5),Te(g,s.entradaFlotante?R[g]:!1);continue}let Z=D===null?!!w[g]:D;w[g]=Z,Te(g,Z)}A=S.canales,d&&S.analogicos!==st&&(S.analogicos.forEach((g,D)=>{g!==null&&(!st||st[D]!==g)&&l.ponerAnalogico(D,g)}),st=S.analogicos),m=S.refsAlAire}function go(){if(!(!s.entradaFlotante||!f.size))for(let c of f){let d=Ye("placa."+c)?fo():i()<vi?!R[c]:R[c];d!==R[c]&&(R[c]=d,Te(c,d))}}function Co(c,d){if(A.has(c)){if(!s.entradaFlotante)return 0;if(Ye("placa."+Re[c][0]))return 2.5+2.5*Math.sin(2*Math.PI*to*(wt()/1e3));let S=C.has(c)?C.get(c):1+3*i(),g=Math.max(0,Math.min(5,S+is()*Ui));return C.set(c,g),g}return s.ruidoADC?d+is()*$i:d}function is(){return Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i())}function Pt(c){let d=c.tipo+"|"+c.componente;return z.has(d)?!1:(z.add(d),ot.push(c),it.push(c),!0)}function as(c){for(let d=0;d<4;d++){let S=v.get(c);if(S)return S;M.ponerPines($.get(c));let g=null;try{g=M.resolver()}catch{g=null}if(k++,!g||!g.convergio)return Pt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;v.set(c,g);let D=!1;for(let Z of[...M.fallasFijas,...Vs(g,s)])Pt(Z)&&Z.tipo==="led_quemado"&&(U.add(Z.componente),D=!0);if(!D)return g;Zt()}return v.get(c)||null}function So(){if(H)return Ro();Je();let c=h;if(E&&E.ciclo>p.inicio){c=E.tiempos;let j=new Map;for(let[X,It]of h){let cs=It-(E.tiempos.get(X)||0);cs>0&&j.set(X,cs)}h=j,p={inicio:E.ciclo,clave:p.clave}}else h=new Map,p={inicio:l.ciclos,clave:x};E=null;let d=[...c].filter(([,j])=>j>0);d.length||(d=u.length?u:[[x,1]]),u=d;let S=d.reduce((j,[,X])=>j+X,0),g=[];for(let[j,X]of d){let It=as(j);if(!It){g.length=0;break}g.push([It,X/S])}let D=g.length?Oi(g):null,Z=new Set(Ft.filter(j=>j in N&&l.ciclos-N[j]<eo/1e3*rt));D&&(D.pwm=Bi(d,S,Z)),To(D),st=null;let gt=l.ciclos-P>eo/1e3*rt?1:1-Math.exp(-(S/rt*1e3)/ki);W=D?qe(D,W,gt):null;let Et=l.estados(),G=y.length?I.decode(Uint8Array.from(y),{stream:!0}):"";y=[];let ht=os(),Ct=ss(),rs=Mt.foto();if(bt=W?W.fuentes.reduce((j,X)=>j+Math.max(0,X.i),0):0,W){W.usb=Ct,W.servos=Object.entries(ht).map(([X,It])=>({id:X,...It}));let j=(W.fuentes.find(X=>X.pin==="5V")||{i:0}).i;W.consumo5V=j+W.servos.filter(X=>X.fuente==="5V").reduce((X,It)=>X+It.i,0),Object.assign(W,rs.lista,{porVin:Xt})}let Mo=it;return it=[],{msSimulados:wt(),servos:ht,piezas:rs.piezas,evaluaciones:k,leds:Object.fromEntries((W?W.leds:[]).map(j=>[j.id,j.brillo])),quemados:[...U],voltajes:Ao(),entradas:Io(),placa:{led13:Et.D13===ct.High,ledTX:wt()<L},serial:G,fallas:Mo,medicion:W,energia:Ct}}function Ro(){let c=it;return it=[],{msSimulados:wt(),evaluaciones:k,servos:os(),piezas:Mt.foto().piezas,energia:ss(),leds:{},quemados:[...U],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:c,medicion:null}}function Ao(){if(!W)return{};if(!m.size)return W.voltajes;let c={...W.voltajes};for(let d of m)d in c&&(c[d]=null);return c}function Io(){let c={};for(let d of Ys)f.has(d)?c[d]={alto:!!s.entradaFlotante&&!!R[d],alAire:!0}:d in w&&(c[d]={alto:w[d],alAire:!1});return c}function To(c=W){c&&Re.forEach((d,S)=>{for(let g of d){let D=c.voltajes["placa."+g];if(typeof D=="number")return l.ponerAnalogico(S,D)}})}function bo(){U.clear(),z.clear(),ot.length=0,it=[],y=[],I=new TextDecoder("utf-8"),L=0,ns(),ue(),Zt(),yt()}function ns(){nt=0,H=!1,ft=null,zt=[],mt.reiniciar(),Y=J.idealV,Ie=0,Xt=!1}return ue(),Zt(),yt(),{get ciclos(){return nt+l.ciclos},avanzar(c){if(H)return po(c);l.correr(c),ft&&uo()},foto:So,ponerCircuito(c){b=c,Zt(),yt()},ponerMano(c){n=Array.isArray(c)?c.filter(d=>typeof d=="string"):[],Qe()},ponerPulsador(c,d){d?a.add(c):a.delete(c),Zt(),yt()},enviarSerial:c=>l.enviarSerial(String(c)),reiniciarChip(){ns(),ue(),yt()},reiniciarTodo(){qt=0,bo()},fallas:()=>[...ot]}}function Bi(t,e,s=new Set){let o={},i=new Set;for(let[r,f]of t)for(let A=0;A<Ft.length;A++){let m=Math.floor(r/4**A)%4===ct.High;o[A]=(o[A]||0)+(m?f:0),i.add(A)}let a=Ft,n={};for(let r of i){let f=o[r]/e;(f>0&&f<1||s.has(a[r]))&&(n[a[r]]=Math.round(f*1e3)/1e3)}return n}var Ft=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],so=Object.fromEntries(Ft.map((t,e)=>[t,4**e]));function Oi(t){if(t.length===1)return t[0][0];let e=t[0][0],s=n=>n.reduce((r,[,f])=>r+f,0),o=n=>{let r=0;for(let[f,A]of t){let m=n(f);if(m==null)return null;r+=A*m}return r},i=(n,r,f)=>[...new Set(t.flatMap(([m])=>m[n].map(R=>R[r])))].map(m=>{let R={[r]:m},C=t.filter(([l])=>l[n].some(b=>b[r]===m)),w=s(C);for(let l of f)l==="i"?R.i=t.reduce((b,[M,v])=>b+v*((M[n].find(V=>V[r]===m)||{i:0}).i||0),0):R[l]=w?C.reduce((b,[M,v])=>b+v*(M[n].find(V=>V[r]===m)[l]||0),0)/w:null;return R}),a={};for(let n of Object.keys(e.voltajes))a[n]=o(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:a,leds:e.leds.map((n,r)=>{let f=o(A=>A.leds[r]?A.leds[r].i:0);return{id:n.id,quemado:t.some(([A])=>A.leds[r]&&A.leds[r].quemado),v:o(A=>A.leds[r]?A.leds[r].v:null),i:f,brillo:Math.max(0,Math.min(1,f*1e3/Q.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:o(f=>f.resistencias[r].v),i:o(f=>f.resistencias[r].i),w:o(f=>f.resistencias[r].w)})),pines:i("pines","pin",["v","i"]),fuentes:i("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:o(f=>f.potenciometros[r].v),i:o(f=>f.potenciometros[r].i)}))}}function qe(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let o=a=>a&&typeof a=="object"?a.id||a.pin:void 0,i=new Map((Array.isArray(e)?e:[]).map(a=>[o(a),a]));return t.map((a,n)=>qe(a,o(a)!==void 0?i.get(o(a)):(e||[])[n],s))}if(t&&typeof t=="object"){let o={};for(let i of Object.keys(t))o[i]=qe(t[i],e&&typeof e=="object"?e[i]:void 0,s);return o}return t}function Vi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Wi=16,Fi=8,Ni=50,Li=500,le=rt/1e3,et=null,fe=!1,io=0,Tt=0,ze=0,ao=0,Ze=0,Xe=!1,Kt=[],no=new MessageChannel;no.port1.onmessage=ro;function ro(){Xe=!1,Hi()}function co(t){Xe||(Xe=!0,t>0?setTimeout(ro,t):no.port2.postMessage(null))}function ji(t){for(;Kt.length&&t-Kt[0][0]>Li;)Kt.shift();let e=0,s=0;for(let[,o,i]of Kt)e+=o,s+=i;return e>0?Math.min(1,s/(e*le)):1}function de(t=performance.now()){ao=t;let e=et.foto();self.postMessage({tipo:"foto",corrida:io,...e,velocidad:ji(t),msReales:Ze})}function Hi(){if(!fe||!et)return;let t=performance.now(),e=Math.max(0,t-ze);ze=t,Ze+=e,Tt=Math.min(Tt+e*le,Ni*le);let s=performance.now(),o=0;for(;Tt>=1&&performance.now()-s<Fi;){let i=et.ciclos;et.avanzar(Math.min(Math.floor(Tt),le));let a=et.ciclos-i;Tt-=a,o+=a}Kt.push([t,e,o]),t-ao>=Wi&&de(t),co(Tt>=le?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(io=e.corrida),e.tipo){case"crear":et=oo({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(et.reiniciarTodo(),Ze=0),fe=!0,Tt=0,ze=performance.now(),Kt.length=0,de(),co(0);break;case"pausar":fe=!1;break;case"reiniciar":et.reiniciarChip(),Tt=0,de();break;case"detener":fe=!1;break;case"circuito":et.ponerCircuito(e.circuito),e.mostrar&&de();break;case"serial":et.enviarSerial(e.texto);break;case"pulsador":et.ponerPulsador(e.id,e.presionado),fe||de();break;case"mano":et.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function za(e={}){let{lienzo:t,hex:s}=e,i=e.placa||"uno";if(i!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof s!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");Fa(s);let r=e.modo==="ideal"?"ideal":"realista",l=Object.fromEntries(un.map(A=>[A,r==="realista"]));Object.assign(l,e.noIdealidades||{});let n=typeof e.alEvento=="function"?e.alEvento:null,h={serial:[],falla:[],estado:[]},d="detenido",u=!0,x=0,C=null,v=0,_={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},b=null,E=0,k=[],I=mn(K);I.enviar({tipo:"crear",hex:s,circuito:t.circuito(),activas:l});function K(A){if(!u)return;if(A.tipo==="error")return console.error("TecnoCircuito:",A.mensaje);if(A.tipo!=="foto"||A.corrida!==x||d==="detenido")return;Object.assign(_,{msSimulados:A.msSimulados,msReales:A.msReales,velocidad:A.velocidad,evaluaciones:A.evaluaciones}),b=A.medicion?{...A.medicion,voltajes:A.voltajes,entradas:A.entradas}:null;for(let ht of A.fallas){k.push(ht),h.falla.forEach(Mt=>Lt(Mt,{tipo:ht.tipo,componente:ht.componente,mensaje:ht.mensaje}));let{mensaje:oo,...he}=ht;xt("falla",he)}let nt=A.energia?A.energia.reinicios:0;nt>E&&xt("reinicio_placa",{motivo:"energia_usb",nuevos:nt-E,total:nt}),E=nt,A.serial&&h.serial.forEach(ht=>Lt(ht,A.serial)),C=A,v||(v=requestAnimationFrame(D))}function D(){if(v=0,d==="detenido"||!C)return t._mostrar({simulando:d!=="detenido"});t._mostrar({simulando:!0,leds:C.leds,quemados:C.quemados,voltajes:C.voltajes,servos:C.servos||{},piezas:C.piezas||{},placa:{ledPower:C.placa.encendida!==!1,led13:C.placa.led13,ledTX:C.placa.ledTX}})}function Lt(A,nt){try{A(nt)}catch(ht){console.error(ht)}}function xt(A,nt){n&&Lt(n,{t:Date.now(),origen:"simulador",tipo:A,datos:nt})}function jt(A){d=A,h.estado.forEach(nt=>Lt(nt,A))}return typeof t._alAcercar=="function"&&t._alAcercar(A=>{u&&I.enviar({tipo:"mano",refs:A})}),typeof t._alPulsar=="function"&&t._alPulsar((A,nt)=>{u&&I.enviar({tipo:"pulsador",id:A,presionado:nt})}),t.alCambiar(A=>{u&&I.enviar({tipo:"circuito",circuito:A,mostrar:d!=="detenido",corrida:x})}),{iniciar(){if(!u||d==="corriendo")return;let A=d==="detenido";x++,A&&(k.length=0,b=null,C=null,E=0,Object.assign(_,{msSimulados:0,msReales:0,velocidad:1}),xt("simulacion_iniciada",{placa:i,modo:r})),jt("corriendo"),I.enviar({tipo:"iniciar",nuevo:A,corrida:x})},pausar(){d==="corriendo"&&(x++,I.enviar({tipo:"pausar",corrida:x}),jt("pausado"))},reiniciar(){!u||d==="detenido"||(x++,_.msSimulados=0,I.enviar({tipo:"reiniciar",corrida:x}),I.enviar({tipo:"iniciar",nuevo:!1,corrida:x}),E=0,xt("reinicio_placa",{motivo:"boton"}),jt("reiniciado"),jt("corriendo"))},detener(){d!=="detenido"&&(x++,I.enviar({tipo:"detener",corrida:x}),xt("simulacion_detenida",{ms_simulados:Math.round(_.msSimulados)}),jt("detenido"),b=null,D())},serialEnviar(A){d!=="detenido"&&I.enviar({tipo:"serial",texto:String(A)})},alSerial:A=>typeof A=="function"&&h.serial.push(A),alFalla:A=>typeof A=="function"&&h.falla.push(A),alEstado:A=>typeof A=="function"&&h.estado.push(A),medidas:()=>({..._,estado:d,hilo:I.hilo()}),destruir(){u&&(this.detener(),u=!1,cancelAnimationFrame(v),I.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>d==="detenido"||!b?null:{...b,fallas:[...k],modo:r,activas:l},_mediciones(){return this.mediciones()}}}function mn(e){let t=null,s="worker",i=!1,r=[],l=h=>{if(h&&h.tipo==="listo"){i=!0,r.length=0;return}e(h)};function n(){s="pagina",t=xn(l),r.splice(0).forEach(h=>t.postMessage(h))}try{if(!Fs||typeof Worker!="function")throw new Error("sin Worker");let h=URL.createObjectURL(new Blob([Fs],{type:"text/javascript"})),d=new Worker(h);d.onmessage=u=>{u.data&&u.data.tipo==="listo"&&URL.revokeObjectURL(h),l(u.data)},d.onerror=u=>{if(i)return console.error("TecnoCircuito:",u.message);u.preventDefault(),d.terminate(),n()},t=d}catch{n()}return{enviar(h){!i&&s==="worker"&&r.push(h),t.postMessage(h)},terminar:()=>t&&t.terminate(),hilo:()=>s}}function xn(e){let t={onmessage:null,postMessage:s=>setTimeout(()=>e(s))};return new Function("self",Fs)(t),{postMessage:s=>setTimeout(()=>t.onmessage&&t.onmessage({data:s})),terminate:()=>t.onmessage=null}}var eo=(e,t)=>e.toFixed(t).replace(".",","),Nt=e=>e==null?"al aire":eo(e,2)+" V",Tt=e=>eo(e*1e3,Math.abs(e)<.01?2:1)+" mA",qa=(e,t)=>(e>=1e3?eo(e/1e3,t)+" k":e+" ")+"\u03A9",Ha=e=>"Pin "+e.replace(/^D/,"");function Ga(e){if(!e||!e.leds)return[];let t=(d,u,x,C)=>({pieza:d,voltaje:u||"",corriente:x||"",detalle:C||""}),s=d=>{let u=e.entradas&&e.entradas[d];return u?u.alAire?`al aire: lee ${u.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:u.alto?"lee ALTO":"lee BAJO":""},i=new Set(e.pines.map(d=>d.pin)),r=e.servos||[],l=d=>r.find(u=>u.senal===d&&u.pulso),n=d=>{let u=l(d.pin);if(u)return`se\xF1al de servo: pulso de ${u.pulso} \xB5s`;let x=e.pwm&&e.pwm[d.pin];return x>.005&&x<.995?`PWM ${Math.round(x*100)} %`:s(d.pin)},h=e.usb;return[...e.pines.map(d=>t(Ha(d.pin),Nt(d.v),Tt(d.i),n(d))),...Object.keys(e.entradas||{}).filter(d=>!i.has(d)&&"placa."+d in e.voltajes).map(d=>t(Ha(d)+" (entrada)",Nt(e.voltajes["placa."+d]),"",s(d))),...(e.potenciometros||[]).map(d=>t(`${d.id} (${qa(d.ohmios,0)})`,Nt(d.v),Tt(d.i),`perilla ${Math.round(d.posicion*100)} %`)),...e.resistencias.map(d=>t(`${d.id} (${qa(d.ohmios,1)})`,Nt(d.v),Tt(d.i),eo(d.w*1e3,1)+" mW")),...e.leds.map(d=>t(d.id,Nt(d.v),Tt(d.i),d.quemado?"quemado":`brillo ${Math.round(d.brillo*100)} %`)),...r.map(d=>t(`${d.id} (${d.modelo.toUpperCase()})`,"",Tt(d.i),d.fuente?d.senal?`${Math.round(d.angulo)}\xB0${d.moviendo?", movi\xE9ndose":""}${d.pulso?` \xB7 pulso ${d.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...e.shield?[t(`${e.shield.id}: motores (EXT_PWR)`,Nt(e.shield.motoresV),"",e.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${e.shield.puente?"puesto":"quitado"}${e.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(e.motores||[]).map(d=>{let u=Math.abs(d.velocidad),x=Math.sign(d.velocidad)*(d.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return t(`${d.id} (${d.canal||"sin shield"})`,Nt(d.voltios),Tt(d.i),Math.abs(d.rpm)<1?"quieto":`${Math.round(Math.abs(d.rpm))} RPM \xB7 ${x} ${Math.round(u)} cm/s`)}),...(e.baterias||[]).map(d=>t(`${d.id} (LiPo 2S)`,Nt(d.voltios),d.conectada?Tt(d.i):"",`${eo(d.voltios/2,2)} V por celda${d.voltios/2<3.3?" \xB7 c\xE1rgala":""}${d.conectada?"":" \xB7 sin conectar"}`)),...r.length?[t("5V de la placa (USB)","",Tt(e.consumo5V),"el USB da hasta 500 mA")]:[],...h&&(r.length||h.reinicios||h.pico>.2)?[t("USB (placa y circuito)",Nt(h.voltios),Tt(h.amperios),`pico ${Tt(h.pico)} \xB7 fusible ${Math.round(h.fusible*100)} %${h.reinicios?` \xB7 ${h.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(Re)),crearLienzo:ja,crearSimulador:za,filasDeMediciones:Ga});})();
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
