import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService';
import "./LoginArtist.css"

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
    this.authService.loginArtist(this.state)
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
      <div>
        <PageTitle color="black">Login</PageTitle>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/>
          <label htmlFor="password" >Password: </label>
          <input type="password" name="password" value={password} onChange={this.handleChange}/>

          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

