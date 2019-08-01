define({
  
    /**
     * @function formEventLocationPostShowAction
     * @descripiton This function is invoked in the pre show of the form which is used to fetch the event data
     * @private
     */
    formEventLocationPostShowAction: function() {
        let eventData = kony.store.getItem("accelerateEventData");
      	if(!kony.sdk.isNullOrUndefined(eventData)){
          let eventLocationData = eventData.hasOwnProperty("eventLocationData") ? eventData.eventLocationData : null;
          if (eventLocationData !== null) {
             this.formatAndSetEventData(eventLocationData);
          } else {
             kony.print("Event Location Data is null");
          }
        }else{
           var queryParams = {
            "$filter": "((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))",
            "$expand": "event_inner_location,wifi_info,location"
          };
          fetchObjectData(eventConstants.OBJECT_SERVICE_NAME, eventConstants.EVENT_OBJECT_NAME, queryParams, this.eventFetchSuccess.bind(this), this.eventFetchFailure.bind(this));
        }
    },
  	
  	 /**
     * @function eventFetchSuccess
     * @descripiton This function is invoked in the success response of event object
     * @param successResponse The success response of the event object
     * @private
     */
  	eventFetchSuccess : function(successResponse){
      let eventLocationData = successResponse.hasOwnProperty("records") ? successResponse.records : null;
      if(eventLocationData !== null){
        let eventLocation = eventLocationData[0].location[0];
        this.formatAndSetEventData(eventLocation);
      }else{
        kony.print("Fetched event data is null");
      }
    },
  
  	 /**
     * @function eventFetchFailure
     * @descripiton This function is invoked in the failure response of event object
     * @param failureResponse The failure response of the event object
     * @private
     */
  	eventFetchFailure : function(failureResponse){
      kony.print(eventConstants.GENERIC_EXCEPTION_MESSAGE);
      kony.print("Failure response is "+JSON.stringify(failureResponse));
    },	
  
  	 /**
     * @function formatAndSetEventData
     * @descripiton This function is used to format the service data and set the data
     * @param eventLocationData The event location data
     * @private
     */
  	formatAndSetEventData : function(eventLocationData){
       let hotelName = eventLocationData.hasOwnProperty("location") ? eventLocationData.location : "";
       let completeAddress = this.getCompleteAddress(eventLocationData);
       let phoneNumber = eventLocationData.hasOwnProperty("phone_number") ? eventLocationData.phone_number : "";
       let coOrdinatesInfo = this.getCoordinates(eventLocationData);
       this.setEventData(hotelName, completeAddress, phoneNumber, coOrdinatesInfo);
    },
  	
  	 /**
     * @function getCompleteAddress
     * @descripiton This function is used to format and construct the complete address
     * @param eventLocationData The event location data
     * @private
     */
  	getCompleteAddress : function(eventLocationData){
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
      	this.animateLocationCard("23%");
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
    },
  
  	 /**
     * @function animateLocationCard
     * @descripiton This function is used to animate the card from bottom to top
     * @param finalTop The top position of the flex
     * @private
     */
  	animateLocationCard: function(finalTop) {
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


                }
            });
    },
});
