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
    console.log(toJS(myDataStore.singlePost.comments))
  }

  ProfileIDToBePassedToDataStore = event => {
    //this takes the event data and calls a function in
    // the datastore and passing the event data to that function
    myDataStore.getOneProfile(event.target.dataset.profile)
    // console.log(event.target.dataset.profile)
  }
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader widthbig">
          <button onClick={this.testing}>testing</button>
          <section className="requestBoxCentering">
            <section className="requestBox boxShadow">
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
                <Link
                  to="/PeopleInterested"
                  className="requestBoxBottomBarInfo"
                >
                  9 Interested
                </Link>
              </div>
              {/* note: start of comments  */}
              <div className="columnCentering">
                {toJS(myDataStore.singlePost.comments).map(comment => {
                  return (
                    <div key={comment.id} className="comment widthbig">
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
                        <p className="comment">{comment.body}</p>
                      </div>
                    </div>
                  )
                })}
                <input
                  type="text"
                  placeholder="comment here"
                  className="comment width"
                />
                <button className="comment">submit</button>
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  }
}

export default PostWithComments
