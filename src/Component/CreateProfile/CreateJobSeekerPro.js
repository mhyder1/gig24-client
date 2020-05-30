import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import config from "../../config";

export default class CreateJobSeekerPro extends Component {
  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`,
    });
  };
  render() {
    return (
      <>
        <h1>CREATE JOB SEEKER PROFILE</h1>
        <Link to={"/js-dashboard"}>Create</Link>
        <form>
          <label> Name: </label>
          <input type="text" name="your-name" required />
          <br />
          <label>About me: </label>
          <textarea name="about" />
          <br />
          <label>Link to your IMDB credit (if any):</label>
          <input url="url" name="url" />
          <br />
          <label>Phone: </label>
          <input type="tel" name="tel" required />
          <br />
          <label>Email: </label>
          <input type="email" name="email" required />
          <br />
          <label>Skills: </label>
          <input type="text" name="text" required />
          <br />
          <label>Location</label>
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
          <label>Photo: </label>
          <input type="file" id="fileElem" multiple accept="image/*" />
          <br />
          {/* <button id="fileSelect">Select file</button>         */}
          <input type="submit" value="create" />
        </form>
      </>
    );
  }
}
