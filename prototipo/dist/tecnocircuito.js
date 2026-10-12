(()=>{var Qo=globalThis,ta=Qo.ShadowRoot&&(Qo.ShadyCSS===void 0||Qo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Na=Symbol(),Is=new WeakMap,mo=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==Na)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(ta&&e===void 0){let i=o!==void 0&&o.length===1;i&&(e=Is.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Is.set(o,e))}return e}toString(){return this.cssText}},Ds=t=>new mo(typeof t=="string"?t:t+"",void 0,Na),Pt=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((i,s,l)=>i+(p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw Error("Value passed to 'css' function must be a 'css' function result: "+p+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[l+1],t[0]);return new mo(o,t,Na)},Ms=(t,e)=>{if(ta)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let i=document.createElement("style"),s=Qo.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}},Va=ta?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let i of e.cssRules)o+=i.cssText;return Ds(o)})(t):t;var{is:Xn,defineProperty:Kn,getOwnPropertyDescriptor:Jn,getOwnPropertyNames:Yn,getOwnPropertySymbols:Zn,getPrototypeOf:Qn}=Object,ea=globalThis,Os=ea.trustedTypes,tc=Os?Os.emptyScript:"",ec=ea.reactiveElementPolyfillSupport,xo=(t,e)=>t,go={toAttribute(t,e){switch(e){case Boolean:t=t?tc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},oa=(t,e)=>!Xn(t,e),ks={attribute:!0,type:String,converter:go,reflect:!1,useDefault:!1,hasChanged:oa};Symbol.metadata??=Symbol("metadata"),ea.litPropertyMetadata??=new WeakMap;var Xt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=ks){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,o);s!==void 0&&Kn(this.prototype,e,s)}}static getPropertyDescriptor(e,o,i){let{get:s,set:l}=Jn(this.prototype,e)??{get(){return this[o]},set(p){this[o]=p}};return{get:s,set(p){let d=s?.call(this);l?.call(this,p),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ks}static _$Ei(){if(this.hasOwnProperty(xo("elementProperties")))return;let e=Qn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(xo("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(xo("properties"))){let o=this.properties,i=[...Yn(o),...Zn(o)];for(let s of i)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[i,s]of o)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let s=this._$Eu(o,i);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)o.unshift(Va(s))}else e!==void 0&&o.push(Va(e));return o}static _$Eu(e,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ms(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let l=(i.converter?.toAttribute!==void 0?i.converter:go).toAttribute(o,i.type);this._$Em=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(e,o){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let l=i.getPropertyOptions(s),p=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:go;this._$Em=s;let d=p.fromAttribute(o,l.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,o,i,s=!1,l){if(e!==void 0){let p=this.constructor;if(s===!1&&(l=this[e]),i??=p.getPropertyOptions(e),!((i.hasChanged??oa)(l,o)||i.useDefault&&i.reflect&&l===this._$Ej?.get(e)&&!this.hasAttribute(p._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:s,wrapped:l},p){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,p??o??this[e]),l!==!0||p!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,l]of this._$Ep)this[s]=l;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,l]of i){let{wrapped:p}=l,d=this[s];p!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,l,d)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Xt.elementStyles=[],Xt.shadowRootOptions={mode:"open"},Xt[xo("elementProperties")]=new Map,Xt[xo("finalized")]=new Map,ec?.({ReactiveElement:Xt}),(ea.reactiveElementVersions??=[]).push("2.1.2");var Wa=globalThis,Ns=t=>t,aa=Wa.trustedTypes,Vs=aa?aa.createPolicy("lit-html",{createHTML:t=>t}):void 0,zs="$lit$",se=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+se,oc=`<${Ws}>`,Se=document,yo=()=>Se.createComment(""),Co=t=>t===null||typeof t!="object"&&typeof t!="function",Fa=Array.isArray,ac=t=>Fa(t)||typeof t?.[Symbol.iterator]=="function",Ua=`[ 	
\f\r]`,bo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Us=/-->/g,Bs=/>/g,ye=RegExp(`>|${Ua}(?:([^\\s"'>=/]+)(${Ua}*=${Ua}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),js=/'/g,Ls=/"/g,Fs=/^(?:script|style|textarea|title)$/i,Ha=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Ct=Ha(1),Jt=Ha(2),Al=Ha(3),Kt=Symbol.for("lit-noChange"),at=Symbol.for("lit-nothing"),Gs=new WeakMap,Ce=Se.createTreeWalker(Se,129);function Hs(t,e){if(!Fa(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vs!==void 0?Vs.createHTML(e):e}var ic=(t,e)=>{let o=t.length-1,i=[],s,l=e===2?"<svg>":e===3?"<math>":"",p=bo;for(let d=0;d<o;d++){let n=t[d],m,y,b=-1,w=0;for(;w<n.length&&(p.lastIndex=w,y=p.exec(n),y!==null);)w=p.lastIndex,p===bo?y[1]==="!--"?p=Us:y[1]!==void 0?p=Bs:y[2]!==void 0?(Fs.test(y[2])&&(s=RegExp("</"+y[2],"g")),p=ye):y[3]!==void 0&&(p=ye):p===ye?y[0]===">"?(p=s??bo,b=-1):y[1]===void 0?b=-2:(b=p.lastIndex-y[2].length,m=y[1],p=y[3]===void 0?ye:y[3]==='"'?Ls:js):p===Ls||p===js?p=ye:p===Us||p===Bs?p=bo:(p=ye,s=void 0);let T=p===ye&&t[d+1].startsWith("/>")?" ":"";l+=p===bo?n+oc:b>=0?(i.push(m),n.slice(0,b)+zs+n.slice(b)+se+T):n+se+(b===-2?d:T)}return[Hs(t,l+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},So=class t{constructor({strings:e,_$litType$:o},i){let s;this.parts=[];let l=0,p=0,d=e.length-1,n=this.parts,[m,y]=ic(e,o);if(this.el=t.createElement(m,i),Ce.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=Ce.nextNode())!==null&&n.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(zs)){let w=y[p++],T=s.getAttribute(b).split(se),x=/([.?@])?(.*)/.exec(w);n.push({type:1,index:l,name:x[2],strings:T,ctor:x[1]==="."?ja:x[1]==="?"?La:x[1]==="@"?Ga:ze}),s.removeAttribute(b)}else b.startsWith(se)&&(n.push({type:6,index:l}),s.removeAttribute(b));if(Fs.test(s.tagName)){let b=s.textContent.split(se),w=b.length-1;if(w>0){s.textContent=aa?aa.emptyScript:"";for(let T=0;T<w;T++)s.append(b[T],yo()),Ce.nextNode(),n.push({type:2,index:++l});s.append(b[w],yo())}}}else if(s.nodeType===8)if(s.data===Ws)n.push({type:2,index:l});else{let b=-1;for(;(b=s.data.indexOf(se,b+1))!==-1;)n.push({type:7,index:l}),b+=se.length-1}l++}}static createElement(e,o){let i=Se.createElement("template");return i.innerHTML=e,i}};function Ge(t,e,o=t,i){if(e===Kt)return e;let s=i!==void 0?o._$Co?.[i]:o._$Cl,l=Co(e)?void 0:e._$litDirective$;return s?.constructor!==l&&(s?._$AO?.(!1),l===void 0?s=void 0:(s=new l(t),s._$AT(t,o,i)),i!==void 0?(o._$Co??=[])[i]=s:o._$Cl=s),s!==void 0&&(e=Ge(t,s._$AS(t,e.values),s,i)),e}var Ba=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:i}=this._$AD,s=(e?.creationScope??Se).importNode(o,!0);Ce.currentNode=s;let l=Ce.nextNode(),p=0,d=0,n=i[0];for(;n!==void 0;){if(p===n.index){let m;n.type===2?m=new vo(l,l.nextSibling,this,e):n.type===1?m=new n.ctor(l,n.name,n.strings,this,e):n.type===6&&(m=new za(l,this,e)),this._$AV.push(m),n=i[++d]}p!==n?.index&&(l=Ce.nextNode(),p++)}return Ce.currentNode=Se,s}p(e){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}},vo=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,s){this.type=2,this._$AH=at,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Ge(this,e,o),Co(e)?e===at||e==null||e===""?(this._$AH!==at&&this._$AR(),this._$AH=at):e!==this._$AH&&e!==Kt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ac(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==at&&Co(this._$AH)?this._$AA.nextSibling.data=e:this.T(Se.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=So.createElement(Hs(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(o);else{let l=new Ba(s,this),p=l.u(this.options);l.p(o),this.T(p),this._$AH=l}}_$AC(e){let o=Gs.get(e.strings);return o===void 0&&Gs.set(e.strings,o=new So(e)),o}k(e){Fa(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,s=0;for(let l of e)s===o.length?o.push(i=new t(this.O(yo()),this.O(yo()),this,this.options)):i=o[s],i._$AI(l),s++;s<o.length&&(this._$AR(i&&i._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let i=Ns(e).nextSibling;Ns(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ze=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,s,l){this.type=1,this._$AH=at,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=at}_$AI(e,o=this,i,s){let l=this.strings,p=!1;if(l===void 0)e=Ge(this,e,o,0),p=!Co(e)||e!==this._$AH&&e!==Kt,p&&(this._$AH=e);else{let d=e,n,m;for(e=l[0],n=0;n<l.length-1;n++)m=Ge(this,d[i+n],o,n),m===Kt&&(m=this._$AH[n]),p||=!Co(m)||m!==this._$AH[n],m===at?e=at:e!==at&&(e+=(m??"")+l[n+1]),this._$AH[n]=m}p&&!s&&this.j(e)}j(e){e===at?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ja=class extends ze{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===at?void 0:e}},La=class extends ze{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==at)}},Ga=class extends ze{constructor(e,o,i,s,l){super(e,o,i,s,l),this.type=5}_$AI(e,o=this){if((e=Ge(this,e,o,0)??at)===Kt)return;let i=this._$AH,s=e===at&&i!==at||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,l=e!==at&&(i===at||s);s&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},za=class{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ge(this,e)}};var sc=Wa.litHtmlPolyfillSupport;sc?.(So,vo),(Wa.litHtmlVersions??=[]).push("3.3.3");var qs=(t,e,o)=>{let i=o?.renderBefore??e,s=i._$litPart$;if(s===void 0){let l=o?.renderBefore??null;i._$litPart$=s=new vo(e.insertBefore(yo(),l),l,void 0,o??{})}return s._$AI(t),s};var qa=globalThis,ct=class extends Xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=qs(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Kt}};ct._$litElement$=!0,ct.finalized=!0,qa.litElementHydrateSupport?.({LitElement:ct});var rc=qa.litElementPolyfillSupport;rc?.({LitElement:ct});(qa.litElementVersions??=[]).push("4.2.2");var Lt=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var nc={attribute:!0,type:String,converter:go,reflect:!1,hasChanged:oa},cc=(t=nc,e,o)=>{let{kind:i,metadata:s}=o,l=globalThis.litPropertyMetadata.get(s);if(l===void 0&&globalThis.litPropertyMetadata.set(s,l=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),l.set(o.name,t),i==="accessor"){let{name:p}=o;return{set(d){let n=e.get.call(this);e.set.call(this,d),this.requestUpdate(p,n,t,!0,d)},init(d){return d!==void 0&&this.C(p,void 0,t,d),d}}}if(i==="setter"){let{name:p}=o;return function(d){let n=this[p];e.call(this,d),this.requestUpdate(p,n,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function z(t){return(e,o)=>typeof o=="object"?cc(t,e,o):((i,s,l)=>{let p=s.hasOwnProperty(l);return s.constructor.createProperty(l,i),p?Object.getOwnPropertyDescriptor(s,l):void 0})(t,e,o)}var ve=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function Xs(t,e){return(o,i,s)=>{let l=p=>p.renderRoot?.querySelector(t)??null;if(e){let{get:p,set:d}=typeof i=="object"?o:s??(()=>{let n=Symbol();return{get(){return this[n]},set(m){this[n]=m}}})();return ve(o,i,{get(){let n=p.call(this);return n===void 0&&(n=l(this),(n!==null||this.hasUpdated)&&d.call(this,n)),n}})}return ve(o,i,{get(){return l(this)}})}}var Ks=Jt`
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
`;var Tt=t=>({type:"analog",channel:t}),Ao=(t,e=0)=>({type:"i2c",signal:t,bus:e}),_o=(t,e=0)=>({type:"spi",signal:t,bus:e}),Xa=(t,e=0)=>({type:"usart",signal:t,bus:e});var We=[" ","Spacebar"];function lc(){return typeof navigator=="object"?navigator.userAgent:""}function dc(){return lc().indexOf("Macintosh")>=0}function Js(t){return dc()?t.metaKey:t.ctrlKey}var Ae=function(t,e,o,i){var s=arguments.length,l=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(p=t[d])&&(l=(s<3?p(l):s>3?p(e,o,l):p(e,o))||l);return s>3&&l&&Object.defineProperty(e,o,l),l},re=class extends ct{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[Tt(5),Ao("SCL")]},{name:"A4.2",x:97,y:9,signals:[Tt(4),Ao("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[_o("SCK")]},{name:"12",x:134.5,y:9,signals:[_o("MISO")]},{name:"11",x:144,y:9,signals:[_o("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[_o("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[Xa("TX")]},{name:"0",x:255.5,y:9,signals:[Xa("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[Tt(0)]},{name:"A1",x:217.5,y:191.5,signals:[Tt(1)]},{name:"A2",x:227,y:191.5,signals:[Tt(2)]},{name:"A3",x:236.5,y:191.5,signals:[Tt(3)]},{name:"A4",x:246,y:191.5,signals:[Tt(4),Ao("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[Tt(5),Ao("SCL")]}]}static get styles(){return Pt`
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
    `}render(){let{ledPower:e,led13:o,ledRX:i,ledTX:s}=this;return Ct`
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

        ${Ks}

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
          @keydown=${l=>We.includes(l.key)&&this.down()}
          @keyup=${l=>We.includes(l.key)&&this.up()}
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
          ${e&&Jt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&Jt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${s&&Jt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${i&&Jt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};Ae([z()],re.prototype,"led13",void 0);Ae([z()],re.prototype,"ledRX",void 0);Ae([z()],re.prototype,"ledTX",void 0);Ae([z()],re.prototype,"ledPower",void 0);Ae([z()],re.prototype,"resetPressed",void 0);Ae([Xs("#reset-button")],re.prototype,"resetButton",void 0);re=Ae([Lt("wokwi-arduino-uno")],re);var Ys=function(t,e,o,i){var s=arguments.length,l=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(p=t[d])&&(l=(s<3?p(l):s>3?p(e,o,l):p(e,o))||l);return s>3&&l&&Object.defineProperty(e,o,l),l},Ka={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},Ja=class extends ct{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return Pt`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,i=Math.round(e/10**o);return e===0?[0,0]:[Math.round(i%100),o]}render(){let{value:e}=this,o=parseFloat(e),[i,s]=this.breakValue(o),l=Ka[Math.floor(i/10)],p=Ka[i%10],d=Ka[s];return Ct`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${p}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${d}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};Ys([z()],Ja.prototype,"value",void 0);Ja=Ys([Lt("wokwi-resistor")],Ja);var _e=function(t,e,o,i){var s=arguments.length,l=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(p=t[d])&&(l=(s<3?p(l):s>3?p(e,o,l):p(e,o))||l);return s>3&&l&&Object.defineProperty(e,o,l),l},pc={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},ne=class extends ct{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return Pt`
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
    `}update(e){e.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(e)}renderSVG(){let{color:e,lightColor:o,flip:i}=this,s=o||pc[e?.toLowerCase()]||e,l=this.brightness?.3+this.brightness*.7:0,p=this.value&&this.brightness>Number.EPSILON;return Ct`<svg
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
      <g class="light" style="display: ${p?"":"none"}">
        <ellipse
          cx="8"
          cy="10"
          rx="10"
          ry="10"
          fill="${s}"
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
    </svg> `}render(){return Ct`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};_e([z()],ne.prototype,"value",void 0);_e([z()],ne.prototype,"brightness",void 0);_e([z()],ne.prototype,"color",void 0);_e([z()],ne.prototype,"lightColor",void 0);_e([z()],ne.prototype,"label",void 0);_e([z({type:Boolean})],ne.prototype,"flip",void 0);ne=_e([Lt("wokwi-led")],ne);var Zs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qs=t=>(...e)=>({_$litDirective$:t,values:e}),ia=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,i){this._$Ct=e,this._$AM=o,this._$Ci=i}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var tr="important",fc=" !"+tr,er=Qs(class extends ia{constructor(t){if(super(t),t.type!==Zs.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let i=t[o];return i==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?o.removeProperty(i):o[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let l=typeof s=="string"&&s.endsWith(fc);i.includes("-")||l?o.setProperty(i,l?s.slice(0,-11):s,l?tr:""):o[i]=s}}return Kt}});var sa=(t,e,o)=>{let i=Math.min(o,e);return Math.max(i,t)};function or(t,e){let o=e.transformPoint({x:t.left,y:t.top}),i=e.transformPoint({x:t.right,y:t.top}),s=e.transformPoint({x:t.left,y:t.bottom}),l=e.transformPoint({x:t.right,y:t.bottom}),p=Math.min(o.x,i.x,s.x,l.x),d=Math.min(o.y,i.y,s.y,l.y),n=Math.max(o.x,i.x,s.x,l.x),m=Math.max(o.y,i.y,s.y,l.y);return new DOMRect(p,d,n-p,m-d)}function ar(t,e,o){let{userAgent:i}=navigator;if(i.indexOf("Epiphany")>=0||i.indexOf("Safari")>=0){let l=t.getCTM(),p=e?.getCTM(),d=e?.getBoundingClientRect(),n=e?.ownerSVGElement?.getBoundingClientRect();if(!d||!n||!p||!l)return null;let m=n.x+n.width/2,y=n.y+n.height/2,b=m-(d.x+d.width/2),w=y-(d.y+d.height/2),T=Math.atan2(w,b)/Math.PI*180,x=new DOMMatrix().rotate(T),E=or(o,x),k=E.width/d.width,j=E.height/d.height,J=p.inverse().multiply(l);return x.inverse().translate(E.left,E.top).multiply(J.inverse()).scale(k,j).translate(-d.left,-d.top)}else return t.getScreenCTM()?.inverse()||null}var $e=function(t,e,o,i){var s=arguments.length,l=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(p=t[d])&&(l=(s<3?p(l):s>3?p(e,o,l):p(e,o))||l);return s>3&&l&&Object.defineProperty(e,o,l),l},ra={x:9.91,y:8.18},ce=class extends ct{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[Tt(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return Pt`
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
    `}mapToMinMax(e,o,i){return e*(i-o)+o}percentFromMinMax(e,o,i){return(e-o)/(i-o)}renderSVG(){let e=sa(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return Ct`<svg
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
      style=${er({"--knob-angle":o+"deg"})}
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
        cx=${ra.x}
        cy=${ra.y}
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
    </svg>`}render(){return Ct`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?ar(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",i=o?e.touches[0].pageX:e.pageX,s=o?e.touches[0].pageY:e.pageY,l=new DOMPointReadOnly(i,s).matrixTransform(this.pageToKnobMatrix),p=ra.x-l.x,d=ra.y-l.y,n=Math.round(Math.atan2(d,p)*180/Math.PI);n<0&&(n+=360),n-=90,p>0&&d<=0&&n>0&&(n-=360),n=sa(this.startDegree,this.endDegree,n);let m=this.percentFromMinMax(n,this.startDegree,this.endDegree),y=this.mapToMinMax(m,this.min,this.max);this.updateValue(y)}updateValue(e){let o=sa(this.min,this.max,e),i=Math.round(o/this.step)*this.step;this.value=Math.round(i*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};$e([z({type:Number})],ce.prototype,"min",void 0);$e([z({type:Number})],ce.prototype,"max",void 0);$e([z()],ce.prototype,"value",void 0);$e([z()],ce.prototype,"step",void 0);$e([z()],ce.prototype,"startDegree",void 0);$e([z()],ce.prototype,"endDegree",void 0);ce=$e([Lt("wokwi-potentiometer")],ce);var $o=function(t,e,o,i){var s=arguments.length,l=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(t,e,o,i);else for(var d=t.length-1;d>=0;d--)(p=t[d])&&(l=(s<3?p(l):s>3?p(e,o,l):p(e,o))||l);return s>3&&l&&Object.defineProperty(e,o,l),l},Ya,Fe=class extends ct{static{Ya=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Ya.pushbuttonCounter++}static get styles(){return Pt`
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
    `}renderSVG(){let{color:e,uniqueId:o,xray:i}=this,s=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return Ct`<svg
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
      ${i?Jt`
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
    </svg>`}render(){let{color:e,label:o}=this;return Ct`
      <button
        aria-label="${o} ${e} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${i=>We.includes(i.key)&&this.down()}
        @keyup=${i=>We.includes(i.key)&&this.up(i)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(Js(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};$o([z()],Fe.prototype,"color",void 0);$o([z()],Fe.prototype,"pressed",void 0);$o([z()],Fe.prototype,"label",void 0);$o([z({type:Boolean,attribute:"xray"})],Fe.prototype,"xray",void 0);Fe=Ya=$o([Lt("wokwi-pushbutton")],Fe);var ir=`:host {
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
`;var Gt={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var F=9.6/2.54,Q=57.6,na=14.4,sr={x:na,ancho:32.2*F},It={x:na+(32.2-22.2)/2*F,ancho:22.2*F,alto:11.8*F},He={x:It.x+5.9*F,y:Q},Za=13.5*F,qe=182.4,la={ancho:201.6,alto:86.4},ca={GND:{x:qe,y:Q-9.6,color:"#7a4a24"},VCC:{x:qe,y:Q,color:"#d7263d"},SIG:{x:qe,y:Q+9.6,color:"#f28c28"}},V=t=>Math.round(t*100)/100,Qa=t=>`rotate(${V(-t)} ${V(He.x)} ${V(He.y)})`;function ti(t="sg90",e=90){let o=Gt[t]||Gt.sg90,{ancho:i,alto:s}=la,l=Q-It.alto/2,p=V(He.x),d=It.x+It.ancho,n=t==="sg90",m=Object.values(ca).map((w,T)=>{let x=Q-4+T*4;return`<path d="M${V(d)} ${V(x)} C ${V(d+26)} ${V(x)}, ${V(qe-34)} ${V(w.y)}, ${V(qe-9)} ${V(w.y)}" fill="none" stroke="${w.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),y=Object.values(ca).map(w=>`<rect x="${V(w.x-2.2)}" y="${V(w.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),b=n?`<circle cx="${V(It.x+15*F)}" cy="${Q}" r="${V(3.6*F)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${V(It.x+9.5*F)}" cy="${V(Q+2.2*F)}" r="${V(2.2*F)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${s}" viewBox="0 0 ${i} ${s}"><title>Servo ${o.nombre}</title>`+m+`<rect x="${V(qe-9)}" y="${V(Q-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+y+`<rect x="${V(sr.x)}" y="${V(l+1.5)}" width="${V(sr.ancho)}" height="${V(It.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${n?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${V(na+2.4*F)}" cy="${Q}" r="${V(1*F)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${V(na+(32.2-2.4)*F)}" cy="${Q}" r="${V(1*F)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${V(It.x)}" y="${V(l)}" width="${V(It.ancho)}" height="${V(It.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${n?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+b+`<text x="${V(It.x+15.5*F)}" y="${V(Q+4.1*F)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${p}" cy="${Q}" r="${V(5.2*F)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${Qa(e)}"><path d="M${p} ${V(Q-3.2*F/2-1)} L${V(He.x+Za)} ${V(Q-1.1*F)} A ${V(1.1*F)} ${V(1.1*F)} 0 0 1 ${V(He.x+Za)} ${V(Q+1.1*F)} L${p} ${V(Q+3.2*F/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${p}" cy="${Q}" r="${V(3.4*F)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(w=>`<circle cx="${V(He.x+Za*w)}" cy="${Q}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${p}" cy="${Q}" r="${V(1.3*F)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var it=3.779527559055118,wo={ancho:72.58*it,alto:53.34*it},Xe=4*it,ft=5*it,uc=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],Zt=Xe+4.6*it,Qt=wo.ancho-.5-4.6*it,Yt=60,zt=(t,e)=>({x:t,y:Yt+e*ft}),le={M1A:zt(Zt,0),M1B:zt(Zt,1),GND_IZQ:zt(Zt,2),M2A:zt(Zt,3),M2B:zt(Zt,4),M4A:zt(Qt,0),M4B:zt(Qt,1),GND_DER:zt(Qt,2),M3A:zt(Qt,3),M3B:zt(Qt,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+ft,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},nr={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},ai={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},cr=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],D=t=>Math.round(t*100)/100,tt=(t,e,o,{tam:i=6.2,ancla:s="middle",peso:l="bold",color:p="#ffffff",giro:d=0}={})=>`<text x="${D(t)}" y="${D(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="${s}" fill="${p}"${d?` transform="rotate(${d} ${D(t)} ${D(e)})"`:""}>${o}</text>`;function ei(t,e,o,i){let s=19.3*it,l=6.4*it,p=t-s/2,d=e-l/2,n="";for(let m=0;m<8;m++){let y=t-8.89*it+m*2.54*it;n+=`<rect x="${D(y-1.6)}" y="${D(d-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,n+=`<rect x="${D(y-1.6)}" y="${D(d+l-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${D(t)} ${D(e)})">`+n+`<rect x="${D(p)}" y="${D(d)}" width="${D(s)}" height="${D(l)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${D(p)} ${D(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+tt(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+tt(t,e-s/2-3,i,{tam:5.2})}function oi(t,e,o,i=!0){let s=i?5.6*it:o*ft+.6*it,l=i?o*ft+.6*it:5.6*it,p=i?t-s/2:t-ft/2-.3*it,d=i?e-ft/2-.3*it:e-l/2,n="";for(let m=0;m<o;m++){let y=i?t:t+m*ft,b=i?e+m*ft:e;n+=`<circle cx="${D(y)}" cy="${D(b)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,n+=`<line x1="${D(y-4.2)}" y1="${D(b)}" x2="${D(y+4.2)}" y2="${D(b)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${D(p)}" y="${D(d)}" width="${D(s)}" height="${D(l)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+n}var rr=(t,e,o)=>`<circle cx="${D(t)}" cy="${D(e)}" r="${D(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${D(t)} ${D(e-o/2)} a ${D(o/2)} ${D(o/2)} 0 0 1 0 ${D(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${D(t)}" cy="${D(e)}" r="${D(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function ii(t=!0){let{ancho:e,alto:o}=wo,i=uc.map(({y:d,xs:n})=>{let m=n[0]-4.6,y=n[n.length-1]+4.6;return`<rect x="${D(m)}" y="${D(d-4.6)}" width="${D(y-m)}" height="9.2" fill="#151515"/>`+n.map(b=>`<rect x="${D(b-1.6)}" y="${D(d-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),s=["S2","S1"].map(d=>["SIG","POS","GND"].map(n=>{let m=le[`${d}_${n}`];return`<rect x="${D(m.x-4.4)}" y="${D(m.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${D(m.x-1.4)}" y="${D(m.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),l=132,p=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${D(e)}" height="${D(o)}" viewBox="0 0 ${D(e)} ${D(o)}"><title>Shield de motores L293D</title><rect x="${D(Xe)}" y="0.5" width="${D(e-Xe-.5)}" height="${D(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+i+ei(82,86,"L293D","U1")+ei(145,86,"74HC595","U3")+ei(205,86,"L293D","U2")+rr(118,140,6.3*it)+rr(205,140,6.3*it)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${l+20}" cy="${p}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+oi(Zt,Yt,5)+oi(Qt,Yt,5)+oi(le.EXT_POS.x,le.EXT_POS.y,2,!1)+s+`<rect x="${l-9}" y="${p-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${l-6.4}" y="${p-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${l+3.6}" y="${p-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${l-9.6}" y="${p-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${D(Xe+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${D(Xe+15)}" cy="169" r="5" fill="#2b2b2b"/>`+tt(Zt+13,Yt+ft/2+3,"M1",{tam:7})+tt(Zt+13,Yt+3.5*ft+3,"M2",{tam:7})+tt(Zt+12,Yt+2*ft+2.5,"GND",{tam:5})+tt(Qt-13,Yt+ft/2+3,"M4",{tam:7})+tt(Qt-13,Yt+3.5*ft+3,"M3",{tam:7})+tt(Qt-12,Yt+2*ft+2.5,"GND",{tam:5})+tt(le.EXT_POS.x+ft/2,193,"EXT_PWR",{tam:5.6})+tt(le.EXT_POS.x,165,"+M",{tam:5})+tt(le.EXT_GND.x,165,"GND",{tam:5})+tt(l,p-8,"PWR",{tam:5.6})+tt(52,16,"SERVO_2",{tam:5,ancla:"start"})+tt(52,26,"SERVO_1",{tam:5,ancla:"start"})+tt(26,7.4,"S",{tam:4.6})+tt(35.6,7.4,"+",{tam:5})+tt(45.2,7.4,"\u2212",{tam:5})+tt(Xe+15,156,"RESET",{tam:4.6})+tt(196,162,"Motor Shield L293D",{tam:6.4})+tt(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var W=3.779527559055118,ht={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},dr=ht.voltiosRef/(ht.mABloqueado/1e3),pr=ht.rpmSinCarga*ht.reduccion*2*Math.PI/60,fr=ht.mASinCarga/1e3,ni=(ht.voltiosRef-fr*dr)/pr,ed=ni*fr/pr,od=ht.tauMecanicoMs/1e3*ni*ni/dr;var ci=64.2*W,we=22.5*W,si=40*W,li=11.2*W,At=ht.ruedaMM*W/2,mc={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-li,y0:132-we/2}},Ro=t=>mc[t&&t.vista==="rueda"?"rueda":"eje"],hr=t=>{let e=t.y0+we/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function ur(t){let e=Ro(t),o=hr(e);if(t&&t.lado==="derecho")for(let i of["A","B"])o[i]={...o[i],x:e.ancho-o[i].x};return o}var $=t=>Math.round(t*100)/100,ri=(t,e,o,{tam:i=11,color:s="#1f2328",peso:l="bold",marca:p=""}={})=>`<text${p?` ${p}="1"`:""} x="${$(t)}" y="${$(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="middle" fill="${s}">${o}</text>`;function xc(t,e){let o=e+we/2;return`<rect x="${$(t+si-2)}" y="${$(o-9.5*W)}" width="${$(ci-si+2)}" height="${$(19*W)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${$(t+ci-6*W)}" y="${$(o-8*W)}" width="${$(6*W)}" height="${$(16*W)}" rx="4" fill="#2b2b2b"/><rect x="${$(t)}" y="${$(e)}" width="${$(si)}" height="${$(we)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${$(t+31.8*W-8.75*W)}" cy="${$(o)}" r="${$(1.5*W)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${$(t+31.8*W+8.75*W-6)}" cy="${$(o)}" r="${$(1.5*W)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function gc(t){let e=hr(t),o=t.x0+ci,i=t.y0+we/2;return["A","B"].map((s,l)=>{let p=i+(l?3:-3);return`<path d="M${$(o)} ${$(p)} C ${$(o+20)} ${$(p)}, ${$(e[s].x-22)} ${$(e[s].y)}, ${$(e[s].x-6)} ${$(e[s].y)}" fill="none" stroke="${e[s].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${$(e[s].x-4.2)}" y="${$(e[s].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function bc(t,e){let o=2.7*W;return`<circle cx="${$(t)}" cy="${$(e)}" r="${$(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${$(t)} ${$(e)})"><path d="M${$(t-o)} ${$(e-1.8*W)} H${$(t+o)} V${$(e+1.8*W)} H${$(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${$(t)}" cy="${$(e)}" r="${$(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function yc(t,e){let o=[0,72,144,216,288].map(s=>`<rect x="${$(t-12)}" y="${$(e-At*.72)}" width="24" height="${$(At*.72)}" rx="6" fill="#f2c318" transform="rotate(${s} ${$(t)} ${$(e)})"/>`).join(""),i=Array.from({length:24},(s,l)=>`<rect x="${$(t-3)}" y="${$(e-At-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${l*15} ${$(t)} ${$(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${$(t)} ${$(e)})"><circle cx="${$(t)}" cy="${$(e)}" r="${$(At*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${$(At*.24)}"/>`+i+`<circle cx="${$(t)}" cy="${$(e)}" r="${$(At*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${$(t)}" cy="${$(e)}" r="${$(7*W)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${$(t-2.7*W)}" y="${$(e-1.8*W)}" width="${$(5.4*W)}" height="${$(3.6*W)}" fill="#7a5d00"/></g>`}function mr(t={}){let e=Ro(t),o=t.lado==="derecho",i=e.x0+li,s=e.y0+we/2,l=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",p=o?e.ancho-i:i,d=xc(e.x0,e.y0)+gc(e),n=o?e.ancho-(e.x0+26*W):e.x0+26*W,m=ri(n,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(d+=yc(i,s),m+=`<line x1="${$(p-At-10)}" y1="${$(s+At+2)}" x2="${$(p+At+10)}" y2="${$(s+At+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${$(p)} ${$(s+At+20)})"></g>`+ri(p,s+At+46,"quieto",{tam:13,marca:"data-velocidad"})):(d+=bc(i,s),m+=ri(p,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${l}>${d}</g>${m}</svg>`}var lr=new WeakMap;function xr(t,e,o){let i=Ro(e),s=i.x0+li,l=i.y0+we/2,p=o||{rpm:0,giro:0,velocidad:0},d=t.querySelector("[data-eje],[data-rueda]");d&&d.setAttribute("transform",`rotate(${$(-p.giro)} ${$(s)} ${$(l)})`);let n=t.querySelector("[data-rpm]"),m=lr.get(t)||{},y=p.rpm>0!=(e.lado==="derecho");if(n){let T=Math.abs(p.rpm)<1?"0 RPM":`${Math.round(Math.abs(p.rpm))} RPM ${y?"\u27F2":"\u27F3"}`;T!==m.rpm&&(n.textContent=m.rpm=T)}let b=t.querySelector("[data-velocidad]"),w=t.querySelector("[data-flecha]");if(b&&w){let T=Math.sign(p.velocidad)*(e.lado==="derecho"?-1:1),x=Math.abs(p.velocidad),E=x<.5,k=E?"quieto":`${T>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(x)} cm/s`;k!==m.vel&&(b.textContent=m.vel=k);let j=E?0:y?-1:1,J=`${j}|${T}`;J!==m.flecha&&(m.flecha=J,w.innerHTML=E?"":`<path d="M${-40*j} -5 H${22*j} V-12 L${40*j} 0 L${22*j} 12 V5 H${-40*j} Z" fill="${T>0?"#2e9e44":"#d7263d"}"/>`)}lr.set(t,m)}var gr=3.779527559055118,$t={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Ye={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var To=360,di=150,de=10,_t=10,pe=72*gr,Eo=34*gr,pi={ancho:To,alto:di},fe=de+pe+58,Je=_t+Eo-34,Po={POS:{x:To-12,y:_t+30,color:"#d7263d"},NEG:{x:To-12,y:_t+39.6,color:"#2b2b2b"},BAL0:{x:fe,y:Je,color:"#2b2b2b"},BAL1:{x:fe,y:Je+9.6,color:"#e05a5a"},BAL2:{x:fe,y:Je+19.2,color:"#d7263d"}},L=t=>Math.round(t*100)/100,Ke=(t,e,o,{tam:i=11,color:s="#ffffff",peso:l="bold",ancla:p="middle",marca:d=""}={})=>`<text${d?` ${d}="1"`:""} x="${L(t)}" y="${L(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="${p}" fill="${s}">${o}</text>`;function fi(t="nominal"){let e=$t[t]||$t.nominal,o=de+pe,i=["POS","NEG"].map((l,p)=>{let d=Po[l],n=_t+24+p*10;return`<path d="M${L(o)} ${L(n)} C ${L(o+26)} ${L(n)}, ${L(d.x-26)} ${L(d.y)}, ${L(d.x-6)} ${L(d.y)}" fill="none" stroke="${d.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${L(d.x-4.4)}" y="${L(d.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),s=["BAL0","BAL1","BAL2"].map((l,p)=>{let d=Po[l],n=_t+Eo-40+p*4;return`<path d="M${L(o)} ${L(n)} C ${L(o+18)} ${L(n)}, ${L(d.x-30)} ${L(d.y)}, ${L(d.x-7)} ${L(d.y)}" fill="none" stroke="${d.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${L(fe-7)}" y="${L(Je-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(l=>`<rect x="${L(fe-2.4)}" y="${L(Po[l].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+Ke(fe-14,Je+2.5,"\u2212",{tam:8,color:"#5a6673"})+Ke(fe-14,Je+21.7,"+",{tam:8,color:"#5a6673"})+Ke(fe,_t+Eo+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${To}" height="${di}" viewBox="0 0 ${To} ${di}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+i+s+`<rect x="${de}" y="${_t}" width="${L(pe)}" height="${L(Eo)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${de+14}" y="${_t+12}" width="${L(pe-28)}" height="${L(Eo-24)}" rx="4" fill="#3f4752"/>`+Ke(de+pe/2,_t+36,"LiPo 2S \xB7 7,4 V",{tam:15})+Ke(de+pe/2,_t+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(l=>`<rect x="${L(de+pe/2-33+l*23)}" y="${_t+66}" width="20" height="12" rx="2" fill="${l<e.barras?e.color:"#5a6370"}"/>`).join("")+Ke(de+pe/2,_t+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function br(t,e,o){let i=t.querySelector("[data-voltios]");if(!i)return;let s=$t[e]||$t.nominal,l=o&&typeof o.voltios=="number"?o.voltios:s.voltios;i.textContent=`${l.toFixed(2).replace(".",",")} V \xB7 ${s.nombre}`}var ue={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},he=210,ui=140,xi={ancho:he,alto:ui},Ar=9.6,_r=82,Cc=132,gi=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:_r+e*Ar,y:Cc}])),lt=t=>Math.round(t*100)/100,hi=(t,e,o,{tam:i=7,color:s="#5a6673",peso:l="bold",marca:p=""}={})=>`<text${p} x="${lt(t)}" y="${lt(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${l}" text-anchor="middle" fill="${s}">${o}</text>`,mi={ancho:24,alto:46,grueso:5},Sc=[76,112,148],yr=34,Cr="#ff3b30",da="#3a1414";function vc(t,e){let{ancho:o,alto:i,grueso:s}=mi,l=i/2,p=(d,n,m,y)=>({x:t+d,y:e+n,w:m,h:y});return{a:p(s/2,0,o-s,s),b:p(o-s,s/2,s,l-s),c:p(o-s,l+s/2,s,l-s),d:p(s/2,i-s,o-s,s),e:p(0,l+s/2,s,l-s),f:p(0,s/2,s,l-s),g:p(s/2,l-s/2,o-s,s)}}var Ac={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function $r(t=ue.umbralV){let e=Sc.map((s,l)=>{let p=vc(s,yr);return Object.entries(p).map(([d,n])=>`<rect data-seg="${l}${d}" x="${lt(n.x)}" y="${lt(n.y)}" width="${lt(n.w)}" height="${lt(n.h)}" rx="2" fill="${da}"/>`).join("")+`<circle data-seg="${l}p" cx="${lt(s+mi.ancho+5)}" cy="${lt(yr+mi.alto-2)}" r="2.8" fill="${da}"/>`}).join(""),o=Object.entries(gi).map(([s,l],p)=>`<rect x="${lt(l.x-1.2)}" y="122" width="2.4" height="${lt(l.y-120)}" fill="#c9ccd1"/>`+hi(l.x,108,p===0?"\u2212":String(p),{tam:p===0?8:6.5})).join(""),i=[0,1].map(s=>{let l=38+s*44;return`<path d="M${lt(8)} ${lt(l-10)} q -6 10 0 20 M${lt(3)} ${lt(l-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${he}" height="${ui}" viewBox="0 0 ${he} ${ui}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${he-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${he-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(s=>`<circle cx="38" cy="${s}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${s}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${i}</g><rect x="66" y="22" width="${he-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${lt(_r-6)}" y="114" width="${lt(8*Ar+12)}" height="9" fill="#151515"/>`+o+hi(he/2+30,18,"1-8S",{tam:6.5})+hi(he/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function Sr(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,i]=e.split(".");return(o+i).slice(0,3).split("").map((l,p)=>({c:l,punto:p===o.length-1}))}var vr=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function _c(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[Sr(t.total),vr(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((i,s)=>o.push(vr(`-${s+1}-`),Sr(i))),o[Math.floor(e/ue.pasoMs)%o.length]}function bi(t,e,o){let i=t.querySelector("[data-umbral]"),s=e&&typeof e.umbral=="number"?e.umbral:ue.umbralV;if(i){let y=`alarma ${s?String(s).replace(".",",")+" V":"apagada"}`;i.textContent!==y&&(i.textContent=y)}let l=o&&o.ms||0,d=o&&o.alarma&&Math.floor(l/125)%2===1?null:_c(o,l);for(let y=0;y<3;y++){let b=d?d[y]:null,w=b&&Ac[b.c]||"";for(let E of"abcdefg"){let k=t.querySelector(`[data-seg="${y}${E}"]`),j=w.includes(E)?Cr:da;k&&k.getAttribute("fill")!==j&&k.setAttribute("fill",j)}let T=t.querySelector(`[data-seg="${y}p"]`),x=b&&b.punto?Cr:da;T&&T.getAttribute("fill")!==x&&T.setAttribute("fill",x)}let n=t.querySelector("[data-pitido]"),m=o&&o.alarma&&Math.floor(l/250)%2===0?"visible":"hidden";n&&n.getAttribute("visibility")!==m&&n.setAttribute("visibility",m)}var Qe=3.779527559055118,pa=9.6,te={ancho:58*Qe,alto:54*Qe},K={x:(te.ancho-45*Qe)/2,y:(te.alto-18*Qe)/2,ancho:45*Qe,alto:18*Qe},$c=(te.ancho-14*pa)/2,wr=(te.alto-6*pa)/2,wc=wr+6*pa,Rr=[{y:wr,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:wc,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],yi=Object.fromEntries(Rr.flatMap(({y:t,nombres:e})=>e.map((o,i)=>[o,{x:$c+i*pa,y:t}]))),M=t=>Math.round(t*100)/100,Ze=(t,e,o,i=5,s="#f5f9ff")=>`<text x="${M(t)}" y="${M(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" text-anchor="middle" fill="${s}">${o}</text>`,Er={PWR:{apagado:"#19472b",encendido:"#45e76e"},L:{apagado:"#65501d",encendido:"#ffcf40"},RX:{apagado:"#644022",encendido:"#ff9e39"},TX:{apagado:"#644022",encendido:"#ff9e39"}};function Rc(t,e,o){let i="";for(let s=0;s<8;s++){let l=2.5+s*(o-5)/7;i+=`<rect x="${M(t+l-.65)}" y="${M(e-2.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${M(t+l-.65)}" y="${M(e+o-.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${M(t-2.2)}" y="${M(e+l-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`,i+=`<rect x="${M(t+o-.2)}" y="${M(e+l-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`}return i+`<rect x="${M(t)}" y="${M(e)}" width="${M(o)}" height="${M(o)}" rx="1.2" fill="#25282c" stroke="#101214" stroke-width="0.6"/><circle cx="${M(t+2.8)}" cy="${M(e+2.8)}" r="1" fill="#7e848a"/>`}function Pr(t={}){let{ancho:e,alto:o}=te,i=o/2,s=["PWR","L","RX","TX"].map((p,d)=>{let n=K.x+37+d*10.6;return`<rect data-led="${p}" x="${M(n-2.4)}" y="${M(i+10)}" width="4.8" height="3.2" rx="0.6" fill="${Er[p].apagado}" stroke="#20252b" stroke-width="0.4"/>`+Ze(n,i+19,p,4.2)}).join(""),l=Rr.map(({y:p,nombres:d},n)=>d.map(m=>{let{x:y}=yi[m],b=m.startsWith("GND")?"GND":m.startsWith("RESET")?"RST":m;return`<circle cx="${M(y)}" cy="${M(p)}" r="2.7" fill="#d7b763" stroke="#8a6f37" stroke-width="0.5"/><rect x="${M(y-1.05)}" y="${M(p-1.05)}" width="2.1" height="2.1" fill="#55504a"/>`+Ze(y,p+(n?-5.2:9),b,b.length>3?3.5:4)}).join("")).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${M(e)}" height="${M(o)}" viewBox="0 0 ${M(e)} ${M(o)}"><title>Nano cl\xE1sico \xB7 m\xF3dulo ATmega328P</title><desc>M\xF3dulo con treinta terminales f\xEDsicos. A6 y A7 solo admiten entrada anal\xF3gica. Dibujo y medidas nominales pendientes de comparaci\xF3n con el kit.</desc><rect x="${M(K.x)}" y="${M(K.y)}" width="${M(K.ancho)}" height="${M(K.alto)}" rx="3.3" fill="#14628e" stroke="#0a3f60" stroke-width="0.9"/><path d="M${M(K.x+35)} ${M(i-9)} H${M(K.x+64)} V${M(i-16)} H${M(K.x+94)} M${M(K.x+91)} ${M(i+9)} H${M(K.x+125)} V${M(i+22)}" fill="none" stroke="#277ba6" stroke-width="1.1"/><rect x="${M(K.x-5.5)}" y="${M(i-12.5)}" width="25.5" height="25" rx="2" fill="#cbd0d6" stroke="#6c747d" stroke-width="0.8"/><rect x="${M(K.x-5.5)}" y="${M(i-8.5)}" width="6.2" height="17" rx="0.8" fill="#525b65"/><rect x="${M(K.x-4.2)}" y="${M(i-5.5)}" width="2.5" height="11" fill="#1d252d"/>`+Rc(K.x+90,i-14,26)+Ze(K.x+103,i-1,"328P",4.5,"#b9bec4")+`<rect x="${M(K.x+127)}" y="${M(i-14)}" width="12" height="6.5" rx="2" fill="#c5c9cd" stroke="#737b84" stroke-width="0.5"/><line x1="${M(K.x+130)}" y1="${M(i-12)}" x2="${M(K.x+136)}" y2="${M(i-12)}" stroke="#727b83" stroke-width="0.5"/><rect x="${M(K.x+144)}" y="${M(i-6)}" width="10" height="11" rx="1.2" fill="#b9c0c7" stroke="#69737f" stroke-width="0.5"/><circle cx="${M(K.x+149)}" cy="${M(i-.5)}" r="3" fill="#343a41"/>`+Ze(K.x+149,i+12,"RESET",4.3)+s+l+Ze(K.x+53,i-13,"NANO CL\xC1SICO",6.2)+Ze(K.x+103,i+17,"A6 / A7: solo anal\xF3gico",4.5)+"</svg>"}function Tr(t,e={}){let o={PWR:"ledPower",L:"led13",RX:"ledRX",TX:"ledTX"};for(let[i,s]of Object.entries(Er)){let p=(e?.leds?.[i]??e?.[i.toLowerCase()]??e?.[o[i]]??0)>0?s.encendido:s.apagado,d=t.querySelector(`[data-led="${i}"]`);d&&d.getAttribute("fill")!==p&&d.setAttribute("fill",p)}}var Ci={...te},to=9.6,Si=Array.from({length:14},(t,e)=>`D${13-e}`),vi=Array.from({length:8},(t,e)=>`A${e}`),fa=[...Si,...vi],Mr=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"],cd=[...fa.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...Mr],Ai=Object.freeze({SPI_MISO:"D12",SPI_MOSI:"D11",SPI_SCK:"D13",SPI_SS:"D10",SPI_V:"5V",SPI_G:"GND1"}),Or=[...fa.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"],["OUT_5V_2","placa.5V"],["GND_OUT_2","placa.GND1"],["OUT_3V3_2","OUT_3V3"]],kr=Object.fromEntries([...fa.flatMap(t=>[[`${t}_S`,`${t} \xB7 se\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \xB7 V: alimentaci\xF3n de 5V (+)`],[`${t}_G`,`${t} \xB7 G: tierra (\u2212)`]]),["I2C_SDA","I2C \xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \xB7 alimentaci\xF3n de 5V (+)"],["I2C_G","I2C \xB7 tierra (\u2212)"],["SPI_MISO","SPI \xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \xB7 SCK: reloj (D13)"],["SPI_SS","SPI \xB7 SS: selecci\xF3n (D10)"],["SPI_V","SPI \xB7 alimentaci\xF3n de 5V (+)"],["SPI_G","SPI \xB7 tierra (\u2212)"],["UART_TX","UART \xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \xB7 alimentaci\xF3n de 5V (+)"],["UART_G","UART \xB7 tierra (\u2212)"],["OUT_5V","5V \xB7 salida de alimentaci\xF3n de la expansi\xF3n (+)"],["OUT_5V_2","5V \xB7 segundo contacto de la misma salida (+)"],["OUT_3V3","3,3V \xB7 salida regulada de la expansi\xF3n (+), separada del 3V3 del Nano"],["OUT_3V3_2","3,3V \xB7 segundo contacto de la misma salida regulada (+)"],["GND_OUT","GND \xB7 tierra de las salidas (\u2212)"],["GND_OUT_2","GND \xB7 segundo contacto de tierra de las salidas (\u2212)"],["JACK_POS","Jack + \xB7 entrada de la expansi\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]),Nr=t=>t.variante==="azul"?"azul":"roja";function _i(t={}){let e=Nr(t)==="azul",o={},i=e?4.8:3.2,s=e?46.2:48.6;Si.forEach((d,n)=>{let m=(n>=3?1:0)+(n>=7?1:0)+(n>=11?1:0),y=s+n*to+m*i;for(let[b,w]of[["G",29.2],["V",38.8],["S",48.4]])o[`${d}_${b}`]={x:y,y:w}}),vi.forEach((d,n)=>{let m=(e?53.4:55.8)+n*to+(n>=4?i:0);for(let[y,b]of[["S",160.6],["V",170.2],["G",179.8]])o[`${d}_${y}`]={x:m,y:b}});let l=e?201.4:200.6,p=l+10.8;return["I2C_SDA","I2C_SCL","I2C_V","I2C_G"].forEach((d,n)=>{o[d]={x:l,y:79.2+n*to}}),["UART_TX","UART_RX","UART_V","UART_G"].forEach((d,n)=>{o[d]={x:p,y:79.2+n*to}}),["GND_OUT","OUT_3V3","OUT_5V","GND_OUT_2","OUT_3V3_2","OUT_5V_2"].forEach((d,n)=>{o[d]={x:(e?149.6:148)+n%3*to,y:166+Math.floor(n/3)*to}}),o.JACK_POS={x:12.4,y:170},o.JACK_GND={x:27.6,y:170},o}var Z=t=>Math.round(t*100)/100,st=(t,e,o,{tam:i=5,ancla:s="middle",color:l="#ffffff",peso:p="normal"}={})=>`<text x="${Z(t)}" y="${Z(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${p}" text-anchor="${s}" fill="${l}">${o}</text>`;function Ir(t,e,o){let{x:i,y:s}=e;return`<g data-contacto="${t}"><rect x="${Z(i-4.3)}" y="${Z(s-4.3)}" width="8.6" height="8.6" rx="0.7" fill="${o}" stroke="#111820" stroke-width="0.45"/><rect x="${Z(i-1.8)}" y="${Z(s-1.8)}" width="3.6" height="3.6" fill="#e1bc5c" stroke="#8e6c28" stroke-width="0.35"/><rect x="${Z(i-.8)}" y="${Z(s-.8)}" width="1.6" height="1.6" fill="#3e3526"/></g>`}function Dr(t,e,o){return`<rect x="${t}" y="${e}" width="8.5" height="7" rx="0.6" fill="#292d33" stroke="#14171b" stroke-width="0.5"/><rect x="${t+2.1}" y="${e-1.8}" width="4.3" height="2" fill="#bac1c8"/>`+[0,1,2].map(i=>`<rect x="${t+1+i*2.6}" y="${e+6.8}" width="1.3" height="2.1" fill="#bac1c8"/>`).join("")+st(t+4.25,e+14,o,{tam:4.3})}function Vr(t={}){let e=Nr(t),o=e==="azul",i=_i(t),{ancho:s,alto:l}=Ci,p=o?"#185ca5":"#bc2731",d=o?"#103c70":"#801a24",n=o?"#2c75bc":"#d2454e",m=o?{S:"#e6c52f",V:"#e6c52f",G:"#e6c52f"}:{S:"#2475c7",V:"#cf3537",G:"#292b30"},y=fa.flatMap(x=>["G","V","S"].map(E=>Ir(`${x}_${E}`,i[`${x}_${E}`],m[E]))).join(""),b=Mr.filter(x=>!x.startsWith("JACK")).map(x=>Ir(x,i[x],o?"#e6c52f":x.startsWith("UART")||x.startsWith("I2C")?"#e8e4da":"#292b30")).join(""),w=["usb","jack","apagada"].includes(t.alimentacion)?t.alimentacion:"usb",T=w==="jack"?"ALIM.: JACK":w==="apagada"?"SIN ALIMENTACI\xD3N":"ALIM.: USB";return`<svg xmlns="http://www.w3.org/2000/svg" width="${Z(s)}" height="${Z(l)}" viewBox="0 0 ${Z(s)} ${Z(l)}"><title>Expansi\xF3n E/S ${e} para Nano cl\xE1sico</title><desc>Modelo de referencia pendiente de validar f\xEDsicamente. S es se\xF1al, V es 5V y G es tierra. El jack y la salida externa de 3,3V tienen nodos propios.</desc><path d="M7 0.5 H${Z(s-7)} Q${Z(s-.5)} 0.5 ${Z(s-.5)} 7 V${Z(l-10)} L${Z(s-10)} ${Z(l-.5)} H10 L0.5 ${Z(l-10)} V7 Q0.5 0.5 7 0.5 Z M18.2 64 H195.8 V140.1 H18.2 Z" fill="${p}" fill-rule="evenodd" stroke="${d}" stroke-width="1"/><path d="M42 57 H80 V60 H102 M137 60 H180 V57 M40 148 H71 M138 150 H179" fill="none" stroke="${n}" stroke-width="1.4"/>`+[[8,8],[s-8,8],[8,l-8],[s-8,l-8]].map(([x,E])=>`<circle cx="${Z(x)}" cy="${Z(E)}" r="4.4" fill="#f5f6f7" stroke="${d}" stroke-width="1"/>`).join("")+y+b+Dr(91,53.2,"5V")+Dr(118,53.2,"3,3V")+'<circle cx="77" cy="59" r="4.2" fill="#bcc3ca" stroke="#4d5864" stroke-width="0.7"/><path d="M74.6 59 H79.4 M77 56.6 V61.4" stroke="#707983" stroke-width="0.6"/><rect x="136" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="145" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="5.2" y="145.4" width="30.4" height="29.5" rx="2" fill="#24282e" stroke="#10151a" stroke-width="0.8"/><rect x="1" y="149" width="8" height="18" rx="1" fill="#424952" stroke="#171b20" stroke-width="0.7"/><rect x="1.8" y="152" width="3" height="12" rx="1.4" fill="#11161c"/>'+["JACK_POS","JACK_GND"].map(x=>{let{x:E,y:k}=i[x];return`<circle data-contacto="${x}" cx="${E}" cy="${k}" r="2.8" fill="#d8b361" stroke="#775d2e" stroke-width="0.6"/>`}).join("")+Si.map(x=>st(i[`${x}_S`].x,20.8,x,{tam:4.5,peso:"bold"})).join("")+vi.map(x=>st(i[`${x}_S`].x,152.8,x,{tam:4.8,peso:"bold"})).join("")+["G","V","S"].map(x=>st(37.6,i[`D13_${x}`].y+1.8,x,{tam:5.3,peso:"bold"})).join("")+["S","V","G"].map(x=>st(44,i[`A0_${x}`].y+1.8,x,{tam:5.3,peso:"bold"})).join("")+st(i.I2C_SDA.x,64.5,"I2C",{tam:3.9,peso:"bold"})+[["I2C_SDA","SDA"],["I2C_SCL","SCL"],["I2C_V","5V"],["I2C_G","GND"]].map(([x,E])=>st(i[x].x,i[x].y-2.5,E,{tam:2.3,color:"#17212b",peso:"bold"})).join("")+st(i.UART_TX.x,64.5,"UART",{tam:3.9,peso:"bold"})+[["UART_TX","TX"],["UART_RX","RX"],["UART_V","5V"],["UART_G","GND"]].map(([x,E])=>st(i[x].x,i[x].y-2.5,E,{tam:2.3,color:"#17212b",peso:"bold"})).join("")+[["GND_OUT","GND"],["OUT_3V3","3,3V"],["OUT_5V","5V"]].map(([x,E])=>st(i[x].x,159.5,E,{tam:3.4})).join("")+[["GND_OUT_2","GND"],["OUT_3V3_2","3,3V"],["OUT_5V_2","5V"]].map(([x,E])=>st(i[x].x,184.5,E,{tam:3.8})).join("")+st(i.OUT_3V3.x,195.2,"ALIMENTACI\xD3N",{tam:4.5,peso:"bold"})+st(12.4,183,"+",{tam:6})+st(27.6,183,"GND",{tam:4.2})+st(20.4,139.1,"JACK",{tam:4.8})+st(84,191,"REGULACI\xD3N 5V / 3,3V",{tam:4.6})+st(84,199,T,{tam:4.4})+st(s/2,10.8,"EXPANSI\xD3N E/S",{tam:6.3,peso:"bold"})+"</svg>"}var Ec=t=>/^A[67]$/.test(t)?`${t} \xB7 solo entrada anal\xF3gica (sin salida digital)`:/^A[0-5]$/.test(t)?`${t} \xB7 entrada anal\xF3gica y digital`:/^D\d+$/.test(t)?`Pin ${t.slice(1)}${["D3","D5","D6","D9","D10","D11"].includes(t)?" \xB7 PWM ~":""}${t==="D0"?" \xB7 RX":t==="D1"?" \xB7 TX":""}`:t.startsWith("GND")?"GND \xB7 tierra (\u2212)":t.startsWith("RESET")?"RESET \xB7 reinicia el Nano":{"5V":"5V \xB7 alimentaci\xF3n del Nano","3V3":"3,3V \xB7 salida del m\xF3dulo Nano",VIN:"VIN \xB7 entrada del m\xF3dulo Nano",AREF:"AREF \xB7 referencia anal\xF3gica",SDA:"SDA \xB7 el mismo A4",SCL:"SCL \xB7 el mismo A5",MOSI:"MOSI \xB7 el mismo D11",MISO:"MISO \xB7 el mismo D12",SCK:"SCK \xB7 el mismo D13",SS:"SS \xB7 el mismo D10"}[t]||t,Ur=t=>({nombre:t,dibujo:{...te,pines:yi,svg:Pr},rotulo:Ec,mostrar:Tr}),eo={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},$i=Object.keys(eo),Br={marron:"marr\xF3n",morado:"violeta"};function wi(t,e){let o=[t,e];return o.some(i=>/^placa\.GND/.test(i)||/^protoboard\.[si]-/.test(i))?"negro":o.some(i=>/^placa\.(5V|3V3|VIN)$/.test(i)||/^protoboard\.[si]\+/.test(i))?"rojo":"verde"}var Pc=["3","5","6","9","10","11"],wt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(Pc.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}},nano:Ur("Arduino Nano"),nano_old:Ur("Arduino Nano (bootloader antiguo)")},X={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",prefijo:"exp",montada:!0,placas:["nano","nano_old"],props:{variante:"roja",alimentacion:"usb",voltajeJack:9},dibujo:{marco:t=>({...Ci,pines:_i(t)}),svg:Vr},rotulo:t=>kr[t]||t,campos:[{prop:"variante",etiqueta:"Tarjeta",opciones:[["roja","Roja"],["azul","Azul"]]},{prop:"alimentacion",etiqueta:"Alimentaci\xF3n",opciones:[["usb","USB del Nano"],["jack","Jack de la expansi\xF3n"],["apagada","Desconectada"]]},{prop:"voltajeJack",etiqueta:"Fuente en el jack",opciones:[[0,"0 V"],[5,"5 V"],[7,"7 V"],[9,"9 V"],[12,"12 V"]]}]},resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:la.ancho,alto:la.alto,pines:ca,svg:t=>ti(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Gt).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(ti(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",Qa(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,placas:["uno"],props:{puentePWR:!0},dibujo:{ancho:wo.ancho,alto:wo.alto,pines:le,svg:t=>ii(t.puentePWR!==!1)},rotulo:t=>nr[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(ii(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),i=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==i&&o.setAttribute("fill",i)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...Ro(t),pines:ur(t)}),svg:t=>mr(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){xr(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:pi.ancho,alto:pi.alto,pines:Po,svg:t=>fi(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries($t).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(fi(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e,o){br(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:ue.umbralV},dibujo:{ancho:xi.ancho,alto:xi.alto,pines:gi,svg:t=>$r(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:ue.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){bi(t,e,null)},mostrar(t,e,o){bi(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var ha=["a","b","c","d","e"],jr=["f","g","h","i","j"],ut={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Lr=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],Wt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Io=t=>14.4+(t-1)*9.6,Tc=t=>t>=2&&(t-1)%6!==0,Ri=new Map;function oo(t="media"){if(Ri.has(t))return Ri.get(t);let e=Wt[t]||Wt.media,o=[];Ri.set(t,o);for(let i=1;i<=e.columnas;i++){for(let s of ha)o.push({nombre:s+i,x:Io(i),y:ut[s],tira:"arriba"+i});for(let s of jr)o.push({nombre:s+i,x:Io(i),y:ut[s],tira:"abajo"+i});for(let[s]of Lr)Tc(i)&&o.push({nombre:s+i,x:Io(i),y:ut[s],tira:s})}return o}var Ei=new Map;function Gr(t="media"){if(Ei.has(t))return Ei.get(t);let e=new Map;Ei.set(t,e);for(let o of oo(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function Pi(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(ha.includes(o[1])?"arriba":"abajo")+o[2]:null}function zr(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let l=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${l} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[i,s]=ha.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${i}${o[2]}\u2013${s}${o[2]}`}function Ti(t="media"){let e=Wt[t]||Wt.media,{ancho:o,alto:i,columnas:s}=e,l=[];l.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${i}" viewBox="0 0 ${o} ${i}">`),l.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${i-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),l.push(`<rect x="2" y="${(ut.e+ut.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let p=(n,m)=>l.push(`<line x1="${14.4-6}" y1="${n}" x2="${o-14.4+6}" y2="${n}" stroke="${m}" stroke-width="1.2"/>`);p(ut["s+"]-5.5,"#d7263d"),p(ut["s-"]+5.5,"#2f6fde"),p(ut["i-"]-5.5,"#2f6fde"),p(ut["i+"]+5.5,"#d7263d");let d=(n,m,y,b="#8a867a",w=5.5)=>l.push(`<text x="${n}" y="${m}" font-family="sans-serif" font-size="${w}" font-weight="700" fill="${b}" text-anchor="middle">${y}</text>`);for(let[n,,m]of Lr){let y=m==="+"?"#d7263d":"#2f6fde";d(5.2,ut[n]+2.2,m,y,7),d(o-5.2,ut[n]+2.2,m,y,7)}for(let n=1;n<=s;n++)(n===1||n%5===0)&&(d(Io(n),ut.a-6.2,n),d(Io(n),ut.j+10.4,n));for(let n of[...ha,...jr])d(5.2,ut[n]+2,n),d(o-5.2,ut[n]+2,n);for(let n of oo(t))l.push(`<rect x="${(n.x-1.7).toFixed(2)}" y="${(n.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return l.push("</svg>"),l.join("")}function Wr(t,{tipo:e="media",ocupados:o=new Set,tolerancia:i=3.5}={}){if(!t.length)return null;let s=oo(e),l=(b,w)=>{let T=null,x=1/0;for(let E of s){let k=Math.hypot(E.x-b,E.y-w);k<x&&(x=k,T=E)}return{hueco:T,distancia:x}},p=l(t[0].x,t[0].y);if(p.distancia>9.6)return null;let d=p.hueco.x-t[0].x,n=p.hueco.y-t[0].y,m={},y=new Set;for(let b of t){let{hueco:w,distancia:T}=l(b.x+d,b.y+n);if(T>i||o.has(w.nombre)||y.has(w.nombre))return null;m[b.nombre]=w.nombre,y.add(w.nombre)}return{dx:d,dy:n,en:m}}var ua=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),Hr=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Ic=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Dc=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),Mc=Object.freeze([...Hr,Object.freeze(["A6"]),Object.freeze(["A7"])]),Fr=Object.freeze([...ua,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),Oc=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:ua,analogicos:Hr,puentes:Ic,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...ua,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","IOREF","SDA","SCL"])}),kc=Object.freeze({nombre:"Arduino Nano cl\xE1sico",pinesDigitales:ua,analogicos:Mc,puentes:Dc,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:Fr,pines:Object.freeze([...Fr,"SDA","SCL","MISO","MOSI","SCK","SS"])}),ee=t=>t==="nano"||t==="nano_old",Re=t=>ee(t)?kc:Oc;function ma(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:i=!0}={}){let s=new Map,l=d=>{for(s.has(d)||s.set(d,d);s.get(d)!==d;)s.set(d,s.get(s.get(d))),d=s.get(d);return d},p=(d,n)=>s.set(l(d),l(n));for(let d of Re(t.placa).puentes)d.forEach(n=>p("placa."+d[0],"placa."+n));for(let d of t.cables)p(d.de,d.a);if(t.protoboard)for(let d of Gr(t.protoboard.tipo).values())d.forEach(n=>p("protoboard."+d[0],"protoboard."+n));for(let d of t.componentes)if(d.en)for(let[n,m]of Object.entries(d.en))(t.protoboard||!m.startsWith("protoboard."))&&p(d.id+"."+n,m);for(let d of t.componentes)if(d.tipo==="shield_nano_io"&&ee(t.placa))for(let[n,m]of Or)p(d.id+"."+n,m.startsWith("placa.")?m:d.id+"."+m);else if(d.tipo==="shield_l293d"){for(let[n,m]of cr)p(d.id+"."+n,m);(!d.props||d.props.puentePWR!==!1)&&p(d.id+".EXT_POS","placa.VIN")}else d.tipo==="bateria_lipo"&&i?(p(d.id+".BAL0",d.id+".NEG"),p(d.id+".BAL2",d.id+".POS")):d.tipo==="pulsador"?(p(d.id+".1i",d.id+".1d"),p(d.id+".2i",d.id+".2d"),e.has(d.id)&&p(d.id+".1i",d.id+".2i")):o&&d.tipo==="resistencia"?p(d.id+".1",d.id+".2"):o&&d.tipo==="potenciometro"&&(p(d.id+".GND",d.id+".SIG"),p(d.id+".SIG",d.id+".VCC"));return l}var Ni=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Ii=Object.fromEntries(Ni.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),Nc={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},Di={ref:"U",lib:"MCU_Module",parte:"Arduino_Nano_v3.x",huella:"Module:Arduino_Nano",valor:"Arduino Nano cl\xE1sico",pines:{D1:"1",D0:"2",RESET:"3",GND1:"4",D2:"5",D3:"6",D4:"7",D5:"8",D6:"9",D7:"10",D8:"11",D9:"12",D10:"13",D11:"14",D12:"15",D13:"16","3V3":"17",AREF:"18",A0:"19",A1:"20",A2:"21",A3:"22",A4:"23",A5:"24",A6:"25",A7:"26","5V":"27",RESET2:"28",GND2:"29",VIN:"30"}},Vc=["GND","+5V","+3V3","VIN"],qr=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Mi={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>qr(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(Gt[t.modelo]||Gt.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>qr(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},Ft="placa:GND1",ao="placa:5V",Do="pieza:EXT_POS",Xr=[15,1,2,3,4,5,6,7];function Kr(t,e){let o=ai.pwm;return{1:"placa:"+o[t],2:`IN_M${t}A`,3:`pieza:M${t}A`,6:`pieza:M${t}B`,7:`IN_M${t}B`,9:"placa:"+o[e],10:`IN_M${e}A`,11:`pieza:M${e}A`,14:`pieza:M${e}B`,15:`IN_M${e}B`,4:Ft,5:Ft,12:Ft,13:Ft,8:Do,16:ao}}function Uc(){let t=ai,e={8:Ft,16:ao,10:ao,11:"placa:"+t.reloj,12:"placa:"+t.cierre,13:"placa:"+t.habilita,14:"placa:"+t.datos};for(let[o,{A:i,B:s}]of Object.entries(t.bits))e[Xr[i]]=`IN_M${o}A`,e[Xr[s]]=`IN_M${o}B`;return e}var Jr="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm",Vi="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm",Yr="Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",Oi="Package_DIP:DIP-16_W7.62mm",Mo={ref:"C",lib:"Device",parte:"C",huella:"Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm",valor:"100nF"},Bc=[{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Oi,valor:"L293D",nota:"M1 y M2",pads:Kr(1,2)},{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Oi,valor:"L293D",nota:"M3 y M4",pads:Kr(3,4)},{ref:"U",lib:"74xx",parte:"74HC595",huella:Oi,valor:"74HC595",nota:"sentido de los motores",pads:Uc()},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Jr,valor:"M1 GND M2",externo:!0,pads:{1:"pieza:M1A",2:"pieza:M1B",3:"pieza:GND_IZQ",4:"pieza:M2A",5:"pieza:M2B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Jr,valor:"M4 GND M3",externo:!0,pads:{1:"pieza:M4A",2:"pieza:M4B",3:"pieza:GND_DER",4:"pieza:M3A",5:"pieza:M3B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x02",huella:Vi,valor:"EXT_PWR",externo:!0,pads:{1:Do,2:"pieza:EXT_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Yr,valor:"SERVO_1",externo:!0,pads:{1:"pieza:S1_SIG",2:"pieza:S1_POS",3:"pieza:S1_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Yr,valor:"SERVO_2",externo:!0,pads:{1:"pieza:S2_SIG",2:"pieza:S2_POS",3:"pieza:S2_GND"}},{ref:"JP",lib:"Jumper",parte:"Jumper_2_Open",huella:"Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical",valor:"PWR",pads:{1:Do,2:"placa:VIN"}},{...Mo,nota:"junto a U1",pads:{1:ao,2:Ft}},{...Mo,nota:"junto a U2",pads:{1:ao,2:Ft}},{...Mo,nota:"junto a U3",pads:{1:ao,2:Ft}},{ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"100uF 25V",nota:"voltaje de motores",pads:{1:Do,2:Ft}},{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:"1k",nota:"LED PWR",pads:{1:Do,2:"LED_PWR"}},{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D3.0mm",valor:"LED verde",nota:"PWR",pads:{1:Ft,2:"LED_PWR"}}],jc={EXT_POS:"VMOT",M1A:"M1_A",M1B:"M1_B",M2A:"M2_A",M2B:"M2_B",M3A:"M3_A",M3B:"M3_B",M4A:"M4_A",M4B:"M4_B"},Ee="Circuito de referencia por validar: componentes, polaridad, orden de conectores, aislamiento USB/jack y montaje de ambas variantes pendientes",ki={ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"10uF 25V",nota:Ee},Zr={ref:"U",lib:"Regulator_Linear",huella:"Package_TO_SOT_SMD:SOT-223-3_TabPin2",nota:Ee},Lc=[{...Zr,clave:"REG_5V",parte:"LD1117S50TR_SOT223",valor:"LD1117S50TR 5V (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_5V",3:"pieza:JACK_POS"}},{...Zr,clave:"REG_3V3",parte:"LD1117S33TR_SOT223",valor:"LD1117S33TR 3V3 (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_3V3",3:"pieza:OUT_5V"}},{...ki,clave:"FILTRO_JACK",pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{...ki,clave:"FILTRO_5V",pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{...ki,clave:"FILTRO_3V3",pads:{1:"pieza:OUT_3V3",2:"pieza:JACK_GND"}},{...Mo,clave:"DESACOPLE_JACK",nota:Ee,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{...Mo,clave:"DESACOPLE_5V",nota:Ee,pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector",parte:"Barrel_Jack_Switch",huella:"Connector_BarrelJack:BarrelJack_CUI_PJ-102AH_Horizontal",clave:"JACK",valor:"PJ-102AH centro + (referencia por validar)",nota:Ee,externo:!0,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x04",huella:"Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical",clave:"I2C",valor:"I2C SDA SCL 5V GND (referencia por validar)",nota:Ee,externo:!0,pads:{1:"pieza:I2C_SDA",2:"pieza:I2C_SCL",3:"pieza:I2C_V",4:"pieza:I2C_G"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x06",huella:"Connector_PinHeader_2.54mm:PinHeader_1x06_P2.54mm_Vertical",clave:"SPI",valor:"SPI MISO MOSI SCK SS 5V GND (referencia por validar)",nota:Ee+"; SPI es un conector a\xF1adido al dise\xF1o, no el bloque de seis salidas de alimentaci\xF3n de la expansi\xF3n",externo:!0,pads:{1:"placa:D12",2:"placa:D11",3:"placa:D13",4:"placa:D10",5:"placa:5V",6:"placa:GND1"}}],Gc={JACK_POS:"JACK_VIN",OUT_3V3:"REG_3V3"},zc={motor_tt:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:Vi,valor:()=>"Motor TT",pines:{A:"1",B:"2"}}],bateria_lipo:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:Vi,valor:()=>"LiPo 2S",pines:{POS:"1",NEG:"2"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:"Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical",valor:()=>"Balance LiPo",sufijo:"/balance",pines:{BAL0:"1",BAL1:"2",BAL2:"3"}}],probador_lipo:[{ref:"J",lib:"Connector_Generic",parte:"Conn_01x09",huella:"Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical",valor:()=>"Probador de celdas",pines:{NEG:"1",C1:"2",C2:"3",C3:"4",C4:"5",C5:"6",C6:"7",C7:"8",C8:"9"}}]},Wc=new Set(["servo"]),dt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function Fc(t){let o=[2166136261,16777619,2654435769,2246822507].map(i=>{let s=i>>>0;for(let l=0;l<t.length;l++)s=Math.imul(s^t.charCodeAt(l),16777619)>>>0;return s.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Qr(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:i="TecnoCircuito"}={}){let s=ee(t.placa);if(s&&t.componentes.filter(u=>u.tipo==="shield_nano_io").length>1)throw new Error("Solo puedes exportar una expansi\xF3n E/S por Nano. Quita la expansi\xF3n adicional.");let l={...t,componentes:t.componentes.map(u=>u.tipo==="shield_l293d"?{...u,props:{...u.props,puentePWR:!1}}:u)},p=ma(l),d=l.componentes.find(u=>u.tipo==="shield_l293d")||null,n=u=>{let[C,N]=u.split(":");return N===void 0?"#"+u:p((C==="placa"?"placa":d.id)+"."+N)},m=d?Bc.map(u=>({...u,id:`${d.id}/${u.valor}${u.nota?" "+u.nota:""}`,enShield:!0})):[],y=s?l.componentes.filter(u=>u.tipo==="shield_nano_io").flatMap(u=>Lc.map(C=>({...C,id:`${u.id}/${C.clave}`,expansion:u.id}))):[],b=(u,C,N=p)=>{let[S,I]=C.split(":");return N((S==="placa"?"placa":u.expansion)+"."+I)},w=new Set(t.cables.flatMap(u=>[u.de,u.a]));for(let u of t.componentes)for(let[C,N]of Object.entries(u.en||{}))N.startsWith("protoboard.")||w.add(u.id+"."+C).add(N);let T=new Set(m.flatMap(u=>Object.values(u.pads).map(n))),x=s?Object.keys(Di.pines):Object.keys(Ii).filter(u=>w.has("placa."+u)||T.has(p("placa."+u))),E=l.componentes.filter(u=>Mi[u.tipo]),k=ma(l,{balanceInterno:!1}),j=u=>{let[C,N]=u.split(":");return N===void 0?"#"+u:k((C==="placa"?"placa":d.id)+"."+N)},J=new Set([...x.map(u=>k("placa."+u)),...m.flatMap(u=>Object.values(u.pads).map(j)),...y.flatMap(u=>Object.values(u.pads).map(C=>b(u,C,k))),...E.flatMap(u=>Object.keys(Mi[u.tipo].pads).map(C=>k(u.id+"."+C)))]),Mt=new Set([...m.filter(u=>u.externo).flatMap(u=>Object.values(u.pads).map(j)),...y.filter(u=>u.externo).flatMap(u=>Object.values(u.pads).map(C=>b(u,C,k)))]),Ot=(u,C)=>C.filter(N=>J.has(k(u+"."+N))),B=(u,C)=>Ot(u,C).some(N=>!Mt.has(k(u+"."+N))),Ht=(u,C)=>{let N=Ot(u,C);return N.length>0&&N.every(S=>Mt.has(k(u+"."+S)))},R=[];s&&R.push({...Di,id:"placa",pads:x.map(u=>[Di.pines[u],p("placa."+u),null,u])});for(let u of E){let C=Mi[u.tipo];Wc.has(u.tipo)&&Ht(u.id,Object.keys(C.pads))||R.push({...C,id:u.id,valor:C.valor(u.props||{}),pads:Object.entries(C.pads).map(([N,S])=>[S,p(u.id+"."+N)])})}for(let u of m)R.push({...u,pads:Object.entries(u.pads).map(([C,N])=>[C,n(N),N.startsWith("pieza:")?jc[N.slice(6)]:null])});for(let u of y)R.push({...u,pads:Object.entries(u.pads).map(([C,N])=>[C,b(u,N),Gc[N.slice(6)]||null])});for(let u of l.componentes)for(let C of zc[u.tipo]||[])B(u.id,Object.keys(C.pines))&&R.push({...C,id:u.id+(C.sufijo||""),valor:C.valor(u.props||{}),pads:Object.entries(C.pines).map(([N,S])=>[S,p(u.id+"."+N)])});let et={J:s?0:Ni.length};for(let u of R)et[u.ref]=(et[u.ref]||0)+1,u.ref=u.ref+et[u.ref];let ot=new Map,ro=(u,C,N,S,I)=>{ot.has(u)||ot.set(u,{pads:new Map,uno:new Set,shield:new Set,propia:u.startsWith("#")?u.slice(1):null});let O=ot.get(u);O.pads.set(C+" "+N,{ref:C,pad:N,pinUno:S}),S&&O.uno.add(Nc[S]||S),I&&O.shield.add(I)};if(!s)for(let u of x)ro(p("placa."+u),Ii[u].ref,Ii[u].pad,u,null);for(let u of R)for(let[C,N,S,I]of u.pads)ro(N,u.ref,String(C),I==="RESET2"?"RESET":I,S);let kt=(u,C)=>u.localeCompare(C,"en",{numeric:!0}),xe=[...ot.values()].filter(u=>u.pads.size>=2).map(u=>{let C=[...u.pads.values()].sort((S,I)=>kt(S.ref,I.ref)||kt(S.pad,I.pad));return{nombre:Vc.find(S=>u.uno.has(S))||[...u.uno].sort(kt)[0]||[...u.shield].sort(kt)[0]||u.propia||`Net-(${C[0].ref}-Pad${C[0].pad})`,pads:C}}).sort((u,C)=>kt(u.nombre,C.nombre)),xt=[],Nt=(u,C,N,S,I,O,ke,Ne)=>xt.push("		(comp",`			(ref ${dt(u)})`,`			(value ${dt(C)})`,`			(footprint ${dt(N)})`,`			(libsource (lib ${dt(S)}) (part ${dt(I)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${dt(O)}))`,...Ne?[`			(property (name "TecnoCircuito_validacion") (value ${dt(Ne)}))`]:[],'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${dt(ke)})`,"		)");if(xt.push("(export",'	(version "E")',"	(design",`		(source ${dt(e)})`,`		(date ${dt(o)})`,`		(tool ${dt(i)})`,"	)"),xt.push("	(components"),!s)for(let u of Ni)Nt(u.ref,u.valor,u.huella,"Connector_Generic",u.parte,"placa",u.uuid);for(let u of R)Nt(u.ref,u.valor,u.huella,u.lib,u.parte,u.id,Fc(e+"/"+u.id),u.expansion?u.nota:null);return xt.push("	)","	(nets"),xe.forEach((u,C)=>{xt.push("		(net",`			(code ${dt(C+1)})`,`			(name ${dt(u.nombre)})`,'			(class "Default")');for(let N of u.pads){let S=N.pinUno?` (pinfunction ${dt(N.pinUno)})`:"";xt.push(`			(node (ref ${dt(N.ref)}) (pin ${dt(N.pad)})${S} (pintype "passive"))`)}xt.push("		)")}),xt.push("	)",")"),xt.join(`
`)+`
`}var Pe;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(Pe||(Pe={}));var mt;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(mt||(mt={}));var tn={0:{type:mt.SingleEnded,channel:0},1:{type:mt.SingleEnded,channel:1},2:{type:mt.SingleEnded,channel:2},3:{type:mt.SingleEnded,channel:3},4:{type:mt.SingleEnded,channel:4},5:{type:mt.SingleEnded,channel:5},6:{type:mt.SingleEnded,channel:6},7:{type:mt.SingleEnded,channel:7},8:{type:mt.Temperature},14:{type:mt.Constant,voltage:1.1},15:{type:mt.Constant,voltage:0}},kd={type:mt.Constant,voltage:0},qc={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:tn,adcReferences:[Pe.AREF,Pe.AVCC,Pe.Reserved,Pe.Internal1V1]};var Xc=2,Kc=4,Jc=8,Yc=16,Zc=32,Ud=Xc|Kc|Jc|Yc|Zc;var on={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},an={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},sn={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var rn={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var Oo={PIN:35,DDR:36,PORT:37,pinChange:sn,externalInterrupts:[]};var Te={PIN:41,DDR:42,PORT:43,pinChange:rn,externalInterrupts:[null,null,on,an]};var xa;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(xa||(xa={}));var ga;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(ga||(ga={}));var en;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(en||(en={}));var ln={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},nn;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(nn||(nn={}));var Li={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Qc=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:ln,compPortA:Te.PORT,compPinA:6,compPortB:Te.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:Te.PORT,externalClockPin:4},Li),tl=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:ln,compPortA:Oo.PORT,compPinA:1,compPortB:Oo.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:Te.PORT,externalClockPin:5},Li),el=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:Oo.PORT,compPinA:3,compPortB:Te.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Li),Ui;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Ui||(Ui={}));var H;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(H||(H={}));var q;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(q||(q={}));var Me=1,ba=2,io=1,{Normal:dn,PWMPhaseCorrect:Ie,CTC:Bi,FastPWM:De,Reserved:ji,PWMPhaseFrequencyCorrect:cn}=Ui,zd=[[dn,255,q.Immediate,H.Max,0],[Ie,255,q.Top,H.Bottom,0],[Bi,Me,q.Immediate,H.Max,0],[De,255,q.Bottom,H.Max,0],[ji,255,q.Immediate,H.Max,0],[Ie,Me,q.Top,H.Bottom,io],[ji,255,q.Immediate,H.Max,0],[De,Me,q.Bottom,H.Top,io]],Wd=[[dn,65535,q.Immediate,H.Max,0],[Ie,255,q.Top,H.Bottom,0],[Ie,511,q.Top,H.Bottom,0],[Ie,1023,q.Top,H.Bottom,0],[Bi,Me,q.Immediate,H.Max,0],[De,255,q.Bottom,H.Top,0],[De,511,q.Bottom,H.Top,0],[De,1023,q.Bottom,H.Top,0],[cn,ba,q.Bottom,H.Bottom,0],[cn,Me,q.Bottom,H.Bottom,io],[Ie,ba,q.Top,H.Bottom,0],[Ie,Me,q.Top,H.Bottom,io],[Bi,ba,q.Immediate,H.Max,0],[ji,65535,q.Immediate,H.Max,0],[De,ba,q.Bottom,H.Top,io],[De,Me,q.Bottom,H.Top,io]];var ol=16,al=8,il=4;var Kd=il|ol|al;var oe={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var Gi={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};var St=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),pn=t=>t>=1e3?St(t/1e3)+" k\u03A9":t+" \u03A9",ko=t=>({estado:"validado",texto:t}),Oe=t=>({estado:"por_validar",texto:t}),zi=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","shield_nano_io","bateria_lipo","probador_lipo"]}],No={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",descripcion:"El Nano va montado en esta tarjeta. Cada grupo re\xFAne se\xF1al, 5V y tierra para conectar sensores o servos. El jack alimenta la regulaci\xF3n de la expansi\xF3n; A6 y A7 solo leen se\xF1ales anal\xF3gicas.",palabras:["nano","expansion","shield","sensores","servo","roja","azul","i2c","spi","jack"],pines:"S: se\xF1al del pin indicado; V: 5V; G: tierra. I2C: SDA/A4 y SCL/A5, junto a UART. El bloque de seis contactos ofrece dos GND, dos 3,3V y dos 5V. SPI se conecta en el Nano: D12/MISO, D11/MOSI, D13/SCK y D10/SS. OUT_3V3 es la salida de la expansi\xF3n, separada de la del m\xF3dulo Nano",datos:t=>[["Tarjeta",t.variante==="azul"?"Azul":"Roja"],["Placa","Nano cl\xE1sico ATmega328P \xB7 16 MHz"],["Entradas anal\xF3gicas","A0 a A7; A6 y A7 solo anal\xF3gicas"],["Alimentaci\xF3n",t.alimentacion==="jack"?`Jack: ${Number(t.voltajeJack??9)} V (o la bater\xEDa conectada)`:t.alimentacion==="apagada"?"Desconectada":"USB del Nano"],["Regulaci\xF3n","Modelo de referencia 5V y 3,3V; salida externa 3,3V separada del m\xF3dulo"],["KiCad","M\xF3dulo Nano + regulaci\xF3n/filtrado de referencia, jack, I2C y conector SPI a\xF1adido al dise\xF1o"]],validacion:()=>Oe("Dibujo basado en las referencias roja y azul; Efra\xEDn confirm\xF3 que el bloque de seis contactos es alimentaci\xF3n. Falta medir continuidad, reguladores, puentes, polaridad y capacidad de cada tarjeta. I2C y los pines SPI del Nano son conexiones; sus dispositivos se incorporan por separado.")},protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",pn(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>ko("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${St(oe.vf[t.color]||oe.vf.rojo,2)} V a ${oe.normalmA} mA`],["Corriente",`de 5 a ${oe.normalmA} mA; se quema desde ${oe.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(oe.vf[t.color]||oe.vf.rojo))/(oe.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:t=>!t.color||t.color==="rojo"?ko("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 11 de 12 dentro del criterio; la que queda en el l\xEDmite cumple con la incertidumbre del mult\xEDmetro)."):Oe(`Voltaje de la hoja de datos: se midi\xF3 solo el LED rojo (7 oct 2026); falta medir el ${t.color}.`)},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>ko("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",pn(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>ko("Lectura anal\xF3gica revisada el 7 oct 2026. El ruido del ADC (unos 0,1 pasos) es una estimaci\xF3n del 9 oct: falta repetirlo con el programa corregido.")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=Gt[t.modelo]||Gt.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${St(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?Oe("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):ko("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (quieto menos de 10 mA, lo m\xEDnimo que muestra el mult\xEDmetro; ~100 mA movi\xE9ndose; 590 mA bloqueado). Los 6 mA quieto son de la hoja de datos.")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${ht.voltiosRef} V`],["Sin carga a 6 V",`${ht.rpmSinCarga} RPM y ${ht.mASinCarga} mA`],["Bloqueado",`${St(ht.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${ht.reduccion} \xB7 rueda de ${ht.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>Oe("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"],["En KiCad","sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, puente PWR, C1 a C4 y el LED"]],validacion:()=>Oe("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=$t[t.carga]||$t.nominal;return[["Carga",`${e.nombre}: ${St(e.voltios)} V`],["Celdas",e.celdas.map((o,i)=>`${i+1}: ${St(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${St($t.llena.voltios)} / ${St($t.nominal.voltios)} / ${St($t.descargada.voltios)} V`],["M\xEDnimo",`${St(Ye.minimoCeldaV)} V por celda (${St(Ye.minimoCeldaV*Ye.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>Oe("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${St(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${St(ue.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>Oe("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},fn=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function hn(t){let e=fn(t).split(/\s+/).filter(Boolean),o=zi.flatMap(i=>i.piezas.map(s=>({tipo:s,categoria:i.nombre})));return e.length?o.filter(({tipo:i,categoria:s})=>{let l=No[i],p=fn([l.nombre,s,l.descripcion,...l.palabras].join(" "));return e.every(d=>p.includes(d))}):o}var un="http://www.w3.org/2000/svg",sl="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",rl=280,mn=5e3,xn=4,gn=8,nl=6,bn=3.5,me=t=>typeof t=="string"&&t.startsWith("protoboard."),cl=9.6,yn=.4,ll=5,Rt=t=>JSON.parse(JSON.stringify(t)),rt=t=>Math.round(t*100)/100,Vo=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),Wi=t=>eo[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:eo.verde);function _n(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||e.circuito?.placa||"uno";if(!wt[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let i=!!e.soloLectura,s=typeof e.alEvento=="function"?e.alEvento:null,l=[],p=[],d={n:0},n=dl(e.circuito,o,p,d),m=document.createElement("div");m.className="tecnocircuito",t.appendChild(m);let y=m.attachShadow({mode:"open"});y.innerHTML=`<style>${ir}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${mn} ${mn})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>`;let b=a=>y.querySelector(a),w=b(".tc"),T=b(".tc-barra"),x=b(".tc-biblioteca"),E=b(".tc-buscar"),k=b(".tc-bib-lista"),j=b(".tc-bib-vacio"),J=b(".tc-ficha"),Mt=T.querySelector('[data-accion="menu"]'),Ot=b(".tc-sel"),B=b(".tc-area"),Ht=b(".tc-mundo"),R=b(".tc-capa-comp"),et=b(".tc-capa-pines"),ot=b(".tc-cables"),ro=b(".tc-asas"),[kt,xe]=b(".tc-previa").children,xt=b(".tc-ayuda"),Nt=b(".tc-tip"),u={px:0,py:0,escala:1.5},C=new Map,N=new Map,S=null,I=null,O=null,ke=null,Ne=null,Xi=!1,ya=!1,no=!1,Uo=null,Ca=!1,nt={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},Sa=new Set,Ki=[],Ji=[],va="",Y=a=>n.componentes.find(r=>r.id===a),Bo=a=>a==="protoboard"?n.protoboard:Y(a),ge=a=>!!(a&&X[a.tipo]&&X[a.tipo].montada),Ve=a=>a==="placa"||ge(Y(a))?{x:0,y:0,rot:0}:Bo(a);function jo(a,r,c){let f=a==="placa"?wt[o]:X[r],h=document.createElement("div");h.className="tc-comp"+(a==="placa"?" tc-placa":""),h.dataset.id=a,r&&(h.dataset.tipo=r);let g;if(f&&f.dibujo){let _=document.createElement("template");_.innerHTML=f.dibujo.svg(c),g=_.content.firstElementChild}else f?(g=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(g,c),f.perilla&&g.addEventListener("input",()=>vs(a,Number(g.value)/100))):(g=document.createElement("div"),g.className="tc-desconocido",g.textContent=`\xBF${r}?`,g.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(g);let v=C.get("placa");f&&f.montada&&v?R.insertBefore(h,v.div.nextSibling):R.appendChild(h);let A={id:a,def:f,div:h,el:g,w:64,h:40,pines:new Map,lista:!1};return C.set(a,A),Promise.resolve(g.updateComplete).then(()=>{if(C.get(a)===A){if(f&&f.dibujo){let _=f.dibujo.marco?f.dibujo.marco(c):f.dibujo;Object.assign(A,{w:_.ancho,h:_.alto});for(let[P,U]of Object.entries(_.pines)){let G=document.createElement("div");G.className="tc-pin",G.dataset.ref=`${a}.${P}`,et.appendChild(G),A.pines.set(P,{px:U.x,py:U.y,div:G})}}else if(f){Object.assign(A,ss(g));for(let _ of g.pinInfo||[]){let P=f.nombrePin(_.name);if(!P)continue;let U=document.createElement("div");U.className="tc-pin",U.dataset.ref=`${a}.${P}`,et.appendChild(U),A.pines.set(P,{px:_.x,py:_.y,div:U})}}A.lista=!0,ae(A),is(A)}})}function Yi(){let a=n.protoboard.tipo,r=Wt[a]||Wt.media,c=document.createElement("div");c.className="tc-comp tc-protoboard",c.dataset.id="protoboard",c.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=Ti(a);let h=f.content.firstElementChild;c.appendChild(h);let g=C.get("placa");R.insertBefore(c,g?g.div.nextSibling:R.firstChild);let v={id:"protoboard",def:{protoboard:!0},div:c,el:h,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let A of oo(a)){let _=document.createElement("div");_.className="tc-pin tc-hueco",_.dataset.ref="protoboard."+A.nombre,_.style.left=A.x+"px",_.style.top=A.y+"px",c.appendChild(_),v.pines.set(A.nombre,{px:A.x,py:A.y,div:_})}return C.set("protoboard",v),ae(v),co(),Promise.resolve()}function Zi(a=null){if(n.protoboard)return;let r=Ma(),c=Wt.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-c.ancho/2),y:Math.round(a.y-c.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},Yi(),Lo(),pt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),Et({tipo:"comp",id:"protoboard"}),!no&&!a&&uo(),gt()}function Lo(){let a=x.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,c]of Object.entries(X)){if(!c.montada)continue;let f=x.querySelector(`[data-tipo="${r}"]`),h=n.componentes.some(v=>v.tipo===r),g=c.placas&&!c.placas.includes(o);f&&Object.assign(f,{disabled:h||g,title:g?`${c.nombre} se monta en ${c.placas.map(v=>wt[v].nombre).join(" o ")}`:h?`Ya hay una ${c.nombre}`:""})}}}function In(a){let r=C.get(a.id),c=n.protoboard;return!r||!r.lista||!c||!r.pines.size?null:[...r.pines].map(([f,h])=>{let g=je(r,a,h);return{nombre:f,x:g.x-c.x,y:g.y-c.y}})}function Aa(a){let r=new Set;for(let c of n.componentes)if(c!==a&&c.en)for(let f of Object.values(c.en))me(f)&&r.add(f.slice(11));return r}function Dn(a){let r=new Set;for(let c of n.componentes)if(!(c===a||!c.en))for(let[f,h]of Object.entries(c.en))me(h)||r.add(h),r.add(c.id+"."+f);return r}function Ue(a,r=new Set([a])){let c=[];for(let f of n.componentes)r.has(f.id)||!f.en||Object.values(f.en).some(h=>!me(h)&&ie(h)[0]===a)&&(r.add(f.id),c.push(f,...Ue(f.id,r)));return c}function Qi(a){let r=C.get(a.id);if(!r||!r.lista||!r.pines.size||ge(a))return null;let c=Dn(a),f=new Set([a.id,...Ue(a.id).map(P=>P.id)]),h=Ve(a.id),g=[...r.pines].filter(([P])=>!c.has(a.id+"."+P)).map(([P,U])=>({nombre:P,...je(r,h,U)})),v=[];for(let[P,U]of C){if(f.has(P)||P==="protoboard"||!U.lista||!U.def)continue;let G=Ve(P);if(G)for(let[qt,yt]of U.pines)c.has(P+"."+qt)||v.push({ref:P+"."+qt,...je(U,G,yt)})}let A=C.get("protoboard");if(A&&A.lista&&n.protoboard){let P=Aa(a);for(let[U,G]of A.pines)P.has(U)||v.push({ref:"protoboard."+U,hueco:!0,...je(A,n.protoboard,G)})}let _=null;for(let P of g)for(let U of v){if(U.hueco)continue;let G=U.x-P.x,qt=U.y-P.y,yt=Math.hypot(G,qt);if(yt>nl)continue;let Oa={},Es=new Set;for(let ka of g){let Yo=null,Ps=bn;for(let Zo of v){let Ts=Math.hypot(Zo.x-ka.x-G,Zo.y-ka.y-qt);Ts<=Ps&&!Es.has(Zo.ref)&&(Ps=Ts,Yo=Zo)}Yo&&(Oa[ka.nombre]=Yo.ref,Es.add(Yo.ref))}let Jo=Object.keys(Oa).length;Jo&&(!_||Jo>_.n||Jo===_.n&&yt<_.largo)&&(_={n:Jo,largo:yt,dx:G,dy:qt,en:Oa})}return _&&{dx:_.dx,dy:_.dy,en:_.en}}function _a(){for(let a of n.componentes){if(!a.en)continue;let r=!1;for(let[c,f]of Object.entries(a.en)){let h=Vt(a.id+"."+c),g=Vt(f);!h||!g||Math.hypot(h.x-g.x,h.y-g.y)>bn&&(delete a.en[c],r=!0)}r&&(Object.keys(a.en).length||delete a.en,pt("componente_cambiado",{id:a.id,x:a.x,y:a.y,en:a.en?Rt(a.en):null}))}co()}function ts(a,r,c,f=Ue(a.id)){if(!(!r&&!c))for(let h of[a,...f])h.x=rt(h.x+r),h.y=rt(h.y+c),ae(C.get(h.id))}function es(a){let r=In(a);return r?Wr(r,{tipo:n.protoboard.tipo,ocupados:Aa(a)}):null}function $a(a,{enchufar:r=!0}={}){if(ge(a))return!1;let c=Ue(a.id),f=n.protoboard?es(a):null,h=f||!r?null:Qi(a);return f?(ts(a,f.dx,f.dy,c),a.en=Object.fromEntries(Object.entries(f.en).map(([g,v])=>[g,"protoboard."+v]))):h?(ts(a,h.dx,h.dy,c),a.en=h.en):delete a.en,ae(C.get(a.id)),co(),Ut(),!!(f||h)}let Be=[];function Mn(a){os();let r=n.protoboard&&es(a),c=C.get("protoboard");if(r&&c)Be=Object.values(r.en).map(f=>c.pines.get(f).div);else{let f=Qi(a);f&&(Be=Object.values(f.en).map(h=>zo(h)).filter(Boolean).map(h=>h.div))}Be.forEach(f=>f.classList.add("tc-destino"))}function os(){Be.forEach(a=>a.classList.remove("tc-destino")),Be=[]}function co(){let a=C.get("protoboard");if(a){let c=Aa(null);for(let[f,h]of a.pines)h.div.classList.toggle("tc-ocupado",c.has(f))}let r=new Set(n.componentes.flatMap(c=>Object.values(c.en||{}).filter(f=>!me(f))));for(let[c,f]of C)if(c!=="protoboard")for(let[h,g]of f.pines)g.div.classList.toggle("tc-ocupado",r.has(c+"."+h))}let Go=[];function as(a){Go.forEach(v=>v.classList.remove("tc-tira")),Go=[];let r=C.get("protoboard");if(!a||!r)return;let[c,f]=ie(a),h=c==="protoboard"?f:null;if(!h){let v=Y(c);v&&v.en&&me(v.en[f])&&(h=v.en[f].slice(11))}if(!h)return;let g=Pi(h);for(let[v,A]of r.pines)Pi(v)===g&&(A.div.classList.add("tc-tira"),Go.push(A.div))}function is(a){if(a.id==="placa")if(a.def.mostrar)a.def.mostrar(a.el,nt.simulando?nt.placa:null);else for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!nt.placa[r];else if(a.def===X.led){let r=Number(nt.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",nt.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=nt.simulando&&(nt.piezas[a.id]||nt.servos[a.id])||null;a.def.mostrar(a.el,r,(Y(a.id)||{}).props)}}function ss(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),c=r&&vn(r.getAttribute("width")),f=r&&vn(r.getAttribute("height"));return c&&f?{w:c,h:f}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function ae(a){if(!a)return;let r=Ve(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let c of a.pines.values()){let f=je(a,r,c);c.div.style.left=f.x+"px",c.div.style.top=f.y+"px"}}function je(a,r,c){let f=((r.rot||0)%360+360)%360;if(!f)return{x:r.x+c.px,y:r.y+c.py};let h=f*Math.PI/180,g=Math.round(Math.cos(h)*1e9)/1e9,v=Math.round(Math.sin(h)*1e9)/1e9,A=a.w/2,_=a.h/2,P=c.px-A,U=c.py-_;return{x:rt(r.x+A+P*g-U*v),y:rt(r.y+_+P*v+U*g)}}function ie(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function Vt(a){let[r,c]=ie(a),f=C.get(r);if(!f||!f.lista)return null;let h=Ve(r),g=zo(a);return g?je(f,h,g):f.def?null:{x:h.x+f.w/2,y:h.y+f.h/2}}function zo(a){let[r,c]=ie(a),f=C.get(r);if(!f)return null;if(f.pines.has(c))return f.pines.get(c);if(f.def===X.shield_nano_io&&Ai[c])return zo("placa."+Ai[c]);let h=r==="placa"&&ee(o)?(Re(o).puentes.find(g=>g.includes(c))||[c])[0]:c;return f.pines.get(h)}function Wo(a){let r=Vt(a.de),c=Vt(a.a);return!r||!c?null:[r,...(a.puntos||[]).map(([f,h])=>({x:f,y:h})),c]}function be(a,r,c){let f=document.createElementNS(un,a);for(let h in r)f.setAttribute(h,r[h]);return c.appendChild(f),f}function Ut(){for(let[a,r]of N)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(c=>c.remove()),N.delete(a));n.cables.forEach((a,r)=>{let c=N.get(a);if(!c){let _=be("g",{class:"tc-cable"},ot);c={g:_,borde:be("path",{class:"tc-cable-borde"},_),linea:be("path",{class:"tc-cable-linea"},_),p0:be("circle",{class:"tc-punta",r:2.4},_),p1:be("circle",{class:"tc-punta",r:2.4},_),toque:be("path",{class:"tc-cable-toque"},_),asas:[]},N.set(a,c)}let f=Wo(a);if(c.g.style.display=f?"":"none",!f)return;let h=Fi(f),g=Wi(a.color);for(let _ of[c.borde,c.linea,c.toque])_.setAttribute("d",h);c.linea.setAttribute("stroke",g),c.toque.dataset.i=r,rs(c.p0,f[0],g),rs(c.p1,f[f.length-1],g);let v=!!(S&&S.tipo==="cable"&&S.cable===a);c.g.classList.toggle("tc-seleccionado",v),v&&ot.lastChild!==c.g&&ot.appendChild(c.g);let A=v?(a.puntos||[]).length:0;for(;c.asas.length>A;)c.asas.pop().remove();for(;c.asas.length<A;)c.asas.push(be("circle",{class:"tc-asa",r:3.6},ro));c.asas.forEach((_,P)=>{_.setAttribute("cx",a.puntos[P][0]),_.setAttribute("cy",a.puntos[P][1]),_.dataset.i=r,_.dataset.p=P})})}function rs(a,r,c){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",c)}function Le(){let a=I&&Vt(I.de);if(!a){kt.setAttribute("d",""),xe.setAttribute("d","");return}let r=I.puntos.map(v=>({...v})),c=r.length?r[r.length-1]:a,f=I.cursor?Fo(I.cursor,c):c,h=I.destino&&Vt(I.destino);h&&(f=h,cs(r,a,h));let g=Fi([a,...r,f]);kt.setAttribute("d",g),xe.setAttribute("d",g),xe.setAttribute("stroke",Wi(ns()))}function ns(){return I.color||wi(I.de,I.destino||"")}function Fo(a,r){let c=gn/u.escala;return{x:rt(Math.abs(a.x-r.x)<c?r.x:a.x),y:rt(Math.abs(a.y-r.y)<c?r.y:a.y)}}function cs(a,r,c){if(!a.length)return;let f=gn/u.escala,h=a[a.length-1],g=a.length>1?a[a.length-2]:r;Math.abs(h.y-c.y)<f&&h.y!==g.y&&(h.y=c.y),Math.abs(h.x-c.x)<f&&h.x!==g.x&&(h.x=c.x)}function On(a){Et(null),I={de:a,puntos:[],cursor:null,destino:null,color:null},w.classList.add("tc-dibujando"),ps(a,!0),Le(),Ho(),jt()}function wa(){I&&(ps(I.de,!1),I=null,w.classList.remove("tc-dibujando"),Le(),Ho(),jt())}function ls(a){if(eo[a]){if(I)I.color=a,Le();else if(S&&S.tipo==="cable"){if(S.cable.color===a)return;S.cable.color=a,Ut(),gt()}else return;Ho()}}function ds(a){let r=I;if(!r)return;if(a===r.de)return wa();let c=Vt(r.de),f=Vt(a);if(c&&f&&cs(r.puntos,c,f),wa(),n.cables.some(g=>g.de===r.de&&g.a===a||g.de===a&&g.a===r.de)){$s("Esos dos pines ya est\xE1n unidos.");return}let h={de:r.de,a,color:r.color||wi(r.de,a)};r.puntos.length&&(h.puntos=r.puntos.map(g=>[rt(g.x),rt(g.y)])),n.cables.push(h),pt("cable_agregado",{de:h.de,a:h.a}),Et({tipo:"cable",cable:h}),gt()}function kn(a){let r=I.puntos.length?I.puntos[I.puntos.length-1]:Vt(I.de);I.puntos.push(r?Fo(a,r):a),Le(),jt()}function Nn(){!I||!I.puntos.length||(I.puntos.pop(),Le(),jt())}function ps(a,r){let c=zo(a);c&&c.div.classList.toggle("tc-activo",r)}function Ra(a){n.cables=n.cables.filter(r=>r!==a),pt("cable_quitado",{de:a.de,a:a.a})}function Et(a){S=a;for(let r of C.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);Ut(),Ho(),jt()}function Ho(){if(Ea(),Ot.textContent="",i||!S&&!I)return;let a=c=>Ot.insertAdjacentHTML("beforeend",c),r=c=>$i.forEach((f,h)=>{let g=eo[f],v=Br[f]||f;a(`<button type="button" class="tc-muestra${c===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${h} \xB7 ${v}" aria-label="Cable ${v} (tecla ${h})" style="background:${g};color:${hl(g)}">${h}</button>`)});if(I){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(ns());return}if(S.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r(S.cable.color);else if(S.id==="protoboard")a(`<span class="tc-etiqueta">${(Wt[n.protoboard.tipo]||Wt.media).nombre}</span>`);else{let c=Y(S.id),f=X[c.tipo],h=C.get(c.id);a(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),ge(c)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let lo=null,Bt=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Ea(){let a=S&&S.tipo==="comp"&&!I?S.id==="protoboard"?"protoboard":(Y(S.id)||{}).tipo:null,r=a&&No[a];if(J.hidden=!r||!x.hidden,!r)return J.textContent="";lo===null&&B.clientWidth&&(lo=B.clientWidth>=900);let c=lo!==!1,f=S.id==="protoboard"?null:Y(S.id),h=f&&X[f.tipo],g=f&&C.get(f.id),v="";if(f&&h&&!i){for(let A of h.campos||(h.campo?[h.campo]:[])){let _=String(f.props[A.prop]),P=A.opciones.map(([U,G])=>`<option value="${U}"${_===String(U)?" selected":""}>${G}</option>`).join("");v+=`<label class="tc-campo">${A.etiqueta} <select data-prop="${A.prop}">${P}</select></label>`}if(h.perilla){let A=Math.round((Number(f.props[h.perilla.prop])||0)*100);v+=`<label class="tc-campo">${h.perilla.etiqueta} <input type="range" min="0" max="100" value="${A}" data-perilla aria-label="${h.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let A=g&&g.el.value?" checked":"";v+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${A}> Ver encendido</label>`}}J.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${c}" aria-label="Ficha de ${Bt(r.nombre)}: ${c?"ocultar los detalles":"ver los detalles"}"><span>${Bt(r.nombre)}${f?` <small>${Bt(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${c?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${c||v?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${c?"":" hidden"}>${Bt(r.descripcion)}</p>`+(v?`<div class="tc-ficha-props">${v}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${c?"":" hidden"}></div></div>`,Pa(),fs()}function fs(){if(J.hidden||!S)return;let a=C.get(S.id),r=S.id==="protoboard"?n.protoboard:Y(S.id),c=!1;a&&r&&(c=u.px+(r.x+a.w/2)*u.escala>B.clientWidth/2),J.classList.toggle("tc-ficha-izq",c)}function Pa(){let a=J.querySelector(".tc-ficha-datos");if(!a||!S)return;let r=S.id==="protoboard"?"protoboard":(Y(S.id)||{}).tipo,c=No[r];if(!c)return;let f=S.id==="protoboard"?{}:Y(S.id).props||{},h=c.validacion(f);a.innerHTML=`<dl>${c.datos(f).map(([g,v])=>`<dt>${Bt(g)}</dt><dd>${Bt(v)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${Bt(c.pines)}</p>`+(h?`<p class="tc-ficha-val ${h.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${h.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${Bt(h.texto)}</p>`:"")}J.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(lo=lo===!1,Ea(),J.querySelector(".tc-ficha-titulo").focus())});let hs=!1;function us(){if(!hs){hs=!0;for(let a of zi){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let c of a.piezas){let f=No[c],h=document.createElement("button");h.type="button",h.className="tc-pieza",h.dataset.accion=c==="protoboard"?"protoboard":"agregar",c!=="protoboard"&&(h.dataset.tipo=c),h.dataset.pieza=c,h.setAttribute("aria-label",f.nombre),h.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${Bt(f.nombre)}</b><small>${Bt(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,h.querySelector(".tc-mini").append(Vn(c)),r.append(h)}k.append(r)}}}function Vn(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=Ti("media"),r.content.firstElementChild;let c=X[a];if(c.dibujo)return r.innerHTML=c.dibujo.svg(a==="motor_tt"?{...c.props,vista:"rueda"}:c.props),r.content.firstElementChild;let f=document.createElement(c.etiqueta);return c.aplicar&&c.aplicar(f,Rt(c.props)),Promise.resolve(f.updateComplete).then(()=>{let h=ss(f);f.style.zoom=String(Math.min(1,58/h.w,42/h.h))}),f.inert=!0,f}function ms(){let a=new Set(hn(E.value).filter(r=>!X[r.tipo]?.placas||X[r.tipo].placas.includes(o)).map(r=>r.tipo));for(let r of k.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of k.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");j.hidden=a.size>0,j.textContent=a.size?"":`No hay piezas con \xAB${E.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}E.addEventListener("input",ms),E.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=k.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let vt=null,Ta=!1;x.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||i||a.button!==0||(vt={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),x.addEventListener("pointermove",a=>{if(!vt)return;if(!vt.fantasma){if(Math.hypot(a.clientX-vt.x0,a.clientY-vt.y0)<xn)return;let c=document.createElement("div");c.className="tc-fantasma",c.append(vt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),w.append(c),vt.fantasma=c,x.classList.add("tc-arrastrando")}let r=w.getBoundingClientRect();vt.fantasma.style.left=a.clientX-r.left+"px",vt.fantasma.style.top=a.clientY-r.top+"px"});function xs(a,r){if(!vt)return;let{b:c,fantasma:f}=vt;if(vt=null,x.classList.remove("tc-arrastrando"),!f||(f.remove(),Ta=!0,setTimeout(()=>Ta=!1,0),r))return;let h=B.getBoundingClientRect(),g=x.getBoundingClientRect(),v=A=>a.clientX>=A.left&&a.clientX<=A.right&&a.clientY>=A.top&&a.clientY<=A.bottom;!v(h)||v(g)||(po(!1),c.dataset.accion==="protoboard"?Zi(ho(a)):gs(c.dataset.tipo,ho(a)))}x.addEventListener("pointerup",a=>xs(a,!1)),x.addEventListener("pointercancel",a=>xs(a,!0));function gs(a,r=null){let c=X[a];if(!c||c.placas&&!c.placas.includes(o)||c.montada&&n.componentes.some(P=>P.tipo===a))return;let f=1;for(;Y(c.prefijo+f);)f++;let h=c.prefijo+f,g=(B.clientWidth/2-u.px)/u.escala,v=(B.clientHeight/2-u.py)/u.escala,A=n.componentes.length%4*14,_={id:h,tipo:a,x:c.montada?0:Math.round(g-20+A),y:c.montada?0:Math.round(v-20+A),rot:0,props:Rt(c.props)};n.componentes.push(_),jo(h,a,_.props).then(()=>{let P=C.get(h);r&&P&&!c.montada&&Y(h)===_&&(_.x=Math.round(r.x-P.w/2),_.y=Math.round(r.y-P.h/2),ae(P),Ut(),gt()),Y(h)===_&&(n.protoboard||r)&&$a(_,{enchufar:!!r})&&(pt("componente_cambiado",{id:h,x:_.x,y:_.y,en:Rt(_.en)}),gt())}),pt("componente_agregado",{id:h,tipo:a}),Et({tipo:"comp",id:h}),gt()}function Un(a){let r=C.get(a.id);if(r){r.div.remove();for(let c of r.pines.values())c.div.remove();C.delete(a.id)}jo(a.id,a.tipo,a.props).then(()=>{_a(),Ut(),S&&S.id===a.id&&Et({tipo:"comp",id:a.id})})}function bs(){if(!S||S.tipo!=="comp"||S.id==="protoboard")return;let a=Y(S.id);ge(a)||(a.rot=((a.rot||0)+90)%360,ae(C.get(a.id)),$a(a,{enchufar:!1}),_a(),Ut(),pt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Rt(a.en):null}),gt())}function ys(){if(S){if(S.tipo==="cable")Ra(S.cable);else if(S.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>Ra(r));for(let r of n.componentes)if(r.en){for(let[c,f]of Object.entries(r.en))me(f)&&delete r.en[c];Object.keys(r.en).length||delete r.en}n.protoboard=null;let a=C.get("protoboard");a&&(a.div.remove(),C.delete("protoboard")),Go=[],Be=[],Lo(),pt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=Y(S.id),r=C.get(S.id);if(n.cables.filter(c=>c.de.startsWith(a.id+".")||c.a.startsWith(a.id+".")).forEach(c=>Ra(c)),n.componentes=n.componentes.filter(c=>c!==a),r){r.div.remove();for(let c of r.pines.values())c.div.remove();C.delete(a.id)}pt("componente_quitado",{id:a.id,tipo:a.tipo});for(let c of n.componentes)if(!(!c.en||!Object.values(c.en).some(f=>ie(f)[0]===a.id))){for(let[f,h]of Object.entries(c.en))ie(h)[0]===a.id&&delete c.en[f];Object.keys(c.en).length||delete c.en,pt("componente_cambiado",{id:c.id,x:c.x,y:c.y,en:c.en?Rt(c.en):null})}co()}Ko(),Et(null),gt()}}function po(a){x.hidden=!a,Ea(),Mt.setAttribute("aria-expanded",String(a)),a&&(us(),Lo(),ms(),E.focus({preventScroll:!0}))}x.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||Ta)){if(po(!1),r.dataset.accion==="cerrar")return Mt.focus();Cs(r)}}),x.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),po(!1),Mt.focus())}),y.addEventListener("pointerdown",a=>{!x.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==Mt&&po(!1)}),T.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return po(x.hidden);Cs(r)}});function Cs(a){let r=a.dataset.accion;if(r==="acercar")return Da(1.25);if(r==="alejar")return Da(.8);if(r==="encuadrar")return no=!1,uo();i||(r==="agregar"?gs(a.dataset.tipo):r==="protoboard"?Zi():r==="girar"?bs():r==="borrar"?ys():r==="color"&&(ls(a.dataset.color),B.focus({preventScroll:!0})))}function Bn(a){if(i||!S||S.tipo!=="comp")return;let r=Y(S.id),c=C.get(S.id),f=X[r.tipo];if(a.target.dataset.accion==="encender"){c.el.value=a.target.checked;return}let h=a.target.dataset.prop;if(!h||!f)return;let g=typeof f.props[h],v=g==="number"?Number(a.target.value):g==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[h]:v},f.dibujo&&f.dibujo.marco?Un(r):f.aplicar(c.el,r.props),Pa(),pt("componente_cambiado",{id:r.id,props:Rt(r.props)}),gt()}function jn(a){if(i||!S||S.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=C.get(S.id);vs(S.id,Number(a.target.value)/100),r&&X.potenciometro.aplicar(r.el,Y(S.id).props)}for(let a of[T,J])a.addEventListener("change",Bn),a.addEventListener("input",jn);function fo(a,r,c){let f=C.get(a);if(f&&(f.el.pressed=r),r)Sa.add(a);else if(!Sa.delete(a))return;for(let h of Ki)try{h(a,r)}catch(g){console.error(g)}!r&&c!==void 0&&pt("boton_pulsado",{id:a,ms:Math.round(c)})}let Ss=new Map;function vs(a,r){let c=Y(a),f=C.get(a);if(!c)return;let h=X[c.tipo];if(i)return f&&h.aplicar(f.el,c.props);let g=Math.max(0,Math.min(1,Math.round(r*100)/100));if(g===c.props[h.perilla.prop])return;c.props={...c.props,[h.perilla.prop]:g};let v=S&&S.tipo==="comp"&&S.id===a&&J.querySelector("[data-perilla]");v&&Number(v.value)!==Math.round(g*100)&&(v.value=Math.round(g*100)),S&&S.id===a&&Pa(),gt(),clearTimeout(Ss.get(a)),Ss.set(a,setTimeout(()=>pt("componente_cambiado",{id:a,props:Rt(c.props)}),400))}function ho(a){let r=B.getBoundingClientRect();return{x:(a.clientX-r.left-u.px)/u.escala,y:(a.clientY-r.top-u.py)/u.escala}}function Ia(a){try{B.setPointerCapture(a.pointerId)}catch{}}function qo(a,r={}){O={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:u.px,py0:u.py,movido:!1,...r},Ia(a)}B.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;B.focus({preventScroll:!0}),Ko();let r=a.target,c=ho(a);if(i)return qo(a);let f=r.closest(".tc-pin");if(f){if(a.preventDefault(),I)return ds(f.dataset.ref);On(f.dataset.ref),O={tipo:"pin",ref:f.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(I)return qo(a,{punto:c});let h=r.closest(".tc-asa");if(h)return O={tipo:"asa",cable:n.cables[+h.dataset.i],k:+h.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},Ia(a);let g=r.closest(".tc-cable-toque");if(g)return Et({tipo:"cable",cable:n.cables[+g.dataset.i]});let v=r.closest(".tc-comp");if(v&&v.dataset.id!=="placa"){let A=v.dataset.id,_=Bo(A);if(_.tipo==="pulsador"&&(a.preventDefault(),nt.simulando)){fo(A,!0),O={tipo:"pulsar",id:A,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}if(Et({tipo:"comp",id:A}),ge(_))return qo(a);if(X[_.tipo]&&X[_.tipo].perilla&&a.composedPath().some(ml))return;let P=A==="protoboard"?[...new Set(n.componentes.filter(U=>Object.values(U.en||{}).some(me)).flatMap(U=>[U,...Ue(U.id)]))]:Ue(A);return O={tipo:"mover",id:A,dx:c.x-_.x,dy:c.y-_.y,x0:a.clientX,y0:a.clientY,movido:!1,grupo:P},Ia(a)}Et(null),qo(a)}),B.addEventListener("pointermove",a=>{let r=ho(a);if(O&&O.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${O.id}"]`))){let c=O;O=null,fo(c.id,!1,performance.now()-c.desde)}if(O){if(!O.movido&&Math.hypot(a.clientX-O.x0,a.clientY-O.y0)>xn&&(O.movido=!0,J.classList.add("tc-ficha-quieta")),O.movido&&O.tipo==="mover"){let c=Bo(O.id),f=Math.round(r.x-O.dx),h=Math.round(r.y-O.dy);for(let g of O.grupo||[])g.x=rt(g.x+f-c.x),g.y=rt(g.y+h-c.y),ae(C.get(g.id));c.x=f,c.y=h,ae(C.get(O.id)),O.id!=="protoboard"&&Mn(c),Ut()}else if(O.movido&&O.tipo==="paneo")no=!0,u.px=O.px0+a.clientX-O.x0,u.py=O.py0+a.clientY-O.y0,B.classList.add("tc-paneando"),Xo();else if(O.movido&&O.tipo==="asa"){let c=Wo(O.cable),f=Fo(r,c[O.k]);f=Fo(f,c[O.k+2]),O.cable.puntos[O.k]=[f.x,f.y],Ut()}}if(I){let c=a.target.closest&&a.target.closest(".tc-pin");I.cursor=r,I.destino=c&&c.dataset.ref!==I.de?c.dataset.ref:null,Le()}(!O||O.tipo==="pin")&&Fn(a.target.closest&&a.target.closest(".tc-pin")),nt.simulando&&As(a.target)});function As(a){let r=[],c=a&&a.closest&&a.closest(".tc-pin"),f=a&&a.closest&&a.closest(".tc-cable-toque");c?r=[c.dataset.ref]:f&&n.cables[+f.dataset.i]&&(r=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let h=r.join("|");if(h!==va){va=h;for(let g of Ji)g(r)}}function _s(a){let r=O;if(O=null,B.classList.remove("tc-paneando"),J.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&fs(),!!r){if(r.tipo==="pulsar")return fo(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let c=Bo(r.id);r.id==="protoboard"?pt("componente_cambiado",{id:"protoboard",x:c.x,y:c.y}):(os(),$a(c),pt("componente_cambiado",{id:r.id,x:c.x,y:c.y,en:c.en?Rt(c.en):null})),_a(),gt()}else if(r.tipo==="asa"&&r.movido)gt();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&I)kn(r.punto);else if(r.tipo==="pin"&&r.movido&&I&&a.type==="pointerup"){let c=y.elementFromPoint(a.clientX,a.clientY),f=c&&c.closest(".tc-pin");f&&f.dataset.ref!==r.ref&&ds(f.dataset.ref)}}}B.addEventListener("pointerup",_s),B.addEventListener("pointercancel",_s),B.addEventListener("pointerleave",()=>{if(Ko(),va&&As(null),O&&O.tipo==="pulsar"){let a=O;O=null,fo(a.id,!1,performance.now()-a.desde)}}),B.addEventListener("dblclick",a=>{if(i||I)return;let r=y.elementFromPoint(a.clientX,a.clientY)||a.target,c=r.closest(".tc-asa"),f=r.closest(".tc-cable-toque");if(c){let h=n.cables[+c.dataset.i];h.puntos.splice(+c.dataset.p,1),h.puntos.length||delete h.puntos,Ut(),jt(),gt()}else if(f){let h=n.cables[+f.dataset.i],g=Wo(h),v=ho(a),A=0,_=v,P=1/0;for(let U=0;U<g.length-1;U++){let G=ul(v,g[U],g[U+1]);Vo(v,G)<P&&(P=Vo(v,G),A=U,_=G)}(h.puntos=h.puntos||[]).splice(A,0,[rt(_.x),rt(_.y)]),Et({tipo:"cable",cable:h}),gt()}}),B.addEventListener("wheel",a=>{a.preventDefault();let r=B.getBoundingClientRect(),c=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));Da(c,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),w.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,c=!0;a.key==="Escape"?I?wa():Et(null):i?c=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),I?Nn():ys()):(a.key==="r"||a.key==="R")&&r?bs():/^[0-9]$/.test(a.key)&&r&&(I||S&&S.tipo==="cable")?ls($i[Number(a.key)]):c=!1,c&&a.stopPropagation()});function Xo(){Ht.style.transform=`translate(${u.px}px, ${u.py}px) scale(${u.escala})`;let a=cl*u.escala;B.style.backgroundSize=`${a}px ${a}px`,B.style.backgroundPosition=`${u.px}px ${u.py}px`,Ko()}function Da(a,r,c){no=!0,r===void 0&&(r=B.clientWidth/2,c=B.clientHeight/2);let f=Math.min(ll,Math.max(yn,u.escala*a)),h=(r-u.px)/u.escala,g=(c-u.py)/u.escala;Object.assign(u,{escala:f,px:r-h*f,py:c-g*f}),Xo()}function Ma(){let a=1/0,r=1/0,c=-1/0,f=-1/0,h=(g,v)=>{a=Math.min(a,g),r=Math.min(r,v),c=Math.max(c,g),f=Math.max(f,v)};for(let g of C.values()){let v=Ve(g.id);if(!v)continue;let A=(v.rot||0)%180!==0,_=(A?g.h:g.w)/2,P=(A?g.w:g.h)/2;h(v.x+g.w/2-_,v.y+g.h/2-P),h(v.x+g.w/2+_,v.y+g.h/2+P)}for(let g of n.cables)for(let[v,A]of g.puntos||[])h(v,A);return isFinite(a)?{x0:a,y0:r,x1:c,y1:f}:null}function uo(){let a=B.clientWidth,r=B.clientHeight;if(!a||!r)return!1;let c=Ma();if(!c)return!1;let{x0:f,y0:h,x1:g,y1:v}=c,A=48,_=Math.min((a-2*A)/(g-f||1),(r-2*A)/(v-h||1)),P=Math.min(2.4,Math.max(yn,_));return Object.assign(u,{escala:P,px:a/2-(f+g)/2*P,py:r/2-(h+v)/2*P}),Uo={ancho:a,alto:r},Xo(),!0}function Ln(){let a=Ma()||{x0:0,y0:0,x1:100,y1:100},r=12,c=16,f=Math.max(rl,Math.ceil(a.x1-a.x0+2*r)),h=Math.ceil(a.y1-a.y0+2*r)+c,g=[`<svg xmlns="${un}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${h}" viewBox="0 0 ${f} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${rt(r-a.x0)} ${rt(r-a.y0)})">`];for(let v of R.children){let A=C.get(v.dataset.id);A&&A.lista&&g.push(Gn(A))}for(let v of n.cables){let A=Wo(v);if(!A)continue;let _=Fi(A),P=Wi(v.color),U=G=>`<circle cx="${G.x}" cy="${G.y}" r="2.4" fill="${P}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;g.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${_}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${_}" stroke="${P}" stroke-width="3"/>${U(A[0])}${U(A[A.length-1])}</g>`)}return g.push("</g>",`<text x="${f-r}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${Sn(sl)}</text>`,"</svg>"),g.join(`
`)}function Gn(a){let r=Ve(a.id);if(!r)return"";let c=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let yt=Sn((Y(a.id)||{}).tipo||"");return`<g transform="${c}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${yt}?</text></g>`}let f=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!f)return"";let h=f.cloneNode(!0),g=[],v=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;v.nextNode();)g.push(v.currentNode);g.forEach(yt=>yt.remove());let A=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),_=h.querySelector("#rotating");A&&_&&_.setAttribute("transform",`rotate(${A[1]} 10 8)`),h.setAttribute("width",rt(a.w)),h.setAttribute("height",rt(a.h)),h.removeAttribute("id");let P="tc-"+a.id,U=[...new Set([...h.querySelectorAll("[id]")].map(yt=>yt.id))],G=new XMLSerializer().serializeToString(h);for(let yt of U)G=pl(G,yt,P);G=G.replace(/^<svg\b/,`<svg id="${P}"`);let qt=a.el.shadowRoot?fl(a.el,P,U):"";return`<g transform="${c}">${qt?`<style><![CDATA[
${qt}
]]></style>`:""}${G}</g>`}function zn(a){let[r,c]=ie(a);if(r==="placa")return wt[o].rotulo(c);if(r==="protoboard")return zr(c);let f=Y(r),h=f&&X[f.tipo],g=f&&f.en&&f.en[c],v=g?me(g)?` \xB7 en el hueco ${g.slice(11)}`:` \xB7 enchufada en ${Wn(g)}`:"";return h?`${h.nombre}: ${h.rotulo(c)}${v}`:c}function Wn(a){let[r,c]=ie(a);return r==="placa"?`${c} de ${wt[o].nombre}`:`${r} \xB7 ${c}`}function Fn(a){let r=a?a.dataset.ref:null;if(r===ke)return;ke=r,as(r);let c=r&&Vt(r);if(!c){Nt.hidden=!0;return}let f=u.py+c.y*u.escala,h=nt.voltajes[r],g=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;Nt.textContent=zn(r)+g,Nt.style.left=u.px+c.x*u.escala+"px",Nt.style.top=f+"px",Nt.classList.toggle("tc-abajo",f<44),Nt.hidden=!1}function Ko(){ke=null,Nt.hidden=!0,as(null)}function jt(){clearTimeout(Ne),xt.classList.remove("tc-aviso");let a=S&&S.tipo==="cable"&&S.cable.puntos&&S.cable.puntos.length;xt.textContent=i?"Solo lectura: puedes mover la vista y hacer zoom.":I?I.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":S&&S.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":S&&ge(Y(S.id))?`Va montada sobre ${wt[o].nombre}: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla`:S&&S.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":S&&n.protoboard?"Arr\xE1stralo para moverlo \xB7 Su\xE9ltalo sobre la protoboard o sobre un pin para conectarlo (se ve en verde) \xB7 R: girar \xB7 Supr: borrar":S?"Arr\xE1stralo para moverlo \xB7 Su\xE9ltalo sobre un pin para enchufarlo (se ve en verde) \xB7 R: girar \xB7 Supr: borrar":nt.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function $s(a,r=2500){jt(),xt.textContent=a,xt.classList.add("tc-aviso"),Ne=setTimeout(jt,r)}function pt(a,r){if(s)try{s({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(c){console.error(c)}}function gt(){let a=Rt(n);for(let r of l)try{r(a)}catch(c){console.error(c)}}function ws(a){w.classList.toggle("tc-oscuro",a==="oscuro"),w.classList.toggle("tc-claro",a==="claro")}let Hn={circuito:()=>Rt(n),alCambiar(a){typeof a=="function"&&l.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:ws,exportarSVG:Ln,exportarNetlist:a=>Qr(n,a),_alPulsar(a){typeof a=="function"&&Ki.push(a)},_alAcercar(a){typeof a=="function"&&Ji.push(a)},_mostrar(a){let r=nt.simulando;nt={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==nt.simulando&&(w.classList.toggle("tc-simulando",nt.simulando),nt.simulando||[...Sa].forEach(c=>fo(c,!1)),jt()),ke=null;for(let c of C.values())c.lista&&is(c)},destruir(){Ca=!0,Rs.disconnect(),clearTimeout(Ne),l.length=0,C.clear(),N.clear(),m.remove()}};e.tema&&ws(e.tema),i&&w.classList.add("tc-solo-lectura"),Xo(),jt();let Rs=new ResizeObserver(()=>{if(!Xi||Ca)return;if(!ya){ya=uo();return}if(no||!Uo)return;let a=(r,c)=>Math.abs(r-c)/Math.max(1,c);(a(B.clientWidth,Uo.ancho)>.1||a(B.clientHeight,Uo.alto)>.1)&&uo()});Rs.observe(B);let qn=jo("placa");return i||us(),Lo(),Promise.all([qn,...n.protoboard?[Yi()]:[],...n.componentes.map(a=>jo(a.id,a.tipo,a.props))]).then(()=>{if(Ca)return;Xi=!0,co(),Ut(),ya=uo();let a=[p.length?`Se quit\xF3 lo que no va en ${wt[o].nombre}: ${p.join(" y ")}.`:"",d.n===1?"Se solt\xF3 1 conexi\xF3n directa sin destino.":d.n?`Se soltaron ${d.n} conexiones directas sin destino.`:""].filter(Boolean).join(" ");a&&$s(a,1e4)}),Hn}function dl(t,e,o=[],i={n:0}){let s=t&&typeof t=="object"?Rt(t):{};s.formato=s.formato||1,s.placa=e;let l=new Set;s.componentes=(Array.isArray(s.componentes)?s.componentes:[]).filter(x=>x&&typeof x.id=="string"&&x.id&&x.id!=="placa"&&!x.id.includes(".")&&!l.has(x.id)&&l.add(x.id)),!t&&ee(e)&&s.componentes.push({id:"exp1",tipo:"shield_nano_io",x:0,y:0,rot:0,props:{}});let p=new Set,d=new Set;s.componentes=s.componentes.filter(x=>{let E=X[x.tipo],k=E?.montada&&(E.placas&&!E.placas.includes(e)||p.has(x.tipo));return E?.montada&&p.add(x.tipo),k&&(d.add(x.id),o.push(E.nombre)),!k});for(let x of s.componentes){x.x=Number(x.x)||0,x.y=Number(x.y)||0,x.rot=Number(x.rot)||0;let E=X[x.tipo]?X[x.tipo].props:{};x.props={...E,...x.props&&typeof x.props=="object"?x.props:{}},X[x.tipo]?.montada&&(delete x.en,x.x=0,x.y=0,x.rot=0)}s.cables=(Array.isArray(s.cables)?s.cables:[]).filter(x=>x&&typeof x.de=="string"&&typeof x.a=="string");let n=Re(e).pines,m=x=>{let E=x.indexOf("."),k=E>0?x.slice(0,E):x;return d.has(k)||k==="placa"&&!n.includes(x.slice(E+1))},y=s.cables.length;s.cables=s.cables.filter(x=>!m(x.de)&&!m(x.a));let b=y-s.cables.length;b&&o.push(b===1?"1 cable":`${b} cables`);for(let x of s.cables){let E=Array.isArray(x.puntos)&&x.puntos.every(k=>Array.isArray(k)&&k.length===2&&k.every(Number.isFinite));"puntos"in x&&!E&&delete x.puntos}!s.protoboard||typeof s.protoboard!="object"?s.protoboard=null:(typeof s.protoboard.tipo!="string"&&(s.protoboard.tipo="media"),s.protoboard.x=Number(s.protoboard.x)||0,s.protoboard.y=Number(s.protoboard.y)||0);let w=Re(e).pinesModulo||n,T=new Set;for(let x of s.componentes)if("en"in x){if(!x.en||typeof x.en!="object"||Array.isArray(x.en)){delete x.en;continue}for(let[E,k]of Object.entries(x.en)){let j=typeof k=="string"&&Cn(s,x.id+"."+E,w)&&!T.has(k);j&&k.startsWith("protoboard.")?s.protoboard?T.add(k):delete x.en[E]:j&&Cn(s,k,w)&&!k.startsWith(x.id+".")?T.add(k):(delete x.en[E],i.n++)}Object.keys(x.en).length||delete x.en}return s}function Cn(t,e,o){let i=e.indexOf(".");if(i<=0)return!1;let s=e.slice(0,i),l=e.slice(i+1);if(s==="placa")return o.includes(l);let p=t.componentes.find(m=>m.id===s);if(!p)return!1;let d=X[p.tipo];if(!d)return!0;if(!d.dibujo)return Gi[p.tipo]?Gi[p.tipo].includes(l):!0;let n=d.dibujo.marco?d.dibujo.marco(p.props||{}):d.dibujo;return!n.pines||l in n.pines}var $n=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Sn=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function pl(t,e,o){let i=$n(e),s=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${i}"`,"g"),(l,p)=>`${p}id="${s}"`).replace(new RegExp(`url\\(#${i}\\)`,"g"),()=>`url(#${s})`).replace(new RegExp(`href="#${i}"`,"g"),()=>`href="#${s}"`)}function fl(t,e,o){let i=t.shadowRoot,s=[...i.adoptedStyleSheets||[]];i.querySelectorAll("style").forEach(p=>p.sheet&&s.push(p.sheet));let l=[];for(let p of s){let d;try{d=p.cssRules}catch{continue}for(let n of d){if(!n.selectorText||!n.style)continue;let m=n.selectorText.split(",").map(b=>b.trim()).filter(b=>!/:host|\binput\b|:focus|\.hide-input/.test(b));if(!m.length)continue;let y=m.map(b=>{let w=b;for(let T of o)w=w.replace(new RegExp(`#${$n(T)}(?![\\w-])`,"g"),()=>`#${e}-${T}`);return/^svg\b/.test(w)?w.replace(/^svg\b/,`#${e}`):`#${e} ${w}`});l.push(`${y.join(", ")} { ${n.style.cssText} }`)}}return l.join(`
`)}function hl(t){let[e,o,i]=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)/255);return .2126*e+.7152*o+.0722*i>.55?"#1d2733":"#ffffff"}function vn(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function Fi(t){let e=i=>`${rt(i.x)} ${rt(i.y)}`,o=`M${e(t[0])}`;for(let i=1;i<t.length-1;i++){let s=t[i-1],l=t[i],p=t[i+1],d=Math.min(5,Vo(s,l)/2,Vo(l,p)/2);o+=` L${e(An(l,s,d))} Q${e(l)} ${e(An(l,p,d))}`}return`${o} L${e(t[t.length-1])}`}function An(t,e,o){let i=Vo(t,e);return i?{x:t.x+(e.x-t.x)*o/i,y:t.y+(e.y-t.y)*o/i}:t}function ul(t,e,o){let i=o.x-e.x,s=o.y-e.y,l=i*i+s*s,p=l?Math.max(0,Math.min(1,((t.x-e.x)*i+(t.y-e.y)*s)/l)):0;return{x:e.x+p*i,y:e.y+p*s}}function ml(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}var Hi={0:null,1:0,2:2,3:4,4:2,5:4};function wn(t){let e=new Uint8Array(32768),o=0,i=!1;for(let[s,l]of String(t).split(/\r?\n/).entries()){let p=l.trim();if(!p)continue;if(!/^:([0-9a-f]{2})+$/i.test(p))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${s+1}).`);let d=p.slice(1).match(/../g).map(T=>parseInt(T,16));if(d.reduce((T,x)=>T+x,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let[n,m,y,b]=d;if(d.length!==n+5||!(b in Hi)||Hi[b]!==null&&n!==Hi[b])throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let w=d.slice(4,4+n);if(b===0){let T=o+(m<<8|y);if(T+n>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(w,T)}else if(b===1){i=!0;break}else b===2?o=(w[0]<<8|w[1])<<4:b===4&&(o=(w[0]<<8|w[1])<<16)}if(!i)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var xl=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],qi='(()=>{function Ke(t,e){let o=t.dataView.getUint16(93,!0);t.data[o]=t.pc&255,t.data[o-1]=t.pc>>8&255,t.pc22Bits&&(t.data[o-2]=t.pc>>16&255),t.dataView.setUint16(93,o-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var ia=256,na=128,pe=class{constructor(e,o=8192){this.progMem=e,this.sramBytes=o,this.data=new Uint8Array(this.sramBytes+ia),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(na),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,o,s=255){let a=this.writeHooks[e];a&&a(o,this.data[e],e,s)||(this.data[e]=o)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:o,flagMask:s,enableRegister:a,enableMask:i}=e;e.inverseFlag?this.data[o]&=~s:this.data[o]|=s,this.data[a]&i&&this.queueInterrupt(e)}updateInterruptEnable(e,o){let{enableMask:s,flagRegister:a,flagMask:i,inverseFlag:n}=e;if(o&s){let r=this.data[a]&i;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:o}=e;this.pendingInterrupts[o]=e,(this.nextInterrupt===-1||this.nextInterrupt>o)&&(this.nextInterrupt=o),o>this.maxInterrupt&&(this.maxInterrupt=o)}clearInterrupt({address:e,flagRegister:o,flagMask:s},a=!0){a&&(this.data[o]&=~s);let{pendingInterrupts:i,maxInterrupt:n}=this;if(i[e]&&(i[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(i[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,o){let{flagRegister:s,flagMask:a}=e;o&a&&(this.data[s]&=~a,this.clearInterrupt(e))}addClockEvent(e,o){let{clockEventPool:s}=this;o=this.cycles+Math.max(1,o);let a=s.pop(),i=a??{cycles:o,callback:e,next:null};i.cycles=o,i.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<o;)r=n,n=n.next;return r?(r.next=i,i.next=n):(this.nextClockEvent=i,i.next=n),e}updateClockEvent(e,o){return this.clearClockEvent(e)?(this.addClockEvent(e,o),!0):!1}clearClockEvent(e){let{nextClockEvent:o}=this;if(!o)return!1;let{clockEventPool:s}=this,a=null;for(;o;){if(o.callback===e)return a?a.next=o.next:this.nextClockEvent=o.next,s.length<10&&s.push(o),!0;a=o,o=o.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:o}=this;if(this.interruptsEnabled&&o>=0){let s=this.pendingInterrupts[o];Ke(this,s.address),s.constant||this.clearInterrupt(s)}}};function ue(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Xe(t){let e=t.progMem[t.pc];if((e&64512)===7168){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s+(t.data[95]&1),i=a&255;t.data[(e&496)>>4]=i;let n=t.data[95]&192;n|=i?0:2,n|=128&i?4:0,n|=(i^s)&(o^i)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a&256?1:0,n|=1&(o&s|s&~i|~i&o)?32:0,t.data[95]=n}else if((e&64512)===3072){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s&255;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(a^s)&(a^o)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=o+s&256?1:0,i|=1&(o&s|s&~a|~a&o)?32:0,t.data[95]=i}else if((e&65280)===38400){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=s+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(o,a,!0);let i=t.data[95]&224;i|=a?0:2,i|=32768&a?4:0,i|=~s&a&32768?8:0,i|=i>>2&1^i>>3&1?16:0,i|=~a&s&32768?1:0,t.data[95]=i,t.cycles++}else if((e&64512)===8192){let o=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===28672){let o=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65039)===37893){let o=t.data[(e&496)>>4],s=o>>>1|128&o;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let o=e&7,s=(e&496)>>4;t.data[s]=~(1<<o)&t.data[s]|(t.data[95]>>6&1)<<o}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let o=t.data[(e&496)>>4],s=e&7;t.data[95]=t.data[95]&191|(o>>s&1?64:0)}else if((e&65038)===37902){let o=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,s=t.pc+2,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc=o-1,t.cycles+=i?4:3}else if((e&65280)===38912){let o=e&248,s=e&7,a=t.readData((o>>3)+32),i=1<<s;t.writeData((o>>3)+32,a&~i,i)}else if((e&65039)===37888){let o=(e&496)>>4,s=255-t.data[o];t.data[o]=s;let a=t.data[95]&225|1;a|=s?0:2,a|=128&s?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===5120){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=((o^s)&(o^a)&128)!==0?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===1024){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===12288){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.pc+=s,t.cycles+=s}}else if((e&65039)===37898){let o=t.data[(e&496)>>4],s=o-1;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===128?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(e===38169){let o=t.pc+1,s=t.dataView.getUint16(93,!0),a=t.data[92];t.data[s]=o&255,t.data[s-1]=o>>8&255,t.data[s-2]=o>>16&255,t.dataView.setUint16(93,s-3,!0),t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let o=t.data[92];t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let o=t.data[91];t.data[0]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let o=t.data[91];t.data[(e&496)>>4]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let o=t.data[91],s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o<<16|s],t.dataView.setUint16(30,s+1,!0),s===65535&&(t.data[91]=(o+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let o=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65416)===776){let o=t.data[((e&112)>>4)+16],s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setUint16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===896){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.dataView.getInt8((e&7)+16),a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===904){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?2:0)|(o*s&32768?1:0),t.cycles++}else if(e===38153){let o=t.pc+1,s=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[s]=o&255,t.data[s-1]=o>>8&255,a&&(t.data[s-2]=o>>16&255),t.dataView.setUint16(93,s-(a?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=a?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let o=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=o}else if((e&65039)===37891){let o=t.data[(e&496)>>4],s=o+1&255;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===127?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a&255-s),t.data[o]=a}else if((e&65039)===37381){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a|s),t.data[o]=a}else if((e&65039)===37383){let o=t.data[(e&496)>>4],s=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o^s),t.data[(e&496)>>4]=s}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let o=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=o,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let o=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(26,o+1,!0)}else if((e&65039)===36878){let o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let o=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(28,o+1,!0)}else if((e&65039)===36874){let o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let o=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(30,o+1,!0)}else if((e&65039)===36866){let o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o],t.dataView.setUint16(30,o+1,!0),t.cycles+=2}else if((e&65039)===37894){let o=t.data[(e&496)>>4],s=o>>>1;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let o=2*(e&15),s=2*((e&240)>>4);t.data[s]=t.data[o],t.data[s+1]=t.data[o+1]}else if((e&64512)===39936){let o=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65280)===512){let o=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65416)===768){let o=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65039)===37889){let o=(e&496)>>4,s=t.data[o],a=0-s;t.data[o]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=a===128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=a?1:0,i|=1&(a|s)?32:0,t.data[95]=i}else if(e!==0){if((e&64512)===10240){let o=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===24576){let o=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let o=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,o,!0),t.data[(e&496)>>4]=t.data[o],t.cycles++}else if((e&65039)===37391){let o=t.dataView.getUint16(93,!0);t.data[o]=t.data[(e&496)>>4],t.dataView.setUint16(93,o-1,!0),t.cycles++}else if((e&61440)===53248){let o=(e&2047)-(e&2048?2048:0),s=t.pc+1,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc+=o,t.cycles+=i?3:2}else if(e===38152){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3}else if(e===38168){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let o=t.data[(e&496)>>4],s=o>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=1&o?1:0,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===2048){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);t.data[(e&496)>>4]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===16384){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=t.data[95],i=o-s-(a&1);t.data[((e&240)>>4)+16]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&65280)===39424){let o=((e&248)>>3)+32,s=1<<(e&7);t.writeData(o,t.readData(o)|s,s),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===38656){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=e&15|(e&192)>>2,i=s-a;t.dataView.setUint16(o,i,!0);let n=t.data[95]&192;n|=i?0:2,n|=32768&i?4:0,n|=s&~i&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a>s?1:0,n|=1&(~s&a|a&i|i&~s)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let o=t.data[(e&496)>>4],s=t.progMem[t.pc+1];t.writeData(s,o),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let o=t.dataView.getUint16(26,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(26,o+1,!0),t.cycles++}else if((e&65039)===37390){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.writeData(s,o),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0);t.writeData(s,o),t.dataView.setUint16(28,s+1,!0),t.cycles++}else if((e&65039)===37386){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let o=t.dataView.getUint16(30,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(30,o+1,!0),t.cycles++}else if((e&65039)===37378){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&61440)===20480){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s;t.data[((e&240)>>4)+16]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&65039)===37890){let o=(e&496)>>4,s=t.data[o];t.data[o]=(15&s)<<4|(240&s)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let o=(e&496)>>4,s=t.data[o],a=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=s,t.data[o]=a}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var Rt;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(Rt||(Rt={}));var Z;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(Z||(Z={}));var Uo={0:{type:Z.SingleEnded,channel:0},1:{type:Z.SingleEnded,channel:1},2:{type:Z.SingleEnded,channel:2},3:{type:Z.SingleEnded,channel:3},4:{type:Z.SingleEnded,channel:4},5:{type:Z.SingleEnded,channel:5},6:{type:Z.SingleEnded,channel:6},7:{type:Z.SingleEnded,channel:7},8:{type:Z.Temperature},14:{type:Z.Constant,voltage:1.1},15:{type:Z.Constant,voltage:0}},ra={type:Z.Constant,voltage:0},qe={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Uo,adcReferences:[Rt.AREF,Rt.AVCC,Rt.Reserved,Rt.Internal1V1]},ca=7,la=8,fa=16,Oo=64,ze=128,da=31,ha=32,xa=8,pa=8,ua=3,ma=6,me=class{constructor(e,o){this.cpu=e,this.config=o,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=s=>{var a;let i=0;switch(s.type){case Z.Constant:i=s.voltage;break;case Z.SingleEnded:i=(a=this.channelValues[s.channel])!==null&&a!==void 0?a:0;break;case Z.Differential:i=s.gain*((this.channelValues[s.positiveChannel]||0)-(this.channelValues[s.negativeChannel]||0));break;case Z.Temperature:i=.378125;break}let n=i/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:fa,enableRegister:this.config.ADCSRA,enableMask:la},e.writeHooks[o.ADCSRA]=(s,a)=>{var i;if(s&ze&&!(a&ze)&&(this.conversionCycles=25),e.data[o.ADCSRA]=s,e.updateInterruptEnable(this.ADC,s),!this.converting&&s&Oo){if(!(s&ze))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&da;e.data[o.ADCSRB]&xa&&(n|=32),n&=o.muxInputMask;let r=(i=o.muxChannels[n])!==null&&i!==void 0?i:ra;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:o,ADCH:s,ADMUX:a,ADCSRA:i}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[a]&ha?(this.cpu.data[o]=e<<6&255,this.cpu.data[s]=e>>2):(this.cpu.data[o]=e&255,this.cpu.data[s]=e>>8&3),this.cpu.data[i]&=~Oo,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&ca){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:o,adcReferences:s}=this.config,a=this.cpu.data[o]>>ma&ua;return s.length>4&&this.cpu.data[o]&pa&&(a|=4),(e=s[a])!==null&&e!==void 0?e:Rt.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case Rt.AVCC:return this.avcc;case Rt.AREF:return this.aref;case Rt.Internal1V1:return 1.1;case Rt.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var ga=2,Ca=4,Sa=8,Aa=16,Ra=32,Ki=ga|Ca|Sa|Aa|Ra;var ko={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},No={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Bo={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},jo={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Fo={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var zt={PIN:35,DDR:36,PORT:37,pinChange:Bo,externalInterrupts:[]},Je={PIN:38,DDR:39,PORT:40,pinChange:jo,externalInterrupts:[]},Ot={PIN:41,DDR:42,PORT:43,pinChange:Fo,externalInterrupts:[null,null,ko,No]};var rt;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(rt||(rt={}));var K;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(K||(K={}));var Xt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Xt||(Xt={}));var ge=class{constructor(e,o){var s,a,i,n;this.cpu=e,this.portConfig=o,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[o.PORT]=this,e.writeHooks[o.DDR]=g=>{let $=e.data[o.PORT];return e.data[o.DDR]=g,this.writeGpio($,g),this.updatePinRegister(g),!0},e.writeHooks[o.PORT]=g=>{let $=e.data[o.DDR];return e.data[o.PORT]=g,this.writeGpio(g,$),this.updatePinRegister($),!0},e.writeHooks[o.PIN]=(g,$,D,C)=>{let T=e.data[o.PORT],A=e.data[o.DDR],y=T^g&C;return e.data[o.PORT]=y,this.writeGpio(y,A),this.updatePinRegister(A),!0};let{externalInterrupts:r}=o;this.externalInts=r.map(g=>g?{address:g.interrupt,flagRegister:g.EIFR,flagMask:1<<g.index,enableRegister:g.EIMSK,enableMask:1<<g.index}:null);let h=new Set(r.map(g=>g?.EICR));for(let g of h)this.attachInterruptHook(g||0);let p=(a=(s=r.find(g=>g&&g.EIMSK))===null||s===void 0?void 0:s.EIMSK)!==null&&a!==void 0?a:0;this.attachInterruptHook(p,"mask");let u=(n=(i=r.find(g=>g&&g.EIFR))===null||i===void 0?void 0:i.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(u,"flag");let{pinChange:b}=o;if(this.PCINT=b?{address:b.pinChangeInterrupt,flagRegister:b.PCIFR,flagMask:1<<b.PCIE,enableRegister:b.PCICR,enableMask:1<<b.PCIE}:null,b){let{PCIFR:g,PCMSK:$}=b;e.writeHooks[g]=D=>{for(let C of this.cpu.gpioPorts){let{PCINT:T}=C;T&&e.clearInterruptByFlag(T,D)}return!0},e.writeHooks[$]=D=>{e.data[$]=D;for(let C of this.cpu.gpioPorts){let{PCINT:T}=C;T&&e.updateInterruptEnable(T,D)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(o=>o!==e)}pinState(e){let o=this.cpu.data[this.portConfig.DDR],s=this.cpu.data[this.portConfig.PORT],a=1<<e,i=s&a?rt.InputPullUp:rt.Input,n=this.openCollector&a?i:rt.High;return o&a?this.lastValue&a?n:rt.Low:i}setPin(e,o){let s=1<<e;this.pinValue&=~s,o&&(this.pinValue|=s),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,o){let{cpu:s,portConfig:a}=this,i=1<<e;if(o===K.None)this.overrideMask|=i,this.overrideValue&=~i;else switch(this.overrideMask&=~i,o){case K.Enable:this.overrideValue&=~i,this.overrideValue|=s.data[a.PORT]&i;break;case K.Set:this.overrideValue|=i;break;case K.Clear:this.overrideValue&=~i;break;case K.Toggle:this.overrideValue^=i;break}let n=s.data[a.DDR];this.writeGpio(s.data[a.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var o,s;let a=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=a,this.lastPin!==a){for(let i=0;i<8;i++)if((a&1<<i)!==(this.lastPin&1<<i)){let n=!!(a&1<<i);this.toggleInterrupt(i,n),(s=(o=this.externalClockListeners)[i])===null||s===void 0||s.call(o,n)}this.lastPin=a}}toggleInterrupt(e,o){let{cpu:s,portConfig:a,externalInts:i,PCINT:n}=this,{externalInterrupts:r,pinChange:h}=a,p=r[e],u=i[e];if(u&&p){let{EIMSK:b,index:g,EICR:$,iscOffset:D}=p;if(s.data[b]&1<<g){let C=s.data[$]>>D&3,T=!1;switch(u.constant=!1,C){case Xt.LowLevel:T=!o,u.constant=!0;break;case Xt.Change:T=!0;break;case Xt.FallingEdge:T=!o;break;case Xt.RisingEdge:T=o;break}T?s.setInterruptFlag(u):u.constant&&s.clearInterrupt(u,!0)}}if(h&&n&&h.mask&1<<e){let{PCMSK:b}=h;s.data[b]&1<<e+h.offset&&s.setInterruptFlag(n)}}attachInterruptHook(e,o="other"){if(!e)return;let{cpu:s}=this;s.writeHooks[e]=a=>{o!=="flag"&&(s.data[e]=a);for(let i of s.gpioPorts){for(let n of i.externalInts)n&&o==="mask"&&s.updateInterruptEnable(n,a),n&&!n.constant&&o==="flag"&&s.clearInterruptByFlag(n,a);i.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:o}=this.portConfig;for(let s=0;s<8;s++){let a=o[s];if(!a)continue;let i=!!(this.lastPin&1<<s),{EIFR:n,EIMSK:r,index:h,EICR:p,iscOffset:u,interrupt:b}=a;if(!(e.data[r]&1<<h)||i)continue;(e.data[p]>>u&3)===Xt.LowLevel&&e.queueInterrupt({address:b,flagRegister:n,flagMask:1<<h,enableRegister:r,enableMask:1<<h,constant:!0})}}writeGpio(e,o){let s=(e&this.overrideMask|this.overrideValue)&o|e&~o,a=this.lastValue;if(s!==a||o!==this.lastDdr){this.lastValue=s,this.lastDdr=o;for(let i of this.listeners)i(s,a)}}};var Lo={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Ce;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Ce||(Ce={}));var Qe={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Ye=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Lo,compPortA:Ot.PORT,compPinA:6,compPortB:Ot.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:4},Qe),to=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Lo,compPortA:zt.PORT,compPinA:1,compPortB:zt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:5},Qe),eo=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:zt.PORT,compPinA:3,compPortB:Ot.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Qe),oe;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(oe||(oe={}));var X;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(X||(X={}));var B;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(B||(B={}));var Ut=1,ee=2,qt=1,{Normal:oo,PWMPhaseCorrect:$t,CTC:Ve,FastPWM:Et,Reserved:Ze,PWMPhaseFrequencyCorrect:Se}=oe,ba=[[oo,255,B.Immediate,X.Max,0],[$t,255,B.Top,X.Bottom,0],[Ve,Ut,B.Immediate,X.Max,0],[Et,255,B.Bottom,X.Max,0],[Ze,255,B.Immediate,X.Max,0],[$t,Ut,B.Top,X.Bottom,qt],[Ze,255,B.Immediate,X.Max,0],[Et,Ut,B.Bottom,X.Top,qt]],Ia=[[oo,65535,B.Immediate,X.Max,0],[$t,255,B.Top,X.Bottom,0],[$t,511,B.Top,X.Bottom,0],[$t,1023,B.Top,X.Bottom,0],[Ve,Ut,B.Immediate,X.Max,0],[Et,255,B.Bottom,X.Top,0],[Et,511,B.Bottom,X.Top,0],[Et,1023,B.Bottom,X.Top,0],[Se,ee,B.Bottom,X.Bottom,0],[Se,Ut,B.Bottom,X.Bottom,qt],[$t,ee,B.Top,X.Bottom,0],[$t,Ut,B.Top,X.Bottom,qt],[Ve,ee,B.Immediate,X.Max,0],[Ze,65535,B.Immediate,X.Max,0],[Et,ee,B.Bottom,X.Top,qt],[Et,Ut,B.Bottom,X.Top,qt]];function Ta(t){switch(t){case 1:return K.Toggle;case 2:return K.Clear;case 3:return K.Set;default:return K.Enable}}var Wo=128,Go=64,Ma=32,Ae=class{constructor(e,o){if(this.cpu=e,this.config=o,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=B.Immediate,this.tovUpdateMode=X.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(s=!0,a=!1)=>{let{divider:i,lastCycle:n,cpu:r}=this,{cycles:h}=r,p=h-n;if(i&&p>=i||a){let u=a?1:Math.floor(p/i);this.lastCycle+=u*i;let b=this.tcnt,{timerMode:g,TOP:$}=this,D=g===$t||g===Se,C=D?this.phasePwmCount(b,u):(b+u)%($+1),T=b+u>$;if(this.tcntUpdated||(this.tcnt=C,D||this.timerUpdated(C,b)),!D){if(g===Et&&T){let{compA:A,compB:y}=this;A&&this.updateCompPin(A,"A",!0),y&&this.updateCompPin(y,"B",!0)}this.ocrUpdateMode==B.Bottom&&T&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),T&&(this.tovUpdateMode==X.Top||$===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===B.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===B.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:u}=this,{externalClockPin:b}=this.config,g=this.config.dividers[u];this.lastCycle=g?this.cpu.cycles:0,this.updateDivider=!1,this.divider=g,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[b]=null),g?r.addClockEvent(this.count,this.lastCycle+g-r.cycles):this.externalClockPort&&(u===Ce.FallingEdge||u===Ce.RisingEdge)&&(this.externalClockPort.externalClockListeners[b]=this.externalClockCallback,this.externalClockRisingEdge=u===Ce.RisingEdge);return}s&&i&&r.addClockEvent(this.count,this.lastCycle+i-r.cycles)},this.externalClockCallback=s=>{s===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[o.TCNT]=s=>(this.count(!1),this.config.bits===16&&(this.cpu.data[s+1]=this.tcnt>>8),this.cpu.data[s]=this.tcnt&255),this.cpu.writeHooks[o.TCNT]=s=>{this.tcntNext=this.highByteTemp<<8|s,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[o.OCRA]=s=>{this.nextOcrA=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[o.OCRB]=s=>{this.nextOcrB=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[o.OCRC]=s=>{this.nextOcrC=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[o.ICR]=i=>{this.icr=this.highByteTemp<<8|i};let s=i=>{this.highByteTemp=i},a=(i,n,r)=>(this.highByteTemp=i&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[o.TCNT+1]=s,this.cpu.writeHooks[o.OCRA+1]=a,this.cpu.writeHooks[o.OCRB+1]=a,this.hasOCRC&&(this.cpu.writeHooks[o.OCRC+1]=a),this.cpu.writeHooks[o.ICR+1]=s}e.writeHooks[o.TCCRA]=s=>(this.cpu.data[o.TCCRA]=s,this.updateWGMConfig(),!0),e.writeHooks[o.TCCRB]=s=>(o.TCCRC||(this.checkForceCompare(s),s&=~(Wo|Go)),this.cpu.data[o.TCCRB]=s,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),o.TCCRC&&(e.writeHooks[o.TCCRC]=s=>{this.checkForceCompare(s)}),e.writeHooks[o.TIFR]=s=>(this.cpu.data[o.TIFR]=s,this.cpu.clearInterruptByFlag(this.OVF,s),this.cpu.clearInterruptByFlag(this.OCFA,s),this.cpu.clearInterruptByFlag(this.OCFB,s),!0),e.writeHooks[o.TIMSK]=s=>{this.cpu.updateInterruptEnable(this.OVF,s),this.cpu.updateInterruptEnable(this.OCFA,s),this.cpu.updateInterruptEnable(this.OCFB,s)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case Ut:return this.ocrA;case ee:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case Ut:case ee:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:o}=this,s=e.bits===16?Ia:ba,a=this.cpu.data[e.TCCRA],[i,n,r,h,p]=s[o];this.timerMode=i,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=h;let u=i===Et||i===$t||i===Se,b=this.compA;this.compA=a>>6&3,this.compA===1&&u&&!(p&qt)&&(this.compA=0),!!b!=!!this.compA&&this.updateCompA(this.compA?K.Enable:K.None);let g=this.compB;if(this.compB=a>>4&3,this.compB===1&&u&&(this.compB=0),!!g!=!!this.compB&&this.updateCompB(this.compB?K.Enable:K.None),this.hasOCRC){let $=this.compC;this.compC=a>>2&3,this.compC===1&&u&&(this.compC=0),!!$!=!!this.compC&&this.updateCompC(this.compC?K.Enable:K.None)}}phasePwmCount(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n,TOP:r,MAX:h,tcntUpdated:p}=this;for(!e&&!r&&(o=0,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));o>0;)this.countingUp?(e++,e===r&&!p&&(this.countingUp=!1,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!p&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===B.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),p||(e===s&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===a&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===i&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),o--;return e&h}timerUpdated(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n}=this,r=o>e;((o<s||r)&&e>=s||o<s&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((o<a||r)&&e>=a||o<a&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((o<i||r)&&e>=i||o<i&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==oe.FastPWM||this.timerMode==oe.PWMPhaseCorrect||this.timerMode==oe.PWMPhaseFrequencyCorrect||(e&Wo&&this.updateCompPin(this.compA,"A"),e&Go&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ma&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,o,s=!1){let a=K.None,i=e===3,n=this.countingUp===i;switch(this.timerMode){case oo:case Ve:a=Ta(e);break;case Et:e===1?a=s?K.None:K.Toggle:a=i!==s?K.Set:K.Clear;break;case $t:case Se:e===1?a=K.Toggle:a=n?K.Set:K.Clear;break}a!==K.None&&(o==="A"?this.updateCompA(a):o==="B"?this.updateCompB(a):this.updateCompC(a))}updateCompA(e){let{compPortA:o,compPinA:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompB(e){let{compPortB:o,compPinB:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompC(e){let{compPortC:o,compPinC:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}};var ao={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},wa=128,_a=64,Ho=32;var so=2,ya=1,Ko=so,$a=128,Ea=64,Da=32,Oe=16,Ue=8,Jo=4;var Xo=Jo|Oe|Ue;var Pa=32,va=16,Va=8,zo=4,qo=2;var Oa={5:31,6:63,7:127,8:255,9:255},Re=class{constructor(e,o,s){this.cpu=e,this.config=o,this.freqHz=s,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:wa,enableRegister:this.config.UCSRB,enableMask:$a,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ho,enableRegister:this.config.UCSRB,enableMask:Da},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:_a,enableRegister:this.config.UCSRB,enableMask:Ea},this.reset(),this.cpu.writeHooks[o.UCSRA]=(a,i)=>{var n;return e.data[o.UCSRA]=a&(ya|so),e.clearInterruptByFlag(this.TXC,a),(a&Ko)!==(i&Ko)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRB]=(a,i)=>{var n;return e.updateInterruptEnable(this.RXC,a),e.updateInterruptEnable(this.UDRE,a),e.updateInterruptEnable(this.TXC,a),a&Oe&&i&Oe&&e.clearInterrupt(this.RXC),a&Ue&&!(i&Ue)&&e.setInterruptFlag(this.UDRE),e.data[o.UCSRB]=a,(a&Xo)!==(i&Xo)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRC]=a=>{var i;return e.data[o.UCSRC]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.readHooks[o.UDR]=()=>{var a;let i=(a=Oa[this.bitsPerChar])!==null&&a!==void 0?a:255,n=this.rxByte&i;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[o.UDR]=a=>{if(this.onByteTransmit&&this.onByteTransmit(a),this.onLineTransmit){let i=String.fromCharCode(a);i===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=i}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[o.UBRRH]=a=>{var i;return this.cpu.data[o.UBRRH]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.writeHooks[o.UBRRL]=a=>{var i;return this.cpu.data[o.UBRRL]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ho,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=zo|qo,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,o=!1){var s;let{cpu:a}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(o)this.rxByte=e,a.setInterruptFlag(this.RXC),(s=this.onRxComplete)===null||s===void 0||s.call(this);else return this.rxBusyValue=!0,a.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:o}=this.config;return this.cpu.data[e]<<8|this.cpu.data[o]}get multiplier(){return this.cpu.data[this.config.UCSRA]&so?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Oe)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ue)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(zo|qo))>>1|this.cpu.data[this.config.UCSRB]&Jo){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&Va?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Pa)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&va)}};var io={0:null,1:0,2:2,3:4,4:2,5:4};function Zo(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[a,i]of String(t).split(/\\r?\\n/).entries()){let n=i.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${a+1}).`);let r=n.slice(1).match(/../g).map($=>parseInt($,16));if(r.reduce(($,D)=>$+D,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let[h,p,u,b]=r;if(r.length!==h+5||!(b in io)||io[b]!==null&&h!==io[b])throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let g=r.slice(4,4+h);if(b===0){let $=o+(p<<8|u);if($+h>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(g,$)}else if(b===1){s=!0;break}else b===2?o=(g[0]<<8|g[1])<<4:b===4&&(o=(g[0]<<8|g[1])<<16)}if(!s)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var Tt=16e6,Qo=Tt/1e3,Ua=Xe,ka=[[Ot,["D0","D1","D2","D3","D4","D5","D6","D7"]],[zt,["D8","D9","D10","D11","D12","D13"]],[Je,["A0","A1","A2","A3","A4","A5"]]],bt=Object.freeze({...rt});function Yo(t){let e=new pe(Zo(t));[Ye,to,eo].forEach(C=>new Ae(e,C));let o=new Re(e,ao,Tt),s=new me(e,qe),a=ka.map(([C,T])=>[new ge(e,C),T]),i={};for(let[C,T]of a)T.forEach((A,y)=>i[A]=[C,y]);let n=null;s.onADCRead=C=>{let T=0;if(C.type===Z.SingleEnded){let J=s.channelValues[C.channel]||0;T=n?n(C.channel,J):J}else C.type===Z.Constant?T=C.voltage:C.type===Z.Temperature&&(T=.378125);let A=Math.round(T*1e6)/1e6,y=Math.min(1023,Math.max(0,Math.floor(A/s.referenceVoltage*1024)));e.addClockEvent(()=>s.completeADCRead(y),s.sampleCycles)};let r=[],h=[],p=[],u=[],b=g();function g(){let C={};for(let[T,A]of a)A.forEach((y,J)=>C[y]=T.pinState(J));return C}for(let[C,T]of a)C.addListener(()=>{let A=null;for(let y=0;y<T.length;y++){let J=C.pinState(y);J!==b[T[y]]&&((A||(A={}))[T[y]]=J,b[T[y]]=J)}if(A)for(let y of h)y(A,b)});o.onByteTransmit=C=>p.forEach(T=>T(C));let $=Qo;function D(C){let T=e.cycles+C;for(;e.cycles<T;){let A=Math.min(T,$);for(;e.cycles<A;)Ua(e),e.tick();if(e.cycles<$)break;$+=Qo,u.length&&!o.rxBusy&&(o.writeByte(u[0]),u.shift());for(let y of r)y()}}return{correr:D,estados:g,get ciclos(){return e.cycles},alCambiarPines:C=>h.push(C),alByteSerial:C=>p.push(C),enviarSerial:C=>u.push(...new TextEncoder().encode(C)),ponerAnalogico:(C,T)=>s.channelValues[C]=Math.max(0,Math.min(5,T)),ponerVoltajeReferencia:C=>s.avcc=Math.max(.001,Number(C)||0),ponerLectorAnalogico:C=>n=C,ponerEntrada(C,T){let A=i[C];A&&A[0].setPin(A[1],!!T)},alCadaMs:C=>r.push(C)}}var Na=["a","b","c","d","e"],Ba=["f","g","h","i","j"],no={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ja=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],ts={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ro=t=>14.4+(t-1)*9.6,Fa=t=>t>=2&&(t-1)%6!==0,co=new Map;function fo(t="media"){if(co.has(t))return co.get(t);let e=ts[t]||ts.media,o=[];co.set(t,o);for(let s=1;s<=e.columnas;s++){for(let a of Na)o.push({nombre:a+s,x:ro(s),y:no[a],tira:"arriba"+s});for(let a of Ba)o.push({nombre:a+s,x:ro(s),y:no[a],tira:"abajo"+s});for(let[a]of ja)Fa(s)&&o.push({nombre:a+s,x:ro(s),y:no[a],tira:a})}return o}var lo=new Map;function es(t="media"){if(lo.has(t))return lo.get(t);let e=new Map;lo.set(t,e);for(let o of fo(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}var se=3.779527559055118,Wa={ancho:72.58*se,alto:53.34*se},Ga=4*se,os=5*se;var be=Ga+4.6*se,Ie=Wa.ancho-.5-4.6*se,La=60,Dt=(t,e)=>({x:t,y:La+e*os}),Hn={M1A:Dt(be,0),M1B:Dt(be,1),GND_IZQ:Dt(be,2),M2A:Dt(be,3),M2B:Dt(be,4),M4A:Dt(Ie,0),M4B:Dt(Ie,1),GND_DER:Dt(Ie,2),M3A:Dt(Ie,3),M3B:Dt(Ie,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+os,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var ss={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},as=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var ae=3.779527559055118,ke=9.6,ie={ancho:58*ae,alto:54*ae},Xn={x:(ie.ancho-45*ae)/2,y:(ie.alto-18*ae)/2,ancho:45*ae,alto:18*ae},Ha=(ie.ancho-14*ke)/2,is=(ie.alto-6*ke)/2,Ka=is+6*ke,Xa=[{y:is,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:Ka,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],zn=Object.fromEntries(Xa.flatMap(({y:t,nombres:e})=>e.map((o,s)=>[o,{x:Ha+s*ke,y:t}])));var Zn={...ie};var za=Array.from({length:14},(t,e)=>`D${13-e}`),qa=Array.from({length:8},(t,e)=>`A${e}`),ho=[...za,...qa],Ja=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"],Qn=[...ho.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...Ja],Yn=Object.freeze({SPI_MISO:"D12",SPI_MOSI:"D11",SPI_SCK:"D13",SPI_SS:"D10",SPI_V:"5V",SPI_G:"GND1"}),ns=[...ho.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"],["OUT_5V_2","placa.5V"],["GND_OUT_2","placa.GND1"],["OUT_3V3_2","OUT_3V3"]],tr=Object.fromEntries([...ho.flatMap(t=>[[`${t}_S`,`${t} \\xB7 se\\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \\xB7 V: alimentaci\\xF3n de 5V (+)`],[`${t}_G`,`${t} \\xB7 G: tierra (\\u2212)`]]),["I2C_SDA","I2C \\xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \\xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \\xB7 alimentaci\\xF3n de 5V (+)"],["I2C_G","I2C \\xB7 tierra (\\u2212)"],["SPI_MISO","SPI \\xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \\xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \\xB7 SCK: reloj (D13)"],["SPI_SS","SPI \\xB7 SS: selecci\\xF3n (D10)"],["SPI_V","SPI \\xB7 alimentaci\\xF3n de 5V (+)"],["SPI_G","SPI \\xB7 tierra (\\u2212)"],["UART_TX","UART \\xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \\xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \\xB7 alimentaci\\xF3n de 5V (+)"],["UART_G","UART \\xB7 tierra (\\u2212)"],["OUT_5V","5V \\xB7 salida de alimentaci\\xF3n de la expansi\\xF3n (+)"],["OUT_5V_2","5V \\xB7 segundo contacto de la misma salida (+)"],["OUT_3V3","3,3V \\xB7 salida regulada de la expansi\\xF3n (+), separada del 3V3 del Nano"],["OUT_3V3_2","3,3V \\xB7 segundo contacto de la misma salida regulada (+)"],["GND_OUT","GND \\xB7 tierra de las salidas (\\u2212)"],["GND_OUT_2","GND \\xB7 segundo contacto de tierra de las salidas (\\u2212)"],["JACK_POS","Jack + \\xB7 entrada de la expansi\\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \\xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]);var Ne=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),cs=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Za=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Qa=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),Ya=Object.freeze([...cs,Object.freeze(["A6"]),Object.freeze(["A7"])]),rs=Object.freeze([...Ne,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),ti=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:Ne,analogicos:cs,puentes:Za,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...Ne,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","IOREF","SDA","SCL"])}),ei=Object.freeze({nombre:"Arduino Nano cl\\xE1sico",pinesDigitales:Ne,analogicos:Ya,puentes:Qa,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:rs,pines:Object.freeze([...rs,"SDA","SCL","MISO","MOSI","SCK","SS"])}),kt=t=>t==="nano"||t==="nano_old",Lt=t=>kt(t)?ei:ti;function Nt(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:s=!0}={}){let a=new Map,i=r=>{for(a.has(r)||a.set(r,r);a.get(r)!==r;)a.set(r,a.get(a.get(r))),r=a.get(r);return r},n=(r,h)=>a.set(i(r),i(h));for(let r of Lt(t.placa).puentes)r.forEach(h=>n("placa."+r[0],"placa."+h));for(let r of t.cables)n(r.de,r.a);if(t.protoboard)for(let r of es(t.protoboard.tipo).values())r.forEach(h=>n("protoboard."+r[0],"protoboard."+h));for(let r of t.componentes)if(r.en)for(let[h,p]of Object.entries(r.en))(t.protoboard||!p.startsWith("protoboard."))&&n(r.id+"."+h,p);for(let r of t.componentes)if(r.tipo==="shield_nano_io"&&kt(t.placa))for(let[h,p]of ns)n(r.id+"."+h,p.startsWith("placa.")?p:r.id+"."+p);else if(r.tipo==="shield_l293d"){for(let[h,p]of as)n(r.id+"."+h,p);(!r.props||r.props.puentePWR!==!1)&&n(r.id+".EXT_POS","placa.VIN")}else r.tipo==="bateria_lipo"&&s?(n(r.id+".BAL0",r.id+".NEG"),n(r.id+".BAL2",r.id+".POS")):r.tipo==="pulsador"?(n(r.id+".1i",r.id+".1d"),n(r.id+".2i",r.id+".2d"),e.has(r.id)&&n(r.id+".1i",r.id+".2i")):o&&r.tipo==="resistencia"?n(r.id+".1",r.id+".2"):o&&r.tipo==="potenciometro"&&(n(r.id+".GND",r.id+".SIG"),n(r.id+".SIG",r.id+".VCC"));return i}function po(t,e,o,s){e>=0&&(t[e][e]+=s),o>=0&&(t[o][o]+=s),e>=0&&o>=0&&(t[e][o]-=s,t[o][e]-=s)}function xo(t,e,o){e>=0&&(t[e]+=o)}var Jt=(t,e)=>e>=0?t[e]:0;function Te(t,e,o){return{a:t,b:e,g:1/o,sellar(s){po(s,this.a,this.b,this.g)},corriente(s){return(Jt(s,this.a)-Jt(s,this.b))*this.g}}}function ls(t){return{nodo:t,v:0,g:0,sellar(e,o){po(e,this.nodo,-1,this.g),xo(o,this.nodo,this.v*this.g)},corriente(e){return(this.v-Jt(e,this.nodo))*this.g}}}function fs(t,e){return{nodo:t,v:e,fila:-1,sellar(o,s){o[this.nodo][this.fila]+=1,o[this.fila][this.nodo]+=1,s[this.fila]+=this.v},corriente(o){return-o[this.fila]}}}function ds(t,e,{Is:o,n:s}){let a=s*.025693,i=a*Math.log(a/(Math.SQRT2*o));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let h=Math.exp(this.vd/a),p=o*(h-1),u=o*h/a+1e-12,b=p-u*this.vd;po(n,this.a,this.k,u),xo(r,this.a,-b),xo(r,this.k,b)},actualizar(n){let r=Jt(n,this.a)-Jt(n,this.k),h=Math.abs(r-this.vd);return this.vd=oi(r,this.vd,a,i),h},corriente(n){let r=Jt(n,this.a)-Jt(n,this.k);return o*Math.expm1(r/a)}}}function oi(t,e,o,s){if(t>s&&Math.abs(t-e)>2*o){if(e>0){let a=1+(t-e)/o;return a>0?e+o*Math.log(a):s}return o*Math.log(t/o)}return t}function hs(t,{maxIter:e=200,tolerancia:o=1e-9}={}){let s=t.nodos+t.fuentes,a=t.elementos.filter(n=>n.noLineal),i=new Float64Array(s);for(let n=1;n<=e;n++){let r=Array.from({length:s},()=>new Float64Array(s)),h=new Float64Array(s);for(let u of t.elementos)u.sellar(r,h);for(let u=0;u<t.nodos;u++)r[u][u]+=1e-12;if(i=si(r,h),!a.length)return{x:i,iteraciones:n,convergio:!0};let p=0;for(let u of a)p=Math.max(p,u.actualizar(i));if(p<o)return{x:i,iteraciones:n,convergio:!0}}return{x:i,iteraciones:e,convergio:!1}}function si(t,e){let o=e.length;for(let a=0;a<o;a++){let i=a;for(let n=a+1;n<o;n++)Math.abs(t[n][a])>Math.abs(t[i][a])&&(i=n);if(Math.abs(t[i][a])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[a],t[i]]=[t[i],t[a]],[e[a],e[i]]=[e[i],e[a]];for(let n=a+1;n<o;n++){let r=t[n][a]/t[a][a];if(r){for(let h=a;h<o;h++)t[n][h]-=r*t[a][h];e[n]-=r*e[a]}}}let s=new Float64Array(o);for(let a=o-1;a>=0;a--){let i=e[a];for(let n=a+1;n<o;n++)i-=t[a][n]*s[n];s[a]=i/t[a][a]}return s}var Ht={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40,chipMaxmA:200},pt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},ii=.25,xs={minimo:1};function ni(t){let o=(pt.vf[t]||pt.vf.rojo)-pt.iRef*pt.rs;return{Is:pt.iRef/Math.expm1(o/(pt.n*.025693)),n:pt.n}}var ps={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function us(t,{quemados:e=new Set,presionados:o=new Set,alimentacion:s={},fuentesExtra:a=[]}={}){let i=Lt(t.placa),n=kt(t.placa),r=i.pinesDigitales,h=i.analogicos.map(f=>f[0]).filter(f=>!r.includes(f)),p=s["5V"]??Ht.voltios,u=Nt(t,{presionados:o}),b=Nt(t,{presionados:o,conduccion:!0}),g=u("placa.GND1"),$=new Map,D=0,C=f=>{let S=u(f);return S===g?-1:($.has(S)||$.set(S,D++),$.get(S))},T=f=>u(f)===g?-1:$.get(u(f)),A=[],y=[],J=[],at=new Set(t.cables.flatMap(f=>[f.de,f.a]));for(let f of t.componentes)for(let[S,c]of Object.entries(f.en||{}))c.startsWith("protoboard.")||at.add(f.id+"."+S).add(c);let Pt=new Set([...at].map(u)),ut=f=>Pt.has(u("placa."+f)),dt=[...r,...h,"5V","3V3",...n?["VIN","GND1","GND2"]:[]].filter(f=>ut(f)||n&&["5V","3V3","VIN","GND1","GND2"].includes(f)).map(f=>"placa."+f);for(let f of h)ut(f)&&C("placa."+f);let mt=n?t.componentes.filter(f=>f.tipo==="shield_nano_io").flatMap(f=>["OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"].map(S=>f.id+"."+S)):[];for(let f of mt)C(f);let P=[];if(t.protoboard){let f=new Set([...at].map(u));for(let S of t.componentes)for(let c of Object.keys(S.en||{}))f.add(u(S.id+"."+c));for(let S of fo(t.protoboard.tipo)){let c="protoboard."+S.nombre;f.has(u(c))&&P.push(c)}}let W=new Map,N=[["5V",5,"placa.5V"],["3V3",3.3,"placa.3V3"],...n&&s.VIN>0?[["VIN",0,"placa.VIN"]]:[],...a.map(({ref:f,voltios:S=0,nombre:c})=>[f,S,f,c])];for(let[f,S,c,_]of N){if(!ut(f)&&!n&&c.startsWith("placa."))continue;let d=s[f]??S,E=C(c),z=E===-1?"GND":W.get(E);if(z){let M=_?`${_[0].toUpperCase()+_.slice(1)} est\\xE1 unida directo a ${z}: es un cortocircuito. Quita ese cable.`:`El pin ${f} est\\xE1 unido directo a ${z}: es un cortocircuito.`;J.push({tipo:"cortocircuito",componente:c,mensaje:M});continue}W.set(E,_||f);let G=fs(E,d);G.pin=f,G.ref=c,y.push(G),A.push(G)}let F={};for(let f of r)ut(f)&&(F[f]=ls(C("placa."+f)),A.push(F[f]));let I=[],U=[],O=[];for(let f of t.componentes)if(f.tipo==="resistencia"){let S=Te(C(f.id+".1"),C(f.id+".2"),Number(f.props.ohmios)||1);I.push({id:f.id,ohmios:Number(f.props.ohmios)||1,el:S}),S.a!==S.b&&A.push(S)}else if(f.tipo==="led"){let S=C(f.id+".anodo"),c=C(f.id+".catodo"),_={id:f.id,a:S,k:c,quemado:e.has(f.id)};if(!_.quemado&&S!==c){let d=D++;_.rs=Te(S,d,pt.rs),_.diodo=ds(d,c,ni(f.props.color)),A.push(_.rs,_.diodo)}U.push(_)}else if(f.tipo==="potenciometro"){let S=Number(f.props.ohmios)||1e4,c=Math.max(0,Math.min(1,Number(f.props.posicion))),_=C(f.id+".GND"),d=C(f.id+".SIG"),E=C(f.id+".VCC"),z=Te(_,d,Math.max(xs.minimo,S*c)),G=Te(d,E,Math.max(xs.minimo,S*(1-c)));for(let M of[z,G])M.a!==M.b&&A.push(M);O.push({id:f.id,ohmios:S,posicion:c,bajo:z,alto:G})}y.forEach((f,S)=>f.fila=D+S);function it(f){let S=new Set([b("placa.GND1")]);for(let c of y)S.add(b(c.ref));for(let c of r){let _=f[c];(_===rt.High||_===rt.Low||_===rt.InputPullUp)&&S.add(b("placa."+c))}return S}let tt=new Set([...at,...dt,...mt,...P]);for(let f of a)tt.add(f.ref);for(let f of t.componentes)for(let S of ps[f.tipo]||[])tt.add(f.id+"."+S);return{fallasFijas:J,flotantes(f){let S=it(f),c=new Set;for(let _ of r)f[_]===rt.Input&&!S.has(b("placa."+_))&&c.add(_);for(let _ of h)S.has(b("placa."+_))||c.add(_);return c},refsAlAire(f){let S=it(f),c=new Set;for(let _ of tt)S.has(b(_))||c.add(_);return c},ponerAlimentacion(f){p=f["5V"]??p;for(let S of y)f[S.pin]!==void 0&&(S.v=f[S.pin])},ponerPines(f){for(let[S,c]of Object.entries(F)){let _=f[S];_===rt.High?Object.assign(c,{v:p,g:1/Ht.rAlto}):_===rt.Low?Object.assign(c,{v:0,g:1/Ht.rBajo}):_===rt.InputPullUp?Object.assign(c,{v:p,g:1/Ht.rPullUp}):Object.assign(c,{v:0,g:0})}},resolver(){let f=hs({nodos:D,fuentes:y.length,elementos:A}),S=d=>{let E=T(d);return E===void 0?null:E<0?0:f.x[E]},c={};for(let d of at)c[d]=S(d);for(let d of dt)c[d]=S(d);for(let d of P)c[d]=S(d);for(let d of a)c[d.ref]=S(d.ref);for(let d of mt)c[d]=S(d);for(let d of t.componentes)for(let E of ps[d.tipo]||[])c[d.id+"."+E]=S(d.id+"."+E);let _=(d,E)=>d===null||E===null?null:d-E;return{convergio:f.convergio,iteraciones:f.iteraciones,voltajes:c,leds:U.map(d=>{let E=d.diodo?d.diodo.corriente(f.x):0;return{id:d.id,quemado:d.quemado,v:_(S(d.id+".anodo"),S(d.id+".catodo")),i:E,brillo:Math.max(0,Math.min(1,E*1e3/pt.plenomA))}}),resistencias:I.map(d=>{let E=d.el.a===d.el.b?0:d.el.corriente(f.x);return{id:d.id,ohmios:d.ohmios,v:_(S(d.id+".1"),S(d.id+".2")),i:E,w:E*E*d.ohmios}}),pines:Object.entries(F).filter(([,d])=>d.g>0).map(([d,E])=>({pin:d,v:S("placa."+d),i:E.corriente(f.x)})),fuentes:y.map(d=>({pin:d.pin,i:d.corriente(f.x)})),potenciometros:O.map(d=>({id:d.id,ohmios:d.ohmios,posicion:d.posicion,v:_(S(d.id+".SIG"),S(d.id+".GND")),i:Math.abs(d.bajo.a!==d.bajo.b?d.bajo.corriente(f.x):d.alto.a!==d.alto.b?d.alto.corriente(f.x):0)}))}}}}function ms(t,e){let o=a=>(Math.abs(a)*1e3).toFixed(0),s=[];if(e.danoComponentes){for(let a of t.leds)!a.quemado&&a.i*1e3>pt.quemamA&&s.push({tipo:"led_quemado",componente:a.id,corriente_mA:+(a.i*1e3).toFixed(1),mensaje:`El LED ${a.id} se quem\\xF3: le pasaron ${o(a.i)} mA y aguanta unos ${pt.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let a of t.resistencias)a.w>ii&&s.push({tipo:"resistencia_caliente",componente:a.id,potencia_W:+a.w.toFixed(2),mensaje:`La resistencia ${a.id} se calienta: disipa ${a.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let n of t.pines)if(Math.abs(n.i)*1e3>Ht.maxmA){let r=n.pin.startsWith("D")?"pin "+n.pin.slice(1):"pin "+n.pin;s.push({tipo:"corriente_pin",componente:"placa."+n.pin,corriente_mA:+(Math.abs(n.i)*1e3).toFixed(1),mensaje:`El ${r} entrega ${o(n.i)} mA y aguanta ${Ht.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}let a=t.pines.reduce((n,r)=>n+Math.max(0,r.i),0),i=t.pines.reduce((n,r)=>n+Math.max(0,-r.i),0);for(let[n,r,h]of[[a,"VCC","entregan"],[i,"GND","reciben"]])n*1e3>Ht.chipMaxmA&&s.push({tipo:"corriente_chip",componente:"placa."+r,corriente_mA:+(n*1e3).toFixed(1),mensaje:`Entre todos, los pines ${h} ${o(n)} mA y el chip aguanta ${Ht.chipMaxmA} mA en total: en la placa real se puede da\\xF1ar. Usa resistencias m\\xE1s grandes o menos pines a la vez.`})}return s}var Qt={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Zt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function ri(t,e="sg90"){let o=(Qt[e]||Qt.sg90).angulos,s=t<=o.centroUs?90-(o.centroUs-t)/o.usPorGradoBajo:90+(t-o.centroUs)/o.usPorGradoAlto;return Math.max(0,Math.min(180,s))}function gs(t){let e=Qt[t]||Qt.sg90,o=90,s=90,a=null,i=0,n=!1,r=0,h=0;return{pulso(p){p<Zt.pulsoValidoMin||p>Zt.pulsoValidoMax||a!==null&&Math.abs(p-a)<Zt.bandaMuerta||(a=p,s=ri(p,t))},avanzar(p,u){if(!(u>0)){n=!1,i=0;return}let b=60/(e.seg60*1e3)*(u/Zt.voltiosRef),g=s-o,$=Math.abs(g)>.01;r=Math.min(1,Math.abs(g)/Zt.bandaGrados),$&&!n&&(i=Zt.arranqueMs,h=r),n=$,n&&(o+=Math.sign(g)*Math.min(Math.abs(g),b*p)),i=Math.max(0,i-p)},corriente(p){if(!(p>0))return 0;let{reposo:u,movimiento:b,arranque:g}=e.mA;return(i>0?u+(g-u)*h:n?u+(b-u)*r:u)/1e3*(p/Zt.voltiosRef)},estado:()=>({angulo:o,objetivo:s,pulso:a,moviendo:n,arrancando:i>0})}}var ne=9.6/2.54,Be=57.6,Cs=14.4,ur={x:Cs,ancho:32.2*ne},ci={x:Cs+(32.2-22.2)/2*ne,ancho:22.2*ne,alto:11.8*ne},mr={x:ci.x+5.9*ne,y:Be},gr=13.5*ne,uo=182.4;var Cr={GND:{x:uo,y:Be-9.6,color:"#7a4a24"},VCC:{x:uo,y:Be,color:"#d7263d"},SIG:{x:uo,y:Be+9.6,color:"#f28c28"}};var lt={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function mo(){let{sostieneA:t,segundosA8A:e,enfriaS:o}=lt.fusible,s=(8**2-t**2)*e,a=0,i=!1;return{avanzar(n,r){let h=n/1e3;!i&&r>t?a+=(r**2-t**2)/s*h:a=Math.max(0,a-h/o),a>=1&&(i=!0),i&&a===0&&(i=!1)},get abierto(){return i},get calor(){return a},reiniciar(){a=0,i=!1}}}var Ss=(t,e=0)=>Math.max(0,(lt.voltios-lt.ohmios*t)/(1+lt.ohmios*e));var Me=3.779527559055118,Mt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},je=Mt.voltiosRef/(Mt.mABloqueado/1e3),As=Mt.rpmSinCarga*Mt.reduccion*2*Math.PI/60,Rs=Mt.mASinCarga/1e3,re=(Mt.voltiosRef-Rs*je)/As,li=re*Rs/As,fi=Mt.tauMecanicoMs/1e3*re*re/je;function bs(){let t=0,e=0,o=0;return{avanzar(s,a,{conectado:i=!0,frena:n=!1}={}){let r=s/1e3;i?e=(a-re*t)/je:e=n?-(re*t)/je:0;let h=re*e-li*t;t+=h/fi*r,o=(o+t/Mt.reduccion*r*180/Math.PI)%360},estado(){let s=t*60/(2*Math.PI)/Mt.reduccion;return{rpm:s,i:e,giro:o,velocidad:s/60*Math.PI*(Mt.ruedaMM/10)}}}}var Rr=64.2*Me,di=22.5*Me,br=40*Me,hi=11.2*Me,Ir=Mt.ruedaMM*Me/2,Tr={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-hi,y0:132-di/2}};var Ts=3.779527559055118,Fe={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Yt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},We=t=>(Fe[t]||Fe.nominal).voltios,Ms=t=>(Fe[t]||Fe.nominal).celdas,Is=360;var xi=10,So=10,pi=72*Ts,ui=34*Ts;var go=xi+pi+58,Co=So+ui-34,wr={POS:{x:Is-12,y:So+30,color:"#d7263d"},NEG:{x:Is-12,y:So+39.6,color:"#2b2b2b"},BAL0:{x:go,y:Co,color:"#2b2b2b"},BAL1:{x:go,y:Co+9.6,color:"#e05a5a"},BAL2:{x:go,y:Co+19.2,color:"#d7263d"}};var ws={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var mi=9.6,gi=82,Ci=132,yr=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:gi+e*mi,y:Ci}]));var ct={...ss,caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Si=6.6,Ai=.06,ys=4,_s=1-Math.exp(-1/ys),Ri=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],wt=(t,e=1)=>t.toFixed(e).replace(".",",");function $s({activas:t,avisar:e}){let o=null,s=new Map,a=new Map,i=new Map,n=0,r=0,h=!1,p={},u=0,b={},g=0,$=0,D=[],C=0,T=0;function A(){for(let P of Object.values(ct.pwm))p[P]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};u=0,b={}}A();function y(P,W,{fuentesMotor:N={},entradas:F=[]}={}){D=Object.entries(N);let I=(c,_)=>W(c)===W(_),U="placa.GND1",O=P.componentes.find(c=>c.tipo==="shield_l293d");o=O?{id:O.id,puente:!O.props||O.props.puentePWR!==!1}:null;let it=new Map;for(let c of P.componentes){if(c.tipo!=="bateria_lipo")continue;let _=c.props&&c.props.carga||"nominal",d=We(_),E=a.get(c.id),z=c.id+".POS",G=c.id+".NEG",M={carga:_,voc:d,celdas:Ms(_),v:E&&E.carga===_?E.v:d,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};_==="descargada"&&e({tipo:"bateria_baja",componente:c.id,mensaje:`La bater\\xEDa ${c.id} est\\xE1 descargada: ${wt(d)} V, ${wt(d/Yt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${wt(Yt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),_==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:c.id,mensaje:`Las celdas de la bater\\xEDa ${c.id} est\\xE1n desbalanceadas: ${M.celdas.map(L=>wt(L,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let w=L=>o&&I(L,o.id+".EXT_POS")||I(L,"placa.VIN")||I(L,"placa.5V")||F.some(k=>I(L,k));I(z,G)?e({tipo:"bateria_corto",componente:c.id,mensaje:`Los dos cables de la bater\\xEDa ${c.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):I(z,U)&&w(G)?e({tipo:"bateria_invertida",componente:c.id,mensaje:`La bater\\xEDa ${c.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):I(G,U)&&(M.valida=!0,I(z,"placa.5V")&&(M.valida=!1,e({tipo:"bateria_en_5v",componente:c.id,mensaje:`La bater\\xEDa ${c.id} est\\xE1 en el pin 5V: sus ${wt(d)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),M.motores=M.valida&&!!o&&I(z,o.id+".EXT_POS"),M.vin=M.valida&&I(z,"placa.VIN")),it.set(c.id,M)}a=it;let tt=new Map;for(let c of P.componentes){if(c.tipo!=="probador_lipo")continue;let _=c.props&&typeof c.props.umbral=="number"?c.props.umbral:ws.umbralV,d=null;for(let z of a.keys())I(c.id+".NEG",z+".BAL0")&&(d=z);let E=["C1","C2","C3","C4","C5","C6","C7","C8"].map(z=>{if(!d)return null;for(let G of[0,1,2])if(I(`${c.id}.${z}`,`${d}.BAL${G}`))return G;return null});tt.set(c.id,{umbral:_,fuente:d,puntos:E})}i=tt;let f=c=>{if(o){for(let d of[1,2,3,4])for(let E of["A","B"])if(I(c,`${o.id}.M${d}${E}`))return{tipo:"shield",n:d,s:E}}if(I(c,U))return{tipo:"gnd"};if(I(c,"placa.5V"))return{tipo:"5v"};for(let[d,E]of D)if(I(c,E))return{tipo:"aux",fuente:d};for(let[d,E]of a)if(E.valida&&I(c,d+".POS"))return{tipo:"bateria",id:d};let _=Ri.find(d=>I(c,"placa."+d));return _?{tipo:"pin",pin:_}:null},S=new Map;for(let c of P.componentes){if(c.tipo!=="motor_tt")continue;let d=s.get(c.id)||{logico:bs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};d.lado=c.props&&c.props.lado||"izquierdo",d.a=f(c.id+".A"),d.b=f(c.id+".B");let E=[d.a,d.b].filter(G=>G&&G.tipo==="shield");d.canal=E.length?"M"+E[0].n:null;let z=[d.a,d.b].find(G=>G&&G.tipo==="pin");z&&e({tipo:"motor_en_pin",componente:c.id,mensaje:`El motor ${c.id} est\\xE1 conectado al pin ${z.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),S.set(c.id,d)}s=S}function J(P,W,N){let F=I=>W[I]===bt.High;ct.reloj in P&&F(ct.reloj)&&(n=(n<<1|(F(ct.datos)?1:0))&255),ct.cierre in P&&F(ct.cierre)&&(r=n),ct.habilita in P&&(h=W[ct.habilita]===bt.Low);for(let I of Object.values(ct.pwm)){if(!(I in P))continue;let U=p[I],O=P[I]===bt.High;U.cambios=(U.cambios||0)+1,O&&!U.alto?Object.assign(U,{alto:!0,desde:N}):!O&&U.alto&&(U.acum+=N-U.desde,U.alto=!1)}}function at(){h=!1,A()}function Pt(P,{v5:W,logica:N,cargasBateria:F={},consumoPorVinA:I=Ai,habilitarVin:U=!0,voltajesMotor:O={}}){let it=P-u;for(let[M,w]of Object.entries(p)){w.alto&&(w.acum+=P-w.desde,w.desde=P);let L=it>0?Math.min(1,w.acum/it):0,k=b[M]||0;b[M]=(L===0||L===1)&&w.quieto>=ys?L:k+_s*(L-k),w.quieto=w.cambios?0:(w.quieto||0)+1,w.cambios=0,w.acum=0}u=P,g=0,$=0;for(let M of a.values())M.motores&&(g=Math.max(g,M.v)),M.vin&&($=Math.max($,M.v));let tt=U&&$>=Si,f=N||tt,S=new Map,c=(M,w)=>S.set(M,(S.get(M)||0)+w),_=M=>{for(let[w,L]of a)if(L.motores)return c(w,M)},d=0,E={},z=M=>M?M.tipo==="shield"?!f||!h?null:{v:r>>ct.bits[M.n][M.s]&1?g:0,d:b[ct.pwm[M.n]]||0,shield:!0}:M.tipo==="gnd"?{v:0,d:1}:M.tipo==="5v"?{v:W,d:1,del5V:!0}:M.tipo==="aux"?{v:O[M.fuente]||0,d:1,fuenteAux:M.fuente}:M.tipo==="bateria"?{v:(a.get(M.id)||{v:0}).v,d:1,bateria:M.id}:null:null,G=!1;for(let[M,w]of s){let L=z(w.a),k=z(w.b),_t=L&&k?Math.min(L.d,k.d):0;if(!_t)w.vAhora=0,w.logico.avanzar(1,0,{conectado:!1});else{let q=L.v-k.v,jt=(L.shield?1:0)+(k.shield?1:0),Ft=0;if(Math.abs(q)>1e-9){let gt=t.caidaL293D&&jt?jt/2*(ct.caidaV+ct.caidaPorA*Math.abs(w.iAntes)):0;Ft=Math.sign(q)*Math.max(0,Math.abs(q)-gt)*_t}w.vAhora=Ft,w.logico.avanzar(1,Ft,{conectado:!0}),jt===2&&(r>>ct.bits[w.a.n][w.a.s]&1)!==(r>>ct.bits[w.b.n][w.b.s]&1)&&g<1&&(G=!0);let Wt=w.logico.estado().i,xt=q>=0?L:k,yt=Math.max(0,Wt*Math.sign(q||1))*_t;xt.shield?_(yt):xt.del5V?d+=yt:xt.fuenteAux?E[xt.fuenteAux]=(E[xt.fuenteAux]||0)+yt:xt.bateria&&c(xt.bateria,yt)}let ht=w.logico.estado();w.iAntes=ht.i,w.sumaI+=Math.abs(ht.i),w.sumaV+=Math.abs(w.vAhora||0),w.ms++;let Ee=w.a&&w.a.tipo==="shield"||w.b&&w.b.tipo==="shield";w.sobreMs=Ee&&Math.abs(ht.i)>ct.maximoCanalA?w.sobreMs+1:0,w.sobreMs>ct.avisoCanalMs&&e({tipo:"l293d_corriente",componente:M,mensaje:`El motor ${M} pide ${wt(Math.abs(ht.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}G&&o&&e({tipo:"motores_sin_energia",componente:o.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[M,w]of a){if(!w.valida)continue;w.cargaExterna=Object.prototype.hasOwnProperty.call(F,M);let L=(S.get(M)||0)+(w.vin&&tt?I:0)+Math.max(0,F[M]||0);w.v=Math.max(0,w.voc-Yt.ohmios*L),w.iAntes=L,w.sumaI+=L,w.ms++;let k=Math.min(...ut(w));k<Yt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:M,mensaje:`La bater\\xEDa ${M} baj\\xF3 a ${wt(w.v,2)} V con los motores y una celda qued\\xF3 en ${wt(k,2)} V: menos de ${wt(Yt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return C+=g,T++,{i5V:d,porVin:tt,iFuentes:E}}function ut(P){let W=P.valida?P.iAntes:0;return P.celdas.map(N=>Math.max(0,N-Yt.ohmios/P.celdas.length*W))}function dt(P,W,N){let F=W.fuente&&a.get(W.fuente);if(!F)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:N};let I=ut(F),U=[0,I[0],I[0]+I[1]],O=[],it=0;for(let c of W.puntos){if(c===null)break;O.push(U[c]-it),it=U[c]}let tt=O.length>0&&it>=2.5,f=O.findIndex(c=>c<W.umbral),S=tt&&W.umbral>0&&f>=0;return S&&e({tipo:"probador_alarma",componente:P,mensaje:`El probador ${P} pita: la celda ${f+1} est\\xE1 en ${wt(Math.max(0,O[f]),2)} V, por debajo de ${wt(W.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:tt,celdas:O.map(c=>Math.max(0,c)),total:it,alarma:S,umbral:W.umbral,ms:N}}function mt(P=0){let W={},N={motores:[],baterias:[],shield:null,probadores:[]};for(let[F,I]of s){let U=I.logico.estado(),O={rpm:U.rpm,giro:U.giro,velocidad:U.velocidad,i:I.ms?I.sumaI/I.ms:Math.abs(U.i),voltios:I.ms?I.sumaV/I.ms:0};W[F]=O,N.motores.push({id:F,canal:I.canal,lado:I.lado,...O}),Object.assign(I,{sumaI:0,sumaV:0,ms:0})}for(let[F,I]of a){let U={voltios:I.valida?I.v:I.voc,celdas:ut(I),i:I.ms?I.sumaI/I.ms:0,carga:I.carga,conectada:I.motores||I.vin||!!I.cargaExterna};W[F]=U,N.baterias.push({id:F,...U}),Object.assign(I,{sumaI:0,ms:0})}if(o){let F=T?C/T:g;W[o.id]={motoresV:F},N.shield={id:o.id,motoresV:F,puente:o.puente,habilitada:h,salidas:r}}for(let[F,I]of i){let U=dt(F,I,P);W[F]=U,N.probadores.push({id:F,...U})}return C=0,T=0,{piezas:W,lista:N}}return{armar:y,pinesCambiaron:J,reiniciarChip:at,cadaMs:Pt,foto:mt,voltajeBateria:P=>a.get(P)?.v??null,get hay(){return!!o||s.size>0||a.size>0||i.size>0}}}var ce=Object.freeze({usbV:5,salida5V:5,salida3V3:3.3,reposoA:.025,resistenciaFuenteOhm:.25,caidaJackV:1.2,caida3V3V:1.2,caidaNano3V3V:.3,resistencia3V3Ohm:.5,aviso3V3A:.1,minimoJackV:7,maximoJackV:12,avisoNano3V3A:.05,resetV:2.7,validacion:"Modelo de referencia; Nano y expansi\\xF3n pendientes de medici\\xF3n f\\xEDsica."}),Es=Object.freeze(["usb","jack","apagada"]);function Ge(t,e){let o=t.componentes.find(p=>p.tipo==="shield_nano_io"),s=o&&o.props||{},a=Es.includes(s.alimentacion)?s.alimentacion:"usb",i=o?o.id+".JACK_POS":"placa.VIN",n=Number.isFinite(Number(s.voltajeJack))?Math.max(0,Math.min(12,Number(s.voltajeJack))):9,r=null;for(let p of t.componentes)if(p.tipo==="bateria_lipo"){if(e(p.id+".POS")===e(i)){r=p.id,n=e(p.id+".NEG")===e("placa.GND1")&&e(i)!==e("placa.GND1")?We(p.props&&p.props.carga):0;break}if(e(p.id+".NEG")===e(i)){r=p.id,n=0;break}}let h=!1;return e(i)===e("placa.GND1")&&(h=!r&&a==="jack"&&n>0,n=0),!o&&r&&(a="jack"),{alimentacion:a,voltiosJack:n,bateria:r,corto:h,expansion:o?o.id:null,entradaRef:i}}function we(t,{realista:e=!1,g5:o=0,g33:s=0,g33Expansion:a=0,fijo5:i=0}={}){let n=ce,r=t.alimentacion==="jack"||t.bateria?t.voltiosJack:0,h=t.expansion?0:r,u=t.alimentacion==="apagada"?0:t.alimentacion==="usb"?n.usbV:r<=0?0:e?Math.max(0,Math.min(n.salida5V,r-n.caidaJackV)):Math.min(n.salida5V,r),b=e?n.resistenciaFuenteOhm:0,g=e?n.resistencia3V3Ohm:0,$=u>0?n.reposoA:0,D=u,C=0,T=0;for(let at=0;at<12;at++)C=Math.max(0,Math.min(n.salida3V3,D-(e?n.caidaNano3V3V:0)))/(1+g*Math.max(0,s)),T=t.expansion?Math.max(0,Math.min(n.salida3V3,D-(e?n.caida3V3V:0)))/(1+g*Math.max(0,a)):0,D=Math.max(0,(u-b*($+Math.max(0,i)+C*Math.max(0,s)+T*Math.max(0,a)))/(1+b*Math.max(0,o)));C=Math.max(0,Math.min(n.salida3V3,D-(e?n.caidaNano3V3V:0)))/(1+g*Math.max(0,s)),T=t.expansion?Math.max(0,Math.min(n.salida3V3,D-(e?n.caida3V3V:0)))/(1+g*Math.max(0,a)):0;let A=C*Math.max(0,s),y=T*Math.max(0,a),J=u>0?$+Math.max(0,i)+D*Math.max(0,o)+A+y:0;return{v5:D,v33:C,v33Expansion:T,vin:h,entradaV:r,amperios:J,i33:A,i33Expansion:y,apagada:D<n.resetV,fuente:t.alimentacion,referencia:!0}}var bi=60,Ds=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ii=3,Ti=1.5,Mi=1/1e4,Ps=60,wi=Math.cos(.35*Math.PI),_i=.1*5/1024,yi=.15,$i=100,vs=50,Ei=.005;function Vs({hex:t,circuito:e,activas:o={},semilla:s=Math.floor(Math.random()*2**32)}){let a=Lt(e.placa),i=kt(e.placa),n=a.analogicos,r=vi(s),h=new Set,p=[],u={raiz:null,grupos:new Set},b=new Set,g=new Set,$=new Set,D={},C=new Map,T={},A=null,y=e,J=null,at=new Map,Pt=new Map,ut={},dt=null,mt=new Map,P=new Map,W=[],N=0,F=0,I={inicio:0,clave:""},U=null,O=null,it=-1/0,tt={},f=0,S=0,c=[],_=new TextDecoder("utf-8"),d=new Set,E=new Set,z=[],G=[],M=new Map,w=0,L=mo(),k=!1,_t=0,ht=null,Ee=0,q=lt.idealV,jt=0,Ft=0,Wt=0,xt=0,yt=[],gt=$s({activas:o,avisar:l=>Ct(l)}),fe=0,te=!1,v=null,H=null,De=!1,Pe=null,js=Object.fromEntries(Bt.map(l=>[l,bt.Input])),vt=()=>(w+A.ciclos)/Tt*1e3,Fs=l=>Bt.reduce((x,R)=>x+l[R]*Ao[R],0);function de(){A=Yo(t),i&&A.ponerVoltajeReferencia(q);let l=A.estados();N=Fs(l),mt.set(N,l),F=0,P=new Map,W=[],I={inicio:0,clave:N},U=null,A.alCambiarPines((x,R)=>{Mo();let m=mt.get(N);for(let V in x)N+=(x[V]-m[V])*Ao[V];mt.has(N)||mt.set(N,{...R}),N===I.clave&&(U={tiempos:new Map(P),ciclo:A.ciclos}),it=A.ciclos;for(let V in x)tt[V]=A.ciclos;Vt(),M.size&&Hs(x),gt.pinesCambiaron(x,R,A.ciclos)}),A.alCadaMs(Js),A.alCadaMs(yo);for(let x of M.values())x.subida=null;gt.reiniciarChip(),it=-1/0,tt={},A.ponerLectorAnalogico(Zs),ut={},dt=null,A.alByteSerial(x=>{c.push(x),S=vt()+bi})}function Mo(){let l=A.ciclos;P.set(N,(P.get(N)||0)+(l-F)),F=l}function he(){a=Lt(y.placa),i=kt(y.placa),n=a.analogicos,i&&(v=Ge(y,Nt(y)),H=we(v,{realista:!!o.limiteUSB}),Pe=H,q=H.v5,k=H.apagada,A.ponerVoltajeReferencia(q));let l=i&&v.expansion?[{ref:v.expansion+".OUT_3V3",voltios:H.v33Expansion,nombre:"la salida 3,3V de la expansi\\xF3n"},...H.entradaV>0?[{ref:v.expansion+".JACK_POS",voltios:H.entradaV,nombre:"la entrada del jack"}]:[]]:[];J=us(y,{quemados:d,presionados:h,...i?{alimentacion:Le(),fuentesExtra:l}:{}}),at=new Map,Pt=new Map,Ls(),gt.armar(y,Nt(y),i?{fuentesMotor:{"3V3":"placa.3V3",...v.expansion?{[v.expansion+".OUT_3V3"]:v.expansion+".OUT_3V3"}:{}},entradas:[v.entradaRef]}:{}),wo(),i&&Ws()}function Le(){return{"5V":H.v5,"3V3":H.v33,VIN:H.vin,...v.expansion?{[v.expansion+".OUT_3V3"]:H.v33Expansion,[v.expansion+".JACK_POS"]:H.entradaV}:{}}}function Ws(){let l=v.expansion||"placa";v.corto?Ct({tipo:"cortocircuito",componente:v.entradaRef,mensaje:"La entrada del jack est\\xE1 unida directo a GND: es un cortocircuito. Quita ese cable."}):v.alimentacion==="jack"&&v.voltiosJack<ce.minimoJackV&&Ct({tipo:"nano_alimentacion",componente:l,voltios:v.voltiosJack,mensaje:`El jack recibe ${v.voltiosJack.toFixed(1).replace(".",",")} V: la referencia recomienda 7 a 12 V. Con menos voltaje bajan las salidas y el Nano puede quedar en reinicio.`})}function wo(){if(!p.length){u={raiz:null,grupos:new Set};return}let l=Nt(y,{presionados:h,conduccion:!0});u={raiz:l,grupos:new Set(p.map(l))}}let _o=l=>u.grupos.size>0&&u.grupos.has(u.raiz(l)),Gs=()=>Math.sin(2*Math.PI*Ps*(vt()/1e3))>wi;function Ls(){let l=Nt(y),x=(m,V)=>l(m)===l(V),R=new Map;for(let m of y.componentes){if(m.tipo!=="servo")continue;let V=Qt[m.props&&m.props.modelo]?m.props.modelo:"sg90",et=M.get(m.id),ft=et&&et.modelo===V?et:{modelo:V,logico:gs(V),subida:null,sumaA:0,picoA:0,msVentana:0};ft.senal=Bt.find(nt=>x(m.id+".SIG","placa."+nt))||null;let St=x(m.id+".GND","placa.GND1"),ot=Bt.find(nt=>x(m.id+".VCC","placa."+nt)),Q=i&&v.expansion&&v.expansion+".OUT_3V3";ft.fuente=x(m.id+".VCC","placa.5V")?"5V":x(m.id+".VCC","placa.3V3")?"3V3":Q&&x(m.id+".VCC",Q)?Q:ot||null,ft.conectado=St&&(ft.fuente==="5V"||ft.fuente==="3V3"||!!Q&&ft.fuente===Q),ot&&St&&Ct({tipo:"servo_alimentacion",componente:m.id,mensaje:`El servo ${m.id} toma la corriente del pin ${ot.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Qt[V].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),R.set(m.id,ft)}M=R}function Hs(l){for(let x of M.values())!x.senal||!(x.senal in l)||(l[x.senal]===bt.High?x.subida=A.ciclos:x.subida!==null&&(x.conectado&&!k&&x.logico.pulso((A.ciclos-x.subida)/Tt*1e6),x.subida=null))}let xe=l=>!l.conectado||k&&!i?0:l.fuente==="5V"?q:i?l.fuente==="3V3"?H.v33:H.v33Expansion:3.3;function yo(){if(i)return Ks();gt.hay&&({i5V:fe,porVin:te}=gt.cadaMs(A.ciclos,{v5:q,logica:!k&&q>lt.bodV}));for(let m of M.values())m.logico.avanzar(1,xe(m));let l=k?0:lt.placaA+Ee+fe,x=0;for(let m of M.values())m.conectado&&m.fuente==="5V"&&(x+=m.logico.corriente(1));q=k?0:te?lt.idealV:o.limiteUSB?Ss(l,x):lt.idealV;let R=l;for(let m of M.values()){let V=m.logico.corriente(xe(m));m.sumaA+=V,m.picoA=Math.max(m.picoA,V),m.msVentana++,(m.fuente==="5V"||m.fuente==="3V3")&&(R+=V)}te&&(R=0),o.limiteUSB&&(L.avanzar(1,R),!k&&!ht&&(q<lt.bodV?ht={motivo:"caida",amperios:R,voltios:q}:R>lt.limitePuertoA?ht={motivo:"puerto",amperios:R}:L.abierto&&(ht={motivo:"fusible",amperios:R}))),Ft+=R,Wt=Math.max(Wt,R),xt++}function Ks(){let l=k,x=ve(N),R=j=>x?(x.fuentes.find(At=>At.pin===j)||{i:0}).i:0,m=Math.max(0,R(v.expansion?v.entradaRef:"VIN")),V={};if(gt.hay){let j=v.bateria?{[v.bateria]:(v.alimentacion==="jack"?H.amperios:0)+m}:{};({i5V:fe,iFuentes:V}=gt.cadaMs(A.ciclos,{v5:q,logica:!k,cargasBateria:j,consumoPorVinA:0,habilitarVin:!1,voltajesMotor:{"3V3":H.v33,...v.expansion?{[v.expansion+".OUT_3V3"]:H.v33Expansion}:{}}}));let At=v.bateria&&gt.voltajeBateria(v.bateria);typeof At=="number"&&v.voltiosJack>0&&(v.voltiosJack=At)}for(let j of M.values())j.logico.avanzar(1,xe(j));let et=q>0?(Math.max(0,R("5V"))+(x?x.pines.reduce((j,At)=>j+Math.max(0,At.i),0):0))/q:0,ft=H.v33>0?(Math.max(0,R("3V3"))+(V["3V3"]||0))/H.v33:0,St=H.v33Expansion>0&&v.expansion?(Math.max(0,R(v.expansion+".OUT_3V3"))+(V[v.expansion+".OUT_3V3"]||0))/H.v33Expansion:0;for(let j of M.values())j.conectado&&(j.fuente==="5V"?et+=j.logico.corriente(1):j.fuente==="3V3"?ft+=j.logico.corriente(1):St+=j.logico.corriente(1));let ot=we(v,{realista:!!o.limiteUSB,g5:et,g33:ft,g33Expansion:St,fijo5:fe}),Q=["v5","v33","v33Expansion","vin","entradaV"].some(j=>Math.abs(ot[j]-Pe[j])>Ei);H=ot,q=ot.v5,k=ot.apagada,te=v.alimentacion==="jack",!l&&k&&(De=!0),(Q||l!==k)&&(Pe=ot,J.ponerAlimentacion(Le()),A.ponerVoltajeReferencia(q),at.clear(),Pt.clear(),dt=null,Vt()),o.limiteUSB&&ot.i33Expansion>ce.aviso3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:v.expansion+".OUT_3V3",corriente_mA:Math.round(ot.i33Expansion*1e3),mensaje:"La salida 3,3 V supera 100 mA en el modelo de referencia y su voltaje baja. Reduce la carga; el l\\xEDmite de tu expansi\\xF3n real est\\xE1 pendiente de comprobar."}),o.limiteUSB&&ot.i33>ce.avisoNano3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:"placa.3V3",corriente_mA:Math.round(ot.i33*1e3),mensaje:"La salida 3,3 V del m\\xF3dulo Nano supera 50 mA, el m\\xE1ximo publicado para el Arduino Nano oficial. Reduce la carga; comprueba el l\\xEDmite de tu clon. Esta salida es distinta de la expansi\\xF3n."});for(let j of M.values()){let At=j.logico.corriente(xe(j));j.sumaA+=At,j.picoA=Math.max(j.picoA,At),j.msVentana++}let nt=ot.amperios+(v.alimentacion==="jack"?m:0);Ft+=nt,Wt=Math.max(Wt,nt),xt++}function $o({porCarga:l=!0}={}){De=!1,l&&jt++,q>0&&Ct({tipo:"nano_bajo_voltaje",componente:"placa",voltios:q,mensaje:"La alimentaci\\xF3n del Nano baj\\xF3 del umbral de reinicio de referencia (2,7 V). El programa espera mientras vuelve la energ\\xEDa. Revisa la fuente y reduce la carga."}),w+=A.ciclos,de(),Vt()}function Xs(){let{motivo:l,amperios:x,voltios:R}=ht;ht=null,l==="caida"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),voltios:Math.round(R*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${R.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):l==="puerto"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${x.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(lt.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Ct({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(x*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),k=!0,_t=0),jt++,w+=A.ciclos,de(),Vt()}function zs(l){let x=Tt/1e3,R=l;for(;R>0&&k;){let m=Math.min(R,x-_t);if(w+=m,R-=m,_t+=m,_t<x)break;_t=0,yo(),!i&&!L.abierto&&(k=!1)}R>0&&A.correr(R)}function Eo(){let l=vt();yt=yt.filter(([R])=>l-R<1e3),yt.push([l,Wt]);let x={amperios:xt?Ft/xt:0,pico:Math.max(...yt.map(([,R])=>R)),voltios:q,fusible:Math.round(L.calor*100)/100,apagada:k,reinicios:jt};return i&&Object.assign(x,{fuente:H.fuente,voltios3V3:H.v33,voltios3V3Expansion:H.v33Expansion,voltiosJack:H.entradaV,referencia:!0,fusible:null,expansion:v.expansion}),Ft=0,Wt=0,xt=0,x}function Do(){let l={};for(let[x,R]of M){let m=R.logico.estado();l[x]={modelo:R.modelo,angulo:Math.round(m.angulo*10)/10,pulso:m.pulso===null?null:Math.round(m.pulso),senal:R.senal,fuente:R.fuente,moviendo:m.moviendo,i:R.msVentana?R.sumaA/R.msVentana:R.logico.corriente(xe(R)),pico:R.picoA},R.sumaA=0,R.picoA=0,R.msVentana=0}return l}function qs(l,x,R){let m=Pt.get(l);if(m)return m;let V=J.flotantes(x),et=new Set;n.forEach((Q,nt)=>{V.has(Q[0])&&et.add(nt)});let ft=new Set,St=[];for(let Q of Ds){let nt=x[Q];if(nt!==bt.Input&&nt!==bt.InputPullUp)continue;if(V.has(Q)){ft.add(Q),St.push([Q,"aire"]);continue}let j=R?R.voltajes["placa."+Q]:null;typeof j=="number"?St.push([Q,j>=(i?.6*q:Ii)?!0:j<=(i?.3*q:Ti)?!1:null]):St.push([Q,nt===bt.InputPullUp])}let ot=n.map(Q=>{for(let nt of Q){let j=R?R.voltajes["placa."+nt]:null;if(typeof j=="number")return j}return null});return m={canales:et,alAire:ft,entradas:St,analogicos:ot,refsAlAire:J.refsAlAire(x)},R&&Pt.set(l,m),m}function He(l,x){ut[l]!==x&&(ut[l]=x,A.ponerEntrada(l,x))}function Vt(){if(!J||!A)return;let l=mt.get(N)||A.estados(),x=ve(N),R=qs(N,l,x);b=R.alAire;for(let[m,V]of R.entradas){if(V==="aire"){m in D||(D[m]=r()<.5),He(m,o.entradaFlotante?D[m]:!1);continue}let et=V===null?!!T[m]:V;T[m]=et,He(m,et)}g=R.canales,x&&R.analogicos!==dt&&(R.analogicos.forEach((m,V)=>{m!==null&&(!dt||dt[V]!==m)&&A.ponerAnalogico(V,m)}),dt=R.analogicos),$=R.refsAlAire}function Js(){if(!(!o.entradaFlotante||!b.size))for(let l of b){let x=_o("placa."+l)?Gs():r()<Mi?!D[l]:D[l];x!==D[l]&&(D[l]=x,He(l,x))}}function Zs(l,x){if(g.has(l)){if(!o.entradaFlotante)return 0;if(n[l]&&_o("placa."+n[l][0]))return 2.5+2.5*Math.sin(2*Math.PI*Ps*(vt()/1e3));let R=C.has(l)?C.get(l):1+3*r(),m=Math.max(0,Math.min(5,R+Po()*yi));return C.set(l,m),m}return o.ruidoADC?x+Po()*_i:x}function Po(){return Math.sqrt(-2*Math.log(1-r()))*Math.cos(2*Math.PI*r())}function Ct(l){let x=l.tipo+"|"+l.componente;return E.has(x)?!1:(E.add(x),z.push(l),G.push(l),!0)}function ve(l){for(let x=0;x<4;x++){let R=at.get(l);if(R)return R;J.ponerPines(i&&k?js:mt.get(l));let m=null;try{m=J.resolver()}catch{m=null}if(f++,!m||!m.convergio)return Ct({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;at.set(l,m);let V=!1;for(let et of[...J.fallasFijas,...ms(m,o)])Ct(et)&&et.tipo==="led_quemado"&&(d.add(et.componente),V=!0);if(!V)return m;he()}return at.get(l)||null}function Qs(){if(k)return Ys();Mo();let l=P;if(U&&U.ciclo>I.inicio){l=U.tiempos;let Y=new Map;for(let[st,Gt]of P){let Vo=Gt-(U.tiempos.get(st)||0);Vo>0&&Y.set(st,Vo)}P=Y,I={inicio:U.ciclo,clave:I.clave}}else P=new Map,I={inicio:A.ciclos,clave:N};U=null;let x=[...l].filter(([,Y])=>Y>0);x.length||(x=W.length?W:[[N,1]]),W=x;let R=x.reduce((Y,[,st])=>Y+st,0),m=[];for(let[Y,st]of x){let Gt=ve(Y);if(!Gt){m.length=0;break}m.push([Gt,st/R])}let V=m.length?Pi(m):null,et=new Set(Bt.filter(Y=>Y in tt&&A.ciclos-tt[Y]<vs/1e3*Tt));V&&(V.pwm=Di(x,R,et)),oa(V),dt=null;let St=A.ciclos-it>vs/1e3*Tt?1:1-Math.exp(-(R/Tt*1e3)/$i);O=V?Ro(V,O,St):null;let ot=A.estados(),Q=c.length?_.decode(Uint8Array.from(c),{stream:!0}):"";c=[];let nt=Do(),j=Eo(),At=gt.foto(vt());if(Ee=O?O.fuentes.reduce((Y,st)=>Y+Math.max(0,st.i),0)+O.pines.reduce((Y,st)=>Y+Math.max(0,st.i),0):0,O){O.usb=j,O.servos=Object.entries(nt).map(([st,Gt])=>({id:st,...Gt}));let Y=(O.fuentes.find(st=>st.pin==="5V")||{i:0}).i;O.consumo5V=Y+O.servos.filter(st=>st.fuente==="5V").reduce((st,Gt)=>st+Gt.i,0),Object.assign(O,At.lista,{porVin:te})}let aa=G;return G=[],{msSimulados:vt(),servos:nt,piezas:At.piezas,evaluaciones:f,leds:Object.fromEntries((O?O.leds:[]).map(Y=>[Y.id,Y.brillo])),quemados:[...d],voltajes:ta(),entradas:ea(),placa:{led13:ot.D13===bt.High,ledTX:vt()<S,...i?{encendida:!0}:{}},serial:Q,fallas:aa,medicion:O,energia:j}}function Ys(){let l=i?ve(N):null,x=G;return G=[],{msSimulados:vt(),evaluaciones:f,servos:Do(),piezas:gt.foto(vt()).piezas,energia:Eo(),leds:{},quemados:[...d],voltajes:l?.voltajes||{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:x,medicion:null}}function ta(){if(!O)return{};if(!$.size)return O.voltajes;let l={...O.voltajes};for(let x of $)x in l&&(l[x]=null);return l}function ea(){let l={};for(let x of Ds)b.has(x)?l[x]={alto:!!o.entradaFlotante&&!!D[x],alAire:!0}:x in T&&(l[x]={alto:T[x],alAire:!1});return l}function oa(l=O){l&&n.forEach((x,R)=>{for(let m of x){let V=l.voltajes["placa."+m];if(typeof V=="number")return A.ponerAnalogico(R,V)}})}function sa(){d.clear(),E.clear(),z.length=0,G=[],c=[],_=new TextDecoder("utf-8"),S=0,vo(),de(),he(),Vt()}function vo(){w=0,k=!1,_t=0,ht=null,yt=[],L.reiniciar(),q=lt.idealV,fe=0,te=!1,De=!1,i&&(v=Ge(y,Nt(y)),H=we(v,{realista:!!o.limiteUSB}),Pe=H,q=H.v5,k=H.apagada,J&&J.ponerAlimentacion(Le()),at.clear(),Pt.clear(),dt=null)}return de(),he(),Vt(),{get ciclos(){return w+A.ciclos},avanzar(l){if(k)return zs(l);A.correr(l),De&&$o(),ht&&Xs()},foto:Qs,ponerCircuito(l){let x=k;y=l,he(),i&&!x&&k&&$o({porCarga:!1}),Vt()},ponerMano(l){p=Array.isArray(l)?l.filter(x=>typeof x=="string"):[],wo()},ponerPulsador(l,x){x?h.add(l):h.delete(l),he(),Vt()},enviarSerial:l=>A.enviarSerial(String(l)),reiniciarChip(){vo(),de(),Vt()},reiniciarTodo(){jt=0,sa()},fallas:()=>[...z]}}function Di(t,e,o=new Set){let s={},a=new Set;for(let[r,h]of t)for(let p=0;p<Bt.length;p++){let u=Math.floor(r/Ao[Bt[p]])%4===bt.High;s[p]=(s[p]||0)+(u?h:0),a.add(p)}let i=Bt,n={};for(let r of a){let h=s[r]/e;(h>0&&h<1||o.has(i[r]))&&(n[i[r]]=Math.round(h*1e3)/1e3)}return n}var Bt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ao=Object.fromEntries(Bt.map((t,e)=>[t,4**e]));function Pi(t){if(t.length===1)return t[0][0];let e=t[0][0],o=n=>n.reduce((r,[,h])=>r+h,0),s=n=>{let r=0;for(let[h,p]of t){let u=n(h);if(u==null)return null;r+=p*u}return r},a=(n,r,h)=>[...new Set(t.flatMap(([u])=>u[n].map(b=>b[r])))].map(u=>{let b={[r]:u},g=t.filter(([D])=>D[n].some(C=>C[r]===u)),$=o(g);for(let D of h)D==="i"?b.i=t.reduce((C,[T,A])=>C+A*((T[n].find(y=>y[r]===u)||{i:0}).i||0),0):b[D]=$?g.reduce((C,[T,A])=>C+A*(T[n].find(y=>y[r]===u)[D]||0),0)/$:null;return b}),i={};for(let n of Object.keys(e.voltajes))i[n]=s(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:i,leds:e.leds.map((n,r)=>{let h=s(p=>p.leds[r]?p.leds[r].i:0);return{id:n.id,quemado:t.some(([p])=>p.leds[r]&&p.leds[r].quemado),v:s(p=>p.leds[r]?p.leds[r].v:null),i:h,brillo:Math.max(0,Math.min(1,h*1e3/pt.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:s(h=>h.resistencias[r].v),i:s(h=>h.resistencias[r].i),w:s(h=>h.resistencias[r].w)})),pines:a("pines","pin",["v","i"]),fuentes:a("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:s(h=>h.potenciometros[r].v),i:s(h=>h.potenciometros[r].i)}))}}function Ro(t,e,o){if(typeof t=="number")return typeof e=="number"&&o<1?e+o*(t-e):t;if(Array.isArray(t)){let s=i=>i&&typeof i=="object"?i.id||i.pin:void 0,a=new Map((Array.isArray(e)?e:[]).map(i=>[s(i),i]));return t.map((i,n)=>Ro(i,s(i)!==void 0?a.get(s(i)):(e||[])[n],o))}if(t&&typeof t=="object"){let s={};for(let a of Object.keys(t))s[a]=Ro(t[a],e&&typeof e=="object"?e[a]:void 0,o);return s}return t}function vi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}var Vi=16,Oi=8,Ui=50,ki=500,_e=Tt/1e3,It=null,ye=!1,Os=0,Kt=0,bo=0,Us=0,To=0,Io=!1,le=[],ks=new MessageChannel;ks.port1.onmessage=Ns;function Ns(){Io=!1,Bi()}function Bs(t){Io||(Io=!0,t>0?setTimeout(Ns,t):ks.port2.postMessage(null))}function Ni(t){for(;le.length&&t-le[0][0]>ki;)le.shift();let e=0,o=0;for(let[,s,a]of le)e+=s,o+=a;return e>0?Math.min(1,o/(e*_e)):1}function $e(t=performance.now()){Us=t;let e=It.foto();self.postMessage({tipo:"foto",corrida:Os,...e,velocidad:Ni(t),msReales:To})}function Bi(){if(!ye||!It)return;let t=performance.now(),e=Math.max(0,t-bo);bo=t,To+=e,Kt=Math.min(Kt+e*_e,Ui*_e);let o=performance.now(),s=0;for(;Kt>=1&&performance.now()-o<Oi;){let a=It.ciclos;It.avanzar(Math.min(Math.floor(Kt),_e));let i=It.ciclos-a;Kt-=i,s+=i}le.push([t,e,s]),t-Us>=Vi&&$e(t),Bs(Kt>=_e?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(Os=e.corrida),e.tipo){case"crear":It=Vs({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(It.reiniciarTodo(),To=0),ye=!0,Kt=0,bo=performance.now(),le.length=0,$e(),Bs(0);break;case"pausar":ye=!1;break;case"reiniciar":It.reiniciarChip(),Kt=0,$e();break;case"detener":ye=!1;break;case"circuito":It.ponerCircuito(e.circuito),e.mostrar&&$e();break;case"serial":It.enviarSerial(e.texto);break;case"pulsador":It.ponerPulsador(e.id,e.presionado),ye||$e();break;case"mano":It.ponerMano(e.refs);break}}catch(o){self.postMessage({tipo:"error",mensaje:String(o&&o.message||o)})}};self.postMessage({tipo:"listo"});})();\n';function Rn(t={}){let{lienzo:e,hex:o}=t,i=t.placa||e?.circuito?.()?.placa||"uno";if(!wt[i])throw new Error(`Este prototipo no simula la placa \xAB${i}\xBB.`);if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");if(e.circuito().placa!==i)throw new Error("El programa y el circuito deben usar la misma placa.");wn(o);let s=t.modo==="ideal"?"ideal":"realista",l=Object.fromEntries(xl.map(R=>[R,s==="realista"]));Object.assign(l,t.noIdealidades||{});let p=typeof t.alEvento=="function"?t.alEvento:null,d={serial:[],falla:[],estado:[]},n="detenido",m=!0,y=0,b=null,w=0,T={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},x=null,E=0,k=[],j=gl(J);j.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:l});function J(R){if(!m)return;if(R.tipo==="error")return console.error("TecnoCircuito:",R.mensaje);if(R.tipo!=="foto"||R.corrida!==y||n==="detenido")return;Object.assign(T,{msSimulados:R.msSimulados,msReales:R.msReales,velocidad:R.velocidad,evaluaciones:R.evaluaciones}),x=R.medicion?{...R.medicion,voltajes:R.voltajes,entradas:R.entradas}:null;for(let ot of R.fallas){k.push(ot),d.falla.forEach(xe=>Ot(xe,{tipo:ot.tipo,componente:ot.componente,mensaje:ot.mensaje}));let{mensaje:ro,...kt}=ot;B("falla",kt)}let et=R.energia?R.energia.reinicios:0;et>E&&B("reinicio_placa",{motivo:R.energia.referencia?"energia_nano":"energia_usb",...R.energia.referencia?{fuente:R.energia.fuente}:{},nuevos:et-E,total:et}),E=et,R.serial&&d.serial.forEach(ot=>Ot(ot,R.serial)),b=R,w||(w=requestAnimationFrame(Mt))}function Mt(){if(w=0,n==="detenido"||!b)return e._mostrar({simulando:n!=="detenido"});e._mostrar({simulando:!0,leds:b.leds,quemados:b.quemados,voltajes:b.voltajes,servos:b.servos||{},piezas:b.piezas||{},placa:{ledPower:b.placa.encendida!==!1,led13:b.placa.led13,ledTX:b.placa.ledTX}})}function Ot(R,et){try{R(et)}catch(ot){console.error(ot)}}function B(R,et){p&&Ot(p,{t:Date.now(),origen:"simulador",tipo:R,datos:et})}function Ht(R){n=R,d.estado.forEach(et=>Ot(et,R))}return typeof e._alAcercar=="function"&&e._alAcercar(R=>{m&&j.enviar({tipo:"mano",refs:R})}),typeof e._alPulsar=="function"&&e._alPulsar((R,et)=>{m&&j.enviar({tipo:"pulsador",id:R,presionado:et})}),e.alCambiar(R=>{m&&j.enviar({tipo:"circuito",circuito:R,mostrar:n!=="detenido",corrida:y})}),{iniciar(){if(!m||n==="corriendo")return;let R=n==="detenido";y++,R&&(k.length=0,x=null,b=null,E=0,Object.assign(T,{msSimulados:0,msReales:0,velocidad:1}),B("simulacion_iniciada",{placa:i,modo:s})),Ht("corriendo"),j.enviar({tipo:"iniciar",nuevo:R,corrida:y})},pausar(){n==="corriendo"&&(y++,j.enviar({tipo:"pausar",corrida:y}),Ht("pausado"))},reiniciar(){!m||n==="detenido"||(y++,T.msSimulados=0,j.enviar({tipo:"reiniciar",corrida:y}),j.enviar({tipo:"iniciar",nuevo:!1,corrida:y}),E=0,B("reinicio_placa",{motivo:"boton"}),Ht("reiniciado"),Ht("corriendo"))},detener(){n!=="detenido"&&(y++,j.enviar({tipo:"detener",corrida:y}),B("simulacion_detenida",{ms_simulados:Math.round(T.msSimulados)}),Ht("detenido"),x=null,Mt())},serialEnviar(R){n!=="detenido"&&j.enviar({tipo:"serial",texto:String(R)})},alSerial:R=>typeof R=="function"&&d.serial.push(R),alFalla:R=>typeof R=="function"&&d.falla.push(R),alEstado:R=>typeof R=="function"&&d.estado.push(R),medidas:()=>({...T,estado:n,hilo:j.hilo()}),destruir(){m&&(this.detener(),m=!1,cancelAnimationFrame(w),j.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>n==="detenido"||!x?null:{...x,fallas:[...k],modo:s,activas:l},_mediciones(){return this.mediciones()}}}function gl(t){let e=null,o="worker",i=!1,s=[],l=d=>{if(d&&d.tipo==="listo"){i=!0,s.length=0;return}t(d)};function p(){o="pagina",e=bl(l),s.splice(0).forEach(d=>e.postMessage(d))}try{if(!qi||typeof Worker!="function")throw new Error("sin Worker");let d=URL.createObjectURL(new Blob([qi],{type:"text/javascript"})),n=new Worker(d);n.onmessage=m=>{m.data&&m.data.tipo==="listo"&&URL.revokeObjectURL(d),l(m.data)},n.onerror=m=>{if(i)return console.error("TecnoCircuito:",m.message);m.preventDefault(),n.terminate(),p()},e=n}catch{p()}return{enviar(d){!i&&o==="worker"&&s.push(d),e.postMessage(d)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function bl(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",qi)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var so=(t,e)=>t.toFixed(e).replace(".",","),bt=t=>t==null?"al aire":so(t,2)+" V",Dt=t=>so(t*1e3,Math.abs(t)<.01?2:1)+" mA",En=(t,e)=>(t>=1e3?so(t/1e3,e)+" k":t+" ")+"\u03A9",Pn=t=>"Pin "+t.replace(/^D/,"");function Tn(t){if(!t||!t.leds)return[];let e=(n,m,y,b)=>({pieza:n,voltaje:m||"",corriente:y||"",detalle:b||""}),o=n=>{let m=t.entradas&&t.entradas[n];return m?m.alAire?`al aire: lee ${m.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:m.alto?"lee ALTO":"lee BAJO":""},i=new Set(t.pines.map(n=>n.pin)),s=t.servos||[],l=n=>s.find(m=>m.senal===n&&m.pulso),p=n=>{let m=l(n.pin);if(m)return`se\xF1al de servo: pulso de ${m.pulso} \xB5s`;let y=t.pwm&&t.pwm[n.pin];return y>.005&&y<.995?`PWM ${Math.round(y*100)} %`:o(n.pin)},d=t.usb;return[...t.pines.map(n=>e(Pn(n.pin),bt(n.v),Dt(n.i),p(n))),...Object.keys(t.entradas||{}).filter(n=>!i.has(n)&&"placa."+n in t.voltajes).map(n=>e(Pn(n)+" (entrada)",bt(t.voltajes["placa."+n]),"",o(n))),...(t.potenciometros||[]).map(n=>e(`${n.id} (${En(n.ohmios,0)})`,bt(n.v),Dt(n.i),`perilla ${Math.round(n.posicion*100)} %`)),...t.resistencias.map(n=>e(`${n.id} (${En(n.ohmios,1)})`,bt(n.v),Dt(n.i),so(n.w*1e3,1)+" mW")),...t.leds.map(n=>e(n.id,bt(n.v),Dt(n.i),n.quemado?"quemado":`brillo ${Math.round(n.brillo*100)} %`)),...s.map(n=>e(`${n.id} (${n.modelo.toUpperCase()})`,"",Dt(n.i),n.fuente?n.senal?`${Math.round(n.angulo)}\xB0${n.moviendo?", movi\xE9ndose":""}${n.pulso?` \xB7 pulso ${n.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,bt(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(n=>{let m=Math.abs(n.velocidad),y=Math.sign(n.velocidad)*(n.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${n.id} (${n.canal||"sin shield"})`,bt(n.voltios),Dt(n.i),Math.abs(n.rpm)<1?"quieto":`${Math.round(Math.abs(n.rpm))} RPM \xB7 ${y} ${Math.round(m)} cm/s`)}),...(t.baterias||[]).map(n=>{let m=n.celdas||[n.voltios/2,n.voltios/2];return e(`${n.id} (LiPo 2S)`,bt(n.voltios),n.conectada?Dt(n.i):"",`celdas ${m.map(y=>so(y,2)).join(" y ")} V${Math.min(...m)<Ye.avisoCeldaV?" \xB7 c\xE1rgala":""}${n.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(n=>e(`${n.id} (probador)`,n.encendido?bt(n.total):"","",n.encendido?`${n.celdas.length}S \xB7 ${n.celdas.map((m,y)=>`${y+1}: ${so(m,2)} V`).join(" \xB7 ")}${n.alarma?" \xB7 \xA1pita!":""}`:"apagado: el \u2212 va al negro del balance (al rev\xE9s no enciende)")),...s.length&&!d?.referencia?[e("5V de la placa (USB)","",Dt(t.consumo5V),"el USB da hasta 500 mA")]:[],...d?.referencia?[e("Nano \xB7 alimentaci\xF3n",bt(d.voltios),Dt(d.amperios),`${d.fuente==="jack"?"jack de la expansi\xF3n":d.fuente==="apagada"?"desconectada":"USB"} \xB7 modelo de referencia por validar${d.apagada?" \xB7 placa apagada":""}`),e("Nano \xB7 3,3V del m\xF3dulo",bt(d.voltios3V3),"","salida del m\xF3dulo"),...d.expansion?[e("Expansi\xF3n \xB7 3,3V",bt(d.voltios3V3Expansion),"","regulaci\xF3n externa \xB7 red separada del m\xF3dulo")]:[],...d.fuente==="jack"?[e(d.expansion?"Expansi\xF3n \xB7 jack":"Nano \xB7 VIN",bt(d.voltiosJack),"","entrada del regulador de referencia")]:[]]:[],...d&&!d.referencia&&(s.length||d.reinicios||d.pico>.2)?[e("USB (placa y circuito)",bt(d.voltios),Dt(d.amperios),`pico ${Dt(d.pico)} \xB7 fusible ${Math.round(d.fusible*100)} %${d.reinicios?` \xB7 ${d.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.1.0-dev",CONTRATO:1,PLACAS:Object.freeze(Object.keys(wt)),crearLienzo:_n,crearSimulador:Rn,filasDeMediciones:Tn});})();
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
