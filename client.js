/*
 * @Date: 2016-05-25 15:49:21
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-04-02 19:02:54
 * @FilePath: /sharedb-textarea-example/client.js
 * @Description:
 */

import sharedb from "sharedb/lib/client";
import ottext from "ot-text";
import types from "sharedb/lib/types";
import ReconnectingWebSocket from "reconnecting-websocket";
const { applyChange, attachTextarea } = require("./textarea");
console.log("attachTextarea=", attachTextarea);

// exports.sharedb = sharedb;
// exports.ottext = ottext;

window.onload = function () {
  //连接地址
  let url = "ws://127.0.0.1:8088";
  var socket = new ReconnectingWebSocket("ws://127.0.0.1:8088");
  console.log("socket======");
  var connection = new sharedb.Connection(socket);
  types.register(ottext.type);
  var collection = "default";
  var id = "document-10";
  // id = id + Math.round(Math.random() * 1000);
  console.log("connection1=", connection); 
  var doc = connection.get(collection, id);
  console.log('doc==',doc)
  doc.subscribe(function (error) {
    if (error) {
      console.log("Failed to subscribe.", error);
    }
    if (!doc.type) {
      console.log("creating");
      var defaultData = "";
      var ottype = ottext.type.name;
      var source = true;
      var callback = function () {
        console.log(arguments);
      };
      doc.create(defaultData, ottype, source, callback);
    }
    var textareaDom = document.getElementById("textarea");
    console.log("textareaDom=", doc);
    // console.log("attachTextarea=", attachTextarea);
    attachTextarea(textareaDom, doc);
  });
};
