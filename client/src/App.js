import React, { Component } from 'react'
import './App.css'
// tools
import { Router, Route } from 'react-router-dom'
// pages
import SignIn from './Pages/SignIn/index'
import Profile from './Pages/Profile/index'
import UpdateProfile from './Pages/UpdateProfile/index'
import Posts from './Pages/Posts/index'
import PostWithComments from './Pages/PostWithComments/index'
import Creator from './Pages/Creator/index'
import Notifications from './Pages/Notifications/index'
import Footer from './Components/Footer'

import auth from './auth'

import history from './history'

import axios from 'axios'

class App extends Component {
  componentWillMount = () => {
    if (auth.isAuthenticated()) {
      axios.defaults.headers.common = {
        Authorization: auth.authorizationHeader()
      }
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="background">
          <div className="largestViewWidth">
            <div className="App">
              <Route path="/" exact component={SignIn} />
              <Route path="/SignIn/" component={SignIn} />

              <Route path="/login" render={() => auth.login()} />
              <Route
                path="/logout"
                render={() => {
                  auth.logout()

                  return <></>
                }}
              />

              <Route
                path="/callback"
                render={() => {
                  auth.handleAuthentication(() => {
                    axios.defaults.headers.common = {
                      Authorization: auth.authorizationHeader()
                    }
                  })

                  return <></>
                }}
              />
              <Route path="/Notifications/" component={Notifications} />
              <Route exact path="/Profile" component={Profile} />
              <Route exact path="/Profile/:id" component={Profile} />
              <Route path="/UpdateProfile/:id" component={UpdateProfile} />
              <Route
                path="/Profile/:profile_id/posts/:kind"
                component={Posts}
              />
              <Route
                path="/PostWithComments/:post_id"
                component={PostWithComments}
              />
              <Route path="/Creator/" component={Creator} />
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
