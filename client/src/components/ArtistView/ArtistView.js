import React, { Component } from 'react'
import ArtistService from '../../services/ArtistService';
import Artist from '../Artist/Artist';
import PruebaCalendar from '../Prueba/PruebaCalendar/PruebaCalendar';
import './ArtistView.css';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

export default class ArtistView extends Component {
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
        <Artist artist={artist} user={this.props.user} id={this.props.match.params.id} /> 
        <PruebaCalendar  calendar={artist.calendar} user={this.props.user} id={this.props.match.params.id} ></PruebaCalendar> 
        </div>
        <div className="separator"></div>
        <Portfolio portfolio={artist.portfolio} user={this.props.user} id={this.props.match.params.id} ></Portfolio>
        </React.Fragment>
        
      }
    
      componentDidMount() {
        this.updateArtist()
        
      }
      
      updateArtist = () => {
        this.artistService.fetchOneArtist(this.props.match.params.id)
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
                 <Footer></Footer>
            </div>
        )
    }
}
