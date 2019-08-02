define({

    /**
     *	@function fetchEventData
     * 	@description This function is used to fetch all the event data required
     * 	@private
     */
    fetchEventData: function() {
        var objectServiceName = eventConstants.OBJECT_SERVICE_NAME;
        var objectName = eventConstants.EVENT_OBJECT_NAME;
        var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "event_inner_location,wifi_info,location"
        };
        fetchObjectData(objectServiceName, objectName, queryParams, this.eventDataFetchSuccess.bind(this), this.eventDataFetchFailure.bind(this));
    },
    /**
     *	@function eventDataFetchSuccess
     * 	@description This function is used to process and store the data in kony store
     *	@param successResponse The response of the event data
     * 	@private
     */
    eventDataFetchSuccess: function(successResponse) {
        let records = (successResponse.hasOwnProperty("records")) ? successResponse.records : null;
        if (records !== null) {
            let eventData = records[0];
            let eventLocationData = eventData.location[0];
            let eventInnerLocationData = eventData.event_inner_location;
            let wifiInformation = eventData.wifi_info[0];
            let eventFloorMapData = this.formatInnerLocationData(eventInnerLocationData);
            let accelerateEventData = {
                "eventInnerLocation": eventFloorMapData,
                "wifiInformation": wifiInformation,
                "eventLocationData": eventLocationData
            };
           kony.store.setItem("accelerateEventData", accelerateEventData);
        }

    },
    /**
     *	@function eventDataFetchFailure
     * 	@description This function is used to perform operations on the failure of data fetch
     *	@param failureResponse The failure response of the event data
     * 	@private
     */
    eventDataFetchFailure: function(failureResponse) {
        kony.print(JSON.stringify(failureResponse));
        kony.store.setItem("accelerateEventData",null);
    },
    /**
     *	@function formatInnerLocationData
     * 	@description This function is used to format the inner location data as required by the application (JSON Format)
     *	@param eventInnerLocationData The inner location data fetched from the service
     * 	@private
     */
    formatInnerLocationData: function(eventInnerLocationData) {
        if (eventInnerLocationData !== null && eventInnerLocationData !== undefined && eventInnerLocationData.length > 0) {
            let innerLocationLength = eventInnerLocationData.length;
            let innerLocationData = [];
            for (let index = 0; index < innerLocationLength; index++) {
                let currentLocationInfoObject = eventInnerLocationData[index];
                let innerLocationInfo = {
                    "floor_name": currentLocationInfoObject.name,
                    "floor_map_url": currentLocationInfoObject.inner_location
                };
                innerLocationData.push(innerLocationInfo);
            }
            return innerLocationData;
        } else {
            kony.print("Inner Location Data is empty.Nothing to parse");
            return null;
        }
    }
});
