import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";

import AppContext from "../../Component/Context/AppContext";
import TokenService from "../../services/token-service";

export default class Login extends Component {
  static contextType = AppContext;

  state = {
    username: "",
    password: "",
    error: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
        const { username, password } = this.state;
        console.log(password)
    console.log({ username });
    AuthApiService.postLogin({
      username,
      password
    })
      .then((res) => {
        this.setState({
          username: "",
          password: ""
        });
        const token = TokenService.readJwtToken();
        this.context.setUserId(token.user_id, token.fullname);
        this.handleLoginSuccess();
      })
      .catch((res) => {
        console.log(res.error)
        //this.setState({ error: res.error })
      });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <h3>Log in</h3>

        <p>demo username:dunder</p>
        <p>demo password: hello1</p>
        <form
          style={{ lineHeight: " 45px", backgroundColor: "#fff" }}
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div role="alert">
            {error && <p style={{color:"red"}}>{error}</p>}
          </div>
          <label style={{paddingRight:"3px"}}>Username: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            required
          />
          <br />
          <label style={{ paddingRight: "3px" }}>Password: </label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="username"
            value={this.state.password}
            required
          />
          <br />
          <input
            style={{
              marginLeft: "45px",
              backgroundColor: "#212121",
              color: "#fff",
              padding: "3px 5px",
              borderRadius: "4px",
              lineHeight: "20px",
              fontSize: "13px",
            }}
            type="submit"
            value="login"
          />{" "}
          <button
            style={{
              backgroundColor: "#212121",
              padding: "3px 6px",
              borderRadius: "4px",
              lineHeight: "20px",
              fontSize: "13px",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to="/signup"
            >
              create account
            </Link>
          </button>
        </form>
        
      </>
    );
  }
}
