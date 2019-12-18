import React, { Component } from "react";
import ArtistService from "../../services/ArtistService";
import "./EditPortfolio.css";

export default class EditPortfolio extends Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();
    this.state = {
      portfolio: null,
      images: null,
      videos: null,
      songs: null,
      imageDesc: null,
      videoDesc: null,
      songDesc: null
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  displayPortfolio = () => {
    const { portfolio } = this.state;

    return (
      <React.Fragment>
        <div className="edit-description">
          <label>Editar la descripción general: </label>
          <input type="text" value={this.state.portfolio.description}></input>
        </div>

        <div className="edit-gallery">
          <div className="edit-img-description">
            <label>Editar la descripcion de las imágenes: </label>
            <input
              type="text"
              value={this.state.portfolio.gallery.imageDesc}
            ></input>
          </div>
        </div>
      </React.Fragment>
    );
  };

  componentDidMount() {
    if (this.props.user.portfolio === this.props.match.params.id) {
      this.updatePortfolio();
    }
  }

  updatePortfolio = () => {
    this.artistService.fetchPortfolio(this.props.match.params.id).then(
      portfolio => {
        let images = null;
        let videos = null;
        let songs = null;
        let imageDesc = null;
        let songDesc = null;
        let videoDesc = null;

        portfolio.gallery.images ? images = portfolio.gallery.images : images = null
        portfolio.gallery.videos ? videos = portfolio.gallery.videos : videos = null
        portfolio.gallery.songs ? songs = portfolio.gallery.songs : songs = null
        portfolio.gallery.imageDesc ? imageDesc = portfolio.gallery.imageDesc : imageDesc = null
        portfolio.gallery.songDesc ? songDesc = portfolio.gallery.songDesc : songDesc = null
        portfolio.gallery.videoDesc ? videoDesc = portfolio.gallery.videoDesc : videoDesc = null
     
        this.setState({ ...this.state, portfolio, images , videos , songs , imageDesc, songDesc, videoDesc});
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  savePortfolio = e => {
    e.preventDefault();
    console.log("Fran é moi fermoso");
  };

  render() {
    return (
      <div className="edit-portfolio-div">
        <button onClick={e => this.savePortfolio(e)}>Guardar cambios</button>
        {this.state.portfolio && this.displayPortfolio()}
        {!this.state.portfolio && <p>Loading portfolio...</p>}
      </div>
    );
  }
}
