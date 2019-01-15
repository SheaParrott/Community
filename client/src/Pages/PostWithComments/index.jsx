import React, { Component } from 'react'
import profileimg from '../../assets/picklerick.jpg'
import './style.css'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import axios from 'axios'

//
// three lines is called a hamburger menu
//

// id: post.id,
// title: post.title,
// image: url_for(post.post_image),
// body: post.body,
// profile_id: post.author.id,
// profile_name: post.author.name,
// profile_image: url_for(post.author.profile_image)

class PostWithComments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
  }

  componentDidMount = () => {
    axios
      .get(`/api/posts/${this.props.match.params.post_id}`)
      .then(response => {
        // console.log(response.data.post)
        this.setState({ post: response.data.post })
      })
  }

  testing = () => {}

  render() {
    if (!this.state.post) {
      return <></>
    }

    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader widthbig">
          <button onClick={this.testing}>testing</button>
          <section className="requestBoxCentering">
            <section className="requestBox boxShadow">
              <div className="requestBoxTopBar">
                <Link to={`/Profile/${this.state.post.profile_id}`}>
                  <img
                    data-profile={toJS(this.state.post.profile_id)}
                    className="requestBoxProfileImage"
                    src={toJS(this.state.post.profile_image)}
                    alt="profile"
                  />
                </Link>
                <div className="requestBoxTopBarInfo">
                  <Link to={`/Profile/${this.state.post.profile_id}`}>
                    <h4
                      data-profile={toJS(this.state.post.profile_id)}
                      className="requestBoxProfileName"
                    >
                      {toJS(this.state.post.profile_name)}
                    </h4>
                  </Link>
                  <p className="requestBoxDate">{toJS(this.state.post.time)}</p>
                </div>
                {/* this is where the delete post option goes..
                could make this the only place to edit if adding 
                to all post poses a problem */}
                <a href="#">
                  <i className="fas fa-ellipsis-v" />
                </a>
              </div>
              <h4 className="requestBoxTitle">{toJS(this.state.post.title)}</h4>
              <img
                className="requestBoxImage"
                src={toJS(this.state.post.image)}
                alt="requestBox"
              />
              <p>{toJS(this.state.post.body)}</p>
              <div className="requestBoxMiddleBar">
                <div className="requestBoxMiddleBarTwo">
                  {/* add to interested posts */}
                  <a>
                    <i className="fas fa-magnet" />
                  </a>
                </div>
              </div>
              <div className="requestBoxBottomBar">
                <Link
                  to="/PeopleInterested"
                  className="requestBoxBottomBarInfo"
                >
                  9 Interested
                </Link>
              </div>
              {/* note: start of comments  */}
              <div className="columnCentering">
                {toJS(this.state.post.comments).map(comment => {
                  return (
                    <div key={comment.id} className="comment widthbig">
                      <Link to="/Profile">
                        <img
                          className="commentProfileImage"
                          src={comment.author_image}
                          alt="profile"
                        />
                      </Link>
                      <div>
                        <Link to="/Profile">
                          <h6 className="comment">{comment.author_name}</h6>
                        </Link>
                        <p className="comment">{comment.body}</p>
                      </div>
                    </div>
                  )
                })}
                <input
                  type="text"
                  placeholder="comment here"
                  className="comment width"
                />
                <button className="comment">submit</button>
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  }
}

export default observer(PostWithComments)
