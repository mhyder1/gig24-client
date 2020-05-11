import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
        <div id="sidenav">
          {
            <div className={open ? "navbar show" : "navbar toggle"}>
              <NavLink
                activeClassName="main-nav-active"
                className="links art"
                to={"/arts-crafts"}
              >
                Arts & Crafts
              </NavLink>
              <NavLink
                ActiveClassName="main-nav-active"
                className="links music"
                to={"/music-dance"}
              >
                Music & Dance
              </NavLink>
              <NavLink
                ActiveClassName="main-nav-active"
                className="links outdoor"
                to={"/outdoor-activities"}
              >
                Outdoor activities
              </NavLink>
              <NavLink
                ActiveClassName="main-nav-active"
                className="links sport"
                to={"/sports-fitness"}
              >
                Sports & Fitnesss
              </NavLink>
              <NavLink
                ActiveClassName="main-nav-active"
                className="links books"
                to={"/books-films"}
              >
                Books & Films
              </NavLink>
              <NavLink
                ActiveClassName="main-nav-active"
                className="links tutor"
                to={"/tutoring"}
              >
                Tutoring
              </NavLink>
            </div>
          }
        </div>
      </nav>
    );
  }
}
