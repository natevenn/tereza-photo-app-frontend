import React, { Component } from 'react';
import Header from './components/Header';
import UploadImage from './components/UploadImage';
import Pictures from './components/Pictures';
import fb from './firebase';
import './styles/App.css';

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
