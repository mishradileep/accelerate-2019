define(function() {

    return {
        /**
         *	@function setSpeakerProfileInRating
         * 	@description This function is used to set the speaker info to the UI Elements
         *	@param speaker {Object} -traverses the Speaker_master data and fiiter the speaker from it.
         * 	@private
         */
      	selectedIndex:null,
      	previousSelectedIndex:null,
      	speakerId:-1,
      	ratingBubbleActive:"CopydefBtnNormal0ffe40ef31c054e",
      	ratingBubbleInactive:"CopydefBtnNormal0daedd629f85e4d",
        setSpeakerProfileInRating: function(speaker) {
            this.view.ratingSpeakerImage.src = speaker.speaker_profile_pic;
            this.view.ratingSpeakerName.text = speaker.speaker_name;
            this.view.ratingSpeakerTitle.text = speaker.speaker_title;
          	this.speakerId=speaker.speaker_id;
        },
      /**
         *	@function setFocusOnClick
         * 	@description This function is used to change the skins of the button when user clicks on it.
         *	@param eventObject {Object} -gives the info on which button is being clicked.
         * 	@private
         */
      setFocusOnClick:function(eventObject){
        var index=parseInt(eventObject.id.charAt(eventObject.id.length-1));
        var unanimatedButton;
          this.view["ratingBubble"+index].skin=this.ratingBubbleActive;
        	if(!kony.sdk.isNullOrUndefined( this.view["ratingBubble"+this.previousSelectedIndex])){
              this.view["ratingBubble"+this.previousSelectedIndex].skin=this.ratingBubbleInactive;
              unanimatedButton=this.view["ratingBubble"+this.previousSelectedIndex];
            }
          this.animateButton( this.view["ratingBubble"+index],unanimatedButton);
        if(!kony.sdk.isNullOrUndefined(this.view["ratingLevel"+index])){
          this.view["ratingLevel"+index].skin="ratingSkinActive";
        }
         if(!kony.sdk.isNullOrUndefined(this.view["ratingLevel"+this.previousSelectedIndex])){
          this.view["ratingLevel"+this.previousSelectedIndex].skin="ratingSkinInActive";
        }
        this.previousSelectedIndex=index;
        this.selectedIndex=index;
      },
      /**
         *	@function animateButton
         * 	@description This function is used to scale the selectedButton and de scale the previous selected button
         *	@param selectedButton {Object} -gives the info on which button is being clicked.
         *	@param unSelecetedButton {Object} -gives the info on which button is being clicked.
         * 	@private
         */
      animateButton:function(selectedButton , unSelecetedButton){
        var transformSelectedButton = kony.ui.makeAffineTransform();
    	var transformUnSelectedButton = kony.ui.makeAffineTransform();
    	transformUnSelectedButton.scale(1, 1);
    	transformSelectedButton.scale(1.125, 1.125);
        selectedButton.animate(this.createAnimationObject(transformSelectedButton),this.getPlatformSpecific(),null);
        if(!kony.sdk.isNullOrUndefined(unSelecetedButton)){
          unSelecetedButton.animate(this.createAnimationObject(transformUnSelectedButton),this.getPlatformSpecific(),null);
        }
        
      },
      /**
         *	@function createAnimationObject
         * 	@description This generic function is used to create Animation Object and return it. 
         *	@param width {String} -final Width value to scaled
         *	@param height {String} -final Height value to scaled
         * 	@private
         */
      createAnimationObject:function(transformationObject){
        var animationObejct=kony.ui.createAnimation({
        100: {
          "transform":transformationObject,
          "stepConfig": {}
        }
      });
        return animationObejct;
      },
      /**
         *	@function getPlatformSpecific
         * 	@description This generic function is to return the animationConfig
         * 	@private
         */
      getPlatformSpecific:function(){
        var specificObj= {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.22
      };
        return specificObj;
      },
      /**
         *	@function setDefaultSelectedIndex
         * 	@description This generic function is to set default rating index as 3
         * 	@private
         */
      resetAllSkins:function(){
       for(var index=1;index<=5;index++){
         this.view["ratingBubble"+index].skin=this.ratingBubbleInactive;
       }
       this.selectedIndex=null;
      }
        
      
      
     
    };
});