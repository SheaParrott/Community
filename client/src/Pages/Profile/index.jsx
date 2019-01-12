import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import axios from 'axios'

import SignIn from '../SignIn/index'
import Posts from '../Posts/index'
import Header from '../../Components/Header'
import profileimg from '../../assets/picklerick.jpg'
import coverimg from '../../assets/space.jpeg'
import requestimg from '../../assets/dev.jpeg'
import Footer from '../../Components/Footer'
import Post from '../../Components/Post/Post'
import myDataStore from '../DataStore/DataStore'

import { observer } from 'mobx-react'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileBioSection: ''
    }
  }
  AttributeClickToChangeState = event => {
    this.setState({
      profileBioSection: event.target.dataset.attribute
    })
  }
  fillInBox = () => {
    let strengths = myDataStore.profile.tags.filter(s => {
      return s.strength
    })
    let weakness = myDataStore.profile.tags.filter(w => {
      return !w.strength
    })

    if (this.state.profileBioSection === '') {
      return <p>{myDataStore.profile.about_me}</p>
    }
    if (this.state.profileBioSection === 'STRENGTHS') {
      return (
        <ul>
          {strengths.map(strength => {
            return <li key={strength.id}>{strength.name}</li>
          })}
        </ul>
      )
    } else if (this.state.profileBioSection === 'ABOUT ME') {
      return <p>{myDataStore.profile.about_me}</p>
    } else if (this.state.profileBioSection === 'STRUGGLES') {
      return (
        <ul>
          {weakness.map(weakness => {
            return <li key={weakness.id}>{weakness.name}</li>
          })}
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="CoverImage">
          <img
            className="ProfileCoverImage"
            src={myDataStore.profile.cover_image}
            alt="profile"
          />
        </div>
        <main className="ProfileBody">
          <div className="profileTop">
            <Link to="/UpdateProfile">
              <img
                className="ProfileImage"
                src={myDataStore.profile.profile_image}
                alt="profile"
              />
            </Link>
            {/* <div className="addToCommunityBox">
              <div className="addToCommunity">
                make clickable
                <i className="fas fa-plus-circle" />
                <p>Add to Community</p>
              </div>
            </div> */}
            <div className="addToCommunityBox">
              <div className="addToCommunity">
                {/* <i className="fas fa-plus-circle" /> */}
                <p>{myDataStore.profile.name}</p>
              </div>
            </div>
            <div className="profileQuote">{myDataStore.profile.quote}</div>
          </div>
          <div className="profileAttributesBar">
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRENGTHS"
              className="profileAttributesLeft"
            >
              STRENGTHS
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="ABOUT ME"
              className="profileAttributesMiddle"
            >
              ABOUT ME
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRUGGLES"
              className="profileAttributesRight"
            >
              GROWING
              {/* interesd in growing in
              growths
              interests */}
            </h6>
          </div>
          <div className="profileBio">{this.fillInBox()}</div>
          <div className="ProfilePostsBox">
            <h6>Recommended Posts:</h6>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/Posts">
              <h6>See More</h6>
            </Link>
          </div>
          <div className="ProfilePostsBox">
            <h6>interested Posts:</h6>
            {myDataStore.profile.interested_posts.map(post => {
              return (
                <Link key={post.id} to="/PostWithComments">
                  <div className="ProfileRecommendedPost">
                    <img
                      className="ProfileRequestBoxImage"
                      src={post.image}
                      alt="request"
                    />
                    <h4>{post.title}</h4>
                  </div>
                </Link>
              )
            })}
            <Link to="/Posts">
              <h6>See More</h6>
            </Link>
          </div>
          {myDataStore.profile.posts.map(post => {
            return (
              <Post
                key={post.id}
                profileName={myDataStore.profile.name}
                profileImage={myDataStore.profile.profile_image}
                postTitle={post.title}
                postImage={post.image}
                postBody={post.body}
                timestamp={post.timestamp}
              />
            )
          })}
        </main>
        <Footer />
      </div>
    )
  }
}

export default observer(Profile)

/* <div className="profileMyCommunityParent">
            <h6>my community:</h6>
            <div className="profileMyCommunity">
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
            </div>
            <Link to="/MyCommunity">
              <h6>See More</h6>
            </Link>
          </div> */
