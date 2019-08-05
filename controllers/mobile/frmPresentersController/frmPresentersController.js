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
    var presenterSessionData = null;
    //To Do Handle the offline data -- kony.store.getItem("presenterSessionData");
    this.view.presenterScroll.removeAll();   

    if(!kony.sdk.isNullOrUndefined(presenterSessionData)) {
      this.processPresenterSessionData(presenterSessionData);
    } else {
      var queryParams = {
        "bindSessionInfoWithSpeaker" : true
      };
      fetchObjectData(eventConstants.OBJECT_SERVICE_NAME,
                      eventConstants.PRESENTER_OBJECT_NAME,
                      queryParams, 
                      this.presenterFetchSuccess.bind(this),
                      this.presenterFetchFailure.bind(this));         
    }

  },

  /**
    	* @function  setFilteronClick
        * @description This function is used to set Filter Click Action
        * @private
    */
  setFilteronClick : function(){
    var self = this;
    this.view.filterAll.onClick = function(eventobject) {
      self.speakerFilter(eventobject);
    };
    this.view.filterDBX.onClick = function(eventobject) {
      self.speakerFilter(eventobject);
    };
    this.view.filterQuantum.onClick = function(eventobject) {
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

  presenterFetchSuccess : function(response) {
    var presenterSessionData = response.hasOwnProperty("records") ? response.records : null;

    if(!kony.sdk.isNullOrUndefined(presenterSessionData)) {
      kony.store.setItem("presenterSessionData",presenterSessionData);
      this. processPresenterSessionData(presenterSessionData);
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
  presenterFetchFailure : function(error) {
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
  processPresenterSessionData : function(presenterSessionData) {
    for(var index=0; index<presenterSessionData.length; index++) {
      var presenterObject = presenterSessionData[index];
      var presenterShortBio =presenterObject.hasOwnProperty("speaker_bio") ? presenterObject.speaker_bio.slice(0,70)+"..." : "";
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
  setPresenterList : function(presenterObject) {
    var id = "presenterTile"+presenterObject.speaker_id;
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
    }, {}, {} );
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
  onClickOfPresenter : function(presenter){
    this.view.speakerName.text = presenter.speaker_name;
    this.view.speakerTitle.text = presenter.speaker_title;
    this.view.speakerInfo.text = presenter.speaker_bio;
    this.view.imgProfileLarge.src = presenter.speaker_profile_pic;
	var imgWidth =kony.os.deviceInfo().screenWidth;
    this.view.imgProfileLarge.height = imgWidth * 0.68+"dp";
    if(!kony.sdk.isNullOrUndefined(presenter.sessionsList)) {
      this.createSessions(JSON.parse(presenter.sessionsList));
    }
    this.view.presenterDetail.isVisible = true;
  },

  /**
     * @function onClickOfCloseSpeakerDetails
     * @description This function will dismiss the presenter detail
     * @private
     */
  onClickOfCloseSpeakerDetails : function(){
    this.view.presenterDetail.isVisible = false;
  },


  /**
     * @function createSessions
     * @description To do..
     * @private
     */
  createSessions : function(sessions){
    this.view.flexSessions.removeAll();
    for(var index=0; index<sessions.length; index++) {
      var id = "sessiontile"+sessions[index].session_id;
      this.createSessionTile(id, "0dp",sessions[index]);
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
      "overrides": {
        "sessionLocationIcon": {
          "src": "agendatilelocationicon.png"
        },
        "sessionTile": {
          "bottom": "viz.val_cleared",
          "height": "152dp",
          "isVisible": true,
          "left": "0dp",
          "top": "0dp",
          "width": "100%"
        },
        "sessionTimeIcon": {
          "src": "agendatiletimeicon.png"
        },
        "tileBGImageKony": {
          "isVisible": true,
          "src": "agendatilekony.png"
        }
      }
    }, {
      "retainFlowHorizontalAlignment": false,
      "overrides": {}
    }, {
      "overrides": {}
    });
    sessionTile.setTitleData(data)
    this.view.flexSessions.add(sessionTile);
  },

  /**
     * @function spekerFilter
     * @description The function is used to animate and change the speaker filter based on the track selected
     * @param eventobject The event object or the widget info of the tab which is selected
     * @private
     */
  speakerFilter: function(eventobject) {
    var self = this;
    var leftPos = "0%";
    var buttonText = "ALL";
    var targetSkin = "filterSkinAll";
    var destColor = "";
    if (eventobject.id == "filterAll") {
      leftPos = "0%";
      buttonText = "ALL";
      targetSkin = "filterSkinAll";
      destColor = "1F232900";
    } else if (eventobject.id == "filterDBX") {
      leftPos = "33.33%";
      buttonText = "DBX";
      targetSkin = "filterSkinDBX";
      destColor = "4B3A6600";
    } else {
      leftPos = "66.66%";
      buttonText = "QUANTUM";
      targetSkin = "filterSkinQuantum";
      destColor = "14334500";
    }

    this.view.filterWidget.animate(
      kony.ui.createAnimation({
        100: {
          left: leftPos,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: .22
      }, {
        animationEnd: function() {}
      });

    this.view.filterButton.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: .1
      }, {
        animationEnd: function() {

          self.view.filterButton.text = buttonText;
          self.view.filterButton.skin = targetSkin;

          self.view.filterButton.animate(
            kony.ui.createAnimation({
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: .1
            }, {
              animationEnd: function() {}
            });

        }
      });
  }


});