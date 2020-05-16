import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';
//import AlgoliaPlaces from 'algolia-places-react';
import AppContext from '../Context/AppContext'
import config from '../../config'
import '../../AlgoliaPlaces.css'



export default class AddEvents extends Component {
static contextType = AppContext;

state = {
  parent_name : '',
  title : '',
  description : '',
  address:'',
  type:'',
  time_of_event: new Date(),
  id: null
}

componentDidMount() {
  const { event } = this.props.location.state
  console.log(this.context)
  this.setState({
      title: event.title,
      description: event.description,
      address: event.address,
      type: event.type,
      time_of_event: new Date(event.time_of_event),
      id: event.id,
  })
  // AlgoliaPlaces.setVal(event.address)
  // console.log(AlgoliaPlaces.Places)
}
handleChange =(e) => {
  console.log(e.target.name, e.target.value)
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
  e.preventDefault()
  fetch(`${config.API_ENDPOINT}/events/${this.state.id}`,{
    method:'PATCH',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      title: this.state.title,
      description: this.state.description,
      address:this.state.address,
      type:this.state.type,
      time_of_event: this.state.time_of_event
    })
  })
  .then((res)=> {
    if(!res.ok) return res.json().then((e)=> Promise.reject(e));
    return res.json();
  })
  .then((event)=> {
    this.context.updateEvent(event)
    this.props.history.push(`/${event.type}`);
    // this.props.history.push('/')
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
        {/* <AlgoliaPlaces
          placeholder='Write an address here'
    
          options={{
            appId: config.APPID,
            apiKey: config.SEARCH_KEY,
            language: 'en',
            countries: ['us'],
            type: 'address',
            // Other options from https://community.algolia.com/places/documentation.html#options
          }}
    
          onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
            this.handleAddress(suggestion)}
            // console.log(suggestion.value)}
    
          // onSuggestions={({ rawAnswer, query, suggestions }) => 
          //   console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}
    
          // onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
          //   console.log('Fired when arrows keys are used to navigate suggestions.')}
    
          // onClear={() => 
          //   console.log('Fired when the input is cleared.')}
    
          // onLimit={({ message }) => 
          //   console.log('Fired when you reached your current rate limit.')}
    
          // onError={({ message }) => 
          //   console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
        /> */}

        <input onChange={(e) => this.handleChange(e)}
          type="text" 
          name="address" 
          value={this.state.address} 
          required /> 
          <br/>
        <label>Event type</label><br/>
        <select name="type" value={this.state.type}
              onChange={(e) => this.handleChange(e)}>
              <option>--</option>
              <option value="arts-crafts">Arts & Crafts</option>
              <option value="music-dance">Music & Dance</option>
              <option value="outdoor-activities">Outdoor activities</option>
              <option value="sports-fitness">Sports & Fitness</option>
              <option value="books-films">Books & Films</option>
              <option value="tutoring">Tutoring</option>
            </select> <br/>
        <input type="submit" value="update event"
        style={{
              marginRight: '5px',
              border: '1px solid #fff',
              borderRadius: '5px',
              padding: '5px',
              color: '#fff',
              marginTop: '10px',
              backgroundColor: '#F98165'
            }}/>
      </form>
      </>
    );
  }
}
