import React from "react";
import { Link } from "react-router-dom";
import gig24cam from "../../images/gig24cam.jpg";
import "./landing.css";

export default function LandingPg() {
 
  return (
    <section
      className="landing"
      style={{
        background: `url(${gig24cam})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div id='content'>
      <p>
        GIG 24 is the one stop shop for PA and film production jobs. Search for gigs and
        submit your resume today!
      </p>
    </div>
      <div className="postfind-link">
        <Link to="/login">
          <button className="glow-on-hover">POST A GIG</button>
        </Link>
        <Link to="/login">
          <button className="glow-on-hover">FIND A GIG</button>
        </Link>
      </div>
    </section>
  );
}
