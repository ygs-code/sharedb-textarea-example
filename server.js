/*
 * @Date: 2022-03-30 09:45:58
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-04-02 19:01:41
 * @FilePath: /sharedb-textarea-example/server.js
 * @Description: 
 */
//http
var http = require("http");
// ot
var sharedb = require("sharedb");
// op
var connect = require("connect");
// ws 通信
var WebSocket = require("ws");
var Duplex = require("stream").Duplex;

// Register text type in server
var ottext = require("ot-text");
var types = require("sharedb/lib/types");

types.register(ottext.type);

var server = http.createServer(
  //设置静态目录
  connect().use(connect['static'](__dirname + "/static")
  )
);

var wss = new WebSocket.Server({
  server: server
});
var share = sharedb();

wss.on("connection", function (ws, req) {
  var stream = new Duplex({
    objectMode: true
  });

  stream.headers = ws.upgradeReq.headers;
  stream.remoteAddress = ws.upgradeReq.connection.remoteAddress;
  console.log("remote address:" + stream.remoteAddress);
  stream._write = function (op, encoding, next) {
    ws.send(JSON.stringify(op));
    next();
  };
  stream._read = function () { };
  stream.on("error", function (msg) {
    ws.close();
  });
  stream.on("end", function () {
    ws.close();
  });
  // 发送信息
  ws.on("message", function (op) {
    console.log('op', JSON.stringify(JSON.parse(op), null, 2));
    console.log()
    stream.push(op);
  });
  ws.on("close", function () {
    stream.push(null);
    stream.emit("close");
    stream.emit("end");
    stream.end();
  });

  share.listen(stream);
});
var port = 8088;
server.listen(port, function () {
  return console.log("Listening on " + port);
});
