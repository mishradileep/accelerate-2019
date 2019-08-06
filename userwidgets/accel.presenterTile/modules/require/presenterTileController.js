define(function() {

  return {



    /**
     * @function setData
     * @description This function will set data to details flex
     * @param presenter The presenter object
     * @private
     */
    setData : function(presenterObject) {
      this.presenterObject = presenterObject;
      this.view.speakerName.text = presenterObject.speaker_name;
      this.view.speakerTitle.text = presenterObject.speaker_title;
      this.view.speakerInfo.text = presenterObject.shortBio;
      this.view.speakerImage.src = presenterObject.speaker_profile_pic;
      var tracks = presenterObject.tracks ? JSON.parse(presenterObject.tracks) : [];
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
