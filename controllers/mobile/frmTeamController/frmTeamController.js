define({

    /**
     * @function formPostShowAction
     * @description Invoked on the form post show
     * @private
     */
    formPostShowAction: function() {
        let memberData = accelerateTeamData.eventTeamData.records;
        let formattedData = this.formatData(memberData);
        let collectionViewData = [{}, formattedData, {}];
      	this.view.flxMainContainer.remove(this.view["teamCollectionView"]);
        this.createCollectionView(formattedData);
    },

    /**	
     * @function createCollectionView
     * @description Used to create the collection view widget and add it to the form
     * @param collectionViewData The team data
     * @private
     */
    createCollectionView: function(collectionViewData) {
        var bsp = this.getBSPConfig();
        var psp = this.getPSPConfig();
        var lsp = this.getLSPConfig();
        bsp.data = collectionViewData;
        var collectionView = new kony.ui.CollectionView(bsp, lsp, psp);
        this.view.flxMainContainer.add(collectionView);
        this.view["teamCollectionView"].setVisibility(true);
        this.view.forceLayout();
    },

    /**
     * @function formatData
     * @description Used to format the data according to the collection view section data format
     * @param categoryData The sponsor data of the particular category
     * @param length The number of sponsors in the specific category
     * @private
     */
    formatData: function(categoryData) {
        for (let index = 0; index < categoryData.length; index++) {
            categoryData[index].flxTeamMember = {
                "width": "49%"
            };
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
            "id": "teamCollectionView",
            "isVisible": true,
            "minLineSpace": 0,
            "minItemSpace": 0,
            "retainSelection": true,
            "skin": "sknFullFlex",
            "itemTemplate": "flxTeamMember",
            "scrollingEvents": {},
            "sectionFooterTemplate": null,
            "sectionHeaderTemplate": null,
            "showScrollbars": false,
            "layout": kony.collectionview.LAYOUT_HORIZONTAL,
            "widgetDataMap": {
                "imgTeamMember": "profile_url",
                "flxTeamMember": "flxTeamMember",
                "lblTeamMemberName": "name",
                "lblMemberDesignation": "title"
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
