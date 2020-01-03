import React, { Component } from "react";
import ArtistService from "../../services/ArtistService";
import "./EditPortfolio.css";
import ReactPlayer from "react-player";

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
      newImg: null,
      newVideo: null,
      newSong: null,
      description: null,
      confirm: false,
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      gallery: { ...this.state.gallery, [name]: value },
      confirm: false,
    });
  };

  handleChangeDesc = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value , confirm: false,});
  };

  handleChangeNewImg = e => {
    const { value } = e.target;
    this.setState({ ...this.state, newImg: value , confirm: false,});
  };

  handleChangeNewVideo = e => {
    const { value } = e.target;
    this.setState({ ...this.state, newVideo: value , confirm: false,});
  };
  handleChangeNewSong = e => {
    const { value } = e.target;
    this.setState({ ...this.state, newSong: value ,confirm: false,});
  };


  displayPortfolio = () => {
    const { portfolio } = this.state;

    return (
      <React.Fragment>
       <input className="submit-button-edit" type="submit" value="Guardar" />
       
        <div className="edit-description">
       
          <label>Editar la descripción general: </label>
          <textarea
          className="input-general-description"
            type="text"
            value={this.state.description}
            onChange={e => this.handleChangeDesc(e)}
            placeholder="Descripción general de lo que haces"
            name="description"
          ></textarea>
        </div>
        <div className="separatrix"></div>
        <div className="edit-gallery">
        <div className="just-images">
          <div className="edit-img-description">
            <label>Editar la descripcion de las imágenes: </label>
            <input
              type="text"
              value={this.state.gallery.imageDesc}
              name="imageDesc"
              placeholder="Descripción de las imágenes"
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="edit-img-cart">
            <label>Añadir y eliminar imágenes: </label>
            <div className="image-edit-gallery">
              {this.state.gallery.images.map((image, i) => (
                <div className="edit-img-only">
                  <img
                    className="edit-img-only"
                    key={i}
                    src={image.original}
                    alt="Imagen errónea. Click para borrar."
                  />
                  <button  className="delete-image" onClick={() => this.deleteImg(image._id)}>Delete</button>
                </div>
              ))}


              
              <input
              type="text"
              name="newImg"
              value={this.state.newImg}
              onChange={e => this.handleChangeNewImg(e)}
              placeholder="Escribe la url de la imagen"
            ></input>
            <button className="add-image" onClick={(e) => this.addImg(e)}>➕</button>

            </div>
          </div>
          </div>
          <div className="separatrix"></div>
                <div className="just-videos">
          <div className="edit-video-description">
            <label>Editar la descripcion de los vídeos: </label>
            <input
              type="text"
              value={this.state.gallery.videoDesc}
              name="videoDesc"
              onChange={this.handleChange}
              placeholder="Descripción de los vídeos"
            ></input>
          </div>

          <div className="edit-video-cart">
            <label>Añadir y eliminar vídeos: </label>
            <div className="video-edit-gallery">
              {this.state.gallery.videos.map((video, i) => (
                <div className="edit-video-only">
                  <iframe
                    className="edit-video-only"
                    key={i}
                    src={video}
                   
                    alt="Video erróneo. Click para borrar."
                  />
                  <button  className="delete-video" onClick={() => this.deleteVideo(video)}>Delete</button>
                </div>
              ))}


              
              <input
              type="text"
              name="newVideo"
              value={this.state.newVideo}
              onChange={e => this.handleChangeNewVideo(e)}
              placeholder="Url embebida del vídeo"
            ></input>
            <button className="add-video" onClick={(e) => this.addVideo(e)}>➕</button>

            </div>
          </div>
          </div>
          <div className="separatrix"></div>

          <div className="edit-song-description">
            <label>Editar la descripcion de las canciones: </label>
            <input
              type="text"
              value={this.state.gallery.songDesc}
              name="songDesc"
              onChange={this.handleChange}
              placeholder="Descripción de las canciones"
            ></input>
            
          </div>

          <div className="edit-song-cart">
            <label>Añadir y eliminar canciones: </label>
            <div className="song-edit-gallery">
              {this.state.gallery.songs.map((song, i) => (
                <div className="edit-song-only">
                <ReactPlayer className="edit-song-only" url={song} />
                  <button  className="delete-song" onClick={() => this.deleteSong(song)}>Delete</button>
                </div>
              ))}


              
              <input
              type="text"
              name="newSong"
              value={this.state.newSong}
              onChange={e => this.handleChangeNewSong(e)}
              placeholder="Añade la url de soundcloud"
            ></input>
            <button className="add-song" onClick={(e) => this.addSong(e)}>➕</button>

            </div>
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

  addImg = e => {
    e.preventDefault()
    this.setState({...this.state, images: this.state.gallery.images.push( {original: this.state.newImg})})
  }

  deleteImg = id => {
    
      const newState = this.state;
      const index = newState.gallery.images.findIndex(a => a._id === id);
      if (index === -1) return;
      newState.gallery.images.splice(index, 1);
      this.setState(newState); // This will update the state and trigger a rerender of the components
    
  };

  addVideo = e => {
    e.preventDefault()
    this.setState({...this.state, videos: this.state.gallery.videos.push( this.state.newVideo)})
  }

  deleteVideo = src => {
    
    const newState = this.state;
    const index = newState.gallery.videos.findIndex(a => a === src);
    
    if (index === -1) return;
    newState.gallery.videos.splice(index, 1);
   
    this.setState(newState); // This will update the state and trigger a rerender of the components
  
};

addSong = e => {
  e.preventDefault()
  this.setState({...this.state, videos: this.state.gallery.songs.push( this.state.newSong)})
}

deleteSong = src => {
  
  const newState = this.state;
  const index = newState.gallery.songs.findIndex(a => a === src);
  
  if (index === -1) return;
  newState.gallery.songs.splice(index, 1);
  
  this.setState(newState); // This will update the state and trigger a rerender of the components

};

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
          gallery: {
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
    
    this.artistService.updatePortfolio(
      this.state.portfolio._id,
      this.state.description,
      this.state.gallery
    );
    this.setState({
      ...this.state,
      confirm: true,
    })
  };

  render() {
    let confirmText = <React.Fragment></React.Fragment>;
    if (this.state.confirm === true) {
      confirmText = <h4 className="confirmation-text3">¡Cambios guardados con éxito!</h4>;
    } else {
      confirmText = <h4 className="confirmation-text4">Cambios guardados con éxito</h4>;
    };

    return (
      <div className="edit-portfolio-div">
        <form onSubmit={this.savePortfolio}>
          {this.state.portfolio && this.displayPortfolio()}
          {!this.state.portfolio && <p>Loading portfolio...</p>}
          
        </form>
        {confirmText}
      </div>
    );
  }
}
