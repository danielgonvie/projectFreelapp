import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';

import SignUp from './components/Signup/Signup';
import AuthService from './services/AuthService';

import PrivateRoute from './guards/PrivateRoute';

import Prueba from './components/Prueba/Prueba.js';
import Home from './components/Home/Home';
import ArtistView from './components/ArtistView/ArtistView';
import Index from './components/Index/Index';
import Navbar from './components/Navbar/Navbar';
import ArtistProfile from './components/ArtistProfile/ArtistProfile';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();


  }

  state = {
    user: null,
    id: ""
  }

  setUser = (user) => {
    this.setState({ ...this.state, user })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }

  componentDidMount() {
    this.fetchUser()

  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
      
        <header className="App-header">
          {user && <Switch>
            <Route exact path="/artists"  render={(match) => <React.Fragment> <Navbar {...match} user={user}></Navbar><Index {...match} user={user} /></React.Fragment>}/> 
            <Route exact path="/prueba"  render={(match) => <React.Fragment> <Navbar {...match} user={user}></Navbar><Prueba {...match} user={user} /></React.Fragment>}/> 
            <Route exact path="/" render={(match) => <React.Fragment><Navbar {...match} user={user}></Navbar><Home {...match} user={user} /></React.Fragment>}/>            
            <Route exact path="/artists/:id" render={(match) => <React.Fragment><Navbar {...match} user={user}></Navbar><ArtistView {...match} user={user} /></React.Fragment>}/>
            <Route exact path="/artists/profile" render={(match) => <React.Fragment><Navbar {...match} user={user}></Navbar><ArtistProfile {...match} user={user} /></React.Fragment>}/>
          </Switch> }
          
          {!user && <Switch>
            <Route exact path="/login" render={(match) => <React.Fragment><Login {...match} setUser={this.setUser} /></React.Fragment>} />  
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <Route exact path="/" render={(match) => <React.Fragment><Navbar {...match} user={user}></Navbar><Home {...match} user={user} /></React.Fragment>}/>
          </Switch> }
        </header>
      </div>
    );
  }
}

export default App;
