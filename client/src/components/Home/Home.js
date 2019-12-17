import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Home.css'


export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Esta es la casita joven</h1>
                <h2>Desde aqui se empiesa</h2>
                <Link to="/artists"><h1>( ͡° ͜ʖ ͡°)</h1></Link>
            </div>
        )
    }
}
