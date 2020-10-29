//hamburger icon - home, favorites, profile, new dono, pending pickups, logout
//routes
//new dono page
//logo 

import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../ducks/authReducer'
import './Header.css';
import axios from 'axios';


class Header extends Component {
  constructor(props) {
    super()
    // this.menuIconRef = createRef()
    this.state = {
      pendingRatings: null
    }

    this.headerRef = createRef()
    this.handleHamburgerMenuClick = this.handleHamburgerMenuClick.bind(this)
  }
  componentDidMount(props) {
    axios.get(`/api/users/${this.props.auth.user.user_id}/ratings`).then(res => {
      this.setState({
        pendingRatings: res.data.length
      })
    }).catch(err => alert(err.message))
  }
  handleHamburgerMenuClick() {

    this.headerRef.current.classList.toggle('change');
  }

  logoutUser() {
    axios.delete('/api/auth/logout').then(res => {
      console.log(this.props)
      this.props.logoutUser()
    })
  }

  render(props) {
    return (
      <div className="container">

        <Link className="dono" to="/Landing"> <img className="dono" src="https://i.imgur.com/tuFQHxN.png" /></Link>
        {(this.state.pendingRatings) ?
          <div className="header-pending">
            <Link  to='/PendingRatings'> {this.state.pendingRatings} </Link>
          </div> : null}
        <nav className="header" ref={this.headerRef}>
          <Link to="/New" className="dono-button" ><button className="newdono-button" >New Dono</button></Link>
          <div onClick={this.handleHamburgerMenuClick} className="hamburger-menu">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
          <ul className="header-list">
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link data-toggle="collapse" to="/Landing" className="header-link" >Home</Link>
            </li>
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/Pending" className="header-link" >Pending Pickups</Link>
            </li>
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/PendingRatings" className="header-link" >Pending Ratings</Link>
            </li>
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/Favorites" className="header-link" >Favorites</Link>
            </li>
            {/* <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/New" className="header-link" >New Dono</Link>
            </li> */}
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/Profile" className="header-link" >Profile</Link>
            </li>
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/logout" className="header-link" onClick={() => this.logoutUser()} >Logout</Link>
            </li>
          </ul>

        </nav>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { logoutUser })(Header)