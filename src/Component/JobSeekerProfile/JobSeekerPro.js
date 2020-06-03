import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import "./jsprofile.css";

export default class JobSeekerPro extends Component {
  static contextType = AppContext;

  render() {
    console.log(this.context);
    const { jsProfile } = this.context;
    console.log(jsProfile.error)
    return (
      <section className="myprofile">
        <h1 className="mypro">My profile</h1>
        <p>{jsProfile.name}</p>
        <p>{jsProfile.about_me}</p>
        {!jsProfile.error 
          ?
          <button>Edit Profile</button>
          :
          <button>Create Profile</button>
        }
      </section>
    );
  }
}
