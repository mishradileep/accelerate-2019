define({ 

  segmentData : null,
  formFloorMapPreshowAction : function(){
    let eventData = accelerateEventData.eventdata.records[0];
    if (!kony.sdk.isNullOrUndefined(eventData)) {
      let eventInnerLocation = eventData.event_inner_location;
      alert(eventInnerLocation);
      if(eventInnerLocation !== null){
           var segmentWidgetDataMap = {
             "lblListItem":"floor_name"
           };
       this.view.sgmntFloorMap.widgetDataMap = segmentWidgetDataMap;
       this.segmentData = eventInnerLocation;
       this.view.sgmntFloorMap.setData(eventInnerLocation);
       this.view.sgmntFloorMap.isVisible=true;
      }
    }
  }

 });