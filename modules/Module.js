function fetchEventData(){
  
  	var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "event_inner_location,wifi_info,location"
        };
   fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_OBJECT_NAME, queryParams, eventDataFetchSuccess, eventDataFetchFailure);
}

function eventDataFetchSuccess(successResponse){
  let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
  if (records !== null) {
     accelerateEventData.eventdata = records;
     fetchEventSessionData();
  }
}

function eventDataFetchFailure(failureResponse){
  kony.print("Error occured in fetching the event data");
  kony.print("Error occured is"+JSON.stringify(failureResponse));
}

function fetchEventSessionData(){
  	var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "presenter,session_material",
      		"$orderby":"session_start_date"
    };
  fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_SESSIONS_OBJECT_NAME, queryParams, eventSessionDataFetchSuccess, eventSessionDataFetchFailure);
}

function eventSessionDataFetchSuccess(successResponse){
  let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
  if (records !== null) {
     accelerateSessionData.eventSessionData = records;
     fetchSpeakersData();
  }
}

function eventSessionDataFetchFailure(failureResponse){
  kony.print("Error occured in fetching the event data");
  kony.print("Error occured is"+JSON.stringify(failureResponse));
}

function fetchSpeakersData(){
  var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "presenter"
        };
  fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.PRESENTER_OBJECT_NAME, queryParams, speakerDataFetchSuccess, speakerDataFetchFailure);
}


function speakerDataFetchSuccess(successResponse){
   let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
   if (records !== null) {
     accelerateSpeakerData.eventSpeakerData = records;
  }
}

