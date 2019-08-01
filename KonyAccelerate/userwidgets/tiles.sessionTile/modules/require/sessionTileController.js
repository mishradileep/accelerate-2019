define(function() {

    return {
      
        sessionData: null,
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
            this.view.sessionTime.text = this.formatDate(data.session_start_date) + " to " + this.formatDate(data.session_end_date);
            if (kony.sdk.isNullOrUndefined(data.session_track_id)) {
                return;
            }
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
        },
        /**
         *	@function formatDate
         * 	@description This function is used to process the date and return it in human reable format
         *  @param dateString {String} - date in string format
         * 	@private
         */
        formatDate: function(dateString) {
            var date = new Date(dateString);
            var hours = date.getUTCHours() > 12 ? date.getUTCHours() - 12 : date.getUTCHours();
            var am_pm = date.getUTCHours() >= 12 ? "PM" : "AM";
            hours = hours < 10 ? "0" + hours : hours;
            var minutes = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
            return hours + ":" + minutes + ":" + " " + am_pm;
        }

    };
});
