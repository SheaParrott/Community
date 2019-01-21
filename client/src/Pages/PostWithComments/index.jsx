import React, { Component } from 'react'
import './style.css'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import imageOrDefault from '../../imageOrDefault'
import CurrentProfileHelper from '../../currentProfileHelper'
import Post from '../../Components/Post/Post'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'

class PostWithComments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      hideCommentLogoAndCount: false,
      errors: []
    }
  }
  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      this.fetchPost()
      this.setState({
        hideCommentLogoAndCount: true
      })
    }
  }

  fetchPost = () => {
    axios
      .get(`/api/posts/${this.props.match.params.post_id}`)
      .then(response => {
        this.setState({ post: response.data.post, errors: [] })
      })
  }

  createComment = event => {
    event.preventDefault()
    let form = event.target

    const formData = new FormData(form)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    axios.post('/api/comment/create', formData).then(response => {
      if (response.data.errors) {
        this.setState({
          errors: response.data.errors
        })
      } else {
        form.reset()
        this.fetchPost()
      }
    })
  }
  hideCommentLogoAndCount = () => {
    this.setState({
      hideCommentLogoAndCount: false
    })
  }

  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  render() {
    if (!this.state.post) {
      return this.renderLoading()
    }
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <Post
            hideCommentLogoAndCount={this.state.hideCommentLogoAndCount}
            id={this.props.match.params.post_id}
            onProfilePage={false}
            onPostsPage={false}
            current_profile_author={this.state.post.current_profile_author}
            profile_id={this.state.post.profile_id}
            profileName={this.state.post.profile_name}
            profileImage={this.state.post.profile_image}
            postTitle={this.state.post.title}
            postImage={this.state.post.image}
            postBody={this.state.post.body}
            timestamp={this.state.post.time}
          />
          <section className="BoxCentering widthbig whiteBackground">
            <div className="columnCentering">
              {this.state.post.comments.map(comment => {
                return (
                  <div key={comment.id} className="comment widthbig">
                    <Link
                      onClick={this.hideCommentLogoAndCount}
                      to={CurrentProfileHelper(
                        comment.current_profile_author,
                        comment.author_id
                      )}
                    >
                      <img
                        className="commentProfileImage box-secondary"
                        src={imageOrDefault(comment.author_image)}
                        alt="profile"
                      />
                    </Link>
                    <div>
                      <Link
                        onClick={this.hideCommentLogoAndCount}
                        to={CurrentProfileHelper(
                          comment.current_profile_author,
                          comment.author_id
                        )}
                      >
                        <h6 className="comment text-secondary">
                          {comment.author_name}
                        </h6>
                      </Link>
                      <p className="comment">{comment.body}</p>
                    </div>
                  </div>
                )
              })}
              {this.state.errors.map((error, index) => {
                return (
                  <h5 className="red" key={index}>
                    {error}
                  </h5>
                )
              })}
              <form onSubmit={this.createComment}>
                <input
                  type="hidden"
                  name="comment[post_id]"
                  value={this.props.match.params.post_id}
                />
                <input
                  className="comment width"
                  type="text"
                  name="comment[body]"
                  placeholder="Your new comment Here"
                />
                <button type="submit" className="comment width">
                  submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default PostWithComments
