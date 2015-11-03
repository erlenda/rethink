var React = require('React');
var Table = require('./js/compos/table');
var TestConn = require('./js/compos/testConn');

React.render(
  <div className="container">
    <h1>Rethink</h1>
      <div className="row">
        <div className="col s12 m5">
          <div className="card-panel grey lighten-3">
            <Table />
            <TestConn />
          </div>
        </div>
      </div>
    </div>,
  document.getElementById('app')
);
