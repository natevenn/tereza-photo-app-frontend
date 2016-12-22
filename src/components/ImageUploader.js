import React, { Component } from 'react';
import fb from '../firebase';
import '../styles/admin.css';

const storageRef = fb.storage().ref();

export default class ImageUploader extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    var file = this.imageUpload.files[0]
    var group = this.props.location
    console.log('group', group)
    var imageRef = storageRef.child(file.name)
    imageRef.put(file).then((snapshot) => {
      var url = snapshot.a.downloadURLs[0]
      console.log('url', url);
      //send url to database
    })

    this.imageUpload.value = ""
  }

  render() {
    return (
      <div>
        <input ref={(ref) => this.imageUpload = ref} type='file' name='image-file' />
        <input onClick={this.handleSubmit} type='submit' />
      </div>
    )
  }
}

ImageUploader.contextTypes = {
  router: React.PropTypes.object
}
