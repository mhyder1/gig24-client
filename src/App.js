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
import EventList from "./Component/EventList/EventList";
//import ArtsCrafts from './Component/navViews/arts-crafts';
import config from './config.js';
import "./App.css";

class App extends Component {
  static contextType = AppContext;

  state = {
    events: [],
    users:[]
  };

  addEvent = (event) => {
    this.setState({
      events: [...this.state.events, event],
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/events`),
      fetch(`${config.API_ENDPOINT}/users`)
    ])
    .then(([eventsRes, usersRes]) => {
      if (!eventsRes.ok) return eventsRes.json().then((e) => Promise.reject(e));
      if (!usersRes.ok)
        return usersRes.json().then((e) => Promise.reject(e));
      return Promise.all([eventsRes.json(), usersRes.json()]);
    })
    .then(([events, users]) => {
      this.setState({ events, users });
      console.log(events)
    })
    .catch((error) => {
      console.log({ error })
    });

  }

  render() {
    const value = {
      events: this.state.events,
      users:this.state.users,
      addEvent: this.addEvent
    };

    return (
      <AppContext.Provider value={value}>
        <>
          <div className="App">
            <header className="App-header">
              <Switch>
                <Route path="/" component={Header} />
              </Switch>
            </header>
            <Route exact path="/" component={NavMenu} />
            <Route exact path="/" component={Intro} />
            <section>
              <Route path="/signup" component={NavMenu} />
              <Route path="/signup" component={Signup} />
            </section>
            <section className="home-page">
              <Route path="/home" component={GuestView} />
              <Route path="/home" component={NavMenu} />
            </section>
            <section className="userview">
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
            <section className="eventList">
              <Route path="/arts-crafts" component={NavMenu} />
              <Route path="/arts-crafts" component={EventList} />

              <Route path="/music-dance" component={NavMenu} />
              <Route path="/music-dance" component={EventList} />

              <Route path="/outdoor-activities" component={NavMenu} />
              <Route path="/outdoor-activities" component={EventList} />

              <Route path="/sport-fitness" component={NavMenu} />
              <Route path="/sport-fitness" component={EventList} />

              <Route path="/books-films" component={NavMenu} />
              <Route path="/books-films" component={EventList} />

              <Route path="/tutoring" component={NavMenu} />
              <Route path="/tutoring" component={EventList} />
            </section>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

export default App;

