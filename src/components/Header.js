import React, { Component } from 'react';
import {Link} from 'react-router';
import '../styles/Header.css';
import watermark from '../styles/images/t-watermark3.png'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={watermark} className="header-logo" />
        <div className="navbar">
          <ul>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/people">
                people
              </Link>
            </li>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/places">
                places
              </Link>
            </li>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/life">
                life
              </Link>
            </li>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/art">
                art
              </Link>
            </li>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/crestedbutte">
                crested butte
              </Link>
            </li>
            <li className="collection">
              <Link activeStyle={{color: "#333333"}}
                activeClassName="highlight" to="/about">
                about
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
