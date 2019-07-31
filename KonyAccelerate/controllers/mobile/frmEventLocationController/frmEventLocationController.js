define({
  
    /**
     * @function formPreshowAction
     * @descripiton This function is invoked in the pre show of the form which is used to fetch the event data
     * @private
     */
    formPreshowAction: function() {
        let eventData = kony.store.getItem("accelerateEventData");
      	if(eventData !== null && eventData !== undefined){
          let eventLocationData = eventData.hasOwnProperty("eventLocationData") ? eventData.eventLocationData : null;
          if (eventLocationData !== null) {
              let hotelName = eventLocationData.hasOwnProperty("location") ? eventLocationData.location : "";
              let addressLine1 = eventLocationData.hasOwnProperty("addressLine1") ? eventLocationData.addressLine1 : "";
              let cityName = eventLocationData.hasOwnProperty("cityname") ? eventLocationData.cityname : "";
              let pincode = eventLocationData.hasOwnProperty("pincode") ? eventLocationData.pincode : "";
              let countryName = eventLocationData.hasOwnProperty("country_name") ? eventLocationData.country_name : "";
              let completeAddress = addressLine1 + ", " + cityName + ", " + pincode + ", " + countryName;
              let phoneNumber = eventLocationData.hasOwnProperty("phone_number") ? eventLocationData.phone_number : "";
              let coOrdinatesInfo = this.getCoordinates(eventLocationData);
              this.setEventData(hotelName, completeAddress, phoneNumber, coOrdinatesInfo);
          } else {
              kony.print("Event Location Data is null");
              return;
          }
        }
    },
    /**
     * @function getCoordinates
     * @descripiton This function is used to construct the coOrdinates Information
     * @param eventLocationData The complete information about the event
     * @private
     */
    getCoordinates: function(eventLocationData) {
        let coOrdinatesInfo = {};
        let latitude = eventLocationData.hasOwnProperty("latitude") ? eventLocationData.latitude : "";
        let longitude = eventLocationData.hasOwnProperty("longitude") ? eventLocationData.longitude : "";
        coOrdinatesInfo.latitude = latitude;
        coOrdinatesInfo.longitude = longitude;
        return coOrdinatesInfo;
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
