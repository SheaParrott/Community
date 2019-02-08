import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imageOrDefault from '../imageOrDefault'
import axios from 'axios'
import CommentForm from './CommentForm'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentOptions: false
    }
  }
  handleCommentOptions = () => {
    this.setState({
      commentOptions: !this.state.commentOptions
    })
  }
  deleteComment = () => {
    axios.delete(`/api/comments/${this.props.comment.id}`).then(response => {
      this.props.fetchPost()
      this.setState({
        commentOptions: false
      })
    })
  }
  handleUpdateComment = () => {
    this.setState({
      updateComment: !this.state.updateComment
    })
    this.handleCommentOptions()
  }
  commentUpdated = () => {
    this.setState({
      updateComment: !this.state.updateComment
    })
  }
  popupOptions = () => {
    return (
      <div className="commentBox">
        <div>
          <div className="popUp ">
            <span
              className={`popUptext ${
                this.state.commentOptions ? '' : 'hidden'
              }`}
            >
              <div onClick={this.deleteComment} className="popUpMenu red">
                <i className="fas fa-trash-alt" />
                <p>Delete Comment</p>
              </div>
              <div
                onClick={this.handleUpdateComment}
                className="popUpMenu blue"
              >
                <i className="fas fa-pencil-alt" />
                <p>Update Comment</p>
              </div>
            </span>
          </div>
          <i
            onClick={this.handleCommentOptions}
            className={`fas fa-ellipsis-v commentOptions ${
              this.props.comment.current_profile_author ? '' : 'VisHidden'
            }`}
          />
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="comment widthbig">
        <Link to={`/Profile/${this.props.comment.author_id}`}>
          <div className="profileImageContainer">
            <img
              className="commentProfileImage box-secondary"
              src={imageOrDefault(this.props.comment.author_image)}
              alt="profile"
            />
          </div>
        </Link>
        <section className="commentBox width">
          <div>
            <Link to={`/Profile/${this.props.comment.author_id}`}>
              <h6 className="comment text-secondary">
                {this.props.comment.author_name}
              </h6>
            </Link>
            {this.state.updateComment ? (
              <CommentForm
                comment={this.props.comment}
                updateComment={this.state.updateComment}
                commentUpdated={this.commentUpdated}
                fetchPost={this.props.fetchPost}
              />
            ) : (
              <p className="comment">{this.props.comment.body}</p>
            )}
          </div>
          {this.popupOptions()}
        </section>
      </div>
    )
  }
}

export default Comment
