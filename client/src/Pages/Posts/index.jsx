import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import { observer } from 'mobx-react'
import myDataStore from '../DataStore/DataStore'

class Posts extends Component {
  test = () => {
    console.log(myDataStore.RecommendedOrInterested)
  }
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <button onClick={this.test}>test</button>
          {myDataStore.RecommendedOrInterested.map(post => {
            console.log(post.id)
            return (
              <Post
                key={post.id}
                commentID={post.id}
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

export default observer(Posts)
