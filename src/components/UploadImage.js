import React, { Component } from 'react';
import fb from '../firebase';

const storageRef = fb.storage().ref();
const database = fb.database();

export default class UploadImage extends Component {
  constructor() {
    super()
    this.state = {
      imageUrl: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    var file = this.imageUpload.files[0]
    var group = this.groupName.value
    var imageRef = storageRef.child(file.name)
    var dbRef = database.ref('pictures/' + group )
    imageRef.put(file).then(function(snapshot) {
      var url = snapshot.a.downloadURLs[0]
      var newImageRef = dbRef.push()
      newImageRef.set({
        imageUrl: url
      })
    })

    dbRef.once('value', (snapshot) => {
      if(snapshot.val() !== null) {
        this.setState({ imageUrl: snapshot.val().imageUrl })
      }
    })

    this.imageUpload.value = ""
    this.groupName.value = "Select a picture group"
  }

  render() {
    return (
      <div>
        <form>
          <input ref={(ref) => this.imageUpload = ref} type='file' name='image-file' />
          <select ref={(ref) => this.groupName = ref} name="group-drop-down">
            <option disabled={true} selected>Select a picture group</option>
            <option value="people">people</option>
            <option value="places">places</option>
            <option value="art">art</option>
          </select>
          <input onClick={this.handleSubmit.bind(this)} type='submit' />
        </form>
        <div className="image-div">
          <img className="img" src={this.state.imageUrl} alt="" />
        </div>
      </div>
    )
  }
}
