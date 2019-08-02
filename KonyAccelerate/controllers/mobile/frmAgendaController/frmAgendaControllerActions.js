define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** preShow defined for frmAgenda **/
    AS_Form_ad02dde63f0e4c11bbea0ffa927943a6: function AS_Form_ad02dde63f0e4c11bbea0ffa927943a6(eventobject) {
        var self = this;

        function INVOKE_OBJECT_SERVICE__ea029f0600df4431909ac24c16083c57_Callback(event_sessions) {
            self.setData(event_sessions.records);
        }
        function INVOKE_OBJECT_SERVICE__eb711de5df11475b9d13d3504b2609b1_Callback(speakers_master) {
            kony.store.setItem("master_speakers", speakers_master.records);
        }
        if (speakers_master_inputparam == undefined) {
            var speakers_master_inputparam = {};
        }
        speakers_master_inputparam["serviceID"] = "KonyAccelerateStorageService$speakers_master$get";
        speakers_master_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var speakers_master_httpheaders = {};
        speakers_master_inputparam["httpheaders"] = speakers_master_httpheaders;
        var speakers_master_httpconfigs = {};
        speakers_master_inputparam["httpconfig"] = speakers_master_httpconfigs;
        KonyAccelerateStorageService$speakers_master$get = mfobjectsecureinvokerasync(speakers_master_inputparam, "KonyAccelerateStorageService", "speakers_master", INVOKE_OBJECT_SERVICE__eb711de5df11475b9d13d3504b2609b1_Callback);
        if (event_sessions_inputparam == undefined) {
            var event_sessions_inputparam = {};
        }
        event_sessions_inputparam["serviceID"] = "KonyAccelerateStorageService$event_sessions$get";
        event_sessions_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var event_sessions_httpheaders = {};
        event_sessions_inputparam["httpheaders"] = event_sessions_httpheaders;
        var event_sessions_httpconfigs = {};
        event_sessions_inputparam["httpconfig"] = event_sessions_httpconfigs;
        KonyAccelerateStorageService$event_sessions$get = mfobjectsecureinvokerasync(event_sessions_inputparam, "KonyAccelerateStorageService", "event_sessions", INVOKE_OBJECT_SERVICE__ea029f0600df4431909ac24c16083c57_Callback);
        this.frmAgendaPreshow();
    },
    /** onClick defined for menuButtonPresenters **/
    AS_Button_f524c1d44b6d4a61af563b83cef56b3a: function AS_Button_f524c1d44b6d4a61af563b83cef56b3a(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPresenters");
        ntf.navigate();
    },
    /** onClick defined for menuButtonMore **/
    AS_Button_c57dd333f3fb41cea4389a8152a19989: function AS_Button_c57dd333f3fb41cea4389a8152a19989(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMore");
        ntf.navigate();
    }
});