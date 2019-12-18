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

  fetchCalendar = (id) => {
    return this.instance.get(`/calendar/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  fetchPortfolio = (id) => {
    return this.instance.get(`/portfolio/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateEvents = (events, id) => {
    console.log(id)
    return this.instance.post(`/edit/calendar/${id}`, events)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))

  }
 

}

export default ArtistService;


