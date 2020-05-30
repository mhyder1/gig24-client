import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import AlgoliaPlaces from "algolia-places-react";
import AppContext from "../../ComponentPC/Context/AppContext";
//import TokenService from '../../services/token-service'
import config from "../../config";
import "../../AlgoliaPlaces.css";

export default class PostAgig extends Component {
  static contextType = AppContext;

  state = {
    parent_name: "",
    title: "",
    description: "",
    address: "",
    type: "",
    time_of_event: new Date(),
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChange = (date) => {
    this.setState({
      time_of_event: date,
    });
  };

  // handleSelect = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }

  // handleAddress = (suggestion) => {
  //   const {name, city, administrative, postcode} = suggestion
  //   this.setState({
  //     address: `${name}, ${city}, ${administrative} ${postcode}`
  //   })
  // }

  // handleSubmit =(e)=> {
  //   const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {fullname:'',user_id:''}
  //   e.preventDefault()
  //   fetch(`${config.API_ENDPOINT}/events`,{
  //     method:'POST',
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       parent_name: token.fullname,
  //       title: this.state.title,
  //       description: this.state.description,
  //       address:this.state.address,
  //       type:this.state.type,
  //       time_of_event: this.state.time_of_event,
  //       author: token.user_id
  //     }),
  //   })
  //   .then((res)=> {
  //     if(!res.ok) return res.json().then((e)=> Promise.reject(e));
  //     return res.json();
  //   })
  //   .then((event)=> {
  //     this.context.addEvent(event)
  //     this.props.history.push(`/${event.type}`);
  //   })
  //   .catch((error) => {
  //     console.log({error});
  //   });
  // }

  render() {
    return (
      <>
        <h2>Post a Gig</h2>

        <form>
          <fieldset>
            <label>Position*</label>
            <input type="text" name="position" required />
            <label>Category</label>
            <input type="text" name="category" required />
            <label>Job Term*</label>
            <select name="type">
              <option>--</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Low-budget</option>
              <option>Internship</option>
            </select>
          </fieldset>
      
        <br />
      
          <fieldset>
            <label>Requirments</label><br/>
            <textarea /><br/>
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
            <label>
              Is this Union/Guild job? Yes
            </label> <input type="radio" /> <label>No</label>
            <input type="radio" />
          </fieldset>
    
    
          <fieldset>
            <label>Start Day</label>
            <DateTimePicker
              onChange={this.onChange}
              value={this.state.time_of_event}
            />
            <br />
            <label>Duration</label>
            <br />
            <input type="text" name="duration" required /><br/>
            <label>Day(s)</label>
            <input type="radio" value="day" />
            <label>Week(s)</label>
            <input type="radio" value="week" />
            <label>Month(s)</label>
            <input type="radio" value="month" /><br/>
            <label>Description</label>
            <textarea /><br/>
          </fieldset>
          <fieldset>
            <input type="submit" value="POST A GIG" />{" "}
            <input type="submit" value="CANCEL" />
          </fieldset>
        </form>
      </>
    );
  }
}
