define({ 

  /**
    	* @function  frmSocialFeedPreshowAction
        * @description preshow of the form, which sets the twitter hadle URL to the browser
        * @private
    */
  frmSocialFeedPreshowAction : function(){
    this.view.postShow = this.postShowAction.bind(this);
    this.view.brwsrTwitterHandler.enableParentScrollingWhenReachToBoundaries = false;
    this.view.brwsrTwitterHandler.requestURLConfig = {
      URL: eventConstants.EVENT_TWITTER_HANDLE,
      requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };
  },

  /**
    	* @function  postShowAction
        * @description postshow of the form, which calls the animation function 
                       to bring it to the top
        * @private
    */
  postShowAction : function() {
    this.animatePDFViewer(13);
  },

  /**
    	* @function  animatePDFViewer
        * @description animates the PDF container based on the top value
        * @param {top} - top value to animate
        * @private
    */
  animatePDFViewer : function(top){
    this.view.flxPDFContainer.animate(
      kony.ui.createAnimation({
        100: {
          top: top+"%",
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.2
      }, {
        animationEnd: function() {
          if (top === 100) {
            new kony.mvc.Navigation("frmMore").navigate();
          }
        }
      });
  }

});
