var React = require('React');
var ReactRethinkdb = require('react-rethinkdb');
var LeagueStore = require('../stores/leagueStore')();

var testConnection = React.createClass({
  mixins: [ReactRethinkdb.DefaultMixin],
  observe: LeagueStore.observeTeams,
  addTeam: function () {
    var value = document.getElementById('newTeamName').value;
    LeagueStore.addTeam(value);
    document.getElementById('newTeamName').value = '';
  },
  reset: function () {
    LeagueStore.resetTeams();
  },
  render: function () {
    return(
      <ul className="left">
        <li><input type="text" id="newTeamName" placeholder="teamname" /></li>
        <li><a onClick={this.addTeam} className="waves-effect waves-light btn">Add team</a></li>
        <li><a onClick={this.reset} className="waves-effect waves-light btn">Reset teams</a></li>
      </ul>
      );
  }
});

module.exports = testConnection;
