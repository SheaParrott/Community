import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer>
        <Link className="cursive" to="/Creator">
          Creator
        </Link>
        <Link className="cursive" to="/">
          Sign In
        </Link>
        <p className="cursive">&copy; SheaParrott Productions</p>
      </footer>
    )
  }
}

export default Footer
