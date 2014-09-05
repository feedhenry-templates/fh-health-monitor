(function() {
  app.ViewCls.ListRunModal = Backbone.View.extend({
    initialize: function() {
      this.bindCollection();
      this.render();
    },
    render: function() {
      var tmpl = app.tmpl.get("tmpl_runlist", {});
      this.setElement($(tmpl));
    },
    modal:function(show){
      this.$el.modal(show);
    },
    events: {
      "hidden.bs.modal": "onHidden"
    },
    onHidden: function() {
      this.remove();
      app.router.navigate("/");
    },
    bindCollection: function() {
      var col = this.collection;
      col.on("add", this.addRowView.bind(this));
      col.on("remove", this.removeRowView.bind(this));
      col.on("reset", this.empty.bind(this));
      col.on("sort", this.reset.bind(this));
    },
    addRowView:function(model){
      var rowView=new app.ViewCls.Run({
        model:model
      });
      rowView.render();
      this.$el.find("ul").append(rowView.$el);

    },
    removeRowView:function(model){

    },
    reset:function(){
      this.empty();
      this.collection.forEach(this.addRowView.bind(this));
      this.delegateEvents();
    },
    empty:function(){
      this.$el.find("ul").html("");
    }
  });
})();
