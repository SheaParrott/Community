import React, { Component } from 'react'
import moment from 'moment'
import './style.css'
import { Link } from 'react-router-dom'
import myDataStore from '../../Pages/DataStore/DataStore'
import { observer } from 'mobx-react'

class Post extends Component {
  CommentIDToBePassedToDataStore = event => {
    // console.log(this.props.commentID)
    myDataStore.getOnePost(this.props.commentID)
  }
  postOptions = event => {
    myDataStore.showOrHidePostOptions()
    // console.log(myDataStore.PostOptions)
  }
  postOptionDelete = () => {
    // console.log(this.props.commentID)
  }
  renderPostOption = () => {
    // how do i only show this on the post clicked?
    // my thoughts:
    //     - display only where id === id given

    // other option:
    // could take to another page for
    // editing / deleting if i can figure it out?
    return (
      <div className={myDataStore.PostOptions}>
        <div className="columnCentering widthbig">
          <button onClick={this.postOptionDelete}>Delete Post?</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <section className="requestBoxCentering">
          <section className="widthbig boxShadow">
            <div className="requestBoxTopBar">
              <Link to="/Profile">
                <img
                  className="requestBoxProfileImage"
                  src={this.props.profileImage}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link to="/Profile">
                  <h4 className="requestBoxProfileName">
                    {this.props.profileName}
                  </h4>
                </Link>
                <p className="requestBoxDate">{this.props.timestamp}</p>
              </div>
              <i onClick={this.postOptions} className="fas fa-ellipsis-v" />
            </div>
            {this.renderPostOption()}
            <h4 className="requestBoxTitle">{this.props.postTitle}</h4>
            <img
              className="requestBoxImage"
              src={this.props.postImage}
              alt="request"
            />
            <p>{this.props.postBody}</p>
            <div className="requestBoxMiddleBar">
              <Link to="/PostWithComments">
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
                to="/PostWithComments"
                className="requestBoxBottomBarInfo"
              >
                7 comments
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

export default observer(Post)
