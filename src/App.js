import React, { Component } from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import fb from './firebase';
import Dropzone from 'react-dropzone';
import './styles/App.css';

const storageRef = fb.storage().ref();
const database = fb.database();

class App extends Component {
  constructor() {
    super()

    this.state = {
      imageUrl: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    var file = this.imageUpload.files[0]
    var group = 'people'
    var imageRef = storageRef.child(file.name)
    var dbRef = database.ref('pictures/' + group )
    imageRef.put(file).then(function(snapshot) {
      var url = snapshot.a.downloadURLs[0]
      dbRef.set({
        imageUrl: url
      })
    })
    dbRef.once('value', (snapshot) => {
      if(snapshot.val() !== null) {
        this.setState({ imageUrl: snapshot.val().imageUrl })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <form>
          <input ref={(ref) => this.imageUpload = ref} type='file' name='image-file' />
          <input onClick={this.handleSubmit.bind(this)} type='submit' />
          <img src={this.state.imageUrl} width='179' height='280' alt="" />
        </form>
      </div>
    );
  }
}

export default App;
