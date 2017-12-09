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

      var accessKey = node.accessKey || msg.accessKey;
      var stationName = node.stationName || msg.stationName;
      var stationCode = node.stationCode || msg.stationCode;
      var stationOldName = node.stationOldName || msg.stationOldName;
      var corporationName = node.corporationName || msg.corporationName;
      var railName = node.railName || msg.railName;
      var operationLineCode = node.operationLineCode || msg.operationLineCode;
      var trafficType = node.trafficType || msg.trafficType;
      var prefectureCode = node.prefectureCode || msg.prefectureCode;
      var offset = node.offset || msg.offset;
      var limit = node.limit || msg.limit;
      var direction = node.direction || msg.direction;
      var corporationBind = node.corporationBind || msg.corporationBind;
      var gcs = node.gcs || msg.gcs;


      var params = {
        key: accessKey,
        name: stationName,
        code: stationCode,
        oldName: stationOldName,
        corporationName: corporationName,
        railName: railName,
        operationLineCode: operationLineCode,
        type: trafficType,
        prefectureCode: prefectureCode,
        offset: offset,
        limit: limit,
        direction: direction,
        corporationBind: corporationBind,
        gcs: gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
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
