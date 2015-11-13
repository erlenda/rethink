var React = require('React');
var LeagueStore = require('./js/stores/leagueStore')().connect();
var Table = require('./js/compos/mostWins');
var MostWins = require('./js/compos/table');
var TestConn = require('./js/compos/testConn');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

React.render((
  <div className="container">
      <div className="row">
        <div className="col s12 m12 l12">
          <TestConn />
        </div>
      </div>

      <MostWins />

      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card-panel grey lighten-3">
            <Table />
          </div>
        </div>
      </div>
    </div>),
  document.getElementById('app')
);
