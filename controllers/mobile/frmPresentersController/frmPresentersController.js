define({
  /**
    	* @function  onNavigate
        * @description This function is invoked at the onNavigate of the form and checks 
        			whether the presenter info is fetched previously 
        			If the presenter info is already fetched it will display the 
                    data from the store or else it will fetch the presenter info 
        * @private
    */
  onNavigate : function() {
    this.filtersSelected = [];
    this.initializeFilter();
    var presenterSessionData = null;
    this.view.presenterScroll.removeAll();   
    this.processPresenterSessionData(accelerateSpeakerData.eventSpeakerData.records);
  },

  /**
    	* @function  setFilteronClick
        * @description This function is used to set Filter Click Action
        * @private
    */
  setFilteronClick : function(){
    var self = this;
    this.view.flxFilterKeynote.onClick = function(eventobject) {
      self.speakerFilter(eventobject);
    };
    this.view.flxFilterQuantum.onClick = function(eventobject) {
      self.speakerFilter(eventobject);
    };
    this.view.flxFilterDBX.onClick = function(eventobject) {
      self.speakerFilter(eventobject);
    };
  },
    /**
       * @function presenterFetchSuccess
       * @description This function is invoked in the success of presenter object and
                      checks the response for the records and calls processdata function
       * @param response The success response of the presenter object
       * @private
       */


    presenterFetchSuccess: function(response) {
        var presenterSessionData = response.hasOwnProperty("records") ? response.records : null;
        if(!kony.sdk.isNullOrUndefined(presenterSessionData)) {
            kony.store.setItem("presenterSessionData",presenterSessionData);
            this.processPresenterSessionData(presenterSessionData);
        } else {
            kony.print("Speaker Data not present");
        }
    },

    /**
     * @function presenterFetchFailure
     * @description This function is invoked in the failure of presenter object
     * @param error The failure response of the presenter object
     * @private
     */
    presenterFetchFailure: function(error) {
        kony.print(eventConstants.GENERIC_EXCEPTION_MESSAGE);
        kony.print("Exception occured is" + JSON.stringify(error));
    },

    /**
       * @function processPresenterSessionData
       * @description This function is invoked from the presenter fetch success callback
                      This function is used to process the response and set the UI
       * @param presenterSessionData The array of presenter object
       * @private
       */
    processPresenterSessionData: function(presenterSessionData) {
        for (var index = 0; index < presenterSessionData.length; index++) {
            var presenterObject = presenterSessionData[index];
            var presenterShortBio = presenterObject.hasOwnProperty("speaker_bio") ? presenterObject.speaker_bio.slice(0, 70) + "..." : "";
            presenterObject.shortBio = presenterShortBio;
            this.setPresenterList(presenterObject);
        }
    },

    /**
     * @function setPresenterList
     * @description This function is used to create the PresenterTile dynamically
     * @param presenterSessionData The array of presenter object
     * @private
     */
    setPresenterList: function(presenterObject) {
        var id = "presenterTile" + presenterObject.speaker_id;
        var presenterTile = new accel.presenterTile({
            "clipBounds": true,
            "height": "100%",
            "id": id,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "CopyslFbox0d15165bcdad74f",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
        }, {}, {});
        presenterTile.setData(presenterObject);
        presenterTile.setOnClickListenerOfPresenterCard(this.onClickOfPresenter.bind(this));
        this.view.presenterScroll.add(presenterTile);
    },

    /**
     * @function onClickOfPresenter
     * @description This function is invoked on click of speaker tile
     *              this function will set data to details flex
     * @param presenter The presenter object
     * @private
     */

    onClickOfPresenter: function(presenter) {
        this.view.speakerName.text = presenter.speaker_name;
        this.view.speakerTitle.text = presenter.speaker_title;
        this.view.speakerInfo.text = presenter.speaker_bio;
        this.view.imgProfileLarge.src = presenter.speaker_profile_pic;
        var imgWidth = kony.os.deviceInfo().screenWidth;
        this.view.imgProfileLarge.height = imgWidth * eventConstants.ASPECT_RATION_CONSTANT + "dp";
        if (!kony.sdk.isNullOrUndefined(presenter.sessionsList)) {
            this.createSessions(presenter.sessionsList);
        }
        this.view.presenterDetail.isVisible = true;
    },

    /**
     * @function onClickOfCloseSpeakerDetails
     * @description This function will dismiss the presenter detail
     * @private
     */
    onClickOfCloseSpeakerDetails: function() {
        this.view.presenterDetail.isVisible = false;
    },


    /**
     * @function createSessions
     * @description To do..
     * @private
     */
    createSessions: function(sessions) {
        this.view.flexSessions.removeAll();
        for (var index = 0; index < sessions.length; index++) {
            var id = "sessiontile" + sessions[index].session_id;
            if(sessions[index].session_start_date.indexOf(" ")!=-1){
               sessions[index].session_start_date = sessions[index].session_start_date.replace(" ","T")+"0Z";
               sessions[index].session_end_date = sessions[index].session_end_date.replace(" ","T")+ "0Z";
            }
            this.createSessionTile(id, "0dp", sessions[index]);
        }
    },


    /**
     * @function createSessionTile
     * @description To do..
     * @private
     */
  createSessionTile:function(id,top,data){
    var sessionTile = new tiles.sessionTile({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": false,
      "height": "152dp",
      "id": id,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "skin": "CopyslFbox0j4c69221be4c47",
      "top": top,
      "width": "100%",
      "zIndex": 1,
      "overrides": {}
    }, {
      "retainFlowHorizontalAlignment": false,
      "overrides": {}
    }, {
      "overrides": {}
    });
    sessionTile.setTitleData(data);
    this.view.flexSessions.add(sessionTile);
  },

    /**
     * @function spekerFilter
     * @description The function is used to switch the skins from unselected to selected and vice versa
     * @param eventobject The event object or the widget info of the tab which is selected
     * @private
     */
  speakerFilter: function(eventobject) {
    var lblName,imgName,selectedFilter;
    switch (eventobject.id){
      case "flxFilterKeynote" :
        lblName = "lblKeynote";
        imgName = "imgTickKeynote";
        selectedFilter = eventConstants.KEYNOTE;
        break;
      case "flxFilterQuantum" :
        lblName = "lblQuantum";
        imgName = "imgTickQuantum";
        selectedFilter = eventConstants.QUANTUM;
        break;
      case "flxFilterDBX" :
        lblName = "lblDBX";
        imgName = "imgTickDBX";
        selectedFilter = eventConstants.DBX;
        break;
    }

    if(eventobject.skin === "sknflxfilterunselected"){
      this.view[eventobject.id].skin = "sknflxfilterselected";
      this.view[lblName].skin = "sknlblfilterselected";
      this.view[imgName].src = "tickactive.png";
      this.filtersSelected.push(selectedFilter);
    } else {
      this.view[eventobject.id].skin = "sknflxfilterunselected";
      this.view[lblName].skin = "sknlblfilterunselected";
      this.view[imgName].src = "tickinactive.png";
      var index = this.filtersSelected.indexOf(selectedFilter);
      if (index > -1) {
        this.filtersSelected.splice(index, 1);
      }
    }
    if(this.filtersSelected.length>0) {
      this.showFilteredResults();     
    }else{
      this.showAllPresenters();
    }
  },

  /**
     * @function showFilteredResults
     * @description The function is used to filter the speakers based on the filter seleted and toggle the visibility
     * @private
     */
  showFilteredResults : function(){
    var presenters = this.view.presenterScroll.widgets();
    for(var index=0; index<presenters.length; index++) {
      var isPresenterIntrack = false;
      var tracks = this.view[presenters[index].id].getTracks();
      for(var filterIndex =0; filterIndex<this.filtersSelected.length; filterIndex++) {
        if(tracks[this.filtersSelected[filterIndex]]) {
          isPresenterIntrack = true;
          break;
        }
      }
      this.view[presenters[index].id].isVisible = isPresenterIntrack;
    }
  },

  /**
     * @function showAllPresenters
     * @description The function is used to set the visibility on to all the presenters if there is no filter
     * @private
     */
  showAllPresenters : function(){
    var presenters = this.view.presenterScroll.widgets();
    for(var index=0; index<presenters.length; index++) {
      this.view[presenters[index].id].isVisible = true;
    }
  },

  /**
     * @function initializeFilter
     * @description The function is used to initialize the filters
     * @private
     */
  initializeFilter : function(){

    //Reset DBX filter
    this.view.lblDBX.skin = "sknlblfilterunselected";
    this.view.flxFilterDBX.skin = "sknflxfilterunselected";
    this.view.imgTickDBX.src = "tickinactive.png";

    //Reset QUANTUM filter
    this.view.lblQuantum.skin = "sknlblfilterunselected";
    this.view.flxFilterQuantum.skin = "sknflxfilterunselected";
    this.view.imgTickQuantum.src = "tickinactive.png";

    //Reset KEYNOTE filter
    this.view.lblKeynote.skin = "sknlblfilterunselected";
    this.view.flxFilterKeynote.skin = "sknflxfilterunselected";
    this.view.imgTickQuantum.src = "tickinactive.png";
  }
});
