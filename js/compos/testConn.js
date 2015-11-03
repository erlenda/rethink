var LeagueStore = require('../stores/leagueStore')();

var React = require('react');
var ReactRethinkdb = require('react-rethinkdb');
var r = ReactRethinkdb.r;

ReactRethinkdb.DefaultSession.connect({
  host: 'localhost',          // hostname of the websocket server
  port: 8015,                 // port number of the websocket server
  path: '/',                  // HTTP path to websocket route
  secure: false,              // set true to use secure TLS websockets
  db: 'test',                 // default database, passed to rethinkdb.connect
  autoReconnectDelayMs: 2000, // when disconnected, millis to wait before reconnect
});

var testConnection = React.createClass({
  mixins: [ReactRethinkdb.DefaultMixin],
  observe: function(props, state) {
    return {
      teams: new ReactRethinkdb.QueryRequest({
        query: r.table('teams'), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: [{teamName: "lol", id:1}],               // return [] while loading
      }),
    };
  },
  click: function () {
    var query = r.table('teams').insert({teamName: 'team1'});
    ReactRethinkdb.DefaultSession.runQuery(query)
  },
  render: function () {

    var teamDivs = this.data.teams.value().map(function(t) {
      return <div key={t.id}>{t.teamName}</div>;
    });
    return(
      <div>
        <a onClick={this.click} className="waves-effect waves-light btn">Test connection</a>
        {teamDivs}
    </div>
    );
  }
});

module.exports = testConnection;
