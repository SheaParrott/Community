import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Header from '../../Components/Header'
import Post from '../../Components/Post/Post'

import auth from '../../auth'
import history from '../../history'
import CreateAPost from '../../Components/CreateAPost'
import imageOrDefault from '../../imageOrDefault'
import Loading from '../../Components/Loading'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileBioSection: '',
      profile: null,
      showCreateAPost: false,
      onProfilePage: true
    }
  }

  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      this.getProfile()
    }
  }
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  getProfile = () => {
    const url = this.props.match.params.id
      ? `/api/profiles/${this.props.match.params.id}`
      : `/api/profiles/current`

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.getIdToken()}`
        }
      })
      .then(response => {
        this.setState({
          profile: response.data.profile,
          showCreateAPost: false
        })
      })
  }

  renderProfileimage = () => {
    if (!this.state.profile.me) {
      return (
        <img
          className="ProfileImage"
          src={imageOrDefault(this.state.profile.profile_image)}
          alt="profile"
        />
      )
    } else {
      return (
        <div className="tooltip">
          <Link to={`/UpdateProfile/${this.state.profile.id}`}>
            <img
              className="ProfileImage currentProfileImage box-secondary"
              src={imageOrDefault(this.state.profile.profile_image)}
              alt="profile"
            />
          </Link>
          <span className="tooltiptext">Update Profile</span>
        </div>
      )
    }
  }

  AttributeClickToChangeState = event => {
    this.setState({
      profileBioSection: event.target.dataset.attribute
    })
  }

  renderFillInBox = () => {
    if (this.state.profileBioSection === 'TAGS') {
      return (
        <div>
          {this.state.profile.tags.map((tag, index) => {
            return (
              <h4 key={index} className="aboutMe">
                {tag.name}
              </h4>
            )
          })}
        </div>
      )
    } else {
      return <h4 className="aboutMe">{this.state.profile.about_me}</h4>
    }
  }
  postsBox = posts => {
    return posts.slice(0, 3).map((post, index) => {
      return (
        <Link
          className="text-secondary secondary-text"
          key={index}
          to={`/PostWithComments/${post.id}`}
        >
          <div
            className="ProfileRecommendedPost width"
            onClick={this.CommentIDToBePassedToDataStore}
          >
            <div className="ImageContainer">
              <img
                className="ProfileRequestBoxImage boxShadow"
                src={imageOrDefault(post.image)}
                alt="request"
                onClick={this.CommentIDToBePassedToDataStore}
              />
            </div>
            <h4>{post.title}</h4>
          </div>
        </Link>
      )
    })
  }

  render() {
    if (!this.state.profile) {
      return this.renderLoading()
    }
    return (
      <div>
        <Header />
        <div className="largerScreens">
          <div className="test">
            <div className="marginFromHeader CoverImage columnCentering">
              <button onClick={this.updateAPost}>test</button>
              <img
                className="ProfileCoverImage"
                src={imageOrDefault(this.state.profile.cover_image)}
                alt="profile"
              />
            </div>
          </div>
          <main className="ProfileBody columnCentering">
            <div className="profileTop">
              {this.renderProfileimage()}
              <div className="nameBox">
                <div className="name boxShadow whiteBackground">
                  <h2 className="name">{this.state.profile.name}</h2>
                </div>
              </div>
              <div className="profileQuote widthbig">
                {this.state.profile.quote}
              </div>
            </div>
            <div className="profileAttributesBar widthbig">
              <h6
                onClick={this.AttributeClickToChangeState}
                data-attribute="ABOUT ME"
                className="profileAttributesLeft boxShadow"
              >
                ABOUT ME
              </h6>
              <h6
                onClick={this.AttributeClickToChangeState}
                data-attribute="TAGS"
                className="profileAttributesRight boxShadow"
              >
                STRENGTHS / GROWING
              </h6>
            </div>
            <div className="profileBio boxShadow  whiteBackground">
              {this.renderFillInBox()}
            </div>
            <div className={`${this.state.profile.me ? '' : 'hidden'}`}>
              <div className="columnCentering">
                <div
                  className="profileCreateAPost whiteBackground widthbig boxShadow"
                  onClick={() => {
                    this.setState({
                      showCreateAPost: !this.state.showCreateAPost
                    })
                  }}
                >
                  <h4>Create a post</h4>
                  <i
                    className={`fas fa-caret-down lessTopMargin text-secondary ${
                      !this.state.showCreateAPost ? '' : 'hidden'
                    }`}
                  />
                  <i
                    className={`fas fa-caret-up lessBottomMargin text-secondary ${
                      this.state.showCreateAPost ? '' : 'hidden'
                    }`}
                  />
                </div>
                <div>
                  {this.state.showCreateAPost ? (
                    <CreateAPost reloadProfilePage={this.getProfile} />
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`ProfilePostsBox columnCentering boxShadow widthbig whiteBackground ${
                this.state.profile.me ? '' : 'hidden'
              }`}
            >
              <h4 className="somePadding">Recommended Posts:</h4>
              {this.postsBox(this.state.profile.recommended_posts)}
              <Link to={`/Profile/${this.state.profile.id}/posts/recommended`}>
                <h5
                  className="text-secondary somePadding"
                  onClick={this.state.getAllInterestedPosts}
                >
                  See More
                </h5>
              </Link>
            </div>
            <div
              className={`ProfilePostsBox columnCentering boxShadow widthbig whiteBackground`}
            >
              <h4 className="somePadding">Interested Posts:</h4>
              {this.postsBox(this.state.profile.interested_posts)}
              <Link to={`/Profile/${this.state.profile.id}/posts/interested`}>
                <h5
                  className="text-secondary somePadding"
                  onClick={this.state.getAllInterestedPosts}
                >
                  See More
                </h5>
              </Link>
            </div>
            {this.state.profile.posts.map((post, index) => {
              return (
                <Post
                  key={index}
                  post={post}
                  onPostWithCommentsPage={false}
                  onProfilePage={true}
                  onPostsPage={false}
                  getProfile={this.getProfile}
                />
              )
            })}
          </main>
        </div>
      </div>
    )
  }
}

export default Profile
