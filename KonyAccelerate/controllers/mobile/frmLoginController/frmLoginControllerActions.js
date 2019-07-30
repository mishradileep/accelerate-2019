define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onLoginSuccess defined for linkedinlogin **/
    AS_UWI_f5b772abfeca4d809b68f66f91b61a75: function AS_UWI_f5b772abfeca4d809b68f66f91b61a75(response) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmEventList");
        ntf.navigate();
    },
    /** onLoginFailure defined for linkedinlogin **/
    AS_UWI_ge777c6098f545e693c0537e7f6d99e6: function AS_UWI_ge777c6098f545e693c0537e7f6d99e6(response) {
        var self = this;
        alert("login failed");
    }
});