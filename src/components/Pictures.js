import React, { Component } from 'react';
import Picture from './Picture';


export default class Pictures extends Component {
  render() {
    var images = Object.keys(this.props.images)
    return (
      <div>
        {images.map((key) => {
          var imageUrl = this.props.images[key].imageUrl
          return <Picture key={key} imageUrl={imageUrl} />
          })}
      </div>
    )
  }
}
