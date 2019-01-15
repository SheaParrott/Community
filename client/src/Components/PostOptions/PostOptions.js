import React, { Component } from 'react'
import './style.css'

class PostOptions extends Component {
  render() {
    return (
      <div className="postOptions">
        <div className="marginFromHeader">
          {/* start of actual Component */}
          <div className="columnCentering">
            <div className="deleteBar widthbig">
              <p>Delete Post?</p>
              <button>Yes</button>
            </div>
          </div>
          {/* end of actual Component */}
        </div>
      </div>
    )
  }
}

export default PostOptions
