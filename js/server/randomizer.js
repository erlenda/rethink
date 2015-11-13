r = require('rethinkdb');
var teamPool = require('./teampool');

var shortTick = 25,
longTick = 1000,
connection = null
matchesNo = 1;

var connect = function (callback) {
  r.connect( {host: 'localhost', port: 28015}, callback);
};

connect(function(err, conn) {
  if (err) throw err;
  connection = conn;
  console.log('connection ok');
  initTeams();
});

function getRandomInt(min, max) {
  var s =  Math.floor(Math.random() * (max - min + 1)) + min;
  return s ? s : 0;
}

var initTeams = function () {
  // clean up
  r.table('teams').delete().run(connection, null);
  r.table('matches').delete().run(connection, null);
  var count = 0;

  // start interval over teamLoop
  var interval = setInterval( function () {
    insertTeam(count ? count : 0);

    r.table('teams').count().run(connection, function(e,r){
      count = r;
    });

    var innerCounter = 1;

    if(count === teamPool.length-1) {
      clearInterval(interval);
      var innerInterval = setInterval( function () {
        if(innerCounter === matchesNo) {
          clearInterval(innerInterval)
        }
        insertRandomMatch();
        innerCounter++;
      }, longTick);
    }
  }, shortTick);

};


var insertRandomMatch = function () {
  getRandomMatch(function(match){
    r.table('matches').insert(match).run(connection, function (err,res) {
      if(err) throw err;
      console.log(JSON.stringify(res, null, 2));
    });
  });
};

var insertTeam = function (index) {
  r.table('teams').insert({name: teamPool[index]})
  .run(connection, function(err, res) {
    if(err) throw err;
    console.log(JSON.stringify(res, null, 2));
  });
};

function getRandomMatch(callback) {

  r.table('teams').run(connection, function (err, res) {
    if(err) throw err;
    res.toArray( function (err, res) {
      if(err) throw err;
      var teamId1 = '';
      var teamId2 = '';

      var idx1 = getRandomInt(0, teamPool.length-1);
      var idx2 = getRandomInt(0, teamPool.length-1)
      var team1 = teamPool[idx1];
      var team2 = teamPool[idx2];

      res.map(function (row) {
        console.log(JSON.stringify(row, null, 2));
        if(row.name === team1) {
          teamId1 = row.id;
        }
        if(row.name === team2) {
          teamId2 = row.id;
        }
      });

      var match = {
        team1: teamId1,
        team2: teamId2,
        score: [getRandomInt(0,5), getRandomInt(0,5)]
      };

      match.winner = match.score[0] > match.score[1] ? match.team1 : match.team2;
      //console.log(JSON.stringify(match, null, 2));

      return callback(match);
    });
  });

  }
