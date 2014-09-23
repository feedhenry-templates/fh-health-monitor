(function(){
  app.ViewCls.RunRow=Backbone.View.extend({
    initialize:function(){
      this.setElement($('<tr class="run_row"></tr>'));
    },
    render:function(){
      var attr=_.clone(this.model.attributes);
      if (attr.isSuccessful === true) {
        attr.statusCls = "glyphicon glyphicon-circle-arrow-up status_up";
      } else if (attr.isSuccessful === false) {
        attr.statusCls = "glyphicon glyphicon-circle-arrow-down status_down";
      } else {
        attr.statusCls = "glyphicon glyphicon-minus-sign status_unknown";
      }
      var tmpl=app.tmpl.get("tmpl_run_row",attr);
      this.$el.html(tmpl);
    }
  });
})();
