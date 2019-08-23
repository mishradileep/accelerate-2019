define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onCloseClick defined for mobileheader **/
    AS_UWI_cd3ec364dd5d46ef825e005faeb509b9: function AS_UWI_cd3ec364dd5d46ef825e005faeb509b9(eventobject) {
        var self = this;
        this.animatePDFContainer("100%")
    },
    /** onClick defined for flxFloorMapList **/
    AS_FlexContainer_fdff18af953b403f97231e492edd8ada: function AS_FlexContainer_fdff18af953b403f97231e492edd8ada(eventobject) {
        var self = this;
        let segmentVisibility = this.view.sgmntFloorMap.isVisible;
        this.view.sgmntFloorMap.isVisible = !segmentVisibility
    },
    /** onRowClick defined for sgmntFloorMap **/
    AS_Segment_e5403eb6299543ddab008bdc2ce59e08: function AS_Segment_e5403eb6299543ddab008bdc2ce59e08(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onSegmentRowClick(rowNumber)
    },
    /** preShow defined for frmFloorMap **/
    AS_Form_b656dff519014f869a281c28a38e7cb7: function AS_Form_b656dff519014f869a281c28a38e7cb7(eventobject) {
        var self = this;
        this.formFloorMapPreshowAction();
    },
    /** onDeviceBack defined for frmFloorMap **/
    AS_Form_a18808e70a78446386864d0e03466a89: function AS_Form_a18808e70a78446386864d0e03466a89(eventobject) {
        var self = this;
        return;
    }
});