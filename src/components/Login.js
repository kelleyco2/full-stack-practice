import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../ducks/reducer'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor() {
      super()
    
      this.state = {
        email: '',
        password: '',
        error: ''
      }
    }

    handleChange = (val, key) => {
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

    handleClick = () => {
        Axios.post('/auth/login', this.state).then(res => {
            let user = res.data
            this.props.userLoggedIn(user)
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleClick()
        }
    }
    
  render() {
    return this.props.isAuthenticated ? 
        <Redirect to='/Dashboard' />
        :
        <div>
            <input type="text" placeholder='Email' onChange={(e) => this.handleChange(e.target.value, 'email')} value={this.state.email}/>
            <input type="password" placeholder='Password' onChange={(e) => this.handleChange(e.target.value, 'password')} value={this.state.password} onKeyPress={this.handleKeyPress}/>
            <button onClick={this.handleClick}>
                Login
            </button>
        </div>
  }
}

function mapStateToProps(state){
    let { isAuthenticated } = state
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { userLoggedIn })(Login)
