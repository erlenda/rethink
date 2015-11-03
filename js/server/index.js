// Import third-party libraries (managed by npm)
var express = require('express');
var http = require('http');
var RethinkdbWebsocketServer = require('rethinkdb-websocket-server');

var websocketServer = function (start/*?*/) {
  var app = express();
  var httpServer = http.createServer(app);

  RethinkdbWebsocketServer.listen({
    httpServer: httpServer,
    httpPath: '/',
    dbHost: 'localhost',
    dbPort: 28015,
    unsafelyAllowAnyQuery: true,
  });

  httpServer.listen(8015);
  console.log('Tutorial server started');
};

module.exports = websocketServer;
