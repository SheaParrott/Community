import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

class SignIn extends Component {
  render() {
    return (
      <div className="columnCentering">
        <h1 className="AppName">Community</h1>
        <div>
          <section className="signUp columnCentering boxShadow">
            <Link to="/login">
              <button onClick={this.signUp}>LOG IN / SIGN UP</button>
            </Link>
          </section>
        </div>
        <section className="signInMission">
          <div className="signInMissionStatements">
            <i className="fas fa-hands-helping" />
            <p className="signInMissionStatements">HELP</p>
          </div>
          <i class="fas fa-arrow-right" />
          <div className="signInMissionStatements">
            <i className="fas fa-lightbulb" />
            <p className="signInMissionStatements">INSPIRE</p>
          </div>
          <i class="fas fa-arrow-right" />
          <div className="signInMissionStatementsRight">
            <i className="fab fa-connectdevelop" />
            <p className="signInMissionStatementsRight">CONNECT</p>
          </div>
        </section>
        <section className="mission columnCentering">
          <div className="widthbig">
            <p>
              Here in the <i>Community</i> our goal is to provide a safe place
              to help one another out and spread good vibes. This is a platform
              to ask questions, seek out assistance, grow community, and maybe
              even pick up a new hobby. Thanks for taking the time to read about
              us. We hope you enjoy the <i>Community</i>.
            </p>
          </div>
        </section>
      </div>
    )
  }
}

export default SignIn
