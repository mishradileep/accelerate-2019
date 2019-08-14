define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for googlelogin **/
    AS_FlexContainer_d4beef06a88642169ace45221918dcec: function AS_FlexContainer_d4beef06a88642169ace45221918dcec(eventobject, x, y) {
        var self = this;
        this.view.imgGoogle.isVisible = false;
        this.view.imgFocusGoogle.isVisible = true;
    },
    /** onTouchEnd defined for googlelogin **/
    AS_FlexContainer_edeba381fcaf42379a244797c653b955: function AS_FlexContainer_edeba381fcaf42379a244797c653b955(eventobject, x, y) {
        var self = this;
        this.view.imgGoogle.isVisible = true;
        this.view.imgFocusGoogle.isVisible = false;
    },
    /** onClick defined for googlelogin **/
    AS_FlexContainer_ea52bbc5ba15415ca94e980c9352f66a: function AS_FlexContainer_ea52bbc5ba15415ca94e980c9352f66a(eventobject) {
        var self = this;
        this.invokeIdentitySerivce("reusableGoogleLogin");
    }
});