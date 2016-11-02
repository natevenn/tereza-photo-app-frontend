import React, { Component } from 'react';
import Header from './components/Header';
import UploadImage from './components/UploadImage';
import Pictures from './components/Pictures';
import fb from './firebase';
import './styles/App.css';

const database = fb.database();

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      images: []
    }
  }

  componentWillMount() {
    var dbRef = database.ref('pictures/places')
    dbRef.once('value').then((snapshot) => {
      this.setState({images: snapshot.val()})
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <UploadImage />
        <Pictures images={this.state.images}/>
      </div>
    );
  }
}
