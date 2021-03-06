import React, { Component } from "react";
import "./EditArtist.css";
import { Link } from "react-router-dom";
import ArtistService from "../../services/ArtistService";

export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();

    this.state = {
      artist: null,
      picture: null,
      toggleAlias: null,
      alias: null,
      name: null,
      location:{
      city: null,
      country: null,
      },
      category: null,
      subcategory: null,
      availability: null,
      contactEmail: null,
      contactPhone: null,
      social: {
        instagram: null,
        other: null,
        soundcloud: null,
        github: null
      },

      confirm: false
    };
  }

  componentDidMount() {
    if (this.props.user.id === this.props.match.params.id) {
      this.fetchArtist();
    }
  }

  saveArtist = e => {
    e.preventDefault();
    
    this.artistService.updateArtist(
      this.state.artist.id,
      this.state.toggleAlias,
      this.state.name,
      this.state.alias,
      this.state.location,
      this.state.category,
      this.state.subcategory,
      this.state.availability,
      this.state.contactEmail,
      this.state.contactPhone,
      this.state.social,
    );
    this.setState({
      ...this.state,
      confirm: true,
    })
  };

  fetchArtist = () => {
    this.artistService.fetchOneArtist(this.props.match.params.id).then(
      artist => {
        let alias;
        let toggleAlias;
        let name;
        let city;
        let country;
        let category;
        let subcategory;
        let availability;
        let contactEmail;
        let contactPhone;
        let instagram;
        let other;
        let soundcloud;
        let github;

        artist.name ? (name = artist.name) : (name = null);

        artist.alias ? (alias = artist.alias) : (alias = null);

        artist.toggleAlias
          ? (toggleAlias = artist.toggleAlias)
          : (toggleAlias = null);

        artist.location.city ? (city = artist.location.city) : (city = null);

        artist.location.country
          ? (country = artist.location.country)
          : (country = null);

        artist.category ? (category = artist.category) : (category = null);

        artist.subcategory
          ? (subcategory = artist.subcategory)
          : (subcategory = null);

        artist.availability
          ? (availability = artist.availability)
          : (availability = null);

        artist.contactEmail
          ? (contactEmail = artist.contactEmail)
          : (contactEmail = null);

        artist.contactPhone
          ? (contactPhone = artist.contactPhone)
          : (contactPhone = null);

        artist.social.instagram
          ? (instagram = artist.social.instagram)
          : (instagram = null);

        artist.social.soundcloud
          ? (soundcloud = artist.social.soundcloud)
          : (soundcloud = null);

        artist.social.github
          ? (github = artist.social.github)
          : (github = null);

        artist.social.other ? (other = artist.social.other) : (other = null);

        this.setState({
          ...this.state,
          artist,
          alias,
          name,
          toggleAlias,
          location: {
            city: city,
            country: country
          },

          category,
          subcategory,
          availability,
          contactEmail,
          contactPhone,
          social: {
            instagram: instagram,
            other: other,
            soundcloud: soundcloud,
            github: github
          }
        });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      location: { ...this.state.location, [name]: value },
      confirm: false
    });
  };

  handleChange2 = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      social: { ...this.state.social, [name]: value },
      confirm: false
    });
  };

  handleChangeDesc = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value, confirm: false });
  };

  displayProfile = () => {
    const { artist } = this.state;

    return (
      <React.Fragment>
        <input className="submit-button-edit3" type="submit" value="Guardar" />

        <div className="edit-artist-name">
          <div className="edit-column">
            <div className="info-group">
              <div className="parameter">
                <label>Nombre: </label>
                <input
                  type="text"
                  value={this.state.name}
                  name="name"
                  placeholder="Descripción de las imágenes"
                  onChange={e => this.handleChangeDesc(e)}
                ></input>
              </div>
              <div className="parameter">
                <label>Alias: </label>
                <input
                  type="text"
                  value={this.state.alias}
                  name="alias"
                  placeholder="Alias"
                  onChange={e => this.handleChangeDesc(e)}
                ></input>
              </div>
              <div className="parameter">
                <label>Mostrar nombre/alias: </label>
                <select name="toggleAlias">
                  <option value="name">Nombre</option>
                  <option value="alias">Alias</option>
                  <option value="both" selected>
                    Ambos
                  </option>
                </select>
              </div>
            </div>
            <div className="info-group">
              <div className="parameter">
                <label>Ciudad: </label>
                <input
                  type="text"
                  value={this.state.location.city}
                  name="city"
                  placeholder="Ciudad"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="parameter">
                <label>Pais: </label>
                <input
                  type="text"
                  value={this.state.location.country}
                  name="country"
                  placeholder="Pais"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="vertical-separator"></div>
          <div className="edit-column">
            <div className="info-group">
              <div className="parameter">
                <label>Categoría: </label>
                <select name="category">
                  <option value="photo">Fotografía</option>
                  <option value="tattoo">Tattoo</option>
                  <option value="design">Diseño</option>
                  <option value="music">Música</option>
                </select>
              </div>
              <div className="parameter">
                <label>Subcategoría: </label>
                <input
                  type="text"
                  value={this.state.subcategory}
                  name="subcategory"
                  placeholder="Subcategoría"
                  onChange={e => this.handleChangeDesc(e)}
                ></input>
              </div>
            </div>

            <div className="parameter">
              <label>Disponibilidad: </label>
              <select value={this.state.availability} onChange={e => this.handleChangeDesc(e)} name="availability">
                <option value="0">Local</option>
                <option value="1">Ciudad</option>
                <option value="2" >
                  Alrededores
                </option>
                <option value="3" >
                  Pais
                </option>
                <option value="4" >
                  Internacional
                </option>
              </select>
            </div>
            <div className="info-group">
              <div className="parameter">
                <label>Email público de contacto: </label>
                <input
                  type="text"
                  value={this.state.contactEmail}
                  name="contactEmail"
                  placeholder="Email de contacto"
                  onChange={e => this.handleChangeDesc(e)}
                ></input>
              </div>
              <div className="parameter">
                <label>Teléfono público de contacto: </label>
                <input
                  type="text"
                  value={this.state.contactPhone}
                  name="contactPhone"
                  placeholder="Teléfono de contacto"
                  onChange={e => this.handleChangeDesc(e)}
                ></input>
              </div>
            </div>
          </div>
          <div className="vertical-separator"></div>
          <div className="info-group">
            <div className="parameter">
              <label>Instagram: </label>
              <input
                type="text"
                value={this.state.social.instagram}
                name="instagram"
                placeholder="Nombre de usuario en instagram"
                onChange={e => this.handleChangeDesc2(e)}
              ></input>
            </div>
            <div className="parameter">
              <label>Github: </label>
              <input
                type="text"
                value={this.state.social.github}
                name="github"
                placeholder="Nombre de usuario en github"
                onChange={e => this.handleChangeDesc2(e)}
              ></input>
            </div>
            <div className="parameter">
              <label>Soundcloud: </label>
              <input
                type="text"
                value={this.state.social.soundcloud}
                name="soundcloud"
                placeholder="Nombre de usuario en soundcloud"
                onChange={e => this.handleChangeDesc2(e)}
              ></input>
            </div>
            <div className="parameter">
              <label>Página web: </label>
              <input
                type="text"
                value={this.state.social.other}
                name="other"
                placeholder="Página web u otras páginas"
                onChange={e => this.handleChangeDesc2(e)}
              ></input>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    let confirmText = <React.Fragment></React.Fragment>;
    if (this.state.confirm === true) {
      confirmText = (
        <h4 className="confirmation-text5">¡Cambios guardados con éxito!</h4>
      );
    } else {
      confirmText = (
        <h4 className="confirmation-text6">Cambios guardados con éxito</h4>
      );
    }

    return (
      <div className="edit-artist-page">
        <form onSubmit={this.saveArtist}>
          {this.state.artist && this.displayProfile()}
          {!this.state.artist && <p>Loading profile...</p>}
        </form>
        {confirmText}
      </div>
    );
  }
}
