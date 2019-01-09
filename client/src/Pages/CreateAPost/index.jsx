import React, { Component } from 'react'
import Header from '../../Components/Header'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import insertImage from '../../assets/insert-image.png'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Footer from '../../Components/Footer'

class CreateAPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      header: '',
      image: '',
      body: []
    }
  }
  render() {
    return (
      <div>
        <Header />

        <section className="createAPostCentering">
          <h1 className="createAPost">Create a post</h1>
          <section className="createAPostBox">
            <h4 className="createAPostTitle">You header text here</h4>
            <img className="createAPostImage" src={insertImage} alt="request" />
            <ul>
              <li>body notes</li>
              <li>body notes</li>
            </ul>
          </section>
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
          <button>Submit Post</button>
        </section>
        <Footer />
      </div>
    )
  }
}

export default CreateAPost

// 3 input boxes
// one chnages state for Header
// one changes state for Image
// last pushes the line onto the new array and then is mapped over to create the new li's

// would be nice if i can a more interactive post
// - add straight to the post
//   - click the header area to add in
//   - click an image area to add image
//   - click on first li to create first then enter to start a new li
