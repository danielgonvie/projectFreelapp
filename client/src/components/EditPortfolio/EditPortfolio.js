import React, { Component } from "react";
import ArtistService from "../../services/ArtistService";
import "./EditPortfolio.css";

export default class EditPortfolio extends Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();
    this.state = {
      portfolio: null,

      gallery: {
        images: null,
        videos: null,
        songs: null,
        imageDesc: null,
        videoDesc: null,
        songDesc: null
      },

      description: null
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.value);
    this.setState({ ...this.state, gallery: { ...this.state.gallery, [name]: value } });
  };

  handleChangeDesc = e => {
    const { name, value } = e.target;
    console.log(e.target.value);
    this.setState({ ...this.state, [name]: value });
  };

  displayPortfolio = () => {
    const { portfolio } = this.state;

    return (
      <React.Fragment>
        <div className="edit-description">
          <label>Editar la descripción general: </label>
          <input
            type="text"
            value={this.state.description}
            onChange={e => this.handleChangeDesc(e)}
            name="description"
          ></input>
        </div>

        <div className="edit-gallery">
          <div className="edit-img-description">
            <label>Editar la descripcion de las imágenes: </label>
            <input
              type="text"
              value={this.state.gallery.imageDesc}
              name="imageDesc"
              onChange={this.handleChange}
            ></input>
          </div>
          
          <div className="edit-img-cart">
            <label>Añadir y eliminar imágenes: </label>
            <div className="image-edit-gallery">
            {this.state.gallery.images.map((image, i) => <div className="edit-img-only"><img className="edit-img-only" key={i} src={image.original} onClick={() => this.deleteImg(image._id)} /> <button className="delete-image"  >Delete</button></div> )}
          </div>
          </div>

          <div className="edit-video-description">
            <label>Editar la descripcion de los vídeos: </label>
            <input
              type="text"
              value={this.state.gallery.videoDesc}
              name="videoDesc"
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="edit-song-description">
            <label>Editar la descripcion de las canciones: </label>
            <input
              type="text"
              value={this.state.gallery.songDesc}
              name="songDesc"
              onChange={this.handleChange}
            ></input>
            <input type="submit" value="Guardar"/>
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

  deleteImg = (id) => {
    
    this.artistService.deleteImg(this.props.match.params.id, id)
    
    /* this.state.gallery.images.splice(i, 1); */
    
  
    this.setState({
      ...this.state,
      images: this.state.gallery.images 
    })}
  

  updatePortfolio = () => {
    this.artistService.fetchPortfolio(this.props.match.params.id).then(
      portfolio => {
        let images;
        let videos;
        let songs;
        let imageDesc;
        let songDesc;
        let videoDesc;
        let description;

        portfolio.gallery.images
          ? (images = portfolio.gallery.images)
          : (images = null);
        portfolio.gallery.videos
          ? (videos = portfolio.gallery.videos)
          : (videos = null);
        portfolio.gallery.songs
          ? (songs = portfolio.gallery.songs)
          : (songs = null);
        portfolio.gallery.imageDesc
          ? (imageDesc = portfolio.gallery.imageDesc)
          : (imageDesc = null);
        portfolio.gallery.songDesc
          ? (songDesc = portfolio.gallery.songDesc)
          : (songDesc = null);
        portfolio.gallery.videoDesc
          ? (videoDesc = portfolio.gallery.videoDesc)
          : (videoDesc = null);
        portfolio.description
          ? (description = portfolio.description)
          : (description = null);

        this.setState({
          ...this.state,
          portfolio,
          description: description,
          gallery:{
          images: images,
          videos: videos,
          songs: songs,
          imageDesc: imageDesc,
          songDesc: songDesc,
          videoDesc: videoDesc,
          description: description
          }
        });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  savePortfolio = e => {
    e.preventDefault();
    console.log(this.state.gallery)
    this.artistService.updatePortfolio(
      this.state.portfolio._id,
      this.state.description,
      this.state.gallery
    );
  };

  render() {
    console.log(this.state)
    return (
      <div className="edit-portfolio-div">
      <form onSubmit={this.savePortfolio}>
        
        {this.state.portfolio && this.displayPortfolio()}
        {!this.state.portfolio && <p>Loading portfolio...</p>}
      </form>
      </div>
    );
  }
}
