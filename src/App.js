import React, { Component } from 'react';
import Header from './components/Header';
import UploadImage from './components/UploadImage';
import Pictures from './components/Pictures';
import Signin from './components/Signin';
import fb from './firebase';
import './styles/App.css';


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      userToken: '',
      images: []
    }

    this.addImage = this.addImage.bind(this);
  }

  componentWillMount() {
    //let params = this.props.pathname
    const userRef = localStorage.getItem('username')
    const userTokenRef = localStorage.getItem('token')

    if(userRef && userTokenRef) {
      this.setState({username: userRef, userToken: userTokenRef})
    }
  }

  addImage(key, url) {
    this.state.images[key] = { imageUrl: url }
    this.setState({images: this.state.images})
  }

  render() {
  if (this.props.pathname == '/login') {
    return (
      <Signin />
    )
    } else {
      return (
        <div className="App">
          <Header user={this.state.username} />
          <Pictures images={this.state.images} username={this.state.username} userToken={this.state.userToken} />
        </div>
      );
    }
  }

}

//App.contextTypes = {
  //router: React.PropTypes.object
//}
