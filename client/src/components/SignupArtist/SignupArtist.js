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
    toggleAlias: "both",
    location: {
      city: "",
      country: "",
    },
    category: "photo",
    subcategory: "",
    availability: "local",
    contactEmail: "",
    contactPhone: "",
    social: {
      instagram: "",
      other: "",
      soundcloud: "",
      github: ""
    },
    
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

    let categoryDisplay = <React.Fragment>
      <div className="category-container">
            <div className="category-unit">
            <input type="radio" className="selected-category" name="category" value="photo" onChange={this.handleChange} /> 
            <img className="logo-img2" alt="Missing smthing" src="/img/camera.png"></img>
            </div>
            <div className="category-unit">
            <input type="radio" className="selected-category" name="category" value="tattoo" onChange={this.handleChange}/> 
            <img className="logo-img2" alt="Missing smthing" src="/img/tattoo-machine.png"></img>
            </div>
            <div className="category-unit">
  <input type="radio" className="selected-category" name="category" value="design" onChange={this.handleChange}/> 
  <img className="logo-img2" alt="Missing smthing" src="/img/creativity.png"></img> 
  </div>
  <div className="category-unit">
  <input type="radio" className="selected-category" name="category" value="music" onChange={this.handleChange}/> 
  <img className="logo-img2" alt="Missing smthing" src="/img/musical-note.png"></img>
  </div>
            </div>
    </React.Fragment>
  if (this.state.category === "photo") {
    categoryDisplay = <React.Fragment>
    <div className="category-container">
          <div className="category-unit2">
          <input type="radio" className="selected-category" name="category" value="photo" onChange={this.handleChange} /> 
          <img className="logo-img2" alt="Missing smthing" src="/img/camera.png"></img>
          </div>
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="tattoo" onChange={this.handleChange}/> 
          <img className="logo-img2" alt="Missing smthing" src="/img/tattoo-machine.png"></img>
          </div>
          <div className="category-unit">
<input type="radio" className="selected-category" name="category" value="design" onChange={this.handleChange}/> 
<img className="logo-img2" alt="Missing smthing" src="/img/creativity.png"></img> 
</div>
<div className="category-unit">
<input type="radio" className="selected-category" name="category" value="music" onChange={this.handleChange}/> 
<img className="logo-img3" alt="Missing smthing" src="/img/musical-note.png"></img>
</div>
          </div>
  </React.Fragment>
  } else if (this.state.category === "tattoo") {
    categoryDisplay = <React.Fragment>
    <div className="category-container">
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="photo" onChange={this.handleChange} /> 
          <img className="logo-img2" alt="Missing smthing" src="/img/camera.png"></img>
          </div>
          <div className="category-unit2">
          <input type="radio" className="selected-category" name="category" value="tattoo" onChange={this.handleChange}/> 
          <img className="logo-img2" alt="Missing smthing" src="/img/tattoo-machine.png"></img>
          </div>
          <div className="category-unit">
<input type="radio" className="selected-category" name="category" value="design" onChange={this.handleChange}/> 
<img className="logo-img2" alt="Missing smthing" src="/img/creativity.png"></img> 
</div>
<div className="category-unit">
<input type="radio" className="selected-category" name="category" value="music" onChange={this.handleChange}/> 
<img className="logo-img3" alt="Missing smthing" src="/img/musical-note.png"></img>
</div>
          </div>
  </React.Fragment>
  } else if (this.state.category === "design") {
    categoryDisplay = <React.Fragment>
    <div className="category-container">
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="photo" onChange={this.handleChange} /> 
          <img className="logo-img2" alt="Missing smthing" src="/img/camera.png"></img>
          </div>
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="tattoo" onChange={this.handleChange}/> 
          <img className="logo-img2" alt="Missing smthing" src="/img/tattoo-machine.png"></img>
          </div>
          <div className="category-unit2">
<input type="radio" className="selected-category" name="category" value="design" onChange={this.handleChange}/> 
<img className="logo-img2" alt="Missing smthing" src="/img/creativity.png"></img> 
</div>
<div className="category-unit">
<input type="radio" className="selected-category" name="category" value="music" onChange={this.handleChange}/> 
<img className="logo-img3" alt="Missing smthing" src="/img/musical-note.png"></img>
</div>
          </div>
  </React.Fragment>
  } else if (this.state.category === "music") {
    categoryDisplay = <React.Fragment>
    <div className="category-container">
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="photo" onChange={this.handleChange} /> 
          <img className="logo-img2" alt="Missing smthing" src="/img/camera.png"></img>
          </div>
          <div className="category-unit">
          <input type="radio" className="selected-category" name="category" value="tattoo" onChange={this.handleChange}/> 
          <img className="logo-img2" alt="Missing smthing" src="/img/tattoo-machine.png"></img>
          </div>
          <div className="category-unit">
<input type="radio" className="selected-category" name="category" value="design" onChange={this.handleChange}/> 
<img className="logo-img2" alt="Missing smthing" src="/img/creativity.png"></img> 
</div>
<div className="category-unit2">
<input type="radio" className="selected-category" name="category" value="music" onChange={this.handleChange}/> 
<img className="logo-img3" alt="Missing smthing" src="/img/musical-note.png"></img>
</div>
          </div>
  </React.Fragment>
  }



    return (
      <div className="signup-artist-page">
        <Link className="back-link bounce" to="/">
          <h1 className="absolute-arrow">⇠ Volver</h1>
        </Link>
        {/* <div className="signup-box"> */}
          <h1 className="title">SignUp</h1>
          <form className="signup-fields2" onSubmit={this.handleSignUp}>
          <div className="diapositive">
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
              placeholder="Correo para entrar"
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
              placeholder="Contraseña"
              onChange={this.handleChange}
            />
            <div className="upload-btn-wrapper">
              <button className="btn">Subir imagen</button>
              <input
                className="signup-upload"
                type="file"
                name="picture"
                
                onChange={this.handleUpload}
              />
            </div>
            </div>
<div className="diapositive">
             <label className="login-labels" htmlFor="name">
              Nombre:
            </label>
            <input
              className="login-field"
              type="text"
              value={name}
              name="name"
              placeholer="Nombre público"
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
              placeholer="Alias público"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="toggleAlias">
              Mostrar nombre o alias:
            </label>
            <div className="toggleAlias-selected">
            <div>
            <input type="radio" name="toggleAlias" value="name" onChange={this.handleChange} /> {name}
            </div>
            <div>
            <input type="radio" name="toggleAlias" value="alias" onChange={this.handleChange}/> {alias}
            </div>
            <div>
            <input type="radio" name="toggleAlias" value="both" onChange={this.handleChange}/> {name}, {alias}
            </div>
            </div>
            </div>
            <div className="diapositive-category">
            <label className="login-labels" htmlFor="category">
              Categoría:
            </label>
            
            {categoryDisplay}




            <label className="login-labels" htmlFor="subcategory">
              Subcategoría:
            </label>
            <input
              className="login-field"
              type="text"
              value={subcategory}
              name="subcategory"
              placeholder="Especialización"
              onChange={this.handleChange}
            />
</div>
<div className="diapositive">
            <label className="login-labels" htmlFor="city">
              Ciudad:
            </label>
            <input
              className="login-field"
              type="text"
              value={city}
              name="city"
              placeholder="Ciudad en la que trabajas"
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
              placeholder="País en el que trabajas"
              onChange={this.handleChange2}
            />
            <label className="login-labels" htmlFor="availability">
              Disponibilidad:
            </label>
            <input type="radio" name="availability" value="local" onChange={this.handleChange} /> Local
  <input type="radio" name="availability" value="city" onChange={this.handleChange}/> Ciudad
  <input type="radio" name="availability" value="100" onChange={this.handleChange}/> Alrededores
  <input type="radio" name="availability" value="country" onChange={this.handleChange}/> Nacional
  <input type="radio" name="availability" value="worldwide" onChange={this.handleChange}/> Mundial
           
            </div>
            <div className="diapositive">
            <label className="login-labels" htmlFor="contactEmail">
              Email de contacto:
            </label>
            <input
              className="login-field"
              type="text"
              value={contactEmail}
              name="contactEmail"
              placeholder="Email público de contacto"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="contactPhone">
              Teléfono de contacto:
            </label>
            <input
              className="login-field"
              type="text"
              value={contactPhone}
              name="contactPhone"
              placeholder="Teléfono público de contacto"
              onChange={this.handleChange}
            />
            <label className="login-labels" htmlFor="instagram">
              Instagram:
            </label>
            <input
              className="login-field"
              type="text"
              value={instagram}
              name="instagram"
              placeholder="@usuario"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="soundcloud">
              Soundcloud:
            </label>
            <input
              className="login-field"
              type="text"
              value={soundcloud}
              name="soundcloud"
              placeholder="Usuario soundcloud"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="github">
              Github:
            </label>
            <input
              className="login-field"
              type="text"
              value={github}
              name="github"
              placeholder="Usuario github"
              onChange={this.handleChange3}
            />
                        <label className="login-labels" htmlFor="other">
              Página web:
            </label>
            <input
              className="login-field"
              type="text"
              value={other}
              name="other"
              placeholder="Página web/otros"
              onChange={this.handleChange3}
            />
</div>

            
            <input
              className="signup-button2"
              type="submit"
              value="Create account"
            />
          </form>
        </div>
      /* </div> */
    );
  }
}
