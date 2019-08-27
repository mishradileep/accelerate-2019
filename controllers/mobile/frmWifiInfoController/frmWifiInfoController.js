define({
  /**
    	* @function  formPostShowAction
        * @description This function is invoked at the preshow of the form and checks 
        			whether the wifi info is fetched at the app init or not. 
        			If the wifi info is already fetched it will display the 
                    result or else it will fetch the wifi info 
        * @private
    */
   formInit:function(){
    this.isIphoneXSeries= checkForIphoneXSeries();
     if(this.isIphoneXSeries){
       this.view.flxMainContainer.top="-45dp";
       this.view.mobileheader.top="45dp";
     }
  },
  
  formWifiInfoPostShowAction: function() {
    let eventData = accelerateEventData.eventdata.records[0];
    if (!kony.sdk.isNullOrUndefined(eventData)) {
      let wifiInformation = eventData.wifi_info[0];
      let wifiUserName = (wifiInformation.hasOwnProperty("wifi_name")) ? wifiInformation.wifi_name : "";
      let wifiPassword = (wifiInformation.hasOwnProperty("wifi_password")) ? wifiInformation.wifi_password : "";
      this.view.lblNetworkName.text = wifiUserName;
      this.view.lblPasswordValue.text = wifiPassword;
      this.view.flxWifiImageContainer.isVisible = true;
      this.animateWifiCircles(this.view.flxWifiCircle1, 0, 3);
      this.animateWifiCircles(this.view.flxWifiCircle2, 0, 3);
      this.animateWifiCircles(this.view.flxWifiCircle3, 0, 3);
      this.animateWifiCard("62%");
    } 
  },

  /**
     * @function animateWifiCard
     * @description This function is used to animate the wifi card from bottom to top
     * @private
     */
  animateWifiCard: function(finalTop) {
    this.view.flxWifiInfo.animate(
      kony.ui.createAnimation({100: {top: finalTop, "stepConfig": {}}}),
      {delay: 0, fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.5},
      {animationEnd: function() {}});
  },

  /** @function animateWifiCircles
   *  @description Animate wifi circle.
   *  @param circleObj
   *	FlexContainer object.
   *  @param startDelay
   *	Delay to start animation.
   *  @param animationDuration
   *	Duration in seconds to finish animation.
   *
   *  @return
   *	void
   */
  animateWifiCircles: function(circleObj, startDelay, animationDuration) {
    var self = this;
    var transformObject0 = kony.ui.makeAffineTransform();
    var transformObject100 = kony.ui.makeAffineTransform();
    transformObject0.scale(0, 0);
    transformObject100.scale(5, 5);
    animationDef = {
      0: {"transform": transformObject0, "opacity": 1},
      100: {"transform": transformObject100, "opacity": 0},
    };
    animationConfig = {delay:startDelay, duration: animationDuration, fillMode: kony.anim.FILL_MODE_FORWARDS,iterationCount:0};
    animationDefObject = kony.ui.createAnimation(animationDef);
    circleObj.animate(animationDefObject,
                      animationConfig,
                      {animationEnd: function() {}}
                     );

  },

  /** @function animateOutOnClose
   *  @description Animate out info card and circle on form close.
   *
   *  @return
   *	void
   */
  animateOutOnClose: function() {
    var self = this;
    this.view.flxWifiImageContainer.isVisible = false;
    this.view.flxWifiInfo.animate(
      kony.ui.createAnimation({100: {top: '100%', "stepConfig": {}}}),
      {delay: 0, fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.5},
      {animationEnd: function() {
          new kony.mvc.Navigation('frmMore').navigate();
        }
      });
  }
});
