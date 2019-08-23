define(function() {

	return {
			sessionTrackId:null,
      		startDate:null,
      		setDuration:function(startDate,endDate){
              this.view.lblDuration.text=this.formatDate(startDate)+" to "+this.formatDate(endDate);
            },
      		formatDate: function(dateString) {
            var date = new Date(dateString);
            var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            var am_pm = date.getHours() >= 12 ? "PM" : "AM";
            hours = hours < 10 ? "0" + hours : hours;
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hours + ":" + minutes + am_pm;
        }
	};
});