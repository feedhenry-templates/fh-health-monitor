(function() {
  Router= Backbone.Router.extend({
    routes: {
      "create": "create",
      "edit/:id":"edit"
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
})();
