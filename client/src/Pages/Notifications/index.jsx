import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import imageOrDefault from '../../imageOrDefault'

class Notifications extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="marginFromHeader">
          <div className="notificationsBox columnCentering">
            <section className="notificationsBox boxShadow">
              <Link to="/Profile">
                <img
                  className="notificationsBoxProfileImage"
                  src={imageOrDefault(profileimg)}
                  alt="profile"
                />
              </Link>
              <Link to="/PostWithComments">
                <h5>Pickle Rick commented on your Post</h5>
              </Link>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
