import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import studio from '../../images/studio.jpeg'
import "./dash.css";

export default class JobSeekerDash extends Component {
  static contextType = AppContext;

  render() {
    console.log(this.context);
    return (
      <section className="dashboard"
      style={{
        background: `url(${studio})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
      }}
      >
        <h3 id='pending'>Pending gigs</h3>
        <ul className='dash'>
       
          {this.context.appliedUser.map((user, idx) => (
            <li key={idx}>
              <p>{user.description}</p>
            </li>
          ))}
  
        </ul>
      </section>
    );
  }
}
