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
      profile: false
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
    axios
      .get(`/api/profiles/${this.props.match.params.id}`, {
        headers: {
          Authorization: `Bearer ${auth.getIdToken()}`
        }
      })
      .then(response => {
        this.setState({ profile: response.data.profile })
      })
  }

  render() {
    if (!this.state.profile) {
      return this.renderLoading()
    }

    const posts =
      this.props.match.params.kind === 'interested'
        ? this.state.profile.interested_posts
        : this.state.profile.recommended_posts

    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          {posts.map((post, index) => {
            return (
              <Post
                removeFromInterested={this.removeFromInterested}
                interested_or_recommended={
                  this.props.match.params.kind === 'interested'
                    ? 'interested'
                    : 'recommended'
                }
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
