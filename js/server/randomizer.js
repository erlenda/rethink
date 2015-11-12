r = require('rethinkdb');

var tick = 1000; // ms



var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var connection = null;
var connect = function (callback) {
  r.connect( {host: 'localhost', port: 28015}, callback);
};
var teamPool = ['team1', 'team2', 'team3', 'team4'];

var insertRandomTeam = function () {
  var index = getRandomInt(0,teamPool.length-1);
  r.table('teams').insert({name: teamPool[index]})
  .run(connection, function(err, res) {
    if(err) throw err;
    console.log(JSON.stringify(res, null, 2));
  });
};

var initTeams = function () {
  // clean up
  r.table('teams').delete().run(connection, null);

  var count=0;

  // start interval over teamLoop
  var interval = setInterval( function () {
    insertRandomTeam();
    r.table('teams').count().run(connection, function(e,r){
      count = r;
    });

    if(count === teamPool.length-1) {
      clearInterval(interval);
      insertRandomTeam();
    }
  }, tick);
};

connect(function(err, conn) {
  if (err) throw err;
  connection = conn;
  console.log('connection ok');
  initTeams();
});
