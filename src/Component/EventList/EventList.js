import React, { Component } from "react";
import AppContext from "../Context/AppContext";
import {Link} from 'react-router-dom'
import { NiceDate } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import config from '../../config'
import "./eventList.css"; 

export default class EventList extends Component {
  static contextType = AppContext;

  removeAttend = (attend_id) => {
    fetch(`${config.API_ENDPOINT}/attend/${attend_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
  })
  .then(() => {
    this.context.removeAttend(attend_id)
  })
  }
  render() {
    const type = this.props.match.url.split('/')[1]
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {user_id:''}
    const { events, attend } = this.context
    const eventList = events.filter(event => event.type === type)

    for (let event of eventList) {
      event.joined = false
        for (let att of attend) {
            if(att.guest === token.user_id && att.event === event.id) {
       
                event.joined = true;
                event.attend_id = att.id
            }
        }
    }
    
    return (
      <>
        <h3 id='current'>Current events</h3>
        <button 
          style={{
            marginRight: '5px',
            border: '1px solid #fff',
            borderRadius: '5px',
            padding: '5px',
            marginTop: '10px',
            backgroundColor: '#F98165'
          }}>
            <Link style={{textDecoration:'none', color:'white'}} to='/add-events'>Create your event</Link>
            </button>
        <ul className="event-list">
          {eventList.map((event, id) => (
            <li key={id}>
              <p className="bold">Hosted by {event.parent_name}</p>
              <h3 id='title'>{event.title}</h3>
              <NiceDate
                date={new Date(event.time_of_event)}
              />
              <p className='description'>{event.description}</p>
              <p className="bold">Address</p>
              <p>{event.address}</p>
              {(event.author !== token.user_id && !event.joined) &&
                <button 
                style={{
                  marginRight: '5px',
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  padding: '5px',
                  marginTop: '0',
                  marginBottom:'10px',
                  backgroundColor: '#00CCCC'
                }}>
                  <Link 
                    style={{textDecoration:'none', color:'#fff'}} 
                    to={{
                      pathname: '/join-event',
                      state: {event}
                    }}
                  >
                    Join
                  </Link>
                </button>
              }
              {(event.author !== token.user_id && event.joined) &&
                <button 
                  onClick={() => this.removeAttend(event.attend_id)}
                  style={{cursor:'pointer'}}
                  >Un join</button>
              }
              {(event.author === token.user_id) &&
                <button 
                style={{
                  marginRight: '5px',
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  padding: '5px',
                  marginTop: '0',
                  marginBottom:'10px',
                  backgroundColor: 'rgb(0, 204, 204)'
                }}>
                  <Link 
                    style={{textDecoration:'none', color:'#fff'}} 
                    to={{
                      pathname: '/update-events',
                      state: {event}
                    }}
                  >
                    Update
                  </Link>
                </button>
                
              }
    
              <br/>
            </li>
          ))}
        </ul>
      </>
    );
  }
}