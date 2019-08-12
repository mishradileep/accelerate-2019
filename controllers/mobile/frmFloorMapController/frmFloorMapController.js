define({

    segmentData: null,

    /**
     * @function formFloorMapPreshowAction
     * @description Invoked on the pre show of the form
     * @private
     */
    formFloorMapPreshowAction: function() {
        this.view.lblSelectedFloorMapName.text = "Choose your room";
        this.view.sgmntFloorMap.isVisible = false;
        this.view.brwsrInnerLocation.enableParentScrollingWhenReachToBoundaries = false;
        let eventData = accelerateEventData.eventdata.records[0];
        if (!kony.sdk.isNullOrUndefined(eventData)) {
            let eventInnerLocation = eventData.event_inner_location;
            if (eventInnerLocation !== null) {
                var segmentWidgetDataMap = {
                    "lblListItem": "name",
                  	"lblSeparator":"separatorVisibility"
                };
                this.view.sgmntFloorMap.widgetDataMap = segmentWidgetDataMap;
                this.segmentData = eventInnerLocation;
              	let updatedData = this.formatData(eventInnerLocation);
                this.view.sgmntFloorMap.setData(updatedData);
            }
        }
    },

    /**
    	* @function onSegmentRowClick
        * @descriptioon Invoked on the row click of the segment
        * @param rowNumber The selected row number of the segment
        * @private
        
    */
    onSegmentRowClick: function(rowNumber) {
        if (this.view.flxPDFContainer.top !== "180dp")
            this.animatePDFContainer("180dp");
        this.view.sgmntFloorMap.isVisible = false;
        let floorMapItem = this.segmentData[rowNumber];
        let floorMapURL = floorMapItem.hasOwnProperty("inner_location") ? floorMapItem.inner_location : "";
        let floorMapName = floorMapItem.hasOwnProperty("name") ? floorMapItem.name : "";
        this.view.brwsrInnerLocation.requestURLConfig = {
            URL: "https://docs.google.com/gview?embedded=true&url=" + floorMapURL,
            requestMethod: constants.BROWSER_REQUEST_METHOD_GET
        };
        this.view.lblSelectedFloorMapName.text = floorMapName;
    },

    /**
     * @function animatedPDFContainer
     * @description Invoked to animate the pdf container for the first time
     * @param finalTop The final top value to which the container must be animated
     * @private
     */
    animatePDFContainer: function(finalTop) {
        this.view.flxPDFContainer.animate(
            kony.ui.createAnimation({
                100: {
                    top: finalTop,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: 0.2
            }, {
                animationEnd: function() {
                    if (finalTop === "100%") {
                        new kony.mvc.Navigation("frmMore").navigate();
                    }
                }
            });
    },
  
  	formatData : function(eventInnerLocation){
      let recordsLength = eventInnerLocation.length;
      for(let index = 0 ; index < recordsLength -1 ; index++){
        eventInnerLocation[index].separatorVisibility = {
          "isVisible" :true
        };
      }
      eventInnerLocation[recordsLength-1].separatorVisibility = {
        "isVisible" :false
      };
      return eventInnerLocation;
    },
  
   
});
