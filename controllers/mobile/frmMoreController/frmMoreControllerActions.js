define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for menuButtonAgenda **/
    AS_Button_a59dde3129db4e05b6365241c99a4d9f: function AS_Button_a59dde3129db4e05b6365241c99a4d9f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmAgenda");
        ntf.navigate();
    },
    /** onClick defined for menuButtonMySchedule **/
    AS_Button_ee14463e4423415780f07c1e947099d9: function AS_Button_ee14463e4423415780f07c1e947099d9(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmmyAgenda");
        ntf.navigate();
    },
    /** onClick defined for menuContainerMySchedule **/
    AS_FlexContainer_d2b82377b1c14a9cb17bfc82c820a81f: function AS_FlexContainer_d2b82377b1c14a9cb17bfc82c820a81f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmmyAgenda");
        ntf.navigate();
    },
    /** onClick defined for menuButtonPresenters **/
    AS_Button_i003e17d991a4679949d76870ba75c70: function AS_Button_i003e17d991a4679949d76870ba75c70(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPresenters");
        ntf.navigate();
    },
    /** preShow defined for frmMore **/
    AS_Form_h902144b12734dd5892b60716ca9a3f2: function AS_Form_h902144b12734dd5892b60716ca9a3f2(eventobject) {
        var self = this;
        if (!quantumQuestData.status) {
            this.view.flxMenuExploreAustin.setVisibility(false);
        } else {
            this.view.flxMenuExploreAustin.setVisibility(true);
        }
        this.view.menuMain.menuContainerMore.menuLabelMore.skin = "menuLabelSkinActive";
        this.menuBindOnClick();
        this.slideMenusBVR();
    },
    /** postShow defined for frmMore **/
    AS_Form_f9337d7c18aa4abbb9873bd00f925294: function AS_Form_f9337d7c18aa4abbb9873bd00f925294(eventobject) {
        var self = this;
        this.menuAnimateSlide('slideIn');
    },
    /** onDeviceBack defined for frmMore **/
    AS_Form_a20b9413c8b34aee8c35e3133f1c7208: function AS_Form_a20b9413c8b34aee8c35e3133f1c7208(eventobject) {
        var self = this;
        return;
    }
});