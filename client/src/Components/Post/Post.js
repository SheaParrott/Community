import React, { Component } from 'react'
import moment from 'moment'
import './style.css'
import { Link } from 'react-router-dom'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'
import CurrentProfileHelper from '../../currentProfileHelper'
import history from '../../history'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false,
      otherShowMenu: false,
      hideThisPost: ''
    }
  }

  toggleMenu = event => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  renderDelete = () => {
    // how do i only show this on the post clicked?
    // my thoughts:
    //     - display only where id === id given

    // other option:
    // could take to another page for
    // editing / deleting if i can figure it out?
    return (
      <div className={this.state.showMenu ? '' : 'hidden'}>
        <div className="columnCentering widthbig">
          <button onClick={this.postDelete}>Delete Post?</button>
        </div>
      </div>
    )
  }
  postDelete = () => {
    axios.delete(`/api/posts/${this.props.id}`).then(response => {
      console.log(response.data)
      if (this.props.onProfilePage) {
        this.props.getProfile()
      }
      if (this.props.hideCommentLogoAndCount) {
        history.go(-1)
      }
    })
  }
  profileClass = () => {
    return this.props.current_profile_author ? '' : 'hidden'
  }

  otherToggleMenu = () => {
    this.setState({ otherShowMenu: !this.state.otherShowMenu })
  }
  renderAddToHidePostButton = () => {
    return (
      <div className={this.state.otherShowMenu ? '' : 'hidden'}>
        <div className="columnCentering widthbig">
          <button onClick={this.hidePost}>Hide post?</button>
        </div>
      </div>
    )
  }
  hidePost = () => {
    if (this.props.hideCommentLogoAndCount) {
      history.go(-1)
    }
    this.setState({
      hideThisPost: 'hidden'
    })
  }
  otherProfileClass = () => {
    return !this.props.current_profile_author ? '' : 'hidden'
  }

  addToInterestedPosts = event => {
    // need id for post. then created a axios call to make it happen
    console.log(this.props.id)

    axios
      .post(`/api/interested_posts`, {
        interested_post: { post_id: this.props.id }
      })
      .then(response => {
        console.log(response.data)
      })
  }
  renderCommentLogo = () => {
    if (!this.props.hideCommentLogoAndCount) {
      return (
        <Link to={`/PostWithComments/${this.props.id}`}>
          <i
            onClick={this.CommentIDToBePassedToDataStore}
            className={`far fa-comment  ${
              this.props.hideCommentLogoAndCount ? 'hidden' : ''
            }`}
          />
        </Link>
      )
    }
  }

  render() {
    return (
      <div className={this.state.hideThisPost}>
        <section className="requestBoxCentering">
          <section className="widthbig boxShadow">
            <div className="requestBoxTopBar">
              <Link
                to={CurrentProfileHelper(
                  this.props.current_profile_author,
                  this.props.profile_id
                )}
              >
                <img
                  className="requestBoxProfileImage"
                  src={imageOrDefault(this.props.profileImage)}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link
                  to={CurrentProfileHelper(
                    this.props.current_profile_author,
                    this.props.profile_id
                  )}
                >
                  <h4 className="requestBoxProfileName">
                    {this.props.profileName}
                  </h4>
                </Link>
                <p className="requestBoxDate">{this.props.timestamp}</p>
              </div>
              <i
                onClick={this.toggleMenu}
                className={`fas fa-ellipsis-v ${this.profileClass()}`}
              />
              <i
                onClick={this.otherToggleMenu}
                className={`fas fa-ellipsis-v ${this.otherProfileClass()}`}
              />
            </div>
            {this.renderDelete()}
            {this.renderAddToHidePostButton()}
            <h4 className="requestBoxTitle">{this.props.postTitle}</h4>
            <img
              className="requestBoxImage"
              src={imageOrDefault(this.props.postImage)}
              alt="request"
            />
            <p>{this.props.postBody}</p>
            <div className="requestBoxMiddleBar">
              {this.renderCommentLogo()}
              <i
                onClick={this.addToInterestedPosts}
                className="fas fa-magnet"
              />
            </div>
            <div className="requestBoxBottomBar">
              <Link
                onClick={this.CommentIDToBePassedToDataStore}
                to={`/PostWithComments/${this.props.id}`}
                className={`requestBoxBottomBarInfo ${
                  this.props.hideCommentLogoAndCount ? 'hidden' : ''
                }`}
              >
                {this.props.comment_count} comments
              </Link>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Post
