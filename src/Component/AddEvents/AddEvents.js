import React, { Component } from "react";
import DayTimePicker from '../DateTimePicker/DayTimePicker'
import AppContext from '../Context/AppContext'

export default class AddEvents extends Component {
static contextType = AppContext

  state = {
    name : '',
    title : '',
    description : ''
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  handleSubmit =(e)=> {
    e.preventDefault()
    console.log({
      name: this.state.name,
      title: this.state.title,
      description: this.state.description,
      id: Math.floor(Math.random()*10000) //TODO: fix
    })
    
  }

  render() {
    return (
      <>
        <h2>Create your event</h2>
        <p>Choose date and time:</p>
          <DayTimePicker /> <br/>
        <form onSubmit ={this.handleSubmit}>
          <label>Parent name</label> <br/>
          <input onChange={(e) => this.handleChange(e)}
            type="text" 
            name="name" 
            value={this.state.name} 
            required />
            <br/>
          <label>Event title</label> <br/>
          <input onChange={(e) => this.handleChange(e)}
            type="text" 
            name="title" 
            value={this.state.title} 
            required />
          <br/>
          <label>Describe your event</label>
          <br/>
          <textarea onChange={(e) => this.handleChange(e)}
            type="text" 
            value={this.state.description} 
            name="description" 
            required />
          <br/>
          <label>Event type</label>
          <select
                onChange={(e) => this.handleChange(e)}>
                <option>--</option>
                <option>Arts & Crafts</option>
                <option>Music & Dance</option>
                <option>Outdoor activities</option>
                <option>Sport & Fitness</option>
                <option>Books & Films</option>
                <option>Tutoring</option>
              </select>
          <input type="submit" value="add event" />
        </form>
      </>
    );
  }
}
