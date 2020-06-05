import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import "./dash.css";

export default class JobSeekerDash extends Component {
  static contextType = AppContext;

  render() {
    console.log(this.context);
    return (
      <section className="dashboard">
        <h3 id='pending'>Pending gigs</h3>
        <ul>
          {this.context.appliedUser.map((user, idx) => (
            <li key={idx}>
              <p>{user.description}</p>
              <p>{user.duration}</p>
              <p>{user.location}</p>
              <p>{user.pay}</p>
              <p>{user.position}</p>
              <p>{user.term}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
