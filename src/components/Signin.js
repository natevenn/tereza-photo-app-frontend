import React, { Component } from 'react';
import '../styles/signup.css';

const signinRequest = "http://127.0.0.1:8080/api/v1/"
var path = 'login'

export default class Signin extends Component {
  constructor() {
    super()

    this.state = {
      errorMessage : null,
      isNewUser: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNewAccount = this.handleNewAccount.bind(this)
    this.handleExistingAccount = this.handleExistingAccount.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    setUser = setUser.bind(this)
    handleErrorMessage = handleErrorMessage.bind(this)

    var data = JSON.stringify({username: this.uname.value, password: this.pwd.value});

    getUserToken(data)

    function getUserToken(data) {
      fetch(signinRequest + path, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: data
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data['token'] && data['username']) {
          setUser(data)
        }
        else {
          console.log(data['errorMessage']);
          handleErrorMessage(data['errorMessage'])
        }
      }).catch(function(e) {
        console.log(e)
      });
    }

    function setUser(data) {
      localStorage.setItem('username', data['username'])
      localStorage.setItem('token', data['token'])
      this.context.router.transitionTo('/');
    }

   function handleErrorMessage(err) {
      this.setState({ errorMessage: err });
    }

    this.uname.value = '';
    this.pwd.value = '';
  }

  handleNewAccount() {
    this.setState({isNewUser: true})
  }

  handleExistingAccount() {
    this.setState({isNewUser: false})
  }

  render() {

    var header = <h1 className='loginHeader'>Log in</h1>
    var button = <button onClick={this.handleSubmit}>Log In</button>
    var linkToNewAccount = <a className='signinOrSignup' href='#' onClick={this.handleNewAccount}>or Create a new account</a>

    if(this.state.errorMessage) {
      var errorMessage =
        <div className='signupAlert'>
          {this.state.errorMessage}
        </div>
    }
    if(this.state.isNewUser) {
      path = 'signup'
      header = <h1 className='loginHeader'>Create a new account</h1>
      button = <button onClick={this.handleSubmit}>Sign up</button>
      linkToNewAccount = <a className='signinOrSignup' href='#' onClick={this.handleExistingAccount}>or Log in</a>
    }
    return (
      <div className='container'>
        { header }
        <label className='userLogin' for="">Username</label>
        <input ref={(uname) => this.uname = uname} className='uname' type="text" placeholder="Enter Username" required />
        <label className='passwordLogin' for="">Password</label>
        <input ref={(pwd) => this.pwd = pwd} className='pwd' type="password" placeholder="Enter Password" required />
        { button }
        { linkToNewAccount }
        {errorMessage}
      </div>
    )
  }
}

Signin.contextTypes = {
  router: React.PropTypes.object
}
