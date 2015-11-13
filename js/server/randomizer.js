r = require('rethinkdb');
var teamPool = require('./teampool');

var shortTick = 25,
    longTick = 1000,
    connection = null

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
          if(innerCounter === 450) {
            clearInterval(innerInterval)
          }
          insertRandomMatch();
          innerCounter++;
        }, longTick);
    }
  }, shortTick);

};

var insertTeam = function (index) {
  r.table('teams').insert({name: teamPool[index]})
  .run(connection, function(err, res) {
    if(err) throw err;
    console.log(JSON.stringify(res, null, 2));
  });
};

var getRandomMatch = function () {

  var setMatch = null;
  r.table('teams').run(connection, innerGet);
  return setMatch;

  function innerGet(err, res) {
    if(err) throw err;

    var team1 = teamPool[getRandomInt(0, teamPool.length-1)];
    var team2 = teamPool[getRandomInt(0, teamPool.length-1)];
    var team1id = 0;
    var team2id = 0;

    //console.log(cursor.toArray());
    cursor.toArray().map(function(row){
      console.log(row.name + ' === ' + team1);
      if(row.name === team1) {
        team1id = row.id;
      }

      if(row.name === team2) {
        team2id = row.id;
      }
    });

    var match = {
      team1: team1id,
      team2: team2id,
      score: [getRandomInt(0,5), getRandomInt(0,5)]
    };

    if(match.score[0] === match.score[1]) {
      match.winner = null;
    } else {
      match.winner = match.score[0] > match.score[1] ? match.team1 : match.team2;
    }
    // console.log(JSON.stringify(match, null, 2));
    setMatch = match;
  }
};

var insertRandomMatch = function () {
  var match = getRandomMatch();

  r.table('matches').insert(match).run(connection, function (err,res){
    if(err) throw err;
    //console.log(JSON.stringify(res, null, 2));
  });
};
