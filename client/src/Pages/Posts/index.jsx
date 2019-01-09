import React, { Component } from 'react'
import './style.css'
import Post from '../../Components/Post/Post'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class Posts extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Post />
        <Post />
        <Post />
        <Post />
        <Footer />
      </div>
    )
  }
}

export default Posts
