define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for menuButtonAgenda **/
    AS_Button_gc0ebc65be1248c1a00ddb2bfa1ecd2c: function AS_Button_gc0ebc65be1248c1a00ddb2bfa1ecd2c(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmAgenda");
        ntf.navigate();
    },
    /** onClick defined for menuButtonMySchedule **/
    AS_Button_ea3fe76990774a1e9e3bb6bbfdd8cd49: function AS_Button_ea3fe76990774a1e9e3bb6bbfdd8cd49(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmmyAgenda");
        ntf.navigate();
    },
    /** onClick defined for menuButtonMore **/
    AS_Button_bfa8793a99494b479d36e4179effd5d3: function AS_Button_bfa8793a99494b479d36e4179effd5d3(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMore");
        ntf.navigate();
    },
    /** init defined for frmPresenters **/
    AS_Form_aa402fd47759406593de6f69a7fb821c: function AS_Form_aa402fd47759406593de6f69a7fb821c(eventobject) {
        var self = this;
        this.setFilteronClick();
    },
    /** preShow defined for frmPresenters **/
    AS_Form_be66a65fc0ef4de4a2c42e58e5e7906f: function AS_Form_be66a65fc0ef4de4a2c42e58e5e7906f(eventobject) {
        var self = this;
        this.view.menuMain.menuContainerPresenters.menuLabelPresenters.skin = "menuLabelSkinActive";
        this.view.presenterScroll.showFadingEdges = false;
    },
    /** onDeviceBack defined for frmPresenters **/
    AS_Form_hbd56c17ef8740b69d6b9924a02f1d5f: function AS_Form_hbd56c17ef8740b69d6b9924a02f1d5f(eventobject) {
        var self = this;
        return;
    }
});