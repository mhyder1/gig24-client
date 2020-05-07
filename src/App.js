import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "./Component/Context/AppContext";
import Header from "./Component/Header/Header";
import Intro from "./Component/Intro/Intro";
import Signup from "./Component/Signup/Signup";
import GuestView from "./Component/GuestView/GuestView";
import UserView from "./Component/UserView/UserView";
import AddEvents from "./Component/AddEvents/AddEvents";
import NavMenu from "./Component/NavMenu/NavMenu";
import Confirm from "./Component/Confirm/Confirm";
import "./App.css";

class App extends Component {
  static contextType = AppContext;

 state ={
    events: []
 }

 addEvent =(event) => {
   this.setState({
     events :[...this.state.events, event]
   })
 }
 componentDidMount(){

 }

  render() {
    const value = {
      addEvent: this.addEvent
    }

    return (
      <AppContext.Provider value={value}>
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
            <Route path="/home" component={GuestView} />
            <Route path="/home" component={NavMenu} />
            <Route path="/userview" component={NavMenu} />
            <Route path="/userview" component={UserView} />
          </section>

          <section className="add-events">
            <Route path="/add-events" component={NavMenu} />
            <Route path="/add-events" component={AddEvents} />
          </section>

          <section className="success">
            <Route path="/success" component={NavMenu} />
            <Route path="/success" component={Confirm} />
          </section>
        </div>
      </>
     </AppContext.Provider>
    );
  }
}

export default App;
