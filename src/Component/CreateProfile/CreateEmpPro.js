import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import config from "../../config";

export default class CreateEmpPro extends Component {
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

        <form>
          <label>Company name: </label>
          <input type="text" name="company-name" required />
          <br />
          <label>Phone: </label>
          <input type="tel" name="tel" required />
          <br />
          <label>Website: </label>
          <input type="url" name="url" required />
          <br />
          <label>Email: </label>
          <input type="email" name="email" required />
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
          <textarea name="about" />
          <br />
          <label>Logo: </label>
          <input type="file" id="fileElem" multiple accept="image/*" />
          {/* <button id="fileSelect">Select file</button>         */}
          <br/>
          <input type='submit' value='create'/>
        </form>

        <Link to={"/js-dashboard"}>Create</Link>
      </>
    );
  }
}
