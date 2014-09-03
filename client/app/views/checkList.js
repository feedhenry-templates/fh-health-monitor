(function(){
  var checkRowViews={}; //id -- obj pair
  app.ViewCls.CheckListView=Backbone.View.extend({
    initialize:function(){
     this.bindCollection(); 
    },
    render:function(){
      var col=this.getCol();
      this.$el.html(app.tmpl.get("tmpl_monitorlist",{})); //clear dom
      checkRowViews={};
      col.forEach(this.addRowView.bind(this));
    },
    bindCollection:function(){
      var col=this.getCol();
      col.on("add",this.addRowView.bind(this));
      col.on("remove",this.removeRowView.bind(this));
      col.on("reset",this.render.bind(this));
      col.on("sort",this.render.bind(this));
    },
    addRowView:function(model){
      var rowView=new app.ViewCls.Check({
        model:model
      }); 
      rowView.render();
      this.$el.find("ul").append(rowView.$el);
      checkRowViews[model.id]=rowView;
    },
    removeRowView:function(model){
      var rowView=checkRowViews[model.id];
      if (rowView){
        rowView.remove();
        delete checkRowViews[model.id];
      }
    },
    getCol:function(){
      return app.collections.checks;
    },
    getAllRowViews:function(){
      return checkRowViews;
    }
  });

})();
