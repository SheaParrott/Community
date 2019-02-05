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
  updateComment = event => {
    event.preventDefault()
    // "/api/comments/update"

    console.log('updatecomment')
    // axios.put('/api/comments/update').then(response => {
    //   console.log(response.data)
    // })
    // updateComment={this.state.updateComment}
    // handleUpdateComment={this.handleUpdateComment}
  }

  render() {
    let updateOrCreate = this.props.updateComment ? 'id' : 'post_id'
    return (
      <>
        {' '}
        {this.state.errors.map((error, index) => {
          return (
            <h5 className="secondary-text" key={index}>
              {` * ${error}`}
            </h5>
          )
        })}
        <form
          onSubmit={
            this.props.updateComment ? this.updateComment : this.createComment
          }
          className={`${this.props.updateComment ? 'row' : 'widthbig'}`}
        >
          <input
            type="hidden"
            name={`comment[${updateOrCreate}]`}
            value={this.props.post_id}
          />
          <textarea
            rows="3"
            className="comment "
            type="text"
            name="comment[body]"
            placeholder="Your new comment Here"
          />
          {this.props.updateComment ? (
            <button type="submit">
              <i className="fas fa-check" />
            </button>
          ) : (
            <button type="submit" className="comment">
              SUBMIT
            </button>
          )}
        </form>
      </>
    )
  }
}

export default CommentForm
