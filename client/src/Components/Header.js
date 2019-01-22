import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <p className="AppName whiteNoHover">Community</p>

          <div className="tooltipBottom">
            <Link to="/profile">
              {/* <i className="fab fa-connectdevelop header" /> */}
              <i className="fas fa-home header white" />
            </Link>
            <span className="tooltiptextBottom">Home</span>
          </div>

          <div className="tooltipBottom">
            <Link to="/Notifications">
              <i className="fas fa-bell white" />
            </Link>
            <span className="tooltiptextBottom">Notifications</span>
          </div>
        </header>
      </div>
    )
  }
}

export default Header
