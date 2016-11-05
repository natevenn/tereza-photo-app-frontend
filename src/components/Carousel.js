import React, {Component} from 'react';
import '../styles/Carousel.css';

export default class Carousel extends Component {
  render() {
    return (
      <div className="outer-carousel-div">
        <div className="carousel-div">
          <img className="carousel-img"src={this.props.imageUrl} />
        </div>
        <button onClick={this.props.getNextImage} className="right-arrow"> > </button>
      </div>
    )
  }
}
