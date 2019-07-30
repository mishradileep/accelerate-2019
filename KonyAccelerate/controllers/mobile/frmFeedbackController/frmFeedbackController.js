define({

    //Type your controller code here 
    selectedImage: "starselected.png",
    unselectedImage: "starunselected.png",
    objectServiceL: "KonyAccelerateStorageService",
    dataModelObject: "opinion_answers",
    ratingQuestionId: "11",
    feedbackQuestionId: "12",
    opinion_id: 18,
    /**
     * @function onClickOfRatingPrompt
     * @scope private
     * @description this function is invoked to toggle the selected and unselected images.
     * @param eventObject - contains the info of the widget which is clicked.
     */
    onClickOfRatingPrompt: function(eventObject) {
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

    },
    /**
     * @function onClickOfRatingPrompt
     * @scope private
     * @description this function is invoked to toggle the selected and unselected images.
     * @param eventObject - contains the info of the widget which is clicked.
     */
    onClickOfSubmitButton: function() {
        var currentUserInfo=kony.store.getItem("currentUserInfo");
      	var userId=currentUserInfo.user_id;
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
        this.createRecord(this.objectServiceL, this.dataModelObject, batch, this.successInStoreFeedback.bind(this), this.failInStoreFeedback.bind(this));

    },
    /**
     * @function createRecord
     * @scope private
     * @description this is generic function to make POST operation to kony storage objects.
     * @param objectService {String} - Name of Kony Object Service.
     * @param dataModelObject {String} - Name of Kony dataObject.
     * @param record {Object}- JSONArray which is used as batch to create records.
     * @param successCallback {Callback} - SuccessCallback to be invoked when the operation is successful.
     * @param errorCallback {Callback}- FailureCallback to be invoked when the operation fails.
     */
    createRecord: function(objectService, dataModelObject, record, successCallback, errorCallback) {
        try {

            var sdkClient = new kony.sdk.getCurrentInstance();
            var objectInstance;
            if (Object.keys(sdkClient).length !== 0) {
                objectInstance = sdkClient.getObjectService(objectService, {
                    "access": "online"
                });
            }
            if (objectInstance === null || objectInstance === undefined) {
                kony.application.dismissLoadingScreen();
                throw {
                    "error": "ConnectionError",
                    "message": "Please connect app to MF"
                };

            }
            var dataObject = new kony.sdk.dto.DataObject(dataModelObject);

            dataObject.setRecord(record);

            var options = {
                "dataObject": dataObject,
                "headers": {
                    "Content-Type": "application/json"
                },
            };
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                objectInstance.create(options, successCallback, errorCallback);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            throw exception;
        }
    },
    /**
     * @function successInStoreFeedback
     * @scope private
     * @description this function is the success callback of the createRecord function
     * @param response - contains the info of the response object.
     */
    successInStoreFeedback: function(response) {
        alert("success in storing feedback");
    },
    /**
     * @function failInStoreFeedback
     * @scope private
     * @description this function is the failure callback for the createRecord function.
     * @param error - contains the info of the error object.
     */
    failInStoreFeedback: function(error) {
        alert("failure in storing the feedback");
    }


});