
define({
  
    /**
     * @function animateAboutTheAppCard
     * @description Invoked in post show to animate the about the app card
     * @private
     */
    animateAboutTheAppCard: function(finalTop) {
        this.setImageAspectRatio();
        this.view.flxContent.isVisible = true;
        this.view.flxContent.animate(
            kony.ui.createAnimation({
                100: {
                    top: finalTop,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: 0.5
            }, {
                animationEnd: function() {
                    if (finalTop === "100%") {
                        var navigationObj = new kony.mvc.Navigation("frmMore");
                        navigationObj.navigate();
                    }
                }
            });
    },
  
  setImageAspectRatio : function() {
    var width = kony.os.deviceInfo().screenWidth;
    this.view.imgQuantamHeader.height = width * 0.46;
    this.view.flxQuantamHeader.height = width * 0.46;
  }
});
