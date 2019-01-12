import React, { Component } from 'react'
import Header from '../../Components/Header'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import insertImage from '../../assets/insert-image.png'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import myDataStore from '../DataStore/DataStore'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

class CreateAPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showImageInput: undefined
    }
  }

  createPost = event => {
    event.preventDefault()
    // FormData
    // pass data to datastore and create the post

    console.log(FormData)
  }
  ImageInput = () => {
    this.setState({
      showImageInput: true
    })
  }

  postImage = () => {
    // return
    // // <input type="file" name="post[:post_image]" placeholder="image" />

    if (this.state.showImageInput) {
      return (
        <input
          className="createAPostImage"
          type="file"
          name="post[:post_image]"
          placeholder="image"
        />
      )
    } else {
      return (
        <img
          onClick={this.ImageInput}
          className="createAPostImage"
          src={insertImage}
          alt="request"
        />
      )
    }
  }
  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.createPost}>
          <section className="createAPostCentering">
            <h1 className="createAPost">Create a post</h1>
            <section className="createAPostBox">
              <input
                className="createAPost"
                type="text"
                name="post[title]"
                placeholder="Edit header text here"
              />
              {this.postImage()}
              <input
                className="createAPost"
                type="text"
                name="post[body]"
                placeholder="Edit Body Here"
              />
            </section>
            <section className="tagsBox">
              {myDataStore.AllTags.map(tag => {
                // console.log(toJS(tag))
                return (
                  <h5 className="tag" key={toJS(tag.id)}>
                    <input
                      type="checkbox"
                      value={toJS(tag.id)}
                      name="post[tag_ids][]"
                      placeholder={toJS(tag.name)}
                    />
                    <label>{toJS(tag.name)}</label>
                  </h5>
                )
              })}
            </section>
            <button type="submit">Submit Post</button>
          </section>
        </form>
        <Footer />
      </div>
    )
  }
}

export default observer(CreateAPost)
