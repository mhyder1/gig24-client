import React, { Component } from "react";
import AppContext from '../../Component/AppContext'

export default class JobSeekerDash extends Component {
  static contextType = AppContext;

  

  render() {
    console.log(this.context)
    return (
      <>
        <section>
          <header>
            <h1>Job Seeker Dashboard</h1>
          </header>

          <h3>Pending gigs</h3>
          <ul>
          {this.context.appliedUser.map((user,idx) => (
            <li key={idx}>
            <p>{user.description}</p>
            </li>
          ))}
          </ul>
        </section>
      </>
    );
  }
}
