module.exports = function(RED) {

  var request = require('request');
  var endpoint = "https://api.ekispert.jp/v1/json/";

  function LowerCaseNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.stationName = config.stationName;
    this.stationCode = config.stationCode;
    var node = this;

    node.on('input', function(msg) {

      var params = {
        key: node.accessKey,
        name: node.stationName,
        code: node.stationCode
      }

      var flatParams = "";
      for(key in params){
        console.log(key + "さんの番号は、" + params[key] + "です。") ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      // var url = encodeURI(endpoint + "station?key=" + node.accessKey + "&name=" + node.stationName);
      var url = encodeURI(endpoint + "station?" + flatParams);
      console.log(url);
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
