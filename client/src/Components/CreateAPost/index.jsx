import React, { Component } from 'react'

import insertImage from '../../assets/insert-image.png'
import './style.css'
import axios from 'axios'
import auth from '../../auth'
import loadingIMG from '../../assets/purpleloading.gif'
import imageOrDefault from '../../imageOrDefault'
import update from 'immutability-helper'

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
      postTitle: undefined,
      postBody: undefined,
      postTags: undefined,
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

  fetchPost = () => {
    axios.get(`/api/posts/${this.props.post.id}`).then(response => {
      this.setState({
        post: response.data.post,
        postTitle: response.data.post.title,
        postBody: response.data.post.body,
        postTags: response.data.post.tags,
        UpdatingAndWaitingOnData: false
      })
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
        this.props.getProfile()
        form.reset()
        this.setState({
          file: null
        })
      }
    })
  }

  updatePost = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    axios.put('/api/posts/update', formData).then(response => {
      console.log(response.data)
      if (this.props.onProfilePage) {
        console.log('reload profile')
        this.props.getProfile()
      } else if (this.props.onPostsPage) {
        console.log('reload posts page')
        this.props.getPosts()
      } else if (this.props.onPostWithCommentsPage) {
        console.log('reload post with comments')
        this.props.fetchPost()
      }
      form.reset()
      this.props.submittedUpdatePost()
      this.setState({
        file: null
      })
    })
  }
  handleTitleTextarea = event => {
    this.setState({
      postTitle: event.target.value
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
  handleImageChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  handleBodyTextarea = event => {
    this.setState({
      postBody: event.target.value
    })
  }
  chosenTags = tag => {
    if (!tag.target) {
      if (this.props.updateAPost && !this.state.UpdatingAndWaitingOnData) {
        return this.state.postTags.find(tagg => {
          return tagg.name.includes(tag)
        })
      }
    }
  }
  handleTagInputs = event => {
    if (!this.props.updateAPost) {
      return
    }
    // use of immutability helper to push and slice from state array
    if (!event.target.checked) {
      let TheTagToBeRemoved = this.state.postTags.find(tag => {
        return tag.name === event.target.placeholder
      })

      let index = this.state.postTags.indexOf(TheTagToBeRemoved)

      this.setState({
        postTags: update(this.state.postTags, { $splice: [[index, 1]] })
      })
    } else if (event.target.checked) {
      let theNewTag = this.state.tags.find(newTag => {
        return newTag.name === event.target.placeholder
      })
      this.setState({
        postTags: update(this.state.postTags, { $push: [theNewTag] })
      })
    }
  }

  render() {
    return (
      <div className="widthbig boxShadow whiteBackground">
        <form
          onSubmit={this.props.updateAPost ? this.updatePost : this.createPost}
        >
          <section className="createAPostCentering">
            {this.state.errors.map((error, index) => {
              return (
                <h4 key={index} className="secondary-text">
                  {` * ${error}.`}
                </h4>
              )
            })}
            <section className="columnCentering">
              {this.props.updateAPost ? (
                <input
                  type="hidden"
                  name="post[id]"
                  value={this.props.post.id}
                />
              ) : null}
              <textarea
                onChange={this.handleTitleTextarea}
                rows="2"
                className="createAPost"
                type="text"
                name="post[title]"
                value={this.state.postTitle}
              />
              <img
                className="createAPostImage boxShadow"
                src={!this.state.file ? this.postImage() : this.state.file}
                alt="request"
              />
              <input
                onChange={this.handleImageChange}
                className="createAPostImage"
                type="file"
                name="post[post_image]"
              />
              <textarea
                onChange={this.handleBodyTextarea}
                className="createAPost"
                type="text"
                name="post[body]"
                rows="4"
                value={this.state.postBody}
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
                        onClick={this.handleTagInputs}
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
                Submit
              </button>
            </section>
          </section>
        </form>
      </div>
    )
  }
}

export default CreateAPost
