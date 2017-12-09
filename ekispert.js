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

      var accessKey = node.accessKey || msg.accessKey;
      var baseList = node.baseList || msg.baseList;
      var upperMinute = node.upperMinute || msg.upperMinute;
      var upperTransferCount = node.upperTransferCount || msg.upperTransferCount;
      var plane = node.plane || msg.plane;
      var shinkansen = node.shinkansen || msg.shinkansen;
      var limitedExpress = node.limitedExpress || msg.limitedExpress;
      var limit = node.limit || msg.limit;

      var params = {
        key: accessKey,
        baseList: baseList,
        upperMinute: upperMinute,
        upperTransferCount: upperTransferCount,
        plane: plane,
        shinkansen: shinkansen,
        limitedExpress: limitedExpress,
        limit: limit
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
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
  RED.nodes.registerType("search range",SearchMultipleRangeNode);

  function SearchNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.from = config.from;
    this.to = config.to;
    this.via = config.via;
    this.date = config.date;
    this.time = config.time;
    this.searchType = config.searchType;
    this.plane = config.plane;
    this.shinkansen = config.shinkansen;
    this.limitedExpress = config.limitedExpress;
    this.redirect = config.redirect;
    this.contentsMode = config.contentsMode;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var from = node.from || msg.from;
      var to = node.to || msg.to;
      var via = node.via || msg.via;
      var date = node.date || msg.date;
      var time = node.time || msg.time;
      var searchType = node.searchType || msg.searchType;
      var plane = node.plane || msg.plane;
      var shinkansen = node.shinkansen || msg.shinkansen;
      var limitedExpress = node.limitedExpress || msg.limitedExpress;
      var redirect = node.redirect || msg.redirect;
      var contentsMode = node.contentsMode || msg.contentsMode;

      var params = {
        key: accessKey,
        from: from,
        to: to,
        via: via,
        date: date,
        time: time,
        searchType: searchType,
        plane: plane,
        shinkansen: shinkansen,
        limitedExpress: limitedExpress,
        redirect: redirect,
        contentsMode: contentsMode
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "search/course/light?" + flatParams);
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
  RED.nodes.registerType("search",SearchNode);

  function StationInfoNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.stationCode = config.stationCode;
    this.infoType = config.infoType;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var stationCode = node.stationCode || msg.stationCode;
      var infoType = node.infoType || msg.infoType;

      var params = {
        key: accessKey,
        code: stationCode,
        type: infoType
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "search/station/info?" + flatParams);
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
  RED.nodes.registerType("station info",StationInfoNode);

}
