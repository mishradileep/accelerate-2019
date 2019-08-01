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
    }

  };
});