import React, { Component } from 'react';
import '../styles/signin.css';
const signinRequest = "http://127.0.0.1:3000/api/v1/signup"

export default class Signin extends Component {
  constructor() {
    super()

    this.state = { userToken : '' }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();

    setUserToken = setUserToken.bind(this)

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
        if (data['token']) {
          setUserToken(data)
        }
        else {
          console.log(data['errorMessage'])
          //handle errorMassage
        }
      }).catch(function(e) {
        console.log(e)
      });
    }

   function setUserToken(data) {
     this.state.userToken = data['token']
   }

   this.uname.value = '';
   this.pwd.value = '';
  }


  render() {
    return (
      <div className='container'>
        <label for="">Username</label>
        <input ref={(uname) => this.uname = uname} className='uname' type="text" placeholder="Enter Username" required />
        <label for="">Password</label>
        <input ref={(pwd) => this.pwd = pwd} className='pwd' type="password" placeholder="Enter Password" required />
        <button onClick={this.handleSubmit} >Create Account</button>
      </div>
    )
  }
}
