define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onCloseClick defined for mobileheader **/
    AS_UWI_ace7ae5b5fe841158d6a201d889c4675: function AS_UWI_ace7ae5b5fe841158d6a201d889c4675(eventobject) {
        var self = this;
        this.animateAboutTheAppCard("100%");
    },
    /** onClick defined for flxTeam **/
    AS_FlexContainer_bc88c458bafb44468437f0767b63a678: function AS_FlexContainer_bc88c458bafb44468437f0767b63a678(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmTeam");
        ntf.navigate();
    },
    /** onClick defined for flxPrivacyPolicy **/
    AS_FlexContainer_j6befae9738e4ce483d9cdc5158083ba: function AS_FlexContainer_j6befae9738e4ce483d9cdc5158083ba(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPrivacyPolicy");
        ntf.navigate();
    },
    /** postShow defined for frmAboutApp **/
    AS_Form_a1f8d2de650c467dbd73829221015cb4: function AS_Form_a1f8d2de650c467dbd73829221015cb4(eventobject) {
        var self = this;
        this.animateAboutTheAppCard("4%");
    }
});