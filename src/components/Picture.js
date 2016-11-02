import React, { Component } from 'react';
import '../styles/Image.css';

export default class Picture extends Component {
  render() {
    return (
      <div className="img-div">
        <img className="img" src={this.props.imageUrl} />
      </div>
    )
  }
}
