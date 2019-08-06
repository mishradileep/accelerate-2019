define({

    formSponsorPreshow: function() {
        let sponsorData = accelerateSponsorData.sponsorData.records;
      	this.setSponsorData(sponsorData);
    },

    setSponsorData: function(sponsorsData) {
        let formattedData = this.formatCollectionViewData(sponsorsData);
        this.createCollectionView(formattedData);
    },

  	animateSponsorsFlex : function(finalTop){
      this.view.flxMainContainer.animate(
      kony.ui.createAnimation({100: {top: finalTop, "stepConfig": {}}}),
      {delay: 0, fillMode: kony.anim.FILL_MODE_FORWARDS, duration: 0.5},
      {animationEnd: function() {
        if(finalTop === "100%"){
          new kony.mvc.Navigation("frmMore").navigate();
        }
      }});
    },
  
  	formatCollectionViewData : function(sponsorsData) {
  		let collectionViewData =[];
      	for(let index = 0 ; index < sponsorsData.length ; index++){
          let currentSponsorObject = [];
          let currentSponsorData = sponsorsData[index];
          let sponsorData = currentSponsorData.sponsors;
          let updatedSponsorData;
          updatedSponsorData = this.formatData(sponsorData,sponsorData.length);
          currentSponsorObject = [{
            "categoryName":{
             "text":currentSponsorData.categoryName
            }
          },sponsorData,{}];
          collectionViewData.push(currentSponsorObject);
        }
      	return collectionViewData;
    },
  
    createCollectionView: function(categoryData) {
        var bsp = this.getBSPConfig();
        var psp = this.getPSPConfig();
        var lsp = this.getLSPConfig();
      	bsp.data = categoryData; 
        var collectionView = new kony.ui.CollectionView(bsp,lsp,psp);
      	this.view.flxMainContainer.add(collectionView);
      	this.view["sponsorCollectionView"].setVisibility(true);
      	this.view.forceLayout();
    },
	
  	formatData : function(categoryData,length){
      let width = (length > 1) ? "49%" : "96%";
      for(let index = 0 ; index < categoryData.length ; index++){
        categoryData[index].flxSponsor = {
          "width" : width,
          "top":"5dp",
        };
        var dummyTemplate ={
          "itemTemplate":"flxDummySponsor",
           "flxSponsor" :{
          		"width":"49%"
        	}
        };
        if(length % 2 === 1 && length > 1){
          categoryData[length] = dummyTemplate
        }
      }
      return categoryData;
    },
  
    getBSPConfig: function() {
        return {
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "data": null,
            "left": "5%",
            "top": "5dp",
          	"bottom":"5dp",
            "width": "90%",
            "height": "98%",
            "id": "sponsorCollectionView",
            "isVisible": true,
            "minLineSpace": 0,
            "minItemSpace": 0,
            "retainSelection": true,
            "skin": "sknFullFlex",
            "itemTemplate": "flxSponsor",
          	"sectionHeaderTemplate":"flxSponsorCategory",
            "scrollingEvents": {},
            "sectionFooterTemplate": null,
            "showScrollbars": false,
            "layout": kony.collectionview.LAYOUT_HORIZONTAL,
            "widgetDataMap": {
                "imgSponsorIcon": "sponsorImageURL",
              	"flxSponsor":"flxSponsor",
              	"lblSponsorCategoryName":"categoryName",
            },
            "zIndex": 1,
        };
    },

    getPSPConfig: function() {
        return {
            "bounces": true,
            "enableDictionary": false,
        };
    },

    getLSPConfig: function() {
        return {
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        };
    }
});