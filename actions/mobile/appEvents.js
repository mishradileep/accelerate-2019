define({
    AS_AppEvents_hf9bdba361244e8884a25e0b647863b6: function AS_AppEvents_hf9bdba361244e8884a25e0b647863b6(eventobject) {
        var self = this;
        //syncEventData();
        localNotificationCallBacks();
        disableDefaultLoadingScreen();
        syncEventData();
    },
    AS_AppEvents_j7711d39af294111a5b8374c53907586: function AS_AppEvents_j7711d39af294111a5b8374c53907586(eventobject) {
        var self = this;
        let isAppAlreadyLoaded = kony.store.getItem("isAppLoaded");
        if (isAppAlreadyLoaded) return "frmAgenda";
        else return "frmWelcome";
    }
});