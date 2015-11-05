var React = require('React');
var LeagueStore = require('./js/stores/leagueStore')().connect();
var Table = require('./js/compos/table');
var TestConn = require('./js/compos/testConn');

React.render(
  <div className="container">
    <h1>Rethink</h1>
      <div className="row">
        <div className="col s12 m5">
          <div className="card-panel grey lighten-3">
            <TestConn />
            <Table />
          </div>
        </div>
      </div>
    </div>,
  document.getElementById('app')
);
