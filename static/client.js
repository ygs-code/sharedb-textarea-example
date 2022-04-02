/*
 * @Date: 2022-03-31 14:29:53
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-03-31 14:30:20
 * @FilePath: /sharedb-textarea-example/static/client.js
 * @Description: 
 */
 // //连接地址
      let url = "ws://127.0.0.1:8080";
      console.log('sharedbottext====',sharedbottext)
      var connection = new sharedbottext.sharedb.Connection(new WebSocket(url));

      var collection = "default";
      var id = "document-10";
      // id = id + Math.round(Math.random() * 1000);
      console.log('connection=',connection)
      var doc = connection.get(collection, id);
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
        var textarea = document.getElementById("textarea");
        console.log('textarea=',doc)
        attachTextarea(textarea, doc);
      });
    