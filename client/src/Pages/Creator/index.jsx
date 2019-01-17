import React, { Component } from 'react'
import CreatorImage from '../../assets/IMG_0327.jpg'
import './style.css'
import history from '../../history'
import resume from '../../assets/resume.png'

class Creator extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <i className="fas fa-arrow-left" onClick={() => history.go(-1)} />
          <h1 className="creator">Shea Parrott</h1>
        </div>
        <img className="creator boxShadow" src={CreatorImage} alt="Shea" />
        <div className="row">
          <i className="fas fa-phone" />
          <h4 className="creatorInfo">(904) 629-8670</h4>
        </div>
        <div className="col">
          <a href="https://github.com/SheaParrott" rel="noopener">
            <i className="fab fa-github" />
            <h4 className="creatorInfo">github.com/SheaParrott</h4>
          </a>
        </div>
        <div className="col">
          <a href="https://www.linkedin.com/in/shea-parrott/" rel="noopener">
            <i className="fab fa-linkedin" />
            <h4 className="creatorInfo">linkedin.com/in/shea-parrott/</h4>
          </a>
        </div>
        <div className="col">
          <a href="http://shea-portfolio.surge.sh/" rel="noopener">
            <h4 className="creatorInfo">shea-portfolio.surge.sh/</h4>
          </a>
        </div>
        <div className="col">
          <a
            className="serif"
            rel="noopener"
            href="https://docs.google.com/document/d/1Z1NtGepxXQ0KSNtZz0EUiudEEIBaKcgVpIWB3Awpvl0/edit?usp=sharing"
          >
            <strong>Link to resume</strong>
          </a>
        </div>
        <div className="col">
          <a
            className="serif"
            href="https://docs.google.com/document/d/1Z1NtGepxXQ0KSNtZz0EUiudEEIBaKcgVpIWB3Awpvl0/export?format=pdf"
          >
            <img
              className="widthbig resume boxShadow"
              src={resume}
              alt="resume"
            />
          </a>
        </div>
      </div>
    )
  }
}

export default Creator
