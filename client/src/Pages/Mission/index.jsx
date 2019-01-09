import React, { Component } from 'react'
import Footer from '../../Components/Footer'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Mission extends Component {
  loadCreatorPage = () => {
    console.log('clicked')
  }
  render() {
    return (
      <div className="mission-container">
        <div className="mission">
          {/* go to previous page arrow */}
          <i className="fas fa-arrow-left" />
          <h1 className="AppName">Community</h1>
        </div>
        <div className="mission-content">
          <p>
            Here in the <i>Community</i> our goal is to provide a safe place to
            help one another out and spread good vibes. This is a platform to
            ask questions, seek out assistance, grow community, and maybe even
            pick up a new hobby. Thanks for taking the time to read about us. We
            hope you enjoy the <i>Community</i>.
          </p>

          <h5>
            Any questions or suggestions are welcome. Please click below to get
            in contact.
          </h5>
          <Link to="/Creator">
            <button onClick={this.loadCreatorPage}>Contact Us</button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Mission
