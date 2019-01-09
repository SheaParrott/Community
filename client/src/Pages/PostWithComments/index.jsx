import React, { Component } from 'react'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import './style.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//
// three lines is called a hamburger menu
//
class PostWithComments extends Component {
  render() {
    return (
      <div>
        <Header />
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
                {/* when clicked add to my interested posts */}
                <a href="#">
                  <i className="fas fa-magnet" />
                </a>
                {/* <p className="requestBoxClick">Interested</p> */}
              </div>
            </div>
            <div className="requestBoxBottomBar">
              <Link to="/PeopleInterested" className="requestBoxBottomBarInfo">
                9 Interested
              </Link>
            </div>
            {/* start of comments  */}
            {/* removed the number of comments on post and added static comments below */}
            <div className="comment">
              <Link to="/Profile">
                <img
                  className="commentProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <div>
                <Link to="/Profile">
                  <h6 className="comment">Mikey Saint</h6>
                </Link>
                <p className="comment">
                  I am good with react Router. Im free most saturdays to link up
                </p>
              </div>
            </div>
            <div className="comment">
              <Link to="/Profile">
                <img
                  className="commentProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <div>
                <Link to="/Profile">
                  <h6 className="comment">Frank Mueny</h6>
                </Link>
                <p className="comment">
                  I am struggling with react router. Can I join to learn too? I
                  will bring donuts!
                </p>
              </div>
            </div>
            <div className="comment">
              <Link to="/Profile">
                <img
                  className="commentProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <div>
                <Link to="/Profile">
                  <h6 className="comment">Martin Gabb</h6>
                </Link>
                <p className="comment">
                  Ive been working with react router for a few years now. Id
                  love to join in to help.
                </p>
              </div>
            </div>
            <div className="comment">
              <Link to="/Profile">
                <img
                  className="commentProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <div>
                <Link to="/Profile">
                  <h6 className="comment">Pickle Rick</h6>
                </Link>
                <p className="comment">
                  Cool, Does starbucks 10am saturday work for everyone?
                </p>
              </div>
            </div>
            <input type="text" placeholder="comment here" className="comment" />
            <button className="comment">submit</button>
          </section>
        </section>
        <Footer />
      </div>
    )
  }
}

export default PostWithComments
