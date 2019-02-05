import React, { Component } from 'react'
import axios from 'axios'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: [],
      commentBody: ''
    }
  }
  componentDidMount = () => {
    if (this.props.updateComment) {
      this.fetchComment()
    } else {
      return
    }
  }
  fetchComment = () => {
    axios.get(`/api/comment/${this.props.comment.id}`).then(response => {
      this.setState({
        commentBody: response.data.body
      })
    })
  }
  createComment = event => {
    event.preventDefault()
    let form = event.target

    const formData = new FormData(form)

    axios.post('/api/comment/create', formData).then(response => {
      if (response.data.errors) {
        this.setState({
          errors: response.data.errors
        })
      } else {
        form.reset()
        this.props.fetchPost()
        this.setState({
          errors: [],
          commentBody: ''
        })
      }
    })
  }
  updateComment = event => {
    event.preventDefault()
    let form = event.target
    const formData = new FormData(form)

    axios.put('/api/comment/update', formData).then(response => {
      form.reset()
      this.props.commentUpdated()
      this.props.fetchPost()
    })
  }
  handleCommentChange = event => {
    this.setState({
      commentBody: event.target.value
    })
  }

  render() {
    let updateOrCreate = this.props.updateComment ? 'id' : 'post_id'
    return (
      <>
        {this.state.errors.map((error, index) => {
          return (
            <h5 className="error" key={index}>
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
            value={
              this.props.updateComment
                ? this.props.comment.id
                : this.props.post_id
            }
          />
          <textarea
            rows="3"
            className={`${this.props.updateComment ? 'form' : 'comment'}`}
            type="text"
            name="comment[body]"
            onChange={this.handleCommentChange}
            value={this.state.commentBody}
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
