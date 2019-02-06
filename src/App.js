import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login' 
import Nav from './components/Nav' 
import Register from './components/Register'
import Dashboard from './components/Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/Register' component={Register}/>
          <Route path='/Dashboard' component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
