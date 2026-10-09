(()=>{var ve=globalThis,$e=ve.ShadowRoot&&(ve.ShadyCSS===void 0||ve.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ke=Symbol(),Yo=new WeakMap,Xt=class{constructor(t,r,n){if(this._$cssResult$=!0,n!==Ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if($e&&t===void 0){let n=r!==void 0&&r.length===1;n&&(t=Yo.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Yo.set(r,t))}return t}toString(){return this.cssText}},Ko=o=>new Xt(typeof o=="string"?o:o+"",void 0,Ke),tt=(o,...t)=>{let r=o.length===1?o[0]:t.reduce((n,i,l)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[l+1],o[0]);return new Xt(r,o,Ke)},Jo=(o,t)=>{if($e)o.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of t){let n=document.createElement("style"),i=ve.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,o.appendChild(n)}},Je=$e?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let r="";for(let n of t.cssRules)r+=n.cssText;return Ko(r)})(o):o;var{is:un,defineProperty:fn,getOwnPropertyDescriptor:hn,getOwnPropertyNames:mn,getOwnPropertySymbols:gn,getPrototypeOf:bn}=Object,we=globalThis,Zo=we.trustedTypes,yn=Zo?Zo.emptyScript:"",xn=we.reactiveElementPolyfillSupport,Wt=(o,t)=>o,Yt={toAttribute(o,t){switch(t){case Boolean:o=o?yn:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let r=o;switch(t){case Boolean:r=o!==null;break;case Number:r=o===null?null:Number(o);break;case Object:case Array:try{r=JSON.parse(o)}catch{r=null}}return r}},Ae=(o,t)=>!un(o,t),Qo={attribute:!0,type:String,converter:Yt,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??=Symbol("metadata"),we.litPropertyMetadata??=new WeakMap;var at=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=Qo){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,r);i!==void 0&&fn(this.prototype,t,i)}}static getPropertyDescriptor(t,r,n){let{get:i,set:l}=hn(this.prototype,t)??{get(){return this[r]},set(a){this[r]=a}};return{get:i,set(a){let u=i?.call(this);l?.call(this,a),this.requestUpdate(t,u,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qo}static _$Ei(){if(this.hasOwnProperty(Wt("elementProperties")))return;let t=bn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Wt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Wt("properties"))){let r=this.properties,n=[...mn(r),...gn(r)];for(let i of n)this.createProperty(i,r[i])}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[n,i]of r)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[r,n]of this.elementProperties){let i=this._$Eu(r,n);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)r.unshift(Je(i))}else t!==void 0&&r.push(Je(t));return r}static _$Eu(t,r){let n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let n of r.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,n){this._$AK(t,n)}_$ET(t,r){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let l=(n.converter?.toAttribute!==void 0?n.converter:Yt).toAttribute(r,n.type);this._$Em=t,l==null?this.removeAttribute(i):this.setAttribute(i,l),this._$Em=null}}_$AK(t,r){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let l=n.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:Yt;this._$Em=i;let u=a.fromAttribute(r,l.type);this[i]=u??this._$Ej?.get(i)??u,this._$Em=null}}requestUpdate(t,r,n,i=!1,l){if(t!==void 0){let a=this.constructor;if(i===!1&&(l=this[t]),n??=a.getPropertyOptions(t),!((n.hasChanged??Ae)(l,r)||n.useDefault&&n.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,n))))return;this.C(t,r,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:n,reflect:i,wrapped:l},a){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??r??this[t]),l!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(r=void 0),this._$AL.set(t,r)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,l]of this._$Ep)this[i]=l;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,l]of n){let{wrapped:a}=l,u=this[i];a!==!0||this._$AL.has(i)||u===void 0||this.C(i,void 0,l,u)}}let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(r)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(t){}firstUpdated(t){}};at.elementStyles=[],at.shadowRootOptions={mode:"open"},at[Wt("elementProperties")]=new Map,at[Wt("finalized")]=new Map,xn?.({ReactiveElement:at}),(we.reactiveElementVersions??=[]).push("2.1.2");var no=globalThis,tr=o=>o,_e=no.trustedTypes,er=_e?_e.createPolicy("lit-html",{createHTML:o=>o}):void 0,ar="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,cr="?"+gt,vn=`<${cr}>`,Et=document,Jt=()=>Et.createComment(""),Zt=o=>o===null||typeof o!="object"&&typeof o!="function",so=Array.isArray,$n=o=>so(o)||typeof o?.[Symbol.iterator]=="function",Ze=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,or=/-->/g,rr=/>/g,_t=RegExp(`>|${Ze}(?:([^\\s"'>=/]+)(${Ze}*=${Ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nr=/'/g,sr=/"/g,lr=/^(?:script|style|textarea|title)$/i,io=o=>(t,...r)=>({_$litType$:o,strings:t,values:r}),Y=io(1),lt=io(2),rs=io(3),ct=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),ir=new WeakMap,St=Et.createTreeWalker(Et,129);function pr(o,t){if(!so(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return er!==void 0?er.createHTML(t):t}var wn=(o,t)=>{let r=o.length-1,n=[],i,l=t===2?"<svg>":t===3?"<math>":"",a=Kt;for(let u=0;u<r;u++){let p=o[u],m,v,x=-1,$=0;for(;$<p.length&&(a.lastIndex=$,v=a.exec(p),v!==null);)$=a.lastIndex,a===Kt?v[1]==="!--"?a=or:v[1]!==void 0?a=rr:v[2]!==void 0?(lr.test(v[2])&&(i=RegExp("</"+v[2],"g")),a=_t):v[3]!==void 0&&(a=_t):a===_t?v[0]===">"?(a=i??Kt,x=-1):v[1]===void 0?x=-2:(x=a.lastIndex-v[2].length,m=v[1],a=v[3]===void 0?_t:v[3]==='"'?sr:nr):a===sr||a===nr?a=_t:a===or||a===rr?a=Kt:(a=_t,i=void 0);let M=a===_t&&o[u+1].startsWith("/>")?" ":"";l+=a===Kt?p+vn:x>=0?(n.push(m),p.slice(0,x)+ar+p.slice(x)+gt+M):p+gt+(x===-2?u:M)}return[pr(o,l+(o[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Qt=class o{constructor({strings:t,_$litType$:r},n){let i;this.parts=[];let l=0,a=0,u=t.length-1,p=this.parts,[m,v]=wn(t,r);if(this.el=o.createElement(m,n),St.currentNode=this.el.content,r===2||r===3){let x=this.el.content.firstChild;x.replaceWith(...x.childNodes)}for(;(i=St.nextNode())!==null&&p.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(let x of i.getAttributeNames())if(x.endsWith(ar)){let $=v[a++],M=i.getAttribute(x).split(gt),b=/([.?@])?(.*)/.exec($);p.push({type:1,index:l,name:b[2],strings:M,ctor:b[1]==="."?to:b[1]==="?"?eo:b[1]==="@"?oo:Nt}),i.removeAttribute(x)}else x.startsWith(gt)&&(p.push({type:6,index:l}),i.removeAttribute(x));if(lr.test(i.tagName)){let x=i.textContent.split(gt),$=x.length-1;if($>0){i.textContent=_e?_e.emptyScript:"";for(let M=0;M<$;M++)i.append(x[M],Jt()),St.nextNode(),p.push({type:2,index:++l});i.append(x[$],Jt())}}}else if(i.nodeType===8)if(i.data===cr)p.push({type:2,index:l});else{let x=-1;for(;(x=i.data.indexOf(gt,x+1))!==-1;)p.push({type:7,index:l}),x+=gt.length-1}l++}}static createElement(t,r){let n=Et.createElement("template");return n.innerHTML=t,n}};function Dt(o,t,r=o,n){if(t===ct)return t;let i=n!==void 0?r._$Co?.[n]:r._$Cl,l=Zt(t)?void 0:t._$litDirective$;return i?.constructor!==l&&(i?._$AO?.(!1),l===void 0?i=void 0:(i=new l(o),i._$AT(o,r,n)),n!==void 0?(r._$Co??=[])[n]=i:r._$Cl=i),i!==void 0&&(t=Dt(o,i._$AS(o,t.values),i,n)),t}var Qe=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,i=(t?.creationScope??Et).importNode(r,!0);St.currentNode=i;let l=St.nextNode(),a=0,u=0,p=n[0];for(;p!==void 0;){if(a===p.index){let m;p.type===2?m=new te(l,l.nextSibling,this,t):p.type===1?m=new p.ctor(l,p.name,p.strings,this,t):p.type===6&&(m=new ro(l,this,t)),this._$AV.push(m),p=n[++u]}a!==p?.index&&(l=St.nextNode(),a++)}return St.currentNode=Et,i}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},te=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Dt(this,t,r),Zt(t)?t===I||t==null||t===""?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==ct&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$n(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Et.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Qt.createElement(pr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(r);else{let l=new Qe(i,this),a=l.u(this.options);l.p(r),this.T(a),this._$AH=l}}_$AC(t){let r=ir.get(t.strings);return r===void 0&&ir.set(t.strings,r=new Qt(t)),r}k(t){so(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,i=0;for(let l of t)i===r.length?r.push(n=new o(this.O(Jt()),this.O(Jt()),this,this.options)):n=r[i],n._$AI(l),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=tr(t).nextSibling;tr(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,i,l){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=l,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=I}_$AI(t,r=this,n,i){let l=this.strings,a=!1;if(l===void 0)t=Dt(this,t,r,0),a=!Zt(t)||t!==this._$AH&&t!==ct,a&&(this._$AH=t);else{let u=t,p,m;for(t=l[0],p=0;p<l.length-1;p++)m=Dt(this,u[n+p],r,p),m===ct&&(m=this._$AH[p]),a||=!Zt(m)||m!==this._$AH[p],m===I?t=I:t!==I&&(t+=(m??"")+l[p+1]),this._$AH[p]=m}a&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},to=class extends Nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}},eo=class extends Nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}},oo=class extends Nt{constructor(t,r,n,i,l){super(t,r,n,i,l),this.type=5}_$AI(t,r=this){if((t=Dt(this,t,r,0)??I)===ct)return;let n=this._$AH,i=t===I&&n!==I||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,l=t!==I&&(n===I||i);i&&this.element.removeEventListener(this.name,this,n),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ro=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Dt(this,t)}};var An=no.litHtmlPolyfillSupport;An?.(Qt,te),(no.litHtmlVersions??=[]).push("3.3.3");var dr=(o,t,r)=>{let n=r?.renderBefore??t,i=n._$litPart$;if(i===void 0){let l=r?.renderBefore??null;n._$litPart$=i=new te(t.insertBefore(Jt(),l),l,void 0,r??{})}return i._$AI(o),i};var ao=globalThis,q=class extends at{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=dr(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ct}};q._$litElement$=!0,q.finalized=!0,ao.litElementHydrateSupport?.({LitElement:q});var _n=ao.litElementPolyfillSupport;_n?.({LitElement:q});(ao.litElementVersions??=[]).push("4.2.2");var st=o=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Sn={attribute:!0,type:String,converter:Yt,reflect:!1,hasChanged:Ae},En=(o=Sn,t,r)=>{let{kind:n,metadata:i}=r,l=globalThis.litPropertyMetadata.get(i);if(l===void 0&&globalThis.litPropertyMetadata.set(i,l=new Map),n==="setter"&&((o=Object.create(o)).wrapped=!0),l.set(r.name,o),n==="accessor"){let{name:a}=r;return{set(u){let p=t.get.call(this);t.set.call(this,u),this.requestUpdate(a,p,o,!0,u)},init(u){return u!==void 0&&this.C(a,void 0,o,u),u}}}if(n==="setter"){let{name:a}=r;return function(u){let p=this[a];t.call(this,u),this.requestUpdate(a,p,o,!0,u)}}throw Error("Unsupported decorator location: "+n)};function D(o){return(t,r)=>typeof r=="object"?En(o,t,r):((n,i,l)=>{let a=i.hasOwnProperty(l);return i.constructor.createProperty(l,n),a?Object.getOwnPropertyDescriptor(i,l):void 0})(o,t,r)}var Ct=(o,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,r),r);function ur(o,t){return(r,n,i)=>{let l=a=>a.renderRoot?.querySelector(o)??null;if(t){let{get:a,set:u}=typeof n=="object"?r:i??(()=>{let p=Symbol();return{get(){return this[p]},set(m){this[p]=m}}})();return Ct(r,n,{get(){let p=a.call(this);return p===void 0&&(p=l(this),(p!==null||this.hasUpdated)&&u.call(this,p)),p}})}return Ct(r,n,{get(){return l(this)}})}}var fr=lt`
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
`;var et=o=>({type:"analog",channel:o}),ee=(o,t=0)=>({type:"i2c",signal:o,bus:t}),oe=(o,t=0)=>({type:"spi",signal:o,bus:t}),co=(o,t=0)=>({type:"usart",signal:o,bus:t});var Tt=[" ","Spacebar"];function Cn(){return typeof navigator=="object"?navigator.userAgent:""}function Mn(){return Cn().indexOf("Macintosh")>=0}function hr(o){return Mn()?o.metaKey:o.ctrlKey}var Mt=function(o,t,r,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,t,r,n);else for(var u=o.length-1;u>=0;u--)(a=o[u])&&(l=(i<3?a(l):i>3?a(t,r,l):a(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l},bt=class extends q{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[et(5),ee("SCL")]},{name:"A4.2",x:97,y:9,signals:[et(4),ee("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[oe("SCK")]},{name:"12",x:134.5,y:9,signals:[oe("MISO")]},{name:"11",x:144,y:9,signals:[oe("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[oe("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[co("TX")]},{name:"0",x:255.5,y:9,signals:[co("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[et(0)]},{name:"A1",x:217.5,y:191.5,signals:[et(1)]},{name:"A2",x:227,y:191.5,signals:[et(2)]},{name:"A3",x:236.5,y:191.5,signals:[et(3)]},{name:"A4",x:246,y:191.5,signals:[et(4),ee("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[et(5),ee("SCL")]}]}static get styles(){return tt`
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
    `}render(){let{ledPower:t,led13:r,ledRX:n,ledTX:i}=this;return Y`
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

        ${fr}

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
          @keydown=${l=>Tt.includes(l.key)&&this.down()}
          @keyup=${l=>Tt.includes(l.key)&&this.up()}
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
          ${t&&lt`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${r&&lt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${i&&lt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${n&&lt`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};Mt([D()],bt.prototype,"led13",void 0);Mt([D()],bt.prototype,"ledRX",void 0);Mt([D()],bt.prototype,"ledTX",void 0);Mt([D()],bt.prototype,"ledPower",void 0);Mt([D()],bt.prototype,"resetPressed",void 0);Mt([ur("#reset-button")],bt.prototype,"resetButton",void 0);bt=Mt([st("wokwi-arduino-uno")],bt);var mr=function(o,t,r,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,t,r,n);else for(var u=o.length-1;u>=0;u--)(a=o[u])&&(l=(i<3?a(l):i>3?a(t,r,l):a(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l},lo={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},po=class extends q{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return tt`
      :host {
        display: flex;
      }
    `}breakValue(t){let r=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,n=Math.round(t/10**r);return t===0?[0,0]:[Math.round(n%100),r]}render(){let{value:t}=this,r=parseFloat(t),[n,i]=this.breakValue(r),l=lo[Math.floor(n/10)],a=lo[n%10],u=lo[i];return Y`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${a}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${u}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};mr([D()],po.prototype,"value",void 0);po=mr([st("wokwi-resistor")],po);var Pt=function(o,t,r,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,t,r,n);else for(var u=o.length-1;u>=0;u--)(a=o[u])&&(l=(i<3?a(l):i>3?a(t,r,l):a(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l},Pn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},yt=class extends q{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,r=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:r,y:42,signals:[],description:"Cathode"}]}static get styles(){return tt`
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
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:r,flip:n}=this,i=r||Pn[t?.toLowerCase()]||t,l=this.brightness?.3+this.brightness*.7:0,a=this.value&&this.brightness>Number.EPSILON;return Y`<svg
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
      <g class="light" style="display: ${a?"":"none"}">
        <ellipse
          cx="8"
          cy="10"
          rx="10"
          ry="10"
          fill="${i}"
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
    </svg> `}render(){return Y`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};Pt([D()],yt.prototype,"value",void 0);Pt([D()],yt.prototype,"brightness",void 0);Pt([D()],yt.prototype,"color",void 0);Pt([D()],yt.prototype,"lightColor",void 0);Pt([D()],yt.prototype,"label",void 0);Pt([D({type:Boolean})],yt.prototype,"flip",void 0);yt=Pt([st("wokwi-led")],yt);var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},br=o=>(...t)=>({_$litDirective$:o,values:t}),Se=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var yr="important",kn=" !"+yr,xr=br(class extends Se{constructor(o){if(super(o),o.type!==gr.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,r)=>{let n=o[r];return n==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(o,[t]){let{style:r}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?r.removeProperty(n):r[n]=null);for(let n in t){let i=t[n];if(i!=null){this.ft.add(n);let l=typeof i=="string"&&i.endsWith(kn);n.includes("-")||l?r.setProperty(n,l?i.slice(0,-11):i,l?yr:""):r[n]=i}}return ct}});var Ee=(o,t,r)=>{let n=Math.min(r,t);return Math.max(n,o)};function vr(o,t){let r=t.transformPoint({x:o.left,y:o.top}),n=t.transformPoint({x:o.right,y:o.top}),i=t.transformPoint({x:o.left,y:o.bottom}),l=t.transformPoint({x:o.right,y:o.bottom}),a=Math.min(r.x,n.x,i.x,l.x),u=Math.min(r.y,n.y,i.y,l.y),p=Math.max(r.x,n.x,i.x,l.x),m=Math.max(r.y,n.y,i.y,l.y);return new DOMRect(a,u,p-a,m-u)}function $r(o,t,r){let{userAgent:n}=navigator;if(n.indexOf("Epiphany")>=0||n.indexOf("Safari")>=0){let l=o.getCTM(),a=t?.getCTM(),u=t?.getBoundingClientRect(),p=t?.ownerSVGElement?.getBoundingClientRect();if(!u||!p||!a||!l)return null;let m=p.x+p.width/2,v=p.y+p.height/2,x=m-(u.x+u.width/2),$=v-(u.y+u.height/2),M=Math.atan2($,x)/Math.PI*180,b=new DOMMatrix().rotate(M),y=vr(r,b),T=y.width/u.width,O=y.height/u.height,G=a.inverse().multiply(l);return b.inverse().translate(y.left,y.top).multiply(G.inverse()).scale(T,O).translate(-u.left,-u.top)}else return o.getScreenCTM()?.inverse()||null}var kt=function(o,t,r,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,t,r,n);else for(var u=o.length-1;u>=0;u--)(a=o[u])&&(l=(i<3?a(l):i>3?a(t,r,l):a(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l},Ce={x:9.91,y:8.18},xt=class extends q{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[et(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return tt`
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
    `}mapToMinMax(t,r,n){return t*(n-r)+r}percentFromMinMax(t,r,n){return(t-r)/(n-r)}renderSVG(){let t=Ee(0,1,this.percentFromMinMax(this.value,this.min,this.max)),r=(this.endDegree-this.startDegree)*t+this.startDegree;return Y`<svg
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
      style=${xr({"--knob-angle":r+"deg"})}
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
        cx=${Ce.x}
        cy=${Ce.y}
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
    </svg>`}render(){return Y`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let r=t.target;this.updateValue(parseFloat(r.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:r}=this;r&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),r=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&r?$r(t,r,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let r=t.type==="touchmove",n=r?t.touches[0].pageX:t.pageX,i=r?t.touches[0].pageY:t.pageY,l=new DOMPointReadOnly(n,i).matrixTransform(this.pageToKnobMatrix),a=Ce.x-l.x,u=Ce.y-l.y,p=Math.round(Math.atan2(u,a)*180/Math.PI);p<0&&(p+=360),p-=90,a>0&&u<=0&&p>0&&(p-=360),p=Ee(this.startDegree,this.endDegree,p);let m=this.percentFromMinMax(p,this.startDegree,this.endDegree),v=this.mapToMinMax(m,this.min,this.max);this.updateValue(v)}updateValue(t){let r=Ee(this.min,this.max,t),n=Math.round(r/this.step)*this.step;this.value=Math.round(n*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};kt([D({type:Number})],xt.prototype,"min",void 0);kt([D({type:Number})],xt.prototype,"max",void 0);kt([D()],xt.prototype,"value",void 0);kt([D()],xt.prototype,"step",void 0);kt([D()],xt.prototype,"startDegree",void 0);kt([D()],xt.prototype,"endDegree",void 0);xt=kt([st("wokwi-potentiometer")],xt);var re=function(o,t,r,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,t,r,n);else for(var u=o.length-1;u>=0;u--)(a=o[u])&&(l=(i<3?a(l):i>3?a(t,r,l):a(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l},uo,Lt=class extends q{static{uo=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+uo.pushbuttonCounter++}static get styles(){return tt`
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
    `}renderSVG(){let{color:t,uniqueId:r,xray:n}=this,i=this.pressed?`url(#grad-down-${r})`:`url(#grad-up-${r})`;return Y`<svg
      width="17.802mm"
      height="12mm"
      version="1.1"
      viewBox="-3 0 18 12"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="grad-up-${r}" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="grad-down-${r}" x1="1" x2="0" y1="1" y2="0">
          <stop stop-color="#ffffff" offset="0" />
          <stop stop-color="${t}" offset="0.3" />
          <stop stop-color="${t}" offset="0.5" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="12" height="12" rx=".44" ry=".44" fill="#464646" />
      <rect x=".75" y=".75" width="10.5" height="10.5" rx=".211" ry=".211" fill="#eaeaea" />
      ${n?lt`
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
          fill="url(#grad-down-${r})"
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
    </svg>`}render(){let{color:t,label:r}=this;return Y`
      <button
        aria-label="${r} ${t} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${n=>Tt.includes(n.key)&&this.down()}
        @keyup=${n=>Tt.includes(n.key)&&this.up(n)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(t){this.pressed&&(hr(t)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(t){this.sticky||this.up(t)}};re([D()],Lt.prototype,"color",void 0);re([D()],Lt.prototype,"pressed",void 0);re([D()],Lt.prototype,"label",void 0);re([D({type:Boolean,attribute:"xray"})],Lt.prototype,"xray",void 0);Lt=uo=re([st("wokwi-pushbutton")],Lt);var wr=`:host {
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
`;var Ot={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var N=9.6/2.54,z=57.6,Me=14.4,Ar={x:Me,ancho:32.2*N},ot={x:Me+(32.2-22.2)/2*N,ancho:22.2*N,alto:11.8*N},zt={x:ot.x+5.9*N,y:z},fo=13.5*N,It=182.4,ke={ancho:201.6,alto:86.4},Pe={GND:{x:It,y:z-9.6,color:"#7a4a24"},VCC:{x:It,y:z,color:"#d7263d"},SIG:{x:It,y:z+9.6,color:"#f28c28"}},E=o=>Math.round(o*100)/100,ho=o=>`rotate(${E(-o)} ${E(zt.x)} ${E(zt.y)})`;function mo(o="sg90",t=90){let r=Ot[o]||Ot.sg90,{ancho:n,alto:i}=ke,l=z-ot.alto/2,a=E(zt.x),u=ot.x+ot.ancho,p=o==="sg90",m=Object.values(Pe).map(($,M)=>{let b=z-4+M*4;return`<path d="M${E(u)} ${E(b)} C ${E(u+26)} ${E(b)}, ${E(It-34)} ${E($.y)}, ${E(It-9)} ${E($.y)}" fill="none" stroke="${$.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),v=Object.values(Pe).map($=>`<rect x="${E($.x-2.2)}" y="${E($.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),x=p?`<circle cx="${E(ot.x+15*N)}" cy="${z}" r="${E(3.6*N)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${E(ot.x+9.5*N)}" cy="${E(z+2.2*N)}" r="${E(2.2*N)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${i}" viewBox="0 0 ${n} ${i}"><title>Servo ${r.nombre}</title>`+m+`<rect x="${E(It-9)}" y="${E(z-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+v+`<rect x="${E(Ar.x)}" y="${E(l+1.5)}" width="${E(Ar.ancho)}" height="${E(ot.alto-3)}" rx="3" fill="${r.cuerpo}" fill-opacity="${p?.75:1}" stroke="${r.borde}" stroke-width="1"/><circle cx="${E(Me+2.4*N)}" cy="${z}" r="${E(1*N)}" fill="#ffffff" stroke="${r.borde}" stroke-width="0.8"/><circle cx="${E(Me+(32.2-2.4)*N)}" cy="${z}" r="${E(1*N)}" fill="#ffffff" stroke="${r.borde}" stroke-width="0.8"/><rect x="${E(ot.x)}" y="${E(l)}" width="${E(ot.ancho)}" height="${E(ot.alto)}" rx="2.5" fill="${r.cuerpo}" fill-opacity="${p?.85:1}" stroke="${r.borde}" stroke-width="1.2"/>`+x+`<text x="${E(ot.x+15.5*N)}" y="${E(z+4.1*N)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${r.nombre}</text><circle cx="${a}" cy="${z}" r="${E(5.2*N)}" fill="${r.cuerpo}" stroke="${r.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${ho(t)}"><path d="M${a} ${E(z-3.2*N/2-1)} L${E(zt.x+fo)} ${E(z-1.1*N)} A ${E(1.1*N)} ${E(1.1*N)} 0 0 1 ${E(zt.x+fo)} ${E(z+1.1*N)} L${a} ${E(z+3.2*N/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${a}" cy="${z}" r="${E(3.4*N)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map($=>`<circle cx="${E(zt.x+fo*$)}" cy="${z}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${a}" cy="${z}" r="${E(1.3*N)}" fill="${r.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var Vt={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},go=Object.keys(Vt),_r={marron:"marr\xF3n",morado:"violeta"};function bo(o,t){let r=[o,t];return r.some(n=>/^placa\.GND/.test(n)||/^protoboard\.[si]-/.test(n))?"negro":r.some(n=>/^placa\.(5V|3V3|VIN)$/.test(n)||/^protoboard\.[si]\+/.test(n))?"rojo":"verde"}var Rn=["3","5","6","9","10","11"],qt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(o){return/^\d+$/.test(o)?"D"+o:o.startsWith("GND.")?"GND"+o.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[o]||o},rotulo(o){return o==="D0"?"Pin 0 \xB7 RX del monitor serial":o==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(o)?"Pin "+o.slice(1)+(Rn.includes(o.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(o)?o+" \xB7 entrada anal\xF3gica":o.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[o]||o}}},K={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:o=>({1:"1",2:"2"})[o],rotulo:o=>"pata "+o,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(o,t){o.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:o=>({A:"anodo",C:"catodo"})[o],rotulo:o=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[o]||o,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(o,t){o.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:o=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[o],rotulo:o=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[o]||o,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(o,t){o.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[t.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:ke.ancho,alto:ke.alto,pines:Pe,svg:o=>mo(o.modelo,90)},rotulo:o=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[o]||o,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Ot).map(([o,t])=>[o,`${t.nombre} (engranajes de ${t.engranajes})`])},aplicar(o,t){let r=new DOMParser().parseFromString(mo(t.modelo,90),"image/svg+xml").documentElement;o.replaceChildren(...[...r.childNodes].map(n=>o.ownerDocument.importNode(n,!0)))},mostrar(o,t){let r=o.querySelector("[data-brazo]");r&&r.setAttribute("transform",ho(t&&typeof t.angulo=="number"?t.angulo:90))}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:o=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[o],rotulo:o=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[o]||o,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(o,t){o.min=0,o.max=100,o.value=Math.round((Number(t.posicion)||0)*100)}}};var Oe=["a","b","c","d","e"],Sr=["f","g","h","i","j"],U={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Er=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],pt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ne=o=>14.4+(o-1)*9.6,jn=o=>o>=2&&(o-1)%6!==0,yo=new Map;function se(o="media"){if(yo.has(o))return yo.get(o);let t=pt[o]||pt.media,r=[];yo.set(o,r);for(let n=1;n<=t.columnas;n++){for(let i of Oe)r.push({nombre:i+n,x:ne(n),y:U[i],tira:"arriba"+n});for(let i of Sr)r.push({nombre:i+n,x:ne(n),y:U[i],tira:"abajo"+n});for(let[i]of Er)jn(n)&&r.push({nombre:i+n,x:ne(n),y:U[i],tira:i})}return r}var xo=new Map;function Cr(o="media"){if(xo.has(o))return xo.get(o);let t=new Map;xo.set(o,t);for(let r of se(o))t.has(r.tira)||t.set(r.tira,[]),t.get(r.tira).push(r.nombre);return t}function vo(o){let t=/^([si][+-])\d+$/.exec(o);if(t)return t[1];let r=/^([a-j])(\d+)$/.exec(o);return r?(Oe.includes(r[1])?"arriba":"abajo")+r[2]:null}function Mr(o){let t=/^([si])([+-])(\d+)$/.exec(o);if(t){let l=t[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${t[2]==="+"?"+":"\u2212"} ${l} \xB7 todo el riel est\xE1 unido`}let r=/^([a-j])(\d+)$/.exec(o);if(!r)return"Protoboard";let[n,i]=Oe.includes(r[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${r[1]}${r[2]} \xB7 unido por dentro con ${n}${r[2]}\u2013${i}${r[2]}`}function Pr(o="media"){let t=pt[o]||pt.media,{ancho:r,alto:n,columnas:i}=t,l=[];l.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${n}" viewBox="0 0 ${r} ${n}">`),l.push(`<rect x="0.5" y="0.5" width="${r-1}" height="${n-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),l.push(`<rect x="2" y="${(U.e+U.f)/2-4}" width="${r-4}" height="8" fill="#e2dfd4"/>`);let a=(p,m)=>l.push(`<line x1="${14.4-6}" y1="${p}" x2="${r-14.4+6}" y2="${p}" stroke="${m}" stroke-width="1.2"/>`);a(U["s+"]-5.5,"#d7263d"),a(U["s-"]+5.5,"#2f6fde"),a(U["i-"]-5.5,"#2f6fde"),a(U["i+"]+5.5,"#d7263d");let u=(p,m,v,x="#8a867a",$=5.5)=>l.push(`<text x="${p}" y="${m}" font-family="sans-serif" font-size="${$}" font-weight="700" fill="${x}" text-anchor="middle">${v}</text>`);for(let[p,,m]of Er){let v=m==="+"?"#d7263d":"#2f6fde";u(5.2,U[p]+2.2,m,v,7),u(r-5.2,U[p]+2.2,m,v,7)}for(let p=1;p<=i;p++)(p===1||p%5===0)&&(u(ne(p),U.a-6.2,p),u(ne(p),U.j+10.4,p));for(let p of[...Oe,...Sr])u(5.2,U[p]+2,p),u(r-5.2,U[p]+2,p);for(let p of se(o))l.push(`<rect x="${(p.x-1.7).toFixed(2)}" y="${(p.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return l.push("</svg>"),l.join("")}function kr(o,{tipo:t="media",ocupados:r=new Set,tolerancia:n=3.5}={}){if(!o.length)return null;let i=se(t),l=(x,$)=>{let M=null,b=1/0;for(let y of i){let T=Math.hypot(y.x-x,y.y-$);T<b&&(b=T,M=y)}return{hueco:M,distancia:b}},a=l(o[0].x,o[0].y);if(a.distancia>9.6)return null;let u=a.hueco.x-o[0].x,p=a.hueco.y-o[0].y,m={},v=new Set;for(let x of o){let{hueco:$,distancia:M}=l(x.x+u,x.y+p);if(M>n||r.has($.nombre)||v.has($.nombre))return null;m[x.nombre]=$.nombre,v.add($.nombre)}return{dx:u,dy:p,en:m}}var Dn=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Or(o,{presionados:t=new Set,conduccion:r=!1}={}){let n=new Map,i=a=>{for(n.has(a)||n.set(a,a);n.get(a)!==a;)n.set(a,n.get(n.get(a))),a=n.get(a);return a},l=(a,u)=>n.set(i(a),i(u));for(let a of Dn)a.forEach(u=>l("placa."+a[0],"placa."+u));for(let a of o.cables)l(a.de,a.a);if(o.protoboard){for(let a of Cr(o.protoboard.tipo).values())a.forEach(u=>l("protoboard."+a[0],"protoboard."+u));for(let a of o.componentes)if(a.en)for(let[u,p]of Object.entries(a.en))l(a.id+"."+u,p)}for(let a of o.componentes)a.tipo==="pulsador"?(l(a.id+".1i",a.id+".1d"),l(a.id+".2i",a.id+".2d"),t.has(a.id)&&l(a.id+".1i",a.id+".2i")):r&&a.tipo==="resistencia"?l(a.id+".1",a.id+".2"):r&&a.tipo==="potenciometro"&&(l(a.id+".GND",a.id+".SIG"),l(a.id+".SIG",a.id+".VCC"));return i}var jr=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Nn=Object.fromEntries(jr.flatMap(o=>Object.entries(o.pines).map(([t,r])=>[t,{ref:o.ref,pad:r}]))),Tn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},Ln=["GND","+5V","+3V3","VIN"],Rr=o=>o>=1e3?+(o/1e3).toFixed(2)+"k":String(o),Re={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:o=>Rr(Number(o.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:o=>"LED "+(o.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:o=>"Servo "+(Ot[o.modelo]||Ot.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:o=>Rr(Number(o.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},B=o=>'"'+String(o).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function zn(o){let r=[2166136261,16777619,2654435769,2246822507].map(n=>{let i=n>>>0;for(let l=0;l<o.length;l++)i=Math.imul(i^o.charCodeAt(l),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20,32)}`}function Dr(o,{nombre:t="Circuito",fecha:r=new Date().toISOString().slice(0,19),herramienta:n="TecnoCircuito"}={}){let i=o.componentes.filter(b=>Re[b.tipo]).map(b=>({...b})),l={};for(let b of i){let y=Re[b.tipo];l[y.ref]=(l[y.ref]||0)+1,b.ref=y.ref+l[y.ref]}let a=Or(o),u=new Map,p=(b,y,T,O)=>{let G=a(b);u.has(G)||u.set(G,{pads:new Map,uno:new Set});let Q=u.get(G);Q.pads.set(y+" "+T,{ref:y,pad:T,pinUno:O}),O&&Q.uno.add(Tn[O]||O)},m=new Set(o.cables.flatMap(b=>[b.de,b.a]));for(let[b,{ref:y,pad:T}]of Object.entries(Nn))m.has("placa."+b)&&p("placa."+b,y,T,b);for(let b of i)for(let[y,T]of Object.entries(Re[b.tipo].pads))p(b.id+"."+y,b.ref,T,null);let v=(b,y)=>b.localeCompare(y,"en",{numeric:!0}),x=[...u.values()].filter(b=>b.pads.size>=2).map(b=>{let y=[...b.pads.values()].sort((O,G)=>v(O.ref,G.ref)||v(O.pad,G.pad));return{nombre:Ln.find(O=>b.uno.has(O))||[...b.uno].sort(v)[0]||`Net-(${y[0].ref}-Pad${y[0].pad})`,pads:y}}).sort((b,y)=>v(b.nombre,y.nombre)),$=[],M=(b,y,T,O,G,Q,ut)=>$.push("		(comp",`			(ref ${B(b)})`,`			(value ${B(y)})`,`			(footprint ${B(T)})`,`			(libsource (lib ${B(O)}) (part ${B(G)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${B(Q)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${B(ut)})`,"		)");$.push("(export",'	(version "E")',"	(design",`		(source ${B(t)})`,`		(date ${B(r)})`,`		(tool ${B(n)})`,"	)"),$.push("	(components");for(let b of jr)M(b.ref,b.valor,b.huella,"Connector_Generic",b.parte,"placa",b.uuid);for(let b of i){let y=Re[b.tipo];M(b.ref,y.valor(b.props||{}),y.huella,y.lib,y.parte,b.id,zn(t+"/"+b.id))}return $.push("	)","	(nets"),x.forEach((b,y)=>{$.push("		(net",`			(code ${B(y+1)})`,`			(name ${B(b.nombre)})`,'			(class "Default")');for(let T of b.pads){let O=T.pinUno?` (pinfunction ${B(T.pinUno)})`:"";$.push(`			(node (ref ${B(T.ref)}) (pin ${B(T.pad)})${O} (pintype "passive"))`)}$.push("		)")}),$.push("	)",")"),$.join(`
`)+`
`}var Nr="http://www.w3.org/2000/svg",In="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",Vn=280,Tr=5e3,qn=4,Lr=8,Gn=9.6,zr=.4,Un=5,dt=o=>JSON.parse(JSON.stringify(o)),V=o=>Math.round(o*100)/100,ie=(o,t)=>Math.hypot(o.x-t.x,o.y-t.y),$o=o=>Vt[o]||(/^#[0-9a-f]{3,8}$/i.test(o||"")?o:Vt.verde);function Gr(o,t={}){if(!(o instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let r=t.placa||"uno";if(!qt[r])throw new Error(`Este prototipo no dibuja la placa \xAB${r}\xBB.`);let n=!!t.soloLectura,i=typeof t.alEvento=="function"?t.alEvento:null,l=[],a=Bn(t.circuito,r),u=document.createElement("div");u.className="tecnocircuito",o.appendChild(u);let p=u.attachShadow({mode:"open"});p.innerHTML=`<style>${wr}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Tr} ${Tr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
    <button type="button" role="menuitem" data-accion="protoboard">Protoboard</button>
  </div>
</div>`;let m=e=>p.querySelector(e),v=m(".tc"),x=m(".tc-barra"),$=m(".tc-menu"),M=x.querySelector('[data-accion="menu"]'),b=m(".tc-sel"),y=m(".tc-area"),T=m(".tc-mundo"),O=m(".tc-capa-comp"),G=m(".tc-capa-pines"),Q=m(".tc-cables"),ut=m(".tc-asas"),[ft,it]=m(".tc-previa").children,_=m(".tc-ayuda"),L=m(".tc-tip"),P={px:0,py:0,escala:1.5},j=new Map,$t=new Map,S=null,k=null,C=null,ae=null,De=null,_o=!1,Ne=!1,Ut=!1,ce=null,Te=!1,H={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{}},Le=new Set,So=[],Eo=[],ze="",J=e=>a.componentes.find(s=>s.id===e),le=e=>e==="protoboard"?a.protoboard:J(e),pe=e=>e==="placa"?{x:0,y:0,rot:0}:le(e);function Ie(e,s,c){let d=e==="placa"?qt[r]:K[s],f=document.createElement("div");f.className="tc-comp"+(e==="placa"?" tc-placa":""),f.dataset.id=e,s&&(f.dataset.tipo=s);let h;if(d&&d.dibujo){let w=document.createElement("template");w.innerHTML=d.dibujo.svg(c),h=w.content.firstElementChild}else d?(h=document.createElement(d.etiqueta),d.aplicar&&d.aplicar(h,c),d.perilla&&h.addEventListener("input",()=>Uo(e,Number(h.value)/100))):(h=document.createElement("div"),h.className="tc-desconocido",h.textContent=`\xBF${s}?`,h.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");f.appendChild(h),O.appendChild(f);let g={id:e,def:d,div:f,el:h,w:64,h:40,pines:new Map,lista:!1};return j.set(e,g),Promise.resolve(h.updateComplete).then(()=>{if(j.get(e)===g){if(d&&d.dibujo){Object.assign(g,{w:d.dibujo.ancho,h:d.dibujo.alto});for(let[w,A]of Object.entries(d.dibujo.pines)){let R=document.createElement("div");R.className="tc-pin",R.dataset.ref=`${e}.${w}`,G.appendChild(R),g.pines.set(w,{px:A.x,py:A.y,div:R})}}else if(d){Object.assign(g,Zr(h));for(let w of h.pinInfo||[]){let A=d.nombrePin(w.name);if(!A)continue;let R=document.createElement("div");R.className="tc-pin",R.dataset.ref=`${e}.${A}`,G.appendChild(R),g.pines.set(A,{px:w.x,py:w.y,div:R})}}g.lista=!0,Rt(g),Ro(g)}})}function Co(){let e=a.protoboard.tipo,s=pt[e]||pt.media,c=document.createElement("div");c.className="tc-comp tc-protoboard",c.dataset.id="protoboard",c.dataset.tipo="protoboard";let d=document.createElement("template");d.innerHTML=Pr(e);let f=d.content.firstElementChild;c.appendChild(f);let h=j.get("placa");O.insertBefore(c,h?h.div.nextSibling:O.firstChild);let g={id:"protoboard",def:{protoboard:!0},div:c,el:f,w:s.ancho,h:s.alto,pines:new Map,lista:!0};for(let w of se(e)){let A=document.createElement("div");A.className="tc-pin tc-hueco",A.dataset.ref="protoboard."+w.nombre,A.style.left=w.x+"px",A.style.top=w.y+"px",c.appendChild(A),g.pines.set(w.nombre,{px:w.x,py:w.y,div:A})}return j.set("protoboard",g),Rt(g),de(),Promise.resolve()}function Yr(){if(a.protoboard)return;let e=Ye();a.protoboard={tipo:"media",x:Math.round(Math.max(300,e?e.x1+30:300)),y:30},Co(),Ve(),X("componente_agregado",{id:"protoboard",tipo:"protoboard"}),rt({tipo:"comp",id:"protoboard"}),Ut||Ft(),W()}function Ve(){let e=$.querySelector('[data-accion="protoboard"]');e.disabled=!!a.protoboard,e.title=a.protoboard?"Ya hay una protoboard":""}function Kr(e){let s=j.get(e.id),c=a.protoboard;return!s||!s.lista||!c||!s.pines.size?null:[...s.pines].map(([d,f])=>{let h=Ge(s,e,f);return{nombre:d,x:h.x-c.x,y:h.y-c.y}})}function Mo(e){let s=new Set;for(let c of a.componentes)if(c!==e&&c.en)for(let d of Object.values(c.en))s.add(d.slice(11));return s}function Po(e){let s=Kr(e);return s?kr(s,{tipo:a.protoboard.tipo,ocupados:Mo(e)}):null}function qe(e){let s=Po(e);return s?(e.x=V(e.x+s.dx),e.y=V(e.y+s.dy),e.en=Object.fromEntries(Object.entries(s.en).map(([c,d])=>[c,"protoboard."+d]))):delete e.en,Rt(j.get(e.id)),de(),mt(),!!s}let Bt=[];function Jr(e){ko();let s=a.protoboard&&Po(e),c=j.get("protoboard");!s||!c||(Bt=Object.values(s.en).map(d=>c.pines.get(d).div),Bt.forEach(d=>d.classList.add("tc-destino")))}function ko(){Bt.forEach(e=>e.classList.remove("tc-destino")),Bt=[]}function de(){let e=j.get("protoboard");if(!e)return;let s=Mo(null);for(let[c,d]of e.pines)d.div.classList.toggle("tc-ocupado",s.has(c))}let ue=[];function Oo(e){ue.forEach(g=>g.classList.remove("tc-tira")),ue=[];let s=j.get("protoboard");if(!e||!s)return;let[c,d]=fe(e),f=c==="protoboard"?d:null;if(!f){let g=J(c);g&&g.en&&g.en[d]&&(f=g.en[d].slice(11))}if(!f)return;let h=vo(f);for(let[g,w]of s.pines)vo(g)===h&&(w.div.classList.add("tc-tira"),ue.push(w.div))}function Ro(e){if(e.id==="placa")for(let s of["ledPower","led13","ledTX","ledRX"])e.el[s]=!!H.placa[s];else if(e.def===K.led){let s=Number(H.leds[e.id])||0;e.el.value=s>.005,e.el.brightness=s,e.div.classList.toggle("tc-quemado",H.quemados.includes(e.id))}else e.def&&e.def.mostrar&&e.def.mostrar(e.el,H.simulando?H.servos[e.id]:null)}function Zr(e){let s=e.shadowRoot&&e.shadowRoot.querySelector("svg"),c=s&&Vr(s.getAttribute("width")),d=s&&Vr(s.getAttribute("height"));return c&&d?{w:c,h:d}:{w:e.offsetWidth||64,h:e.offsetHeight||40}}function Rt(e){if(!e)return;let s=pe(e.id);if(s&&(Object.assign(e.div.style,{left:s.x+"px",top:s.y+"px",width:e.w+"px",height:e.h+"px",transform:s.rot?`rotate(${s.rot}deg)`:""}),e.id!=="protoboard"))for(let c of e.pines.values()){let d=Ge(e,s,c);c.div.style.left=d.x+"px",c.div.style.top=d.y+"px"}}function Ge(e,s,c){let d=((s.rot||0)%360+360)%360;if(!d)return{x:s.x+c.px,y:s.y+c.py};let f=d*Math.PI/180,h=Math.round(Math.cos(f)*1e9)/1e9,g=Math.round(Math.sin(f)*1e9)/1e9,w=e.w/2,A=e.h/2,R=c.px-w,F=c.py-A;return{x:V(s.x+w+R*h-F*g),y:V(s.y+A+R*g+F*h)}}function fe(e){let s=e.indexOf(".");return s>0?[e.slice(0,s),e.slice(s+1)]:[e,""]}function ht(e){let[s,c]=fe(e),d=j.get(s);if(!d||!d.lista)return null;let f=pe(s),h=d.pines.get(c);return h?Ge(d,f,h):d.def?null:{x:f.x+d.w/2,y:f.y+d.h/2}}function Qr(e){let[s,c]=fe(e),d=j.get(s);return d&&d.pines.get(c)}function he(e){let s=ht(e.de),c=ht(e.a);return!s||!c?null:[s,...(e.puntos||[]).map(([d,f])=>({x:d,y:f})),c]}function wt(e,s,c){let d=document.createElementNS(Nr,e);for(let f in s)d.setAttribute(f,s[f]);return c.appendChild(d),d}function mt(){for(let[e,s]of $t)a.cables.includes(e)||(s.g.remove(),s.asas.forEach(c=>c.remove()),$t.delete(e));a.cables.forEach((e,s)=>{let c=$t.get(e);if(!c){let A=wt("g",{class:"tc-cable"},Q);c={g:A,borde:wt("path",{class:"tc-cable-borde"},A),linea:wt("path",{class:"tc-cable-linea"},A),p0:wt("circle",{class:"tc-punta",r:2.4},A),p1:wt("circle",{class:"tc-punta",r:2.4},A),toque:wt("path",{class:"tc-cable-toque"},A),asas:[]},$t.set(e,c)}let d=he(e);if(c.g.style.display=d?"":"none",!d)return;let f=wo(d),h=$o(e.color);for(let A of[c.borde,c.linea,c.toque])A.setAttribute("d",f);c.linea.setAttribute("stroke",h),c.toque.dataset.i=s,jo(c.p0,d[0],h),jo(c.p1,d[d.length-1],h);let g=!!(S&&S.tipo==="cable"&&S.cable===e);c.g.classList.toggle("tc-seleccionado",g),g&&Q.lastChild!==c.g&&Q.appendChild(c.g);let w=g?(e.puntos||[]).length:0;for(;c.asas.length>w;)c.asas.pop().remove();for(;c.asas.length<w;)c.asas.push(wt("circle",{class:"tc-asa",r:3.6},ut));c.asas.forEach((A,R)=>{A.setAttribute("cx",e.puntos[R][0]),A.setAttribute("cy",e.puntos[R][1]),A.dataset.i=s,A.dataset.p=R})})}function jo(e,s,c){e.setAttribute("cx",s.x),e.setAttribute("cy",s.y),e.setAttribute("fill",c)}function jt(){let e=k&&ht(k.de);if(!e){ft.setAttribute("d",""),it.setAttribute("d","");return}let s=k.puntos.map(g=>({...g})),c=s.length?s[s.length-1]:e,d=k.cursor?me(k.cursor,c):c,f=k.destino&&ht(k.destino);f&&(d=f,No(s,e,f));let h=wo([e,...s,d]);ft.setAttribute("d",h),it.setAttribute("d",h),it.setAttribute("stroke",$o(Do()))}function Do(){return k.color||bo(k.de,k.destino||"")}function me(e,s){let c=Lr/P.escala;return{x:V(Math.abs(e.x-s.x)<c?s.x:e.x),y:V(Math.abs(e.y-s.y)<c?s.y:e.y)}}function No(e,s,c){if(!e.length)return;let d=Lr/P.escala,f=e[e.length-1],h=e.length>1?e[e.length-2]:s;Math.abs(f.y-c.y)<d&&f.y!==h.y&&(f.y=c.y),Math.abs(f.x-c.x)<d&&f.x!==h.x&&(f.x=c.x)}function tn(e){rt(null),k={de:e,puntos:[],cursor:null,destino:null,color:null},v.classList.add("tc-dibujando"),zo(e,!0),jt(),ge(),nt()}function Ue(){k&&(zo(k.de,!1),k=null,v.classList.remove("tc-dibujando"),jt(),ge(),nt())}function To(e){if(Vt[e]){if(k)k.color=e,jt();else if(S&&S.tipo==="cable"){if(S.cable.color===e)return;S.cable.color=e,mt(),W()}else return;ge()}}function Lo(e){let s=k;if(!s)return;if(e===s.de)return Ue();let c=ht(s.de),d=ht(e);if(c&&d&&No(s.puntos,c,d),Ue(),a.cables.some(h=>h.de===s.de&&h.a===e||h.de===e&&h.a===s.de)){ln("Esos dos pines ya est\xE1n unidos.");return}let f={de:s.de,a:e,color:s.color||bo(s.de,e)};s.puntos.length&&(f.puntos=s.puntos.map(h=>[V(h.x),V(h.y)])),a.cables.push(f),X("cable_agregado",{de:f.de,a:f.a}),rt({tipo:"cable",cable:f}),W()}function en(e){let s=k.puntos.length?k.puntos[k.puntos.length-1]:ht(k.de);k.puntos.push(s?me(e,s):e),jt(),nt()}function on(){!k||!k.puntos.length||(k.puntos.pop(),jt(),nt())}function zo(e,s){let c=Qr(e);c&&c.div.classList.toggle("tc-activo",s)}function Be(e){a.cables=a.cables.filter(s=>s!==e),X("cable_quitado",{de:e.de,a:e.a})}function rt(e){S=e;for(let s of j.values())s.div.classList.toggle("tc-seleccionado",!!e&&e.tipo==="comp"&&e.id===s.id);mt(),ge(),nt()}function ge(){if(b.textContent="",n||!S&&!k)return;let e=c=>b.insertAdjacentHTML("beforeend",c),s=c=>go.forEach((d,f)=>{let h=Vt[d],g=_r[d]||d;e(`<button type="button" class="tc-muestra${c===d?" tc-activa":""}" data-accion="color" data-color="${d}" title="${f} \xB7 ${g}" aria-label="Cable ${g} (tecla ${f})" style="background:${h};color:${Xn(h)}">${f}</button>`)});if(k){e('<span class="tc-etiqueta">Cable nuevo</span>'),s(Do());return}if(S.tipo==="cable")e('<span class="tc-etiqueta">Cable</span>'),s(S.cable.color);else if(S.id==="protoboard")e(`<span class="tc-etiqueta">${(pt[a.protoboard.tipo]||pt.media).nombre}</span>`);else{let c=J(S.id),d=K[c.tipo],f=j.get(c.id);if(e(`<span class="tc-etiqueta">${d?d.nombre:"Pieza desconocida"}</span>`),d&&d.campo){let h=String(c.props[d.campo.prop]),g=d.campo.opciones.map(([w,A])=>`<option value="${w}"${h===String(w)?" selected":""}>${A}</option>`).join("");e(`<label class="tc-campo">${d.campo.etiqueta} <select data-prop="${d.campo.prop}">${g}</select></label>`)}if(d&&d.perilla){let h=Math.round((Number(c.props[d.perilla.prop])||0)*100);e(`<label class="tc-campo">${d.perilla.etiqueta} <input type="range" min="0" max="100" value="${h}" data-perilla aria-label="${d.perilla.etiqueta} del potenci\xF3metro"></label>`)}if(c.tipo==="led"){let h=f&&f.el.value?" checked":"";e(`<label class="tc-check"><input type="checkbox" data-accion="encender"${h}> Ver encendido</label>`)}e('<button type="button" data-accion="girar">Girar</button>')}e('<button type="button" data-accion="borrar">Borrar</button>')}function rn(e){let s=K[e];if(!s)return;let c=1;for(;J(s.prefijo+c);)c++;let d=s.prefijo+c,f=(y.clientWidth/2-P.px)/P.escala,h=(y.clientHeight/2-P.py)/P.escala,g=a.componentes.length%4*14,w={id:d,tipo:e,x:Math.round(f-20+g),y:Math.round(h-20+g),rot:0,props:dt(s.props)};a.componentes.push(w),Ie(d,e,w.props).then(()=>{a.protoboard&&J(d)===w&&qe(w)&&(X("componente_cambiado",{id:d,x:w.x,y:w.y,en:dt(w.en)}),W())}),X("componente_agregado",{id:d,tipo:e}),rt({tipo:"comp",id:d}),W()}function Io(){if(!S||S.tipo!=="comp"||S.id==="protoboard")return;let e=J(S.id);e.rot=((e.rot||0)+90)%360,Rt(j.get(e.id)),a.protoboard&&qe(e),mt(),X("componente_cambiado",{id:e.id,rot:e.rot,en:e.en?dt(e.en):null}),W()}function Vo(){if(S){if(S.tipo==="cable")Be(S.cable);else if(S.id==="protoboard"){a.cables.filter(s=>s.de.startsWith("protoboard.")||s.a.startsWith("protoboard.")).forEach(s=>Be(s));for(let s of a.componentes)delete s.en;a.protoboard=null;let e=j.get("protoboard");e&&(e.div.remove(),j.delete("protoboard")),ue=[],Bt=[],Ve(),X("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let e=J(S.id),s=j.get(S.id);if(a.cables.filter(c=>c.de.startsWith(e.id+".")||c.a.startsWith(e.id+".")).forEach(c=>Be(c)),a.componentes=a.componentes.filter(c=>c!==e),s){s.div.remove();for(let c of s.pines.values())c.div.remove();j.delete(e.id)}X("componente_quitado",{id:e.id,tipo:e.tipo}),de()}xe(),rt(null),W()}}function be(e){if($.hidden=!e,M.setAttribute("aria-expanded",String(e)),!e)return;let s=M.getBoundingClientRect(),c=v.getBoundingClientRect();$.style.left=s.left-c.left+"px",$.style.top=s.bottom-c.top+4+"px",$.querySelector("button:not([disabled])").focus()}$.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");s&&(be(!1),qo(s))}),$.addEventListener("keydown",e=>{e.key==="Escape"&&(e.stopPropagation(),be(!1),M.focus())}),p.addEventListener("pointerdown",e=>{!$.hidden&&!e.target.closest(".tc-menu")&&e.target!==M&&be(!1)}),x.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");if(s){if(s.dataset.accion==="menu")return be($.hidden);qo(s)}});function qo(e){let s=e.dataset.accion;if(s==="acercar")return We(1.25);if(s==="alejar")return We(.8);if(s==="encuadrar")return Ut=!1,Ft();n||(s==="agregar"?rn(e.dataset.tipo):s==="protoboard"?Yr():s==="girar"?Io():s==="borrar"?Vo():s==="color"&&(To(e.dataset.color),y.focus({preventScroll:!0})))}x.addEventListener("change",e=>{if(n||!S||S.tipo!=="comp")return;let s=J(S.id),c=j.get(S.id),d=K[s.tipo];if(e.target.dataset.accion==="encender"){c.el.value=e.target.checked;return}let f=e.target.dataset.prop;if(!f||!d)return;let h=typeof d.props[f]=="number"?Number(e.target.value):e.target.value;s.props={...s.props,[f]:h},d.aplicar(c.el,s.props),X("componente_cambiado",{id:s.id,props:dt(s.props)}),W()}),x.addEventListener("input",e=>{if(n||!S||S.tipo!=="comp"||!("perilla"in e.target.dataset))return;let s=j.get(S.id);Uo(S.id,Number(e.target.value)/100),s&&K.potenciometro.aplicar(s.el,J(S.id).props)});function Ht(e,s,c){let d=j.get(e);if(d&&(d.el.pressed=s),s)Le.add(e);else if(!Le.delete(e))return;for(let f of So)try{f(e,s)}catch(h){console.error(h)}!s&&c!==void 0&&X("boton_pulsado",{id:e,ms:Math.round(c)})}let Go=new Map;function Uo(e,s){let c=J(e),d=j.get(e);if(!c)return;let f=K[c.tipo];if(n)return d&&f.aplicar(d.el,c.props);let h=Math.max(0,Math.min(1,Math.round(s*100)/100));if(h===c.props[f.perilla.prop])return;c.props={...c.props,[f.perilla.prop]:h};let g=S&&S.tipo==="comp"&&S.id===e&&b.querySelector("[data-perilla]");g&&Number(g.value)!==Math.round(h*100)&&(g.value=Math.round(h*100)),W(),clearTimeout(Go.get(e)),Go.set(e,setTimeout(()=>X("componente_cambiado",{id:e,props:dt(c.props)}),400))}function He(e){let s=y.getBoundingClientRect();return{x:(e.clientX-s.left-P.px)/P.escala,y:(e.clientY-s.top-P.py)/P.escala}}function Fe(e){try{y.setPointerCapture(e.pointerId)}catch{}}function Xe(e,s={}){C={tipo:"paneo",x0:e.clientX,y0:e.clientY,px0:P.px,py0:P.py,movido:!1,...s},Fe(e)}y.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;y.focus({preventScroll:!0}),xe();let s=e.target,c=He(e);if(n)return Xe(e);let d=s.closest(".tc-pin");if(d){if(e.preventDefault(),k)return Lo(d.dataset.ref);tn(d.dataset.ref),C={tipo:"pin",ref:d.dataset.ref,x0:e.clientX,y0:e.clientY,movido:!1};return}if(k)return Xe(e,{punto:c});let f=s.closest(".tc-asa");if(f)return C={tipo:"asa",cable:a.cables[+f.dataset.i],k:+f.dataset.p,x0:e.clientX,y0:e.clientY,movido:!1},Fe(e);let h=s.closest(".tc-cable-toque");if(h)return rt({tipo:"cable",cable:a.cables[+h.dataset.i]});let g=s.closest(".tc-comp");if(g&&g.dataset.id!=="placa"){let w=g.dataset.id,A=le(w);if(A.tipo==="pulsador"&&(e.preventDefault(),H.simulando)){Ht(w,!0),C={tipo:"pulsar",id:w,x0:e.clientX,y0:e.clientY,movido:!1,desde:performance.now()};return}return rt({tipo:"comp",id:w}),K[A.tipo]&&K[A.tipo].perilla&&e.composedPath().some(Yn)?void 0:(C={tipo:"mover",id:w,dx:c.x-A.x,dy:c.y-A.y,x0:e.clientX,y0:e.clientY,movido:!1},Fe(e))}rt(null),Xe(e)}),y.addEventListener("pointermove",e=>{let s=He(e);if(C&&C.tipo==="pulsar"&&!(e.target.closest&&e.target.closest(`.tc-comp[data-id="${C.id}"]`))){let c=C;C=null,Ht(c.id,!1,performance.now()-c.desde)}if(C){if(!C.movido&&Math.hypot(e.clientX-C.x0,e.clientY-C.y0)>qn&&(C.movido=!0),C.movido&&C.tipo==="mover"){let c=le(C.id),d=Math.round(s.x-C.dx),f=Math.round(s.y-C.dy);if(C.id==="protoboard")for(let h of a.componentes)h.en&&(h.x=V(h.x+d-c.x),h.y=V(h.y+f-c.y),Rt(j.get(h.id)));c.x=d,c.y=f,Rt(j.get(C.id)),C.id!=="protoboard"&&a.protoboard&&Jr(c),mt()}else if(C.movido&&C.tipo==="paneo")Ut=!0,P.px=C.px0+e.clientX-C.x0,P.py=C.py0+e.clientY-C.y0,y.classList.add("tc-paneando"),ye();else if(C.movido&&C.tipo==="asa"){let c=he(C.cable),d=me(s,c[C.k]);d=me(d,c[C.k+2]),C.cable.puntos[C.k]=[d.x,d.y],mt()}}if(k){let c=e.target.closest&&e.target.closest(".tc-pin");k.cursor=s,k.destino=c&&c.dataset.ref!==k.de?c.dataset.ref:null,jt()}(!C||C.tipo==="pin")&&cn(e.target.closest&&e.target.closest(".tc-pin")),H.simulando&&Bo(e.target)});function Bo(e){let s=[],c=e&&e.closest&&e.closest(".tc-pin"),d=e&&e.closest&&e.closest(".tc-cable-toque");c?s=[c.dataset.ref]:d&&a.cables[+d.dataset.i]&&(s=[a.cables[+d.dataset.i].de,a.cables[+d.dataset.i].a]);let f=s.join("|");if(f!==ze){ze=f;for(let h of Eo)h(s)}}function Ho(e){let s=C;if(C=null,y.classList.remove("tc-paneando"),!!s){if(s.tipo==="pulsar")return Ht(s.id,!1,performance.now()-s.desde);if(s.tipo==="mover"&&s.movido){let c=le(s.id);s.id==="protoboard"?X("componente_cambiado",{id:"protoboard",x:c.x,y:c.y}):(ko(),(a.protoboard||c.en)&&qe(c),X("componente_cambiado",{id:s.id,x:c.x,y:c.y,en:c.en?dt(c.en):null})),W()}else if(s.tipo==="asa"&&s.movido)W();else if(s.tipo==="paneo"&&!s.movido&&s.punto&&k)en(s.punto);else if(s.tipo==="pin"&&s.movido&&k&&e.type==="pointerup"){let c=p.elementFromPoint(e.clientX,e.clientY),d=c&&c.closest(".tc-pin");d&&d.dataset.ref!==s.ref&&Lo(d.dataset.ref)}}}y.addEventListener("pointerup",Ho),y.addEventListener("pointercancel",Ho),y.addEventListener("pointerleave",()=>{if(xe(),ze&&Bo(null),C&&C.tipo==="pulsar"){let e=C;C=null,Ht(e.id,!1,performance.now()-e.desde)}}),y.addEventListener("dblclick",e=>{if(n||k)return;let s=p.elementFromPoint(e.clientX,e.clientY)||e.target,c=s.closest(".tc-asa"),d=s.closest(".tc-cable-toque");if(c){let f=a.cables[+c.dataset.i];f.puntos.splice(+c.dataset.p,1),f.puntos.length||delete f.puntos,mt(),nt(),W()}else if(d){let f=a.cables[+d.dataset.i],h=he(f),g=He(e),w=0,A=g,R=1/0;for(let F=0;F<h.length-1;F++){let Z=Wn(g,h[F],h[F+1]);ie(g,Z)<R&&(R=ie(g,Z),w=F,A=Z)}(f.puntos=f.puntos||[]).splice(w,0,[V(A.x),V(A.y)]),rt({tipo:"cable",cable:f}),W()}}),y.addEventListener("wheel",e=>{e.preventDefault();let s=y.getBoundingClientRect(),c=Math.min(1.5,Math.max(.66,Math.exp(-e.deltaY*.0015)));We(c,e.clientX-s.left,e.clientY-s.top)},{passive:!1}),v.addEventListener("keydown",e=>{if(e.target.closest&&e.target.closest("select, input"))return;let s=!e.ctrlKey&&!e.metaKey&&!e.altKey,c=!0;e.key==="Escape"?k?Ue():rt(null):n?c=!1:e.key==="Delete"||e.key==="Backspace"?(e.preventDefault(),k?on():Vo()):(e.key==="r"||e.key==="R")&&s?Io():/^[0-9]$/.test(e.key)&&s&&(k||S&&S.tipo==="cable")?To(go[Number(e.key)]):c=!1,c&&e.stopPropagation()});function ye(){T.style.transform=`translate(${P.px}px, ${P.py}px) scale(${P.escala})`;let e=Gn*P.escala;y.style.backgroundSize=`${e}px ${e}px`,y.style.backgroundPosition=`${P.px}px ${P.py}px`,xe()}function We(e,s,c){Ut=!0,s===void 0&&(s=y.clientWidth/2,c=y.clientHeight/2);let d=Math.min(Un,Math.max(zr,P.escala*e)),f=(s-P.px)/P.escala,h=(c-P.py)/P.escala;Object.assign(P,{escala:d,px:s-f*d,py:c-h*d}),ye()}function Ye(){let e=1/0,s=1/0,c=-1/0,d=-1/0,f=(h,g)=>{e=Math.min(e,h),s=Math.min(s,g),c=Math.max(c,h),d=Math.max(d,g)};for(let h of j.values()){let g=pe(h.id);if(!g)continue;let w=(g.rot||0)%180!==0,A=(w?h.h:h.w)/2,R=(w?h.w:h.h)/2;f(g.x+h.w/2-A,g.y+h.h/2-R),f(g.x+h.w/2+A,g.y+h.h/2+R)}for(let h of a.cables)for(let[g,w]of h.puntos||[])f(g,w);return isFinite(e)?{x0:e,y0:s,x1:c,y1:d}:null}function Ft(){let e=y.clientWidth,s=y.clientHeight;if(!e||!s)return!1;let c=Ye();if(!c)return!1;let{x0:d,y0:f,x1:h,y1:g}=c,w=48,A=Math.min((e-2*w)/(h-d||1),(s-2*w)/(g-f||1)),R=Math.min(2.4,Math.max(zr,A));return Object.assign(P,{escala:R,px:e/2-(d+h)/2*R,py:s/2-(f+g)/2*R}),ce={ancho:e,alto:s},ye(),!0}function nn(){let e=Ye()||{x0:0,y0:0,x1:100,y1:100},s=12,c=16,d=Math.max(Vn,Math.ceil(e.x1-e.x0+2*s)),f=Math.ceil(e.y1-e.y0+2*s)+c,h=[`<svg xmlns="${Nr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${d}" height="${f}" viewBox="0 0 ${d} ${f}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${d}" height="${f}" fill="#ffffff"/>`,`<g transform="translate(${V(s-e.x0)} ${V(s-e.y0)})">`];for(let g of O.children){let w=j.get(g.dataset.id);w&&w.lista&&h.push(sn(w))}for(let g of a.cables){let w=he(g);if(!w)continue;let A=wo(w),R=$o(g.color),F=Z=>`<circle cx="${Z.x}" cy="${Z.y}" r="2.4" fill="${R}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;h.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${A}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${A}" stroke="${R}" stroke-width="3"/>${F(w[0])}${F(w[w.length-1])}</g>`)}return h.push("</g>",`<text x="${d-s}" y="${f-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${Ir(In)}</text>`,"</svg>"),h.join(`
`)}function sn(e){let s=pe(e.id);if(!s)return"";let c=s.rot?`translate(${s.x+e.w/2} ${s.y+e.h/2}) rotate(${s.rot}) translate(${-e.w/2} ${-e.h/2})`:`translate(${s.x} ${s.y})`;if(!e.def){let At=Ir((J(e.id)||{}).tipo||"");return`<g transform="${c}"><rect width="${e.w}" height="${e.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${e.w/2}" y="${e.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${At}?</text></g>`}let d=e.el.shadowRoot?e.el.shadowRoot.querySelector("svg"):e.el.tagName&&e.el.tagName.toLowerCase()==="svg"?e.el:null;if(!d)return"";let f=d.cloneNode(!0),h=[],g=document.createTreeWalker(f,NodeFilter.SHOW_COMMENT);for(;g.nextNode();)h.push(g.currentNode);h.forEach(At=>At.remove());let w=/--knob-angle:\s*(-?[\d.]+)deg/.exec(f.getAttribute("style")||""),A=f.querySelector("#rotating");w&&A&&A.setAttribute("transform",`rotate(${w[1]} 10 8)`),f.setAttribute("width",V(e.w)),f.setAttribute("height",V(e.h)),f.removeAttribute("id");let R="tc-"+e.id,F=[...new Set([...f.querySelectorAll("[id]")].map(At=>At.id))],Z=new XMLSerializer().serializeToString(f);for(let At of F)Z=Hn(Z,At,R);Z=Z.replace(/^<svg\b/,`<svg id="${R}"`);let Wo=e.el.shadowRoot?Fn(e.el,R,F):"";return`<g transform="${c}">${Wo?`<style><![CDATA[
${Wo}
]]></style>`:""}${Z}</g>`}function an(e){let[s,c]=fe(e);if(s==="placa")return qt[r].rotulo(c);if(s==="protoboard")return Mr(c);let d=J(s),f=d&&K[d.tipo],h=d&&d.en&&d.en[c]?` \xB7 en el hueco ${d.en[c].slice(11)}`:"";return f?`${f.nombre}: ${f.rotulo(c)}${h}`:c}function cn(e){let s=e?e.dataset.ref:null;if(s===ae)return;ae=s,Oo(s);let c=s&&ht(s);if(!c){L.hidden=!0;return}let d=P.py+c.y*P.escala,f=H.voltajes[s],h=f===void 0?"":f===null?" \xB7 al aire":` \xB7 ${f.toFixed(2).replace(".",",")} V`;L.textContent=an(s)+h,L.style.left=P.px+c.x*P.escala+"px",L.style.top=d+"px",L.classList.toggle("tc-abajo",d<44),L.hidden=!1}function xe(){ae=null,L.hidden=!0,Oo(null)}function nt(){clearTimeout(De),_.classList.remove("tc-aviso");let e=S&&S.tipo==="cable"&&S.cable.puntos&&S.cable.puntos.length;_.textContent=n?"Solo lectura: puedes mover la vista y hacer zoom.":k?k.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":e?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":S&&S.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":S&&S.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":S&&a.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":S?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":H.simulando&&a.componentes.some(s=>s.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function ln(e){nt(),_.textContent=e,_.classList.add("tc-aviso"),De=setTimeout(nt,2500)}function X(e,s){if(i)try{i({t:Date.now(),origen:"circuito",tipo:e,datos:s})}catch(c){console.error(c)}}function W(){let e=dt(a);for(let s of l)try{s(e)}catch(c){console.error(c)}}function Fo(e){v.classList.toggle("tc-oscuro",e==="oscuro"),v.classList.toggle("tc-claro",e==="claro")}let pn={circuito:()=>dt(a),alCambiar(e){typeof e=="function"&&l.push(e)},ponerPlaca(e){if(e!==r)throw new Error(`Este prototipo solo dibuja la placa \xAB${r}\xBB.`)},ponerTema:Fo,exportarSVG:nn,exportarNetlist:e=>Dr(a,e),_alPulsar(e){typeof e=="function"&&So.push(e)},_alAcercar(e){typeof e=="function"&&Eo.push(e)},_mostrar(e){let s=H.simulando;H={simulando:!!e.simulando,leds:e.leds||{},quemados:e.quemados||[],voltajes:e.voltajes||{},placa:e.placa||{},servos:e.servos||{}},s!==H.simulando&&(v.classList.toggle("tc-simulando",H.simulando),H.simulando||[...Le].forEach(c=>Ht(c,!1)),nt()),ae=null;for(let c of j.values())c.lista&&Ro(c)},destruir(){Te=!0,Xo.disconnect(),clearTimeout(De),l.length=0,j.clear(),$t.clear(),u.remove()}};t.tema&&Fo(t.tema),n&&v.classList.add("tc-solo-lectura"),ye(),nt();let Xo=new ResizeObserver(()=>{if(!_o||Te)return;if(!Ne){Ne=Ft();return}if(Ut||!ce)return;let e=(s,c)=>Math.abs(s-c)/Math.max(1,c);(e(y.clientWidth,ce.ancho)>.1||e(y.clientHeight,ce.alto)>.1)&&Ft()});Xo.observe(y);let dn=Ie("placa");return Ve(),Promise.all([dn,...a.protoboard?[Co()]:[],...a.componentes.map(e=>Ie(e.id,e.tipo,e.props))]).then(()=>{Te||(_o=!0,de(),mt(),Ne=Ft())}),pn}function Bn(o,t){let r=o&&typeof o=="object"?dt(o):{};r.formato=r.formato||1,r.placa=t;let n=new Set;r.componentes=(Array.isArray(r.componentes)?r.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!n.has(i.id)&&n.add(i.id));for(let i of r.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let l=K[i.tipo]?K[i.tipo].props:{};i.props={...l,...i.props&&typeof i.props=="object"?i.props:{}}}r.cables=(Array.isArray(r.cables)?r.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of r.cables){let l=Array.isArray(i.puntos)&&i.puntos.every(a=>Array.isArray(a)&&a.length===2&&a.every(Number.isFinite));"puntos"in i&&!l&&delete i.puntos}!r.protoboard||typeof r.protoboard!="object"?r.protoboard=null:(typeof r.protoboard.tipo!="string"&&(r.protoboard.tipo="media"),r.protoboard.x=Number(r.protoboard.x)||0,r.protoboard.y=Number(r.protoboard.y)||0);for(let i of r.componentes){let l=r.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(a=>typeof a=="string"&&a.startsWith("protoboard."));"en"in i&&!l&&delete i.en}return r}var Ur=o=>o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Ir=o=>String(o).replace(/[<>&"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[t]);function Hn(o,t,r){let n=Ur(t),i=`${r}-${t}`;return o.replace(new RegExp(`(\\s)id="${n}"`,"g"),(l,a)=>`${a}id="${i}"`).replace(new RegExp(`url\\(#${n}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${n}"`,"g"),()=>`href="#${i}"`)}function Fn(o,t,r){let n=o.shadowRoot,i=[...n.adoptedStyleSheets||[]];n.querySelectorAll("style").forEach(a=>a.sheet&&i.push(a.sheet));let l=[];for(let a of i){let u;try{u=a.cssRules}catch{continue}for(let p of u){if(!p.selectorText||!p.style)continue;let m=p.selectorText.split(",").map(x=>x.trim()).filter(x=>!/:host|\binput\b|:focus|\.hide-input/.test(x));if(!m.length)continue;let v=m.map(x=>{let $=x;for(let M of r)$=$.replace(new RegExp(`#${Ur(M)}(?![\\w-])`,"g"),()=>`#${t}-${M}`);return/^svg\b/.test($)?$.replace(/^svg\b/,`#${t}`):`#${t} ${$}`});l.push(`${v.join(", ")} { ${p.style.cssText} }`)}}return l.join(`
`)}function Xn(o){let[t,r,n]=[1,3,5].map(i=>parseInt(o.slice(i,i+2),16)/255);return .2126*t+.7152*r+.0722*n>.55?"#1d2733":"#ffffff"}function Vr(o){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(o||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function wo(o){let t=n=>`${V(n.x)} ${V(n.y)}`,r=`M${t(o[0])}`;for(let n=1;n<o.length-1;n++){let i=o[n-1],l=o[n],a=o[n+1],u=Math.min(5,ie(i,l)/2,ie(l,a)/2);r+=` L${t(qr(l,i,u))} Q${t(l)} ${t(qr(l,a,u))}`}return`${r} L${t(o[o.length-1])}`}function qr(o,t,r){let n=ie(o,t);return n?{x:o.x+(t.x-o.x)*r/n,y:o.y+(t.y-o.y)*r/n}:o}function Wn(o,t,r){let n=r.x-t.x,i=r.y-t.y,l=n*n+i*i,a=l?Math.max(0,Math.min(1,((o.x-t.x)*n+(o.y-t.y)*i)/l)):0;return{x:t.x+a*n,y:t.y+a*i}}function Yn(o){return!o||!o.getAttribute?!1:o.id==="knob"||o.id==="rotating"?!0:o.tagName==="ellipse"&&Number(o.getAttribute("rx"))>5}function Br(o){let t=new Uint8Array(32768),r=0,n=!1;for(let[i,l]of String(o).split(/\r?\n/).entries()){let a=l.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let u=a.slice(1).match(/../g).map(M=>parseInt(M,16));if(u.reduce((M,b)=>M+b,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[p,m,v,x]=u,$=u.slice(4,4+p);if(x===0){let M=r+(m<<8|v);if(M+p>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set($,M)}else if(x===1){n=!0;break}else x===2?r=($[0]<<8|$[1])<<4:x===4&&(r=($[0]<<8|$[1])<<16)}if(!n)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var Kn=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB"],Ao='(()=>{function te(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var js=256,Ks=128,Mt=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+js),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(Ks),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,i=255){let o=this.writeHooks[e];o&&o(s,this.data[e],e,i)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:i,enableRegister:o,enableMask:n}=e;e.inverseFlag?this.data[s]&=~i:this.data[s]|=i,this.data[o]&n&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:i,flagRegister:o,flagMask:n,inverseFlag:a}=e;if(s&i){let r=this.data[o]&n;(a?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:i},o=!0){o&&(this.data[s]&=~i);let{pendingInterrupts:n,maxInterrupt:a}=this;if(n[e]&&(n[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=a;r++)if(n[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:i,flagMask:o}=e;s&o&&(this.data[i]&=~o,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:i}=this;s=this.cycles+Math.max(1,s);let o=i.pop(),n=o??{cycles:s,callback:e,next:null};n.cycles=s,n.callback=e;let{nextClockEvent:a}=this,r=null;for(;a&&a.cycles<s;)r=a,a=a.next;return r?(r.next=n,n.next=a):(this.nextClockEvent=n,n.next=a),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:i}=this,o=null;for(;s;){if(s.callback===e)return o?o.next=s.next:this.nextClockEvent=s.next,i.length<10&&i.push(s),!0;o=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let i=this.pendingInterrupts[s];te(this,i.address),i.constant||this.clearInterrupt(i)}}};function Ut(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function ee(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i+(t.data[95]&1),n=o&255;t.data[(e&496)>>4]=n;let a=t.data[95]&192;a|=n?0:2,a|=128&n?4:0,a|=(n^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o&256?1:0,a|=1&(s&i|i&~n|~n&s)?32:0,t.data[95]=a}else if((e&64512)===3072){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i&255;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(o^i)&(o^s)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=s+i&256?1:0,n|=1&(s&i|i&~o|~o&s)?32:0,t.data[95]=n}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=i+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,o,!0);let n=t.data[95]&224;n|=o?0:2,n|=32768&o?4:0,n|=~i&o&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=~o&i&32768?1:0,t.data[95]=n,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65039)===37893){let s=t.data[(e&496)>>4],i=s>>>1|128&s;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,i=(e&496)>>4;t.data[i]=~(1<<s)&t.data[i]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],i=e&7;t.data[95]=t.data[95]&191|(s>>i&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,i=t.pc+2,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc=s-1,t.cycles+=n?4:3}else if((e&65280)===38912){let s=e&248,i=e&7,o=t.readData((s>>3)+32),n=1<<i;t.writeData((s>>3)+32,o&~n,n)}else if((e&65039)===37888){let s=(e&496)>>4,i=255-t.data[s];t.data[s]=i;let o=t.data[95]&225|1;o|=i?0:2,o|=128&i?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===5120){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=((s^i)&(s^o)&128)!==0?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===1024){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],i=Ut(s)?2:1;t.pc+=i,t.cycles+=i}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],i=s-1;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===128?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if(e===38169){let s=t.pc+1,i=t.dataView.getUint16(93,!0),o=t.data[92];t.data[i]=s&255,t.data[i-1]=s>>8&255,t.data[i-2]=s>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],i=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|i],t.dataView.setUint16(30,i+1,!0),i===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.dataView.getInt8((e&7)+16),o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?2:0)|(s*i&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:o}=t;t.data[i]=s&255,t.data[i-1]=s>>8&255,o&&(t.data[i-2]=s>>16&255),t.dataView.setUint16(93,i-(o?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=o?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],i=s+1&255;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===127?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o&255-i),t.data[s]=o}else if((e&65039)===37381){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o|i),t.data[s]=o}else if((e&65039)===37383){let s=t.data[(e&496)>>4],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^i),t.data[(e&496)>>4]=i}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],i=s>>>1;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),i=2*((e&240)>>4);t.data[i]=t.data[s],t.data[i+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,i=t.data[s],o=0-i;t.data[s]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=o===128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=o?1:0,n|=1&(o|i)?32:0,t.data[95]=n}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),i=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc+=s,t.cycles+=n?3:2}else if(e===38152){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],i=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=1&s?1:0,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===2048){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);t.data[(e&496)>>4]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=t.data[95],n=s-i-(o&1);t.data[((e&240)>>4)+16]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&65280)===39424){let s=((e&248)>>3)+32,i=1<<(e&7);t.writeData(s,t.readData(s)|i,i),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let i=t.progMem[t.pc+1],o=Ut(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let i=t.progMem[t.pc+1],o=Ut(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=e&15|(e&192)>>2,n=i-o;t.dataView.setUint16(s,n,!0);let a=t.data[95]&192;a|=n?0:2,a|=32768&n?4:0,a|=i&~n&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>i?1:0,a|=1&(~i&o|o&n|n&~i)?32:0,t.data[95]=a,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],i=Ut(s)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],i=Ut(s)?2:1;t.cycles+=i,t.pc+=i}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],i=t.progMem[t.pc+1];t.writeData(i,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.writeData(i,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0);t.writeData(i,s),t.dataView.setUint16(28,i+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i;t.data[((e&240)>>4)+16]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&65039)===37890){let s=(e&496)>>4,i=t.data[s];t.data[s]=(15&i)<<4|(240&i)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,i=t.data[s],o=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=i,t.data[s]=o}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var L;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(L||(L={}));var k;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(k||(k={}));var Ge={0:{type:k.SingleEnded,channel:0},1:{type:k.SingleEnded,channel:1},2:{type:k.SingleEnded,channel:2},3:{type:k.SingleEnded,channel:3},4:{type:k.SingleEnded,channel:4},5:{type:k.SingleEnded,channel:5},6:{type:k.SingleEnded,channel:6},7:{type:k.SingleEnded,channel:7},8:{type:k.Temperature},14:{type:k.Constant,voltage:1.1},15:{type:k.Constant,voltage:0}},Gs={type:k.Constant,voltage:0},ie={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Ge,adcReferences:[L.AREF,L.AVCC,L.Reserved,L.Internal1V1]},qs=7,zs=8,Xs=16,Ke=64,se=128,Zs=31,Js=32,Qs=8,Ys=8,ti=3,ei=6,Dt=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=i=>{var o;let n=0;switch(i.type){case k.Constant:n=i.voltage;break;case k.SingleEnded:n=(o=this.channelValues[i.channel])!==null&&o!==void 0?o:0;break;case k.Differential:n=i.gain*((this.channelValues[i.positiveChannel]||0)-(this.channelValues[i.negativeChannel]||0));break;case k.Temperature:n=.378125;break}let a=n/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(a),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:Xs,enableRegister:this.config.ADCSRA,enableMask:zs},e.writeHooks[s.ADCSRA]=(i,o)=>{var n;if(i&se&&!(o&se)&&(this.conversionCycles=25),e.data[s.ADCSRA]=i,e.updateInterruptEnable(this.ADC,i),!this.converting&&i&Ke){if(!(i&se))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let a=this.cpu.data[this.config.ADMUX]&Zs;e.data[s.ADCSRB]&Qs&&(a|=32),a&=s.muxInputMask;let r=(n=s.muxChannels[a])!==null&&n!==void 0?n:Gs;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:i,ADMUX:o,ADCSRA:n}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[o]&Js?(this.cpu.data[s]=e<<6&255,this.cpu.data[i]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[i]=e>>8&3),this.cpu.data[n]&=~Ke,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&qs){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:i}=this.config,o=this.cpu.data[s]>>ei&ti;return i.length>4&&this.cpu.data[s]&Ys&&(o|=4),(e=i[o])!==null&&e!==void 0?e:L.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case L.AVCC:return this.avcc;case L.AREF:return this.aref;case L.Internal1V1:return 1.1;case L.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var si=2,ii=4,oi=8,ni=16,ai=32,oo=si|ii|oi|ni|ai;var qe={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},ze={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Xe={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Ze={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},Je={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var at={PIN:35,DDR:36,PORT:37,pinChange:Xe,externalInterrupts:[]},oe={PIN:38,DDR:39,PORT:40,pinChange:Ze,externalInterrupts:[]},J={PIN:41,DDR:42,PORT:43,pinChange:Je,externalInterrupts:[null,null,qe,ze]};var B;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(B||(B={}));var M;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(M||(M={}));var nt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(nt||(nt={}));var vt=class{constructor(e,s){var i,o,n,a;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=u=>{let P=e.data[s.PORT];return e.data[s.DDR]=u,this.writeGpio(P,u),this.updatePinRegister(u),!0},e.writeHooks[s.PORT]=u=>{let P=e.data[s.DDR];return e.data[s.PORT]=u,this.writeGpio(u,P),this.updatePinRegister(P),!0},e.writeHooks[s.PIN]=(u,P,l,A)=>{let I=e.data[s.PORT],E=e.data[s.DDR],v=I^u&A;return e.data[s.PORT]=v,this.writeGpio(v,E),this.updatePinRegister(E),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(u=>u?{address:u.interrupt,flagRegister:u.EIFR,flagMask:1<<u.index,enableRegister:u.EIMSK,enableMask:1<<u.index}:null);let f=new Set(r.map(u=>u?.EICR));for(let u of f)this.attachInterruptHook(u||0);let p=(o=(i=r.find(u=>u&&u.EIMSK))===null||i===void 0?void 0:i.EIMSK)!==null&&o!==void 0?o:0;this.attachInterruptHook(p,"mask");let d=(a=(n=r.find(u=>u&&u.EIFR))===null||n===void 0?void 0:n.EIFR)!==null&&a!==void 0?a:0;this.attachInterruptHook(d,"flag");let{pinChange:m}=s;if(this.PCINT=m?{address:m.pinChangeInterrupt,flagRegister:m.PCIFR,flagMask:1<<m.PCIE,enableRegister:m.PCICR,enableMask:1<<m.PCIE}:null,m){let{PCIFR:u,PCMSK:P}=m;e.writeHooks[u]=l=>{for(let A of this.cpu.gpioPorts){let{PCINT:I}=A;I&&e.clearInterruptByFlag(I,l)}return!0},e.writeHooks[P]=l=>{e.data[P]=l;for(let A of this.cpu.gpioPorts){let{PCINT:I}=A;I&&e.updateInterruptEnable(I,l)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],o=1<<e,n=i&o?B.InputPullUp:B.Input,a=this.openCollector&o?n:B.High;return s&o?this.lastValue&o?a:B.Low:n}setPin(e,s){let i=1<<e;this.pinValue&=~i,s&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:i,portConfig:o}=this,n=1<<e;if(s===M.None)this.overrideMask|=n,this.overrideValue&=~n;else switch(this.overrideMask&=~n,s){case M.Enable:this.overrideValue&=~n,this.overrideValue|=i.data[o.PORT]&n;break;case M.Set:this.overrideValue|=n;break;case M.Clear:this.overrideValue&=~n;break;case M.Toggle:this.overrideValue^=n;break}let a=i.data[o.DDR];this.writeGpio(i.data[o.PORT],a),this.updatePinRegister(a)}updatePinRegister(e){var s,i;let o=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=o,this.lastPin!==o){for(let n=0;n<8;n++)if((o&1<<n)!==(this.lastPin&1<<n)){let a=!!(o&1<<n);this.toggleInterrupt(n,a),(i=(s=this.externalClockListeners)[n])===null||i===void 0||i.call(s,a)}this.lastPin=o}}toggleInterrupt(e,s){let{cpu:i,portConfig:o,externalInts:n,PCINT:a}=this,{externalInterrupts:r,pinChange:f}=o,p=r[e],d=n[e];if(d&&p){let{EIMSK:m,index:u,EICR:P,iscOffset:l}=p;if(i.data[m]&1<<u){let A=i.data[P]>>l&3,I=!1;switch(d.constant=!1,A){case nt.LowLevel:I=!s,d.constant=!0;break;case nt.Change:I=!0;break;case nt.FallingEdge:I=!s;break;case nt.RisingEdge:I=s;break}I?i.setInterruptFlag(d):d.constant&&i.clearInterrupt(d,!0)}}if(f&&a&&f.mask&1<<e){let{PCMSK:m}=f;i.data[m]&1<<e+f.offset&&i.setInterruptFlag(a)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:i}=this;i.writeHooks[e]=o=>{s!=="flag"&&(i.data[e]=o);for(let n of i.gpioPorts){for(let a of n.externalInts)a&&s==="mask"&&i.updateInterruptEnable(a,o),a&&!a.constant&&s==="flag"&&i.clearInterruptByFlag(a,o);n.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let i=0;i<8;i++){let o=s[i];if(!o)continue;let n=!!(this.lastPin&1<<i),{EIFR:a,EIMSK:r,index:f,EICR:p,iscOffset:d,interrupt:m}=o;if(!(e.data[r]&1<<f)||n)continue;(e.data[p]>>d&3)===nt.LowLevel&&e.queueInterrupt({address:m,flagRegister:a,flagMask:1<<f,enableRegister:r,enableMask:1<<f,constant:!0})}}writeGpio(e,s){let i=(e&this.overrideMask|this.overrideValue)&s|e&~s,o=this.lastValue;if(i!==o||s!==this.lastDdr){this.lastValue=i,this.lastDdr=s;for(let n of this.listeners)n(i,o)}}};var ts={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},kt;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(kt||(kt={}));var ae={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},re=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:ts,compPortA:J.PORT,compPinA:6,compPortB:J.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:J.PORT,externalClockPin:4},ae),ce=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:ts,compPortA:at.PORT,compPinA:1,compPortB:at.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:J.PORT,externalClockPin:5},ae),le=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:at.PORT,compPinA:3,compPortB:J.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},ae),mt;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(mt||(mt={}));var U;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(U||(U={}));var y;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(y||(y={}));var Q=1,gt=2,rt=1,{Normal:fe,PWMPhaseCorrect:q,CTC:Kt,FastPWM:z,Reserved:ne,PWMPhaseFrequencyCorrect:Bt}=mt,ri=[[fe,255,y.Immediate,U.Max,0],[q,255,y.Top,U.Bottom,0],[Kt,Q,y.Immediate,U.Max,0],[z,255,y.Bottom,U.Max,0],[ne,255,y.Immediate,U.Max,0],[q,Q,y.Top,U.Bottom,rt],[ne,255,y.Immediate,U.Max,0],[z,Q,y.Bottom,U.Top,rt]],ci=[[fe,65535,y.Immediate,U.Max,0],[q,255,y.Top,U.Bottom,0],[q,511,y.Top,U.Bottom,0],[q,1023,y.Top,U.Bottom,0],[Kt,Q,y.Immediate,U.Max,0],[z,255,y.Bottom,U.Top,0],[z,511,y.Bottom,U.Top,0],[z,1023,y.Bottom,U.Top,0],[Bt,gt,y.Bottom,U.Bottom,0],[Bt,Q,y.Bottom,U.Bottom,rt],[q,gt,y.Top,U.Bottom,0],[q,Q,y.Top,U.Bottom,rt],[Kt,gt,y.Immediate,U.Max,0],[ne,65535,y.Immediate,U.Max,0],[z,gt,y.Bottom,U.Top,rt],[z,Q,y.Bottom,U.Top,rt]];function li(t){switch(t){case 1:return M.Toggle;case 2:return M.Clear;case 3:return M.Set;default:return M.Enable}}var Qe=128,Ye=64,fi=32,_t=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=y.Immediate,this.tovUpdateMode=U.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(i=!0,o=!1)=>{let{divider:n,lastCycle:a,cpu:r}=this,{cycles:f}=r,p=f-a;if(n&&p>=n||o){let d=o?1:Math.floor(p/n);this.lastCycle+=d*n;let m=this.tcnt,{timerMode:u,TOP:P}=this,l=u===q||u===Bt,A=l?this.phasePwmCount(m,d):(m+d)%(P+1),I=m+d>P;if(this.tcntUpdated||(this.tcnt=A,l||this.timerUpdated(A,m)),!l){if(u===z&&I){let{compA:E,compB:v}=this;E&&this.updateCompPin(E,"A",!0),v&&this.updateCompPin(v,"B",!0)}this.ocrUpdateMode==y.Bottom&&I&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),I&&(this.tovUpdateMode==U.Top||P===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===y.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===y.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:d}=this,{externalClockPin:m}=this.config,u=this.config.dividers[d];this.lastCycle=u?this.cpu.cycles:0,this.updateDivider=!1,this.divider=u,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[m]=null),u?r.addClockEvent(this.count,this.lastCycle+u-r.cycles):this.externalClockPort&&(d===kt.FallingEdge||d===kt.RisingEdge)&&(this.externalClockPort.externalClockListeners[m]=this.externalClockCallback,this.externalClockRisingEdge=d===kt.RisingEdge);return}i&&n&&r.addClockEvent(this.count,this.lastCycle+n-r.cycles)},this.externalClockCallback=i=>{i===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=i=>(this.count(!1),this.config.bits===16&&(this.cpu.data[i+1]=this.tcnt>>8),this.cpu.data[i]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=i=>{this.tcntNext=this.highByteTemp<<8|i,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=i=>{this.nextOcrA=this.highByteTemp<<8|i,this.ocrUpdateMode===y.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=i=>{this.nextOcrB=this.highByteTemp<<8|i,this.ocrUpdateMode===y.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=i=>{this.nextOcrC=this.highByteTemp<<8|i,this.ocrUpdateMode===y.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=n=>{this.icr=this.highByteTemp<<8|n};let i=n=>{this.highByteTemp=n},o=(n,a,r)=>(this.highByteTemp=n&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=i,this.cpu.writeHooks[s.OCRA+1]=o,this.cpu.writeHooks[s.OCRB+1]=o,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=o),this.cpu.writeHooks[s.ICR+1]=i}e.writeHooks[s.TCCRA]=i=>(this.cpu.data[s.TCCRA]=i,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=i=>(s.TCCRC||(this.checkForceCompare(i),i&=~(Qe|Ye)),this.cpu.data[s.TCCRB]=i,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=i=>{this.checkForceCompare(i)}),e.writeHooks[s.TIFR]=i=>(this.cpu.data[s.TIFR]=i,this.cpu.clearInterruptByFlag(this.OVF,i),this.cpu.clearInterruptByFlag(this.OCFA,i),this.cpu.clearInterruptByFlag(this.OCFB,i),!0),e.writeHooks[s.TIMSK]=i=>{this.cpu.updateInterruptEnable(this.OVF,i),this.cpu.updateInterruptEnable(this.OCFA,i),this.cpu.updateInterruptEnable(this.OCFB,i)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case Q:return this.ocrA;case gt:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case Q:case gt:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,i=e.bits===16?ci:ri,o=this.cpu.data[e.TCCRA],[n,a,r,f,p]=i[s];this.timerMode=n,this.topValue=a,this.ocrUpdateMode=r,this.tovUpdateMode=f;let d=n===z||n===q||n===Bt,m=this.compA;this.compA=o>>6&3,this.compA===1&&d&&!(p&rt)&&(this.compA=0),!!m!=!!this.compA&&this.updateCompA(this.compA?M.Enable:M.None);let u=this.compB;if(this.compB=o>>4&3,this.compB===1&&d&&(this.compB=0),!!u!=!!this.compB&&this.updateCompB(this.compB?M.Enable:M.None),this.hasOCRC){let P=this.compC;this.compC=o>>2&3,this.compC===1&&d&&(this.compC=0),!!P!=!!this.compC&&this.updateCompC(this.compC?M.Enable:M.None)}}phasePwmCount(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a,TOP:r,MAX:f,tcntUpdated:p}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===y.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!p&&(this.countingUp=!1,this.ocrUpdateMode===y.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!p&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===y.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),p||(e===i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===o&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&e===n&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&f}timerUpdated(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a}=this,r=s>e;((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&((s<n||r)&&e>=n||s<n&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==mt.FastPWM||this.timerMode==mt.PWMPhaseCorrect||this.timerMode==mt.PWMPhaseFrequencyCorrect||(e&Qe&&this.updateCompPin(this.compA,"A"),e&Ye&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&fi&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,i=!1){let o=M.None,n=e===3,a=this.countingUp===n;switch(this.timerMode){case fe:case Kt:o=li(e);break;case z:e===1?o=i?M.None:M.Toggle:o=n!==i?M.Set:M.Clear;break;case q:case Bt:e===1?o=M.Toggle:o=a?M.Set:M.Clear;break}o!==M.None&&(s==="A"?this.updateCompA(o):s==="B"?this.updateCompB(o):this.updateCompC(o))}updateCompA(e){let{compPortA:s,compPinA:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompB(e){let{compPortB:s,compPinB:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompC(e){let{compPortC:s,compPinC:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}};var de={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},hi=128,di=64,es=32;var he=2,xi=1,ss=he,ui=128,Ci=64,pi=32,Gt=16,qt=8,as=4;var is=as|Gt|qt;var gi=32,mi=16,Ri=8,os=4,ns=2;var Si={5:31,6:63,7:127,8:255,9:255},Ot=class{constructor(e,s,i){this.cpu=e,this.config=s,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:hi,enableRegister:this.config.UCSRB,enableMask:ui,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:es,enableRegister:this.config.UCSRB,enableMask:pi},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:di,enableRegister:this.config.UCSRB,enableMask:Ci},this.reset(),this.cpu.writeHooks[s.UCSRA]=(o,n)=>{var a;return e.data[s.UCSRA]=o&(xi|he),e.clearInterruptByFlag(this.TXC,o),(o&ss)!==(n&ss)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(o,n)=>{var a;return e.updateInterruptEnable(this.RXC,o),e.updateInterruptEnable(this.UDRE,o),e.updateInterruptEnable(this.TXC,o),o&Gt&&n&Gt&&e.clearInterrupt(this.RXC),o&qt&&!(n&qt)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=o,(o&is)!==(n&is)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=o=>{var n;return e.data[s.UCSRC]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var o;let n=(o=Si[this.bitsPerChar])!==null&&o!==void 0?o:255,a=this.rxByte&n;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),a},this.cpu.writeHooks[s.UDR]=o=>{if(this.onByteTransmit&&this.onByteTransmit(o),this.onLineTransmit){let n=String.fromCharCode(o);n===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=n}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=o=>{var n;return this.cpu.data[s.UBRRH]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.writeHooks[s.UBRRL]=o=>{var n;return this.cpu.data[s.UBRRL]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=es,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=os|ns,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var i;let{cpu:o}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,o.setInterruptFlag(this.RXC),(i=this.onRxComplete)===null||i===void 0||i.call(this);else return this.rxBusyValue=!0,o.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&he?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Gt)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&qt)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(os|ns))>>1|this.cpu.data[this.config.UCSRB]&as){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&Ri?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&gi)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&mi)}};function rs(t){let e=new Uint8Array(32768),s=0,i=!1;for(let[o,n]of String(t).split(/\\r?\\n/).entries()){let a=n.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${o+1}).`);let r=a.slice(1).match(/../g).map(P=>parseInt(P,16));if(r.reduce((P,l)=>P+l,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${o+1}).`);let[f,p,d,m]=r,u=r.slice(4,4+f);if(m===0){let P=s+(p<<8|d);if(P+f>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(u,P)}else if(m===1){i=!0;break}else m===2?s=(u[0]<<8|u[1])<<4:m===4&&(s=(u[0]<<8|u[1])<<16)}if(!i)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var G=16e6,Ai=[[J,["D0","D1","D2","D3","D4","D5","D6","D7"]],[at,["D8","D9","D10","D11","D12","D13"]],[oe,["A0","A1","A2","A3","A4","A5"]]];function cs(t){let e=new Mt(rs(t));[re,ce,le].forEach(l=>new _t(e,l));let s=new Ot(e,de,G),i=new Dt(e,ie),o=Ai.map(([l,A])=>[new vt(e,l),A]),n={};for(let[l,A]of o)A.forEach((I,E)=>n[I]=[l,E]);let a=null;i.onADCRead=l=>{let A=0;if(l.type===k.SingleEnded){let v=i.channelValues[l.channel]||0;A=a?a(l.channel,v):v}else l.type===k.Constant?A=l.voltage:l.type===k.Temperature&&(A=.378125);let I=Math.round(A*1e6)/1e6,E=Math.min(1023,Math.max(0,Math.floor(I/i.referenceVoltage*1024)));e.addClockEvent(()=>i.completeADCRead(E),i.sampleCycles)};let r=[],f=[],p=[],d=[],m=u();function u(){let l={};for(let[A,I]of o)I.forEach((E,v)=>l[E]=A.pinState(v));return l}for(let[l]of o)l.addListener(()=>{let A=u(),I={};for(let E in A)A[E]!==m[E]&&(I[E]=A[E]);m=A,Object.keys(I).length&&f.forEach(E=>E(I,A))});s.onByteTransmit=l=>p.forEach(A=>A(l));function P(l){let A=e.cycles+l;for(;e.cycles<A;){let I=Math.min(A,e.cycles+G/1e3);for(;e.cycles<I;)ee(e),e.tick();d.length&&!s.rxBusy&&(s.writeByte(d[0]),d.shift());for(let E of r)E()}}return{correr:P,estados:u,get ciclos(){return e.cycles},alCambiarPines:l=>f.push(l),alByteSerial:l=>p.push(l),enviarSerial:l=>d.push(...new TextEncoder().encode(l)),ponerAnalogico:(l,A)=>i.channelValues[l]=Math.max(0,Math.min(5,A)),ponerLectorAnalogico:l=>a=l,ponerEntrada(l,A){let I=n[l];I&&I[0].setPin(I[1],!!A)},alCadaMs:l=>r.push(l)}}var Ii=["a","b","c","d","e"],Ti=["f","g","h","i","j"],xe={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},wi=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],ls={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},ue=t=>14.4+(t-1)*9.6,Pi=t=>t>=2&&(t-1)%6!==0,Ce=new Map;function ge(t="media"){if(Ce.has(t))return Ce.get(t);let e=ls[t]||ls.media,s=[];Ce.set(t,s);for(let i=1;i<=e.columnas;i++){for(let o of Ii)s.push({nombre:o+i,x:ue(i),y:xe[o],tira:"arriba"+i});for(let o of Ti)s.push({nombre:o+i,x:ue(i),y:xe[o],tira:"abajo"+i});for(let[o]of wi)Pi(i)&&s.push({nombre:o+i,x:ue(i),y:xe[o],tira:o})}return s}var pe=new Map;function fs(t="media"){if(pe.has(t))return pe.get(t);let e=new Map;pe.set(t,e);for(let s of ge(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var yi=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Rt(t,{presionados:e=new Set,conduccion:s=!1}={}){let i=new Map,o=a=>{for(i.has(a)||i.set(a,a);i.get(a)!==a;)i.set(a,i.get(i.get(a))),a=i.get(a);return a},n=(a,r)=>i.set(o(a),o(r));for(let a of yi)a.forEach(r=>n("placa."+a[0],"placa."+r));for(let a of t.cables)n(a.de,a.a);if(t.protoboard){for(let a of fs(t.protoboard.tipo).values())a.forEach(r=>n("protoboard."+a[0],"protoboard."+r));for(let a of t.componentes)if(a.en)for(let[r,f]of Object.entries(a.en))n(a.id+"."+r,f)}for(let a of t.componentes)a.tipo==="pulsador"?(n(a.id+".1i",a.id+".1d"),n(a.id+".2i",a.id+".2d"),e.has(a.id)&&n(a.id+".1i",a.id+".2i")):s&&a.tipo==="resistencia"?n(a.id+".1",a.id+".2"):s&&a.tipo==="potenciometro"&&(n(a.id+".GND",a.id+".SIG"),n(a.id+".SIG",a.id+".VCC"));return o}function Re(t,e,s,i){e>=0&&(t[e][e]+=i),s>=0&&(t[s][s]+=i),e>=0&&s>=0&&(t[e][s]-=i,t[s][e]-=i)}function me(t,e,s){e>=0&&(t[e]+=s)}var ct=(t,e)=>e>=0?t[e]:0;function Vt(t,e,s){return{a:t,b:e,g:1/s,sellar(i){Re(i,this.a,this.b,this.g)},corriente(i){return(ct(i,this.a)-ct(i,this.b))*this.g}}}function hs(t){return{nodo:t,v:0,g:0,sellar(e,s){Re(e,this.nodo,-1,this.g),me(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-ct(e,this.nodo))*this.g}}}function ds(t,e){return{nodo:t,v:e,fila:-1,sellar(s,i){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,i[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function xs(t,e,{Is:s,n:i}){let o=i*.025693,n=o*Math.log(o/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(a,r){let f=Math.exp(this.vd/o),p=s*(f-1),d=s*f/o+1e-12,m=p-d*this.vd;Re(a,this.a,this.k,d),me(r,this.a,-m),me(r,this.k,m)},actualizar(a){let r=ct(a,this.a)-ct(a,this.k),f=Math.abs(r-this.vd);return this.vd=Ei(r,this.vd,o,n),f},corriente(a){let r=ct(a,this.a)-ct(a,this.k);return s*Math.expm1(r/o)}}}function Ei(t,e,s,i){if(t>i&&Math.abs(t-e)>2*s){if(e>0){let o=1+(t-e)/s;return o>0?e+s*Math.log(o):i}return s*Math.log(t/s)}return t}function us(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let i=t.nodos+t.fuentes,o=t.elementos.filter(a=>a.noLineal),n=new Float64Array(i);for(let a=1;a<=e;a++){let r=Array.from({length:i},()=>new Float64Array(i)),f=new Float64Array(i);for(let d of t.elementos)d.sellar(r,f);for(let d=0;d<t.nodos;d++)r[d][d]+=1e-12;if(n=bi(r,f),!o.length)return{x:n,iteraciones:a,convergio:!0};let p=0;for(let d of o)p=Math.max(p,d.actualizar(n));if(p<s)return{x:n,iteraciones:a,convergio:!0}}return{x:n,iteraciones:e,convergio:!1}}function bi(t,e){let s=e.length;for(let o=0;o<s;o++){let n=o;for(let a=o+1;a<s;a++)Math.abs(t[a][o])>Math.abs(t[n][o])&&(n=a);if(Math.abs(t[n][o])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[o],t[n]]=[t[n],t[o]],[e[o],e[n]]=[e[n],e[o]];for(let a=o+1;a<s;a++){let r=t[a][o]/t[o][o];if(r){for(let f=o;f<s;f++)t[a][f]-=r*t[o][f];e[a]-=r*e[o]}}}let i=new Float64Array(s);for(let o=s-1;o>=0;o--){let n=e[o];for(let a=o+1;a<s;a++)n-=t[o][a]*i[a];i[o]=n/t[o][o]}return i}var lt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},Se=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],Ui={A4:"SDA",A5:"SCL"},W={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},Di=.25,Cs={minimo:1};function vi(t){let s=(W.vf[t]||W.vf.rojo)-W.iRef*W.rs;return{Is:W.iRef/Math.expm1(s/(W.n*.025693)),n:W.n}}var ps={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function gs(t,{quemados:e=new Set,presionados:s=new Set}={}){let i=Rt(t,{presionados:s}),o=Rt(t,{presionados:s,conduccion:!0}),n=i("placa.GND1"),a=new Map,r=0,f=C=>{let S=i(C);return S===n?-1:(a.has(S)||a.set(S,r++),a.get(S))},p=C=>i(C)===n?-1:a.get(i(C)),d=[],m=[],u=[],P=new Set(t.cables.flatMap(C=>[C.de,C.a])),l=[];if(t.protoboard){let C=new Set([...P].map(i));for(let S of t.componentes)for(let T of Object.keys(S.en||{}))C.add(i(S.id+"."+T));for(let S of ge(t.protoboard.tipo)){let T="protoboard."+S.nombre;C.has(i(T))&&l.push(T)}}let A=new Map;for(let[C,S]of[["5V",5],["3V3",3.3]]){if(!P.has("placa."+C))continue;let T=f("placa."+C),w=T===-1?"GND":A.get(T);if(w){u.push({tipo:"cortocircuito",componente:"placa."+C,mensaje:`El pin ${C} est\\xE1 unido directo a ${w}: es un cortocircuito.`});continue}A.set(T,C);let g=ds(T,S);m.push(g),d.push(g)}let I={};for(let C of Se)!P.has("placa."+C)&&!P.has("placa."+Ui[C])||(I[C]=hs(f("placa."+C)),d.push(I[C]));let E=[],v=[],K=[];for(let C of t.componentes)if(C.tipo==="resistencia"){let S=Vt(f(C.id+".1"),f(C.id+".2"),Number(C.props.ohmios)||1);E.push({id:C.id,ohmios:Number(C.props.ohmios)||1,el:S}),S.a!==S.b&&d.push(S)}else if(C.tipo==="led"){let S=f(C.id+".anodo"),T=f(C.id+".catodo"),w={id:C.id,a:S,k:T,quemado:e.has(C.id)};if(!w.quemado&&S!==T){let g=r++;w.rs=Vt(S,g,W.rs),w.diodo=xs(g,T,vi(C.props.color)),d.push(w.rs,w.diodo)}v.push(w)}else if(C.tipo==="potenciometro"){let S=Number(C.props.ohmios)||1e4,T=Math.max(0,Math.min(1,Number(C.props.posicion))),w=f(C.id+".GND"),g=f(C.id+".SIG"),D=f(C.id+".VCC"),dt=Vt(w,g,Math.max(Cs.minimo,S*T)),xt=Vt(g,D,Math.max(Cs.minimo,S*(1-T)));for(let X of[dt,xt])X.a!==X.b&&d.push(X);K.push({id:C.id,ohmios:S,posicion:T,bajo:dt,alto:xt})}m.forEach((C,S)=>C.fila=r+S);function st(C){let S=new Set([o("placa.GND1")]);for(let T of["5V","3V3"])P.has("placa."+T)&&S.add(o("placa."+T));for(let T of Se){let w=C[T];(w===B.High||w===B.Low||w===B.InputPullUp)&&S.add(o("placa."+T))}return S}let O=new Set([...P,...l]);for(let C of t.componentes)for(let S of ps[C.tipo]||[])O.add(C.id+"."+S);return{fallasFijas:u,flotantes(C){let S=st(C),T=new Set;for(let w of Se)C[w]===B.Input&&!S.has(o("placa."+w))&&T.add(w);return T},refsAlAire(C){let S=st(C),T=new Set;for(let w of O)S.has(o(w))||T.add(w);return T},ponerPines(C){for(let[S,T]of Object.entries(I)){let w=C[S];w===B.High?Object.assign(T,{v:lt.voltios,g:1/lt.rAlto}):w===B.Low?Object.assign(T,{v:0,g:1/lt.rBajo}):w===B.InputPullUp?Object.assign(T,{v:lt.voltios,g:1/lt.rPullUp}):Object.assign(T,{v:0,g:0})}},resolver(){let C=us({nodos:r,fuentes:m.length,elementos:d}),S=g=>{let D=p(g);return D===void 0?null:D<0?0:C.x[D]},T={};for(let g of P)T[g]=S(g);for(let g of l)T[g]=S(g);for(let g of t.componentes)for(let D of ps[g.tipo]||[])T[g.id+"."+D]=S(g.id+"."+D);let w=(g,D)=>g===null||D===null?null:g-D;return{convergio:C.convergio,iteraciones:C.iteraciones,voltajes:T,leds:v.map(g=>{let D=g.diodo?g.diodo.corriente(C.x):0;return{id:g.id,quemado:g.quemado,v:w(S(g.id+".anodo"),S(g.id+".catodo")),i:D,brillo:Math.max(0,Math.min(1,D*1e3/W.plenomA))}}),resistencias:E.map(g=>{let D=g.el.a===g.el.b?0:g.el.corriente(C.x);return{id:g.id,ohmios:g.ohmios,v:w(S(g.id+".1"),S(g.id+".2")),i:D,w:D*D*g.ohmios}}),pines:Object.entries(I).filter(([,g])=>g.g>0).map(([g,D])=>({pin:g,v:S("placa."+g),i:D.corriente(C.x)})),fuentes:m.map(g=>({pin:g.v===5?"5V":"3V3",i:g.corriente(C.x)})),potenciometros:K.map(g=>({id:g.id,ohmios:g.ohmios,posicion:g.posicion,v:w(S(g.id+".SIG"),S(g.id+".GND")),i:Math.abs(g.bajo.a!==g.bajo.b?g.bajo.corriente(C.x):g.alto.a!==g.alto.b?g.alto.corriente(C.x):0)}))}}}}function ms(t,e){let s=o=>(Math.abs(o)*1e3).toFixed(0),i=[];if(e.danoComponentes){for(let o of t.leds)!o.quemado&&o.i*1e3>W.quemamA&&i.push({tipo:"led_quemado",componente:o.id,corriente_mA:+(o.i*1e3).toFixed(1),mensaje:`El LED ${o.id} se quem\\xF3: le pasaron ${s(o.i)} mA y aguanta unos ${W.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let o of t.resistencias)o.w>Di&&i.push({tipo:"resistencia_caliente",componente:o.id,potencia_W:+o.w.toFixed(2),mensaje:`La resistencia ${o.id} se calienta: disipa ${o.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let o of t.pines)if(Math.abs(o.i)*1e3>lt.maxmA){let n=o.pin.startsWith("D")?"pin "+o.pin.slice(1):"pin "+o.pin;i.push({tipo:"corriente_pin",componente:"placa."+o.pin,corriente_mA:+(Math.abs(o.i)*1e3).toFixed(1),mensaje:`El ${n} entrega ${s(o.i)} mA y aguanta ${lt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return i}var ht={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:6,movimiento:200,arranque:590},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},angulos:{centroUs:1472,usPorGradoBajo:11.180722891566266,usPorGradoAlto:10.91764705882353},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},ft={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,bandaGrados:8,voltiosRef:4.8};function ki(t,e="sg90"){let s=(ht[e]||ht.sg90).angulos,i=t<=s.centroUs?90-(s.centroUs-t)/s.usPorGradoBajo:90+(t-s.centroUs)/s.usPorGradoAlto;return Math.max(0,Math.min(180,i))}function Rs(t){let e=ht[t]||ht.sg90,s=90,i=90,o=null,n=0,a=!1,r=0,f=0;return{pulso(p){p<ft.pulsoValidoMin||p>ft.pulsoValidoMax||o!==null&&Math.abs(p-o)<ft.bandaMuerta||(o=p,i=ki(p,t))},avanzar(p,d){if(!(d>0)){a=!1,n=0;return}let m=60/(e.seg60*1e3)*(d/ft.voltiosRef),u=i-s,P=Math.abs(u)>.01;r=Math.min(1,Math.abs(u)/ft.bandaGrados),P&&!a&&(n=ft.arranqueMs,f=r),a=P,a&&(s+=Math.sign(u)*Math.min(Math.abs(u),m*p)),n=Math.max(0,n-p)},corriente(p){if(!(p>0))return 0;let{reposo:d,movimiento:m,arranque:u}=e.mA;return(n>0?d+(u-d)*f:a?d+(m-d)*r:d)/1e3*(p/ft.voltiosRef)},estado:()=>({angulo:s,objetivo:i,pulso:o,moviendo:a,arrancando:n>0})}}var St=9.6/2.54,zt=57.6,Ss=14.4,dn={x:Ss,ancho:32.2*St},Bi={x:Ss+(32.2-22.2)/2*St,ancho:22.2*St,alto:11.8*St},xn={x:Bi.x+5.9*St,y:zt},un=13.5*St,Ae=182.4;var Cn={GND:{x:Ae,y:zt-9.6,color:"#7a4a24"},VCC:{x:Ae,y:zt,color:"#d7263d"},SIG:{x:Ae,y:zt+9.6,color:"#f28c28"}};var N={voltios:5.11,ohmios:1.66,idealV:5,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function Ie(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=N.fusible,i=(8**2-t**2)*e,o=0,n=!1;return{avanzar(a,r){let f=a/1e3;!n&&r>t?o+=(r**2-t**2)/i*f:o=Math.max(0,o-f/s),o>=1&&(n=!0),n&&o===0&&(n=!1)},get abierto(){return n},get calor(){return o},reiniciar(){o=0,n=!1}}}var As=(t,e=0)=>Math.max(0,(N.voltios-N.ohmios*t)/(1+N.ohmios*e));var _i=60,Te=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],Is=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Oi=3,Vi=1.5,Fi=1/1e4,Ts=60,Wi=Math.cos(.35*Math.PI),Ni=.1*5/1024,$i=.15,Hi=100,ws=50;function Ps({hex:t,circuito:e,activas:s={},semilla:i=Math.floor(Math.random()*2**32)}){let o=Ki(i),n=new Set,a=[],r={raiz:null,grupos:new Set},f=new Set,p=new Set,d=new Set,m={},u=new Map,P={},l=null,A=e,I=null,E=new Map,v=new Map,K=new Map,st=[],O="",C=0,S={inicio:0,clave:""},T=null,w=null,g=-1/0,D={},dt=0,xt=0,X=[],be=new TextDecoder("utf-8"),It=new Set,Zt=new Set,Jt=[],ut=[],Z=new Map,Tt=0,wt=Ie(),$=!1,Y=null,Me=0,Ct=N.idealV,Qt=0,Yt=0,$t=0,Ht=0,Pt=[],it=()=>(Tt+l.ciclos)/G*1e3,Ue=c=>{let h="";for(let R in c)h+=c[R];return h};function Lt(){l=cs(t);let c=l.estados();O=Ue(c),v.set(O,c),C=0,K=new Map,st=[],S={inicio:0,clave:O},T=null,l.alCambiarPines((h,R)=>{De(),O=Ue(R),v.has(O)||v.set(O,R),O===S.clave&&(T={tiempos:new Map(K),ciclo:l.ciclos}),g=l.ciclos;for(let x in h)D[x]=l.ciclos;ot(),Z.size&&ks(h)}),l.alCadaMs(Os),l.alCadaMs(_e);for(let h of Z.values())h.subida=null;g=-1/0,D={},l.ponerLectorAnalogico(Vs),l.alByteSerial(h=>{X.push(h),xt=it()+_i})}function De(){let c=l.ciclos;K.set(O,(K.get(O)||0)+(c-C)),C=c}function yt(){I=gs(A,{quemados:It,presionados:n}),E=new Map,vs(),ve()}function ve(){if(!a.length){r={raiz:null,grupos:new Set};return}let c=Rt(A,{presionados:n,conduccion:!0});r={raiz:c,grupos:new Set(a.map(c))}}let ke=c=>r.grupos.size>0&&r.grupos.has(r.raiz(c)),Ds=()=>Math.sin(2*Math.PI*Ts*(it()/1e3))>Wi;function vs(){let c=Rt(A),h=(x,b)=>c(x)===c(b),R=new Map;for(let x of A.componentes){if(x.tipo!=="servo")continue;let b=ht[x.props&&x.props.modelo]?x.props.modelo:"sg90",F=Z.get(x.id),H=F&&F.modelo===b?F:{modelo:b,logico:Rs(b),subida:null,sumaA:0,picoA:0,msVentana:0};H.senal=Xt.find(bt=>h(x.id+".SIG","placa."+bt))||null;let jt=h(x.id+".GND","placa.GND1"),Et=Xt.find(bt=>h(x.id+".VCC","placa."+bt));H.fuente=h(x.id+".VCC","placa.5V")?"5V":h(x.id+".VCC","placa.3V3")?"3V3":Et||null,H.conectado=jt&&(H.fuente==="5V"||H.fuente==="3V3"),Et&&jt&&pt({tipo:"servo_alimentacion",componente:x.id,mensaje:`El servo ${x.id} toma la corriente del pin ${Et.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${ht[b].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),R.set(x.id,H)}Z=R}function ks(c){for(let h of Z.values())!h.senal||!(h.senal in c)||(c[h.senal]===B.High?h.subida=l.ciclos:h.subida!==null&&(h.conectado&&!$&&h.logico.pulso((l.ciclos-h.subida)/G*1e6),h.subida=null))}let Be=c=>!c.conectado||$?0:c.fuente==="5V"?Ct:3.3;function _e(){for(let x of Z.values())x.logico.avanzar(1,Be(x));let c=$?0:N.placaA+Me,h=0;for(let x of Z.values())x.conectado&&x.fuente==="5V"&&(h+=x.logico.corriente(1));Ct=$?0:s.limiteUSB?As(c,h):N.idealV;let R=c;for(let x of Z.values()){let b=x.logico.corriente(Be(x));x.sumaA+=b,x.picoA=Math.max(x.picoA,b),x.msVentana++,(x.fuente==="5V"||x.fuente==="3V3")&&(R+=b)}s.limiteUSB&&(wt.avanzar(1,R),!$&&!Y&&(Ct<N.bodV?Y={motivo:"caida",amperios:R,voltios:Ct}:R>N.limitePuertoA?Y={motivo:"puerto",amperios:R}:wt.abierto&&(Y={motivo:"fusible",amperios:R}))),Yt+=R,$t=Math.max($t,R),Ht++}function Bs(){let{motivo:c,amperios:h,voltios:R}=Y;Y=null,c==="caida"?pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),voltios:Math.round(R*100)/100,mensaje:`La placa se reinici\\xF3: los servos arrancaron a la vez y el 5V baj\\xF3 a ${R.toFixed(1).replace(".",",")} V; por debajo de 2,7 V el Arduino se reinicia. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):c==="puerto"?pt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${h.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(N.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(pt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(h*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),$=!0),Qt++,Tt+=l.ciclos,Lt(),ot()}function _s(c){let h=G/1e3,R=c;for(;R>0&&$;){let x=Math.min(R,h);Tt+=x,R-=x,_e(),wt.abierto||($=!1)}R>0&&l.correr(R)}function Oe(){let c=it();Pt=Pt.filter(([R])=>c-R<1e3),Pt.push([c,$t]);let h={amperios:Ht?Yt/Ht:0,pico:Math.max(...Pt.map(([,R])=>R)),voltios:Ct,fusible:Math.round(wt.calor*100)/100,apagada:$,reinicios:Qt};return Yt=0,$t=0,Ht=0,h}function Ve(){let c={};for(let[h,R]of Z){let x=R.logico.estado();c[h]={modelo:R.modelo,angulo:Math.round(x.angulo*10)/10,pulso:x.pulso===null?null:Math.round(x.pulso),senal:R.senal,fuente:R.fuente,moviendo:x.moviendo,i:R.msVentana?R.sumaA/R.msVentana:R.logico.corriente(R.voltios),pico:R.picoA},R.sumaA=0,R.picoA=0,R.msVentana=0}return c}function ot(){if(!I||!l)return;let c=v.get(O)||l.estados(),h=We(O),R=I.flotantes(c);f=new Set;for(let x of Is){let b=c[x];if(b!==B.Input&&b!==B.InputPullUp)continue;if(R.has(x)){f.add(x),x in m||(m[x]=o()<.5),l.ponerEntrada(x,s.entradaFlotante?m[x]:!1);continue}let F=h?h.voltajes["placa."+x]:null,H;typeof F=="number"?H=F>=Oi?!0:F<=Vi?!1:!!P[x]:H=b===B.InputPullUp,P[x]=H,l.ponerEntrada(x,H)}p=new Set,Te.forEach((x,b)=>{R.has(x[0])&&p.add(b)}),h&&Ne(h),d=I.refsAlAire(c)}function Os(){if(!(!s.entradaFlotante||!f.size))for(let c of f){let h=ke("placa."+c)?Ds():o()<Fi?!m[c]:m[c];h!==m[c]&&(m[c]=h,l.ponerEntrada(c,h))}}function Vs(c,h){if(p.has(c)){if(!s.entradaFlotante)return 0;if(ke("placa."+Te[c][0]))return 2.5+2.5*Math.sin(2*Math.PI*Ts*(it()/1e3));let R=u.has(c)?u.get(c):1+3*o(),x=Math.max(0,Math.min(5,R+Fe()*$i));return u.set(c,x),x}return s.ruidoADC?h+Fe()*Ni:h}function Fe(){return Math.sqrt(-2*Math.log(1-o()))*Math.cos(2*Math.PI*o())}function pt(c){let h=c.tipo+"|"+c.componente;return Zt.has(h)?!1:(Zt.add(h),Jt.push(c),ut.push(c),!0)}function We(c){for(let h=0;h<4;h++){let R=E.get(c);if(R)return R;I.ponerPines(v.get(c));let x=null;try{x=I.resolver()}catch{x=null}if(dt++,!x||!x.convergio)return pt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;E.set(c,x);let b=!1;for(let F of[...I.fallasFijas,...ms(x,s)])pt(F)&&F.tipo==="led_quemado"&&(It.add(F.componente),b=!0);if(!b)return x;yt()}return E.get(c)||null}function Fs(){if($)return Ws();De();let c=K;if(T&&T.ciclo>S.inicio){c=T.tiempos;let _=new Map;for(let[V,tt]of K){let je=tt-(T.tiempos.get(V)||0);je>0&&_.set(V,je)}K=_,S={inicio:T.ciclo,clave:S.clave}}else K=new Map,S={inicio:l.ciclos,clave:O};T=null;let h=[...c].filter(([,_])=>_>0);h.length||(h=st.length?st:[[O,1]]),st=h;let R=h.reduce((_,[,V])=>_+V,0),x=[];for(let[_,V]of h){let tt=We(_);if(!tt){x.length=0;break}x.push([tt,V/R])}let b=x.length?ji(x):null,F=new Set(Xt.filter(_=>_ in D&&l.ciclos-D[_]<ws/1e3*G));b&&(b.pwm=Li(h,R,F)),Ne(b);let jt=l.ciclos-g>ws/1e3*G?1:1-Math.exp(-(R/G*1e3)/Hi);w=b?we(b,w,jt):null;let Et=l.estados(),bt=X.length?be.decode(Uint8Array.from(X),{stream:!0}):"";X=[];let He=Ve(),Le=Oe();if(Me=w?w.fuentes.reduce((_,V)=>_+Math.max(0,V.i),0):0,w){w.usb=Le,w.servos=Object.entries(He).map(([V,tt])=>({id:V,...tt}));let _=(w.fuentes.find(V=>V.pin==="5V")||{i:0}).i;w.consumo5V=_+w.servos.filter(V=>V.fuente==="5V").reduce((V,tt)=>V+tt.i,0)}let Ls=ut;return ut=[],{msSimulados:it(),servos:He,evaluaciones:dt,leds:Object.fromEntries((w?w.leds:[]).map(_=>[_.id,_.brillo])),quemados:[...It],voltajes:Ns(),entradas:$s(),placa:{led13:Et.D13===B.High,ledTX:it()<xt},serial:bt,fallas:Ls,medicion:w,energia:Le}}function Ws(){let c=ut;return ut=[],{msSimulados:it(),evaluaciones:dt,servos:Ve(),energia:Oe(),leds:{},quemados:[...It],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:c,medicion:null}}function Ns(){if(!w)return{};if(!d.size)return w.voltajes;let c={...w.voltajes};for(let h of d)h in c&&(c[h]=null);return c}function $s(){let c={};for(let h of Is)f.has(h)?c[h]={alto:!!s.entradaFlotante&&!!m[h],alAire:!0}:h in P&&(c[h]={alto:P[h],alAire:!1});return c}function Ne(c=w){c&&Te.forEach((h,R)=>{for(let x of h){let b=c.voltajes["placa."+x];if(typeof b=="number")return l.ponerAnalogico(R,b)}})}function Hs(){It.clear(),Zt.clear(),Jt.length=0,ut=[],X=[],be=new TextDecoder("utf-8"),xt=0,$e(),Lt(),yt(),ot()}function $e(){Tt=0,$=!1,Y=null,Pt=[],wt.reiniciar(),Ct=N.idealV}return Lt(),yt(),ot(),{get ciclos(){return Tt+l.ciclos},avanzar(c){if($)return _s(c);l.correr(c),Y&&Bs()},foto:Fs,ponerCircuito(c){A=c,yt(),ot()},ponerMano(c){a=Array.isArray(c)?c.filter(h=>typeof h=="string"):[],ve()},ponerPulsador(c,h){h?n.add(c):n.delete(c),yt(),ot()},enviarSerial:c=>l.enviarSerial(String(c)),reiniciarChip(){$e(),Lt(),ot()},reiniciarTodo(){Qt=0,Hs()},fallas:()=>[...Jt]}}function Li(t,e,s=new Set){let i={},o=new Set;for(let[r,f]of t)for(let p=0;p<r.length;p++){let d=+r[p]===B.High;i[p]=(i[p]||0)+(d?f:0),o.add(p)}let n=Xt,a={};for(let r of o){let f=i[r]/e;(f>0&&f<1||s.has(n[r]))&&(a[n[r]]=Math.round(f*1e3)/1e3)}return a}var Xt=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"];function ji(t){if(t.length===1)return t[0][0];let e=t[0][0],s=a=>a.reduce((r,[,f])=>r+f,0),i=a=>{let r=0;for(let[f,p]of t){let d=a(f);if(d==null)return null;r+=p*d}return r},o=(a,r,f)=>[...new Set(t.flatMap(([d])=>d[a].map(m=>m[r])))].map(d=>{let m={[r]:d},u=t.filter(([l])=>l[a].some(A=>A[r]===d)),P=s(u);for(let l of f)l==="i"?m.i=t.reduce((A,[I,E])=>A+E*((I[a].find(v=>v[r]===d)||{i:0}).i||0),0):m[l]=P?u.reduce((A,[I,E])=>A+E*(I[a].find(v=>v[r]===d)[l]||0),0)/P:null;return m}),n={};for(let a of Object.keys(e.voltajes))n[a]=i(r=>r.voltajes[a]);return{convergio:t.every(([a])=>a.convergio),iteraciones:Math.max(...t.map(([a])=>a.iteraciones||0)),voltajes:n,leds:e.leds.map((a,r)=>{let f=i(p=>p.leds[r]?p.leds[r].i:0);return{id:a.id,quemado:t.some(([p])=>p.leds[r]&&p.leds[r].quemado),v:i(p=>p.leds[r]?p.leds[r].v:null),i:f,brillo:Math.max(0,Math.min(1,f*1e3/W.plenomA))}}),resistencias:e.resistencias.map((a,r)=>({id:a.id,ohmios:a.ohmios,v:i(f=>f.resistencias[r].v),i:i(f=>f.resistencias[r].i),w:i(f=>f.resistencias[r].w)})),pines:o("pines","pin",["v","i"]),fuentes:o("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((a,r)=>({id:a.id,ohmios:a.ohmios,posicion:a.posicion,v:i(f=>f.potenciometros[r].v),i:i(f=>f.potenciometros[r].i)}))}}function we(t,e,s){if(typeof t=="number")return typeof e=="number"&&s<1?e+s*(t-e):t;if(Array.isArray(t)){let i=n=>n&&typeof n=="object"?n.id||n.pin:void 0,o=new Map((Array.isArray(e)?e:[]).map(n=>[i(n),n]));return t.map((n,a)=>we(n,i(n)!==void 0?o.get(i(n)):(e||[])[a],s))}if(t&&typeof t=="object"){let i={};for(let o of Object.keys(t))i[o]=we(t[o],e&&typeof e=="object"?e[o]:void 0,s);return i}return t}function Ki(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Gi=16,qi=8,zi=50,Xi=500,Ft=G/1e3,j=null,Wt=!1,ys=0,et=0,Pe=0,Es=0,Ee=0,ye=!1,At=[],bs=new MessageChannel;bs.port1.onmessage=Ms;function Ms(){ye=!1,Ji()}function Us(t){ye||(ye=!0,t>0?setTimeout(Ms,t):bs.port2.postMessage(null))}function Zi(t){for(;At.length&&t-At[0][0]>Xi;)At.shift();let e=0,s=0;for(let[,i,o]of At)e+=i,s+=o;return e>0?Math.min(1,s/(e*Ft)):1}function Nt(t=performance.now()){Es=t;let e=j.foto();self.postMessage({tipo:"foto",corrida:ys,...e,velocidad:Zi(t),msReales:Ee})}function Ji(){if(!Wt||!j)return;let t=performance.now(),e=Math.max(0,t-Pe);Pe=t,Ee+=e,et=Math.min(et+e*Ft,zi*Ft);let s=performance.now(),i=0;for(;et>=1&&performance.now()-s<qi;){let o=j.ciclos;j.avanzar(Math.min(Math.floor(et),Ft));let n=j.ciclos-o;et-=n,i+=n}At.push([t,e,i]),t-Es>=Gi&&Nt(t),Us(et>=Ft?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(ys=e.corrida),e.tipo){case"crear":j=Ps({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(j.reiniciarTodo(),Ee=0),Wt=!0,et=0,Pe=performance.now(),At.length=0,Nt(),Us(0);break;case"pausar":Wt=!1;break;case"reiniciar":j.reiniciarChip(),et=0,Nt();break;case"detener":Wt=!1;break;case"circuito":j.ponerCircuito(e.circuito),e.mostrar&&Nt();break;case"serial":j.enviarSerial(e.texto);break;case"pulsador":j.ponerPulsador(e.id,e.presionado),Wt||Nt();break;case"mano":j.ponerMano(e.refs);break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function Hr(o={}){let{lienzo:t,hex:r}=o,n=o.placa||"uno";if(n!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof r!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");Br(r);let i=o.modo==="ideal"?"ideal":"realista",l=Object.fromEntries(Kn.map(_=>[_,i==="realista"]));Object.assign(l,o.noIdealidades||{});let a=typeof o.alEvento=="function"?o.alEvento:null,u={serial:[],falla:[],estado:[]},p="detenido",m=!0,v=0,x=null,$=0,M={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},b=null,y=0,T=[],O=Jn(G);O.enviar({tipo:"crear",hex:r,circuito:t.circuito(),activas:l});function G(_){if(!m)return;if(_.tipo==="error")return console.error("TecnoCircuito:",_.mensaje);if(_.tipo!=="foto"||_.corrida!==v||p==="detenido")return;Object.assign(M,{msSimulados:_.msSimulados,msReales:_.msReales,velocidad:_.velocidad,evaluaciones:_.evaluaciones}),b=_.medicion?{..._.medicion,voltajes:_.voltajes,entradas:_.entradas}:null;for(let P of _.fallas){T.push(P),u.falla.forEach(S=>ut(S,{tipo:P.tipo,componente:P.componente,mensaje:P.mensaje}));let{mensaje:j,...$t}=P;ft("falla",$t)}let L=_.energia?_.energia.reinicios:0;L>y&&ft("reinicio_placa",{motivo:"energia_usb",nuevos:L-y,total:L}),y=L,_.serial&&u.serial.forEach(P=>ut(P,_.serial)),x=_,$||($=requestAnimationFrame(Q))}function Q(){if($=0,p==="detenido"||!x)return t._mostrar({simulando:p!=="detenido"});t._mostrar({simulando:!0,leds:x.leds,quemados:x.quemados,voltajes:x.voltajes,servos:x.servos||{},placa:{ledPower:x.placa.encendida!==!1,led13:x.placa.led13,ledTX:x.placa.ledTX}})}function ut(_,L){try{_(L)}catch(P){console.error(P)}}function ft(_,L){a&&ut(a,{t:Date.now(),origen:"simulador",tipo:_,datos:L})}function it(_){p=_,u.estado.forEach(L=>ut(L,_))}return typeof t._alAcercar=="function"&&t._alAcercar(_=>{m&&O.enviar({tipo:"mano",refs:_})}),typeof t._alPulsar=="function"&&t._alPulsar((_,L)=>{m&&O.enviar({tipo:"pulsador",id:_,presionado:L})}),t.alCambiar(_=>{m&&O.enviar({tipo:"circuito",circuito:_,mostrar:p!=="detenido",corrida:v})}),{iniciar(){if(!m||p==="corriendo")return;let _=p==="detenido";v++,_&&(T.length=0,b=null,x=null,y=0,Object.assign(M,{msSimulados:0,msReales:0,velocidad:1}),ft("simulacion_iniciada",{placa:n,modo:i})),it("corriendo"),O.enviar({tipo:"iniciar",nuevo:_,corrida:v})},pausar(){p==="corriendo"&&(v++,O.enviar({tipo:"pausar",corrida:v}),it("pausado"))},reiniciar(){!m||p==="detenido"||(v++,M.msSimulados=0,O.enviar({tipo:"reiniciar",corrida:v}),O.enviar({tipo:"iniciar",nuevo:!1,corrida:v}),y=0,ft("reinicio_placa",{motivo:"boton"}),it("reiniciado"),it("corriendo"))},detener(){p!=="detenido"&&(v++,O.enviar({tipo:"detener",corrida:v}),ft("simulacion_detenida",{ms_simulados:Math.round(M.msSimulados)}),it("detenido"),b=null,Q())},serialEnviar(_){p!=="detenido"&&O.enviar({tipo:"serial",texto:String(_)})},alSerial:_=>typeof _=="function"&&u.serial.push(_),alFalla:_=>typeof _=="function"&&u.falla.push(_),alEstado:_=>typeof _=="function"&&u.estado.push(_),medidas:()=>({...M,estado:p,hilo:O.hilo()}),destruir(){m&&(this.detener(),m=!1,cancelAnimationFrame($),O.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},mediciones:()=>p==="detenido"||!b?null:{...b,fallas:[...T],modo:i,activas:l},_mediciones(){return this.mediciones()}}}function Jn(o){let t=null,r="worker",n=!1,i=[],l=u=>{if(u&&u.tipo==="listo"){n=!0,i.length=0;return}o(u)};function a(){r="pagina",t=Zn(l),i.splice(0).forEach(u=>t.postMessage(u))}try{if(!Ao||typeof Worker!="function")throw new Error("sin Worker");let u=URL.createObjectURL(new Blob([Ao],{type:"text/javascript"})),p=new Worker(u);p.onmessage=m=>{m.data&&m.data.tipo==="listo"&&URL.revokeObjectURL(u),l(m.data)},p.onerror=m=>{if(n)return console.error("TecnoCircuito:",m.message);m.preventDefault(),p.terminate(),a()},t=p}catch{a()}return{enviar(u){!n&&r==="worker"&&i.push(u),t.postMessage(u)},terminar:()=>t&&t.terminate(),hilo:()=>r}}function Zn(o){let t={onmessage:null,postMessage:r=>setTimeout(()=>o(r))};return new Function("self",Ao)(t),{postMessage:r=>setTimeout(()=>t.onmessage&&t.onmessage({data:r})),terminate:()=>t.onmessage=null}}var je=(o,t)=>o.toFixed(t).replace(".",","),Gt=o=>o==null?"al aire":je(o,2)+" V",vt=o=>je(o*1e3,Math.abs(o)<.01?2:1)+" mA",Fr=(o,t)=>(o>=1e3?je(o/1e3,t)+" k":o+" ")+"\u03A9",Xr=o=>"Pin "+o.replace(/^D/,"");function Wr(o){if(!o||!o.leds)return[];let t=(p,m,v,x)=>({pieza:p,voltaje:m||"",corriente:v||"",detalle:x||""}),r=p=>{let m=o.entradas&&o.entradas[p];return m?m.alAire?`al aire: lee ${m.alto?"ALTO":"BAJO"}; ac\xE9rcale el mouse`:m.alto?"lee ALTO":"lee BAJO":""},n=new Set(o.pines.map(p=>p.pin)),i=o.servos||[],l=p=>i.find(m=>m.senal===p&&m.pulso),a=p=>{let m=l(p.pin);if(m)return`se\xF1al de servo: pulso de ${m.pulso} \xB5s`;let v=o.pwm&&o.pwm[p.pin];return v>.005&&v<.995?`PWM ${Math.round(v*100)} %`:r(p.pin)},u=o.usb;return[...o.pines.map(p=>t(Xr(p.pin),Gt(p.v),vt(p.i),a(p))),...Object.keys(o.entradas||{}).filter(p=>!n.has(p)&&"placa."+p in o.voltajes).map(p=>t(Xr(p)+" (entrada)",Gt(o.voltajes["placa."+p]),"",r(p))),...(o.potenciometros||[]).map(p=>t(`${p.id} (${Fr(p.ohmios,0)})`,Gt(p.v),vt(p.i),`perilla ${Math.round(p.posicion*100)} %`)),...o.resistencias.map(p=>t(`${p.id} (${Fr(p.ohmios,1)})`,Gt(p.v),vt(p.i),je(p.w*1e3,1)+" mW")),...o.leds.map(p=>t(p.id,Gt(p.v),vt(p.i),p.quemado?"quemado":`brillo ${Math.round(p.brillo*100)} %`)),...i.map(p=>t(`${p.id} (${p.modelo.toUpperCase()})`,"",vt(p.i),p.fuente?p.senal?`${Math.round(p.angulo)}\xB0${p.moviendo?", movi\xE9ndose":""}${p.pulso?` \xB7 pulso ${p.pulso} \xB5s`:""}`:"sin se\xF1al":"sin alimentaci\xF3n")),...i.length?[t("5V de la placa (USB)","",vt(o.consumo5V),"el USB da hasta 500 mA")]:[],...u&&(i.length||u.reinicios||u.pico>.2)?[t("USB (placa y circuito)",Gt(u.voltios),vt(u.amperios),`pico ${vt(u.pico)} \xB7 fusible ${Math.round(u.fusible*100)} %${u.reinicios?` \xB7 ${u.reinicios} reinicios`:""}`)]:[]]}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(qt)),crearLienzo:Gr,crearSimulador:Hr,filasDeMediciones:Wr});})();
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
