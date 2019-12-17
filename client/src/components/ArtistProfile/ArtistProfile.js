import React, { Component } from 'react'
import ArtistService from '../../services/ArtistService';
import Artist from '../Artist/Artist';
import PruebaCalendar from '../Prueba/PruebaCalendar/PruebaCalendar';
import './ArtistProfile.css';
import Portfolio from '../Portfolio/Portfolio';

export default class ArtistProfile extends Component {
    constructor(props) {
        super(props);
        this.artistService = new ArtistService();
      }

      state = {
        artist: null,
      }
      
  
    
      
    
      displayArtist = () => {
        const { artist } = this.state;

        return <React.Fragment> 
        <div className="artist-top-info">
        <Artist artist={artist} /> 
        <PruebaCalendar  calendar={artist.calendar}></PruebaCalendar> 
        </div>
        <div className="separator"></div>
        <Portfolio portfolio={artist.portfolio}></Portfolio>
        </React.Fragment>
        
      }
    
      componentDidMount() {
        this.updateArtist()
        
      }
      
      updateArtist = () => {
        this.artistService.fetchOneArtist(this.props.user.id)
          .then(
            (artist) => {
              this.setState({ ...this.state, artist })
              
            },
            (error) => {
              const { message } = error;
              console.error(message)
            }
          )
      }



    render() {
  
        return (
            <div className="artist-mainpage">
              <div className="artistPLUScalendar">
                {this.state.artist && this.displayArtist()}
                 {!this.state.artist && <p>Loading artists...</p> }
                 </div>
            
            </div>
        )
    }
}
