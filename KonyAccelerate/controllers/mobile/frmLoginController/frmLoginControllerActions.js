define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onLoginSuccess defined for linkedinlogin **/
    AS_UWI_cd1d5bbf76d24a82a366b67f8ef22bb6: function AS_UWI_cd1d5bbf76d24a82a366b67f8ef22bb6(response) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmEventList");
        ntf.navigate();
    },
    /** onLoginFailure defined for linkedinlogin **/
    AS_UWI_j7f038a6352244d39e78302c0ecffcd0: function AS_UWI_j7f038a6352244d39e78302c0ecffcd0(response) {
        var self = this;
        alert("login failed");
    }
});