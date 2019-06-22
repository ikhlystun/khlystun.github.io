import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Nav extends Component {

  render() {
    return(
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">Film search</Link>
        </div>
      </nav>
    );
  }

}