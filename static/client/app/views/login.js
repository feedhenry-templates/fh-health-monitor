(function () {
  app.ViewCls.LoginModal = Backbone.View.extend({
    isShow:false,
    initialize: function () {
      var tmpl = app.tmpl.get('tmpl_login', { });
      this.setElement($(tmpl))
    },
    render: function () {
      this.$el.modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    events: {
      'submit #loginForm': 'onLogin'
    },
    onLogin: function (e) {
      var inputs = this.$el.find('input, button');
      inputs.prop('disabled', true);
      
      var status = this.$el.find('#status');
      status.text('Logging in...');
      
      var error = this.$el.find('#error');
      status.text('');
      
      $fh.auth({
        "policyId": window.authPolicy,
        "clientToken": $fh.getFHParams().appid,
        "params": {
          "userId": this.$el.find('[name=username]').val(),
          "password": this.$el.find('[name=password]').val()
        }
      }, function (res) {
        window.location.reload();
      }, function (msg, err) {
        console.log(msg, err);
        status.text('');
        error.text('Login failed, please try again.');
        inputs.prop('disabled', false);
      });
      return false; 
      
    }
  })
}())
