import React, { Component } from 'react'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//
// three lines is called a hamburger menu
//
class Post extends Component {
  render() {
    return (
      <div>
        <section className="requestBoxCentering">
          <section className="requestBox">
            <div className="requestBoxTopBar">
              <Link to="/Profile">
                <img
                  className="requestBoxProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link to="/Profile">
                  <p className="requestBoxProfileName">Pickle Rick</p>
                </Link>
                <p className="requestBoxDate">Yesterday</p>
              </div>
              {/* options menu (possibly remove)
              - turn off notifications? 
              - share post to your page?*/}
              <a href="#">
                <i className="fas fa-ellipsis-v" />
              </a>
            </div>
            <h4 className="requestBoxTitle">Need help with react router!!</h4>
            <img className="requestBoxImage" src={requestimg} alt="request" />
            <ul>
              <li>free on weekends and nights after 7</li>
              <li>Meetup at Starbucks downtown St.Pete?</li>
            </ul>
            <div className="requestBoxMiddleBar">
              <div className="requestBoxMiddleBarTwo">
                <Link to="/PostWithComments">
                  <i className="far fa-comment" />
                </Link>
              </div>
              <div className="requestBoxMiddleBarTwo">
                {/* when clicked add to my interested posts */}
                <a href="#">
                  <i className="fas fa-magnet" />
                </a>
              </div>
            </div>
            <div className="requestBoxBottomBar">
              <Link to="/PostWithComments" className="requestBoxBottomBarInfo">
                7 comments
              </Link>
              <Link to="/PeopleInterested" className="requestBoxBottomBarInfo">
                9 Interested
              </Link>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Post
