import React, { Component } from 'react';
import '../styles/signup.css';

const signinRequest = "http://127.0.0.1:8080/api/v1/signup"

export default class Signin extends Component {
  constructor() {
    super()

    this.state = { errorMessage : null}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    setUser = setUser.bind(this)
    handleErrorMessage = handleErrorMessage.bind(this)

    var data = JSON.stringify({username: this.uname.value, password: this.pwd.value});

    getUserToken(data)

    function getUserToken(data) {
      fetch(signinRequest, {
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

  render() {
    if(this.state.errorMessage) {
      var errorMessage =
        <div className='signupAlert'>
          {this.state.errorMessage}
        </div>
    }
    return (
      <div className='container'>
        <label for="">Username</label>
        <input ref={(uname) => this.uname = uname} className='uname' type="text" placeholder="Enter Username" required />
        <label for="">Password</label>
        <input ref={(pwd) => this.pwd = pwd} className='pwd' type="password" placeholder="Enter Password" required />
        <button onClick={this.handleSubmit}>Create Account</button>
        {errorMessage}
      </div>
    )
  }
}

Signin.contextTypes = {
  router: React.PropTypes.object
}
