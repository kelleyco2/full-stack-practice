import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {
  render() {
    return (
      <header>
          <Link to='/'>Login</Link>    
          <Link to='/Register'>Register</Link>    
          <Link to='/Dashboard'>Dashboard</Link>    
      </header>
    )
  }
}
