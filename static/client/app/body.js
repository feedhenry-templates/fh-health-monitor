app.body=(function(module){
  module.change=change;
   var curView=null;

   function change(view){
     var lastView=curView;
      if (curView){
        curView.$el.fadeOut(function(){
          lastView.$el.detach();
        });
      }      
      $("#body").append(view.$el);
      view.$el.hide();
      view.$el.fadeIn();
      curView=view;
   }

  return module;
})(app.body || {});
