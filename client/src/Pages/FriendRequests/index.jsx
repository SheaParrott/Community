import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class FriendRequests extends Component {
  render() {
    return (
      <>
        <Header />

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
            {/* remove friend option */}
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
            {/* remove friend option */}
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
            {/* remove friend option */}
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
            {/* remove friend option */}
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
            {/* remove friend option */}
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
            {/* remove friend option */}
            <button>Add</button>
            <button>Delete</button>
          </section>
        </div>

        <Footer />
      </>
    )
  }
}

export default FriendRequests
