import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    email: '',
    password: '',
    picture: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  handleUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('picture', e.target.files[0])
    this.authService.upload(uploadData)
    .then(
      (data) => {
        this.setState({...this.state, picture: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { email, password, picture } = this.state;
    return (
      <div>
        <PageTitle color="black">SignUp</PageTitle>
        <form onSubmit={this.handleSignUp}>
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={email} required onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} name="password" required onChange={this.handleChange}/>
          <input type="file" name="picture" onChange={this.handleUpload} />
          <input type="submit" value="Create account"/>
        </form>
      </div>
    )
  }
}
