define(function() {

    return {
        /**
         *	@function setSpeakerProfileInRating
         * 	@description This function is used to set the speaker info to the UI Elements
         *	@param speaker {Object} -traverses the Speaker_master data and fiiter the speaker from it.
         * 	@private
         */
      	selectedIndex:3,
      	previousSelectedIndex:3,
        setSpeakerProfileInRating: function(speaker) {
            this.view.ratingSpeakerImage.src = speaker.speaker_profile_pic;
            this.view.ratingSpeakerName.text = speaker.speaker_name;
            this.view.ratingSpeakerTitle.text = speaker.speaker_title;
        },
      /**
         *	@function setFocusOnClick
         * 	@description This function is used to change the skins of the button when user clicks on it.
         *	@param eventObject {Object} -gives the info on which button is being clicked.
         * 	@private
         */
      setFocusOnClick:function(eventObject){
        var index=parseInt(eventObject.id.charAt(eventObject.id.length-1));
        if(index!= this.previousSelectedIndex){
          var skin=this.view["ratingBubble"+index].skin;
          this.view["ratingBubble"+index].skin=this.view["ratingBubble"+this.previousSelectedIndex].skin;
          this.view["ratingBubble"+this.previousSelectedIndex].skin=skin;
        }
        this.previousSelectedIndex=index;
        this.selectedIndex=index;
      }
     
    };
});