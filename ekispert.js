module.exports = function(RED) {

  var request = require('request');

  function LowerCaseNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    var node = this;
    node.on('input', function(msg) {
      var url = encodeURI("https://api.ekispert.jp/v1/json/station?key=" + node.accessKey);
      // node.send(msg);

      request(url, function (error, response, body) {
        if (!error) {
          msg.payload = JSON.parse(body);
          node.send(msg);
        } else {
          node.error(error);
        }
      });
    });
  }
  RED.nodes.registerType("ekispert",LowerCaseNode);
}
