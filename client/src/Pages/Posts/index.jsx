import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import axios from 'axios'
import Loading from '../../Components/Loading'
// import auth from '../../auth'
// import history from '../../history'

class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false
    }
  }

  componentDidMount = () => {
    axios
      .get(`/api/profiles/${this.props.match.params.profile_id}`)
      .then(response => {
        this.setState({ profile: response.data.profile })
      })
    // if (!auth.isAuthenticated()) {
    //   history.replace('/SignIn')
    // }
  }

  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  render() {
    const posts =
      this.props.match.params.kind === 'interested'
        ? this.state.profile.interested_posts
        : this.state.profile.recommended_posts
    {
      if (!this.state.profile) {
        return this.renderLoading()
      }
    }
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                id={post.id}
                current_profile_author={post.current_profile_author}
                comment_count={post.comment_count}
                profile_id={post.author_id}
                profileName={post.name}
                profileImage={post.profile_image}
                postTitle={post.title}
                postImage={post.image}
                postBody={post.body}
                timestamp={post.timestamp}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Posts
