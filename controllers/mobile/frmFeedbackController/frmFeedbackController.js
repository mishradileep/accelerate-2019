define({

    selectedImage: "starselected.png",
    unselectedImage: "starunselected.png",
    ratingQuestionId: "11",
    feedbackQuestionId: "12",
    opinion_id: 18,
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
        var currentUserInfo = kony.store.getItem("currentUserInfo");
        var userId = currentUserInfo.user_id;
        if (kony.sdk.isNullOrUndefined(this.index)) {
            this.index = 0;
        }
        var feedback = this.view.txtAreaComments.text;
        var feedbacks = [];
        var rating = {
            "userId": userId,
            "opinion_question_id": this.feedbackQuestionId,
            "response_text": feedback,
            "opinion_id": this.opinion_id,
        };
        var feedbackComment = {
            "userId": userId,
            "opinion_question_id": this.ratingQuestionId,
            "opinion_id": this.opinion_id,
            "response_text": this.index,
        };
        feedbacks.push(rating);
        feedbacks.push(feedbackComment);
        var batch = {
            "records": feedbacks
        };
        createRecord(eventConstants.OBJECT_SERVICE_NAME,eventConstants.DATA_MODEL_OPINION_ANSWERS, batch, this.successInStoreFeedback.bind(this), this.failInStoreFeedback.bind(this));
      	kony.print("Exiting frmFeedbackController : onClickOfSubmitButton function");
    },

    /**
     * @function successInStoreFeedback
     * @description this function is the success callback of the createRecord function
     * @param response - contains the info of the response object.
     * @private
     */
    successInStoreFeedback: function(response) {
      	kony.print("Entering frmFeedbackController : successInStoreFeedback function");
        alert("success in storing feedback");
      	kony.print("Exiting frmFeedbackController : successInStoreFeedback function");
    },
    /**
     * @function failInStoreFeedback
     * @description this function is the failure callback for the createRecord function.
     * @param error - contains the info of the error object.
     * @private
     */
    failInStoreFeedback: function(error) {
      	kony.print("Entering frmFeedbackController : failInStoreFeedback function");
        alert("failure in storing the feedback");
      	kony.print("Exiting frmFeedbackController : failInStoreFeedback function");
    },
  
  
  	animateFeedbackFields : function(){
      var self = this;
      this.view.flxFeedbackPrompt.animate(
      kony.ui.createAnimation(
        {100:{"top":"100dp"}}),
      {delay: 0, fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.5},
      {animationEnd: function() {}});
    }

});
