import React, { Component } from 'react';
import Header from './components/Header';
import Pictures from './components/Pictures';
import Signin from './components/Signin';
import './styles/App.css';
import ImageUploader from './components/ImageUploader';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      userToken: '',
      images: []
    }

    this.addImage = this.addImage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getImages = this.getImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentWillMount() {
    const userRef = localStorage.getItem('username');
    const userTokenRef = localStorage.getItem('token');
    this.getImages();

    if(userRef && userTokenRef) {
      this.setState({username: userRef, userToken: userTokenRef});
    }
  }

  getImages() {
    let params = this.props.pathname
    var api = 'http://127.0.0.1:8080/api/v1/terezavenn' + params + '/images'
    setImagesToState = setImagesToState.bind(this);

    fetch(api, {
      method: 'get'
    }).then(function(response) {
      return response.json();
    }).then( (data) => {
      setImagesToState(data)
    }).catch(function(err) {
      console.log(err)
    });

    function setImagesToState(images) {
      this.setState({images: images});
    }
  }

  deleteImage(imageId) {
    renderDeleteMessage = renderDeleteMessage.bind(this);

    var data = {
      token: this.state.userToken
    }

    fetch('http://127.0.0.1:8080/api/v1/images/' + imageId, {
      method: 'DELETE',
      body: data
    })
    .then( (res) => {
      return res.json()
    })
    .then( (data) => {
      renderDeleteMessage(data)
    })
    .catch( (err) => {
      console.log('error', err)
    })

    function renderDeleteMessage(msg) {
      this.componentWillMount();
    }
  }

  handleLogout() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.setState({username: '', userToken: ''})
  }

  addImage(imageUrl) {
    var newState = this.state.images
    newState.push(imageUrl)
    this.setState({images: newState})
  }

  render() {

    if(this.state.username && this.state.userToken){
      var imageUploader = <ImageUploader username={this.state.username} userToken={this.state.userToken} location={location.pathname} addImage={this.addImage} />
    }

    if (this.props.pathname === '/signin') {
      return (
        <Signin />
      )
    } else {
      return (
        <div className="App">
          <Header user={this.state.username} token={this.state.userToken} handleLogout={this.handleLogout} />
          { imageUploader }
          <Pictures images={this.state.images} location={location.pathname} deleteImage={this.deleteImage} />
        </div>
      );
    }
  }

}

//App.contextTypes = {
  //router: React.PropTypes.object
//}
