import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'
import CurrentProfileHelper from '../../currentProfileHelper'
import history from '../../history'
import auth from '../../auth'
import CreateAPost from '../CreateAPost'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false,
      otherShowMenu: false,
      hideThisPost: '',
      updateAPost: false
    }
  }

  postDelete = () => {
    axios.delete(`/api/posts/${this.props.post.id}`).then(response => {
      this.toggleMenu()
      if (this.props.onProfilePage) {
        this.props.getProfile()
      } else if (this.props.onPostWithCommentsPage) {
        history.go(-1)
      } else if (this.props.onPostsPage) {
        this.props.getPosts()
      }
    })
  }
  submittedUpdatePost = () => {
    this.setState({
      updateAPost: !this.state.updateAPost
    })
  }
  toggleUpdatePost = () => {
    this.setState({
      updateAPost: !this.state.updateAPost
    })
    this.toggleMenu()
  }
  toggleMenu = event => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  otherToggleMenu = () => {
    this.setState({ otherShowMenu: !this.state.otherShowMenu })
  }
  hidePost = () => {
    if (this.props.onPostWithCommentsPage) {
      history.go(-1)
    }
    this.setState({
      hideThisPost: 'hidden'
    })
  }

  topBar = () => {
    return (
      <div className="requestBoxTopBar">
        <Link
          to={CurrentProfileHelper(
            this.props.post.current_profile_author,
            this.props.post.author_id
          )}
        >
          <img
            className="requestBoxProfileImage box-secondary"
            src={imageOrDefault(this.props.post.profile_image)}
            alt="profile"
          />
        </Link>
        <div className="requestBoxTopBarInfo">
          <Link
            to={CurrentProfileHelper(
              this.props.post.current_profile_author,
              this.props.post.author_id
            )}
          >
            <h4 className="requestBoxProfileName text-secondary">
              {this.props.post.name}
            </h4>
          </Link>
          <p className="requestBoxDate">
            {new Date(this.props.post.timestamp).toLocaleTimeString([], {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        {this.profileOptions()}
      </div>
    )
  }
  profileOptions = () => {
    if (!this.props.post.current_profile_author) {
      return (
        <div>
          <div className="dropDown ">
            <span
              className={`dropDowntext ${
                this.state.otherShowMenu ? '' : 'hidden'
              }`}
            >
              <div onClick={this.hidePost} className="dropDownMenu blue">
                <i className="fas fa-eye-slash" />
                <p>Hide Post</p>
              </div>
            </span>
          </div>
          <i onClick={this.otherToggleMenu} className={`fas fa-ellipsis-v`} />
        </div>
      )
    } else {
      return (
        <div>
          <div className="dropDown ">
            <span
              className={`dropDowntext ${this.state.showMenu ? '' : 'hidden'}`}
            >
              <div onClick={this.postDelete} className="dropDownMenu red">
                <i className="fas fa-trash-alt" />
                <p>Delete Post</p>
              </div>
              <div
                onClick={this.toggleUpdatePost}
                className="dropDownMenu blue"
              >
                <i className="fas fa-pencil-alt" />
                <p>Update Post</p>
              </div>
            </span>
          </div>
          <i onClick={this.toggleMenu} className="fas fa-ellipsis-v" />
        </div>
      )
    }
  }

  renderCommentLogo = () => {
    if (!this.props.onPostWithCommentsPage) {
      return (
        <div className="tooltip">
          <Link to={`/PostWithComments/${this.props.post.id}`}>
            <i
              onClick={this.CommentIDToBePassedToDataStore}
              className={`far fa-comment  ${
                this.props.onPostWithCommentsPage ? 'hidden' : ''
              }`}
            />
          </Link>
          <span className="tooltiptext">Go to comments</span>
        </div>
      )
    }
  }

  addToInterestedPosts = event => {
    let post_id = parseInt(this.props.post.id)
    axios
      .post('/api/interested_posts', {
        interested_post: {
          post_id: post_id
        }
      })
      .then(response => {
        if (this.props.onPostsPage) {
          this.props.getPosts()
        } else if (this.props.onProfilePage) {
          this.props.getProfile()
        } else if (this.props.onPostWithCommentsPage) {
          this.props.fetchPost()
        }
      })
  }

  removeFromInterestedPosts = event => {
    if (this.props.post.interested) {
      axios
        .delete(`/api/interested_posts/${this.props.post.id}`, {
          headers: {
            Authorization: `Bearer ${auth.getIdToken()}`
          }
        })
        .then(response => {
          if (this.props.onPostsPage) {
            this.props.getPosts()
          } else if (this.props.onProfilePage) {
            this.props.getProfile()
          } else if (this.props.onPostWithCommentsPage) {
            this.props.fetchPost()
          }
        })
    } else {
      this.addToInterestedPosts()
    }
  }
  renderBottomPost = () => {
    const value = !this.props.post.interested
      ? 'Add to Interested Posts'
      : 'remove from Interested Posts'
    return (
      <div>
        <div
          className={`requestBoxMiddleBar ${
            this.props.onPostWithCommentsPage ? '' : 'borderBottom'
          }`}
        >
          {this.renderCommentLogo()}
          <div className="tooltip">
            <i
              onClick={this.removeFromInterestedPosts}
              className={`fas fa-thumbs-up ${
                this.props.post.interested ? 'purple' : ''
              }`}
            />
            <span className="tooltiptext">{value}</span>
          </div>
        </div>
        <div className="requestBoxBottomBar">
          <div className="tooltip">
            <Link
              onClick={this.CommentIDToBePassedToDataStore}
              to={`/PostWithComments/${this.props.post.id}`}
              className={`requestBoxBottomBarInfo text-secondary ${
                this.props.onPostWithCommentsPage ? 'hidden' : ''
              }`}
            >
              {this.props.post.comment_count} comments
            </Link>

            <span className="tooltiptext">Go to comments</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const value = !this.props.post.interested
      ? 'Add to Interested Posts'
      : 'remove from Interested Posts'
    if (this.state.updateAPost) {
      return (
        <div>
          <section className="widthbig boxShadow">
            {this.topBar()}
            <CreateAPost
              onProfilePage={this.props.onProfilePage}
              onPostsPage={this.props.onPostsPage}
              onPostWithCommentsPage={this.props.onPostWithCommentsPage}
              getProfile={this.props.getProfile}
              getPosts={this.props.getPosts}
              fetchPost={this.props.fetchPost}
              submittedUpdatePost={this.submittedUpdatePost}
              post={this.props.post}
              updateAPost={this.state.updateAPost}
            />
          </section>
        </div>
      )
    }
    return (
      <div className={`whiteBackground ${this.state.hideThisPost}`}>
        <section className="requestBoxCentering">
          <section className="widthbig boxShadow">
            {this.topBar()}
            <h4 className="requestBoxTitle">{this.props.post.title}</h4>
            <img
              className="requestBoxImage"
              src={imageOrDefault(this.props.post.image)}
              alt="request"
            />
            <p className="postBody">{this.props.post.body}</p>
            {this.props.post.is_admin_tag ? null : this.renderBottomPost()}
          </section>
        </section>
      </div>
    )
  }
}

export default Post
// to do:
// [] create update comment endpoint
// [] add drop down style menu for edit and delete for comments
// [x] create update post endpoint
// [x] add in font awesome logo for editing
// [x] add dropdown menu
// [x] set up createAPost component to update and pass props
// [] set up onChange function for prop passed so we can edit
// [] noticing clicking the post menu is causing multiple console logs
//    in createAPost component
//     - anticipating this will cause issues. Look more into some sort
//       of guard clause
// [] hook up endpoint onto the front end
