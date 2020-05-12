import React, { Component } from "react";
import AppContext from "../Context/AppContext";
import {Link} from 'react-router-dom'
import { NiceDate } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import "./eventList.css";

export default class EventList extends Component {
  static contextType = AppContext;

  render() {
    const type = this.props.match.url.split('/')[1]
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {user_id:''}
    const { events } = this.context
    const eventList = events.filter(event => event.type === type)
    
    return (
      <>
        <button style={{backgroundColor:'green', color:'white'}}><Link style={{textDecoration:'none', color:'white'}} to='/add-events'>Create your event</Link></button>
        <h3>Current events</h3>
        <ul className="event-list">
          {eventList.map((event, id) => (
            <li key={id}>
              <p className="bold">{event.parent_name}</p>
              <p className="bold">{event.title}</p>
              {/* <p>{event.time_of_event}</p> */}
              <NiceDate
                date={new Date(event.time_of_event)}
              />
              <p className="bold">Description</p>
              <p>{event.description}</p>
              <p className="bold">Address</p>
              <p>{event.address}</p>
              {(event.author !== token.user_id) &&
                <button>
                  <Link 
                    style={{textDecoration:'none', color:'black'}} 
                    to={{
                      pathname: '/join-event',
                      state: {event}
                    }}
                  >
                    Join
                  </Link>
                </button>
              }
              {(event.author === token.user_id) &&
                <button>
                  <Link 
                    style={{textDecoration:'none', color:'black'}} 
                    to={{
                      pathname: '/update-events',
                      state: {event}
                    }}
                  >
                    Update
                  </Link>
                </button>
              }
              <hr />
              <br/>
            </li>
          ))}
        </ul>
      </>
    );
  }
}