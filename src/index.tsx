import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './styles/index.scss';
import Cookies from 'universal-cookie';

export const cookies = new Cookies();

ReactDom.render(
  <App></App>
  , document.getElementById('root'));
