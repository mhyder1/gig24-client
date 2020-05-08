import React, { Component } from "react";
//import { Link } from "react-router-dom";

export default class Intro extends Component {
  state = {};

  render() {
    return (
      <>
        <h2>Welcome parents!</h2>
        <p>
          The Parent connect app is built to help single parents connect and
          support each other. Assist with day to day activities by seamlessly
          toggling between schedules. Our community of helpers provide practica
          support such as babysitting, transporting, and dogwalking and plenty
          more. Sign up and join a virtual village like no other!
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
