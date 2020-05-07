import React, { Component } from "react";
import AppContext from "../Context/AppContext";
import "./eventList.css";

export default class EventList extends Component {
  static contextType = AppContext;

  render() {
    const { events } = this.context;
    console.log(events);
    return (
      <>
        <h2>Current events</h2>
        <ul>
          {events.map((event, id) => (
            <li key={event.id}>
              <p className="bold">{event.title}</p>
              {/* <p>{event.time_of_event}</p> */}
              <p className="bold">Description</p>
              <p>{event.description}</p>
              <p className="bold">Location</p>
              <p>{event.location}</p>
              <button>Join Event</button>{' '} 
              <button>Update Event</button>
              <hr />
              <br/>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
