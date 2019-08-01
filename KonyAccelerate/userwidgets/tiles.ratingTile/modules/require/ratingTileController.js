define(function() {

    return {
        /**
         *	@function setSpeakerProfileInRating
         * 	@description This function is used to set the speaker info to the UI Elements
         *	@param speaker {Object} -traverses the Speaker_master data and fiiter the speaker from it.
         * 	@private
         */
        setSpeakerProfileInRating: function(speaker) {
            this.view.ratingSpeakerImage.src = speaker.speaker_profile_pic;
            this.view.ratingSpeakerName.text = speaker.speaker_name;
            this.view.ratingSpeakerTitle.text = speaker.speaker_title;
        }
    };
});