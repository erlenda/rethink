var React = require('React');
var ReactRethinkdb = require('react-rethinkdb');
var LeagueStore = require('../stores/leagueStore')();
var r = require('rethinkdb');

module.exports = React.createClass({
  getInitialState: function() {

    var connection = new WebSocket('ws://localhost:8015');

    connection.onopen = function () {
      console.log('onopen');
    };

    connection.onmessage = function (msg) {
      console.log('onmessage');
    };
      return {
        connection: connection,
        mostWins: 'undecided'
      };
    },
  render: function() {
    return(
      <div>{this.state.mostWins}</div>
    );
  }
});
