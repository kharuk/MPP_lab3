import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <nav class="navbar navbar-expand-lg bg-dark fixed-top text-uppercase" id="mainNav">
          <div class="container">
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1">
                  <Link to={'/films'} class="nav-link header__link" >Films</Link>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                  <Link to={'/cinemas'} class="nav-link header__link">Cinemas</Link>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                  <Link to={'/sessions'} class="nav-link header__link">Sessions</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
export default Header;
