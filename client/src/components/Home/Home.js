import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Home.css'


export default class Home extends Component {
    constructor(props) {
        super(props);
    
       
        this.state = {
          user: this.props.user
        };
      }

    render() {
        let main = <React.Fragment></React.Fragment>;
        if (this.state.user !== null && this.state.user !== undefined){
            main=
            <Link to="/artists"><h1 className="see-artist">Ver artistas</h1></Link>
        } else {
            main = 
            <React.Fragment>
            <div className="main-logins">
            <div className="artist-logins">
            <div className="artist-logo"><img className="artist-logo" src="/img/design.png"></img></div>
            <Link className="black-link" to="/loginArtist">Logeate como artista</Link>
                <Link className="black-link" to="/signupArtist">Registrate como artista</Link>
                </div>
                <div className="logins-separator"></div>
                <div className="user-logins">
                <div className="user-logo"><img className="user-logo" src="/img/team.png"></img></div>
                <Link className="black-link" to="/login"> Logeate como cliente</Link>
                <Link className="black-link" to="/signup">Registrate como cliente</Link>
                </div>
                </div>
                </React.Fragment>
        }




        
        return (
            <div className="main-page-main">
                <div className="main-page-title">
                <h1 className="super-title">Freel</h1><h1 className="super-title2">App.</h1>
                </div>
                <div className="paragraphs">
                <p className="main-paragraph">FreelApp es una página que facilita la conexión entre artistas y clientes.</p>
                <p className="main-paragraph">
                Basada en calendarios públicos los clientes pueden ver la disponibilidad de sus artistas en tan solo dos clicks. 
                </p>
                <p className="main-paragraph">
                Fácil cómodo y sencillo.</p>
                </div>
                {main}
                
            </div>
        )
    }
}
