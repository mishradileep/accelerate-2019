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
    /** preShow defined for frmAgenda **/
    AS_Form_ad02dde63f0e4c11bbea0ffa927943a6: function AS_Form_ad02dde63f0e4c11bbea0ffa927943a6(eventobject) {
        var self = this;
        if (this.currentViewState === 0) {
            this.frmAgendaPreshow();
        }
        this.view.flxToast.isVisible = false;
    },
    /** postShow defined for frmAgenda **/
    AS_Form_acc108b90ad041868d0ef5f813ab476b: function AS_Form_acc108b90ad041868d0ef5f813ab476b(eventobject) {
        var self = this;
        this.setData(accelerateSessionData.eventSessionData.records);
    },
    /** onDeviceBack defined for frmAgenda **/
    AS_Form_ce1c3ac567c14878a6d0115ae35f7155: function AS_Form_ce1c3ac567c14878a6d0115ae35f7155(eventobject) {
        var self = this;
        return;
    },
    /** onTouchEnd defined for txtArea **/
    AS_TextArea_f31bf1de7e754eb88153204603fc6bd0: function AS_TextArea_f31bf1de7e754eb88153204603fc6bd0(eventobject, x, y) {
        var self = this;
        this.txtAreaEnable = true;
        this.view.txtArea.setEnabled(true);
        this.view.txtArea.setFocus(true);
    },
    /** onTouchStart defined for detailsScroller **/
    AS_FlexScrollContainer_c4a056b6f01a423093c598b34fd6c565: function AS_FlexScrollContainer_c4a056b6f01a423093c598b34fd6c565(eventobject, x, y) {
        var self = this;
        if (this.txtAreaEnable) {
            this.view.txtArea.setEnabled(false);
            this.txtAreaEnable = !this.txtAreaEnable
        }
    },
    /** onClick defined for flxRatingContainer **/
    AS_FlexContainer_f0688ab857384716a6e560bb6f89d743: function AS_FlexContainer_f0688ab857384716a6e560bb6f89d743(eventobject) {
        var self = this;
        this.txtAreaEnable = true;
        this.view.txtArea.setEnabled(true);
        this.view.txtArea.setFocus(true);
    }
});