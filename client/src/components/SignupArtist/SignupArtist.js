import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "./SignupArtist.css";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    email: "",
    password: "",
    picture: "",
    name: "",
    alias: "",
    toggleAlias: "",
    location: {
      city: "",
      country: "",
    },
    category: "",
    subcategory: "",
    availability: "",
    contactEmail: "",
    contactPhone: "",
    social: {
      instagram: "",
      other: "",
      soundcloud: "",
      github: ""
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleChange2 = e => {
    const { name, value } = e.target;
    let location = {...this.state.location}
    location[name]= value;
    this.setState({ ...this.state, location});
  };

  handleChange3 = e => {
    const { name, value } = e.target;
    let social = {...this.state.social}
    social[name]= value;
    this.setState({ ...this.state, social});
  };



  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signupArtist(this.state).then(
      user => {
        setUser(user);
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);
    this.authService.upload(uploadData).then(
      data => {
        this.setState({ ...this.state, picture: data.secure_url });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { email, password, picture } = this.state;
    const name = this.state.name;
    const alias = this.state.alias ;
    const toggleAlias = this.state.toggleAlias ;
    const city = this.state.location.city ;
    const country = this.state.location.country ;
    const category = this.state.category ;
    const subcategory = this.state.subcategory ;
    const availability = this.state.availability ;
    const contactEmail = this.state.contactEmail ;
    const contactPhone = this.state.contactPhone ;
    const instagram = this.state.social.instagram ;
    const other = this.state.social.other ;
    const soundcloud = this.state.social.soundcloud ;
    const github = this.state.social.github ;


    return (
      <div className="signup-artist-page">
        <Link className="back-link bounce" to="/">
          <h1 className="absolute-arrow">⇠ Volver</h1>
        </Link>
        {/* <div className="signup-box"> */}
          <h1 className="title">SignUp</h1>
          <form className="signup-fields" onSubmit={this.handleSignUp}>
            <label className="login-labels" htmlFor="email">
              Email:
            </label>
            <input
              className="login-field"
              type="text"
              name="email"
              value={email}
              required
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="password">
              Password:
            </label>
            <input
              className="login-field"
              type="password"
              value={password}
              name="password"
              required
              onChange={this.handleChange}
            />
             <label className="login-labels" htmlFor="name">
              name:
            </label>
            <input
              className="login-field"
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="alias">
              Alias:
            </label>
            <input
              className="login-field"
              type="text"
              value={alias}
              name="alias"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="toggleAlias">
              Mostrar nombre o alias:
            </label>
            <input
              className="login-field"
              type="text"
              value={toggleAlias}
              name="toggleAlias"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="city">
              Ciudad:
            </label>
            <input
              className="login-field"
              type="text"
              value={city}
              name="city"
              onChange={this.handleChange2}
            />
            <label className="login-labels" htmlFor="country">
              País:
            </label>
            <input
              className="login-field"
              type="text"
              value={country}
              name="country"
              onChange={this.handleChange2}
            />
            <label className="login-labels" htmlFor="category">
              category:
            </label>
            <input
              className="login-field"
              type="text"
              value={category}
              name="category"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="subcategory">
              subcategory:
            </label>
            <input
              className="login-field"
              type="text"
              value={subcategory}
              name="subcategory"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="availability">
              availability:
            </label>
            <input
              className="login-field"
              type="text"
              value={availability}
              name="availability"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="contactEmail">
              contactEmail:
            </label>
            <input
              className="login-field"
              type="text"
              value={contactEmail}
              name="contactEmail"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="contactPhone">
              contactPhone:
            </label>
            <input
              className="login-field"
              type="text"
              value={contactPhone}
              name="contactPhone"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="instagram">
              instagram:
            </label>
            <input
              className="login-field"
              type="text"
              value={instagram}
              name="instagram"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="soundcloud">
              soundcloud:
            </label>
            <input
              className="login-field"
              type="text"
              value={soundcloud}
              name="soundcloud"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="github">
              github:
            </label>
            <input
              className="login-field"
              type="text"
              value={github}
              name="github"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="other">
              other:
            </label>
            <input
              className="login-field"
              type="text"
              value={other}
              name="other"
              onChange={this.handleChange3}
            />


            <div className="upload-btn-wrapper">
              <button className="btn">Upload a file</button>
              <input
                className="signup-upload"
                type="file"
                name="picture"
                onChange={this.handleUpload}
              />
            </div>
            <input
              className="signup-button"
              type="submit"
              value="Create account"
            />
          </form>
        </div>
      /* </div> */
    );
  }
}
