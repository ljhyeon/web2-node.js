var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while(i<filelist.length){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {  // 루트인 경우!
      if(queryData.id === undefined) {
        fs.readdir('./data', function(err, filelist) {
          title = 'Welcome';
          var description = 'Hello, node.js';
          var list = templateList(filelist);
          var body = `<h2>${title}</h2><p>${description}</p>`;
          var template = templateHTML(title, list, body);
          response.writeHead(200);
          response.end(template);
        });
      } else {
        fs.readdir('./data', function(error, filelist) {
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
              var title = queryData.id;
              var list = templateList(filelist);
              var body = `<h2>${title}</h2><p>${description}</p>`;
              var template = templateHTML(title, list, body);
              response.writeHead(200);
              response.end(template);
          });
        });
      }
    }
    else {  // 루트가 아닌 경우
      response.writeHead(404);
      response.end('not found');
    }
});
app.listen(3000);