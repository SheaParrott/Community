import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <p className="AppName">Community</p>
          <Link to="/profile">
            <i className="fab fa-connectdevelop header" />
          </Link>
          <Link to="/Notifications">
            <i className="fas fa-bell" />
          </Link>
        </header>
      </div>
    )
  }
}

export default Header
