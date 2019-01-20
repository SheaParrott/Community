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
    }
    this.getProfile()
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
  AttributeClickToChangeState = event => {
    this.setState({
      profileBioSection: event.target.dataset.attribute
    })
  }

  profileClass = () => {
    return this.state.profile.me ? '' : 'hidden'
  }

  fillInBox = () => {
    let strengths = this.state.profile.tags.filter(s => {
      return s.strength
    })
    let weakness = this.state.profile.tags.filter(w => {
      return !w.strength
    })

    if (this.state.profileBioSection === '') {
      return <h5 className="aboutMe">{this.state.profile.about_me}</h5>
    }
    if (this.state.profileBioSection === 'STRENGTHS') {
      return (
        <div>
          {strengths.map(strength => {
            return <h5 key={strength.id}>{strength.name}</h5>
          })}
        </div>
      )
    } else if (this.state.profileBioSection === 'ABOUT ME') {
      return <h5 className="aboutMe">{this.state.profile.about_me}</h5>
    } else if (this.state.profileBioSection === 'STRUGGLES') {
      return (
        <div>
          {weakness.map((weakness, index) => {
            return <h5 key={index}>{weakness.name}</h5>
          })}
        </div>
      )
    }
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
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  render() {
    if (!this.state.profile) {
      return this.renderLoading()
    }
    return (
      <div>
        <Header />
        <div className="CoverImage">
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
              <div className="name boxShadow">
                <h2 className="name">{this.state.profile.name}</h2>
              </div>
            </div>
            <div className="profileQuote widthbig">
              {this.state.profile.quote}
            </div>
          </div>
          <div className="profileAttributesBar">
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRENGTHS"
              className="profileAttributesLeft boxShadow box-secondary"
            >
              STRENGTHS
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="ABOUT ME"
              className="profileAttributesMiddle boxShadow box-secondary"
            >
              ABOUT ME
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRUGGLES"
              className="profileAttributesRight boxShadow box-secondary"
            >
              GROWING
            </h6>
          </div>
          <div className="profileBio boxShadow widthbig">
            {this.fillInBox()}
          </div>
          <div className={this.profileClass()}>
            <div className="columnCentering">
              <div
                className="profileCreateAPost widthbig boxShadow"
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
            className={`ProfilePostsBox columnCentering boxShadow widthbig ${
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
          <div className="ProfilePostsBox columnCentering boxShadow widthbig">
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
                onPostsPage={true}
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
