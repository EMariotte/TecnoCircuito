(()=>{var Po=globalThis,To=Po.ShadowRoot&&(Po.ShadyCSS===void 0||Po.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,na=Symbol(),zs=new WeakMap,ze=class{constructor(e,o,s){if(this._$cssResult$=!0,s!==na)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(To&&e===void 0){let s=o!==void 0&&o.length===1;s&&(e=zs.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&zs.set(o,e))}return e}toString(){return this.cssText}},Hs=t=>new ze(typeof t=="string"?t:t+"",void 0,na),At=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((s,i,c)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[c+1],t[0]);return new ze(o,t,na)},Gs=(t,e)=>{if(To)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let s=document.createElement("style"),i=Po.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=o.cssText,t.appendChild(s)}},ca=To?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let s of e.cssRules)o+=s.cssText;return Hs(o)})(t):t;var{is:Wr,defineProperty:Fr,getOwnPropertyDescriptor:zr,getOwnPropertyNames:Hr,getOwnPropertySymbols:Gr,getPrototypeOf:qr}=Object,Mo=globalThis,qs=Mo.trustedTypes,Xr=qs?qs.emptyScript:"",Kr=Mo.reactiveElementPolyfillSupport,He=(t,e)=>t,Ge={toAttribute(t,e){switch(e){case Boolean:t=t?Xr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Io=(t,e)=>!Wr(t,e),Xs={attribute:!0,type:String,converter:Ge,reflect:!1,useDefault:!1,hasChanged:Io};Symbol.metadata??=Symbol("metadata"),Mo.litPropertyMetadata??=new WeakMap;var Lt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Xs){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,o);i!==void 0&&Fr(this.prototype,e,i)}}static getPropertyDescriptor(e,o,s){let{get:i,set:c}=zr(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){let f=i?.call(this);c?.call(this,n),this.requestUpdate(e,f,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xs}static _$Ei(){if(this.hasOwnProperty(He("elementProperties")))return;let e=qr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(He("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(He("properties"))){let o=this.properties,s=[...Hr(o),...Gr(o)];for(let i of s)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[s,i]of o)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[o,s]of this.elementProperties){let i=this._$Eu(o,s);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)o.unshift(ca(i))}else e!==void 0&&o.push(ca(e));return o}static _$Eu(e,o){let s=o.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let s of o.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Gs(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,s){this._$AK(e,s)}_$ET(e,o){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let c=(s.converter?.toAttribute!==void 0?s.converter:Ge).toAttribute(o,s.type);this._$Em=e,c==null?this.removeAttribute(i):this.setAttribute(i,c),this._$Em=null}}_$AK(e,o){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let c=s.getPropertyOptions(i),n=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:Ge;this._$Em=i;let f=n.fromAttribute(o,c.type);this[i]=f??this._$Ej?.get(i)??f,this._$Em=null}}requestUpdate(e,o,s,i=!1,c){if(e!==void 0){let n=this.constructor;if(i===!1&&(c=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??Io)(c,o)||s.useDefault&&s.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,o,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:s,reflect:i,wrapped:c},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),c!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,c]of this._$Ep)this[i]=c;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,c]of s){let{wrapped:n}=c,f=this[i];n!==!0||this._$AL.has(i)||f===void 0||this.C(i,void 0,c,f)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(o)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Lt.elementStyles=[],Lt.shadowRootOptions={mode:"open"},Lt[He("elementProperties")]=new Map,Lt[He("finalized")]=new Map,Kr?.({ReactiveElement:Lt}),(Mo.reactiveElementVersions??=[]).push("2.1.2");var ma=globalThis,Ks=t=>t,Do=ma.trustedTypes,Ys=Do?Do.createPolicy("lit-html",{createHTML:t=>t}):void 0,oi="$lit$",Xt=`lit$${Math.random().toFixed(9).slice(2)}$`,ai="?"+Xt,Yr=`<${ai}>`,le=document,Xe=()=>le.createComment(""),Ke=t=>t===null||typeof t!="object"&&typeof t!="function",xa=Array.isArray,Jr=t=>xa(t)||typeof t?.[Symbol.iterator]=="function",la=`[ 	
\f\r]`,qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Js=/-->/g,Zs=/>/g,ne=RegExp(`>|${la}(?:([^\\s"'>=/]+)(${la}*=${la}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qs=/'/g,ti=/"/g,si=/^(?:script|style|textarea|title)$/i,ga=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),gt=ga(1),Wt=ga(2),nc=ga(3),jt=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),ei=new WeakMap,ce=le.createTreeWalker(le,129);function ii(t,e){if(!xa(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ys!==void 0?Ys.createHTML(e):e}var Zr=(t,e)=>{let o=t.length-1,s=[],i,c=e===2?"<svg>":e===3?"<math>":"",n=qe;for(let f=0;f<o;f++){let d=t[f],u,g,b=-1,S=0;for(;S<d.length&&(n.lastIndex=S,g=n.exec(d),g!==null);)S=n.lastIndex,n===qe?g[1]==="!--"?n=Js:g[1]!==void 0?n=Zs:g[2]!==void 0?(si.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=ne):g[3]!==void 0&&(n=ne):n===ne?g[0]===">"?(n=i??qe,b=-1):g[1]===void 0?b=-2:(b=n.lastIndex-g[2].length,u=g[1],n=g[3]===void 0?ne:g[3]==='"'?ti:Qs):n===ti||n===Qs?n=ne:n===Js||n===Zs?n=qe:(n=ne,i=void 0);let _=n===ne&&t[f+1].startsWith("/>")?" ":"";c+=n===qe?d+Yr:b>=0?(s.push(u),d.slice(0,b)+oi+d.slice(b)+Xt+_):d+Xt+(b===-2?f:_)}return[ii(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Ye=class t{constructor({strings:e,_$litType$:o},s){let i;this.parts=[];let c=0,n=0,f=e.length-1,d=this.parts,[u,g]=Zr(e,o);if(this.el=t.createElement(u,s),ce.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(i=ce.nextNode())!==null&&d.length<f;){if(i.nodeType===1){if(i.hasAttributes())for(let b of i.getAttributeNames())if(b.endsWith(oi)){let S=g[n++],_=i.getAttribute(b).split(Xt),B=/([.?@])?(.*)/.exec(S);d.push({type:1,index:c,name:B[2],strings:_,ctor:B[1]==="."?pa:B[1]==="?"?fa:B[1]==="@"?ha:we}),i.removeAttribute(b)}else b.startsWith(Xt)&&(d.push({type:6,index:c}),i.removeAttribute(b));if(si.test(i.tagName)){let b=i.textContent.split(Xt),S=b.length-1;if(S>0){i.textContent=Do?Do.emptyScript:"";for(let _=0;_<S;_++)i.append(b[_],Xe()),ce.nextNode(),d.push({type:2,index:++c});i.append(b[S],Xe())}}}else if(i.nodeType===8)if(i.data===ai)d.push({type:2,index:c});else{let b=-1;for(;(b=i.data.indexOf(Xt,b+1))!==-1;)d.push({type:7,index:c}),b+=Xt.length-1}c++}}static createElement(e,o){let s=le.createElement("template");return s.innerHTML=e,s}};function Se(t,e,o=t,s){if(e===jt)return e;let i=s!==void 0?o._$Co?.[s]:o._$Cl,c=Ke(e)?void 0:e._$litDirective$;return i?.constructor!==c&&(i?._$AO?.(!1),c===void 0?i=void 0:(i=new c(t),i._$AT(t,o,s)),s!==void 0?(o._$Co??=[])[s]=i:o._$Cl=i),i!==void 0&&(e=Se(t,i._$AS(t,e.values),i,s)),e}var da=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:s}=this._$AD,i=(e?.creationScope??le).importNode(o,!0);ce.currentNode=i;let c=ce.nextNode(),n=0,f=0,d=s[0];for(;d!==void 0;){if(n===d.index){let u;d.type===2?u=new Je(c,c.nextSibling,this,e):d.type===1?u=new d.ctor(c,d.name,d.strings,this,e):d.type===6&&(u=new ua(c,this,e)),this._$AV.push(u),d=s[++f]}n!==d?.index&&(c=ce.nextNode(),n++)}return ce.currentNode=le,i}p(e){let o=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,o),o+=s.strings.length-2):s._$AI(e[o])),o++}},Je=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,s,i){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Se(this,e,o),Ke(e)?e===Q||e==null||e===""?(this._$AH!==Q&&this._$AR(),this._$AH=Q):e!==this._$AH&&e!==jt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Q&&Ke(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Ye.createElement(ii(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(o);else{let c=new da(i,this),n=c.u(this.options);c.p(o),this.T(n),this._$AH=c}}_$AC(e){let o=ei.get(e.strings);return o===void 0&&ei.set(e.strings,o=new Ye(e)),o}k(e){xa(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,s,i=0;for(let c of e)i===o.length?o.push(s=new t(this.O(Xe()),this.O(Xe()),this,this.options)):s=o[i],s._$AI(c),i++;i<o.length&&(this._$AR(s&&s._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let s=Ks(e).nextSibling;Ks(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},we=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,s,i,c){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=c,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Q}_$AI(e,o=this,s,i){let c=this.strings,n=!1;if(c===void 0)e=Se(this,e,o,0),n=!Ke(e)||e!==this._$AH&&e!==jt,n&&(this._$AH=e);else{let f=e,d,u;for(e=c[0],d=0;d<c.length-1;d++)u=Se(this,f[s+d],o,d),u===jt&&(u=this._$AH[d]),n||=!Ke(u)||u!==this._$AH[d],u===Q?e=Q:e!==Q&&(e+=(u??"")+c[d+1]),this._$AH[d]=u}n&&!i&&this.j(e)}j(e){e===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},pa=class extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Q?void 0:e}},fa=class extends we{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Q)}},ha=class extends we{constructor(e,o,s,i,c){super(e,o,s,i,c),this.type=5}_$AI(e,o=this){if((e=Se(this,e,o,0)??Q)===jt)return;let s=this._$AH,i=e===Q&&s!==Q||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,c=e!==Q&&(s===Q||i);i&&this.element.removeEventListener(this.name,this,s),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ua=class{constructor(e,o,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Se(this,e)}};var Qr=ma.litHtmlPolyfillSupport;Qr?.(Ye,Je),(ma.litHtmlVersions??=[]).push("3.3.3");var ri=(t,e,o)=>{let s=o?.renderBefore??e,i=s._$litPart$;if(i===void 0){let c=o?.renderBefore??null;s._$litPart$=i=new Je(e.insertBefore(Xe(),c),c,void 0,o??{})}return i._$AI(t),i};var ba=globalThis,st=class extends Lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ri(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return jt}};st._$litElement$=!0,st.finalized=!0,ba.litElementHydrateSupport?.({LitElement:st});var tn=ba.litElementPolyfillSupport;tn?.({LitElement:st});(ba.litElementVersions??=[]).push("4.2.2");var It=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var en={attribute:!0,type:String,converter:Ge,reflect:!1,hasChanged:Io},on=(t=en,e,o)=>{let{kind:s,metadata:i}=o,c=globalThis.litPropertyMetadata.get(i);if(c===void 0&&globalThis.litPropertyMetadata.set(i,c=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),s==="accessor"){let{name:n}=o;return{set(f){let d=e.get.call(this);e.set.call(this,f),this.requestUpdate(n,d,t,!0,f)},init(f){return f!==void 0&&this.C(n,void 0,t,f),f}}}if(s==="setter"){let{name:n}=o;return function(f){let d=this[n];e.call(this,f),this.requestUpdate(n,d,t,!0,f)}}throw Error("Unsupported decorator location: "+s)};function j(t){return(e,o)=>typeof o=="object"?on(t,e,o):((s,i,c)=>{let n=i.hasOwnProperty(c);return i.constructor.createProperty(c,s),n?Object.getOwnPropertyDescriptor(i,c):void 0})(t,e,o)}var de=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function ni(t,e){return(o,s,i)=>{let c=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:f}=typeof s=="object"?o:i??(()=>{let d=Symbol();return{get(){return this[d]},set(u){this[d]=u}}})();return de(o,s,{get(){let d=n.call(this);return d===void 0&&(d=c(this),(d!==null||this.hasUpdated)&&f.call(this,d)),d}})}return de(o,s,{get(){return c(this)}})}}var ci=Wt`
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
`;var _t=t=>({type:"analog",channel:t}),Ze=(t,e=0)=>({type:"i2c",signal:t,bus:e}),Qe=(t,e=0)=>({type:"spi",signal:t,bus:e}),ya=(t,e=0)=>({type:"usart",signal:t,bus:e});var $e=[" ","Spacebar"];function an(){return typeof navigator=="object"?navigator.userAgent:""}function sn(){return an().indexOf("Macintosh")>=0}function li(t){return sn()?t.metaKey:t.ctrlKey}var pe=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Kt=class extends st{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[_t(5),Ze("SCL")]},{name:"A4.2",x:97,y:9,signals:[_t(4),Ze("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[Qe("SCK")]},{name:"12",x:134.5,y:9,signals:[Qe("MISO")]},{name:"11",x:144,y:9,signals:[Qe("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[Qe("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[ya("TX")]},{name:"0",x:255.5,y:9,signals:[ya("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[_t(0)]},{name:"A1",x:217.5,y:191.5,signals:[_t(1)]},{name:"A2",x:227,y:191.5,signals:[_t(2)]},{name:"A3",x:236.5,y:191.5,signals:[_t(3)]},{name:"A4",x:246,y:191.5,signals:[_t(4),Ze("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[_t(5),Ze("SCL")]}]}static get styles(){return At`
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
    `}render(){let{ledPower:e,led13:o,ledRX:s,ledTX:i}=this;return gt`
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

        ${ci}

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
          @keydown=${c=>$e.includes(c.key)&&this.down()}
          @keyup=${c=>$e.includes(c.key)&&this.up()}
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
          ${e&&Wt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&Wt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${i&&Wt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${s&&Wt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};pe([j()],Kt.prototype,"led13",void 0);pe([j()],Kt.prototype,"ledRX",void 0);pe([j()],Kt.prototype,"ledTX",void 0);pe([j()],Kt.prototype,"ledPower",void 0);pe([j()],Kt.prototype,"resetPressed",void 0);pe([ni("#reset-button")],Kt.prototype,"resetButton",void 0);Kt=pe([It("wokwi-arduino-uno")],Kt);var di=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Ca={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},va=class extends st{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return At`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,s=Math.round(e/10**o);return e===0?[0,0]:[Math.round(s%100),o]}render(){let{value:e}=this,o=parseFloat(e),[s,i]=this.breakValue(o),c=Ca[Math.floor(s/10)],n=Ca[s%10],f=Ca[i];return gt`
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
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${f}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};di([j()],va.prototype,"value",void 0);va=di([It("wokwi-resistor")],va);var fe=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},rn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},Yt=class extends st{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return At`
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
    `}update(e){e.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(e)}renderSVG(){let{color:e,lightColor:o,flip:s}=this,i=o||rn[e?.toLowerCase()]||e,c=this.brightness?.3+this.brightness*.7:0,n=this.value&&this.brightness>Number.EPSILON;return gt`<svg
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
    </svg> `}render(){return gt`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};fe([j()],Yt.prototype,"value",void 0);fe([j()],Yt.prototype,"brightness",void 0);fe([j()],Yt.prototype,"color",void 0);fe([j()],Yt.prototype,"lightColor",void 0);fe([j()],Yt.prototype,"label",void 0);fe([j({type:Boolean})],Yt.prototype,"flip",void 0);Yt=fe([It("wokwi-led")],Yt);var pi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=t=>(...e)=>({_$litDirective$:t,values:e}),ko=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,s){this._$Ct=e,this._$AM=o,this._$Ci=s}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var hi="important",nn=" !"+hi,ui=fi(class extends ko{constructor(t){if(super(t),t.type!==pi.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let s=t[o];return s==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let s of this.ft)e[s]==null&&(this.ft.delete(s),s.includes("-")?o.removeProperty(s):o[s]=null);for(let s in e){let i=e[s];if(i!=null){this.ft.add(s);let c=typeof i=="string"&&i.endsWith(nn);s.includes("-")||c?o.setProperty(s,c?i.slice(0,-11):i,c?hi:""):o[s]=i}}return jt}});var Oo=(t,e,o)=>{let s=Math.min(o,e);return Math.max(s,t)};function mi(t,e){let o=e.transformPoint({x:t.left,y:t.top}),s=e.transformPoint({x:t.right,y:t.top}),i=e.transformPoint({x:t.left,y:t.bottom}),c=e.transformPoint({x:t.right,y:t.bottom}),n=Math.min(o.x,s.x,i.x,c.x),f=Math.min(o.y,s.y,i.y,c.y),d=Math.max(o.x,s.x,i.x,c.x),u=Math.max(o.y,s.y,i.y,c.y);return new DOMRect(n,f,d-n,u-f)}function xi(t,e,o){let{userAgent:s}=navigator;if(s.indexOf("Epiphany")>=0||s.indexOf("Safari")>=0){let c=t.getCTM(),n=e?.getCTM(),f=e?.getBoundingClientRect(),d=e?.ownerSVGElement?.getBoundingClientRect();if(!f||!d||!n||!c)return null;let u=d.x+d.width/2,g=d.y+d.height/2,b=u-(f.x+f.width/2),S=g-(f.y+f.height/2),_=Math.atan2(S,b)/Math.PI*180,B=new DOMMatrix().rotate(_),W=mi(o,B),N=W.width/f.width,V=W.height/f.height,at=n.inverse().multiply(c);return B.inverse().translate(W.left,W.top).multiply(at.inverse()).scale(N,V).translate(-f.left,-f.top)}else return t.getScreenCTM()?.inverse()||null}var he=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Bo={x:9.91,y:8.18},Jt=class extends st{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[_t(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return At`
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
    `}mapToMinMax(e,o,s){return e*(s-o)+o}percentFromMinMax(e,o,s){return(e-o)/(s-o)}renderSVG(){let e=Oo(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return gt`<svg
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
      style=${ui({"--knob-angle":o+"deg"})}
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
        cx=${Bo.x}
        cy=${Bo.y}
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
    </svg>`}render(){return gt`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?xi(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",s=o?e.touches[0].pageX:e.pageX,i=o?e.touches[0].pageY:e.pageY,c=new DOMPointReadOnly(s,i).matrixTransform(this.pageToKnobMatrix),n=Bo.x-c.x,f=Bo.y-c.y,d=Math.round(Math.atan2(f,n)*180/Math.PI);d<0&&(d+=360),d-=90,n>0&&f<=0&&d>0&&(d-=360),d=Oo(this.startDegree,this.endDegree,d);let u=this.percentFromMinMax(d,this.startDegree,this.endDegree),g=this.mapToMinMax(u,this.min,this.max);this.updateValue(g)}updateValue(e){let o=Oo(this.min,this.max,e),s=Math.round(o/this.step)*this.step;this.value=Math.round(s*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};he([j({type:Number})],Jt.prototype,"min",void 0);he([j({type:Number})],Jt.prototype,"max",void 0);he([j()],Jt.prototype,"value",void 0);he([j()],Jt.prototype,"step",void 0);he([j()],Jt.prototype,"startDegree",void 0);he([j()],Jt.prototype,"endDegree",void 0);Jt=he([It("wokwi-potentiometer")],Jt);var to=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Sa,Re=class extends st{static{Sa=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Sa.pushbuttonCounter++}static get styles(){return At`
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
    `}renderSVG(){let{color:e,uniqueId:o,xray:s}=this,i=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return gt`<svg
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
      ${s?Wt`
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
    </svg>`}render(){let{color:e,label:o}=this;return gt`
      <button
        aria-label="${o} ${e} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${s=>$e.includes(s.key)&&this.down()}
        @keyup=${s=>$e.includes(s.key)&&this.up(s)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(li(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};to([j()],Re.prototype,"color",void 0);to([j()],Re.prototype,"pressed",void 0);to([j()],Re.prototype,"label",void 0);to([j({type:Boolean,attribute:"xray"})],Re.prototype,"xray",void 0);Re=Sa=to([It("wokwi-pushbutton")],Re);var gi=`:host {
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
`;var Dt={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var z=9.6/2.54,Y=57.6,Uo=14.4,bi={x:Uo,ancho:32.2*z},Et={x:Uo+(32.2-22.2)/2*z,ancho:22.2*z,alto:11.8*z},Ae={x:Et.x+5.9*z,y:Y},wa=13.5*z,_e=182.4,No={ancho:201.6,alto:86.4},Vo={GND:{x:_e,y:Y-9.6,color:"#7a4a24"},VCC:{x:_e,y:Y,color:"#d7263d"},SIG:{x:_e,y:Y+9.6,color:"#f28c28"}},T=t=>Math.round(t*100)/100,$a=t=>`rotate(${T(-t)} ${T(Ae.x)} ${T(Ae.y)})`;function Ra(t="sg90",e=90){let o=Dt[t]||Dt.sg90,{ancho:s,alto:i}=No,c=Y-Et.alto/2,n=T(Ae.x),f=Et.x+Et.ancho,d=t==="sg90",u=Object.values(Vo).map((S,_)=>{let B=Y-4+_*4;return`<path d="M${T(f)} ${T(B)} C ${T(f+26)} ${T(B)}, ${T(_e-34)} ${T(S.y)}, ${T(_e-9)} ${T(S.y)}" fill="none" stroke="${S.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),g=Object.values(Vo).map(S=>`<rect x="${T(S.x-2.2)}" y="${T(S.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),b=d?`<circle cx="${T(Et.x+15*z)}" cy="${Y}" r="${T(3.6*z)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${T(Et.x+9.5*z)}" cy="${T(Y+2.2*z)}" r="${T(2.2*z)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}"><title>Servo ${o.nombre}</title>`+u+`<rect x="${T(_e-9)}" y="${T(Y-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+g+`<rect x="${T(bi.x)}" y="${T(c+1.5)}" width="${T(bi.ancho)}" height="${T(Et.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${d?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${T(Uo+2.4*z)}" cy="${Y}" r="${T(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${T(Uo+(32.2-2.4)*z)}" cy="${Y}" r="${T(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${T(Et.x)}" y="${T(c)}" width="${T(Et.ancho)}" height="${T(Et.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${d?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+b+`<text x="${T(Et.x+15.5*z)}" y="${T(Y+4.1*z)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${n}" cy="${Y}" r="${T(5.2*z)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${$a(e)}"><path d="M${n} ${T(Y-3.2*z/2-1)} L${T(Ae.x+wa)} ${T(Y-1.1*z)} A ${T(1.1*z)} ${T(1.1*z)} 0 0 1 ${T(Ae.x+wa)} ${T(Y+1.1*z)} L${n} ${T(Y+3.2*z/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${n}" cy="${Y}" r="${T(3.4*z)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(S=>`<circle cx="${T(Ae.x+wa*S)}" cy="${Y}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${n}" cy="${Y}" r="${T(1.3*z)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var tt=3.779527559055118,eo={ancho:72.58*tt,alto:53.34*tt},Ee=4*tt,ct=5*tt,ln=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],zt=Ee+4.6*tt,Ht=eo.ancho-.5-4.6*tt,Ft=60,kt=(t,e)=>({x:t,y:Ft+e*ct}),Zt={M1A:kt(zt,0),M1B:kt(zt,1),GND_IZQ:kt(zt,2),M2A:kt(zt,3),M2B:kt(zt,4),M4A:kt(Ht,0),M4B:kt(Ht,1),GND_DER:kt(Ht,2),M3A:kt(Ht,3),M3B:kt(Ht,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+ct,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},Ci={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},Ea={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},vi=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],A=t=>Math.round(t*100)/100,J=(t,e,o,{tam:s=6.2,ancla:i="middle",peso:c="bold",color:n="#ffffff",giro:f=0}={})=>`<text x="${A(t)}" y="${A(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${i}" fill="${n}"${f?` transform="rotate(${f} ${A(t)} ${A(e)})"`:""}>${o}</text>`;function Aa(t,e,o,s){let i=19.3*tt,c=6.4*tt,n=t-i/2,f=e-c/2,d="";for(let u=0;u<8;u++){let g=t-8.89*tt+u*2.54*tt;d+=`<rect x="${A(g-1.6)}" y="${A(f-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,d+=`<rect x="${A(g-1.6)}" y="${A(f+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${A(t)} ${A(e)})">`+d+`<rect x="${A(n)}" y="${A(f)}" width="${A(i)}" height="${A(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${A(n)} ${A(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+J(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+J(t,e-i/2-3,s,{tam:5.2})}function _a(t,e,o,s=!0){let i=s?5.6*tt:o*ct+.6*tt,c=s?o*ct+.6*tt:5.6*tt,n=s?t-i/2:t-ct/2-.3*tt,f=s?e-ct/2-.3*tt:e-c/2,d="";for(let u=0;u<o;u++){let g=s?t:t+u*ct,b=s?e+u*ct:e;d+=`<circle cx="${A(g)}" cy="${A(b)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,d+=`<line x1="${A(g-4.2)}" y1="${A(b)}" x2="${A(g+4.2)}" y2="${A(b)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${A(n)}" y="${A(f)}" width="${A(i)}" height="${A(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+d}var yi=(t,e,o)=>`<circle cx="${A(t)}" cy="${A(e)}" r="${A(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${A(t)} ${A(e-o/2)} a ${A(o/2)} ${A(o/2)} 0 0 1 0 ${A(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${A(t)}" cy="${A(e)}" r="${A(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Pa(t=!0){let{ancho:e,alto:o}=eo,s=ln.map(({y:f,xs:d})=>{let u=d[0]-4.6,g=d[d.length-1]+4.6;return`<rect x="${A(u)}" y="${A(f-4.6)}" width="${A(g-u)}" height="9.2" fill="#151515"/>`+d.map(b=>`<rect x="${A(b-1.6)}" y="${A(f-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),i=["S2","S1"].map(f=>["SIG","POS","GND"].map(d=>{let u=Zt[`${f}_${d}`];return`<rect x="${A(u.x-4.4)}" y="${A(u.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${A(u.x-1.4)}" y="${A(u.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,n=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${A(e)}" height="${A(o)}" viewBox="0 0 ${A(e)} ${A(o)}"><title>Shield de motores L293D</title><rect x="${A(Ee)}" y="0.5" width="${A(e-Ee-.5)}" height="${A(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+s+Aa(82,86,"L293D","U1")+Aa(145,86,"74HC595","U3")+Aa(205,86,"L293D","U2")+yi(118,140,6.3*tt)+yi(205,140,6.3*tt)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${n}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+_a(zt,Ft,5)+_a(Ht,Ft,5)+_a(Zt.EXT_POS.x,Zt.EXT_POS.y,2,!1)+i+`<rect x="${c-9}" y="${n-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${c-9.6}" y="${n-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${A(Ee+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${A(Ee+15)}" cy="169" r="5" fill="#2b2b2b"/>`+J(zt+13,Ft+ct/2+3,"M1",{tam:7})+J(zt+13,Ft+3.5*ct+3,"M2",{tam:7})+J(zt+12,Ft+2*ct+2.5,"GND",{tam:5})+J(Ht-13,Ft+ct/2+3,"M4",{tam:7})+J(Ht-13,Ft+3.5*ct+3,"M3",{tam:7})+J(Ht-12,Ft+2*ct+2.5,"GND",{tam:5})+J(Zt.EXT_POS.x+ct/2,193,"EXT_PWR",{tam:5.6})+J(Zt.EXT_POS.x,165,"+M",{tam:5})+J(Zt.EXT_GND.x,165,"GND",{tam:5})+J(c,n-8,"PWR",{tam:5.6})+J(52,16,"SERVO_2",{tam:5,ancla:"start"})+J(52,26,"SERVO_1",{tam:5,ancla:"start"})+J(26,7.4,"S",{tam:4.6})+J(35.6,7.4,"+",{tam:5})+J(45.2,7.4,"\u2212",{tam:5})+J(Ee+15,156,"RESET",{tam:4.6})+J(196,162,"Motor Shield L293D",{tam:6.4})+J(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var F=3.779527559055118,lt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},wi=lt.voltiosRef/(lt.mABloqueado/1e3),$i=lt.rpmSinCarga*lt.reduccion*2*Math.PI/60,Ri=lt.mASinCarga/1e3,Ia=(lt.voltiosRef-Ri*wi)/$i,Nl=Ia*Ri/$i,Ll=lt.tauMecanicoMs/1e3*Ia*Ia/wi;var Da=64.2*F,ue=22.5*F,Ta=40*F,ka=11.2*F,Ct=lt.ruedaMM*F/2,dn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-ka,y0:132-ue/2}},oo=t=>dn[t&&t.vista==="rueda"?"rueda":"eje"],Ai=t=>{let e=t.y0+ue/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function _i(t){let e=oo(t),o=Ai(e);if(t&&t.lado==="derecho")for(let s of["A","B"])o[s]={...o[s],x:e.ancho-o[s].x};return o}var C=t=>Math.round(t*100)/100,Ma=(t,e,o,{tam:s=11,color:i="#1f2328",peso:c="bold",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${C(t)}" y="${C(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`;function pn(t,e){let o=e+ue/2;return`<rect x="${C(t+Ta-2)}" y="${C(o-9.5*F)}" width="${C(Da-Ta+2)}" height="${C(19*F)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${C(t+Da-6*F)}" y="${C(o-8*F)}" width="${C(6*F)}" height="${C(16*F)}" rx="4" fill="#2b2b2b"/><rect x="${C(t)}" y="${C(e)}" width="${C(Ta)}" height="${C(ue)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${C(t+31.8*F-8.75*F)}" cy="${C(o)}" r="${C(1.5*F)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${C(t+31.8*F+8.75*F-6)}" cy="${C(o)}" r="${C(1.5*F)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function fn(t){let e=Ai(t),o=t.x0+Da,s=t.y0+ue/2;return["A","B"].map((i,c)=>{let n=s+(c?3:-3);return`<path d="M${C(o)} ${C(n)} C ${C(o+20)} ${C(n)}, ${C(e[i].x-22)} ${C(e[i].y)}, ${C(e[i].x-6)} ${C(e[i].y)}" fill="none" stroke="${e[i].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${C(e[i].x-4.2)}" y="${C(e[i].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function hn(t,e){let o=2.7*F;return`<circle cx="${C(t)}" cy="${C(e)}" r="${C(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${C(t)} ${C(e)})"><path d="M${C(t-o)} ${C(e-1.8*F)} H${C(t+o)} V${C(e+1.8*F)} H${C(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${C(t)}" cy="${C(e)}" r="${C(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function un(t,e){let o=[0,72,144,216,288].map(i=>`<rect x="${C(t-12)}" y="${C(e-Ct*.72)}" width="24" height="${C(Ct*.72)}" rx="6" fill="#f2c318" transform="rotate(${i} ${C(t)} ${C(e)})"/>`).join(""),s=Array.from({length:24},(i,c)=>`<rect x="${C(t-3)}" y="${C(e-Ct-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${C(t)} ${C(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${C(t)} ${C(e)})"><circle cx="${C(t)}" cy="${C(e)}" r="${C(Ct*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${C(Ct*.24)}"/>`+s+`<circle cx="${C(t)}" cy="${C(e)}" r="${C(Ct*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${C(t)}" cy="${C(e)}" r="${C(7*F)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${C(t-2.7*F)}" y="${C(e-1.8*F)}" width="${C(5.4*F)}" height="${C(3.6*F)}" fill="#7a5d00"/></g>`}function Ei(t={}){let e=oo(t),o=t.lado==="derecho",s=e.x0+ka,i=e.y0+ue/2,c=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",n=o?e.ancho-s:s,f=pn(e.x0,e.y0)+fn(e),d=o?e.ancho-(e.x0+26*F):e.x0+26*F,u=Ma(d,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(f+=un(s,i),u+=`<line x1="${C(n-Ct-10)}" y1="${C(i+Ct+2)}" x2="${C(n+Ct+10)}" y2="${C(i+Ct+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${C(n)} ${C(i+Ct+20)})"></g>`+Ma(n,i+Ct+46,"quieto",{tam:13,marca:"data-velocidad"})):(f+=hn(s,i),u+=Ma(n,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${f}</g>${u}</svg>`}var Si=new WeakMap;function Pi(t,e,o){let s=oo(e),i=s.x0+ka,c=s.y0+ue/2,n=o||{rpm:0,giro:0,velocidad:0},f=t.querySelector("[data-eje],[data-rueda]");f&&f.setAttribute("transform",`rotate(${C(-n.giro)} ${C(i)} ${C(c)})`);let d=t.querySelector("[data-rpm]"),u=Si.get(t)||{},g=n.rpm>0!=(e.lado==="derecho");if(d){let _=Math.abs(n.rpm)<1?"0 RPM":`${Math.round(Math.abs(n.rpm))} RPM ${g?"\u27F2":"\u27F3"}`;_!==u.rpm&&(d.textContent=u.rpm=_)}let b=t.querySelector("[data-velocidad]"),S=t.querySelector("[data-flecha]");if(b&&S){let _=Math.sign(n.velocidad)*(e.lado==="derecho"?-1:1),B=Math.abs(n.velocidad),W=B<.5,N=W?"quieto":`${_>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(B)} cm/s`;N!==u.vel&&(b.textContent=u.vel=N);let V=W?0:g?-1:1,at=`${V}|${_}`;at!==u.flecha&&(u.flecha=at,S.innerHTML=W?"":`<path d="M${-40*V} -5 H${22*V} V-12 L${40*V} 0 L${22*V} 12 V5 H${-40*V} Z" fill="${_>0?"#2e9e44":"#d7263d"}"/>`)}Si.set(t,u)}var Ti=3.779527559055118,St={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Lo={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var io=360,Oa=150,Qt=10,vt=10,te=72*Ti,ao=34*Ti,Ba={ancho:io,alto:Oa},ee=Qt+te+58,Te=vt+ao-34,so={POS:{x:io-12,y:vt+30,color:"#d7263d"},NEG:{x:io-12,y:vt+39.6,color:"#2b2b2b"},BAL0:{x:ee,y:Te,color:"#2b2b2b"},BAL1:{x:ee,y:Te+9.6,color:"#e05a5a"},BAL2:{x:ee,y:Te+19.2,color:"#d7263d"}},L=t=>Math.round(t*100)/100,Pe=(t,e,o,{tam:s=11,color:i="#ffffff",peso:c="bold",ancla:n="middle",marca:f=""}={})=>`<text${f?` ${f}="1"`:""} x="${L(t)}" y="${L(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${n}" fill="${i}">${o}</text>`;function Ua(t="nominal"){let e=St[t]||St.nominal,o=Qt+te,s=["POS","NEG"].map((c,n)=>{let f=so[c],d=vt+24+n*10;return`<path d="M${L(o)} ${L(d)} C ${L(o+26)} ${L(d)}, ${L(f.x-26)} ${L(f.y)}, ${L(f.x-6)} ${L(f.y)}" fill="none" stroke="${f.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${L(f.x-4.4)}" y="${L(f.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),i=["BAL0","BAL1","BAL2"].map((c,n)=>{let f=so[c],d=vt+ao-40+n*4;return`<path d="M${L(o)} ${L(d)} C ${L(o+18)} ${L(d)}, ${L(f.x-30)} ${L(f.y)}, ${L(f.x-7)} ${L(f.y)}" fill="none" stroke="${f.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${L(ee-7)}" y="${L(Te-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(c=>`<rect x="${L(ee-2.4)}" y="${L(so[c].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+Pe(ee-14,Te+2.5,"\u2212",{tam:8,color:"#5a6673"})+Pe(ee-14,Te+21.7,"+",{tam:8,color:"#5a6673"})+Pe(ee,vt+ao+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${io}" height="${Oa}" viewBox="0 0 ${io} ${Oa}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+s+i+`<rect x="${Qt}" y="${vt}" width="${L(te)}" height="${L(ao)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${Qt+14}" y="${vt+12}" width="${L(te-28)}" height="${L(ao-24)}" rx="4" fill="#3f4752"/>`+Pe(Qt+te/2,vt+36,"LiPo 2S \xB7 7,4 V",{tam:15})+Pe(Qt+te/2,vt+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${L(Qt+te/2-33+c*23)}" y="${vt+66}" width="20" height="12" rx="2" fill="${c<e.barras?e.color:"#5a6370"}"/>`).join("")+Pe(Qt+te/2,vt+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function Mi(t,e,o){let s=t.querySelector("[data-voltios]");if(!s)return;let i=St[e]||St.nominal,c=o&&typeof o.voltios=="number"?o.voltios:i.voltios;s.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${i.nombre}`}var ae={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},oe=210,Na=140,ja={ancho:oe,alto:Na},Bi=9.6,Ui=82,mn=132,Wa=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:Ui+e*Bi,y:mn}])),it=t=>Math.round(t*100)/100,Va=(t,e,o,{tam:s=7,color:i="#5a6673",peso:c="bold",marca:n=""}={})=>`<text${n} x="${it(t)}" y="${it(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`,La={ancho:24,alto:46,grueso:5},xn=[76,112,148],Ii=34,Di="#ff3b30",jo="#3a1414";function gn(t,e){let{ancho:o,alto:s,grueso:i}=La,c=s/2,n=(f,d,u,g)=>({x:t+f,y:e+d,w:u,h:g});return{a:n(i/2,0,o-i,i),b:n(o-i,i/2,i,c-i),c:n(o-i,c+i/2,i,c-i),d:n(i/2,s-i,o-i,i),e:n(0,c+i/2,i,c-i),f:n(0,i/2,i,c-i),g:n(i/2,c-i/2,o-i,i)}}var bn={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function Vi(t=ae.umbralV){let e=xn.map((i,c)=>{let n=gn(i,Ii);return Object.entries(n).map(([f,d])=>`<rect data-seg="${c}${f}" x="${it(d.x)}" y="${it(d.y)}" width="${it(d.w)}" height="${it(d.h)}" rx="2" fill="${jo}"/>`).join("")+`<circle data-seg="${c}p" cx="${it(i+La.ancho+5)}" cy="${it(Ii+La.alto-2)}" r="2.8" fill="${jo}"/>`}).join(""),o=Object.entries(Wa).map(([i,c],n)=>`<rect x="${it(c.x-1.2)}" y="122" width="2.4" height="${it(c.y-120)}" fill="#c9ccd1"/>`+Va(c.x,108,n===0?"\u2212":String(n),{tam:n===0?8:6.5})).join(""),s=[0,1].map(i=>{let c=38+i*44;return`<path d="M${it(8)} ${it(c-10)} q -6 10 0 20 M${it(3)} ${it(c-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${oe}" height="${Na}" viewBox="0 0 ${oe} ${Na}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${oe-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${oe-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(i=>`<circle cx="38" cy="${i}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${i}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${s}</g><rect x="66" y="22" width="${oe-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${it(Ui-6)}" y="114" width="${it(8*Bi+12)}" height="9" fill="#151515"/>`+o+Va(oe/2+30,18,"1-8S",{tam:6.5})+Va(oe/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function ki(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,s]=e.split(".");return(o+s).slice(0,3).split("").map((c,n)=>({c,punto:n===o.length-1}))}var Oi=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function yn(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[ki(t.total),Oi(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((s,i)=>o.push(Oi(`-${i+1}-`),ki(s))),o[Math.floor(e/ae.pasoMs)%o.length]}function Fa(t,e,o){let s=t.querySelector("[data-umbral]"),i=e&&typeof e.umbral=="number"?e.umbral:ae.umbralV;if(s){let g=`alarma ${i?String(i).replace(".",",")+" V":"apagada"}`;s.textContent!==g&&(s.textContent=g)}let c=o&&o.ms||0,f=o&&o.alarma&&Math.floor(c/125)%2===1?null:yn(o,c);for(let g=0;g<3;g++){let b=f?f[g]:null,S=b&&bn[b.c]||"";for(let W of"abcdefg"){let N=t.querySelector(`[data-seg="${g}${W}"]`),V=S.includes(W)?Di:jo;N&&N.getAttribute("fill")!==V&&N.setAttribute("fill",V)}let _=t.querySelector(`[data-seg="${g}p"]`),B=b&&b.punto?Di:jo;_&&_.getAttribute("fill")!==B&&_.setAttribute("fill",B)}let d=t.querySelector("[data-pitido]"),u=o&&o.alarma&&Math.floor(c/250)%2===0?"visible":"hidden";d&&d.getAttribute("visibility")!==u&&d.setAttribute("visibility",u)}var Me={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},za=Object.keys(Me),Ni={marron:"marr\xF3n",morado:"violeta"};function Ha(t,e){let o=[t,e];return o.some(s=>/^placa\.GND/.test(s)||/^protoboard\.[si]-/.test(s))?"negro":o.some(s=>/^placa\.(5V|3V3|VIN)$/.test(s)||/^protoboard\.[si]\+/.test(s))?"rojo":"verde"}var Cn=["3","5","6","9","10","11"],Ie={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(Cn.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}}},et={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:No.ancho,alto:No.alto,pines:Vo,svg:t=>Ra(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Dt).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(Ra(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",$a(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,props:{puentePWR:!0},dibujo:{ancho:eo.ancho,alto:eo.alto,pines:Zt,svg:t=>Pa(t.puentePWR!==!1)},rotulo:t=>Ci[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(Pa(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),s=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==s&&o.setAttribute("fill",s)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...oo(t),pines:_i(t)}),svg:t=>Ei(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){Pi(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:Ba.ancho,alto:Ba.alto,pines:so,svg:t=>Ua(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(St).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(Ua(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e,o){Mi(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:ae.umbralV},dibujo:{ancho:ja.ancho,alto:ja.alto,pines:Wa,svg:t=>Vi(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:ae.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){Fa(t,e,null)},mostrar(t,e,o){Fa(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var Wo=["a","b","c","d","e"],Li=["f","g","h","i","j"],dt={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ji=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],Ot={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ro=t=>14.4+(t-1)*9.6,vn=t=>t>=2&&(t-1)%6!==0,Ga=new Map;function De(t="media"){if(Ga.has(t))return Ga.get(t);let e=Ot[t]||Ot.media,o=[];Ga.set(t,o);for(let s=1;s<=e.columnas;s++){for(let i of Wo)o.push({nombre:i+s,x:ro(s),y:dt[i],tira:"arriba"+s});for(let i of Li)o.push({nombre:i+s,x:ro(s),y:dt[i],tira:"abajo"+s});for(let[i]of ji)vn(s)&&o.push({nombre:i+s,x:ro(s),y:dt[i],tira:i})}return o}var qa=new Map;function Wi(t="media"){if(qa.has(t))return qa.get(t);let e=new Map;qa.set(t,e);for(let o of De(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function Xa(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(Wo.includes(o[1])?"arriba":"abajo")+o[2]:null}function Fi(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let c=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[s,i]=Wo.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${s}${o[2]}\u2013${i}${o[2]}`}function Ka(t="media"){let e=Ot[t]||Ot.media,{ancho:o,alto:s,columnas:i}=e,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}" viewBox="0 0 ${o} ${s}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${s-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(dt.e+dt.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let n=(d,u)=>c.push(`<line x1="${14.4-6}" y1="${d}" x2="${o-14.4+6}" y2="${d}" stroke="${u}" stroke-width="1.2"/>`);n(dt["s+"]-5.5,"#d7263d"),n(dt["s-"]+5.5,"#2f6fde"),n(dt["i-"]-5.5,"#2f6fde"),n(dt["i+"]+5.5,"#d7263d");let f=(d,u,g,b="#8a867a",S=5.5)=>c.push(`<text x="${d}" y="${u}" font-family="sans-serif" font-size="${S}" font-weight="700" fill="${b}" text-anchor="middle">${g}</text>`);for(let[d,,u]of ji){let g=u==="+"?"#d7263d":"#2f6fde";f(5.2,dt[d]+2.2,u,g,7),f(o-5.2,dt[d]+2.2,u,g,7)}for(let d=1;d<=i;d++)(d===1||d%5===0)&&(f(ro(d),dt.a-6.2,d),f(ro(d),dt.j+10.4,d));for(let d of[...Wo,...Li])f(5.2,dt[d]+2,d),f(o-5.2,dt[d]+2,d);for(let d of De(t))c.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function zi(t,{tipo:e="media",ocupados:o=new Set,tolerancia:s=3.5}={}){if(!t.length)return null;let i=De(e),c=(b,S)=>{let _=null,B=1/0;for(let W of i){let N=Math.hypot(W.x-b,W.y-S);N<B&&(B=N,_=W)}return{hueco:_,distancia:B}},n=c(t[0].x,t[0].y);if(n.distancia>9.6)return null;let f=n.hueco.x-t[0].x,d=n.hueco.y-t[0].y,u={},g=new Set;for(let b of t){let{hueco:S,distancia:_}=c(b.x+f,b.y+d);if(_>s||o.has(S.nombre)||g.has(S.nombre))return null;u[b.nombre]=S.nombre,g.add(S.nombre)}return{dx:f,dy:d,en:u}}var Sn=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Ya(t,{presionados:e=new Set,conduccion:o=!1}={}){let s=new Map,i=n=>{for(s.has(n)||s.set(n,n);s.get(n)!==n;)s.set(n,s.get(s.get(n))),n=s.get(n);return n},c=(n,f)=>s.set(i(n),i(f));for(let n of Sn)n.forEach(f=>c("placa."+n[0],"placa."+f));for(let n of t.cables)c(n.de,n.a);if(t.protoboard){for(let n of Wi(t.protoboard.tipo).values())n.forEach(f=>c("protoboard."+n[0],"protoboard."+f));for(let n of t.componentes)if(n.en)for(let[f,d]of Object.entries(n.en))c(n.id+"."+f,d)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[f,d]of vi)c(n.id+"."+f,d);(!n.props||n.props.puentePWR!==!1)&&c(n.id+".EXT_POS","placa.VIN")}else n.tipo==="bateria_lipo"?(c(n.id+".BAL0",n.id+".NEG"),c(n.id+".BAL2",n.id+".POS")):n.tipo==="pulsador"?(c(n.id+".1i",n.id+".1d"),c(n.id+".2i",n.id+".2d"),e.has(n.id)&&c(n.id+".1i",n.id+".2i")):o&&n.tipo==="resistencia"?c(n.id+".1",n.id+".2"):o&&n.tipo==="potenciometro"&&(c(n.id+".GND",n.id+".SIG"),c(n.id+".SIG",n.id+".VCC"));return i}var es=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Ja=Object.fromEntries(es.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),wn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},$n=["GND","+5V","+3V3","VIN"],Hi=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Za={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>Hi(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(Dt[t.modelo]||Dt.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>Hi(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},Bt="placa:GND1",ke="placa:5V",no="pieza:EXT_POS",Gi=[15,1,2,3,4,5,6,7];function qi(t,e){let o=Ea.pwm;return{1:"placa:"+o[t],2:`IN_M${t}A`,3:`pieza:M${t}A`,6:`pieza:M${t}B`,7:`IN_M${t}B`,9:"placa:"+o[e],10:`IN_M${e}A`,11:`pieza:M${e}A`,14:`pieza:M${e}B`,15:`IN_M${e}B`,4:Bt,5:Bt,12:Bt,13:Bt,8:no,16:ke}}function Rn(){let t=Ea,e={8:Bt,16:ke,10:ke,11:"placa:"+t.reloj,12:"placa:"+t.cierre,13:"placa:"+t.habilita,14:"placa:"+t.datos};for(let[o,{A:s,B:i}]of Object.entries(t.bits))e[Gi[s]]=`IN_M${o}A`,e[Gi[i]]=`IN_M${o}B`;return e}var Xi="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm",os="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm",Ki="Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",Qa="Package_DIP:DIP-16_W7.62mm",ts={ref:"C",lib:"Device",parte:"C",huella:"Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm",valor:"100nF"},An=[{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Qa,valor:"L293D",nota:"M1 y M2",pads:qi(1,2)},{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Qa,valor:"L293D",nota:"M3 y M4",pads:qi(3,4)},{ref:"U",lib:"74xx",parte:"74HC595",huella:Qa,valor:"74HC595",nota:"sentido de los motores",pads:Rn()},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Xi,valor:"M1 GND M2",externo:!0,pads:{1:"pieza:M1A",2:"pieza:M1B",3:"pieza:GND_IZQ",4:"pieza:M2A",5:"pieza:M2B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Xi,valor:"M4 GND M3",externo:!0,pads:{1:"pieza:M4A",2:"pieza:M4B",3:"pieza:GND_DER",4:"pieza:M3A",5:"pieza:M3B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x02",huella:os,valor:"EXT_PWR",externo:!0,pads:{1:no,2:"pieza:EXT_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Ki,valor:"SERVO_1",externo:!0,pads:{1:"pieza:S1_SIG",2:"pieza:S1_POS",3:"pieza:S1_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Ki,valor:"SERVO_2",externo:!0,pads:{1:"pieza:S2_SIG",2:"pieza:S2_POS",3:"pieza:S2_GND"}},{ref:"JP",lib:"Jumper",parte:"Jumper_2_Open",huella:"Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical",valor:"PWR",pads:{1:no,2:"placa:VIN"}},{...ts,nota:"junto a U1",pads:{1:ke,2:Bt}},{...ts,nota:"junto a U2",pads:{1:ke,2:Bt}},{...ts,nota:"junto a U3",pads:{1:ke,2:Bt}},{ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"100uF 25V",nota:"voltaje de motores",pads:{1:no,2:Bt}},{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:"1k",nota:"LED PWR",pads:{1:no,2:"LED_PWR"}},{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D3.0mm",valor:"LED verde",nota:"PWR",pads:{1:Bt,2:"LED_PWR"}}],_n={EXT_POS:"VMOT",M1A:"M1_A",M1B:"M1_B",M2A:"M2_A",M2B:"M2_B",M3A:"M3_A",M3B:"M3_B",M4A:"M4_A",M4B:"M4_B"},En={motor_tt:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:os,valor:()=>"Motor TT",pines:{A:"1",B:"2"}}],bateria_lipo:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:os,valor:()=>"LiPo 2S",pines:{POS:"1",NEG:"2"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:"Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical",valor:()=>"Balance LiPo",sufijo:"/balance",pines:{BAL0:"1",BAL1:"2",BAL2:"3"}}],probador_lipo:[{ref:"J",lib:"Connector_Generic",parte:"Conn_01x09",huella:"Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical",valor:()=>"Probador de celdas",pines:{NEG:"1",C1:"2",C2:"3",C3:"4",C4:"5",C5:"6",C6:"7",C7:"8",C8:"9"}}]},Pn=new Set(["servo"]),pt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function Tn(t){let o=[2166136261,16777619,2654435769,2246822507].map(s=>{let i=s>>>0;for(let c=0;c<t.length;c++)i=Math.imul(i^t.charCodeAt(c),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Yi(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:s="TecnoCircuito"}={}){let i={...t,componentes:t.componentes.map(m=>m.tipo==="shield_l293d"?{...m,props:{...m.props,puentePWR:!1}}:m)},c=Ya(i),n=i.componentes.find(m=>m.tipo==="shield_l293d")||null,f=m=>{let[P,k]=m.split(":");return k===void 0?"#"+m:c((P==="placa"?"placa":n.id)+"."+k)},d=n?An.map(m=>({...m,id:`${n.id}/${m.valor}${m.nota?" "+m.nota:""}`,enShield:!0})):[],u=new Set(d.filter(m=>m.externo).flatMap(m=>Object.values(m.pads).map(f))),g=new Set(t.cables.flatMap(m=>[m.de,m.a])),b=new Set(d.flatMap(m=>Object.values(m.pads).map(f))),S=Object.keys(Ja).filter(m=>g.has("placa."+m)||b.has(c("placa."+m))),_=i.componentes.filter(m=>Za[m.tipo]),B=new Set([...S.map(m=>c("placa."+m)),...d.flatMap(m=>Object.values(m.pads).map(f)),..._.flatMap(m=>Object.keys(Za[m.tipo].pads).map(P=>c(m.id+"."+P)))]),W=(m,P)=>g.has(m+"."+P)||i.componentes.some(k=>k.id===m&&k.en&&k.en[P]),N=(m,P)=>P.filter(R=>W(m,R)&&B.has(c(m+"."+R))).some(R=>!u.has(c(m+"."+R))),V=(m,P)=>{let k=P.filter(R=>W(m,R)&&B.has(c(m+"."+R)));return k.length>0&&k.every(R=>u.has(c(m+"."+R)))},at=[];for(let m of _){let P=Za[m.tipo];Pn.has(m.tipo)&&V(m.id,Object.keys(P.pads))||at.push({...P,id:m.id,valor:P.valor(m.props||{}),pads:Object.entries(P.pads).map(([k,R])=>[R,c(m.id+"."+k)])})}for(let m of d)at.push({...m,pads:Object.entries(m.pads).map(([P,k])=>[P,f(k),k.startsWith("pieza:")?_n[k.slice(6)]:null])});for(let m of i.componentes)for(let P of En[m.tipo]||[])N(m.id,Object.keys(P.pines))&&at.push({...P,id:m.id+(P.sufijo||""),valor:P.valor(m.props||{}),pads:Object.entries(P.pines).map(([k,R])=>[R,c(m.id+"."+k)])});let U={J:es.length};for(let m of at)U[m.ref]=(U[m.ref]||0)+1,m.ref=m.ref+U[m.ref];let wt=new Map,ht=(m,P,k,R,I)=>{wt.has(m)||wt.set(m,{pads:new Map,uno:new Set,shield:new Set,propia:m.startsWith("#")?m.slice(1):null});let $t=wt.get(m);$t.pads.set(P+" "+k,{ref:P,pad:k,pinUno:R}),R&&$t.uno.add(wn[R]||R),I&&$t.shield.add(I)};for(let m of S)ht(c("placa."+m),Ja[m].ref,Ja[m].pad,m,null);for(let m of at)for(let[P,k,R]of m.pads)ht(k,m.ref,String(P),null,R);let ut=(m,P)=>m.localeCompare(P,"en",{numeric:!0}),E=[...wt.values()].filter(m=>m.pads.size>=2).map(m=>{let P=[...m.pads.values()].sort((R,I)=>ut(R.ref,I.ref)||ut(R.pad,I.pad));return{nombre:$n.find(R=>m.uno.has(R))||[...m.uno].sort(ut)[0]||[...m.shield].sort(ut)[0]||m.propia||`Net-(${P[0].ref}-Pad${P[0].pad})`,pads:P}}).sort((m,P)=>ut(m.nombre,P.nombre)),X=[],rt=(m,P,k,R,I,$t,w)=>X.push("		(comp",`			(ref ${pt(m)})`,`			(value ${pt(P)})`,`			(footprint ${pt(k)})`,`			(libsource (lib ${pt(R)}) (part ${pt(I)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${pt($t)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${pt(w)})`,"		)");X.push("(export",'	(version "E")',"	(design",`		(source ${pt(e)})`,`		(date ${pt(o)})`,`		(tool ${pt(s)})`,"	)"),X.push("	(components");for(let m of es)rt(m.ref,m.valor,m.huella,"Connector_Generic",m.parte,"placa",m.uuid);for(let m of at)rt(m.ref,m.valor,m.huella,m.lib,m.parte,m.id,Tn(e+"/"+m.id));return X.push("	)","	(nets"),E.forEach((m,P)=>{X.push("		(net",`			(code ${pt(P+1)})`,`			(name ${pt(m.nombre)})`,'			(class "Default")');for(let k of m.pads){let R=k.pinUno?` (pinfunction ${pt(k.pinUno)})`:"";X.push(`			(node (ref ${pt(k.ref)}) (pin ${pt(k.pad)})${R} (pintype "passive"))`)}X.push("		)")}),X.push("	)",")"),X.join(`
`)+`
`}var me;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(me||(me={}));var ft;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(ft||(ft={}));var Ji={0:{type:ft.SingleEnded,channel:0},1:{type:ft.SingleEnded,channel:1},2:{type:ft.SingleEnded,channel:2},3:{type:ft.SingleEnded,channel:3},4:{type:ft.SingleEnded,channel:4},5:{type:ft.SingleEnded,channel:5},6:{type:ft.SingleEnded,channel:6},7:{type:ft.SingleEnded,channel:7},8:{type:ft.Temperature},14:{type:ft.Constant,voltage:1.1},15:{type:ft.Constant,voltage:0}},l0={type:ft.Constant,voltage:0},In={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ji,adcReferences:[me.AREF,me.AVCC,me.Reserved,me.Internal1V1]};var Dn=2,kn=4,On=8,Bn=16,Un=32,f0=Dn|kn|On|Bn|Un;var Qi={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},tr={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},er={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var or={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var co={PIN:35,DDR:36,PORT:37,pinChange:er,externalInterrupts:[]};var xe={PIN:41,DDR:42,PORT:43,pinChange:or,externalInterrupts:[null,null,Qi,tr]};var Fo;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(Fo||(Fo={}));var zo;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(zo||(zo={}));var Zi;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Zi||(Zi={}));var ir={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ar;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ar||(ar={}));var rs={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Vn=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:ir,compPortA:xe.PORT,compPinA:6,compPortB:xe.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:xe.PORT,externalClockPin:4},rs),Nn=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:ir,compPortA:co.PORT,compPinA:1,compPortB:co.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:xe.PORT,externalClockPin:5},rs),Ln=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:co.PORT,compPinA:3,compPortB:xe.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},rs),as;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(as||(as={}));var H;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(H||(H={}));var G;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(G||(G={}));var ye=1,Ho=2,Oe=1,{Normal:rr,PWMPhaseCorrect:ge,CTC:ss,FastPWM:be,Reserved:is,PWMPhaseFrequencyCorrect:sr}=as,g0=[[rr,255,G.Immediate,H.Max,0],[ge,255,G.Top,H.Bottom,0],[ss,ye,G.Immediate,H.Max,0],[be,255,G.Bottom,H.Max,0],[is,255,G.Immediate,H.Max,0],[ge,ye,G.Top,H.Bottom,Oe],[is,255,G.Immediate,H.Max,0],[be,ye,G.Bottom,H.Top,Oe]],b0=[[rr,65535,G.Immediate,H.Max,0],[ge,255,G.Top,H.Bottom,0],[ge,511,G.Top,H.Bottom,0],[ge,1023,G.Top,H.Bottom,0],[ss,ye,G.Immediate,H.Max,0],[be,255,G.Bottom,H.Top,0],[be,511,G.Bottom,H.Top,0],[be,1023,G.Bottom,H.Top,0],[sr,Ho,G.Bottom,H.Bottom,0],[sr,ye,G.Bottom,H.Bottom,Oe],[ge,Ho,G.Top,H.Bottom,0],[ge,ye,G.Top,H.Bottom,Oe],[ss,Ho,G.Immediate,H.Max,0],[is,65535,G.Immediate,H.Max,0],[be,Ho,G.Bottom,H.Top,Oe],[be,ye,G.Bottom,H.Top,Oe]];var jn=16,Wn=8,Fn=4;var w0=Fn|jn|Wn;var _d=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"];var Gt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var bt=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),nr=t=>t>=1e3?bt(t/1e3)+" k\u03A9":t+" \u03A9",lo=t=>({estado:"validado",texto:t}),po=t=>({estado:"por_validar",texto:t}),ns=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","bateria_lipo","probador_lipo"]}],fo={protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",nr(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>lo("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${bt(Gt.vf[t.color]||Gt.vf.rojo,2)} V a ${Gt.normalmA} mA`],["Corriente",`de 5 a ${Gt.normalmA} mA; se quema desde ${Gt.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(Gt.vf[t.color]||Gt.vf.rojo))/(Gt.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:()=>lo("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 12 de 12 dentro del criterio).")},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>lo("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",nr(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>lo("Lectura anal\xF3gica revisada el 7 oct 2026 y ruido del ADC medido el 9 oct (0,1 pasos).")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=Dt[t.modelo]||Dt.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${bt(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?po("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):lo("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (6, ~100 y 590 mA).")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${lt.voltiosRef} V`],["Sin carga a 6 V",`${lt.rpmSinCarga} RPM y ${lt.mASinCarga} mA`],["Bloqueado",`${bt(lt.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${lt.reduccion} \xB7 rueda de ${lt.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>po("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"],["En KiCad","sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, puente PWR, C1 a C4 y el LED"]],validacion:()=>po("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=St[t.carga]||St.nominal;return[["Carga",`${e.nombre}: ${bt(e.voltios)} V`],["Celdas",e.celdas.map((o,s)=>`${s+1}: ${bt(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${bt(St.llena.voltios)} / ${bt(St.nominal.voltios)} / ${bt(St.descargada.voltios)} V`],["M\xEDnimo",`${bt(Lo.minimoCeldaV)} V por celda (${bt(Lo.minimoCeldaV*Lo.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>po("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${bt(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${bt(ae.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>po("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},cr=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function lr(t){let e=cr(t).split(/\s+/).filter(Boolean),o=ns.flatMap(s=>s.piezas.map(i=>({tipo:i,categoria:s.nombre})));return e.length?o.filter(({tipo:s,categoria:i})=>{let c=fo[s],n=cr([c.nombre,i,c.descripcion,...c.palabras].join(" "));return e.every(f=>n.includes(f))}):o}var dr="http://www.w3.org/2000/svg",zn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Hn=280,pr=5e3,fr=4,hr=8,Gn=9.6,ur=.4,qn=5,Ut=t=>JSON.parse(JSON.stringify(t)),ot=t=>Math.round(t*100)/100,ho=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),cs=t=>Me[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:Me.verde);function br(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||"uno";if(!Ie[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let s=!!e.soloLectura,i=typeof e.alEvento=="function"?e.alEvento:null,c=[],n=Xn(e.circuito,o),f=document.createElement("div");f.className="tecnocircuito",t.appendChild(f);let d=f.attachShadow({mode:"open"});d.innerHTML=`<style>${gi}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${pr} ${pr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>`;let u=a=>d.querySelector(a),g=u(".tc"),b=u(".tc-barra"),S=u(".tc-biblioteca"),_=u(".tc-buscar"),B=u(".tc-bib-lista"),W=u(".tc-bib-vacio"),N=u(".tc-ficha"),V=b.querySelector('[data-accion="menu"]'),at=u(".tc-sel"),U=u(".tc-area"),wt=u(".tc-mundo"),ht=u(".tc-capa-comp"),ut=u(".tc-capa-pines"),E=u(".tc-cables"),X=u(".tc-asas"),[rt,m]=u(".tc-previa").children,P=u(".tc-ayuda"),k=u(".tc-tip"),R={px:0,py:0,escala:1.5},I=new Map,$t=new Map,w=null,D=null,M=null,uo=null,Go=null,ps=!1,qo=!1,Ue=!1,mo=null,Xo=!1,nt={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},Ko=new Set,fs=[],hs=[],Yo="",K=a=>n.componentes.find(r=>r.id===a),xo=a=>a==="protoboard"?n.protoboard:K(a),Ce=a=>!!(a&&et[a.tipo]&&et[a.tipo].montada),go=a=>a==="placa"||Ce(K(a))?{x:0,y:0,rot:0}:xo(a);function bo(a,r,l){let p=a==="placa"?Ie[o]:et[r],h=document.createElement("div");h.className="tc-comp"+(a==="placa"?" tc-placa":""),h.dataset.id=a,r&&(h.dataset.tipo=r);let x;if(p&&p.dibujo){let $=document.createElement("template");$.innerHTML=p.dibujo.svg(l),x=$.content.firstElementChild}else p?(x=document.createElement(p.etiqueta),p.aplicar&&p.aplicar(x,l),p.perilla&&x.addEventListener("input",()=>Vs(a,Number(x.value)/100))):(x=document.createElement("div"),x.className="tc-desconocido",x.textContent=`\xBF${r}?`,x.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(x);let y=I.get("placa");p&&p.montada&&y?ht.insertBefore(h,y.div.nextSibling):ht.appendChild(h);let v={id:a,def:p,div:h,el:x,w:64,h:40,pines:new Map,lista:!1};return I.set(a,v),Promise.resolve(x.updateComplete).then(()=>{if(I.get(a)===v){if(p&&p.dibujo){let $=p.dibujo.marco?p.dibujo.marco(l):p.dibujo;Object.assign(v,{w:$.ancho,h:$.alto});for(let[O,q]of Object.entries($.pines)){let Z=document.createElement("div");Z.className="tc-pin",Z.dataset.ref=`${a}.${O}`,ut.appendChild(Z),v.pines.set(O,{px:q.x,py:q.y,div:Z})}}else if(p){Object.assign(v,vs(x));for(let $ of x.pinInfo||[]){let O=p.nombrePin($.name);if(!O)continue;let q=document.createElement("div");q.className="tc-pin",q.dataset.ref=`${a}.${O}`,ut.appendChild(q),v.pines.set(O,{px:$.x,py:$.y,div:q})}}v.lista=!0,se(v),Cs(v)}})}function us(){let a=n.protoboard.tipo,r=Ot[a]||Ot.media,l=document.createElement("div");l.className="tc-comp tc-protoboard",l.dataset.id="protoboard",l.dataset.tipo="protoboard";let p=document.createElement("template");p.innerHTML=Ka(a);let h=p.content.firstElementChild;l.appendChild(h);let x=I.get("placa");ht.insertBefore(l,x?x.div.nextSibling:ht.firstChild);let y={id:"protoboard",def:{protoboard:!0},div:l,el:h,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let v of De(a)){let $=document.createElement("div");$.className="tc-pin tc-hueco",$.dataset.ref="protoboard."+v.nombre,$.style.left=v.x+"px",$.style.top=v.y+"px",l.appendChild($),y.pines.set(v.nombre,{px:v.x,py:v.y,div:$})}return I.set("protoboard",y),se(y),Co(),Promise.resolve()}function ms(a=null){if(n.protoboard)return;let r=ra(),l=Ot.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-l.ancho/2),y:Math.round(a.y-l.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},us(),yo(),xt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),Rt({tipo:"comp",id:"protoboard"}),!Ue&&!a&&Fe(),mt()}function yo(){let a=S.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,l]of Object.entries(et)){if(!l.montada)continue;let p=S.querySelector(`[data-tipo="${r}"]`),h=n.componentes.some(x=>x.tipo===r);p&&Object.assign(p,{disabled:h,title:h?`Ya hay una ${l.nombre}`:""})}}}function Rr(a){let r=I.get(a.id),l=n.protoboard;return!r||!r.lista||!l||!r.pines.size?null:[...r.pines].map(([p,h])=>{let x=Zo(r,a,h);return{nombre:p,x:x.x-l.x,y:x.y-l.y}})}function xs(a){let r=new Set;for(let l of n.componentes)if(l!==a&&l.en)for(let p of Object.values(l.en))r.add(p.slice(11));return r}function gs(a){let r=Rr(a);return r?zi(r,{tipo:n.protoboard.tipo,ocupados:xs(a)}):null}function Jo(a){if(Ce(a))return!1;let r=gs(a);return r?(a.x=ot(a.x+r.dx),a.y=ot(a.y+r.dy),a.en=Object.fromEntries(Object.entries(r.en).map(([l,p])=>[l,"protoboard."+p]))):delete a.en,se(I.get(a.id)),Co(),Pt(),!!r}let Ve=[];function Ar(a){bs();let r=n.protoboard&&gs(a),l=I.get("protoboard");!r||!l||(Ve=Object.values(r.en).map(p=>l.pines.get(p).div),Ve.forEach(p=>p.classList.add("tc-destino")))}function bs(){Ve.forEach(a=>a.classList.remove("tc-destino")),Ve=[]}function Co(){let a=I.get("protoboard");if(!a)return;let r=xs(null);for(let[l,p]of a.pines)p.div.classList.toggle("tc-ocupado",r.has(l))}let vo=[];function ys(a){vo.forEach(y=>y.classList.remove("tc-tira")),vo=[];let r=I.get("protoboard");if(!a||!r)return;let[l,p]=So(a),h=l==="protoboard"?p:null;if(!h){let y=K(l);y&&y.en&&y.en[p]&&(h=y.en[p].slice(11))}if(!h)return;let x=Xa(h);for(let[y,v]of r.pines)Xa(y)===x&&(v.div.classList.add("tc-tira"),vo.push(v.div))}function Cs(a){if(a.id==="placa")for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!nt.placa[r];else if(a.def===et.led){let r=Number(nt.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",nt.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=nt.simulando&&(nt.piezas[a.id]||nt.servos[a.id])||null;a.def.mostrar(a.el,r,(K(a.id)||{}).props)}}function vs(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),l=r&&xr(r.getAttribute("width")),p=r&&xr(r.getAttribute("height"));return l&&p?{w:l,h:p}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function se(a){if(!a)return;let r=go(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let l of a.pines.values()){let p=Zo(a,r,l);l.div.style.left=p.x+"px",l.div.style.top=p.y+"px"}}function Zo(a,r,l){let p=((r.rot||0)%360+360)%360;if(!p)return{x:r.x+l.px,y:r.y+l.py};let h=p*Math.PI/180,x=Math.round(Math.cos(h)*1e9)/1e9,y=Math.round(Math.sin(h)*1e9)/1e9,v=a.w/2,$=a.h/2,O=l.px-v,q=l.py-$;return{x:ot(r.x+v+O*x-q*y),y:ot(r.y+$+O*y+q*x)}}function So(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function qt(a){let[r,l]=So(a),p=I.get(r);if(!p||!p.lista)return null;let h=go(r),x=p.pines.get(l);return x?Zo(p,h,x):p.def?null:{x:h.x+p.w/2,y:h.y+p.h/2}}function _r(a){let[r,l]=So(a),p=I.get(r);return p&&p.pines.get(l)}function wo(a){let r=qt(a.de),l=qt(a.a);return!r||!l?null:[r,...(a.puntos||[]).map(([p,h])=>({x:p,y:h})),l]}function ie(a,r,l){let p=document.createElementNS(dr,a);for(let h in r)p.setAttribute(h,r[h]);return l.appendChild(p),p}function Pt(){for(let[a,r]of $t)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(l=>l.remove()),$t.delete(a));n.cables.forEach((a,r)=>{let l=$t.get(a);if(!l){let $=ie("g",{class:"tc-cable"},E);l={g:$,borde:ie("path",{class:"tc-cable-borde"},$),linea:ie("path",{class:"tc-cable-linea"},$),p0:ie("circle",{class:"tc-punta",r:2.4},$),p1:ie("circle",{class:"tc-punta",r:2.4},$),toque:ie("path",{class:"tc-cable-toque"},$),asas:[]},$t.set(a,l)}let p=wo(a);if(l.g.style.display=p?"":"none",!p)return;let h=ls(p),x=cs(a.color);for(let $ of[l.borde,l.linea,l.toque])$.setAttribute("d",h);l.linea.setAttribute("stroke",x),l.toque.dataset.i=r,Ss(l.p0,p[0],x),Ss(l.p1,p[p.length-1],x);let y=!!(w&&w.tipo==="cable"&&w.cable===a);l.g.classList.toggle("tc-seleccionado",y),y&&E.lastChild!==l.g&&E.appendChild(l.g);let v=y?(a.puntos||[]).length:0;for(;l.asas.length>v;)l.asas.pop().remove();for(;l.asas.length<v;)l.asas.push(ie("circle",{class:"tc-asa",r:3.6},X));l.asas.forEach(($,O)=>{$.setAttribute("cx",a.puntos[O][0]),$.setAttribute("cy",a.puntos[O][1]),$.dataset.i=r,$.dataset.p=O})})}function Ss(a,r,l){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",l)}function ve(){let a=D&&qt(D.de);if(!a){rt.setAttribute("d",""),m.setAttribute("d","");return}let r=D.puntos.map(y=>({...y})),l=r.length?r[r.length-1]:a,p=D.cursor?$o(D.cursor,l):l,h=D.destino&&qt(D.destino);h&&(p=h,$s(r,a,h));let x=ls([a,...r,p]);rt.setAttribute("d",x),m.setAttribute("d",x),m.setAttribute("stroke",cs(ws()))}function ws(){return D.color||Ha(D.de,D.destino||"")}function $o(a,r){let l=hr/R.escala;return{x:ot(Math.abs(a.x-r.x)<l?r.x:a.x),y:ot(Math.abs(a.y-r.y)<l?r.y:a.y)}}function $s(a,r,l){if(!a.length)return;let p=hr/R.escala,h=a[a.length-1],x=a.length>1?a[a.length-2]:r;Math.abs(h.y-l.y)<p&&h.y!==x.y&&(h.y=l.y),Math.abs(h.x-l.x)<p&&h.x!==x.x&&(h.x=l.x)}function Er(a){Rt(null),D={de:a,puntos:[],cursor:null,destino:null,color:null},g.classList.add("tc-dibujando"),_s(a,!0),ve(),Ro(),Mt()}function Qo(){D&&(_s(D.de,!1),D=null,g.classList.remove("tc-dibujando"),ve(),Ro(),Mt())}function Rs(a){if(Me[a]){if(D)D.color=a,ve();else if(w&&w.tipo==="cable"){if(w.cable.color===a)return;w.cable.color=a,Pt(),mt()}else return;Ro()}}function As(a){let r=D;if(!r)return;if(a===r.de)return Qo();let l=qt(r.de),p=qt(a);if(l&&p&&$s(r.puntos,l,p),Qo(),n.cables.some(x=>x.de===r.de&&x.a===a||x.de===a&&x.a===r.de)){Nr("Esos dos pines ya est\xE1n unidos.");return}let h={de:r.de,a,color:r.color||Ha(r.de,a)};r.puntos.length&&(h.puntos=r.puntos.map(x=>[ot(x.x),ot(x.y)])),n.cables.push(h),xt("cable_agregado",{de:h.de,a:h.a}),Rt({tipo:"cable",cable:h}),mt()}function Pr(a){let r=D.puntos.length?D.puntos[D.puntos.length-1]:qt(D.de);D.puntos.push(r?$o(a,r):a),ve(),Mt()}function Tr(){!D||!D.puntos.length||(D.puntos.pop(),ve(),Mt())}function _s(a,r){let l=_r(a);l&&l.div.classList.toggle("tc-activo",r)}function ta(a){n.cables=n.cables.filter(r=>r!==a),xt("cable_quitado",{de:a.de,a:a.a})}function Rt(a){w=a;for(let r of I.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);Pt(),Ro(),Mt()}function Ro(){if(ea(),at.textContent="",s||!w&&!D)return;let a=l=>at.insertAdjacentHTML("beforeend",l),r=l=>za.forEach((p,h)=>{let x=Me[p],y=Ni[p]||p;a(`<button type="button" class="tc-muestra${l===p?" tc-activa":""}" data-accion="color" data-color="${p}" title="${h} \xB7 ${y}" aria-label="Cable ${y} (tecla ${h})" style="background:${x};color:${Jn(x)}">${h}</button>`)});if(D){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(ws());return}if(w.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r(w.cable.color);else if(w.id==="protoboard")a(`<span class="tc-etiqueta">${(Ot[n.protoboard.tipo]||Ot.media).nombre}</span>`);else{let l=K(w.id),p=et[l.tipo],h=I.get(l.id);a(`<span class="tc-etiqueta">${p?p.nombre:"Pieza desconocida"}</span>`),Ce(l)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let Ne=null,Tt=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function ea(){let a=w&&w.tipo==="comp"&&!D?w.id==="protoboard"?"protoboard":(K(w.id)||{}).tipo:null,r=a&&fo[a];if(N.hidden=!r||!S.hidden,!r)return N.textContent="";Ne===null&&U.clientWidth&&(Ne=U.clientWidth>=900);let l=Ne!==!1,p=w.id==="protoboard"?null:K(w.id),h=p&&et[p.tipo],x=p&&I.get(p.id),y="";if(p&&h&&!s){for(let v of h.campos||(h.campo?[h.campo]:[])){let $=String(p.props[v.prop]),O=v.opciones.map(([q,Z])=>`<option value="${q}"${$===String(q)?" selected":""}>${Z}</option>`).join("");y+=`<label class="tc-campo">${v.etiqueta} <select data-prop="${v.prop}">${O}</select></label>`}if(h.perilla){let v=Math.round((Number(p.props[h.perilla.prop])||0)*100);y+=`<label class="tc-campo">${h.perilla.etiqueta} <input type="range" min="0" max="100" value="${v}" data-perilla aria-label="${h.perilla.etiqueta} del potenci\xF3metro"></label>`}if(p.tipo==="led"){let v=x&&x.el.value?" checked":"";y+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${v}> Ver encendido</label>`}}N.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${l}" aria-label="Ficha de ${Tt(r.nombre)}: ${l?"ocultar los detalles":"ver los detalles"}"><span>${Tt(r.nombre)}${p?` <small>${Tt(p.id)}</small>`:""}</span><span class="tc-ficha-flecha">${l?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${l||y?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${l?"":" hidden"}>${Tt(r.descripcion)}</p>`+(y?`<div class="tc-ficha-props">${y}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${l?"":" hidden"}></div></div>`,oa(),Es()}function Es(){if(N.hidden||!w)return;let a=I.get(w.id),r=w.id==="protoboard"?n.protoboard:K(w.id),l=!1;a&&r&&(l=R.px+(r.x+a.w/2)*R.escala>U.clientWidth/2),N.classList.toggle("tc-ficha-izq",l)}function oa(){let a=N.querySelector(".tc-ficha-datos");if(!a||!w)return;let r=w.id==="protoboard"?"protoboard":(K(w.id)||{}).tipo,l=fo[r];if(!l)return;let p=w.id==="protoboard"?{}:K(w.id).props||{},h=l.validacion(p);a.innerHTML=`<dl>${l.datos(p).map(([x,y])=>`<dt>${Tt(x)}</dt><dd>${Tt(y)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${Tt(l.pines)}</p>`+(h?`<p class="tc-ficha-val ${h.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${h.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${Tt(h.texto)}</p>`:"")}N.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(Ne=Ne===!1,ea(),N.querySelector(".tc-ficha-titulo").focus())});let Ps=!1;function Ts(){if(!Ps){Ps=!0;for(let a of ns){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let l of a.piezas){let p=fo[l],h=document.createElement("button");h.type="button",h.className="tc-pieza",h.dataset.accion=l==="protoboard"?"protoboard":"agregar",l!=="protoboard"&&(h.dataset.tipo=l),h.dataset.pieza=l,h.setAttribute("aria-label",p.nombre),h.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${Tt(p.nombre)}</b><small>${Tt(p.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,h.querySelector(".tc-mini").append(Mr(l)),r.append(h)}B.append(r)}}}function Mr(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=Ka("media"),r.content.firstElementChild;let l=et[a];if(l.dibujo)return r.innerHTML=l.dibujo.svg(a==="motor_tt"?{...l.props,vista:"rueda"}:l.props),r.content.firstElementChild;let p=document.createElement(l.etiqueta);return l.aplicar&&l.aplicar(p,Ut(l.props)),Promise.resolve(p.updateComplete).then(()=>{let h=vs(p);p.style.zoom=String(Math.min(1,58/h.w,42/h.h))}),p.inert=!0,p}function Ms(){let a=new Set(lr(_.value).map(r=>r.tipo));for(let r of B.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of B.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");W.hidden=a.size>0,W.textContent=a.size?"":`No hay piezas con \xAB${_.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}_.addEventListener("input",Ms),_.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=B.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let yt=null,aa=!1;S.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||s||a.button!==0||(yt={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),S.addEventListener("pointermove",a=>{if(!yt)return;if(!yt.fantasma){if(Math.hypot(a.clientX-yt.x0,a.clientY-yt.y0)<fr)return;let l=document.createElement("div");l.className="tc-fantasma",l.append(yt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),g.append(l),yt.fantasma=l,S.classList.add("tc-arrastrando")}let r=g.getBoundingClientRect();yt.fantasma.style.left=a.clientX-r.left+"px",yt.fantasma.style.top=a.clientY-r.top+"px"});function Is(a,r){if(!yt)return;let{b:l,fantasma:p}=yt;if(yt=null,S.classList.remove("tc-arrastrando"),!p||(p.remove(),aa=!0,setTimeout(()=>aa=!1,0),r))return;let h=U.getBoundingClientRect(),x=S.getBoundingClientRect(),y=v=>a.clientX>=v.left&&a.clientX<=v.right&&a.clientY>=v.top&&a.clientY<=v.bottom;!y(h)||y(x)||(Le(!1),l.dataset.accion==="protoboard"?ms(We(a)):Ds(l.dataset.tipo,We(a)))}S.addEventListener("pointerup",a=>Is(a,!1)),S.addEventListener("pointercancel",a=>Is(a,!0));function Ds(a,r=null){let l=et[a];if(!l)return;let p=1;for(;K(l.prefijo+p);)p++;let h=l.prefijo+p,x=(U.clientWidth/2-R.px)/R.escala,y=(U.clientHeight/2-R.py)/R.escala,v=n.componentes.length%4*14,$={id:h,tipo:a,x:l.montada?0:Math.round(x-20+v),y:l.montada?0:Math.round(y-20+v),rot:0,props:Ut(l.props)};n.componentes.push($),bo(h,a,$.props).then(()=>{let O=I.get(h);r&&O&&!l.montada&&K(h)===$&&($.x=Math.round(r.x-O.w/2),$.y=Math.round(r.y-O.h/2),se(O),Pt(),mt()),n.protoboard&&K(h)===$&&Jo($)&&(xt("componente_cambiado",{id:h,x:$.x,y:$.y,en:Ut($.en)}),mt())}),xt("componente_agregado",{id:h,tipo:a}),Rt({tipo:"comp",id:h}),mt()}function Ir(a){let r=I.get(a.id);if(r){r.div.remove();for(let l of r.pines.values())l.div.remove();I.delete(a.id)}bo(a.id,a.tipo,a.props).then(()=>{Pt(),w&&w.id===a.id&&Rt({tipo:"comp",id:a.id})})}function ks(){if(!w||w.tipo!=="comp"||w.id==="protoboard")return;let a=K(w.id);Ce(a)||(a.rot=((a.rot||0)+90)%360,se(I.get(a.id)),n.protoboard&&Jo(a),Pt(),xt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Ut(a.en):null}),mt())}function Os(){if(w){if(w.tipo==="cable")ta(w.cable);else if(w.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>ta(r));for(let r of n.componentes)delete r.en;n.protoboard=null;let a=I.get("protoboard");a&&(a.div.remove(),I.delete("protoboard")),vo=[],Ve=[],yo(),xt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=K(w.id),r=I.get(w.id);if(n.cables.filter(l=>l.de.startsWith(a.id+".")||l.a.startsWith(a.id+".")).forEach(l=>ta(l)),n.componentes=n.componentes.filter(l=>l!==a),r){r.div.remove();for(let l of r.pines.values())l.div.remove();I.delete(a.id)}xt("componente_quitado",{id:a.id,tipo:a.tipo}),Co()}Eo(),Rt(null),mt()}}function Le(a){S.hidden=!a,ea(),V.setAttribute("aria-expanded",String(a)),a&&(Ts(),yo(),Ms(),_.focus({preventScroll:!0}))}S.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||aa)){if(Le(!1),r.dataset.accion==="cerrar")return V.focus();Bs(r)}}),S.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),Le(!1),V.focus())}),d.addEventListener("pointerdown",a=>{!S.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==V&&Le(!1)}),b.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return Le(S.hidden);Bs(r)}});function Bs(a){let r=a.dataset.accion;if(r==="acercar")return ia(1.25);if(r==="alejar")return ia(.8);if(r==="encuadrar")return Ue=!1,Fe();s||(r==="agregar"?Ds(a.dataset.tipo):r==="protoboard"?ms():r==="girar"?ks():r==="borrar"?Os():r==="color"&&(Rs(a.dataset.color),U.focus({preventScroll:!0})))}function Dr(a){if(s||!w||w.tipo!=="comp")return;let r=K(w.id),l=I.get(w.id),p=et[r.tipo];if(a.target.dataset.accion==="encender"){l.el.value=a.target.checked;return}let h=a.target.dataset.prop;if(!h||!p)return;let x=typeof p.props[h],y=x==="number"?Number(a.target.value):x==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[h]:y},p.dibujo&&p.dibujo.marco?Ir(r):p.aplicar(l.el,r.props),oa(),xt("componente_cambiado",{id:r.id,props:Ut(r.props)}),mt()}function kr(a){if(s||!w||w.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=I.get(w.id);Vs(w.id,Number(a.target.value)/100),r&&et.potenciometro.aplicar(r.el,K(w.id).props)}for(let a of[b,N])a.addEventListener("change",Dr),a.addEventListener("input",kr);function je(a,r,l){let p=I.get(a);if(p&&(p.el.pressed=r),r)Ko.add(a);else if(!Ko.delete(a))return;for(let h of fs)try{h(a,r)}catch(x){console.error(x)}!r&&l!==void 0&&xt("boton_pulsado",{id:a,ms:Math.round(l)})}let Us=new Map;function Vs(a,r){let l=K(a),p=I.get(a);if(!l)return;let h=et[l.tipo];if(s)return p&&h.aplicar(p.el,l.props);let x=Math.max(0,Math.min(1,Math.round(r*100)/100));if(x===l.props[h.perilla.prop])return;l.props={...l.props,[h.perilla.prop]:x};let y=w&&w.tipo==="comp"&&w.id===a&&N.querySelector("[data-perilla]");y&&Number(y.value)!==Math.round(x*100)&&(y.value=Math.round(x*100)),w&&w.id===a&&oa(),mt(),clearTimeout(Us.get(a)),Us.set(a,setTimeout(()=>xt("componente_cambiado",{id:a,props:Ut(l.props)}),400))}function We(a){let r=U.getBoundingClientRect();return{x:(a.clientX-r.left-R.px)/R.escala,y:(a.clientY-r.top-R.py)/R.escala}}function sa(a){try{U.setPointerCapture(a.pointerId)}catch{}}function Ao(a,r={}){M={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:R.px,py0:R.py,movido:!1,...r},sa(a)}U.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;U.focus({preventScroll:!0}),Eo();let r=a.target,l=We(a);if(s)return Ao(a);let p=r.closest(".tc-pin");if(p){if(a.preventDefault(),D)return As(p.dataset.ref);Er(p.dataset.ref),M={tipo:"pin",ref:p.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(D)return Ao(a,{punto:l});let h=r.closest(".tc-asa");if(h)return M={tipo:"asa",cable:n.cables[+h.dataset.i],k:+h.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},sa(a);let x=r.closest(".tc-cable-toque");if(x)return Rt({tipo:"cable",cable:n.cables[+x.dataset.i]});let y=r.closest(".tc-comp");if(y&&y.dataset.id!=="placa"){let v=y.dataset.id,$=xo(v);if($.tipo==="pulsador"&&(a.preventDefault(),nt.simulando)){je(v,!0),M={tipo:"pulsar",id:v,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}return Rt({tipo:"comp",id:v}),Ce($)?Ao(a):et[$.tipo]&&et[$.tipo].perilla&&a.composedPath().some(Qn)?void 0:(M={tipo:"mover",id:v,dx:l.x-$.x,dy:l.y-$.y,x0:a.clientX,y0:a.clientY,movido:!1},sa(a))}Rt(null),Ao(a)}),U.addEventListener("pointermove",a=>{let r=We(a);if(M&&M.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${M.id}"]`))){let l=M;M=null,je(l.id,!1,performance.now()-l.desde)}if(M){if(!M.movido&&Math.hypot(a.clientX-M.x0,a.clientY-M.y0)>fr&&(M.movido=!0,N.classList.add("tc-ficha-quieta")),M.movido&&M.tipo==="mover"){let l=xo(M.id),p=Math.round(r.x-M.dx),h=Math.round(r.y-M.dy);if(M.id==="protoboard")for(let x of n.componentes)x.en&&(x.x=ot(x.x+p-l.x),x.y=ot(x.y+h-l.y),se(I.get(x.id)));l.x=p,l.y=h,se(I.get(M.id)),M.id!=="protoboard"&&n.protoboard&&Ar(l),Pt()}else if(M.movido&&M.tipo==="paneo")Ue=!0,R.px=M.px0+a.clientX-M.x0,R.py=M.py0+a.clientY-M.y0,U.classList.add("tc-paneando"),_o();else if(M.movido&&M.tipo==="asa"){let l=wo(M.cable),p=$o(r,l[M.k]);p=$o(p,l[M.k+2]),M.cable.puntos[M.k]=[p.x,p.y],Pt()}}if(D){let l=a.target.closest&&a.target.closest(".tc-pin");D.cursor=r,D.destino=l&&l.dataset.ref!==D.de?l.dataset.ref:null,ve()}(!M||M.tipo==="pin")&&Vr(a.target.closest&&a.target.closest(".tc-pin")),nt.simulando&&Ns(a.target)});function Ns(a){let r=[],l=a&&a.closest&&a.closest(".tc-pin"),p=a&&a.closest&&a.closest(".tc-cable-toque");l?r=[l.dataset.ref]:p&&n.cables[+p.dataset.i]&&(r=[n.cables[+p.dataset.i].de,n.cables[+p.dataset.i].a]);let h=r.join("|");if(h!==Yo){Yo=h;for(let x of hs)x(r)}}function Ls(a){let r=M;if(M=null,U.classList.remove("tc-paneando"),N.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&Es(),!!r){if(r.tipo==="pulsar")return je(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let l=xo(r.id);r.id==="protoboard"?xt("componente_cambiado",{id:"protoboard",x:l.x,y:l.y}):(bs(),(n.protoboard||l.en)&&Jo(l),xt("componente_cambiado",{id:r.id,x:l.x,y:l.y,en:l.en?Ut(l.en):null})),mt()}else if(r.tipo==="asa"&&r.movido)mt();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&D)Pr(r.punto);else if(r.tipo==="pin"&&r.movido&&D&&a.type==="pointerup"){let l=d.elementFromPoint(a.clientX,a.clientY),p=l&&l.closest(".tc-pin");p&&p.dataset.ref!==r.ref&&As(p.dataset.ref)}}}U.addEventListener("pointerup",Ls),U.addEventListener("pointercancel",Ls),U.addEventListener("pointerleave",()=>{if(Eo(),Yo&&Ns(null),M&&M.tipo==="pulsar"){let a=M;M=null,je(a.id,!1,performance.now()-a.desde)}}),U.addEventListener("dblclick",a=>{if(s||D)return;let r=d.elementFromPoint(a.clientX,a.clientY)||a.target,l=r.closest(".tc-asa"),p=r.closest(".tc-cable-toque");if(l){let h=n.cables[+l.dataset.i];h.puntos.splice(+l.dataset.p,1),h.puntos.length||delete h.puntos,Pt(),Mt(),mt()}else if(p){let h=n.cables[+p.dataset.i],x=wo(h),y=We(a),v=0,$=y,O=1/0;for(let q=0;q<x.length-1;q++){let Z=Zn(y,x[q],x[q+1]);ho(y,Z)<O&&(O=ho(y,Z),v=q,$=Z)}(h.puntos=h.puntos||[]).splice(v,0,[ot($.x),ot($.y)]),Rt({tipo:"cable",cable:h}),mt()}}),U.addEventListener("wheel",a=>{a.preventDefault();let r=U.getBoundingClientRect(),l=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));ia(l,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),g.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,l=!0;a.key==="Escape"?D?Qo():Rt(null):s?l=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),D?Tr():Os()):(a.key==="r"||a.key==="R")&&r?ks():/^[0-9]$/.test(a.key)&&r&&(D||w&&w.tipo==="cable")?Rs(za[Number(a.key)]):l=!1,l&&a.stopPropagation()});function _o(){wt.style.transform=`translate(${R.px}px, ${R.py}px) scale(${R.escala})`;let a=Gn*R.escala;U.style.backgroundSize=`${a}px ${a}px`,U.style.backgroundPosition=`${R.px}px ${R.py}px`,Eo()}function ia(a,r,l){Ue=!0,r===void 0&&(r=U.clientWidth/2,l=U.clientHeight/2);let p=Math.min(qn,Math.max(ur,R.escala*a)),h=(r-R.px)/R.escala,x=(l-R.py)/R.escala;Object.assign(R,{escala:p,px:r-h*p,py:l-x*p}),_o()}function ra(){let a=1/0,r=1/0,l=-1/0,p=-1/0,h=(x,y)=>{a=Math.min(a,x),r=Math.min(r,y),l=Math.max(l,x),p=Math.max(p,y)};for(let x of I.values()){let y=go(x.id);if(!y)continue;let v=(y.rot||0)%180!==0,$=(v?x.h:x.w)/2,O=(v?x.w:x.h)/2;h(y.x+x.w/2-$,y.y+x.h/2-O),h(y.x+x.w/2+$,y.y+x.h/2+O)}for(let x of n.cables)for(let[y,v]of x.puntos||[])h(y,v);return isFinite(a)?{x0:a,y0:r,x1:l,y1:p}:null}function Fe(){let a=U.clientWidth,r=U.clientHeight;if(!a||!r)return!1;let l=ra();if(!l)return!1;let{x0:p,y0:h,x1:x,y1:y}=l,v=48,$=Math.min((a-2*v)/(x-p||1),(r-2*v)/(y-h||1)),O=Math.min(2.4,Math.max(ur,$));return Object.assign(R,{escala:O,px:a/2-(p+x)/2*O,py:r/2-(h+y)/2*O}),mo={ancho:a,alto:r},_o(),!0}function Or(){let a=ra()||{x0:0,y0:0,x1:100,y1:100},r=12,l=16,p=Math.max(Hn,Math.ceil(a.x1-a.x0+2*r)),h=Math.ceil(a.y1-a.y0+2*r)+l,x=[`<svg xmlns="${dr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${p}" height="${h}" viewBox="0 0 ${p} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${p}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${ot(r-a.x0)} ${ot(r-a.y0)})">`];for(let y of ht.children){let v=I.get(y.dataset.id);v&&v.lista&&x.push(Br(v))}for(let y of n.cables){let v=wo(y);if(!v)continue;let $=ls(v),O=cs(y.color),q=Z=>`<circle cx="${Z.x}" cy="${Z.y}" r="2.4" fill="${O}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;x.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${$}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${$}" stroke="${O}" stroke-width="3"/>${q(v[0])}${q(v[v.length-1])}</g>`)}return x.push("</g>",`<text x="${p-r}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${mr(zn)}</text>`,"</svg>"),x.join(`
`)}function Br(a){let r=go(a.id);if(!r)return"";let l=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let re=mr((K(a.id)||{}).tipo||"");return`<g transform="${l}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${re}?</text></g>`}let p=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!p)return"";let h=p.cloneNode(!0),x=[],y=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;y.nextNode();)x.push(y.currentNode);x.forEach(re=>re.remove());let v=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),$=h.querySelector("#rotating");v&&$&&$.setAttribute("transform",`rotate(${v[1]} 10 8)`),h.setAttribute("width",ot(a.w)),h.setAttribute("height",ot(a.h)),h.removeAttribute("id");let O="tc-"+a.id,q=[...new Set([...h.querySelectorAll("[id]")].map(re=>re.id))],Z=new XMLSerializer().serializeToString(h);for(let re of q)Z=Kn(Z,re,O);Z=Z.replace(/^<svg\b/,`<svg id="${O}"`);let Fs=a.el.shadowRoot?Yn(a.el,O,q):"";return`<g transform="${l}">${Fs?`<style><![CDATA[
${Fs}
]]></style>`:""}${Z}</g>`}function Ur(a){let[r,l]=So(a);if(r==="placa")return Ie[o].rotulo(l);if(r==="protoboard")return Fi(l);let p=K(r),h=p&&et[p.tipo],x=p&&p.en&&p.en[l]?` \xB7 en el hueco ${p.en[l].slice(11)}`:"";return h?`${h.nombre}: ${h.rotulo(l)}${x}`:l}function Vr(a){let r=a?a.dataset.ref:null;if(r===uo)return;uo=r,ys(r);let l=r&&qt(r);if(!l){k.hidden=!0;return}let p=R.py+l.y*R.escala,h=nt.voltajes[r],x=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;k.textContent=Ur(r)+x,k.style.left=R.px+l.x*R.escala+"px",k.style.top=p+"px",k.classList.toggle("tc-abajo",p<44),k.hidden=!1}function Eo(){uo=null,k.hidden=!0,ys(null)}function Mt(){clearTimeout(Go),P.classList.remove("tc-aviso");let a=w&&w.tipo==="cable"&&w.cable.puntos&&w.cable.puntos.length;P.textContent=s?"Solo lectura: puedes mover la vista y hacer zoom.":D?D.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":w&&w.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":w&&Ce(K(w.id))?"Va montada sobre el Uno: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla":w&&w.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":w&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":w?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":nt.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function Nr(a){Mt(),P.textContent=a,P.classList.add("tc-aviso"),Go=setTimeout(Mt,2500)}function xt(a,r){if(i)try{i({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(l){console.error(l)}}function mt(){let a=Ut(n);for(let r of c)try{r(a)}catch(l){console.error(l)}}function js(a){g.classList.toggle("tc-oscuro",a==="oscuro"),g.classList.toggle("tc-claro",a==="claro")}let Lr={circuito:()=>Ut(n),alCambiar(a){typeof a=="function"&&c.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:js,exportarSVG:Or,exportarNetlist:a=>Yi(n,a),_alPulsar(a){typeof a=="function"&&fs.push(a)},_alAcercar(a){typeof a=="function"&&hs.push(a)},_mostrar(a){let r=nt.simulando;nt={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==nt.simulando&&(g.classList.toggle("tc-simulando",nt.simulando),nt.simulando||[...Ko].forEach(l=>je(l,!1)),Mt()),uo=null;for(let l of I.values())l.lista&&Cs(l)},destruir(){Xo=!0,Ws.disconnect(),clearTimeout(Go),c.length=0,I.clear(),$t.clear(),f.remove()}};e.tema&&js(e.tema),s&&g.classList.add("tc-solo-lectura"),_o(),Mt();let Ws=new ResizeObserver(()=>{if(!ps||Xo)return;if(!qo){qo=Fe();return}if(Ue||!mo)return;let a=(r,l)=>Math.abs(r-l)/Math.max(1,l);(a(U.clientWidth,mo.ancho)>.1||a(U.clientHeight,mo.alto)>.1)&&Fe()});Ws.observe(U);let jr=bo("placa");return s||Ts(),yo(),Promise.all([jr,...n.protoboard?[us()]:[],...n.componentes.map(a=>bo(a.id,a.tipo,a.props))]).then(()=>{Xo||(ps=!0,Co(),Pt(),qo=Fe())}),Lr}function Xn(t,e){let o=t&&typeof t=="object"?Ut(t):{};o.formato=o.formato||1,o.placa=e;let s=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!s.has(i.id)&&s.add(i.id));for(let i of o.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let c=et[i.tipo]?et[i.tipo].props:{};i.props={...c,...i.props&&typeof i.props=="object"?i.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of o.cables){let c=Array.isArray(i.puntos)&&i.puntos.every(n=>Array.isArray(n)&&n.length===2&&n.every(Number.isFinite));"puntos"in i&&!c&&delete i.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let i of o.componentes){let c=o.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(n=>typeof n=="string"&&n.startsWith("protoboard."));"en"in i&&!c&&delete i.en}return o}var yr=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),mr=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function Kn(t,e,o){let s=yr(e),i=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${s}"`,"g"),(c,n)=>`${n}id="${i}"`).replace(new RegExp(`url\\(#${s}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${s}"`,"g"),()=>`href="#${i}"`)}function Yn(t,e,o){let s=t.shadowRoot,i=[...s.adoptedStyleSheets||[]];s.querySelectorAll("style").forEach(n=>n.sheet&&i.push(n.sheet));let c=[];for(let n of i){let f;try{f=n.cssRules}catch{continue}for(let d of f){if(!d.selectorText||!d.style)continue;let u=d.selectorText.split(",").map(b=>b.trim()).filter(b=>!/:host|\binput\b|:focus|\.hide-input/.test(b));if(!u.length)continue;let g=u.map(b=>{let S=b;for(let _ of o)S=S.replace(new RegExp(`#${yr(_)}(?![\\w-])`,"g"),()=>`#${e}-${_}`);return/^svg\b/.test(S)?S.replace(/^svg\b/,`#${e}`):`#${e} ${S}`});c.push(`${g.join(", ")} { ${d.style.cssText} }`)}}return c.join(`
`)}function Jn(t){let[e,o,s]=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255);return .2126*e+.7152*o+.0722*s>.55?"#1d2733":"#ffffff"}function xr(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function ls(t){let e=s=>`${ot(s.x)} ${ot(s.y)}`,o=`M${e(t[0])}`;for(let s=1;s<t.length-1;s++){let i=t[s-1],c=t[s],n=t[s+1],f=Math.min(5,ho(i,c)/2,ho(c,n)/2);o+=` L${e(gr(c,i,f))} Q${e(c)} ${e(gr(c,n,f))}`}return`${o} L${e(t[t.length-1])}`}function gr(t,e,o){let s=ho(t,e);return s?{x:t.x+(e.x-t.x)*o/s,y:t.y+(e.y-t.y)*o/s}:t}function Zn(t,e,o){let s=o.x-e.x,i=o.y-e.y,c=s*s+i*i,n=c?Math.max(0,Math.min(1,((t.x-e.x)*s+(t.y-e.y)*i)/c)):0;return{x:e.x+n*s,y:e.y+n*i}}function Qn(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}function Cr(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[i,c]of String(t).split(/\r?\n/).entries()){let n=c.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let f=n.slice(1).match(/../g).map(_=>parseInt(_,16));if(f.reduce((_,B)=>_+B,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[d,u,g,b]=f,S=f.slice(4,4+d);if(b===0){let _=o+(u<<8|g);if(_+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(S,_)}else if(b===1){s=!0;break}else b===2?o=(S[0]<<8|S[1])<<4:b===4&&(o=(S[0]<<8|S[1])<<16)}if(!s)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var tc=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],ds='(()=>{function Me(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var $o=256,vo=128,ee=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+$o),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(vo),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,o=255){let i=this.writeHooks[e];i&&i(s,this.data[e],e,o)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:o,enableRegister:i,enableMask:a}=e;e.inverseFlag?this.data[s]&=~o:this.data[s]|=o,this.data[i]&a&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:o,flagRegister:i,flagMask:a,inverseFlag:n}=e;if(s&o){let r=this.data[i]&a;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:o},i=!0){i&&(this.data[s]&=~o);let{pendingInterrupts:a,maxInterrupt:n}=this;if(a[e]&&(a[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(a[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:o,flagMask:i}=e;s&i&&(this.data[o]&=~i,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:o}=this;s=this.cycles+Math.max(1,s);let i=o.pop(),a=i??{cycles:s,callback:e,next:null};a.cycles=s,a.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<s;)r=n,n=n.next;return r?(r.next=a,a.next=n):(this.nextClockEvent=a,a.next=n),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:o}=this,i=null;for(;s;){if(s.callback===e)return i?i.next=s.next:this.nextClockEvent=s.next,o.length<10&&o.push(s),!0;i=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let o=this.pendingInterrupts[s];Me(this,o.address),o.constant||this.clearInterrupt(o)}}};function se(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function ye(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o+(t.data[95]&1),a=i&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^o)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i&256?1:0,n|=1&(s&o|o&~a|~a&s)?32:0,t.data[95]=n}else if((e&64512)===3072){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s+o&255;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(i^o)&(i^s)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=s+o&256?1:0,a|=1&(s&o|o&~i|~i&s)?32:0,t.data[95]=a}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=o+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,i,!0);let a=t.data[95]&224;a|=i?0:2,a|=32768&i?4:0,a|=~o&i&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=~i&o&32768?1:0,t.data[95]=a,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65039)===37893){let s=t.data[(e&496)>>4],o=s>>>1|128&s;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,o=(e&496)>>4;t.data[o]=~(1<<s)&t.data[o]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],o=e&7;t.data[95]=t.data[95]&191|(s>>o&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,o=t.pc+2,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=s-1,t.cycles+=a?4:3}else if((e&65280)===38912){let s=e&248,o=e&7,i=t.readData((s>>3)+32),a=1<<o;t.writeData((s>>3)+32,i&~a,a)}else if((e&65039)===37888){let s=(e&496)>>4,o=255-t.data[s];t.data[s]=o;let i=t.data[95]&225|1;i|=o?0:2,i|=128&o?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===5120){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=((s^o)&(s^i)&128)!==0?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===1024){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o,a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],o=se(s)?2:1;t.pc+=o,t.cycles+=o}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],o=s-1;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===128?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(e===38169){let s=t.pc+1,o=t.dataView.getUint16(93,!0),i=t.data[92];t.data[o]=s&255,t.data[o-1]=s>>8&255,t.data[o-2]=s>>16&255,t.dataView.setUint16(93,o-3,!0),t.pc=(i<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|o],t.dataView.setUint16(30,o+1,!0),o===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setUint16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.dataView.getInt8((e&7)+16),i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?0:2)|(s*o&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),o=t.data[(e&7)+16],i=s*o<<1;t.dataView.setInt16(0,i,!0),t.data[95]=t.data[95]&252|(65535&i?2:0)|(s*o&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[o]=s&255,t.data[o-1]=s>>8&255,i&&(t.data[o-2]=s>>16&255),t.dataView.setUint16(93,o-(i?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=i?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],o=s+1&255;t.data[(e&496)>>4]=o;let i=t.data[95]&225;i|=o?0:2,i|=128&o?4:0,i|=s===127?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i&255-o),t.data[s]=i}else if((e&65039)===37381){let s=(e&496)>>4,o=t.data[s],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i|o),t.data[s]=i}else if((e&65039)===37383){let s=t.data[(e&496)>>4],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^o),t.data[(e&496)>>4]=o}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],o=s>>>1;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=s&1,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),o=2*((e&240)>>4);t.data[o]=t.data[s],t.data[o+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,o=t.data[s],i=0-o;t.data[s]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=i===128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i?1:0,a|=1&(i|o)?32:0,t.data[95]=a}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let o=t.data[95]&225;o|=s?0:2,o|=128&s?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),o=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&o,t.data[i-1]=o>>8&255,a&&(t.data[i-2]=o>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc+=s,t.cycles+=a?3:2}else if(e===38152){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,o=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,o,!0),t.pc=(t.data[o-1]<<8)+t.data[o]-1,s&&(t.pc|=t.data[o-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],o=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=o;let i=t.data[95]&224;i|=o?0:2,i|=128&o?4:0,i|=1&s?1:0,i|=i>>2&1^i&1?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&64512)===2048){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=t.data[95],a=s-o-(i&1);t.data[(e&496)>>4]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=t.data[95],a=s-o-(i&1);t.data[((e&240)>>4)+16]=a,i=i&192|(!a&&i>>1&1?2:0)|(o+(i&1)>s?1:0),i|=128&a?4:0,i|=(s^o)&(s^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~s&o|o&a|a&~s)?32:0,t.data[95]=i}else if((e&65280)===39424){let s=((e&248)>>3)+32,o=1<<(e&7);t.writeData(s,t.readData(s)|o,o),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let o=t.progMem[t.pc+1],i=se(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let o=t.progMem[t.pc+1],i=se(o)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,o=t.dataView.getUint16(s,!0),i=e&15|(e&192)>>2,a=o-i;t.dataView.setUint16(s,a,!0);let n=t.data[95]&192;n|=a?0:2,n|=32768&a?4:0,n|=o&~a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>o?1:0,n|=1&(~o&i|i&a|a&~o)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],o=se(s)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],o=se(s)?2:1;t.cycles+=o,t.pc+=o}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],o=t.progMem[t.pc+1];t.writeData(o,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.writeData(o,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0);t.writeData(o,s),t.dataView.setUint16(28,o+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.writeData(o,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],o=t.data[e&15|(e&512)>>5],i=s-o;t.data[(e&496)>>4]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],o=e&15|(e&3840)>>4,i=s-o;t.data[((e&240)>>4)+16]=i;let a=t.data[95]&192;a|=i?0:2,a|=128&i?4:0,a|=(s^o)&(s^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>s?1:0,a|=1&(~s&o|o&i|i&~s)?32:0,t.data[95]=a}else if((e&65039)===37890){let s=(e&496)>>4,o=t.data[s];t.data[s]=(15&o)<<4|(240&o)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,o=t.data[s],i=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=o,t.data[s]=i}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var it;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(it||(it={}));var j;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(j||(j={}));var ps={0:{type:j.SingleEnded,channel:0},1:{type:j.SingleEnded,channel:1},2:{type:j.SingleEnded,channel:2},3:{type:j.SingleEnded,channel:3},4:{type:j.SingleEnded,channel:4},5:{type:j.SingleEnded,channel:5},6:{type:j.SingleEnded,channel:6},7:{type:j.SingleEnded,channel:7},8:{type:j.Temperature},14:{type:j.Constant,voltage:1.1},15:{type:j.Constant,voltage:0}},_o={type:j.Constant,voltage:0},Ee={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:ps,adcReferences:[it.AREF,it.AVCC,it.Reserved,it.Internal1V1]},ko=7,Uo=8,Bo=16,us=64,Pe=128,Oo=31,Vo=32,No=8,Fo=8,Wo=3,Lo=6,oe=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=o=>{var i;let a=0;switch(o.type){case j.Constant:a=o.voltage;break;case j.SingleEnded:a=(i=this.channelValues[o.channel])!==null&&i!==void 0?i:0;break;case j.Differential:a=o.gain*((this.channelValues[o.positiveChannel]||0)-(this.channelValues[o.negativeChannel]||0));break;case j.Temperature:a=.378125;break}let n=a/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:Bo,enableRegister:this.config.ADCSRA,enableMask:Uo},e.writeHooks[s.ADCSRA]=(o,i)=>{var a;if(o&Pe&&!(i&Pe)&&(this.conversionCycles=25),e.data[s.ADCSRA]=o,e.updateInterruptEnable(this.ADC,o),!this.converting&&o&us){if(!(o&Pe))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&Oo;e.data[s.ADCSRB]&No&&(n|=32),n&=s.muxInputMask;let r=(a=s.muxChannels[n])!==null&&a!==void 0?a:_o;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:o,ADMUX:i,ADCSRA:a}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[i]&Vo?(this.cpu.data[s]=e<<6&255,this.cpu.data[o]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[o]=e>>8&3),this.cpu.data[a]&=~us,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&ko){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:o}=this.config,i=this.cpu.data[s]>>Lo&Wo;return o.length>4&&this.cpu.data[s]&Fo&&(i|=4),(e=o[i])!==null&&e!==void 0?e:it.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case it.AVCC:return this.avcc;case it.AREF:return this.aref;case it.Internal1V1:return 1.1;case it.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var jo=2,Ho=4,Go=8,qo=16,Ko=32,ca=jo|Ho|Go|qo|Ko;var ms={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},gs={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Cs={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Ss={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Rs={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var _t={PIN:35,DDR:36,PORT:37,pinChange:Cs,externalInterrupts:[]},De={PIN:38,DDR:39,PORT:40,pinChange:Ss,externalInterrupts:[]},At={PIN:41,DDR:42,PORT:43,pinChange:Rs,externalInterrupts:[null,null,ms,gs]};var q;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(q||(q={}));var V;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(V||(V={}));var vt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(vt||(vt={}));var ie=class{constructor(e,s){var o,i,a,n;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=p=>{let E=e.data[s.PORT];return e.data[s.DDR]=p,this.writeGpio(E,p),this.updatePinRegister(p),!0},e.writeHooks[s.PORT]=p=>{let E=e.data[s.DDR];return e.data[s.PORT]=p,this.writeGpio(p,E),this.updatePinRegister(E),!0},e.writeHooks[s.PIN]=(p,E,f,w)=>{let P=e.data[s.PORT],k=e.data[s.DDR],F=P^p&w;return e.data[s.PORT]=F,this.writeGpio(F,k),this.updatePinRegister(k),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(p=>p?{address:p.interrupt,flagRegister:p.EIFR,flagMask:1<<p.index,enableRegister:p.EIMSK,enableMask:1<<p.index}:null);let d=new Set(r.map(p=>p?.EICR));for(let p of d)this.attachInterruptHook(p||0);let R=(i=(o=r.find(p=>p&&p.EIMSK))===null||o===void 0?void 0:o.EIMSK)!==null&&i!==void 0?i:0;this.attachInterruptHook(R,"mask");let u=(n=(a=r.find(p=>p&&p.EIFR))===null||a===void 0?void 0:a.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(u,"flag");let{pinChange:A}=s;if(this.PCINT=A?{address:A.pinChangeInterrupt,flagRegister:A.PCIFR,flagMask:1<<A.PCIE,enableRegister:A.PCICR,enableMask:1<<A.PCIE}:null,A){let{PCIFR:p,PCMSK:E}=A;e.writeHooks[p]=f=>{for(let w of this.cpu.gpioPorts){let{PCINT:P}=w;P&&e.clearInterruptByFlag(P,f)}return!0},e.writeHooks[E]=f=>{e.data[E]=f;for(let w of this.cpu.gpioPorts){let{PCINT:P}=w;P&&e.updateInterruptEnable(P,f)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],o=this.cpu.data[this.portConfig.PORT],i=1<<e,a=o&i?q.InputPullUp:q.Input,n=this.openCollector&i?a:q.High;return s&i?this.lastValue&i?n:q.Low:a}setPin(e,s){let o=1<<e;this.pinValue&=~o,s&&(this.pinValue|=o),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:o,portConfig:i}=this,a=1<<e;if(s===V.None)this.overrideMask|=a,this.overrideValue&=~a;else switch(this.overrideMask&=~a,s){case V.Enable:this.overrideValue&=~a,this.overrideValue|=o.data[i.PORT]&a;break;case V.Set:this.overrideValue|=a;break;case V.Clear:this.overrideValue&=~a;break;case V.Toggle:this.overrideValue^=a;break}let n=o.data[i.DDR];this.writeGpio(o.data[i.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var s,o;let i=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=i,this.lastPin!==i){for(let a=0;a<8;a++)if((i&1<<a)!==(this.lastPin&1<<a)){let n=!!(i&1<<a);this.toggleInterrupt(a,n),(o=(s=this.externalClockListeners)[a])===null||o===void 0||o.call(s,n)}this.lastPin=i}}toggleInterrupt(e,s){let{cpu:o,portConfig:i,externalInts:a,PCINT:n}=this,{externalInterrupts:r,pinChange:d}=i,R=r[e],u=a[e];if(u&&R){let{EIMSK:A,index:p,EICR:E,iscOffset:f}=R;if(o.data[A]&1<<p){let w=o.data[E]>>f&3,P=!1;switch(u.constant=!1,w){case vt.LowLevel:P=!s,u.constant=!0;break;case vt.Change:P=!0;break;case vt.FallingEdge:P=!s;break;case vt.RisingEdge:P=s;break}P?o.setInterruptFlag(u):u.constant&&o.clearInterrupt(u,!0)}}if(d&&n&&d.mask&1<<e){let{PCMSK:A}=d;o.data[A]&1<<e+d.offset&&o.setInterruptFlag(n)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:o}=this;o.writeHooks[e]=i=>{s!=="flag"&&(o.data[e]=i);for(let a of o.gpioPorts){for(let n of a.externalInts)n&&s==="mask"&&o.updateInterruptEnable(n,i),n&&!n.constant&&s==="flag"&&o.clearInterruptByFlag(n,i);a.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let o=0;o<8;o++){let i=s[o];if(!i)continue;let a=!!(this.lastPin&1<<o),{EIFR:n,EIMSK:r,index:d,EICR:R,iscOffset:u,interrupt:A}=i;if(!(e.data[r]&1<<d)||a)continue;(e.data[R]>>u&3)===vt.LowLevel&&e.queueInterrupt({address:A,flagRegister:n,flagMask:1<<d,enableRegister:r,enableMask:1<<d,constant:!0})}}writeGpio(e,s){let o=(e&this.overrideMask|this.overrideValue)&s|e&~s,i=this.lastValue;if(o!==i||s!==this.lastDdr){this.lastValue=o,this.lastDdr=s;for(let a of this.listeners)a(o,i)}}};var Is={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ae;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ae||(ae={}));var ve={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},_e=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Is,compPortA:At.PORT,compPinA:6,compPortB:At.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:At.PORT,externalClockPin:4},ve),ke=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Is,compPortA:_t.PORT,compPinA:1,compPortB:_t.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:At.PORT,externalClockPin:5},ve),Ue=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:_t.PORT,compPinA:3,compPortB:At.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},ve),qt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(qt||(qt={}));var N;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(N||(N={}));var U;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(U||(U={}));var bt=1,Gt=2,kt=1,{Normal:Be,PWMPhaseCorrect:pt,CTC:ge,FastPWM:mt,Reserved:$e,PWMPhaseFrequencyCorrect:ne}=qt,zo=[[Be,255,U.Immediate,N.Max,0],[pt,255,U.Top,N.Bottom,0],[ge,bt,U.Immediate,N.Max,0],[mt,255,U.Bottom,N.Max,0],[$e,255,U.Immediate,N.Max,0],[pt,bt,U.Top,N.Bottom,kt],[$e,255,U.Immediate,N.Max,0],[mt,bt,U.Bottom,N.Top,kt]],Xo=[[Be,65535,U.Immediate,N.Max,0],[pt,255,U.Top,N.Bottom,0],[pt,511,U.Top,N.Bottom,0],[pt,1023,U.Top,N.Bottom,0],[ge,bt,U.Immediate,N.Max,0],[mt,255,U.Bottom,N.Top,0],[mt,511,U.Bottom,N.Top,0],[mt,1023,U.Bottom,N.Top,0],[ne,Gt,U.Bottom,N.Bottom,0],[ne,bt,U.Bottom,N.Bottom,kt],[pt,Gt,U.Top,N.Bottom,0],[pt,bt,U.Top,N.Bottom,kt],[ge,Gt,U.Immediate,N.Max,0],[$e,65535,U.Immediate,N.Max,0],[mt,Gt,U.Bottom,N.Top,kt],[mt,bt,U.Bottom,N.Top,kt]];function Zo(t){switch(t){case 1:return V.Toggle;case 2:return V.Clear;case 3:return V.Set;default:return V.Enable}}var As=128,bs=64,Jo=32,re=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=U.Immediate,this.tovUpdateMode=N.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(o=!0,i=!1)=>{let{divider:a,lastCycle:n,cpu:r}=this,{cycles:d}=r,R=d-n;if(a&&R>=a||i){let u=i?1:Math.floor(R/a);this.lastCycle+=u*a;let A=this.tcnt,{timerMode:p,TOP:E}=this,f=p===pt||p===ne,w=f?this.phasePwmCount(A,u):(A+u)%(E+1),P=A+u>E;if(this.tcntUpdated||(this.tcnt=w,f||this.timerUpdated(w,A)),!f){if(p===mt&&P){let{compA:k,compB:F}=this;k&&this.updateCompPin(k,"A",!0),F&&this.updateCompPin(F,"B",!0)}this.ocrUpdateMode==U.Bottom&&P&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),P&&(this.tovUpdateMode==N.Top||E===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===U.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===U.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:u}=this,{externalClockPin:A}=this.config,p=this.config.dividers[u];this.lastCycle=p?this.cpu.cycles:0,this.updateDivider=!1,this.divider=p,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[A]=null),p?r.addClockEvent(this.count,this.lastCycle+p-r.cycles):this.externalClockPort&&(u===ae.FallingEdge||u===ae.RisingEdge)&&(this.externalClockPort.externalClockListeners[A]=this.externalClockCallback,this.externalClockRisingEdge=u===ae.RisingEdge);return}o&&a&&r.addClockEvent(this.count,this.lastCycle+a-r.cycles)},this.externalClockCallback=o=>{o===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=o=>(this.count(!1),this.config.bits===16&&(this.cpu.data[o+1]=this.tcnt>>8),this.cpu.data[o]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=o=>{this.tcntNext=this.highByteTemp<<8|o,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=o=>{this.nextOcrA=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=o=>{this.nextOcrB=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=o=>{this.nextOcrC=this.highByteTemp<<8|o,this.ocrUpdateMode===U.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=a=>{this.icr=this.highByteTemp<<8|a};let o=a=>{this.highByteTemp=a},i=(a,n,r)=>(this.highByteTemp=a&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=o,this.cpu.writeHooks[s.OCRA+1]=i,this.cpu.writeHooks[s.OCRB+1]=i,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=i),this.cpu.writeHooks[s.ICR+1]=o}e.writeHooks[s.TCCRA]=o=>(this.cpu.data[s.TCCRA]=o,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=o=>(s.TCCRC||(this.checkForceCompare(o),o&=~(As|bs)),this.cpu.data[s.TCCRB]=o,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=o=>{this.checkForceCompare(o)}),e.writeHooks[s.TIFR]=o=>(this.cpu.data[s.TIFR]=o,this.cpu.clearInterruptByFlag(this.OVF,o),this.cpu.clearInterruptByFlag(this.OCFA,o),this.cpu.clearInterruptByFlag(this.OCFB,o),!0),e.writeHooks[s.TIMSK]=o=>{this.cpu.updateInterruptEnable(this.OVF,o),this.cpu.updateInterruptEnable(this.OCFA,o),this.cpu.updateInterruptEnable(this.OCFB,o)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case bt:return this.ocrA;case Gt:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case bt:case Gt:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,o=e.bits===16?Xo:zo,i=this.cpu.data[e.TCCRA],[a,n,r,d,R]=o[s];this.timerMode=a,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=d;let u=a===mt||a===pt||a===ne,A=this.compA;this.compA=i>>6&3,this.compA===1&&u&&!(R&kt)&&(this.compA=0),!!A!=!!this.compA&&this.updateCompA(this.compA?V.Enable:V.None);let p=this.compB;if(this.compB=i>>4&3,this.compB===1&&u&&(this.compB=0),!!p!=!!this.compB&&this.updateCompB(this.compB?V.Enable:V.None),this.hasOCRC){let E=this.compC;this.compC=i>>2&3,this.compC===1&&u&&(this.compC=0),!!E!=!!this.compC&&this.updateCompC(this.compC?V.Enable:V.None)}}phasePwmCount(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n,TOP:r,MAX:d,tcntUpdated:R}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!R&&(this.countingUp=!1,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!R&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===U.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),R||(e===o&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===i&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===a&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&d}timerUpdated(e,s){let{ocrA:o,ocrB:i,ocrC:a,hasOCRC:n}=this,r=s>e;((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==qt.FastPWM||this.timerMode==qt.PWMPhaseCorrect||this.timerMode==qt.PWMPhaseFrequencyCorrect||(e&As&&this.updateCompPin(this.compA,"A"),e&bs&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Jo&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,o=!1){let i=V.None,a=e===3,n=this.countingUp===a;switch(this.timerMode){case Be:case ge:i=Zo(e);break;case mt:e===1?i=o?V.None:V.Toggle:i=a!==o?V.Set:V.Clear;break;case pt:case ne:e===1?i=V.Toggle:i=n?V.Set:V.Clear;break}i!==V.None&&(s==="A"?this.updateCompA(i):s==="B"?this.updateCompB(i):this.updateCompC(i))}updateCompA(e){let{compPortA:s,compPinA:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompB(e){let{compPortB:s,compPinB:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}updateCompC(e){let{compPortC:s,compPinC:o}=this.config,i=this.cpu.gpioByPort[s];i?.timerOverridePin(o,e)}};var Ve={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},Qo=128,Yo=64,Ts=32;var Oe=2,ti=1,ws=Oe,ei=128,si=64,oi=32,Ce=16,Se=8,Es=4;var Ms=Es|Ce|Se;var ii=32,ai=16,ni=8,ys=4,Ps=2;var ri={5:31,6:63,7:127,8:255,9:255},ce=class{constructor(e,s,o){this.cpu=e,this.config=s,this.freqHz=o,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Qo,enableRegister:this.config.UCSRB,enableMask:ei,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ts,enableRegister:this.config.UCSRB,enableMask:oi},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Yo,enableRegister:this.config.UCSRB,enableMask:si},this.reset(),this.cpu.writeHooks[s.UCSRA]=(i,a)=>{var n;return e.data[s.UCSRA]=i&(ti|Oe),e.clearInterruptByFlag(this.TXC,i),(i&ws)!==(a&ws)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(i,a)=>{var n;return e.updateInterruptEnable(this.RXC,i),e.updateInterruptEnable(this.UDRE,i),e.updateInterruptEnable(this.TXC,i),i&Ce&&a&Ce&&e.clearInterrupt(this.RXC),i&Se&&!(a&Se)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=i,(i&Ms)!==(a&Ms)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=i=>{var a;return e.data[s.UCSRC]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var i;let a=(i=ri[this.bitsPerChar])!==null&&i!==void 0?i:255,n=this.rxByte&a;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[s.UDR]=i=>{if(this.onByteTransmit&&this.onByteTransmit(i),this.onLineTransmit){let a=String.fromCharCode(i);a===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=a}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=i=>{var a;return this.cpu.data[s.UBRRH]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.writeHooks[s.UBRRL]=i=>{var a;return this.cpu.data[s.UBRRL]=i,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ts,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=ys|Ps,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var o;let{cpu:i}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,i.setInterruptFlag(this.RXC),(o=this.onRxComplete)===null||o===void 0||o.call(this);else return this.rxBusyValue=!0,i.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&Oe?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ce)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Se)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(ys|Ps))>>1|this.cpu.data[this.config.UCSRB]&Es){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ni?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&ii)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&ai)}};function Ds(t){let e=new Uint8Array(32768),s=0,o=!1;for(let[i,a]of String(t).split(/\\r?\\n/).entries()){let n=a.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${i+1}).`);let r=n.slice(1).match(/../g).map(E=>parseInt(E,16));if(r.reduce((E,f)=>E+f,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${i+1}).`);let[d,R,u,A]=r,p=r.slice(4,4+d);if(A===0){let E=s+(R<<8|u);if(E+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(p,E)}else if(A===1){o=!0;break}else A===2?s=(p[0]<<8|p[1])<<4:A===4&&(s=(p[0]<<8|p[1])<<16)}if(!o)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var lt=16e6,ci=ye,li=[[At,["D0","D1","D2","D3","D4","D5","D6","D7"]],[_t,["D8","D9","D10","D11","D12","D13"]],[De,["A0","A1","A2","A3","A4","A5"]]],ft=Object.freeze({...q});function $s(t){let e=new ee(Ds(t));[_e,ke,Ue].forEach(f=>new re(e,f));let s=new ce(e,Ve,lt),o=new oe(e,Ee),i=li.map(([f,w])=>[new ie(e,f),w]),a={};for(let[f,w]of i)w.forEach((P,k)=>a[P]=[f,k]);let n=null;o.onADCRead=f=>{let w=0;if(f.type===j.SingleEnded){let F=o.channelValues[f.channel]||0;w=n?n(f.channel,F):F}else f.type===j.Constant?w=f.voltage:f.type===j.Temperature&&(w=.378125);let P=Math.round(w*1e6)/1e6,k=Math.min(1023,Math.max(0,Math.floor(P/o.referenceVoltage*1024)));e.addClockEvent(()=>o.completeADCRead(k),o.sampleCycles)};let r=[],d=[],R=[],u=[],A=p();function p(){let f={};for(let[w,P]of i)P.forEach((k,F)=>f[k]=w.pinState(F));return f}for(let[f,w]of i)f.addListener(()=>{let P=null;for(let k=0;k<w.length;k++){let F=f.pinState(k);F!==A[w[k]]&&((P||(P={}))[w[k]]=F,A[w[k]]=F)}if(P)for(let k of d)k(P,A)});s.onByteTransmit=f=>R.forEach(w=>w(f));function E(f){let w=e.cycles+f;for(;e.cycles<w;){let P=Math.min(w,e.cycles+lt/1e3);for(;e.cycles<P;)ci(e),e.tick();u.length&&!s.rxBusy&&(s.writeByte(u[0]),u.shift());for(let k of r)k()}}return{correr:E,estados:p,get ciclos(){return e.cycles},alCambiarPines:f=>d.push(f),alByteSerial:f=>R.push(f),enviarSerial:f=>u.push(...new TextEncoder().encode(f)),ponerAnalogico:(f,w)=>o.channelValues[f]=Math.max(0,Math.min(5,w)),ponerLectorAnalogico:f=>n=f,ponerEntrada(f,w){let P=a[f];P&&P[0].setPin(P[1],!!w)},alCadaMs:f=>r.push(f)}}var fi=["a","b","c","d","e"],di=["f","g","h","i","j"],Ne={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},hi=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],vs={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Fe=t=>14.4+(t-1)*9.6,xi=t=>t>=2&&(t-1)%6!==0,We=new Map;function je(t="media"){if(We.has(t))return We.get(t);let e=vs[t]||vs.media,s=[];We.set(t,s);for(let o=1;o<=e.columnas;o++){for(let i of fi)s.push({nombre:i+o,x:Fe(o),y:Ne[i],tira:"arriba"+o});for(let i of di)s.push({nombre:i+o,x:Fe(o),y:Ne[i],tira:"abajo"+o});for(let[i]of hi)xi(o)&&s.push({nombre:i+o,x:Fe(o),y:Ne[i],tira:i})}return s}var Le=new Map;function _s(t="media"){if(Le.has(t))return Le.get(t);let e=new Map;Le.set(t,e);for(let s of je(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var Kt=3.779527559055118,ui={ancho:72.58*Kt,alto:53.34*Kt},pi=4*Kt,ks=5*Kt;var le=pi+4.6*Kt,fe=ui.ancho-.5-4.6*Kt,mi=60,gt=(t,e)=>({x:t,y:mi+e*ks}),rn={M1A:gt(le,0),M1B:gt(le,1),GND_IZQ:gt(le,2),M2A:gt(le,3),M2B:gt(le,4),M4A:gt(fe,0),M4B:gt(fe,1),GND_DER:gt(fe,2),M3A:gt(fe,3),M3B:gt(fe,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+ks,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var Ut={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},Us=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var gi=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Bt(t,{presionados:e=new Set,conduccion:s=!1}={}){let o=new Map,i=n=>{for(o.has(n)||o.set(n,n);o.get(n)!==n;)o.set(n,o.get(o.get(n))),n=o.get(n);return n},a=(n,r)=>o.set(i(n),i(r));for(let n of gi)n.forEach(r=>a("placa."+n[0],"placa."+r));for(let n of t.cables)a(n.de,n.a);if(t.protoboard){for(let n of _s(t.protoboard.tipo).values())n.forEach(r=>a("protoboard."+n[0],"protoboard."+r));for(let n of t.componentes)if(n.en)for(let[r,d]of Object.entries(n.en))a(n.id+"."+r,d)}for(let n of t.componentes)if(n.tipo==="shield_l293d"){for(let[r,d]of Us)a(n.id+"."+r,d);(!n.props||n.props.puentePWR!==!1)&&a(n.id+".EXT_POS","placa.VIN")}else n.tipo==="bateria_lipo"?(a(n.id+".BAL0",n.id+".NEG"),a(n.id+".BAL2",n.id+".POS")):n.tipo==="pulsador"?(a(n.id+".1i",n.id+".1d"),a(n.id+".2i",n.id+".2d"),e.has(n.id)&&a(n.id+".1i",n.id+".2i")):s&&n.tipo==="resistencia"?a(n.id+".1",n.id+".2"):s&&n.tipo==="potenciometro"&&(a(n.id+".GND",n.id+".SIG"),a(n.id+".SIG",n.id+".VCC"));return i}function Ge(t,e,s,o){e>=0&&(t[e][e]+=o),s>=0&&(t[s][s]+=o),e>=0&&s>=0&&(t[e][s]-=o,t[s][e]-=o)}function He(t,e,s){e>=0&&(t[e]+=s)}var Ot=(t,e)=>e>=0?t[e]:0;function de(t,e,s){return{a:t,b:e,g:1/s,sellar(o){Ge(o,this.a,this.b,this.g)},corriente(o){return(Ot(o,this.a)-Ot(o,this.b))*this.g}}}function Bs(t){return{nodo:t,v:0,g:0,sellar(e,s){Ge(e,this.nodo,-1,this.g),He(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Ot(e,this.nodo))*this.g}}}function Os(t,e){return{nodo:t,v:e,fila:-1,sellar(s,o){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,o[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function Vs(t,e,{Is:s,n:o}){let i=o*.025693,a=i*Math.log(i/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let d=Math.exp(this.vd/i),R=s*(d-1),u=s*d/i+1e-12,A=R-u*this.vd;Ge(n,this.a,this.k,u),He(r,this.a,-A),He(r,this.k,A)},actualizar(n){let r=Ot(n,this.a)-Ot(n,this.k),d=Math.abs(r-this.vd);return this.vd=Ci(r,this.vd,i,a),d},corriente(n){let r=Ot(n,this.a)-Ot(n,this.k);return s*Math.expm1(r/i)}}}function Ci(t,e,s,o){if(t>o&&Math.abs(t-e)>2*s){if(e>0){let i=1+(t-e)/s;return i>0?e+s*Math.log(i):o}return s*Math.log(t/s)}return t}function Ns(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let o=t.nodos+t.fuentes,i=t.elementos.filter(n=>n.noLineal),a=new Float64Array(o);for(let n=1;n<=e;n++){let r=Array.from({length:o},()=>new Float64Array(o)),d=new Float64Array(o);for(let u of t.elementos)u.sellar(r,d);for(let u=0;u<t.nodos;u++)r[u][u]+=1e-12;if(a=Si(r,d),!i.length)return{x:a,iteraciones:n,convergio:!0};let R=0;for(let u of i)R=Math.max(R,u.actualizar(a));if(R<s)return{x:a,iteraciones:n,convergio:!0}}return{x:a,iteraciones:e,convergio:!1}}function Si(t,e){let s=e.length;for(let i=0;i<s;i++){let a=i;for(let n=i+1;n<s;n++)Math.abs(t[n][i])>Math.abs(t[a][i])&&(a=n);if(Math.abs(t[a][i])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[i],t[a]]=[t[a],t[i]],[e[i],e[a]]=[e[a],e[i]];for(let n=i+1;n<s;n++){let r=t[n][i]/t[i][i];if(r){for(let d=i;d<s;d++)t[n][d]-=r*t[i][d];e[n]-=r*e[i]}}}let o=new Float64Array(s);for(let i=s-1;i>=0;i--){let a=e[i];for(let n=i+1;n<s;n++)a-=t[i][n]*o[n];o[i]=a/t[i][i]}return o}var Vt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},qe=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],Ai={A4:"SDA",A5:"SCL"},st={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},bi=.25,Fs={minimo:1};function Ii(t){let s=(st.vf[t]||st.vf.rojo)-st.iRef*st.rs;return{Is:st.iRef/Math.expm1(s/(st.n*.025693)),n:st.n}}var Ws={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function Ls(t,{quemados:e=new Set,presionados:s=new Set}={}){let o=Bt(t,{presionados:s}),i=Bt(t,{presionados:s,conduccion:!0}),a=o("placa.GND1"),n=new Map,r=0,d=m=>{let M=o(m);return M===a?-1:(n.has(M)||n.set(M,r++),n.get(M))},R=m=>o(m)===a?-1:n.get(o(m)),u=[],A=[],p=[],E=new Set(t.cables.flatMap(m=>[m.de,m.a])),f=[];if(t.protoboard){let m=new Set([...E].map(o));for(let M of t.componentes)for(let x of Object.keys(M.en||{}))m.add(o(M.id+"."+x));for(let M of je(t.protoboard.tipo)){let x="protoboard."+M.nombre;m.has(o(x))&&f.push(x)}}let w=new Map;for(let[m,M]of[["5V",5],["3V3",3.3]]){if(!E.has("placa."+m))continue;let x=d("placa."+m),I=x===-1?"GND":w.get(x);if(I){p.push({tipo:"cortocircuito",componente:"placa."+m,mensaje:`El pin ${m} est\\xE1 unido directo a ${I}: es un cortocircuito.`});continue}w.set(x,m);let c=Os(x,M);A.push(c),u.push(c)}let P={};for(let m of qe)!E.has("placa."+m)&&!E.has("placa."+Ai[m])||(P[m]=Bs(d("placa."+m)),u.push(P[m]));let k=[],F=[],It=[];for(let m of t.componentes)if(m.tipo==="resistencia"){let M=de(d(m.id+".1"),d(m.id+".2"),Number(m.props.ohmios)||1);k.push({id:m.id,ohmios:Number(m.props.ohmios)||1,el:M}),M.a!==M.b&&u.push(M)}else if(m.tipo==="led"){let M=d(m.id+".anodo"),x=d(m.id+".catodo"),I={id:m.id,a:M,k:x,quemado:e.has(m.id)};if(!I.quemado&&M!==x){let c=r++;I.rs=de(M,c,st.rs),I.diodo=Vs(c,x,Ii(m.props.color)),u.push(I.rs,I.diodo)}F.push(I)}else if(m.tipo==="potenciometro"){let M=Number(m.props.ohmios)||1e4,x=Math.max(0,Math.min(1,Number(m.props.posicion))),I=d(m.id+".GND"),c=d(m.id+".SIG"),y=d(m.id+".VCC"),b=de(I,c,Math.max(Fs.minimo,M*x)),B=de(c,y,Math.max(Fs.minimo,M*(1-x)));for(let W of[b,B])W.a!==W.b&&u.push(W);It.push({id:m.id,ohmios:M,posicion:x,bajo:b,alto:B})}A.forEach((m,M)=>m.fila=r+M);function nt(m){let M=new Set([i("placa.GND1")]);for(let x of["5V","3V3"])E.has("placa."+x)&&M.add(i("placa."+x));for(let x of qe){let I=m[x];(I===q.High||I===q.Low||I===q.InputPullUp)&&M.add(i("placa."+x))}return M}let et=new Set([...E,...f]);for(let m of t.componentes)for(let M of Ws[m.tipo]||[])et.add(m.id+"."+M);return{fallasFijas:p,flotantes(m){let M=nt(m),x=new Set;for(let I of qe)m[I]===q.Input&&!M.has(i("placa."+I))&&x.add(I);return x},refsAlAire(m){let M=nt(m),x=new Set;for(let I of et)M.has(i(I))||x.add(I);return x},ponerPines(m){for(let[M,x]of Object.entries(P)){let I=m[M];I===q.High?Object.assign(x,{v:Vt.voltios,g:1/Vt.rAlto}):I===q.Low?Object.assign(x,{v:0,g:1/Vt.rBajo}):I===q.InputPullUp?Object.assign(x,{v:Vt.voltios,g:1/Vt.rPullUp}):Object.assign(x,{v:0,g:0})}},resolver(){let m=Ns({nodos:r,fuentes:A.length,elementos:u}),M=c=>{let y=R(c);return y===void 0?null:y<0?0:m.x[y]},x={};for(let c of E)x[c]=M(c);for(let c of f)x[c]=M(c);for(let c of t.componentes)for(let y of Ws[c.tipo]||[])x[c.id+"."+y]=M(c.id+"."+y);let I=(c,y)=>c===null||y===null?null:c-y;return{convergio:m.convergio,iteraciones:m.iteraciones,voltajes:x,leds:F.map(c=>{let y=c.diodo?c.diodo.corriente(m.x):0;return{id:c.id,quemado:c.quemado,v:I(M(c.id+".anodo"),M(c.id+".catodo")),i:y,brillo:Math.max(0,Math.min(1,y*1e3/st.plenomA))}}),resistencias:k.map(c=>{let y=c.el.a===c.el.b?0:c.el.corriente(m.x);return{id:c.id,ohmios:c.ohmios,v:I(M(c.id+".1"),M(c.id+".2")),i:y,w:y*y*c.ohmios}}),pines:Object.entries(P).filter(([,c])=>c.g>0).map(([c,y])=>({pin:c,v:M("placa."+c),i:y.corriente(m.x)})),fuentes:A.map(c=>({pin:c.v===5?"5V":"3V3",i:c.corriente(m.x)})),potenciometros:It.map(c=>({id:c.id,ohmios:c.ohmios,posicion:c.posicion,v:I(M(c.id+".SIG"),M(c.id+".GND")),i:Math.abs(c.bajo.a!==c.bajo.b?c.bajo.corriente(m.x):c.alto.a!==c.alto.b?c.alto.corriente(m.x):0)}))}}}}function js(t,e){let s=i=>(Math.abs(i)*1e3).toFixed(0),o=[];if(e.danoComponentes){for(let i of t.leds)!i.quemado&&i.i*1e3>st.quemamA&&o.push({tipo:"led_quemado",componente:i.id,corriente_mA:+(i.i*1e3).toFixed(1),mensaje:`El LED ${i.id} se quem\\xF3: le pasaron ${s(i.i)} mA y aguanta unos ${st.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let i of t.resistencias)i.w>bi&&o.push({tipo:"resistencia_caliente",componente:i.id,potencia_W:+i.w.toFixed(2),mensaje:`La resistencia ${i.id} se calienta: disipa ${i.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let i of t.pines)if(Math.abs(i.i)*1e3>Vt.maxmA){let a=i.pin.startsWith("D")?"pin "+i.pin.slice(1):"pin "+i.pin;o.push({tipo:"corriente_pin",componente:"placa."+i.pin,corriente_mA:+(Math.abs(i.i)*1e3).toFixed(1),mensaje:`El ${a} entrega ${s(i.i)} mA y aguanta ${Vt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return o}var Ft={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Nt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function Ti(t,e="sg90"){let s=(Ft[e]||Ft.sg90).angulos,o=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,o))}function Hs(t){let e=Ft[t]||Ft.sg90,s=90,o=90,i=null,a=0,n=!1,r=0,d=0;return{pulso(R){R<Nt.pulsoValidoMin||R>Nt.pulsoValidoMax||i!==null&&Math.abs(R-i)<Nt.bandaMuerta||(i=R,o=Ti(R,t))},avanzar(R,u){if(!(u>0)){n=!1,a=0;return}let A=60/(e.seg60*1e3)*(u/Nt.voltiosRef),p=o-s,E=Math.abs(p)>.01;r=Math.min(1,Math.abs(p)/Nt.bandaGrados),E&&!n&&(a=Nt.arranqueMs,d=r),n=E,n&&(s+=Math.sign(p)*Math.min(Math.abs(p),A*R)),a=Math.max(0,a-R)},corriente(R){if(!(R>0))return 0;let{reposo:u,movimiento:A,arranque:p}=e.mA;return(a>0?u+(p-u)*d:n?u+(A-u)*r:u)/1e3*(R/Nt.voltiosRef)},estado:()=>({angulo:s,objetivo:o,pulso:i,moviendo:n,arrancando:a>0})}}var zt=9.6/2.54,Re=57.6,Gs=14.4,Cn={x:Gs,ancho:32.2*zt},wi={x:Gs+(32.2-22.2)/2*zt,ancho:22.2*zt,alto:11.8*zt},Sn={x:wi.x+5.9*zt,y:Re},Rn=13.5*zt,Ke=182.4;var An={GND:{x:Ke,y:Re-9.6,color:"#7a4a24"},VCC:{x:Ke,y:Re,color:"#d7263d"},SIG:{x:Ke,y:Re+9.6,color:"#f28c28"}};var Q={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function ze(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=Q.fusible,o=(8**2-t**2)*e,i=0,a=!1;return{avanzar(n,r){let d=n/1e3;!a&&r>t?i+=(r**2-t**2)/o*d:i=Math.max(0,i-d/s),i>=1&&(a=!0),a&&i===0&&(a=!1)},get abierto(){return a},get calor(){return i},reiniciar(){i=0,a=!1}}}var qs=(t,e=0)=>Math.max(0,(Q.voltios-Q.ohmios*t)/(1+Q.ohmios*e));var he=3.779527559055118,dt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Ae=dt.voltiosRef/(dt.mABloqueado/1e3),Ks=dt.rpmSinCarga*dt.reduccion*2*Math.PI/60,zs=dt.mASinCarga/1e3,Xt=(dt.voltiosRef-zs*Ae)/Ks,Mi=Xt*zs/Ks,yi=dt.tauMecanicoMs/1e3*Xt*Xt/Ae;function Xs(){let t=0,e=0,s=0;return{avanzar(o,i,{conectado:a=!0,frena:n=!1}={}){let r=o/1e3;a?e=(i-Xt*t)/Ae:e=n?-(Xt*t)/Ae:0;let d=Xt*e-Mi*t;t+=d/yi*r,s=(s+t/dt.reduccion*r*180/Math.PI)%360},estado(){let o=t*60/(2*Math.PI)/dt.reduccion;return{rpm:o,i:e,giro:s,velocidad:o/60*Math.PI*(dt.ruedaMM/10)}}}}var Tn=64.2*he,Pi=22.5*he,wn=40*he,Ei=11.2*he,Mn=dt.ruedaMM*he/2,yn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Ei,y0:132-Pi/2}};var Js=3.779527559055118,be={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Wt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},Qs=t=>(be[t]||be.nominal).voltios,Ys=t=>(be[t]||be.nominal).celdas,Zs=360;var Di=10,Je=10,$i=72*Js,vi=34*Js;var Xe=Di+$i+58,Ze=Je+vi-34,En={POS:{x:Zs-12,y:Je+30,color:"#d7263d"},NEG:{x:Zs-12,y:Je+39.6,color:"#2b2b2b"},BAL0:{x:Xe,y:Ze,color:"#2b2b2b"},BAL1:{x:Xe,y:Ze+9.6,color:"#e05a5a"},BAL2:{x:Xe,y:Ze+19.2,color:"#d7263d"}};var to={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var _i=9.6,ki=82,Ui=132,$n=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:ki+e*_i,y:Ui}]));var K={pinDatos:Ut.datos,pinReloj:Ut.reloj,pinCierre:Ut.cierre,pinHabilita:Ut.habilita,pwm:Ut.pwm,bits:Ut.bits,caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Bi=6.6,Oi=.06,so=4,eo=1-Math.exp(-1/so),Vi=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],ht=(t,e=1)=>t.toFixed(e).replace(".",",");function oo({activas:t,avisar:e}){let s=null,o=new Map,i=new Map,a=new Map,n=0,r=0,d=!1,R={},u=0,A={},p=0,E=0,f=0,w=0;function P(){for(let x of Object.values(K.pwm))R[x]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};u=0,A={}}P();function k(x,I){let c=(T,L)=>I(T)===I(L),y="placa.GND1",b=x.componentes.find(T=>T.tipo==="shield_l293d");s=b?{id:b.id,puente:!b.props||b.props.puentePWR!==!1}:null;let B=new Map;for(let T of x.componentes){if(T.tipo!=="bateria_lipo")continue;let L=T.props&&T.props.carga||"nominal",$=Qs(L),D=i.get(T.id),C=T.id+".POS",_=T.id+".NEG",O={carga:L,voc:$,celdas:Ys(L),v:D&&D.carga===L?D.v:$,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};L==="descargada"&&e({tipo:"bateria_baja",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 descargada: ${ht($)} V, ${ht($/Wt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${ht(Wt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),L==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:T.id,mensaje:`Las celdas de la bater\\xEDa ${T.id} est\\xE1n desbalanceadas: ${O.celdas.map(z=>ht(z,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let ct=z=>s&&c(z,s.id+".EXT_POS")||c(z,"placa.VIN")||c(z,"placa.5V");c(C,_)?e({tipo:"bateria_corto",componente:T.id,mensaje:`Los dos cables de la bater\\xEDa ${T.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):c(C,y)&&ct(_)?e({tipo:"bateria_invertida",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):c(_,y)&&(O.valida=!0,c(C,"placa.5V")&&(O.valida=!1,e({tipo:"bateria_en_5v",componente:T.id,mensaje:`La bater\\xEDa ${T.id} est\\xE1 en el pin 5V: sus ${ht($)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),O.motores=O.valida&&!!s&&c(C,s.id+".EXT_POS"),O.vin=O.valida&&c(C,"placa.VIN")),B.set(T.id,O)}i=B;let W=new Map;for(let T of x.componentes){if(T.tipo!=="probador_lipo")continue;let L=T.props&&typeof T.props.umbral=="number"?T.props.umbral:to.umbralV,$=null;for(let C of i.keys())c(T.id+".NEG",C+".BAL0")&&($=C);let D=["C1","C2","C3","C4","C5","C6","C7","C8"].map(C=>{if(!$)return null;for(let _ of[0,1,2])if(c(`${T.id}.${C}`,`${$}.BAL${_}`))return _;return null});W.set(T.id,{umbral:L,fuente:$,puntos:D})}a=W;let Y=T=>{if(s){for(let $ of[1,2,3,4])for(let D of["A","B"])if(c(T,`${s.id}.M${$}${D}`))return{tipo:"shield",n:$,s:D}}if(c(T,y))return{tipo:"gnd"};if(c(T,"placa.5V"))return{tipo:"5v"};for(let[$,D]of i)if(D.valida&&c(T,$+".POS"))return{tipo:"bateria",id:$};let L=Vi.find($=>c(T,"placa."+$));return L?{tipo:"pin",pin:L}:null},rt=new Map;for(let T of x.componentes){if(T.tipo!=="motor_tt")continue;let $=o.get(T.id)||{logico:Xs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};$.lado=T.props&&T.props.lado||"izquierdo",$.a=Y(T.id+".A"),$.b=Y(T.id+".B");let D=[$.a,$.b].filter(_=>_&&_.tipo==="shield");$.canal=D.length?"M"+D[0].n:null;let C=[$.a,$.b].find(_=>_&&_.tipo==="pin");C&&e({tipo:"motor_en_pin",componente:T.id,mensaje:`El motor ${T.id} est\\xE1 conectado al pin ${C.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),rt.set(T.id,$)}o=rt}function F(x,I,c){if(!s)return;let y=b=>I[b]===ft.High;K.pinReloj in x&&y(K.pinReloj)&&(n=(n<<1|(y(K.pinDatos)?1:0))&255),K.pinCierre in x&&y(K.pinCierre)&&(r=n),K.pinHabilita in x&&(d=I[K.pinHabilita]===ft.Low);for(let b of Object.values(K.pwm)){if(!(b in x))continue;let B=R[b],W=x[b]===ft.High;B.cambios=(B.cambios||0)+1,W&&!B.alto?Object.assign(B,{alto:!0,desde:c}):!W&&B.alto&&(B.acum+=c-B.desde,B.alto=!1)}}function It(){d=!1,P()}function nt(x,{v5:I,logica:c}){let y=x-u;for(let[D,C]of Object.entries(R)){C.alto&&(C.acum+=x-C.desde,C.desde=x);let _=y>0?Math.min(1,C.acum/y):0,O=A[D]||0;A[D]=(_===0||_===1)&&C.quieto>=so?_:O+eo*(_-O),C.quieto=C.cambios?0:(C.quieto||0)+1,C.cambios=0,C.acum=0}u=x,p=0,E=0;for(let D of i.values())D.motores&&(p=Math.max(p,D.v)),D.vin&&(E=Math.max(E,D.v));let b=E>=Bi,B=c||b,W=new Map,Y=(D,C)=>W.set(D,(W.get(D)||0)+C),rt=D=>{for(let[C,_]of i)if(_.motores)return Y(C,D)},T=0,L=D=>D?D.tipo==="shield"?!B||!d?null:{v:r>>K.bits[D.n][D.s]&1?p:0,d:A[K.pwm[D.n]]||0,shield:!0}:D.tipo==="gnd"?{v:0,d:1}:D.tipo==="5v"?{v:I,d:1,del5V:!0}:D.tipo==="bateria"?{v:(i.get(D.id)||{v:0}).v,d:1,bateria:D.id}:null:null,$=!1;for(let[D,C]of o){let _=L(C.a),O=L(C.b),ct=_&&O?Math.min(_.d,O.d):0;if(!ct)C.vAhora=0,C.logico.avanzar(1,0,{conectado:!1});else{let tt=_.v-O.v,jt=(_.shield?1:0)+(O.shield?1:0),ot=0;if(Math.abs(tt)>1e-9){let Ht=t.caidaL293D&&jt?jt/2*(K.caidaV+K.caidaPorA*Math.abs(C.iAntes)):0;ot=Math.sign(tt)*Math.max(0,Math.abs(tt)-Ht)*ct}C.vAhora=ot,C.logico.avanzar(1,ot,{conectado:!0}),jt===2&&(r>>K.bits[C.a.n][C.a.s]&1)!==(r>>K.bits[C.b.n][C.b.s]&1)&&p<1&&($=!0);let Jt=C.logico.estado().i,Tt=tt>=0?_:O,wt=Math.max(0,Jt*Math.sign(tt||1))*ct;Tt.shield?rt(wt):Tt.del5V?T+=wt:Tt.bateria&&Y(Tt.bateria,wt)}let z=C.logico.estado();C.iAntes=z.i,C.sumaI+=Math.abs(z.i),C.sumaV+=Math.abs(C.vAhora||0),C.ms++;let Z=C.a&&C.a.tipo==="shield"||C.b&&C.b.tipo==="shield";C.sobreMs=Z&&Math.abs(z.i)>K.maximoCanalA?C.sobreMs+1:0,C.sobreMs>K.avisoCanalMs&&e({tipo:"l293d_corriente",componente:D,mensaje:`El motor ${D} pide ${ht(Math.abs(z.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}$&&s&&e({tipo:"motores_sin_energia",componente:s.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[D,C]of i){if(!C.valida)continue;let _=(W.get(D)||0)+(C.vin&&b?Oi:0);C.v=Math.max(0,C.voc-Wt.ohmios*_),C.iAntes=_,C.sumaI+=_,C.ms++;let O=Math.min(...et(C));O<Wt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:D,mensaje:`La bater\\xEDa ${D} baj\\xF3 a ${ht(C.v,2)} V con los motores y una celda qued\\xF3 en ${ht(O,2)} V: menos de ${ht(Wt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return f+=p,w++,{i5V:T,porVin:b}}function et(x){let I=x.valida?x.iAntes:0;return x.celdas.map(c=>Math.max(0,c-Wt.ohmios/x.celdas.length*I))}function m(x,I,c){let y=I.fuente&&i.get(I.fuente);if(!y)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:c};let b=et(y),B=[0,b[0],b[0]+b[1]],W=[],Y=0;for(let $ of I.puntos){if($===null)break;W.push(B[$]-Y),Y=B[$]}let rt=W.length>0&&Y>=2.5,T=W.findIndex($=>$<I.umbral),L=rt&&I.umbral>0&&T>=0;return L&&e({tipo:"probador_alarma",componente:x,mensaje:`El probador ${x} pita: la celda ${T+1} est\\xE1 en ${ht(Math.max(0,W[T]),2)} V, por debajo de ${ht(I.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:rt,celdas:W.map($=>Math.max(0,$)),total:Y,alarma:L,umbral:I.umbral,ms:c}}function M(x=0){let I={},c={motores:[],baterias:[],shield:null,probadores:[]};for(let[y,b]of o){let B=b.logico.estado(),W={rpm:B.rpm,giro:B.giro,velocidad:B.velocidad,i:b.ms?b.sumaI/b.ms:Math.abs(B.i),voltios:b.ms?b.sumaV/b.ms:0};I[y]=W,c.motores.push({id:y,canal:b.canal,lado:b.lado,...W}),Object.assign(b,{sumaI:0,sumaV:0,ms:0})}for(let[y,b]of i){let B={voltios:b.valida?b.v:b.voc,celdas:et(b),i:b.ms?b.sumaI/b.ms:0,carga:b.carga,conectada:b.motores||b.vin};I[y]=B,c.baterias.push({id:y,...B}),Object.assign(b,{sumaI:0,ms:0})}if(s){let y=w?f/w:p;I[s.id]={motoresV:y},c.shield={id:s.id,motoresV:y,puente:s.puente,habilitada:d,salidas:r}}for(let[y,b]of a){let B=m(y,b,x);I[y]=B,c.probadores.push({id:y,...B})}return f=0,w=0,{piezas:I,lista:c}}return{armar:k,pinesCambiaron:F,reiniciarChip:It,cadaMs:nt,foto:M,get hay(){return!!s||o.size>0||i.size>0||a.size>0}}}var Ni=60,Ie=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],io=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Fi=3,Wi=1.5,Li=1/1e4,ao=60,ji=Math.cos(.35*Math.PI),Hi=.1*5/1024,Gi=.15,qi=100,no=50;function co({hex:t,circuito:e,activas:s={},semilla:o=Math.floor(Math.random()*2**32)}){let i=Xi(o),a=new Set,n=[],r={raiz:null,grupos:new Set},d=new Set,R=new Set,u=new Set,A={},p=new Map,E={},f=null,w=e,P=null,k=new Map,F=new Map,It={},nt=null,et=new Map,m=new Map,M=[],x=0,I=0,c={inicio:0,clave:""},y=null,b=null,B=-1/0,W={},Y=0,rt=0,T=[],L=new TextDecoder("utf-8"),$=new Set,D=new Set,C=[],_=[],O=new Map,ct=0,z=ze(),Z=!1,tt=null,jt=0,ot=Q.idealV,Jt=0,Tt=0,wt=0,Ht=0,Qt=[],Pt=oo({activas:s,avisar:l=>Dt(l)}),Te=0,Yt=!1,Ct=()=>(ct+f.ciclos)/lt*1e3,po=l=>Lt.reduce((h,S)=>h+l[S]*ro[S],0);function me(){f=$s(t);let l=f.estados();x=po(l),et.set(x,l),I=0,m=new Map,M=[],c={inicio:0,clave:x},y=null,f.alCambiarPines((h,S)=>{ss();let g=et.get(x);for(let v in h)x+=(h[v]-g[v])*ro[v];et.has(x)||et.set(x,{...S}),x===c.clave&&(y={tiempos:new Map(m),ciclo:f.ciclos}),B=f.ciclos;for(let v in h)W[v]=f.ciclos;Et(),O.size&&Co(h),Pt.pinesCambiaron(h,S,f.ciclos)}),f.alCadaMs(bo),f.alCadaMs(ns);for(let h of O.values())h.subida=null;Pt.reiniciarChip(),B=-1/0,W={},f.ponerLectorAnalogico(Io),It={},nt=null,f.alByteSerial(h=>{T.push(h),rt=Ct()+Ni})}function ss(){let l=f.ciclos;m.set(x,(m.get(x)||0)+(l-I)),I=l}function te(){P=Ls(w,{quemados:$,presionados:a}),k=new Map,F=new Map,go(),Pt.armar(w,Bt(w)),os()}function os(){if(!n.length){r={raiz:null,grupos:new Set};return}let l=Bt(w,{presionados:a,conduccion:!0});r={raiz:l,grupos:new Set(n.map(l))}}let is=l=>r.grupos.size>0&&r.grupos.has(r.raiz(l)),mo=()=>Math.sin(2*Math.PI*ao*(Ct()/1e3))>ji;function go(){let l=Bt(w),h=(g,v)=>l(g)===l(v),S=new Map;for(let g of w.componentes){if(g.tipo!=="servo")continue;let v=Ft[g.props&&g.props.modelo]?g.props.modelo:"sg90",J=O.get(g.id),xt=J&&J.modelo===v?J:{modelo:v,logico:Hs(v),subida:null,sumaA:0,picoA:0,msVentana:0};xt.senal=Lt.find(G=>h(g.id+".SIG","placa."+G))||null;let St=h(g.id+".GND","placa.GND1"),$t=Lt.find(G=>h(g.id+".VCC","placa."+G));xt.fuente=h(g.id+".VCC","placa.5V")?"5V":h(g.id+".VCC","placa.3V3")?"3V3":$t||null,xt.conectado=St&&(xt.fuente==="5V"||xt.fuente==="3V3"),$t&&St&&Dt({tipo:"servo_alimentacion",componente:g.id,mensaje:`El servo ${g.id} toma la corriente del pin ${$t.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ft[v].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),S.set(g.id,xt)}O=S}function Co(l){for(let h of O.values())!h.senal||!(h.senal in l)||(l[h.senal]===ft.High?h.subida=f.ciclos:h.subida!==null&&(h.conectado&&!Z&&h.logico.pulso((f.ciclos-h.subida)/lt*1e6),h.subida=null))}let as=l=>!l.conectado||Z?0:l.fuente==="5V"?ot:3.3;function ns(){Pt.hay&&({i5V:Te,porVin:Yt}=Pt.cadaMs(f.ciclos,{v5:ot,logica:!Z&&ot>Q.bodV}));for(let g of O.values())g.logico.avanzar(1,as(g));let l=Z?0:Q.placaA+jt+Te,h=0;for(let g of O.values())g.conectado&&g.fuente==="5V"&&(h+=g.logico.corriente(1));ot=Z?0:Yt?Q.idealV:s.limiteUSB?qs(l,h):Q.idealV;let S=l;for(let g of O.values()){let v=g.logico.corriente(as(g));g.sumaA+=v,g.picoA=Math.max(g.picoA,v),g.msVentana++,(g.fuente==="5V"||g.fuente==="3V3")&&(S+=v)}Yt&&(S=0),s.limiteUSB&&(z.avanzar(1,S),!Z&&!tt&&(ot<Q.bodV?tt={motivo:"caida",amperios:S,voltios:ot}:S>Q.limitePuertoA?tt={motivo:"puerto",amperios:S}:z.abierto&&(tt={motivo:"fusible",amperios:S}))),Tt+=S,wt=Math.max(wt,S),Ht++}function So(){let{motivo:l,amperios:h,voltios:S}=tt;tt=null,l==="caida"?Dt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),voltios:Math.round(S*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${S.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):l==="puerto"?Dt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${h.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(Q.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Dt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(h*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),Z=!0),Jt++,ct+=f.ciclos,me(),Et()}function Ro(l){let h=lt/1e3,S=l;for(;S>0&&Z;){let g=Math.min(S,h);ct+=g,S-=g,ns(),z.abierto||(Z=!1)}S>0&&f.correr(S)}function rs(){let l=Ct();Qt=Qt.filter(([S])=>l-S<1e3),Qt.push([l,wt]);let h={amperios:Ht?Tt/Ht:0,pico:Math.max(...Qt.map(([,S])=>S)),voltios:ot,fusible:Math.round(z.calor*100)/100,apagada:Z,reinicios:Jt};return Tt=0,wt=0,Ht=0,h}function cs(){let l={};for(let[h,S]of O){let g=S.logico.estado();l[h]={modelo:S.modelo,angulo:Math.round(g.angulo*10)/10,pulso:g.pulso===null?null:Math.round(g.pulso),senal:S.senal,fuente:S.fuente,moviendo:g.moviendo,i:S.msVentana?S.sumaA/S.msVentana:S.logico.corriente(S.voltios),pico:S.picoA},S.sumaA=0,S.picoA=0,S.msVentana=0}return l}function Ao(l,h,S){let g=F.get(l);if(g)return g;let v=P.flotantes(h),J=new Set;Ie.forEach((G,ut)=>{v.has(G[0])&&J.add(ut)});let xt=new Set,St=[];for(let G of io){let ut=h[G];if(ut!==ft.Input&&ut!==ft.InputPullUp)continue;if(v.has(G)){xt.add(G),St.push([G,"aire"]);continue}let Rt=S?S.voltajes["placa."+G]:null;typeof Rt=="number"?St.push([G,Rt>=Fi?!0:Rt<=Wi?!1:null]):St.push([G,ut===ft.InputPullUp])}let $t=Ie.map(G=>{for(let ut of G){let Rt=S?S.voltajes["placa."+ut]:null;if(typeof Rt=="number")return Rt}return null});return g={canales:J,alAire:xt,entradas:St,analogicos:$t,refsAlAire:P.refsAlAire(h)},F.set(l,g),g}function we(l,h){It[l]!==h&&(It[l]=h,f.ponerEntrada(l,h))}function Et(){if(!P||!f)return;let l=et.get(x)||f.estados(),h=fs(x),S=Ao(x,l,h);d=S.alAire;for(let[g,v]of S.entradas){if(v==="aire"){g in A||(A[g]=i()<.5),we(g,s.entradaFlotante?A[g]:!1);continue}let J=v===null?!!E[g]:v;E[g]=J,we(g,J)}R=S.canales,h&&S.analogicos!==nt&&(S.analogicos.forEach((g,v)=>{g!==null&&(!nt||nt[v]!==g)&&f.ponerAnalogico(v,g)}),nt=S.analogicos),u=S.refsAlAire}function bo(){if(!(!s.entradaFlotante||!d.size))for(let l of d){let h=is("placa."+l)?mo():i()<Li?!A[l]:A[l];h!==A[l]&&(A[l]=h,we(l,h))}}function Io(l,h){if(R.has(l)){if(!s.entradaFlotante)return 0;if(is("placa."+Ie[l][0]))return 2.5+2.5*Math.sin(2*Math.PI*ao*(Ct()/1e3));let S=p.has(l)?p.get(l):1+3*i(),g=Math.max(0,Math.min(5,S+ls()*Gi));return p.set(l,g),g}return s.ruidoADC?h+ls()*Hi:h}function ls(){return Math.sqrt(-2*Math.log(1-i()))*Math.cos(2*Math.PI*i())}function Dt(l){let h=l.tipo+"|"+l.componente;return D.has(h)?!1:(D.add(h),C.push(l),_.push(l),!0)}function fs(l){for(let h=0;h<4;h++){let S=k.get(l);if(S)return S;P.ponerPines(et.get(l));let g=null;try{g=P.resolver()}catch{g=null}if(Y++,!g||!g.convergio)return Dt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;k.set(l,g);let v=!1;for(let J of[...P.fallasFijas,...js(g,s)])Dt(J)&&J.tipo==="led_quemado"&&($.add(J.componente),v=!0);if(!v)return g;te()}return k.get(l)||null}function To(){if(Z)return wo();ss();let l=m;if(y&&y.ciclo>c.inicio){l=y.tiempos;let H=new Map;for(let[X,Mt]of m){let xs=Mt-(y.tiempos.get(X)||0);xs>0&&H.set(X,xs)}m=H,c={inicio:y.ciclo,clave:c.clave}}else m=new Map,c={inicio:f.ciclos,clave:x};y=null;let h=[...l].filter(([,H])=>H>0);h.length||(h=M.length?M:[[x,1]]),M=h;let S=h.reduce((H,[,X])=>H+X,0),g=[];for(let[H,X]of h){let Mt=fs(H);if(!Mt){g.length=0;break}g.push([Mt,X/S])}let v=g.length?zi(g):null,J=new Set(Lt.filter(H=>H in W&&f.ciclos-W[H]<no/1e3*lt));v&&(v.pwm=Ki(h,S,J)),Po(v),nt=null;let St=f.ciclos-B>no/1e3*lt?1:1-Math.exp(-(S/lt*1e3)/qi);b=v?Qe(v,b,St):null;let $t=f.estados(),G=T.length?L.decode(Uint8Array.from(T),{stream:!0}):"";T=[];let ut=cs(),Rt=rs(),hs=Pt.foto(Ct());if(jt=b?b.fuentes.reduce((H,X)=>H+Math.max(0,X.i),0):0,b){b.usb=Rt,b.servos=Object.entries(ut).map(([X,Mt])=>({id:X,...Mt}));let H=(b.fuentes.find(X=>X.pin==="5V")||{i:0}).i;b.consumo5V=H+b.servos.filter(X=>X.fuente==="5V").reduce((X,Mt)=>X+Mt.i,0),Object.assign(b,hs.lista,{porVin:Yt})}let Do=_;return _=[],{msSimulados:Ct(),servos:ut,piezas:hs.piezas,evaluaciones:Y,leds:Object.fromEntries((b?b.leds:[]).map(H=>[H.id,H.brillo])),quemados:[...$],voltajes:Mo(),entradas:yo(),placa:{led13:$t.D13===ft.High,ledTX:Ct()<rt},serial:G,fallas:Do,medicion:b,energia:Rt}}function wo(){let l=_;return _=[],{msSimulados:Ct(),evaluaciones:Y,servos:cs(),piezas:Pt.foto(Ct()).piezas,energia:rs(),leds:{},quemados:[...$],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:l,medicion:null}}function Mo(){if(!b)return{};if(!u.size)return b.voltajes;let l={...b.voltajes};for(let h of u)h in l&&(l[h]=null);return l}function yo(){let l={};for(let h of io)d.has(h)?l[h]={alto:!!s.entradaFlotante&&!!A[h],alAire:!0}:h in E&&(l[h]={alto:E[h],alAire:!1});return l}function Po(l=b){l&&Ie.forEach((h,S)=>{for(let g of h){let v=l.voltajes["placa."+g];if(typeof v=="number")return f.ponerAnalogico(S,v)}})}function Eo(){$.clear(),D.clear(),C.length=0,_=[],T=[],L=new TextDecoder("utf-8"),rt=0,ds(),me(),te(),Et()}function ds(){ct=0,Z=!1,tt=null,Qt=[],z.reiniciar(),ot=Q.idealV,Te=0,Yt=!1}return me(),te(),Et(),{get ciclos(){return ct+f.ciclos},avanzar(l){if(Z)return Ro(l);f.correr(l),tt&&So()},foto:To,ponerCircuito(l){w=l,te(),Et()},ponerMano(l){n=Array.isArray(l)?l.filter(h=>typeof h=="string"):[],os()},ponerPulsador(l,h){h?a.add(l):a.delete(l),te(),Et()},enviarSerial:l=>f.enviarSerial(String(l)),reiniciarChip(){ds(),me(),Et()},reiniciarTodo(){Jt=0,Eo()},fallas:()=>[...C]}}function Ki(t,e,s=new Set){let o={},i=new Set;for(let[r,d]of t)for(let R=0;R<Lt.length;R++){let u=Math.floor(r/4**R)%4===ft.High;o[R]=(o[R]||0)+(u?d:0),i.add(R)}let a=Lt,n={};for(let r of i){let d=o[r]/e;(d>0&&d<1||s.has(a[r]))&&(n[a[r]]=Math.round(d*1e3)/1e3)}return n}var Lt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],ro=Object.fromEntries(Lt.map((t,e)=>[t,4**e]));function zi(t){if(t.length===1)return t[0][0];let e=t[0][0],s=n=>n.reduce((r,[,d])=>r+d,0),o=n=>{let r=0;for(let[d,R]of t){let u=n(d);if(u==null)return null;r+=R*u}return r},i=(n,r,d)=>[...new Set(t.flatMap(([u])=>u[n].map(A=>A[r])))].map(u=>{let A={[r]:u},p=t.filter(([f])=>f[n].some(w=>w[r]===u)),E=s(p);for(let f of d)f==="i"?A.i=t.reduce((w,[P,k])=>w+k*((P[n].find(F=>F[r]===u)||{i:0}).i||0),0):A[f]=E?p.reduce((w,[P,k])=>w+k*(P[n].find(F=>F[r]===u)[f]||0),0)/E:null;return A}),a={};for(let n of Object.keys(e.voltajes))a[n]=o(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:a,leds:e.leds.map((n,r)=>{let d=o(R=>R.leds[r]?R.leds[r].i:0);return{id:n.id,quemado:t.some(([R])=>R.leds[r]&&R.leds[r].quemado),v:o(R=>R.leds[r]?R.leds[r].v:null),i:d,brillo:Math.max(0,Math.min(1,d*1e3/st.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:o(d=>d.resistencias[r].v),i:o(d=>d.resistencias[r].i),w:o(d=>d.resistencias[r].w)})),pines:i("pines","pin",["v","i"]),fuentes:i("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:o(d=>d.potenciometros[r].v),i:o(d=>d.potenciometros[r].i)}))}}function Qe(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let o=a=>a&&typeof a=="object"?a.id||a.pin:void 0,i=new Map((Array.isArray(e)?e:[]).map(a=>[o(a),a]));return t.map((a,n)=>Qe(a,o(a)!==void 0?i.get(o(a)):(e||[])[n],s))}if(t&&typeof t=="object"){let o={};for(let i of Object.keys(t))o[i]=Qe(t[i],e&&typeof e=="object"?e[i]:void 0,s);return o}return t}function Xi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Zi=16,Ji=8,Qi=50,Yi=500,xe=lt/1e3,at=null,ue=!1,lo=0,yt=0,Ye=0,fo=0,es=0,ts=!1,Zt=[],ho=new MessageChannel;ho.port1.onmessage=xo;function xo(){ts=!1,ea()}function uo(t){ts||(ts=!0,t>0?setTimeout(xo,t):ho.port2.postMessage(null))}function ta(t){for(;Zt.length&&t-Zt[0][0]>Yi;)Zt.shift();let e=0,s=0;for(let[,o,i]of Zt)e+=o,s+=i;return e>0?Math.min(1,s/(e*xe)):1}function pe(t=performance.now()){fo=t;let e=at.foto();self.postMessage({tipo:"foto",corrida:lo,...e,velocidad:ta(t),msReales:es})}function ea(){if(!ue||!at)return;let t=performance.now(),e=Math.max(0,t-Ye);Ye=t,es+=e,yt=Math.min(yt+e*xe,Qi*xe);let s=performance.now(),o=0;for(;yt>=1&&performance.now()-s<Ji;){let i=at.ciclos;at.avanzar(Math.min(Math.floor(yt),xe));let a=at.ciclos-i;yt-=a,o+=a}Zt.push([t,e,o]),t-fo>=Zi&&pe(t),uo(yt>=xe?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(lo=e.corrida),e.tipo){case"crear":at=co({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(at.reiniciarTodo(),es=0),ue=!0,yt=0,Ye=performance.now(),Zt.length=0,pe(),uo(0);break;case"pausar":ue=!1;break;case"reiniciar":at.reiniciarChip(),yt=0,pe();break;case"detener":ue=!1;break;case"circuito":at.ponerCircuito(e.circuito),e.mostrar&&pe();break;case"serial":at.enviarSerial(e.texto);break;case"pulsador":at.ponerPulsador(e.id,e.presionado),ue||pe();break;case"mano":at.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function vr(t={}){let{lienzo:e,hex:o}=t,s=t.placa||"uno";if(s!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");Cr(o);let i=t.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(tc.map(E=>[E,i==="realista"]));Object.assign(c,t.noIdealidades||{});let n=typeof t.alEvento=="function"?t.alEvento:null,f={serial:[],falla:[],estado:[]},d="detenido",u=!0,g=0,b=null,S=0,_={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},B=null,W=0,N=[],V=ec(at);V.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:c});function at(E){if(!u)return;if(E.tipo==="error")return console.error("TecnoCircuito:",E.mensaje);if(E.tipo!=="foto"||E.corrida!==g||d==="detenido")return;Object.assign(_,{msSimulados:E.msSimulados,msReales:E.msReales,velocidad:E.velocidad,evaluaciones:E.evaluaciones}),B=E.medicion?{...E.medicion,voltajes:E.voltajes,entradas:E.entradas}:null;for(let rt of E.fallas){N.push(rt),f.falla.forEach(k=>wt(k,{tipo:rt.tipo,componente:rt.componente,mensaje:rt.mensaje}));let{mensaje:m,...P}=rt;ht("falla",P)}let X=E.energia?E.energia.reinicios:0;X>W&&ht("reinicio_placa",{motivo:"energia_usb",nuevos:X-W,total:X}),W=X,E.serial&&f.serial.forEach(rt=>wt(rt,E.serial)),b=E,S||(S=requestAnimationFrame(U))}function U(){if(S=0,d==="detenido"||!b)return e._mostrar({simulando:d!=="detenido"});e._mostrar({simulando:!0,leds:b.leds,quemados:b.quemados,voltajes:b.voltajes,servos:b.servos||{},piezas:b.piezas||{},placa:{ledPower:b.placa.encendida!==!1,led13:b.placa.led13,ledTX:b.placa.ledTX}})}function wt(E,X){try{E(X)}catch(rt){console.error(rt)}}function ht(E,X){n&&wt(n,{t:Date.now(),origen:"simulador",tipo:E,datos:X})}function ut(E){d=E,f.estado.forEach(X=>wt(X,E))}return typeof e._alAcercar=="function"&&e._alAcercar(E=>{u&&V.enviar({tipo:"mano",refs:E})}),typeof e._alPulsar=="function"&&e._alPulsar((E,X)=>{u&&V.enviar({tipo:"pulsador",id:E,presionado:X})}),e.alCambiar(E=>{u&&V.enviar({tipo:"circuito",circuito:E,mostrar:d!=="detenido",corrida:g})}),{iniciar(){if(!u||d==="corriendo")return;let E=d==="detenido";g++,E&&(N.length=0,B=null,b=null,W=0,Object.assign(_,{msSimulados:0,msReales:0,velocidad:1}),ht("simulacion_iniciada",{placa:s,modo:i})),ut("corriendo"),V.enviar({tipo:"iniciar",nuevo:E,corrida:g})},pausar(){d==="corriendo"&&(g++,V.enviar({tipo:"pausar",corrida:g}),ut("pausado"))},reiniciar(){!u||d==="detenido"||(g++,_.msSimulados=0,V.enviar({tipo:"reiniciar",corrida:g}),V.enviar({tipo:"iniciar",nuevo:!1,corrida:g}),W=0,ht("reinicio_placa",{motivo:"boton"}),ut("reiniciado"),ut("corriendo"))},detener(){d!=="detenido"&&(g++,V.enviar({tipo:"detener",corrida:g}),ht("simulacion_detenida",{ms_simulados:Math.round(_.msSimulados)}),ut("detenido"),B=null,U())},serialEnviar(E){d!=="detenido"&&V.enviar({tipo:"serial",texto:String(E)})},alSerial:E=>typeof E=="function"&&f.serial.push(E),alFalla:E=>typeof E=="function"&&f.falla.push(E),alEstado:E=>typeof E=="function"&&f.estado.push(E),medidas:()=>({..._,estado:d,hilo:V.hilo()}),destruir(){u&&(this.detener(),u=!1,cancelAnimationFrame(S),V.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>d==="detenido"||!B?null:{...B,fallas:[...N],modo:i,activas:c},_mediciones(){return this.mediciones()}}}function ec(t){let e=null,o="worker",s=!1,i=[],c=f=>{if(f&&f.tipo==="listo"){s=!0,i.length=0;return}t(f)};function n(){o="pagina",e=oc(c),i.splice(0).forEach(f=>e.postMessage(f))}try{if(!ds||typeof Worker!="function")throw new Error("sin Worker");let f=URL.createObjectURL(new Blob([ds],{type:"text/javascript"})),d=new Worker(f);d.onmessage=u=>{u.data&&u.data.tipo==="listo"&&URL.revokeObjectURL(f),c(u.data)},d.onerror=u=>{if(s)return console.error("TecnoCircuito:",u.message);u.preventDefault(),d.terminate(),n()},e=d}catch{n()}return{enviar(f){!s&&o==="worker"&&i.push(f),e.postMessage(f)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function oc(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",ds)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var Be=(t,e)=>t.toFixed(e).replace(".",","),Vt=t=>t==null?"al aire":Be(t,2)+" V",Nt=t=>Be(t*1e3,Math.abs(t)<.01?2:1)+" mA",Sr=(t,e)=>(t>=1e3?Be(t/1e3,e)+" k":t+" ")+"\u03A9",wr=t=>"Pin "+t.replace(/^D/,"");function $r(t){if(!t||!t.leds)return[];let e=(d,u,g,b)=>({pieza:d,voltaje:u||"",corriente:g||"",detalle:b||""}),o=d=>{let u=t.entradas&&t.entradas[d];return u?u.alAire?`al aire: lee ${u.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:u.alto?"lee ALTO":"lee BAJO":""},s=new Set(t.pines.map(d=>d.pin)),i=t.servos||[],c=d=>i.find(u=>u.senal===d&&u.pulso),n=d=>{let u=c(d.pin);if(u)return`se\xF1al de servo: pulso de ${u.pulso} \xB5s`;let g=t.pwm&&t.pwm[d.pin];return g>.005&&g<.995?`PWM ${Math.round(g*100)} %`:o(d.pin)},f=t.usb;return[...t.pines.map(d=>e(wr(d.pin),Vt(d.v),Nt(d.i),n(d))),...Object.keys(t.entradas||{}).filter(d=>!s.has(d)&&"placa."+d in t.voltajes).map(d=>e(wr(d)+" (entrada)",Vt(t.voltajes["placa."+d]),"",o(d))),...(t.potenciometros||[]).map(d=>e(`${d.id} (${Sr(d.ohmios,0)})`,Vt(d.v),Nt(d.i),`perilla ${Math.round(d.posicion*100)} %`)),...t.resistencias.map(d=>e(`${d.id} (${Sr(d.ohmios,1)})`,Vt(d.v),Nt(d.i),Be(d.w*1e3,1)+" mW")),...t.leds.map(d=>e(d.id,Vt(d.v),Nt(d.i),d.quemado?"quemado":`brillo ${Math.round(d.brillo*100)} %`)),...i.map(d=>e(`${d.id} (${d.modelo.toUpperCase()})`,"",Nt(d.i),d.fuente?d.senal?`${Math.round(d.angulo)}\xB0${d.moviendo?", movi\xE9ndose":""}${d.pulso?` \xB7 pulso ${d.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,Vt(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(d=>{let u=Math.abs(d.velocidad),g=Math.sign(d.velocidad)*(d.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${d.id} (${d.canal||"sin shield"})`,Vt(d.voltios),Nt(d.i),Math.abs(d.rpm)<1?"quieto":`${Math.round(Math.abs(d.rpm))} RPM \xB7 ${g} ${Math.round(u)} cm/s`)}),...(t.baterias||[]).map(d=>{let u=d.celdas||[d.voltios/2,d.voltios/2];return e(`${d.id} (LiPo 2S)`,Vt(d.voltios),d.conectada?Nt(d.i):"",`celdas ${u.map(g=>Be(g,2)).join(" y ")} V${Math.min(...u)<3.3?" \xB7 c\xE1rgala":""}${d.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(d=>e(`${d.id} (probador)`,d.encendido?Vt(d.total):"","",d.encendido?`${d.celdas.length}S \xB7 ${d.celdas.map((u,g)=>`${g+1}: ${Be(u,2)} V`).join(" \xB7 ")}${d.alarma?" \xB7 \xA1pita!":""}`:"apagado: con\xE9ctalo al cable de balance")),...i.length?[e("5V de la placa (USB)","",Nt(t.consumo5V),"el USB da hasta 500 mA")]:[],...f&&(i.length||f.reinicios||f.pico>.2)?[e("USB (placa y circuito)",Vt(f.voltios),Nt(f.amperios),`pico ${Nt(f.pico)} \xB7 fusible ${Math.round(f.fusible*100)} %${f.reinicios?` \xB7 ${f.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(Ie)),crearLienzo:br,crearSimulador:vr,filasDeMediciones:$r});})();
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
