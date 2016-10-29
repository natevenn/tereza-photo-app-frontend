import React, { Component } from 'react';
import Header from './components/Header';
import Picture from './components/Picture';
import storage from './firebase';
import Dropzone from 'react-dropzone';
import './styles/App.css';

const storageRef = storage.ref()
console.log('storage ref', storageRef)
const imageRef = storageRef.child('homepage/IMG_1097.JPG');
console.log('image ref', imageRef);

class App extends Component {
  handleSubmit(e) {
    e.preventDefault()
    var input = this.refs.input.value
    console.log(input)
  }
  render() {
    return (
      <div className="App">
        <Header />
        <form>
          <input ref='input' type='file' name='image-file' />
          <input onClick={this.handleSubmit.bind(this)} type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
