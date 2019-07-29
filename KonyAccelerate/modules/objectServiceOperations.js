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