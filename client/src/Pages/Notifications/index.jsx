import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class Notifications extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="notificationsBox">
          <Link to="/PostWithComments">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick commented on your Post</h5>
            </section>
          </Link>
          <Link to="/FriendRequests">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick requested to join your community</h5>
            </section>
          </Link>
          <Link to="/PostWithComments">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick commented on your Post</h5>
            </section>
          </Link>
          <Link to="/FriendRequests">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick requested to join your community</h5>
            </section>
          </Link>
          <Link to="/PostWithComments">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick commented on your Post</h5>
            </section>
          </Link>
          <Link to="/FriendRequests">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick requested to join your community</h5>
            </section>
          </Link>
          <Link to="/PostWithComments">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick commented on your Post</h5>
            </section>
          </Link>
          <Link to="/FriendRequests">
            <section className="notificationsBox">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <h5>Pickle Rick requested to join your community</h5>
            </section>
          </Link>
        </div>
        <Footer />
      </>
    )
  }
}

export default Notifications
