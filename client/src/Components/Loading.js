import React, { Component } from 'react'
import loadingIMG from '../assets/purpleloading.gif'

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loadingIMG} alt="loading" />
      </div>
    )
  }
}

export default Loading
