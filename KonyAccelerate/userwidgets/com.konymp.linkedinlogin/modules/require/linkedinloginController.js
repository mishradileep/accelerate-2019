/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(['com/konymp/linkedinlogin/constants'],function(constantsLocal) {
    var konyLoggerModule = require('com/konymp/linkedinlogin/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule(constantsLocal.COMPONENT_NAME)) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            var analytics = require("com/konymp/" + "linkedinlogin" + "/analytics");
            analytics.notifyAnalytics();

        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {

        },
      	 /**
         * @function invokeInit
         * @description Function which expands to the screen , to provide space for browser
         * @private
         */
        invokeInit: function() {
            this._intialHeight = this.view.height;
            this._initialWidth = this.view.width;
            this._initalTop = this.view.top;
            this._initalLeft = this.view.left;
            this._initalRight = this.view.right;
            this._intialBottom = this.view.bottom;
            this._centerX = this.view.centerX;
            this._centerY = this.view.centerY;
            this.view.zIndex = 10;
            this.view.flxIdentity.isVisible = true;
            this.view.height = "100%";
            this.view.width = "100%";
            this.view.centerY = "50%";
            this.view.flxMain.isVisible = false;
            this.view.forceLayout();
            this.invokeIdentityService(eventConstants.PROVIDER_NAME);
        },
      	 /**
         * @function invokeIdentityService
         * @description  invokes IdentityService
         * @private
         * @param {String} providerName tells which identity service need to be invoked 
         */
        invokeIdentityService: function(providerName) {
            konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :invokeIdentityService api---------------", konymp.logger.FUNCTION_ENTRY);
            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                this.resetPosition();
                alert(constantsLocal.NO_INTERNET_CONNECTION);
                return;
            }
            try {
                var argument = {};
                var authorizationClient = null;
                kony.application.showLoadingScreen(null, constantsLocal.LOADING, constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
                var sdkClient = new kony.sdk.getCurrentInstance();
                if (Object.keys(sdkClient).length !== 0) {
                    authorizationClient = sdkClient.getIdentityService(providerName);
                }
                if (authorizationClient === null || authorizationClient === undefined) {
                    kony.application.dismissLoadingScreen();
                    konymp.logger.info(constantsLocal.AUTHORIZATION_NULL_OBJECT);
                    this.resetPosition();
                    alert(constantsLocal.MF_ALERT_MESSAGE);
                    return;
                }
                this.view.forceLayout();
                argument.browserWidget = this.view.brwsrIdentity;
                kony.application.dismissLoadingScreen();
                this.authorizationClient = authorizationClient;
                konymp.logger.info("Network call to MF for identity authentication", konymp.logger.SERVICE_CALL);
                authorizationClient.login(argument, this.loginSuccessWrapper.bind(this), this.failureWrapper.bind(this));
            } catch (exception) {
                kony.application.dismissLoadingScreen();
                this.resetPosition();
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :invokeIdentityService api---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function successWrapper
         * @description Success callback for invokeIdentityService
         * @private
         * @param {Object} response contanis empty response object
         * @callback invokeIdentityServiceCallback
         * @event loginSuccessEvent
         */
        successWrapper: function(response) {
            konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :successWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Invoke identity service success---" + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
            try {
                kony.application.dismissLoadingScreen();
                this.resetPosition();
                if (this.onLoginSuccess != null && this.onLoginSuccess != undefined) {
                    this.onLoginSuccess(response);
                } else {
                    alert(constantsLocal.DEFAULT_SUCCESS_MESSAGE);
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :successWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureWrapper
         * @description Failure callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event loginFailureEvent
         */
        failureWrapper: function(response) {
            konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :failureWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Invoke identity service failure" + JSON.stringify(response), konymp.logger.ERROR_CALLBACK);
            try {
                kony.application.dismissLoadingScreen();
                this.resetPosition();
                if (this.onLoginFailure !== null && this.onLoginFailure !== undefined) {
                    konymp.logger.info("Invoking Login Failure event");
                    this.onLoginFailure(response);
                } else {
                    alert(constantsLocal.DEFAULT_FAILURE_MESSAGE);
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" : failureWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function resetPosition
         * @description Resets the position of the icon and browser
         * @private
         */
        resetPosition: function() {
            konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" : resetPosition function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                this.view.zIndex = 5;
                this.view.height = this._intialHeight;
                this.view.width = this._initialWidth;
                this.view.top = this._initalTop;
                this.view.left = this._initalLeft;
                this.view.right = this._initalRight;
                this.view.bottom = this._intialBottom;
                this.view.centerX = this._centerX;
                this.view.centerY = this._centerY;
                this.view.flxIdentity.isVisible = false;
                this.view.flxMain.isVisible = true;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :resetPosition function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function loginSuccessWrapper
         * @description In Callback of login , we will try to fetch the profile attributes
         * @private
         */
        loginSuccessWrapper: function() {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :loginSuccessWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            this.authorizationClient.getUserAttributes(this.successInFetchingUserAttributes.bind(this), this.failureWrapper.bind(this));
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :loginSuccessWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function successInFetchingUserAttributes
         * @description Callback function 
         * @param {Object} userData - contains the info about User who logs in
         * @private
         */
        successInFetchingUserAttributes: function(userData) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :successInFetchingUserAttributes function---------------", konymp.logger.FUNCTION_ENTRY);
            var userInfo = {};
            userInfo.first_name = userData.firstName.localized.en_US;
            userInfo.last_name = userData.lastName.localized.en_US;
            userInfo.profile_pic_url = userData.profilePicture["displayImage~"].elements[0].identifiers["0"].identifier;
            this._currentUserInfo = userInfo;
            this.invokeIntegrationService("LinkedinProfileService", "getEmailId", this.successInFetchingEmailId.bind(this), this.failureInFetchingEmailId.bind(this));
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :successInFetchingUserAttributes function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function successInFetchingEmailId
         * @description Success Callback function 
         * @param {Object} response - contains the info about User's EmailId  who logs in
         * @private
         */
        successInFetchingEmailId: function(response) {
          konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :successInFetchingEmailId function---------------", konymp.logger.FUNCTION_ENTRY);
            this._currentUserInfo.mail = response["handle~"][0].emailAddress;
            createRecord(constantsLocal.OBJECT_SERVICE_NAME,constantsLocal.USERS, this._currentUserInfo, this.userInfoSaved.bind(this), this.userInfoSavingFailed.bind(this));
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :successInFetchingEmailId function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureInFetchingEmailId
         * @description Error Callback function 
         * @param {Object} error - gives the error status
         * @private
         */
        failureInFetchingEmailId: function(error) {
          konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :failureInFetchingEmailId function---------------", konymp.logger.FUNCTION_ENTRY);
            this.failureWrapper(error);
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :failureInFetchingEmailId function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureInFetchingUserAttributes
         * @description Error Callback function 
         * @param {Object} error - gives the error status
         * @private
         */
        failureInFetchingUserAttributes: function(error) {
          konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :failureInFetchingUserAttributes function---------------", konymp.logger.FUNCTION_ENTRY);
          this.failureWfailureWrapper(error);
          konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :failureInFetchingUserAttributes function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureInFetchingUserProfile
         * @description Error Callback function 
         * @param {Object} error - gives the error status
         * @private
         */
        failureInFetchingUserProfile: function(error) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :failureInFetchingUserProfile function---------------", konymp.logger.FUNCTION_ENTRY);
          	this.failureWrapper(error);
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :failureInFetchingUserProfile function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function userInfoSaved
         * @description Success Callback function 
         * @param {Object} response - Contains info about the user which data is saved in Users dataObject successfully
         * @private
         */
        userInfoSaved: function(response) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" : userInfoSaved function---------------", konymp.logger.FUNCTION_ENTRY);
            var userInfo = this._currentUserInfo;
            userInfo.user_id = response.user_id;
            this.successWrapper(userInfo);
            kony.store.setItem("currentUserInfo", userInfo);
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :userInfoSaved function---------------", konymp.logger.FUNCTION_EXIT);
            
        },
        /**
         * @function userInfoSavingFailed
         * @description Error Callback function 
         * @param {Object} err - contains the Info why error has occured
         * @private
         */
        userInfoSavingFailed: function(err) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :userInfoSavingFailed function---------------", konymp.logger.FUNCTION_ENTRY);
            if (err.opstatus == 20004) {
                this.findUserIdExistsOrNot(this._currentUserInfo.mail);
            }
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :userInfoSavingFailed function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function findUserIdExists
         * @description Query function 
         * @param {String} email - which need to searched in Kony storage objects
         * @private
         */
        findUserIdExistsOrNot: function(email) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :findUserIdExistsOrNot function---------------", konymp.logger.FUNCTION_ENTRY);
            var odataUrl = "mail eq '" + email + "' and ((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))";
          	var queryparam={
              "$filter":odataUrl,
            };
            fetchObjectData(constantsLocal.OBJECT_SERVICE_NAME,constantsLocal.USERS, queryparam, this.userIdRetrieveSuccess.bind(this), this.userIdRetrieveFailed.bind(this));
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :findUserIdExistsOrNot function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function userIdRetrievedSuccessfully
         * @description Query function 
         * @param {Object} userInfo - info on user who logged in 
         * @private
         */
        userIdRetrieveSuccess:function(userInfo) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :userIdRetrieveSuccess function---------------", konymp.logger.FUNCTION_ENTRY);
            var currentUserInfo = userInfo.records[0];
            kony.store.setItem("currentUserInfo", currentUserInfo);
            this.successWrapper(currentUserInfo);
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :userIdRetrieveSuccess function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function userIdRetrieveFailed
         * @description Error Callback function 
         * @param {Object} error - error Info Object
         * @private
         */
        userIdRetrieveFailed: function(error) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :userIdRetrieveFailed function---------------", konymp.logger.FUNCTION_ENTRY);
            this.failureWrapper(error);
          	konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :userIdRetrieveFailed function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function invokeIntegrationService
         * @description Genric function to invoke identity service
         * @private
         * @param {Object} serviceName
         * @param {Object} operationName
         * @callback successCallback
         * @callback failureCallback
         */
        invokeIntegrationService: function(serviceName, operationName, successCallback, failureCallback) {
          	konymp.logger.trace("---------------Entering "+constantsLocal.COMPONENT_NAME+" :invokeIntegrationService function---------------", konymp.logger.FUNCTION_ENTRY);
            var client = kony.sdk.getCurrentInstance();
            var integrationSvc = client.getIntegrationService(serviceName);
            integrationSvc.invokeOperation(operationName, {}, {}, function(response) {
                successCallback(response);
            }.bind(this), function(error) {
                failureCallback(error);
            }.bind(this), {});
          konymp.logger.trace("---------------Exiting "+constantsLocal.COMPONENT_NAME+" :invokeIntegrationService function---------------", konymp.logger.FUNCTION_EXIT);
        },

    };
});