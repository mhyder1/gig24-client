import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import config from "../../config";
import AppContext from '../../Component/AppContext'

export default class CreateJobSeekerPro extends Component {
  static contextType = AppContext

  state = {
    name:'',
    about_me:'',
    photo: '',
    education: '',
    location: '',
    imdb: '',
    skillset: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  handleAddress = (suggestion) => {
    const { name, city, administrative, postcode } = suggestion;
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/userprofile`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name:this.state.name,
        about_me:this.state.about_me,
        // photo:'photo',
        education:this.state.education,
        location: this.state.location,
        // duration:'seven days',
        imdb: 'imdb profile',
        skillset: this.state.skillset,
        user_id: this.context.userInfo.user_id
      })
    })
    .then(res => {
      if(!res.ok) return res.json().then((e)=> Promise.reject(e))
      return res.json()
    })
    .then((userPro) => {
    console.log(userPro)
      this.props.history.push('/js-profile');
    })

    .catch((error)=> {
      console.log({error})
    })
  }


  render() {
    return (
      <>
        <h1>CREATE JOB SEEKER PROFILE</h1>
        <Link to={"/js-dashboard"}>Create</Link>
        <form onSubmit={this.handleSubmit}>
          <label> Name: </label>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} required />
          <br />
          <label>About me: </label>
          <textarea onChange={this.handleChange} name="about_me" value={this.state.about_name}/>
          <br />
          <label>Education: </label>
          <input onChange={this.handleChange} type='text' name="education" value={this.state.education} />
          <br />
          <label>Link to your IMDB credit (if any):</label>
          <input onChange={this.handleChange} url="url" name="url" value={this.state.url} />
          <br />
          <label>Phone: </label>
          <input onChange={this.handleChange} type="tel" name="tel" value={this.state.tel} required />
          <br />
          <label>Email: </label>
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email} required />
          <br />
          <label>Skillset: </label>
          <textarea onChange={this.handleChange} name="skillset" value={this.state.skillset} required />
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
          {/* <input type="file" id="fileElem" multiple accept="image/*" /> */}
          <br />
          {/* <button id="fileSelect">Select file</button>         */}
          <input type="submit" value="create" />
        </form>
      </>
    );
  }
}
