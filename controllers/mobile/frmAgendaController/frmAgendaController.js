define({
    devHeight: null,
    thisCard: null,
    thisCardIndex: null,
    cardFrameRel: null,
  	currentViewState:0,
    /**
     * @function frmAgendaPreshow
     * @description The function is invoked in the form preshow action which is used to setup the UI
     * @private
     */
    frmAgendaPreshow: function() {
        var self = this;
        this.view.menuMain.menuContainerAgenda.menuLabelAgenda.skin = "menuLabelSkinActive";
        //this.setData(accelerateSessionData.eventSessionData.records);
        //this.addActionToSessionTiles();
        this.view.referenceAgenda.isVisible = false;
        this.view.referenceSession.isVisible = false;
        this.view.postShow = this.frmAgendaPostshow;
        this.view.sessionContentContainer.top = "100%";
      	this.view.sessionTileAnim.left="100%";
        this.view.buttonBack.isVisible = false;
        this.view.imageBack.opacity = 0;
        this.view.buttonBack.onClick = this.frmAgendaSessionClose;
        this.view.detailsScroller.onScrolling = this.detailsScrollerOnScrolling;
      	this.view.sessionTileAnim.animationElements.opacity=0;
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
      	this.currentViewState=1;
        this.setSpeakerProfile(eventobject);
        egLoggerClear();
        var self = this;
        this.thisCard = eventobject;
        egLogger("this.thisCard = " + this.thisCard.id);
        this.view.detailsScroller.left = "0%";
        this.view.sessionTileAnim.tilebg.skin = this.thisCard.tilebg.skin;
        this.view.sessionTileAnim.sessionTitle.text = this.thisCard.sessionTitle.text;
        this.view.sessionTileAnim.sessionTime.text = this.thisCard.sessionTime.text;
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
      	this.view.sessionLocation.onTouchEnd=this.openFloorMap.bind(this,this.view[eventobject.id]. sessionData);
        this.view.sessionTileAnim.tileBGImageKony.src = this.thisCard.tileBGImageKony.src;
        var cardFrame = this.thisCard.frame.y;
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
                    top: "-131dp",
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
                    self.view.sessionTileAnim.addAgendaContainer.top = "39dp";

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
      	this.view.sessionTileAnim.animationElements.animate(
           kony.ui.createAnimation({
               //0:{left:0,"stepConfig":{}},
               100: {
                   opacity: 1,
                   "stepConfig": {}
               }
           }), {
               delay: animDuration,
               iterationCount:1,
               fillMode: kony.anim.FILL_MODE_FORWARDS,
               duration: animDuration
           }, {
               animationEnd: function() {}
           });
     this.view.sessionTileAnim.quantumDotsBlur.animate(
                     kony.ui.createAnimation({
                         //0:{left:0,"stepConfig":{}},
                         100: {
                             left: "-1465dp",
                             "stepConfig": {"timingFunction": kony.anim.LINEAR}
                         }
                     }), {
                         delay: 0,
                         iterationCount:0,
                         fillMode: kony.anim.FILL_MODE_FORWARDS,
                         duration: 90
                     }, {
                         animationEnd: function() {}
                     });
       this.view.sessionTileAnim.quantumDotsClear.animate(
                     kony.ui.createAnimation({
                         //0:{left:0,"stepConfig":{}},
                         100: {
                             left: "-966dp",
                             "stepConfig": {"timingFunction": kony.anim.LINEAR}
                         }
                     }), {
                         delay: 0,
                         iterationCount:0,
                         fillMode: kony.anim.FILL_MODE_FORWARDS,
                         duration: 40
                     }, {
                         animationEnd: function() {}
                     });

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
                            duration: animDuration * 0.5
                        }, {
                            animationEnd: function() {}
                        });
        this.view.sessionTileAnim.animate(
            kony.ui.createAnimation({
                50: {
                    height: "152dp",
                    "stepConfig": {}
                },
                100: {
                    top: "0",
                    height: this.devHeight,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: animDuration
            }, {
                animationEnd: function() {}
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
                                self.view.buttonBack.isVisible = true;
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
                                self.view.buttonBack.isVisible = true;
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
                                self.view.buttonBack.isVisible = true;
                            }
                        });

                }
            });
        this.view.sessionTileAnim.sessionTitle.animate(
            kony.ui.createAnimation({
                //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
                100: {
                    left: "24dp",
                    top: "59dp",
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
                    top: "105dp",
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
                    top: "105dp",
                    "stepConfig": {}
                }
            }), {
                delay: animHalf,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: animDuration
            }, {
                animationEnd: function() {
                   this.view.addAgendaContainer.isVisible=true;
                  this.view.sessionLocation.isVisible=true;
                }.bind(this)
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
                }.bind(this)
            });
    },
	openFloorMap:function(session){
      if(kony.sdk.isNullOrUndefined(session.event_inner_location)){
        return ;
      }
      var floormap=session.event_inner_location;
      if(!kony.sdk.isNullOrUndefined(floormap) && floormap.length>0){
      this.view.flxPdf.zIndex=300;
      var url=floormap[0].inner_location;
      var heading=floormap[0].text;
      this.view.flxPdf.mobileheader.headerTitle=heading;
      	this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
      	this.view.flxPdf.animate(this.animateTopForPdf("0dp"),this.getPlatformSpecific(), {"animationEnd":function(){
        this.view.pdfBrowser.requestURLConfig = {
            URL: "https://docs.google.com/gview?embedded=true&url=" + url,
            requestMethod: constants.BROWSER_REQUEST_METHOD_GET
        };
        }.bind(this)});
      }
    },
    /**
     * @function frmAgendaSessionClose
     * @description The function is used to invoke the action on the click of the close button of the session tile
     * @private
     */
    frmAgendaSessionClose: function() {
      	//this.setData(accelerateSessionData.eventSessionData.records);
      	if(this.isNavigatedFrmOtherForm){
          this.isNavigatedFrmOtherForm=false;
          this.navigateToOtherForm();
        }
        var self = this;
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
                    top: "0dp",
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
                    self.view.buttonBack.isVisible = true;
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
                    self.view.buttonBack.isVisible = true;
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
                    self.view.buttonBack.isVisible = true;
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
                animationEnd: function() {}
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
            self.view.sessionTileAnim.top = scrollPosY * -0.3;
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
            leftPos = "0%";
            buttonText = "ALL";
            targetSkin = "filterSkinAll";
            destColor = "1F232900";
            sessionTrack = eventConstants.KEYNOTE;
        } else if (eventobject.id == "filterDBX") {
            leftPos = "33.33%";
            buttonText = "DBX";
            targetSkin = "filterSkinDBX";
            destColor = "4B3A6600";
            sessionTrack = eventConstants.DBX;
        } else {
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
        this.filterSessionTiles(sessionTrack);
    },

    /**
     *	@function setData
     * 	@description This function is used to create the session tile at run time and add it to the view
     *	@param sessions {Object} - list of all sessions from the backend
     * 	@private
     */
    setData: function(sessions) {
        this.view.sessionTiles.removeAll();
      	this.filteredSession=[];
      	this.allSessionTiles=[];
        this.sessionsList = sessions;
      	this.checkIfSessionsAreMyScheduled(sessions);
        var sessionCount = sessions.length;
        for (var index = 0; index < sessionCount; index++) {
            var id = eventConstants.SESSION_TILE_ID + index;
            var sessionObj = sessions[index];
            var sessionTile;
            if (index === 0) {
              	if(sessionObj.session_track_id==4){
                  var duration=this.findTimeDifference(sessionObj.session_start_date,sessionObj.session_end_date);
                  var breakTile=this.createBreakSession(id,"142dp","50dp",duration+" "+"BREAK");
                  breakTile.sessionTrackId=4;
                  this.view.sessionTiles.add(breakTile);
                  continue;
                }
              else{
                sessionTile = this.createSessionTile(id, "131dp");
              }
            } else {
              	if(sessionObj.session_track_id==4){
                  var duration=this.findTimeDifference(sessionObj.session_start_date,sessionObj.session_end_date);
                  var breakTile=this.createBreakSession(id,"0dp","50dp",duration+" BREAK");
                  breakTile.sessionTrackId=4;
                  this.view.sessionTiles.add(breakTile);
                  continue;
                }
              else{
                sessionTile = this.createSessionTile(id, "0dp");
              }
                
            }
            this.view.sessionTiles.add(sessionTile);
          	this.filteredSession.push(sessionTile);
          	this.allSessionTiles.push(sessionTile);
            this.view[id].setTitleData(sessionObj);
            this.view[id].callback = this.mySchedular;
            if (!kony.sdk.isNullOrUndefined(sessionObj.presenter)) {
                this.view[id].onClick = this.frmAgendaSessionSelect.bind(this);
            }
        }
        this.view.sessionTileAnim.callback = this.mySchedular;
      	if(!kony.sdk.isNullOrUndefined(this._previousForm) && !kony.sdk.isNullOrUndefined(this. navigateSessionId)){
          this.naviateToSessionDetail();
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
        this.view.imgThanks.isVisible = false;
        this.view.lblThankyou.isVisible = false;
        var id = eventObject.id;
        var len = id.length;
        var startIndex = eventConstants.SESSION_TILE_ID.length;
        var sessionIndex = id.substring(startIndex, len);
        var sessionObject = this.sessionsList[sessionIndex];
      	this.dismissRatingIfSubmitted(sessionObject);
        this.currentSessionObjectInDetailScreen = sessionObject;
//         if (!kony.sdk.isNullOrUndefined(sessionObject.feedBackSubmit) && sessionObject.feedBackSubmit) {
//             this.dismissRatingTiles();
//         } else {
//             this.view.flxRatingContainer.height = kony.flex.USE_PREFERRED_SIZE;
//         }
        this.setSessionAttachments(sessionObject);
        var speakerList = sessionObject["presenter"];
        this.ratingLength = speakerList.length;
        var speakers_master = accelerateSpeakerData.eventSpeakerData.records;
        if (kony.sdk.isNullOrUndefined(speakerList)) {
            this.view.CopyLabel0he0b8d5a22fc4f.isVisible = false;
            this.view.flxSpeaker0.isVisible = false;
            this.view.flxSpeaker1.isVisible = false;
            this.view.flxSpeaker2.isVisible = false;
            return;
        }
        var speakerIndex;
        for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
            var speakerObject = speakerList[speakerIndex];
            //var widthImageWidth = kony.os.deviceInfo().screenWidth - 72;
            for (var index = 0; index < speakers_master.length; index++) {
                if (speakerObject.master_speaker_id == speakers_master[index].speaker_id) {
                    var speakerBio = speakers_master[index];
                    this.view["speakerName" + speakerIndex].text = speakerBio.speaker_name;
                    var title = speakerBio.speaker_title.length > 20 ? speakerBio.speaker_title.substring(0, 16) + "..." : speakerBio.speaker_title;
                    this.view["speakerDesignation" + speakerIndex].text = title;
                    var description = speakerBio.speaker_bio.length > 50 ? speakerBio.speaker_bio.substring(0, 47) + "..." : speakerBio.speaker_bio;
                    this.view["speakerDescription" + speakerIndex].text = description;
                    this.view["imgSpeaker" + speakerIndex].src = speakerBio.speaker_profile_pic;
                    this.view["ratingTile" + speakerIndex].setSpeakerProfileInRating(speakerBio);
                    this.view["ratingTile" + speakerIndex].setDefaultSelectedIndex();
                  	this.view["flxSpeaker"+speakerIndex].speakerInfo=speakerBio;
                  	this.view["flxSpeaker"+speakerIndex].onClick=this.onClickOfSpeaker.bind(this);
                    //this.view["imgSpeaker"+speakerIndex].width = widthImageWidth+"dp";
                    //this.view["imgSpeaker"+speakerIndex].height = (widthImageWidth * eventConstants.ASPECT_RATION_CONSTANT)+"dp";

                }
            }
        }
        for (speakerIndex; speakerIndex < 3; speakerIndex++) {
            this.view["flxSpeaker" + speakerIndex].isVisible = false;
            this.view["ratingTile" + speakerIndex].isVisible = false;
        }
        this.view["ratingTile"].setDefaultSelectedIndex();
    },
  onClickOfSpeaker:function(eventObject){
    var naviInfo={
      "form":this.view.id,
      "speakerId":eventObject.speakerInfo.speaker_id,
    };
    var navigateObj=new kony.mvc.Navigation("frmPresenters");
    navigateObj.navigate(naviInfo);
    
  },
  dismissRatingIfSubmitted:function(sessionObject){
    var feedbackSubmittedSessions=kony.store.getItem("feedbackstore");
    if(kony.sdk.isNullOrUndefined(feedbackSubmittedSessions)){
      return;
    }
    if(feedbackSubmittedSessions.hasOwnProperty(sessionObject.event_session_id)){
      this.dismissRatingTiles();
    }
    else{
      this.view.flxRatingContainer.height = kony.flex.USE_PREFERRED_SIZE;
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
      	this.onClickOfFilter(buttonText);
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
    },
    /**
     *	@function filterSessionTiles
     * 	@description This function is used to toggle the Visibility based on the category choosen
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
    filterSessionTiles: function(sessionTrackId) {
      	this.filteredSession=[];
        var isFirstTile = false;
        var sessionCount = this.sessionsList.length;
        for (var index = 0; index < sessionCount; index++) {
            var id = eventConstants.SESSION_TILE_ID + index;
            if (sessionTrackId === eventConstants.KEYNOTE) {
                this.view[id].isVisible = true;
              	this.filteredSession.push(this.view[id]);
                if (!isFirstTile) {
                    this.view[id].top = "131dp";
                    isFirstTile = true;
                    continue;
                }
                this.view[id].top = "0dp";
            } else if (this.view[id].sessionTrackId !== sessionTrackId) {
                this.view[id].isVisible = false;
            } else {
                this.view[id].isVisible = true;
              	this.filteredSession.push(this.view[id]);
                if (!isFirstTile) {
                    this.view[id].top = "131dp";
                    isFirstTile = true;
                    continue;
                }
                this.view[id].top = "0dp";
            }
        }
    },
    /**
     *	@function filterSessionTiles
     * 	@description This function is used to toggle the Visibility based on the category choosen
     *	@param sessionTrackId {Integer} sessiontrack which is choosen by the user.
     * 	@private
     */
    onClickOfSubmit: function() {
        var batch = [];
        var record;
        for (var index = 0; index < this.ratingLength; index++) {
            record = {};
            record.speaker_id = this.view["ratingTile" + index].speakerId;
            record.rating = this.view["ratingTile" + index].selectedIndex;
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
        if (kony.sdk.isNullOrUndefined(materials)) {
            this.view.lblPresentation.isVisible = false;
            return;
        }
        var materailsCount = materials.length;
        if (materailsCount <= 0) {
            this.view.lblPresentation.isVisible = false;
            return;
        }
        var flexInstance, materialInstance;
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
        addAgendaButton.imgStatus.src = tileObject.myScheduleIndicatorImage;
        addAgendaButton.skin = tileObject.agendaContainerSkin;
      	this.view.sessionTileAnim.addAgendaContainer.skin=tileObject.agendaContainerSkin;
      	this.view.sessionTileAnim.imgStatus.src=tileObject.myScheduleIndicatorImage;
        tileObject.sessionToMySchedule();
    },
    /**
     *	@function onClickOfPDF
     * 	@description This function is to open pdf
     *	@param floorMapURL {url} url of the pdf
     * 	@private
     */
    onClickOfPDF: function(eventObject) {
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
    var sessions= this.filteredSession;
    var len=sessions.length;
    var found=false;
    var index;
    for(index=0;index<len;index++){
      if(new Date(sessions[index].startDate).getDate()==startDate){
        found=true;
        break;
      }
    }
    if(found){
      this.view.contentScroller.scrollToWidget(sessions[index],true);
    }
    else{
      this.view.contentScroller.scrollToEnd();
    }
  },
  onNavigate:function(naviInfo){
    this.navigateSessionId=null;
    if(kony.sdk.isNullOrUndefined(naviInfo)){
       this.navigateSessionId=kony.store.getItem("currentNotificationId");
       if(this.navigateSessionId==-999999999){
         return;
       }
      kony.store.setItem("currentNotificationId",-999999999);
    }
    else{
       this._previousForm=naviInfo.form;
        this.navigateSessionId=naviInfo.session_id;
        this.isNavigatedFrmOtherForm=true;
    }
    
  },
  navigateToOtherForm:function(){
    (new kony.mvc.Navigation(this._previousForm)).navigate();
  },
  naviateToSessionDetail:function(){
    var sessionId=this.navigateSessionId;
    var tiles=this.allSessionTiles;
       for(var index=0;index<tiles.length;index++){
         var tileObject=tiles[index];
         if(tileObject.sessionData.event_session_id== sessionId){
           this.view.contentScroller.scrollToWidget(this.view[tileObject.id]);
           this.view[tileObject.id].onClick(this.view[tileObject.id]);
         }
       }
  }
  
});
