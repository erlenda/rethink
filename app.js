var React = require('React');
var Table = require('./js/compos/table');

React.render(
  <div className="row">
    <div className="col s12 m5">
      <div className="card-panel grey lighten-3">
        <Table />
      </div>
    </div>
  </div>,
  document.getElementById('app')
);
