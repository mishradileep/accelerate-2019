define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      	
      	setSponsorsData : function(sponsorData,categoryName){
          let sponsorCategoryLabel = this.createLabel(categoryName);
          let sponsorDataLength = sponsorData.length;
          if(sponsorDataLength > 1){
            this.createSponsorTiles(sponsorData,2);
          }
        },
      
      	createLabel : function(categoryName){
          
        },
      	
      	createSponsorTiles : function(sponsorData,tilePerRow,categoryName){
          for(let index = 0 ; index < sponsorData.length ; index++){
            let sponsorRowContainer = this.createFlexContainer(categoryName,index);
            let sponsor
          }
        },
      
      	createFlexContainer : function(categoryName,index){
           var flxRow = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "clipBounds": true,
            "height": "125dp",
            "id": "flx"+categoryName+index,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "isModalContainer": false,
            "skin": "slFbox",
            "width": "100%",
            "zIndex": 1
        });
          return flxRow;
        }                                        
      	
	};
});