(function(g){if(/1\.(0|1|2)\.(0|1|2)/.test(g.fn.jquery)||/^1.1/.test(g.fn.jquery)){return}g.fn._fadeIn=g.fn.fadeIn;var i=document.documentMode||0;var d=g.browser.msie&&((g.browser.version<8&&!i)||i<8);var e=g.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!i;g.blockUI=function(o){c(window,o)};g.unblockUI=function(o){h(window,o)};g.growlUI=function(s,q,r,o){var p=g('<div class="growlUI"></div>');if(s){p.append("<h1>"+s+"</h1>")}if(q){p.append("<h2>"+q+"</h2>")}if(r==undefined){r=3000}g.blockUI({message:p,fadeIn:700,fadeOut:1000,centerY:false,timeout:r,showOverlay:false,onUnblock:o,css:g.blockUI.defaults.growlCSS})};g.fn.block=function(o){return this.unblock({fadeOut:0}).each(function(){if(g.css(this,"position")=="static"){this.style.position="relative"}if(g.browser.msie){this.style.zoom=1}c(this,o)})};g.fn.unblock=function(o){return this.each(function(){h(this,o)})};g.blockUI.version=2.23;g.blockUI.defaults={message:"<h1>Please wait...</h1>",css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:null,color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onUnblock:null,quirksmodeOffsetHack:4};var b=null;var f=[];function c(q,o){var B=(q==window);var r=o&&o.message!==undefined?o.message:undefined;o=g.extend({},g.blockUI.defaults,o||{});o.overlayCSS=g.extend({},g.blockUI.defaults.overlayCSS,o.overlayCSS||{});var A=g.extend({},g.blockUI.defaults.css,o.css||{});r=r===undefined?o.message:r;if(B&&b){h(window,{fadeOut:0})}if(r&&typeof r!="string"&&(r.parentNode||r.jquery)){var u=r.jquery?r[0]:r;var y={};g(q).data("blockUI.history",y);y.el=u;y.parent=u.parentNode;y.display=u.style.display;y.position=u.style.position;if(y.parent){y.parent.removeChild(u)}}var C=o.baseZ;var x=(g.browser.msie||o.forceIframe)?g('<iframe class="blockUI" style="z-index:'+(C++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+o.iframeSrc+'"></iframe>'):g('<div class="blockUI" style="display:none"></div>');var w=g('<div class="blockUI blockOverlay" style="z-index:'+(C++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var s=B?g('<div class="blockUI blockMsg blockPage" style="z-index:'+C+';display:none;position:fixed"></div>'):g('<div class="blockUI blockMsg blockElement" style="z-index:'+C+';display:none;position:absolute"></div>');if(r){s.css(A)}if(!o.applyPlatformOpacityRules||!(g.browser.mozilla&&/Linux/.test(navigator.platform))){w.css(o.overlayCSS)}w.css("position",B?"fixed":"absolute");if(g.browser.msie||o.forceIframe){x.css("opacity",0)}g([x[0],w[0],s[0]]).appendTo(B?"body":q);var F=d&&(!g.boxModel||g("object,embed",B?null:q).length>0);if(e||F){if(B&&o.allowBodyStretch&&g.boxModel){g("html,body").css("height","100%")}if((e||!g.boxModel)&&!B){var G=l(q,"borderTopWidth"),v=l(q,"borderLeftWidth");var E=G?"(0 - "+G+")":0;var p=v?"(0 - "+v+")":0}g.each([x,w,s],function(t,J){var z=J[0].style;z.position="absolute";if(t<2){B?z.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+o.quirksmodeOffsetHack+') + "px"'):z.setExpression("height",'this.parentNode.offsetHeight + "px"');B?z.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):z.setExpression("width",'this.parentNode.offsetWidth + "px"');if(p){z.setExpression("left",p)}if(E){z.setExpression("top",E)}}else{if(o.centerY){if(B){z.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')}z.marginTop=0}else{if(!o.centerY&&B){var H=(o.css&&o.css.top)?parseInt(o.css.top):0;var I="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+H+') + "px"';z.setExpression("top",I)}}}})}if(r){s.append(r);if(r.jquery||r.nodeType){g(r).show()}}if((g.browser.msie||o.forceIframe)&&o.showOverlay){x.show()}if(o.fadeIn){if(o.showOverlay){w._fadeIn(o.fadeIn)}if(r){s.fadeIn(o.fadeIn)}}else{if(o.showOverlay){w.show()}if(r){s.show()}}k(1,q,o);if(B){b=s[0];f=g(":input:enabled:visible",b);if(o.focusInput){setTimeout(n,20)}}else{a(s[0],o.centerX,o.centerY)}if(o.timeout){var D=setTimeout(function(){B?g.unblockUI(o):g(q).unblock(o)},o.timeout);g(q).data("blockUI.timeout",D)}}function h(r,s){var q=r==window;var p=g(r);var t=p.data("blockUI.history");var u=p.data("blockUI.timeout");if(u){clearTimeout(u);p.removeData("blockUI.timeout")}s=g.extend({},g.blockUI.defaults,s||{});k(0,r,s);var o=q?g("body").children().filter(".blockUI"):g(".blockUI",r);if(q){b=f=null}if(s.fadeOut){o.fadeOut(s.fadeOut);setTimeout(function(){j(o,t,s,r)},s.fadeOut)}else{j(o,t,s,r)}}function j(o,r,q,p){o.each(function(s,t){if(this.parentNode){this.parentNode.removeChild(this)}});if(r&&r.el){r.el.style.display=r.display;r.el.style.position=r.position;if(r.parent){r.parent.appendChild(r.el)}g(r.el).removeData("blockUI.history")}if(typeof q.onUnblock=="function"){q.onUnblock(p,q)}}function k(o,s,t){var r=s==window,q=g(s);if(!o&&(r&&!b||!r&&!q.data("blockUI.isBlocked"))){return}if(!r){q.data("blockUI.isBlocked",o)}if(!t.bindEvents||(o&&!t.showOverlay)){return}var p="mousedown mouseup keydown keypress";o?g(document).bind(p,t,m):g(document).unbind(p,m)}function m(r){if(r.keyCode&&r.keyCode==9){if(b&&r.data.constrainTabKey){var q=f;var p=!r.shiftKey&&r.target==q[q.length-1];var o=r.shiftKey&&r.target==q[0];if(p||o){setTimeout(function(){n(o)},10);return false}}}if(g(r.target).parents("div.blockMsg").length>0){return true}return g(r.target).parents().children().filter("div.blockUI").length==0}function n(o){if(!f){return}var p=f[o===true?f.length-1:0];if(p){p.focus()}}function a(v,o,z){var w=v.parentNode,u=v.style;var q=((w.offsetWidth-v.offsetWidth)/2)-l(w,"borderLeftWidth");var r=((w.offsetHeight-v.offsetHeight)/2)-l(w,"borderTopWidth");if(o){u.left=q>0?(q+"px"):"0"}if(z){u.top=r>0?(r+"px"):"0"}}function l(o,q){return parseInt(g.css(o,q))||0}})(jQuery);