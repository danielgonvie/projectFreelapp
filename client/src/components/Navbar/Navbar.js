import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
    this.state = {
      user: this.props.user
    };
  }

  handleLogout = e => {
    const { history } = this.props;
    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState = {
          user: null
        };
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    let profile = <React.Fragment></React.Fragment>;
    if(this.props.user !== null && this.props.user !== undefined){
    
    if (this.props.user.category ) {
      profile = (
        <Link
          style={{ textDecoration: "none" }}
          className="navbar-logo-link"
          to={"/artists/" + this.props.user.id}
        >
          <h2>Mi perfil</h2>
        </Link>
      );
    }}
    let navbar = <React.Fragment></React.Fragment>;
    if (this.state.user !== undefined && this.state.user !== null) {
      navbar = (
        <React.Fragment>
          <div className="navbar-functions-logged">
            
              <img
                className="navbar-profile-img"
                src={this.props.user.picture}
              ></img>
         
            {profile}
            <Link
              style={{ textDecoration: "none" }}
              className="navbar-logo-link"
              onClick={e => this.handleLogout(e)}
              to="/"
            >
              <h2>Logout</h2>
            </Link>
          </div>
        </React.Fragment>
      );
    } else {
      navbar = (
        <React.Fragment>
          <div className="navbar-functions">
            <Link
              style={{ textDecoration: "none" }}
              className="navbar-logo-link"
              to="/login"
            >
              <h2>Login</h2>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="navbar-logo-link"
              to="/signup"
            >
              <h2>SignUp</h2>
            </Link>
          </div>{" "}
        </React.Fragment>
      );
    }

    return (
      <nav className="navbar-bar">
        <div className="navbar-logo">
          <Link
            style={{ textDecoration: "none" }}
            className="navbar-logo-link"
            to="/"
          >
            {" "}
            <h1>Logo</h1>
          </Link>
        </div>
        {navbar}
      </nav>
    );
  }
}
