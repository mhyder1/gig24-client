import React, { Component } from "react";
import {NiceDate} from '../Utils/Utils';
import AppContext from '../Context/AppContext'
import TokenService from "../../services/token-service"
import './Intro.css'


export default class Intro extends Component {
  static contextType = AppContext

  render() {
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {fullname:''}
    const {events} = this.context

    return (
      <section>
        <h2>Welcome {token.fullname ? token.fullname: 'parents'}!</h2>
        <p>
          The Parent Connect app connects single parents to a collective online village where families 
          can grow together experiencing different activities, cultures and most importantly supporting each other 
        </p>
        <h3>Current Events</h3>
        <ul className="intro">
          {events.map((event, id) => (
            <li key={id}>
              <p className="bold">{event.parent_name}</p>
              <p className="bold">{event.title}</p>
            
              <NiceDate
                date={new Date(event.time_of_event)}
              />
              <p className="bold">Description</p>
              <p>{event.description}</p>
              <p className="bold">Address</p>
              <p>{event.address}</p>
            </li>
          ))}
        </ul>
       
      </section>
    );
  }
}
