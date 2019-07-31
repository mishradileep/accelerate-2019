	/**
        * @function fetchObjectData
        * @description This function is used to fetch the object specified
        * @param objectService The object service name 
        * @param dataModelObject The data object name for which data needs to be fetched
        * @param queryParams The query params required for the service
        * @param successCallback The callback function which is invoked on 
        		 the succesful execution of the service
        * @param errorCallback The callback function which is invoked in case of any error/exceptions
        * @private
    */
	function fetchObjectData(objectService, dataModelObject, queryParams, successCallback, 
                              errorCallback) {
	    try {
	        var sdkClient = new kony.sdk.getCurrentInstance();
	        var objectInstance;
	        if (Object.keys(sdkClient).length !== 0) {
	            objectInstance = sdkClient.getObjectService(objectService, {
	                "access": eventConstants.ACCESS_TYPE_ONLINE
	            });
	        }
	        if (objectInstance === null || objectInstance === undefined) {
	            kony.application.dismissLoadingScreen();
	            throw {
	                "error": eventConstants.NETWORK_ERROR_TYPE,
	                "message": eventConstants.CONNECTION_MESSAGE_STRING
	            };

	        }
	        var dataObject = new kony.sdk.dto.DataObject(dataModelObject);
	        var options = {
	            "dataObject": dataObject,
	            "headers": {
	                "Content-Type": "application/json"
	            },
	            "queryParams": queryParams
	        };
	        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
	            objectInstance.fetch(options, successCallback, errorCallback);
	        } else {
	            throw {
	                "error": eventConstants.NETWORK_ERROR_TYPE,
	                "message": eventConstants.CONNECTION_MESSAGE_STRING
	            };
	        }
	    } catch (exception) {
	        kony.application.dismissLoadingScreen();
	        alert(exception.message);
	    }

	}

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
    function createRecord(objectService, dataModelObject, record, successCallback, errorCallback) {
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
    }