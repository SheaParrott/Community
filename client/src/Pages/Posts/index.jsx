import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import axios from 'axios'

class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        interested_posts: [],
        recommended_posts: []
      }
    }
  }

  componentDidMount = () => {
    // api to fetch the profile and the related posts
    axios
      .get(`/api/profiles/${this.props.match.params.profile_id}`)
      .then(response => {
        this.setState({ profile: response.data.profile })
      })
  }

  render() {
    const posts =
      this.props.match.params.kind === 'interested'
        ? this.state.profile.interested_posts
        : this.state.profile.recommended_posts

    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <button onClick={this.test}>test</button>
          {posts.map(post => {
            console.log(post)
            return (
              <Post
                key={post.id}
                id={post.id}
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
