import React, { Component } from 'react'
import './style.css'

class AddToCommunity extends Component {
  render() {
    return (
      <div className="addToCommunityBox">
        <div className="addToCommunity">
          {/* make clickable */}
          <i className="fas fa-plus-circle" />
          <p>Add to Community</p>
        </div>
      </div>
    )
  }
}

export default AddToCommunity
