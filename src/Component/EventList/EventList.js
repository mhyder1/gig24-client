import React, { Component } from "react";
import AppContext from "../Context/AppContext";
import {Link} from 'react-router-dom'
import "./eventList.css";

export default class EventList extends Component {
  static contextType = AppContext;

  render() {
    const { events } = this.context;
    console.log(events);
    return (
      <>
        <button style={{backgroundColor:'green', color:'white'}}><Link style={{textDecoration:'none', color:'white'}} to='/add-events'>Create your event</Link></button>
        <h3>Current events</h3>
        <ul>
          {events.map((event, id) => (
            <li key={event.id}>
              <p className="bold">{event.title}</p>
              {/* <p>{event.time_of_event}</p> */}
              <p className="bold">Description</p>
              <p>{event.description}</p>
              <p className="bold">Address</p>
              <p>{event.address}</p>
              <button>Join</button>{' '} 
              <button><Link style={{textDecoration:'none', color:'black'}} to='/add-events'>Update</Link></button>
              <hr />
              <br/>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
