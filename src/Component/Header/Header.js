import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Header.css";
// import NavMenu from "../NavMenu/NavMenu";

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    return (
      <div>
        <Link onClick={this.handleLogoutClick} to="/">
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
          style={{ marginRight: "5px" }}
          to="/signup"
        >
          Sign up
        </Link>{" "}
        <Link
          className="log-sign-links"
          style={{ marginLeft: "5px" }}
          to="/login"
        >
          Log in
        </Link>
      </>
    );
  }

  render() {
    return (
      <>
      <nav>
          <Link to='/' 
            style={{textDecoration:'none', color:'#fff', fontSize:'24px'}}>
            PARENT 
            <span style={{fontFamily:' -apple-system', fontSize: '40px', lineHeight: '.2', position: 'relative', margin:'0 5px', top: '5px'}}>&#8734;</span> 
            CONNECT
            {/* float: right; 
 margin-right: 50px; 
 margin-top: 5px; 
 color: #fff; */}

          </Link>
        {' '}
        <span style={{float:'right', marginRight:'50px'}}>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        </span>
      </nav>
    </>
    );
  }
}
