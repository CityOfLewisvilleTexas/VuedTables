(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)i=s[u],n[i]&&d.push(n[i][0]),n[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},n={app:0},o=[];function i(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"92be922c"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a=n[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise(function(t,r){a=n[e]=[t,r]});t.push(a[2]=r);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(e),o=function(t){c.onerror=c.onload=null,clearTimeout(l);var a=n[e];if(0!==a){if(a){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,a[1](i)}n[e]=void 0}};var l=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/gitlocal/cade/autotables/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var p=l;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0066":function(e,t,a){},"034f":function(e,t,a){"use strict";var r=a("1356"),n=a.n(r);n.a},1356:function(e,t,a){},"1fdb":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"card"}},[a("div",[a("DownloadButton",{attrs:{jsonData:e.data,color:"primary",title:e.title,buttonText:"Download All Data"}}),e.filteredData.length!==e.data.length?a("DownloadButton",{attrs:{color:"warning",jsonData:e.filteredData,title:e.title,buttonText:"Download Filtered Data"}}):e._e()],1),a("table",[a("thead",[a("tr",e._l(e.headers,function(t,r){return a("th",{key:r},[e.sort.key===t?a("v-btn",{attrs:{color:"info"},on:{click:function(a){return e.sortData(t)}}},[e._v("\n            "+e._s(e.prettyHeader(t))+"\n             \n                "),!0===e.sort.asc?a("span",[a("v-icon",[e._v("arrow_drop_up")])],1):e._e(),!1===e.sort.asc?a("span",[a("v-icon",[e._v("arrow_drop_down")])],1):e._e()]):a("v-btn",{attrs:{dark:""},on:{click:function(a){return e.sortData(t)}}},[e._v("\n              "+e._s(e.prettyHeader(t))+"\n            ")]),a("form",[a("input",{staticStyle:{display:"none"},attrs:{type:"text"},domProps:{value:t}}),a("input",{staticClass:"form-control",attrs:{placeholder:"Filter",type:"text"},on:{blur:e.blurOnFilterField,keypress:e.keyPressOnFilterField}})])],1)}),0),e._l(e.filteredData,function(t,r){return a("tr",{key:r},e._l(e.headers,function(r,n){return a("td",{key:n,class:{none:""===t[r]||"NULL"===t[r]||null===t[r]}},[e.isBase64(t[r])||e.isImageUrl(t[r])||e.isLink(t[r])?e._e():a("div",[e._v(e._s(t[r]||"NULL"))]),e.isBase64(t[r])?a("img",{staticClass:"img img-responsive",attrs:{src:"data:image/jpg;base64,"+t[r]}}):e._e(),e.isImageUrl(t[r])?a("img",{staticClass:"img img-responsive",attrs:{src:t[r]}}):e._e(),!e.isImageUrl(t[r])&&e.isLink(t[r])?a("a",{attrs:{href:t[r]}},[e._v(e._s(t[r]||"NULL"))]):e._e()])}),0)})],2)])])},n=[],o=(a("6b54"),a("a481"),a("55dd"),a("7618")),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-btn",{class:e.buttonClass+"btn",attrs:{color:e.color},on:{click:e.JSONtoCSVConvertor}},[e._v(e._s(e.buttonText)+" ("+e._s(e.jsonData.length)+" results)")])},s=[],c=(a("ac6a"),a("456d"),{props:["jsonData","title","buttonText","buttonClass","color"],data:function(){return{}},methods:{JSONtoCSVConvertor:function(e,t,a){var r=function(e){var t=[];for(var a in e)"object"===Object(o["a"])(e[a])&&null!==e[a]||t.push(a);return t};e=this.jsonData,e.map(function(e){Object.keys(e).map(function(t){-1===r(e).indexOf(t)&&delete e[t]})}),t=this.title,a=!0;var n="object"!==Object(o["a"])(e)?JSON.parse(e):e,i="";if(i+=t+"\r\n\n",a){var s="";for(var c in n[0])s+="".concat(c,",");s=s.slice(0,-1),i+=s+"\r\n"}for(var l=0;l<n.length;l++){var u="";for(var c in n[l])null===n[l][c]&&(n[l][c]=""),u+='"'+n[l][c]+'",';u.slice(0,u.length),i+=u+"\r\n"}if(""!=i){var p="MyReport__";if(p+=t.replace(/ /g,"_"),navigator.msSaveBlob){var d=new Blob([i],{type:"text/csv;charset=utf-8;"});navigator.msSaveBlob(d,p+".csv")}else{var f="data:text/csv;charset=utf-8,"+encodeURIComponent(i),v=document.createElement("a");v.href=f;try{v.style="visibility:hidden"}catch(h){console.log(h)}v.download=p+".csv",document.body.appendChild(v),v.click(),document.body.removeChild(v)}}else alert("Invalid data")}}}),l=c,u=a("2877"),p=a("6544"),d=a.n(p),f=a("8336"),v=Object(u["a"])(l,i,s,!1,null,"daa4e93c",null),h=v.exports;d()(v,{VBtn:f["a"]});var m=a("c1df"),g=a.n(m),b={props:["updateData","data","title","items"],components:{DownloadButton:h},data:function(){return{filters:{},sort:{key:null,asc:null},imageFileExtensions:[".jpg",".png",".tiff",".gif",".webp",".bpg"]}},methods:{applyFilter:function(e,t){this.filters;""!==t?this.$set(this.filters,e,t):this.$delete(this.filters,e),console.log("Filters: ",this.filters)},blurOnFilterField:function(e){var t=e.target.form["0"].value,a=e.target.form["1"].value;this.applyFilter(t,a)},keyPressOnFilterField:function(e){if(13===e.keyCode){var t=e.target.form["0"].value,a=e.target.form["1"].value;this.applyFilter(t,a)}},sortData:function(e){for(var t=this.data,a=null,r=0;r<=t.length;r++)if(null!==t[r][e]){a=Object(o["a"])(t[r][e]);break}t=this.sort.key===e&&!this.sort.asc||this.sort.key!==e?t.sort(function(t,r){if("number"===a)return t[e]-r[e];if("string"===a){var n=t[e]||"",o=r[e]||"";if(n=n.toUpperCase(),o=o.toUpperCase(),"$"===n.substring(0,1)){var i=parseFloat(n.substring(1).replace(/,/g,"")),s=parseFloat(o.substring(1).replace(/,/g,""));return i-s}var c=new g.a(n),l=new g.a(o);return c._isValid||l._isValid?c.isBefore(l)?-1:c.isAfter(l)?1:0:n<o?-1:n>o?1:0}}):t.sort(function(t,r){if("number"===a)return r[e]-t[e];if("string"===a){var n=t[e]||"",o=r[e]||"";if("$"===n.substring(0,1)){var i=parseFloat(n.substring(1).replace(/,/g,"")),s=parseFloat(o.substring(1).replace(/,/g,""));return s-i}var c=new g.a(n),l=new g.a(o);return c._isValid||l._isValid?l.isBefore(c)?-1:l.isAfter(c)?1:0:n>o?-1:n<o?1:0}}),this.sort.key===e?(this.sort.key=e,this.sort.asc=!this.sort.asc):(this.sort.key=e,this.sort.asc=!0),this.updateData(this.title,t)},mappedData:function(e){return e.map(function(e,t){return e})},isBase64:function(e){return"string"===typeof e&&"/9j/"===e.substring(0,4)},formatHeaderforImgKey:function(e){return"AT_IMAGE_"===e.substring(0,9)?e.replace(/AT_IMAGE_/,""):e},isImageUrl:function(e){return"string"===typeof e&&("http"===e.substring(0,4)&&this.imageFileExtensions.indexOf(e.substring(e.length-4).toLowerCase())>-1)},isLink:function(e){return"string"===typeof e&&"http"===e.substring(0,4)},prettyHeader:function(e){return e.replace(/_/," ")},clearFilters:function(){this.filters={}}},mounted:function(){},computed:{headers:function(){var e=[];for(var t in this.data[0])e.push(t);return e},rows:function(){var e=this.headers,t=this.data;for(var a in t)for(var r in e)return a[r]},filteredData:function(){var e=this,t=this.data;for(var a in this.filters)t=t.filter(function(t){return t[a].toString().toUpperCase().indexOf(e.filters[a].toUpperCase())>-1});return t}},watch:{filters:function(){return this.filteredData},deep:!0}},w=b,_=(a("ec1b"),a("132d")),y=Object(u["a"])(w,r,n,!1,null,"972a8b4e",null);t["a"]=y.exports;d()(y,{VBtn:f["a"],VIcon:_["a"]})},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),n=a("bc3a"),o=a.n(n),i={},s=o.a.create(i);s.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),s.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=s,window.axios=s,Object.defineProperties(e.prototype,{axios:{get:function(){return s}},$axios:{get:function(){return s}}})},r["a"].use(Plugin);Plugin;var c=a("bb71");a("da64");r["a"].use(c["a"],{iconfont:"md"});var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-toolbar",{attrs:{app:""}},[a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[e._v("Auto")]),a("span",{staticClass:"font-weight-light"},[e._v("TABLES")])])],1),a("v-content",[a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[e.dataIsLoading?a("div",[a("Loader"),a("form",{staticClass:"form-inline"},e._l(e.parameters,function(t,r){return a("div",{key:r},[a("ParameterInput",{attrs:{index:r,parameter:t,updateFunction:e.updateParameterValue}}),a("v-btn",{attrs:{color:"success"},on:{click:e.getData}},[e._v("Submit")])],1)}),0)],1):a("v-card",[a("div",[a("title",[e._v(e._s(e.cleanWebserviceName))]),a("h1",[e._v(e._s(e.cleanWebserviceName))]),a("form",{staticClass:"form-inline"},e._l(e.parameters,function(t,r){return a("div",{key:r},[a("ParameterInput",{attrs:{index:r,parameter:t,updateFunction:e.updateParameterValue}}),a("v-btn",{attrs:{color:"success"},on:{click:e.getData}},[e._v("Submit")])],1)}),0),a("v-card",{attrs:{flat:"",id:"scroller"}},[a("v-btn",{attrs:{id:"scrollLeft",flat:""},on:{click:function(t){return e.setScroller("left")},mousedown:function(t){return e.setScroller("left")},mouseup:function(t){return e.setScroller("left")}}},[a("v-icon",{attrs:{large:""}},[e._v("arrow_left")])],1),a("span",[e._v("SCROLL")]),a("v-btn",{attrs:{id:"scrollRight",flat:""},on:{click:function(t){return e.setScroller("right")},mousedown:function(t){return e.setScroller("right")},mouseup:function(t){return e.setScroller("right")}}},[a("v-icon",{attrs:{large:""}},[e._v("arrow_right")])],1)],1),e._l(e.dataKeys,function(t,r){return a("div",{key:r,attrs:{id:"wrapper2"}},[a("DataTable",{attrs:{updateData:e.updateData,data:e.data[t],title:e.cleanWebserviceName}})],1)})],2)])],1)],1)],1)],1)],1)},u=[],p=(a("ac6a"),a("456d"),a("55dd"),a("7f7f"),a("3b2b"),a("a481"),a("28a5"),a("386d"),a("4328")),d=a.n(p),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"loader"},[a("svg",{staticStyle:{"enable-background":"new 0 0 50 50"},attrs:{version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"74px",height:"80px",viewBox:"0 0 24 30","xml:space":"preserve"}},[a("rect",{attrs:{x:"0",y:"0",width:"4",height:"20",fill:"#333"}},[a("animate",{attrs:{attributeName:"opacity",attributeType:"XML",values:"1; .2; 1",begin:"0s",dur:"0.6s",repeatCount:"indefinite"}})]),a("rect",{attrs:{x:"7",y:"0",width:"4",height:"20",fill:"#333"}},[a("animate",{attrs:{attributeName:"opacity",attributeType:"XML",values:"1; .2; 1",begin:"0.2s",dur:"0.6s",repeatCount:"indefinite"}})]),a("rect",{attrs:{x:"14",y:"0",width:"4",height:"20",fill:"#333"}},[a("animate",{attrs:{attributeName:"opacity",attributeType:"XML",values:"1; .2; 1",begin:"0.4s",dur:"0.6s",repeatCount:"indefinite"}})])])])},v=[],h=(a("80cf"),a("2877")),m={},g=Object(h["a"])(m,f,v,!1,null,"b38b4678",null),b=g.exports,w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.textTypes.indexOf(e.parameter["PARAMETER_TYPE"])>-1?a("div",[a("label",[e._v(e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"  ")]),a("input",e._b({ref:"input",attrs:{type:"text"},on:{change:e.updateValue}},"input",e.parameter,!1))]):"datetime"==e.parameter["PARAMETER_TYPE"]?a("div",[a("label",[e._v(e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"  ")]),a("input",e._b({ref:"input",attrs:{type:"datetime-local"},on:{change:e.updateValue}},"input",e.parameter,!1))]):"date"==e.parameter["PARAMETER_TYPE"]?a("div",[a("label",[e._v(e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"  ")]),a("input",e._b({ref:"input",attrs:{type:"date"},on:{change:e.updateValue}},"input",e.parameter,!1))]):e.numTypes.indexOf(e.parameter["PARAMETER_TYPE"])>-1?a("div",[a("label",[e._v(e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"  ")]),a("input",e._b({ref:"input",attrs:{type:"number"},on:{change:e.updateValue}},"input",e.parameter,!1))]):"bit"===e.parameter["PARAMETER_TYPE"]?a("div",[a("label",[e._v(e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"  ")]),a("input",e._b({ref:"input",attrs:{type:"checkbox"},on:{change:e.updateCheckboxValueToFalse}},"input",e.parameter,!1))]):a("div",[a("label",[a("input",e._b({ref:"input",attrs:{type:"checkbox"},on:{change:e.updateCheckboxValueToTrue}},"input",e.parameter,!1)),e._v("\r\n            "+e._s(e.parameter.name.replace(/@/,"").replace(/_/g," "))+"\r\n        ")])])])},_=[],y={props:["index","parameter","updateFunction"],data:function(){return{textTypes:["char","nvarchar","varchar","varbinary"],numTypes:["int","bigint","numeric","float","decimal"]}},methods:{updateValue:function(e){this.updateFunction(this.parameter,e.target.value)},updateCheckboxValueToTrue:function(e){this.updateFunction(this.parameter,!0)},updateCheckboxValueToFalse:function(e){this.updateFunction(this.parameter,!1)}},mounted:function(){console.log(this.index),0===this.index&&console.log("input",this.input)},computed:{textTypeIsParam:function(){}}},x=y,k=(a("7d9d"),Object(h["a"])(x,w,_,!1,null,"185106ce",null)),T=k.exports,E=a("1fdb"),S={name:"App",components:{Loader:b,ParameterInput:T,DataTable:E["a"]},data:function(){return{data:[],dataIsLoading:!1,webserviceName:"",parameters:[],parametersLoaded:!1,sort:{key:null,asc:null}}},methods:{initializeWebserviceInfo:function(){var e=this,t={};""!==window.location.search&&window.location.search.replace(/\?/,"").split("&").map(function(e){t[decodeURIComponent(e.split("=")[0])]=decodeURIComponent(e.split("=")[1])}),t["auth_token"]=localStorage.colAuthToken;var a={};for(var r in t)a[r.toUpperCase()]=t[r];a["WEBSERVICE"]||(t["webservice"]=window.location.hash.replace(/#/,""),a["WEBSERVICE"]=window.location.hash.replace(/#/,"")),this.webserviceName=a["WEBSERVICE"],axios.post(this.apiUrl,d.a.stringify({webservice:"ITS/Auto Tables/Is Oauth Required",webservice_name:a["WEBSERVICE"]})).then(function(e){var t=e.data;t[0][0]["OAUTH_REQUIRED"]&&function(){if("apps"===window.location.host)window.location="http://apps.cityoflewisville.com"+window.location.pathname+window.location.search+window.location.hash;else{var e=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=a.exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null},t=function(e){var t=window.location.href.substr(0,window.location.href.indexOf("?"));axios.post(n+"authenticate/",d.a.stringify({code:e,redirectUrl:t})).then(function(e){var t=e.data;localStorage.colAuthToken=t[0][0]["AUTH_TOKEN"],window.location=localStorage.redirectUrl})},a=function(){localStorage.redirectUrl=window.location.href,window.location="https://accounts.google.com/ServiceLogin?passive=1209600&continue=https://accounts.google.com/o/oauth2/auth?access_type%3Doffline%26scope%3Dhttps://www.googleapis.com/auth/userinfo.email%2Bhttps://www.googleapis.com/auth/userinfo.profile%26response_type%3Dcode%26redirect_uri%3D"+o+"%26client_id%3D819027772449-2us5mt2tu1ec84nve9353qka8i6mfj68.apps.googleusercontent.com%26from_login%3D1%26as%3D-64f2a1f67be9764b&oauth=1&sarp=1&scc=1#identifier"},r=function(e){axios.post(n+"v2",d.a.stringify({webservice:"ITS/Verify Auth Token",auth_token:e})).then(function(e){var t=e.data;0==t["Verification"][0]["VERIFIED"]?a():(localStorage.removeItem("redirectUrl"),localStorage.colEmail=t["Verification"][0]["EMAIL"])})},n="https://ax1vnode1.cityoflewisville.com/",o="http://apps.cityoflewisville.com/oauthredirect/index.html",i=e("code");localStorage.colAuthToken?i?t(i):r(localStorage.colAuthToken):i?t(i):a()}}()}),axios.post(this.apiUrl,d.a.stringify({webservice:"ITS/Get Parameters For Webservice",webservice_name:decodeURI(this.webserviceName),auth_token:localStorage.colAuthToken})).then(function(t){var r=t.data,n=0;0===r.length&&(r[0]=[]),r[0].map(function(e,t){if(a[e["name"].replace(/@/,"").toUpperCase()])r[0][t]["value"]=a[e["name"].replace(/@/,"").toUpperCase()],n+=1;else{var o=["char","nvarchar","varchar","varbinary"];o.indexOf(e["PARAMETER_TYPE"])>-1?r[0][t]["value"]="":r[0][t]["value"]=null}}),e.parameters=r[0],e.parametersLoaded=!0,n===r[0].length&&e.getData()})},getData:function(e){var t=this,a={webservice:decodeURI(this.webserviceName),auth_token:localStorage.colAuthToken};this.parameters.map(function(e){"datetime"===e["PARAMETER_TYPE"]&&e["value"]&&(e["value"]=e["value"].replace(/T/,"")),a[e["name"].replace(/@/,"")]=e["value"]}),this.dataIsLoading=!0,axios.post(this.apiUrl,d.a.stringify(a)).then(function(e){var a=e.data;t.data=a,t.sort.key=null,t.sort.asc=null,t.dataIsLoading=!1}).catch(function(e){console.log(e);var a=[[{Error:"An error has occurred. Please contact the ITS Department. "}]];t.data=a,t.sort.key=null,t.sort.asc=null,t.dataIsLoading=!1})},updateData:function(e,t){var a=this.data;a[e]=t,this.data=a},updateParameterValue:function(e,t){var a=this.parameters;a.map(function(r,n){r["name"]===e["name"]&&(a[n]["value"]=t)}),this.parameters=a},setScroller:function(e){var t=document.querySelector("#wrapper2");"right"===e?t.scrollLeft+=50:"left"===e&&(t.scrollLeft-=50)}},computed:{apiUrl:function(){return"http://ax1vnode1.cityoflewisville.com/v2/"},cleanWebserviceName:function(){return decodeURI(this.webserviceName).replace(/_/g," ")},dataKeys:function(){return Object.keys(this.data)},returnedData:function(){var e=this;Object.keys(this.data).map(function(t){0===e.data[t].length&&(e.data[t][0]={},e.data[t][0]["Error"]="No results found")})}},mounted:function(){this.initializeWebserviceInfo()},watch:{"$route.hash":function(){this.initializeWebserviceInfo()}}},C=S,j=(a("034f"),a("6544")),D=a.n(j),O=a("7496"),I=a("8336"),A=a("b0af"),P=a("a523"),V=a("549c"),F=a("0e8f"),L=a("132d"),U=a("a722"),R=a("71d9"),N=a("2a7f"),B=Object(h["a"])(C,l,u,!1,null,null,null),M=B.exports;D()(B,{VApp:O["a"],VBtn:I["a"],VCard:A["a"],VContainer:P["a"],VContent:V["a"],VFlex:F["a"],VIcon:L["a"],VLayout:U["a"],VToolbar:R["a"],VToolbarTitle:N["a"]});var $=a("8c4f");r["a"].use($["a"]);var W=new $["a"]({mode:"history",base:"/gitlocal/cade/autotables/",routes:[{path:"/",name:"home",component:function(){return a.e("about").then(a.bind(null,"bb51"))}}]}),Y=a("2f62");r["a"].use(Y["a"]);var q=new Y["a"].Store({state:{},mutations:{},actions:{}}),H=a("9483");Object(H["a"])("".concat("/gitlocal/cade/autotables/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var z=a("c1df"),G=a.n(z);r["a"].config.productionTip=!1,r["a"].use({moment:G.a}),new r["a"]({router:W,store:q,render:function(e){return e(M)}}).$mount("#app")},"77ad":function(e,t,a){},"7d9d":function(e,t,a){"use strict";var r=a("0066"),n=a.n(r);n.a},"80cf":function(e,t,a){"use strict";var r=a("77ad"),n=a.n(r);n.a},ec1b:function(e,t,a){"use strict";var r=a("f64c"),n=a.n(r);n.a},f64c:function(e,t,a){},fd21:function(e,t,a){var r={"./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50"};function n(e){var t=o(e);return a(t)}function o(e){var t=r[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(r)},n.resolve=o,e.exports=n,n.id="fd21"}});
//# sourceMappingURL=app.c060b036.js.map