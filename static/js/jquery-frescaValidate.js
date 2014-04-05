(function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(type,name){this.defaults.type=type;this.defaults.name=name},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);if(!settings.single.length){settings.single="metadata"}var data=$.data(elem,settings.single);if(data){return data}data="{}";if(settings.type=="class"){var m=settings.cre.exec(elem.className);if(m){data=m[1]}}else{if(settings.type=="elem"){if(!elem.getElementsByTagName){return undefined}var e=elem.getElementsByTagName(settings.name);if(e.length){data=$.trim(e[0].innerHTML)}}else{if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);if(attr){data=attr}}}}if(data.indexOf("{")<0){data="{"+data+"}"}data=eval("("+data+")");$.data(elem,settings.single,data);return data}}});$.fn.metadata=function(opts){return $.metadata.get(this[0],opts)}})(jQuery);(function($){$.fn.frescaValidate=function(options,validation_rules){var blurAction=false;var errors=$("<ul>").attr("class","validationErrorsList");var fieldErrors=$("<ul>").attr("class","validationFieldErrors");var that=this;var opts=$.extend({},$.fn.frescaValidate.defaults,options);var validateSelection;var validators=$.extend({},$.fn.frescaValidate.validators,validation_rules);var zindex;function initialise(){if($.browser.msie&&$.browser.version==6){opts.fade=false}validateSelection=$(that).find("input[type=radio], input[type=text], input[type=checkbox].validate, input[type=password], textarea, select").not(":button");if(opts.fullErrors&&$(opts.fullErrors_window).length<1){var errorsWindow;var outterDiv=(opts.fullErrors_window).split("#");if(outterDiv.length>1){errorsWindow=$("<"+outterDiv[0]+">").attr("id",outterDiv[1]);var innerDiv=(opts.fullErrors_content).split("#");if(innerDiv.length>1){var errorsContent=$("<"+innerDiv[0]+">").attr("id",innerDiv[1]);var prependToElement=$(opts.fullErrors_prepend_to);var insertAfterElement=$(opts.fullErrors_insert_after);if(insertAfterElement.length>0){insertAfterElement.after(errorsWindow.append(opts.fullErrors_message).append(errorsContent))}else{if(prependToElement.length>0){prependToElement.append(errorsWindow.append(opts.fullErrors_message).append(errorsContent))}}}}}var masterWindow=$("div."+opts.popup_window+":first");if(masterWindow.length==0){if(opts.popup_window_function){masterWindow=eval(opts.popup_window_function+"()")}else{masterWindow=$("<div>").attr("class",opts.popup_window);if(opts.popup_content){masterWindow=masterWindow.append($("<div>").attr("class",opts.popup_content))}}}zindex=opts.zIndexStart;validateSelection.each(function(){if(!($.browser.msie&&$.browser.version==6)){$(this).parent().hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});$(this).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})}if(opts.onBlur&&!($.browser.msie&&$.browser.version==6)){$(this).focus(function(){focusField($(this))});if($(this).hasClass("validate")){$(this).blur(function(){validateField($(this),0,false,false)})}}if($(this).hasClass("validate")){validateField($(this),0,false,true);var data=$(this).metadata();var infoPopup;if(opts.popup_window=="infoPopup"){infoPopup=$("<div>").attr("class","infoPopup")}else{infoPopup=masterWindow.clone().attr("id",$(this).attr("id")+"_validate_popup")}infoPopup.css("z-index",zindex);zindex++;if(opts.fade){infoPopup.fadeTo(1,0,function(){infoPopup.css("display","none")})}else{infoPopup.css("display","none")}emptyPopup(infoPopup);var fieldName=$(this).attr("name");formText="error text";if(opts.popup_window!="infoPopup"&&opts.popup_content!=false){infoPopup.find("div."+opts.popup_content).append(formText)}else{infoPopup.append(formText)}$("body").append(infoPopup)}})}function emptyPopup(infoPopup){if(opts.popup_window!="infoPopup"&&opts.popup_content!=false){infoPopup.find("div."+opts.popup_content).html("")}else{infoPopup.html("")}}function clearStyles(formField){formField.removeClass("valid").removeClass("invalid").removeClass("focus")}function focusField(formField){formField.addClass("focus");formField.parent().addClass("focus");if(formField.hasClass("validate")&&!formField.hasClass("ignore")){if(!opts.onSubmitPopup&&opts.onFocusPopup){if((formField).hasClass("invalid")){showAlert(formField)}}if(opts.formGuide){showAlert(formField)}}else{$(formField).blur(function(){$(formField).parent().removeClass("focus")})}}function showAlert(formField){var wnd=$("div#"+formField.attr("id")+"_validate_popup");wnd.css({position:"absolute",visibility:"hidden",display:"block"});positionPopup(wnd,formField,opts.offsetTop,opts.offsetLeft,opts.popup_position,opts.popup_centered_element);wnd.css({display:"none",visibility:"visible"});if(opts.fade){wnd.stop().css("display","block").fadeTo(opts.popup_fade_duration,opts.popup_opacity)}else{wnd.css("display","block")}if($.browser.msie&&$.browser.version==6){showIE6Frame(formField)}}function showIE6Frame(element){var popup_errors=element.parent().find("div."+opts.popup_window);var iframe_id=element.attr("id")+"_error_frame";var validate_errors_id=element.attr("id")+"_validate_popup";var validate_errors=$("div#"+validate_errors_id);$("body").prepend("<iframe id='"+iframe_id+"' frameBorder='0' src='/pws/blank.html'></iframe>");$("iframe#"+iframe_id).css({display:"block","z-index":opts.zIndexStart-1,position:"absolute",top:validate_errors.css("top"),left:validate_errors.css("left"),width:validate_errors.innerWidth(),height:validate_errors.innerHeight(),border:"0",opacity:"0"})}function hideAlert(formField){var wnd=$("div#"+formField.attr("id")+"_validate_popup");if(wnd.css("display")=="block"){if(opts.fade){wnd.stop().fadeTo(opts.popup_fade_duration,0,function(){wnd.css("display","none")})}else{wnd.css("display","none")}}formField.parent().removeClass("focus");if($.browser.msie&&$.browser.version==6){hideIE6Frame(formField)}}function hideIE6Frame(element){var frame=$("iframe#"+element.attr("id")+"_error_frame");frame.remove()}function addError(formField,fieldCounter,firstError,errorName,err,num){if(num!=null){err=err.replace("@NUM",num)}var fieldClass="validate_"+fieldCounter;if(!firstError){fieldClass+=" sub_error"}var wrapped_single_err=$("<li class='"+fieldClass+"'>"+err+"</li>");fieldErrors.append(wrapped_single_err);if(opts.fullErrors&&opts.fullErrors_addFieldName){var fieldLabel=formField.parent().find("label").html().replace("**","").replace("*","").replace(":","");err="<span class='field_name'>"+fieldLabel+"</span> - "+err}var wrapped_err=$("<li>");wrapped_err.attr("id","v"+formField.attr("id")+"_"+errorName).attr("class",fieldClass).html(err);errors.append(wrapped_err)}function runFullOutput(){if(opts.customFullError!=false){opts.customFullError(errors)}else{if(opts.fullErrors&&errors.children().length>0){$(opts.fullErrors_content).html(errors);$(opts.fullErrors_window).css("display","block")}else{if(opts.fullErrors){$(opts.fullErrors_window).css("display","none")}}}}function validateField2(formField,fieldCounter,d,data,preventErrors){var hasError=false;var firstError=true;for(var d in data.validate){if(formField.attr("type")=="checkbox"&&d=="required"){if(typeof validators.requiredCheckbox==="function"){hasError=true;if(!validators.requiredCheckbox(formField)){if(typeof data.validate.messages[d]==="string"&&!preventErrors){addError(formField,fieldCounter,firstError,d,data.validate.messages[d],data.validate[d]);firstError=false}}}}else{if(typeof validators[d]==="function"){hasError=true;if(!validators[d](formField.attr("value"),data.validate[d])){if(typeof data.validate.messages[d]==="string"&&!preventErrors){addError(formField,fieldCounter,firstError,d,data.validate.messages[d],data.validate[d]);firstError=false}}}}}return hasError}function validateField(formField,fieldCounter,preventErrors,pageLoad){var hasError=false;if(!opts.onSubmitPopup&&opts.onFocusPopup){hideAlert(formField)}fieldErrors=$("<ul>").attr("class","validationFieldErrors");if(!formField.hasClass("ignore")){var data=$(formField).metadata();for(var d in data.validate){if(d=="eitherOr"&&validators[d](formField.attr("value"),data.validate[d])){if(!preventErrors&&formField.val().length==0){preventErrors=true}}}var returnedError=false;var rWhen=false;for(var d in data.validate){if(d==="requiredWhen"&&!pageLoad){if(eval(data.validate.requiredWhen)){returnedError=validateField2(formField,fieldCounter,d,data,preventErrors)}rWhen=true}}if(!rWhen){returnedError=validateField2(formField,fieldCounter,d,data,preventErrors)}if(!hasError){hasError=returnedError}if(!preventErrors){if(fieldErrors.children().length>0){if(!pageLoad){formField.addClass("invalid");formField.parent().removeClass("valid");formField.parent().addClass("invalid");if(formField.parent().attr("id")=="terms_element"){$(this).find("label").addClass("invalid")}if(opts.onSubmitPopup||opts.onFocusPopup){if(opts.customFieldError==false){if(opts.popup_content){$("div#"+$(formField).attr("id")+"_validate_popup").find("div."+opts.popup_content).html(fieldErrors)}else{$("div#"+$(formField).attr("id")+"_validate_popup").html(fieldErrors)}if(formField.is("[type=checkbox]")){showAlert(formField)}if(opts.onSubmitPopup){showAlert(formField)}}else{opts.customFieldError(formField,fieldErrors)}}}}else{hideAlert(formField);formField.addClass("valid");formField.removeClass("invalid");formField.parent().removeClass("invalid");formField.parent().addClass("valid")}}}return hasError}initialise();function fullValidate(){errors.empty();var fieldCounter=0;validateSelection.each(function(){validateField($(this),fieldCounter,false,false);fieldCounter++});runFullOutput()}function applyBlurAction(){validateSelection.each(function(){$(this).blur(function(){fullValidate()})});blurAction=true}$(this).submit(function(e){if(!blurAction&&!($.browser.msie&&$.browser.version==6)){applyBlurAction()}fullValidate();if(errors.children().length>0){e.preventDefault()}else{if(opts.beforeSubmit){opts.beforeSubmit()}if(opts.overrideSubmit){e.preventDefault();opts.overrideSubmit()}if(opts.preventSubmit){e.preventDefault()}}});return $(this)};$.fn.frescaValidate.validators={required:function(text,value){if(value&&text.length>0){return true}return false},requiredCheckbox:function(formField){return formField.is(":checked")===true},minLength:function(text,value){if(text.length>=value){return true}return false},maxLength:function(text,value){if(text.length<=value){return true}return false},email:function(email,value){if(value){return/^[\w-+\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)}return false},equalTo:function(value,field){if($(field+":first").val()===value){return true}return false},eitherOr:function(text,field){if($(field+":first").val().length>0||text.length>0){return true}return false},digits:function(number,field){if(number){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false},numberFrance:function(number,value){var number=number.replace(/\s/g,"");if(value){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false},numberUK:function(number,value){var number=number.replace(/\s/g,"");if(value){if(/(^\d+$)|(^\d+\.\d+$)/.test(number)){return/^(?:(?:(?:00\s?|\+)[0-9]{2}\s?|0)[0-9]{10})$/.test(number)}}return false},numberGermany:function(number,value){var number=number.replace(/\s/g,"");if(value){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false},numberSpain:function(number,value){var number=number.replace(/\s/g,"");if(value){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false},mobileNumberUK:function(number,value){var number=number.replace(/\s/g,"");if(value){if(/(^\d+$)|(^\d+\.\d+$)/.test(number)){return/^(?:(?:(?:00\s?|\+)[0-9]{2}\s?|0)[0-9]{10})$/.test(number)}}return false},mobileNumberES:function(number,value){var number=number.replace(/\s/g,"");if(value){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false},mobileNumberDE:function(number,value){var number=number.replace(/\s/g,"");if(value){return/(^\d+$)|(^\d+\.\d+$)/.test(number)}return false}};$.fn.frescaValidate.extend=function(args){$.fn.frescaValidate.defaults=$.extend({},$.fn.frescaValidate.defaults,validation_rules)};$.fn.frescaValidate.defaults={offsetTop:13,offsetLeft:7,offsetTop_2:0,offsetLeft_2:-30,fade:true,formGuide:false,onBlur:true,onSubmitPopup:false,onFocusPopup:true,popup_window:"validation_popup",popup_content:"validation_popup_content",popup_window_function:"buildPopup",popup_opacity:0.95,popup_fade_duration:500,popup_centered_element:"validation_arrow",popup_position:"right",fullErrors:false,fullErrors_content:"div#validation_errors_content",fullErrors_window:"div#js_validation_errors",fullErrors_message:"",fullErrors_addFieldName:true,fullErrors_prepend_to:"div#main",fullErrors_insert_after:"h1#account_general_heading",customFullError:false,customFieldError:false,beforeSubmit:false,overrideSubmit:false,preventSubmit:false,zIndexStart:500}})(jQuery);function buildPopup(){var c=$("<div>").attr("class","validation_popup");var b=$("<span>").attr("class","validation_arrow");var a=$("<div>").attr("class","validation_popup_content");c.append(b).append(a);return c}function overlayHelper(){if(typeof $.fn.formOverlay.displayOverlay==="function"){$.fn.formOverlay.displayOverlay()}}var last_wnd;var last_formField;var last_offsetTop;var last_offsetLeft;var last_popupPosition;var last_centeredElement;function positionPopup(d,f,c,e,h,b){if(d!=null){last_wnd=d}if(f!=null){last_formField=f}if(c!=null){last_offsetTop=c}if(e!=null){last_offsetLeft=e}if(h!=null){last_popupPosition=h}if(b!=null){last_centeredElement=b}if(last_popupPosition=="right"){last_wnd.css({top:last_formField.offset().top-(last_wnd.height()/2)+last_offsetTop+"px",left:last_formField.offset().left+last_formField.width()+last_offsetLeft+"px"})}else{last_wnd.css({top:last_formField.offset({relativeTo:"body"}).top-last_wnd.height()+last_offsetTop+"px",left:last_formField.offset({relativeTo:"body"}).left+last_formField.width()-last_wnd.width()+last_offsetLeft+"px"})}if(last_centeredElement!=null){var a=last_wnd.find("."+last_centeredElement);if(a.length>0){a.css("margin-top",(last_wnd.height()-a.height())/2+"px")}}if($.browser.msie&&$.browser.version==6&&d==null){var g=last_formField.attr("id")+"_error_frame";$("iframe#"+g).css({top:last_wnd.css("top"),left:last_wnd.css("left")})}}$(document).ready(function(){$("form.validate").each(function(){if($.browser.msie&&$.browser.version==6){getErrorLang();if($("body").is(".ly_paymentdetails")){$(this).frescaValidate({beforeSubmit:overlayHelper,onFocusPopup:false,onBlur:false,fullErrors:true})}else{$(this).frescaValidate({onFocusPopup:false,onBlur:false,fullErrors:true})}}else{if($("body").is(".ly_paymentdetails")){$(this).frescaValidate({beforeSubmit:overlayHelper})}else{$(this).frescaValidate()}}})});function getErrorLang(){errorHeaderLang={en:"Sorry, please correct the following to continue:",fr:"D&#233;sol&#233;s, veuillez corriger les saisies suivantes pour continuer:",de:"Bitte korrigieren Sie folgendes um fortzufahren:",es:"Lo sentimos, por favor corregir lo siguiente para continuar:"};if($("body").is("#en")){var a=errorHeaderLang.en}else{if($("body").is("#fr")){var a=errorHeaderLang.fr}else{if($("body").is("#de")){var a=errorHeaderLang.de}else{if($("body").is("#es")){var a=errorHeaderLang.es}}}}$.fn.frescaValidate.defaults.fullErrors_message='<div class="validation_errors_title">'+a+"</p>"};