define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for flxContinue **/
    AS_FlexContainer_i2ce63ba146147b6b2a92aa64ee9c117: function AS_FlexContainer_i2ce63ba146147b6b2a92aa64ee9c117(eventobject, x, y) {
        var self = this;
        this.animateWelcomeArrow();
    },
    /** preShow defined for frmWelcome **/
    AS_Form_f7ce60441e134913b705571f7d05316e: function AS_Form_f7ce60441e134913b705571f7d05316e(eventobject) {
        var self = this;
        var screenHeight = kony.os.deviceInfo().screenHeight;
        if (screenHeight <= 680) {
            this.view.flxContinue.bottom = "20dp";
            this.view.flxContinue.width = "60dp";
            this.view.flxContinue.height = "60dp";
            this.view.lblTimeAndVenue.top = "52%";
            this.view.lblDesc.skin = 'sknlblDescWhiteSmall';
            this.view.lblTimeAndVenue.skin = 'sknlblTimeVenuewhiteSmall';
        }
        if (kony.os.deviceInfo().screenWidth < 380) {
            //this.view.lblDesc.text = "Thank you for joining us in Austin. We look to showing you first-hand how Kony accelerates digital success.";
            this.view.lblDesc.skin = 'sknlblDescWhiteSmall';
            this.view.lblTimeAndVenue.skin = 'sknlblTimeVenuewhiteSmall';
        }
        this.view.lblDesc.text = "Thank you for joining us in Austin. We look to showing you first-hand how Kony accelerates digital success.";
    }
});