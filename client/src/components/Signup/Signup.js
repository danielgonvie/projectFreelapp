import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'
import "./Signup.css"
import { Link } from 'react-router-dom'
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
      <div className="signup-artist-page">
            <Link className="back-link bounce" to="/">
      <h1 className="absolute-arrow">⇠ Volver</h1>
      </Link>
      <div className="signup-box">
      <h1 className="title">SignUp</h1>
        <form className="signup-fields" onSubmit={this.handleSignUp}>
          <label className="login-labels" htmlFor="email">Email: </label>
          <input className="login-field" type="text" name="email" value={email} required onChange={this.handleChange}/>
          <label className="login-labels" htmlFor="password">Password: </label>
          <input className="login-field" type="password" value={password} name="password" required onChange={this.handleChange}/>
          
          <div className="upload-btn-wrapper">
         <button className="btn">Upload a file</button>
           <input className="signup-upload" type="file" name="picture" onChange={this.handleUpload} />
        </div>
          <input className="signup-button" type="submit" value="Create account"/>
        </form>
      </div>
      </div>
    )
  }
}
