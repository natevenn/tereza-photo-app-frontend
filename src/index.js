import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import About from './components/About';
import UploadImage from './components/UploadImage';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import './styles/index.css';

const routes = (
  <BrowserRouter>
    <div>
      <Match exactly pattern='/' component={App} />
      <Match pattern='/people' component={App}/>
      <Match pattern='/places' component={App}/>
      <Match pattern='/life' component={App}/>
      <Match pattern='/art' component={App}/>
      <Match pattern='/crestedbutte' component={App}/>
      <Match pattern='/about' component={About}/>
      <Match pattern='/signin' component={App}/>
      <Match pattern='/login' component={App}/>
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
)

ReactDOM.render( routes, document.getElementById('root') );
