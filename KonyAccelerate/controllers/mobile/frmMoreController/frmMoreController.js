define({ 

 //Type your controller code here 
  /** @function moreMenuAnimate
   *  		    Slide in menu items one by one
   */
  animationDuration : 0.5,
  menuAnimateSlideIn: function(){
    var self = this;
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    let delayThrashold = 0;
    menuWidgets.forEach(function(currentMenu, index){
      let currentItemIdex = index;
      currentMenu.animate(
        kony.ui.createAnimation({
          0:{left:"-80%","stepConfig":{}},
          100:{left:"10%","stepConfig":{}}}),
        {delay:delayThrashold,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:self.animationDuration},
        {animationEnd: function() {}}
      );
      delayThrashold = delayThrashold + 0.2;
    });
  },
  /** @function menuAnimateSlideOut
   *  		    Slide Out menu items one by one
   */
  menuAnimateSlideOut: function(eventObj){
    var self = this;
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    let delayThrashold = 0;
    menuWidgets.forEach(function(currentMenu, index){
      let currentItemIdex = index;
      currentMenu.animate(
        kony.ui.createAnimation({
          0:{left:"10%","stepConfig":{}},
          100:{left:"-80%","stepConfig":{}}}),
        {delay:delayThrashold,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:self.animationDuration},
        {animationEnd: function() {

          if ((menuWidgets.length - 1) == currentItemIdex) {
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
      delayThrashold = delayThrashold + 0.2;
    });
    
  },
  
  menuBindOnClick: function() {
    var self = this;
    let menuWidgets = this.view.flxMoreWrapper.widgets();
    menuWidgets.forEach(function(currentMenu, index){
      currentMenu.onClick = self.menuBindOnClickAction.bind(self);
    });
  },
  
  menuBindOnClickAction: function(eventObj){
    var self = this;
    self.menuAnimateSlideOut(eventObj);
    
  }
 });