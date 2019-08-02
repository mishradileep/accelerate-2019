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
    /** onClick defined for menuButtonPresenters **/
    AS_Button_i003e17d991a4679949d76870ba75c70: function AS_Button_i003e17d991a4679949d76870ba75c70(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPresenters");
        ntf.navigate();
    },
    /** preShow defined for frmMore **/
    AS_Form_h902144b12734dd5892b60716ca9a3f2: function AS_Form_h902144b12734dd5892b60716ca9a3f2(eventobject) {
        var self = this;
        this.view.menuMain.menuContainerMore.menuLabelMore.skin = "menuLabelSkinActive";
        this.menuBindOnClick();
        this.slideMenusBVR();
    },
    /** postShow defined for frmMore **/
    AS_Form_f9337d7c18aa4abbb9873bd00f925294: function AS_Form_f9337d7c18aa4abbb9873bd00f925294(eventobject) {
        var self = this;
        this.menuAnimateSlide('slideIn');
    }
});