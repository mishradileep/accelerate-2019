define({
  
    /**
     * @function animateAboutTheAppCard
     * @description Invoked in post show to animate the about the app card
     * @private
     */
    animateAboutTheAppCard: function(finalTop) {
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
    }
});
