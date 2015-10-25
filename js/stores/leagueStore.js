var r = require('rethinkdb');

var leagueStore = function () {

  var initTvShows = function () {
    // connect
    r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
      if(err) throw err;

      // tbl create
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

  var testConnection = function() {
    r.connect({ host: 'localhost', port: 28015 },
      function(err, conn) {
        if(err) {
          throw err;
        } else {
          console.log('successfully connected');
          return true;
        }
      }
    );
  };

  return {
    init: init,
    testConnection: testConnection,
  };
};

module.exports = leagueStore;
