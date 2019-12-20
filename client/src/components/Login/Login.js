import React, { Component } from 'react'

import AuthService from '../../services/AuthService';
import "./Login.css"
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/artists")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-artist-page">
      <Link  className="back-link bounce" to="/">
      <h1 className="absolute-arrow">⇠ Volver</h1>
      </Link>
      <div className="login-box">
        <h1 className="title">Login User</h1>
        
        <form className="login-fields" onSubmit={this.handleLogin}>
          <label className="login-labels" htmlFor="email">Email: </label>
          <input className="login-field" type="text" name="email" value={email} onChange={this.handleChange}/>
          <label className="login-labels" htmlFor="password" >Password: </label>
          <input className="login-field" type="password" name="password" value={password} onChange={this.handleChange}/>
          <div className="login-space-button">
          <input className="login-button" type="submit" value="Login"/>
          </div>
        </form>
        </div>
      
      </div>
    )
  }
}

