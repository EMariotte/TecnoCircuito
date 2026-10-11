(()=>{var Ao=globalThis,Eo=Ao.ShadowRoot&&(Ao.ShadyCSS===void 0||Ao.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ia=Symbol(),Os=new WeakMap,je=class{constructor(e,o,s){if(this._$cssResult$=!0,s!==ia)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Eo&&e===void 0){let s=o!==void 0&&o.length===1;s&&(e=Os.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Os.set(o,e))}return e}toString(){return this.cssText}},Us=t=>new je(typeof t=="string"?t:t+"",void 0,ia),Ct=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((s,i,c)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[c+1],t[0]);return new je(o,t,ia)},Bs=(t,e)=>{if(Eo)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let s=document.createElement("style"),i=Ao.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=o.cssText,t.appendChild(s)}},ra=Eo?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let s of e.cssRules)o+=s.cssText;return Us(o)})(t):t;var{is:Tr,defineProperty:Mr,getOwnPropertyDescriptor:Ir,getOwnPropertyNames:kr,getOwnPropertySymbols:Dr,getPrototypeOf:Or}=Object,Po=globalThis,Vs=Po.trustedTypes,Ur=Vs?Vs.emptyScript:"",Br=Po.reactiveElementPolyfillSupport,We=(t,e)=>t,Fe={toAttribute(t,e){switch(e){case Boolean:t=t?Ur:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},_o=(t,e)=>!Tr(t,e),Ns={attribute:!0,type:String,converter:Fe,reflect:!1,useDefault:!1,hasChanged:_o};Symbol.metadata??=Symbol("metadata"),Po.litPropertyMetadata??=new WeakMap;var Dt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Ns){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,o);i!==void 0&&Mr(this.prototype,e,i)}}static getPropertyDescriptor(e,o,s){let{get:i,set:c}=Ir(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){let p=i?.call(this);c?.call(this,n),this.requestUpdate(e,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ns}static _$Ei(){if(this.hasOwnProperty(We("elementProperties")))return;let e=Or(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(We("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(We("properties"))){let o=this.properties,s=[...kr(o),...Dr(o)];for(let i of s)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[s,i]of o)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[o,s]of this.elementProperties){let i=this._$Eu(o,s);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)o.unshift(ra(i))}else e!==void 0&&o.push(ra(e));return o}static _$Eu(e,o){let s=o.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let s of o.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Bs(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,s){this._$AK(e,s)}_$ET(e,o){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let c=(s.converter?.toAttribute!==void 0?s.converter:Fe).toAttribute(o,s.type);this._$Em=e,c==null?this.removeAttribute(i):this.setAttribute(i,c),this._$Em=null}}_$AK(e,o){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let c=s.getPropertyOptions(i),n=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:Fe;this._$Em=i;let p=n.fromAttribute(o,c.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(e,o,s,i=!1,c){if(e!==void 0){let n=this.constructor;if(i===!1&&(c=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??_o)(c,o)||s.useDefault&&s.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,o,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:s,reflect:i,wrapped:c},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),c!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,c]of this._$Ep)this[i]=c;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,c]of s){let{wrapped:n}=c,p=this[i];n!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,c,p)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(o)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Dt.elementStyles=[],Dt.shadowRootOptions={mode:"open"},Dt[We("elementProperties")]=new Map,Dt[We("finalized")]=new Map,Br?.({ReactiveElement:Dt}),(Po.reactiveElementVersions??=[]).push("2.1.2");var ha=globalThis,Ls=t=>t,To=ha.trustedTypes,js=To?To.createPolicy("lit-html",{createHTML:t=>t}):void 0,Gs="$lit$",zt=`lit$${Math.random().toFixed(9).slice(2)}$`,Xs="?"+zt,Vr=`<${Xs}>`,ie=document,qe=()=>ie.createComment(""),He=t=>t===null||typeof t!="object"&&typeof t!="function",ua=Array.isArray,Nr=t=>ua(t)||typeof t?.[Symbol.iterator]=="function",na=`[ 	
\f\r]`,ze=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ws=/-->/g,Fs=/>/g,ae=RegExp(`>|${na}(?:([^\\s"'>=/]+)(${na}*=${na}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zs=/'/g,qs=/"/g,Ks=/^(?:script|style|textarea|title)$/i,ma=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),ft=ma(1),Ut=ma(2),qn=ma(3),Ot=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Hs=new WeakMap,se=ie.createTreeWalker(ie,129);function Ys(t,e){if(!ua(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return js!==void 0?js.createHTML(e):e}var Lr=(t,e)=>{let o=t.length-1,s=[],i,c=e===2?"<svg>":e===3?"<math>":"",n=ze;for(let p=0;p<o;p++){let d=t[p],u,x,g=-1,C=0;for(;C<d.length&&(n.lastIndex=C,x=n.exec(d),x!==null);)C=n.lastIndex,n===ze?x[1]==="!--"?n=Ws:x[1]!==void 0?n=Fs:x[2]!==void 0?(Ks.test(x[2])&&(i=RegExp("</"+x[2],"g")),n=ae):x[3]!==void 0&&(n=ae):n===ae?x[0]===">"?(n=i??ze,g=-1):x[1]===void 0?g=-2:(g=n.lastIndex-x[2].length,u=x[1],n=x[3]===void 0?ae:x[3]==='"'?qs:zs):n===qs||n===zs?n=ae:n===Ws||n===Fs?n=ze:(n=ae,i=void 0);let A=n===ae&&t[p+1].startsWith("/>")?" ":"";c+=n===ze?d+Vr:g>=0?(s.push(u),d.slice(0,g)+Gs+d.slice(g)+zt+A):d+zt+(g===-2?p:A)}return[Ys(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Ge=class t{constructor({strings:e,_$litType$:o},s){let i;this.parts=[];let c=0,n=0,p=e.length-1,d=this.parts,[u,x]=Lr(e,o);if(this.el=t.createElement(u,s),se.currentNode=this.el.content,o===2||o===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=se.nextNode())!==null&&d.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(Gs)){let C=x[n++],A=i.getAttribute(g).split(zt),b=/([.?@])?(.*)/.exec(C);d.push({type:1,index:c,name:b[2],strings:A,ctor:b[1]==="."?la:b[1]==="?"?da:b[1]==="@"?fa:Ce}),i.removeAttribute(g)}else g.startsWith(zt)&&(d.push({type:6,index:c}),i.removeAttribute(g));if(Ks.test(i.tagName)){let g=i.textContent.split(zt),C=g.length-1;if(C>0){i.textContent=To?To.emptyScript:"";for(let A=0;A<C;A++)i.append(g[A],qe()),se.nextNode(),d.push({type:2,index:++c});i.append(g[C],qe())}}}else if(i.nodeType===8)if(i.data===Xs)d.push({type:2,index:c});else{let g=-1;for(;(g=i.data.indexOf(zt,g+1))!==-1;)d.push({type:7,index:c}),g+=zt.length-1}c++}}static createElement(e,o){let s=ie.createElement("template");return s.innerHTML=e,s}};function ye(t,e,o=t,s){if(e===Ot)return e;let i=s!==void 0?o._$Co?.[s]:o._$Cl,c=He(e)?void 0:e._$litDirective$;return i?.constructor!==c&&(i?._$AO?.(!1),c===void 0?i=void 0:(i=new c(t),i._$AT(t,o,s)),s!==void 0?(o._$Co??=[])[s]=i:o._$Cl=i),i!==void 0&&(e=ye(t,i._$AS(t,e.values),i,s)),e}var ca=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:s}=this._$AD,i=(e?.creationScope??ie).importNode(o,!0);se.currentNode=i;let c=se.nextNode(),n=0,p=0,d=s[0];for(;d!==void 0;){if(n===d.index){let u;d.type===2?u=new Xe(c,c.nextSibling,this,e):d.type===1?u=new d.ctor(c,d.name,d.strings,this,e):d.type===6&&(u=new pa(c,this,e)),this._$AV.push(u),d=s[++p]}n!==d?.index&&(c=se.nextNode(),n++)}return se.currentNode=ie,i}p(e){let o=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,o),o+=s.strings.length-2):s._$AI(e[o])),o++}},Xe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,s,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=ye(this,e,o),He(e)?e===Y||e==null||e===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==Ot&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Y&&He(this._$AH)?this._$AA.nextSibling.data=e:this.T(ie.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ge.createElement(Ys(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(o);else{let c=new ca(i,this),n=c.u(this.options);c.p(o),this.T(n),this._$AH=c}}_$AC(e){let o=Hs.get(e.strings);return o===void 0&&Hs.set(e.strings,o=new Ge(e)),o}k(e){ua(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,s,i=0;for(let c of e)i===o.length?o.push(s=new t(this.O(qe()),this.O(qe()),this,this.options)):s=o[i],s._$AI(c),i++;i<o.length&&(this._$AR(s&&s._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let s=Ls(e).nextSibling;Ls(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ce=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,s,i,c){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=c,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Y}_$AI(e,o=this,s,i){let c=this.strings,n=!1;if(c===void 0)e=ye(this,e,o,0),n=!He(e)||e!==this._$AH&&e!==Ot,n&&(this._$AH=e);else{let p=e,d,u;for(e=c[0],d=0;d<c.length-1;d++)u=ye(this,p[s+d],o,d),u===Ot&&(u=this._$AH[d]),n||=!He(u)||u!==this._$AH[d],u===Y?e=Y:e!==Y&&(e+=(u??"")+c[d+1]),this._$AH[d]=u}n&&!i&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},la=class extends Ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}},da=class extends Ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Y)}},fa=class extends Ce{constructor(e,o,s,i,c){super(e,o,s,i,c),this.type=5}_$AI(e,o=this){if((e=ye(this,e,o,0)??Y)===Ot)return;let s=this._$AH,i=e===Y&&s!==Y||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,c=e!==Y&&(s===Y||i);i&&this.element.removeEventListener(this.name,this,s),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},pa=class{constructor(e,o,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){ye(this,e)}};var jr=ha.litHtmlPolyfillSupport;jr?.(Ge,Xe),(ha.litHtmlVersions??=[]).push("3.3.3");var Js=(t,e,o)=>{let s=o?.renderBefore??e,i=s._$litPart$;if(i===void 0){let c=o?.renderBefore??null;s._$litPart$=i=new Xe(e.insertBefore(qe(),c),c,void 0,o??{})}return i._$AI(t),i};var xa=globalThis,tt=class extends Dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Js(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ot}};tt._$litElement$=!0,tt.finalized=!0,xa.litElementHydrateSupport?.({LitElement:tt});var Wr=xa.litElementPolyfillSupport;Wr?.({LitElement:tt});(xa.litElementVersions??=[]).push("4.2.2");var At=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Fr={attribute:!0,type:String,converter:Fe,reflect:!1,hasChanged:_o},zr=(t=Fr,e,o)=>{let{kind:s,metadata:i}=o,c=globalThis.litPropertyMetadata.get(i);if(c===void 0&&globalThis.litPropertyMetadata.set(i,c=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),s==="accessor"){let{name:n}=o;return{set(p){let d=e.get.call(this);e.set.call(this,p),this.requestUpdate(n,d,t,!0,p)},init(p){return p!==void 0&&this.C(n,void 0,t,p),p}}}if(s==="setter"){let{name:n}=o;return function(p){let d=this[n];e.call(this,p),this.requestUpdate(n,d,t,!0,p)}}throw Error("Unsupported decorator location: "+s)};function N(t){return(e,o)=>typeof o=="object"?zr(t,e,o):((s,i,c)=>{let n=i.hasOwnProperty(c);return i.constructor.createProperty(c,s),n?Object.getOwnPropertyDescriptor(i,c):void 0})(t,e,o)}var re=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function Zs(t,e){return(o,s,i)=>{let c=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:p}=typeof s=="object"?o:i??(()=>{let d=Symbol();return{get(){return this[d]},set(u){this[d]=u}}})();return re(o,s,{get(){let d=n.call(this);return d===void 0&&(d=c(this),(d!==null||this.hasUpdated)&&p.call(this,d)),d}})}return re(o,s,{get(){return c(this)}})}}var Qs=Ut`
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
`;var vt=t=>({type:"analog",channel:t}),Ke=(t,e=0)=>({type:"i2c",signal:t,bus:e}),Ye=(t,e=0)=>({type:"spi",signal:t,bus:e}),ga=(t,e=0)=>({type:"usart",signal:t,bus:e});var ve=[" ","Spacebar"];function qr(){return typeof navigator=="object"?navigator.userAgent:""}function Hr(){return qr().indexOf("Macintosh")>=0}function ti(t){return Hr()?t.metaKey:t.ctrlKey}var ne=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},qt=class extends tt{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[vt(5),Ke("SCL")]},{name:"A4.2",x:97,y:9,signals:[vt(4),Ke("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[Ye("SCK")]},{name:"12",x:134.5,y:9,signals:[Ye("MISO")]},{name:"11",x:144,y:9,signals:[Ye("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[Ye("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[ga("TX")]},{name:"0",x:255.5,y:9,signals:[ga("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[vt(0)]},{name:"A1",x:217.5,y:191.5,signals:[vt(1)]},{name:"A2",x:227,y:191.5,signals:[vt(2)]},{name:"A3",x:236.5,y:191.5,signals:[vt(3)]},{name:"A4",x:246,y:191.5,signals:[vt(4),Ke("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[vt(5),Ke("SCL")]}]}static get styles(){return Ct`
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
    `}render(){let{ledPower:e,led13:o,ledRX:s,ledTX:i}=this;return ft`
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

        ${Qs}

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
          @keydown=${c=>ve.includes(c.key)&&this.down()}
          @keyup=${c=>ve.includes(c.key)&&this.up()}
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
          ${e&&Ut`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&Ut`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${i&&Ut`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${s&&Ut`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};ne([N()],qt.prototype,"led13",void 0);ne([N()],qt.prototype,"ledRX",void 0);ne([N()],qt.prototype,"ledTX",void 0);ne([N()],qt.prototype,"ledPower",void 0);ne([N()],qt.prototype,"resetPressed",void 0);ne([Zs("#reset-button")],qt.prototype,"resetButton",void 0);qt=ne([At("wokwi-arduino-uno")],qt);var ei=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},ba={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},ya=class extends tt{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return Ct`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,s=Math.round(e/10**o);return e===0?[0,0]:[Math.round(s%100),o]}render(){let{value:e}=this,o=parseFloat(e),[s,i]=this.breakValue(o),c=ba[Math.floor(s/10)],n=ba[s%10],p=ba[i];return ft`
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
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${p}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};ei([N()],ya.prototype,"value",void 0);ya=ei([At("wokwi-resistor")],ya);var ce=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Gr={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},Ht=class extends tt{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return Ct`
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
    `}update(e){e.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(e)}renderSVG(){let{color:e,lightColor:o,flip:s}=this,i=o||Gr[e?.toLowerCase()]||e,c=this.brightness?.3+this.brightness*.7:0,n=this.value&&this.brightness>Number.EPSILON;return ft`<svg
      width="40"
      height="50"
      transform="scale(${s?-1:1} 1)"
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
          fill="${i}"
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
    </svg> `}render(){return ft`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};ce([N()],Ht.prototype,"value",void 0);ce([N()],Ht.prototype,"brightness",void 0);ce([N()],Ht.prototype,"color",void 0);ce([N()],Ht.prototype,"lightColor",void 0);ce([N()],Ht.prototype,"label",void 0);ce([N({type:Boolean})],Ht.prototype,"flip",void 0);Ht=ce([At("wokwi-led")],Ht);var oi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ai=t=>(...e)=>({_$litDirective$:t,values:e}),Mo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,s){this._$Ct=e,this._$AM=o,this._$Ci=s}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var si="important",Xr=" !"+si,ii=ai(class extends Mo{constructor(t){if(super(t),t.type!==oi.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let s=t[o];return s==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let s of this.ft)e[s]==null&&(this.ft.delete(s),s.includes("-")?o.removeProperty(s):o[s]=null);for(let s in e){let i=e[s];if(i!=null){this.ft.add(s);let c=typeof i=="string"&&i.endsWith(Xr);s.includes("-")||c?o.setProperty(s,c?i.slice(0,-11):i,c?si:""):o[s]=i}}return Ot}});var Io=(t,e,o)=>{let s=Math.min(o,e);return Math.max(s,t)};function ri(t,e){let o=e.transformPoint({x:t.left,y:t.top}),s=e.transformPoint({x:t.right,y:t.top}),i=e.transformPoint({x:t.left,y:t.bottom}),c=e.transformPoint({x:t.right,y:t.bottom}),n=Math.min(o.x,s.x,i.x,c.x),p=Math.min(o.y,s.y,i.y,c.y),d=Math.max(o.x,s.x,i.x,c.x),u=Math.max(o.y,s.y,i.y,c.y);return new DOMRect(n,p,d-n,u-p)}function ni(t,e,o){let{userAgent:s}=navigator;if(s.indexOf("Epiphany")>=0||s.indexOf("Safari")>=0){let c=t.getCTM(),n=e?.getCTM(),p=e?.getBoundingClientRect(),d=e?.ownerSVGElement?.getBoundingClientRect();if(!p||!d||!n||!c)return null;let u=d.x+d.width/2,x=d.y+d.height/2,g=u-(p.x+p.width/2),C=x-(p.y+p.height/2),A=Math.atan2(C,g)/Math.PI*180,b=new DOMMatrix().rotate(A),E=ri(o,b),M=E.width/p.width,I=E.height/p.height,K=n.inverse().multiply(c);return b.inverse().translate(E.left,E.top).multiply(K.inverse()).scale(M,I).translate(-p.left,-p.top)}else return t.getScreenCTM()?.inverse()||null}var le=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},ko={x:9.91,y:8.18},Gt=class extends tt{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[vt(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return Ct`
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
    `}mapToMinMax(e,o,s){return e*(s-o)+o}percentFromMinMax(e,o,s){return(e-o)/(s-o)}renderSVG(){let e=Io(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return ft`<svg
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
      style=${ii({"--knob-angle":o+"deg"})}
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
        cx=${ko.x}
        cy=${ko.y}
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
    </svg>`}render(){return ft`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?ni(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",s=o?e.touches[0].pageX:e.pageX,i=o?e.touches[0].pageY:e.pageY,c=new DOMPointReadOnly(s,i).matrixTransform(this.pageToKnobMatrix),n=ko.x-c.x,p=ko.y-c.y,d=Math.round(Math.atan2(p,n)*180/Math.PI);d<0&&(d+=360),d-=90,n>0&&p<=0&&d>0&&(d-=360),d=Io(this.startDegree,this.endDegree,d);let u=this.percentFromMinMax(d,this.startDegree,this.endDegree),x=this.mapToMinMax(u,this.min,this.max);this.updateValue(x)}updateValue(e){let o=Io(this.min,this.max,e),s=Math.round(o/this.step)*this.step;this.value=Math.round(s*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};le([N({type:Number})],Gt.prototype,"min",void 0);le([N({type:Number})],Gt.prototype,"max",void 0);le([N()],Gt.prototype,"value",void 0);le([N()],Gt.prototype,"step",void 0);le([N()],Gt.prototype,"startDegree",void 0);le([N()],Gt.prototype,"endDegree",void 0);Gt=le([At("wokwi-potentiometer")],Gt);var Je=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Ca,Se=class extends tt{static{Ca=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Ca.pushbuttonCounter++}static get styles(){return Ct`
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
    `}renderSVG(){let{color:e,uniqueId:o,xray:s}=this,i=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return ft`<svg
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
      ${s?Ut`
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
        <circle cx="6" cy="6" r="3.822" fill="${i}" />
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
    </svg>`}render(){let{color:e,label:o}=this;return ft`
      <button
        aria-label="${o} ${e} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${s=>ve.includes(s.key)&&this.down()}
        @keyup=${s=>ve.includes(s.key)&&this.up(s)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(ti(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};Je([N()],Se.prototype,"color",void 0);Je([N()],Se.prototype,"pressed",void 0);Je([N()],Se.prototype,"label",void 0);Je([N({type:Boolean,attribute:"xray"})],Se.prototype,"xray",void 0);Se=Ca=Je([At("wokwi-pushbutton")],Se);var ci=`:host {
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
`;var Et={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var j=9.6/2.54,H=57.6,Do=14.4,li={x:Do,ancho:32.2*j},St={x:Do+(32.2-22.2)/2*j,ancho:22.2*j,alto:11.8*j},we={x:St.x+5.9*j,y:H},va=13.5*j,$e=182.4,Uo={ancho:201.6,alto:86.4},Oo={GND:{x:$e,y:H-9.6,color:"#7a4a24"},VCC:{x:$e,y:H,color:"#d7263d"},SIG:{x:$e,y:H+9.6,color:"#f28c28"}},_=t=>Math.round(t*100)/100,Sa=t=>`rotate(${_(-t)} ${_(we.x)} ${_(we.y)})`;function wa(t="sg90",e=90){let o=Et[t]||Et.sg90,{ancho:s,alto:i}=Uo,c=H-St.alto/2,n=_(we.x),p=St.x+St.ancho,d=t==="sg90",u=Object.values(Oo).map((C,A)=>{let b=H-4+A*4;return`<path d="M${_(p)} ${_(b)} C ${_(p+26)} ${_(b)}, ${_($e-34)} ${_(C.y)}, ${_($e-9)} ${_(C.y)}" fill="none" stroke="${C.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),x=Object.values(Oo).map(C=>`<rect x="${_(C.x-2.2)}" y="${_(C.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),g=d?`<circle cx="${_(St.x+15*j)}" cy="${H}" r="${_(3.6*j)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${_(St.x+9.5*j)}" cy="${_(H+2.2*j)}" r="${_(2.2*j)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}"><title>Servo ${o.nombre}</title>`+u+`<rect x="${_($e-9)}" y="${_(H-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+x+`<rect x="${_(li.x)}" y="${_(c+1.5)}" width="${_(li.ancho)}" height="${_(St.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${d?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${_(Do+2.4*j)}" cy="${H}" r="${_(1*j)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${_(Do+(32.2-2.4)*j)}" cy="${H}" r="${_(1*j)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${_(St.x)}" y="${_(c)}" width="${_(St.ancho)}" height="${_(St.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${d?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+g+`<text x="${_(St.x+15.5*j)}" y="${_(H+4.1*j)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${n}" cy="${H}" r="${_(5.2*j)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${Sa(e)}"><path d="M${n} ${_(H-3.2*j/2-1)} L${_(we.x+va)} ${_(H-1.1*j)} A ${_(1.1*j)} ${_(1.1*j)} 0 0 1 ${_(we.x+va)} ${_(H+1.1*j)} L${n} ${_(H+3.2*j/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${n}" cy="${H}" r="${_(3.4*j)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(C=>`<circle cx="${_(we.x+va*C)}" cy="${H}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${n}" cy="${H}" r="${_(1.3*j)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var J=3.779527559055118,Ze={ancho:72.58*J,alto:53.34*J},Re=4*J,at=5*J,Yr=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],Vt=Re+4.6*J,Nt=Ze.ancho-.5-4.6*J,Bt=60,Pt=(t,e)=>({x:t,y:Bt+e*at}),Xt={M1A:Pt(Vt,0),M1B:Pt(Vt,1),GND_IZQ:Pt(Vt,2),M2A:Pt(Vt,3),M2B:Pt(Vt,4),M4A:Pt(Nt,0),M4B:Pt(Nt,1),GND_DER:Pt(Nt,2),M3A:Pt(Nt,3),M3B:Pt(Nt,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+at,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},fi={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},pi=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],R=t=>Math.round(t*100)/100,G=(t,e,o,{tam:s=6.2,ancla:i="middle",peso:c="bold",color:n="#ffffff",giro:p=0}={})=>`<text x="${R(t)}" y="${R(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${i}" fill="${n}"${p?` transform="rotate(${p} ${R(t)} ${R(e)})"`:""}>${o}</text>`;function $a(t,e,o,s){let i=19.3*J,c=6.4*J,n=t-i/2,p=e-c/2,d="";for(let u=0;u<8;u++){let x=t-8.89*J+u*2.54*J;d+=`<rect x="${R(x-1.6)}" y="${R(p-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,d+=`<rect x="${R(x-1.6)}" y="${R(p+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${R(t)} ${R(e)})">`+d+`<rect x="${R(n)}" y="${R(p)}" width="${R(i)}" height="${R(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${R(n)} ${R(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+G(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+G(t,e-i/2-3,s,{tam:5.2})}function Ra(t,e,o,s=!0){let i=s?5.6*J:o*at+.6*J,c=s?o*at+.6*J:5.6*J,n=s?t-i/2:t-at/2-.3*J,p=s?e-at/2-.3*J:e-c/2,d="";for(let u=0;u<o;u++){let x=s?t:t+u*at,g=s?e+u*at:e;d+=`<circle cx="${R(x)}" cy="${R(g)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,d+=`<line x1="${R(x-4.2)}" y1="${R(g)}" x2="${R(x+4.2)}" y2="${R(g)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${R(n)}" y="${R(p)}" width="${R(i)}" height="${R(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+d}var di=(t,e,o)=>`<circle cx="${R(t)}" cy="${R(e)}" r="${R(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${R(t)} ${R(e-o/2)} a ${R(o/2)} ${R(o/2)} 0 0 1 0 ${R(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${R(t)}" cy="${R(e)}" r="${R(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Aa(t=!0){let{ancho:e,alto:o}=Ze,s=Yr.map(({y:p,xs:d})=>{let u=d[0]-4.6,x=d[d.length-1]+4.6;return`<rect x="${R(u)}" y="${R(p-4.6)}" width="${R(x-u)}" height="9.2" fill="#151515"/>`+d.map(g=>`<rect x="${R(g-1.6)}" y="${R(p-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),i=["S2","S1"].map(p=>["SIG","POS","GND"].map(d=>{let u=Xt[`${p}_${d}`];return`<rect x="${R(u.x-4.4)}" y="${R(u.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${R(u.x-1.4)}" y="${R(u.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,n=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${R(e)}" height="${R(o)}" viewBox="0 0 ${R(e)} ${R(o)}"><title>Shield de motores L293D</title><rect x="${R(Re)}" y="0.5" width="${R(e-Re-.5)}" height="${R(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+s+$a(82,86,"L293D","U1")+$a(145,86,"74HC595","U3")+$a(205,86,"L293D","U2")+di(118,140,6.3*J)+di(205,140,6.3*J)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${n}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+Ra(Vt,Bt,5)+Ra(Nt,Bt,5)+Ra(Xt.EXT_POS.x,Xt.EXT_POS.y,2,!1)+i+`<rect x="${c-9}" y="${n-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${c-9.6}" y="${n-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${R(Re+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${R(Re+15)}" cy="169" r="5" fill="#2b2b2b"/>`+G(Vt+13,Bt+at/2+3,"M1",{tam:7})+G(Vt+13,Bt+3.5*at+3,"M2",{tam:7})+G(Vt+12,Bt+2*at+2.5,"GND",{tam:5})+G(Nt-13,Bt+at/2+3,"M4",{tam:7})+G(Nt-13,Bt+3.5*at+3,"M3",{tam:7})+G(Nt-12,Bt+2*at+2.5,"GND",{tam:5})+G(Xt.EXT_POS.x+at/2,193,"EXT_PWR",{tam:5.6})+G(Xt.EXT_POS.x,165,"+M",{tam:5})+G(Xt.EXT_GND.x,165,"GND",{tam:5})+G(c,n-8,"PWR",{tam:5.6})+G(52,16,"SERVO_2",{tam:5,ancla:"start"})+G(52,26,"SERVO_1",{tam:5,ancla:"start"})+G(26,7.4,"S",{tam:4.6})+G(35.6,7.4,"+",{tam:5})+G(45.2,7.4,"\u2212",{tam:5})+G(Re+15,156,"RESET",{tam:4.6})+G(196,162,"Motor Shield L293D",{tam:6.4})+G(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var L=3.779527559055118,st={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},ui=st.voltiosRef/(st.mABloqueado/1e3),mi=st.rpmSinCarga*st.reduccion*2*Math.PI/60,xi=st.mASinCarga/1e3,_a=(st.voltiosRef-xi*ui)/mi,wl=_a*xi/mi,$l=st.tauMecanicoMs/1e3*_a*_a/ui;var Ta=64.2*L,de=22.5*L,Ea=40*L,Ma=11.2*L,mt=st.ruedaMM*L/2,Jr={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Ma,y0:132-de/2}},Qe=t=>Jr[t&&t.vista==="rueda"?"rueda":"eje"],gi=t=>{let e=t.y0+de/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function bi(t){let e=Qe(t),o=gi(e);if(t&&t.lado==="derecho")for(let s of["A","B"])o[s]={...o[s],x:e.ancho-o[s].x};return o}var v=t=>Math.round(t*100)/100,Pa=(t,e,o,{tam:s=11,color:i="#1f2328",peso:c="bold",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${v(t)}" y="${v(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`;function Zr(t,e){let o=e+de/2;return`<rect x="${v(t+Ea-2)}" y="${v(o-9.5*L)}" width="${v(Ta-Ea+2)}" height="${v(19*L)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${v(t+Ta-6*L)}" y="${v(o-8*L)}" width="${v(6*L)}" height="${v(16*L)}" rx="4" fill="#2b2b2b"/><rect x="${v(t)}" y="${v(e)}" width="${v(Ea)}" height="${v(de)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${v(t+31.8*L-8.75*L)}" cy="${v(o)}" r="${v(1.5*L)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${v(t+31.8*L+8.75*L-6)}" cy="${v(o)}" r="${v(1.5*L)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function Qr(t){let e=gi(t),o=t.x0+Ta,s=t.y0+de/2;return["A","B"].map((i,c)=>{let n=s+(c?3:-3);return`<path d="M${v(o)} ${v(n)} C ${v(o+20)} ${v(n)}, ${v(e[i].x-22)} ${v(e[i].y)}, ${v(e[i].x-6)} ${v(e[i].y)}" fill="none" stroke="${e[i].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${v(e[i].x-4.2)}" y="${v(e[i].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function tn(t,e){let o=2.7*L;return`<circle cx="${v(t)}" cy="${v(e)}" r="${v(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${v(t)} ${v(e)})"><path d="M${v(t-o)} ${v(e-1.8*L)} H${v(t+o)} V${v(e+1.8*L)} H${v(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${v(t)}" cy="${v(e)}" r="${v(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function en(t,e){let o=[0,72,144,216,288].map(i=>`<rect x="${v(t-12)}" y="${v(e-mt*.72)}" width="24" height="${v(mt*.72)}" rx="6" fill="#f2c318" transform="rotate(${i} ${v(t)} ${v(e)})"/>`).join(""),s=Array.from({length:24},(i,c)=>`<rect x="${v(t-3)}" y="${v(e-mt-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${v(t)} ${v(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${v(t)} ${v(e)})"><circle cx="${v(t)}" cy="${v(e)}" r="${v(mt*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${v(mt*.24)}"/>`+s+`<circle cx="${v(t)}" cy="${v(e)}" r="${v(mt*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${v(t)}" cy="${v(e)}" r="${v(7*L)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${v(t-2.7*L)}" y="${v(e-1.8*L)}" width="${v(5.4*L)}" height="${v(3.6*L)}" fill="#7a5d00"/></g>`}function yi(t={}){let e=Qe(t),o=t.lado==="derecho",s=e.x0+Ma,i=e.y0+de/2,c=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",n=o?e.ancho-s:s,p=Zr(e.x0,e.y0)+Qr(e),d=o?e.ancho-(e.x0+26*L):e.x0+26*L,u=Pa(d,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(p+=en(s,i),u+=`<line x1="${v(n-mt-10)}" y1="${v(i+mt+2)}" x2="${v(n+mt+10)}" y2="${v(i+mt+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${v(n)} ${v(i+mt+20)})"></g>`+Pa(n,i+mt+46,"quieto",{tam:13,marca:"data-velocidad"})):(p+=tn(s,i),u+=Pa(n,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${p}</g>${u}</svg>`}var hi=new WeakMap;function Ci(t,e,o){let s=Qe(e),i=s.x0+Ma,c=s.y0+de/2,n=o||{rpm:0,giro:0,velocidad:0},p=t.querySelector("[data-eje],[data-rueda]");p&&p.setAttribute("transform",`rotate(${v(-n.giro)} ${v(i)} ${v(c)})`);let d=t.querySelector("[data-rpm]"),u=hi.get(t)||{},x=n.rpm>0!=(e.lado==="derecho");if(d){let A=Math.abs(n.rpm)<1?"0 RPM":`${Math.round(Math.abs(n.rpm))} RPM ${x?"\u27F2":"\u27F3"}`;A!==u.rpm&&(d.textContent=u.rpm=A)}let g=t.querySelector("[data-velocidad]"),C=t.querySelector("[data-flecha]");if(g&&C){let A=Math.sign(n.velocidad)*(e.lado==="derecho"?-1:1),b=Math.abs(n.velocidad),E=b<.5,M=E?"quieto":`${A>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(b)} cm/s`;M!==u.vel&&(g.textContent=u.vel=M);let I=E?0:x?-1:1,K=`${I}|${A}`;K!==u.flecha&&(u.flecha=K,C.innerHTML=E?"":`<path d="M${-40*I} -5 H${22*I} V-12 L${40*I} 0 L${22*I} 12 V5 H${-40*I} Z" fill="${A>0?"#2e9e44":"#d7263d"}"/>`)}hi.set(t,u)}var vi=3.779527559055118,gt={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Bo={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var oo=360,Ia=150,Kt=10,xt=10,Yt=72*vi,to=34*vi,ka={ancho:oo,alto:Ia},Jt=Kt+Yt+58,Ee=xt+to-34,eo={POS:{x:oo-12,y:xt+30,color:"#d7263d"},NEG:{x:oo-12,y:xt+39.6,color:"#2b2b2b"},BAL0:{x:Jt,y:Ee,color:"#2b2b2b"},BAL1:{x:Jt,y:Ee+9.6,color:"#e05a5a"},BAL2:{x:Jt,y:Ee+19.2,color:"#d7263d"}},V=t=>Math.round(t*100)/100,Ae=(t,e,o,{tam:s=11,color:i="#ffffff",peso:c="bold",ancla:n="middle",marca:p=""}={})=>`<text${p?` ${p}="1"`:""} x="${V(t)}" y="${V(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${n}" fill="${i}">${o}</text>`;function Da(t="nominal"){let e=gt[t]||gt.nominal,o=Kt+Yt,s=["POS","NEG"].map((c,n)=>{let p=eo[c],d=xt+24+n*10;return`<path d="M${V(o)} ${V(d)} C ${V(o+26)} ${V(d)}, ${V(p.x-26)} ${V(p.y)}, ${V(p.x-6)} ${V(p.y)}" fill="none" stroke="${p.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${V(p.x-4.4)}" y="${V(p.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),i=["BAL0","BAL1","BAL2"].map((c,n)=>{let p=eo[c],d=xt+to-40+n*4;return`<path d="M${V(o)} ${V(d)} C ${V(o+18)} ${V(d)}, ${V(p.x-30)} ${V(p.y)}, ${V(p.x-7)} ${V(p.y)}" fill="none" stroke="${p.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${V(Jt-7)}" y="${V(Ee-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(c=>`<rect x="${V(Jt-2.4)}" y="${V(eo[c].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+Ae(Jt-14,Ee+2.5,"\u2212",{tam:8,color:"#5a6673"})+Ae(Jt-14,Ee+21.7,"+",{tam:8,color:"#5a6673"})+Ae(Jt,xt+to+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${oo}" height="${Ia}" viewBox="0 0 ${oo} ${Ia}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+s+i+`<rect x="${Kt}" y="${xt}" width="${V(Yt)}" height="${V(to)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${Kt+14}" y="${xt+12}" width="${V(Yt-28)}" height="${V(to-24)}" rx="4" fill="#3f4752"/>`+Ae(Kt+Yt/2,xt+36,"LiPo 2S \xB7 7,4 V",{tam:15})+Ae(Kt+Yt/2,xt+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${V(Kt+Yt/2-33+c*23)}" y="${xt+66}" width="20" height="12" rx="2" fill="${c<e.barras?e.color:"#5a6370"}"/>`).join("")+Ae(Kt+Yt/2,xt+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function Si(t,e,o){let s=t.querySelector("[data-voltios]");if(!s)return;let i=gt[e]||gt.nominal,c=o&&typeof o.voltios=="number"?o.voltios:i.voltios;s.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${i.nombre}`}var Qt={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},Zt=210,Ua=140,Va={ancho:Zt,alto:Ua},Ei=9.6,Pi=82,on=132,Na=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:Pi+e*Ei,y:on}])),et=t=>Math.round(t*100)/100,Oa=(t,e,o,{tam:s=7,color:i="#5a6673",peso:c="bold",marca:n=""}={})=>`<text${n} x="${et(t)}" y="${et(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`,Ba={ancho:24,alto:46,grueso:5},an=[76,112,148],wi=34,$i="#ff3b30",Vo="#3a1414";function sn(t,e){let{ancho:o,alto:s,grueso:i}=Ba,c=s/2,n=(p,d,u,x)=>({x:t+p,y:e+d,w:u,h:x});return{a:n(i/2,0,o-i,i),b:n(o-i,i/2,i,c-i),c:n(o-i,c+i/2,i,c-i),d:n(i/2,s-i,o-i,i),e:n(0,c+i/2,i,c-i),f:n(0,i/2,i,c-i),g:n(i/2,c-i/2,o-i,i)}}var rn={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function _i(t=Qt.umbralV){let e=an.map((i,c)=>{let n=sn(i,wi);return Object.entries(n).map(([p,d])=>`<rect data-seg="${c}${p}" x="${et(d.x)}" y="${et(d.y)}" width="${et(d.w)}" height="${et(d.h)}" rx="2" fill="${Vo}"/>`).join("")+`<circle data-seg="${c}p" cx="${et(i+Ba.ancho+5)}" cy="${et(wi+Ba.alto-2)}" r="2.8" fill="${Vo}"/>`}).join(""),o=Object.entries(Na).map(([i,c],n)=>`<rect x="${et(c.x-1.2)}" y="122" width="2.4" height="${et(c.y-120)}" fill="#c9ccd1"/>`+Oa(c.x,108,n===0?"\u2212":String(n),{tam:n===0?8:6.5})).join(""),s=[0,1].map(i=>{let c=38+i*44;return`<path d="M${et(8)} ${et(c-10)} q -6 10 0 20 M${et(3)} ${et(c-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${Zt}" height="${Ua}" viewBox="0 0 ${Zt} ${Ua}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${Zt-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${Zt-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(i=>`<circle cx="38" cy="${i}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${i}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${s}</g><rect x="66" y="22" width="${Zt-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${et(Pi-6)}" y="114" width="${et(8*Ei+12)}" height="9" fill="#151515"/>`+o+Oa(Zt/2+30,18,"1-8S",{tam:6.5})+Oa(Zt/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function Ri(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,s]=e.split(".");return(o+s).slice(0,3).split("").map((c,n)=>({c,punto:n===o.length-1}))}var Ai=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function nn(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[Ri(t.total),Ai(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((s,i)=>o.push(Ai(`-${i+1}-`),Ri(s))),o[Math.floor(e/Qt.pasoMs)%o.length]}function La(t,e,o){let s=t.querySelector("[data-umbral]"),i=e&&typeof e.umbral=="number"?e.umbral:Qt.umbralV;if(s){let x=`alarma ${i?String(i).replace(".",",")+" V":"apagada"}`;s.textContent!==x&&(s.textContent=x)}let c=o&&o.ms||0,p=o&&o.alarma&&Math.floor(c/125)%2===1?null:nn(o,c);for(let x=0;x<3;x++){let g=p?p[x]:null,C=g&&rn[g.c]||"";for(let E of"abcdefg"){let M=t.querySelector(`[data-seg="${x}${E}"]`),I=C.includes(E)?$i:Vo;M&&M.getAttribute("fill")!==I&&M.setAttribute("fill",I)}let A=t.querySelector(`[data-seg="${x}p"]`),b=g&&g.punto?$i:Vo;A&&A.getAttribute("fill")!==b&&A.setAttribute("fill",b)}let d=t.querySelector("[data-pitido]"),u=o&&o.alarma&&Math.floor(c/250)%2===0?"visible":"hidden";d&&d.getAttribute("visibility")!==u&&d.setAttribute("visibility",u)}var Pe={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},ja=Object.keys(Pe),Ti={marron:"marr\xF3n",morado:"violeta"};function Wa(t,e){let o=[t,e];return o.some(s=>/^placa\.GND/.test(s)||/^protoboard\.[si]-/.test(s))?"negro":o.some(s=>/^placa\.(5V|3V3|VIN)$/.test(s)||/^protoboard\.[si]\+/.test(s))?"rojo":"verde"}var cn=["3","5","6","9","10","11"],_e={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(cn.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}}},Z={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:Uo.ancho,alto:Uo.alto,pines:Oo,svg:t=>wa(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Et).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(wa(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",Sa(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,props:{puentePWR:!0},dibujo:{ancho:Ze.ancho,alto:Ze.alto,pines:Xt,svg:t=>Aa(t.puentePWR!==!1)},rotulo:t=>fi[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(Aa(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),s=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==s&&o.setAttribute("fill",s)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...Qe(t),pines:bi(t)}),svg:t=>yi(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){Ci(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:ka.ancho,alto:ka.alto,pines:eo,svg:t=>Da(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(gt).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(Da(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e,o){Si(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:Qt.umbralV},dibujo:{ancho:Va.ancho,alto:Va.alto,pines:Na,svg:t=>_i(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:Qt.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){La(t,e,null)},mostrar(t,e,o){La(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var No=["a","b","c","d","e"],Mi=["f","g","h","i","j"],it={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Ii=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],_t={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ao=t=>14.4+(t-1)*9.6,ln=t=>t>=2&&(t-1)%6!==0,Fa=new Map;function Te(t="media"){if(Fa.has(t))return Fa.get(t);let e=_t[t]||_t.media,o=[];Fa.set(t,o);for(let s=1;s<=e.columnas;s++){for(let i of No)o.push({nombre:i+s,x:ao(s),y:it[i],tira:"arriba"+s});for(let i of Mi)o.push({nombre:i+s,x:ao(s),y:it[i],tira:"abajo"+s});for(let[i]of Ii)ln(s)&&o.push({nombre:i+s,x:ao(s),y:it[i],tira:i})}return o}var za=new Map;function ki(t="media"){if(za.has(t))return za.get(t);let e=new Map;za.set(t,e);for(let o of Te(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function qa(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(No.includes(o[1])?"arriba":"abajo")+o[2]:null}function Di(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let c=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[s,i]=No.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${s}${o[2]}\u2013${i}${o[2]}`}function Ha(t="media"){let e=_t[t]||_t.media,{ancho:o,alto:s,columnas:i}=e,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}" viewBox="0 0 ${o} ${s}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${s-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(it.e+it.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let n=(d,u)=>c.push(`<line x1="${14.4-6}" y1="${d}" x2="${o-14.4+6}" y2="${d}" stroke="${u}" stroke-width="1.2"/>`);n(it["s+"]-5.5,"#d7263d"),n(it["s-"]+5.5,"#2f6fde"),n(it["i-"]-5.5,"#2f6fde"),n(it["i+"]+5.5,"#d7263d");let p=(d,u,x,g="#8a867a",C=5.5)=>c.push(`<text x="${d}" y="${u}" font-family="sans-serif" font-size="${C}" font-weight="700" fill="${g}" text-anchor="middle">${x}</text>`);for(let[d,,u]of Ii){let x=u==="+"?"#d7263d":"#2f6fde";p(5.2,it[d]+2.2,u,x,7),p(o-5.2,it[d]+2.2,u,x,7)}for(let d=1;d<=i;d++)(d===1||d%5===0)&&(p(ao(d),it.a-6.2,d),p(ao(d),it.j+10.4,d));for(let d of[...No,...Mi])p(5.2,it[d]+2,d),p(o-5.2,it[d]+2,d);for(let d of Te(t))c.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function Oi(t,{tipo:e="media",ocupados:o=new Set,tolerancia:s=3.5}={}){if(!t.length)return null;let i=Te(e),c=(g,C)=>{let A=null,b=1/0;for(let E of i){let M=Math.hypot(E.x-g,E.y-C);M<b&&(b=M,A=E)}return{hueco:A,distancia:b}},n=c(t[0].x,t[0].y);if(n.distancia>9.6)return null;let p=n.hueco.x-t[0].x,d=n.hueco.y-t[0].y,u={},x=new Set;for(let g of t){let{hueco:C,distancia:A}=c(g.x+p,g.y+d);if(A>s||o.has(C.nombre)||x.has(C.nombre))return null;u[g.nombre]=C.nombre,x.add(C.nombre)}return{dx:p,dy:d,en:u}}var dn=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Ga(t,{presionados:e=new Set,conduccion:o=!1}={}){let s=new Map,i=n=>{for(s.has(n)||s.set(n,n);s.get(n)!==n;)s.set(n,s.get(s.get(n))),n=s.get(n);return n},c=(n,p)=>s.set(i(n),i(p));for(let n of dn)n.forEach(p=>c("placa."+n[0],"placa."+p));for(let n of t.cables)c(n.de,n.a);if(t.protoboard){for(let n of ki(t.protoboard.tipo).values())n.forEach(p=>c("protoboard."+n[0],"protoboard."+p));for(let n of t.componentes)if(n.en)for(let[p,d]of Object.entries(n.en))c(n.id+"."+p,d)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[p,d]of pi)c(n.id+"."+p,d);(!n.props||n.props.puentePWR!==!1)&&c(n.id+".EXT_POS","placa.VIN")}else n.tipo==="bateria_lipo"?(c(n.id+".BAL0",n.id+".NEG"),c(n.id+".BAL2",n.id+".POS")):n.tipo==="pulsador"?(c(n.id+".1i",n.id+".1d"),c(n.id+".2i",n.id+".2d"),e.has(n.id)&&c(n.id+".1i",n.id+".2i")):o&&n.tipo==="resistencia"?c(n.id+".1",n.id+".2"):o&&n.tipo==="potenciometro"&&(c(n.id+".GND",n.id+".SIG"),c(n.id+".SIG",n.id+".VCC"));return i}var Bi=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],fn=Object.fromEntries(Bi.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),pn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},hn=["GND","+5V","+3V3","VIN"],Ui=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Lo={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>Ui(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(Et[t.modelo]||Et.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>Ui(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},rt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function un(t){let o=[2166136261,16777619,2654435769,2246822507].map(s=>{let i=s>>>0;for(let c=0;c<t.length;c++)i=Math.imul(i^t.charCodeAt(c),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Vi(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:s="TecnoCircuito"}={}){let i=t.componentes.filter(b=>Lo[b.tipo]).map(b=>({...b})),c={};for(let b of i){let E=Lo[b.tipo];c[E.ref]=(c[E.ref]||0)+1,b.ref=E.ref+c[E.ref]}let n=Ga(t),p=new Map,d=(b,E,M,I)=>{let K=n(b);p.has(K)||p.set(K,{pads:new Map,uno:new Set});let D=p.get(K);D.pads.set(E+" "+M,{ref:E,pad:M,pinUno:I}),I&&D.uno.add(pn[I]||I)},u=new Set(t.cables.flatMap(b=>[b.de,b.a]));for(let[b,{ref:E,pad:M}]of Object.entries(fn))u.has("placa."+b)&&d("placa."+b,E,M,b);for(let b of i)for(let[E,M]of Object.entries(Lo[b.tipo].pads))d(b.id+"."+E,b.ref,M,null);let x=(b,E)=>b.localeCompare(E,"en",{numeric:!0}),g=[...p.values()].filter(b=>b.pads.size>=2).map(b=>{let E=[...b.pads.values()].sort((I,K)=>x(I.ref,K.ref)||x(I.pad,K.pad));return{nombre:hn.find(I=>b.uno.has(I))||[...b.uno].sort(x)[0]||`Net-(${E[0].ref}-Pad${E[0].pad})`,pads:E}}).sort((b,E)=>x(b.nombre,E.nombre)),C=[],A=(b,E,M,I,K,D,jt)=>C.push("		(comp",`			(ref ${rt(b)})`,`			(value ${rt(E)})`,`			(footprint ${rt(M)})`,`			(libsource (lib ${rt(I)}) (part ${rt(K)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${rt(D)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${rt(jt)})`,"		)");C.push("(export",'	(version "E")',"	(design",`		(source ${rt(e)})`,`		(date ${rt(o)})`,`		(tool ${rt(s)})`,"	)"),C.push("	(components");for(let b of Bi)A(b.ref,b.valor,b.huella,"Connector_Generic",b.parte,"placa",b.uuid);for(let b of i){let E=Lo[b.tipo];A(b.ref,E.valor(b.props||{}),E.huella,E.lib,E.parte,b.id,un(e+"/"+b.id))}return C.push("	)","	(nets"),g.forEach((b,E)=>{C.push("		(net",`			(code ${rt(E+1)})`,`			(name ${rt(b.nombre)})`,'			(class "Default")');for(let M of b.pads){let I=M.pinUno?` (pinfunction ${rt(M.pinUno)})`:"";C.push(`			(node (ref ${rt(M.ref)}) (pin ${rt(M.pad)})${I} (pintype "passive"))`)}C.push("		)")}),C.push("	)",")"),C.join(`
`)+`
`}var fe;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(fe||(fe={}));var nt;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(nt||(nt={}));var Ni={0:{type:nt.SingleEnded,channel:0},1:{type:nt.SingleEnded,channel:1},2:{type:nt.SingleEnded,channel:2},3:{type:nt.SingleEnded,channel:3},4:{type:nt.SingleEnded,channel:4},5:{type:nt.SingleEnded,channel:5},6:{type:nt.SingleEnded,channel:6},7:{type:nt.SingleEnded,channel:7},8:{type:nt.Temperature},14:{type:nt.Constant,voltage:1.1},15:{type:nt.Constant,voltage:0}},Hl={type:nt.Constant,voltage:0},xn={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ni,adcReferences:[fe.AREF,fe.AVCC,fe.Reserved,fe.Internal1V1]};var gn=2,bn=4,yn=8,Cn=16,vn=32,Kl=gn|bn|yn|Cn|vn;var ji={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Wi={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Fi={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var zi={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var so={PIN:35,DDR:36,PORT:37,pinChange:Fi,externalInterrupts:[]};var pe={PIN:41,DDR:42,PORT:43,pinChange:zi,externalInterrupts:[null,null,ji,Wi]};var jo;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(jo||(jo={}));var Wo;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(Wo||(Wo={}));var Li;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Li||(Li={}));var Gi={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},qi;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(qi||(qi={}));var Ja={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Sn=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Gi,compPortA:pe.PORT,compPinA:6,compPortB:pe.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:pe.PORT,externalClockPin:4},Ja),wn=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Gi,compPortA:so.PORT,compPinA:1,compPortB:so.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:pe.PORT,externalClockPin:5},Ja),$n=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:so.PORT,compPinA:3,compPortB:pe.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Ja),Xa;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Xa||(Xa={}));var W;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(W||(W={}));var F;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(F||(F={}));var me=1,Fo=2,Me=1,{Normal:Xi,PWMPhaseCorrect:he,CTC:Ka,FastPWM:ue,Reserved:Ya,PWMPhaseFrequencyCorrect:Hi}=Xa,t0=[[Xi,255,F.Immediate,W.Max,0],[he,255,F.Top,W.Bottom,0],[Ka,me,F.Immediate,W.Max,0],[ue,255,F.Bottom,W.Max,0],[Ya,255,F.Immediate,W.Max,0],[he,me,F.Top,W.Bottom,Me],[Ya,255,F.Immediate,W.Max,0],[ue,me,F.Bottom,W.Top,Me]],e0=[[Xi,65535,F.Immediate,W.Max,0],[he,255,F.Top,W.Bottom,0],[he,511,F.Top,W.Bottom,0],[he,1023,F.Top,W.Bottom,0],[Ka,me,F.Immediate,W.Max,0],[ue,255,F.Bottom,W.Top,0],[ue,511,F.Bottom,W.Top,0],[ue,1023,F.Bottom,W.Top,0],[Hi,Fo,F.Bottom,W.Bottom,0],[Hi,me,F.Bottom,W.Bottom,Me],[he,Fo,F.Top,W.Bottom,0],[he,me,F.Top,W.Bottom,Me],[Ka,Fo,F.Immediate,W.Max,0],[Ya,65535,F.Immediate,W.Max,0],[ue,Fo,F.Bottom,W.Top,Me],[ue,me,F.Bottom,W.Top,Me]];var Rn=16,An=8,En=4;var r0=En|Rn|An;var dd=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"];var Lt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var pt=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),Ki=t=>t>=1e3?pt(t/1e3)+" k\u03A9":t+" \u03A9",io=t=>({estado:"validado",texto:t}),ro=t=>({estado:"por_validar",texto:t}),Za=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","bateria_lipo","probador_lipo"]}],no={protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",Ki(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>io("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${pt(Lt.vf[t.color]||Lt.vf.rojo,2)} V a ${Lt.normalmA} mA`],["Corriente",`de 5 a ${Lt.normalmA} mA; se quema desde ${Lt.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(Lt.vf[t.color]||Lt.vf.rojo))/(Lt.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:()=>io("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 12 de 12 dentro del criterio).")},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>io("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",Ki(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>io("Lectura anal\xF3gica revisada el 7 oct 2026 y ruido del ADC medido el 9 oct (0,1 pasos).")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=Et[t.modelo]||Et.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${pt(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?ro("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):io("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (6, ~100 y 590 mA).")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${st.voltiosRef} V`],["Sin carga a 6 V",`${st.rpmSinCarga} RPM y ${st.mASinCarga} mA`],["Bloqueado",`${pt(st.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${st.reduccion} \xB7 rueda de ${st.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>ro("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"]],validacion:()=>ro("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=gt[t.carga]||gt.nominal;return[["Carga",`${e.nombre}: ${pt(e.voltios)} V`],["Celdas",e.celdas.map((o,s)=>`${s+1}: ${pt(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${pt(gt.llena.voltios)} / ${pt(gt.nominal.voltios)} / ${pt(gt.descargada.voltios)} V`],["M\xEDnimo",`${pt(Bo.minimoCeldaV)} V por celda (${pt(Bo.minimoCeldaV*Bo.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>ro("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${pt(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${pt(Qt.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>ro("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},Yi=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function Ji(t){let e=Yi(t).split(/\s+/).filter(Boolean),o=Za.flatMap(s=>s.piezas.map(i=>({tipo:i,categoria:s.nombre})));return e.length?o.filter(({tipo:s,categoria:i})=>{let c=no[s],n=Yi([c.nombre,i,c.descripcion,...c.palabras].join(" "));return e.every(p=>n.includes(p))}):o}var Zi="http://www.w3.org/2000/svg",Pn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",_n=280,Qi=5e3,tr=4,er=8,Tn=9.6,or=.4,Mn=5,Tt=t=>JSON.parse(JSON.stringify(t)),Q=t=>Math.round(t*100)/100,co=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),Qa=t=>Pe[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:Pe.verde);function rr(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||"uno";if(!_e[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let s=!!e.soloLectura,i=typeof e.alEvento=="function"?e.alEvento:null,c=[],n=In(e.circuito,o),p=document.createElement("div");p.className="tecnocircuito",t.appendChild(p);let d=p.attachShadow({mode:"open"});d.innerHTML=`<style>${ci}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Qi} ${Qi})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>`;let u=a=>d.querySelector(a),x=u(".tc"),g=u(".tc-barra"),C=u(".tc-biblioteca"),A=u(".tc-buscar"),b=u(".tc-bib-lista"),E=u(".tc-bib-vacio"),M=u(".tc-ficha"),I=g.querySelector('[data-accion="menu"]'),K=u(".tc-sel"),D=u(".tc-area"),jt=u(".tc-mundo"),bt=u(".tc-capa-comp"),Wt=u(".tc-capa-pines"),P=u(".tc-cables"),ct=u(".tc-asas"),[ht,lo]=u(".tc-previa").children,xe=u(".tc-ayuda"),kt=u(".tc-tip"),B={px:0,py:0,escala:1.5},U=new Map,ke=new Map,$=null,k=null,T=null,fo=null,zo=null,os=!1,qo=!1,De=!1,po=null,Ho=!1,ot={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},Go=new Set,as=[],ss=[],Xo="",q=a=>n.componentes.find(r=>r.id===a),ho=a=>a==="protoboard"?n.protoboard:q(a),ge=a=>!!(a&&Z[a.tipo]&&Z[a.tipo].montada),uo=a=>a==="placa"||ge(q(a))?{x:0,y:0,rot:0}:ho(a);function mo(a,r,l){let f=a==="placa"?_e[o]:Z[r],h=document.createElement("div");h.className="tc-comp"+(a==="placa"?" tc-placa":""),h.dataset.id=a,r&&(h.dataset.tipo=r);let m;if(f&&f.dibujo){let w=document.createElement("template");w.innerHTML=f.dibujo.svg(l),m=w.content.firstElementChild}else f?(m=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(m,l),f.perilla&&m.addEventListener("input",()=>_s(a,Number(m.value)/100))):(m=document.createElement("div"),m.className="tc-desconocido",m.textContent=`\xBF${r}?`,m.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(m);let y=U.get("placa");f&&f.montada&&y?bt.insertBefore(h,y.div.nextSibling):bt.appendChild(h);let S={id:a,def:f,div:h,el:m,w:64,h:40,pines:new Map,lista:!1};return U.set(a,S),Promise.resolve(m.updateComplete).then(()=>{if(U.get(a)===S){if(f&&f.dibujo){let w=f.dibujo.marco?f.dibujo.marco(l):f.dibujo;Object.assign(S,{w:w.ancho,h:w.alto});for(let[O,z]of Object.entries(w.pines)){let X=document.createElement("div");X.className="tc-pin",X.dataset.ref=`${a}.${O}`,Wt.appendChild(X),S.pines.set(O,{px:z.x,py:z.y,div:X})}}else if(f){Object.assign(S,ps(m));for(let w of m.pinInfo||[]){let O=f.nombrePin(w.name);if(!O)continue;let z=document.createElement("div");z.className="tc-pin",z.dataset.ref=`${a}.${O}`,Wt.appendChild(z),S.pines.set(O,{px:w.x,py:w.y,div:z})}}S.lista=!0,te(S),fs(S)}})}function is(){let a=n.protoboard.tipo,r=_t[a]||_t.media,l=document.createElement("div");l.className="tc-comp tc-protoboard",l.dataset.id="protoboard",l.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=Ha(a);let h=f.content.firstElementChild;l.appendChild(h);let m=U.get("placa");bt.insertBefore(l,m?m.div.nextSibling:bt.firstChild);let y={id:"protoboard",def:{protoboard:!0},div:l,el:h,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let S of Te(a)){let w=document.createElement("div");w.className="tc-pin tc-hueco",w.dataset.ref="protoboard."+S.nombre,w.style.left=S.x+"px",w.style.top=S.y+"px",l.appendChild(w),y.pines.set(S.nombre,{px:S.x,py:S.y,div:w})}return U.set("protoboard",y),te(y),go(),Promise.resolve()}function rs(a=null){if(n.protoboard)return;let r=sa(),l=_t.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-l.ancho/2),y:Math.round(a.y-l.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},is(),xo(),dt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),yt({tipo:"comp",id:"protoboard"}),!De&&!a&&Le(),lt()}function xo(){let a=C.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,l]of Object.entries(Z)){if(!l.montada)continue;let f=C.querySelector(`[data-tipo="${r}"]`),h=n.componentes.some(m=>m.tipo===r);f&&Object.assign(f,{disabled:h,title:h?`Ya hay una ${l.nombre}`:""})}}}function hr(a){let r=U.get(a.id),l=n.protoboard;return!r||!r.lista||!l||!r.pines.size?null:[...r.pines].map(([f,h])=>{let m=Yo(r,a,h);return{nombre:f,x:m.x-l.x,y:m.y-l.y}})}function ns(a){let r=new Set;for(let l of n.componentes)if(l!==a&&l.en)for(let f of Object.values(l.en))r.add(f.slice(11));return r}function cs(a){let r=hr(a);return r?Oi(r,{tipo:n.protoboard.tipo,ocupados:ns(a)}):null}function Ko(a){if(ge(a))return!1;let r=cs(a);return r?(a.x=Q(a.x+r.dx),a.y=Q(a.y+r.dy),a.en=Object.fromEntries(Object.entries(r.en).map(([l,f])=>[l,"protoboard."+f]))):delete a.en,te(U.get(a.id)),go(),wt(),!!r}let Oe=[];function ur(a){ls();let r=n.protoboard&&cs(a),l=U.get("protoboard");!r||!l||(Oe=Object.values(r.en).map(f=>l.pines.get(f).div),Oe.forEach(f=>f.classList.add("tc-destino")))}function ls(){Oe.forEach(a=>a.classList.remove("tc-destino")),Oe=[]}function go(){let a=U.get("protoboard");if(!a)return;let r=ns(null);for(let[l,f]of a.pines)f.div.classList.toggle("tc-ocupado",r.has(l))}let bo=[];function ds(a){bo.forEach(y=>y.classList.remove("tc-tira")),bo=[];let r=U.get("protoboard");if(!a||!r)return;let[l,f]=yo(a),h=l==="protoboard"?f:null;if(!h){let y=q(l);y&&y.en&&y.en[f]&&(h=y.en[f].slice(11))}if(!h)return;let m=qa(h);for(let[y,S]of r.pines)qa(y)===m&&(S.div.classList.add("tc-tira"),bo.push(S.div))}function fs(a){if(a.id==="placa")for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!ot.placa[r];else if(a.def===Z.led){let r=Number(ot.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",ot.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=ot.simulando&&(ot.piezas[a.id]||ot.servos[a.id])||null;a.def.mostrar(a.el,r,(q(a.id)||{}).props)}}function ps(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),l=r&&sr(r.getAttribute("width")),f=r&&sr(r.getAttribute("height"));return l&&f?{w:l,h:f}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function te(a){if(!a)return;let r=uo(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let l of a.pines.values()){let f=Yo(a,r,l);l.div.style.left=f.x+"px",l.div.style.top=f.y+"px"}}function Yo(a,r,l){let f=((r.rot||0)%360+360)%360;if(!f)return{x:r.x+l.px,y:r.y+l.py};let h=f*Math.PI/180,m=Math.round(Math.cos(h)*1e9)/1e9,y=Math.round(Math.sin(h)*1e9)/1e9,S=a.w/2,w=a.h/2,O=l.px-S,z=l.py-w;return{x:Q(r.x+S+O*m-z*y),y:Q(r.y+w+O*y+z*m)}}function yo(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function Ft(a){let[r,l]=yo(a),f=U.get(r);if(!f||!f.lista)return null;let h=uo(r),m=f.pines.get(l);return m?Yo(f,h,m):f.def?null:{x:h.x+f.w/2,y:h.y+f.h/2}}function mr(a){let[r,l]=yo(a),f=U.get(r);return f&&f.pines.get(l)}function Co(a){let r=Ft(a.de),l=Ft(a.a);return!r||!l?null:[r,...(a.puntos||[]).map(([f,h])=>({x:f,y:h})),l]}function ee(a,r,l){let f=document.createElementNS(Zi,a);for(let h in r)f.setAttribute(h,r[h]);return l.appendChild(f),f}function wt(){for(let[a,r]of ke)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(l=>l.remove()),ke.delete(a));n.cables.forEach((a,r)=>{let l=ke.get(a);if(!l){let w=ee("g",{class:"tc-cable"},P);l={g:w,borde:ee("path",{class:"tc-cable-borde"},w),linea:ee("path",{class:"tc-cable-linea"},w),p0:ee("circle",{class:"tc-punta",r:2.4},w),p1:ee("circle",{class:"tc-punta",r:2.4},w),toque:ee("path",{class:"tc-cable-toque"},w),asas:[]},ke.set(a,l)}let f=Co(a);if(l.g.style.display=f?"":"none",!f)return;let h=ts(f),m=Qa(a.color);for(let w of[l.borde,l.linea,l.toque])w.setAttribute("d",h);l.linea.setAttribute("stroke",m),l.toque.dataset.i=r,hs(l.p0,f[0],m),hs(l.p1,f[f.length-1],m);let y=!!($&&$.tipo==="cable"&&$.cable===a);l.g.classList.toggle("tc-seleccionado",y),y&&P.lastChild!==l.g&&P.appendChild(l.g);let S=y?(a.puntos||[]).length:0;for(;l.asas.length>S;)l.asas.pop().remove();for(;l.asas.length<S;)l.asas.push(ee("circle",{class:"tc-asa",r:3.6},ct));l.asas.forEach((w,O)=>{w.setAttribute("cx",a.puntos[O][0]),w.setAttribute("cy",a.puntos[O][1]),w.dataset.i=r,w.dataset.p=O})})}function hs(a,r,l){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",l)}function be(){let a=k&&Ft(k.de);if(!a){ht.setAttribute("d",""),lo.setAttribute("d","");return}let r=k.puntos.map(y=>({...y})),l=r.length?r[r.length-1]:a,f=k.cursor?vo(k.cursor,l):l,h=k.destino&&Ft(k.destino);h&&(f=h,ms(r,a,h));let m=ts([a,...r,f]);ht.setAttribute("d",m),lo.setAttribute("d",m),lo.setAttribute("stroke",Qa(us()))}function us(){return k.color||Wa(k.de,k.destino||"")}function vo(a,r){let l=er/B.escala;return{x:Q(Math.abs(a.x-r.x)<l?r.x:a.x),y:Q(Math.abs(a.y-r.y)<l?r.y:a.y)}}function ms(a,r,l){if(!a.length)return;let f=er/B.escala,h=a[a.length-1],m=a.length>1?a[a.length-2]:r;Math.abs(h.y-l.y)<f&&h.y!==m.y&&(h.y=l.y),Math.abs(h.x-l.x)<f&&h.x!==m.x&&(h.x=l.x)}function xr(a){yt(null),k={de:a,puntos:[],cursor:null,destino:null,color:null},x.classList.add("tc-dibujando"),bs(a,!0),be(),So(),Rt()}function Jo(){k&&(bs(k.de,!1),k=null,x.classList.remove("tc-dibujando"),be(),So(),Rt())}function xs(a){if(Pe[a]){if(k)k.color=a,be();else if($&&$.tipo==="cable"){if($.cable.color===a)return;$.cable.color=a,wt(),lt()}else return;So()}}function gs(a){let r=k;if(!r)return;if(a===r.de)return Jo();let l=Ft(r.de),f=Ft(a);if(l&&f&&ms(r.puntos,l,f),Jo(),n.cables.some(m=>m.de===r.de&&m.a===a||m.de===a&&m.a===r.de)){Er("Esos dos pines ya est\xE1n unidos.");return}let h={de:r.de,a,color:r.color||Wa(r.de,a)};r.puntos.length&&(h.puntos=r.puntos.map(m=>[Q(m.x),Q(m.y)])),n.cables.push(h),dt("cable_agregado",{de:h.de,a:h.a}),yt({tipo:"cable",cable:h}),lt()}function gr(a){let r=k.puntos.length?k.puntos[k.puntos.length-1]:Ft(k.de);k.puntos.push(r?vo(a,r):a),be(),Rt()}function br(){!k||!k.puntos.length||(k.puntos.pop(),be(),Rt())}function bs(a,r){let l=mr(a);l&&l.div.classList.toggle("tc-activo",r)}function Zo(a){n.cables=n.cables.filter(r=>r!==a),dt("cable_quitado",{de:a.de,a:a.a})}function yt(a){$=a;for(let r of U.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);wt(),So(),Rt()}function So(){if(Qo(),K.textContent="",s||!$&&!k)return;let a=l=>K.insertAdjacentHTML("beforeend",l),r=l=>ja.forEach((f,h)=>{let m=Pe[f],y=Ti[f]||f;a(`<button type="button" class="tc-muestra${l===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${h} \xB7 ${y}" aria-label="Cable ${y} (tecla ${h})" style="background:${m};color:${On(m)}">${h}</button>`)});if(k){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(us());return}if($.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r($.cable.color);else if($.id==="protoboard")a(`<span class="tc-etiqueta">${(_t[n.protoboard.tipo]||_t.media).nombre}</span>`);else{let l=q($.id),f=Z[l.tipo],h=U.get(l.id);a(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),ge(l)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let Ue=null,$t=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Qo(){let a=$&&$.tipo==="comp"&&!k?$.id==="protoboard"?"protoboard":(q($.id)||{}).tipo:null,r=a&&no[a];if(M.hidden=!r||!C.hidden,!r)return M.textContent="";Ue===null&&D.clientWidth&&(Ue=D.clientWidth>=900);let l=Ue!==!1,f=$.id==="protoboard"?null:q($.id),h=f&&Z[f.tipo],m=f&&U.get(f.id),y="";if(f&&h&&!s){for(let S of h.campos||(h.campo?[h.campo]:[])){let w=String(f.props[S.prop]),O=S.opciones.map(([z,X])=>`<option value="${z}"${w===String(z)?" selected":""}>${X}</option>`).join("");y+=`<label class="tc-campo">${S.etiqueta} <select data-prop="${S.prop}">${O}</select></label>`}if(h.perilla){let S=Math.round((Number(f.props[h.perilla.prop])||0)*100);y+=`<label class="tc-campo">${h.perilla.etiqueta} <input type="range" min="0" max="100" value="${S}" data-perilla aria-label="${h.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let S=m&&m.el.value?" checked":"";y+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${S}> Ver encendido</label>`}}M.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${l}" aria-label="Ficha de ${$t(r.nombre)}: ${l?"ocultar los detalles":"ver los detalles"}"><span>${$t(r.nombre)}${f?` <small>${$t(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${l?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${l||y?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${l?"":" hidden"}>${$t(r.descripcion)}</p>`+(y?`<div class="tc-ficha-props">${y}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${l?"":" hidden"}></div></div>`,ta(),ys()}function ys(){if(M.hidden||!$)return;let a=U.get($.id),r=$.id==="protoboard"?n.protoboard:q($.id),l=!1;a&&r&&(l=B.px+(r.x+a.w/2)*B.escala>D.clientWidth/2),M.classList.toggle("tc-ficha-izq",l)}function ta(){let a=M.querySelector(".tc-ficha-datos");if(!a||!$)return;let r=$.id==="protoboard"?"protoboard":(q($.id)||{}).tipo,l=no[r];if(!l)return;let f=$.id==="protoboard"?{}:q($.id).props||{},h=l.validacion(f);a.innerHTML=`<dl>${l.datos(f).map(([m,y])=>`<dt>${$t(m)}</dt><dd>${$t(y)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${$t(l.pines)}</p>`+(h?`<p class="tc-ficha-val ${h.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${h.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${$t(h.texto)}</p>`:"")}M.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(Ue=Ue===!1,Qo(),M.querySelector(".tc-ficha-titulo").focus())});let Cs=!1;function vs(){if(!Cs){Cs=!0;for(let a of Za){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let l of a.piezas){let f=no[l],h=document.createElement("button");h.type="button",h.className="tc-pieza",h.dataset.accion=l==="protoboard"?"protoboard":"agregar",l!=="protoboard"&&(h.dataset.tipo=l),h.dataset.pieza=l,h.setAttribute("aria-label",f.nombre),h.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${$t(f.nombre)}</b><small>${$t(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,h.querySelector(".tc-mini").append(yr(l)),r.append(h)}b.append(r)}}}function yr(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=Ha("media"),r.content.firstElementChild;let l=Z[a];if(l.dibujo)return r.innerHTML=l.dibujo.svg(a==="motor_tt"?{...l.props,vista:"rueda"}:l.props),r.content.firstElementChild;let f=document.createElement(l.etiqueta);return l.aplicar&&l.aplicar(f,Tt(l.props)),Promise.resolve(f.updateComplete).then(()=>{let h=ps(f);f.style.zoom=String(Math.min(1,58/h.w,42/h.h))}),f.inert=!0,f}function Ss(){let a=new Set(Ji(A.value).map(r=>r.tipo));for(let r of b.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of b.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");E.hidden=a.size>0,E.textContent=a.size?"":`No hay piezas con \xAB${A.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}A.addEventListener("input",Ss),A.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=b.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let ut=null,ea=!1;C.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||s||a.button!==0||(ut={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),C.addEventListener("pointermove",a=>{if(!ut)return;if(!ut.fantasma){if(Math.hypot(a.clientX-ut.x0,a.clientY-ut.y0)<tr)return;let l=document.createElement("div");l.className="tc-fantasma",l.append(ut.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),x.append(l),ut.fantasma=l,C.classList.add("tc-arrastrando")}let r=x.getBoundingClientRect();ut.fantasma.style.left=a.clientX-r.left+"px",ut.fantasma.style.top=a.clientY-r.top+"px"});function ws(a,r){if(!ut)return;let{b:l,fantasma:f}=ut;if(ut=null,C.classList.remove("tc-arrastrando"),!f||(f.remove(),ea=!0,setTimeout(()=>ea=!1,0),r))return;let h=D.getBoundingClientRect(),m=C.getBoundingClientRect(),y=S=>a.clientX>=S.left&&a.clientX<=S.right&&a.clientY>=S.top&&a.clientY<=S.bottom;!y(h)||y(m)||(Be(!1),l.dataset.accion==="protoboard"?rs(Ne(a)):$s(l.dataset.tipo,Ne(a)))}C.addEventListener("pointerup",a=>ws(a,!1)),C.addEventListener("pointercancel",a=>ws(a,!0));function $s(a,r=null){let l=Z[a];if(!l)return;let f=1;for(;q(l.prefijo+f);)f++;let h=l.prefijo+f,m=(D.clientWidth/2-B.px)/B.escala,y=(D.clientHeight/2-B.py)/B.escala,S=n.componentes.length%4*14,w={id:h,tipo:a,x:l.montada?0:Math.round(m-20+S),y:l.montada?0:Math.round(y-20+S),rot:0,props:Tt(l.props)};n.componentes.push(w),mo(h,a,w.props).then(()=>{let O=U.get(h);r&&O&&!l.montada&&q(h)===w&&(w.x=Math.round(r.x-O.w/2),w.y=Math.round(r.y-O.h/2),te(O),wt(),lt()),n.protoboard&&q(h)===w&&Ko(w)&&(dt("componente_cambiado",{id:h,x:w.x,y:w.y,en:Tt(w.en)}),lt())}),dt("componente_agregado",{id:h,tipo:a}),yt({tipo:"comp",id:h}),lt()}function Cr(a){let r=U.get(a.id);if(r){r.div.remove();for(let l of r.pines.values())l.div.remove();U.delete(a.id)}mo(a.id,a.tipo,a.props).then(()=>{wt(),$&&$.id===a.id&&yt({tipo:"comp",id:a.id})})}function Rs(){if(!$||$.tipo!=="comp"||$.id==="protoboard")return;let a=q($.id);ge(a)||(a.rot=((a.rot||0)+90)%360,te(U.get(a.id)),n.protoboard&&Ko(a),wt(),dt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Tt(a.en):null}),lt())}function As(){if($){if($.tipo==="cable")Zo($.cable);else if($.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>Zo(r));for(let r of n.componentes)delete r.en;n.protoboard=null;let a=U.get("protoboard");a&&(a.div.remove(),U.delete("protoboard")),bo=[],Oe=[],xo(),dt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=q($.id),r=U.get($.id);if(n.cables.filter(l=>l.de.startsWith(a.id+".")||l.a.startsWith(a.id+".")).forEach(l=>Zo(l)),n.componentes=n.componentes.filter(l=>l!==a),r){r.div.remove();for(let l of r.pines.values())l.div.remove();U.delete(a.id)}dt("componente_quitado",{id:a.id,tipo:a.tipo}),go()}Ro(),yt(null),lt()}}function Be(a){C.hidden=!a,Qo(),I.setAttribute("aria-expanded",String(a)),a&&(vs(),xo(),Ss(),A.focus({preventScroll:!0}))}C.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||ea)){if(Be(!1),r.dataset.accion==="cerrar")return I.focus();Es(r)}}),C.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),Be(!1),I.focus())}),d.addEventListener("pointerdown",a=>{!C.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==I&&Be(!1)}),g.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return Be(C.hidden);Es(r)}});function Es(a){let r=a.dataset.accion;if(r==="acercar")return aa(1.25);if(r==="alejar")return aa(.8);if(r==="encuadrar")return De=!1,Le();s||(r==="agregar"?$s(a.dataset.tipo):r==="protoboard"?rs():r==="girar"?Rs():r==="borrar"?As():r==="color"&&(xs(a.dataset.color),D.focus({preventScroll:!0})))}function vr(a){if(s||!$||$.tipo!=="comp")return;let r=q($.id),l=U.get($.id),f=Z[r.tipo];if(a.target.dataset.accion==="encender"){l.el.value=a.target.checked;return}let h=a.target.dataset.prop;if(!h||!f)return;let m=typeof f.props[h],y=m==="number"?Number(a.target.value):m==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[h]:y},f.dibujo&&f.dibujo.marco?Cr(r):f.aplicar(l.el,r.props),ta(),dt("componente_cambiado",{id:r.id,props:Tt(r.props)}),lt()}function Sr(a){if(s||!$||$.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=U.get($.id);_s($.id,Number(a.target.value)/100),r&&Z.potenciometro.aplicar(r.el,q($.id).props)}for(let a of[g,M])a.addEventListener("change",vr),a.addEventListener("input",Sr);function Ve(a,r,l){let f=U.get(a);if(f&&(f.el.pressed=r),r)Go.add(a);else if(!Go.delete(a))return;for(let h of as)try{h(a,r)}catch(m){console.error(m)}!r&&l!==void 0&&dt("boton_pulsado",{id:a,ms:Math.round(l)})}let Ps=new Map;function _s(a,r){let l=q(a),f=U.get(a);if(!l)return;let h=Z[l.tipo];if(s)return f&&h.aplicar(f.el,l.props);let m=Math.max(0,Math.min(1,Math.round(r*100)/100));if(m===l.props[h.perilla.prop])return;l.props={...l.props,[h.perilla.prop]:m};let y=$&&$.tipo==="comp"&&$.id===a&&M.querySelector("[data-perilla]");y&&Number(y.value)!==Math.round(m*100)&&(y.value=Math.round(m*100)),$&&$.id===a&&ta(),lt(),clearTimeout(Ps.get(a)),Ps.set(a,setTimeout(()=>dt("componente_cambiado",{id:a,props:Tt(l.props)}),400))}function Ne(a){let r=D.getBoundingClientRect();return{x:(a.clientX-r.left-B.px)/B.escala,y:(a.clientY-r.top-B.py)/B.escala}}function oa(a){try{D.setPointerCapture(a.pointerId)}catch{}}function wo(a,r={}){T={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:B.px,py0:B.py,movido:!1,...r},oa(a)}D.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;D.focus({preventScroll:!0}),Ro();let r=a.target,l=Ne(a);if(s)return wo(a);let f=r.closest(".tc-pin");if(f){if(a.preventDefault(),k)return gs(f.dataset.ref);xr(f.dataset.ref),T={tipo:"pin",ref:f.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(k)return wo(a,{punto:l});let h=r.closest(".tc-asa");if(h)return T={tipo:"asa",cable:n.cables[+h.dataset.i],k:+h.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},oa(a);let m=r.closest(".tc-cable-toque");if(m)return yt({tipo:"cable",cable:n.cables[+m.dataset.i]});let y=r.closest(".tc-comp");if(y&&y.dataset.id!=="placa"){let S=y.dataset.id,w=ho(S);if(w.tipo==="pulsador"&&(a.preventDefault(),ot.simulando)){Ve(S,!0),T={tipo:"pulsar",id:S,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}return yt({tipo:"comp",id:S}),ge(w)?wo(a):Z[w.tipo]&&Z[w.tipo].perilla&&a.composedPath().some(Bn)?void 0:(T={tipo:"mover",id:S,dx:l.x-w.x,dy:l.y-w.y,x0:a.clientX,y0:a.clientY,movido:!1},oa(a))}yt(null),wo(a)}),D.addEventListener("pointermove",a=>{let r=Ne(a);if(T&&T.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${T.id}"]`))){let l=T;T=null,Ve(l.id,!1,performance.now()-l.desde)}if(T){if(!T.movido&&Math.hypot(a.clientX-T.x0,a.clientY-T.y0)>tr&&(T.movido=!0,M.classList.add("tc-ficha-quieta")),T.movido&&T.tipo==="mover"){let l=ho(T.id),f=Math.round(r.x-T.dx),h=Math.round(r.y-T.dy);if(T.id==="protoboard")for(let m of n.componentes)m.en&&(m.x=Q(m.x+f-l.x),m.y=Q(m.y+h-l.y),te(U.get(m.id)));l.x=f,l.y=h,te(U.get(T.id)),T.id!=="protoboard"&&n.protoboard&&ur(l),wt()}else if(T.movido&&T.tipo==="paneo")De=!0,B.px=T.px0+a.clientX-T.x0,B.py=T.py0+a.clientY-T.y0,D.classList.add("tc-paneando"),$o();else if(T.movido&&T.tipo==="asa"){let l=Co(T.cable),f=vo(r,l[T.k]);f=vo(f,l[T.k+2]),T.cable.puntos[T.k]=[f.x,f.y],wt()}}if(k){let l=a.target.closest&&a.target.closest(".tc-pin");k.cursor=r,k.destino=l&&l.dataset.ref!==k.de?l.dataset.ref:null,be()}(!T||T.tipo==="pin")&&Ar(a.target.closest&&a.target.closest(".tc-pin")),ot.simulando&&Ts(a.target)});function Ts(a){let r=[],l=a&&a.closest&&a.closest(".tc-pin"),f=a&&a.closest&&a.closest(".tc-cable-toque");l?r=[l.dataset.ref]:f&&n.cables[+f.dataset.i]&&(r=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let h=r.join("|");if(h!==Xo){Xo=h;for(let m of ss)m(r)}}function Ms(a){let r=T;if(T=null,D.classList.remove("tc-paneando"),M.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&ys(),!!r){if(r.tipo==="pulsar")return Ve(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let l=ho(r.id);r.id==="protoboard"?dt("componente_cambiado",{id:"protoboard",x:l.x,y:l.y}):(ls(),(n.protoboard||l.en)&&Ko(l),dt("componente_cambiado",{id:r.id,x:l.x,y:l.y,en:l.en?Tt(l.en):null})),lt()}else if(r.tipo==="asa"&&r.movido)lt();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&k)gr(r.punto);else if(r.tipo==="pin"&&r.movido&&k&&a.type==="pointerup"){let l=d.elementFromPoint(a.clientX,a.clientY),f=l&&l.closest(".tc-pin");f&&f.dataset.ref!==r.ref&&gs(f.dataset.ref)}}}D.addEventListener("pointerup",Ms),D.addEventListener("pointercancel",Ms),D.addEventListener("pointerleave",()=>{if(Ro(),Xo&&Ts(null),T&&T.tipo==="pulsar"){let a=T;T=null,Ve(a.id,!1,performance.now()-a.desde)}}),D.addEventListener("dblclick",a=>{if(s||k)return;let r=d.elementFromPoint(a.clientX,a.clientY)||a.target,l=r.closest(".tc-asa"),f=r.closest(".tc-cable-toque");if(l){let h=n.cables[+l.dataset.i];h.puntos.splice(+l.dataset.p,1),h.puntos.length||delete h.puntos,wt(),Rt(),lt()}else if(f){let h=n.cables[+f.dataset.i],m=Co(h),y=Ne(a),S=0,w=y,O=1/0;for(let z=0;z<m.length-1;z++){let X=Un(y,m[z],m[z+1]);co(y,X)<O&&(O=co(y,X),S=z,w=X)}(h.puntos=h.puntos||[]).splice(S,0,[Q(w.x),Q(w.y)]),yt({tipo:"cable",cable:h}),lt()}}),D.addEventListener("wheel",a=>{a.preventDefault();let r=D.getBoundingClientRect(),l=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));aa(l,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),x.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,l=!0;a.key==="Escape"?k?Jo():yt(null):s?l=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),k?br():As()):(a.key==="r"||a.key==="R")&&r?Rs():/^[0-9]$/.test(a.key)&&r&&(k||$&&$.tipo==="cable")?xs(ja[Number(a.key)]):l=!1,l&&a.stopPropagation()});function $o(){jt.style.transform=`translate(${B.px}px, ${B.py}px) scale(${B.escala})`;let a=Tn*B.escala;D.style.backgroundSize=`${a}px ${a}px`,D.style.backgroundPosition=`${B.px}px ${B.py}px`,Ro()}function aa(a,r,l){De=!0,r===void 0&&(r=D.clientWidth/2,l=D.clientHeight/2);let f=Math.min(Mn,Math.max(or,B.escala*a)),h=(r-B.px)/B.escala,m=(l-B.py)/B.escala;Object.assign(B,{escala:f,px:r-h*f,py:l-m*f}),$o()}function sa(){let a=1/0,r=1/0,l=-1/0,f=-1/0,h=(m,y)=>{a=Math.min(a,m),r=Math.min(r,y),l=Math.max(l,m),f=Math.max(f,y)};for(let m of U.values()){let y=uo(m.id);if(!y)continue;let S=(y.rot||0)%180!==0,w=(S?m.h:m.w)/2,O=(S?m.w:m.h)/2;h(y.x+m.w/2-w,y.y+m.h/2-O),h(y.x+m.w/2+w,y.y+m.h/2+O)}for(let m of n.cables)for(let[y,S]of m.puntos||[])h(y,S);return isFinite(a)?{x0:a,y0:r,x1:l,y1:f}:null}function Le(){let a=D.clientWidth,r=D.clientHeight;if(!a||!r)return!1;let l=sa();if(!l)return!1;let{x0:f,y0:h,x1:m,y1:y}=l,S=48,w=Math.min((a-2*S)/(m-f||1),(r-2*S)/(y-h||1)),O=Math.min(2.4,Math.max(or,w));return Object.assign(B,{escala:O,px:a/2-(f+m)/2*O,py:r/2-(h+y)/2*O}),po={ancho:a,alto:r},$o(),!0}function wr(){let a=sa()||{x0:0,y0:0,x1:100,y1:100},r=12,l=16,f=Math.max(_n,Math.ceil(a.x1-a.x0+2*r)),h=Math.ceil(a.y1-a.y0+2*r)+l,m=[`<svg xmlns="${Zi}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${h}" viewBox="0 0 ${f} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${Q(r-a.x0)} ${Q(r-a.y0)})">`];for(let y of bt.children){let S=U.get(y.dataset.id);S&&S.lista&&m.push($r(S))}for(let y of n.cables){let S=Co(y);if(!S)continue;let w=ts(S),O=Qa(y.color),z=X=>`<circle cx="${X.x}" cy="${X.y}" r="2.4" fill="${O}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;m.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${w}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${w}" stroke="${O}" stroke-width="3"/>${z(S[0])}${z(S[S.length-1])}</g>`)}return m.push("</g>",`<text x="${f-r}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${ar(Pn)}</text>`,"</svg>"),m.join(`
`)}function $r(a){let r=uo(a.id);if(!r)return"";let l=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let oe=ar((q(a.id)||{}).tipo||"");return`<g transform="${l}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${oe}?</text></g>`}let f=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!f)return"";let h=f.cloneNode(!0),m=[],y=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;y.nextNode();)m.push(y.currentNode);m.forEach(oe=>oe.remove());let S=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),w=h.querySelector("#rotating");S&&w&&w.setAttribute("transform",`rotate(${S[1]} 10 8)`),h.setAttribute("width",Q(a.w)),h.setAttribute("height",Q(a.h)),h.removeAttribute("id");let O="tc-"+a.id,z=[...new Set([...h.querySelectorAll("[id]")].map(oe=>oe.id))],X=new XMLSerializer().serializeToString(h);for(let oe of z)X=kn(X,oe,O);X=X.replace(/^<svg\b/,`<svg id="${O}"`);let Ds=a.el.shadowRoot?Dn(a.el,O,z):"";return`<g transform="${l}">${Ds?`<style><![CDATA[
${Ds}
]]></style>`:""}${X}</g>`}function Rr(a){let[r,l]=yo(a);if(r==="placa")return _e[o].rotulo(l);if(r==="protoboard")return Di(l);let f=q(r),h=f&&Z[f.tipo],m=f&&f.en&&f.en[l]?` \xB7 en el hueco ${f.en[l].slice(11)}`:"";return h?`${h.nombre}: ${h.rotulo(l)}${m}`:l}function Ar(a){let r=a?a.dataset.ref:null;if(r===fo)return;fo=r,ds(r);let l=r&&Ft(r);if(!l){kt.hidden=!0;return}let f=B.py+l.y*B.escala,h=ot.voltajes[r],m=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;kt.textContent=Rr(r)+m,kt.style.left=B.px+l.x*B.escala+"px",kt.style.top=f+"px",kt.classList.toggle("tc-abajo",f<44),kt.hidden=!1}function Ro(){fo=null,kt.hidden=!0,ds(null)}function Rt(){clearTimeout(zo),xe.classList.remove("tc-aviso");let a=$&&$.tipo==="cable"&&$.cable.puntos&&$.cable.puntos.length;xe.textContent=s?"Solo lectura: puedes mover la vista y hacer zoom.":k?k.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":$&&$.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":$&&ge(q($.id))?"Va montada sobre el Uno: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla":$&&$.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":$&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":$?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":ot.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function Er(a){Rt(),xe.textContent=a,xe.classList.add("tc-aviso"),zo=setTimeout(Rt,2500)}function dt(a,r){if(i)try{i({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(l){console.error(l)}}function lt(){let a=Tt(n);for(let r of c)try{r(a)}catch(l){console.error(l)}}function Is(a){x.classList.toggle("tc-oscuro",a==="oscuro"),x.classList.toggle("tc-claro",a==="claro")}let Pr={circuito:()=>Tt(n),alCambiar(a){typeof a=="function"&&c.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:Is,exportarSVG:wr,exportarNetlist:a=>Vi(n,a),_alPulsar(a){typeof a=="function"&&as.push(a)},_alAcercar(a){typeof a=="function"&&ss.push(a)},_mostrar(a){let r=ot.simulando;ot={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==ot.simulando&&(x.classList.toggle("tc-simulando",ot.simulando),ot.simulando||[...Go].forEach(l=>Ve(l,!1)),Rt()),fo=null;for(let l of U.values())l.lista&&fs(l)},destruir(){Ho=!0,ks.disconnect(),clearTimeout(zo),c.length=0,U.clear(),ke.clear(),p.remove()}};e.tema&&Is(e.tema),s&&x.classList.add("tc-solo-lectura"),$o(),Rt();let ks=new ResizeObserver(()=>{if(!os||Ho)return;if(!qo){qo=Le();return}if(De||!po)return;let a=(r,l)=>Math.abs(r-l)/Math.max(1,l);(a(D.clientWidth,po.ancho)>.1||a(D.clientHeight,po.alto)>.1)&&Le()});ks.observe(D);let _r=mo("placa");return s||vs(),xo(),Promise.all([_r,...n.protoboard?[is()]:[],...n.componentes.map(a=>mo(a.id,a.tipo,a.props))]).then(()=>{Ho||(os=!0,go(),wt(),qo=Le())}),Pr}function In(t,e){let o=t&&typeof t=="object"?Tt(t):{};o.formato=o.formato||1,o.placa=e;let s=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!s.has(i.id)&&s.add(i.id));for(let i of o.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let c=Z[i.tipo]?Z[i.tipo].props:{};i.props={...c,...i.props&&typeof i.props=="object"?i.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of o.cables){let c=Array.isArray(i.puntos)&&i.puntos.every(n=>Array.isArray(n)&&n.length===2&&n.every(Number.isFinite));"puntos"in i&&!c&&delete i.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let i of o.componentes){let c=o.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(n=>typeof n=="string"&&n.startsWith("protoboard."));"en"in i&&!c&&delete i.en}return o}var nr=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),ar=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function kn(t,e,o){let s=nr(e),i=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${s}"`,"g"),(c,n)=>`${n}id="${i}"`).replace(new RegExp(`url\\(#${s}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${s}"`,"g"),()=>`href="#${i}"`)}function Dn(t,e,o){let s=t.shadowRoot,i=[...s.adoptedStyleSheets||[]];s.querySelectorAll("style").forEach(n=>n.sheet&&i.push(n.sheet));let c=[];for(let n of i){let p;try{p=n.cssRules}catch{continue}for(let d of p){if(!d.selectorText||!d.style)continue;let u=d.selectorText.split(",").map(g=>g.trim()).filter(g=>!/:host|\binput\b|:focus|\.hide-input/.test(g));if(!u.length)continue;let x=u.map(g=>{let C=g;for(let A of o)C=C.replace(new RegExp(`#${nr(A)}(?![\\w-])`,"g"),()=>`#${e}-${A}`);return/^svg\b/.test(C)?C.replace(/^svg\b/,`#${e}`):`#${e} ${C}`});c.push(`${x.join(", ")} { ${d.style.cssText} }`)}}return c.join(`
`)}function On(t){let[e,o,s]=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255);return .2126*e+.7152*o+.0722*s>.55?"#1d2733":"#ffffff"}function sr(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function ts(t){let e=s=>`${Q(s.x)} ${Q(s.y)}`,o=`M${e(t[0])}`;for(let s=1;s<t.length-1;s++){let i=t[s-1],c=t[s],n=t[s+1],p=Math.min(5,co(i,c)/2,co(c,n)/2);o+=` L${e(ir(c,i,p))} Q${e(c)} ${e(ir(c,n,p))}`}return`${o} L${e(t[t.length-1])}`}function ir(t,e,o){let s=co(t,e);return s?{x:t.x+(e.x-t.x)*o/s,y:t.y+(e.y-t.y)*o/s}:t}function Un(t,e,o){let s=o.x-e.x,i=o.y-e.y,c=s*s+i*i,n=c?Math.max(0,Math.min(1,((t.x-e.x)*s+(t.y-e.y)*i)/c)):0;return{x:e.x+n*s,y:e.y+n*i}}function Bn(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}function cr(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[i,c]of String(t).split(/\r?\n/).entries()){let n=c.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let p=n.slice(1).match(/../g).map(A=>parseInt(A,16));if(p.reduce((A,b)=>A+b,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[d,u,x,g]=p,C=p.slice(4,4+d);if(g===0){let A=o+(u<<8|x);if(A+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(C,A)}else if(g===1){s=!0;break}else g===2?o=(C[0]<<8|C[1])<<4:g===4&&(o=(C[0]<<8|C[1])<<16)}if(!s)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var Vn=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],es='(()=>{function we(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var Do=256,$o=128,te=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+Do),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array($o),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,o=255){let i=this.writeHooks[e];i&&i(s,this.data[e],e,o)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:o,enableRegister:i,enableMask:a}=e;e.inverseFlag?this.data[s]&=~o:this.data[s]|=o,this.data[i]&a&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:o,flagRegister:i,flagMask:a,inverseFlag:n}=e;if(s&o){let r=this.data[i]&a;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:o},i=!0){i&&(this.data[s]&=~o);let{pendingInterrupts:a,maxInterrupt:n}=this;if(a[e]&&(a[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(a[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:o,flagMask:i}=e;s&i&&(this.data[o]&=~i,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:o}=this;s=this.cycles+Math.max(1,s);let i=o.pop(),a=i??{cycles:s,callback:e,next:null};a.cycles=s,a.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<s;)r=n,n=n.next;return r?(r.next=a,a.next=n):(this.nextClockEvent=a,a.next=n),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:o}=this,i=null;for(;s;){if(s.callback===e)return i?i.next=s.next:this.nextClockEvent=s.next,o.length<10&&o.push(s),!0;i=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let o=this.pendingInterrupts[s];we(this,o.address),o.constant||this.clearInterrupt(o)}}};function ee(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Me(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o+(t.data[95]&1),a=i&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^o)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i&256?1:0,n|=1&(s&o|o&~a|~a&s)?32:0,t.data[95]=n}else if((e&64512)===3072){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o&255;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(i^o)&(i^s)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=s+o&256?1:0,a|=1&(s&o|o&~i|~i&s)?32:0,t.data[95]=a}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=o+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,i,!0);let a=t.data[95]&224;a|=i?0:2,a|=32768&i?4:0,a|=~o&i&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=~i&o&32768?1:0,t.data[95]=a,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65039)===37893){let s=t.data[(e&496)>>4],o=s>>>1|128&s;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,o=(e&496)>>4;t.data[o]=~(1<<s)&t.data[o]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],o=e&7;t.data[95]=t.data[95]&191|(s>>o&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,o=t.pc+2,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=s-1,t.cycles+=a?4:3}else if((e&65280)===38912){let s=e&248,o=e&7,i=t.readData((s>>3)+32),a=1<<o;t.writeData((s>>3)+32,i&~a,a)}else if((e&65039)===37888){let s=(e&496)>>4,o=255-t.data[s];t.data[s]=o;let i=t.data[95]&225|1;i|=o?0:2,i|=128&o?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===5120){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=((s^o)&(s^i)&128)!==0?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===1024){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],o=ee(s)?2:1;t.pc+=o,t.cycles+=o}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],o=s-1;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===128?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(e===38169){let s=t.pc+1,o=t.dataView.getUint16(93,!0),i=t.data[92];t.data[o]=s&255,t.data[o-1]=s>>8&255,t.data[o-2]=s>>16&255,t.dataView.setUint16(93,o-3,!0),t.pc=(i<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|o],t.dataView.setUint16(30,o+1,!0),o===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setUint16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.dataView.getInt8((e&7)+16),i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?2:0)|(s*o&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[o]=s&255,t.data[o-1]=s>>8&255,i&&(t.data[o-2]=s>>16&255),t.dataView.setUint16(93,o-(i?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=i?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],o=s+1&255;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===127?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i&255-o),t.data[s]=i}else if((e&65039)===37381){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i|o),t.data[s]=i}else if((e&65039)===37383){let s=t.data[(e&496)>>4],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^o),t.data[(e&496)>>4]=o}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],o=s>>>1;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),o=2*((e&240)>>4);t.data[o]=t.data[s],t.data[o+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,o=t.data[s],i=0-o;t.data[s]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=i===128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i?1:0,a|=1&(i|o)?32:0,t.data[95]=a}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),o=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc+=s,t.cycles+=a?3:2}else if(e===38152){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],o=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=1&s?1:0,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===2048){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);t.data[(e&496)>>4]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=t.data[95],a=s-o-(i&1);t.data[((e&240)>>4)+16]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&65280)===39424){let s=((e&248)>>3)+32,o=1<<(e&7);t.writeData(s,t.readData(s)|o,o),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let o=t.progMem[t.pc+1],i=ee(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let o=t.progMem[t.pc+1],i=ee(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=e&15|(e&192)>>2,a=o-i;t.dataView.setUint16(s,a,!0);let n=t.data[95]&192;n|=a?0:2,n|=32768&a?4:0,n|=o&~a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>o?1:0,n|=1&(~o&i|i&a|a&~o)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],o=ee(s)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],o=ee(s)?2:1;t.cycles+=o,t.pc+=o}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],o=t.progMem[t.pc+1];t.writeData(o,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.writeData(o,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0);t.writeData(o,s),t.dataView.setUint16(28,o+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o;t.data[((e&240)>>4)+16]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&65039)===37890){let s=(e&496)>>4,o=t.data[s];t.data[s]=(15&o)<<4|(240&o)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,o=t.data[s],i=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=o,t.data[s]=i}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var it;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(it||(it={}));var j;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(j||(j={}));var us={0:{type:j.SingleEnded,channel:0},1:{type:j.SingleEnded,channel:1},2:{type:j.SingleEnded,channel:2},3:{type:j.SingleEnded,channel:3},4:{type:j.SingleEnded,channel:4},5:{type:j.SingleEnded,channel:5},6:{type:j.SingleEnded,channel:6},7:{type:j.SingleEnded,channel:7},8:{type:j.Temperature},14:{type:j.Constant,voltage:1.1},15:{type:j.Constant,voltage:0}},vo={type:j.Constant,voltage:0},Pe={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:us,adcReferences:[it.AREF,it.AVCC,it.Reserved,it.Internal1V1]},_o=7,ko=8,Uo=16,xs=64,ye=128,Bo=31,Oo=32,Vo=8,Fo=8,Wo=3,No=6,se=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=o=>{var i;let a=0;switch(o.type){case j.Constant:a=o.voltage;break;case j.SingleEnded:a=(i=this.channelValues[o.channel])!==null&&i!==void 0?i:0;break;case j.Differential:a=o.gain*((this.channelValues[o.positiveChannel]||0)-(this.channelValues[o.negativeChannel]||0));break;case j.Temperature:a=.378125;break}let n=a/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:Uo,enableRegister:this.config.ADCSRA,enableMask:ko},e.writeHooks[s.ADCSRA]=(o,i)=>{var a;if(o&ye&&!(i&ye)&&(this.conversionCycles=25),e.data[s.ADCSRA]=o,e.updateInterruptEnable(this.ADC,o),!this.converting&&o&xs){if(!(o&ye))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&Bo;e.data[s.ADCSRB]&Vo&&(n|=32),n&=s.muxInputMask;let r=(a=s.muxChannels[n])!==null&&a!==void 0?a:vo;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:o,ADMUX:i,ADCSRA:a}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[i]&Oo?(this.cpu.data[s]=e<<6&255,this.cpu.data[o]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[o]=e>>8&3),this.cpu.data[a]&=~xs,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&_o){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:o}=this.config,i=this.cpu.data[s]>>No&Wo;return o.length>4&&this.cpu.data[s]&Fo&&(i|=4),(e=o[i])!==null&&e!==void 0?e:it.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case it.AVCC:return this.avcc;case it.AREF:return this.aref;case it.Internal1V1:return 1.1;case it.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var Lo=2,jo=4,Ho=8,Go=16,qo=32,ra=Lo|jo|Ho|Go|qo;var ps={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},ms={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},gs={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Cs={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Ss={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var _t={PIN:35,DDR:36,PORT:37,pinChange:gs,externalInterrupts:[]},Ee={PIN:38,DDR:39,PORT:40,pinChange:Cs,externalInterrupts:[]},At={PIN:41,DDR:42,PORT:43,pinChange:Ss,externalInterrupts:[null,null,ps,ms]};var q;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(q||(q={}));var V;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(V||(V={}));var vt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(vt||(vt={}));var oe=class{constructor(e,s){var o,i,a,n;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=p=>{let E=e.data[s.PORT];return e.data[s.DDR]=p,this.writeGpio(E,p),this.updatePinRegister(p),!0},e.writeHooks[s.PORT]=p=>{let E=e.data[s.DDR];return e.data[s.PORT]=p,this.writeGpio(p,E),this.updatePinRegister(E),!0},e.writeHooks[s.PIN]=(p,E,f,w)=>{let P=e.data[s.PORT],k=e.data[s.DDR],W=P^p&w;return e.data[s.PORT]=W,this.writeGpio(W,k),this.updatePinRegister(k),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(p=>p?{address:p.interrupt,flagRegister:p.EIFR,flagMask:1<<p.index,enableRegister:p.EIMSK,enableMask:1<<p.index}:null);let d=new Set(r.map(p=>p?.EICR));for(let p of d)this.attachInterruptHook(p||0);let R=(i=(o=r.find(p=>p&&p.EIMSK))===null||o===void 0?void 0:o.EIMSK)!==null&&i!==void 0?i:0;this.attachInterruptHook(R,"mask");let u=(n=(a=r.find(p=>p&&p.EIFR))===null||a===void 0?void 0:a.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(u,"flag");let{pinChange:A}=s;if(this.PCINT=A?{address:A.pinChangeInterrupt,flagRegister:A.PCIFR,flagMask:1<<A.PCIE,enableRegister:A.PCICR,enableMask:1<<A.PCIE}:null,A){let{PCIFR:p,PCMSK:E}=A;e.writeHooks[p]=f=>{for(let w of this.cpu.gpioPorts){let{PCINT:P}=w;P&&e.clearInterruptByFlag(P,f)}return!0},e.writeHooks[E]=f=>{e.data[E]=f;for(let w of this.cpu.gpioPorts){let{PCINT:P}=w;P&&e.updateInterruptEnable(P,f)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],o=this.cpu.data[this.portConfig.PORT],i=1<<e,a=o&i?q.InputPullUp:q.Input,n=this.openCollector&i?a:q.High;return s&i?this.lastValue&i?n:q.Low:a}setPin(e,s){let o=1<<e;this.pinValue&=~o,s&&(this.pinValue|=o),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:o,portConfig:i}=this,a=1<<e;if(s===V.None)this.overrideMask|=a,this.overrideValue&=~a;else switch(this.overrideMask&=~a,s){case V.Enable:this.overrideValue&=~a,this.overrideValue|=o.data[i.PORT]&a;break;case V.Set:this.overrideValue|=a;break;case V.Clear:this.overrideValue&=~a;break;case V.Toggle:this.overrideValue^=a;break}let n=o.data[i.DDR];this.writeGpio(o.data[i.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var s,o;let i=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=i,this.lastPin!==i){for(let a=0;a<8;a++)if((i&1<<a)!==(this.lastPin&1<<a)){let n=!!(i&1<<a);this.toggleInterrupt(a,n),(o=(s=this.externalClockListeners)[a])===null||o===void 0||o.call(s,n)}this.lastPin=i}}toggleInterrupt(e,s){let{cpu:o,portConfig:i,externalInts:a,PCINT:n}=this,{externalInterrupts:r,pinChange:d}=i,R=r[e],u=a[e];if(u&&R){let{EIMSK:A,index:p,EICR:E,iscOffset:f}=R;if(o.data[A]&1<<p){let w=o.data[E]>>f&3,P=!1;switch(u.constant=!1,w){case vt.LowLevel:P=!s,u.constant=!0;break;case vt.Change:P=!0;break;case vt.FallingEdge:P=!s;break;case vt.RisingEdge:P=s;break}P?o.setInterruptFlag(u):u.constant&&o.clearInterrupt(u,!0)}}if(d&&n&&d.mask&1<<e){let{PCMSK:A}=d;o.data[A]&1<<e+d.offset&&o.setInterruptFlag(n)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:o}=this;o.writeHooks[e]=i=>{s!=="flag"&&(o.data[e]=i);for(let a of o.gpioPorts){for(let n of a.externalInts)n&&s==="mask"&&o.updateInterruptEnable(n,i),n&&!n.constant&&s==="flag"&&o.clearInterruptByFlag(n,i);a.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let o=0;o<8;o++){let i=s[o];if(!i)continue;let a=!!(this.lastPin&1<<o),{EIFR:n,EIMSK:r,index:d,EICR:R,iscOffset:u,interrupt:A}=i;if(!(e.data[r]&1<<d)||a)continue;(e.data[R]>>u&3)===vt.LowLevel&&e.queueInterrupt({address:A,flagRegister:n,flagMask:1<<d,enableRegister:r,enableMask:1<<d,constant:!0})}}writeGpio(e,s){let o=(e&this.overrideMask|this.overrideValue)&s|e&~s,i=this.lastValue;if(o!==i||s!==this.lastDdr){this.lastValue=o,this.lastDdr=s;for(let a of this.listeners)a(o,i)}}};var bs={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ie;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ie||(ie={}));var $e={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},ve=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:bs,compPortA:At.PORT,compPinA:6,compPortB:At.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:At.PORT,externalClockPin:4},$e),_e=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:bs,compPortA:_t.PORT,compPinA:1,compPortB:_t.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:At.PORT,externalClockPin:5},$e),ke=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:_t.PORT,compPinA:3,compPortB:At.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},$e),Gt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Gt||(Gt={}));var F;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(F||(F={}));var U;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(U||(U={}));var bt=1,Ht=2,kt=1,{Normal:Ue,PWMPhaseCorrect:pt,CTC:me,FastPWM:mt,Reserved:De,PWMPhaseFrequencyCorrect:ae}=Gt,Ko=[[Ue,255,U.Immediate,F.Max,0],[pt,255,U.Top,F.Bottom,0],[me,bt,U.Immediate,F.Max,0],[mt,255,U.Bottom,F.Max,0],[De,255,U.Immediate,F.Max,0],[pt,bt,U.Top,F.Bottom,kt],[De,255,U.Immediate,F.Max,0],[mt,bt,U.Bottom,F.Top,kt]],zo=[[Ue,65535,U.Immediate,F.Max,0],[pt,255,U.Top,F.Bottom,0],[pt,511,U.Top,F.Bottom,0],[pt,1023,U.Top,F.Bottom,0],[me,bt,U.Immediate,F.Max,0],[mt,255,U.Bottom,F.Top,0],[mt,511,U.Bottom,F.Top,0],[mt,1023,U.Bottom,F.Top,0],[ae,Ht,U.Bottom,F.Bottom,0],[ae,bt,U.Bottom,F.Bottom,kt],[pt,Ht,U.Top,F.Bottom,0],[pt,bt,U.Top,F.Bottom,kt],[me,Ht,U.Immediate,F.Max,0],[De,65535,U.Immediate,F.Max,0],[mt,Ht,U.Bottom,F.Top,kt],[mt,bt,U.Bottom,F.Top,kt]];function Xo(t){switch(t){case 1:return V.Toggle;case 2:return V.Clear;case 3:return V.Set;default:return V.Enable}}var Rs=128,As=64,Zo=32,ne=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=U.Immediate,this.tovUpdateMode=F.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(o=!0,i=!1)=>{let{divider:a,lastCycle:n,cpu:r}=this,{cycles:d}=r,R=d-n;if(a&&R>=a||i){let u=i?1:Math.floor(R/a);this.lastCycle+=u*a;let A=this.tcnt,{timerMode:p,TOP:E}=this,f=p===pt||p===ae,w=f?this.phasePwmCount(A,u):(A+u)%(E+1),P=A+u>E;if(this.tcntUpdated||(this.tcnt=w,f||this.timerUpdated(w,A)),!f){if(p===mt&&P){let{compA:k,compB:W}=this;k&&this.updateCompPin(k,"A",!0),W&&this.updateCompPin(W,"B",!0)}this.ocrUpdateMode==U.Bottom&&P&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),P&&(this.tovUpdateMode==F.Top||E===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===U.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===U.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:u}=this,{externalClockPin:A}=this.config,p=this.config.dividers[u];this.lastCycle=p?this.cpu.cycles:0,this.updateDivider=!1,this.divider=p,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[A]=null),p?r.addClockEvent(this.count,this.lastCycle+p-r.cycles):this.externalClockPort&&(u===ie.FallingEdge||u===ie.RisingEdge)&&(this.externalClockPort.externalClockListeners[A]=this.externalClockCallback,this.externalClockRisingEdge=u===ie.RisingEdge);return}o&&a&&r.addClockEvent(this.count,this.lastCycle+a-r.cycles)},this.externalClockCallback=o=>{o===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=o=>(this.count(!1),this.config.bits===16&&(this.cpu.data[o+1]=this.tcnt>>8),this.cpu.data[o]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=o=>{this.tcntNext=this.highByteTemp<<8|o,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=o=>{this.nextOcrA=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=o=>{this.nextOcrB=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=o=>{this.nextOcrC=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=a=>{this.icr=this.highByteTemp<<8|a};let o=a=>{this.highByteTemp=a},i=(a,n,r)=>(this.highByteTemp=a&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=o,this.cpu.writeHooks[s.OCRA+1]=i,this.cpu.writeHooks[s.OCRB+1]=i,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=i),this.cpu.writeHooks[s.ICR+1]=o}e.writeHooks[s.TCCRA]=o=>(this.cpu.data[s.TCCRA]=o,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=o=>(s.TCCRC||(this.checkForceCompare(o),o&=~(Rs|As)),this.cpu.data[s.TCCRB]=o,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=o=>{this.checkForceCompare(o)}),e.writeHooks[s.TIFR]=o=>(this.cpu.data[s.TIFR]=o,this.cpu.clearInterruptByFlag(this.OVF,o),this.cpu.clearInterruptByFlag(this.OCFA,o),this.cpu.clearInterruptByFlag(this.OCFB,o),!0),e.writeHooks[s.TIMSK]=o=>{this.cpu.updateInterruptEnable(this.OVF,o),this.cpu.updateInterruptEnable(this.OCFA,o),this.cpu.updateInterruptEnable(this.OCFB,o)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case bt:return this.ocrA;case Ht:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case bt:case Ht:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,o=e.bits===16?zo:Ko,i=this.cpu.data[e.TCCRA],[a,n,r,d,R]=o[s];this.timerMode=a,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=d;let u=a===mt||a===pt||a===ae,A=this.compA;this.compA=i>>6&3,this.compA===1&&u&&!(R&kt)&&(this.compA=0),!!A!=!!this.compA&&this.updateCompA(this.compA?V.Enable:V.None);let p=this.compB;if(this.compB=i>>4&3,this.compB===1&&u&&(this.compB=0),!!p!=!!this.compB&&this.updateCompB(this.compB?V.Enable:V.None),this.hasOCRC){let E=this.compC;this.compC=i>>2&3,this.compC===1&&u&&(this.compC=0),!!E!=!!this.compC&&this.updateCompC(this.compC?V.Enable:V.None)}}phasePwmCount(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n,TOP:r,MAX:d,tcntUpdated:R}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!R&&(this.countingUp=!1,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!R&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===U.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),R||(e===o&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===i&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===a&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&d}timerUpdated(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n}=this,r=s>e;((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==Gt.FastPWM||this.timerMode==Gt.PWMPhaseCorrect||this.timerMode==Gt.PWMPhaseFrequencyCorrect||(e&Rs&&this.updateCompPin(this.compA,"A"),e&As&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Zo&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,o=!1){let i=V.None,a=e===3,n=this.countingUp===a;switch(this.timerMode){case Ue:case me:i=Xo(e);break;case mt:e===1?i=o?V.None:V.Toggle:i=a!==o?V.Set:V.Clear;break;case pt:case ae:e===1?i=V.Toggle:i=n?V.Set:V.Clear;break}i!==V.None&&(s==="A"?this.updateCompA(i):s==="B"?this.updateCompB(i):this.updateCompC(i))}updateCompA(e){let{compPortA:s,compPinA:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompB(e){let{compPortB:s,compPinB:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompC(e){let{compPortC:s,compPinC:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}};var Oe={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},Jo=128,Qo=64,Is=32;var Be=2,Yo=1,Ts=Be,ti=128,ei=64,si=32,ge=16,Ce=8,Ps=4;var ws=Ps|ge|Ce;var oi=32,ii=16,ai=8,Ms=4,ys=2;var ni={5:31,6:63,7:127,8:255,9:255},re=class{constructor(e,s,o){this.cpu=e,this.config=s,this.freqHz=o,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Jo,enableRegister:this.config.UCSRB,enableMask:ti,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Is,enableRegister:this.config.UCSRB,enableMask:si},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Qo,enableRegister:this.config.UCSRB,enableMask:ei},this.reset(),this.cpu.writeHooks[s.UCSRA]=(i,a)=>{var n;return e.data[s.UCSRA]=i&(Yo|Be),e.clearInterruptByFlag(this.TXC,i),(i&Ts)!==(a&Ts)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(i,a)=>{var n;return e.updateInterruptEnable(this.RXC,i),e.updateInterruptEnable(this.UDRE,i),e.updateInterruptEnable(this.TXC,i),i&ge&&a&ge&&e.clearInterrupt(this.RXC),i&Ce&&!(a&Ce)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=i,(i&ws)!==(a&ws)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=i=>{var a;return e.data[s.UCSRC]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var i;let a=(i=ni[this.bitsPerChar])!==null&&i!==void 0?i:255,n=this.rxByte&a;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[s.UDR]=i=>{if(this.onByteTransmit&&this.onByteTransmit(i),this.onLineTransmit){let a=String.fromCharCode(i);a===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=a}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=i=>{var a;return this.cpu.data[s.UBRRH]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.writeHooks[s.UBRRL]=i=>{var a;return this.cpu.data[s.UBRRL]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Is,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Ms|ys,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var o;let{cpu:i}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,i.setInterruptFlag(this.RXC),(o=this.onRxComplete)===null||o===void 0||o.call(this);else return this.rxBusyValue=!0,i.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&Be?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&ge)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ce)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Ms|ys))>>1|this.cpu.data[this.config.UCSRB]&Ps){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ai?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&oi)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&ii)}};function Es(t){let e=new Uint8Array(32768),s=0,o=!1;for(let[i,a]of String(t).split(/\\r?\\n/).entries()){let n=a.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${i+1}).`);let r=n.slice(1).match(/../g).map(E=>parseInt(E,16));if(r.reduce((E,f)=>E+f,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${i+1}).`);let[d,R,u,A]=r,p=r.slice(4,4+d);if(A===0){let E=s+(R<<8|u);if(E+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(p,E)}else if(A===1){o=!0;break}else A===2?s=(p[0]<<8|p[1])<<4:A===4&&(s=(p[0]<<8|p[1])<<16)}if(!o)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var lt=16e6,ri=Me,ci=[[At,["D0","D1","D2","D3","D4","D5","D6","D7"]],[_t,["D8","D9","D10","D11","D12","D13"]],[Ee,["A0","A1","A2","A3","A4","A5"]]],ft=Object.freeze({...q});function Ds(t){let e=new te(Es(t));[ve,_e,ke].forEach(f=>new ne(e,f));let s=new re(e,Oe,lt),o=new se(e,Pe),i=ci.map(([f,w])=>[new oe(e,f),w]),a={};for(let[f,w]of i)w.forEach((P,k)=>a[P]=[f,k]);let n=null;o.onADCRead=f=>{let w=0;if(f.type===j.SingleEnded){let W=o.channelValues[f.channel]||0;w=n?n(f.channel,W):W}else f.type===j.Constant?w=f.voltage:f.type===j.Temperature&&(w=.378125);let P=Math.round(w*1e6)/1e6,k=Math.min(1023,Math.max(0,Math.floor(P/o.referenceVoltage*1024)));e.addClockEvent(()=>o.completeADCRead(k),o.sampleCycles)};let r=[],d=[],R=[],u=[],A=p();function p(){let f={};for(let[w,P]of i)P.forEach((k,W)=>f[k]=w.pinState(W));return f}for(let[f,w]of i)f.addListener(()=>{let P=null;for(let k=0;k<w.length;k++){let W=f.pinState(k);W!==A[w[k]]&&((P||(P={}))[w[k]]=W,A[w[k]]=W)}if(P)for(let k of d)k(P,A)});s.onByteTransmit=f=>R.forEach(w=>w(f));function E(f){let w=e.cycles+f;for(;e.cycles<w;){let P=Math.min(w,e.cycles+lt/1e3);for(;e.cycles<P;)ri(e),e.tick();u.length&&!s.rxBusy&&(s.writeByte(u[0]),u.shift());for(let k of r)k()}}return{correr:E,estados:p,get ciclos(){return e.cycles},alCambiarPines:f=>d.push(f),alByteSerial:f=>R.push(f),enviarSerial:f=>u.push(...new TextEncoder().encode(f)),ponerAnalogico:(f,w)=>o.channelValues[f]=Math.max(0,Math.min(5,w)),ponerLectorAnalogico:f=>n=f,ponerEntrada(f,w){let P=a[f];P&&P[0].setPin(P[1],!!w)},alCadaMs:f=>r.push(f)}}var li=["a","b","c","d","e"],fi=["f","g","h","i","j"],Ve={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},di=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],$s={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Fe=t=>14.4+(t-1)*9.6,hi=t=>t>=2&&(t-1)%6!==0,We=new Map;function Le(t="media"){if(We.has(t))return We.get(t);let e=$s[t]||$s.media,s=[];We.set(t,s);for(let o=1;o<=e.columnas;o++){for(let i of li)s.push({nombre:i+o,x:Fe(o),y:Ve[i],tira:"arriba"+o});for(let i of fi)s.push({nombre:i+o,x:Fe(o),y:Ve[i],tira:"abajo"+o});for(let[i]of di)hi(o)&&s.push({nombre:i+o,x:Fe(o),y:Ve[i],tira:i})}return s}var Ne=new Map;function vs(t="media"){if(Ne.has(t))return Ne.get(t);let e=new Map;Ne.set(t,e);for(let s of Le(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var qt=3.779527559055118,xi={ancho:72.58*qt,alto:53.34*qt},ui=4*qt,_s=5*qt;var ce=ui+4.6*qt,le=xi.ancho-.5-4.6*qt,pi=60,gt=(t,e)=>({x:t,y:pi+e*_s}),nn={M1A:gt(ce,0),M1B:gt(ce,1),GND_IZQ:gt(ce,2),M2A:gt(ce,3),M2B:gt(ce,4),M4A:gt(le,0),M4B:gt(le,1),GND_DER:gt(le,2),M3A:gt(le,3),M3B:gt(le,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+_s,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var ks=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var mi=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Ut(t,{presionados:e=new Set,conduccion:s=!1}={}){let o=new Map,i=n=>{for(o.has(n)||o.set(n,n);o.get(n)!==n;)o.set(n,o.get(o.get(n))),n=o.get(n);return n},a=(n,r)=>o.set(i(n),i(r));for(let n of mi)n.forEach(r=>a("placa."+n[0],"placa."+r));for(let n of t.cables)a(n.de,n.a);if(t.protoboard){for(let n of vs(t.protoboard.tipo).values())n.forEach(r=>a("protoboard."+n[0],"protoboard."+r));for(let n of t.componentes)if(n.en)for(let[r,d]of Object.entries(n.en))a(n.id+"."+r,d)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[r,d]of ks)a(n.id+"."+r,d);(!n.props||n.props.puentePWR!==!1)&&a(n.id+".EXT_POS","placa.VIN")}else n.tipo==="bateria_lipo"?(a(n.id+".BAL0",n.id+".NEG"),a(n.id+".BAL2",n.id+".POS")):n.tipo==="pulsador"?(a(n.id+".1i",n.id+".1d"),a(n.id+".2i",n.id+".2d"),e.has(n.id)&&a(n.id+".1i",n.id+".2i")):s&&n.tipo==="resistencia"?a(n.id+".1",n.id+".2"):s&&n.tipo==="potenciometro"&&(a(n.id+".GND",n.id+".SIG"),a(n.id+".SIG",n.id+".VCC"));return i}function He(t,e,s,o){e>=0&&(t[e][e]+=o),s>=0&&(t[s][s]+=o),e>=0&&s>=0&&(t[e][s]-=o,t[s][e]-=o)}function je(t,e,s){e>=0&&(t[e]+=s)}var Bt=(t,e)=>e>=0?t[e]:0;function fe(t,e,s){return{a:t,b:e,g:1/s,sellar(o){He(o,this.a,this.b,this.g)},corriente(o){return(Bt(o,this.a)-Bt(o,this.b))*this.g}}}function Us(t){return{nodo:t,v:0,g:0,sellar(e,s){He(e,this.nodo,-1,this.g),je(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Bt(e,this.nodo))*this.g}}}function Bs(t,e){return{nodo:t,v:e,fila:-1,sellar(s,o){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,o[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function Os(t,e,{Is:s,n:o}){let i=o*.025693,a=i*Math.log(i/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let d=Math.exp(this.vd/i),R=s*(d-1),u=s*d/i+1e-12,A=R-u*this.vd;He(n,this.a,this.k,u),je(r,this.a,-A),je(r,this.k,A)},actualizar(n){let r=Bt(n,this.a)-Bt(n,this.k),d=Math.abs(r-this.vd);return this.vd=gi(r,this.vd,i,a),d},corriente(n){let r=Bt(n,this.a)-Bt(n,this.k);return s*Math.expm1(r/i)}}}function gi(t,e,s,o){if(t>o&&Math.abs(t-e)>2*s){if(e>0){let i=1+(t-e)/s;return i>0?e+s*Math.log(i):o}return s*Math.log(t/s)}return t}function Vs(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let o=t.nodos+t.fuentes,i=t.elementos.filter(n=>n.noLineal),a=new Float64Array(o);for(let n=1;n<=e;n++){let r=Array.from({length:o},()=>new Float64Array(o)),d=new Float64Array(o);for(let u of t.elementos)u.sellar(r,d);for(let u=0;u<t.nodos;u++)r[u][u]+=1e-12;if(a=Ci(r,d),!i.length)return{x:a,iteraciones:n,convergio:!0};let R=0;for(let u of i)R=Math.max(R,u.actualizar(a));if(R<s)return{x:a,iteraciones:n,convergio:!0}}return{x:a,iteraciones:e,convergio:!1}}function Ci(t,e){let s=e.length;for(let i=0;i<s;i++){let a=i;for(let n=i+1;n<s;n++)Math.abs(t[n][i])>Math.abs(t[a][i])&&(a=n);if(Math.abs(t[a][i])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[i],t[a]]=[t[a],t[i]],[e[i],e[a]]=[e[a],e[i]];for(let n=i+1;n<s;n++){let r=t[n][i]/t[i][i];if(r){for(let d=i;d<s;d++)t[n][d]-=r*t[i][d];e[n]-=r*e[i]}}}let o=new Float64Array(s);for(let i=s-1;i>=0;i--){let a=e[i];for(let n=i+1;n<s;n++)a-=t[i][n]*o[n];o[i]=a/t[i][i]}return o}var Ot={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},Ge=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],Ri={A4:"SDA",A5:"SCL"},st={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},Ai=.25,Fs={minimo:1};function bi(t){let s=(st.vf[t]||st.vf.rojo)-st.iRef*st.rs;return{Is:st.iRef/Math.expm1(s/(st.n*.025693)),n:st.n}}var Ws={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function Ns(t,{quemados:e=new Set,presionados:s=new Set}={}){let o=Ut(t,{presionados:s}),i=Ut(t,{presionados:s,conduccion:!0}),a=o("placa.GND1"),n=new Map,r=0,d=m=>{let M=o(m);return M===a?-1:(n.has(M)||n.set(M,r++),n.get(M))},R=m=>o(m)===a?-1:n.get(o(m)),u=[],A=[],p=[],E=new Set(t.cables.flatMap(m=>[m.de,m.a])),f=[];if(t.protoboard){let m=new Set([...E].map(o));for(let M of t.componentes)for(let x of Object.keys(M.en||{}))m.add(o(M.id+"."+x));for(let M of Le(t.protoboard.tipo)){let x="protoboard."+M.nombre;m.has(o(x))&&f.push(x)}}let w=new Map;for(let[m,M]of[["5V",5],["3V3",3.3]]){if(!E.has("placa."+m))continue;let x=d("placa."+m),I=x===-1?"GND":w.get(x);if(I){p.push({tipo:"cortocircuito",componente:"placa."+m,mensaje:`El pin ${m} est\\xE1 unido directo a ${I}: es un cortocircuito.`});continue}w.set(x,m);let c=Bs(x,M);A.push(c),u.push(c)}let P={};for(let m of Ge)!E.has("placa."+m)&&!E.has("placa."+Ri[m])||(P[m]=Us(d("placa."+m)),u.push(P[m]));let k=[],W=[],It=[];for(let m of t.componentes)if(m.tipo==="resistencia"){let M=fe(d(m.id+".1"),d(m.id+".2"),Number(m.props.ohmios)||1);k.push({id:m.id,ohmios:Number(m.props.ohmios)||1,el:M}),M.a!==M.b&&u.push(M)}else if(m.tipo==="led"){let M=d(m.id+".anodo"),x=d(m.id+".catodo"),I={id:m.id,a:M,k:x,quemado:e.has(m.id)};if(!I.quemado&&M!==x){let c=r++;I.rs=fe(M,c,st.rs),I.diodo=Os(c,x,bi(m.props.color)),u.push(I.rs,I.diodo)}W.push(I)}else if(m.tipo==="potenciometro"){let M=Number(m.props.ohmios)||1e4,x=Math.max(0,Math.min(1,Number(m.props.posicion))),I=d(m.id+".GND"),c=d(m.id+".SIG"),y=d(m.id+".VCC"),b=fe(I,c,Math.max(Fs.minimo,M*x)),B=fe(c,y,Math.max(Fs.minimo,M*(1-x)));for(let N of[b,B])N.a!==N.b&&u.push(N);It.push({id:m.id,ohmios:M,posicion:x,bajo:b,alto:B})}A.forEach((m,M)=>m.fila=r+M);function nt(m){let M=new Set([i("placa.GND1")]);for(let x of["5V","3V3"])E.has("placa."+x)&&M.add(i("placa."+x));for(let x of Ge){let I=m[x];(I===q.High||I===q.Low||I===q.InputPullUp)&&M.add(i("placa."+x))}return M}let et=new Set([...E,...f]);for(let m of t.componentes)for(let M of Ws[m.tipo]||[])et.add(m.id+"."+M);return{fallasFijas:p,flotantes(m){let M=nt(m),x=new Set;for(let I of Ge)m[I]===q.Input&&!M.has(i("placa."+I))&&x.add(I);return x},refsAlAire(m){let M=nt(m),x=new Set;for(let I of et)M.has(i(I))||x.add(I);return x},ponerPines(m){for(let[M,x]of Object.entries(P)){let I=m[M];I===q.High?Object.assign(x,{v:Ot.voltios,g:1/Ot.rAlto}):I===q.Low?Object.assign(x,{v:0,g:1/Ot.rBajo}):I===q.InputPullUp?Object.assign(x,{v:Ot.voltios,g:1/Ot.rPullUp}):Object.assign(x,{v:0,g:0})}},resolver(){let m=Vs({nodos:r,fuentes:A.length,elementos:u}),M=c=>{let y=R(c);return y===void 0?null:y<0?0:m.x[y]},x={};for(let c of E)x[c]=M(c);for(let c of f)x[c]=M(c);for(let c of t.componentes)for(let y of Ws[c.tipo]||[])x[c.id+"."+y]=M(c.id+"."+y);let I=(c,y)=>c===null||y===null?null:c-y;return{convergio:m.convergio,iteraciones:m.iteraciones,voltajes:x,leds:W.map(c=>{let y=c.diodo?c.diodo.corriente(m.x):0;return{id:c.id,quemado:c.quemado,v:I(M(c.id+".anodo"),M(c.id+".catodo")),i:y,brillo:Math.max(0,Math.min(1,y*1e3/st.plenomA))}}),resistencias:k.map(c=>{let y=c.el.a===c.el.b?0:c.el.corriente(m.x);return{id:c.id,ohmios:c.ohmios,v:I(M(c.id+".1"),M(c.id+".2")),i:y,w:y*y*c.ohmios}}),pines:Object.entries(P).filter(([,c])=>c.g>0).map(([c,y])=>({pin:c,v:M("placa."+c),i:y.corriente(m.x)})),fuentes:A.map(c=>({pin:c.v===5?"5V":"3V3",i:c.corriente(m.x)})),potenciometros:It.map(c=>({id:c.id,ohmios:c.ohmios,posicion:c.posicion,v:I(M(c.id+".SIG"),M(c.id+".GND")),i:Math.abs(c.bajo.a!==c.bajo.b?c.bajo.corriente(m.x):c.alto.a!==c.alto.b?c.alto.corriente(m.x):0)}))}}}}function Ls(t,e){let s=i=>(Math.abs(i)*1e3).toFixed(0),o=[];if(e.danoComponentes){for(let i of t.leds)!i.quemado&&i.i*1e3>st.quemamA&&o.push({tipo:"led_quemado",componente:i.id,corriente_mA:+(i.i*1e3).toFixed(1),mensaje:`El LED ${i.id} se quem\\xF3: le pasaron ${s(i.i)} mA y aguanta unos ${st.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let i of t.resistencias)i.w>Ai&&o.push({tipo:"resistencia_caliente",componente:i.id,potencia_W:+i.w.toFixed(2),mensaje:`La resistencia ${i.id} se calienta: disipa ${i.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let i of t.pines)if(Math.abs(i.i)*1e3>Ot.maxmA){let a=i.pin.startsWith("D")?"pin "+i.pin.slice(1):"pin "+i.pin;o.push({tipo:"corriente_pin",componente:"placa."+i.pin,corriente_mA:+(Math.abs(i.i)*1e3).toFixed(1),mensaje:`El ${a} entrega ${s(i.i)} mA y aguanta ${Ot.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return o}var Ft={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Vt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function Ii(t,e="sg90"){let s=(Ft[e]||Ft.sg90).angulos,o=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,o))}function js(t){let e=Ft[t]||Ft.sg90,s=90,o=90,i=null,a=0,n=!1,r=0,d=0;return{pulso(R){R<Vt.pulsoValidoMin||R>Vt.pulsoValidoMax||i!==null&&Math.abs(R-i)<Vt.bandaMuerta||(i=R,o=Ii(R,t))},avanzar(R,u){if(!(u>0)){n=!1,a=0;return}let A=60/(e.seg60*1e3)*(u/Vt.voltiosRef),p=o-s,E=Math.abs(p)>.01;r=Math.min(1,Math.abs(p)/Vt.bandaGrados),E&&!n&&(a=Vt.arranqueMs,d=r),n=E,n&&(s+=Math.sign(p)*Math.min(Math.abs(p),A*R)),a=Math.max(0,a-R)},corriente(R){if(!(R>0))return 0;let{reposo:u,movimiento:A,arranque:p}=e.mA;return(a>0?u+(p-u)*d:n?u+(A-u)*r:u)/1e3*(R/Vt.voltiosRef)},estado:()=>({angulo:s,objetivo:o,pulso:i,moviendo:n,arrancando:a>0})}}var Kt=9.6/2.54,Se=57.6,Hs=14.4,gn={x:Hs,ancho:32.2*Kt},Ti={x:Hs+(32.2-22.2)/2*Kt,ancho:22.2*Kt,alto:11.8*Kt},Cn={x:Ti.x+5.9*Kt,y:Se},Sn=13.5*Kt,qe=182.4;var Rn={GND:{x:qe,y:Se-9.6,color:"#7a4a24"},VCC:{x:qe,y:Se,color:"#d7263d"},SIG:{x:qe,y:Se+9.6,color:"#f28c28"}};var Q={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function Ke(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=Q.fusible,o=(8**2-t**2)*e,i=0,a=!1;return{avanzar(n,r){let d=n/1e3;!a&&r>t?i+=(r**2-t**2)/o*d:i=Math.max(0,i-d/s),i>=1&&(a=!0),a&&i===0&&(a=!1)},get abierto(){return a},get calor(){return i},reiniciar(){i=0,a=!1}}}var Gs=(t,e=0)=>Math.max(0,(Q.voltios-Q.ohmios*t)/(1+Q.ohmios*e));var de=3.779527559055118,dt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Re=dt.voltiosRef/(dt.mABloqueado/1e3),qs=dt.rpmSinCarga*dt.reduccion*2*Math.PI/60,Ks=dt.mASinCarga/1e3,zt=(dt.voltiosRef-Ks*Re)/qs,wi=zt*Ks/qs,Mi=dt.tauMecanicoMs/1e3*zt*zt/Re;function zs(){let t=0,e=0,s=0;return{avanzar(o,i,{conectado:a=!0,frena:n=!1}={}){let r=o/1e3;a?e=(i-zt*t)/Re:e=n?-(zt*t)/Re:0;let d=zt*e-wi*t;t+=d/Mi*r,s=(s+t/dt.reduccion*r*180/Math.PI)%360},estado(){let o=t*60/(2*Math.PI)/dt.reduccion;return{rpm:o,i:e,giro:s,velocidad:o/60*Math.PI*(dt.ruedaMM/10)}}}}var In=64.2*de,yi=22.5*de,Tn=40*de,Pi=11.2*de,wn=dt.ruedaMM*de/2,Mn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Pi,y0:132-yi/2}};var Zs=3.779527559055118,Ae={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Wt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},Js=t=>(Ae[t]||Ae.nominal).voltios,Qs=t=>(Ae[t]||Ae.nominal).celdas,Xs=360;var Ei=10,Ze=10,Di=72*Zs,$i=34*Zs;var ze=Ei+Di+58,Xe=Ze+$i-34,Pn={POS:{x:Xs-12,y:Ze+30,color:"#d7263d"},NEG:{x:Xs-12,y:Ze+39.6,color:"#2b2b2b"},BAL0:{x:ze,y:Xe,color:"#2b2b2b"},BAL1:{x:ze,y:Xe+9.6,color:"#e05a5a"},BAL2:{x:ze,y:Xe+19.2,color:"#d7263d"}};var Ys={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var vi=9.6,_i=82,ki=132,Dn=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:_i+e*vi,y:ki}]));var K={pinDatos:"D8",pinReloj:"D4",pinCierre:"D12",pinHabilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}},caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Ui=6.6,Bi=.06,eo=4,to=1-Math.exp(-1/eo),Oi=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],ht=(t,e=1)=>t.toFixed(e).replace(".",",");function so({activas:t,avisar:e}){let s=null,o=new Map,i=new Map,a=new Map,n=0,r=0,d=!1,R={},u=0,A={},p=0,E=0,f=0,w=0;function P(){for(let x of Object.values(K.pwm))R[x]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};u=0,A={}}P();function k(x,I){let c=(T,L)=>I(T)===I(L),y="placa.GND1",b=x.componentes.find(T=>T.tipo==="shield_l293d");s=b?{id:b.id,puente:!b.props||b.props.puentePWR!==!1}:null;let B=new Map;for(let T of x.componentes){if(T.tipo!=="bateria_lipo")continue;let L=T.props&&T.props.carga||"nominal",$=Js(L),D=i.get(T.id),C=T.id+".POS",_=T.id+".NEG",O={carga:L,voc:$,celdas:Qs(L),v:D&&D.carga===L?D.v:$,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};L==="descargada"&&e({tipo:"bateria_baja",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 descargada: ${ht($)} V, ${ht($/Wt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${ht(Wt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),L==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:T.id,mensaje:`Las celdas de la bater\\xEDa ${T.id} est\\xE1n desbalanceadas: ${O.celdas.map(z=>ht(z,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let ct=z=>s&&c(z,s.id+".EXT_POS")||c(z,"placa.VIN")||c(z,"placa.5V");c(C,_)?e({tipo:"bateria_corto",componente:T.id,mensaje:`Los dos cables de la bater\\xEDa ${T.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):c(C,y)&&ct(_)?e({tipo:"bateria_invertida",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):c(_,y)&&(O.valida=!0,c(C,"placa.5V")&&(O.valida=!1,e({tipo:"bateria_en_5v",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 en el pin 5V: sus ${ht($)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),O.motores=O.valida&&!!s&&c(C,s.id+".EXT_POS"),O.vin=O.valida&&c(C,"placa.VIN")),B.set(T.id,O)}i=B;let N=new Map;for(let T of x.componentes){if(T.tipo!=="probador_lipo")continue;let L=T.props&&typeof T.props.umbral=="number"?T.props.umbral:Ys.umbralV,$=null;for(let C of i.keys())c(T.id+".NEG",C+".BAL0")&&($=C);let D=["C1","C2","C3","C4","C5","C6","C7","C8"].map(C=>{if(!$)return null;for(let _ of[0,1,2])if(c(`${T.id}.${C}`,`${$}.BAL${_}`))return _;return null});N.set(T.id,{umbral:L,fuente:$,puntos:D})}a=N;let Y=T=>{if(s){for(let $ of[1,2,3,4])for(let D of["A","B"])if(c(T,`${s.id}.M${$}${D}`))return{tipo:"shield",n:$,s:D}}if(c(T,y))return{tipo:"gnd"};if(c(T,"placa.5V"))return{tipo:"5v"};for(let[$,D]of i)if(D.valida&&c(T,$+".POS"))return{tipo:"bateria",id:$};let L=Oi.find($=>c(T,"placa."+$));return L?{tipo:"pin",pin:L}:null},rt=new Map;for(let T of x.componentes){if(T.tipo!=="motor_tt")continue;let $=o.get(T.id)||{logico:zs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};$.lado=T.props&&T.props.lado||"izquierdo",$.a=Y(T.id+".A"),$.b=Y(T.id+".B");let D=[$.a,$.b].filter(_=>_&&_.tipo==="shield");$.canal=D.length?"M"+D[0].n:null;let C=[$.a,$.b].find(_=>_&&_.tipo==="pin");C&&e({tipo:"motor_en_pin",componente:T.id,mensaje:`El motor ${T.id} est\\xE1 conectado al pin ${C.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),rt.set(T.id,$)}o=rt}function W(x,I,c){if(!s)return;let y=b=>I[b]===ft.High;K.pinReloj in x&&y(K.pinReloj)&&(n=(n<<1|(y(K.pinDatos)?1:0))&255),K.pinCierre in x&&y(K.pinCierre)&&(r=n),K.pinHabilita in x&&(d=I[K.pinHabilita]===ft.Low);for(let b of Object.values(K.pwm)){if(!(b in x))continue;let B=R[b],N=x[b]===ft.High;B.cambios=(B.cambios||0)+1,N&&!B.alto?Object.assign(B,{alto:!0,desde:c}):!N&&B.alto&&(B.acum+=c-B.desde,B.alto=!1)}}function It(){d=!1,P()}function nt(x,{v5:I,logica:c}){let y=x-u;for(let[D,C]of Object.entries(R)){C.alto&&(C.acum+=x-C.desde,C.desde=x);let _=y>0?Math.min(1,C.acum/y):0,O=A[D]||0;A[D]=(_===0||_===1)&&C.quieto>=eo?_:O+to*(_-O),C.quieto=C.cambios?0:(C.quieto||0)+1,C.cambios=0,C.acum=0}u=x,p=0,E=0;for(let D of i.values())D.motores&&(p=Math.max(p,D.v)),D.vin&&(E=Math.max(E,D.v));let b=E>=Ui,B=c||b,N=new Map,Y=(D,C)=>N.set(D,(N.get(D)||0)+C),rt=D=>{for(let[C,_]of i)if(_.motores)return Y(C,D)},T=0,L=D=>D?D.tipo==="shield"?!B||!d?null:{v:r>>K.bits[D.n][D.s]&1?p:0,d:A[K.pwm[D.n]]||0,shield:!0}:D.tipo==="gnd"?{v:0,d:1}:D.tipo==="5v"?{v:I,d:1,del5V:!0}:D.tipo==="bateria"?{v:(i.get(D.id)||{v:0}).v,d:1,bateria:D.id}:null:null,$=!1;for(let[D,C]of o){let _=L(C.a),O=L(C.b),ct=_&&O?Math.min(_.d,O.d):0;if(!ct)C.vAhora=0,C.logico.avanzar(1,0,{conectado:!1});else{let tt=_.v-O.v,Lt=(_.shield?1:0)+(O.shield?1:0),ot=0;if(Math.abs(tt)>1e-9){let jt=t.caidaL293D&&Lt?Lt/2*(K.caidaV+K.caidaPorA*Math.abs(C.iAntes)):0;ot=Math.sign(tt)*Math.max(0,Math.abs(tt)-jt)*ct}C.vAhora=ot,C.logico.avanzar(1,ot,{conectado:!0}),Lt===2&&(r>>K.bits[C.a.n][C.a.s]&1)!==(r>>K.bits[C.b.n][C.b.s]&1)&&p<1&&($=!0);let Zt=C.logico.estado().i,Tt=tt>=0?_:O,wt=Math.max(0,Zt*Math.sign(tt||1))*ct;Tt.shield?rt(wt):Tt.del5V?T+=wt:Tt.bateria&&Y(Tt.bateria,wt)}let z=C.logico.estado();C.iAntes=z.i,C.sumaI+=Math.abs(z.i),C.sumaV+=Math.abs(C.vAhora||0),C.ms++;let Z=C.a&&C.a.tipo==="shield"||C.b&&C.b.tipo==="shield";C.sobreMs=Z&&Math.abs(z.i)>K.maximoCanalA?C.sobreMs+1:0,C.sobreMs>K.avisoCanalMs&&e({tipo:"l293d_corriente",componente:D,mensaje:`El motor ${D} pide ${ht(Math.abs(z.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}$&&s&&e({tipo:"motores_sin_energia",componente:s.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[D,C]of i){if(!C.valida)continue;let _=(N.get(D)||0)+(C.vin&&b?Bi:0);C.v=Math.max(0,C.voc-Wt.ohmios*_),C.iAntes=_,C.sumaI+=_,C.ms++;let O=Math.min(...et(C));O<Wt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:D,mensaje:`La bater\\xEDa ${D} baj\\xF3 a ${ht(C.v,2)} V con los motores y una celda qued\\xF3 en ${ht(O,2)} V: menos de ${ht(Wt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return f+=p,w++,{i5V:T,porVin:b}}function et(x){let I=x.valida?x.iAntes:0;return x.celdas.map(c=>Math.max(0,c-Wt.ohmios/x.celdas.length*I))}function m(x,I,c){let y=I.fuente&&i.get(I.fuente);if(!y)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:c};let b=et(y),B=[0,b[0],b[0]+b[1]],N=[],Y=0;for(let $ of I.puntos){if($===null)break;N.push(B[$]-Y),Y=B[$]}let rt=N.length>0&&Y>=2.5,T=N.findIndex($=>$<I.umbral),L=rt&&I.umbral>0&&T>=0;return L&&e({tipo:"probador_alarma",componente:x,mensaje:`El probador ${x} pita: la celda ${T+1} est\\xE1 en ${ht(Math.max(0,N[T]),2)} V, por debajo de ${ht(I.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:rt,celdas:N.map($=>Math.max(0,$)),total:Y,alarma:L,umbral:I.umbral,ms:c}}function M(x=0){let I={},c={motores:[],baterias:[],shield:null,probadores:[]};for(let[y,b]of o){let B=b.logico.estado(),N={rpm:B.rpm,giro:B.giro,velocidad:B.velocidad,i:b.ms?b.sumaI/b.ms:Math.abs(B.i),voltios:b.ms?b.sumaV/b.ms:0};I[y]=N,c.motores.push({id:y,canal:b.canal,lado:b.lado,...N}),Object.assign(b,{sumaI:0,sumaV:0,ms:0})}for(let[y,b]of i){let B={voltios:b.valida?b.v:b.voc,celdas:et(b),i:b.ms?b.sumaI/b.ms:0,carga:b.carga,conectada:b.motores||b.vin};I[y]=B,c.baterias.push({id:y,...B}),Object.assign(b,{sumaI:0,ms:0})}if(s){let y=w?f/w:p;I[s.id]={motoresV:y},c.shield={id:s.id,motoresV:y,puente:s.puente,habilitada:d,salidas:r}}for(let[y,b]of a){let B=m(y,b,x);I[y]=B,c.probadores.push({id:y,...B})}return f=0,w=0,{piezas:I,lista:c}}return{armar:k,pinesCambiaron:W,reiniciarChip:It,cadaMs:nt,foto:M,get hay(){return!!s||o.size>0||i.size>0||a.size>0}}}var Vi=60,be=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],oo=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Fi=3,Wi=1.5,Ni=1/1e4,io=60,Li=Math.cos(.35*Math.PI),ji=.1*5/1024,Hi=.15,Gi=100,ao=50;function ro({hex:t,circuito:e,activas:s={},semilla:o=Math.floor(Math.random()*2**32)}){let i=zi(o),a=new Set,n=[],r={raiz:null,grupos:new Set},d=new Set,R=new Set,u=new Set,A={},p=new Map,E={},f=null,w=e,P=null,k=new Map,W=new Map,It={},nt=null,et=new Map,m=new Map,M=[],x=0,I=0,c={inicio:0,clave:""},y=null,b=null,B=-1/0,N={},Y=0,rt=0,T=[],L=new TextDecoder("utf-8"),$=new Set,D=new Set,C=[],_=[],O=new Map,ct=0,z=Ke(),Z=!1,tt=null,Lt=0,ot=Q.idealV,Zt=0,Tt=0,wt=0,jt=0,Jt=[],Pt=so({activas:s,avisar:l=>Dt(l)}),Ie=0,Qt=!1,Ct=()=>(ct+f.ciclos)/lt*1e3,uo=l=>Nt.reduce((h,S)=>h+l[S]*no[S],0);function pe(){f=Ds(t);let l=f.estados();x=uo(l),et.set(x,l),I=0,m=new Map,M=[],c={inicio:0,clave:x},y=null,f.alCambiarPines((h,S)=>{es();let g=et.get(x);for(let v in h)x+=(h[v]-g[v])*no[v];et.has(x)||et.set(x,{...S}),x===c.clave&&(y={tiempos:new Map(m),ciclo:f.ciclos}),B=f.ciclos;for(let v in h)N[v]=f.ciclos;Et(),O.size&&go(h),Pt.pinesCambiaron(h,S,f.ciclos)}),f.alCadaMs(Ao),f.alCadaMs(as);for(let h of O.values())h.subida=null;Pt.reiniciarChip(),B=-1/0,N={},f.ponerLectorAnalogico(bo),It={},nt=null,f.alByteSerial(h=>{T.push(h),rt=Ct()+Vi})}function es(){let l=f.ciclos;m.set(x,(m.get(x)||0)+(l-I)),I=l}function Yt(){P=Ns(w,{quemados:$,presionados:a}),k=new Map,W=new Map,mo(),Pt.armar(w,Ut(w)),ss()}function ss(){if(!n.length){r={raiz:null,grupos:new Set};return}let l=Ut(w,{presionados:a,conduccion:!0});r={raiz:l,grupos:new Set(n.map(l))}}let os=l=>r.grupos.size>0&&r.grupos.has(r.raiz(l)),po=()=>Math.sin(2*Math.PI*io*(Ct()/1e3))>Li;function mo(){let l=Ut(w),h=(g,v)=>l(g)===l(v),S=new Map;for(let g of w.componentes){if(g.tipo!=="servo")continue;let v=Ft[g.props&&g.props.modelo]?g.props.modelo:"sg90",J=O.get(g.id),xt=J&&J.modelo===v?J:{modelo:v,logico:js(v),subida:null,sumaA:0,picoA:0,msVentana:0};xt.senal=Nt.find(G=>h(g.id+".SIG","placa."+G))||null;let St=h(g.id+".GND","placa.GND1"),$t=Nt.find(G=>h(g.id+".VCC","placa."+G));xt.fuente=h(g.id+".VCC","placa.5V")?"5V":h(g.id+".VCC","placa.3V3")?"3V3":$t||null,xt.conectado=St&&(xt.fuente==="5V"||xt.fuente==="3V3"),$t&&St&&Dt({tipo:"servo_alimentacion",componente:g.id,mensaje:`El servo ${g.id} toma la corriente del pin ${$t.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ft[v].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),S.set(g.id,xt)}O=S}function go(l){for(let h of O.values())!h.senal||!(h.senal in l)||(l[h.senal]===ft.High?h.subida=f.ciclos:h.subida!==null&&(h.conectado&&!Z&&h.logico.pulso((f.ciclos-h.subida)/lt*1e6),h.subida=null))}let is=l=>!l.conectado||Z?0:l.fuente==="5V"?ot:3.3;function as(){Pt.hay&&({i5V:Ie,porVin:Qt}=Pt.cadaMs(f.ciclos,{v5:ot,logica:!Z&&ot>Q.bodV}));for(let g of O.values())g.logico.avanzar(1,is(g));let l=Z?0:Q.placaA+Lt+Ie,h=0;for(let g of O.values())g.conectado&&g.fuente==="5V"&&(h+=g.logico.corriente(1));ot=Z?0:Qt?Q.idealV:s.limiteUSB?Gs(l,h):Q.idealV;let S=l;for(let g of O.values()){let v=g.logico.corriente(is(g));g.sumaA+=v,g.picoA=Math.max(g.picoA,v),g.msVentana++,(g.fuente==="5V"||g.fuente==="3V3")&&(S+=v)}Qt&&(S=0),s.limiteUSB&&(z.avanzar(1,S),!Z&&!tt&&(ot<Q.bodV?tt={motivo:"caida",amperios:S,voltios:ot}:S>Q.limitePuertoA?tt={motivo:"puerto",amperios:S}:z.abierto&&(tt={motivo:"fusible",amperios:S}))),Tt+=S,wt=Math.max(wt,S),jt++}function Co(){let{motivo:l,amperios:h,voltios:S}=tt;tt=null,l==="caida"?Dt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),voltios:Math.round(S*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${S.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):l==="puerto"?Dt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${h.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(Q.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Dt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(h*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),Z=!0),Zt++,ct+=f.ciclos,pe(),Et()}function So(l){let h=lt/1e3,S=l;for(;S>0&&Z;){let g=Math.min(S,h);ct+=g,S-=g,as(),z.abierto||(Z=!1)}S>0&&f.correr(S)}function ns(){let l=Ct();Jt=Jt.filter(([S])=>l-S<1e3),Jt.push([l,wt]);let h={amperios:jt?Tt/jt:0,pico:Math.max(...Jt.map(([,S])=>S)),voltios:ot,fusible:Math.round(z.calor*100)/100,apagada:Z,reinicios:Zt};return Tt=0,wt=0,jt=0,h}function rs(){let l={};for(let[h,S]of O){let g=S.logico.estado();l[h]={modelo:S.modelo,angulo:Math.round(g.angulo*10)/10,pulso:g.pulso===null?null:Math.round(g.pulso),senal:S.senal,fuente:S.fuente,moviendo:g.moviendo,i:S.msVentana?S.sumaA/S.msVentana:S.logico.corriente(S.voltios),pico:S.picoA},S.sumaA=0,S.picoA=0,S.msVentana=0}return l}function Ro(l,h,S){let g=W.get(l);if(g)return g;let v=P.flotantes(h),J=new Set;be.forEach((G,ut)=>{v.has(G[0])&&J.add(ut)});let xt=new Set,St=[];for(let G of oo){let ut=h[G];if(ut!==ft.Input&&ut!==ft.InputPullUp)continue;if(v.has(G)){xt.add(G),St.push([G,"aire"]);continue}let Rt=S?S.voltajes["placa."+G]:null;typeof Rt=="number"?St.push([G,Rt>=Fi?!0:Rt<=Wi?!1:null]):St.push([G,ut===ft.InputPullUp])}let $t=be.map(G=>{for(let ut of G){let Rt=S?S.voltajes["placa."+ut]:null;if(typeof Rt=="number")return Rt}return null});return g={canales:J,alAire:xt,entradas:St,analogicos:$t,refsAlAire:P.refsAlAire(h)},W.set(l,g),g}function Te(l,h){It[l]!==h&&(It[l]=h,f.ponerEntrada(l,h))}function Et(){if(!P||!f)return;let l=et.get(x)||f.estados(),h=ls(x),S=Ro(x,l,h);d=S.alAire;for(let[g,v]of S.entradas){if(v==="aire"){g in A||(A[g]=i()<.5),Te(g,s.entradaFlotante?A[g]:!1);continue}let J=v===null?!!E[g]:v;E[g]=J,Te(g,J)}R=S.canales,h&&S.analogicos!==nt&&(S.analogicos.forEach((g,v)=>{g!==null&&(!nt||nt[v]!==g)&&f.ponerAnalogico(v,g)}),nt=S.analogicos),u=S.refsAlAire}function Ao(){if(!(!s.entradaFlotante||!d.size))for(let l of d){let h=os("placa."+l)?po():i()<Ni?!A[l]:A[l];h!==A[l]&&(A[l]=h,Te(l,h))}}function bo(l,h){if(R.has(l)){if(!s.entradaFlotante)return 0;if(os("placa."+be[l][0]))return 2.5+2.5*Math.sin(2*Math.PI*io*(Ct()/1e3));let S=p.has(l)?p.get(l):1+3*i(),g=Math.max(0,Math.min(5,S+cs()*Hi));return p.set(l,g),g}return s.ruidoADC?h+cs()*ji:h}function cs(){return Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i())}function Dt(l){let h=l.tipo+"|"+l.componente;return D.has(h)?!1:(D.add(h),C.push(l),_.push(l),!0)}function ls(l){for(let h=0;h<4;h++){let S=k.get(l);if(S)return S;P.ponerPines(et.get(l));let g=null;try{g=P.resolver()}catch{g=null}if(Y++,!g||!g.convergio)return Dt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;k.set(l,g);let v=!1;for(let J of[...P.fallasFijas,...Ls(g,s)])Dt(J)&&J.tipo==="led_quemado"&&($.add(J.componente),v=!0);if(!v)return g;Yt()}return k.get(l)||null}function Io(){if(Z)return To();es();let l=m;if(y&&y.ciclo>c.inicio){l=y.tiempos;let H=new Map;for(let[X,Mt]of m){let hs=Mt-(y.tiempos.get(X)||0);hs>0&&H.set(X,hs)}m=H,c={inicio:y.ciclo,clave:c.clave}}else m=new Map,c={inicio:f.ciclos,clave:x};y=null;let h=[...l].filter(([,H])=>H>0);h.length||(h=M.length?M:[[x,1]]),M=h;let S=h.reduce((H,[,X])=>H+X,0),g=[];for(let[H,X]of h){let Mt=ls(H);if(!Mt){g.length=0;break}g.push([Mt,X/S])}let v=g.length?Ki(g):null,J=new Set(Nt.filter(H=>H in N&&f.ciclos-N[H]<ao/1e3*lt));v&&(v.pwm=qi(h,S,J)),yo(v),nt=null;let St=f.ciclos-B>ao/1e3*lt?1:1-Math.exp(-(S/lt*1e3)/Gi);b=v?Je(v,b,St):null;let $t=f.estados(),G=T.length?L.decode(Uint8Array.from(T),{stream:!0}):"";T=[];let ut=rs(),Rt=ns(),ds=Pt.foto(Ct());if(Lt=b?b.fuentes.reduce((H,X)=>H+Math.max(0,X.i),0):0,b){b.usb=Rt,b.servos=Object.entries(ut).map(([X,Mt])=>({id:X,...Mt}));let H=(b.fuentes.find(X=>X.pin==="5V")||{i:0}).i;b.consumo5V=H+b.servos.filter(X=>X.fuente==="5V").reduce((X,Mt)=>X+Mt.i,0),Object.assign(b,ds.lista,{porVin:Qt})}let Eo=_;return _=[],{msSimulados:Ct(),servos:ut,piezas:ds.piezas,evaluaciones:Y,leds:Object.fromEntries((b?b.leds:[]).map(H=>[H.id,H.brillo])),quemados:[...$],voltajes:wo(),entradas:Mo(),placa:{led13:$t.D13===ft.High,ledTX:Ct()<rt},serial:G,fallas:Eo,medicion:b,energia:Rt}}function To(){let l=_;return _=[],{msSimulados:Ct(),evaluaciones:Y,servos:rs(),piezas:Pt.foto(Ct()).piezas,energia:ns(),leds:{},quemados:[...$],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:l,medicion:null}}function wo(){if(!b)return{};if(!u.size)return b.voltajes;let l={...b.voltajes};for(let h of u)h in l&&(l[h]=null);return l}function Mo(){let l={};for(let h of oo)d.has(h)?l[h]={alto:!!s.entradaFlotante&&!!A[h],alAire:!0}:h in E&&(l[h]={alto:E[h],alAire:!1});return l}function yo(l=b){l&&be.forEach((h,S)=>{for(let g of h){let v=l.voltajes["placa."+g];if(typeof v=="number")return f.ponerAnalogico(S,v)}})}function Po(){$.clear(),D.clear(),C.length=0,_=[],T=[],L=new TextDecoder("utf-8"),rt=0,fs(),pe(),Yt(),Et()}function fs(){ct=0,Z=!1,tt=null,Jt=[],z.reiniciar(),ot=Q.idealV,Ie=0,Qt=!1}return pe(),Yt(),Et(),{get ciclos(){return ct+f.ciclos},avanzar(l){if(Z)return So(l);f.correr(l),tt&&Co()},foto:Io,ponerCircuito(l){w=l,Yt(),Et()},ponerMano(l){n=Array.isArray(l)?l.filter(h=>typeof h=="string"):[],ss()},ponerPulsador(l,h){h?a.add(l):a.delete(l),Yt(),Et()},enviarSerial:l=>f.enviarSerial(String(l)),reiniciarChip(){fs(),pe(),Et()},reiniciarTodo(){Zt=0,Po()},fallas:()=>[...C]}}function qi(t,e,s=new Set){let o={},i=new Set;for(let[r,d]of t)for(let R=0;R<Nt.length;R++){let u=Math.floor(r/4**R)%4===ft.High;o[R]=(o[R]||0)+(u?d:0),i.add(R)}let a=Nt,n={};for(let r of i){let d=o[r]/e;(d>0&&d<1||s.has(a[r]))&&(n[a[r]]=Math.round(d*1e3)/1e3)}return n}var Nt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],no=Object.fromEntries(Nt.map((t,e)=>[t,4**e]));function Ki(t){if(t.length===1)return t[0][0];let e=t[0][0],s=n=>n.reduce((r,[,d])=>r+d,0),o=n=>{let r=0;for(let[d,R]of t){let u=n(d);if(u==null)return null;r+=R*u}return r},i=(n,r,d)=>[...new Set(t.flatMap(([u])=>u[n].map(A=>A[r])))].map(u=>{let A={[r]:u},p=t.filter(([f])=>f[n].some(w=>w[r]===u)),E=s(p);for(let f of d)f==="i"?A.i=t.reduce((w,[P,k])=>w+k*((P[n].find(W=>W[r]===u)||{i:0}).i||0),0):A[f]=E?p.reduce((w,[P,k])=>w+k*(P[n].find(W=>W[r]===u)[f]||0),0)/E:null;return A}),a={};for(let n of Object.keys(e.voltajes))a[n]=o(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:a,leds:e.leds.map((n,r)=>{let d=o(R=>R.leds[r]?R.leds[r].i:0);return{id:n.id,quemado:t.some(([R])=>R.leds[r]&&R.leds[r].quemado),v:o(R=>R.leds[r]?R.leds[r].v:null),i:d,brillo:Math.max(0,Math.min(1,d*1e3/st.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:o(d=>d.resistencias[r].v),i:o(d=>d.resistencias[r].i),w:o(d=>d.resistencias[r].w)})),pines:i("pines","pin",["v","i"]),fuentes:i("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:o(d=>d.potenciometros[r].v),i:o(d=>d.potenciometros[r].i)}))}}function Je(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let o=a=>a&&typeof a=="object"?a.id||a.pin:void 0,i=new Map((Array.isArray(e)?e:[]).map(a=>[o(a),a]));return t.map((a,n)=>Je(a,o(a)!==void 0?i.get(o(a)):(e||[])[n],s))}if(t&&typeof t=="object"){let o={};for(let i of Object.keys(t))o[i]=Je(t[i],e&&typeof e=="object"?e[i]:void 0,s);return o}return t}function zi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Xi=16,Zi=8,Ji=50,Qi=500,he=lt/1e3,at=null,xe=!1,co=0,yt=0,Qe=0,lo=0,ts=0,Ye=!1,Xt=[],fo=new MessageChannel;fo.port1.onmessage=ho;function ho(){Ye=!1,ta()}function xo(t){Ye||(Ye=!0,t>0?setTimeout(ho,t):fo.port2.postMessage(null))}function Yi(t){for(;Xt.length&&t-Xt[0][0]>Qi;)Xt.shift();let e=0,s=0;for(let[,o,i]of Xt)e+=o,s+=i;return e>0?Math.min(1,s/(e*he)):1}function ue(t=performance.now()){lo=t;let e=at.foto();self.postMessage({tipo:"foto",corrida:co,...e,velocidad:Yi(t),msReales:ts})}function ta(){if(!xe||!at)return;let t=performance.now(),e=Math.max(0,t-Qe);Qe=t,ts+=e,yt=Math.min(yt+e*he,Ji*he);let s=performance.now(),o=0;for(;yt>=1&&performance.now()-s<Zi;){let i=at.ciclos;at.avanzar(Math.min(Math.floor(yt),he));let a=at.ciclos-i;yt-=a,o+=a}Xt.push([t,e,o]),t-lo>=Xi&&ue(t),xo(yt>=he?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(co=e.corrida),e.tipo){case"crear":at=ro({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(at.reiniciarTodo(),ts=0),xe=!0,yt=0,Qe=performance.now(),Xt.length=0,ue(),xo(0);break;case"pausar":xe=!1;break;case"reiniciar":at.reiniciarChip(),yt=0,ue();break;case"detener":xe=!1;break;case"circuito":at.ponerCircuito(e.circuito),e.mostrar&&ue();break;case"serial":at.enviarSerial(e.texto);break;case"pulsador":at.ponerPulsador(e.id,e.presionado),xe||ue();break;case"mano":at.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function lr(t={}){let{lienzo:e,hex:o}=t,s=t.placa||"uno";if(s!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");cr(o);let i=t.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(Vn.map(P=>[P,i==="realista"]));Object.assign(c,t.noIdealidades||{});let n=typeof t.alEvento=="function"?t.alEvento:null,p={serial:[],falla:[],estado:[]},d="detenido",u=!0,x=0,g=null,C=0,A={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},b=null,E=0,M=[],I=Nn(K);I.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:c});function K(P){if(!u)return;if(P.tipo==="error")return console.error("TecnoCircuito:",P.mensaje);if(P.tipo!=="foto"||P.corrida!==x||d==="detenido")return;Object.assign(A,{msSimulados:P.msSimulados,msReales:P.msReales,velocidad:P.velocidad,evaluaciones:P.evaluaciones}),b=P.medicion?{...P.medicion,voltajes:P.voltajes,entradas:P.entradas}:null;for(let ht of P.fallas){M.push(ht),p.falla.forEach(kt=>jt(kt,{tipo:ht.tipo,componente:ht.componente,mensaje:ht.mensaje}));let{mensaje:lo,...xe}=ht;bt("falla",xe)}let ct=P.energia?P.energia.reinicios:0;ct>E&&bt("reinicio_placa",{motivo:"energia_usb",nuevos:ct-E,total:ct}),E=ct,P.serial&&p.serial.forEach(ht=>jt(ht,P.serial)),g=P,C||(C=requestAnimationFrame(D))}function D(){if(C=0,d==="detenido"||!g)return e._mostrar({simulando:d!=="detenido"});e._mostrar({simulando:!0,leds:g.leds,quemados:g.quemados,voltajes:g.voltajes,servos:g.servos||{},piezas:g.piezas||{},placa:{ledPower:g.placa.encendida!==!1,led13:g.placa.led13,ledTX:g.placa.ledTX}})}function jt(P,ct){try{P(ct)}catch(ht){console.error(ht)}}function bt(P,ct){n&&jt(n,{t:Date.now(),origen:"simulador",tipo:P,datos:ct})}function Wt(P){d=P,p.estado.forEach(ct=>jt(ct,P))}return typeof e._alAcercar=="function"&&e._alAcercar(P=>{u&&I.enviar({tipo:"mano",refs:P})}),typeof e._alPulsar=="function"&&e._alPulsar((P,ct)=>{u&&I.enviar({tipo:"pulsador",id:P,presionado:ct})}),e.alCambiar(P=>{u&&I.enviar({tipo:"circuito",circuito:P,mostrar:d!=="detenido",corrida:x})}),{iniciar(){if(!u||d==="corriendo")return;let P=d==="detenido";x++,P&&(M.length=0,b=null,g=null,E=0,Object.assign(A,{msSimulados:0,msReales:0,velocidad:1}),bt("simulacion_iniciada",{placa:s,modo:i})),Wt("corriendo"),I.enviar({tipo:"iniciar",nuevo:P,corrida:x})},pausar(){d==="corriendo"&&(x++,I.enviar({tipo:"pausar",corrida:x}),Wt("pausado"))},reiniciar(){!u||d==="detenido"||(x++,A.msSimulados=0,I.enviar({tipo:"reiniciar",corrida:x}),I.enviar({tipo:"iniciar",nuevo:!1,corrida:x}),E=0,bt("reinicio_placa",{motivo:"boton"}),Wt("reiniciado"),Wt("corriendo"))},detener(){d!=="detenido"&&(x++,I.enviar({tipo:"detener",corrida:x}),bt("simulacion_detenida",{ms_simulados:Math.round(A.msSimulados)}),Wt("detenido"),b=null,D())},serialEnviar(P){d!=="detenido"&&I.enviar({tipo:"serial",texto:String(P)})},alSerial:P=>typeof P=="function"&&p.serial.push(P),alFalla:P=>typeof P=="function"&&p.falla.push(P),alEstado:P=>typeof P=="function"&&p.estado.push(P),medidas:()=>({...A,estado:d,hilo:I.hilo()}),destruir(){u&&(this.detener(),u=!1,cancelAnimationFrame(C),I.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>d==="detenido"||!b?null:{...b,fallas:[...M],modo:i,activas:c},_mediciones(){return this.mediciones()}}}function Nn(t){let e=null,o="worker",s=!1,i=[],c=p=>{if(p&&p.tipo==="listo"){s=!0,i.length=0;return}t(p)};function n(){o="pagina",e=Ln(c),i.splice(0).forEach(p=>e.postMessage(p))}try{if(!es||typeof Worker!="function")throw new Error("sin Worker");let p=URL.createObjectURL(new Blob([es],{type:"text/javascript"})),d=new Worker(p);d.onmessage=u=>{u.data&&u.data.tipo==="listo"&&URL.revokeObjectURL(p),c(u.data)},d.onerror=u=>{if(s)return console.error("TecnoCircuito:",u.message);u.preventDefault(),d.terminate(),n()},e=d}catch{n()}return{enviar(p){!s&&o==="worker"&&i.push(p),e.postMessage(p)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function Ln(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",es)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var Ie=(t,e)=>t.toFixed(e).replace(".",","),Mt=t=>t==null?"al aire":Ie(t,2)+" V",It=t=>Ie(t*1e3,Math.abs(t)<.01?2:1)+" mA",dr=(t,e)=>(t>=1e3?Ie(t/1e3,e)+" k":t+" ")+"\u03A9",fr=t=>"Pin "+t.replace(/^D/,"");function pr(t){if(!t||!t.leds)return[];let e=(d,u,x,g)=>({pieza:d,voltaje:u||"",corriente:x||"",detalle:g||""}),o=d=>{let u=t.entradas&&t.entradas[d];return u?u.alAire?`al aire: lee ${u.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:u.alto?"lee ALTO":"lee BAJO":""},s=new Set(t.pines.map(d=>d.pin)),i=t.servos||[],c=d=>i.find(u=>u.senal===d&&u.pulso),n=d=>{let u=c(d.pin);if(u)return`se\xF1al de servo: pulso de ${u.pulso} \xB5s`;let x=t.pwm&&t.pwm[d.pin];return x>.005&&x<.995?`PWM ${Math.round(x*100)} %`:o(d.pin)},p=t.usb;return[...t.pines.map(d=>e(fr(d.pin),Mt(d.v),It(d.i),n(d))),...Object.keys(t.entradas||{}).filter(d=>!s.has(d)&&"placa."+d in t.voltajes).map(d=>e(fr(d)+" (entrada)",Mt(t.voltajes["placa."+d]),"",o(d))),...(t.potenciometros||[]).map(d=>e(`${d.id} (${dr(d.ohmios,0)})`,Mt(d.v),It(d.i),`perilla ${Math.round(d.posicion*100)} %`)),...t.resistencias.map(d=>e(`${d.id} (${dr(d.ohmios,1)})`,Mt(d.v),It(d.i),Ie(d.w*1e3,1)+" mW")),...t.leds.map(d=>e(d.id,Mt(d.v),It(d.i),d.quemado?"quemado":`brillo ${Math.round(d.brillo*100)} %`)),...i.map(d=>e(`${d.id} (${d.modelo.toUpperCase()})`,"",It(d.i),d.fuente?d.senal?`${Math.round(d.angulo)}\xB0${d.moviendo?", movi\xE9ndose":""}${d.pulso?` \xB7 pulso ${d.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,Mt(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(d=>{let u=Math.abs(d.velocidad),x=Math.sign(d.velocidad)*(d.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${d.id} (${d.canal||"sin shield"})`,Mt(d.voltios),It(d.i),Math.abs(d.rpm)<1?"quieto":`${Math.round(Math.abs(d.rpm))} RPM \xB7 ${x} ${Math.round(u)} cm/s`)}),...(t.baterias||[]).map(d=>{let u=d.celdas||[d.voltios/2,d.voltios/2];return e(`${d.id} (LiPo 2S)`,Mt(d.voltios),d.conectada?It(d.i):"",`celdas ${u.map(x=>Ie(x,2)).join(" y ")} V${Math.min(...u)<3.3?" \xB7 c\xE1rgala":""}${d.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(d=>e(`${d.id} (probador)`,d.encendido?Mt(d.total):"","",d.encendido?`${d.celdas.length}S \xB7 ${d.celdas.map((u,x)=>`${x+1}: ${Ie(u,2)} V`).join(" \xB7 ")}${d.alarma?" \xB7 \xA1pita!":""}`:"apagado: con\xE9ctalo al cable de balance")),...i.length?[e("5V de la placa (USB)","",It(t.consumo5V),"el USB da hasta 500 mA")]:[],...p&&(i.length||p.reinicios||p.pico>.2)?[e("USB (placa y circuito)",Mt(p.voltios),It(p.amperios),`pico ${It(p.pico)} \xB7 fusible ${Math.round(p.fusible*100)} %${p.reinicios?` \xB7 ${p.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(_e)),crearLienzo:rr,crearSimulador:lr,filasDeMediciones:pr});})();
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
