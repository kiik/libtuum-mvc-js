#!/usr/bin/env node

var debug = require('debug')('server');
var http = require('http');


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = this.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function setup(app) {
  var port = normalizePort(process.env.PORT || '443');
  app.set('port', app.get('port'));
}

function startup(app, server) {
  server.listen(app.get('port'));
  server.on('error', onError);
  server.on('listening', onListening);
}


module.exports = {
  serve_http: function(app) {
    setup(app);
    var server = http.createServer(app);
    startup(app, server);
    return server;
  },
  serve_https: function(app, options) {
    setup(app);
    var server = https.createServer(options, app);
    startup(app, server);
    return server;
  }
}
