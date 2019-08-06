define({

    /**
     * @function formEventLocationPostShowAction
     * @descripiton This function is invoked in the pre show of the form which is used to fetch the event data
     * @private
     */
    formEventLocationPostShowAction: function() {
        let eventData = accelerateEventData.eventdata.records[0];
        if (!kony.sdk.isNullOrUndefined(eventData)) {
            let eventLocationData = eventData.hasOwnProperty("location") ? eventData.location[0] : null;
            if (eventLocationData !== null) {
                this.formatAndSetEventData(eventLocationData);
            } else {
                kony.print("Event Location Data is null");
            }
        } 
    },

    /**
     * @function formatAndSetEventData
     * @descripiton This function is used to format the service data and set the data
     * @param eventLocationData The event location data
     * @private
     */
    formatAndSetEventData: function(eventLocationData) {
        let hotelName = eventLocationData.hasOwnProperty("location") ? eventLocationData.location : "";
        let completeAddress = this.getCompleteAddress(eventLocationData);
        let phoneNumber = eventLocationData.hasOwnProperty("phone_number") ? eventLocationData.phone_number : "";
        let coordinatesInfo = this.getCoordinates(eventLocationData);
        this.setEventData(hotelName, completeAddress, phoneNumber, coordinatesInfo);
    },

    /**
     * @function getCompleteAddress
     * @descripiton This function is used to format and construct the complete address
     * @param eventLocationData The event location data
     * @private
     */
    getCompleteAddress: function(eventLocationData) {
        let addressLine1 = eventLocationData.hasOwnProperty("addressLine1") ? eventLocationData.addressLine1 : "";
        let cityName = eventLocationData.hasOwnProperty("cityname") ? eventLocationData.cityname : "";
        let pincode = eventLocationData.hasOwnProperty("pincode") ? eventLocationData.pincode : "";
        let countryName = eventLocationData.hasOwnProperty("country_name") ? eventLocationData.country_name : "";
        let completeAddress = addressLine1 + ", " + cityName + ", " + pincode + ", " + countryName;
        return completeAddress;
    },

    /**
     * @function getCoordinates
     * @descripiton This function is used to construct the coOrdinates Information
     * @param eventLocationData The complete information about the event
     * @private
     */
    getCoordinates: function(eventLocationData) {
        let coordinatesInfo = {};
        let latitude = eventLocationData.hasOwnProperty("latitude") ? eventLocationData.latitude : "";
        let longitude = eventLocationData.hasOwnProperty("longitude") ? eventLocationData.longitude : "";
        coordinatesInfo.latitude = latitude;
        coordinatesInfo.longitude = longitude;
        return coordinatesInfo;
    },
    /**
     * @function setEventData
     * @descripiton This function is used to map the fetched data to the form UI elements
     * @param hotelName The name of the hotel
     * @param completeAddress The complete address of the event location
     * @param phoneNumber The phone number of the event location
     * @param coordinatesInfo The information about the co-ordinates of the event location
     * @private
     */
    setEventData: function(hotelName, completeAddress, phoneNumber, coordinatesInfo) {
        kony.print("Mapping the event location data to UI elements");
        this.view.lblHotelName.text = hotelName;
        this.view.lblHotelInfo.text = completeAddress;
        this.view.lblHotelPhone.text = phoneNumber;
        this.setDataToMap(hotelName, completeAddress, coordinatesInfo);
        this.animateLocationCard("23%", false);
        kony.print("Mapping the event location data to UI elements completed");
    },

    /**
     * @function setDataToMap
     * @descripiton This function is used to set the event location in the map widget
     * @param hotelName The name of the hotel
     * @param completeAddress The complete address of the event location
     * @param coordinatesInfo The information about the co-ordinates of the event location
     * @private
     */
    setDataToMap: function(hotelName, completeAddress, coordinatesInfo) {
        var locationPin = {
            id: "accelerateEvent", // id is mandatory for every pin
            lat: coordinatesInfo.latitude,
            lon: coordinatesInfo.longitude,
            name: hotelName,
            image: "map_location_icon.png",
            focusImage: "map_location_icon.png",
            //focus image will be shown while map pin selected
            desc: completeAddress,
            showCallout: false,
            meta: {
                color: "green",
                label: "A"
            }
        };
        this.view.mapEventLocation.addPin(locationPin);
        this.view.mapEventLocation.navigateTo(0, false);
    },

    /**
     * @function onCLoseButtonClick
     * @descripiton This function is used to close the location page and navigate back to more page
     * @private
     */
    onCloseButtonClick: function() {
        this.animateLocationCard("100%", true);
    },

    /**
     * @function animateLocationCard
     * @descripiton This function is used to animate the card from bottom to top
     * @param finalTop The top position of the flex
     * @private
     */
    animateLocationCard: function(finalTop, isClose) {
        this.view.flxMapContainer.animate(
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
                    if (isClose) {
                        new kony.mvc.Navigation("frmMore").navigate();
                    }
                }
            });
    },
});
