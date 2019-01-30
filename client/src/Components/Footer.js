import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer>
        <Link to="/Creator">
          <p className="cursive white">Contact Me</p>
        </Link>
        <Link to="/logout">
          <p className="cursive white"> Log out</p>
        </Link>
        <Link to="/Creator">
          <p className="cursive white">&copy; SheaParrott</p>
        </Link>
      </footer>
    )
  }
}

export default Footer
