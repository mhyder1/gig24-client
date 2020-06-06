import React, { Component } from "react";
//import DateTimePicker from "react-datetime-picker";
import AlgoliaPlaces from "algolia-places-react";
import AppContext from "../AppContext";
import TokenService from "../../services/token-service";
import config from "../../config";
import "../../AlgoliaPlaces.css";
import { Link } from 'react-router-dom'
import "./postgig.css";
export default class PostAgig extends Component {
  static contextType = AppContext;

  state = {
    position: "",
    title: "",
    type: "",
    requirements: "",
    description: "",
    member: false,
    location: "",
    //start_day: new Date(),
    pay: "",
    duration: "",
    unit:''
  };

  handleChange = (e) => {
    let value
    if(e.target.value === 'yes'){
      value = true
    } else if(e.target.value === 'no'){
      value = false
    } else {
      value = e.target.value;
    }
    this.setState({
      [e.target.name]: value
    });
  };

  // onChange = (date) => {
  //   this.setState({
  //     start_day: date,
  //   });
  // };

  // handleSelect = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }

  handleAddress = (suggestion) => {
    const { city, administrative } = suggestion;
    this.setState({
      location: `${city}, ${administrative}`,
    });
  };

  handleSubmit = (e) => {
    const token = TokenService.hasAuthToken()
    ? TokenService.readJwtToken()
    : { user_id: "" }
    const {user_id} = token
    e.preventDefault();

    fetch(`${config.API_ENDPOINT}/jobs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify( {
        position: this.state.position,
        title: this.state.title,
        type: this.state.type,
        requirements: this.state.requirements,
        description: this.state.description,
        member: this.state.member,
        location: this.state.location,
        pay: this.state.pay,
        //start_day: new Date(),
        duration: this.state.duration,
        unit:this.state.unit,
        user_id
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((job) => {
        this.context.addJob(job);
        this.props.history.push("/e-dashboard");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    return (
      <section className="post-a-gig">
        <h1 id="postgig">POST A GIG</h1>

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <br />
            <label className="label" htmlFor="position">
              Position:
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="position"
              id="position"
              className="input"
              value={this.state.position}
            />
            <label className="label" htmlFor="title">
              Production title:
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              id="title"
              className="input"
              value={this.state.title}
            />
            <label className="label" htmlFor="type">
              Production type:
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="type"
              id="type"
              className="input"
              value={this.state.type}
            />
          </fieldset>
          <br />
          <fieldset>
            <br />
            <label className="label" htmlFor="requirements">
              Requirements:
            </label>
            <textarea
              onChange={this.handleChange}
              type="text"
              name="requirements"
              id="requirements"
              className="textarea"
              value={this.state.requirements}
            />
            <label className="label" htmlFor="description">
              Description:
            </label>
            <textarea
              onChange={this.handleChange}
              name="description"
              id="description"
              className="input"
              value={this.state.description}
            />
            <label className="label" htmlFor="member">
              Is this Union/Guild job?:
            </label>
            <label style={{ color: "white" }}>Yes</label>
            <input
              onChange={this.handleChange}
              type="radio"
              name="member"
              id="member"
              value='yes'
            />
            <label style={{ color: "white" }}>No</label>
            <input
              onChange={this.handleChange}
              type="radio"
              name="member"
              id="member"
              value='no'
            />
          </fieldset>
          <br />
          <fieldset>
            <br />
            <label className="location" htmlFor="location">
              Location:
            </label>
            <div id="loc">
              <AlgoliaPlaces
                // className='input'
                id="location"
                placeholder="Write an address here"
                options={{
                  appId: config.APPID,
                  apiKey: config.SEARCH_KEY,
                  language: "en",
                  countries: ["us"],
                  type: "address",
                }}
                onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>
                  this.handleAddress(suggestion)
                }
              />
            </div>
            {/* <label className="label" htmlFor="start">
              Start day:
            </label>
            <DateTimePicker
              onChange={this.onChange}
              value={this.state.start_day}
            /> */}
            <br />
            <label className="label" htmlFor="pay">
              Pay:
            </label>
            <select
              className="input"
              name="pay"
              id="input"
              onChange={(e) => this.handleChange(e)}
            >
              <option>--</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="low-budget">Low-budget</option>
              <option value="internship">Internship</option>
            </select>
            <label className="label" htmlFor="duration">
              Duration:
            </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="duration"
              id="duration"
              className="input"
              value={this.state.duration}
            />
            <br />
            <label style={{ color: "white" }}>Day(s)</label>
            <input
              onChange={this.handleChange}
              type="radio"
              name="unit"
              value='day'
            />{" "}
            <label style={{ color: "white" }}>Week(s)</label>
            <input
              onChange={this.handleChange}
              type="radio"
              name="unit"
              value='week'
            />
            <label style={{ color: "white" }}>Month(s)</label>
            <input
              onChange={this.handleChange}
              type="radio"
              name="unit"
              value='month'
            />
            <br />
          </fieldset>
          <br />
          <input type="submit" value="POST" />{" "}
        </form>
        <br/>
          <Link to='/e-dashboard'><button>CANCEL</button></Link>
      </section>
    );
  }
}
