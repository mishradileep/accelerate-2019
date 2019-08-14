  isWifiInfoFetched = false;
  /**
   * @function appPreShow
   * @description This function is invoked in the post appinit which is used to fetch the wifi information of the event
   * @private
   */
  function appPreShow() {
      let objectServiceName = eventConstants.OBJECT_SERVICE_NAME;
      let dataObject = eventConstants.WIFI_OBJECT_NAME;
      let queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
      };
      fetchObjectData(objectServiceName, dataObject, queryParams, wifiFetchSuccess, wifiFetchFailure);
  }
  /**
   * @function wifiFetchSuccess
   * @description This is the success callback of the wifi information fetch call
   * @param successResponse The success response of the wifiFetch object
   * @private
   */
  function wifiFetchSuccess(successResponse) {
      let wifiInfoRecords = successResponse.records[0];
      wifiName = wifiInfoRecords.wifi_name;
      wifiPassword = wifiInfoRecords.wifi_password;
      isWifiInfoFetched = true;

  }
  /**
   * @function wifiFetchFailure
   * @description This is the error callback of the wifi information fetch call
   * @param failureResponse The failure response of the wifiFetch object
   * @private
   */
  function wifiFetchFailure(failureResponse) {
      kony.print(eventConstants.GENERIC_EXCEPTION_MESSAGE);
      isWifiInfoFetched = false;
  }