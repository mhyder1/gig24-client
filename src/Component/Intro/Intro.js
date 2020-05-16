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
        <article id ='intro'>
        <h2 id='welcome'>Welcome {token.fullname ? token.fullname: 'parents'}!</h2>
        <p>
          The Parent Connect app connects single parents to a collective online village where families 
          can grow together experiencing different activities, cultures and most importantly supporting each other 
        </p>
        </article>
        <article>
        <h3>Current Events</h3>
        <ul className="intro">
        
          {events.map((event, id) => (
            <li key={id}>
              <p className="bold"> Hosted by {event.parent_name}</p>
              <h3 id='title'>{event.title}</h3>
              <NiceDate
                date={new Date(event.time_of_event)}
              />
              <p className= "description">{event.description}</p>
              <p className="bold">Address</p>
              <p>{event.address}</p>
            </li>
          ))}
         
        </ul>
        </article>
      </section>
    );
  }
}
