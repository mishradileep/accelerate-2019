define(function() {

  return {



    /**
     * @function setData
     * @description This function will set data to details flex
     * @param presenter The presenter object
     * @private
     */
    setData : function(presenterObject) {
      var speakerImgHeight = presenterObject.speakerImgHeight;
      var flexHeight = presenterObject.flexHeight;
      var imageHeight = presenterObject.imageHeight;
      var speakerImgWidth = presenterObject.speakerImgWidth;
       this.view.speakerImage.height = parseInt(speakerImgHeight) + "dp";
      if(imageHeight>flexHeight) {
        this.view.speakerDetails.bottom = 0 +"dp";
        this.view.speakerDetails.height = "110dp";
        this.view.speakerInfo.isVisible = false;
        this.view.FlexGroup0b8c01e2d521f41.layoutType = kony.flex.FREE_FORM;
      } else {
        this.view.speakerDetails.top = "0dp";
        this.view.speakerDetails.height = "150dp";
        this.view.speakerInfo.isVisible = false;
        this.view.FlexGroup0b8c01e2d521f41.layoutType = kony.flex.FLOW_VERTICAL;
      }
      //#ifdef iphone
      this.view.speakerImage.imageWhileDownloading = "loader560x570.gif";
      //#endif
      this.view.speakerImage.width = speakerImgWidth + "dp";
      this.presenterObject = presenterObject;
      this.view.speakerName.text = presenterObject.speaker_name;
      this.view.speakerTitle.text = presenterObject.speaker_title;
      this.view.speakerInfo.text = presenterObject.shortBio;
      if(presenterObject.speaker_profile_pic) {
        this.view.speakerImage.src = presenterObject.speaker_profile_pic;
      }else {
        this.view.speakerImage.src = "defaultimg.png";
      }
      
      var tracks = presenterObject.tracks ? (presenterObject.tracks) : [];
      this.setTracks(tracks);
    },



    /**
     * @function setOnClickListenerOfPresenterCard
     * @description This function is used to create the PresenterTile dynamically
     * @param onClickListener onClicklistener
     * @private
     */
    setOnClickListenerOfPresenterCard : function(onClickListener) {     
      this.onClickListener = onClickListener;
    },


    /**
     * @function setPresenterList
     * @description This function is used to create the PresenterTile dynamically
     * @param presenterSessionData The array of presenter object
     * @private
     */

    onClickOfSpeaker : function() {
      if(this.onClickListener) {
        this.onClickListener(this.presenterObject);
      }
    },

    /**
     * @function setTracks
     * @description This function is used to set tracks in a map for presenter
     * @param tracks The array of track ids
     * @private
     */
    setTracks : function(tracks){
      this.tracks = {};
      for(var index=0; index<tracks.length; index++){
        this.tracks[tracks[index]]= 1;
      }
    },

    /**
     * @function setTracks
     * @description This function is used to return track map
     * @private
     */
    getTracks : function(){
      return this.tracks;
    }

  };
});
