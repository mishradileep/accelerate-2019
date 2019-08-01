define({
    /**
    	* @function  formPostShowAction
        * @description This function is invoked at the preshow of the form and checks 
        			whether the wifi info is fetched at the app init or not. 
        			If the wifi info is already fetched it will display the 
                    result or else it will fetch the wifi info 
        * @private
    */
    formPostShowAction: function() {
        let accelerateEventData = kony.store.getItem("accelerateEventData");
        if (!kony.sdk.isNullOrUndefined(accelerateEventData)) {
            let wifiInformation = accelerateEventData.wifiInformation;
            let wifiUserName = (wifiInformation.hasOwnProperty("wifi_name")) ? wifiInformation.wifi_name : "";
            let wifiPassword = (wifiInformation.hasOwnProperty("wifi_password")) ? wifiInformation.wifi_password : "";
            this.view.lblNetworkName.text = wifiUserName;
            this.view.lblPasswordValue.text = wifiPassword;
          	this.view.flxWifiImageContainer.isVisible = true;
          	this.animateWifiCard("62%");
        } else {
            fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.WIFI_OBJECT_NAME, {}, this.wifiFetchSuccess.bind(this), this.wifiFetchFailure.bind(this));
        }
      	
    },
    /**
     * @function wifiFetchSuccess
     * @description This function is invoked in the success of wifi object and used to set the data to form
     * @param successResponse The success response of the wifi object
     * @private
     */
    wifiFetchSuccess: function(successResponse) {
        let wifiInfo = successResponse.hasOwnProperty("records") ? successResponse.records : null;
        if (wifiInfo !== null) {
            let wifiData = wifiInfo[0];
            let wifiUserName = (wifiData.hasOwnProperty("wifi_name")) ? wifiData.wifi_name : "";
            let wifiPassword = (wifiData.hasOwnProperty("wifi_password")) ? wifiData.wifi_password : "";
            this.view.lblNetworkName.text = wifiUserName;
            this.view.lblPasswordValue.text = wifiPassword;
          	this.view.flxWifiImageContainer.isVisible = true;
          	this.animateWifiCard("62%");
        } else {
            kony.print("Unable to fetch Wifi Info");
        }
    },
    /**
     * @function wifiFetchFailure
     * @description This function is invoked in the failure of wifi object and used to set the data to form
     * @param failureResponse The failure response of the wifi object
     * @private
     */
    wifiFetchFailure: function(failureResponse) {
        kony.print(eventConstants.GENERIC_EXCEPTION_MESSAGE);
        kony.print("Exception occured is" + JSON.stringify(failureResponse));
    },
    /**
     * @function animateWifiCard
     * @description This function is used to animate the wifi card from bottom to top
     * @private
     */
    animateWifiCard: function(finalTop) {
        this.view.flxWifiInfo.animate(
            kony.ui.createAnimation({
                100: {
                    top: finalTop,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: 0.5
            }, {
                animationEnd: function() {


                }
            });
    },
});
