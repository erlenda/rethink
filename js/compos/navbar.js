var React = require('React');
var Link = require('react-router').Link;

var Navbar = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <ul className="left">
              <li><Link to="">home</Link></li>
              <li><Link to="/testconn">testconn</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});


module.exports = Navbar;
