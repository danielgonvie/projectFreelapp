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
            <span role="img">🔎</span><input onChange={this.props.search} onKeyDown={this.props.onkey} type="text"></input>


            </div>
        )
    }
}
