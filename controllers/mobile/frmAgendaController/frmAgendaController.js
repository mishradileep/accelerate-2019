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
        //this.addActionToSessionTiles();
        this.view.referenceAgenda.isVisible = false;
        this.view.referenceSession.isVisible = false;
        this.view.postShow = this.frmAgendaPostshow;
        this.view.sessionContentContainer.top = "100%";
        this.view.buttonBack.isVisible = false;
        this.view.imageBack.opacity = 0;
        this.view.buttonBack.onClick = this.frmAgendaSessionClose;
        this.view.detailsScroller.onScrolling = this.detailsScrollerOnScrolling;
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
        this.view.sessionTileAnim.addAgendaContainer.skin = this.view[eventobject.id].addAgendaContainer.skin;
        this.view.sessionTileAnim.sessionLocation.text = this.thisCard.sessionLocation.text;
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

                    self.view.sessionTileAnim.tileBGImageKony.animate(
                        kony.ui.createAnimation({
                            100: {
                                transform: bgImageScale,
                                "stepConfig": {}
                            }
                        }), {
                            delay: 0,
                            fillMode: kony.anim.FILL_MODE_FORWARDS,
                            duration: animHalf * 0.5
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
            self.view.imageBack.opacity = (1 - (scrollPosY * 0.01));
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
        this.sessionsList = sessions;
        var sessionCount = sessions.length;
        for (var index = 0; index < sessionCount; index++) {
            var id = eventConstants.SESSION_TILE_ID + index;
            var sessionObj = sessions[index];
            var sessionTile;
            if (index == 0) {
                sessionTile = this.createSessionTile(id, "131dp");
            } else {
                sessionTile = this.createSessionTile(id, "0dp");
            }
            this.view.sessionTiles.add(sessionTile);
            this.view[id].setTitleData(sessionObj);
            if (!kony.sdk.isNullOrUndefined(sessionObj.presenter)) {
                this.view[id].onClick = this.frmAgendaSessionSelect.bind(this);
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
      	this.view.flxRatingContainer.height=kony.flex.USE_PREFERRED_SIZE;
      	this.view.imgThanks.isVisible=false;
    	this.view.lblThankyou.isVisible=false;
        var id = eventObject.id;
        var len = id.length;
        var startIndex = eventConstants.SESSION_TILE_ID.length;
        var sessionIndex = id.substring(startIndex, len);
        var sessionObject = this.sessionsList[sessionIndex];
        var speakerList = sessionObject["presenter"];
        var speakers_master = kony.store.getItem("master_speakers");
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
            for (var index = 0; index < speakers_master.length; index++) {
                if (speakerObject.master_speaker_id == speakers_master[index].speaker_id) {
                    var speakerBio = speakers_master[index];
                    this.view["speakerName" + speakerIndex].text = speakerBio.speaker_name;
                    this.view["speakerDesignation" + speakerIndex].text = speakerBio.speaker_title;
                    this.view["speakerDescription" + speakerIndex].text = speakerBio.speaker_bio;
                    this.view["imgSpeaker" + speakerIndex].src = speakerBio.speaker_profile_pic;
                    this.view["ratingTile" + speakerIndex].setSpeakerProfileInRating(speakerBio);
                }
            }
        }
        for (speakerIndex; speakerIndex < 3; speakerIndex++) {
            this.view["flxSpeaker" + speakerIndex].isVisible = false;
            this.view["ratingTile" + speakerIndex].isVisible = false;
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
        var isFirstTile = false;
        var sessionCount = this.sessionsList.length;
        for (var index = 0; index < sessionCount; index++) {
            var id = eventConstants.SESSION_TILE_ID + index;
            if (sessionTrackId === eventConstants.KEYNOTE) {
                this.view[id].isVisible = true;
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
                if (!isFirstTile) {
                    this.view[id].top = "131dp";
                    isFirstTile = true;
                    continue;
                }
                this.view[id].top = "0dp";
            }
        }
    },
  onClickOfSubmit:function(){
    this.view.flxRatingContainer.animate(this.createAnimationObject("0dp"), this. getPlatformSpecific(), null);
    this.view.imgThanks.isVisible=true;
    this.view.lblThankyou.isVisible=true;
  },
  createAnimationObject:function(height){
        var animationObejct=kony.ui.createAnimation({
        100: {
          "height": height,
          "stepConfig": {}
        }
      });
        return animationObejct;
      },
      getPlatformSpecific:function(){
        var specificObj= {
        delay: 0,
        fillMode: kony.anim.FILL_MODE_FORWARDS,
        duration: 0.22
      };
        return specificObj;
      }




});