(()=>{var be=globalThis,ye=be.ShadowRoot&&(be.ShadyCSS===void 0||be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),Uo=new WeakMap,Ht=class{constructor(t,o,n){if(this._$cssResult$=!0,n!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(ye&&t===void 0){let n=o!==void 0&&o.length===1;n&&(t=Uo.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Uo.set(o,t))}return t}toString(){return this.cssText}},Bo=r=>new Ht(typeof r=="string"?r:r+"",void 0,Fe),tt=(r,...t)=>{let o=r.length===1?r[0]:t.reduce((n,i,c)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[c+1],r[0]);return new Ht(o,r,Fe)},Ho=(r,t)=>{if(ye)r.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let n=document.createElement("style"),i=be.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=o.cssText,r.appendChild(n)}},Xe=ye?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let o="";for(let n of t.cssRules)o+=n.cssText;return Bo(o)})(r):r;var{is:on,defineProperty:rn,getOwnPropertyDescriptor:nn,getOwnPropertyNames:sn,getOwnPropertySymbols:an,getPrototypeOf:cn}=Object,ve=globalThis,Fo=ve.trustedTypes,ln=Fo?Fo.emptyScript:"",pn=ve.reactiveElementPolyfillSupport,Ft=(r,t)=>r,Xt={toAttribute(r,t){switch(t){case Boolean:r=r?ln:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let o=r;switch(t){case Boolean:o=r!==null;break;case Number:o=r===null?null:Number(r);break;case Object:case Array:try{o=JSON.parse(r)}catch{o=null}}return o}},$e=(r,t)=>!on(r,t),Xo={attribute:!0,type:String,converter:Xt,reflect:!1,useDefault:!1,hasChanged:$e};Symbol.metadata??=Symbol("metadata"),ve.litPropertyMetadata??=new WeakMap;var at=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Xo){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,o);i!==void 0&&rn(this.prototype,t,i)}}static getPropertyDescriptor(t,o,n){let{get:i,set:c}=nn(this.prototype,t)??{get(){return this[o]},set(a){this[o]=a}};return{get:i,set(a){let u=i?.call(this);c?.call(this,a),this.requestUpdate(t,u,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xo}static _$Ei(){if(this.hasOwnProperty(Ft("elementProperties")))return;let t=cn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ft("properties"))){let o=this.properties,n=[...sn(o),...an(o)];for(let i of n)this.createProperty(i,o[i])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[n,i]of o)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[o,n]of this.elementProperties){let i=this._$Eu(o,n);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)o.unshift(Xe(i))}else t!==void 0&&o.push(Xe(t));return o}static _$Eu(t,o){let n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let n of o.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ho(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,n){this._$AK(t,n)}_$ET(t,o){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let c=(n.converter?.toAttribute!==void 0?n.converter:Xt).toAttribute(o,n.type);this._$Em=t,c==null?this.removeAttribute(i):this.setAttribute(i,c),this._$Em=null}}_$AK(t,o){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let c=n.getPropertyOptions(i),a=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:Xt;this._$Em=i;let u=a.fromAttribute(o,c.type);this[i]=u??this._$Ej?.get(i)??u,this._$Em=null}}requestUpdate(t,o,n,i=!1,c){if(t!==void 0){let a=this.constructor;if(i===!1&&(c=this[t]),n??=a.getPropertyOptions(t),!((n.hasChanged??$e)(c,o)||n.useDefault&&n.reflect&&c===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,n))))return;this.C(t,o,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:n,reflect:i,wrapped:c},a){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??o??this[t]),c!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(o=void 0),this._$AL.set(t,o)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,c]of this._$Ep)this[i]=c;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,c]of n){let{wrapped:a}=c,u=this[i];a!==!0||this._$AL.has(i)||u===void 0||this.C(i,void 0,c,u)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(o)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(t){}firstUpdated(t){}};at.elementStyles=[],at.shadowRootOptions={mode:"open"},at[Ft("elementProperties")]=new Map,at[Ft("finalized")]=new Map,pn?.({ReactiveElement:at}),(ve.reactiveElementVersions??=[]).push("2.1.2");var to=globalThis,Wo=r=>r,we=to.trustedTypes,Yo=we?we.createPolicy("lit-html",{createHTML:r=>r}):void 0,er="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,or="?"+gt,dn=`<${or}>`,Et=document,Yt=()=>Et.createComment(""),Kt=r=>r===null||typeof r!="object"&&typeof r!="function",eo=Array.isArray,un=r=>eo(r)||typeof r?.[Symbol.iterator]=="function",We=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ko=/-->/g,Jo=/>/g,At=RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zo=/'/g,Qo=/"/g,rr=/^(?:script|style|textarea|title)$/i,oo=r=>(t,...o)=>({_$litType$:r,strings:t,values:o}),Y=oo(1),lt=oo(2),Wn=oo(3),ct=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),tr=new WeakMap,_t=Et.createTreeWalker(Et,129);function nr(r,t){if(!eo(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yo!==void 0?Yo.createHTML(t):t}var fn=(r,t)=>{let o=r.length-1,n=[],i,c=t===2?"<svg>":t===3?"<math>":"",a=Wt;for(let u=0;u<o;u++){let d=r[u],m,w,$=-1,y=0;for(;y<d.length&&(a.lastIndex=y,w=a.exec(d),w!==null);)y=a.lastIndex,a===Wt?w[1]==="!--"?a=Ko:w[1]!==void 0?a=Jo:w[2]!==void 0?(rr.test(w[2])&&(i=RegExp("</"+w[2],"g")),a=At):w[3]!==void 0&&(a=At):a===At?w[0]===">"?(a=i??Wt,$=-1):w[1]===void 0?$=-2:($=a.lastIndex-w[2].length,m=w[1],a=w[3]===void 0?At:w[3]==='"'?Qo:Zo):a===Qo||a===Zo?a=At:a===Ko||a===Jo?a=Wt:(a=At,i=void 0);let M=a===At&&r[u+1].startsWith("/>")?" ":"";c+=a===Wt?d+dn:$>=0?(n.push(m),d.slice(0,$)+er+d.slice($)+gt+M):d+gt+($===-2?u:M)}return[nr(r,c+(r[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Jt=class r{constructor({strings:t,_$litType$:o},n){let i;this.parts=[];let c=0,a=0,u=t.length-1,d=this.parts,[m,w]=fn(t,o);if(this.el=r.createElement(m,n),_t.currentNode=this.el.content,o===2||o===3){let $=this.el.content.firstChild;$.replaceWith(...$.childNodes)}for(;(i=_t.nextNode())!==null&&d.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(let $ of i.getAttributeNames())if($.endsWith(er)){let y=w[a++],M=i.getAttribute($).split(gt),x=/([.?@])?(.*)/.exec(y);d.push({type:1,index:c,name:x[2],strings:M,ctor:x[1]==="."?Ke:x[1]==="?"?Je:x[1]==="@"?Ze:Dt}),i.removeAttribute($)}else $.startsWith(gt)&&(d.push({type:6,index:c}),i.removeAttribute($));if(rr.test(i.tagName)){let $=i.textContent.split(gt),y=$.length-1;if(y>0){i.textContent=we?we.emptyScript:"";for(let M=0;M<y;M++)i.append($[M],Yt()),_t.nextNode(),d.push({type:2,index:++c});i.append($[y],Yt())}}}else if(i.nodeType===8)if(i.data===or)d.push({type:2,index:c});else{let $=-1;for(;($=i.data.indexOf(gt,$+1))!==-1;)d.push({type:7,index:c}),$+=gt.length-1}c++}}static createElement(t,o){let n=Et.createElement("template");return n.innerHTML=t,n}};function jt(r,t,o=r,n){if(t===ct)return t;let i=n!==void 0?o._$Co?.[n]:o._$Cl,c=Kt(t)?void 0:t._$litDirective$;return i?.constructor!==c&&(i?._$AO?.(!1),c===void 0?i=void 0:(i=new c(r),i._$AT(r,o,n)),n!==void 0?(o._$Co??=[])[n]=i:o._$Cl=i),i!==void 0&&(t=jt(r,i._$AS(r,t.values),i,n)),t}var Ye=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:n}=this._$AD,i=(t?.creationScope??Et).importNode(o,!0);_t.currentNode=i;let c=_t.nextNode(),a=0,u=0,d=n[0];for(;d!==void 0;){if(a===d.index){let m;d.type===2?m=new Zt(c,c.nextSibling,this,t):d.type===1?m=new d.ctor(c,d.name,d.strings,this,t):d.type===6&&(m=new Qe(c,this,t)),this._$AV.push(m),d=n[++u]}a!==d?.index&&(c=_t.nextNode(),a++)}return _t.currentNode=Et,i}p(t){let o=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,o),o+=n.strings.length-2):n._$AI(t[o])),o++}},Zt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,n,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=jt(this,t,o),Kt(t)?t===I||t==null||t===""?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==ct&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):un(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&Kt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Et.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Jt.createElement(nr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(o);else{let c=new Ye(i,this),a=c.u(this.options);c.p(o),this.T(a),this._$AH=c}}_$AC(t){let o=tr.get(t.strings);return o===void 0&&tr.set(t.strings,o=new Jt(t)),o}k(t){eo(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,n,i=0;for(let c of t)i===o.length?o.push(n=new r(this.O(Yt()),this.O(Yt()),this,this.options)):n=o[i],n._$AI(c),i++;i<o.length&&(this._$AR(n&&n._$AB.nextSibling,i),o.length=i)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let n=Wo(t).nextSibling;Wo(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,n,i,c){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=o,this._$AM=i,this.options=c,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=I}_$AI(t,o=this,n,i){let c=this.strings,a=!1;if(c===void 0)t=jt(this,t,o,0),a=!Kt(t)||t!==this._$AH&&t!==ct,a&&(this._$AH=t);else{let u=t,d,m;for(t=c[0],d=0;d<c.length-1;d++)m=jt(this,u[n+d],o,d),m===ct&&(m=this._$AH[d]),a||=!Kt(m)||m!==this._$AH[d],m===I?t=I:t!==I&&(t+=(m??"")+c[d+1]),this._$AH[d]=m}a&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ke=class extends Dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}},Je=class extends Dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}},Ze=class extends Dt{constructor(t,o,n,i,c){super(t,o,n,i,c),this.type=5}_$AI(t,o=this){if((t=jt(this,t,o,0)??I)===ct)return;let n=this._$AH,i=t===I&&n!==I||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,c=t!==I&&(n===I||i);i&&this.element.removeEventListener(this.name,this,n),c&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Qe=class{constructor(t,o,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){jt(this,t)}};var hn=to.litHtmlPolyfillSupport;hn?.(Jt,Zt),(to.litHtmlVersions??=[]).push("3.3.3");var sr=(r,t,o)=>{let n=o?.renderBefore??t,i=n._$litPart$;if(i===void 0){let c=o?.renderBefore??null;n._$litPart$=i=new Zt(t.insertBefore(Yt(),c),c,void 0,o??{})}return i._$AI(r),i};var ro=globalThis,q=class extends at{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=sr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ct}};q._$litElement$=!0,q.finalized=!0,ro.litElementHydrateSupport?.({LitElement:q});var mn=ro.litElementPolyfillSupport;mn?.({LitElement:q});(ro.litElementVersions??=[]).push("4.2.2");var st=r=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var gn={attribute:!0,type:String,converter:Xt,reflect:!1,hasChanged:$e},xn=(r=gn,t,o)=>{let{kind:n,metadata:i}=o,c=globalThis.litPropertyMetadata.get(i);if(c===void 0&&globalThis.litPropertyMetadata.set(i,c=new Map),n==="setter"&&((r=Object.create(r)).wrapped=!0),c.set(o.name,r),n==="accessor"){let{name:a}=o;return{set(u){let d=t.get.call(this);t.set.call(this,u),this.requestUpdate(a,d,r,!0,u)},init(u){return u!==void 0&&this.C(a,void 0,r,u),u}}}if(n==="setter"){let{name:a}=o;return function(u){let d=this[a];t.call(this,u),this.requestUpdate(a,d,r,!0,u)}}throw Error("Unsupported decorator location: "+n)};function D(r){return(t,o)=>typeof o=="object"?xn(r,t,o):((n,i,c)=>{let a=i.hasOwnProperty(c);return i.constructor.createProperty(c,n),a?Object.getOwnPropertyDescriptor(i,c):void 0})(r,t,o)}var St=(r,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,o),o);function ir(r,t){return(o,n,i)=>{let c=a=>a.renderRoot?.querySelector(r)??null;if(t){let{get:a,set:u}=typeof n=="object"?o:i??(()=>{let d=Symbol();return{get(){return this[d]},set(m){this[d]=m}}})();return St(o,n,{get(){let d=a.call(this);return d===void 0&&(d=c(this),(d!==null||this.hasUpdated)&&u.call(this,d)),d}})}return St(o,n,{get(){return c(this)}})}}var ar=lt`
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
`;var et=r=>({type:"analog",channel:r}),Qt=(r,t=0)=>({type:"i2c",signal:r,bus:t}),te=(r,t=0)=>({type:"spi",signal:r,bus:t}),no=(r,t=0)=>({type:"usart",signal:r,bus:t});var Nt=[" ","Spacebar"];function bn(){return typeof navigator=="object"?navigator.userAgent:""}function yn(){return bn().indexOf("Macintosh")>=0}function cr(r){return yn()?r.metaKey:r.ctrlKey}var Ct=function(r,t,o,n){var i=arguments.length,c=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(c=(i<3?a(c):i>3?a(t,o,c):a(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},xt=class extends q{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[et(5),Qt("SCL")]},{name:"A4.2",x:97,y:9,signals:[et(4),Qt("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[te("SCK")]},{name:"12",x:134.5,y:9,signals:[te("MISO")]},{name:"11",x:144,y:9,signals:[te("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[te("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[no("TX")]},{name:"0",x:255.5,y:9,signals:[no("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[et(0)]},{name:"A1",x:217.5,y:191.5,signals:[et(1)]},{name:"A2",x:227,y:191.5,signals:[et(2)]},{name:"A3",x:236.5,y:191.5,signals:[et(3)]},{name:"A4",x:246,y:191.5,signals:[et(4),Qt("SDA")]},{name:"A5",x:255.5,y:191.5,signals:[et(5),Qt("SCL")]}]}static get styles(){return tt`
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
    `}render(){let{ledPower:t,led13:o,ledRX:n,ledTX:i}=this;return Y`
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

        ${ar}

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
          @keydown=${c=>Nt.includes(c.key)&&this.down()}
          @keyup=${c=>Nt.includes(c.key)&&this.up()}
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
          ${o&&lt`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
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
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};Ct([D()],xt.prototype,"led13",void 0);Ct([D()],xt.prototype,"ledRX",void 0);Ct([D()],xt.prototype,"ledTX",void 0);Ct([D()],xt.prototype,"ledPower",void 0);Ct([D()],xt.prototype,"resetPressed",void 0);Ct([ir("#reset-button")],xt.prototype,"resetButton",void 0);xt=Ct([st("wokwi-arduino-uno")],xt);var lr=function(r,t,o,n){var i=arguments.length,c=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(c=(i<3?a(c):i>3?a(t,o,c):a(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},so={[-2]:"#C3C7C0",[-1]:"#F1D863",0:"#000000",1:"#8F4814",2:"#FB0000",3:"#FC9700",4:"#FCF800",5:"#00B800",6:"#0000FF",7:"#A803D6",8:"#808080",9:"#FCFCFC"},io=class extends q{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:5.65,signals:[]},{name:"2",x:58.8,y:5.65,signals:[]}]}static get styles(){return tt`
      :host {
        display: flex;
      }
    `}breakValue(t){let o=t>=1e10?9:t>=1e9?8:t>=1e8?7:t>=1e7?6:t>=1e6?5:t>=1e5?4:t>=1e4?3:t>=1e3?2:t>=100?1:t>=10?0:t>=1?-1:-2,n=Math.round(t/10**o);return t===0?[0,0]:[Math.round(n%100),o]}render(){let{value:t}=this,o=parseFloat(t),[n,i]=this.breakValue(o),c=so[Math.floor(n/10)],a=so[n%10],u=so[i];return Y`
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

          <path d="m6 0.29411v2.4117h0.96v-2.4117z" fill="${a}" />
          <path d="m7.8 0.29411v2.4117h0.96v-2.4117z" fill="${u}" />

          <rect x="10.69" y="0" width="1" height="3" fill="#F1D863" clip-path="url(#g)" />
          <clippath id="g">
            <use xlink:href="#body" />
          </clippath>
        </g>
      </svg>
    `}};lr([D()],io.prototype,"value",void 0);io=lr([st("wokwi-resistor")],io);var Mt=function(r,t,o,n){var i=arguments.length,c=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(c=(i<3?a(c):i>3?a(t,o,c):a(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},vn={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff",purple:"#ff80ff"},bt=class extends q{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.flip=!1}get pinInfo(){let t=this.flip?15:25,o=this.flip?25:15;return[{name:"A",x:t,y:42,signals:[],description:"Anode"},{name:"C",x:o,y:42,signals:[],description:"Cathode"}]}static get styles(){return tt`
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
    `}update(t){t.has("flip")&&this.dispatchEvent(new CustomEvent("pininfo-change")),super.update(t)}renderSVG(){let{color:t,lightColor:o,flip:n}=this,i=o||vn[t?.toLowerCase()]||t,c=this.brightness?.3+this.brightness*.7:0,a=this.value&&this.brightness>Number.EPSILON;return Y`<svg
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
    </svg> `}render(){return Y`
      <div class="led-container">
        ${this.renderSVG()}
        <span class="led-label">${this.label}</span>
      </div>
    `}};Mt([D()],bt.prototype,"value",void 0);Mt([D()],bt.prototype,"brightness",void 0);Mt([D()],bt.prototype,"color",void 0);Mt([D()],bt.prototype,"lightColor",void 0);Mt([D()],bt.prototype,"label",void 0);Mt([D({type:Boolean})],bt.prototype,"flip",void 0);bt=Mt([st("wokwi-led")],bt);var pr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},dr=r=>(...t)=>({_$litDirective$:r,values:t}),Ae=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,n){this._$Ct=t,this._$AM=o,this._$Ci=n}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var ur="important",$n=" !"+ur,fr=dr(class extends Ae{constructor(r){if(super(r),r.type!==pr.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,o)=>{let n=r[o];return n==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(r,[t]){let{style:o}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?o.removeProperty(n):o[n]=null);for(let n in t){let i=t[n];if(i!=null){this.ft.add(n);let c=typeof i=="string"&&i.endsWith($n);n.includes("-")||c?o.setProperty(n,c?i.slice(0,-11):i,c?ur:""):o[n]=i}}return ct}});var _e=(r,t,o)=>{let n=Math.min(o,t);return Math.max(n,r)};function hr(r,t){let o=t.transformPoint({x:r.left,y:r.top}),n=t.transformPoint({x:r.right,y:r.top}),i=t.transformPoint({x:r.left,y:r.bottom}),c=t.transformPoint({x:r.right,y:r.bottom}),a=Math.min(o.x,n.x,i.x,c.x),u=Math.min(o.y,n.y,i.y,c.y),d=Math.max(o.x,n.x,i.x,c.x),m=Math.max(o.y,n.y,i.y,c.y);return new DOMRect(a,u,d-a,m-u)}function mr(r,t,o){let{userAgent:n}=navigator;if(n.indexOf("Epiphany")>=0||n.indexOf("Safari")>=0){let c=r.getCTM(),a=t?.getCTM(),u=t?.getBoundingClientRect(),d=t?.ownerSVGElement?.getBoundingClientRect();if(!u||!d||!a||!c)return null;let m=d.x+d.width/2,w=d.y+d.height/2,$=m-(u.x+u.width/2),y=w-(u.y+u.height/2),M=Math.atan2(y,$)/Math.PI*180,x=new DOMMatrix().rotate(M),b=hr(o,x),T=b.width/u.width,R=b.height/u.height,G=a.inverse().multiply(c);return x.inverse().translate(b.left,b.top).multiply(G.inverse()).scale(T,R).translate(-u.left,-u.top)}else return r.getScreenCTM()?.inverse()||null}var kt=function(r,t,o,n){var i=arguments.length,c=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(c=(i<3?a(c):i>3?a(t,o,c):a(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},Ee={x:9.91,y:8.18},yt=class extends q{constructor(){super(...arguments),this.min=0,this.max=1023,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.pressed=!1,this.pageToKnobMatrix=null,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:39,y:68.5,number:2,signals:[et(0)]},{name:"VCC",x:49,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return tt`
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
    `}mapToMinMax(t,o,n){return t*(n-o)+o}percentFromMinMax(t,o,n){return(t-o)/(n-o)}renderSVG(){let t=_e(0,1,this.percentFromMinMax(this.value,this.min,this.max)),o=(this.endDegree-this.startDegree)*t+this.startDegree;return Y`<svg
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
      style=${fr({"--knob-angle":o+"deg"})}
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
        cx=${Ee.x}
        cy=${Ee.y}
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
    `}focusInput(){this.shadowRoot?.querySelector(".hide-input")?.focus()}onValueChange(t){let o=t.target;this.updateValue(parseFloat(o.value))}down(t){(t.button===0||window.navigator.maxTouchPoints)&&(this.pressed=!0,t.stopPropagation(),t.preventDefault(),this.updateKnobMatrix())}move(t){let{pressed:o}=this;o&&this.rotateHandler(t)}up(){this.pressed=!1}updateKnobMatrix(){let t=this.shadowRoot?.querySelector("#knob"),o=this.shadowRoot?.querySelector("#firefox-workaround");this.pageToKnobMatrix=t&&o?mr(t,o,new DOMRect(0,9.5,1,1)):null}rotateHandler(t){if(t.stopPropagation(),t.preventDefault(),!this.pageToKnobMatrix)return;let o=t.type==="touchmove",n=o?t.touches[0].pageX:t.pageX,i=o?t.touches[0].pageY:t.pageY,c=new DOMPointReadOnly(n,i).matrixTransform(this.pageToKnobMatrix),a=Ee.x-c.x,u=Ee.y-c.y,d=Math.round(Math.atan2(u,a)*180/Math.PI);d<0&&(d+=360),d-=90,a>0&&u<=0&&d>0&&(d-=360),d=_e(this.startDegree,this.endDegree,d);let m=this.percentFromMinMax(d,this.startDegree,this.endDegree),w=this.mapToMinMax(m,this.min,this.max);this.updateValue(w)}updateValue(t){let o=_e(this.min,this.max,t),n=Math.round(o/this.step)*this.step;this.value=Math.round(n*100)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};kt([D({type:Number})],yt.prototype,"min",void 0);kt([D({type:Number})],yt.prototype,"max",void 0);kt([D()],yt.prototype,"value",void 0);kt([D()],yt.prototype,"step",void 0);kt([D()],yt.prototype,"startDegree",void 0);kt([D()],yt.prototype,"endDegree",void 0);yt=kt([st("wokwi-potentiometer")],yt);var ee=function(r,t,o,n){var i=arguments.length,c=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(r,t,o,n);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(c=(i<3?a(c):i>3?a(t,o,c):a(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},ao,Tt=class extends q{static{ao=this}static{this.pushbuttonCounter=0}constructor(){super(),this.color="red",this.pressed=!1,this.label="",this.xray=!1,this.sticky=!1,this.pinInfo=[{name:"1.l",x:0,y:13,signals:[]},{name:"2.l",x:0,y:32,signals:[]},{name:"1.r",x:67,y:13,signals:[]},{name:"2.r",x:67,y:32,signals:[]}],this.uniqueId="pushbutton"+ao.pushbuttonCounter++}static get styles(){return tt`
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
    `}renderSVG(){let{color:t,uniqueId:o,xray:n}=this,i=this.pressed?`url(#grad-down-${o})`:`url(#grad-up-${o})`;return Y`<svg
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
    </svg>`}render(){let{color:t,label:o}=this;return Y`
      <button
        aria-label="${o} ${t} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @pointerleave=${this.leave}
        @keydown=${n=>Nt.includes(n.key)&&this.down()}
        @keyup=${n=>Nt.includes(n.key)&&this.up(n)}
      >
        ${this.renderSVG()}
      </button>
      <span class="label">${this.label}</span>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(t){this.pressed&&(cr(t)?this.sticky=!0:(this.sticky=!1,this.pressed=!1,this.dispatchEvent(new Event("button-release"))))}leave(t){this.sticky||this.up(t)}};ee([D()],Tt.prototype,"color",void 0);ee([D()],Tt.prototype,"pressed",void 0);ee([D()],Tt.prototype,"label",void 0);ee([D({type:Boolean,attribute:"xray"})],Tt.prototype,"xray",void 0);Tt=ao=ee([st("wokwi-pushbutton")],Tt);var gr=`:host {
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
`;var Pt={sg90:{nombre:"SG90",engranajes:"pl\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:200,arranque:650},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}};var N=9.6/2.54,z=57.6,Se=14.4,xr={x:Se,ancho:32.2*N},ot={x:Se+(32.2-22.2)/2*N,ancho:22.2*N,alto:11.8*N},Lt={x:ot.x+5.9*N,y:z},co=13.5*N,zt=182.4,Me={ancho:201.6,alto:86.4},Ce={GND:{x:zt,y:z-9.6,color:"#7a4a24"},VCC:{x:zt,y:z,color:"#d7263d"},SIG:{x:zt,y:z+9.6,color:"#f28c28"}},S=r=>Math.round(r*100)/100,lo=r=>`rotate(${S(-r)} ${S(Lt.x)} ${S(Lt.y)})`;function po(r="sg90",t=90){let o=Pt[r]||Pt.sg90,{ancho:n,alto:i}=Me,c=z-ot.alto/2,a=S(Lt.x),u=ot.x+ot.ancho,d=r==="sg90",m=Object.values(Ce).map((y,M)=>{let x=z-4+M*4;return`<path d="M${S(u)} ${S(x)} C ${S(u+26)} ${S(x)}, ${S(zt-34)} ${S(y.y)}, ${S(zt-9)} ${S(y.y)}" fill="none" stroke="${y.color}" stroke-width="2.6" stroke-linecap="round"/>`}).join(""),w=Object.values(Ce).map(y=>`<rect x="${S(y.x-2.2)}" y="${S(y.y-2.2)}" width="4.4" height="4.4" fill="#8a8a8a"/>`).join(""),$=d?`<circle cx="${S(ot.x+15*N)}" cy="${z}" r="${S(3.6*N)}" fill="#ffffff" fill-opacity="0.18"/><circle cx="${S(ot.x+9.5*N)}" cy="${S(z+2.2*N)}" r="${S(2.2*N)}" fill="#ffffff" fill-opacity="0.14"/>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${i}" viewBox="0 0 ${n} ${i}"><title>Servo ${o.nombre}</title>`+m+`<rect x="${S(zt-9)}" y="${S(z-15.6)}" width="16" height="31.2" rx="1.5" fill="#222222"/>`+w+`<rect x="${S(xr.x)}" y="${S(c+1.5)}" width="${S(xr.ancho)}" height="${S(ot.alto-3)}" rx="3" fill="${o.cuerpo}" fill-opacity="${d?.75:1}" stroke="${o.borde}" stroke-width="1"/><circle cx="${S(Se+2.4*N)}" cy="${z}" r="${S(1*N)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><circle cx="${S(Se+(32.2-2.4)*N)}" cy="${z}" r="${S(1*N)}" fill="#ffffff" stroke="${o.borde}" stroke-width="0.8"/><rect x="${S(ot.x)}" y="${S(c)}" width="${S(ot.ancho)}" height="${S(ot.alto)}" rx="2.5" fill="${o.cuerpo}" fill-opacity="${d?.85:1}" stroke="${o.borde}" stroke-width="1.2"/>`+$+`<text x="${S(ot.x+15.5*N)}" y="${S(z+4.1*N)}" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">${o.nombre}</text><circle cx="${a}" cy="${z}" r="${S(5.2*N)}" fill="${o.cuerpo}" stroke="${o.borde}" stroke-width="1.2"/><g data-brazo="1" transform="${lo(t)}"><path d="M${a} ${S(z-3.2*N/2-1)} L${S(Lt.x+co)} ${S(z-1.1*N)} A ${S(1.1*N)} ${S(1.1*N)} 0 0 1 ${S(Lt.x+co)} ${S(z+1.1*N)} L${a} ${S(z+3.2*N/2+1)} Z" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/><circle cx="${a}" cy="${z}" r="${S(3.4*N)}" fill="#f7f7f5" stroke="#9aa0a6" stroke-width="1"/>`+[.45,.65,.85].map(y=>`<circle cx="${S(Lt.x+co*y)}" cy="${z}" r="1.4" fill="#b8bcc2"/>`).join("")+`<circle cx="${a}" cy="${z}" r="${S(1.3*N)}" fill="${o.eje}" stroke="#7d8288" stroke-width="0.8"/></g></svg>`}var It={negro:"#2b2b2b",marron:"#8b5a2b",rojo:"#d7263d",naranja:"#f28c28",amarillo:"#e8c20c",verde:"#2e9e44",azul:"#2f6fde",morado:"#8e44ad",gris:"#9aa0a6",blanco:"#f4f4f4"},uo=Object.keys(It),br={marron:"marr\xF3n",morado:"violeta"};function fo(r,t){let o=[r,t];return o.some(n=>/^placa\.GND/.test(n)||/^protoboard\.[si]-/.test(n))?"negro":o.some(n=>/^placa\.(5V|3V3|VIN)$/.test(n)||/^protoboard\.[si]\+/.test(n))?"rojo":"verde"}var An=["3","5","6","9","10","11"],Vt={uno:{nombre:"Arduino Uno",etiqueta:"wokwi-arduino-uno",nombrePin(r){return/^\d+$/.test(r)?"D"+r:r.startsWith("GND.")?"GND"+r.slice(4):{"3.3V":"3V3","A4.2":"SDA","A5.2":"SCL"}[r]||r},rotulo(r){return r==="D0"?"Pin 0 \xB7 RX del monitor serial":r==="D1"?"Pin 1 \xB7 TX del monitor serial":/^D\d+$/.test(r)?"Pin "+r.slice(1)+(An.includes(r.slice(1))?" \xB7 PWM ~":""):/^A\d$/.test(r)?r+" \xB7 entrada anal\xF3gica":r.startsWith("GND")?"GND \xB7 tierra (\u2212)":{"5V":"5V \xB7 positivo (+)","3V3":"3,3V \xB7 positivo (+)",VIN:"VIN \xB7 entrada de la fuente",SDA:"SDA \xB7 I2C (es el mismo A4)",SCL:"SCL \xB7 I2C (es el mismo A5)",AREF:"AREF \xB7 referencia anal\xF3gica",IOREF:"IOREF",RESET:"RESET \xB7 reinicia la placa"}[r]||r}}},K={resistencia:{nombre:"Resistencia",etiqueta:"wokwi-resistor",prefijo:"r",props:{ohmios:220},nombrePin:r=>({1:"1",2:"2"})[r],rotulo:r=>"pata "+r,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[220,"220 \u03A9"],[330,"330 \u03A9"],[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"]]},aplicar(r,t){r.value=String(t.ohmios)}},led:{nombre:"LED",etiqueta:"wokwi-led",prefijo:"led",props:{color:"rojo"},nombrePin:r=>({A:"anodo",C:"catodo"})[r],rotulo:r=>({anodo:"\xE1nodo (+), pata larga",catodo:"c\xE1todo (\u2212), pata corta"})[r]||r,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["amarillo","Amarillo"],["azul","Azul"],["blanco","Blanco"]]},aplicar(r,t){r.color={rojo:"red",verde:"green",amarillo:"yellow",azul:"blue",blanco:"white"}[t.color]||"red"}},pulsador:{nombre:"Bot\xF3n",etiqueta:"wokwi-pushbutton",prefijo:"btn",props:{color:"rojo"},nombrePin:r=>({"1.l":"1i","1.r":"1d","2.l":"2i","2.r":"2d"})[r],rotulo:r=>({"1i":"pata 1 \xB7 unida por dentro con la otra pata 1","1d":"pata 1 \xB7 unida por dentro con la otra pata 1","2i":"pata 2 \xB7 unida por dentro con la otra pata 2","2d":"pata 2 \xB7 unida por dentro con la otra pata 2"})[r]||r,campo:{prop:"color",etiqueta:"Color",opciones:[["rojo","Rojo"],["verde","Verde"],["azul","Azul"],["amarillo","Amarillo"],["blanco","Blanco"],["negro","Negro"]]},aplicar(r,t){r.color={rojo:"red",verde:"green",azul:"blue",amarillo:"yellow",blanco:"white",negro:"black"}[t.color]||"red"}},servo:{nombre:"Servo",prefijo:"servo",props:{modelo:"sg90"},dibujo:{ancho:Me.ancho,alto:Me.alto,pines:Ce,svg:r=>po(r.modelo,90)},rotulo:r=>({GND:"GND \xB7 cable marr\xF3n: va a tierra (\u2212)",VCC:"VCC \xB7 cable rojo: va a 5V (+)",SIG:"Se\xF1al \xB7 cable naranja: va al pin que manda los pulsos"})[r]||r,campo:{prop:"modelo",etiqueta:"Modelo",opciones:Object.entries(Pt).map(([r,t])=>[r,`${t.nombre} (engranajes de ${t.engranajes})`])},aplicar(r,t){let o=new DOMParser().parseFromString(po(t.modelo,90),"image/svg+xml").documentElement;r.replaceChildren(...[...o.childNodes].map(n=>r.ownerDocument.importNode(n,!0)))},mostrar(r,t){let o=r.querySelector("[data-brazo]");o&&o.setAttribute("transform",lo(t&&typeof t.angulo=="number"?t.angulo:90))}},potenciometro:{nombre:"Potenci\xF3metro",etiqueta:"wokwi-potentiometer",prefijo:"pot",props:{ohmios:1e4,posicion:.5},nombrePin:r=>({GND:"GND",SIG:"SIG",VCC:"VCC"})[r],rotulo:r=>({GND:"GND \xB7 va a tierra (\u2212)",SIG:"SIG \xB7 pata del medio: la se\xF1al",VCC:"VCC \xB7 va a 5V (+)"})[r]||r,campo:{prop:"ohmios",etiqueta:"Valor",opciones:[[1e3,"1 k\u03A9"],[1e4,"10 k\u03A9"],[1e5,"100 k\u03A9"]]},perilla:{prop:"posicion",etiqueta:"Perilla"},aplicar(r,t){r.min=0,r.max=100,r.value=Math.round((Number(t.posicion)||0)*100)}}};var ke=["a","b","c","d","e"],yr=["f","g","h","i","j"],U={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},vr=[["s+","superior","+"],["s-","superior","\u2212"],["i-","inferior","\u2212"],["i+","inferior","+"]],pt={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},oe=r=>14.4+(r-1)*9.6,_n=r=>r>=2&&(r-1)%6!==0,ho=new Map;function re(r="media"){if(ho.has(r))return ho.get(r);let t=pt[r]||pt.media,o=[];ho.set(r,o);for(let n=1;n<=t.columnas;n++){for(let i of ke)o.push({nombre:i+n,x:oe(n),y:U[i],tira:"arriba"+n});for(let i of yr)o.push({nombre:i+n,x:oe(n),y:U[i],tira:"abajo"+n});for(let[i]of vr)_n(n)&&o.push({nombre:i+n,x:oe(n),y:U[i],tira:i})}return o}var mo=new Map;function $r(r="media"){if(mo.has(r))return mo.get(r);let t=new Map;mo.set(r,t);for(let o of re(r))t.has(o.tira)||t.set(o.tira,[]),t.get(o.tira).push(o.nombre);return t}function go(r){let t=/^([si][+-])\d+$/.exec(r);if(t)return t[1];let o=/^([a-j])(\d+)$/.exec(r);return o?(ke.includes(o[1])?"arriba":"abajo")+o[2]:null}function wr(r){let t=/^([si])([+-])(\d+)$/.exec(r);if(t){let c=t[1]==="s"?"de arriba":"de abajo";return`Protoboard: riel ${t[2]==="+"?"+":"\u2212"} ${c} \xB7 todo el riel est\xE1 unido`}let o=/^([a-j])(\d+)$/.exec(r);if(!o)return"Protoboard";let[n,i]=ke.includes(o[1])?["a","e"]:["f","j"];return`Protoboard: hueco ${o[1]}${o[2]} \xB7 unido por dentro con ${n}${o[2]}\u2013${i}${o[2]}`}function Ar(r="media"){let t=pt[r]||pt.media,{ancho:o,alto:n,columnas:i}=t,c=[];c.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${n}" viewBox="0 0 ${o} ${n}">`),c.push(`<rect x="0.5" y="0.5" width="${o-1}" height="${n-1}" rx="4" fill="#f4f3ee" stroke="#cdc9bd"/>`),c.push(`<rect x="2" y="${(U.e+U.f)/2-4}" width="${o-4}" height="8" fill="#e2dfd4"/>`);let a=(d,m)=>c.push(`<line x1="${14.4-6}" y1="${d}" x2="${o-14.4+6}" y2="${d}" stroke="${m}" stroke-width="1.2"/>`);a(U["s+"]-5.5,"#d7263d"),a(U["s-"]+5.5,"#2f6fde"),a(U["i-"]-5.5,"#2f6fde"),a(U["i+"]+5.5,"#d7263d");let u=(d,m,w,$="#8a867a",y=5.5)=>c.push(`<text x="${d}" y="${m}" font-family="sans-serif" font-size="${y}" font-weight="700" fill="${$}" text-anchor="middle">${w}</text>`);for(let[d,,m]of vr){let w=m==="+"?"#d7263d":"#2f6fde";u(5.2,U[d]+2.2,m,w,7),u(o-5.2,U[d]+2.2,m,w,7)}for(let d=1;d<=i;d++)(d===1||d%5===0)&&(u(oe(d),U.a-6.2,d),u(oe(d),U.j+10.4,d));for(let d of[...ke,...yr])u(5.2,U[d]+2,d),u(o-5.2,U[d]+2,d);for(let d of re(r))c.push(`<rect x="${(d.x-1.7).toFixed(2)}" y="${(d.y-1.7).toFixed(2)}" width="3.4" height="3.4" rx="0.7" fill="#3d3b36"/>`);return c.push("</svg>"),c.join("")}function _r(r,{tipo:t="media",ocupados:o=new Set,tolerancia:n=3.5}={}){if(!r.length)return null;let i=re(t),c=($,y)=>{let M=null,x=1/0;for(let b of i){let T=Math.hypot(b.x-$,b.y-y);T<x&&(x=T,M=b)}return{hueco:M,distancia:x}},a=c(r[0].x,r[0].y);if(a.distancia>9.6)return null;let u=a.hueco.x-r[0].x,d=a.hueco.y-r[0].y,m={},w=new Set;for(let $ of r){let{hueco:y,distancia:M}=c($.x+u,$.y+d);if(M>n||o.has(y.nombre)||w.has(y.nombre))return null;m[$.nombre]=y.nombre,w.add(y.nombre)}return{dx:u,dy:d,en:m}}var En=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Er(r,{presionados:t=new Set,conduccion:o=!1}={}){let n=new Map,i=a=>{for(n.has(a)||n.set(a,a);n.get(a)!==a;)n.set(a,n.get(n.get(a))),a=n.get(a);return a},c=(a,u)=>n.set(i(a),i(u));for(let a of En)a.forEach(u=>c("placa."+a[0],"placa."+u));for(let a of r.cables)c(a.de,a.a);if(r.protoboard){for(let a of $r(r.protoboard.tipo).values())a.forEach(u=>c("protoboard."+a[0],"protoboard."+u));for(let a of r.componentes)if(a.en)for(let[u,d]of Object.entries(a.en))c(a.id+"."+u,d)}for(let a of r.componentes)a.tipo==="pulsador"?(c(a.id+".1i",a.id+".1d"),c(a.id+".2i",a.id+".2d"),t.has(a.id)&&c(a.id+".1i",a.id+".2i")):o&&a.tipo==="resistencia"?c(a.id+".1",a.id+".2"):o&&a.tipo==="potenciometro"&&(c(a.id+".GND",a.id+".SIG"),c(a.id+".SIG",a.id+".VCC"));return i}var Cr=[{ref:"J1",valor:"Power",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d71773",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{IOREF:"2",RESET:"3","3V3":"4","5V":"5",GND2:"6",GND3:"7",VIN:"8"}},{ref:"J2",valor:"Digital/PWM",parte:"Conn_01x10",uuid:"00000000-0000-0000-0000-000056d72368",huella:"Connector_PinSocket_2.54mm:PinSocket_1x10_P2.54mm_Vertical",pines:{SCL:"1",SDA:"2",AREF:"3",GND1:"4",D13:"5",D12:"6",D11:"7",D10:"8",D9:"9",D8:"10"}},{ref:"J3",valor:"Analog",parte:"Conn_01x06",uuid:"00000000-0000-0000-0000-000056d72f1c",huella:"Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical",pines:{A0:"1",A1:"2",A2:"3",A3:"4",A4:"5",A5:"6"}},{ref:"J4",valor:"Digital/PWM",parte:"Conn_01x08",uuid:"00000000-0000-0000-0000-000056d734d0",huella:"Connector_PinSocket_2.54mm:PinSocket_1x08_P2.54mm_Vertical",pines:{D7:"1",D6:"2",D5:"3",D4:"4",D3:"5",D2:"6",D1:"7",D0:"8"}}],Sn=Object.fromEntries(Cr.flatMap(r=>Object.entries(r.pines).map(([t,o])=>[t,{ref:r.ref,pad:o}]))),Cn={GND1:"GND",GND2:"GND",GND3:"GND","5V":"+5V","3V3":"+3V3",SDA:"A4",SCL:"A5"},Mn=["GND","+5V","+3V3","VIN"],Sr=r=>r>=1e3?+(r/1e3).toFixed(2)+"k":String(r),Pe={resistencia:{ref:"R",lib:"Device",parte:"R",huella:"Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal",valor:r=>Sr(Number(r.ohmios)||220),pads:{1:"1",2:"2"}},led:{ref:"D",lib:"Device",parte:"LED",huella:"LED_THT:LED_D5.0mm",valor:r=>"LED "+(r.color||"rojo"),pads:{catodo:"1",anodo:"2"}},pulsador:{ref:"SW",lib:"Switch",parte:"SW_Push",huella:"Button_Switch_THT:SW_PUSH_6mm",valor:()=>"Pulsador",pads:{"1i":"1","1d":"1","2i":"2","2d":"2"}},servo:{ref:"M",lib:"Motor",parte:"Motor_Servo",huella:"Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical",valor:r=>"Servo "+(Pt[r.modelo]||Pt.sg90).nombre,pads:{SIG:"1",VCC:"2",GND:"3"}},potenciometro:{ref:"RV",lib:"Device",parte:"R_Potentiometer",huella:"Potentiometer_THT:Potentiometer_Alps_RK09K_Single_Vertical",valor:r=>Sr(Number(r.ohmios)||1e4),pads:{GND:"1",SIG:"2",VCC:"3"}}},B=r=>'"'+String(r).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"';function kn(r){let o=[2166136261,16777619,2654435769,2246822507].map(n=>{let i=n>>>0;for(let c=0;c<r.length;c++)i=Math.imul(i^r.charCodeAt(c),16777619)>>>0;return i.toString(16).padStart(8,"0")}).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20,32)}`}function Mr(r,{nombre:t="Circuito",fecha:o=new Date().toISOString().slice(0,19),herramienta:n="TecnoCircuito"}={}){let i=r.componentes.filter(x=>Pe[x.tipo]).map(x=>({...x})),c={};for(let x of i){let b=Pe[x.tipo];c[b.ref]=(c[b.ref]||0)+1,x.ref=b.ref+c[b.ref]}let a=Er(r),u=new Map,d=(x,b,T,R)=>{let G=a(x);u.has(G)||u.set(G,{pads:new Map,uno:new Set});let Q=u.get(G);Q.pads.set(b+" "+T,{ref:b,pad:T,pinUno:R}),R&&Q.uno.add(Cn[R]||R)},m=new Set(r.cables.flatMap(x=>[x.de,x.a]));for(let[x,{ref:b,pad:T}]of Object.entries(Sn))m.has("placa."+x)&&d("placa."+x,b,T,x);for(let x of i)for(let[b,T]of Object.entries(Pe[x.tipo].pads))d(x.id+"."+b,x.ref,T,null);let w=(x,b)=>x.localeCompare(b,"en",{numeric:!0}),$=[...u.values()].filter(x=>x.pads.size>=2).map(x=>{let b=[...x.pads.values()].sort((R,G)=>w(R.ref,G.ref)||w(R.pad,G.pad));return{nombre:Mn.find(R=>x.uno.has(R))||[...x.uno].sort(w)[0]||`Net-(${b[0].ref}-Pad${b[0].pad})`,pads:b}}).sort((x,b)=>w(x.nombre,b.nombre)),y=[],M=(x,b,T,R,G,Q,ut)=>y.push("		(comp",`			(ref ${B(x)})`,`			(value ${B(b)})`,`			(footprint ${B(T)})`,`			(libsource (lib ${B(R)}) (part ${B(G)}) (description ""))`,`			(property (name "TecnoCircuito") (value ${B(Q)}))`,'			(sheetpath (names "/") (tstamps "/"))',`			(tstamps ${B(ut)})`,"		)");y.push("(export",'	(version "E")',"	(design",`		(source ${B(t)})`,`		(date ${B(o)})`,`		(tool ${B(n)})`,"	)"),y.push("	(components");for(let x of Cr)M(x.ref,x.valor,x.huella,"Connector_Generic",x.parte,"placa",x.uuid);for(let x of i){let b=Pe[x.tipo];M(x.ref,b.valor(x.props||{}),b.huella,b.lib,b.parte,x.id,kn(t+"/"+x.id))}return y.push("	)","	(nets"),$.forEach((x,b)=>{y.push("		(net",`			(code ${B(b+1)})`,`			(name ${B(x.nombre)})`,'			(class "Default")');for(let T of x.pads){let R=T.pinUno?` (pinfunction ${B(T.pinUno)})`:"";y.push(`			(node (ref ${B(T.ref)}) (pin ${B(T.pad)})${R} (pintype "passive"))`)}y.push("		)")}),y.push("	)",")"),y.join(`
`)+`
`}var kr="http://www.w3.org/2000/svg",Pn="Hecho con TecnoCircuito \xB7 SENA \u2013 TecnoAcademia Tolima",On=280,Pr=5e3,Rn=4,Or=8,jn=9.6,Rr=.4,Dn=5,dt=r=>JSON.parse(JSON.stringify(r)),V=r=>Math.round(r*100)/100,ne=(r,t)=>Math.hypot(r.x-t.x,r.y-t.y),xo=r=>It[r]||(/^#[0-9a-f]{3,8}$/i.test(r||"")?r:It.verde);function Tr(r,t={}){if(!(r instanceof HTMLElement))throw new Error("crearLienzo necesita un elemento de la p\xE1gina.");let o=t.placa||"uno";if(!Vt[o])throw new Error(`Este prototipo no dibuja la placa \xAB${o}\xBB.`);let n=!!t.soloLectura,i=typeof t.alEvento=="function"?t.alEvento:null,c=[],a=Nn(t.circuito,o),u=document.createElement("div");u.className="tecnocircuito",r.appendChild(u);let d=u.attachShadow({mode:"open"});d.innerHTML=`<style>${gr}</style>
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
      <svg class="tc-capa-cables"><g transform="translate(${Pr} ${Pr})"><g class="tc-cables"></g><g class="tc-asas"></g><g class="tc-previa"><path class="tc-cable-borde"/><path class="tc-cable-linea"/></g></g></svg>
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
</div>`;let m=e=>d.querySelector(e),w=m(".tc"),$=m(".tc-barra"),y=m(".tc-menu"),M=$.querySelector('[data-accion="menu"]'),x=m(".tc-sel"),b=m(".tc-area"),T=m(".tc-mundo"),R=m(".tc-capa-comp"),G=m(".tc-capa-pines"),Q=m(".tc-cables"),ut=m(".tc-asas"),[ft,it]=m(".tc-previa").children,_=m(".tc-ayuda"),L=m(".tc-tip"),k={px:0,py:0,escala:1.5},j=new Map,vt=new Map,E=null,P=null,C=null,se=null,Oe=null,vo=!1,Re=!1,qt=!1,ie=null,je=!1,F={simulando:!1,leds:{},quemados:[],voltajes:{},placa:{},servos:{}},De=new Set,$o=[],J=e=>a.componentes.find(s=>s.id===e),ae=e=>e==="protoboard"?a.protoboard:J(e),ce=e=>e==="placa"?{x:0,y:0,rot:0}:ae(e);function Ne(e,s,l){let p=e==="placa"?Vt[o]:K[s],f=document.createElement("div");f.className="tc-comp"+(e==="placa"?" tc-placa":""),f.dataset.id=e,s&&(f.dataset.tipo=s);let h;if(p&&p.dibujo){let v=document.createElement("template");v.innerHTML=p.dibujo.svg(l),h=v.content.firstElementChild}else p?(h=document.createElement(p.etiqueta),p.aplicar&&p.aplicar(h,l),p.perilla&&h.addEventListener("input",()=>zo(e,Number(h.value)/100))):(h=document.createElement("div"),h.className="tc-desconocido",h.textContent=`\xBF${s}?`,h.title="Esta pieza es de una versi\xF3n m\xE1s nueva de TecnoCircuito.");f.appendChild(h),R.appendChild(f);let g={id:e,def:p,div:f,el:h,w:64,h:40,pines:new Map,lista:!1};return j.set(e,g),Promise.resolve(h.updateComplete).then(()=>{if(j.get(e)===g){if(p&&p.dibujo){Object.assign(g,{w:p.dibujo.ancho,h:p.dibujo.alto});for(let[v,A]of Object.entries(p.dibujo.pines)){let O=document.createElement("div");O.className="tc-pin",O.dataset.ref=`${e}.${v}`,G.appendChild(O),g.pines.set(v,{px:A.x,py:A.y,div:O})}}else if(p){Object.assign(g,Ur(h));for(let v of h.pinInfo||[]){let A=p.nombrePin(v.name);if(!A)continue;let O=document.createElement("div");O.className="tc-pin",O.dataset.ref=`${e}.${A}`,G.appendChild(O),g.pines.set(A,{px:v.x,py:v.y,div:O})}}g.lista=!0,Ot(g),Co(g)}})}function wo(){let e=a.protoboard.tipo,s=pt[e]||pt.media,l=document.createElement("div");l.className="tc-comp tc-protoboard",l.dataset.id="protoboard",l.dataset.tipo="protoboard";let p=document.createElement("template");p.innerHTML=Ar(e);let f=p.content.firstElementChild;l.appendChild(f);let h=j.get("placa");R.insertBefore(l,h?h.div.nextSibling:R.firstChild);let g={id:"protoboard",def:{protoboard:!0},div:l,el:f,w:s.ancho,h:s.alto,pines:new Map,lista:!0};for(let v of re(e)){let A=document.createElement("div");A.className="tc-pin tc-hueco",A.dataset.ref="protoboard."+v.nombre,A.style.left=v.x+"px",A.style.top=v.y+"px",l.appendChild(A),g.pines.set(v.nombre,{px:v.x,py:v.y,div:A})}return j.set("protoboard",g),Ot(g),le(),Promise.resolve()}function Vr(){if(a.protoboard)return;let e=He();a.protoboard={tipo:"media",x:Math.round(Math.max(300,e?e.x1+30:300)),y:30},wo(),Te(),X("componente_agregado",{id:"protoboard",tipo:"protoboard"}),rt({tipo:"comp",id:"protoboard"}),qt||Bt(),W()}function Te(){let e=y.querySelector('[data-accion="protoboard"]');e.disabled=!!a.protoboard,e.title=a.protoboard?"Ya hay una protoboard":""}function qr(e){let s=j.get(e.id),l=a.protoboard;return!s||!s.lista||!l||!s.pines.size?null:[...s.pines].map(([p,f])=>{let h=ze(s,e,f);return{nombre:p,x:h.x-l.x,y:h.y-l.y}})}function Ao(e){let s=new Set;for(let l of a.componentes)if(l!==e&&l.en)for(let p of Object.values(l.en))s.add(p.slice(11));return s}function _o(e){let s=qr(e);return s?_r(s,{tipo:a.protoboard.tipo,ocupados:Ao(e)}):null}function Le(e){let s=_o(e);return s?(e.x=V(e.x+s.dx),e.y=V(e.y+s.dy),e.en=Object.fromEntries(Object.entries(s.en).map(([l,p])=>[l,"protoboard."+p]))):delete e.en,Ot(j.get(e.id)),le(),mt(),!!s}let Gt=[];function Gr(e){Eo();let s=a.protoboard&&_o(e),l=j.get("protoboard");!s||!l||(Gt=Object.values(s.en).map(p=>l.pines.get(p).div),Gt.forEach(p=>p.classList.add("tc-destino")))}function Eo(){Gt.forEach(e=>e.classList.remove("tc-destino")),Gt=[]}function le(){let e=j.get("protoboard");if(!e)return;let s=Ao(null);for(let[l,p]of e.pines)p.div.classList.toggle("tc-ocupado",s.has(l))}let pe=[];function So(e){pe.forEach(g=>g.classList.remove("tc-tira")),pe=[];let s=j.get("protoboard");if(!e||!s)return;let[l,p]=de(e),f=l==="protoboard"?p:null;if(!f){let g=J(l);g&&g.en&&g.en[p]&&(f=g.en[p].slice(11))}if(!f)return;let h=go(f);for(let[g,v]of s.pines)go(g)===h&&(v.div.classList.add("tc-tira"),pe.push(v.div))}function Co(e){if(e.id==="placa")for(let s of["ledPower","led13","ledTX","ledRX"])e.el[s]=!!F.placa[s];else if(e.def===K.led){let s=Number(F.leds[e.id])||0;e.el.value=s>.005,e.el.brightness=s,e.div.classList.toggle("tc-quemado",F.quemados.includes(e.id))}else e.def&&e.def.mostrar&&e.def.mostrar(e.el,F.simulando?F.servos[e.id]:null)}function Ur(e){let s=e.shadowRoot&&e.shadowRoot.querySelector("svg"),l=s&&Dr(s.getAttribute("width")),p=s&&Dr(s.getAttribute("height"));return l&&p?{w:l,h:p}:{w:e.offsetWidth||64,h:e.offsetHeight||40}}function Ot(e){if(!e)return;let s=ce(e.id);if(s&&(Object.assign(e.div.style,{left:s.x+"px",top:s.y+"px",width:e.w+"px",height:e.h+"px",transform:s.rot?`rotate(${s.rot}deg)`:""}),e.id!=="protoboard"))for(let l of e.pines.values()){let p=ze(e,s,l);l.div.style.left=p.x+"px",l.div.style.top=p.y+"px"}}function ze(e,s,l){let p=((s.rot||0)%360+360)%360;if(!p)return{x:s.x+l.px,y:s.y+l.py};let f=p*Math.PI/180,h=Math.round(Math.cos(f)*1e9)/1e9,g=Math.round(Math.sin(f)*1e9)/1e9,v=e.w/2,A=e.h/2,O=l.px-v,H=l.py-A;return{x:V(s.x+v+O*h-H*g),y:V(s.y+A+O*g+H*h)}}function de(e){let s=e.indexOf(".");return s>0?[e.slice(0,s),e.slice(s+1)]:[e,""]}function ht(e){let[s,l]=de(e),p=j.get(s);if(!p||!p.lista)return null;let f=ce(s),h=p.pines.get(l);return h?ze(p,f,h):p.def?null:{x:f.x+p.w/2,y:f.y+p.h/2}}function Br(e){let[s,l]=de(e),p=j.get(s);return p&&p.pines.get(l)}function ue(e){let s=ht(e.de),l=ht(e.a);return!s||!l?null:[s,...(e.puntos||[]).map(([p,f])=>({x:p,y:f})),l]}function $t(e,s,l){let p=document.createElementNS(kr,e);for(let f in s)p.setAttribute(f,s[f]);return l.appendChild(p),p}function mt(){for(let[e,s]of vt)a.cables.includes(e)||(s.g.remove(),s.asas.forEach(l=>l.remove()),vt.delete(e));a.cables.forEach((e,s)=>{let l=vt.get(e);if(!l){let A=$t("g",{class:"tc-cable"},Q);l={g:A,borde:$t("path",{class:"tc-cable-borde"},A),linea:$t("path",{class:"tc-cable-linea"},A),p0:$t("circle",{class:"tc-punta",r:2.4},A),p1:$t("circle",{class:"tc-punta",r:2.4},A),toque:$t("path",{class:"tc-cable-toque"},A),asas:[]},vt.set(e,l)}let p=ue(e);if(l.g.style.display=p?"":"none",!p)return;let f=bo(p),h=xo(e.color);for(let A of[l.borde,l.linea,l.toque])A.setAttribute("d",f);l.linea.setAttribute("stroke",h),l.toque.dataset.i=s,Mo(l.p0,p[0],h),Mo(l.p1,p[p.length-1],h);let g=!!(E&&E.tipo==="cable"&&E.cable===e);l.g.classList.toggle("tc-seleccionado",g),g&&Q.lastChild!==l.g&&Q.appendChild(l.g);let v=g?(e.puntos||[]).length:0;for(;l.asas.length>v;)l.asas.pop().remove();for(;l.asas.length<v;)l.asas.push($t("circle",{class:"tc-asa",r:3.6},ut));l.asas.forEach((A,O)=>{A.setAttribute("cx",e.puntos[O][0]),A.setAttribute("cy",e.puntos[O][1]),A.dataset.i=s,A.dataset.p=O})})}function Mo(e,s,l){e.setAttribute("cx",s.x),e.setAttribute("cy",s.y),e.setAttribute("fill",l)}function Rt(){let e=P&&ht(P.de);if(!e){ft.setAttribute("d",""),it.setAttribute("d","");return}let s=P.puntos.map(g=>({...g})),l=s.length?s[s.length-1]:e,p=P.cursor?fe(P.cursor,l):l,f=P.destino&&ht(P.destino);f&&(p=f,Po(s,e,f));let h=bo([e,...s,p]);ft.setAttribute("d",h),it.setAttribute("d",h),it.setAttribute("stroke",xo(ko()))}function ko(){return P.color||fo(P.de,P.destino||"")}function fe(e,s){let l=Or/k.escala;return{x:V(Math.abs(e.x-s.x)<l?s.x:e.x),y:V(Math.abs(e.y-s.y)<l?s.y:e.y)}}function Po(e,s,l){if(!e.length)return;let p=Or/k.escala,f=e[e.length-1],h=e.length>1?e[e.length-2]:s;Math.abs(f.y-l.y)<p&&f.y!==h.y&&(f.y=l.y),Math.abs(f.x-l.x)<p&&f.x!==h.x&&(f.x=l.x)}function Hr(e){rt(null),P={de:e,puntos:[],cursor:null,destino:null,color:null},w.classList.add("tc-dibujando"),jo(e,!0),Rt(),he(),nt()}function Ie(){P&&(jo(P.de,!1),P=null,w.classList.remove("tc-dibujando"),Rt(),he(),nt())}function Oo(e){if(It[e]){if(P)P.color=e,Rt();else if(E&&E.tipo==="cable"){if(E.cable.color===e)return;E.cable.color=e,mt(),W()}else return;he()}}function Ro(e){let s=P;if(!s)return;if(e===s.de)return Ie();let l=ht(s.de),p=ht(e);if(l&&p&&Po(s.puntos,l,p),Ie(),a.cables.some(h=>h.de===s.de&&h.a===e||h.de===e&&h.a===s.de)){Qr("Esos dos pines ya est\xE1n unidos.");return}let f={de:s.de,a:e,color:s.color||fo(s.de,e)};s.puntos.length&&(f.puntos=s.puntos.map(h=>[V(h.x),V(h.y)])),a.cables.push(f),X("cable_agregado",{de:f.de,a:f.a}),rt({tipo:"cable",cable:f}),W()}function Fr(e){let s=P.puntos.length?P.puntos[P.puntos.length-1]:ht(P.de);P.puntos.push(s?fe(e,s):e),Rt(),nt()}function Xr(){!P||!P.puntos.length||(P.puntos.pop(),Rt(),nt())}function jo(e,s){let l=Br(e);l&&l.div.classList.toggle("tc-activo",s)}function Ve(e){a.cables=a.cables.filter(s=>s!==e),X("cable_quitado",{de:e.de,a:e.a})}function rt(e){E=e;for(let s of j.values())s.div.classList.toggle("tc-seleccionado",!!e&&e.tipo==="comp"&&e.id===s.id);mt(),he(),nt()}function he(){if(x.textContent="",n||!E&&!P)return;let e=l=>x.insertAdjacentHTML("beforeend",l),s=l=>uo.forEach((p,f)=>{let h=It[p],g=br[p]||p;e(`<button type="button" class="tc-muestra${l===p?" tc-activa":""}" data-accion="color" data-color="${p}" title="${f} \xB7 ${g}" aria-label="Cable ${g} (tecla ${f})" style="background:${h};color:${zn(h)}">${f}</button>`)});if(P){e('<span class="tc-etiqueta">Cable nuevo</span>'),s(ko());return}if(E.tipo==="cable")e('<span class="tc-etiqueta">Cable</span>'),s(E.cable.color);else if(E.id==="protoboard")e(`<span class="tc-etiqueta">${(pt[a.protoboard.tipo]||pt.media).nombre}</span>`);else{let l=J(E.id),p=K[l.tipo],f=j.get(l.id);if(e(`<span class="tc-etiqueta">${p?p.nombre:"Pieza desconocida"}</span>`),p&&p.campo){let h=String(l.props[p.campo.prop]),g=p.campo.opciones.map(([v,A])=>`<option value="${v}"${h===String(v)?" selected":""}>${A}</option>`).join("");e(`<label class="tc-campo">${p.campo.etiqueta} <select data-prop="${p.campo.prop}">${g}</select></label>`)}if(p&&p.perilla){let h=Math.round((Number(l.props[p.perilla.prop])||0)*100);e(`<label class="tc-campo">${p.perilla.etiqueta} <input type="range" min="0" max="100" value="${h}" data-perilla aria-label="${p.perilla.etiqueta} del potenci\xF3metro"></label>`)}if(l.tipo==="led"){let h=f&&f.el.value?" checked":"";e(`<label class="tc-check"><input type="checkbox" data-accion="encender"${h}> Ver encendido</label>`)}e('<button type="button" data-accion="girar">Girar</button>')}e('<button type="button" data-accion="borrar">Borrar</button>')}function Wr(e){let s=K[e];if(!s)return;let l=1;for(;J(s.prefijo+l);)l++;let p=s.prefijo+l,f=(b.clientWidth/2-k.px)/k.escala,h=(b.clientHeight/2-k.py)/k.escala,g=a.componentes.length%4*14,v={id:p,tipo:e,x:Math.round(f-20+g),y:Math.round(h-20+g),rot:0,props:dt(s.props)};a.componentes.push(v),Ne(p,e,v.props).then(()=>{a.protoboard&&J(p)===v&&Le(v)&&(X("componente_cambiado",{id:p,x:v.x,y:v.y,en:dt(v.en)}),W())}),X("componente_agregado",{id:p,tipo:e}),rt({tipo:"comp",id:p}),W()}function Do(){if(!E||E.tipo!=="comp"||E.id==="protoboard")return;let e=J(E.id);e.rot=((e.rot||0)+90)%360,Ot(j.get(e.id)),a.protoboard&&Le(e),mt(),X("componente_cambiado",{id:e.id,rot:e.rot,en:e.en?dt(e.en):null}),W()}function No(){if(E){if(E.tipo==="cable")Ve(E.cable);else if(E.id==="protoboard"){a.cables.filter(s=>s.de.startsWith("protoboard.")||s.a.startsWith("protoboard.")).forEach(s=>Ve(s));for(let s of a.componentes)delete s.en;a.protoboard=null;let e=j.get("protoboard");e&&(e.div.remove(),j.delete("protoboard")),pe=[],Gt=[],Te(),X("componente_quitado",{id:"protoboard",tipo:"protoboard"})}else{let e=J(E.id),s=j.get(E.id);if(a.cables.filter(l=>l.de.startsWith(e.id+".")||l.a.startsWith(e.id+".")).forEach(l=>Ve(l)),a.componentes=a.componentes.filter(l=>l!==e),s){s.div.remove();for(let l of s.pines.values())l.div.remove();j.delete(e.id)}X("componente_quitado",{id:e.id,tipo:e.tipo}),le()}xe(),rt(null),W()}}function me(e){if(y.hidden=!e,M.setAttribute("aria-expanded",String(e)),!e)return;let s=M.getBoundingClientRect(),l=w.getBoundingClientRect();y.style.left=s.left-l.left+"px",y.style.top=s.bottom-l.top+4+"px",y.querySelector("button:not([disabled])").focus()}y.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");s&&(me(!1),To(s))}),y.addEventListener("keydown",e=>{e.key==="Escape"&&(e.stopPropagation(),me(!1),M.focus())}),d.addEventListener("pointerdown",e=>{!y.hidden&&!e.target.closest(".tc-menu")&&e.target!==M&&me(!1)}),$.addEventListener("click",e=>{let s=e.target.closest("button[data-accion]");if(s){if(s.dataset.accion==="menu")return me(y.hidden);To(s)}});function To(e){let s=e.dataset.accion;if(s==="acercar")return Be(1.25);if(s==="alejar")return Be(.8);if(s==="encuadrar")return qt=!1,Bt();n||(s==="agregar"?Wr(e.dataset.tipo):s==="protoboard"?Vr():s==="girar"?Do():s==="borrar"?No():s==="color"&&(Oo(e.dataset.color),b.focus({preventScroll:!0})))}$.addEventListener("change",e=>{if(n||!E||E.tipo!=="comp")return;let s=J(E.id),l=j.get(E.id),p=K[s.tipo];if(e.target.dataset.accion==="encender"){l.el.value=e.target.checked;return}let f=e.target.dataset.prop;if(!f||!p)return;let h=typeof p.props[f]=="number"?Number(e.target.value):e.target.value;s.props={...s.props,[f]:h},p.aplicar(l.el,s.props),X("componente_cambiado",{id:s.id,props:dt(s.props)}),W()}),$.addEventListener("input",e=>{if(n||!E||E.tipo!=="comp"||!("perilla"in e.target.dataset))return;let s=j.get(E.id);zo(E.id,Number(e.target.value)/100),s&&K.potenciometro.aplicar(s.el,J(E.id).props)});function Ut(e,s,l){let p=j.get(e);if(p&&(p.el.pressed=s),s)De.add(e);else if(!De.delete(e))return;for(let f of $o)try{f(e,s)}catch(h){console.error(h)}!s&&l!==void 0&&X("boton_pulsado",{id:e,ms:Math.round(l)})}let Lo=new Map;function zo(e,s){let l=J(e),p=j.get(e);if(!l)return;let f=K[l.tipo];if(n)return p&&f.aplicar(p.el,l.props);let h=Math.max(0,Math.min(1,Math.round(s*100)/100));if(h===l.props[f.perilla.prop])return;l.props={...l.props,[f.perilla.prop]:h};let g=E&&E.tipo==="comp"&&E.id===e&&x.querySelector("[data-perilla]");g&&Number(g.value)!==Math.round(h*100)&&(g.value=Math.round(h*100)),W(),clearTimeout(Lo.get(e)),Lo.set(e,setTimeout(()=>X("componente_cambiado",{id:e,props:dt(l.props)}),400))}function qe(e){let s=b.getBoundingClientRect();return{x:(e.clientX-s.left-k.px)/k.escala,y:(e.clientY-s.top-k.py)/k.escala}}function Ge(e){try{b.setPointerCapture(e.pointerId)}catch{}}function Ue(e,s={}){C={tipo:"paneo",x0:e.clientX,y0:e.clientY,px0:k.px,py0:k.py,movido:!1,...s},Ge(e)}b.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;b.focus({preventScroll:!0}),xe();let s=e.target,l=qe(e);if(n)return Ue(e);let p=s.closest(".tc-pin");if(p){if(e.preventDefault(),P)return Ro(p.dataset.ref);Hr(p.dataset.ref),C={tipo:"pin",ref:p.dataset.ref,x0:e.clientX,y0:e.clientY,movido:!1};return}if(P)return Ue(e,{punto:l});let f=s.closest(".tc-asa");if(f)return C={tipo:"asa",cable:a.cables[+f.dataset.i],k:+f.dataset.p,x0:e.clientX,y0:e.clientY,movido:!1},Ge(e);let h=s.closest(".tc-cable-toque");if(h)return rt({tipo:"cable",cable:a.cables[+h.dataset.i]});let g=s.closest(".tc-comp");if(g&&g.dataset.id!=="placa"){let v=g.dataset.id,A=ae(v);if(A.tipo==="pulsador"&&(e.preventDefault(),F.simulando)){Ut(v,!0),C={tipo:"pulsar",id:v,x0:e.clientX,y0:e.clientY,movido:!1,desde:performance.now()};return}return rt({tipo:"comp",id:v}),K[A.tipo]&&K[A.tipo].perilla&&e.composedPath().some(Vn)?void 0:(C={tipo:"mover",id:v,dx:l.x-A.x,dy:l.y-A.y,x0:e.clientX,y0:e.clientY,movido:!1},Ge(e))}rt(null),Ue(e)}),b.addEventListener("pointermove",e=>{let s=qe(e);if(C&&C.tipo==="pulsar"&&!(e.target.closest&&e.target.closest(`.tc-comp[data-id="${C.id}"]`))){let l=C;C=null,Ut(l.id,!1,performance.now()-l.desde)}if(C){if(!C.movido&&Math.hypot(e.clientX-C.x0,e.clientY-C.y0)>Rn&&(C.movido=!0),C.movido&&C.tipo==="mover"){let l=ae(C.id),p=Math.round(s.x-C.dx),f=Math.round(s.y-C.dy);if(C.id==="protoboard")for(let h of a.componentes)h.en&&(h.x=V(h.x+p-l.x),h.y=V(h.y+f-l.y),Ot(j.get(h.id)));l.x=p,l.y=f,Ot(j.get(C.id)),C.id!=="protoboard"&&a.protoboard&&Gr(l),mt()}else if(C.movido&&C.tipo==="paneo")qt=!0,k.px=C.px0+e.clientX-C.x0,k.py=C.py0+e.clientY-C.y0,b.classList.add("tc-paneando"),ge();else if(C.movido&&C.tipo==="asa"){let l=ue(C.cable),p=fe(s,l[C.k]);p=fe(p,l[C.k+2]),C.cable.puntos[C.k]=[p.x,p.y],mt()}}if(P){let l=e.target.closest&&e.target.closest(".tc-pin");P.cursor=s,P.destino=l&&l.dataset.ref!==P.de?l.dataset.ref:null,Rt()}(!C||C.tipo==="pin")&&Zr(e.target.closest&&e.target.closest(".tc-pin"))});function Io(e){let s=C;if(C=null,b.classList.remove("tc-paneando"),!!s){if(s.tipo==="pulsar")return Ut(s.id,!1,performance.now()-s.desde);if(s.tipo==="mover"&&s.movido){let l=ae(s.id);s.id==="protoboard"?X("componente_cambiado",{id:"protoboard",x:l.x,y:l.y}):(Eo(),(a.protoboard||l.en)&&Le(l),X("componente_cambiado",{id:s.id,x:l.x,y:l.y,en:l.en?dt(l.en):null})),W()}else if(s.tipo==="asa"&&s.movido)W();else if(s.tipo==="paneo"&&!s.movido&&s.punto&&P)Fr(s.punto);else if(s.tipo==="pin"&&s.movido&&P&&e.type==="pointerup"){let l=d.elementFromPoint(e.clientX,e.clientY),p=l&&l.closest(".tc-pin");p&&p.dataset.ref!==s.ref&&Ro(p.dataset.ref)}}}b.addEventListener("pointerup",Io),b.addEventListener("pointercancel",Io),b.addEventListener("pointerleave",()=>{if(xe(),C&&C.tipo==="pulsar"){let e=C;C=null,Ut(e.id,!1,performance.now()-e.desde)}}),b.addEventListener("dblclick",e=>{if(n||P)return;let s=d.elementFromPoint(e.clientX,e.clientY)||e.target,l=s.closest(".tc-asa"),p=s.closest(".tc-cable-toque");if(l){let f=a.cables[+l.dataset.i];f.puntos.splice(+l.dataset.p,1),f.puntos.length||delete f.puntos,mt(),nt(),W()}else if(p){let f=a.cables[+p.dataset.i],h=ue(f),g=qe(e),v=0,A=g,O=1/0;for(let H=0;H<h.length-1;H++){let Z=In(g,h[H],h[H+1]);ne(g,Z)<O&&(O=ne(g,Z),v=H,A=Z)}(f.puntos=f.puntos||[]).splice(v,0,[V(A.x),V(A.y)]),rt({tipo:"cable",cable:f}),W()}}),b.addEventListener("wheel",e=>{e.preventDefault();let s=b.getBoundingClientRect(),l=Math.min(1.5,Math.max(.66,Math.exp(-e.deltaY*.0015)));Be(l,e.clientX-s.left,e.clientY-s.top)},{passive:!1}),w.addEventListener("keydown",e=>{if(e.target.closest&&e.target.closest("select, input"))return;let s=!e.ctrlKey&&!e.metaKey&&!e.altKey,l=!0;e.key==="Escape"?P?Ie():rt(null):n?l=!1:e.key==="Delete"||e.key==="Backspace"?(e.preventDefault(),P?Xr():No()):(e.key==="r"||e.key==="R")&&s?Do():/^[0-9]$/.test(e.key)&&s&&(P||E&&E.tipo==="cable")?Oo(uo[Number(e.key)]):l=!1,l&&e.stopPropagation()});function ge(){T.style.transform=`translate(${k.px}px, ${k.py}px) scale(${k.escala})`;let e=jn*k.escala;b.style.backgroundSize=`${e}px ${e}px`,b.style.backgroundPosition=`${k.px}px ${k.py}px`,xe()}function Be(e,s,l){qt=!0,s===void 0&&(s=b.clientWidth/2,l=b.clientHeight/2);let p=Math.min(Dn,Math.max(Rr,k.escala*e)),f=(s-k.px)/k.escala,h=(l-k.py)/k.escala;Object.assign(k,{escala:p,px:s-f*p,py:l-h*p}),ge()}function He(){let e=1/0,s=1/0,l=-1/0,p=-1/0,f=(h,g)=>{e=Math.min(e,h),s=Math.min(s,g),l=Math.max(l,h),p=Math.max(p,g)};for(let h of j.values()){let g=ce(h.id);if(!g)continue;let v=(g.rot||0)%180!==0,A=(v?h.h:h.w)/2,O=(v?h.w:h.h)/2;f(g.x+h.w/2-A,g.y+h.h/2-O),f(g.x+h.w/2+A,g.y+h.h/2+O)}for(let h of a.cables)for(let[g,v]of h.puntos||[])f(g,v);return isFinite(e)?{x0:e,y0:s,x1:l,y1:p}:null}function Bt(){let e=b.clientWidth,s=b.clientHeight;if(!e||!s)return!1;let l=He();if(!l)return!1;let{x0:p,y0:f,x1:h,y1:g}=l,v=48,A=Math.min((e-2*v)/(h-p||1),(s-2*v)/(g-f||1)),O=Math.min(2.4,Math.max(Rr,A));return Object.assign(k,{escala:O,px:e/2-(p+h)/2*O,py:s/2-(f+g)/2*O}),ie={ancho:e,alto:s},ge(),!0}function Yr(){let e=He()||{x0:0,y0:0,x1:100,y1:100},s=12,l=16,p=Math.max(On,Math.ceil(e.x1-e.x0+2*s)),f=Math.ceil(e.y1-e.y0+2*s)+l,h=[`<svg xmlns="${kr}" xmlns:xlink="http://www.w3.org/1999/xlink" width="${p}" height="${f}" viewBox="0 0 ${p} ${f}">`,"<title>Circuito armado en TecnoCircuito</title>",`<rect width="${p}" height="${f}" fill="#ffffff"/>`,`<g transform="translate(${V(s-e.x0)} ${V(s-e.y0)})">`];for(let g of R.children){let v=j.get(g.dataset.id);v&&v.lista&&h.push(Kr(v))}for(let g of a.cables){let v=ue(g);if(!v)continue;let A=bo(v),O=xo(g.color),H=Z=>`<circle cx="${Z.x}" cy="${Z.y}" r="2.4" fill="${O}" stroke="#000000" stroke-opacity="0.55" stroke-width="0.8"/>`;h.push(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${A}" stroke="#000000" stroke-opacity="0.42" stroke-width="4.8"/><path d="${A}" stroke="${O}" stroke-width="3"/>${H(v[0])}${H(v[v.length-1])}</g>`)}return h.push("</g>",`<text x="${p-s}" y="${f-9}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#7a7a7a">${jr(Pn)}</text>`,"</svg>"),h.join(`
`)}function Kr(e){let s=ce(e.id);if(!s)return"";let l=s.rot?`translate(${s.x+e.w/2} ${s.y+e.h/2}) rotate(${s.rot}) translate(${-e.w/2} ${-e.h/2})`:`translate(${s.x} ${s.y})`;if(!e.def){let wt=jr((J(e.id)||{}).tipo||"");return`<g transform="${l}"><rect width="${e.w}" height="${e.h}" rx="6" fill="none" stroke="#5a6673" stroke-dasharray="4 3"/><text x="${e.w/2}" y="${e.h/2+3}" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#5a6673">\xBF${wt}?</text></g>`}let p=e.el.shadowRoot?e.el.shadowRoot.querySelector("svg"):e.el.tagName&&e.el.tagName.toLowerCase()==="svg"?e.el:null;if(!p)return"";let f=p.cloneNode(!0),h=[],g=document.createTreeWalker(f,NodeFilter.SHOW_COMMENT);for(;g.nextNode();)h.push(g.currentNode);h.forEach(wt=>wt.remove());let v=/--knob-angle:\s*(-?[\d.]+)deg/.exec(f.getAttribute("style")||""),A=f.querySelector("#rotating");v&&A&&A.setAttribute("transform",`rotate(${v[1]} 10 8)`),f.setAttribute("width",V(e.w)),f.setAttribute("height",V(e.h)),f.removeAttribute("id");let O="tc-"+e.id,H=[...new Set([...f.querySelectorAll("[id]")].map(wt=>wt.id))],Z=new XMLSerializer().serializeToString(f);for(let wt of H)Z=Tn(Z,wt,O);Z=Z.replace(/^<svg\b/,`<svg id="${O}"`);let Go=e.el.shadowRoot?Ln(e.el,O,H):"";return`<g transform="${l}">${Go?`<style><![CDATA[
${Go}
]]></style>`:""}${Z}</g>`}function Jr(e){let[s,l]=de(e);if(s==="placa")return Vt[o].rotulo(l);if(s==="protoboard")return wr(l);let p=J(s),f=p&&K[p.tipo],h=p&&p.en&&p.en[l]?` \xB7 en el hueco ${p.en[l].slice(11)}`:"";return f?`${f.nombre}: ${f.rotulo(l)}${h}`:l}function Zr(e){let s=e?e.dataset.ref:null;if(s===se)return;se=s,So(s);let l=s&&ht(s);if(!l){L.hidden=!0;return}let p=k.py+l.y*k.escala,f=F.voltajes[s],h=f===void 0?"":f===null?" \xB7 al aire":` \xB7 ${f.toFixed(2).replace(".",",")} V`;L.textContent=Jr(s)+h,L.style.left=k.px+l.x*k.escala+"px",L.style.top=p+"px",L.classList.toggle("tc-abajo",p<44),L.hidden=!1}function xe(){se=null,L.hidden=!0,So(null)}function nt(){clearTimeout(Oe),_.classList.remove("tc-aviso");let e=E&&E.tipo==="cable"&&E.cable.puntos&&E.cable.puntos.length;_.textContent=n?"Solo lectura: puedes mover la vista y hacer zoom.":P?P.puntos.length?"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar \xB7 Teclas 0 a 9: color \xB7 Supr: quitar el \xFAltimo doblez \xB7 Esc: cancelar":"Clic en otro pin para terminar \xB7 Clic en el espacio libre para doblar el cable \xB7 Teclas 0 a 9: color \xB7 Esc: cancelar":e?"Arrastra los puntos blancos para acomodar el cable \xB7 Teclas 0 a 9: color \xB7 Doble clic en un punto: quitarlo \xB7 Supr: borrar":E&&E.tipo==="cable"?"Color: muestras de arriba o teclas 0 a 9 (c\xF3digo de colores) \xB7 Doble clic en el cable para doblarlo \xB7 Supr: borrar":E&&E.id==="protoboard"?"Arr\xE1strala para moverla: las piezas encajadas se mueven con ella \xB7 Pasa por un hueco para ver su tira \xB7 Supr: borrar":E&&a.protoboard?"Arr\xE1stralo y su\xE9ltalo sobre la protoboard para encajarlo (los huecos se ven en verde) \xB7 R: girar \xB7 Supr: borrar":E?"Arr\xE1stralo para moverlo \xB7 R: girar \xB7 Supr: borrar":F.simulando&&a.componentes.some(s=>s.tipo==="pulsador")?"Simulando \xB7 Mant\xE9n presionado un bot\xF3n con el mouse para pulsarlo \xB7 Pasa por un pin para ver su voltaje":"Clic en un pin para empezar un cable \xB7 Arrastra las piezas para moverlas \xB7 Rueda del mouse: zoom"}function Qr(e){nt(),_.textContent=e,_.classList.add("tc-aviso"),Oe=setTimeout(nt,2500)}function X(e,s){if(i)try{i({t:Date.now(),origen:"circuito",tipo:e,datos:s})}catch(l){console.error(l)}}function W(){let e=dt(a);for(let s of c)try{s(e)}catch(l){console.error(l)}}function Vo(e){w.classList.toggle("tc-oscuro",e==="oscuro"),w.classList.toggle("tc-claro",e==="claro")}let tn={circuito:()=>dt(a),alCambiar(e){typeof e=="function"&&c.push(e)},ponerPlaca(e){if(e!==o)throw new Error(`Este prototipo solo dibuja la placa \xAB${o}\xBB.`)},ponerTema:Vo,exportarSVG:Yr,exportarNetlist:e=>Mr(a,e),_alPulsar(e){typeof e=="function"&&$o.push(e)},_mostrar(e){let s=F.simulando;F={simulando:!!e.simulando,leds:e.leds||{},quemados:e.quemados||[],voltajes:e.voltajes||{},placa:e.placa||{},servos:e.servos||{}},s!==F.simulando&&(w.classList.toggle("tc-simulando",F.simulando),F.simulando||[...De].forEach(l=>Ut(l,!1)),nt()),se=null;for(let l of j.values())l.lista&&Co(l)},destruir(){je=!0,qo.disconnect(),clearTimeout(Oe),c.length=0,j.clear(),vt.clear(),u.remove()}};t.tema&&Vo(t.tema),n&&w.classList.add("tc-solo-lectura"),ge(),nt();let qo=new ResizeObserver(()=>{if(!vo||je)return;if(!Re){Re=Bt();return}if(qt||!ie)return;let e=(s,l)=>Math.abs(s-l)/Math.max(1,l);(e(b.clientWidth,ie.ancho)>.1||e(b.clientHeight,ie.alto)>.1)&&Bt()});qo.observe(b);let en=Ne("placa");return Te(),Promise.all([en,...a.protoboard?[wo()]:[],...a.componentes.map(e=>Ne(e.id,e.tipo,e.props))]).then(()=>{je||(vo=!0,le(),mt(),Re=Bt())}),tn}function Nn(r,t){let o=r&&typeof r=="object"?dt(r):{};o.formato=o.formato||1,o.placa=t;let n=new Set;o.componentes=(Array.isArray(o.componentes)?o.componentes:[]).filter(i=>i&&typeof i.id=="string"&&i.id&&i.id!=="placa"&&!i.id.includes(".")&&!n.has(i.id)&&n.add(i.id));for(let i of o.componentes){i.x=Number(i.x)||0,i.y=Number(i.y)||0,i.rot=Number(i.rot)||0;let c=K[i.tipo]?K[i.tipo].props:{};i.props={...c,...i.props&&typeof i.props=="object"?i.props:{}}}o.cables=(Array.isArray(o.cables)?o.cables:[]).filter(i=>i&&typeof i.de=="string"&&typeof i.a=="string");for(let i of o.cables){let c=Array.isArray(i.puntos)&&i.puntos.every(a=>Array.isArray(a)&&a.length===2&&a.every(Number.isFinite));"puntos"in i&&!c&&delete i.puntos}!o.protoboard||typeof o.protoboard!="object"?o.protoboard=null:(typeof o.protoboard.tipo!="string"&&(o.protoboard.tipo="media"),o.protoboard.x=Number(o.protoboard.x)||0,o.protoboard.y=Number(o.protoboard.y)||0);for(let i of o.componentes){let c=o.protoboard&&i.en&&typeof i.en=="object"&&Object.values(i.en).every(a=>typeof a=="string"&&a.startsWith("protoboard."));"en"in i&&!c&&delete i.en}return o}var Lr=r=>r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),jr=r=>String(r).replace(/[<>&"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[t]);function Tn(r,t,o){let n=Lr(t),i=`${o}-${t}`;return r.replace(new RegExp(`(\\s)id="${n}"`,"g"),(c,a)=>`${a}id="${i}"`).replace(new RegExp(`url\\(#${n}\\)`,"g"),()=>`url(#${i})`).replace(new RegExp(`href="#${n}"`,"g"),()=>`href="#${i}"`)}function Ln(r,t,o){let n=r.shadowRoot,i=[...n.adoptedStyleSheets||[]];n.querySelectorAll("style").forEach(a=>a.sheet&&i.push(a.sheet));let c=[];for(let a of i){let u;try{u=a.cssRules}catch{continue}for(let d of u){if(!d.selectorText||!d.style)continue;let m=d.selectorText.split(",").map($=>$.trim()).filter($=>!/:host|\binput\b|:focus|\.hide-input/.test($));if(!m.length)continue;let w=m.map($=>{let y=$;for(let M of o)y=y.replace(new RegExp(`#${Lr(M)}(?![\\w-])`,"g"),()=>`#${t}-${M}`);return/^svg\b/.test(y)?y.replace(/^svg\b/,`#${t}`):`#${t} ${y}`});c.push(`${w.join(", ")} { ${d.style.cssText} }`)}}return c.join(`
`)}function zn(r){let[t,o,n]=[1,3,5].map(i=>parseInt(r.slice(i,i+2),16)/255);return .2126*t+.7152*o+.0722*n>.55?"#1d2733":"#ffffff"}function Dr(r){let t=/^([\d.]+)\s*(mm|px)?$/.exec(String(r||"").trim());return t?parseFloat(t[1])*(t[2]==="mm"?96/25.4:1):0}function bo(r){let t=n=>`${V(n.x)} ${V(n.y)}`,o=`M${t(r[0])}`;for(let n=1;n<r.length-1;n++){let i=r[n-1],c=r[n],a=r[n+1],u=Math.min(5,ne(i,c)/2,ne(c,a)/2);o+=` L${t(Nr(c,i,u))} Q${t(c)} ${t(Nr(c,a,u))}`}return`${o} L${t(r[r.length-1])}`}function Nr(r,t,o){let n=ne(r,t);return n?{x:r.x+(t.x-r.x)*o/n,y:r.y+(t.y-r.y)*o/n}:r}function In(r,t,o){let n=o.x-t.x,i=o.y-t.y,c=n*n+i*i,a=c?Math.max(0,Math.min(1,((r.x-t.x)*n+(r.y-t.y)*i)/c)):0;return{x:t.x+a*n,y:t.y+a*i}}function Vn(r){return!r||!r.getAttribute?!1:r.id==="knob"||r.id==="rotating"?!0:r.tagName==="ellipse"&&Number(r.getAttribute("rx"))>5}function zr(r){let t=new Uint8Array(32768),o=0,n=!1;for(let[i,c]of String(r).split(/\r?\n/).entries()){let a=c.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\xE1lido (l\xEDnea ${i+1}).`);let u=a.slice(1).match(/../g).map(M=>parseInt(M,16));if(u.reduce((M,x)=>M+x,0)&255)throw new Error(`El .hex est\xE1 da\xF1ado (l\xEDnea ${i+1}).`);let[d,m,w,$]=u,y=u.slice(4,4+d);if($===0){let M=o+(m<<8|w);if(M+d>32768)throw new Error("El programa no cabe en la memoria del Uno.");t.set(y,M)}else if($===1){n=!0;break}else $===2?o=(y[0]<<8|y[1])<<4:$===4&&(o=(y[0]<<8|y[1])<<16)}if(!n)throw new Error("El .hex est\xE1 incompleto: falta la l\xEDnea final.");return new Uint16Array(t.buffer)}var qn=["danoComponentes","limitePin","entradaFlotante","ruidoADC","limiteUSB"],yo='(()=>{function Xt(t,e){let s=t.dataView.getUint16(93,!0);t.data[s]=t.pc&255,t.data[s-1]=t.pc>>8&255,t.pc22Bits&&(t.data[s-2]=t.pc>>16&255),t.dataView.setUint16(93,s-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}var Us=256,Ds=128,Pt=class{constructor(e,s=8192){this.progMem=e,this.sramBytes=s,this.data=new Uint8Array(this.sramBytes+Us),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=new Array(Ds),this.nextClockEvent=null,this.clockEventPool=[],this.pc22Bits=this.progBytes.length>131072,this.gpioPorts=new Set,this.gpioByPort=[],this.onWatchdogReset=()=>{},this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.maxInterrupt=0,this.reset()}reset(){this.SP=this.data.length-1,this.pc=0,this.pendingInterrupts.fill(null),this.nextInterrupt=-1,this.nextClockEvent=null}readData(e){return e>=32&&this.readHooks[e]?this.readHooks[e](e):this.data[e]}writeData(e,s,i=255){let o=this.writeHooks[e];o&&o(s,this.data[e],e,i)||(this.data[e]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(e){this.dataView.setUint16(93,e,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(this.SREG&128)}setInterruptFlag(e){let{flagRegister:s,flagMask:i,enableRegister:o,enableMask:n}=e;e.inverseFlag?this.data[s]&=~i:this.data[s]|=i,this.data[o]&n&&this.queueInterrupt(e)}updateInterruptEnable(e,s){let{enableMask:i,flagRegister:o,flagMask:n,inverseFlag:a}=e;if(s&i){let r=this.data[o]&n;(a?!r:r)&&this.queueInterrupt(e)}else this.clearInterrupt(e,!1)}queueInterrupt(e){let{address:s}=e;this.pendingInterrupts[s]=e,(this.nextInterrupt===-1||this.nextInterrupt>s)&&(this.nextInterrupt=s),s>this.maxInterrupt&&(this.maxInterrupt=s)}clearInterrupt({address:e,flagRegister:s,flagMask:i},o=!0){o&&(this.data[s]&=~i);let{pendingInterrupts:n,maxInterrupt:a}=this;if(n[e]&&(n[e]=null,this.nextInterrupt===e)){this.nextInterrupt=-1;for(let r=e+1;r<=a;r++)if(n[r]){this.nextInterrupt=r;break}}}clearInterruptByFlag(e,s){let{flagRegister:i,flagMask:o}=e;s&o&&(this.data[i]&=~o,this.clearInterrupt(e))}addClockEvent(e,s){let{clockEventPool:i}=this;s=this.cycles+Math.max(1,s);let o=i.pop(),n=o??{cycles:s,callback:e,next:null};n.cycles=s,n.callback=e;let{nextClockEvent:a}=this,r=null;for(;a&&a.cycles<s;)r=a,a=a.next;return r?(r.next=n,n.next=a):(this.nextClockEvent=n,n.next=a),e}updateClockEvent(e,s){return this.clearClockEvent(e)?(this.addClockEvent(e,s),!0):!1}clearClockEvent(e){let{nextClockEvent:s}=this;if(!s)return!1;let{clockEventPool:i}=this,o=null;for(;s;){if(s.callback===e)return o?o.next=s.next:this.nextClockEvent=s.next,i.length<10&&i.push(s),!0;o=s,s=s.next}return!1}tick(){let{nextClockEvent:e}=this;e&&e.cycles<=this.cycles&&(e.callback(),this.nextClockEvent=e.next,this.clockEventPool.length<10&&this.clockEventPool.push(e));let{nextInterrupt:s}=this;if(this.interruptsEnabled&&s>=0){let i=this.pendingInterrupts[s];Xt(this,i.address),i.constant||this.clearInterrupt(i)}}};function yt(t){return(t&65039)===36864||(t&65039)===37376||(t&65038)===37902||(t&65038)===37900}function Jt(t){let e=t.progMem[t.pc];if((e&64512)===7168){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i+(t.data[95]&1),n=o&255;t.data[(e&496)>>4]=n;let a=t.data[95]&192;a|=n?0:2,a|=128&n?4:0,a|=(n^i)&(s^n)&128?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o&256?1:0,a|=1&(s&i|i&~n|~n&s)?32:0,t.data[95]=a}else if((e&64512)===3072){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s+i&255;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(o^i)&(o^s)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=s+i&256?1:0,n|=1&(s&i|i&~o|~o&s)?32:0,t.data[95]=n}else if((e&65280)===38400){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=i+(e&15|(e&192)>>2)&65535;t.dataView.setUint16(s,o,!0);let n=t.data[95]&224;n|=o?0:2,n|=32768&o?4:0,n|=~i&o&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=~o&i&32768?1:0,t.data[95]=n,t.cycles++}else if((e&64512)===8192){let s=t.data[(e&496)>>4]&t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===28672){let s=t.data[((e&240)>>4)+16]&(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65039)===37893){let s=t.data[(e&496)>>4],i=s>>>1|128&s;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65423)===38024)t.data[95]&=~(1<<((e&112)>>4));else if((e&65032)===63488){let s=e&7,i=(e&496)>>4;t.data[i]=~(1<<s)&t.data[i]|(t.data[95]>>6&1)<<s}else if((e&64512)===62464)t.data[95]&1<<(e&7)||(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&64512)===61440)t.data[95]&1<<(e&7)&&(t.pc=t.pc+(((e&504)>>3)-(e&512?64:0)),t.cycles++);else if((e&65423)===37896)t.data[95]|=1<<((e&112)>>4);else if((e&65032)===64e3){let s=t.data[(e&496)>>4],i=e&7;t.data[95]=t.data[95]&191|(s>>i&1?64:0)}else if((e&65038)===37902){let s=t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13,i=t.pc+2,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc=s-1,t.cycles+=n?4:3}else if((e&65280)===38912){let s=e&248,i=e&7,o=t.readData((s>>3)+32),n=1<<i;t.writeData((s>>3)+32,o&~n,n)}else if((e&65039)===37888){let s=(e&496)>>4,i=255-t.data[s];t.data[s]=i;let o=t.data[95]&225|1;o|=i?0:2,o|=128&i?4:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===5120){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=((s^i)&(s^o)&128)!==0?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===1024){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===12288){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i,n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&64512)===4096){if(t.data[(e&496)>>4]===t.data[e&15|(e&512)>>5]){let s=t.progMem[t.pc+1],i=yt(s)?2:1;t.pc+=i,t.cycles+=i}}else if((e&65039)===37898){let s=t.data[(e&496)>>4],i=s-1;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===128?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if(e===38169){let s=t.pc+1,i=t.dataView.getUint16(93,!0),o=t.data[92];t.data[i]=s&255,t.data[i-1]=s>>8&255,t.data[i-2]=s>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(o<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(e===37913){let s=t.data[92];t.pc=(s<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(e===38360){let s=t.data[91];t.data[0]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36870){let s=t.data[91];t.data[(e&496)>>4]=t.progBytes[s<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if((e&65039)===36871){let s=t.data[91],i=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s<<16|i],t.dataView.setUint16(30,i+1,!0),i===65535&&(t.data[91]=(s+1)%(t.progBytes.length>>16)),t.cycles+=2}else if((e&64512)===9216){let s=t.data[(e&496)>>4]^t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&65416)===776){let s=t.data[((e&112)>>4)+16],i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setUint16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===896){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.dataView.getInt8((e&7)+16),o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?0:2)|(s*i&32768?1:0),t.cycles++}else if((e&65416)===904){let s=t.dataView.getInt8(((e&112)>>4)+16),i=t.data[(e&7)+16],o=s*i<<1;t.dataView.setInt16(0,o,!0),t.data[95]=t.data[95]&252|(65535&o?2:0)|(s*i&32768?1:0),t.cycles++}else if(e===38153){let s=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:o}=t;t.data[i]=s&255,t.data[i-1]=s>>8&255,o&&(t.data[i-2]=s>>16&255),t.dataView.setUint16(93,i-(o?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=o?3:2}else if(e===37897)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if((e&63488)===45056){let s=t.readData((e&15|(e&1536)>>5)+32);t.data[(e&496)>>4]=s}else if((e&65039)===37891){let s=t.data[(e&496)>>4],i=s+1&255;t.data[(e&496)>>4]=i;let o=t.data[95]&225;o|=i?0:2,o|=128&i?4:0,o|=s===127?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&65038)===37900)t.pc=(t.progMem[t.pc+1]|(e&1)<<16|(e&496)<<13)-1,t.cycles+=2;else if((e&65039)===37382){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o&255-i),t.data[s]=o}else if((e&65039)===37381){let s=(e&496)>>4,i=t.data[s],o=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),o|i),t.data[s]=o}else if((e&65039)===37383){let s=t.data[(e&496)>>4],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s^i),t.data[(e&496)>>4]=i}else if((e&61440)===57344)t.data[((e&240)>>4)+16]=e&15|(e&3840)>>4;else if((e&65039)===36864){t.cycles++;let s=t.readData(t.progMem[t.pc+1]);t.data[(e&496)>>4]=s,t.pc++}else if((e&65039)===36876)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(26,!0));else if((e&65039)===36877){let s=t.dataView.getUint16(26,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(26,s+1,!0)}else if((e&65039)===36878){let s=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&65039)===32776)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0));else if((e&65039)===36873){let s=t.dataView.getUint16(28,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(28,s+1,!0)}else if((e&65039)===36874){let s=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32776&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if((e&65039)===32768)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0));else if((e&65039)===36865){let s=t.dataView.getUint16(30,!0);t.cycles++,t.data[(e&496)>>4]=t.readData(s),t.dataView.setUint16(30,s+1,!0)}else if((e&65039)===36866){let s=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,s,!0),t.cycles++,t.data[(e&496)>>4]=t.readData(s)}else if((e&53768)===32768&&e&7|(e&3072)>>7|(e&8192)>>8)t.cycles++,t.data[(e&496)>>4]=t.readData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8));else if(e===38344)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36868)t.data[(e&496)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if((e&65039)===36869){let s=t.dataView.getUint16(30,!0);t.data[(e&496)>>4]=t.progBytes[s],t.dataView.setUint16(30,s+1,!0),t.cycles+=2}else if((e&65039)===37894){let s=t.data[(e&496)>>4],i=s>>>1;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=s&1,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===11264)t.data[(e&496)>>4]=t.data[e&15|(e&512)>>5];else if((e&65280)===256){let s=2*(e&15),i=2*((e&240)>>4);t.data[i]=t.data[s],t.data[i+1]=t.data[s+1]}else if((e&64512)===39936){let s=t.data[(e&496)>>4]*t.data[e&15|(e&512)>>5];t.dataView.setUint16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65280)===512){let s=t.dataView.getInt8(((e&240)>>4)+16)*t.dataView.getInt8((e&15)+16);t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65416)===768){let s=t.dataView.getInt8(((e&112)>>4)+16)*t.data[(e&7)+16];t.dataView.setInt16(0,s,!0),t.data[95]=t.data[95]&252|(65535&s?0:2)|(32768&s?1:0),t.cycles++}else if((e&65039)===37889){let s=(e&496)>>4,i=t.data[s],o=0-i;t.data[s]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=o===128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=o?1:0,n|=1&(o|i)?32:0,t.data[95]=n}else if(e!==0){if((e&64512)===10240){let s=t.data[(e&496)>>4]|t.data[e&15|(e&512)>>5];t.data[(e&496)>>4]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&61440)===24576){let s=t.data[((e&240)>>4)+16]|(e&15|(e&3840)>>4);t.data[((e&240)>>4)+16]=s;let i=t.data[95]&225;i|=s?0:2,i|=128&s?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if((e&63488)===47104)t.writeData((e&15|(e&1536)>>5)+32,t.data[(e&496)>>4]);else if((e&65039)===36879){let s=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,s,!0),t.data[(e&496)>>4]=t.data[s],t.cycles++}else if((e&65039)===37391){let s=t.dataView.getUint16(93,!0);t.data[s]=t.data[(e&496)>>4],t.dataView.setUint16(93,s-1,!0),t.cycles++}else if((e&61440)===53248){let s=(e&2047)-(e&2048?2048:0),i=t.pc+1,o=t.dataView.getUint16(93,!0),{pc22Bits:n}=t;t.data[o]=255&i,t.data[o-1]=i>>8&255,n&&(t.data[o-2]=i>>16&255),t.dataView.setUint16(93,o-(n?3:2),!0),t.pc+=s,t.cycles+=n?3:2}else if(e===38152){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3}else if(e===38168){let{pc22Bits:s}=t,i=t.dataView.getUint16(93,!0)+(s?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,s&&(t.pc|=t.data[i-2]<<16),t.cycles+=s?4:3,t.data[95]|=128}else if((e&61440)===49152)t.pc=t.pc+((e&2047)-(e&2048?2048:0)),t.cycles++;else if((e&65039)===37895){let s=t.data[(e&496)>>4],i=s>>>1|(t.data[95]&1)<<7;t.data[(e&496)>>4]=i;let o=t.data[95]&224;o|=i?0:2,o|=128&i?4:0,o|=1&s?1:0,o|=o>>2&1^o&1?8:0,o|=o>>2&1^o>>3&1?16:0,t.data[95]=o}else if((e&64512)===2048){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=t.data[95],n=s-i-(o&1);t.data[(e&496)>>4]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&61440)===16384){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=t.data[95],n=s-i-(o&1);t.data[((e&240)>>4)+16]=n,o=o&192|(!n&&o>>1&1?2:0)|(i+(o&1)>s?1:0),o|=128&n?4:0,o|=(s^i)&(s^n)&128?8:0,o|=o>>2&1^o>>3&1?16:0,o|=1&(~s&i|i&n|n&~s)?32:0,t.data[95]=o}else if((e&65280)===39424){let s=((e&248)>>3)+32,i=1<<(e&7);t.writeData(s,t.readData(s)|i,i),t.cycles++}else if((e&65280)===39168){if(!(t.readData(((e&248)>>3)+32)&1<<(e&7))){let i=t.progMem[t.pc+1],o=yt(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===39680){if(t.readData(((e&248)>>3)+32)&1<<(e&7)){let i=t.progMem[t.pc+1],o=yt(i)?2:1;t.cycles+=o,t.pc+=o}}else if((e&65280)===38656){let s=2*((e&48)>>4)+24,i=t.dataView.getUint16(s,!0),o=e&15|(e&192)>>2,n=i-o;t.dataView.setUint16(s,n,!0);let a=t.data[95]&192;a|=n?0:2,a|=32768&n?4:0,a|=i&~n&32768?8:0,a|=a>>2&1^a>>3&1?16:0,a|=o>i?1:0,a|=1&(~i&o|o&n|n&~i)?32:0,t.data[95]=a,t.cycles++}else if((e&65032)===64512){if(!(t.data[(e&496)>>4]&1<<(e&7))){let s=t.progMem[t.pc+1],i=yt(s)?2:1;t.cycles+=i,t.pc+=i}}else if((e&65032)===65024){if(t.data[(e&496)>>4]&1<<(e&7)){let s=t.progMem[t.pc+1],i=yt(s)?2:1;t.cycles+=i,t.pc+=i}}else if(e!==38280){if(e!==38376){if(e!==38392){if((e&65039)===37376){let s=t.data[(e&496)>>4],i=t.progMem[t.pc+1];t.writeData(i,s),t.pc++,t.cycles++}else if((e&65039)===37388)t.writeData(t.dataView.getUint16(26,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37389){let s=t.dataView.getUint16(26,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(26,s+1,!0),t.cycles++}else if((e&65039)===37390){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.writeData(i,s),t.cycles++}else if((e&65039)===33288)t.writeData(t.dataView.getUint16(28,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37385){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0);t.writeData(i,s),t.dataView.setUint16(28,i+1,!0),t.cycles++}else if((e&65039)===37386){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33288&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(28,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===33280)t.writeData(t.dataView.getUint16(30,!0),t.data[(e&496)>>4]),t.cycles++;else if((e&65039)===37377){let s=t.dataView.getUint16(30,!0);t.writeData(s,t.data[(e&496)>>4]),t.dataView.setUint16(30,s+1,!0),t.cycles++}else if((e&65039)===37378){let s=t.data[(e&496)>>4],i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.writeData(i,s),t.cycles++}else if((e&53768)===33280&&e&7|(e&3072)>>7|(e&8192)>>8)t.writeData(t.dataView.getUint16(30,!0)+(e&7|(e&3072)>>7|(e&8192)>>8),t.data[(e&496)>>4]),t.cycles++;else if((e&64512)===6144){let s=t.data[(e&496)>>4],i=t.data[e&15|(e&512)>>5],o=s-i;t.data[(e&496)>>4]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&61440)===20480){let s=t.data[((e&240)>>4)+16],i=e&15|(e&3840)>>4,o=s-i;t.data[((e&240)>>4)+16]=o;let n=t.data[95]&192;n|=o?0:2,n|=128&o?4:0,n|=(s^i)&(s^o)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=i>s?1:0,n|=1&(~s&i|i&o|o&~s)?32:0,t.data[95]=n}else if((e&65039)===37890){let s=(e&496)>>4,i=t.data[s];t.data[s]=(15&i)<<4|(240&i)>>>4}else if(e===38312)t.onWatchdogReset();else if((e&65039)===37380){let s=(e&496)>>4,i=t.data[s],o=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=i,t.data[s]=o}}}}}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}var H;(function(t){t[t.AVCC=0]="AVCC",t[t.AREF=1]="AREF",t[t.Internal1V1=2]="Internal1V1",t[t.Internal2V56=3]="Internal2V56",t[t.Reserved=4]="Reserved"})(H||(H={}));var D;(function(t){t[t.SingleEnded=0]="SingleEnded",t[t.Differential=1]="Differential",t[t.Constant=2]="Constant",t[t.Temperature=3]="Temperature"})(D||(D={}));var Be={0:{type:D.SingleEnded,channel:0},1:{type:D.SingleEnded,channel:1},2:{type:D.SingleEnded,channel:2},3:{type:D.SingleEnded,channel:3},4:{type:D.SingleEnded,channel:4},5:{type:D.SingleEnded,channel:5},6:{type:D.SingleEnded,channel:6},7:{type:D.SingleEnded,channel:7},8:{type:D.Temperature},14:{type:D.Constant,voltage:1.1},15:{type:D.Constant,voltage:0}},vs={type:D.Constant,voltage:0},Qt={ADMUX:124,ADCSRA:122,ADCSRB:123,ADCL:120,ADCH:121,DIDR0:126,adcInterrupt:42,numChannels:8,muxInputMask:15,muxChannels:Be,adcReferences:[H.AREF,H.AVCC,H.Reserved,H.Internal1V1]},ks=7,Bs=8,_s=16,ke=64,Zt=128,Os=31,Vs=32,Fs=8,Ws=8,Ns=3,$s=6,bt=class{constructor(e,s){this.cpu=e,this.config=s,this.channelValues=new Array(this.config.numChannels),this.avcc=5,this.aref=5,this.onADCRead=i=>{var o;let n=0;switch(i.type){case D.Constant:n=i.voltage;break;case D.SingleEnded:n=(o=this.channelValues[i.channel])!==null&&o!==void 0?o:0;break;case D.Differential:n=i.gain*((this.channelValues[i.positiveChannel]||0)-(this.channelValues[i.negativeChannel]||0));break;case D.Temperature:n=.378125;break}let a=n/this.referenceVoltage*1024,r=Math.min(Math.max(Math.floor(a),0),1023);this.cpu.addClockEvent(()=>this.completeADCRead(r),this.sampleCycles)},this.converting=!1,this.conversionCycles=25,this.ADC={address:this.config.adcInterrupt,flagRegister:this.config.ADCSRA,flagMask:_s,enableRegister:this.config.ADCSRA,enableMask:Bs},e.writeHooks[s.ADCSRA]=(i,o)=>{var n;if(i&Zt&&!(o&Zt)&&(this.conversionCycles=25),e.data[s.ADCSRA]=i,e.updateInterruptEnable(this.ADC,i),!this.converting&&i&ke){if(!(i&Zt))return this.cpu.addClockEvent(()=>this.completeADCRead(0),this.sampleCycles),!0;let a=this.cpu.data[this.config.ADMUX]&Os;e.data[s.ADCSRB]&Fs&&(a|=32),a&=s.muxInputMask;let r=(n=s.muxChannels[a])!==null&&n!==void 0?n:vs;return this.converting=!0,this.onADCRead(r),!0}}}completeADCRead(e){let{ADCL:s,ADCH:i,ADMUX:o,ADCSRA:n}=this.config;this.converting=!1,this.conversionCycles=13,this.cpu.data[o]&Vs?(this.cpu.data[s]=e<<6&255,this.cpu.data[i]=e>>2):(this.cpu.data[s]=e&255,this.cpu.data[i]=e>>8&3),this.cpu.data[n]&=~ke,this.cpu.setInterruptFlag(this.ADC)}get prescaler(){let{ADCSRA:e}=this.config;switch(this.cpu.data[e]&ks){case 0:case 1:return 2;case 2:return 4;case 3:return 8;case 4:return 16;case 5:return 32;case 6:return 64;default:return 128}}get referenceVoltageType(){var e;let{ADMUX:s,adcReferences:i}=this.config,o=this.cpu.data[s]>>$s&Ns;return i.length>4&&this.cpu.data[s]&Ws&&(o|=4),(e=i[o])!==null&&e!==void 0?e:H.Reserved}get referenceVoltage(){switch(this.referenceVoltageType){case H.AVCC:return this.avcc;case H.AREF:return this.aref;case H.Internal1V1:return 1.1;case H.Internal2V56:return 2.56;default:return this.avcc}}get sampleCycles(){return this.conversionCycles*this.prescaler}};var Hs=2,Ls=4,js=8,Ks=16,Gs=32,Hi=Hs|Ls|js|Ks|Gs;var _e={EICR:105,EIMSK:61,EIFR:60,index:0,iscOffset:0,interrupt:2},Oe={EICR:105,EIMSK:61,EIFR:60,index:1,iscOffset:2,interrupt:4},Ve={PCIE:0,PCICR:104,PCIFR:59,PCMSK:107,pinChangeInterrupt:6,mask:255,offset:0},Fe={PCIE:1,PCICR:104,PCIFR:59,PCMSK:108,pinChangeInterrupt:8,mask:255,offset:0},We={PCIE:2,PCICR:104,PCIFR:59,PCMSK:109,pinChangeInterrupt:10,mask:255,offset:0};var at={PIN:35,DDR:36,PORT:37,pinChange:Ve,externalInterrupts:[]},Yt={PIN:38,DDR:39,PORT:40,pinChange:Fe,externalInterrupts:[]},z={PIN:41,DDR:42,PORT:43,pinChange:We,externalInterrupts:[null,null,_e,Oe]};var v;(function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"})(v||(v={}));var b;(function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"})(b||(b={}));var nt;(function(t){t[t.LowLevel=0]="LowLevel",t[t.Change=1]="Change",t[t.FallingEdge=2]="FallingEdge",t[t.RisingEdge=3]="RisingEdge"})(nt||(nt={}));var Mt=class{constructor(e,s){var i,o,n,a;this.cpu=e,this.portConfig=s,this.externalClockListeners=[],this.listeners=[],this.pinValue=0,this.overrideMask=255,this.overrideValue=0,this.lastValue=0,this.lastDdr=0,this.lastPin=0,this.openCollector=0,e.gpioPorts.add(this),e.gpioByPort[s.PORT]=this,e.writeHooks[s.DDR]=l=>{let w=e.data[s.PORT];return e.data[s.DDR]=l,this.writeGpio(w,l),this.updatePinRegister(l),!0},e.writeHooks[s.PORT]=l=>{let w=e.data[s.DDR];return e.data[s.PORT]=l,this.writeGpio(l,w),this.updatePinRegister(w),!0},e.writeHooks[s.PIN]=(l,w,u,S)=>{let A=e.data[s.PORT],E=e.data[s.DDR],k=A^l&S;return e.data[s.PORT]=k,this.writeGpio(k,E),this.updatePinRegister(E),!0};let{externalInterrupts:r}=s;this.externalInts=r.map(l=>l?{address:l.interrupt,flagRegister:l.EIFR,flagMask:1<<l.index,enableRegister:l.EIMSK,enableMask:1<<l.index}:null);let f=new Set(r.map(l=>l?.EICR));for(let l of f)this.attachInterruptHook(l||0);let R=(o=(i=r.find(l=>l&&l.EIMSK))===null||i===void 0?void 0:i.EIMSK)!==null&&o!==void 0?o:0;this.attachInterruptHook(R,"mask");let x=(a=(n=r.find(l=>l&&l.EIFR))===null||n===void 0?void 0:n.EIFR)!==null&&a!==void 0?a:0;this.attachInterruptHook(x,"flag");let{pinChange:m}=s;if(this.PCINT=m?{address:m.pinChangeInterrupt,flagRegister:m.PCIFR,flagMask:1<<m.PCIE,enableRegister:m.PCICR,enableMask:1<<m.PCIE}:null,m){let{PCIFR:l,PCMSK:w}=m;e.writeHooks[l]=u=>{for(let S of this.cpu.gpioPorts){let{PCINT:A}=S;A&&e.clearInterruptByFlag(A,u)}return!0},e.writeHooks[w]=u=>{e.data[w]=u;for(let S of this.cpu.gpioPorts){let{PCINT:A}=S;A&&e.updateInterruptEnable(A,u)}return!0}}}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(s=>s!==e)}pinState(e){let s=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],o=1<<e,n=i&o?v.InputPullUp:v.Input,a=this.openCollector&o?n:v.High;return s&o?this.lastValue&o?a:v.Low:n}setPin(e,s){let i=1<<e;this.pinValue&=~i,s&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.DDR])}timerOverridePin(e,s){let{cpu:i,portConfig:o}=this,n=1<<e;if(s===b.None)this.overrideMask|=n,this.overrideValue&=~n;else switch(this.overrideMask&=~n,s){case b.Enable:this.overrideValue&=~n,this.overrideValue|=i.data[o.PORT]&n;break;case b.Set:this.overrideValue|=n;break;case b.Clear:this.overrideValue&=~n;break;case b.Toggle:this.overrideValue^=n;break}let a=i.data[o.DDR];this.writeGpio(i.data[o.PORT],a),this.updatePinRegister(a)}updatePinRegister(e){var s,i;let o=this.pinValue&~e|this.lastValue&e;if(this.cpu.data[this.portConfig.PIN]=o,this.lastPin!==o){for(let n=0;n<8;n++)if((o&1<<n)!==(this.lastPin&1<<n)){let a=!!(o&1<<n);this.toggleInterrupt(n,a),(i=(s=this.externalClockListeners)[n])===null||i===void 0||i.call(s,a)}this.lastPin=o}}toggleInterrupt(e,s){let{cpu:i,portConfig:o,externalInts:n,PCINT:a}=this,{externalInterrupts:r,pinChange:f}=o,R=r[e],x=n[e];if(x&&R){let{EIMSK:m,index:l,EICR:w,iscOffset:u}=R;if(i.data[m]&1<<l){let S=i.data[w]>>u&3,A=!1;switch(x.constant=!1,S){case nt.LowLevel:A=!s,x.constant=!0;break;case nt.Change:A=!0;break;case nt.FallingEdge:A=!s;break;case nt.RisingEdge:A=s;break}A?i.setInterruptFlag(x):x.constant&&i.clearInterrupt(x,!0)}}if(f&&a&&f.mask&1<<e){let{PCMSK:m}=f;i.data[m]&1<<e+f.offset&&i.setInterruptFlag(a)}}attachInterruptHook(e,s="other"){if(!e)return;let{cpu:i}=this;i.writeHooks[e]=o=>{s!=="flag"&&(i.data[e]=o);for(let n of i.gpioPorts){for(let a of n.externalInts)a&&s==="mask"&&i.updateInterruptEnable(a,o),a&&!a.constant&&s==="flag"&&i.clearInterruptByFlag(a,o);n.checkExternalInterrupts()}return!0}}checkExternalInterrupts(){let{cpu:e}=this,{externalInterrupts:s}=this.portConfig;for(let i=0;i<8;i++){let o=s[i];if(!o)continue;let n=!!(this.lastPin&1<<i),{EIFR:a,EIMSK:r,index:f,EICR:R,iscOffset:x,interrupt:m}=o;if(!(e.data[r]&1<<f)||n)continue;(e.data[R]>>x&3)===nt.LowLevel&&e.queueInterrupt({address:m,flagRegister:a,flagMask:1<<f,enableRegister:r,enableMask:1<<f,constant:!0})}}writeGpio(e,s){let i=(e&this.overrideMask|this.overrideValue)&s|e&~s,o=this.lastValue;if(i!==o||s!==this.lastDdr){this.lastValue=i,this.lastDdr=s;for(let n of this.listeners)n(i,o)}}};var He={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},Ut;(function(t){t[t.FallingEdge=6]="FallingEdge",t[t.RisingEdge=7]="RisingEdge"})(Ut||(Ut={}));var ee={TOV:1,OCFA:2,OCFB:4,OCFC:0,TOIE:1,OCIEA:2,OCIEB:4,OCIEC:0},se=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,compCInterrupt:0,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,OCRC:0,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:He,compPortA:z.PORT,compPinA:6,compPortB:z.PORT,compPinB:5,compPortC:0,compPinC:0,externalClockPort:z.PORT,externalClockPin:4},ee),ie=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,compCInterrupt:0,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,OCRC:0,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:He,compPortA:at.PORT,compPinA:1,compPortB:at.PORT,compPinB:2,compPortC:0,compPinC:0,externalClockPort:z.PORT,externalClockPin:5},ee),oe=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,compCInterrupt:0,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,OCRC:0,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:at.PORT,compPinA:3,compPortB:z.PORT,compPinB:3,compPortC:0,compPinC:0,externalClockPort:0,externalClockPin:0},ee),ut;(function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"})(ut||(ut={}));var M;(function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(M||(M={}));var P;(function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"})(P||(P={}));var X=1,Ct=2,rt=1,{Normal:ne,PWMPhaseCorrect:K,CTC:Lt,FastPWM:G,Reserved:te,PWMPhaseFrequencyCorrect:Dt}=ut,qs=[[ne,255,P.Immediate,M.Max,0],[K,255,P.Top,M.Bottom,0],[Lt,X,P.Immediate,M.Max,0],[G,255,P.Bottom,M.Max,0],[te,255,P.Immediate,M.Max,0],[K,X,P.Top,M.Bottom,rt],[te,255,P.Immediate,M.Max,0],[G,X,P.Bottom,M.Top,rt]],zs=[[ne,65535,P.Immediate,M.Max,0],[K,255,P.Top,M.Bottom,0],[K,511,P.Top,M.Bottom,0],[K,1023,P.Top,M.Bottom,0],[Lt,X,P.Immediate,M.Max,0],[G,255,P.Bottom,M.Top,0],[G,511,P.Bottom,M.Top,0],[G,1023,P.Bottom,M.Top,0],[Dt,Ct,P.Bottom,M.Bottom,0],[Dt,X,P.Bottom,M.Bottom,rt],[K,Ct,P.Top,M.Bottom,0],[K,X,P.Top,M.Bottom,rt],[Lt,Ct,P.Immediate,M.Max,0],[te,65535,P.Immediate,M.Max,0],[G,Ct,P.Bottom,M.Top,rt],[G,X,P.Bottom,M.Top,rt]];function Xs(t){switch(t){case 1:return b.Toggle;case 2:return b.Clear;case 3:return b.Set;default:return b.Enable}}var Ne=128,$e=64,Js=32,vt=class{constructor(e,s){if(this.cpu=e,this.config=s,this.MAX=this.config.bits===16?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.hasOCRC=this.config.OCRC>0,this.ocrC=0,this.nextOcrC=0,this.ocrUpdateMode=P.Immediate,this.tovUpdateMode=M.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.externalClockRisingEdge=!1,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.OCFC={address:this.config.compCInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFC,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEC},this.count=(i=!0,o=!1)=>{let{divider:n,lastCycle:a,cpu:r}=this,{cycles:f}=r,R=f-a;if(n&&R>=n||o){let x=o?1:Math.floor(R/n);this.lastCycle+=x*n;let m=this.tcnt,{timerMode:l,TOP:w}=this,u=l===K||l===Dt,S=u?this.phasePwmCount(m,x):(m+x)%(w+1),A=m+x>w;if(this.tcntUpdated||(this.tcnt=S,u||this.timerUpdated(S,m)),!u){if(l===G&&A){let{compA:E,compB:k}=this;E&&this.updateCompPin(E,"A",!0),k&&this.updateCompPin(k,"B",!0)}this.ocrUpdateMode==P.Bottom&&A&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC),A&&(this.tovUpdateMode==M.Top||w===this.MAX)&&r.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1,(this.tcnt===0&&this.ocrUpdateMode===P.Bottom||this.tcnt===this.TOP&&this.ocrUpdateMode===P.Top)&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC)),this.updateDivider){let{CS:x}=this,{externalClockPin:m}=this.config,l=this.config.dividers[x];this.lastCycle=l?this.cpu.cycles:0,this.updateDivider=!1,this.divider=l,this.config.externalClockPort&&!this.externalClockPort&&(this.externalClockPort=this.cpu.gpioByPort[this.config.externalClockPort]),this.externalClockPort&&(this.externalClockPort.externalClockListeners[m]=null),l?r.addClockEvent(this.count,this.lastCycle+l-r.cycles):this.externalClockPort&&(x===Ut.FallingEdge||x===Ut.RisingEdge)&&(this.externalClockPort.externalClockListeners[m]=this.externalClockCallback,this.externalClockRisingEdge=x===Ut.RisingEdge);return}i&&n&&r.addClockEvent(this.count,this.lastCycle+n-r.cycles)},this.externalClockCallback=i=>{i===this.externalClockRisingEdge&&this.count(!1,!0)},this.updateWGMConfig(),this.cpu.readHooks[s.TCNT]=i=>(this.count(!1),this.config.bits===16&&(this.cpu.data[i+1]=this.tcnt>>8),this.cpu.data[i]=this.tcnt&255),this.cpu.writeHooks[s.TCNT]=i=>{this.tcntNext=this.highByteTemp<<8|i,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[s.OCRA]=i=>{this.nextOcrA=this.highByteTemp<<8|i,this.ocrUpdateMode===P.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[s.OCRB]=i=>{this.nextOcrB=this.highByteTemp<<8|i,this.ocrUpdateMode===P.Immediate&&(this.ocrB=this.nextOcrB)},this.hasOCRC&&(this.cpu.writeHooks[s.OCRC]=i=>{this.nextOcrC=this.highByteTemp<<8|i,this.ocrUpdateMode===P.Immediate&&(this.ocrC=this.nextOcrC)}),this.config.bits===16){this.cpu.writeHooks[s.ICR]=n=>{this.icr=this.highByteTemp<<8|n};let i=n=>{this.highByteTemp=n},o=(n,a,r)=>(this.highByteTemp=n&this.ocrMask>>8,e.data[r]=this.highByteTemp,!0);this.cpu.writeHooks[s.TCNT+1]=i,this.cpu.writeHooks[s.OCRA+1]=o,this.cpu.writeHooks[s.OCRB+1]=o,this.hasOCRC&&(this.cpu.writeHooks[s.OCRC+1]=o),this.cpu.writeHooks[s.ICR+1]=i}e.writeHooks[s.TCCRA]=i=>(this.cpu.data[s.TCCRA]=i,this.updateWGMConfig(),!0),e.writeHooks[s.TCCRB]=i=>(s.TCCRC||(this.checkForceCompare(i),i&=~(Ne|$e)),this.cpu.data[s.TCCRB]=i,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),s.TCCRC&&(e.writeHooks[s.TCCRC]=i=>{this.checkForceCompare(i)}),e.writeHooks[s.TIFR]=i=>(this.cpu.data[s.TIFR]=i,this.cpu.clearInterruptByFlag(this.OVF,i),this.cpu.clearInterruptByFlag(this.OCFA,i),this.cpu.clearInterruptByFlag(this.OCFB,i),!0),e.writeHooks[s.TIMSK]=i=>{this.cpu.updateInterruptEnable(this.OVF,i),this.cpu.updateInterruptEnable(this.OCFA,i),this.cpu.updateInterruptEnable(this.OCFB,i)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrC=0,this.nextOcrC=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return this.TCCRB&7}get WGM(){let e=this.config.bits===16?24:8;return(this.TCCRB&e)>>1|this.TCCRA&3}get TOP(){switch(this.topValue){case X:return this.ocrA;case Ct:return this.icr;default:return this.topValue}}get ocrMask(){switch(this.topValue){case X:case Ct:return 65535;default:return this.topValue}}get debugTCNT(){return this.tcnt}updateWGMConfig(){let{config:e,WGM:s}=this,i=e.bits===16?zs:qs,o=this.cpu.data[e.TCCRA],[n,a,r,f,R]=i[s];this.timerMode=n,this.topValue=a,this.ocrUpdateMode=r,this.tovUpdateMode=f;let x=n===G||n===K||n===Dt,m=this.compA;this.compA=o>>6&3,this.compA===1&&x&&!(R&rt)&&(this.compA=0),!!m!=!!this.compA&&this.updateCompA(this.compA?b.Enable:b.None);let l=this.compB;if(this.compB=o>>4&3,this.compB===1&&x&&(this.compB=0),!!l!=!!this.compB&&this.updateCompB(this.compB?b.Enable:b.None),this.hasOCRC){let w=this.compC;this.compC=o>>2&3,this.compC===1&&x&&(this.compC=0),!!w!=!!this.compC&&this.updateCompC(this.compC?b.Enable:b.None)}}phasePwmCount(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a,TOP:r,MAX:f,tcntUpdated:R}=this;for(!e&&!r&&(s=0,this.ocrUpdateMode===P.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC));s>0;)this.countingUp?(e++,e===r&&!R&&(this.countingUp=!1,this.ocrUpdateMode===P.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))):(e--,!e&&!R&&(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===P.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB,this.ocrC=this.nextOcrC))),R||(e===i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),e===o&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&e===n&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))),s--;return e&f}timerUpdated(e,s){let{ocrA:i,ocrB:o,ocrC:n,hasOCRC:a}=this,r=s>e;((s<i||r)&&e>=i||s<i&&r)&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),((s<o||r)&&e>=o||s<o&&r)&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),a&&((s<n||r)&&e>=n||s<n&&r)&&(this.cpu.setInterruptFlag(this.OCFC),this.compC&&this.updateCompPin(this.compC,"C"))}checkForceCompare(e){this.timerMode==ut.FastPWM||this.timerMode==ut.PWMPhaseCorrect||this.timerMode==ut.PWMPhaseFrequencyCorrect||(e&Ne&&this.updateCompPin(this.compA,"A"),e&$e&&this.updateCompPin(this.compB,"B"),this.config.compPortC&&e&Js&&this.updateCompPin(this.compC,"C"))}updateCompPin(e,s,i=!1){let o=b.None,n=e===3,a=this.countingUp===n;switch(this.timerMode){case ne:case Lt:o=Xs(e);break;case G:e===1?o=i?b.None:b.Toggle:o=n!==i?b.Set:b.Clear;break;case K:case Dt:e===1?o=b.Toggle:o=a?b.Set:b.Clear;break}o!==b.None&&(s==="A"?this.updateCompA(o):s==="B"?this.updateCompB(o):this.updateCompC(o))}updateCompA(e){let{compPortA:s,compPinA:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompB(e){let{compPortB:s,compPinB:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}updateCompC(e){let{compPortC:s,compPinC:i}=this.config,o=this.cpu.gpioByPort[s];o?.timerOverridePin(i,e)}};var re={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198},Zs=128,Qs=64,Le=32;var ae=2,Ys=1,je=ae,ti=128,ei=64,si=32,jt=16,Kt=8,ze=4;var Ke=ze|jt|Kt;var ii=32,oi=16,ni=8,Ge=4,qe=2;var ai={5:31,6:63,7:127,8:255,9:255},kt=class{constructor(e,s,i){this.cpu=e,this.config=s,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.onRxComplete=null,this.onConfigurationChange=null,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer="",this.RXC={address:this.config.rxCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Zs,enableRegister:this.config.UCSRB,enableMask:ti,constant:!0},this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:Le,enableRegister:this.config.UCSRB,enableMask:si},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:Qs,enableRegister:this.config.UCSRB,enableMask:ei},this.reset(),this.cpu.writeHooks[s.UCSRA]=(o,n)=>{var a;return e.data[s.UCSRA]=o&(Ys|ae),e.clearInterruptByFlag(this.TXC,o),(o&je)!==(n&je)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRB]=(o,n)=>{var a;return e.updateInterruptEnable(this.RXC,o),e.updateInterruptEnable(this.UDRE,o),e.updateInterruptEnable(this.TXC,o),o&jt&&n&jt&&e.clearInterrupt(this.RXC),o&Kt&&!(n&Kt)&&e.setInterruptFlag(this.UDRE),e.data[s.UCSRB]=o,(o&Ke)!==(n&Ke)&&((a=this.onConfigurationChange)===null||a===void 0||a.call(this)),!0},this.cpu.writeHooks[s.UCSRC]=o=>{var n;return e.data[s.UCSRC]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.readHooks[s.UDR]=()=>{var o;let n=(o=ai[this.bitsPerChar])!==null&&o!==void 0?o:255,a=this.rxByte&n;return this.rxByte=0,this.cpu.clearInterrupt(this.RXC),a},this.cpu.writeHooks[s.UDR]=o=>{if(this.onByteTransmit&&this.onByteTransmit(o),this.onLineTransmit){let n=String.fromCharCode(o);n===`\n`?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=n}this.cpu.addClockEvent(()=>{e.setInterruptFlag(this.UDRE),e.setInterruptFlag(this.TXC)},this.cyclesPerChar),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)},this.cpu.writeHooks[s.UBRRH]=o=>{var n;return this.cpu.data[s.UBRRH]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0},this.cpu.writeHooks[s.UBRRL]=o=>{var n;return this.cpu.data[s.UBRRL]=o,(n=this.onConfigurationChange)===null||n===void 0||n.call(this),!0}}reset(){this.cpu.data[this.config.UCSRA]=Le,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=Ge|qe,this.rxBusyValue=!1,this.rxByte=0,this.lineBuffer=""}get rxBusy(){return this.rxBusyValue}writeByte(e,s=!1){var i;let{cpu:o}=this;if(this.rxBusyValue||!this.rxEnable)return!1;if(s)this.rxByte=e,o.setInterruptFlag(this.RXC),(i=this.onRxComplete)===null||i===void 0||i.call(this);else return this.rxBusyValue=!0,o.addClockEvent(()=>{this.rxBusyValue=!1,this.writeByte(e,!0)},this.cyclesPerChar),!0}get cyclesPerChar(){let e=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0);return(this.UBRR+1)*this.multiplier*e}get UBRR(){let{UBRRH:e,UBRRL:s}=this.config;return this.cpu.data[e]<<8|this.cpu.data[s]}get multiplier(){return this.cpu.data[this.config.UCSRA]&ae?8:16}get rxEnable(){return!!(this.cpu.data[this.config.UCSRB]&jt)}get txEnable(){return!!(this.cpu.data[this.config.UCSRB]&Kt)}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(Ge|qe))>>1|this.cpu.data[this.config.UCSRB]&ze){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return this.cpu.data[this.config.UCSRC]&ni?2:1}get parityEnabled(){return!!(this.cpu.data[this.config.UCSRC]&ii)}get parityOdd(){return!!(this.cpu.data[this.config.UCSRC]&oi)}};function Xe(t){let e=new Uint8Array(32768),s=0,i=!1;for(let[o,n]of String(t).split(/\\r?\\n/).entries()){let a=n.trim();if(!a)continue;if(!/^:([0-9a-f]{2})+$/i.test(a))throw new Error(`El .hex no es v\\xE1lido (l\\xEDnea ${o+1}).`);let r=a.slice(1).match(/../g).map(w=>parseInt(w,16));if(r.reduce((w,u)=>w+u,0)&255)throw new Error(`El .hex est\\xE1 da\\xF1ado (l\\xEDnea ${o+1}).`);let[f,R,x,m]=r,l=r.slice(4,4+f);if(m===0){let w=s+(R<<8|x);if(w+f>32768)throw new Error("El programa no cabe en la memoria del Uno.");e.set(l,w)}else if(m===1){i=!0;break}else m===2?s=(l[0]<<8|l[1])<<4:m===4&&(s=(l[0]<<8|l[1])<<16)}if(!i)throw new Error("El .hex est\\xE1 incompleto: falta la l\\xEDnea final.");return new Uint16Array(e.buffer)}var Y=16e6,ri=[[z,["D0","D1","D2","D3","D4","D5","D6","D7"]],[at,["D8","D9","D10","D11","D12","D13"]],[Yt,["A0","A1","A2","A3","A4","A5"]]];function Je(t){let e=new Pt(Xe(t));[se,ie,oe].forEach(u=>new vt(e,u));let s=new kt(e,re,Y),i=new bt(e,Qt),o=ri.map(([u,S])=>[new Mt(e,u),S]),n={};for(let[u,S]of o)S.forEach((A,E)=>n[A]=[u,E]);let a=null;i.onADCRead=u=>{let S=0;if(u.type===D.SingleEnded){let k=i.channelValues[u.channel]||0;S=a?a(u.channel,k):k}else u.type===D.Constant?S=u.voltage:u.type===D.Temperature&&(S=.378125);let A=Math.round(S*1e6)/1e6,E=Math.min(1023,Math.max(0,Math.floor(A/i.referenceVoltage*1024)));e.addClockEvent(()=>i.completeADCRead(E),i.sampleCycles)};let r=[],f=[],R=[],x=[],m=l();function l(){let u={};for(let[S,A]of o)A.forEach((E,k)=>u[E]=S.pinState(k));return u}for(let[u]of o)u.addListener(()=>{let S=l(),A={};for(let E in S)S[E]!==m[E]&&(A[E]=S[E]);m=S,Object.keys(A).length&&f.forEach(E=>E(A,S))});s.onByteTransmit=u=>R.forEach(S=>S(u));function w(u){let S=e.cycles+u;for(;e.cycles<S;){let A=Math.min(S,e.cycles+Y/1e3);for(;e.cycles<A;)Jt(e),e.tick();x.length&&!s.rxBusy&&(s.writeByte(x[0]),x.shift());for(let E of r)E()}}return{correr:w,estados:l,get ciclos(){return e.cycles},alCambiarPines:u=>f.push(u),alByteSerial:u=>R.push(u),enviarSerial:u=>x.push(...new TextEncoder().encode(u)),ponerAnalogico:(u,S)=>i.channelValues[u]=Math.max(0,Math.min(5,S)),ponerLectorAnalogico:u=>a=u,ponerEntrada(u,S){let A=n[u];A&&A[0].setPin(A[1],!!S)},alCadaMs:u=>r.push(u)}}var ci=["a","b","c","d","e"],li=["f","g","h","i","j"],ce={"s+":11,"s-":20.6,a:39.8,b:49.4,c:59,d:68.6,e:78.2,f:107,g:116.6,h:126.2,i:135.8,j:145.4,"i-":164.6,"i+":174.2},fi=[["s+","superior","+"],["s-","superior","\\u2212"],["i-","inferior","\\u2212"],["i+","inferior","+"]],Ze={media:{nombre:"Media protoboard (400 puntos)",columnas:30,ancho:307.2,alto:185.2}},le=t=>14.4+(t-1)*9.6,hi=t=>t>=2&&(t-1)%6!==0,fe=new Map;function de(t="media"){if(fe.has(t))return fe.get(t);let e=Ze[t]||Ze.media,s=[];fe.set(t,s);for(let i=1;i<=e.columnas;i++){for(let o of ci)s.push({nombre:o+i,x:le(i),y:ce[o],tira:"arriba"+i});for(let o of li)s.push({nombre:o+i,x:le(i),y:ce[o],tira:"abajo"+i});for(let[o]of fi)hi(i)&&s.push({nombre:o+i,x:le(i),y:ce[o],tira:o})}return s}var he=new Map;function Qe(t="media"){if(he.has(t))return he.get(t);let e=new Map;he.set(t,e);for(let s of de(t))e.has(s.tira)||e.set(s.tira,[]),e.get(s.tira).push(s.nombre);return e}var di=[["GND1","GND2","GND3"],["A4","SDA"],["A5","SCL"]];function Bt(t,{presionados:e=new Set,conduccion:s=!1}={}){let i=new Map,o=a=>{for(i.has(a)||i.set(a,a);i.get(a)!==a;)i.set(a,i.get(i.get(a))),a=i.get(a);return a},n=(a,r)=>i.set(o(a),o(r));for(let a of di)a.forEach(r=>n("placa."+a[0],"placa."+r));for(let a of t.cables)n(a.de,a.a);if(t.protoboard){for(let a of Qe(t.protoboard.tipo).values())a.forEach(r=>n("protoboard."+a[0],"protoboard."+r));for(let a of t.componentes)if(a.en)for(let[r,f]of Object.entries(a.en))n(a.id+"."+r,f)}for(let a of t.componentes)a.tipo==="pulsador"?(n(a.id+".1i",a.id+".1d"),n(a.id+".2i",a.id+".2d"),e.has(a.id)&&n(a.id+".1i",a.id+".2i")):s&&a.tipo==="resistencia"?n(a.id+".1",a.id+".2"):s&&a.tipo==="potenciometro"&&(n(a.id+".GND",a.id+".SIG"),n(a.id+".SIG",a.id+".VCC"));return o}function Ce(t,e,s,i){e>=0&&(t[e][e]+=i),s>=0&&(t[s][s]+=i),e>=0&&s>=0&&(t[e][s]-=i,t[s][e]-=i)}function xe(t,e,s){e>=0&&(t[e]+=s)}var ct=(t,e)=>e>=0?t[e]:0;function _t(t,e,s){return{a:t,b:e,g:1/s,sellar(i){Ce(i,this.a,this.b,this.g)},corriente(i){return(ct(i,this.a)-ct(i,this.b))*this.g}}}function Ye(t){return{nodo:t,v:0,g:0,sellar(e,s){Ce(e,this.nodo,-1,this.g),xe(s,this.nodo,this.v*this.g)},corriente(e){return(this.v-ct(e,this.nodo))*this.g}}}function ts(t,e){return{nodo:t,v:e,fila:-1,sellar(s,i){s[this.nodo][this.fila]+=1,s[this.fila][this.nodo]+=1,i[this.fila]+=this.v},corriente(s){return-s[this.fila]}}}function es(t,e,{Is:s,n:i}){let o=i*.025693,n=o*Math.log(o/(Math.SQRT2*s));return{a:t,k:e,noLineal:!0,vd:0,sellar(a,r){let f=Math.exp(this.vd/o),R=s*(f-1),x=s*f/o+1e-12,m=R-x*this.vd;Ce(a,this.a,this.k,x),xe(r,this.a,-m),xe(r,this.k,m)},actualizar(a){let r=ct(a,this.a)-ct(a,this.k),f=Math.abs(r-this.vd);return this.vd=xi(r,this.vd,o,n),f},corriente(a){let r=ct(a,this.a)-ct(a,this.k);return s*Math.expm1(r/o)}}}function xi(t,e,s,i){if(t>i&&Math.abs(t-e)>2*s){if(e>0){let o=1+(t-e)/s;return o>0?e+s*Math.log(o):i}return s*Math.log(t/s)}return t}function ss(t,{maxIter:e=200,tolerancia:s=1e-9}={}){let i=t.nodos+t.fuentes,o=t.elementos.filter(a=>a.noLineal),n=new Float64Array(i);for(let a=1;a<=e;a++){let r=Array.from({length:i},()=>new Float64Array(i)),f=new Float64Array(i);for(let x of t.elementos)x.sellar(r,f);for(let x=0;x<t.nodos;x++)r[x][x]+=1e-12;if(n=Ci(r,f),!o.length)return{x:n,iteraciones:a,convergio:!0};let R=0;for(let x of o)R=Math.max(R,x.actualizar(n));if(R<s)return{x:n,iteraciones:a,convergio:!0}}return{x:n,iteraciones:e,convergio:!1}}function Ci(t,e){let s=e.length;for(let o=0;o<s;o++){let n=o;for(let a=o+1;a<s;a++)Math.abs(t[a][o])>Math.abs(t[n][o])&&(n=a);if(Math.abs(t[n][o])<1e-15)throw new Error("La red no tiene soluci\\xF3n (dos fuentes en corto).");[t[o],t[n]]=[t[n],t[o]],[e[o],e[n]]=[e[n],e[o]];for(let a=o+1;a<s;a++){let r=t[a][o]/t[o][o];if(r){for(let f=o;f<s;f++)t[a][f]-=r*t[o][f];e[a]-=r*e[o]}}}let i=new Float64Array(s);for(let o=s-1;o>=0;o--){let n=e[o];for(let a=o+1;a<s;a++)n-=t[o][a]*i[a];i[o]=n/t[o][o]}return i}var lt={voltios:5,rAlto:25,rBajo:22,rPullUp:35e3,maxmA:40},ue=[...Array.from({length:14},(t,e)=>"D"+e),"A0","A1","A2","A3","A4","A5"],pi={A4:"SDA",A5:"SCL"},N={vf:{rojo:2,amarillo:2.05,verde:2.2,azul:3.1,blanco:3.1},n:2,rs:5,iRef:.02,normalmA:20,quemamA:30,plenomA:15},gi=.25,is={minimo:1};function mi(t){let s=(N.vf[t]||N.vf.rojo)-N.iRef*N.rs;return{Is:N.iRef/Math.expm1(s/(N.n*.025693)),n:N.n}}var os={led:["anodo","catodo"],resistencia:["1","2"],potenciometro:["GND","SIG","VCC"],pulsador:["1i","1d","2i","2d"],servo:["GND","VCC","SIG"]};function ns(t,{quemados:e=new Set,presionados:s=new Set}={}){let i=Bt(t,{presionados:s}),o=Bt(t,{presionados:s,conduccion:!0}),n=i("placa.GND1"),a=new Map,r=0,f=d=>{let C=i(d);return C===n?-1:(a.has(C)||a.set(C,r++),a.get(C))},R=d=>i(d)===n?-1:a.get(i(d)),x=[],m=[],l=[],w=new Set(t.cables.flatMap(d=>[d.de,d.a])),u=[];if(t.protoboard){let d=new Set([...w].map(i));for(let C of t.componentes)for(let T of Object.keys(C.en||{}))d.add(i(C.id+"."+T));for(let C of de(t.protoboard.tipo)){let T="protoboard."+C.nombre;d.has(i(T))&&u.push(T)}}let S=new Map;for(let[d,C]of[["5V",5],["3V3",3.3]]){if(!w.has("placa."+d))continue;let T=f("placa."+d),y=T===-1?"GND":S.get(T);if(y){l.push({tipo:"cortocircuito",componente:"placa."+d,mensaje:`El pin ${d} est\\xE1 unido directo a ${y}: es un cortocircuito.`});continue}S.set(T,d);let p=ts(T,C);m.push(p),x.push(p)}let A={};for(let d of ue)!w.has("placa."+d)&&!w.has("placa."+pi[d])||(A[d]=Ye(f("placa."+d)),x.push(A[d]));let E=[],k=[],O=[];for(let d of t.componentes)if(d.tipo==="resistencia"){let C=_t(f(d.id+".1"),f(d.id+".2"),Number(d.props.ohmios)||1);E.push({id:d.id,ohmios:Number(d.props.ohmios)||1,el:C}),C.a!==C.b&&x.push(C)}else if(d.tipo==="led"){let C=f(d.id+".anodo"),T=f(d.id+".catodo"),y={id:d.id,a:C,k:T,quemado:e.has(d.id)};if(!y.quemado&&C!==T){let p=r++;y.rs=_t(C,p,N.rs),y.diodo=es(p,T,mi(d.props.color)),x.push(y.rs,y.diodo)}k.push(y)}else if(d.tipo==="potenciometro"){let C=Number(d.props.ohmios)||1e4,T=Math.max(0,Math.min(1,Number(d.props.posicion))),y=f(d.id+".GND"),p=f(d.id+".SIG"),U=f(d.id+".VCC"),Z=_t(y,p,Math.max(is.minimo,C*T)),ht=_t(p,U,Math.max(is.minimo,C*(1-T)));for(let et of[Z,ht])et.a!==et.b&&x.push(et);O.push({id:d.id,ohmios:C,posicion:T,bajo:Z,alto:ht})}m.forEach((d,C)=>d.fila=r+C);function ft(d){let C=new Set([o("placa.GND1")]);for(let T of["5V","3V3"])w.has("placa."+T)&&C.add(o("placa."+T));for(let T of ue){let y=d[T];(y===v.High||y===v.Low||y===v.InputPullUp)&&C.add(o("placa."+T))}return C}let q=new Set([...w,...u]);for(let d of t.componentes)for(let C of os[d.tipo]||[])q.add(d.id+"."+C);return{fallasFijas:l,flotantes(d){let C=ft(d),T=new Set;for(let y of ue)d[y]===v.Input&&!C.has(o("placa."+y))&&T.add(y);return T},refsAlAire(d){let C=ft(d),T=new Set;for(let y of q)C.has(o(y))||T.add(y);return T},ponerPines(d){for(let[C,T]of Object.entries(A)){let y=d[C];y===v.High?Object.assign(T,{v:lt.voltios,g:1/lt.rAlto}):y===v.Low?Object.assign(T,{v:0,g:1/lt.rBajo}):y===v.InputPullUp?Object.assign(T,{v:lt.voltios,g:1/lt.rPullUp}):Object.assign(T,{v:0,g:0})}},resolver(){let d=ss({nodos:r,fuentes:m.length,elementos:x}),C=p=>{let U=R(p);return U===void 0?null:U<0?0:d.x[U]},T={};for(let p of w)T[p]=C(p);for(let p of u)T[p]=C(p);for(let p of t.componentes)for(let U of os[p.tipo]||[])T[p.id+"."+U]=C(p.id+"."+U);let y=(p,U)=>p===null||U===null?null:p-U;return{convergio:d.convergio,iteraciones:d.iteraciones,voltajes:T,leds:k.map(p=>{let U=p.diodo?p.diodo.corriente(d.x):0;return{id:p.id,quemado:p.quemado,v:y(C(p.id+".anodo"),C(p.id+".catodo")),i:U,brillo:Math.max(0,Math.min(1,U*1e3/N.plenomA))}}),resistencias:E.map(p=>{let U=p.el.a===p.el.b?0:p.el.corriente(d.x);return{id:p.id,ohmios:p.ohmios,v:y(C(p.id+".1"),C(p.id+".2")),i:U,w:U*U*p.ohmios}}),pines:Object.entries(A).filter(([,p])=>p.g>0).map(([p,U])=>({pin:p,v:C("placa."+p),i:U.corriente(d.x)})),fuentes:m.map(p=>({pin:p.v===5?"5V":"3V3",i:p.corriente(d.x)})),potenciometros:O.map(p=>({id:p.id,ohmios:p.ohmios,posicion:p.posicion,v:y(C(p.id+".SIG"),C(p.id+".GND")),i:Math.abs(p.bajo.a!==p.bajo.b?p.bajo.corriente(d.x):p.alto.a!==p.alto.b?p.alto.corriente(d.x):0)}))}}}}function as(t,e){let s=o=>(Math.abs(o)*1e3).toFixed(0),i=[];if(e.danoComponentes){for(let o of t.leds)!o.quemado&&o.i*1e3>N.quemamA&&i.push({tipo:"led_quemado",componente:o.id,corriente_mA:+(o.i*1e3).toFixed(1),mensaje:`El LED ${o.id} se quem\\xF3: le pasaron ${s(o.i)} mA y aguanta unos ${N.normalmA} mA. Ponle una resistencia en serie (220 \\u03A9 sirve).`});for(let o of t.resistencias)o.w>gi&&i.push({tipo:"resistencia_caliente",componente:o.id,potencia_W:+o.w.toFixed(2),mensaje:`La resistencia ${o.id} se calienta: disipa ${o.w.toFixed(2).replace(".",",")} W y aguanta 0,25 W. Usa una de m\\xE1s ohmios.`})}if(e.limitePin){for(let o of t.pines)if(Math.abs(o.i)*1e3>lt.maxmA){let n=o.pin.startsWith("D")?"pin "+o.pin.slice(1):"pin "+o.pin;i.push({tipo:"corriente_pin",componente:"placa."+o.pin,corriente_mA:+(Math.abs(o.i)*1e3).toFixed(1),mensaje:`El ${n} entrega ${s(o.i)} mA y aguanta ${lt.maxmA} mA: en la placa real se puede da\\xF1ar. Revisa que haya una resistencia.`})}}return i}var Ot={sg90:{nombre:"SG90",engranajes:"pl\\xE1stico",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:200,arranque:650},cuerpo:"#2f6fd6",borde:"#1d4f9f",eje:"#f4f4f4"},mg90s:{nombre:"MG90S",engranajes:"metal",torque_kgcm:1.8,seg60:.1,mA:{reposo:10,movimiento:250,arranque:700},cuerpo:"#2b2b2b",borde:"#111111",eje:"#c9ccd1"}},J={pulsoMin:544,pulsoMax:2400,pulsoValidoMin:400,pulsoValidoMax:2700,bandaMuerta:5,arranqueMs:30,voltiosRef:4.8},Ri=t=>Math.max(0,Math.min(180,(t-J.pulsoMin)/(J.pulsoMax-J.pulsoMin)*180));function rs(t){let e=Ot[t]||Ot.sg90,s=90,i=90,o=null,n=0,a=!1;return{pulso(r){r<J.pulsoValidoMin||r>J.pulsoValidoMax||o!==null&&Math.abs(r-o)<J.bandaMuerta||(o=r,i=Ri(r))},avanzar(r,f){if(!(f>0)){a=!1,n=0;return}let R=60/(e.seg60*1e3)*(f/J.voltiosRef),x=i-s,m=Math.abs(x)>.01;m&&!a&&(n=J.arranqueMs),a=m,a&&(s+=Math.sign(x)*Math.min(Math.abs(x),R*r)),n=Math.max(0,n-r)},corriente(r){return r>0?(n>0?e.mA.arranque:a?e.mA.movimiento:e.mA.reposo)/1e3*(r/J.voltiosRef):0},estado:()=>({angulo:s,objetivo:i,pulso:o,moviendo:a,arrancando:n>0})}}var pt=9.6/2.54,Gt=57.6,cs=14.4,Xo={x:cs,ancho:32.2*pt},Si={x:cs+(32.2-22.2)/2*pt,ancho:22.2*pt,alto:11.8*pt},Jo={x:Si.x+5.9*pt,y:Gt},Zo=13.5*pt,pe=182.4;var Qo={GND:{x:pe,y:Gt-9.6,color:"#7a4a24"},VCC:{x:pe,y:Gt,color:"#d7263d"},SIG:{x:pe,y:Gt+9.6,color:"#f28c28"}};var L={voltios:5,ohmios:.4,limitePuertoA:1.5,placaA:.05,bodV:2.7,fusible:{sostieneA:.5,disparaA:1,segundosA8A:.15,enfriaS:3}};function ge(){let{sostieneA:t,segundosA8A:e,enfriaS:s}=L.fusible,i=(8**2-t**2)*e,o=0,n=!1;return{avanzar(a,r){let f=a/1e3;!n&&r>t?o+=(r**2-t**2)/i*f:o=Math.max(0,o-f/s),o>=1&&(n=!0),n&&o===0&&(n=!1)},get abierto(){return n},get calor(){return o},reiniciar(){o=0,n=!1}}}var ls=t=>Math.max(0,L.voltios-t*L.ohmios);var Ai=60,fs=[["A0"],["A1"],["A2"],["A3"],["A4","SDA"],["A5","SCL"]],hs=["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"],Ii=3,Ti=1.5,wi=1/120,Ei=.6*5/1024,Pi=.15;function ds({hex:t,circuito:e,activas:s={},semilla:i=Math.floor(Math.random()*2**32)}){let o=Mi(i),n=new Set,a=new Set,r=new Set,f=new Set,R={},x=new Map,m={},l=null,w=e,u=null,S=new Map,A=new Map,E=new Map,k=[],O="",ft=0,q={inicio:0,clave:""},d=null,C=null,T=0,y=0,p=[],U=new TextDecoder("utf-8"),Z=new Set,ht=new Set,et=[],dt=[],st=new Map,mt=0,Rt=ge(),$=!1,it=null,Ie=0,xt=L.voltios,qt=0,zt=0,Nt=0,$t=0,St=[],At=()=>(mt+l.ciclos)/Y*1e3,Te=c=>{let h="";for(let I in c)h+=c[I];return h};function Ht(){l=Je(t);let c=l.estados();O=Te(c),A.set(O,c),ft=0,E=new Map,k=[],q={inicio:0,clave:O},d=null,l.alCambiarPines((h,I)=>{we(),O=Te(I),A.has(O)||A.set(O,I),O===q.clave&&(d={tiempos:new Map(E),ciclo:l.ciclos}),ot(),st.size&&Rs(h)}),l.alCadaMs(Ts),l.alCadaMs(Ee);for(let h of st.values())h.subida=null;l.ponerLectorAnalogico(ws),l.alByteSerial(h=>{p.push(h),y=At()+Ai})}function we(){let c=l.ciclos;E.set(O,(E.get(O)||0)+(c-ft)),ft=c}function It(){u=ns(w,{quemados:Z,presionados:n}),S=new Map,ms()}function ms(){let c=Bt(w),h=(g,B)=>c(g)===c(B),I=new Map;for(let g of w.componentes){if(g.tipo!=="servo")continue;let B=Ot[g.props&&g.props.modelo]?g.props.modelo:"sg90",W=st.get(g.id),F=W&&W.modelo===B?W:{modelo:B,logico:rs(B),subida:null,sumaA:0,picoA:0,msVentana:0};F.senal=me.find(_=>h(g.id+".SIG","placa."+_))||null;let wt=h(g.id+".GND","placa.GND1"),Et=me.find(_=>h(g.id+".VCC","placa."+_));F.fuente=h(g.id+".VCC","placa.5V")?"5V":h(g.id+".VCC","placa.3V3")?"3V3":Et||null,F.conectado=wt&&(F.fuente==="5V"||F.fuente==="3V3"),Et&&wt&&Tt({tipo:"servo_alimentacion",componente:g.id,mensaje:`El servo ${g.id} toma la corriente del pin ${Et.replace(/^D/,"")}: un pin da hasta 40 mA y el servo pide unos ${Ot[B].mA.movimiento} mA al moverse. Conecta el cable rojo a 5V.`}),I.set(g.id,F)}st=I}function Rs(c){for(let h of st.values())!h.senal||!(h.senal in c)||(c[h.senal]===v.High?h.subida=l.ciclos:h.subida!==null&&(h.conectado&&!$&&h.logico.pulso((l.ciclos-h.subida)/Y*1e6),h.subida=null))}let Ss=c=>!c.conectado||$?0:c.fuente==="5V"?xt:3.3;function Ee(){let c=$?0:L.placaA+Ie;for(let h of st.values()){let I=Ss(h);h.logico.avanzar(1,I);let g=h.logico.corriente(I);h.sumaA+=g,h.picoA=Math.max(h.picoA,g),h.msVentana++,(h.fuente==="5V"||h.fuente==="3V3")&&(c+=g)}s.limiteUSB?(Rt.avanzar(1,c),xt=$?0:ls(c),!$&&!it&&(c>L.limitePuertoA||xt<L.bodV?it={motivo:"puerto",amperios:c}:Rt.abierto&&(it={motivo:"fusible",amperios:c}))):xt=L.voltios,zt+=c,Nt=Math.max(Nt,c),$t++}function As(){let{motivo:c,amperios:h}=it;it=null,c==="puerto"?Tt({tipo:"reinicio_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se reinici\\xF3: los servos y el circuito pidieron ${h.toFixed(1).replace(".",",")} A de golpe y el puerto USB da hasta unos ${String(L.limitePuertoA).replace(".",",")} A. Alimenta los servos con una fuente aparte y une su GND con el del Arduino.`}):(Tt({tipo:"fusible_usb",componente:"placa",corriente_mA:Math.round(h*1e3),mensaje:`La placa se apag\\xF3: el fusible del USB se calent\\xF3 porque se le pidieron ${Math.round(h*1e3)} mA por varios segundos y aguanta 500 mA. Vuelve a encender cuando se enfr\\xEDe. Alimenta los servos y motores con una fuente aparte.`}),$=!0),qt++,mt+=l.ciclos,Ht(),ot()}function Is(c){let h=Y/1e3,I=c;for(;I>0&&$;){let g=Math.min(I,h);mt+=g,I-=g,Ee(),Rt.abierto||($=!1)}I>0&&l.correr(I)}function Pe(){let c=At();St=St.filter(([I])=>c-I<1e3),St.push([c,Nt]);let h={amperios:$t?zt/$t:0,pico:Math.max(...St.map(([,I])=>I)),voltios:xt,fusible:Math.round(Rt.calor*100)/100,apagada:$,reinicios:qt};return zt=0,Nt=0,$t=0,h}function ye(){let c={};for(let[h,I]of st){let g=I.logico.estado();c[h]={modelo:I.modelo,angulo:Math.round(g.angulo*10)/10,pulso:g.pulso===null?null:Math.round(g.pulso),senal:I.senal,fuente:I.fuente,moviendo:g.moviendo,i:I.msVentana?I.sumaA/I.msVentana:I.logico.corriente(I.voltios),pico:I.picoA},I.sumaA=0,I.picoA=0,I.msVentana=0}return c}function ot(){if(!u||!l)return;let c=A.get(O)||l.estados(),h=Me(O),I=u.flotantes(c);a=new Set;for(let g of hs){let B=c[g];if(B!==v.Input&&B!==v.InputPullUp)continue;if(I.has(g)){a.add(g),g in R||(R[g]=o()<.5),l.ponerEntrada(g,s.entradaFlotante?R[g]:!1);continue}let W=h?h.voltajes["placa."+g]:null,F;typeof W=="number"?F=W>=Ii?!0:W<=Ti?!1:!!m[g]:F=B===v.InputPullUp,m[g]=F,l.ponerEntrada(g,F)}r=new Set,fs.forEach((g,B)=>{I.has(g[0])&&r.add(B)}),h&&Ue(h),f=u.refsAlAire(c)}function Ts(){if(!(!s.entradaFlotante||!a.size))for(let c of a)o()<wi&&(R[c]=!R[c],l.ponerEntrada(c,R[c]))}function ws(c,h){if(r.has(c)){if(!s.entradaFlotante)return 0;let I=x.has(c)?x.get(c):1+3*o(),g=Math.max(0,Math.min(5,I+be()*Pi));return x.set(c,g),g}return s.ruidoADC?h+be()*Ei:h}function be(){return Math.sqrt(-2*Math.log(1-o()))*Math.cos(2*Math.PI*o())}function Tt(c){let h=c.tipo+"|"+c.componente;return ht.has(h)?!1:(ht.add(h),et.push(c),dt.push(c),!0)}function Me(c){for(let h=0;h<4;h++){let I=S.get(c);if(I)return I;u.ponerPines(A.get(c));let g=null;try{g=u.resolver()}catch{g=null}if(T++,!g||!g.convergio)return Tt({tipo:"sin_solucion",componente:"circuito",mensaje:"El simulador no pudo calcular este circuito. Revisa si hay un corto."}),null;S.set(c,g);let B=!1;for(let W of[...u.fallasFijas,...as(g,s)])Tt(W)&&W.tipo==="led_quemado"&&(Z.add(W.componente),B=!0);if(!B)return g;It()}return S.get(c)||null}function Es(){if($)return Ps();we();let c=E;if(d&&d.ciclo>q.inicio){c=d.tiempos;let _=new Map;for(let[V,Q]of E){let ve=Q-(d.tiempos.get(V)||0);ve>0&&_.set(V,ve)}E=_,q={inicio:d.ciclo,clave:q.clave}}else E=new Map,q={inicio:l.ciclos,clave:O};d=null;let h=[...c].filter(([,_])=>_>0);h.length||(h=k.length?k:[[O,1]]),k=h;let I=h.reduce((_,[,V])=>_+V,0),g=[];for(let[_,V]of h){let Q=Me(_);if(!Q){g.length=0;break}g.push([Q,V/I])}C=g.length?bi(g):null,C&&(C.pwm=yi(h,I)),Ue();let B=l.estados(),W=p.length?U.decode(Uint8Array.from(p),{stream:!0}):"";p=[];let F=ye(),wt=Pe();if(Ie=C?C.fuentes.reduce((_,V)=>_+Math.max(0,V.i),0):0,C){C.usb=wt,C.servos=Object.entries(F).map(([V,Q])=>({id:V,...Q}));let _=(C.fuentes.find(V=>V.pin==="5V")||{i:0}).i;C.consumo5V=_+C.servos.filter(V=>V.fuente==="5V").reduce((V,Q)=>V+Q.i,0)}let Et=dt;return dt=[],{msSimulados:At(),servos:F,evaluaciones:T,leds:Object.fromEntries((C?C.leds:[]).map(_=>[_.id,_.brillo])),quemados:[...Z],voltajes:ys(),entradas:bs(),placa:{led13:B.D13===v.High,ledTX:At()<y},serial:W,fallas:Et,medicion:C,energia:wt}}function Ps(){let c=dt;return dt=[],{msSimulados:At(),evaluaciones:T,servos:ye(),energia:Pe(),leds:{},quemados:[...Z],voltajes:{},entradas:{},placa:{led13:!1,ledTX:!1,encendida:!1},serial:"",fallas:c,medicion:null}}function ys(){if(!C)return{};if(!f.size)return C.voltajes;let c={...C.voltajes};for(let h of f)h in c&&(c[h]=null);return c}function bs(){let c={};for(let h of hs)a.has(h)?c[h]={alto:!!s.entradaFlotante&&!!R[h],alAire:!0}:h in m&&(c[h]={alto:m[h],alAire:!1});return c}function Ue(c=C){c&&fs.forEach((h,I)=>{for(let g of h){let B=c.voltajes["placa."+g];if(typeof B=="number")return l.ponerAnalogico(I,B)}})}function Ms(){Z.clear(),ht.clear(),et.length=0,dt=[],p=[],U=new TextDecoder("utf-8"),y=0,De(),Ht(),It(),ot()}function De(){mt=0,$=!1,it=null,St=[],Rt.reiniciar(),xt=L.voltios}return Ht(),It(),ot(),{get ciclos(){return mt+l.ciclos},avanzar(c){if($)return Is(c);l.correr(c),it&&As()},foto:Es,ponerCircuito(c){w=c,It(),ot()},ponerPulsador(c,h){h?n.add(c):n.delete(c),It(),ot()},enviarSerial:c=>l.enviarSerial(String(c)),reiniciarChip(){De(),Ht(),ot()},reiniciarTodo(){qt=0,Ms()},fallas:()=>[...et]}}function yi(t,e){if(t.length<2)return{};let s={},i=new Set;for(let[a,r]of t)for(let f=0;f<a.length;f++){let R=+a[f]===v.High;s[f]=(s[f]||0)+(R?r:0),i.add(f)}let o=me,n={};for(let a of i){let r=s[a]/e;r>0&&r<1&&(n[o[a]]=Math.round(r*1e3)/1e3)}return n}var me=["D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","A0","A1","A2","A3","A4","A5"];function bi(t){if(t.length===1)return t[0][0];let e=t[0][0],s=a=>a.reduce((r,[,f])=>r+f,0),i=a=>{let r=0;for(let[f,R]of t){let x=a(f);if(x==null)return null;r+=R*x}return r},o=(a,r,f)=>[...new Set(t.flatMap(([x])=>x[a].map(m=>m[r])))].map(x=>{let m={[r]:x},l=t.filter(([u])=>u[a].some(S=>S[r]===x)),w=s(l);for(let u of f)u==="i"?m.i=t.reduce((S,[A,E])=>S+E*((A[a].find(k=>k[r]===x)||{i:0}).i||0),0):m[u]=w?l.reduce((S,[A,E])=>S+E*(A[a].find(k=>k[r]===x)[u]||0),0)/w:null;return m}),n={};for(let a of Object.keys(e.voltajes))n[a]=i(r=>r.voltajes[a]);return{convergio:t.every(([a])=>a.convergio),iteraciones:Math.max(...t.map(([a])=>a.iteraciones||0)),voltajes:n,leds:e.leds.map((a,r)=>{let f=i(R=>R.leds[r]?R.leds[r].i:0);return{id:a.id,quemado:t.some(([R])=>R.leds[r]&&R.leds[r].quemado),v:i(R=>R.leds[r]?R.leds[r].v:null),i:f,brillo:Math.max(0,Math.min(1,f*1e3/N.plenomA))}}),resistencias:e.resistencias.map((a,r)=>({id:a.id,ohmios:a.ohmios,v:i(f=>f.resistencias[r].v),i:i(f=>f.resistencias[r].i),w:i(f=>f.resistencias[r].w)})),pines:o("pines","pin",["v","i"]),fuentes:o("fuentes","pin",["i"]),potenciometros:(e.potenciometros||[]).map((a,r)=>({id:a.id,ohmios:a.ohmios,posicion:a.posicion,v:i(f=>f.potenciometros[r].v),i:i(f=>f.potenciometros[r].i)}))}}function Mi(t){let e=t>>>0;return()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}var Ui=16,Di=8,vi=50,ki=500,Vt=Y/1e3,j=null,Ft=!1,xs=0,tt=0,Re=0,Cs=0,Ae=0,Se=!1,gt=[],us=new MessageChannel;us.port1.onmessage=ps;function ps(){Se=!1,_i()}function gs(t){Se||(Se=!0,t>0?setTimeout(ps,t):us.port2.postMessage(null))}function Bi(t){for(;gt.length&&t-gt[0][0]>ki;)gt.shift();let e=0,s=0;for(let[,i,o]of gt)e+=i,s+=o;return e>0?Math.min(1,s/(e*Vt)):1}function Wt(t=performance.now()){Cs=t;let e=j.foto();self.postMessage({tipo:"foto",corrida:xs,...e,velocidad:Bi(t),msReales:Ae})}function _i(){if(!Ft||!j)return;let t=performance.now(),e=Math.max(0,t-Re);Re=t,Ae+=e,tt=Math.min(tt+e*Vt,vi*Vt);let s=performance.now(),i=0;for(;tt>=1&&performance.now()-s<Di;){let o=j.ciclos;j.avanzar(Math.min(Math.floor(tt),Vt));let n=j.ciclos-o;tt-=n,i+=n}gt.push([t,e,i]),t-Cs>=Ui&&Wt(t),gs(tt>=Vt?0:2)}self.onmessage=t=>{let e=t.data||{};try{switch("corrida"in e&&(xs=e.corrida),e.tipo){case"crear":j=ds({hex:e.hex,circuito:e.circuito,activas:e.activas});break;case"iniciar":e.nuevo&&(j.reiniciarTodo(),Ae=0),Ft=!0,tt=0,Re=performance.now(),gt.length=0,Wt(),gs(0);break;case"pausar":Ft=!1;break;case"reiniciar":j.reiniciarChip(),tt=0,Wt();break;case"detener":Ft=!1;break;case"circuito":j.ponerCircuito(e.circuito),e.mostrar&&Wt();break;case"serial":j.enviarSerial(e.texto);break;case"pulsador":j.ponerPulsador(e.id,e.presionado),Ft||Wt();break}}catch(s){self.postMessage({tipo:"error",mensaje:String(s&&s.message||s)})}};self.postMessage({tipo:"listo"});})();\n';function Ir(r={}){let{lienzo:t,hex:o}=r,n=r.placa||"uno";if(n!=="uno")throw new Error("Este prototipo solo simula la placa \xABuno\xBB.");if(!t||typeof t._mostrar!="function")throw new Error("crearSimulador necesita un lienzo de TecnoCircuito.");if(typeof o!="string")throw new Error("crearSimulador necesita el programa en formato Intel HEX.");zr(o);let i=r.modo==="ideal"?"ideal":"realista",c=Object.fromEntries(qn.map(_=>[_,i==="realista"]));Object.assign(c,r.noIdealidades||{});let a=typeof r.alEvento=="function"?r.alEvento:null,u={serial:[],falla:[],estado:[]},d="detenido",m=!0,w=0,$=null,y=0,M={msSimulados:0,msReales:0,velocidad:1,evaluaciones:0},x=null,b=0,T=[],R=Gn(G);R.enviar({tipo:"crear",hex:o,circuito:t.circuito(),activas:c});function G(_){if(!m)return;if(_.tipo==="error")return console.error("TecnoCircuito:",_.mensaje);if(_.tipo!=="foto"||_.corrida!==w||d==="detenido")return;Object.assign(M,{msSimulados:_.msSimulados,msReales:_.msReales,velocidad:_.velocidad,evaluaciones:_.evaluaciones}),x=_.medicion?{..._.medicion,voltajes:_.voltajes,entradas:_.entradas}:null;for(let k of _.fallas){T.push(k),u.falla.forEach(E=>ut(E,{tipo:k.tipo,componente:k.componente,mensaje:k.mensaje}));let{mensaje:j,...vt}=k;ft("falla",vt)}let L=_.energia?_.energia.reinicios:0;L>b&&ft("reinicio_placa",{motivo:"energia_usb",nuevos:L-b,total:L}),b=L,_.serial&&u.serial.forEach(k=>ut(k,_.serial)),$=_,y||(y=requestAnimationFrame(Q))}function Q(){if(y=0,d==="detenido"||!$)return t._mostrar({simulando:d!=="detenido"});t._mostrar({simulando:!0,leds:$.leds,quemados:$.quemados,voltajes:$.voltajes,servos:$.servos||{},placa:{ledPower:$.placa.encendida!==!1,led13:$.placa.led13,ledTX:$.placa.ledTX}})}function ut(_,L){try{_(L)}catch(k){console.error(k)}}function ft(_,L){a&&ut(a,{t:Date.now(),origen:"simulador",tipo:_,datos:L})}function it(_){d=_,u.estado.forEach(L=>ut(L,_))}return typeof t._alPulsar=="function"&&t._alPulsar((_,L)=>{m&&R.enviar({tipo:"pulsador",id:_,presionado:L})}),t.alCambiar(_=>{m&&R.enviar({tipo:"circuito",circuito:_,mostrar:d!=="detenido",corrida:w})}),{iniciar(){if(!m||d==="corriendo")return;let _=d==="detenido";w++,_&&(T.length=0,x=null,$=null,b=0,Object.assign(M,{msSimulados:0,msReales:0,velocidad:1}),ft("simulacion_iniciada",{placa:n,modo:i})),it("corriendo"),R.enviar({tipo:"iniciar",nuevo:_,corrida:w})},pausar(){d==="corriendo"&&(w++,R.enviar({tipo:"pausar",corrida:w}),it("pausado"))},reiniciar(){!m||d==="detenido"||(w++,M.msSimulados=0,R.enviar({tipo:"reiniciar",corrida:w}),R.enviar({tipo:"iniciar",nuevo:!1,corrida:w}),b=0,ft("reinicio_placa",{motivo:"boton"}),it("reiniciado"),it("corriendo"))},detener(){d!=="detenido"&&(w++,R.enviar({tipo:"detener",corrida:w}),ft("simulacion_detenida",{ms_simulados:Math.round(M.msSimulados)}),it("detenido"),x=null,Q())},serialEnviar(_){d!=="detenido"&&R.enviar({tipo:"serial",texto:String(_)})},alSerial:_=>typeof _=="function"&&u.serial.push(_),alFalla:_=>typeof _=="function"&&u.falla.push(_),alEstado:_=>typeof _=="function"&&u.estado.push(_),medidas:()=>({...M,estado:d,hilo:R.hilo()}),destruir(){m&&(this.detener(),m=!1,cancelAnimationFrame(y),R.terminar())},_medidas(){return this.medidas()},_destruir(){this.destruir()},_mediciones:()=>d==="detenido"||!x?null:{...x,fallas:[...T],modo:i,activas:c}}}function Gn(r){let t=null,o="worker",n=!1,i=[],c=u=>{if(u&&u.tipo==="listo"){n=!0,i.length=0;return}r(u)};function a(){o="pagina",t=Un(c),i.splice(0).forEach(u=>t.postMessage(u))}try{if(!yo||typeof Worker!="function")throw new Error("sin Worker");let u=URL.createObjectURL(new Blob([yo],{type:"text/javascript"})),d=new Worker(u);d.onmessage=m=>{m.data&&m.data.tipo==="listo"&&URL.revokeObjectURL(u),c(m.data)},d.onerror=m=>{if(n)return console.error("TecnoCircuito:",m.message);m.preventDefault(),d.terminate(),a()},t=d}catch{a()}return{enviar(u){!n&&o==="worker"&&i.push(u),t.postMessage(u)},terminar:()=>t&&t.terminate(),hilo:()=>o}}function Un(r){let t={onmessage:null,postMessage:o=>setTimeout(()=>r(o))};return new Function("self",yo)(t),{postMessage:o=>setTimeout(()=>t.onmessage&&t.onmessage({data:o})),terminate:()=>t.onmessage=null}}window.TecnoCircuito=Object.freeze({VERSION:"0.0.5-prototipo",CONTRATO:1,PLACAS:Object.freeze(Object.keys(Vt)),crearLienzo:Tr,crearSimulador:Ir});})();
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
