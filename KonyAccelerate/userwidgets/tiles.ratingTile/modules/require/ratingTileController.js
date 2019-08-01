define(function() {

	return {
      setSpeakerProfileInRating:function(speaker){
        this.view.ratingSpeakerImage.src=speaker.speaker_profile_pic;
        this.view.ratingSpeakerName.text=speaker.speaker_name;
        this.view.ratingSpeakerTitle.text=speaker.speaker_title;
      }
	};
});