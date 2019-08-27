define({ 

 //Type your controller code here

  /** @function animateWelcomeArrow
   *  @description Replace welcome right carrot sign with AJAX loader.
   *
   *  @return
   *	void
   */
  animateWelcomeArrow: function() {
    this.view.imgContinue.src = "loadeing_circle_2.gif";
    kony.store.setItem("isAppLoaded",true);
    kony.timer.schedule("welcomeTimer", ()=>{
       var nav = new kony.mvc.Navigation("frmAgenda");
       nav.navigate();
       kony.timer.cancel("welcomeTimer");
    }, 1, false);
   
    
  },

 });