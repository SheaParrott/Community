import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Notifications: [],
      loading: false
    }
  }

  componentDidMount = () => {
    axios.get('/api/comments').then(response => {
      if (response.data.comments.length === 0) {
        console.log('no data')
        this.setState({
          loading: true
        })
      } else {
        console.log('data')
        this.setState({
          loading: true,
          Notifications: response.data.comments
        })
      }
    })
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    }
  }

  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  render() {
    if (!this.state.loading) {
      return this.renderLoading()
    }
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
                      className="notificationsBoxProfileImage box-secondary"
                      src={imageOrDefault(notification.profile_image)}
                      alt="profile"
                    />
                  </Link>
                  <h5 className="notifications">
                    <Link
                      className="text-secondary"
                      to={`/Profile/${notification.profile_id}`}
                    >
                      {notification.profile_name}
                    </Link>{' '}
                    <strong className="post">commented on your</strong>{' '}
                    <Link
                      className="text-secondary"
                      to={`/PostWithComments/${notification.id}`}
                    >
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
