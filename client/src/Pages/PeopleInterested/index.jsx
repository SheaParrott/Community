import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class MyCommunity extends Component {
  render() {
    return (
      <>
        <Header />

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <div className="PeopleInterestedBox">
          <section className="PeopleInterestedBox">
            <Link to="/Profile">
              <img
                className="PeopleInterestedProfileImage"
                src={profileimg}
                alt="profile"
              />
            </Link>
            <Link to="/Profile">
              <h3 className="PeopleInterested">Pickle Rick</h3>
            </Link>
            {/* add to my community option */}
            <i className="fas fa-ellipsis-v" />
          </section>
        </div>

        <Footer />
      </>
    )
  }
}

export default MyCommunity
