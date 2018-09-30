// content of index.js
const http = require('http')
const fs = require('fs');
const url = require('url');
const path = require('path');
const port = 80

const requestHandler = (request, response) => {
  var isScript = /\.\/\w*(\w|-)\w*\.js/;
  var q = url.parse(request.url, true);
  var filename = "." + q.pathname;
  console.log("Requested "+filename);
  if (filename == "./") {
    filename = "./index.html"
  }
  fs.readFile(filename, function (err, data) {
    if (err) {
      console.log("Path not available.");
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end("404 Not Found");
} else if (path.extname(filename) == ".html") {
      console.log("Sending html...");
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
      console.log("Sent html: " + filename);
    } else if (isScript.test(filename)) {
      console.log("Sending script...");
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.write(data);
      response.end();
      console.log("Sent script :" + filename);
    } else if (filename == "./favicon.ico") {
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.write(data);
      response.end();
    }

  });

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
