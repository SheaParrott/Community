import React, { Component } from 'react'
import './style.css'
import history from '../../history'
import axios from 'axios'
import Header from '../../Components/Header'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: []
    }
  }

  componentDidMount = () => {
    axios.get(`/api/tags`).then(response => {
      this.setState({ tags: response.data.tags })
    })
  }

  updateProfile = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    axios.put('/api/profiles/update', formData).then(response => {
      form.reset()
      history.push('/Profile')
    })
  }

  render() {
    return (
      <div className="columnCentering">
        <Header />
        <form onSubmit={this.updateProfile}>
          <div className="moreMarginFromHeader columnCentering boxShadow widthbig">
            <div>
              <div className="someMargin">
                <h3 className="updateProfile">Update profile</h3>
                <h4 className="someMargin">Cover Image</h4>
                <input type="file" name="profile[cover_image]" />
              </div>
              <div className="someMargin">
                <h4 className="someMargin">Profile Image</h4>
                <input type="file" name="profile[profile_image]" />
              </div>
              <div className="someMargin">
                <h4 className="someMargin">Quote</h4>
                <input
                  className="width"
                  type="text"
                  name="profile[quote]"
                  placeholder="Edit Quote Me Here"
                />
              </div>
              <div className="someMargin">
                <h4 className="someMargin">About Me</h4>
                <input
                  className="width"
                  type="text"
                  name="profile[about_me]"
                  placeholder="Edit About Me Here"
                />
              </div>
            </div>
            <section className="width columnCentering boxShadow">
              <h4 className="someMargin">Strengths / Weaknesses</h4>
              <section className="tagsBox">
                {this.state.tags.map(tag => {
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

            <button className="someMargin" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateProfile
