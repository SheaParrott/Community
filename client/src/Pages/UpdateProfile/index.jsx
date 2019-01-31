import React, { Component } from 'react'
import './style.css'
import history from '../../history'
import axios from 'axios'
import Header from '../../Components/Header'
import auth from '../../auth'
import Loading from '../../Components/Loading'
import imageOrDefault from '../../imageOrDefault'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      loading: true,
      profileImage: null,
      coverImage: null,
      quote: '',
      aboutMe: ''
    }
  }

  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      axios.get(`/api/tags`).then(response => {
        this.setState({ tags: response.data.tags })
      })
      axios
        .get(`/api/profiles/current`, {
          headers: {
            Authorization: `Bearer ${auth.getIdToken()}`
          }
        })
        .then(response => {
          this.setState({
            profile: response.data.profile,
            loading: false,
            quote: response.data.profile.quote,
            aboutMe: response.data.profile.about_me
          })
        })
    }
  }
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  updateProfile = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    axios.put('/api/profiles/update', formData).then(response => {
      form.reset()
      history.push('/Profile')
    })
  }

  handleCoverChange = event => {
    if (!event.target.files[0]) {
      return
    }
    this.setState({
      coverImage: URL.createObjectURL(event.target.files[0])
    })
  }
  handleProfileChange = event => {
    if (!event.target.files[0]) {
      return
    }
    this.setState({
      profileImage: URL.createObjectURL(event.target.files[0])
    })
  }
  handleQuoteChange = event => {
    console.log(event.target.value)
    this.setState({
      quote: event.target.value
    })
  }
  handleAboutMeChange = event => {
    console.log(event.target.value)
    this.setState({
      aboutMe: event.target.value
    })
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading()
    }
    return (
      <div className="columnCentering">
        <Header />
        <form onSubmit={this.updateProfile}>
          <div className="moreMarginFromHeader columnCentering boxShadow widthbig">
            <div>
              <h3 className="updateProfile">Update profile</h3>
              <div className="someMargin columnCentering">
                <h4 className="someMargin">Cover Image</h4>
                <img
                  className="createAPostImage boxShadow"
                  src={
                    this.state.coverImage
                      ? this.state.coverImage
                      : imageOrDefault(this.state.profile.cover_image)
                  }
                  alt="cover"
                />
                <input
                  onChange={this.handleCoverChange}
                  type="file"
                  name="profile[cover_image]"
                />
              </div>
              <div className="someMargin columnCentering">
                <h4 className="someMargin">Profile Image</h4>
                <img
                  className="createAPostImage boxShadow"
                  src={
                    this.state.profileImage
                      ? this.state.profileImage
                      : imageOrDefault(this.state.profile.profile_image)
                  }
                  alt="cover"
                />
                <input
                  onChange={this.handleProfileChange}
                  type="file"
                  name="profile[profile_image]"
                />
              </div>
              <div className="someMargin">
                <h4 className="someMargin">Quote</h4>
                <textarea
                  onChange={this.handleQuoteChange}
                  value={this.state.quote}
                  rows="2"
                  className="width"
                  type="text"
                  name="profile[quote]"
                />
              </div>
              <div className="someMargin">
                <h4 className="someMargin">About Me</h4>
                <textarea
                  onChange={this.handleAboutMeChange}
                  value={this.state.aboutMe}
                  rows="5"
                  className="width"
                  type="text"
                  name="profile[about_me]"
                />
              </div>
            </div>
            <section className="width columnCentering boxShadow tagsBox">
              <h4 className="someMargin">Strengths / Weaknesses</h4>
              <section className="tagsBox">
                {this.state.tags
                  .filter(removeAdmin => {
                    return removeAdmin.name !== 'admin'
                  })
                  .map(tag => {
                    return (
                      <h5 className="tag" key={tag.id}>
                        <input
                          type="checkbox"
                          value={tag.id}
                          name="profile[tag_ids][]"
                          placeholder={tag.name}
                        />
                        <label>{tag.name}</label>
                      </h5>
                    )
                  })}
              </section>
            </section>
            <br />

            <button className="someMargin width" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateProfile
