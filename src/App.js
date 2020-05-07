import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "./Component/Context/AppContext";
import Header from "./Component/Header/Header";
import Intro from "./Component/Intro/Intro";
import Signup from "./Component/Signup/Signup";
import GuestView from "./Component/GuestView/GuestView";
import UserView from "./Component/UserView/UserView";
import AddEvents from './Component/AddEvents/AddEvents';
import NavMenu from './Component/NavMenu/NavMenu';
import "./App.css";


class App extends Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/" component={Header} />
            </Switch>
          </header>
          <Route exact path="/" component={Intro} />
          <Route exact path="/signup" component={Signup}/>
          <section className="home-page">
            <Route path="/home" component={GuestView}/>
            <Route path="/home" component={NavMenu}/>
            <Route path="/userview" component={NavMenu}/>
            <Route path="/userview" component={UserView} />
          </section>
          <section className="add-events">
          <Route path="/add-events" component={NavMenu}/>
          <Route path="/add-events" component={AddEvents}/>
          </section>
        </div>
      </>
    );
  }
}

export default App;
