/*
#
#  Created by Team Kony.
#  Copyright (c) 2018 Kony Inc. All rights reserved.
#
*/
define(function() {
    var konyLoggerModule = require('com/konymp/googlelogin/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Google login Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    constants.DEFAULT_SUCCESS_MESSAGE = "Login Success";
    constants.DEFAULT_FAILURE_MESSAGE = "Login Failed";
    constants.MF_ALERT_MESSAGE = "Please connect to MobileFabric";

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"googlelogin"+"/analytics");
            analytics.notifyAnalytics();
          
          this._deviceName = kony.os.deviceInfo()["name"];

        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {

            defineGetter(this, "redirectUrlAndroid", function() {
                konymp.logger.trace("----------Entering redirectUrlAndriod Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._redirectUrlAndriod;
            });
            defineGetter(this, "redirectUrlIos", function() {
                konymp.logger.trace("----------Entering redirectUrlIos Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._redirectUrlIos;
            });
            defineSetter(this, "redirectUrlIos", function(val) {
                konymp.logger.trace("----------Entering redirectUrlIos Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._redirectUrlIos = val;
            });
            defineSetter(this, "redirectUrlAndroid", function(val) {
                konymp.logger.trace("----------Entering redirectUrlAndriod Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._redirectUrlAndriod = val;
            });


        },
        /**
         * @function invokeIdentityService
         * @description Invokes identity service provided by the user
         * @public
         * @param {string} providername
         */
        invokeIdentitySerivce: function(providerName) {
            konymp.logger.trace("----------Entering invokeIdentitySerivce function---------", konymp.logger.FUNCTION_ENTRY);
            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                alert("No Internet Connection Available");
                return;
            }
            try {
                var argument = {};
                var authorizationClient = null;
                kony.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
                var sdkClient = kony.sdk.getCurrentInstance();
                if (Object.keys(sdkClient).length !== 0) {
                    authorizationClient = sdkClient.getIdentityService(providerName);
                }
                
                if (authorizationClient === null || authorizationClient === undefined) {
                    kony.application.dismissLoadingScreen();
                    konymp.logger.info("Authorization object null - Connect to MF");
                    
                    throw{
                      "Error": "MFConnectionError",
                      "message": constants.MF_ALERT_MESSAGE
                    };
                    
                }
                argument['UseDeviceBrowser'] = true;
                
                if(this._deviceName === "android")
                  argument['success_url'] = this.redirectUrlAndroid;
                else if(this._deviceName === "iPhone")
                  argument['success_url'] = this.redirectUrlIos;
                kony.application.dismissLoadingScreen();
				this._authorizationClient= authorizationClient;
                authorizationClient.login(argument, this.fetchProfileInfo.bind(this), this.failureWrapper.bind(this));
            } catch (exception) {
                konymp.logger.error("#####Exception in invokeIdentitySerivce : " + exception.message, konymp.logger.EXCEPTION);
                kony.application.dismissLoadingScreen();
            }
            konymp.logger.trace("---------------Exiting invokeIdentitySerivce function---------------", konymp.logger.FUNCTION_EXIT);

        },
        /**
         * @function successWrapper
         * @description Success callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event onLoginSuccess
         */
        successWrapper: function(response) {
            konymp.logger.trace("----------Entering successWrapper function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                kony.application.dismissLoadingScreen();
                if (this.onLoginSuccess !== null && this.onLoginSuccess !== undefined) {
                    this.onLoginSuccess(response);
                } else {
                    konymp.logger.info(constants.DEFAULT_SUCCESS_MESSAGE);
                }
            } catch (exception) {
                konymp.logger.error("#####Exception in successWrapper : " + exception.message, konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting successWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureWrapper
         * @description Failure callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event onLoginFailure
         */
        failureWrapper: function() {
            konymp.logger.trace("----------Entering failureWrapper function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                kony.application.dismissLoadingScreen();
                if (this.onLoginFailure !== null && this.onLoginFailure !== undefined) {
                    this.onLoginFailure(response);
                } else {
                    konymp.logger.info(constants.DEFAULT_FAILURE_MESSAGE);
                }
            } catch (exception) {
                konymp.logger.error("#####Exception in failureWrapper : " + exception.message, konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("---------------Exiting failureWrapper function---------------", konymp.logger.FUNCTION_EXIT);

        },
      fetchProfileInfo:function(response){
        this._authorizationClient.getUserAttributes(this.successInFetchingUserAttributes.bind(this),this.failureInFetchingUserAttributes.bind(this));
      },
      
      successInFetchingUserAttributes:function(userAttributes){
       alert(JSON.stringify(userAttributes)); 
      },
      failureInFetchingUserAttributes:function(error){
        alert(JSON.stringify(error));
      }

    };

});