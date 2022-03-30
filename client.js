/*
 * @Date: 2016-05-25 15:49:21
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-03-30 18:22:33
 * @FilePath: /sharedb-textarea-example/client.js
 * @Description: 
 */
var sharedb = require("sharedb/lib/client");
var ottext = require("ot-text");

var types = require("sharedb/lib/types");
types.register(ottext.type);

exports.sharedb = sharedb;
exports.ottext = ottext;
