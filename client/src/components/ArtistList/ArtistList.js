import React from 'react'

import ArtistService from '../../services/ArtistService';
import ArtistCard from '../ArtistCard/ArtistCard';
import './ArtistList.css'
import SearchBar from '../SearchBar/SearchBar';

class ArtistList extends React.Component {
  constructor(props) {
    super(props);
    this.artistService = new ArtistService();
    this.state = {
      artists: [],
      searchArtists: "",
      initialArtists: []
    }
    
    
  }

 
  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value })
  }

  searchArtists(e){
    let artists = [...this.state.artists]
    this.state.searchArtists = e.target.value
    let artistFound;
    artistFound = artists.filter((artist) => 
    artist.name.toLowerCase().includes(this.state.searchArtists.toLowerCase()) ||
    artist.category.toLowerCase().includes(this.state.searchArtists.toLowerCase()) ||
    artist.location.city.toLowerCase().includes(this.state.searchArtists.toLowerCase()) ||
    artist.location.country.toLowerCase().includes(this.state.searchArtists.toLowerCase()) ||
    artist.alias.toLowerCase().includes(this.state.searchArtists.toLowerCase())
    )





    this.setState({
      ...this.state,
      artists: artistFound,
      
    })
  }

  onKeyDown(e){
    if (e.keyCode === 8) {
      this.setState({artists: this.state.initialArtists})
     

    }
  }

  

  displayArtists = () => {
    const { artists } = this.state;
    // <Todo key={i} name={todo.name} description={todo.description} done={todo.done} />
    
    return artists.map((artist, i) => <ArtistCard key={i} artist={artist} />)
  }

  componentDidMount() {
    
    this.updateArtists()

    
  }
  
  updateArtists = () => {
    this.artistService.fetchArtists()
      .then(
        (artists) => {
          this.setState({ ...this.state, artists: artists, initialArtists: artists})
          
        },
        (error) => {
          const { message } = error;
          console.error(message)
        }
      )
  }




  render() {
    // const { loggedInUser } = this.props;
    const { artists } = this.state;
    return (
      <div className="artist-list-thing">
      
      <SearchBar  search={e => this.searchArtists(e)} onkey={e => this.onKeyDown(e)}></SearchBar>
        <div className="artists-container">
          {artists && this.displayArtists()}
          {!artists && <p>Loading artists...</p> }
        </div>
      </div>
    )
  }
}

export default ArtistList;
