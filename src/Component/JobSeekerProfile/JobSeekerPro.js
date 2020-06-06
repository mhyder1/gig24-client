import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import { Link } from "react-router-dom";
import "./jsprofile.css";
import myProfile from "../../images/myProfile.jpg";

export default class JobSeekerPro extends Component {
  static contextType = AppContext;

  render() {
    const { jsProfile } = this.context;

    return (
      <section
        className="myprofile"
        style={{
          background: `url(${myProfile})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 id="header">My profile</h1>
        <article className="mypro">
          <div id="who">
            <h3 style={{fontWeight:'bold', textTransform:'capitalize'}}>{jsProfile.name}</h3>
            <p stle={{fontWeight:'bold'}}>{jsProfile.position}</p>
            <p>{jsProfile.location}</p>
          </div>
          <div id='second'>
          <div id="about">
            <p>{jsProfile.about_me}</p>
            <p>{jsProfile.imdb}</p>
            <p>{jsProfile.education}</p>
            <p>{jsProfile.skillset}</p>
          </div>
          <div id="contact">
            <p>{jsProfile.email}</p>
            <p>{jsProfile.phone}</p>
          </div>
          </div>
        </article>
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
