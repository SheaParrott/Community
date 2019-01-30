import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imageOrDefault from '../imageOrDefault'
import CurrentProfileHelper from '../currentProfileHelper'
import axios from 'axios'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deleteComment: false
    }
  }
  showDeleteComment = () => {
    this.setState({
      deleteComment: !this.state.deleteComment
    })
  }
  deleteComment = () => {
    axios.delete(`/api/comment/${this.props.id}`).then(response => {
      this.props.fetchPost()
    })
  }
  render() {
    return (
      <div className="comment widthbig">
        <Link
          to={CurrentProfileHelper(
            this.props.current_profile_author,
            this.props.author_id
          )}
        >
          <div className="profileImageContainer">
            <img
              className="commentProfileImage box-secondary"
              src={imageOrDefault(this.props.author_image)}
              alt="profile"
            />
          </div>
        </Link>
        <section className="commentBox width">
          <div>
            <Link
              to={CurrentProfileHelper(
                this.props.current_profile_author,
                this.props.author_id
              )}
            >
              <h6 className="comment text-secondary">
                {this.props.author_name}
              </h6>
            </Link>
            <p className="comment">{this.props.body}</p>
          </div>
          <div>
            <button
              onClick={this.deleteComment}
              className={`${this.state.deleteComment ? '' : 'hidden'}`}
            >
              Delete?
            </button>
            <i
              onClick={this.showDeleteComment}
              className={`fas fa-ellipsis-v deleteComment ${
                this.props.current_profile_author ? '' : 'VisHidden'
              }`}
            />
          </div>
        </section>
      </div>
    )
  }
}

export default Comment
