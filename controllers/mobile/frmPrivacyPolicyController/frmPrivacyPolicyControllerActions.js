define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onCloseClick defined for mobileheader **/
    AS_UWI_cbfff32362f8462ea4ac0c2ee8b88561: function AS_UWI_cbfff32362f8462ea4ac0c2ee8b88561(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmAboutApp");
        ntf.navigate();
    },
    /** preShow defined for frmPrivacyPolicy **/
    AS_Form_aabf09d8cb2f467d92ce3b8844c5e814: function AS_Form_aabf09d8cb2f467d92ce3b8844c5e814(eventobject) {
        var self = this;
        this.view.brwsrPrivacyPolicy.enableParentScrollingWhenReachToBoundaries = false;;
        this.view.brwsrPrivacyPolicy.requestURLConfig = {
            URL: "privacy-policy.html",
            requestMethod: constants.BROWSER_REQUEST_METHOD_GET
        };
    }
});