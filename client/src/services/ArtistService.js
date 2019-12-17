import axios from 'axios';

class ArtistService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/artists`,
      withCredentials: true
    })
  }



  fetchArtists = () => {
    return this.instance.get('/')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  fetchOneArtist = (id) => {
    return this.instance.get(`/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  deleteEvent = (calendarId,eventId) => {
    return this.instance.post(`/${calendarId}`, {eventId})
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
}

export default ArtistService;


