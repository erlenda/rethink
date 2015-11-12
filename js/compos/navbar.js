var React = require('React');
var Link = require('react-router').Link;

var Navbar = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
          </div>
        </nav>
      </div>
    );
  }
});


module.exports = Navbar;
