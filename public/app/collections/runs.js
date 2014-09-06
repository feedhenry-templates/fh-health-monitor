(function(){
  app.collectionCls.RunCollection=Backbone.Collection.extend({
    model:app.models.RunModel,
    initialize:function(ms,options){
      this.url=options.url;
      this.fetch();
      var self=this;
   }
  });
})();
