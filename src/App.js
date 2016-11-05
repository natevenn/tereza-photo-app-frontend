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

    this.addImage = this.addImage.bind(this);
  }

  componentWillMount() {
    let params = this.props.pathname
    let dbRef = database.ref('pictures' + params)
    dbRef.once('value').then((snapshot) => {
      this.setState({images: snapshot.val()})
    })
  }

  addImage(key, url) {
    this.state.images[key] = { imageUrl: url }
    this.setState({images: this.state.images})
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Pictures images={this.state.images}/>
      </div>
    );
  }
}
