r = require('rethinkdb');
var teamPool = require('./teampool');

var tick = 250; // ms

var connection = null;

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

  var count = 0;

  // start interval over teamLoop
  var interval = setInterval( function () {
    insertTeam(count ? count : 0);
    r.table('teams').count().run(connection, function(e,r){
      count = r;
    });
    console.log();
    console.log(count);
    console.log(teamPool.length);
    if(count === teamPool.length-1) {
      clearInterval(interval);
      for(var i = 450; i > 0; i--) {
        setTimeout( function () {
          insertRandomMatch();
        }, tick);
      }
    }
  }, tick);
};

var insertTeam = function (index) {
  //var index = getRandomInt(0,teamPool.length-1);
  r.table('teams').insert({name: teamPool[index]})
  .run(connection, function(err, res) {
    if(err) throw err;
    console.log(JSON.stringify(res, null, 2));
  });
};

var getRandomMatch = function () {
  var match = {
    teams: [
    teamPool[getRandomInt(0, teamPool.length-1)],
    teamPool[getRandomInt(0, teamPool.length-1)]
    ],
    score: [getRandomInt(0,5), getRandomInt(0,5)]
  };

  if(match.score[0] === match.score[1]) {
    match.winner = '';
  } else {
    match.winner = match.score[0] > match.score[1] ? match.teams[0] : match.teams[1];
  }
  console.log(JSON.stringify(match, null, 2));
  return match;
};

var insertRandomMatch = function () {
  var match = getRandomMatch();

  r.table('matches').insert(match).run(connection, function (err,res){
    if(err) throw err;
    console.log(JSON.stringify(res, null, 2));
  });
};
