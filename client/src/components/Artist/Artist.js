import React, { Component } from "react";
import "./Artist.css";
import { Link } from "react-router-dom";


export default class Artist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: this.props.artist
    };
  }

  render() {
    let names = <React.Fragment></React.Fragment>;
    if (this.props.artist.toggleAlias === "name") {
      names = <h3 className="just-name">{this.props.artist.name}</h3>;
    } else if (this.props.artist.toggleAlias === "alias") {
      names = <h3 className="just-alias">{this.props.artist.alias}</h3>;
    } else {
      names = (
        <div className="doble-name">
          <h3>{this.props.artist.name}</h3>{" "}
          <h5 className="alias-artist-page">({this.props.artist.alias})</h5>
        </div>
      );
    }

    let instagram = <React.Fragment></React.Fragment>;
    if (this.props.artist.social.instagram) {
      instagram = (
        <div className="social-compact">
          <img className="social-logo" alt="Something missing" src="/img/instagram.png"></img>{" "}
          <h3 className="social-links">
            {" "}
            {this.props.artist.social.instagram}
          </h3>
        </div>
      );
    }
    let github = <React.Fragment></React.Fragment>;
    if (this.props.artist.social.github) {
      github = (
        <div className="social-compact">
          <img className="social-logo" alt="Something missing" src="/img/github.png"></img>{" "}
          <h3 className="social-links">{this.props.artist.social.github}</h3>
        </div>
      );
    }
    let soundcloud = <React.Fragment></React.Fragment>;
    if (this.props.artist.social.soundcloud) {
      soundcloud = (
        <div className="social-compact">
          <img className="social-logo" alt="Something missing" src="/img/soundcloud.png"></img>{" "}
          <h3 className="social-links">
            {this.props.artist.social.soundcloud}
          </h3>
        </div>
      );
    }
    let other = <React.Fragment></React.Fragment>;
    if (this.props.artist.social.other) {
      other = (
        <div className="social-compact">
          <img className="social-logo" alt="Something missing" src="/img/web.png"></img>{" "}
          <h3 className="social-links">{this.props.artist.social.other}</h3>{" "}
        </div>
      );
    }

    // let logo = <React.Fragment></React.Fragment>;
    // if (this.props.artist.category === "photo") {
    //   logo = <img className="logo-img" src="/img/camera.png"></img>;
    // } else if (this.props.artist.category === "tattoo") {
    //   logo = <img className="logo-img" src="/img/tattoo-machine.png"></img>;
    // } else if (this.props.artist.category === "design") {
    //   logo = <img className="logo-img" src="/img/creativity.png"></img>;
    // } else {
    //   logo = <img className="logo-img" src="/img/musical-note.png"></img>;
    // }

    let phone = <React.Fragment></React.Fragment>;
    if (this.props.artist.contactPhone) {
      phone = (
        <div className="contact-compact">
          <img className="social-logo" alt="Something missing" src="/img/smartphone.png"></img>{" "}
          <h3 className="artist-phone"> {this.props.artist.contactPhone}</h3>
        </div>
      );
    }
    let email = <React.Fragment></React.Fragment>;
    if (this.props.artist.contactEmail) {
      email = (
        <div className="contact-compact">
          <img className="social-logo" alt="Something missing" src="/img/gmail.png"></img>{" "}
          <h3 className="artist-email"> {this.props.artist.contactEmail}</h3>
        </div>
      );
    }

    let availability = <React.Fragment></React.Fragment>;
    if (this.props.artist.availability === "0") {
      availability = <h5 className="artist-page-availability">
      Atiende en local
      </h5>;
    } else if (this.props.artist.availability === "1") {
      availability = <h5 className="artist-page-availability">
      Disponible en {this.props.artist.location.city}
      </h5>;
    } else if (this.props.artist.availability === "2") {
      availability = <h5 className="artist-page-availability">
      Disponibilidad en {this.props.artist.location.city} y alrededores
      </h5>;
    } else if (this.props.artist.availability === "3") {
      availability = <h5 className="artist-page-availability">
      Disponible en {this.props.artist.location.country}
      </h5>
    } else {
      availability = <h5 className="artist-page-availability">
      Disponible en todo el mundo
      </h5>;
    }

    let edit = <React.Fragment></React.Fragment>
    if (this.props.user.id === this.props.id){
      edit = <Link className="link-to-edit-artist" to={"/artists/edit/" + this.props.user.id}>Edit</Link> 
    }

    return (
      <div className="artist-page-main">
      {edit}
        <div className="image">
          <img
            className="artist-page-profile-img"
            src={this.props.artist.picture}
            alt="Something failed"
          />
        </div>

        <div className="no-social">
          <div className="artist-page-info">
            <div className="artist-page-data">
              <div className="artist-page-names">{names}</div>

              <div className="artist-page-subcategory">
                {this.props.artist.subcategory}
              </div>
            </div>

            <h5 className="artist-page-location">
              {this.props.artist.location.city},{" "}
              {this.props.artist.location.country} 📌
            </h5>

            {availability}
          </div>
          <div className="social-and-contact">
            <div className="artist-page-social">
              {instagram}
              {github}
              {soundcloud}
              {other}
            </div>
            <div className="artist-page-contact">
              {phone}
              {email}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
