import React, { Component } from 'react'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import './style.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import myDataStore from '../DataStore/DataStore'
import { toJS } from 'mobx'

//
// three lines is called a hamburger menu
//

// id: post.id,
// title: post.title,
// image: url_for(post.post_image),
// body: post.body,
// profile_id: post.author.id,
// profile_name: post.author.name,
// profile_image: url_for(post.author.profile_image)

class PostWithComments extends Component {
  testing = () => {
    // console.log(myDataStore.singlePost)
    console.log(toJS(myDataStore.singlePost.body))
    console.log(toJS(myDataStore.singlePost.image))
  }

  ProfileIDToBePassedToDataStore = event => {
    //this takes the event data and calls a function in
    // the datastore and passing the event data to that function
    myDataStore.profileID(event.target.dataset.profile)
    // console.log(event.target.dataset.profile)
  }
  render() {
    return (
      <div>
        <Header />
        <button onClick={this.testing}>testing</button>
        <section className="requestBoxCentering">
          <section className="requestBox">
            <div className="requestBoxTopBar">
              <Link to="/Profile">
                <img
                  onClick={this.ProfileIDToBePassedToDataStore}
                  data-profile={toJS(myDataStore.singlePost.profile_id)}
                  className="requestBoxProfileImage"
                  src={toJS(myDataStore.singlePost.profile_image)}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link to="/Profile">
                  <h4
                    onClick={this.ProfileIDToBePassedToDataStore}
                    data-profile={toJS(myDataStore.singlePost.profile_id)}
                    className="requestBoxProfileName"
                  >
                    {toJS(myDataStore.singlePost.profile_name)}
                  </h4>
                </Link>
                <p className="requestBoxDate">
                  {toJS(myDataStore.singlePost.time)}
                </p>
              </div>
              <a href="#">
                <i className="fas fa-ellipsis-v" />
              </a>
            </div>
            <h4 className="requestBoxTitle">
              {toJS(myDataStore.singlePost.title)}
            </h4>
            <img
              className="requestBoxImage"
              src={toJS(myDataStore.image)}
              alt="requestBox"
            />
            <p>{toJS(myDataStore.singlePost.body)}</p>
            <div className="requestBoxMiddleBar">
              <div className="requestBoxMiddleBarTwo">
                <a href="#">
                  <i className="fas fa-magnet" />
                </a>
              </div>
            </div>
            <div className="requestBoxBottomBar">
              <Link to="/PeopleInterested" className="requestBoxBottomBarInfo">
                9 Interested
              </Link>
            </div>
            {/* note: start of comments  */}
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
      </div>
    )
  }
}

export default PostWithComments
