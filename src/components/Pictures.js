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

  this.handlePictureClick = this.handlePictureClick.bind(this)
  this.getNextImage = this.getNextImage.bind(this)
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

  startsWithHttp(imageUrl) {
    var regex = new RegExp(/^http/)
    return regex.test(imageUrl)
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
          var imageId = this.props.images[key].id
          if(this.startsWithHttp(imageUrl)) {
            return <Picture handlePictureClick={this.handlePictureClick} key={key} imgKey={key} imageUrl={imageUrl} imageId={imageId} deleteImage={this.props.deleteImage} />
            }
        })}
      </div>
    )
  }
}

Picture.contextTypes = {
  router: React.PropTypes.object
}
