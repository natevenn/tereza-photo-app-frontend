import React, { Component } from 'react';
import fb from '../firebase';
import Header from './Header';
import '../styles/admin.css';

const storageRef = fb.storage().ref();

export default class UploadImage extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    var file = this.imageUpload.files[0]
    var group = this.groupName.value
    var imageRef = storageRef.child(file.name)
    imageRef.put(file).then((snapshot) => {
      var url = snapshot.a.downloadURLs[0]
      console.log('url', url);
      //send url to database
    })

    this.imageUpload.value = ""
    this.groupName.value = "Select a picture group"
  }

  render() {
    return (
      <div>
        <Header />
        <form className="upload-form">
          <input ref={(ref) => this.imageUpload = ref} type='file' name='image-file' />
          <select ref={(ref) => this.groupName = ref} name="group-drop-down">
            <option disabled={true} selected>Select a picture group</option>
            <option value="people">people</option>
            <option value="places">places</option>
            <option value="art">art</option>
          </select>
          <input onClick={this.handleSubmit} type='submit' />
        </form>
      </div>
    )
  }
}
