import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { observer } from 'mobx-react'

class MyCommunity extends Component {
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <div className="allMyCommunityBox">
            <section className="allMyCommunityBox width">
              <Link to="/Profile">
                <img
                  className="allMyCommunityProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <h3 className="allMyCommunity">Pickle Rick</h3>
              </Link>

              <i className="fas fa-ellipsis-v" />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(MyCommunity)
