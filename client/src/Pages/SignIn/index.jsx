import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

class SignIn extends Component {
  signInAuthorization = () => {
    console.log('regular click')
  }
  googleAuthorization = () => {
    console.log('google click')
  }
  signUp = () => {
    console.log('sign up')
  }
  render() {
    return (
      <div>
        <h1 className="AppName">Community</h1>
        <section className="signIn columnCentering boxShadow">
          <p>SIGN IN</p>
          <input placeholder="Username" />
          <input placeholder="Password" />
          <Link to="/profile">
            <button onClick={this.signInAuthorization}>SUBMIT</button>
          </Link>
        </section>
        <h5>to sign up</h5>
        <section className="signUp columnCentering boxShadow">
          <Link to="/UpdateProfile">
            <button onClick={this.googleAuthorization}>
              <i className="fab fa-google-plus-g" />
              GMAIL
            </button>
          </Link>
          <p>OR</p>
          <input placeholder="Email" />
          <input placeholder="Full Name" />
          <input placeholder="Username" />
          <input placeholder="Password" />
          <Link to="/UpdateProfile">
            <button onClick={this.signUp}>SIGN UP</button>
          </Link>
        </section>
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
      </div>
    )
  }
}

export default observer(SignIn)
