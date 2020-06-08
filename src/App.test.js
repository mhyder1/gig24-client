import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LandingPg from "./Component/LandingPg/LandingPg";
import Header from './Component/Header/Header';
import EmpDash from "./Component/EmpDash/EmpDash";
import Signup from './Component/Signup/Signup';
import NavMenu from "./Component/NavMenu/NavMenu";
import CreateEmpPro from "./Component/CreateProfile/CreateEmpPro";
import CreateJobSeekerPro from "./Component/CreateProfile/CreateJobSeekerPro";
import EditJobSeekerPro from "./Component/CreateProfile/EditJobSeekerPro";
import JobSeekerDash from "./Component/JobSeekerDash/JobSeekerDash";
import JobSeekerHome from "./Component/JobSeekerHome/js-home";
import Login from "./Component/Login/Login";
import EmpProfile from "./Component/EmpProfile/EmpProfile";
import PostAgig from "./Component/EmpPostAgig/PostAgig";

it('App renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('PostAgig renders without crashing', () => {

    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><PostAgig /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('EmpProfile renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><EmpProfile /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Login renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><Login /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('LandingPg renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><LandingPg /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('JobSeekerHome renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><JobSeekerHome /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('JobSeekerDash renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><JobSeekerDash /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('CreateEmpPro renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><CreateEmpPro /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('CreateJobSeekerPro renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><CreateJobSeekerPro /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('EditJobSeekerPro renders without crashing', () => {
  //   // const history = createMemoryHistory();
  //   let history, location;
  //   const div = document.createElement('div');
  //   window.HTMLCanvasElement.prototype.getContext = () => {}
  //   ReactDOM.render(
  //   <BrowserRouter 
  //     // history={history}
  //     // path="*"
  //     // render={({ history, location }) => {
  //     //   history = history;
  //     //   location = location;
  //     //   return null;
  //     // }}
  //   >
  //     <EditJobSeekerPro />
  //   </BrowserRouter>
  //   , div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });
  
  it('Header renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter ><Header /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('Employer Dashboard renders without crashing', () => {
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

  it('NavMenu renders without crashing', () => {
    const div = document.createElement('div');
    window.HTMLCanvasElement.prototype.getContext = () => {}
    ReactDOM.render(<BrowserRouter><NavMenu /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

