import React, { Component } from 'react'
import moment from 'moment'
import './style.css'
import { Link } from 'react-router-dom'
import defaultPostImage from '../../assets/space.jpeg'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }
  }

  toggleMenu = event => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  renderDelete = () => {
    // how do i only show this on the post clicked?
    // my thoughts:
    //     - display only where id === id given

    // other option:
    // could take to another page for
    // editing / deleting if i can figure it out?
    return (
      <div className={this.state.showMenu ? '' : 'hidden'}>
        <div className="columnCentering widthbig">
          <button onClick={this.postDelete}>Delete Post?</button>
        </div>
      </div>
    )
  }
  postDelete = () => {
    console.log(this.props.id)
    // axios call delete

    // axios.delete(`/api/posts/delete/${this.props.id}`).then(Response => {})
  }

  render() {
    return (
      <div>
        <section className="requestBoxCentering">
          <section className="widthbig boxShadow">
            <div className="requestBoxTopBar">
              <Link to={`/Profile/${this.props.profile_id}`}>
                <img
                  className="requestBoxProfileImage"
                  src={imageOrDefault(this.props.profileImage)}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link to={`/Profile/${this.props.profile_id}`}>
                  <h4 className="requestBoxProfileName">
                    {this.props.profileName}
                  </h4>
                </Link>
                <p className="requestBoxDate">{this.props.timestamp}</p>
              </div>
              <i onClick={this.toggleMenu} className="fas fa-ellipsis-v" />
            </div>
            {this.renderDelete()}
            <h4 className="requestBoxTitle">{this.props.postTitle}</h4>
            <img
              className="requestBoxImage"
              src={imageOrDefault(this.props.postImage)}
              alt="request"
            />
            <p>{this.props.postBody}</p>
            <div className="requestBoxMiddleBar">
              <Link to={`/PostWithComments/${this.props.id}`}>
                <i
                  onClick={this.CommentIDToBePassedToDataStore}
                  className="far fa-comment"
                />
              </Link>
              {/* create endpoint that adds this to your 
              interested posts and totals up the number 
              and displays below */}
              {/* add comments here with conditions:
                - on page post with comments make comments 
                  logo and text hidden (faintly remeber there 
                    is a way for this. its something params
                    and can be checked in the console)
                - then display comments */}
              <a href="#">
                <i className="fas fa-magnet" />
              </a>
            </div>
            <div className="requestBoxBottomBar">
              <Link
                onClick={this.CommentIDToBePassedToDataStore}
                to={`/PostWithComments/${this.props.id}`}
                className="requestBoxBottomBarInfo"
              >
                {this.props.comment_count} comments
              </Link>
              <Link to="/PeopleInterested" className="requestBoxBottomBarInfo">
                5 Interested
              </Link>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Post
