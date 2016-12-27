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

  this.handlePictureClick = this.handlePictureClick.bind(this);
  this.getNextImage = this.getNextImage.bind(this);
  this.getLastImage = this.getLastImage.bind(this);
  this.exitCarousel = this.exitCarousel.bind(this);
  }

  handlePictureClick(key) {
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

  getLastImage() {
    var index = this.state.currentIndex
    var images = this.props.images
    var imgKeys = Object.keys(images)
    index = index > 0 + 1 ? index - 1 : 0
    var key = imgKeys[index]
    var imageUrl = images[key].imageUrl
    this.setState({currentIndex: index, imageUrl: imageUrl})
  }

  exitCarousel() {
    this.setState({isClicked: false})
  }

  startsWithHttp(imageUrl) {
    var regex = new RegExp(/^http/)
    return regex.test(imageUrl)
  }

  render() {
    var imgKeys = Object.keys(this.props.images)

    if(this.state.isClicked && this.startsWithHttp(this.state.imageUrl)) {
      return (
        <Carousel imageUrl={this.state.imageUrl}
          getNextImage={this.getNextImage}
          getLastImage={this.getLastImage}
          exitCarousel={this.exitCarousel}
        />
      )
        }

    return (
      <div>
        {imgKeys.map((key) => {
          var imageUrl = this.props.images[key].imageUrl
          var imageId = this.props.images[key].id
          if(this.startsWithHttp(imageUrl)) {
            return <Picture handlePictureClick={this.handlePictureClick}
              key={key} imgKey={key}
              imageUrl={imageUrl}
              imageId={imageId}
              deleteImage={this.props.deleteImage}
              username={this.props.username}
              userToken={this.props.userToken}
            />
            }
        })}
      </div>
    )
  }
}

Picture.contextTypes = {
  router: React.PropTypes.object
}
