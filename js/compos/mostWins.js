var React = require('React');
var ReactRethinkdb = require('react-rethinkdb');
var LeagueStore = require('../stores/leagueStore')();
var r = require('rethinkdb');

module.exports = React.createClass({
  mixins: [ReactRethinkdb.DefaultMixin],
  observe: LeagueStore.observeMostWins,
  render: function() {
    this.data.mostWins.value().map( function (match) {
      console.log(match);
    });
    var mostWins = 'undefined';
    return(
      <div><p>{mostWins}</p></div>
    );
  }
});
