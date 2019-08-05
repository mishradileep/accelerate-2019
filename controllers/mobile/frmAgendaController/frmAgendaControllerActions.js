define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for buttonDay1 **/
    AS_Button_a9f3bd45b4474ace87f56bf052c0efbd: function AS_Button_a9f3bd45b4474ace87f56bf052c0efbd(eventobject) {
        var self = this;
        this.onClickOfEventDate(eventobject);
    },
    /** onClick defined for buttonDay2 **/
    AS_Button_g1ddf2107e184ec5bfc820886c5577dd: function AS_Button_g1ddf2107e184ec5bfc820886c5577dd(eventobject) {
        var self = this;
        this.onClickOfEventDate(eventobject);
    },
    /** onClick defined for menuButtonPresenters **/
    AS_Button_f524c1d44b6d4a61af563b83cef56b3a: function AS_Button_f524c1d44b6d4a61af563b83cef56b3a(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPresenters");
        ntf.navigate();
    },
    /** onClick defined for menuButtonMore **/
    AS_Button_c57dd333f3fb41cea4389a8152a19989: function AS_Button_c57dd333f3fb41cea4389a8152a19989(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMore");
        ntf.navigate();
    },
    /** preShow defined for frmAgenda **/
    AS_Form_ad02dde63f0e4c11bbea0ffa927943a6: function AS_Form_ad02dde63f0e4c11bbea0ffa927943a6(eventobject) {
        var self = this;
        this.view.menuMain.menuContainerAgenda.menuLabelAgenda.skin = "menuLabelSkinActive";
        this.frmAgendaPreshow();
    }
});