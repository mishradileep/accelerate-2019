define({
    devHeight: null,
    thisCard: null,
    thisCardIndex: null,
    cardFrameRel: null,
    currentViewState: 0,
    myScheduleSession: [],
    isNotchSet: false,
  	currentActiveDate :4,

    formInit: function() {
        this.isIphoneXSeries = checkForIphoneXSeries();
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
        let currentActiveDate = kony.store.getItem("currentActiveDate");
        if (currentActiveDate === null || currentActiveDate === undefined) {
            kony.store.setItem("currentActiveDate", 4);
        }
        if (this.isIphoneXSeries && !this.isNotchSet) {
            this.view.headerContainer.top = "-45dp";
            this.view.headerContainer.height = "125dp";
            this.view.agendaTitle.top = parseInt(this.view.agendaTitle.top) + 45 + "dp";
            this.view.buttonDay1.top = parseInt(this.view.buttonDay1.top) + 45 + "dp";
            this.view.buttonDay2.top = parseInt(this.view.buttonDay2.top) + 45 + "dp";
            //this.view.filterSlider.top=parseInt(this.view.filterSlider.top)+45+"dp";
            this.isNotchSet = !this.isNotchSet;
            this.view.menuMain.bottom = "0dp";
            this.view.menuMain.height = "105dp";
        }
        this.view.lblNoEvents.isVisible = false;
        this.view.menuMain.menuContainerMySchedule.menuLabelMySchedule.skin = "menuLabelSkinActive";
        this.view.referenceAgenda.isVisible = false;
        this.view.referenceSession.isVisible = false;
        this.view.postShow = this.frmAgendaPostshow;
        this.view.sessionContentContainer.top = "100%";
        this.view.sessionTileAnim.left = "100%";
        this.view.buttonBack.isVisible = false;
        this.view.imageBack.opacity = 0;
        this.view.buttonBack.onClick = this.frmAgendaSessionClose;
        this.view.detailsScroller.onScrolling = this.detailsScrollerOnScrolling;
        this.view.sessionTileAnim.quantumDotsClear.opacity = 0;
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
        this.changeButtonSkins("4TH SEP");
      	this.checkSessionsForSelectedDate(accelerateSessionData.eventSessionData.records);
        this.setData(accelerateSessionData.eventSessionData.records);
        this.devHeight = this.view.masterContainer.frame.height;
        egLogger("devHeight = " + this.devHeight);
        var dotsblurwidth = this.view.sessionTileAnim.quantumDotsBlur.frame.height * 10.7388 + "dp";
      	
        // add scrollToWidget functionality with the session id availble at kony store key 'currentNotificationId'
    },
  	
  	 checkSessionsForSelectedDate : function(sessions){
       let activeDate = this.currentActiveDate;
       this.checkIfSessionsAreMyScheduled(sessions);
       let isDateSessionFound = false;
       for(let index = 0 ; index < sessions.length ; index++){
         let sessionObject = sessions[index];
         let currentDate = this.getCurrentDateInteger(sessionObject.session_start_date);
         if(currentDate === activeDate && sessionObject.isAddedToMySchedule){
           isDateSessionFound = true;
           break;
         }
       }
       if(isDateSessionFound){
         this.view.lblNoEvents.isVisible = false;
       }else{
         this.view.lblNoEvents.isVisible = true;
       }
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
        this.view.txtArea.setEnabled(true);
        this.view.detailsScroller.isVisible = true;
        this.currentViewState = 1;
        this.setSpeakerProfile(eventobject);
        egLoggerClear();
        var self = this;
        this.thisCard = eventobject;
        egLogger("this.thisCard = " + this.thisCard.id);
        this.view.detailsScroller.left = "0%";
        this.view.sessionTileAnim.tilebg.skin = this.thisCard.tilebg.skin;
        var thisBGSkin = this.thisCard.tilebg.skin.replace("agendaTileSkin", "");
        if (thisBGSkin == "Quantum") {
            self.view.sessionTileAnim.gradientOverlay.skin = "gradientOverlayQuantum";
        } else if (thisBGSkin == "DBX") {
            self.view.sessionTileAnim.gradientOverlay.skin = "gradientOverlayDBX";
        } else {
            self.view.sessionTileAnim.gradientOverlay.skin = "gradientOverlayKony";
        }
        this.view.sessionTileAnim.sessionTitle.text = this.thisCard.sessionTitle.text;
        this.view.sessionTileAnim.sessionTime.text = this.thisCard.sessionTime.text;
        var desc = this.view[eventobject.id].sessionData.session_desc;
        if (!kony.sdk.isNullOrUndefined(desc) && desc.length > 0) {
            this.view.CopyLabel0f74c659ce7754e.isVisible = true;
            this.view.Label0c15d6a3069eb44.isVisible = true;
            this.view.CopyLabel0f74c659ce7754e.text = desc;
        } else {
            this.view.CopyLabel0f74c659ce7754e.isVisible = false;
            this.view.Label0c15d6a3069eb44.isVisible = false;
            if (kony.sdk.isNullOrUndefined(this.view[eventobject.id].sessionData.presenter) & kony.sdk.isNullOrUndefined(this.view[eventobject.id].sessionData.session_material)) {
                this.view.detailsScroller.isVisible = false;
            } else {
                this.view.detailsScroller.isVisible = true;
            }
        }
        this.view.sessionTileAnim.imgStatus.src = this.view[eventobject.id].imgStatus.src;
        this.view.addAgendaContainer.imgStatus.src = this.view[eventobject.id].imgStatus.src;
        this.view.sessionTileAnim.callback = this.view[eventobject.id].callback;
        this.view.sessionTileAnim.addAgendaContainer.onClick = this.addToMyScheduleInAnimTile.bind(this, this.view[eventobject.id]);
        this.view.addAgendaContainer.onClick = this.frmAgendaSessionClose.bind(this, this.view[eventobject.id].deleteSessionFromMyAgenda);
        this.view.sessionTileAnim.addAgendaContainer.skin = this.view[eventobject.id].addAgendaContainer.skin;
        this.view.addAgendaContainer.skin = this.view[eventobject.id].addAgendaContainer.skin;
        this.view.sessionTileAnim.sessionLocation.text = this.thisCard.sessionLocation.text;
        this.view.sessionTileAnim.tileBGImageKony.src = this.thisCard.tileBGImageKony.src;
        this.view.sessionLocation.text = "<u>" + this.thisCard.sessionLocation.text + "</u>";
        this.view.sessionLocation.onTouchEnd = this.openFloorMap.bind(this, this.view[eventobject.id].sessionData);
        var cardFrame = this.thisCard.frame.y;
        this.sessionTileAnimBindedSession = this.view[eventobject.id].sessionData;
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
                    top: this.isIphoneXSeries ? "-206dp" : "-131dp",
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
                    self.view.sessionTileAnim.addAgendaContainer.top = self.isIphoneXSeries ? "85dp" : "39dp";

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
        /* this.view.sessionTileAnim.animationElements.animate(
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
	*/
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
                animationEnd: function() {}
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
                    top: this.isIphoneXSeries ? "-45dp" : "0",
                    height: this.isIphoneXSeries ? this.devHeight + 40 : this.devHeight,
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
                delay: animHalf * 0.65,
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
                    top: this.isIphoneXSeries ? "104dp" : "59dp",
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
                    top: self.isIphoneXSeries ? "170dp" : "125dp",
                    //top: "105dp",
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
                    top: this.isIphoneXSeries ? "170dp" : "125dp",
                    //top: "105dp",
                    "stepConfig": {}
                }
            }), {
                delay: animHalf,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: animDuration
            }, {
                animationEnd: function() {
                    this.view.addAgendaContainer.isVisible = true;
                    if (this.isIphoneXSeries) {
                        this.view.sessionLocation.top = "125dp";
                        this.view.addAgendaContainer.top = "39dp";
                    }
                    this.view.sessionLocation.isVisible = true;
                    this.view.sessionTileAnim.sessionTitle.text = this.view[eventobject.id].sessionData.session_name;
                }.bind(this)
            });
        this.view.sessionTileAnim.quantumDotsClear.animate(
            kony.ui.createAnimation({
                0: {
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
                    this.view.addAgendaContainer.isVisible = true;
                    this.view.sessionLocation.isVisible = true;
                }.bind(this)
            });
    },
    openFloorMap: function(session) {
        if (kony.sdk.isNullOrUndefined(session.room_no) || session.room_no.length <= 0) {
            return;
        }
        var floormap = session.room_no;
        var heading = session.session_location;
        if (!kony.sdk.isNullOrUndefined(floormap) && floormap.length > 0) {
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
        }
    },

    /**
     * @function frmAgendaSessionClose
     * @description The function is used to invoke the action on the click of the close button of the session tile
     * @private
     */
    frmAgendaSessionClose: function(callback) {
        //this.setData(accelerateSessionData.eventSessionData.records);
        this.view.txtArea.setEnabled(false);
        this.view.txtArea.text = "";
        this.currentViewState = 0;
        var self = this;
        this.view.sessionTileAnim.sessionTitle.text = this.sessionTileAnimBindedSession.shortTitle;
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
                    top: this.isIphoneXSeries ? "-45dp" : "0dp",
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
        this.view.sessionTileAnim.quantumDotsClear.animate(
            kony.ui.createAnimation({
                0: {
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
        this.view.sessionTileAnim.sessionTime.animate(
            kony.ui.createAnimation({
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
                    if (!kony.sdk.isNullOrUndefined(callback) && typeof(callback) == "function") {
                        callback();
                    }

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
            self.view.sessionTileAnim.top = scrollPosY * -0.3;
            var opacity = (1 - (scrollPosY * 0.01));
            self.view.imageBack.opacity = opacity;
            if (opacity >= 1) {
                self.view.addAgendaContainer.isVisible = true;
                self.view.sessionLocation.isVisible = true;
            } else {
                self.view.addAgendaContainer.isVisible = false;
                self.view.sessionLocation.isVisible = false;
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
            this.currentSelectedTab = 0;
            leftPos = "0%";
            buttonText = "ALL";
            targetSkin = "filterSkinAll";
            destColor = "1F232900";
            sessionTrack = eventConstants.KEYNOTE;
        } else if (eventobject.id == "filterDBX") {
            this.currentSelectedTab = 1;
            leftPos = "33.33%";
            buttonText = "DBX";
            targetSkin = "filterSkinDBX";
            destColor = "4B3A6600";
            sessionTrack = eventConstants.DBX;
        } else {
            this.currentSelectedTab = 2;
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
        this.view.sessionTiles.isVisible = true;
        this.myScheduleSession = [];
      	this.sortSessionsByDate(sessions);
        var isFirstTile = true;
        this.view.sessionTiles.removeAll();
        this.filteredSession = [];
        this.allSessionTiles = [];
        this.sessionsList = sessions;
        this.checkIfSessionsAreMyScheduled(sessions);
        var sessionCount = sessions.length;
        for (var index = 0; index < sessionCount; index++) {
            var id = eventConstants.SESSION_TILE_ID + index;
            var sessionObj = sessions[index];
            if (!sessionObj.isAddedToMySchedule) {
                continue;
            }
            var sessionTile;
            if (isFirstTile) {
                sessionTile = this.createSessionTile(id, "80dp");
                isFirstTile = false;
            } else {
                sessionTile = this.createSessionTile(id, "0dp");
            }
            sessionTile.setTitleData(sessionObj);
             var currentDate = this.getCurrentDateInteger(sessionTile.startDate);
            if (currentDate !== this.currentActiveDate) {
                sessionTile.isVisible = false;
            }
            this.allSessionTiles.push(sessionTile);
            this.view.sessionTiles.add(sessionTile);
            this.filteredSession.push(sessionTile);
            this.view[id].setTitleData(sessionObj);
            this.view[id].setDeleteButtonValues();
            this.myScheduleSession.push(sessionTile);
            this.view[id].deleteCallback = this.resetData.bind(this);
            this.view[id].onClick = this.frmAgendaSessionSelect.bind(this);
        }
        if (this.myScheduleSession.length <= 0)
            this.view.lblNoEvents.isVisible = true;
        this.view.sessionTileAnim.callback = this.mySchedular;
        this.view.forceLayout();
    },
  
  sortSessionsByDate:function(sessionData){
    if(sessionData !== null && sessionData !== undefined && sessionData.length >= 2){
      sessionData.sort((a,b) => 
                       new Date(a.session_start_date).getTime() - new Date(b.session_start_date).getTime());
    }
  },
  
  	 getCurrentDateInteger : function(dateObject){
        var splitCharecter = "T";
        splitCharecter = (dateObject.indexOf("T") > 0) ? "T" : "";
        var splittedDate = dateObject.split(splitCharecter)[0];
        var dateInteger = splittedDate.split("-")[2];
        return parseInt(dateInteger);
    },
    /**
     *	@function checkIfSessionsAreMyScheduled
     * 	@description This is update the session object if it is already added to myschedule
     *	@param sessions {Object} - list of sessions
     * 	@private
     */

    toggleVisibility: function() {
        var sessions = this.allSessionTiles;
    },
    checkIfSessionsAreMyScheduled: function(sessions) {
        var myScheduledSession = kony.store.getItem("myAgendaData");
        if (kony.sdk.isNullOrUndefined(myScheduledSession)) {
            return;
        }
        for (var index = 0; index < sessions.length; index++) {
            var session_id = sessions[index].event_session_id;
            if (!kony.sdk.isNullOrUndefined(session_id) && myScheduledSession.hasOwnProperty(session_id)) {
                sessions[index].isAddedToMySchedule = true;
            }
        }
    },
    resetData: function(id) {
        this.view.lblNoEvents.isVisible = false;
        var sessions = this.myScheduleSession;
        var len = sessions.length;
        var index;
        this.view[id].sessionData.isAddedToMySchedule = false;
        this.view[id].isAddedToMySchedule = false;
        this.view[id].isVisible = false;
        var children = this.view.sessionTiles.widgets();
        var childrenCount = children.length;
        if (childrenCount <= 0) {
            return;
        }
        if (children[0].id == id && childrenCount > 1) {
            this.view.sessionTiles.remove(this.view[id]);
            children[1].top = "80dp";
        } else {
            this.view.sessionTiles.remove(this.view[id]);
        }
        var children = this.view.sessionTiles.widgets();
        var len = children.length;
        for (index = 0; index < len; index++) {
            if (children[index].isVisible) {
                break;
            }
        }
        if (index == len) {
            this.view.lblNoEvents.isVisible = true;
        }
        this.filteredSession = this.view.sessionTiles.widgets();
        this.view.forceLayout();
    },

    checkIfSessionsArePresentForSelectedDate: function() {
        let mSessionsList = this.sessionsList;
        let currentActiveDate = kony.store.getItem("currentActiveDate");
        let selectedSessions = kony.store.getItem("myAgendaData");
        let count = 0;
        for (let index = 0; index < selectedSessions.length; index++) {
            let currentSessionId = selectedSessions[index];
            for (let sessionIndex = 0; sessionIndex < mSessionsList.length; sessionIndex++) {
                let currentSessionObject = mSessionsList[sessionIndex];
                let sessionId = currentSessionObject.event_session_id;
                if (sessionId == currentSessionId) {
                    let sessionDate = new Date(currentSessionObject.session_start_date).getDate();
                    if (sessionDate == currentActiveDate) {
                        count++;
                        break;
                    }
                }
            }
        }
        if (count === 0) {
            this.view.sessionTiles.isVisible = false;
            this.view.lblNoEvents.isVisible = true;
        } else {
            this.view.sessionTiles.isVisible = true;
            this.view.lblNoEvents.isVisible = false;
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
        var speakers_master = accelerateSpeakerData.eventSpeakerData.records;
        var speakerIndex;
        var presenters = [];
        for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
            if (speakerList[speakerIndex].SoftDeleteFlag !== undefined && speakerList[speakerIndex].SoftDeleteFlag === true) {
                continue;
            } else {
                presenters.push(speakerList[speakerIndex]);
            }
        }
        speakerList = presenters;
        for (speakerIndex = 0; speakerIndex < speakerList.length; speakerIndex++) {
            if (speakerList[speakerIndex].SoftDeleteFlag !== undefined && speakerList[speakerIndex].SoftDeleteFlag === true) {
                continue;
            }
            this.ratingLength++;
            var speakerObject = speakerList[speakerIndex];
            for (var index = 0; index < speakers_master.length; index++) {
                if (speakerObject.master_speaker_id == speakers_master[index].speaker_id) {
                    this.speakerIdMap["flxSpeaker" + speakerIndex] = speakerObject.master_speaker_id;
                    var speakerBio = speakers_master[index];
                    this.view["flxSpeaker" + speakerIndex].isVisible = true;
                    this.view["speakerName" + speakerIndex].text = speakerBio.speaker_name;
                    var title = speakerBio.speaker_title.length > 20 ? speakerBio.speaker_title.substring(0, 16) + "..." : speakerBio.speaker_title;
                    this.view["speakerDesignation" + speakerIndex].text = title;
                    if (speakerBio.speaker_bio === undefined) {
                        speakerBio.speaker_bio = "";
                    }
                    var description = speakerBio.speaker_bio.length > 50 ? speakerBio.speaker_bio.substring(0, 47) + "..." : speakerBio.speaker_bio;
                    this.view["speakerDescription" + speakerIndex].text = description;
                    this.view["ratingTile" + speakerIndex].setSpeakerProfileInRating(speakerBio);
                    this.view["ratingTile" + speakerIndex].setDefaultSelectedIndex();
                    this.view["flxSpeaker" + speakerIndex].speakerInfo = speakerBio;
                    this.view["flxSpeaker" + speakerIndex].onClick = this.onClickOfSpeaker.bind(this);
                    if (flxImageContainerwidthCalc > 0 && imgHeight > 0) {
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
        this.view["ratingTile"].setDefaultSelectedIndex();
    },
    onClickOfSpeaker: function(eventObject) {
        var naviInfo = {
            "form": this.view.id,
            "speakerId": this.speakerIdMap[eventObject.id]
        };
        var navigateObj = new kony.mvc.Navigation("frmPresenters");
        navigateObj.navigate(naviInfo);

    },
    dismissRatingIfSubmitted: function(sessionObject) {
        var currentTime = new Date();
        var sessionEndTime = sessionObject.session_end_date;
        sessionEndTime = new Date(sessionEndTime);
        this.view.lblFeedback.isVisible = true;
        this.view.flxRatingContainer.isVisible = true;
        this.view.flxRatingContainer.height = kony.flex.USE_PREFERRED_SIZE;
        var feedbackSubmittedSessions = kony.store.getItem("feedbackstore");
        if (kony.sdk.isNullOrUndefined(feedbackSubmittedSessions)) {
            return;
        }
        if (feedbackSubmittedSessions.hasOwnProperty(sessionObject.event_session_id)) {
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
        kony.store.setItem("currentActiveDate", parseInt(buttonText));
        this.changeButtonSkins(buttonText);
        this.currentSelectedFilter = buttonText;
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
        this.filteredSession = [];
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
    addToKonyStore: function(sessionId) {
        var feedbackSubmittedSessions = kony.store.getItem("feedbackstore");
        if (kony.sdk.isNullOrUndefined(feedbackSubmittedSessions)) {
            feedbackSubmittedSessions = {};
        }
        feedbackSubmittedSessions[sessionId] = sessionId;
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
        this.currentClickedSessionTItleId = sessionTitleId;
        var sessionNameLength = sessionData.session_name.length;
        this.view.customprompt.lblSessionTitle.text = sessionNameLength > 25 ? sessionData.session_name.substring(0, 23) + "..." : sessionData.session_name;
        this.view.customprompt.lblLocation.text = sessionData.hasOwnProperty("session_location") ? sessionData.session_location : "";
        this.view.customprompt.lblTime.text = sessionData.modifiedTime;
        this.view.customprompt.isVisible = true;
        this.view.customprompt.btDone.onClick = this.onClickOfDone.bind(this);
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
        var refinedMaterail = this.preProcessMaterials(materials);
        sessionObject.session_material = refinedMaterail;
        materials = refinedMaterail;
        if (kony.sdk.isNullOrUndefined(materials) || materials.length <= 0) {
            this.view.lblPresentation.isVisible = false;
            this.view.flxMaterial.isVisible = false;
            if (!this.view.flxRatingContainer.isVisible) {
                //this.view.flxCurvedArrow.isVisible=false;
            }
            return;
        }
        var materailsCount = materials.length;
        this.view.flxCurvedArrow.isVisible = true;
        this.view.lblPresentation.isVisible = true;
        var flexInstance, materialInstance;
        if (materailsCount == 1) {
            var id = "flex";
            flexInstance = this.createFlexInstace(id);
            this.view.flxMaterial.add(flexInstance);
            var materialId = "material";
            materialInstance = this.createMaterialInstance(materialId, "0dp", "100%");
            this.view[id].add(materialInstance);
            this.view[materialId].pdfUrl = materials[0].url;
            this.view[materialId].onClick = this.onClickOfPDF.bind(this);
            return;
        }
        var width = "130dp";
        var materialIdConstant = "material";
        var flexIdConstant = "flex";
        for (var materialIndex = 0; materialIndex < materailsCount; materialIndex = materialIndex + 2) {
            flexInstance = this.createFlexInstace(flexIdConstant + materialIndex);
            this.view.flxMaterial.add(flexInstance);
            materialInstance = this.createMaterialInstance(materialIdConstant + materialIndex, "0dp", width);
            this.view[flexInstance.id].add(materialInstance);
            this.view[materialInstance.id].pdfUrl = (materials[materialIndex].url);
            this.view[materialInstance.id].onClick = this.onClickOfPDF.bind(this);
            if (materialIndex + 1 < materailsCount) {
                materialInstance = this.createMaterialInstance(materialIdConstant + materialIndex + 1, "170dp", width);
                this.view[flexInstance.id].add(materialInstance);
                this.view[materialInstance.id].pdfUrl = (materials[materialIndex + 1].url);
                this.view[materialInstance.id].onClick = this.onClickOfPDF.bind(this);
            }
        }

    },
    preProcessMaterials: function(materials) {
        if (kony.sdk.isNullOrUndefined(materials)) {
            return;
        }
        var refinedMateral = [];
        var count = materials.length;
        for (var index = 0; index < count; index++) {
            var materialObj = materials[index];
            if (!kony.sdk.isNullOrUndefined(materialObj.SoftDeleteFlag) && materialObj.SoftDeleteFlag == false) {
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
            "width": "300dp",
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
        this.view.sessionTileAnim.addAgendaContainer.skin = tileObject.agendaContainerSkin;
        this.view.sessionTileAnim.imgStatus.src = tileObject.myScheduleIndicatorImage;
        tileObject.sessionToMySchedule();
    },
    /**
     *	@function onClickOfPDF
     * 	@description This function is to open pdf
     *	@param floorMapURL {url} url of the pdf
     * 	@private
     */
    onClickOfPDF: function(eventObject) {
        this.view.flxPdf.zIndex = 300;
        var url = this.view[eventObject.id].pdfUrl;
        this.view.flxPdf.mobileheader.headerTitle = "PDF Material";
        this.view.pdfBrowser.enableParentScrollingWhenReachToBoundaries = false;
        this.view.flxPdf.animate(this.animateTopForPdf("0dp"), this.getPlatformSpecific(), {
            "animationEnd": function() {
                this.view.pdfBrowser.requestURLConfig = {
                    URL: "https://docs.google.com/gview?embedded=true&url=" + url,
                    requestMethod: constants.BROWSER_REQUEST_METHOD_GET
                };
            }.bind(this)
        });
    },
    /**
     *	@function closePdf
     * 	@description This  is to move the pdf container to down.
     * 	@private
     */
    closePdf: function() {
        this.view.flxPdf.animate(this.animateTopForPdf("100%"), this.getPlatformSpecific(), {
            "animationEnd": function() {
                this.view.flxPdf.zIndex = 1;
                this.view.txtArea.setEnabled(false);
            }.bind(this)
        });

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

    onClickOfFilter: function(text) {
        this.view.lblNoEvents.isVisible = false;
        var isFirst = true;
        var startDate = parseInt(text);
        this.currentActiveDate = startDate;
        var sessions = this.allSessionTiles;
        var len = sessions.length;
        var found = false;
        var index;
        for (index = 0; index < len; index++) {
            let currentDate = this.getCurrentDateInteger(sessions[index].startDate);
            if (currentDate == startDate) {
                if (isFirst) {
                    if (!kony.sdk.isNullOrUndefined(this.view[sessions[index].id])) {
                        this.view[sessions[index].id].isVisible = true;
                        this.view[sessions[index].id].top = "80dp";
                        isFirst = !isFirst;
                    }

                } else {
                    if (!kony.sdk.isNullOrUndefined(this.view[sessions[index].id])) {
                        this.view[sessions[index].id].top = "0dp";
                        this.view[sessions[index].id].isVisible = true;
                    }

                }
            } else {
                if (!kony.sdk.isNullOrUndefined(this.view[sessions[index].id])) {
                    this.view[sessions[index].id].isVisible = false;
                }
            }
        }
        var children = this.view.sessionTiles.widgets();
        var len = children.length;
        for (index = 0; index < len; index++) {
            if (children[index].isVisible) {
                break;
            }
        }
        if (index == len) {
            this.view.lblNoEvents.isVisible = true;
        } else {
            this.view.lblNoEvents.isVisible = false
        }
    },




});