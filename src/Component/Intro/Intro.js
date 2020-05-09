import React, { Component } from "react";
//import { Link } from "react-router-dom";

export default class Intro extends Component {
  state = {};

  render() {
    return (
      <>
        <h2>Welcome parents!</h2>
        <p>
          The Parent Connect app connects single parents to a collective online village where families 
          can grow together experiencing different activities, cultures and most importantly supporting each other 
        </p>
        <h3>Log in</h3>
        {/* <form onSubmit>
          <label>Username: </label>
          <input
            onChange
            type="text"
            name="username"
            placeholder="zelda12"
            value=""
            required
          />
          <br />
          <label>Password: </label>
          <input onChange type="text" name="password" value="" required />
          <br />
          <input type="submit" value="login" />{" "}
          <button>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/signup"
            >
              create account
            </Link>
          </button>
        </form> */}
      </>
    );
  }
}
