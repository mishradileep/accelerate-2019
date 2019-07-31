//This is a controller file where the business logic for the form "frmAgenda" is implemented
define({

    devHeight: null,
    thisCard: null,
    thisCardIndex: null,
    cardFrameRel: null,

    /**
     * @function frmAgendaPreshow
     * @description The function is invoked in the form preshow action which is used to setup the UI
     * @private
     */
    frmAgendaPreshow: function() {
        var self = this;
        this.addActionToSessionTiles();
        //this.view.tileOuterCopy.isVisible=false;
        this.view.referenceAgenda.isVisible = false;
        this.view.referenceSession.isVisible = false;
        this.view.postShow = this.frmAgendaPostshow;
        this.view.sessionContentContainer.top = "100%"
        this.view.buttonBack.isVisible = false;
        this.view.imageBack.opacity = 0;
        this.view.buttonBack.onClick = this.frmAgendaSessionClose;
        this.view.detailsScroller.onScrolling = this.detailsScrollerOnScrolling;
        this.view.filterAll.onClick = function(eventobject) {
            self.agendaFilter(eventobject);
        }
        this.view.filterDBX.onClick = function(eventobject) {
            self.agendaFilter(eventobject);
        }
        this.view.filterQuantum.onClick = function(eventobject) {
            self.agendaFilter(eventobject);
        }
        this.view.sessionTileAnim.anchorPoint = {
            "x": .5,
            "y": 0
        };
        //this.view.sessionTile.tileBGImageKony.anchorPoint={"x":1,"y":.5};
        globalPreshow();
        this.frmAgendaSetAgendaTiles();
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
    },

    /**
     * @function frmAgendaSetAgendaTiles
     * @description The function is used to set the skin and the image for the tiles
     * @private
     */
    frmAgendaSetAgendaTiles: function() {

        this.view.sessionTile1.tilebg.skin = "agendaTileSkinKony";
        this.view.sessionTile1.tileBGImageKony.src = "agendatilekony.png"
        this.view.sessionTile2.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile2.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile3.tilebg.skin = "agendaTileSkinQuantum";
        this.view.sessionTile3.tileBGImageKony.src = "agendatilequantum.png"
        this.view.sessionTile4.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile4.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile5.tilebg.skin = "agendaTileSkinKony";
        this.view.sessionTile5.tileBGImageKony.src = "agendatilekony.png"
        this.view.sessionTile6.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile6.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile7.tilebg.skin = "agendaTileSkinQuantum";
        this.view.sessionTile7.tileBGImageKony.src = "agendatilequantum.png"
        this.view.sessionTile8.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile8.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile9.tilebg.skin = "agendaTileSkinKony";
        this.view.sessionTile9.tileBGImageKony.src = "agendatilekony.png"
        this.view.sessionTile10.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile10.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile11.tilebg.skin = "agendaTileSkinQuantum";
        this.view.sessionTile11.tileBGImageKony.src = "agendatilequantum.png"
        this.view.sessionTile12.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile12.tileBGImageKony.src = "agendatiledbx.png"
        this.view.sessionTile13.tilebg.skin = "agendaTileSkinKony";
        this.view.sessionTile13.tileBGImageKony.src = "agendatilekony.png"
        this.view.sessionTile14.tilebg.skin = "agendaTileSkinDBX";
        this.view.sessionTile14.tileBGImageKony.src = "agendatiledbx.png"

    },

    /**
     * @function frmAgendaSessionSelect
     * @description The function is used to invoke the action on the click of the session tile
     * @param eventobject The eventobject and info of the tile which is clicked
     * @private
     */
    frmAgendaSessionSelect: function(eventobject) {
        egLoggerClear();
        var self = this;
        this.thisCard = eventobject;
        egLogger("this.thisCard = " + this.thisCard.id);
        this.view.detailsScroller.left = "0%";
        this.view.sessionTileAnim.tilebg.skin = this.thisCard.tilebg.skin;
        this.view.sessionTileAnim.sessionTitle.text = this.thisCard.sessionTitle.text;
        this.view.sessionTileAnim.sessionLocation.text = this.thisCard.sessionLocation.text;
        this.view.sessionTileAnim.tileBGImageKony.src = this.thisCard.tileBGImageKony.src;
        var cardFrame = this.thisCard.frame.y;
        egLogger("cardFrame = " + cardFrame);
        this.cardFrameRel = cardFrame - this.view.contentScroller.contentOffsetMeasured.y;
        egLogger("cardFrameRel = " + this.cardFrameRel);
        this.view.sessionTileAnim.top = this.cardFrameRel;
        this.view.sessionTileAnim.left = "0%";
        var animDuration = .8
        var animHalf = animDuration * .5;
        var bgImageScale = kony.ui.makeAffineTransform();
        bgImageScale.scale(1.47, 1.47);
        var allCards = this.view.sessionTiles.widgets();
        var cardDelay = 0;
        var cardIndexFound = false;

        for (i = 0; i < allCards.length; i++) {
            currentCard = allCards[i];

            egLogger("operating on " + currentCard.id)

            currentCard.animate(
                kony.ui.createAnimation({
                    //0:{left:0,"stepConfig":{}},
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
            cardDelay = cardDelay + .1
        }

        this.view.headerContainer.animate(
            kony.ui.createAnimation({
                //0:{left:0,"stepConfig":{}},
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

        this.view.sessionTileAnim.sessionLocationIcon.animate(
            kony.ui.createAnimation({
                //0:{left:0,"stepConfig":{}},
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
                //0:{left:0,"stepConfig":{}},
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

                    self.view.sessionTileAnim.tileBGImageKony.animate(
                        kony.ui.createAnimation({
                            //50:{transform:"100%dp","stepConfig":{}},
                            100: {
                                transform: bgImageScale,
                                "stepConfig": {}
                            }
                        }), {
                            delay: 0,
                            fillMode: kony.anim.FILL_MODE_FORWARDS,
                            duration: animHalf * .5
                        }, {
                            animationEnd: function() {}
                        });

                }
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
                    self.view.sessionContentContainer.animate(
                        kony.ui.createAnimation({
                            50: {
                                top: "100%",
                                "stepConfig": {}
                            },
                            100: {
                                top: "25%",
                                "stepConfig": {}
                            }
                        }), {
                            delay: 0,
                            fillMode: kony.anim.FILL_MODE_FORWARDS,
                            duration: animDuration
                        }, {
                            animationEnd: function() {}
                        });
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
                animationEnd: function() {}
            });
    },

    /**
     * @function frmAgendaSessionClose
     * @description The function is used to invoke the action on the click of the close button of the session tile
     * @private
     */
    frmAgendaSessionClose: function() {
        var self = this;
        egLogger("this.thisCard = " + this.thisCard.id);
        var animDuration = .8
        var animHalf = animDuration * .5;
        var bgImageScale = kony.ui.makeAffineTransform();
        bgImageScale.scale(1, 1);
        var allCards = this.view.sessionTiles.widgets();
        var cardDelay = 0
        for (i = 0; i < allCards.length; i++) {
            currentCard = allCards[i];
            egLogger("operating on " + currentCard.id)
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
            cardDelay = cardDelay + .1
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
                duration: animHalf * .5
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
            tileScale.scale(1 + (scrollPosY * -.002), 1 + (scrollPosY * -.002))
            self.view.sessionTileAnim.transform = tileScale;
        } else {
            self.view.sessionTileAnim.top = scrollPosY * -.3;
            self.view.imageBack.opacity = (1 - (scrollPosY * .01));
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
        var leftPos = "0%"
        var buttonText = "ALL"
        var targetSkin = "filterSkinAll"
        var destColor = "";
        if (eventobject.id == "filterAll") {
            leftPos = "0%"
            buttonText = "ALL"
            targetSkin = "filterSkinAll";
            destColor = "1F232900"
        } else if (eventobject.id == "filterDBX") {
            leftPos = "33.33%"
            buttonText = "DBX";
            targetSkin = "filterSkinDBX";
            destColor = "4B3A6600";
        } else {
            leftPos = "66.66%"
            buttonText = "QUANTUM";
            targetSkin = "filterSkinQuantum";
            destColor = "14334500";
        }

        this.view.filterWidget.animate(
            kony.ui.createAnimation({
                //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
                100: {
                    left: leftPos,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: .22
            }, {
                animationEnd: function() {}
            });
        /*
     this.view.filterButton.animate(
	  kony.ui.createAnimation({
		//50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
		100:{backgrounColor:destColor,"stepConfig":{}}}),
	  {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.22},
	  {animationEnd: function() {
        	self.view.filterButton.text=buttonText;
      }});
  */
        this.view.filterButton.animate(
            kony.ui.createAnimation({
                //50:{left:"-16dp",right:"-16dp",top:"12dp","stepConfig":{}},
                100: {
                    opacity: 0,
                    "stepConfig": {}
                }
            }), {
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS,
                duration: .1
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
                            duration: .1
                        }, {
                            animationEnd: function() {}
                        });

                }
            });
    }
});
