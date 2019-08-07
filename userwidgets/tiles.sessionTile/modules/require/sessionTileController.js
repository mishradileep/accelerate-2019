define(function() {

    return {
      
        sessionData: null,
      	sessionTrackId:null,
      	startDate:null,
      	endDate:null,
      	isAddedToMySchedule:null,
      	myScheduleIndicatorImage:"added.png",
      	agendaIndicatorImage:"add.png",
      	agendaContainerSkin:"sknGreenSelected",
      	callback:null,
        /**
         *	@function setTitleData
         * 	@description This function is used to set the data to the session tile
         *	@param data {Object} -The data param contains the info of the session
         * 	@private
         */
        setTitleData: function(data) {
            this.sessionData = data;
            var sessionNameLength = data.session_name.length;
            this.view.sessionTitle.text = sessionNameLength > 28 ? data.session_name.substring(0, 25) + "..." : data.session_name;
            this.view.sessionLocation.text = data.hasOwnProperty("session_location") ? data.session_location : "";
          	this.startDate=data.session_start_date;
          	this.endDate=data.session_end_date;
          	this.sessionData.modifiedTime= this.formatDate(data.session_start_date) + " to " + this.formatDate(data.session_end_date);
            this.view.sessionTime.text = this.sessionData.modifiedTime;
            if (kony.sdk.isNullOrUndefined(data.session_track_id)) {
                return;
            }
          	this.sessionTrackId= data.session_track_id;
            switch (data.session_track_id) {
                case 1:
                    this.view.tilebg.skin = "agendaTileSkinQuantum";
                    this.view.tileBGImageKony.src = "agendatilequantum.png";
                    break;
                case 2:
                    this.view.tilebg.skin = "agendaTileSkinDBX";
                    this.view.tileBGImageKony.src = "agendatiledbx.png";
                    break;
                case 3:
                    this.view.tilebg.skin = "agendaTileSkinKony";
                    this.view.tileBGImageKony.src = "agendatilekony.png";
                    break;
                default:
                    this.view.tilebg.skin = "";
                    this.view.tileBGImageKony.src = "";
            }
          if(data.isAddedToMySchedule===true){
            this.view.imgStatus.src=this.myScheduleIndicatorImage;
          }
          else{
            this.view.imgStatus.src=this.agendaIndicatorImage;
          }
        },
        /**
         *	@function formatDate
         * 	@description This function is used to process the date and return it in human reable format
         *  @param dateString {String} - date in string format
         * 	@private
         */
        formatDate: function(dateString) {
            var date = new Date(dateString);
            var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            var am_pm = date.getHours() >= 12 ? "PM" : "AM";
            hours = hours < 10 ? "0" + hours : hours;
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hours + ":" + minutes + ":" + " " + am_pm;
        },
       /**
         *	@function sessionToMySchedule
         * 	@description This function is used to add sessions to strore in phone
         * 	@private
         */
      sessionToMySchedule:function(){
        this.isAddedToMySchedule=true;
        this.sessionData.isAddedToMySchedule=true;
        this.view.flxAddedToSchedule.isVisible=true;
        this.view.imgStatus.src=this.myScheduleIndicatorImage;
        this.view.addAgendaContainer.skin=this.agendaContainerSkin;
        var myAgendaData=kony.store.getItem("myAgendaData");
        if(kony.sdk.isNullOrUndefined(myAgendaData)){
          myAgendaData={};
        }
        myAgendaData[this.sessionData.event_session_id]=this.sessionData.event_session_id;
        kony.store.setItem("myAgendaData", myAgendaData);
      },
      invokedCallback:function(){
        this.callback(this.view.id,this.sessionData);
      }
    };
});
