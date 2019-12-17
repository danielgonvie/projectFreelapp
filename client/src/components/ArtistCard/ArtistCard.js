import React, { Component } from "react";
import "./ArtistCard.css";
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
      names = <h3>{this.props.artist.name}</h3>;
    } else if (this.props.artist.toggleAlias === "alias") {
      names = <h3>{this.props.artist.alias}</h3>;
    } else {
      names = (
        <React.Fragment>
          <h3>{this.props.artist.name}</h3> <h5>({this.props.artist.alias})</h5>
        </React.Fragment>
      );
    }

    let logo = <React.Fragment></React.Fragment>;
    if (this.props.artist.category === "photo") {
      logo = <img className="logo-img" alt="Missing smthing" src="/img/camera.png"></img>;
    } 
    else if (this.props.artist.category === "tattoo") {
      logo = <img className="logo-img" alt="Missing smthing" src="/img/tattoo-machine.png"></img>;
    } 
    else if (this.props.artist.category === "design") {
      logo = <img className="logo-img" alt="Missing smthing" src="/img/creativity.png"></img>;
    } 
    else {
      logo = <img className="logo-img" alt="Missing smthing" src="/img/musical-note.png"></img>;
    }

    return (
      <div className="artist-tag">
        <img src={this.props.artist.picture} alt="Bad :("/>
        <h4 className="artist-category">{logo}</h4>
        <div className="artist-info">
          <div className="artist-data">
            <div className="artist-names">{names}</div>
            <h4 className="artist-subcategory">
              {this.props.artist.subcategory}
            </h4>
          </div>

          <h5 className="artist-location">
            {this.props.artist.location.city},{" "}
            {this.props.artist.location.country} 📌
          </h5>
        </div>
        <Link className="artist-enter" to={"/artists/" + this.props.artist.id}>
          ->
        </Link>
      </div>
    );
  }
}
