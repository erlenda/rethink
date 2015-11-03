var React = require('React');
var ReactRethinkdb = require('react-rethinkdb');
var LeagueStore = require('../stores/leagueStore')();


var testConnection = React.createClass({
  mixins: [ReactRethinkdb.DefaultMixin],
  observe: LeagueStore.observeTeams,
  click: function () {
    LeagueStore.addTeam('test123');
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
