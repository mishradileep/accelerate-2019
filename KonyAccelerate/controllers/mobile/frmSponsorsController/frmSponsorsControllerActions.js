define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmSponsors **/
    AS_Form_fea86e199ec445dea52226ad39e594b6: function AS_Form_fea86e199ec445dea52226ad39e594b6(eventobject) {
        var self = this;

        function INVOKE_OBJECT_SERVICE__f8801fb2e7914427a7b6f8ba078d0e64_Callback(sponsor_category_master) {
            this.showSponsorsInPage(sponsor_category_master);
        }
        if (sponsor_category_master_inputparam == undefined) {
            var sponsor_category_master_inputparam = {};
        }
        sponsor_category_master_inputparam["serviceID"] = "KonyAccelerateStorageService$sponsor_category_master$get";
        sponsor_category_master_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "get"
        };
        var sponsor_category_master_httpheaders = {};
        sponsor_category_master_inputparam["httpheaders"] = sponsor_category_master_httpheaders;
        var sponsor_category_master_httpconfigs = {};
        sponsor_category_master_inputparam["httpconfig"] = sponsor_category_master_httpconfigs;
        KonyAccelerateStorageService$sponsor_category_master$get = mfobjectsecureinvokerasync(sponsor_category_master_inputparam, "KonyAccelerateStorageService", "sponsor_category_master", INVOKE_OBJECT_SERVICE__f8801fb2e7914427a7b6f8ba078d0e64_Callback);
    }
});