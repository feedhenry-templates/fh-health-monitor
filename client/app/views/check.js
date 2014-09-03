(function(){
  app.ViewCls.Check=Backbone.View.extend({
    initialize:function(){
      this.bindModel();
      this.setElement($('<li class="monitorlist_row clearfix"></li>'));
  
    },
    render:function(){
      var attr=_.clone(this.model.attributes);
      if (attr.lastPass === true){
        attr.statusCls="glyphicon glyphicon-circle-arrow-up status_up";
      }else if (attr.lastPass === false){
        attr.statusCls="glyphicon glyphicon-circle-arrow-down status_down";
      }else{
        attr.statusCls="glyphicon glyphicon-minus-sign status_unknown";
      }
      var tmpl=app.tmpl.get("tmpl_monitorlist_row",attr);
      this.$el.html($(tmpl));
    },
    events:{
      "click .check_remove":"onRemove"
    },
    onRemove:function(){
      this.model.destroy();
    },
    bindModel:function(){
      this.model.on("change",this.render.bind(this));
    }
  });
})();
