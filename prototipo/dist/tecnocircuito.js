(()=>{var To=globalThis,Mo=To.ShadowRoot&&(To.ShadyCSS===void 0||To.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ca=Symbol(),zs=new WeakMap,He=class{constructor(e,o,s){if(this._$cssResult$=!0,s!==ca)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Mo&&e===void 0){let s=o!==void 0&&o.length===1;s&&(e=zs.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&zs.set(o,e))}return e}toString(){return this.cssText}},Hs=t=>new He(typeof t=="string"?t:t+"",void 0,ca),Rt=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((s,i,c)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[c+1],t[0]);return new He(o,t,ca)},Gs=(t,e)=>{if(Mo)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let s=document.createElement("style"),i=To.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=o.cssText,t.appendChild(s)}},la=Mo?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let s of e.cssRules)o+=s.cssText;return Hs(o)})(t):t;var{is:Wr,defineProperty:Fr,getOwnPropertyDescriptor:zr,getOwnPropertyNames:Hr,getOwnPropertySymbols:Gr,getPrototypeOf:qr}=Object,Io=globalThis,qs=Io.trustedTypes,Xr=qs?qs.emptyScript:"",Kr=Io.reactiveElementPolyfillSupport,Ge=(t,e)=>t,qe={toAttribute(t,e){switch(e){case Boolean:t=t?Xr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Do=(t,e)=>!Wr(t,e),Xs={attribute:!0,type:String,converter:qe,reflect:!1,useDefault:!1,hasChanged:Do};Symbol.metadata??=Symbol("metadata"),Io.litPropertyMetadata??=new WeakMap;var Lt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Xs){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,o);i!==void 0&&Fr(this.prototype,e,i)}}static getPropertyDescriptor(e,o,s){let{get:i,set:c}=zr(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){let p=i?.call(this);c?.call(this,n),this.requestUpdate(e,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xs}static _$Ei(){if(this.hasOwnProperty(Ge("elementProperties")))return;let e=qr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ge("properties"))){let o=this.properties,s=[...Hr(o),...Gr(o)];for(let i of s)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[s,i]of o)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[o,s]of this.elementProperties){let i=this._$Eu(o,s);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)o.unshift(la(i))}else e!==void 0&&o.push(la(e));return o}static _$Eu(e,o){let s=o.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let s of o.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Gs(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,s){this._$AK(e,s)}_$ET(e,o){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let c=(s.converter?.toAttribute!==void 0?s.converter:qe).toAttribute(o,s.type);this._$Em=e,c==null?this.removeAttribute(i):this.setAttribute(i,c),this._$Em=null}}_$AK(e,o){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let c=s.getPropertyOptions(i),n=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:qe;this._$Em=i;let p=n.fromAttribute(o,c.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(e,o,s,i=!1,c){if(e!==void 0){let n=this.constructor;if(i===!1&&(c=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??Do)(c,o)||s.useDefault&&s.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,o,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:s,reflect:i,wrapped:c},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),c!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,c]of this._$Ep)this[i]=c;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,c]of s){let{wrapped:n}=c,p=this[i];n!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,c,p)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(o)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Lt.elementStyles=[],Lt.shadowRootOptions={mode:"open"},Lt[Ge("elementProperties")]=new Map,Lt[Ge("finalized")]=new Map,Kr?.({ReactiveElement:Lt}),(Io.reactiveElementVersions??=[]).push("2.1.2");var xa=globalThis,Ks=t=>t,ko=xa.trustedTypes,Ys=ko?ko.createPolicy("lit-html",{createHTML:t=>t}):void 0,oi="$lit$",Xt=`lit$${Math.random().toFixed(9).slice(2)}$`,ai="?"+Xt,Yr=`<${ai}>`,le=document,Ke=()=>le.createComment(""),Ye=t=>t===null||typeof t!="object"&&typeof t!="function",ga=Array.isArray,Jr=t=>ga(t)||typeof t?.[Symbol.iterator]=="function",da=`[ 	
\f\r]`,Xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Js=/-->/g,Zs=/>/g,ne=RegExp(`>|${da}(?:([^\\s"'>=/]+)(${da}*=${da}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qs=/'/g,ti=/"/g,si=/^(?:script|style|textarea|title)$/i,ba=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),gt=ba(1),Wt=ba(2),nc=ba(3),jt=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),ei=new WeakMap,ce=le.createTreeWalker(le,129);function ii(t,e){if(!ga(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ys!==void 0?Ys.createHTML(e):e}var Zr=(t,e)=>{let o=t.length-1,s=[],i,c=e===2?"<svg>":e===3?"<math>":"",n=Xe;for(let p=0;p<o;p++){let d=t[p],u,g,b=-1,$=0;for(;$<d.length&&(n.lastIndex=$,g=n.exec(d),g!==null);)$=n.lastIndex,n===Xe?g[1]==="!--"?n=Js:g[1]!==void 0?n=Zs:g[2]!==void 0?(si.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=ne):g[3]!==void 0&&(n=ne):n===ne?g[0]===">"?(n=i??Xe,b=-1):g[1]===void 0?b=-2:(b=n.lastIndex-g[2].length,u=g[1],n=g[3]===void 0?ne:g[3]==='"'?ti:Qs):n===ti||n===Qs?n=ne:n===Js||n===Zs?n=Xe:(n=ne,i=void 0);let _=n===ne&&t[p+1].startsWith("/>")?" ":"";c+=n===Xe?d+Yr:b>=0?(s.push(u),d.slice(0,b)+oi+d.slice(b)+Xt+_):d+Xt+(b===-2?p:_)}return[ii(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Je=class t{constructor({strings:e,_$litType$:o},s){let i;this.parts=[];let c=0,n=0,p=e.length-1,d=this.parts,[u,g]=Zr(e,o);if(this.el=t.createElement(u,s),ce.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(i=ce.nextNode())!==null&&d.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let b of i.getAttributeNames())if(b.endsWith(oi)){let $=g[n++],_=i.getAttribute(b).split(Xt),k=/([.?@])?(.*)/.exec($);d.push({type:1,index:c,name:k[2],strings:_,ctor:k[1]==="."?fa:k[1]==="?"?ha:k[1]==="@"?ua:we}),i.removeAttribute(b)}else b.startsWith(Xt)&&(d.push({type:6,index:c}),i.removeAttribute(b));if(si.test(i.tagName)){let b=i.textContent.split(Xt),$=b.length-1;if($>0){i.textContent=ko?ko.emptyScript:"";for(let _=0;_<$;_++)i.append(b[_],Ke()),ce.nextNode(),d.push({type:2,index:++c});i.append(b[$],Ke())}}}else if(i.nodeType===8)if(i.data===ai)d.push({type:2,index:c});else{let b=-1;for(;(b=i.data.indexOf(Xt,b+1))!==-1;)d.push({type:7,index:c}),b+=Xt.length-1}c++}}static createElement(e,o){let s=le.createElement("template");return s.innerHTML=e,s}};function Se(t,e,o=t,s){if(e===jt)return e;let i=s!==void 0?o._$Co?.[s]:o._$Cl,c=Ye(e)?void 0:e._$litDirective$;return i?.constructor!==c&&(i?._$AO?.(!1),c===void 0?i=void 0:(i=new c(t),i._$AT(t,o,s)),s!==void 0?(o._$Co??=[])[s]=i:o._$Cl=i),i!==void 0&&(e=Se(t,i._$AS(t,e.values),i,s)),e}var pa=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:s}=this._$AD,i=(e?.creationScope??le).importNode(o,!0);ce.currentNode=i;let c=ce.nextNode(),n=0,p=0,d=s[0];for(;d!==void 0;){if(n===d.index){let u;d.type===2?u=new Ze(c,c.nextSibling,this,e):d.type===1?u=new d.ctor(c,d.name,d.strings,this,e):d.type===6&&(u=new ma(c,this,e)),this._$AV.push(u),d=s[++p]}n!==d?.index&&(c=ce.nextNode(),n++)}return ce.currentNode=le,i}p(e){let o=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,o),o+=s.strings.length-2):s._$AI(e[o])),o++}},Ze=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,s,i){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Se(this,e,o),Ye(e)?e===Z||e==null||e===""?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==jt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&Ye(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Je.createElement(ii(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(o);else{let c=new pa(i,this),n=c.u(this.options);c.p(o),this.T(n),this._$AH=c}}_$AC(e){let o=ei.get(e.strings);return o===void 0&&ei.set(e.strings,o=new Je(e)),o}k(e){ga(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,s,i=0;for(let c of e)i===o.length?o.push(s=new t(this.O(Ke()),this.O(Ke()),this,this.options)):s=o[i],s._$AI(c),i++;i<o.length&&(this._$AR(s&&s._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let s=Ks(e).nextSibling;Ks(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},we=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,s,i,c){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=c,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Z}_$AI(e,o=this,s,i){let c=this.strings,n=!1;if(c===void 0)e=Se(this,e,o,0),n=!Ye(e)||e!==this._$AH&&e!==jt,n&&(this._$AH=e);else{let p=e,d,u;for(e=c[0],d=0;d<c.length-1;d++)u=Se(this,p[s+d],o,d),u===jt&&(u=this._$AH[d]),n||=!Ye(u)||u!==this._$AH[d],u===Z?e=Z:e!==Z&&(e+=(u??"")+c[d+1]),this._$AH[d]=u}n&&!i&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},fa=class extends we{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}},ha=class extends we{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}},ua=class extends we{constructor(e,o,s,i,c){super(e,o,s,i,c),this.type=5}_$AI(e,o=this){if((e=Se(this,e,o,0)??Z)===jt)return;let s=this._$AH,i=e===Z&&s!==Z||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,c=e!==Z&&(s===Z||i);i&&this.element.removeEventListener(this.name,this,s),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ma=class{constructor(e,o,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Se(this,e)}};var Qr=xa.litHtmlPolyfillSupport;Qr?.(Je,Ze),(xa.litHtmlVersions??=[]).push("3.3.3");var ri=(t,e,o)=>{let s=o?.renderBefore??e,i=s._$litPart$;if(i===void 0){let c=o?.renderBefore??null;s._$litPart$=i=new Ze(e.insertBefore(Ke(),c),c,void 0,o??{})}return i._$AI(t),i};var ya=globalThis,ot=class extends Lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ri(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return jt}};ot._$litElement$=!0,ot.finalized=!0,ya.litElementHydrateSupport?.({LitElement:ot});var tn=ya.litElementPolyfillSupport;tn?.({LitElement:ot});(ya.litElementVersions??=[]).push("4.2.2");var Mt=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var en={attribute:!0,type:String,converter:qe,reflect:!1,hasChanged:Do},on=(t=en,e,o)=>{let{kind:s,metadata:i}=o,c=globalThis.litPropertyMetadata.get(i);if(c===void 0&&globalThis.litPropertyMetadata.set(i,c=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),s==="accessor"){let{name:n}=o;return{set(p){let d=e.get.call(this);e.set.call(this,p),this.requestUpdate(n,d,t,!0,p)},init(p){return p!==void 0&&this.C(n,void 0,t,p),p}}}if(s==="setter"){let{name:n}=o;return function(p){let d=this[n];e.call(this,p),this.requestUpdate(n,d,t,!0,p)}}throw Error("Unsupported decorator location: "+s)};function N(t){return(e,o)=>typeof o=="object"?on(t,e,o):((s,i,c)=>{let n=i.hasOwnProperty(c);return i.constructor.createProperty(c,s),n?Object.getOwnPropertyDescriptor(i,c):void 0})(t,e,o)}var de=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function ni(t,e){return(o,s,i)=>{let c=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:p}=typeof s=="object"?o:i??(()=>{let d=Symbol();return{get(){return this[d]},set(u){this[d]=u}}})();return de(o,s,{get(){let d=n.call(this);return d===void 0&&(d=c(this),(d!==null||this.hasUpdated)&&p.call(this,d)),d}})}return de(o,s,{get(){return c(this)}})}}var ci=Wt`
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
`;var At=t=>({type:"analog",channel:t}),Qe=(t,e=0)=>({type:"i2c",signal:t,bus:e}),to=(t,e=0)=>({type:"spi",signal:t,bus:e}),Ca=(t,e=0)=>({type:"usart",signal:t,bus:e});var $e=[" ","Spacebar"];function an(){return typeof navigator=="object"?navigator.userAgent:""}function sn(){return an().indexOf("Macintosh")>=0}function li(t){return sn()?t.metaKey:t.ctrlKey}var pe=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Kt=class extends ot{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[At(5),Qe("SCL")]},{name:"A4.2",x:97,y:9,signals:[At(4),Qe("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[to("SCK")]},{name:"12",x:134.5,y:9,signals:[to("MISO")]},{name:"11",x:144,y:9,signals:[to("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[to("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[Ca("TX")]},{name:"0",x:255.5,y:9,signals:[Ca("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[At(0)]},{name:"A1",x:217.5,y:191.5,signals:[At(1)]},{name:"A2",x:227,y:191.5,signals:[At(2)]},{name:"A3",x:236.5,y:191.5,signals:[At(3)]},{name:"A4",x:246,y:191.5,signals:[At(4),Qe("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[At(5),Qe("SCL")]}]}static get styles(){return Rt`
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};pe([N()],Kt.prototype,"led13",void 0);pe([N()],Kt.prototype,"ledRX",void 0);pe([N()],Kt.prototype,"ledTX",void 0);pe([N()],Kt.prototype,"ledPower",void 0);pe([N()],Kt.prototype,"resetPressed",void 0);pe([ni("#reset-button")],Kt.prototype,"resetButton",void 0);Kt=pe([Mt("wokwi-arduino-uno")],Kt);var di=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},va={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},Sa=class extends ot{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return Rt`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,s=Math.round(e/10**o);return e===0?[0,0]:[Math.round(s%100),o]}render(){let{value:e}=this,o=parseFloat(e),[s,i]=this.breakValue(o),c=va[Math.floor(s/10)],n=va[s%10],p=va[i];return gt`
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
    `}};di([N()],Sa.prototype,"value",void 0);Sa=di([Mt("wokwi-resistor")],Sa);var fe=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},rn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},Yt=class extends ot{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return Rt`
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
    `}};fe([N()],Yt.prototype,"value",void 0);fe([N()],Yt.prototype,"brightness",void 0);fe([N()],Yt.prototype,"color",void 0);fe([N()],Yt.prototype,"lightColor",void 0);fe([N()],Yt.prototype,"label",void 0);fe([N({type:Boolean})],Yt.prototype,"flip",void 0);Yt=fe([Mt("wokwi-led")],Yt);var pi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=t=>(...e)=>({_$litDirective$:t,values:e}),Oo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,s){this._$Ct=e,this._$AM=o,this._$Ci=s}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var hi="important",nn=" !"+hi,ui=fi(class extends Oo{constructor(t){if(super(t),t.type!==pi.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let s=t[o];return s==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let s of this.ft)e[s]==null&&(this.ft.delete(s),s.includes("-")?o.removeProperty(s):o[s]=null);for(let s in e){let i=e[s];if(i!=null){this.ft.add(s);let c=typeof i=="string"&&i.endsWith(nn);s.includes("-")||c?o.setProperty(s,c?i.slice(0,-11):i,c?hi:""):o[s]=i}}return jt}});var Bo=(t,e,o)=>{let s=Math.min(o,e);return Math.max(s,t)};function mi(t,e){let o=e.transformPoint({x:t.left,y:t.top}),s=e.transformPoint({x:t.right,y:t.top}),i=e.transformPoint({x:t.left,y:t.bottom}),c=e.transformPoint({x:t.right,y:t.bottom}),n=Math.min(o.x,s.x,i.x,c.x),p=Math.min(o.y,s.y,i.y,c.y),d=Math.max(o.x,s.x,i.x,c.x),u=Math.max(o.y,s.y,i.y,c.y);return new DOMRect(n,p,d-n,u-p)}function xi(t,e,o){let{userAgent:s}=navigator;if(s.indexOf("Epiphany")>=0||s.indexOf("Safari")>=0){let c=t.getCTM(),n=e?.getCTM(),p=e?.getBoundingClientRect(),d=e?.ownerSVGElement?.getBoundingClientRect();if(!p||!d||!n||!c)return null;let u=d.x+d.width/2,g=d.y+d.height/2,b=u-(p.x+p.width/2),$=g-(p.y+p.height/2),_=Math.atan2($,b)/Math.PI*180,k=new DOMMatrix().rotate(_),W=mi(o,k),U=W.width/p.width,B=W.height/p.height,wt=n.inverse().multiply(c);return k.inverse().translate(W.left,W.top).multiply(wt.inverse()).scale(U,B).translate(-p.left,-p.top)}else return t.getScreenCTM()?.inverse()||null}var he=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},Uo={x:9.91,y:8.18},Jt=class extends ot{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[At(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return Rt`
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
    `}mapToMinMax(e,o,s){return e*(s-o)+o}percentFromMinMax(e,o,s){return(e-o)/(s-o)}renderSVG(){let e=Bo(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return gt`<svg
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
        cx=${Uo.x}
        cy=${Uo.y}
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?xi(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",s=o?e.touches[0].pageX:e.pageX,i=o?e.touches[0].pageY:e.pageY,c=new DOMPointReadOnly(s,i).matrixTransform(this.pageToKnobMatrix),n=Uo.x-c.x,p=Uo.y-c.y,d=Math.round(Math.atan2(p,n)*180/Math.PI);d<0&&(d+=360),d-=90,n>0&&p<=0&&d>0&&(d-=360),d=Bo(this.startDegree,this.endDegree,d);let u=this.percentFromMinMax(d,this.startDegree,this.endDegree),g=this.mapToMinMax(u,this.min,this.max);this.updateValue(g)}updateValue(e){let o=Bo(this.min,this.max,e),s=Math.round(o/this.step)*this.step;this.value=Math.round(s*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};he([N({type:Number})],Jt.prototype,"min",void 0);he([N({type:Number})],Jt.prototype,"max",void 0);he([N()],Jt.prototype,"value",void 0);he([N()],Jt.prototype,"step",void 0);he([N()],Jt.prototype,"startDegree",void 0);he([N()],Jt.prototype,"endDegree",void 0);Jt=he([Mt("wokwi-potentiometer")],Jt);var eo=function(t,e,o,s){var i=arguments.length,c=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,s);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(c=(i<3?n(c):i>3?n(e,o,c):n(e,o))||c);return i>3&&c&&Object.defineProperty(e,o,c),c},wa,Re=class extends ot{static{wa=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+wa.pushbuttonCounter++}static get styles(){return Rt`
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
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(li(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};eo([N()],Re.prototype,"color",void 0);eo([N()],Re.prototype,"pressed",void 0);eo([N()],Re.prototype,"label",void 0);eo([N({type:Boolean,attribute:"xray"})],Re.prototype,"xray",void 0);Re=wa=eo([Mt("wokwi-pushbutton")],Re);var gi=`:host {
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
`;var It={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var F=9.6/2.54,K=57.6,Vo=14.4,bi={x:Vo,ancho:32.2*F},_t={x:Vo+(32.2-22.2)/2*F,ancho:22.2*F,alto:11.8*F},Ae={x:_t.x+5.9*F,y:K},$a=13.5*F,_e=182.4,Lo={ancho:201.6,alto:86.4},No={GND:{x:_e,y:K-9.6,color:"#7a4a24"},VCC:{x:_e,y:K,color:"#d7263d"},SIG:{x:_e,y:K+9.6,color:"#f28c28"}},M=t=>Math.round(t*100)/100,Ra=t=>`rotate(${M(-t)} ${M(Ae.x)} ${M(Ae.y)})`;function Aa(t="sg90",e=90){let o=It[t]||It.sg90,{ancho:s,alto:i}=Lo,c=K-_t.alto/2,n=M(Ae.x),p=_t.x+_t.ancho,d=t==="sg90",u=Object.values(No).map(($,_)=>{let k=K-4+_*4;return`<path d="M${M(p)} ${M(k)} C ${M(p+26)} ${M(k)}, ${M(_e-34)} ${M($.y)}, ${M(_e-9)} ${M($.y)}" fill="none" stroke="${$.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),g=Object.values(No).map($=>`<rect x="${M($.x-2.2)}" y="${M($.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),b=d?`<circle cx="${M(_t.x+15*F)}" cy="${K}" r="${M(3.6*F)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${M(_t.x+9.5*F)}" cy="${M(K+2.2*F)}" r="${M(2.2*F)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}"><title>Servo ${o.nombre}</title>`+u+`<rect x="${M(_e-9)}" y="${M(K-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+g+`<rect x="${M(bi.x)}" y="${M(c+1.5)}" width="${M(bi.ancho)}" height="${M(_t.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${d?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${M(Vo+2.4*F)}" cy="${K}" r="${M(1*F)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${M(Vo+(32.2-2.4)*F)}" cy="${K}" r="${M(1*F)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${M(_t.x)}" y="${M(c)}" width="${M(_t.ancho)}" height="${M(_t.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${d?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+b+`<text x="${M(_t.x+15.5*F)}" y="${M(K+4.1*F)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${n}" cy="${K}" r="${M(5.2*F)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${Ra(e)}"><path d="M${n} ${M(K-3.2*F/2-1)} L${M(Ae.x+$a)} ${M(K-1.1*F)} A ${M(1.1*F)} ${M(1.1*F)} 0 0 1 ${M(Ae.x+$a)} ${M(K+1.1*F)} L${n} ${M(K+3.2*F/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${n}" cy="${K}" r="${M(3.4*F)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map($=>`<circle cx="${M(Ae.x+$a*$)}" cy="${K}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${n}" cy="${K}" r="${M(1.3*F)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var Q=3.779527559055118,oo={ancho:72.58*Q,alto:53.34*Q},Ee=4*Q,rt=5*Q,ln=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],zt=Ee+4.6*Q,Ht=oo.ancho-.5-4.6*Q,Ft=60,Dt=(t,e)=>({x:t,y:Ft+e*rt}),Zt={M1A:Dt(zt,0),M1B:Dt(zt,1),GND_IZQ:Dt(zt,2),M2A:Dt(zt,3),M2B:Dt(zt,4),M4A:Dt(Ht,0),M4B:Dt(Ht,1),GND_DER:Dt(Ht,2),M3A:Dt(Ht,3),M3B:Dt(Ht,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+rt,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},Ci={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},Pa={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},vi=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],E=t=>Math.round(t*100)/100,Y=(t,e,o,{tam:s=6.2,ancla:i="middle",peso:c="bold",color:n="#ffffff",giro:p=0}={})=>`<text x="${E(t)}" y="${E(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${i}" fill="${n}"${p?` transform="rotate(${p} ${E(t)} ${E(e)})"`:""}>${o}</text>`;function _a(t,e,o,s){let i=19.3*Q,c=6.4*Q,n=t-i/2,p=e-c/2,d="";for(let u=0;u<8;u++){let g=t-8.89*Q+u*2.54*Q;d+=`<rect x="${E(g-1.6)}" y="${E(p-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,d+=`<rect x="${E(g-1.6)}" y="${E(p+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${E(t)} ${E(e)})">`+d+`<rect x="${E(n)}" y="${E(p)}" width="${E(i)}" height="${E(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${E(n)} ${E(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+Y(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+Y(t,e-i/2-3,s,{tam:5.2})}function Ea(t,e,o,s=!0){let i=s?5.6*Q:o*rt+.6*Q,c=s?o*rt+.6*Q:5.6*Q,n=s?t-i/2:t-rt/2-.3*Q,p=s?e-rt/2-.3*Q:e-c/2,d="";for(let u=0;u<o;u++){let g=s?t:t+u*rt,b=s?e+u*rt:e;d+=`<circle cx="${E(g)}" cy="${E(b)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,d+=`<line x1="${E(g-4.2)}" y1="${E(b)}" x2="${E(g+4.2)}" y2="${E(b)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${E(n)}" y="${E(p)}" width="${E(i)}" height="${E(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+d}var yi=(t,e,o)=>`<circle cx="${E(t)}" cy="${E(e)}" r="${E(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${E(t)} ${E(e-o/2)} a ${E(o/2)} ${E(o/2)} 0 0 1 0 ${E(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${E(t)}" cy="${E(e)}" r="${E(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Ta(t=!0){let{ancho:e,alto:o}=oo,s=ln.map(({y:p,xs:d})=>{let u=d[0]-4.6,g=d[d.length-1]+4.6;return`<rect x="${E(u)}" y="${E(p-4.6)}" width="${E(g-u)}" height="9.2" fill="#151515"/>`+d.map(b=>`<rect x="${E(b-1.6)}" y="${E(p-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),i=["S2","S1"].map(p=>["SIG","POS","GND"].map(d=>{let u=Zt[`${p}_${d}`];return`<rect x="${E(u.x-4.4)}" y="${E(u.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${E(u.x-1.4)}" y="${E(u.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,n=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${E(e)}" height="${E(o)}" viewBox="0 0 ${E(e)} ${E(o)}"><title>Shield de motores L293D</title><rect x="${E(Ee)}" y="0.5" width="${E(e-Ee-.5)}" height="${E(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+s+_a(82,86,"L293D","U1")+_a(145,86,"74HC595","U3")+_a(205,86,"L293D","U2")+yi(118,140,6.3*Q)+yi(205,140,6.3*Q)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${n}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+Ea(zt,Ft,5)+Ea(Ht,Ft,5)+Ea(Zt.EXT_POS.x,Zt.EXT_POS.y,2,!1)+i+`<rect x="${c-9}" y="${n-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${n-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${c-9.6}" y="${n-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${E(Ee+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${E(Ee+15)}" cy="169" r="5" fill="#2b2b2b"/>`+Y(zt+13,Ft+rt/2+3,"M1",{tam:7})+Y(zt+13,Ft+3.5*rt+3,"M2",{tam:7})+Y(zt+12,Ft+2*rt+2.5,"GND",{tam:5})+Y(Ht-13,Ft+rt/2+3,"M4",{tam:7})+Y(Ht-13,Ft+3.5*rt+3,"M3",{tam:7})+Y(Ht-12,Ft+2*rt+2.5,"GND",{tam:5})+Y(Zt.EXT_POS.x+rt/2,193,"EXT_PWR",{tam:5.6})+Y(Zt.EXT_POS.x,165,"+M",{tam:5})+Y(Zt.EXT_GND.x,165,"GND",{tam:5})+Y(c,n-8,"PWR",{tam:5.6})+Y(52,16,"SERVO_2",{tam:5,ancla:"start"})+Y(52,26,"SERVO_1",{tam:5,ancla:"start"})+Y(26,7.4,"S",{tam:4.6})+Y(35.6,7.4,"+",{tam:5})+Y(45.2,7.4,"\u2212",{tam:5})+Y(Ee+15,156,"RESET",{tam:4.6})+Y(196,162,"Motor Shield L293D",{tam:6.4})+Y(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var j=3.779527559055118,nt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},wi=nt.voltiosRef/(nt.mABloqueado/1e3),$i=nt.rpmSinCarga*nt.reduccion*2*Math.PI/60,Ri=nt.mASinCarga/1e3,Da=(nt.voltiosRef-Ri*wi)/$i,Nl=Da*Ri/$i,Ll=nt.tauMecanicoMs/1e3*Da*Da/wi;var ka=64.2*j,ue=22.5*j,Ma=40*j,Oa=11.2*j,Ct=nt.ruedaMM*j/2,dn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Oa,y0:132-ue/2}},ao=t=>dn[t&&t.vista==="rueda"?"rueda":"eje"],Ai=t=>{let e=t.y0+ue/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function _i(t){let e=ao(t),o=Ai(e);if(t&&t.lado==="derecho")for(let s of["A","B"])o[s]={...o[s],x:e.ancho-o[s].x};return o}var C=t=>Math.round(t*100)/100,Ia=(t,e,o,{tam:s=11,color:i="#1f2328",peso:c="bold",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${C(t)}" y="${C(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`;function pn(t,e){let o=e+ue/2;return`<rect x="${C(t+Ma-2)}" y="${C(o-9.5*j)}" width="${C(ka-Ma+2)}" height="${C(19*j)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${C(t+ka-6*j)}" y="${C(o-8*j)}" width="${C(6*j)}" height="${C(16*j)}" rx="4" fill="#2b2b2b"/><rect x="${C(t)}" y="${C(e)}" width="${C(Ma)}" height="${C(ue)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${C(t+31.8*j-8.75*j)}" cy="${C(o)}" r="${C(1.5*j)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${C(t+31.8*j+8.75*j-6)}" cy="${C(o)}" r="${C(1.5*j)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function fn(t){let e=Ai(t),o=t.x0+ka,s=t.y0+ue/2;return["A","B"].map((i,c)=>{let n=s+(c?3:-3);return`<path d="M${C(o)} ${C(n)} C ${C(o+20)} ${C(n)}, ${C(e[i].x-22)} ${C(e[i].y)}, ${C(e[i].x-6)} ${C(e[i].y)}" fill="none" stroke="${e[i].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${C(e[i].x-4.2)}" y="${C(e[i].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function hn(t,e){let o=2.7*j;return`<circle cx="${C(t)}" cy="${C(e)}" r="${C(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${C(t)} ${C(e)})"><path d="M${C(t-o)} ${C(e-1.8*j)} H${C(t+o)} V${C(e+1.8*j)} H${C(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${C(t)}" cy="${C(e)}" r="${C(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function un(t,e){let o=[0,72,144,216,288].map(i=>`<rect x="${C(t-12)}" y="${C(e-Ct*.72)}" width="24" height="${C(Ct*.72)}" rx="6" fill="#f2c318" transform="rotate(${i} ${C(t)} ${C(e)})"/>`).join(""),s=Array.from({length:24},(i,c)=>`<rect x="${C(t-3)}" y="${C(e-Ct-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${C(t)} ${C(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${C(t)} ${C(e)})"><circle cx="${C(t)}" cy="${C(e)}" r="${C(Ct*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${C(Ct*.24)}"/>`+s+`<circle cx="${C(t)}" cy="${C(e)}" r="${C(Ct*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${C(t)}" cy="${C(e)}" r="${C(7*j)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${C(t-2.7*j)}" y="${C(e-1.8*j)}" width="${C(5.4*j)}" height="${C(3.6*j)}" fill="#7a5d00"/></g>`}function Ei(t={}){let e=ao(t),o=t.lado==="derecho",s=e.x0+Oa,i=e.y0+ue/2,c=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",n=o?e.ancho-s:s,p=pn(e.x0,e.y0)+fn(e),d=o?e.ancho-(e.x0+26*j):e.x0+26*j,u=Ia(d,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(p+=un(s,i),u+=`<line x1="${C(n-Ct-10)}" y1="${C(i+Ct+2)}" x2="${C(n+Ct+10)}" y2="${C(i+Ct+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${C(n)} ${C(i+Ct+20)})"></g>`+Ia(n,i+Ct+46,"quieto",{tam:13,marca:"data-velocidad"})):(p+=hn(s,i),u+=Ia(n,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${p}</g>${u}</svg>`}var Si=new WeakMap;function Pi(t,e,o){let s=ao(e),i=s.x0+Oa,c=s.y0+ue/2,n=o||{rpm:0,giro:0,velocidad:0},p=t.querySelector("[data-eje],[data-rueda]");p&&p.setAttribute("transform",`rotate(${C(-n.giro)} ${C(i)} ${C(c)})`);let d=t.querySelector("[data-rpm]"),u=Si.get(t)||{},g=n.rpm>0!=(e.lado==="derecho");if(d){let _=Math.abs(n.rpm)<1?"0 RPM":`${Math.round(Math.abs(n.rpm))} RPM ${g?"\u27F2":"\u27F3"}`;_!==u.rpm&&(d.textContent=u.rpm=_)}let b=t.querySelector("[data-velocidad]"),$=t.querySelector("[data-flecha]");if(b&&$){let _=Math.sign(n.velocidad)*(e.lado==="derecho"?-1:1),k=Math.abs(n.velocidad),W=k<.5,U=W?"quieto":`${_>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(k)} cm/s`;U!==u.vel&&(b.textContent=u.vel=U);let B=W?0:g?-1:1,wt=`${B}|${_}`;wt!==u.flecha&&(u.flecha=wt,$.innerHTML=W?"":`<path d="M${-40*B} -5 H${22*B} V-12 L${40*B} 0 L${22*B} 12 V5 H${-40*B} Z" fill="${_>0?"#2e9e44":"#d7263d"}"/>`)}Si.set(t,u)}var Ti=3.779527559055118,St={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Me={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var ro=360,Ba=150,Qt=10,vt=10,te=72*Ti,so=34*Ti,Ua={ancho:ro,alto:Ba},ee=Qt+te+58,Te=vt+so-34,io={POS:{x:ro-12,y:vt+30,color:"#d7263d"},NEG:{x:ro-12,y:vt+39.6,color:"#2b2b2b"},BAL0:{x:ee,y:Te,color:"#2b2b2b"},BAL1:{x:ee,y:Te+9.6,color:"#e05a5a"},BAL2:{x:ee,y:Te+19.2,color:"#d7263d"}},V=t=>Math.round(t*100)/100,Pe=(t,e,o,{tam:s=11,color:i="#ffffff",peso:c="bold",ancla:n="middle",marca:p=""}={})=>`<text${p?` ${p}="1"`:""} x="${V(t)}" y="${V(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="${n}" fill="${i}">${o}</text>`;function Va(t="nominal"){let e=St[t]||St.nominal,o=Qt+te,s=["POS","NEG"].map((c,n)=>{let p=io[c],d=vt+24+n*10;return`<path d="M${V(o)} ${V(d)} C ${V(o+26)} ${V(d)}, ${V(p.x-26)} ${V(p.y)}, ${V(p.x-6)} ${V(p.y)}" fill="none" stroke="${p.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${V(p.x-4.4)}" y="${V(p.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),i=["BAL0","BAL1","BAL2"].map((c,n)=>{let p=io[c],d=vt+so-40+n*4;return`<path d="M${V(o)} ${V(d)} C ${V(o+18)} ${V(d)}, ${V(p.x-30)} ${V(p.y)}, ${V(p.x-7)} ${V(p.y)}" fill="none" stroke="${p.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${V(ee-7)}" y="${V(Te-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(c=>`<rect x="${V(ee-2.4)}" y="${V(io[c].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+Pe(ee-14,Te+2.5,"\u2212",{tam:8,color:"#5a6673"})+Pe(ee-14,Te+21.7,"+",{tam:8,color:"#5a6673"})+Pe(ee,vt+so+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${ro}" height="${Ba}" viewBox="0 0 ${ro} ${Ba}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+s+i+`<rect x="${Qt}" y="${vt}" width="${V(te)}" height="${V(so)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${Qt+14}" y="${vt+12}" width="${V(te-28)}" height="${V(so-24)}" rx="4" fill="#3f4752"/>`+Pe(Qt+te/2,vt+36,"LiPo 2S \xB7 7,4 V",{tam:15})+Pe(Qt+te/2,vt+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${V(Qt+te/2-33+c*23)}" y="${vt+66}" width="20" height="12" rx="2" fill="${c<e.barras?e.color:"#5a6370"}"/>`).join("")+Pe(Qt+te/2,vt+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function Mi(t,e,o){let s=t.querySelector("[data-voltios]");if(!s)return;let i=St[e]||St.nominal,c=o&&typeof o.voltios=="number"?o.voltios:i.voltios;s.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${i.nombre}`}var ae={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},oe=210,La=140,Wa={ancho:oe,alto:La},Bi=9.6,Ui=82,mn=132,Fa=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:Ui+e*Bi,y:mn}])),at=t=>Math.round(t*100)/100,Na=(t,e,o,{tam:s=7,color:i="#5a6673",peso:c="bold",marca:n=""}={})=>`<text${n} x="${at(t)}" y="${at(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${s}" font-weight="${c}" text-anchor="middle" fill="${i}">${o}</text>`,ja={ancho:24,alto:46,grueso:5},xn=[76,112,148],Ii=34,Di="#ff3b30",jo="#3a1414";function gn(t,e){let{ancho:o,alto:s,grueso:i}=ja,c=s/2,n=(p,d,u,g)=>({x:t+p,y:e+d,w:u,h:g});return{a:n(i/2,0,o-i,i),b:n(o-i,i/2,i,c-i),c:n(o-i,c+i/2,i,c-i),d:n(i/2,s-i,o-i,i),e:n(0,c+i/2,i,c-i),f:n(0,i/2,i,c-i),g:n(i/2,c-i/2,o-i,i)}}var bn={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function Vi(t=ae.umbralV){let e=xn.map((i,c)=>{let n=gn(i,Ii);return Object.entries(n).map(([p,d])=>`<rect data-seg="${c}${p}" x="${at(d.x)}" y="${at(d.y)}" width="${at(d.w)}" height="${at(d.h)}" rx="2" fill="${jo}"/>`).join("")+`<circle data-seg="${c}p" cx="${at(i+ja.ancho+5)}" cy="${at(Ii+ja.alto-2)}" r="2.8" fill="${jo}"/>`}).join(""),o=Object.entries(Fa).map(([i,c],n)=>`<rect x="${at(c.x-1.2)}" y="122" width="2.4" height="${at(c.y-120)}" fill="#c9ccd1"/>`+Na(c.x,108,n===0?"\u2212":String(n),{tam:n===0?8:6.5})).join(""),s=[0,1].map(i=>{let c=38+i*44;return`<path d="M${at(8)} ${at(c-10)} q -6 10 0 20 M${at(3)} ${at(c-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${oe}" height="${La}" viewBox="0 0 ${oe} ${La}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${oe-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${oe-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(i=>`<circle cx="38" cy="${i}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${i}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${s}</g><rect x="66" y="22" width="${oe-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${at(Ui-6)}" y="114" width="${at(8*Bi+12)}" height="9" fill="#151515"/>`+o+Na(oe/2+30,18,"1-8S",{tam:6.5})+Na(oe/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function ki(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,s]=e.split(".");return(o+s).slice(0,3).split("").map((c,n)=>({c,punto:n===o.length-1}))}var Oi=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function yn(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[ki(t.total),Oi(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((s,i)=>o.push(Oi(`-${i+1}-`),ki(s))),o[Math.floor(e/ae.pasoMs)%o.length]}function za(t,e,o){let s=t.querySelector("[data-umbral]"),i=e&&typeof e.umbral=="number"?e.umbral:ae.umbralV;if(s){let g=`alarma ${i?String(i).replace(".",",")+" V":"apagada"}`;s.textContent!==g&&(s.textContent=g)}let c=o&&o.ms||0,p=o&&o.alarma&&Math.floor(c/125)%2===1?null:yn(o,c);for(let g=0;g<3;g++){let b=p?p[g]:null,$=b&&bn[b.c]||"";for(let W of"abcdefg"){let U=t.querySelector(`[data-seg="${g}${W}"]`),B=$.includes(W)?Di:jo;U&&U.getAttribute("fill")!==B&&U.setAttribute("fill",B)}let _=t.querySelector(`[data-seg="${g}p"]`),k=b&&b.punto?Di:jo;_&&_.getAttribute("fill")!==k&&_.setAttribute("fill",k)}let d=t.querySelector("[data-pitido]"),u=o&&o.alarma&&Math.floor(c/250)%2===0?"visible":"hidden";d&&d.getAttribute("visibility")!==u&&d.setAttribute("visibility",u)}var Ie={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},Ha=Object.keys(Ie),Ni={marron:"marr\xF3n",morado:"violeta"};function Ga(t,e){let o=[t,e];return o.some(s=>/^placa\.GND/.test(s)||/^protoboard\.[si]-/.test(s))?"negro":o.some(s=>/^placa\.(5V|3V3|VIN)$/.test(s)||/^protoboard\.[si]\+/.test(s))?"rojo":"verde"}var Cn=["3","5","6","9","10","11"],De={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(Cn.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}}},tt={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:Lo.ancho,alto:Lo.alto,pines:No,svg:t=>Aa(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(It).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(Aa(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",Ra(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,props:{puentePWR:!0},dibujo:{ancho:oo.ancho,alto:oo.alto,pines:Zt,svg:t=>Ta(t.puentePWR!==!1)},rotulo:t=>Ci[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(Ta(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),s=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==s&&o.setAttribute("fill",s)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...ao(t),pines:_i(t)}),svg:t=>Ei(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){Pi(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:Ua.ancho,alto:Ua.alto,pines:io,svg:t=>Va(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries(St).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(Va(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(s=>t.ownerDocument.importNode(s,!0)))},mostrar(t,e,o){Mi(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:ae.umbralV},dibujo:{ancho:Wa.ancho,alto:Wa.alto,pines:Fa,svg:t=>Vi(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:ae.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){za(t,e,null)},mostrar(t,e,o){za(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var Wo=["a","b","c","d","e"],Li=["f","g","h","i","j"],ct={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ji=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],kt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},no=t=>14.4+(t-1)*9.6,vn=t=>t>=2&&(t-1)%6!==0,qa=new Map;function ke(t="media"){if(qa.has(t))return qa.get(t);let e=kt[t]||kt.media,o=[];qa.set(t,o);for(let s=1;s<=e.columnas;s++){for(let i of Wo)o.push({nombre:i+s,x:no(s),y:ct[i],tira:"arriba"+s});for(let i of Li)o.push({nombre:i+s,x:no(s),y:ct[i],tira:"abajo"+s});for(let[i]of ji)vn(s)&&o.push({nombre:i+s,x:no(s),y:ct[i],tira:i})}return o}var Xa=new Map;function Wi(t="media"){if(Xa.has(t))return Xa.get(t);let e=new Map;Xa.set(t,e);for(let o of ke(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function Ka(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(Wo.includes(o[1])?"arriba":"abajo")+o[2]:null}function Fi(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let c=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[s,i]=Wo.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${s}${o[2]}\u2013${i}${o[2]}`}function Ya(t="media"){let e=kt[t]||kt.media,{ancho:o,alto:s,columnas:i}=e,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}" viewBox="0 0 ${o} ${s}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${s-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(ct.e+ct.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let n=(d,u)=>c.push(`<line x1="${14.4-6}" y1="${d}" x2="${o-14.4+6}" y2="${d}" stroke="${u}" stroke-width="1.2"/>`);n(ct["s+"]-5.5,"#d7263d"),n(ct["s-"]+5.5,"#2f6fde"),n(ct["i-"]-5.5,"#2f6fde"),n(ct["i+"]+5.5,"#d7263d");let p=(d,u,g,b="#8a867a",$=5.5)=>c.push(`<text x="${d}" y="${u}" font-family="sans-serif" font-size="${$}" font-weight="700" fill="${b}" text-anchor="middle">${g}</text>`);for(let[d,,u]of ji){let g=u==="+"?"#d7263d":"#2f6fde";p(5.2,ct[d]+2.2,u,g,7),p(o-5.2,ct[d]+2.2,u,g,7)}for(let d=1;d<=i;d++)(d===1||d%5===0)&&(p(no(d),ct.a-6.2,d),p(no(d),ct.j+10.4,d));for(let d of[...Wo,...Li])p(5.2,ct[d]+2,d),p(o-5.2,ct[d]+2,d);for(let d of ke(t))c.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function zi(t,{tipo:e="media",ocupados:o=new Set,tolerancia:s=3.5}={}){if(!t.length)return null;let i=ke(e),c=(b,$)=>{let _=null,k=1/0;for(let W of i){let U=Math.hypot(W.x-b,W.y-$);U<k&&(k=U,_=W)}return{hueco:_,distancia:k}},n=c(t[0].x,t[0].y);if(n.distancia>9.6)return null;let p=n.hueco.x-t[0].x,d=n.hueco.y-t[0].y,u={},g=new Set;for(let b of t){let{hueco:$,distancia:_}=c(b.x+p,b.y+d);if(_>s||o.has($.nombre)||g.has($.nombre))return null;u[b.nombre]=$.nombre,g.add($.nombre)}return{dx:p,dy:d,en:u}}var Sn=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Fo(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:s=!0}={}){let i=new Map,c=p=>{for(i.has(p)||i.set(p,p);i.get(p)!==p;)i.set(p,i.get(i.get(p))),p=i.get(p);return p},n=(p,d)=>i.set(c(p),c(d));for(let p of Sn)p.forEach(d=>n("placa."+p[0],"placa."+d));for(let p of t.cables)n(p.de,p.a);if(t.protoboard){for(let p of Wi(t.protoboard.tipo).values())p.forEach(d=>n("protoboard."+p[0],"protoboard."+d));for(let p of t.componentes)if(p.en)for(let[d,u]of Object.entries(p.en))n(p.id+"."+d,u)}for(let p of t.componentes)if(p.tipo==="shield_l293d"){for(let[d,u]of vi)n(p.id+"."+d,u);(!p.props||p.props.puentePWR!==!1)&&n(p.id+".EXT_POS","placa.VIN")}else p.tipo==="bateria_lipo"&&s?(n(p.id+".BAL0",p.id+".NEG"),n(p.id+".BAL2",p.id+".POS")):p.tipo==="pulsador"?(n(p.id+".1i",p.id+".1d"),n(p.id+".2i",p.id+".2d"),e.has(p.id)&&n(p.id+".1i",p.id+".2i")):o&&p.tipo==="resistencia"?n(p.id+".1",p.id+".2"):o&&p.tipo==="potenciometro"&&(n(p.id+".GND",p.id+".SIG"),n(p.id+".SIG",p.id+".VCC"));return c}var es=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Ja=Object.fromEntries(es.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),wn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},$n=["GND","+5V","+3V3","VIN"],Hi=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Za={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>Hi(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(It[t.modelo]||It.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>Hi(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},Ot="placa:GND1",Oe="placa:5V",co="pieza:EXT_POS",Gi=[15,1,2,3,4,5,6,7];function qi(t,e){let o=Pa.pwm;return{1:"placa:"+o[t],2:`IN_M${t}A`,3:`pieza:M${t}A`,6:`pieza:M${t}B`,7:`IN_M${t}B`,9:"placa:"+o[e],10:`IN_M${e}A`,11:`pieza:M${e}A`,14:`pieza:M${e}B`,15:`IN_M${e}B`,4:Ot,5:Ot,12:Ot,13:Ot,8:co,16:Oe}}function Rn(){let t=Pa,e={8:Ot,16:Oe,10:Oe,11:"placa:"+t.reloj,12:"placa:"+t.cierre,13:"placa:"+t.habilita,14:"placa:"+t.datos};for(let[o,{A:s,B:i}]of Object.entries(t.bits))e[Gi[s]]=`IN_M${o}A`,e[Gi[i]]=`IN_M${o}B`;return e}var Xi="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm",os="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm",Ki="Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",Qa="Package_DIP:DIP-16_W7.62mm",ts={ref:"C",lib:"Device",parte:"C",huella:"Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm",valor:"100nF"},An=[{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Qa,valor:"L293D",nota:"M1 y M2",pads:qi(1,2)},{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:Qa,valor:"L293D",nota:"M3 y M4",pads:qi(3,4)},{ref:"U",lib:"74xx",parte:"74HC595",huella:Qa,valor:"74HC595",nota:"sentido de los motores",pads:Rn()},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Xi,valor:"M1 GND M2",externo:!0,pads:{1:"pieza:M1A",2:"pieza:M1B",3:"pieza:GND_IZQ",4:"pieza:M2A",5:"pieza:M2B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:Xi,valor:"M4 GND M3",externo:!0,pads:{1:"pieza:M4A",2:"pieza:M4B",3:"pieza:GND_DER",4:"pieza:M3A",5:"pieza:M3B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x02",huella:os,valor:"EXT_PWR",externo:!0,pads:{1:co,2:"pieza:EXT_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Ki,valor:"SERVO_1",externo:!0,pads:{1:"pieza:S1_SIG",2:"pieza:S1_POS",3:"pieza:S1_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Ki,valor:"SERVO_2",externo:!0,pads:{1:"pieza:S2_SIG",2:"pieza:S2_POS",3:"pieza:S2_GND"}},{ref:"JP",lib:"Jumper",parte:"Jumper_2_Open",huella:"Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical",valor:"PWR",pads:{1:co,2:"placa:VIN"}},{...ts,nota:"junto a U1",pads:{1:Oe,2:Ot}},{...ts,nota:"junto a U2",pads:{1:Oe,2:Ot}},{...ts,nota:"junto a U3",pads:{1:Oe,2:Ot}},{ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"100uF 25V",nota:"voltaje de motores",pads:{1:co,2:Ot}},{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:"1k",nota:"LED PWR",pads:{1:co,2:"LED_PWR"}},{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D3.0mm",valor:"LED verde",nota:"PWR",pads:{1:Ot,2:"LED_PWR"}}],_n={EXT_POS:"VMOT",M1A:"M1_A",M1B:"M1_B",M2A:"M2_A",M2B:"M2_B",M3A:"M3_A",M3B:"M3_B",M4A:"M4_A",M4B:"M4_B"},En={motor_tt:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:os,valor:()=>"Motor TT",pines:{A:"1",B:"2"}}],bateria_lipo:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:os,valor:()=>"LiPo 2S",pines:{POS:"1",NEG:"2"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:"Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical",valor:()=>"Balance LiPo",sufijo:"/balance",pines:{BAL0:"1",BAL1:"2",BAL2:"3"}}],probador_lipo:[{ref:"J",lib:"Connector_Generic",parte:"Conn_01x09",huella:"Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical",valor:()=>"Probador de celdas",pines:{NEG:"1",C1:"2",C2:"3",C3:"4",C4:"5",C5:"6",C6:"7",C7:"8",C8:"9"}}]},Pn=new Set(["servo"]),lt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function Tn(t){let o=[2166136261,16777619,2654435769,2246822507].map(s=>{let i=s>>>0;for(let c=0;c<t.length;c++)i=Math.imul(i^t.charCodeAt(c),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Yi(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:s="TecnoCircuito"}={}){let i={...t,componentes:t.componentes.map(m=>m.tipo==="shield_l293d"?{...m,props:{...m.props,puentePWR:!1}}:m)},c=Fo(i),n=i.componentes.find(m=>m.tipo==="shield_l293d")||null,p=m=>{let[S,A]=m.split(":");return A===void 0?"#"+m:c((S==="placa"?"placa":n.id)+"."+A)},d=n?An.map(m=>({...m,id:`${n.id}/${m.valor}${m.nota?" "+m.nota:""}`,enShield:!0})):[],u=new Set(t.cables.flatMap(m=>[m.de,m.a])),g=new Set(d.flatMap(m=>Object.values(m.pads).map(p))),b=Object.keys(Ja).filter(m=>u.has("placa."+m)||g.has(c("placa."+m))),$=i.componentes.filter(m=>Za[m.tipo]),_=Fo(i,{balanceInterno:!1}),k=m=>{let[S,A]=m.split(":");return A===void 0?"#"+m:_((S==="placa"?"placa":n.id)+"."+A)},W=new Set([...b.map(m=>_("placa."+m)),...d.flatMap(m=>Object.values(m.pads).map(k)),...$.flatMap(m=>Object.keys(Za[m.tipo].pads).map(S=>_(m.id+"."+S)))]),U=new Set(d.filter(m=>m.externo).flatMap(m=>Object.values(m.pads).map(k))),B=(m,S)=>S.filter(A=>W.has(_(m+"."+A))),wt=(m,S)=>B(m,S).some(A=>!U.has(_(m+"."+A))),O=(m,S)=>{let A=B(m,S);return A.length>0&&A.every(L=>U.has(_(m+"."+L)))},ut=[];for(let m of $){let S=Za[m.tipo];Pn.has(m.tipo)&&O(m.id,Object.keys(S.pads))||ut.push({...S,id:m.id,valor:S.valor(m.props||{}),pads:Object.entries(S.pads).map(([A,L])=>[L,c(m.id+"."+A)])})}for(let m of d)ut.push({...m,pads:Object.entries(m.pads).map(([S,A])=>[S,p(A),A.startsWith("pieza:")?_n[A.slice(6)]:null])});for(let m of i.componentes)for(let S of En[m.tipo]||[])wt(m.id,Object.keys(S.pines))&&ut.push({...S,id:m.id+(S.sufijo||""),valor:S.valor(m.props||{}),pads:Object.entries(S.pines).map(([A,L])=>[L,c(m.id+"."+A)])});let st={J:es.length};for(let m of ut)st[m.ref]=(st[m.ref]||0)+1,m.ref=m.ref+st[m.ref];let mt=new Map,P=(m,S,A,L,v)=>{mt.has(m)||mt.set(m,{pads:new Map,uno:new Set,shield:new Set,propia:m.startsWith("#")?m.slice(1):null});let T=mt.get(m);T.pads.set(S+" "+A,{ref:S,pad:A,pinUno:L}),L&&T.uno.add(wn[L]||L),v&&T.shield.add(v)};for(let m of b)P(c("placa."+m),Ja[m].ref,Ja[m].pad,m,null);for(let m of ut)for(let[S,A,L]of m.pads)P(A,m.ref,String(S),null,L);let X=(m,S)=>m.localeCompare(S,"en",{numeric:!0}),pt=[...mt.values()].filter(m=>m.pads.size>=2).map(m=>{let S=[...m.pads.values()].sort((L,v)=>X(L.ref,v.ref)||X(L.pad,v.pad));return{nombre:$n.find(L=>m.uno.has(L))||[...m.uno].sort(X)[0]||[...m.shield].sort(X)[0]||m.propia||`Net-(${S[0].ref}-Pad${S[0].pad})`,pads:S}}).sort((m,S)=>X(m.nombre,S.nombre)),ft=[],Nt=(m,S,A,L,v,T,I)=>ft.push("		(comp",`			(ref ${lt(m)})`,`			(value ${lt(S)})`,`			(footprint ${lt(A)})`,`			(libsource (lib ${lt(L)}) (part ${lt(v)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${lt(T)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${lt(I)})`,"		)");ft.push("(export",'	(version "E")',"	(design",`		(source ${lt(e)})`,`		(date ${lt(o)})`,`		(tool ${lt(s)})`,"	)"),ft.push("	(components");for(let m of es)Nt(m.ref,m.valor,m.huella,"Connector_Generic",m.parte,"placa",m.uuid);for(let m of ut)Nt(m.ref,m.valor,m.huella,m.lib,m.parte,m.id,Tn(e+"/"+m.id));return ft.push("	)","	(nets"),pt.forEach((m,S)=>{ft.push("		(net",`			(code ${lt(S+1)})`,`			(name ${lt(m.nombre)})`,'			(class "Default")');for(let A of m.pads){let L=A.pinUno?` (pinfunction ${lt(A.pinUno)})`:"";ft.push(`			(node (ref ${lt(A.ref)}) (pin ${lt(A.pad)})${L} (pintype "passive"))`)}ft.push("		)")}),ft.push("	)",")"),ft.join(`
`)+`
`}var me;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(me||(me={}));var dt;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(dt||(dt={}));var Ji={0:{type:dt.SingleEnded,channel:0},1:{type:dt.SingleEnded,channel:1},2:{type:dt.SingleEnded,channel:2},3:{type:dt.SingleEnded,channel:3},4:{type:dt.SingleEnded,channel:4},5:{type:dt.SingleEnded,channel:5},6:{type:dt.SingleEnded,channel:6},7:{type:dt.SingleEnded,channel:7},8:{type:dt.Temperature},14:{type:dt.Constant,voltage:1.1},15:{type:dt.Constant,voltage:0}},l0={type:dt.Constant,voltage:0},In={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ji,adcReferences:[me.AREF,me.AVCC,me.Reserved,me.Internal1V1]};var Dn=2,kn=4,On=8,Bn=16,Un=32,f0=Dn|kn|On|Bn|Un;var Qi={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},tr={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},er={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var or={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var lo={PIN:35,DDR:36,PORT:37,pinChange:er,externalInterrupts:[]};var xe={PIN:41,DDR:42,PORT:43,pinChange:or,externalInterrupts:[null,null,Qi,tr]};var zo;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(zo||(zo={}));var Ho;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(Ho||(Ho={}));var Zi;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Zi||(Zi={}));var ir={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ar;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ar||(ar={}));var rs={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Vn=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:ir,compPortA:xe.PORT,compPinA:6,compPortB:xe.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:xe.PORT,externalClockPin:4},rs),Nn=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:ir,compPortA:lo.PORT,compPinA:1,compPortB:lo.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:xe.PORT,externalClockPin:5},rs),Ln=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:lo.PORT,compPinA:3,compPortB:xe.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},rs),as;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(as||(as={}));var z;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(z||(z={}));var H;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(H||(H={}));var ye=1,Go=2,Be=1,{Normal:rr,PWMPhaseCorrect:ge,CTC:ss,FastPWM:be,Reserved:is,PWMPhaseFrequencyCorrect:sr}=as,g0=[[rr,255,H.Immediate,z.Max,0],[ge,255,H.Top,z.Bottom,0],[ss,ye,H.Immediate,z.Max,0],[be,255,H.Bottom,z.Max,0],[is,255,H.Immediate,z.Max,0],[ge,ye,H.Top,z.Bottom,Be],[is,255,H.Immediate,z.Max,0],[be,ye,H.Bottom,z.Top,Be]],b0=[[rr,65535,H.Immediate,z.Max,0],[ge,255,H.Top,z.Bottom,0],[ge,511,H.Top,z.Bottom,0],[ge,1023,H.Top,z.Bottom,0],[ss,ye,H.Immediate,z.Max,0],[be,255,H.Bottom,z.Top,0],[be,511,H.Bottom,z.Top,0],[be,1023,H.Bottom,z.Top,0],[sr,Go,H.Bottom,z.Bottom,0],[sr,ye,H.Bottom,z.Bottom,Be],[ge,Go,H.Top,z.Bottom,0],[ge,ye,H.Top,z.Bottom,Be],[ss,Go,H.Immediate,z.Max,0],[is,65535,H.Immediate,z.Max,0],[be,Go,H.Bottom,z.Top,Be],[be,ye,H.Bottom,z.Top,Be]];var jn=16,Wn=8,Fn=4;var w0=Fn|jn|Wn;var _d=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"];var Gt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var bt=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),nr=t=>t>=1e3?bt(t/1e3)+" k\u03A9":t+" \u03A9",po=t=>({estado:"validado",texto:t}),fo=t=>({estado:"por_validar",texto:t}),ns=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","bateria_lipo","probador_lipo"]}],ho={protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",nr(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>po("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${bt(Gt.vf[t.color]||Gt.vf.rojo,2)} V a ${Gt.normalmA} mA`],["Corriente",`de 5 a ${Gt.normalmA} mA; se quema desde ${Gt.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(Gt.vf[t.color]||Gt.vf.rojo))/(Gt.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:()=>po("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 12 de 12 dentro del criterio).")},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>po("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",nr(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>po("Lectura anal\xF3gica revisada el 7 oct 2026 y ruido del ADC medido el 9 oct (0,1 pasos).")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=It[t.modelo]||It.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${bt(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?fo("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):po("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (6, ~100 y 590 mA).")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${nt.voltiosRef} V`],["Sin carga a 6 V",`${nt.rpmSinCarga} RPM y ${nt.mASinCarga} mA`],["Bloqueado",`${bt(nt.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${nt.reduccion} \xB7 rueda de ${nt.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>fo("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"],["En KiCad","sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, puente PWR, C1 a C4 y el LED"]],validacion:()=>fo("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=St[t.carga]||St.nominal;return[["Carga",`${e.nombre}: ${bt(e.voltios)} V`],["Celdas",e.celdas.map((o,s)=>`${s+1}: ${bt(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${bt(St.llena.voltios)} / ${bt(St.nominal.voltios)} / ${bt(St.descargada.voltios)} V`],["M\xEDnimo",`${bt(Me.minimoCeldaV)} V por celda (${bt(Me.minimoCeldaV*Me.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>fo("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${bt(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${bt(ae.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>fo("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},cr=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function lr(t){let e=cr(t).split(/\s+/).filter(Boolean),o=ns.flatMap(s=>s.piezas.map(i=>({tipo:i,categoria:s.nombre})));return e.length?o.filter(({tipo:s,categoria:i})=>{let c=ho[s],n=cr([c.nombre,i,c.descripcion,...c.palabras].join(" "));return e.every(p=>n.includes(p))}):o}var dr="http://www.w3.org/2000/svg",zn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Hn=280,pr=5e3,fr=4,hr=8,Gn=9.6,ur=.4,qn=5,Bt=t=>JSON.parse(JSON.stringify(t)),et=t=>Math.round(t*100)/100,uo=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),cs=t=>Ie[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:Ie.verde);function br(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||"uno";if(!De[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let s=!!e.soloLectura,i=typeof e.alEvento=="function"?e.alEvento:null,c=[],n=Xn(e.circuito,o),p=document.createElement("div");p.className="tecnocircuito",t.appendChild(p);let d=p.attachShadow({mode:"open"});d.innerHTML=`<style>${gi}</style>
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
</div>`;let u=a=>d.querySelector(a),g=u(".tc"),b=u(".tc-barra"),$=u(".tc-biblioteca"),_=u(".tc-buscar"),k=u(".tc-bib-lista"),W=u(".tc-bib-vacio"),U=u(".tc-ficha"),B=b.querySelector('[data-accion="menu"]'),wt=u(".tc-sel"),O=u(".tc-area"),ut=u(".tc-mundo"),st=u(".tc-capa-comp"),mt=u(".tc-capa-pines"),P=u(".tc-cables"),X=u(".tc-asas"),[pt,ft]=u(".tc-previa").children,Nt=u(".tc-ayuda"),m=u(".tc-tip"),S={px:0,py:0,escala:1.5},A=new Map,L=new Map,v=null,T=null,I=null,mo=null,qo=null,ps=!1,Xo=!1,Ve=!1,xo=null,Ko=!1,it={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},Yo=new Set,fs=[],hs=[],Jo="",q=a=>n.componentes.find(r=>r.id===a),go=a=>a==="protoboard"?n.protoboard:q(a),Ce=a=>!!(a&&tt[a.tipo]&&tt[a.tipo].montada),bo=a=>a==="placa"||Ce(q(a))?{x:0,y:0,rot:0}:go(a);function yo(a,r,l){let f=a==="placa"?De[o]:tt[r],h=document.createElement("div");h.className="tc-comp"+(a==="placa"?" tc-placa":""),h.dataset.id=a,r&&(h.dataset.tipo=r);let x;if(f&&f.dibujo){let R=document.createElement("template");R.innerHTML=f.dibujo.svg(l),x=R.content.firstElementChild}else f?(x=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(x,l),f.perilla&&x.addEventListener("input",()=>Vs(a,Number(x.value)/100))):(x=document.createElement("div"),x.className="tc-desconocido",x.textContent=`\xBF${r}?`,x.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");h.appendChild(x);let y=A.get("placa");f&&f.montada&&y?st.insertBefore(h,y.div.nextSibling):st.appendChild(h);let w={id:a,def:f,div:h,el:x,w:64,h:40,pines:new Map,lista:!1};return A.set(a,w),Promise.resolve(x.updateComplete).then(()=>{if(A.get(a)===w){if(f&&f.dibujo){let R=f.dibujo.marco?f.dibujo.marco(l):f.dibujo;Object.assign(w,{w:R.ancho,h:R.alto});for(let[D,G]of Object.entries(R.pines)){let J=document.createElement("div");J.className="tc-pin",J.dataset.ref=`${a}.${D}`,mt.appendChild(J),w.pines.set(D,{px:G.x,py:G.y,div:J})}}else if(f){Object.assign(w,vs(x));for(let R of x.pinInfo||[]){let D=f.nombrePin(R.name);if(!D)continue;let G=document.createElement("div");G.className="tc-pin",G.dataset.ref=`${a}.${D}`,mt.appendChild(G),w.pines.set(D,{px:R.x,py:R.y,div:G})}}w.lista=!0,se(w),Cs(w)}})}function us(){let a=n.protoboard.tipo,r=kt[a]||kt.media,l=document.createElement("div");l.className="tc-comp tc-protoboard",l.dataset.id="protoboard",l.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=Ya(a);let h=f.content.firstElementChild;l.appendChild(h);let x=A.get("placa");st.insertBefore(l,x?x.div.nextSibling:st.firstChild);let y={id:"protoboard",def:{protoboard:!0},div:l,el:h,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let w of ke(a)){let R=document.createElement("div");R.className="tc-pin tc-hueco",R.dataset.ref="protoboard."+w.nombre,R.style.left=w.x+"px",R.style.top=w.y+"px",l.appendChild(R),y.pines.set(w.nombre,{px:w.x,py:w.y,div:R})}return A.set("protoboard",y),se(y),vo(),Promise.resolve()}function ms(a=null){if(n.protoboard)return;let r=na(),l=kt.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-l.ancho/2),y:Math.round(a.y-l.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},us(),Co(),xt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),$t({tipo:"comp",id:"protoboard"}),!Ve&&!a&&ze(),ht()}function Co(){let a=$.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,l]of Object.entries(tt)){if(!l.montada)continue;let f=$.querySelector(`[data-tipo="${r}"]`),h=n.componentes.some(x=>x.tipo===r);f&&Object.assign(f,{disabled:h,title:h?`Ya hay una ${l.nombre}`:""})}}}function Rr(a){let r=A.get(a.id),l=n.protoboard;return!r||!r.lista||!l||!r.pines.size?null:[...r.pines].map(([f,h])=>{let x=Qo(r,a,h);return{nombre:f,x:x.x-l.x,y:x.y-l.y}})}function xs(a){let r=new Set;for(let l of n.componentes)if(l!==a&&l.en)for(let f of Object.values(l.en))r.add(f.slice(11));return r}function gs(a){let r=Rr(a);return r?zi(r,{tipo:n.protoboard.tipo,ocupados:xs(a)}):null}function Zo(a){if(Ce(a))return!1;let r=gs(a);return r?(a.x=et(a.x+r.dx),a.y=et(a.y+r.dy),a.en=Object.fromEntries(Object.entries(r.en).map(([l,f])=>[l,"protoboard."+f]))):delete a.en,se(A.get(a.id)),vo(),Et(),!!r}let Ne=[];function Ar(a){bs();let r=n.protoboard&&gs(a),l=A.get("protoboard");!r||!l||(Ne=Object.values(r.en).map(f=>l.pines.get(f).div),Ne.forEach(f=>f.classList.add("tc-destino")))}function bs(){Ne.forEach(a=>a.classList.remove("tc-destino")),Ne=[]}function vo(){let a=A.get("protoboard");if(!a)return;let r=xs(null);for(let[l,f]of a.pines)f.div.classList.toggle("tc-ocupado",r.has(l))}let So=[];function ys(a){So.forEach(y=>y.classList.remove("tc-tira")),So=[];let r=A.get("protoboard");if(!a||!r)return;let[l,f]=wo(a),h=l==="protoboard"?f:null;if(!h){let y=q(l);y&&y.en&&y.en[f]&&(h=y.en[f].slice(11))}if(!h)return;let x=Ka(h);for(let[y,w]of r.pines)Ka(y)===x&&(w.div.classList.add("tc-tira"),So.push(w.div))}function Cs(a){if(a.id==="placa")for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!it.placa[r];else if(a.def===tt.led){let r=Number(it.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",it.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=it.simulando&&(it.piezas[a.id]||it.servos[a.id])||null;a.def.mostrar(a.el,r,(q(a.id)||{}).props)}}function vs(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),l=r&&xr(r.getAttribute("width")),f=r&&xr(r.getAttribute("height"));return l&&f?{w:l,h:f}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function se(a){if(!a)return;let r=bo(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let l of a.pines.values()){let f=Qo(a,r,l);l.div.style.left=f.x+"px",l.div.style.top=f.y+"px"}}function Qo(a,r,l){let f=((r.rot||0)%360+360)%360;if(!f)return{x:r.x+l.px,y:r.y+l.py};let h=f*Math.PI/180,x=Math.round(Math.cos(h)*1e9)/1e9,y=Math.round(Math.sin(h)*1e9)/1e9,w=a.w/2,R=a.h/2,D=l.px-w,G=l.py-R;return{x:et(r.x+w+D*x-G*y),y:et(r.y+R+D*y+G*x)}}function wo(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function qt(a){let[r,l]=wo(a),f=A.get(r);if(!f||!f.lista)return null;let h=bo(r),x=f.pines.get(l);return x?Qo(f,h,x):f.def?null:{x:h.x+f.w/2,y:h.y+f.h/2}}function _r(a){let[r,l]=wo(a),f=A.get(r);return f&&f.pines.get(l)}function $o(a){let r=qt(a.de),l=qt(a.a);return!r||!l?null:[r,...(a.puntos||[]).map(([f,h])=>({x:f,y:h})),l]}function ie(a,r,l){let f=document.createElementNS(dr,a);for(let h in r)f.setAttribute(h,r[h]);return l.appendChild(f),f}function Et(){for(let[a,r]of L)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(l=>l.remove()),L.delete(a));n.cables.forEach((a,r)=>{let l=L.get(a);if(!l){let R=ie("g",{class:"tc-cable"},P);l={g:R,borde:ie("path",{class:"tc-cable-borde"},R),linea:ie("path",{class:"tc-cable-linea"},R),p0:ie("circle",{class:"tc-punta",r:2.4},R),p1:ie("circle",{class:"tc-punta",r:2.4},R),toque:ie("path",{class:"tc-cable-toque"},R),asas:[]},L.set(a,l)}let f=$o(a);if(l.g.style.display=f?"":"none",!f)return;let h=ls(f),x=cs(a.color);for(let R of[l.borde,l.linea,l.toque])R.setAttribute("d",h);l.linea.setAttribute("stroke",x),l.toque.dataset.i=r,Ss(l.p0,f[0],x),Ss(l.p1,f[f.length-1],x);let y=!!(v&&v.tipo==="cable"&&v.cable===a);l.g.classList.toggle("tc-seleccionado",y),y&&P.lastChild!==l.g&&P.appendChild(l.g);let w=y?(a.puntos||[]).length:0;for(;l.asas.length>w;)l.asas.pop().remove();for(;l.asas.length<w;)l.asas.push(ie("circle",{class:"tc-asa",r:3.6},X));l.asas.forEach((R,D)=>{R.setAttribute("cx",a.puntos[D][0]),R.setAttribute("cy",a.puntos[D][1]),R.dataset.i=r,R.dataset.p=D})})}function Ss(a,r,l){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",l)}function ve(){let a=T&&qt(T.de);if(!a){pt.setAttribute("d",""),ft.setAttribute("d","");return}let r=T.puntos.map(y=>({...y})),l=r.length?r[r.length-1]:a,f=T.cursor?Ro(T.cursor,l):l,h=T.destino&&qt(T.destino);h&&(f=h,$s(r,a,h));let x=ls([a,...r,f]);pt.setAttribute("d",x),ft.setAttribute("d",x),ft.setAttribute("stroke",cs(ws()))}function ws(){return T.color||Ga(T.de,T.destino||"")}function Ro(a,r){let l=hr/S.escala;return{x:et(Math.abs(a.x-r.x)<l?r.x:a.x),y:et(Math.abs(a.y-r.y)<l?r.y:a.y)}}function $s(a,r,l){if(!a.length)return;let f=hr/S.escala,h=a[a.length-1],x=a.length>1?a[a.length-2]:r;Math.abs(h.y-l.y)<f&&h.y!==x.y&&(h.y=l.y),Math.abs(h.x-l.x)<f&&h.x!==x.x&&(h.x=l.x)}function Er(a){$t(null),T={de:a,puntos:[],cursor:null,destino:null,color:null},g.classList.add("tc-dibujando"),_s(a,!0),ve(),Ao(),Tt()}function ta(){T&&(_s(T.de,!1),T=null,g.classList.remove("tc-dibujando"),ve(),Ao(),Tt())}function Rs(a){if(Ie[a]){if(T)T.color=a,ve();else if(v&&v.tipo==="cable"){if(v.cable.color===a)return;v.cable.color=a,Et(),ht()}else return;Ao()}}function As(a){let r=T;if(!r)return;if(a===r.de)return ta();let l=qt(r.de),f=qt(a);if(l&&f&&$s(r.puntos,l,f),ta(),n.cables.some(x=>x.de===r.de&&x.a===a||x.de===a&&x.a===r.de)){Nr("Esos dos pines ya est\xE1n unidos.");return}let h={de:r.de,a,color:r.color||Ga(r.de,a)};r.puntos.length&&(h.puntos=r.puntos.map(x=>[et(x.x),et(x.y)])),n.cables.push(h),xt("cable_agregado",{de:h.de,a:h.a}),$t({tipo:"cable",cable:h}),ht()}function Pr(a){let r=T.puntos.length?T.puntos[T.puntos.length-1]:qt(T.de);T.puntos.push(r?Ro(a,r):a),ve(),Tt()}function Tr(){!T||!T.puntos.length||(T.puntos.pop(),ve(),Tt())}function _s(a,r){let l=_r(a);l&&l.div.classList.toggle("tc-activo",r)}function ea(a){n.cables=n.cables.filter(r=>r!==a),xt("cable_quitado",{de:a.de,a:a.a})}function $t(a){v=a;for(let r of A.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);Et(),Ao(),Tt()}function Ao(){if(oa(),wt.textContent="",s||!v&&!T)return;let a=l=>wt.insertAdjacentHTML("beforeend",l),r=l=>Ha.forEach((f,h)=>{let x=Ie[f],y=Ni[f]||f;a(`<button type="button" class="tc-muestra${l===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${h} \xB7 ${y}" aria-label="Cable ${y} (tecla ${h})" style="background:${x};color:${Jn(x)}">${h}</button>`)});if(T){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(ws());return}if(v.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r(v.cable.color);else if(v.id==="protoboard")a(`<span class="tc-etiqueta">${(kt[n.protoboard.tipo]||kt.media).nombre}</span>`);else{let l=q(v.id),f=tt[l.tipo],h=A.get(l.id);a(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),Ce(l)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let Le=null,Pt=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function oa(){let a=v&&v.tipo==="comp"&&!T?v.id==="protoboard"?"protoboard":(q(v.id)||{}).tipo:null,r=a&&ho[a];if(U.hidden=!r||!$.hidden,!r)return U.textContent="";Le===null&&O.clientWidth&&(Le=O.clientWidth>=900);let l=Le!==!1,f=v.id==="protoboard"?null:q(v.id),h=f&&tt[f.tipo],x=f&&A.get(f.id),y="";if(f&&h&&!s){for(let w of h.campos||(h.campo?[h.campo]:[])){let R=String(f.props[w.prop]),D=w.opciones.map(([G,J])=>`<option value="${G}"${R===String(G)?" selected":""}>${J}</option>`).join("");y+=`<label class="tc-campo">${w.etiqueta} <select data-prop="${w.prop}">${D}</select></label>`}if(h.perilla){let w=Math.round((Number(f.props[h.perilla.prop])||0)*100);y+=`<label class="tc-campo">${h.perilla.etiqueta} <input type="range" min="0" max="100" value="${w}" data-perilla aria-label="${h.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let w=x&&x.el.value?" checked":"";y+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${w}> Ver encendido</label>`}}U.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${l}" aria-label="Ficha de ${Pt(r.nombre)}: ${l?"ocultar los detalles":"ver los detalles"}"><span>${Pt(r.nombre)}${f?` <small>${Pt(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${l?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${l||y?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${l?"":" hidden"}>${Pt(r.descripcion)}</p>`+(y?`<div class="tc-ficha-props">${y}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${l?"":" hidden"}></div></div>`,aa(),Es()}function Es(){if(U.hidden||!v)return;let a=A.get(v.id),r=v.id==="protoboard"?n.protoboard:q(v.id),l=!1;a&&r&&(l=S.px+(r.x+a.w/2)*S.escala>O.clientWidth/2),U.classList.toggle("tc-ficha-izq",l)}function aa(){let a=U.querySelector(".tc-ficha-datos");if(!a||!v)return;let r=v.id==="protoboard"?"protoboard":(q(v.id)||{}).tipo,l=ho[r];if(!l)return;let f=v.id==="protoboard"?{}:q(v.id).props||{},h=l.validacion(f);a.innerHTML=`<dl>${l.datos(f).map(([x,y])=>`<dt>${Pt(x)}</dt><dd>${Pt(y)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${Pt(l.pines)}</p>`+(h?`<p class="tc-ficha-val ${h.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${h.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${Pt(h.texto)}</p>`:"")}U.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(Le=Le===!1,oa(),U.querySelector(".tc-ficha-titulo").focus())});let Ps=!1;function Ts(){if(!Ps){Ps=!0;for(let a of ns){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let l of a.piezas){let f=ho[l],h=document.createElement("button");h.type="button",h.className="tc-pieza",h.dataset.accion=l==="protoboard"?"protoboard":"agregar",l!=="protoboard"&&(h.dataset.tipo=l),h.dataset.pieza=l,h.setAttribute("aria-label",f.nombre),h.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${Pt(f.nombre)}</b><small>${Pt(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,h.querySelector(".tc-mini").append(Mr(l)),r.append(h)}k.append(r)}}}function Mr(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=Ya("media"),r.content.firstElementChild;let l=tt[a];if(l.dibujo)return r.innerHTML=l.dibujo.svg(a==="motor_tt"?{...l.props,vista:"rueda"}:l.props),r.content.firstElementChild;let f=document.createElement(l.etiqueta);return l.aplicar&&l.aplicar(f,Bt(l.props)),Promise.resolve(f.updateComplete).then(()=>{let h=vs(f);f.style.zoom=String(Math.min(1,58/h.w,42/h.h))}),f.inert=!0,f}function Ms(){let a=new Set(lr(_.value).map(r=>r.tipo));for(let r of k.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of k.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");W.hidden=a.size>0,W.textContent=a.size?"":`No hay piezas con \xAB${_.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}_.addEventListener("input",Ms),_.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=k.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let yt=null,sa=!1;$.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||s||a.button!==0||(yt={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),$.addEventListener("pointermove",a=>{if(!yt)return;if(!yt.fantasma){if(Math.hypot(a.clientX-yt.x0,a.clientY-yt.y0)<fr)return;let l=document.createElement("div");l.className="tc-fantasma",l.append(yt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),g.append(l),yt.fantasma=l,$.classList.add("tc-arrastrando")}let r=g.getBoundingClientRect();yt.fantasma.style.left=a.clientX-r.left+"px",yt.fantasma.style.top=a.clientY-r.top+"px"});function Is(a,r){if(!yt)return;let{b:l,fantasma:f}=yt;if(yt=null,$.classList.remove("tc-arrastrando"),!f||(f.remove(),sa=!0,setTimeout(()=>sa=!1,0),r))return;let h=O.getBoundingClientRect(),x=$.getBoundingClientRect(),y=w=>a.clientX>=w.left&&a.clientX<=w.right&&a.clientY>=w.top&&a.clientY<=w.bottom;!y(h)||y(x)||(je(!1),l.dataset.accion==="protoboard"?ms(Fe(a)):Ds(l.dataset.tipo,Fe(a)))}$.addEventListener("pointerup",a=>Is(a,!1)),$.addEventListener("pointercancel",a=>Is(a,!0));function Ds(a,r=null){let l=tt[a];if(!l)return;let f=1;for(;q(l.prefijo+f);)f++;let h=l.prefijo+f,x=(O.clientWidth/2-S.px)/S.escala,y=(O.clientHeight/2-S.py)/S.escala,w=n.componentes.length%4*14,R={id:h,tipo:a,x:l.montada?0:Math.round(x-20+w),y:l.montada?0:Math.round(y-20+w),rot:0,props:Bt(l.props)};n.componentes.push(R),yo(h,a,R.props).then(()=>{let D=A.get(h);r&&D&&!l.montada&&q(h)===R&&(R.x=Math.round(r.x-D.w/2),R.y=Math.round(r.y-D.h/2),se(D),Et(),ht()),n.protoboard&&q(h)===R&&Zo(R)&&(xt("componente_cambiado",{id:h,x:R.x,y:R.y,en:Bt(R.en)}),ht())}),xt("componente_agregado",{id:h,tipo:a}),$t({tipo:"comp",id:h}),ht()}function Ir(a){let r=A.get(a.id);if(r){r.div.remove();for(let l of r.pines.values())l.div.remove();A.delete(a.id)}yo(a.id,a.tipo,a.props).then(()=>{Et(),v&&v.id===a.id&&$t({tipo:"comp",id:a.id})})}function ks(){if(!v||v.tipo!=="comp"||v.id==="protoboard")return;let a=q(v.id);Ce(a)||(a.rot=((a.rot||0)+90)%360,se(A.get(a.id)),n.protoboard&&Zo(a),Et(),xt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Bt(a.en):null}),ht())}function Os(){if(v){if(v.tipo==="cable")ea(v.cable);else if(v.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>ea(r));for(let r of n.componentes)delete r.en;n.protoboard=null;let a=A.get("protoboard");a&&(a.div.remove(),A.delete("protoboard")),So=[],Ne=[],Co(),xt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=q(v.id),r=A.get(v.id);if(n.cables.filter(l=>l.de.startsWith(a.id+".")||l.a.startsWith(a.id+".")).forEach(l=>ea(l)),n.componentes=n.componentes.filter(l=>l!==a),r){r.div.remove();for(let l of r.pines.values())l.div.remove();A.delete(a.id)}xt("componente_quitado",{id:a.id,tipo:a.tipo}),vo()}Po(),$t(null),ht()}}function je(a){$.hidden=!a,oa(),B.setAttribute("aria-expanded",String(a)),a&&(Ts(),Co(),Ms(),_.focus({preventScroll:!0}))}$.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||sa)){if(je(!1),r.dataset.accion==="cerrar")return B.focus();Bs(r)}}),$.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),je(!1),B.focus())}),d.addEventListener("pointerdown",a=>{!$.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==B&&je(!1)}),b.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return je($.hidden);Bs(r)}});function Bs(a){let r=a.dataset.accion;if(r==="acercar")return ra(1.25);if(r==="alejar")return ra(.8);if(r==="encuadrar")return Ve=!1,ze();s||(r==="agregar"?Ds(a.dataset.tipo):r==="protoboard"?ms():r==="girar"?ks():r==="borrar"?Os():r==="color"&&(Rs(a.dataset.color),O.focus({preventScroll:!0})))}function Dr(a){if(s||!v||v.tipo!=="comp")return;let r=q(v.id),l=A.get(v.id),f=tt[r.tipo];if(a.target.dataset.accion==="encender"){l.el.value=a.target.checked;return}let h=a.target.dataset.prop;if(!h||!f)return;let x=typeof f.props[h],y=x==="number"?Number(a.target.value):x==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[h]:y},f.dibujo&&f.dibujo.marco?Ir(r):f.aplicar(l.el,r.props),aa(),xt("componente_cambiado",{id:r.id,props:Bt(r.props)}),ht()}function kr(a){if(s||!v||v.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=A.get(v.id);Vs(v.id,Number(a.target.value)/100),r&&tt.potenciometro.aplicar(r.el,q(v.id).props)}for(let a of[b,U])a.addEventListener("change",Dr),a.addEventListener("input",kr);function We(a,r,l){let f=A.get(a);if(f&&(f.el.pressed=r),r)Yo.add(a);else if(!Yo.delete(a))return;for(let h of fs)try{h(a,r)}catch(x){console.error(x)}!r&&l!==void 0&&xt("boton_pulsado",{id:a,ms:Math.round(l)})}let Us=new Map;function Vs(a,r){let l=q(a),f=A.get(a);if(!l)return;let h=tt[l.tipo];if(s)return f&&h.aplicar(f.el,l.props);let x=Math.max(0,Math.min(1,Math.round(r*100)/100));if(x===l.props[h.perilla.prop])return;l.props={...l.props,[h.perilla.prop]:x};let y=v&&v.tipo==="comp"&&v.id===a&&U.querySelector("[data-perilla]");y&&Number(y.value)!==Math.round(x*100)&&(y.value=Math.round(x*100)),v&&v.id===a&&aa(),ht(),clearTimeout(Us.get(a)),Us.set(a,setTimeout(()=>xt("componente_cambiado",{id:a,props:Bt(l.props)}),400))}function Fe(a){let r=O.getBoundingClientRect();return{x:(a.clientX-r.left-S.px)/S.escala,y:(a.clientY-r.top-S.py)/S.escala}}function ia(a){try{O.setPointerCapture(a.pointerId)}catch{}}function _o(a,r={}){I={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:S.px,py0:S.py,movido:!1,...r},ia(a)}O.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;O.focus({preventScroll:!0}),Po();let r=a.target,l=Fe(a);if(s)return _o(a);let f=r.closest(".tc-pin");if(f){if(a.preventDefault(),T)return As(f.dataset.ref);Er(f.dataset.ref),I={tipo:"pin",ref:f.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(T)return _o(a,{punto:l});let h=r.closest(".tc-asa");if(h)return I={tipo:"asa",cable:n.cables[+h.dataset.i],k:+h.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},ia(a);let x=r.closest(".tc-cable-toque");if(x)return $t({tipo:"cable",cable:n.cables[+x.dataset.i]});let y=r.closest(".tc-comp");if(y&&y.dataset.id!=="placa"){let w=y.dataset.id,R=go(w);if(R.tipo==="pulsador"&&(a.preventDefault(),it.simulando)){We(w,!0),I={tipo:"pulsar",id:w,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}return $t({tipo:"comp",id:w}),Ce(R)?_o(a):tt[R.tipo]&&tt[R.tipo].perilla&&a.composedPath().some(Qn)?void 0:(I={tipo:"mover",id:w,dx:l.x-R.x,dy:l.y-R.y,x0:a.clientX,y0:a.clientY,movido:!1},ia(a))}$t(null),_o(a)}),O.addEventListener("pointermove",a=>{let r=Fe(a);if(I&&I.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${I.id}"]`))){let l=I;I=null,We(l.id,!1,performance.now()-l.desde)}if(I){if(!I.movido&&Math.hypot(a.clientX-I.x0,a.clientY-I.y0)>fr&&(I.movido=!0,U.classList.add("tc-ficha-quieta")),I.movido&&I.tipo==="mover"){let l=go(I.id),f=Math.round(r.x-I.dx),h=Math.round(r.y-I.dy);if(I.id==="protoboard")for(let x of n.componentes)x.en&&(x.x=et(x.x+f-l.x),x.y=et(x.y+h-l.y),se(A.get(x.id)));l.x=f,l.y=h,se(A.get(I.id)),I.id!=="protoboard"&&n.protoboard&&Ar(l),Et()}else if(I.movido&&I.tipo==="paneo")Ve=!0,S.px=I.px0+a.clientX-I.x0,S.py=I.py0+a.clientY-I.y0,O.classList.add("tc-paneando"),Eo();else if(I.movido&&I.tipo==="asa"){let l=$o(I.cable),f=Ro(r,l[I.k]);f=Ro(f,l[I.k+2]),I.cable.puntos[I.k]=[f.x,f.y],Et()}}if(T){let l=a.target.closest&&a.target.closest(".tc-pin");T.cursor=r,T.destino=l&&l.dataset.ref!==T.de?l.dataset.ref:null,ve()}(!I||I.tipo==="pin")&&Vr(a.target.closest&&a.target.closest(".tc-pin")),it.simulando&&Ns(a.target)});function Ns(a){let r=[],l=a&&a.closest&&a.closest(".tc-pin"),f=a&&a.closest&&a.closest(".tc-cable-toque");l?r=[l.dataset.ref]:f&&n.cables[+f.dataset.i]&&(r=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let h=r.join("|");if(h!==Jo){Jo=h;for(let x of hs)x(r)}}function Ls(a){let r=I;if(I=null,O.classList.remove("tc-paneando"),U.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&Es(),!!r){if(r.tipo==="pulsar")return We(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let l=go(r.id);r.id==="protoboard"?xt("componente_cambiado",{id:"protoboard",x:l.x,y:l.y}):(bs(),(n.protoboard||l.en)&&Zo(l),xt("componente_cambiado",{id:r.id,x:l.x,y:l.y,en:l.en?Bt(l.en):null})),ht()}else if(r.tipo==="asa"&&r.movido)ht();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&T)Pr(r.punto);else if(r.tipo==="pin"&&r.movido&&T&&a.type==="pointerup"){let l=d.elementFromPoint(a.clientX,a.clientY),f=l&&l.closest(".tc-pin");f&&f.dataset.ref!==r.ref&&As(f.dataset.ref)}}}O.addEventListener("pointerup",Ls),O.addEventListener("pointercancel",Ls),O.addEventListener("pointerleave",()=>{if(Po(),Jo&&Ns(null),I&&I.tipo==="pulsar"){let a=I;I=null,We(a.id,!1,performance.now()-a.desde)}}),O.addEventListener("dblclick",a=>{if(s||T)return;let r=d.elementFromPoint(a.clientX,a.clientY)||a.target,l=r.closest(".tc-asa"),f=r.closest(".tc-cable-toque");if(l){let h=n.cables[+l.dataset.i];h.puntos.splice(+l.dataset.p,1),h.puntos.length||delete h.puntos,Et(),Tt(),ht()}else if(f){let h=n.cables[+f.dataset.i],x=$o(h),y=Fe(a),w=0,R=y,D=1/0;for(let G=0;G<x.length-1;G++){let J=Zn(y,x[G],x[G+1]);uo(y,J)<D&&(D=uo(y,J),w=G,R=J)}(h.puntos=h.puntos||[]).splice(w,0,[et(R.x),et(R.y)]),$t({tipo:"cable",cable:h}),ht()}}),O.addEventListener("wheel",a=>{a.preventDefault();let r=O.getBoundingClientRect(),l=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));ra(l,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),g.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,l=!0;a.key==="Escape"?T?ta():$t(null):s?l=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),T?Tr():Os()):(a.key==="r"||a.key==="R")&&r?ks():/^[0-9]$/.test(a.key)&&r&&(T||v&&v.tipo==="cable")?Rs(Ha[Number(a.key)]):l=!1,l&&a.stopPropagation()});function Eo(){ut.style.transform=`translate(${S.px}px, ${S.py}px) scale(${S.escala})`;let a=Gn*S.escala;O.style.backgroundSize=`${a}px ${a}px`,O.style.backgroundPosition=`${S.px}px ${S.py}px`,Po()}function ra(a,r,l){Ve=!0,r===void 0&&(r=O.clientWidth/2,l=O.clientHeight/2);let f=Math.min(qn,Math.max(ur,S.escala*a)),h=(r-S.px)/S.escala,x=(l-S.py)/S.escala;Object.assign(S,{escala:f,px:r-h*f,py:l-x*f}),Eo()}function na(){let a=1/0,r=1/0,l=-1/0,f=-1/0,h=(x,y)=>{a=Math.min(a,x),r=Math.min(r,y),l=Math.max(l,x),f=Math.max(f,y)};for(let x of A.values()){let y=bo(x.id);if(!y)continue;let w=(y.rot||0)%180!==0,R=(w?x.h:x.w)/2,D=(w?x.w:x.h)/2;h(y.x+x.w/2-R,y.y+x.h/2-D),h(y.x+x.w/2+R,y.y+x.h/2+D)}for(let x of n.cables)for(let[y,w]of x.puntos||[])h(y,w);return isFinite(a)?{x0:a,y0:r,x1:l,y1:f}:null}function ze(){let a=O.clientWidth,r=O.clientHeight;if(!a||!r)return!1;let l=na();if(!l)return!1;let{x0:f,y0:h,x1:x,y1:y}=l,w=48,R=Math.min((a-2*w)/(x-f||1),(r-2*w)/(y-h||1)),D=Math.min(2.4,Math.max(ur,R));return Object.assign(S,{escala:D,px:a/2-(f+x)/2*D,py:r/2-(h+y)/2*D}),xo={ancho:a,alto:r},Eo(),!0}function Or(){let a=na()||{x0:0,y0:0,x1:100,y1:100},r=12,l=16,f=Math.max(Hn,Math.ceil(a.x1-a.x0+2*r)),h=Math.ceil(a.y1-a.y0+2*r)+l,x=[`<svg xmlns="${dr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${h}" viewBox="0 0 ${f} ${h}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${h}" fill="#ffffff"/>`,`<g transform="translate(${et(r-a.x0)} ${et(r-a.y0)})">`];for(let y of st.children){let w=A.get(y.dataset.id);w&&w.lista&&x.push(Br(w))}for(let y of n.cables){let w=$o(y);if(!w)continue;let R=ls(w),D=cs(y.color),G=J=>`<circle cx="${J.x}" cy="${J.y}" r="2.4" fill="${D}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;x.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${R}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${R}" stroke="${D}" stroke-width="3"/>${G(w[0])}${G(w[w.length-1])}</g>`)}return x.push("</g>",`<text x="${f-r}" y="${h-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${mr(zn)}</text>`,"</svg>"),x.join(`
`)}function Br(a){let r=bo(a.id);if(!r)return"";let l=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let re=mr((q(a.id)||{}).tipo||"");return`<g transform="${l}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${re}?</text></g>`}let f=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!f)return"";let h=f.cloneNode(!0),x=[],y=document.createTreeWalker(h,NodeFilter.SHOW_COMMENT);for(;y.nextNode();)x.push(y.currentNode);x.forEach(re=>re.remove());let w=/--knob-angle:\s*(-?[\d.]+)deg/.exec(h.getAttribute("style")||""),R=h.querySelector("#rotating");w&&R&&R.setAttribute("transform",`rotate(${w[1]} 10 8)`),h.setAttribute("width",et(a.w)),h.setAttribute("height",et(a.h)),h.removeAttribute("id");let D="tc-"+a.id,G=[...new Set([...h.querySelectorAll("[id]")].map(re=>re.id))],J=new XMLSerializer().serializeToString(h);for(let re of G)J=Kn(J,re,D);J=J.replace(/^<svg\b/,`<svg id="${D}"`);let Fs=a.el.shadowRoot?Yn(a.el,D,G):"";return`<g transform="${l}">${Fs?`<style><![CDATA[
${Fs}
]]></style>`:""}${J}</g>`}function Ur(a){let[r,l]=wo(a);if(r==="placa")return De[o].rotulo(l);if(r==="protoboard")return Fi(l);let f=q(r),h=f&&tt[f.tipo],x=f&&f.en&&f.en[l]?` \xB7 en el hueco ${f.en[l].slice(11)}`:"";return h?`${h.nombre}: ${h.rotulo(l)}${x}`:l}function Vr(a){let r=a?a.dataset.ref:null;if(r===mo)return;mo=r,ys(r);let l=r&&qt(r);if(!l){m.hidden=!0;return}let f=S.py+l.y*S.escala,h=it.voltajes[r],x=h===void 0?"":h===null?" \xB7 al aire":` \xB7 ${h.toFixed(2).replace(".",",")} V`;m.textContent=Ur(r)+x,m.style.left=S.px+l.x*S.escala+"px",m.style.top=f+"px",m.classList.toggle("tc-abajo",f<44),m.hidden=!1}function Po(){mo=null,m.hidden=!0,ys(null)}function Tt(){clearTimeout(qo),Nt.classList.remove("tc-aviso");let a=v&&v.tipo==="cable"&&v.cable.puntos&&v.cable.puntos.length;Nt.textContent=s?"Solo lectura: puedes mover la vista y hacer zoom.":T?T.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":v&&v.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":v&&Ce(q(v.id))?"Va montada sobre el Uno: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla":v&&v.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":v&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":v?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":it.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function Nr(a){Tt(),Nt.textContent=a,Nt.classList.add("tc-aviso"),qo=setTimeout(Tt,2500)}function xt(a,r){if(i)try{i({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(l){console.error(l)}}function ht(){let a=Bt(n);for(let r of c)try{r(a)}catch(l){console.error(l)}}function js(a){g.classList.toggle("tc-oscuro",a==="oscuro"),g.classList.toggle("tc-claro",a==="claro")}let Lr={circuito:()=>Bt(n),alCambiar(a){typeof a=="function"&&c.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:js,exportarSVG:Or,exportarNetlist:a=>Yi(n,a),_alPulsar(a){typeof a=="function"&&fs.push(a)},_alAcercar(a){typeof a=="function"&&hs.push(a)},_mostrar(a){let r=it.simulando;it={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==it.simulando&&(g.classList.toggle("tc-simulando",it.simulando),it.simulando||[...Yo].forEach(l=>We(l,!1)),Tt()),mo=null;for(let l of A.values())l.lista&&Cs(l)},destruir(){Ko=!0,Ws.disconnect(),clearTimeout(qo),c.length=0,A.clear(),L.clear(),p.remove()}};e.tema&&js(e.tema),s&&g.classList.add("tc-solo-lectura"),Eo(),Tt();let Ws=new ResizeObserver(()=>{if(!ps||Ko)return;if(!Xo){Xo=ze();return}if(Ve||!xo)return;let a=(r,l)=>Math.abs(r-l)/Math.max(1,l);(a(O.clientWidth,xo.ancho)>.1||a(O.clientHeight,xo.alto)>.1)&&ze()});Ws.observe(O);let jr=yo("placa");return s||Ts(),Co(),Promise.all([jr,...n.protoboard?[us()]:[],...n.componentes.map(a=>yo(a.id,a.tipo,a.props))]).then(()=>{Ko||(ps=!0,vo(),Et(),Xo=ze())}),Lr}function Xn(t,e){let o=t&&typeof t=="object"?Bt(t):{};o.formato=o.formato||1,o.placa=e;let s=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!s.has(i.id)&&s.add(i.id));for(let i of o.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let c=tt[i.tipo]?tt[i.tipo].props:{};i.props={...c,...i.props&&typeof i.props=="object"?i.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of o.cables){let c=Array.isArray(i.puntos)&&i.puntos.every(n=>Array.isArray(n)&&n.length===2&&n.every(Number.isFinite));"puntos"in i&&!c&&delete i.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let i of o.componentes){let c=o.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(n=>typeof n=="string"&&n.startsWith("protoboard."));"en"in i&&!c&&delete i.en}return o}var yr=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),mr=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function Kn(t,e,o){let s=yr(e),i=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${s}"`,"g"),(c,n)=>`${n}id="${i}"`).replace(new RegExp(`url\\(#${s}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${s}"`,"g"),()=>`href="#${i}"`)}function Yn(t,e,o){let s=t.shadowRoot,i=[...s.adoptedStyleSheets||[]];s.querySelectorAll("style").forEach(n=>n.sheet&&i.push(n.sheet));let c=[];for(let n of i){let p;try{p=n.cssRules}catch{continue}for(let d of p){if(!d.selectorText||!d.style)continue;let u=d.selectorText.split(",").map(b=>b.trim()).filter(b=>!/:host|\binput\b|:focus|\.hide-input/.test(b));if(!u.length)continue;let g=u.map(b=>{let $=b;for(let _ of o)$=$.replace(new RegExp(`#${yr(_)}(?![\\w-])`,"g"),()=>`#${e}-${_}`);return/^svg\b/.test($)?$.replace(/^svg\b/,`#${e}`):`#${e} ${$}`});c.push(`${g.join(", ")} { ${d.style.cssText} }`)}}return c.join(`
`)}function Jn(t){let[e,o,s]=[1,3,5].map(i=>parseInt(t.slice(i,i+2),16)/255);return .2126*e+.7152*o+.0722*s>.55?"#1d2733":"#ffffff"}function xr(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function ls(t){let e=s=>`${et(s.x)} ${et(s.y)}`,o=`M${e(t[0])}`;for(let s=1;s<t.length-1;s++){let i=t[s-1],c=t[s],n=t[s+1],p=Math.min(5,uo(i,c)/2,uo(c,n)/2);o+=` L${e(gr(c,i,p))} Q${e(c)} ${e(gr(c,n,p))}`}return`${o} L${e(t[t.length-1])}`}function gr(t,e,o){let s=uo(t,e);return s?{x:t.x+(e.x-t.x)*o/s,y:t.y+(e.y-t.y)*o/s}:t}function Zn(t,e,o){let s=o.x-e.x,i=o.y-e.y,c=s*s+i*i,n=c?Math.max(0,Math.min(1,((t.x-e.x)*s+(t.y-e.y)*i)/c)):0;return{x:e.x+n*s,y:e.y+n*i}}function Qn(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}function Cr(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[i,c]of String(t).split(/\r?\n/).entries()){let n=c.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let p=n.slice(1).match(/../g).map(_=>parseInt(_,16));if(p.reduce((_,k)=>_+k,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[d,u,g,b]=p,$=p.slice(4,4+d);if(b===0){let _=o+(u<<8|g);if(_+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set($,_)}else if(b===1){s=!0;break}else b===2?o=($[0]<<8|$[1])<<4:b===4&&(o=($[0]<<8|$[1])<<16)}if(!s)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var tc=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],ds='(()=>{function we(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var vo=256,_o=128,te=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+vo),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(_o),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,i=255){let o=this.writeHooks[e];o&&o(s,this.data[e],e,i)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:i,enableRegister:o,enableMask:a}=e;e.inverseFlag?this.data[s]&=~i:this.data[s]|=i,this.data[o]&a&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:i,flagRegister:o,flagMask:a,inverseFlag:n}=e;if(s&i){let r=this.data[o]&a;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:i},o=!0){o&&(this.data[s]&=~i);let{pendingInterrupts:a,maxInterrupt:n}=this;if(a[e]&&(a[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(a[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:i,flagMask:o}=e;s&o&&(this.data[i]&=~o,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:i}=this;s=this.cycles+Math.max(1,s);let o=i.pop(),a=o??{cycles:s,callback:e,next:null};a.cycles=s,a.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<s;)r=n,n=n.next;return r?(r.next=a,a.next=n):(this.nextClockEvent=a,a.next=n),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:i}=this,o=null;for(;s;){if(s.callback===e)return o?o.next=s.next:this.nextClockEvent=s.next,i.length<10&&i.push(s),!0;o=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let i=this.pendingInterrupts[s];we(this,i.address),i.constant||this.clearInterrupt(i)}}};function ee(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Me(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i+(t.data[95]&1),a=o&255;t.data[(e&496)>>4]=a;let n=t.data[95]&192;n|=a?0:2,n|=128&a?4:0,n|=(a^i)&(s^a)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=o&256?1:0,n|=1&(s&i|i&~a|~a&s)?32:0,t.data[95]=n}else if((e&64512)===3072){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i&255;t.data[(e&496)>>4]=o;let a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=(o^i)&(o^s)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=s+i&256?1:0,a|=1&(s&i|i&~o|~o&s)?32:0,t.data[95]=a}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=i+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,o,!0);let a=t.data[95]&224;a|=o?0:2,a|=32768&o?4:0,a|=~i&o&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=~o&i&32768?1:0,t.data[95]=a,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65039)===37893){let s=t.data[(e&496)>>4],i=s>>>1|128&s;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,i=(e&496)>>4;t.data[i]=~(1<<s)&t.data[i]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],i=e&7;t.data[95]=t.data[95]&191|(s>>i&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,i=t.pc+2,o=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,a&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(a?3:2),!0),t.pc=s-1,t.cycles+=a?4:3}else if((e&65280)===38912){let s=e&248,i=e&7,o=t.readData((s>>3)+32),a=1<<i;t.writeData((s>>3)+32,o&~a,a)}else if((e&65039)===37888){let s=(e&496)>>4,i=255-t.data[s];t.data[s]=i;let o=t.data[95]&225|1;o|=i?0:2,o|=128&i?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===5120){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i,a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=((s^i)&(s^o)&128)!==0?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i>s?1:0,a|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=a}else if((e&64512)===1024){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],a=s-i-(o&1);o=o&192|(!a&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&a?4:0,o|=(s^i)&(s^a)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=o}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i,a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=(s^i)&(s^o)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i>s?1:0,a|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=a}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],i=ee(s)?2:1;t.pc+=i,t.cycles+=i}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],i=s-1;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===128?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if(e===38169){let s=t.pc+1,i=t.dataView.getUint16(93,!0),o=t.data[92];t.data[i]=s&255,t.data[i-1]=s>>8&255,t.data[i-2]=s>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],i=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|i],t.dataView.setUint16(30,i+1,!0),i===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.dataView.getInt8((e&7)+16),o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?2:0)|(s*i&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:o}=t;t.data[i]=s&255,t.data[i-1]=s>>8&255,o&&(t.data[i-2]=s>>16&255),t.dataView.setUint16(93,i-(o?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=o?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],i=s+1&255;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===127?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o&255-i),t.data[s]=o}else if((e&65039)===37381){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o|i),t.data[s]=o}else if((e&65039)===37383){let s=t.data[(e&496)>>4],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^i),t.data[(e&496)>>4]=i}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],i=s>>>1;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),i=2*((e&240)>>4);t.data[i]=t.data[s],t.data[i+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,i=t.data[s],o=0-i;t.data[s]=o;let a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=o===128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o?1:0,a|=1&(o|i)?32:0,t.data[95]=a}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),i=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,a&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(a?3:2),!0),t.pc+=s,t.cycles+=a?3:2}else if(e===38152){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],i=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=1&s?1:0,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===2048){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],a=s-i-(o&1);t.data[(e&496)>>4]=a,o=o&192|(!a&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&a?4:0,o|=(s^i)&(s^a)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=o}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=t.data[95],a=s-i-(o&1);t.data[((e&240)>>4)+16]=a,o=o&192|(!a&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&a?4:0,o|=(s^i)&(s^a)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&a|a&~s)?32:0,t.data[95]=o}else if((e&65280)===39424){let s=((e&248)>>3)+32,i=1<<(e&7);t.writeData(s,t.readData(s)|i,i),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let i=t.progMem[t.pc+1],o=ee(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let i=t.progMem[t.pc+1],o=ee(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=e&15|(e&192)>>2,a=i-o;t.dataView.setUint16(s,a,!0);let n=t.data[95]&192;n|=a?0:2,n|=32768&a?4:0,n|=i&~a&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=o>i?1:0,n|=1&(~i&o|o&a|a&~i)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],i=ee(s)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],i=ee(s)?2:1;t.cycles+=i,t.pc+=i}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],i=t.progMem[t.pc+1];t.writeData(i,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.writeData(i,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0);t.writeData(i,s),t.dataView.setUint16(28,i+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i;t.data[(e&496)>>4]=o;let a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=(s^i)&(s^o)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i>s?1:0,a|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=a}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i;t.data[((e&240)>>4)+16]=o;let a=t.data[95]&192;a|=o?0:2,a|=128&o?4:0,a|=(s^i)&(s^o)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=i>s?1:0,a|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=a}else if((e&65039)===37890){let s=(e&496)>>4,i=t.data[s];t.data[s]=(15&i)<<4|(240&i)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,i=t.data[s],o=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=i,t.data[s]=o}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var at;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(at||(at={}));var j;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(j||(j={}));var ps={0:{type:j.SingleEnded,channel:0},1:{type:j.SingleEnded,channel:1},2:{type:j.SingleEnded,channel:2},3:{type:j.SingleEnded,channel:3},4:{type:j.SingleEnded,channel:4},5:{type:j.SingleEnded,channel:5},6:{type:j.SingleEnded,channel:6},7:{type:j.SingleEnded,channel:7},8:{type:j.Temperature},14:{type:j.Constant,voltage:1.1},15:{type:j.Constant,voltage:0}},ko={type:j.Constant,voltage:0},Pe={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:ps,adcReferences:[at.AREF,at.AVCC,at.Reserved,at.Internal1V1]},Uo=7,Oo=8,Bo=16,us=64,ye=128,Vo=31,No=32,Fo=8,Wo=8,Lo=3,jo=6,se=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=i=>{var o;let a=0;switch(i.type){case j.Constant:a=i.voltage;break;case j.SingleEnded:a=(o=this.channelValues[i.channel])!==null&&o!==void 0?o:0;break;case j.Differential:a=i.gain*((this.channelValues[i.positiveChannel]||0)-(this.channelValues[i.negativeChannel]||0));break;case j.Temperature:a=.378125;break}let n=a/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:Bo,enableRegister:this.config.ADCSRA,enableMask:Oo},e.writeHooks[s.ADCSRA]=(i,o)=>{var a;if(i&ye&&!(o&ye)&&(this.conversionCycles=25),e.data[s.ADCSRA]=i,e.updateInterruptEnable(this.ADC,i),!this.converting&&i&us){if(!(i&ye))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&Vo;e.data[s.ADCSRB]&Fo&&(n|=32),n&=s.muxInputMask;let r=(a=s.muxChannels[n])!==null&&a!==void 0?a:ko;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:i,ADMUX:o,ADCSRA:a}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[o]&No?(this.cpu.data[s]=e<<6&255,this.cpu.data[i]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[i]=e>>8&3),this.cpu.data[a]&=~us,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&Uo){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:i}=this.config,o=this.cpu.data[s]>>jo&Lo;return i.length>4&&this.cpu.data[s]&Wo&&(o|=4),(e=i[o])!==null&&e!==void 0?e:at.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case at.AVCC:return this.avcc;case at.AREF:return this.aref;case at.Internal1V1:return 1.1;case at.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var Ho=2,Go=4,qo=8,Ko=16,zo=32,la=Ho|Go|qo|Ko|zo;var ms={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},gs={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Cs={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Ss={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Rs={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var kt={PIN:35,DDR:36,PORT:37,pinChange:Cs,externalInterrupts:[]},Ee={PIN:38,DDR:39,PORT:40,pinChange:Ss,externalInterrupts:[]},bt={PIN:41,DDR:42,PORT:43,pinChange:Rs,externalInterrupts:[null,null,ms,gs]};var K;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(K||(K={}));var N;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(N||(N={}));var _t;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(_t||(_t={}));var oe=class{constructor(e,s){var i,o,a,n;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=u=>{let E=e.data[s.PORT];return e.data[s.DDR]=u,this.writeGpio(E,u),this.updatePinRegister(u),!0},e.writeHooks[s.PORT]=u=>{let E=e.data[s.DDR];return e.data[s.PORT]=u,this.writeGpio(u,E),this.updatePinRegister(E),!0},e.writeHooks[s.PIN]=(u,E,T,R)=>{let I=e.data[s.PORT],k=e.data[s.DDR],O=I^u&R;return e.data[s.PORT]=O,this.writeGpio(O,k),this.updatePinRegister(k),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(u=>u?{address:u.interrupt,flagRegister:u.EIFR,flagMask:1<<u.index,enableRegister:u.EIMSK,enableMask:1<<u.index}:null);let l=new Set(r.map(u=>u?.EICR));for(let u of l)this.attachInterruptHook(u||0);let g=(o=(i=r.find(u=>u&&u.EIMSK))===null||i===void 0?void 0:i.EIMSK)!==null&&o!==void 0?o:0;this.attachInterruptHook(g,"mask");let x=(n=(a=r.find(u=>u&&u.EIFR))===null||a===void 0?void 0:a.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(x,"flag");let{pinChange:A}=s;if(this.PCINT=A?{address:A.pinChangeInterrupt,flagRegister:A.PCIFR,flagMask:1<<A.PCIE,enableRegister:A.PCICR,enableMask:1<<A.PCIE}:null,A){let{PCIFR:u,PCMSK:E}=A;e.writeHooks[u]=T=>{for(let R of this.cpu.gpioPorts){let{PCINT:I}=R;I&&e.clearInterruptByFlag(I,T)}return!0},e.writeHooks[E]=T=>{e.data[E]=T;for(let R of this.cpu.gpioPorts){let{PCINT:I}=R;I&&e.updateInterruptEnable(I,T)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],o=1<<e,a=i&o?K.InputPullUp:K.Input,n=this.openCollector&o?a:K.High;return s&o?this.lastValue&o?n:K.Low:a}setPin(e,s){let i=1<<e;this.pinValue&=~i,s&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:i,portConfig:o}=this,a=1<<e;if(s===N.None)this.overrideMask|=a,this.overrideValue&=~a;else switch(this.overrideMask&=~a,s){case N.Enable:this.overrideValue&=~a,this.overrideValue|=i.data[o.PORT]&a;break;case N.Set:this.overrideValue|=a;break;case N.Clear:this.overrideValue&=~a;break;case N.Toggle:this.overrideValue^=a;break}let n=i.data[o.DDR];this.writeGpio(i.data[o.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var s,i;let o=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=o,this.lastPin!==o){for(let a=0;a<8;a++)if((o&1<<a)!==(this.lastPin&1<<a)){let n=!!(o&1<<a);this.toggleInterrupt(a,n),(i=(s=this.externalClockListeners)[a])===null||i===void 0||i.call(s,n)}this.lastPin=o}}toggleInterrupt(e,s){let{cpu:i,portConfig:o,externalInts:a,PCINT:n}=this,{externalInterrupts:r,pinChange:l}=o,g=r[e],x=a[e];if(x&&g){let{EIMSK:A,index:u,EICR:E,iscOffset:T}=g;if(i.data[A]&1<<u){let R=i.data[E]>>T&3,I=!1;switch(x.constant=!1,R){case _t.LowLevel:I=!s,x.constant=!0;break;case _t.Change:I=!0;break;case _t.FallingEdge:I=!s;break;case _t.RisingEdge:I=s;break}I?i.setInterruptFlag(x):x.constant&&i.clearInterrupt(x,!0)}}if(l&&n&&l.mask&1<<e){let{PCMSK:A}=l;i.data[A]&1<<e+l.offset&&i.setInterruptFlag(n)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:i}=this;i.writeHooks[e]=o=>{s!=="flag"&&(i.data[e]=o);for(let a of i.gpioPorts){for(let n of a.externalInts)n&&s==="mask"&&i.updateInterruptEnable(n,o),n&&!n.constant&&s==="flag"&&i.clearInterruptByFlag(n,o);a.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let i=0;i<8;i++){let o=s[i];if(!o)continue;let a=!!(this.lastPin&1<<i),{EIFR:n,EIMSK:r,index:l,EICR:g,iscOffset:x,interrupt:A}=o;if(!(e.data[r]&1<<l)||a)continue;(e.data[g]>>x&3)===_t.LowLevel&&e.queueInterrupt({address:A,flagRegister:n,flagMask:1<<l,enableRegister:r,enableMask:1<<l,constant:!0})}}writeGpio(e,s){let i=(e&this.overrideMask|this.overrideValue)&s|e&~s,o=this.lastValue;if(i!==o||s!==this.lastDdr){this.lastValue=i,this.lastDdr=s;for(let a of this.listeners)a(i,o)}}};var Is={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},ie;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(ie||(ie={}));var $e={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},ve=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Is,compPortA:bt.PORT,compPinA:6,compPortB:bt.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:bt.PORT,externalClockPin:4},$e),_e=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Is,compPortA:kt.PORT,compPinA:1,compPortB:kt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:bt.PORT,externalClockPin:5},$e),ke=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:kt.PORT,compPinA:3,compPortB:bt.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},$e),Gt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Gt||(Gt={}));var F;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(F||(F={}));var U;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(U||(U={}));var It=1,Ht=2,Ut=1,{Normal:Ue,PWMPhaseCorrect:mt,CTC:me,FastPWM:gt,Reserved:De,PWMPhaseFrequencyCorrect:ae}=Gt,Xo=[[Ue,255,U.Immediate,F.Max,0],[mt,255,U.Top,F.Bottom,0],[me,It,U.Immediate,F.Max,0],[gt,255,U.Bottom,F.Max,0],[De,255,U.Immediate,F.Max,0],[mt,It,U.Top,F.Bottom,Ut],[De,255,U.Immediate,F.Max,0],[gt,It,U.Bottom,F.Top,Ut]],Zo=[[Ue,65535,U.Immediate,F.Max,0],[mt,255,U.Top,F.Bottom,0],[mt,511,U.Top,F.Bottom,0],[mt,1023,U.Top,F.Bottom,0],[me,It,U.Immediate,F.Max,0],[gt,255,U.Bottom,F.Top,0],[gt,511,U.Bottom,F.Top,0],[gt,1023,U.Bottom,F.Top,0],[ae,Ht,U.Bottom,F.Bottom,0],[ae,It,U.Bottom,F.Bottom,Ut],[mt,Ht,U.Top,F.Bottom,0],[mt,It,U.Top,F.Bottom,Ut],[me,Ht,U.Immediate,F.Max,0],[De,65535,U.Immediate,F.Max,0],[gt,Ht,U.Bottom,F.Top,Ut],[gt,It,U.Bottom,F.Top,Ut]];function Jo(t){switch(t){case 1:return N.Toggle;case 2:return N.Clear;case 3:return N.Set;default:return N.Enable}}var As=128,bs=64,Qo=32,ne=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=U.Immediate,this.tovUpdateMode=F.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(i=!0,o=!1)=>{let{divider:a,lastCycle:n,cpu:r}=this,{cycles:l}=r,g=l-n;if(a&&g>=a||o){let x=o?1:Math.floor(g/a);this.lastCycle+=x*a;let A=this.tcnt,{timerMode:u,TOP:E}=this,T=u===mt||u===ae,R=T?this.phasePwmCount(A,x):(A+x)%(E+1),I=A+x>E;if(this.tcntUpdated||(this.tcnt=R,T||this.timerUpdated(R,A)),!T){if(u===gt&&I){let{compA:k,compB:O}=this;k&&this.updateCompPin(k,"A",!0),O&&this.updateCompPin(O,"B",!0)}this.ocrUpdateMode==U.Bottom&&I&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),I&&(this.tovUpdateMode==F.Top||E===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===U.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===U.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:x}=this,{externalClockPin:A}=this.config,u=this.config.dividers[x];this.lastCycle=u?this.cpu.cycles:0,this.updateDivider=!1,this.divider=u,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[A]=null),u?r.addClockEvent(this.count,this.lastCycle+u-r.cycles):this.externalClockPort&&(x===ie.FallingEdge||x===ie.RisingEdge)&&(this.externalClockPort.externalClockListeners[A]=this.externalClockCallback,this.externalClockRisingEdge=x===ie.RisingEdge);return}i&&a&&r.addClockEvent(this.count,this.lastCycle+a-r.cycles)},this.externalClockCallback=i=>{i===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=i=>(this.count(!1),this.config.bits===16&&(this.cpu.data[i+1]=this.tcnt>>8),this.cpu.data[i]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=i=>{this.tcntNext=this.highByteTemp<<8|i,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=i=>{this.nextOcrA=this.highByteTemp<<8|i,this.ocrUpdateMode===U.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=i=>{this.nextOcrB=this.highByteTemp<<8|i,this.ocrUpdateMode===U.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=i=>{this.nextOcrC=this.highByteTemp<<8|i,this.ocrUpdateMode===U.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=a=>{this.icr=this.highByteTemp<<8|a};let i=a=>{this.highByteTemp=a},o=(a,n,r)=>(this.highByteTemp=a&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=i,this.cpu.writeHooks[s.OCRA+1]=o,this.cpu.writeHooks[s.OCRB+1]=o,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=o),this.cpu.writeHooks[s.ICR+1]=i}e.writeHooks[s.TCCRA]=i=>(this.cpu.data[s.TCCRA]=i,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=i=>(s.TCCRC||(this.checkForceCompare(i),i&=~(As|bs)),this.cpu.data[s.TCCRB]=i,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=i=>{this.checkForceCompare(i)}),e.writeHooks[s.TIFR]=i=>(this.cpu.data[s.TIFR]=i,this.cpu.clearInterruptByFlag(this.OVF,i),this.cpu.clearInterruptByFlag(this.OCFA,i),this.cpu.clearInterruptByFlag(this.OCFB,i),!0),e.writeHooks[s.TIMSK]=i=>{this.cpu.updateInterruptEnable(this.OVF,i),this.cpu.updateInterruptEnable(this.OCFA,i),this.cpu.updateInterruptEnable(this.OCFB,i)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case It:return this.ocrA;case Ht:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case It:case Ht:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,i=e.bits===16?Zo:Xo,o=this.cpu.data[e.TCCRA],[a,n,r,l,g]=i[s];this.timerMode=a,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=l;let x=a===gt||a===mt||a===ae,A=this.compA;this.compA=o>>6&3,this.compA===1&&x&&!(g&Ut)&&(this.compA=0),!!A!=!!this.compA&&this.updateCompA(this.compA?N.Enable:N.None);let u=this.compB;if(this.compB=o>>4&3,this.compB===1&&x&&(this.compB=0),!!u!=!!this.compB&&this.updateCompB(this.compB?N.Enable:N.None),this.hasOCRC){let E=this.compC;this.compC=o>>2&3,this.compC===1&&x&&(this.compC=0),!!E!=!!this.compC&&this.updateCompC(this.compC?N.Enable:N.None)}}phasePwmCount(e,s){let{ocrA:i,ocrB:o,ocrC:a,hasOCRC:n,TOP:r,MAX:l,tcntUpdated:g}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!g&&(this.countingUp=!1,this.ocrUpdateMode===U.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!g&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===U.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),g||(e===i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===o&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===a&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&l}timerUpdated(e,s){let{ocrA:i,ocrB:o,ocrC:a,hasOCRC:n}=this,r=s>e;((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((s<a||r)&&e>=a||s<a&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==Gt.FastPWM||this.timerMode==Gt.PWMPhaseCorrect||this.timerMode==Gt.PWMPhaseFrequencyCorrect||(e&As&&this.updateCompPin(this.compA,"A"),e&bs&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Qo&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,i=!1){let o=N.None,a=e===3,n=this.countingUp===a;switch(this.timerMode){case Ue:case me:o=Jo(e);break;case gt:e===1?o=i?N.None:N.Toggle:o=a!==i?N.Set:N.Clear;break;case mt:case ae:e===1?o=N.Toggle:o=n?N.Set:N.Clear;break}o!==N.None&&(s==="A"?this.updateCompA(o):s==="B"?this.updateCompB(o):this.updateCompC(o))}updateCompA(e){let{compPortA:s,compPinA:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompB(e){let{compPortB:s,compPinB:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompC(e){let{compPortC:s,compPinC:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}};var Be={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},Yo=128,ti=64,Ts=32;var Oe=2,ei=1,ws=Oe,si=128,oi=64,ii=32,ge=16,Ce=8,Es=4;var Ms=Es|ge|Ce;var ai=32,ni=16,ri=8,ys=4,Ps=2;var ci={5:31,6:63,7:127,8:255,9:255},re=class{constructor(e,s,i){this.cpu=e,this.config=s,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Yo,enableRegister:this.config.UCSRB,enableMask:si,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ts,enableRegister:this.config.UCSRB,enableMask:ii},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:ti,enableRegister:this.config.UCSRB,enableMask:oi},this.reset(),this.cpu.writeHooks[s.UCSRA]=(o,a)=>{var n;return e.data[s.UCSRA]=o&(ei|Oe),e.clearInterruptByFlag(this.TXC,o),(o&ws)!==(a&ws)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(o,a)=>{var n;return e.updateInterruptEnable(this.RXC,o),e.updateInterruptEnable(this.UDRE,o),e.updateInterruptEnable(this.TXC,o),o&ge&&a&ge&&e.clearInterrupt(this.RXC),o&Ce&&!(a&Ce)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=o,(o&Ms)!==(a&Ms)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=o=>{var a;return e.data[s.UCSRC]=o,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var o;let a=(o=ci[this.bitsPerChar])!==null&&o!==void 0?o:255,n=this.rxByte&a;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[s.UDR]=o=>{if(this.onByteTransmit&&this.onByteTransmit(o),this.onLineTransmit){let a=String.fromCharCode(o);a===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=a}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=o=>{var a;return this.cpu.data[s.UBRRH]=o,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0},this.cpu.writeHooks[s.UBRRL]=o=>{var a;return this.cpu.data[s.UBRRL]=o,(a=this.onConfigurationChange)===null||a===void 0||a.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ts,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=ys|Ps,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var i;let{cpu:o}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,o.setInterruptFlag(this.RXC),(i=this.onRxComplete)===null||i===void 0||i.call(this);else return this.rxBusyValue=!0,o.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&Oe?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&ge)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ce)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(ys|Ps))>>1|this.cpu.data[this.config.UCSRB]&Es){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ri?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&ai)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&ni)}};function Ds(t){let e=new Uint8Array(32768),s=0,i=!1;for(let[o,a]of String(t).split(/\\r?\\n/).entries()){let n=a.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${o+1}).`);let r=n.slice(1).match(/../g).map(E=>parseInt(E,16));if(r.reduce((E,T)=>E+T,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${o+1}).`);let[l,g,x,A]=r,u=r.slice(4,4+l);if(A===0){let E=s+(g<<8|x);if(E+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(u,E)}else if(A===1){i=!0;break}else A===2?s=(u[0]<<8|u[1])<<4:A===4&&(s=(u[0]<<8|u[1])<<16)}if(!i)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var ft=16e6,$s=ft/1e3,li=Me,fi=[[bt,["D0","D1","D2","D3","D4","D5","D6","D7"]],[kt,["D8","D9","D10","D11","D12","D13"]],[Ee,["A0","A1","A2","A3","A4","A5"]]],dt=Object.freeze({...K});function vs(t){let e=new te(Ds(t));[ve,_e,ke].forEach(R=>new ne(e,R));let s=new re(e,Be,ft),i=new se(e,Pe),o=fi.map(([R,I])=>[new oe(e,R),I]),a={};for(let[R,I]of o)I.forEach((k,O)=>a[k]=[R,O]);let n=null;i.onADCRead=R=>{let I=0;if(R.type===j.SingleEnded){let G=i.channelValues[R.channel]||0;I=n?n(R.channel,G):G}else R.type===j.Constant?I=R.voltage:R.type===j.Temperature&&(I=.378125);let k=Math.round(I*1e6)/1e6,O=Math.min(1023,Math.max(0,Math.floor(k/i.referenceVoltage*1024)));e.addClockEvent(()=>i.completeADCRead(O),i.sampleCycles)};let r=[],l=[],g=[],x=[],A=u();function u(){let R={};for(let[I,k]of o)k.forEach((O,G)=>R[O]=I.pinState(G));return R}for(let[R,I]of o)R.addListener(()=>{let k=null;for(let O=0;O<I.length;O++){let G=R.pinState(O);G!==A[I[O]]&&((k||(k={}))[I[O]]=G,A[I[O]]=G)}if(k)for(let O of l)O(k,A)});s.onByteTransmit=R=>g.forEach(I=>I(R));let E=$s;function T(R){let I=e.cycles+R;for(;e.cycles<I;){let k=Math.min(I,E);for(;e.cycles<k;)li(e),e.tick();if(e.cycles<E)break;E+=$s,x.length&&!s.rxBusy&&(s.writeByte(x[0]),x.shift());for(let O of r)O()}}return{correr:T,estados:u,get ciclos(){return e.cycles},alCambiarPines:R=>l.push(R),alByteSerial:R=>g.push(R),enviarSerial:R=>x.push(...new TextEncoder().encode(R)),ponerAnalogico:(R,I)=>i.channelValues[R]=Math.max(0,Math.min(5,I)),ponerLectorAnalogico:R=>n=R,ponerEntrada(R,I){let k=a[R];k&&k[0].setPin(k[1],!!I)},alCadaMs:R=>r.push(R)}}var di=["a","b","c","d","e"],hi=["f","g","h","i","j"],Ve={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},xi=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],_s={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Ne=t=>14.4+(t-1)*9.6,ui=t=>t>=2&&(t-1)%6!==0,Fe=new Map;function Le(t="media"){if(Fe.has(t))return Fe.get(t);let e=_s[t]||_s.media,s=[];Fe.set(t,s);for(let i=1;i<=e.columnas;i++){for(let o of di)s.push({nombre:o+i,x:Ne(i),y:Ve[o],tira:"arriba"+i});for(let o of hi)s.push({nombre:o+i,x:Ne(i),y:Ve[o],tira:"abajo"+i});for(let[o]of xi)ui(i)&&s.push({nombre:o+i,x:Ne(i),y:Ve[o],tira:o})}return s}var We=new Map;function ks(t="media"){if(We.has(t))return We.get(t);let e=new Map;We.set(t,e);for(let s of Le(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var qt=3.779527559055118,pi={ancho:72.58*qt,alto:53.34*qt},mi=4*qt,Us=5*qt;var ce=mi+4.6*qt,le=pi.ancho-.5-4.6*qt,gi=60,Ct=(t,e)=>({x:t,y:gi+e*Us}),cn={M1A:Ct(ce,0),M1B:Ct(ce,1),GND_IZQ:Ct(ce,2),M2A:Ct(ce,3),M2B:Ct(ce,4),M4A:Ct(le,0),M4B:Ct(le,1),GND_DER:Ct(le,2),M3A:Ct(le,3),M3B:Ct(le,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+Us,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var Os={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},Bs=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var Ci=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Ot(t,{presionados:e=new Set,conduccion:s=!1,balanceInterno:i=!0}={}){let o=new Map,a=r=>{for(o.has(r)||o.set(r,r);o.get(r)!==r;)o.set(r,o.get(o.get(r))),r=o.get(r);return r},n=(r,l)=>o.set(a(r),a(l));for(let r of Ci)r.forEach(l=>n("placa."+r[0],"placa."+l));for(let r of t.cables)n(r.de,r.a);if(t.protoboard){for(let r of ks(t.protoboard.tipo).values())r.forEach(l=>n("protoboard."+r[0],"protoboard."+l));for(let r of t.componentes)if(r.en)for(let[l,g]of Object.entries(r.en))n(r.id+"."+l,g)}for(let r of t.componentes)if(r.tipo==="shield_l293d"){for(let[l,g]of Bs)n(r.id+"."+l,g);(!r.props||r.props.puentePWR!==!1)&&n(r.id+".EXT_POS","placa.VIN")}else r.tipo==="bateria_lipo"&&i?(n(r.id+".BAL0",r.id+".NEG"),n(r.id+".BAL2",r.id+".POS")):r.tipo==="pulsador"?(n(r.id+".1i",r.id+".1d"),n(r.id+".2i",r.id+".2d"),e.has(r.id)&&n(r.id+".1i",r.id+".2i")):s&&r.tipo==="resistencia"?n(r.id+".1",r.id+".2"):s&&r.tipo==="potenciometro"&&(n(r.id+".GND",r.id+".SIG"),n(r.id+".SIG",r.id+".VCC"));return a}function He(t,e,s,i){e>=0&&(t[e][e]+=i),s>=0&&(t[s][s]+=i),e>=0&&s>=0&&(t[e][s]-=i,t[s][e]-=i)}function je(t,e,s){e>=0&&(t[e]+=s)}var Bt=(t,e)=>e>=0?t[e]:0;function fe(t,e,s){return{a:t,b:e,g:1/s,sellar(i){He(i,this.a,this.b,this.g)},corriente(i){return(Bt(i,this.a)-Bt(i,this.b))*this.g}}}function Vs(t){return{nodo:t,v:0,g:0,sellar(e,s){He(e,this.nodo,-1,this.g),je(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Bt(e,this.nodo))*this.g}}}function Ns(t,e){return{nodo:t,v:e,fila:-1,sellar(s,i){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,i[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function Fs(t,e,{Is:s,n:i}){let o=i*.025693,a=o*Math.log(o/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let l=Math.exp(this.vd/o),g=s*(l-1),x=s*l/o+1e-12,A=g-x*this.vd;He(n,this.a,this.k,x),je(r,this.a,-A),je(r,this.k,A)},actualizar(n){let r=Bt(n,this.a)-Bt(n,this.k),l=Math.abs(r-this.vd);return this.vd=Si(r,this.vd,o,a),l},corriente(n){let r=Bt(n,this.a)-Bt(n,this.k);return s*Math.expm1(r/o)}}}function Si(t,e,s,i){if(t>i&&Math.abs(t-e)>2*s){if(e>0){let o=1+(t-e)/s;return o>0?e+s*Math.log(o):i}return s*Math.log(t/s)}return t}function Ws(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let i=t.nodos+t.fuentes,o=t.elementos.filter(n=>n.noLineal),a=new Float64Array(i);for(let n=1;n<=e;n++){let r=Array.from({length:i},()=>new Float64Array(i)),l=new Float64Array(i);for(let x of t.elementos)x.sellar(r,l);for(let x=0;x<t.nodos;x++)r[x][x]+=1e-12;if(a=Ri(r,l),!o.length)return{x:a,iteraciones:n,convergio:!0};let g=0;for(let x of o)g=Math.max(g,x.actualizar(a));if(g<s)return{x:a,iteraciones:n,convergio:!0}}return{x:a,iteraciones:e,convergio:!1}}function Ri(t,e){let s=e.length;for(let o=0;o<s;o++){let a=o;for(let n=o+1;n<s;n++)Math.abs(t[n][o])>Math.abs(t[a][o])&&(a=n);if(Math.abs(t[a][o])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[o],t[a]]=[t[a],t[o]],[e[o],e[a]]=[e[a],e[o]];for(let n=o+1;n<s;n++){let r=t[n][o]/t[o][o];if(r){for(let l=o;l<s;l++)t[n][l]-=r*t[o][l];e[n]-=r*e[o]}}}let i=new Float64Array(s);for(let o=s-1;o>=0;o--){let a=e[o];for(let n=o+1;n<s;n++)a-=t[o][n]*i[n];i[o]=a/t[o][o]}return i}var Vt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},Ge=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],bi={A4:"SDA",A5:"SCL"},ot={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},Ii=.25,Ls={minimo:1};function Ti(t){let s=(ot.vf[t]||ot.vf.rojo)-ot.iRef*ot.rs;return{Is:ot.iRef/Math.expm1(s/(ot.n*.025693)),n:ot.n}}var js={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function Hs(t,{quemados:e=new Set,presionados:s=new Set}={}){let i=Ot(t,{presionados:s}),o=Ot(t,{presionados:s,conduccion:!0}),a=i("placa.GND1"),n=new Map,r=0,l=p=>{let y=i(p);return y===a?-1:(n.has(y)||n.set(y,r++),n.get(y))},g=p=>i(p)===a?-1:n.get(i(p)),x=[],A=[],u=[],E=new Set(t.cables.flatMap(p=>[p.de,p.a])),T=[];if(t.protoboard){let p=new Set([...E].map(i));for(let y of t.componentes)for(let h of Object.keys(y.en||{}))p.add(i(y.id+"."+h));for(let y of Le(t.protoboard.tipo)){let h="protoboard."+y.nombre;p.has(i(h))&&T.push(h)}}let R=new Map;for(let[p,y]of[["5V",5],["3V3",3.3]]){if(!E.has("placa."+p))continue;let h=l("placa."+p),w=h===-1?"GND":R.get(h);if(w){u.push({tipo:"cortocircuito",componente:"placa."+p,mensaje:`El pin ${p} est\\xE1 unido directo a ${w}: es un cortocircuito.`});continue}R.set(h,p);let c=Ns(h,y);A.push(c),x.push(c)}let I={};for(let p of Ge)!E.has("placa."+p)&&!E.has("placa."+bi[p])||(I[p]=Vs(l("placa."+p)),x.push(I[p]));let k=[],O=[],G=[];for(let p of t.componentes)if(p.tipo==="resistencia"){let y=fe(l(p.id+".1"),l(p.id+".2"),Number(p.props.ohmios)||1);k.push({id:p.id,ohmios:Number(p.props.ohmios)||1,el:y}),y.a!==y.b&&x.push(y)}else if(p.tipo==="led"){let y=l(p.id+".anodo"),h=l(p.id+".catodo"),w={id:p.id,a:y,k:h,quemado:e.has(p.id)};if(!w.quemado&&y!==h){let c=r++;w.rs=fe(y,c,ot.rs),w.diodo=Fs(c,h,Ti(p.props.color)),x.push(w.rs,w.diodo)}O.push(w)}else if(p.tipo==="potenciometro"){let y=Number(p.props.ohmios)||1e4,h=Math.max(0,Math.min(1,Number(p.props.posicion))),w=l(p.id+".GND"),c=l(p.id+".SIG"),P=l(p.id+".VCC"),b=fe(w,c,Math.max(Ls.minimo,y*h)),B=fe(c,P,Math.max(Ls.minimo,y*(1-h)));for(let W of[b,B])W.a!==W.b&&x.push(W);G.push({id:p.id,ohmios:y,posicion:h,bajo:b,alto:B})}A.forEach((p,y)=>p.fila=r+y);function rt(p){let y=new Set([o("placa.GND1")]);for(let h of["5V","3V3"])E.has("placa."+h)&&y.add(o("placa."+h));for(let h of Ge){let w=p[h];(w===K.High||w===K.Low||w===K.InputPullUp)&&y.add(o("placa."+h))}return y}let st=new Set([...E,...T]);for(let p of t.componentes)for(let y of js[p.tipo]||[])st.add(p.id+"."+y);return{fallasFijas:u,flotantes(p){let y=rt(p),h=new Set;for(let w of Ge)p[w]===K.Input&&!y.has(o("placa."+w))&&h.add(w);return h},refsAlAire(p){let y=rt(p),h=new Set;for(let w of st)y.has(o(w))||h.add(w);return h},ponerPines(p){for(let[y,h]of Object.entries(I)){let w=p[y];w===K.High?Object.assign(h,{v:Vt.voltios,g:1/Vt.rAlto}):w===K.Low?Object.assign(h,{v:0,g:1/Vt.rBajo}):w===K.InputPullUp?Object.assign(h,{v:Vt.voltios,g:1/Vt.rPullUp}):Object.assign(h,{v:0,g:0})}},resolver(){let p=Ws({nodos:r,fuentes:A.length,elementos:x}),y=c=>{let P=g(c);return P===void 0?null:P<0?0:p.x[P]},h={};for(let c of E)h[c]=y(c);for(let c of T)h[c]=y(c);for(let c of t.componentes)for(let P of js[c.tipo]||[])h[c.id+"."+P]=y(c.id+"."+P);let w=(c,P)=>c===null||P===null?null:c-P;return{convergio:p.convergio,iteraciones:p.iteraciones,voltajes:h,leds:O.map(c=>{let P=c.diodo?c.diodo.corriente(p.x):0;return{id:c.id,quemado:c.quemado,v:w(y(c.id+".anodo"),y(c.id+".catodo")),i:P,brillo:Math.max(0,Math.min(1,P*1e3/ot.plenomA))}}),resistencias:k.map(c=>{let P=c.el.a===c.el.b?0:c.el.corriente(p.x);return{id:c.id,ohmios:c.ohmios,v:w(y(c.id+".1"),y(c.id+".2")),i:P,w:P*P*c.ohmios}}),pines:Object.entries(I).filter(([,c])=>c.g>0).map(([c,P])=>({pin:c,v:y("placa."+c),i:P.corriente(p.x)})),fuentes:A.map(c=>({pin:c.v===5?"5V":"3V3",i:c.corriente(p.x)})),potenciometros:G.map(c=>({id:c.id,ohmios:c.ohmios,posicion:c.posicion,v:w(y(c.id+".SIG"),y(c.id+".GND")),i:Math.abs(c.bajo.a!==c.bajo.b?c.bajo.corriente(p.x):c.alto.a!==c.alto.b?c.alto.corriente(p.x):0)}))}}}}function Gs(t,e){let s=o=>(Math.abs(o)*1e3).toFixed(0),i=[];if(e.danoComponentes){for(let o of t.leds)!o.quemado&&o.i*1e3>ot.quemamA&&i.push({tipo:"led_quemado",componente:o.id,corriente_mA:+(o.i*1e3).toFixed(1),mensaje:`El LED ${o.id} se quem\\xF3: le pasaron ${s(o.i)} mA y aguanta unos ${ot.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let o of t.resistencias)o.w>Ii&&i.push({tipo:"resistencia_caliente",componente:o.id,potencia_W:+o.w.toFixed(2),mensaje:`La resistencia ${o.id} se calienta: disipa ${o.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let o of t.pines)if(Math.abs(o.i)*1e3>Vt.maxmA){let a=o.pin.startsWith("D")?"pin "+o.pin.slice(1):"pin "+o.pin;i.push({tipo:"corriente_pin",componente:"placa."+o.pin,corriente_mA:+(Math.abs(o.i)*1e3).toFixed(1),mensaje:`El ${a} entrega ${s(o.i)} mA y aguanta ${Vt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return i}var Ft={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Nt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function wi(t,e="sg90"){let s=(Ft[e]||Ft.sg90).angulos,i=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,i))}function qs(t){let e=Ft[t]||Ft.sg90,s=90,i=90,o=null,a=0,n=!1,r=0,l=0;return{pulso(g){g<Nt.pulsoValidoMin||g>Nt.pulsoValidoMax||o!==null&&Math.abs(g-o)<Nt.bandaMuerta||(o=g,i=wi(g,t))},avanzar(g,x){if(!(x>0)){n=!1,a=0;return}let A=60/(e.seg60*1e3)*(x/Nt.voltiosRef),u=i-s,E=Math.abs(u)>.01;r=Math.min(1,Math.abs(u)/Nt.bandaGrados),E&&!n&&(a=Nt.arranqueMs,l=r),n=E,n&&(s+=Math.sign(u)*Math.min(Math.abs(u),A*g)),a=Math.max(0,a-g)},corriente(g){if(!(g>0))return 0;let{reposo:x,movimiento:A,arranque:u}=e.mA;return(a>0?x+(u-x)*l:n?x+(A-x)*r:x)/1e3*(g/Nt.voltiosRef)},estado:()=>({angulo:s,objetivo:i,pulso:o,moviendo:n,arrancando:a>0})}}var Kt=9.6/2.54,Se=57.6,Ks=14.4,Sn={x:Ks,ancho:32.2*Kt},Mi={x:Ks+(32.2-22.2)/2*Kt,ancho:22.2*Kt,alto:11.8*Kt},Rn={x:Mi.x+5.9*Kt,y:Se},An=13.5*Kt,qe=182.4;var bn={GND:{x:qe,y:Se-9.6,color:"#7a4a24"},VCC:{x:qe,y:Se,color:"#d7263d"},SIG:{x:qe,y:Se+9.6,color:"#f28c28"}};var Y={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function Ke(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=Y.fusible,i=(8**2-t**2)*e,o=0,a=!1;return{avanzar(n,r){let l=n/1e3;!a&&r>t?o+=(r**2-t**2)/i*l:o=Math.max(0,o-l/s),o>=1&&(a=!0),a&&o===0&&(a=!1)},get abierto(){return a},get calor(){return o},reiniciar(){o=0,a=!1}}}var zs=(t,e=0)=>Math.max(0,(Y.voltios-Y.ohmios*t)/(1+Y.ohmios*e));var de=3.779527559055118,ht={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Re=ht.voltiosRef/(ht.mABloqueado/1e3),Xs=ht.rpmSinCarga*ht.reduccion*2*Math.PI/60,Zs=ht.mASinCarga/1e3,zt=(ht.voltiosRef-Zs*Re)/Xs,yi=zt*Zs/Xs,Pi=ht.tauMecanicoMs/1e3*zt*zt/Re;function Js(){let t=0,e=0,s=0;return{avanzar(i,o,{conectado:a=!0,frena:n=!1}={}){let r=i/1e3;a?e=(o-zt*t)/Re:e=n?-(zt*t)/Re:0;let l=zt*e-yi*t;t+=l/Pi*r,s=(s+t/ht.reduccion*r*180/Math.PI)%360},estado(){let i=t*60/(2*Math.PI)/ht.reduccion;return{rpm:i,i:e,giro:s,velocidad:i/60*Math.PI*(ht.ruedaMM/10)}}}}var wn=64.2*de,Ei=22.5*de,Mn=40*de,Di=11.2*de,yn=ht.ruedaMM*de/2,Pn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Di,y0:132-Ei/2}};var Ys=3.779527559055118,Ae={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Wt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},to=t=>(Ae[t]||Ae.nominal).voltios,eo=t=>(Ae[t]||Ae.nominal).celdas,Qs=360;var $i=10,Ze=10,vi=72*Ys,_i=34*Ys;var ze=$i+vi+58,Xe=Ze+_i-34,Dn={POS:{x:Qs-12,y:Ze+30,color:"#d7263d"},NEG:{x:Qs-12,y:Ze+39.6,color:"#2b2b2b"},BAL0:{x:ze,y:Xe,color:"#2b2b2b"},BAL1:{x:ze,y:Xe+9.6,color:"#e05a5a"},BAL2:{x:ze,y:Xe+19.2,color:"#d7263d"}};var so={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var ki=9.6,Ui=82,Oi=132,vn=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:Ui+e*ki,y:Oi}]));var z={...Os,caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Bi=6.6,Vi=.06,io=4,oo=1-Math.exp(-1/io),Ni=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],xt=(t,e=1)=>t.toFixed(e).replace(".",",");function ao({activas:t,avisar:e}){let s=null,i=new Map,o=new Map,a=new Map,n=0,r=0,l=!1,g={},x=0,A={},u=0,E=0,T=0,R=0;function I(){for(let h of Object.values(z.pwm))g[h]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};x=0,A={}}I();function k(h,w){let c=(M,L)=>w(M)===w(L),P="placa.GND1",b=h.componentes.find(M=>M.tipo==="shield_l293d");s=b?{id:b.id,puente:!b.props||b.props.puentePWR!==!1}:null;let B=new Map;for(let M of h.componentes){if(M.tipo!=="bateria_lipo")continue;let L=M.props&&M.props.carga||"nominal",$=to(L),D=o.get(M.id),C=M.id+".POS",_=M.id+".NEG",V={carga:L,voc:$,celdas:eo(L),v:D&&D.carga===L?D.v:$,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};L==="descargada"&&e({tipo:"bateria_baja",componente:M.id,mensaje:`La bater\\xEDa ${M.id} est\\xE1 descargada: ${xt($)} V, ${xt($/Wt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${xt(Wt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),L==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:M.id,mensaje:`Las celdas de la bater\\xEDa ${M.id} est\\xE1n desbalanceadas: ${V.celdas.map(X=>xt(X,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let lt=X=>s&&c(X,s.id+".EXT_POS")||c(X,"placa.VIN")||c(X,"placa.5V");c(C,_)?e({tipo:"bateria_corto",componente:M.id,mensaje:`Los dos cables de la bater\\xEDa ${M.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):c(C,P)&&lt(_)?e({tipo:"bateria_invertida",componente:M.id,mensaje:`La bater\\xEDa ${M.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):c(_,P)&&(V.valida=!0,c(C,"placa.5V")&&(V.valida=!1,e({tipo:"bateria_en_5v",componente:M.id,mensaje:`La bater\\xEDa ${M.id} est\\xE1 en el pin 5V: sus ${xt($)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),V.motores=V.valida&&!!s&&c(C,s.id+".EXT_POS"),V.vin=V.valida&&c(C,"placa.VIN")),B.set(M.id,V)}o=B;let W=new Map;for(let M of h.componentes){if(M.tipo!=="probador_lipo")continue;let L=M.props&&typeof M.props.umbral=="number"?M.props.umbral:so.umbralV,$=null;for(let C of o.keys())c(M.id+".NEG",C+".BAL0")&&($=C);let D=["C1","C2","C3","C4","C5","C6","C7","C8"].map(C=>{if(!$)return null;for(let _ of[0,1,2])if(c(`${M.id}.${C}`,`${$}.BAL${_}`))return _;return null});W.set(M.id,{umbral:L,fuente:$,puntos:D})}a=W;let tt=M=>{if(s){for(let $ of[1,2,3,4])for(let D of["A","B"])if(c(M,`${s.id}.M${$}${D}`))return{tipo:"shield",n:$,s:D}}if(c(M,P))return{tipo:"gnd"};if(c(M,"placa.5V"))return{tipo:"5v"};for(let[$,D]of o)if(D.valida&&c(M,$+".POS"))return{tipo:"bateria",id:$};let L=Ni.find($=>c(M,"placa."+$));return L?{tipo:"pin",pin:L}:null},ct=new Map;for(let M of h.componentes){if(M.tipo!=="motor_tt")continue;let $=i.get(M.id)||{logico:Js(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};$.lado=M.props&&M.props.lado||"izquierdo",$.a=tt(M.id+".A"),$.b=tt(M.id+".B");let D=[$.a,$.b].filter(_=>_&&_.tipo==="shield");$.canal=D.length?"M"+D[0].n:null;let C=[$.a,$.b].find(_=>_&&_.tipo==="pin");C&&e({tipo:"motor_en_pin",componente:M.id,mensaje:`El motor ${M.id} est\\xE1 conectado al pin ${C.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),ct.set(M.id,$)}i=ct}function O(h,w,c){let P=b=>w[b]===dt.High;z.reloj in h&&P(z.reloj)&&(n=(n<<1|(P(z.datos)?1:0))&255),z.cierre in h&&P(z.cierre)&&(r=n),z.habilita in h&&(l=w[z.habilita]===dt.Low);for(let b of Object.values(z.pwm)){if(!(b in h))continue;let B=g[b],W=h[b]===dt.High;B.cambios=(B.cambios||0)+1,W&&!B.alto?Object.assign(B,{alto:!0,desde:c}):!W&&B.alto&&(B.acum+=c-B.desde,B.alto=!1)}}function G(){l=!1,I()}function rt(h,{v5:w,logica:c}){let P=h-x;for(let[D,C]of Object.entries(g)){C.alto&&(C.acum+=h-C.desde,C.desde=h);let _=P>0?Math.min(1,C.acum/P):0,V=A[D]||0;A[D]=(_===0||_===1)&&C.quieto>=io?_:V+oo*(_-V),C.quieto=C.cambios?0:(C.quieto||0)+1,C.cambios=0,C.acum=0}x=h,u=0,E=0;for(let D of o.values())D.motores&&(u=Math.max(u,D.v)),D.vin&&(E=Math.max(E,D.v));let b=E>=Bi,B=c||b,W=new Map,tt=(D,C)=>W.set(D,(W.get(D)||0)+C),ct=D=>{for(let[C,_]of o)if(_.motores)return tt(C,D)},M=0,L=D=>D?D.tipo==="shield"?!B||!l?null:{v:r>>z.bits[D.n][D.s]&1?u:0,d:A[z.pwm[D.n]]||0,shield:!0}:D.tipo==="gnd"?{v:0,d:1}:D.tipo==="5v"?{v:w,d:1,del5V:!0}:D.tipo==="bateria"?{v:(o.get(D.id)||{v:0}).v,d:1,bateria:D.id}:null:null,$=!1;for(let[D,C]of i){let _=L(C.a),V=L(C.b),lt=_&&V?Math.min(_.d,V.d):0;if(!lt)C.vAhora=0,C.logico.avanzar(1,0,{conectado:!1});else{let et=_.v-V.v,Lt=(_.shield?1:0)+(V.shield?1:0),it=0;if(Math.abs(et)>1e-9){let jt=t.caidaL293D&&Lt?Lt/2*(z.caidaV+z.caidaPorA*Math.abs(C.iAntes)):0;it=Math.sign(et)*Math.max(0,Math.abs(et)-jt)*lt}C.vAhora=it,C.logico.avanzar(1,it,{conectado:!0}),Lt===2&&(r>>z.bits[C.a.n][C.a.s]&1)!==(r>>z.bits[C.b.n][C.b.s]&1)&&u<1&&($=!0);let Zt=C.logico.estado().i,Tt=et>=0?_:V,wt=Math.max(0,Zt*Math.sign(et||1))*lt;Tt.shield?ct(wt):Tt.del5V?M+=wt:Tt.bateria&&tt(Tt.bateria,wt)}let X=C.logico.estado();C.iAntes=X.i,C.sumaI+=Math.abs(X.i),C.sumaV+=Math.abs(C.vAhora||0),C.ms++;let J=C.a&&C.a.tipo==="shield"||C.b&&C.b.tipo==="shield";C.sobreMs=J&&Math.abs(X.i)>z.maximoCanalA?C.sobreMs+1:0,C.sobreMs>z.avisoCanalMs&&e({tipo:"l293d_corriente",componente:D,mensaje:`El motor ${D} pide ${xt(Math.abs(X.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}$&&s&&e({tipo:"motores_sin_energia",componente:s.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[D,C]of o){if(!C.valida)continue;let _=(W.get(D)||0)+(C.vin&&b?Vi:0);C.v=Math.max(0,C.voc-Wt.ohmios*_),C.iAntes=_,C.sumaI+=_,C.ms++;let V=Math.min(...st(C));V<Wt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:D,mensaje:`La bater\\xEDa ${D} baj\\xF3 a ${xt(C.v,2)} V con los motores y una celda qued\\xF3 en ${xt(V,2)} V: menos de ${xt(Wt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return T+=u,R++,{i5V:M,porVin:b}}function st(h){let w=h.valida?h.iAntes:0;return h.celdas.map(c=>Math.max(0,c-Wt.ohmios/h.celdas.length*w))}function p(h,w,c){let P=w.fuente&&o.get(w.fuente);if(!P)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:c};let b=st(P),B=[0,b[0],b[0]+b[1]],W=[],tt=0;for(let $ of w.puntos){if($===null)break;W.push(B[$]-tt),tt=B[$]}let ct=W.length>0&&tt>=2.5,M=W.findIndex($=>$<w.umbral),L=ct&&w.umbral>0&&M>=0;return L&&e({tipo:"probador_alarma",componente:h,mensaje:`El probador ${h} pita: la celda ${M+1} est\\xE1 en ${xt(Math.max(0,W[M]),2)} V, por debajo de ${xt(w.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:ct,celdas:W.map($=>Math.max(0,$)),total:tt,alarma:L,umbral:w.umbral,ms:c}}function y(h=0){let w={},c={motores:[],baterias:[],shield:null,probadores:[]};for(let[P,b]of i){let B=b.logico.estado(),W={rpm:B.rpm,giro:B.giro,velocidad:B.velocidad,i:b.ms?b.sumaI/b.ms:Math.abs(B.i),voltios:b.ms?b.sumaV/b.ms:0};w[P]=W,c.motores.push({id:P,canal:b.canal,lado:b.lado,...W}),Object.assign(b,{sumaI:0,sumaV:0,ms:0})}for(let[P,b]of o){let B={voltios:b.valida?b.v:b.voc,celdas:st(b),i:b.ms?b.sumaI/b.ms:0,carga:b.carga,conectada:b.motores||b.vin};w[P]=B,c.baterias.push({id:P,...B}),Object.assign(b,{sumaI:0,ms:0})}if(s){let P=R?T/R:u;w[s.id]={motoresV:P},c.shield={id:s.id,motoresV:P,puente:s.puente,habilitada:l,salidas:r}}for(let[P,b]of a){let B=p(P,b,h);w[P]=B,c.probadores.push({id:P,...B})}return T=0,R=0,{piezas:w,lista:c}}return{armar:k,pinesCambiaron:O,reiniciarChip:G,cadaMs:rt,foto:y,get hay(){return!!s||i.size>0||o.size>0||a.size>0}}}var Fi=60,be=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],no=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Wi=3,Li=1.5,ji=1/1e4,ro=60,Hi=Math.cos(.35*Math.PI),Gi=.1*5/1024,qi=.15,Ki=100,co=50;function lo({hex:t,circuito:e,activas:s={},semilla:i=Math.floor(Math.random()*2**32)}){let o=Zi(i),a=new Set,n=[],r={raiz:null,grupos:new Set},l=new Set,g=new Set,x=new Set,A={},u=new Map,E={},T=null,R=e,I=null,k=new Map,O=new Map,G={},rt=null,st=new Map,p=new Map,y=[],h=0,w=0,c={inicio:0,clave:""},P=null,b=null,B=-1/0,W={},tt=0,ct=0,M=[],L=new TextDecoder("utf-8"),$=new Set,D=new Set,C=[],_=[],V=new Map,lt=0,X=Ke(),J=!1,et=null,Lt=0,it=Y.idealV,Zt=0,Tt=0,wt=0,jt=0,Jt=[],Et=ao({activas:s,avisar:f=>$t(f)}),Ie=0,Qt=!1,St=()=>(lt+T.ciclos)/ft*1e3,mo=f=>yt.reduce((d,S)=>d+f[S]*Je[S],0);function pe(){T=vs(t);let f=T.estados();h=mo(f),st.set(h,f),w=0,p=new Map,y=[],c={inicio:0,clave:h},P=null,T.alCambiarPines((d,S)=>{ss();let m=st.get(h);for(let v in d)h+=(d[v]-m[v])*Je[v];st.has(h)||st.set(h,{...S}),h===c.clave&&(P={tiempos:new Map(p),ciclo:T.ciclos}),B=T.ciclos;for(let v in d)W[v]=T.ciclos;Dt(),V.size&&So(d),Et.pinesCambiaron(d,S,T.ciclos)}),T.alCadaMs(Io),T.alCadaMs(ns);for(let d of V.values())d.subida=null;Et.reiniciarChip(),B=-1/0,W={},T.ponerLectorAnalogico(To),G={},rt=null,T.alByteSerial(d=>{M.push(d),ct=St()+Fi})}function ss(){let f=T.ciclos;p.set(h,(p.get(h)||0)+(f-w)),w=f}function Yt(){I=Hs(R,{quemados:$,presionados:a}),k=new Map,O=new Map,Co(),Et.armar(R,Ot(R)),os()}function os(){if(!n.length){r={raiz:null,grupos:new Set};return}let f=Ot(R,{presionados:a,conduccion:!0});r={raiz:f,grupos:new Set(n.map(f))}}let is=f=>r.grupos.size>0&&r.grupos.has(r.raiz(f)),go=()=>Math.sin(2*Math.PI*ro*(St()/1e3))>Hi;function Co(){let f=Ot(R),d=(m,v)=>f(m)===f(v),S=new Map;for(let m of R.componentes){if(m.tipo!=="servo")continue;let v=Ft[m.props&&m.props.modelo]?m.props.modelo:"sg90",Q=V.get(m.id),ut=Q&&Q.modelo===v?Q:{modelo:v,logico:qs(v),subida:null,sumaA:0,picoA:0,msVentana:0};ut.senal=yt.find(q=>d(m.id+".SIG","placa."+q))||null;let Rt=d(m.id+".GND","placa.GND1"),vt=yt.find(q=>d(m.id+".VCC","placa."+q));ut.fuente=d(m.id+".VCC","placa.5V")?"5V":d(m.id+".VCC","placa.3V3")?"3V3":vt||null,ut.conectado=Rt&&(ut.fuente==="5V"||ut.fuente==="3V3"),vt&&Rt&&$t({tipo:"servo_alimentacion",componente:m.id,mensaje:`El servo ${m.id} toma la corriente del pin ${vt.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ft[v].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),S.set(m.id,ut)}V=S}function So(f){for(let d of V.values())!d.senal||!(d.senal in f)||(f[d.senal]===dt.High?d.subida=T.ciclos:d.subida!==null&&(d.conectado&&!J&&d.logico.pulso((T.ciclos-d.subida)/ft*1e6),d.subida=null))}let as=f=>!f.conectado||J?0:f.fuente==="5V"?it:3.3;function ns(){Et.hay&&({i5V:Ie,porVin:Qt}=Et.cadaMs(T.ciclos,{v5:it,logica:!J&&it>Y.bodV}));for(let m of V.values())m.logico.avanzar(1,as(m));let f=J?0:Y.placaA+Lt+Ie,d=0;for(let m of V.values())m.conectado&&m.fuente==="5V"&&(d+=m.logico.corriente(1));it=J?0:Qt?Y.idealV:s.limiteUSB?zs(f,d):Y.idealV;let S=f;for(let m of V.values()){let v=m.logico.corriente(as(m));m.sumaA+=v,m.picoA=Math.max(m.picoA,v),m.msVentana++,(m.fuente==="5V"||m.fuente==="3V3")&&(S+=v)}Qt&&(S=0),s.limiteUSB&&(X.avanzar(1,S),!J&&!et&&(it<Y.bodV?et={motivo:"caida",amperios:S,voltios:it}:S>Y.limitePuertoA?et={motivo:"puerto",amperios:S}:X.abierto&&(et={motivo:"fusible",amperios:S}))),Tt+=S,wt=Math.max(wt,S),jt++}function Ro(){let{motivo:f,amperios:d,voltios:S}=et;et=null,f==="caida"?$t({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),voltios:Math.round(S*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${S.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):f==="puerto"?$t({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${d.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(Y.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):($t({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(d*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(d*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),J=!0),Zt++,lt+=T.ciclos,pe(),Dt()}function Ao(f){let d=ft/1e3,S=f;for(;S>0&&J;){let m=Math.min(S,d);lt+=m,S-=m,ns(),X.abierto||(J=!1)}S>0&&T.correr(S)}function rs(){let f=St();Jt=Jt.filter(([S])=>f-S<1e3),Jt.push([f,wt]);let d={amperios:jt?Tt/jt:0,pico:Math.max(...Jt.map(([,S])=>S)),voltios:it,fusible:Math.round(X.calor*100)/100,apagada:J,reinicios:Zt};return Tt=0,wt=0,jt=0,d}function cs(){let f={};for(let[d,S]of V){let m=S.logico.estado();f[d]={modelo:S.modelo,angulo:Math.round(m.angulo*10)/10,pulso:m.pulso===null?null:Math.round(m.pulso),senal:S.senal,fuente:S.fuente,moviendo:m.moviendo,i:S.msVentana?S.sumaA/S.msVentana:S.logico.corriente(S.voltios),pico:S.picoA},S.sumaA=0,S.picoA=0,S.msVentana=0}return f}function bo(f,d,S){let m=O.get(f);if(m)return m;let v=I.flotantes(d),Q=new Set;be.forEach((q,pt)=>{v.has(q[0])&&Q.add(pt)});let ut=new Set,Rt=[];for(let q of no){let pt=d[q];if(pt!==dt.Input&&pt!==dt.InputPullUp)continue;if(v.has(q)){ut.add(q),Rt.push([q,"aire"]);continue}let At=S?S.voltajes["placa."+q]:null;typeof At=="number"?Rt.push([q,At>=Wi?!0:At<=Li?!1:null]):Rt.push([q,pt===dt.InputPullUp])}let vt=be.map(q=>{for(let pt of q){let At=S?S.voltajes["placa."+pt]:null;if(typeof At=="number")return At}return null});return m={canales:Q,alAire:ut,entradas:Rt,analogicos:vt,refsAlAire:I.refsAlAire(d)},S&&O.set(f,m),m}function Te(f,d){G[f]!==d&&(G[f]=d,T.ponerEntrada(f,d))}function Dt(){if(!I||!T)return;let f=st.get(h)||T.estados(),d=fs(h),S=bo(h,f,d);l=S.alAire;for(let[m,v]of S.entradas){if(v==="aire"){m in A||(A[m]=o()<.5),Te(m,s.entradaFlotante?A[m]:!1);continue}let Q=v===null?!!E[m]:v;E[m]=Q,Te(m,Q)}g=S.canales,d&&S.analogicos!==rt&&(S.analogicos.forEach((m,v)=>{m!==null&&(!rt||rt[v]!==m)&&T.ponerAnalogico(v,m)}),rt=S.analogicos),x=S.refsAlAire}function Io(){if(!(!s.entradaFlotante||!l.size))for(let f of l){let d=is("placa."+f)?go():o()<ji?!A[f]:A[f];d!==A[f]&&(A[f]=d,Te(f,d))}}function To(f,d){if(g.has(f)){if(!s.entradaFlotante)return 0;if(is("placa."+be[f][0]))return 2.5+2.5*Math.sin(2*Math.PI*ro*(St()/1e3));let S=u.has(f)?u.get(f):1+3*o(),m=Math.max(0,Math.min(5,S+ls()*qi));return u.set(f,m),m}return s.ruidoADC?d+ls()*Gi:d}function ls(){return Math.sqrt(-2*Math.log(1-o()))*Math.cos(2*Math.PI*o())}function $t(f){let d=f.tipo+"|"+f.componente;return D.has(d)?!1:(D.add(d),C.push(f),_.push(f),!0)}function fs(f){for(let d=0;d<4;d++){let S=k.get(f);if(S)return S;I.ponerPines(st.get(f));let m=null;try{m=I.resolver()}catch{m=null}if(tt++,!m||!m.convergio)return $t({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;k.set(f,m);let v=!1;for(let Q of[...I.fallasFijas,...Gs(m,s)])$t(Q)&&Q.tipo==="led_quemado"&&($.add(Q.componente),v=!0);if(!v)return m;Yt()}return k.get(f)||null}function wo(){if(J)return Mo();ss();let f=p;if(P&&P.ciclo>c.inicio){f=P.tiempos;let H=new Map;for(let[Z,Mt]of p){let xs=Mt-(P.tiempos.get(Z)||0);xs>0&&H.set(Z,xs)}p=H,c={inicio:P.ciclo,clave:c.clave}}else p=new Map,c={inicio:T.ciclos,clave:h};P=null;let d=[...f].filter(([,H])=>H>0);d.length||(d=y.length?y:[[h,1]]),y=d;let S=d.reduce((H,[,Z])=>H+Z,0),m=[];for(let[H,Z]of d){let Mt=fs(H);if(!Mt){m.length=0;break}m.push([Mt,Z/S])}let v=m.length?Xi(m):null,Q=new Set(yt.filter(H=>H in W&&T.ciclos-W[H]<co/1e3*ft));v&&(v.pwm=zi(d,S,Q)),Eo(v),rt=null;let Rt=T.ciclos-B>co/1e3*ft?1:1-Math.exp(-(S/ft*1e3)/Ki);b=v?Qe(v,b,Rt):null;let vt=T.estados(),q=M.length?L.decode(Uint8Array.from(M),{stream:!0}):"";M=[];let pt=cs(),At=rs(),hs=Et.foto(St());if(Lt=b?b.fuentes.reduce((H,Z)=>H+Math.max(0,Z.i),0):0,b){b.usb=At,b.servos=Object.entries(pt).map(([Z,Mt])=>({id:Z,...Mt}));let H=(b.fuentes.find(Z=>Z.pin==="5V")||{i:0}).i;b.consumo5V=H+b.servos.filter(Z=>Z.fuente==="5V").reduce((Z,Mt)=>Z+Mt.i,0),Object.assign(b,hs.lista,{porVin:Qt})}let $o=_;return _=[],{msSimulados:St(),servos:pt,piezas:hs.piezas,evaluaciones:tt,leds:Object.fromEntries((b?b.leds:[]).map(H=>[H.id,H.brillo])),quemados:[...$],voltajes:yo(),entradas:Po(),placa:{led13:vt.D13===dt.High,ledTX:St()<ct},serial:q,fallas:$o,medicion:b,energia:At}}function Mo(){let f=_;return _=[],{msSimulados:St(),evaluaciones:tt,servos:cs(),piezas:Et.foto(St()).piezas,energia:rs(),leds:{},quemados:[...$],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:f,medicion:null}}function yo(){if(!b)return{};if(!x.size)return b.voltajes;let f={...b.voltajes};for(let d of x)d in f&&(f[d]=null);return f}function Po(){let f={};for(let d of no)l.has(d)?f[d]={alto:!!s.entradaFlotante&&!!A[d],alAire:!0}:d in E&&(f[d]={alto:E[d],alAire:!1});return f}function Eo(f=b){f&&be.forEach((d,S)=>{for(let m of d){let v=f.voltajes["placa."+m];if(typeof v=="number")return T.ponerAnalogico(S,v)}})}function Do(){$.clear(),D.clear(),C.length=0,_=[],M=[],L=new TextDecoder("utf-8"),ct=0,ds(),pe(),Yt(),Dt()}function ds(){lt=0,J=!1,et=null,Jt=[],X.reiniciar(),it=Y.idealV,Ie=0,Qt=!1}return pe(),Yt(),Dt(),{get ciclos(){return lt+T.ciclos},avanzar(f){if(J)return Ao(f);T.correr(f),et&&Ro()},foto:wo,ponerCircuito(f){R=f,Yt(),Dt()},ponerMano(f){n=Array.isArray(f)?f.filter(d=>typeof d=="string"):[],os()},ponerPulsador(f,d){d?a.add(f):a.delete(f),Yt(),Dt()},enviarSerial:f=>T.enviarSerial(String(f)),reiniciarChip(){ds(),pe(),Dt()},reiniciarTodo(){Zt=0,Do()},fallas:()=>[...C]}}function zi(t,e,s=new Set){let i={},o=new Set;for(let[r,l]of t)for(let g=0;g<yt.length;g++){let x=Math.floor(r/Je[yt[g]])%4===dt.High;i[g]=(i[g]||0)+(x?l:0),o.add(g)}let a=yt,n={};for(let r of o){let l=i[r]/e;(l>0&&l<1||s.has(a[r]))&&(n[a[r]]=Math.round(l*1e3)/1e3)}return n}var yt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Je=Object.fromEntries(yt.map((t,e)=>[t,4**e]));function Xi(t){if(t.length===1)return t[0][0];let e=t[0][0],s=n=>n.reduce((r,[,l])=>r+l,0),i=n=>{let r=0;for(let[l,g]of t){let x=n(l);if(x==null)return null;r+=g*x}return r},o=(n,r,l)=>[...new Set(t.flatMap(([x])=>x[n].map(A=>A[r])))].map(x=>{let A={[r]:x},u=t.filter(([T])=>T[n].some(R=>R[r]===x)),E=s(u);for(let T of l)T==="i"?A.i=t.reduce((R,[I,k])=>R+k*((I[n].find(O=>O[r]===x)||{i:0}).i||0),0):A[T]=E?u.reduce((R,[I,k])=>R+k*(I[n].find(O=>O[r]===x)[T]||0),0)/E:null;return A}),a={};for(let n of Object.keys(e.voltajes))a[n]=i(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:a,leds:e.leds.map((n,r)=>{let l=i(g=>g.leds[r]?g.leds[r].i:0);return{id:n.id,quemado:t.some(([g])=>g.leds[r]&&g.leds[r].quemado),v:i(g=>g.leds[r]?g.leds[r].v:null),i:l,brillo:Math.max(0,Math.min(1,l*1e3/ot.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:i(l=>l.resistencias[r].v),i:i(l=>l.resistencias[r].i),w:i(l=>l.resistencias[r].w)})),pines:o("pines","pin",["v","i"]),fuentes:o("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:i(l=>l.potenciometros[r].v),i:i(l=>l.potenciometros[r].i)}))}}function Qe(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let i=a=>a&&typeof a=="object"?a.id||a.pin:void 0,o=new Map((Array.isArray(e)?e:[]).map(a=>[i(a),a]));return t.map((a,n)=>Qe(a,i(a)!==void 0?o.get(i(a)):(e||[])[n],s))}if(t&&typeof t=="object"){let i={};for(let o of Object.keys(t))i[o]=Qe(t[o],e&&typeof e=="object"?e[o]:void 0,s);return i}return t}function Zi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Ji=16,Qi=8,Yi=50,ta=500,he=ft/1e3,nt=null,xe=!1,fo=0,Pt=0,Ye=0,ho=0,es=0,ts=!1,Xt=[],xo=new MessageChannel;xo.port1.onmessage=uo;function uo(){ts=!1,sa()}function po(t){ts||(ts=!0,t>0?setTimeout(uo,t):xo.port2.postMessage(null))}function ea(t){for(;Xt.length&&t-Xt[0][0]>ta;)Xt.shift();let e=0,s=0;for(let[,i,o]of Xt)e+=i,s+=o;return e>0?Math.min(1,s/(e*he)):1}function ue(t=performance.now()){ho=t;let e=nt.foto();self.postMessage({tipo:"foto",corrida:fo,...e,velocidad:ea(t),msReales:es})}function sa(){if(!xe||!nt)return;let t=performance.now(),e=Math.max(0,t-Ye);Ye=t,es+=e,Pt=Math.min(Pt+e*he,Yi*he);let s=performance.now(),i=0;for(;Pt>=1&&performance.now()-s<Qi;){let o=nt.ciclos;nt.avanzar(Math.min(Math.floor(Pt),he));let a=nt.ciclos-o;Pt-=a,i+=a}Xt.push([t,e,i]),t-ho>=Ji&&ue(t),po(Pt>=he?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(fo=e.corrida),e.tipo){case"crear":nt=lo({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(nt.reiniciarTodo(),es=0),xe=!0,Pt=0,Ye=performance.now(),Xt.length=0,ue(),po(0);break;case"pausar":xe=!1;break;case"reiniciar":nt.reiniciarChip(),Pt=0,ue();break;case"detener":xe=!1;break;case"circuito":nt.ponerCircuito(e.circuito),e.mostrar&&ue();break;case"serial":nt.enviarSerial(e.texto);break;case"pulsador":nt.ponerPulsador(e.id,e.presionado),xe||ue();break;case"mano":nt.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function vr(t={}){let{lienzo:e,hex:o}=t,s=t.placa||"uno";if(s!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");Cr(o);let i=t.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(tc.map(P=>[P,i==="realista"]));Object.assign(c,t.noIdealidades||{});let n=typeof t.alEvento=="function"?t.alEvento:null,p={serial:[],falla:[],estado:[]},d="detenido",u=!0,g=0,b=null,$=0,_={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},k=null,W=0,U=[],B=ec(wt);B.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:c});function wt(P){if(!u)return;if(P.tipo==="error")return console.error("TecnoCircuito:",P.mensaje);if(P.tipo!=="foto"||P.corrida!==g||d==="detenido")return;Object.assign(_,{msSimulados:P.msSimulados,msReales:P.msReales,velocidad:P.velocidad,evaluaciones:P.evaluaciones}),k=P.medicion?{...P.medicion,voltajes:P.voltajes,entradas:P.entradas}:null;for(let pt of P.fallas){U.push(pt),p.falla.forEach(m=>ut(m,{tipo:pt.tipo,componente:pt.componente,mensaje:pt.mensaje}));let{mensaje:ft,...Nt}=pt;st("falla",Nt)}let X=P.energia?P.energia.reinicios:0;X>W&&st("reinicio_placa",{motivo:"energia_usb",nuevos:X-W,total:X}),W=X,P.serial&&p.serial.forEach(pt=>ut(pt,P.serial)),b=P,$||($=requestAnimationFrame(O))}function O(){if($=0,d==="detenido"||!b)return e._mostrar({simulando:d!=="detenido"});e._mostrar({simulando:!0,leds:b.leds,quemados:b.quemados,voltajes:b.voltajes,servos:b.servos||{},piezas:b.piezas||{},placa:{ledPower:b.placa.encendida!==!1,led13:b.placa.led13,ledTX:b.placa.ledTX}})}function ut(P,X){try{P(X)}catch(pt){console.error(pt)}}function st(P,X){n&&ut(n,{t:Date.now(),origen:"simulador",tipo:P,datos:X})}function mt(P){d=P,p.estado.forEach(X=>ut(X,P))}return typeof e._alAcercar=="function"&&e._alAcercar(P=>{u&&B.enviar({tipo:"mano",refs:P})}),typeof e._alPulsar=="function"&&e._alPulsar((P,X)=>{u&&B.enviar({tipo:"pulsador",id:P,presionado:X})}),e.alCambiar(P=>{u&&B.enviar({tipo:"circuito",circuito:P,mostrar:d!=="detenido",corrida:g})}),{iniciar(){if(!u||d==="corriendo")return;let P=d==="detenido";g++,P&&(U.length=0,k=null,b=null,W=0,Object.assign(_,{msSimulados:0,msReales:0,velocidad:1}),st("simulacion_iniciada",{placa:s,modo:i})),mt("corriendo"),B.enviar({tipo:"iniciar",nuevo:P,corrida:g})},pausar(){d==="corriendo"&&(g++,B.enviar({tipo:"pausar",corrida:g}),mt("pausado"))},reiniciar(){!u||d==="detenido"||(g++,_.msSimulados=0,B.enviar({tipo:"reiniciar",corrida:g}),B.enviar({tipo:"iniciar",nuevo:!1,corrida:g}),W=0,st("reinicio_placa",{motivo:"boton"}),mt("reiniciado"),mt("corriendo"))},detener(){d!=="detenido"&&(g++,B.enviar({tipo:"detener",corrida:g}),st("simulacion_detenida",{ms_simulados:Math.round(_.msSimulados)}),mt("detenido"),k=null,O())},serialEnviar(P){d!=="detenido"&&B.enviar({tipo:"serial",texto:String(P)})},alSerial:P=>typeof P=="function"&&p.serial.push(P),alFalla:P=>typeof P=="function"&&p.falla.push(P),alEstado:P=>typeof P=="function"&&p.estado.push(P),medidas:()=>({..._,estado:d,hilo:B.hilo()}),destruir(){u&&(this.detener(),u=!1,cancelAnimationFrame($),B.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>d==="detenido"||!k?null:{...k,fallas:[...U],modo:i,activas:c},_mediciones(){return this.mediciones()}}}function ec(t){let e=null,o="worker",s=!1,i=[],c=p=>{if(p&&p.tipo==="listo"){s=!0,i.length=0;return}t(p)};function n(){o="pagina",e=oc(c),i.splice(0).forEach(p=>e.postMessage(p))}try{if(!ds||typeof Worker!="function")throw new Error("sin Worker");let p=URL.createObjectURL(new Blob([ds],{type:"text/javascript"})),d=new Worker(p);d.onmessage=u=>{u.data&&u.data.tipo==="listo"&&URL.revokeObjectURL(p),c(u.data)},d.onerror=u=>{if(s)return console.error("TecnoCircuito:",u.message);u.preventDefault(),d.terminate(),n()},e=d}catch{n()}return{enviar(p){!s&&o==="worker"&&i.push(p),e.postMessage(p)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function oc(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",ds)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var Ue=(t,e)=>t.toFixed(e).replace(".",","),Ut=t=>t==null?"al aire":Ue(t,2)+" V",Vt=t=>Ue(t*1e3,Math.abs(t)<.01?2:1)+" mA",Sr=(t,e)=>(t>=1e3?Ue(t/1e3,e)+" k":t+" ")+"\u03A9",wr=t=>"Pin "+t.replace(/^D/,"");function $r(t){if(!t||!t.leds)return[];let e=(d,u,g,b)=>({pieza:d,voltaje:u||"",corriente:g||"",detalle:b||""}),o=d=>{let u=t.entradas&&t.entradas[d];return u?u.alAire?`al aire: lee ${u.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:u.alto?"lee ALTO":"lee BAJO":""},s=new Set(t.pines.map(d=>d.pin)),i=t.servos||[],c=d=>i.find(u=>u.senal===d&&u.pulso),n=d=>{let u=c(d.pin);if(u)return`se\xF1al de servo: pulso de ${u.pulso} \xB5s`;let g=t.pwm&&t.pwm[d.pin];return g>.005&&g<.995?`PWM ${Math.round(g*100)} %`:o(d.pin)},p=t.usb;return[...t.pines.map(d=>e(wr(d.pin),Ut(d.v),Vt(d.i),n(d))),...Object.keys(t.entradas||{}).filter(d=>!s.has(d)&&"placa."+d in t.voltajes).map(d=>e(wr(d)+" (entrada)",Ut(t.voltajes["placa."+d]),"",o(d))),...(t.potenciometros||[]).map(d=>e(`${d.id} (${Sr(d.ohmios,0)})`,Ut(d.v),Vt(d.i),`perilla ${Math.round(d.posicion*100)} %`)),...t.resistencias.map(d=>e(`${d.id} (${Sr(d.ohmios,1)})`,Ut(d.v),Vt(d.i),Ue(d.w*1e3,1)+" mW")),...t.leds.map(d=>e(d.id,Ut(d.v),Vt(d.i),d.quemado?"quemado":`brillo ${Math.round(d.brillo*100)} %`)),...i.map(d=>e(`${d.id} (${d.modelo.toUpperCase()})`,"",Vt(d.i),d.fuente?d.senal?`${Math.round(d.angulo)}\xB0${d.moviendo?", movi\xE9ndose":""}${d.pulso?` \xB7 pulso ${d.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,Ut(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(d=>{let u=Math.abs(d.velocidad),g=Math.sign(d.velocidad)*(d.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${d.id} (${d.canal||"sin shield"})`,Ut(d.voltios),Vt(d.i),Math.abs(d.rpm)<1?"quieto":`${Math.round(Math.abs(d.rpm))} RPM \xB7 ${g} ${Math.round(u)} cm/s`)}),...(t.baterias||[]).map(d=>{let u=d.celdas||[d.voltios/2,d.voltios/2];return e(`${d.id} (LiPo 2S)`,Ut(d.voltios),d.conectada?Vt(d.i):"",`celdas ${u.map(g=>Ue(g,2)).join(" y ")} V${Math.min(...u)<Me.avisoCeldaV?" \xB7 c\xE1rgala":""}${d.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(d=>e(`${d.id} (probador)`,d.encendido?Ut(d.total):"","",d.encendido?`${d.celdas.length}S \xB7 ${d.celdas.map((u,g)=>`${g+1}: ${Ue(u,2)} V`).join(" \xB7 ")}${d.alarma?" \xB7 \xA1pita!":""}`:"apagado: con\xE9ctalo al cable de balance")),...i.length?[e("5V de la placa (USB)","",Vt(t.consumo5V),"el USB da hasta 500 mA")]:[],...p&&(i.length||p.reinicios||p.pico>.2)?[e("USB (placa y circuito)",Ut(p.voltios),Vt(p.amperios),`pico ${Vt(p.pico)} \xB7 fusible ${Math.round(p.fusible*100)} %${p.reinicios?` \xB7 ${p.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.1.0-dev",CONTRATO:1,PLACAS:Object.freeze(Object.keys(De)),crearLienzo:br,crearSimulador:vr,filasDeMediciones:$r});})();
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
