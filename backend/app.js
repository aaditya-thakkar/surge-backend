const http = require('http');
var nodeGenerator = require('./nodeGenerator');

const server = http.createServer(function (req, res) {
  res.end();
  console.log("started");
});
nodeGenerator();

server.on('clientError', function (err, socket) {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(3002);
