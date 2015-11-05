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
    return(
    <div>
      <a onClick={this.click} className="waves-effect waves-light btn">Test connection</a>
    </div>);
  }
});

module.exports = testConnection;
