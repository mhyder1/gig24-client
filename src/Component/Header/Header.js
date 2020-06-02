import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import AppContext from "../AppContext"
import "./Header.css";


export default class Header extends Component {
  static contextType = AppContext

  handleLogoutClick = () => {
    console.log('logging out...')
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {user_id:''}
    this.context.setUserId(token.user_id, token.employer)
  };

  renderLogoutLink() {
    return (
      <div>
        <Link onClick={this.handleLogoutClick} to="/" style={{textDecoration:'none', color:'#fff'}}>
          Logout
        </Link>
      </div>
    );
  }


  
  renderLoginLink() {
    return (
      <>
       <Link
          className="log-sign-links"
          style={{ marginRight: "5px", fontWeight:'bolder', color:'#orange' }}
          to="/login"
        >
          Log in
        </Link>{" "}
        <Link
          className="log-sign-links"
          style={{ marginLeft: "5px" }}
          to="/signup"
        >
          Sign up
        </Link>
       </>
    );
  }

  render() {
    return (
      <>
      <nav>
          <Link to='/' 
            style={{textDecoration:'none', color:'#fff', fontSize:'34px'}}>
            GIG 24
          </Link>
        {' '}
        <span className='header-span'>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        </span>
      </nav>
    </>
    );
  }
}
