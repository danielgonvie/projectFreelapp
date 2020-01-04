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

  updatePortfolio = (id, description, gallery) => {
    return this.instance.post(`/edit/portfolio/${id}`, {description, gallery})
    .then(res=> Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateArtist = (id, toggleAlias, name, alias, location, category, subcategory, availability, contactEmail, contactPhone, social) => {
    return this.instance.post(`/edit/artist/${id}`, {toggleAlias, name, alias, location, category, subcategory, availability, contactEmail, contactPhone, social})
    .then(res=> Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateEvents = (events, id) => {
    return this.instance.post(`/edit/calendar/${id}`, events)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))

  }

  deleteImg = (id, i) =>{
    return this.instance.post(`/delete/img/${id}`, i)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
 

}

export default ArtistService;


