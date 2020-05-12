import React, { Component } from "react";
import AppContext from "../Context/AppContext";
//import {Link} from 'react-router-dom'
import { NiceDate } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import "./MyEvents.css";

export default class EventList extends Component {
  static contextType = AppContext;

  render() {
    const type = this.props.match.url.split('/')[1]
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {user_id:''}
    const { events, attend } = this.context
    // console.log(events)
    // console.log('attend',attend)
    const hosting = events.filter(event => event.author === token.user_id)
    // console.log('hosting',hosting)
    // const hostResult = []
    // for (let host of hosting) {
    //     for (let att of attend) {
    //         if(att.event === host.id) {
    //             // hostResult.push({...att,...host})
    //             console.log(att)
    //             console.log(host)
    //         }
    //     }
    // }
    // console.log(hostResult)


    let attending = attend.filter(att => att.guest === token.user_id)
    let result = []
    for (let att of attending) {
        for (let ev of events) {
            if(att.event === ev.id) {
                result.push({...att,...ev})
            }
        }
    }
    // console.log(result)
    // const eventList = events.filter(event => event.type === type)
    
    return (
        <>
        <h3>My events</h3>
        <main className="my-events">
            <section>
                <ul>
                    <h3>Hosting</h3>
                {hosting.map((event, id) => (
                    <li key={id}>
                    {/* <p className="bold">{event.parent_name}</p> */}
                    <p className="bold">{event.title}</p>
                    {/* <p>{event.time_of_event}</p> */}
                    <NiceDate
                        date={new Date(event.time_of_event)}
                    />
                    {/* <p className="bold">Description</p>
                    <p>{event.description}</p>
                    <p className="bold">Address</p>
                    <p>{event.address}</p> */}
                    </li>
                ))}
                </ul>
            </section>
            <section>
                <ul>
                    <h3>Attending</h3>
                {result.map((attend, id) => (
                    <li key={id}>
                    <p className="bold">{attend.title}</p>
                    {/* <p className="bold">{attend.children} {attend.children > 1 ? 'children':'child'}</p> */}
                    {/* <p>{event.time_of_event}</p> */}
                    <NiceDate
                        date={new Date(attend.time_of_event)}
                    />
                    {/* <p className="bold">Description</p>
                    <p>{event.description}</p>
                    <p className="bold">Address</p>
                    <p>{event.address}</p> */}
                    </li>
                ))}
                </ul>
            </section>
        </main>
      </>
    );
  }
}