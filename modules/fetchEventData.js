  /**
   * @function syncEventData
   * @description This function is used to sync the data with server and fetch is some data changes
   * @public
   */
  function syncEventData() {
      let isTimeStamp = kony.store.getItem("isTimeStampUpdated");
      if (isTimeStamp === null || isTimeStamp === undefined)
          kony.store.setItem("clientLastUpdatedTime", "2019-08-04T15:27:26Z");
      else {
              let storeEventData = kony.store.getItem("eventData");
              let storeEventSessionData = kony.store.getItem("eventSessionData");
              let storeSpeakerData = kony.store.getItem("eventSpeakerData");
              assignStoreDataToLocal(storeEventData, storeEventSessionData, storeSpeakerData);
      }
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.DATA_SYNC_OBJECT, {}, dataSyncFetchSuccess, dataSyncFetchFailure);
  }

  /**
   * @function dataSyncFetchSuccess
   * @description This function is invoked in the success response of data sync service
   * @param successResponse The success response of data sync service
   * @public
   */
  function dataSyncFetchSuccess(successResponse) {
      let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
      if (records !== null) {
          let serverLastUpdatedTime = records[0].LastUpdatedDateTime;
          let clientLastUpdatedTime = kony.store.getItem("clientLastUpdatedTime");
          if (serverLastUpdatedTime > clientLastUpdatedTime) {
              latestTimeStamp = serverLastUpdatedTime;
              fetchEventStaticData();
          } else {
              let storeEventData = kony.store.getItem("eventData");
              let storeEventSessionData = kony.store.getItem("eventSessionData");
              let storeSpeakerData = kony.store.getItem("eventSpeakerData");
              assignStoreDataToLocal(storeEventData, storeEventSessionData, storeSpeakerData);
          }
      }
  }
  /**
   * @function assignStoreDataToLocal
   * @description Used to assign store data to local data
   * @param eventData Event data
   * @param eventSessionData Event Session data
   * @param eventSpeakerData Event Speaker data
   * @public
   */
  function assignStoreDataToLocal(eventData, eventSessionData, eventSpeakerData) {
      if (eventData !== null && eventData !== undefined)
          accelerateEventData.eventdata = eventData;
      if (eventSessionData !== null && eventSessionData !== undefined)
          accelerateSessionData.eventSessionData = eventSessionData;
      if (eventSpeakerData !== null && eventSpeakerData !== undefined)
          accelerateSpeakerData.eventSpeakerData = eventSpeakerData;
  }
  /**
   * @function dataSyncFetchFailure
   * @description This function is invoked in the failure response of data sync service
   * @param failureResponse The failure response of data sync service
   * @public
   */
  function dataSyncFetchFailure(failureResponse) {
      kony.print("Error occured in fetching the event data");
      kony.print("Error occured is" + JSON.stringify(failureResponse));
  }

  /**
   * @function fetchEventStaticData
   * @description This function is used to fetch the event static data
   * @public
   */
  function fetchEventStaticData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
          "$expand": "event_inner_location,wifi_info,location"
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_OBJECT_NAME, queryParams, eventDataFetchSuccess, eventDataFetchFailure);
  }

  /**
   * @function eventDataFetchSuccess
   * @description This function is invoked in the success response of event data fetch service
   * @param successResponse The success response of event data fetch service
   * @public
   */
  function eventDataFetchSuccess(successResponse) {
      let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
      if (records !== null) {
          kony.store.setItem("eventData", successResponse);
          accelerateEventData.eventdata = successResponse;
          kony.print(accelerateEventData.eventdata);
          fetchEventSessionData();
      }
  }

  /**
   * @function eventDataFetchFailure
   * @description This function is invoked in the failure response of event data fetch service
   * @param failureResponse The failure response of event data fetch service
   * @public
   */
  function eventDataFetchFailure(failureResponse) {
      kony.print("Error occured in fetching the event data");
      kony.print("Error occured is" + JSON.stringify(failureResponse));
  }

  /**
   * @function fetchEventSessionData
   * @description This function is used to fetch the event session data
   * @public
   */
  function fetchEventSessionData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
          "$expand": "presenter,session_material",
          "$orderby": "session_start_date"
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_SESSIONS_OBJECT_NAME, queryParams, eventSessionDataFetchSuccess, eventSessionDataFetchFailure);
  }

  /**
   * @function eventSessionDataFetchSuccess
   * @description This function is invoked in the success response of event session data fetch service
   * @param successResponse The success response of event session data fetch service
   * @public
   */
  function eventSessionDataFetchSuccess(successResponse) {
      let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
      if (records !== null) {
          kony.store.setItem("eventSessionData", successResponse);
          accelerateSessionData.eventSessionData = successResponse;
          kony.print(accelerateSessionData.eventSessionData);
          fetchSpeakersData();
      }
  }

  /**
   * @function eventSessionDataFetchFailure
   * @description This function is invoked in the failure response of event session data fetch service
   * @param failure The failure response of event session data fetch service
   * @public
   */
  function eventSessionDataFetchFailure(failureResponse) {
      kony.print("Error occured in fetching the event data");
      kony.print("Error occured is" + JSON.stringify(failureResponse));
  }

  /**
   * @function fetchSpeakersData
   * @description This function is used to fetch the event speaker data
   * @public
   */
  function fetchSpeakersData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
          "$expand": "presenter"
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.PRESENTER_OBJECT_NAME, queryParams, speakerDataFetchSuccess, speakerDataFetchFailure);
  }

  /**
   * @function speakerDataFetchSuccess
   * @description This function is invoked in the success response of event speaker data fetch service
   * @param successResponse The success response of event speaker data fetch service
   * @public
   */
  function speakerDataFetchSuccess(successResponse) {
      let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
      if (records !== null) {
          kony.print(accelerateSpeakerData.eventSpeakerData);
          parseJSONResponse(successResponse);
          accelerateSpeakerData.eventSpeakerData = successResponse;
          kony.store.setItem("eventSpeakerData", successResponse);
          kony.store.setItem("clientLastUpdatedTime", latestTimeStamp);
          kony.store.setItem("isTimeStampUpdated", true);
      }
  }

  /**
   * @function speakerDataFetchFailure
   * @description This function is invoked in the failure response of event speaker data fetch service
   * @param failure The failure response of event speaker data fetch service
   * @public
   */
  function speakerDataFetchFailure(failureResponse) {
      kony.print("Error occured in fetching the event data");
      kony.print("Error occured is" + JSON.stringify(failureResponse));
  }

  /**
   * @function parseJSONResponse
   * @description This function is used to convert the stringified JSON objects into JSON Objects
   * @param successResponse The response from the service
   * @public
   */
  function parseJSONResponse(successResponse) {
      let recordsLength = successResponse.hasOwnProperty("records") ? successResponse.records.length : -1;
      if (recordsLength > 0) {
          for (let index = 0; index < recordsLength; index++) {
              let currentRecord = successResponse.records[index];
              currentRecord.sessionsList = JSON.parse(currentRecord.sessionsList);
              currentRecord.tracks = JSON.parse(currentRecord.tracks);
          }
      }
  }
