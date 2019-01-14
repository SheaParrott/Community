import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import { observer } from 'mobx-react'

class FriendRequests extends Component {
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <div className="friendRequestsBox">
            <section className="friendRequestsBox width">
              <Link to="/Profile">
                <img
                  className="friendRequestsProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <h3>Pickle Rick</h3>
              </Link>
              <button>Add</button>
              <button>Delete</button>
            </section>
          </div>

          <div className="friendRequestsBox">
            <section className="friendRequestsBox">
              <Link to="/Profile">
                <img
                  className="friendRequestsProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <h3>Pickle Rick</h3>
              </Link>
              <button>Add</button>
              <button>Delete</button>
            </section>
          </div>

          <div className="friendRequestsBox">
            <section className="friendRequestsBox">
              <Link to="/Profile">
                <img
                  className="friendRequestsProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <h3>Pickle Rick</h3>
              </Link>
              <button>Add</button>
              <button>Delete</button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(FriendRequests)
