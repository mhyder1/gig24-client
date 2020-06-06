import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import config from "../../config";

export default class CreateEmpPro extends Component {
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
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/empprofile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        company_name: this.state.company_name,
        about_us: this.state.about_us,
        logo: this.state.logo,
        email: this.state.email,
        phone: this.state.phone,
        location: this.state.location,
        fax: this.state.fax,
        website: this.state.website,
        user_id: this.context.userInfo.user_id,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((empPro) => {
        console.log(empPro);
        this.props.history.push("/emp-profile");
      });
  };

  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`,
    });
  };
  render() {
    return (
      <>
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
            name="tel"
            value={this.state.tel}
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
            name="url"
            value={this.state.url}
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
          <br />
          <label>Logo: </label>
          <input
            onChange={this.handleChange}
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
          />
          {/* <button id="fileSelect">Select file</button>         */}
          <br />
          <input type="submit" value="create" />
        </form>
      </>
    );
  }
}
