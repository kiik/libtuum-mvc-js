#!/usr/bin/env node

var debug = require('debug')('server');
var http = require('http');


function onErrorFactory(port) {
  return function onError(error) {
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
  app.set('port', port);
}

function startup(app, server) {
  var port = app.get('port');
  server.listen(port);
  server.on('error', onErrorFactory(port));
  server.on('listening', onListening);
}


module.exports = {
  serve_http: function(app) {
    setup(app);
    var server = http.createServer(app);
    debug('Starting http server on port ' + app.get('port'));
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
