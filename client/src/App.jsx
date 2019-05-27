import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Countries from './components/pages/Countries';
import AddCountry from './components/pages/AddCountry';
import Secret from './components/pages/Secret';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import api from './api';
import logo from './logo.svg';
import MainNavBar from './components/MainNavbar';
import List from './components/List';
import StreetArtDetail from './components/StreetArtDetail';
import NewStreetArt from './components/NewStreetArt';
import Map from './components/Map';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavBar />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/add-country">Add country</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink> */}
        {/* </header> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/street-arts" component={List} />
          <Route path="/street-art-detail/:streetArtId" component={StreetArtDetail} />
          <Route path="/new-street-art" component={NewStreetArt} />
          <Route path="/map" component={Map} />
          <Route path="/countries" component={Countries} />
          <Route path="/add-country" component={AddCountry} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}