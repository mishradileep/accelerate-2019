var thisForm=null;
var debugLogs=false;
var devWidth=null;

function globalPreshow(){
  thisForm=kony.application.getCurrentForm();
  egLoggerPreshow();
  egLogger("thisForm = "+thisForm.id);
}

function assignFormEvents(){
  //thisForm.preShow=function(){frmCardListPreshow();};
  //thisForm.postShow=function(){frmCardListPostshow();};
}


function egLogger(logInput){
  //alert("logging");
  if (debugLogs==true){
  	var currentLog = thisForm['consoleRT'].text;
  	thisForm['consoleRT'].text=currentLog+"<br/>"+logInput;
  	thisForm['consoleScroll'].scrollToEnd();
    //var thisFormID = [thisForm].id;
  }
}

function egLoggerPreshow(){
   if (debugLogs==true){
     thisForm['consoleScroll'].isVisible=true;
   }
  else{
    thisForm['consoleScroll'].isVisible=false;
  }
}
function egLoggerClear(){
  thisForm.consoleRT.text="";
}
function roundNum(num, decimals) {
	var t=Math.pow(10, decimals);   
 	return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}

function disableDefaultLoadingScreen(){
  //#ifdef android
  kony.application.setApplicationBehaviors({
     "hideDefaultLoadingIndicator":true
  });
  //#endif
}


function checkForIphoneXSeries(){
//   var deviceInfo=kony.os.deviceInfo();
//   if(deviceInfo.model===eventConstants.IPHONE_X || deviceInfo.model===eventConstants.IPHONE_XS || deviceInfo.model===eventConstants.IPHONE_XS_MAX || deviceInfo.model===eventConstants.IPHONE_XR ){
//     return true;
//   }
//   else{
//     return false;
//   }
  return false;
}

