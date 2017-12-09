module.exports = function(RED) {

  var request = require('request');
  var endpoint = "https://api.ekispert.jp/v1/json/";

  function StationNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.stationName = config.stationName;
    this.stationCode = config.stationCode;
    this.stationOldName = config.stationOldName;
    this.corporationName = config.corporationName;
    this.railName = config.railName;
    this.operationLineCode = config.operationLineCode;
    this.trafficType = config.trafficType;
    this.prefectureCode = config.prefectureCode;
    this.offset = config.offset;
    this.limit = config.limit;
    this.direction = config.direction;
    this.corporationBind = config.corporationBind;
    this.gcs = config.gcs;
    var node = this;

    node.on('input', function(msg) {

      var params = {
        key: node.accessKey,
        name: node.stationName,
        code: node.stationCode,
        oldName: node.stationOldName,
        corporationName: node.corporationName,
        railName: node.railName,
        operationLineCode: node.operationLineCode,
        type: node.trafficType,
        prefectureCode: node.prefectureCode,
        offset: node.offset,
        limit: node.limit,
        direction: node.direction,
        corporationBind: node.corporationBind,
        gcs: node.gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + "さんの番号は、" + params[key] + "です。") ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

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
  RED.nodes.registerType("station",StationNode);

  function SearchMultipleRangeNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.baseList = config.baseList;
    this.upperMinute = config.upperMinute;
    this.upperTransferCount = config.upperTransferCount;
    this.plane = config.plane;
    this.shinkansen = config.shinkansen;
    this.limitedExpress = config.limitedExpress;
    this.limit = config.limit;
    var node = this;

    node.on('input', function(msg) {

      var params = {
        key: node.accessKey,
        baseList: node.baseList,
        upperMinute: node.upperMinute,
        upperTransferCount: node.upperTransferCount,
        plane: node.plane,
        shinkansen: node.shinkansen,
        limitedExpress: node.limitedExpress,
        limit: node.limit
      }

      var flatParams = "";
      for(key in params){
        console.log(key + "さんの番号は、" + params[key] + "です。") ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "search/multipleRange?" + flatParams);
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
  RED.nodes.registerType("search",SearchMultipleRangeNode);
}
