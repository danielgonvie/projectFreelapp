import React, { Component } from 'react'
import ArtistList from '../ArtistList/ArtistList'
import './Index.css'

export default class Index extends Component {
    render() {
        return (
            <div>
            <h1 className="titulillo">Lista de artistas tó wapos en Españita</h1>
            <hr></hr>
                <ArtistList></ArtistList>
            </div>
        )
    }
}
