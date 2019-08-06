define(function() {

	return {
      pdfUrl:"",
      /**
         *	@function seturl
         * 	@description This function is used to set the pdfUrl  to the presentation tile
         *	@param url {Object} -The url param contains the info of the session presentation 
         * 	@private
         */
      seturl:function(url){
        this.pdfUrl=url;
      },
    };
});