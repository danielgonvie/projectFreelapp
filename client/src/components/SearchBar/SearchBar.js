import React, { Component } from 'react'
import "./SearchBar.css"

export default class
    extends Component {
        constructor(props) {
            super(props);
            
          }

    render() {
        return (
            <div className="search-bar">
            <input className="search-bar2" placeholder="🔍Buscar artistas..." onChange={this.props.search} onKeyDown={this.props.onkey} type="text"></input>


            </div>
        )
    }
}
