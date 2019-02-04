import React, { Component } from 'react'
import axios from 'axios'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: []
    }
  }
  createComment = event => {
    event.preventDefault()
    let form = event.target

    const formData = new FormData(form)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    axios.post('/api/comment/create', formData).then(response => {
      if (response.data.errors) {
        this.setState({
          errors: response.data.errors
        })
      } else {
        form.reset()
        this.props.fetchPost()
        this.setState({
          errors: []
        })
      }
    })
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.errors.map((error, index) => {
          return (
            <h5 className="secondary-text" key={index}>
              {` * ${error}`}
            </h5>
          )
        })}
        <form onSubmit={this.createComment}>
          <input
            type="hidden"
            name="comment[post_id]"
            value={this.props.post_id}
          />
          <textarea
            rows="3"
            className="comment width"
            type="text"
            name="comment[body]"
            placeholder="Your new comment Here"
          />
          <button type="submit" className="comment width">
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

export default CommentForm
