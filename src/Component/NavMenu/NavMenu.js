import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./nav.css";

export default class NavMenu extends Component {
  state = {
    open: false,
  };

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    return (
      <nav className="navigation">
        <button className="hamburger" onClick={this.toggle}>
          |||
        </button>
          {
            <div className={open ? "navbar show" : "navbar toggle"}>
              <NavLink
                activeClassName="main-nav-active"
                className="links art"
                to={{
                  pathname:'/js-home',
                  // state: {
                  //   eventType:'Arts & Crafts'
                  // }
                }}
              >
               Home
              </NavLink>
              <NavLink
                activeClassName="main-nav-active2"
                className="links music"
                to={"/js-profile"}
              >
                My Profile
              </NavLink>
              {/* <NavLink
                activeClassName="main-nav-active"
                className="links outdoor"
                to={"/js-profile"}
              >
                Outdoor activities
              </NavLink> */}
              <NavLink
                activeClassName="main-nav-active"
                className="links sport"
                to={"/js-dashboard"}
              >
                Dashboard
              </NavLink>
              {/* <NavLink
                activeClassName="main-nav-active"
                className="links books"
                to={"/books-films"}
              >
                Books & Films
              </NavLink> */}
              {/* <NavLink
                activeClassName="main-nav-active"
                className="links tutor"
                to={"/tutoring"}
              >
                Tutoring
              </NavLink> */}
              {/* <Link className="my-events-link" to={"/my-events"}>
                <span role="img" aria-label="calendar-picker">
                  📅
                </span>
              </Link> */}
            </div>
          }
      </nav>
    );
  }
}
