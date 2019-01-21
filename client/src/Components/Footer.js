import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer>
        <Link className="cursive white" to="/Creator">
          Contact Me
        </Link>
        <Link className="cursive white" to="/logout">
          Log out
        </Link>
        <p className="cursive">&copy; SheaParrott</p>
      </footer>
    )
  }
}

export default Footer
