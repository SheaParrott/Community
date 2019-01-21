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
        <Link to={`/UpdateProfile/${this.state.profile.id}`}>
          <img
            className="ProfileImage currentProfileImage box-secondary"
            src={imageOrDefault(this.state.profile.profile_image)}
            alt="profile"
          />
        </Link>
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

  render() {
    if (!this.state.profile) {
      return this.renderLoading()
    }
    return (
      <div>
        <Header />
        <div className="marginFromHeader CoverImage columnCentering">
          <img
            className="ProfileCoverImage"
            src={imageOrDefault(this.state.profile.cover_image)}
            alt="profile"
          />
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
          <div className="profileBio boxShadow widthbig whiteBackground">
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
                <h5>Create a post</h5>
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
              <CreateAPost
                showForm={this.state.showCreateAPost}
                reloadProfilePage={this.getProfile}
              />
            </div>
          </div>
          <div
            className={`ProfilePostsBox columnCentering boxShadow widthbig whiteBackground ${
              this.state.profile.me ? '' : 'hidden'
            }`}
          >
            <h6>Recommended Posts:</h6>
            {this.state.profile.recommended_posts
              .slice(0, 3)
              .map((post, index) => {
                return (
                  <Link
                    className="text-secondary"
                    key={index}
                    to={`/PostWithComments/${post.id}`}
                  >
                    <div
                      className="ProfileRecommendedPost width"
                      onClick={this.CommentIDToBePassedToDataStore}
                    >
                      <img
                        className="ProfileRequestBoxImage boxShadow"
                        src={imageOrDefault(post.image)}
                        alt="request"
                        onClick={this.CommentIDToBePassedToDataStore}
                      />
                      <h4>{post.title}</h4>
                    </div>
                  </Link>
                )
              })}
            <Link to={`/Profile/${this.state.profile.id}/posts/recommended`}>
              <h6
                className="text-secondary"
                onClick={this.state.getAllInterestedPosts}
              >
                See More
              </h6>
            </Link>
          </div>
          <div className="ProfilePostsBox columnCentering boxShadow widthbig whiteBackground">
            <h6>Interested Posts:</h6>
            {this.state.profile.interested_posts.slice(0, 3).map(post => {
              return (
                <Link
                  className="text-secondary"
                  key={post.id}
                  to={`/PostWithComments/${post.id}`}
                >
                  <div
                    className="ProfileRecommendedPost width"
                    onClick={this.CommentIDToBePassedToDataStore}
                  >
                    <img
                      className="ProfileRequestBoxImage boxShadow"
                      src={imageOrDefault(post.image)}
                      alt="request"
                      onClick={this.CommentIDToBePassedToDataStore}
                    />
                    <h4>{post.title}</h4>
                  </div>
                </Link>
              )
            })}
            <Link to={`/Profile/${this.state.profile.id}/posts/interested`}>
              <h6
                className="text-secondary"
                onClick={this.state.getAllInterestedPosts}
              >
                See More
              </h6>
            </Link>
          </div>
          {this.state.profile.posts.map((post, index) => {
            return (
              <Post
                key={index}
                id={post.id}
                hideCommentLogoAndCount={false}
                onProfilePage={true}
                onPostsPage={false}
                getProfile={this.getProfile}
                current_profile_author={post.current_profile_author}
                profile_id={this.state.profile.id}
                profileName={this.state.profile.name}
                profileImage={this.state.profile.profile_image}
                comment_count={post.comment_count}
                postTitle={post.title}
                postImage={post.image}
                postBody={post.body}
                timestamp={post.timestamp}
              />
            )
          })}
        </main>
      </div>
    )
  }
}

export default Profile
