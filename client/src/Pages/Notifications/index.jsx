import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Notifications: []
    }
  }

  componentDidMount = () => {
    axios.get('/api/comments').then(response => {
      this.setState({
        Notifications: response.data.comments
      })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="marginFromHeader">
          <div className="notificationsBox columnCentering">
            {this.state.Notifications.filter(
              isAuthor => !isAuthor.is_author
            ).map((notification, index) => {
              return (
                <section
                  key={index}
                  className="notificationsBox boxShadow widthbig"
                >
                  <Link to={`/Profile/${notification.profile_id}`}>
                    <img
                      className="notificationsBoxProfileImage"
                      src={imageOrDefault(notification.profile_image)}
                      alt="profile"
                    />
                  </Link>
                  <h5>
                    <Link to={`/Profile/${notification.profile_id}`}>
                      {notification.profile_name}
                    </Link>{' '}
                    <strong className="post">commented on your</strong>{' '}
                    <Link to={`/PostWithComments/${notification.id}`}>
                      Post
                    </Link>
                  </h5>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
