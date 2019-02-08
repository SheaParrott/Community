import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import axios from 'axios'
import Loading from '../../Components/Loading'
import auth from '../../auth'
import history from '../../history'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: false
    }
  }

  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      this.getPosts()
    }
  }
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }
  getPosts = () => {
    // `/api/profiles/${this.props.match.params.id}`
    // /api/interested_posts/:id
    // created a local variable to change the url passed
    // depending on which posts are needed to be seen
    // [] create a recommended posts controller and endpoint
    const url =
      this.props.match.params.kind === 'interested'
        ? '/api/interested_posts/'
        : console.log('/api/recommended_posts/')

    console.log(this.props.match.params.profile_id)
    axios
      .get(`${url}${this.props.match.params.profile_id}`, {
        headers: {
          Authorization: `Bearer ${auth.getIdToken()}`
        }
      })
      .then(response => {
        console.log(response.data)
        this.setState({ posts: response.data.posts })
      })
  }

  render() {
    if (!this.state.posts) {
      return this.renderLoading()
    }
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          {this.state.posts.map((post, index) => {
            return (
              <Post
                removeFromInterested={this.removeFromInterested}
                onPostWithCommentsPage={false}
                key={index}
                post={post}
                onProfilePage={false}
                onPostsPage={true}
                getPosts={this.getPosts}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Posts

//
