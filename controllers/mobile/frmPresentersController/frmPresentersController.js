define({
  /**
    	* @function  onNavigate
        * @description This function is invoked at the onNavigate of the form and checks 
        			whether the presenter info is fetched previously 
        			If the presenter info is already fetched it will display the 
                    data from the store or else it will fetch the presenter info 
        * @private
    */
  onNavigate : function(param) {
    if(param){
      this.formId = param.form;
      if(this.formId === "frmAgenda" || this.formId === "frmmyAgenda") {
        this.view.flxImageClose.onClick = this.navigateBackToSessionListPage;
        this.navigateToPresenterDetailsById(param.speakerId);
        return;
      } else if(this.formId === "frmPresenters") {
        return;
      }
    }
    this.onClickOfCloseSpeakerDetails();
    this.view.flxImageClose.onClick = this.onClickOfCloseSpeakerDetails.bind(this);
  },

  /**
    	* @function  setFilteronClick
        * @description This function is used to set Filter Click Action
        * @private
    */
  setFilteronClick : function(){
    
    var self = this;    
    this.filtersSelected = [];
    
    //setting postshow action
    this.view.postShow = this.formPostShowAction.bind(this);
    this.view.presenterScroll.removeAll();   
    
    //setting notch
    if(checkForIphoneXSeries()){
      this.view.menuMain.height = "105dp";
      this.view.menuMain.bottom = "0dp";
      this.view.presenterScroll.bottom = "105dp";
      this.view.presenterDetail.top = "-45dp";
      this.view.flxImagelargeView.top = "45dp";
    }
    
    this.view.presenterScroll.showFadingEdges = false;
    this.view.menuMain.menuContainerPresenters.menuLabelPresenters.skin = "menuLabelSkinActive";
    
    //setting filterOnClick
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

  formPostShowAction : function(){
      if(this.filtersSelected.length>0){
        this.initializeFilter();
        this.showAllPresenters();
        this.filtersSelected = [];
      }
      if(this.isFirstTime === undefined){
        this.processPresenterSessionData(accelerateSpeakerData.eventSpeakerData.records);
        this.isFirstTime = false;
      }
  },
  

  /**
       * @function processPresenterSessionData
       * @description This function is invoked from the presenter fetch success callback
                      This function is used to process the response and set the UI
       * @param presenterSessionData The array of presenter object
       * @private
       */
  processPresenterSessionData: function(presenterSessionData) {
      var deviceWidth = kony.os.deviceInfo().screenWidth;
      var speakerImgWidth = deviceWidth - 90;
      var speakerImgHeight = speakerImgWidth * 1.02;
      speakerImgHeight = speakerImgHeight.toFixed();
      var screenHeight = kony.os.deviceInfo().screenHeight;
      var flexHeight = screenHeight - 271;
      var imageHeight = parseInt(speakerImgHeight) + 150;
    for (var index = 0; index < presenterSessionData.length; index++) {
      var presenterObject = presenterSessionData[index];
      var presenterShortBio = presenterObject.hasOwnProperty("speaker_bio") ? presenterObject.speaker_bio.slice(0, 50) + "..." : "";
      presenterObject.shortBio = presenterShortBio;
      presenterObject.speakerImgHeight = speakerImgHeight;
      presenterObject.flexHeight = flexHeight;
      presenterObject.imageHeight = imageHeight;
      presenterObject.speakerImgWidth = speakerImgWidth;
      this.setPresenterList(presenterObject);
    }
  },

  sortPresenterDataByDate : function(sessionData){
    if(sessionData !== null && sessionData !== undefined && sessionData.length >= 2){
      sessionData.sort((a,b) => 
                       new Date(a.session_start_date).getTime() - new Date(b.session_start_date).getTime());
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
    if(presenter.speaker_profile_pic) {
      this.view.imgProfileLarge.src = presenter.speaker_profile_pic;      
    }else {
      this.view.imgProfileLarge.src = "defaultimg.png";      
    }
    var imgWidth = kony.os.deviceInfo().screenWidth;
    imgWidth = imgWidth * eventConstants.ASPECT_RATION_CONSTANT;
    this.view.imgProfileLarge.height = imgWidth + "dp";
    this.view.flxImagelargeView.height = imgWidth + "dp";
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
    this.sortPresenterDataByDate(sessions);
    this.view.flexSessions.removeAll();
    var isSessionPresent = null;
    var myScheduleData = kony.store.getItem("myAgendaData");
    for (var index = 0; index < sessions.length; index++) {    

      if(sessions[index].session_track_id === 4){
        continue;
      }

      if(sessions[index].SoftDeleteFlag!==undefined && sessions[index].SoftDeleteFlag === true) {
        continue;
      }
      var id = "sessiontile" + sessions[index].event_session_id;

      if(myScheduleData) {
        isSessionPresent = myScheduleData[sessions[index].event_session_id];
      }

      if(sessions[index].session_start_date.indexOf(" ")!=-1) {
        sessions[index].session_start_date = sessions[index].session_start_date.replace(" ","T")+"0Z";
        sessions[index].session_end_date = sessions[index].session_end_date.replace(" ","T")+ "0Z";
      }

      if(isSessionPresent) {
        sessions[index].isAddedToMySchedule = true;
      } else {
        sessions[index].isAddedToMySchedule = false;
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
    this.view[id].onClick = this.onClickOfSessionTile.bind(this);
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
    this.view.presenterScroll.scrollToWidget(this.view[presenters[0].id]);
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
    this.view.imgTickKeynote.src = "tickinactive.png";
  },

  /**
     * @function navigateToPresenterDetailsById
     * @description search the speaker in the list by Id and loads the speaker detail
     * @param {String} - id of the speaker
     * @private
     */
  navigateToPresenterDetailsById : function(id){
    for(var index=0; index<accelerateSpeakerData.eventSpeakerData.records.length; index++) {
      var presenterObject = accelerateSpeakerData.eventSpeakerData.records[index];
      if(presenterObject.speaker_id === id){
        this. onClickOfPresenter(presenterObject);
        break;
      }
    }
  },

  /**
     * @function navigateBackToSessionListPage
     * @description navigates back to the list from on Close
     * @private
     */
  navigateBackToSessionListPage : function(){
    var naviConfig={
      "transferCode":100,
      "formId":this.view.id
    };
    var navObj = new kony.mvc.Navigation(this.formId);
    navObj.navigate(naviConfig);
  },

  /**
     * @function onClickOfSessionTile
     * @description invokes onClick of session tile in the presenter details
     * @param {object} - eventobject from the callback
     * @private
     */
  onClickOfSessionTile : function(eventobject){
    var param = {
      "session" : this.view[eventobject.id],
      "form" : "frmPresenters"
    };
    var navObj = new kony.mvc.Navigation("frmAgenda");
    navObj.navigate(param);
  },
  destroyForm:function(){
    try{
      kony.application.destroyForm("frmAgenda");
    }
    catch(exception){
      kony.print(JSON.stringify(exception));
    }
  }

});
