(function() {
  Router= Backbone.Router.extend({
    routes: {
      "create": "create",
      "edit/:id":"edit",
      "detail/:id":"detail"
    }
  });
  app.router=new Router();
  app.router.on("route:create",function(){
    app.views.createCheck.render();
  });
  app.router.on("route:edit",function(id){
    var model=app.collections.checks.get(id);
    app.views.editCheck.setModel(model);
    app.views.editCheck.render();
  });
  app.router.on("route:detail",function(id){
    var model=app.collections.checks.get(id);
    var col=new app.collectionCls.RunCollection([],{
      url:model.url()+"/runs" 
    }) ;
    var view=new app.ViewCls.ListRunModal({
      collection:col
    });
    view.modal("show");
  });
})();
