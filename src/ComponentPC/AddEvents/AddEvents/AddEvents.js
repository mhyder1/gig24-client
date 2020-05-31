import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';
import AlgoliaPlaces from 'algolia-places-react';
import AppContext from '../Context/AppContext'
import TokenService from '../../services/token-service'
import config from '../../config'
import '../../AlgoliaPlaces.css'



export default class AddEvents extends Component {
static contextType = AppContext

  state = {
    parent_name : '',
    title : '',
    description : '',
    address:'',
    type:'',
    time_of_event: new Date()
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  onChange = (date) => {
    this.setState({
      time_of_event: date,
    });
  }

  handleSelect = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleAddress = (suggestion) => {
    const {name, city, administrative, postcode} = suggestion
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`
    })
  }

  handleSubmit =(e)=> {
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {fullname:'',user_id:''}
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/events`,{
      method:'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        parent_name: token.fullname,
        title: this.state.title,
        description: this.state.description,
        address:this.state.address,
        type:this.state.type,
        time_of_event: this.state.time_of_event,
        author: token.user_id
      }),
    })
    .then((res)=> {
      if(!res.ok) return res.json().then((e)=> Promise.reject(e));
      return res.json();
    })
    .then((event)=> {
      this.context.addEvent(event)
      this.props.history.push(`/${event.type}`);
    })
    .catch((error) => {
      console.log({error});
    });
  }

  render() {
    return (
      <>
      <h2>Create your event</h2>
        <p>Choose date and time:</p>
        <form onSubmit ={this.handleSubmit}>
         <DateTimePicker
          onChange={this.onChange}
          value={this.state.time_of_event}
        />
          <br/>
         <label>Event title</label> <br/>
          <input onChange={(e) => this.handleChange(e)}
            type="text" 
            name="title" 
            value={this.state.title} 
            required />
          <br/>
          <label>Describe your event</label><br/>
          <textarea onChange={(e) => this.handleChange(e)}
            type="text" 
            value={this.state.description} 
            name="description" 
            required />
          <br/>
          <label>Address</label><br/>
          <AlgoliaPlaces
            placeholder='Write an address here'
              options={{
              appId: config.APPID,
              apiKey: config.SEARCH_KEY,
              language: 'en',
              countries: ['us'],
              type: 'address',
            }}
      
            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
              this.handleAddress(suggestion)} />
         <br/>
          <label>Event type</label><br/>
          <select name="type"
                onChange={(e) => this.handleChange(e)}>
                <option>--</option>
                <option value="arts-crafts">Arts & Crafts</option>
                <option value="music-dance">Music & Dance</option>
                <option value="outdoor-activities">Outdoor activities</option>
                <option value="sports-fitness">Sports & Fitness</option>
                <option value="books-films">Books & Films</option>
                <option value="tutoring">Tutoring</option>
              </select> <br/>
          <input type="submit" value="add event" />
        </form>
 
      </>
    );
  }
}