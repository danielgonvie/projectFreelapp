import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./BadRoute.css"
export default class BadRoute extends Component {
    render() {
        return (
            <div className="bad-route">
                <img src="/img/wall-e.gif"></img>
                <h1 className="something-wrong">Ups! Algo ha ido mal</h1>
                <p className="wrong-text">Hagamos como que no ha pasado nada y vuelve a la página principal.</p>
                <Link className="wrong-link" to="/"> <div className="title-flex">
            <h1 className="bad-title">Freel</h1><h1 className="bad-title2">App.</h1>
            </div> </Link>
                
            </div>
        )
    }
}
