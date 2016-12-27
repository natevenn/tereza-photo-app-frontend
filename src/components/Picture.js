import React, { Component } from 'react';
import '../styles/Image.css';

export default class Picture extends Component {
  componentDidMount() {
    var img = this.img
    if(this.isPortrait(img)) {
      this.imgWidth.style.width = "300px"
    }
  }

  isPortrait(img) {
    var w = img.naturalWidth || img.width
    var h = img.naturalHeight || img.height
    return (h > w)
  }

  handleClick() {
    var key = this.props.imgKey
    this.props.handlePictureClick(key)
  }

  handleDelete() {
    this.props.deleteImage(this.props.imageId)
  }

  render() {
    if(this.props.username && this.props.userToken) {
      var button = <a className='deleteImage' onClick={this.handleDelete.bind(this)}>X</a>
    }

    return (
      <div ref={(width) => this.imgWidth = width} className="img-div">
        <img ref={(img) => this.img = img}
          className='img' src={this.props.imageUrl}
          role='presentation'
          onClick={this.handleClick.bind(this)}
        />
        {button}
      </div>
    )
  }
}
