import React, { Component } from 'react'
import './style.css'
import Header from '../../Components/Header'
import axios from 'axios'
import Post from '../../Components/Post/Post'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'
import Comment from '../../Components/Comment'

class PostWithComments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      errors: [],
      deleteComment: false
    }
  }
  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      this.fetchPost()
    }
  }
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  fetchPost = () => {
    axios
      .get(`/api/posts/${this.props.match.params.post_id}`)
      .then(response => {
        this.setState({
          post: response.data.post,
          errors: []
        })
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

  render() {
    if (!this.state.post) {
      return this.renderLoading()
    }
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <Post
            post={this.state.post}
            onPostWithCommentsPage={true}
            id={this.props.match.params.post_id}
            fetchPost={this.fetchPost}
            onProfilePage={false}
            onPostsPage={false}
          />
          <section className="BoxCentering widthbig whiteBackground boxShadow">
            <div className="columnCentering">
              {this.state.post.comments.map((comment, index) => {
                return (
                  <Comment
                    key={index}
                    fetchPost={this.fetchPost}
                    id={comment.id}
                    current_profile_author={comment.current_profile_author}
                    author_id={comment.author_id}
                    author_image={comment.author_image}
                    author_name={comment.author_name}
                    body={comment.body}
                  />
                )
              })}
              {this.state.errors.map((error, index) => {
                return (
                  <h5 className="secondary-text" key={index}>
                    {` * ${error}`}
                  </h5>
                )
              })}
              <form onSubmit={this.createComment}>
                <input
                  type="hidden"
                  name="comment[post_id]"
                  value={this.props.match.params.post_id}
                />
                <textarea
                  rows="3"
                  className="comment width"
                  type="text"
                  name="comment[body]"
                  placeholder="Your new comment Here"
                />
                <button type="submit" className="comment width">
                  SUBMIT
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
