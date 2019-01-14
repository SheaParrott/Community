import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import { observer } from 'mobx-react'

class Notifications extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="marginFromHeader">
          <div className="notificationsBox columnCentering">
            <Link to="/PostWithComments">
              <section className="notificationsBox boxShadow">
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
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Notifications)
