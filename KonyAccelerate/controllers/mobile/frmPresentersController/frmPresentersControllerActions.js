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
    /** onClick defined for flxImageClose **/
    AS_FlexContainer_c50b28a0f60548fea182742bf878a959: function AS_FlexContainer_c50b28a0f60548fea182742bf878a959(eventobject) {
        var self = this;
        this.onClickOfCloseSpeakerDetails();
    },
    /** init defined for frmPresenters **/
    AS_Form_aa402fd47759406593de6f69a7fb821c: function AS_Form_aa402fd47759406593de6f69a7fb821c(eventobject) {
        var self = this;
        this.setFilteronClick();
    },
    /** preShow defined for frmPresenters **/
    AS_Form_b4d8869f1b9144b382033feab30520d6: function AS_Form_b4d8869f1b9144b382033feab30520d6(eventobject) {
        var self = this;
        this.view.presenterScroll.showFadingEdges = false;
    }
});