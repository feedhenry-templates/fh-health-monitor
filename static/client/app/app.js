var app = (function (module) {
  module.init = init;
  var initErrs = [];
  function init(cb) {
    NProgress.start();
    _loadAllTemplates(function () {
      NProgress.inc();
      _initViews(function () {
        NProgress.inc();
        _verifyAuth(function(){
          NProgress.inc();
          _initCollections(function () {
            NProgress.inc();
            if (initErrs.length > 0) {
              app.msg.alert(initErrs.join(', '))
            }
            //init home page -- check list view
            app.views.checkListView.render();
            Backbone.history.start();
            NProgress.done();
            cb();
          });
        });
      })
    })
  }
  
  function _verifyAuth(cb){
    if(!window.authPolicy){ return cb(); }
    
    $fh.auth.hasSession(function(err, exist){
      if(err) {
        console.log(arugments);
        initErrs.push('Failed to check session');
        return cb();
      }
      
      if(exist){
        cb();
      } else {
        app.views.login.render();
        NProgress.done();
      }
    });
  }
  
  function _loadAllTemplates(cb) {
    var path = './templates/';
    var tags = $('script[type="text/template"]');
    var count = tags.length;
    _.each(tags, function(item) {
      if ($(item).html().trim().length>0){
        count --;
        if (count ==0){
          cb();
        }
        return;
      }
      var id = $(item).attr("id");
      var fullPath = path + id + ".html";
      $.get(fullPath, function(data) {
        $(item).text(data);
        count--;
        if (count === 0) {
          cb()
        }
      })
    })
  }
  function _initCollections(cb) {
    var count = 0;
    for (var key in app.collections) {
      count++;
      app.collections[key].fetch({
        error: function () {
          console.error(arguments);
          initErrs.push('Collection initialisation failed.');
          count--;
          if (count === 0) {
            cb()
          }
        },
        success: function () {
          NProgress.inc();
          count--;
          if (count === 0) {
            cb()
          }
        }
      })
    }
  }
  function _initViews(cb) {
    app.views.login = new app.ViewCls.LoginModal();
    app.views.checkListView = new app.ViewCls.CheckListView();
    app.views.createCheck = new app.ViewCls.CreateCheckModal();
    app.views.editCheck = new app.ViewCls.EditCheckModal();
    cb()
  }
  return module
})({
  ViewCls: {},
  views: {},
  models: {},
  collections: {},
  router: {},
  collectionCls: {}
})
