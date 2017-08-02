import React, { Component } from 'react';
import Logo from '../images/logo-blue.png';
import Home from '../pages/home';
import Footer from './footer'
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="header">
            <h1>Brewcodes Movie & TV Search</h1>
            <img src={ Logo } className="App-logo" alt="logo" />
          </div>
          <h3>Powered by The Movie Database</h3>
        </div>
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
