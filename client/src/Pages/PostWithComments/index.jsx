import React, { Component } from 'react'
import profileimg from '../../assets/picklerick.jpg'
import './style.css'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
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

  createComment = event => {
    event.preventDefault()
    // FormData
    // pass data to datastore and create the post
    const formData = new FormData(event.target)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    // axios.post('/api/posts', formData).then(response => {
    //   console.log(response)
    //   // form.reset()
    // })
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
                    className="requestBoxProfileImage"
                    src={this.state.post.profile_image}
                    alt="profile"
                  />
                </Link>
                <div className="requestBoxTopBarInfo">
                  <Link to={`/Profile/${this.state.post.profile_id}`}>
                    <h4 className="requestBoxProfileName">
                      {this.state.post.profile_name}
                    </h4>
                  </Link>
                  <p className="requestBoxDate">{this.state.post.time}</p>
                </div>
                {/* this is where the delete post option goes..
                could make this the only place to edit if adding 
                to all post poses a problem */}
                <a href="#">
                  <i className="fas fa-ellipsis-v" />
                </a>
              </div>
              <h4 className="requestBoxTitle">{this.state.post.title}</h4>
              <img
                className="requestBoxImage"
                src={this.state.post.image}
                alt="requestBox"
              />
              <p>{this.state.post.body}</p>
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
                {this.state.post.comments.map(comment => {
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
                <form onSubmit={this.createComment}>
                  <input
                    className="comment width"
                    type="text"
                    name="comment[body]"
                    placeholder="Your new comment Here"
                  />
                  <button type="submit" className="comment width">
                    submit
                  </button>
                </form>
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  }
}

export default PostWithComments
