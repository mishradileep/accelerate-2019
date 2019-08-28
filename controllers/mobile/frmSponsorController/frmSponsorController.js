define({

    /**
     * @function formSponsorPreshow
     * @description Invoked in the preshow of the form
     * @private
     */
    formSponsorPreshow: function() {
        let sponsorData = accelerateSponsorData.sponsorData.records;
        let formattedData = this.formatCollectionViewData(sponsorData);
        this.createCollectionView(formattedData);
    },

    /**
     * @function animateSponsorsFlex
     * @description Used to animate the sponsors flex based on the top value
     * @param finalTop The top value to which the flex needs to be animated
     * @private
     */
    animateSponsorsFlex: function(finalTop) {
        this.view.flxMainContainer.animate(
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
                        new kony.mvc.Navigation("frmMore").navigate();
                    }
                }
            });
    },

    /**
     * @function formatCollectionViewData
     * @description Used to format the data according to the collection view widget data format
     * @param sponsorsData The data of sponsors
     * @private
     */
    formatCollectionViewData: function(sponsorsData) {
        let collectionViewData = [];
        for (let index = 0; index < sponsorsData.length; index++) {
            let currentSponsorObject = [];
            let currentSponsorData = sponsorsData[index];
            let sponsorData = currentSponsorData.sponsors;
            let updatedSponsorData;
            updatedSponsorData = this.formatData(sponsorData, sponsorData.length);
            currentSponsorObject = [{
                "categoryName": {
                    "text": currentSponsorData.categoryName
                }
            }, sponsorData, {}];
            collectionViewData.push(currentSponsorObject);
        }
        return collectionViewData;
    },

    /**	
     * @function createCollectionView
     * @description Used to create the collection view widget and add it to the form
     * @param categoryData The sponsor data
     * @private
     */
    createCollectionView: function(categoryData) {
        var bsp = this.getBSPConfig();
        var psp = this.getPSPConfig();
        var lsp = this.getLSPConfig();
        bsp.data = categoryData;
        var collectionView = new kony.ui.CollectionView(bsp, lsp, psp);
        this.view.flxMainContainer.add(collectionView);
        this.view["sponsorCollectionView"].setVisibility(true);
        this.view.forceLayout();
    },

    /**
     * @function formatData
     * @description Used to format the data according to the collection view section data format
     * @param categoryData The sponsor data of the particular category
     * @param length The number of sponsors in the specific category
     * @private
     */
    formatData: function(categoryData, length) {
        let width = (length > 1) ? "49%" : "96%";
        for (let index = 0; index < categoryData.length; index++) {
            categoryData[index].flxSponsor = {
                "width": width,
                "top": "5dp",
            };
          	
        }
      	var dummyTemplate = {
                "itemTemplate": "flxDummySponsor1",
                "flxSponsor": {
                    "width": "49%"
                },
          		"imgSponsorIcon":{
                  "src":null
                }
            };
      	if (length % 2 === 1 && length > 1) {
                categoryData[length] = dummyTemplate
        }
        return categoryData;
    },

    /**
     * @function getBSPConfig
     * @description Used to fetch the basic properties of collection view
     * @private
     */
    getBSPConfig: function() {
        return {
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "data": null,
            "left": "5%",
            "top": "5dp",
            "bottom": "5dp",
            "width": "90%",
            "height": "98%",
            "id": "sponsorCollectionView",
            "isVisible": true,
            "minLineSpace": 0,
            "minItemSpace": 0,
            "retainSelection": true,
            "skin": "sknFullFlex",
            "itemTemplate": "flxSponsor",
            "sectionHeaderTemplate": "flxSponsorCategory",
            "scrollingEvents": {},
            "sectionFooterTemplate": null,
            "showScrollbars": false,
            "layout": kony.collectionview.LAYOUT_HORIZONTAL,
            "widgetDataMap": {
                "imgSponsorIcon": "sponsorImageURL",
                "flxSponsor": "flxSponsor",
                "lblSponsorCategoryName": "categoryName",
            },
            "zIndex": 1,
        };
    },

    /**
     * @function getPSPConfig
     * @description Used to fetch the platform specific properties of collection view
     * @private
     */
    getPSPConfig: function() {
        return {
            "bounces": true,
            "enableDictionary": false,
        };
    },

    /**
     * @function getLSPConfig
     * @description Used to fetch the layout specific properties of collection view
     * @private
     */
    getLSPConfig: function() {
        return {
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        };
    }
});
