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

  function SearchCourseLightNode(config) {
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
  RED.nodes.registerType("search course light",SearchCourseLightNode);

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

  function OperationLineNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.operationLineCode = config.operationLineCode;
    this.operationLineName = config.operationLineName;
    this.corporationCode = config.corporationCode;
    this.corporationName = config.corporationName;
    this.prefectureCode = config.prefectureCode;
    this.date = config.date;
    this.offset = config.offset;
    this.limit = config.limit;
    this.gcs = config.gcs;

    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var operationLineCode = node.operationLineCode || msg.operationLineCode;
      var operationLineName = node.operationLineName || msg.operationLineName;
      var corporationCode = node.corporationCode || msg.corporationCode;
      var corporationName = node.corporationName || msg.corporationName;
      var prefectureCode = node.prefectureCode || msg.prefectureCode;
      var date = node.date || msg.date;
      var offset = node.offset || msg.offset;
      var limit = node.limit || msg.limit;
      var gcs = node.gcs || msg.gcs;

      var params = {
        key: accessKey,
        code: operationLineCode,
        name: operationLineName,
        corporationCode: corporationCode,
        corporationName: corporationName,
        prefectureCode: prefectureCode,
        date: date,
        offset: offset,
        limit: limit,
        gcs: gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "operationLine?" + flatParams);
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
  RED.nodes.registerType("operation line",OperationLineNode);

  function RailNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.railName = config.railName;
    this.railOldName = config.railOldName;
    this.corporationCode = config.corporationCode;
    this.corporationName = config.corporationName;
    this.from = config.from;
    this.to = config.to;
    this.prefectureCode = config.prefectureCode;
    this.date = config.date;
    this.trafficType = config.trafficType;
    this.offset = config.offset;
    this.limit = config.limit;
    this.serializeData = config.serializeData;
    this.checkEngineVersion = config.checkEngineVersion;
    this.sectionIndex = config.sectionIndex;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var railName = node.railName || msg.railName;
      var railOldName = node.railOldName || msg.railOldName;
      var corporationCode = node.corporationCode || msg.corporationCode;
      var corporationName = node.corporationName || msg.corporationName;
      var from = node.from || msg.from;
      var to = node.to || msg.to;
      var prefectureCode = node.prefectureCode || msg.prefectureCode;
      var date = node.date || msg.date;
      var trafficType = node.trafficType || msg.trafficType;
      var offset = node.offset || msg.offset;
      var limit = node.limit || msg.limit;
      var serializeData = node.serializeData || msg.serializeData;
      var checkEngineVersion = node.checkEngineVersion || msg.checkEngineVersion;
      var sectionIndex = node.sectionIndex || msg.sectionIndex;


      var params = {
        key: accessKey,
        name: railName,
        oldName: railOldName,
        corporationCode: corporationCode,
        corporationName: corporationName,
        from: from,
        to: to,
        prefectureCode: prefectureCode,
        date: date,
        type: trafficType,
        offset: offset,
        limit: limit,
        serializeData: serializeData,
        checkEngineVersion: checkEngineVersion,
        sectionIndex: sectionIndex
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "rail?" + flatParams);
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
  RED.nodes.registerType("rail",RailNode);

  function CorporationNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.corporationCode = config.corporationCode;
    this.corporationName = config.corporationName;
    this.prefectureCode = config.prefectureCode;
    this.corporationType = config.corporationType;
    this.corporationOldName = config.corporationOldName;
    this.offset = config.offset;
    this.limit = config.limit;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var corporationCode = node.corporationCode || msg.corporationCode;
      var corporationName = node.corporationName || msg.corporationName;
      var prefectureCode = node.prefectureCode || msg.prefectureCode;
      var corporationType = node.corporationType || msg.corporationType;
      var corporationOldName = node.corporationOldName || msg.corporationOldName;
      var offset = node.offset || msg.offset;
      var limit = node.limit || msg.limit;


      var params = {
        key: accessKey,
        code: corporationCode,
        name: corporationName,
        prefectureCode: prefectureCode,
        type: corporationType,
        oldName: corporationOldName,
        offset: offset,
        limit: limit
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "corporation?" + flatParams);
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
  RED.nodes.registerType("corporation",CorporationNode);

  function DataversionNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;

      var params = {
        key: accessKey
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "dataversion?" + flatParams);
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
  RED.nodes.registerType("dataversion",DataversionNode);

  function SearchCourseExtremeNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.viaList = config.viaList;
    this.fixedRailList = config.fixedRailList;
    this.fixedRailDirectionList = config.fixedRailDirectionList;
    this.date = config.date;
    this.time = config.time;
    this.searchType = config.searchType;
    this.sort = config.sort;
    this.answerCount = config.answerCount;
    this.searchCount = config.searchCount;
    this.conditionDetail = config.conditionDetail;
    this.corporationBind = config.corporationBind;
    this.interruptCorporationList = config.interruptCorporationList;
    this.interruptRailList = config.interruptRailList;
    this.resultDetail = config.resultDetail;
    this.addOperationLinePattern = config.addOperationLinePattern;
    this.assignRoute = config.assignRoute;
    this.assignDetailRoute = config.assignDetailRoute;
    this.assignNikukanteikiIndex = config.assignNikukanteikiIndex;
    this.coupon = config.coupon;
    this.bringAssignmentError = config.bringAssignmentError;
    this.addChange = config.addChange;
    this.gcs = config.gcs;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var viaList = node.viaList || msg.viaList;
      var fixedRailList = node.fixedRailList || msg.fixedRailList;
      var fixedRailDirectionList = node.fixedRailDirectionList || msg.fixedRailDirectionList;
      var date = node.date || msg.date;
      var time = node.time || msg.time;
      var searchType = node.searchType || msg.searchType;
      var sort = node.sort || msg.sort;
      var answerCount = node.answerCount || msg.answerCount;
      var searchCount = node.searchCount || msg.searchCount;
      var conditionDetail = node.conditionDetail || msg.conditionDetail;
      var corporationBind = node.corporationBind || msg.corporationBind;
      var interruptCorporationList = node.interruptCorporationList || msg.interruptCorporationList;
      var interruptRailList = node.interruptRailList || msg.interruptRailList;
      var resultDetail = node.resultDetail || msg.resultDetail;
      var addOperationLinePattern = node.addOperationLinePattern || msg.addOperationLinePattern;
      var assignRoute = node.assignRoute || msg.assignRoute;
      var assignDetailRoute = node.assignDetailRoute || msg.assignDetailRoute;
      var assignNikukanteikiIndex = node.assignNikukanteikiIndex || msg.assignNikukanteikiIndex;
      var coupon = node.coupon || msg.coupon;
      var bringAssignmentError = node.bringAssignmentError || msg.bringAssignmentError;
      var addChange = node.addChange || msg.addChange;
      var gcs = node.gcs || msg.gcs;


      var params = {
        key: accessKey,
        viaList: viaList,
        fixedRailList: fixedRailList,
        fixedRailDirectionList: fixedRailDirectionList,
        date: date,
        time: time,
        searchType: searchType,
        sort: sort,
        answerCount: answerCount,
        searchCount: searchCount,
        conditionDetail: conditionDetail,
        corporationBind: corporationBind,
        interruptCorporationList: interruptCorporationList,
        interruptRailList: interruptRailList,
        resultDetail: resultDetail,
        addOperationLinePattern: addOperationLinePattern,
        assignRoute: assignRoute,
        assignDetailRoute: assignDetailRoute,
        assignNikukanteikiIndex: assignNikukanteikiIndex,
        coupon: coupon,
        bringAssignmentError: bringAssignmentError,
        addChange: addChange,
        gcs: gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "search/course/extreme?" + flatParams);
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
  RED.nodes.registerType("search course extreme",SearchCourseExtremeNode);

  function SearchCoursePlainNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.from = config.from;
    this.to = config.to;
    this.via = config.via;
    this.date = config.date;
    this.plane = config.plane;
    this.shinkansen = config.shinkansen;
    this.limitedExpress = config.limitedExpress;
    this.bus = config.bus;
    this.gcs = config.gcs;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var from = node.from || msg.from;
      var to = node.to || msg.to;
      var via = node.via || msg.via;
      var date = node.date || msg.date;
      var plane = node.plane || msg.plane;
      var shinkansen = node.shinkansen || msg.shinkansen;
      var limitedExpress = node.limitedExpress || msg.limitedExpress;
      var bus = node.bus || msg.bus;
      var gcs = node.gcs || msg.gcs;

      var params = {
        key: accessKey,
        from: from,
        to: to,
        via: via,
        date: date,
        plane: plane,
        shinkansen: shinkansen,
        limitedExpress: limitedExpress,
        bus: bus,
        gcs: gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "search/course/plain?" + flatParams);
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
  RED.nodes.registerType("search course plain",SearchCoursePlainNode);

  function GeoStationNode(config) {
    RED.nodes.createNode(this,config);

    this.accessKey = config.accessKey;
    this.geoPoint = config.geoPoint;
    this.trafficType = config.trafficType;
    this.corporationBind = config.corporationBind;
    this.addGateGroup = config.addGateGroup;
    this.gcs = config.gcs;
    var node = this;

    node.on('input', function(msg) {

      var accessKey = node.accessKey || msg.accessKey;
      var geoPoint = node.geoPoint || msg.geoPoint;
      var trafficType = node.trafficType || msg.trafficType;
      var corporationBind = node.corporationBind || msg.corporationBind;
      var addGateGroup = node.addGateGroup || msg.addGateGroup;
      var gcs = node.gcs || msg.gcs;


      var params = {
        key: accessKey,
        geoPoint: geoPoint,
        type: trafficType,
        corporationBind: corporationBind,
        addGateGroup: addGateGroup,
        gcs: gcs
      }

      var flatParams = "";
      for(key in params){
        console.log(key + ": " + params[key]) ;
        if(params[key]) {
          flatParams += key + "=" + params[key] + "&";
        }
      }

      var url = encodeURI(endpoint + "geo/station?" + flatParams);
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
  RED.nodes.registerType("geo station",GeoStationNode);
}
