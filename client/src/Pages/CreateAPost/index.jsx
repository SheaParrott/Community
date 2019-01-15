import React, { Component } from 'react'

import insertImage from '../../assets/insert-image.png'
import './style.css'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import axios from 'axios'

class CreateAPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: []
    }
  }

  componentDidMount = () => {
    axios.get(`/api/tags`).then(response => {
      this.setState({ tags: response.data.tags })
    })
  }

  createPost = event => {
    event.preventDefault()
    // FormData
    // pass data to datastore and create the post
    const formData = new FormData(event.target)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    axios.post('/api/posts', formData).then(response => {
      console.log(response)
      // form.reset()
    })
  }

  render() {
    return (
      <div className={this.props.showForm ? '' : 'hidden'}>
        <form onSubmit={this.createPost}>
          <section className="createAPostCentering">
            <section className="widthbig boxShadow">
              <input
                className="createAPost"
                type="text"
                name="post[title]"
                placeholder="Edit header text here"
              />
              <img
                onClick={this.ImageInput}
                className="createAPostImage boxShadow"
                src={insertImage}
                alt="request"
              />
              <input
                className="createAPostImage"
                type="file"
                name="post[post_image]"
                placeholder="image"
              />
              <input
                className="createAPost"
                type="text"
                name="post[body]"
                placeholder="Edit Body Here"
              />
            </section>
            <section className="tagsBox boxShadow">
              {this.state.tags.map(tag => {
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
              <button className="postSubmit" type="submit">
                Submit Post
              </button>
            </section>
          </section>
        </form>
      </div>
    )
  }
}

export default observer(CreateAPost)
