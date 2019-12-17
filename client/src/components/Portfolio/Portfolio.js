import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "./Portfolio.css";

export default class extends Component {
  constructor(props) {
    super(props);



    this.state = {
      description: this.props.portfolio.description,
      imageDesc: this.props.portfolio.gallery.imageDesc,
      images: this.props.portfolio.gallery.images,
      videoDesc: this.props.portfolio.gallery.videoDesc,
      videos: this.props.portfolio.gallery.videos,
      songDesc: this.props.portfolio.gallery.songDesc,
      songs: this.props.portfolio.gallery.songs
    };
  }

  render() {

    let imageDesc = <React.Fragment></React.Fragment>;
    if (this.state.imageDesc !== null && this.state.imageDesc !== undefined) {
      imageDesc = <h3>{this.state.imageDesc}</h3>;
    } else {
      imageDesc = <React.Fragment></React.Fragment>;
    }

    let images = <React.Fragment></React.Fragment>;
    if (
      this.state.images !== null &&
      this.state.images !== undefined &&
      this.state.images.length !== 0
    ) {
      images = (
        <React.Fragment>
          <div className="artist-images">
            <ImageGallery
              className="gallery-images"
              items={this.state.images}
              infinite={true}
              showThumbnails={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
            />
          </div>
          <div className="portfolio-separator-two"></div>
        </React.Fragment>
      );
    } else {
      images = <React.Fragment></React.Fragment>;
    }

    let videoDesc = <React.Fragment></React.Fragment>;
    if (this.state.videoDesc !== null && this.state.videoDesc !== undefined) {
      videoDesc = <h3>{this.state.videoDesc}</h3>;
    } else {
      videoDesc = <React.Fragment></React.Fragment>;
    }

    let videos = <React.Fragment></React.Fragment>;
    if (
      this.state.videos !== null &&
      this.state.videos !== undefined &&
      this.state.videos.length !== 0
    ) {
      videos = (
        <React.Fragment>
          <div className="artist-videos">
            {this.state.videos.map(video => {
              return (
                <React.Fragment>
                  <iframe title="artist-video" className="youtube-frame" src={video}></iframe>
                  {/* <button >Delete</button> */}
                </React.Fragment>
              );
            })}
          </div>
          <div className="portfolio-separator-two"></div>
        </React.Fragment>
      );
    } else {
      videos = <React.Fragment></React.Fragment>;
    }

    let songDesc = <React.Fragment></React.Fragment>;
    if (this.state.songDesc !== null && this.state.songDesc !== undefined) {
      songDesc = <h3>{this.state.songDesc}</h3>;
    } else {
      songDesc = <React.Fragment></React.Fragment>;
    }

    let songs = <React.Fragment></React.Fragment>;
    if (
      this.state.songs !== null &&
      this.state.songs !== undefined &&
      this.state.songs.length !== 0
    ) {
      songs = (
        <React.Fragment>
          <div className="artist-songs">
            {this.state.songs.map(song => {
              return (
                <React.Fragment>
                  <ReactPlayer className="song-frame" url={song} />
                  {/* <button >Delete</button> */}
                </React.Fragment>
              );
            })}
          </div>
          <div className="portfolio-separator-two"></div>
        </React.Fragment>
      );
    } else {
      songs = <React.Fragment></React.Fragment>;
    }
    


    let edit = <React.Fragment></React.Fragment>
    if (this.props.user.id === this.props.id){
      console.log(this.props.user)
      edit = <Link className="link-to-edit-portfolio" to={"/portfolio/" + this.props.user.portfolio}>Edit</Link> 
    }


    return (
      <div className="portfolio-container">
        {edit}
        <p className="portfolio-description">{this.state.description} </p>
        <div className="portfolio-separator"></div>
        {imageDesc}
        {images}
        
        {videoDesc}
        {videos}

        {songDesc}
        {songs}
      </div>
    );
  }
}
