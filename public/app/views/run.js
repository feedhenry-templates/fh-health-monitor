(function(){
  app.ViewCls.Run=Backbone.View.extend({
    initialize:function(){
      this.setElement($('<li class="run_row clearfix"></li>'));
    },
    render:function(){
      var attr=_.clone(this.model.attributes);
      var tmpl=app.tmpl.get("tmpl_run",attr);
      this.$el.html(tmpl);
    }
  });
})();
