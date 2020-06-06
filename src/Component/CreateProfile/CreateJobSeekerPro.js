import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import config from "../../config";
import AppContext from "../../Component/AppContext";
import TokenService from "../../services/token-service"
import "./create-js-profile.css"
import "../../AlgoliaPlaces.css"

export default class CreateJobSeekerPro extends Component {
  static contextType = AppContext;

  state = {
    name: "",
    position:'',
    about_me: "",
    photo: "",
    education: "",
    location: "",
    imdb: "",
    phone: "",
    email: "",
    skillset: "",
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState(
      {
        location: `${name || ""}, ${city || ""}, ${administrative || ""} ${
          postcode || ""
        }`,
      },
      () => console.log(this.state.location)
    );
  };

  handleSubmit = (e) => {
    const token = TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : { user_id: "" };
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/userprofile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        about_me: this.state.about_me,
        position: this.state.position,
        // photo:'photo',
        education: this.state.education,
        location: this.state.location,
        imdb: this.state.imdb,
        skillset: this.state.skillset,
        phone: this.state.phone,
        email: this.state.email,
        user_id: token.user_id
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((userPro) => {
        this.context.createUserProfile(userPro);
        this.props.history.push("/js-profile");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    // console.log(this.context)
    return (
      <section className="create-js-profile">
        <h1>CREATE JOB SEEKER PROFILE</h1>
        {/* <Link to={"/js-dashboard"}>Create</Link> */}
        <form onSubmit={this.handleSubmit}>
          <label className="label" htmlFor="name">
            {" "}
            Name:
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
            className="input"
            value={this.state.name}
            required
          />
           <label className="label" htmlFor="position">
            {" "}
            Primary Position:
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="position"
            id="position"
            className="input"
            value={this.state.position}
            required
          />
          <label className="label" htmlFor="about_me">
            About me:
          </label>
          <textarea
            onChange={this.handleChange}
            name="about_me"
            id="about_me"
            className="input"
            value={this.state.about_me}
          />
          <label className="label" htmlFor="education">
            Education:
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="education"
            id="education"
            className="input"
            value={this.state.education}
          />
          <label className="label" htmlFor="imdb">
            IMDB credit (if any):
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="imdb"
            id="imdb"
            className="input"
            value={this.state.imdb}
          />
          <label className="label" htmlFor="phone">
            Phone:
          </label>
          <input
            onChange={this.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="input"
            value={this.state.phone}
            required
          />
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            id="email"
            className="input"
            value={this.state.email}
            required
          />
          <label className="label" htmlFor="skill">
            Skillset:
          </label>
          <textarea
            onChange={this.handleChange}
            name="skillset"
            id="skill"
            className="input"
            value={this.state.skillset}
            required
          />
          <label className="label" htmlFor="location">
            Location:
          </label>
          <br />
          <AlgoliaPlaces
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
          {/* <label>Photo: </label> */}
          {/* <input type="file" id="fileElem" multiple accept="image/*" /> */}
          <br />
          {/* <button id="fileSelect">Select file</button>         */}
          <input className="submit" type="submit" value="create" />
        </form>
      </section>
    );
  }
}
