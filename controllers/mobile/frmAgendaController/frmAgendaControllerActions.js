define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for buttonDay1 **/
    AS_Button_a9f3bd45b4474ace87f56bf052c0efbd: function AS_Button_a9f3bd45b4474ace87f56bf052c0efbd(eventobject) {
        var self = this;
        this.onClickOfEventDate(eventobject);
    },
    /** onClick defined for buttonDay2 **/
    AS_Button_g1ddf2107e184ec5bfc820886c5577dd: function AS_Button_g1ddf2107e184ec5bfc820886c5577dd(eventobject) {
        var self = this;
        this.onClickOfEventDate(eventobject);
    },
    /** onClick defined for btnSubmit **/
    AS_Button_f2918332e78c437195c71db8976072cb: function AS_Button_f2918332e78c437195c71db8976072cb(eventobject) {
        var self = this;
        this.onClickOfSubmit();
    },
    /** onClick defined for menuButtonMySchedule **/
    AS_Button_jcad9ff2c5944e3494d663074c0e4fe7: function AS_Button_jcad9ff2c5944e3494d663074c0e4fe7(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmmyAgenda");
        ntf.navigate();
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
    },
    /** onClick defined for addAgendaContainer **/
    AS_FlexContainer_d3f32616eb0c4bc8819ae8842c097416: function AS_FlexContainer_d3f32616eb0c4bc8819ae8842c097416(eventobject) {
        var self = this;
        this.onClickOfPlus();
    },
    /** onCloseClick defined for mobileheader **/
    AS_UWI_d0fa898518ab4818bafd04de5675daac: function AS_UWI_d0fa898518ab4818bafd04de5675daac(eventobject) {
        var self = this;
        this.closePdf();
    },
    /** init defined for frmAgenda **/
    AS_Form_b331cd5c70fc48a59bc315161747ee6b: function AS_Form_b331cd5c70fc48a59bc315161747ee6b(eventobject) {
        var self = this;
        this.formInit();
    },
    /** preShow defined for frmAgenda **/
    AS_Form_c7a1fc91074a456da0146f6ccba5b006: function AS_Form_c7a1fc91074a456da0146f6ccba5b006(eventobject) {
        var self = this;
        if (this.currentViewState === 0) {
            this.frmAgendaPreshow();
        }
        this.view.flxToast.isVisible = false;
    },
    /** onDeviceBack defined for frmAgenda **/
    AS_Form_ce1c3ac567c14878a6d0115ae35f7155: function AS_Form_ce1c3ac567c14878a6d0115ae35f7155(eventobject) {
        var self = this;
        return;
    },
    /** onClick defined for filterWidget **/
    AS_FlexContainer_fefd39634f28457fab864ca9baf3c048: function AS_FlexContainer_fefd39634f28457fab864ca9baf3c048(eventobject) {
        var self = this;

        function STYLE_ACTION____f2614a71ac6848f7bfa3d6cbbd231ce2_Callback() {}
        self.view.filterWidget.animate(
        kony.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                },
                "backgroundColor": "14355000"
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": STYLE_ACTION____f2614a71ac6848f7bfa3d6cbbd231ce2_Callback
        });
    }
});