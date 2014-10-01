module.exports = {
  "First start home page" : function (client) {
    client
      .maximizeWindow()
      .url(client.launch_url)
      .waitForElementVisible("body", 1000)
      .assert.title("FeedHenry HMS")
      .waitForElementNotVisible("#nprogress",2000)
      .waitForElementVisible("#monitorlist",1000)
      .assert.elementPresent("#monitorlist_head")
      .assert.elementNotPresent(".monitorlist_row")
      .end()


  }
};
