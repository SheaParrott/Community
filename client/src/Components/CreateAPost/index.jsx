import React, { Component } from 'react'

import insertImage from '../../assets/insert-image.png'
import './style.css'
import axios from 'axios'
import auth from '../../auth'

class CreateAPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      errors: [],
      file: null
    }
  }

  componentDidMount = () => {
    axios
      .get(`/api/tags`, {
        headers: {
          Authorization: `Bearer ${auth.getIdToken()}`
        }
      })
      .then(response => {
        this.setState({ tags: response.data.tags })
      })
  }

  createPost = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    axios.post('/api/posts', formData).then(response => {
      if (response.data.errors) {
        this.setState({
          errors: response.data.errors
        })
      } else {
        this.props.reloadProfilePage()
        form.reset()
      }
    })
  }
  handleChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  render() {
    return (
      <div
        className={`widthbig boxShadow whiteBackground ${
          this.props.showForm ? '' : 'hidden'
        }`}
      >
        <form onSubmit={this.createPost}>
          <section className="createAPostCentering">
            {this.state.errors.map((error, index) => {
              return (
                <h4 key={index} className="red">
                  *{error}
                </h4>
              )
            })}
            <section className="columnCentering">
              <input
                className="createAPost"
                type="text"
                name="post[title]"
                placeholder="Edit header text here"
              />
              <img
                className="createAPostImage boxShadow"
                src={!this.state.file ? insertImage : this.state.file}
                alt="request"
              />
              <input
                onChange={this.handleChange}
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
            <section className="tagsBox widthbig boxShadow">
              {this.state.tags.map(tag => {
                return (
                  <h5 className="tag" key={tag.id}>
                    <input
                      type="checkbox"
                      value={tag.id}
                      name="post[tag_ids][]"
                      placeholder={tag.name}
                    />
                    <label>{tag.name}</label>
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

export default CreateAPost
