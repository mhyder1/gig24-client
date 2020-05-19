import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from "react-router-dom";
import AddEvents from './Component/AddEvents/AddEvents';
import Header from './Component/Header/Header';
import Intro from './Component/Intro/Intro';
import Signup from './Component/Signup/Signup';
import MyEvents from './Component/MyEvents/MyEvents';

it('App renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('AddEvents renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><AddEvents /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('Header renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><Header /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('Intro renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><Intro /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Signup renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><Signup /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('MyEvents renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><MyEvents /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

