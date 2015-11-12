var React = require('react');
var ReactRethinkdb = require('react-rethinkdb');
var r = ReactRethinkdb.r;

var leagueStore = function () {
  var connected = false;

  var connect = function () {
    ReactRethinkdb.DefaultSession.connect({
      host: 'localhost',          // hostname of the websocket server
      port: 8015,                 // port number of the websocket server
      path: '/',                  // HTTP path to websocket route
      secure: false,              // set true to use secure TLS websockets
      db: 'test',                 // default database, passed to rethinkdb.connect
      autoReconnectDelayMs: 2000, // when disconnected, millis to wait before reconnect
    });
  };

  var observeTeams = function(props, state) {
    return {
      teams: new ReactRethinkdb.QueryRequest({
        query: r.table('teams'),  // query
        changes: true,            // subscribe
        initial: [],              // while loading
      })
    };
  };

  var addTeam = function(name) {
    var query = r.table('teams').insert({name: name, won: 0, lost: 0, tie: 0});
    ReactRethinkdb.DefaultSession.runQuery(query)
  };

  var resetTeams = function() {
    var query = r.table('teams').delete();
    ReactRethinkdb.DefaultSession.runQuery(query)
  } ;

  return {
    connect: connect,
    observeTeams: observeTeams,
    addTeam: addTeam,
    resetTeams: resetTeams
  };
};

module.exports = leagueStore;
