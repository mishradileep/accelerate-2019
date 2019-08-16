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
          let storeSponsorData = kony.store.getItem("eventSponsorData");
          let storeTeamData = kony.store.getItem("eventTeamData");
          assignStoreDataToLocal(storeEventData, storeEventSessionData, storeSpeakerData, storeSponsorData, storeTeamData);
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
              let storeSponsorData = kony.store.getItem("eventSponsorData");
              let quantumData = kony.store.getItem("quantumQuestData");
              let storeTeamData = kony.store.getItem("eventTeamData");
              assignStoreDataToLocal(quantumData, storeEventData, storeEventSessionData, storeSpeakerData,storeSponsorData,storeTeamData);
              var nav = new kony.mvc.Navigation("frmAgenda");
              nav.navigate();
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
  function assignStoreDataToLocal(quantumData, eventData, eventSessionData, eventSpeakerData, eventSponsorData, eventTeamData) {
       if (quantumData !== null && quantumData !== undefined)
      	  quantumQuestData = quantumData;
      if (eventData !== null && eventData !== undefined)
          accelerateEventData.eventdata = eventData;
      if (eventSessionData !== null && eventSessionData !== undefined)
          accelerateSessionData.eventSessionData = eventSessionData;
      if (eventSpeakerData !== null && eventSpeakerData !== undefined)
          accelerateSpeakerData.eventSpeakerData = eventSpeakerData;
      if (eventSponsorData !== null && eventSponsorData !== undefined)
          accelerateSponsorData.sponsorData = eventSponsorData;
      if (eventTeamData !== null && eventTeamData !== undefined)
          accelerateTeamData.eventTeamData = eventTeamData;
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
          "$expand": "presenter,session_material,event_inner_location",
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
          fetchEventSponsorData();
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
   * @function fetchEventSponsorData
   * @description This function is used to fetch the event sponsor data
   * @public
   */
  function fetchEventSponsorData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
          "$expand": "sponsors",
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.SPONSOR_MASTER_OBJECT_NAME, queryParams, eventSponsorDataFetchSuccess, eventSponsorDataFetchFailure);
  }

  /**
   * @function eventSponsorDataFetchSuccess
   * @description This function is invoked in the success response of event sponsor data fetch service
   * @param successResponse The success response of event sponsor data fetch service
   * @public
   */
  function eventSponsorDataFetchSuccess(successResponse) {
      let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
      if (records !== null) {
          kony.store.setItem("eventSponsorData", successResponse);
          accelerateSponsorData.sponsorData = successResponse;
          kony.print(accelerateSponsorData.sponsorData);
          fetchTeamData();
      }
  }

  /**
   * @function eventSponsorDataFetchFailure
   * @description This function is invoked in the failure response of event sponsor data fetch service
   * @param failure The failure response of event sponsor data fetch service
   * @public
   */
  function eventSponsorDataFetchFailure(failureResponse) {
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
          fetchQuantumQuestData();
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
   * @function fetchQuantumQuestData
   * @description This function is used to fetch the QuantumQuest app store urls and required data to navigate to the QuantumQuest app
   * @public
   */
  function fetchQuantumQuestData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.QUANTUM_OBJECT_NAME, queryParams, quantumQuestDataFetchSuccess, quantumQuestDataFetchFailure);
  }

  /**
   * @function quantumQuestDataFetchSuccess
   * @description This function is invoked in the success response of quantum quest app data fetch service
   * @param successResponse The success response of quantum quest app data fetch service
   * @public
   */
  function quantumQuestDataFetchSuccess(successResponse) {
    if(successResponse.records.length)
      {
        quantumQuestData = {
    	"id": 1,
        "deeplink_url_android": successResponse.records[0].deeplink_url_android,
        "status": successResponse.records[0].status,
        "deeplink_url_ios": successResponse.records[0].deeplink_url_ios,
        "andrdoid_scheme": successResponse.records[0].andrdoid_scheme,
        "ios_scheme": successResponse.records[0].ios_scheme,
        "bundle_identifier": successResponse.records[0].bundle_identifier,
        "android_host": successResponse.records[0].android_host
        };
      }
    kony.store.setItem("quantumQuestData", quantumQuestData);
    var nav = new kony.mvc.Navigation("frmAgenda");
    nav.navigate();
  }

  /**
   * @function quantumQuestDataFetchFailure
   * @description This function is invoked in the failure response of quantum quest app data fetch service
   * @param failure The failure response of quantum quest app data fetch service
   * @public
   */
  function quantumQuestDataFetchFailure(failureResponse) {
      kony.print("Error occured in fetching the event data");
  }
   /**
   * @function fetchTeamData
   * @description This function is used to fetch the event team data
   * @public
   */
  function fetchTeamData() {
      var queryParams = {
          "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
          "$orderby": "order"
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.TEAM_OBJECT,
          queryParams, teamDataFetchSuccess, teamDataFetchFailure);
  }

  /**
   * @function teamDataFetchSuccess
   * @description This function is invoked in the success response of event team data fetch service
   * @param successResponse The success response of event speaker data fetch service
   * @public
   */
  function teamDataFetchSuccess(successResponse) {
      let records = successResponse.hasOwnProperty("records") ? successResponse.records : null;
      if (records !== null) {
          accelerateTeamData.eventTeamData = successResponse;
          kony.store.setItem("eventTeamData", successResponse);
          kony.print(accelerateTeamData.eventTeamData);
          fetchSpeakersData();
      }
  }

  /**
   * @function teamDataFetchFailure
   * @description This function is invoked in the failure response of event team data fetch service
   * @param failure The failure response of event speaker data fetch service
   * @public
   */
  function teamDataFetchFailure() {
      kony.print("Exception occured while fetching the team data");
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
