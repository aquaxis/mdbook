var fs      = require('fs');
var jsdom = require('jsdom').JSDOM;

filename = process.argv[2];

/*
// ファイル読込処理は時間がかかるためcallbackでノンブロッキング処理する
fs.readFile(__dirname + '/' + filename, 'utf-8', function (err, data) {
  // エラー発生時
  if (err) {
      console.log('can\'t open file.('+filename+')\n');
      return;
  }

  console.log(data);
});
*/

//var data = fs.readFileSync(filename, 'utf8');

options = {
    runScripts: 'dangerously',
    resources: "usable"
};

jsdom.fromFile(filename, '').then(function (dom) {
    var window = dom.window,
    document = window.document;

    var oldTag = '';
    var out = '';
    var h0 = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var oldLv = 0;
    var newLv = 0;
    for (var i = 0; i < h0.length; i++) {
        oldLv = oldTag.match(/[0-9]/);
        newLv = h0[i].tagName.match(/[0-9]/);

        if(newLv >= 3) continue;

        if(oldLv != newLv){
            if(oldLv < newLv){
                for(var k=0;k<(newLv-oldLv);k++){
                    out += `<ul>\n`;
                }
            }else{
                for(var k=0;k<(oldLv-newLv);k++){
                    out += `</ul>\n`;
                }
            }
        }

        out += '<li class="level'+newLv+'">';
        if(newLv == 1){
            out += '<a href="'+filename+'">'
        }

        out += h0[i].innerHTML;

        if(newLv == 1){
            out += '</a>'
        }

        out += '</li>\n';
        oldTag = h0[i].tagName;
    }

    for(var k=0;k<oldLv;k++){
        out += `</ul>\n`;
    }

    console.log(out);
}).catch (function (e) {
//    console.log(e);
});