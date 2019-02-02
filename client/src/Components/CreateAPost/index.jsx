import React, { Component } from 'react'

import insertImage from '../../assets/insert-image.png'
import './style.css'
import axios from 'axios'
import auth from '../../auth'
import loadingIMG from '../../assets/purpleloading.gif'
import imageOrDefault from '../../imageOrDefault'

class CreateAPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      errors: [],
      file: null,
      post: {
        id: null,
        title: undefined,
        image: undefined,
        body: undefined,
        tags: undefined
      },
      UpdatingAndWaitingOnData: true
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
    if (this.props.updateAPost) {
      this.fetchPost()
    }
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
        this.setState({
          file: null
        })
      }
    })
  }
  fetchPost = () => {
    axios.get(`/api/posts/${this.props.post.id}`).then(response => {
      console.log(response.data)
      this.setState({
        post: response.data.post,
        UpdatingAndWaitingOnData: false
      })
    })
  }
  handleChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  postImage = () => {
    if (!this.props.updateAPost) {
      return insertImage
    } else if (this.props.updateAPost && this.state.UpdatingAndWaitingOnData) {
      return loadingIMG
    } else if (this.props.updateAPost && !this.state.UpdatingAndWaitingOnData) {
      return imageOrDefault(this.state.post.image)
    }
  }
  chosenTags = tag => {
    if (this.props.updateAPost && !this.state.UpdatingAndWaitingOnData) {
      return this.state.post.tags.find(tagg => {
        return tagg.name.includes(tag)
      })
    }
  }

  render() {
    return (
      <div className="widthbig boxShadow whiteBackground">
        <form onSubmit={this.createPost}>
          <section className="createAPostCentering">
            {this.state.errors.map((error, index) => {
              return (
                <h4 key={index} className="secondary-text">
                  {` * ${error}.`}
                </h4>
              )
            })}
            <section className="columnCentering">
              <textarea
                rows="2"
                className="createAPost"
                type="text"
                name="post[title]"
                value={this.state.post.title}
              />
              <img
                className="createAPostImage boxShadow"
                src={!this.state.file ? this.postImage() : this.state.file}
                alt="request"
              />
              <input
                onChange={this.handleChange}
                className="createAPostImage"
                type="file"
                name="post[post_image]"
              />
              <textarea
                className="createAPost"
                type="text"
                name="post[body]"
                rows="4"
                value={this.state.post.body}
              />
            </section>
            <section className="tagsBox widthbig boxShadow">
              {this.state.tags
                .filter(removeAdmin => {
                  return removeAdmin.name !== 'admin'
                })
                .map(tag => {
                  return (
                    <h5 className="tag" key={tag.id}>
                      <input
                        type="checkbox"
                        value={tag.id}
                        name="post[tag_ids][]"
                        placeholder={tag.name}
                        checked={this.chosenTags(tag.name)}
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
