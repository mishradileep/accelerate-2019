define({
    AS_AppEvents_hf9bdba361244e8884a25e0b647863b6: function AS_AppEvents_hf9bdba361244e8884a25e0b647863b6(eventobject) {
        var self = this;
        //syncEventData();
        localNotificationCallBacks();
        disableDefaultLoadingScreen();
        syncEventData();
    },
    AS_AppEvents_a2f0a1a6236b4da39fa076fb2860abfb: function AS_AppEvents_a2f0a1a6236b4da39fa076fb2860abfb(eventobject) {
        var self = this;
        let isAppLaunchedFirstTime = kony.store.getItem("isAppLoaded");
        if (isAppLaunchedFirstTime) return "frmAgenda";
        else return "frmWelcome";
    }
});