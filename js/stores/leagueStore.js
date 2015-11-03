var React = require('react');
var ReactRethinkdb = require('react-rethinkdb');
var r = require('rethinkdb');

var leagueStore = function () {
  var init = function () {
    // tbl create
    r.connect(connCfg, function(err, conn) {
      r.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
        if(err) throw err;
        console.log(res);
        // table insert
        r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
        {
          if(err) throw err;
          console.log(res);
        });
      });
    });
  };

  var conn = function () {
    console.log('conn() runs');
    var connection = null;
    r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
        if (err) throw err;
        connection = conn;
        console.log('conn set');
    })
  };

  return {
    init: init,
    conn: conn,
  };
};

module.exports = leagueStore;
