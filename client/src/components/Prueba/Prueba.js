import React, { Component } from 'react'


import './Prueba.css'
import Basic from './Calendar/Basic';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom';
import PruebaCalendar from './PruebaCalendar/PruebaCalendar';




export default class Prueba extends Component {

    constructor(props) {
        super(props);
        this.authService = new AuthService();
      }
    
    handleLogout = (e) => {
        const { history } = this.props;
        e.preventDefault()
        this.authService.logout(this.state)
        .then(
          () => {
            history.push("/login")
          },
          (error) => {
            console.error(error)
          }
        )
      }

    render() {
        return (
            <div>
                <h1>Esto es tope privado</h1>
                <Link to="/" onClick={(e) => this.authService.logout()} className="button is-rounded">
                    Logout
              </Link>
                
                <div>
               <Basic></Basic>
               

              

               </div>
            </div>
        )
    }
}
