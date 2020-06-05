import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import "./signup.css";

export default class Signup extends Component {
  state = {
    error: null,
    fullname: "",
    username: "",
    password: "",
    employer: false,
  };

  handleChange = (e) => {
    console.log(typeof e.target.value)
    let value 
    if(e.target.value === 'true') {
      value = true
    } else if(e.target.value === 'false'){
      value=false
    }else{
      value = e.target.value
    }
    this.setState({
      [e.target.name]: value
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { fullname, username, password, employer } = this.state;
    console.log(employer)
    this.setState({ error: null });
    AuthApiService.postUser({
      username,
      password,
      fullname,
      employer,
    })
      .then((user) => {
        this.setState({
          fullname: "",
          username: "",
          password: "",
        });
        this.props.history.push("/login");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <h3>Sign up</h3>
        <form
          id="signup-form"
            onSubmit={this.handleSubmit}
        >
          <div role="alert">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <label htmlFor="funame" style={{ paddingRight: "12px" }}>
            Fullname
          </label>{" "}
          <input
            id="funame"
            type="text"
            name="fullname"
            placeholder="John Doe"
            value={this.state.fullname}
            required
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="luname" style={{ paddingRight: "3px" }}>
            Username
          </label>{" "}
          <input
            id="luname"
            type="text"
            name="username"
            placeholder="zelda12"
            value={this.state.username}
            required
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="pass" style={{ paddingRight: "5px" }}>
            Password
          </label>{" "}
          <input
            id="pass"
            type="text"
            name="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
          />{" "}
          <br />
          <div>
            <input
              onChange={this.handleChange}
              type="radio"
              name="employer"
              value={true}
              required
            />
            Employer
            <input
              onChange={this.handleChange}
              type="radio"
              name="employer"
              value={false}
              required
            />
            Job seeker
          </div>
          <br />
          <input
            className="submitbtn"
            type="submit"
            style={{
              fontFamily:'Orbitron, sans-serif',
              marginRight: "5px",
              border: "1px solid #000",
              padding: "8px",
              color: "#000",
              marginTop: "10px",
              backgroundColor: "#01fff0",
            }}
            value="Sign up"
          />
        </form>
      </>
    );
  }
}
