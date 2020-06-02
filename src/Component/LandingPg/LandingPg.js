import React from "react";
import { Link } from "react-router-dom";
import gig24cam from "../../images/gig24cam.jpg";
import "./landing.css";

export default function LandingPg() {
  //const gig24cam = <img src={`./images/gig24cam.jpg`}></img>
  return (
    <section
      className="landing"
      style={{
        background:`url(${gig24cam})`,
        height:"100vh",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center",
      }}
    >
      {/* <div>{gig24cam}</div> */}
      {/* <div styles={{ backgroundImage: `url(${gig24cam})` }}>
      </div> */}
      <div className="postfind-link">
        <Link
          style={{
            textDecoration: "none",
            border: "2px solid #000",
            padding: "20px",
          }}
          to="login"
        >
          POST A GIG
        </Link>
        <Link
          style={{
            textDecoration: "none",
            border: "2px solid #000",
            padding: "20px",
          }}
          to="login"
        >
          FIND A GIG
        </Link>
      </div>
    </section>
  );
}
