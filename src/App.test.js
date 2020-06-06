import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from "react-router-dom";
import LandingPg from "./Component/LandingPg/LandingPg";
import Header from './Component/Header/Header';
import EmpDash from "./Component/EmpDash/EmpDash";
import Signup from './Component/Signup/Signup';
import NavMenu from "./Component/NavMenu/NavMenu";

it('App renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('AddEvents renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><LandingPg /></BrowserRouter>, div);
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
    ReactDOM.render(<BrowserRouter><EmpDash /></BrowserRouter>, div);
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
    ReactDOM.render(<BrowserRouter><NavMenu /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

