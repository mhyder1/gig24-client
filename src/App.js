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
import EventList from "./Component/EventList/EventList";

class App extends Component {
  static contextType = AppContext;

  state = {
    events: [
      {
        pname: "Marie",
        title: " Online Yoga with Marie",
        time_of_event: new Date(),
        description:
          "Cras semper sed sem ac consectetur. Ut lobortis lacus non dui accumsan viverra. Quisque eleifend libero vitae nunc venenatis malesuada",
        location: "zoom",
      },

      {
        pname: "Angela",
        title: "Paint with Angela",
        time_of_event: new Date(),
        description:
          "Cras semper sed sem ac consectetur. Ut lobortis lacus non dui accumsan viverra. Quisque eleifend libero vitae nunc venenatis malesuada",
        location: "Palisades Park, 1500 Ocean Dr, Santa Monica, CA90504",
      },
      {
        pname: "Meek",
        title: "Hiking with Meek and Sophia",
        time_of_event: new Date(),
        description:
          "Cras semper sed sem ac consectetur. Ut lobortis lacus non dui accumsan viverra. Quisque eleifend libero vitae nunc venenatis malesuada",
        location: "Statue of Liberty, New York, NY 10004",
      },
      {
        pname: "Sara",
        title: "Dance party with Sara",
        time_of_event: new Date(),
        description:
          "Cras semper sed sem ac consectetur. Ut lobortis lacus non dui accumsan viverra. Quisque eleifend libero vitae nunc venenatis malesuada",
        location: "Little Library, 5575 E 33rd Ave, Denver, CO 80207",
      },
      {
        pname: "Jenny",
        title: "Storytelling competition",
        time_of_event: new Date(),
        description:
          "Cras semper sed sem ac consectetur. Ut lobortis lacus non dui accumsan viverra. Quisque eleifend libero vitae nunc venenatis malesuada",
        location: "National Park 100, Larkin St, San Francisco, CA 94102",
      },
    ],
  };

  addEvent = (event) => {
    this.setState({
      events: [...this.state.events, event],
    });
  };

  componentDidMount() {}

  render() {
    const value = {
      events: this.state.events,
      addEvent: this.addEvent,
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
