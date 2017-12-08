module.exports = function(RED) {

  var request = require('request');
  var endpoint = "https://api.ekispert.jp/v1/json/";

  function LowerCaseNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.stationName = config.stationName;
    this.stasionCode = config.stasionCode;
    var node = this;

    node.on('input', function(msg) {

      var url = encodeURI(endpoint + "station?key=" + node.accessKey + "&name=" + node.stationName);

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
