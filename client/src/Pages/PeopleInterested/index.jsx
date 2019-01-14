import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import profileimg from '../../assets/picklerick.jpg'
import Header from '../../Components/Header'
import { observer } from 'mobx-react'

class MyCommunity extends Component {
  render() {
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <div className="PeopleInterestedBox">
            <section className="PeopleInterestedBox">
              <Link to="/Profile">
                <img
                  className="PeopleInterestedProfileImage"
                  src={profileimg}
                  alt="profile"
                />
              </Link>
              <Link to="/Profile">
                <h3 className="PeopleInterested">Pickle Rick</h3>
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
