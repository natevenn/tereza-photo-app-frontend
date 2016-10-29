import React, { Component } from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import storage from './firebase';
import Dropzone from 'react-dropzone';
import './styles/App.css';

const storageRef = storage.ref()

class App extends Component {
  handleSubmit(e) {
    e.preventDefault()
    var file = this.imageUpload.files[0]
    var imageRef = storageRef.child(file.name)
    imageRef.put(file).then(function(snapshot) {
    var url = snapshot.a.downloadURLs[0]
    });
    console.log('file', file)
  }


  render() {
    return (
      <div className="App">
        <Header />
        <form>
          <input ref={(ref) => this.imageUpload = ref} type='file' name='image-file' />
          <input onClick={this.handleSubmit.bind(this)} type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
