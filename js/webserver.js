// httpモジュールを読み込み、インスタンスを生成
var http    = require('http');
var fs      = require('fs');
var server  = http.createServer();

// ContentType
function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  }
  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}

server.on('request', function(req, res) {
  url = (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  var pattern = /^[a-zA-Z0-9\_\-\.\/]*/g;
  var filename = url.match(pattern);

  if(url.match(/abort/)){
    server.close(); // webサーバの終了
  }

  // ファイル読込処理は時間がかかるためcallbackでノンブロッキング処理する
  fs.readFile(__dirname + filename, function (err, data) {
    // エラー発生時
    if (err) {
      res.writeHead(404, {'Content-Type' : 'text/plain'});
      res.write('page not found\n');
      res.write('filename(url):'+__dirname+filename+'('+url+')('+req.url+')\n');
      return res.end();
    }

    res.writeHead(200, {'Content-Type' : getType(filename[0])});
    res.end(data);
  });
});

server.listen(process.argv[2], "127.0.0.1");
