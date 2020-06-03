import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import AlgoliaPlaces from "algolia-places-react";
import AppContext from "../AppContext";
import TokenService from "../../services/token-service";
import config from "../../config";
import "../../AlgoliaPlaces.css";

export default class PostAgig extends Component {
  static contextType = AppContext;

  state = {
    position: "",
    //category: "",
    //type: "",
    //requirements: "",
    location: "",
    description: "",
    //start_day: new Date(),
    duration: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChange = (date) => {
    this.setState({
      start_day: date,
    });
  };

  // handleSelect = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }

  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`,
    });
  };

  handleSubmit = (e) => {
  
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/jobs`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        position: this.state.position,
       // category: this.state.category,
        pay: '6',
        //requirements: this.state.requirements,
        location: this.state.location,
        description: this.state.description,
        term :'part-time',
        //start_day: new Date(),
        duration: 'three weeks',
        user_id:'4'
        // company_name: token.user_id
      })
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((job) => {
        this.context.addJob(job);
        this.props.history.push('/e-dashboard');
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    return (
      <>
        <h2>Post a Gig</h2>

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>Position*</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="position"
              value={this.state.position}
            />
                {/* <label>Production title</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              value={this.state.title}
            /> */}
            <label>Production type</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="category"
              value={this.state.category}
            />
            <label>Pay </label>
            <select name="type" onChange={(e) => this.handleChange(e)}>
              <option>--</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="low-budget">Low-budget</option>
              <option value="internship">Internship</option>
            </select>
          </fieldset>

          <br />

          <fieldset>
            <label>Requirements</label>
            <br />
            <textarea
              onChange={(e) => this.handleChange(e)}
              type="text"
              name="requirements"
              value={this.state.requirements}
            />
            <br />
            <label>Location </label>
            <br />
            <AlgoliaPlaces
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
            <br />
            <label>Is this Union/Guild job?</label> <br />
            <label>Yes</label>
            <input onChange={(e) => this.handleChange(e)} type="radio" />
            <label>No</label>
            <input onChange={(e) => this.handleChange(e)} type="radio" />
          </fieldset>

          <fieldset>
            <label>Start Day</label>
            <DateTimePicker
              onChange={this.onChange}
              value={this.state.start_day}
            />
            <br />
            <label>Duration</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="duration"
              value={this.state.duration}
            />
            <br />
            <label>Day(s)</label>
            <input
              onChange={(e) => this.handleChange(e)}
              type="radio"
              value="day"
            />
            <label>Week(s)</label>
            <input
              onChange={(e) => this.handleChange(e)}
              type="radio"
              value="week"
            />
            <label>Month(s)</label>
            <input
              onChange={(e) => this.handleChange(e)}
              type="radio"
              value="month"
            />
            <br />

            <label>Description</label>
            <textarea
              onChange={this.handleChange}
              name="description"
              value={this.state.description}
            />
            <br />
          </fieldset>
          <fieldset>
            <input
              onChange={this.handleChange}
              type="submit"
              value="POST A GIG"
            />{" "}
            <input onChange={this.handleChange} type="submit" value="CANCEL" />
          </fieldset>
        </form>
      </>
    );
  }
}
