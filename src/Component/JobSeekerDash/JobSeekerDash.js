import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import studio from "../../images/studio.jpeg";
import "./dash.css";

export default class JobSeekerDash extends Component {
  static contextType = AppContext;

  render() {
    console.log(this.context);
    return (
      <section
        className="dashboard"
        style={{
          background: `url(${studio})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2 id="pending">Pending gigs</h2>
        <ul className="dash">
          {this.context.appliedUser.map((user, idx) => (
            <li key={idx}>
              <p>{user.position}</p>
              <p>{user.title}</p>
              <p>{user.description}</p>
              <p>{user.location}</p>
              <p>{user.pay}</p>
              <p>{user.duration}</p>
              <p>{user.unit}</p>
              <p>{user.requirements}</p>
              <p>{user.member ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
