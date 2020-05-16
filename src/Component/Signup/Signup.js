import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import './signup.css'

export default class Signup extends Component {
  state = {
    error: null,
    fullname: "",
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { fullname, username, password } = this.state;

    this.setState({ error: null });
    AuthApiService.postUser({
      username,
      password,
      fullname,
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
          style={{ lineHeight: " 45px", backgroundColor: "#fff" }}
          onSubmit={this.handleSubmit}
        >
          <div role="alert">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <label for="funame" style={{ paddingRight: "5px" }}>
            Fullname:
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
          <label for="luname" style={{ paddingRight: "2px" }}>
            Username:
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
          <label for="pass" style={{ paddingRight: "2px" }}>
            Password:
          </label>{" "}
          <input
            id="pass"
            type="text"
            name="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
          />
          <br />
          <input className='submitbtn'
            type="submit"
            style={{
              marginRight: '5px',
              border: '1px solid #fff',
              borderRadius: '5px',
              padding: '5px',
              color: '#fff',
              marginTop: '10px',
              backgroundColor: '#F98165'
            }}
            value="Sign up"
          />
        </form>
      </>
    );
  }
}
