import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from "react-router-dom";
import AddEvents from './Component/AddEvents/AddEvents';
import Header from './Component/Header/Header';
import Intro from './Component/Intro/Intro';
import Signup from './Component/Signup/Signup';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddEvents /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Header /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Intro /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Signup /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });