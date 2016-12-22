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

  render() {
    return (
      <div ref={(width) => this.imgWidth = width} className="img-div">
        <img ref={(img) => this.img = img} className='img' src={this.props.imageUrl} onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}
