define({


    /**
    	* @function  formPreShowAction
        * @description This function is invoked at the preshow of the form and checks 
        			whether the wifi info is fetched at the app init or not. 
        			If the wifi info is already fetched it will display the 
                    result or else it will fetch the wifi info 
        * @private
    */
    formPreShowAction: function() {
      let accelerateEventData = kony.store.getItem("accelerateEventData");
      if(!kony.sdk.isNullOrUndefined(accelerateEventData)){
        let wifiInformation = accelerateEventData.wifiInformation;
        let wifiUserName = (wifiInformation.hasOwnProperty("wifi_name")) ? wifiInformation.wifi_name : "";
        let wifiPassword = (wifiInformation.hasOwnProperty("wifi_password")) ? wifiInformation.wifi_password : "";
        this.view.lblNetworkName.text = wifiUserName;
        this.view.lblPasswordValue.text = wifiPassword;
      }
    },

});