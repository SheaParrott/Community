import React, { Component } from 'react'
import './style.css'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import imageOrDefault from '../../imageOrDefault'
import CurrentProfileHelper from '../../currentProfileHelper'
import Post from '../../Components/Post/Post'

class PostWithComments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      hideCommentLogoAndCount: false
    }
  }
  componentDidMount = () => {
    this.fetchPost()

    this.setState({
      hideCommentLogoAndCount: true
    })
  }
  componentWillUnmount = () => {
    this.setState({
      hideCommentLogoAndCount: false
    })
  }

  fetchPost = () => {
    axios
      .get(`/api/posts/${this.props.match.params.post_id}`)
      .then(response => {
        this.setState({ post: response.data.post })
      })
  }

  createComment = event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    axios.post('/api/comment/create', formData).then(response => {
      this.componentDidMount()
    })
  }

  testing = () => {
    // console.log(this.props.match.params.post_id)
  }

  render() {
    if (!this.state.post) {
      return <></>
    }

    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <button onClick={this.testing}>testing</button>
          <Post
            hideCommentLogoAndCount={this.state.hideCommentLogoAndCount}
            id={this.props.match.params.post_id}
            current_profile_author={this.state.post.current_profile_author}
            profile_id={this.state.post.profile_id}
            profileName={this.state.post.profile_name}
            profileImage={this.state.post.profile_image}
            postTitle={this.state.post.title}
            postImage={this.state.post.image}
            postBody={this.state.post.body}
            timestamp={this.state.post.time}
          />
          <section className="BoxCentering widthbig">
            {/* note: start of comments  */}
            <div className="columnCentering">
              {this.state.post.comments.map(comment => {
                return (
                  <div key={comment.id} className="comment widthbig">
                    <Link
                      to={CurrentProfileHelper(
                        comment.current_profile_author,
                        comment.author_id
                      )}
                    >
                      <img
                        className="commentProfileImage"
                        src={imageOrDefault(comment.author_image)}
                        alt="profile"
                      />
                    </Link>
                    <div>
                      <Link
                        to={CurrentProfileHelper(
                          comment.current_profile_author,
                          comment.author_id
                        )}
                      >
                        <h6 className="comment">{comment.author_name}</h6>
                      </Link>
                      <p className="comment">{comment.body}</p>
                    </div>
                  </div>
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
