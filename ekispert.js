module.exports = function(RED) {

  function LowerCaseNode(config) {
    RED.nodes.createNode(this,config);

    console.log("key1:" + config.accessKey);
    this.accessKey = config.accessKey;
    var node = this;
    node.on('input', function(msg) {
      console.log("key: " + node.accessKey);
      node.send(msg);
    });
  }
  RED.nodes.registerType("ekispert",LowerCaseNode);
}
