import React, { Component } from 'react';
import Picture from './Picture';
import Carousel from './Carousel';

export default class Pictures extends Component {
  constructor() {
    super()

    this.state = {
      isClicked: false,
      currentIndex: '',
      imageUrl: ''
    }

  this.handleClick = this.handleClick.bind(this)
  this.getNextImage = this.getNextImage.bind(this)
  }

  handleClick(key) {
    var images = this.props.images
    var imgKeys = Object.keys(images)
    var index = imgKeys.indexOf(key)
    var imageUrl = images[key].imageUrl
    this.setState({isClicked: true, currentIndex: index, imageUrl: imageUrl})
  }

  getNextImage() {
    var index = this.state.currentIndex
    var images = this.props.images
    var imgKeys = Object.keys(images)
    index = index < imgKeys.length - 1 ? index + 1 : 0
    var key = imgKeys[index]
    var imageUrl = images[key].imageUrl
    this.setState({currentIndex: index, imageUrl: imageUrl})
  }

  render() {
    var imgKeys = Object.keys(this.props.images)

    if(this.state.isClicked) {
      return (
        <Carousel imageUrl={this.state.imageUrl} getNextImage={this.getNextImage}/>
      )
    }

    return (
      <div>
        {imgKeys.map((key) => {
          var imageUrl = this.props.images[key].imageUrl
          return <Picture handleClick={this.handleClick} key={key} imgKey={key} imageUrl={imageUrl} />
          })}
      </div>
    )
  }
}
