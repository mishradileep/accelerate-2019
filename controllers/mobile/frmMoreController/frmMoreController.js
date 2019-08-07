define({ 

  // Animation duration in seconds.
  animationDuration : 0.2,

  /** @function moreMenuAnimate
   *  @description Slide in menu items one by one. Called on form postShow
   *  @param slideType
   *	Animation direction. possible values 'slideIn', 'slideOut'
   *  @param eventObj
   *	Menu item object. So that we can get clicked item and navigate to target form.
   *
   *  @return
   *	void
   */
  menuAnimateSlide: function(slideType, eventObj) {
    var self = this;
    let leftAnimateTo = slideType == 'slideIn' ? '10%' : '-80%';
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    let delayThrashold = 0;
    menuWidgets.forEach(function(currentMenu, index){
      let currentItemIdex = index;
      currentMenu.animate(
        kony.ui.createAnimation({
          100:{left:leftAnimateTo,"stepConfig":{}}}),
        {delay:delayThrashold,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:self.animationDuration},
        {animationEnd: function() {
          // naviaget to clicked form on slideOut after last menu item slides out.
          if ((menuWidgets.length - 1) == currentItemIdex &&
             'slideOut' == slideType) {
            let formName = "";
            switch(eventObj.id) {
              case 'flxMenuWifi':
                formName = "frmWifiInfo";
                break;
              case "flxMenuLocation":
                formName = "frmEventLocation";
                break;
              case "flxMenuFeedback":
                formName = "frmFeedback";
                break;
              case "flxMenuSponsors":
                formName = "frmSponsor";
                break;
              case "flxMenuFloorMap":
                formName = "frmFloorMap";
                break;
              default:
                // code block
            }
            new kony.mvc.Navigation(formName).navigate();
          }
        }}
      );
      delayThrashold = delayThrashold + 0.05;
    });
  },

  /** @function menuAnimateSlideOut
   *  @description Slide Out menu items one by one and navigate to eventObj form.
   *  @param eventObj
   *	Menu item object. So that we can get clicked item and navigate to target form.
   *
   *  @return
   *	void
   */
  menuAnimateSlideOut: function(eventObj) {
    this.menuAnimateSlide('slideOut', eventObj);
  },
  
  /** @function menuBindOnClick
   *  @description binds click even with each individual menu item.
   */
  menuBindOnClick: function() {
    var self = this;
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    menuWidgets.forEach(function(currentMenu, index){
      currentMenu.onClick = self.menuAnimateSlideOut.bind(self);
    });
  },

  /** @function slideMenusBVR
   *  @description Slide all aenu items BVR.
   *
   *  @return
   *	void
   */
  slideMenusBVR: function() {
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    menuWidgets.forEach(function(currentMenu, index){
      currentMenu.left = '-80%';
    });
  }
 });
