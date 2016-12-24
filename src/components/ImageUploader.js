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
    var collection = this.props.location.match(/\w+/g)[0]
    var imageRef = storageRef.child(file.name)
    updateState = updateState.bind(this);

    imageRef.put(file).then((snapshot) => {
      var url = snapshot.a.downloadURLs[0]
      var data = JSON.stringify({username: this.props.username, collection: collection, url: url, token: this.props.userToken});

      fetch('http://127.0.0.1:8080/api/v1/images', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: data
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        updateState(data)
      }).catch(function(e) {
        console.log(e)
      });
    })

    function updateState(imageUrl) {
      this.props.addImage(imageUrl)
    }

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
