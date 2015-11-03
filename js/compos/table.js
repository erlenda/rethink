var React = require('React');

var Table = React.createClass({
  render: function() {
    var teams = [
      {name: 'Team A', won: 1, lost: 2, tie: 3},
      {name: 'Team B', won: 1, lost: 2, tie: 3},
      {name: 'Team C', won: 1, lost: 2, tie: 3}
    ].map(function(team, index) {
    return
      <tr key={index}>
        <td>{team.name}</td>
        <td>{team.won}</td>
        <td>{team.lost}</td>
        <td>{team.tie}</td>
      </tr>;
    });
    return(
      <table className="highlight bordered">
       <thead>
         <tr>
             <th data-field="name">Name</th>
             <th data-field="won">Won</th>
             <th data-field="lost">Lost</th>
             <th data-field="tie">Tie</th>
         </tr>
       </thead>
       <tbody>
            {teams}
       </tbody>
     </table>
    );
  }
});

module.exports = Table;
