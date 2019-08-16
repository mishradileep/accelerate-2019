/**
  * @function localNotificationCallBacks
  * @description This function is invoked in the post appinit which is used to callbacks required for the local notification.
  * @private
  */
function localNotificationCallBacks() {
    try {
        kony.localnotifications.setCallbacks({
            "offlinenotification": offlinenotification,
            "onlinenotification": onlinenotification
        });
    } catch (err) {
        kony.print("Error Code " + err.errorCode + " Message " + err.message);
    }
}
/**
  * @function offlinenotification
  * @description This function is invoked when a notification in the notification center is clicked.
  * @private
  */
function offlinenotification(notificationobject, actionid) {
  //#ifdef android
    kony.store.setItem("currentNotificationId", notificationobject.notificationId);
  //#endif
  //#ifdef iphone
  kony.store.setItem("currentNotificationId", notificationobject.id);
  //#endif
    var nav = new kony.mvc.Navigation("frmAgenda");
    nav.navigate();
}

/**
  * @function onlinenotification
  * @description This function is invoked when the app is open and a notification is received.
  * @private
  */
function onlinenotification(notificationobject, actionid) {
    var basicConf = {
        message: "There is an event which starts in 1 hour. Click View, to view the details of the event",
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        alertTitle: "Reminder",
        yesLabel: "View",
        noLabel: "Close",
        alertHandler: function(response) {
            if (response) {
                //#ifdef android
    			kony.store.setItem("currentNotificationId", notificationobject.notificationId);
  				//#endif
  				//#ifdef iphone
  				kony.store.setItem("currentNotificationId", notificationobject.id);
      			//#endif
                var nav = new kony.mvc.Navigation("frmAgenda");
                nav.navigate();
            }
        }
    };
    var pspConf = {};
    var infoAlert = kony.ui.Alert(basicConf, pspConf);

}

/**
  * @function registerActions
  * @description This function is invoked after setting the notification callbacks.
  * @private
  */

function registerActions() {
    var accept = kony.notificationsettings.createAction({
        "id": "Accept",
        "label": "Accept",
        "pspConfig": {
            "authenticationRequired": true,
            "destructive": true,
            "activationMode": kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
            "visibleOn": kony.notificationsettings.BOTH
        }
    });

    var reject = kony.notificationsettings.createAction({
        "id": "Reject",
        "label": "Reject",
        "pspConfig": {
            "authenticationRequired": false,
            "destructive": false,
            "activationMode": kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
            "visibleOn": kony.notificationsettings.BOTH
        }
    });

    var decline = kony.notificationsettings.createAction({
        "id": "Decline",
        "label": "Decline",
        "pspConfig": {
            "activationMode": kony.notificationsettings.ACTIVATION_MODE_BACKWARDS,
            "authenticationRequired": true,
            "destructive": false,
            "visibleOn": kony.notificationsettings.BOTH
        }
    });


    var defaultActionContextArr = [accept, reject, decline];
    var minimalActionContextArr = [accept, reject];

    var categoryObj = kony.notificationsettings.createCategory({
        "categoryId": "invitation",
        "actions": defaultActionContextArr,
        "pspConfig": {
            "minimalActions": minimalActionContextArr
        }
    });


    //Using kony.notificationsettings.registerCategory 

    var categoryArr = [categoryObj];

    var registerCategory = kony.notificationsettings.registerCategory({
        "categories": categoryArr,
        "pspConfig": {

        }
    });

}

/**
  * @function createLocalnotification
  * @description This function is invoked when an event is added to my schedule. This function schedules a local notification for the event before 1 hr
  * @private
  */
function createLocalnotification(date, session_id, session_name) {
    var notificationId = '0' + session_id;
  	let dateObj = new Date(date);
    let timeZone = dateObj.toString().split(" ")[5];
    if (timeZone.includes('+')) {
        timeZone = '+' + timeZone.split('+')[1];
    } else if (timeZone.includes('-')) {
        timeZone = '-' + timeZone.split('-')[1];
    }
  	//#ifdef android
  	date = date.split('T')[0] + ' ' + (dateObj.getUTCHours()?((dateObj.getUTCHours()-1)<10?'0'+(dateObj.getUTCHours()-1):(dateObj.getUTCHours()-1)):'23') + ':' + (dateObj.getUTCMinutes()<10?'0'+dateObj.getUTCMinutes(): dateObj.getUTCMinutes()) + ':' + (dateObj.getUTCSeconds()<10?'0' + dateObj.getUTCSeconds(): dateObj.getUTCSeconds()) + ' ' + timeZone;
  	//#endif
  //#ifdef iphone
  	date = dateObj.getFullYear() + '-' + (dateObj.getMonth()<10?'0' + dateObj.getMonth(): dateObj.getMonth()) + '-' + (dateObj.getDate()<10?'0'+dateObj.getDate(): dateObj.getDate()) + ' ' + (dateObj.getHours()?((dateObj.getHours()-1)<10?'0'+(dateObj.getHours()-1):(dateObj.getHours()-1)):'23') + ':' + (dateObj.getMinutes()<10?'0'+dateObj.getMinutes(): dateObj.getMinutes()) + ':' + (dateObj.getSeconds()<10?'0' + dateObj.getSeconds(): dateObj.getSeconds()) + ' ' + timeZone;
  	//#endif
    var format = "yyyy-MM-dd HH:mm:ss Z";
    var message = session_name + " starts in 1 hour.";
    var title = session_name;
    var categoryId = session_name;
  	registerActions();
    kony.localnotifications.create({
        "id": notificationId,
        "dateTime": {
            "date": date,
            "format": format
        },
        "message": message,
        "title": title,
        "categoryId": categoryId,
        "pspConfig": {
            "sound": kony.localnotifications.DEFAULT_SOUND
        }
    });
}