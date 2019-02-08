import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux' 
import { userLoggedOut } from '../ducks/reducer' 
import { Redirect } from 'react-router-dom'
import axios from 'axios' 

class Dashboard extends Component {
    constructor() {
      super()
    
      this.state = {
         file: null,
         email: '',
         image: '',
         rate: 0,
         per: ''
      }
    }

    componentDidMount(){
        Axios.get('/auth/currentUser').then(res => {
            this.setState({
                email: res.data.email
            })
        })
    }
    
    logout = () => {
        Axios.get('/auth/logout').then(res => {
            this.props.userLoggedOut()
        })
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        axios.post(`/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          // handle your response;
          Axios.post('/advert', {
              email: this.state.email,
              image: response.data.Location,
              rate: this.state.rate,
              per: this.state.per
          }).then(res => {
              console.log(res.data)
              this.setState({
                  image: res.data[0].adurl
              })
          })
        }).catch(error => {
          // handle your error
          console.log(error)
        });
      }
    
      handleFileUpload = (event) => {
        this.setState({file: event.target.files});
      }

      handleChange = (val, key) => {
        let obj = {}
        obj[key] = val
        this.setState(obj)
    }

  render() {
    return this.props.isAuthenticated ? 
      <div>
        Dashboard
        <button onClick={this.logout}>
            Logout
        </button>
        <form onSubmit={this.submitFile}>
            <input label='upload file' type='file' onChange={this.handleFileUpload} /> <br/>
            <input type="text" placeholder='Payout Rate' value={this.state.rate} onChange={(e) => {this.setState({rate: e.target.value})}}/> <br/>
            <input type="radio" name='rate' value='Per Mile' onChange={(e) => {this.setState({per: e.target.value})}}/>Per Mile <br/>
            <input type="radio" name='rate' value='Per Hour' onChange={(e) => {this.setState({per: e.target.value})}}/>Per Hour <br/>
            <button type='submit'>Send</button>
        </form>
        <img src={this.state.image} alt=""/>
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
