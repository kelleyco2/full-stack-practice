import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux' 
import { userLoggedOut } from '../ducks/reducer' 
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

    logout = () => {
        Axios.get('/auth/logout').then(res => {
            this.props.userLoggedOut()
        })
    }

  render() {
    return this.props.isAuthenticated ? 
      <div>
        Dashboard
        <button onClick={this.logout}>
            Logout
        </button>
      </div>
      :
      <Redirect to='/' />
  }
}

function mapStateToProps(state){
    let { isAuthenticated } = state
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { userLoggedOut })(Dashboard)
