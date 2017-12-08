module.exports = function(RED) {

  function StationNode(config) {
    RED.nodes.createNode(this, config);

    this.accessKey = config.accessKey;
    console.log("accesskey:" + this.accessKey);
    this.stationName = config.stationName;
    this.stationCode = config.stationCode;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey;
      console.log("accesskey: " + accessKey);
      node.send(msg);

    });
  }

  RED.nodes.registerType("aaaaa",StationNode);
}
