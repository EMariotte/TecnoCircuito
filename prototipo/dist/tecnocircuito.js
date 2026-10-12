(()=>{var Fo=globalThis,Ho=Fo.ShadowRoot&&(Fo.ShadyCSS===void 0||Fo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wa=Symbol(),xs=new WeakMap,no=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==wa)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ho&&e===void 0){let i=o!==void 0&&o.length===1;i&&(e=xs.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&xs.set(o,e))}return e}toString(){return this.cssText}},gs=t=>new no(typeof t=="string"?t:t+"",void 0,wa),Et=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((i,s,c)=>i+(p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw Error("Value passed to 'css' function must be a 'css' function result: "+p+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[c+1],t[0]);return new no(o,t,wa)},bs=(t,e)=>{if(Ho)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let i=document.createElement("style"),s=Fo.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}},Ra=Ho?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let i of e.cssRules)o+=i.cssText;return gs(o)})(t):t;var{is:Pn,defineProperty:Tn,getOwnPropertyDescriptor:In,getOwnPropertyNames:Dn,getOwnPropertySymbols:Mn,getPrototypeOf:On}=Object,qo=globalThis,ys=qo.trustedTypes,kn=ys?ys.emptyScript:"",Nn=qo.reactiveElementPolyfillSupport,co=(t,e)=>t,lo={toAttribute(t,e){switch(e){case Boolean:t=t?kn:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},Xo=(t,e)=>!Pn(t,e),Cs={attribute:!0,type:String,converter:lo,reflect:!1,useDefault:!1,hasChanged:Xo};Symbol.metadata??=Symbol("metadata"),qo.litPropertyMetadata??=new WeakMap;var Wt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Cs){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,o);s!==void 0&&Tn(this.prototype,e,s)}}static getPropertyDescriptor(e,o,i){let{get:s,set:c}=In(this.prototype,e)??{get(){return this[o]},set(p){this[o]=p}};return{get:s,set(p){let n=s?.call(this);c?.call(this,p),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Cs}static _$Ei(){if(this.hasOwnProperty(co("elementProperties")))return;let e=On(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(co("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(co("properties"))){let o=this.properties,i=[...Dn(o),...Mn(o)];for(let s of i)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[i,s]of o)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[o,i]of this.elementProperties){let s=this._$Eu(o,i);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)o.unshift(Ra(s))}else e!==void 0&&o.push(Ra(e));return o}static _$Eu(e,o){let i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return bs(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let c=(i.converter?.toAttribute!==void 0?i.converter:lo).toAttribute(o,i.type);this._$Em=e,c==null?this.removeAttribute(s):this.setAttribute(s,c),this._$Em=null}}_$AK(e,o){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let c=i.getPropertyOptions(s),p=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:lo;this._$Em=s;let n=p.fromAttribute(o,c.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,o,i,s=!1,c){if(e!==void 0){let p=this.constructor;if(s===!1&&(c=this[e]),i??=p.getPropertyOptions(e),!((i.hasChanged??Xo)(c,o)||i.useDefault&&i.reflect&&c===this._$Ej?.get(e)&&!this.hasAttribute(p._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:s,wrapped:c},p){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,p??o??this[e]),c!==!0||p!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,c]of this._$Ep)this[s]=c;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,c]of i){let{wrapped:p}=c,n=this[s];p!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,c,n)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};Wt.elementStyles=[],Wt.shadowRootOptions={mode:"open"},Wt[co("elementProperties")]=new Map,Wt[co("finalized")]=new Map,Nn?.({ReactiveElement:Wt}),(qo.reactiveElementVersions??=[]).push("2.1.2");var Oa=globalThis,Ss=t=>t,Ko=Oa.trustedTypes,vs=Ko?Ko.createPolicy("lit-html",{createHTML:t=>t}):void 0,Es="$lit$",oe=`lit$${Math.random().toFixed(9).slice(2)}$`,Ps="?"+oe,Vn=`<${Ps}>`,ge=document,fo=()=>ge.createComment(""),ho=t=>t===null||typeof t!="object"&&typeof t!="function",ka=Array.isArray,Un=t=>ka(t)||typeof t?.[Symbol.iterator]=="function",Ea=`[ 	
\f\r]`,po=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,As=/-->/g,_s=/>/g,me=RegExp(`>|${Ea}(?:([^\\s"'>=/]+)(${Ea}*=${Ea}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$s=/'/g,ws=/"/g,Ts=/^(?:script|style|textarea|title)$/i,Na=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Ct=Na(1),Ht=Na(2),al=Na(3),Ft=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),Rs=new WeakMap,xe=ge.createTreeWalker(ge,129);function Is(t,e){if(!ka(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return vs!==void 0?vs.createHTML(e):e}var Bn=(t,e)=>{let o=t.length-1,i=[],s,c=e===2?"<svg>":e===3?"<math>":"",p=po;for(let n=0;n<o;n++){let l=t[n],x,b,m=-1,S=0;for(;S<l.length&&(p.lastIndex=S,b=p.exec(l),b!==null);)S=p.lastIndex,p===po?b[1]==="!--"?p=As:b[1]!==void 0?p=_s:b[2]!==void 0?(Ts.test(b[2])&&(s=RegExp("</"+b[2],"g")),p=me):b[3]!==void 0&&(p=me):p===me?b[0]===">"?(p=s??po,m=-1):b[1]===void 0?m=-2:(m=p.lastIndex-b[2].length,x=b[1],p=b[3]===void 0?me:b[3]==='"'?ws:$s):p===ws||p===$s?p=me:p===As||p===_s?p=po:(p=me,s=void 0);let v=p===me&&t[n+1].startsWith("/>")?" ":"";c+=p===po?l+Vn:m>=0?(i.push(x),l.slice(0,m)+Es+l.slice(m)+oe+v):l+oe+(m===-2?n:v)}return[Is(t,c+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},uo=class t{constructor({strings:e,_$litType$:o},i){let s;this.parts=[];let c=0,p=0,n=e.length-1,l=this.parts,[x,b]=Bn(e,o);if(this.el=t.createElement(x,i),xe.currentNode=this.el.content,o===2||o===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=xe.nextNode())!==null&&l.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Es)){let S=b[p++],v=s.getAttribute(m).split(oe),_=/([.?@])?(.*)/.exec(S);l.push({type:1,index:c,name:_[2],strings:v,ctor:_[1]==="."?Ta:_[1]==="?"?Ia:_[1]==="@"?Da:Oe}),s.removeAttribute(m)}else m.startsWith(oe)&&(l.push({type:6,index:c}),s.removeAttribute(m));if(Ts.test(s.tagName)){let m=s.textContent.split(oe),S=m.length-1;if(S>0){s.textContent=Ko?Ko.emptyScript:"";for(let v=0;v<S;v++)s.append(m[v],fo()),xe.nextNode(),l.push({type:2,index:++c});s.append(m[S],fo())}}}else if(s.nodeType===8)if(s.data===Ps)l.push({type:2,index:c});else{let m=-1;for(;(m=s.data.indexOf(oe,m+1))!==-1;)l.push({type:7,index:c}),m+=oe.length-1}c++}}static createElement(e,o){let i=ge.createElement("template");return i.innerHTML=e,i}};function Me(t,e,o=t,i){if(e===Ft)return e;let s=i!==void 0?o._$Co?.[i]:o._$Cl,c=ho(e)?void 0:e._$litDirective$;return s?.constructor!==c&&(s?._$AO?.(!1),c===void 0?s=void 0:(s=new c(t),s._$AT(t,o,i)),i!==void 0?(o._$Co??=[])[i]=s:o._$Cl=s),s!==void 0&&(e=Me(t,s._$AS(t,e.values),s,i)),e}var Pa=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:i}=this._$AD,s=(e?.creationScope??ge).importNode(o,!0);xe.currentNode=s;let c=xe.nextNode(),p=0,n=0,l=i[0];for(;l!==void 0;){if(p===l.index){let x;l.type===2?x=new mo(c,c.nextSibling,this,e):l.type===1?x=new l.ctor(c,l.name,l.strings,this,e):l.type===6&&(x=new Ma(c,this,e)),this._$AV.push(x),l=i[++n]}p!==l?.index&&(c=xe.nextNode(),p++)}return xe.currentNode=ge,s}p(e){let o=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}},mo=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,s){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Me(this,e,o),ho(e)?e===et||e==null||e===""?(this._$AH!==et&&this._$AR(),this._$AH=et):e!==this._$AH&&e!==Ft&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Un(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==et&&ho(this._$AH)?this._$AA.nextSibling.data=e:this.T(ge.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=uo.createElement(Is(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(o);else{let c=new Pa(s,this),p=c.u(this.options);c.p(o),this.T(p),this._$AH=c}}_$AC(e){let o=Rs.get(e.strings);return o===void 0&&Rs.set(e.strings,o=new uo(e)),o}k(e){ka(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,i,s=0;for(let c of e)s===o.length?o.push(i=new t(this.O(fo()),this.O(fo()),this,this.options)):i=o[s],i._$AI(c),s++;s<o.length&&(this._$AR(i&&i._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let i=Ss(e).nextSibling;Ss(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,s,c){this.type=1,this._$AH=et,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=c,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=et}_$AI(e,o=this,i,s){let c=this.strings,p=!1;if(c===void 0)e=Me(this,e,o,0),p=!ho(e)||e!==this._$AH&&e!==Ft,p&&(this._$AH=e);else{let n=e,l,x;for(e=c[0],l=0;l<c.length-1;l++)x=Me(this,n[i+l],o,l),x===Ft&&(x=this._$AH[l]),p||=!ho(x)||x!==this._$AH[l],x===et?e=et:e!==et&&(e+=(x??"")+c[l+1]),this._$AH[l]=x}p&&!s&&this.j(e)}j(e){e===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ta=class extends Oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===et?void 0:e}},Ia=class extends Oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==et)}},Da=class extends Oe{constructor(e,o,i,s,c){super(e,o,i,s,c),this.type=5}_$AI(e,o=this){if((e=Me(this,e,o,0)??et)===Ft)return;let i=this._$AH,s=e===et&&i!==et||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,c=e!==et&&(i===et||s);s&&this.element.removeEventListener(this.name,this,i),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ma=class{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Me(this,e)}};var jn=Oa.litHtmlPolyfillSupport;jn?.(uo,mo),(Oa.litHtmlVersions??=[]).push("3.3.3");var Ds=(t,e,o)=>{let i=o?.renderBefore??e,s=i._$litPart$;if(s===void 0){let c=o?.renderBefore??null;i._$litPart$=s=new mo(e.insertBefore(fo(),c),c,void 0,o??{})}return s._$AI(t),s};var Va=globalThis,ct=class extends Wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ds(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ft}};ct._$litElement$=!0,ct.finalized=!0,Va.litElementHydrateSupport?.({LitElement:ct});var Ln=Va.litElementPolyfillSupport;Ln?.({LitElement:ct});(Va.litElementVersions??=[]).push("4.2.2");var Vt=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Gn={attribute:!0,type:String,converter:lo,reflect:!1,hasChanged:Xo},zn=(t=Gn,e,o)=>{let{kind:i,metadata:s}=o,c=globalThis.litPropertyMetadata.get(s);if(c===void 0&&globalThis.litPropertyMetadata.set(s,c=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),c.set(o.name,t),i==="accessor"){let{name:p}=o;return{set(n){let l=e.get.call(this);e.set.call(this,n),this.requestUpdate(p,l,t,!0,n)},init(n){return n!==void 0&&this.C(p,void 0,t,n),n}}}if(i==="setter"){let{name:p}=o;return function(n){let l=this[p];e.call(this,n),this.requestUpdate(p,l,t,!0,n)}}throw Error("Unsupported decorator location: "+i)};function L(t){return(e,o)=>typeof o=="object"?zn(t,e,o):((i,s,c)=>{let p=s.hasOwnProperty(c);return s.constructor.createProperty(c,i),p?Object.getOwnPropertyDescriptor(s,c):void 0})(t,e,o)}var be=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function Ms(t,e){return(o,i,s)=>{let c=p=>p.renderRoot?.querySelector(t)??null;if(e){let{get:p,set:n}=typeof i=="object"?o:s??(()=>{let l=Symbol();return{get(){return this[l]},set(x){this[l]=x}}})();return be(o,i,{get(){let l=p.call(this);return l===void 0&&(l=c(this),(l!==null||this.hasUpdated)&&n.call(this,l)),l}})}return be(o,i,{get(){return c(this)}})}}var Os=Ht`
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
`;var Pt=t=>({type:"analog",channel:t}),xo=(t,e=0)=>({type:"i2c",signal:t,bus:e}),go=(t,e=0)=>({type:"spi",signal:t,bus:e}),Ua=(t,e=0)=>({type:"usart",signal:t,bus:e});var ke=[" ","Spacebar"];function Wn(){return typeof navigator=="object"?navigator.userAgent:""}function Fn(){return Wn().indexOf("Macintosh")>=0}function ks(t){return Fn()?t.metaKey:t.ctrlKey}var ye=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(p=t[n])&&(c=(s<3?p(c):s>3?p(e,o,c):p(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},ae=class extends ct{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[Pt(5),xo("SCL")]},{name:"A4.2",x:97,y:9,signals:[Pt(4),xo("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[go("SCK")]},{name:"12",x:134.5,y:9,signals:[go("MISO")]},{name:"11",x:144,y:9,signals:[go("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[go("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[Ua("TX")]},{name:"0",x:255.5,y:9,signals:[Ua("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[Pt(0)]},{name:"A1",x:217.5,y:191.5,signals:[Pt(1)]},{name:"A2",x:227,y:191.5,signals:[Pt(2)]},{name:"A3",x:236.5,y:191.5,signals:[Pt(3)]},{name:"A4",x:246,y:191.5,signals:[Pt(4),xo("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[Pt(5),xo("SCL")]}]}static get styles(){return Et`
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

        ${Os}

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
          @keydown=${c=>ke.includes(c.key)&&this.down()}
          @keyup=${c=>ke.includes(c.key)&&this.up()}
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
          ${e&&Ht`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&Ht`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${s&&Ht`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${i&&Ht`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};ye([L()],ae.prototype,"led13",void 0);ye([L()],ae.prototype,"ledRX",void 0);ye([L()],ae.prototype,"ledTX",void 0);ye([L()],ae.prototype,"ledPower",void 0);ye([L()],ae.prototype,"resetPressed",void 0);ye([Ms("#reset-button")],ae.prototype,"resetButton",void 0);ae=ye([Vt("wokwi-arduino-uno")],ae);var Ns=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(p=t[n])&&(c=(s<3?p(c):s>3?p(e,o,c):p(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Ba={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},ja=class extends ct{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return Et`
      :host {
        display: flex;
      }
    `}breakValue(e){let o=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,i=Math.round(e/10**o);return e===0?[0,0]:[Math.round(i%100),o]}render(){let{value:e}=this,o=parseFloat(e),[i,s]=this.breakValue(o),c=Ba[Math.floor(i/10)],p=Ba[i%10],n=Ba[s];return Ct`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${p}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${n}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};Ns([L()],ja.prototype,"value",void 0);ja=Ns([Vt("wokwi-resistor")],ja);var Ce=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(p=t[n])&&(c=(s<3?p(c):s>3?p(e,o,c):p(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Hn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},ie=class extends ct{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let e=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:e,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return Et`
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
    `}update(e){e.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(e)}renderSVG(){let{color:e,lightColor:o,flip:i}=this,s=o||Hn[e?.toLowerCase()]||e,c=this.brightness?.3+this.brightness*.7:0,p=this.value&&this.brightness>Number.EPSILON;return Ct`<svg
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
    </svg> `}render(){return Ct`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};Ce([L()],ie.prototype,"value",void 0);Ce([L()],ie.prototype,"brightness",void 0);Ce([L()],ie.prototype,"color",void 0);Ce([L()],ie.prototype,"lightColor",void 0);Ce([L()],ie.prototype,"label",void 0);Ce([L({type:Boolean})],ie.prototype,"flip",void 0);ie=Ce([Vt("wokwi-led")],ie);var Vs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Us=t=>(...e)=>({_$litDirective$:t,values:e}),Jo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,i){this._$Ct=e,this._$AM=o,this._$Ci=i}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var Bs="important",qn=" !"+Bs,js=Us(class extends Jo{constructor(t){if(super(t),t.type!==Vs.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let i=t[o];return i==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?o.removeProperty(i):o[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let c=typeof s=="string"&&s.endsWith(qn);i.includes("-")||c?o.setProperty(i,c?s.slice(0,-11):s,c?Bs:""):o[i]=s}}return Ft}});var Yo=(t,e,o)=>{let i=Math.min(o,e);return Math.max(i,t)};function Ls(t,e){let o=e.transformPoint({x:t.left,y:t.top}),i=e.transformPoint({x:t.right,y:t.top}),s=e.transformPoint({x:t.left,y:t.bottom}),c=e.transformPoint({x:t.right,y:t.bottom}),p=Math.min(o.x,i.x,s.x,c.x),n=Math.min(o.y,i.y,s.y,c.y),l=Math.max(o.x,i.x,s.x,c.x),x=Math.max(o.y,i.y,s.y,c.y);return new DOMRect(p,n,l-p,x-n)}function Gs(t,e,o){let{userAgent:i}=navigator;if(i.indexOf("Epiphany")>=0||i.indexOf("Safari")>=0){let c=t.getCTM(),p=e?.getCTM(),n=e?.getBoundingClientRect(),l=e?.ownerSVGElement?.getBoundingClientRect();if(!n||!l||!p||!c)return null;let x=l.x+l.width/2,b=l.y+l.height/2,m=x-(n.x+n.width/2),S=b-(n.y+n.height/2),v=Math.atan2(S,m)/Math.PI*180,_=new DOMMatrix().rotate(v),O=Ls(o,_),B=O.width/n.width,k=O.height/n.height,gt=p.inverse().multiply(c);return _.inverse().translate(O.left,O.top).multiply(gt.inverse()).scale(B,k).translate(-n.left,-n.top)}else return t.getScreenCTM()?.inverse()||null}var Se=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(p=t[n])&&(c=(s<3?p(c):s>3?p(e,o,c):p(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},Zo={x:9.91,y:8.18},se=class extends ct{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[Pt(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return Et`
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
    `}mapToMinMax(e,o,i){return e*(i-o)+o}percentFromMinMax(e,o,i){return(e-o)/(i-o)}renderSVG(){let e=Yo(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*e+this.startDegree;return Ct`<svg
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
      style=${js({"--knob-angle":o+"deg"})}
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(e){let o=e.target;this.updateValue(parseFloat(o.value))}down(e){(e.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,e.stopPropagation(),e.preventDefault(),this.updateKnobMatrix())}move(e){let{pressed:o}=this;o&&this.rotateHandler(e)}up(){this.pressed=!1}updateKnobMatrix(){let e=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=e&&o?Gs(e,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(e){if(e.stopPropagation(),e.preventDefault(),!this.pageToKnobMatrix)return;let o=e.type==="touchmove",i=o?e.touches[0].pageX:e.pageX,s=o?e.touches[0].pageY:e.pageY,c=new DOMPointReadOnly(i,s).matrixTransform(this.pageToKnobMatrix),p=Zo.x-c.x,n=Zo.y-c.y,l=Math.round(Math.atan2(n,p)*180/Math.PI);l<0&&(l+=360),l-=90,p>0&&n<=0&&l>0&&(l-=360),l=Yo(this.startDegree,this.endDegree,l);let x=this.percentFromMinMax(l,this.startDegree,this.endDegree),b=this.mapToMinMax(x,this.min,this.max);this.updateValue(b)}updateValue(e){let o=Yo(this.min,this.max,e),i=Math.round(o/this.step)*this.step;this.value=Math.round(i*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};Se([L({type:Number})],se.prototype,"min",void 0);Se([L({type:Number})],se.prototype,"max",void 0);Se([L()],se.prototype,"value",void 0);Se([L()],se.prototype,"step",void 0);Se([L()],se.prototype,"startDegree",void 0);Se([L()],se.prototype,"endDegree",void 0);se=Se([Vt("wokwi-potentiometer")],se);var bo=function(t,e,o,i){var s=arguments.length,c=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(p=t[n])&&(c=(s<3?p(c):s>3?p(e,o,c):p(e,o))||c);return s>3&&c&&Object.defineProperty(e,o,c),c},La,Ne=class extends ct{static{La=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+La.pushbuttonCounter++}static get styles(){return Et`
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
      ${i?Ht`
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
        @keydown=${i=>ke.includes(i.key)&&this.down()}
        @keyup=${i=>ke.includes(i.key)&&this.up(i)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(e){this.pressed&&(ks(e)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(e){this.sticky||this.up(e)}};bo([L()],Ne.prototype,"color",void 0);bo([L()],Ne.prototype,"pressed",void 0);bo([L()],Ne.prototype,"label",void 0);bo([L({type:Boolean,attribute:"xray"})],Ne.prototype,"xray",void 0);Ne=La=bo([Vt("wokwi-pushbutton")],Ne);var zs=`:host {
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
`;var Ut={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var z=9.6/2.54,Z=57.6,Qo=14.4,Ws={x:Qo,ancho:32.2*z},Tt={x:Qo+(32.2-22.2)/2*z,ancho:22.2*z,alto:11.8*z},Ve={x:Tt.x+5.9*z,y:Z},Ga=13.5*z,Ue=182.4,ea={ancho:201.6,alto:86.4},ta={GND:{x:Ue,y:Z-9.6,color:"#7a4a24"},VCC:{x:Ue,y:Z,color:"#d7263d"},SIG:{x:Ue,y:Z+9.6,color:"#f28c28"}},M=t=>Math.round(t*100)/100,za=t=>`rotate(${M(-t)} ${M(Ve.x)} ${M(Ve.y)})`;function Wa(t="sg90",e=90){let o=Ut[t]||Ut.sg90,{ancho:i,alto:s}=ea,c=Z-Tt.alto/2,p=M(Ve.x),n=Tt.x+Tt.ancho,l=t==="sg90",x=Object.values(ta).map((S,v)=>{let _=Z-4+v*4;return`<path d="M${M(n)} ${M(_)} C ${M(n+26)} ${M(_)}, ${M(Ue-34)} ${M(S.y)}, ${M(Ue-9)} ${M(S.y)}" fill="none" stroke="${S.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),b=Object.values(ta).map(S=>`<rect x="${M(S.x-2.2)}" y="${M(S.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),m=l?`<circle cx="${M(Tt.x+15*z)}" cy="${Z}" r="${M(3.6*z)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${M(Tt.x+9.5*z)}" cy="${M(Z+2.2*z)}" r="${M(2.2*z)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${s}" viewBox="0 0 ${i} ${s}"><title>Servo ${o.nombre}</title>`+x+`<rect x="${M(Ue-9)}" y="${M(Z-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+b+`<rect x="${M(Ws.x)}" y="${M(c+1.5)}" width="${M(Ws.ancho)}" height="${M(Tt.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${l?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${M(Qo+2.4*z)}" cy="${Z}" r="${M(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${M(Qo+(32.2-2.4)*z)}" cy="${Z}" r="${M(1*z)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${M(Tt.x)}" y="${M(c)}" width="${M(Tt.ancho)}" height="${M(Tt.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${l?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+m+`<text x="${M(Tt.x+15.5*z)}" y="${M(Z+4.1*z)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${p}" cy="${Z}" r="${M(5.2*z)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${za(e)}"><path d="M${p} ${M(Z-3.2*z/2-1)} L${M(Ve.x+Ga)} ${M(Z-1.1*z)} A ${M(1.1*z)} ${M(1.1*z)} 0 0 1 ${M(Ve.x+Ga)} ${M(Z+1.1*z)} L${p} ${M(Z+3.2*z/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${p}" cy="${Z}" r="${M(3.4*z)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(S=>`<circle cx="${M(Ve.x+Ga*S)}" cy="${Z}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${p}" cy="${Z}" r="${M(1.3*z)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var ot=3.779527559055118,yo={ancho:72.58*ot,alto:53.34*ot},Be=4*ot,pt=5*ot,Kn=[{y:9,xs:[87,97,106,115.5,125,134.5,144,153.5,163,173]},{y:9,xs:[189,198.5,208,217.5,227,236.5,246,255.5]},{y:191.5,xs:[121.5,131,140.5,150,160,169.5,179,188.5]},{y:191.5,xs:[208,217.5,227,236.5,246,255.5]}],Xt=Be+4.6*ot,Kt=yo.ancho-.5-4.6*ot,qt=60,Bt=(t,e)=>({x:t,y:qt+e*pt}),re={M1A:Bt(Xt,0),M1B:Bt(Xt,1),GND_IZQ:Bt(Xt,2),M2A:Bt(Xt,3),M2B:Bt(Xt,4),M4A:Bt(Kt,0),M4B:Bt(Kt,1),GND_DER:Bt(Kt,2),M3A:Bt(Kt,3),M3B:Bt(Kt,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+pt,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}},Hs={M1A:"M1 \xB7 borne A del motor 1",M1B:"M1 \xB7 borne B del motor 1",M2A:"M2 \xB7 borne A del motor 2",M2B:"M2 \xB7 borne B del motor 2",M3A:"M3 \xB7 borne A del motor 3",M3B:"M3 \xB7 borne B del motor 3",M4A:"M4 \xB7 borne A del motor 4",M4B:"M4 \xB7 borne B del motor 4",GND_IZQ:"GND \xB7 tierra (\u2212)",GND_DER:"GND \xB7 tierra (\u2212)",EXT_POS:"EXT_PWR + \xB7 bater\xEDa de los motores (+)",EXT_GND:"EXT_PWR GND \xB7 bater\xEDa de los motores (\u2212)",S1_SIG:"SERVO_1 \xB7 se\xF1al (pin 10)",S1_POS:"SERVO_1 \xB7 + (5V)",S1_GND:"SERVO_1 \xB7 \u2212 (GND)",S2_SIG:"SERVO_2 \xB7 se\xF1al (pin 9)",S2_POS:"SERVO_2 \xB7 + (5V)",S2_GND:"SERVO_2 \xB7 \u2212 (GND)"},qa={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},qs=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]],I=t=>Math.round(t*100)/100,Q=(t,e,o,{tam:i=6.2,ancla:s="middle",peso:c="bold",color:p="#ffffff",giro:n=0}={})=>`<text x="${I(t)}" y="${I(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="${s}" fill="${p}"${n?` transform="rotate(${n} ${I(t)} ${I(e)})"`:""}>${o}</text>`;function Fa(t,e,o,i){let s=19.3*ot,c=6.4*ot,p=t-s/2,n=e-c/2,l="";for(let x=0;x<8;x++){let b=t-8.89*ot+x*2.54*ot;l+=`<rect x="${I(b-1.6)}" y="${I(n-3.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`,l+=`<rect x="${I(b-1.6)}" y="${I(n+c-.2)}" width="3.2" height="3.4" fill="#c9ccd1"/>`}return`<g transform="rotate(90 ${I(t)} ${I(e)})">`+l+`<rect x="${I(p)}" y="${I(n)}" width="${I(s)}" height="${I(c)}" rx="1.5" fill="#1d1f22" stroke="#000000" stroke-width="0.6"/><path d="M${I(p)} ${I(e-2.6)} a 2.6 2.6 0 0 1 0 5.2" fill="#3a3d42"/>`+Q(t+1.5,e+2.6,o,{tam:7.4,color:"#e8e8e8"})+"</g>"+Q(t,e-s/2-3,i,{tam:5.2})}function Ha(t,e,o,i=!0){let s=i?5.6*ot:o*pt+.6*ot,c=i?o*pt+.6*ot:5.6*ot,p=i?t-s/2:t-pt/2-.3*ot,n=i?e-pt/2-.3*ot:e-c/2,l="";for(let x=0;x<o;x++){let b=i?t:t+x*pt,m=i?e+x*pt:e;l+=`<circle cx="${I(b)}" cy="${I(m)}" r="6.4" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/>`,l+=`<line x1="${I(b-4.2)}" y1="${I(m)}" x2="${I(b+4.2)}" y2="${I(m)}" stroke="#555a61" stroke-width="1.4"/>`}return`<rect x="${I(p)}" y="${I(n)}" width="${I(s)}" height="${I(c)}" rx="1.5" fill="#2364b8" stroke="#123b70" stroke-width="0.8"/>`+l}var Fs=(t,e,o)=>`<circle cx="${I(t)}" cy="${I(e)}" r="${I(o/2)}" fill="#2a2a2a" stroke="#000000" stroke-width="0.6"/><path d="M${I(t)} ${I(e-o/2)} a ${I(o/2)} ${I(o/2)} 0 0 1 0 ${I(o)}" fill="#8a8f96" opacity="0.55"/><circle cx="${I(t)}" cy="${I(e)}" r="${I(o/2-2.2)}" fill="none" stroke="#c9ccd1" stroke-width="0.5"/>`;function Xa(t=!0){let{ancho:e,alto:o}=yo,i=Kn.map(({y:n,xs:l})=>{let x=l[0]-4.6,b=l[l.length-1]+4.6;return`<rect x="${I(x)}" y="${I(n-4.6)}" width="${I(b-x)}" height="9.2" fill="#151515"/>`+l.map(m=>`<rect x="${I(m-1.6)}" y="${I(n-1.6)}" width="3.2" height="3.2" fill="#4a4a4a"/>`).join("")}).join(""),s=["S2","S1"].map(n=>["SIG","POS","GND"].map(l=>{let x=re[`${n}_${l}`];return`<rect x="${I(x.x-4.4)}" y="${I(x.y-4.4)}" width="8.8" height="8.8" fill="#151515"/><rect x="${I(x.x-1.4)}" y="${I(x.y-1.4)}" width="2.8" height="2.8" fill="#d6b45a"/>`}).join("")).join(""),c=132,p=176;return`<svg xmlns="http://www.w3.org/2000/svg" width="${I(e)}" height="${I(o)}" viewBox="0 0 ${I(e)} ${I(o)}"><title>Shield de motores L293D</title><rect x="${I(Be)}" y="0.5" width="${I(e-Be-.5)}" height="${I(o-1)}" rx="6" fill="#1f5cab" stroke="#123b70" stroke-width="1"/><path d="M44 70 H66 M44 112 H66 M221 70 H245 M221 112 H245 M98 96 H129 M161 96 H189" stroke="#2f72c8" stroke-width="2" fill="none"/>`+i+Fa(82,86,"L293D","U1")+Fa(145,86,"74HC595","U3")+Fa(205,86,"L293D","U2")+Fs(118,140,6.3*ot)+Fs(205,140,6.3*ot)+`<rect x="146" y="128" width="10" height="5" rx="1" fill="#d9a441"/><rect x="160" y="128" width="10" height="5" rx="1" fill="#d9a441"/><circle data-led-pwr="1" cx="${c+20}" cy="${p}" r="3.2" fill="#1f5a2c" stroke="#0e2a14" stroke-width="0.6"/>`+Ha(Xt,qt,5)+Ha(Kt,qt,5)+Ha(re.EXT_POS.x,re.EXT_POS.y,2,!1)+s+`<rect x="${c-9}" y="${p-4.4}" width="18" height="8.8" fill="#151515"/><rect x="${c-6.4}" y="${p-1.4}" width="2.8" height="2.8" fill="#d6b45a"/><rect x="${c+3.6}" y="${p-1.4}" width="2.8" height="2.8" fill="#d6b45a"/>`+(t?`<rect data-puente="1" x="${c-9.6}" y="${p-5.2}" width="19.2" height="10.4" rx="1.5" fill="#2b2b2b" stroke="#000000" stroke-width="0.6"/>`:"")+`<rect x="${I(Be+6)}" y="160" width="18" height="18" rx="2" fill="#c9ccd1" stroke="#6e737a" stroke-width="0.8"/><circle cx="${I(Be+15)}" cy="169" r="5" fill="#2b2b2b"/>`+Q(Xt+13,qt+pt/2+3,"M1",{tam:7})+Q(Xt+13,qt+3.5*pt+3,"M2",{tam:7})+Q(Xt+12,qt+2*pt+2.5,"GND",{tam:5})+Q(Kt-13,qt+pt/2+3,"M4",{tam:7})+Q(Kt-13,qt+3.5*pt+3,"M3",{tam:7})+Q(Kt-12,qt+2*pt+2.5,"GND",{tam:5})+Q(re.EXT_POS.x+pt/2,193,"EXT_PWR",{tam:5.6})+Q(re.EXT_POS.x,165,"+M",{tam:5})+Q(re.EXT_GND.x,165,"GND",{tam:5})+Q(c,p-8,"PWR",{tam:5.6})+Q(52,16,"SERVO_2",{tam:5,ancla:"start"})+Q(52,26,"SERVO_1",{tam:5,ancla:"start"})+Q(26,7.4,"S",{tam:4.6})+Q(35.6,7.4,"+",{tam:5})+Q(45.2,7.4,"\u2212",{tam:5})+Q(Be+15,156,"RESET",{tam:4.6})+Q(196,162,"Motor Shield L293D",{tam:6.4})+Q(196,170,"Rev4",{tam:5,peso:"normal"})+"</svg>"}var G=3.779527559055118,ft={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},Ks=ft.voltiosRef/(ft.mABloqueado/1e3),Js=ft.rpmSinCarga*ft.reduccion*2*Math.PI/60,Ys=ft.mASinCarga/1e3,Ya=(ft.voltiosRef-Ys*Ks)/Js,k0=Ya*Ys/Js,N0=ft.tauMecanicoMs/1e3*Ya*Ya/Ks;var Za=64.2*G,ve=22.5*G,Ka=40*G,Qa=11.2*G,At=ft.ruedaMM*G/2,Jn={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-Qa,y0:132-ve/2}},Co=t=>Jn[t&&t.vista==="rueda"?"rueda":"eje"],Zs=t=>{let e=t.y0+ve/2;return{A:{x:t.ancho-12,y:e-4.8,color:"#d7263d"},B:{x:t.ancho-12,y:e+4.8,color:"#2b2b2b"}}};function Qs(t){let e=Co(t),o=Zs(e);if(t&&t.lado==="derecho")for(let i of["A","B"])o[i]={...o[i],x:e.ancho-o[i].x};return o}var A=t=>Math.round(t*100)/100,Ja=(t,e,o,{tam:i=11,color:s="#1f2328",peso:c="bold",marca:p=""}={})=>`<text${p?` ${p}="1"`:""} x="${A(t)}" y="${A(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="middle" fill="${s}">${o}</text>`;function Yn(t,e){let o=e+ve/2;return`<rect x="${A(t+Ka-2)}" y="${A(o-9.5*G)}" width="${A(Za-Ka+2)}" height="${A(19*G)}" rx="6" fill="#b9bec5" stroke="#7d8288" stroke-width="1"/><rect x="${A(t+Za-6*G)}" y="${A(o-8*G)}" width="${A(6*G)}" height="${A(16*G)}" rx="4" fill="#2b2b2b"/><rect x="${A(t)}" y="${A(e)}" width="${A(Ka)}" height="${A(ve)}" rx="4" fill="#f2c318" stroke="#b58f00" stroke-width="1.2"/><circle cx="${A(t+31.8*G-8.75*G)}" cy="${A(o)}" r="${A(1.5*G)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/><circle cx="${A(t+31.8*G+8.75*G-6)}" cy="${A(o)}" r="${A(1.5*G)}" fill="#ffffff" stroke="#b58f00" stroke-width="0.8"/>`}function Zn(t){let e=Zs(t),o=t.x0+Za,i=t.y0+ve/2;return["A","B"].map((s,c)=>{let p=i+(c?3:-3);return`<path d="M${A(o)} ${A(p)} C ${A(o+20)} ${A(p)}, ${A(e[s].x-22)} ${A(e[s].y)}, ${A(e[s].x-6)} ${A(e[s].y)}" fill="none" stroke="${e[s].color}" stroke-width="2.6" stroke-linecap="round"/><rect x="${A(e[s].x-4.2)}" y="${A(e[s].y-3)}" width="8.4" height="6" rx="1" fill="#222222"/>`}).join("")}function Qn(t,e){let o=2.7*G;return`<circle cx="${A(t)}" cy="${A(e)}" r="${A(o+3)}" fill="#e2b210" stroke="#b58f00" stroke-width="0.8"/><g data-eje="1" transform="rotate(0 ${A(t)} ${A(e)})"><path d="M${A(t-o)} ${A(e-1.8*G)} H${A(t+o)} V${A(e+1.8*G)} H${A(t-o)} Z" fill="#fafafa" stroke="#9aa0a6" stroke-width="0.8"/><circle cx="${A(t)}" cy="${A(e)}" r="${A(o)}" fill="none" stroke="#9aa0a6" stroke-width="0.8"/></g>`}function tc(t,e){let o=[0,72,144,216,288].map(s=>`<rect x="${A(t-12)}" y="${A(e-At*.72)}" width="24" height="${A(At*.72)}" rx="6" fill="#f2c318" transform="rotate(${s} ${A(t)} ${A(e)})"/>`).join(""),i=Array.from({length:24},(s,c)=>`<rect x="${A(t-3)}" y="${A(e-At-1)}" width="6" height="8" fill="#3a3a3a" transform="rotate(${c*15} ${A(t)} ${A(e)})"/>`).join("");return`<g data-rueda="1" transform="rotate(0 ${A(t)} ${A(e)})"><circle cx="${A(t)}" cy="${A(e)}" r="${A(At*.88)}" fill="none" stroke="#1c1c1c" stroke-width="${A(At*.24)}"/>`+i+`<circle cx="${A(t)}" cy="${A(e)}" r="${A(At*.74)}" fill="none" stroke="#f2c318" stroke-width="6"/>`+o+`<circle cx="${A(t)}" cy="${A(e)}" r="${A(7*G)}" fill="#f2c318" stroke="#b58f00" stroke-width="1"/><rect x="${A(t-2.7*G)}" y="${A(e-1.8*G)}" width="${A(5.4*G)}" height="${A(3.6*G)}" fill="#7a5d00"/></g>`}function tr(t={}){let e=Co(t),o=t.lado==="derecho",i=e.x0+Qa,s=e.y0+ve/2,c=o?` transform="translate(${e.ancho} 0) scale(-1 1)"`:"",p=o?e.ancho-i:i,n=Yn(e.x0,e.y0)+Zn(e),l=o?e.ancho-(e.x0+26*G):e.x0+26*G,x=Ja(l,e.y0+15,"TT 1:48",{tam:10,color:"#7a5d00"});return t.vista==="rueda"?(n+=tc(i,s),x+=`<line x1="${A(p-At-10)}" y1="${A(s+At+2)}" x2="${A(p+At+10)}" y2="${A(s+At+2)}" stroke="#9aa0a6" stroke-width="2" stroke-dasharray="6 4"/><g data-flecha="1" transform="translate(${A(p)} ${A(s+At+20)})"></g>`+Ja(p,s+At+46,"quieto",{tam:13,marca:"data-velocidad"})):(n+=Qn(i,s),x+=Ja(p,e.y0-12,"0 RPM",{tam:13,marca:"data-rpm"})),`<svg xmlns="http://www.w3.org/2000/svg" width="${e.ancho}" height="${e.alto}" viewBox="0 0 ${e.ancho} ${e.alto}"><title>Motor TT 6 V (${t.vista==="rueda"?"con rueda":"eje"}, lado ${o?"derecho":"izquierdo"})</title><g${c}>${n}</g>${x}</svg>`}var Xs=new WeakMap;function er(t,e,o){let i=Co(e),s=i.x0+Qa,c=i.y0+ve/2,p=o||{rpm:0,giro:0,velocidad:0},n=t.querySelector("[data-eje],[data-rueda]");n&&n.setAttribute("transform",`rotate(${A(-p.giro)} ${A(s)} ${A(c)})`);let l=t.querySelector("[data-rpm]"),x=Xs.get(t)||{},b=p.rpm>0!=(e.lado==="derecho");if(l){let v=Math.abs(p.rpm)<1?"0 RPM":`${Math.round(Math.abs(p.rpm))} RPM ${b?"\u27F2":"\u27F3"}`;v!==x.rpm&&(l.textContent=x.rpm=v)}let m=t.querySelector("[data-velocidad]"),S=t.querySelector("[data-flecha]");if(m&&S){let v=Math.sign(p.velocidad)*(e.lado==="derecho"?-1:1),_=Math.abs(p.velocidad),O=_<.5,B=O?"quieto":`${v>0?"adelante":"atr\xE1s"} \xB7 ${Math.round(_)} cm/s`;B!==x.vel&&(m.textContent=x.vel=B);let k=O?0:b?-1:1,gt=`${k}|${v}`;gt!==x.flecha&&(x.flecha=gt,S.innerHTML=O?"":`<path d="M${-40*k} -5 H${22*k} V-12 L${40*k} 0 L${22*k} 12 V5 H${-40*k} Z" fill="${v>0?"#2e9e44":"#d7263d"}"/>`)}Xs.set(t,x)}var or=3.779527559055118,$t={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Ge={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3};var Ao=360,ti=150,ne=10,_t=10,ce=72*or,So=34*or,ei={ancho:Ao,alto:ti},le=ne+ce+58,Le=_t+So-34,vo={POS:{x:Ao-12,y:_t+30,color:"#d7263d"},NEG:{x:Ao-12,y:_t+39.6,color:"#2b2b2b"},BAL0:{x:le,y:Le,color:"#2b2b2b"},BAL1:{x:le,y:Le+9.6,color:"#e05a5a"},BAL2:{x:le,y:Le+19.2,color:"#d7263d"}},j=t=>Math.round(t*100)/100,je=(t,e,o,{tam:i=11,color:s="#ffffff",peso:c="bold",ancla:p="middle",marca:n=""}={})=>`<text${n?` ${n}="1"`:""} x="${j(t)}" y="${j(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="${p}" fill="${s}">${o}</text>`;function oi(t="nominal"){let e=$t[t]||$t.nominal,o=ne+ce,i=["POS","NEG"].map((c,p)=>{let n=vo[c],l=_t+24+p*10;return`<path d="M${j(o)} ${j(l)} C ${j(o+26)} ${j(l)}, ${j(n.x-26)} ${j(n.y)}, ${j(n.x-6)} ${j(n.y)}" fill="none" stroke="${n.color}" stroke-width="4.2" stroke-linecap="round"/><rect x="${j(n.x-4.4)}" y="${j(n.y-3.4)}" width="8.8" height="6.8" rx="1" fill="#222222"/>`}).join(""),s=["BAL0","BAL1","BAL2"].map((c,p)=>{let n=vo[c],l=_t+So-40+p*4;return`<path d="M${j(o)} ${j(l)} C ${j(o+18)} ${j(l)}, ${j(n.x-30)} ${j(n.y)}, ${j(n.x-7)} ${j(n.y)}" fill="none" stroke="${n.color}" stroke-width="1.8"/>`}).join("")+`<rect x="${j(le-7)}" y="${j(Le-6)}" width="14" height="31.2" rx="1.5" fill="#f4f3ee" stroke="#9aa0a6" stroke-width="0.8"/>`+["BAL0","BAL1","BAL2"].map(c=>`<rect x="${j(le-2.4)}" y="${j(vo[c].y-2.4)}" width="4.8" height="4.8" fill="#c9a227"/>`).join("")+je(le-14,Le+2.5,"\u2212",{tam:8,color:"#5a6673"})+je(le-14,Le+21.7,"+",{tam:8,color:"#5a6673"})+je(le,_t+So+2,"balance",{tam:8,color:"#5a6673",peso:"normal"});return`<svg xmlns="http://www.w3.org/2000/svg" width="${Ao}" height="${ti}" viewBox="0 0 ${Ao} ${ti}"><title>Bater\xEDa LiPo 2S 7,4 V (${e.nombre})</title>`+i+s+`<rect x="${ne}" y="${_t}" width="${j(ce)}" height="${j(So)}" rx="8" fill="#2f3640" stroke="#1b1f24" stroke-width="1.2"/><rect x="${ne+14}" y="${_t+12}" width="${j(ce-28)}" height="${j(So-24)}" rx="4" fill="#3f4752"/>`+je(ne+ce/2,_t+36,"LiPo 2S \xB7 7,4 V",{tam:15})+je(ne+ce/2,_t+54,"2 celdas \xB7 1300 mAh",{tam:10,peso:"normal",color:"#c9ccd1"})+'<g data-carga="1">'+[0,1,2].map(c=>`<rect x="${j(ne+ce/2-33+c*23)}" y="${_t+66}" width="20" height="12" rx="2" fill="${c<e.barras?e.color:"#5a6370"}"/>`).join("")+je(ne+ce/2,_t+98,`${String(e.voltios).replace(".",",")} V \xB7 ${e.nombre}`,{tam:12,color:{"#2e9e44":"#7fd88f","#e8a20c":"#ffd166","#c2410c":"#ffb27a"}[e.color]||"#ff8a8a",marca:"data-voltios"})+"</g></svg>"}function ar(t,e,o){let i=t.querySelector("[data-voltios]");if(!i)return;let s=$t[e]||$t.nominal,c=o&&typeof o.voltios=="number"?o.voltios:s.voltios;i.textContent=`${c.toFixed(2).replace(".",",")} V \xB7 ${s.nombre}`}var pe={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]},de=210,ii=140,ri={ancho:de,alto:ii},cr=9.6,lr=82,ec=132,ni=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:lr+e*cr,y:ec}])),lt=t=>Math.round(t*100)/100,ai=(t,e,o,{tam:i=7,color:s="#5a6673",peso:c="bold",marca:p=""}={})=>`<text${p} x="${lt(t)}" y="${lt(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${c}" text-anchor="middle" fill="${s}">${o}</text>`,si={ancho:24,alto:46,grueso:5},oc=[76,112,148],ir=34,sr="#ff3b30",oa="#3a1414";function ac(t,e){let{ancho:o,alto:i,grueso:s}=si,c=i/2,p=(n,l,x,b)=>({x:t+n,y:e+l,w:x,h:b});return{a:p(s/2,0,o-s,s),b:p(o-s,s/2,s,c-s),c:p(o-s,c+s/2,s,c-s),d:p(s/2,i-s,o-s,s),e:p(0,c+s/2,s,c-s),f:p(0,s/2,s,c-s),g:p(s/2,c-s/2,o-s,s)}}var ic={0:"abcdef",1:"bc",2:"abdeg",3:"abcdg",4:"bcfg",5:"acdfg",6:"acdefg",7:"abc",8:"abcdefg",9:"abcdfg","-":"g",S:"acdfg",L:"def",o:"cdeg"," ":""};function dr(t=pe.umbralV){let e=oc.map((s,c)=>{let p=ac(s,ir);return Object.entries(p).map(([n,l])=>`<rect data-seg="${c}${n}" x="${lt(l.x)}" y="${lt(l.y)}" width="${lt(l.w)}" height="${lt(l.h)}" rx="2" fill="${oa}"/>`).join("")+`<circle data-seg="${c}p" cx="${lt(s+si.ancho+5)}" cy="${lt(ir+si.alto-2)}" r="2.8" fill="${oa}"/>`}).join(""),o=Object.entries(ni).map(([s,c],p)=>`<rect x="${lt(c.x-1.2)}" y="122" width="2.4" height="${lt(c.y-120)}" fill="#c9ccd1"/>`+ai(c.x,108,p===0?"\u2212":String(p),{tam:p===0?8:6.5})).join(""),i=[0,1].map(s=>{let c=38+s*44;return`<path d="M${lt(8)} ${lt(c-10)} q -6 10 0 20 M${lt(3)} ${lt(c-15)} q -8 15 0 30" fill="none" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/>`}).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${de}" height="${ii}" viewBox="0 0 ${de} ${ii}"><title>Probador de celdas LiPo 1-8S con zumbador</title><rect x="12" y="6" width="${de-18}" height="110" rx="9" fill="#dfe4e8" stroke="#9aa3ab" stroke-width="1.2"/><rect x="17" y="11" width="${de-28}" height="100" rx="6" fill="#26323d" opacity="0.15"/>`+[38,82].map(s=>`<circle cx="38" cy="${s}" r="20" fill="#1d1f22" stroke="#000000" stroke-width="0.8"/><circle cx="38" cy="${s}" r="3" fill="#3a3d42"/>`).join("")+`<g data-pitido="1" visibility="hidden">${i}</g><rect x="66" y="22" width="${de-82}" height="72" rx="4" fill="#160909" stroke="#000000" stroke-width="1"/>`+e+`<rect x="${lt(lr-6)}" y="114" width="${lt(8*cr+12)}" height="9" fill="#151515"/>`+o+ai(de/2+30,18,"1-8S",{tam:6.5})+ai(de/2-30,18,`alarma ${t?String(t).replace(".",",")+" V":"apagada"}`,{tam:6.5,peso:"normal",marca:' data-umbral="1"'})+"</svg>"}function rr(t){let e=t>=9.995?t.toFixed(1):t.toFixed(2),[o,i]=e.split(".");return(o+i).slice(0,3).split("").map((c,p)=>({c,punto:p===o.length-1}))}var nr=t=>t.padEnd(3).slice(0,3).split("").map(e=>({c:e,punto:!1}));function sc(t,e){if(!t||!t.encendido||!t.celdas.length)return null;let o=[rr(t.total),nr(`${t.celdas.length}S`.padStart(3))];return t.celdas.forEach((i,s)=>o.push(nr(`-${s+1}-`),rr(i))),o[Math.floor(e/pe.pasoMs)%o.length]}function ci(t,e,o){let i=t.querySelector("[data-umbral]"),s=e&&typeof e.umbral=="number"?e.umbral:pe.umbralV;if(i){let b=`alarma ${s?String(s).replace(".",",")+" V":"apagada"}`;i.textContent!==b&&(i.textContent=b)}let c=o&&o.ms||0,n=o&&o.alarma&&Math.floor(c/125)%2===1?null:sc(o,c);for(let b=0;b<3;b++){let m=n?n[b]:null,S=m&&ic[m.c]||"";for(let O of"abcdefg"){let B=t.querySelector(`[data-seg="${b}${O}"]`),k=S.includes(O)?sr:oa;B&&B.getAttribute("fill")!==k&&B.setAttribute("fill",k)}let v=t.querySelector(`[data-seg="${b}p"]`),_=m&&m.punto?sr:oa;v&&v.getAttribute("fill")!==_&&v.setAttribute("fill",_)}let l=t.querySelector("[data-pitido]"),x=o&&o.alarma&&Math.floor(c/250)%2===0?"visible":"hidden";l&&l.getAttribute("visibility")!==x&&l.setAttribute("visibility",x)}var We=3.779527559055118,aa=9.6,Jt={ancho:58*We,alto:54*We},q={x:(Jt.ancho-45*We)/2,y:(Jt.alto-18*We)/2,ancho:45*We,alto:18*We},rc=(Jt.ancho-14*aa)/2,pr=(Jt.alto-6*aa)/2,nc=pr+6*aa,fr=[{y:pr,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:nc,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],li=Object.fromEntries(fr.flatMap(({y:t,nombres:e})=>e.map((o,i)=>[o,{x:rc+i*aa,y:t}]))),D=t=>Math.round(t*100)/100,ze=(t,e,o,i=5,s="#f5f9ff")=>`<text x="${D(t)}" y="${D(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" text-anchor="middle" fill="${s}">${o}</text>`,hr={PWR:{apagado:"#19472b",encendido:"#45e76e"},L:{apagado:"#65501d",encendido:"#ffcf40"},RX:{apagado:"#644022",encendido:"#ff9e39"},TX:{apagado:"#644022",encendido:"#ff9e39"}};function cc(t,e,o){let i="";for(let s=0;s<8;s++){let c=2.5+s*(o-5)/7;i+=`<rect x="${D(t+c-.65)}" y="${D(e-2.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${D(t+c-.65)}" y="${D(e+o-.2)}" width="1.3" height="2.4" fill="#b8c0c8"/>`,i+=`<rect x="${D(t-2.2)}" y="${D(e+c-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`,i+=`<rect x="${D(t+o-.2)}" y="${D(e+c-.65)}" width="2.4" height="1.3" fill="#b8c0c8"/>`}return i+`<rect x="${D(t)}" y="${D(e)}" width="${D(o)}" height="${D(o)}" rx="1.2" fill="#25282c" stroke="#101214" stroke-width="0.6"/><circle cx="${D(t+2.8)}" cy="${D(e+2.8)}" r="1" fill="#7e848a"/>`}function ur(t={}){let{ancho:e,alto:o}=Jt,i=o/2,s=["PWR","L","RX","TX"].map((p,n)=>{let l=q.x+37+n*10.6;return`<rect data-led="${p}" x="${D(l-2.4)}" y="${D(i+10)}" width="4.8" height="3.2" rx="0.6" fill="${hr[p].apagado}" stroke="#20252b" stroke-width="0.4"/>`+ze(l,i+19,p,4.2)}).join(""),c=fr.map(({y:p,nombres:n},l)=>n.map(x=>{let{x:b}=li[x],m=x.startsWith("GND")?"GND":x.startsWith("RESET")?"RST":x;return`<circle cx="${D(b)}" cy="${D(p)}" r="2.7" fill="#d7b763" stroke="#8a6f37" stroke-width="0.5"/><rect x="${D(b-1.05)}" y="${D(p-1.05)}" width="2.1" height="2.1" fill="#55504a"/>`+ze(b,p+(l?-5.2:9),m,m.length>3?3.5:4)}).join("")).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="${D(e)}" height="${D(o)}" viewBox="0 0 ${D(e)} ${D(o)}"><title>Nano cl\xE1sico \xB7 m\xF3dulo ATmega328P</title><desc>M\xF3dulo con treinta terminales f\xEDsicos. A6 y A7 solo admiten entrada anal\xF3gica. Dibujo y medidas nominales pendientes de comparaci\xF3n con el kit.</desc><rect x="${D(q.x)}" y="${D(q.y)}" width="${D(q.ancho)}" height="${D(q.alto)}" rx="3.3" fill="#14628e" stroke="#0a3f60" stroke-width="0.9"/><path d="M${D(q.x+35)} ${D(i-9)} H${D(q.x+64)} V${D(i-16)} H${D(q.x+94)} M${D(q.x+91)} ${D(i+9)} H${D(q.x+125)} V${D(i+22)}" fill="none" stroke="#277ba6" stroke-width="1.1"/><rect x="${D(q.x-5.5)}" y="${D(i-12.5)}" width="25.5" height="25" rx="2" fill="#cbd0d6" stroke="#6c747d" stroke-width="0.8"/><rect x="${D(q.x-5.5)}" y="${D(i-8.5)}" width="6.2" height="17" rx="0.8" fill="#525b65"/><rect x="${D(q.x-4.2)}" y="${D(i-5.5)}" width="2.5" height="11" fill="#1d252d"/>`+cc(q.x+90,i-14,26)+ze(q.x+103,i-1,"328P",4.5,"#b9bec4")+`<rect x="${D(q.x+127)}" y="${D(i-14)}" width="12" height="6.5" rx="2" fill="#c5c9cd" stroke="#737b84" stroke-width="0.5"/><line x1="${D(q.x+130)}" y1="${D(i-12)}" x2="${D(q.x+136)}" y2="${D(i-12)}" stroke="#727b83" stroke-width="0.5"/><rect x="${D(q.x+144)}" y="${D(i-6)}" width="10" height="11" rx="1.2" fill="#b9c0c7" stroke="#69737f" stroke-width="0.5"/><circle cx="${D(q.x+149)}" cy="${D(i-.5)}" r="3" fill="#343a41"/>`+ze(q.x+149,i+12,"RESET",4.3)+s+c+ze(q.x+53,i-13,"NANO CL\xC1SICO",6.2)+ze(q.x+103,i+17,"A6 / A7: solo anal\xF3gico",4.5)+"</svg>"}function mr(t,e={}){let o={PWR:"ledPower",L:"led13",RX:"ledRX",TX:"ledTX"};for(let[i,s]of Object.entries(hr)){let p=(e?.leds?.[i]??e?.[i.toLowerCase()]??e?.[o[i]]??0)>0?s.encendido:s.apagado,n=t.querySelector(`[data-led="${i}"]`);n&&n.getAttribute("fill")!==p&&n.setAttribute("fill",p)}}var di={...Jt},Fe=9.6,pi=Array.from({length:14},(t,e)=>`D${13-e}`),fi=Array.from({length:8},(t,e)=>`A${e}`),ia=[...pi,...fi],br=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"],G0=[...ia.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...br],hi=Object.freeze({SPI_MISO:"D12",SPI_MOSI:"D11",SPI_SCK:"D13",SPI_SS:"D10",SPI_V:"5V",SPI_G:"GND1"}),yr=[...ia.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"],["OUT_5V_2","placa.5V"],["GND_OUT_2","placa.GND1"],["OUT_3V3_2","OUT_3V3"]],Cr=Object.fromEntries([...ia.flatMap(t=>[[`${t}_S`,`${t} \xB7 se\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \xB7 V: alimentaci\xF3n de 5V (+)`],[`${t}_G`,`${t} \xB7 G: tierra (\u2212)`]]),["I2C_SDA","I2C \xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \xB7 alimentaci\xF3n de 5V (+)"],["I2C_G","I2C \xB7 tierra (\u2212)"],["SPI_MISO","SPI \xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \xB7 SCK: reloj (D13)"],["SPI_SS","SPI \xB7 SS: selecci\xF3n (D10)"],["SPI_V","SPI \xB7 alimentaci\xF3n de 5V (+)"],["SPI_G","SPI \xB7 tierra (\u2212)"],["UART_TX","UART \xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \xB7 alimentaci\xF3n de 5V (+)"],["UART_G","UART \xB7 tierra (\u2212)"],["OUT_5V","5V \xB7 salida de alimentaci\xF3n de la expansi\xF3n (+)"],["OUT_5V_2","5V \xB7 segundo contacto de la misma salida (+)"],["OUT_3V3","3,3V \xB7 salida regulada de la expansi\xF3n (+), separada del 3V3 del Nano"],["OUT_3V3_2","3,3V \xB7 segundo contacto de la misma salida regulada (+)"],["GND_OUT","GND \xB7 tierra de las salidas (\u2212)"],["GND_OUT_2","GND \xB7 segundo contacto de tierra de las salidas (\u2212)"],["JACK_POS","Jack + \xB7 entrada de la expansi\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]),Sr=t=>t.variante==="azul"?"azul":"roja";function ui(t={}){let e=Sr(t)==="azul",o={},i=e?4.8:3.2,s=e?46.2:48.6;pi.forEach((n,l)=>{let x=(l>=3?1:0)+(l>=7?1:0)+(l>=11?1:0),b=s+l*Fe+x*i;for(let[m,S]of[["G",29.2],["V",38.8],["S",48.4]])o[`${n}_${m}`]={x:b,y:S}}),fi.forEach((n,l)=>{let x=(e?53.4:55.8)+l*Fe+(l>=4?i:0);for(let[b,m]of[["S",160.6],["V",170.2],["G",179.8]])o[`${n}_${b}`]={x,y:m}});let c=e?201.4:200.6,p=c+10.8;return["I2C_SDA","I2C_SCL","I2C_V","I2C_G"].forEach((n,l)=>{o[n]={x:c,y:79.2+l*Fe}}),["UART_TX","UART_RX","UART_V","UART_G"].forEach((n,l)=>{o[n]={x:p,y:79.2+l*Fe}}),["GND_OUT","OUT_3V3","OUT_5V","GND_OUT_2","OUT_3V3_2","OUT_5V_2"].forEach((n,l)=>{o[n]={x:(e?149.6:148)+l%3*Fe,y:166+Math.floor(l/3)*Fe}}),o.JACK_POS={x:12.4,y:170},o.JACK_GND={x:27.6,y:170},o}var J=t=>Math.round(t*100)/100,at=(t,e,o,{tam:i=5,ancla:s="middle",color:c="#ffffff",peso:p="normal"}={})=>`<text x="${J(t)}" y="${J(e)}" font-family="Arial, Helvetica, sans-serif" font-size="${i}" font-weight="${p}" text-anchor="${s}" fill="${c}">${o}</text>`;function xr(t,e,o){let{x:i,y:s}=e;return`<g data-contacto="${t}"><rect x="${J(i-4.3)}" y="${J(s-4.3)}" width="8.6" height="8.6" rx="0.7" fill="${o}" stroke="#111820" stroke-width="0.45"/><rect x="${J(i-1.8)}" y="${J(s-1.8)}" width="3.6" height="3.6" fill="#e1bc5c" stroke="#8e6c28" stroke-width="0.35"/><rect x="${J(i-.8)}" y="${J(s-.8)}" width="1.6" height="1.6" fill="#3e3526"/></g>`}function gr(t,e,o){return`<rect x="${t}" y="${e}" width="8.5" height="7" rx="0.6" fill="#292d33" stroke="#14171b" stroke-width="0.5"/><rect x="${t+2.1}" y="${e-1.8}" width="4.3" height="2" fill="#bac1c8"/>`+[0,1,2].map(i=>`<rect x="${t+1+i*2.6}" y="${e+6.8}" width="1.3" height="2.1" fill="#bac1c8"/>`).join("")+at(t+4.25,e+14,o,{tam:4.3})}function vr(t={}){let e=Sr(t),o=e==="azul",i=ui(t),{ancho:s,alto:c}=di,p=o?"#185ca5":"#bc2731",n=o?"#103c70":"#801a24",l=o?"#2c75bc":"#d2454e",x=o?{S:"#e6c52f",V:"#e6c52f",G:"#e6c52f"}:{S:"#2475c7",V:"#cf3537",G:"#292b30"},b=ia.flatMap(_=>["G","V","S"].map(O=>xr(`${_}_${O}`,i[`${_}_${O}`],x[O]))).join(""),m=br.filter(_=>!_.startsWith("JACK")).map(_=>xr(_,i[_],o?"#e6c52f":_.startsWith("UART")||_.startsWith("I2C")?"#e8e4da":"#292b30")).join(""),S=["usb","jack","apagada"].includes(t.alimentacion)?t.alimentacion:"usb",v=S==="jack"?"ALIM.: JACK":S==="apagada"?"SIN ALIMENTACI\xD3N":"ALIM.: USB";return`<svg xmlns="http://www.w3.org/2000/svg" width="${J(s)}" height="${J(c)}" viewBox="0 0 ${J(s)} ${J(c)}"><title>Expansi\xF3n E/S ${e} para Nano cl\xE1sico</title><desc>Modelo de referencia pendiente de validar f\xEDsicamente. S es se\xF1al, V es 5V y G es tierra. El jack y la salida externa de 3,3V tienen nodos propios.</desc><path d="M7 0.5 H${J(s-7)} Q${J(s-.5)} 0.5 ${J(s-.5)} 7 V${J(c-10)} L${J(s-10)} ${J(c-.5)} H10 L0.5 ${J(c-10)} V7 Q0.5 0.5 7 0.5 Z M18.2 64 H195.8 V140.1 H18.2 Z" fill="${p}" fill-rule="evenodd" stroke="${n}" stroke-width="1"/><path d="M42 57 H80 V60 H102 M137 60 H180 V57 M40 148 H71 M138 150 H179" fill="none" stroke="${l}" stroke-width="1.4"/>`+[[8,8],[s-8,8],[8,c-8],[s-8,c-8]].map(([_,O])=>`<circle cx="${J(_)}" cy="${J(O)}" r="4.4" fill="#f5f6f7" stroke="${n}" stroke-width="1"/>`).join("")+b+m+gr(91,53.2,"5V")+gr(118,53.2,"3,3V")+'<circle cx="77" cy="59" r="4.2" fill="#bcc3ca" stroke="#4d5864" stroke-width="0.7"/><path d="M74.6 59 H79.4 M77 56.6 V61.4" stroke="#707983" stroke-width="0.6"/><rect x="136" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="145" y="56" width="5.6" height="3" rx="0.6" fill="#d4ae70" stroke="#826b46" stroke-width="0.4"/><rect x="5.2" y="145.4" width="30.4" height="29.5" rx="2" fill="#24282e" stroke="#10151a" stroke-width="0.8"/><rect x="1" y="149" width="8" height="18" rx="1" fill="#424952" stroke="#171b20" stroke-width="0.7"/><rect x="1.8" y="152" width="3" height="12" rx="1.4" fill="#11161c"/>'+["JACK_POS","JACK_GND"].map(_=>{let{x:O,y:B}=i[_];return`<circle data-contacto="${_}" cx="${O}" cy="${B}" r="2.8" fill="#d8b361" stroke="#775d2e" stroke-width="0.6"/>`}).join("")+pi.map(_=>at(i[`${_}_S`].x,20.8,_,{tam:4.5,peso:"bold"})).join("")+fi.map(_=>at(i[`${_}_S`].x,152.8,_,{tam:4.8,peso:"bold"})).join("")+["G","V","S"].map(_=>at(37.6,i[`D13_${_}`].y+1.8,_,{tam:5.3,peso:"bold"})).join("")+["S","V","G"].map(_=>at(44,i[`A0_${_}`].y+1.8,_,{tam:5.3,peso:"bold"})).join("")+at(i.I2C_SDA.x,64.5,"I2C",{tam:3.9,peso:"bold"})+[["I2C_SDA","SDA"],["I2C_SCL","SCL"],["I2C_V","5V"],["I2C_G","GND"]].map(([_,O])=>at(i[_].x,i[_].y-2.5,O,{tam:2.3,color:"#17212b",peso:"bold"})).join("")+at(i.UART_TX.x,64.5,"UART",{tam:3.9,peso:"bold"})+[["UART_TX","TX"],["UART_RX","RX"],["UART_V","5V"],["UART_G","GND"]].map(([_,O])=>at(i[_].x,i[_].y-2.5,O,{tam:2.3,color:"#17212b",peso:"bold"})).join("")+[["GND_OUT","GND"],["OUT_3V3","3,3V"],["OUT_5V","5V"]].map(([_,O])=>at(i[_].x,159.5,O,{tam:3.4})).join("")+[["GND_OUT_2","GND"],["OUT_3V3_2","3,3V"],["OUT_5V_2","5V"]].map(([_,O])=>at(i[_].x,184.5,O,{tam:3.8})).join("")+at(i.OUT_3V3.x,195.2,"ALIMENTACI\xD3N",{tam:4.5,peso:"bold"})+at(12.4,183,"+",{tam:6})+at(27.6,183,"GND",{tam:4.2})+at(20.4,139.1,"JACK",{tam:4.8})+at(84,191,"REGULACI\xD3N 5V / 3,3V",{tam:4.6})+at(84,199,v,{tam:4.4})+at(s/2,10.8,"EXPANSI\xD3N E/S",{tam:6.3,peso:"bold"})+"</svg>"}var lc=t=>/^A[67]$/.test(t)?`${t} \xB7 solo entrada anal\xF3gica (sin salida digital)`:/^A[0-5]$/.test(t)?`${t} \xB7 entrada anal\xF3gica y digital`:/^D\d+$/.test(t)?`Pin ${t.slice(1)}${["D3","D5","D6","D9","D10","D11"].includes(t)?" \xB7 PWM ~":""}${t==="D0"?" \xB7 RX":t==="D1"?" \xB7 TX":""}`:t.startsWith("GND")?"GND \xB7 tierra (\u2212)":t.startsWith("RESET")?"RESET \xB7 reinicia el Nano":{"5V":"5V \xB7 alimentaci\xF3n del Nano","3V3":"3,3V \xB7 salida del m\xF3dulo Nano",VIN:"VIN \xB7 entrada del m\xF3dulo Nano",AREF:"AREF \xB7 referencia anal\xF3gica",SDA:"SDA \xB7 el mismo A4",SCL:"SCL \xB7 el mismo A5",MOSI:"MOSI \xB7 el mismo D11",MISO:"MISO \xB7 el mismo D12",SCK:"SCK \xB7 el mismo D13",SS:"SS \xB7 el mismo D10"}[t]||t,Ar=t=>({nombre:t,dibujo:{...Jt,pines:li,svg:ur},rotulo:lc,mostrar:mr}),He={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},mi=Object.keys(He),_r={marron:"marr\xF3n",morado:"violeta"};function xi(t,e){let o=[t,e];return o.some(i=>/^placa\.GND/.test(i)||/^protoboard\.[si]-/.test(i))?"negro":o.some(i=>/^placa\.(5V|3V3|VIN)$/.test(i)||/^protoboard\.[si]\+/.test(i))?"rojo":"verde"}var dc=["3","5","6","9","10","11"],It={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(t){return/^\d+$/.test(t)?"D"+t:t.startsWith("GND.")?"GND"+t.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[t]||t},rotulo(t){return t==="D0"?"Pin 0 \xB7 RX del monitor serial":t==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(t)?"Pin "+t.slice(1)+(dc.includes(t.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(t)?t+" \xB7 entrada anal\xF3gica":t.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[t]||t}},nano:Ar("Arduino Nano"),nano_old:Ar("Arduino Nano (bootloader antiguo)")},X={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",prefijo:"exp",montada:!0,placas:["nano","nano_old"],props:{variante:"roja",alimentacion:"usb",voltajeJack:9},dibujo:{marco:t=>({...di,pines:ui(t)}),svg:vr},rotulo:t=>Cr[t]||t,campos:[{prop:"variante",etiqueta:"Tarjeta",opciones:[["roja","Roja"],["azul","Azul"]]},{prop:"alimentacion",etiqueta:"Alimentaci\xF3n",opciones:[["usb","USB del Nano"],["jack","Jack de la expansi\xF3n"],["apagada","Desconectada"]]},{prop:"voltajeJack",etiqueta:"Fuente en el jack",opciones:[[0,"0 V"],[5,"5 V"],[7,"7 V"],[9,"9 V"],[12,"12 V"]]}]},resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:t=>({1:"1",2:"2"})[t],rotulo:t=>"pata "+t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(t,e){t.value=String(e.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:t=>({A:"anodo",C:"catodo"})[t],rotulo:t=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[e.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:t=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[t],rotulo:t=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[t]||t,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(t,e){t.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[e.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:ea.ancho,alto:ea.alto,pines:ta,svg:t=>Wa(t.modelo,90)},rotulo:t=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[t]||t,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Ut).map(([t,e])=>[t,`${e.nombre} (engranajes de ${e.engranajes})`])},aplicar(t,e){let o=new DOMParser().parseFromString(Wa(e.modelo,90),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-brazo]");o&&o.setAttribute("transform",za(e&&typeof e.angulo=="number"?e.angulo:90))}},shield_l293d:{nombre:"Shield L293D",prefijo:"shield",montada:!0,placas:["uno"],props:{puentePWR:!0},dibujo:{ancho:yo.ancho,alto:yo.alto,pines:re,svg:t=>Xa(t.puentePWR!==!1)},rotulo:t=>Hs[t]||t,campos:[{prop:"puentePWR",etiqueta:"Puente PWR",opciones:[[!0,"puesto (la bater\xEDa tambi\xE9n alimenta el Uno)"],[!1,"quitado"]]}],aplicar(t,e){let o=new DOMParser().parseFromString(Xa(e.puentePWR!==!1),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e){let o=t.querySelector("[data-led-pwr]"),i=e&&e.motoresV>1?"#3ddc5a":"#1f5a2c";o&&o.getAttribute("fill")!==i&&o.setAttribute("fill",i)}},motor_tt:{nombre:"Motor TT",prefijo:"motor",props:{vista:"eje",lado:"izquierdo"},dibujo:{marco:t=>({...Co(t),pines:Qs(t)}),svg:t=>tr(t)},rotulo:t=>({A:"borne A del motor (cable rojo)",B:"borne B del motor (cable negro)"})[t]||t,campos:[{prop:"vista",etiqueta:"Vista",opciones:[["eje","solo el eje (RPM)"],["rueda","con la rueda"]]},{prop:"lado",etiqueta:"Lado del robot",opciones:[["izquierdo","izquierdo"],["derecho","derecho"]]}],mostrar(t,e,o){er(t,o||{},e)}},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",prefijo:"bateria",props:{carga:"nominal"},dibujo:{ancho:ei.ancho,alto:ei.alto,pines:vo,svg:t=>oi(t.carga)},rotulo:t=>({POS:"+ \xB7 cable rojo de potencia",NEG:"\u2212 \xB7 cable negro de potencia",BAL0:"balance \u2212 \xB7 el mismo \u2212 de la bater\xEDa",BAL1:"balance \xB7 entre la celda 1 y la 2",BAL2:"balance + \xB7 el mismo + de la bater\xEDa"})[t]||t,campos:[{prop:"carga",etiqueta:"Carga",opciones:Object.entries($t).map(([t,e])=>[t,`${e.nombre} (${String(e.voltios).replace(".",",")} V: ${e.celdas.map(o=>String(o).replace(".",",")).join(" + ")})`])}],aplicar(t,e){let o=new DOMParser().parseFromString(oi(e.carga),"image/svg+xml").documentElement;t.replaceChildren(...[...o.childNodes].map(i=>t.ownerDocument.importNode(i,!0)))},mostrar(t,e,o){ar(t,(o||{}).carga,e)}},probador_lipo:{nombre:"Probador de celdas",prefijo:"probador",props:{umbral:pe.umbralV},dibujo:{ancho:ri.ancho,alto:ri.alto,pines:ni,svg:t=>dr(t.umbral)},rotulo:t=>t==="NEG"?"\u2212 \xB7 al negro del balance":`celda ${t.slice(1)} \xB7 al + de la celda ${t.slice(1)}`,campos:[{prop:"umbral",etiqueta:"Alarma (pita por debajo de)",opciones:pe.umbrales.map(t=>[t,t?`${String(t).replace(".",",")} V por celda`:"apagada"])}],aplicar(t,e){ci(t,e,null)},mostrar(t,e,o){ci(t,o||{},e)}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:t=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[t],rotulo:t=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[t]||t,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(t,e){t.min=0,t.max=100,t.value=Math.round((Number(e.posicion)||0)*100)}}};var sa=["a","b","c","d","e"],$r=["f","g","h","i","j"],ht={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},wr=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],jt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},_o=t=>14.4+(t-1)*9.6,pc=t=>t>=2&&(t-1)%6!==0,gi=new Map;function qe(t="media"){if(gi.has(t))return gi.get(t);let e=jt[t]||jt.media,o=[];gi.set(t,o);for(let i=1;i<=e.columnas;i++){for(let s of sa)o.push({nombre:s+i,x:_o(i),y:ht[s],tira:"arriba"+i});for(let s of $r)o.push({nombre:s+i,x:_o(i),y:ht[s],tira:"abajo"+i});for(let[s]of wr)pc(i)&&o.push({nombre:s+i,x:_o(i),y:ht[s],tira:s})}return o}var bi=new Map;function Rr(t="media"){if(bi.has(t))return bi.get(t);let e=new Map;bi.set(t,e);for(let o of qe(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}function yi(t){let e=/^([si][+-])\d+$/.exec(t);if(e)return e[1];let o=/^([a-j])(\d+)$/.exec(t);return o?(sa.includes(o[1])?"arriba":"abajo")+o[2]:null}function Er(t){let e=/^([si])([+-])(\d+)$/.exec(t);if(e){let c=e[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${e[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(t);if(!o)return"Protoboard";let[i,s]=sa.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${i}${o[2]}\u2013${s}${o[2]}`}function Ci(t="media"){let e=jt[t]||jt.media,{ancho:o,alto:i,columnas:s}=e,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${i}" viewBox="0 0 ${o} ${i}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${i-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(ht.e+ht.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let p=(l,x)=>c.push(`<line x1="${14.4-6}" y1="${l}" x2="${o-14.4+6}" y2="${l}" stroke="${x}" stroke-width="1.2"/>`);p(ht["s+"]-5.5,"#d7263d"),p(ht["s-"]+5.5,"#2f6fde"),p(ht["i-"]-5.5,"#2f6fde"),p(ht["i+"]+5.5,"#d7263d");let n=(l,x,b,m="#8a867a",S=5.5)=>c.push(`<text x="${l}" y="${x}" font-family="sans-serif" font-size="${S}" font-weight="700" fill="${m}" text-anchor="middle">${b}</text>`);for(let[l,,x]of wr){let b=x==="+"?"#d7263d":"#2f6fde";n(5.2,ht[l]+2.2,x,b,7),n(o-5.2,ht[l]+2.2,x,b,7)}for(let l=1;l<=s;l++)(l===1||l%5===0)&&(n(_o(l),ht.a-6.2,l),n(_o(l),ht.j+10.4,l));for(let l of[...sa,...$r])n(5.2,ht[l]+2,l),n(o-5.2,ht[l]+2,l);for(let l of qe(t))c.push(`<rect x="${(l.x-1.7).toFixed(2)}" y="${(l.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function Pr(t,{tipo:e="media",ocupados:o=new Set,tolerancia:i=3.5}={}){if(!t.length)return null;let s=qe(e),c=(m,S)=>{let v=null,_=1/0;for(let O of s){let B=Math.hypot(O.x-m,O.y-S);B<_&&(_=B,v=O)}return{hueco:v,distancia:_}},p=c(t[0].x,t[0].y);if(p.distancia>9.6)return null;let n=p.hueco.x-t[0].x,l=p.hueco.y-t[0].y,x={},b=new Set;for(let m of t){let{hueco:S,distancia:v}=c(m.x+n,m.y+l);if(v>i||o.has(S.nombre)||b.has(S.nombre))return null;x[m.nombre]=S.nombre,b.add(S.nombre)}return{dx:n,dy:l,en:x}}var ra=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),Ir=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),fc=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),hc=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),uc=Object.freeze([...Ir,Object.freeze(["A6"]),Object.freeze(["A7"])]),Tr=Object.freeze([...ra,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),mc=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:ra,analogicos:Ir,puentes:fc,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...ra,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","IOREF","SDA","SCL"])}),xc=Object.freeze({nombre:"Arduino Nano cl\xE1sico",pinesDigitales:ra,analogicos:uc,puentes:hc,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:Tr,pines:Object.freeze([...Tr,"SDA","SCL","MISO","MOSI","SCK","SS"])}),Yt=t=>t==="nano"||t==="nano_old",Xe=t=>Yt(t)?xc:mc;function na(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:i=!0}={}){let s=new Map,c=n=>{for(s.has(n)||s.set(n,n);s.get(n)!==n;)s.set(n,s.get(s.get(n))),n=s.get(n);return n},p=(n,l)=>s.set(c(n),c(l));for(let n of Xe(t.placa).puentes)n.forEach(l=>p("placa."+n[0],"placa."+l));for(let n of t.cables)p(n.de,n.a);if(t.protoboard){for(let n of Rr(t.protoboard.tipo).values())n.forEach(l=>p("protoboard."+n[0],"protoboard."+l));for(let n of t.componentes)if(n.en)for(let[l,x]of Object.entries(n.en))p(n.id+"."+l,x)}for(let n of t.componentes)if(n.tipo==="shield_nano_io"&&Yt(t.placa))for(let[l,x]of yr)p(n.id+"."+l,x.startsWith("placa.")?x:n.id+"."+x);else if(n.tipo==="shield_l293d"){for(let[l,x]of qs)p(n.id+"."+l,x);(!n.props||n.props.puentePWR!==!1)&&p(n.id+".EXT_POS","placa.VIN")}else n.tipo==="bateria_lipo"&&i?(p(n.id+".BAL0",n.id+".NEG"),p(n.id+".BAL2",n.id+".POS")):n.tipo==="pulsador"?(p(n.id+".1i",n.id+".1d"),p(n.id+".2i",n.id+".2d"),e.has(n.id)&&p(n.id+".1i",n.id+".2i")):o&&n.tipo==="resistencia"?p(n.id+".1",n.id+".2"):o&&n.tipo==="potenciometro"&&(p(n.id+".GND",n.id+".SIG"),p(n.id+".SIG",n.id+".VCC"));return c}var wi=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Si=Object.fromEntries(wi.flatMap(t=>Object.entries(t.pines).map(([e,o])=>[e,{ref:t.ref,pad:o}]))),gc={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},vi={ref:"U",lib:"MCU_Module",parte:"Arduino_Nano_v3.x",huella:"Module:Arduino_Nano",valor:"Arduino Nano cl\xE1sico",pines:{D1:"1",D0:"2",RESET:"3",GND1:"4",D2:"5",D3:"6",D4:"7",D5:"8",D6:"9",D7:"10",D8:"11",D9:"12",D10:"13",D11:"14",D12:"15",D13:"16","3V3":"17",AREF:"18",A0:"19",A1:"20",A2:"21",A3:"22",A4:"23",A5:"24",A6:"25",A7:"26","5V":"27",RESET2:"28",GND2:"29",VIN:"30"}},bc=["GND","+5V","+3V3","VIN"],Dr=t=>t>=1e3?+(t/1e3).toFixed(2)+"k":String(t),Ai={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:t=>Dr(Number(t.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:t=>"LED "+(t.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:t=>"Servo "+(Ut[t.modelo]||Ut.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:t=>Dr(Number(t.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},Lt="placa:GND1",Ke="placa:5V",$o="pieza:EXT_POS",Mr=[15,1,2,3,4,5,6,7];function Or(t,e){let o=qa.pwm;return{1:"placa:"+o[t],2:`IN_M${t}A`,3:`pieza:M${t}A`,6:`pieza:M${t}B`,7:`IN_M${t}B`,9:"placa:"+o[e],10:`IN_M${e}A`,11:`pieza:M${e}A`,14:`pieza:M${e}B`,15:`IN_M${e}B`,4:Lt,5:Lt,12:Lt,13:Lt,8:$o,16:Ke}}function yc(){let t=qa,e={8:Lt,16:Ke,10:Ke,11:"placa:"+t.reloj,12:"placa:"+t.cierre,13:"placa:"+t.habilita,14:"placa:"+t.datos};for(let[o,{A:i,B:s}]of Object.entries(t.bits))e[Mr[i]]=`IN_M${o}A`,e[Mr[s]]=`IN_M${o}B`;return e}var kr="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-05P_1x05_P5.00mm",Ri="TerminalBlock:TerminalBlock_MaiXu_MX126-5.0-02P_1x02_P5.00mm",Nr="Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",_i="Package_DIP:DIP-16_W7.62mm",wo={ref:"C",lib:"Device",parte:"C",huella:"Capacitor_THT:C_Disc_D5.0mm_W2.5mm_P5.00mm",valor:"100nF"},Cc=[{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:_i,valor:"L293D",nota:"M1 y M2",pads:Or(1,2)},{ref:"U",lib:"Driver_Motor",parte:"L293D",huella:_i,valor:"L293D",nota:"M3 y M4",pads:Or(3,4)},{ref:"U",lib:"74xx",parte:"74HC595",huella:_i,valor:"74HC595",nota:"sentido de los motores",pads:yc()},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:kr,valor:"M1 GND M2",externo:!0,pads:{1:"pieza:M1A",2:"pieza:M1B",3:"pieza:GND_IZQ",4:"pieza:M2A",5:"pieza:M2B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x05",huella:kr,valor:"M4 GND M3",externo:!0,pads:{1:"pieza:M4A",2:"pieza:M4B",3:"pieza:GND_DER",4:"pieza:M3A",5:"pieza:M3B"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x02",huella:Ri,valor:"EXT_PWR",externo:!0,pads:{1:$o,2:"pieza:EXT_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Nr,valor:"SERVO_1",externo:!0,pads:{1:"pieza:S1_SIG",2:"pieza:S1_POS",3:"pieza:S1_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:Nr,valor:"SERVO_2",externo:!0,pads:{1:"pieza:S2_SIG",2:"pieza:S2_POS",3:"pieza:S2_GND"}},{ref:"JP",lib:"Jumper",parte:"Jumper_2_Open",huella:"Connector_PinHeader_2.54mm:PinHeader_1x02_P2.54mm_Vertical",valor:"PWR",pads:{1:$o,2:"placa:VIN"}},{...wo,nota:"junto a U1",pads:{1:Ke,2:Lt}},{...wo,nota:"junto a U2",pads:{1:Ke,2:Lt}},{...wo,nota:"junto a U3",pads:{1:Ke,2:Lt}},{ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"100uF 25V",nota:"voltaje de motores",pads:{1:$o,2:Lt}},{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:"1k",nota:"LED PWR",pads:{1:$o,2:"LED_PWR"}},{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D3.0mm",valor:"LED verde",nota:"PWR",pads:{1:Lt,2:"LED_PWR"}}],Sc={EXT_POS:"VMOT",M1A:"M1_A",M1B:"M1_B",M2A:"M2_A",M2B:"M2_B",M3A:"M3_A",M3B:"M3_B",M4A:"M4_A",M4B:"M4_B"},Ae="Circuito de referencia por validar: componentes, polaridad, orden de conectores, aislamiento USB/jack y montaje de ambas variantes pendientes",$i={ref:"C",lib:"Device",parte:"C_Polarized",huella:"Capacitor_THT:CP_Radial_D6.3mm_P2.50mm",valor:"10uF 25V",nota:Ae},Vr={ref:"U",lib:"Regulator_Linear",huella:"Package_TO_SOT_SMD:SOT-223-3_TabPin2",nota:Ae},vc=[{...Vr,clave:"REG_5V",parte:"LD1117S50TR_SOT223",valor:"LD1117S50TR 5V (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_5V",3:"pieza:JACK_POS"}},{...Vr,clave:"REG_3V3",parte:"LD1117S33TR_SOT223",valor:"LD1117S33TR 3V3 (referencia por validar)",pads:{1:"pieza:JACK_GND",2:"pieza:OUT_3V3",3:"pieza:OUT_5V"}},{...$i,clave:"FILTRO_JACK",pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{...$i,clave:"FILTRO_5V",pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{...$i,clave:"FILTRO_3V3",pads:{1:"pieza:OUT_3V3",2:"pieza:JACK_GND"}},{...wo,clave:"DESACOPLE_JACK",nota:Ae,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{...wo,clave:"DESACOPLE_5V",nota:Ae,pads:{1:"pieza:OUT_5V",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector",parte:"Barrel_Jack_Switch",huella:"Connector_BarrelJack:BarrelJack_CUI_PJ-102AH_Horizontal",clave:"JACK",valor:"PJ-102AH centro + (referencia por validar)",nota:Ae,externo:!0,pads:{1:"pieza:JACK_POS",2:"pieza:JACK_GND"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x04",huella:"Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical",clave:"I2C",valor:"I2C SDA SCL 5V GND (referencia por validar)",nota:Ae,externo:!0,pads:{1:"pieza:I2C_SDA",2:"pieza:I2C_SCL",3:"pieza:I2C_V",4:"pieza:I2C_G"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x06",huella:"Connector_PinHeader_2.54mm:PinHeader_1x06_P2.54mm_Vertical",clave:"SPI",valor:"SPI MISO MOSI SCK SS 5V GND (referencia por validar)",nota:Ae+"; SPI es un conector a\xF1adido al dise\xF1o, no el bloque de seis salidas de alimentaci\xF3n de la expansi\xF3n",externo:!0,pads:{1:"placa:D12",2:"placa:D11",3:"placa:D13",4:"placa:D10",5:"placa:5V",6:"placa:GND1"}}],Ac={JACK_POS:"JACK_VIN",OUT_3V3:"REG_3V3"},_c={motor_tt:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:Ri,valor:()=>"Motor TT",pines:{A:"1",B:"2"}}],bateria_lipo:[{ref:"J",lib:"Connector",parte:"Screw_Terminal_01x02",huella:Ri,valor:()=>"LiPo 2S",pines:{POS:"1",NEG:"2"}},{ref:"J",lib:"Connector_Generic",parte:"Conn_01x03",huella:"Connector_JST:JST_XH_B3B-XH-A_1x03_P2.50mm_Vertical",valor:()=>"Balance LiPo",sufijo:"/balance",pines:{BAL0:"1",BAL1:"2",BAL2:"3"}}],probador_lipo:[{ref:"J",lib:"Connector_Generic",parte:"Conn_01x09",huella:"Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical",valor:()=>"Probador de celdas",pines:{NEG:"1",C1:"2",C2:"3",C3:"4",C4:"5",C5:"6",C6:"7",C7:"8",C8:"9"}}]},$c=new Set(["servo"]),dt=t=>'"'+String(t).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function wc(t){let o=[2166136261,16777619,2654435769,2246822507].map(i=>{let s=i>>>0;for(let c=0;c<t.length;c++)s=Math.imul(s^t.charCodeAt(c),16777619)>>>0;return s.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Ur(t,{nombre:e="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:i="TecnoCircuito"}={}){let s=Yt(t.placa);if(s&&t.componentes.filter(h=>h.tipo==="shield_nano_io").length>1)throw new Error("Solo puedes exportar una expansi\xF3n E/S por Nano. Quita la expansi\xF3n adicional.");let c={...t,componentes:t.componentes.map(h=>h.tipo==="shield_l293d"?{...h,props:{...h.props,puentePWR:!1}}:h)},p=na(c),n=c.componentes.find(h=>h.tipo==="shield_l293d")||null,l=h=>{let[P,y]=h.split(":");return y===void 0?"#"+h:p((P==="placa"?"placa":n.id)+"."+y)},x=n?Cc.map(h=>({...h,id:`${n.id}/${h.valor}${h.nota?" "+h.nota:""}`,enShield:!0})):[],b=s?c.componentes.filter(h=>h.tipo==="shield_nano_io").flatMap(h=>vc.map(P=>({...P,id:`${h.id}/${P.clave}`,expansion:h.id}))):[],m=(h,P,y=p)=>{let[R,T]=P.split(":");return y((R==="placa"?"placa":h.expansion)+"."+T)},S=new Set(t.cables.flatMap(h=>[h.de,h.a])),v=new Set(x.flatMap(h=>Object.values(h.pads).map(l))),_=s?Object.keys(vi.pines):Object.keys(Si).filter(h=>S.has("placa."+h)||v.has(p("placa."+h))),O=c.componentes.filter(h=>Ai[h.tipo]),B=na(c,{balanceInterno:!1}),k=h=>{let[P,y]=h.split(":");return y===void 0?"#"+h:B((P==="placa"?"placa":n.id)+"."+y)},gt=new Set([..._.map(h=>B("placa."+h)),...x.flatMap(h=>Object.values(h.pads).map(k)),...b.flatMap(h=>Object.values(h.pads).map(P=>m(h,P,B))),...O.flatMap(h=>Object.keys(Ai[h.tipo].pads).map(P=>B(h.id+"."+P)))]),Qt=new Set([...x.filter(h=>h.externo).flatMap(h=>Object.values(h.pads).map(k)),...b.filter(h=>h.externo).flatMap(h=>Object.values(h.pads).map(P=>m(h,P,B)))]),V=(h,P)=>P.filter(y=>gt.has(B(h+"."+y))),zt=(h,P)=>V(h,P).some(y=>!Qt.has(B(h+"."+y))),bt=(h,P)=>{let y=V(h,P);return y.length>0&&y.every(R=>Qt.has(B(h+"."+R)))},E=[];s&&E.push({...vi,id:"placa",pads:_.map(h=>[vi.pines[h],p("placa."+h),null,h])});for(let h of O){let P=Ai[h.tipo];$c.has(h.tipo)&&bt(h.id,Object.keys(P.pads))||E.push({...P,id:h.id,valor:P.valor(h.props||{}),pads:Object.entries(P.pads).map(([y,R])=>[R,p(h.id+"."+y)])})}for(let h of x)E.push({...h,pads:Object.entries(h.pads).map(([P,y])=>[P,l(y),y.startsWith("pieza:")?Sc[y.slice(6)]:null])});for(let h of b)E.push({...h,pads:Object.entries(h.pads).map(([P,y])=>[P,m(h,y),Ac[y.slice(6)]||null])});for(let h of c.componentes)for(let P of _c[h.tipo]||[])zt(h.id,Object.keys(P.pines))&&E.push({...P,id:h.id+(P.sufijo||""),valor:P.valor(h.props||{}),pads:Object.entries(P.pines).map(([y,R])=>[R,p(h.id+"."+y)])});let Y={J:s?0:wi.length};for(let h of E)Y[h.ref]=(Y[h.ref]||0)+1,h.ref=h.ref+Y[h.ref];let nt=new Map,Te=(h,P,y,R,T)=>{nt.has(h)||nt.set(h,{pads:new Map,uno:new Set,shield:new Set,propia:h.startsWith("#")?h.slice(1):null});let Mt=nt.get(h);Mt.pads.set(P+" "+y,{ref:P,pad:y,pinUno:R}),R&&Mt.uno.add(gc[R]||R),T&&Mt.shield.add(T)};if(!s)for(let h of _)Te(p("placa."+h),Si[h].ref,Si[h].pad,h,null);for(let h of E)for(let[P,y,R,T]of h.pads)Te(y,h.ref,String(P),T==="RESET2"?"RESET":T,R);let wt=(h,P)=>h.localeCompare(P,"en",{numeric:!0}),te=[...nt.values()].filter(h=>h.pads.size>=2).map(h=>{let P=[...h.pads.values()].sort((R,T)=>wt(R.ref,T.ref)||wt(R.pad,T.pad));return{nombre:bc.find(R=>h.uno.has(R))||[...h.uno].sort(wt)[0]||[...h.shield].sort(wt)[0]||h.propia||`Net-(${P[0].ref}-Pad${P[0].pad})`,pads:P}}).sort((h,P)=>wt(h.nombre,P.nombre)),st=[],U=(h,P,y,R,T,Mt,Ze,Qe)=>st.push("		(comp",`			(ref ${dt(h)})`,`			(value ${dt(P)})`,`			(footprint ${dt(y)})`,`			(libsource (lib ${dt(R)}) (part ${dt(T)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${dt(Mt)}))`,...Qe?[`			(property (name "TecnoCircuito_validacion") (value ${dt(Qe)}))`]:[],'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${dt(Ze)})`,"		)");if(st.push("(export",'	(version "E")',"	(design",`		(source ${dt(e)})`,`		(date ${dt(o)})`,`		(tool ${dt(i)})`,"	)"),st.push("	(components"),!s)for(let h of wi)U(h.ref,h.valor,h.huella,"Connector_Generic",h.parte,"placa",h.uuid);for(let h of E)U(h.ref,h.valor,h.huella,h.lib,h.parte,h.id,wc(e+"/"+h.id),h.expansion?h.nota:null);return st.push("	)","	(nets"),te.forEach((h,P)=>{st.push("		(net",`			(code ${dt(P+1)})`,`			(name ${dt(h.nombre)})`,'			(class "Default")');for(let y of h.pads){let R=y.pinUno?` (pinfunction ${dt(y.pinUno)})`:"";st.push(`			(node (ref ${dt(y.ref)}) (pin ${dt(y.pad)})${R} (pintype "passive"))`)}st.push("		)")}),st.push("	)",")"),st.join(`
`)+`
`}var _e;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(_e||(_e={}));var ut;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(ut||(ut={}));var Br={0:{type:ut.SingleEnded,channel:0},1:{type:ut.SingleEnded,channel:1},2:{type:ut.SingleEnded,channel:2},3:{type:ut.SingleEnded,channel:3},4:{type:ut.SingleEnded,channel:4},5:{type:ut.SingleEnded,channel:5},6:{type:ut.SingleEnded,channel:6},7:{type:ut.SingleEnded,channel:7},8:{type:ut.Temperature},14:{type:ut.Constant,voltage:1.1},15:{type:ut.Constant,voltage:0}},md={type:ut.Constant,voltage:0},Ec={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Br,adcReferences:[_e.AREF,_e.AVCC,_e.Reserved,_e.Internal1V1]};var Pc=2,Tc=4,Ic=8,Dc=16,Mc=32,bd=Pc|Tc|Ic|Dc|Mc;var Lr={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Gr={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},zr={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0};var Wr={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var Ro={PIN:35,DDR:36,PORT:37,pinChange:zr,externalInterrupts:[]};var $e={PIN:41,DDR:42,PORT:43,pinChange:Wr,externalInterrupts:[null,null,Lr,Gr]};var ca;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(ca||(ca={}));var la;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(la||(la={}));var jr;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(jr||(jr={}));var qr={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Fr;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Fr||(Fr={}));var Ii={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Oc=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:qr,compPortA:$e.PORT,compPinA:6,compPortB:$e.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:$e.PORT,externalClockPin:4},Ii),kc=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:qr,compPortA:Ro.PORT,compPinA:1,compPortB:Ro.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:$e.PORT,externalClockPin:5},Ii),Nc=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:Ro.PORT,compPinA:3,compPortB:$e.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Ii),Ei;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(Ei||(Ei={}));var W;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(W||(W={}));var F;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(F||(F={}));var Ee=1,da=2,Je=1,{Normal:Xr,PWMPhaseCorrect:we,CTC:Pi,FastPWM:Re,Reserved:Ti,PWMPhaseFrequencyCorrect:Hr}=Ei,Ad=[[Xr,255,F.Immediate,W.Max,0],[we,255,F.Top,W.Bottom,0],[Pi,Ee,F.Immediate,W.Max,0],[Re,255,F.Bottom,W.Max,0],[Ti,255,F.Immediate,W.Max,0],[we,Ee,F.Top,W.Bottom,Je],[Ti,255,F.Immediate,W.Max,0],[Re,Ee,F.Bottom,W.Top,Je]],_d=[[Xr,65535,F.Immediate,W.Max,0],[we,255,F.Top,W.Bottom,0],[we,511,F.Top,W.Bottom,0],[we,1023,F.Top,W.Bottom,0],[Pi,Ee,F.Immediate,W.Max,0],[Re,255,F.Bottom,W.Top,0],[Re,511,F.Bottom,W.Top,0],[Re,1023,F.Bottom,W.Top,0],[Hr,da,F.Bottom,W.Bottom,0],[Hr,Ee,F.Bottom,W.Bottom,Je],[we,da,F.Top,W.Bottom,0],[we,Ee,F.Top,W.Bottom,Je],[Pi,da,F.Immediate,W.Max,0],[Ti,65535,F.Immediate,W.Max,0],[Re,da,F.Bottom,W.Top,Je],[Re,Ee,F.Bottom,W.Top,Je]];var Vc=16,Uc=8,Bc=4;var Pd=Bc|Vc|Uc;var Zt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15};var St=(t,e=1)=>Number.isInteger(t)?String(t):t.toFixed(e).replace(".",","),Kr=t=>t>=1e3?St(t/1e3)+" k\u03A9":t+" \u03A9",Eo=t=>({estado:"validado",texto:t}),Pe=t=>({estado:"por_validar",texto:t}),Di=[{nombre:"B\xE1sicas",piezas:["protoboard","resistencia","led"]},{nombre:"Entradas",piezas:["pulsador","potenciometro"]},{nombre:"Actuadores",piezas:["servo","motor_tt"]},{nombre:"Potencia y energ\xEDa",piezas:["shield_l293d","shield_nano_io","bateria_lipo","probador_lipo"]}],Po={shield_nano_io:{nombre:"Expansi\xF3n E/S del Nano",descripcion:"El Nano va montado en esta tarjeta. Cada grupo re\xFAne se\xF1al, 5V y tierra para conectar sensores o servos. El jack alimenta la regulaci\xF3n de la expansi\xF3n; A6 y A7 solo leen se\xF1ales anal\xF3gicas.",palabras:["nano","expansion","shield","sensores","servo","roja","azul","i2c","spi","jack"],pines:"S: se\xF1al del pin indicado; V: 5V; G: tierra. I2C: SDA/A4 y SCL/A5, junto a UART. El bloque de seis contactos ofrece dos GND, dos 3,3V y dos 5V. SPI se conecta en el Nano: D12/MISO, D11/MOSI, D13/SCK y D10/SS. OUT_3V3 es la salida de la expansi\xF3n, separada de la del m\xF3dulo Nano",datos:t=>[["Tarjeta",t.variante==="azul"?"Azul":"Roja"],["Placa","Nano cl\xE1sico ATmega328P \xB7 16 MHz"],["Entradas anal\xF3gicas","A0 a A7; A6 y A7 solo anal\xF3gicas"],["Alimentaci\xF3n",t.alimentacion==="jack"?`Jack: ${Number(t.voltajeJack??9)} V (o la bater\xEDa conectada)`:t.alimentacion==="apagada"?"Desconectada":"USB del Nano"],["Regulaci\xF3n","Modelo de referencia 5V y 3,3V; salida externa 3,3V separada del m\xF3dulo"],["KiCad","M\xF3dulo Nano + regulaci\xF3n/filtrado de referencia, jack, I2C y conector SPI a\xF1adido al dise\xF1o"]],validacion:()=>Pe("Dibujo basado en las referencias roja y azul; Efra\xEDn confirm\xF3 que el bloque de seis contactos es alimentaci\xF3n. Falta medir continuidad, reguladores, puentes, polaridad y capacidad de cada tarjeta. I2C y los pines SPI del Nano son conexiones; sus dispositivos se incorporan por separado.")},protoboard:{nombre:"Protoboard",descripcion:"Placa de pruebas: une las patas de las piezas sin soldar. Cada columna de 5 huecos est\xE1 unida por dentro, y los rieles + y \u2212 llevan la energ\xEDa a lo largo.",palabras:["breadboard","placa de pruebas","tablero","huecos","rieles"],pines:"400 huecos: tiras de 5 (a\u2013e y f\u2013j) y dos rieles + y \u2212 arriba y abajo",datos:()=>[["Puntos","400 (media protoboard)"],["Tiras","30 columnas, de 5 huecos unidos"],["Paso",'2,54 mm (0,1"), como las patas']],validacion:()=>null},resistencia:{nombre:"Resistencia",descripcion:"Limita la corriente. Va en serie con el LED para que no se queme, y como pull-down o pull-up en un bot\xF3n.",palabras:["resistor","ohm","ohmios","limitar","corriente","pull-down","pull-up"],pines:"1 y 2 (da igual el sentido)",datos:t=>[["Valor",Kr(Number(t.ohmios)||220)],["Potencia m\xE1xima","\xBC W (0,25 W): m\xE1s, se calienta"],["Tolerancia","\xB15 % (franja dorada)"]],validacion:()=>Eo("Comparada con el mult\xEDmetro el 7 oct 2026 (220, 330 y 1 k\u03A9 con un LED rojo).")},led:{nombre:"LED",descripcion:"Diodo que da luz. Tiene polaridad: la pata larga (\xE1nodo) va hacia el +, y siempre con una resistencia en serie.",palabras:["luz","foco","bombillo","diodo","lampara","indicador"],pines:"\xE1nodo (+, pata larga) y c\xE1todo (\u2212, pata corta)",datos:t=>[["Color",t.color||"rojo"],["Voltaje directo",`${St(Zt.vf[t.color]||Zt.vf.rojo,2)} V a ${Zt.normalmA} mA`],["Corriente",`de 5 a ${Zt.normalmA} mA; se quema desde ${Zt.quemamA} mA`],["Resistencia con 5 V",`${Math.ceil((5-(Zt.vf[t.color]||Zt.vf.rojo))/(Zt.normalmA/1e3)/10)*10} \u03A9 o m\xE1s`]],validacion:t=>!t.color||t.color==="rojo"?Eo("Comparado con el mult\xEDmetro el 7 oct 2026 (LED rojo con 220, 330 y 1 k\u03A9: 11 de 12 dentro del criterio; la que queda en el l\xEDmite cumple con la incertidumbre del mult\xEDmetro)."):Pe(`Voltaje de la hoja de datos: se midi\xF3 solo el LED rojo (7 oct 2026); falta medir el ${t.color}.`)},pulsador:{nombre:"Bot\xF3n",descripcion:"Pulsador de 4 patas: al presionarlo une los dos lados. Con digitalRead() necesita una resistencia pull-down o INPUT_PULLUP; si no, la entrada queda al aire.",palabras:["pulsador","interruptor","switch","tecla","boton","entrada digital"],pines:"1i y 1d unidas por dentro; 2i y 2d unidas por dentro. Al presionar, el 1 se une con el 2",datos:t=>[["Color",t.color||"rojo"],["Lectura","digitalRead(): ALTO o BAJO"],["Sin pull-down","la entrada queda al aire (lee al azar)"]],validacion:()=>Eo("La entrada al aire se midi\xF3 con la placa real el 9 oct 2026 (se queda en su nivel; con la mano capta los 60 Hz).")},potenciometro:{nombre:"Potenci\xF3metro",descripcion:"Resistencia con perilla: la pata del medio (SIG) da un voltaje entre 0 y 5 V seg\xFAn el giro. Con analogRead() se lee de 0 a 1023.",palabras:["perilla","knob","regulador","variable","analogico","analogread","trimmer"],pines:"GND, SIG (el cursor, al pin anal\xF3gico) y VCC (5V)",datos:t=>[["Valor",Kr(Number(t.ohmios)||1e4)],["Perilla",`${Math.round((Number(t.posicion)||0)*100)} %`],["Lectura","analogRead(): 0 a 1023 (5 V / 1024 por paso)"]],validacion:()=>Eo("Lectura anal\xF3gica revisada el 7 oct 2026. El ruido del ADC (unos 0,1 pasos) es una estimaci\xF3n del 9 oct: falta repetirlo con el programa corregido.")},servo:{nombre:"Servo",descripcion:"Motor que va a un \xE1ngulo de 0\xB0 a 180\xB0 y se queda ah\xED. Recibe un pulso cada 20 ms por el cable naranja: el ancho del pulso dice el \xE1ngulo.",palabras:["servomotor","sg90","mg90s","angulo","brazo","micro servo","otto"],pines:"GND (marr\xF3n), VCC (rojo, a 5V) y SIG (naranja, a un pin)",datos:t=>{let e=Ut[t.modelo]||Ut.sg90;return[["Modelo",`${e.nombre} (engranajes de ${t.modelo==="mg90s"?"metal":"pl\xE1stico"})`],["\xC1ngulo","0\xB0 a 180\xB0 con write()"],["Torque",`${St(e.torque_kgcm)} kg\xB7cm a 4,8 V`],["Corriente",`quieto ${e.mA.reposo} mA \xB7 movi\xE9ndose ~${t.modelo==="mg90s"?e.mA.movimiento:100} mA \xB7 bloqueado ${e.mA.arranque} mA`],["Alimentaci\xF3n","el 5V de la placa (un pin da solo 40 mA)"]]},validacion:t=>t.modelo==="mg90s"?Pe("Valores de la hoja de datos: falta medir el MG90S del kit (corriente y \xE1ngulos)."):Eo("SG90 medido con la placa real el 9 oct 2026: \xE1ngulos (7\xB0, 90\xB0 y 175\xB0) y corriente (quieto menos de 10 mA, lo m\xEDnimo que muestra el mult\xEDmetro; ~100 mA movi\xE9ndose; 590 mA bloqueado). Los 6 mA quieto son de la hoja de datos.")},motor_tt:{nombre:"Motor TT",descripcion:"Motorreductor amarillo de los carros: gira hacia un lado o el otro seg\xFAn la polaridad. Pide mucha corriente: va a los bornes M1 a M4 de la shield, nunca a un pin.",palabras:["motor","rueda","llanta","carro","robot","motorreductor","motor dc","tt","amarillo"],pines:"A (rojo) y B (negro); al invertirlos gira al rev\xE9s",datos:t=>[["Voltaje",`3 a ${ft.voltiosRef} V`],["Sin carga a 6 V",`${ft.rpmSinCarga} RPM y ${ft.mASinCarga} mA`],["Bloqueado",`${St(ft.mABloqueado/1e3)} A (al arrancar, un instante)`],["Reducci\xF3n",`1:${ft.reduccion} \xB7 rueda de ${ft.ruedaMM} mm`],["Vista y lado",`${t.vista==="rueda"?"con la rueda":"solo el eje"} \xB7 lado ${t.lado||"izquierdo"}`]],validacion:()=>Pe("Valores de hojas de datos: falta medir la corriente y las RPM del motor del kit.")},shield_l293d:{nombre:"Shield L293D",descripcion:"Placa que va encima del Uno y maneja hasta 4 motores. El 74HC595 recibe el sentido de cada motor y los dos L293D le dan la corriente desde la bater\xEDa de EXT_PWR.",palabras:["l293d","puente h","driver","controlador de motores","74hc595","afmotor","motor shield","escudo"],pines:"bornes M1 a M4, EXT_PWR (+M y GND) y SERVO_1 (pin 10) y SERVO_2 (pin 9)",datos:t=>[["Motores","4 DC (o 2 paso a paso), 0,6 A por canal"],["Usa los pines","4, 7, 8 y 12 (74HC595) y 11, 3, 6 y 5 (velocidad)"],["Servos","SERVO_1 = pin 10 \xB7 SERVO_2 = pin 9"],["Ca\xEDda del L293D","1,4 a 2 V: al motor le llega menos que la bater\xEDa"],["Puente PWR",t.puentePWR===!1?"quitado: la bater\xEDa solo va a los motores":"puesto: la bater\xEDa tambi\xE9n alimenta el Uno por VIN"],["Librer\xEDa","AFMotor_R4"],["En KiCad","sale desarmada: U1 y U2 (L293D), U3 (74HC595), borneras, servos, puente PWR, C1 a C4 y el LED"]],validacion:()=>Pe("Conexiones de la librer\xEDa del kit y de las hojas de datos: falta medir la ca\xEDda del L293D en la placa real.")},bateria_lipo:{nombre:"Bater\xEDa LiPo 2S",descripcion:"Bater\xEDa recargable de 2 celdas para los motores. Va a EXT_PWR de la shield. Por debajo de 3,0 V por celda se da\xF1a: hay que cargarla a tiempo.",palabras:["bateria","pila","lipo","energia","alimentacion","voltaje","celda","fuente","carga"],pines:"potencia: POS (+, rojo) y NEG (\u2212, negro). Balance: BAL0 (\u2212), BAL1 (entre las celdas) y BAL2 (+), para el cargador y el probador",datos:t=>{let e=$t[t.carga]||$t.nominal;return[["Carga",`${e.nombre}: ${St(e.voltios)} V`],["Celdas",e.celdas.map((o,i)=>`${i+1}: ${St(o,2)} V`).join(" \xB7 ")],["Llena / nominal / descargada",`${St($t.llena.voltios)} / ${St($t.nominal.voltios)} / ${St($t.descargada.voltios)} V`],["M\xEDnimo",`${St(Ge.minimoCeldaV)} V por celda (${St(Ge.minimoCeldaV*Ge.celdas)} V)`],["Capacidad","1300 mAh"]]},validacion:()=>Pe("Valores t\xEDpicos de una LiPo 2S: falta medir la del kit con los motores.")},probador_lipo:{nombre:"Probador de celdas",descripcion:"Se conecta al cable de balance y muestra el voltaje total, cu\xE1ntas celdas hay y el de cada una. Si una celda baja del umbral, pita.",palabras:["probador","medidor","zumbador","alarma","checker","tester","celdas","bateria","lipo","voltimetro","balance"],pines:"\u2212 (al negro del balance) y 1 a 8 (el + de cada celda, en orden)",datos:t=>[["Pantalla","total \u2192 \xAB2S\xBB \u2192 \xAB-1-\xBB y su voltaje \u2192 \xAB-2-\xBB y su voltaje\u2026"],["Alarma",t.umbral?`pita si una celda baja de ${St(t.umbral)} V`:"apagada"],["Mide",`de 1 a 8 celdas (LiPo, Li-ion, LiFe); de f\xE1brica pita en ${St(pe.umbralV)} V`],["Energ\xEDa","la toma de la misma bater\xEDa, por el cable de balance"]],validacion:()=>Pe("Hecho a partir del probador del kit: falta comparar su pantalla con la del real.")}},Jr=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function Yr(t){let e=Jr(t).split(/\s+/).filter(Boolean),o=Di.flatMap(i=>i.piezas.map(s=>({tipo:s,categoria:i.nombre})));return e.length?o.filter(({tipo:i,categoria:s})=>{let c=Po[i],p=Jr([c.nombre,s,c.descripcion,...c.palabras].join(" "));return e.every(n=>p.includes(n))}):o}var Zr="http://www.w3.org/2000/svg",jc="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Lc=280,Qr=5e3,tn=4,en=8,Gc=9.6,on=.4,zc=5,Gt=t=>JSON.parse(JSON.stringify(t)),it=t=>Math.round(t*100)/100,To=(t,e)=>Math.hypot(t.x-e.x,t.y-e.y),Mi=t=>He[t]||(/^#[0-9a-f]{3,8}$/i.test(t||"")?t:He.verde);function nn(t,e={}){if(!(t instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=e.placa||e.circuito?.placa||"uno";if(!It[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let i=!!e.soloLectura,s=typeof e.alEvento=="function"?e.alEvento:null,c=[],p=[],n=Wc(e.circuito,o,p),l=document.createElement("div");l.className="tecnocircuito",t.appendChild(l);let x=l.attachShadow({mode:"open"});x.innerHTML=`<style>${zs}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Qr} ${Qr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>`;let b=a=>x.querySelector(a),m=b(".tc"),S=b(".tc-barra"),v=b(".tc-biblioteca"),_=b(".tc-buscar"),O=b(".tc-bib-lista"),B=b(".tc-bib-vacio"),k=b(".tc-ficha"),gt=S.querySelector('[data-accion="menu"]'),Qt=b(".tc-sel"),V=b(".tc-area"),zt=b(".tc-mundo"),bt=b(".tc-capa-comp"),E=b(".tc-capa-pines"),Y=b(".tc-cables"),nt=b(".tc-asas"),[Te,wt]=b(".tc-previa").children,te=b(".tc-ayuda"),st=b(".tc-tip"),U={px:0,py:0,escala:1.5},h=new Map,P=new Map,y=null,R=null,T=null,Mt=null,Ze=null,Qe=!1,pa=!1,to=!1,Io=null,fa=!1,rt={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{},piezas:{}},ha=new Set,Vi=[],Ui=[],ua="",K=a=>n.componentes.find(r=>r.id===a),Do=a=>a==="protoboard"?n.protoboard:K(a),Ie=a=>!!(a&&X[a.tipo]&&X[a.tipo].montada),Mo=a=>a==="placa"||Ie(K(a))?{x:0,y:0,rot:0}:Do(a);function Oo(a,r,d){let f=a==="placa"?It[o]:X[r],u=document.createElement("div");u.className="tc-comp"+(a==="placa"?" tc-placa":""),u.dataset.id=a,r&&(u.dataset.tipo=r);let g;if(f&&f.dibujo){let w=document.createElement("template");w.innerHTML=f.dibujo.svg(d),g=w.content.firstElementChild}else f?(g=document.createElement(f.etiqueta),f.aplicar&&f.aplicar(g,d),f.perilla&&g.addEventListener("input",()=>ls(a,Number(g.value)/100))):(g=document.createElement("div"),g.className="tc-desconocido",g.textContent=`\xBF${r}?`,g.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");u.appendChild(g);let C=h.get("placa");f&&f.montada&&C?bt.insertBefore(u,C.div.nextSibling):bt.appendChild(u);let $={id:a,def:f,div:u,el:g,w:64,h:40,pines:new Map,lista:!1};return h.set(a,$),Promise.resolve(g.updateComplete).then(()=>{if(h.get(a)===$){if(f&&f.dibujo){let w=f.dibujo.marco?f.dibujo.marco(d):f.dibujo;Object.assign($,{w:w.ancho,h:w.alto});for(let[N,H]of Object.entries(w.pines)){let tt=document.createElement("div");tt.className="tc-pin",tt.dataset.ref=`${a}.${N}`,E.appendChild(tt),$.pines.set(N,{px:H.x,py:H.y,div:tt})}}else if(f){Object.assign($,Hi(g));for(let w of g.pinInfo||[]){let N=f.nombrePin(w.name);if(!N)continue;let H=document.createElement("div");H.className="tc-pin",H.dataset.ref=`${a}.${N}`,E.appendChild(H),$.pines.set(N,{px:w.x,py:w.y,div:H})}}$.lista=!0,fe($),Fi($)}})}function Bi(){let a=n.protoboard.tipo,r=jt[a]||jt.media,d=document.createElement("div");d.className="tc-comp tc-protoboard",d.dataset.id="protoboard",d.dataset.tipo="protoboard";let f=document.createElement("template");f.innerHTML=Ci(a);let u=f.content.firstElementChild;d.appendChild(u);let g=h.get("placa");bt.insertBefore(d,g?g.div.nextSibling:bt.firstChild);let C={id:"protoboard",def:{protoboard:!0},div:d,el:u,w:r.ancho,h:r.alto,pines:new Map,lista:!0};for(let $ of qe(a)){let w=document.createElement("div");w.className="tc-pin tc-hueco",w.dataset.ref="protoboard."+$.nombre,w.style.left=$.x+"px",w.style.top=$.y+"px",d.appendChild(w),C.pines.set($.nombre,{px:$.x,py:$.y,div:w})}return h.set("protoboard",C),fe(C),No(),Promise.resolve()}function ji(a=null){if(n.protoboard)return;let r=$a(),d=jt.media;n.protoboard=a?{tipo:"media",x:Math.round(a.x-d.ancho/2),y:Math.round(a.y-d.alto/2)}:{tipo:"media",x:Math.round(Math.max(300,r?r.x1+30:300)),y:30},Bi(),ko(),yt("componente_agregado",{id:"protoboard",tipo:"protoboard"}),Rt({tipo:"comp",id:"protoboard"}),!to&&!a&&ro(),mt()}function ko(){let a=v.querySelector('[data-accion="protoboard"]');if(a){a.disabled=!!n.protoboard,a.title=n.protoboard?"Ya hay una protoboard":"";for(let[r,d]of Object.entries(X)){if(!d.montada)continue;let f=v.querySelector(`[data-tipo="${r}"]`),u=n.componentes.some(C=>C.tipo===r),g=d.placas&&!d.placas.includes(o);f&&Object.assign(f,{disabled:u||g,title:g?`${d.nombre} se monta en ${d.placas.map(C=>It[C].nombre).join(" o ")}`:u?`Ya hay una ${d.nombre}`:""})}}}function un(a){let r=h.get(a.id),d=n.protoboard;return!r||!r.lista||!d||!r.pines.size?null:[...r.pines].map(([f,u])=>{let g=xa(r,a,u);return{nombre:f,x:g.x-d.x,y:g.y-d.y}})}function Li(a){let r=new Set;for(let d of n.componentes)if(d!==a&&d.en)for(let f of Object.values(d.en))r.add(f.slice(11));return r}function Gi(a){let r=un(a);return r?Pr(r,{tipo:n.protoboard.tipo,ocupados:Li(a)}):null}function ma(a){if(Ie(a))return!1;let r=Gi(a);return r?(a.x=it(a.x+r.dx),a.y=it(a.y+r.dy),a.en=Object.fromEntries(Object.entries(r.en).map(([d,f])=>[d,"protoboard."+f]))):delete a.en,fe(h.get(a.id)),No(),Ot(),!!r}let eo=[];function mn(a){zi();let r=n.protoboard&&Gi(a),d=h.get("protoboard");!r||!d||(eo=Object.values(r.en).map(f=>d.pines.get(f).div),eo.forEach(f=>f.classList.add("tc-destino")))}function zi(){eo.forEach(a=>a.classList.remove("tc-destino")),eo=[]}function No(){let a=h.get("protoboard");if(!a)return;let r=Li(null);for(let[d,f]of a.pines)f.div.classList.toggle("tc-ocupado",r.has(d))}let Vo=[];function Wi(a){Vo.forEach(C=>C.classList.remove("tc-tira")),Vo=[];let r=h.get("protoboard");if(!a||!r)return;let[d,f]=Uo(a),u=d==="protoboard"?f:null;if(!u){let C=K(d);C&&C.en&&C.en[f]&&(u=C.en[f].slice(11))}if(!u)return;let g=yi(u);for(let[C,$]of r.pines)yi(C)===g&&($.div.classList.add("tc-tira"),Vo.push($.div))}function Fi(a){if(a.id==="placa")if(a.def.mostrar)a.def.mostrar(a.el,rt.simulando?rt.placa:null);else for(let r of["ledPower","led13","ledTX","ledRX"])a.el[r]=!!rt.placa[r];else if(a.def===X.led){let r=Number(rt.leds[a.id])||0;a.el.value=r>.005,a.el.brightness=r,a.div.classList.toggle("tc-quemado",rt.quemados.includes(a.id))}else if(a.def&&a.def.mostrar){let r=rt.simulando&&(rt.piezas[a.id]||rt.servos[a.id])||null;a.def.mostrar(a.el,r,(K(a.id)||{}).props)}}function Hi(a){let r=a.shadowRoot&&a.shadowRoot.querySelector("svg"),d=r&&sn(r.getAttribute("width")),f=r&&sn(r.getAttribute("height"));return d&&f?{w:d,h:f}:{w:a.offsetWidth||64,h:a.offsetHeight||40}}function fe(a){if(!a)return;let r=Mo(a.id);if(r&&(Object.assign(a.div.style,{left:r.x+"px",top:r.y+"px",width:a.w+"px",height:a.h+"px",transform:r.rot?`rotate(${r.rot}deg)`:""}),a.id!=="protoboard"))for(let d of a.pines.values()){let f=xa(a,r,d);d.div.style.left=f.x+"px",d.div.style.top=f.y+"px"}}function xa(a,r,d){let f=((r.rot||0)%360+360)%360;if(!f)return{x:r.x+d.px,y:r.y+d.py};let u=f*Math.PI/180,g=Math.round(Math.cos(u)*1e9)/1e9,C=Math.round(Math.sin(u)*1e9)/1e9,$=a.w/2,w=a.h/2,N=d.px-$,H=d.py-w;return{x:it(r.x+$+N*g-H*C),y:it(r.y+w+N*C+H*g)}}function Uo(a){let r=a.indexOf(".");return r>0?[a.slice(0,r),a.slice(r+1)]:[a,""]}function ee(a){let[r,d]=Uo(a),f=h.get(r);if(!f||!f.lista)return null;let u=Mo(r),g=ga(a);return g?xa(f,u,g):f.def?null:{x:u.x+f.w/2,y:u.y+f.h/2}}function ga(a){let[r,d]=Uo(a),f=h.get(r);if(!f)return null;if(f.pines.has(d))return f.pines.get(d);if(f.def===X.shield_nano_io&&hi[d])return ga("placa."+hi[d]);let u=r==="placa"&&Yt(o)?(Xe(o).puentes.find(g=>g.includes(d))||[d])[0]:d;return f.pines.get(u)}function Bo(a){let r=ee(a.de),d=ee(a.a);return!r||!d?null:[r,...(a.puntos||[]).map(([f,u])=>({x:f,y:u})),d]}function he(a,r,d){let f=document.createElementNS(Zr,a);for(let u in r)f.setAttribute(u,r[u]);return d.appendChild(f),f}function Ot(){for(let[a,r]of P)n.cables.includes(a)||(r.g.remove(),r.asas.forEach(d=>d.remove()),P.delete(a));n.cables.forEach((a,r)=>{let d=P.get(a);if(!d){let w=he("g",{class:"tc-cable"},Y);d={g:w,borde:he("path",{class:"tc-cable-borde"},w),linea:he("path",{class:"tc-cable-linea"},w),p0:he("circle",{class:"tc-punta",r:2.4},w),p1:he("circle",{class:"tc-punta",r:2.4},w),toque:he("path",{class:"tc-cable-toque"},w),asas:[]},P.set(a,d)}let f=Bo(a);if(d.g.style.display=f?"":"none",!f)return;let u=Oi(f),g=Mi(a.color);for(let w of[d.borde,d.linea,d.toque])w.setAttribute("d",u);d.linea.setAttribute("stroke",g),d.toque.dataset.i=r,qi(d.p0,f[0],g),qi(d.p1,f[f.length-1],g);let C=!!(y&&y.tipo==="cable"&&y.cable===a);d.g.classList.toggle("tc-seleccionado",C),C&&Y.lastChild!==d.g&&Y.appendChild(d.g);let $=C?(a.puntos||[]).length:0;for(;d.asas.length>$;)d.asas.pop().remove();for(;d.asas.length<$;)d.asas.push(he("circle",{class:"tc-asa",r:3.6},nt));d.asas.forEach((w,N)=>{w.setAttribute("cx",a.puntos[N][0]),w.setAttribute("cy",a.puntos[N][1]),w.dataset.i=r,w.dataset.p=N})})}function qi(a,r,d){a.setAttribute("cx",r.x),a.setAttribute("cy",r.y),a.setAttribute("fill",d)}function De(){let a=R&&ee(R.de);if(!a){Te.setAttribute("d",""),wt.setAttribute("d","");return}let r=R.puntos.map(C=>({...C})),d=r.length?r[r.length-1]:a,f=R.cursor?jo(R.cursor,d):d,u=R.destino&&ee(R.destino);u&&(f=u,Ki(r,a,u));let g=Oi([a,...r,f]);Te.setAttribute("d",g),wt.setAttribute("d",g),wt.setAttribute("stroke",Mi(Xi()))}function Xi(){return R.color||xi(R.de,R.destino||"")}function jo(a,r){let d=en/U.escala;return{x:it(Math.abs(a.x-r.x)<d?r.x:a.x),y:it(Math.abs(a.y-r.y)<d?r.y:a.y)}}function Ki(a,r,d){if(!a.length)return;let f=en/U.escala,u=a[a.length-1],g=a.length>1?a[a.length-2]:r;Math.abs(u.y-d.y)<f&&u.y!==g.y&&(u.y=d.y),Math.abs(u.x-d.x)<f&&u.x!==g.x&&(u.x=d.x)}function xn(a){Rt(null),R={de:a,puntos:[],cursor:null,destino:null,color:null},m.classList.add("tc-dibujando"),Zi(a,!0),De(),Lo(),Nt()}function ba(){R&&(Zi(R.de,!1),R=null,m.classList.remove("tc-dibujando"),De(),Lo(),Nt())}function Ji(a){if(He[a]){if(R)R.color=a,De();else if(y&&y.tipo==="cable"){if(y.cable.color===a)return;y.cable.color=a,Ot(),mt()}else return;Lo()}}function Yi(a){let r=R;if(!r)return;if(a===r.de)return ba();let d=ee(r.de),f=ee(a);if(d&&f&&Ki(r.puntos,d,f),ba(),n.cables.some(g=>g.de===r.de&&g.a===a||g.de===a&&g.a===r.de)){fs("Esos dos pines ya est\xE1n unidos.");return}let u={de:r.de,a,color:r.color||xi(r.de,a)};r.puntos.length&&(u.puntos=r.puntos.map(g=>[it(g.x),it(g.y)])),n.cables.push(u),yt("cable_agregado",{de:u.de,a:u.a}),Rt({tipo:"cable",cable:u}),mt()}function gn(a){let r=R.puntos.length?R.puntos[R.puntos.length-1]:ee(R.de);R.puntos.push(r?jo(a,r):a),De(),Nt()}function bn(){!R||!R.puntos.length||(R.puntos.pop(),De(),Nt())}function Zi(a,r){let d=ga(a);d&&d.div.classList.toggle("tc-activo",r)}function ya(a){n.cables=n.cables.filter(r=>r!==a),yt("cable_quitado",{de:a.de,a:a.a})}function Rt(a){y=a;for(let r of h.values())r.div.classList.toggle("tc-seleccionado",!!a&&a.tipo==="comp"&&a.id===r.id);Ot(),Lo(),Nt()}function Lo(){if(Ca(),Qt.textContent="",i||!y&&!R)return;let a=d=>Qt.insertAdjacentHTML("beforeend",d),r=d=>mi.forEach((f,u)=>{let g=He[f],C=_r[f]||f;a(`<button type="button" class="tc-muestra${d===f?" tc-activa":""}" data-accion="color" data-color="${f}" title="${u} \xB7 ${C}" aria-label="Cable ${C} (tecla ${u})" style="background:${g};color:${qc(g)}">${u}</button>`)});if(R){a('<span class="tc-etiqueta">Cable nuevo</span>'),r(Xi());return}if(y.tipo==="cable")a('<span class="tc-etiqueta">Cable</span>'),r(y.cable.color);else if(y.id==="protoboard")a(`<span class="tc-etiqueta">${(jt[n.protoboard.tipo]||jt.media).nombre}</span>`);else{let d=K(y.id),f=X[d.tipo],u=h.get(d.id);a(`<span class="tc-etiqueta">${f?f.nombre:"Pieza desconocida"}</span>`),Ie(d)||a('<button type="button" data-accion="girar">Girar</button>')}a('<button type="button" data-accion="borrar">Borrar</button>')}let oo=null,kt=a=>String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Ca(){let a=y&&y.tipo==="comp"&&!R?y.id==="protoboard"?"protoboard":(K(y.id)||{}).tipo:null,r=a&&Po[a];if(k.hidden=!r||!v.hidden,!r)return k.textContent="";oo===null&&V.clientWidth&&(oo=V.clientWidth>=900);let d=oo!==!1,f=y.id==="protoboard"?null:K(y.id),u=f&&X[f.tipo],g=f&&h.get(f.id),C="";if(f&&u&&!i){for(let $ of u.campos||(u.campo?[u.campo]:[])){let w=String(f.props[$.prop]),N=$.opciones.map(([H,tt])=>`<option value="${H}"${w===String(H)?" selected":""}>${tt}</option>`).join("");C+=`<label class="tc-campo">${$.etiqueta} <select data-prop="${$.prop}">${N}</select></label>`}if(u.perilla){let $=Math.round((Number(f.props[u.perilla.prop])||0)*100);C+=`<label class="tc-campo">${u.perilla.etiqueta} <input type="range" min="0" max="100" value="${$}" data-perilla aria-label="${u.perilla.etiqueta} del potenci\xF3metro"></label>`}if(f.tipo==="led"){let $=g&&g.el.value?" checked":"";C+=`<label class="tc-check"><input type="checkbox" data-accion="encender"${$}> Ver encendido</label>`}}k.innerHTML=`<button type="button" class="tc-ficha-titulo" data-accion="ficha" aria-expanded="${d}" aria-label="Ficha de ${kt(r.nombre)}: ${d?"ocultar los detalles":"ver los detalles"}"><span>${kt(r.nombre)}${f?` <small>${kt(f.id)}</small>`:""}</span><span class="tc-ficha-flecha">${d?"menos \u25B4":"detalles \u25BE"}</span></button><div class="tc-ficha-cuerpo"${d||C?"":" hidden"}><p class="tc-ficha-desc tc-ficha-info"${d?"":" hidden"}>${kt(r.descripcion)}</p>`+(C?`<div class="tc-ficha-props">${C}</div>`:"")+`<div class="tc-ficha-datos tc-ficha-info"${d?"":" hidden"}></div></div>`,Sa(),Qi()}function Qi(){if(k.hidden||!y)return;let a=h.get(y.id),r=y.id==="protoboard"?n.protoboard:K(y.id),d=!1;a&&r&&(d=U.px+(r.x+a.w/2)*U.escala>V.clientWidth/2),k.classList.toggle("tc-ficha-izq",d)}function Sa(){let a=k.querySelector(".tc-ficha-datos");if(!a||!y)return;let r=y.id==="protoboard"?"protoboard":(K(y.id)||{}).tipo,d=Po[r];if(!d)return;let f=y.id==="protoboard"?{}:K(y.id).props||{},u=d.validacion(f);a.innerHTML=`<dl>${d.datos(f).map(([g,C])=>`<dt>${kt(g)}</dt><dd>${kt(C)}</dd>`).join("")}</dl><p class="tc-ficha-pines"><b>Pines:</b> ${kt(d.pines)}</p>`+(u?`<p class="tc-ficha-val ${u.estado==="validado"?"tc-validado":"tc-por-validar"}"><b>${u.estado==="validado"?"\u2713 Probado con la placa real":"\u25D0 Por probar con la placa real"}</b> ${kt(u.texto)}</p>`:"")}k.addEventListener("click",a=>{a.target.closest('[data-accion="ficha"]')&&(oo=oo===!1,Ca(),k.querySelector(".tc-ficha-titulo").focus())});let ts=!1;function es(){if(!ts){ts=!0;for(let a of Di){let r=document.createElement("div");r.className="tc-bib-cat",r.innerHTML=`<div class="tc-bib-titulo">${a.nombre}</div>`;for(let d of a.piezas){let f=Po[d],u=document.createElement("button");u.type="button",u.className="tc-pieza",u.dataset.accion=d==="protoboard"?"protoboard":"agregar",d!=="protoboard"&&(u.dataset.tipo=d),u.dataset.pieza=d,u.setAttribute("aria-label",f.nombre),u.innerHTML=`<span class="tc-mini"></span><span class="tc-pieza-texto"><b>${kt(f.nombre)}</b><small>${kt(f.descripcion.split(". ")[0].replace(/\.$/,""))}</small></span>`,u.querySelector(".tc-mini").append(yn(d)),r.append(u)}O.append(r)}}}function yn(a){let r=document.createElement("template");if(a==="protoboard")return r.innerHTML=Ci("media"),r.content.firstElementChild;let d=X[a];if(d.dibujo)return r.innerHTML=d.dibujo.svg(a==="motor_tt"?{...d.props,vista:"rueda"}:d.props),r.content.firstElementChild;let f=document.createElement(d.etiqueta);return d.aplicar&&d.aplicar(f,Gt(d.props)),Promise.resolve(f.updateComplete).then(()=>{let u=Hi(f);f.style.zoom=String(Math.min(1,58/u.w,42/u.h))}),f.inert=!0,f}function os(){let a=new Set(Yr(_.value).filter(r=>!X[r.tipo]?.placas||X[r.tipo].placas.includes(o)).map(r=>r.tipo));for(let r of O.querySelectorAll(".tc-pieza"))r.hidden=!a.has(r.dataset.pieza);for(let r of O.querySelectorAll(".tc-bib-cat"))r.hidden=!r.querySelector(".tc-pieza:not([hidden])");B.hidden=a.size>0,B.textContent=a.size?"":`No hay piezas con \xAB${_.value.trim()}\xBB. Prueba con otra palabra: motor, luz, pila\u2026`}_.addEventListener("input",os),_.addEventListener("keydown",a=>{if(a.key!=="Enter")return;let r=O.querySelector(".tc-pieza:not([hidden]):not([disabled])");r&&r.click()});let vt=null,va=!1;v.addEventListener("pointerdown",a=>{let r=a.target.closest(".tc-pieza");!r||r.disabled||i||a.button!==0||(vt={b:r,x0:a.clientX,y0:a.clientY,fantasma:null},r.setPointerCapture(a.pointerId))}),v.addEventListener("pointermove",a=>{if(!vt)return;if(!vt.fantasma){if(Math.hypot(a.clientX-vt.x0,a.clientY-vt.y0)<tn)return;let d=document.createElement("div");d.className="tc-fantasma",d.append(vt.b.querySelector(".tc-mini").firstElementChild.cloneNode(!0)),m.append(d),vt.fantasma=d,v.classList.add("tc-arrastrando")}let r=m.getBoundingClientRect();vt.fantasma.style.left=a.clientX-r.left+"px",vt.fantasma.style.top=a.clientY-r.top+"px"});function as(a,r){if(!vt)return;let{b:d,fantasma:f}=vt;if(vt=null,v.classList.remove("tc-arrastrando"),!f||(f.remove(),va=!0,setTimeout(()=>va=!1,0),r))return;let u=V.getBoundingClientRect(),g=v.getBoundingClientRect(),C=$=>a.clientX>=$.left&&a.clientX<=$.right&&a.clientY>=$.top&&a.clientY<=$.bottom;!C(u)||C(g)||(ao(!1),d.dataset.accion==="protoboard"?ji(so(a)):is(d.dataset.tipo,so(a)))}v.addEventListener("pointerup",a=>as(a,!1)),v.addEventListener("pointercancel",a=>as(a,!0));function is(a,r=null){let d=X[a];if(!d||d.placas&&!d.placas.includes(o)||d.montada&&n.componentes.some(N=>N.tipo===a))return;let f=1;for(;K(d.prefijo+f);)f++;let u=d.prefijo+f,g=(V.clientWidth/2-U.px)/U.escala,C=(V.clientHeight/2-U.py)/U.escala,$=n.componentes.length%4*14,w={id:u,tipo:a,x:d.montada?0:Math.round(g-20+$),y:d.montada?0:Math.round(C-20+$),rot:0,props:Gt(d.props)};n.componentes.push(w),Oo(u,a,w.props).then(()=>{let N=h.get(u);r&&N&&!d.montada&&K(u)===w&&(w.x=Math.round(r.x-N.w/2),w.y=Math.round(r.y-N.h/2),fe(N),Ot(),mt()),n.protoboard&&K(u)===w&&ma(w)&&(yt("componente_cambiado",{id:u,x:w.x,y:w.y,en:Gt(w.en)}),mt())}),yt("componente_agregado",{id:u,tipo:a}),Rt({tipo:"comp",id:u}),mt()}function Cn(a){let r=h.get(a.id);if(r){r.div.remove();for(let d of r.pines.values())d.div.remove();h.delete(a.id)}Oo(a.id,a.tipo,a.props).then(()=>{Ot(),y&&y.id===a.id&&Rt({tipo:"comp",id:a.id})})}function ss(){if(!y||y.tipo!=="comp"||y.id==="protoboard")return;let a=K(y.id);Ie(a)||(a.rot=((a.rot||0)+90)%360,fe(h.get(a.id)),n.protoboard&&ma(a),Ot(),yt("componente_cambiado",{id:a.id,rot:a.rot,en:a.en?Gt(a.en):null}),mt())}function rs(){if(y){if(y.tipo==="cable")ya(y.cable);else if(y.id==="protoboard"){n.cables.filter(r=>r.de.startsWith("protoboard.")||r.a.startsWith("protoboard.")).forEach(r=>ya(r));for(let r of n.componentes)delete r.en;n.protoboard=null;let a=h.get("protoboard");a&&(a.div.remove(),h.delete("protoboard")),Vo=[],eo=[],ko(),yt("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let a=K(y.id),r=h.get(y.id);if(n.cables.filter(d=>d.de.startsWith(a.id+".")||d.a.startsWith(a.id+".")).forEach(d=>ya(d)),n.componentes=n.componentes.filter(d=>d!==a),r){r.div.remove();for(let d of r.pines.values())d.div.remove();h.delete(a.id)}yt("componente_quitado",{id:a.id,tipo:a.tipo}),No()}Wo(),Rt(null),mt()}}function ao(a){v.hidden=!a,Ca(),gt.setAttribute("aria-expanded",String(a)),a&&(es(),ko(),os(),_.focus({preventScroll:!0}))}v.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(!(!r||va)){if(ao(!1),r.dataset.accion==="cerrar")return gt.focus();ns(r)}}),v.addEventListener("keydown",a=>{a.key==="Escape"&&(a.stopPropagation(),ao(!1),gt.focus())}),x.addEventListener("pointerdown",a=>{!v.hidden&&!a.target.closest(".tc-biblioteca")&&a.target!==gt&&ao(!1)}),S.addEventListener("click",a=>{let r=a.target.closest("button[data-accion]");if(r){if(r.dataset.accion==="menu")return ao(v.hidden);ns(r)}});function ns(a){let r=a.dataset.accion;if(r==="acercar")return _a(1.25);if(r==="alejar")return _a(.8);if(r==="encuadrar")return to=!1,ro();i||(r==="agregar"?is(a.dataset.tipo):r==="protoboard"?ji():r==="girar"?ss():r==="borrar"?rs():r==="color"&&(Ji(a.dataset.color),V.focus({preventScroll:!0})))}function Sn(a){if(i||!y||y.tipo!=="comp")return;let r=K(y.id),d=h.get(y.id),f=X[r.tipo];if(a.target.dataset.accion==="encender"){d.el.value=a.target.checked;return}let u=a.target.dataset.prop;if(!u||!f)return;let g=typeof f.props[u],C=g==="number"?Number(a.target.value):g==="boolean"?a.target.value==="true":a.target.value;r.props={...r.props,[u]:C},f.dibujo&&f.dibujo.marco?Cn(r):f.aplicar(d.el,r.props),Sa(),yt("componente_cambiado",{id:r.id,props:Gt(r.props)}),mt()}function vn(a){if(i||!y||y.tipo!=="comp"||!("perilla"in a.target.dataset))return;let r=h.get(y.id);ls(y.id,Number(a.target.value)/100),r&&X.potenciometro.aplicar(r.el,K(y.id).props)}for(let a of[S,k])a.addEventListener("change",Sn),a.addEventListener("input",vn);function io(a,r,d){let f=h.get(a);if(f&&(f.el.pressed=r),r)ha.add(a);else if(!ha.delete(a))return;for(let u of Vi)try{u(a,r)}catch(g){console.error(g)}!r&&d!==void 0&&yt("boton_pulsado",{id:a,ms:Math.round(d)})}let cs=new Map;function ls(a,r){let d=K(a),f=h.get(a);if(!d)return;let u=X[d.tipo];if(i)return f&&u.aplicar(f.el,d.props);let g=Math.max(0,Math.min(1,Math.round(r*100)/100));if(g===d.props[u.perilla.prop])return;d.props={...d.props,[u.perilla.prop]:g};let C=y&&y.tipo==="comp"&&y.id===a&&k.querySelector("[data-perilla]");C&&Number(C.value)!==Math.round(g*100)&&(C.value=Math.round(g*100)),y&&y.id===a&&Sa(),mt(),clearTimeout(cs.get(a)),cs.set(a,setTimeout(()=>yt("componente_cambiado",{id:a,props:Gt(d.props)}),400))}function so(a){let r=V.getBoundingClientRect();return{x:(a.clientX-r.left-U.px)/U.escala,y:(a.clientY-r.top-U.py)/U.escala}}function Aa(a){try{V.setPointerCapture(a.pointerId)}catch{}}function Go(a,r={}){T={tipo:"paneo",x0:a.clientX,y0:a.clientY,px0:U.px,py0:U.py,movido:!1,...r},Aa(a)}V.addEventListener("pointerdown",a=>{if(a.pointerType==="mouse"&&a.button!==0)return;V.focus({preventScroll:!0}),Wo();let r=a.target,d=so(a);if(i)return Go(a);let f=r.closest(".tc-pin");if(f){if(a.preventDefault(),R)return Yi(f.dataset.ref);xn(f.dataset.ref),T={tipo:"pin",ref:f.dataset.ref,x0:a.clientX,y0:a.clientY,movido:!1};return}if(R)return Go(a,{punto:d});let u=r.closest(".tc-asa");if(u)return T={tipo:"asa",cable:n.cables[+u.dataset.i],k:+u.dataset.p,x0:a.clientX,y0:a.clientY,movido:!1},Aa(a);let g=r.closest(".tc-cable-toque");if(g)return Rt({tipo:"cable",cable:n.cables[+g.dataset.i]});let C=r.closest(".tc-comp");if(C&&C.dataset.id!=="placa"){let $=C.dataset.id,w=Do($);if(w.tipo==="pulsador"&&(a.preventDefault(),rt.simulando)){io($,!0),T={tipo:"pulsar",id:$,x0:a.clientX,y0:a.clientY,movido:!1,desde:performance.now()};return}return Rt({tipo:"comp",id:$}),Ie(w)?Go(a):X[w.tipo]&&X[w.tipo].perilla&&a.composedPath().some(Kc)?void 0:(T={tipo:"mover",id:$,dx:d.x-w.x,dy:d.y-w.y,x0:a.clientX,y0:a.clientY,movido:!1},Aa(a))}Rt(null),Go(a)}),V.addEventListener("pointermove",a=>{let r=so(a);if(T&&T.tipo==="pulsar"&&!(a.target.closest&&a.target.closest(`.tc-comp[data-id="${T.id}"]`))){let d=T;T=null,io(d.id,!1,performance.now()-d.desde)}if(T){if(!T.movido&&Math.hypot(a.clientX-T.x0,a.clientY-T.y0)>tn&&(T.movido=!0,k.classList.add("tc-ficha-quieta")),T.movido&&T.tipo==="mover"){let d=Do(T.id),f=Math.round(r.x-T.dx),u=Math.round(r.y-T.dy);if(T.id==="protoboard")for(let g of n.componentes)g.en&&(g.x=it(g.x+f-d.x),g.y=it(g.y+u-d.y),fe(h.get(g.id)));d.x=f,d.y=u,fe(h.get(T.id)),T.id!=="protoboard"&&n.protoboard&&mn(d),Ot()}else if(T.movido&&T.tipo==="paneo")to=!0,U.px=T.px0+a.clientX-T.x0,U.py=T.py0+a.clientY-T.y0,V.classList.add("tc-paneando"),zo();else if(T.movido&&T.tipo==="asa"){let d=Bo(T.cable),f=jo(r,d[T.k]);f=jo(f,d[T.k+2]),T.cable.puntos[T.k]=[f.x,f.y],Ot()}}if(R){let d=a.target.closest&&a.target.closest(".tc-pin");R.cursor=r,R.destino=d&&d.dataset.ref!==R.de?d.dataset.ref:null,De()}(!T||T.tipo==="pin")&&wn(a.target.closest&&a.target.closest(".tc-pin")),rt.simulando&&ds(a.target)});function ds(a){let r=[],d=a&&a.closest&&a.closest(".tc-pin"),f=a&&a.closest&&a.closest(".tc-cable-toque");d?r=[d.dataset.ref]:f&&n.cables[+f.dataset.i]&&(r=[n.cables[+f.dataset.i].de,n.cables[+f.dataset.i].a]);let u=r.join("|");if(u!==ua){ua=u;for(let g of Ui)g(r)}}function ps(a){let r=T;if(T=null,V.classList.remove("tc-paneando"),k.classList.remove("tc-ficha-quieta"),r&&r.movido&&r.tipo==="mover"&&Qi(),!!r){if(r.tipo==="pulsar")return io(r.id,!1,performance.now()-r.desde);if(r.tipo==="mover"&&r.movido){let d=Do(r.id);r.id==="protoboard"?yt("componente_cambiado",{id:"protoboard",x:d.x,y:d.y}):(zi(),(n.protoboard||d.en)&&ma(d),yt("componente_cambiado",{id:r.id,x:d.x,y:d.y,en:d.en?Gt(d.en):null})),mt()}else if(r.tipo==="asa"&&r.movido)mt();else if(r.tipo==="paneo"&&!r.movido&&r.punto&&R)gn(r.punto);else if(r.tipo==="pin"&&r.movido&&R&&a.type==="pointerup"){let d=x.elementFromPoint(a.clientX,a.clientY),f=d&&d.closest(".tc-pin");f&&f.dataset.ref!==r.ref&&Yi(f.dataset.ref)}}}V.addEventListener("pointerup",ps),V.addEventListener("pointercancel",ps),V.addEventListener("pointerleave",()=>{if(Wo(),ua&&ds(null),T&&T.tipo==="pulsar"){let a=T;T=null,io(a.id,!1,performance.now()-a.desde)}}),V.addEventListener("dblclick",a=>{if(i||R)return;let r=x.elementFromPoint(a.clientX,a.clientY)||a.target,d=r.closest(".tc-asa"),f=r.closest(".tc-cable-toque");if(d){let u=n.cables[+d.dataset.i];u.puntos.splice(+d.dataset.p,1),u.puntos.length||delete u.puntos,Ot(),Nt(),mt()}else if(f){let u=n.cables[+f.dataset.i],g=Bo(u),C=so(a),$=0,w=C,N=1/0;for(let H=0;H<g.length-1;H++){let tt=Xc(C,g[H],g[H+1]);To(C,tt)<N&&(N=To(C,tt),$=H,w=tt)}(u.puntos=u.puntos||[]).splice($,0,[it(w.x),it(w.y)]),Rt({tipo:"cable",cable:u}),mt()}}),V.addEventListener("wheel",a=>{a.preventDefault();let r=V.getBoundingClientRect(),d=Math.min(1.5,Math.max(.66,Math.exp(-a.deltaY*.0015)));_a(d,a.clientX-r.left,a.clientY-r.top)},{passive:!1}),m.addEventListener("keydown",a=>{if(a.target.closest&&a.target.closest("select, input"))return;let r=!a.ctrlKey&&!a.metaKey&&!a.altKey,d=!0;a.key==="Escape"?R?ba():Rt(null):i?d=!1:a.key==="Delete"||a.key==="Backspace"?(a.preventDefault(),R?bn():rs()):(a.key==="r"||a.key==="R")&&r?ss():/^[0-9]$/.test(a.key)&&r&&(R||y&&y.tipo==="cable")?Ji(mi[Number(a.key)]):d=!1,d&&a.stopPropagation()});function zo(){zt.style.transform=`translate(${U.px}px, ${U.py}px) scale(${U.escala})`;let a=Gc*U.escala;V.style.backgroundSize=`${a}px ${a}px`,V.style.backgroundPosition=`${U.px}px ${U.py}px`,Wo()}function _a(a,r,d){to=!0,r===void 0&&(r=V.clientWidth/2,d=V.clientHeight/2);let f=Math.min(zc,Math.max(on,U.escala*a)),u=(r-U.px)/U.escala,g=(d-U.py)/U.escala;Object.assign(U,{escala:f,px:r-u*f,py:d-g*f}),zo()}function $a(){let a=1/0,r=1/0,d=-1/0,f=-1/0,u=(g,C)=>{a=Math.min(a,g),r=Math.min(r,C),d=Math.max(d,g),f=Math.max(f,C)};for(let g of h.values()){let C=Mo(g.id);if(!C)continue;let $=(C.rot||0)%180!==0,w=($?g.h:g.w)/2,N=($?g.w:g.h)/2;u(C.x+g.w/2-w,C.y+g.h/2-N),u(C.x+g.w/2+w,C.y+g.h/2+N)}for(let g of n.cables)for(let[C,$]of g.puntos||[])u(C,$);return isFinite(a)?{x0:a,y0:r,x1:d,y1:f}:null}function ro(){let a=V.clientWidth,r=V.clientHeight;if(!a||!r)return!1;let d=$a();if(!d)return!1;let{x0:f,y0:u,x1:g,y1:C}=d,$=48,w=Math.min((a-2*$)/(g-f||1),(r-2*$)/(C-u||1)),N=Math.min(2.4,Math.max(on,w));return Object.assign(U,{escala:N,px:a/2-(f+g)/2*N,py:r/2-(u+C)/2*N}),Io={ancho:a,alto:r},zo(),!0}function An(){let a=$a()||{x0:0,y0:0,x1:100,y1:100},r=12,d=16,f=Math.max(Lc,Math.ceil(a.x1-a.x0+2*r)),u=Math.ceil(a.y1-a.y0+2*r)+d,g=[`<svg xmlns="${Zr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${f}" height="${u}" viewBox="0 0 ${f} ${u}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${f}" height="${u}" fill="#ffffff"/>`,`<g transform="translate(${it(r-a.x0)} ${it(r-a.y0)})">`];for(let C of bt.children){let $=h.get(C.dataset.id);$&&$.lista&&g.push(_n($))}for(let C of n.cables){let $=Bo(C);if(!$)continue;let w=Oi($),N=Mi(C.color),H=tt=>`<circle cx="${tt.x}" cy="${tt.y}" r="2.4" fill="${N}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;g.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${w}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${w}" stroke="${N}" stroke-width="3"/>${H($[0])}${H($[$.length-1])}</g>`)}return g.push("</g>",`<text x="${f-r}" y="${u-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${an(jc)}</text>`,"</svg>"),g.join(`
`)}function _n(a){let r=Mo(a.id);if(!r)return"";let d=r.rot?`translate(${r.x+a.w/2} ${r.y+a.h/2}) rotate(${r.rot}) translate(${-a.w/2} ${-a.h/2})`:`translate(${r.x} ${r.y})`;if(!a.def){let ue=an((K(a.id)||{}).tipo||"");return`<g transform="${d}"><rect width="${a.w}" height="${a.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${a.w/2}" y="${a.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${ue}?</text></g>`}let f=a.el.shadowRoot?a.el.shadowRoot.querySelector("svg"):a.el.tagName&&a.el.tagName.toLowerCase()==="svg"?a.el:null;if(!f)return"";let u=f.cloneNode(!0),g=[],C=document.createTreeWalker(u,NodeFilter.SHOW_COMMENT);for(;C.nextNode();)g.push(C.currentNode);g.forEach(ue=>ue.remove());let $=/--knob-angle:\s*(-?[\d.]+)deg/.exec(u.getAttribute("style")||""),w=u.querySelector("#rotating");$&&w&&w.setAttribute("transform",`rotate(${$[1]} 10 8)`),u.setAttribute("width",it(a.w)),u.setAttribute("height",it(a.h)),u.removeAttribute("id");let N="tc-"+a.id,H=[...new Set([...u.querySelectorAll("[id]")].map(ue=>ue.id))],tt=new XMLSerializer().serializeToString(u);for(let ue of H)tt=Fc(tt,ue,N);tt=tt.replace(/^<svg\b/,`<svg id="${N}"`);let ms=a.el.shadowRoot?Hc(a.el,N,H):"";return`<g transform="${d}">${ms?`<style><![CDATA[
${ms}
]]></style>`:""}${tt}</g>`}function $n(a){let[r,d]=Uo(a);if(r==="placa")return It[o].rotulo(d);if(r==="protoboard")return Er(d);let f=K(r),u=f&&X[f.tipo],g=f&&f.en&&f.en[d]?` \xB7 en el hueco ${f.en[d].slice(11)}`:"";return u?`${u.nombre}: ${u.rotulo(d)}${g}`:d}function wn(a){let r=a?a.dataset.ref:null;if(r===Mt)return;Mt=r,Wi(r);let d=r&&ee(r);if(!d){st.hidden=!0;return}let f=U.py+d.y*U.escala,u=rt.voltajes[r],g=u===void 0?"":u===null?" \xB7 al aire":` \xB7 ${u.toFixed(2).replace(".",",")} V`;st.textContent=$n(r)+g,st.style.left=U.px+d.x*U.escala+"px",st.style.top=f+"px",st.classList.toggle("tc-abajo",f<44),st.hidden=!1}function Wo(){Mt=null,st.hidden=!0,Wi(null)}function Nt(){clearTimeout(Ze),te.classList.remove("tc-aviso");let a=y&&y.tipo==="cable"&&y.cable.puntos&&y.cable.puntos.length;te.textContent=i?"Solo lectura: puedes mover la vista y hacer zoom.":R?R.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":a?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":y&&y.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":y&&Ie(K(y.id))?`Va montada sobre ${It[o].nombre}: no se mueve \xB7 Clic en un borne para empezar un cable \xB7 Supr: quitarla`:y&&y.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":y&&n.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":y?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":rt.simulando&&n.componentes.some(r=>r.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function fs(a,r=2500){Nt(),te.textContent=a,te.classList.add("tc-aviso"),Ze=setTimeout(Nt,r)}function yt(a,r){if(s)try{s({t:Date.now(),origen:"circuito",tipo:a,datos:r})}catch(d){console.error(d)}}function mt(){let a=Gt(n);for(let r of c)try{r(a)}catch(d){console.error(d)}}function hs(a){m.classList.toggle("tc-oscuro",a==="oscuro"),m.classList.toggle("tc-claro",a==="claro")}let Rn={circuito:()=>Gt(n),alCambiar(a){typeof a=="function"&&c.push(a)},ponerPlaca(a){if(a!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:hs,exportarSVG:An,exportarNetlist:a=>Ur(n,a),_alPulsar(a){typeof a=="function"&&Vi.push(a)},_alAcercar(a){typeof a=="function"&&Ui.push(a)},_mostrar(a){let r=rt.simulando;rt={simulando:!!a.simulando,leds:a.leds||{},quemados:a.quemados||[],voltajes:a.voltajes||{},placa:a.placa||{},servos:a.servos||{},piezas:a.piezas||{}},r!==rt.simulando&&(m.classList.toggle("tc-simulando",rt.simulando),rt.simulando||[...ha].forEach(d=>io(d,!1)),Nt()),Mt=null;for(let d of h.values())d.lista&&Fi(d)},destruir(){fa=!0,us.disconnect(),clearTimeout(Ze),c.length=0,h.clear(),P.clear(),l.remove()}};e.tema&&hs(e.tema),i&&m.classList.add("tc-solo-lectura"),zo(),Nt();let us=new ResizeObserver(()=>{if(!Qe||fa)return;if(!pa){pa=ro();return}if(to||!Io)return;let a=(r,d)=>Math.abs(r-d)/Math.max(1,d);(a(V.clientWidth,Io.ancho)>.1||a(V.clientHeight,Io.alto)>.1)&&ro()});us.observe(V);let En=Oo("placa");return i||es(),ko(),Promise.all([En,...n.protoboard?[Bi()]:[],...n.componentes.map(a=>Oo(a.id,a.tipo,a.props))]).then(()=>{fa||(Qe=!0,No(),Ot(),pa=ro(),p.length&&fs(`Se quit\xF3 lo que no va en ${It[o].nombre}: ${p.join(" y ")}.`,1e4))}),Rn}function Wc(t,e,o=[]){let i=t&&typeof t=="object"?Gt(t):{};i.formato=i.formato||1,i.placa=e;let s=new Set;i.componentes=(Array.isArray(i.componentes)?i.componentes:[]).filter(m=>m&&typeof m.id=="string"&&m.id&&m.id!=="placa"&&!m.id.includes(".")&&!s.has(m.id)&&s.add(m.id)),!t&&Yt(e)&&i.componentes.push({id:"exp1",tipo:"shield_nano_io",x:0,y:0,rot:0,props:{}});let c=new Set,p=new Set;i.componentes=i.componentes.filter(m=>{let S=X[m.tipo],v=S?.montada&&(S.placas&&!S.placas.includes(e)||c.has(m.tipo));return S?.montada&&c.add(m.tipo),v&&(p.add(m.id),o.push(S.nombre)),!v});for(let m of i.componentes){m.x=Number(m.x)||0,m.y=Number(m.y)||0,m.rot=Number(m.rot)||0;let S=X[m.tipo]?X[m.tipo].props:{};m.props={...S,...m.props&&typeof m.props=="object"?m.props:{}},X[m.tipo]?.montada&&(delete m.en,m.x=0,m.y=0,m.rot=0)}i.cables=(Array.isArray(i.cables)?i.cables:[]).filter(m=>m&&typeof m.de=="string"&&typeof m.a=="string");let n=Xe(e).pines,l=m=>{let S=m.indexOf("."),v=S>0?m.slice(0,S):m;return p.has(v)||v==="placa"&&!n.includes(m.slice(S+1))},x=i.cables.length;i.cables=i.cables.filter(m=>!l(m.de)&&!l(m.a));let b=x-i.cables.length;b&&o.push(b===1?"1 cable":`${b} cables`);for(let m of i.cables){let S=Array.isArray(m.puntos)&&m.puntos.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite));"puntos"in m&&!S&&delete m.puntos}!i.protoboard||typeof i.protoboard!="object"?i.protoboard=null:(typeof i.protoboard.tipo!="string"&&(i.protoboard.tipo="media"),i.protoboard.x=Number(i.protoboard.x)||0,i.protoboard.y=Number(i.protoboard.y)||0);for(let m of i.componentes){let S=i.protoboard&&m.en&&typeof m.en=="object"&&Object.values(m.en).every(v=>typeof v=="string"&&v.startsWith("protoboard."));"en"in m&&!S&&delete m.en}return i}var cn=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),an=t=>String(t).replace(/[<>&"]/g,e=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[e]);function Fc(t,e,o){let i=cn(e),s=`${o}-${e}`;return t.replace(new RegExp(`(\\s)id="${i}"`,"g"),(c,p)=>`${p}id="${s}"`).replace(new RegExp(`url\\(#${i}\\)`,"g"),()=>`url(#${s})`).replace(new RegExp(`href="#${i}"`,"g"),()=>`href="#${s}"`)}function Hc(t,e,o){let i=t.shadowRoot,s=[...i.adoptedStyleSheets||[]];i.querySelectorAll("style").forEach(p=>p.sheet&&s.push(p.sheet));let c=[];for(let p of s){let n;try{n=p.cssRules}catch{continue}for(let l of n){if(!l.selectorText||!l.style)continue;let x=l.selectorText.split(",").map(m=>m.trim()).filter(m=>!/:host|\binput\b|:focus|\.hide-input/.test(m));if(!x.length)continue;let b=x.map(m=>{let S=m;for(let v of o)S=S.replace(new RegExp(`#${cn(v)}(?![\\w-])`,"g"),()=>`#${e}-${v}`);return/^svg\b/.test(S)?S.replace(/^svg\b/,`#${e}`):`#${e} ${S}`});c.push(`${b.join(", ")} { ${l.style.cssText} }`)}}return c.join(`
`)}function qc(t){let[e,o,i]=[1,3,5].map(s=>parseInt(t.slice(s,s+2),16)/255);return .2126*e+.7152*o+.0722*i>.55?"#1d2733":"#ffffff"}function sn(t){let e=/^([\d.]+)\s*(mm|px)?$/.exec(String(t||"").trim());return e?parseFloat(e[1])*(e[2]==="mm"?96/25.4:1):0}function Oi(t){let e=i=>`${it(i.x)} ${it(i.y)}`,o=`M${e(t[0])}`;for(let i=1;i<t.length-1;i++){let s=t[i-1],c=t[i],p=t[i+1],n=Math.min(5,To(s,c)/2,To(c,p)/2);o+=` L${e(rn(c,s,n))} Q${e(c)} ${e(rn(c,p,n))}`}return`${o} L${e(t[t.length-1])}`}function rn(t,e,o){let i=To(t,e);return i?{x:t.x+(e.x-t.x)*o/i,y:t.y+(e.y-t.y)*o/i}:t}function Xc(t,e,o){let i=o.x-e.x,s=o.y-e.y,c=i*i+s*s,p=c?Math.max(0,Math.min(1,((t.x-e.x)*i+(t.y-e.y)*s)/c)):0;return{x:e.x+p*i,y:e.y+p*s}}function Kc(t){return!t||!t.getAttribute?!1:t.id==="knob"||t.id==="rotating"?!0:t.tagName==="ellipse"&&Number(t.getAttribute("rx"))>5}var ki={0:null,1:0,2:2,3:4,4:2,5:4};function ln(t){let e=new Uint8Array(32768),o=0,i=!1;for(let[s,c]of String(t).split(/\r?\n/).entries()){let p=c.trim();if(!p)continue;if(!/^:([0-9a-f]{2})+$/i.test(p))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${s+1}).`);let n=p.slice(1).match(/../g).map(v=>parseInt(v,16));if(n.reduce((v,_)=>v+_,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let[l,x,b,m]=n;if(n.length!==l+5||!(m in ki)||ki[m]!==null&&l!==ki[m])throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${s+1}).`);let S=n.slice(4,4+l);if(m===0){let v=o+(x<<8|b);if(v+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(S,v)}else if(m===1){i=!0;break}else m===2?o=(S[0]<<8|S[1])<<4:m===4&&(o=(S[0]<<8|S[1])<<16)}if(!i)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(e.buffer)}var Jc=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB","caidaL293D"],Ni='(()=>{function Ke(t,e){let o=t.dataView.getUint16(93,!0);t.data[o]=t.pc&255,t.data[o-1]=t.pc>>8&255,t.pc22Bits&&(t.data[o-2]=t.pc>>16&255),t.dataView.setUint16(93,o-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var ia=256,na=128,pe=class{constructor(e,o=8192){this.progMem=e,this.sramBytes=o,this.data=new Uint8Array(this.sramBytes+ia),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(na),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,o,s=255){let a=this.writeHooks[e];a&&a(o,this.data[e],e,s)||(this.data[e]=o)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:o,flagMask:s,enableRegister:a,enableMask:i}=e;e.inverseFlag?this.data[o]&=~s:this.data[o]|=s,this.data[a]&i&&this.queueInterrupt(e)}updateInterruptEnable(e,o){let{enableMask:s,flagRegister:a,flagMask:i,inverseFlag:n}=e;if(o&s){let r=this.data[a]&i;(n?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:o}=e;this.pendingInterrupts[o]=e,(this.nextInterrupt===-1||this.nextInterrupt>o)&&(this.nextInterrupt=o),o>this.maxInterrupt&&(this.maxInterrupt=o)}clearInterrupt({address:e,flagRegister:o,flagMask:s},a=!0){a&&(this.data[o]&=~s);let{pendingInterrupts:i,maxInterrupt:n}=this;if(i[e]&&(i[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=n;r++)if(i[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,o){let{flagRegister:s,flagMask:a}=e;o&a&&(this.data[s]&=~a,this.clearInterrupt(e))}addClockEvent(e,o){let{clockEventPool:s}=this;o=this.cycles+Math.max(1,o);let a=s.pop(),i=a??{cycles:o,callback:e,next:null};i.cycles=o,i.callback=e;let{nextClockEvent:n}=this,r=null;for(;n&&n.cycles<o;)r=n,n=n.next;return r?(r.next=i,i.next=n):(this.nextClockEvent=i,i.next=n),e}updateClockEvent(e,o){return this.clearClockEvent(e)?(this.addClockEvent(e,o),!0):!1}clearClockEvent(e){let{nextClockEvent:o}=this;if(!o)return!1;let{clockEventPool:s}=this,a=null;for(;o;){if(o.callback===e)return a?a.next=o.next:this.nextClockEvent=o.next,s.length<10&&s.push(o),!0;a=o,o=o.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:o}=this;if(this.interruptsEnabled&&o>=0){let s=this.pendingInterrupts[o];Ke(this,s.address),s.constant||this.clearInterrupt(s)}}};function ue(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Xe(t){let e=t.progMem[t.pc];if((e&64512)===7168){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s+(t.data[95]&1),i=a&255;t.data[(e&496)>>4]=i;let n=t.data[95]&192;n|=i?0:2,n|=128&i?4:0,n|=(i^s)&(o^i)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a&256?1:0,n|=1&(o&s|s&~i|~i&o)?32:0,t.data[95]=n}else if((e&64512)===3072){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o+s&255;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(a^s)&(a^o)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=o+s&256?1:0,i|=1&(o&s|s&~a|~a&o)?32:0,t.data[95]=i}else if((e&65280)===38400){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=s+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(o,a,!0);let i=t.data[95]&224;i|=a?0:2,i|=32768&a?4:0,i|=~s&a&32768?8:0,i|=i>>2&1^i>>3&1?16:0,i|=~a&s&32768?1:0,t.data[95]=i,t.cycles++}else if((e&64512)===8192){let o=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===28672){let o=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65039)===37893){let o=t.data[(e&496)>>4],s=o>>>1|128&o;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let o=e&7,s=(e&496)>>4;t.data[s]=~(1<<o)&t.data[s]|(t.data[95]>>6&1)<<o}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let o=t.data[(e&496)>>4],s=e&7;t.data[95]=t.data[95]&191|(o>>s&1?64:0)}else if((e&65038)===37902){let o=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,s=t.pc+2,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc=o-1,t.cycles+=i?4:3}else if((e&65280)===38912){let o=e&248,s=e&7,a=t.readData((o>>3)+32),i=1<<s;t.writeData((o>>3)+32,a&~i,i)}else if((e&65039)===37888){let o=(e&496)>>4,s=255-t.data[o];t.data[o]=s;let a=t.data[95]&225|1;a|=s?0:2,a|=128&s?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===5120){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=((o^s)&(o^a)&128)!==0?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===1024){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===12288){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s,i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.pc+=s,t.cycles+=s}}else if((e&65039)===37898){let o=t.data[(e&496)>>4],s=o-1;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===128?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(e===38169){let o=t.pc+1,s=t.dataView.getUint16(93,!0),a=t.data[92];t.data[s]=o&255,t.data[s-1]=o>>8&255,t.data[s-2]=o>>16&255,t.dataView.setUint16(93,s-3,!0),t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let o=t.data[92];t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let o=t.data[91];t.data[0]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let o=t.data[91];t.data[(e&496)>>4]=t.progBytes[o<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let o=t.data[91],s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o<<16|s],t.dataView.setUint16(30,s+1,!0),s===65535&&(t.data[91]=(o+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let o=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&65416)===776){let o=t.data[((e&112)>>4)+16],s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setUint16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===896){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.dataView.getInt8((e&7)+16),a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?0:2)|(o*s&32768?1:0),t.cycles++}else if((e&65416)===904){let o=t.dataView.getInt8(((e&112)>>4)+16),s=t.data[(e&7)+16],a=o*s<<1;t.dataView.setInt16(0,a,!0),t.data[95]=t.data[95]&252|(65535&a?2:0)|(o*s&32768?1:0),t.cycles++}else if(e===38153){let o=t.pc+1,s=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[s]=o&255,t.data[s-1]=o>>8&255,a&&(t.data[s-2]=o>>16&255),t.dataView.setUint16(93,s-(a?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=a?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let o=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=o}else if((e&65039)===37891){let o=t.data[(e&496)>>4],s=o+1&255;t.data[(e&496)>>4]=s;let a=t.data[95]&225;a|=s?0:2,a|=128&s?4:0,a|=o===127?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a&255-s),t.data[o]=a}else if((e&65039)===37381){let o=(e&496)>>4,s=t.data[o],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a|s),t.data[o]=a}else if((e&65039)===37383){let o=t.data[(e&496)>>4],s=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o^s),t.data[(e&496)>>4]=s}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let o=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=o,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let o=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(26,o+1,!0)}else if((e&65039)===36878){let o=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let o=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(28,o+1,!0)}else if((e&65039)===36874){let o=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let o=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(o),t.dataView.setUint16(30,o+1,!0)}else if((e&65039)===36866){let o=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,o,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(o)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let o=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[o],t.dataView.setUint16(30,o+1,!0),t.cycles+=2}else if((e&65039)===37894){let o=t.data[(e&496)>>4],s=o>>>1;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=o&1,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let o=2*(e&15),s=2*((e&240)>>4);t.data[s]=t.data[o],t.data[s+1]=t.data[o+1]}else if((e&64512)===39936){let o=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65280)===512){let o=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65416)===768){let o=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(32768&o?1:0),t.cycles++}else if((e&65039)===37889){let o=(e&496)>>4,s=t.data[o],a=0-s;t.data[o]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=a===128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=a?1:0,i|=1&(a|s)?32:0,t.data[95]=i}else if(e!==0){if((e&64512)===10240){let o=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&61440)===24576){let o=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=o;let s=t.data[95]&225;s|=o?0:2,s|=128&o?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let o=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,o,!0),t.data[(e&496)>>4]=t.data[o],t.cycles++}else if((e&65039)===37391){let o=t.dataView.getUint16(93,!0);t.data[o]=t.data[(e&496)>>4],t.dataView.setUint16(93,o-1,!0),t.cycles++}else if((e&61440)===53248){let o=(e&2047)-(e&2048?2048:0),s=t.pc+1,a=t.dataView.getUint16(93,!0),{pc22Bits:i}=t;t.data[a]=255&s,t.data[a-1]=s>>8&255,i&&(t.data[a-2]=s>>16&255),t.dataView.setUint16(93,a-(i?3:2),!0),t.pc+=o,t.cycles+=i?3:2}else if(e===38152){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3}else if(e===38168){let{pc22Bits:o}=t,s=t.dataView.getUint16(93,!0)+(o?3:2);t.dataView.setUint16(93,s,!0),t.pc=(t.data[s-1]<<8)+t.data[s]-1,o&&(t.pc|=t.data[s-2]<<16),t.cycles+=o?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let o=t.data[(e&496)>>4],s=o>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=s;let a=t.data[95]&224;a|=s?0:2,a|=128&s?4:0,a|=1&o?1:0,a|=a>>2&1^a&1?8:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if((e&64512)===2048){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=t.data[95],i=o-s-(a&1);t.data[(e&496)>>4]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&61440)===16384){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=t.data[95],i=o-s-(a&1);t.data[((e&240)>>4)+16]=i,a=a&192|(!i&&a>>1&1?2:0)|(s+(a&1)>o?1:0),a|=128&i?4:0,a|=(o^s)&(o^i)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=1&(~o&s|s&i|i&~o)?32:0,t.data[95]=a}else if((e&65280)===39424){let o=((e&248)>>3)+32,s=1<<(e&7);t.writeData(o,t.readData(o)|s,s),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let s=t.progMem[t.pc+1],a=ue(s)?2:1;t.cycles+=a,t.pc+=a}}else if((e&65280)===38656){let o=2*((e&48)>>4)+24,s=t.dataView.getUint16(o,!0),a=e&15|(e&192)>>2,i=s-a;t.dataView.setUint16(o,i,!0);let n=t.data[95]&192;n|=i?0:2,n|=32768&i?4:0,n|=s&~i&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=a>s?1:0,n|=1&(~s&a|a&i|i&~s)?32:0,t.data[95]=n,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let o=t.progMem[t.pc+1],s=ue(o)?2:1;t.cycles+=s,t.pc+=s}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let o=t.data[(e&496)>>4],s=t.progMem[t.pc+1];t.writeData(s,o),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let o=t.dataView.getUint16(26,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(26,o+1,!0),t.cycles++}else if((e&65039)===37390){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.writeData(s,o),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0);t.writeData(s,o),t.dataView.setUint16(28,s+1,!0),t.cycles++}else if((e&65039)===37386){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let o=t.dataView.getUint16(30,!0);t.writeData(o,t.data[(e&496)>>4]),t.dataView.setUint16(30,o+1,!0),t.cycles++}else if((e&65039)===37378){let o=t.data[(e&496)>>4],s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.writeData(s,o),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let o=t.data[(e&496)>>4],s=t.data[e&15|(e&512)>>5],a=o-s;t.data[(e&496)>>4]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&61440)===20480){let o=t.data[((e&240)>>4)+16],s=e&15|(e&3840)>>4,a=o-s;t.data[((e&240)>>4)+16]=a;let i=t.data[95]&192;i|=a?0:2,i|=128&a?4:0,i|=(o^s)&(o^a)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=s>o?1:0,i|=1&(~o&s|s&a|a&~o)?32:0,t.data[95]=i}else if((e&65039)===37890){let o=(e&496)>>4,s=t.data[o];t.data[o]=(15&s)<<4|(240&s)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let o=(e&496)>>4,s=t.data[o],a=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=s,t.data[o]=a}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var Rt;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(Rt||(Rt={}));var Z;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(Z||(Z={}));var Uo={0:{type:Z.SingleEnded,channel:0},1:{type:Z.SingleEnded,channel:1},2:{type:Z.SingleEnded,channel:2},3:{type:Z.SingleEnded,channel:3},4:{type:Z.SingleEnded,channel:4},5:{type:Z.SingleEnded,channel:5},6:{type:Z.SingleEnded,channel:6},7:{type:Z.SingleEnded,channel:7},8:{type:Z.Temperature},14:{type:Z.Constant,voltage:1.1},15:{type:Z.Constant,voltage:0}},ra={type:Z.Constant,voltage:0},qe={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Uo,adcReferences:[Rt.AREF,Rt.AVCC,Rt.Reserved,Rt.Internal1V1]},ca=7,la=8,fa=16,Oo=64,ze=128,da=31,ha=32,xa=8,pa=8,ua=3,ma=6,me=class{constructor(e,o){this.cpu=e,this.config=o,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=s=>{var a;let i=0;switch(s.type){case Z.Constant:i=s.voltage;break;case Z.SingleEnded:i=(a=this.channelValues[s.channel])!==null&&a!==void 0?a:0;break;case Z.Differential:i=s.gain*((this.channelValues[s.positiveChannel]||0)-(this.channelValues[s.negativeChannel]||0));break;case Z.Temperature:i=.378125;break}let n=i/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(n),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:fa,enableRegister:this.config.ADCSRA,enableMask:la},e.writeHooks[o.ADCSRA]=(s,a)=>{var i;if(s&ze&&!(a&ze)&&(this.conversionCycles=25),e.data[o.ADCSRA]=s,e.updateInterruptEnable(this.ADC,s),!this.converting&&s&Oo){if(!(s&ze))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let n=this.cpu.data[this.config.ADMUX]&da;e.data[o.ADCSRB]&xa&&(n|=32),n&=o.muxInputMask;let r=(i=o.muxChannels[n])!==null&&i!==void 0?i:ra;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:o,ADCH:s,ADMUX:a,ADCSRA:i}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[a]&ha?(this.cpu.data[o]=e<<6&255,this.cpu.data[s]=e>>2):(this.cpu.data[o]=e&255,this.cpu.data[s]=e>>8&3),this.cpu.data[i]&=~Oo,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&ca){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:o,adcReferences:s}=this.config,a=this.cpu.data[o]>>ma&ua;return s.length>4&&this.cpu.data[o]&pa&&(a|=4),(e=s[a])!==null&&e!==void 0?e:Rt.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case Rt.AVCC:return this.avcc;case Rt.AREF:return this.aref;case Rt.Internal1V1:return 1.1;case Rt.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var ga=2,Ca=4,Sa=8,Aa=16,Ra=32,Ki=ga|Ca|Sa|Aa|Ra;var ko={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},No={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Bo={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},jo={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Fo={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var zt={PIN:35,DDR:36,PORT:37,pinChange:Bo,externalInterrupts:[]},Je={PIN:38,DDR:39,PORT:40,pinChange:jo,externalInterrupts:[]},Ot={PIN:41,DDR:42,PORT:43,pinChange:Fo,externalInterrupts:[null,null,ko,No]};var nt;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(nt||(nt={}));var K;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(K||(K={}));var Xt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(Xt||(Xt={}));var ge=class{constructor(e,o){var s,a,i,n;this.cpu=e,this.portConfig=o,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[o.PORT]=this,e.writeHooks[o.DDR]=g=>{let $=e.data[o.PORT];return e.data[o.DDR]=g,this.writeGpio($,g),this.updatePinRegister(g),!0},e.writeHooks[o.PORT]=g=>{let $=e.data[o.DDR];return e.data[o.PORT]=g,this.writeGpio(g,$),this.updatePinRegister($),!0},e.writeHooks[o.PIN]=(g,$,D,C)=>{let T=e.data[o.PORT],S=e.data[o.DDR],y=T^g&C;return e.data[o.PORT]=y,this.writeGpio(y,S),this.updatePinRegister(S),!0};let{externalInterrupts:r}=o;this.externalInts=r.map(g=>g?{address:g.interrupt,flagRegister:g.EIFR,flagMask:1<<g.index,enableRegister:g.EIMSK,enableMask:1<<g.index}:null);let h=new Set(r.map(g=>g?.EICR));for(let g of h)this.attachInterruptHook(g||0);let p=(a=(s=r.find(g=>g&&g.EIMSK))===null||s===void 0?void 0:s.EIMSK)!==null&&a!==void 0?a:0;this.attachInterruptHook(p,"mask");let u=(n=(i=r.find(g=>g&&g.EIFR))===null||i===void 0?void 0:i.EIFR)!==null&&n!==void 0?n:0;this.attachInterruptHook(u,"flag");let{pinChange:b}=o;if(this.PCINT=b?{address:b.pinChangeInterrupt,flagRegister:b.PCIFR,flagMask:1<<b.PCIE,enableRegister:b.PCICR,enableMask:1<<b.PCIE}:null,b){let{PCIFR:g,PCMSK:$}=b;e.writeHooks[g]=D=>{for(let C of this.cpu.gpioPorts){let{PCINT:T}=C;T&&e.clearInterruptByFlag(T,D)}return!0},e.writeHooks[$]=D=>{e.data[$]=D;for(let C of this.cpu.gpioPorts){let{PCINT:T}=C;T&&e.updateInterruptEnable(T,D)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(o=>o!==e)}pinState(e){let o=this.cpu.data[this.portConfig.DDR],s=this.cpu.data[this.portConfig.PORT],a=1<<e,i=s&a?nt.InputPullUp:nt.Input,n=this.openCollector&a?i:nt.High;return o&a?this.lastValue&a?n:nt.Low:i}setPin(e,o){let s=1<<e;this.pinValue&=~s,o&&(this.pinValue|=s),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,o){let{cpu:s,portConfig:a}=this,i=1<<e;if(o===K.None)this.overrideMask|=i,this.overrideValue&=~i;else switch(this.overrideMask&=~i,o){case K.Enable:this.overrideValue&=~i,this.overrideValue|=s.data[a.PORT]&i;break;case K.Set:this.overrideValue|=i;break;case K.Clear:this.overrideValue&=~i;break;case K.Toggle:this.overrideValue^=i;break}let n=s.data[a.DDR];this.writeGpio(s.data[a.PORT],n),this.updatePinRegister(n)}updatePinRegister(e){var o,s;let a=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=a,this.lastPin!==a){for(let i=0;i<8;i++)if((a&1<<i)!==(this.lastPin&1<<i)){let n=!!(a&1<<i);this.toggleInterrupt(i,n),(s=(o=this.externalClockListeners)[i])===null||s===void 0||s.call(o,n)}this.lastPin=a}}toggleInterrupt(e,o){let{cpu:s,portConfig:a,externalInts:i,PCINT:n}=this,{externalInterrupts:r,pinChange:h}=a,p=r[e],u=i[e];if(u&&p){let{EIMSK:b,index:g,EICR:$,iscOffset:D}=p;if(s.data[b]&1<<g){let C=s.data[$]>>D&3,T=!1;switch(u.constant=!1,C){case Xt.LowLevel:T=!o,u.constant=!0;break;case Xt.Change:T=!0;break;case Xt.FallingEdge:T=!o;break;case Xt.RisingEdge:T=o;break}T?s.setInterruptFlag(u):u.constant&&s.clearInterrupt(u,!0)}}if(h&&n&&h.mask&1<<e){let{PCMSK:b}=h;s.data[b]&1<<e+h.offset&&s.setInterruptFlag(n)}}attachInterruptHook(e,o="other"){if(!e)return;let{cpu:s}=this;s.writeHooks[e]=a=>{o!=="flag"&&(s.data[e]=a);for(let i of s.gpioPorts){for(let n of i.externalInts)n&&o==="mask"&&s.updateInterruptEnable(n,a),n&&!n.constant&&o==="flag"&&s.clearInterruptByFlag(n,a);i.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:o}=this.portConfig;for(let s=0;s<8;s++){let a=o[s];if(!a)continue;let i=!!(this.lastPin&1<<s),{EIFR:n,EIMSK:r,index:h,EICR:p,iscOffset:u,interrupt:b}=a;if(!(e.data[r]&1<<h)||i)continue;(e.data[p]>>u&3)===Xt.LowLevel&&e.queueInterrupt({address:b,flagRegister:n,flagMask:1<<h,enableRegister:r,enableMask:1<<h,constant:!0})}}writeGpio(e,o){let s=(e&this.overrideMask|this.overrideValue)&o|e&~o,a=this.lastValue;if(s!==a||o!==this.lastDdr){this.lastValue=s,this.lastDdr=o;for(let i of this.listeners)i(s,a)}}};var Lo={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Ce;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Ce||(Ce={}));var Qe={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Ye=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:Lo,compPortA:Ot.PORT,compPinA:6,compPortB:Ot.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:4},Qe),to=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:Lo,compPortA:zt.PORT,compPinA:1,compPortB:zt.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:Ot.PORT,externalClockPin:5},Qe),eo=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:zt.PORT,compPinA:3,compPortB:Ot.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},Qe),oe;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(oe||(oe={}));var X;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(X||(X={}));var B;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(B||(B={}));var Ut=1,ee=2,qt=1,{Normal:oo,PWMPhaseCorrect:$t,CTC:Ve,FastPWM:Et,Reserved:Ze,PWMPhaseFrequencyCorrect:Se}=oe,ba=[[oo,255,B.Immediate,X.Max,0],[$t,255,B.Top,X.Bottom,0],[Ve,Ut,B.Immediate,X.Max,0],[Et,255,B.Bottom,X.Max,0],[Ze,255,B.Immediate,X.Max,0],[$t,Ut,B.Top,X.Bottom,qt],[Ze,255,B.Immediate,X.Max,0],[Et,Ut,B.Bottom,X.Top,qt]],Ia=[[oo,65535,B.Immediate,X.Max,0],[$t,255,B.Top,X.Bottom,0],[$t,511,B.Top,X.Bottom,0],[$t,1023,B.Top,X.Bottom,0],[Ve,Ut,B.Immediate,X.Max,0],[Et,255,B.Bottom,X.Top,0],[Et,511,B.Bottom,X.Top,0],[Et,1023,B.Bottom,X.Top,0],[Se,ee,B.Bottom,X.Bottom,0],[Se,Ut,B.Bottom,X.Bottom,qt],[$t,ee,B.Top,X.Bottom,0],[$t,Ut,B.Top,X.Bottom,qt],[Ve,ee,B.Immediate,X.Max,0],[Ze,65535,B.Immediate,X.Max,0],[Et,ee,B.Bottom,X.Top,qt],[Et,Ut,B.Bottom,X.Top,qt]];function Ta(t){switch(t){case 1:return K.Toggle;case 2:return K.Clear;case 3:return K.Set;default:return K.Enable}}var Wo=128,Go=64,Ma=32,Ae=class{constructor(e,o){if(this.cpu=e,this.config=o,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=B.Immediate,this.tovUpdateMode=X.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(s=!0,a=!1)=>{let{divider:i,lastCycle:n,cpu:r}=this,{cycles:h}=r,p=h-n;if(i&&p>=i||a){let u=a?1:Math.floor(p/i);this.lastCycle+=u*i;let b=this.tcnt,{timerMode:g,TOP:$}=this,D=g===$t||g===Se,C=D?this.phasePwmCount(b,u):(b+u)%($+1),T=b+u>$;if(this.tcntUpdated||(this.tcnt=C,D||this.timerUpdated(C,b)),!D){if(g===Et&&T){let{compA:S,compB:y}=this;S&&this.updateCompPin(S,"A",!0),y&&this.updateCompPin(y,"B",!0)}this.ocrUpdateMode==B.Bottom&&T&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),T&&(this.tovUpdateMode==X.Top||$===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===B.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===B.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:u}=this,{externalClockPin:b}=this.config,g=this.config.dividers[u];this.lastCycle=g?this.cpu.cycles:0,this.updateDivider=!1,this.divider=g,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[b]=null),g?r.addClockEvent(this.count,this.lastCycle+g-r.cycles):this.externalClockPort&&(u===Ce.FallingEdge||u===Ce.RisingEdge)&&(this.externalClockPort.externalClockListeners[b]=this.externalClockCallback,this.externalClockRisingEdge=u===Ce.RisingEdge);return}s&&i&&r.addClockEvent(this.count,this.lastCycle+i-r.cycles)},this.externalClockCallback=s=>{s===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[o.TCNT]=s=>(this.count(!1),this.config.bits===16&&(this.cpu.data[s+1]=this.tcnt>>8),this.cpu.data[s]=this.tcnt&255),this.cpu.writeHooks[o.TCNT]=s=>{this.tcntNext=this.highByteTemp<<8|s,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[o.OCRA]=s=>{this.nextOcrA=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[o.OCRB]=s=>{this.nextOcrB=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[o.OCRC]=s=>{this.nextOcrC=this.highByteTemp<<8|s,this.ocrUpdateMode===B.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[o.ICR]=i=>{this.icr=this.highByteTemp<<8|i};let s=i=>{this.highByteTemp=i},a=(i,n,r)=>(this.highByteTemp=i&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[o.TCNT+1]=s,this.cpu.writeHooks[o.OCRA+1]=a,this.cpu.writeHooks[o.OCRB+1]=a,this.hasOCRC&&(this.cpu.writeHooks[o.OCRC+1]=a),this.cpu.writeHooks[o.ICR+1]=s}e.writeHooks[o.TCCRA]=s=>(this.cpu.data[o.TCCRA]=s,this.updateWGMConfig(),!0),e.writeHooks[o.TCCRB]=s=>(o.TCCRC||(this.checkForceCompare(s),s&=~(Wo|Go)),this.cpu.data[o.TCCRB]=s,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),o.TCCRC&&(e.writeHooks[o.TCCRC]=s=>{this.checkForceCompare(s)}),e.writeHooks[o.TIFR]=s=>(this.cpu.data[o.TIFR]=s,this.cpu.clearInterruptByFlag(this.OVF,s),this.cpu.clearInterruptByFlag(this.OCFA,s),this.cpu.clearInterruptByFlag(this.OCFB,s),!0),e.writeHooks[o.TIMSK]=s=>{this.cpu.updateInterruptEnable(this.OVF,s),this.cpu.updateInterruptEnable(this.OCFA,s),this.cpu.updateInterruptEnable(this.OCFB,s)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case Ut:return this.ocrA;case ee:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case Ut:case ee:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:o}=this,s=e.bits===16?Ia:ba,a=this.cpu.data[e.TCCRA],[i,n,r,h,p]=s[o];this.timerMode=i,this.topValue=n,this.ocrUpdateMode=r,this.tovUpdateMode=h;let u=i===Et||i===$t||i===Se,b=this.compA;this.compA=a>>6&3,this.compA===1&&u&&!(p&qt)&&(this.compA=0),!!b!=!!this.compA&&this.updateCompA(this.compA?K.Enable:K.None);let g=this.compB;if(this.compB=a>>4&3,this.compB===1&&u&&(this.compB=0),!!g!=!!this.compB&&this.updateCompB(this.compB?K.Enable:K.None),this.hasOCRC){let $=this.compC;this.compC=a>>2&3,this.compC===1&&u&&(this.compC=0),!!$!=!!this.compC&&this.updateCompC(this.compC?K.Enable:K.None)}}phasePwmCount(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n,TOP:r,MAX:h,tcntUpdated:p}=this;for(!e&&!r&&(o=0,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));o>0;)this.countingUp?(e++,e===r&&!p&&(this.countingUp=!1,this.ocrUpdateMode===B.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!p&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===B.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),p||(e===s&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===a&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&e===i&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),o--;return e&h}timerUpdated(e,o){let{ocrA:s,ocrB:a,ocrC:i,hasOCRC:n}=this,r=o>e;((o<s||r)&&e>=s||o<s&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((o<a||r)&&e>=a||o<a&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),n&&((o<i||r)&&e>=i||o<i&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==oe.FastPWM||this.timerMode==oe.PWMPhaseCorrect||this.timerMode==oe.PWMPhaseFrequencyCorrect||(e&Wo&&this.updateCompPin(this.compA,"A"),e&Go&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Ma&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,o,s=!1){let a=K.None,i=e===3,n=this.countingUp===i;switch(this.timerMode){case oo:case Ve:a=Ta(e);break;case Et:e===1?a=s?K.None:K.Toggle:a=i!==s?K.Set:K.Clear;break;case $t:case Se:e===1?a=K.Toggle:a=n?K.Set:K.Clear;break}a!==K.None&&(o==="A"?this.updateCompA(a):o==="B"?this.updateCompB(a):this.updateCompC(a))}updateCompA(e){let{compPortA:o,compPinA:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompB(e){let{compPortB:o,compPinB:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}updateCompC(e){let{compPortC:o,compPinC:s}=this.config,a=this.cpu.gpioByPort[o];a?.timerOverridePin(s,e)}};var ao={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},wa=128,_a=64,Ho=32;var so=2,ya=1,Ko=so,$a=128,Ea=64,Da=32,Oe=16,Ue=8,Jo=4;var Xo=Jo|Oe|Ue;var Pa=32,va=16,Va=8,zo=4,qo=2;var Oa={5:31,6:63,7:127,8:255,9:255},Re=class{constructor(e,o,s){this.cpu=e,this.config=o,this.freqHz=s,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:wa,enableRegister:this.config.UCSRB,enableMask:$a,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Ho,enableRegister:this.config.UCSRB,enableMask:Da},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:_a,enableRegister:this.config.UCSRB,enableMask:Ea},this.reset(),this.cpu.writeHooks[o.UCSRA]=(a,i)=>{var n;return e.data[o.UCSRA]=a&(ya|so),e.clearInterruptByFlag(this.TXC,a),(a&Ko)!==(i&Ko)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRB]=(a,i)=>{var n;return e.updateInterruptEnable(this.RXC,a),e.updateInterruptEnable(this.UDRE,a),e.updateInterruptEnable(this.TXC,a),a&Oe&&i&Oe&&e.clearInterrupt(this.RXC),a&Ue&&!(i&Ue)&&e.setInterruptFlag(this.UDRE),e.data[o.UCSRB]=a,(a&Xo)!==(i&Xo)&&((n=this.onConfigurationChange)===null||n===void 0||n.call(this)),!0},this.cpu.writeHooks[o.UCSRC]=a=>{var i;return e.data[o.UCSRC]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.readHooks[o.UDR]=()=>{var a;let i=(a=Oa[this.bitsPerChar])!==null&&a!==void 0?a:255,n=this.rxByte&i;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),n},this.cpu.writeHooks[o.UDR]=a=>{if(this.onByteTransmit&&this.onByteTransmit(a),this.onLineTransmit){let i=String.fromCharCode(a);i===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=i}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[o.UBRRH]=a=>{var i;return this.cpu.data[o.UBRRH]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0},this.cpu.writeHooks[o.UBRRL]=a=>{var i;return this.cpu.data[o.UBRRL]=a,(i=this.onConfigurationChange)===null||i===void 0||i.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Ho,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=zo|qo,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,o=!1){var s;let{cpu:a}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(o)this.rxByte=e,a.setInterruptFlag(this.RXC),(s=this.onRxComplete)===null||s===void 0||s.call(this);else return this.rxBusyValue=!0,a.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:o}=this.config;return this.cpu.data[e]<<8|this.cpu.data[o]}get multiplier(){return this.cpu.data[this.config.UCSRA]&so?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Oe)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Ue)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(zo|qo))>>1|this.cpu.data[this.config.UCSRB]&Jo){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&Va?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Pa)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&va)}};var io={0:null,1:0,2:2,3:4,4:2,5:4};function Zo(t){let e=new Uint8Array(32768),o=0,s=!1;for(let[a,i]of String(t).split(/\\r?\\n/).entries()){let n=i.trim();if(!n)continue;if(!/^:([0-9a-f]{2})+$/i.test(n))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${a+1}).`);let r=n.slice(1).match(/../g).map($=>parseInt($,16));if(r.reduce(($,D)=>$+D,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let[h,p,u,b]=r;if(r.length!==h+5||!(b in io)||io[b]!==null&&h!==io[b])throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${a+1}).`);let g=r.slice(4,4+h);if(b===0){let $=o+(p<<8|u);if($+h>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(g,$)}else if(b===1){s=!0;break}else b===2?o=(g[0]<<8|g[1])<<4:b===4&&(o=(g[0]<<8|g[1])<<16)}if(!s)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var Tt=16e6,Qo=Tt/1e3,Ua=Xe,ka=[[Ot,["D0","D1","D2","D3","D4","D5","D6","D7"]],[zt,["D8","D9","D10","D11","D12","D13"]],[Je,["A0","A1","A2","A3","A4","A5"]]],bt=Object.freeze({...nt});function Yo(t){let e=new pe(Zo(t));[Ye,to,eo].forEach(C=>new Ae(e,C));let o=new Re(e,ao,Tt),s=new me(e,qe),a=ka.map(([C,T])=>[new ge(e,C),T]),i={};for(let[C,T]of a)T.forEach((S,y)=>i[S]=[C,y]);let n=null;s.onADCRead=C=>{let T=0;if(C.type===Z.SingleEnded){let J=s.channelValues[C.channel]||0;T=n?n(C.channel,J):J}else C.type===Z.Constant?T=C.voltage:C.type===Z.Temperature&&(T=.378125);let S=Math.round(T*1e6)/1e6,y=Math.min(1023,Math.max(0,Math.floor(S/s.referenceVoltage*1024)));e.addClockEvent(()=>s.completeADCRead(y),s.sampleCycles)};let r=[],h=[],p=[],u=[],b=g();function g(){let C={};for(let[T,S]of a)S.forEach((y,J)=>C[y]=T.pinState(J));return C}for(let[C,T]of a)C.addListener(()=>{let S=null;for(let y=0;y<T.length;y++){let J=C.pinState(y);J!==b[T[y]]&&((S||(S={}))[T[y]]=J,b[T[y]]=J)}if(S)for(let y of h)y(S,b)});o.onByteTransmit=C=>p.forEach(T=>T(C));let $=Qo;function D(C){let T=e.cycles+C;for(;e.cycles<T;){let S=Math.min(T,$);for(;e.cycles<S;)Ua(e),e.tick();if(e.cycles<$)break;$+=Qo,u.length&&!o.rxBusy&&(o.writeByte(u[0]),u.shift());for(let y of r)y()}}return{correr:D,estados:g,get ciclos(){return e.cycles},alCambiarPines:C=>h.push(C),alByteSerial:C=>p.push(C),enviarSerial:C=>u.push(...new TextEncoder().encode(C)),ponerAnalogico:(C,T)=>s.channelValues[C]=Math.max(0,Math.min(5,T)),ponerVoltajeReferencia:C=>s.avcc=Math.max(.001,Number(C)||0),ponerLectorAnalogico:C=>n=C,ponerEntrada(C,T){let S=i[C];S&&S[0].setPin(S[1],!!T)},alCadaMs:C=>r.push(C)}}var Na=["a","b","c","d","e"],Ba=["f","g","h","i","j"],no={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ja=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],ts={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ro=t=>14.4+(t-1)*9.6,Fa=t=>t>=2&&(t-1)%6!==0,co=new Map;function fo(t="media"){if(co.has(t))return co.get(t);let e=ts[t]||ts.media,o=[];co.set(t,o);for(let s=1;s<=e.columnas;s++){for(let a of Na)o.push({nombre:a+s,x:ro(s),y:no[a],tira:"arriba"+s});for(let a of Ba)o.push({nombre:a+s,x:ro(s),y:no[a],tira:"abajo"+s});for(let[a]of ja)Fa(s)&&o.push({nombre:a+s,x:ro(s),y:no[a],tira:a})}return o}var lo=new Map;function es(t="media"){if(lo.has(t))return lo.get(t);let e=new Map;lo.set(t,e);for(let o of fo(t))e.has(o.tira)||e.set(o.tira,[]),e.get(o.tira).push(o.nombre);return e}var se=3.779527559055118,Wa={ancho:72.58*se,alto:53.34*se},Ga=4*se,os=5*se;var be=Ga+4.6*se,Ie=Wa.ancho-.5-4.6*se,La=60,Dt=(t,e)=>({x:t,y:La+e*os}),Hn={M1A:Dt(be,0),M1B:Dt(be,1),GND_IZQ:Dt(be,2),M2A:Dt(be,3),M2B:Dt(be,4),M4A:Dt(Ie,0),M4B:Dt(Ie,1),GND_DER:Dt(Ie,2),M3A:Dt(Ie,3),M3B:Dt(Ie,4),EXT_POS:{x:86,y:176},EXT_GND:{x:86+os,y:176},S2_SIG:{x:26,y:14},S2_POS:{x:35.6,y:14},S2_GND:{x:45.2,y:14},S1_SIG:{x:26,y:24},S1_POS:{x:35.6,y:24},S1_GND:{x:45.2,y:24}};var ss={datos:"D8",reloj:"D4",cierre:"D12",habilita:"D7",pwm:{1:"D11",2:"D3",3:"D6",4:"D5"},bits:{1:{A:2,B:3},2:{A:1,B:4},3:{A:5,B:7},4:{A:0,B:6}}},as=[["S1_SIG","placa.D10"],["S2_SIG","placa.D9"],["S1_POS","placa.5V"],["S2_POS","placa.5V"],["S1_GND","placa.GND1"],["S2_GND","placa.GND1"],["GND_IZQ","placa.GND1"],["GND_DER","placa.GND1"],["EXT_GND","placa.GND1"]];var ae=3.779527559055118,ke=9.6,ie={ancho:58*ae,alto:54*ae},Xn={x:(ie.ancho-45*ae)/2,y:(ie.alto-18*ae)/2,ancho:45*ae,alto:18*ae},Ha=(ie.ancho-14*ke)/2,is=(ie.alto-6*ke)/2,Ka=is+6*ke,Xa=[{y:is,nombres:["D12","D11","D10","D9","D8","D7","D6","D5","D4","D3","D2","GND2","RESET2","D0","D1"]},{y:Ka,nombres:["D13","3V3","AREF","A0","A1","A2","A3","A4","A5","A6","A7","5V","RESET","GND1","VIN"]}],zn=Object.fromEntries(Xa.flatMap(({y:t,nombres:e})=>e.map((o,s)=>[o,{x:Ha+s*ke,y:t}])));var Zn={...ie};var za=Array.from({length:14},(t,e)=>`D${13-e}`),qa=Array.from({length:8},(t,e)=>`A${e}`),ho=[...za,...qa],Ja=["I2C_SDA","I2C_SCL","I2C_V","I2C_G","UART_TX","UART_RX","UART_V","UART_G","OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"],Qn=[...ho.flatMap(t=>["S","V","G"].map(e=>`${t}_${e}`)),...Ja],Yn=Object.freeze({SPI_MISO:"D12",SPI_MOSI:"D11",SPI_SCK:"D13",SPI_SS:"D10",SPI_V:"5V",SPI_G:"GND1"}),ns=[...ho.flatMap(t=>[[`${t}_S`,`placa.${t}`],[`${t}_V`,"placa.5V"],[`${t}_G`,"placa.GND1"]]),["I2C_SDA","placa.A4"],["I2C_SCL","placa.A5"],["I2C_V","placa.5V"],["I2C_G","placa.GND1"],["SPI_MISO","placa.D12"],["SPI_MOSI","placa.D11"],["SPI_SCK","placa.D13"],["SPI_SS","placa.D10"],["SPI_V","placa.5V"],["SPI_G","placa.GND1"],["UART_TX","placa.D1"],["UART_RX","placa.D0"],["UART_V","placa.5V"],["UART_G","placa.GND1"],["OUT_5V","placa.5V"],["GND_OUT","placa.GND1"],["JACK_GND","placa.GND1"],["OUT_5V_2","placa.5V"],["GND_OUT_2","placa.GND1"],["OUT_3V3_2","OUT_3V3"]],tr=Object.fromEntries([...ho.flatMap(t=>[[`${t}_S`,`${t} \\xB7 se\\xF1al${t==="A6"||t==="A7"?" (solo entrada anal\\xF3gica)":` (mismo ${t} del Nano)`}`],[`${t}_V`,`${t} \\xB7 V: alimentaci\\xF3n de 5V (+)`],[`${t}_G`,`${t} \\xB7 G: tierra (\\u2212)`]]),["I2C_SDA","I2C \\xB7 SDA: datos (mismo A4 del Nano)"],["I2C_SCL","I2C \\xB7 SCL: reloj (mismo A5 del Nano)"],["I2C_V","I2C \\xB7 alimentaci\\xF3n de 5V (+)"],["I2C_G","I2C \\xB7 tierra (\\u2212)"],["SPI_MISO","SPI \\xB7 MISO: datos hacia el Nano (D12)"],["SPI_MOSI","SPI \\xB7 MOSI: datos desde el Nano (D11)"],["SPI_SCK","SPI \\xB7 SCK: reloj (D13)"],["SPI_SS","SPI \\xB7 SS: selecci\\xF3n (D10)"],["SPI_V","SPI \\xB7 alimentaci\\xF3n de 5V (+)"],["SPI_G","SPI \\xB7 tierra (\\u2212)"],["UART_TX","UART \\xB7 TX: datos desde el Nano (D1)"],["UART_RX","UART \\xB7 RX: datos hacia el Nano (D0)"],["UART_V","UART \\xB7 alimentaci\\xF3n de 5V (+)"],["UART_G","UART \\xB7 tierra (\\u2212)"],["OUT_5V","5V \\xB7 salida de alimentaci\\xF3n de la expansi\\xF3n (+)"],["OUT_5V_2","5V \\xB7 segundo contacto de la misma salida (+)"],["OUT_3V3","3,3V \\xB7 salida regulada de la expansi\\xF3n (+), separada del 3V3 del Nano"],["OUT_3V3_2","3,3V \\xB7 segundo contacto de la misma salida regulada (+)"],["GND_OUT","GND \\xB7 tierra de las salidas (\\u2212)"],["GND_OUT_2","GND \\xB7 segundo contacto de tierra de las salidas (\\u2212)"],["JACK_POS","Jack + \\xB7 entrada de la expansi\\xF3n (modelo: positivo en el centro; comprobar en el kit)"],["JACK_GND","Jack GND \\xB7 tierra de la entrada (modelo: contacto exterior; comprobar en el kit)"]]);var Ne=Object.freeze([...Array.from({length:14},(t,e)=>"D"+e),...Array.from({length:6},(t,e)=>"A"+e)]),cs=Object.freeze([["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Za=Object.freeze([["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]].map(Object.freeze)),Qa=Object.freeze([["GND1","GND2"],["RESET","RESET2"],["A4","SDA"],["A5","SCL"],["D12","MISO"],["D11","MOSI"],["D13","SCK"],["D10","SS"]].map(Object.freeze)),Ya=Object.freeze([...cs,Object.freeze(["A6"]),Object.freeze(["A7"])]),rs=Object.freeze([...Ne,"A6","A7","GND1","GND2","RESET","RESET2","5V","3V3","VIN","AREF"]),ti=Object.freeze({nombre:"Arduino Uno R3",pinesDigitales:Ne,analogicos:cs,puentes:Za,gnd:Object.freeze(["GND1","GND2","GND3"]),pines:Object.freeze([...Ne,"GND1","GND2","GND3","5V","3V3","VIN","RESET","AREF","IOREF","SDA","SCL"])}),ei=Object.freeze({nombre:"Arduino Nano cl\\xE1sico",pinesDigitales:Ne,analogicos:Ya,puentes:Qa,gnd:Object.freeze(["GND1","GND2"]),pinesModulo:rs,pines:Object.freeze([...rs,"SDA","SCL","MISO","MOSI","SCK","SS"])}),kt=t=>t==="nano"||t==="nano_old",Lt=t=>kt(t)?ei:ti;function Nt(t,{presionados:e=new Set,conduccion:o=!1,balanceInterno:s=!0}={}){let a=new Map,i=r=>{for(a.has(r)||a.set(r,r);a.get(r)!==r;)a.set(r,a.get(a.get(r))),r=a.get(r);return r},n=(r,h)=>a.set(i(r),i(h));for(let r of Lt(t.placa).puentes)r.forEach(h=>n("placa."+r[0],"placa."+h));for(let r of t.cables)n(r.de,r.a);if(t.protoboard){for(let r of es(t.protoboard.tipo).values())r.forEach(h=>n("protoboard."+r[0],"protoboard."+h));for(let r of t.componentes)if(r.en)for(let[h,p]of Object.entries(r.en))n(r.id+"."+h,p)}for(let r of t.componentes)if(r.tipo==="shield_nano_io"&&kt(t.placa))for(let[h,p]of ns)n(r.id+"."+h,p.startsWith("placa.")?p:r.id+"."+p);else if(r.tipo==="shield_l293d"){for(let[h,p]of as)n(r.id+"."+h,p);(!r.props||r.props.puentePWR!==!1)&&n(r.id+".EXT_POS","placa.VIN")}else r.tipo==="bateria_lipo"&&s?(n(r.id+".BAL0",r.id+".NEG"),n(r.id+".BAL2",r.id+".POS")):r.tipo==="pulsador"?(n(r.id+".1i",r.id+".1d"),n(r.id+".2i",r.id+".2d"),e.has(r.id)&&n(r.id+".1i",r.id+".2i")):o&&r.tipo==="resistencia"?n(r.id+".1",r.id+".2"):o&&r.tipo==="potenciometro"&&(n(r.id+".GND",r.id+".SIG"),n(r.id+".SIG",r.id+".VCC"));return i}function po(t,e,o,s){e>=0&&(t[e][e]+=s),o>=0&&(t[o][o]+=s),e>=0&&o>=0&&(t[e][o]-=s,t[o][e]-=s)}function xo(t,e,o){e>=0&&(t[e]+=o)}var Jt=(t,e)=>e>=0?t[e]:0;function Te(t,e,o){return{a:t,b:e,g:1/o,sellar(s){po(s,this.a,this.b,this.g)},corriente(s){return(Jt(s,this.a)-Jt(s,this.b))*this.g}}}function ls(t){return{nodo:t,v:0,g:0,sellar(e,o){po(e,this.nodo,-1,this.g),xo(o,this.nodo,this.v*this.g)},corriente(e){return(this.v-Jt(e,this.nodo))*this.g}}}function fs(t,e){return{nodo:t,v:e,fila:-1,sellar(o,s){o[this.nodo][this.fila]+=1,o[this.fila][this.nodo]+=1,s[this.fila]+=this.v},corriente(o){return-o[this.fila]}}}function ds(t,e,{Is:o,n:s}){let a=s*.025693,i=a*Math.log(a/(Math.SQRT2*o));return{a:t,k:e,noLineal:!0,vd:0,sellar(n,r){let h=Math.exp(this.vd/a),p=o*(h-1),u=o*h/a+1e-12,b=p-u*this.vd;po(n,this.a,this.k,u),xo(r,this.a,-b),xo(r,this.k,b)},actualizar(n){let r=Jt(n,this.a)-Jt(n,this.k),h=Math.abs(r-this.vd);return this.vd=oi(r,this.vd,a,i),h},corriente(n){let r=Jt(n,this.a)-Jt(n,this.k);return o*Math.expm1(r/a)}}}function oi(t,e,o,s){if(t>s&&Math.abs(t-e)>2*o){if(e>0){let a=1+(t-e)/o;return a>0?e+o*Math.log(a):s}return o*Math.log(t/o)}return t}function hs(t,{maxIter:e=200,tolerancia:o=1e-9}={}){let s=t.nodos+t.fuentes,a=t.elementos.filter(n=>n.noLineal),i=new Float64Array(s);for(let n=1;n<=e;n++){let r=Array.from({length:s},()=>new Float64Array(s)),h=new Float64Array(s);for(let u of t.elementos)u.sellar(r,h);for(let u=0;u<t.nodos;u++)r[u][u]+=1e-12;if(i=si(r,h),!a.length)return{x:i,iteraciones:n,convergio:!0};let p=0;for(let u of a)p=Math.max(p,u.actualizar(i));if(p<o)return{x:i,iteraciones:n,convergio:!0}}return{x:i,iteraciones:e,convergio:!1}}function si(t,e){let o=e.length;for(let a=0;a<o;a++){let i=a;for(let n=a+1;n<o;n++)Math.abs(t[n][a])>Math.abs(t[i][a])&&(i=n);if(Math.abs(t[i][a])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[a],t[i]]=[t[i],t[a]],[e[a],e[i]]=[e[i],e[a]];for(let n=a+1;n<o;n++){let r=t[n][a]/t[a][a];if(r){for(let h=a;h<o;h++)t[n][h]-=r*t[a][h];e[n]-=r*e[a]}}}let s=new Float64Array(o);for(let a=o-1;a>=0;a--){let i=e[a];for(let n=a+1;n<o;n++)i-=t[a][n]*s[n];s[a]=i/t[a][a]}return s}var Ht={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40,chipMaxmA:200},pt={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},ii=.25,xs={minimo:1};function ni(t){let o=(pt.vf[t]||pt.vf.rojo)-pt.iRef*pt.rs;return{Is:pt.iRef/Math.expm1(o/(pt.n*.025693)),n:pt.n}}var ps={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function us(t,{quemados:e=new Set,presionados:o=new Set,alimentacion:s={},fuentesExtra:a=[]}={}){let i=Lt(t.placa),n=kt(t.placa),r=i.pinesDigitales,h=i.analogicos.map(f=>f[0]).filter(f=>!r.includes(f)),p=s["5V"]??Ht.voltios,u=Nt(t,{presionados:o}),b=Nt(t,{presionados:o,conduccion:!0}),g=u("placa.GND1"),$=new Map,D=0,C=f=>{let A=u(f);return A===g?-1:($.has(A)||$.set(A,D++),$.get(A))},T=f=>u(f)===g?-1:$.get(u(f)),S=[],y=[],J=[],ct=new Set(t.cables.flatMap(f=>[f.de,f.a])),Pt=new Set([...ct].map(u)),ut=f=>Pt.has(u("placa."+f)),dt=[...r,...h,"5V","3V3",...n?["VIN","GND1","GND2"]:[]].filter(f=>ut(f)||n&&["5V","3V3","VIN","GND1","GND2"].includes(f)).map(f=>"placa."+f);for(let f of h)ut(f)&&C("placa."+f);let mt=n?t.componentes.filter(f=>f.tipo==="shield_nano_io").flatMap(f=>["OUT_5V","OUT_5V_2","OUT_3V3","OUT_3V3_2","GND_OUT","GND_OUT_2","JACK_POS","JACK_GND"].map(A=>f.id+"."+A)):[];for(let f of mt)C(f);let P=[];if(t.protoboard){let f=new Set([...ct].map(u));for(let A of t.componentes)for(let l of Object.keys(A.en||{}))f.add(u(A.id+"."+l));for(let A of fo(t.protoboard.tipo)){let l="protoboard."+A.nombre;f.has(u(l))&&P.push(l)}}let W=new Map,N=[["5V",5,"placa.5V"],["3V3",3.3,"placa.3V3"],...n&&s.VIN>0?[["VIN",0,"placa.VIN"]]:[],...a.map(({ref:f,voltios:A=0,nombre:l})=>[f,A,f,l])];for(let[f,A,l,_]of N){if(!ut(f)&&!n&&l.startsWith("placa."))continue;let d=s[f]??A,E=C(l),z=E===-1?"GND":W.get(E);if(z){let M=_?`${_[0].toUpperCase()+_.slice(1)} est\\xE1 unida directo a ${z}: es un cortocircuito. Quita ese cable.`:`El pin ${f} est\\xE1 unido directo a ${z}: es un cortocircuito.`;J.push({tipo:"cortocircuito",componente:l,mensaje:M});continue}W.set(E,_||f);let G=fs(E,d);G.pin=f,G.ref=l,y.push(G),S.push(G)}let F={};for(let f of r)ut(f)&&(F[f]=ls(C("placa."+f)),S.push(F[f]));let I=[],U=[],O=[];for(let f of t.componentes)if(f.tipo==="resistencia"){let A=Te(C(f.id+".1"),C(f.id+".2"),Number(f.props.ohmios)||1);I.push({id:f.id,ohmios:Number(f.props.ohmios)||1,el:A}),A.a!==A.b&&S.push(A)}else if(f.tipo==="led"){let A=C(f.id+".anodo"),l=C(f.id+".catodo"),_={id:f.id,a:A,k:l,quemado:e.has(f.id)};if(!_.quemado&&A!==l){let d=D++;_.rs=Te(A,d,pt.rs),_.diodo=ds(d,l,ni(f.props.color)),S.push(_.rs,_.diodo)}U.push(_)}else if(f.tipo==="potenciometro"){let A=Number(f.props.ohmios)||1e4,l=Math.max(0,Math.min(1,Number(f.props.posicion))),_=C(f.id+".GND"),d=C(f.id+".SIG"),E=C(f.id+".VCC"),z=Te(_,d,Math.max(xs.minimo,A*l)),G=Te(d,E,Math.max(xs.minimo,A*(1-l)));for(let M of[z,G])M.a!==M.b&&S.push(M);O.push({id:f.id,ohmios:A,posicion:l,bajo:z,alto:G})}y.forEach((f,A)=>f.fila=D+A);function at(f){let A=new Set([b("placa.GND1")]);for(let l of y)A.add(b(l.ref));for(let l of r){let _=f[l];(_===nt.High||_===nt.Low||_===nt.InputPullUp)&&A.add(b("placa."+l))}return A}let tt=new Set([...ct,...dt,...mt,...P]);for(let f of a)tt.add(f.ref);for(let f of t.componentes)for(let A of ps[f.tipo]||[])tt.add(f.id+"."+A);return{fallasFijas:J,flotantes(f){let A=at(f),l=new Set;for(let _ of r)f[_]===nt.Input&&!A.has(b("placa."+_))&&l.add(_);for(let _ of h)A.has(b("placa."+_))||l.add(_);return l},refsAlAire(f){let A=at(f),l=new Set;for(let _ of tt)A.has(b(_))||l.add(_);return l},ponerAlimentacion(f){p=f["5V"]??p;for(let A of y)f[A.pin]!==void 0&&(A.v=f[A.pin])},ponerPines(f){for(let[A,l]of Object.entries(F)){let _=f[A];_===nt.High?Object.assign(l,{v:p,g:1/Ht.rAlto}):_===nt.Low?Object.assign(l,{v:0,g:1/Ht.rBajo}):_===nt.InputPullUp?Object.assign(l,{v:p,g:1/Ht.rPullUp}):Object.assign(l,{v:0,g:0})}},resolver(){let f=hs({nodos:D,fuentes:y.length,elementos:S}),A=d=>{let E=T(d);return E===void 0?null:E<0?0:f.x[E]},l={};for(let d of ct)l[d]=A(d);for(let d of dt)l[d]=A(d);for(let d of P)l[d]=A(d);for(let d of a)l[d.ref]=A(d.ref);for(let d of mt)l[d]=A(d);for(let d of t.componentes)for(let E of ps[d.tipo]||[])l[d.id+"."+E]=A(d.id+"."+E);let _=(d,E)=>d===null||E===null?null:d-E;return{convergio:f.convergio,iteraciones:f.iteraciones,voltajes:l,leds:U.map(d=>{let E=d.diodo?d.diodo.corriente(f.x):0;return{id:d.id,quemado:d.quemado,v:_(A(d.id+".anodo"),A(d.id+".catodo")),i:E,brillo:Math.max(0,Math.min(1,E*1e3/pt.plenomA))}}),resistencias:I.map(d=>{let E=d.el.a===d.el.b?0:d.el.corriente(f.x);return{id:d.id,ohmios:d.ohmios,v:_(A(d.id+".1"),A(d.id+".2")),i:E,w:E*E*d.ohmios}}),pines:Object.entries(F).filter(([,d])=>d.g>0).map(([d,E])=>({pin:d,v:A("placa."+d),i:E.corriente(f.x)})),fuentes:y.map(d=>({pin:d.pin,i:d.corriente(f.x)})),potenciometros:O.map(d=>({id:d.id,ohmios:d.ohmios,posicion:d.posicion,v:_(A(d.id+".SIG"),A(d.id+".GND")),i:Math.abs(d.bajo.a!==d.bajo.b?d.bajo.corriente(f.x):d.alto.a!==d.alto.b?d.alto.corriente(f.x):0)}))}}}}function ms(t,e){let o=a=>(Math.abs(a)*1e3).toFixed(0),s=[];if(e.danoComponentes){for(let a of t.leds)!a.quemado&&a.i*1e3>pt.quemamA&&s.push({tipo:"led_quemado",componente:a.id,corriente_mA:+(a.i*1e3).toFixed(1),mensaje:`El LED ${a.id} se quem\\xF3: le pasaron ${o(a.i)} mA y aguanta unos ${pt.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let a of t.resistencias)a.w>ii&&s.push({tipo:"resistencia_caliente",componente:a.id,potencia_W:+a.w.toFixed(2),mensaje:`La resistencia ${a.id} se calienta: disipa ${a.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let n of t.pines)if(Math.abs(n.i)*1e3>Ht.maxmA){let r=n.pin.startsWith("D")?"pin "+n.pin.slice(1):"pin "+n.pin;s.push({tipo:"corriente_pin",componente:"placa."+n.pin,corriente_mA:+(Math.abs(n.i)*1e3).toFixed(1),mensaje:`El ${r} entrega ${o(n.i)} mA y aguanta ${Ht.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}let a=t.pines.reduce((n,r)=>n+Math.max(0,r.i),0),i=t.pines.reduce((n,r)=>n+Math.max(0,-r.i),0);for(let[n,r,h]of[[a,"VCC","entregan"],[i,"GND","reciben"]])n*1e3>Ht.chipMaxmA&&s.push({tipo:"corriente_chip",componente:"placa."+r,corriente_mA:+(n*1e3).toFixed(1),mensaje:`Entre todos, los pines ${h} ${o(n)} mA y el chip aguanta ${Ht.chipMaxmA} mA en total: en la placa real se puede da\\xF1ar. Usa resistencias m\\xE1s grandes o menos pines a la vez.`})}return s}var Qt={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},Zt={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function ri(t,e="sg90"){let o=(Qt[e]||Qt.sg90).angulos,s=t<=o.centroUs?90-(o.centroUs-t)/o.usPorGradoBajo:90+(t-o.centroUs)/o.usPorGradoAlto;return Math.max(0,Math.min(180,s))}function gs(t){let e=Qt[t]||Qt.sg90,o=90,s=90,a=null,i=0,n=!1,r=0,h=0;return{pulso(p){p<Zt.pulsoValidoMin||p>Zt.pulsoValidoMax||a!==null&&Math.abs(p-a)<Zt.bandaMuerta||(a=p,s=ri(p,t))},avanzar(p,u){if(!(u>0)){n=!1,i=0;return}let b=60/(e.seg60*1e3)*(u/Zt.voltiosRef),g=s-o,$=Math.abs(g)>.01;r=Math.min(1,Math.abs(g)/Zt.bandaGrados),$&&!n&&(i=Zt.arranqueMs,h=r),n=$,n&&(o+=Math.sign(g)*Math.min(Math.abs(g),b*p)),i=Math.max(0,i-p)},corriente(p){if(!(p>0))return 0;let{reposo:u,movimiento:b,arranque:g}=e.mA;return(i>0?u+(g-u)*h:n?u+(b-u)*r:u)/1e3*(p/Zt.voltiosRef)},estado:()=>({angulo:o,objetivo:s,pulso:a,moviendo:n,arrancando:i>0})}}var ne=9.6/2.54,Be=57.6,Cs=14.4,ur={x:Cs,ancho:32.2*ne},ci={x:Cs+(32.2-22.2)/2*ne,ancho:22.2*ne,alto:11.8*ne},mr={x:ci.x+5.9*ne,y:Be},gr=13.5*ne,uo=182.4;var Cr={GND:{x:uo,y:Be-9.6,color:"#7a4a24"},VCC:{x:uo,y:Be,color:"#d7263d"},SIG:{x:uo,y:Be+9.6,color:"#f28c28"}};var lt={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function mo(){let{sostieneA:t,segundosA8A:e,enfriaS:o}=lt.fusible,s=(8**2-t**2)*e,a=0,i=!1;return{avanzar(n,r){let h=n/1e3;!i&&r>t?a+=(r**2-t**2)/s*h:a=Math.max(0,a-h/o),a>=1&&(i=!0),i&&a===0&&(i=!1)},get abierto(){return i},get calor(){return a},reiniciar(){a=0,i=!1}}}var Ss=(t,e=0)=>Math.max(0,(lt.voltios-lt.ohmios*t)/(1+lt.ohmios*e));var Me=3.779527559055118,Mt={reduccion:48,voltiosRef:6,rpmSinCarga:200,mASinCarga:150,mABloqueado:1200,tauMecanicoMs:40,ruedaMM:66},je=Mt.voltiosRef/(Mt.mABloqueado/1e3),As=Mt.rpmSinCarga*Mt.reduccion*2*Math.PI/60,Rs=Mt.mASinCarga/1e3,re=(Mt.voltiosRef-Rs*je)/As,li=re*Rs/As,fi=Mt.tauMecanicoMs/1e3*re*re/je;function bs(){let t=0,e=0,o=0;return{avanzar(s,a,{conectado:i=!0,frena:n=!1}={}){let r=s/1e3;i?e=(a-re*t)/je:e=n?-(re*t)/je:0;let h=re*e-li*t;t+=h/fi*r,o=(o+t/Mt.reduccion*r*180/Math.PI)%360},estado(){let s=t*60/(2*Math.PI)/Mt.reduccion;return{rpm:s,i:e,giro:o,velocidad:s/60*Math.PI*(Mt.ruedaMM/10)}}}}var Rr=64.2*Me,di=22.5*Me,br=40*Me,hi=11.2*Me,Ir=Mt.ruedaMM*Me/2,Tr={eje:{ancho:300,alto:128,x0:20,y0:36},rueda:{ancho:380,alto:310,x0:135-hi,y0:132-di/2}};var Ts=3.779527559055118,Fe={llena:{nombre:"llena",voltios:8.4,celdas:[4.2,4.2],color:"#2e9e44",barras:3},nominal:{nombre:"nominal",voltios:7.4,celdas:[3.7,3.7],color:"#e8a20c",barras:2},descargada:{nombre:"descargada",voltios:6.4,celdas:[3.2,3.2],color:"#d7263d",barras:1},desbalanceada:{nombre:"desbalanceada",voltios:7.4,celdas:[3.95,3.45],color:"#c2410c",barras:2}},Yt={celdas:2,ohmios:.05,minimoCeldaV:3,avisoCeldaV:3.3},We=t=>(Fe[t]||Fe.nominal).voltios,Ms=t=>(Fe[t]||Fe.nominal).celdas,Is=360;var xi=10,So=10,pi=72*Ts,ui=34*Ts;var go=xi+pi+58,Co=So+ui-34,wr={POS:{x:Is-12,y:So+30,color:"#d7263d"},NEG:{x:Is-12,y:So+39.6,color:"#2b2b2b"},BAL0:{x:go,y:Co,color:"#2b2b2b"},BAL1:{x:go,y:Co+9.6,color:"#e05a5a"},BAL2:{x:go,y:Co+19.2,color:"#d7263d"}};var ws={pasoMs:800,umbralV:3.3,umbrales:[0,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8]};var mi=9.6,gi=82,Ci=132,yr=Object.fromEntries(["NEG","C1","C2","C3","C4","C5","C6","C7","C8"].map((t,e)=>[t,{x:gi+e*mi,y:Ci}]));var rt={...ss,caidaV:1.4,caidaPorA:1,maximoCanalA:.6,avisoCanalMs:500},Si=6.6,Ai=.06,ys=4,_s=1-Math.exp(-1/ys),Ri=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],wt=(t,e=1)=>t.toFixed(e).replace(".",",");function $s({activas:t,avisar:e}){let o=null,s=new Map,a=new Map,i=new Map,n=0,r=0,h=!1,p={},u=0,b={},g=0,$=0,D=[],C=0,T=0;function S(){for(let P of Object.values(rt.pwm))p[P]={alto:!1,desde:0,acum:0,cambios:0,quieto:0};u=0,b={}}S();function y(P,W,{fuentesMotor:N={},entradas:F=[]}={}){D=Object.entries(N);let I=(l,_)=>W(l)===W(_),U="placa.GND1",O=P.componentes.find(l=>l.tipo==="shield_l293d");o=O?{id:O.id,puente:!O.props||O.props.puentePWR!==!1}:null;let at=new Map;for(let l of P.componentes){if(l.tipo!=="bateria_lipo")continue;let _=l.props&&l.props.carga||"nominal",d=We(_),E=a.get(l.id),z=l.id+".POS",G=l.id+".NEG",M={carga:_,voc:d,celdas:Ms(_),v:E&&E.carga===_?E.v:d,iAntes:0,sumaI:0,ms:0,motores:!1,vin:!1,valida:!1};_==="descargada"&&e({tipo:"bateria_baja",componente:l.id,mensaje:`La bater\\xEDa ${l.id} est\\xE1 descargada: ${wt(d)} V, ${wt(d/Yt.celdas,2)} V por celda. Corre el riesgo de perder sus celdas: por debajo de ${wt(Yt.minimoCeldaV)} V por celda una LiPo se da\\xF1a y puede inflarse. C\\xE1rgala antes de seguir.`}),_==="desbalanceada"&&e({tipo:"bateria_desbalanceada",componente:l.id,mensaje:`Las celdas de la bater\\xEDa ${l.id} est\\xE1n desbalanceadas: ${M.celdas.map(L=>wt(L,2)+" V").join(" y ")}. La m\\xE1s baja se descarga primero y se puede da\\xF1ar. C\\xE1rgala con un cargador de balance (por el cable blanco).`});let w=L=>o&&I(L,o.id+".EXT_POS")||I(L,"placa.VIN")||I(L,"placa.5V")||F.some(k=>I(L,k));I(z,G)?e({tipo:"bateria_corto",componente:l.id,mensaje:`Los dos cables de la bater\\xEDa ${l.id} est\\xE1n unidos: es un cortocircuito. Una LiPo en corto se calienta y puede incendiarse. Quita ese cable.`}):I(z,U)&&w(G)?e({tipo:"bateria_invertida",componente:l.id,mensaje:`La bater\\xEDa ${l.id} est\\xE1 al rev\\xE9s: el cable rojo (+) va a GND. Pon el rojo en + y el negro en \\u2212.`}):I(G,U)&&(M.valida=!0,I(z,"placa.5V")&&(M.valida=!1,e({tipo:"bateria_en_5v",componente:l.id,mensaje:`La bater\\xEDa ${l.id} est\\xE1 en el pin 5V: sus ${wt(d)} V da\\xF1an la placa, que funciona a 5 V. Con\\xE9ctala a EXT_PWR de la shield o al pin VIN.`})),M.motores=M.valida&&!!o&&I(z,o.id+".EXT_POS"),M.vin=M.valida&&I(z,"placa.VIN")),at.set(l.id,M)}a=at;let tt=new Map;for(let l of P.componentes){if(l.tipo!=="probador_lipo")continue;let _=l.props&&typeof l.props.umbral=="number"?l.props.umbral:ws.umbralV,d=null;for(let z of a.keys())I(l.id+".NEG",z+".BAL0")&&(d=z);let E=["C1","C2","C3","C4","C5","C6","C7","C8"].map(z=>{if(!d)return null;for(let G of[0,1,2])if(I(`${l.id}.${z}`,`${d}.BAL${G}`))return G;return null});tt.set(l.id,{umbral:_,fuente:d,puntos:E})}i=tt;let f=l=>{if(o){for(let d of[1,2,3,4])for(let E of["A","B"])if(I(l,`${o.id}.M${d}${E}`))return{tipo:"shield",n:d,s:E}}if(I(l,U))return{tipo:"gnd"};if(I(l,"placa.5V"))return{tipo:"5v"};for(let[d,E]of D)if(I(l,E))return{tipo:"aux",fuente:d};for(let[d,E]of a)if(E.valida&&I(l,d+".POS"))return{tipo:"bateria",id:d};let _=Ri.find(d=>I(l,"placa."+d));return _?{tipo:"pin",pin:_}:null},A=new Map;for(let l of P.componentes){if(l.tipo!=="motor_tt")continue;let d=s.get(l.id)||{logico:bs(),iAntes:0,sumaV:0,sumaI:0,ms:0,sobreMs:0};d.lado=l.props&&l.props.lado||"izquierdo",d.a=f(l.id+".A"),d.b=f(l.id+".B");let E=[d.a,d.b].filter(G=>G&&G.tipo==="shield");d.canal=E.length?"M"+E[0].n:null;let z=[d.a,d.b].find(G=>G&&G.tipo==="pin");z&&e({tipo:"motor_en_pin",componente:l.id,mensaje:`El motor ${l.id} est\\xE1 conectado al pin ${z.pin.replace(/^D/,"")}: un pin da hasta 40 mA y el motor pide 150 mA o m\\xE1s (m\\xE1s de 1 A al arrancar). Con\\xE9ctalo a los bornes M1 a M4 de la shield.`}),A.set(l.id,d)}s=A}function J(P,W,N){let F=I=>W[I]===bt.High;rt.reloj in P&&F(rt.reloj)&&(n=(n<<1|(F(rt.datos)?1:0))&255),rt.cierre in P&&F(rt.cierre)&&(r=n),rt.habilita in P&&(h=W[rt.habilita]===bt.Low);for(let I of Object.values(rt.pwm)){if(!(I in P))continue;let U=p[I],O=P[I]===bt.High;U.cambios=(U.cambios||0)+1,O&&!U.alto?Object.assign(U,{alto:!0,desde:N}):!O&&U.alto&&(U.acum+=N-U.desde,U.alto=!1)}}function ct(){h=!1,S()}function Pt(P,{v5:W,logica:N,cargasBateria:F={},consumoPorVinA:I=Ai,habilitarVin:U=!0,voltajesMotor:O={}}){let at=P-u;for(let[M,w]of Object.entries(p)){w.alto&&(w.acum+=P-w.desde,w.desde=P);let L=at>0?Math.min(1,w.acum/at):0,k=b[M]||0;b[M]=(L===0||L===1)&&w.quieto>=ys?L:k+_s*(L-k),w.quieto=w.cambios?0:(w.quieto||0)+1,w.cambios=0,w.acum=0}u=P,g=0,$=0;for(let M of a.values())M.motores&&(g=Math.max(g,M.v)),M.vin&&($=Math.max($,M.v));let tt=U&&$>=Si,f=N||tt,A=new Map,l=(M,w)=>A.set(M,(A.get(M)||0)+w),_=M=>{for(let[w,L]of a)if(L.motores)return l(w,M)},d=0,E={},z=M=>M?M.tipo==="shield"?!f||!h?null:{v:r>>rt.bits[M.n][M.s]&1?g:0,d:b[rt.pwm[M.n]]||0,shield:!0}:M.tipo==="gnd"?{v:0,d:1}:M.tipo==="5v"?{v:W,d:1,del5V:!0}:M.tipo==="aux"?{v:O[M.fuente]||0,d:1,fuenteAux:M.fuente}:M.tipo==="bateria"?{v:(a.get(M.id)||{v:0}).v,d:1,bateria:M.id}:null:null,G=!1;for(let[M,w]of s){let L=z(w.a),k=z(w.b),_t=L&&k?Math.min(L.d,k.d):0;if(!_t)w.vAhora=0,w.logico.avanzar(1,0,{conectado:!1});else{let q=L.v-k.v,jt=(L.shield?1:0)+(k.shield?1:0),Ft=0;if(Math.abs(q)>1e-9){let gt=t.caidaL293D&&jt?jt/2*(rt.caidaV+rt.caidaPorA*Math.abs(w.iAntes)):0;Ft=Math.sign(q)*Math.max(0,Math.abs(q)-gt)*_t}w.vAhora=Ft,w.logico.avanzar(1,Ft,{conectado:!0}),jt===2&&(r>>rt.bits[w.a.n][w.a.s]&1)!==(r>>rt.bits[w.b.n][w.b.s]&1)&&g<1&&(G=!0);let Wt=w.logico.estado().i,xt=q>=0?L:k,yt=Math.max(0,Wt*Math.sign(q||1))*_t;xt.shield?_(yt):xt.del5V?d+=yt:xt.fuenteAux?E[xt.fuenteAux]=(E[xt.fuenteAux]||0)+yt:xt.bateria&&l(xt.bateria,yt)}let ht=w.logico.estado();w.iAntes=ht.i,w.sumaI+=Math.abs(ht.i),w.sumaV+=Math.abs(w.vAhora||0),w.ms++;let Ee=w.a&&w.a.tipo==="shield"||w.b&&w.b.tipo==="shield";w.sobreMs=Ee&&Math.abs(ht.i)>rt.maximoCanalA?w.sobreMs+1:0,w.sobreMs>rt.avisoCanalMs&&e({tipo:"l293d_corriente",componente:M,mensaje:`El motor ${M} pide ${wt(Math.abs(ht.i))} A y cada canal del L293D da hasta 0,6 A: el integrado se calienta y puede apagarse. Revisa que la rueda no est\\xE9 trabada.`})}G&&o&&e({tipo:"motores_sin_energia",componente:o.id,mensaje:"El programa manda a girar los motores, pero la shield no tiene energ\\xEDa para ellos: el USB no alimenta los bornes M1 a M4. Conecta la bater\\xEDa a EXT_PWR (rojo en +, negro en \\u2212)."});for(let[M,w]of a){if(!w.valida)continue;w.cargaExterna=Object.prototype.hasOwnProperty.call(F,M);let L=(A.get(M)||0)+(w.vin&&tt?I:0)+Math.max(0,F[M]||0);w.v=Math.max(0,w.voc-Yt.ohmios*L),w.iAntes=L,w.sumaI+=L,w.ms++;let k=Math.min(...ut(w));k<Yt.minimoCeldaV&&e({tipo:"bateria_celdas",componente:M,mensaje:`La bater\\xEDa ${M} baj\\xF3 a ${wt(w.v,2)} V con los motores y una celda qued\\xF3 en ${wt(k,2)} V: menos de ${wt(Yt.minimoCeldaV)} V por celda. As\\xED se da\\xF1an las celdas: c\\xE1rgala.`})}return C+=g,T++,{i5V:d,porVin:tt,iFuentes:E}}function ut(P){let W=P.valida?P.iAntes:0;return P.celdas.map(N=>Math.max(0,N-Yt.ohmios/P.celdas.length*W))}function dt(P,W,N){let F=W.fuente&&a.get(W.fuente);if(!F)return{encendido:!1,celdas:[],total:0,alarma:!1,ms:N};let I=ut(F),U=[0,I[0],I[0]+I[1]],O=[],at=0;for(let l of W.puntos){if(l===null)break;O.push(U[l]-at),at=U[l]}let tt=O.length>0&&at>=2.5,f=O.findIndex(l=>l<W.umbral),A=tt&&W.umbral>0&&f>=0;return A&&e({tipo:"probador_alarma",componente:P,mensaje:`El probador ${P} pita: la celda ${f+1} est\\xE1 en ${wt(Math.max(0,O[f]),2)} V, por debajo de ${wt(W.umbral)} V. Desconecta la bater\\xEDa y c\\xE1rgala con un cargador de balance.`}),{encendido:tt,celdas:O.map(l=>Math.max(0,l)),total:at,alarma:A,umbral:W.umbral,ms:N}}function mt(P=0){let W={},N={motores:[],baterias:[],shield:null,probadores:[]};for(let[F,I]of s){let U=I.logico.estado(),O={rpm:U.rpm,giro:U.giro,velocidad:U.velocidad,i:I.ms?I.sumaI/I.ms:Math.abs(U.i),voltios:I.ms?I.sumaV/I.ms:0};W[F]=O,N.motores.push({id:F,canal:I.canal,lado:I.lado,...O}),Object.assign(I,{sumaI:0,sumaV:0,ms:0})}for(let[F,I]of a){let U={voltios:I.valida?I.v:I.voc,celdas:ut(I),i:I.ms?I.sumaI/I.ms:0,carga:I.carga,conectada:I.motores||I.vin||!!I.cargaExterna};W[F]=U,N.baterias.push({id:F,...U}),Object.assign(I,{sumaI:0,ms:0})}if(o){let F=T?C/T:g;W[o.id]={motoresV:F},N.shield={id:o.id,motoresV:F,puente:o.puente,habilitada:h,salidas:r}}for(let[F,I]of i){let U=dt(F,I,P);W[F]=U,N.probadores.push({id:F,...U})}return C=0,T=0,{piezas:W,lista:N}}return{armar:y,pinesCambiaron:J,reiniciarChip:ct,cadaMs:Pt,foto:mt,voltajeBateria:P=>a.get(P)?.v??null,get hay(){return!!o||s.size>0||a.size>0||i.size>0}}}var ce=Object.freeze({usbV:5,salida5V:5,salida3V3:3.3,reposoA:.025,resistenciaFuenteOhm:.25,caidaJackV:1.2,caida3V3V:1.2,caidaNano3V3V:.3,resistencia3V3Ohm:.5,aviso3V3A:.1,minimoJackV:7,maximoJackV:12,avisoNano3V3A:.05,resetV:2.7,validacion:"Modelo de referencia; Nano y expansi\\xF3n pendientes de medici\\xF3n f\\xEDsica."}),Es=Object.freeze(["usb","jack","apagada"]);function Ge(t,e){let o=t.componentes.find(p=>p.tipo==="shield_nano_io"),s=o&&o.props||{},a=Es.includes(s.alimentacion)?s.alimentacion:"usb",i=o?o.id+".JACK_POS":"placa.VIN",n=Number.isFinite(Number(s.voltajeJack))?Math.max(0,Math.min(12,Number(s.voltajeJack))):9,r=null;for(let p of t.componentes)if(p.tipo==="bateria_lipo"){if(e(p.id+".POS")===e(i)){r=p.id,n=e(p.id+".NEG")===e("placa.GND1")&&e(i)!==e("placa.GND1")?We(p.props&&p.props.carga):0;break}if(e(p.id+".NEG")===e(i)){r=p.id,n=0;break}}let h=!1;return e(i)===e("placa.GND1")&&(h=!r&&a==="jack"&&n>0,n=0),!o&&r&&(a="jack"),{alimentacion:a,voltiosJack:n,bateria:r,corto:h,expansion:o?o.id:null,entradaRef:i}}function we(t,{realista:e=!1,g5:o=0,g33:s=0,g33Expansion:a=0,fijo5:i=0}={}){let n=ce,r=t.alimentacion==="jack"||t.bateria?t.voltiosJack:0,h=t.expansion?0:r,u=t.alimentacion==="apagada"?0:t.alimentacion==="usb"?n.usbV:r<=0?0:e?Math.max(0,Math.min(n.salida5V,r-n.caidaJackV)):Math.min(n.salida5V,r),b=e?n.resistenciaFuenteOhm:0,g=e?n.resistencia3V3Ohm:0,$=u>0?n.reposoA:0,D=u,C=0,T=0;for(let ct=0;ct<12;ct++)C=Math.max(0,Math.min(n.salida3V3,D-(e?n.caidaNano3V3V:0)))/(1+g*Math.max(0,s)),T=t.expansion?Math.max(0,Math.min(n.salida3V3,D-(e?n.caida3V3V:0)))/(1+g*Math.max(0,a)):0,D=Math.max(0,(u-b*($+Math.max(0,i)+C*Math.max(0,s)+T*Math.max(0,a)))/(1+b*Math.max(0,o)));C=Math.max(0,Math.min(n.salida3V3,D-(e?n.caidaNano3V3V:0)))/(1+g*Math.max(0,s)),T=t.expansion?Math.max(0,Math.min(n.salida3V3,D-(e?n.caida3V3V:0)))/(1+g*Math.max(0,a)):0;let S=C*Math.max(0,s),y=T*Math.max(0,a),J=u>0?$+Math.max(0,i)+D*Math.max(0,o)+S+y:0;return{v5:D,v33:C,v33Expansion:T,vin:h,entradaV:r,amperios:J,i33:S,i33Expansion:y,apagada:D<n.resetV,fuente:t.alimentacion,referencia:!0}}var bi=60,Ds=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ii=3,Ti=1.5,Mi=1/1e4,Ps=60,wi=Math.cos(.35*Math.PI),_i=.1*5/1024,yi=.15,$i=100,vs=50,Ei=.005;function Vs({hex:t,circuito:e,activas:o={},semilla:s=Math.floor(Math.random()*2**32)}){let a=Lt(e.placa),i=kt(e.placa),n=a.analogicos,r=vi(s),h=new Set,p=[],u={raiz:null,grupos:new Set},b=new Set,g=new Set,$=new Set,D={},C=new Map,T={},S=null,y=e,J=null,ct=new Map,Pt=new Map,ut={},dt=null,mt=new Map,P=new Map,W=[],N=0,F=0,I={inicio:0,clave:""},U=null,O=null,at=-1/0,tt={},f=0,A=0,l=[],_=new TextDecoder("utf-8"),d=new Set,E=new Set,z=[],G=[],M=new Map,w=0,L=mo(),k=!1,_t=0,ht=null,Ee=0,q=lt.idealV,jt=0,Ft=0,Wt=0,xt=0,yt=[],gt=$s({activas:o,avisar:c=>Ct(c)}),fe=0,te=!1,v=null,H=null,De=!1,Pe=null,js=Object.fromEntries(Bt.map(c=>[c,bt.Input])),vt=()=>(w+S.ciclos)/Tt*1e3,Fs=c=>Bt.reduce((x,R)=>x+c[R]*Ao[R],0);function de(){S=Yo(t),i&&S.ponerVoltajeReferencia(q);let c=S.estados();N=Fs(c),mt.set(N,c),F=0,P=new Map,W=[],I={inicio:0,clave:N},U=null,S.alCambiarPines((x,R)=>{Mo();let m=mt.get(N);for(let V in x)N+=(x[V]-m[V])*Ao[V];mt.has(N)||mt.set(N,{...R}),N===I.clave&&(U={tiempos:new Map(P),ciclo:S.ciclos}),at=S.ciclos;for(let V in x)tt[V]=S.ciclos;Vt(),M.size&&Hs(x),gt.pinesCambiaron(x,R,S.ciclos)}),S.alCadaMs(Js),S.alCadaMs(yo);for(let x of M.values())x.subida=null;gt.reiniciarChip(),at=-1/0,tt={},S.ponerLectorAnalogico(Zs),ut={},dt=null,S.alByteSerial(x=>{l.push(x),A=vt()+bi})}function Mo(){let c=S.ciclos;P.set(N,(P.get(N)||0)+(c-F)),F=c}function he(){a=Lt(y.placa),i=kt(y.placa),n=a.analogicos,i&&(v=Ge(y,Nt(y)),H=we(v,{realista:!!o.limiteUSB}),Pe=H,q=H.v5,k=H.apagada,S.ponerVoltajeReferencia(q));let c=i&&v.expansion?[{ref:v.expansion+".OUT_3V3",voltios:H.v33Expansion,nombre:"la salida 3,3V de la expansi\\xF3n"},...H.entradaV>0?[{ref:v.expansion+".JACK_POS",voltios:H.entradaV,nombre:"la entrada del jack"}]:[]]:[];J=us(y,{quemados:d,presionados:h,...i?{alimentacion:Le(),fuentesExtra:c}:{}}),ct=new Map,Pt=new Map,Ls(),gt.armar(y,Nt(y),i?{fuentesMotor:{"3V3":"placa.3V3",...v.expansion?{[v.expansion+".OUT_3V3"]:v.expansion+".OUT_3V3"}:{}},entradas:[v.entradaRef]}:{}),wo(),i&&Ws()}function Le(){return{"5V":H.v5,"3V3":H.v33,VIN:H.vin,...v.expansion?{[v.expansion+".OUT_3V3"]:H.v33Expansion,[v.expansion+".JACK_POS"]:H.entradaV}:{}}}function Ws(){let c=v.expansion||"placa";v.corto?Ct({tipo:"cortocircuito",componente:v.entradaRef,mensaje:"La entrada del jack est\\xE1 unida directo a GND: es un cortocircuito. Quita ese cable."}):v.alimentacion==="jack"&&v.voltiosJack<ce.minimoJackV&&Ct({tipo:"nano_alimentacion",componente:c,voltios:v.voltiosJack,mensaje:`El jack recibe ${v.voltiosJack.toFixed(1).replace(".",",")} V: la referencia recomienda 7 a 12 V. Con menos voltaje bajan las salidas y el Nano puede quedar en reinicio.`})}function wo(){if(!p.length){u={raiz:null,grupos:new Set};return}let c=Nt(y,{presionados:h,conduccion:!0});u={raiz:c,grupos:new Set(p.map(c))}}let _o=c=>u.grupos.size>0&&u.grupos.has(u.raiz(c)),Gs=()=>Math.sin(2*Math.PI*Ps*(vt()/1e3))>wi;function Ls(){let c=Nt(y),x=(m,V)=>c(m)===c(V),R=new Map;for(let m of y.componentes){if(m.tipo!=="servo")continue;let V=Qt[m.props&&m.props.modelo]?m.props.modelo:"sg90",et=M.get(m.id),ft=et&&et.modelo===V?et:{modelo:V,logico:gs(V),subida:null,sumaA:0,picoA:0,msVentana:0};ft.senal=Bt.find(it=>x(m.id+".SIG","placa."+it))||null;let St=x(m.id+".GND","placa.GND1"),ot=Bt.find(it=>x(m.id+".VCC","placa."+it)),Q=i&&v.expansion&&v.expansion+".OUT_3V3";ft.fuente=x(m.id+".VCC","placa.5V")?"5V":x(m.id+".VCC","placa.3V3")?"3V3":Q&&x(m.id+".VCC",Q)?Q:ot||null,ft.conectado=St&&(ft.fuente==="5V"||ft.fuente==="3V3"||!!Q&&ft.fuente===Q),ot&&St&&Ct({tipo:"servo_alimentacion",componente:m.id,mensaje:`El servo ${m.id} toma la corriente del pin ${ot.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Qt[V].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),R.set(m.id,ft)}M=R}function Hs(c){for(let x of M.values())!x.senal||!(x.senal in c)||(c[x.senal]===bt.High?x.subida=S.ciclos:x.subida!==null&&(x.conectado&&!k&&x.logico.pulso((S.ciclos-x.subida)/Tt*1e6),x.subida=null))}let xe=c=>!c.conectado||k&&!i?0:c.fuente==="5V"?q:i?c.fuente==="3V3"?H.v33:H.v33Expansion:3.3;function yo(){if(i)return Ks();gt.hay&&({i5V:fe,porVin:te}=gt.cadaMs(S.ciclos,{v5:q,logica:!k&&q>lt.bodV}));for(let m of M.values())m.logico.avanzar(1,xe(m));let c=k?0:lt.placaA+Ee+fe,x=0;for(let m of M.values())m.conectado&&m.fuente==="5V"&&(x+=m.logico.corriente(1));q=k?0:te?lt.idealV:o.limiteUSB?Ss(c,x):lt.idealV;let R=c;for(let m of M.values()){let V=m.logico.corriente(xe(m));m.sumaA+=V,m.picoA=Math.max(m.picoA,V),m.msVentana++,(m.fuente==="5V"||m.fuente==="3V3")&&(R+=V)}te&&(R=0),o.limiteUSB&&(L.avanzar(1,R),!k&&!ht&&(q<lt.bodV?ht={motivo:"caida",amperios:R,voltios:q}:R>lt.limitePuertoA?ht={motivo:"puerto",amperios:R}:L.abierto&&(ht={motivo:"fusible",amperios:R}))),Ft+=R,Wt=Math.max(Wt,R),xt++}function Ks(){let c=k,x=ve(N),R=j=>x?(x.fuentes.find(At=>At.pin===j)||{i:0}).i:0,m=Math.max(0,R(v.expansion?v.entradaRef:"VIN")),V={};if(gt.hay){let j=v.bateria?{[v.bateria]:(v.alimentacion==="jack"?H.amperios:0)+m}:{};({i5V:fe,iFuentes:V}=gt.cadaMs(S.ciclos,{v5:q,logica:!k,cargasBateria:j,consumoPorVinA:0,habilitarVin:!1,voltajesMotor:{"3V3":H.v33,...v.expansion?{[v.expansion+".OUT_3V3"]:H.v33Expansion}:{}}}));let At=v.bateria&&gt.voltajeBateria(v.bateria);typeof At=="number"&&v.voltiosJack>0&&(v.voltiosJack=At)}for(let j of M.values())j.logico.avanzar(1,xe(j));let et=q>0?(Math.max(0,R("5V"))+(x?x.pines.reduce((j,At)=>j+Math.max(0,At.i),0):0))/q:0,ft=H.v33>0?(Math.max(0,R("3V3"))+(V["3V3"]||0))/H.v33:0,St=H.v33Expansion>0&&v.expansion?(Math.max(0,R(v.expansion+".OUT_3V3"))+(V[v.expansion+".OUT_3V3"]||0))/H.v33Expansion:0;for(let j of M.values())j.conectado&&(j.fuente==="5V"?et+=j.logico.corriente(1):j.fuente==="3V3"?ft+=j.logico.corriente(1):St+=j.logico.corriente(1));let ot=we(v,{realista:!!o.limiteUSB,g5:et,g33:ft,g33Expansion:St,fijo5:fe}),Q=["v5","v33","v33Expansion","vin","entradaV"].some(j=>Math.abs(ot[j]-Pe[j])>Ei);H=ot,q=ot.v5,k=ot.apagada,te=v.alimentacion==="jack",!c&&k&&(De=!0),(Q||c!==k)&&(Pe=ot,J.ponerAlimentacion(Le()),S.ponerVoltajeReferencia(q),ct.clear(),Pt.clear(),dt=null,Vt()),o.limiteUSB&&ot.i33Expansion>ce.aviso3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:v.expansion+".OUT_3V3",corriente_mA:Math.round(ot.i33Expansion*1e3),mensaje:"La salida 3,3 V supera 100 mA en el modelo de referencia y su voltaje baja. Reduce la carga; el l\\xEDmite de tu expansi\\xF3n real est\\xE1 pendiente de comprobar."}),o.limiteUSB&&ot.i33>ce.avisoNano3V3A&&Ct({tipo:"nano_3v3_sobrecarga",componente:"placa.3V3",corriente_mA:Math.round(ot.i33*1e3),mensaje:"La salida 3,3 V del m\\xF3dulo Nano supera 50 mA, el m\\xE1ximo publicado para el Arduino Nano oficial. Reduce la carga; comprueba el l\\xEDmite de tu clon. Esta salida es distinta de la expansi\\xF3n."});for(let j of M.values()){let At=j.logico.corriente(xe(j));j.sumaA+=At,j.picoA=Math.max(j.picoA,At),j.msVentana++}let it=ot.amperios+(v.alimentacion==="jack"?m:0);Ft+=it,Wt=Math.max(Wt,it),xt++}function $o({porCarga:c=!0}={}){De=!1,c&&jt++,q>0&&Ct({tipo:"nano_bajo_voltaje",componente:"placa",voltios:q,mensaje:"La alimentaci\\xF3n del Nano baj\\xF3 del umbral de reinicio de referencia (2,7 V). El programa espera mientras vuelve la energ\\xEDa. Revisa la fuente y reduce la carga."}),w+=S.ciclos,de(),Vt()}function Xs(){let{motivo:c,amperios:x,voltios:R}=ht;ht=null,c==="caida"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),voltios:Math.round(R*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${R.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):c==="puerto"?Ct({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${x.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(lt.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Ct({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(x*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(x*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),k=!0,_t=0),jt++,w+=S.ciclos,de(),Vt()}function zs(c){let x=Tt/1e3,R=c;for(;R>0&&k;){let m=Math.min(R,x-_t);if(w+=m,R-=m,_t+=m,_t<x)break;_t=0,yo(),!i&&!L.abierto&&(k=!1)}R>0&&S.correr(R)}function Eo(){let c=vt();yt=yt.filter(([R])=>c-R<1e3),yt.push([c,Wt]);let x={amperios:xt?Ft/xt:0,pico:Math.max(...yt.map(([,R])=>R)),voltios:q,fusible:Math.round(L.calor*100)/100,apagada:k,reinicios:jt};return i&&Object.assign(x,{fuente:H.fuente,voltios3V3:H.v33,voltios3V3Expansion:H.v33Expansion,voltiosJack:H.entradaV,referencia:!0,fusible:null,expansion:v.expansion}),Ft=0,Wt=0,xt=0,x}function Do(){let c={};for(let[x,R]of M){let m=R.logico.estado();c[x]={modelo:R.modelo,angulo:Math.round(m.angulo*10)/10,pulso:m.pulso===null?null:Math.round(m.pulso),senal:R.senal,fuente:R.fuente,moviendo:m.moviendo,i:R.msVentana?R.sumaA/R.msVentana:R.logico.corriente(xe(R)),pico:R.picoA},R.sumaA=0,R.picoA=0,R.msVentana=0}return c}function qs(c,x,R){let m=Pt.get(c);if(m)return m;let V=J.flotantes(x),et=new Set;n.forEach((Q,it)=>{V.has(Q[0])&&et.add(it)});let ft=new Set,St=[];for(let Q of Ds){let it=x[Q];if(it!==bt.Input&&it!==bt.InputPullUp)continue;if(V.has(Q)){ft.add(Q),St.push([Q,"aire"]);continue}let j=R?R.voltajes["placa."+Q]:null;typeof j=="number"?St.push([Q,j>=(i?.6*q:Ii)?!0:j<=(i?.3*q:Ti)?!1:null]):St.push([Q,it===bt.InputPullUp])}let ot=n.map(Q=>{for(let it of Q){let j=R?R.voltajes["placa."+it]:null;if(typeof j=="number")return j}return null});return m={canales:et,alAire:ft,entradas:St,analogicos:ot,refsAlAire:J.refsAlAire(x)},R&&Pt.set(c,m),m}function He(c,x){ut[c]!==x&&(ut[c]=x,S.ponerEntrada(c,x))}function Vt(){if(!J||!S)return;let c=mt.get(N)||S.estados(),x=ve(N),R=qs(N,c,x);b=R.alAire;for(let[m,V]of R.entradas){if(V==="aire"){m in D||(D[m]=r()<.5),He(m,o.entradaFlotante?D[m]:!1);continue}let et=V===null?!!T[m]:V;T[m]=et,He(m,et)}g=R.canales,x&&R.analogicos!==dt&&(R.analogicos.forEach((m,V)=>{m!==null&&(!dt||dt[V]!==m)&&S.ponerAnalogico(V,m)}),dt=R.analogicos),$=R.refsAlAire}function Js(){if(!(!o.entradaFlotante||!b.size))for(let c of b){let x=_o("placa."+c)?Gs():r()<Mi?!D[c]:D[c];x!==D[c]&&(D[c]=x,He(c,x))}}function Zs(c,x){if(g.has(c)){if(!o.entradaFlotante)return 0;if(n[c]&&_o("placa."+n[c][0]))return 2.5+2.5*Math.sin(2*Math.PI*Ps*(vt()/1e3));let R=C.has(c)?C.get(c):1+3*r(),m=Math.max(0,Math.min(5,R+Po()*yi));return C.set(c,m),m}return o.ruidoADC?x+Po()*_i:x}function Po(){return Math.sqrt(-2*Math.log(1-r()))*Math.cos(2*Math.PI*r())}function Ct(c){let x=c.tipo+"|"+c.componente;return E.has(x)?!1:(E.add(x),z.push(c),G.push(c),!0)}function ve(c){for(let x=0;x<4;x++){let R=ct.get(c);if(R)return R;J.ponerPines(i&&k?js:mt.get(c));let m=null;try{m=J.resolver()}catch{m=null}if(f++,!m||!m.convergio)return Ct({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;ct.set(c,m);let V=!1;for(let et of[...J.fallasFijas,...ms(m,o)])Ct(et)&&et.tipo==="led_quemado"&&(d.add(et.componente),V=!0);if(!V)return m;he()}return ct.get(c)||null}function Qs(){if(k)return Ys();Mo();let c=P;if(U&&U.ciclo>I.inicio){c=U.tiempos;let Y=new Map;for(let[st,Gt]of P){let Vo=Gt-(U.tiempos.get(st)||0);Vo>0&&Y.set(st,Vo)}P=Y,I={inicio:U.ciclo,clave:I.clave}}else P=new Map,I={inicio:S.ciclos,clave:N};U=null;let x=[...c].filter(([,Y])=>Y>0);x.length||(x=W.length?W:[[N,1]]),W=x;let R=x.reduce((Y,[,st])=>Y+st,0),m=[];for(let[Y,st]of x){let Gt=ve(Y);if(!Gt){m.length=0;break}m.push([Gt,st/R])}let V=m.length?Pi(m):null,et=new Set(Bt.filter(Y=>Y in tt&&S.ciclos-tt[Y]<vs/1e3*Tt));V&&(V.pwm=Di(x,R,et)),oa(V),dt=null;let St=S.ciclos-at>vs/1e3*Tt?1:1-Math.exp(-(R/Tt*1e3)/$i);O=V?Ro(V,O,St):null;let ot=S.estados(),Q=l.length?_.decode(Uint8Array.from(l),{stream:!0}):"";l=[];let it=Do(),j=Eo(),At=gt.foto(vt());if(Ee=O?O.fuentes.reduce((Y,st)=>Y+Math.max(0,st.i),0)+O.pines.reduce((Y,st)=>Y+Math.max(0,st.i),0):0,O){O.usb=j,O.servos=Object.entries(it).map(([st,Gt])=>({id:st,...Gt}));let Y=(O.fuentes.find(st=>st.pin==="5V")||{i:0}).i;O.consumo5V=Y+O.servos.filter(st=>st.fuente==="5V").reduce((st,Gt)=>st+Gt.i,0),Object.assign(O,At.lista,{porVin:te})}let aa=G;return G=[],{msSimulados:vt(),servos:it,piezas:At.piezas,evaluaciones:f,leds:Object.fromEntries((O?O.leds:[]).map(Y=>[Y.id,Y.brillo])),quemados:[...d],voltajes:ta(),entradas:ea(),placa:{led13:ot.D13===bt.High,ledTX:vt()<A,...i?{encendida:!0}:{}},serial:Q,fallas:aa,medicion:O,energia:j}}function Ys(){let c=i?ve(N):null,x=G;return G=[],{msSimulados:vt(),evaluaciones:f,servos:Do(),piezas:gt.foto(vt()).piezas,energia:Eo(),leds:{},quemados:[...d],voltajes:c?.voltajes||{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:x,medicion:null}}function ta(){if(!O)return{};if(!$.size)return O.voltajes;let c={...O.voltajes};for(let x of $)x in c&&(c[x]=null);return c}function ea(){let c={};for(let x of Ds)b.has(x)?c[x]={alto:!!o.entradaFlotante&&!!D[x],alAire:!0}:x in T&&(c[x]={alto:T[x],alAire:!1});return c}function oa(c=O){c&&n.forEach((x,R)=>{for(let m of x){let V=c.voltajes["placa."+m];if(typeof V=="number")return S.ponerAnalogico(R,V)}})}function sa(){d.clear(),E.clear(),z.length=0,G=[],l=[],_=new TextDecoder("utf-8"),A=0,vo(),de(),he(),Vt()}function vo(){w=0,k=!1,_t=0,ht=null,yt=[],L.reiniciar(),q=lt.idealV,fe=0,te=!1,De=!1,i&&(v=Ge(y,Nt(y)),H=we(v,{realista:!!o.limiteUSB}),Pe=H,q=H.v5,k=H.apagada,J&&J.ponerAlimentacion(Le()),ct.clear(),Pt.clear(),dt=null)}return de(),he(),Vt(),{get ciclos(){return w+S.ciclos},avanzar(c){if(k)return zs(c);S.correr(c),De&&$o(),ht&&Xs()},foto:Qs,ponerCircuito(c){let x=k;y=c,he(),i&&!x&&k&&$o({porCarga:!1}),Vt()},ponerMano(c){p=Array.isArray(c)?c.filter(x=>typeof x=="string"):[],wo()},ponerPulsador(c,x){x?h.add(c):h.delete(c),he(),Vt()},enviarSerial:c=>S.enviarSerial(String(c)),reiniciarChip(){vo(),de(),Vt()},reiniciarTodo(){jt=0,sa()},fallas:()=>[...z]}}function Di(t,e,o=new Set){let s={},a=new Set;for(let[r,h]of t)for(let p=0;p<Bt.length;p++){let u=Math.floor(r/Ao[Bt[p]])%4===bt.High;s[p]=(s[p]||0)+(u?h:0),a.add(p)}let i=Bt,n={};for(let r of a){let h=s[r]/e;(h>0&&h<1||o.has(i[r]))&&(n[i[r]]=Math.round(h*1e3)/1e3)}return n}var Bt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ao=Object.fromEntries(Bt.map((t,e)=>[t,4**e]));function Pi(t){if(t.length===1)return t[0][0];let e=t[0][0],o=n=>n.reduce((r,[,h])=>r+h,0),s=n=>{let r=0;for(let[h,p]of t){let u=n(h);if(u==null)return null;r+=p*u}return r},a=(n,r,h)=>[...new Set(t.flatMap(([u])=>u[n].map(b=>b[r])))].map(u=>{let b={[r]:u},g=t.filter(([D])=>D[n].some(C=>C[r]===u)),$=o(g);for(let D of h)D==="i"?b.i=t.reduce((C,[T,S])=>C+S*((T[n].find(y=>y[r]===u)||{i:0}).i||0),0):b[D]=$?g.reduce((C,[T,S])=>C+S*(T[n].find(y=>y[r]===u)[D]||0),0)/$:null;return b}),i={};for(let n of Object.keys(e.voltajes))i[n]=s(r=>r.voltajes[n]);return{convergio:t.every(([n])=>n.convergio),iteraciones:Math.max(...t.map(([n])=>n.iteraciones||0)),voltajes:i,leds:e.leds.map((n,r)=>{let h=s(p=>p.leds[r]?p.leds[r].i:0);return{id:n.id,quemado:t.some(([p])=>p.leds[r]&&p.leds[r].quemado),v:s(p=>p.leds[r]?p.leds[r].v:null),i:h,brillo:Math.max(0,Math.min(1,h*1e3/pt.plenomA))}}),resistencias:e.resistencias.map((n,r)=>({id:n.id,ohmios:n.ohmios,v:s(h=>h.resistencias[r].v),i:s(h=>h.resistencias[r].i),w:s(h=>h.resistencias[r].w)})),pines:a("pines","pin",["v","i"]),fuentes:a("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((n,r)=>({id:n.id,ohmios:n.ohmios,posicion:n.posicion,v:s(h=>h.potenciometros[r].v),i:s(h=>h.potenciometros[r].i)}))}}function Ro(t,e,o){if(typeof t=="number")return typeof e=="number"&&o<1?e+o*(t-e):t;if(Array.isArray(t)){let s=i=>i&&typeof i=="object"?i.id||i.pin:void 0,a=new Map((Array.isArray(e)?e:[]).map(i=>[s(i),i]));return t.map((i,n)=>Ro(i,s(i)!==void 0?a.get(s(i)):(e||[])[n],o))}if(t&&typeof t=="object"){let s={};for(let a of Object.keys(t))s[a]=Ro(t[a],e&&typeof e=="object"?e[a]:void 0,o);return s}return t}function vi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}var Vi=16,Oi=8,Ui=50,ki=500,_e=Tt/1e3,It=null,ye=!1,Os=0,Kt=0,bo=0,Us=0,To=0,Io=!1,le=[],ks=new MessageChannel;ks.port1.onmessage=Ns;function Ns(){Io=!1,Bi()}function Bs(t){Io||(Io=!0,t>0?setTimeout(Ns,t):ks.port2.postMessage(null))}function Ni(t){for(;le.length&&t-le[0][0]>ki;)le.shift();let e=0,o=0;for(let[,s,a]of le)e+=s,o+=a;return e>0?Math.min(1,o/(e*_e)):1}function $e(t=performance.now()){Us=t;let e=It.foto();self.postMessage({tipo:"foto",corrida:Os,...e,velocidad:Ni(t),msReales:To})}function Bi(){if(!ye||!It)return;let t=performance.now(),e=Math.max(0,t-bo);bo=t,To+=e,Kt=Math.min(Kt+e*_e,Ui*_e);let o=performance.now(),s=0;for(;Kt>=1&&performance.now()-o<Oi;){let a=It.ciclos;It.avanzar(Math.min(Math.floor(Kt),_e));let i=It.ciclos-a;Kt-=i,s+=i}le.push([t,e,s]),t-Us>=Vi&&$e(t),Bs(Kt>=_e?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(Os=e.corrida),e.tipo){case"crear":It=Vs({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(It.reiniciarTodo(),To=0),ye=!0,Kt=0,bo=performance.now(),le.length=0,$e(),Bs(0);break;case"pausar":ye=!1;break;case"reiniciar":It.reiniciarChip(),Kt=0,$e();break;case"detener":ye=!1;break;case"circuito":It.ponerCircuito(e.circuito),e.mostrar&&$e();break;case"serial":It.enviarSerial(e.texto);break;case"pulsador":It.ponerPulsador(e.id,e.presionado),ye||$e();break;case"mano":It.ponerMano(e.refs);break}}catch(o){self.postMessage({tipo:"error",mensaje:String(o&&o.message||o)})}};self.postMessage({tipo:"listo"});})();\n';function dn(t={}){let{lienzo:e,hex:o}=t,i=t.placa||e?.circuito?.()?.placa||"uno";if(!It[i])throw new Error(`Este prototipo no simula la placa \xAB${i}\xBB.`);if(!e||typeof e._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");if(e.circuito().placa!==i)throw new Error("El programa y el circuito deben usar la misma placa.");ln(o);let s=t.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(Jc.map(E=>[E,s==="realista"]));Object.assign(c,t.noIdealidades||{});let p=typeof t.alEvento=="function"?t.alEvento:null,n={serial:[],falla:[],estado:[]},l="detenido",x=!0,b=0,m=null,S=0,v={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},_=null,O=0,B=[],k=Yc(gt);k.enviar({tipo:"crear",hex:o,circuito:e.circuito(),activas:c});function gt(E){if(!x)return;if(E.tipo==="error")return console.error("TecnoCircuito:",E.mensaje);if(E.tipo!=="foto"||E.corrida!==b||l==="detenido")return;Object.assign(v,{msSimulados:E.msSimulados,msReales:E.msReales,velocidad:E.velocidad,evaluaciones:E.evaluaciones}),_=E.medicion?{...E.medicion,voltajes:E.voltajes,entradas:E.entradas}:null;for(let nt of E.fallas){B.push(nt),n.falla.forEach(te=>V(te,{tipo:nt.tipo,componente:nt.componente,mensaje:nt.mensaje}));let{mensaje:Te,...wt}=nt;zt("falla",wt)}let Y=E.energia?E.energia.reinicios:0;Y>O&&zt("reinicio_placa",{motivo:E.energia.referencia?"energia_nano":"energia_usb",...E.energia.referencia?{fuente:E.energia.fuente}:{},nuevos:Y-O,total:Y}),O=Y,E.serial&&n.serial.forEach(nt=>V(nt,E.serial)),m=E,S||(S=requestAnimationFrame(Qt))}function Qt(){if(S=0,l==="detenido"||!m)return e._mostrar({simulando:l!=="detenido"});e._mostrar({simulando:!0,leds:m.leds,quemados:m.quemados,voltajes:m.voltajes,servos:m.servos||{},piezas:m.piezas||{},placa:{ledPower:m.placa.encendida!==!1,led13:m.placa.led13,ledTX:m.placa.ledTX}})}function V(E,Y){try{E(Y)}catch(nt){console.error(nt)}}function zt(E,Y){p&&V(p,{t:Date.now(),origen:"simulador",tipo:E,datos:Y})}function bt(E){l=E,n.estado.forEach(Y=>V(Y,E))}return typeof e._alAcercar=="function"&&e._alAcercar(E=>{x&&k.enviar({tipo:"mano",refs:E})}),typeof e._alPulsar=="function"&&e._alPulsar((E,Y)=>{x&&k.enviar({tipo:"pulsador",id:E,presionado:Y})}),e.alCambiar(E=>{x&&k.enviar({tipo:"circuito",circuito:E,mostrar:l!=="detenido",corrida:b})}),{iniciar(){if(!x||l==="corriendo")return;let E=l==="detenido";b++,E&&(B.length=0,_=null,m=null,O=0,Object.assign(v,{msSimulados:0,msReales:0,velocidad:1}),zt("simulacion_iniciada",{placa:i,modo:s})),bt("corriendo"),k.enviar({tipo:"iniciar",nuevo:E,corrida:b})},pausar(){l==="corriendo"&&(b++,k.enviar({tipo:"pausar",corrida:b}),bt("pausado"))},reiniciar(){!x||l==="detenido"||(b++,v.msSimulados=0,k.enviar({tipo:"reiniciar",corrida:b}),k.enviar({tipo:"iniciar",nuevo:!1,corrida:b}),O=0,zt("reinicio_placa",{motivo:"boton"}),bt("reiniciado"),bt("corriendo"))},detener(){l!=="detenido"&&(b++,k.enviar({tipo:"detener",corrida:b}),zt("simulacion_detenida",{ms_simulados:Math.round(v.msSimulados)}),bt("detenido"),_=null,Qt())},serialEnviar(E){l!=="detenido"&&k.enviar({tipo:"serial",texto:String(E)})},alSerial:E=>typeof E=="function"&&n.serial.push(E),alFalla:E=>typeof E=="function"&&n.falla.push(E),alEstado:E=>typeof E=="function"&&n.estado.push(E),medidas:()=>({...v,estado:l,hilo:k.hilo()}),destruir(){x&&(this.detener(),x=!1,cancelAnimationFrame(S),k.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>l==="detenido"||!_?null:{..._,fallas:[...B],modo:s,activas:c},_mediciones(){return this.mediciones()}}}function Yc(t){let e=null,o="worker",i=!1,s=[],c=n=>{if(n&&n.tipo==="listo"){i=!0,s.length=0;return}t(n)};function p(){o="pagina",e=Zc(c),s.splice(0).forEach(n=>e.postMessage(n))}try{if(!Ni||typeof Worker!="function")throw new Error("sin Worker");let n=URL.createObjectURL(new Blob([Ni],{type:"text/javascript"})),l=new Worker(n);l.onmessage=x=>{x.data&&x.data.tipo==="listo"&&URL.revokeObjectURL(n),c(x.data)},l.onerror=x=>{if(i)return console.error("TecnoCircuito:",x.message);x.preventDefault(),l.terminate(),p()},e=l}catch{p()}return{enviar(n){!i&&o==="worker"&&s.push(n),e.postMessage(n)},terminar:()=>e&&e.terminate(),hilo:()=>o}}function Zc(t){let e={onmessage:null,postMessage:o=>setTimeout(()=>t(o))};return new Function("self",Ni)(e),{postMessage:o=>setTimeout(()=>e.onmessage&&e.onmessage({data:o})),terminate:()=>e.onmessage=null}}var Ye=(t,e)=>t.toFixed(e).replace(".",","),xt=t=>t==null?"al aire":Ye(t,2)+" V",Dt=t=>Ye(t*1e3,Math.abs(t)<.01?2:1)+" mA",pn=(t,e)=>(t>=1e3?Ye(t/1e3,e)+" k":t+" ")+"\u03A9",fn=t=>"Pin "+t.replace(/^D/,"");function hn(t){if(!t||!t.leds)return[];let e=(l,x,b,m)=>({pieza:l,voltaje:x||"",corriente:b||"",detalle:m||""}),o=l=>{let x=t.entradas&&t.entradas[l];return x?x.alAire?`al aire: lee ${x.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:x.alto?"lee ALTO":"lee BAJO":""},i=new Set(t.pines.map(l=>l.pin)),s=t.servos||[],c=l=>s.find(x=>x.senal===l&&x.pulso),p=l=>{let x=c(l.pin);if(x)return`se\xF1al de servo: pulso de ${x.pulso} \xB5s`;let b=t.pwm&&t.pwm[l.pin];return b>.005&&b<.995?`PWM ${Math.round(b*100)} %`:o(l.pin)},n=t.usb;return[...t.pines.map(l=>e(fn(l.pin),xt(l.v),Dt(l.i),p(l))),...Object.keys(t.entradas||{}).filter(l=>!i.has(l)&&"placa."+l in t.voltajes).map(l=>e(fn(l)+" (entrada)",xt(t.voltajes["placa."+l]),"",o(l))),...(t.potenciometros||[]).map(l=>e(`${l.id} (${pn(l.ohmios,0)})`,xt(l.v),Dt(l.i),`perilla ${Math.round(l.posicion*100)} %`)),...t.resistencias.map(l=>e(`${l.id} (${pn(l.ohmios,1)})`,xt(l.v),Dt(l.i),Ye(l.w*1e3,1)+" mW")),...t.leds.map(l=>e(l.id,xt(l.v),Dt(l.i),l.quemado?"quemado":`brillo ${Math.round(l.brillo*100)} %`)),...s.map(l=>e(`${l.id} (${l.modelo.toUpperCase()})`,"",Dt(l.i),l.fuente?l.senal?`${Math.round(l.angulo)}\xB0${l.moviendo?", movi\xE9ndose":""}${l.pulso?` \xB7 pulso ${l.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...t.shield?[e(`${t.shield.id}: motores (EXT_PWR)`,xt(t.shield.motoresV),"",t.shield.motoresV<1?"sin energ\xEDa: conecta la bater\xEDa a EXT_PWR":`puente PWR ${t.shield.puente?"puesto":"quitado"}${t.porVin?" \xB7 el Uno toma la energ\xEDa del VIN":""}`)]:[],...(t.motores||[]).map(l=>{let x=Math.abs(l.velocidad),b=Math.sign(l.velocidad)*(l.lado==="derecho"?-1:1)>0?"adelante":"atr\xE1s";return e(`${l.id} (${l.canal||"sin shield"})`,xt(l.voltios),Dt(l.i),Math.abs(l.rpm)<1?"quieto":`${Math.round(Math.abs(l.rpm))} RPM \xB7 ${b} ${Math.round(x)} cm/s`)}),...(t.baterias||[]).map(l=>{let x=l.celdas||[l.voltios/2,l.voltios/2];return e(`${l.id} (LiPo 2S)`,xt(l.voltios),l.conectada?Dt(l.i):"",`celdas ${x.map(b=>Ye(b,2)).join(" y ")} V${Math.min(...x)<Ge.avisoCeldaV?" \xB7 c\xE1rgala":""}${l.conectada?"":" \xB7 sin conectar"}`)}),...(t.probadores||[]).map(l=>e(`${l.id} (probador)`,l.encendido?xt(l.total):"","",l.encendido?`${l.celdas.length}S \xB7 ${l.celdas.map((x,b)=>`${b+1}: ${Ye(x,2)} V`).join(" \xB7 ")}${l.alarma?" \xB7 \xA1pita!":""}`:"apagado: con\xE9ctalo al cable de balance")),...s.length&&!n?.referencia?[e("5V de la placa (USB)","",Dt(t.consumo5V),"el USB da hasta 500 mA")]:[],...n?.referencia?[e("Nano \xB7 alimentaci\xF3n",xt(n.voltios),Dt(n.amperios),`${n.fuente==="jack"?"jack de la expansi\xF3n":n.fuente==="apagada"?"desconectada":"USB"} \xB7 modelo de referencia por validar${n.apagada?" \xB7 placa apagada":""}`),e("Nano \xB7 3,3V del m\xF3dulo",xt(n.voltios3V3),"","salida del m\xF3dulo"),...n.expansion?[e("Expansi\xF3n \xB7 3,3V",xt(n.voltios3V3Expansion),"","regulaci\xF3n externa \xB7 red separada del m\xF3dulo")]:[],...n.fuente==="jack"?[e(n.expansion?"Expansi\xF3n \xB7 jack":"Nano \xB7 VIN",xt(n.voltiosJack),"","entrada del regulador de referencia")]:[]]:[],...n&&!n.referencia&&(s.length||n.reinicios||n.pico>.2)?[e("USB (placa y circuito)",xt(n.voltios),Dt(n.amperios),`pico ${Dt(n.pico)} \xB7 fusible ${Math.round(n.fusible*100)} %${n.reinicios?` \xB7 ${n.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.1.0-dev",CONTRATO:1,PLACAS:Object.freeze(Object.keys(It)),crearLienzo:nn,crearSimulador:dn,filasDeMediciones:hn});})();
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
