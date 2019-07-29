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
        var objectServiceName = "KonyAccelerateStorageService";
        var dataObject = "wifi_info";
        var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
        };
        if (!isWifiInfoFetched) {
            kony.application.showLoadingScreen(null, "Fetching Data");
            fetchObjectData(objectServiceName, dataObject, queryParams, this.wifiInfoFetchSuccess.bind(this),
                this.wifiInfoFetchFailure.bind(this));
        } else {
            this.view.lblNetworkName.text = wifiName;
            this.view.lblPasswordValue.text = wifiPassword;
            this.view.forceLayout();
        }
    },

    /**
     * @function wifiInfoFetchSuccess
     * @description This is the success callback of the wifi information fetch call
     * @param successResponse The success response of the wifiFetch object
     * @private
     */
    wifiInfoFetchSuccess: function(successResponse) {
        kony.application.dismissLoadingScreen();
        let wifiInfo = successResponse.records[0];
        let wifiName = wifiInfo.wifi_name;
        let wifiPassword = wifiInfo.wifi_password;
        this.view.lblNetworkName.text = wifiName;
        this.view.lblPasswordValue.text = wifiPassword;
    },

    /**
     * @function wifiInfoFetchFailure
     * @description This is the error callback of the wifi information fetch call
     * @param failureResponse The failure response of the wifiFetch object
     * @private
     */
    wifiInfoFetchFailure: function(failureResponse) {
        kony.application.dismissLoadingScreen();
        kony.print("Exception occured while fetching the wifi information");
        kony.print("Exception occured is " + JSON.stringify(failureResponse));
    },

});