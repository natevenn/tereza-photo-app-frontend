import React, { Component } from 'react';
import Header from './components/Header';
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
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    //let params = this.props.pathname
    //this.fetchImages();
    const userRef = localStorage.getItem('username');
    const userTokenRef = localStorage.getItem('token');

    if(userRef && userTokenRef) {
      this.setState({username: userRef, userToken: userTokenRef});
    }
  }

  addImage(key, url) {
    this.state.images[key] = { imageUrl: url }
    this.setState({images: this.state.images})
  }

  handleLogout() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.setState({username: '', userToken: ''})
  }

  render() {
  if (this.props.pathname == '/signin') {
    return (
      <Signin />
    )
    } else {
      return (
        <div className="App">
          <Header user={this.state.username} token={this.state.userToken} handleLogout={this.handleLogout} />
          <Pictures location={location.pathname} images={this.state.images} username={this.state.username} userToken={this.state.userToken} />
        </div>
      );
    }
  }

}

//App.contextTypes = {
  //router: React.PropTypes.object
//}
