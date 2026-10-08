(()=>{var de=globalThis,ue=de.ShadowRoot&&(de.ShadyCSS===void 0||de.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Te=Symbol(),ko=new WeakMap,zt=class{constructor(t,o,n){if(this._$cssResult$=!0,n!==Te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(ue&&t===void 0){let n=o!==void 0&&o.length===1;n&&(t=ko.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&ko.set(o,t))}return t}toString(){return this.cssText}},Ro=r=>new zt(typeof r=="string"?r:r+"",void 0,Te),J=(r,...t)=>{let o=r.length===1?r[0]:t.reduce((n,i,l)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[l+1],r[0]);return new zt(o,r,Te)},Do=(r,t)=>{if(ue)r.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let n=document.createElement("style"),i=de.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=o.cssText,r.appendChild(n)}},Le=ue?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let o="";for(let n of t.cssRules)o+=n.cssText;return Ro(o)})(r):r;var{is:Gr,defineProperty:Ur,getOwnPropertyDescriptor:Br,getOwnPropertyNames:Hr,getOwnPropertySymbols:Fr,getPrototypeOf:Xr}=Object,fe=globalThis,Oo=fe.trustedTypes,Wr=Oo?Oo.emptyScript:"",Yr=fe.reactiveElementPolyfillSupport,It=(r,t)=>r,qt={toAttribute(r,t){switch(t){case Boolean:r=r?Wr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let o=r;switch(t){case Boolean:o=r!==null;break;case Number:o=r===null?null:Number(r);break;case Object:case Array:try{o=JSON.parse(r)}catch{o=null}}return o}},he=(r,t)=>!Gr(r,t),jo={attribute:!0,type:String,converter:qt,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),fe.litPropertyMetadata??=new WeakMap;var rt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=jo){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,o);i!==void 0&&Ur(this.prototype,t,i)}}static getPropertyDescriptor(t,o,n){let{get:i,set:l}=Br(this.prototype,t)??{get(){return this[o]},set(a){this[o]=a}};return{get:i,set(a){let u=i?.call(this);l?.call(this,a),this.requestUpdate(t,u,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??jo}static _$Ei(){if(this.hasOwnProperty(It("elementProperties")))return;let t=Xr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(It("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(It("properties"))){let o=this.properties,n=[...Hr(o),...Fr(o)];for(let i of n)this.createProperty(i,o[i])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[n,i]of o)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[o,n]of this.elementProperties){let i=this._$Eu(o,n);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)o.unshift(Le(i))}else t!==void 0&&o.push(Le(t));return o}static _$Eu(t,o){let n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let n of o.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Do(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,n){this._$AK(t,n)}_$ET(t,o){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let l=(n.converter?.toAttribute!==void 0?n.converter:qt).toAttribute(o,n.type);this._$Em=t,l==null?this.removeAttribute(i):this.setAttribute(i,l),this._$Em=null}}_$AK(t,o){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let l=n.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:qt;this._$Em=i;let u=a.fromAttribute(o,l.type);this[i]=u??this._$Ej?.get(i)??u,this._$Em=null}}requestUpdate(t,o,n,i=!1,l){if(t!==void 0){let a=this.constructor;if(i===!1&&(l=this[t]),n??=a.getPropertyOptions(t),!((n.hasChanged??he)(l,o)||n.useDefault&&n.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,n))))return;this.C(t,o,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:n,reflect:i,wrapped:l},a){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??o??this[t]),l!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(o=void 0),this._$AL.set(t,o)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,l]of this._$Ep)this[i]=l;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,l]of n){let{wrapped:a}=l,u=this[i];a!==!0||this._$AL.has(i)||u===void 0||this.C(i,void 0,l,u)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(o)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};rt.elementStyles=[],rt.shadowRootOptions={mode:"open"},rt[It("elementProperties")]=new Map,rt[It("finalized")]=new Map,Yr?.({ReactiveElement:rt}),(fe.reactiveElementVersions??=[]).push("2.1.2");var Be=globalThis,No=r=>r,me=Be.trustedTypes,To=me?me.createPolicy("lit-html",{createHTML:r=>r}):void 0,Go="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,Uo="?"+dt,Kr=`<${Uo}>`,vt=document,Gt=()=>vt.createComment(""),Ut=r=>r===null||typeof r!="object"&&typeof r!="function",He=Array.isArray,Jr=r=>He(r)||typeof r?.[Symbol.iterator]=="function",ze=`[ 	
\f\r]`,Vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lo=/-->/g,zo=/>/g,xt=RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Io=/'/g,qo=/"/g,Bo=/^(?:script|style|textarea|title)$/i,Fe=r=>(t,...o)=>({_$litType$:r,strings:t,values:o}),F=Fe(1),st=Fe(2),jn=Fe(3),nt=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),Vo=new WeakMap,bt=vt.createTreeWalker(vt,129);function Ho(r,t){if(!He(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return To!==void 0?To.createHTML(t):t}var Zr=(r,t)=>{let o=r.length-1,n=[],i,l=t===2?"<svg>":t===3?"<math>":"",a=Vt;for(let u=0;u<o;u++){let d=r[u],m,w,b=-1,$=0;for(;$<d.length&&(a.lastIndex=$,w=a.exec(d),w!==null);)$=a.lastIndex,a===Vt?w[1]==="!--"?a=Lo:w[1]!==void 0?a=zo:w[2]!==void 0?(Bo.test(w[2])&&(i=RegExp("</"+w[2],"g")),a=xt):w[3]!==void 0&&(a=xt):a===xt?w[0]===">"?(a=i??Vt,b=-1):w[1]===void 0?b=-2:(b=a.lastIndex-w[2].length,m=w[1],a=w[3]===void 0?xt:w[3]==='"'?qo:Io):a===qo||a===Io?a=xt:a===Lo||a===zo?a=Vt:(a=xt,i=void 0);let P=a===xt&&r[u+1].startsWith("/>")?" ":"";l+=a===Vt?d+Kr:b>=0?(n.push(m),d.slice(0,b)+Go+d.slice(b)+dt+P):d+dt+(b===-2?u:P)}return[Ho(r,l+(r[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Bt=class r{constructor({strings:t,_$litType$:o},n){let i;this.parts=[];let l=0,a=0,u=t.length-1,d=this.parts,[m,w]=Zr(t,o);if(this.el=r.createElement(m,n),bt.currentNode=this.el.content,o===2||o===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(i=bt.nextNode())!==null&&d.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(let b of i.getAttributeNames())if(b.endsWith(Go)){let $=w[a++],P=i.getAttribute(b).split(dt),y=/([.?@])?(.*)/.exec($);d.push({type:1,index:l,name:y[2],strings:P,ctor:y[1]==="."?qe:y[1]==="?"?Ve:y[1]==="@"?Ge:Pt}),i.removeAttribute(b)}else b.startsWith(dt)&&(d.push({type:6,index:l}),i.removeAttribute(b));if(Bo.test(i.tagName)){let b=i.textContent.split(dt),$=b.length-1;if($>0){i.textContent=me?me.emptyScript:"";for(let P=0;P<$;P++)i.append(b[P],Gt()),bt.nextNode(),d.push({type:2,index:++l});i.append(b[$],Gt())}}}else if(i.nodeType===8)if(i.data===Uo)d.push({type:2,index:l});else{let b=-1;for(;(b=i.data.indexOf(dt,b+1))!==-1;)d.push({type:7,index:l}),b+=dt.length-1}l++}}static createElement(t,o){let n=vt.createElement("template");return n.innerHTML=t,n}};function Ct(r,t,o=r,n){if(t===nt)return t;let i=n!==void 0?o._$Co?.[n]:o._$Cl,l=Ut(t)?void 0:t._$litDirective$;return i?.constructor!==l&&(i?._$AO?.(!1),l===void 0?i=void 0:(i=new l(r),i._$AT(r,o,n)),n!==void 0?(o._$Co??=[])[n]=i:o._$Cl=i),i!==void 0&&(t=Ct(r,i._$AS(r,t.values),i,n)),t}var Ie=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:n}=this._$AD,i=(t?.creationScope??vt).importNode(o,!0);bt.currentNode=i;let l=bt.nextNode(),a=0,u=0,d=n[0];for(;d!==void 0;){if(a===d.index){let m;d.type===2?m=new Ht(l,l.nextSibling,this,t):d.type===1?m=new d.ctor(l,d.name,d.strings,this,t):d.type===6&&(m=new Ue(l,this,t)),this._$AV.push(m),d=n[++u]}a!==d?.index&&(l=bt.nextNode(),a++)}return bt.currentNode=vt,i}p(t){let o=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,o),o+=n.strings.length-2):n._$AI(t[o])),o++}},Ht=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,n,i){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=Ct(this,t,o),Ut(t)?t===T||t==null||t===""?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==nt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==T&&Ut(this._$AH)?this._$AA.nextSibling.data=t:this.T(vt.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Bt.createElement(Ho(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(o);else{let l=new Ie(i,this),a=l.u(this.options);l.p(o),this.T(a),this._$AH=l}}_$AC(t){let o=Vo.get(t.strings);return o===void 0&&Vo.set(t.strings,o=new Bt(t)),o}k(t){He(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,n,i=0;for(let l of t)i===o.length?o.push(n=new r(this.O(Gt()),this.O(Gt()),this,this.options)):n=o[i],n._$AI(l),i++;i<o.length&&(this._$AR(n&&n._$AB.nextSibling,i),o.length=i)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let n=No(t).nextSibling;No(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Pt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,n,i,l){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=o,this._$AM=i,this.options=l,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}_$AI(t,o=this,n,i){let l=this.strings,a=!1;if(l===void 0)t=Ct(this,t,o,0),a=!Ut(t)||t!==this._$AH&&t!==nt,a&&(this._$AH=t);else{let u=t,d,m;for(t=l[0],d=0;d<l.length-1;d++)m=Ct(this,u[n+d],o,d),m===nt&&(m=this._$AH[d]),a||=!Ut(m)||m!==this._$AH[d],m===T?t=T:t!==T&&(t+=(m??"")+l[d+1]),this._$AH[d]=m}a&&!i&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qe=class extends Pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}},Ve=class extends Pt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}},Ge=class extends Pt{constructor(t,o,n,i,l){super(t,o,n,i,l),this.type=5}_$AI(t,o=this){if((t=Ct(this,t,o,0)??T)===nt)return;let n=this._$AH,i=t===T&&n!==T||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,l=t!==T&&(n===T||i);i&&this.element.removeEventListener(this.name,this,n),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ue=class{constructor(t,o,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ct(this,t)}};var Qr=Be.litHtmlPolyfillSupport;Qr?.(Bt,Ht),(Be.litHtmlVersions??=[]).push("3.3.3");var Fo=(r,t,o)=>{let n=o?.renderBefore??t,i=n._$litPart$;if(i===void 0){let l=o?.renderBefore??null;n._$litPart$=i=new Ht(t.insertBefore(Gt(),l),l,void 0,o??{})}return i._$AI(r),i};var Xe=globalThis,z=class extends rt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Fo(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return nt}};z._$litElement$=!0,z.finalized=!0,Xe.litElementHydrateSupport?.({LitElement:z});var tn=Xe.litElementPolyfillSupport;tn?.({LitElement:z});(Xe.litElementVersions??=[]).push("4.2.2");var ot=r=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var en={attribute:!0,type:String,converter:qt,reflect:!1,hasChanged:he},on=(r=en,t,o)=>{let{kind:n,metadata:i}=o,l=globalThis.litPropertyMetadata.get(i);if(l===void 0&&globalThis.litPropertyMetadata.set(i,l=new Map),n==="setter"&&((r=Object.create(r)).wrapped=!0),l.set(o.name,r),n==="accessor"){let{name:a}=o;return{set(u){let d=t.get.call(this);t.set.call(this,u),this.requestUpdate(a,d,r,!0,u)},init(u){return u!==void 0&&this.C(a,void 0,r,u),u}}}if(n==="setter"){let{name:a}=o;return function(u){let d=this[a];t.call(this,u),this.requestUpdate(a,d,r,!0,u)}}throw Error("Unsupported decorator location: "+n)};function O(r){return(t,o)=>typeof o=="object"?on(r,t,o):((n,i,l)=>{let a=i.hasOwnProperty(l);return i.constructor.createProperty(l,n),a?Object.getOwnPropertyDescriptor(i,l):void 0})(r,t,o)}var wt=(r,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,o),o);function Xo(r,t){return(o,n,i)=>{let l=a=>a.renderRoot?.querySelector(r)??null;if(t){let{get:a,set:u}=typeof n=="object"?o:i??(()=>{let d=Symbol();return{get(){return this[d]},set(m){this[d]=m}}})();return wt(o,n,{get(){let d=a.call(this);return d===void 0&&(d=l(this),(d!==null||this.hasUpdated)&&u.call(this,d)),d}})}return wt(o,n,{get(){return l(this)}})}}var Wo=st`
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
`;var Z=r=>({type:"analog",channel:r}),Ft=(r,t=0)=>({type:"i2c",signal:r,bus:t}),Xt=(r,t=0)=>({type:"spi",signal:r,bus:t}),We=(r,t=0)=>({type:"usart",signal:r,bus:t});var Mt=[" ","Spacebar"];function rn(){return typeof navigator=="object"?navigator.userAgent:""}function nn(){return rn().indexOf("Macintosh")>=0}function Yo(r){return nn()?r.metaKey:r.ctrlKey}var $t=function(r,t,o,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(l=(i<3?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},ut=class extends z{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[Z(5),Ft("SCL")]},{name:"A4.2",x:97,y:9,signals:[Z(4),Ft("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[Xt("SCK")]},{name:"12",x:134.5,y:9,signals:[Xt("MISO")]},{name:"11",x:144,y:9,signals:[Xt("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[Xt("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[We("TX")]},{name:"0",x:255.5,y:9,signals:[We("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[Z(0)]},{name:"A1",x:217.5,y:191.5,signals:[Z(1)]},{name:"A2",x:227,y:191.5,signals:[Z(2)]},{name:"A3",x:236.5,y:191.5,signals:[Z(3)]},{name:"A4",x:246,y:191.5,signals:[Z(4),Ft("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[Z(5),Ft("SCL")]}]}static get styles(){return J`
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
    `}render(){let{ledPower:t,led13:o,ledRX:n,ledTX:i}=this;return F`
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

        ${Wo}

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
          @keydown=${l=>Mt.includes(l.key)&&this.down()}
          @keyup=${l=>Mt.includes(l.key)&&this.up()}
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
          ${t&&st`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${o&&st`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${i&&st`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${n&&st`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};$t([O()],ut.prototype,"led13",void 0);$t([O()],ut.prototype,"ledRX",void 0);$t([O()],ut.prototype,"ledTX",void 0);$t([O()],ut.prototype,"ledPower",void 0);$t([O()],ut.prototype,"resetPressed",void 0);$t([Xo("#reset-button")],ut.prototype,"resetButton",void 0);ut=$t([ot("wokwi-arduino-uno")],ut);var Ko=function(r,t,o,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(l=(i<3?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},Ye={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},Ke=class extends z{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return J`
      :host {
        display: flex;
      }
    `}breakValue(t){let o=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,n=Math.round(t/10**o);return t===0?[0,0]:[Math.round(n%100),o]}render(){let{value:t}=this,o=parseFloat(t),[n,i]=this.breakValue(o),l=Ye[Math.floor(n/10)],a=Ye[n%10],u=Ye[i];return F`
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
    `}};Ko([O()],Ke.prototype,"value",void 0);Ke=Ko([ot("wokwi-resistor")],Ke);var At=function(r,t,o,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(l=(i<3?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},sn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},ft=class extends z{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return J`
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
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:o,flip:n}=this,i=o||sn[t?.toLowerCase()]||t,l=this.brightness?.3+this.brightness*.7:0,a=this.value&&this.brightness>Number.EPSILON;return F`<svg
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
    </svg> `}render(){return F`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};At([O()],ft.prototype,"value",void 0);At([O()],ft.prototype,"brightness",void 0);At([O()],ft.prototype,"color",void 0);At([O()],ft.prototype,"lightColor",void 0);At([O()],ft.prototype,"label",void 0);At([O({type:Boolean})],ft.prototype,"flip",void 0);ft=At([ot("wokwi-led")],ft);var Jo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zo=r=>(...t)=>({_$litDirective$:r,values:t}),ge=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,n){this._$Ct=t,this._$AM=o,this._$Ci=n}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var Qo="important",an=" !"+Qo,tr=Zo(class extends ge{constructor(r){if(super(r),r.type!==Jo.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,o)=>{let n=r[o];return n==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(r,[t]){let{style:o}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?o.removeProperty(n):o[n]=null);for(let n in t){let i=t[n];if(i!=null){this.ft.add(n);let l=typeof i=="string"&&i.endsWith(an);n.includes("-")||l?o.setProperty(n,l?i.slice(0,-11):i,l?Qo:""):o[n]=i}}return nt}});var ye=(r,t,o)=>{let n=Math.min(o,t);return Math.max(n,r)};function er(r,t){let o=t.transformPoint({x:r.left,y:r.top}),n=t.transformPoint({x:r.right,y:r.top}),i=t.transformPoint({x:r.left,y:r.bottom}),l=t.transformPoint({x:r.right,y:r.bottom}),a=Math.min(o.x,n.x,i.x,l.x),u=Math.min(o.y,n.y,i.y,l.y),d=Math.max(o.x,n.x,i.x,l.x),m=Math.max(o.y,n.y,i.y,l.y);return new DOMRect(a,u,d-a,m-u)}function or(r,t,o){let{userAgent:n}=navigator;if(n.indexOf("Epiphany")>=0||n.indexOf("Safari")>=0){let l=r.getCTM(),a=t?.getCTM(),u=t?.getBoundingClientRect(),d=t?.ownerSVGElement?.getBoundingClientRect();if(!u||!d||!a||!l)return null;let m=d.x+d.width/2,w=d.y+d.height/2,b=m-(u.x+u.width/2),$=w-(u.y+u.height/2),P=Math.atan2($,b)/Math.PI*180,y=new DOMMatrix().rotate(P),x=er(o,y),M=x.width/u.width,j=x.height/u.height,I=a.inverse().multiply(l);return y.inverse().translate(x.left,x.top).multiply(I.inverse()).scale(M,j).translate(-u.left,-u.top)}else return r.getScreenCTM()?.inverse()||null}var _t=function(r,t,o,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(l=(i<3?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},xe={x:9.91,y:8.18},ht=class extends z{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[Z(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return J`
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
    `}mapToMinMax(t,o,n){return t*(n-o)+o}percentFromMinMax(t,o,n){return(t-o)/(n-o)}renderSVG(){let t=ye(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*t+this.startDegree;return F`<svg
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
      style=${tr({"--knob-angle":o+"deg"})}
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
        cx=${xe.x}
        cy=${xe.y}
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
    </svg>`}render(){return F`
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let o=t.target;this.updateValue(parseFloat(o.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:o}=this;o&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&o?or(t,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let o=t.type==="touchmove",n=o?t.touches[0].pageX:t.pageX,i=o?t.touches[0].pageY:t.pageY,l=new DOMPointReadOnly(n,i).matrixTransform(this.pageToKnobMatrix),a=xe.x-l.x,u=xe.y-l.y,d=Math.round(Math.atan2(u,a)*180/Math.PI);d<0&&(d+=360),d-=90,a>0&&u<=0&&d>0&&(d-=360),d=ye(this.startDegree,this.endDegree,d);let m=this.percentFromMinMax(d,this.startDegree,this.endDegree),w=this.mapToMinMax(m,this.min,this.max);this.updateValue(w)}updateValue(t){let o=ye(this.min,this.max,t),n=Math.round(o/this.step)*this.step;this.value=Math.round(n*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};_t([O({type:Number})],ht.prototype,"min",void 0);_t([O({type:Number})],ht.prototype,"max",void 0);_t([O()],ht.prototype,"value",void 0);_t([O()],ht.prototype,"step",void 0);_t([O()],ht.prototype,"startDegree",void 0);_t([O()],ht.prototype,"endDegree",void 0);ht=_t([ot("wokwi-potentiometer")],ht);var Wt=function(r,t,o,n){var i=arguments.length,l=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(l=(i<3?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},Je,kt=class extends z{static{Je=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+Je.pushbuttonCounter++}static get styles(){return J`
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
    `}renderSVG(){let{color:t,uniqueId:o,xray:n}=this,i=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return F`<svg
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
      ${n?st`
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
          fill="${t}"
          stroke="#2f2f2f"
          stroke-opacity=".47"
          stroke-width=".08"
        />
      </g>
    </svg>`}render(){let{color:t,label:o}=this;return F`
      <button
        aria-label="${o} ${t} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${n=>Mt.includes(n.key)&&this.down()}
        @keyup=${n=>Mt.includes(n.key)&&this.up(n)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(t){this.pressed&&(Yo(t)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(t){this.sticky||this.up(t)}};Wt([O()],kt.prototype,"color",void 0);Wt([O()],kt.prototype,"pressed",void 0);Wt([O()],kt.prototype,"label",void 0);Wt([O({type:Boolean,attribute:"xray"})],kt.prototype,"xray",void 0);kt=Je=Wt([ot("wokwi-pushbutton")],kt);var rr=`:host {
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
`;var Rt={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},Ze=Object.keys(Rt),nr={marron:"marr\xF3n",morado:"violeta"};function Qe(r,t){let o=[r,t];return o.some(n=>/^placa\.GND/.test(n)||/^protoboard\.[si]-/.test(n))?"negro":o.some(n=>/^placa\.(5V|3V3|VIN)$/.test(n)||/^protoboard\.[si]\+/.test(n))?"rojo":"verde"}var ln=["3","5","6","9","10","11"],Dt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(r){return/^\d+$/.test(r)?"D"+r:r.startsWith("GND.")?"GND"+r.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[r]||r},rotulo(r){return r==="D0"?"Pin 0 \xB7 RX del monitor serial":r==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(r)?"Pin "+r.slice(1)+(ln.includes(r.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(r)?r+" \xB7 entrada anal\xF3gica":r.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[r]||r}}},X={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:r=>({1:"1",2:"2"})[r],rotulo:r=>"pata "+r,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(r,t){r.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:r=>({A:"anodo",C:"catodo"})[r],rotulo:r=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[r]||r,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(r,t){r.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:r=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[r],rotulo:r=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[r]||r,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(r,t){r.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[t.color]||"red"}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:r=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[r],rotulo:r=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[r]||r,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(r,t){r.min=0,r.max=100,r.value=Math.round((Number(t.posicion)||0)*100)}}};var be=["a","b","c","d","e"],sr=["f","g","h","i","j"],q={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},ir=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],it={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Yt=r=>14.4+(r-1)*9.6,pn=r=>r>=2&&(r-1)%6!==0,to=new Map;function Kt(r="media"){if(to.has(r))return to.get(r);let t=it[r]||it.media,o=[];to.set(r,o);for(let n=1;n<=t.columnas;n++){for(let i of be)o.push({nombre:i+n,x:Yt(n),y:q[i],tira:"arriba"+n});for(let i of sr)o.push({nombre:i+n,x:Yt(n),y:q[i],tira:"abajo"+n});for(let[i]of ir)pn(n)&&o.push({nombre:i+n,x:Yt(n),y:q[i],tira:i})}return o}var eo=new Map;function ar(r="media"){if(eo.has(r))return eo.get(r);let t=new Map;eo.set(r,t);for(let o of Kt(r))t.has(o.tira)||t.set(o.tira,[]),t.get(o.tira).push(o.nombre);return t}function oo(r){let t=/^([si][+-])\d+$/.exec(r);if(t)return t[1];let o=/^([a-j])(\d+)$/.exec(r);return o?(be.includes(o[1])?"arriba":"abajo")+o[2]:null}function cr(r){let t=/^([si])([+-])(\d+)$/.exec(r);if(t){let l=t[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${t[2]==="+"?"+":"\u2212"} ${l} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(r);if(!o)return"Protoboard";let[n,i]=be.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${n}${o[2]}\u2013${i}${o[2]}`}function lr(r="media"){let t=it[r]||it.media,{ancho:o,alto:n,columnas:i}=t,l=[];l.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${n}" viewBox="0 0 ${o} ${n}">`),l.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${n-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),l.push(`<rect x="2" y="${(q.e+q.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let a=(d,m)=>l.push(`<line x1="${14.4-6}" y1="${d}" x2="${o-14.4+6}" y2="${d}" stroke="${m}" stroke-width="1.2"/>`);a(q["s+"]-5.5,"#d7263d"),a(q["s-"]+5.5,"#2f6fde"),a(q["i-"]-5.5,"#2f6fde"),a(q["i+"]+5.5,"#d7263d");let u=(d,m,w,b="#8a867a",$=5.5)=>l.push(`<text x="${d}" y="${m}" font-family="sans-serif" font-size="${$}" font-weight="700" fill="${b}" text-anchor="middle">${w}</text>`);for(let[d,,m]of ir){let w=m==="+"?"#d7263d":"#2f6fde";u(5.2,q[d]+2.2,m,w,7),u(o-5.2,q[d]+2.2,m,w,7)}for(let d=1;d<=i;d++)(d===1||d%5===0)&&(u(Yt(d),q.a-6.2,d),u(Yt(d),q.j+10.4,d));for(let d of[...be,...sr])u(5.2,q[d]+2,d),u(o-5.2,q[d]+2,d);for(let d of Kt(r))l.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return l.push("</svg>"),l.join("")}function pr(r,{tipo:t="media",ocupados:o=new Set,tolerancia:n=3.5}={}){if(!r.length)return null;let i=Kt(t),l=(b,$)=>{let P=null,y=1/0;for(let x of i){let M=Math.hypot(x.x-b,x.y-$);M<y&&(y=M,P=x)}return{hueco:P,distancia:y}},a=l(r[0].x,r[0].y);if(a.distancia>9.6)return null;let u=a.hueco.x-r[0].x,d=a.hueco.y-r[0].y,m={},w=new Set;for(let b of r){let{hueco:$,distancia:P}=l(b.x+u,b.y+d);if(P>n||o.has($.nombre)||w.has($.nombre))return null;m[b.nombre]=$.nombre,w.add($.nombre)}return{dx:u,dy:d,en:m}}var dn=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function dr(r,{presionados:t=new Set,conduccion:o=!1}={}){let n=new Map,i=a=>{for(n.has(a)||n.set(a,a);n.get(a)!==a;)n.set(a,n.get(n.get(a))),a=n.get(a);return a},l=(a,u)=>n.set(i(a),i(u));for(let a of dn)a.forEach(u=>l("placa."+a[0],"placa."+u));for(let a of r.cables)l(a.de,a.a);if(r.protoboard){for(let a of ar(r.protoboard.tipo).values())a.forEach(u=>l("protoboard."+a[0],"protoboard."+u));for(let a of r.componentes)if(a.en)for(let[u,d]of Object.entries(a.en))l(a.id+"."+u,d)}for(let a of r.componentes)a.tipo==="pulsador"?(l(a.id+".1i",a.id+".1d"),l(a.id+".2i",a.id+".2d"),t.has(a.id)&&l(a.id+".1i",a.id+".2i")):o&&a.tipo==="resistencia"?l(a.id+".1",a.id+".2"):o&&a.tipo==="potenciometro"&&(l(a.id+".GND",a.id+".SIG"),l(a.id+".SIG",a.id+".VCC"));return i}var fr=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],un=Object.fromEntries(fr.flatMap(r=>Object.entries(r.pines).map(([t,o])=>[t,{ref:r.ref,pad:o}]))),fn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},hn=["GND","+5V","+3V3","VIN"],ur=r=>r>=1e3?+(r/1e3).toFixed(2)+"k":String(r),ve={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:r=>ur(Number(r.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:r=>"LED "+(r.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:r=>ur(Number(r.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},V=r=>'"'+String(r).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function mn(r){let o=[2166136261,16777619,2654435769,2246822507].map(n=>{let i=n>>>0;for(let l=0;l<r.length;l++)i=Math.imul(i^r.charCodeAt(l),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function hr(r,{nombre:t="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:n="TecnoCircuito"}={}){let i=r.componentes.filter(y=>ve[y.tipo]).map(y=>({...y})),l={};for(let y of i){let x=ve[y.tipo];l[x.ref]=(l[x.ref]||0)+1,y.ref=x.ref+l[x.ref]}let a=dr(r),u=new Map,d=(y,x,M,j)=>{let I=a(y);u.has(I)||u.set(I,{pads:new Map,uno:new Set});let U=u.get(I);U.pads.set(x+" "+M,{ref:x,pad:M,pinUno:j}),j&&U.uno.add(fn[j]||j)},m=new Set(r.cables.flatMap(y=>[y.de,y.a]));for(let[y,{ref:x,pad:M}]of Object.entries(un))m.has("placa."+y)&&d("placa."+y,x,M,y);for(let y of i)for(let[x,M]of Object.entries(ve[y.tipo].pads))d(y.id+"."+x,y.ref,M,null);let w=(y,x)=>y.localeCompare(x,"en",{numeric:!0}),b=[...u.values()].filter(y=>y.pads.size>=2).map(y=>{let x=[...y.pads.values()].sort((j,I)=>w(j.ref,I.ref)||w(j.pad,I.pad));return{nombre:hn.find(j=>y.uno.has(j))||[...y.uno].sort(w)[0]||`Net-(${x[0].ref}-Pad${x[0].pad})`,pads:x}}).sort((y,x)=>w(y.nombre,x.nombre)),$=[],P=(y,x,M,j,I,U,mt)=>$.push("		(comp",`			(ref ${V(y)})`,`			(value ${V(x)})`,`			(footprint ${V(M)})`,`			(libsource (lib ${V(j)}) (part ${V(I)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${V(U)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${V(mt)})`,"		)");$.push("(export",'	(version "E")',"	(design",`		(source ${V(t)})`,`		(date ${V(o)})`,`		(tool ${V(n)})`,"	)"),$.push("	(components");for(let y of fr)P(y.ref,y.valor,y.huella,"Connector_Generic",y.parte,"placa",y.uuid);for(let y of i){let x=ve[y.tipo];P(y.ref,x.valor(y.props||{}),x.huella,x.lib,x.parte,y.id,mn(t+"/"+y.id))}return $.push("	)","	(nets"),b.forEach((y,x)=>{$.push("		(net",`			(code ${V(x+1)})`,`			(name ${V(y.nombre)})`,'			(class "Default")');for(let M of y.pads){let j=M.pinUno?` (pinfunction ${V(M.pinUno)})`:"";$.push(`			(node (ref ${V(M.ref)}) (pin ${V(M.pad)})${j} (pintype "passive"))`)}$.push("		)")}),$.push("	)",")"),$.join(`
`)+`
`}var mr="http://www.w3.org/2000/svg",gn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",yn=280,gr=5e3,xn=4,yr=8,bn=9.6,xr=.4,vn=5,at=r=>JSON.parse(JSON.stringify(r)),L=r=>Math.round(r*100)/100,Jt=(r,t)=>Math.hypot(r.x-t.x,r.y-t.y),ro=r=>Rt[r]||(/^#[0-9a-f]{3,8}$/i.test(r||"")?r:Rt.verde);function $r(r,t={}){if(!(r instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=t.placa||"uno";if(!Dt[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let n=!!t.soloLectura,i=typeof t.alEvento=="function"?t.alEvento:null,l=[],a=wn(t.circuito,o),u=document.createElement("div");u.className="tecnocircuito",r.appendChild(u);let d=u.attachShadow({mode:"open"});d.innerHTML=`<style>${rr}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${gr} ${gr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
    <button type="button" role="menuitem" data-accion="protoboard">Protoboard</button>
  </div>
</div>`;let m=e=>d.querySelector(e),w=m(".tc"),b=m(".tc-barra"),$=m(".tc-menu"),P=b.querySelector('[data-accion="menu"]'),y=m(".tc-sel"),x=m(".tc-area"),M=m(".tc-mundo"),j=m(".tc-capa-comp"),I=m(".tc-capa-pines"),U=m(".tc-cables"),mt=m(".tc-asas"),[ct,_]=m(".tc-previa").children,N=m(".tc-ayuda"),Q=m(".tc-tip"),k={px:0,py:0,escala:1.5},R=new Map,Ot=new Map,E=null,C=null,S=null,Zt=null,we=null,io=!1,$e=!1,jt=!1,Qt=null,Ae=!1,K={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{}},_e=new Set,ao=[],W=e=>a.componentes.find(s=>s.id===e),te=e=>e==="protoboard"?a.protoboard:W(e),ee=e=>e==="placa"?{x:0,y:0,rot:0}:te(e);function Ee(e,s,c){let p=e==="placa"?Dt[o]:X[s],f=document.createElement("div");f.className="tc-comp"+(e==="placa"?" tc-placa":""),f.dataset.id=e,s&&(f.dataset.tipo=s);let h;p?(h=document.createElement(p.etiqueta),p.aplicar&&p.aplicar(h,c),p.perilla&&h.addEventListener("input",()=>Eo(e,Number(h.value)/100))):(h=document.createElement("div"),h.className="tc-desconocido",h.textContent=`\xBF${s}?`,h.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito."),f.appendChild(h),j.appendChild(f);let g={id:e,def:p,div:f,el:h,w:64,h:40,pines:new Map,lista:!1};return R.set(e,g),Promise.resolve(h.updateComplete).then(()=>{if(R.get(e)===g){if(p){Object.assign(g,Mr(h));for(let v of h.pinInfo||[]){let A=p.nombrePin(v.name);if(!A)continue;let D=document.createElement("div");D.className="tc-pin",D.dataset.ref=`${e}.${A}`,I.appendChild(D),g.pines.set(A,{px:v.x,py:v.y,div:D})}}g.lista=!0,Et(g),ho(g)}})}function co(){let e=a.protoboard.tipo,s=it[e]||it.media,c=document.createElement("div");c.className="tc-comp tc-protoboard",c.dataset.id="protoboard",c.dataset.tipo="protoboard";let p=document.createElement("template");p.innerHTML=lr(e);let f=p.content.firstElementChild;c.appendChild(f);let h=R.get("placa");j.insertBefore(c,h?h.div.nextSibling:j.firstChild);let g={id:"protoboard",def:{protoboard:!0},div:c,el:f,w:s.ancho,h:s.alto,pines:new Map,lista:!0};for(let v of Kt(e)){let A=document.createElement("div");A.className="tc-pin tc-hueco",A.dataset.ref="protoboard."+v.nombre,A.style.left=v.x+"px",A.style.top=v.y+"px",c.appendChild(A),g.pines.set(v.nombre,{px:v.x,py:v.y,div:A})}return R.set("protoboard",g),Et(g),oe(),Promise.resolve()}function Sr(){if(a.protoboard)return;let e=Ne();a.protoboard={tipo:"media",x:Math.round(Math.max(300,e?e.x1+30:300)),y:30},co(),Se(),B("componente_agregado",{id:"protoboard",tipo:"protoboard"}),tt({tipo:"comp",id:"protoboard"}),jt||Lt(),H()}function Se(){let e=$.querySelector('[data-accion="protoboard"]');e.disabled=!!a.protoboard,e.title=a.protoboard?"Ya hay una protoboard":""}function Cr(e){let s=R.get(e.id),c=a.protoboard;return!s||!s.lista||!c||!s.pines.size?null:[...s.pines].map(([p,f])=>{let h=Pe(s,e,f);return{nombre:p,x:h.x-c.x,y:h.y-c.y}})}function lo(e){let s=new Set;for(let c of a.componentes)if(c!==e&&c.en)for(let p of Object.values(c.en))s.add(p.slice(11));return s}function po(e){let s=Cr(e);return s?pr(s,{tipo:a.protoboard.tipo,ocupados:lo(e)}):null}function Ce(e){let s=po(e);return s?(e.x=L(e.x+s.dx),e.y=L(e.y+s.dy),e.en=Object.fromEntries(Object.entries(s.en).map(([c,p])=>[c,"protoboard."+p]))):delete e.en,Et(R.get(e.id)),oe(),pt(),!!s}let Nt=[];function Pr(e){uo();let s=a.protoboard&&po(e),c=R.get("protoboard");!s||!c||(Nt=Object.values(s.en).map(p=>c.pines.get(p).div),Nt.forEach(p=>p.classList.add("tc-destino")))}function uo(){Nt.forEach(e=>e.classList.remove("tc-destino")),Nt=[]}function oe(){let e=R.get("protoboard");if(!e)return;let s=lo(null);for(let[c,p]of e.pines)p.div.classList.toggle("tc-ocupado",s.has(c))}let re=[];function fo(e){re.forEach(g=>g.classList.remove("tc-tira")),re=[];let s=R.get("protoboard");if(!e||!s)return;let[c,p]=ne(e),f=c==="protoboard"?p:null;if(!f){let g=W(c);g&&g.en&&g.en[p]&&(f=g.en[p].slice(11))}if(!f)return;let h=oo(f);for(let[g,v]of s.pines)oo(g)===h&&(v.div.classList.add("tc-tira"),re.push(v.div))}function ho(e){if(e.id==="placa")for(let s of["ledPower","led13","ledTX","ledRX"])e.el[s]=!!K.placa[s];else if(e.def===X.led){let s=Number(K.leds[e.id])||0;e.el.value=s>.005,e.el.brightness=s,e.div.classList.toggle("tc-quemado",K.quemados.includes(e.id))}}function Mr(e){let s=e.shadowRoot&&e.shadowRoot.querySelector("svg"),c=s&&vr(s.getAttribute("width")),p=s&&vr(s.getAttribute("height"));return c&&p?{w:c,h:p}:{w:e.offsetWidth||64,h:e.offsetHeight||40}}function Et(e){if(!e)return;let s=ee(e.id);if(s&&(Object.assign(e.div.style,{left:s.x+"px",top:s.y+"px",width:e.w+"px",height:e.h+"px",transform:s.rot?`rotate(${s.rot}deg)`:""}),e.id!=="protoboard"))for(let c of e.pines.values()){let p=Pe(e,s,c);c.div.style.left=p.x+"px",c.div.style.top=p.y+"px"}}function Pe(e,s,c){let p=((s.rot||0)%360+360)%360;if(!p)return{x:s.x+c.px,y:s.y+c.py};let f=p*Math.PI/180,h=Math.round(Math.cos(f)*1e9)/1e9,g=Math.round(Math.sin(f)*1e9)/1e9,v=e.w/2,A=e.h/2,D=c.px-v,G=c.py-A;return{x:L(s.x+v+D*h-G*g),y:L(s.y+A+D*g+G*h)}}function ne(e){let s=e.indexOf(".");return s>0?[e.slice(0,s),e.slice(s+1)]:[e,""]}function lt(e){let[s,c]=ne(e),p=R.get(s);if(!p||!p.lista)return null;let f=ee(s),h=p.pines.get(c);return h?Pe(p,f,h):p.def?null:{x:f.x+p.w/2,y:f.y+p.h/2}}function kr(e){let[s,c]=ne(e),p=R.get(s);return p&&p.pines.get(c)}function se(e){let s=lt(e.de),c=lt(e.a);return!s||!c?null:[s,...(e.puntos||[]).map(([p,f])=>({x:p,y:f})),c]}function gt(e,s,c){let p=document.createElementNS(mr,e);for(let f in s)p.setAttribute(f,s[f]);return c.appendChild(p),p}function pt(){for(let[e,s]of Ot)a.cables.includes(e)||(s.g.remove(),s.asas.forEach(c=>c.remove()),Ot.delete(e));a.cables.forEach((e,s)=>{let c=Ot.get(e);if(!c){let A=gt("g",{class:"tc-cable"},U);c={g:A,borde:gt("path",{class:"tc-cable-borde"},A),linea:gt("path",{class:"tc-cable-linea"},A),p0:gt("circle",{class:"tc-punta",r:2.4},A),p1:gt("circle",{class:"tc-punta",r:2.4},A),toque:gt("path",{class:"tc-cable-toque"},A),asas:[]},Ot.set(e,c)}let p=se(e);if(c.g.style.display=p?"":"none",!p)return;let f=no(p),h=ro(e.color);for(let A of[c.borde,c.linea,c.toque])A.setAttribute("d",f);c.linea.setAttribute("stroke",h),c.toque.dataset.i=s,mo(c.p0,p[0],h),mo(c.p1,p[p.length-1],h);let g=!!(E&&E.tipo==="cable"&&E.cable===e);c.g.classList.toggle("tc-seleccionado",g),g&&U.lastChild!==c.g&&U.appendChild(c.g);let v=g?(e.puntos||[]).length:0;for(;c.asas.length>v;)c.asas.pop().remove();for(;c.asas.length<v;)c.asas.push(gt("circle",{class:"tc-asa",r:3.6},mt));c.asas.forEach((A,D)=>{A.setAttribute("cx",e.puntos[D][0]),A.setAttribute("cy",e.puntos[D][1]),A.dataset.i=s,A.dataset.p=D})})}function mo(e,s,c){e.setAttribute("cx",s.x),e.setAttribute("cy",s.y),e.setAttribute("fill",c)}function St(){let e=C&&lt(C.de);if(!e){ct.setAttribute("d",""),_.setAttribute("d","");return}let s=C.puntos.map(g=>({...g})),c=s.length?s[s.length-1]:e,p=C.cursor?ie(C.cursor,c):c,f=C.destino&&lt(C.destino);f&&(p=f,yo(s,e,f));let h=no([e,...s,p]);ct.setAttribute("d",h),_.setAttribute("d",h),_.setAttribute("stroke",ro(go()))}function go(){return C.color||Qe(C.de,C.destino||"")}function ie(e,s){let c=yr/k.escala;return{x:L(Math.abs(e.x-s.x)<c?s.x:e.x),y:L(Math.abs(e.y-s.y)<c?s.y:e.y)}}function yo(e,s,c){if(!e.length)return;let p=yr/k.escala,f=e[e.length-1],h=e.length>1?e[e.length-2]:s;Math.abs(f.y-c.y)<p&&f.y!==h.y&&(f.y=c.y),Math.abs(f.x-c.x)<p&&f.x!==h.x&&(f.x=c.x)}function Rr(e){tt(null),C={de:e,puntos:[],cursor:null,destino:null,color:null},w.classList.add("tc-dibujando"),vo(e,!0),St(),ae(),et()}function Me(){C&&(vo(C.de,!1),C=null,w.classList.remove("tc-dibujando"),St(),ae(),et())}function xo(e){if(Rt[e]){if(C)C.color=e,St();else if(E&&E.tipo==="cable"){if(E.cable.color===e)return;E.cable.color=e,pt(),H()}else return;ae()}}function bo(e){let s=C;if(!s)return;if(e===s.de)return Me();let c=lt(s.de),p=lt(e);if(c&&p&&yo(s.puntos,c,p),Me(),a.cables.some(h=>h.de===s.de&&h.a===e||h.de===e&&h.a===s.de)){Ir("Esos dos pines ya est\xE1n unidos.");return}let f={de:s.de,a:e,color:s.color||Qe(s.de,e)};s.puntos.length&&(f.puntos=s.puntos.map(h=>[L(h.x),L(h.y)])),a.cables.push(f),B("cable_agregado",{de:f.de,a:f.a}),tt({tipo:"cable",cable:f}),H()}function Dr(e){let s=C.puntos.length?C.puntos[C.puntos.length-1]:lt(C.de);C.puntos.push(s?ie(e,s):e),St(),et()}function Or(){!C||!C.puntos.length||(C.puntos.pop(),St(),et())}function vo(e,s){let c=kr(e);c&&c.div.classList.toggle("tc-activo",s)}function ke(e){a.cables=a.cables.filter(s=>s!==e),B("cable_quitado",{de:e.de,a:e.a})}function tt(e){E=e;for(let s of R.values())s.div.classList.toggle("tc-seleccionado",!!e&&e.tipo==="comp"&&e.id===s.id);pt(),ae(),et()}function ae(){if(y.textContent="",n||!E&&!C)return;let e=c=>y.insertAdjacentHTML("beforeend",c),s=c=>Ze.forEach((p,f)=>{let h=Rt[p],g=nr[p]||p;e(`<button type="button" class="tc-muestra${c===p?" tc-activa":""}" data-accion="color" data-color="${p}" title="${f} \xB7 ${g}" aria-label="Cable ${g} (tecla ${f})" style="background:${h};color:${_n(h)}">${f}</button>`)});if(C){e('<span class="tc-etiqueta">Cable nuevo</span>'),s(go());return}if(E.tipo==="cable")e('<span class="tc-etiqueta">Cable</span>'),s(E.cable.color);else if(E.id==="protoboard")e(`<span class="tc-etiqueta">${(it[a.protoboard.tipo]||it.media).nombre}</span>`);else{let c=W(E.id),p=X[c.tipo],f=R.get(c.id);if(e(`<span class="tc-etiqueta">${p?p.nombre:"Pieza desconocida"}</span>`),p&&p.campo){let h=String(c.props[p.campo.prop]),g=p.campo.opciones.map(([v,A])=>`<option value="${v}"${h===String(v)?" selected":""}>${A}</option>`).join("");e(`<label class="tc-campo">${p.campo.etiqueta} <select data-prop="${p.campo.prop}">${g}</select></label>`)}if(p&&p.perilla){let h=Math.round((Number(c.props[p.perilla.prop])||0)*100);e(`<label class="tc-campo">${p.perilla.etiqueta} <input type="range" min="0" max="100" value="${h}" data-perilla aria-label="${p.perilla.etiqueta} del potenci\xF3metro"></label>`)}if(c.tipo==="led"){let h=f&&f.el.value?" checked":"";e(`<label class="tc-check"><input type="checkbox" data-accion="encender"${h}> Ver encendido</label>`)}e('<button type="button" data-accion="girar">Girar</button>')}e('<button type="button" data-accion="borrar">Borrar</button>')}function jr(e){let s=X[e];if(!s)return;let c=1;for(;W(s.prefijo+c);)c++;let p=s.prefijo+c,f=(x.clientWidth/2-k.px)/k.escala,h=(x.clientHeight/2-k.py)/k.escala,g=a.componentes.length%4*14,v={id:p,tipo:e,x:Math.round(f-20+g),y:Math.round(h-20+g),rot:0,props:at(s.props)};a.componentes.push(v),Ee(p,e,v.props).then(()=>{a.protoboard&&W(p)===v&&Ce(v)&&(B("componente_cambiado",{id:p,x:v.x,y:v.y,en:at(v.en)}),H())}),B("componente_agregado",{id:p,tipo:e}),tt({tipo:"comp",id:p}),H()}function wo(){if(!E||E.tipo!=="comp"||E.id==="protoboard")return;let e=W(E.id);e.rot=((e.rot||0)+90)%360,Et(R.get(e.id)),a.protoboard&&Ce(e),pt(),B("componente_cambiado",{id:e.id,rot:e.rot,en:e.en?at(e.en):null}),H()}function $o(){if(E){if(E.tipo==="cable")ke(E.cable);else if(E.id==="protoboard"){a.cables.filter(s=>s.de.startsWith("protoboard.")||s.a.startsWith("protoboard.")).forEach(s=>ke(s));for(let s of a.componentes)delete s.en;a.protoboard=null;let e=R.get("protoboard");e&&(e.div.remove(),R.delete("protoboard")),re=[],Nt=[],Se(),B("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let e=W(E.id),s=R.get(E.id);if(a.cables.filter(c=>c.de.startsWith(e.id+".")||c.a.startsWith(e.id+".")).forEach(c=>ke(c)),a.componentes=a.componentes.filter(c=>c!==e),s){s.div.remove();for(let c of s.pines.values())c.div.remove();R.delete(e.id)}B("componente_quitado",{id:e.id,tipo:e.tipo}),oe()}pe(),tt(null),H()}}function ce(e){if($.hidden=!e,P.setAttribute("aria-expanded",String(e)),!e)return;let s=P.getBoundingClientRect(),c=w.getBoundingClientRect();$.style.left=s.left-c.left+"px",$.style.top=s.bottom-c.top+4+"px",$.querySelector("button:not([disabled])").focus()}$.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");s&&(ce(!1),Ao(s))}),$.addEventListener("keydown",e=>{e.key==="Escape"&&(e.stopPropagation(),ce(!1),P.focus())}),d.addEventListener("pointerdown",e=>{!$.hidden&&!e.target.closest(".tc-menu")&&e.target!==P&&ce(!1)}),b.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");if(s){if(s.dataset.accion==="menu")return ce($.hidden);Ao(s)}});function Ao(e){let s=e.dataset.accion;if(s==="acercar")return je(1.25);if(s==="alejar")return je(.8);if(s==="encuadrar")return jt=!1,Lt();n||(s==="agregar"?jr(e.dataset.tipo):s==="protoboard"?Sr():s==="girar"?wo():s==="borrar"?$o():s==="color"&&(xo(e.dataset.color),x.focus({preventScroll:!0})))}b.addEventListener("change",e=>{if(n||!E||E.tipo!=="comp")return;let s=W(E.id),c=R.get(E.id),p=X[s.tipo];if(e.target.dataset.accion==="encender"){c.el.value=e.target.checked;return}let f=e.target.dataset.prop;if(!f||!p)return;let h=typeof p.props[f]=="number"?Number(e.target.value):e.target.value;s.props={...s.props,[f]:h},p.aplicar(c.el,s.props),B("componente_cambiado",{id:s.id,props:at(s.props)}),H()}),b.addEventListener("input",e=>{if(n||!E||E.tipo!=="comp"||!("perilla"in e.target.dataset))return;let s=R.get(E.id);Eo(E.id,Number(e.target.value)/100),s&&X.potenciometro.aplicar(s.el,W(E.id).props)});function Tt(e,s,c){let p=R.get(e);if(p&&(p.el.pressed=s),s)_e.add(e);else if(!_e.delete(e))return;for(let f of ao)try{f(e,s)}catch(h){console.error(h)}!s&&c!==void 0&&B("boton_pulsado",{id:e,ms:Math.round(c)})}let _o=new Map;function Eo(e,s){let c=W(e),p=R.get(e);if(!c)return;let f=X[c.tipo];if(n)return p&&f.aplicar(p.el,c.props);let h=Math.max(0,Math.min(1,Math.round(s*100)/100));if(h===c.props[f.perilla.prop])return;c.props={...c.props,[f.perilla.prop]:h};let g=E&&E.tipo==="comp"&&E.id===e&&y.querySelector("[data-perilla]");g&&Number(g.value)!==Math.round(h*100)&&(g.value=Math.round(h*100)),H(),clearTimeout(_o.get(e)),_o.set(e,setTimeout(()=>B("componente_cambiado",{id:e,props:at(c.props)}),400))}function Re(e){let s=x.getBoundingClientRect();return{x:(e.clientX-s.left-k.px)/k.escala,y:(e.clientY-s.top-k.py)/k.escala}}function De(e){try{x.setPointerCapture(e.pointerId)}catch{}}function Oe(e,s={}){S={tipo:"paneo",x0:e.clientX,y0:e.clientY,px0:k.px,py0:k.py,movido:!1,...s},De(e)}x.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;x.focus({preventScroll:!0}),pe();let s=e.target,c=Re(e);if(n)return Oe(e);let p=s.closest(".tc-pin");if(p){if(e.preventDefault(),C)return bo(p.dataset.ref);Rr(p.dataset.ref),S={tipo:"pin",ref:p.dataset.ref,x0:e.clientX,y0:e.clientY,movido:!1};return}if(C)return Oe(e,{punto:c});let f=s.closest(".tc-asa");if(f)return S={tipo:"asa",cable:a.cables[+f.dataset.i],k:+f.dataset.p,x0:e.clientX,y0:e.clientY,movido:!1},De(e);let h=s.closest(".tc-cable-toque");if(h)return tt({tipo:"cable",cable:a.cables[+h.dataset.i]});let g=s.closest(".tc-comp");if(g&&g.dataset.id!=="placa"){let v=g.dataset.id,A=te(v);if(A.tipo==="pulsador"&&(e.preventDefault(),K.simulando)){Tt(v,!0),S={tipo:"pulsar",id:v,x0:e.clientX,y0:e.clientY,movido:!1,desde:performance.now()};return}return tt({tipo:"comp",id:v}),X[A.tipo]&&X[A.tipo].perilla&&e.composedPath().some(Sn)?void 0:(S={tipo:"mover",id:v,dx:c.x-A.x,dy:c.y-A.y,x0:e.clientX,y0:e.clientY,movido:!1},De(e))}tt(null),Oe(e)}),x.addEventListener("pointermove",e=>{let s=Re(e);if(S&&S.tipo==="pulsar"&&!(e.target.closest&&e.target.closest(`.tc-comp[data-id="${S.id}"]`))){let c=S;S=null,Tt(c.id,!1,performance.now()-c.desde)}if(S){if(!S.movido&&Math.hypot(e.clientX-S.x0,e.clientY-S.y0)>xn&&(S.movido=!0),S.movido&&S.tipo==="mover"){let c=te(S.id),p=Math.round(s.x-S.dx),f=Math.round(s.y-S.dy);if(S.id==="protoboard")for(let h of a.componentes)h.en&&(h.x=L(h.x+p-c.x),h.y=L(h.y+f-c.y),Et(R.get(h.id)));c.x=p,c.y=f,Et(R.get(S.id)),S.id!=="protoboard"&&a.protoboard&&Pr(c),pt()}else if(S.movido&&S.tipo==="paneo")jt=!0,k.px=S.px0+e.clientX-S.x0,k.py=S.py0+e.clientY-S.y0,x.classList.add("tc-paneando"),le();else if(S.movido&&S.tipo==="asa"){let c=se(S.cable),p=ie(s,c[S.k]);p=ie(p,c[S.k+2]),S.cable.puntos[S.k]=[p.x,p.y],pt()}}if(C){let c=e.target.closest&&e.target.closest(".tc-pin");C.cursor=s,C.destino=c&&c.dataset.ref!==C.de?c.dataset.ref:null,St()}(!S||S.tipo==="pin")&&zr(e.target.closest&&e.target.closest(".tc-pin"))});function So(e){let s=S;if(S=null,x.classList.remove("tc-paneando"),!!s){if(s.tipo==="pulsar")return Tt(s.id,!1,performance.now()-s.desde);if(s.tipo==="mover"&&s.movido){let c=te(s.id);s.id==="protoboard"?B("componente_cambiado",{id:"protoboard",x:c.x,y:c.y}):(uo(),(a.protoboard||c.en)&&Ce(c),B("componente_cambiado",{id:s.id,x:c.x,y:c.y,en:c.en?at(c.en):null})),H()}else if(s.tipo==="asa"&&s.movido)H();else if(s.tipo==="paneo"&&!s.movido&&s.punto&&C)Dr(s.punto);else if(s.tipo==="pin"&&s.movido&&C&&e.type==="pointerup"){let c=d.elementFromPoint(e.clientX,e.clientY),p=c&&c.closest(".tc-pin");p&&p.dataset.ref!==s.ref&&bo(p.dataset.ref)}}}x.addEventListener("pointerup",So),x.addEventListener("pointercancel",So),x.addEventListener("pointerleave",()=>{if(pe(),S&&S.tipo==="pulsar"){let e=S;S=null,Tt(e.id,!1,performance.now()-e.desde)}}),x.addEventListener("dblclick",e=>{if(n||C)return;let s=d.elementFromPoint(e.clientX,e.clientY)||e.target,c=s.closest(".tc-asa"),p=s.closest(".tc-cable-toque");if(c){let f=a.cables[+c.dataset.i];f.puntos.splice(+c.dataset.p,1),f.puntos.length||delete f.puntos,pt(),et(),H()}else if(p){let f=a.cables[+p.dataset.i],h=se(f),g=Re(e),v=0,A=g,D=1/0;for(let G=0;G<h.length-1;G++){let Y=En(g,h[G],h[G+1]);Jt(g,Y)<D&&(D=Jt(g,Y),v=G,A=Y)}(f.puntos=f.puntos||[]).splice(v,0,[L(A.x),L(A.y)]),tt({tipo:"cable",cable:f}),H()}}),x.addEventListener("wheel",e=>{e.preventDefault();let s=x.getBoundingClientRect(),c=Math.min(1.5,Math.max(.66,Math.exp(-e.deltaY*.0015)));je(c,e.clientX-s.left,e.clientY-s.top)},{passive:!1}),w.addEventListener("keydown",e=>{if(e.target.closest&&e.target.closest("select, input"))return;let s=!e.ctrlKey&&!e.metaKey&&!e.altKey,c=!0;e.key==="Escape"?C?Me():tt(null):n?c=!1:e.key==="Delete"||e.key==="Backspace"?(e.preventDefault(),C?Or():$o()):(e.key==="r"||e.key==="R")&&s?wo():/^[0-9]$/.test(e.key)&&s&&(C||E&&E.tipo==="cable")?xo(Ze[Number(e.key)]):c=!1,c&&e.stopPropagation()});function le(){M.style.transform=`translate(${k.px}px, ${k.py}px) scale(${k.escala})`;let e=bn*k.escala;x.style.backgroundSize=`${e}px ${e}px`,x.style.backgroundPosition=`${k.px}px ${k.py}px`,pe()}function je(e,s,c){jt=!0,s===void 0&&(s=x.clientWidth/2,c=x.clientHeight/2);let p=Math.min(vn,Math.max(xr,k.escala*e)),f=(s-k.px)/k.escala,h=(c-k.py)/k.escala;Object.assign(k,{escala:p,px:s-f*p,py:c-h*p}),le()}function Ne(){let e=1/0,s=1/0,c=-1/0,p=-1/0,f=(h,g)=>{e=Math.min(e,h),s=Math.min(s,g),c=Math.max(c,h),p=Math.max(p,g)};for(let h of R.values()){let g=ee(h.id);if(!g)continue;let v=(g.rot||0)%180!==0,A=(v?h.h:h.w)/2,D=(v?h.w:h.h)/2;f(g.x+h.w/2-A,g.y+h.h/2-D),f(g.x+h.w/2+A,g.y+h.h/2+D)}for(let h of a.cables)for(let[g,v]of h.puntos||[])f(g,v);return isFinite(e)?{x0:e,y0:s,x1:c,y1:p}:null}function Lt(){let e=x.clientWidth,s=x.clientHeight;if(!e||!s)return!1;let c=Ne();if(!c)return!1;let{x0:p,y0:f,x1:h,y1:g}=c,v=48,A=Math.min((e-2*v)/(h-p||1),(s-2*v)/(g-f||1)),D=Math.min(2.4,Math.max(xr,A));return Object.assign(k,{escala:D,px:e/2-(p+h)/2*D,py:s/2-(f+g)/2*D}),Qt={ancho:e,alto:s},le(),!0}function Nr(){let e=Ne()||{x0:0,y0:0,x1:100,y1:100},s=12,c=16,p=Math.max(yn,Math.ceil(e.x1-e.x0+2*s)),f=Math.ceil(e.y1-e.y0+2*s)+c,h=[`<svg xmlns="${mr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${p}" height="${f}" viewBox="0 0 ${p} ${f}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${p}" height="${f}" fill="#ffffff"/>`,`<g transform="translate(${L(s-e.x0)} ${L(s-e.y0)})">`];for(let g of j.children){let v=R.get(g.dataset.id);v&&v.lista&&h.push(Tr(v))}for(let g of a.cables){let v=se(g);if(!v)continue;let A=no(v),D=ro(g.color),G=Y=>`<circle cx="${Y.x}" cy="${Y.y}" r="2.4" fill="${D}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;h.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${A}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${A}" stroke="${D}" stroke-width="3"/>${G(v[0])}${G(v[v.length-1])}</g>`)}return h.push("</g>",`<text x="${p-s}" y="${f-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${br(gn)}</text>`,"</svg>"),h.join(`
`)}function Tr(e){let s=ee(e.id);if(!s)return"";let c=s.rot?`translate(${s.x+e.w/2} ${s.y+e.h/2}) rotate(${s.rot}) translate(${-e.w/2} ${-e.h/2})`:`translate(${s.x} ${s.y})`;if(!e.def){let yt=br((W(e.id)||{}).tipo||"");return`<g transform="${c}"><rect width="${e.w}" height="${e.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${e.w/2}" y="${e.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${yt}?</text></g>`}let p=e.el.shadowRoot?e.el.shadowRoot.querySelector("svg"):e.el.tagName&&e.el.tagName.toLowerCase()==="svg"?e.el:null;if(!p)return"";let f=p.cloneNode(!0),h=[],g=document.createTreeWalker(f,NodeFilter.SHOW_COMMENT);for(;g.nextNode();)h.push(g.currentNode);h.forEach(yt=>yt.remove());let v=/--knob-angle:\s*(-?[\d.]+)deg/.exec(f.getAttribute("style")||""),A=f.querySelector("#rotating");v&&A&&A.setAttribute("transform",`rotate(${v[1]} 10 8)`),f.setAttribute("width",L(e.w)),f.setAttribute("height",L(e.h)),f.removeAttribute("id");let D="tc-"+e.id,G=[...new Set([...f.querySelectorAll("[id]")].map(yt=>yt.id))],Y=new XMLSerializer().serializeToString(f);for(let yt of G)Y=$n(Y,yt,D);Y=Y.replace(/^<svg\b/,`<svg id="${D}"`);let Mo=e.el.shadowRoot?An(e.el,D,G):"";return`<g transform="${c}">${Mo?`<style><![CDATA[
${Mo}
]]></style>`:""}${Y}</g>`}function Lr(e){let[s,c]=ne(e);if(s==="placa")return Dt[o].rotulo(c);if(s==="protoboard")return cr(c);let p=W(s),f=p&&X[p.tipo],h=p&&p.en&&p.en[c]?` \xB7 en el hueco ${p.en[c].slice(11)}`:"";return f?`${f.nombre}: ${f.rotulo(c)}${h}`:c}function zr(e){let s=e?e.dataset.ref:null;if(s===Zt)return;Zt=s,fo(s);let c=s&&lt(s);if(!c){Q.hidden=!0;return}let p=k.py+c.y*k.escala,f=K.voltajes[s],h=f===void 0?"":f===null?" \xB7 al aire":` \xB7 ${f.toFixed(2).replace(".",",")} V`;Q.textContent=Lr(s)+h,Q.style.left=k.px+c.x*k.escala+"px",Q.style.top=p+"px",Q.classList.toggle("tc-abajo",p<44),Q.hidden=!1}function pe(){Zt=null,Q.hidden=!0,fo(null)}function et(){clearTimeout(we),N.classList.remove("tc-aviso");let e=E&&E.tipo==="cable"&&E.cable.puntos&&E.cable.puntos.length;N.textContent=n?"Solo lectura: puedes mover la vista y hacer zoom.":C?C.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":e?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":E&&E.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":E&&E.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":E&&a.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":E?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":K.simulando&&a.componentes.some(s=>s.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function Ir(e){et(),N.textContent=e,N.classList.add("tc-aviso"),we=setTimeout(et,2500)}function B(e,s){if(i)try{i({t:Date.now(),origen:"circuito",tipo:e,datos:s})}catch(c){console.error(c)}}function H(){let e=at(a);for(let s of l)try{s(e)}catch(c){console.error(c)}}function Co(e){w.classList.toggle("tc-oscuro",e==="oscuro"),w.classList.toggle("tc-claro",e==="claro")}let qr={circuito:()=>at(a),alCambiar(e){typeof e=="function"&&l.push(e)},ponerPlaca(e){if(e!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:Co,exportarSVG:Nr,exportarNetlist:e=>hr(a,e),_alPulsar(e){typeof e=="function"&&ao.push(e)},_mostrar(e){let s=K.simulando;K={simulando:!!e.simulando,leds:e.leds||{},quemados:e.quemados||[],voltajes:e.voltajes||{},placa:e.placa||{}},s!==K.simulando&&(w.classList.toggle("tc-simulando",K.simulando),K.simulando||[..._e].forEach(c=>Tt(c,!1)),et()),Zt=null;for(let c of R.values())c.lista&&ho(c)},destruir(){Ae=!0,Po.disconnect(),clearTimeout(we),l.length=0,R.clear(),Ot.clear(),u.remove()}};t.tema&&Co(t.tema),n&&w.classList.add("tc-solo-lectura"),le(),et();let Po=new ResizeObserver(()=>{if(!io||Ae)return;if(!$e){$e=Lt();return}if(jt||!Qt)return;let e=(s,c)=>Math.abs(s-c)/Math.max(1,c);(e(x.clientWidth,Qt.ancho)>.1||e(x.clientHeight,Qt.alto)>.1)&&Lt()});Po.observe(x);let Vr=Ee("placa");return Se(),Promise.all([Vr,...a.protoboard?[co()]:[],...a.componentes.map(e=>Ee(e.id,e.tipo,e.props))]).then(()=>{Ae||(io=!0,oe(),pt(),$e=Lt())}),qr}function wn(r,t){let o=r&&typeof r=="object"?at(r):{};o.formato=o.formato||1,o.placa=t;let n=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!n.has(i.id)&&n.add(i.id));for(let i of o.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let l=X[i.tipo]?X[i.tipo].props:{};i.props={...l,...i.props&&typeof i.props=="object"?i.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of o.cables){let l=Array.isArray(i.puntos)&&i.puntos.every(a=>Array.isArray(a)&&a.length===2&&a.every(Number.isFinite));"puntos"in i&&!l&&delete i.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let i of o.componentes){let l=o.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(a=>typeof a=="string"&&a.startsWith("protoboard."));"en"in i&&!l&&delete i.en}return o}var Ar=r=>r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),br=r=>String(r).replace(/[<>&"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[t]);function $n(r,t,o){let n=Ar(t),i=`${o}-${t}`;return r.replace(new RegExp(`(\\s)id="${n}"`,"g"),(l,a)=>`${a}id="${i}"`).replace(new RegExp(`url\\(#${n}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${n}"`,"g"),()=>`href="#${i}"`)}function An(r,t,o){let n=r.shadowRoot,i=[...n.adoptedStyleSheets||[]];n.querySelectorAll("style").forEach(a=>a.sheet&&i.push(a.sheet));let l=[];for(let a of i){let u;try{u=a.cssRules}catch{continue}for(let d of u){if(!d.selectorText||!d.style)continue;let m=d.selectorText.split(",").map(b=>b.trim()).filter(b=>!/:host|\binput\b|:focus|\.hide-input/.test(b));if(!m.length)continue;let w=m.map(b=>{let $=b;for(let P of o)$=$.replace(new RegExp(`#${Ar(P)}(?![\\w-])`,"g"),()=>`#${t}-${P}`);return/^svg\b/.test($)?$.replace(/^svg\b/,`#${t}`):`#${t} ${$}`});l.push(`${w.join(", ")} { ${d.style.cssText} }`)}}return l.join(`
`)}function _n(r){let[t,o,n]=[1,3,5].map(i=>parseInt(r.slice(i,i+2),16)/255);return .2126*t+.7152*o+.0722*n>.55?"#1d2733":"#ffffff"}function vr(r){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(r||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function no(r){let t=n=>`${L(n.x)} ${L(n.y)}`,o=`M${t(r[0])}`;for(let n=1;n<r.length-1;n++){let i=r[n-1],l=r[n],a=r[n+1],u=Math.min(5,Jt(i,l)/2,Jt(l,a)/2);o+=` L${t(wr(l,i,u))} Q${t(l)} ${t(wr(l,a,u))}`}return`${o} L${t(r[r.length-1])}`}function wr(r,t,o){let n=Jt(r,t);return n?{x:r.x+(t.x-r.x)*o/n,y:r.y+(t.y-r.y)*o/n}:r}function En(r,t,o){let n=o.x-t.x,i=o.y-t.y,l=n*n+i*i,a=l?Math.max(0,Math.min(1,((r.x-t.x)*n+(r.y-t.y)*i)/l)):0;return{x:t.x+a*n,y:t.y+a*i}}function Sn(r){return!r||!r.getAttribute?!1:r.id==="knob"||r.id==="rotating"?!0:r.tagName==="ellipse"&&Number(r.getAttribute("rx"))>5}function _r(r){let t=new Uint8Array(32768),o=0,n=!1;for(let[i,l]of String(r).split(/\r?\n/).entries()){let a=l.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let u=a.slice(1).match(/../g).map(P=>parseInt(P,16));if(u.reduce((P,y)=>P+y,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[d,m,w,b]=u,$=u.slice(4,4+d);if(b===0){let P=o+(m<<8|w);if(P+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set($,P)}else if(b===1){n=!0;break}else b===2?o=($[0]<<8|$[1])<<4:b===4&&(o=($[0]<<8|$[1])<<16)}if(!n)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var Cn=["danoComponentes","limitePin","entradaFlotante","ruidoADC"],so='(()=>{function Dt(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var ze=256,Je=128,ft=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+ze),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(Je),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,i=255){let o=this.writeHooks[e];o&&o(s,this.data[e],e,i)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:i,enableRegister:o,enableMask:n}=e;e.inverseFlag?this.data[s]&=~i:this.data[s]|=i,this.data[o]&n&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:i,flagRegister:o,flagMask:n,inverseFlag:a}=e;if(s&i){let r=this.data[o]&n;(a?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:i},o=!0){o&&(this.data[s]&=~i);let{pendingInterrupts:n,maxInterrupt:a}=this;if(n[e]&&(n[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=a;r++)if(n[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:i,flagMask:o}=e;s&o&&(this.data[i]&=~o,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:i}=this;s=this.cycles+Math.max(1,s);let o=i.pop(),n=o??{cycles:s,callback:e,next:null};n.cycles=s,n.callback=e;let{nextClockEvent:a}=this,r=null;for(;a&&a.cycles<s;)r=a,a=a.next;return r?(r.next=n,n.next=a):(this.nextClockEvent=n,n.next=a),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:i}=this,o=null;for(;s;){if(s.callback===e)return o?o.next=s.next:this.nextClockEvent=s.next,i.length<10&&i.push(s),!0;o=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let i=this.pendingInterrupts[s];Dt(this,i.address),i.constant||this.clearInterrupt(i)}}};function ht(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Mt(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i+(t.data[95]&1),n=o&255;t.data[(e&496)>>4]=n;let a=t.data[95]&192;a|=n?0:2,a|=128&n?4:0,a|=(n^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o&256?1:0,a|=1&(s&i|i&~n|~n&s)?32:0,t.data[95]=a}else if((e&64512)===3072){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i&255;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(o^i)&(o^s)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=s+i&256?1:0,n|=1&(s&i|i&~o|~o&s)?32:0,t.data[95]=n}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=i+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,o,!0);let n=t.data[95]&224;n|=o?0:2,n|=32768&o?4:0,n|=~i&o&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=~o&i&32768?1:0,t.data[95]=n,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65039)===37893){let s=t.data[(e&496)>>4],i=s>>>1|128&s;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,i=(e&496)>>4;t.data[i]=~(1<<s)&t.data[i]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],i=e&7;t.data[95]=t.data[95]&191|(s>>i&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,i=t.pc+2,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc=s-1,t.cycles+=n?4:3}else if((e&65280)===38912){let s=e&248,i=e&7,o=t.readData((s>>3)+32),n=1<<i;t.writeData((s>>3)+32,o&~n,n)}else if((e&65039)===37888){let s=(e&496)>>4,i=255-t.data[s];t.data[s]=i;let o=t.data[95]&225|1;o|=i?0:2,o|=128&i?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===5120){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=((s^i)&(s^o)&128)!==0?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===1024){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],i=ht(s)?2:1;t.pc+=i,t.cycles+=i}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],i=s-1;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===128?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if(e===38169){let s=t.pc+1,i=t.dataView.getUint16(93,!0),o=t.data[92];t.data[i]=s&255,t.data[i-1]=s>>8&255,t.data[i-2]=s>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],i=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|i],t.dataView.setUint16(30,i+1,!0),i===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.dataView.getInt8((e&7)+16),o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?2:0)|(s*i&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:o}=t;t.data[i]=s&255,t.data[i-1]=s>>8&255,o&&(t.data[i-2]=s>>16&255),t.dataView.setUint16(93,i-(o?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=o?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],i=s+1&255;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===127?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o&255-i),t.data[s]=o}else if((e&65039)===37381){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o|i),t.data[s]=o}else if((e&65039)===37383){let s=t.data[(e&496)>>4],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^i),t.data[(e&496)>>4]=i}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],i=s>>>1;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),i=2*((e&240)>>4);t.data[i]=t.data[s],t.data[i+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,i=t.data[s],o=0-i;t.data[s]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=o===128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=o?1:0,n|=1&(o|i)?32:0,t.data[95]=n}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),i=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc+=s,t.cycles+=n?3:2}else if(e===38152){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],i=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=1&s?1:0,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===2048){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);t.data[(e&496)>>4]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=t.data[95],n=s-i-(o&1);t.data[((e&240)>>4)+16]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&65280)===39424){let s=((e&248)>>3)+32,i=1<<(e&7);t.writeData(s,t.readData(s)|i,i),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let i=t.progMem[t.pc+1],o=ht(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let i=t.progMem[t.pc+1],o=ht(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=e&15|(e&192)>>2,n=i-o;t.dataView.setUint16(s,n,!0);let a=t.data[95]&192;a|=n?0:2,a|=32768&n?4:0,a|=i&~n&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>i?1:0,a|=1&(~i&o|o&n|n&~i)?32:0,t.data[95]=a,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],i=ht(s)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],i=ht(s)?2:1;t.cycles+=i,t.pc+=i}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],i=t.progMem[t.pc+1];t.writeData(i,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.writeData(i,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0);t.writeData(i,s),t.dataView.setUint16(28,i+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i;t.data[((e&240)>>4)+16]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&65039)===37890){let s=(e&496)>>4,i=t.data[s];t.data[s]=(15&i)<<4|(240&i)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,i=t.data[s],o=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=i,t.data[s]=o}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var F;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(F||(F={}));var M;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(M||(M={}));var ce={0:{type:M.SingleEnded,channel:0},1:{type:M.SingleEnded,channel:1},2:{type:M.SingleEnded,channel:2},3:{type:M.SingleEnded,channel:3},4:{type:M.SingleEnded,channel:4},5:{type:M.SingleEnded,channel:5},6:{type:M.SingleEnded,channel:6},7:{type:M.SingleEnded,channel:7},8:{type:M.Temperature},14:{type:M.Constant,voltage:1.1},15:{type:M.Constant,voltage:0}},Ze={type:M.Constant,voltage:0},kt={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:ce,adcReferences:[F.AREF,F.AVCC,F.Reserved,F.Internal1V1]},Qe=7,Ye=8,ts=16,re=64,bt=128,es=31,ss=32,is=8,os=8,ns=3,as=6,dt=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=i=>{var o;let n=0;switch(i.type){case M.Constant:n=i.voltage;break;case M.SingleEnded:n=(o=this.channelValues[i.channel])!==null&&o!==void 0?o:0;break;case M.Differential:n=i.gain*((this.channelValues[i.positiveChannel]||0)-(this.channelValues[i.negativeChannel]||0));break;case M.Temperature:n=.378125;break}let a=n/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(a),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:ts,enableRegister:this.config.ADCSRA,enableMask:Ye},e.writeHooks[s.ADCSRA]=(i,o)=>{var n;if(i&bt&&!(o&bt)&&(this.conversionCycles=25),e.data[s.ADCSRA]=i,e.updateInterruptEnable(this.ADC,i),!this.converting&&i&re){if(!(i&bt))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let a=this.cpu.data[this.config.ADMUX]&es;e.data[s.ADCSRB]&is&&(a|=32),a&=s.muxInputMask;let r=(n=s.muxChannels[a])!==null&&n!==void 0?n:Ze;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:i,ADMUX:o,ADCSRA:n}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[o]&ss?(this.cpu.data[s]=e<<6&255,this.cpu.data[i]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[i]=e>>8&3),this.cpu.data[n]&=~re,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&Qe){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:i}=this.config,o=this.cpu.data[s]>>as&ns;return i.length>4&&this.cpu.data[s]&os&&(o|=4),(e=i[o])!==null&&e!==void 0?e:F.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case F.AVCC:return this.avcc;case F.AREF:return this.aref;case F.Internal1V1:return 1.1;case F.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var rs=2,cs=4,ls=8,fs=16,hs=32,ai=rs|cs|ls|fs|hs;var le={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},fe={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},he={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},de={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},xe={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var J={PIN:35,DDR:36,PORT:37,pinChange:he,externalInterrupts:[]},Bt={PIN:38,DDR:39,PORT:40,pinChange:de,externalInterrupts:[]},j={PIN:41,DDR:42,PORT:43,pinChange:xe,externalInterrupts:[null,null,le,fe]};var k;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(k||(k={}));var y;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(y||(y={}));var z;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(z||(z={}));var xt=class{constructor(e,s){var i,o,n,a;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=c=>{let T=e.data[s.PORT];return e.data[s.DDR]=c,this.writeGpio(T,c),this.updatePinRegister(c),!0},e.writeHooks[s.PORT]=c=>{let T=e.data[s.DDR];return e.data[s.PORT]=c,this.writeGpio(c,T),this.updatePinRegister(T),!0},e.writeHooks[s.PIN]=(c,T,h,m)=>{let R=e.data[s.PORT],A=e.data[s.DDR],b=R^c&m;return e.data[s.PORT]=b,this.writeGpio(b,A),this.updatePinRegister(A),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(c=>c?{address:c.interrupt,flagRegister:c.EIFR,flagMask:1<<c.index,enableRegister:c.EIMSK,enableMask:1<<c.index}:null);let l=new Set(r.map(c=>c?.EICR));for(let c of l)this.attachInterruptHook(c||0);let u=(o=(i=r.find(c=>c&&c.EIMSK))===null||i===void 0?void 0:i.EIMSK)!==null&&o!==void 0?o:0;this.attachInterruptHook(u,"mask");let d=(a=(n=r.find(c=>c&&c.EIFR))===null||n===void 0?void 0:n.EIFR)!==null&&a!==void 0?a:0;this.attachInterruptHook(d,"flag");let{pinChange:p}=s;if(this.PCINT=p?{address:p.pinChangeInterrupt,flagRegister:p.PCIFR,flagMask:1<<p.PCIE,enableRegister:p.PCICR,enableMask:1<<p.PCIE}:null,p){let{PCIFR:c,PCMSK:T}=p;e.writeHooks[c]=h=>{for(let m of this.cpu.gpioPorts){let{PCINT:R}=m;R&&e.clearInterruptByFlag(R,h)}return!0},e.writeHooks[T]=h=>{e.data[T]=h;for(let m of this.cpu.gpioPorts){let{PCINT:R}=m;R&&e.updateInterruptEnable(R,h)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],o=1<<e,n=i&o?k.InputPullUp:k.Input,a=this.openCollector&o?n:k.High;return s&o?this.lastValue&o?a:k.Low:n}setPin(e,s){let i=1<<e;this.pinValue&=~i,s&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:i,portConfig:o}=this,n=1<<e;if(s===y.None)this.overrideMask|=n,this.overrideValue&=~n;else switch(this.overrideMask&=~n,s){case y.Enable:this.overrideValue&=~n,this.overrideValue|=i.data[o.PORT]&n;break;case y.Set:this.overrideValue|=n;break;case y.Clear:this.overrideValue&=~n;break;case y.Toggle:this.overrideValue^=n;break}let a=i.data[o.DDR];this.writeGpio(i.data[o.PORT],a),this.updatePinRegister(a)}updatePinRegister(e){var s,i;let o=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=o,this.lastPin!==o){for(let n=0;n<8;n++)if((o&1<<n)!==(this.lastPin&1<<n)){let a=!!(o&1<<n);this.toggleInterrupt(n,a),(i=(s=this.externalClockListeners)[n])===null||i===void 0||i.call(s,a)}this.lastPin=o}}toggleInterrupt(e,s){let{cpu:i,portConfig:o,externalInts:n,PCINT:a}=this,{externalInterrupts:r,pinChange:l}=o,u=r[e],d=n[e];if(d&&u){let{EIMSK:p,index:c,EICR:T,iscOffset:h}=u;if(i.data[p]&1<<c){let m=i.data[T]>>h&3,R=!1;switch(d.constant=!1,m){case z.LowLevel:R=!s,d.constant=!0;break;case z.Change:R=!0;break;case z.FallingEdge:R=!s;break;case z.RisingEdge:R=s;break}R?i.setInterruptFlag(d):d.constant&&i.clearInterrupt(d,!0)}}if(l&&a&&l.mask&1<<e){let{PCMSK:p}=l;i.data[p]&1<<e+l.offset&&i.setInterruptFlag(a)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:i}=this;i.writeHooks[e]=o=>{s!=="flag"&&(i.data[e]=o);for(let n of i.gpioPorts){for(let a of n.externalInts)a&&s==="mask"&&i.updateInterruptEnable(a,o),a&&!a.constant&&s==="flag"&&i.clearInterruptByFlag(a,o);n.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let i=0;i<8;i++){let o=s[i];if(!o)continue;let n=!!(this.lastPin&1<<i),{EIFR:a,EIMSK:r,index:l,EICR:u,iscOffset:d,interrupt:p}=o;if(!(e.data[r]&1<<l)||n)continue;(e.data[u]>>d&3)===z.LowLevel&&e.queueInterrupt({address:p,flagRegister:a,flagMask:1<<l,enableRegister:r,enableMask:1<<l,constant:!0})}}writeGpio(e,s){let i=(e&this.overrideMask|this.overrideValue)&s|e&~s,o=this.lastValue;if(i!==o||s!==this.lastDdr){this.lastValue=i,this.lastDdr=s;for(let n of this.listeners)n(i,o)}}};var pe={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Ct;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Ct||(Ct={}));var vt={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},Ot=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:pe,compPortA:j.PORT,compPinA:6,compPortB:j.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:j.PORT,externalClockPin:4},vt),Ft=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:pe,compPortA:J.PORT,compPinA:1,compPortB:J.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:j.PORT,externalClockPin:5},vt),Wt=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:J.PORT,compPinA:3,compPortB:j.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},vt),at;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(at||(at={}));var U;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(U||(U={}));var w;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(w||(w={}));var G=1,nt=2,Z=1,{Normal:Vt,PWMPhaseCorrect:N,CTC:wt,FastPWM:H,Reserved:_t,PWMPhaseFrequencyCorrect:gt}=at,ds=[[Vt,255,w.Immediate,U.Max,0],[N,255,w.Top,U.Bottom,0],[wt,G,w.Immediate,U.Max,0],[H,255,w.Bottom,U.Max,0],[_t,255,w.Immediate,U.Max,0],[N,G,w.Top,U.Bottom,Z],[_t,255,w.Immediate,U.Max,0],[H,G,w.Bottom,U.Top,Z]],xs=[[Vt,65535,w.Immediate,U.Max,0],[N,255,w.Top,U.Bottom,0],[N,511,w.Top,U.Bottom,0],[N,1023,w.Top,U.Bottom,0],[wt,G,w.Immediate,U.Max,0],[H,255,w.Bottom,U.Top,0],[H,511,w.Bottom,U.Top,0],[H,1023,w.Bottom,U.Top,0],[gt,nt,w.Bottom,U.Bottom,0],[gt,G,w.Bottom,U.Bottom,Z],[N,nt,w.Top,U.Bottom,0],[N,G,w.Top,U.Bottom,Z],[wt,nt,w.Immediate,U.Max,0],[_t,65535,w.Immediate,U.Max,0],[H,nt,w.Bottom,U.Top,Z],[H,G,w.Bottom,U.Top,Z]];function Cs(t){switch(t){case 1:return y.Toggle;case 2:return y.Clear;case 3:return y.Set;default:return y.Enable}}var Ce=128,ge=64,gs=32,pt=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=w.Immediate,this.tovUpdateMode=U.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(i=!0,o=!1)=>{let{divider:n,lastCycle:a,cpu:r}=this,{cycles:l}=r,u=l-a;if(n&&u>=n||o){let d=o?1:Math.floor(u/n);this.lastCycle+=d*n;let p=this.tcnt,{timerMode:c,TOP:T}=this,h=c===N||c===gt,m=h?this.phasePwmCount(p,d):(p+d)%(T+1),R=p+d>T;if(this.tcntUpdated||(this.tcnt=m,h||this.timerUpdated(m,p)),!h){if(c===H&&R){let{compA:A,compB:b}=this;A&&this.updateCompPin(A,"A",!0),b&&this.updateCompPin(b,"B",!0)}this.ocrUpdateMode==w.Bottom&&R&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),R&&(this.tovUpdateMode==U.Top||T===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===w.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===w.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:d}=this,{externalClockPin:p}=this.config,c=this.config.dividers[d];this.lastCycle=c?this.cpu.cycles:0,this.updateDivider=!1,this.divider=c,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[p]=null),c?r.addClockEvent(this.count,this.lastCycle+c-r.cycles):this.externalClockPort&&(d===Ct.FallingEdge||d===Ct.RisingEdge)&&(this.externalClockPort.externalClockListeners[p]=this.externalClockCallback,this.externalClockRisingEdge=d===Ct.RisingEdge);return}i&&n&&r.addClockEvent(this.count,this.lastCycle+n-r.cycles)},this.externalClockCallback=i=>{i===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=i=>(this.count(!1),this.config.bits===16&&(this.cpu.data[i+1]=this.tcnt>>8),this.cpu.data[i]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=i=>{this.tcntNext=this.highByteTemp<<8|i,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=i=>{this.nextOcrA=this.highByteTemp<<8|i,this.ocrUpdateMode===w.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=i=>{this.nextOcrB=this.highByteTemp<<8|i,this.ocrUpdateMode===w.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=i=>{this.nextOcrC=this.highByteTemp<<8|i,this.ocrUpdateMode===w.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=n=>{this.icr=this.highByteTemp<<8|n};let i=n=>{this.highByteTemp=n},o=(n,a,r)=>(this.highByteTemp=n&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=i,this.cpu.writeHooks[s.OCRA+1]=o,this.cpu.writeHooks[s.OCRB+1]=o,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=o),this.cpu.writeHooks[s.ICR+1]=i}e.writeHooks[s.TCCRA]=i=>(this.cpu.data[s.TCCRA]=i,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=i=>(s.TCCRC||(this.checkForceCompare(i),i&=~(Ce|ge)),this.cpu.data[s.TCCRB]=i,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=i=>{this.checkForceCompare(i)}),e.writeHooks[s.TIFR]=i=>(this.cpu.data[s.TIFR]=i,this.cpu.clearInterruptByFlag(this.OVF,i),this.cpu.clearInterruptByFlag(this.OCFA,i),this.cpu.clearInterruptByFlag(this.OCFB,i),!0),e.writeHooks[s.TIMSK]=i=>{this.cpu.updateInterruptEnable(this.OVF,i),this.cpu.updateInterruptEnable(this.OCFA,i),this.cpu.updateInterruptEnable(this.OCFB,i)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case G:return this.ocrA;case nt:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case G:case nt:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,i=e.bits===16?xs:ds,o=this.cpu.data[e.TCCRA],[n,a,r,l,u]=i[s];this.timerMode=n,this.topValue=a,this.ocrUpdateMode=r,this.tovUpdateMode=l;let d=n===H||n===N||n===gt,p=this.compA;this.compA=o>>6&3,this.compA===1&&d&&!(u&Z)&&(this.compA=0),!!p!=!!this.compA&&this.updateCompA(this.compA?y.Enable:y.None);let c=this.compB;if(this.compB=o>>4&3,this.compB===1&&d&&(this.compB=0),!!c!=!!this.compB&&this.updateCompB(this.compB?y.Enable:y.None),this.hasOCRC){let T=this.compC;this.compC=o>>2&3,this.compC===1&&d&&(this.compC=0),!!T!=!!this.compC&&this.updateCompC(this.compC?y.Enable:y.None)}}phasePwmCount(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a,TOP:r,MAX:l,tcntUpdated:u}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===w.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!u&&(this.countingUp=!1,this.ocrUpdateMode===w.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!u&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===w.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),u||(e===i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===o&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&e===n&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&l}timerUpdated(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a}=this,r=s>e;((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&((s<n||r)&&e>=n||s<n&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==at.FastPWM||this.timerMode==at.PWMPhaseCorrect||this.timerMode==at.PWMPhaseFrequencyCorrect||(e&Ce&&this.updateCompPin(this.compA,"A"),e&ge&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&gs&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,i=!1){let o=y.None,n=e===3,a=this.countingUp===n;switch(this.timerMode){case Vt:case wt:o=Cs(e);break;case H:e===1?o=i?y.None:y.Toggle:o=n!==i?y.Set:y.Clear;break;case N:case gt:e===1?o=y.Toggle:o=a?y.Set:y.Clear;break}o!==y.None&&(s==="A"?this.updateCompA(o):s==="B"?this.updateCompB(o):this.updateCompC(o))}updateCompA(e){let{compPortA:s,compPinA:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompB(e){let{compPortB:s,compPinB:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompC(e){let{compPortC:s,compPinC:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}};var Ht={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},ps=128,us=64,ue=32;var Nt=2,ms=1,me=Nt,Rs=128,Ss=64,Is=32,Pt=16,Et=8,Te=4;var Re=Te|Pt|Et;var Ts=32,As=16,ws=8,Se=4,Ie=2;var Ps={5:31,6:63,7:127,8:255,9:255},ut=class{constructor(e,s,i){this.cpu=e,this.config=s,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:ps,enableRegister:this.config.UCSRB,enableMask:Rs,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:ue,enableRegister:this.config.UCSRB,enableMask:Is},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:us,enableRegister:this.config.UCSRB,enableMask:Ss},this.reset(),this.cpu.writeHooks[s.UCSRA]=(o,n)=>{var a;return e.data[s.UCSRA]=o&(ms|Nt),e.clearInterruptByFlag(this.TXC,o),(o&me)!==(n&me)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(o,n)=>{var a;return e.updateInterruptEnable(this.RXC,o),e.updateInterruptEnable(this.UDRE,o),e.updateInterruptEnable(this.TXC,o),o&Pt&&n&Pt&&e.clearInterrupt(this.RXC),o&Et&&!(n&Et)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=o,(o&Re)!==(n&Re)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=o=>{var n;return e.data[s.UCSRC]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var o;let n=(o=Ps[this.bitsPerChar])!==null&&o!==void 0?o:255,a=this.rxByte&n;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),a},this.cpu.writeHooks[s.UDR]=o=>{if(this.onByteTransmit&&this.onByteTransmit(o),this.onLineTransmit){let n=String.fromCharCode(o);n===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=n}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=o=>{var n;return this.cpu.data[s.UBRRH]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.writeHooks[s.UBRRL]=o=>{var n;return this.cpu.data[s.UBRRL]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=ue,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Se|Ie,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var i;let{cpu:o}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,o.setInterruptFlag(this.RXC),(i=this.onRxComplete)===null||i===void 0||i.call(this);else return this.rxBusyValue=!0,o.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&Nt?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&Pt)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Et)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Se|Ie))>>1|this.cpu.data[this.config.UCSRB]&Te){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ws?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&Ts)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&As)}};function Ae(t){let e=new Uint8Array(32768),s=0,i=!1;for(let[o,n]of String(t).split(/\\r?\\n/).entries()){let a=n.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${o+1}).`);let r=a.slice(1).match(/../g).map(T=>parseInt(T,16));if(r.reduce((T,h)=>T+h,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${o+1}).`);let[l,u,d,p]=r,c=r.slice(4,4+l);if(p===0){let T=s+(u<<8|d);if(T+l>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(c,T)}else if(p===1){i=!0;break}else p===2?s=(c[0]<<8|c[1])<<4:p===4&&(s=(c[0]<<8|c[1])<<16)}if(!i)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var rt=16e6,Es=[[j,["D0","D1","D2","D3","D4","D5","D6","D7"]],[J,["D8","D9","D10","D11","D12","D13"]],[Bt,["A0","A1","A2","A3","A4","A5"]]];function we(t){let e=new ft(Ae(t));[Ot,Ft,Wt].forEach(h=>new pt(e,h));let s=new ut(e,Ht,rt),i=new dt(e,kt),o=Es.map(([h,m])=>[new xt(e,h),m]),n={};for(let[h,m]of o)m.forEach((R,A)=>n[R]=[h,A]);let a=null;i.onADCRead=h=>{let m=0;if(h.type===M.SingleEnded){let b=i.channelValues[h.channel]||0;m=a?a(h.channel,b):b}else h.type===M.Constant?m=h.voltage:h.type===M.Temperature&&(m=.378125);let R=Math.round(m*1e6)/1e6,A=Math.min(1023,Math.max(0,Math.floor(R/i.referenceVoltage*1024)));e.addClockEvent(()=>i.completeADCRead(A),i.sampleCycles)};let r=[],l=[],u=[],d=[],p=c();function c(){let h={};for(let[m,R]of o)R.forEach((A,b)=>h[A]=m.pinState(b));return h}for(let[h]of o)h.addListener(()=>{let m=c(),R={};for(let A in m)m[A]!==p[A]&&(R[A]=m[A]);p=m,Object.keys(R).length&&l.forEach(A=>A(R,m))});s.onByteTransmit=h=>u.forEach(m=>m(h));function T(h){let m=e.cycles+h;for(;e.cycles<m;){let R=Math.min(m,e.cycles+rt/1e3);for(;e.cycles<R;)Mt(e),e.tick();d.length&&!s.rxBusy&&(s.writeByte(d[0]),d.shift());for(let A of r)A()}}return{correr:T,estados:c,get ciclos(){return e.cycles},alCambiarPines:h=>l.push(h),alByteSerial:h=>u.push(h),enviarSerial:h=>d.push(...new TextEncoder().encode(h)),ponerAnalogico:(h,m)=>i.channelValues[h]=Math.max(0,Math.min(5,m)),ponerLectorAnalogico:h=>a=h,ponerEntrada(h,m){let R=n[h];R&&R[0].setPin(R[1],!!m)},alCadaMs:h=>r.push(h)}}var ys=["a","b","c","d","e"],Us=["f","g","h","i","j"],Lt={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},Ds=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],Pe={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},Kt=t=>14.4+(t-1)*9.6,Ms=t=>t>=2&&(t-1)%6!==0,jt=new Map;function $t(t="media"){if(jt.has(t))return jt.get(t);let e=Pe[t]||Pe.media,s=[];jt.set(t,s);for(let i=1;i<=e.columnas;i++){for(let o of ys)s.push({nombre:o+i,x:Kt(i),y:Lt[o],tira:"arriba"+i});for(let o of Us)s.push({nombre:o+i,x:Kt(i),y:Lt[o],tira:"abajo"+i});for(let[o]of Ds)Ms(i)&&s.push({nombre:o+i,x:Kt(i),y:Lt[o],tira:o})}return s}var Gt=new Map;function Ee(t="media"){if(Gt.has(t))return Gt.get(t);let e=new Map;Gt.set(t,e);for(let s of $t(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var bs=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function qt(t,{presionados:e=new Set,conduccion:s=!1}={}){let i=new Map,o=a=>{for(i.has(a)||i.set(a,a);i.get(a)!==a;)i.set(a,i.get(i.get(a))),a=i.get(a);return a},n=(a,r)=>i.set(o(a),o(r));for(let a of bs)a.forEach(r=>n("placa."+a[0],"placa."+r));for(let a of t.cables)n(a.de,a.a);if(t.protoboard){for(let a of Ee(t.protoboard.tipo).values())a.forEach(r=>n("protoboard."+a[0],"protoboard."+r));for(let a of t.componentes)if(a.en)for(let[r,l]of Object.entries(a.en))n(a.id+"."+r,l)}for(let a of t.componentes)a.tipo==="pulsador"?(n(a.id+".1i",a.id+".1d"),n(a.id+".2i",a.id+".2d"),e.has(a.id)&&n(a.id+".1i",a.id+".2i")):s&&a.tipo==="resistencia"?n(a.id+".1",a.id+".2"):s&&a.tipo==="potenciometro"&&(n(a.id+".GND",a.id+".SIG"),n(a.id+".SIG",a.id+".VCC"));return o}function zt(t,e,s,i){e>=0&&(t[e][e]+=i),s>=0&&(t[s][s]+=i),e>=0&&s>=0&&(t[e][s]-=i,t[s][e]-=i)}function Xt(t,e,s){e>=0&&(t[e]+=s)}var Q=(t,e)=>e>=0?t[e]:0;function mt(t,e,s){return{a:t,b:e,g:1/s,sellar(i){zt(i,this.a,this.b,this.g)},corriente(i){return(Q(i,this.a)-Q(i,this.b))*this.g}}}function ye(t){return{nodo:t,v:0,g:0,sellar(e,s){zt(e,this.nodo,-1,this.g),Xt(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-Q(e,this.nodo))*this.g}}}function Ue(t,e){return{nodo:t,v:e,fila:-1,sellar(s,i){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,i[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function De(t,e,{Is:s,n:i}){let o=i*.025693,n=o*Math.log(o/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(a,r){let l=Math.exp(this.vd/o),u=s*(l-1),d=s*l/o+1e-12,p=u-d*this.vd;zt(a,this.a,this.k,d),Xt(r,this.a,-p),Xt(r,this.k,p)},actualizar(a){let r=Q(a,this.a)-Q(a,this.k),l=Math.abs(r-this.vd);return this.vd=ks(r,this.vd,o,n),l},corriente(a){let r=Q(a,this.a)-Q(a,this.k);return s*Math.expm1(r/o)}}}function ks(t,e,s,i){if(t>i&&Math.abs(t-e)>2*s){if(e>0){let o=1+(t-e)/s;return o>0?e+s*Math.log(o):i}return s*Math.log(t/s)}return t}function Me(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let i=t.nodos+t.fuentes,o=t.elementos.filter(a=>a.noLineal),n=new Float64Array(i);for(let a=1;a<=e;a++){let r=Array.from({length:i},()=>new Float64Array(i)),l=new Float64Array(i);for(let d of t.elementos)d.sellar(r,l);for(let d=0;d<t.nodos;d++)r[d][d]+=1e-12;if(n=Bs(r,l),!o.length)return{x:n,iteraciones:a,convergio:!0};let u=0;for(let d of o)u=Math.max(u,d.actualizar(n));if(u<s)return{x:n,iteraciones:a,convergio:!0}}return{x:n,iteraciones:e,convergio:!1}}function Bs(t,e){let s=e.length;for(let o=0;o<s;o++){let n=o;for(let a=o+1;a<s;a++)Math.abs(t[a][o])>Math.abs(t[n][o])&&(n=a);if(Math.abs(t[n][o])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[o],t[n]]=[t[n],t[o]],[e[o],e[n]]=[e[n],e[o]];for(let a=o+1;a<s;a++){let r=t[a][o]/t[o][o];if(r){for(let l=o;l<s;l++)t[a][l]-=r*t[o][l];e[a]-=r*e[o]}}}let i=new Float64Array(s);for(let o=s-1;o>=0;o--){let n=e[o];for(let a=o+1;a<s;a++)n-=t[o][a]*i[a];i[o]=n/t[o][o]}return i}var Y={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},Jt=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],vs={A4:"SDA",A5:"SCL"},O={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},Os=.25,be={minimo:1};function Fs(t){let s=(O.vf[t]||O.vf.rojo)-O.iRef*O.rs;return{Is:O.iRef/Math.expm1(s/(O.n*.025693)),n:O.n}}var ke={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"]};function Be(t,{quemados:e=new Set,presionados:s=new Set}={}){let i=qt(t,{presionados:s}),o=qt(t,{presionados:s,conduccion:!0}),n=i("placa.GND1"),a=new Map,r=0,l=f=>{let C=i(f);return C===n?-1:(a.has(C)||a.set(C,r++),a.get(C))},u=f=>i(f)===n?-1:a.get(i(f)),d=[],p=[],c=[],T=new Set(t.cables.flatMap(f=>[f.de,f.a])),h=[];if(t.protoboard){let f=new Set([...T].map(i));for(let C of t.componentes)for(let S of Object.keys(C.en||{}))f.add(i(C.id+"."+S));for(let C of $t(t.protoboard.tipo)){let S="protoboard."+C.nombre;f.has(i(S))&&h.push(S)}}let m=new Map;for(let[f,C]of[["5V",5],["3V3",3.3]]){if(!T.has("placa."+f))continue;let S=l("placa."+f),P=S===-1?"GND":m.get(S);if(P){c.push({tipo:"cortocircuito",componente:"placa."+f,mensaje:`El pin ${f} est\\xE1 unido directo a ${P}: es un cortocircuito.`});continue}m.set(S,f);let x=Ue(S,C);p.push(x),d.push(x)}let R={};for(let f of Jt)!T.has("placa."+f)&&!T.has("placa."+vs[f])||(R[f]=ye(l("placa."+f)),d.push(R[f]));let A=[],b=[],_=[];for(let f of t.componentes)if(f.tipo==="resistencia"){let C=mt(l(f.id+".1"),l(f.id+".2"),Number(f.props.ohmios)||1);A.push({id:f.id,ohmios:Number(f.props.ohmios)||1,el:C}),C.a!==C.b&&d.push(C)}else if(f.tipo==="led"){let C=l(f.id+".anodo"),S=l(f.id+".catodo"),P={id:f.id,a:C,k:S,quemado:e.has(f.id)};if(!P.quemado&&C!==S){let x=r++;P.rs=mt(C,x,O.rs),P.diodo=De(x,S,Fs(f.props.color)),d.push(P.rs,P.diodo)}b.push(P)}else if(f.tipo==="potenciometro"){let C=Number(f.props.ohmios)||1e4,S=Math.max(0,Math.min(1,Number(f.props.posicion))),P=l(f.id+".GND"),x=l(f.id+".SIG"),D=l(f.id+".VCC"),q=mt(P,x,Math.max(be.minimo,C*S)),et=mt(x,D,Math.max(be.minimo,C*(1-S)));for(let X of[q,et])X.a!==X.b&&d.push(X);_.push({id:f.id,ohmios:C,posicion:S,bajo:q,alto:et})}p.forEach((f,C)=>f.fila=r+C);function tt(f){let C=new Set([o("placa.GND1")]);for(let S of["5V","3V3"])T.has("placa."+S)&&C.add(o("placa."+S));for(let S of Jt){let P=f[S];(P===k.High||P===k.Low||P===k.InputPullUp)&&C.add(o("placa."+S))}return C}let L=new Set([...T,...h]);for(let f of t.componentes)for(let C of ke[f.tipo]||[])L.add(f.id+"."+C);return{fallasFijas:c,flotantes(f){let C=tt(f),S=new Set;for(let P of Jt)f[P]===k.Input&&!C.has(o("placa."+P))&&S.add(P);return S},refsAlAire(f){let C=tt(f),S=new Set;for(let P of L)C.has(o(P))||S.add(P);return S},ponerPines(f){for(let[C,S]of Object.entries(R)){let P=f[C];P===k.High?Object.assign(S,{v:Y.voltios,g:1/Y.rAlto}):P===k.Low?Object.assign(S,{v:0,g:1/Y.rBajo}):P===k.InputPullUp?Object.assign(S,{v:Y.voltios,g:1/Y.rPullUp}):Object.assign(S,{v:0,g:0})}},resolver(){let f=Me({nodos:r,fuentes:p.length,elementos:d}),C=x=>{let D=u(x);return D===void 0?null:D<0?0:f.x[D]},S={};for(let x of T)S[x]=C(x);for(let x of h)S[x]=C(x);for(let x of t.componentes)for(let D of ke[x.tipo]||[])S[x.id+"."+D]=C(x.id+"."+D);let P=(x,D)=>x===null||D===null?null:x-D;return{convergio:f.convergio,iteraciones:f.iteraciones,voltajes:S,leds:b.map(x=>{let D=x.diodo?x.diodo.corriente(f.x):0;return{id:x.id,quemado:x.quemado,v:P(C(x.id+".anodo"),C(x.id+".catodo")),i:D,brillo:Math.max(0,Math.min(1,D*1e3/O.plenomA))}}),resistencias:A.map(x=>{let D=x.el.a===x.el.b?0:x.el.corriente(f.x);return{id:x.id,ohmios:x.ohmios,v:P(C(x.id+".1"),C(x.id+".2")),i:D,w:D*D*x.ohmios}}),pines:Object.entries(R).filter(([,x])=>x.g>0).map(([x,D])=>({pin:x,v:C("placa."+x),i:D.corriente(f.x)})),fuentes:p.map(x=>({pin:x.v===5?"5V":"3V3",i:x.corriente(f.x)})),potenciometros:_.map(x=>({id:x.id,ohmios:x.ohmios,posicion:x.posicion,v:P(C(x.id+".SIG"),C(x.id+".GND")),i:Math.abs(x.bajo.a!==x.bajo.b?x.bajo.corriente(f.x):x.alto.a!==x.alto.b?x.alto.corriente(f.x):0)}))}}}}function _e(t,e){let s=o=>(Math.abs(o)*1e3).toFixed(0),i=[];if(e.danoComponentes){for(let o of t.leds)!o.quemado&&o.i*1e3>O.quemamA&&i.push({tipo:"led_quemado",componente:o.id,corriente_mA:+(o.i*1e3).toFixed(1),mensaje:`El LED ${o.id} se quem\\xF3: le pasaron ${s(o.i)} mA y aguanta unos ${O.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let o of t.resistencias)o.w>Os&&i.push({tipo:"resistencia_caliente",componente:o.id,potencia_W:+o.w.toFixed(2),mensaje:`La resistencia ${o.id} se calienta: disipa ${o.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let o of t.pines)if(Math.abs(o.i)*1e3>Y.maxmA){let n=o.pin.startsWith("D")?"pin "+o.pin.slice(1):"pin "+o.pin;i.push({tipo:"corriente_pin",componente:"placa."+o.pin,corriente_mA:+(Math.abs(o.i)*1e3).toFixed(1),mensaje:`El ${n} entrega ${s(o.i)} mA y aguanta ${Y.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return i}var Ws=60,ve=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],Oe=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Vs=3,Ns=1.5,Hs=1/120,Ls=.6*5/1024,Ks=.15;function Fe({hex:t,circuito:e,activas:s={},semilla:i=Math.floor(Math.random()*2**32)}){let o=qs(i),n=new Set,a=new Set,r=new Set,l=new Set,u={},d=new Map,p={},c=null,T=e,h=null,m=new Map,R=new Map,A=new Map,b=[],_="",tt=0,L={inicio:0,clave:""},f=null,C=null,S=0,P=0,x=[],D=new TextDecoder("utf-8"),q=new Set,et=new Set,X=[],Tt=[],yt=()=>c.ciclos/rt*1e3,te=g=>{let I="";for(let B in g)I+=g[B];return I};function Ut(){c=we(t);let g=c.estados();_=te(g),R.set(_,g),tt=0,A=new Map,b=[],L={inicio:0,clave:_},f=null,c.alCambiarPines((I,B)=>{ee(),_=te(B),R.has(_)||R.set(_,B),_===L.clave&&(f={tiempos:new Map(A),ciclo:c.ciclos}),st()}),c.alCadaMs(Ke),c.ponerLectorAnalogico(je),c.alByteSerial(I=>{x.push(I),P=yt()+Ws})}function ee(){let g=c.ciclos;A.set(_,(A.get(_)||0)+(g-tt)),tt=g}function lt(){h=Be(T,{quemados:q,presionados:n}),m=new Map}function st(){if(!h||!c)return;let g=R.get(_)||c.estados(),I=oe(_),B=h.flotantes(g);a=new Set;for(let E of Oe){let v=g[E];if(v!==k.Input&&v!==k.InputPullUp)continue;if(B.has(E)){a.add(E),E in u||(u[E]=o()<.5),c.ponerEntrada(E,s.entradaFlotante?u[E]:!1);continue}let K=I?I.voltajes["placa."+E]:null,it;typeof K=="number"?it=K>=Vs?!0:K<=Ns?!1:!!p[E]:it=v===k.InputPullUp,p[E]=it,c.ponerEntrada(E,it)}r=new Set,ve.forEach((E,v)=>{B.has(E[0])&&r.add(v)}),I&&ne(I),l=h.refsAlAire(g)}function Ke(){if(!(!s.entradaFlotante||!a.size))for(let g of a)o()<Hs&&(u[g]=!u[g],c.ponerEntrada(g,u[g]))}function je(g,I){if(r.has(g)){if(!s.entradaFlotante)return 0;let B=d.has(g)?d.get(g):1+3*o(),E=Math.max(0,Math.min(5,B+se()*Ks));return d.set(g,E),E}return s.ruidoADC?I+se()*Ls:I}function se(){return Math.sqrt(-2*Math.log(1-o()))*Math.cos(2*Math.PI*o())}function ie(g){let I=g.tipo+"|"+g.componente;return et.has(I)?!1:(et.add(I),X.push(g),Tt.push(g),!0)}function oe(g){for(let I=0;I<4;I++){let B=m.get(g);if(B)return B;h.ponerPines(R.get(g));let E=null;try{E=h.resolver()}catch{E=null}if(S++,!E||!E.convergio)return ie({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;m.set(g,E);let v=!1;for(let K of[...h.fallasFijas,..._e(E,s)])ie(K)&&K.tipo==="led_quemado"&&(q.add(K.componente),v=!0);if(!v)return E;lt()}return m.get(g)||null}function Ge(){ee();let g=A;if(f&&f.ciclo>L.inicio){g=f.tiempos;let W=new Map;for(let[ot,At]of A){let ae=At-(f.tiempos.get(ot)||0);ae>0&&W.set(ot,ae)}A=W,L={inicio:f.ciclo,clave:L.clave}}else A=new Map,L={inicio:c.ciclos,clave:_};f=null;let I=[...g].filter(([,W])=>W>0);I.length||(I=b.length?b:[[_,1]]),b=I;let B=I.reduce((W,[,ot])=>W+ot,0),E=[];for(let[W,ot]of I){let At=oe(W);if(!At){E.length=0;break}E.push([At,ot/B])}C=E.length?$s(E):null,C&&(C.pwm=js(I,B)),ne();let v=c.estados(),K=x.length?D.decode(Uint8Array.from(x),{stream:!0}):"";x=[];let it=Tt;return Tt=[],{msSimulados:yt(),evaluaciones:S,leds:Object.fromEntries((C?C.leds:[]).map(W=>[W.id,W.brillo])),quemados:[...q],voltajes:$e(),entradas:qe(),placa:{led13:v.D13===k.High,ledTX:yt()<P},serial:K,fallas:it,medicion:C}}function $e(){if(!C)return{};if(!l.size)return C.voltajes;let g={...C.voltajes};for(let I of l)I in g&&(g[I]=null);return g}function qe(){let g={};for(let I of Oe)a.has(I)?g[I]={alto:!!s.entradaFlotante&&!!u[I],alAire:!0}:I in p&&(g[I]={alto:p[I],alAire:!1});return g}function ne(g=C){g&&ve.forEach((I,B)=>{for(let E of I){let v=g.voltajes["placa."+E];if(typeof v=="number")return c.ponerAnalogico(B,v)}})}function Xe(){q.clear(),et.clear(),X.length=0,Tt=[],x=[],D=new TextDecoder("utf-8"),P=0,Ut(),lt(),st()}return Ut(),lt(),st(),{get ciclos(){return c.ciclos},avanzar:g=>c.correr(g),foto:Ge,ponerCircuito(g){T=g,lt(),st()},ponerPulsador(g,I){I?n.add(g):n.delete(g),lt(),st()},enviarSerial:g=>c.enviarSerial(String(g)),reiniciarChip(){Ut(),st()},reiniciarTodo:Xe,fallas:()=>[...X]}}function js(t,e){if(t.length<2)return{};let s={},i=new Set;for(let[a,r]of t)for(let l=0;l<a.length;l++){let u=+a[l]===k.High;s[l]=(s[l]||0)+(u?r:0),i.add(l)}let o=Gs,n={};for(let a of i){let r=s[a]/e;r>0&&r<1&&(n[o[a]]=Math.round(r*1e3)/1e3)}return n}var Gs=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"];function $s(t){if(t.length===1)return t[0][0];let e=t[0][0],s=a=>a.reduce((r,[,l])=>r+l,0),i=a=>{let r=0;for(let[l,u]of t){let d=a(l);if(d==null)return null;r+=u*d}return r},o=(a,r,l)=>[...new Set(t.flatMap(([d])=>d[a].map(p=>p[r])))].map(d=>{let p={[r]:d},c=t.filter(([h])=>h[a].some(m=>m[r]===d)),T=s(c);for(let h of l)h==="i"?p.i=t.reduce((m,[R,A])=>m+A*((R[a].find(b=>b[r]===d)||{i:0}).i||0),0):p[h]=T?c.reduce((m,[R,A])=>m+A*(R[a].find(b=>b[r]===d)[h]||0),0)/T:null;return p}),n={};for(let a of Object.keys(e.voltajes))n[a]=i(r=>r.voltajes[a]);return{convergio:t.every(([a])=>a.convergio),iteraciones:Math.max(...t.map(([a])=>a.iteraciones||0)),voltajes:n,leds:e.leds.map((a,r)=>{let l=i(u=>u.leds[r]?u.leds[r].i:0);return{id:a.id,quemado:t.some(([u])=>u.leds[r]&&u.leds[r].quemado),v:i(u=>u.leds[r]?u.leds[r].v:null),i:l,brillo:Math.max(0,Math.min(1,l*1e3/O.plenomA))}}),resistencias:e.resistencias.map((a,r)=>({id:a.id,ohmios:a.ohmios,v:i(l=>l.resistencias[r].v),i:i(l=>l.resistencias[r].i),w:i(l=>l.resistencias[r].w)})),pines:o("pines","pin",["v","i"]),fuentes:o("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((a,r)=>({id:a.id,ohmios:a.ohmios,posicion:a.posicion,v:i(l=>l.potenciometros[r].v),i:i(l=>l.potenciometros[r].i)}))}}function qs(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Xs=16,zs=8,Js=50,Zs=500,Rt=rt/1e3,V=null,St=!1,We=0,$=0,Zt=0,Ve=0,Yt=0,Qt=!1,ct=[],Ne=new MessageChannel;Ne.port1.onmessage=He;function He(){Qt=!1,Ys()}function Le(t){Qt||(Qt=!0,t>0?setTimeout(He,t):Ne.port2.postMessage(null))}function Qs(t){for(;ct.length&&t-ct[0][0]>Zs;)ct.shift();let e=0,s=0;for(let[,i,o]of ct)e+=i,s+=o;return e>0?Math.min(1,s/(e*Rt)):1}function It(t=performance.now()){Ve=t;let e=V.foto();self.postMessage({tipo:"foto",corrida:We,...e,velocidad:Qs(t),msReales:Yt})}function Ys(){if(!St||!V)return;let t=performance.now(),e=Math.max(0,t-Zt);Zt=t,Yt+=e,$=Math.min($+e*Rt,Js*Rt);let s=performance.now(),i=0;for(;$>=1&&performance.now()-s<zs;){let o=V.ciclos;V.avanzar(Math.min(Math.floor($),Rt));let n=V.ciclos-o;$-=n,i+=n}ct.push([t,e,i]),t-Ve>=Xs&&It(t),Le($>=Rt?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(We=e.corrida),e.tipo){case"crear":V=Fe({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(V.reiniciarTodo(),Yt=0),St=!0,$=0,Zt=performance.now(),ct.length=0,It(),Le(0);break;case"pausar":St=!1;break;case"reiniciar":V.reiniciarChip(),$=0,It();break;case"detener":St=!1;break;case"circuito":V.ponerCircuito(e.circuito),e.mostrar&&It();break;case"serial":V.enviarSerial(e.texto);break;case"pulsador":V.ponerPulsador(e.id,e.presionado),St||It();break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function Er(r={}){let{lienzo:t,hex:o}=r,n=r.placa||"uno";if(n!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");_r(o);let i=r.modo==="ideal"?"ideal":"realista",l=Object.fromEntries(Cn.map(_=>[_,i==="realista"]));Object.assign(l,r.noIdealidades||{});let a=typeof r.alEvento=="function"?r.alEvento:null,u={serial:[],falla:[],estado:[]},d="detenido",m=!0,w=0,b=null,$=0,P={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},y=null,x=[],M=Pn(j);M.enviar({tipo:"crear",hex:o,circuito:t.circuito(),activas:l});function j(_){if(m){if(_.tipo==="error")return console.error("TecnoCircuito:",_.mensaje);if(!(_.tipo!=="foto"||_.corrida!==w||d==="detenido")){Object.assign(P,{msSimulados:_.msSimulados,msReales:_.msReales,velocidad:_.velocidad,evaluaciones:_.evaluaciones}),y=_.medicion?{..._.medicion,voltajes:_.voltajes,entradas:_.entradas}:null;for(let N of _.fallas){x.push(N),u.falla.forEach(R=>U(R,{tipo:N.tipo,componente:N.componente,mensaje:N.mensaje}));let{mensaje:Q,...k}=N;mt("falla",k)}_.serial&&u.serial.forEach(N=>U(N,_.serial)),b=_,$||($=requestAnimationFrame(I))}}}function I(){if($=0,d==="detenido"||!b)return t._mostrar({simulando:d!=="detenido"});t._mostrar({simulando:!0,leds:b.leds,quemados:b.quemados,voltajes:b.voltajes,placa:{ledPower:!0,led13:b.placa.led13,ledTX:b.placa.ledTX}})}function U(_,N){try{_(N)}catch(Q){console.error(Q)}}function mt(_,N){a&&U(a,{t:Date.now(),origen:"simulador",tipo:_,datos:N})}function ct(_){d=_,u.estado.forEach(N=>U(N,_))}return typeof t._alPulsar=="function"&&t._alPulsar((_,N)=>{m&&M.enviar({tipo:"pulsador",id:_,presionado:N})}),t.alCambiar(_=>{m&&M.enviar({tipo:"circuito",circuito:_,mostrar:d!=="detenido",corrida:w})}),{iniciar(){if(!m||d==="corriendo")return;let _=d==="detenido";w++,_&&(x.length=0,y=null,b=null,Object.assign(P,{msSimulados:0,msReales:0,velocidad:1}),mt("simulacion_iniciada",{placa:n,modo:i})),ct("corriendo"),M.enviar({tipo:"iniciar",nuevo:_,corrida:w})},pausar(){d==="corriendo"&&(w++,M.enviar({tipo:"pausar",corrida:w}),ct("pausado"))},reiniciar(){!m||d==="detenido"||(w++,P.msSimulados=0,M.enviar({tipo:"reiniciar",corrida:w}),M.enviar({tipo:"iniciar",nuevo:!1,corrida:w}),ct("reiniciado"),ct("corriendo"))},detener(){d!=="detenido"&&(w++,M.enviar({tipo:"detener",corrida:w}),mt("simulacion_detenida",{ms_simulados:Math.round(P.msSimulados)}),ct("detenido"),y=null,I())},serialEnviar(_){d!=="detenido"&&M.enviar({tipo:"serial",texto:String(_)})},alSerial:_=>typeof _=="function"&&u.serial.push(_),alFalla:_=>typeof _=="function"&&u.falla.push(_),alEstado:_=>typeof _=="function"&&u.estado.push(_),medidas:()=>({...P,estado:d,hilo:M.hilo()}),destruir(){m&&(this.detener(),m=!1,cancelAnimationFrame($),M.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},_mediciones:()=>d==="detenido"||!y?null:{...y,fallas:[...x],modo:i,activas:l}}}function Pn(r){let t=null,o="worker",n=!1,i=[],l=u=>{if(u&&u.tipo==="listo"){n=!0,i.length=0;return}r(u)};function a(){o="pagina",t=Mn(l),i.splice(0).forEach(u=>t.postMessage(u))}try{if(!so||typeof Worker!="function")throw new Error("sin Worker");let u=URL.createObjectURL(new Blob([so],{type:"text/javascript"})),d=new Worker(u);d.onmessage=m=>{m.data&&m.data.tipo==="listo"&&URL.revokeObjectURL(u),l(m.data)},d.onerror=m=>{if(n)return console.error("TecnoCircuito:",m.message);m.preventDefault(),d.terminate(),a()},t=d}catch{a()}return{enviar(u){!n&&o==="worker"&&i.push(u),t.postMessage(u)},terminar:()=>t&&t.terminate(),hilo:()=>o}}function Mn(r){let t={onmessage:null,postMessage:o=>setTimeout(()=>r(o))};return new Function("self",so)(t),{postMessage:o=>setTimeout(()=>t.onmessage&&t.onmessage({data:o})),terminate:()=>t.onmessage=null}}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(Dt)),crearLienzo:$r,crearSimulador:Er});})();
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
