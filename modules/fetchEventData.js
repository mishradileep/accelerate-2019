	
	

    function syncEventData() {
      	let isTimeStamp = kony.store.getItem("isTimeStampUpdated");
      	if(isTimeStamp === null || isTimeStamp === undefined)
      		kony.store.setItem("clientLastUpdatedTime","2019-08-04T15:27:26Z");
        fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.DATA_SYNC_OBJECT, {}, dataSyncFetchSuccess, dataSyncFetchFailure);
    }
 
    function dataSyncFetchSuccess(successResponse) {
        let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
        if (records !== null) {
            let serverLastUpdatedTime = records[0].LastUpdatedDateTime;
          	let clientLastUpdatedTime = kony.store.getItem("clientLastUpdatedTime");
            if (serverLastUpdatedTime > clientLastUpdatedTime) {
                latestTimeStamp = serverLastUpdatedTime;
                fetchEventStaticData();
            }
        }
    }
	
	function dataSyncFetchFailure(failureResponse){
       	kony.print("Error occured in fetching the event data");
        kony.print("Error occured is" + JSON.stringify(failureResponse));
    }


    function fetchEventStaticData() {
        var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "event_inner_location,wifi_info,location"
        };
        fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_OBJECT_NAME, queryParams, eventDataFetchSuccess, eventDataFetchFailure);
    }

    function eventDataFetchSuccess(successResponse) {
        let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
        if (records !== null) {
            accelerateEventData.eventdata = successResponse;
            kony.print(accelerateEventData.eventdata);
            fetchEventSessionData();
        }
    }

    function eventDataFetchFailure(failureResponse) {
        kony.print("Error occured in fetching the event data");
        kony.print("Error occured is" + JSON.stringify(failureResponse));
    }

    function fetchEventSessionData() {
        var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "presenter,session_material",
            "$orderby": "session_start_date"
        };
        fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_SESSIONS_OBJECT_NAME, queryParams, eventSessionDataFetchSuccess, eventSessionDataFetchFailure);
    }

    function eventSessionDataFetchSuccess(successResponse) {
        let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
        if (records !== null) {
            accelerateSessionData.eventSessionData = successResponse;
            kony.print(accelerateSessionData.eventSessionData);
            fetchSpeakersData();
        }
    }

    function eventSessionDataFetchFailure(failureResponse) {
        kony.print("Error occured in fetching the event data");
        kony.print("Error occured is" + JSON.stringify(failureResponse));
    }

    function fetchSpeakersData() {
        var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "presenter"
        };
        fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.PRESENTER_OBJECT_NAME, queryParams, speakerDataFetchSuccess, speakerDataFetchFailure);
    }


    function speakerDataFetchSuccess(successResponse) {
        let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
        if (records !== null) {
            accelerateSpeakerData.eventSpeakerData = successResponse;
            kony.print(accelerateSpeakerData.eventSpeakerData);
          	parseJSONResponse(successResponse);
            kony.store.setItem("clientLastUpdatedTime",latestTimeStamp);
          	kony.store.setItem("isTimeStampUpdated",true);
        }
    }

    function speakerDataFetchFailure(failureResponse) {
        kony.print("Error occured in fetching the event data");
        kony.print("Error occured is" + JSON.stringify(failureResponse));
    }

	function parseJSONResponse(successResponse){
      let recordsLength = successResponse.hasOwnProperty("records") ? successResponse.records.length : -1;
      if(recordsLength > 0){
        for(let index = 0 ; index < recordsLength ; index++){
          let currentRecord = successResponse.records[index];
          currentRecord.sessionsList = JSON.parse(currentRecord.sessionsList);
          currentRecord.tracks = JSON.parse(currentRecord.tracks);
        }
      }
    }