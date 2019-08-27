define({
  devHeight: null,
  thisCard: null,
  thisCardIndex: null,
  cardFrameRel: null,
  currentViewState:0,
  currentSelectedTab:eventConstants.KEYNOTE,
  isNotchSet:false,
  isSetDataInvoked:true,
  
  
  
  formInit:function(){
    this.isIphoneXSeries= checkForIphoneXSeries();
  },
  /**
     * @function frmAgendaPreshow
     * @description The function is invoked in the form preshow action which is used to setup the UI
     * @private
     */
  frmAgendaPreshow: function() {
    var self = this;
    this.view.pdfBrowser.requestURLConfig = {
                    URL: "index.html",
                    requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                };
    this.view.menuMain.menuContainerAgenda.menuLabelAgenda.skin = "menuLabelSkinActive";
     if(this.isIphoneXSeries && !this.isNotchSet){
      this.view.headerContainer.top="-45dp";
      this.view.headerContainer.height="176dp";
      this.view.agendaTitle.top=parseInt(this.view.agendaTitle.top)+45+"dp";
      this.view.buttonDay1.top=parseInt(this.view.buttonDay1.top)+45+"dp";
      this.view.buttonDay2.top=parseInt(this.view.buttonDay2.top)+45+"dp";
      this.view.filterSlider.top=parseInt(this.view.filterSlider.top)+45+"dp";
      this.view.flxToast.height=parseInt(this.view.flxToast.height)+45+"dp";
      this.view.flxToast.bottom="51dp";
       this.isNotchSet=!this.isNotchSet;
    }
    this.view.referenceAgenda.isVisible = false;
    this.view.referenceSession.isVisible = false;
    this.view.postShow = this.frmAgendaPostshow;
    this.view.sessionContentContainer.top = "100%";
    this.view.sessionTileAnim.left="100%";
    this.view.buttonBack.isVisible = false;
    this.view.imageBack.opacity = 0;
    this.view.buttonBack.onClick = this.frmAgendaSessionClose;
    this.view.detailsScroller.onScrolling = this.detailsScrollerOnScrolling;
    if(this.isIphoneXSeries){
      this.view.menuMain.bottom="0dp";
       this.view.menuMain.height="105dp";
    }
    this.view.sessionTileAnim.quantumDotsClear.opacity=0;
    this.view.filterAll.onClick = function(eventobject) {
      self.agendaFilter(eventobject);
    };
    this.view.filterDBX.onClick = function(eventobject) {
      self.agendaFilter(eventobject);
    };
    this.view.filterQuantum.onClick = function(eventobject) {
      self.agendaFilter(eventobject);
    };
    this.view.sessionTileAnim.anchorPoint = {
      "x": 0.5,
      "y": 0
    };
    this.view.sessionTileAnim.tileBGImageKony.anchorPoint = {
      "x": 1,
      "y": -0.2
    };
    //this.view.sessionTile.tileBGImageKony.anchorPoint={"x":1,"y":.5};
    globalPreshow();
    //this.frmAgendaSetAgendaTiles();
    this.view.feedbackMaster.opacity = 0;
  },

  /**
     * @function addActionToSessionTiles
     * @description The function is used to set the action to session tiles
     * @private
     */
  addActionToSessionTiles: function() {
    var self = this;
    var sessionTilesChildren = this.view.sessionTiles.widgets();
    this.view.sessionTile1.onClick = this.frmAgendaSessionSelect;
    sessionTilesChildren.forEach(function(currentSessionTile) {
      var currentTileId = currentSessionTile.id;
      self.view.sessionTiles[currentTileId].onClick = self.frmAgendaSessionSelect;
    });
  },

  /**
     * @function frmAgendaPostshow
     * @description The function is invoked in the form postshow action which is used to setup the UI
     * @private
     */
  frmAgendaPostshow: function() {
    if(this.isSetDataInvoked){
      this.currentSelectedDate=parseInt(this.view.buttonDay1.text);
      this.changeButtonSkins("4TH SEP");
      this.setData(accelerateSessionData.eventSessionData.records); 
      this.isSetDataInvoked=!this.isSetDataInvoked;
    }
    else{
      this.sortSessions();
    }
    this.devHeight = this.view.masterContainer.frame.height;
    egLogger("devHeight = " + this.devHeight);
    var dotsblurwidth=this.view.sessionTileAnim.quantumDotsBlur.frame.height*10.7388+"dp";
  },
  
  /**
     * @function frmAgendaSetAgendaTiles
     * @description The function is used to set the skin and the image for the tiles
     * @private
     */
  frmAgendaSetAgendaTiles: function() {
    this.view.sessionTile1.tilebg.skin = "agendaTileSkinKony";
    this.view.sessionTile1.tileBGImageKony.src = "agendatilekony.png";
    this.view.sessionTile2.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile2.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile3.tilebg.skin = "agendaTileSkinQuantum";
    this.view.sessionTile3.tileBGImageKony.src = "agendatilequantum.png";
    this.view.sessionTile4.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile4.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile5.tilebg.skin = "agendaTileSkinKony";
    this.view.sessionTile5.tileBGImageKony.src = "agendatilekony.png";
    this.view.sessionTile6.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile6.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile7.tilebg.skin = "agendaTileSkinQuantum";
    this.view.sessionTile7.tileBGImageKony.src = "agendatilequantum.png";
    this.view.sessionTile8.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile8.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile9.tilebg.skin = "agendaTileSkinKony";
    this.view.sessionTile9.tileBGImageKony.src = "agendatilekony.png";
    this.view.sessionTile10.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile10.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile11.tilebg.skin = "agendaTileSkinQuantum";
    this.view.sessionTile11.tileBGImageKony.src = "agendatilequantum.png";
    this.view.sessionTile12.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile12.tileBGImageKony.src = "agendatiledbx.png";
    this.view.sessionTile13.tilebg.skin = "agendaTileSkinKony";
    this.view.sessionTile13.tileBGImageKony.src = "agendatilekony.png";
    this.view.sessionTile14.tilebg.skin = "agendaTileSkinDBX";
    this.view.sessionTile14.tileBGImageKony.src = "agendatiledbx.png";
  },

  /**
     * @function frmAgendaSessionSelect
     * @description The function is used to invoke the action on the click of the session tile
     * @param eventobject The eventobject and info of the tile which is clicked
     * @private
     */
  frmAgendaSessionSelect: function(eventobject) {
    var self = this;
    this.view.buttonBack.isVisible=false;
     kony.application.showLoadingScreen("sknBlockLoading", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false, {});
    kony.timer.schedule("sessionSelectTimer",()=>{
      kony.application.dismissLoadingScreen();
      kony.timer.cancel("sessionSelectTimer");
      self.view.buttonBack.isVisible=true;
    } ,1, false);
    this.view.txtArea.setEnabled(true);
    this.view.sessionTileAnim.left = "100%";
    this.view.sessionTileAnim.isVisible=true;
    this.view.forceLayout();
    this.view.detailsScroller.isVisible=true;
    this.currentViewState=1;
    this.setSpeakerProfile(eventobject);
    egLoggerClear();
    var self = this;
    this.thisCard = eventobject;
    egLogger("this.thisCard = " + this.thisCard.id);
    this.view.detailsScroller.left = "0%";
    this.view.sessionTileAnim.tilebg.skin = this.thisCard.tilebg.skin;
    var thisBGSkin=this.thisCard.tilebg.skin.replace("agendaTileSkin","");
    if (thisBGSkin=="Quantum"){
      self.view.sessionTileAnim.gradientOverlay.skin="gradientOverlayQuantum";
    }
    else if (thisBGSkin=="DBX"){
      self.view.sessionTileAnim.gradientOverlay.skin="gradientOverlayDBX";
    }
    else{
      self.view.sessionTileAnim.gradientOverlay.skin="gradientOverlayKony";
    }
    this.view.sessionTileAnim.sessionTitle.text = this.thisCard.sessionTitle.text;
    this.view.sessionTileAnim.sessionTime.text = this.thisCard.sessionTime.text;
    var desc= this.view[eventobject.id].sessionData.session_desc;
    if(!kony.sdk.isNullOrUndefined(desc) && desc.length>0 ){
      this.view.CopyLabel0f74c659ce7754e.isVisible=true;
      this.view.Label0c15d6a3069eb44.isVisible=true;
      this.view.CopyLabel0f74c659ce7754e.text = desc;
    }
    else{
      this.view.CopyLabel0f74c659ce7754e.isVisible=false;
      this.view.Label0c15d6a3069eb44.isVisible=false;
      if(kony.sdk.isNullOrUndefined(this.view[eventobject.id].sessionData.presenter) & kony.sdk.isNullOrUndefined(this.view[eventobject.id].sessionData.session_material)){
        this.view.detailsScroller.isVisible=false;
      }
      else{
        this.view.detailsScroller.isVisible=true;
      }
    }
    this.view.CopyLabel0f74c659ce7754e.text = this.view[eventobject.id].sessionData.session_desc;
    this.view.sessionTileAnim.imgStatus.src = this.view[eventobject.id].imgStatus.src;
    this.view.addAgendaContainer.imgStatus.src = this.view[eventobject.id].imgStatus.src;
    this.view.sessionTileAnim.callback = this.view[eventobject.id].callback;
    this.view.sessionTileAnim.addAgendaContainer.onClick = this.addToMyScheduleInAnimTile.bind(this, this.view[eventobject.id]);
    this.view.addAgendaContainer.onClick = this.addToMyScheduleInAnimTile.bind(this, this.view[eventobject.id]);
    this.view.sessionTileAnim.addAgendaContainer.skin = this.view[eventobject.id].addAgendaContainer.skin;
    this.view.addAgendaContainer.skin = this.view[eventobject.id].addAgendaContainer.skin;
    this.view.sessionTileAnim.sessionLocation.text = "<u>"+this.thisCard.sessionLocation.text+"</u>";
    this.view.sessionLocation.text = "<u>"+this.thisCard.sessionLocation.text+"</u>";
    this.view.sessionLocation.onTouchEnd=this.openFloorMap.bind(this,this.view[eventobject.id].sessionData);
    this.view.sessionTileAnim.tileBGImageKony.src = this.thisCard.tileBGImageKony.src;
    var cardFrame = this.thisCard.frame.y;
    this.sessionTileAnimBindedSession= this.view[eventobject.id].sessionData;
    egLogger("cardFrame = " + cardFrame);
    this.cardFrameRel = cardFrame - this.view.contentScroller.contentOffsetMeasured.y;
    egLogger("cardFrameRel = " + this.cardFrameRel);
    this.view.sessionTileAnim.top = this.cardFrameRel;
    this.view.sessionTileAnim.left = "0%";
    var animDuration = 0.8;
    var animHalf = animDuration * 0.5;
    var bgImageScale = kony.ui.makeAffineTransform();
    bgImageScale.scale(1.47, 1.47);
    var allCards = this.view.sessionTiles.widgets();
    this.sessionListTiles=this.view.sessionTiles.widgets();
    var cardDelay = 0;
    var cardIndexFound = false;
    for (i = 0; i < allCards.length; i++) {
      currentCard = allCards[i];
      egLogger("operating on " + currentCard.id);
      currentCard.animate(
        kony.ui.createAnimation({
          100: {
            opacity: 0,
            "stepConfig": {}
          }
        }), {
          delay: 0,
          fillMode: kony.anim.FILL_MODE_FORWARDS,
          duration: animHalf
        }, {
          animationEnd: function() {}
        });
      cardDelay = cardDelay + 0.1;
    }

    this.view.headerContainer.animate(
      kony.ui.createAnimation({
        100: {
          top: this.isIphoneXSeries ? "-206dp":"-131dp",
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {


        }
      });

    this.view.sessionTileAnim.addAgendaContainer.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {
          self.view.sessionTileAnim.addAgendaContainer.left = "82.6%";
          self.view.sessionTileAnim.addAgendaContainer.top = self.isIphoneXSeries?"85dp":"39dp";
          self.view.sessionTileAnim.addAgendaContainer.animate(
            kony.ui.createAnimation({
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: animHalf,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animHalf
            }, {
              animationEnd: function() {}
            });
        }
      });
    /*
        this.view.sessionTileAnim.addAgendaContainer.animate(
            kony.ui.createAnimation({
                //0:{left:0,"stepConfig":{}},
                100: {
                    opacity: 1,
                    "stepConfig": {}
                }
            }), {
                delay: animHalf,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: animHalf
            }, {
                animationEnd: function() {}
            });
            */
    //       	this.view.sessionTileAnim.animationElements.animate(
    //            kony.ui.createAnimation({
    //                //0:{left:0,"stepConfig":{}},
    //                100: {
    //                    opacity: 1,
    //                    "stepConfig": {}
    //                }
    //            }), {
    //                delay: animDuration,
    //                iterationCount:1,
    //                fillMode: kony.anim.FILL_MODE_FORWARDS,
    //                duration: animDuration
    //            }, {
    //                animationEnd: function() {}
    //            });
    //      this.view.sessionTileAnim.quantumDotsBlur.animate(
    //                      kony.ui.createAnimation({
    //                          //0:{left:0,"stepConfig":{}},
    //                          100: {
    //                              left: "-1465dp",
    //                              "stepConfig": {"timingFunction": kony.anim.LINEAR}
    //                          }
    //                      }), {
    //                          delay: 0,
    //                          iterationCount:0,
    //                          fillMode: kony.anim.FILL_MODE_FORWARDS,
    //                          duration: 90
    //                      }, {
    //                          animationEnd: function() {}
    //                      });
    //        this.view.sessionTileAnim.quantumDotsClear.animate(
    //                      kony.ui.createAnimation({
    //                          //0:{left:0,"stepConfig":{}},
    //                          100: {
    //                              left: "-966dp",
    //                              "stepConfig": {"timingFunction": kony.anim.LINEAR}
    //                          }
    //                      }), {
    //                          delay: 0,
    //                          iterationCount:0,
    //                          fillMode: kony.anim.FILL_MODE_FORWARDS,
    //                          duration: 40
    //                      }, {
    //                          animationEnd: function() {}
    //                      });

    this.view.sessionTileAnim.sessionLocationIcon.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionTimeIcon.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {
        }
      });
    self.view.sessionTileAnim.tileBGImageKony.animate(
      kony.ui.createAnimation({
        100: {
          transform: bgImageScale,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          this.scaledWidth=self.view.sessionTileAnim.tileBGImageKony.frame.width;
          this.scaledHeight=self.view.sessionTileAnim.tileBGImageKony.frame.height;
        }
      });
    this.view.sessionTileAnim.animate(
      kony.ui.createAnimation({
        50: {
          height: "152dp",
          "stepConfig": {}
        },
        100: {
          top:  this.isIphoneXSeries?"-45dp":"0",
          height:this.isIphoneXSeries?this.devHeight+40:this.devHeight,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
        }
      });
    this.view.sessionContentContainer.animate(
      kony.ui.createAnimation({
        50: {
          top: "100%",
          "stepConfig": {}
        },
        100: {
          top: "28%",
          "stepConfig": {}
        }
      }), {
        delay: animHalf*0.65,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.tilebg.animate(
      kony.ui.createAnimation({
        50: {
          left: "-16dp",
          right: "-16dp",
          "stepConfig": {}
        },
        100: {
          left: "-16dp",
          right: "-16dp",
          top: "0",
          height: this.devHeight,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          self.view.feedbackMaster.animate(
            kony.ui.createAnimation({
              50: {
                opacity: 0,
                "stepConfig": {}
              },
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animDuration
            }, {
              animationEnd: function() {}
            });
          self.view.imageBack.animate(
            kony.ui.createAnimation({
              //50:{top:"100%dp","stepConfig":{}},
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animDuration
            }, {
              animationEnd: function() {
                //self.view.buttonBack.isVisible = true;
              }
            });
          self.view.addAgendaContainer.animate(
            kony.ui.createAnimation({
              //50:{top:"100%dp","stepConfig":{}},
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animDuration
            }, {
              animationEnd: function() {
                //self.view.buttonBack.isVisible = true;
              }
            });
          self.view.sessionLocation.animate(
            kony.ui.createAnimation({
              //50:{top:"100%dp","stepConfig":{}},
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animDuration
            }, {
              animationEnd: function() {
                //self.view.buttonBack.isVisible = true;
              }
            });

        }
      });
    this.view.sessionTileAnim.sessionTitle.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "24dp",
          top: this.isIphoneXSeries?"104dp":"59dp",
          "stepConfig": {}
        }
      }), {
        delay: animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionLocation.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "60%",
          // top: "105dp",
          top: self.isIphoneXSeries?"170dp":"125dp",
          "stepConfig": {}
        }
      }), {
        delay: animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionTime.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "24dp",
          top: this.isIphoneXSeries?"170dp":"125dp",
          // top: "105dp",
          "stepConfig": {}
        }
      }), {
        delay: animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          this.view.addAgendaContainer.isVisible=true;
          if(this.isIphoneXSeries){
            this.view.sessionLocation.top="125dp";
            this.view.addAgendaContainer.top="39dp";
          }
          this.view.sessionLocation.isVisible=true;
          this.view.sessionTileAnim.sessionTitle.text=this.view[eventobject.id].sessionData.session_name;
        }.bind(this)
      });
    this.view.sessionTileAnim.quantumDotsClear.animate(
      kony.ui.createAnimation({
        0:{opacity:0,"stepConfig":{}},
        100: {
          opacity: 1,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
         
        }
      });
    this.view.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          backgroundColor: "4B3A66",
          "stepConfig": {}
        }
      }), {
        delay: animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {
          this.view.addAgendaContainer.isVisible=true;
          this.view.sessionLocation.isVisible=true;
          //this.view.buttonBack.isVisible=true;
        }.bind(this)
      });

  },
  
  checkInternet:function(session){
    let isNetworkAvailable = false;
        httpclient = new kony.net.HttpRequest();
        httpclient.open(constants.HTTP_METHOD_GET, "https://www.google.com");
        httpclient.onReadyStateChange = this.httpSuccessCallback;
        httpclient.send();
  },
  httpSuccessCallback: function() {
    if (httpclient.readyState == 4) {
        if (httpclient.status == 200) {
            this.view.flxPdf.zIndex = 300;
            this.view.flxPdf.mobileheader.headerTitle = heading;
            this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
            this.view.flxPdf.animate(this.animateTopForPdf("0dp"), this.getPlatformSpecific(), {
                "animationEnd": function() {
                    this.view.pdfBrowser.requestURLConfig = {
                        URL: "https://docs.google.com/gview?embedded=true&url=" + floormap,
                        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                    };
                }.bind(this)
            });
        } else {
          this.view.flxPdf.zIndex = 300;
          this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
          this.view.flxPdf.animate(this.animateTopForPdf("0dp"), this.getPlatformSpecific(), {
                "animationEnd": function() {
                    this.view.pdfBrowser.requestURLConfig = {
                        URL: "error.html",
                        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                    };
                }.bind(this)
            });
            this.view.flxPdf.mobileheader.headerTitle = heading;
        }
    }
},
  openFloorMap:function(session){
    if(kony.sdk.isNullOrUndefined(session.room_no) || session.room_no.length<=0){
      return ;
    }
    this.view.flxPdf.isVisible=true;
    var floormap=session.room_no;
    var heading =session.session_location;
    this.view.flxPdf.zIndex = 300;
    this.view.flxPdf.mobileheader.headerTitle = heading;
	this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
    this.view.flxPdf.animate(this.animateTopForPdf("0dp"), this.getPlatformSpecific(), {
                "animationEnd": function() {
                    this.view.pdfBrowser.requestURLConfig = {
                        URL: "https://docs.google.com/gview?embedded=true&url=" + floormap,
                        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                    };
                }.bind(this)
            });
    //this.checkInternet();
  },
  /**
     * @function frmAgendaSessionClose
     * @description The function is used to invoke the action on the click of the close button of the session tile
     * @private
     */
  frmAgendaSessionClose: function() {
     var self = this;
     self.view.buttonBack.setEnabled(false);
     self.view.buttonBack.setVisibility(false);
     kony.application.showLoadingScreen("sknBlockLoading", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false, {});
    try{
         kony.timer.schedule("sessionCloseTimer",()=>{
          kony.application.dismissLoadingScreen();
          kony.timer.cancel("sessionCloseTimer");
          self.view.buttonBack.setEnabled(true);
          self.view.buttonBack.setVisibility(true);
        } , 2, false);
    }catch(exception){
      kony.print("Exception while animating");
    }
    this.view.txtArea.setEnabled(false);
    this.view.txtArea.text="";
    if(this.isNavigatedFrmOtherForm){
      this.isNavigatedFrmOtherForm=false;
      this.navigateToOtherForm();
      return;
    }
    var self = this;
    this.view.sessionTileAnim.sessionTitle.text= this.sessionTileAnimBindedSession.shortTitle;
    egLogger("this.thisCard = " + this.thisCard.id);
    var animDuration = 0.8;
    var animHalf = animDuration * 0.5;
    var bgImageScale = kony.ui.makeAffineTransform();
    bgImageScale.scale(1, 1);
    var allCards = this.view.sessionTiles.widgets();
    var cardDelay = 0;
    for (i = 0; i < allCards.length; i++) {
      currentCard = allCards[i];
      egLogger("operating on " + currentCard.id);
      currentCard.animate(
        kony.ui.createAnimation({
          //0:{left:0,"stepConfig":{}},
          100: {
            opacity: 1,
            "stepConfig": {}
          }
        }), {
          delay: (animDuration + animHalf),
          fillMode: kony.anim.FILL_MODE_FORWARDS,
          duration: animHalf
        }, {
          animationEnd: function() {}
        });
      cardDelay = cardDelay + 0.1;
    }
    this.view.headerContainer.animate(
      kony.ui.createAnimation({
        //0:{left:0,"stepConfig":{}},
        100: {
          top: this.isIphoneXSeries?"-45dp":"0dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration + animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.addAgendaContainer.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {
          self.view.sessionTileAnim.addAgendaContainer.left = "35dp";
          self.view.sessionTileAnim.addAgendaContainer.top = "34dp";

          self.view.sessionTileAnim.addAgendaContainer.animate(
            kony.ui.createAnimation({
              //0:{left:0,"stepConfig":{}},
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: animHalf,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: animHalf
            }, {
              animationEnd: function() {}
            });
        }
      });
    this.view.sessionTileAnim.sessionTimeIcon.animate(
      kony.ui.createAnimation({
        //0:{left:0,"stepConfig":{}},
        100: {
          opacity: 1,
          "stepConfig": {}
        }
      }), {
        delay: animDuration + animHalf,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.tileBGImageKony.animate(
      kony.ui.createAnimation({
        //50:{transform:"100%dp","stepConfig":{}},
        100: {
          transform: bgImageScale,
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animHalf * 0.5
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.animate(
      kony.ui.createAnimation({
        50: {
          top: this.cardFrameRel,
          height: "152dp",
          "stepConfig": {}
        },
        100: {
          top: this.cardFrameRel,
          height: "152dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          self.view.detailsScroller.left = "100%";
          self.view.sessionTileAnim.left = "100%";
        }
      });
    this.view.sessionContentContainer.animate(
      kony.ui.createAnimation({
        50: {
          top: "25%",
          "stepConfig": {}
        },
        100: {
          top: "100%",
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.feedbackMaster.animate(
      kony.ui.createAnimation({
        50: {
          opacity: 1,
          "stepConfig": {}
        },
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.imageBack.animate(
      kony.ui.createAnimation({
        //50:{top:"100%dp","stepConfig":{}},
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          //self.view.buttonBack.isVisible = false;
        }
      });
    this.view.addAgendaContainer.animate(
      kony.ui.createAnimation({
        //50:{top:"100%dp","stepConfig":{}},
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          //self.view.buttonBack.isVisible = false;
        }
      });
    this.view.sessionLocation.animate(
      kony.ui.createAnimation({
        //50:{top:"100%dp","stepConfig":{}},
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
          //self.view.buttonBack.isVisible = false;
        }
      });
    this.view.sessionTileAnim.tilebg.animate(
      kony.ui.createAnimation({
        50: {
          left: "-16dp",
          right: "-16dp",
          top: "12dp",
          height: "130dp",
          "stepConfig": {}
        },
        100: {
          left: "20dp",
          right: "20dp",
          top: "12dp",
          height: "130dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionTitle.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "91dp",
          top: "23dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionLocation.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "111dp",
          top: "52dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.quantumDotsClear.animate(
      kony.ui.createAnimation({
        0:{opacity:1,"stepConfig":{}},
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {}
      });
    this.view.sessionTileAnim.sessionTime.animate(
      kony.ui.createAnimation({
        //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
        100: {
          left: "111dp",
          top: "74dp",
          "stepConfig": {}
        }
      }), {
        delay: animDuration,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: animDuration
      }, {
        animationEnd: function() {
        }.bind(this)
      });

  },

  /**
     * @function detailsScrollerOnScrolling
     * @description The function is used to animate the details container
     * @private
     */
  detailsScrollerOnScrolling: function() {
    
    var self = this;
    var scrollPosY = self.view.detailsScroller.contentOffsetMeasured.y;
    var tileScale = kony.ui.makeAffineTransform();
    tileScale.scale(1, 1);
    if (scrollPosY < 0) {
      tileScale.scale(1 + (scrollPosY * -0.002), 1 + (scrollPosY * -0.002));
      self.view.sessionTileAnim.transform = tileScale;
    } else {
      self.view.sessionTileAnim.top = (scrollPosY * -0.3);
      var opacity= (1 - (scrollPosY * 0.01));
      self.view.imageBack.opacity = opacity;
      if(opacity>=1){
        self.view.addAgendaContainer.isVisible=true;
        self.view.sessionLocation.isVisible=true;
      }
      else{
        self.view.addAgendaContainer.isVisible=false;
        self.view.sessionLocation.isVisible=false;
      }

    }

  },

  /**
     * @function agendaFilter
     * @description The function is used to animate and change the agenda filter based on the track selected
     * @param eventobject The event object or the widget info of the tab which is selected
     * @private
     */
  agendaFilter: function(eventobject) {
    var self = this;
    var leftPos = "0%";
    var buttonText = "ALL";
    var targetSkin = "filterSkinAll";
    var destColor = "";
    var sessionTrack = null;
    if (eventobject.id == "filterAll") {
      this.currentSelectedTab=eventConstants.KEYNOTE;
      leftPos = "0%";
      buttonText = "ALL";
      targetSkin = "filterSkinAll";
      destColor = "1F232900";
      sessionTrack = eventConstants.KEYNOTE;
    } else if (eventobject.id == "filterDBX") {
      this.currentSelectedTab=eventConstants.DBX;
      leftPos = "33.33%";
      buttonText = "DBX";
      targetSkin = "filterSkinDBX";
      destColor = "4B3A6600";
      sessionTrack = eventConstants.DBX;
    } else {
      this.currentSelectedTab=eventConstants.QUANTUM;
      leftPos = "66.66%";
      buttonText = "QUANTUM";
      targetSkin = "filterSkinQuantum";
      destColor = "14334500";
      sessionTrack = eventConstants.QUANTUM;
    }

    this.view.filterWidget.animate(
      kony.ui.createAnimation({
        100: {
          left: leftPos,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.22
      }, {
        animationEnd: function() {}
      });
    this.view.filterButton.animate(
      kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.1
      }, {
        animationEnd: function() {

          self.view.filterButton.text = buttonText;
          self.view.filterButton.skin = targetSkin;

          self.view.filterButton.animate(
            kony.ui.createAnimation({
              //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
              100: {
                opacity: 1,
                "stepConfig": {}
              }
            }), {
              delay: 0,
              fillMode: kony.anim.FILL_MODE_FORWARDS,
              duration: 0.1
            }, {
              animationEnd: function() {}
            });

        }
      });
    
    this.sortSessions();
  },

  /**
     *	@function setData
     * 	@description This function is used to create the session tile at run time and add it to the view
     *	@param sessions {Object} - list of all sessions from the backend
     * 	@private
     */
  setData: function(sessions) {
    this.view.sessionTiles.removeAll();
    var currentDate=this.currentSelectedDate;
    var currentCategory=this.currentSelectedTab;
    this.filteredSession=[];
    this.allSessionTiles=[];
    this.sessionsList = sessions;
    this.checkIfSessionsAreMyScheduled(sessions);
    var sessionCount = sessions.length;
    var isFirst=true,top;
    for (var index = 0; index < sessionCount; index++) {
      var id = eventConstants.SESSION_TILE_ID + index;
      var sessionObj = sessions[index];
      var sessionTile;
      
        if(sessionObj.session_track_id==4){
          var duration=this.findTimeDifference(sessionObj.session_start_date,sessionObj.session_end_date);
          if(isFirst){
            top="142dp";
            isFirst=!isFirst;
          }
          else{
            top="0dp";
          }
          var breakTile=this.createBreakTile(id,top);
          breakTile.lblTitle.text=sessionObj.session_name;
          breakTile.setDuration(sessionObj.session_start_date, sessionObj. session_end_date);
          breakTile.sessionTrackId=4;
          breakTile.startDate=sessionObj.session_start_date;
          this.allSessionTiles.push(breakTile);
          this.filteredSession.push(breakTile);
          //breakTile.isVisible=false;
          
          this.view.sessionTiles.add(breakTile);
        }
        else{
          if(isFirst){
            top="131dp";
            isFirst=!isFirst;
          }
          else{
            top="0dp";
          }
          sessionTile = this.createSessionTile(id, top);
          sessionTile.setTitleData(sessionObj);
          sessionTile.callback=this.mySchedular;
          sessionTile.onClick=this.frmAgendaSessionSelect.bind(this);
          this.allSessionTiles.push(sessionTile);
          //sessionTile.isVisible=false;
          this.view.sessionTiles.add(sessionTile);
          
          
        }
      }
    this.view.sessionTileAnim.callback = this.mySchedular;
    this.sortSessions();
  },
  sortSessions:function(){
    var sessionTiles=this.allSessionTiles;
    if(this.currentSelectedTab===eventConstants.KEYNOTE){
      this.filterByDate(sessionTiles);
    }
    else{
      this.filterByDateAndCategory(sessionTiles);
    }
  },
  filterByDate:function(sessionTiles){
    var myAgendaData=kony.store.getItem("myAgendaData");
    var isFirst=true;
    var currentDate=this.currentSelectedDate;
    var tilesCount=sessionTiles.length;
    for(var index=0;index<tilesCount;index++){
      var tileObject=sessionTiles[index];
      if(this.checkDate(tileObject.startDate,currentDate)){
        this.view[tileObject.id].isVisible=true;
        this.view[tileObject.id].opacity=100;
        if(isFirst){
          this.view[tileObject.id].top="142dp";
          isFirst=! isFirst;
        }
        else{
           this.view[tileObject.id].top="0dp";
        }
        
      }
      else{
        this.view[tileObject.id].isVisible=false;
      }
      this.toggleAgendaIfBookmarked(tileObject, myAgendaData);
    }
  },
  filterByDateAndCategory:function(sessionTiles){
    var isFirst=true;
    var myAgendaData=kony.store.getItem("myAgendaData");
    var currentDate=this.currentSelectedDate;
    var currentCategory=this.currentSelectedTab;
     var tilesCount=sessionTiles.length;
    for(var index=0;index<tilesCount;index++){
      var tileObject=sessionTiles[index];
      if(tileObject.sessionData === null && tileObject.sessionData === undefined){
        continue;
      }
      if(this.checkDate(tileObject.startDate,currentDate) && tileObject.sessionTrackId==currentCategory){
        this.view[tileObject.id].isVisible=true;
        this.view[tileObject.id].opacity=100;
       if(isFirst){
         this.view[tileObject.id].top="131dp";
         isFirst=! isFirst;
       }
        else{
          this.view[tileObject.id].top="0dp";
        }
    }
      else{
        this.view[tileObject.id].isVisible=false;
      }
      this.toggleAgendaIfBookmarked(tileObject);
    }
  },
  toggleAgendaIfBookmarked:function(tileObject, myAgendaData){
    if(!kony.sdk.isNullOrUndefined(myAgendaData)){
        if(!kony.sdk.isNullOrUndefined(tileObject.sessionData)){
          if( myAgendaData.hasOwnProperty(tileObject.sessionData.event_session_id)){
          this.view[tileObject.id].imgStatus.src=this.view[tileObject.id].myScheduleIndicatorImage;
          this.view[tileObject.id].addAgendaContainer.skin=this.view[tileObject.id].agendaContainerSkin;
        }
        else{
           this.view[tileObject.id].imgStatus.src=this.view[tileObject.id].agendaIndicatorImage;
          this.view[tileObject.id].addAgendaContainer.skin=this.view[tileObject.id].agendaUnselectedSkin;
        
        }
        }
      }
  },
    checkDate:function(startDate,selectedDate){
      var splitDate = null;
     var splitCharecter = "";
     if(startDate !== null && startDate !== undefined){
         splitCharecter = startDate.indexOf("T") > 0  ? "T" : " ";
         splitDate =startDate.split(splitCharecter);
       	 var currentDate = parseInt(splitDate[0].split("-")[2]);
         if(currentDate === selectedDate){
           return true;
         }
       else{
         return false;
       }
     }
    },
  
  findTimeDifference:function(t1,t2){
    var d1=new Date(t1).getTime();
    var d2=new Date(t2).getTime();
    var diff=(d2-d1)/1000;
    diff/=60;
    var hours=parseInt(diff/60);
    var min=parseInt(diff%60);
    var returnValue="";
    if(hours>0){
      returnValue=hours+" HOUR ";
    }
    if(min>0){
      returnValue+= min+" MINS ";
    }
    return returnValue;

  },
  /**
     *	@function checkIfSessionsAreMyScheduled
     * 	@description This is update the session object if it is already added to myschedule
     *	@param sessions {Object} - list of sessions
     * 	@private
     */
  checkIfSessionsAreMyScheduled:function(sessions){
    var myScheduledSession=kony.store.getItem("myAgendaData");
    if(kony.sdk.isNullOrUndefined(myScheduledSession)){
      return;
    }
    for(var index=0;index<sessions.length;index++){
      var session_id=sessions[index].event_session_id;
      if(!kony.sdk.isNullOrUndefined(session_id) && myScheduledSession.hasOwnProperty(session_id)){
        sessions[index].isAddedToMySchedule=true;
      }
      else{
        sessions[index].isAddedToMySchedule=false;
      }
    }
  },
  /**
     *	@function createSessionTile
     * 	@description This function is invoked to get the dynamic instance of the session tile component
     *	@param id {String} - id of the component
     *	@param top {String} - top of the component
     * 	@private
     */
  createSessionTile: function(id, top) {
    var sessionTile = new tiles.sessionTile({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": false,
      "height": "152dp",
      "id": id,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "skin": "CopyslFbox0j4c69221be4c47",
      "top": top,
      "width": "100%",
      "zIndex": 1,
      "overrides": {
        "sessionLocationIcon": {
          "src": "agendatilelocationicon.png"
        },
        "sessionTile": {
          "bottom": "viz.val_cleared",
          "height": "152dp",
          "isVisible": true,
          "left": "0dp",
          "top": "0dp",
          "width": "100%"
        },
        "sessionTimeIcon": {
          "src": "agendatiletimeicon.png"
        },
        "tileBGImageKony": {
          "isVisible": true,
          "src": "agendatilekony.png"
        }
      }
    }, {
      "retainFlowHorizontalAlignment": false,
      "overrides": {}
    }, {
      "overrides": {}
    });
    return sessionTile;
  },

  /**
     *	@function setSpeakerProfile
     * 	@description This function is used to set the speaker info to the UI Elements
     *	@param eventObject {Obejct} -traverses the Speaker_master data and fiiter the speaker from it.
     * 	@private
     */
  setSpeakerProfile: function(eventObject) {
    this.speakerIdMap = {};
    var flxImageContainerwidthCalc = this.view.flxSpeaker0.frame.width * 1.1;
    if(flxImageContainerwidthCalc == 0)
      flxImageContainerwidthCalc = 185;
    flxImageContainerwidthCalc = flxImageContainerwidthCalc.toFixed();
    var imgHeight = flxImageContainerwidthCalc * 1.02;
    imgHeight = imgHeight.toFixed();
    this.view.imgThanks.isVisible = false;
    this.view.lblThankyou.isVisible = false;
    var id = eventObject.id;
    var len = id.length;
    var startIndex = eventConstants.SESSION_TILE_ID.length;
    var sessionIndex = id.substring(startIndex, len);
    var sessionObject = this.sessionsList[sessionIndex];
    this.dismissRatingIfSubmitted(sessionObject);
    this.currentSessionObjectInDetailScreen = sessionObject;
    this.setSessionAttachments(sessionObject);
    var speakerList = sessionObject["presenter"];
    if (kony.sdk.isNullOrUndefined(speakerList)) {
      this.view.CopyLabel0he0b8d5a22fc4f.isVisible = false;
      this.view.flxSpeaker0.isVisible = false;
      this.view.flxSpeaker1.isVisible = false;
      this.view.flxSpeaker2.isVisible = false;
      return;
    }
    this.ratingLength = 0;
    var presenters = [];
    var speakers_master = accelerateSpeakerData.eventSpeakerData.records;
    var speakerIndex;
    for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
      if(speakerList[speakerIndex].SoftDeleteFlag !== undefined && speakerList[speakerIndex].SoftDeleteFlag === true){
        continue;
      }else{
        presenters.push(speakerList[speakerIndex]);
      }
    }
    speakerList = presenters;
    for (speakerIndex = 0; speakerIndex < speakerList.length && speakerIndex<3; speakerIndex++) {
      this.ratingLength++;
      var speakerObject = speakerList[speakerIndex];
      for (var index = 0; index < speakers_master.length; index++) {
        if (speakerObject.master_speaker_id == speakers_master[index].speaker_id) {
          var speakerBio = speakers_master[index];
          this.speakerIdMap["flxSpeaker"+speakerIndex] = speakerObject.master_speaker_id;
          this.view["flxSpeaker"+speakerIndex].isVisible=true;
          this.view["speakerName" + speakerIndex].text = speakerBio.speaker_name;
          var title = speakerBio.speaker_title.length > 20 ? speakerBio.speaker_title.substring(0, 16) + "..." : speakerBio.speaker_title;
          this.view["speakerDesignation" + speakerIndex].text = title;
          if(speakerBio.speaker_bio === undefined) {
            speakerBio.speaker_bio = "";
          }
          var description = speakerBio.speaker_bio.length > 50 ? speakerBio.speaker_bio.substring(0, 47) + "..." : speakerBio.speaker_bio;
          this.view["speakerDescription" + speakerIndex].text = description;
          this.view["ratingTile" + speakerIndex].setSpeakerProfileInRating(speakerBio);
          this.view["ratingTile" + speakerIndex].resetAllSkins();
          this.view["flxSpeaker"+speakerIndex].onClick = function(eventobject) {
            this.onClickOfSpeaker(this.speakerIdMap[eventobject.id]);
          }.bind(this);
          if(flxImageContainerwidthCalc>0 && imgHeight>0){
            this.view["imgSpeaker" + speakerIndex].width = flxImageContainerwidthCalc + "dp";
            this.view["imgSpeaker" + speakerIndex].height = imgHeight + "dp";
          }
          this.view["imgSpeaker" + speakerIndex].src = speakerBio.speaker_profile_pic;
        }
      }
    }
    for (speakerIndex; speakerIndex < 3; speakerIndex++) {
      this.view["flxSpeaker" + speakerIndex].isVisible = false;
      this.view["ratingTile" + speakerIndex].isVisible = false;
    }
    this.view["ratingTile"].resetAllSkins();
  },
  onClickOfSpeaker:function(id){
    var naviInfo={
      "form":this.view.id,
      "speakerId":id,
    };
    var ntf = new kony.mvc.Navigation("frmPresenters");
    ntf.navigate(naviInfo);
  },
  
  dismissRatingIfSubmitted:function(sessionObject){
    this.view.lblFeedback.isVisible=true;
    this.view.flxRatingContainer.isVisible = true;
    this.view.flxRatingContainer.height = kony.flex.USE_PREFERRED_SIZE;
    var feedbackSubmittedSessions=kony.store.getItem("feedbackstore");
    if(kony.sdk.isNullOrUndefined(feedbackSubmittedSessions)){
      return;
    }
    if(feedbackSubmittedSessions.hasOwnProperty(sessionObject.event_session_id)){
      this.dismissRatingTiles();
    }

  },

  /**
     *	@function onClickOfEventDate
     * 	@description This function is invoked when the event date is clicked
     *	@param eventObject {Object} - Event object of the button
     * 	@private
     */
  onClickOfEventDate: function(eventobject) {
    let buttonText = eventobject.text;
    this.changeButtonSkins(buttonText);
    this.sortSessions();
  },

  /**
     *	@function changeButtonSkins
     * 	@description This function is used to change the button skins
     *	@param buttonText Text of the button which is clicked
     * 	@private
     */
  changeButtonSkins: function(buttonText) {
    if (buttonText === "4TH SEP") {
      this.view.buttonDay1.skin = "sknButtonActive";
      this.view.buttonDay1.focusSkin = "sknButtonActive";
      this.view.buttonDay2.skin = "sknButtonInActive";
      this.view.buttonDay2.focusSkin = "sknButtonActive";
    } else {
      this.view.buttonDay2.skin = "sknButtonActive";
      this.view.buttonDay2.focusSkin = "sknButtonActive";
      this.view.buttonDay1.skin = "sknButtonInActive";
      this.view.buttonDay1.focusSkin = "sknButtonActive";
    }
    this.currentSelectedDate=parseInt(buttonText);
     
  },
  /**
     *	@function filterSessionTiles
     * 	@description This function is used to toggle the Visibility based on the category choosen
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
  filterSessionTiles: function(sessionTrackId) {
    var isFirstTile = false;
    var sessionCount = this.sessionsList.length;
    for (var index = 0; index < sessionCount; index++) {
      var id = eventConstants.SESSION_TILE_ID + index;
      if (sessionTrackId === eventConstants.KEYNOTE) {
        this.view[id].isVisible = true;
        this.view[id].opacity=100;
        this.toggleIconsOfAgendaContainer(this.view[id]);
        this.filteredSession.push(this.view[id]);
        if (!isFirstTile) {
          this.view[id].top = "131dp";
          isFirstTile = true;
          continue;
        }
        this.view[id].top = "0dp";
      } else if (this.view[id].sessionTrackId !== sessionTrackId) {
        this.view[id].isVisible = false;
        this.view[id].opacity=0;
      } else {
        this.view[id].isVisible = true;
        this.view[id].opacity=100;
        this.toggleIconsOfAgendaContainer(this.view[id]);
        this.filteredSession.push(this.view[id]);
        if (!isFirstTile) {
          this.view[id].top = "131dp";
          isFirstTile = true;
          continue;
        }
        this.view[id].top = "0dp";
      }
    }
    //#ifdef android
    this.view.contentScroller.setContentOffset({"y":"0dp"}, true);
    //#endif
    this.view.contentScroller.forceLayout();
    this.view.forceLayout();
  },
  
  toggleIconsOfAgendaContainer:function(tileObject){
    var myAgendaData=kony.store.getItem("myAgendaData");
    if(kony.sdk.isNullOrUndefined(myAgendaData)){
      return ;
    }
    if(!kony.sdk.isNullOrUndefined(this.view[tileObject.id].sessionData) && kony.sdk.isNullOrUndefined(myAgendaData[this.view[tileObject.id].sessionData.event_session_id])){
              	this.view[tileObject.id].imgStatus.src=this.view[tileObject.id].agendaIndicatorImage;
                this.view[tileObject.id].addAgendaContainer.skin=this.view[tileObject.id].agendaUnselectedSkin;
            }
  },
  /**
     *	@function filterSessionTiles
     * 	@description This function is used to toggle the Visibility based on the category choosen
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
  onClickOfSubmit: function() {
    if(kony.sdk.isNullOrUndefined(this.view.ratingTile.selectedIndex)){
      alert("Please rate the session before submitting");
      return ;
    }
    var batch = [];
    var record;
    for (var index = 0; index < this.ratingLength; index++) {
      record = {};
      record.speaker_id = this.view["ratingTile" + index].speakerId;
      record.rating = kony.sdk.isNullOrUndefined(this.view["ratingTile" + index].selectedIndex)===true?0:this.view["ratingTile" + index].selectedIndex;
      batch.push(record);
    }
    record = {};
    record.speaker_id = this.view.ratingTile.speakerId;
    record.rating = this.view.ratingTile.selectedIndex;
    batch.push(record);
    record = {};
    record.speaker_id = -2;
    record.feedback_comments = this.view.txtArea.text;
    batch.push(record);
    var dataBatch = {
      "records": batch
    };
    createRecord(eventConstants.OBJECT_SERVICE_NAME, eventConstants.DATA_MODEL_SESSION_FEEDBACK, dataBatch, this.successInUpdateFeedback.bind(this), this.failureInUpdateFeedback.bind(this));
  },
  successInUpdateFeedback: function(response) {
    kony.print(" feedback saved successfully");
    this.dismissRatingTiles();
    this.currentSessionObjectInDetailScreen.feedBackSubmit = true;
    this.addToKonyStore(this.currentSessionObjectInDetailScreen.event_session_id);


  },
  failureInUpdateFeedback: function(error) {
    kony.print("failure in storing feedback");
    this.dismissRatingTiles();
  },
  addToKonyStore:function(sessionId){
    var feedbackSubmittedSessions=kony.store.getItem("feedbackstore");
    if(kony.sdk.isNullOrUndefined(feedbackSubmittedSessions)){
      feedbackSubmittedSessions={};
    }
    feedbackSubmittedSessions[sessionId]=sessionId;
    kony.store.setItem("feedbackstore", feedbackSubmittedSessions);
  },
  dismissRatingTiles: function() {
    var transformObject = kony.ui.makeAffineTransform();
    transformObject.scale(1, 0);
    this.view.flxRatingContainer.animate(this.createAnimationObject("0dp"), this.getPlatformSpecific(), {
      animationEnd: function() {
        this.view.feedbackMaster.forceLayout();
      }.bind(this)
    });
    this.view.feedbackMaster.animate(this.createAnimationObject(kony.flex.USE_PREFERRED_SIZE), this.getPlatformSpecific(), {
      animationEnd: function() {
        this.view.feedbackMaster.forceLayout();
      }.bind(this)
    });
    //         this.view.feedbackMaster.setContentOffset({
    //             "y": "0%",
    //         }, true);
    this.view.imgThanks.isVisible = true;
    this.view.lblThankyou.isVisible = true;
  },

  /**
     *	@function filterSessionTiles
     * 	@description This function is used to toggle the Visibility based on the category choosen
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
  createAnimationObject: function(height) {
    var animationObejct = kony.ui.createAnimation({
      100: {
        //"transformation": transformation,
        "height": height,
        "stepConfig": {}
      }
    });
    return animationObejct;
  },
  /**
     *	@function getPlatformSpecific
     * 	@description This function is to create animation related config
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
  getPlatformSpecific: function() {
    var specificObj = {
      delay: 0,
      fillMode: kony.anim.FILL_MODE_FORWARDS,
      duration: 0.5
    };
    return specificObj;
  },
  /**
     *	@function mySchedular
     * 	@description This function is to set values in the confirmatiom popup
     * 	@private
     */
  mySchedular: function(sessionTitleId, sessionData) {
    this.view.flxToast.opacity=100;
    this.view.flxToast.isVisible=true;
    kony.timer.schedule("timer"+Math.random(), function(){
      this.view.flxToast.animate(kony.ui.createAnimation({
        100: {
          opacity: 0,
          "stepConfig": {}
        }
      }), {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.5
      }, {
        animationEnd: function() {}
      });
    }.bind(this)
                        , 0.5, false);

  },
  /**
     *	@function onClickOfDone
     * 	@description This function is confirmation that user agree to add session to myschedhule
     * 	@private
     */
  onClickOfDone: function() {
    this.view.customprompt.isVisible = false;
    this.view[this.currentClickedSessionTItleId].sessionToMySchedule();
  },
  /**
     *	@function setSessionAttachments
     * 	@description This function is to create presentation  material associated with sessions
     *	@param sessionObject {Object} parse Session Object to get material Object
     * 	@private
     */
  setSessionAttachments: function(sessionObject) {
    this.view.flxMaterial.removeAll();
    var materials = sessionObject.session_material;
     var refinedMaterail=this.preProcessMaterials(materials);
    	sessionObject.session_material=refinedMaterail;
    	materials=refinedMaterail;
    if (kony.sdk.isNullOrUndefined(materials) ||materials.length<=0 ) {
      this.view.lblPresentation.isVisible = false;
      this.view.flxMaterial.isVisible=false;
      if(!this.view.flxRatingContainer.isVisible ){
        //this.view.flxCurvedArrow.isVisible=false;
      }
      return;
    }
    this.view.flxCurvedArrow.isVisible=true;
    this.view.flxMaterial.isVisible=true;
    var flexInstance, materialInstance;
    var materailsCount= materials.length;
    if (materailsCount == 1) {
      var id = "flex";
      flexInstance = this.createFlexInstace(id);
      flexInstance.width="300dp";
      this.view.flxMaterial.add(flexInstance);
      var materialId = "material";
      materialInstance = this.createMaterialInstance(materialId, "0dp", "100%");
      this.view[id].add(materialInstance);
      this.view[materialId].pdfUrl = materials[0].url;
      this.view[materialId].onClick=this.onClickOfPDF.bind(this);
      return;
    }
    var width = "130dp";
    var materialIdConstant = "material";
    var flexIdConstant = "flex";
    for (var materialIndex = 0; materialIndex < materailsCount; materialIndex = materialIndex + 2) {
      flexInstance = this.createFlexInstace(flexIdConstant + materialIndex);
      flexInstance.width="300dp";
      this.view.flxMaterial.add(flexInstance);
      materialInstance = this.createMaterialInstance(materialIdConstant + materialIndex, "0dp", width);
      this.view[flexInstance.id].add(materialInstance);
      this.view[materialInstance.id].pdfUrl = (materials[materialIndex].url);
      this.view[materialInstance.id].onClick=this.onClickOfPDF.bind(this);
      if (materialIndex + 1 < materailsCount) {
        materialInstance = this.createMaterialInstance(materialIdConstant + materialIndex + 1, "170dp", width);
        this.view[flexInstance.id].add(materialInstance);
        this.view[materialInstance.id].pdfUrl = (materials[materialIndex + 1].url);
        this.view[materialInstance.id].onClick=this.onClickOfPDF.bind(this);
      }
    }

  },
  
  preProcessMaterials:function(materials){
    if(kony.sdk.isNullOrUndefined(materials)){
      return ;
    }
    var refinedMateral=[];
    var count=materials.length;
    for(var index=0;index<count;index++){
      var materialObj=materials[index];
      if(!kony.sdk.isNullOrUndefined(materialObj.SoftDeleteFlag) &&  materialObj.SoftDeleteFlag==false){
        refinedMateral.push(materialObj);
      }
    }
    return refinedMateral;
  },
  /**
     *	@function doesSessionContainsMaterial
     * 	@description This is a helper function
     *	@param session {Object} session Object
     * 	@private
     */
  doesSessionContainsMaterial: function(session) {
    if (!kony.sdk.isNullOrUndefined(session.session_material) && session.session_material.length > 0) {
      return true;
    }
    return false;
  },
  /**
       *	@function filterSessionTiles
       * 	@description This function is to create dynamic instance of presentation component
       @param id {Integer} id to be ued while creating instance
       * 	@private
       */
  createMaterialInstance: function(id, left, width) {
    var material = new com.konymp.presentation({
      "clipBounds": true,
      "height": "150dp",
      "id": id,
      "isVisible": true,
      "layoutType": kony.flex.FLOW_VERTICAL,
      "left": left,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "skin": "sknPresentation",
      "top": "0dp",
      "width": width,
      "overrides": {
        "imgAttachment": {
          "src": "pdf.png"
        },
        "presentation": {
          "height": "150dp",
          "isVisible": false,
          "left": "155dp",
          "top": "0dp",
          "width": "130dp"
        }
      }
    }, {
      "retainFlowHorizontalAlignment": false,
      "overrides": {}
    }, {
      "overrides": {}
    });

    return material;
  },
  
  createBreakTile:function(id,top){
    var breaktile = new com.konymp.breaktile({
                "autogrowMode": kony.flex.AUTOGROW_NONE,
                "clipBounds": true,
                "height": "65dp",
                "id": id,
                "isVisible": true,
                "layoutType": kony.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "sknFlxBreak",
                "top": top,
                "width": "100%",
                "overrides": {}
            }, {
                "retainFlowHorizontalAlignment": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
    return breaktile;
    
  },
  createBreakSession:function(id,top,height,text){
    var flex=this.createFlexInstace(id);
    flex.height=height;
    flex.top=top;
    flex.left="0dp";
    flex.width="100%";
    flex.skin="sknFlxBreak";
    var label=this.createLabelInstance("lbBreak"+id,text);
    label.skin="sknBreak";
    flex.add(label);
    return flex;
  },
  createLabelInstance:function(id,text){
    var label=new kony.ui.Label({
      "id":id,
      "text":text,
      "centerX":"50%",
      "centerY":"50%",
    }, {}, {});
    return label;
  },
  /**
     *	@function createFlexInstace
     * 	@description This function is to create dynamic instance of flex container
     *	@param id {Integer} id to be ued while creating instance
     * 	@private
     */
  createFlexInstace: function(id) {
    var flexContainer = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": true,
      "height": "160dp",
      "id": id,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "20dp",
      "zIndex": 1
    }, {
      "retainFlowHorizontalAlignment": false
    }, {});
    return flexContainer;
  },
  /**
     *	@function addToMyScheduleInAnimTile
     * 	@description This function is to create add session to my schedhule from session detail page
     *	@param eventObject {Object} of sessionTileAnim
     *  @param sessionTileObject {Object} sessionTile Object which is clicked
     * 	@private
     */
  addToMyScheduleInAnimTile: function(tileObject, addAgendaButton) {
    tileObject.sessionToMySchedule();
    addAgendaButton.skin = tileObject.addAgendaContainer.skin;
    addAgendaButton.imgStatus.src = tileObject.imgStatus.src;
    this.view.sessionTileAnim.addAgendaContainer.skin=tileObject.addAgendaContainer.skin;
    this.view.sessionTileAnim.imgStatus.src=tileObject.imgStatus.src;

  },
  /**
     *	@function onClickOfPDF
     * 	@description This function is to open pdf
     *	@param floorMapURL {url} url of the pdf
     * 	@private
     */
  onClickOfPDF: function(eventObject) {
    this.view.flxPdf.isVisible=true;
    this.view.flxPdf.zIndex=300;
    var url=this.view[eventObject.id].pdfUrl;
    this.view.flxPdf.mobileheader.headerTitle="PDF Material";
    this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
    this.view.flxPdf.animate(this.animateTopForPdf("0dp"),this.getPlatformSpecific(), {"animationEnd":function(){
      this.view.pdfBrowser.requestURLConfig = {
        URL: "https://docs.google.com/gview?embedded=true&url=" + url,
        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
      };
    }.bind(this)});
  },
  /**
     *	@function closePdf
     * 	@description This  is to move the pdf container to down.
     * 	@private
     */
  closePdf:function(){
    this.view.flxPdf.animate(this.animateTopForPdf("100%"),this.getPlatformSpecific(), {"animationEnd":function(){
      this.view.flxPdf.zIndex=1;
      this.view.txtArea.setEnabled(false);
      this.view.flxPdf.isVisible=false;
    }.bind(this)});

  },
  /**
     *	@function animateTopForPdf
     * 	@description This returns the animationObject
     *	@param top {String} to where top value to be animated
     * 	@private
     */
  animateTopForPdf: function(top) {
    var animationObejct = kony.ui.createAnimation({
      100: {
        //"transformation": transformation,
        "top": top,
        "stepConfig": {}
      }
    });
    return animationObejct;
  },
  onClickOfFilter:function(text){
    var startDate=parseInt(text);
    var sessions;
    if(startDate==4){
      this.filterdSessions=this.fourthSessions;
    }
    else{
      sessions=this.fifthSessions;
    }
   this.filterSessionTiles(this.currentSelectedTab);   
  },
  onNavigate:function(naviInfo){
    this.navigateSessionId=null;
    if(kony.sdk.isNullOrUndefined(naviInfo)){
      this. showListPageDirectly();
      this.navigateSessionId=kony.store.getItem("currentNotificationId");
      if(this.navigateSessionId==-999999999){
        return;
      }
      kony.store.setItem("currentNotificationId",-999999999);
    }
    else if(!kony.sdk.isNullOrUndefined(naviInfo.transferCode) && naviInfo.transferCode===100){
      return;
    }
    else {
      this._previousForm=naviInfo.form;
      this.navigateSession=naviInfo.session;
      this.isNavigatedFrmOtherForm=true;
      this.showSessionDetailPageDirectly(this.navigateSession);
    }

  },
  navigateToOtherForm:function(){
    var param = {
      "form" : "frmPresenters"
    };
    (new kony.mvc.Navigation(this._previousForm)).navigate(param);
  },
  naviateToSessionDetail:function(session){
    var sessionId=this.navigateSessionId;
    var tiles=this.allSessionTiles;
    for(var index=0;index<tiles.length;index++){
      var tileObject=tiles[index];
      if(tileObject.sessionData.event_session_id== sessionId){
        this.view.contentScroller.scrollToWidget(this.view[tileObject.id]);
        this.view[tileObject.id].onClick(this.view[tileObject.id]);
      }
    }
  },
  showSessionDetailPageDirectly:function(eventObject){
    this.speakerIdMap = {};
    this.view.detailsScroller.isVisible=true;
    this.currentViewState=1;
    this.view.contentScroller.isVisible=false;
    this.view.sessionTileAnim.isVisible = true;
    this.view.sessionContentContainer.isVisible=true;
    this.view.feedbackMaster.isVisible=true;
    this.view.buttonBack.isVisible=true;
    this.view.buttonBack.opacity=100;
    this.view.buttonBack.left="2dp";
    this.view.buttonBack.top="3dp";
    this.view.buttonBack.width="58dp";
    this.view.buttonBack.height="47dp";
    this.view.menuMain.isVisible=true;
    this.view.addAgendaContainer.isVisible=true;
    this.view.addAgendaContainer.left="82.6%";
    this.view.addAgendaContainer.top="39dp";
    this.view.sessionLocation.isVisible=true;
    this.view.detailsScroller.left="0%";
    this.view.sessionTileAnim.addAgendaContainer.left = "82.6%";
    this.view.sessionTileAnim.addAgendaContainer.top = this.isIphoneXSeries?"85dp":"39dp";
    this.view.sessionTileAnim.tilebg.height =this.devHeight+"dp";
    this.view.sessionTileAnim.left = "0%";
    this.view.headerContainer.top=this.isIphoneXSeries ? "-206dp":"-131dp";
    this.view.sessionTileAnim.addAgendaContainer.opacity=100;
    this.view.sessionTileAnim.animationElements.isVisible=true;
    this.view.sessionTileAnim.quantumDotsBlur.isVisible=true;
    //this.view.sessionTileAnim.quantumDotsClear.left="-966dp";
    this.view.sessionTileAnim.sessionLocationIcon.opacity=0;
    this.view.sessionTileAnim.sessionTimeIcon.opacity=0;
    this.view.sessionTileAnim.top=this.isIphoneXSeries?"-45dp":"0dp";
    this.view.sessionContentContainer.top="28%";
    this.view.sessionTileAnim.tilebg.left="-16dp";
    this.view.sessionTileAnim.tilebg.right="-16dp";
    this. view.feedbackMaster.opacity=100;
    this. view.imageBack.opacity=100;
    this. view.addAgendaContainer.opacity=100;
    this. view.sessionLocation.opacity=100;
    this.view.sessionTileAnim.sessionTitle.left="24dp";
    this.view.sessionTileAnim.sessionTitle.top=this.isIphoneXSeries?"104dp":"59dp";
    this.view.sessionTileAnim.sessionLocation.left="60%";
    this.view.sessionTileAnim.quantumDotsClear.opacity=100;
    //     this.view.sessionTileAnim.sessionLocation.top="105dp";
    //     this.view.sessionLocation.top="105dp";
    this.view.sessionTileAnim.sessionLocation.top=this.isIphoneXSeries?"170dp":"125dp";
    this.view.sessionLocation.top="125dp";
    this.view.sessionLocation.left="60%";
    this.view.sessionTileAnim.sessionTime.left="24dp";
    //this.view.sessionTileAnim.sessionTime.top="105dp";
    this.view.sessionTileAnim.sessionTime.top=this.isIphoneXSeries?"170dp":"125dp"
    this.view.addAgendaContainer.isVisible=true;
    this.view.sessionLocation.isVisible=true;
    var scaledWidth=(parseInt(this.view.sessionTileAnim.tileBGImageKony.width)*1.47);
    var scaledHeight=(parseInt(this.view.sessionTileAnim.tileBGImageKony.height)*1.47);
    this.view.sessionTileAnim.tileBGImageKony.width=scaledWidth;
    this.view.sessionTileAnim.tileBGColorKony.height=scaledHeight;
    this.thisCard=eventObject;
    this.view.sessionTileAnim.tilebg.skin = eventObject.tilebg.skin;
    this.view.sessionTileAnim.addAgendaContainer.isVisible=true;
    this.view.sessionTileAnim.sessionTitle.text = eventObject.sessionData.session_name;
    this.view.sessionTileAnim.sessionTime.text = eventObject.sessionData.modifiedTime;
    this.view.CopyLabel0f74c659ce7754e.text = eventObject.sessionData.session_desc;
    this.view.sessionTileAnim.imgStatus.src =eventObject.imgStatus.src;
    this.view.addAgendaContainer.imgStatus.src = eventObject.imgStatus.src;
    this.view.sessionTileAnim.callback = eventObject.callback;
    this.view.sessionTileAnim.addAgendaContainer.onClick = this.addToMyScheduleInAnimTile.bind(this, eventObject);
    this.view.addAgendaContainer.onClick = this.addToMyScheduleInAnimTile.bind(this, eventObject);
    this.view.sessionTileAnim.addAgendaContainer.skin =eventObject.addAgendaContainer.skin;
    this.view.addAgendaContainer.skin =eventObject.addAgendaContainer.skin;
    var location= eventObject.sessionData.session_location;
    if(kony.sdk.isNullOrUndefined(location)){
      location="";
    }
    this.view.sessionTileAnim.sessionLocation.text = "<u>"+location+"</u>";
    this.view.sessionLocation.text = "<u>"+location+"</u>";
    this.view.sessionLocation.onTouchEnd=this.openFloorMap.bind(this,eventObject.sessionData);
    this.view.sessionTileAnim.tileBGImageKony.src = eventObject.tileBGImageKony.src;
    //     	var flxImageContainerwidthCalc = this.view.flxSpeaker0.frame.width * 1.1;
    // 		flxImageContainerwidthCalc = flxImageContainerwidthCalc.toFixed();
    //       	var imgHeight = flxImageContainerwidthCalc * 1.02;
    var sessionObject=eventObject.sessionData;
    this.dismissRatingIfSubmitted(sessionObject);
    this.currentSessionObjectInDetailScreen = sessionObject;
    this.setSessionAttachments(sessionObject);
    var speakerList = sessionObject["presenter"];
    if (kony.sdk.isNullOrUndefined(speakerList)) {
      this.view.CopyLabel0he0b8d5a22fc4f.isVisible = false;
      this.view.flxSpeaker0.isVisible = false;
      this.view.flxSpeaker1.isVisible = false;
      this.view.flxSpeaker2.isVisible = false;
      return;
    }
    this.ratingLength = 0;
    var presenters = [];
    var speakers_master = accelerateSpeakerData.eventSpeakerData.records;
    var speakerIndex;
    for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
      if(speakerList[speakerIndex].SoftDeleteFlag !== undefined && speakerList[speakerIndex].SoftDeleteFlag === true){
        continue;
      }else{
        presenters.push(speakerList[speakerIndex]);
      }
    }
    speakerList = presenters;
    for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
      this.ratingLength++;
      var speakerObject = speakerList[speakerIndex];
      for (var index = 0; index < speakers_master.length; index++) {
        if (speakerObject.master_speaker_id == speakers_master[index].speaker_id) {
          var speakerBio = speakers_master[index];
          this.speakerIdMap["flxSpeaker"+speakerIndex] = speakerObject.master_speaker_id;
          this.view["flxSpeaker"+speakerIndex].isVisible=true;
          this.view["speakerName" + speakerIndex].text = speakerBio.speaker_name;
          if(speakerBio.speaker_bio === undefined) {
            speakerBio.speaker_bio = "";
          }
          var title = speakerBio.speaker_title.length > 20 ? speakerBio.speaker_title.substring(0, 16) + "..." : speakerBio.speaker_title;
          this.view["speakerDesignation" + speakerIndex].text = title;
          var description = speakerBio.speaker_bio.length > 50 ? speakerBio.speaker_bio.substring(0, 47) + "..." : speakerBio.speaker_bio;
          this.view["speakerDescription" + speakerIndex].text = description;
          this.view["ratingTile" + speakerIndex].setSpeakerProfileInRating(speakerBio);
          this.view["ratingTile" + speakerIndex].resetAllSkins();
          this.view["flxSpeaker"+speakerIndex].onClick = function(eventobject) {
            this.onClickOfSpeaker(this.speakerIdMap[eventobject.id]);
          }.bind(this);
          //                     if(flxImageContainerwidthCalc>0 && imgHeight>0){
          //                       this.view["imgSpeaker" + speakerIndex].width = flxImageContainerwidthCalc + "dp";
          // 					  this.view["imgSpeaker" + speakerIndex].height = imgHeight + "dp";
          //                     }
          this.view["imgSpeaker" + speakerIndex].src = speakerBio.speaker_profile_pic;
        }
      }
    }
    for (speakerIndex; speakerIndex < 3; speakerIndex++) {
      this.view["flxSpeaker" + speakerIndex].isVisible = false;
      this.view["ratingTile" + speakerIndex].isVisible = false;
    }
    this.view["ratingTile"].resetAllSkins();
    this.setSessionAttachments(sessionObject);

  },
  showListPageDirectly:function(){
    this.view.sessionTileAnim.quantumDotsClear.opacity=0;
    this.view.contentScroller.width="100%";
    this.view.contentScroller.left="0dp";
    this.view.contentScroller.top="0dp";
    this.view.contentScroller.isVisible=true;
    this.view.headerContainer.isVisible=true;
    this.view.headerContainer.left="0dp";
    this.view.headerContainer.opacity=100;
    this.view.headerContainer.top=this.isIphoneXSeries ? "-45dp":"0dp";
    this.view.headerContainer.width="100%";
    this.view.headerContainer.height=this.isIphoneXSeries ?"176dp":"131dp";
    this.view.detailsScroller.left="100%";
    this.view.detailsScroller.top="0%";
    this.view.detailsScroller.width="100%";
    this.view.detailsScroller.bottom="60dp";
    this.view.sessionTileAnim.isVisible = false;
    this.view.imageBack.left="15dp";
    this.view.imageBack.top="16dp";
    this.view.imageBack.width="24dp";
    this.view.imageBack.height="20dp";
    this.view.imageBack.opacity=0;
    this.view.buttonBack.left="2dp";
    this.view.buttonBack.top="3dp";
    this.view.buttonBack.width="58dp";
    this.view.buttonBack.height="47dp";
    this.view.buttonBack.isVisible=false;
    this.view.buttonBack.opacity=100;
    this.view.menuMain.left="0dp";
    this.view.menuMain.bottom="0dp";
    this.view.menuMain.width="100%";
    this.view.menuMain.height=this.isIphoneXSeries ?"105dp":"60dp";
    this.view.menuMain.isVisible=true;
    this.view.addAgendaContainer.left="82.6%";
    this.view.addAgendaContainer.top="39dp";
    this.view.addAgendaContainer.width="43dp";
    this.view.addAgendaContainer.height="43dp";
    this.view.sessionLocation.left="60%";
    //this.view.sessionLocation.top="105dp"; 
    this.view.sessionLocation.top="125dp"; 
    this.view.sessionLocation.zIndex=200;
    this.view.sessionLocation.isVisible=false;
    this.view.sessionTileAnim.left="100%";
    this.view.sessionTileAnim.top="-40dp";
    this.view.sessionTileAnim.width="100%";
    this.view.sessionTileAnim.height="152dp";
    this.view.sessionTileAnim.tilebg.height="130dp";
    this.view.sessionTileAnim.tilebg.left="20dp";
    this.view.sessionTileAnim.tilebg.top="0dp";
    this.view.forceLayout();
    this.view.addAgendaContainer.isVisible=false;
    this.view.sessionContentContainer.top="100%";
    if(kony.sdk.isNullOrUndefined(this.normalWidth)){
      this.normalWidth= this.view.sessionTileAnim.tileBGImageKony.width;
      this.normalHeight=this.view.sessionTileAnim.tileBGImageKony.height;
    }
    else{
      this.view.sessionTileAnim.tileBGImageKony.width= this.normalWidth;
      this.view.sessionTileAnim.tileBGImageKony.height= this.normalHeight;
    }
  }

});
