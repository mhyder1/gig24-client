import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import TokenService from "../../services/token-service";
import AppContext from "../AppContext";
import config from "../../config";

export default class CreateEmpPro extends Component {
  static contextType = AppContext
  state = {
    company_name: "",
    about_us: "",
    logo: "",
    email: "",
    phone: "",
    location: "",
    fax: "",
    website: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const token = TokenService.hasAuthToken()
                ? TokenService.readJwtToken()
                : { user_id: "" }
    const { user_id } = token
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/empprofile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        company_name: this.state.company_name,
        about_us: this.state.about_us,
        // logo: this.state.logo,
        email: this.state.email,
        phone: this.state.phone,
        location: this.state.location,
        fax: this.state.fax,
        website: this.state.website,
        user_id: user_id,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((profile) => {
        this.context.createEmpProfile(profile)
        this.props.history.push("/empprofile");
      });
  };

  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState({
      location: `${name || ''}, ${city || ''}, ${administrative || ''} ${postcode || ''}`,
    });
  };
  render() {
    return (
      <section className="create-js-profile">
        <h1>CREATE EMPLOYER PROFILE</h1>

        <form onSubmit={this.handleSubmit}>
          <label>Company name: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="company_name"
            value={this.state.company_name}
            required
          />
          <br />
          <label>Phone: </label>
          <input
            onChange={this.handleChange}
            type="tel"
            name="phone"
            value={this.state.phone}
            required
          />
          <br />
          <label>Fax: </label>
          <input
            onChange={this.handleChange}
            type="fax"
            name="fax"
            value={this.state.fax}
            required
          />
          <br />
          <label>Website: </label>
          <input
            onChange={this.handleChange}
            type="url"
            name="website"
            value={this.state.website}
            required
          />
          <br />
          <label>Email: </label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
            required
          />
          <br />
          <label>Address:</label>
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
          <label>About us: </label>
          <textarea
            onChange={this.handleChange}
            name="about_us"
            value={this.state.about_us}
          />
          {/* <br />
          <label>Logo: </label>
          <input
            onChange={this.handleChange}
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
          /> */}
          {/* <button id="fileSelect">Select file</button>         */}
          <br />
          <input type="submit" value="Create" />
          <Link to="/empprofile">
            <button>Cancel</button>
          </Link>
        </form>
      </section>
    );
  }
}
