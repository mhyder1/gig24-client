import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import { Link } from "react-router-dom";
import "./jsprofile.css";

export default class JobSeekerPro extends Component {
  static contextType = AppContext;

  render() {
    const { jsProfile } = this.context;

    return (
      <section className="myprofile">
        <h1 className="mypro">My profile</h1>
        <p>{jsProfile.name}</p>
        <p>{jsProfile.about_me}</p>
        <p>{jsProfile.education}</p>
        <p>{jsProfile.location}</p>
        <p>{jsProfile.email}</p>
        <p>{jsProfile.phone}</p>
        <p>{jsProfile.imdb}</p>
        <p>{jsProfile.skillset}</p>
        {!jsProfile.error 
          ?
          <Link
            to={{
              pathname: '/edit-js-profile',
              state: {jsProfile}
            }}
          >
            <button>Edit Profile</button>
          </Link>
          :
          <Link to='/crt-js-profile'>
            <button>Create Profile</button>
          </Link>
        }
      </section>
    );
  }
}
