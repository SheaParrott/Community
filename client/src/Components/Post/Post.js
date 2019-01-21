import React, { Component } from 'react'
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
      hideThisPost: '',
      isAdded: ''
    }
  }

  toggleMenu = event => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  renderDelete = () => {
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
      if (this.props.onProfilePage) {
        this.props.getProfile()
      } else if (this.props.hideCommentLogoAndCount) {
        history.go(-1)
      } else if (this.props.onPostsPage) {
        this.props.getPosts()
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

  addToInterestedPosts = event => {
    let post_id = parseInt(this.props.id)
    // params.require(:interested_post).permit(:post_id)
    axios
      .post('/api/interested_posts', {
        interested_post: {
          post_id: post_id
        }
      })
      .then(response => {
        // console.log(response.data.is_added)
        this.setState({
          isAdded: response.data.is_added
        })
      })
  }

  render() {
    return (
      <div className={`whiteBackground ${this.state.hideThisPost}`}>
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
                  className="requestBoxProfileImage box-secondary"
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
                  <h4 className="requestBoxProfileName text-secondary">
                    {this.props.profileName}
                  </h4>
                </Link>
                <p className="requestBoxDate">
                  {new Date(this.props.timestamp).toLocaleTimeString([], {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
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
            <h4 className="secondary-text">{this.state.isAdded}</h4>
            <h4 className="requestBoxTitle">{this.props.postTitle}</h4>
            <img
              className="requestBoxImage"
              src={imageOrDefault(this.props.postImage)}
              alt="request"
            />
            <p>{this.props.postBody}</p>
            <div
              className={`requestBoxMiddleBar ${
                this.props.hideCommentLogoAndCount ? '' : 'borderBottom'
              }`}
            >
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
                className={`requestBoxBottomBarInfo text-secondary ${
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
