import React, { Component } from 'react'
import Footer from '../../Components/Footer'
import CreatorImage from '../../assets/IMG_0327.jpg'
import './style.css'

class Creator extends Component {
  render() {
    return (
      <div>
        <div className="creator">
          {/* go to previous page arrow */}
          <i className="fas fa-arrow-left" />
          <h1 className="creator">Shea Parrott</h1>
        </div>
        <img className="creator" src={CreatorImage} alt="Shea" />
        <p className="creatorInfo">(904) 629-8670</p>
        <p className="creatorInfo">alexandergotthis@gmail.com</p>
        <p className="creatorInfo">GitHub:</p>
        <a href="https://github.com/SheaParrott" rel="noopener">
          <p className="creatorInfo">github.com/SheaParrott</p>
        </a>
        <p className="creatorInfo">LinkedIn: </p>
        <a href="https://www.linkedin.com/in/shea-parrott/" rel="noopener">
          <p className="creatorInfo">linkedin.com/in/shea-parrott/</p>
        </a>
        <a href="https://docs.google.com/document/d/1Z1NtGepxXQ0KSNtZz0EUiudEEIBaKcgVpIWB3Awpvl0/edit?usp=sharing">
          <strong>Resume</strong>
        </a>
        <Footer />
      </div>
    )
  }
}

export default Creator
