var fs = require("fs");
var fs_html = require("fs");

var marked = require("./marked.js");
var markedtext = "";

var filename = process.argv[2];

if(filename == ''){
  console.log("Error");
}

// markdown filename
var mdname = filename+".md";
// html filename
var htmlname = filename+".html";
// css filename
var cssname = filename+".css";

// ファイル読み込み
data = fs.readFileSync(mdname, "utf-8");

// markdown化
markedtext = marked(data);

// header
var header = '<!DOCTYPE html>\n';
header += '<html>\n';
header += '<head>\n';
header += '<title>'+filename+'</title>\n';
header += '<meta charset="UTF-8">\n';
header += '<link rel="stylesheet" href="/css/' + cssname + '">\n';
header += '</head>\n';
header += '<body>\n';

// footer
var footer = '</body>\n';
footer += '</html>\n';

var text = header;
text += markedtext;
text += `\n`;
text += footer;

// 同期で行う場合
try {
  fs_html.writeFileSync(htmlname, text);
}catch(e){
  console.log(e);
}
