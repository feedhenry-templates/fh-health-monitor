describe('check.spec.js', function() {
  beforeEach(function() {
    jasmine.clock().install();

    $.ajax = function() {};
    this.model = new app.models.CheckModel();
    spyOn(this.model, 'fetch');
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should call fetch periodically', function() {
    expect(this.model.fetch.calls.count()).toEqual(0);
    jasmine.clock().tick(10001);
    expect(this.model.fetch.calls.count()).toEqual(1);
    jasmine.clock().tick(10001);
    expect(this.model.fetch.calls.count()).toEqual(2);
  });
});