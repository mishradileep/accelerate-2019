define({
    AS_AppEvents_h334c68ef261418898ed0881d70a84cb: function AS_AppEvents_h334c68ef261418898ed0881d70a84cb(eventobject) {
        var self = this;
        var appEventData = accelerateEventData.eventdata;
        var updatedData = {
            "data": "Sample Test"
        }
        accelerateEventData.eventdata = updatedData;
        alert(accelerateEventData.eventdata);
    }
});