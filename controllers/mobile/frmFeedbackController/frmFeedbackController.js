define({

    selectedImage: "starselected.png",
    unselectedImage: "starunselected.png",
    ratingQuestionId: "11",
    feedbackQuestionId: "12",
    opinion_id: 18,
    animDuration: 0.2,
  	callback:null,
    /**
     * @function onClickOfRatingPrompt
     * @description this function is invoked to toggle the selected and unselected images.
     * @param eventObject - contains the info of the widget which is clicked.
     * @private
     */
    onClickOfRatingPrompt: function(eventObject) {
        kony.print("Entering frmFeedbackController : onClickOfRatingPrompt function");
        var id = eventObject.id;
        var index = parseInt(id[id.length - 1]);
        this.index = index + 1;
        for (var iterate = 0; iterate <= 4; iterate++) {
            if (iterate <= index) {
                this.view["imgRating" + iterate].src = this.selectedImage;
            } else {
                this.view["imgRating" + iterate].src = this.unselectedImage;
            }
        }
        kony.print("Exiting frmFeedbackController : onClickOfRatingPrompt function");
    },
    /**
     * @function onClickOfSubmitButton
     * @description this function is invoked to toggle the selected and unselected images.
     * @param eventObject - contains the info of the widget which is clicked.
     * @private
     */
    onClickOfSubmitButton: function() {
        kony.print("Entering frmFeedbackController : onClickOfSubmitButton function");
      	this.callback=this.showThankyou;
      	this.animateSubmitButton("100%", true);
        if (kony.sdk.isNullOrUndefined(this.index)) {
            this.index = 0;
        }
        var feedback = this.view.txtAreaComments.text;
        var feedbacks = [];
        var rating = {
            "opinion_question_id": this.feedbackQuestionId,
            "response_text": feedback,
            "opinion_id": this.opinion_id,
        };
        var feedbackComment = {
            "opinion_question_id": this.ratingQuestionId,
            "opinion_id": this.opinion_id,
            "response_text": this.index,
        };
        feedbacks.push(rating);
        feedbacks.push(feedbackComment);
        var batch = {
            "records": feedbacks
        };
        createRecord(eventConstants.OBJECT_SERVICE_NAME, eventConstants.DATA_MODEL_OPINION_ANSWERS, batch, this.successInStoreFeedback.bind(this), this.failInStoreFeedback.bind(this));
        kony.print("Exiting frmFeedbackController : onClickOfSubmitButton function");
    },

    /**
     * @function successInStoreFeedback
     * @description this function is the success callback of the createRecord function
     * @param response - contains the info of the response object.
     * @private
     */
    successInStoreFeedback: function(response) {
      	kony.store.setItem("appfeedbackSubmit", true);
        kony.print("Entering frmFeedbackController : successInStoreFeedback function");
        kony.print("Exiting frmFeedbackController : successInStoreFeedback function");
//       	this.callback=this.showThankyou;
//       	this.animateSubmitButton("100%", true);
    },
    /**
     * @function failInStoreFeedback
     * @description this function is the failure callback for the createRecord function.
     * @param error - contains the info of the error object.
     * @private
     */
    failInStoreFeedback: function(error) {
        kony.print("Entering frmFeedbackController : failInStoreFeedback function");
        kony.print("Exiting frmFeedbackController : failInStoreFeedback function");
//      	this.callback=this.showThankyou;
//       	this.animateSubmitButton("100%", true);
    },

    /** 
    	* @function animateFeedbackPrompt
        * @description This function is used to animate the feedback prompt 
        				container to a desired position with the animations 
                        (top to bottom and bottom to top) depending upon the flag
        * @param finalTop The final top position to which the widget needs to be animated
        * @param isClose The flag to indicate the navigation (in/out) to the form
        * @private
    */
    animateFeedbackPrompt: function(finalTop, isClose) {
        var self = this;
        this.view.flxFeedbackPrompt.animate(
            kony.ui.createAnimation({
                100: {
                    "top": finalTop
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: this.animDuration
            }, {
                animationEnd: function() {
                    if (!isClose)
                        self.animateRatingContainer("220dp", isClose);
                    else
                        this.callback();
                }.bind(self)
            });
    },

    /** 
    	* @function animateRatingContainer
        * @description This function is used to animate the rating 
        				container to a desired position with the animations 
                        (top to bottom and bottom to top) depending upon the flag
        * @param finalTop The final top position to which the widget needs to be animated
        * @param isClose The flag to indicate the navigation (in/out) to the form
        * @private
    */
    animateRatingContainer: function(finalTop, isClose) {
        this.view.flxRating.animate(
            kony.ui.createAnimation({
                100: {
                    "top": finalTop
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: this.animDuration
            }, {
                animationEnd: function() {
                    if (!isClose)
                        this.animateCommentsLabel("285dp", isClose);
                    else
                        this.animateFeedbackPrompt("100%", isClose);
                }.bind(this)
            });
    },

    /** 
    	* @function animateCommentsLabel
        * @description This function is used to animate the comments label 
        			     to a desired position with the animations 
                        (top to bottom and bottom to top) depending upon the flag
        * @param finalTop The final top position to which the widget needs to be animated
        * @param isClose The flag to indicate the navigation (in/out) to the form
        * @private
    */
    animateCommentsLabel: function(finalTop, isClose) {
        this.view.lblShowComments.animate(
            kony.ui.createAnimation({
                100: {
                    "top": finalTop
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: this.animDuration
            }, {
                animationEnd: function() {
                    if (!isClose)
                        this.animateCommentsArea("325dp", isClose);
                    else
                        this.animateRatingContainer("100%", isClose);
                }.bind(this)
            });
    },

    /** 
    	* @function animateCommentsArea
        * @description This function is used to animate the comments text area 
        			     to a desired position with the animations 
                        (top to bottom and bottom to top) depending upon the flag
        * @param finalTop The final top position to which the widget needs to be animated
        * @param isClose The flag to indicate the navigation (in/out) to the form
        * @private
    */
    animateCommentsArea: function(finalTop, isClose) {
        this.view.txtAreaComments.animate(
            kony.ui.createAnimation({
                100: {
                    "top": finalTop
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: this.animDuration
            }, {
                animationEnd: function() {
                    if (!isClose){
                        this.animateSubmitButton("510dp", isClose);
                    }
                    else{
                        this.animateCommentsLabel("100%", isClose);
                    }
                }.bind(this)
            });
    },

    /** 
    	* @function animateSubmitButton
        * @description This function is used to animate the submit button
        			     to a desired position with the animations 
                        (top to bottom and bottom to top) depending upon the flag
        * @param finalTop The final top position to which the widget needs to be animated
        * @param isClose The flag to indicate the navigation (in/out) to the form
        * @private
    */
    animateSubmitButton: function(finalTop, isClose) {
        this.view.btnSubmit.animate(
            kony.ui.createAnimation({
                100: {
                    "top": finalTop
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: this.animDuration
            }, {
                animationEnd: function() {
                    if (isClose)
                        this.animateCommentsArea("100%", isClose);
                }.bind(this)
            });
    },
  showThankyou:function(){
    this.view.flxThankyou.isVisible=true;
  },
  navigateToFrmMore:function(){
    new kony.mvc.Navigation("frmMore").navigate();
  }
});