import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import { userLoggedIn } from '../ducks/reducer'
import { Redirect } from 'react-router-dom'


class Register extends Component {
    constructor() {
      super()
    
      this.state = {
         name: '',
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
        Axios.post('/auth/register', this.state).then(res => {
            let user = res.data
            this.props.userLoggedIn(user)
        })
    }
    
  render() {
    return this.props.isAuthenticated ? 
        <Redirect to='/Dashboard' />
        :
        <div>
            Register
            <input type="text" placeholder='Company Name' value={this.state.name} onChange={(e) => this.handleChange(e.target.value, 'name')}/>
            <input type="text" placeholder='Email' value={this.state.email} onChange={(e) => this.handleChange(e.target.value, 'email')}/>
            <input type="password" placeholder='Password' value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')}/>
            <button onClick={this.handleClick}>
                Register
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

export default connect(mapStateToProps, { userLoggedIn })(Register)
