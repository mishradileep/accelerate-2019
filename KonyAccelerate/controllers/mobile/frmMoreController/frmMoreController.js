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
            switch(eventObj.id) {
              case 'flxMenuWifi':
                new kony.mvc.Navigation('frmWifiInfo').navigate();
                break;
              case y:
                // code block
                break;
              default:
                // code block
            }
          }
        }}
      );
      delayThrashold = delayThrashold + 0.05;
    });
  },

  /** @function menuBindOnClick
   *  @description binds click even with each individual menu item.
   */
  menuBindOnClick: function() {
    var self = this;
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    menuWidgets.forEach(function(currentMenu, index){
      currentMenu.onClick = self.menuAnimateSlide.bind('slideOut', self);
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
