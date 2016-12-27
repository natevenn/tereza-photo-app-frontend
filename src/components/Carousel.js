import React, {Component} from 'react';
import '../styles/Carousel.css';

export default class Carousel extends Component {
  render() {
    var leftArrow = "<"
    var rightArrow = ">"
    var exitButton = "X"
    return (
      <div className="outer-carousel-div">
        <div className="carousel-div">
          <img className="carousel-img" src={this.props.imageUrl} role='presentation' />
        </div>
        <a onClick={this.props.getLastImage} className="left-arrow"> {leftArrow} </a>
        <a onClick={this.props.getNextImage} className="right-arrow"> {rightArrow} </a>
        <a onClick={this.props.exitCarousel} className="exitButton"> {exitButton} </a>
      </div>
    )
  }
}
