import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imageOrDefault from '../imageOrDefault'
import CurrentProfileHelper from '../currentProfileHelper'
import axios from 'axios'

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
    axios.delete(`/api/comment/${this.props.comment.id}`).then(response => {
      this.props.fetchPost()
      this.setState({
        commentOptions: false
      })
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
                onClick={this.toggleUpdateComment}
                className="popUpMenu blue"
              >
                {/* toggleUpdateComment will show the inputs to Update
            - build a form with the following:
            - need a hidden field with the id as value
            - need a text area to submit  */}
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
        <Link
          to={CurrentProfileHelper(
            this.props.comment.current_profile_author,
            this.props.comment.author_id
          )}
        >
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
            <Link
              to={CurrentProfileHelper(
                this.props.comment.current_profile_author,
                this.props.comment.author_id
              )}
            >
              <h6 className="comment text-secondary">
                {this.props.comment.author_name}
              </h6>
            </Link>
            <p className="comment">{this.props.comment.body}</p>
          </div>
          {this.popupOptions()}
        </section>
      </div>
    )
  }
}

export default Comment
