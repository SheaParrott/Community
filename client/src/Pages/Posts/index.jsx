import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { observer } from 'mobx-react'

class Posts extends Component {
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    )
  }
}

export default observer(Posts)
