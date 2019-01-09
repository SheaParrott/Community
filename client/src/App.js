import React, { Component } from 'react'
import './App.css'
// tools
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// pages
import SignIn from './Pages/SignIn/index'
import Profile from './Pages/Profile/index'
import UpdateProfile from './Pages/UpdateProfile/index'
import Posts from './Pages/Posts/index'
import PostWithComments from './Pages/PostWithComments/index'
import Creator from './Pages/Creator/index'
import Mission from './Pages/Mission/index'
import MyCommunity from './Pages/MyCommunity/index'
import PeopleInterested from './Pages/PeopleInterested/index'
import Notifications from './Pages/Notifications/index'
import CreateAPost from './Pages/CreateAPost/index'
import FriendRequests from './Pages/FriendRequests/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={SignIn} />
          <Route path="/SignIn/" component={SignIn} />
          <Route path="/Notifications/" component={Notifications} />
          <Route path="/Profile/" component={Profile} />
          <Route path="/UpdateProfile/" component={UpdateProfile} />
          <Route path="/MyCommunity/" component={MyCommunity} />
          <Route path="/FriendRequests/" component={FriendRequests} />
          <Route path="/CreateAPost/" component={CreateAPost} />
          <Route path="/Posts/" component={Posts} />
          <Route path="/PostWithComments/" component={PostWithComments} />
          <Route path="/PeopleInterested/" component={PeopleInterested} />
          <Route path="/Creator/" component={Creator} />
          <Route path="/Mission/" component={Mission} />
        </div>
      </Router>
    )
  }
}

export default App
// ~COMMUNITY APP~
// expand your world and build community
// help & build eachother up app
// inspirational quotes
// good vibes

// sign in page
//
//

// in profile
// picture
// hobbies
// interests
// skills
// struggles
// - inspirational quotes to be added here
//    - strive past struggles and build yourself and others
// top 3 of what may interest you
//predefine all the categories - gavins suggestion (:

// request box
// - hash search option
// - picture, (help, interested in getting into, group meet)
//   - include hash tag on requests

// new feed option
// - what friends are up to
// - things that are related to your profile info

// Things missing:
// [x] create a post component
// [x] add to your request to join community option
// [x] see more in my community
//     - make a my community page
// [x] what i want to do, what i can do, what need help doing
// [x] add some sort of back button to Mission and Creater pages
// [] add in default inspirational quotes and inspirational quotes section
// [x] page for updating profile page
//  - picture
//  - strengths
//  - about me
//  - struggles

// to do:
// [x] add react router
// [x] add axios
// [] learn and add in accordian
// [] make Notification bell light up when new Notifications are present
//    - make notifications page or drop down menu aka accordian

// accordian -- drop down menus
// SCSS
// bulma or bootstrap
//  - templates for pluguins

//  to do next
//  - make folders for pages
//  - add in react router
