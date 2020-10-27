//hamburger icon - home, favorites, profile, new dono, pending pickups, logout
//routes
//new dono page
//logo 

import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../ducks/authReducer'
import './Header.css';

// const menuIcon = document.querySelector('.hamburger-menu')
// const header = document.querySelector('.header')

// class Header extends Component {
//   constructor(){
//     super()
//     this.menuIconRef = createRef()
//     this.headerRef = createRef()
//   }
//   componentDidMount(){
//     this.menuIconRef.addEventListener('click', () => {
//       this.headerRef.classList.toggle('change');
//     })
//   }
//   render() {
//     return(
//       <div className="container">
//         <nav className="header" ref={this.headerRef}>
//           <div className="hamburger-menu" ref={this.menuIconRef}>
//             <div className="line line-1"></div>
//             <div className="line line-2"></div>
//             <div className="line line-3"></div>


class Header extends Component {
  constructor() {
    super()
    // this.menuIconRef = createRef()
    this.headerRef = createRef()
    this.handleHamburgerMenuClick = this.handleHamburgerMenuClick.bind(this)
  }
  // componentDidMount() {
  // this.menuIconRef.addEventListener('click', () => {
  //   this.headerRef.classList.toggle('change');
  // })
  // console.log(this.headerRef)
  // }
  handleHamburgerMenuClick() {

    this.headerRef.current.classList.toggle('change');
  }

  render(props) {
    return (
      <div className="container">
        {console.log(this.props)}
        <Link className="dono" to="/Landing"> <img className="dono" src="https://i.imgur.com/tuFQHxN.png" /></Link>
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
              <Link to="/Favorites" className="header-link" >Favorites</Link>
            </li>
            {/* <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/New" className="header-link" >New Dono</Link>
            </li> */}
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/Profile" className="header-link" >Profile</Link>
            </li>
            <li onClick={this.handleHamburgerMenuClick} className="header-item">
              <Link to="/logout" className="header-link" onClick={() => this.props.logoutUser()} >Logout</Link>
            </li>
          </ul>

        </nav>
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { logoutUser })(Header)