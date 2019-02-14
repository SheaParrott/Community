import React, { Component } from 'react'
import './style.css'
import Header from '../../Components/Header'
import axios from 'axios'
import Post from '../../Components/Post/Post'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'
import Comment from '../../Components/Comment'
import CommentForm from '../../Components/CommentForm'

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
      // window.scrollTo(0, 0)
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
    console.log('hmmmm')
    axios.get(`/api/posts/${this.props.post.id}`).then(response => {
      console.log(response.data.post)
      this.setState({
        post: response.data.post,
        errors: [],
        updateComment: false
      })
    })
  }

  render() {
    if (!this.state.post) {
      return this.renderLoading()
    }
    return (
      // <div className="columnCentering">
      //   <Header />
      //   <div className="marginFromHeader">
      //     <Post
      //       post={this.state.post}
      //       onPostWithCommentsPage={true}
      //       id={this.props.match.params.post_id}
      //       fetchPost={this.fetchPost}
      //       onProfilePage={false}
      //       onPostsPage={false}
      //     />
      //     <section className="BoxCentering widthbig whiteBackground boxShadow">
      //       <div className="columnCentering">
      //         {this.state.post.comments.map((comment, index) => {
      //           return (
      //             <Comment
      //               key={index}
      //               fetchPost={this.fetchPost}
      //               comment={comment}
      //             />
      //           )
      //         })}
      //         <CommentForm
      //           post_id={this.props.match.params.post_id}
      //           fetchPost={this.fetchPost}
      //           updateComment={false}
      //         />
      //       </div>
      //     </section>
      //   </div>
      // </div>
      <div className="container">
        <div>
          <div className="x">
            <i class="fas fa-times-circle white" />
          </div>
          <Post
            post={this.state.post}
            onPostWithCommentsPage={true}
            id={this.props.post.id}
            fetchPost={this.fetchPost}
            // onProfilePage={false}
            // onPostsPage={false}
          />
          <section className="BoxCentering widthbig whiteBackground boxShadow">
            <div className="columnCentering">
              {this.state.post.comments.map((comment, index) => {
                return (
                  <Comment
                    key={index}
                    fetchPost={this.fetchPost}
                    comment={comment}
                  />
                )
              })}
              <CommentForm
                post_id={this.props.post.id}
                // fetchPost={this.fetchPost}
                // updateComment={false}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default PostWithComments
