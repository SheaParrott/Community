import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <a href="#">
            <i className="fas fa-bars" />
          </a>
          <Link to="/profile">
            <i className="fab fa-connectdevelop" />
          </Link>
          <Link to="Notifications">
            <i className="fas fa-bell" />
          </Link>
        </header>
      </div>
    )
  }
}

export default Header
