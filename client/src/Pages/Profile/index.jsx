import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Header from '../../Components/Header'
import requestimg from '../../assets/dev.jpeg'
import Footer from '../../Components/Footer'
import Post from '../../Components/Post/Post'
import myDataStore from '../DataStore/DataStore'

import { observer } from 'mobx-react'
import CreateAPost from '../CreateAPost'

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
      return <h4>{myDataStore.profile.about_me}</h4>
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
      return <h5>{myDataStore.profile.about_me}</h5>
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
  dataBaseShowOrHide = () => {
    myDataStore.changeShowOrHide()
  }
  CommentIDToBePassedToDataStore = event => {
    myDataStore.commentID(event.target.dataset.comment)
  }

  render() {
    return (
      <>
        <Header />
        <div className="CoverImage">
          <img
            className="ProfileCoverImage"
            src={myDataStore.profile.cover_image}
            alt="profile"
          />
        </div>
        <main className="ProfileBody columnCentering">
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
            <div className="nameBox">
              <div className="name boxShadow">
                {/* <i className="fas fa-plus-circle" /> */}
                <h3 className="name">{myDataStore.profile.name}</h3>
              </div>
            </div>
            <div className="profileQuote widthbig">
              {myDataStore.profile.quote}
            </div>
          </div>
          <div className="profileAttributesBar">
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRENGTHS"
              className="profileAttributesLeft boxShadow"
            >
              STRENGTHS
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="ABOUT ME"
              className="profileAttributesMiddle boxShadow"
            >
              ABOUT ME
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRUGGLES"
              className="profileAttributesRight boxShadow"
            >
              GROWING
              {/* interesd in growing in
              growths
              interests */}
            </h6>
          </div>
          <div className="profileBio boxShadow widthbig">
            {this.fillInBox()}
          </div>
          {/* add in ternary opperator to remove post component off 
          profile page after submitted. or play with state to make
          appear and disappear */}
          <div
            className="profileCreateAPost widthbig boxShadow"
            onClick={this.dataBaseShowOrHide}
          >
            <h5>Create a post</h5>
            <i className="fas fa-sort-down lessTopMargin" />
          </div>
          <CreateAPost />
          <div className="ProfilePostsBox columnCentering boxShadow widthbig">
            <h6>Recommended Posts:</h6>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost width">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost width">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost width">
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
          <div className="ProfilePostsBox columnCentering boxShadow widthbig">
            <h6>interested Posts:</h6>
            {myDataStore.profile.interested_posts.map(post => {
              return (
                <Link key={post.id} to="/PostWithComments">
                  <div
                    className="ProfileRecommendedPost width"
                    onClick={this.CommentIDToBePassedToDataStore}
                    data-comment={post.id}
                  >
                    <img
                      className="ProfileRequestBoxImage boxShadow"
                      src={post.image}
                      alt="request"
                      onClick={this.CommentIDToBePassedToDataStore}
                      data-comment={post.id}
                    />
                    <h4 data-comment={post.id}>{post.title}</h4>
                  </div>
                </Link>
              )
            })}
            <Link to="/Posts">
              <h6>See More</h6>
            </Link>
            {/* passing this id is not working? */}
          </div>
          {myDataStore.profile.posts.map(post => {
            return (
              <Post
                key={post.id}
                CommentIDToBePassedToDataStore={
                  this.CommentIDToBePassedToDataStore
                }
                data-comment={post.id}
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
      </>
    )
  }
}

export default observer(Profile)

/* <div className="profileMyCommunityParent">
            <h6>my community:</h6>
            <div className="profileMyCommunity width">
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
