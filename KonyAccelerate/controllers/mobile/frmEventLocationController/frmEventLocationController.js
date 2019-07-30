define({

    /**
     * @function formPreshowAction
     * @descripiton This function is invoked in the pre show of the form which is used to fetch the event data
     * @private
     */
    formPreshowAction: function() {
        let queryParams = {
            "$filter": "(SoftDeleteFlag ne true) or (SoftDeleteFlag eq null)"
        };
        kony.application.showLoadingScreen("", "Fetching the event data");
        fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_LOCATION_OBJECT_NAME, queryParams,
            this.eventLocationFetchSuccess.bind(this), this.eventLocationFetchFailure.bind(this));
    },


    /**
     * @function eventLocationFetchSuccess
     * @descripiton This function is invoked in the success of the event location fetch operation
     * @param successResponse The success response of the event location object
     * @private
     */
    eventLocationFetchSuccess: function(successResponse) {
        kony.application.dismissLoadingScreen();
        kony.print("Event Location Fetch success" + JSON.stringify(successResponse));
        let eventLocationInfo = successResponse.records[0];
        let hotelName = eventLocationInfo.hasOwnProperty("location") ? eventLocationInfo.location : "";
        let addressLine1 = eventLocationInfo.hasOwnProperty("addressLine1") ? eventLocationInfo.addressLine1 : "";
        let cityName = eventLocationInfo.hasOwnProperty("cityname") ? eventLocationInfo.cityname : "";
        let pincode = eventLocationInfo.hasOwnProperty("pincode") ? eventLocationInfo.pincode : "";
        let phoneNumber = eventLocationInfo.hasOwnProperty("phone_number") ? eventLocationInfo.phone_number : "";
        let countryName = eventLocationInfo.hasOwnProperty("country_name") ? eventLocationInfo.country_name : "";
        let latitude = eventLocationInfo.hasOwnProperty("latitude") ? eventLocationInfo.latitude : "";
        let longitude = eventLocationInfo.hasOwnProperty("longitude") ? eventLocationInfo.longitude : "";
        let completeAddress = addressLine1 + ", " + cityName + ", " + pincode + ", " + countryName;
        let coOrdinatesInfo = {
            "latitude": latitude,
            "longitude": longitude
        };
        this.setEventData(hotelName, completeAddress, phoneNumber, coOrdinatesInfo);
    },

    /**
     * @function eventLocationFetchFailure
     * @descripiton This function is invoked in the failure of the event location fetch operation
     * @param successResponse The failure response of the event location object
     * @private
     */
    eventLocationFetchFailure: function(failureResponse) {
        kony.application.dismissLoadingScreen();
        kony.print("Exception occured in fetching the location of the event");
    },

    /**
     * @function setEventData
     * @descripiton This function is used to map the fetched data to the form UI elements
     * @param hotelName The name of the hotel
     * @param completeAddress The complete address of the event location
     * @param phoneNumber The phone number of the event location
     * @param coOrdinatesInfo The information about the co-ordinates of the event location
     * @private
     */
    setEventData: function(hotelName, completeAddress, phoneNumber, coOrdinatesInfo) {
        kony.print("Mapping the event location data to UI elements");
        this.view.lblHotelName.text = hotelName;
        this.view.lblHotelInfo.text = completeAddress;
        this.view.lblHotelPhone.text = phoneNumber;
        this.setDataToMap(hotelName, completeAddress, coOrdinatesInfo);
        kony.print("Mapping the event location data to UI elements completed");
    },


    /**
     * @function setDataToMap
     * @descripiton This function is used to set the event location in the map widget
     * @param hotelName The name of the hotel
     * @param completeAddress The complete address of the event location
     * @param coOrdinatesInfo The information about the co-ordinates of the event location
     * @private
     */
    setDataToMap: function(hotelName, completeAddress, coOrdinatesInfo) {
        var locationPin = {
            id: "accelerateEvent", // id is mandatory for every pin
            lat: coOrdinatesInfo.latitude,
            lon: coOrdinatesInfo.longitude,
            name: hotelName,
            image: "defaultImage.png",
            focusImage: "focusImage.png",
            //focus image will be shown while map pin selected
            desc: completeAddress,
            showCallout: true,
            meta: {
                color: "green",
                label: "A"
            }
        };
        this.view.mapEventLocation.addPin(locationPin);
        this.view.mapEventLocation.navigateTo(0, false);
    }
});
