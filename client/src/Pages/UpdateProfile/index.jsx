import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

class UpdateProfile extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2>Update profile</h2>
        <h5>Cover Image</h5>
        <input type="text" />
        <h5>Profile Image</h5>
        <input type="text" />
        <h5>About Me</h5>
        <input type="text" />
        <h5>Strengths</h5>
        <section className="tagsBox">
          <h5 className="tag">sports</h5>
          <h5 className="tag">web design</h5>
          <h5 className="tag">HTML</h5>
          <h5 className="tag">CSS</h5>
          <h5 className="tag">2K18</h5>
          <h5 className="tag">somelongtag</h5>
          <h5 className="tag">sometag</h5>
          <h5 className="tag">andanothertag</h5>
        </section>
        <h5>Struggles</h5>
        <section className="tagsBox">
          <h5 className="tag">sports</h5>
          <h5 className="tag">web design</h5>
          <h5 className="tag">HTML</h5>
          <h5 className="tag">CSS</h5>
          <h5 className="tag">2K18</h5>
          <h5 className="tag">somelongtag</h5>
          <h5 className="tag">sometag</h5>
          <h5 className="tag">andanothertag</h5>
        </section>
        <br />
        <br />
        <Link to="/Profile">
          <button>SUBMIT</button>
        </Link>
        <Footer />
      </div>
    )
  }
}

export default UpdateProfile
