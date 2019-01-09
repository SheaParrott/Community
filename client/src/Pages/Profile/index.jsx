import React, { Component } from 'react'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import axios from 'axios'

import SignIn from '../SignIn/index'
import Posts from '../Posts/index'
import Header from '../../Components/Header'
import profileimg from '../../assets/picklerick.jpg'
import coverimg from '../../assets/space.jpeg'
import requestimg from '../../assets/dev.jpeg'
import Footer from '../../Components/Footer'
import Post from '../../Components/Post/Post'
import AddToCommunity from '../../Components/AddToCommunity/AddToCommunity'

// {
//   profile: {
//     name: "shea",
//     about_me: "I enjoy learning and growing through challenges",
//     quote: "resilence",
//     profile_image: url_for(profile.profile_image),
//     cover_image: url_for(profile.cover_image)
//   }
// }

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        posts: []
      },
      profileBioSection: ''
    }
  }
  componentDidMount = () => {
    axios.get(`/api/profiles/1`).then(response => {
      console.log(response.data)

      this.setState({
        profile: response.data.profile
      })
    })
  }
  AttributeClickToChangeState = event => {
    this.setState({
      profileBioSection: event.target.dataset.attribute
    })
  }
  fillInBox = () => {
    // console.log(this.state.profileBioSection)
    // will need if statements to make work right
    if (this.state.profileBioSection === '') {
      return <p>{this.state.profile.about_me}</p>
    }
    if (this.state.profileBioSection === 'STRENGTHS') {
      return (
        <ul>
          <li>eating lots of pizza</li>
          <li>coding</li>
          <li>videogames</li>
          <li>speaking positive to others</li>
        </ul>
      )
    } else if (this.state.profileBioSection === 'ABOUT ME') {
      return <p>{this.state.profile.about_me}</p>
    } else if (this.state.profileBioSection === 'STRUGGLES') {
      return (
        <ul>
          <li>react router</li>
          <li>networking</li>
          <li>social anxiety</li>
          <li>something else</li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="CoverImage">
          <img
            className="ProfileCoverImage"
            src={this.state.profile.cover_image}
            alt="profile"
          />
        </div>
        <main className="ProfileBody">
          <div className="profileTop">
            <Link to="/UpdateProfile">
              <img
                className="ProfileImage"
                src={this.state.profile.profile_image}
                alt="profile"
              />
            </Link>
            <AddToCommunity />
            <div className="profileQuote">{this.state.profile.quote}</div>
          </div>
          {/* on click fill bio box below with info */}
          {/* each struggle and strength needs to have a  tag tied to it */}
          <div className="profileAttributesBar">
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRENGTHS"
              className="profileAttributesLeft"
            >
              STRENGTHS
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="ABOUT ME"
              className="profileAttributesMiddle"
            >
              ABOUT ME
            </h6>
            <h6
              onClick={this.AttributeClickToChangeState}
              data-attribute="STRUGGLES"
              className="profileAttributesRight"
            >
              STRUGGLES
            </h6>
          </div>
          <div className="profileBio">{this.fillInBox()}</div>

          <div className="profileMyCommunityParent">
            <h6>my community:</h6>
            <div className="profileMyCommunity">
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <img
                  className="ProfileCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
            </div>
            <Link to="/MyCommunity">
              <h6>See More</h6>
            </Link>
          </div>
          <div className="ProfilePostsBox">
            <h6>Recommended Posts:</h6>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/Posts">
              <h6>See More</h6>
            </Link>
          </div>
          <div className="ProfilePostsBox">
            <h6>interested Posts:</h6>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/PostWithComments">
              <div className="ProfileRecommendedPost">
                <img
                  className="ProfileRequestBoxImage"
                  src={requestimg}
                  alt="request"
                />
                <h4>Need help with react router!!</h4>
              </div>
            </Link>
            <Link to="/Posts">
              <h6>See More</h6>
            </Link>
          </div>
          {this.state.profile.posts.map(post => {
            return (
              <Post
                key={post.id}
                profileName={this.state.profile.name}
                profileImage={this.state.profile.profile_image}
                postTitle={post.title}
                postImage={post.image}
                postBody={post.body}
                timestamp={post.timestamp}
              />
            )
          })}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Profile

// switch (event.target.dataset.attribute) {
//   case 'STRENGTHS':
//     ;<p>
//       Pokem ipsum dolor sit amet Zekrom Nidoran Togetic Girafarig Hariyama
//       Cubchoo. V for victory Remoraid Terrakion Lanturn Seviper Grimer
//       Plusle. Blizzard Elgyem Combusken Shinx Gold Luxio Leaf Green. Ivysaur
//       Houndoom Jirachi Professor Elm Spheal Gorebyss Silver. Razor Leaf
//       Kingdra Xatu Serperior Sewaddle Plusle Octillery.
//     </p>
//     break
//   case 'ABOUT ME':
//     ;<p>
//       Pokem ipsum dolor sit amet Zekrom Nidoran Togetic Girafarig Hariyama
//       Cubchoo. V for victory Remoraid Terrakion Lanturn Seviper Grimer
//       Plusle. Blizzard Elgyem Combusken Shinx Gold Luxio Leaf Green. Ivysaur
//       Houndoom Jirachi Professor Elm Spheal Gorebyss Silver. Razor Leaf
//       Kingdra Xatu Serperior Sewaddle Plusle Octillery.
//     </p>
//     break
//   case 'STRUGGLES':
//     ;<p>
//       Pokem ipsum dolor sit amet Zekrom Nidoran Togetic Girafarig Hariyama
//       Cubchoo. V for victory Remoraid Terrakion Lanturn Seviper Grimer
//       Plusle. Blizzard Elgyem Combusken Shinx Gold Luxio Leaf Green. Ivysaur
//       Houndoom Jirachi Professor Elm Spheal Gorebyss Silver. Razor Leaf
//       Kingdra Xatu Serperior Sewaddle Plusle Octillery.
//     </p>
//     break
//   default:
//     ;<p>
//       Pokem ipsum dolor sit amet Zekrom Nidoran Togetic Girafarig Hariyama
//       Cubchoo. V for victory Remoraid Terrakion Lanturn Seviper Grimer
//       Plusle. Blizzard Elgyem Combusken Shinx Gold Luxio Leaf Green. Ivysaur
//       Houndoom Jirachi Professor Elm Spheal Gorebyss Silver. Razor Leaf
//       Kingdra Xatu Serperior Sewaddle Plusle Octillery.
//     </p>
// }
