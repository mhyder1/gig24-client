import React, { Component } from "react";
import AppContext from "../Context/AppContext";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./eventList.css";

export default class EventList extends Component {
  static contextType = AppContext;

  render() {
    const type = this.props.match.url.split("/")[1];
    const { events } = this.context;
    const token = TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : { user_id: "" };
    console.log(events);
    const eventList = events.filter((event) => event.type === type);
    
    return (
      <>
        <button style={{ backgroundColor: "green", color: "white" }}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/add-events"
          >
            Create your event
          </Link>
        </button>
        
        <h3>Current events</h3>
        <ul className="ev-list">
          {eventList.map((event, id) => (
            <li key={id}>
              <p className="bold">{event.parent_name}</p>
              <p className="bold">{event.title}</p>
              <p className="bold">Description</p>
              <p>{event.description}</p>
              <p className="bold">Address</p>
              <p className='bdata'>{event.address}</p>
              <button>Join</button>{" "}
              {event.author === token.user_id && (
                <button>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={{
                      pathname: "/update-events",
                      state: { event },
                    }}
                  >
                    Update
                  </Link>
                </button>
              )}
              <hr />
              <br />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
