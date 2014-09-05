(function(){
  app.models.CheckModel=Backbone.Model.extend({
    idAttribute:"_id",
    run:function(cb){
      var url=this.url()+"/test";
      $.ajax({
        url:url,
        success:function(){
          cb();
        },
        error:function(xhr,s,err){
          cb(err);
        }
      });
    },
    initialize:function(){
      var self=this;
      var timer=setInterval(function(){
        self.fetch();
      },10000);
      this.on("destroy",function(){
        clearInterval(timer);
      });
    }
    
  });
})();
